const express=require("express");
const router=express();
const User=require('../models/user.js');
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const usercontroler=require("../controllers/user.js");


router.route("/signup")
//signup
.get(usercontroler.rendersignup)
.post(wrapasync(usercontroler.signup));



router.route("/login")
//login
.get(usercontroler.renderlogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usercontroler.login)



// router.get("/signup",usercontroler.rendersignup);

// router.post("/signup",wrapasync(usercontroler.signup));

// router.get("/login",usercontroler.renderlogin);

// router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),usercontroler.login);










router.get("/logout",usercontroler.logout);


module.exports=router;