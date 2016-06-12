import * as actions from '../actions';
import shuffle from 'fy-shuffle';

const startSession = store => next => action => {
	if( action.type === actions.START_SESSION ) {
		let result = next( action );
		let nextState = store.getState();

		if( nextState.currentState.slideshow === 'running' ) {
			let animalIndex = nextState.currentState.currentAnimal;
			let animalName = nextState.animals[ animalIndex ];
			let animalImages = (nextState.animalImages[ animalIndex ] || []);
			let shuffledImages = shuffle( animalImages.map( ( img, index ) => index ) );

			store.dispatch( actions.setShuffle( shuffledImages ) );
			store.dispatch( actions.nextImage() );
		}

		return result;
	}

	if( action.type === actions.SELECT_ANIMAL ) {
		let result = next( action );
		store.dispatch( actions.stopSession() );
		return result;
	}

	return next( action );
}

export default startSession;
