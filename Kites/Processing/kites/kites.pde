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
float senLevels = 0;
float percentage = 0;
String inputStr;

//timers
//Counts down the game intro and game time
Stopwatch gameTimer;
Stopwatch countTimer;
Stopwatch senUpdate; 

//
int gameTime = 3000;
int counter = 0; //for stop watch image
int ping = 5;
int senReturn = 0;
//images
PImage phone, splash, results,light,rKite,gKite,yKite,rFace,yFace,gFace;

//set the dial indicator to half size
float pointWidth = 89/2;
float pointHeight = 719/2;
//offset the center point to move to the center of the circle
float pointOffset = ((pointHeight/2)-22);

float previousSenLevels1 = senLevels;
String displayedSenLevels = "";

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
String spanish = "Fuerza";
String english = "/Force: ";

String spanishResults = "Cargos Telefonico";
String englishResults = "Phone Charge";

int circleRad = 300;
int perOffset = 450;
int titleXResults = 450;
int titleYResults = 850;

int titleX = 1920/2-300;
int titleY = 100;
float titlePadding = 0;

float smoothedSenLevels = 0;
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
// Create an ArrayList to store integers
ArrayList<Integer> variableSizeArray = new ArrayList<>();

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

int prevCount = 0;



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

  //image assignment
  phone = requestImage("/images/results.png");
  rKite = requestImage("/images/rKite.png");
  yKite = requestImage("/images/yKite.png");
  gKite = requestImage("/images/gKite.png");
  rFace = requestImage("/images/rFace.png");
  yFace = requestImage("/images/yFace.png");
  gFace = requestImage("/images/gFace.png");
  light = requestImage("/images/light.png");
  
  
  //movie assignment
  attractor = new Movie(this, "/images/attractor.mp4");

  // List all the available serial ports:
  printArray(Serial.list());
  // Com1 is Serial.list()[0]
  // Serial.list()[1] will pick up the next used COM port
  
  
  if (Serial.list().length > 1) {
    try
    {
    String portName = Serial.list()[1];
    ardPort = new Serial(this, portName, 115200);
    println("Connected to: " + portName);
    }catch(Exception e){
    String portName = Serial.list()[2];
    ardPort = new Serial(this, portName, 115200);
    println("Connected to: " + portName);
    }
  } else {
    String portName = Serial.list()[0];
    ardPort = new Serial(this, portName, 115200);
    println("Connected to: " + portName);
  }
  ardPort.bufferUntil(10);

  //Timer setup
  gameTimer = new Stopwatch(this);
  countTimer = new Stopwatch(this);
  senUpdate = new Stopwatch(this);
  
  
  
    //Graph Setup
  plot1 = new GPlot(this);
  plot1.setPos(100, 300);
  plot1.setDim(1200, 700);
  plot1.setMar(0, 0, 0, 0);

  //Set Title
  updateTitle();

  //Sets Grid limit to start
  plot1.setYLim(0.00, 500.000);
  plot1.setXLim(0.00, 1000.000);
  //Sets how much info is show per axis
  plot1.setVerticalAxesNTicks(3);
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

pulseX = new Ani(this,.25,"pulseDimX",75,Ani.BOUNCE_OUT);
pulseY = new Ani(this,.25,"pulseDimY",200,Ani.BOUNCE_OUT);
pulseX.start();
pulseY.start();
}

