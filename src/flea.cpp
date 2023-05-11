#include <Arduino.h>
#include <FastLED.h>
#include "AudioOut.h"
#include <MoToTimer.h>

#define FRAMES_PER_SECOND  120
#define NUM_LEDS_PER_STRIP 18
uint8_t gHue = 0;

//declare audio object
AudioOut audioOut;

//timers
MoToTimer chaseTimer;
MoToTimer winTimer;
MoToTimer restartTimer;
MoToTimer gameTimer;

MoToTimer audioTimeOut1;
MoToTimer audioTimeOut2;
MoToTimer audioTimeOut3;
MoToTimer audioTimeOut4;

// FastLED strip defines
CRGB horseLeds[NUM_LEDS_PER_STRIP];
CRGB dogLeds[NUM_LEDS_PER_STRIP];
CRGB catLeds[NUM_LEDS_PER_STRIP];

// Sensors and LED pins
#define horseSensor1 A0
#define horseSensor2 A1
#define horseTargetLeds 4

#define dogSensor1 A2
#define dogSensor2 A3
#define dogTargetLeds 6

#define catSensor1 A4
#define catSensor2 A5
#define catTargetLeds 8

// Game state and points
uint8_t gameFlag = 0; // 0 - Attract, 1 - Game, 2 - Game over

bool catState = 0;
bool dogState = 0;
bool horseState = 0;

// Flags for only playing sound once
bool catFlag = 0;
bool dogFlag = 0;
bool horseFlag = 0;
bool gameOverFlag = 0;
bool winTimerFlag = true;
bool playWin = true;

byte i = 0;
byte points = 0;


void setup() {
  FastLED.addLeds<WS2811, horseTargetLeds,RGB>(horseLeds, NUM_LEDS_PER_STRIP);
  FastLED.addLeds<WS2811, dogTargetLeds,RGB>(dogLeds, NUM_LEDS_PER_STRIP);
  FastLED.addLeds<WS2811, catTargetLeds,RGB>(catLeds, NUM_LEDS_PER_STRIP);

  audioOut.begin();

  pinMode(catSensor1, INPUT_PULLUP);
  pinMode(catSensor2, INPUT_PULLUP);
  pinMode(dogSensor1, INPUT_PULLUP);
  pinMode(dogSensor2, INPUT_PULLUP);
  pinMode(horseSensor1, INPUT_PULLUP);
  pinMode(horseSensor2, INPUT_PULLUP);

// Startup light test
  fill_rainbow( catLeds, NUM_LEDS_PER_STRIP, gHue, 7);
  FastLED.show();
  delay(300);
  FastLED.clear();
  FastLED.show();
  delay(300);
  fill_rainbow( dogLeds, NUM_LEDS_PER_STRIP, gHue, 7);
  FastLED.show();  
  delay(300);
  FastLED.clear();
  FastLED.show();
  delay(300);
  fill_rainbow( horseLeds, NUM_LEDS_PER_STRIP, gHue, 7);
  FastLED.show();  
  delay(300);
  FastLED.clear();
  FastLED.show();  

  chaseTimer.setTime(100);
  winTimer.setTime(20);
  restartTimer.setTime(3000);
  gameTimer.setTime(90000);

  audioTimeOut1.setTime(500);
  audioTimeOut2.setTime(500);
  audioTimeOut3.setTime(500);
  Serial.begin(9600);

}

void attract(){
 
 if(gameFlag == 1)
 {
 if(catState == 0){
  catLeds[i] = CRGB::Black;
  catLeds[i-1] = CRGB::Black;
  catLeds[i-2] = CRGB::Black;
  catLeds[i+1] = CRGB::Black;
  catLeds[i+2] = CRGB::Black;
 }

 if(dogState == 0){
  dogLeds[i] = CRGB::Black;
  dogLeds[i-1] = CRGB::Black;
  dogLeds[i-2] = CRGB::Black;
  dogLeds[i+1] = CRGB::Black;
  dogLeds[i+2] = CRGB::Black;
 }

 if(horseState == 0){
  horseLeds[i] = CRGB::Black;
  horseLeds[i-1] = CRGB::Black;
  horseLeds[i-2] = CRGB::Black;
  horseLeds[i+1] = CRGB::Black;
  horseLeds[i+2] = CRGB::Black;
 }


 }

if(gameFlag == 0){
 if(catState == 0){
  catLeds[i] = CRGB::Blue;
  catLeds[i-1] = CRGB::Aqua;
  catLeds[i-2] = CRGB::Black;
  catLeds[i+1] = CRGB::Aqua;
  catLeds[i+2] = CRGB::Black;
 }

 if(dogState == 0){
  dogLeds[i] = CRGB::Blue;
  dogLeds[i-1] = CRGB::Aqua;
  dogLeds[i-2] = CRGB::Black;
  dogLeds[i+1] = CRGB::Aqua;
  dogLeds[i+2] = CRGB::Black;
 }

 if(horseState == 0){
  horseLeds[i] = CRGB::Blue;
  horseLeds[i-1] = CRGB::Aqua;
  horseLeds[i-2] = CRGB::Black;
  horseLeds[i+1] = CRGB::Aqua;
  horseLeds[i+2] = CRGB::Black;
 }
}
 

  i++;

  if(i == 14){ i = 0;};

  FastLED.show();

}


