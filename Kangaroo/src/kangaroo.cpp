#include <Arduino.h>
#include <FastLED.h>
#include "AudioOut.h"
#include <MoToTimer.h>

#define FRAMES_PER_SECOND  120
uint8_t gHue = 0;

AudioOut audioOut;

//timers
MoToTimer chaseTimer;
MoToTimer winTimer;
MoToTimer restartTimer;
MoToTimer gameTimer;

MoToTimer audioTimeOut1;
MoToTimer audioTimeOut2;
MoToTimer audioTimeOut3;

// Sensors
#define largeSensor1 A0
#define largeSensor2 A1

#define smallSensor1 A2
#define smallSensor2 A3

// Out pins
#define largeTargetLeds 6
#define smallTargetLeds 4


// LED counts
#define smLedCount 16
#define lgLedCount 20

CRGB largeLeds[lgLedCount];
CRGB smallLeds[smLedCount];

uint8_t gameFlag = 0; // 0 - Attract, 1 - Game, 2 - Game over

bool smState = 0;
bool lgState = 0;

// Flags for only playing sound once
bool smFlag = 0;
bool lgFlag = 0;
bool gameOverFlag = 0;
bool winTimerFlag = true;
bool playWin = true;

byte smi = 0;
byte lgi = 0;
byte points = 0;

void setup() {
  FastLED.addLeds<WS2811, largeTargetLeds,GRB>(largeLeds, lgLedCount);
  FastLED.addLeds<WS2811, smallTargetLeds,GRB>(smallLeds, smLedCount);

  pinMode(largeSensor1, INPUT_PULLUP);
  pinMode(largeSensor2, INPUT_PULLUP);
  pinMode(smallSensor1, INPUT_PULLUP);
  pinMode(smallSensor2, INPUT_PULLUP);

  audioOut.begin();

  // Startup light test
  fill_rainbow(largeLeds, lgLedCount, gHue, 7);
  FastLED.show();
  delay(300);
  FastLED.clear();
  FastLED.show();
  delay(300);
  fill_rainbow(smallLeds, smLedCount, gHue, 7);
  FastLED.show();
  delay(300);
  FastLED.clear();
  FastLED.show();
  Serial.println("setup");

  //Timer setup 
  chaseTimer.setTime(100);
  winTimer.setTime(20);
  restartTimer.setTime(3000);
  gameTimer.setTime(90000);
  //set the audio time outs for repeat play
  audioTimeOut1.setTime(500);
  audioTimeOut2.setTime(500);

  Serial.begin(9600);
}

void attract() {
    // Set the current LED to blue in both arrays
    smallLeds[smi] = CRGB::Red;
    largeLeds[lgi] = CRGB::Blue;

    // Set the neighboring LEDs to aqua in both arrays
    int frontPos = (smi + smLedCount - 1) % smLedCount;
    int backPos = (smi + 1) % smLedCount;
    smallLeds[frontPos] = CRGB::Aqua;
    smallLeds[backPos] = CRGB::Aqua;

    //Large Array
    frontPos = (lgi + lgLedCount - 1) % lgLedCount;
    backPos = (lgi + 1) % lgLedCount;
    largeLeds[frontPos] = CRGB::Aqua;
    largeLeds[backPos] = CRGB::Aqua;

    // Set the LED two positions ahead of the blue LED to black in both arrays
    int offPos = (smi + 2) % smLedCount;
    smallLeds[offPos] = CRGB::Black;


    offPos = (lgi + 2) % lgLedCount;
    largeLeds[offPos] = CRGB::Black;

    // Shift the pattern in both arrays
    CRGB temp = smallLeds[smLedCount-1];
    for (int j = smLedCount-1; j > 0; j--) {
      smallLeds[j] = smallLeds[j-1];
    }
    smallLeds[0] = temp;  
    temp = largeLeds[lgLedCount-1];
    for (int j = lgLedCount-1; j > 0; j--) {
      largeLeds[j] = largeLeds[j-1];
    }
    largeLeds[0] = temp;

    // Update the indices in both arrays
    smi = (smi + 1) % smLedCount;
    lgi = (lgi + 1) % lgLedCount;
}


void gameOver() 
{
  FastLED.clear();
  FastLED.show();
  // Reset
  smFlag = 0;
  lgFlag = 0;
  gameFlag = 0;
  smState = 0;
  lgState = 0;
  points = 0;  
  winTimerFlag = true;
  playWin = true;
  chaseTimer.restart();
  }

void smallTargetHit() 
{
  if(smFlag == 0)
  {  
  smFlag = 1;
  gameFlag = 1;
  points++;
  gameTimer.restart();
  }
  fill_rainbow(smallLeds, smLedCount, gHue, 7);
}

void largeTargetHit() 
{
  if(lgFlag == 0)
  { 
  lgFlag = 1;
  gameFlag = 1;
  points++;
  gameTimer.restart();
  }
  fill_rainbow(largeLeds, lgLedCount, gHue, 7);
}


void loop() {
//   bool smSt1 = digitalRead(smallSensor1);
//   bool smSt2 = digitalRead(smallSensor2);
//   bool lgSt1 = digitalRead(largeSensor1);
//   bool lgSt2 = digitalRead(largeSensor2);

//   if (smSt1 == LOW || smSt2 == LOW) {
//     smState = 1;
//   }

//   if (smState == 1) {
//     smallTargetHit();
//     Serial.println("small target");
//   }

//   if (lgSt1 == LOW || lgSt2 == LOW) {
//     lgState = 1;
//   }

//   if (lgState == 1) {
//     largeTargetHit();
//     Serial.println("large target");
//   }



// //Check to see if Dog was hit
// if(smSt1 == 0 || smSt2 == 0){
//     smState = 1;
//     if(!audioTimeOut2.running()){
//       audioOut.playTrack(2);
//       audioTimeOut2.restart();
//     }

//   }
// if(smState == 1 && smFlag == 0){
//       smallTargetHit();
//   }

// //Check to see if Horse was hit
// if(lgSt1 == 0 || lgSt2 == 0 ){
//     lgState = 1;
//       if(!audioTimeOut2.running()){
//       audioOut.playTrack(2);
//       audioTimeOut2.restart();
//     }
//   }
// if(lgState == 1 && lgFlag == 0){
//         largeTargetHit();
//   }

//   if (smState == 1 && lgState == 1) {
//     gameOver();
//   }
if(!chaseTimer.running()){
  attract();
  chaseTimer.restart();  
 } 

  //  fill_rainbow(smallLeds, smLedCount, gHue, 7);
  // EVERY_N_MILLISECONDS( 10 ) 
  // {
  //   gHue--;
  // } 

  FastLED.show();
  
}