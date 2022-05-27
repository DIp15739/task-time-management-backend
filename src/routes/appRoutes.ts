import { Router } from "express";
import { welcome } from "./../controllers/app";

const router = Router();

router.route("/").get(welcome);

export default router;
