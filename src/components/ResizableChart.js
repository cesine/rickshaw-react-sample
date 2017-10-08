/* globals window */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './ResizableChart.css';

const defaultState = { height: 300, width: 500 };

class ResizableChart extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    this.onResize();
    this.updateChart();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  componentDidUpdate() {
    this.updateChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize() {
    let height;
    let width;
    try {
      // https://facebook.github.io/react/docs/refs-and-the-dom.html#caveats
      // https://github.com/souporserious/react-measure/pull/41/files
      // eslint-disable-next-line react/no-find-dom-node
      this.domNode = ReactDom.findDOMNode(this);
      const titleHeights = this.domNode.children[0].offsetHeight * this.props.rowCount * 4;
      const totalRowsHeight = this.domNode.parentElement.parentElement.offsetHeight;
      height = (totalRowsHeight - titleHeights) / this.props.rowCount;
      width = this.domNode.parentElement.offsetWidth / this.props.colCount;
    } catch (notRenderedYetErr) {
      height = window.innerHeight / this.props.rowCount;
      width = window.innerWidth / this.props.colCount;
    }

    if (!width) {
      this.setState(defaultState);
      return defaultState;
    }

    // triggers render
    this.setState({
      height,
      width,
    });
    console.log('state', { height, width });
    return { height, width };
  }

  getHeight() {
    let height = this.props.height;
    if (this.state && this.state.height) {
      height = this.state.height;
    }
    return height;
  }

  getWidth() {
    let width = this.props.width;
    if (this.state && this.state.width) {
      width = this.state.width;
    }
    return width;
  }

  createChart() {
    return this.graph;
  }

  updateChart() {
    if (this.graph) {
      this.graph.configure({
        height: this.getHeight(),
        width: this.getWidth(),
      });
      this.graph.setSeries(this.graph.mapDataToSeries(this.props.data));
      this.graph.render();
      return this.graph;
    }

    return this.createChart();
  }

  render() {
    console.log('this.props', this.props);

    return (
      <div className={this.props.className} >
        <h2>{this.props.title}</h2>
        <div
          className="rickshaw_graph"
          ref={(node) => {
            this.node = node;
          }}
        />
      </div>
    );
  }
}

export default ResizableChart;

ResizableChart.defaultProps = {
  className: '',
  title: 'Chart',
  height: 0,
  width: 0,
  colCount: 1,
  rowCount: 1,
};

ResizableChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  colCount: PropTypes.number,
  rowCount: PropTypes.number,
};
