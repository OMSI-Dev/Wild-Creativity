#include <Arduino.h>
#include <bounce2.h>
#include <audio/AudioOut.h>
#include <MoToTimer.h>
#include <FastLED.h>

AudioOut audioOut;
//ws2811 or ws2812 for leds 

//Pin definintions Input
#define nutPin 4
#define flowerPin 8
#define bugPin 6


//Neopixel Data Pin
#define nutLight 10
#define flowerLight 7
#define bugLight 9

#define Treecreeper_Light 3
#define Hummingbird_Light 2
#define Finch_Light 5



//neopixel setup
#define puck_led 18
#define bug_led 133
#define Nut_led 90
#define flower_led 110
CRGBArray <Nut_led> Nseq;
CRGBArray <bug_led> Bseq;
CRGBArray <flower_led> Fseq;
CRGBArray <puck_led> Treeseq;
CRGBArray <puck_led> Humseq;
CRGBArray <puck_led> Finseq;


//audio defines
#define attractor 1
#define nut 2
#define flower 03
#define win 4
#define bug 5

//game variables 
bool gameState = false;
bool nutTriggered=false, flowerTriggered=false, bugTriggered=false; 

byte points = 0;
byte pointMax = 3;

MoToTimer gameTimer;
MoToTimer resetTimer;
MoToTimer audioWinTimer;
MoToTimer winTime;

int gameTime = 30000; //30 secs time in ms
int resetTime = 5000;
int audioWinTime = 1000;

bool resetFlag = false;
bool playOnce = true;
bool winPlayOnce = true;
bool winAudioTimerFlag = true;
bool stopOnce = true;

//lightFunctions
byte lightNum = 0;

MoToTimer lightTime;
MoToTimer fnchase;
MoToTimer puckchase;
MoToTimer bugchase;


byte puckflag = 0;
byte fnflag = 0;
byte bugflag = 0;
byte pucktime = 105;
byte fntime = 25;
byte bugtime = 10; 


//this timer runs until the win sequence should end
MoToTimer winTimer;
//this addes a short delay before triggering the win sequence.
MoToTimer winAudioTimer;

//this timer update the random number
MoToTimer lightNumUpdate;
int lightNumUpdateDelay = 1000;

#define lightDelay 7000
byte previouslight = 1;
byte beforeprevious =0;

//enable to have serial debug
//#define debug

CRGB orange(255, 140, 0);//humming
CRGB red(139, 0, 0);//tree creeper
CRGB teal(0,220,40); //finch
/*
hummingbird == f79340
tree creeper == f04934
finch == 04a391
*/