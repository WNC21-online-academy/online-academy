const db = require('../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  async searchStudents(kw, orderBy, offset, limit) {
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('users_view')
      .where('role', 'student')
      .andWhereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .orderBy(orderBy)
      .limit(limit || null)
      .offset(offset || null);
    const count = await db('users_view')
      .where('role', 'student')
      .andWhereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },
  async searchTeachers(kw, orderBy, offset, limit) {
    let keywordPieces = '';
    if (kw) {
      keywordPieces = kw.trim().toLowerCase().replace(/\s+/g, "|");
    }

    const list = await db('users_view')
      .where('role', 'teacher')
      .andWhereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .orderBy(orderBy)
      .limit(limit || null)
      .offset(offset || null);
    const count = await db('users_view')
      .where('role', 'teacher')
      .andWhereRaw(keywordPieces ? `name_tsv @@ unaccent('${keywordPieces}')::tsquery` : '')
      .count('*', { as: 'count' });

    return {
      count: +count[0].count,
      list
    };
  },

  async add(user) {
    const result = await db('users')
      .insert({
        ...user,
        password: bcrypt.hashSync(user.password, saltRounds)
      })
      .returning('*');
    return { ...result[0], password: undefined };
  },
  async update(id, user) {
    const result = await db('users')
      .where('id', id).update(user)
      .returning('*');
    return { ...result[0], password: undefined };
  },

  async isEmailExist(email) {
    const result = await db('users')
      .where('email', email)
      .count('*', { as: 'count' });

    return result[0].count > 0;
  },
  single(id) {
    return db('users')
      .where('id', id)
      .first();
  },
  singleByEmail(email) {
    return db('users')
      .where('email', email)
      .first();
  },

  patchRFToken(id, rfToken) {
    return db('users').where('id', id).update('refresh_token', rfToken);
  },

  async isValidRFToken(id, rfToken) {
    const list = await db('users').where('id', id).andWhere('refresh_token', rfToken);
    if (list.length > 0) {
      return true;
    }
    return false;
  },

  delete(id) {
    return db('users').where('id', id).del();
  },

  name(id) {
    return db('users')
      .select('name')
      .where('id', id)
      .first();
  }
};
