import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { dashboardApi } from "./services/Dashboard.service";
import { userManagementApi } from "./services/User.service";
import { holidayManagementApi } from "./services/Holiday.service";
import { deptDesigApi } from "./services/DepartDesig.service";
import { leaveManagementApi } from "./services/Leave.service";
import { projectApi } from "./services/Project.service";
import { noticeApi } from "./services/Notice.service";
import { teamManagementApi } from "./services/Team.service";
import { organizationApi } from "./services/Organization.service";
import { loginApi } from "./services/Login.service";
import { createCompanyApi } from "./services/CreateCompany.service";
import { salaryApi } from "./services/Salary.service";
import { toggleLogAPi } from "./services/ToggleLog.service";
import { attendanceApi } from "./services/Attendance.service";
import { empToggleApi } from "./services/employee/EmpToggle.service";
import { tagsApi } from "./services/Tags.service";
import { empLeaveApi } from "./services/employee/EmpLeave.service";
import { profileApi } from "./services/employee/Profile.service";
import { UserLogAPi } from "./services/UserLog.service";



export const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [deptDesigApi.reducerPath]: deptDesigApi.reducer,
    [holidayManagementApi.reducerPath]: holidayManagementApi.reducer,
    [leaveManagementApi.reducerPath]: leaveManagementApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [noticeApi.reducerPath]: noticeApi.reducer,
    [teamManagementApi.reducerPath]: teamManagementApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [createCompanyApi.reducerPath]: createCompanyApi.reducer,
    [salaryApi.reducerPath]: salaryApi.reducer,
    [toggleLogAPi.reducerPath]: toggleLogAPi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [empToggleApi.reducerPath]: empToggleApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [empLeaveApi.reducerPath]: empLeaveApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [UserLogAPi.reducerPath]: UserLogAPi.reducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(dashboardApi.middleware)
      .concat(userManagementApi.middleware)
      .concat(holidayManagementApi.middleware)
      .concat(deptDesigApi.middleware)
      .concat(leaveManagementApi.middleware)
      .concat(projectApi.middleware)
      .concat(noticeApi.middleware)
      .concat(teamManagementApi.middleware)
      .concat(organizationApi.middleware)
      .concat(loginApi.middleware)
      .concat(createCompanyApi.middleware)
      .concat(salaryApi.middleware)
      .concat(toggleLogAPi.middleware)
      .concat(attendanceApi.middleware)
      .concat(empToggleApi.middleware)
      .concat(tagsApi.middleware)
      .concat(empLeaveApi.middleware)
      .concat(profileApi.middleware)
      .concat(tagsApi.middleware)
      .concat(UserLogAPi.middleware)
});
setupListeners(store.dispatch);
