import React from 'react';
import PropTypes from 'prop-types';
import ChartByDayOfTheWeek from '../../components/ChartByDayOfTheWeek';
import ChartByHour from '../../components/ChartByHour';
import ChartDaysWithout from '../../components/ChartDaysWithout';
import ChartHistogram from '../../components/ChartHistogram';
import ChartPerDay from '../../components/ChartPerDay';
import ChartPerWeek from '../../components/ChartPerWeek';

export default function Dashboard({requestDashboard, history}) {
  return (
    <table>
      <tr>
        <td>
          <h2>Deploys by Hour</h2>
          <ChartByHour />
        </td>
        <td>
          <h2>Deploys per Day</h2>
          <ChartPerDay />
        </td>
      </tr>
      <tr>
        <td>
          <h2>Deploys by Day of the Week</h2>
          <ChartByDayOfTheWeek />
        </td>
        <td>
          <h2>Deploys per Week</h2>
          <ChartPerWeek />
        </td>
      </tr>
      <tr>
        <td>
          <h2>Monday-Friday without Deploys</h2>
          <ChartDaysWithout />
        </td>
        <td>
          <h2>Monday-Friday deploy frequency</h2>
          <ChartHistogram />
        </td>
      </tr>
    </table>);
}

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  requestDashboard: PropTypes.func.isRequired,
};
