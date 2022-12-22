//library import
import processing.video.*;
import processing.serial.*;
import lord_of_galaxy.timing_utils.*;
import processing.sound.*;

//Serial Variables
Serial ardPort;
int inByte = -1;
float senLevels = 175;
int lf = 10;
int $ = 36;
String inputStr;
byte chargeMin = 0;

//timers
long senUpdate = 0;
//how often should we ask for a sensor value in ms
// reduced the amounts of calls from 20ms to 100ms
int interval = 40;

//Counts down the game intro and game time
Stopwatch Timer;
Stopwatch countTimer;

//
int gameTime = 15000;
int counter = 0; //for stop watch image

//images
PImage dial, rGauge, yGauge, gGauge, rPhone, yPhone, gPhone, actTimer, countDownTimer, splash, results, gBatt, yBatt, rBatt;

//set the dial indicator to half size
float pointWidth = 89/2;
float pointHeight = 719/2;
//offset the center point to move to the center of the circle
float pointOffset = ((pointHeight/2)-22);


//movie
Movie attractor;
//this might be needed if the video is not looping properally
//this checks to see if the video is close enough to the end
float videoOffset = 0.037457;

//sound files
SoundFile red;
SoundFile orange;
SoundFile green;
SoundFile countdown;
SoundFile countdownStart;
boolean playOnce;


//Text placements & strings
String spanish = "¡Mantén la aguja en la parte verde!";
String english = "Keep the needle in the green!";

int titleX = 660;
int titleY = 810;

//gamestate flags
boolean gameOn = false;
boolean stopFlag = false;
boolean soundOn = true;
boolean gameIn = false;
boolean showResults = false;

void setup() {
  fullScreen();
  size(1920, 1080);

  // create a font located in data folder
  PFont Hel = createFont("/font/helv.otf", 32);
  textFont(Hel);

  //sound assignment
  red = new SoundFile(this, "/sound/red.mp3");
  orange = new SoundFile(this, "/sound/orange.mp3");
  green = new SoundFile(this, "/sound/green.mp3");
  countdown = new SoundFile(this, "/sound/countdown.mp3");
  countdownStart = new SoundFile(this, "/sound/countdownStart.mp3");


  //image assignment

  dial = loadImage("/images/dial.png");
  rGauge = loadImage("/images/rGauge.png");
  yGauge = loadImage("/images/yGauge.png");
  gGauge = loadImage("/images/gGauge.png");
  rPhone = loadImage("/images/rPhone.png");
  yPhone = loadImage("/images/yPhone.png");
  gPhone = loadImage("/images/gPhone.png");
  rBatt = loadImage("/images/battR.png");
  yBatt = loadImage("/images/battY.png");
  gBatt = loadImage("/images/battG.png");
  actTimer = loadImage("/images/activeTimer.png");
  countDownTimer = loadImage("/images/countdownTimer.png");
  splash = loadImage("/images/splash.png");
  results = loadImage("/images/results.png");

  //movie assignment
  attractor = new Movie(this, "/images/attractor.mp4");

  // List all the available serial ports:
  printArray(Serial.list());

  //Com1 is Serial.list()[0]
  //Serial.list()[1] will pick up the next used COM port
  String portName = Serial.list()[1];
  ardPort = new Serial(this, portName, 115200);
  //Line Feed to set buffer to read
  ardPort.bufferUntil(lf);

  //catch the arduino incase we lose sync
  //ardPort.write(36);

  //Timer setup
  Timer = new Stopwatch(this);
  countTimer = new Stopwatch(this);
}

void draw() {
  background(255);
  noFill();

  //results();
  if (gameOn == true)
  {
    //prevents movie from playing during gameplay
    if (stopFlag == true) {
      stopFlag = false;
      //dont use .stop() it breaks assignment of the movie file
      attractor.pause();
      //reset video to start
      attractor.jump(0);
    }
    if (gameIn == false) {
      gameCountIn();
    } else {
      if (Timer.time()<1) {
        Timer.start();
      }
    }

    //update Title for new sensor values
    if (gameIn == true) {
      updateTitle();
      updateTimer();
      updateImages();
      updatePointer();
    }

    //Sends LF to get a sensor udpate
    long currentMillis = millis();
    if (currentMillis - senUpdate >= interval)
    {
      //send ' to get sensor update
      senUpdate = currentMillis;
      ardPort.write(39);
    }

    //println("Game Timer: " + round(Timer.time()/1000));
    //println("Results: " + showResults);
    if (Timer.time() >= gameTime)
    {
      timerTick();
    }
  } else
  {
    //println("Results: " + showResults);
    if (showResults == true)
    {
      results();
    } else
    {
      playMovie();
    }
  }
}

