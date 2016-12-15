'use strict'
const Sequelize = require('sequelize');

const { POSTGRES_USERNAME, POSTGRES_PASSWORD } = require('../config.secret');

const sequelize = new Sequelize('taskmanager', POSTGRES_USERNAME, POSTGRES_PASSWORD, {
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

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Tasklist = sequelize.define('tasklist', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const Task = sequelize.define('task', {
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  label: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Activity = sequelize.define('activity', {
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

const Board = sequelize.define('board', {
  title: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Comment = sequelize.define('comment', {
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  }
});

//Associations between Tables
Board.hasMany(User, { as: 'user', foreignKey: 'boardID' });
Board.hasMany(Activity, { as: 'activity', foreignKey: 'boardID' });
Board.hasMany(Tasklist, { as: 'tasklist', foreignKey: 'boardID' });

Tasklist.hasMany(Task, { as: 'task', foreignKey: 'tasklistID' });

Task.hasMany(Comment, { foreignKey: 'taskID' });

//force tables to drop each time file is run,.
sequelize.sync({ logging: console.log, force: true }).then(() => {  
  Board.create({
    title: 'New Board'
  }).then((result) => {
    Tasklist.create({
      title: 'What needs to be done',
      position: 0,
      boardID: result.dataValues.id
    }).then((result) => {
      Task.create({
        author: 'rasec',
        content: 'Demo-app to test SubQL',
        tasklistID: result.dataValues.id
      }).then((result) => {
        Comment.create({
          author: 'rasec',
          content: 'The demo-app should be a task manager',
          taskID: result.dataValues.id
        });
      });
      Task.create({
        author: 'rasec',
        content: 'Website for SubQL',
        tasklistID: result.dataValues.id
      }).then((result) => {
        Comment.create({
          author: 'rasec',
          content: 'The website should use flexbox',
          taskID: result.dataValues.id
        });
        Comment.create({
          author: 'rasec',
          content: 'The website should have a minimalist style',
          taskID: result.dataValues.id
        });
      }); 
    });
    
    Tasklist.create({
      title: 'What we have completed',
      position: 1,
      boardID: result.dataValues.id
    }).then((result) => {
      Task.create({
        author: 'rasec',
        content: 'Basic functionality of SubQL',
        tasklistID: result.dataValues.id
      }).then((result) => {
        Comment.create({
          author: 'rasec',
          content: 'Good Job guys!',
          taskID: result.dataValues.id
        });
      });
      Task.create({
        author: 'rasec',
        content: 'Publish on NPM',
        tasklistID: result.dataValues.id
      }).then((result) => {
        Comment.create({
          author: 'rasec',
          content: 'We need to bolster our docs',
          taskID: result.dataValues.id
        });
        Comment.create({
          author: 'rasec',
          content: 'We need to also get ready for launch',
          taskID: result.dataValues.id
        });
      });
    });
  });

  return;
});

//export tables to be used in get request files.
module.exports =  { User, Tasklist, Task, Activity, Board, Comment };