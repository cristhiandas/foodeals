import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
  render(){
    if(this.props.auth){
      return (
        <div className='User'>
            <p><img style={{width: 100, height: 100}} src={this.props.auth.image}alt="avatar"></img></p>
            <p>Name: {this.props.auth.name}</p>
            <p>Email: {this.props.auth.email}</p>
            <p>Diet: {this.props.auth.diet}</p>
        </div>
        )
      }
      else {
        return null;
      }
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps) (User);