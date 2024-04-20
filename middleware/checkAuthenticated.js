/**
 * Middleware for checking whether the user is authenticated.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkAuthenticated = (req, res, next) => {
  // if the user is authenticated continue to the next callback
  // else return not allowed
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send();
  }
};

module.exports = checkAuthenticated;
