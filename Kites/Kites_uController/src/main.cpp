/* 
Kites - 8/8/2022

Sends & Recives data from companion processing sketch

Base process:
Waits for button press, while waiting pulse button LED (PWM to NCH Mosfet)


Updates:
8/8/22 : Base code 
8/29/22: Moved all pin def to its own header
*/

#include <Arduino.h>
#include <bounce2.h>
#include <MoToTimer.h>
#include <pin_define.h>
#include <sensor_update.h>
#include <Serial_Update.h>
#include <pulse/PulseControl.h>


//bytes being sent or received:
//! (33) = Signals arduino knows game is over
//# (35) = Start game
//$ (36) = Game over signal
//% (37) = End game by stop button  
//& (38) = Entered Results
//' (39) = ask arduino to send sensor update
//( (40) = Left Results
//) (41) = Starting countdown

Bounce2::Button startBtn = Bounce2::Button();
Bounce2::Button stopBtn = Bounce2::Button();

//flags
bool gameOn = false;
bool resultsFlag = false;
bool allowStop = false;

Pulse startPulse;
Pulse stopPulse;

void setup() 
{
    //set pinModes
  pinMode(startBtnPWM, OUTPUT);
  pinMode(stopBtnPWM, OUTPUT);
  pinMode(fanPin, OUTPUT);

  //set starting pin values
  digitalWrite(fanPin,LOW);
  digitalWrite(startBtnPWM, LOW);
  digitalWrite(stopBtnPWM, LOW);
  

  // Serial communicates to computer
  Serial.begin(115200);
  while (!Serial)
  delay(10);


  //button initilize
  startBtn.attach(startBtnPin, INPUT_PULLUP);
  stopBtn.attach(stopBtnPin, INPUT_PULLUP);

  startBtn.interval(5);
  stopBtn.interval(5);

  startBtn.setPressedState(LOW);
  stopBtn.setPressedState(LOW);

  startPulse.attach(startBtnPWM);
  stopPulse.attach(stopBtnPWM);

}

void fanOn(bool On)
{
  digitalWrite(fanPin, On);  
}

void results()
{
  do
  { //shut off lights and fan
  fanOn(0);
  stopPulse.setRate(5);
  stopPulse.update(0);
  startPulse.setRate(5);
  startPulse.update(0);
  gameOn = Serial_Update(gameOn);
  }while(resultsFlag == true);

}

void inGame()
{
  //turn fan on
  
  //turn off start button
  startPulse.setRate(15);
  startPulse.update(0);
  //turn on stop button
  stopPulse.setRate(30);
  stopPulse.update(1);
  //check for Serial updates
  gameOn = Serial_Update(gameOn);
  //check to see if signal to allow stop button has been sent

  if(stopBtn.pressed() == true && allowStop == true)
  { 
    //Send game over signal
    Serial.print("%");
    Serial.write(10);    
  }
  fanOn(1);
  
}

void gameOver()
{ 
  //turn on start button
  startPulse.setRate(30);
  startPulse.update(1);
  //turn off stop button
  stopPulse.setRate(15);
  stopPulse.update(0);  
  allowStop = false;  
}

void loop() 
{

 startBtn.update();
 stopBtn.update(); 
 
 //check if the game should start
 if(startBtn.pressed() == true && gameOn == false)
 {
  Serial.print("#");
  Serial.write(10);
  gameOn = true;
 }

  if(gameOn == true && resultsFlag == false)
  {
    inGame();
  }

  if(gameOn == false && resultsFlag == false)
  {
    gameOver();    
  }
  
  if(resultsFlag == true)
  {    
    results();
  }
}