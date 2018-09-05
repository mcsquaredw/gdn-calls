import React, { Component } from "react";

import "./style.css";

export default class Dropdown extends Component {
  render() {
    const { name, update, label, items, value } = this.props;

    console.log(items);

    return (
      <select name={name} onChange={update} value={value}>
        <option value="">{label}</option>
        {items.map((item, index) => {
          return (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          );
        })}
      </select>
    );
  }
}
