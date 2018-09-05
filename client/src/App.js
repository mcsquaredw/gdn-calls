import React, { Component } from "react";
import axios from "axios";

import "../node_modules/reset-css/reset.css";
import "./App.css";

import Dropdown from "./dropdown";
import Area from "./area";
import Contractor from "./contractor";
import Log from "./log";

class App extends Component {
  state = {
    area: "",
    areas: [],
    contractor: "",
    contractors: [],
    contactType: "",
    contactTypes: [],
    callType: "",
    callTypes: [],
    calls: []
  };

  componentDidMount() {
    axios
      .all([
        axios.get("/api/contacttype"),
        axios.get("/api/area"),
        axios.get("/api/contractor"),
        axios.get("/api/calltype"),
        axios.get("/api/calls")
      ])
      .then(
        axios.spread((contactTypes, areas, contractors, callTypes, calls) => {
          this.setState({
            contactTypes: contactTypes.data,
            areas: areas.data,
            contractors: contractors.data,
            callTypes: callTypes.data,
            calls: calls.data
          });
        })
      );
  }

  update = ev => {
    const { name, value } = ev.target;

    this.setState({
      [name]: value
    });
  };

  submitCall = ev => {
    const { contactType, area, contractor, callType } = this.state;
    const newCall = {
      contactType,
      area,
      contractor,
      callType
    };

    this.newCallApi(newCall)
      .then(call => {
        this.setState({
          contactType: "",
          area: "",
          contractor: "",
          callType: ""
        });
      })
      .then(
        this.callsApi().then(calls => {
          this.setState({ calls });
        })
      )
      .catch(err => {
        console.error(err);
      });
  };

  newCallApi = async newCall => {
    try {
      const response = await axios.post("/api/newcall", newCall);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  callsApi = async () => {
    try {
      const response = await axios.get("/api/calls");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      contactType,
      contactTypes,
      callType,
      callTypes,
      area,
      areas,
      contractor,
      contractors,
      calls
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>GDN Call Log</h1>
        </header>
        <div className="container">
          <div className="call">
            <h2>New Call</h2>
            <Dropdown
              name="contactType"
              label="Contact Type"
              value={contactType}
              update={this.update}
              items={contactTypes}
            />
            <Dropdown
              name="area"
              label="Area"
              value={area}
              update={this.update}
              items={areas}
            />
            <Dropdown
              name="contractor"
              label="Contractor"
              value={contractor}
              update={this.update}
              items={contractors}
            />
            <Dropdown
              name="callType"
              label="Call Type"
              value={callType}
              update={this.update}
              items={callTypes}
            />
            <button onClick={this.submitCall}>Log Call</button>
          </div>
          <div className="area">
            <Area area={area} areas={areas} />
          </div>
          <div className="contractor">
            <Contractor contractor={contractor} contractors={contractors} />
          </div>
          <div className="log">
            <h2>Calls Today</h2>
            <Log
              calls={calls}
              contactTypes={contactTypes}
              areas={areas}
              contractors={contractors}
              callTypes={callTypes}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
