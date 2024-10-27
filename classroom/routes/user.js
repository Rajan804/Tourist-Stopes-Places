const express = require("express");
const router = express.Router();

// index users
router.get("/" , (req,res)=>{
    res.send("Get for users");
})

//show users
router.get("/:id" , (req,res)=>{
    res.send("Get for users id");
})

//Post users
router.post("/" , (req,res)=>{
    res.send("Post for users");
})

// Delete users
router.delete("/:id" , (req,res)=>{
    res.send("delete for users id");
})

module.exports = router;