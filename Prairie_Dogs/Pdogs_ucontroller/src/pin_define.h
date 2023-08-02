#include <FastLED.h>

//pin definitions 
#define startBtnPin 3
#define startBtnPWM 11
#define calBtnPin 5

//fan output
#define fanpin 12


//Sensor varibles 
#define sensorIn 18
float alpha = 0.04; // Adjust as needed: Larger number greater spikes. Smaller number less spikes.
float ema = 0.00; // This will store the Exponential Moving Average
byte sensorCount = 0;

//LED 
#define numofLEDS 92
#define RGB_pin 9

CRGBArray<numofLEDS> tubelight;         // creating the LED array 

//#define debugcalc
