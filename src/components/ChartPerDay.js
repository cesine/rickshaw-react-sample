import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { deploysPerDay } from '../lib/charts';

class ChartPerDay extends Component {
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
    this.graph = deploysPerDay({ element: this.node, perDay: this.props.perDay });
  }

  render() {
    return (
      <svg
        ref={(node) => {
          console.log('setting the node on the svg', node);
          this.node = node;
        }}
        width={500}
        height={500}
      />
    );
  }
}
export default ChartPerDay;

ChartPerDay.propTypes = {
  perDay: PropTypes.arrayOf(PropTypes.shape({
    year: PropTypes.number,
    week: PropTypes.number,
    day: PropTypes.number,
  })).isRequired,
};
