const { Router } = require("express")
const { editProfile } = require("../controller/profile_controller")
const { viewCompanyOrProfile, changePassword } = require("../controller/auth/company_controller")
const { EMPLOYEE_ROLE } = require("../config/string")
const { verifyUser } = require("../middleware/verify_user")
const multer = require("../middleware/multer");


const router = Router()

router.get("/", verifyUser(EMPLOYEE_ROLE), viewCompanyOrProfile)
router.put("/edit-profile", verifyUser(EMPLOYEE_ROLE), multer.single("profilePic"), editProfile)
router.post("/change-password", verifyUser(EMPLOYEE_ROLE), changePassword)


module.exports = router