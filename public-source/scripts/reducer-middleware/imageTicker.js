import * as actions from '../actions';

const imageTicker = () => {
	let intervalId = null;

	const stopTimer = () => {
		if( intervalId == null ) return;
		clearInterval( intervalId );
		intervalId = null;
	}

	const startTimer = ( fn, interval ) => {
		intervalId = setInterval( fn, interval );
	}

	return store => next => action => {
		// Actions:
		// - SELECT_INTERVAL
		// - START_SESSION
		// - STOP_SESSION

		let prevState = store.getState();
		let result = next( action );
		let nextState = store.getState();

		let isStarting =
			nextState.currentState.slideshow === 'running' &&
			prevState.currentState.slideshow !== 'running';

		let isStopping =
			nextState.currentState.slideshow !== 'running' &&
			prevState.currentState.slideshow === 'running';

		let isIntervalChanging =
			prevState.currentState.interval !== nextState.currentState.interval;

		let fn = () => {
			store.dispatch( actions.nextImage() );
		};

		if( isStarting || isIntervalChanging ) {
			let interval = parseIntervalString( nextState.currentState.interval );

			if( interval !== Infinity ) {
				stopTimer();
				startTimer( fn, interval );
			}
		}

		if( isStopping ) {
			stopTimer();
		}

		return result;
	};
};

export default imageTicker;

function parseIntervalString( intervalString ) {
	if( intervalString === 'Infinity' ) {
		return Infinity;
	}

	let matches = (/(\d+)s/).exec( intervalString );
	let seconds = parseInt( matches[ 1 ], 10 );

	return seconds * 1000;
}
