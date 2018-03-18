"use strict"

//CART REDUCERS
export function cartReducers(state={cart:[]}, action){
  switch(action.type){
    case "ADD_TO_CART":
    return {...state, cart:action.payload}
    break;

    case "UPDATE_CART":
    //Create a copy of the current array of items
    const currentBikeToUpdate = [...state.cart]
    // Determine at which index in the item array is the item to be deleted
    const indexToUpdate = currentBikeToUpdate.findIndex(
      function(bike){
        return bike._id === action._id;
      }
    )

    const newBikeToUpdate = {
      ...currentBikeToUpdate[indexToUpdate],
      quantity:currentBikeToUpdate[indexToUpdate].quantity + action.unit
    }

    let cartUpdate = [...currentBikeToUpdate.slice(0, indexToUpdate), newBikeToUpdate,
    ...currentBikeToUpdate.slice(indexToUpdate + 1)]

    return {...state, cart:cartUpdate}
    break;

    case "DELETE_CART_ITEM":
    return {...state, cart:action.payload}
    break;
  }
  return state
}
