import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Header from './components/containers/header.jsx';
import TaskBoard from './components/containers/taskboard.jsx';
// import styles from './scss/application.scss';

class App extends Component {
  constructor() {
    super(props);
    this.update = this.update.bind(this);
    //subscribe here
    // use this.update as the callback
  }
  update(data) {
    // implement subql data stuff here and
    let newState = {};
    this.setState(newState);
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