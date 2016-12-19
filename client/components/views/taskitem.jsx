import React, { Component } from 'react';
class TaskItem extends Component {
  constructor(props) {
    super(props);
    console.log(`taskitem props`);
    console.log(this.props);
  }

  render() {
    return (
      <div className='taskitem'>
      <article className='card-depth'>
        <h2><span className='taskitemtitle'>{this.props.taskItem.title}</span></h2><span className='removeTaskButton'>X</span>
        <p>{this.props.taskItem.content}</p>

      </article>
      </div>
    )
  }
}

export default TaskItem;