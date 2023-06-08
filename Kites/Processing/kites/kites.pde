//library import
import processing.video.*;
import processing.serial.*;
import lord_of_galaxy.timing_utils.*;
import processing.sound.*;
import grafica.*;
import de.looksgood.ani.*;
import de.looksgood.ani.easing.*;
import java.util.HashMap;
import java.util.Map;


//Serial Variables
Serial ardPort;
int inByte = -1;
float senLevels = 175;

String inputStr;

//timers
//Counts down the game intro and game time
Stopwatch gameTimer;
Stopwatch countTimer;
Stopwatch senUpdate;

//
int gameTime = 15000;
int counter = 0; //for stop watch image
int ping = 20;

//images
PImage gPhone, actTimer, countDownTimer, splash, results,light;

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
String spanish = "Fuerza/Force: ";
String english = " ";

String spanishResults = "Cargos Telefonico";
String englishResults = "Phone Charge";


int titleXResults = 150;
int titleYResults = 850;

int titleX = 1920/2-150;
int titleY = 100;
int titlePadding = 200;

float smoothedSenLevels = 100;
boolean calcResults = false;

float sum = 0;
float previousSenLevels = 0;
float perCount = 0;
//gamestate flags
boolean gameOn = false;
boolean stopMovie = false;
boolean soundOn = true;
boolean countIn = true;
boolean showResults = false;
boolean allowStop = false;

//sensor array storage
int[] senStorage = new int[1000];
int arrayAdvance = 0;

/* new plot data*/

public GPlot plot1;
//Graph Variables
int limit;
float x, y;
float plotX = 0;

//Animation 
Ani pulseX,pulseY;

float pulseDimX = 100;
float pulseDimY = 300;
float rectHeight = 0;

