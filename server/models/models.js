const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true,  allowNull: false},
    userName: {type: DataTypes.STRING, unique: true, allowNull: false,},
    email: {type: DataTypes.STRING, unique: true,  allowNull: false},
    password: {type: DataTypes.STRING,  allowNull: false},
});

const Event = sequelize.define('event', {
    title: {type: DataTypes.STRING, allowNull: false},
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
    
});

const Invitations = sequelize.define('invitations', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true,  allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    eventId: {type: DataTypes.INTEGER, allowNull: false},
    isAccepted: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: null},
});

User.belongsToMany(Event, {through: Invitations, foreignKey: "userId"});
Event.belongsToMany(User, {through: Invitations, foreignKey: "eventId"});

module.exports = {
    User, Event, Invitations
};

