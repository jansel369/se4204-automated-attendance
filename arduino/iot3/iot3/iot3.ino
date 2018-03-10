
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
const char hostName[] = "http://192.168.8.101";
//const char ssid[] = "HiveNet";
//const char ssidPass[] = "";
//const char hostName[] = "192.168.137.244";
const short hostPort = 3000;

String data = "tae=123";

// global var
boolean isSetup = false;

SoftwareSerial esp8266(2, 3); /* RX:D3, TX:D2 */
ESP8266 wifi(esp8266);

void setup() {
  esp8266.begin(115200);
  Serial.begin(115200);
  
  reset();
  delay(2000);
  connect();
//  espSetup();/

//  espSetup();/
}


void loop() {
  // put your main code here, to run repeatedly:
//  testConnection();////
//  delay(3000);
  httppost();
  delay(5000);
}

void reset() {
  esp8266.println("AT+RST");
  delay(1000);
  if (esp8266.find("OK")) Serial.println("Module Had been reset");
}

void connect() {
//  String cmd = "AT+CWJAP=\"";
//  cmd += ssid;
//  cmd += "\",\"";
//  cmd += ssidPass;
//  cmd += "\"";
  const char cmd[] = "AT+CWJAP=\"HUAWEI-E5373-E4F9\",\"f1frd1ij\"";
  Serial.println(cmd);
  esp8266.println(cmd);
  delay(4000);
  if (esp8266.find("OK")) {
    Serial.println("Connected to WIFI.");
  }
  
}

String getPostRequest() {
    String post = "POST ";
    post += "/post";
    post += " HTTP/1.1\r\n";
    post += "Host: ";
    post += hostName;
    post += ":3000";
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

//void httppost(String uri, int dataLength, char[] data) {
void httppost() {
  const char cmd[] = "AT+CIPSTART=\"TCP\",\"192.168.8.101\",3000";
//  String cmd = "AT+CIPSTART=\"TCP\",";
//  cmd += hostName;
//  cmd += ",";
//  cmd += hostPort;
//  Serial.println(cmd);
  esp8266.println(cmd);
  if (esp8266.find("OK")) {
    Serial.println("TCP Connection Ready.");
    delay(1000);
    String post = getPostRequest();
//    Serial.println(post); 

    const char sendCmd[] = "AT+CIPSEND=";
    esp8266.print(sendCmd);
    esp8266.println(100);
//    esp8266.println(post.length());
//    delay(500);

    if (esp8266.find(">")) {
      Serial.println("Sending...");
// x     delay(2000);
      esp8266.print(post); 
    }
    if (esp8266.find("SEND OK")) {
      Serial.print("Packet Sent.");
    }

    while(esp8266.available()) {
      delay(3000);
      const String tmpResp = esp8266.readString();
      Serial.println(tmpResp);
      Serial.println("YOYO");
    }

    //close connection
    delay(2000);
    esp8266.println("AT+CIPCLOSE");
  }
}

void espSetup() {
  Serial.print("status: ");
  Serial.println(wifi.kick());
  delay(1000);
  Serial.print("restart: ");
  Serial.println(wifi.restart());
  delay(1000);
  
  Serial.print("FW version: ");
  Serial.println(wifi.getVersion());
  delay(1000);
  
  if (wifi.setOprToStation()) {
    Serial.print("to station ok\r\n");
  } else {
    Serial.print("to station err\r\n");
  }

  if (wifi.joinAP(ssid, ssidPass)) {
    Serial.print("Join AP success\r\n");
    Serial.print("IP: ");
    delay(1000);
    Serial.println(wifi.getLocalIP());
  } else {
    Serial.print("Join AP failure\r\n");
  }

  if (wifi.disableMUX()) {
    Serial.print("single ok\r\n");
  } else {
    Serial.print("single err\r\n");
  }
  delay(1000);
}

void testConnection() {
      uint8_t buffer[1024] = {0};

    if (wifi.createTCP(hostName, hostPort)) {
        Serial.print("create tcp ok\r\n");
    } else {
        Serial.print("Create tcp error\r\n");
    }

    char *hello = "GET http://192.168.254.103:3000/api/logs HTTP/1.1";
    wifi.send((const uint8_t*)hello, strlen(hello));

    uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
    if (len > 0) {
        Serial.print("Received:[");
        for(uint32_t i = 0; i < len; i++) {
            Serial.print((char)buffer[i]);
        }
        Serial.print("]\r\n");
    }

    if (wifi.releaseTCP()) {
        Serial.print("release tcp ok\r\n");
    } else {
        Serial.print("release tcp err\r\n");
    }
    
    while(1);
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

