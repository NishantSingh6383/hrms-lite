import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import apiInstance from "../../utils/axios";
import Toast from "../../utils/toast";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH EMPLOYEES =================
  const fetchEmployees = async () => {
    try {
      const res = await apiInstance.get("employee/");
      setEmployees(res.data);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Failed to load employees",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ================= DELETE EMPLOYEE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await apiInstance.delete(`employee/${id}/`);

      Toast.fire({
        icon: "success",
        title: "Employee deleted",
      });

      // refresh list
      fetchEmployees();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Delete failed",
      });
    }
  };

  // ================= UI STATES =================
  if (loading)
    return <div className="p-4">Loading employees...</div>;

  return (
    <div className="container-fluid" id="main">
      <div className="row h-100">
        <Sidebar />

        <div className="col-md-9 col-lg-10 main mt-3">
          <h4 className="mb-4">All Employees</h4>

          {employees.length === 0 ? (
            <div className="alert alert-info">
              No employees found. Add your first employee.
            </div>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.employee_id}</td>
                    <td>{e.full_name}</td>
                    <td>{e.email}</td>
                    <td>{e.department}</td>

                    <td>
                      <Link
                        to={`/employee/${e.id}`}
                        className="btn btn-success btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(e.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employees;
