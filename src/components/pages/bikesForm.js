"use strict"
import React from 'react';
import {Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBikes} from '../../actions/bikesActions';

class BikesForm extends React.Component{

  handleSubmit(){
    const bike =[{
      title:findDOMNode(this.refs.title).value,
      description:findDOMNode(this.refs.description).value,
      price:findDOMNode(this.refs.price).value
    }]
    this.props.postBikes(bike);
  }

  render(){
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
      </Well>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({postBikes}, dispatch)
}
export default connect(null, mapDispatchToProps)(BikesForm);
