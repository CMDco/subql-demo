import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Header from './components/header.jsx';
import TaskBoard from './components/taskboard.jsx';
import styles from './scss/application.scss';

class App extends Component {
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