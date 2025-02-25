const { Router } = require("express")
const { addHoliday, getHoliday, updateHoliday, deleteHoliday } = require("../controller/holiday_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string")

const router = Router();

router.post("/add", verifyUser(COMPANY_ROLE), addHoliday)
router.get("/", verifyUser([COMPANY_ROLE, EMPLOYEE_ROLE]), getHoliday)
router.put("/update/:id", verifyUser(COMPANY_ROLE), updateHoliday)
router.delete("/delete/:id", verifyUser(COMPANY_ROLE), deleteHoliday)

module.exports = router