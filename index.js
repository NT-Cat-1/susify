//const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; //constant for xhr
var fetch = require("node-fetch");
//const DomParser = require('dom-parser'); //constant for domparse
//var parser = new DomParser();
var http = require("http");
var app = require("express")(http);
//var xhr = new XMLHttpRequest();
app.get("/", function(req,res){
	//res.send("/susify?prot=[https|http]&adr=[url]&policy=0")
	res.sendFile(__dirname+"/index.html");
});
app.get("/susify",function(req, res){
	var ip;
	var useragent;
	if (req.query.policy == 0){
		ip = req.get("X-Forwarded-For");
		useragent = req.get("user-agent");
	}
	if (req.query.policy == 1){
		ip = "8.8.8.8";
		useragent = req.get("user-agent");
	}
	if (req.query.policy == 2){
		ip = req.get("X-Forwarded-For");
		useragent = "SusifierBot 1.0 Node";
	}
	if (req.query.policy == 3){
		ip = "8.8.8.8";
		useragent = "SusifierBot 1.0 Node";
	}
	fetch(req.query.prot+"://"+req.query.adr).then(res => res.text()).then(function(body){
           res.send(body+'<script>var list=document.getElementsByTagName("img");var flist=document.getElementsByTagName("iframe");var llist=document.getElementsByTagName("a");var slist=document.getElementsByTagName("source");var elist=document.getElementsByTagName("yt-formatted-string");try{document.getElementById("country-code").innerText="SUS";}catch{};try{document.getElementById("notification-count").innerText="SUS";}catch{};try{document.getElementById("ytd-thumbnail-overlay-time-status-renderer").innerText="S:US";}catch{};try{for(i in list){list[i].src="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";list[i].srcset="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";};}catch{};try{for(i in flist){flist[i].src="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";};}catch{};try{for(i in llist){llist[i].href="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";};}catch{};try{for(i in slist){slist[i].srcset="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";};}catch{};try{for(i in elist){elist[i].innerText="When the imposter is sus.";};}catch{};</script>');
	}).catch(function(){res.status(500).send("Load failure.");});
});
app.use(function(req, res, next){
try{
res.redirect(req.get("referrer").split("/susify?")[1].replace("prot=https","").replace("prot=http","").replace("&policy=0",""));
}catch{
next();
}
});
app.listen(process.env.PORT || 5000,function(){});
