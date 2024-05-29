# Kites Electronics Details
### Theory of Operation
The basic operation of kites is a processing sketch and a uController controlling two blower fans and reading a veneer force sensor. The uController has a start and stop button connected to control the gameplay game state. 

When the start button is pressed it sends a signal to processing to activate the data output screen. This then pulls down the signal to start the fans connected to the relay-controlled powerstrip. The uController reads the incoming sensor data and sends it over serial signal packets with an LF to end the packet. Processing takes the data and maps it to a -35 to 35 value that determines the position of the dial gauge's rotation on the screen. This data also updates the battery charging levels relative to the gauge. After the game timeout, it outputs a results screen that translates the gauge to the number of minutes to charge a battery. 

The processing app handles the game timing once it gets the signal from the uController to start the game. It will also cut the game off sooner if the stop button is pushed during gameplay. When it receives the signal to start it does a countdown to start the game while the fans spin up. The game plays for the duration of the timer while updating the visual feedback elements. After the timer finishes the game shows results and then sends a signal to the uController to reset and turn off the fans. It then switches back to the attractor video. 

### Updating software

The software is built using platform.io. You can use Arduino IDE by copying the src folder and renaming it to Kites and renaming the main.cpp file to ‘Helmet.ino’. This will allow you to use Arduino to make modifications. You will need to install any missing libraries through the Arduino Library manager.

### Project File Organization

docs : documentation and pictures 
src : source code 
eagle : pcb files 
examples_tests : N/A 
processing: location of computer app
 processing/data: assets used for the processing app 
readme.md : basic project info its the file you are reading 
resources:Kites BOM.xls 
some other directories are used by platformio and vscode

Hardware

Phoenix connectors:

3-pin: (1 qty) 

    1. 12V IN
    
4-pin: (2 qty) 

    1. Fan Power

 8-pin: (1 qty) 

    1. Start Light
    2. Stop Light
    3. Start Btn
    4. Stop Btn

Various components

    2 mosfets (SMD 7460AAW44K) 
    2 10K SMS Resistors
    32U4 - 5v itsyBitsy
    Vernier Sensor
    12V PSU 
    5V across USB
    
### Audio

They are Mp3 files stored /data/sound/ and can be updated simply by following the naming scheme and replacing old files. It is recommended to make a backup before replacing any files. Capitalization matters.

##### Naming scheme:

    Failure: red.mp3 
    Average: orange.mp3 
    Success: green.mp3
    Countdown: countdown.mp3
    Countdown Start: countdownStart.mp3

### Images/video
The images are saved as PNG and the video is MP4, both are stored /data/images. by following the naming scheme and replacing old files. It is recommended to make a backup before replacing any files. Capitalization matters.

##### Naming scheme:

    Battery Red: battR.png 
    Battery Yellow: battY.png 
    Battery Green: battG.png
    Phone Red: rPhone.png 
    Phone Yellow: yPhone.png 
    Phone Green: gPhone.png
    Results Phone: results.png 
    Gauge Red: rGauge.png
    Gauge Yellow: yGauge.png
    Gauge Green: gGauge.png
    Game Timer: activeTimer.png
    Count in Timer: countdownTimer.png
    Gauge Dial: dail.png
    results splash: splash.png
    Video: attractor.mp4

