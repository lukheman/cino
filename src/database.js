const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
})

const Note = sequelize.define('Note', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

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

module.exports = {
    sequelize,
    Note,
    User
};

// (async () => {
//     await sequelize.sync();
//
//     await Note.create({ content: 'ini adalah catatan pertama'});
//
//     const notes = await Note.findAll();
//     console.log(notes.map(note => note.toJSON()));
// })();
