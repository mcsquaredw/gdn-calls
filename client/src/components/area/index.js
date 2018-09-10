import React, { Component } from "react";

import EmbedMap from "../embedmap";

export default class Area extends Component {
  render() {
    const { area, areas } = this.props;

    const currentAreas = areas.filter(item => {
      return item._id === area;
    });

    const currentArea = currentAreas[0];

    if (currentAreas.length === 1) {
      return (
        <div>
          <h1>{currentArea.name}</h1>
          <EmbedMap
            title={`${currentArea.name} Map`}
            location={currentArea.name}
          >
            <b>Loading...</b>
          </EmbedMap>
        </div>
      );
    } else {
      return <h4>No Area Selected</h4>;
    }
  }
}
