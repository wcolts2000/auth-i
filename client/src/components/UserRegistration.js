import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 50px 20px 20px;
  margin: 0 auto;

  & > input {
    margin-bottom: 20px;
    padding: 15px;
    font-size: 18px;
    border: none;
    background: tan;
    border-bottom: 2px dashed #0f0f0f;
  }
`;

class UserRegistration extends Component {
  state={
      username: "",
      password: ""
    }


  handleSubmit = (e) => {
    e.preventDefault();
    const user = this.state;
    if (user.username && user.password) {
      axios.post("http://localhost:5000/api/register", user)
        .then(this.props.history.push('/users'))
        .catch(err => console.log(err))
    } else {
      return null
    }

    
  }

  handleChange = ({ target: {value, name}}) => {
    this.setState({ [name]: value})
  }
  render() {
    return (
      <>
      <h1> __Register Now__</h1>
      <Form onSubmit={this.handleSubmit}>
        <input name="username" placeholder="username..." type="text" onChange={this.handleChange} value={this.state.username} />
        <input name="password" placeholder="password..." type="password" onChange={this.handleChange} value={this.state.password} />
        <button>SUBMIT</button>
      </Form>
      </>
    )
  }
}

export default withRouter(UserRegistration);