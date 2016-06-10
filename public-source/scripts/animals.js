/**
 * Site!
 */

// jquery is installed globally.

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createReduxLogger from 'redux-logger';
import reducer from './reducers';
import _ from 'lodash/fp';
import decodeHTMLEntities from './util/decode-html-entities';
import * as actions from './actions';

const $ = window.jQuery;

import AppRoot from './components/AppRoot';

let animalsList = JSON.parse( decodeHTMLEntities( $( '#animals-list' ).html() ) );

let store = createStore(
	reducer,
	applyMiddleware(
		createReduxLogger()
	)
);

// I'm not sure how to hydrate only a little bit of the data,
// so I'm using an action before binding anything.
store.dispatch( actions.setAnimals( animalsList ) );

ReactDOM.render(
	<Provider store={ store }>
		<AppRoot />
	</Provider>,
	document.getElementById( 'app-container' )
);
