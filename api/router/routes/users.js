const express = require('express');
const router = express.Router();
const userModel = require('../../models/user.model');
const roleModel = require('../../models/role.model');
const authMdw = require('../../middlewares/auth.mdw');

router.get('/students', async function (req, res) {
  const { keyword, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await userModel.searchStudents(keyword, orderBy, +offset, +limit);
  res.status(200).json({ count, list });
})

router.get('/teachers', async function (req, res) {
  const { keyword, offset, limit } = req.query;
  let orderBy = [{
    column: 'updated_at',
    order: 'desc'
  }];
  const { count, list } = await userModel.searchTeachers(keyword, orderBy, +offset, +limit);
  res.status(200).json({ count, list });
})

// Add 
router.post('/', async function (req, res) {
  try {
    const user = await userModel.add(req.body);
    if (user) {
      const { role } = user;
      if (role) {
        const roleObj = await roleModel.name(role);
        user.name_role = roleObj.name;
      }
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Update 
router.put('/:id', async function (req, res) {
  try {
    const { id } = req.params;
    const user = await userModel.update(id, req.body);
    if (user) {
      const { role } = user
      if (role) {
        const roleObj = await roleModel.name(role);
        user.name_role = roleObj.name;
      }
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

// Delete 
router.delete('/:id', async function (req, res) {
  const { id } = req.params;
  try {
    const result = await userModel.delete(id);
    res.status(200).json(result ? id : 0);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
})

module.exports = router;
