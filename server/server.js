const path = require('path');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const server = require('http').Server(app);

const { buildSchema } = require('graphql');
// const { parseSchema, registerResolver, registerType, getRoot } = require('../src/subql.js');

app.use(express.static(path.join(__dirname + '/../dist/')));

app.get('/', function (req, res) {
  res.redirect('/index.html');
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});