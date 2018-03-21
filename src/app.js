"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Menu from './components/menu'
import Footer from './components/footer'

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// REACT-ROUTER
import {Router, IndexRoute, browserHistory} from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBikes, deleteBikes, updateBikes} from './actions/bikesActions'

//STEP 1 create the store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

import BikesList from './components/pages/bikeslist';
import Cart from './components/pages/cart';
import BikesForm from './components/pages/bikesForm';
import Main from './main';

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Menu />
          <Switch>
            <Route exact path="/" component={BikesList} />
            <Route path="/admin" component={BikesForm} />
            <Route path="/cart" component={Cart} />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
)

render(
  Routes, document.getElementById('app')
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
