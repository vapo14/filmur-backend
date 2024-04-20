const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    isSpoiler: {
      type: Boolean,
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    ownerUsername: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    yarnRating: {
      type: Number,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
    },
    commentCount: {
      type: Number,
      required: true,
    },
    userLikes: {
      type: [String],
      required: true,
    },
    userSaves: {
      type: [String],
      required: true,
    },
    imgURI: {
      type: String,
      required: true,
    },
    published: {
      type: Date,
      required: true,
    },
  },
  { collection: "Reviews" }
);

reviewSchema.set("versionKey", false);

module.exports = mongoose.model("Review", reviewSchema);
