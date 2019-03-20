import React, { Component } from 'react';

const inputStyle = {
  margin: '20px 0',
  width: '200px'
}
const buttonStyle = {
  margin: '20px 0',
  width: '100px'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
}

class Form extends Component {

  state = {
    name: '',
    calories: '',
    image: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newFood = {
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.image,
      quantity: 1
    }

    this.props.onFood(newFood);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit} style={formStyle}>
        <input
          style={inputStyle}
          className="input"
          name="name"
          placeholder="Food name"
          onChange={this.handleChange}
          value={this.state.name}

        />
        <input
          style={inputStyle}
          className="input"
          name="calories"
          placeholder="Calories"
          onChange={this.handleChange}
          value={this.state.calories}

        />
        <input
          style={inputStyle}
          className="input"
          name="image"
          placeholder="Image URL"
          onChange={this.handleChange}
          value={this.state.image}
        />
        <button style={buttonStyle} className="button is-info" type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;