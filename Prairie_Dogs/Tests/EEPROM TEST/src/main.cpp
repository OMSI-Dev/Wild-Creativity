#include <Arduino.h>
#include <EEPROM.h>

int a = 0;
uint8_t value;


void setup() {
 Serial.begin(9600);

}

void loop() {
  // value = EEPROM.read(a);

  // Serial.print(a);
  // Serial.print("\t");
  // Serial.print(value);
  // Serial.println();
  // value = value + 1 ;
  // Serial.print("value after addtion:");
  // Serial.println(value);
  // EEPROM.write(a,value);
  // delay(5000);
  // if(value== 512){
  //   value = 0;
  // }
}
