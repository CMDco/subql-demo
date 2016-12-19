import React, { Component } from 'react';

class TaskInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='taskinput card-depth'>
        <input className='tasktitleinput' type={'text'} placeholder={'Enter a task.'} />
        <textarea className='taskbodyinput' type='text' placeholder='Enter a description' />
      </div>
    )
  }
}

export default TaskInput;