import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css';
import foods from './data/foods.json';
import FoodBox from './components/FoodBox';
import Form from './components/Form';
import Search from './components/Search';
import ListFoods from './components/ListFoods';

const foodListStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '10px'
}

const twoListStyle = {
  margin: '0 50px',
  width: '50%'
}

const containerStyle = {
  margin: '20px',
}

const titleStyle={
  fontSize: '50px'
}

const deleteStyle={
  margin: '0 5px'
}

const listElementStyle={
  margin: '10px 0'
}

class App extends Component {

  state = {
    foods,
    formVisible: false,
    foodsToday: []
  }

  handleSubmit = (food) => {
    this.setState({
      foods: [food, ...this.state.foods],
      formVisible: !this.state.formVisible
    });
  }

  handleClickForm = () => {
    this.setState({
      formVisible: !this.state.formVisible
    });
  }

  handleSearch = (nameFood) => {
    console.log(this.state.foods)
    const filteredList = foods.filter((e) => e.name.toLowerCase().includes(nameFood.toLowerCase()));
    console.log(filteredList);
    this.setState({
      foods: filteredList
    })

  }

  handleAddToday = (food) => {
    const totalList = this.state.foods.map((e, index) => {
      if (food.name === e.name) {
        e.quantity = food.quantity;
      }
      return e;
    });

    this.setState({
      foods: totalList,
    })

    let inToday = false;
    this.state.foodsToday.forEach(e => {
      if (food.name === e.name) {
        inToday = true;
      }
    })

    if (inToday) {
      const todayList = this.state.foodsToday.map((e) => {
        if (food.name === e.name) {
          e.quantity = parseInt(e.quantity) + parseInt(food.quantity);
        }
        return e;
      });
      this.setState({
        foodsToday: todayList
      })
    } else {
      this.setState({
        foodsToday: [...this.state.foodsToday, food]
      })
    }
  }

  handleDelete = (event, food) => {

    let pos;
    this.state.foodsToday.forEach((e, index) => {
      if (e.name == food.name) {
        pos = index;
      }
    })
    let todayList = [...this.state.foodsToday];
    todayList.splice(pos, 1);
    this.setState({
      foodsToday: todayList
    });
  }

  renderForm() {
    if (!this.state.formVisible) {
      return <button onClick={this.handleClickForm} className="button is-primary">Add new food</button>
    } else {
      return <Form onFood={this.handleSubmit} />
    }
  }

  renderList() {
    return this.state.foods.map((e, index) => {
      return <FoodBox
        key={'id-' + index}
        name={e.name}
        image={e.image}
        cal={e.calories}
        quantity={e.quantity}
        handleAdd={this.handleAddToday}
      />
    });
  }

  renderFoodListToday() {
    return this.state.foodsToday.map((e, index) => {
      return (<li key={'id-' + index} style={listElementStyle}>
        {e.quantity} {e.name} = {e.quantity * e.calories} cal
        <button className="button is-danger is-rounded is-small" style={deleteStyle} onClick={(event) => this.handleDelete(event, e)}>Delete</button>
      </li>);
    });
  }

  renderListToday() {
    if (this.state.foodsToday.length === 0) {
      return (
        <ListFoods total={0}>
          <p>No food yet</p>
        </ListFoods>);
    } else {
      let total = 0;
      this.state.foodsToday.forEach((e) => {
        total = total + (e.quantity * e.calories);
      });
      return (
        <ListFoods total={total}>
          {this.renderFoodListToday()}
        </ListFoods>);
    }
  }

  render() {
    return (
      <div>
        <div style={containerStyle}>
          <h1 style={titleStyle}>Ironutrition</h1>
          <Search onSearch={this.handleSearch} />
        </div>
        <div style={containerStyle}>
          {this.renderForm()}
        </div>
        <div style={foodListStyle}>
          <div style={twoListStyle}>
            {this.renderList()}
          </div>
          <div style={twoListStyle}>
            {this.renderListToday()}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
