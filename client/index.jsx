import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Header from './components/containers/header.jsx';
import TaskBoard from './components/containers/taskboard.jsx';

import subql from '../lib/subql/src/client-sockets.js';
// import styles from './scss/application.scss';

class App extends Component {
  constructor(props) {
    super(props);

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
    return (
      <div>
        <Header />
        <TaskBoard />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));

export default App;