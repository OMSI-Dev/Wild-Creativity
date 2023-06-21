#include <Arduino.h>
#include <bounce2.h>
#include <audio/AudioOut.h>
#include <MoToTimer.h>

AudioOut audioOut;

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
//this timer runs until the win sequence should end
MoToTimer winTimer;
//this addes a short delay before triggering the win sequence.
MoToTimer winAudioTimer;

//this timer update the random number
MoToTimer lightNumUpdate;
int lightNumUpdateDelay = 1000;

int winLightDelay = 225;
int lightDelay = 7000;

int previouslight = 1;
bool newNum = 1;
bool numUpdate =1;

//enable to have serial debug
#define debug