const Listing=require("./models/listing.js");
const {listingschema,reviewschema}=require("./Schema.js");
const Expresserror=require("./utils/Expresserror.js");
const Review=require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirecturl = req.originalUrl;

        req.flash("error", "You must be logged in to create listing..!")
        return res.redirect("/login")
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirecturl) {
        res.locals.redirecturl = req.session.redirecturl
    }
    next();
};
module.exports.isOwner= async(req,res,next)=>{
 
    let {id}=req.params;
    let list=await Listing.findById(id);
    if(!list.owner.equals(res.locals.curruser._id)){
      req.flash("error","you are not the owner of this listings");
      res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validatelistings=(req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new Expresserror(400,errmsg);
    }else{
      next();
    }
  };

  module.exports. validatereview=(req,res,next)=>{
      let {error}=reviewschema.validate(req.body);
      if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new Expresserror(400,errmsg);
      }else{
        next();
      }
    }
    
    module.exports.isreviewAuthor= async(req,res,next)=>{
 
      let {id,reviewId}=req.params;
      let review=await Review.findById(reviewId);
      if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","you did not create this review");
        return res.redirect(`/listings/${id}`);
      }
      next();
  };