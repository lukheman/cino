const sequelize = require('./connect.js')
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const fs = require('fs').promises;

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // disarankan agar tidak ada email duplikat
    validate: {
      isEmail: true
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Note = sequelize.define('Note', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

User.hasMany(Note, { foreignKey: 'authorId'});
Note.belongsTo(User, { foreignKey: 'authorId'});

module.exports = {
  Note,
  User
};
