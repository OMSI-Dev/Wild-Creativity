#include <Arduino.h>
#include <bounce2.h>

#define nutPin 7
#define pressPin 12
#define reedPin 13

#define nutLight 9
#define pressLight 10
#define reedLight 11

bool reedState,pressState,nutState;

Bounce2::Button nutBtn = Bounce2::Button();
Bounce2::Button pressBtn = Bounce2::Button();


void setup() {

nutBtn.attach(nutPin, INPUT_PULLUP);
nutBtn.interval(5);
nutBtn.setPressedState(LOW);

pressBtn.attach(pressPin, INPUT_PULLUP);
pressBtn.interval(5);
pressBtn.setPressedState(LOW);

pinMode(reedPin, INPUT);
pinMode(nutLight, OUTPUT);
pinMode(pressLight, OUTPUT);
pinMode(reedLight, OUTPUT);

digitalWrite(nutLight, LOW);
digitalWrite(pressLight, LOW);
digitalWrite(reedLight, LOW);

}

void loop() {
  nutBtn.update();
  pressBtn.update();
  reedState = digitalRead(reedPin);
  nutState = nutBtn.isPressed();
  pressState = pressBtn.isPressed();

  //Check if the nut button is pressed and turn on the light if it is
  if(nutState == true)
  {
    digitalWrite(nutLight, HIGH);
  }
  else
  {
    digitalWrite(nutLight, LOW);
  }

  //Check if the pressed button is pressed and turn on the light if it is
  if(pressState == true)
  {
    digitalWrite(pressLight, HIGH);
  }
  else
  {
    digitalWrite(pressLight, LOW);
  }

//Check if the reed switch is pressed and turn on the light if it is
 if(reedState == true)
  {
    digitalWrite(reedLight, HIGH);
  }
  else
  {
    digitalWrite(reedLight, LOW);
  }

}