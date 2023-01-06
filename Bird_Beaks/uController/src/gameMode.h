#include <definitions.h>
byte i=25;

void lightAttract()
{   
     
    if(newNum == true)
    {
        do{
        lightNum = random(0,3);
        }while(lightNum == previouslight);
        newNum = false;         
    }

    switch(lightNum) 
    {     
    case 0:
        if(i<=250)
        {
            if (lightTime.running()== false ) 
            {
                analogWrite(nutLight, i);    
                lightTime.restart();
                previouslight = lightNum;
                i++;
            }else(analogWrite(nutLight, i));

            if(i >= 250)
            {
                newNum = true;
                i=25;
                analogWrite(nutLight, 0);                                
            }

        }        
        break;

    case 1:
        if(i<=250)
        {          
            if (lightTime.running()== false) 
            {
                analogWrite(flowerLight, i);    
                lightTime.restart();
                previouslight = lightNum;
                i++;

            }else(analogWrite(flowerLight, i));

            if(i >= 250)
            {
                newNum = true;
                i=25;
                analogWrite(flowerLight, 0);                   
            }
        }      
        break;

    case 2:
        if(i<=250)
        {         
            if (lightTime.running() == false) 
            {
                analogWrite(bugLight, i);    
                lightTime.restart();
                previouslight = lightNum;
                i++;

            }else(analogWrite(bugLight, i));

            if(i >= 250)
            {
                newNum = true;
                i=25;
                analogWrite(bugLight, 0);                
            }

        }      
        break;
        }
}

void lightWin()
{
    if(winTimer.running() == false)
    {
        winTimer.restart();    
        lightNum = random(0,3);
    }

    //give the last audio a chance to finish playing before playing win sound
    
    if(audioWinTimer.running() == false)
    {
      delay(1);
      if(winPlayOnce == false)
      {
      winPlayOnce = true;
      audioOut.playTrack(5);
      }
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
delay(1);    
analogWrite(nutLight, 0);
analogWrite(flowerLight,0);
analogWrite(bugLight,0);   
nutTriggered = false;
flowerTriggered = false;
bugTriggered = false;
gameState = false;
resetFlag = false;
points = 0;
playOnce = false;
winPlayOnce = false;

}