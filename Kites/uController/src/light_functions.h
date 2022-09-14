#include <pin_define.h>

unsigned long previousMillis = 0;
unsigned long previousMillisStop = 0;
const long interval = 60;      
extern byte fadeValueStart,fadeValueStop;

//flags
bool fadeUp = true;
bool fadeUp2 = true;

byte breathStart(byte fadeValueStart)
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis; 

        if(fadeUp == true)
        {
            fadeValueStart += 5;   
            analogWrite(startBtnPWM, fadeValueStart);
            if(fadeValueStart == 255){fadeUp=false;}
        }
        
        if(fadeUp != true )
        {
            fadeValueStart -= 5;   
            analogWrite(startBtnPWM, fadeValueStart);
            if(fadeValueStart == 0 ){fadeUp=true;}
        }
    }

    return fadeValueStart;

}

byte breathOutStart(byte fadeValueStart)
{   
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval && fadeValueStart > 0)
    {
        previousMillis = currentMillis;         
        fadeValueStart -= 5;   
        analogWrite(startBtnPWM, fadeValueStart);
        if(fadeValueStart < 0 )
        {analogWrite(startBtnPWM, fadeValueStart);
        fadeUp=true;}
    }

   return fadeValueStart;
}



byte breathStop(byte fadeValueStop)
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillisStop >= interval)
    {
        previousMillisStop = currentMillis; 

        if(fadeUp2 == true)
        {
            fadeValueStop += 5;   
            analogWrite(stopBtnPWM, fadeValueStop);
            if(fadeValueStop == 255){fadeUp2=false;}
        }
        
        if(fadeUp2 != true )
        {
            fadeValueStop -= 5;   
            analogWrite(stopBtnPWM, fadeValueStop);
            if(fadeValueStop== 0){fadeUp2=true;}
        }
    }

    return fadeValueStop;

}

byte breathOutStop(byte fadeValueStop)
{   
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillisStop >= interval && fadeValueStop > 0)
    {
        previousMillisStop = currentMillis;         
        fadeValueStop -= 5;   
        analogWrite(stopBtnPWM, fadeValueStop);

        if(fadeValueStop < 0 )
        {
        analogWrite(stopBtnPWM, fadeValueStop);
        fadeUp2=true;
        }
    }

   return fadeValueStop;
}

