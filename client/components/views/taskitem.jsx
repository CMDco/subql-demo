import React, { Component } from 'react';
class TaskItem extends Component {
  constructor(props) {
    super(props);
    console.log(`taskitem props`);
    console.log(this.props);
    this.getRemoveTask = this.getRemoveTask.bind(this);
  }
  getRemoveTask(index) {
    const makeMutation = this.props.makeMutation;
    const taskListID = this.props.taskListID;
    const taskItemID = this.props.taskItemID;
    return (event) => {
      console.log(`clicked`);
      makeMutation(`mutation {
        removeTask(userid: 0, tasklistid:${taskListID}, taskid:${taskItemID}){
          id
        }
      }`)
      return;
    }
  }
  render() {
    return (
      <div className='taskitem'>
      <article className='card-depth'>
        <h2><span className='taskitemtitle'>{this.props.taskItem.title}</span></h2><span className='removeTaskButton' onClick={this.getRemoveTask(this.props.taskListID)}>X</span>
        <p>{this.props.taskItem.content}</p>

      </article>
      </div>
    )
  }
}

export default TaskItem;