void draw() {
  background(255);
  noFill();
  
  if(gameOn)
  {
    if(!showResults){
      if(!countIn){
        drawGraph();
        sensorPing();
        updatePhone();
      }else{countDown();}
      
    }else{results();};
    
  }else{playMovie();}
//results();

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
  
  
  //red
  if(senLevels < 200){plot1.setLineColor(#FF0000);plot1.setPointColor(#FF0000);plot1.drawPoint(new GPoint(plotX,smoothedSenLevels),rKite);}
  //yellow
  else if(senLevels >=200 && senLevels <=400){plot1.setLineColor(#FF9900);plot1.setPointColor(#FF9900);plot1.drawPoint(new GPoint(plotX,smoothedSenLevels),yKite);}
  //green
  else if(senLevels > 400){plot1.setLineColor(#6aa84f);plot1.setPointColor(#6aa84f);plot1.drawPoint(new GPoint(plotX,smoothedSenLevels),gKite);};
  
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
  image(phone, 1700, 525,400,600);
  image(light, 1740, 470, pulseDimX, pulseDimY);
  
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
  if (senUpdate.time() > ping && plotX != 999) 
  {
    ardPort.write(39);
    float smoothingFactor = 0.55; 
    //Change senLevels to serial input
    smoothedSenLevels = lerp(previousSenLevels, senLevels, smoothingFactor); 
    
   // println("Smoothed value: " + smoothedSenLevels);
    
    plot1.addPoint(plotX,smoothedSenLevels);

    senUpdate.restart();
    plotX += 9;
    println("plotX: " + plotX);
    senStorage[int(arrayAdvance)] = int(senLevels);
    
    arrayAdvance++; 
    
    previousSenLevels = smoothedSenLevels;
    //store each sensor reading to array to be average
   
  }
  
  if(plotX == 999){
    
  calcResults = true; showResults = true;}
  
}

void updateTitle() {
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(#275daa);
  text(spanish, titleX, titleY);
  fill(#000000);
  text(english, titleX+textWidth(spanish)+20, titleY);
  textAlign(LEFT, CENTER);
  // Check if senLevels has changed by 2
  if (abs(senLevels - previousSenLevels1) >= 2) {
    previousSenLevels1 = senLevels;
    displayedSenLevels = trim(str(round(senLevels)));
  }
  if(previousSenLevels1 == 0.00){displayedSenLevels = "0";}
  
  fill(#000000);
  titlePadding = (titleX+textWidth(spanish) + textWidth(english));
  text(displayedSenLevels + " N", titlePadding-150, titleY);
  
  textSize(30);
  text(200, 1350, 720);
  text(400, 1350, 440);
}

void mouseReleased()
{
 println("Mouse X:" + mouseX + " Mouse Y:" + mouseY); 
}



int[] removeZeros(int[] arr) {
  int count = 0;
  
  // Count the number of non-zero elements
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      count++;
    }
  }
  
  if(count == 0){count = 6;};
  
  // Create a new array with non-zero elements
  int[] filteredArray = new int[count];
  int index = 0;
  
  for (int i = 0; i < arr.length; i++) {
    if (arr[i] != 0) {
      filteredArray[index] = arr[i];
      index++;
    } 
  }
  printArray(filteredArray);
  return filteredArray;
}


int calc(int avgReturn)
{

      if (calcResults) 
    {
                
        //remove any zeros from the array        
        int[] filteredArray = removeZeros(senStorage);
        
        //store filteredArray to array list to use for percentage later
        //REMOVE
        for (int i = 0; i < filteredArray.length; i++) {
        variableSizeArray.add(filteredArray[i]);
        }
        
        println("Array " + filteredArray.length);
        
        if(filteredArray.length <=1)
        {          
          for(int i = 0; i<5; i++)
          {
            println("Array assigned index : " + i);
            filteredArray[i] = 1;
            println("Array after update " + filteredArray.length);
          }
        }
        
        if(filteredArray == null)
        {
          println("array is null, setting values to 1");
          
         filteredArray = new int[20];
         
         for(int i = 0; i<20; i++)
         {
            filteredArray[i] = 1;
         }
          
        }
        
        //find Mode
        // Count the occurrences of each element in senStorage
        Map<Integer, Integer> occurrences = new HashMap<>();
        int maxCount = 0;
        int mode = 0;
    
        for (int i = 0; i < filteredArray.length; i++) {
            int value = int(filteredArray[i]);
            
            int count = occurrences.getOrDefault(value, 0) + 1;
            occurrences.put(value, count);
    
            if (count > maxCount) {
                maxCount = count;
                mode = value;
            }
        }    
        
        println("Mode: " + mode + ", Frequency: " + maxCount);

        int avg = 0;
        
      //find average       
      for (int i = 0; i < filteredArray.length; i++) 
      {
        avg += int(filteredArray[i]);        
      }
      avg = avg/filteredArray.length;
      
      avgReturn = avg;   
      println("avg: " + avgReturn);
     }
       calcResults = false;
       //send that game is over and in results
      ardPort.write(38);
        
      return avgReturn;
}

void results()
{  
  //calculate results to be displayed
    if (calcResults) 
    {
      senReturn = calc(senReturn);
      println("return: " + senReturn);
      //update graphics whith proper graphic and score.
     percentage = abs((float(senReturn) / 500) * 100.0);
     println("return percentage: " + percentage);
    }
  

 
  //adjust colors
  if(perCount < 33){fill(#FF0000);}
  else if(perCount >=33 && perCount <=65){fill(#FF9900);}
  else if(perCount > 65){fill(#6aa84f);};
  

  
  if(perCount < percentage)
  {
    pushStyle();
    textAlign(LEFT);
    text(str(round(perCount))+"%",(titleXResults+spanishResults.length())+perOffset, 900);
    popStyle();
    perCount++;
    //stall the code to increase count time
    //the delay will work just fine as the Arduino waits for a signal before moving on
    delay(35); 
  }else
  {
    
  pushStyle();
  textAlign(LEFT);
  text(str(round(perCount))+"%",(titleXResults+spanishResults.length())+perOffset, 900);
  popStyle();
  if(gameTimer.isPaused())
  {
  gameTimer.restart();
  println("Results countdown");
  }
  }
  
  int corner1X = 1630;
  int corner1Y = 647;
  float rectHeight = map(perCount,0, 100,corner1Y,330); //385
  
 
  //corner2X,corner2Y,corner3X,corner3Y,
   rectMode(CORNERS);
   rect(corner1X,corner1Y,1780,rectHeight,20);
   fill(0);
    //println("perCount: " + round(perCount) );
    //println("percent: " + round(percentage));
    //println("perCount: " + ceil(perCount) );
    //println("percent: " + ceil(percentage));
    
    imageMode(CENTER);
    image(phone, 1665, 555,400,600);
    textSize(50);
    textAlign(LEFT);
    fill(#275daa);
    text(spanishResults, titleXResults, titleYResults);
    fill(#000000);
    text(englishResults, titleXResults, titleYResults+50);
    textSize(150);
    textAlign(CENTER);
    
    
    //play sound based on results
    if (percentage >= 66 && ceil(perCount) == ceil(percentage) )
    {
                pushStyle();
        image(gFace,width/2- 50,375,gFace.width+100,gFace.height+100);
         popStyle();
        
        pushStyle();
        noFill();
        stroke(#6aa84f);
        strokeWeight(30);
        circle(width/2-50,375,gFace.width + 200); 
        popStyle();
          playWin(int(percentage));
        
    } else if (percentage >= 33 && percentage < 66 && ceil(perCount) == ceil(percentage))
    {

                pushStyle();
        image(yFace,width/2- 50,375,yFace.width+100,yFace.height+100);
         popStyle();
        
        pushStyle();
        noFill();
        stroke(#FF9900);
        strokeWeight(30);
        circle(width/2-50,375,rFace.width + 200); 
        popStyle();
         playWin(int(percentage));
          
    } else if (percentage < 33 && ceil(perCount) == ceil(percentage))
    {
        pushStyle();
        image(rFace,width/2- 50,375,rFace.width+100,rFace.height+100);
         popStyle();
        
        pushStyle();
        noFill();
        stroke(#FF0000);
        strokeWeight(30);
        circle(width/2-50,375,rFace.width + 200); 
        popStyle();
        
        playWin(int(percentage));
    }



   //leave results
  if (gameTimer.time()>gameTime)
  {
    //tell arduino we are in results
    ardPort.write(40);
    gameTimer.restart();
    gameTimer.pause();
    flagReset();
  }

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
  
  //clear tracking variables
  arrayAdvance = 0;
  previousSenLevels = 1; 
  smoothedSenLevels= 1;
  plotX = 0;
  perCount = 0;
  senReturn = 0;
  //clear graph
  plot1.setPoints(new GPointsArray());
  //reset game array:
  for(int i=0;i<senStorage.length;i++)
  {
   senStorage[i] = 0;
  }
}


void playWin(int percentage)
{
  if (showResults == true)
  {
    //play sound based on results
    if (percentage >= 66)
    {
      if (playOnce == true)
      {
        green.play();
        playOnce = false;
      }
    } else if (percentage >= 33 && percentage < 66)
    {
      if (playOnce == true)
      {
        orange.play();
        playOnce = false;
      }
    } else if (percentage < 33)
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
  println ("Input Str: " + inputStr);
  //! (33) = Signals arduino knows game is over
  //# (35) = Start game has been pressed
  //$ (36) = Game over signal
  //% (37) = End game by stop button
  //& (38) = Entered Results
  //' (39) = ask arduino to send sensor update
  //( (40) = Left Results
  //) (41) = allow stop button
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
    flagReset();
    ardPort.write(40);
  } else if (inputStr.equals("!") == true) {
    //Arduino left game state
    // we should use this to sync processing & arduino
  } else {
    //Convert to string to integer value to parse sensor data
    senLevels = float(inputStr);
    plot1.addPoint(plotX, senLevels);
    
  }
}


void countDown(){
  println("Count in timer: " + countTimer.time());
  
  if (countTimer.time()<1) {
    countTimer.start();    
  }

  counter =  3 - round(countTimer.time()/1000);

 if(counter != prevCount){prevCount = counter; playOnce = true;};
     
  if((counter < 1000 || counter < 2000 && counter >1000 || counter >3000) && playOnce){
  countdown.play();
  playOnce = false;
  }
  
  if(counter == 0){countdownStart.play();}
  
  println("Count: " + counter);
  fill(#000000);
  textAlign(CENTER,CENTER);

  if (counter >=0)
  {
    textSize(500);
    text(str(counter), width/2, height/2);
  }
  if(counter == 0)
  {
    countIn = false;
    gameOn = true;
    playOnce = true;
    countTimer.restart();
    countTimer.pause();
    ardPort.write(41);
     
  }
}
