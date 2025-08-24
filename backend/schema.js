const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: [String],
  reactions: { type: Number, default: 0 },
}, { timestamps: true }); // adds createdAt + updatedAt

module.exports = mongoose.model("Post", postSchema);
