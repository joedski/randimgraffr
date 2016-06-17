import React, { PropTypes } from 'react';
import classNames from 'classnames';

const ImageControls = ( props ) => {
	let button;

	if( props.isAnimalsLoaded !== true ) {
		button = <div className="btn btn-warning disabled">Waiting for animals...</div>
	}
	else if( props.isAnimalSelected !== true ) {
		button = <div className="btn btn-warning disabled">Please select an animal</div>
	}
	else if( props.slideshowState === 'running' ) {
		button = <div className="btn btn-danger" onClick={ props.onStop }>Stop</div>
	}
	else {
		button = <div className="btn btn-success" onClick={ props.onStart }>Start</div>
	}

	return (
		<section className="image-controls">
			{ button }
		</section>
	);
};

export default ImageControls;
