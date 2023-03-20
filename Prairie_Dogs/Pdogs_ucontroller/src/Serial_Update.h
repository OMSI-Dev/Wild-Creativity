bool Serial_Update(bool gameStatus)
{
  // send it to the computer as ASCII digits
  //bytes to talk with computer
  int ByteRecv, ByteSend = 0;    

  ByteSend = sensorVal;    
  //get start byte
  ByteRecv = Serial.read();

  //Looks for a LF to ping back sensor info
  //if $ signals that game is over
  if(ByteRecv == 10)
  { 
    //Read the calibrated value saved to EEPROM
    double sensorValCalibrated = EEPROM.read(0);
    //this is a dummy number used in debugging and calibration
    //double sensorValCalibrated = 196;
    sensorUpdate(sensorValCalibrated);         
    Serial.print(ByteSend);
    Serial.write(10); //sends LF to close buffer      
    gameStatus = true;      
    return  gameStatus;
  }
  else if(ByteRecv == 36)
  {
    //game over update arduinos state      
    gameStatus = false;
    Serial.print("!");
    Serial.write(10); //sends LF to close buffer  
    return  gameStatus;       
  }

  return gameStatus;
}

