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

  digitalWrite(LED_BUILTIN,HIGH);

}

void loop() 
{
 
 startBtn.update();
 stopBtn.update(); 

  if(startBtn.pressed() && gameON == false)
    {          
      //send # & LF to start the game and close buffer
      Serial.print("#");
      Serial.write(10);
      gameON = true;
      //turn fan powersupply on
      digitalWrite(fanPin, HIGH);

    }

  if(stopBtn.pressed() && gameON == true)
    {          
      //send % & LF to stop the game and close buffer
      Serial.print("%");
      Serial.write(10);
      gameON = false;
      //turn fan powersupply off
      digitalWrite(fanPin, LOW);            
    }

  //actions that happen during game state
  if(gameON == true)
  { 
    //get updates from processing to check 
    //what game status is OR to get sensor update
    gameON = (Serial_Update(gameON));

    //update buttons LEDs
    //have start button breath out while game is playing  
    fadeValueStart= breathOutStart(fadeValueStart);
    //have stop button breath while game is playing    
    fadeValueStop = breathStop(fadeValueStop);
  } 

    //actions that happen outside of game state
  if(gameON == false)
  { 
    //get updates from processing to check 
    //what game status is OR to get sensor update
    gameON = (Serial_Update(gameON));
    //turn fan powersupply off
    digitalWrite(fanPin, LOW);  
    //update buttons LEDs
    //have stop button light turn off
    fadeValueStop = breathOutStop(fadeValueStop);

    //have start button breath while game is off
    fadeValueStart = breathStart(fadeValueStart);
  } 


//   if (resultsFlag == true)
//   {
//     results();
//   }

}

void results()
{
//shut off lights and fan

digitalWrite(fanPin, LOW);

do {
    fadeValueStop = breathOutStop(fadeValueStop);
  } while (fadeValueStop > 0);

}