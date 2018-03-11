

#include "ESP8266.h"
#include <SoftwareSerial.h>
#include <ArduinoJson.h>

static char respBuffer[4096];

// global constant
//const char ssid[] = "monkey";
//const char ssidPass[] = "pass551010";
//const char hostName[] = "http://192.168.254.103";
const char ssid[] = "HUAWEI-E5373-E4F9";
const char ssidPass[] = "f1frd1ij";
const char hostName[] = "http://192.168.8.100";
const short hostPort = 3000;

unsigned long lastTimeMillis = 0;

String data = "tae=123";

// global var
boolean isSetup = false;

SoftwareSerial esp8266(2, 3); /* RX:D3, TX:D2 */
ESP8266 wifi(esp8266);

void setup() {
  esp8266.begin(115200);
  Serial.begin(115200);
  
  reset();
  setupConfiguration();
  delay(500);
  connect();
  delay(500);
  establishTCPConnection();
  delay(500);

}


void loop() {

  send();
  delay(5000);
}

void reset() {
  esp8266.println("AT+RST");
  delay(1000);
  if (esp8266.find("OK")) Serial.println("Module Had been reset");
}

void connect() {
  const char cmd[] = "AT+CWJAP=\"HUAWEI-E5373-E4F9\",\"f1frd1ij\"";
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
  const char cmd[] = "AT+CIPSTART=\"TCP\",\"192.168.8.100\",3000";
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

    esp8266.println("AT+CIPSTART=4,\"TCP\",\"192.168.8.100\",3000");
    //192.168.10.148 -> lab
    //192.168.254.103 -> dianzel
    delay(500);
    printResponse();

    String cmd = "GET /custom HTTP/1.1";
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


String getGetRequest() {
  String req = "GET /";
  req += "api/logs?apples=56";
  req += " HTTP/1.1\r\n";
  req += "Host: ";
  req += hostName;
  req += ":";
  req += hostPort;
  req += "\r\n\r\n";
  String sample =  "GET ";
    sample += "/custom ";
    sample += "HTTP/1.1\r\n";
    sample += "Host: 192.168.8.100\r\n\r\n";
  return req;
}

String getPostRequest() {
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
    post += data.length();
    post += "\r\n";
    post += "Content-Type: application/x-www-form-urlencoded\r\n";
    post += "\r\n";
    post += data;
    
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



//
//
//
//void espSetup() {
//  Serial.print("status: ");
//  Serial.println(wifi.kick());
//  delay(1000);
//  Serial.print("restart: ");
//  Serial.println(wifi.restart());
//  delay(1000);
//  
//  Serial.print("FW version: ");
//  Serial.println(wifi.getVersion());
//  delay(1000);
//  
//  if (wifi.setOprToStation()) {
//    Serial.print("to station ok\r\n");
//  } else {
//    Serial.print("to station err\r\n");
//  }
//
//  if (wifi.joinAP(ssid, ssidPass)) {
//    Serial.print("Join AP success\r\n");
//    Serial.print("IP: ");
//    delay(1000);
//    Serial.println(wifi.getLocalIP());
//  } else {
//    Serial.print("Join AP failure\r\n");
//  }
//
//  if (wifi.disableMUX()) {
//    Serial.print("single ok\r\n");
//  } else {
//    Serial.print("single err\r\n");
//  }
//  delay(1000);
//}
//
//void testConnection() {
//      uint8_t buffer[1024] = {0};
//
//    if (wifi.createTCP(hostName, hostPort)) {
//        Serial.print("create tcp ok\r\n");
//    } else {
//        Serial.print("Create tcp error\r\n");
//    }
//
//    char *hello = "GET http://192.168.254.103:3000/api/logs HTTP/1.1";
//    wifi.send((const uint8_t*)hello, strlen(hello));
//
//    uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
//    if (len > 0) {
//        Serial.print("Received:[");
//        for(uint32_t i = 0; i < len; i++) {
//            Serial.print((char)buffer[i]);
//        }
//        Serial.print("]\r\n");
//    }
//
//    if (wifi.releaseTCP()) {
//        Serial.print("release tcp ok\r\n");
//    } else {
//        Serial.print("release tcp err\r\n");
//    }
//    
//    while(1);
//}