void serialEvent(Serial port) {

  //reset audio signal
  playOnce = true;

  //looks for incomming Sensor Data
  inputStr = trim(port.readString());
  
  //% = End game by stop button
  //# = Start game
  //! = Signals arduino knows game is over
  
  
  if (inputStr.equals("#") == true)
  {
    //flip the stop video flag
    stopFlag = true;
    gameOn = true;
    //clears previous sensor value
    //senLevels = 0;
    //resets timer before starting
    countTimer.reset();
    
  } else if (inputStr.equals("%") == true) {
    //stop button pressed end the game
    println("Stop button");
    timerTick();    
  } else if (inputStr.equals("!") == true) {
    println ("received byte to stop game or leave results");
  } else {
    //Convert to string to integer value to parse sensor data
    senLevels = float(inputStr);
    println ("Current Sensor: " + inputStr);
  }
}


void updatePointer() {
  //translate senLevels between -90 and 90 degrees.
  //Set to cetner and offset from 0,0
  translate(673, 673);
  //push & pop to only translate the pointer
  pushMatrix();
  rotate(radians(senLevels));
  imageMode(CENTER);
  image(dial, 0, pointOffset*-1, pointWidth, pointHeight);
  popMatrix();
}

void updateImages() {

  //Update gauge highlight and phone Highlight
  if (senLevels > 35)
  {
    imageMode(CENTER);
    image(gGauge, 650, 500, 880, 480);
    image(gPhone, 1640, 550, 739/2, 1153/2);
  } else if (senLevels >= -35 && senLevels <= 35)
  {
    imageMode(CENTER);
    image(yGauge, 650, 500, 880, 480);
    image(yPhone, 1640, 550, 739/2, 1153/2);
  } else if (senLevels < -35)
  {
    imageMode(CENTER);
    image(rGauge, 650, 500, 880, 480);
    image(rPhone, 1640, 550, 739/2, 1153/2);
  }

  //update the fullness of the battery
  if (senLevels > 45)
  {
    imageMode(CENTER);
    tint(255, 255);
    image(gBatt, 1645, 440, 92, 35);
    image(gBatt, 1645, 480, 92, 35);
    image(yBatt, 1645, 520, 92, 35);
    image(yBatt, 1645, 560, 92, 35);
    image(rBatt, 1645, 600, 92, 35);
    image(rBatt, 1645, 640, 92, 35);
  } else if (senLevels >= 35 && senLevels <= 45)
  {
    imageMode(CENTER);
    tint(255, 128);
    image(gBatt, 1645, 440, 92, 35);
    tint(255, 255);
    image(gBatt, 1645, 480, 92, 35);
    image(yBatt, 1645, 520, 92, 35);
    image(yBatt, 1645, 560, 92, 35);
    image(rBatt, 1645, 600, 92, 35);
    image(rBatt, 1645, 640, 92, 35);
  } else if (senLevels > 0 && senLevels <= 35)
  {
    imageMode(CENTER);
    tint(255, 128);
    image(gBatt, 1645, 440, 92, 35);
    image(gBatt, 1645, 480, 92, 35);
    tint(255, 255);
    image(yBatt, 1645, 520, 92, 35);
    image(yBatt, 1645, 560, 92, 35);
    image(rBatt, 1645, 600, 92, 35);
    image(rBatt, 1645, 640, 92, 35);
  } else if (senLevels >= -35 && senLevels <= 0)
  {
    imageMode(CENTER);
    tint(255, 128);
    image(gBatt, 1645, 440, 92, 35);
    image(gBatt, 1645, 480, 92, 35);
    image(yBatt, 1645, 520, 92, 35);
    tint(255, 255);
    image(yBatt, 1645, 560, 92, 35);
    image(rBatt, 1645, 600, 92, 35);
    image(rBatt, 1645, 640, 92, 35);
  } else if (senLevels >= -80 && senLevels <= -35)
  {
    imageMode(CENTER);
    tint(255, 128);
    image(gBatt, 1645, 440, 92, 35);
    image(gBatt, 1645, 480, 92, 35);
    image(yBatt, 1645, 520, 92, 35);
    image(yBatt, 1645, 560, 92, 35);
    tint(255, 255);
    image(rBatt, 1645, 600, 92, 35);
    image(rBatt, 1645, 640, 92, 35);
  } else if (senLevels < -80)
  {
    imageMode(CENTER);
    tint(255, 128);
    image(gBatt, 1645, 440, 92, 35);
    image(gBatt, 1645, 480, 92, 35);
    image(yBatt, 1645, 520, 92, 35);
    image(yBatt, 1645, 560, 92, 35);
    image(rBatt, 1645, 600, 92, 35);
    tint(255, 255);
    image(rBatt, 1645, 640, 92, 35);
  }
}

