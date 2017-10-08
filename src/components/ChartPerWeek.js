import PropTypes from 'prop-types';

import { deploysPerWeek } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartPerWeek extends ResizableChart {
  createChart() {
    this.graph = deploysPerWeek({
      element: this.node,
      height: this.getHeight(),
      width: this.getWidth(),
      data: this.props.data,
      onDragZoom: this.props.onDragZoom,
    });
  }
}
export default ChartPerWeek;

ChartPerWeek.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  onDragZoom: PropTypes.func.isRequired,
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
