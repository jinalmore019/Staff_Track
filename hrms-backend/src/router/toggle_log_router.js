const { Router } = require("express")
const { addToggleLog, getToggleLog, updateToggleLog, deleteToggleLog } = require("../controller/toggle_log_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string")

const router = Router()

router.post("/add", verifyUser(EMPLOYEE_ROLE), addToggleLog)
router.get("/", verifyUser([EMPLOYEE_ROLE,COMPANY_ROLE]), getToggleLog)
router.get("/:id", verifyUser(COMPANY_ROLE), getToggleLog)
router.put("/update/:id", verifyUser(EMPLOYEE_ROLE), updateToggleLog)
router.delete("/delete/:id", verifyUser(EMPLOYEE_ROLE), deleteToggleLog)

module.exports = router