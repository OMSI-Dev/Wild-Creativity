#include <pin_define.h>
//Sensor varibles 
const int numReadings = 20;

double readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
double total = 0;                  // the running total

double sensorVal = 0;
double lowVal = 4500;
double highVal = 3955;
double lowValBaseline = 4100;
double highValBaseline = 3960;

double modifiedMap(double x, double in_min, double in_max, double out_min, double out_max)
{
double temp = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
temp = (int) (4*temp + .5);
return (double) temp/4;
}


void sensorUpdate(){
//   //Smooth out the sensor value   
  total = total - readings[readIndex]; 
  readings[readIndex] = analogRead(sensorIn); 
  total = total + readings[readIndex];
  readIndex = readIndex + 1;
  
  if (readIndex >= numReadings) {
       readIndex = 0;
  }
  //Average out real data and multiply to give a wider
  //range for better granularity
 sensorVal = (total / numReadings) * 8.25; 
// Serial.print("Sensor Avg: ");
// Serial.println(sensorVal);
// Serial.print("Before Low Value:");
// Serial.println(lowVal);  
// Serial.print("Before High Value:");
// Serial.println(highVal);  

 if (sensorVal < lowVal && sensorVal > lowValBaseline )  //~4280 = -90
     {
     //map  lowest value to lowest sensor
     //lowVal is a LARGE number
     //closer to 0 is more force being exerted on the sensor
     //Serial.println("Sensor low Value updated...");
     lowVal = sensorVal;
     }

 if (highVal > sensorVal && sensorVal > highValBaseline) // ~3965 = +90
 {
     highVal = sensorVal; 
   
 }

     // Serial.print("After Low Value:");
     // Serial.println(lowVal);  
     // Serial.print("After High Value:");
     // Serial.println(highVal);  
 //map the sensor to the calibration settings
 sensorVal = constrain(sensorVal, highVal, lowVal  );
//  Serial.print("Constrain Val: ");
//  Serial.println(sensorVal);

//map(value, fromLow, fromHigh, toLow, toHigh)
 sensorVal = round(modifiedMap(sensorVal,lowVal,highVal, -90.00,90.00));
//  Serial.print("Mapped Avg: ");
//  Serial.println(sensorVal); 
}