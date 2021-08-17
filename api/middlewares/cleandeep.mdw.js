const cleanDeep = require('clean-deep');

module.exports = function (req, res, next) {
  console.log('req.body :>> ', req.body);

  req.body = cleanDeep(req.body);

  console.log('req.body :>> ', req.body);
  console.log('cleanDeep(req.body) :>> ', cleanDeep(req.body));
  next();
}