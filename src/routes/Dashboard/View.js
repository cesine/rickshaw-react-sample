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

  const style = {
    // eslint-disable-next-line no-undef
    height: window.innerHeight,
  };
  console.log('rendering dashboard', style);

  const rows = 3;
  const columns = 2;

  return (
    <div className="dashboard" style={style} >
      <div className="row">
        <ChartByHour className="column" rowCount={rows} colCount={columns} title="Deploys by Hour" byHour={deploysByHour} />
        <ChartPerDay className="column" rowCount={rows} colCount={columns} title="Deploys per Day" onDragZoom={onDragZoom} perDay={deploysPerDay} />
      </div>
      <div className="row">
        <ChartByDayOfTheWeek className="column" rowCount={rows} colCount={columns} title="Deploys by Day of the Week" byDayOfTheWeek={deploysByDayOfTheWeek} />
        <ChartPerWeek className="column" rowCount={rows} colCount={columns} title="Deploys per Week" onDragZoom={onDragZoom} perWeek={deploysPerWeek} />
      </div>
      <div className="row">
        <ChartDaysWithout className="column" rowCount={rows} colCount={columns} title="Monday-Friday without Deploys" onDragZoom={onDragZoom} perDay={deploysPerDay} />
        <ChartHistogram className="column" rowCount={rows} colCount={columns} title="Monday-Friday deploy frequency" histogram={deploysPerDayHistogram} />
      </div>
    </div>);
}

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  deploysByHour: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerDay: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysByDayOfTheWeek: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerWeek: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerDayHistogram: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
