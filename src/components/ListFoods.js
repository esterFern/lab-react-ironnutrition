import React, { Component } from 'react';

class ListFoods extends Component {

  render() {
    return (
      <div>
        <h1>Today's food</h1>
        {this.props.children}
        <p>Total: {this.props.total} cal</p>
      </div>
    );
  }
}

export default ListFoods;