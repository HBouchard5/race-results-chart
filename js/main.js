
//Define variables
let reader = new FileReader()
//let timeArray = [] //For histogram dataset
//let percentileArray = [] //For plotting percentile vs. finish time

let timesMale = []
let timesFemale = []
let percentileMale = []
let percentileFemale = []

//Define function to convert finish time to UTC
function convertTime(time) {
  splitTime = time.split(":")
  let hours = parseInt(splitTime[0])
  let min = parseInt(splitTime[1])
  let sec = parseInt(splitTime[2])
  return Date.UTC(1970, 0, 1, hours, min, sec)
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

  //loop through runner array
  let numRunnersM = 0
  let numRunnersF = 0

  for (let i in runners) {
    console.log(runners[i].gender)
    
    //define some variables
    let finishTimePair = []
    let percentilePair = []

    //get runner finish place
    console.log(runners[i].finish_place)
    finishPlace = runners[i].finish_place

    //convert finish time to UTC
    runnerTime = runners[i].time
    let timeUTC = convertTime(runnerTime)
    //save finish time twice for (x,y) scatterplot
    finishTimePair.push(timeUTC)
    finishTimePair.push(timeUTC)

    //Calculate percentile and save (finish time, percentile)
    percentilePair.push(timeUTC)
    percentilePair.push(finishPlace/178*100) //this formula should use variables

    //sort by gender
    if (runners[i].gender == "male") {
      numRunnersM = numRunnersM++ //count Male runners  
      timesMale.push(finishTimePair)
      percentileMale.push(percentilePair)

    } else if (runners[i].gender == "female") {
      numRunnersF = numRunnersF++ //count Female runners
      timesFemale.push(finishTimePair)
      percentileFemale.push(percentilePair)
    }
  }

  console.log(timesMale)
  console.log(timesFemale)
  console.log(percentileMale)
  console.log(percentileFemale)
  
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
        min: 15*60*1000, 
        alignTicks: false,   
    }],
    yAxis: [{
      //scatterplot y-axis for Finish Time
      title: { text: 'Finish Time (HH:MM)' },
      type: 'datetime',
      min: 15*60*1000,
      gridLineWidth: 0,
      opposite: true,
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
      data: timesMale,
      id: 's1',
      marker: {
        radius: 1
      }
    }]
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
    }],
    //tooltip HTML formatting for percentile scatterplot
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

    //definition of data series for percentile chart
    series: [{
      name: 'Finishers',
      type: 'scatter',
      data: percentileMale,
      marker: {
        radius: 1
      }
    }]
  });

}


