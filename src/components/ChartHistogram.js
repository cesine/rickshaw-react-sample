import PropTypes from 'prop-types';

import { deploysPerDayHistogram } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartHistogram extends ResizableChart {
  createChart() {
    this.graph = deploysPerDayHistogram({
      element: this.node,
      height: this.getHeight(),
      width: this.getWidth(),
      data: this.props.data,
    });
  }
}
export default ChartHistogram;

ChartHistogram.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    weekday: PropTypes.number,
    week: PropTypes.number,
    year: PropTypes.number,
    deploys: PropTypes.arrayOf(PropTypes.shape({})),
    day: PropTypes.string,
    yearWeekDay: PropTypes.string,
  })).isRequired,
};
