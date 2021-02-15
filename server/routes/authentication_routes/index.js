const express=require("express");
const router=express.Router();
const loginRoutes=require("../../services/authentication/login");
const registerRoutes=require("../../services/authentication/register");
const checkJWT=require("../../middlewares/jwt");

router.post("/login",loginRoutes.loginUser);
router.post("/register",registerRoutes.registerUser);

module.exports=router;