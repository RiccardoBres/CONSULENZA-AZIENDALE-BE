// verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            errorType: "Token not found",
            statusCode: 401,
            message: "Authentication needed"
        });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({
            errorType: "Authorization failed",
            statusCode: 403,
            message: "Authorization error",
            error: error.message
        });
    }
};
