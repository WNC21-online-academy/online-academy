const db = require('../utils/db');

module.exports = {
  single(userId, courseId) {
    return db('watchlists')
      .where('id_user', userId)
      .andWhere('id_course', courseId)
      .first();
  },

  async add(watchlist) {
    const result = await db('watchlists')
      .insert(watchlist)
      .returning('*');
    return result[0];
  },

  delete(userId, courseId) {
    return db('watchlists')
      .where('id_user', userId)
      .andWhere('id_course', courseId)
      .del();
  },
};
