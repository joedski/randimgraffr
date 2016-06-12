import { connect } from 'react-redux';
import * as actions from '../actions';
import ImagePane from './ImagePane';

const mapState = state => {
	let animalIndex = state.currentState.currentAnimal;
	let animalImageIndex = state.currentState.currentAnimalImage;
	let animalName = state.animals[ animalIndex ];
	let animalImage = (state.animalImages[ animalIndex ] || [])[ animalImageIndex ];

	let slideshowState = state.currentState.slideshow;

	return {
		slideshowState,
		animalName,
		animalImage
	};
};

const mapDispatch = dispatch => {
	return {};
};

const CurrentImagePane = connect( mapState, mapDispatch )( ImagePane );

export default CurrentImagePane;
