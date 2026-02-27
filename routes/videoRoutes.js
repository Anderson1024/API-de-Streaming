const express = require("express");
const router = express.Router();

const Video = require("../models/Video");


// LISTAR videos
router.get("/videos", async (req, res) => {

    const videos = await Video.find();

    res.json(videos);

});


// CRIAR video  ← ESTA PARTE É ESSENCIAL
router.post("/videos", async (req, res) => {

    try {

        const video = new Video({
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration
        });

        await video.save();

        res.status(201).json(video);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;