import React, { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

function DashboardEmp() {
  const [employees, setEmployees] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiInstance
      .get("dashboard/")
      .then((res) => {
        setEmployees(res.data.employee_count);
        setAttendance(res.data.attendance_count);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading Dashboard...</div>;

  return (
    <div className="container-fluid" id="main">
      <div className="row h-100">
        <Sidebar />

        <div className="col-lg-9 p-4">

          {/* ===== WELCOME HEADER ===== */}
          <div
            className="p-4 mb-4 rounded text-white"
            style={{
              background:
                "linear-gradient(135deg, #0d6efd, #6610f2)",
              boxShadow: "0px 6px 18px rgba(0,0,0,0.15)",
            }}
          >
            <h2 className="fw-bold">HRMS Lite Dashboard</h2>
            <p className="mb-0">
              Manage employees and attendance efficiently.
            </p>
          </div>

          {/* ===== STATS CARDS ===== */}
          <div className="row">

            {/* Employees Card */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow dashboard-card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Total Employees</h6>
                    <h2 className="fw-bold">{employees}</h2>
                  </div>

                  <div className="icon-box bg-primary">
                    <i className="bi bi-people-fill text-white fs-3"></i>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0">
                  <Link to="/employees" className="btn btn-outline-primary btn-sm">
                    View Employees →
                  </Link>
                </div>
              </div>
            </div>

            {/* Attendance Card */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow dashboard-card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted">Attendance Records</h6>
                    <h2 className="fw-bold">{attendance}</h2>
                  </div>

                  <div className="icon-box bg-success">
                    <i className="bi bi-calendar-check-fill text-white fs-3"></i>
                  </div>
                </div>

                <div className="card-footer bg-transparent border-0">
                  <Link to="/attendance" className="btn btn-outline-success btn-sm">
                    View Attendance →
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* ===== QUICK ACTIONS ===== */}
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="mb-3">Quick Actions</h5>

              <Link to="/employee/add" className="btn btn-primary me-3">
                ➕ Add Employee
              </Link>

              <Link to="/attendance" className="btn btn-success">
                📅 Mark Attendance
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ===== CUSTOM STYLES ===== */}
      <style>{`
        .dashboard-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border-radius: 12px;
        }

        .dashboard-card:hover {
          transform: translateY(-6px);
          box-shadow: 0px 12px 24px rgba(0,0,0,0.15);
        }

        .icon-box {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

export default DashboardEmp;
