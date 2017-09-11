const data = require('./index');
const Rickshaw = require('rickshaw');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

var graph = new Rickshaw.Graph({
  element: document.getElementById('deploysByHour'),
  width: 960,
  height: 500,
  renderer: 'scatterplot',
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

// graph.renderer.dotSize = 6;
new Rickshaw.Graph.HoverDetail({
  graph: graph,
  xFormatter: function(x) {
    return x + ':00';
  },
  yFormatter: function(y) {
    return y;
  },
});
graph.render();
