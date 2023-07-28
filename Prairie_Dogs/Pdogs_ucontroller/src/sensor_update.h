//#include <pin_define.h>
#include <Mapf.h>
//#define debug

const int CalNumReadings = 100;

const int numReadings = 25;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
double total = 0;                  // the running total

int CalReadings[CalNumReadings];      // the readings from the analog input
int CalReadIndex = 0;              // the index of the current reading
double CalTotal = 0;                  // the running total

double sensorVal;


int brightness = 60;   
byte hue = 0;          
int led_pointer=0; 

float alpha = 0.5; // Adjust as needed: Larger number greater spikes. Smaller number less spikes.
float ema = 0.00; // This will store the Exponential Moving Average

MoToTimer LED_timer;

//used to constrain & Calibrate
bool SenCalibrate = false;
double sensorValHigh =  400; //init value set to low it will cause spikes. Set to high and game never calibrates
double sensorValHighlast = 0;
bool ledState = 0;
bool lastLedState = 0;

float modifiedMap(float value, float inMin, float inMax, float outMin, float outMax) {
    // Map the input value from the input range to the output range
    float mappedValue = (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    return mappedValue;
}

// this is the function to control the ARGB strips and output the correct color 
void lightupdate(double sensorVal)
{

          if (!LED_timer.running()&& led_pointer<=numofLEDS)
          {
               //Serial.print(" this is the led_pointer");
               //Serial.println( led_pointer);
               if( sensorVal>=0 && sensorVal<=100)
               {
                    tubelight[led_pointer]= CRGB:: Red; 
                    
                    fadeToBlackBy(tubelight,numofLEDS,60);
                    LED_timer.setTime(100);

               }
               if(sensorVal>100 && sensorVal<200)
               {
                    tubelight[led_pointer]= CRGB:: Yellow;
                    
                    fadeToBlackBy(tubelight,numofLEDS,90);
                    LED_timer.setTime(60);
                    
               }
               if(sensorVal>=200)
               {
                    tubelight[led_pointer]= CRGB:: Green;
                    
                    fadeToBlackBy(tubelight,numofLEDS,120);
                    LED_timer.setTime(40);
                    
               }
               
               led_pointer++;
               fadeToBlackBy(tubelight,numofLEDS,70);
          }
          if (led_pointer>numofLEDS)
          {
               led_pointer= 0;
          }
          FastLED.show();
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
     ema = (alpha * sensorVal) + ((1 - alpha) * ema); // Calculate the EMA
     sensorVal = ema; //Swap values back to sensorVal before mapping occurs.

     //map the value to a higher resoultion and force them to always be positive
     sensorVal = abs(modifiedMap(sensorVal,sensorValLow, sensorValHigh, 0, 300));

     #ifdef debug
     Serial.print("MapF Value: ");
     Serial.println(sensorVal);
     #endif

     sensorVal = constrain(sensorVal,0,300);

     #ifdef debug
          Serial.print("constrain Value: ");
          Serial.println(sensorVal);
     #endif


     #ifdef debug
          Serial.print("SenLow: ");
          Serial.println(sensorValLow);
          Serial.print("SenHigh: ");
          Serial.println(sensorValHigh);          
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


     sensorValCalibrated = round(sensorValCalibrated);

     #ifdef debug
          Serial.print("Round :"); 
          Serial.println(sensorValCalibrated);
     #endif 

     byte hundreds = sensorValCalibrated / 100;
     byte  tens = (sensorValCalibrated % 100) / 10;
     byte  ones = sensorValCalibrated % 10;

 #ifdef debug
     Serial.print(" Hundred: ");
     Serial.println(hundreds);
     Serial.print(" tens: ");
     Serial.println(tens);
     Serial.print(" ones: ");
     Serial.println(ones);
#endif

     EEPROM.update(0,hundreds);
     EEPROM.update(1,tens);
     EEPROM.update(2,ones);

     #ifdef debug
     Serial.print("EEPROM Read :"); 
     Serial.println(EEPROM.read(0));
     Serial.print("EEPROM Read :"); 
     Serial.println(EEPROM.read(1));
     Serial.print("EEPROM Read :"); 
     Serial.println(EEPROM.read(2));
     

     Serial.print("EEprom Combine: ");
     Serial.println(EEPROM.read(0) * 100 + EEPROM.read(1) * 10 + EEPROM.read(2));
#endif
    return  sensorValCalibrated;

 }

