const express = require('express');

const c = express();

c.use(express.json());
c.use(express.urlencoded({extended:true}));
const bodyParser = require('body-parser');
c.use(bodyParser.json());
c.use(bodyParser.urlencoded({extended: false}));
var router = express.Router();
//console.log("index.js");
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/second' , function(req , res , next ){
  // console.log("get request at second");
  //console.log(req.query.phone);
  //console.log(req.query.email);
  res.render('second' , {cost : req.query.cost , email : req.query.email , phone : req.query.phone} );
});

router.post('/upiVerify' , function(req , res , next){
  var upiId = req.body.upiId;
  console.log(req.body);
  const valid = validateUpi(upiId);
  if (valid)
    res.send("true");
  else res.send("false");
});

/// post method not working 
router.post('/second' , function (req , res , next){
  console.log("post request at second");
  console.log(req.body);
  console.log(req.query);
  console.log(req.params);
  res.render('second' , {});
});

router.post('/third' , function(req , res , next){
  console.log("in post third");
  console.log(req.body);
  res.render('third' , {});
});
router.get('/third' , function(req, res , next){
  res.render('third');
});
module.exports = router;


function validateUpi(upiId){
  //alert("aaaaa");
  let ret = false , pivot = false;
  let left  = [] , right = [];
  for (var i = 0;i < upiId.length; i++){
      if (upiId[i] == "@"){
          pivot =true;
          continue;
      }
      if (!pivot)
        left.push(upiId[i]);
      else
        right.push(upiId[i]);
  }
  //console.log(left);
  //console.log(right);
  //console.log(pivot);
  if (left.length > 0  && right.length > 0 && pivot)
    return true;
  return false;
}