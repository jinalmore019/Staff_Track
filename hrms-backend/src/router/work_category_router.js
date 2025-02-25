const { Router } = require("express");
const { addWorkCategory, getWorkCategory, updateWorkCategory, deleteWorkCategory } = require("../controller/work_category_controller");

const router = Router();
router.post("/add", addWorkCategory);
router.get("/", getWorkCategory);
router.put("/update/:id", updateWorkCategory);
router.delete("/delete/:id", deleteWorkCategory);

module.exports = router;