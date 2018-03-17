"use strict"

//--- CART ACTIONS ---
export function addToCart(bike){
  return {
    type:"ADD_TO_CART",
    payload: bike
  }
}
