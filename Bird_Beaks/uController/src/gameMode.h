#include <definitions.h>


void lightAttract()
{   


    if(lightNumUpdate.running() == false)
    {
        do{
        lightNum = random(0,3);        
        }while(lightNum == previouslight);
        previouslight = lightNum;
        
        #ifdef debug      
        Serial.print("lightNum: ");
        Serial.println(lightNum);
        #endif   
        
        lightNumUpdate.setTime(lightNumUpdateDelay);
                         
    }

    switch(lightNum) 
    {     
    case 0:

        break;

    case 1:
       
        break;

    case 2:
     
        break;
    }
}

void lightWin()
{
    if(winTimer.running() == false)
    {
        winTimer.setTime(winLightDelay);    
        lightNum = random(0,3);
    }

    switch(lightNum) 
    {     
    case 0:

        break;

    case 1:

        break;

    case 2:

        break;
    }

}

void resetGame()
{
         
//turn all the lights off       


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