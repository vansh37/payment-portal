const express = require('express');
const c = express();
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/paymentpage' , function(req , res , next){
  res.render('paymentpage' , {cost : req.query.cost , email : req.query.email , phone : req.query.phone} );
});

router.post('/upiVerify' , function(req , res , next){
  var upiId = req.body.upiId;
  const valid = validateUpi(upiId);
  console.log("upi status of  "+upiId+"  is "+ valid);
  if (valid)
    res.send("true");
  else res.send("false");
});

/// post method not working 
router.post('/paymentpage' , function (req , res , next){
  console.log("post request at second");
  console.log(req.body);
  console.log(req.query);
  console.log(req.params);
  res.render('paymentpage' , {});
});

router.post('/result' , function(req , res , next){
  console.log("in post result");
  console.log(req.body);
  res.render('result' , {});
});
router.get('/result' , function(req, res , next){
  res.render('result');
});
module.exports = router;


function validateUpi(upiId){
  let reg = /^[a-z0-9]+@[a-z]+$/;
  return reg.test(upiId);
}