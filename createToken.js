
/*


---JMT---
HEADER:
{
  "alg": "HS256",
  "typ": "JWT"
}

PAYLOAD:
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

VERIFY SIGNATURE

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  
your-256-bit-secret

) secret base64 encoded

////////////////////////////////////////////////
1차목표 header암호화하기. 




*/

//npm install crypto
require('dotenv').config()
const express = require('express'); 
const crypto = require('crypto'); 


function createToken(){ 
  let header = {
    "alg": "HS256",
    "typ": "JWT"
  }
  
  let payload = 
  {
    "sub": "1234567890",
    "name": "John Doe",
    "user":"kdch0823",
    "iat": 1516239022
  }
  
  
  let encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace('=','');
  //Object 를 String으로 바꾸기 위해 JSON.stringify(header): 객체를 스트링으로 바꾸기 위함.
  let encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace('==','');
  
  // console.log(encodedHeader);
  // console.log(encodedPayload);
  
  let signature = crypto.createHmac('SHA256',Buffer.from('duck'))
                  .update(`${encodedHeader}.${encodedPayload}`)
                  .digest('base64')
                  .replace('=','');
  console.log(`${encodedHeader}.${encodedPayload}.${signature}`);   
  // 위에 콘솔 값을 https://jwt.io/ 에서 확인가능  

  return `${encodedHeader}.${encodedPayload}.${signature}`;

}

let token = createToken(); 
console.log(token); 
module.exports = createToken; 
// let txt2 = Buffer.from(txt); //16진수로 바꿈. 
