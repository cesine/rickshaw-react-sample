import React from 'react';
import PropTypes from 'prop-types';
import ChartByDayOfTheWeek from '../../components/ChartByDayOfTheWeek';
import ChartByHour from '../../components/ChartByHour';
import ChartDaysWithout from '../../components/ChartDaysWithout';
import ChartHistogram from '../../components/ChartHistogram';
import ChartPerDay from '../../components/ChartPerDay';
import ChartPerWeek from '../../components/ChartPerWeek';
import './Dashboard.css';

export default function Dashboard(props) {
  const {
    match: {
      params,
    },
    history,
    deploysByHour,
    deploysPerDay,
    deploysPerWeek,
    deploysByDayOfTheWeek,
    deploysPerDayHistogram,
  } = props;

  function onDragZoom({ start, end }) {
    console.log('onDragZoom', start, end);
    history.push(`/start/${start.year}/${start.week}/${start.weekday}/end/${end.year}/${end.week}/${end.weekday}`);
    props.filterByStartAndEnd({ start, end });
  }

  const style = {
    // eslint-disable-next-line no-undef
    height: window.innerHeight,
  };

  const rows = 3;
  const columns = 2;

  return (
    <div className="dashboard" style={style} >
      <div className="row">
        <ChartByHour
          className="column"
          rowCount={rows}
          colCount={columns}
          title="Deploys by Hour"
          data={deploysByHour}
          params={params}
        />
        <ChartPerDay
          className="column"
          rowCount={rows}
          colCount={columns}
          title="Deploys per Day"
          onDragZoom={onDragZoom}
          data={deploysPerDay}
          params={params}
        />
      </div>
      <div className="row">
        <ChartByDayOfTheWeek
          className="column"
          rowCount={rows}
          colCount={columns}
          title="Deploys by Day of the Week"
          data={deploysByDayOfTheWeek}
          params={params}
        />
        <ChartPerWeek
          className="column"
          rowCount={rows}
          colCount={columns}
          title="Deploys per Week"
          onDragZoom={onDragZoom}
          data={deploysPerWeek}
          params={params}
        />
      </div>
      <div className="row">
        <ChartDaysWithout
          className="column"
          rowCount={rows}
          colCount={columns}
          title="Monday-Friday without Deploys"
          onDragZoom={onDragZoom}
          data={deploysPerDay}
          params={params}
        />
        <ChartHistogram
          className="column"
          rowCount={rows}
          colCount={columns}
          title="Monday-Friday deploy frequency"
          data={deploysPerDayHistogram}
          params={params}
        />
      </div>
    </div>);
}

Dashboard.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    parmams: PropTypes.shape({}),
  }).isRequired,
  filterByStartAndEnd: PropTypes.func.isRequired,
  deploysByHour: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerDay: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysByDayOfTheWeek: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerWeek: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deploysPerDayHistogram: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
