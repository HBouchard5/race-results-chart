

//Read contents of CSV file
const reader = new FileReader()

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
  console.log(data);
}


