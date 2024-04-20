/**
 * Middleware that checks whether the user is not authenticated.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const checkNotAuthenticated = (req, res, next) => {
  // if the user is authenticated, return not allowed,
  // else continue next callback
  if (req.isAuthenticated()) {
    return res.status(400).send();
  }
  next();
};

module.exports = checkNotAuthenticated;
