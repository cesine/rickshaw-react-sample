import PropTypes from 'prop-types';

import { daysWithoutDeploys } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartDaysWithout extends ResizableChart {
  createChart() {
    const { height, width } = this.state || this.props;

    if (this.graph) {
      if (height) {
        this.graph.height = height;
      }
      if (width) {
        this.graph.width = width;
      }
      this.graph.render();
      return;
    }
    this.graph = daysWithoutDeploys({
      element: this.node,
      height,
      width,
      perDay: this.props.perDay,
      onDragZoom: this.props.onDragZoom,
    });
  }
}
export default ChartDaysWithout;

ChartDaysWithout.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  onDragZoom: PropTypes.func.isRequired,
  perDay: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    weekday: PropTypes.number,
    week: PropTypes.number,
    year: PropTypes.number,
    deploys: PropTypes.arrayOf(PropTypes.shape({})),
    day: PropTypes.string,
    yearWeekDay: PropTypes.string,
  })).isRequired,
};
