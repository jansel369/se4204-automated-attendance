#include <Keypad.h>

const int keypadRows = 4;
const int keypadCols = 3;

char keyMap[keypadRows][keypadCols] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7', '8', '9'},
  {'*', '0', '#'}
};

byte keypadRowPins[keypadRows] = {6, 5, 4, 3};
byte keypadColPins[keypadCols] = {2, 8, 9};

Keypad kpd = Keypad(makeKeymap(keyMap), keypadRowPins, keypadColPins, keypadRows, keypadCols);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

}

void loop() {
  // put your main code here, to run repeatedly:
  char keypressed = kpd.getKey();
  if (keypressed != NO_KEY) {
    Serial.print(keypressed);
  }
}
