#include <definitions.h>

void lightAttract()
{   
     if(lightNumUpdate.running() == false)
     {
        //find a number between 1 and 3 while lightnum and previous light are equal
        do{lightNum = random(1,4);}
        while(lightNum == previouslight && beforeprevious==previouslight);
       //new # is found and previouslight is now updated
        beforeprevious = previouslight;
        previouslight = lightNum;

       lightNumUpdate.setTime(lightNumUpdateDelay);
       }

    switch(lightNum)
    {
        //turn on treecreeper and bug light 
        case 1:
        Treeseq.fill_solid(red);
        Bseq.fill_solid(red);
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
            Humseq.fill_solid(orange);
            Fseq.fill_solid(orange);
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
            Finseq.fill_solid(teal);
            Nseq.fill_solid(teal);
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
        if(!bugchase.running())
        {
            bugchase.setTime(bugtime);
            
            if(bugflag > bug_led-1)
            { bugflag = 0; }

            Bseq[bugflag]=red;  // 9:1 led
            fadeToBlackBy(Bseq,bug_led,20);
            #ifdef debug
            Serial.print("bugflag: ");
            Serial.println(bugflag);
            #endif
            bugflag++;
        }
        Serial.println("exiting bugchase: ");

        Serial.print(" entering fnchase: ");
        if(!fnchase.running())
        {
            if(fnflag > flower_led-1)
            {  fnflag =0; }

         Nseq[fnflag] = teal; // 4:1  led 
         Fseq[fnflag] = orange; // 4:1 led
         fadeToBlackBy(Nseq,Nut_led,20);
         fadeToBlackBy(Fseq,flower_led,20);

            #ifdef debug 
            Serial.print("fnflag: ");
            Serial.println(fnflag);
            #endif
            fnflag++;
        } 
        Serial.println("exiting fnchase: ");

        Serial.print(" entering puckchase: ");
        if(!puckchase.running())
        {   
            if(puckflag > puck_led-1)
            { puckflag = 0;  }
            if (puckflag < 1)
            {
                Humseq[puckflag]= orange;
                Treeseq[puckflag]= red;
                Finseq[puckflag]=teal;
                fadeToBlackBy(Humseq,puck_led,20);
                fadeToBlackBy(Treeseq,puck_led,20);
                fadeToBlackBy(Finseq,puck_led,20); 
            } 
            if(puckflag>=1 && puckflag< puck_led-1){
                Humseq[puckflag]= orange;
                Humseq[puckflag-1]= orange;
                Treeseq[puckflag]= red;
                Treeseq[puckflag-1]= red;  
                Finseq[puckflag]=teal;
                Finseq[puckflag-1]=teal;
                fadeToBlackBy(Humseq,puck_led,20);
                fadeToBlackBy(Treeseq,puck_led,20);
                fadeToBlackBy(Finseq,puck_led,20); 
            }       
            puckchase.setTime(pucktime);
            #ifdef debug
            Serial.print("puckflag: ");
            Serial.println(puckflag);
            #endif
            puckflag++;
        }
        Serial.println(" exiting puckchase: ");

        FastLED.show();
    }

void resetGame()

{         
//turn all the lights off       
Nseq.fill_solid(CRGB::Black);
Bseq.fill_solid(CRGB::Black);
Fseq.fill_solid(CRGB::Black);
Treeseq.fill_solid(CRGB::Black);;
Humseq.fill_solid(CRGB::Black);;
Finseq.fill_solid(CRGB::Black);;
FastLED.show();

//reset winseq flags
bugflag = 0;
fnflag = 0;
puckflag = 0;

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
