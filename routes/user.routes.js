const { Router } = require('express');
const {
  createUser,
  loginUser,
  historyUser,
} = require('../controllers/user.controller');

const router = Router();

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/:id/history', historyUser);

module.exports = {
  userRouter: router,
};
