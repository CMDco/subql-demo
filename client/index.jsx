import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Header from './components/header.jsx';
import TaskBoard from './components/taskboard.jsx';

class App extends Component {
  constructor() {
    
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