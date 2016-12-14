import React, { Component } from 'react';
import TaskItem from '../views/taskitem.jsx';
import TaskInput from '../views/taskinput.jsx';

class TaskList extends Component {
  constructor(props) {
    super(props);
  }
  getHandleAddTask(){
    // this function makes a mutation to add a taskboard
    return function(event){
      return;
    }
  }

  getMoveTask(){
    return function(listIndex, taskIndex, newIndex){
      return;
    }
  }

  getRemoveTask(){
    // this function makes a mutation to remove the task from the taskboard
    return function(index){
      return;
    }
  }

  render() {
    return (
      <div><TaskItem /><TaskItem /><TaskInput /></div>
    );
  }
}

export default TaskList;