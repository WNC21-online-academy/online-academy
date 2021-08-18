const db = require('../utils/db');

module.exports = {
  async listByCourse(courseId, orderBy, offset, limit) {
    if (!courseId) {
      return null;
    }

    const list = await db('rating_view')
      .where('id_course', courseId)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('rating_view')
      .where('id_course', courseId)
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async add(rating) {
    const result = await db('rating')
      .insert(rating)
      .returning('*');
    return result[0];
  },
  async update(id, rating) {
    const result = await db('rating')
      .where('id', id)
      .update(rating)
      .returning('*');
    return result[0];
  },
};
