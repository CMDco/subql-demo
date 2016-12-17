import React, { Component } from 'react';
import Activity from './../views/Activity.jsx';

class ActivityFeed extends Component{ 
  constructor(props) { 
    super(props);
  }
  render() {
      let activities = [];
      this.props.activFeed.forEach((activity, idx) => {
          activities.push(<Activity key={'activity'+idx} time={activity.time} content={activity.content} author={activity.author}/>)
      })
    return (
      <div>
            {activities}
      </div>
    )
  }
};


export default ActivityFeed;