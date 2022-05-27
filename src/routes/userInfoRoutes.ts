import { Router } from "express";
import {
  addUserInfo,
  getUserInfo,
  removeUserInfo,
  updateUserInfo,
  welcomeUserInfo,
} from "../controllers/userInfo";

const router = Router();

router.route("/").get(welcomeUserInfo);
router.route("/get").get(getUserInfo);
router.route("/add").post(addUserInfo);
router.route("/update").post(updateUserInfo);
router.route("/remove").post(removeUserInfo);

export default router;
