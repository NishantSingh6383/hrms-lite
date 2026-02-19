import React, { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import Sidebar from "./Sidebar";
import Toast from "../../utils/toast";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [attendanceData, setAttendanceData] = useState({
    employee: "",
    date: "",
    status: "",
  });

  const attendanceStatusOptions = ["Present", "Absent"];

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const empRes = await apiInstance.get("employee/");
      const attRes = await apiInstance.get("attendance/");

      setEmployees(empRes.data);
      setAttendanceRecords(attRes.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to load attendance data",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= INPUT CHANGE =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE ATTENDANCE =================
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await apiInstance.post("attendance/", attendanceData);

      Toast.fire({
        icon: "success",
        title: "Attendance recorded successfully",
      });

      setAttendanceData({
        employee: "",
        date: "",
        status: "",
      });

      fetchData(); // refresh table
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to record attendance",
      });
    }
  };

  // ================= UI STATES =================
  if (loading) return <div className="p-4">Loading attendance...</div>;

  return (
    <div className="container-fluid" id="main">
      <div className="row h-100">
        <Sidebar />

        <div className="col-lg-9 mt-3">
          <div className="container px-4">
            {/* ===== FORM ===== */}
            <h3 className="mb-3">Record Attendance</h3>

            <form
              className="card p-4 shadow-sm"
              onSubmit={handleSave}
            >
              <div className="row">
                {/* Employee */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Employee</label>
                  <select
                    className="form-control"
                    name="employee"
                    value={attendanceData.employee}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.full_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={attendanceData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Status */}
                <div className="col-lg-4 mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={attendanceData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Status</option>
                    {attendanceStatusOptions.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-primary">
                Record Attendance
              </button>
            </form>

            {/* ===== TABLE ===== */}
            <h3 className="mt-5 mb-3">Attendance Records</h3>

            {attendanceRecords.length === 0 ? (
              <div className="alert alert-info">
                No attendance records yet.
              </div>
            ) : (
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceRecords.map((record) => {
                    const employee = employees.find(
                      (emp) => emp.id === record.employee
                    );

                    return (
                      <tr key={record.id}>
                        <td>
                          {employee
                            ? employee.full_name
                            : "Unknown"}
                        </td>
                        <td>
                          {new Date(
                            record.date
                          ).toLocaleDateString()}
                        </td>
                        <td>{record.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
