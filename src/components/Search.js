import React, { Component } from 'react';

class Form extends Component {

  state = {
    name: '',
  }

  

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    })
    this.props.onSearch(this.state.name)
  }

  render() {
    return (
      <input
        name="name"
        placeholder="Search by name"
        onChange={(e)=>this.handleChange(e)}
        value={this.state.name}
      />
    );
  }
}

export default Form;