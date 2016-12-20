import React, { Component } from 'react';
import TaskList from './tasklist.jsx';

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    console.log(`TaskBoard props`);
    console.log(this.props.taskLists);
  }

  getMoveList() {
    // this function handles the moving of the lists
    return function(listIndex, newIndex){
      return;
    }
  }

  render() {
    let lists = [];
    for(let i = 0; i < this.props.taskLists.length; ++i) {
      lists.push(<TaskList key={'tasklist' + i} taskListID={i} taskList={this.props.taskLists[i]} makeMutation={this.props.makeMutation}/>)
    }
    return (
      <div id='taskboard'>{lists}</div>
    );
  }
}

export default TaskBoard;