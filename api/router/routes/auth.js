const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const userModel = require('../../models/user.model');
const validateMdw = require('../../middlewares/validate.mdw');
const signUpSchema = require('../../schema/signUp.json');
const signInSchema = require('../../schema/signIn.json');
const refreshTokenSchema = require('../../schema/refreshToken.json');

const accessTokenExpireSeconds = 600;
const authSecret = process.env.AUTH_SECRET;

router.post('/sign-up', validateMdw(signUpSchema), async function (req, res) {
  try {
    const { email } = req.body;
    const isExist = await userModel.isEmailExist(email)
    if (isExist) {
      // conflict
      return res.status(409).send();
    }
    const user = await userModel.add(req.body);
    res.status(200).json({ email: user.email });
  } catch (error) {
    res.status(400).json(error);
  }
})

router.post('/sign-in', validateMdw(signInSchema), async function (req, res) {
  const user = await userModel.singleByEmail(req.body.email);
  
  if (user === null) {
    return res.status(401).json({
      authenticated: false
    });
  }
  
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({
      authenticated: false
    });
  }

  const payload = {
    userId: user.id,
    role: user.role,
    fullname: user.fullname
  }
  const opts = {
    expiresIn: accessTokenExpireSeconds // seconds
  }

  const accessToken = jwt.sign(payload, authSecret, opts);
  const refreshToken = randomstring.generate(100);
  await userModel.patchRFToken(user.id, refreshToken);

  return res.status(200).json({
    authenticated: true,
    accessToken,
    refreshToken
  })
})

router.post('/refresh', validateMdw(refreshTokenSchema), async function (req, res) {
  const { accessToken, refreshToken } = req.body;
  const { userId } = jwt.verify(accessToken, authSecret, {
    ignoreExpiration: true
  });

  const ret = await userModel.isValidRFToken(userId, refreshToken);
  if (ret === true) {
    const newAccessToken = jwt.sign({ userId }, authSecret, { expiresIn: accessTokenExpireSeconds });
    return res.status(200).json({
      accessToken: newAccessToken
    });
  }

  return res.status(400).json({
    message: 'Refresh token is revoked!'
  });
})
module.exports = router;
