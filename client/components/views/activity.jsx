import React, { Component } from 'react';

class Activity extends Component { 
  constructor(props) { 
    super(props);
  }
  render() { 
    return (
        <div>
            <span>{this.props.time} </span>
            <span>{this.props.content} </span>      
            <span>{this.props.author}</span>
      </div>
    )
  }
};

export default Activity;