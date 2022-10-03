//library import
import processing.video.*;
import processing.serial.*;
import grafica.*;
import lord_of_galaxy.timing_utils.*;
import processing.sound.*;

//graph setup
public GPlot plot1;


//Serial Variables
Serial ardPort;
int inByte = -1;
float senLevels = 175;
int lf = 10;
int $ = 36;
String inputStr;

//Graph Variables
int limit;
float x, y, polX, polY;
int plotSpeed = 10000;
float xPoint = 20;
float xStep = 20;
float xArrow = 0;

float graphYmin = 0;
float graphYmax = 300;


//timers
long senUpdate = 0;
int interval = 10;
Stopwatch Timer;
int gameTime = 60000;


//images
PImage en1, dis1, en2, dis2, en3, dis3, rArrow, yArrow, gArrow;
float xArrowOffset = 50;
float enSize = 220;
float disSize = 170;

//movie
Movie attractor;
//this might be needed if the video is not looping properally
//this checks to see if the video is close enough to the end
float videoOffset = 0.037457;

//sound files
SinOsc sine;
float soundFreq;
SoundFile gamestart;
SoundFile attractorSound;
boolean playOnce;

//Text placements & strings
String spanish = "Flujo De Aire ";
String slash = "/ ";
String english = "Air Flow: ";
String units1 = " cm";
String units2 = "3";
String units3 = "/s";
int titleX = 350;
int titleY = 150;

//gamestate flags
boolean gameOn = false;
boolean stopFlag = false;
boolean soundOn = true;

