#include <pin_define.h>

const int numReadings = 30;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total

int sensorVal = 0;

void sensorUpdate(){
  //Smooth out the sensor value   
  total = total - readings[readIndex]; 
  readings[readIndex] = analogRead(sensorIn); 
  total = total + readings[readIndex];
  readIndex = readIndex + 1;
  
  if (readIndex >= numReadings) {
       readIndex = 0;
  }
 sensorVal = total / numReadings;
//  Serial.print("Sensor Avg: ");
//  Serial.println(sensorVal);
 //map the sensor to the calibration settings
 sensorVal = constrain(sensorVal, 200, 500);
//  Serial.print("Constrain Avg: ");
//  Serial.println(sensorVal);
 sensorVal = map(sensorVal,200, 500, 0, 300);
//   Serial.print("Mapped Avg: ");
//  Serial.println(sensorVal);
}