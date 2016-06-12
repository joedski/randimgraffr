import { connect } from 'react-redux';
import * as actions from '../actions';
import AnimalSelectionControls from './AnimalSelectionControls';

const mapState = state => {
	let currentAnimal = state.currentState.currentAnimal;
	let currentAnimalLoading = state.currentState.animalsLoading[ currentAnimal ];

	return {
		animals: state.animals,
		currentAnimal: currentAnimal,
		currentAnimalLoading: currentAnimalLoading,
		currentAnimalImages: isNaN( currentAnimal )
			? []
			: (state.animalImages[ currentAnimal ] || [])
	};
};

const mapDispatch = dispatch => {
	return {
		onSelectAnimal( index ) {
			return dispatch( actions.selectAnimal( index ) );
		}
	}
};

const CurrentAnimalSelectionControls = connect( mapState, mapDispatch )( AnimalSelectionControls );

export default CurrentAnimalSelectionControls;
