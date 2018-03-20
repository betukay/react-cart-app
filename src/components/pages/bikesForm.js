"use strict"
import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBikes, deleteBikes} from '../../actions/bikesActions';

class BikesForm extends React.Component{

  handleSubmit(){
    const bike =[{
      title:findDOMNode(this.refs.title).value,
      description:findDOMNode(this.refs.description).value,
      price:findDOMNode(this.refs.price).value
    }]
    this.props.postBikes(bike);
  }

  onDelete(){
    let bikeId = findDOMNode(this.refs.delete).value;

    this.props.deleteBikes(bikeId);
  }

  render(){

      const bikesList = this.props.bikes.map(function(bikesArr){
        return (
           <option key={bikesArr._id}>{bikesArr._id}</option>
        )
      })

    return(
      <Well>
        <Panel style={{padding:'15px'}}>
          <FormGroup controlId="title">
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter title"
            ref="title"/>
          </FormGroup>

          <FormGroup controlId="description">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter description"
            ref="description"/>
          </FormGroup>

          <FormGroup controlId="price">
          <ControlLabel>Price</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter price"
            ref="price"/>
          </FormGroup>
          <Button onClick={this.handleSubmit.bind(this)} bsStyle="info">Submit</Button>
        </Panel>

        <Panel style={{marginTop:'20px', padding:'10px'}}>
          <FormGroup controlId="formControlsSelect">
             <ControlLabel>Select a bike id to delete</ControlLabel>
               <FormControl ref="delete" componentClass="select" placeholder="select">
                 <option value="select">select</option>
                 {bikesList}
               </FormControl>
           </FormGroup>
          <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete bike</Button>
        </Panel>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return{
    bikes:state.bikes.bikes
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postBikes,
    deleteBikes
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BikesForm);
