import PropTypes from 'prop-types';

import { deploysByDayOfTheWeek } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartByDayOfTheWeek extends ResizableChart {
  createChart() {
    this.graph = deploysByDayOfTheWeek({
      element: this.node,
      height: this.getHeight(),
      width: this.getWidth(),
      byDayOfTheWeek: this.props.byDayOfTheWeek,
    });
  }
}
export default ChartByDayOfTheWeek;

ChartByDayOfTheWeek.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  byDayOfTheWeek: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    weekday: PropTypes.number,
    week: PropTypes.number,
    year: PropTypes.number,
    deploys: PropTypes.arrayOf(PropTypes.shape({})),
    day: PropTypes.string,
    yearWeekDay: PropTypes.string,
  })).isRequired,
};
