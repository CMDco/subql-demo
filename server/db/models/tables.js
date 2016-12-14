'use strict'
const Sequelize = require('sequelize');

const { POSTGRES_USERNAME, POSTGRES_PASSWORD } = require('../config.secret');

const sequelize = new Sequelize('', POSTGRES_USERNAME, POSTGRES_PASSWORD, {
  dialect: 'postgres',
  port: 5432,
});

sequelize.authenticate()
  .then( err => {
    console.log('Connection on database established');
  })
  .catch( err =>{
    console.log('Unable to connect to database',err);
  });

//models
const User = sequelize.define('user', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Tasklist = sequelize.define('tasklist', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

const Task = sequelize.define('task', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

const Activity = sequelize.define('activity', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

const Board = sequelize.define('board', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

const Comment = sequelize.define('comment', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

//Associations between Tables
Board.hasMany(User, {as: 'users'});

//force tables to drop each time file is run,.
sequelize.sync({ /*logging: console.log, force: true */}).then(() => {  });

//export tables to be used in get request files.
module.exports =  { User, Tasklist, Task, Activity, Board, Comment };