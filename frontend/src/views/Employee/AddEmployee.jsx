import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Sidebar from './Sidebar';
import Toast from '../../utils/toast';

function AddEmployee() {

    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: ''
    });

    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Basic validation
    const validateForm = () => {
        if (
            !formData.employee_id ||
            !formData.full_name ||
            !formData.email ||
            !formData.department
        ) {
            Toast.fire({
                icon: 'error',
                title: 'All fields are required'
            });
            return false;
        }

        // email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            Toast.fire({
                icon: 'error',
                title: 'Enter a valid email address'
            });
            return false;
        }

        return true;
    };

    // Save employee
    const handleSave = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            await apiInstance.post('/employee/', formData);

            Toast.fire({
                icon: "success",
                title: "Employee added successfully"
            });

            navigate('/employees');

        } catch (error) {

    let errorMessage = "Failed to add employee";

    if (error.response && error.response.data) {
        const data = error.response.data;

        // if DRF field validation error
        const firstError = Object.values(data)[0];

        if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
        } else if (typeof firstError === "string") {
            errorMessage = firstError;
        }
    }

    Toast.fire({
        icon: "error",
        title: errorMessage
    });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid" id="main">
            <div className="row row-offcanvas row-offcanvas-left h-100">

                <Sidebar />

                <div className="col-lg-9 mt-3">
                    <div className="container px-4">

                        <h3 className="mb-4">
                            ➕ Add Employee
                        </h3>

                        <form onSubmit={handleSave} className="card p-4 shadow-sm">

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

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Employee"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
