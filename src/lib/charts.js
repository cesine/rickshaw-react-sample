const data = require('./timestampsToDatePeriods');
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

new Rickshaw.Graph.DragZoom({
  graph: deploysPerDay,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
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

new Rickshaw.Graph.DragZoom({
  graph: daysWithoutDeploys,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
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

new Rickshaw.Graph.DragZoom({
  graph: deploysPerWeek,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
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

const deploysPerDayHistogram = new Rickshaw.Graph({
  element: document.getElementById('deploysPerDayHistogram'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#33F6FF',
      name: 'Freqency',
      data: data.deploysPerDayHistogram.map(function(item) {
        return {
          y: item.freq,
          x: item.count,
          data: item,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.DragZoom({
  graph: deploysPerDayHistogram,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysPerDayHistogram,
  xFormatter: function(x) {
    return x;
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysPerDayHistogram.render();

/**
*
* 2017
*/


const deploysPerDay2017 = new Rickshaw.Graph({
  element: document.getElementById('deploysPerDay2017'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#ff9030',
      name: 'Count',
      data: data.deploysPerDay2017.map(function(item) {
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

new Rickshaw.Graph.DragZoom({
  graph: deploysPerDay2017,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysPerDay2017,
  xFormatter: function(x) {
    return data.deploysPerDay2017[x].year + ' Week: ' + data.deploysPerDay2017[x].week + ', ' + data.deploysPerDay2017[x].day;
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysPerDay2017.render();


x = 0;
const deploysPerWeek2017 = new Rickshaw.Graph({
  element: document.getElementById('deploysPerWeek2017'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#4040ff',
      name: 'Count',
      data: data.deploysPerWeek2017.map(function(item) {
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

new Rickshaw.Graph.DragZoom({
  graph: deploysPerWeek2017,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysPerWeek2017,
  xFormatter: function(x) {
    return data.deploysPerWeek2017[x].year + ' Week: ' + data.deploysPerWeek2017[x].week;
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysPerWeek2017.render();


x = 0;
const daysWithoutDeploys2017 = new Rickshaw.Graph({
  element: document.getElementById('daysWithoutDeploys2017'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#ff4040',
      name: 'Count',
      data: data.deploysPerDay2017.map(function(item) {
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

new Rickshaw.Graph.DragZoom({
  graph: daysWithoutDeploys2017,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
});

new Rickshaw.Graph.HoverDetail({
  graph: daysWithoutDeploys2017,
  xFormatter: function(x) {
    return data.deploysPerDay2017[x].year + ' Week: ' + data.deploysPerDay2017[x].week + ', ' + data.deploysPerDay2017[x].day;
  },
  yFormatter: function(y) {
    return '0';
  },
});
daysWithoutDeploys2017.render();


const deploysPerDayHistogram2017 = new Rickshaw.Graph({
  element: document.getElementById('deploysPerDayHistogram2017'),
  width: 960,
  height: 400,
  renderer: 'bar',
  series: [
    {
      color: '#33F6FF',
      name: 'Freqency',
      data: data.deploysPerDayHistogram2017.map(function(item) {
        return {
          y: item.freq,
          x: item.count,
          data: item,
        }
      }),
      opacity: 0.5
    }
  ]
});

new Rickshaw.Graph.DragZoom({
  graph: deploysPerDayHistogram2017,
  opacity: 0.5,
  fill: 'steelblue',
  minimumTimeSelection: 15,
  callback: function(args) {
    console.log(args.range, args.endTime);
  }
});

new Rickshaw.Graph.HoverDetail({
  graph: deploysPerDayHistogram2017,
  xFormatter: function(x) {
    return x;
  },
  yFormatter: function(y) {
    return y;
  },
});
deploysPerDayHistogram2017.render();
