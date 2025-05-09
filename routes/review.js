const express =require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const wrapasync=require("../utils/wrapasync.js");
const Expresserror=require("../utils/Expresserror.js");
const Review=require("../models/review.js");
const {validatereview,isLoggedIn,isreviewAuthor}=require("../middleware.js");

const reviewcontroller=require("../controllers/review.js");








//post Reviews
router.post("/",isLoggedIn,validatereview,wrapasync(reviewcontroller.createreview));
    
    //Delete review Route
    router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapasync(reviewcontroller.destroyreview));

    module.exports=router;