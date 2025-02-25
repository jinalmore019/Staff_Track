const { Router } = require("express")
const { addTeam, getTeam, updateTeam, deleteTeam } = require("../controller/team_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string")

const router = Router()

router.post("/add", verifyUser(COMPANY_ROLE), addTeam)
router.get("/", verifyUser([COMPANY_ROLE, EMPLOYEE_ROLE]), getTeam)
router.put("/update/:id", verifyUser(COMPANY_ROLE), updateTeam)
router.delete("/delete/:id", verifyUser(COMPANY_ROLE), deleteTeam)

module.exports = router