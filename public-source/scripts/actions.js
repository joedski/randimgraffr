
// https://github.com/acdlite/flux-standard-action
function action( type, payload = {}, meta = {} ) {
	let actionObject = { type, payload, meta };

	if( payload instanceof Error ) {
		actionObject.error = true;
	}

	return actionObject;
}

export const SELECT_INTERVAL = 'SELECT_INTERVAL';
export const selectInterval = ( interval, meta ) => action( SELECT_INTERVAL, { interval }, meta );

export const SELECT_ANIMAL = 'SELECT_ANIMAL';
export const selectAnimal = ( index, meta ) => action( SELECT_ANIMAL, { index }, meta );

export const START_SESSION = 'START_SESSION';
export const startSession = ( meta ) => action( START_SESSION, undefined, meta );

export const STOP_SESSION = 'STOP_SESSION';
export const stopSession = ( meta ) => action( STOP_SESSION, undefined, meta );

export const NEXT_IMAGE = 'NEXT_IMAGE';
export const nextSession = ( meta ) => action( NEXT_IMAGE, undefined, meta );

export const SET_ANIMALS = 'SET_ANIMALS';
export const setAnimals = ( animals, meta ) => action( SET_ANIMALS, { animals }, meta );
