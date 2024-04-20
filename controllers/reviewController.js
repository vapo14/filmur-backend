const reviewModel = require("../models/reviewModel");

/**
 * get all reviews and sort them by date published in ascending order
 * @param {*} req
 * @param {*} res
 */
const getAllReviews = async (req, res) => {
  res.json(await reviewModel.find().sort({ published: -1 }));
};

/**
 * Get all reviews by a given user ID, sorted by date published
 * @param {*} req
 * @param {*} res
 */
const getReviewsByUserId = async (req, res) => {
  res.json(
    await reviewModel.find({ owner: req.user._id }).sort({ published: -1 })
  );
};

/**
 * Get review by review id.
 * @param {*} req
 * @param {*} res
 */
const getReviewById = async (req, res) => {
  res.json(await reviewModel.findOne({ _id: req.query.reviewId }));
};

/**
 * Get reviews that the user has liked/saved
 * @param {*} req
 * @param {*} res
 */
const getReviewsLikedByUser = async (req, res) => {
  res.json(await reviewModel.find({ userLikes: req.user._id }));
};

/**
 * Get review by movie ID.
 * @param {*} req
 * @param {*} res
 */
const getReviewsByMovieId = async (req, res) => {
  try {
    res.json(await reviewModel.find({ movieId: req.query.q }));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Post a new review using the request body data.
 * @param {*} req
 * @param {*} res
 */
const postReview = async (req, res) => {
  try {
    let newPost = new reviewModel({
      isSpoiler: req.body.isSpoiler,
      movieId: req.body.movieId,
      owner: req.user._id,
      ownerUsername: req.user.username,
      title: req.body.title,
      content: req.body.content,
      yarnRating: req.body.yarnRating,
      likeCount: 0,
      commentCount: 0,
      userLikes: [],
      userSaves: [],
      imgURI: req.body.imgURI,
      published: Date(),
    });

    newPost.save((err) => {
      if (err) res.status(500).send(`Error creating post, ${err}`);
      return res.status(200).json({ status: "POST_SAVED" });
    });
  } catch (error) {
    res.status(500).send(`Error creating post, ${error}`);
  }
};

const likeReview = async (req, res) => {
  let reviewId = req.query.reviewId;
  // determine if the user has already liked the review
  let hasLiked = await reviewModel.findOne({
    _id: reviewId,
    userLikes: req.user._id,
  });
  if (hasLiked) {
    try {
      await reviewModel.findByIdAndUpdate(reviewId, {
        $pull: { userLikes: req.user._id },
        $inc: { likeCount: -1 },
      });
      return res.status(200).json({ status: "UNLIKED_REVIEW" });
    } catch (err) {
      console.log(err);
      res.json(err);
      return;
    }
  } else {
    try {
      await reviewModel.findByIdAndUpdate(reviewId, {
        $push: { userLikes: req.user._id },
        $inc: { likeCount: 1 },
      });
      return res.status(200).json({ status: "LIKED_REVIEW" });
    } catch (err) {
      console.log(err);
      res.json(err);
      return;
    }
  }
};

const deleteReview = async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Successfully deleted your review!",
    });
  } catch (err) {
    res.json({
      status: "failed",
      message: "Could not complete operation. Refresh and try again.",
    });
  }
};

module.exports = {
  getAllReviews,
  postReview,
  getReviewById,
  getReviewsByUserId,
  getReviewsByMovieId,
  likeReview,
  getReviewsLikedByUser,
  deleteReview,
};
