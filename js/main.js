

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

  //Chart options for Finish Time Histogram
  Highcharts.chart('histogram', {
    title: {
        text: 'Finish Times with Histogram'
    },
    xAxis: [{
        type: 'datetime',
        opposite: true,
        min: 15*60*1000,
        visible: false
    }, {
        title: null,
        type: 'datetime',
        //dateTimeLabelFormats: { }, 
        alignTicks: false,
        min: 15*60*1000,
    }],
    yAxis: [{
      title: { text: 'Finish Time (HH:MM)' },
      type: 'datetime',
      min: 15*60*1000,
      gridLineWidth: 0,
      opposite: true,
    }, {
      title: { text: 'Bin Count' },
    }],
    tooltip: {
      xDateFormat: '%M:%S',
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} </b></td></tr>',
      footerFormat: '</table>',
    },


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
      //pointInterval: 3*60*1000, // three minute intervals
      //pointStart: 15*60*1000, // start at 15 min
      pointPlacement: 'between',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 's1',
      zIndex: -1,
    }, {
      name: 'Finish Times',
      type: 'scatter',
      data: timeArray,
      id: 's1',
      marker: {
        radius: 1
      }
    }]
  });

  Highcharts.chart('percentile-chart', {
    title: {
        text: 'Finisher Percentiles'
    },
    xAxis: [{
        title: { text: 'Finish Time (HH:MM)' },
        type: 'datetime',
        min: 15*60*1000,
    }],
    yAxis: [{
      title: { 
        text: 'Percentile (%)' 
      },
    }],
    tooltip: {
      xDateFormat: '%H:%M:%S',
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} %</b></td></tr>',
      footerFormat: '</table>',
      valueDecimals: 0,
      //valueSuffix: '%'
    },

    series: [{
      name: 'Finishers',
      type: 'scatter',
      data: percentileArray,
      marker: {
        radius: 1
      }
    }]
  });

}


