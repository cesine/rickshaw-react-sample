const data = require('./index');
const Rickshaw = require('rickshaw');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const deploysByHour = new Rickshaw.Graph({
  element: document.getElementById('deploysByHour'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#ff9030',
      name: 'Count',
      data: data.deploysByHour.map(function(item) {
        return {
          y: item.count,
          x: item.hour,
          data: item,
          r: item.count,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysByHour,
  xFormatter: function(x) {
    return x + ':00';
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysByHour.render();

const deploysByDayOfTheWeek = new Rickshaw.Graph({
  element: document.getElementById('deploysByDayOfTheWeek'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#4040ff',
      name: 'Count',
      data: data.deploysByDayOfTheWeek.map(function(item) {
        return {
          y: item.count,
          x: item.weekday,
          data: item,
          r: item.count,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysByDayOfTheWeek,
  xFormatter: function(x) {
    return days[x];
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysByDayOfTheWeek.render();


let x = 0;
const deploysPerDay = new Rickshaw.Graph({
  element: document.getElementById('deploysPerDay'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#ff9030',
      name: 'Count',
      data: data.deploysPerDay.map(function(item) {
        const day = item.yearWeekDay.split('d')[1];
        item.day = days[day];
        return {
          y: item.count,
          x: x++,
          data: item,
          r: item.count,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysPerDay,
  xFormatter: function(x) {
    return data.deploysPerDay[x].year + ' Week: ' + data.deploysPerDay[x].week + ', ' + data.deploysPerDay[x].day;
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysPerDay.render();

x = 0;
const daysWithoutDeploys = new Rickshaw.Graph({
  element: document.getElementById('daysWithoutDeploys'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#ff4040',
      name: 'Count',
      data: data.deploysPerDay.map(function(item) {
        const day = item.yearWeekDay.split('d')[1];
        item.day = days[day];
        return {
          y: item.count ? 0 : 1,
          x: x++,
          data: item,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.HoverDetail({
  graph: daysWithoutDeploys,
  xFormatter: function(x) {
    return data.deploysPerDay[x].year + ' Week: ' + data.deploysPerDay[x].week + ', ' + data.deploysPerDay[x].day;
  },
  yFormatter: function(y) {
    return '0';
  },
});
daysWithoutDeploys.render();

x = 0;
const deploysPerWeek = new Rickshaw.Graph({
  element: document.getElementById('deploysPerWeek'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#4040ff',
      name: 'Count',
      data: data.deploysPerWeek.map(function(item) {
        return {
          y: item.count,
          x: x++,
          data: item,
          r: item.count,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysPerWeek,
  xFormatter: function(x) {
    return data.deploysPerWeek[x].year + ' Week: ' + data.deploysPerWeek[x].week;
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysPerWeek.render();
