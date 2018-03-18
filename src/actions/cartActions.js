"use strict"

// ADD TO CART
export function addToCart(bike){
  return {
    type:"ADD_TO_CART",
    payload: bike
  }
}

// UPDATE CART
export function updateCart(_id, unit){
  return {
    type:"UPDATE_CART",
    _id: _id,
    unit: unit
  }
}

// DELETE FROM CART
export function deleteCartItem(cart){
  return {
    type:"DELETE_CART_ITEM",
    payload: cart
  }
}
