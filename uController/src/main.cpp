#include <gameMode.h>

int fadeRate = 20;

//button variables
bool bugState,flowerState,nutState;
Bounce2::Button nutBtn = Bounce2::Button();
Bounce2::Button flowerBtn = Bounce2::Button();
Bounce2::Button bugBtn = Bounce2::Button();


void setup() 
{

audioOut.begin();
nutBtn.attach(nutPin, INPUT_PULLUP);
nutBtn.interval(5);
nutBtn.setPressedState(LOW);

flowerBtn.attach(flowerPin, INPUT_PULLUP);
flowerBtn.interval(5);
flowerBtn.setPressedState(LOW);

bugBtn.attach(bugPin, INPUT_PULLUP);
bugBtn.interval(5);
bugBtn.setPressedState(LOW);

FastLED.addLeds<NEOPIXEL,nutLight>(Nseq, Nut_led);
FastLED.addLeds<NEOPIXEL,flowerLight>(Fseq, flower_led);
FastLED.addLeds<NEOPIXEL,bugLight>(Bseq, bug_led);
FastLED.addLeds<NEOPIXEL,Treecreeper_Light>(Treeseq, puck_led);
FastLED.addLeds<NEOPIXEL,Hummingbird_Light>(Humseq, puck_led);
FastLED.addLeds<NEOPIXEL,Finch_Light>(Finseq, puck_led);

FastLED.setMaxPowerInVoltsAndMilliamps(5,15000);
FastLED.show();

//starts all timers they will reset themselves when they are first used
lightTime.setTime(lightDelay);

//hard delay to give the wavtrigger time to startup
delay(1000);

#ifdef debug 
Serial.begin(9600);
#endif

#ifdef debug 
Serial.println("exiting setup");
#endif

  Nseq.fill_solid(teal);
  Finseq.fill_solid(teal);
  FastLED.show();
  delay(1000);
  Nseq.fill_solid(CRGB::Black);
  Finseq.fill_solid(CRGB::Black);
  FastLED.show();
  Bseq.fill_solid(red);
  Treeseq.fill_solid(red);
  FastLED.show();
  delay(1000);
  Bseq.fill_solid(CRGB::Black);
  Treeseq.fill_solid(CRGB::Black);
  FastLED.show();
  Fseq.fill_solid(orange);
  Humseq.fill_solid(orange);
  FastLED.show();
  delay(1000);
  Humseq.fill_solid(CRGB::Black);
  Fseq.fill_solid(CRGB::Black);
  FastLED.show();
}

void btnCheck()
{
  nutBtn.update();
  flowerBtn.update();
  bugBtn.update();

  bugState = bugBtn.isPressed();
  nutState = nutBtn.isPressed();
  flowerState = flowerBtn.isPressed();

 #ifdef debug
  Serial.print("Nut: ");
  Serial.println(nutBtn.isPressed());
 #endif

}

