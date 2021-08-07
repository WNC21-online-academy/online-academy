const db = require('../utils/db');

module.exports = {
  all() {
    return db('rating');
  },
  add(rating) {
    return db('rating')
      .insert(rating);
  },
};
