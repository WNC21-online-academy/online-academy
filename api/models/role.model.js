const db = require('../utils/db');

module.exports = {
  name(id) {
    return db('roles')
      .select('name')
      .where('role', id)
      .first();
  }
};
