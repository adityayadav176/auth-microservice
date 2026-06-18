import {Router} from "express"
import { getAllSessions, logoutAllDevices } from "../controllers/session.controller.js";
import { verifyUser } from "../middleware/verifyUser.middleware.js";

const router = Router();

router.get("/",verifyUser, getAllSessions);
router.post("/logoutAllDevice",verifyUser, logoutAllDevices);
export default router