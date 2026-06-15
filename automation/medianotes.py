import os
import sys
import re
import datetime

#GET PATHS
workingdir = sys.argv[1]#"calciumsite/media/"
notespath = workingdir + "markdown/"

#CREATE OBJECT FOR LATE
filelist = {}
history = []

for file in os.listdir(notespath):
	#IF FILE IS MARKDOWN START DOING STUFF
	if(file[file.rindex(".") + 1:] == "md"):

		#GET THE ACTUAL FILE NAME
		filename = file[:file.rindex(".")]

		#OPEN THE FILE AND EXTRACT DATES WITH REGEX
		f = open(notespath + "/" + file, "r");
		dates = re.findall("(\d{4}-\d{2}-\d{2})",f.read())

		if(len(dates) > 0):
			#IF THERE ARE DATES, ADD IT TO OBJECT
			filelist[filename] = {}
			filelist[filename]["dates"] = dates;
			filelist[filename]["published"] = datetime.datetime.strptime(dates[0],"%Y-%m-%d").timestamp();
			filelist[filename]["updated"] = datetime.datetime.strptime(dates[-1],"%Y-%m-%d").timestamp();

		f.close()


checktime_current = 0;
checktime_next = -1;

while True :
	checktime_next = -1;
	for key in filelist:
		if(filelist[key]["updated"] == checktime_current):
			history.append(key);
		if(checktime_next == -1 or filelist[key]["updated"] < checktime_next):
			if(checktime_current < filelist[key]["updated"]):
				checktime_next = filelist[key]["updated"];
	if(checktime_next == -1):
		break
	checktime_current = checktime_next;
	

print(history)

output = open( notespath + "recent.md","w")

for key in reversed(history):
	output.write(filelist[key]["dates"][-1] + " [[" + key  + "]]")
	if(filelist[key]["published"] < filelist[key]["updated"]):
		output.write("  !!!UPDATE!!!\n")
	output.write("\n---\n")

output.close()