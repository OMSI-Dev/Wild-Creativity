#include <Arduino.h>
#include <FastLED.h>
#include "AudioOut.h"
#include <MoToTimer.h>

#define FRAMES_PER_SECOND  120
#define NUM_LEDS_PER_STRIP 12
uint8_t gHue = 0;

//declare audio object
AudioOut audioOut;

//timers
MoToTimer chaseTimer;
MoToTimer winTimer;
MoToTimer restartTimer;
MoToTimer gameTimer;
MoToTimer darkTimer;

MoToTimer audioTimeOut1;
MoToTimer audioTimeOut2;
MoToTimer audioTimeOut3;
MoToTimer audioTimeOut4;

int darkTime = 2000;

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
bool rainbow = true;
bool attractFlag = true;

byte i = 0;
byte points = 0;
byte lightPos = 0;

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
  if(gameFlag==0)
  {
    fadeToBlackBy(catLeds, NUM_LEDS_PER_STRIP, 215);
    fadeToBlackBy(dogLeds, NUM_LEDS_PER_STRIP, 215);
    fadeToBlackBy(horseLeds, NUM_LEDS_PER_STRIP, 215);
    // Set the current LED to blue in both arrays
    if(lightPos == 0){
    catLeds[i] = CRGB::Blue;

    // Set the neighboring LEDs to aqua in both arrays
    int frontPos = (i + NUM_LEDS_PER_STRIP - 1) % NUM_LEDS_PER_STRIP;
    int backPos = (i + 1) % NUM_LEDS_PER_STRIP;

    catLeds[frontPos] = CRGB::Aqua;
    catLeds[backPos] = CRGB::Aqua;

    // Set the LED two positions ahead of the blue LED to black in both arrays
    int offPos = (i + 2) % NUM_LEDS_PER_STRIP;
    catLeds[offPos] = CRGB::Black;

    // Shift the pattern in both arrays
    CRGB temp = catLeds[NUM_LEDS_PER_STRIP-1];
    for (int j = NUM_LEDS_PER_STRIP-1; j > 0; j--) {
      catLeds[j] = catLeds[j-1];
    }
    catLeds[0] = temp; 
    }

    if(lightPos == 1){
    dogLeds[i] = CRGB::Blue;

    // Set the neighboring LEDs to aqua in both arrays
    int frontPos = (i + NUM_LEDS_PER_STRIP - 1) % NUM_LEDS_PER_STRIP;
    int backPos = (i + 1) % NUM_LEDS_PER_STRIP;

    dogLeds[frontPos] = CRGB::Aqua;
    dogLeds[backPos] = CRGB::Aqua;

    // Set the LED two positions ahead of the blue LED to black in both arrays
    int offPos = (i + 2) % NUM_LEDS_PER_STRIP;
    dogLeds[offPos] = CRGB::Black;

    // Shift the pattern in both arrays
    CRGB temp = dogLeds[NUM_LEDS_PER_STRIP-1];
    for (int j = NUM_LEDS_PER_STRIP-1; j > 0; j--) {
      dogLeds[j] = dogLeds[j-1];
    }
    dogLeds[0] = temp; 
    } 

if(lightPos == 2){
    horseLeds[i] = CRGB::Blue;

    // Set the neighboring LEDs to aqua in both arrays
    int frontPos = (i + NUM_LEDS_PER_STRIP - 1) % NUM_LEDS_PER_STRIP;
    int backPos = (i + 1) % NUM_LEDS_PER_STRIP;

    horseLeds[frontPos] = CRGB::Aqua;
    horseLeds[backPos] = CRGB::Aqua;

    // Set the LED two positions ahead of the blue LED to black in both arrays
    int offPos = (i + 2) % NUM_LEDS_PER_STRIP;
    horseLeds[offPos] = CRGB::Black;

    // Shift the pattern in both arrays
    CRGB temp = horseLeds[NUM_LEDS_PER_STRIP-1];
    for (int j = NUM_LEDS_PER_STRIP-1; j > 0; j--) {
      horseLeds[j] = horseLeds[j-1];
    }
    horseLeds[0] = temp; 
    } 

  
    // Update the indices in both arrays
    i = (i + 1) % NUM_LEDS_PER_STRIP;

    if(i == 11 && lightPos == 2){lightPos=0; i=0;};
    if(i == 11 && lightPos == 1){lightPos=2; i=0;};
    if(i == 11 && lightPos == 0){lightPos=1; i=0;};
  }
}


