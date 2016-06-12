import { combineReducers } from 'redux';
import * as actions from '../actions';
import _ from 'lodash/fp';

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
	currentAnimalImage: NaN,
	// { [Index]: (undefined | 'loading' | 'completed' | 'failed') }
	animalsLoading: [],
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

		// TODO: Move into sub-thingy.

		case actions.REQUEST_LOAD_ANIMAL: {
			return {
				...state,
				animalsLoading: _.set( [ action.payload.index ], 'loading', state.animalsLoading )
			};
		}

		case actions.COMPLETE_LOAD_ANIMAL: {
			return {
				...state,
				animalsLoading: _.set( [ action.payload.index ], 'completed', state.animalsLoading ),
			};
		}

		case actions.FAIL_LOAD_ANIMAL: {
			return {
				...state,
				animalsLoading: _.set( [ action.payload.index ], 'failed', state.animalsLoading )
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
		case actions.COMPLETE_LOAD_ANIMAL: {
			return _.set( [ action.payload.index ], action.payload.images, state );
		}

		case actions.FAIL_LOAD_ANIMAL: {
			return _.set( [ action.payload.index ], [], state );
		}

		default: return state;
	}
}

export default combineReducers({
	currentState,
	animals,
	animalImages,
});
