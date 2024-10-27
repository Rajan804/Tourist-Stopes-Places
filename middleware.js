const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");  // this for schema.js use for form validation


module.exports.isLoggedIn= (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "You must be loged in to create listing!")
        return res.redirect("/login");
    }
    next();
}

// it is validate listing | middleware          server side form validation
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body); // use for validation of all listing are exesting or not
    // console.log(result);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(","); //eliminate error then seperate to coma
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

// it is validate Review(rating & comment) | middleware     server side form validation
module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body); // use for validation of all listing are exesting or not
    // console.log(result);
    if(error){
        let errMsg= error.details.map((el)=>el.message).join(","); //eliminate error then seperate to coma
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


module.exports.isOwner = async(req, res, next) =>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    if(listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You have not permision to edit")
        return res.redirect(`/listings/${id}`)
    }
    next();
}