void setup() {
  fullScreen();

  // create a font located in data folder
  PFont Hel = createFont("/fonts/helv.otf", 32);
  textFont(Hel);

  //sound assignment
  gamestart = new SoundFile(this, "/sound/gamestart.mp3");
  attractorSound = new SoundFile(this, "/sound/attractor.mp3");

  //image assignment
  //enable = en
  //disable = dis
  en1 = loadImage("/images/1_en.gif");
  dis1 = loadImage("/images/1_dis.gif");
  en2 = loadImage("/images/2_en.gif");
  dis2 = loadImage("/images/2_dis.gif");
  en3 = loadImage("/images/3_en.gif");
  dis3 = loadImage("/images/3_dis.gif");
  gArrow = loadImage("/images/greenArrow.gif");
  yArrow = loadImage("/images/yellowArrow.gif");
  rArrow  = loadImage("/images/redArrow.gif");

  //movie assignment
  attractor = new Movie(this, "/images/attractor.mp4");

  //set starting image postions
  imageMode(CENTER);
  image(dis1, 1725, 350, 220, 220);
  imageMode(CENTER);
  image(dis2, 1725, 600, 220, 220);
  imageMode(CENTER);
  image(en3, 1725, 850, 220, 220);

  //set sound generator
  sine = new SinOsc(this);

  // List all the available serial ports:
  printArray(Serial.list());

  // Com1 is Serial.list()[0]
  // Serial.list()[1] will pick up the next used COM port
  if (Serial.list().length > 1) {
    String portName = Serial.list()[1];
    ardPort = new Serial(this, portName, 9600);
  } else {
    String portName = Serial.list()[0];
    ardPort = new Serial(this, portName, 9600);
  }

  ardPort.bufferUntil(lf);

  //Timer setup
  Timer = new Stopwatch(this);

  //Graph Setup
  plot1 = new GPlot(this);
  plot1.setPos(100, 215);
  plot1.setDim(1370, 757);
  plot1.setMar(0, 0, 0, 0);

  //Set Title
  updateTitle();

  //Sets Grid limit to start
  plot1.setYLim(0.00, 300.000);
  plot1.setXLim(0.00, 60.000);
  //Sets how much info is show per axis
  plot1.setVerticalAxesNTicks(3);
  plot1.setHorizontalAxesNTicks(0);

  //sets colors & weights for plot box
  plot1.setBoxBgColor(#fed9a5);
  plot1.setBoxLineColor(0);
  plot1.setBoxLineWidth(5);
  plot1.setGridLineColor(0);

  //sets color & width for plot line
  plot1.setLineColor(0);
  plot1.setLineWidth(4.00);
  plot1.setPointColor(0);
  plot1.setPointSize(4.00);
}

void draw() {
  background(255);
  noFill();

  if (gameOn == true) {

    //prevents movie from playing during gameplay
    if (stopFlag == true) {
      stopFlag = false;
      //dont use .stop() it breaks assignment of the movie file
      attractor.pause();
      //reset video to start
      attractor.jump(0);
      //turn off attractor sound and allow playOnce game sound
      playOnce = true;
      if (attractorSound.isPlaying() == true)
      {
        attractorSound.stop();
      }
    }

    //Sends LF to get a sensor udpate
    long currentMillis = millis();
    if (currentMillis - senUpdate >= interval)
    {
      senUpdate = currentMillis;
      ardPort.write(10);
      updatePoints();
    }

    //println("Game Timer: " + Timer.time());
    if (Timer.time() >= gameTime) {
      timerTick();
    }

    //update Title for new sensor values
    updateTitle();

    //update Graph
    drawGraph();

    //update arrow position
    updateArrow();

    //println("X: " + mouseX + " " + "Y: " + mouseY);

    //update prairie dog images
    upDog();

    if (soundOn == true) {
      //this is for tone generation
      playSound();
    }
  } else {
    playMovie();
  }
}

void serialEvent(Serial port) {
  
  //plays start sound once
  // might not need anymore: gamestart.isPlaying() == false && 
  if (playOnce == true)
  {
    gamestart.play();
    playOnce = false;
  }
  //looks for incomming Sensor Data
  inputStr = trim(port.readString());
  
  if (inputStr.equals("#") == true) {
    //flip the stop video flag
    stopFlag = true;
    //println ("Game detects: " + inputStr);
    gameOn = true;
    soundOn = true;
    senLevels = 0;
    Timer.start();
  } else if (inputStr.equals("!") == true) 
  {
    //signal arduino it left knows game is over
  } else if (inputStr.length() == 0) {
    senLevels = 100;
  } else {
    //println ("Game Started: " + inputStr);
    //Convert to string to integer value to parse sensor data
    senLevels = Integer.valueOf(inputStr);
  }
}

void updatePoints() {

  // Add a new point to plot
  GPoint lastPoint = plot1.getPointsRef().getLastPoint();

  if (lastPoint == null) {
    plot1.addPoint(xPoint, senLevels);
  } else if (!lastPoint.isValid() || sq(lastPoint.getX() - xPoint) + sq(lastPoint.getY() + senLevels) > 2500) {
    //update points on graph
    plot1.addPoint(millis(), senLevels);
  }


  // Resets the graph when spacebar pressed
  if (keyPressed && key == ' ')
  {
    plot1.setPoints(new GPointsArray());
    xPoint = 10;
    plot1.addPoint(0, 0);
  }
}

void drawGraph() {

  // Draw the  plot
  plot1.beginDraw();
  if (senLevels > 200)
  {
    plot1.setBoxBgColor(#cfe6bf);
  } else if (senLevels >100 && senLevels < 200)
  {
    plot1.setBoxBgColor(#fed9a5);
  } else if (senLevels > 0 && senLevels <100)
  {

    plot1.setBoxBgColor(#fbc8b4);
  }

  plot1.drawBackground();
  plot1.drawBox();
  //draws the label on the side of chart
  //plot1.drawYAxis();
  //adds horizontal grid lins
  plot1.drawGridLines(GPlot.HORIZONTAL);
  //plots lines and points from senLevels
  plot1.drawLines();
  plot1.drawPoints();

  //this slidies the graph as data comes in
  //larger the plotSpeed slower the plot movement
  plot1.setXLim(millis()-plotSpeed, millis());
  plot1.updateLimits();
  plot1.endDraw();
}


void playSound() {
  soundFreq = map(senLevels, 100, 600, 500, 700);

  sine.play();
  sine.freq(soundFreq);

  if (soundOn == false)
  {
    sine.stop();
  }
}

void updateArrow() {
  //find position of most recent plot point and update arrow
  float Xcord = 1550 ;
  float Ycord = map(senLevels, graphYmin, graphYmax, 970, 218);

  if (senLevels >= 200)
  {
    imageMode(CENTER);
    image(gArrow, Xcord, Ycord, 50, 50);
  } else if (senLevels >= 100 && senLevels < 200)
  {
    imageMode(CENTER);
    image(yArrow, Xcord, Ycord, 50, 50);
  } else if (senLevels > 0 && senLevels <100)
  {
    imageMode(CENTER);
    image(rArrow, Xcord, Ycord, 50, 50);
  }
}




void upDog() {
  if (senLevels >= 200)
  {
    imageMode(CENTER);
    image(en1, 1725, 350, enSize, enSize);
    imageMode(CENTER);
    image(dis2, 1725, 600, disSize, disSize);
    imageMode(CENTER);
    image(dis3, 1725, 850, disSize, disSize);
  } else if (senLevels >=100 && senLevels < 200)
  {
    imageMode(CENTER);
    image(dis1, 1725, 350, disSize, disSize);
    imageMode(CENTER);
    image(en2, 1725, 600, enSize, enSize);
    imageMode(CENTER);
    image(dis3, 1725, 850, disSize, disSize);
  } else if (senLevels > 0 && senLevels <100)
  {
    imageMode(CENTER);
    image(dis1, 1725, 350, disSize, disSize);
    imageMode(CENTER);
    image(dis2, 1725, 600, disSize, disSize);
    imageMode(CENTER);
    image(en3, 1725, 850, enSize, enSize);
  }
}

void updateTitle() {
  textSize(70.5);
  fill(#275daa);
  text(spanish, titleX, titleY);
  fill(#000000);
  text(slash, textWidth(spanish) + titleX, titleY);
  fill(#004d43);
  text(english, titleX + textWidth(spanish + slash), titleY);
  //gives the full width of title for spacing
  float titleWidth = titleX + textWidth(spanish + slash + english);
  textSize(60);
  fill(#000000);
  //postions and rounds Sensor after title
  text(str(round(senLevels)), titleWidth, titleY);
  String strSen = str(round(senLevels));
  float senWidth = textWidth(strSen) +  titleWidth;
  //CM position
  text(units1, senWidth, titleY);
  float unit1width = textWidth(units1) + senWidth;
  textSize(30);
  text(units2, unit1width, titleY-20);
  float unit2width = textWidth(units2) + unit1width;
  textSize(60);
  text(units3, unit2width, titleY);
}

void timerTick() {
  Timer.reset();
  ardPort.write(36);  
  gameOn = false;
  soundOn = false;
  playSound();
}

void playMovie() {
  //this is to cut the video off roughly before the last frame
  //and loop it back around
  //Processing built in loop does not work very well

  if (attractor.time() >= (attractor.duration()- videoOffset)) {
    //quick pause to update the start position
    attractor.pause();
    attractor.jump(0);
    image(attractor, width/2, height/2);
    attractor.play();
    //check for sound and play once during loop
    print("checking sound: ");
    println(attractorSound.isPlaying());
    print("checking playonce: ");
    println(playOnce);

    if (attractorSound.isPlaying() == false) {
      attractorSound.play();
      playOnce = false;
    }
  } else {
    image(attractor, width/2, height/2);
    attractor.play();
    //check for sound and play once during loop
    if (attractorSound.isPlaying() == false) {
      attractorSound.play();
      playOnce = false;
    }
  }
}

void movieEvent(Movie m) {
  m.read();
}
