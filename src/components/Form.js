import React, { Component } from 'react';

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
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          name="name"
          placeholder="Food name"
          onChange={this.handleChange}
          value={this.state.name}

        />
        <input
          name="calories"
          placeholder="Calories"
          onChange={this.handleChange}
          value={this.state.calories}

        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={this.handleChange}
          value={this.state.image}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;