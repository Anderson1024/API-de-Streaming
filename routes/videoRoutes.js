const express = require("express");
const router = express.Router();

const Video = require("../models/Video");
const History = require("../models/History");


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
            category: req.body.category,
            duration: req.body.duration
        });

        await video.save();

        res.status(201).json(video);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.get("/videos/top", async (req, res) => {

    try {

        const videos = await Video.aggregate([
            { $sort: { views: -1 } },
            { $limit: 10 }
        ]);

        res.json(videos);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.get("/videos/ratings", async (req, res) => {

    try {

        const ratings = await History.aggregate([

            {
                $match: { rating: { $exists: true } }
            },

            {
                $group: {
                    _id: "$videoId",
                    averageRating: { $avg: "$rating" }
                }
            }

        ]);

        res.json(ratings);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

router.get("/videos/category/:category", async (req, res) => {

    try {

        const videos = await Video.find({
            category: req.params.category
        });

        res.json(videos);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});

module.exports = router;