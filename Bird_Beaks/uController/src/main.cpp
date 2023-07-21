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
nutBtn.interval(1);
nutBtn.setPressedState(LOW);

flowerBtn.attach(flowerPin, INPUT_PULLUP);
flowerBtn.interval(1);
flowerBtn.setPressedState(LOW);

bugBtn.attach(bugPin, INPUT_PULLUP);
bugBtn.interval(1);
bugBtn.setPressedState(LOW);

FastLED.addLeds<NEOPIXEL,nutLight>(Nseq, Nut_led);
FastLED.addLeds<NEOPIXEL,flowerLight>(Fseq, flower_led);
FastLED.addLeds<NEOPIXEL,bugLight>(Bseq, bug_led);
FastLED.addLeds<NEOPIXEL,Treecreeper_Light>(Treeseq, puck_led);
FastLED.addLeds<NEOPIXEL,Hummingbird_Light>(Humseq, puck_led);
FastLED.addLeds<NEOPIXEL,Finch_Light>(Finseq, puck_led);

FastLED.setMaxPowerInVoltsAndMilliamps(5,17000);
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
}

void btnCheck()
{
  nutBtn.update();
  flowerBtn.update();
  bugBtn.update();

  bugState = bugBtn.isPressed();
  nutState = nutBtn.isPressed();
  flowerState = flowerBtn.isPressed();

  Serial.print("NUt: ");
  Serial.println(nutBtn.isPressed());
}

void loop() 
{
 

  /* TEMP CODE
  !!!!!!!!!!!!!!!!!!!Delete after implamenting final code!!!!!!!!!!!!!!!!!!!!!

  */

  btnCheck();

  if(bugState)
  {
    Bseq.fill_solid(red);
    Treeseq.fill_solid(red);\
    digitalWrite(13,HIGH);
  }

  if (nutState)
  {
  Nseq.fill_solid(teal);
  Finseq.fill_solid(teal);
  }

  if (flowerState)
  {
    Fseq.fill_solid(orange);
    Humseq.fill_solid(orange);
  }

  if(!bugState)
  {
    Bseq.fill_solid(CRGB::Black);
    Treeseq.fill_solid(CRGB::Black);
    digitalWrite(13,LOW);
  }

  if (!nutState)
  {
  Nseq.fill_solid(CRGB::Black);
  Finseq.fill_solid(CRGB::Black);
  }

  if (!flowerState)
  {
    Fseq.fill_solid(CRGB::Black);
    Humseq.fill_solid(CRGB::Black);
  }

  

  FastLED.show();

Serial.println(nutState);


}