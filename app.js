var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const axios = require('axios').default;


const { setInterval } = require('timers');


var cors=require("cors")


var facemasksRouter = require('./routes/facemasks');
var glovesRouter = require('./routes/gloves');
var beaniesRouter = require('./routes/beanies');

var app = express();
var router = express.Router();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var corsOptions = {
  origin: ['http://localhost:3000',"https://aralacikalin.github.io/"],
  credentials: true
}

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/facemasks', facemasksRouter);
app.use('/gloves', glovesRouter);
app.use('/beanies', beaniesRouter);

let xmlParser = require('xml2js');

var availabilities=[]

var manufacturer=['umpante', 'ippal', 'abiplos', 'okkau', 'niksleh', 'laion']


async function fet(element){
  r =await axios.get("https://bad-api-assignment.reaktor.com/v2/availability/"+element)
  d=await r.data
  console.log(d.response.length)
  console.log(element)
  if(d.response.length===2){ // dont know the reason why but when its empty it returns 2
    console.log("EMPTY")
    return await fet(element)
  }
  else{
    console.log("NOT EMPTY")
    return(d.response)
  }
  
}

function avail(){
  console.log("here")
  availabilities=[]
  
  manufacturer.forEach(element => {
    
    fet(element).then(d=>{
      d.forEach(element => {
        xmlParser.parseString(element.DATAPAYLOAD, (err, result) => {
          if(err) {
              throw err;
          }
          availabilities.push({id:element.id,ava:result.AVAILABILITY.INSTOCKVALUE[0]})
          
        });
      });
      console.log(availabilities)
    })
  });
  
}
avail()
setInterval(avail,5*1000*60)


app.use("/ava",router.get("/:id(*)",function(req,res,next){
  let id=req.params.id;
  const a =availabilities.find(e=>e.id===id)
  if(a){
    res.json({status:a.ava})
  }
}))





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
