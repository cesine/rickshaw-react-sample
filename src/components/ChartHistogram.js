import PropTypes from 'prop-types';

import { deploysPerDayHistogram } from '../lib/charts';
import ResizableChart from './ResizableChart';

class ChartHistogram extends ResizableChart {
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
    this.graph = deploysPerDayHistogram({
      element: this.node,
      height,
      width,
      histogram: this.props.histogram,
    });
  }
}
export default ChartHistogram;

ChartHistogram.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  histogram: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    weekday: PropTypes.number,
    week: PropTypes.number,
    year: PropTypes.number,
    deploys: PropTypes.arrayOf(PropTypes.shape({})),
    day: PropTypes.string,
    yearWeekDay: PropTypes.string,
  })).isRequired,
};
