"use strict"
import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Grid, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBikes, deleteBikes, getBikes, resetButton} from '../../actions/bikesActions';
import axios from 'axios';

class BikesForm extends React.Component{
  constructor(){
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }
  componentDidMount(){
    this.props.getBikes();
// GET IMAGES FROM API
    axios.get('/api/images')
     .then(function(response){
      this.setState({images:response.data});
    }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image from server', img:''})
      }.bind(this))
  }

  handleSubmit(){
    const bike =[{
      title:findDOMNode(this.refs.title).value,
      description:findDOMNode(this.refs.description).value,
      images:findDOMNode(this.refs.image).value,
      price:findDOMNode(this.refs.price).value
    }]
    this.props.postBikes(bike);
  }

  onDelete(){
    let bikeId = findDOMNode(this.refs.delete).value;

    this.props.deleteBikes(bikeId);
  }
  handleSelect(img){
    this.setState({
      img: '/images/'+ img
    })
  }

  resetForm(){
    //RESET the Button
    this.props.resetButton();

    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
    this.setState({img:''});
  }

  render(){

    const bikesList = this.props.bikes.map(function(bikesArr){
      return (
         <option key={bikesArr._id}>{bikesArr._id}</option>
      )
    })

    const imgList = this.state.images.map(function(imgArr, i){
      return (
        <MenuItem key={i} eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</MenuItem>
      )
    }, this)

    return(

    <Well>
      <Row>
      <Col xs={12} sm={6}>
          <Panel style={{padding:'10px'}}>
            <InputGroup>
              <FormControl type="text" ref="image" value={this.state.img} />
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Select an image"
                bsStyle="info">
                {imgList}
              </DropdownButton>
            </InputGroup>
            <Image src={this.state.img} responsive />
          </Panel>
        </Col>

        <Col xs={12} sm={6}>
          <Panel style={{padding:'10px'}}>
            <FormGroup controlId="title" validationState={this.props.validation}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title"/>
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="description" validationState={this.props.validation}>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Description"
              ref="description"/>
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="price" validationState={this.props.validation}>
            <ControlLabel>Price</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Price"
              ref="price"/>
              <FormControl.Feedback />
            </FormGroup>
            <Button
            onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
            bsStyle={(!this.props.style)?("info"):(this.props.style)}>
            {(!this.props.msg)?("Save bike"):(this.props.msg)}
            </Button>
          </Panel>

          <Panel style={{marginTop:'20px', padding:'8px'}}>
            <FormGroup controlId="formControlsSelect">
               <ControlLabel>Select a bike id to delete</ControlLabel>
                 <FormControl ref="delete" componentClass="select" placeholder="select">
                   <option value="select">select</option>
                   {bikesList}
                 </FormControl>
             </FormGroup>
            <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete bike</Button>
          </Panel>
        </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return{
    bikes:state.bikes.bikes,
    msg:state.bikes.msg,
    style:state.bikes.style,
    validation:state.bikes.validation
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postBikes,
    deleteBikes,
    getBikes,
    resetButton
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BikesForm);
