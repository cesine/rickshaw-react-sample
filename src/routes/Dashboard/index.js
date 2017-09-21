import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import View from './View';
import { requestDashboard } from '../../actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestDashboard,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(View);
