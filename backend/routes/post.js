const express = require("express");
const Post = require('../models/post');
const axios = require("axios");

const router = express.Router();

// Store PDF in ChatPDF's database using API
// Guidance from ChatPDF's API documentaiton 
const storePDF = async (pdfUrl) => {
    try {
        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_KEY,
                "Content-Type": "application/json",
            },
        };

        const data = {
            url: pdfUrl,
        };

        const response = await axios.post("https://api.chatpdf.com/v1/sources/add-url", data, config);
        return response.data.sourceId;
    } catch (error) {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
        throw error;
    }
};

// Delete PDF from ChatPDF's database using API
// Guidance from ChatPDF's API documentaiton
const deletePDF = async (sourceID) => {
    try {
        const config = {
            headers: {
                "x-api-key": process.env.CHATPDF_KEY,
                "Content-Type": "application/json",
            },
        };

        const data = {
            sources: [sourceID],
        };

        const response = await axios.post("https://api.chatpdf.com/v1/sources/delete", data, config);
        return response.data.sourceId;
    } catch (error) {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
        throw error;
    }
};

// CREATE OPERATION
router.post("/", async function(req, res) {
    try {
        // Get reference to PDF in chatPDF's database
        const sourceID = await storePDF(req.body.url);

        const post = new Post({
            date: req.body.date,
            title: req.body.title,
            content: req.body.content,
            featured: req.body.featured,
            url: req.body.url,
            sourceID: sourceID,
        });

        const savedPost = await post.save();

        res.status(201).json({
            message: "Successfully created in db!",
            post: {
                ...savedPost,
                id: savedPost._id,
            },
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({message: "Internal server error"});
    }
});


// READ OPERATIONS
router.get("/", function(req, res) {
    Post.find().sort({date: -1})
        .then(posts => {
            res.status(200).json({
                posts: posts
            })
        }).catch((error) => {
            console.log('Error: ', error)
            res.status(500).json({ message: "Internal server error" })
        })
})

router.get("/:id", function(req, res) {
    const id =req.params.id;

    Post.findOne({_id: id})
        .then(post => {
            res.status(200).json({
                post: post
            })
        }).catch((error) => {
            console.log('Error: ', error)
            res.status(500).json({ message: "Internal server error" })
        })
})

// UPDATE OPERATION
router.put("/:id", function(req, res) {
    const newFeaturedValue = !JSON.parse(req.query.featured);

    Post.updateOne(
            {_id: req.params.id}, 
            { $set: { featured: newFeaturedValue } })
        .then(()=> {
            res.status(200).json({ message: "Post updated succesfully"})
        }).catch((error) => {
            console.log('Error: ', error)
            res.status(500).json({ message: "Internal server error" })
        })
})

// DELETE OPERAITON
router.delete("/:id", function(req, res) {
    // Delete from MongoDB 
    Post.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({message: "Post deleted succesfully"})
        }).catch((error)=> {
            console.log('Error: ', error)
            res.status(500).json({message: "Internal server error"})
        })
    
    // Delete from chatPDF's database
    const source = req.query.sourceID;
    deletePDF(source);
})

module.exports = router;