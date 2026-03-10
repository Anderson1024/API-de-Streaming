const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  duration: {
    type: Number,
    required: true
  },

  views: {
    type: Number,
    default: 0
  },

  averageRating: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

// índices obrigatórios
VideoSchema.index({ category: 1 });
VideoSchema.index({ views: -1 });

module.exports = mongoose.model("Video", VideoSchema);