import * as actions from '../actions';
// import { fetchUrl } from 'fetch'; // Maybe use a more browser specific one?
import 'whatwg-fetch';

const defaultOptions = {
	animalUrlBase: '/animals',
}

const handleAnimalRequest = (options = {}) => store => next => action => {
	options = {
		...defaultOptions,
		...options
	};

	let { animalUrlBase } = options;

	if( action.type !== actions.REQUEST_LOAD_ANIMAL ) {
		return next( action );
	}

	let result = next( action );
	let nextState = store.getState();
	let animalIndex = action.payload.index;
	let animalName = nextState.animals[ animalIndex ];
	let animalUrl = `${ animalUrlBase }/files/${ encodeURIComponent( animalName ) }`;

	fetch( animalUrl )
		.then( response => {
			if( response.status === 200 ) {
				response.json()
					.then( animalImageList => {
						store.dispatch( actions.completeLoadAnimal( animalIndex, animalImageList ) );
					})
					.catch( error => {
						store.dispatch( actions.failLoadAnimal( animalIndex, error.message ) );
					})
					;
			}
			else {
				store.dispatch( actions.failLoadAnimal( animalIndex, `Non-OK response code from server: ${ response.status }` ) );
			}
		})
		.catch( error => {
			store.dispatch( actions.failLoadAnimal( animalIndex, error.message ) );
		})
		;

	// fetch( animalUrl, ( error, meta, body ) => {
	// 	if( error ) {
	// 		console.error( `Error fetching animal "${ animalName }":` );
	// 		console.error( error );
	// 		store.dispatch( actions.failLoadAnimal( animalIndex, error.message ) );
	// 		return;
	// 	}

	// 	let animalImageList = JSON.parse( body || '[]' );
	// 	store.dispatch( actions.completeLoadAnimal( animalIndex, animalImageList ) );
	// });
};

export default handleAnimalRequest;
