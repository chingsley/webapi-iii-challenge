const express = require('express');
const userMiddleware = require('./userMiddleware');

const {
  getAllUsers,
  getUserById,
  createNewUser,
  createNewPostForUser,
  getPostsByUserId,
  updateUser,
  deleteUser
} = require('./userController');

const {
  validateUserId,
  validateUser,
} = userMiddleware;

const {
  validatePost,
} = require('../posts/postMiddleware');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', validateUser, createNewUser);
router.get('/:id', validateUserId, getUserById);
router.delete('/:id', validateUserId, deleteUser);
router.get('/:id/posts', validateUserId, getPostsByUserId);
router.put('/:id', validateUserId, validateUser, updateUser);
router.post('/:id/posts', validateUserId, validatePost, createNewPostForUser);
router.use('/*', (req, res, next) => next());


module.exports = router;
