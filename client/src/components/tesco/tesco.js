import React, { Component } from 'react';
import Products from '../Products/Products';
import './tesco.css';

class Tesco extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tescoData: null
    }
  }

  componentDidMount() {
    var that = [];
    fetch('/api/products/default')
      .then(data => data.json())
      .then(tescoData => {
        tescoData.forEach(data => {
          if (data.PromotionDescription) {
            that.push(data)
          }
          this.setState({ tescoData: that })
        })
      })
  }

  searchText = e => {
    var that = [];
    e.preventDefault();
    var searchFilter = e.target.value;
    // dont search unless 3 characters have been entered
    if (searchFilter.length < 3) {
      return;
    }
    fetch('/api/products/' + searchFilter)
      .then(data => data.json())
      .then(tescoData => {
        tescoData.forEach(data => {
          if (data.PromotionDescription) {
            that.push(data)
          }
          this.setState({
            tescoData: that
          })
        })
      })
  }

  tescoFilter = searchFilter => {
    var that = [];
    fetch('/api/products/' + searchFilter)
      .then(data => data.json())
      .then(tescoData => {
        tescoData.forEach(data => {
          if (data.PromotionDescription) {
            that.push(data)
          }
          this.setState({
            tescoData: that
          })
        })
      })
  }

  tescoFilterArrangement() {
    const tescoCategories = ['vegan', 'vegetarian', 'dairy free', 'gluten free', 'low fat']
    const tescoCategoryLinks = tescoCategories.map(category => {
      return (
        <button className="btn btn-success quickSearch" onClick={() => this.tescoFilter(category)}>{category}
        </button>
      )
    })
    return <div>{tescoCategoryLinks}</div>
  }

  render() {
    if (!this.state.tescoData) {
      return <h4>TescoProducts Loading...</h4>
    } else {
      return (
        <div>
          <br />
          <ul>
            <input id="searchFilter" placeholder="search for products..." type="text" className="text-center" name="type" onChange={this.searchText}/>
          </ul>
          {this.tescoFilterArrangement()}
          <br />
          <Products products={this.state.tescoData} />
          <br />
        </div>

      )
    }
  }
}

export default Tesco;
