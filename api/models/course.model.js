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

  async listByCreator(kw, creatorId, orderBy, offset, limit) {
    if (!creatorId) {
      return null
    }
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('courses_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(creatorId ? `id_created_by = ${creatorId}` : '')
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('courses_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .whereRaw(creatorId ? `id_created_by = ${creatorId}` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async listByStudent(kw, userId, orderBy, offset, limit) {
    if (!userId) {
      return null
    }
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('courses_view')
      .join('course_details', 'course_details.id_course', 'courses_view.id')
      .whereRaw(keywordPieces ? `courses_view.name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .andWhere('course_details.id_user', userId)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('courses_view')
      .join('course_details', 'course_details.id_course', 'courses_view.id')
      .whereRaw(keywordPieces ? `courses_view.name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .andWhere('course_details.id_user', userId)
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async listByWatchlist(kw, userId, orderBy, offset, limit) {
    if (!userId) {
      return null
    }
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('courses_view')
      .join('watchlists', 'watchlists.id_course', 'courses_view.id')
      .whereRaw(keywordPieces ? `courses_view.name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .andWhere('watchlists.id_user', userId)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('courses_view')
      .join('watchlists', 'watchlists.id_course', 'courses_view.id')
      .whereRaw(keywordPieces ? `courses_view.name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .andWhere('watchlists.id_user', userId)
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async add(course) {
    const { id_category } = course
    const result = await db('courses')
      .insert({
        ...course,
        id_category: id_category > 0 ? id_category : null
      })
      .returning('*');
    return result[0];
  },

  async update(id, course) {
    const { id_category } = course
    const result = await db('courses')
      .where('id', id).update({
        ...course,
        id_category: id_category > 0 ? id_category : null
      })
      .returning('*');
    return result[0];
  },

  name(id) {
    return db('courses')
      .select('name')
      .where('id', id)
      .first();
  }
};
