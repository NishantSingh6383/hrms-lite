import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StoredHeader from './views/base/StoredHeader'
import Employees from './views/Employee/Employees'
import EmployeeDetail from './views/Employee/EmployeeDetail'
import Attendance from './views/Employee/Attendance'
import AddEmployee from './views/Employee/AddEmployee'
import DashboardEmp from './views/Employee/DashboardEmp'

function App() {

  return (
    <BrowserRouter>
      <StoredHeader />

      <Routes>
        {/* ✅ DEFAULT PAGE */}
        <Route path='/' element={<DashboardEmp />} />

        {/* MAIN HRMS ROUTES */}
        <Route path='/dashboard' element={<DashboardEmp />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/employee/add' element={<AddEmployee />} />
        <Route path='/employee/:employee_id/' element={<EmployeeDetail />} />
        <Route path='/attendance' element={<Attendance />} />
      </Routes>

      <StoredHeader />
    </BrowserRouter>
  )
}

export default App
