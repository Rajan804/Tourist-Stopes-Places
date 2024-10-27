const mongoose=require("mongoose");
const initData = require("./data.js");
const Listing=require("../models/listing.js");

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

const initDB = async ()=>{
    await Listing.deleteMany({});  // if which data already in our DB so first delete them ;
    initData.data = initData.data.map((obj) =>({...obj , owner:'661a513e6597c91ac0fe9f21'}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();