void catTargetHit() 
{
  if(!catFlag)
  {
  catFlag = true;
  points++;
  }
  if(gameFlag == 0)
  {
     gameFlag = 1;
  }
  gameTimer.restart();
}

void dogTargetHit() 
{
  if(!dogFlag)
  {
  dogFlag = true;
  points++;
  }
  if(gameFlag == 0)
  {
     gameFlag = 1;
  }
  gameTimer.restart();

}

void horseTargetHit() 
{
  if(!horseFlag)
  {
  horseFlag = true;
  points++;
  }
  if(gameFlag == 0)
  {
     gameFlag = 1;
  }
  gameTimer.restart();
}

void gameOver() 
{
  darkTimer.setTime(darkTime);
  Serial.println("game over");  
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
  attractFlag = true;

    do
    {
      FastLED.clear();
      FastLED.show();
    } while (darkTimer.running());

  chaseTimer.restart();
  }


void win(){
  
  i++;
  horseLeds[i] = CRGB::Red;
  horseLeds[i-1] = CRGB::OrangeRed;
  horseLeds[i-2] = CRGB::Black;


  dogLeds[i] = CRGB::Purple;
  dogLeds[i-1] = CRGB::Blue;
  dogLeds[i-2] = CRGB::Black;

  catLeds[i] = CRGB::Green;
  catLeds[i-1] = CRGB::Aqua;
  catLeds[i-2] = CRGB::Black;

  FastLED.show();
  if(i==12){i=0;FastLED.clear();FastLED.show();}
}


void loop() 
{
  Serial.print("Points: ");
  Serial.println(points);
  Serial.print("Hrose: ");
  Serial.println(horseFlag);
  Serial.print("Dog: ");
  Serial.println(dogFlag);
  Serial.print("cat: ");
  Serial.println(catFlag);  

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

      if(!audioTimeOut1.running())
      {
        audioOut.playTrack(1);
        audioTimeOut1.restart();
      }

      if(!catFlag)
      {
        Serial.println("Cat hit");
        catTargetHit();
      }

    }

  //Check to see if Dog was hit
  if(dogSt1 == 0 || dogSt2 == 0){
      if(!audioTimeOut2.running())
      {
        audioOut.playTrack(2);
        audioTimeOut2.restart();
      }

      if(!dogFlag)
      {
        Serial.println("dog hit");
        dogTargetHit();
      }    

    }

//Check to see if Horse was hit
  if(horseSt1 == 0 || horseSt2 == 0 )
    {

        if(!audioTimeOut3.running())
        {
        audioOut.playTrack(3);
        audioTimeOut3.restart();
        }

      if(!horseFlag)
      {
        Serial.println("Horse hit");
        horseTargetHit();
      }
    }


  if(points == 3)
  {
    gameFlag = 2;
    if(winTimerFlag){ FastLED.clear(); FastLED.show(); audioTimeOut4.setTime(500); winTimer.restart(); restartTimer.restart(); winTimerFlag = false;}

    if(!audioTimeOut4.running())
    {
      audioOut.playTrack(4);
      audioTimeOut4.setTime(5000);
    }

    if(!winTimer.running()){
    win();
    winTimer.restart();
    }

    if( !restartTimer.running()){
      audioOut.playTrack(4);
      gameOver();
    }

  }

  if(catFlag && gameFlag == 1 && rainbow && (points == 2 || points == 1)){
    fill_rainbow(catLeds, NUM_LEDS_PER_STRIP, gHue, 7);
  }

  if(dogFlag && gameFlag == 1 && rainbow && (points == 2 || points == 1)){
    fill_rainbow(dogLeds, NUM_LEDS_PER_STRIP, gHue, 7);
  }

  if(horseFlag && gameFlag == 1 && rainbow && (points == 2 || points == 1)){
    fill_rainbow(horseLeds, NUM_LEDS_PER_STRIP, gHue, 7);
  }


  if(!chaseTimer.running() && gameFlag == 0)
  {
    attract();
    chaseTimer.restart();  
  } 

if(!chaseTimer.running() && gameFlag == 1 && attractFlag)
  {
    fill_solid(catLeds, NUM_LEDS_PER_STRIP, CRGB::Black);
    fill_solid(dogLeds, NUM_LEDS_PER_STRIP, CRGB::Black);
    fill_solid(horseLeds, NUM_LEDS_PER_STRIP, CRGB::Black);
    Serial.println("Atrract Off");
    attractFlag = false;
  } 



  EVERY_N_MILLISECONDS( 10 ) { gHue--; }
   // FastLED cycle
  FastLED.show();
}

