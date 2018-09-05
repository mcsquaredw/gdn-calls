import React, { Component } from "react";

import NameFromList from "../namefromlist";
import "./style.css";

export default class Log extends Component {
  render() {
    const { calls, contactTypes, areas, contractors, callTypes } = this.props;

    return (
      <table className="call-log">
        <thead>
          <tr>
            <th>Call Date and Time</th>
            <th>Contact Type</th>
            <th>Area</th>
            <th>Contractor</th>
            <th>Call Type</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.createdAt}</td>
                <td>
                  <NameFromList id={item.contactType} list={contactTypes} />
                </td>
                <td>
                  <NameFromList id={item.area} list={areas} />
                </td>
                <td>
                  <NameFromList id={item.contractor} list={contractors} />
                </td>
                <td>
                  <NameFromList id={item.callType} list={callTypes} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
