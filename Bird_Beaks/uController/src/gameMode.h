#include <definitions.h>

void ledsetuo()
{











}


void lightAttract()
{   
     if(lightNumUpdate.running() == false)
     {
        //find a number between 1 and 3 while lightnum and previous light are equal
        do{lightNum = random(1,4);}
        while(lightNum == previouslight);
       //new # is found and previouslight is now updated
        previouslight = lightNum;
       lightNumUpdate.setTime(lightNumUpdateDelay);
       }

    switch(lightNum)
    {
        //turn on treecreeper and bug light 
        case 1:
        Treeseq.fill_solid(CRGB::Red);
        fadeToBlackBy(Nseq,Nut_led,10);
        fadeToBlackBy(Bseq,bug_led,10);
        fadeToBlackBy(Fseq,flower_led,10);

        fadeToBlackBy(Treeseq,puck_led,10);
        fadeToBlackBy(Finseq,puck_led,10);
        fadeToBlackBy(Humseq,puck_led,10);
        FastLED.show();
             #ifdef debug      
            Serial.println("case 1 ");
            #endif   
            break;
        // turn on hummingbird and flower light
        case 2:
            Humseq.fill_solid(CRGB::Orange);
            fadeToBlackBy(Nseq,Nut_led,10);
            fadeToBlackBy(Bseq,bug_led,10);
            fadeToBlackBy(Fseq,flower_led,10);

            fadeToBlackBy(Treeseq,puck_led,10);
            fadeToBlackBy(Finseq,puck_led,10);
            fadeToBlackBy(Humseq,puck_led,10);
            FastLED.show();
              #ifdef debug      
       Serial.println("case 2 ");
              #endif
            break;
        //turns on finch and nut light 
        case 3:
            Finseq.fill_solid(CRGB::Teal);
           fadeToBlackBy(Nseq,Nut_led,10);
           fadeToBlackBy(Bseq,bug_led,10);
           fadeToBlackBy(Fseq,flower_led,10);
           fadeToBlackBy(Treeseq,puck_led,10);
           fadeToBlackBy(Finseq,puck_led,10);
           fadeToBlackBy(Humseq,puck_led,10);
            FastLED.show();
              #ifdef debug      
            Serial.println("case 3 ");
            #endif
            break;
    }
        // #ifdef debug      
        // Serial.print("light attractor ");

        // #endif   

         
         Ledchange.setTime(ledchangetime);
                         
    }


void lightWin()
{
    if(winTimer.running() == false)
    {
        winTimer.setTime(winLightDelay);    


        if(lightchase.running()==false)
        {    
         

         Nseq[Nut_led]=CRGB::Teal;
         Bseq[bug_led]=CRGB::Red;
         Fseq[flower_led]=CRGB::Orange;
         Humseq[puck_led]=CRGB::Orange;
         Treeseq[puck_led]=CRGB::Red;
         Finseq[puck_led]=CRGB::Teal;
         FastLED.show();


        }

    }

 }

void resetGame()
{
         
//turn all the lights off       
Nseq[Nut_led]=CRGB::Black;
Bseq[bug_led]=CRGB::Black;
Fseq[flower_led]=CRGB::Black;
Treeseq[puck_led]=CRGB::Black;
Humseq[puck_led]=CRGB::Black;
Finseq[puck_led]=CRGB::Black;
FastLED.show();



//reset triggerd values
nutTriggered = false;
flowerTriggered = false;
bugTriggered = false;


//set gameState to off && points to 0
gameState = false;
points = 0;

//allow audio to be played again
playOnce = true;
winPlayOnce = true;
winAudioTimerFlag = true;
stopOnce = true;

//set reset to off
resetFlag = false;

#ifdef debug
 Serial.println(" ");
Serial.println("**********Resetting Game****************");
Serial.print("nutTriggered: ");
Serial.println(nutTriggered);
Serial.print("flowerTriggered: ");
Serial.println(flowerTriggered);
Serial.print("bugTriggered: ");
Serial.println(bugTriggered);
Serial.print("gameState: ");
Serial.println(gameState);
Serial.print("points: ");
Serial.println(points);
Serial.print("playOnce: ");
Serial.println(playOnce);
Serial.print("winPlayOnce: ");
Serial.println(winPlayOnce);
Serial.print("winAudioTimerFlag: ");
Serial.println(winAudioTimerFlag);
Serial.print("stopOnce: ");
Serial.println(stopOnce);
Serial.print("resetFlag: ");
Serial.println(resetFlag);
Serial.println("**************Game Finished resetting************");
 Serial.println(" ");

#endif   




}