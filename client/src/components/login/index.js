import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  changeUsername = ev => {
    const { username } = ev.target.value;

    this.setState({
      username
    });
  };

  changePassword = ev => {
    const { password } = ev.target.value;

    this.setState({
      password
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" value={username} />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" value={password} />
        <br />
        <button onClick={this.props.login}>Log In</button>
      </div>
    );
  }
}
