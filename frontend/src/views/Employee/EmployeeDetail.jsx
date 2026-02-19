import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Sidebar from "./Sidebar";
import Toast from "../../utils/toast";

function EmployeeDetail() {
  const { employee_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  // ================= FETCH EMPLOYEE =================
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await apiInstance.get(`employee/${employee_id}/`);

        setFormData(res.data);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "Failed to load employee",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employee_id]);

  // ================= HANDLE INPUT =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE =================
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await apiInstance.patch(
        `employee/${employee_id}/`,
        formData
      );

      Toast.fire({
        icon: "success",
        title: "Employee Updated Successfully",
      });

      navigate("/employees");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Update failed",
      });
    }
  };

  // ================= UI STATES =================
  if (loading) return <div className="p-4">Loading employee...</div>;

  return (
    <div className="container-fluid" id="main">
      <div className="row h-100">
        <Sidebar />

        <div className="col-lg-9 mt-3">
          <div className="container px-4">
            <h3 className="mb-4">Employee Details</h3>

            <form
              className="card p-4 shadow-sm"
              onSubmit={handleSave}
            >
              {/* Employee ID */}
              <div className="mb-3">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                />
              </div>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Department */}
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>

              <button className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
