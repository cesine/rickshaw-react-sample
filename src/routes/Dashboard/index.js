import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import View from './View';
import { requestDashboard } from '../../actions';

const mapStateToProps = state => ({
  deploysByHour: state.deploysByHour,
  deploysPerDay: state.deploysPerDay,
  deploysByDayOfTheWeek: state.deploysByDayOfTheWeek,
  deploysPerWeek: state.deploysPerWeek,
  daysWithoutDeploys: state.daysWithoutDeploys,
  deploysPerDayHistogram: state.deploysPerDayHistogram,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestDashboard,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(View);
