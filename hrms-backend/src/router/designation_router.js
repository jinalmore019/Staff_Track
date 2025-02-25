const { Router } = require("express")
const { addDesignation, getDesignation, updateDesignation, deleteDesignation } = require("../controller/designation_controller")
const { verifyUser } = require("../middleware/verify_user")
const { COMPANY_ROLE } = require("../config/string")

const router = Router()

router.post("/add", verifyUser(COMPANY_ROLE), addDesignation)
router.get("/", verifyUser(COMPANY_ROLE), getDesignation)
router.put("/update/:id", verifyUser(COMPANY_ROLE), updateDesignation)
router.delete("/delete/:id", verifyUser(COMPANY_ROLE), deleteDesignation)

module.exports = router