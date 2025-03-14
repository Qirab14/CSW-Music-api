const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = 'your-secret-key';

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = { generateToken, verifyToken };