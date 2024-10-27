const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url : String,
        filename : String,
        // type:String,
        // default:"https://png.pngtree.com/thumb_back/fh260/background/20230407/pngtree-living-room-home-warm-background-image_2129967.jpg",
        // set: (v) => v === "" ? "https://png.pngtree.com/thumb_back/fh260/background/20230407/pngtree-living-room-home-warm-background-image_2129967.jpg"
        // : v ,
    },
    price:Number,
    location: String,
    country:String,
    reviews:[
        {           //add reviews Schema
        type :Schema.Types.ObjectId,
        ref:"Review"
        },
    ],
    owner:{
        type :Schema.Types.ObjectId,
        ref: "User"
    }
});

//when my listing is delete then uske ander jitna review hoga wo bhi delete ho jayenge 
// it is work like middleware
listingSchema.post("findOneAndDelete" , async(listing)=>{
    if(listing){
        await Review.deleteMany({ _id: { $in : listing.reviews}})
    }
})

const Listing= mongoose.model("Listing",listingSchema);
module.exports=Listing;