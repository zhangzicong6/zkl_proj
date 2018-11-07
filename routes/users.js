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
	//console.log('========get_zkl_js=======')
	var key = req.query.tag?req.query.tag:'380';
	
	mem.get('get_zkl_js_liujiazhi'+key).then(function(value){
		//console.log('========get_zkl_js mem=======');
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
		            var zkl = [];
		            zkl = data[key].zkl;
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

router.get('/get_zkls',function(req,res,next){
	//console.log('========get_zkl_js=======')
	var key = req.query.tag?req.query.tag:'A5E';
	mem.get('get_zkl_js_liujiazhi'+key).then(function(value){
		//console.log('========get_zkl_js mem=======');
		if(value){
			res.send(value)
		}else{
			var url = "https://alipay.yuchuantech.com/zkl/zkl.php?qudao=liujiazhi"
			request({url: url, timeout: 3000}, function (err, response, body) {
				if(err){
					console.log(err)
					return res.send('error');
				}
				try{
		            var data = JSON.parse(body);
		            var zkl = [];
		            zkl = data[key].zkl;
		            mem.set('get_zkl_js_liujiazhi'+key,JSON.stringify(zkl),29).then(function(){});
					res.send(JSON.stringify(zkl))
				}catch(e){
					//console.log(e)
					res.send('error');
				}
			});
		}
	})
});


router.get('/get_ali_zkl',function(req,res,next){
	mem.get('get_ali_zkl_liujiazhi').then(function(value){
		//console.log('========get_zkl_js mem=======');
		if(value){
			res.send(value)
		}else{
			var url = "https://www.guojucloud.com/zkl/ali/xieb.json";
			request({url: url, timeout: 3000}, function (err, response, body) {
				if(err){
					console.log(err)
					return res.send('error');
				}
				try{
					body = body.split('(')[1].split(')')[0]
		            var data = JSON.parse(body);
		            var zkl = [];
		            zkl = data["code"];
		            mem.set('get_ali_zkl_liujiazhi',JSON.stringify(zkl),60).then(function(){});
					res.send(JSON.stringify(zkl))
				}catch(e){
					//console.log(e)
					res.send('error');
				}
			});
		}
	})
})

router.get('/get_ali_zkl_js',function(req,res,next){
	mem.get('get_ali_zkl_liujiazhi').then(function(value){
		//console.log('========get_zkl_js mem=======');
		if(value){
			res.send('get_zkl_js('+value+')')
		}else{
			var url = "https://www.guojucloud.com/zkl/ali/xieb.json";
			request({url: url, timeout: 3000}, function (err, response, body) {
				if(err){
					console.log(err)
					return res.send('error');
				}
				try{
					body = body.split('(')[1].split(')')[0]
		            var data = JSON.parse(body);
		            var zkl = [];
		            zkl = data["code"];
		            mem.set('get_ali_zkl_liujiazhi',JSON.stringify(zkl),60).then(function(){});
					var text = 'get_zkl_js('+JSON.stringify(zkl)+')';
					res.send(text)
				}catch(e){
					//console.log(e)
					res.send('error');
				}
			});
		}
	})
})

module.exports = router;
