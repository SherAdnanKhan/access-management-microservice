'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
const ActionLog = require('../models').ActionLog;

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    remember_token: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeUpdate: async function (user) {;
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
        // do your hashing here to user.password
      }
    }
  });

  User.prototype.getSignedJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  };

  User.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  User.prototype.toJSON = function () {

    const userObj = Object.assign({}, this.dataValues);
    delete userObj.password;
    return userObj
  }
  return User;
};










