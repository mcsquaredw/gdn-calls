import React, { Component } from "react";

export default class NameFromList extends Component {
  render() {
    const { id, list } = this.props;
    const items = list.filter(item => {
      return item._id === id;
    });
    let name = "";

    console.log(items);

    if (items.length === 1) {
      name = items[0].name;
    } else {
      name = "Not Found";
    }

    return <span className="item-name">{name}</span>;
  }
}
