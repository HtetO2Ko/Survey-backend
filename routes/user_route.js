const express = require("express");
const router = express.Router();
const userCtr = require("../controller/user_controller");

router.post("/createUserSurvey", userCtr.createUserSurvey)
router.post("/getUserSurveyByID", userCtr.getUserSurveyByID)
router.post("/getAllUserSurvey", userCtr.getAllUserSurvey)
router.post("/updateUserSurvey", userCtr.updateAllUserSurvey)
router.post("/deleteOneuserSurvey", userCtr.deleteOneuserSurvey)


module.exports = router;
