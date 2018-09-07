import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";

import NewCall from "./newcall";
import Log from "./log";
import "../node_modules/reset-css/reset.css";
import "./App.css";
import { getLookups } from "./api/calls";
import { isAuthenticated } from "./api/auth";

class App extends Component {
  state = {
    areas: [],
    contractors: [],
    contactTypes: [],
    callTypes: []
  };

  componentDidMount() {
    getLookups()
      .then(lookups => {
        const { contactTypes, areas, contractors, callTypes } = lookups;
        this.setState({
          contactTypes,
          areas,
          contractors,
          callTypes
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderAuthorised = () => {
    return (
      <nav>
        <Link
          style={{ textDecoration: "none" }}
          to="/newcall"
          activeClassName="active"
        >
          <span className="menu">
            <i className="fa fa-phone-square" />
            New Call
          </span>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/log"
          activeClassName="active"
        >
          <span className="menu">
            <i className="fa fa-list-alt" />
            Call Log
          </span>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/signout"
          activeClassName="active"
        >
          <span className="menu">
            <i className="fa fa-lock" />
            Sign Out
          </span>
        </Link>
      </nav>
    );
  };

  renderUnauthorised = () => {
    return (
      <nav>
        <Link
          style={{ textDecoration: "none" }}
          to="/signin"
          activeClassName="active"
        >
          <span className="menu">
            <i className="fa fa-lock-open" />
            Sign In
          </span>
        </Link>
      </nav>
    );
  };

  renderMenu = () => {
    isAuthenticated()
      .then(auth => {
        return auth ? this.renderAuthorised() : this.renderUnauthorised();
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { contactTypes, areas, contractors, callTypes } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <span className="title">GDN Call Log</span>
          {this.renderMenu()}
        </header>
        <div>
          <Switch>
            <Route
              path="/newcall"
              render={() => {
                return (
                  <NewCall
                    contactTypes={contactTypes}
                    areas={areas}
                    contractors={contractors}
                    callTypes={callTypes}
                  />
                );
              }}
            />
            <Route
              path="/log"
              render={() => {
                return (
                  <Log
                    contactTypes={contactTypes}
                    areas={areas}
                    contractors={contractors}
                    callTypes={callTypes}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
