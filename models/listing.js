const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingschema=new Schema({
    title:{
    type:String,
    required:true,
},
    description:String,
    image:{
        // type:String,
        // default:"https://www.istockphoto.com/photo/coconut-trees-and-turquoise-indian-ocean-gm670761990-122731045?utm_campaign=srp_photos_zsr&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunnyimage&utm_medium=affiliate&utm_source=unsplash&utm_term=sunnyimage%3A%3A%3A",
        // set:(v)=>v ==="" ?
        //  "https://www.istockphoto.com/photo/coconut-trees-and-turquoise-indian-ocean-gm670761990-122731045?utm_campaign=srp_photos_zsr&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fsunnyimage&utm_medium=affiliate&utm_source=unsplash&utm_term=sunnyimage%3A%3A%3A"
        //  : v,
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
    
});



const Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;
