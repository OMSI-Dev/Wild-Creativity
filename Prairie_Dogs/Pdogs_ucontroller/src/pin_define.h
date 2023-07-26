#include <FastLED.h>

//pin definitions 
#define startBtnPin 3
#define startBtnPWM 11
#define calBtnPin 5

//fan output
#define fanpin 12
//Sensor varibles 
#define sensorIn 18
#define numofLEDS 20
#define RGB_pin 9

CRGBArray<numofLEDS> tubelight;         // creating the LED array 

#define debug