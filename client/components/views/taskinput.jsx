import React, { Component } from 'react';

class TaskInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input className='classinput' type={'text'} placeholder={'Enter a task.'} />
      </div>
    )
  }
}

export default TaskInput;