void setup() {
  fullScreen();

  // create a font located in data folder
  PFont Hel = createFont("/font/helv.otf", 32);
  textFont(Hel);

  //sound assignment
  red = new SoundFile(this, "/sound/red.mp3");
  orange = new SoundFile(this, "/sound/orange.mp3");
  green = new SoundFile(this, "/sound/green.mp3");
  countdown = new SoundFile(this, "/sound/countdown.mp3");
  countdownStart = new SoundFile(this, "/sound/countdownStart.mp3");
  light  = requestImage("/images/light.png"); 
  //image assignment
  gPhone = requestImage("/images/gPhone.png");
  actTimer = requestImage("/images/activeTimer.png");
  countDownTimer = requestImage("/images/countdownTimer.png");
  splash = requestImage("/images/splash.png");
  results = requestImage("/images/results.png");

  //movie assignment
  //attractor = new Movie(this, "/images/attractor.mp4");

  // List all the available serial ports:
  printArray(Serial.list());
  // Com1 is Serial.list()[0]
  // Serial.list()[1] will pick up the next used COM port
  
  
  //if (Serial.list().length > 1) {
  //  try
  //  {
  //  String portName = Serial.list()[1];
  //  ardPort = new Serial(this, portName, 115200);
  //  }catch(Exception e){
  //  String portName = Serial.list()[2];
  //  ardPort = new Serial(this, portName, 115200);
  //  }
  //} else {
  //  String portName = Serial.list()[0];
  //  ardPort = new Serial(this, portName, 115200);
  //}
  //ardPort.bufferUntil(lf);

  //Timer setup
  gameTimer = new Stopwatch(this);
  countTimer = new Stopwatch(this);
  senUpdate = new Stopwatch(this);
  
  
  
    //Graph Setup
  plot1 = new GPlot(this);
  plot1.setPos(150, 300);
  plot1.setDim(1200, 700);
  plot1.setMar(0, 0, 0, 0);

  //Set Title
  updateTitle();

  //Sets Grid limit to start
  plot1.setYLim(0.00, 500.000);
  plot1.setXLim(0.00, 1000.000);
  //Sets how much info is show per axis
  plot1.setVerticalAxesNTicks(2);
  plot1.setHorizontalAxesNTicks(0);

  //sets colors & weights for plot box
  plot1.setBoxBgColor(#FFFFFF);
  plot1.setBoxLineColor(0);
  plot1.setBoxLineWidth(8);
  plot1.setGridLineColor(0);
  plot1.setGridLineWidth(2);

  //sets color & width for plot line
  plot1.setLineColor(0);
  plot1.setLineWidth(12.00);
  plot1.setPointColor(0);
  plot1.setPointSize(12.00);
  senUpdate.start();
  
  //Animation
Ani.init(this);

pulseX = new Ani(this,1,"pulseDimX",75);
pulseY = new Ani(this,1,"pulseDimY",200);
pulseX.start();
pulseY.start();
}

void draw() {
  background(255);
  noFill();
  if(!showResults){
  drawGraph();
  sensorPing();
  updatePhone();
  }else{results();};

}


void drawGraph()
{
  updateTitle();
   // Draw the  plot
  plot1.beginDraw();
  
  plot1.drawBackground();
  
  //adds horizontal grid lins
  plot1.drawGridLines(GPlot.HORIZONTAL);
  plot1.setLineColor(0); 
  plot1.drawLine(new GPoint(0.00,0.00),new GPoint(1000.00,0));
  
  
  
  if(smoothedSenLevels < 200){plot1.setLineColor(#FF0000);plot1.setPointColor(#FF0000);}
  else if(smoothedSenLevels >=200 && smoothedSenLevels <=400){plot1.setLineColor(#FF9900);plot1.setPointColor(#FF9900);}
  else if(smoothedSenLevels > 400){plot1.setLineColor(#6aa84f);plot1.setPointColor(#6aa84f);};
  //plots lines and points from senLevels
  plot1.drawLines();
  plot1.drawPoints();  
  plot1.endDraw();    
}



void gameUpdate()
{
  sensorPing();
  drawGraph();
  updatePhone();
  
}

void updatePhone()
{
  imageMode(CENTER);
  image(gPhone, 1700, 525,400,600);
  image(light, 1700, 525, pulseDimX, pulseDimY);
  
  if(pulseX.isEnded())
  {
    pulseX.reverse();
    pulseX.start();
  }
    if(pulseY.isEnded())
  {
    pulseY.reverse();
    pulseY.start();
  }
}

void sensorPing()
{
  if (senUpdate.time() > ping && plotX != 995) 
  {
    //ardPort.write(39);
    float smoothingFactor = 0.03; 
    //Change senLevels to serial input
    senLevels = random(375.00,375.00);
    smoothedSenLevels = lerp(previousSenLevels, senLevels, smoothingFactor); 
    println("Smoothed value: " + smoothedSenLevels);
    float mapped = map(smoothedSenLevels,0,400,0,400);
    plot1.addPoint(plotX,mapped);
    senUpdate.restart();
    plotX += 5;
    senStorage[int(arrayAdvance)] = int(smoothedSenLevels);
    
    arrayAdvance++; 
     previousSenLevels = smoothedSenLevels;
    //store each sensor reading to array to be average
   
  }
  
  if(plotX == 995){
  
    for(int i=0; i <999; i++)
    {
      println("array:" + senStorage[i]);
    }
    
  calcResults = true; showResults = true;}
  
}


void updateTitle()
{
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(#275daa);
  text(spanish, titleX, titleY);
  fill(#000000);
  String senString = str(smoothedSenLevels);
  text(senString, titleX + titlePadding + textWidth(senString), titleY);
  textSize(30);
  text(200, 1400, 655);
  text(400, 1400, 300);
}

void mouseReleased()
{
 println("Mouse X:" + mouseX + " Mouse Y:" + mouseY); 
}

void results()
{
if (calcResults) {
    // Count the occurrences of each element in senStorage
    Map<Integer, Integer> occurrences = new HashMap<>();
    int maxCount = 0;
    int mode = 0;

    for (int i = 0; i < senStorage.length; i++) {
        int value = int(senStorage[i]);
        
        int count = occurrences.getOrDefault(value, 0) + 1;
        occurrences.put(value, count);

        if (count > maxCount) {
            maxCount = count;
            mode = value;
        }
    }

    calcResults = false;
    println("Mode: " + mode + ", Frequency: " + maxCount);
}
  
  float percentage = (smoothedSenLevels / 500.0) * 100.0;
  imageMode(CENTER);
  image(gPhone, 1700, 525,400,600);
  textSize(50);
  textAlign(LEFT);
  text(spanishResults, titleXResults, titleYResults);
  text(englishResults, titleXResults, titleYResults+50);
  textSize(150);
  textAlign(CENTER);
 
  if(perCount < 33){fill(#FF0000);}
  else if(perCount >=33 && perCount <=65){fill(#FF9900);}
  else if(perCount > 65){fill(#6aa84f);};
  
  if(perCount < percentage)
  {
    text(str(round(perCount))+"%",790, 900);
    perCount++;
  }else{text(str(round(perCount))+"%",790, 900);}
  
  int corner1X = 1650;
  int corner1Y = 645;
  float rectHeight = map(perCount,0, 100,corner1Y,385);

  
  //corner2X,corner2Y,corner3X,corner3Y,
   rectMode(CORNERS);
   rect(corner1X,corner1Y,1760,rectHeight,20);
   fill(0);

  
//  if (countTimer.time()<1)
//  {
//    //tell arduino we are in results
//    ardPort.write(38);
//    playWin();
//    countTimer.start();

//  }

//  println("counter in results: " + counter);
//  if (counter <= 0)
//  {
//    println("Results timer over..");
//    countTimer.reset();    
//    println("sent results over");
//    ardPort.write(40);
//    flagReset();
//  }
}


void timerTick() {
  //send game over signal
  //ardPort.write(36);
  //println("sent byte 36");
  //reset the game timer
  gameTimer.reset();
}

void flagReset()
{
  println("Reset countIn");
  //reset countdown
  countIn = true;
  println("Reset results");
  //turn off results
  showResults = false;
  println("Reset gameOn");
  //end the game loop
  gameOn = false;
}

void stopReset()
{
  timerTick();
  showResults = true;
}

void playWin()
{
  if (showResults == true)
  {
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
  }
}


void stopMovie()
{  
  //dont use .stop() it breaks assignment of the movie file
  attractor.pause();
  //reset video to start
  attractor.jump(0);
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

void serialEvent(Serial port) {

  //looks for incomming Sensor Data
  inputStr = trim(port.readString());

  //! (33) = Signals arduino knows game is over
  //# (35) = Start game has been pressed
  //$ (36) = Game over signal
  //% (37) = End game by stop button
  //& (38) = Entered Results
  //' (39) = ask arduino to send sensor update
  //( (40) = Left Results
  //) (41) = Starting countdown
  //Z (90) = calibration over & release zero

  if (inputStr.equals("#") == true)
  {
    //Start the game
    //Stop Movie
    stopMovie = true;
    //Start game mode
    gameOn = true;
    //send calbration signal
    ardPort.write(67);
    //allow sound to play
    playOnce = true;
  } else if (inputStr.equals("%") == true) {
    //Stop button pressed; end game early
    stopReset();
  } else if (inputStr.equals("!") == true) {
    //Arduino left game state
    // we should use this to sync processing & arduino
  } else {
    //Convert to string to integer value to parse sensor data
    senLevels = float(inputStr);
    plot1.addPoint(plotX, senLevels);
    println ("Input Str: " + inputStr);
  }
}
