if(process.env.NODE_ENV !="production"){
require("dotenv").config();
}
// console.log(process.env.SECRET);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path= require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Expresserror=require("./utils/Expresserror.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const Mongostore=require('connect-mongo');






const listingsrouter=require("./routes/listing.js");
const reviewsrouter=require("./routes/review.js");
const userrouter=require("./routes/user.js");
const MongoStore = require("connect-mongo");


const dburl=process.env.ATLAS_URL;

main().then(()=>{
    console.log("connection sucessful");

})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dburl);

}




app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));  



const store=MongoStore.create({
  mongoUrl: dburl, 
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("error in mongo session store",err);
})


const sessionoptions={
  store,
  secret:process.env.SECRET,resave:false,saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxage:7*24*60*60*1000,
    httpOnly:true
  },
};





app.use(session(sessionoptions));
app.use(flash());

//*******authentication& authrozation
// Passport Middleware ↓
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());










app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.curruser=req.user;
  next();
})

app.use("/listings",listingsrouter);
app.use("/listings/:id/reviews",reviewsrouter);
app.use("/",userrouter);



// app.get("/demouser",async(req,res)=>{
//   let fakeuser=new User({
//     email:"student@gmail.com",
//     username:"delta-student"
//   });
//  let registereduser=await User.register(fakeuser,"helloworld");
// res.send(registereduser);
// })



//default page 
app.all("*",(req,res,next)=>{
    next(new Expresserror(404,"page not found"));
});

app.use((err,req,res,next)=>{
  let {statuscode=500,message="something wrong"}=err;
  res.status(statuscode).render("listings/error.ejs",{message});
});


app.listen(8080,()=>{
    console.log("server is listening on port 8080");
});