void catTargetHit() {
  if(catFlag == 0){
  catFlag = 1;
  gameFlag = 1;
  points++;
  gameTimer.restart();
  }
  fill_rainbow(catLeds, NUM_LEDS_PER_STRIP, gHue, 7);
}

void dogTargetHit() {
  if(dogFlag == 0){
  
  dogFlag = 1;
  gameFlag = 1;
  points++;
  gameTimer.restart();
  }
  fill_rainbow(dogLeds, NUM_LEDS_PER_STRIP, gHue, 7);
}

void horseTargetHit() {
  if(horseFlag == 0){
 
  horseFlag = 1;
  gameFlag = 1;
  points++;

  gameTimer.restart();
  }
  fill_rainbow(horseLeds, NUM_LEDS_PER_STRIP, gHue, 7);
}

void gameOver() {
  FastLED.clear();
  FastLED.show();
  // Reset
  catFlag = 0;
  dogFlag = 0;
  horseFlag = 0;
  gameFlag = 0;
  catState = 0;
  dogState = 0;
  horseState = 0;
  points = 0;  
  winTimerFlag = true;
  playWin = true;
  chaseTimer.restart();
  }


void win(){
  
  i++;
  horseLeds[i] = CRGB::Red;
  horseLeds[i-1] = CRGB::OrangeRed;
  horseLeds[i-2] = CRGB::Black;
  horseLeds[i+1] = CRGB::OrangeRed;
  horseLeds[i+2] = CRGB::Black;

  dogLeds[i] = CRGB::Purple;
  dogLeds[i-1] = CRGB::Blue;
  dogLeds[i-2] = CRGB::Black;
  dogLeds[i+1] = CRGB::Purple;
  dogLeds[i+2] = CRGB::Black;

  catLeds[i] = CRGB::Green;
  catLeds[i-1] = CRGB::Aqua;
  catLeds[i-2] = CRGB::Black;
  catLeds[i+1] = CRGB::Aqua;
  catLeds[i+2] = CRGB::Black;

  FastLED.show();
  if(i==14){i=0;}
}


void loop() {


if(!gameTimer.running() && gameFlag == 1){gameOver();}

//Sensor reading
bool catSt1 = digitalRead(catSensor1);
bool catSt2 = digitalRead(catSensor2);
bool dogSt1 = digitalRead(dogSensor1);
bool dogSt2 = digitalRead(dogSensor2);
bool horseSt1 = digitalRead(horseSensor1);
bool horseSt2 = digitalRead(horseSensor2);

//Check to see if Cat was hit
if(catSt1 == 0 || catSt2 == 0){
    catState = 1;
    if(!audioTimeOut1.running()){
      audioOut.playTrack(1);
      audioTimeOut1.restart();
    }

  }
if(catState == 1 && catFlag == 0){
        catTargetHit();
  }

//Check to see if Dog was hit
if(dogSt1 == 0 || dogSt2 == 0){
    dogState = 1;
    if(!audioTimeOut2.running()){
      audioOut.playTrack(2);
      audioTimeOut2.restart();
    }

  }
if(dogState == 1 && dogFlag == 0){
      dogTargetHit();
  }

//Check to see if Horse was hit
if(horseSt1 == 0 || horseSt2 == 0 ){
    horseState = 1;
      if(!audioTimeOut3.running()){
      audioOut.playTrack(3);
      audioTimeOut3.restart();
    }
  }
if(horseState == 1 && horseFlag == 0){
        horseTargetHit();
  }

Serial.print("Game Timer: ");
Serial.println(gameTimer.getTime());
Serial.print("Points: ");
Serial.println(points);
Serial.print("Points: ");
Serial.println(points);


if(points == 3){
  gameFlag = 2;
  if(winTimerFlag){ FastLED.clear(); FastLED.show(); audioTimeOut4.setTime(1000); winTimer.restart(); restartTimer.restart(); winTimerFlag = false;}

if(!audioTimeOut4.running() && playWin)
{
  playWin = false;
  audioOut.playTrack(4);
}

  if(!winTimer.running()){
  win();
  winTimer.restart();
  }

  if(gameFlag ==2 && !restartTimer.running()){
    gameOver();
  }

}


if(!chaseTimer.running() && gameFlag == 0){
  attract();
  chaseTimer.restart();  
 } 

 if(!chaseTimer.running() && gameFlag == 1){
 attract();
 } 


// FastLED cycle
FastLED.show();
FastLED.delay(1000/FRAMES_PER_SECOND); 
EVERY_N_MILLISECONDS( 10 ) { gHue--; }
 
}

