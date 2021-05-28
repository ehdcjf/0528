document.addEventListener('DOMContentLoaded',init);
function init(){ 
  const loginBtn = document.querySelector('#loginBtn');
  const layerPopup = document.querySelector('.layerPopup');  
  const localLogin = document.querySelector('#localLogin');
  loginBtn.addEventListener('click',loginBtnFn); 
  layerPopup.addEventListener('click',popupClose)
  localLogin.addEventListener('click',login); 
}

function loginBtnFn(){ 
  const layerPopup = document.querySelector('.layerPopup'); 
  layerPopup.classList.add('open'); 
}

function popupClose(event){
  if(event.target ==this){ 
    this.classList.remove('open')
  }
}

async function login(){ 
  const userid = document.querySelector('#userid');
  const userpw = document.querySelector('#userpw');

  if(userid.value ==""){ 
    alert('아이디를 입력해주세요.'); 
    userid.focus(); 
    return false; 
  }

  if(userpw.value==""){ 
    alert('비밀번호를 입력해주세요.'); 
    userpw.focus(); 
    return false; 
  }

  //POST auth/local/login 
  let url = 'http://localhost:3000/auth/local/login';
  // let options ={ 
  //   method:'POST',
  //   headers:{ //헤더가 아니라 헤더스 
  //     'content-type':'application/x-www-form-urlencoded'
  //   }, 
  //   body:`userid=${userid.value}&userpw=${userpw.value}`
  // }
  let options = { 
    method:'POST', 
    headers:{ 
      'content-type':'application/json', //json으로 넘기고 싶다면 bodyparser.json 미들웨어 추가.
    
      // 'data':JSON.stringify({ 
      //   huserid:userid.value,
      //   huserpw:userpw.value,
      // }),
    },
      body:JSON.stringify({ 
      userid:userid.value,
      userpw:userpw.value,
    })
  }
  ////  바디에 스트링으로 넣기 
  //// 바디에 제이슨으로 넣기 -> 제이슨으로 넣으면 스트링으로 바꿔주기
  //// 헤더에 data 제이슨으로 넣기 -> 제이슨으로 넣으면 스트링으로 바꿔주기
  let response = await fetch(url,options);
  console.log(response); 
  let json = await response.json(); 

  let {result,msg} = json; 
  alert(msg); 
  if(result){ 
    let layerPopup = document.querySelector('.layerPopup'); 
    layerPopup.classList.remove('open')
  }else{ 
    userid.value = ''; 
    userpw.value = ''; 
    userid.focus(); 
  }


}






