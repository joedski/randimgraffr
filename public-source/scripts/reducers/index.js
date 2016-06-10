import { combineReducers } from 'redux';
import * as actions from '../actions';

const initialCurrentState = {
	// String: 'idle' | 'running'
	slideshow: 'idle',
	// TimingString: /\d+s/ | 'Infinity'
	interval: '30s',
	// Index
	currentAnimal: NaN,
	// Array<Index>
	currentSessionAnimals: [],
	// Shuffle?
	animalShuffle: null,
	// Index
	currentAnimalImage: NaN
};

function currentState( state = initialCurrentState, action ) {
	switch( action.type ) {
		case actions.SELECT_INTERVAL: {
			return {
				...state,
				interval: action.payload.interval
			};
		}

		case actions.SELECT_ANIMAL: {
			return {
				...state,
				currentAnimal: action.payload.index
			};
		}

		default: return state;
	}
}

const initialAnimals = [];

function animals( state = initialAnimals, action ) {
	switch( action.type ) {
		case actions.SET_ANIMALS: {
			return action.payload.animals;
		}

		default: return state;
	}
}

const initialAnimalImages = [];

function animalImages( state = initialAnimalImages, action ) {
	switch( action.type ) {
		default: return state;
	}
}

export default combineReducers({
	currentState,
	animals,
	animalImages,
});
