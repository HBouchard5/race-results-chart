
import json
import csv
import requests
import re #regex module
from bs4 import BeautifulSoup
from pprint import pprint

#Source of data
event = "Back Cove 5k Series"
location = "Portland, ME"
source_URL = "https://backcove.runtowin.com/index.php"

#create empty lists for racer data and table headers
racer_list = []
header = []

#save all HTML from URL into variable "r"
r = requests.get(source_URL)
r.raise_for_status() #ensures access to the webpage data
html = r.text.encode('utf-8')
soup = BeautifulSoup(html, 'html.parser')

#scrape event name
race_series_number = soup.find("h4").get_text()

#find all racers by scraping for <tr> tag
table = soup.find("table")
rows = table.find_all("tr")

#parse through each <tr> for racer details
for row in rows:
  cells = row.find_all("td")
  
  if len(cells) > 0: #if it is not the header row
    data = {} #dictionary for racer details
    cells_clean = [] #for regex cleaned up text
    gender = '' #racer gender

    #clean text; remove leading and trailing whitespace
    for cell in cells:
      raw_text = cell.get_text()
      clean_text = re.sub(r'^\s+|\s+$', "", raw_text)
      cells_clean.append(clean_text)

      #check for <a> and <span> elements, which contain gender info
      a = cell.find("a")
      if a:
        span = a.find("span")
        if "female" in span["class"]:
          gender = "female"
        else:
          gender = "male"

    #pull racer data from cleaned up cell text
    data["finish_place"] = cells_clean[0]
    data["finish_time"] = cells_clean[2]
    data["bib"] = cells_clean[4]
    data["runner_name"] = cells_clean[6]
    data["gender"] = gender

    #add racer details (dictionary) to racer_list (array)
    racer_list.append(data)  

  #special case for header row
  else: 
    header_cells = row.find_all("th")
    #clean header text with regex and save in a header array
    for cell in header_cells:
      header_text_raw = cell.get_text()
      header_clean = re.sub(r'^\s+|\s+$', "", header_text_raw)
      header.append(header_clean)
      
#save to file in JSON format with pretty print indentation
with open("BackCoveResults", "w") as jsonfile:
  json.dump(racer_list, jsonfile, indent=4)


#save to file in CSV format
myFile = open('BackCove5k.csv', 'w', newline='')
writer = csv.writer(myFile)
writer.writerow(['finish_place', 'time', 'bib', 'runner_name', 'gender'])
for racer in racer_list:
    writer.writerow(racer.values())
myFile.close()


#read CSV file
myFile = open('BackCove5k.csv', 'r')
print("The content of the csv file is:")
print(myFile.read())
myFile.close()


