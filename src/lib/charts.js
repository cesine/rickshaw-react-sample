/* globals document */
const timestampsToDatePeriods = require('./timestampsToDatePeriods');
const Rickshaw = require('rickshaw');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

let defaultWidth = 960;

try {
  // eslint-disable-next-line no-undef
  defaultWidth = window.innerWidth / 2;
} catch (err) {
  console.log('defaultWidth', defaultWidth);
}

const deploysByHour = function deploysByHour({ element, hoverElement, height, width, data }) {
  function mapDataToSeries(dataArray) {
    this.data = dataArray;
    return [{
      color: '#ff9030',
      name: 'Count',
      data: dataArray.map(item => ({
        y: item.count,
        x: item.hour,
        data: item,
        r: item.count,
      })),
      opacity: 0.5,
    }];
  }

  const graph = new Rickshaw.Graph({
    element,
    width: width || element.offsetHeight || defaultWidth,
    height: height || 400,
    renderer: 'bar',
    series: mapDataToSeries(data),
  });
  graph.data = data;
  graph.mapDataToSeries = mapDataToSeries;

  new Rickshaw.Graph.HoverDetail({
    element: hoverElement,
    graph,
    xFormatter(x) {
      return `${x}:00`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const deploysByDayOfTheWeek = function deploysByDayOfTheWeek({
  element, hoverElement, height, width, data }) {
  function mapDataToSeries(dataArray) {
    this.data = dataArray;
    return [{
      color: '#4040ff',
      name: 'Count',
      data: dataArray.map(item => ({
        y: item.count,
        x: item.weekday,
        data: item,
        r: item.count,
      })),
      opacity: 0.5,
    }];
  }

  const graph = new Rickshaw.Graph({
    element,
    width: width || element.offsetHeight || defaultWidth,
    height: height || 400,
    renderer: 'bar',
    series: mapDataToSeries(data),
  });
  graph.data = data;
  graph.mapDataToSeries = mapDataToSeries;

  new Rickshaw.Graph.HoverDetail({
    element: hoverElement,
    graph,
    xFormatter(x) {
      return days[x];
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const deploysPerDay = function deploysPerDay({
  element, hoverElement, height, width, onDragZoom, data }) {
  let xx = 0;
  function mapDataToSeries(dataArray) {
    this.data = dataArray;
    return [{
      color: '#ff9030',
      name: 'Count',
      data: dataArray.map((item) => {
        const day = item.yearWeekDay.split('d')[1];
        // eslint-disable-next-line no-param-reassign
        item.day = days[day];
        return {
          y: item.count,
          x: xx++,
          data: item,
          r: item.count,
        };
      }),
      opacity: 0.5,
    }];
  }

  const graph = new Rickshaw.Graph({
    element,
    width: width || element.offsetHeight || defaultWidth,
    height: height || 400,
    renderer: 'bar',
    series: mapDataToSeries(data),
  });
  graph.data = data;
  graph.mapDataToSeries = mapDataToSeries;

  new Rickshaw.Graph.DragZoom({
    graph,
    opacity: 0.5,
    fill: 'steelblue',
    minimumTimeSelection: 15,
    callback(args) {
      const start = this.graph.series[0].data[args.endTime - args.range].data;
      const end = this.graph.series[0].data[args.endTime].data;
      onDragZoom({
        start,
        end,
      });
    },
  });

  new Rickshaw.Graph.HoverDetail({
    element: hoverElement,
    graph,
    xFormatter(x) {
      if (!graph.data[x]) {
        return x;
      }
      return `${graph.data[x].year} Week: ${graph.data[x].week}, ${graph.data[x].day}`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const daysWithoutDeploys = function daysWithoutDeploys({
  element, hoverElement, height, width, onDragZoom, data }) {
  let xx = 0;

  function mapDataToSeries(dataArray) {
    this.data = dataArray;
    return [{
      color: '#ff4040',
      name: 'Count',
      data: dataArray.map((item) => {
        const day = item.yearWeekDay.split('d')[1];
        // eslint-disable-next-line no-param-reassign
        item.day = days[day];
        return {
          y: item.count ? 0 : 1,
          x: xx++,
          data: item,
        };
      }),
      opacity: 0.5,
    }];
  }
  const graph = new Rickshaw.Graph({
    element,
    width: width || element.offsetHeight || defaultWidth,
    height: height || 400,
    renderer: 'bar',
    series: mapDataToSeries(data),
  });
  graph.data = data;
  graph.mapDataToSeries = mapDataToSeries;

  new Rickshaw.Graph.DragZoom({
    graph,
    opacity: 0.5,
    fill: 'steelblue',
    minimumTimeSelection: 15,
    callback(args) {
      const start = this.graph.series[0].data[args.endTime - args.range].data;
      const end = this.graph.series[0].data[args.endTime].data;
      onDragZoom({
        start,
        end,
      });
    },
  });

  new Rickshaw.Graph.HoverDetail({
    element: hoverElement,
    graph,
    xFormatter(x) {
      if (!graph.data[x]) {
        return x;
      }
      return `${graph.data[x].year} Week: ${graph.data[x].week}, ${graph.data[x].day}`;
    },
    yFormatter() {
      return '0';
    },
  });
  graph.render();
  return graph;
};

const deploysPerWeek = function deploysPerWeek({
  element, hoverElement, height, width, onDragZoom, data }) {
  let xx = 0;
  function mapDataToSeries(dataArray) {
    this.data = dataArray;
    return [{
      color: '#4040ff',
      name: 'Count',
      data: dataArray.map(item => ({
        y: item.count,
        x: xx++,
        data: item,
        r: item.count,
      })),
      opacity: 0.5,
    }];
  }
  const graph = new Rickshaw.Graph({
    element,
    width: width || element.offsetHeight || defaultWidth,
    height: height || 400,
    renderer: 'bar',
    series: mapDataToSeries(data),
  });
  graph.data = data;
  graph.mapDataToSeries = mapDataToSeries;

  new Rickshaw.Graph.DragZoom({
    graph,
    opacity: 0.5,
    fill: 'steelblue',
    minimumTimeSelection: 15,
    callback(args) {
      const start = this.graph.series[0].data[args.endTime - args.range].data;
      const end = this.graph.series[0].data[args.endTime].data;
      onDragZoom({
        start,
        end,
      });
    },
  });

  new Rickshaw.Graph.HoverDetail({
    element: hoverElement,
    graph,
    xFormatter(x) {
      if (!graph.data[x]) {
        return x;
      }
      return `${graph.data[x].year} Week: ${graph.data[x].week}`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const deploysPerDayHistogram = function deploysPerDayHistogram({
  element, hoverElement, height, width, onDragZoom, data }) {
  function mapDataToSeries(dataArray) {
    this.data = dataArray;
    return [{
      color: '#33F6FF',
      name: 'Freqency',
      data: dataArray.map(item => ({
        y: item.freq,
        x: item.count,
        data: item,
      })),
      opacity: 0.5,
    }];
  }
  const graph = new Rickshaw.Graph({
    element,
    width: width || element.offsetHeight || defaultWidth,
    height: height || 400,
    renderer: 'bar',
    series: mapDataToSeries(data),
  });
  graph.data = data;
  graph.mapDataToSeries = mapDataToSeries;

  new Rickshaw.Graph.DragZoom({
    graph,
    opacity: 0.5,
    fill: 'steelblue',
    minimumTimeSelection: 15,
    callback(args) {
      const start = this.graph.series[0].data[args.endTime - args.range].data;
      const end = this.graph.series[0].data[args.endTime].data;
      onDragZoom({
        start,
        end,
      });
    },
  });

  new Rickshaw.Graph.HoverDetail({
    element: hoverElement,
    graph,
    xFormatter(x) {
      return x;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

module.exports = {
  days,
  deploysByHour,
  deploysByDayOfTheWeek,
  deploysPerDay,
  deploysPerWeek,
  daysWithoutDeploys,
  deploysPerDayHistogram,
};

try {
  const onDragZoom = function onDragZoom() { };
  deploysByHour({
    element: document.getElementById('deploysByHour'),
    data: timestampsToDatePeriods.deploysByHour,
    onDragZoom,
  });
  deploysByDayOfTheWeek({
    element: document.getElementById('deploysByDayOfTheWeek'),
    data: timestampsToDatePeriods.deploysByDayOfTheWeek,
    onDragZoom,
  });
  deploysPerDay({
    element: document.getElementById('deploysPerDay'),
    data: timestampsToDatePeriods.deploysPerDay,
    onDragZoom,
  });
  deploysPerWeek({
    element: document.getElementById('deploysPerWeek'),
    data: timestampsToDatePeriods.deploysPerWeek,
    onDragZoom,
  });
  daysWithoutDeploys({
    element: document.getElementById('daysWithoutDeploys'),
    data: timestampsToDatePeriods.deploysPerDay,
    onDragZoom,
  });
  deploysPerDayHistogram({
    element: document.getElementById('deploysPerDayHistogram'),
    data: timestampsToDatePeriods.deploysPerDayHistogram,
    onDragZoom,
  });
} catch (err) {
  // console.error(err); // eslint-disable-line no-console
}
