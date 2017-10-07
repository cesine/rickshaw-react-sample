import PropTypes from 'prop-types';

import { deploysByHour } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartByHour extends ResizableChart {
  createChart() {
    this.graph = deploysByHour({
      element: this.node,
      height: this.getHeight(),
      width: this.getWidth(),
      byHour: this.props.byHour,
    });
  }
}
export default ChartByHour;

ChartByHour.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  byHour: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    weekday: PropTypes.number,
    week: PropTypes.number,
    year: PropTypes.number,
    deploys: PropTypes.arrayOf(PropTypes.shape({})),
    day: PropTypes.string,
    yearWeekDay: PropTypes.string,
  })).isRequired,
};
