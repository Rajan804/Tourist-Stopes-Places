const express =require("express");
const router=express.Router({mergeParams:true}); 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");  
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {validateReview, isLoggedIn ,isReviewAuther}= require("../middleware.js");

const reviewController = require("../controllers/reviews.js");





//its for Review
// Post Review Route direct create
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;