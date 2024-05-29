extern bool resultsFlag;
extern bool zeroFlag;
extern bool gameOn,allowStop;
extern void results();
extern void sensorUpdate();

bool Serial_Update(bool gameStatus)
{
    // send it to the computer as ASCII digits
    //bytes to talk with computer
    int ByteRecv = 0;    
    float ByteSend = 0.0;
    //get start byte
    ByteRecv = Serial.read();

    //lf (10) = sends line feed to close buffer
    //! (33) = Signals arduino knows game is over
    //# (35) = Start game
    //$ (36) = Game over signal
    //% (37) = End game by stop button  
    //& (38) = Entered Results
    //' (39) = ask arduino to send sensor update
    //( (40) = Left Results
    //) (41) = allow stop button
    //  (42) = block stop button
    //Z (90) = calibration over start fans & release zero
    //C (67) = Start calibration

    if(ByteRecv == 39)
    {  
      ByteSend = sensorUpdate(ByteSend);  

      Serial.print(ByteSend);
      Serial.write(10); //sends LF to close buffer     
      return  gameStatus;
      
    }else if(ByteRecv == 36){
      //this might be removed in final release
      //let processing know arduino left game state 
      // Serial.print("!");
      // Serial.write(10); //sends LF to close buffer 
      // gameStatus = false;      
      return  gameStatus;   

    }else if(ByteRecv == 38){
      //app has entered results
      resultsFlag = true;      
      return  gameStatus;

    }else if(ByteRecv == 40){
      //app has left results      
      resultsFlag = false;
      gameStatus = false;
      return  gameStatus; 

    }else if(ByteRecv == 41){
        //lets the stop btn be pressed
        allowStop = true;
        return  gameStatus;}
      else if(ByteRecv == 67){
        //calibrate
        Calibration();
        return  gameStatus;
  } 

  return gameStatus;
}

bool Serial_UpdateBtn(bool allowStop)
{

  // send it to the computer as ASCII digits
  //bytes to talk with computer
  int ByteRecv = 0;    

  //get start byte
  ByteRecv = Serial.read();

  if(ByteRecv == 41)
  {
        //lets the stop btn be pressed
        allowStop = true;
        return  allowStop;

  }  
return allowStop;
}    