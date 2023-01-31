#include <Arduino.h>
#include <bounce2.h>
#include <MoToTimer.h>
#include <audio/AudioOut.h>



/* 
1/16/23 : Init 
1/20/23 : Add pinmodes, timers and audio
1/23/23 : Added wavTrigger begin, sound Off, and light functions

*/

#include <pin_define.h>
#include <light_functions.h>

//declare Audio
AudioOut audioOut;

//button declares
Bounce2::Button startBtn = Bounce2::Button();

//timer declares 
MoToTimer gameTimer;
int gameTime = 30000; //sets the game to 30s

//flags
bool btnOn = true;

void setup() 
{
  //button initilize
  startBtn.attach(startBtnPin, INPUT_PULLUP); 
  startBtn.interval(5);
  startBtn.setPressedState(LOW);
  
  //Set pins
  pinMode(laserPwr, OUTPUT);  
  pinMode(startBtnPwm, OUTPUT);  
  //set game time
  gameTimer.setTime(gameTime);
  gameTimer.stop();

  //set LEDS start state
  digitalWrite(LED_BUILTIN, LOW);
  audioOut.begin();

}

void loop() 
{
 //update button state
 startBtn.update();

  //check to see if button has been pressed & not currently in the game
  if(startBtn.isPressed() && btnOn == true)
  {
    //turn the laser on
    digitalWrite(laserPwr,HIGH);
    //set onboard led to on
    digitalWrite(LED_BUILTIN, HIGH);
    //restart the gametimer
    gameTimer.restart();
    //set to dissallow button to be pressed during game
    btnOn = false;
    //sound on
    audioOut.playTrack(1);
  }

  if(gameTimer.running() == false && btnOn == true)
  {
    //send to breath function while the game is off
    pulse(startBtnPwm,1,25); //(PWM,Pulse Enable, Update Rate)
  }
  if(btnOn == false){pulse(startBtnPwm,0,25);} //(PWM,Pulse Enable, Update Rate)
  //timer ends and game resets
  if(gameTimer.expired() == true)
  {
    //turn the lasers off
    digitalWrite(laserPwr,LOW);
    //turn the onboard to off
    digitalWrite(LED_BUILTIN, LOW);
    //allow button to be pressed
    btnOn = true;
    //play sound off
    audioOut.playTrack(2);
    //reset the pulse sync
    pulse_reset();
  }

}