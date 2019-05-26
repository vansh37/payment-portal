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

router.get('/about', function(req, res, next) {
  res.render('about', {page:'About Us', menuId:'about'});
});

router.get('/contact', function(req, res, next) {
    console.log("hola");
  console.log(req.params.val);
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});

router.get('/second' , function(req , res , next ){
  console.log("get request at second");
  console.log(req.query.val);
  res.render('second' , {cost : req.query.val});
});


/// post method not working 
router.post('/second' , function (req , res , next){
  console.log("post request at second");
  console.log(req.body);
  res.render('second' , {});
});

router.post('/contact' , function(req , res , next){
  res.render('contact', {page:'Contact Us', menuId:'contact'});
});
module.exports = router;
