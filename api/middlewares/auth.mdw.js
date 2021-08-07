const jwt = require('jsonwebtoken');
const authSecret = process.env.AUTH_SECRET;

module.exports = function (req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, authSecret);
      console.log(decoded);
      req.accessTokenPayload = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message: 'Invalid access token!'
      });
    }
  } else {
    return res.status(400).json({
      message: 'Access token not found!'
    });
  }
}