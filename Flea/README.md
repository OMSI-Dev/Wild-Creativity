# Flea Electronics Details
## Theory of Operation
Basic gameplay is three targets that are activated by IR sensors. The IR sensor detects when a ball is passing through the hole and triggers a sound effect and a lighting effect. After all three targets are hit within the games time limit a win sequence is activated and a win sound triggers. The game goes dark for five seconds and begins the attractor sequence. 

## Updating software

The software is built using platform.io. You can use Arduino IDE by copying the src folder and renaming it to Helmet and renaming the main.cpp file to ‘Helmet.ino’. This will allow you to use Arduino to make modifications. You will need to install any missing libraries through the Arduino Library manager.

## Project File Organization

	docs : documentation and pictures
	src : source code
	eagle : pcb files
	examples_tests : N/A
	readme.md : basic project info its the file you are reading
	resources:Flea BOM.xls
	
	some other directories are used by platformio and vscode

#### Hardware

**Phoenix connectors:**

2-pin: (4 qty)

	
3-pin: (3 qty)

	
4-pin: (2 qty)

	
6-pin: (1 qty)



Various Components:

    1.WS2811 daisychain lights
    2.5V PSU
    3.IR sensors


## Audio
A WAV trigger is used and controlled via serial communication. Audio files are saved as 16-bit WAV files on the installed SD card.

The audio uses a naming convention of 001_Win.WAV