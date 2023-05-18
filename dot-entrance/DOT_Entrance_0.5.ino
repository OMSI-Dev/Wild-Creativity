
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
#include "src/audio/AudioOut.h"

//declare audio object
AudioOut audioOut;


const uint8_t buttonPins[] = {7, 5, 3, 2};
const uint8_t buttonCount = 4;
const uint8_t buttonLights[] = {13, 11, 10, 9};

const uint8_t protectButton = 7;
const uint8_t buildButton = 5;
const uint8_t moveButton = 3;
const uint8_t captureButton = 2;

int lightPins[] = {A0, A1, A2, A3, A4, A5, 15, 16, 14, 8, 6, 4};
const uint8_t lightCount = 12;

int protectLights[] = {A0, A4, 14};
int buildLights[] = {A1, A3, 4};
int moveLights[] = {A2, 15, 6};
int captureLights[] = {A5, 16, 8};

const uint8_t stratLights = 3;

bool protectPrev = 0;
bool buildPrev = 0;
bool movePrev = 0;
bool capturePrev = 0;


void setup() {
  //instantiate buttons
  for (int i = 0; i < buttonCount; i++) {
    pinMode(buttonPins[i], INPUT_PULLUP);
  }

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
} //void setup

void protectPush() {
  bool protectPushed = digitalRead(protectButton);
  if (protectPushed == LOW) {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(protectLights[i], HIGH);
    }
  }
  else {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(protectLights[i], LOW);
    }
  }
if(protectPushed == LOW && protectPrev == HIGH){
      audioOut.playTrack(1);
  }
  protectPrev = protectPushed;
}

void buildPush() {
  bool buildPushed = digitalRead(buildButton);
  if (buildPushed == LOW) {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(buildLights[i], HIGH);
    }
  }
  else {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(buildLights[i], LOW);
    }
  }
if(buildPushed == LOW && buildPrev == HIGH){
    audioOut.playTrack(2);
  }
  buildPrev = buildPushed;
}

void movePush() {
  bool movePushed = digitalRead(moveButton);
  if (movePushed == LOW) {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(moveLights[i], HIGH);
    }
  }
  else {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(moveLights[i], LOW);
    }
  }
if(movePushed == LOW && movePrev == HIGH){
   audioOut.playTrack(3);
  }
  movePrev = movePushed;
}

void capturePush() {
  bool capturePushed = digitalRead(captureButton);
  if (capturePushed == LOW) {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(captureLights[i], HIGH);
    }
  }
  else {
    for (int i = 0; i < stratLights; i++) {
      digitalWrite(captureLights[i], LOW);
    }
  }
if(capturePushed == LOW && capturePrev == HIGH){
   audioOut.playTrack(4);
  }
  capturePrev = capturePushed;
  }



void loop() {
  //for each button - read, light corresponding array
  protectPush();
  buildPush();
  movePush();
  capturePush();

  //TODO - trigger sound

} //void loop
