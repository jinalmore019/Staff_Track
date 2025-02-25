const { Router } = require("express")
const { login, employeeLogin, logout } = require("../controller/login_controller");
const { verifyUser } = require("../middleware/verify_user");
const { EMPLOYEE_ROLE } = require("../config/string");

const router = Router();

router.post("/login", login)
router.post("/employee-login", employeeLogin)
router.post("/logout", verifyUser(EMPLOYEE_ROLE), logout)

module.exports = router;