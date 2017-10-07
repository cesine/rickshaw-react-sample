/* globals window */
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './ResizableChart.css';

const defaultState = { height: 300, width: 500 };

class ResizableChart extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.createChart = this.createChart.bind(this);
  }
  componentDidMount() {
    this.onResize();
    this.createChart();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  componentDidUpdate() {
    this.createChart();
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
      const domNode = ReactDom.findDOMNode(this);
      height = domNode.parentElement.offsetHeight;
      width = domNode.parentElement.offsetWidth;
    } catch (notRenderedYetErr) {
      height = window.innerHeight - 80;
      width = window.innerWidth - 80;
    }

    if (!width) {
      this.setState(defaultState);
      return defaultState;
    }

    // trigger render
    this.setState({
      height,
      width,
    });
    console.log('state', height, width);
    return { height, width };
  }

  createChart() {
    console.log('override this method ', this.graph);
  }

  render() {
    let height = this.props.height;
    let width = this.props.width;

    if (this.state && this.state.height) {
      height = this.state.height;
    }
    if (this.state && this.state.width) {
      width = this.state.width;
    }

    return (
      <div className={this.props.className} >
        <h2>{this.props.title}</h2>
        <svg
          ref={(node) => {
            this.node = node;
          }}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

export default ResizableChart;

ResizableChart.defaultProps = {
  className: '',
  title: 'Chart',
  height: 200,
  width: 600,
};

ResizableChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};
