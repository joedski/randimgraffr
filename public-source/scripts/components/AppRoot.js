import React, { PropTypes } from 'react';
import CurrentTimingControls from './CurrentTimingControls';
import CurrentAnimalSelectionControls from './CurrentAnimalSelectionControls';
import CurrentImagePane from './CurrentImagePane';
import CurrentImageControls from './CurrentImageControls';

const AppRoot = ( props ) => {
	return (
		<article className="app-root">
			<section className="main-controls">
				<CurrentTimingControls className="main-controls__timing-controls" />
				<CurrentAnimalSelectionControls className="main-controls__animal-selection-controls" />
			</section>
			<section className="app-image">
				<CurrentImagePane />
				<CurrentImageControls />
			</section>
		</article>
	);
}

// TODO: AppRoot.propTypes

export default AppRoot;
