#include <definitions.h>

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
         #ifdef debug      
         Serial.print("light attractor ");
         #endif
                         
    }

void lightWin()
{
        Serial.print(" entering bugchase: ");
        if(bugchase.running() != true)
        {
           
            Bseq[bugflag]=CRGB::Red;   // 9:1 led
            fadeToBlackBy(Bseq,bug_led,50);
            bugchase.setTime(bugtime);
            
            if(bugflag > bug_led-1)
            { bugflag = 0; 
              Bseq.fill_solid(CRGB::Black);
            }

            #ifdef debug
            Serial.print("bugflag: ");
            Serial.println(bugflag);
            #endif
            bugflag++;
        }
        Serial.println("exiting bugchase: ");

        Serial.print(" entering fnchase: ");
        if(fnchase.running() != true)
        {
            
            Nseq[fnflag] = CRGB::Teal; // 4:1  led 
            Fseq[fnflag] = CRGB::Orange; // 4:1 led
            fadeToBlackBy(Nseq,Nut_led,50);
            fadeToBlackBy(Fseq,flower_led,50);
            
            

            if(fnflag > flower_led-1)
            {  fnflag =0;
               Nseq.fill_solid(CRGB::Black);
               Fseq.fill_solid(CRGB::Black); 
            }

            
            #ifdef debug 
            Serial.print("fnflag: ");
            Serial.println(fnflag);
            #endif

        } 
            Serial.println("exiting fnchase: ");
       
            Serial.print(" entering puckchase: ");
        if(puckchase.running() == false)
        {   
            Humseq[puckflag]=CRGB::Orange;
            Treeseq[puckflag]=CRGB::Red;  
            Finseq[puckflag]=CRGB::Teal;            
            fadeToBlackBy(Humseq,puck_led,100);
            fadeToBlackBy(Treeseq,puck_led,100);
            fadeToBlackBy(Finseq,puck_led,100);

            if (puckflag > puck_led-1 )
            {   
                Serial.println(puckflag);
                puckflag = 0;
                Humseq.fill_solid(CRGB::Black);
                Treeseq.fill_solid(CRGB:: Black);
                Finseq.fill_solid(CRGB:: Black);
                Serial.println("clear");
            }
            puckchase.setTime(pucktime);
            puckflag++; 
            #ifdef debug
            Serial.print("puckflag: ");
            Serial.println(puckflag);
            #endif
        }
        Serial.println(" exiting puckchase: ");
        FastLED.show();
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