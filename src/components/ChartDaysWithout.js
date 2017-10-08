import PropTypes from 'prop-types';

import { daysWithoutDeploys } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartDaysWithout extends ResizableChart {
  createChart() {
    this.graph = daysWithoutDeploys({
      element: this.node,
      height: this.getHeight(),
      width: this.getWidth(),
      data: this.props.data,
      onDragZoom: this.props.onDragZoom,
    });
  }
}
export default ChartDaysWithout;

ChartDaysWithout.propTypes = {
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
