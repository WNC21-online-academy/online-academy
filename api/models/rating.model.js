const db = require('../utils/db');

module.exports = {
  all() {
    return db('rating');
  },
};
