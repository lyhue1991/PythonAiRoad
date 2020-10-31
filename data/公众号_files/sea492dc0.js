!function(e,r){
function t(e){
return function(r){
return Object.prototype.toString.call(r)==="[object "+e+"]";
};
}
function n(){
return S++;
}
function i(e){
return e.match(q)[0];
}
function a(e){
for(e=e.replace(C,"/");e.match(I);)e=e.replace(I,"/");
return e;
}
function s(e){
var r=e.length-1,t=e.charAt(r);
return"#"===t?e.substring(0,r):".js"===e.substring(r-2)||e.indexOf("?")>0||".css"===e.substring(r-3)||"/"===t?e:e+".js";
}
function o(e){
var r=b.alias;
return r&&w(r[e])?r[e]:e;
}
function u(e){
var r,t=b.paths;
return t&&(r=e.match(G))&&w(t[r[1]])&&(e=t[r[1]]+r[2]),e;
}
function c(e){
var r=b.vars;
return r&&e.indexOf("{")>-1&&(e=e.replace(R,function(e,t){
return w(r[t])?r[t]:e;
})),e;
}
function f(e){
var r=b.map,t=e;
if(r)for(var n=0,i=r.length;i>n;n++){
var a=r[n];
if(t=D(a)?a(e)||e:e.replace(a[0],a[1]),t!==e)break;
}
return t;
}
function l(e,r){
var t,n=e.charAt(0);
if($.test(e))t=e;else if("."===n)t=a((r?i(r):b.cwd)+e);else if("/"===n){
var s=b.cwd.match(k);
t=s?s[0]+e.substring(1):e;
}else t=b.base+e;
return t;
}
function d(e,r){
if(!e)return"";
e=o(e),e=u(e),e=c(e),e=s(e);
var t=l(e,r);
return t=f(t);
}
function v(e){
return e.hasAttribute?e.src:e.getAttribute("src",4);
}
function h(e,r,t){
var n=K.test(e),i=L.createElement(n?"link":"script");
if(t){
var a=D(t)?t(e):t;
a&&(i.charset=a);
}
p(i,r,n),n?(i.rel="stylesheet",i.href=e):(i.async=!0,i.src=e,window.seajs_crossorigin&&i.setAttribute("crossorigin",window.seajs_crossorigin)),
O=i,P?M.insertBefore(i,P):M.appendChild(i),O=null;
}
function p(e,r,t){
var n=t&&(Y||!("onload"in e));
return n?void setTimeout(function(){
g(e,r);
},1):void(e.onload=e.onerror=e.onreadystatechange=function(){
W.test(e.readyState)&&(e.onload=e.onerror=e.onreadystatechange=null,t||b.debug||M.removeChild(e),
e=null,r());
});
}
function g(e,r){
var t,n=e.sheet;
if(Y)n&&(t=!0);else if(n)try{
n.cssRules&&(t=!0);
}catch(i){
"NS_ERROR_DOM_SECURITY_ERR"===i.name&&(t=!0);
}
setTimeout(function(){
t?r():g(e,r);
},20);
}
function m(){
if(O)return O;
if(j&&"interactive"===j.readyState)return j;
for(var e=M.getElementsByTagName("script"),r=e.length-1;r>=0;r--){
var t=e[r];
if("interactive"===t.readyState)return j=t;
}
}
function E(e){
var r=[];
return e.replace(J,"").replace(z,function(e,t,n){
n&&r.push(n);
}),r;
}
function y(e,r){
this.uri=e,this.dependencies=r||[],this.exports=null,this.status=0,this._waitings={},
this._remain=0;
}
if(!e.seajs){
var _=e.seajs={
version:"2.1.1"
},b=_.data={},A=t("Object"),w=t("String"),T=Array.isArray||t("Array"),D=t("Function"),S=0,N=b.events={};
_.on=function(e,r){
var t=N[e]||(N[e]=[]);
return t.push(r),_;
},_.off=function(e,r){
if(!e&&!r)return N=b.events={},_;
var t=N[e];
if(t)if(r)for(var n=t.length-1;n>=0;n--)t[n]===r&&t.splice(n,1);else delete N[e];
return _;
};
var O,j,x,U=_.emit=function(e,r){
var t,n=N[e];
if(n)for(n=n.slice();t=n.shift();)t(r);
return _;
},q=/[^?#]*\//,C=/\/\.\//g,I=/\/[^\/]+\/\.\.\//,G=/^([^\/:]+)(\/.+)$/,R=/{([^{]+)}/g,$=/^\/\/.|:\//,k=/^.*?\/\/.*?\//,L=document,B=location,X=i(B.href),F=L.getElementsByTagName("script"),V=L.getElementById("seajsnode")||F[F.length-1],H=i(v(V)||X),M=L.getElementsByTagName("head")[0]||L.documentElement,P=M.getElementsByTagName("base")[0],K=/\.css(?:\?|$)/i,W=/^(?:loaded|complete|undefined)$/,Y=1*navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/,"$1")<536,z=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,J=/\\\\/g,Q=_.cache={},Z={},er={},rr={},tr=y.STATUS={
FETCHING:1,
SAVED:2,
LOADING:3,
LOADED:4,
EXECUTING:5,
EXECUTED:6
};
y.prototype.resolve=function(){
for(var e=this,r=e.dependencies,t=[],n=0,i=r.length;i>n;n++)t[n]=y.resolve(r[n],e.uri);
return t;
},y.prototype.load=function(){
var e=this;
if(!(e.status>=tr.LOADING)){
e.status=tr.LOADING;
var r=e.resolve();
U("load",r);
for(var t,n=e._remain=r.length,i=0;n>i;i++)t=y.get(r[i]),t.status<tr.LOADED?t._waitings[e.uri]=(t._waitings[e.uri]||0)+1:e._remain--;
if(0===e._remain)return void e.onload();
var a={};
for(i=0;n>i;i++)t=Q[r[i]],t.status<tr.FETCHING?t.fetch(a):t.status===tr.SAVED&&t.load();
for(var s in a)a.hasOwnProperty(s)&&a[s]();
}
},y.prototype.onload=function(){
var e=this;
e.status=tr.LOADED,e.callback&&e.callback();
var r,t,n=e._waitings;
for(r in n)n.hasOwnProperty(r)&&(t=Q[r],t._remain-=n[r],0===t._remain&&t.onload());
delete e._waitings,delete e._remain;
},y.prototype.fetch=function(e){
function r(){
h(a.requestUri,a.onRequest,a.charset);
}
function t(){
delete Z[s],er[s]=!0,x&&(y.save(i,x),x=null);
var e,r=rr[s];
for(delete rr[s];r&&(e=r.shift());)e.load();
}
var n=this,i=n.uri;
n.status=tr.FETCHING;
var a={
uri:i
};
U("fetch",a);
var s=a.requestUri||i;
return!s||er[s]?void n.load():Z[s]?void rr[s].push(n):(Z[s]=!0,rr[s]=[n],U("request",a={
uri:i,
requestUri:s,
onRequest:t,
charset:b.charset
}),void(a.requested||(e?e[a.requestUri]=r:r())));
},y.prototype.exec=function(){
function e(r){
return y.get(e.resolve(r)).exec();
}
var t=this;
if(t.status>=tr.EXECUTING)return t.exports;
t.status=tr.EXECUTING;
var i=t.uri;
e.resolve=function(e){
return y.resolve(e,i);
},e.async=function(r,t){
return y.use(r,t,i+"_async_"+n()),e;
};
var a=t.factory,s=D(a)?a(e,t.exports={},t):a;
return s===r&&(s=t.exports),null!==s||K.test(i)||U("error",t),delete t.factory,t.exports=s,
t.status=tr.EXECUTED,U("exec",t),s;
},y.resolve=function(e,r){
var t={
id:e,
refUri:r
};
return U("resolve",t),t.uri||d(t.id,r);
},y.define=function(e,t,n){
var i=arguments.length;
1===i?(n=e,e=r):2===i&&(n=t,T(e)?(t=e,e=r):t=r),!T(t)&&D(n)&&(t=E(n.toString()));
var a={
id:e,
uri:y.resolve(e),
deps:t,
factory:n
};
if(!a.uri&&L.attachEvent){
var s=m();
s&&(a.uri=s.src);
}
U("define",a),a.uri?y.save(a.uri,a):x=a;
},y.save=function(e,r){
var t=y.get(e);
t.status<tr.SAVED&&(t.id=r.id||e,t.dependencies=r.deps||[],t.factory=r.factory,t.status=tr.SAVED);
},y.get=function(e,r){
return Q[e]||(Q[e]=new y(e,r));
},y.use=function(r,t,n){
var i=y.get(n,T(r)?r:[r]);
i.callback=function(){
for(var r=[],n=i.resolve(),a=0,s=n.length;s>a;a++)r[a]=Q[n[a]].exec();
t&&t.apply(e,r),delete i.callback;
},i.load();
},y.preload=function(e){
var r=b.preload,t=r.length;
t?y.use(r,function(){
r.splice(0,t),y.preload(e);
},b.cwd+"_preload_"+n()):e();
},_.use=function(e,r){
return y.preload(function(){
y.use(e,r,b.cwd+"_use_"+n());
}),_;
},y.define.cmd={},e.define=y.define,_.Module=y,b.fetchedList=er,b.cid=n,_.resolve=d,
_.require=function(e){
return(Q[y.resolve(e)]||{}).exports;
};
var nr=/^(.+?\/)(\?\?)?(seajs\/)+/;
b.base=(H.match(nr)||["",H])[1],b.dir=H,b.cwd=X,b.charset="utf-8",b.preload=function(){
var e=[],r=B.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2");
return r+=" "+L.cookie,r.replace(/(seajs-\w+)=1/g,function(r,t){
e.push(t);
}),e;
}(),_.config=function(e){
for(var r in e){
var t=e[r],n=b[r];
if(n&&A(n))for(var i in t)n[i]=t[i];else T(n)?t=n.concat(t):"base"===r&&("/"===t.slice(-1)||(t+="/"),
t=l(t)),b[r]=t;
}
return U("config",e),_;
};
}
}(this);;!function(a){
function t(t){
var n=t.length;
if(!(2>n)){
u.comboSyntax&&(p=u.comboSyntax),u.comboMaxLength&&(f=u.comboMaxLength),i=u.comboExcludes;
for(var x=[],v=0;n>v;v++){
var b=t[v];
if(!h[b]){
var l=c.get(b),g=r(b);
!(l.status<d)||s(b)||o(b)||".js"!=g&&".css"!=g||x.push(b);
}
}
if(x.length>1)for(var m=e(x),p=u.comboSyntax||["/c/=",","],S=a.data.base,j=S.replace(p[0],""),v=0;v<x.length;++v){
var b=x[v],y=(r(b),b.substr(j.length));
"/"!=y[0]&&(y="/"+y),h[b]=m[y];
}
}
}
function n(a){
var t=r(a.uri);
a.requestUri=".js"==t||".css"==t?h[a.uri]||a.uri.replace("/c/=",""):a.uri;
}
function e(t){
var n=u.comboSyntax||["/c/=",","],e=a.data.base,s=[],o={},i=e.replace(n[0],""),s={};
"/"==e[e.length-1]&&(e=e.substr(0,e.length-1));
for(var c=0;c<t.length;++c){
var d=t[c],h=d.substr(i.length),f=r(d);
"/"!=h[0]&&(h="/"+h),o[f]=o[f]||{
idx:0,
data:[]
};
var x=o[f];
x.data[x.idx]=x.data[x.idx]||[],x.data[x.idx].join(n[1]).length>=1024&&(x.idx++,
x.data[x.idx]=[]),x.data[x.idx].push(h),s[h]=x.idx,o[f]=x;
}
for(var v in s){
var f=r(v);
s[v]=e+o[f].data[s[v]].join(n[1]);
}
return s;
}
function r(a){
var t=a.lastIndexOf(".");
return t>=0?a.substring(t):"";
}
function s(a){
return i?i.test?i.test(a):i(a):void 0;
}
function o(a){
var t=u.comboSyntax||["??",","],n=t[0],e=t[1];
return n&&a.indexOf(n)>0||e&&a.indexOf(e)>0;
}
var i,c=a.Module,d=c.STATUS.FETCHING,u=a.data,h=u.comboHash={},f=2e3;
if(a.on("load",t),a.on("fetch",n),u.test){
var x=a.test||(a.test={});
x.uris2paths=e,x.paths2hash=paths2hash;
}
define("seajs-combo-debug",[],{});
}(seajs);;!function(e){
var t;
t="mp.weixin.qq.com"!=location.hostname&&"mpc.weixin.qq.com"!=location.hostname&&"mpd.weixin.qq.com"!=location.hostname||location.hostname!==location.host?"/":"https://res.wx.qq.com/";
var s=function(e){
var t=e.lastIndexOf(".");
return t>=0?e.substring(t):"";
};
"undefined"!=typeof MODULES&&(t+="c/="),e.data.pathinfo={
".js":"mpres/zh_CN/htmledition/",
".tpl":"mpres/zh_CN/htmledition/",
".html":"mpres/zh_CN/htmledition/",
".css":"mpres/htmledition/style/"
};
(new Date).getTime();
e.config({
base:t,
map:[function(t){
var n=s(t),a=e.data.base,i=t.substr(a.length);
if(".css"!==n&&(/^(pages|vat|3rd|vue-weui|js)/.test(i)||(i="js/"+i)),"undefined"!=typeof MODULES&&MODULES[i]){
var o=MODULES[i];
return 0==o.indexOf("http://")||0==o.indexOf("https://")?o:(-1==o.indexOf(a.replace("/c/=",""))&&(o=a+o),
".js"!=n&&".css"!=n&&(o=o.replace("/c/=","")),o);
}
return/^pages/.test(i)||/^vue-weui/.test(i)||/^3rd/.test(i)?a.replace("/c/=","")+e.data.pathinfo[n].replace("/js","")+i+"?v=":a.replace("/c/=","")+e.data.pathinfo[n]+i+"?v=";
}]
});
var n={};
e.on("exec",function(e){
var t=e.id;
if(/\.css\.js$/.test(t)&&!n[t]&&e.exports){
var s=document.getElementById("seajs_inline_css");
s||(s=document.createElement("style"),s.id="seajs_inline_css",s.setAttribute("type","text/css"),
document.getElementsByTagName("head")[0].appendChild(s));
var a=/url\s*\(\s*\/(\"(?:[^\\\"\r\n\f]|\\[\s\S])*\"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|[^)}]+)\s*\)/g,i="mp.weixin.qq.com"==location.hostname?"https://res.wx.qq.com/":"/";
e.exports=e.exports.replace(a,"url("+i+"$1)"),s.innerHTML+="\n\n"+e.exports,n[t]=!0;
}
});
}(seajs);;