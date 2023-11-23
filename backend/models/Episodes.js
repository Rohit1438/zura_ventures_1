const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Episode", episodeSchema);
