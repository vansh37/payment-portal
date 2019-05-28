var express = require('express');

var c = express();
c.use(express.json());
c.use(express.urlencoded({extended:true}));
var router = express.Router();
//console.log("index.js");
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/second' , function(req , res , next ){
  console.log("get request at second");
  console.log(req.query.phone);
  console.log(req.query.email);
  res.render('second' , {cost : req.query.cost , email : req.query.email , phone : req.query.phone} );
});

router.post('/upiVerify' , function(req , res , next){
  var upiId = req.body.upiId;
  console.log(upiId);
  if (upiId === "vanshaj@bank")
    res.send("true");
  else res.send("false");
});

/// post method not working 
router.post('/second' , function (req , res , next){
  console.log("post request at second");
  console.log(req.body);
  res.render('second' , {});
});

module.exports = router;
