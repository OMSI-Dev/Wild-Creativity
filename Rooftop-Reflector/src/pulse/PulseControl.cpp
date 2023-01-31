#include <pulse\PulseControl.h>
#include <pulse\MoToTimer.h>
MoToTimer lightRaise;
MoToTimer lightLower;

Pulse::Pulse()
{

}

void Pulse::attach(int PWMpin)
{   
    Pulse::PWMpin = PWMpin;    
}

void Pulse::setRate(int rate)
{
    Pulse::rate = rate;
}

void Pulse::update(bool pulseEnable)
{
        if(lightRaise.running() == false)
        {   
            if(pulseEnable == 1)
            {
                //En 0 == raise light
                if(En == 0)
                {   
                    increment++;
                    analogWrite(PWMpin, increment);
                    lightRaise.setTime(rate);
                    lightRaise.restart();
                    if(increment == 255){En = 1;}      
                }
            
                //EN 1 == lower light
                if(En == 1)
                {  
                    increment--; 
                    analogWrite(PWMpin, increment);
                    lightRaise.setTime(rate);
                    if(increment == 0){En = 0;}            
                }
            }
        }
        if(lightLower.running() == false)
        {
            //fade out when game start
            if(pulseEnable == 0)
            {   
                if(increment > 0)
                {
                increment--; 
                analogWrite(PWMpin, increment);
                lightLower.setTime(rate);
                lightLower.restart();
                }
                if(increment == 0){En = 0;}    
            }
        }


}