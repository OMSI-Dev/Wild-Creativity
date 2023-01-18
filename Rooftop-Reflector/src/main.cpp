#include <Arduino.h>
#include <bounce2.h>
#include <MoToTimer.h>
#include <audio/AudioOut.h>

/* 
1/16/23 : Init 


*/

#include <pin_define.h>

//declare Audio
AudioOut audioOut;

//button declares
Bounce2::Button startBtn = Bounce2::Button();

//timer declares 
MoToTimer gameTimer;
int gameTime = 30000; //sets the game to 30s

//flags
bool btnOn = true;

void setup() {
  //button initilize
  startBtn.attach(startBtnPin, INPUT_PULLUP);
  startBtn.interval(5);
  startBtn.setPressedState(LOW);
  
  pinMode(laserPwr, OUTPUT);  

  //set game time
  gameTimer.setTime(gameTime);

  }

void loop() {
 //update button state
 startBtn.update();

  if(startBtn.isPressed() && btnOn == true)
  {
    digitalWrite(laserPwr,HIGH);
    gameTimer.restart();
    btnOn = false;
    audioOut.playTrack(1);
    //sound on
  }

  //timer ends
  if(gameTimer.expired() == true)
  {
    digitalWrite(laserPwr,LOW);
    btnOn = true;
    audioOut.stopTrack(1);
  }

}