unsigned long previousMillis = 0;
const long interval = 60;      
extern byte fadeValue;

//flags
bool fadeUp = true;
#define startBtnPWM 10


byte breath(byte fadeValue)
{
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval)
    {
        previousMillis = currentMillis; 

        if(fadeUp == true)
        {
            fadeValue += 5;   
            analogWrite(startBtnPWM, fadeValue);
            if(fadeValue == 255){fadeUp=false;}
        }
        
        if(fadeUp != true )
        {
            fadeValue -= 5;   
            analogWrite(startBtnPWM, fadeValue);
            if(fadeValue == 0 ){fadeUp=true;}
        }
    }

    return fadeValue;

}

byte breathOut(byte fadeValue)
{   
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval && fadeValue > 0)
    {
        previousMillis = currentMillis;         
        fadeValue -= 5;   
        analogWrite(startBtnPWM, fadeValue);
        if(fadeValue < 0 ){analogWrite(startBtnPWM, fadeValue);fadeUp=true;}
    }

   return fadeValue;
}

