import { connect } from 'react-redux';
import * as actions from '../actions';
import ImageControls from './ImageControls';

const mapStateToProps = state => {
	return {
		isAnimalsLoaded: Boolean( state.animals.length ),
		isAnimalSelected: (isNaN( state.currentState.currentAnimal ) === false),
		slideshowState: state.currentState.slideshow,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onStart() {
			return dispatch( actions.startSession() );
		},
		onStop() {
			return dispatch( actions.stopSession() );
		}
	};
};

const CurrentImageControls = connect( mapStateToProps, mapDispatchToProps )( ImageControls );

export default CurrentImageControls;
