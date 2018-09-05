import React, { Component } from "react";

import EmbedMap from "../embedmap";

export default class Contractor extends Component {
  render() {
    const { contractor, contractors } = this.props;
    const currentContractors = contractors.filter(item => {
      return item._id === contractor;
    });

    if (currentContractors.length === 1) {
      const currentContractor = currentContractors[0];

      return (
        <div>
          <h1>{currentContractor.name}</h1>
          {currentContractor.offices.map((office, index) => {
            return (
              <div key={index}>
                <EmbedMap
                  title={`${currentContractor.name} Map`}
                  location={office.postcode}
                />
                <br />
                {office.address}
                <br />
                {office.postcode}
                <br />
                {office.number}
                <br />
                <b>{office.bookingRules}</b>
                <br />
              </div>
            );
          })}
        </div>
      );
    } else {
      return <h4>No Contractor Selected</h4>;
    }
  }
}
