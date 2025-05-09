const User=require('../models/user.js');




module.exports.rendersignup=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newuser=new User({email,username});
        const registereduser=await User.register(newuser,password);
        console.log(registereduser);
        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to wanderlast");
            res.redirect("/listings/new");
        });
       
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
 
}
module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to wanderlast! you are logged in !");
    let redirecturl = res.locals.redirecturl || "/listings";
    res.redirect(redirecturl);
    }

    module.exports.logout=(req,res,next)=>{
        req.logOut((err)=>{
            if(err){
              return  next(err);
            }
            req.flash("success","you are logged out");
            res.redirect("/listings");
        });
        }