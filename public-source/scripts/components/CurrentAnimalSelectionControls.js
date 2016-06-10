import { connect } from 'react-redux';
import * as actions from '../actions';
import AnimalSelectionControls from './AnimalSelectionControls';

const mapState = state => {
	return {
		currentAnimal: state.currentState.currentAnimal,
		animals: state.animals,
		currentAnimalImages: isNaN( state.currentState.currentAnimal )
			? null
			: (state.animalImages[ state.currentState.currentAnimal ] || null)
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
