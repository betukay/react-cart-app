"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBikes} from '../../actions/bikesActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';

import BikeItem from './bikeItem';
import BikesForm from './bikesForm';
import Cart from './cart';

class BikesList extends React.Component {
  componentDidMount(){
    //Dispatch an action
    this.props.getBikes()
  }
  render(){
    const bikesList = this.props.bikes.map((bikesArr)=>
        <Col xs={12} sm={6} md={4} key={bikesArr._id}>
          <BikeItem
            _id={bikesArr._id}
            title={bikesArr.title}
            description={bikesArr.description}
            price={bikesArr.price}/>
        </Col>
    )
    return(
      <Grid>
        <Row>
          <Cart />
        </Row>
          <Row style={{marginTop:'15px'}}>
            <Col xs={12} sm={6}>
              <BikesForm />
            </Col>
            {bikesList}
          </Row>
      </Grid>
    )
  }
}
function mapStateToProps(state){
  return{
    bikes: state.bikes.bikes
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBikes:getBikes
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BikesList);
