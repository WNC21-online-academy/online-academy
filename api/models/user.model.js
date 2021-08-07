const db = require('../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  all() {
    return db('account')
      .where('role', 'teacher')
      .orWhere('role', 'student');
  },
  add(user) {
    return db('account')
      .insert({
        ...user,
        password: bcrypt.hashSync(user.password, saltRounds)
      })
      .returning('email');
  },
  async isEmailExist(email) {
    const result = await db('account')
      .where('email', email)
      .count('*', { as: 'count' });

    return result[0].count > 0;
  },
  single(id) {
    return db('course')
      .where('id', id)
      .first();
  },
  singleByEmail(email) {
    return db('account')
      .where('email', email)
      .first();
  },

  patchRFToken(id, rfToken) {
    return db('account').where('id', id).update('refresh_token', rfToken);
  },

  async isValidRFToken(id, rfToken) {
    const list = await db('account').where('id', id).andWhere('refresh_token', rfToken);
    if (list.length > 0) {
      return true;
    }
    return false;
  }

  // update(id, category) {
  //   return db('category').where('category_id', id).update(category);
  // },
};
