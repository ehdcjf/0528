require('dotenv').config();
const crypto = require('crypto'); 



//jwt 토큰생성 header.payload.signature
function createToken(userid){ 
  let header = { 
    'tpy' : "JWT",
    "alg" :"HS256"
  }

  let exp = new Date().getTime()+(2*60*60*1000)//현재시간으로부터 2시간을 더한 수 

  let payload = { 
    userid,
    exp//시간 제한 
  }

  const encodedHeader = Buffer.from(JSON.stringify(header))
                                  .toString('base64')
                                  .replace('=','')
                                  .replace('==',''); 

  const encodedPayload = Buffer.from(JSON.stringify(payload))
                                  .toString('base64')
                                  .replace('=','')
                                  .replace('==','');

  let signature = crypto.createHmac('SHA256',Buffer.from(`${process.env.salt}`))
                                  .update(`${encodedHeader}.${encodedPayload}`)
                                  .digest('base64')
                                  .replace('=','');
  let jwt = `${encodedHeader}.${encodedPayload}.${signature}`
  return jwt; 
                                  
}



module.exports = createToken; 