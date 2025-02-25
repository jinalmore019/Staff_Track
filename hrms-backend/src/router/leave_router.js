const { Router } = require("express")
const { addLeave, getLeave, updateLeave, deleteLeave } = require("../controller/leave_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string")

const router = Router();

router.post("/add", verifyUser(EMPLOYEE_ROLE), addLeave)
router.get("/", verifyUser([COMPANY_ROLE, EMPLOYEE_ROLE]), getLeave)
router.put("/update/:id", verifyUser([COMPANY_ROLE, EMPLOYEE_ROLE]), updateLeave)
router.delete("/delete/:id", verifyUser(EMPLOYEE_ROLE), deleteLeave)

module.exports = router