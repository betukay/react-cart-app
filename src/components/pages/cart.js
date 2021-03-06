"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions';
import PayPal from './paypal';


class Cart extends React.Component{
  componentDidMount(){
    this.props.getCart();
  }
  onDelete(_id){
    //Create a copy of the current array of bikes
    const currentBikeToDelete = this.props.cart;
      // Determine at which index in the item array is the item to be deleted
    const indexToDelete = currentBikeToDelete.findIndex(
      function(cart){
        return cart._id ===_id;
      }
    )
    //use slice to remove bike at the specified index
    let cartAfterDelete = [...currentBikeToDelete.slice(0, indexToDelete),
    ...currentBikeToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete);
  }
  onIncrement(_id){
    this.props.updateCart(_id, 1, this.props.cart)
  }
  onDecrement(_id, quantity){
    if(quantity > 1){
          this.props.updateCart(_id, -1, this.props.cart)
    }
  }
  constructor(){
    super();
    this.state = {
      showModal:false
    }
  }
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal:false})
  }

  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(<div id="nothing">Your cart is currently empty.</div>)
  }
  renderCart(){
    const cartItemsList = this.props.cart.map(function(cartArr){
      return(
        <Panel key={cartArr._id}>
          <Row style={{padding:"10px"}}>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>  </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>$ {cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth:'300px'}}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)

    return(
      <div>
        <Panel style={{padding:"15px"}} bsStyle="primary">
          <Panel.Heading>Cart</Panel.Heading>
          {cartItemsList}
          <Row>
            <Col xs={12}>
              <h6>Total amount: {this.props.totalAmount}</h6>
              <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                PROCEED TO CHECKOUT
              </Button>
            </Col>
          </Row>
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Checkout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4>Thank you for choosing Boston Bikes!</h4>
              <p>Please proceed to PayPal for checkout.</p>
            </Modal.Body>
            <Modal.Footer>
              <Col style={{textAlign:"center"}}>
               <Row>
               <h6>Total $ {this.props.totalAmount}</h6>
               </Row>
               <Row>
              <PayPal />
              </Row>
              </Col>
            </Modal.Footer>
          </Modal>
        </Panel>
      </div>
    );
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
    deleteCartItem:deleteCartItem,
    updateCart:updateCart,
    getCart:getCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
