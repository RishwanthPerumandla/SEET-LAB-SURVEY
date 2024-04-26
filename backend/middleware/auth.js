const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        // The token is typically sent as a Bearer token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_key);
        req.user = decoded;
        // console.log(req.user)
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}


function checkRole(role) {
    return function(req, res, next) {
        auth(req, res, () => {
            if (req.user.role === role) {
                next();
            } else {
                res.status(403).send('Access denied. You do not have the right role.');
            }
        });
    };
}

module.exports = {auth, checkRole};
