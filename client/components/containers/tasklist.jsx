import React, { Component } from 'react';
import TaskItem from '../views/taskitem.jsx';
import TaskInput from '../views/taskinput.jsx';

class TaskList extends Component {
  constructor(props) {
    super(props);
    console.log(`TaskList props`);
    console.log(this.props.taskList);
    console.log(this.props.taskList.tasks);
  }
  getHandleAddTask() {
    // this function makes a mutation to add a taskboard
    return function(event){
      return;
    }
  }

  getMoveTask(){
    return function(listIndex, taskIndex, newIndex) {
      return;
    }
  }

  getRemoveTask() {
    // this function makes a mutation to remove the task from the taskboard
    return function(index){
      return;
    }
  }

  render() {
    let taskitems = [];
    for(let i = 0; i < this.props.taskList.tasks.length; ++i) {
      taskitems.push(<TaskItem key={'taskitem'+i} taskItem={this.props.taskList.tasks[i]} />);
    }
    return (
      <div className="tasklist">
      <div className="tasklisttitlecontainer">
      <h2 className="tasklisttitle">{this.props.taskList.title}</h2>
      </div>
      <section>
      {taskitems}<TaskInput /></section>
      </div>
    );
  }
}

export default TaskList;