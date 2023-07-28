
//Define variables
let reader = new FileReader()
let timesMale = []    //Finish Times series for M
let timesFemale = []    //Finish Times series for F
let percentileMale = []   //Finish Percentiles series for M
let percentileFemale = []   //Finish Percentiles series for F

//Define function to convert finish time to UTC
function convertTime(time) {
  splitTime = time.split(":")
  let hours = parseInt(splitTime[0])
  let min = parseInt(splitTime[1])
  let sec = parseInt(splitTime[2])
  return Date.UTC(1970, 0, 1, hours, min, sec)
}

//Define function to add an (x,y) data point to an array
function addDataPoint(x,y,series) {
  let dataPoint = []
  dataPoint.push(x)
  dataPoint.push(y)
  series.push(dataPoint)
}

//Define function to read CSV file
function read(input) {
	const csv = input.files[0]
	reader.readAsText(csv)
}

//Read contents of file
reader.onload = function (e) {
	document.querySelector('.output').innerText = e.target.result;
  const csvData = e.target.result;
  const parsedData = Papa.parse(csvData, { header: true });
  const runners = parsedData.data; //array of runner data after header row

  //loop to count total number of male and female runners
  let numRunnersM = 0
  let numRunnersF = 0
  let numUnknownRunners = 0
  for (let i in runners) {
    //check for gender
    if (runners[i].gender == "male") {
      numRunnersM++ //count Male runners
    } else if (runners[i].gender == "female") {
      numRunnersF++ //count Female runners
    } else {
      numUnknownRunners++  //count unknown runners
    }
  }
 
  let finishPlaceM = 0
  let finishPlaceF = 0
  for (let i in runners) {     
    timeUTC = convertTime(runners[i].time)  //get runner finish Time
    //finishPlace = runners[i].finish_place //get runner finish place
    //sort results by gender
    if (runners[i].gender == "male") {
      finishPlaceM++ 
      addDataPoint(timeUTC, timeUTC, timesMale)
      addDataPoint(timeUTC, finishPlaceM/numRunnersM*100, percentileMale)
    } else if (runners[i].gender == "female") {
      finishPlaceF++
      addDataPoint(timeUTC, timeUTC, timesFemale)
      addDataPoint(timeUTC, finishPlaceF/numRunnersF*100, percentileFemale)
    }
  }
  
  //Chart options for Finish Time Histogram
  let histChart = Highcharts.chart('histogram', {
    title: { text: 'Finish Times with Histogram' },
    xAxis: [{
        //invisible scatterplot x-axis opposite main x-axis
        type: 'datetime',
        opposite: true,
        min: 15*60*1000,
        visible: false
    }, {
        //histogram x-axis for finish time
        type: 'datetime',
        title: { text: 'Finish Time (HH:MM)' },
        min: 15*60*1000,  
    }],
    yAxis: [{
      //scatterplot y-axis for Finish Time
      type: 'datetime',
      min: 15*60*1000,
      gridLineWidth: 0,
      opposite: true,
      visible: false
    }, {
      //histogram y-axis 
      title: { text: 'Bin Count' },
    }],
    //tooltip formatting for histogram and scatterplot using HTML
    tooltip: {
      xDateFormat: '%M:%S',
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} </b></td></tr>',
      footerFormat: '</table>',
    },

    //legend options
    legend: {
      layout: 'vertical',
      align: 'right',
      floating: true,
      verticalAlign: 'middle',
      x: -100,
    },

    //accessibility options for histogram
    plotOptions: {
      histogram: {
          accessibility: {
              point: {
                  valueDescriptionFormat: '{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.'
              }
          }
      }
    },

    //definition of data series to plot - array of data series
    //Highcharts.chart.series??
    series: [{
      name: 'Histogram M',
      type: 'histogram',
      color: '#0000FF',
      opacity: 0.9,
      binsNumber: 30,
      //pointInterval: 3*60*1000, // three minute intervals
      pointPlacement: 'between',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 's1',
      zIndex: -1,
    }, {
      name: 'Finish Times M',
      type: 'scatter',
      color: '#000000',
      visible: false,
      data: timesMale,  //data array from variable
      id: 's1',
      marker: {
        radius: 1
      }
    }, {
      name: 'Histogram F',
      type: 'histogram',
      color: '#FF0000',
      opacity: 0.9,
      binsNumber: 30,
      //pointInterval: 3*60*1000, // three minute intervals
      pointPlacement: 'between',
      xAxis: 1,
      yAxis: 1,
      baseSeries: 's2',
      zIndex: -1,
    }, {
      name: 'Finish Times F',
      type: 'scatter',
      color: '#3d2254',
      visible: false,
      data: timesFemale,  //data array from variable
      id: 's2',
      marker: {
        radius: 1
      }
    }
    ]
  });

  //Chart showing finish percentile vs finish time
  let percentChart = Highcharts.chart('percentile-chart', {
    title: { text: 'Finisher Percentiles' },
    xAxis: [{
        title: { text: 'Finish Time (HH:MM)' },
        type: 'datetime',
        min: 15*60*1000,
    }],
    yAxis: [{
      title: { text: 'Percentile (%)' },
      max: 100,
    }],
    //tooltip HTML formatting for percentile scatterplot
    tooltip: {
      xDateFormat: '%H:%M:%S',
      useHTML: true,
      headerFormat: '<table><tr><th colspan="2">{point.key}</th></tr>',
      pointFormat: '<tr><td style="color: {series.color}">{series.name} </td>' +
            '<td style="text-align: right"><b>{point.y} %</b></td></tr>',
      footerFormat: '</table>',
      valueDecimals: 0
    },
    //legend options
    legend: {
      layout: 'vertical',
      align: 'right',
      floating: true,
      verticalAlign: 'middle',
      x: -50,
    },

    //definition of data series for percentile chart
    series: [{
      name: 'Male',
      type: 'scatter',
      color: '#0000FF',
      data: percentileMale,   //data array variable
      marker: {
        radius: 1
      }
    }, {
      name: 'Female',
      type: 'scatter',
      color: '#FF0000',
      data: percentileFemale,   //data array variable
      marker: {
        radius: 1
      }
    }
    ]
  })

}
