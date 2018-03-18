"use strict"

//BIKE REDUCERS
export function bikesReducers(state={
  bikes:
      [{
      _id: 1,
      title: 'this is the first bike title',
      description: 'this is the first bike description',
      price: 120.50
    },
    {
      _id: 2,
      title: 'this is the second bike title',
      description: 'this is the second bike description',
      price: 207.62
    }]
}, action){
  switch(action.type){
    case "GET_BIKE":
    return {...state, bikes:[...state.bikes]}
    break;

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
        return bike._id === action.payload._id;
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
        return bike._id === action.payload._id;
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
