import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import NewCall from "./newcall";
import Log from "./log";
import "../node_modules/reset-css/reset.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GDN Call Log</h1>
        </header>
        <nav>
          <Link to="/signin">Sign In</Link>
          <Link to="/newcall">New Call</Link>
          <Link to="/log">Call Log</Link>
          <Link to="/signout">Sign Out</Link>
        </nav>
        <div>
          <Route path="/newcall" component={NewCall} />
          <Route path="/log" component={Log} />
        </div>
      </div>
    );
  }
}

export default App;
