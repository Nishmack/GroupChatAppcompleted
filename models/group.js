const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Group = sequelize.define('group',{
    groupname: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    owner: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            referencesKey: 'id'
        }    
    },
})


module.exports = Group;