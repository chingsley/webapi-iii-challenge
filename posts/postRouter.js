const express = require('express');

const {
  get,
  getById,
  insert,
  update,
  remove,
} = require('./postDb');

const {
  getAllPosts,
} = require('./postController');

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = getById(id);
    // console.log('\n\n>>>>>>>>>>>>>>>>>>>\npost = ', post)
    return res.send('working on it...');
  } catch(error) {
    // console.log('\n\n>>>>>>>>>>>>>>>>>>>\nerror = ', error)
    next("working on it")
  }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;