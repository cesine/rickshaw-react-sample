import React from 'react';
import PropTypes from 'prop-types';
import ChartByDayOfTheWeek from '../../components/ChartByDayOfTheWeek';
import ChartByHour from '../../components/ChartByHour';
import ChartDaysWithout from '../../components/ChartDaysWithout';
import ChartHistogram from '../../components/ChartHistogram';
import ChartPerDay from '../../components/ChartPerDay';
import ChartPerWeek from '../../components/ChartPerWeek';
import './Dashboard.css';

export default function Dashboard({ history, deploysByHour, deploysPerDay,
  deploysPerWeek, deploysByDayOfTheWeek, deploysPerDayHistogram }) {
  function onDragZoom({ start, end }) {
    console.log('onDragZoom', start, end);
    history.push(`/start/${start.yearWeekDay}/end/${end.yearWeekDay}`);
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h2>Deploys by Hour</h2>
            <div>
              <ChartByHour byHour={deploysByHour} />
            </div>
          </td>
          <td>
            <h2>Deploys per Day</h2>
            <div>
              <ChartPerDay onDragZoom={onDragZoom} perDay={deploysPerDay} />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <h2>Deploys by Day of the Week</h2>
            <div>
              <ChartByDayOfTheWeek byDayOfTheWeek={deploysByDayOfTheWeek} />
            </div>
          </td>
          <td>
            <h2>Deploys per Week</h2>
            <div>
              <ChartPerWeek onDragZoom={onDragZoom} perWeek={deploysPerWeek} />
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <h2>Monday-Friday without Deploys</h2>
            <div>
              <ChartDaysWithout onDragZoom={onDragZoom} perDay={deploysPerDay} />
            </div>
          </td>
          <td>
            <h2>Monday-Friday deploy frequency</h2>
            <div>
              <ChartHistogram histogram={deploysPerDayHistogram} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>);
}

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  deploysByHour: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerDay: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysByDayOfTheWeek: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerWeek: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerDayHistogram: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
