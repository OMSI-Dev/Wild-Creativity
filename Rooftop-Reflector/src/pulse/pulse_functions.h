#include <pulse\MoToTimer.h>

MoToTimer lightUpdate;
int increment = 5; //how many increments to increase
bool En = 0; //bool to hold direction of pulse

void pulseFunction(int btnLed, bool pulse, int rate)
{
    if(lightUpdate.running() == false)
    {   
        if(pulse == 1)
        {
            //breath 0 == raise light
            if(En == 0)
            {   
                increment++;
                analogWrite(btnLed, increment);
                lightUpdate.setTime(rate);
                lightUpdate.restart();
                if(increment == 255){En = 1;}      
            }
        
            //breath 1 == lower light
            if(En == 1)
            {  
                increment--; 
                analogWrite(btnLed, increment);
                lightUpdate.setTime(rate);
                if(increment == 0){En = 0;}            
            }
        }

        //fade out when game start
        if(pulse == 0)
        {   
            if(increment > 0)
            {
            increment--; 
            analogWrite(btnLed, increment);
            lightUpdate.setTime(rate);
            lightUpdate.restart();
            }
            if(increment == 0){En = 0;}    
        }
    }
}
