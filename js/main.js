

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
  
  //Show charts in HTML by removing "hidden" class
  let histContainer = document.getElementById("histogram-container")
  histContainer.classList.remove("hidden")

  let percentileContainer = document.getElementById("percentile-container")
  percentileContainer.classList.remove("hidden")

  //Add series data to histogram chart
  histChart.addSeries({   //Scatterplot Female
    name: 'Female',
    type: 'scatter',
    color: '#FE5800',
    data: timesFemale,  //data array from variable
    id: 's2',
    marker: {
      radius: 1.5
    }
  })   
  histChart.addSeries({   //Scatterplot Male
    name: 'Male',
    type: 'scatter',
    color: '#676767',
    data: timesMale,  //data array from variable
    id: 's1',
    marker: {
      radius: 1.5
    }
  })
  histChart.addSeries({   //Histogram Female
    name: 'Histogram F',
    type: 'histogram',
    color: '#FF7300',
    opacity: 0.9,
    binsNumber: 30,
    //pointInterval: 3*60*1000, // three minute intervals
    pointPlacement: 'between',
    xAxis: 1,
    yAxis: 1,
    baseSeries: 's2',
    zIndex: -1,
  })
  histChart.addSeries({   //Histogram Male
    name: 'Histogram M',
    type: 'histogram',
    color: '#808080',
    opacity: 0.9,
    binsNumber: 30,
    //pointInterval: 3*60*1000, // three minute intervals
    pointPlacement: 'between',
    xAxis: 1,
    yAxis: 1,
    baseSeries: 's1',
    zIndex: -1,
  })
  
  //Add data series to percentile chart
  percentileChart.addSeries({
    name: 'Female',
    type: 'scatter',
    color: '#FE5800',
    data: percentileFemale,   //data array variable
    marker: {
      radius: 2
    }
  })
  percentileChart.addSeries({
    name: 'Male',
    type: 'scatter',
    color: '#676767',
    data: percentileMale,   //data array variable
    marker: {
      radius: 2
    }
  })
  

  //hide user input form after CSV file is selected
  let inputSection = document.getElementById("input-section")
  inputSection.classList.add("hidden")

  //show CSV file name
  let dataSection = document.getElementById("race-info")
  dataSection.classList.remove("hidden")

  //console.log(e.target.files[0].name)

  

}
