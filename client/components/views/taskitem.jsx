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
      <article>
        <h2>{this.props.taskItem.title}</h2>
        <p>{this.props.taskItem.content}</p>
      </article>
      </div>
    )
  }
}

export default TaskItem;