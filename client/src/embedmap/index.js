import React, { Component } from "react";

export default class EmbedMap extends Component {
  render() {
    const { location, title } = this.props;
    const MAP_URL = `https://google.com/maps/embed/v1/place?key=AIzaSyD55V3pJb2XQ02l44ecXJ5VgWWE8KRk-NM&q=${location.replace(
      / /g,
      "+"
    )}&zoom=9`;

    return <iframe title={title} src={MAP_URL} />;
  }
}
