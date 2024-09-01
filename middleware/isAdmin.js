const User = require('../model/User');
const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
};

module.exports = isAdmin;