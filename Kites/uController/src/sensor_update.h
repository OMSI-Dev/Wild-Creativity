#include pin_define.h
//Sensor varibles 
const int numReadings = 30;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total

float sensorVal = 0;

void sensorUpdate(){
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
 sensorVal = (total / numReadings) * 2.25; 
//  Serial.print("Sensor Avg: ");
//  Serial.println(sensorVal);
 //map the sensor to the calibration settings
 sensorVal = constrain(sensorVal, 1035.00, 1199.25);
//  Serial.print("Constrain Avg: ");
//  Serial.println(sensorVal);
 sensorVal = map(sensorVal,1035.00, 1199.25, 90, -90);
//  Serial.print("Mapped Avg: ");
//  Serial.println(sensorVal); 
}