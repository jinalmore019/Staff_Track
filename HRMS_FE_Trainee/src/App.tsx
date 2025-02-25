import Dashboard from "@/pages/Dashboard/Dashboard";
import BothLgn from "./common/Cmplgn";
import UserManagement from "@/pages/UserManagement/UserManagement";
import HolidayManagement from "@/pages/HolidayManagement/HolidayManagement";
import LeaveManagement from "@/pages/LeaveManagement/LeaveManagement";
import Projects from "@/pages/Projects/Projects";
import UserLog from "@/pages/UserLog/UserLog";
import SalaryManagement from "@/pages/SalaryManagement/SalaryManagement";
import ToggleLog from "@/pages/ToggleLog/ToggleLog";
import Organization from "@/pages/Organization/Organization";
import Attendance from "@/pages/Attendance/Attendance";
import TeamManagement from "@/pages/Team Management/TeamManagement";
import Notice from "./pages/Notice/Notice";
import AdminRoute from "./routers/AdminRoutes";
import UserRoutes from "./routers/UserRoutes";
import Home from "@/pages/Home/Home";
import Cmpinfo from "./common/Cmpinfo";
import Profile from "./common/Profile";
import UserToggle from "./pages/user-pages/EmpToggle/EmpToggle";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import Verify from "./pages/ForgotPassword/Verify"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cmplgn from "./common/Cmplgn";
import DepaDesig from "./pages/DepaDesig/DepaDesig";
import UserDashboard from "./pages/user-pages/EmpDashboard/EmpDashboard";
import UserLeave from "./pages/user-pages/EmpLeave/EmpLeave";
import UserTeam from "./pages/user-pages/EmpTeam/EmpTeam";
import UserSalary from "./pages/user-pages/EmpSalary/EmpSalary";
import UserProfile from "@/common/Profile"
import EmpLog from "@/pages/user-pages/EmpLog/EmpLog"
import EmpAttendance from "@/pages/user-pages/EmpAttendance/EmpAttendance"
    const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/Cmplgn" element={<Cmplgn />} /> */}
                <Route path="/Cmpinfo" element={<Cmpinfo />} />
                <Route path="/login" element={<BothLgn />} />
                {/* <Route path="/profile" element={<Profile />}></Route> */}
                <Route path="/cmpRegister" element={<Cmpinfo />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify" element={<Verify />} />


                <Route path="/dashboard" element={<AdminRoute component={Dashboard} />} />
                <Route path="/user-management" element={<AdminRoute component={UserManagement} />} />
                <Route path="/holiday-management" element={<AdminRoute component={HolidayManagement} />} />
                <Route path="/leave-management" element={<AdminRoute component={LeaveManagement} />} />
                <Route path="/projects" element={<AdminRoute component={Projects} />} />
                <Route path="/user-log" element={<AdminRoute component={UserLog} />} />
                <Route path="/salary-management" element={<AdminRoute component={SalaryManagement} />} />
                <Route path="/toggle-log" element={<AdminRoute component={ToggleLog} />} />
                <Route path="/organization-details" element={<AdminRoute component={Organization} />} />
                <Route path="/attendance-management" element={<AdminRoute component={Attendance} />} />
                <Route path="/team-management" element={<AdminRoute component={TeamManagement} />} />
                <Route path="/depart-desig" element={<AdminRoute component={DepaDesig} />} />
                <Route path="/notice" element={<AdminRoute component={Notice} />} />

                <Route path="/emp-dashboard" element={<UserRoutes component={UserDashboard} />} />
                <Route  path="/emp-leave" element={<UserRoutes component={UserLeave} />} />
                <Route path ="/emp-team" element ={<UserRoutes component={UserTeam} />} /> 
                <Route path="/emp-salary" element ={<UserRoutes component={UserSalary}/>}/>
                <Route path="/emp-toggle" element={<UserRoutes component={UserToggle} />} />
                <Route path="/emp-profile" element={<UserRoutes component={UserProfile} />} />
                <Route path="/emp-log" element={<UserRoutes component={EmpLog} />} />
                <Route path="/emp-attendance" element={<UserRoutes component={EmpAttendance} />} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
