'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActionLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      ActionLog.hasOne(models.User, {
        foreignKey: 'id',
        sourceKey: 'user_id',
        as: 'user',
      });
    }
  }
  ActionLog.init({
    employee_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    employee_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    app_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    app_role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true
    },
    data_request: {
      type: DataTypes.STRING,
      allowNull: true
    },
    data_response: {
      type: DataTypes.STRING,
      allowNull: true
    },
    request_status: {
      type: DataTypes.STRING,
      defaultValue: false,
      allowNull: false
    },
    request_message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      get() {
        const date = new Date(`${this.dataValues.createdAt}`);
        return `${date.toISOString().split('T')[0]} ${date.toLocaleTimeString([], { month: '2-digit', hour12: false })}`;
      },
    }
  }, {
    sequelize,
    modelName: 'ActionLog',
  });
  return ActionLog;
};