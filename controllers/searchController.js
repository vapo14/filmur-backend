const axiosInstance = require("../api/axiosInstance");

const baseURL = process.env.MOVIE_API_URL;

const searchMovie = async (req, res) => {
  try {
    let data = await axiosInstance.get(baseURL, {
      params: {
        apiKey: process.env.MOVIE_API_KEY,
        s: req.query.q,
      },
    });

    return res.send(data.data.Search);
  } catch (error) {
    return res
      .status(500)
      .json({ status: "FAILED", message: "Search failed. Try again." });
  }
};

module.exports = { searchMovie };
