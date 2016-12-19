import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Header from './components/containers/header.jsx';
import TaskBoard from './components/containers/taskboard.jsx';
import ActivityFeed from './components/containers/activityFeed.jsx';
import subql from './../lib/subql/src/client-sockets.js';
import styles from './scss/application.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'user': {
        'tasklists': [
          {
            tasks: [
              {
                'id': 0,
                'title': 'task 0-0 &&&&&',
                'content': 'Demo fun!',
                'comments': [
                  {
                    author: 'Martin',
                    content: 'MT comments',
                  },
                  {
                    author: 'Dean',
                    content: 'Dean Code'
                  }
                ]
              },
              {
                'id': 0,
                'title': 'task 1-0 &&&&&',
                'content': 'Demo time!',
                'comments': [
                  {
                    author: 'Ping',
                    content: 'pong more',
                  },
                  {
                    author: 'Ling',
                    content: 'Don\'t even go there'
                  }
                ]
              }
            ],
            'position': 0,
            'title': 'In Progress'
          },
          {
            tasks: [
              {
                'id': 101,
                'title': 'task! 0-1',
                'content': 'we need to do 0-1',
                'comments': [
                  {
                    author: 'John',
                    content: 'John comments',
                  },
                  {
                    author: 'Boof',
                    content: 'Boof more'
                  }
                ]
              }
            ],
            'position': 1,
            'title': 'QA\'d'
          },
          ],
        activityFeed: [
            {
                time: Math.floor(Math.random() * 3000),
                content: "lsdkfjkslfjsdf",
                author: "deancode"
            },
            {
                time: Math.floor(Math.random() * 3000),
                content: "lsdkfjkslfjsdf",
                author: "deancode"
            },
            {
                time: Math.floor(Math.random() * 3000),
                content: "lsdkfjkslfjsdf",
                author: "deancode"
            },
            {
                time: Math.floor(Math.random() * 3000),
                content: "lsdkfjkslfjsdf",
                author: "deancode"
            }
        ]
      }
    }
    // bind funtions
    this.update = this.update.bind(this);
  }
  /** Methods **/
  update(data) {
    // implement subql data stuff here and
    let newState = {};
    this.setState(newState);
  }

  /** Lifecycle Methods **/
  componentDidMount(){
    // subscribe and this.update here
    // use this.update as the callback
    // subscribe http://localhost:4000/data
  }

  render() {
    console.log(this.state.user.tasklists);
    return (
      <div>
        <Header />
        <TaskBoard taskLists={this.state.user.tasklists} />
      </div>
    );
  }
}
//      <ActivityFeed activFeed={this.state.user.activityFeed}/>
render(<App />, document.getElementById('app'));

export default App;