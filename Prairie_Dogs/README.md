# Prairie Dogs Details
## Theory of Operation
Arduino waits for button press, while waiting pulse button LED (PWM to NCH Mosfet)
When game starts: read Oxygen sensors and report to proecssing
Processing requests over serial updates from the sensor.
Plays a tone the maps the to the low & high of sensor.
Continue until receives game over byte & resets arduino state.


## Updating software

The software is built using platform.io. You can use Arduino IDE by copying the src folder and renaming it to Prairie_Dogs and renaming the main.cpp file to ‘Prairie_Dogs.ino’. This will allow you to use Arduino to make modifications. You will need to install any missing libraries through the Arduino Library manager.

## Project File Organization

	docs : documentation and pictures
	src : source code
	eagle : pcb files
	examples_tests : N/A
	processing: location of computer app
	processing/data: assets used for the processing app
	readme.md : basic project info its the file you are reading
	resources: Prairie Dogs BOM.xls (does not exist yet)
	some other directories are used by platformio and vscode

#### Hardware

**Phoenix connectors:**

2-pin: (4 qty)

	1. Fan Control
	2. Spare PWM Mostfet
	3. Calibration button
	
3-pin: (3 qty)

	 1. 12v In
	
4-pin: (2 qty)

	1. Serial 1 Output (wav trigger)
	2. Oxy Sensor Input
	
5-pin: (1 qty)

	1. Happ Start button & PWM Light

Various Components:

	2 mosfets (SI7460DP-T1-GE3)
	2 10K SMS Resistors
	32U4 - 5v itsyBitsy
	2 Happ Switch
	Oxy Sensor
	12V PSU
	5V across USB


## Audio
They are Mp3 files stored /data/sound/ and can be updated simply by following the naming scheme and replacing old files. It is recommended making a backup before replacing any files. Capitalization matters.

##### Naming scheme:

	Start of Game: gamestart.mp3
	Attractor: attractor.mp3

## Images/video

The images are saved as PNG and the video is MP4, both are stored /data/images.  by following the naming scheme and replacing old files. It is recommended making a backup before replacing any files. Capitalization matters. 


##### Naming scheme:

	Arrow Failure: redArrow.png
	Arrow Average: yellowArrow.mp3
	Arrow Success: greenArrow.mp3
	Head Failure: 3_en.png
	Head Average:  2_en.png
	Head Success:  1_en.png
	Head Failure w/glow : 3_dis.png
	Head Average w/glow :  2_dis.png
	Head Success w/glow :  1_dis.png
	Video: attractor.mp4
