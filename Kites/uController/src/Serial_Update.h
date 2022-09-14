bool Serial_Update(bool gameStatus)
{
    // send it to the computer as ASCII digits
    //bytes to talk with computer
    int ByteRecv, ByteSend = 0;    

    ByteSend = sensorVal;    
    //get start byte
    ByteRecv = Serial.read();
 

    if(ByteRecv == 10)
    {  
      sensorUpdate();        
      Serial.print(ByteSend);
      Serial.write(10); //sends LF to close buffer
      gameStatus = true;               
      return  gameStatus;

    }else if(ByteRecv == 36){
      //game over update arduinos state     
      gameStatus = false;
      Serial.print("!");
      Serial.write(10); //sends LF to close buffer  
      return  gameStatus;       
    }
    else if(ByteRecv == 37){
      //game in results turn off fan & fade out stop button
      //Turns off fan
      digitalWrite(fanPin, LOW);  
      //tell stop button to fade out

      gameStatus = false;
      return  gameStatus;       
    }
    else if(ByteRecv == 38){
   
    gameStatus = false;
    return  gameStatus;       
  }
    return gameStatus;
}

