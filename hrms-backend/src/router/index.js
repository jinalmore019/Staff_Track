const { Router } = require("express");
const companyRouter = require("./auth/company_router");
const workCategoryRouter = require("./work_category_router");
const loginRouter = require("./login_router");
const departmentRouter = require("./department_router")
const designationRouter = require("./designation_router")
const holidayRouter = require("./holiday_router")
const projectRouter = require("./project_router")
const leaveRouter = require("./leave_router")
const noticeRouter = require("./notice_router")
const profileRouter = require("./profile_router")
const userlogRouter = require("./userlog_router")
const toggleLogRouter = require("./toggle_log_router")
const teamRouter = require("./team_router")
const dashboardRouter = require("./dashboard_router")
const tagsRouter = require("./tags_router")

const router = Router();
router.use("/company", companyRouter);  // DONE
router.use("/work-category", workCategoryRouter); // DONE
router.use(loginRouter) // DONE
router.use("/department", departmentRouter) // DONE
router.use("/designation", designationRouter) // DONE
router.use("/holiday", holidayRouter) // DONE
router.use("/project", projectRouter)  // DONE
router.use("/leave", leaveRouter) // DONE
router.use("/notice", noticeRouter) // DONE
router.use("/profile", profileRouter) // DONE
router.use("/userlog", userlogRouter) // DONE
router.use("/toggleLog", toggleLogRouter)
router.use("/team", teamRouter)
router.use("/tags", tagsRouter)
router.use(dashboardRouter)

module.exports = router;