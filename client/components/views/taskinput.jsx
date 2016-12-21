import React, { Component } from 'react';

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.addTask = this.addTask.bind(this);
  }
  addTask(event) { 
    let content = event.target.value;
    let title = event.target.previousSibling.value;
    let makeMutation = this.props.makeMutation;
    let tasklistID = this.props.taskListID;
    if (content.length > 0 && title.length > 0 && event.keyCode === 13) {
    
      makeMutation(`mutation {
        addTask(userid: 0, tasklistid: ${tasklistID}, title: "${title}", content: "${content.replace('\n', ' ')}"){
          id
        }
      }`);
      event.target.value = '';
      event.target.previousSibling.value = '';
    }
    
  }
  render() {
    return (
      <div className='taskinput card-depth'>
        <input className='tasktitleinput' type={'text'} placeholder={'Enter a task.'} />
        <textarea className='taskbodyinput' type={'text'} placeholder={'Enter a description'} onKeyUp={this.addTask}/>
      </div>
    )
  }
}

export default TaskInput;