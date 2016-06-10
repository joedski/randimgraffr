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
		<section id="image-pane" className="flex-grow flex-row flex-children-fill">
			<div className="empty-icon flex-row flex-children-center"><span className="glyphicon glyphicon-pencil"></span></div>
		</section>
	);
};

const ImagePaneRunning = ( props ) => {
	return (
		<section id="image-pane" className="flex-grow flex-row flex-children-fill">
			<div className="empty-icon flex-row flex-children-center"><span className="glyphicon glyphicon-picture"></span><p>{ props.currentAnimalImage }</p></div>
		</section>
	);
}

export default ImagePane;
