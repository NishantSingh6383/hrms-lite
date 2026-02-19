## 🌐 Live Application

Frontend (Live UI):
(https://hrmsliteattendence.netlify.app/)

Backend API:
http://127.0.0.1:8000/api/v1/attendance/

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/v1/employee/	List employees
POST	/api/v1/employee/	Create employee
PATCH	/api/v1/employee/{id}/	Update employee
DELETE	/api/v1/employee/{id}/	Delete employee
GET	/api/v1/attendance/	Attendance records
POST	/api/v1/attendance/	Mark attendance
GET	/api/v1/dashboard/	Dashboard stats

# Project Overview

HRMS Lite is a lightweight Human Resource Management System developed as a full-stack web application.

The system simulates a basic internal HR tool allowing an administrator to:

Manage employee records

Track daily attendance

View organization statistics via dashboard

This project demonstrates end-to-end full-stack development, REST API design, database modeling, and production deployment.

✨ Features
👨‍💼 Employee Management

Add new employee

Unique Employee ID validation

View employee list

Edit employee details

Delete employee records

Server-side validation with meaningful errors

📅 Attendance Management

Mark daily attendance

Status: Present / Absent

View attendance records

Employee-wise tracking

📊 Dashboard

Total employees summary

Attendance records count

Clean analytics overview

🎨 UI/UX

Responsive layout

Reusable components

Toast notifications

Loading & empty states

Professional admin interface

🧰 Tech Stack
Frontend

React.js (Vite)

React Router

Axios

Bootstrap CSS

Backend

Python

Django

Django REST Framework

Database

SQLite (Development)

Deployment

Frontend: Netlify

Backend: Render

🏗️ System Architecture
React Frontend (Netlify)
        ↓ API Calls
Django REST API (Render)
        ↓
SQLite Database
📂 Project Structure
hrms-lite/
│
├── backend/            # Django Backend
│   ├── employees/
│   ├── config/
│   └── manage.py
│
├── frontend/           # React Application
│   ├── src/
│   └── public/
│
└── README.md

