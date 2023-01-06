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
      //let processing know arduino left game state 
      Serial.print("!");
      Serial.write(10); //sends LF to close buffer 
      gameStatus = false;      
      return  gameStatus;       
    }else if(ByteRecv == 38){
      //we are in the results area
      //does nothing for now
      return  gameStatus;
    }else if(ByteRecv == 40){
      //left the results state
      //Wait for results to finish before letting arduino
      //leave game state

      return  gameStatus;  
    }

  return gameStatus;
}

bool Serial_UpdateBtn(bool stopAllow)
{

  // send it to the computer as ASCII digits
  //bytes to talk with computer
  int ByteRecv = 0;    

  //get start byte
  ByteRecv = Serial.read();

  if(ByteRecv == 41)
  {
        //lets the stop btn be pressed
        stopAllow = true;
        return  stopAllow;
  }

return stopAllow;
}    