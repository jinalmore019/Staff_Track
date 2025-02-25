const { Router } = require("express")
const { addNotice, getNotice, updateNotice, deleteNotice } = require("../controller/notice_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string")

const router = Router()

router.post("/add", verifyUser(COMPANY_ROLE), addNotice)
router.get("/", verifyUser([COMPANY_ROLE, EMPLOYEE_ROLE]), getNotice)
router.put("/update/:id", verifyUser(COMPANY_ROLE), updateNotice)
router.delete("/delete/:id", verifyUser(COMPANY_ROLE), deleteNotice)

module.exports = router