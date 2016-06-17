import React, { PropTypes } from 'react';
import classNames from 'classnames';

const TimingControls = ( props ) => (
	<section className="timing-controls">
		<div onClick={ () => props.onSelectInterval( '30s' ) }      className={ buttonClass( '30s', props.currentInterval )}>30s</div>
		<div onClick={ () => props.onSelectInterval( '45s' ) }      className={ buttonClass( '45s', props.currentInterval )}>45s</div>
		<div onClick={ () => props.onSelectInterval( '60s' ) }      className={ buttonClass( '60s', props.currentInterval )}>60s</div>
		<div onClick={ () => props.onSelectInterval( '90s' ) }      className={ buttonClass( '90s', props.currentInterval )}>90s</div>
		<div onClick={ () => props.onSelectInterval( 'Infinity' ) } className={ buttonClass( 'Infinity', props.currentInterval )}><span className="glyphicon glyphicon-ban-circle"></span></div>
	</section>
);

TimingControls.propTypes = {
	onSelectInterval: PropTypes.func.isRequired
};

function buttonClass( buttonTime, currentTime ) {
	return classNames( 'btn', 'btn-default', 'timing-controls__choice', {
		active: buttonTime == currentTime
	});
};

export default TimingControls;
