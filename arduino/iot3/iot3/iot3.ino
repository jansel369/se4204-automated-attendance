#include "ESP8266.h"
#include <SoftwareSerial.h>

// global constant
const char ssid[] = "monkey";
const char ssidPass[] = "pass551010";
const char hostName[] = "http://192.168.254.103";
const short hostPort = 3000;

// global var
boolean isSetup = false;


SoftwareSerial esp8266(2, 3); /* RX:D3, TX:D2 */
ESP8266 wifi(esp8266);

void setup() {
  esp8266.begin(115200);
  Serial.begin(115200);

  delay(2000);
//  espSetup();/

//  espSetup();/
}

void loop() {
  // put your main code here, to run repeatedly:
  testConnection();////
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

