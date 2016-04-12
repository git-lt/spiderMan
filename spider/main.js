var cheerio = require('cheerio');
var superagent = require('superagent');
var url = require('url');
var qs = require('querystring');
var Promise = require('bluebird');

// 淘宝UED  http://taobaofed.org/
// 奇舞团博客 http://www.75team.com/
// 阿里巴巴UED http://www.aliued.cn/
// 美团UED http://tech.meituan.com/
// 百度FEX http://fex.baidu.com/
// 携程UED http://ued.ctrip.com/blog/
// 腾讯TGideas http://tgideas.qq.com/
// 腾讯ISUX http://isux.tencent.com/
// 大搜车前端 http://f2e.souche.com/blog/
// 网易UED http://uedc.163.com/

var websites=[{
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
	getThumbFn:function($img){ return $img.attr('style').match(/url\(([^)]*)\s+\)/)[1]; }
},{
	siteName:'奇舞团博客',
	siteUrl:'http://www.75team.com/',
	itemWrapCls:'',
	itemCls:'',
	itemTitleCls:'',
	itemLinkCls:'',
	itemTimeCls:'',
	itemDescCls:'',
	itemThumbCls:'',
	listTpl:'',
	getThumbFn:null,
},{
	siteName:'阿里巴巴UED',
	siteUrl:'http://www.aliued.cn/',
	itemWrapCls:'',
	itemCls:'',
	itemTitleCls:'',
	itemLinkCls:'',
	itemTimeCls:'',
	itemDescCls:'',
	itemThumbCls:'',
	listTpl:'',	
	getThumbFn:null,
},{
	siteName:'美团UED',
	siteUrl:'http://tech.meituan.com/',
	itemWrapCls:'',
	itemCls:'',
	itemTitleCls:'',
	itemLinkCls:'',
	itemTimeCls:'',
	itemDescCls:'',
	itemThumbCls:'',	
	itemThumbnail:'',
	listTpl:'',
},{
	siteName:'百度FEX',
	siteUrl:'http://fex.baidu.com/',
	itemWrapCls:'',
	itemCls:'',
	itemTitleCls:'',
	itemLinkCls:'',
	itemTimeCls:'',
	itemDescCls:'',
	itemThumbCls:'',
	getThumbFn:null,
	listTpl:'',
}];

var log = function(str){ console.log(str)};


var SpiderMan = function(sData){
	this.siteUrl = sData.siteUrl;
	this.siteName = sData.siteName;
	this.itemWrapCls = sData.itemWrapCls;
	this.itemCls = sData.itemCls;
	this.itemTitleCls = sData.itemTitleCls;
	this.itemTimeCls = sData.itemTimeCls;
	this.itemDescCls = sData.itemDescCls;
	this.itemThumbCls = sData.itemThumbCls;
	this.itemLinkCls = sData.itemLinkCls;
	this.getThumbFn = sData.getThumbFn;
}

SpiderMan.prototype.getData = function(){
	var self = this, resData = [];

	return new Promise(function(resolve, reject){
		superagent
		.get(self.siteUrl)
		.end(function(err, res){
			if(err){ return reject(err); }

			var $ = cheerio.load(res.text),
					$wrap = $(self.itemWrapCls),
					$items = $wrap.find(self.itemCls);

			$items.each(function(){
				var _this = $(this);

				resData.push({
					title:_this.find(self.itemTitleCls).text().trim(),
					link:self.siteUrl+_this.find(self.itemLinkCls).attr('href').trim(),
		   		thumbnail:self.getThumbFn?self.getThumbFn(_this.find(self.itemThumbCls)):'',
		   		time:_this.find(self.itemTimeCls).text().trim(),
		   		desc:_this.find(self.itemDescCls).text().trim(),
				});
			});
			resolve(resData);
		});
	});
}

module.exports = SpiderMan;








