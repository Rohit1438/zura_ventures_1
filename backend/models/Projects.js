const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  episodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Episode',
    }
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Project", projectSchema);
