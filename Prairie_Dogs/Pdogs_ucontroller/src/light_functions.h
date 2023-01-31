MoToTimer lightUpdate;
int increment = 5; //how many increments to increase
bool pulseDir = 0; //bool to hold direction of pulse

void pulse(byte btnLed, bool pulse, byte rate)
{
    if(lightUpdate.running() == false)
    {   
        if(pulse == 1)
        {
            //breath 0 == raise light
            if(pulseDir == 0)
            {   
                increment++;
                analogWrite(btnLed, increment);
                lightUpdate.setTime(rate);
                lightUpdate.restart();
                if(increment == 255){pulseDir = 1;}      
            }
        
            //breath 1 == lower light
            if(pulseDir == 1)
            {  
                increment--; 
                analogWrite(btnLed, increment);
                lightUpdate.setTime(rate);
                if(increment == 0){pulseDir = 0;}            
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
            if(increment == 0){pulseDir = 0;}    
        }
    }
}

void pulse_reset(){lightUpdate.restart();}