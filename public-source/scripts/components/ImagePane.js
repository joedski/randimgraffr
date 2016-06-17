import React, { PropTypes } from 'react';
import classNames from 'classnames';

// This has three rather different modes... Hm.

const ImagePane = ( props ) => {
	if( props.slideshowState === 'running' ) {
		return ImagePaneRunning( props );
	}
	else {
		return ImagePaneIdle( props );
	}
};

const ImagePaneIdle = ( props ) => {
	// TODO: Show images of last session if any.
	return (
		<section className="image-pane image-pane--idle">
			<div className="image-pane__empty-icon">
				<span className="image-pane__empty-icon-glyphicon glyphicon glyphicon-pencil"></span>
			</div>
		</section>
	);
};

const ImagePaneRunning = ( props ) => {
	let { animalName, animalImage } = props;

	if( animalName && animalImage ) {
		let imgSrc = `/animals/images/${ encodeURIComponent( animalName ) }/${ encodeURIComponent( animalImage ) }`;

		return (
			<section
				className="image-pane image-pane--running"
				onClick={ props.onClick || (() => {}) }
				>
				<div className="image-pane__image"
					style={{
						// backgroundSize: `contain`,
						backgroundImage: `url(${ imgSrc })`,
						// backgroundPosition: 'center',
						// backgroundRepeat: 'no-repeat'
					}}></div>
			</section>
		);
	}
	else {
		return ImagePaneIdle( props );
	}
};

ImagePane.propTypes = {
	slideshowState: PropTypes.string,
	animalName: PropTypes.string,
	animalImage: PropTypes.string,
	onClick: PropTypes.func,
};

export default ImagePane;
