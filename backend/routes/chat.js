const express = require("express");
const Post = require('../models/post');
const axios = require("axios");

const router = express.Router();

// query chatPDF
const queryGPT = async (dataObj) => {
    try {
        const config = {
            headers: {
              "x-api-key": process.env.CHATPDF_KEY,
              "Content-Type": "application/json",
            },
        };

        const data = {
            referenceSources: true,
            ...dataObj
          };

        const response = await axios.post("https://api.chatpdf.com/v1/chats/message", data, config);
        return response.data;
    } catch (error) {
        console.log("Error:", error.message);
        console.log("Response:", error.response.data);
        throw error;
    }
};

router.post("/", async function(req, res) {
    try {
        // chatPDF response to query
        const responseObj = await queryGPT(req.body);

        res.status(201).json(responseObj);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
});

module.exports = router;