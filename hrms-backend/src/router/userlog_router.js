const { Router } = require("express")
const { startTime, stopTime, reportingTime, getUserLog, totalWorkingHours, attendance, breakingTime, salary, getAllUserLog } = require("../controller/userlog_controller")
const { EMPLOYEE_ROLE, COMPANY_ROLE } = require("../config/string")
const { verifyUser } = require("../middleware/verify_user")

const router = Router()

router.post("/start-time", verifyUser(EMPLOYEE_ROLE), startTime)
router.post("/stop-time", verifyUser(EMPLOYEE_ROLE), stopTime)
router.get("/reporting-time", verifyUser(EMPLOYEE_ROLE), reportingTime)
router.get("/breaking-time", verifyUser(EMPLOYEE_ROLE), breakingTime)
router.get("/", verifyUser(EMPLOYEE_ROLE), getUserLog)
router.get("/log", verifyUser([EMPLOYEE_ROLE,COMPANY_ROLE]), getAllUserLog)
router.get("/total-working-hours", verifyUser(EMPLOYEE_ROLE), totalWorkingHours)
router.get("/attendance", verifyUser(EMPLOYEE_ROLE), attendance)
router.get("/attendance/:id", verifyUser(COMPANY_ROLE), attendance)
router.get("/salary", verifyUser([EMPLOYEE_ROLE,COMPANY_ROLE]), salary)

module.exports = router