void loop() 
{
 btnCheck();
//Checks if the nut button has been pressed
//Checks if the game has already started
//updates points and triggered status
   if(nutState == true)
 {
   if(gameState == false)
   {
     //update to start game
    Humseq.fill_solid(CRGB::Black);
    Treeseq.fill_solid(CRGB::Black);
    Finseq.fill_solid(CRGB::Black);
    Bseq.fill_solid(CRGB::Black);
    Fseq.fill_solid(CRGB::Black);
    Nseq.fill_solid(CRGB::Black);
    FastLED.show();
     gameState = true;
     audioOut.stopTrack(1);
     gameTimer.setTime(gameTime); 
   }
   else if(nutTriggered == false)
   { 
       //update buttons triggered status
       nutTriggered = true;
       //update points
       points = points + 1;
       audioOut.playTrack(2);
        Nseq.fill_solid(teal);
        Finseq.fill_solid(teal); 
       FastLED.show();
       #ifdef debug
       Serial.println("Nut button Pressed & registered");
       Serial.print("Current Points: ");
       Serial.println(points);
       Serial.print("Nut button trigged status: ");
       Serial.println(nutTriggered);
       #endif                
   }     
 }
 //Checks if the flower button has been pressed
 //Checks if the game has already started
 //updates points and triggered status
 if(flowerState == true)
 {
   if(gameState == false)
   {
     //update to start game
     Humseq.fill_solid(CRGB::Black);
     Treeseq.fill_solid(CRGB::Black);
     Finseq.fill_solid(CRGB::Black);
     Bseq.fill_solid(CRGB::Black);
     Fseq.fill_solid(CRGB::Black);
     Nseq.fill_solid(CRGB::Black);
     FastLED.show();
     gameState = true;
     audioOut.stopTrack(1);
     gameTimer.setTime(gameTime);
   }
   else if(flowerTriggered == false)
   { 
       //update buttons triggered status
       flowerTriggered = true;
       //update points
       points = points + 1;
       audioOut.playTrack(3);
       Fseq.fill_solid(orange);
       Humseq.fill_solid(orange);
       FastLED.show();
       #ifdef debug
       Serial.println("Flower button Pressed & registered");
       Serial.print("Current Points: ");
       Serial.println(points);
       Serial.print("Flower button trigged status: ");
       Serial.println(flowerTriggered);
       #endif    
   }
 }
 //Checks if the bug button has been pressed
 //Checks if the game has already started
 //updates points and triggered status
 if(bugState == true)
 {
   if(gameState == false)
   {
     //update to start game
    Humseq.fill_solid(CRGB::Black);
    Treeseq.fill_solid(CRGB::Black);
    Finseq.fill_solid(CRGB::Black);
    Bseq.fill_solid(CRGB::Black);
    Fseq.fill_solid(CRGB::Black);
    Nseq.fill_solid(CRGB::Black);
    FastLED.show();

     gameState = true;
     audioOut.stopTrack(1);
     gameTimer.setTime(gameTime); 
   }
   else if(bugTriggered == false)
   { 
       //update buttons triggered status
       bugTriggered = true;
       //update points
       points = points + 1;
       audioOut.playTrack(4);
       Bseq.fill_solid(red);
       Treeseq.fill_solid(red);
       FastLED.show();
       #ifdef debug
       Serial.println("Bug button Pressed & registered");
       Serial.print("Current Points: ");
       Serial.println(points);
       Serial.print("Bug button trigged status: ");
       Serial.println(bugTriggered);
       #endif   
   } 
 
 }
 //if they earn enough points by the game time
 // win sequence starts and resets
 if(points == pointMax)
 {
   
   if(winAudioTimerFlag == true)
   {
     //restart the game timer rather than stopping or it trips an early restart
     //
     gameTimer.restart();
     winAudioTimer.setTime(1500);
     winAudioTimerFlag = false;
     #ifdef debug
     Serial.println(" ");      
     Serial.println("Game won!");
     Serial.print("winAudioTimerFlag: ");
     Serial.println(winAudioTimerFlag);
     Serial.print("winAudioTimer running: ");
     Serial.println(winAudioTimer.running());
     #endif       
   }
   #ifdef debug
   Serial.println(" ");
   Serial.println("Start win Sequence!");
   Serial.print("stopOnce: ");
   Serial.println(stopOnce);
   Serial.print("winPlayOnce: ");
   Serial.println(winPlayOnce);
   Serial.print("winAudioTimer running: ");
   Serial.println(winAudioTimer.getTime());
   Serial.println(" ");
   #endif 
   //play win sound
   if(winAudioTimer.running() == false)
   {
       #ifdef debug
       Serial.println(" ");
       Serial.print("resetFlag: ");
       Serial.println(resetFlag);    
       Serial.print("winAudioTimer running: ");
       Serial.println(winAudioTimer.running());
       Serial.println(" ");
       #endif
     if(stopOnce == true)
     {
     audioOut.stopAllTracks(); 
     stopOnce = false;  
     }
     if(winPlayOnce == true)
     {
     audioOut.playTrack(5);
     winPlayOnce = false;
     resetTimer.setTime(resetTime);
     resetFlag = true; 
     //turn off LEDS in prep for win seq
    Humseq.fill_solid(CRGB::Black);
    Treeseq.fill_solid(CRGB::Black);
    Finseq.fill_solid(CRGB::Black);
    Bseq.fill_solid(CRGB::Black);
    Fseq.fill_solid(CRGB::Black);
    Nseq.fill_solid(CRGB::Black);      
     }
   }
     //win sequence
     if(winPlayOnce == false)
     {
     lightWin();
         
     }
     //reset game after win seq times out
     if (!resetTimer.running()&& resetFlag == true)
     {
       Serial.println("Game Restarting");
       resetGame();      
     }
 }

 if(gameState == false)
 {
   #ifdef debug
   Serial.println(" going to attract");
   #endif

   lightAttract();
 }
 if(gameTimer.running() == false && gameState == true)
 {
   resetGame();
 }

FastLED.show();

}