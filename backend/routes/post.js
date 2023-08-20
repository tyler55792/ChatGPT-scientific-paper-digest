const express = require("express");
const Post = require('../models/post');
const router = express.Router();

// CREATE OPERATION
router.post("/", function(req, res) {
    const post = new Post({
        date: req.body.date,
        title: req.body.title,
        content: req.body.content,
        featured: req.body.featured,
        url: req.body.url
    })
    post.save()
        .then(post => {
            res.status(201).json({
                message: "Succesfully created in db!",
                post: {
                    ...post, 
                    id: post._id
                }
            })
        }).catch(e => {
            console.log(e)
        })
})


// READ OPERATION
router.get("/", function(req, res) {
    Post.find()
        .then(posts => {
            res.status(200).json({
                posts: posts
            })
        })
})

router.get("/:id", function(req, res) {
    const id =req.params.id;

    Post.findOne({_id: id})
        .then(post => {
            res.status(200).json({
                post: post
            })
        })
})

// UPDATE OPERATION
router.put("/:id", function(req, res) {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date
    })
    Post.replaceOne({_id: req.params.id}, post)
        .then(result => {
            res.status(200).json({post: result})
        }).catch(e=> {
            console.log(e)
        })
})

// DELETE OPERAITON
router.delete("/:id", function(req, res) {
    Post.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({message: "complete"})
        }).catch(e=> {
            console.log(e)
        })
})

module.exports = router;