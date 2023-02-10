#include <Arduino.h>
#include <bounce2.h>
#include <audio/AudioOut.h>
#include <MoToTimer.h>
#include <pulse.h>

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
int lightDelay = 5000;

int previouslight = 1;
bool newNum = 1;
bool numUpdate =1;

//pulse
Pulse bugLightPWM;
Pulse flowerLightPWM;
Pulse nutLightPWM;

//enable to have serial debug
//#define debug