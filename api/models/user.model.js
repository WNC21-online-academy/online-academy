const db = require('../utils/db');

module.exports = {
  all() {
    return db('account')
    .where('type', 'teacher')
    .orWhere('type', 'student');
  },
};
