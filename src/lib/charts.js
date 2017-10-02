/* globals document */
const data = require('./timestampsToDatePeriods');
const Rickshaw = require('rickshaw');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const deploysByHour = function deploysByHour({ element, byHour }) {
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#ff9030',
        name: 'Count',
        data: byHour.map(item => ({
          y: item.count,
          x: item.hour,
          data: item,
          r: item.count,
        })),
        opacity: 0.5,
      },
    ],
  });

  new Rickshaw.Graph.HoverDetail({
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

const deploysByDayOfTheWeek = function deploysByDayOfTheWeek({ element, byDayOfTheWeek }) {
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#4040ff',
        name: 'Count',
        data: byDayOfTheWeek.map(item => ({
          y: item.count,
          x: item.weekday,
          data: item,
          r: item.count,
        })),
        opacity: 0.5,
      },
    ],
  });

  new Rickshaw.Graph.HoverDetail({
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

const deploysPerDay = function deploysPerDay({ element, onDragZoom, perDay }) {
  let xx = 0;
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#ff9030',
        name: 'Count',
        data: perDay.map((item) => {
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
      },
    ],
  });

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
    graph,
    xFormatter(x) {
      return `${perDay[x].year} Week: ${perDay[x].week}, ${perDay[x].day}`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const daysWithoutDeploys = function daysWithoutDeploys({ element, onDragZoom, perDay }) {
  let xx = 0;
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#ff4040',
        name: 'Count',
        data: perDay.map((item) => {
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
      },
    ],
  });

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
    graph,
    xFormatter(x) {
      return `${perDay[x].year} Week: ${perDay[x].week}, ${perDay[x].day}`;
    },
    yFormatter() {
      return '0';
    },
  });
  graph.render();
  return graph;
};

const deploysPerWeek = function deploysPerWeek({ element, onDragZoom, perWeek }) {
  let xx = 0;
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#4040ff',
        name: 'Count',
        data: perWeek.map(item => ({
          y: item.count,
          x: xx++,
          data: item,
          r: item.count,
        })),
        opacity: 0.5,
      },
    ],
  });

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
    graph,
    xFormatter(x) {
      return `${perWeek[x].year} Week: ${perWeek[x].week}`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const deploysPerDayHistogram = function deploysPerDayHistogram({ element, onDragZoom, histogram }) {
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#33F6FF',
        name: 'Freqency',
        data: histogram.map(item => ({
          y: item.freq,
          x: item.count,
          data: item,
        })),
        opacity: 0.5,
      },
    ],
  });

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
    byHour: data.deploysByHour,
    onDragZoom,
  });
  deploysByDayOfTheWeek({
    element: document.getElementById('deploysByDayOfTheWeek'),
    byDayOfTheWeek: data.deploysByDayOfTheWeek,
    onDragZoom,
  });
  deploysPerDay({
    element: document.getElementById('deploysPerDay'),
    perDay: data.deploysPerDay,
    onDragZoom,
  });
  deploysPerWeek({
    element: document.getElementById('deploysPerWeek'),
    perWeek: data.deploysPerWeek,
    onDragZoom,
  });
  daysWithoutDeploys({
    element: document.getElementById('daysWithoutDeploys'),
    perDay: data.deploysPerDay,
    onDragZoom,
  });
  deploysPerDayHistogram({
    element: document.getElementById('deploysPerDayHistogram'),
    histogram: data.deploysPerDayHistogram,
    onDragZoom,
  });
} catch (err) {
  // console.error(err); // eslint-disable-line no-console
}
