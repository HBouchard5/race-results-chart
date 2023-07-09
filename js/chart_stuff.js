
  //Highcharts demo data
  const data = [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3,
  4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4,
  3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5,
  3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9,
  2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9,
  3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6,
  3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9,
  2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7,
  3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1,
  3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3];
  
  //Highcharts demo
  Highcharts.chart('container', {
    title: {
        text: 'Highcharts Histogram'
    },
  
    xAxis: [{
        title: { text: 'Data' },
        alignTicks: false
    }, {
        title: { text: 'Histogram' },
        alignTicks: false,
        opposite: true
    }],
  
    yAxis: [{
        title: { text: 'Data' }
    }, {
        title: { text: 'Histogram' },
        opposite: true
    }],
  
    plotOptions: {
        histogram: {
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.'
                }
            }
        }
    },
  
    series: [{
        name: 'Histogram',
        type: 'histogram',
        xAxis: 1,
        yAxis: 1,
        baseSeries: 's1',
        zIndex: -1
    }, {
        name: 'Data',
        type: 'scatter',
        data: data,
        id: 's1',
        marker: {
            radius: 1.5
        }
    }]
  });
  
  Highcharts.chart('container2', {
    chart: {
      type: 'scatter'
    },
    yAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        second: '%H:%M:%S',
        minute: '%H:%M:%S',
        hour: '%H:%M:%S',
        day: '%H:%M:%S',
        week: '%H:%M:%S',
        month: '%H:%M:%S',
        year: '%H:%M:%S'
      },
      title: {
        text: 'Time'
      }
    },
    series: [{
      data: [
        [0, Date.UTC(2022, 0, 1, 11, 0, 0)],
        [1, Date.UTC(2022, 0, 1, 11, 0, 0)],
        [2, Date.UTC(2022, 0, 1, 12, 0, 0)],
        [3, Date.UTC(2022, 0, 1, 13, 0, 0)],
        [4, Date.UTC(2022, 0, 1, 14, 0, 0)]
      ]
    }]
  });
  
  /*
  //convert time in hh:mm:ss to Date()
  var timeParts = timeString.split(':');
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);
  var seconds = parseInt(timeParts[2]);
  
  // Create a new Date object
  var date = new Date(0, 0, 0, hours, minutes, seconds);
  */
  