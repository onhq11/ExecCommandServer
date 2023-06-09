<div align="center">
    
# ExecCommand Server
Server that allows you to control GPIO and execute bash scripts remotely using URL requests<br>
**[Install Now »](https://github.com/onhq11/ExecCommandServer/releases)**<br><br><br>
</div><br><br>

## Requirements
- NodeJS preinstalled

## Installation
- Clone repository
- Enter to folder and execute ```npm i```
- Run server using ```node index.js```

## Configuration
- Open index.js file
- Configure port by changing 41420
- Configure startup commands according to pattern
- Configure scripts according to the pattern
     - trigger: Request URL to execute
     - path: Path to your script

## URL Requests
- Export PIN ```/export<PIN>```
- Unexport PIN ```/unexport<PIN>```
- Set PIN direction to out ```/out<PIN>```
- Set PIN direction to in ```/out<PIN>```
- Set GPIO state ```/gpio<PIN>-<1/0>```

## Author
- [@onhq11](https://github.com/onhq11)
