const { User } = require("../models")

function authorized(req, res, next) {
    User.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(user => {
            if (!user) {
                throw {
                    status: 404, message: "You do not have access to this user"
                }
            } else if (user.id === req.user.id) {
                next()
            } else {
                throw { status: 401, message: "Unauthorized" }
            }
        })
        .catch(next)
}

module.exports = authorized