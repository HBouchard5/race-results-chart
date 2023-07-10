

//Read contents of CSV file
const reader = new FileReader()
let timeArray = []
/*
[
  Date.UTC(2022, 0, 1, 0, 28, 36),
  Date.UTC(2022, 0, 1, 0, 29, 21),
  Date.UTC(2022, 0, 1, 0, 30, 15),
  Date.UTC(2022, 0, 1, 0, 31, 55),
  Date.UTC(2022, 0, 1, 0, 32, 24)
]
console.log(timeArray)
*/

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
  //let timeArray = []
  for (let i = 0; i < (dataLen-1); i++) {
    runnerTime = data[i].time
    
    splitTime = runnerTime.split(":")
    let hours = parseInt(splitTime[0])
    let min = parseInt(splitTime[1])
    let sec = parseInt(splitTime[2])
    
    let timeData = Date.UTC(1970, 0, 1, hours, min, sec)
    console.log(timeData)
    console.log(typeof(timeData))

    timeArray.push(timeData)
    
  }
  console.log(timeArray)

  Highcharts.chart('container3', {
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
      data: timeArray

      /*
      data: [
        [Date.UTC(2022, 0, 1, 11, 0, 0)],
        [Date.UTC(2022, 0, 1, 11, 0, 0)],
        [Date.UTC(2022, 0, 1, 12, 0, 0)],
        [Date.UTC(2022, 0, 1, 13, 0, 0)],
        [Date.UTC(2022, 0, 1, 14, 0, 0)]
      ]
      */
      
    }]
  });

  

}


