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

#include <pin_define.h>
#include <sensor_update.h>
#include <Serial_Update.h>
#include <light_functions.h>

//bytes being sent or received:
//35 # Starts game on button press
//36 $ signals game over
//37 % Turns on fan
//38 & Not Used

Bounce2::Button startBtn = Bounce2::Button();
Bounce2::Button stopBtn = Bounce2::Button();

//flags
bool gameON = false;

byte fadeValue = 0;

void setup() 
{
  // Serial communicates to computer
  Serial.begin(9600);
  while (!Serial)
  delay(10);

  //set button PWM to outputs
  pinMode(startBtnPWM, OUTPUT);
  pinMode(stopBtnPWM, OUTPUT);
  pinMode(fanPin, OUTPUT);
  digitalWrite(fanPin,LOW);


  //button inilize
  startBtn.attach(startBtnPin, INPUT_PULLUP);
  stopBtn.attach(stopBtnPin, INPUT_PULLUP);

  startBtn.interval(5);
  stopBtn.interval(5);

  startBtn.setPressedState(LOW);
  stopBtn.setPressedState(LOW);

}

void loop() 
{
 
  if(gameON == false)
  {
    startBtn.update(); 
    //look for serial update
    digitalWrite(fanPin, LOW);
    gameON = (Serial_Update(gameON));
    fadeValue = breath(fadeValue); 

    if(startBtn.pressed())
    {
      //send # & LF to start game and close buffer
      Serial.print("#");
      Serial.write(10);
      gameON = true;      
    }
    pinMode(13, OUTPUT);
    digitalWrite(13,LOW);     
  }
  else
  {
    stopBtn.update(); 
    fadeValue = breathOut(fadeValue);
    digitalWrite(fanPin, HIGH);
    gameON = (Serial_Update(gameON));
    if(stopBtn.pressed())
    {
      //send % & LF to stop game game and close buffer
      Serial.print("%");
      Serial.write(10);
      gameON = true;      
    }
    //Onboard LED to let us know that the Arduio game is active
    pinMode(13, OUTPUT);
    digitalWrite(13,HIGH);
  }

}