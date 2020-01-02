const  {
    getById,
  } = require('./userDb');

const validateUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(400).json({
                error: `${id} is not a valid user id`,
            });
        }
        const user = await getById(id);
        if (user) {
            req.user = user;
            next();
        } else {
            return res.status(404).json({ error: `Not found. No user matches the id of ${id}` });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error retrieving posts' });
    }
};


const validateUser = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            error: "missing user data"
        });
    }

    const { name } = req.body;
    if (name) {
        next();
    } else {
        return res.status(400).json({
            error: "missing required name field",
        });
    }
};


const userMiddleware = {
    validateUserId,
    validateUser,
};

module.exports = userMiddleware;
