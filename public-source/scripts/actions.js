
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

export const REQUEST_LOAD_ANIMAL = 'REQUEST_LOAD_ANIMAL';
export const requestLoadAnimal = ( index, meta ) => action( REQUEST_LOAD_ANIMAL, { index }, meta );
export const COMPLETE_LOAD_ANIMAL = 'COMPLETE_LOAD_ANIMAL';
export const completeLoadAnimal = ( index, images, meta ) => action( COMPLETE_LOAD_ANIMAL, { index, images }, meta );
export const FAIL_LOAD_ANIMAL = 'FAIL_LOAD_ANIMAL';
export const failLoadAnimal = ( index, reason, meta ) => action( FAIL_LOAD_ANIMAL, { index, reason }, meta );

export const START_SESSION = 'START_SESSION';
export const startSession = ( meta ) => action( START_SESSION, {}, meta );

export const STOP_SESSION = 'STOP_SESSION';
export const stopSession = ( meta ) => action( STOP_SESSION, {}, meta );

export const SET_SHUFFLE = 'SET_SHUFFLE';
export const setShuffle = ( shuffle, meta ) => action( SET_SHUFFLE, { shuffle }, meta );

export const NEXT_IMAGE = 'NEXT_IMAGE';
export const nextImage = ( meta ) => action( NEXT_IMAGE, {}, meta );

export const SET_ANIMALS = 'SET_ANIMALS';
export const setAnimals = ( animals, meta ) => action( SET_ANIMALS, { animals }, meta );
