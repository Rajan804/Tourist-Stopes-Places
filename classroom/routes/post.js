const express = require("express");
const router = express.Router();

//Posts
// index posts
router.get("/" , (req,res)=>{
    res.send("Get for posts");
})

//show posts
router.get("/:id" , (req,res)=>{
    res.send("Get for posts id");
})

//Post posts
router.post("/" , (req,res)=>{
    res.send("Post for posts");
})

// Delete posts
router.delete("/:id" , (req,res)=>{
    res.send("delete for posts id");
});

module.exports = router;