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
    paypal.Button.render({

      env: 'sandbox', // sandbox | production

      // PayPal Client IDs - replace with your own
      // Create a PayPal app: https://developer.paypal.com/developer/applications/create
      client: {
          sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
          production: '<insert production client id>'
      },

      style: {
           label: 'pay',
           size:  'medium', // small | medium | large | responsive
           shape: 'rect',   // pill | rect
           color: 'gold'   // gold | blue | silver | black
       },

      // Show the buyer a 'Pay Now' button in the checkout flow
      commit: true,

      // payment() is called when the button is clicked
      payment: function(data, actions) {

          // Make a call to the REST api to create the payment
          return actions.payment.create({
              payment: {
                  transactions: [
                      {
                          amount: { total: '0.01', currency: 'USD' }
                      }
                  ]
              }
          });
      },

      // onAuthorize() is called when the buyer approves the payment
      onAuthorize: function(data, actions) {

          // Make a call to the REST api to execute the payment
          return actions.payment.execute().then(function() {
              window.alert('Payment Complete!');
          });
      }

  }, '#paypal-button-container');

    return(
      <div id="paypal-button-container"></div>
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
