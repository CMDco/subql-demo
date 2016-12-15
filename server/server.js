const path = require('path');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const server = require('http').Server(app);

const subql = require('./../lib/subql/src/subql.js');
const { buildSchema } = require('graphql');


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
  user(id: ID!): User
  getTask(id: ID!): Task
}
type Mutation{
  addTask(position: Int!, task: TaskInput): Task
  addComment(taskId: ID!, comment: String): Task
  updateTaskListTitle(position: Int!, title: String): TaskList
  assignTask(taskID: ID!, assignment: Int): Task
  removeTask(taskID: ID!): TaskList
  moveTask(id:ID!, position: Int):TaskList
  addActivity(input: ActivityInput): Activity
  updateComment(id: ID!, comment: String): Comment
}
`;
// paramaters may need to be edited into object destructoring
class User { 
  constructor(id, taskList, activityFeed) { 
    this.id = id;
    this.taskList = taskList;
    this.activityFeed = activityFeed;
  }
}

class TaskList { 
  constructor(id, tasks, position, title) {
    this.id = id;
    this.tasks = tasks;
    this.position = position;
    this.title = title; 
  }
}
class Task { 
  constructor(id, content, comments, label, author, assigned = null) { 
    this.id = id;
    this.content = content;
    this.comments = comment;
    this.label = label; 
    this.author = author; 
    this.assigned = assigned;
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
  constructor(id, content, author, date) { 
    this.id = id;
    this.content = content;
    this.author = author;
    this.date = date;
  }
}

// function user({id}) {
//   //get user froom db 
//   //get tasklist from db
//   // get activityFeed from db
//   return new User(id, tasklist, activityfeed);
  
//  }

app.use(express.static(path.join(__dirname + '/../dist/')));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});