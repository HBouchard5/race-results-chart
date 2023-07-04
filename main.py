
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

#create empty list to hold all racers
racer_list = []

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
  
  if len(cells) > 0:
    data = {} #dictionary for racer details
    data["finish_place"] = cells[0].get_text()
    data["finish_time"] = cells[2].get_text()
    data["bib"] = cells[4].get_text()
    data["runner_name"] = cells[6].get_text()

    #add racer details (dictionary) to racer_list (array)
    racer_list.append(data)  
  else:
    print("header row")
      
pprint(racer_list) 


"""
#save in JSON format
with open("FalmouthMemorialLibrary", "w") as jsonfile:
  json.dump(event_list, jsonfile)

#save in CSV format
myFile = open('FalmouthMemorialLib.csv', 'w')
writer = csv.writer(myFile)
writer.writerow(['event_name', 'event_date', 'year', 'event_time', 'event_place', 'event_location', 'event_link'])
for dictionary in event_list:
    writer.writerow(dictionary.values())
myFile.close()
"""

#read CSV file
'''
myFile = open('FalmouthMemorialLib.csv', 'r')
print("The content of the csv file is:")
print(myFile.read())
myFile.close()
'''

