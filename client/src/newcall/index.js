import React, { Component } from "react";

import "./style.css";
import Dropdown from "../dropdown";
import Area from "../area";
import Contractor from "../contractor";
import { newCall } from "../api/calls";

class NewCall extends Component {
  state = {
    area: "",
    contractor: "",
    contactType: "",
    callType: ""
  };

  componentDidMount() {}

  update = ev => {
    const { name, value } = ev.target;

    this.setState({
      [name]: value
    });
  };

  submitCall = ev => {
    const { contactType, area, contractor, callType } = this.state;
    const callObj = {
      contactType,
      area,
      contractor,
      callType
    };

    newCall(callObj)
      .then(savedCall => {
        this.setState({
          contactType: "",
          area: "",
          contractor: "",
          callType: ""
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { contactType, callType, area, contractor } = this.state;

    const { contactTypes, callTypes, areas, contractors } = this.props;

    return (
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
      </div>
    );
  }
}

export default NewCall;
