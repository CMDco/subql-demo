const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const server = require('http').Server(app);
const { buildSchema } = require('graphql');
// const { parseSchema, registerResolver, registerType, getRoot } = require('../src/subql.js');

app.get('/', function (req, res) {
  res.send("Hello, World");
});

server.listen(8080);