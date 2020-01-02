
const validatePost = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "missing post data."
    });
  }
  const { text } = req.body;
  if (text) {
    const { id } = req.params;
    req.body.user_id = id;     // the database method 'insert' for creating new post expects a user_id property, so we fetch it from the req.params. But note, in the userRouter, the validateUserId middlewar must come before this 'validatePost' middleware, to ensure that the req.params contains a valid user id
    next();
  } else {
    return res.status(400).json({
      error: "missing required text field",
    });
  }
};

const postMiddleware = {
  validatePost,
};

module.exports = postMiddleware;
