import * as actions from '../actions';

const requestAnimal = store => next => action => {
	if( action.type !== actions.SELECT_ANIMAL ) {
		return next( action );
	}

	let result = next( action );
	let state = store.getState();
	let animalIndex = action.payload.index;
	let currentAnimalLoadingState = state.currentState.animalsLoading[ animalIndex ];

	if( currentAnimalLoadingState == null ) {
		store.dispatch( actions.requestLoadAnimal( animalIndex ) );
	}

	return result;
}

export default requestAnimal;
