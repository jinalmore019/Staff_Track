const { Router } = require("express")
const { addTags, getTags, deleteTags } = require("../controller/tags_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE, EMPLOYEE_ROLE } = require("../config/string")

const router = Router();

router.post("/add", verifyUser(COMPANY_ROLE), addTags)
router.get("/", verifyUser([COMPANY_ROLE, EMPLOYEE_ROLE]), getTags)
router.delete("/delete/:id", verifyUser(COMPANY_ROLE), deleteTags)

module.exports = router