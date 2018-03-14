#include <SoftwareSerial.h>
 
SoftwareSerial esp8266(2, 3); // RX: Tx
                           
void setup() {
  Serial.begin(115200);
  esp8266.begin(115200); // your esp's baud rate might be different
//  delay(2000);/
//  setupESP();/
}
void loop() {
  if(esp8266.available()) // check if the esp is sending a message 
  {
    while(esp8266.available())
    {
      // The esp has data so display its output to the serial window 
      char c = esp8266.read(); // read the next character.
      Serial.write(c);
    }
  }
  
  if(Serial.available()) {
    // the following delay is required because otherwise the arduino will read the first letter of the command but not the rest
    // In other words without the delay if you use AT+RST, for example, the Arduino will read the letter A send it, then read the rest and send it
    // but we want to send everything at the same time.
    delay(1000); 
    
    String command="";
    
    while(Serial.available()) // read the command character by character
    {
        // read one character
      command+=(char)Serial.read();
    }
    esp8266.println(command); // send the read character to the esp8266
  }
}


void setupESP() {
  esp8266.println("AT");
  if (findResponse("OK", 2, 5000, 1)) {
    Serial.println("OK here");
  } else {
    Serial.println("ERror here");
  }
  
}

boolean findResponse(const char keyword[], int size, int timeout, byte mode) {
  const int startTime = millis();

  while (esp8266.available() == 0) {
    if (millis() - startTime > timeout) {
      Serial.println("timeout: ");
      Serial.print(millis() - timeout);
      return false;
    }
  }
  
  String response = "";
  
  while (esp8266.available()) {
    char c = esp8266.read();
    response += c;
    Serial.println( c + " h: " + response);
  }

//  Serial.print();/
  Serial.println("the response: " + response);
  return true;
}