void updateTitle()
{
  textAlign(CENTER);
  textSize(70.5);
  fill(#275daa);
  text(spanish, titleX, titleY);
  fill(#004d43);
  text(english, titleX, titleY+70.5);
}

void updateTimer()
{
  counter = (gameTime/1000) - round(Timer.time()/1000);
  imageMode(CENTER);
  image(actTimer, 1643, 172, 251/2, 294/2);
  textSize(40);
  fill(#000000);
  text(counter, 1642, 195);
}

void gameCountIn()
{
  if (countTimer.time()<1) {
    countTimer.start();
  }

  counter =  5 - round(countTimer.time()/1000);

  imageMode(CENTER);
  image(splash, width/2, height/2, 924, 545);
  image(countDownTimer, 1267, height/2, 251/2, 294/2);
  fill(#000000);
  textAlign(CENTER);

  if (counter >=0)
  {
    text(counter, 1266, 568);
  }

  textSize(50);
  textAlign(RIGHT);
  fill(#275daa);
  text("La prueba comienza en", 1127, height/2);
  fill(#004d43);
  text("Testing starts in ", 1120, height/2+50);

  //playing countdown timer
  switch (counter)
  {
  case 0:
    if (countdown.isPlaying() == false)
    {
      countdownStart.play();
    }
  case 1:
    if (countdown.isPlaying() == false)
    {
      countdown.play();
    }
  case 2:
    if (countdown.isPlaying() == false)
    {
      countdown.play();
    }
  case 3:
    if (countdown.isPlaying() == false)
    {
      countdown.play();
    }
  case 4:
    if (countdown.isPlaying() == false)
    {
      countdown.play();
    }
  case 5:
    if (countdown.isPlaying() == false)
    {
      countdown.play();
    }
  }

  //counter over start game.
  if (counter < 0)
  {
    println("Game Countdown over...");
    countTimer.reset();
    gameIn = true;
  }
}

void results()
{

  if (countTimer.time()<1)
  {
    countTimer.start();
    //tell arduino we are in results
    ardPort.write(38);
  }

  //show the background tinted
  tint(255, 128);
  imageMode(CENTER);
  image(yGauge, 650, 500, 880, 480);
  image(yPhone, 1640, 550, 739/2, 1153/2);
  image(gBatt, 1645, 440, 92, 35);
  image(gBatt, 1645, 480, 92, 35);
  image(yBatt, 1645, 520, 92, 35);
  image(yBatt, 1645, 560, 92, 35);
  image(rBatt, 1645, 600, 92, 35);
  image(rBatt, 1645, 640, 92, 35);
  
  //update min value based on charge section
  if (senLevels >= 35 ){
    chargeMin = 10;
  }
    if ( senLevels >=-35 && senLevels < 35 ){
    chargeMin = 20;
  }
    if ( senLevels <-35){
    chargeMin = 40;
  }
  
  //overlay results on top
  counter =  10 - round(countTimer.time()/1000);
  tint(255, 255);
  imageMode(CENTER);
  image(splash, width/2, height/2, 1224, 560);
  image(results, 490, (height/2)-50, 450/2, 700/2);
  textSize(72);
  textAlign(RIGHT);
  fill(#275daa);
  text("RESULTADOS", 1525, 400);
  textSize(52);
  text("Tu teléfono se cargaría en", 1525, 452);
  text(chargeMin, 1318, 504);
  text("minutos", 1525, 504);
  fill(#004d43);
  textSize(72);
  text("RESULTS ", 1525, 625);
  textSize(52);
  text("Your phone would charge in", 1525, 677);
  text(chargeMin, 1318, 729);
  text("minutes", 1525, 729);

  //play sound based on results
  if (senLevels >= 35)
  {
    if (playOnce == true)
    {
      green.play();
      playOnce = false;
    }
  } else if (senLevels >=-35 && senLevels < 35 )
  {
    if (playOnce == true)
    {
      orange.play();
      playOnce = false;
    }
  } else if (senLevels <-35)
  {
    if (playOnce == true)
    {
      red.play();
      playOnce = false;
    }
  }
  println("counter in results: " + counter);
  if (counter <= 0)
  {
    println("Results timer over..");
    countTimer.reset();
    showResults = false;
    //-ardPort.write(40);
    println("sent results over");
        
  }
}


void timerTick() {
  //send game over signal
  ardPort.write(36);
  println("sent byte 36");
  //reset the game timer
  Timer.reset();
  //reset audio signal
  playOnce = true;
  //allow results to be shown again
  showResults = true;
  //end the game loop
  gameOn = false;
  //This isn't used anymore..keeping until RC
  soundOn = false;
  //reset allowing the game to count in
  gameIn = false;
}




void playMovie() {

  if (attractor.time() >= (attractor.duration()- videoOffset)) {
    //quick pause to update the start position
    attractor.pause();
    attractor.jump(0);
    pushMatrix();
    imageMode(CENTER);
    image(attractor, width/2, height/2, width, height);
    popMatrix();
    attractor.play();
  } else {
    pushMatrix();
    imageMode(CENTER);
    delay(1);
    image(attractor, width/2, height/2, width, height);
    popMatrix();
    attractor.play();
  }
}

void movieEvent(Movie m) {
  m.read();
}
