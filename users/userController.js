const {
  get,
  getUserPosts,
  insert,
  update,
  remove,
} = require('./userDb');

const {
  insert: insertPost,
} = require('../posts/postDb');


const getAllUsers = async (req, res) => {
  try {
    const users = await get()
    return res.status(200).json(users);
  } catch(error) {
    return res.status(500).json({
      error: "internal server error"
    });
  }
};

const getUserById = (req, res) => {
  return res.status(200).json(req.user);
};

const createNewUser = async (req, res) => {
  try {
    const newUser = await insert(req.body);
    res.status(200).json({
      message: 'new user successfully created.',
      user: newUser,
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      return res.status(409).json({
        error: "A user with that name already exists."
      });
    } else {
      return res.status(500).json({
        error: "Internal server error."
      });
    }
  }
}

const createNewPostForUser = async (req, res) => {
  try {
    const newPost = await insertPost(req.body);
    return res.status(200).json({
      message: 'post successfully created',
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error."
    });
  }
};

const  getPostsByUserId = async (req, res) => {
  try {
    const posts = await getUserPosts(req.params.id);
    return res.status(200).json(posts);
  } catch(error) {
    return res.status(500).json({
      error: "internal server error"
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const result = await update(req.params.id, req.body);
    if (result === 1) {
      res.status(200).json({ message: "Updated user successfully." });
    } else {
      next("Internal server error. Could not update");
    }
  } catch(error) {
    next("Internal server error. Could not update");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await remove(req.params.id);
    if (result === 1) {
      return res.status(200).json({
        message: "User successfully deleted.",
      });
    }
  } catch(error) {
    next("internal server error")
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  createNewPostForUser,
  getPostsByUserId,
  updateUser,
  deleteUser,
};