import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class UserList extends Component {
state={
  users: []
}

componentDidMount = () => {
  axios.get('http://localhost:5000/api/users')
  .then(({data}) => this.setState({ users: data}))
  .catch(err => console.log(err))
}



  render() {
    if(this.state.users.length) {
      return (
        <div>
          {this.state.users.map((user, i) => <h2 key={i}>{user.username}</h2>)}
        </div>
      )
    } else {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }
  }
}
