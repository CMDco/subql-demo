import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Header from './components/containers/header.jsx';
import TaskBoard from './components/containers/taskboard.jsx';
import ActivityFeed from './components/containers/activityFeed.jsx';
import subql from './../lib/subql/src/client-sockets.js';
import styles from './scss/application.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {gtasklist: []};
    // bind funtions
    this.update = this.update.bind(this);
  }
  /** Methods **/
  update(data) {
    // implement subql data stuff here and
    let newState = {};
    this.setState(newState);
  }

  /** Lifecycle Methods **/
  componentDidMount() {
    // subql.subscribe('http://localhost:8080', `query {gtasklist{id position title tasks{ id content comments{ author idcontent}}}}`, null, this.update);
    // subscribe and this.update here
    // use this.update as the callback
    // subscribe http://localhost:4000/data
    subql.subscribe('http://localhost:8080/',
    `{
      gtasklist(userid: 0){
        id,
        tasks{
          id,
          title,
          content
        },
        title
      }
    }`,
    null,
    (data) => {
      // console.log(`!!!!!!!!!!!!!!!!!!!!! DATA RECIEVED !!!!!!!!!!!!!!!!!!!!!!!!!`);
      // console.log(data);
      if(data.data){
        // console.log(JSON.stringify(data.data, null, 2));
        this.setState(data.data);
      }else{
        this.setState({gtasklist:data});
      }
    });
  }

  render() {
    console.log(this.state.gtasklists);
    return (
      <div>
        <Header />
        <TaskBoard taskLists={this.state.gtasklist} makeMutation={subql.graphql}/>
      </div>
    );
  }
}
//      <ActivityFeed activFeed={this.state.user.activityFeed}/>
render(<App />, document.getElementById('app'));

export default App;