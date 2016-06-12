import * as actions from '../actions';

const imageTicker = () => {
	let tickId = null;

	const startTicking = ( dispatch, state ) => {
		let interval = parseIntervalString( state.currentState.interval );

		let tick = () => {
			dispatch( actions.nextImage() );
			conditionallySetTimeout();
		};

		let conditionallySetTimeout = () => {
			if( interval === Infinity || isNaN( interval ) ) {
				return;
			}

			stopTicking();
			tickId = setTimeout( tick, interval );
		};

		conditionallySetTimeout();
	};

	const stopTicking = () => {
		if( tickId == null ) return;
		clearTimeout( tickId );
		tickId = null;
	};

	return store => next => action => {
		switch( action.type ) {
			case actions.SELECT_INTERVAL: {
				let result = next( action );
				let nextState = store.getState();

				let isRunning = nextState.currentState.slideshow === 'running';

				if( isRunning ) {
					stopTicking();
					startTicking( store.dispatch, nextState );
				}

				return result;
			}

			case actions.START_SESSION: {
				let prevState = store.getState();
				let result = next( action );
				let nextState = store.getState();

				let isRunning = nextState.currentState.slideshow === 'running';
				let wasRunning = prevState.currentState.slideshow === 'running';

				let isStarting = isRunning && ! wasRunning;

				if( isStarting ) {
					stopTicking();
					startTicking( store.dispatch, nextState );
				}

				return result;
			}

			case actions.STOP_SESSION: {
				stopTicking();
				return next( action );
			}

			case actions.NEXT_IMAGE: {
				let result = next( action );
				let nextState = store.getState();

				stopTicking();
				startTicking( store.dispatch, nextState );

				return result;
			}

			default: return next( action );
		}
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
