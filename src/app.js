"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBikes, deleteBikes, updateBikes} from './actions/bikesActions'

//STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import BikesList from './components/pages/bikeslist';
import Menu from './components/menu';
import Footer from './components/footer';

render(
  <Provider store={store}>
    <div>
      <Menu />
      <BikesList />
      <Footer />
    </div>
  </Provider>, document.getElementById('app')
);

// //STEP 2 create and dispatch actions
// store.dispatch(postBikes(
//   [{
//     id: 1,
//     title: 'this is the first bike title',
//     description: 'this is the first bike description',
//     price: 20.50
//   },
//   {
//     id: 2,
//     title: 'this is the second bike title',
//     description: 'this is the second bike description',
//     price: 11.62
//   }]
// ))

// //delete an item
// store.dispatch(deleteBikes(
//   {id: 1}
// ))
//
// //update an item
// store.dispatch(updateBikes(
//   {
//     id: 2,
//    title: 'this is the third bike title'
//   }
// ))
//
// //--- CART ACTIONS ---
// //Add to cart
// store.dispatch(addToCart([{id:1}]))
