import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import HomePage from './components/HomePage';
import UserList from './components/UserList';
import Login from './components/Login';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    box-sizing: border-box;
  }

 button {
    padding: 15px 25px;
    border: 3px solid tan;
    box-shadow: 0 6px tan;
    background: none;
    position: relative;
    cursor: pointer;

    &:hover {
      top: 2px;
      box-shadow: 0 4px tan;
    }

    &:active {
      top: 4px;
      box-shadow: 0 2px tan;
    }
  }
`

class App extends Component {
  render() {
    return (
      <>
      <GlobalStyles />
      <div>
        <Route exact path='/' component={HomePage} />
        <Route path='/register' component={UserRegistration} />
        <Route path='/login' component={Login} />
        <Route path='/users' component={UserList} />
      </div>
      </>
    );
  }
}

export default App;
