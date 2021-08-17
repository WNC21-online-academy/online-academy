const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { uploadImages } = require('../../middlewares/file-upload.mdw')
const userModel = require('../../models/user.model');
const roleModel = require('../../models/role.model');
const authMdw = require('../../middlewares/auth.mdw');
const pathPrefix = '/assets/images/';

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

// Change password
router.put('/change-pw', authMdw, async function (req, res) {
  const { oldPw, newPw } = req.body;
  const { userId } = req.accessTokenPayload;

  const user = await userModel.single(userId);
  if (!user || !bcrypt.compareSync(oldPw, user.password)) {
    return res.status(401).json({
      message: 'Invalid input'
    });
  }

  const ret = await userModel.updatePassword(userId, { password: newPw });

  return res.status(200).json(ret);
})

// Update profile
router.put('/profile', authMdw, uploadImages.single('avatar'), async function (req, res) {
  const { fullname, email } = req.body;
  const { userId } = req.accessTokenPayload;
  if (!userId) {
    return res.status(401).json({
      message: 'Invalid'
    });
  }
  const file = req.file;
  const avatar = file ? `${pathPrefix}${file.filename}` : '';
  const ret = await userModel.update(userId, { fullname, email, avatar });
  return res.status(200).json({ id: ret.id });
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

// get one
router.get('/:id', async function (req, res) {
  const { id } = req.params;
  const user = await userModel.viewSingle(id);
  res.status(200).json(user);
})

module.exports = router;
