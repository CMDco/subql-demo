const path = require('path');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const server = require('http').Server(app);

const subql = require('./../lib/subql/src/subql.js');
const { buildSchema } = require('graphql');

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
  date: Int
}

type Query {
  tasklist( userid : Int ): [TaskList]
}
type Mutation {
  addTask( userid : Int, tasklistid : Int, title : String, content : String ): [TaskList]
  removeTask( userid : Int, tasklistid: Int, taskid : Int ): [TaskList]
}
`;

schema = buildSchema(schema);
// type Query {
//   user(id: ID!): User
//   getTask(id: ID!): Task
// }
// type Mutation{
//   addTask(position: Int!, task: TaskInput): Task
//   addComment(taskId: ID!, comment: String): Task
//   updateTaskListTitle(position: Int!, title: String): TaskList
//   assignTask(taskID: ID!, assignment: Int): Task
//   removeTask(taskID: ID!): TaskList
//   moveTask(id:ID!, position: Int):TaskList
//   addActivity(input: ActivityInput): Activity
//   updateComment(id: ID!, comment: String): Comment
// }
// `;
// paramaters may need to be edited into object destructoring
class User { 
  constructor(id, taskList) {//, activityFeed) { 
    this.id = id;
    this.taskList = taskList;
    // this.activityFeed = activityFeed;
  }
}

class TaskList { 
  constructor(id, tasks, /*position,*/ title) {
    this.id = id;
    this.tasks = tasks;
    this.title = title; 
  }
}
class Task { 
  constructor(id, title, content, comments) {//, label, author, assigned = null) { 
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = comments;
    // this.label = label; 
    // this.author = author; 
    // this.assigned = assigned;
  }
}

class Activity { 
  constructor(time, content, author) { 
    this.time = time;
    this.content = content;
    this.author = author; 
  }
}

class Comment { 
  constructor(id, content, author/*, date*/) { 
    this.id = id;
    this.content = content;
    this.author = author;
    // this.date = date;
  }
}

// function removeTask({userid, tasklistid, taskid}){
//   console.log(`removeTask :: userid ${userid} tasklistid ${tasklistid} taskid ${taskid}`);
//   let result = db_removeTask(userid, tasklistid, taskid);
//   let returnTasklist = tasklistReturn(result.tasklists);
//   return returnTasklist;
// }
// function addTask({userid, tasklistid, title, content}){
//   let user = db_addTask(userid, tasklistid, title, content);
//   let tasklists = user.tasklists;
//   let returnArray = tasklistReturn(tasklists);
//   return returnArray;
// }
// function tasklist({userid}){
//   console.log('tasklist: db.user.tasklists::::::::', db.user.tasklists)
//   return tasklistReturn(db.user.tasklists);
// }


function tasklistReturn(taskLists) {
  let tasklistreturn = [];
  taskLists.forEach((tasklist, i) => {
    var id = i;
    var title = tasklist.title;
    var tasks = [];
    tasklist.tasks.forEach((task, j) => {
      var taskid = j;
      var tasktitle = task.title;
      var taskcontent = task.content;
      var taskcomments = [];
      task.comments.forEach((comment, k) => {
        var commentid = k;
        var commentcontent = comment.content;
        var commentauthor = comment.author;
        var nuComment = new Comment(commentid, commentcontent, commentauthor)
        taskcomments.push(nuComment);
      });
      tasks.push(new Task(taskid, tasktitle, taskcontent, taskcomments));
    });
    tasklistreturn.push(new TaskList(id, tasks, title));
  });
  return tasklistreturn;
}



const root ={
  removeTask: ({userid, tasklistid, taskid}) => {
  let result = db_removeTask(userid, tasklistid, taskid);
  let returnTasklist = tasklistReturn(result[0].tasklists);
  return returnTasklist;
  },
  addTask: ({userid, tasklistid, title, content}) => {
  let user = db_addTask(userid, tasklistid, title, content);
  let tasklists = user[0].tasklists;
  let returnArray = tasklistReturn(tasklists);
  return returnArray;
  }, 
  tasklist: ({userid}) => {
  return tasklistReturn(db.user[0].tasklists);
}
}
app.use(express.static(path.join(__dirname + '/../dist/')));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

server.listen(8080, () => {
  console.log('Server started on port 8080');
});