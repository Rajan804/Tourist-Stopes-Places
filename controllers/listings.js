const { query } = require("express");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//index Rout
module.exports.index = async(req,res)=>{
    const allListings= await Listing.find({});
     res.render("listings/index.ejs",{allListings});
}

// Create New Rout for Adding data
module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user);
    res.render("listings/new.ejs");
}

// show Rout
module.exports.showListings = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate('owner');
    if(!listing){
        req.flash("error","Listing you requested for does not exist!"); // add item time any error then show this sms
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}

//Create Rout
module.exports.createListings = async (req,res,next)=>{  
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send();

    console.log(response.body.features[0].geometry);
    res.send("done!");


    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename} ;
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");   
}

//Edit Rout
module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_20");
    res.render("listings/edit.ejs",{listing , originalImageUrl});
}

// Update Rout
module.exports.updateListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image={url , filename} ;
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

//Delete Rout
module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}