/* globals document */
const data = require('./timestampsToDatePeriods');
const Rickshaw = require('rickshaw');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const deploysByHour = function deploysByHour({ element }) {
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#ff9030',
        name: 'Count',
        data: data.deploysByHour.map(item => ({
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

const deploysByDayOfTheWeek = function deploysByDayOfTheWeek({ element }) {
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#4040ff',
        name: 'Count',
        data: data.deploysByDayOfTheWeek.map(item => ({
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

const deploysPerDay = function deploysPerDay({ element }) {
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
        data: data.deploysPerDay.map((item) => {
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
      return `${data.deploysPerDay[x].year} Week: ${data.deploysPerDay[x].week}, ${data.deploysPerDay[x].day}`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const daysWithoutDeploys = function daysWithoutDeploys({ element }) {
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
        data: data.deploysPerDay.map((item) => {
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
      return `${data.deploysPerDay[x].year} Week: ${data.deploysPerDay[x].week}, ${data.deploysPerDay[x].day}`;
    },
    yFormatter() {
      return '0';
    },
  });
  graph.render();
  return graph;
};

const deploysPerWeek = function deploysPerWeek({ element }) {
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
        data: data.deploysPerWeek.map(item => ({
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
      return `${data.deploysPerWeek[x].year} Week: ${data.deploysPerWeek[x].week}`;
    },
    yFormatter(y) {
      return y;
    },
  });
  graph.render();
  return graph;
};

const deploysPerDayHistogram = function deploysPerDayHistogram({ element }) {
  const graph = new Rickshaw.Graph({
    element,
    width: 960,
    height: 400,
    renderer: 'bar',
    series: [
      {
        color: '#33F6FF',
        name: 'Freqency',
        data: data.deploysPerDayHistogram.map(item => ({
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
  });
  deploysByDayOfTheWeek({
    element: document.getElementById('deploysByDayOfTheWeek'),
  });
  deploysPerDay({
    element: document.getElementById('deploysPerDay'),
  });
  deploysPerWeek({
    element: document.getElementById('deploysPerWeek'),
  });
  daysWithoutDeploys({
    element: document.getElementById('daysWithoutDeploys'),
  });
  deploysPerDayHistogram({
    element: document.getElementById('deploysPerDayHistogram'),
  });
} catch (err) {
  console.error(err);
}
