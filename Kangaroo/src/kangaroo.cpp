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
MoToTimer darkTimer;

MoToTimer audioTimeOut1;
MoToTimer audioTimeOut2;
MoToTimer audioTimeOut3;

int darkTime = 2000;

// Sensors
#define largeSensor1 A2
#define largeSensor2 A3

#define smallSensor1 A0
#define smallSensor2 A1

// Out pins
#define largeTargetLeds 4
#define smallTargetLeds 6


// LED counts
#define smLedCount 16
#define lgLedCount 20

CRGB largeLeds[lgLedCount];
CRGB smallLeds[smLedCount];

uint8_t gameFlag = 0; // 0 - Attract, 1 - Game, 2 - Game over

bool smState = 0;
bool lgState = 0;

// Flags for only playing sound once
bool smFlag = false;
bool lgFlag = false;
bool gameOverFlag = 0;
bool winTimerFlag = true;
bool playWin = true;
bool smLight = true;
bool rainbow = true;
bool attractFlag = true;

byte smi = 0;
byte lgi = 0;
byte points = 0;
byte i = 0;

void setup() {
  FastLED.addLeds<WS2811, largeTargetLeds,RGB>(largeLeds, lgLedCount);
  FastLED.addLeds<WS2811, smallTargetLeds,RGB>(smallLeds, smLedCount);

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
  winTimer.setTime(40);
  restartTimer.setTime(3000);
  gameTimer.setTime(90000);
  //set the audio time outs for repeat play
  audioTimeOut1.setTime(700);
  audioTimeOut2.setTime(700);

  Serial.begin(9600);
}

void attract() 
{
  if(gameFlag==0)
  {
    fadeToBlackBy(smallLeds, smLedCount, 215);
    fadeToBlackBy(largeLeds, lgLedCount, 215);
    // Set the current LED to blue in both arrays
    if(smLight){
    smallLeds[smi] = CRGB::Blue;

    // Set the neighboring LEDs to aqua in both arrays
    int frontPos = (smi + smLedCount - 1) % smLedCount;
    int backPos = (smi + 1) % smLedCount;
    smallLeds[frontPos] = CRGB::Aqua;
    smallLeds[backPos] = CRGB::Aqua;



    // Set the LED two positions ahead of the blue LED to black in both arrays
    int offPos = (smi + 2) % smLedCount;
    smallLeds[offPos] = CRGB::Black;

    // Shift the pattern in both arrays
    CRGB temp = smallLeds[smLedCount-1];
    for (int j = smLedCount-1; j > 0; j--) {
      smallLeds[j] = smallLeds[j-1];
    }
    smallLeds[0] = temp; 
    } 
  

    if(!smLight)
    {
    //Large Array
    largeLeds[lgi] = CRGB::Blue;
    int frontPos = (lgi + lgLedCount - 1) % lgLedCount;
    int backPos = (lgi + 1) % lgLedCount;
    largeLeds[frontPos] = CRGB::Aqua;
    largeLeds[backPos] = CRGB::Aqua;

    int offPos = (lgi + 2) % lgLedCount;
    largeLeds[offPos] = CRGB::Black;

    CRGB temp = largeLeds[lgLedCount-1];
    for (int j = lgLedCount-1; j > 0; j--) {
      largeLeds[j] = largeLeds[j-1];
    }
    largeLeds[0] = temp;
    }

    // Update the indices in both arrays
    smi = (smi + 1) % smLedCount;
    lgi = (lgi + 1) % lgLedCount;    

    if(smi == 15 && smLight){smLight = !smLight;  lgi=0; smi=0;};
    if(lgi == 19 && !smLight){smLight = !smLight; lgi=0; smi=0;};
  }

}


void gameOver() 
  {
    darkTimer.setTime(darkTime);
    Serial.println("game over");
    FastLED.clear();
    FastLED.show();
    // Reset
    smFlag = false;
    lgFlag = false;
    gameFlag = 0;
    smState = false;
    lgState = false;
    points = 0;  
    winTimerFlag = true;
    playWin = true;
    attractFlag = true;
    
    smi = 0;
    lgi = 0;
    do
    {
      FastLED.clear();
      FastLED.show();
    } while (darkTimer.running());
    

    chaseTimer.restart();
  }

void smallTargetHit() 
{
  if(!smFlag)
  {
  smFlag = true;
  points++;
  }
  if(gameFlag == 0)
  {
     gameFlag = 1;
  }
  gameTimer.restart();
}

