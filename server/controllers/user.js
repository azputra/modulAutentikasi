const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { hashPassword, checkPassword, hashNumberSecret, checkNumberSecret } = require('../helpers/bcrypt')
const sendEmail = require('../helpers/sendMail')
const cron = require('node-cron');
let numbSecret;

cron.schedule('* * * * *', () => {
    numbSecret = String(Math.floor(100000 + Math.random() * 900000))
});


class UserController {
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({
            name,
            email,
            password
        })
            .then((user) => {
                const token = createToken(user.id)
                res.status(201).json({ user, token })
            }).catch(next);
    }

    static login(req, res, next) {
        const { email, password } = req.body
        let user;
        User.findOne({
            where: {
                email
            }
        })
            .then((dataUser) => {
                user = dataUser
                if (user) {
                    const pwd = checkPassword(password, user.password)
                    if (pwd) {
                        res.status(200).json(user)
                    } else {
                        throw { status: 400, message: 'email or password wrong' }
                    }
                } else {
                    throw { status: 400, message: 'email or password wrong' }
                }
            })
            .catch(next);
    }

    static send2FA(req, res, next) {
        let user;
        User.findOne({
            where: {
                id: req.params.userId
            }
        })
            .then((dataUser) => {
                user = dataUser
                if (user) {
                    sendEmail(user.name, user.email, numbSecret)
                    return User.update({
                        numberSecret: hashNumberSecret(numbSecret)
                    }, {
                        where: {
                            id: user.id
                        }
                    })
                } else {
                    throw { status: 404, message: 'Not Found User Account' }
                }
            })
            .then(() => {
                res.status(200).json("Success Send 6 Digit Number")
            })
            .catch(next);
    }

    static check2FA(req, res, next) {
        const { numberSecret } = req.body
        let token;
        let user;
        User.findOne({
            where: {
                id: req.params.userId
            }
        })
            .then((dataUser) => {
                user = dataUser
                if (user) {
                    if (checkNumberSecret(numberSecret, user.numberSecret)) {
                        token = createToken(user.id)
                        return User.update({ numberSecret: hashNumberSecret(numbSecret) }, { where: { id: req.params.userId } })
                    } else {
                        throw { status: 400, message: 'Please Fill Correct 6 Digit Number' }
                    }
                } else {
                    throw { status: 404, message: 'Not Found User Account' }
                }
            })
            .then(() => {
                res.status(201).json({ user, token })
            })
            .catch(next);
    }

    static resetPassword(req, res, next) {
        const { oldPassword, newPassword, checkNewPassword } = req.body
        User.findOne({
            where: {
                id: req.user.id
            }
        })
            .then((dataUser) => {
                if (newPassword !== checkNewPassword) {
                    throw { status: 400, message: "Please Fill Same Password" }
                } else {
                    if (dataUser) {
                        const pwd = checkPassword(oldPassword, dataUser.password)
                        if (pwd) {
                            return User.update({
                                password: hashPassword(newPassword)
                            }, {
                                where: {
                                    id: dataUser.id
                                }
                            })
                        } else {
                            throw { status: 400, message: 'Old Password Wrong' }
                        }
                    } else {
                        throw { status: 404, message: 'Not Found User Account' }
                    }
                }
            })
            .then(() => {
                res.status(200).json("Success Reset Password")
            })
            .catch(next);
    }
}

module.exports = UserController