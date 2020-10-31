"use strict"
!function(n,e){"function"==typeof define?define("@tencent/wxg-report",e):n.WX_BJ_REPORT=e()}(window,function(){var n=window.WX_BJ_REPORT||{}
return function(s){if(!s.TryJs){var c=window
s.TryJs={isCatchTimeout:!1,isCatchJquery:!1,isCatchCmd:!1,isTryed:!1,_onThrow:function(n){n.stack&&console&&console.error&&console.error(n.stack)}}
var a=function(n,e){return function(){try{return n.apply(this,e||arguments)}catch(n){s.TryJs._onThrow(n)}}},f=function(n,e){return function(){try{return n.apply(this,arguments)}catch(n){s.TryJs._onThrow(n,{cid:e})}}}
return s.TryJs=t(s.TryJs,{init:function(n){n&&(s.TryJs._onThrow=n),i()},catchJquery:n,catchCmd:r,run:i})}function u(n){return"function"==typeof n}function l(o,s){return function(){for(var n,e,t=[],r=0,i=arguments.length;r<i;r++)u(n=arguments[r])&&(e=a(n))&&(n.tryWrap=e)&&(n=e),t.push(n)
return o.apply(s||this,t)}}function n(){if(s.TryJs.isCatchJquery)return s.TryJs
var t=c.jQuery
if(t&&t.event){var n=t.event.add,r=t.ajax,i=t.event.remove
if(n&&(t.event.add=l(n),t.event.remove=function(){for(var n,e=[],t=0,r=arguments.length;t<r;t++)u(n=arguments[t])&&(n=n.tryWrap),e.push(n)
return i.apply(this,e)}),r&&(t.ajax=function(n,e){return e||(e=n,n=void 0),function(n){var e,t
for(e in n)u(t=n[e])&&(n[e]=a(t))}(e),n?r.call(t,n,e):r.call(t,e)}),jQuery.zepto){var e=t.fn.on,o=t.fn.off
t.fn.on=l(e),t.fn.off=function(){for(var n,e=[],t=0,r=arguments.length;t<r;t++)u(n=arguments[t])&&(n=n.tryWrap),e.push(n)
return o.apply(this,e)}}return s.TryJs.isCatchJquery=!0,s.TryJs}}function e(){if(s.TryJs.isCatchTimeout)return s.TryJs
function n(r){return function(n,e){if("string"==typeof n)try{n=new Function(n)}catch(n){throw n}var t=[].slice.call(arguments,2)
return n=a(n,t.length&&t),r(n,e)}}return c.setTimeout=n(c.setTimeout),c.setInterval=n(c.setInterval),s.TryJs.isCatchTimeout=!0,s.TryJs}function t(n,e){var t
for(t in e)n[t]=e[t]
return n}function r(){if(s.TryJs.isCatchCmd)return s.TryJs
c.require
var i,o=c.define
return c.seajs&&o&&(c.define=function(){for(var n,e=[],t=0,r=arguments.length;t<r;t++)u(n=arguments[t])&&((n=f(n,arguments[0])).toString=function(n){return function(){return n.toString()}}(arguments[t])),e.push(n)
return o.apply(this,e)},c.seajs.use=(i=c.seajs.use,function(){for(var n,e=[],t=0,r=arguments.length;t<r;t++)u(n=arguments[t])&&(n=a(n)),e.push(n)
return i.apply(this,e)}),t(c.define,o),s.TryJs.isCatchCmd=!0),s.TryJs}function i(){n(),r(),e()}}(n),function(o){if(!o.BadJs){var r=function(n,e){for(var t in"string"==typeof(n=n||{})&&(n={vale:n}),e)n[t]=e[t]
return n}
return o.BadJs={uin:0,mid:"",_cache:{},_info:{},_hookCallback:null,ignorePath:!0,throw:function(n,e){throw this.onError(n,e),n},onError:function(n,e){try{if(1==n.BADJS_EXCUTED)return
n.BADJS_EXCUTED=!0
var t=function(n){n._info=n.info||{}
var e=function(n){var e=n.stack||"",t={info:e,file:n.file||"",line:n.line||"",col:n.col||""}
if(""==t.file){var r=e.split(/\bat\b/)
if(r&&r[1]){var i=/(https?:\/\/[^\n]+)\:(\d+)\:(\d+)/.exec(r[1])
i&&(i[1]&&i[1]!=t.file&&(t.file&&(n._info.file=t.file),t.file=i[1]),i[2]&&i[2]!=t.line&&(t.line&&(n._info.line=t.line),t.line=i[2]),i[3]&&i[3]!=t.col&&(t.col&&(n._info.col=t.col),t.col=i[3]))}}t&&t.file&&0<t.file.length&&(t.info=t.info.replace(new RegExp(t.file.split("?")[0],"gi"),"__FILE__"))
o.BadJs.ignorePath&&(t.info=t.info.replace(/http(s)?\:[^:\n]*\//gi,"").replace(/\n/gi,""))
return t}(n)
return{name:n.name,key:n.message,msg:n.message,_info:n._info,stack:e.info,file:e.file,line:e.line,col:e.col,client_version:""}}(n)
if(t.uin=this.uin,t.mid=this.mid,t.view=this.view,e&&(e._info=e.info,t=r(t,e)),t.cid&&(t.key="["+t.cid+"]:"+t.key),t._info=r(t._info,this._info),t._info&&("[object Object]"==Object.prototype.toString.call(t._info)?t.msg+=" || info:"+JSON.stringify(t._info):(Object.prototype.toString.call(t._info),t.msg+=" || info:"+t._info)),"function"==typeof this._hookCallback&&!1===this._hookCallback(t))return
return this._send(t),o.BadJs}catch(n){console.error(n)}},winErr:function(n){if("unhandledrejection"===n.type)o.BadJs.onError(i(n.type,n.reason,"","","",n.reason))
else{if(n.error&&n.error.BADJS_EXCUTED)return
o.BadJs.onError(i("BadjsWindowError",n.message,n.filename,n.lineno,n.colno,n.error))}},init:function(n,e,t,r){return this.uin=n||this.uin,this.mid=e||this.mid,this.view=t||this.view,!1!==r&&(o.TryJs.init(function(n,e){o.BadJs.throw.call(o.BadJs,n,e)}),window.addEventListener&&window.addEventListener("error",o.BadJs.winErr),window.addEventListener&&window.addEventListener("unhandledrejection",o.BadJs.winErr)),o.BadJs},hook:function(n){return this._hookCallback=n,o.BadJs},_send:function(n){if(n.mid){var e=[n.mid,n.name,n.key].join("|")
if(!this._cache||!this._cache[e])return this._cache&&(this._cache[e]=!0),this._xhr(n),o.BadJs}},_xhr:function(n){var e
if(window.ActiveXObject)try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(n){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(n){e=!1}}else window.XMLHttpRequest&&(e=new XMLHttpRequest)
var t=""
for(var r in n)r&&n[r]&&(t+=[r,"=",encodeURIComponent(n[r]),"&"].join(""))
e&&e.open?(e.open("POST","https://badjs.weixinbridge.com/report",!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),e.onreadystatechange=function(n){},e.send(t.slice(0,-1))):(new Image).src="https://badjs.weixinbridge.com/report?"+t},report:function(n,e,t){return this.onError(i(n,e),t),this},mark:function(n){this._info=r(this._info,n)},nocache:function(){return this._cache=!1,o.BadJs}},o.BadJs}function i(n,e,t,r,i,o){return{name:n||"",message:e||"",file:t||"",line:r||"",col:i||"",stack:o&&o.stack||""}}}(n),n})
