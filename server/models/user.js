'use strict';
const { hashPassword, hashNumberSecret } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill name"
        },
        notNull: {
          msg: "please enter your name"
        },
        isUnique(value) {
          return User.findOne({
            where: {
              name: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("name already exist")
              }
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill email"
        },
        notNull: {
          msg: "please enter your email"
        },
        isEmail: {
          args: true,
          msg: "format email wrong"
        },
        isUnique(value) {
          return User.findOne({
            where: {
              email: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("Email address already exist")
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "please fill password"
        },
        len: {
          args: [6, 999999],
          msg: "minimal password 6 character"
        },
        notNull: {
          msg: "please enter your password"
        }
      }
    },
    numberSecret: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
        user.numberSecret = hashNumberSecret(String(Math.floor(100000 + Math.random() * 900000)))
      }
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};