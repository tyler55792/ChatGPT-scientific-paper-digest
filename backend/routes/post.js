const express = require("express");
const Post = require('../models/post');
const axios = require("axios");

const router = express.Router();

// Store PDF in database using chatPDF's API
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

// Delete PDF from database using chatPDF's API
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
        // get reference to stored PDF in chatPDF, save this in MongoDB
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
        console.log(error);
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
});


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
    // delete from MongoDB 
    Post.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({message: "complete"})
        }).catch(e=> {
            console.log(e)
        })
    
    // delete from chatPDF databse
    const source = req.query.sourceID;
    deletePDF(source);
})

module.exports = router;