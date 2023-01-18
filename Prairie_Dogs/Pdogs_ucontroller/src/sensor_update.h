#include <pin_define.h>
#include <Mapf.h>
//#define debug

const int CalNumReadings = 80;

const int numReadings = 40;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
double total = 0;                  // the running total

int CalReadings[CalNumReadings];      // the readings from the analog input
int CalReadIndex = 0;              // the index of the current reading
double CalTotal = 0;                  // the running total

double sensorVal;

//used to constrain & Calibrate
bool SenCalibrate = false;
double sensorValHigh =  220;
double sensorValHighlast = 0;
bool ledState = 0;
bool lastLedState = 0;

double modifiedMap(double x, double in_min, double in_max, double out_min, double out_max)
{
     double temp = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
     temp = (int) (4*temp + .5);
     return (double) temp/4;
}

double sensorUpdate(double sensorValLow)
{
     //Average out the signal at the start of the game
     //Set this to the Low. Map these new readings to 0-300
     #ifdef debug
          Serial.print("Sensor Low:");
          Serial.println(sensorValLow);
     #endif

     total = total - readings[readIndex]; 
     readings[readIndex] = analogRead(sensorIn); 
     total = total + readings[readIndex];  
     readIndex = readIndex + 1;

     if (readIndex >= numReadings) 
     {
          readIndex = 0;
     }

     #ifdef debug
          Serial.print("READ Value: ");
          Serial.println(analogRead(sensorIn));
     #endif 

     sensorVal = total / numReadings;

     #ifdef debug
          Serial.print("Averaged Value: ");
          Serial.println(sensorVal); 
     #endif

     if(sensorVal > sensorValHigh )
     {
          sensorValHigh = sensorVal;
          #ifdef debug
               Serial.print("High Value: ");
               Serial.println(sensorValHigh);
          #endif
     }    

     //sensorVal = constrain(sensorVal,sensorValLow,sensorValHigh);

     #ifdef debug
          Serial.print("constrain Value: ");
          Serial.println(sensorVal);
     #endif

     #ifdef debug
          Serial.print("MapF Value: ");
          Serial.println(sensorVal);
     #endif

     //map the value to a higher resoultion and force them to always be positive
     sensorVal = abs(modifiedMap(sensorVal,sensorValLow, sensorValHigh, 0, 300));

     #ifdef debug
          Serial.print("Mapped Value: ");
          Serial.println(sensorVal);
     #endif

}

//calibration routine to define the base level of the oxygen levels
//this most likely will be need to ran at each venue
int SensorCalibration(int sensorValCalibrated)
{         
     //starts the the fan and waits for the fan to get to full speed
     //before starting the calibration routine
     if(CalReadIndex == 0){digitalWrite(fanpin, HIGH); delay(5000);}
    
     do
     {
          CalTotal = CalTotal - CalReadings[CalReadIndex];
           #ifdef debug
          Serial.print("Raw Sesnor Data= ");
          Serial.print(CalReadIndex);
          Serial.print(" : ");  
          Serial.println(analogRead(sensorIn));
           #endif 
          CalReadings[CalReadIndex] = analogRead(sensorIn); 
          CalTotal = CalTotal + CalReadings[CalReadIndex];  
          CalReadIndex = CalReadIndex + 1;

          //blink led
          if(ledState != lastLedState)
          {
            digitalWrite(LED_BUILTIN, HIGH);
          }else(digitalWrite(LED_BUILTIN, LOW));     
          lastLedState = ledState;

     }while(CalReadIndex != CalNumReadings);

     if (CalReadIndex >= CalNumReadings) {
          CalReadIndex = 0;
     }     

     #ifdef debug 
          Serial.print("CalTotal Data:"); 
          Serial.println(CalTotal);
     #endif 

    sensorValCalibrated = CalTotal / CalNumReadings;

     #ifdef debug
          Serial.print("Avg :"); 
          Serial.println(CalTotal / CalNumReadings);
     #endif 

    EEPROM.update(0,sensorValCalibrated);

    return  sensorValCalibrated;

 }

