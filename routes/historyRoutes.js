const express = require("express");
const router = express.Router();

const History = require("../models/History");


// registrar visualização
router.post("/history", async (req, res) => {

    try {

        const history = new History({
            userId: req.body.userId,
            videoId: req.body.videoId
        });

        await history.save();

        res.status(201).json(history);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

});


// listar histórico
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

module.exports = router;