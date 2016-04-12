var express = require('express');
var router = express.Router();

var SpiderMan=require('../spider/main');

router.get('/', function(req, res, next) {
    // var page=req.query.page;
    // var tab=req.query.tab;
    // var requestUrl=  'https://cnodejs.org/';

    // if(page!=undefined){
    //     requestUrl='https://cnodejs.org/?tab='+tab+'&page='+page;
    // }

    new SpiderMan({
    	siteName:'淘宝UED',
			siteUrl:'http://taobaofed.org/',
			itemWrapCls:'.archives',
			itemCls:'.article',
			itemTitleCls:'.article-title',
			itemLinkCls:'.title',
			itemTimeCls:'.date',
			itemDescCls:'.article-excerpt',
			itemThumbCls:'.thumbnail-image',
			listTpl:'',
			getThumbFn:function($img){ return ($img.length? $img.attr('style').match(/url\(([^)]*)\s+\)/)[1]:''); }
    })
    .getData()
    .then(function(data){
    	res.render('index', {data:data, title:'淘宝UED'});
    })
    .catch(function(err){
    	res.render('404');
    });

});

module.exports = router;
