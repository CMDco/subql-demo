const path = require('path');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const server = require('http').Server(app);

const { registerResolver, getRoot, registerType, parseSchema } = require('./../lib/subql/src/subql.js');
const { buildSchema } = require('graphql');
const {setup} = require('./../lib/subql/src/sockets.js');
const {db, db_getUser, db_addTask, db_removeTask, db_printDB} = require('./db/db');

let schema = `
type User {
  id: ID!
  taskList: [TaskList]
  activityFeed: [Activity]
}

type TaskList{
  id: ID!
  tasks: [Task]
  position: Int
  title: String 
}

type Task{
  id: ID!
  content: String
  comments: [Comment]
  assigned: Int
  label: String
  author: String
}

type Activity{
  time: Int
  content: String 
  author: String
}
type ActivityInput{
  content: String
  author: String
}
type TaskInput{
  content: String
  assigned: Int
  label: String
  author: String
}

type Comment{
  id: ID!
  author: String
  content: String
}

type Query {
  gtasklist( userid : Int ): [TaskList]
}
type Mutation {
  addTask( userid : Int, tasklistid : Int, title : String, content : String ): [TaskList]
  removeTask( userid : Int, tasklistid: Int, taskid : Int ): [TaskList]
}
`;


class User { 
  constructor(id, taskList) {
    this.id = id;
    this.taskList = taskList;
  }
}

class TaskList { 
  constructor(id, tasks, title) {
    this.id = id;
    this.tasks = tasks;
    this.title = title; 
  }
}
class Task { 
  constructor(id, title, content, comments) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = comments;
  }
}

class Activity { 
  constructor(time, content, author) { 
    this.content = content;
    this.author = author; 
  }
}

class Comment { 
  constructor(id, content, author) { 
    this.id = id;
    this.content = content;
    this.author = author;
  }
}




function tasklistReturn(taskLists) {
  let tasklistreturn = [];
  taskLists.forEach((tasklist, i) => {
    let id = i;
    let title = tasklist.title;
    let tasks = [];
    tasklist.tasks.forEach((task, j) => {
      let taskid = j;
      let tasktitle = task.title;
      let taskcontent = task.content;
      let taskcomments = [];
      task.comments.forEach((comment, k) => {
        let commentid = k;
        let commentcontent = comment.content;
        let commentauthor = comment.author;
        let newComment = new Comment(commentid, commentcontent, commentauthor)
        taskcomments.push(newComment);
      });
      tasks.push(new Task(taskid, tasktitle, taskcontent, taskcomments));
    });
    tasklistreturn.push(new TaskList(id, tasks, title));
  });
  return tasklistreturn;
}



function removeTask ({userid, tasklistid, taskid}) {
  let result = db_removeTask(userid, tasklistid, taskid);
  let returnTasklist = tasklistReturn(result[0].tasklists);
  return returnTasklist;
}

function addTask ({userid, tasklistid, title, content}) {
  let user = db_addTask(userid, tasklistid, title, content);
  let tasklists = user[0].tasklists;
  let returnArray = tasklistReturn(tasklists);
  return returnArray;
}

function gtasklist({userid}) {
  return tasklistReturn(db.user[0].tasklists);
}


parseSchema(schema);
schema = buildSchema(schema);
registerType(User, 'id');
registerType(TaskList, 'id');
registerType(Task, 'id');
registerType(Activity, 'author');
registerType(Comment, 'id', 'author');
registerResolver(removeTask, addTask, gtasklist);
let root = getRoot();

app.use(express.static(path.join(__dirname + '/../dist/')));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
setup(server);
server.listen(8080, () => {
  console.log('Server started on port 8080');
});