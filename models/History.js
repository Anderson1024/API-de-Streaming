const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
        index: true
    },

    watchedAt: {
        type: Date,
        default: Date.now,
        index: true
    }

});

module.exports = mongoose.model("History", historySchema);