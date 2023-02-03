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
#include <pulse/PulseControl.h>


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
bool stopAllow = false;

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
      stopAllow = false;
    }

  if(stopBtn.pressed() && gameON == true && stopAllow == true)
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
    stopAllow = (Serial_UpdateBtn(stopAllow));
    //update buttons LEDs
    //have start button breath out while game is playing  
    startPulse.setRate(15);
    startPulse.update(0);
    //have stop button breath while game is playing    
    stopPulse.setRate(30);
    stopPulse.update(1);
  } 

    //actions that happen outside of game state
  if(gameON == false && resultsFlag == false)
  { 
    //get updates from processing to check 
    //what game status is OR to get sensor update
    gameON = (Serial_Update(gameON));
    stopAllow = false;
    //turn fan powersupply off
    digitalWrite(fanPin, LOW);  
    //update buttons LEDs
    //have stop button light turn off
    stopPulse.setRate(15);
    stopPulse.update(0);

    //have start button breath while game is off
    startPulse.setRate(30);
    startPulse.update(1);
  } 


  if (resultsFlag == true)
  {
    results();
  }

}

void results()
{

  //shut off lights and fan
  digitalWrite(fanPin, LOW);
  stopPulse.setRate(5);
  stopPulse.update(0);
    
}