//Keyboard Component Setup
#include <Keypad.h>
#include <SoftwareSerial.h>

#define DEBUG true

SoftwareSerial esp8266(0, 1);

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

//Buzzer Component Setup
int buzzer = 11;
// Setting Buzzer mode to False
boolean buzzerMode = false;
const int openButtonPin = 12;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  esp8266.begin(9600);

  pinMode(buzzer, OUTPUT);
  pinMode(openButtonPin, INPUT);


  sendData("AT+RST\r\n", 2000, DEBUG); // reset module
  sendData("AT+CWMODE=2\r\n", 1000, DEBUG); // configure as access point
  sendData("AT+CIFSR\r\n", 1000, DEBUG); // get ip address
  sendData("AT+CIPMUX=1\r\n", 1000, DEBUG); // configure for multiple connections
  sendData("AT+CIPSERVER=1,80\r\n", 1000, DEBUG); // turn on server on port 80
}

void buzz() {
  unsigned char i;
  int counter = 0;
  while (counter <= 3 || buzzerMode == true) {
    for (i = 0; i < 3; i++) {
      digitalWrite(buzzer, HIGH);
      delay(1000);
      digitalWrite(buzzer, LOW);
      delay(1000);
    }
    //    tone(buzzer, 1000);
    counter++;
    Serial.print(counter);
  }
}

String sendData(const char *command, const int timeout, boolean debug) {
  char response[] = "";

  esp8266.print(command); // send the read character to the esp8266

  long int time = millis();

  while ( (time + timeout) > millis())
  {
    while (esp8266.available())
    {

      // The esp has data so display its output to the serial window
      char c = esp8266.read(); // read the next character.
      //        response+=c;
//      strcpy(response, c);
    }
  }

  if (debug)
  {
    Serial.print(response);
  }

  return response;
}

void sendToWebsite() {
  if (esp8266.available()) {

    //    if(esp8266.find("+IPD,")) {
    delay(1000);
    int connectionId = esp8266.read() - 48;
    char message[] = "<h1> HELLO WORLD FROM ARDUINO </h1>";
    char cipSend[] = "AT+CIPSEND=";

    //      cipSend += connectionId;
    //      cipSend += ",";
    //      cipSend += message.length();
    //      cipSend += "\r\n";

    sendData(cipSend, 1000, DEBUG);
    sendData(message, 1000, DEBUG);


    char closeCommand[] = "AT+CIPCLOSE=";
    //      closeCommand += connectionId;
    //      closeCommand += "\r\n";

    sendData(closeCommand, 3000, DEBUG);
    Serial.print("Executed send to website.");
    //    }

  }
}

void loop() {
  // put your main code here, to run repeatedly:
//  sendToWebsite();
  char keypressed = kpd.getKey();

  int openButtonStatus = digitalRead(openButtonPin);
  if (openButtonStatus == HIGH) {
    Serial.print("HAHAHA");
    buzzerMode = !buzzerMode;
    Serial.print(buzzerMode);
  }

  if (keypressed != NO_KEY) {
    Serial.print(keypressed);
    buzzerMode = true;
    buzz();
  }

  //  buzz();
}
