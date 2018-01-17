import React, { Component } from 'react';
import ShopList from './ShopList'
import { connect } from 'react-redux';
import * as actions from '../../actions';



class ShoppingList extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: null,
      list: [],
      userID: null
    }
    this.favorites = this.favorites.bind(this)
  }

  componentDidMount(){
    fetch('/api/products')
      .then(data => data.json())
      .then(products => this.setState({products})
      );
      this.props.fetchUser();
    }

    remountComponent(){
      fetch('/api/products')
        .then(data => data.json())
        .then(products => this.setState({products})
        );
        this.props.fetchUser();
    }

  favorites = () => {
    const list = [];
    return (
      this.props.auth.product_id.forEach( id => {
      this.state.products.forEach( product => {
        if(product.id === id) {
          this.state.list.push(product);
        }
      })
    })
    )
  }

  render(){
    const products = <ShopList products={this.state.list} remount={this.remountComponent}/>
    if(this.state.products && this.props.auth){
      return (
        <div>
        {this.favorites()}
        {products}
        </div>
      )
    } return <h3>Loading products...</h3>
    }
}

function mapStateToProps({auth}) {
  return { auth }
}


export default connect(mapStateToProps, actions) (ShoppingList);
