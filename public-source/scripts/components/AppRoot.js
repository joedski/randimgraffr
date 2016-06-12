import React, { PropTypes } from 'react';
import CurrentTimingControls from './CurrentTimingControls';
import CurrentAnimalSelectionControls from './CurrentAnimalSelectionControls';
import CurrentImagePane from './CurrentImagePane';
import CurrentImageControls from './CurrentImageControls';

const AppRoot = ( props ) => {
	return (
		<article id="app-root" className="full-window flex-row flex-children-fill">
			<section id="main-controls" className="flex-column flex-padded">
				<CurrentTimingControls />
				<CurrentAnimalSelectionControls />
			</section>
			<section id="image" className="flex-column">
				<CurrentImagePane />
				<CurrentImageControls />
			</section>
		</article>
	);
}

// TODO: AppRoot.propTypes

export default AppRoot;
