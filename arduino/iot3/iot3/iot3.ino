//imported libraries
#include <SoftwareSerial.h>
#include <Keypad.h>
#include <LiquidCrystal_I2C.h>

static char respBuffer[4096];


//LCD
LiquidCrystal_I2C lcd(0x27,16,2);
char array1[]=" SunFounder               ";  //the string to print on the LCD
char array2[]="hello, world!             ";  //the string to print on the LCD
int tim = 500;


//keypad
const byte keypadRows = 4;
const byte keypadCols = 3;
const char keyMap[keypadRows][keypadCols] = {
  {'1', '2', '3'},
  {'4', '5', '6'},
  {'7','8','9'},
  {'#','0','*'}
};
byte rowPins[keypadRows] = { 12, 11, 10, 9 };
byte colPins[keypadCols] = { 8, 7, 6 }; 
Keypad kpd = Keypad(makeKeymap(keyMap), rowPins, colPins, keypadRows, keypadCols);

// global constant
const char ssid[] = "monkey";
const char ssidPass[] = "pass551010";
const char hostName[] = "http://192.168.254.102";
//const char ssid[] = "HUAWEI-E5373-E4F9";
//const char ssidPass[] = "f1frd1ij";
//const char hostName[] = "http://192.168.8.100";
const short hostPort = 3000;

unsigned long lastTimeMillis = 0;

String data = "tae:123";


// global var
boolean isSetup = false;
String idNumber = "";
boolean sending = false;

SoftwareSerial esp8266(2, 3); /* RX:D3, TX:D2 */

void setup() {
  esp8266.begin(115200);
  Serial.begin(115200);
  setupLCD();
  
  reset();
  setupConfiguration();
  delay(500);
  connect();
  delay(500);
  establishTCPConnection();
  delay(500);

}


void loop() {

  readInput();
  if (sending == false) {
    lcdLoop();
  }
  else {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("    CHECKING...    ");
    delay(3000);
    sending = false;
  }
  if (idNumber.length() >= 8) {
    sending = true;
    send();
    delay(2000);
    idNumber = "";
  }
//  delay(5000);
}

void reset() {
  esp8266.println("AT+RST");
  delay(1000);
  if (esp8266.find("OK")) Serial.println("Module Had been reset");
}

void setupLCD() {
  lcd.init();  //initialize the lcd
  lcd.backlight();  //open the backlight //
}

void closeLCD() {
  lcd.clear();
  lcd.noBacklight();
}

void lcdLoop() {
  lcd.clear();
  lcd.setCursor(0, 0);
//  lcd.print("    RINGGING    ");
  lcd.print(idNumber);
  lcd.setCursor(0, 1);
  lcd.print("    ID NUMBER    ");
  delay(100);
//  closeLCD();
}

void readInput() {
  char keypressed = kpd.getKey();
  if (keypressed != NO_KEY) {
//    typing = true;
    if (idNumber.length() <= 8) {
      idNumber += String(keypressed);
    }
    else {
      for (int x = 0; x < idNumber.length(); x++) {
        if (x < 8) {
          idNumber[x] = idNumber[x + 1];
        }
        if (x == 8) {
          idNumber[x] = keypressed;
        }
      }
    }
    Serial.println(idNumber);
  }
}

void connect() {
    const char cmd[] = "AT+CWJAP=\"monkey\",\"pass551010\"";
//  const char cmd[] = "AT+CWJAP=\"HUAWEI-E5373-E4F9\",\"f1frd1ij\"";
  esp8266.println(cmd);
  delay(4000);
  if (esp8266.find("OK")) {
    Serial.println("Connected to WIFI.");
  }
}



void printResponse() {
  while (esp8266.available()) {
    Serial.println(esp8266.readStringUntil('\n'));
  }
}

void establishTCPConnection() {
//  const char cmd[] = "AT+CIPSTART=\"TCP\",\"192.168.8.100\",3000";
  const char cmd[] = "AT+CIPSTART=\"TCP\",\"192.168.254.102\",3000";
  esp8266.println(cmd);
  if (esp8266.find("OK")) {
//    Serial.println("TCP Connection Ready.");
    delay(1000);
    printResponse();
  }
}

void setupConfiguration() {
  esp8266.println("AT+CWMODE=3");
  delay(500);
  printResponse();

  esp8266.println("AT+CIPMUX=1");
  delay(500);
  printResponse();

  esp8266.println("AT+CIPSERVER=1,80");
  delay(5000);
  printResponse();
}

void send() {
  if (millis() - lastTimeMillis > 10000) {
    lastTimeMillis = millis();

    esp8266.println("AT+CIPMUX=1");
    delay(500);
    printResponse();
//    esp8266.println("AT+CIPSTART=4,\"TCP\",\"192.168.8.100\",3000");
    esp8266.println("AT+CIPSTART=4,\"TCP\",\"192.168.254.102\",3000");
    //192.168.10.148 -> lab
    //192.168.254.103 -> dianzel
    delay(500);
    printResponse();

    String cmd = getPostRequest(idNumber);
//      String cmd = getPostRequest(getJSON(idNumber));
    esp8266.println("AT+CIPSEND=4," + String(cmd.length() + 4));
    delay(1000);

    esp8266.println(cmd);
    delay(500);
    esp8266.println("");
  }

  if (esp8266.available()) {
//    String message = esp8266.read();
//    Serial.write(message);
  }
}

String getJSON(String data) {
  String json = "\"passcode\":";
  json += "\"";
  json += data;
  json += "\"";
  return json;
}


String getGetRequest() {
  String req = "GET /";
  req += "api/logs?apples=56";
  req += " HTTP/1.1\r\n";
  req += "Host: ";
  req += hostName;
  req += ":";
  req += hostPort;
  req += "\r\n\r\n";
  return req;
}

String getPostRequest(String postData) {
    String post = "POST /";
    post += "custom";
    post += " HTTP/1.1\r\n";
    post += "Host: ";
    post += hostName;
    post += "\r\n";
    post += "Accept: *";
    post += "/";
    post += "*\r\n";
    post += "Content-Length: ";
//    post += data.length();
    post += postData.length();
    post += "\r\n";
    post += "Content-Type: application/x-www-form-urlencoded\r\n";
    post += "\r\n";
    post += postData;
    
    return post;
}



//String post = "POST " + "/dogs" + " HTTP/1.0\r\n" +
//
//"Host: " + "http://192.168.8.100" + "\r\n" +
//
//"Accept: *" + "/" + "*\r\n" +
//
//"Content-Length: " + data.length() + "\r\n" +
//
//"Content-Type: application/x-www-form-urlencoded\r\n" +
//
//"\r\n" + data;




