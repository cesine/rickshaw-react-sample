import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getTimestampsToDatePeriods from '../../lib/timestampsToDatePeriods';

import View from './View';
import { requestDashboard } from '../../actions';

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    deploysByHour: state.deploysByHour,
    deploysPerDay: state.deploysPerDay,
    deploysByDayOfTheWeek: state.deploysByDayOfTheWeek,
    deploysPerWeek: state.deploysPerWeek,
    daysWithoutDeploys: state.daysWithoutDeploys,
    deploysPerDayHistogram: state.deploysPerDayHistogram,
  };
};

const mapDispatchToProps = (dispatch) => {
  function filterByStartAndEnd({ start, end }) {
    const data = getTimestampsToDatePeriods(start, end);
    console.log(data);
    dispatch({
      type: 'RANGE_CHANGED',
      payload: data,
    });
  }
  return bindActionCreators({ requestDashboard, filterByStartAndEnd }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
