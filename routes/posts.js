const express = require(`express`);
// const { verify } = require("jsonwebtoken");
const verify = require(`../routes/verifyToken`);
const {asyncHandler} = require("../middlewares/auth")
const router = express.Router();

// Posta model
const Articles = require(`../models/Posts`);

// Get all article
router.get(`/`,async (req, res) =>{
    try {
        const articles = await Articles.find();
        if(!articles) throw Error(`No Items`);
        res.status(200).json(articles);
    }catch(err){
        res.status(400).json({msg: err})
    }
})

// Get an article
router.get(`/:id`,async (req, res) =>{
    try {
        const article = await Articles.findById(req.params.id);
        if(!article) throw Error(`No Items`);
        res.status(200).json(article);
    }catch(err){
        res.status(400).json({msg: err})
    }
})

// Post an article
router.post(`/`, async (req, res) =>{
  const newArticle= new Articles(req.body);
 try{
 const article = await newArticle.save();
 if(!article) throw Error(`Something went wrong`)
 res.status(200).json(article);
} 
 catch (err){
res.status(400).json({msg: err})
 }
});
   
//Delete an article
router.delete(`/:id`,async (req, res) =>{
    try {
        const article = await Articles.findByIdAndDelete(req.params.id);
        if(!article) throw Error(`No Article found`);
        res.status(200).json({success: true});
    }catch(err){
        res.status(400).json({msg: err})
    }
})


//Update an article
router.patch(`/:id`,async (req, res) =>{
    try {
        const article = await Articles.findByIdAndUpdate(req.params.id, req.body);
        if(!article) throw Error(`Something went wrong`);
        res.status(200).json({success: true});
    }catch(err){
        res.status(400).json({msg: err})
    }
})


module.exports =  router;