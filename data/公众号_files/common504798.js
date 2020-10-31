define("utils/common.js",[],function(){
"use strict";
var e={
getHtmlText:function(e){
if("string"==typeof e){
var n=document.createElement("div");
n.innerHTML=e,e=n;
}
return e.innerText?e.innerText.replace(/\n/g,"").replace(/\ufeff/g,""):"";
}
};
return e;
});define("biz_common/utils/get_para_list.js",[],function(){
function e(t,r){
if(!t||1!==t.nodeType)return!1;
for(var i=0;i<t.children.length;i++)if(-1!==n.indexOf(t.children[i].tagName)||r.getSpan&&"SPAN"===t.children[i].tagName&&e(t.children[i],r))return!0;
}
function t(e,t){
for(var r=0;r<i.length;r++)if(e.className.indexOf(i[r])>-1)return!0;
return t.ignoreFlexChildren&&"flex"===e.style.display||t.ignoreNotWriteableChildren&&("false"===e.getAttribute("contenteditable")||1===e.childNodes.length&&"false"===e.childNodes[0].getAttribute("contenteditable"))?!0:a.indexOf(e.tagName)>-1;
}
function r(n,i){
var a=n.children;
if(!a.length)return a;
for(var l,d=[],o=0;o<a.length;o++)l=a[o],l.isWrapper=void 0,i&&i.isMarkNode&&i.isMarkNode(l)||(e(l,i)&&!t(l,i)?(d=d.concat(r(l,i)),
i.getNestedStructure&&(l.isWrapper=!0,d.push(l))):d.push(l));
return d;
}
var n=["P","DIV","SECTION","LI","H1","H2","H3","H4","H5","H6","TABLE","WX-VIEW"],i=["js_product_container","js_blockquote_wrap"],a=["BLOCKQUOTE"];
return r.paragraphStartIdx=1e6,r;
});define("tpl/pagebar.html.js",[],function(){
return'<div class="pagination">\n    <span class="page_nav_area">\n        <a href="javascript:void(0);" class="btn page_first">{firstButtonText}</a>\n        <a href="javascript:void(0);" class="btn page_prev"><i class="arrow"></i></a>\n        {if isSimple}\n            <span class="page_num">\n                <label>{initShowPage}</label>\n                { if showEndPage}\n                <span class="num_gap">/</span>\n                <label>{endPage}</label>\n                {/if}\n            </span>\n        {else}\n            {each startRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n            <span class="gap_prev">...</span>\n            {each midRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav js_mid">{pageIndex}</a>\n            {/each}\n            <span class="gap_next">...</span>\n            {each endRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n        {/if}\n        <a href="javascript:void(0);" class="btn page_next"><i class="arrow"></i></a>\n        <a href="javascript:void(0);" class="btn page_last">{lastButtonText}</a>            \n    </span>\n    {if (endPage>1 && jumpPage)}\n    <span class="goto_area">\n        <input type="text">\n        <a href="javascript:void(0);" class="btn page_go">跳转</a>\n    </span>\n    {/if}\n</div>\n';
});define("biz_common/utils/wxgspeedsdk.js",[],function(){
function e(e){
if(!e.pid||!e.speeds)return-1;
if(!e.speeds.length>0){
var n=e.speeds;
e.speeds=[],e.speeds.push(n);
}
e.user_define&&(p=e.user_define);
for(var t=d(e),o=0;o<e.speeds.length;o++){
var r=e.speeds[o];
r.time=parseInt(r.time),r.sid>20&&r.time>=0&&i(t,r.sid,r.time);
}
}
function n(){
s(function(){
setTimeout(function(){
for(var e in u)r({
pid_uin_rid:e,
speeds:u[e],
user_define:p
},c);
u={};
},100);
});
}
function t(e){
s(function(){
if(!e.pid||!e.time)return-1;
var n=d(e);
i(n,9,e.time);
});
}
function o(e){
s(function(){
var n=d(e);
u[n]||(u[n]=[]);
var t=window.performance||window.msPerformance||window.webkitPerformance||{};
if(t&&t.timing){
var o=t.timing||{};
i(n,1,o.domainLookupEnd-o.domainLookupStart),i(n,2,"https:"==location.protocol&&0!=o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0),
i(n,3,o.connectEnd-o.connectStart),i(n,4,o.responseStart-o.requestStart),i(n,5,o.responseEnd-o.responseStart),
i(n,6,o.domContentLoadedEventStart-o.domLoading),i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),
i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart),function(){
setTimeout(function(){
o.loadEventEnd&&(i(n,7,0==o.domComplete?0:o.domComplete-o.domLoading),i(n,8,0==o.loadEventEnd?0:o.loadEventEnd-o.loadEventStart));
},0);
}(u),u[n][9]||i(n,9,o.domContentLoadedEventStart-o.navigationStart),i(n,10,o.redirectEnd-o.redirectStart),
i(n,11,o.domainLookupStart-o.fetchStart),i(n,12,o.domLoading-o.responseStart);
}
});
}
function i(e,n,t){
u[e]=u[e]||[],u[e][n]=u[e][n]||[],0>t||(21>n?u[e][n][0]=t:u[e][n].push(t));
}
function d(e){
return e&&e.pid?e.pid+"_"+(e.uin||0)+"_"+(e.rid||0):void(console&&console.error("Must provide a pid"));
}
function r(e,n){
var t=e.pid_uin_rid.split("_");
if(3!=t.length)return void(console&&console.error("pid,uin,rid, invalid args"));
var o="pid="+t[0]+"&uin="+t[1]+"&rid="+t[2];
e.user_define&&(o+="&user_define="+e.user_define);
for(var i=n+o+"&speeds=",d="",r=[],s=1;s<e.speeds.length;s++)if(e.speeds[s]){
for(var a=0;a<e.speeds[s].length;a++){
var p=s+"_"+e.speeds[s][a];
i.length+d.length+p.length<1024?d=d+p+";":(d.length&&r.push(i+d.substring(0,d.length-1)),
d=p+";");
}
s==e.speeds.length-1&&r.push(i+d.substring(0,d.length-1));
}
for(var s=0;s<r.length;s++)(new Image).src=r[s];
}
function s(e){
"complete"==document.readyState?e():f.push(e);
}
function a(){
for(var e=0;e<f.length;e++)f[e]();
f=[];
}
var p,u={},c="https://badjs.weixinbridge.com/frontend/reportspeed?",f=[];
return window.addEventListener?window.addEventListener("load",a,!1):window.attachEvent&&window.attachEvent("onload",a),
{
saveSpeeds:e,
send:n,
setFirstViewTime:t,
setBasicTime:o
};
});define("media/appmsg_dialog.js",["widget/media/appmsg_dialog.css","common/wx/popup.js","common/wx/top.js","common/wx/Tips.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/time.js","tpl/media/appmsg_dialog.html.js","tpl/media/appmsg_list.html.js","biz_web/ui/checkbox.js","biz_common/moment.js"],function(i){
"use strict";
function e(i){
this.opt=i,this.onOK=i.onOK,this.createDialog();
}
i("widget/media/appmsg_dialog.css"),i("common/wx/popup.js");
var t=(i("common/wx/top.js"),i("common/wx/Tips.js")),s=i("common/wx/Cgi.js"),a=i("common/wx/pagebar.js"),n=(i("common/wx/time.js"),
i("tpl/media/appmsg_dialog.html.js")),o=i("tpl/media/appmsg_list.html.js"),p=(i("biz_web/ui/checkbox.js"),
i("biz_common/moment.js")),d=0,m=[],r={
dialogData:null
},l=[],g={
createDialog:function(){
r.dialogData=null;
var i=this,e=$.parseHTML(wx.T(n,{}));
this.dialog&&this.dialog.popup("remove"),this.dialog=$(e[0]).popup({
title:"从素材库选择图文",
className:"align_edge appmsg_dialog",
width:960,
onOK:function(){
return i.$btn.hasClass("btn_disabled")||!r.dialogData?(t.err("请选择图文消息"),!0):void(i.onOK&&i.onOK(r.dialogData));
},
onCancel:function(){
this.hide(),i.dialog=null;
},
onHide:function(){
i.$dom.off(),this.remove(),i.dialog=null;
}
}),i.$dom=i.dialog.popup("get"),i.$btn=i.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
i.init();
},
init:function(){
var i=this;
i.initEvent(),i.initAppMsg();
},
initEvent:function(){
var i=this;
i.$dom.on("click","a",function(i){
i.preventDefault();
}),i.$dom.on("click",".jsTempLink",function(){
var i=$(this).parents("ul").data("id"),e=$(this).parents("ul").data("index"),a=window.open();
s.get({
url:"/cgi-bin/appmsg?action=get_temp_url",
data:{
appmsgid:i,
itemidx:e+1
},
success:function(i){
i.base_resp&&0===i.base_resp.ret?a&&a.location&&(a.location.href=i.temp_url):(t.err("生成临时链接失败，请重试"),
a.close());
},
error:function(){
t.err("生成临时链接失败，请重试");
}
});
});
},
initAppMsg:function(){
var i=this;
if(!i.appMsgInited){
var e=i.$dom.find(".js_search_clear_btn"),t=i.$dom.find(".js_search");
i.getAppMsgList(),i.$dom.on("click",".js_search_btn",function(){
""==t.val()?e.hide():e.show(),i.getAppMsgList({
query:t.val()
});
}),i.$dom.on("keyup",".js_search",function(s){
wx.isHotkey(s,"enter")&&(""==t.val()?e.hide():e.show(),i.getAppMsgList({
query:t.val(),
highlight:0
}));
}),e.on("click",function(){
t.val(""),e.hide(),i.getAppMsgList({
query:""
});
}),i.appMsgInited=!0;
}
},
getAppMsgList:function(i){
var e=this,a=$.extend({
begin:0,
count:10
},i||{}),n=e.loadingFlag=++d;
e.$dom.find(".js_loading").show().siblings().hide(),e.resetPos(),s.post({
url:"/cgi-bin/appmsg?type=10&action=list_card",
data:a,
complete:function(){
e.$dom.find(".js_loading").hide(),e.resetPos();
}
},{
done:function(i){
if(n==e.loadingFlag)if(i&&i.base_resp){
if(0==i.base_resp.ret){
var o=i.app_msg_info.item;
return m=[],o.each(function(i){
i.multi_item.each(function(e,t){
e.title=e.title.replace(/<em>/g,"#em#").replace(/<(\/)em>/g,"#/em#").html(!0).replace(/#em#/g,"<em>").replace(/#\/em#/g,"</em>");
var s={
title:e.title,
cover:e.cover,
share_page_type:e.share_page_type,
id:i.app_id,
index:t,
time:p.unix(i.update_time).format("YYYY-MM-DD"),
info:"",
is_pay_subscribe:e.is_pay_subscribe
};
s.title?s.cover||7==s.share_page_type||(s.info="(未设置封面，无法预览)"):s.info="(未命名图文，无法预览)",
a.query?s.title.indexOf("<em>")>-1&&m.push(s):m.push(s);
});
}),e.renderAppMsg(m),void(a.query?e.renderPageBar(a.begin,i.app_msg_info.search_cnt):e.renderPageBar(a.begin,i.app_msg_info.file_cnt.app_msg_cnt));
}
s.show(i);
}else t.err("系统错误");
},
fail:function(){
t.err("系统错误");
}
});
},
renderAppMsg:function(i){
var e=this;
i.length?(l=i,e.$dom.find(".js_appmsg_list").show().find(".js_tbody").html(wx.T(o,{
data:i
})).show().siblings().hide()):e.$dom.find(".js_appmsg_list").show().find(".js_empty").show().siblings().hide(),
e.$btn.addClass("btn_disabled"),r.dialogData=null,e.$dom.find(".jsAppmsgRadio").checkbox({
multi:!1,
onChanged:function(i){
var t=$(i).parents("ul");
t&&s.get({
url:"/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&&isMul=1&appmsgid="+t.data("id")
},function(s){
if(i.is(":checked")&&0==s.base_resp.ret){
var a=JSON.parse(s.app_msg_info);
r.dialogData=a.item[0].multi_item[t.data("index")],e.$btn.removeClass("btn_disabled");
}
});
}
}),e.resetPos();
},
renderPageBar:function(i,e,t){
var s=this;
i=i||0,0==e&&s.$dom.find(".js_pagebar").hide(),new a({
container:s.$dom.find(".js_pagebar"),
perPage:10,
initShowPage:(i/10|0)+1,
totalItemsNum:e,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var e=i.currentPage;
9==t?s.getSentList({
begin:10*(e-1),
query:s.$dom.find(".js_search").val()
}):s.getAppMsgList({
begin:10*(e-1),
query:s.$dom.find(".js_search").val()
});
}
});
},
resetPos:function(){
this.dialog&&this.dialog.popup("resetPosition");
}
};
return $.extend(e.prototype,g),e;
});define("media/draft.js",["biz_common/jquery.md5.js","media/common.js","common/qq/Class.js","biz_web/lib/store.js","biz_common/moment.js","media/report.js"],function(t){
"use strict";
function e(t,e){
return"draft_ls|%s|bizuin:%s|appid:%s|ua:%s|start_write:%s|start_read:%s|start_write_err_STK:%s|start_read_err_STK:%s".sprintf(t||"",wx.data.uin||"",e||0,window.navigator.userAgent,S.lsStartWriteEnable,S.lsStartReadEnable,S.lsStartWriteErrLog,S.lsStartReadErrLog);
}
function a(t){
var e=t.stack||t.toString()||"";
try{
e=e.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var a=/\/([^.]+)\/js\/(\S+?)\.js(\,|:)?/g;a.test(e);)e=e.replace(a,"$2$3");
}catch(t){
e=t.stack?t.stack:"";
}
return e.replace(/\n/g,"");
}
function r(){
if(!f.isLocalStorageNameSupported()){
var t=e("notsupport");
return g.logReport("65080_44_1;65080_45_1",t,"img"),void(S.lsSupport=!1);
}
g.logReport("65080_44_1","","img"),S.lsSupport=!0;
var r=+new Date+"";
try{
window.localStorage.setItem(S.namespace,r);
}catch(n){
S.lsStartWriteEnable=0,S.lsStartWriteErrLog=a(n);
}
var i="";
try{
i=window.localStorage.getItem(S.namespace);
}catch(n){
S.lsStartReadEnable=0,S.lsStartReadErrLog=a(n);
}
window.localStorage.removeItem(S.namespace),i==r&&(S.lsStartWriteEnable=1,S.lsStartWriteErrLog="",
S.lsStartReadEnable=1,S.lsStartReadErrLog="");
}
function n(t,e,a,r){
return l(t,e,a,3,0,r);
}
function i(t,e,a){
return l(t,e,a,4);
}
function s(t){
var e=d(t);
e.appKey+=S.readOnlyDraftName;
var a=_(e.appKey);
return a&&a.list?a.list||!1:!1;
}
function o(t){
var e=d(t);
e.appKey+=S.readOnlyDraftName,f.remove(e.appKey);
}
function _(t){
var e=!1,a=!1;
if(e=f.get(t,function(){
a=!0;
}),a===!0||!e||"v2"!=e.v)return!1;
if(e.md5===$.md5(e.data)){
try{
e=JSON.parse(e.data);
}catch(r){
return!1;
}
return e?(e.seq=(e.seq||"0")+"",e):!1;
}
return!1;
}
function l(t,r,n,i,s,o){
if(S.lsSupport!==!0||!t)return!1;
n=n+""||"0",o=o+""||"0";
var _=d(r);
3==i&&(_.appKey+=S.conflictName),4==i&&(_.appKey+=S.readOnlyDraftName);
var l=1,c=[],p="65080_31_1",u="",m={
data:"",
md5:"",
v:v
},y=+new Date,h={
list:t,
seq:n,
write_t:y,
active_id:s
};
3==i&&(h.ls_seq=o);
try{
m.data=JSON.stringify(h),m.md5=$.md5(m.data);
}catch(K){
l=-6,p+=";65080_86_1",c.push("serialize_err_STK:"+a(K));
}
if(1==l&&f.set(_.appKey,m,function(t){
l=-1,p+=";65080_34_1",c.push("write_err_STK:"+a(t));
}),1==l&&(u=f.get(_.appKey,function(t){
l=-2,p+=";65080_36_1",c.push("read_err_STK:"+a(t));
})),1==l&&m.md5!=u.md5&&(p+=";65080_38_1",l=-3),1==l)return 2==i&&(p+=";65080_47_1"),
3==i?(p+=";65080_88_1",g.logReport(p,e("conflict_data",r)+("|data:"+m.data),"ajax")):g.logReport(p,"","img"),
!0;
var j=e("writeerr",r)+"|handle_type："+l+"|"+c.join("|");
return p+=";65080_32_1",p+=S.lsStartWriteEnable&&S.lsStartReadEnable?";65080_40_1":";65080_42_1",
2==i?(p+=";65080_48_1",j+="|leave_data:"+m.data):3==i&&(p+=";65080_88_1",j+="|conflict_data:"+m.data),
g.logReport(p,j,"ajax"),!1;
}
function c(t){
if(S.lsSupport!==!0)return!1;
var r=d(t);
f.remove(r.timeKey);
var n=1,i=[],s="65080_63_1";
f.remove(r.appKey,function(t){
s+=";65080_70_1",n=-4,i.push("clear_err_STK:"+a(t));
});
var o="";
if(1==n&&(o=f.get(r.appKey,function(t){
s+=";65080_72_1",n=-2,i.push("read_err_STK:"+a(t));
})),1==n&&o&&(s+=";65080_74_1",n=-3),1==n)return g.logReport(s,"","img"),!0;
s+=";65080_64_1",s+=S.lsStartWriteEnable&&S.lsStartReadEnable?";65080_66_1":";65080_68_1";
var _=e("clearerr",t)+"|handle_type："+n+"|"+i.join("|");
return g.logReport(s,_,"ajax"),!1;
}
function d(t){
var e={
draftId:wx.data.uin+(t?t:"")
};
return e.timeKey="Time"+e.draftId,e.appKey="App"+e.draftId,e;
}
t("biz_common/jquery.md5.js");
var p=t("media/common.js"),u=t("common/qq/Class.js"),f=t("biz_web/lib/store.js"),m=t("biz_common/moment.js"),g=t("media/report.js"),v="v2",S={
lsStartWriteEnable:0,
lsStartReadEnable:0,
lsStartWriteErrLog:"",
lsStartReadErrLog:"",
namespace:"__editordraft__",
conflictName:"__conflict",
readOnlyDraftName:"__readonlydraft",
lsSupport:!1,
diffTime:Math.floor(wx.cgiData.svr_time-new Date/1e3)
};
r();
var y=u.declare({
init:function(t,e,a){
var r=this;
r.app_id=t;
var n=d(t);
r.draftId=n.draftId,r.timeKey=n.timeKey,r.appKey=n.appKey,r.seq=e+"",r.editor=a,
r.isDropped=!1,r.conflict=!1,r.activeId=0,r.data=r.get();
},
_updateAppid:function(t,e){
this.app_id=t;
var a=d(t);
this.draftId=a.draftId,this.timeKey=a.timeKey,this.appKey=a.appKey,this.seq=e;
},
_supportUserData:function(){
try{
var t=document.createElement("input");
t.addBehavior("#default#userData");
}catch(e){
return!1;
}
return!0;
},
_getSaveTime:function(){
return f.get(this.timeKey);
},
_showTips:function(){},
_getDefaultLog:function(t){
return e(t,this.app_id);
},
_getErrorMessage:function(t){
return a(t);
},
showTips:function(){
$("#js_draft_tips").show().find(".js_msg_content").html('<span class="js_msg_content">点击<span class="link_global" id="js_draft_cancel">撤消</span>刚刚的导入操作。</span>');
},
clear:function(){
return c(this.app_id);
},
save:function(t,e){
return l(t,this.app_id,this.seq,e,this.activeId);
},
forceSave:function(t,e){
return l(t,this.app_id,this.seq,1,e||+new Date);
},
get:function(){
if(S.lsSupport!==!0)return!1;
var t=this,e=1,a=[],r="65080_50_1",n=!1,i="",s="";
if(i=f.get(t.appKey,function(n){
e=-2,r+=";65080_76_1",a.push("read_err_STK:"+t._getErrorMessage(n));
}),1==e&&i)if(r+=";65080_57_1","v2"==i.v)if(r+=";65080_82_1",s="",i.md5===$.md5(i.data)){
try{
i=JSON.parse(i.data);
}catch(o){
r+=";65080_80_1",e=-5;
}
1==e&&("gt"==p.dataSeqCompare(i.seq,t.seq)?(n=!1,e=-8,r+=";65080_90_1"):"gt"==p.dataSeqCompare(t.seq,i.seq)?(t.conflict=!0,
t.conflict_ls_seq=i.seq+"",n=i.list||!1):(t.conflict_ls_seq=i.seq+"",n=i.list||!1));
}else e=-3,r+=";65080_78_1";else"v1"==i.v?(r+=";65080_59_1",s=i.t||"",n=i.list||!1,
t.conflict_ls_seq="0"):(s=f.get(t.timeKey),r+=";65080_61_1",n=i||!1,t.conflict_ls_seq="0");
if(1==e&&s)try{
Number(wx.cgiData.updateTime)>m(s,"YYYY-MM-DD HH:mm:ss").unix()+S.diffTime&&(t.conflict=!0);
}catch(o){}
if(t.conflict===!0&&(r+=";65080_84_1"),1==e)return g.logReport(r,"","img"),n||!1;
r+=";65080_51_1",r+=S.lsStartWriteEnable&&S.lsStartReadEnable?";65080_53_1":";65080_55_1";
var _=t._getDefaultLog("readerr")+"|handle_type："+e+"|"+a.join("|");
return g.logReport(r,_,"ajax"),!1;
}
});
return{
constructor:y,
clear:c,
saveConflict:n,
saveReadOnlyDraft:i,
getReadOnlyDraft:s,
clearReadOnlyDraft:o
};
});define("media/article_interface.js",["media/appmsg_article.js","media/share_article.js","media/video_article.js","media/txt_article.js","media/audio_article.js","media/image_article.js","media/reprint_article.js"],function(e){
"use strict";
function i(e){
var i=e.data||{},a=(i.share_page_type||0)+"";
"0"===a&&(1==i.is_share_copyright?a="9":0==i.is_share_copyright&&2==i.copyright_type&&(a="11"));
var t=new r[a](e);
return t;
}
function a(e){
var i=(e.type||0)+"";
"function"==typeof r[i].showDialog&&(e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!1),
r[i].showDialog({
can_use_txvideo:e.can_use_txvideo,
onOk:function(i){
e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!0),"function"==typeof e.onOk&&e.onOk(i);
},
onCancel:function(){
e.ueditor&&e.ueditor.fireEvent("handleWinScroll",!0),"function"==typeof e.onCancel&&e.onCancel();
}
}));
}
function t(e){
r[e.type]&&"function"==typeof r[e.type].hideDialog&&r[e.type].hideDialog(e.hide);
}
var r={
0:e("media/appmsg_article.js"),
9:e("media/share_article.js"),
5:e("media/video_article.js"),
10:e("media/txt_article.js"),
7:e("media/audio_article.js"),
8:e("media/image_article.js"),
11:e("media/reprint_article.js")
};
return{
create:i,
showDialog:a,
setDialog:t
};
});define("media/media_cgi.js",["media/common.js","common/wx/Tips.js","common/wx/Cgi.js","resp_types/base_resp.rt.js","resp_types/file_cnt.rt.js","biz_common/utils/monitor.js","common/wx/speedPerformance.js"],function(e){
"use strict";
function r(e){
var r=(new Date).getTime(),s=r-e;
switch(!0){
case 1e3>=s&&s>0:
o.setSum(128961,11,1);
break;

case 2e3>=s&&s>1e3:
o.setSum(128961,12,1);
break;

case 3e3>=s&&s>2e3:
o.setSum(128961,13,1);
break;

case 4e3>=s&&s>3e3:
o.setSum(128961,14,1);
break;

case 5e3>=s&&s>4e3:
o.setSum(128961,15,1);
break;

case 1e4>=s&&s>5e3:
o.setSum(128961,6,1);
break;

case 2e4>=s&&s>1e4:
o.setSum(128961,7,1);
break;

case 3e4>=s&&s>2e4:
o.setSum(128961,8,1);
break;

case 4e4>=s&&s>3e4:
o.setSum(128961,9,1);
break;

case 5e4>=s&&s>4e4:
o.setSum(128961,10,1);
break;

case s>5e4:
o.setSum(128961,37,1);
}
c.mark("appmsg","saveArticleRequestTime","end"),c.saveSpeeds("appmsg","saveArticleRequestTime",48)&&c.send(),
o.send();
}
var s=e("media/common.js"),t=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js"),n=e("resp_types/base_resp.rt.js"),a=e("resp_types/file_cnt.rt.js"),o=e("biz_common/utils/monitor.js"),c=e("common/wx/speedPerformance.js"),p={
del:function(e,r){
i.post({
mask:!1,
url:wx.url("/cgi-bin/operate_appmsg?sub=del&t=ajax-response"),
data:{
AppMsgId:e
},
rtDesc:n,
error:function(){
t.err("删除失败");
}
},function(e){
"0"==e.ret?(t.suc("删除成功"),r&&r(e)):t.err("删除失败");
});
},
del_sv:function(e,r){
i.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
rtDesc:n,
error:function(){
t.err("删除失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(t.suc("删除成功"),r.suc&&r.suc(e)):(t.err("删除失败"),
r.fail&&r.fail(e));
});
},
edit_sv:function(e,r){
i.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e.id,
filename:e.name
},
rtDesc:n,
error:function(){
t.err("编辑失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(t.suc("编辑成功"),r.suc&&r.suc(e)):(t.err("编辑失败"),
r.fail&&r.fail(e));
});
},
save:function(e,n,a,p,u,m){
var f=wx.url(a.AppMsgId?"/cgi-bin/operate_appmsg?t=ajax-response&sub=update&type=%s".sprintf(n):"/cgi-bin/operate_appmsg?t=ajax-response&sub=create&type=%s".sprintf(n));
a.ajax=1;
var d=wx.cgiData,l=d.selfcheck_autocheck,g=d.can_use_selfcheck;
g&&l&&(a.isNeedSave=1);
var _=(new Date).getTime();
c.mark("appmsg","saveArticleRequestTime","start"),i.post({
url:f,
data:a,
dataType:"json",
rtDesc:{
ret_R:"string",
appMsgId_R:"number"
},
error:function(e,r){
"timeout"!=r&&t.err("保存失败"),u&&u(!1,-1,"",{
myErrMsg:"保存失败"
});
},
complete:m
},function(e){
if(r(_),"0"==e.ret)t.suc("保存成功"),p&&p(e);else{
var i=s.articleRetCode(e),n=i.index;
e.myErrMsg=i.errmsg,200047===e.base_resp.ret?e.myErrMsg="标题中不能含有特殊字符":202901===e.base_resp.ret&&(e.myErrMsg="直播间卡片数量不能超过3个");
var a="";
e.ret?a=e.ret:e.base_resp&&(a=e.base_resp.ret,-203===Number(a)?(o.setSum(65080,124,1),
o.send()):500201===Number(a)&&(o.setSum(127648,36,1),o.send())),u&&u(n,e.ret,e.remind_wording,e);
}
});
},
preview:function(e,r,n,a,o){
i.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=%s".sprintf(r)),
data:n,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
t.err("发送失败，请稍后重试"),o&&o({
word:"发送失败，请稍后重试"
});
}
},function(e){
if("0"==e.ret)n.only_check||t.suc("发送预览成功，请留意你的手机微信"),a&&a(e);else{
var i=s.articleRetCode(e);
e.word=i.errmsg,e.antispam=i.index,200047===e.base_resp.ret?e.word="标题中不能含有特殊字符":202901===e.base_resp.ret&&(e.word="直播间卡片数量不能超过3个"),
15==r&&t.err(e.word),o&&o(e);
}
});
},
sendPreview:function(e,r,n){
i.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=10"),
data:e,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
t.err("发送失败，请稍后重试"),n&&n({
word:"发送失败，请稍后重试"
});
}
},function(i){
if("0"==i.ret)e.only_check||t.suc("发送预览成功，请留意你的手机微信"),r&&r(i);else{
var a=s.articleRetCode(i);
i.word=a.errmsg,i.antispam=a.index,n&&n(i);
}
});
},
modifyPreview:function(e,r,n){
i.post({
url:wx.url("/cgi-bin/masssendmodify?action=preview"),
data:e,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
t.err("发送失败，请稍后重试"),n&&n({
word:"发送失败，请稍后重试"
});
}
},function(e){
if("0"==e.ret)t.suc("发送预览成功，请留意你的手机微信"),r&&r(e);else{
var i=s.articleRetCode(e);
e.word=i.errmsg,e.antispam=i.index,15==type&&t.err(e.word),n&&n(e);
}
});
},
getList:function(e,r,s,o,c,p){
var u="";
u=wx.url(c?"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&query=%s&f=json".sprintf(e,r,s,c):"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,r,s)),
0==p?u=wx.url("/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,r,s)):1==p&&(u=wx.url("/cgi-bin/video_mgr?type=%s&action=get_video_list&begin=%s&offset=%s&f=json".sprintf(e,r,s))),
i.get({
mask:!1,
url:u,
rtDesc:$.extend({},n,{
app_msg_info:$.extend({},a,{
item_R:[],
search_cnt:"number"
})
}),
error:function(){
t.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?o&&o(e.app_msg_info):t.err("获取列表失败");
});
},
getSingleList:function(e,r,s,n){
i.get({
mask:!1,
url:wx.url("/cgi-bin/appmsg?type=%s&action=for_advert&begin=%s&count=%s&f=json".sprintf(e,r,s)),
error:function(){
t.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?n&&n(e.app_msg_info):t.err("获取列表失败");
});
}
},u={
save:function(e,r,s){
var n=wx.url("/cgi-bin/operate_vote");
e.ajax=1,i.post({
url:n,
data:e,
error:function(){
t.err("保存失败"),s&&s();
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(t.suc("保存成功"),r&&r(e)):(t.err("保存失败"),s&&s(e));
});
}
};
return{
rename:function(e,r,s){
i.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e,
fileName:r
},
error:function(){
t.err("重命名失败");
}
},function(e){
if(!e||!e.base_resp)return void t.err("重命名失败");
var r=e.base_resp.ret;
if("0"==r)t.suc("重命名成功"),s&&s(e);else switch(r){
case"200002":
t.err("素材名不能包含空格");
break;

default:
t.err("重命名失败");
}
});
},
del:function(e,r){
i.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
t.err("删除失败");
}
},function(e){
if(!e||!e.base_resp)return void t.err("删除失败");
var s=e.base_resp.ret;
"0"==s?(t.suc("删除成功"),r&&r(e)):t.err("删除失败");
});
},
getList:function(e,r,s,o){
(2==e||3==e)&&(e+="&action=select"),i.get({
mask:!1,
url:wx.url("/cgi-bin/filepage?type=%s&begin=%s&count=%s&f=json".sprintf(e,r,s)),
rtDesc:$.extend({},n,{
page_info_R:$.extend({},a,{
file_item_R:[{
file_id_R:"number",
name_R:"string",
size_R:"string",
update_time_R:"number",
type_R:"number"
}]
})
}),
error:function(){
t.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?o&&o(e.page_info):t.err("获取列表失败");
});
},
appmsg:p,
vote:u
};
});define("common/wx/mpEditor/plugin/remoteimg.js",["common/wx/Tips.js","media/report.js","common/wx/mpEditor/plugin/filter.js","common/wx/mpEditor/plugin/checkTextUtils.js"],function(require,exports,module){
"use strict";
function Remoteimg(e){
this.init(e),this.addEvent();
}
var Tips=require("common/wx/Tips.js"),Report=require("media/report.js"),Filter=require("common/wx/mpEditor/plugin/filter.js"),CheckTextUtils=require("common/wx/mpEditor/plugin/checkTextUtils.js"),g={
appmsgTmpImg:"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
defaultRemoteImg:"http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0"
};
return Remoteimg.defaultRemoteImg=g.defaultRemoteImg,Remoteimg.prototype.init=function(e){
var t=this;
this.uploadUrl=(~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"")+"/cgi-bin/filetransfer?action=upload_material&f=json&scene=8&writetype=doublewrite&groupid=1&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time,
this.uploadUrl=wx.url(this.uploadUrl),this.mpeditor=e,this.editor=e.getUeditor(),
this.domUtils=UE.dom.domUtils,this.ajax=UE.ajax,this.localDomain=["127.0.0.1","localhost","mmbiz.qpic.cn","mmbiz.qlogo.cn","mmsns.qpic.cn"],
this.catcherUrl=this.editor.options.catcherUrl,this.catchFieldName="imgurl",this.separater="ue_separate_ue",
this.id=+new Date,this.remoteList={},this.Blob_obj_support=function(){
try{
return!!window.Blob&&Boolean(new Blob);
}catch(e){
return!1;
}
}(),this.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,
this.dataURLtoBlobSupport=function(){
return(t.BlobBuilder||t.Blob_obj_support)&&window.atob&&window.ArrayBuffer&&window.Uint8Array?!0:!1;
}(),this.Blob_Uint8Array_support=function(){
try{
return!!t.Blob_obj_support&&!!window.Uint8Array&&100===new Blob([new Uint8Array(100)]).size;
}catch(e){
return!1;
}
}();
},Remoteimg.prototype.countSentence=function(e){
var t=0,r=CheckTextUtils.splitChar,o="=#,@";
try{
for(var i=e.getData("text/plain"),a=i.replace(/ /g,"").replace(/\r/g,"").replace(/\n/g,o),n=0,m=r.length;m>n;n++){
var s,c=r[n];
s=c.escape?new RegExp("\\"+c.value,"g"):new RegExp(c.value,"g"),a=a.replace(s,o);
}
var s=new RegExp("("+o+")+","g"),p=new RegExp("^("+o+")","g"),l=new RegExp("("+o+")$","g");
a=a.replace(s,o).replace(p,"").replace(l,""),t=a.split(o).length;
}catch(d){}
t>0&&(Report.addNum(65080,110,1),Report.addNum(65080,111,t));
},Remoteimg.prototype.addEvent=function(){
var _t=this,me=this.editor,mpeditor=this.mpeditor;
me.addListener("onpasting",function(e,t){
var r=null,o=t.clipboardData?t.clipboardData:t.originalEvent&&t.originalEvent.clipboardData?t.originalEvent.clipboardData:{},i=o.items;
if(i&&i.length>0){
Report.addNum(Report.reportId[2],5,1),1==i.length&&/image/i.test(i[0].type)&&(r=i[0].getAsFile());
for(var a=0,n=i.length;n>a;a++)/text\/rtf/i.test(i[a].type)&&Report.addNum(Report.reportId[2],6,100);
_t.countSentence(o);
}
return _t.catchObjectBlob(r);
}),me.addListener("afterpaste aftersetcontent afterinserthtml",function(e,t,r){
for(var o,i,a,n,m=[],s=0;n=r[s++];)if(n.tagName){
o="img"==n.tagName.toLowerCase()?[n]:_t.domUtils.getElementsByTagName(n,"img");
for(var c,p=0;c=o[p++];){
if(_t.handleDataSrc(c),i=c.getAttribute("style")||c.style.cssText||"",c.getAttribute("src")&&/;?\s*(background|background-image)\s*\:/.test(i)&&($(c).css({
"background-image":"none"
}).removeClass("img_loading"),Filter.filterStyleAttr(c,["background-image"])),c.src===g.appmsgTmpImg){
var l=c.getAttribute("data-src");
l&&_t.isLocalDomain(l)&&(c.src=l,c.removeAttribute("data-src"));
}
_t.http2https("img",c),a=c.getAttribute("_src")||c.src||"",/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)?me.fireEvent("catchRemoteImage",c,"img",a):/^data:image/i.test(a)?_t.catchDataUrl(a,c):/^blob:/i.test(a)?_t.catchObjectUrl(c,a):_t.isLocalDomain(a)||c.parentNode&&c.parentNode.removeChild(c);
}
for("afterpaste"==e&&o.length>0&&me.fireEvent("afterpasteimg","",o),m=[n],m.push.apply(m,_t.domUtils.getElementsByTagName(n,"*")),
p=0;c=m[p++];)if(i=c.getAttribute("style")||c.style.cssText||"",i=i.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),
i&&i[2]){
a=i[2].replace(/^['"]|['"]$/g,"");
var d=_t.http2https("bg",c,a);
a=d&&d.url?d.url:a,/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)?me.fireEvent("catchRemoteImage",c,"bg",a):/^data:image/i.test(a)?_t.catchDataUrl(a,c):/^blob:/i.test(a)?_t.catchObjectUrl(c,a):_t.isLocalDomain(a)||(c.style.background="");
}
for(p=0;c=m[p++];)c.style&&(c.style.borderImage="",c.style.borderImageSource="");
}
}),me.addListener("catchRemoteImage",function(cmd,ci,type,url){
var remoteObj=_t.setRemoteTag({
dom:ci,
uid:"c"+_t.getuid()
});
if(remoteObj){
var uid=remoteObj.uid;
"bg"==type?me.fireEvent("funcPvUvReport","remoteimg_style"):"img"==type&&me.fireEvent("funcPvUvReport","remoteimg_img"),
_t.catchremoteimage([url],{
success:function success(xhr){
!!_t.remoteList[uid]&&delete _t.remoteList[uid];
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","remoteimgerr"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
info&&0==info.errcode&&info.url?(me.fireEvent("funcPvUvReport","remoteimgsuc"),me.fireEvent("catchremotesuccess",remoteObj,info.url,info.img_format)):(me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,"")),_t.checkRemoteList(!0);
},
error:function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
}
});
}
}),me.addListener("checkRemoteList",function(e,t){
return _t.checkRemoteList(t===!0?!0:!1);
}),me.addListener("getRemoteList",function(){
return _t.remoteList;
});
},Remoteimg.prototype.catchObjectBlob=function(e,t){
var r=this,o=this.editor,i=!1;
if(null!==e&&(i=r.filterImgSize(e)),null!==e&&i!==!0)return r.pasteImageError({
msg:i.msg?i.msg:"图片粘贴失败",
dom:t
}),!0;
if(null!==e&&i===!0){
var a,n=e.type.split("/")[1]||"";
if(a=o.window.URL||o.window.webkitURL){
var m=a.createObjectURL(e);
if("string"==typeof m)return t?r.uploadPasteImg({
image:m,
blob:e,
type:n,
dom:t
}):r.pasteImageInserted({
image:m,
blob:e,
type:n
}),!0;
}
if("function"!=typeof FileReader)return!1;
var s=new FileReader;
return s.onload=function(o){
o.target&&2==o.target.readyState&&(t?r.uploadPasteImg({
image:m,
blob:e,
type:n,
dom:t
}):r.pasteImageInserted({
image:o.target.result,
blob:e,
type:n
}));
},s.onerror=function(){
r.pasteImageError({
msg:"图片粘贴失败",
dom:t
});
},s.readAsDataURL(e),!0;
}
},Remoteimg.prototype.catchObjectUrl=function(e,t){
var r=this,o=this.editor,i=r.setRemoteTag({
dom:e,
uid:"p"+r.getuid()
});
if(i){
var a=i.uid,n=new Image;
n.onerror=function(){
!!r.remoteList[a]&&delete r.remoteList[a],o.fireEvent("catchremoteerror",i,""),r.checkRemoteList(!0);
},n.onload=function(){
!!r.remoteList[a]&&delete r.remoteList[a],n.onerror=null,n.onload=null;
var t=n.width||n.naturalWidth,i=n.height||n.naturalHeight,m=o.document.createElement("canvas"),s=m.getContext("2d");
m.width=t,m.height=i,s.drawImage(n,0,0,t,i);
var c=m.toDataURL();
r.catchDataUrl(c,e);
},n.src=t;
}
},Remoteimg.prototype.catchDataUrl=function(e,t){
var r=this,o=r.dataURLtoBlob(e),i=!1;
if(o&&!r.validImg(o)&&(o=null),o)if(i=r.filterImgSize(o),i===!0){
var a=o.type.split("/")[1]||"";
r.uploadPasteImg({
image:e,
blob:o,
dom:t,
type:a
});
}else r.pasteImageError({
msg:i.msg?i.msg:"图片粘贴失败",
dom:t
});else r.pasteImageError({
msg:"图片粘贴失败",
dom:t
});
},Remoteimg.prototype.objectUrl2Blob=function(e,t,r){
var o=new XMLHttpRequest;
o.onerror=function(){
"function"==typeof r&&r();
},o.onreadystatechange=function(){
4===o.readyState&&(o.onreadystatechange=null,o.onerror=null,o.status>=200&&o.status<300?"function"==typeof t&&t(this.response):"function"==typeof r&&r());
},o.responseType="blob",o.open("GET",e,!0),o.send();
},Remoteimg.prototype.pasteImageError=function(e){
var t=this,r=this.editor;
if(!e.dom)return void r.fireEvent("catchremoteerror",null,e.msg||"");
var o=t.setRemoteTag({
dom:e.dom,
force:!0,
uid:"p_"+this.getuid()
});
!!t.remoteList[o.uid]&&delete t.remoteList[o.uid],r.fireEvent("catchremoteerror",o,e.msg||"");
},Remoteimg.prototype.pasteImageInserted=function(e){
for(var t=this,r=this.editor,o=r.fireEvent("insertMaterialImg",[{
format:e.type,
src:e.image
}]),i=0,a=o.length;a>i;i++){
var n=o[i];
if(/^img$/i.test(n.nodeName)){
e.dom=n;
break;
}
var m=n.getElementsByTagName("img");
if(m&&m.length>0){
e.dom=m[0];
break;
}
}
e.dom&&/^img$/i.test(e.dom.nodeName)&&t.uploadPasteImg(e);
},Remoteimg.prototype.dataURLtoBlob=function(e){
if(!this.dataURLtoBlobSupport)return!1;
try{
var t,r=e.split(",");
t=r[0].indexOf("base64")>=0?window.atob(r[1]):decodeURIComponent(r[1]);
for(var o=new ArrayBuffer(t.length),i=new Uint8Array(o),a=0,n=t.length;n>a;a++)i[a]=t.charCodeAt(a);
var m=r[0].split(":")[1].split(";")[0];
if(this.Blob_obj_support)return this.Blob_Uint8Array_support?new Blob([i],{
type:m
}):new Blob([o],{
type:m
});
var s=new BlobBuilder;
return s.append(o),s.getBlob(m);
}catch(c){
return!1;
}
},Remoteimg.prototype.setRemoteTag=function(e){
var t=this,r=this.editor,o=r.fireEvent("get_current_article");
if(!e.dom||!e.uid)return!1;
var i=e.dom.getAttribute("data-remoteid");
if(i&&t.remoteList[i]){
if(e.force!==!0)return!1;
delete t.remoteList[i];
}
i=i||e.uid;
var a=t.remoteList[i]={
article:o,
uid:i,
defaultRemoteImg:g.defaultRemoteImg
};
return t.domUtils.setAttributes(e.dom,{
"data-remoteid":i
}),a;
},Remoteimg.prototype.uploadPasteImg=function(opt){
var _t=this,me=this.editor;
if("function"!=typeof FormData)return _t.pasteImageError({
msg:"粘贴图片失败",
dom:opt.dom
}),!1;
var id=this.getuid(),remoteObj=_t.setRemoteTag({
dom:opt.dom,
uid:"p_"+id
});
if(remoteObj){
var uid=remoteObj.uid,originName=$(opt.dom).data("filename"),seq=wx&&wx.getSeq(),form=new FormData,extensions=opt.blob.type.split("/")[1]||"",url=this.uploadUrl+"&seq="+seq,filename=originName||"粘贴图片_"+this.formatDate(new Date,"YYYYMMDDHHIISS")+(extensions?"."+extensions:"");
form.append("id",id),form.append("name",filename),form.append("type",opt.blob.type),
form.append("lastModifiedDate",new Date),form.append("size",opt.blob.size),form.append("file",opt.blob,filename);
var xhr=new XMLHttpRequest;
xhr.onerror=function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","screen_shot_fail"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
},xhr.onreadystatechange=function(error){
if(4===xhr.readyState)if(xhr.upload.onprogress=null,xhr.onreadystatechange=null,
xhr.onerror=null,!!_t.remoteList[uid]&&delete _t.remoteList[uid],xhr.status>=200&&xhr.status<300){
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
if(info&&info.base_resp&&0==info.base_resp.ret&&info.cdn_url){
var cdnUrl=info.cdn_url.http2https();
me.fireEvent("funcPvUvReport","screen_shot_suc"),me.fireEvent("catchremotesuccess",remoteObj,cdnUrl,extensions);
}else info&&info.base_resp&&220001==info.base_resp.ret?Tips.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):info&&info.base_resp&&220002==info.base_resp.ret?Tips.err("你的图片库已达到存储上限，请进行清理。"):(me.fireEvent("funcPvUvReport","screen_shot_fail"),
me.fireEvent("catchremoteerror",remoteObj,""));
_t.checkRemoteList(!0);
}else me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
_t.checkRemoteList(!0);
},xhr.open("POST",url),xhr.send(form);
}
},Remoteimg.prototype.validImg=function(e){
return e.size<1024?!1:!0;
},Remoteimg.prototype.filterImgSize=function(e){
var t=5242880,r=",bmp,png,jpeg,jpg,gif,",o=","+(e.type.split("/")[1]||"")+",";
return e.size>t?{
type:1,
msg:"截图的图片大小不能超过5M"
}:-1==r.indexOf(o)?{
type:2,
msg:"截图的图片必须为以下格式：bmp,png,jpeg,jpg,gif"
}:!0;
},Remoteimg.prototype.checkRemoteList=function(e){
var t=0;
for(var r in this.remoteList)this.remoteList.hasOwnProperty(r)&&t++;
return t>0?!1:(e===!0&&this.editor.fireEvent("remoteimg_all_complete"),!0);
},Remoteimg.prototype.handleDataSrc=function(e){
var t=e.getAttribute("src")||"",r=e.getAttribute("data-src")||"";
/^data:image/i.test(t)&&(/^http:\/\/mmbiz\.qpic\.cn/.test(r)||/^https:\/\/mmbiz\.qlogo\.cn/.test(r))&&(e.setAttribute("src",r),
e.removeAttribute("data-src"));
},Remoteimg.prototype.http2https=function(e,t,r){
if("img"==e){
var o=t.getAttribute("src")||"";
if(!this.isCdnImg(o))return;
var i=this.formatUrl(o);
return t.setAttribute("src",i.url),!!i.format&&t.setAttribute("data-type",i.format),
t.removeAttribute("_src"),t.removeAttribute("data-src"),i;
}
if("bg"==e&&r&&this.isCdnImg(r)){
var i=this.formatUrl(r);
return t.style.backgroundImage=i.url,i;
}
return null;
},Remoteimg.prototype.formatUrl=function(e){
e=e||"";
var t=e.match(/(?:\?|&)wx_fmt=(.*?)(?:&|$)/)||[];
return t=t[1]||"",e=e.http2https().replace(/\?.*$/,"?"),t&&e&&(e=e+"wx_fmt="+t),
{
url:e,
format:t
};
},Remoteimg.prototype.catchremoteimage=function(e,t){
var r=e.join(this.separater),o=(this.editor,{
timeout:6e4,
onsuccess:function(){
"function"==typeof t.success&&t.success.apply(this,arguments);
},
onerror:function(){
"function"==typeof t.error&&t.error.apply(this,arguments);
}
});
try{
var i=decodeURIComponent(r);
o[this.catchFieldName]=encodeURI(i);
}catch(a){
o[this.catchFieldName]=r;
}
o.t="ajax-editor-upload-img";
var n=this;
setTimeout(function(){
n.ajax.request(n.catcherUrl,o);
},2e3);
},Remoteimg.prototype.getuid=function(){
return this.id++;
},Remoteimg.isCdnImg=Remoteimg.prototype.isCdnImg=function(e){
for(var t,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.isLocalDomain=Remoteimg.prototype.isLocalDomain=function(e){
if(/^\/cgi-bin\//.test(e))return!0;
for(var t,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/mp\.weixin\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/res\.wx\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/mmcomm\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/finder\.video\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/wx\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/wxapp\.tc\.qq\.com([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.isVideoSnapDomain=Remoteimg.prototype.isVideoSnapDomain=function(e){
for(var t,r=[/^http(s)?:\/\/finder\.video\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/wx\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/wxapp\.tc\.qq\.com([\/?].*)*$/i],o=0;t=r[o++];)if(t.test(e))return!0;
return!1;
},Remoteimg.prototype.formatDate=function(e,t){
var r=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,this.addZero(e.getFullYear()%100,2)).replace(/mm|MM/,this.addZero(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,this.addZero(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,this.addZero(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,this.addZero(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,this.addZero(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds());
return r;
},Remoteimg.prototype.addZero=function(e,t){
for(var r=0,o=t-(e+"").length;o>r;r++)e="0"+e;
return e+"";
},Remoteimg;
});define("biz_common/utils/monitor.js",[],function(){
var n=[],t={};
return t.setAvg=function(r,e,i){
return n.push(r+"_"+e+"_"+i),n.push(r+"_"+(e-1)+"_1"),t;
},t.setSum=function(r,e,i){
return n.push(r+"_"+e+"_"+i),t;
},t.send=function(){
if(0!=n.length){
var t=[];
for(t.push(n.splice(0,60));n.length>0;)t.push(n.splice(0,60));
n=[];
for(var r=0,e=t.length;e>r;r++){
var i=new Image;
i.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+t[r].join(";")+"&t="+Math.random();
}
}
},t.getData=function(t){
t=t||{};
var r=[];
try{
r=JSON.parse(JSON.stringify(n));
}catch(e){
r=[];
}
return t.remove!==!1&&(n=[]),r;
},t;
});define("common/wx/time.js",[],function(){
"use strict";
function e(e){
var t=new Date(1e3*e),r=new Date,g=t.getTime(),a=r.getTime(),u=864e5;
return u>a-g&&r.getDate()==t.getDate()?"%s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):2*u>a-g&&new Date(1*t+u).getDate()==r.getDate()?"昨天 %s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):6*u>=a-g?"%s %s:%s".sprintf(s[t.getDay()],n(t.getHours()),n(t.getMinutes())):t.getFullYear()==r.getFullYear()?"%s月%s日".sprintf(n(t.getMonth()+1),n(t.getDate())):"%s年%s月%s日".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()));
}
function t(e){
var t=new Date(1e3*e);
return"%s-%s-%s %s:%s:%s".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()),n(t.getHours()),n(t.getMinutes()),n(t.getSeconds()));
}
function r(e,t){
var r=["日","一","二","三","四","五","六"],n=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,g(e.getFullYear()%100,2)).replace(/mm|MM/,g(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,g(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,g(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,g(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,g(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds()).replace(/w/g,e.getDay()).replace(/W/g,r[e.getDay()]);
return n;
}
function g(e,t){
for(var r=0,g=t-(e+"").length;g>r;r++)e="0"+e;
return e+"";
}
var n=function(e){
return e+="",e.length>=2?e:"0"+e;
},s=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
return{
timeFormat:e,
getFullTime:t,
formatDate:r
};
});define("common/wx/mpEditor/common/base_class.js",["common/qq/Class.js"],function(e){
"use strict";
var t=e("common/qq/Class.js"),n=t.declare({
extend:function(e){
for(var t=1,n=arguments.length;n>t;t++)for(var i in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],i)&&(e[i]=arguments[t][i]);
return e;
},
bindEventInterface:function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},
unbindEventInterface:function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},
unbindSpecifyEvent:function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var i=this.__EventInterfaceCache[t];
if(i.type===e.type&&i.eventName===e.eventName&&i.fun===e.fun&&(!e.dom||e.dom&&i.dom===e.dom)){
"domUtils"==i.type?this.domUtils.un(i.dom,i.eventName,i.fun):"editor"==i.type&&this.editor.removeListener(i.eventName,i.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
}
});
return n;
});define("common/wx/media/keywordDialog.js",["biz_web/ui/checkbox.js","common/wx/popup.js","tpl/media/keyword_dialog.html.js"],function(i){
"use strict";
i("biz_web/ui/checkbox.js"),i("common/wx/popup.js");
var t=i("tpl/media/keyword_dialog.html.js"),n=function(i){
this.hint_word=i.hint_word||[],this.remind_wording=i.remind_wording||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
this.buttons=i.buttons,this.onChange=i.onChange,this.onHide=i.onHide,this._initData(),
this._init();
};
return n.prototype._initData=function(){
for(var i=[],t=0;t<this.hint_word.length;t++)-1==i.indexOf(this.hint_word[t])&&i.push(this.hint_word[t]);
this.words=i;
},n.prototype._init=function(){
var i=this;
$(wx.T(t,{
words:i.words,
title:i.remind_wording.split("|")[0],
desc:i.remind_wording.split("|")[1]
})).popup({
title:"关键词提示",
buttons:i.buttons,
onShow:function(){
i.$dialog=this.get(),this.get().find(".js_btn_p").eq(0).disable(),i.$dialog.find(".js_checkbox").checkbox({
multi:!1,
onChanged:function(t){
i.onChange(i.$dialog,t);
}
});
},
onHide:i.onHide
});
},n;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/common.js",["media/article_data_key.js","biz_common/jquery.validate.js","common/wx/mpEditor/plugin/filter.js"],function(e){
"use strict";
function r(e){
var r=e.key+(e.strict===!0?"Strict":"");
return"function"==typeof u[r]?u[r](e):!0;
}
function a(e){
function r(){
a&&a.fireEvent("checkRemoteList")&&a.fireEvent("checkdomAsynList")&&(a.removeListener("remoteimg_all_complete domasyn_all_complete",r),
s());
}
var a=e.editor,s=e.callback;
return a.fireEvent("checkRemoteList")&&a.fireEvent("checkdomAsynList")?void s():(a.addListener("remoteimg_all_complete domasyn_all_complete",r),
void a.funcPvUvReport("save_remoting_img"));
}
function s(e){
var r,a={
errmsg:"",
index:!1
};
switch("undefined"!=typeof e.ret?r=1*e.ret:e.base_resp&&"undefined"!=typeof e.base_resp.ret&&(r=1*e.base_resp.ret),
1*r){
case-8:
case-6:
e.ret="-6",a.errmsg="请输入验证码";
break;

case 62752:
a.errmsg="可能含有具备安全风险的链接，请检查";
break;

case 64505:
a.errmsg="发送预览失败，请稍后再试";
break;

case 64504:
a.errmsg="保存图文消息发送错误，请稍后再试";
break;

case 64518:
a.errmsg="正文只能包含一个投票";
break;

case 10704:
case 10705:
a.errmsg="该素材已被删除";
break;

case 10701:
a.errmsg="用户已被加入黑名单，无法向其发送消息";
break;

case 10703:
a.errmsg="对方关闭了接收消息";
break;

case 10700:
case 64503:
a.errmsg="1.接收预览消息的微信尚未关注公众号，请先扫码关注<br /> 2.如果已经关注公众号，请查看微信的隐私设置（在手机微信的“我->设置->隐私->添加我的方式”中），并开启“可通过以下方式找到我”的“手机号”、“微信号”、“QQ号”，否则可能接收不到预览消息";
break;

case 64502:
a.errmsg="你输入的微信号不存在，请重新输入";
break;

case 64501:
a.errmsg="你输入的帐号不存在，请重新输入";
break;

case 412:
a.errmsg="图文中含非法外链";
break;

case 64515:
a.errmsg="当前素材非最新内容，请重新打开并编辑";
break;

case 320001:
a.errmsg="该素材已被删除，无法保存";
break;

case 64702:
a.errmsg="标题超出64字长度限制";
break;

case 64703:
a.errmsg="摘要超出120字长度限制";
break;

case 64704:
case 64708:
a.errmsg="推荐语超出长度限制";
break;

case 64515:
a.errmsg="当前素材非最新内容";
break;

case 200041:
a.errmsg="此素材有文章存在违规，无法编辑";
break;

case 64506:
a.errmsg="保存失败,链接不合法";
break;

case 64507:
a.errmsg="内容不能包含外部链接，请输入http://或https://开头的公众号相关链接";
break;

case 64510:
a.errmsg="内容不能包含音频，请调整";
break;

case 64511:
a.errmsg="内容不能包多个音频，请调整";
break;

case 64512:
a.errmsg="文章中音频错误,请使用音频添加按钮重新添加。";
break;

case 64508:
a.errmsg="查看原文链接可能具备安全风险，请检查";
break;

case 64550:
a.errmsg="请勿插入不合法的图文消息链接";
break;

case 64563:
a.errmsg="话题链接格式错误，请确认后重试";
break;

case 64558:
a.errmsg="请勿插入图文消息临时链接，链接会在短期失效";
break;

case 64559:
a.errmsg="不支持添加未群发的文章/视频/图片/语音链接";
break;

case-99:
a.errmsg="内容超出字数，请调整";
break;

case 64705:
a.errmsg="内容超出字数，请调整";
break;

case-1:
a.errmsg="系统错误，请注意备份内容后重试";
break;

case-2:
case 200002:
a.errmsg="参数错误，请注意备份内容后重试";
break;

case 64509:
a.errmsg="正文中不能包含超过3个视频，请重新编辑正文后再保存。";
break;

case-5:
a.errmsg="服务错误，请注意备份内容后重试。";
break;

case 64513:
a.errmsg="请从正文中选择封面，再尝试保存。";
break;

case-206:
a.errmsg="目前，服务负荷过大，请稍后重试。";
break;

case 10801:
a.errmsg="标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10802:
a.errmsg="作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10803:
a.errmsg="敏感链接，请重新添加。",a.index=1*e.msg;
break;

case 10804:
a.errmsg="摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10806:
a.errmsg="正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10808:
a.errmsg="推荐语不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",a.index=1*e.msg;
break;

case 10807:
a.errmsg="内容不能违反公众平台协议、相关法律法规和政策，请重新编辑。";
break;

case 200003:
a.errmsg="登录态超时，请重新登录。";
break;

case 64513:
a.errmsg="封面必须存在正文中，请检查封面";
break;

case 64551:
a.errmsg="请检查图文消息中的微视链接后重试。";
break;

case 64552:
a.errmsg="请检查阅读原文中的链接后重试。";
break;

case 64553:
a.errmsg="请不要在图文消息中插入超过5张卡券。请删减卡券后重试。";
break;

case 64554:
a.errmsg="在当前情况下不允许在图文消息中插入卡券，请删除卡券后重试。";
break;

case 64555:
a.errmsg="请检查图文消息卡片跳转的链接后重试。";
break;

case 64556:
a.errmsg="卡券不属于该公众号，请删除后重试";
break;

case 64557:
a.errmsg="卡券无效，请删除后重试。";
break;

case 13002:
a.errmsg="该广告卡片已过期，删除后才可保存成功",a.index=1*e.msg;
break;

case 13003:
a.errmsg="已有文章插入过该广告卡片，一个广告卡片仅可插入一篇文章",a.index=1*e.msg;
break;

case 13004:
a.errmsg="该广告卡片与图文消息位置不一致",a.index=1*e.msg;
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
a.errmsg=e.remind_wording||"你所编辑的内容可能含有违反微信公众平台平台协议、相关法律法规和政策的内容";
break;

case 1530503:
a.errmsg="请勿添加其他公众号的主页链接";
break;

case 1530504:
a.errmsg="请勿添加其他公众号的主页链接";
break;

case 1530510:
a.errmsg="链接已失效，请在手机端重新复制链接";
break;

case 153007:
case 153008:
case 153009:
case 153010:
a.errmsg="很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求：<br />文章文字字数（不包含标点符号和空格）大于300字，且自己创作的内容大于引用内容。<br />说明：上述要求中，文章文字字数不包含标点符号和空格，请知悉。";
break;

case 153200:
a.errmsg="无权限声明原创，取消声明后重试";
break;

case 1530511:
a.errmsg="链接已失效，请在手机端重新复制链接";
break;

case 220001:
a.errmsg='"素材管理"中的存储数量已达到上限，请删除后再操作。';
break;

case 220002:
a.errmsg="你的图片库已达到存储上限，请进行清理。";
break;

case 153012:
a.errmsg="请设置转载类型";
break;

case 200042:
a.errmsg="图文中包含的小程序素材不能多于50个、小程序帐号不能多于10个";
break;

case 200043:
a.errmsg="图文中包含没有关联的小程序，请删除后再保存";
break;

case 64601:
a.errmsg="一篇文章只能插入一个广告卡片";
break;

case 64602:
a.errmsg="尚未开通文中广告位，但文章中有广告";
break;

case 64603:
a.errmsg="文中广告前不足300字";
break;

case 64604:
a.errmsg="文中广告后不足300字";
break;

case 64605:
a.errmsg="文中不能同时插入文中广告和互选广告";
break;

case 64607:
a.errmsg="付费图文不可插入广告，请将广告移除后再保存";
break;

case 64608:
a.errmsg="一篇文章最多添加一个搜索组件";
break;

case 65101:
a.errmsg="图文模版数量已达到上限，请删除后再操作";
break;

case 64560:
a.errmsg="请勿插入历史图文消息页链接";
break;

case 64561:
a.errmsg="请勿插入mp.weixin.qq.com域名下的非图文消息链接";
break;

case 64562:
a.errmsg="请勿插入非mp.weixin.qq.com域名的链接";
break;

case 153013:
a.errmsg="文章内含有投票，不能设置为开放转载";
break;

case 153014:
a.errmsg="文章内含有卡券，不能设置为开放转载";
break;

case 153015:
a.errmsg="文章内含有小程序链接，不能设置为开放转载";
break;

case 153016:
a.errmsg="文章内含有小程序链接，不能设置为开放转载";
break;

case 153017:
a.errmsg="文章内含有小程序卡片，不能设置为开放转载";
break;

case 153018:
a.errmsg="文章内含有商品，不能设置为开放转载";
break;

case 153019:
a.errmsg="文章内含有广告卡片，不能设置为开放转载";
break;

case 153020:
a.errmsg="文章内含有广告卡片，不能设置为开放转载";
break;

case 153021:
a.errmsg="文章内含有广告卡片，不能设置为开放转载";
break;

case 153101:
a.errmsg="含有原文已删除的转载文章，请删除后重试";
break;

case 64707:
a.errmsg="赞赏账户设置失效";
break;

case 67030:
a.errmsg="赞赏功能不可用";
break;

case 67028:
a.errmsg="非原创视频落地页不能开赞赏";
break;

case 64710:
a.errmsg="原创功能已被封禁不可设置付费图文，请切换为普通图文";
break;

case 202605:
a.errmsg="付费功能已被封禁不可设置付费图文，请切换为普通图文";
break;

case 420001:
a.errmsg="封面图不支持GIF，请更换";
break;

case 353004:
a.errmsg="不支持添加商品，请删除后重试";
break;

case 442001:
a.errmsg="帐号新建/编辑素材能力已被封禁，暂不可使用。";
break;

case 404001:
a.errmsg="系统繁忙，请稍后重试";
break;

case 404002:
a.errmsg="每个搜索组件最多添加6个搜索关键词";
break;

case 404003:
a.errmsg="每个搜索关键词最多16个字符";
break;

case 404004:
a.errmsg="系统繁忙，请稍后重试";
break;

case 404005:
a.errmsg="系统繁忙，请稍后重试";
break;

case 240021:
a.errmsg="文章中含有失效的地理位置，请删除或修改位置";
break;

case 500201:
a.errmsg="系统繁忙，请稍后重试";
break;

default:
a.errmsg="系统繁忙，请稍后重试";
}
return a;
}
function t(e,r,a,s,n){
if(n=n===!0?!0:!1,e===r)return 0!==e||1/e===1/r;
if(null==e||null==r)return e===r;
var m=Object.prototype.toString.call(e);
if(m!==Object.prototype.toString.call(r))return!1;
switch(m){
case"[object RegExp]":
case"[object String]":
return""+e==""+r;

case"[object Number]":
return+e!==+e?+r!==+r:0===+e?1/+e===1/r:+e===+r;

case"[object Date]":
case"[object Boolean]":
return+e===+r;
}
var g="[object Array]"===m;
if(!g&&("object"!=("undefined"==typeof e?"undefined":_typeof(e))||"object"!=("undefined"==typeof r?"undefined":_typeof(r))))return!1;
a=a||[],s=s||[];
for(var i=a.length;i--;)if(a[i]===e)return s[i]===r;
if(a.push(e),s.push(r),g){
if(i=e.length,i!==r.length)return!1;
for(;i--;)if(!t(e[i],r[i],a,s,n))return!1;
}else for(var b in e)if(e.hasOwnProperty(b)&&(n||l.eqWhiteKey[b])&&!(!n&&1*e.is_share_copyright==1&&l.shareCopyrightIgnoreKey.indexOf(","+b+",")>=0||"undefined"==typeof e[b]&&"undefined"==typeof r[b])){
var o=e[b],k=r[b];
if("cdn_url"==b?(o=o.http2https().replace(/\?$/,""),k=k.http2https().replace(/\?$/,"")):"content"==b&&(o=c(o),
k=c(k)),!r.hasOwnProperty(b)||!t(o,k,a,s,n))return!1;
}
return a.pop(),s.pop(),!0;
}
function c(e){
return UE&&(e=e.replace(UE.dom.domUtils.fillCharReg,"")),e=e.replace(/\s/g," "),
e=e.replace(/<br([^>]*?)>/g,""),e=e.replace('<span data-fillchar="1"></span>',""),
e=b.removeAttribute(e,[["*","class"],["*","scrolling"],["*","frameborder"],["*","data-(?:[^'\"\\s=<>]*?)"]]),
e=e.replace(/<img\s([^>]*?)>/g,function(e,r){
return"<img "+$.trim(r)+" />";
}),e=e.replace(/<input\s([^>]*?)>/g,function(e,r){
return"<input "+$.trim(r)+" />";
});
}
function n(e,r){
var e=(e||"0")+"",r=(r||"0")+"";
return e===r?"eq":e.length>r.length?"gt":e.length<r.length?"lt":e>r?"gt":"lt";
}
var m=/[\u2600-\u27BF]|[\u2B00-\u2BFF]|[\u3291-\u32B0]|[\uD83C\uD83D][\uDC00-\uDFFF]/,g=e("media/article_data_key.js"),i=e("biz_common/jquery.validate.js"),b=e("common/wx/mpEditor/plugin/filter.js"),o=i.rules,k=wx&&"3071959254"==wx.uin?1e5:5e4,u={},l={
eqWhiteKey:g.getCompareWhiteKey(),
shareCopyrightIgnoreKey:g.getShareArticleIgnoreKey()
};
return u.title=function(e){
var r=e.content||"",a=e.maxlen||64;
return o.rangelength(r,[0,a])?m.test(r)?{
msg:"%s中不能含有特殊字符".sprintf(e.label||"标题"),
errType:2
}:!0:{
msg:"%s长度不能超过%s字".sprintf(e.label||"标题",a),
errType:1
};
},u.titleStrict=function(e){
var r=e.content||"",a=e.maxlen||64;
return o.rangelength(r,[1,a])?m.test(r)?{
msg:"%s中不能含有特殊字符".sprintf(e.label||"标题"),
errType:2
}:!0:{
msg:"%s不能为空且长度不能超过%s字".sprintf(e.label||"标题",a),
errType:1
};
},u.templateContent=function(e){
var r=u.content(e);
if(r!==!0)return r;
var a=e.content||"";
return a?!0:{
msg:"正文必须有内容",
errType:100
};
},u.content=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.content||"",a=e.maxlen||1e7;
if(!o.rangelength(r,[0,a]))return{
msg:"正文总大小不得超过%sM字节".sprintf(a/1e6),
errType:1
};
var s=e.editor.fireEvent("getWordCountContent")||r.text();
if(!o.rangelength(s,[0,k]))return{
msg:"正文不能超过%s字，请删减部分内容后重试".sprintf(k),
errType:2
};
var t=$("<div>").html(r),c=e.editor.checkPlugins(t,e.articleData);
return c!==!0?{
msg:c&&c.msg?c.msg:"多媒体插件校验出错",
errType:4,
noTips:c&&c.noTips===!0?!0:!1
}:!0;
},u.contentStrict=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=e.content||"",a=r.text()||"",s=e.articleData&&e.articleData.is_cartoon_copyright?0:1;
if(s&&!a)return{
msg:"正文必须有文字，请在正文中至少输入1个汉字后重试",
errType:3
};
var t=e.editor.fireEvent("getWordCountContent")||a;
if(!o.rangelength(t,[s,k]))return{
msg:"正文不能超过%s字，请删减部分内容后重试".sprintf(k),
errType:2
};
var c=e.maxlen||1e7;
if(!o.rangelength(r,[s,c]))return{
msg:"正文总大小不得超过%sM字节".sprintf(c/1e6),
errType:1
};
var n=$("<div>").html(r),m=e.editor.checkPlugins(n,e);
return m!==!0?{
msg:m&&m.msg?m.msg:"多媒体插件校验出错",
errType:4,
noTips:m&&m.noTips===!0?!0:!1
}:!0;
},{
articleRetCode:s,
validate:r,
waitAsynAction:a,
eq:t,
dataSeqCompare:n
};
});