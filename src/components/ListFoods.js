import React, { Component } from 'react';

const titleStyle = {
  fontSize: '30px',
  margin: '10px 0'
}

const totalStyle = {
  fontSize: '20px',
  margin: '20px 0'
}

class ListFoods extends Component {

  render() {
    return (
      <div>
        <h1 style={titleStyle}>Today's food</h1>
        <ul>
          {this.props.children}
        </ul>
        <h1 style={totalStyle}>Total: {this.props.total} cal</h1>
      </div>
    );
  }
}

export default ListFoods;