const path = require('path');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const server = require('http').Server(app);

const subql = require('./../lib/subql/src/subql.js');
const { buildSchema } = require('graphql');

const {db, db_getUser, db_addTask, db_removeTask, db_printDB} = require('./db/db');

const schema = `
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
  time: Date
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
  date: Date
}

type Query {
  tasklist( userid : Int ): [TaskList]
}
type Mutation {
  addTask( userid : Int, tasklistid : Int, title : String, content : String ): [TaskList]
  removeTask( userid : Int, tasklistid: Int, taskid : Int ): [TaskList]
}
`;
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
    this.comments = comment;
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

function removeTask({userid, tasklistid, taskid}){
  console.log(`removeTask :: userid ${userid} tasklistid ${tasklistid} taskid ${taskid}`);
  let result = removeTask(userid, tasklistid, taskid);
  let tasklists = [];
  result[userid].tasklists.forEach(elem => {
    let currlist = new TaskList(tasklistid, elem.tasks, elem.title);
    console.log(`removeTask :: constructed taskList`);
    console.log(JSON.stringify(currlist, null, 2));
    tasklists.push(currlist);
  });
  return tasklists;
}
function addTask({}){
  return;
}
function tasklist(){
  return;
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