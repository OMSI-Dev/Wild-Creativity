#include <pin_define.h>
///#define debug
//Sensor varibles 
const int numReadings = 10;

double readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
double total = 0;                  // the running total

double sensorVal = 0;
double lowVal = 4500;
double highVal = 3955;
double lowValBaseline = 4100;
double highValBaseline = 3960;
double scalar = 7.75;

bool zeroFlag = true;

//calibration timer
MoToTimer calTimer;

double modifiedMap(double x, double in_min, double in_max, double out_min, double out_max)
{
double temp = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
temp = (int) (4*temp + .5);
return (double) temp/4;
}

//establish the new Zero before turning on fans
//this is the result of the sesnor never returning to the same spot.
int findZero()
{   
    total = total - readings[readIndex]; 
    readings[readIndex] = analogRead(sensorIn); 
    total = total + readings[readIndex];
    readIndex = readIndex + 1;

    if (readIndex >= numReadings) {
        readIndex = 0;
    }

    sensorVal = (total / numReadings) * scalar; 

    if (sensorVal < lowVal && sensorVal > lowValBaseline )  //~4280 = -90
     {
        //map  lowest value to lowest sensor
        //lowVal is a LARGE number 
        //closer to 0 is more force being exerted on the sensor
        #ifdef debug
        Serial.println("Sensor low Value updated...");
        #endif
        lowVal = sensorVal;
     }
     
    #ifdef debug
     Serial.print("Current Sensor: ");
     Serial.println(sensorVal);
     #endif

}

void Calibration()
{
        calTimer.setTime(1000);
        do
        {
            #ifdef debug
            Serial.print("Finding zero...");
            Serial.println(zeroFlag);
            #endif
            findZero();
            digitalWrite(fanPin, LOW);
        } while (calTimer.running());

}

void sensorUpdate()
{

    //Smooth out the sensor value   
    total = total - readings[readIndex]; 
    readings[readIndex] = analogRead(sensorIn); 
    total = total + readings[readIndex];
    readIndex = readIndex + 1;
    
    if (readIndex >= numReadings) {
        readIndex = 0;
    }
    //Average out real data and multiply to give a wider
    //range for better granularity
    sensorVal = (total / numReadings) * scalar; 
    
    #ifdef debug
    Serial.print("Sensor Avg: ");
    Serial.println(sensorVal);
    Serial.print("Before Low Value:");
    Serial.println(lowVal);  
    Serial.print("Before High Value:");
    Serial.println(highVal);  
    #endif


    if (highVal > sensorVal && sensorVal > highValBaseline) // ~3965 = +90
    {
        highVal = sensorVal;     
    }

    #ifdef debug
    Serial.print("After Low Value:");
    Serial.println(lowVal);  
    Serial.print("After High Value:");
    Serial.println(highVal);      
    #endif
    //map the sensor to the calibration settings    
    sensorVal = constrain(sensorVal, highVal, lowVal  );
    //  Serial.print("Constrain Val: ");
    //  Serial.println(sensorVal);

    //map(value, fromLow, fromHigh, toLow, toHigh)
    sensorVal = round(modifiedMap(sensorVal,lowVal,highVal, -90.00,90.00));
    #ifdef debug
    Serial.print("Mapped Avg: ");
    Serial.println(sensorVal); 
    #endif
}