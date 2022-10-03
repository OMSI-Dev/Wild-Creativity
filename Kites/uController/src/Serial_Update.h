extern bool resultsFlag;
extern void results();

bool Serial_Update(bool gameStatus)
{
    // send it to the computer as ASCII digits
    //bytes to talk with computer
    int ByteRecv, ByteSend = 0;    

    ByteSend = sensorVal;    
    //get start byte
    ByteRecv = Serial.read();
 

    if(ByteRecv == 39)
    {  
      sensorUpdate();        
      Serial.print(ByteSend);
      Serial.write(10); //sends LF to close buffer     
      return  gameStatus;
      
    }else if(ByteRecv == 36){

      return  gameStatus;       
    }else if(ByteRecv == 38){

      return  gameStatus;
    }else if(ByteRecv == 40){
      
      return  gameStatus;  
    }

  return gameStatus;
}

