#include <Arduino.h>
#include <bounce2.h>
#include <audio/AudioOut.h>
#include <MoToTimer.h>
AudioOut audioOut;

//Pin definintions
#define nutPin 7
#define flowerPin 12
#define bugPin 13

#define nutLight 9
#define flowerLight 10
#define bugLight 11

//audio defines
#define attractor 1
#define nut 2
#define flower 03
#define win 4
#define bug 5

//game variables 
bool gameState = false;
bool nutTriggered, flowerTriggered, bugTriggered; 
byte points = 0;
byte pointMax = 3;
MoToTimer gameTimer;
MoToTimer resetTimer;
MoToTimer audioWinTimer;
int gameTime = 30000; //30 secs time in ms
int resetTime = 5000;
int audioWinTime = 1000;
bool resetFlag = false;
bool playOnce = false;
bool winPlayOnce = false;
//lightFunctions
byte lightNum = 0;
MoToTimer lightTime;
MoToTimer winTimer;
int winLightDelay = 100;
int lightDelay = 40;
int previouslight = 1;
bool newNum = false;

//enable to have serial debug
//#define debug