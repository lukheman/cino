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


module.exports = {
    sequelize,
    Note
};

// (async () => {
//     await sequelize.sync();
//
//     await Note.create({ content: 'ini adalah catatan pertama'});
//
//     const notes = await Note.findAll();
//     console.log(notes.map(note => note.toJSON()));
// })();
