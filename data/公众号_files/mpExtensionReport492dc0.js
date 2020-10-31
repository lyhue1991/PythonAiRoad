!function(){
if("function"==typeof Array.prototype.reduceRight){
var n=[{
name:"",
id:"jicmnjcngcnfhgfggbdhlbjpcbadimaj",
icon:"static/img/icon_emotion.png"
}],o=[],i=function(n){
return function(i){
var t=new Image;
t.onload=function(){
o.push(n),i();
},t.onerror=function(){
i();
},t.src="chrome-extension://"+n.id+"/"+n.icon;
};
},t=n.pop();
n.reduceRight(function(n,o){
return function(t){
i(o)(function(){
n(t);
});
};
},i(t))(function(){
if(o.length){
var n=o.map(function(n){
return n.id;
}).join("|");
$.ajax({
url:wx.url("/cgi-bin/webcommreport")+"&action=report",
method:"POST",
data:{
logid:14509,
buffer:encodeURIComponent(location.href+","+n)
}
});
}
});
}
}();