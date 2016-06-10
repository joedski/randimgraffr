import { connect } from 'react-redux';
import * as actions from '../actions';
import TimingControls from './TimingControls';

const mapStateToProps = state => {
	return {
		currentInterval: state.currentState.interval
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSelectInterval( interval ) {
			return dispatch( actions.selectInterval( interval ) );
		}
	}
};

const CurrentTimingControls = connect( mapStateToProps, mapDispatchToProps )( TimingControls );

export default CurrentTimingControls;
