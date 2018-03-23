"use strict"
import axios from 'axios';

// GET CART

export function getCart(){
  return function(dispatch){
    axios.get('/api/cart')
      .then(function(response){
        dispatch({type:"GET_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"GET_CART_REJECTED", msg:"error when getting cart from session"})
      })
  }
}

// ADD TO CART
export function addToCart(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type: "ADD_TO_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"ADD_TO_CART_REJECTED", msg:"error when adding to cart"})
      })
  }
}

// UPDATE CART
export function updateCart(_id, unit, cart){
  //Create a copy of the current array of items
  const currentBikeToUpdate = cart
  // Determine at which index in the item array is the item to be deleted
  const indexToUpdate = currentBikeToUpdate.findIndex(
    function(bike){
      return bike._id === _id;
    }
  )

  const newBikeToUpdate = {
    ...currentBikeToUpdate[indexToUpdate],
    quantity:currentBikeToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBikeToUpdate.slice(0, indexToUpdate), newBikeToUpdate,
  ...currentBikeToUpdate.slice(indexToUpdate + 1)]

  return function(dispatch){
    axios.post("/api/cart", cartUpdate)
      .then(function(response){
        dispatch({type: "UPDATE_CART", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"UPDATE_CART_REJECTED", msg:"error when adding to cart"})
      })
  }
}

// DELETE FROM CART
export function deleteCartItem(cart){
  return function(dispatch){
    axios.post("/api/cart", cart)
      .then(function(response){
        dispatch({type: "DELETE_CART_ITEM", payload:response.data})
      })
      .catch(function(err){
        dispatch({type:"DELETE_CART_ITEM_REJECTED", msg:"error when deleting item from cart"})
      })
  }
  return {
    type:"DELETE_CART_ITEM",
    payload: cart
  }
}
