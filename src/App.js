import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css';
import foods from './data/foods.json';
import FoodBox from './components/FoodBox';
import Form from './components/Form';
import Search from './components/Search';
import ListFoods from './components/ListFoods';

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

    const filteredList = foods.filter((e) => e.name.toLowerCase().includes(nameFood.toLowerCase()));
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
    }else{
      this.setState({
        foodsToday: [...this.state.foodsToday, food]
      })
    }
  }

  renderForm() {
    if (!this.state.formVisible) {
      return <button onClick={this.handleClickForm}>Add new food</button>
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
      return (<li>
        {e.quantity} {e.name} = {e.quantity * e.calories} cal
      </li>);
    });
  }

  renderListToday() {
    if (this.state.foodsToday.length === 0) {
      return (
        <ListFoods total={0}>
          <p>No foods yet</p>
        </ListFoods>);
    } else {
      let total = 0;
      this.state.foodsToday.forEach((e)=>{
        total = total + (e.quantity*e.calories);
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
        <Search onSearch={this.handleSearch} />
        {this.renderForm()}
        {this.renderList()}
        {this.renderListToday()}
      </div>
    );
  }
}

export default App;
