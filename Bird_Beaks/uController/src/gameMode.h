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
       bugLightPWM.update(1);
       nutLightPWM.update(0);
       flowerLightPWM.update(0);       
        break;

    case 1:
       bugLightPWM.update(0);
       nutLightPWM.update(1);
       flowerLightPWM.update(0);              
        break;

    case 2:
       bugLightPWM.update(0);
       nutLightPWM.update(0);
       flowerLightPWM.update(1);       
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
        digitalWrite(nutLight, HIGH);
        digitalWrite(flowerLight,LOW);
        digitalWrite(bugLight,LOW);
        break;

    case 1:
        digitalWrite(nutLight, LOW);
        digitalWrite(flowerLight,HIGH);
        digitalWrite(bugLight,LOW);
        break;

    case 2:
        digitalWrite(nutLight, LOW);
        digitalWrite(flowerLight,LOW);
        digitalWrite(bugLight,HIGH); 
        break;
    }

}

void resetGame()
{
//turn all the lights off       
digitalWrite(nutLight, 0);
digitalWrite(flowerLight,0);
digitalWrite(bugLight,0);

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

}