const db = require('../utils/db');

module.exports = {
  all() {
    return db('categories_view');
  },

  async search(kw, orderBy, offset, limit) {
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('categories_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset);
    const count = await db('categories_view')
      .whereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async add(category) {
    const { id_parent } = category
    const result = await db('categories')
      .insert({
        ...category,
        id_parent: id_parent > 0 ? id_parent : null
      })
      .returning('*');
    return result[0];
  },

  async update(id, category) {
    const { id_parent } = category
    const result = await db('categories')
      .where('id', id).update({
        ...category,
        id_parent: id_parent > 0 ? id_parent : null
      })
      .returning('*');
    return result[0];
  },

  delete(id) {
    return db('categories').where('id', id).del();
  },

  name(id) {
    return db('categories')
      .select('name')
      .where('id', id)
      .first();
  }
};
