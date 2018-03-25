"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBikes} from '../../actions/bikesActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

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
        <Col xs={12} key={bikesArr._id}>
          <BikeItem
            _id={bikesArr._id}
            title={bikesArr.title}
            description={bikesArr.description}
            images={bikesArr.images}
            price={bikesArr.price}/>
        </Col>
    )
    return(
      <Grid>
        <Row >
          <Carousel>
            <Carousel.Item>
              <img width={900} height={250} alt="900x300" src="/images/royale-min.jpg" />
              <Carousel.Caption>
                <h3>Conquer your next marathon</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={250} alt="900x300" src="/images/urbanite-min.jpg" />
              <Carousel.Caption>
                <h3>Navigate the urban jungle</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={250} alt="900x300" src="/images/strider-min.jpg" />
              <Carousel.Caption>
                <h3>Take that weekend ride</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={250} alt="900x300" src="/images/touring pro-min.jpg" />
              <Carousel.Caption>
                <h3>Find your next adventure</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row>
          <Cart />
        </Row>
        <Row style={{marginTop:'15px'}}>
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
