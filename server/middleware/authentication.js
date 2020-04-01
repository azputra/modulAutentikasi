const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")

function authentication(req, res, next) {
    try {
        const decoded = verifyToken(req.headers.token)
        User.findOne({
            where: {
                id: decoded.id
            }
        })
            .then((user) => {
                if (user) {
                    req.user = {
                        id: user.id
                    }
                    next()
                } else {
                    throw { status: 404, message: 'Not Found User Account' }
                }
            })
    } catch (err) {
        next(err)
    }
}

module.exports = authentication