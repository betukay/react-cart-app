"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBikes} from '../../actions/bikesActions';

class BikesList extends React.Component {
  componentDidMount(){
    //Dispatch an action
    this.props.getBikes();
  }
  render(){
    const bikesList = this.props.bikes.map(function(bikesArr){
      return(
        <div key={bikesArr.id}>
          <h2>{bikesArr.title}</h2>
          <h2>{bikesArr.description}</h2>
          <h2>{bikesArr.price}</h2>
        </div>
      )
    })
    return(
      <div>
        <h1>Hello React</h1>
        {bikesList}
      </div>
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
