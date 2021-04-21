import React, { Component } from "react";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <header>Header</header>
        <main className="container">{this.props.children}</main>
        <footer>Create with love</footer>
      </div>
    );
  }
}
