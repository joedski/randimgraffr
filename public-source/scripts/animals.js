/**
 * Site!
 */

// jquery is installed globally.
import 'whatwg-fetch';

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createReduxLogger from 'redux-logger';
import requestAnimal from './reducer-middleware/requestAnimal';
import handleAnimalRequest from './reducer-middleware/handleAnimalRequest';
import createImageTicker from './reducer-middleware/imageTicker';
import startSession from './reducer-middleware/startSession';
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
		requestAnimal,
		handleAnimalRequest({ animalUrlBase: '/animals' }),
		createImageTicker(),
		startSession,
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
