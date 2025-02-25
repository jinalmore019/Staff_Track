const { Router } = require("express")
const { addDepartment, getDepartment, updateDepartment, deleteDepartment } = require("../controller/department_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE ,EMPLOYEE_ROLE} = require("../config/string")

const router = Router()

router.post("/add", verifyUser(COMPANY_ROLE), addDepartment)
router.get("/", verifyUser([COMPANY_ROLE,EMPLOYEE_ROLE]), getDepartment)
router.put("/update/:id", verifyUser(COMPANY_ROLE), updateDepartment)
router.delete("/delete/:id", verifyUser(COMPANY_ROLE), deleteDepartment)

module.exports = router