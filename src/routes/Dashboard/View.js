import React from 'react';
import PropTypes from 'prop-types';

export default function Dashboard({requestDashboard, history}) {
  return (
    <div>Dashboard</div>);
}

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  requestDashboard: PropTypes.func.isRequired,
};