void largeTargetHit() 
{
  if(!lgFlag)
  {
  lgFlag = true;
  points++;
  }
  if(gameFlag == 0)
  {
     gameFlag = 1;
  }

  gameTimer.restart();
}

void win ()
{
    smallLeds[smi] = CRGB::Green;

    // Set the neighboring LEDs to aqua in both arrays
    int frontPos = (smi + smLedCount - 1) % smLedCount;
    int backPos = (smi + 1) % smLedCount;
    smallLeds[frontPos] = CRGB::GreenYellow;
    smallLeds[backPos] = CRGB::GreenYellow;

    // Set the LED two positions ahead of the blue LED to black in both arrays
    int offPos = (smi + 2) % smLedCount;
    smallLeds[offPos] = CRGB::Black;

    // Shift the pattern in both arrays
    CRGB temp = smallLeds[smLedCount-1];
    for (int j = smLedCount-1; j > 0; j--) {
      smallLeds[j] = smallLeds[j-1];
    }
    smallLeds[0] = temp; 

    //Large Array
    largeLeds[lgi] = CRGB::Purple;
    frontPos = (lgi + lgLedCount - 1) % lgLedCount;
    backPos = (lgi + 1) % lgLedCount;
    largeLeds[frontPos] = CRGB::HotPink;
    largeLeds[backPos] = CRGB::HotPink;

    offPos = (lgi + 2) % lgLedCount;
    largeLeds[offPos] = CRGB::Black;

    temp = largeLeds[lgLedCount-1];
    for (int j = lgLedCount-1; j > 0; j--) {
      largeLeds[j] = largeLeds[j-1];
    }
    largeLeds[0] = temp;
    
    // Update the indices in both arrays
    smi = (smi + 1) % smLedCount;
    lgi = (lgi + 1) % lgLedCount;   

}

void loop() 
{
 
  //if gametimer ends, send to reset
  if(!gameTimer.running() && gameFlag == 1){gameOver();}

  //Read sensors
  bool smSt1 = digitalRead(smallSensor1);
  bool smSt2 = digitalRead(smallSensor2);
  bool lgSt1 = digitalRead(largeSensor1);
  bool lgSt2 = digitalRead(largeSensor2);


  if (smSt1 == LOW || smSt2 == LOW) 
  { 
    if(!audioTimeOut1.running())
    {
      audioOut.playTrack(1);
      audioTimeOut1.restart();
    }

    if(!smFlag)
    {
      Serial.println("Small hit");
      smallTargetHit();
    }
  }

  if (lgSt1 == LOW || lgSt2 == LOW) 
  {  
    if(!audioTimeOut2.running())
    {
      audioOut.playTrack(2);
      audioTimeOut2.restart();
    }

    if(!lgFlag)
    {
      Serial.println("Large hit");
      largeTargetHit();
    }
  }

  if(points == 2)
  {
    
    if(winTimerFlag){FastLED.clear(); FastLED.show();audioTimeOut3.setTime(800); winTimerFlag = false; restartTimer.setTime(3000);}
        
    if(!audioTimeOut3.running())
    {
      audioOut.playTrack(3);
      audioTimeOut3.setTime(5000);
    }

    if(!winTimer.running())
    {
      win();
      winTimer.restart();
    }

    if(!restartTimer.running())
    {
      gameOver();
    }
    
  }


  if(lgFlag && gameFlag == 1 && rainbow && (points != 2 || points == 1)){
    fill_rainbow(largeLeds, lgLedCount, gHue, 7);
  }

  if(smFlag && gameFlag == 1 && rainbow && (points != 2 || points == 1)){
    fill_rainbow(smallLeds, smLedCount, gHue, 7);
  }

  //Attractor Control
  if(!chaseTimer.running() && gameFlag == 0)
  { 
    attract();
    chaseTimer.restart();  
  } 

  if(!chaseTimer.running() && gameFlag == 1 && attractFlag)
  {
    fill_solid( smallLeds, smLedCount, CRGB::Black);
    fill_solid(largeLeds, lgLedCount, CRGB::Black);
    Serial.println("Atrract Off");
    attractFlag = false;
  } 

  //update Leds and Hue Shift
  EVERY_N_MILLISECONDS( 10 ){gHue--;}
  FastLED.show();
  
}