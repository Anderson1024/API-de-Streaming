const express = require("express");
const router = express.Router();
const History = require("../models/History");


// RANKING DE VIDEOS MAIS ASSISTIDOS
router.get("/ranking/videos", async (req, res) => {
  try {

    const ranking = await History.aggregate([

      {
        $group: {
          _id: "$videoId",
          totalViews: { $sum: 1 }
        }
      },

      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "_id",
          as: "video"
        }
      },

      {
        $unwind: "$video"
      },

      {
        $project: {
          _id: 0,
          videoId: "$video._id",
          title: "$video.title",
          totalViews: 1
        }
      },

      {
        $sort: { totalViews: -1 }
      }

    ]);

    res.json(ranking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// RANKING DE USUARIOS MAIS ATIVOS
router.get("/ranking/users", async (req, res) => {
  try {

    const ranking = await History.aggregate([

      {
        $group: {
          _id: "$userId",
          totalViews: { $sum: 1 }
        }
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      {
        $unwind: "$user"
      },

      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          totalViews: 1
        }
      },

      {
        $sort: { totalViews: -1 }
      }

    ]);

    res.json(ranking);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;