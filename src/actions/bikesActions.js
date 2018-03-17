"use strict"
//GET A BIKE
export function getBikes(bike){
  return {
          type:"GET_BIKE"
        }
}

//POST A BIKE
export function postBikes(bike){
  return {
          type:"POST_BIKE",
          payload: bike
        }
}

//DELETE A BIKE
export function deleteBikes(id){
  return {
          type:"DELETE_BIKE",
          payload: id
        }
}

//UPDATE A BIKE
export function updateBikes(bike){
  return {
          type:"UPDATE_BIKE",
          payload: bike
        }
}
