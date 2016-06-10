import React, { PropTypes } from 'react';
import classNames from 'classnames';

const AnimalSelectionControls = ( props ) => {
	if( props.animals && props.animals.length > 0 ) {
		return AnimalSelectionControlsPopulated( props );
	}

	return (
		<section id="animal-selection-controls" className="flex-grow">
			<div className="message flex-column flex-children-center">
				<div className="message-content">Please wait while we get the animals...</div>
			</div>
		</section>
	);
};

const AnimalSelectionControlsPopulated = ( props ) => {
	return (
		<section id="animal-selection-controls" className="flex-grow flex-column flex-children-fill">
			<div className="panel panel-default animal-selection-panel">
				<div className="list-group animal-selection-list">
					{ props.animals.map( ( animal, index ) => AnimalButton( props, animal, index ) ) }
				</div>
			</div>
		</section>
	);
};

const AnimalButton = ( props, animal, index ) => {
	let isCurrent = props.currentAnimal === index;
	let isLoaded = props.currentAnimalImages != null;
	let buttonClassNames = classNames( 'list-group-item', {
		active: isCurrent,
		'list-group-item-warning': isCurrent && isLoaded === false,
		'list-group-item-success': isCurrent && isLoaded === true,
	});

	return (
		<button type="button" key={ index } className={ buttonClassNames } onClick={ () => props.onSelectAnimal( index ) }>
			{ props.animals[ index ] }
			{ isCurrent === false
				? <span className="pull-right"></span>
				: isLoaded
				? <span className="badge pull-right">{ props.currentAnimalImages.length }</span>
				: <span className="badge pull-right">Loading...</span> }
		</button>
	);
}

AnimalSelectionControls.propTypes = {
	// Required.  May be NaN.  If NaN, the user hasn't selected anything.
	currentAnimal: PropTypes.number.isRequired,
	// Not required.  If not set, means the animals list isn't loaded yet.
	animals: PropTypes.array,
	// Not required!  If not set, means that the current animal's image list isn't loaded yet.
	currentAnimalImages: PropTypes.array,
	onSelectAnimal: PropTypes.func.isRequired
}

export default AnimalSelectionControls;
