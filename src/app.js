"use strict"

import {createStore} from 'redux';

//STEP 3 define reducers
const reducer = function(state={bikes:[]}, action){
  switch(action.type){
    case "POST_BIKE":
    // let bikes = state.bikes.concat(action.payload)
    // return {bikes};
    return {bikes:[...state.bikes, ...action.payload]}
    break;

    case "DELETE_BIKE":
    //Create a copy of the current array of bikes
    const currentBikeToDelete = [...state.bikes]
      // Determine at which index in the item array is the item to be deleted
    const indexToDelete = currentBikeToDelete.findIndex(
      function(bike){
        return bike.id === action.payload.id;
      }
    )
    //use slice to remove bike at the specified index
    return {bikes: [...currentBikeToDelete.slice(0, indexToDelete),
    ...currentBikeToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BIKE":
    //Create a copy of the current array of items
    const currentBikeToUpdate = [...state.bikes]
    // Determine at which index in the item array is the item to be deleted
    const indexToUpdate = currentBikeToUpdate.findIndex(
      function(bike){
        return bike.id === action.payload.id;
      }
    )
    // Create a new item object with new values and with the same array index of
    // the item to be replaced. To get the desired result use the ...spread or
    // concat method.
    const newBikeToUpdate = {
      ...currentBikeToUpdate[indexToUpdate],
      title:action.payload.title
    }
    // This Log shows what the newBikeToUpdate will look like
    console.log("what is it newBikeToUpdate", newBikeToUpdate);
    // Use slice to remove the item at the specified index, replace with the
    // new object and concatenate with the rest of the array
    return {bikes: [...currentBikeToUpdate.slice(0, indexToUpdate), newBikeToUpdate,
    ...currentBikeToUpdate.slice(indexToUpdate + 1)]
    }
    break;
  }
  return state;
}

//STEP 1 create the store
const store = createStore(reducer);

store.subscribe(function(){
  console.log('current state is:', store.getState());
  // console.log('current price:', store.getState()[1].price);
})

//STEP 2 create and dispatch actions
store.dispatch({
  type:"POST_BIKE",
  payload: [{
    id: 1,
    title: 'this is the bike title',
    description: 'this is the bike description',
    price: 20.50
  },
  {
    id: 2,
    title: 'this is the second bike title',
    description: 'this is the second bike description',
    price: 11.62
  }
  ]
})

//delete an item
store.dispatch({
  type:"DELETE_BIKE",
  payload: {id: 1}
})

//update an item
store.dispatch({
  type:"UPDATE_BIKE",
  payload: {
    id: 2,
    title: 'this is the third bike title'
  }
})
