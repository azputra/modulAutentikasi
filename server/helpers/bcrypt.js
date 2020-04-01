const bcrypt = require("bcrypt")

function hashPassword(password) {
    let salt = 8
    return bcrypt.hashSync(password, salt)
}

function checkPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

function hashNumberSecret(numberSecret) {
    let salt = 8
    return bcrypt.hashSync(numberSecret, salt)
}

function checkNumberSecret(numberSecret, hashNumberSecret) {
    return bcrypt.compareSync(numberSecret, hashNumberSecret)
}

module.exports = {
    hashPassword,
    checkPassword,
    hashNumberSecret,
    checkNumberSecret
}