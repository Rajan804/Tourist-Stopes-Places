if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
// console.log(process.env.SECRET);

const express=require("express");
const app=express();
const mongoose=require("mongoose"); 
const path=require("path");
const methodOverride=require('method-override');
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js"); 
const reviewsRouter = require("./routes/review.js"); 
const userRouter = require("./routes/user.js"); 


app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));  // body data use
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const MONGO_URL =('mongodb://127.0.0.1:27017/wanderlust');
main().then(()=>{
    console.log("connected DB");
})
.catch(err =>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const sessionOptions={
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,     // protect to cross scripting attacks
    }
};

app.use(session(sessionOptions));
app.use(flash());       // always write route ke uper

// users Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));// user ko login and sign up krana authenticate se so use nichhe wala

passport.serializeUser(User.serializeUser());// stroe data related to user (on session)
passport.deserializeUser(User.deserializeUser());// delete data

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser = req.user;     // use in login,logout,signup show mai (navbar);
    next();
})

// app.get("/demouser",async (req,res)=>{
//     let fakeUser = new User({
//         email: "student@123",
//         username: "Hello",
//     });
// //                                   username , password
//     let registerdUser= await User.register(fakeUser,"helloworld");
//     res.send(registerdUser);
// })


app.use("/listings", listingsRouter); // /listings se start all route  listings.js file se run ho jayega
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);



app.get("/",(req,res)=>{
    res.send("Root is working Now");
})

// not response not match any rout then show it
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
})

// Error Handling
app.use((err,req,res,next)=>{
    let {statusCode=505,message="Something went Wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
})

app.listen(8080,()=>{
    console.log("Port is listen on 8080");
})

// req.body.listing isme listing jo hai 
// wo js ka object jo apne dataabase ke 
// element ko ek hi sath bhej diye hai 
// object mai example-> 
//listing["tile","description","price",
//         "image","country","location"]

// access| add data in database
// app.get("/testListing", async(req,res)=>{
//     let sampleListing= new Listing({
//         title:"My Home",
//         description:"By the Beach",
//         price: 1200,
//         location: "Calangute , Goa",
//         country: "India"
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfully testing");
// })