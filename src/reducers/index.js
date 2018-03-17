"use strict"
import {combineReducers} from 'redux';

//HERE IMPORT REDUCERS TO BE COMBINED
import {bikesReducers} from './bikesReducers';
import {cartReducers} from './cartReducers';

//HERE COMBINE REDUCERS
export default combineReducers({
  bikes: bikesReducers,
  cart: cartReducers
})
