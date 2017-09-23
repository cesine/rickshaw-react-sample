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

const deploysPerDay = function deploysPerDay({ element, perDay }) {
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
      console.log(args.range, args.endTime);
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

const daysWithoutDeploys = function daysWithoutDeploys({ element, perDay }) {
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
      console.log(args.range, args.endTime);
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

const deploysPerWeek = function deploysPerWeek({ element, perWeek }) {
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
      console.log(args.range, args.endTime);
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

const deploysPerDayHistogram = function deploysPerDayHistogram({ element, histogram }) {
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
      console.log(args.range, args.endTime);
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
  deploysByHour({
    element: document.getElementById('deploysByHour'),
    byHour: data.deploysByHour,
  });
  deploysByDayOfTheWeek({
    element: document.getElementById('deploysByDayOfTheWeek'),
    byDayOfTheWeek: data.deploysByDayOfTheWeek,
  });
  deploysPerDay({
    element: document.getElementById('deploysPerDay'),
    perDay: data.deploysPerDay,
  });
  deploysPerWeek({
    element: document.getElementById('deploysPerWeek'),
    perWeek: data.deploysPerWeek,
  });
  daysWithoutDeploys({
    element: document.getElementById('daysWithoutDeploys'),
    perDay: data.deploysPerDay,
  });
  deploysPerDayHistogram({
    element: document.getElementById('deploysPerDayHistogram'),
    histogram: data.deploysPerDayHistogram,
  });
} catch (err) {
  console.error(err);
}
