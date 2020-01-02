const {
  get,
  getById,
  insert,
  update,
  remove,
} = require('./postDb');

const getAllPosts = async (req, res) => {
  try {
    const posts = await get();
    return res.status(200).json(posts);
  } catch(error) {
    next("internal server error");
  }
};

module.exports = {
  getAllPosts,
};