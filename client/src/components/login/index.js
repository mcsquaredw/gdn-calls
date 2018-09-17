import React, { Component } from "react";

export default class Login extends Component {
  render() {
    const { requestToken, changeUsername, username } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <label htmlFor="username">Email Address: </label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={changeUsername}
        />
        <br />
        <button onClick={requestToken}>Request Login Token</button>
      </div>
    );
  }
}
