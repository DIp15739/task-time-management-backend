import { Router } from "express";
import { addUser, getUser, removeUser, welcomeUser } from "../controllers/user";

const router = Router();

router.route("/").get(welcomeUser);
router.route("/get").get(getUser);
router.route("/add").post(addUser);
router.route("/remove").post(removeUser);

export default router;
