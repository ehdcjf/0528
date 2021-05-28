require('dotenv').config();
const crypto = require('crypto');

module.exports = (req, res, next) => {

  let AccessToken = req.cookies.AccessToken;
  console.log(req.cookies.AccessToken);
  console.log(typeof AccessToken);
  if (AccessToken == undefined) {
    res.redirect('/?msg=로그인을 진행해주세요')
    return false;
  }

  let [header, payload, sign] = AccessToken.split('.');
  let signature = getSignature(header, payload);

  if (sign == signature) {
    console.log('검증된 토큰입니다.');
    let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
    console.log(userid);
    console.log(exp); //토큰 유효기간이 만료되는 시간
    let nexp = new Date().getTime();
    if (nexp > exp) {
      res.redirect('/?msg=토큰만료')
      res.clearCookie('AccessToken');
      return 0;
    }
    req.userid = userid;
    next();
  } else {
    res.redirect('/?msg=부적절한 토큰')
  }

}



function getSignature(header, payload) {

  let signature = crypto.createHmac('SHA256', Buffer.from(`${process.env.salt}`))
    .update(header + '.' + payload)
    .digest('base64')
    .replace('=', '');

  return signature;

}


//토큰 오류났을 때. 
/*
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')})
*/