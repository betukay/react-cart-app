"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';

class PayPal extends React.Component {
  componentDidMount(){
    this.props.getCart();
  }

  render(){

    

    return(
      <Button bsStyle='warning' id="paypal-button-container">PayPal Checkout</Button>
    )
  }
}

function mapStateToProps(state){
  return{
    cart:state.cart.cart,
    totalAmount:state.cart.totalAmount,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getCart:getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPal);
