"use strict"
import axios from 'axios';

//GET A BIKE
export function getBikes(){
  return function(dispatch){
    axios.get("/api/bikes")
      .then(function(response){
        dispatch({type:"GET_BIKES", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_BIKES_REJECTED", payload:err})
      })
  }
}

//POST A BIKE
export function postBikes(bike){
  return function(dispatch){
    axios.post("/api/bikes", bike)
      .then(function(response){
        dispatch({type:"POST_BIKE", payload:response.data})
      })
      .catch(function(){
        disptach({type:"POST_BIKE_REJECTED", payload:"there was an error while posting a new bike"})
      })
  }
}

//DELETE A BIKE
export function deleteBikes(id){
  return function(dispatch){
    axios.delete("/api/bikes/" + id)
      .then(function(response){
        dispatch({type:"DELETE_BIKE", payload:id})
      })
      .catch(function(err){
        dispatch({type:"DELETE_BIKE_REJECTED", payload:err})
      })
  }
}

//UPDATE A BIKE
export function updateBikes(bike){
  return {
          type:"UPDATE_BIKE",
          payload: bike
        }
}
