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
//37 % signals the stopbtn has been pressed
//38 & used to tell results are starting
//39 ' used to receive sensor update
//40 ( used to tell arduino processing is out of results

Bounce2::Button startBtn = Bounce2::Button();
Bounce2::Button stopBtn = Bounce2::Button();

//flags
bool gameON = false;
bool resultsFlag = false;

byte fadeValueStart = 0;
byte fadeValueStop = 0;

void setup() 
{
    //set button PWM to outputs
  pinMode(startBtnPWM, OUTPUT);
  pinMode(stopBtnPWM, OUTPUT);
  pinMode(fanPin, OUTPUT);
  digitalWrite(fanPin,LOW);
  digitalWrite(startBtnPWM, LOW);
  digitalWrite(stopBtnPWM, LOW);
  

  // Serial communicates to computer
  Serial.begin(9600);
  while (!Serial)
  delay(10);


  //button initilize
  startBtn.attach(startBtnPin, INPUT_PULLUP);
  stopBtn.attach(stopBtnPin, INPUT_PULLUP);

  startBtn.interval(5);
  stopBtn.interval(5);

  startBtn.setPressedState(LOW);
  stopBtn.setPressedState(LOW);

}

void loop() 
{
 
  if(gameON == false && resultsFlag == false)
  { 
    startBtn.update(); 

    //turn fan powersupply off
    digitalWrite(fanPin, LOW);

    //look for serial update
    gameON = (Serial_Update(gameON));

    //have stop button light turn off
    fadeValueStop = breathOutStop(fadeValueStop);

    //have start button breath while game is off
    fadeValueStart = breathStart(fadeValueStart);


    if(startBtn.pressed())
    {          
      //send # & LF to start the game and close buffer
      Serial.print("#");
      Serial.write(10);
      gameON = true;      
    }
 
  } else if (gameON == true && resultsFlag == false)
  {
    stopBtn.update();

    //have start button breath out while game is playing  
    fadeValueStart= breathOutStart(fadeValueStart); 

    //have stop button breath while game is playing    
    fadeValueStop = breathStop(fadeValueStop);

    //turn fan on
    digitalWrite(fanPin, HIGH);

    //look for incoming game updates
    gameON = (Serial_Update(gameON));

    if(stopBtn.pressed())
    {         
      //send % & LF to stop the game and close buffer
      Serial.print("%");
      Serial.write(10);
      //turn the game flag off
      gameON = false;      
    }
  } else if (resultsFlag == true)
  {
    results();
  }

}

void results()
{
//shut off lights and fan

digitalWrite(fanPin, LOW);

do {
    fadeValueStop = breathOutStop(fadeValueStop);
  } while (fadeValueStop > 0);

}