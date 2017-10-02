import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { deploysPerWeek } from '../lib/charts';

class ChartPerWeek extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }
  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }
  createChart() {
    if (this.graph) {
      this.graph.render();
      return;
    }
    this.graph = deploysPerWeek({
      element: this.node,
      perWeek: this.props.perWeek,
      onDragZoom: this.props.onDragZoom,
    });
  }

  render() {
    return (
      <svg
        ref={(node) => {
          this.node = node;
        }}
        width={500}
        height={500}
      />
    );
  }
}
export default ChartPerWeek;

ChartPerWeek.propTypes = {
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
