import React, { PropTypes } from 'react';
import classNames from 'classnames';

const AnimalSelectionControls = ( props ) => {
	if( props.animals && props.animals.length > 0 ) {
		return AnimalSelectionControlsPopulated( props );
	}

	return (
		<section className={ classNames( 'animal-selection-controls', props.className ) }>
			<div className="animal-selection-controls__message">
				<div className="animal-selection-controls__message-content">Please wait while we get the animals...</div>
			</div>
		</section>
	);
};

const AnimalSelectionControlsPopulated = ( props ) => {
	return (
		<section className={ classNames( 'animal-selection-controls', 'animal-selection-controls--populated', props.className ) }>
			<div className="animal-selection-controls__panel panel panel-default">
				<div className="animal-selection-controls__list list-group">
					{ props.animals.map( ( animal, index ) => AnimalButton( props, animal, index ) ) }
				</div>
			</div>
		</section>
	);
};

const AnimalButton = ( props, animal, index ) => {
	let isCurrent = props.currentAnimal === index;
	// let isLoaded = props.currentAnimalImages != null;
	let loadingState = props.currentAnimalLoading;
	let buttonClassNames = classNames( 'list-group-item', {
		active: isCurrent,
		'list-group-item-warning': isCurrent && loadingState === 'loading',
		'list-group-item-danger': isCurrent && loadingState === 'failed',
		'list-group-item-success': isCurrent && loadingState === 'completed',
	});

	return (
		<button type="button" key={ index } className={ buttonClassNames } onClick={ () => props.onSelectAnimal( index ) }>
			{ props.animals[ index ] }
			{ isCurrent === false
				? <span className="pull-right"></span>
				: loadingState === 'completed'
				? <span className="badge pull-right">{ props.currentAnimalImages.length }</span>
				: loadingState === 'failed'
				? <span className="badge pull-right">:(</span>
				: loadingState === 'loading'
				? <span className="badge pull-right">Loading...</span>
				: <span className="pull-right"></span> 
			}
		</button>
	);
}

AnimalSelectionControls.propTypes = {
	// Not required.  If not set, means the animals list isn't loaded yet.
	animals: PropTypes.array,
	// Required.  May be NaN.  If NaN, the user hasn't selected anything.
	currentAnimal: PropTypes.number.isRequired,
	// Optional.  Undefined indicates no action has been taken yet, and MUST be accounted for as a state.
	currentAnimalLoading: PropTypes.string,
	// Not required!  If not set, means that the current animal's image list isn't loaded yet.
	currentAnimalImages: PropTypes.array,
	onSelectAnimal: PropTypes.func.isRequired
}

export default AnimalSelectionControls;
