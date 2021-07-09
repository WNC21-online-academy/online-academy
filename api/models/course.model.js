const db = require('../utils/db');

module.exports = {
  listAll(kw, catId, offset, limit) {
    const courses = db('course')
      .limit(limit)
      .offset(offset);
    if (catId && typeof catId === 'number') {
      courses.where('id_category', catId);
    }
    return courses;
  },
  listTopHot(offset, limit) {
    return db('course')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopView(offset, limit) {
    return db('course')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopNew(offset, limit) {
    return db('course')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopEnroll(offset, limit) {
    return db('course')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopRelated(id, offset, limit) {
    return db('course')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  single(id) {
    return db('course')
      .where('ids', id)
      .first();
  },
};
