const express=require("express");
const router=express.Router();      // <-- create a object(name-router) work as middleware
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js")

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})



router.route("/")
     .get(wrapAsync(listingController.index))
//      .post(isLoggedIn,validateListing,
//     wrapAsync(listingController.createListings)
// );
     .post(
          isLoggedIn,
          upload.single('listing[image]'),
          validateListing,
          wrapAsync(listingController.createListings)
     );

 // Create New Rout for Adding data
 router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
     .get(wrapAsync(listingController.showListings))
     .put(isLoggedIn, isOwner, 
     upload.single('listing[image]'),
     // validateListing,
     wrapAsync(listingController.updateListing)
).delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



//Edit Rout
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm)
);


module.exports = router;