const db = require('../utils/db');

module.exports = {
  async search(kw, catId, orderBy, offset, limit) {
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const courses = await db('course_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(catId ? `id_category = ${catId}` : '')
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('course_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(catId ? `id_category = ${catId}` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      courses
    };
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
    return db('course_view')
      .where('id', id)
      .first();
  },
};
