const jwt = require('jsonwebtoken')

function createToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET)
}

function verifyToken(token) {
    console.log(jwt.verify(token, process.env.JWT_SECRET));
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    createToken,
    verifyToken
}