// Server side form validation using Joi packages
const Joi= require('joi');

// write schema, which you want to valid for form
module.exports.listingSchema= Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image: Joi.string().allow("",null),
    }).required()
});

module.exports.reviewSchema= Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        conmment:Joi.string().required(),                   // conmment because mistake se comment ke space per conmment db mai store kr diye hai
    }).required()
});