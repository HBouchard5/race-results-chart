

//Read contents of CSV file
const reader = new FileReader()
let timeArray = [] //For histogram dataset
let percentileArray = [] //For plotting percentile vs. finish time

//Select file
function read(input) {
	const csv = input.files[0]
	reader.readAsText(csv)
}

//After file has loaded
reader.onload = function (e) {
	document.querySelector('.output').innerText = e.target.result;
  const csvData = e.target.result;
  const parsedData = Papa.parse(csvData, { header: true });
  const data = parsedData.data;

  //Prints data to console: Array with runner data in key-value pairs
  //console.log(data);

  //loop through data array
  let dataLen = data.length

  for (let i = 0; i < (dataLen-1); i++) {
    let finishTimePair = []
    let percentilePair = []

    finishPlace = data[i].finish_place

    runnerTime = data[i].time
    splitTime = runnerTime.split(":")
    let hours = parseInt(splitTime[0])
    let min = parseInt(splitTime[1])
    let sec = parseInt(splitTime[2])
    
    let finishTime = Date.UTC(1970, 0, 1, hours, min, sec)
    
    finishTimePair.push(finishTime)
    finishTimePair.push(finishTime)
    timeArray.push(finishTimePair)

    percentilePair.push(finishTime)
    percentilePair.push(finishPlace/172*100)
    percentileArray.push(percentilePair)
    
  }

  Highcharts.chart('container3', {
    title: {
        text: 'Highcharts Race Data Histogram'
    },
    xAxis: [{
        title: { text: 'Time' },
        alignTicks: false,
        type: 'datetime',
        opposite: true,
    }, {
        title: { text: 'Histogram' },
        type: 'datetime',
        dateTimeLabelFormats: {
          second: '%M:%S',
          minute: '%M:%S',
          hour: '%M:%S',
          day: '%M:%S',
          week: '%M:%S',
          month: '%M:%S',
          year: '%M:%S'
        },
        alignTicks: false,
        opposite: false,
        tickInterval: 2*60*1000
    }],
    tooltip: {
      xDateFormat: '%H:%M:%S'
    },
    yAxis: [{
      title: { 
        text: 'Finish Time' 
      },
      type: 'datetime'
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
      binsNumber: 30,
      pointInterval: 2*60*1000, // two minute intervals
      pointStart: 16*60*1000, // start at 16 min
      pointPlacement: 'between',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 's1',
      zIndex: -1,
      tooltip: {
        xDateFormat: '%H:%M:%S'
      }
    }, {
      name: 'Data',
      type: 'scatter',
      data: timeArray,
      id: 's1',
      marker: {
        radius: 1
      }
    }]
  });

  Highcharts.chart('container4', {
    title: {
        text: 'Highcharts Race Data Percentiles'
    },
    xAxis: [{
        title: { text: 'Finish Time' },
        type: 'datetime',
        dateTimeLabelFormats: {
          second: '%M:%S',
          minute: '%M:%S',
          hour: '%M:%S',
          day: '%M:%S',
          week: '%M:%S',
          month: '%M:%S',
          year: '%M:%S'
        },
        alignTicks: false,
        tickInterval: 2*60*1000
    }],

    tooltip: {
      xDateFormat: '%H:%M:%S'
    },

    yAxis: [{
      title: { 
        text: 'Finisher Percentile' 
      },
    }],

    series: [{
      name: 'Data',
      type: 'scatter',
      data: percentileArray,
      marker: {
        radius: 1
      }
    }]
  });

}


