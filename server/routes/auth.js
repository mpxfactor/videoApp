import express from "express";
import { signup, signin, googleAuth, signout } from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//CREATE A USER
router.post("/signup", signup);

//SIGNIN A USER
router.post("/signin", signin);

//GOOGLE SIGN IN
router.post("/google", googleAuth);

router.get("/signout", verifyToken, signout);

export default router;
