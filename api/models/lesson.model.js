const db = require('../utils/db');

module.exports = {
  single(id) {
    return db('lessons_view')
      .where('id', id)
      .first();
  },

  async listByCourse(kw, courseId, orderBy, offset, limit) {
    if (!courseId) {
      return null;
    }
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('lessons_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(courseId ? `id_course = ${courseId}` : '')
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('lessons_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(courseId ? `id_course = ${courseId}` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async add(lesson) {
    const { id_course } = lesson
    const result = await db('lessons')
      .insert({
        ...lesson,
        id_course: id_course > 0 ? id_course : undefined
      })
      .returning('*');
    return result[0];
  },

  async update(id, lesson) {
    const { id_course } = lesson
    const result = await db('lessons')
      .where('id', id).update({
        ...lesson,
        id_course: id_course > 0 ? id_course : undefined
      })
      .returning('*');
    return result[0];
  },

};
