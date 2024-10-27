const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);

    // jo review form mai data aayega use newReview mai store krenge 
    let newReview= new Review(req.body.review); //isme review object hai jo show.ejs ke reviw form se aaya hai 

    //listing.js mai reviews arry add hai to all listing ke pass reviews hoga then 
    listing.reviews.push(newReview);// push kr denge apne newReview ko

    // save the data
    await newReview.save();
    await listing.save();
    req.flash("success","New Review created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId} });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review Deleted!");
    res.redirect(`/listings/${id}`);
};