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

CRGBArray <numofLEDS> tubelight;         // creating the LED array 

//creating subarray
#define tube1aled 11
#define tube1bled 10
#define tube1cled 10
#define tube1dled 10
#define tube1eled 10
#define tube1fled 10
#define tube1gled 10
#define tube1hled 10
#define tube1iled 11

//spliting into logical strips
CRGB* tube1a = &tubelight[0];
CRGB* tube1b = &tubelight[tube1aled];
CRGB* tube1c = &tubelight[tube1aled+tube1bled];
CRGB* tube1d = &tubelight[tube1aled+tube1bled+tube1cled];
CRGB* tube1e = &tubelight[tube1aled+tube1bled+tube1cled+tube1dled];
CRGB* tube1f = &tubelight[tube1aled+tube1bled+tube1cled+tube1dled+tube1eled];
CRGB* tube1g = &tubelight[tube1aled+tube1bled+tube1cled+tube1dled+tube1eled+tube1fled];
CRGB* tube1h = &tubelight[tube1aled+tube1bled+tube1cled+tube1dled+tube1eled+tube1fled+tube1gled];
CRGB* tube1i = &tubelight[tube1aled+tube1bled+tube1cled+tube1dled+tube1eled+tube1fled+tube1gled+tube1hled];
//#define debugcalc
