import React, { Component } from 'react';
import TaskList from './tasklist.jsx';

class TaskBoard extends Component {
  constructor(props) {
    super(props);
  }

  getMoveList(){
    // this function handles the moving of the lists
    return function(listIndex, newIndex){
      return;
    }
  }

  render() {
    return (
      <div><TaskList /></div>
    );
  }
}

export default TaskBoard;