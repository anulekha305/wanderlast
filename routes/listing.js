const express =require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapasync=require("../utils/wrapasync.js");
const multer=require('multer');
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});


const {isLoggedIn,isOwner,validatelistings}=require("../middleware.js");

//controllers
const listingcontrolers=require("../controllers/listing.js");

///**** */
router.route("/")
//index route
.get(wrapasync(listingcontrolers.index))
// create route
.post(isLoggedIn,upload.single("listing[image]"),validatelistings,wrapasync(listingcontrolers.createlisting));
// .post(upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// })


//*** */
//new route
router.get("/new",isLoggedIn,listingcontrolers.rendernewform);



// *****
router.route("/:id")
//show route
.get(validatelistings,wrapasync(listingcontrolers.showlisting))
//update route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelistings,wrapasync(listingcontrolers.updatelisting))
//delete route
.delete(isLoggedIn,isOwner,wrapasync(listingcontrolers.destroylisting))



//index route
// router.get('/',wrapasync(listingcontrolers.index));

//show route
// router.get("/:id",validatelistings,wrapasync(listingcontrolers.showlisting));

//create route
// router.post("/",isLoggedIn,validatelistings,wrapasync(listingcontrolers.createlisting));


// *****
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapasync(listingcontrolers.rendereditform));
//update route
// router.put("/:id",isLoggedIn,isOwner,validatelistings,wrapasync(listingcontrolers.updatelisting));
//delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapasync(listingcontrolers.destroylisting));



module.exports=router;