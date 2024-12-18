
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
//traces for button 4 on pcb board is reverse of the other three indicator lights 

#include <Arduino.h>
#include "AudioOut.h"
#include <bounce2.h>
#include <Timer.h>
#include <Pulse.h>



//declare audio object
AudioOut audioOut;
bool Audio1Time = true;
bool Audio2Time = true;
bool Audio3Time = true;
bool Audio4Time = true;

#define serial Serial

#define protectButton_pin 7
#define buildButton_pin 5
#define moveButton_pin 3
#define captureButton_pin 2
//const uint8_t buttonPins[] = {7, 5, 3, 2};
const uint8_t buttonCount = 4;
const uint8_t buttonLights[] = {13, 11, 10, 9};

Pulse ProtectLight, MoveLight, BuildLight, CaptureLight;

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
protectButton.setPressedState(LOW);
buildButton.attach(buildButton_pin,INPUT_PULLUP);
buildButton.interval(5);
buildButton.setPressedState(LOW);
moveButton.attach(moveButton_pin,INPUT_PULLUP);
moveButton.interval(5);
moveButton.setPressedState(LOW);
captureButton.attach(captureButton_pin,INPUT_PULLUP);
captureButton.interval(5);
captureButton.setPressedState(LOW);

ProtectLight.attach(13);
MoveLight.attach(11);
BuildLight.attach(10);
CaptureLight.attach(9);

ProtectLight.setMin(0);
MoveLight.setMin(0);
BuildLight.setMin(0);
CaptureLight.setMin(0);

ProtectLight.setMax(150);
MoveLight.setMax(150);
BuildLight.setMax(150);
CaptureLight.setMax(150);

ProtectLight.setRate(5);
MoveLight.setRate(15);
BuildLight.setRate(15);
CaptureLight.setRate(15);

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
  
  //start the wavtrigger
  audioOut.begin();

  serial.begin(9600);
} //void setup

void protectPush() {
<<<<<<< Updated upstream
 protectButton.update();
=======
  protectButton.update();
  serial.print("protect Pin: ");
  serial.println(digitalRead(protectButton_pin));

>>>>>>> Stashed changes
//Checks to see if button pressed
//if pressed turn lights on
//and start timer
if(protectButton.pressed())
{  
<<<<<<< Updated upstream
  Serial.println("Protect pressed");
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(protectLights[i], HIGH);
    Serial.print("Protect high: ");
    Serial.println(protectLights[i]);
    
=======
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(protectLights[i], HIGH);
    protectTimer.setTime(1100);
>>>>>>> Stashed changes
  }

  if(Audio1Time)
  {
    audioOut.playTrack(1);
    Audio1Time = false;
    Audio1Timer.setTime(100);
  }
  protectTimer.setTime(1100);
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
serial.print("build Pin: ");
serial.println(digitalRead(buildButton_pin));
if(buildButton.pressed())
{  
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(buildLights[i], HIGH);
  }
  if(Audio2Time)
  {
    audioOut.playTrack(2);
    Audio2Time = false;
    Audio2Timer.setTime(100);
  }
  buildTimer.setTime(1100);
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
  serial.print("move Pin: ");
  serial.println(digitalRead(moveButton_pin));
if(moveButton.pressed())
{  
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(moveLights[i], HIGH);
  }
    if(Audio3Time)
  {
    audioOut.playTrack(3);
    Audio3Time = false;
    //Audio3Timer.setTime(100);
  }
  moveTimer.setTime(1100);
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

<<<<<<< Updated upstream
////this is aaron example
captureButton.update();
=======
  serial.print("capture Pin: ");
  serial.println(digitalRead(captureButton_pin));
>>>>>>> Stashed changes
//Checks to see if button pressed
//if pressed turn lights on
//and start timer
if(captureButton.pressed())
{  
  for(int i = 0; i< stratLights; i++)
  {
    digitalWrite(captureLights[i], HIGH);
  }
    if(Audio4Time)
  {
    audioOut.playTrack(4);
    Audio4Time = false;
    Audio4Timer.setTime(100);
  }
  captureTimer.setTime(1100);
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
  // Serial.print("caputre pin: ");
  // Serial.println(digitalRead(captureButton_pin));
  //   Serial.print("protect pin: ");
  // Serial.println(digitalRead(protectButton_pin));
  //   Serial.print("build pin: ");
  // Serial.println(digitalRead(buildButton_pin));
  //   Serial.print("move pin: ");
  // Serial.println(digitalRead(moveButton_pin));
   //Serial.print("Proctect is pressed? ");
   //Serial.println(protectButton.isPressed());
  MoveLight.update(1);
  CaptureLight.update(1);
  BuildLight.update(1);
  ProtectLight.update(1);

 protectPush();
 buildPush();
 movePush();
 capturePush();

  //TODO - trigger sound

}
