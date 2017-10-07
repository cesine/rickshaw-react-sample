import PropTypes from 'prop-types';

import { deploysPerWeek } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartPerWeek extends ResizableChart {
  createChart() {
    this.graph = deploysPerWeek({
      element: this.node,
      height: this.getHeight(),
      width: this.getWidth(),
      perWeek: this.props.perWeek,
      onDragZoom: this.props.onDragZoom,
    });
  }
}
export default ChartPerWeek;

ChartPerWeek.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  onDragZoom: PropTypes.func.isRequired,
  perWeek: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    weekday: PropTypes.number,
    week: PropTypes.number,
    year: PropTypes.number,
    deploys: PropTypes.arrayOf(PropTypes.shape({})),
    day: PropTypes.string,
    yearWeekDay: PropTypes.string,
  })).isRequired,
};
