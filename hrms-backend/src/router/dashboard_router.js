const { Router } = require("express")
const { dashboard } = require("../controller/dashboard_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE } = require("../config/string")


const router = Router()

router.get("/dashboard", verifyUser(COMPANY_ROLE), dashboard)

module.exports = router