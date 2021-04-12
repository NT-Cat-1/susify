const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; //constant for xhr
const DomParser = require('dom-parser'); //constant for domparse
var parser = new DomParser();
var http = require("http");
var app = require("express")(http);
var xhr = new XMLHttpRequest();
app.get("/", function(req,res){
	res.send("/susify?prot=[https|http]&adr=[url]&policy=0")
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
	xhr.open("GET",req.query.prot+"://"+req.query.adr);
	xhr.responseType = "text";
	xhr.onload = function(){
        var document = parser.parseFromString(xhr.responseText);
        var list = document.getElementsByTagName("img");
        var flist = document.getElementsByTagName("iframe");
        var llist = document.getElementsByTagName("a");
        var slist = document.getElementsByTagName("source");
        var elist = document.getElementsByTagName("yt-formatted-string");
        try{
        document.getElementById("country-code").innerText="SUS";
        }catch{}
        try{
        document.getElementById("notification-count").innerText="SUS";
        }catch{}
        try{
        document.getElementById("ytd-thumbnail-overlay-time-status-renderer").innerText="S:US";
        }catch{}
        try{
        for (i in list){
        list[i].src="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";
        list[i].srcset="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";
        }
        }catch{}
        try{
        for (i in flist){
        flist[i].src="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";
        }
        }catch{}
        try{
        for (i in llist){
        //if (isNaN(parseInt(i))){return;}
        llist[i].href="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";
        }
        }catch{}
        try{
        for (i in slist){
        //if (isNaN(parseInt(i))){return;}
        slist[i].srcset="https://dl.dropbox.com/s/3y3qukshsjxzx5e/sus.jpg?dl=1";
        }
        }catch{}
        try{
        for (i in elist){
        //if (isNaN(parseInt(i))){return;}
        elist[i].innerText="When the imposter is sus.";
        }
        }catch{}
		res.send(dom.innerHTML);
	};
	xhr.send();
});
app.listen(process.env.PORT || 5000,function(){});
