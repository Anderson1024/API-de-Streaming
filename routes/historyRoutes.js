const express = require("express");
const router = express.Router();

const History = require("../models/History");
const Video = require("../models/Video");
const mongoose = require("mongoose");

// registrar visualização
router.post("/history", async (req, res) => {

  try {

    const { userId, videoId, progress, rating } = req.body;

    const history = new History({
      userId,
      videoId,
      progress,
      rating
    });

    await history.save();

    // incrementa visualizações do vídeo
    await Video.updateOne(
      { _id: videoId },
      { $inc: { views: 1 } }
    );

    res.status(201).json(history);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

router.get("/history", async (req, res) => {

  try {

    const history = await History.find()
      .populate("userId")
      .populate("videoId");

    res.json(history);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

// listar histórico
router.get("/history/user/:id", async (req, res) => {

  try {

    const history = await History.aggregate([

      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.params.id)
        }
      },

      {
        $lookup: {
          from: "videos",
          localField: "videoId",
          foreignField: "_id",
          as: "video"
        }
      }

    ]);

    res.json(history);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});

module.exports = router;