const db = require('../utils/db');

module.exports = {
  async search(kw, catId, orderBy, offset, limit) {
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('courses_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(catId ? `id_category = ${catId}` : '')
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('courses_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(catId ? `id_category = ${catId}` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },
  listTopHot(offset, limit) {
    return db('courses')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopView(offset, limit) {
    return db('courses')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopNew(offset, limit) {
    return db('courses')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopEnroll(offset, limit) {
    return db('courses')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  listTopRelated(id, offset, limit) {
    return db('courses')
      .orderBy('view_count', 'desc')
      .limit(limit)
      .offset(offset);
  },
  single(id) {
    return db('courses_view')
      .where('id', id)
      .first();
  },
};
