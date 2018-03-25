"use strict"
// REACT
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import Menu from './components/menu';
import Footer from './components/footer';

import {applyMiddleware, createStore} from 'redux';
import { logger } from 'redux-logger'
import thunk from 'redux-thunk';

// REACT-ROUTER
import {Router, IndexRoute, browserHistory} from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//IMPORT COMBINED REDUCERS
import reducers from './reducers/index';
// IMPORT ACTIONS
import {addToCart} from './actions/cartActions';
import {postBikes, deleteBikes, updateBikes} from './actions/bikesActions'

//STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

import BikesList from './components/pages/bikesList';
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
