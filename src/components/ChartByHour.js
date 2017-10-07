import PropTypes from 'prop-types';

import { deploysByHour } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartByHour extends ResizableChart {
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
    this.graph = deploysByHour({
      element: this.node,
      height,
      width,
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
