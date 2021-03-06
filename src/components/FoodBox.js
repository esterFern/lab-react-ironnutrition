import React, { Component } from 'react';

class FoodBox extends Component {

  state = {
    quantity: 1
  }

  handleChange = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleAdd = (e) => {
    e.preventDefault();
    if (this.state.quantity > 0) {
      const food = {
        name: this.props.name,
        calories: this.props.cal,
        image: this.props.image,
        quantity: e.target.quantity.value
      }
      this.props.handleAdd(food);
    }
    
  }

  render() {
    return (
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={this.props.image} alt={this.props.name} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.name}</strong> <br />
                <small>{this.props.cal} cal</small>
              </p>
            </div>
          </div>
          <div className="media-right">
          <form onSubmit={(e) => this.handleAdd(e)}>
            <div className="field has-addons">
              <div className="control">
                <input
                  name="quantity"
                  className="input"
                  type="number"
                  value={this.state.quantity}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="control">
                <button className="button is-info" type="submit" name={this.props.name}>
                  +
          </button>
              </div>
            </div>
            </form>
          </div>
        </article>
      </div>
    );
  }
}

export default FoodBox;