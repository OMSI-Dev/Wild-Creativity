//calibration code
  //this can only be ran once before needing to restart the arduino to run again
  //it saves the values to the EEPROM so it should ONLY be ran when calibration is needed
  void calibration()
  {
    if(calBtn.pressed() && CalFlag == false)
    {
        //reset calibration number
        int sensorValCalibrated = 0;

        #ifdef debug
        Serial.println("Starting Calibration....");
        #endif

        //run calibration routine
        sensorValCalibrated = SensorCalibration(sensorValCalibrated);

        #ifdef debug
        Serial.print("Sensor Value Calibration: ");
        Serial.println(sensorValCalibrated);
        #endif

        //turn fan off and turn off calibration flag
        digitalWrite(fanpin, LOW);
        CalFlag = true;    
    } 
  } 