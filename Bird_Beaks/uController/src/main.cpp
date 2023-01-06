#include <gameMode.h>


//button variables
bool bugState,flowerState,nutState;
Bounce2::Button nutBtn = Bounce2::Button();
Bounce2::Button flowerBtn = Bounce2::Button();
Bounce2::Button bugBtn = Bounce2::Button();


void setup() 
{

audioOut.begin();
nutBtn.attach(nutPin, INPUT_PULLUP);
nutBtn.interval(5);
nutBtn.setPressedState(LOW);

flowerBtn.attach(flowerPin, INPUT_PULLUP);
flowerBtn.interval(50);
flowerBtn.setPressedState(LOW);

bugBtn.attach(bugPin, INPUT_PULLUP);
bugBtn.interval(50);
bugBtn.setPressedState(LOW);

pinMode(nutLight, OUTPUT);
pinMode(flowerLight, OUTPUT);
pinMode(bugLight, OUTPUT);

digitalWrite(nutLight, LOW);
digitalWrite(flowerLight, LOW);
digitalWrite(bugLight, LOW);

//starts all timers they will reset themselves when they are first used
lightTime.setTime(lightDelay);
winTimer.setTime(winLightDelay);
gameTimer.setTime(gameTime);

//set track 1 to loop
audioOut.loop(1,1); 

}

void loop() 
{
//   //update button states
  nutBtn.update();
  flowerBtn.update();
  bugBtn.update();
  bugState = bugBtn.isPressed();
  nutState = nutBtn.isPressed();
  flowerState = flowerBtn.isPressed();

  //Checks if the nut button has been pressed
  //Checks if the game has already started
  //updates points and triggered status

  

  if(nutState == true)
  {
    if(gameState != true)
    {
      //update to start game
      gameState = true;
      audioOut.stopTrack(1);
      gameTimer.restart();
    }else if(nutTriggered != true)
    { 
        //update buttons triggered status
        nutTriggered = true;
        //update points
        points = points + 1;
        audioOut.playTrack(2);
    }
        #ifdef debug
        Serial.println("Nut button Pressed & registered");
        Serial.print("Current Points: ");
        Serial.println(points);
        Serial.print("Nut button trigged status: ");
        Serial.println(nutTriggered);
        #endif        
  }

  //Checks if the nut button has been pressed
  //Checks if the game has already started
  //updates points and triggered status
  if(flowerState == true)
  {
    if(gameState != true)
    {
      //update to start game
      gameState = true;
      audioOut.stopTrack(1);
      gameTimer.restart();
    }else if(flowerTriggered != true)
    { 
        //update buttons triggered status
        flowerTriggered = true;
        //update points
        points = points + 1;
        audioOut.playTrack(3);
    }
    #ifdef debug
    Serial.println("Flower button Pressed & registered");
    Serial.print("Current Points: ");
    Serial.println(points);
    Serial.print("Flower button trigged status: ");
    Serial.println(flowerTriggered);
    #endif    
  }

  //Checks if the nut button has been pressed
  //Checks if the game has already started
  //updates points and triggered status
  if(bugState == true)
  {
    if(gameState != true)
    {
      //update to start game
      gameState = true;
      audioOut.stopTrack(1);
      gameTimer.restart();
    }else if(bugTriggered != true)
    { 
        //update buttons triggered status
        bugTriggered = true;
        //update points
        points = points + 1;
        audioOut.playTrack(4);
    } 
        #ifdef debug
        Serial.println("Bug button Pressed & registered");
        Serial.print("Current Points: ");
        Serial.println(points);
        Serial.print("Bug button trigged status: ");
        Serial.println(bugTriggered);
        #endif    

  }

  //Checks triggered status and updates lights accordingly if the game is running
  if(gameState == true && resetFlag == false)
  {
    if(bugTriggered == true){analogWrite(bugLight, 50);}else(analogWrite(bugLight, 0));
    if(nutTriggered == true){analogWrite(nutLight, 50);}else(analogWrite(nutLight, 0));
    if(flowerTriggered == true){analogWrite(flowerLight, 50);}else(analogWrite(flowerLight, 0));
  }

  if(points == pointMax)
  {
    //start timers as soon as point max is reached
    //and reset flag
    if(resetFlag == false)
    {
    resetTimer.setTime(resetTime);
    audioWinTimer.setTime(audioWinTime);
    resetFlag = true;    
    }

    // when the reset timer finshes reset the game
    if(resetTimer.running() == false)
    {
      resetGame();
    }
    lightWin();
  }
   //check to see if the attractor should run
  if(gameState != true)
  {
    if(playOnce == false){audioOut.playTrack(1);playOnce = true;}
    lightAttract();      
  }else {if(gameTimer.running() == false){resetGame();}}
}