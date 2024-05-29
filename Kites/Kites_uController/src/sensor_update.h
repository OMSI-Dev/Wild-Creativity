#include <pin_define.h>
///#define debug
//Sensor varibles 
const int numReadings = 10;

double readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
double total = 0;                  // the running total

double sensorVal = 0;
double lowVal = 4500;
float zeroVal = 500;
double highVal = 3955;
double lowValBaseline = 4100;
double highValBaseline = 3960;
double scalar = 7.75;

bool zeroFlag = true;

//calibration timer
MoToTimer calTimer;



//new rolling sensor filter
float alpha = 0.3; // Adjust as needed
float ema = 0.00; // This will store the Exponential Moving Average


float modifiedMap(float value, float inMin, float inMax, float outMin, float outMax) {
    // Map the input value from the input range to the output range
    float mappedValue = (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    return mappedValue;
}



//establish the new Zero before turning on fans
//this is the result of the sesnor never returning to the same spot.
int findZero()
{   
     int sensorVal = analogRead(A0);
     ema = round((alpha * sensorVal) + ((1 - alpha) * ema)); // Calculate the EMA
     zeroVal = ema;
     #ifdef debug
     Serial.print("Zeroing EMA:");
     Serial.println(zeroVal);
     #endif
}

void Calibration()
{
        calTimer.setTime(1000);
        do
        {
            #ifdef debug
            Serial.print("Finding zero...");
            Serial.println(zeroFlag);
            #endif
            findZero();
            digitalWrite(fanPin, LOW);
        } while (calTimer.running());

}

float sensorUpdate(float sendSensor)
{

    //map the sensor to the calibration settings    
    //sensorVal = constrain(sensorVal, highVal, lowVal  );
    //  Serial.print("Constrain Val: ");
    //  Serial.println(sensorVal);


        float sensorVal = analogRead(A0); // Read the sensor value
        ema = (alpha * sensorVal) + ((1 - alpha) * ema); // Calculate the EMA
        float mapped = modifiedMap(ema, zeroVal, zeroVal - 40, 0, 500);

        #ifdef debug
        Serial.print("zeroVal:");
        Serial.println(zeroVal);
        Serial.print("EMA:");
        Serial.println(ema);

        Serial.print("map:");
        Serial.println(mappedValueString);
        #endif


     sendSensor = constrain(mapped,0,500);

    

   #ifdef debug
     Serial.print("Constrain Val: ");
     Serial.println(sendSensor);
    
    #endif

    return sendSensor;
}