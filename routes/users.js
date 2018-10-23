var express = require('express');
var router = express.Router();
var mem = require('../util/mem.js');
var https = require("https");
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get_zkl_js',function(req,res,next){
	console.log('========get_zkl_js=======')
	mem.get('get_zkl_js_liujiazhi').then(function(value){
		console.log('========get_zkl_js mem=======');
		if(value){
			var text = 'get_zkl_js('+value+')';
			res.send(text)
		}else{
			var url = "https://alipay.yuchuantech.com/zkl/zkl.php?qudao=liujiazhi"
			request({url: url, timeout: 3000}, function (err, response, body) {
				if(err){
					console.log(err)
					return res.send('error');
				}
				try{
		            var data = JSON.parse(body);
		            var zkl;
		            for (var key in data) {
		            	zkl = data[key].zkl
		            }
		            mem.set('get_zkl_js_liujiazhi',JSON.stringify(zkl),29).then(function(){});
					var text = 'get_zkl_js('+JSON.stringify(zkl)+')';
					res.send(text)
				}catch(e){
					//console.log(e)
					res.send('error');
				}
			});
		}
	})
});

module.exports = router;
