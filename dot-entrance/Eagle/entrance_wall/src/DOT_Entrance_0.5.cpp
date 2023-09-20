
//    Wild Creativity - Entrance
//      code by Justin Patrizi
//      01.30.2023

//  Phase 2
//  -Light fades
//  -Button light changes
//  -Sound - variations, only trigger on falling edge
//  -Debounce

// Entrance button to light sequence
// Button 1 - Pin 7 - Protect -- Lights 1, 5, 9
// Button 2 - Pin 5 - Build -- Lights 2, 4, 12
// Button 3 - Pin 3 - Move -- Lights 3, 7, 11
// Button 4 - Pin 2 - Capture -- Lights 6, 8, 10

#include <Arduino.h>
#include "AudioOut.h"
#include <bounce2.h>
#include <MoToTimer.h>

//declare audio object
AudioOut audioOut;
bool Audio1Time = true;
bool Audio2Time = true;
bool Audio3Time = true;
bool Audio4Time = true;

#define protectButton_pin 7
#define buildButton_pin 5
#define moveButton_pin 3
#define captureButton_pin 2
//const uint8_t buttonPins[] = {7, 5, 3, 2};
const uint8_t buttonCount = 4;
const uint8_t buttonLights[] = {13, 11, 10, 9};
Bounce2:: Button protectButton = Bounce2::Button();
Bounce2:: Button buildButton = Bounce2::Button();
Bounce2:: Button moveButton = Bounce2::Button();
Bounce2:: Button captureButton = Bounce2::Button();

int lightPins[] = {A0, A1, A2, A3, A4, A5, 15, 16, 14, 8, 6, 4};
const uint8_t lightCount = 12;

int protectLights[] = {A0, A4, 14};
int buildLights[] = {A1, A3, 4};
int moveLights[] = {A2, 15, 6};
int captureLights[] = {A5, 16, 8};

const uint8_t stratLights = 3;

MoToTimer protectTimer;
MoToTimer Audio1Timer;
MoToTimer buildTimer;
MoToTimer Audio2Timer;
MoToTimer moveTimer;
MoToTimer Audio3Timer;
MoToTimer captureTimer;
MoToTimer Audio4Timer;

bool protectPrev = 0;
bool buildPrev = 0;
bool movePrev = 0;
bool capturePrev = 0;


void setup() {
  
protectButton.attach(protectButton_pin,INPUT_PULLUP);
protectButton.interval(5);
protectButton.setPressedState(HIGH);
buildButton.attach(buildButton_pin,INPUT_PULLUP);
buildButton.interval(5);
buildButton.setPressedState(HIGH);
moveButton.attach(moveButton_pin,INPUT_PULLUP);
moveButton.interval(5);
moveButton.setPressedState(HIGH);
captureButton.attach(captureButton_pin,INPUT_PULLUP);
captureButton.interval(5);
captureButton.setPressedState(HIGH);

  //instantiate button lights
  for (int i = 0; i < buttonCount; i++) {
    pinMode(buttonLights[i], OUTPUT);
  }

  //instantiate lights
  for (int thisLight = 0; thisLight < lightCount; thisLight++) {
    pinMode(lightPins[thisLight], OUTPUT);
  }

  // Light order test
  for (int i = 0; i < lightCount; i++) {
    digitalWrite(lightPins[i], HIGH);
    delay(200);
    digitalWrite(lightPins[i], LOW);
  }

  //[TEMP] - Turn on button lights - turn into Pulse
  for (int i = 0; i < buttonCount; i++) {
    digitalWrite(buttonLights[i], HIGH);
  }

  //start the wavtrigger
  audioOut.begin();

  Serial.begin(9600);
} //void setup

void protectPush() {
  protectButton.update();
 
//Checks to see if button pressed
//if pressed turn lights on
//and start timer
if(protectButton.pressed())
{  
  Serial.println("ProtCC pressed");
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(protectLights[i], HIGH);
     Serial.println("ProtCC high");
    protectTimer.setTime(1100);
  }

  if(Audio1Time)
  {
    audioOut.playTrack(1);
    Audio1Time = false;
    Audio1Timer.setTime(100);
  }
}

if(!Audio1Timer.running()&& !Audio1Time)
{
  Audio1Time = !Audio1Time;
}
//Checks to see if timer is running
//if it is not running
//turn off lights associated with protect button
if(!protectTimer.running())
{
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(protectLights[i], LOW);
  }
}
}

void buildPush() {
  buildButton.update();
//Checks to see if button pressed
//if pressed turn lights on
//and start timer
if(buildButton.pressed())
{  
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(buildLights[i], HIGH);
    buildTimer.setTime(1100);
  }
  if(Audio2Time)
  {
    audioOut.playTrack(2);
    Audio2Time = false;
    Audio2Timer.setTime(100);
  }
}
if(!Audio2Timer.running()&& !Audio2Time)
{
  Audio2Time = !Audio2Time;
}
//Checks to see if timer is running
//if it is not running
//turn off lights associated with protect b
if(!buildTimer.running())
{
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(buildLights[i], LOW);
  }
}
}

void movePush() {
   moveButton.update();
 //Checks to see if button pressed
//if pressed turn lights on
//and start timer
if(moveButton.pressed())
{  
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(moveLights[i], HIGH);
    moveTimer.setTime(1100);
  }
    if(Audio3Time)
  {
    audioOut.playTrack(3);
    Audio3Time = false;
    Audio3Timer.setTime(100);
  }
}
if(!Audio3Timer.running()&& !Audio3Time)
{
  Audio3Time = !Audio3Time;
}
//Checks to see if timer is running
//if it is not running
//turn off lights
if(!moveTimer.running())
{
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(moveLights[i], LOW);
  }
}
}

void capturePush() {
captureButton.update();
////this is aaron example

//Checks to see if button pressed
//if pressed turn lights on
//and start timer
if(captureButton.pressed())
{  
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(captureLights[i], HIGH);
    captureTimer.setTime(1100);
  }
    if(Audio4Time)
  {
    audioOut.playTrack(4);
    Audio4Time = false;
    Audio4Timer.setTime(100);
  }
}
if(!Audio4Timer.running()&& !Audio4Time)
{
  Audio4Time = !Audio4Time;
}
//Checks to see if timer is running
//if it is not running
//turn off lights
if(!captureTimer.running())
{
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(captureLights[i], LOW);
  }
}
}

void loop() {
  //for each button - read, light corresponding array
  protectPush();
  buildPush();
  movePush();
  capturePush();

  //TODO - trigger sound

}
