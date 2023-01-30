/* 
Prairie Dogs - 7/6/2022

Sends & Recives data from companion processing sketch

Base process:
Waits for button press, while waiting pulse button LED (PWM to NCH Mosfet)
When game starts: read Oxygen sensors and report to proecssing
Processing requests when it wants an update from the sensor
Plays a tone the maps the to the low & high of sensor(This might move to processing)
Continue until receives game over byte & resets arduino state

Air Flow Pinout
Red  - 12v
Black - GND
Blue - Data

Updates:
Base code: 7/6/22
Added comments & notes waiting to calibrate

7/14/22 - Added Notes
8/25/22 - changed tone generation Hz (this might be removed in RC)
8/29/22: Moved all pin def to its own header
         Removed Tone Generator as it is now controlled in processing
11/7/22: re-calibrated Sensor
11/11/22: Added calibration function & Floating Map function to have a smoother resolution to send to Processing
*/

#include <Arduino.h>
#include <EEPROM.h>
#include <bounce2.h>
#include <MoToTimer.h>

#include <pin_define.h>
#include <calibration.h>
#include <sensor_update.h>
#include <Serial_Update.h>
#include <light_functions.h>


//bytes being sent or received:
//35 # Starts game on button press
//36 $ signals game over
//37 % Not Used
//38 & Not Used

Bounce2::Button startBtn = Bounce2::Button();
Bounce2::Button calBtn = Bounce2::Button();

//#define debug

//flags
bool gameON = false;
bool CalFlag = false;

void setup() 
{
  pinMode(speakerPin, OUTPUT);
  pinMode(startBtnPWM, OUTPUT); 
  pinMode(fanpin, OUTPUT);
  
  digitalWrite(LED_BUILTIN, HIGH);
  //button inilize
  startBtn.attach(startBtnPin, INPUT_PULLUP);
  startBtn.interval(5);
  startBtn.setPressedState(LOW);

  calBtn.attach(calBtnPin, INPUT_PULLUP);
  calBtn.interval(5);
  calBtn.setPressedState(LOW);

  // Serial communicates to computer
  Serial.begin(9600);
  while (!Serial) 
    {delay(10);}

 digitalWrite(LED_BUILTIN, LOW);
}

void loop() 
{
  startBtn.update();
  calBtn.update(); 

  //game code
  if(startBtn.pressed() && gameON == false)
  {
    //send # & LF to start game on processing
    Serial.print("#");
    Serial.write(10);
    //flip flag      
    gameON = true;      
  }  


  if(gameON == false)
  {
    digitalWrite(fanpin, LOW);
    //look for serial update
    gameON = (Serial_Update(gameON));
    pulse(startBtnPWM, 1, 25);
  }

  if(gameON == true) {
    digitalWrite(fanpin, HIGH);  
    gameON = (Serial_Update(gameON));
    pulse(startBtnPWM, 0, 25);    
  }

}
