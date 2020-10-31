define("biz_web/lib/json.js",[],function(require,exports,module){
return"object"!=typeof JSON&&(JSON={}),function(){
"use strict";
function f(t){
return 10>t?"0"+t:t;
}
function quote(t){
return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){
var e=meta[t];
return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+t+'"';
}
function str(t,e){
var r,n,o,f,u,i=gap,p=e[t];
switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),"function"==typeof rep&&(p=rep.call(e,t,p)),
typeof p){
case"string":
return quote(p);

case"number":
return isFinite(p)?String(p):"null";

case"boolean":
case"null":
return String(p);

case"object":
if(!p)return"null";
if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){
for(f=p.length,r=0;f>r;r+=1)u[r]=str(r,p)||"null";
return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",
gap=i,o;
}
if(rep&&"object"==typeof rep)for(f=rep.length,r=0;f>r;r+=1)"string"==typeof rep[r]&&(n=rep[r],
o=str(n,p),o&&u.push(quote(n)+(gap?": ":":")+o));else for(n in p)Object.prototype.hasOwnProperty.call(p,n)&&(o=str(n,p),
o&&u.push(quote(n)+(gap?": ":":")+o));
return o=0===u.length?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",
gap=i,o;
}
}
"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){
return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null;
},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){
return this.valueOf();
});
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={
"\b":"\\b",
"	":"\\t",
"\n":"\\n",
"\f":"\\f",
"\r":"\\r",
'"':'\\"',
"\\":"\\\\"
},rep;
JSON.stringify2=function(t,e,r){
var n;
if(gap="",indent="","number"==typeof r)for(n=0;r>n;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);
if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");
return str("",{
"":t
});
},"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){
function walk(t,e){
var r,n,o=t[e];
if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),
void 0!==n?o[r]=n:delete o[r]);
return reviver.call(t,e,o);
}
var j;
if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){
return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),
"function"==typeof reviver?walk({
"":j
},""):j;
throw new SyntaxError("JSON.parse");
});
}(),JSON;
});define("common/wx/media/templateListDialog.js",["common/wx/popup.js","media/template_common.js","common/wx/Tips.js","common/wx/Cgi.js","tpl/media/templateListDialog.html.js","tpl/media/templateListContent.html.js","common/wx/pagebar.js"],function(t){
"use strict";
function e(t){
this._o={
token:"",
editor:null,
onSuccess:function(){}
},this._g={
perPage:4,
dom:{}
},this._extend(t),this.initDialog();
}
t("common/wx/popup.js");
var i=t("media/template_common.js"),o=t("common/wx/Tips.js"),a=(t("common/wx/Cgi.js"),
t("tpl/media/templateListDialog.html.js")),n=t("tpl/media/templateListContent.html.js"),s=t("common/wx/pagebar.js");
return e.prototype={
_extend:function(t){
if(t)for(var e in t)this._o[e]=t[e];
},
initDialog:function(){
var t=this,e=this._o,i=this._g,n=i.dom;
document.body.style.overflow="hidden",n.$dialog=$(wx.T(a,{
token:e.token||""
})).popup({
width:680,
title:"插入模版",
autoShow:!0,
className:"align_edge weui-desktop-appmsg-dialog appmsg_tmpl_select_dialog",
buttons:[{
text:"插入到正文",
type:"primary",
classWrap:"js_save_btn",
click:function(){
if(!i.selectedId)return void o.err("请选择图文模版");
var a=t.getSelectData();
e.onSuccess({
content:a?a.content:""
}),e.editor.fireEvent("reportAddNum","122333","84","1"),t.destory(this);
}
},{
text:"取消",
type:"default",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),n.$js_loading=n.$dialog.find(".js_loading"),n.$js_content=n.$dialog.find(".js_content"),
n.$js_pagebar=n.$dialog.find(".js_pagebar"),n.$dialog.find(".js_gomanage").on("click",function(){
e.editor.fireEvent("reportAddNum","122333","83","1");
}),this.getList({
page:0
});
},
showLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!0,e.$js_loading.show(),e.$js_content.hide(),e.$js_pagebar.hide();
},
checkDialogAlive:function(){
var t=this._g.dom;
return t&&t.$dialog?!0:!1;
},
hideLoading:function(){
var t=this._g,e=t.dom;
t.gettingData=!1,e.$js_loading.hide();
},
checkAccLoading:function(){
return this._g.gettingData;
},
getList:function(t){
var e=this,o=this._g;
e.checkAccLoading()!==!0&&(e.showLoading(),i.getTemplateList({
page:t.page,
perPage:o.perPage,
callback:function(t){
e.checkDialogAlive()&&(e.hideLoading(),e.renderContent(t));
}
}));
},
getSelectData:function(){
var t=this._g;
if(!t.selectedId)return null;
for(var e=0,i=t.curData.length;i>e;e++){
var o=t.curData[e];
if(o.appmsgid==t.selectedId)return o;
}
return null;
},
renderContent:function(t){
var e=this._g,o=e.dom;
o&&o.$dialog&&(0==t.code||t.msg?0!=t.code||t.list&&0!=t.list.length||t.msg||(t.msg="暂无数据"):t.msg="系统繁忙，请稍后再试",
e.curData=t.list||[],e.selectedId=void 0,i.formatTemplateData(e.curData,{
canPreview:!1,
showUpdateTime:!0,
showEdit:!1,
highLine:!1
}),o.$js_content.html(template.compile(n)({
list:e.curData,
msg:t.msg
})).show(),o.$js_loading.hide(),0==t.code&&t.total>0&&"undefined"!=typeof t.page?(this.initPageBar({
curPage:t.page+1,
total:t.total
}),o.$js_content.on("click",".js_appmsg",function(){
var t=$(this);
e.selectedId=t.data("id"),o.$js_content.find(".js_appmsg").removeClass("selected"),
t.addClass("selected");
})):o.$js_pagebar.hide(),o.$dialog.popup("resetPosition"));
},
initPageBar:function(t){
var e=this,i=this._g,o=i.dom;
i.myPagebar&&i.myPagebar.destroy(),i.myPagebar=new s({
container:o.$js_pagebar,
perPage:i.perPage,
initShowPage:t.curPage,
totalItemsNum:t.total,
first:!1,
last:!1,
isSimple:!0,
callback:function(t){
e.getList({
page:1*t.currentPage-1
});
}
});
},
destory:function(t){
t&&t.remove(),document.body.style.overflow="visible",this._g.dom=null;
}
},e;
});define("common/wx/mpEditor/plugin/pluginsManage.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/mpEditor/plugins_list_manage.js"],function(n){
"use strict";
function e(n){
this.domid=n.container,this.container=$(n.container).show(),this.listDomId=n.listDomId,
this.__g={
curList:wx.cgiData.pluginmgr_info.list,
pluginClassName:n.pluginClassName,
menuPluginClassName:n.menuPluginClassName,
foldToolbarEventName:n.foldToolbarEventName,
changeHideCount:0,
changeSortCount:0
};
}
var t=n("common/wx/Cgi.js"),i=n("common/wx/Tips.js"),o=n("common/wx/mpEditor/plugins_list_manage.js");
return e.prototype={
getName:function(){
return"pluginsmanage";
},
getContainer:function(){
return this.domid;
},
getType:function(){
return 0;
},
getExecCommand:function(){
var n=this;
return function(){
window.web2_eventBus.$emit("showPluginsManageDialog"),window.web2_eventBus.$on("showPluginsManageDialog_callback",function(e){
var t=e.type;
0===t||2===t?(n.__g.changeHideCount=e.changeHideCount,n.__g.changeSortCount=e.changeSortCount,
n.__changePlugins(e.list,n)):1===t&&n.__applyPlugins(e.list,n),(1===t||2===t)&&window.web2_eventBus.$off("showPluginsManageDialog_callback");
}),n.editor.fireEvent("reportAddNum","122443","26","1");
};
},
__applyPlugins:function(n,e){
if(!n)throw new Error("no newList");
var o=function(){
i.err("操作失败，请稍后再试"),e.__changePlugins(wx.cgiData.pluginmgr_info.list,e);
};
t.post({
url:wx.url("/cgi-bin/pluginmgr?action=manage"),
dataType:"json",
data:{
data:JSON.stringify({
list:n
})
},
mask:!1
},{
done:function(t){
return t.base_resp&&0===t.base_resp.ret?(i.suc("修改成功"),wx.cgiData.pluginmgr_info.list=n,
e.__g.changeHideCount&&e.editor.fireEvent("reportAddNum","122443","27",e.__g.changeHideCount),
void(e.__g.changeSortCount&&e.editor.fireEvent("reportAddNum","122443","28",e.__g.changeSortCount))):(o(),
!1);
},
fail:function(){
o();
}
});
},
__changePlugins:function(n,e){
if(!n)throw new Error("no newList");
for(var t=e.__g.curList,i=o.getEditorPluginsMap(t),a=0,s=0,r=n.length;r>s;s++){
var g=n[s],l=i[g.id],u=document.getElementById(l.domId),m=l.index;
if(m>a)a=m;else if(a>m){
var d=a===n.length-1?document.querySelector(this.domid):document.getElementById(i[t[a+1].id].domId);
d.parentElement.insertBefore(u,d);
var c=document.getElementById(e.listDomId);
u.parentElement.id!==e.listDomId&&"none"!==c.lastElementChild.style.display&&-1===u.className.indexOf(this.dropdownMenuItemClassName)&&(u.className=u.className.replace(this.__g.pluginClassName,this.__g.menuPluginClassName));
}
}
e.editor.fireEvent(this.__g.foldToolbarEventName,n),e.__g.curList=JSON.parse(JSON.stringify(n));
}
},e;
});define("common/wx/mpEditor/plugin/importFile.js",["common/wx/mpEditor/common/eventbus.js","3rd/editor/plugin/basePlugin.js","common/wx/Tips.js","common/wx/comm_report.js"],function(t){
"use strict";
var e=t("common/wx/mpEditor/common/eventbus.js"),n=t("3rd/editor/plugin/basePlugin.js"),i=t("common/wx/Tips.js"),o=t("common/wx/comm_report.js"),r=function(t){
var e=!1,n={
b:1,
code:1,
i:1,
u:1,
strike:1,
s:1,
tt:1,
strong:1,
q:1,
samp:1,
em:1,
span:1,
sub:1,
img:1,
sup:1,
font:1,
big:1,
small:1,
iframe:1,
a:1,
br:1,
pre:1
};
return t=t.replace(new RegExp("[\\r\\t\\n"+(e?"":" ")+"]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n"+(e?"":" ")+"]*","g"),function(t,i){
return i&&n[i.toLowerCase()]?t.replace(/(^[\n\r]+)|([\n\r]+$)/g,""):t.replace(new RegExp("^[\\r\\n"+(e?"":" ")+"]+"),"").replace(new RegExp("[\\r\\n"+(e?"":" ")+"]+$"),"");
});
},a=n.inherit({
init:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._o={
container:"",
can_use_importfile:!1
},this.initG(),n.prototype.init.call(this,t),t&&t.container&&t.can_use_importfile&&$(t.container).show();
},
initG:function(){
this._g={
app_id:"",
curSeq:-1,
event:{},
editorSelector:"#js_appmsg_editor"
};
},
getName:function(){
return"importfile";
},
getContainer:function(){
return this._o.container;
},
getExecCommand:function(){
var t=this;
return function(){
if(t._o.can_use_importfile){
var n=t.editor,o=t;
if(n){
var a=n.fireEvent("get_current_article");
a=a.data?a.data("article"):null;
var p=void 0,u=void 0;
a&&a._o&&(p=a._o.index?parseInt(a._o.index,10):0,u=a._o.app_id?parseInt(a._o.app_id):0);
var m=u?{
ActionType:0,
AppMsgId:u,
AppMsgIndex:p
}:{
ActionType:0
};
c(m),e.fireEvent("showImportFileDialog",{
appidx:p,
appid:u
},function(t){
t&&(t.content&&n.setContent({
content:r(t.content),
isAppendTo:!1,
noFormat:!0,
forceUpload:!0
}),t.title&&""!==t.title&&(s($(o._g.editorSelector),t.title),n.fireEvent("setCurrentAritleTitle",t.title)),
n.resetCursorBegin(),n.fireEvent("scrollIntoView",$("#editor_pannel"),131),i.suc("已完成导入"));
});
}
}
};
},
beforeSetContent:function(t){
return t;
},
initPluginData:function(){},
getPluginData:function(){}
}),s=function(t,e){
e=e.html(!1),e.length>64&&(e=e.substr(0,64));
var n=t.find(".js_title");
if(n.length>0){
var i=n[0];
i.value=e;
}
},c=function(t){
o.report(20036,t);
};
return a.beforeSetContent=function(t){
return t.html?t.html:"";
},a;
});define("common/wx/mpEditor/plugin/insertsearch.js",["3rd/editor/common/domUtils.js","3rd/editor/plugin/basePlugin.js","common/wx/mpEditor/common/eventbus.js","3rd/editor/common/no_editable.js","common/wx/Tips.js","tpl/mpEditor/plugin/search.html.js"],function(e){
"use strict";
var t=(e("3rd/editor/common/domUtils.js"),e("3rd/editor/plugin/basePlugin.js")),a=e("common/wx/mpEditor/common/eventbus.js"),r=e("3rd/editor/common/no_editable.js"),n=e("common/wx/Tips.js"),i=e("tpl/mpEditor/plugin/search.html.js"),o={
avatar:window.wx.cgiData.head_img,
nickname:window.wx.cgiData.nickname,
complieTpl:template.compile(i),
wapClass:"js_wap_mpsearch",
saveTag:"mpsearch",
queryCardClass:"js_mpsearch",
frameClass:"appmsg_search_iframe res_iframe",
cardTag:"section",
errTypeAttr:"data-errortype",
maxLen:1,
overMaxWording:"每篇图文最多插入一个搜索组件"
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return o.complieTpl({
avatar:o.avatar,
nickname:o.nickname,
keywords:e.keywords
}).replace(/>\s*</g,"><");
},d=t.inherit({
init:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._o={
container:"",
can_use_mpsearch:!1,
can_show_reddot:!1,
remove:!1
},this.initG(),t.prototype.init.call(this,e),this._o.can_use_mpsearch||(this._o.container=""),
this._o.container&&$(this._o.container).show(),this.info=e.info;
},
initG:function(){
this._g={
app_id:"",
curSeq:-1,
focusErrData:null,
event:{}
};
},
getName:function(){
return"insertsearch";
},
getContainer:function(){
return this._o.container;
},
getExecCommand:function(){
var e=this;
return function(){
if(e._o.can_use_mpsearch){
var t=e.getCard({
$container:$(e.editor.ueditor.body)
});
if(t.length>=o.maxLen)return void n.err(o.overMaxWording);
var r=[];
t.each(function(){
var t=decodeURIComponent(e.getAttribute("data-keywords")||"");
t&&(r=t);
}),a.fireEvent("showInsertSearchDialog",{
appmsgid:e._g.app_id,
scene:"editor",
nickname:o.nickname,
inserteddata:r
},function(t){
t&&e.insertCard({
data:t
});
});
}
};
},
beforeSetContent:function(e){
var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];
if(e){
if(this._g.curSeq=1*t.seq,this._o.remove){
var a=$("<div></div>").html(e);
a.find(o.saveTag).remove(),e=a.html();
}
return d.beforeSetContent({
html:e
});
}
},
afterSetContent:function(){
var e=this,t=this;
this.editor.addListener("noEditableClick",function(){
var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
if(r.unEditableDom){
var n=$(r.unEditableDom),i=$(r.target);
if(n.hasClass(o.queryCardClass)&&!i.hasClass(o.queryCardClass)){
var d=[],m=[];
try{
m=JSON.parse(decodeURIComponent(n.attr("data-keywords")||""));
}catch(c){}
m.length&&(d=m),a.fireEvent("showInsertSearchDialog",{
appmsgid:e._g.app_id,
scene:"editor",
nickname:o.nickname,
inserteddata:d
},function(e){
if(e){
var t=s({
keywords:e
});
n.attr("data-keywords",encodeURIComponent(JSON.stringify(e))).html(t);
}
});
}else n.hasClass(o.queryCardClass)&&(r.e.offsetX<n[0].clientWidth/2?t.editor.getSelectionRange().setStartBefore(r.unEditableDom).setEndBefore(r.unEditableDom).select():t.editor.getSelectionRange().setStartAfter(r.unEditableDom).setEndAfter(r.unEditableDom).select());
}
});
},
getPluginData:function(e){
var t=e.init(),a=t.get("content");
if(a){
var r=$("<div></div>").html(a);
this.changeCardToTag({
$dom:r
}),t.set("content",r.html());
}
return t;
},
addListener:function(e){
var t=this;
e.addListener("beforepaste",function(e,a){
var r=$("<div></div>").html(a.html);
t.getCard({
$container:r
}).remove(),r.find(o.saveTag).remove(),r.find("."+o.wapClass).remove(),a.html=r.html();
});
},
getCardHtml:function(e){
var t=["<"+o.cardTag+"><"+o.cardTag+' class="'+o.queryCardClass+" "+o.frameClass+'"',' data-keywords="'+encodeURIComponent(JSON.stringify(e))+'"',' data-w="286" data-ratio="1.5664335664335665"',' data-parentclass="appmsg_search_iframe_wrp"',">",s({
keywords:e
}),"</"+o.cardTag+"></"+o.cardTag+">"].join(""),a=$("<div></div>").html(t);
return r.setDisable({
dom:a[0].firstChild.firstChild
}),a.html();
},
insertCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
r.insertHtml({
html:this.getCardHtml(e.data),
editor:this.editor
});
},
getCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t="";
return e.coverUri&&(t='[data-coveruri="'+encodeURIComponent(e.coverUri)+'"]'),e.$container.find(o.cardTag+"."+o.queryCardClass+t);
},
getErrCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return e.$container.find(o.cardTag+"."+o.queryCardClass+"["+o.errTypeAttr+"]");
},
changeCardToTag:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return this.getCard({
$container:e.$dom
}).replaceTagName(o.saveTag).html("");
}
}),m=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.$dom.find(o.saveTag).each(function(e,t){
var a=$(t),n=a.replaceTagName(o.cardTag).addClass(o.queryCardClass+" "+o.frameClass),i=JSON.parse(decodeURIComponent(n.attr("data-keywords")||""));
n.html(s({
keywords:i
})),r.setDisable({
dom:n[0]
});
});
};
return d.beforeSetContent=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!e.html)return"";
var t=$("<div></div>").html(e.html);
return m({
$dom:t
}),t.html();
},d;
});define("common/wx/mpEditor/plugin/redPacketCover.js",["3rd/editor/common/domUtils.js","3rd/editor/plugin/basePlugin.js","common/wx/mpEditor/common/eventbus.js","3rd/editor/common/no_editable.js","common/wx/Tips.js","tpl/mpEditor/plugin/red_package_cover.html.js"],function(e){
"use strict";
var t=e("3rd/editor/common/domUtils.js"),r=e("3rd/editor/plugin/basePlugin.js"),a=e("common/wx/mpEditor/common/eventbus.js"),n=e("3rd/editor/common/no_editable.js"),o=e("common/wx/Tips.js"),i=e("tpl/mpEditor/plugin/red_package_cover.html.js"),d={
complieTpl:template.compile(i),
wapClass:"js_wap_redpacketcover",
saveTag:"redpacketcover",
queryCardClass:"js_redpacketcover",
frameClass:"redpackage_iframe",
cardTag:"section",
errTypeAttr:"data-errortype",
maxLen:3,
overMaxWording:"每篇图文最多插入三款红包封面"
},s=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return d.complieTpl({
img:e.img,
name:e.name,
errorType:e.errorType
}).replace(/>\s*</g,"><");
},c=r.inherit({
init:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._o={
container:"",
can_show_reddot:!1,
can_use_redpacketcover:!1,
remove:!1
},this.initG(),r.prototype.init.call(this,e),this._o.can_use_redpacketcover||(this._o.container=""),
this._o.container&&$(this._o.container).show(),this.info=e.info;
},
initG:function(){
this._g={
app_id:"",
curSeq:-1,
focusErrData:null,
event:{}
};
},
getName:function(){
return"redpacketcover";
},
getContainer:function(){
return this._o.container;
},
getExecCommand:function(){
var e=this;
return function(){
if(e._o.can_use_redpacketcover){
var t=e.getCard({
$container:$(this.body)
});
if(t.length>=d.maxLen)return void o.err(d.overMaxWording);
var r=[];
t.each(function(){
var e=decodeURIComponent(this.getAttribute("data-orderid")||"");
e&&r.push({
order_id:e
});
}),a.fireEvent("showRedPackageCoverDialog",{
appmsgid:e._g.app_id,
scene:"editor",
type:"select",
inserteddata:r
},function(t){
t&&e.insertCard({
data:t
});
});
}
};
},
beforeSetContent:function(e){
var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];
if(e){
if(this._g.curSeq=1*t.seq,this._o.remove){
var r=$("<div></div>").html(e);
r.find(d.saveTag).remove(),e=r.html();
}
return c.beforeSetContent({
html:e
});
}
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
if(r){
var a=$("<div></div>").html(r);
this.changeCardToTag({
$dom:a
}),t.set("content",a.html());
}
return t;
},
addListener:function(e){
var t=this;
e.addListener("beforepaste",function(e,r){
var a=$("<div></div>").html(r.html);
t.getCard({
$container:a
}).remove(),a.find(d.saveTag).remove(),a.find("."+d.wapClass).remove(),r.html=a.html();
}),e.addListener("showRedPackageCoverDialog",function(){
var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
a.fireEvent("showRedPackageCoverDialog",{
appmsgid:t._g.app_id,
scene:"editor",
type:"warn",
warnfocustype:"callback",
item:r.errorData
},function(t){
t&&e.fireEvent("redPacketCoverCheckResultFocus",{
errorData:t.errorData,
focusData:t.focusData
});
});
}),e.addListener("redPacketCoverCheckResultFocus",function(){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],r=e.errorData,a=e.focusData;
this.fireEvent("saveScene");
for(var n={},o=!1,i=0,s=r.length;s>i;i++){
var c=r[i];
n[c.appmsg_idx]||(n[c.appmsg_idx]={}),n[c.appmsg_idx][c.cover_uri]=c,1*c.appmsg_idx!==1*t._g.curSeq&&(o=!0);
}
var m=null;
o&&(m=t.getArticleObject());
var g=null;
for(var i in n)if(Object.prototype.hasOwnProperty.call(n,i)){
var c=n[i];
if(1*i===1*t._g.curSeq){
var u=null;
a&&1*a.appmsg_idx===1*t._g.curSeq&&(u=a);
var v=t.setError({
tagName:d.cardTag,
$dom:$(this.body),
data:c,
focusData:u
});
!g&&u&&v&&v.$focusDom&&v.$focusDom.length>0&&(g=v.$focusDom);
}else if(m&&m[i]){
var l=$("<div></div>").html(m[i].data.get("content"));
t.setError({
tagName:d.saveTag,
$dom:l,
data:c
}),m[i].data.set("content",l.html());
}
}
if(a)if(g)this.fireEvent("scrollIntoView",g);else{
this.fireEvent("selectArticle",{
idx:a.appmsg_idx,
doNotHideErr:!0,
doNotScroll:!0,
isNewCreate:!1,
markInited:!1
});
var p=t.getCard({
$container:$(this.body),
coverUri:a.cover_uri
});
p&&p.length>0&&this.fireEvent("scrollIntoView",p);
}
this.fireEvent("saveScene");
});
},
setError:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t={
$focusDom:null
};
return e.$dom.find(e.tagName+"."+d.queryCardClass).each(function(){
var r=$(this),a=decodeURIComponent(r.attr("data-coveruri")||"");
if(e.focusData&&e.focusData.cover_uri===a&&!t.$focusDom&&(t.$focusDom=r),e.data[a]){
var n=e.data[a].status;
r.attr(d.errTypeAttr,n).html(s({
img:decodeURIComponent(r.attr("data-receiveimg")||""),
name:decodeURIComponent(r.attr("data-name")||""),
errorType:n
}));
}
}),t;
},
getCardHtml:function(e){
var r=["<"+d.cardTag+"><"+d.cardTag+' class="'+d.queryCardClass+" "+d.frameClass+'"',' data-coveruri="'+encodeURIComponent(e.cover_uri)+'"',' data-bizuin="'+encodeURIComponent(wx.commonData.uin||"")+'"',' data-receiveimg="'+encodeURIComponent(e.receive_image)+'"',' data-name="'+encodeURIComponent(e.name)+'"'," "+t.pluginAttr+'="'+encodeURIComponent(this.getName())+'"',' data-orderid="'+encodeURIComponent(e.order_id)+'"',' data-w="286" data-ratio="1.5664335664335665"',">",s({
img:e.receive_image,
name:e.name
}),"</"+d.cardTag+"></"+d.cardTag+">"].join(""),a=$("<div></div>").html(r);
return n.setDisable({
dom:a[0].firstChild.firstChild
}),a.html();
},
insertCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
n.insertHtml({
html:this.getCardHtml(e.data),
editor:this.editor
});
},
getCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t="";
return e.coverUri&&(t='[data-coveruri="'+encodeURIComponent(e.coverUri)+'"]'),e.$container.find(d.cardTag+"."+d.queryCardClass+t);
},
getErrCard:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return e.$container.find(d.cardTag+"."+d.queryCardClass+"["+d.errTypeAttr+"]");
},
check:function(e){
return e.find(d.saveTag).length>d.maxLen?{
msg:d.overMaxWording
}:!0;
},
changeCardToTag:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return this.getCard({
$container:e.$dom
}).replaceTagName(d.saveTag).html("");
}
}),m=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
e.$dom.find(d.saveTag).each(function(){
var e=$(this),t=e.attr(d.errTypeAttr)||"",r=e.replaceTagName(d.cardTag).addClass(d.queryCardClass+" "+d.frameClass),a=decodeURIComponent(r.attr("data-name")||""),o=decodeURIComponent(r.attr("data-receiveimg")||"");
r.html(s({
name:a,
img:o,
errorType:t
})),n.setDisable({
dom:r[0]
});
});
};
return c.beforeSetContent=function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!e.html)return"";
var t=$("<div></div>").html(e.html);
return m({
$dom:t
}),t.html();
},c;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/wx/mpEditor/plugin/blockquote.js",["common/wx/Tips.js","common/wx/mpEditor/plugin/basePlugin.js","common/wx/mpEditor/common/eventbus.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/blockquote.html.js","tpl/mpEditor/plugin/blockquote_source.html.js","tpl/mpEditor/plugin/blockquote_tips.html.js","tpl/mpEditor/plugin/blockquote_popup.html.js"],function(e){
"use strict";
var t=e("common/wx/Tips.js"),r=e("common/wx/mpEditor/plugin/basePlugin.js"),o=e("common/wx/mpEditor/common/eventbus.js"),i=e("common/wx/mpEditor/utils.js"),n=function(e){
return e.replace(/>\s*</g,"><").replace(/>\s*{/g,">{").replace(/}\s*</g,"}<").replace(/}\s*{/g,"}{");
},a=n(e("tpl/mpEditor/plugin/blockquote.html.js")),c=n(e("tpl/mpEditor/plugin/blockquote_source.html.js")),s=n(e("tpl/mpEditor/plugin/blockquote_tips.html.js")),l=e("tpl/mpEditor/plugin/blockquote_popup.html.js"),u={
canUseWhenBlockquote:{
undo:1,
redo:1,
inserthtml:1,
fontsize:1,
blockquote:1,
horizontal:1,
removeformat:1,
formatmatch:1,
link:1,
unlink:1,
bold:1,
italic:1,
underline:1,
strikethrough:1,
forecolor:1,
backcolor:1,
indent:1,
justifyleft:1,
justifyright:1,
justifycenter:1,
justifyjustify:1,
justifyindent:1,
rowspacingbottom:1,
rowspacingtop:1,
lineheight:1,
letterspacing:1,
insertorderedlist:1,
insertunorderedlist:1
},
checkFail:!1,
sourceIframe:{
uid:"insert_blockquote_source_iframe_ready",
className:"blockquote_iframe js_blockquote_source"
},
tipsIframe:{
uid:"insert_blockquote_tips_iframe_ready",
className:"blockquote_tips_iframe js_blockquote_tips"
},
hasReportOverSize:!1
};
["sourceIframe","tipsIframe"].forEach(function(e){
var t=u[e],r=t.className.split(" ")[1];
t.domRegexp=new RegExp("<section[^<]*?"+r+".*?</section>","g"),t.iframeRegexp=new RegExp("<iframe[^<]*?"+r+".*?</iframe>","g");
});
var p=r.inherit({
init:function(e){
this._o={},this.extend(this._o,e),this.bindEventInterface({}),this.unbindEventInterface({}),
this.unbindSpecifyEvent({});
},
getName:function(){
return"blockquote";
},
getType:function(){
return 1;
},
getTitle:function(){
return"引用";
},
addListener:function(){
var e=this;
this.domUtils=this.editor.getDomUtils(),e.createIframeReadyFunc("source"),e.createIframeReadyFunc("tips"),
e.editor.addListener("ready",function(){
var t=this.queryCommandState;
this.queryCommandState=function(r,o){
var i=e.getName();
if(r===i&&o&&o.allDomInRange&&o.allDomInRange[0]&&2===e.domUtils.isContentEditable({
node:o.allDomInRange[0],
checkParent:!1
}))return-1;
var n=this.queryCommandValue("blockquote");
if(this.selection&&n){
var a=r.toLowerCase();
if("blockquote_tips"===n.type||"blockquote_source"===n.type)return-1;
if("blockquote"===n.type&&!u.canUseWhenBlockquote[a]&&!u.canUseWhenBlockquote[a+(o?o.toString():"")])return-1;
if(r===i)return 1;
}else if(r===i)return 0;
return t.apply(this,arguments);
};
}),e.editor.addListener("keydown",function(t,r){
var o=e.getSelectionDom(this.selection),i=o.dom,n=o.rng;
if(i&&1===i.nodeType){
var a=i.getAttribute("class");
if(a&&(a.indexOf("js_blockquote_source")>=0||a.indexOf("js_blockquote_digest")>=0)){
var c=r.keyCode||r.which;
if(13===c){
var s=e.getBlockquoteBlockDom(i);
return s.insertAdjacentHTML("afterend","<p><br></p>"),n.selectNodeContents(s.nextElementSibling).select(),
r.preventDefault(),!0;
}
if(37!==c&&38!==c&&39!==c&&40!==c)return r.preventDefault(),!0;
}else if(a&&a.indexOf("js_blockquote_tips")>=0){
var c=r.keyCode||r.which;
return 37!==c&&38!==c&&39!==c&&40!==c&&r.preventDefault(),!0;
}
}
}),e.editor.addListener("keyup",function(t,r){
var o=this.selection.getRange(),i=e.getBlockquoteDigestDom(o.startContainer);
if(i){
var n=r.keyCode||r.which;
if(65===n&&(r.ctrlKey||r.metaKey))e.handleSelectAll(r,o,i);else if(8===n||46===n){
var a=e.editor.getDocument().body,c=e.fixSourceIframe(a.innerHTML),s=c.content,l=c.hasFix;
l&&(a.innerHTML=s),e.validate(i.parentNode);
}else e.validate(i.parentNode);
}
}),e.editor.addListener("beforepaste",function(t,r){
var o=this.selection.getRange(),i=e.getBlockquoteDigestDom(o.startContainer);
r.html=i?e.filterDigest(r.html,!0):r.html.replace(/<iframe[^>]*?js_blockquote_source([^>]*?)>.*?<\/iframe>/g,function(t){
return e.createLocalIframe("source",t.match(/ data-json="([^"]*?)"/)[1]);
});
}),e.editor.addListener("handle_common_popup",function(t,r){
if(!(r.data&&r.data.length>0)){
var o=this.queryCommandValue("blockquote");
if(o&&("blockquote"===o.type||"blockquote_source"===o.type)){
var i=e.getBlockquoteBlockDom(o.dom);
if(i){
var n=i.getElementsByClassName("js_blockquote_digest");
if(n.length&&"string"==typeof n[0].textContent){
var a={
needBreak:!!r.data.length>0?!0:!1,
text:n[0].textContent.replace(/\s/g,"")
};
r.data.push({
html:wx.T(l,a),
renderData:a,
cmd:e.getName(),
node:i
}),r.size={
width:214
},r.pos="bottomleft";
}
}
}
}
}),e.editor.addListener("afterArticleSelect",function(){
if(u.checkFail){
u.checkFail=!1;
for(var r=$(e.editor.getDocument()).find(".js_blockquote_wrap"),o=-1,i=0,n=r.length;n>i;i++)e.validate(r[i])||-1!==o||(o=i);
e.editor.fireEvent("scrollIntoView",$(r[o].previousElementSibling),0),t.err("单次引用不得超过300字，避免不合理引用");
}
});
},
getExecCommand:function(){
var e=this;
return function(t,r){
var i=this;
if(e.editor){
var n=this.selection,c=n.getRange(),s=n.getText(),l=e.getBlockquoteBlockDom(c.startContainer);
if(!r&&l){
var p=l.parentNode,d=e.getTipsDom(l);
d&&p.removeChild(d);
var m=l.getAttribute("class");
if(m&&m.indexOf("js_blockquote_wrap")>=0){
var f=l.getElementsByClassName("js_blockquote_digest")[0];
if(1===f.children.length&&"P"===f.children[0].nodeName){
var g=function(){
var e=[];
return Array.prototype.forEach.call(f.children[0].children,function(t){
1===t.nodeType&&"BR"!==t.nodeName&&e.push(t);
}),1===e.length&&"IFRAME"===e[0].nodeName&&f.children[0].children[0].className.indexOf("js_blockquote_source")>=0?(p.removeChild(l),
{
v:void 0
}):void 0;
}();
if("object"===("undefined"==typeof g?"undefined":_typeof(g)))return g.v;
}
for(var h=this.document.createDocumentFragment();f.firstChild;)h.appendChild(f.firstChild);
p.replaceChild(h,l);
}else{
for(var h=this.document.createDocumentFragment();l.firstChild;)h.appendChild(l.firstChild);
p.replaceChild(h,l);
}
}else{
var v={
text:r||s,
hasReportOverSize:u.hasReportOverSize
};
r&&(v.dataset=JSON.parse(JSON.stringify(l.dataset))),o.fireEvent("showBlockquoteDialog",v,function(t){
if(t){
if(t.editorReportData&&t.editorReportData.length>0&&i.fireEvent("reportAddNum",t.editorReportData),
void 0===t.type)return void(u.hasReportOverSize=t.hasReportOverSize);
t.sourceDom="out"===t.type&&""===t.from?"":e.createLocalIframe("source",t);
var r=wx.T(a,t);
if(l){
var o=l.getElementsByClassName("js_blockquote_digest")[0];
l.insertAdjacentHTML("beforebegin",r);
var n=l.previousElementSibling;
n.replaceChild(o,n.getElementsByClassName("js_blockquote_digest")[0]),l.parentNode.removeChild(l);
}else{
if(""!==t.text){
var s=i.document.createElement("div");
s.innerHTML=r;
var o=s.getElementsByClassName("js_blockquote_digest")[0],p=c.extractContents(),d=i.document.createElement("section");
0===p.children.length?(o.appendChild(p),d.textContent=o.textContent,o.innerHTML=""):d.appendChild(p),
o.appendChild(d),r=s.innerHTML;
var m=t.text.length;
m>300&&(r=e.createLocalIframe("tips",{
len:m
})+r);
}
i.execCommand("inserthtml",e.filterDigest(r)+"<p><br></p>",!0);
}
return!0;
}
});
}
}
};
},
getQueryCommandValue:function(){
var e=this;
return function(){
var t=e.editor;
if(t){
var r=e.getSelectionDom(this.selection),o=r.dom;
if(o){
var i=void 0;
return 1===o.nodeType&&(i=o.getAttribute("class")),i&&i.indexOf("js_blockquote_source")>=0?{
type:"blockquote_source",
dom:o
}:i&&i.indexOf("js_blockquote_tips")>=0?{
type:"blockquote_tips",
dom:o
}:(o=e.getBlockquoteBlockDom(o),o?{
type:"blockquote",
dom:o
}:void 0);
}
}
};
},
check:function(e){
for(var t=e.find(".js_blockquote_wrap"),r=!0,o=0,i=t.length;r&&i>o;o++)this.validate(t[o],!0)||(r=!1);
return r||(u.checkFail=!0),r;
},
beforeSetContent:function(e){
return this.iframeSwitcher(e,"iframe");
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
r&&t.set("content",this.iframeSwitcher(r,"dom"));
},
validate:function(e,t){
var r=e.getElementsByClassName("js_blockquote_digest");
if(r.length){
var o=r[0].innerText.replace(/\s/g,"").length;
if(t||(e.dataset.contentUtf8Length=o),o>300){
if(!t){
var i=this.getTipsDom(e);
if(i){
var n=i.children[0].contentDocument;
if(n){
var a=n.getElementById("js_blockquote_tips_len");
a&&(a.innerHTML=o);
}
}else e.insertAdjacentHTML("beforebegin",this.createLocalIframe("tips",{
len:o
}));
}
return u.hasReportOverSize||(this.editor.fireEvent("reportAddNum",69271,37,1),u.hasReportOverSize=!0),
!1;
}
if(!t){
var i=this.getTipsDom(e);
i&&i.parentNode.removeChild(i);
}
}
return!0;
},
handleSelectAll:function(e,t,r){
for(;1===r.children.length&&1===r.firstChild.nodeType&&"SECTION"===r.firstChild.nodeName;)r=r.firstChild;
var o=r.firstChild,i=r.lastChild,n=function(e,t){
for(var r=t;r[e];)r=r[e];
return r;
};
if(o&&i&&o.nodeName.toLowerCase()===i.nodeName.toLowerCase()){
var a=n("firstChild",o),c=n("lastChild",i);
if(a&&c)return t.setStartBefore(a),t.setEndAfter(c),t.select(),e.preventDefault(),
!0;
}
},
getIframeFuncUid:function(){
var e=arguments.length<=0||void 0===arguments[0]?"source":arguments[0];
return u[e+"Iframe"].uid+"_"+this.editor.getUeditor().uid;
},
createIframeReadyFunc:function(e){
i.createIframeReadyFunc({
uid:this.getIframeFuncUid(e),
force:!0,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(){
return function(t){
var r=t.iframe?wx.T("source"===e?c:s,JSON.parse(decodeURIComponent(t.iframe.getAttribute("data-json")))):"";
r&&(t.doc.head.innerHTML+=$("#blockquote_iframe_css").html(),t.doc.body.innerHTML=r,
"source"===e&&!function(){
var e=setInterval(function(){
var r=t.doc.getElementsByClassName("js_blockquote_source");
if(r.length)if(t.iframe&&t.iframe.contentWindow){
var o=t.iframe.contentWindow.getComputedStyle(r[0]);
"0px"!==o.getPropertyValue("margin-top")&&(t.iframe.style.height=parseInt(o.getPropertyValue("margin-top"))+parseInt(o.getPropertyValue("height"))+"px",
clearInterval(e),e=null);
}else clearInterval(e),e=null;
},200);
}());
};
}()
});
},
createLocalIframe:function(){
var e=arguments.length<=0||void 0===arguments[0]?"source":arguments[0],t=arguments[1];
"object"===("undefined"==typeof t?"undefined":_typeof(t))&&(t=encodeURIComponent(JSON.stringify(t)));
var r=function(e,r){
return i.createLocalIframe({
noSrc:!1,
uid:e,
attr:{
"data-json":t,
"class":r
}
});
}(this.getIframeFuncUid(e),u[e+"Iframe"].className);
return"tips"===e&&(r='<p class="js_blockquote_tips_p">'+r+"</p>"),r;
},
iframeSwitcher:function(e,t){
var r=this;
return"iframe"===t?e.replace(u.sourceIframe.domRegexp,function(e){
return r.createLocalIframe("source",e.match(/ data-json="([^"]*?)"/)[1]);
}):this.fixSourceIframe(e).content.replace(u.sourceIframe.iframeRegexp,function(e){
var t=e.match(/ data-json="([^"]*?)"/)[1],r=JSON.parse(decodeURIComponent(t));
return r.json=t,wx.T(c,r);
});
},
fixSourceIframe:function(e){
var t=!1;
return e=e.replace(/((<p>)?(<iframe[^<]*?js_blockquote_source.*?<\/iframe>)(<br>)*(<\/p>)?)(<\/section>)/g,function(e,r,o,i,n,a,c){
return t=!0,c+i;
}),{
content:e,
hasFix:t
};
},
getBlockquoteBlockDom:function(e){
return this.getDom(e,function(e){
var t=e.getAttribute("class");
return t&&t.indexOf("js_blockquote_wrap")>=0||"BLOCKQUOTE"===e.nodeName?!0:!1;
});
},
getBlockquoteDigestDom:function(e){
return this.getDom(e,function(e){
var t=e.getAttribute("class");
return t&&t.indexOf("js_blockquote_digest")>=0?!0:!1;
});
},
getDom:function(e,t){
var r=e;
if(!e)return r;
for(;r&&(1!==r.nodeType||!t(r));)r=r.parentNode;
return r;
},
getSelectionDom:function(e){
var t=e.getRange(),r=t.startContainer,o={
dom:null,
rng:t
};
if(r){
var i=r.nodeType;
if(1===i){
var n=r.childNodes;
o.dom=n[Math.max(0,t.startOffset-1)]||null;
}else 3===i&&(o.dom=r.parentNode);
}
return o;
},
getTipsDom:function(e){
var t=e.previousElementSibling;
return t&&t.className.indexOf("js_blockquote_tips_p")>=0?t:null;
},
filterDigest:function(e,t){
return e.replace(/<img[^>]*>/g,"<p>[图片]</p>").replace(/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"[^\"]*?\"[^>]*?><\/iframe>/gi,"<p>[卡券]</p>").replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<p>[音频]</p>").replace(/<iframe([^>]*?)js_editor_audio([^>]*?)><\/iframe>/g,"<p>[音频]</p>").replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<p>[音乐]</p>").replace(/<iframe([^>]*?)js_editor_qqmusic([^>]*?)><\/iframe>/g,"<p>[音乐]</p>").replace(/<mpgongyi([^>]*?)js_editor_gy([^>]*?)><\/mpgongyi>/g,"<p>[公益]</p>").replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g,"<p>[小店]</p>").replace(/<iframe([^>]*?)class=[\'\"][^\'\"]*video_iframe([^>]*?)><\/iframe>/g,"<p>[视频]</p>").replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi,"<p>[投票]</p>").replace(/<iframe[^>]*?js_editor_product[^<]*?<\/iframe>/g,"<p>[商品]</p>").replace(/<iframe[^>]*?js_editor_cps[^<]*?<\/iframe>/g,"<p>[商品]</p>").replace(/<iframe[^>]*?js_cpc_area[^<]*?<\/iframe>/g,"<p>[广告]</p>").replace(/<mp-weapp([^>]*?)weapp_element([^>]*?)><\/mp-weapp>/g,"<p>[小程序]</p>").replace(/<a([^>]*?)weapp_text_link([^>]*?)>.*?<\/a>/g,"<p>[小程序]</p>").replace(/<a([^>]*?)weapp_image_link([^>]*?)>.*?<\/a>/g,"<p>[小程序]</p>").replace(/<iframe([^>]*?)js_editor_weapp([^>]*?)><\/iframe>/g,"<p>[小程序]</p>").replace(/<pre[^>]*?code-snippet([^>]*?)>.*?<\/pre>/g,"<p>[代码]</p>").replace(new RegExp((t?"":"(?!^)")+"<blockquote[^>]*?js_blockquote_wrap([^>]*?)>.*?</blockquote>"+(t?"":"(?!$)"),"g"),"<p>[引用]</p>");
}
});
return p.beforeSetContent=function(e){
return e.html;
},p.afterSetContent=function(){},p;
});define("common/wx/mpEditor/plugin/insertcode.js",[],function(){
"use strict";
var e=function(){};
return e.beforeSetContent=function(e){
if(!e||!e.html)return"";
var t=$("<div></div>").html(e.html),i="pre",n="code-snippet__js",r="code-snippet code-snippet_nowrap",o="code-snippet__fix",d="ul",s="code-snippet__line-index",c=[];
t.find(i+"."+n).each(function(){
this.removeAttribute("style"),this.setAttribute("class",n+" "+r),c.push({
codeBlock:this
});
});
for(var p=0,f=c.length;f>p;p++){
var a=c[p].codeBlock,h=a.parentNode,l=h?h.getAttribute("class"):"";
h.parentNode&&l&&(l.indexOf(n)>=0||l.indexOf(o)>=0)&&(h.parentNode.insertBefore(a,h),
h.parentNode.removeChild(h));
}
return t.find(d).each(function(){
var e=this.getAttribute("class")||"";
e&&(e.indexOf(n)>=0||e.indexOf(s)>=0)&&this.parentNode.removeChild(this);
}),t.html();
},e;
});define("common/wx/mpEditor/plugin/cps.js",["common/wx/dialog.js","common/wx/Cgi.js","common/wx/mpEditor/common/eventbus.js","common/wx/media/cpsTemplateDialog.js","common/wx/media/cpsUtils.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/cps_template_popup.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(){
_.mpcpsReg=new RegExp("<mpcps([^>]*?)"+_.className+"([^>]*?)><\\/mpcps>","g"),_.mpcpsRegReplace="<iframe $1"+_.className+"$2></iframe>",
_.iframeReg=new RegExp("<iframe([^>]*?)"+_.className+"([^>]*?)><\\/iframe>","g"),
_.iframeRegReplace="<mpcps $1"+_.className+"$2></mpcps>";
}
function i(e){
return e.find("iframe."+_.className).remove(),e.find("mpcps").remove(),e.find("."+h.appmsgContainerClass).remove(),
e.find("."+h.appmsgLoopClass).remove(),e.find("."+h.appmsgProductErrClass).remove(),
e.find("section").each(function(){
this.firstChild||this.style.cssText||$(this).remove();
}),e;
}
function r(){
if(_.hasTemplateData&&0!=_.updateCpsDataStatus){
for(var e=0,t=_.afterTemplateQueue.length;t>e;e++){
var i=_.afterTemplateQueue[e];
"function"==typeof i&&i();
}
_.afterTemplateQueue=[];
}
}
function a(e){
this._o={
container:null,
red_dot_flag:0,
can_use_cps:!1,
clearProduct:!1,
tipStatus:{
choiceNoCommissionNeedTip:!1
},
can_use_wxopen_link:!1
},this._g={
highlineCacheIframe:[],
highlineTarget:null,
highlineTimeoutId:null
},this._extend(e);
var t=this.getContainer();
t&&$(t).show(),this._o.container&&this._o.can_use_cps&&($(this._o.container).show(),
e.can_show_reddot&&$(this._o.container).addClass("tpl_item_reddot")),this.initTemplate(),
this.editor=null,this.info=e.info;
}
function o(e,t,i){
for(var r=window.UE.dom.domUtils,a=e,o=!0;a;){
if(r.isBody(a)){
o=!1;
break;
}
var d=r["find"+i+"Sibling"](a,s(t),!1);
if(d&&!r.isBody(d)){
var l=r["find"+i+"Sibling"](a,c(d),!1);
if(l&&l!==d&&!r.isBody(l)){
o=!1;
break;
}
if(d===t){
o=!0;
break;
}
var u="";
if("Next"==i?u="Previous":"Previous"==i&&(u="Next"),n(t,d,u)){
o=!1;
break;
}
o=!0;
break;
}
if(d=r["find"+i+"Sibling"](a,c(),!1),d&&!r.isBody(d)){
o=!1;
break;
}
a=a.parentNode;
}
return o;
}
function n(e,t,i){
for(var r=window.UE.dom.domUtils,a=e,o=!1;a&&a!==t;){
var n=r["find"+i+"Sibling"](a,c(),!1);
if(n&&!r.isBody(n)){
o=!0;
break;
}
a=a.parentNode;
}
return o;
}
function s(e){
var t=window.UE.dom.domUtils,i=e.getAttribute("data-uid");
return function(r){
if(t.isBody(r))return!0;
if(1==r.nodeType){
if(e===r)return!0;
var a=$(r).find("."+_.className+"[data-uid="+i+"]");
return a&&a.length>0?!0:!1;
}
return!1;
};
}
function c(e){
var t=window.UE.dom.domUtils;
return function(i){
if(t.isBody(i))return!0;
if("undefined"!=typeof e&&i===e)return!0;
if(1==i.nodeType){
if("br"==i.nodeName.toLowerCase())return!1;
var r=i.innerText.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
if(i.style.cssText||r.length>0)return!0;
var a=["p","section","span"],o=","+a.join(",")+",",n=i.nodeName.toLowerCase();
if(o.indexOf(","+n+",")>=0){
if(0==i.childElementCount)return!1;
var s=$(i.cloneNode(!0));
s.find("br").remove();
for(var c=[],d=0,l=a.length;l>d;d++){
var u=a[d];
s.find(u).each(function(){
0!=this.childElementCount||this.style.cssText||c.push(this);
});
}
for(var d=0,l=c.length;l>d;d++)$(c[d]).remove();
return 0===s[0].childElementCount?!1:!0;
}
return!0;
}
if(3==i.nodeType){
var r=i.nodeValue.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
return r.length>0?!0:!1;
}
return!1;
};
}
function d(e,t){
for(var i=window.UE.dom.domUtils,r=e;r&&!i.isBody(r);){
var a=i["find"+t+"Sibling"](r,u,!1);
if(a){
r=a;
break;
}
r=r.parentNode;
}
if(r&&!i.isBody(r)&&1==r.nodeType){
if(l(r)===!0)return r;
var o=$(r).find("."+_.className).eq(0)[0];
if(o){
var n;
"Next"==t?n="Previous":"Previous"==t&&(n="Next");
for(var s=o;s&&!i.isBody(s)&&s!==r;){
var a=i["find"+n+"Sibling"](s,u,!1);
if(a){
s=a;
break;
}
s=s.parentNode;
}
return s&&!i.isBody(s)&&s!==r?null:o;
}
}
return null;
}
function l(e){
return e&&1==e.nodeType&&/^iframe$/i.test(e.nodeName)&&(e.className||"").indexOf(_.className)>=0?!0:!1;
}
function u(e){
var t=window.UE.dom.domUtils;
return t.isBody(e)||3==e.nodeType&&0==(e.nodeValue||"").replace(t.fillCharReg,"").length?!1:!0;
}
var p=(e("common/wx/dialog.js"),e("common/wx/Cgi.js")),f=e("common/wx/mpEditor/common/eventbus.js"),m=e("common/wx/media/cpsTemplateDialog.js"),h=e("common/wx/media/cpsUtils.js"),g=e("common/wx/mpEditor/utils.js"),v=e("tpl/mpEditor/plugin/cps_template_popup.html.js"),y=e("common/wx/Tips.js"),C=e("biz_web/lib/store.js"),_={
updateCpsDataStatus:0,
hasTemplateData:!1,
afterTemplateQueue:[],
maxLen:10,
curColor:h.defaultColor,
colorCacheMax:10,
curTemplateId:"",
PopupTplCompile:template.compile(v),
iframeUid:"insert_cps_iframe_ready",
className:"js_editor_cps",
cacheProductKey:"editorCpsInfo_"+window.wx.data.uin,
defaultColorList:["#fa7834","#09BB07","#D54036","#9058CB"],
productStyleText:"width:100% !important;border:0;"
};
return t(),a.afterSetContent=function(e){
var t=[],i=e.$dom;
if(i){
var r=e.funcUid,a=i.find("mpcps");
a.each(function(){
var e=$(this),i=e.attr("data-uid")||"";
i||(i=g.getuid(),e.attr("data-uid",i)),e.attr("src",g.getIframeSrc(i,r)),t.push(e);
}),g.createAsynRenderIframe(t);
}
},a.beforeSetContent=function(e){
if(_.updateCpsDataStatus=0,!e.html)return _.updateCpsDataStatus=1,"";
if(-1==e.html.indexOf("<mpcps")&&(_.updateCpsDataStatus=1),e.clearProduct===!0){
var t=$("<div>").html(e.html);
return t=i(t),t.html();
}
if(/<mpcps\s/.test(e.html)){
var a,t=$("<div>").html(e.html),o=[],n=[];
t.find("mpcps").each(function(){
var t,i=$(this);
e.isPreview===!0?(t=g.getuid(),i.attr("data-uid",t)):a=i.attr("data-color");
var r=i.parents("p");
if(r&&r.length>0)for(var s=0,c=r.length;c>s;s++)o.push(r[s]);
var d=h.getDataFromCustomTag(this);
n.push(d);
});
h.updateCpsData({
dataList:n,
onSuccess:function(){
_.updateCpsDataStatus=1,r();
},
onError:function(){
_.updateCpsDataStatus=-1,r();
}
}),a&&h.validColor(a)&&(_.curColor=a);
for(var s=0,c=o.length;c>s;s++){
var d=o[s];
d&&1==d.nodeType&&"p"==d.nodeName.toLowerCase()&&d.parentNode&&$(d).replaceTagName("section");
}
return e.html=t.html(),e.html;
}
return e.html;
},a.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
getName:function(){
return"insertcpsmoviebook";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
{
var e=this;
this._o;
}
return function(){
var t=e.editor;
if(t){
p.get({
url:" /cgi-bin/cpsproductmaterial?action=report",
data:{
type:"click_cps_product_entrance"
}
},function(){});
var i=e.getCurProductCount();
return i>=_.maxLen?(p.get({
url:" /cgi-bin/cpsproductmaterial?action=report",
data:{
type:"cps_product_limit"
}
},function(){}),void y.err("最多插入%s个商品".sprintf(_.maxLen))):void f.fireEvent("showCpsDialog",{
choiceLimit:_.maxLen-i,
tipStatus:e._o.tipStatus||{},
bizUin:wx.cgiData.bizUin
},function(t){
e._o.tipStatus.choiceNoCommissionNeedTip=!1,void 0!=t&&(_.curTemplateId&&h.getTemplateDataById(_.curTemplateId)&&(t.templateId=_.curTemplateId),
e.insertHtml(t));
});
}
};
},
initTemplate:function(){
_.hasTemplateData!==!0&&h.getTemplate({
callback:function(){
_.hasTemplateData=!0,r();
}
});
},
addListener:function(e){
if(this._o.clearProduct!==!0){
var t=this;
this.domUtils=this.editor.getDomUtils(),this.createIframeReadyFunc(),this.showPopup(e),
e.addListener("beforesavescene",function(e,t){
t&&t.content&&(t.content=t.content.replace(_.iframeReg,_.iframeRegReplace));
}),e.addListener("afterscencerestore",function(){
t.afterSetContent();
}),e.addListener("show_cps_template_dialog",function(e,i,r){
t.showCpsTemplateDialog(r);
}),e.addListener("beforepaste",function(e,i){
var r=$("<div></div>").html(i.html);
r=t.filterData(r),i.html=r.html();
}),e.addListener("beforekeydown",function(e,i){
if(i=i||window.event,i&&i.type){
var r=i.keyCode||i.which;
if(8==r||46==r){
var a=this.selection.getRange();
if(a.collapsed){
var o;
if(8==r){
if(1==a.startContainer.nodeType)o=a.startContainer.childNodes[a.startOffset-1];else if(3==a.startContainer.nodeType){
var n=a.startContainer.nodeValue.charAt(a.startOffset-1)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(o=a.startContainer);
}
o||(o=d(a.startContainer,"Previous"));
}else if(46==r){
if(1==a.startContainer.nodeType)o=a.startContainer.childNodes[a.startOffset];else if(3==a.startContainer.nodeType){
var n=a.startContainer.nodeValue.charAt(a.startOffset)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(o=a.startContainer);
}
o||(o=d(a.startContainer,"Next"));
}
if(o&&l(o)===!0)return this.selection.getRange().selectNode(o).select(!0),i.stopPropagation?(i.stopPropagation(),
i.preventDefault()):i.cancelBubble=!0,!1;
}
}
}
});
}
},
cancelHighline:function(){
this._g.highlineTimeoutId&&(clearTimeout(this._g.highlineTimeoutId),this._g.highlineTimeoutId=null);
var e=this;
this._g.highlineTimeoutId=setTimeout(function(){
e.highLineIframe(!1),e._g.highlineTarget=null,e._g.highlineCacheIframe=[];
},100);
},
getContainer:function(){
return this._o.can_use_cps?this._o.container:!1;
},
getTitle:function(){
return"添加商品";
},
beforeSetContent:function(e,t){
return a.beforeSetContent({
isPreview:t,
html:e,
clearProduct:this._o.clearProduct
});
},
afterSetContent:function(e){
a.afterSetContent({
$dom:e||$(this.editor.getUeditor().body),
funcUid:this.getIframeFuncUid()
});
},
getPluginData:function(e){
var t=e.init(),i=t.get("content");
if(i=i.replace(_.iframeReg,_.iframeRegReplace),this._o.clearProduct===!0){
var r=$("<div>").html(i);
return r=this.filterData(r),i=r.html(),t.set("content",i),t;
}
if(/<mpcps\s/.test(i)){
var r=$("<div>").html(i),a=[];
r.find("mpcps").each(function(){
var e=$(this),t=e.parents("p");
if(t&&t.length>0)for(var i=0,r=t.length;r>i;i++)a.push(t[i]);
e.attr("style",_.productStyleText),e.removeAttr("src"),h.setData2CustomTag(this);
});
for(var o=0,n=a.length;n>o;o++){
var s=a[o];
s&&1==s.nodeType&&"p"==s.nodeName.toLowerCase()&&s.parentNode&&$(s).replaceTagName("section");
}
i=r.html();
}
return t.set("content",i),t;
},
filterData:function(e){
return i(e);
},
getIframeFuncUid:function(){
var e=this.editor.getUeditor().uid;
return _.iframeUid+"_"+e;
},
beforeEditorDestory:function(){
g.clearIframeReadyFunc(this.getIframeFuncUid());
},
highLineIframe:function(e){
var t=this._g.highlineCacheIframe;
if(t){
{
this.initHighlineDom();
}
e?(this.showHighlineDom(),this.attachToHighline(t)):this.hideHighlineDom();
}
},
initHighlineDom:function(){
if(this._g.highlineDom)return this._g.highlineDom;
var e=this.editor.getUeditor(),t=document.createElement("div");
return t.id=e.ui.id+"_product_highline",t.style.cssText="position: absolute;border: 2px solid #43b548;box-sizing: border-box;display:none;z-index:"+e.options.zIndex+";",
e.ui.getDom().appendChild(t),this._g.highlineDom=t,t;
},
showHighlineDom:function(){
this._g.highlineDom.style.display="block";
},
hideHighlineDom:function(){
this._g.highlineDom.style.display="none";
},
attachToHighline:function(e){
if(e&&0!=e.length){
var t=UE.ui.uiUtils,i=this.editor.getUeditor(),r=this.editor.getDomUtils(),a=this._g.highlineDom,o=e[0],n=e[e.length-1],s=r.getXY(o),c=(t.getClientRect(o),
t.getClientRect(n),r.getXY(i.iframe)),d=r.getXY(this._g.highlineDom.parentNode);
r.setStyles(a,{
height:o.getBoundingClientRect().height+8+"px",
top:c.y+s.y-i.document.body.scrollTop-d.y-parseInt(a.style.borderTopWidth)-2+"px",
left:o.getBoundingClientRect().left-7+"px",
right:o.getBoundingClientRect().right+7+"px",
width:o.getBoundingClientRect().width+14+"px"
});
}
},
pickColor:function(e,t,i){
if(h.validColor(t)){
e.find("input").val(t),e.find(".js_fail").hide();
var r=C.get(_.cacheProductKey)||{},a=[];
r.color&&(a=r.color||[]);
var o=a.length>0?","+a.join(",")+",":"",n=","+_.defaultColorList.join(",")+",",s=","+t+",";
return-1!=n.indexOf(s)||o&&-1!=o.indexOf(s)||(a.unshift(t),a.length>_.colorCacheMax&&a.splice(_.colorCacheMax),
r.color=a,C.set(_.cacheProductKey,r)),this.changeProductColor(t,i),!0;
}
return!1;
},
changeProductColor:function(e,t){
var i=h.validColor(e);
if(i){
_.curColor=e;
var r=$(this.editor.getUeditor().body),a=0,o=0,n=[];
r.find("."+_.className).each(function(){
var i=$(this),r=h.getOptionsFromIframe(this);
r.color=e,n.push(i),t&&this===t&&(o=a),a++;
});
var s=[];
if(o>0){
s.push(n[o]);
for(var c=o-1,d=o+1;c>=0||d<n.length;)n[c]&&s.push(n[c]),n[d]&&s.push(n[d]),c--,
d++;
}else s=n;
this.editor.fireEvent("saveScene"),g.createAsynIframeReload(s);
}
},
createIframeReadyFunc:function(){
var e=this.editor.getUeditor().uid;
g.createIframeReadyFunc({
uid:this.getIframeFuncUid(),
force:!0,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(e,t,i){
return function(r){
var a=function(){
var a=t(r.iframe);
a&&(r.doc.body.innerHTML=a,i(r.iframe,r.doc.body,e),"function"==typeof window.__editorIframeMouseup&&(r.doc.body.onmouseup=function(){
window.__editorIframeMouseup(r.doc.defaultView||r.doc.parentWindow);
}));
};
_.hasTemplateData===!0&&0!=_.updateCpsDataStatus?a():_.afterTemplateQueue.push(a);
};
}(e,h.getIframeContentByIframe,h.addIframeImgLoadEvent)
});
},
insertHtml:function(e){
var t=h.getTemplateDataById(e.templateId);
if(t){
t.loop=1;
var i=C.get(_.cacheProductKey)||{};
i.templateId=e.templateId,C.set(_.cacheProductKey,i),_.curTemplateId=e.templateId;
var r=[],a=[],o=[],n=[];
for(r=[].concat(e.productData),a=[].concat(e.productId);r.length>0;)o.push(r.splice(0,t.loop)),
n.push(a.splice(0,t.loop));
e.appuin&&(e.appUinList=[e.appuin]),e.categoryid&&(e.categoryidList=[e.categoryid]);
for(var s=[],c=0,d=o.length;d>c;c++){
var l=["<section>","","</section>"],u=e.templateId;
"banner"==u&&e.categoryidList[c]>2&&(u="card"),"card"==u&&2==e.categoryidList[c]&&(u="banner"),
1==e.categoryidList[c]&&(u="list");
var p=h.cacheIframeData({
type:e.type,
productData:o[c],
templateId:u,
productId:n[c],
packId:e.packId,
smartNum:e.smartNum,
color:e.color||_.curColor,
categoryid:e.categoryidList[c],
appuin:e.appUinList[c],
report:e.productData[0].report_buffer
});
l[1]=this.createLocalIframe({
datakey:p
}),s.push(l.join(""));
}
s=s.join("").replace(/<iframe /g,"<mpcps ").replace(/<\/iframe>/g,"</mpcps>");
var f=this.editor.execCommand("insertHtml",s),m=[],v=this.getIframeFuncUid();
$(f).find("mpcps").each(function(){
var e=$(this),t=e.attr("data-uid")||"";
t||(t=g.getuid(),e.attr("data-uid",t)),e.attr("src",g.getIframeSrc(t,v)),m.push(e);
}),g.createAsynRenderIframe(m);
}
},
createLocalIframe:function(e){
var t=this.getIframeFuncUid();
return function(t,i,r){
return g.createLocalIframe({
noSrc:!0,
uid:i,
attr:{
" frameborder":"0",
"class":r,
"data-datakey":e.datakey,
style:_.productStyleText
}
});
}(e,t,_.className);
},
getCurProductCount:function(){
var e=$(this.editor.getUeditor().body),t=0;
return e.find("."+_.className).each(function(){
var e=h.getOptionsFromIframe(this),i=($(this),e.type),r=1*e.smartNum,a=e.productId||[];
t+=2==i?r:a.length;
}),t;
},
getNotRenderProductCount:function(){
return $(this.editor.getUeditor().body).find("mpcps").length;
},
showPopup:function(e){
{
var t=this;
e.getUeditor();
}
e.addListener("cancel_common_popup_mouseover_event",function(){}),e.addListener("mouseout",function(e,t){
var i=t.target||t.srcElement;
l(i)===!0&&($(i.contentDocument).find(".js_product_container").removeClass("hover"),
$(i.contentDocument).find(".js_change_cps_tmpl_a").unbind(),$(i.contentDocument).find(".js_del_cps_card_a").unbind());
}),e.addListener("mouseover",function(e,i){
var r=i.target||i.srcElement;
if(l(r)===!0){
$(r.contentDocument).find(".js_product_container").addClass("hover"),$(r.contentDocument).find(".js_change_cps_tmpl_a").click(function(){
t.showCpsTemplateDialog(r);
});
var a=h.getOptionsFromIframe(r)||{};
a.categoryid==h.getBookCategoryId()&&$(r.contentDocument).find(".js_change_cps_tmpl").hide(),
$(r.contentDocument).find(".js_del_cps_card_a").click(function(){
$(r).remove();
});
}
});
},
getProductIframeFromRange:function(e,t){
if(e){
var i=e[t+"Container"];
if(i&&1==i.nodeType){
var r=i.childNodes[e[t+"Offset"]];
if(r&&1==r.nodeType){
if(l(r)===!0)return r;
for(var a,o=r.getElementsByTagName("iframe"),n=0,s=o.length;s>n;n++){
var c=o[n];
if(l(c)===!0){
a=c;
break;
}
}
return a;
}
}
}
},
showCpsTemplateDialog:function(e){
var t=h.getOptionsFromIframe(e);
if(t&&t.templateId){
var i=t.productData;
if(i&&i.length>0){
var r=this,a=(t.type,"card");
i[0].category_id==h.getMovieCategoryId()&&(a="banner"),new m.myclass({
color:_.curColor||"",
templateId:t.templateId,
showType:a,
productData:i[0],
editor:this.editor,
callback:function(t){
var i=r.editor.getDomUtils(),a=r.getNeighbor(e);
if(a&&a.opts&&a.iframeList&&0!=a.iframeList.length){
a.opts.templateId=t.id;
for(var o=this.editor.getUeditor(),n=a.iframeList.length-1;n>=0;n--){
var s=a.iframeList[n];
if(0==n){
var d=o.selection.getRange().selectNode(s).select();
d&&d.collapse(!0);
}
var l=s.parentNode;
if(h.clearIframeProductDataByDom(s),$(s).remove(),l&&!i.isBody(l)){
var u=c()(l);
if(u===!1){
if(0==n){
var d=o.selection.getRange().selectNode(l).select();
d&&d.collapse(!0);
}
$(l).remove();
}
}
}
r.insertHtml(a.opts);
}
}
});
}
}
},
getNeighbor:function(e){
var t=(this.editor.getDomUtils(),{
iframeList:[],
opts:null
});
if(!e)return t;
var i=e.getAttribute("data-uid"),r=$(this.editor.getUeditor().body);
if(e=r.find("."+_.className+"[data-uid="+i+"]"),!i||!e||0==e.length)return t;
if(e=e[0],t.opts=h.getOptionsFromIframe(e,!0),!t.opts)return t;
var a=1*t.opts.type;
if(2===a)return t.iframeList.push(e),t;
var n=0,s=void 0,c=[];
if(r.find("."+_.className).each(function(){
this===e&&(s=n),n++,c.push(this);
}),"undefined"==typeof s)return t;
for(var d=[],l=s-1;l>=0;l--){
var u=h.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
d.push(c[l]);
}
d.reverse();
for(var p=[],l=s+1,f=c.length;f>l;l++){
var u=h.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
p.push(c[l]);
}
var d=[],p=[],m=[].concat(d,c[s],p);
s=d.length;
var g={},v={
Previous:{
ratio:-1
},
Next:{
ratio:1
}
};
for(var y in v){
var a=y;
g[a]=[];
for(var C=v[y].ratio,n=s+C,I=m[s],b=m[n];b&&o(I,b,a)===!0;)g[a].push(b),I=b,n+=C,
b=m[n];
}
g.Previous.reverse(),t.iframeList=[].concat(g.Previous,m[s],g.Next),t.opts.productData=this.mergeProduct(t.iframeList);
for(var T=[],l=0,f=t.opts.productData.length;f>l;l++)T.push(t.opts.productData[l].pid);
return t.opts.productId=T,t;
},
mergeProduct:function(e){
for(var t=[],i=0,r=e.length;r>i;i++){
var a=h.getOptionsFromIframe(e[i]);
a&&a.productData&&(t=t.concat(a.productData));
}
return t;
}
},g.initEventInterface(a),a;
});define("common/wx/mpEditor/plugin/insert_product.js",["common/wx/dialog.js","common/wx/media/productDialog.js","common/wx/media/productTemplateDialog.js","common/wx/mpEditor/plugin/productUtils.js","common/wx/mpEditor/utils.js","tpl/mpEditor/plugin/product_popup.html.js","tpl/mpEditor/plugin/product_popup_icon.html.js","common/wx/Tips.js","biz_web/lib/store.js"],function(e){
"use strict";
function t(){
C.mpproductReg=new RegExp("<mpproduct([^>]*?)"+C.className+"([^>]*?)><\\/mpproduct>","g"),
C.mpproductRegReplace="<iframe $1"+C.className+"$2></iframe>",C.iframeReg=new RegExp("<iframe([^>]*?)"+C.className+"([^>]*?)><\\/iframe>","g"),
C.iframeRegReplace="<mpproduct $1"+C.className+"$2></mpproduct>";
var e=y.get(C.cacheProductKey)||{};
e.templateId&&(C.curTemplateId=e.templateId);
}
function r(e){
return e.find("iframe."+C.className).remove(),e.find("mpproduct").remove(),e.find("."+f.appmsgContainerClass).remove(),
e.find("."+f.appmsgLoopClass).remove(),e.find("."+f.appmsgProductErrClass).remove(),
e.find("section").each(function(){
this.firstChild||this.style.cssText||$(this).remove();
}),e;
}
function i(e){
this._o={
container:null,
clearProduct:!1,
can_see_product:!1,
can_use_smart:!1,
can_use_product:!1,
can_use_wxopen_link:!1
},this._g={
highlineCacheIframe:[],
highlineTarget:null,
highlineTimeoutId:null
},this._extend(e);
var t=this.getContainer();
t&&($(t).show(),this._o.container&&this._o.can_see_product===!0&&($(this._o.container).show(),
e.can_show_reddot&&$(this._o.container).addClass("tpl_item_reddot"))),this._o.can_see_product!==!0||this._o.can_use_product!==!0?this._o.clearProduct=!0:this.initTemplate(),
this.editor=null;
}
function o(e,t,r){
for(var i=window.UE.dom.domUtils,o=e,c=!0;o;){
if(i.isBody(o)){
c=!1;
break;
}
var d=i["find"+r+"Sibling"](o,n(t),!1);
if(d&&!i.isBody(d)){
var l=i["find"+r+"Sibling"](o,s(d),!1);
if(l&&l!==d&&!i.isBody(l)){
c=!1;
break;
}
if(d===t){
c=!0;
break;
}
var u="";
if("Next"==r?u="Previous":"Previous"==r&&(u="Next"),a(t,d,u)){
c=!1;
break;
}
c=!0;
break;
}
if(d=i["find"+r+"Sibling"](o,s(),!1),d&&!i.isBody(d)){
c=!1;
break;
}
o=o.parentNode;
}
return c;
}
function a(e,t,r){
for(var i=window.UE.dom.domUtils,o=e,a=!1;o&&o!==t;){
var n=i["find"+r+"Sibling"](o,s(),!1);
if(n&&!i.isBody(n)){
a=!0;
break;
}
o=o.parentNode;
}
return a;
}
function n(e){
var t=window.UE.dom.domUtils,r=e.getAttribute("data-uid");
return function(i){
if(t.isBody(i))return!0;
if(1==i.nodeType){
if(e===i)return!0;
var o=$(i).find("."+C.className+"[data-uid="+r+"]");
return o&&o.length>0?!0:!1;
}
return!1;
};
}
function s(e){
var t=window.UE.dom.domUtils;
return function(r){
if(t.isBody(r))return!0;
if("undefined"!=typeof e&&r===e)return!0;
if(1==r.nodeType){
if("br"==r.nodeName.toLowerCase())return!1;
var i=r.innerText.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
if(r.style.cssText||i.length>0)return!0;
var o=["p","section","span"],a=","+o.join(",")+",",n=r.nodeName.toLowerCase();
if(a.indexOf(","+n+",")>=0){
if(0==r.childElementCount)return!1;
var s=$(r.cloneNode(!0));
s.find("br").remove();
for(var c=[],d=0,l=o.length;l>d;d++){
var u=o[d];
s.find(u).each(function(){
0!=this.childElementCount||this.style.cssText||c.push(this);
});
}
for(var d=0,l=c.length;l>d;d++)$(c[d]).remove();
return 0===s[0].childElementCount?!1:!0;
}
return!0;
}
if(3==r.nodeType){
var i=r.nodeValue.replace(/[\r\n\s]/g,"").replace(t.fillCharReg,"");
return i.length>0?!0:!1;
}
return!1;
};
}
function c(e,t){
for(var r=window.UE.dom.domUtils,i=e;i&&!r.isBody(i);){
var o=r["find"+t+"Sibling"](i,l,!1);
if(o){
i=o;
break;
}
i=i.parentNode;
}
if(i&&!r.isBody(i)&&1==i.nodeType){
if(d(i)===!0)return i;
var a=$(i).find("."+C.className).eq(0)[0];
if(a){
var n;
"Next"==t?n="Previous":"Previous"==t&&(n="Next");
for(var s=a;s&&!r.isBody(s)&&s!==i;){
var o=r["find"+n+"Sibling"](s,l,!1);
if(o){
s=o;
break;
}
s=s.parentNode;
}
return s&&!r.isBody(s)&&s!==i?null:a;
}
}
return null;
}
function d(e){
return e&&1==e.nodeType&&/^iframe$/i.test(e.nodeName)&&(e.className||"").indexOf(C.className)>=0?!0:!1;
}
function l(e){
var t=window.UE.dom.domUtils;
return t.isBody(e)||3==e.nodeType&&0==(e.nodeValue||"").replace(t.fillCharReg,"").length?!1:!0;
}
var u=e("common/wx/dialog.js"),p=e("common/wx/media/productDialog.js"),m=e("common/wx/media/productTemplateDialog.js"),f=e("common/wx/mpEditor/plugin/productUtils.js"),h=e("common/wx/mpEditor/utils.js"),g=e("tpl/mpEditor/plugin/product_popup.html.js"),v=e("tpl/mpEditor/plugin/product_popup_icon.html.js"),_=e("common/wx/Tips.js"),y=e("biz_web/lib/store.js"),C={
hasTemplateData:!1,
afterTemplateQueue:[],
maxLen:200,
curColor:f.defaultColor,
colorCacheMax:10,
curTemplateId:"",
PopupTplCompile:template.compile(g),
PopupIconTplCompile:template.compile(v),
iframeUid:"insert_product_iframe_ready",
className:"js_editor_product",
cacheProductKey:"editorProductInfo_"+window.wx.data.uin,
defaultColorList:["#fa7834","#09BB07","#D54036","#9058CB"],
productStyleText:"width:100% !important;border:0;"
};
return t(),i.afterSetContent=function(e){
var t=[],r=e.$dom,i=e.funcUid;
r.find("mpproduct").each(function(){
var e=$(this),r=e.attr("data-uid")||"";
r||(r=h.getuid(),e.attr("data-uid",r)),e.attr("src",h.getIframeSrc(r,i)),t.push(e);
}),h.createAsynRenderIframe(t);
},i.beforeSetContent=function(e){
if(!e.html)return"";
if(e.clearProduct===!0){
var t=$("<div>").html(e.html);
return t=r(t),t.html();
}
if(/<mpproduct\s/.test(e.html)){
var i,t=$("<div>").html(e.html),o=[];
t.find("mpproduct").each(function(){
var t,r=$(this);
e.isPreview===!0?(t=h.getuid(),r.attr("data-uid",t)):i=r.attr("data-color");
var a=r.parents("p");
if(a&&a.length>0)for(var n=0,s=a.length;s>n;n++)o.push(a[n]);
f.getDataFromCustomTag(this);
}),i&&f.validColor(i)&&(C.curColor=i);
for(var a=0,n=o.length;n>a;a++){
var s=o[a];
s&&1==s.nodeType&&"p"==s.nodeName.toLowerCase()&&s.parentNode&&$(s).replaceTagName("section");
}
return e.html=t.html(),e.html;
}
return e.html;
},i.prototype={
_extend:function(e){
for(var t in e)this._o[t]=e[t];
},
getName:function(){
return"insertproduct";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
{
var e=this;
this._o;
}
return function(){
var t=e.editor;
if(t){
if(e._o.can_use_product!==!0){
var r="未关联开通微信支付的小程序，暂无法使用商品组件能力%s去关联%s",i="";
return i=e._o.can_use_wxopen_link===!0?"<p style='text-align:center'><a href='"+wx.url("/cgi-bin/wxopen?action=list")+"' target='_blank'>":"<p style='text-align:center'><a href='"+wx.url("/cgi-bin/wxopen?action=apply_page")+"' target='_blank'>",
void u.show({
title:"选择商品",
type:"info",
msg:r.sprintf(i,"</a></p>"),
className:"dialog-product-not-support",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}
var o=e.getCurProductCount();
return o>=C.maxLen?void _.err("最多插入%s个商品".sprintf(C.maxLen)):void new p({
can_use_smart:e._o.can_use_smart,
maxLen:C.maxLen-o,
editor:t,
callback:function(t){
C.curTemplateId&&f.getTemplateDataById(C.curTemplateId)&&(t.templateId=C.curTemplateId),
e.insertHtml(t);
}
});
}
};
},
initTemplate:function(){
C.hasTemplateData!==!0&&f.getTemplate({
callback:function(){
C.hasTemplateData=!0;
for(var e=0,t=C.afterTemplateQueue.length;t>e;e++){
var r=C.afterTemplateQueue[e];
"function"==typeof r&&r();
}
C.afterTemplateQueue=[];
}
});
},
addListener:function(e){
if(this._o.clearProduct!==!0){
var t=this;
this.domUtils=this.editor.getDomUtils(),this.createIframeReadyFunc(),this.showPopup(e),
e.addListener("beforesavescene",function(e,t){
t&&t.content&&(t.content=t.content.replace(C.iframeReg,C.iframeRegReplace));
}),e.addListener("afterscencerestore",function(){
t.afterSetContent();
}),e.addListener("show_product_template_dialog",function(e,r,i){
$(r).parents(".js_product_popup").find(".js_color_picker").hide(),t.showProductTemplateDialog(i);
}),e.addListener("beforepaste",function(e,r){
var i=$("<div></div>").html(r.html);
i=t.filterData(i),r.html=i.html();
}),e.addListener("toggle_product_color",function(e,t,r){
t=t||window.event;
var i=$(t.target||t.srcElement);
if(i.hasClass("js_toggle")){
var o=$(r).find(".js_color_picker");
o.is(":hidden")?o.show():o.hide();
}
}),e.addListener("product_color_pick",function(e,r,i,o){
r=r||window.event;
var a=$(r.target||r.srcElement);
if(a.hasClass("js_color_icon")){
var n=a.attr("data-color"),s=a.parents(".js_color_picker"),c=t.pickColor(s,n,o);
c===!0&&this.fireEvent("hide_common_popup");
}
}),e.addListener("product_color_change",function(e,r,i,o){
var a=$(i),n=a.parents(".js_color_picker"),s=n.find("input.js_color_input").val(),c=n.find(".js_fail");
if(s&&f.validColor(s)){
c.hide(),r=r||window.event;
var d=r.keyCode||r.which||0;
if("click"==r.type||"keyup"==r.type&&13==d){
var l=t.pickColor(n,s,o);
l===!0&&this.fireEvent("hide_common_popup");
}
}else s?c.show().find(".js_fail_msg").text("请输入合法颜色值，如#666666"):c.hide();
}),e.addListener("common_popup_mouseover",function(e,r,i,o){
if(d(o)){
var a=t._g,n=$(i).find(".js_template")[0];
if(n){
var s=n.getBoundingClientRect();
r.clientX<parseInt(s.left)||r.clientX>parseInt(s.right)||r.clientY<parseInt(s.top)||r.clientY>parseInt(s.bottom)?t.cancelHighline():(a.highlineTimeoutId&&(clearTimeout(a.highlineTimeoutId),
a.highlineTimeoutId=null),(0==a.highlineCacheIframe.length||a.highlineTarget!==o)&&(a.highlineTarget=o,
a.highlineCacheIframe=t.getNeighbor(o).iframeList||[],t.highLineIframe(!0)));
}else t.cancelHighline();
}
}),e.addListener("common_popup_mouseout",function(e,r,i,o){
d(o)&&t.cancelHighline();
}),e.addListener("beforekeydown",function(e,r){
if(r=r||window.event,r&&r.type){
var i=r.keyCode||r.which;
if(8==i||46==i){
var o=this.selection.getRange();
if(o.collapsed){
var a;
if(8==i){
if(1==o.startContainer.nodeType)a=o.startContainer.childNodes[o.startOffset-1];else if(3==o.startContainer.nodeType){
var n=o.startContainer.nodeValue.charAt(o.startOffset-1)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(a=o.startContainer);
}
a||(a=c(o.startContainer,"Previous"));
}else if(46==i){
if(1==o.startContainer.nodeType)a=o.startContainer.childNodes[o.startOffset];else if(3==o.startContainer.nodeType){
var n=o.startContainer.nodeValue.charAt(o.startOffset)||"";
n=n.replace(t.domUtils.fillCharReg,""),n&&(a=o.startContainer);
}
a||(a=c(o.startContainer,"Next"));
}
if(a&&d(a)===!0)return this.selection.getRange().selectNode(a).select(!0),r.stopPropagation?(r.stopPropagation(),
r.preventDefault()):r.cancelBubble=!0,!1;
}
}
}
});
}
},
cancelHighline:function(){
this._g.highlineTimeoutId&&(clearTimeout(this._g.highlineTimeoutId),this._g.highlineTimeoutId=null);
var e=this;
this._g.highlineTimeoutId=setTimeout(function(){
e.highLineIframe(!1),e._g.highlineTarget=null,e._g.highlineCacheIframe=[];
},100);
},
getContainer:function(){
return this._o.can_see_product?this._o.container:"";
},
getTitle:function(){
return"添加商品";
},
beforeSetContent:function(e,t){
return i.beforeSetContent({
isPreview:t,
html:e,
clearProduct:this._o.clearProduct
});
},
afterSetContent:function(e){
i.afterSetContent({
$dom:e||$(this.editor.getUeditor().body),
funcUid:this.getIframeFuncUid()
});
},
getPluginData:function(e){
var t=e.init(),r=t.get("content");
if(r=r.replace(C.iframeReg,C.iframeRegReplace),this._o.clearProduct===!0){
var i=$("<div>").html(r);
return i=this.filterData(i),r=i.html(),t.set("content",r),t;
}
if(/<mpproduct\s/.test(r)){
var i=$("<div>").html(r),o=[];
i.find("mpproduct").each(function(){
var e=$(this),t=e.parents("p");
if(t&&t.length>0)for(var r=0,i=t.length;i>r;r++)o.push(t[r]);
e.attr("style",C.productStyleText),e.removeAttr("src"),f.setData2CustomTag(this);
});
for(var a=0,n=o.length;n>a;a++){
var s=o[a];
s&&1==s.nodeType&&"p"==s.nodeName.toLowerCase()&&s.parentNode&&$(s).replaceTagName("section");
}
r=i.html();
}
return t.set("content",r),t;
},
filterData:function(e){
return r(e);
},
getIframeFuncUid:function(){
var e=this.editor.getUeditor().uid;
return C.iframeUid+"_"+e;
},
beforeEditorDestory:function(){
h.clearIframeReadyFunc(this.getIframeFuncUid());
},
highLineIframe:function(e){
var t=this._g.highlineCacheIframe;
if(t){
{
this.initHighlineDom();
}
e?(this.showHighlineDom(),this.attachToHighline(t)):this.hideHighlineDom();
}
},
initHighlineDom:function(){
if(this._g.highlineDom)return this._g.highlineDom;
var e=this.editor.getUeditor(),t=document.createElement("div");
return t.id=e.ui.id+"_product_highline",t.style.cssText="position: absolute;left: 72px;border: 2px solid #43b548;box-sizing: border-box;right: 72px;display:none;z-index:"+e.options.zIndex+";",
e.ui.getDom().appendChild(t),this._g.highlineDom=t,t;
},
showHighlineDom:function(){
this._g.highlineDom.style.display="block";
},
hideHighlineDom:function(){
this._g.highlineDom.style.display="none";
},
attachToHighline:function(e){
if(e&&0!=e.length){
var t=UE.ui.uiUtils,r=this.editor.getUeditor(),i=this.editor.getDomUtils(),o=this._g.highlineDom,a=e[0],n=e[e.length-1],s=i.getXY(a),c=t.getClientRect(a),d=t.getClientRect(n),l=i.getXY(r.iframe),u=i.getXY(this._g.highlineDom.parentNode);
i.setStyles(o,{
height:d.bottom-c.top+"px",
top:l.y+s.y-r.document.body.scrollTop-u.y-parseInt(o.style.borderTopWidth)+"px"
});
}
},
pickColor:function(e,t,r){
if(f.validColor(t)){
e.find("input").val(t),e.find(".js_fail").hide();
var i=y.get(C.cacheProductKey)||{},o=[];
i.color&&(o=i.color||[]);
var a=o.length>0?","+o.join(",")+",":"",n=","+C.defaultColorList.join(",")+",",s=","+t+",";
return-1!=n.indexOf(s)||a&&-1!=a.indexOf(s)||(o.unshift(t),o.length>C.colorCacheMax&&o.splice(C.colorCacheMax),
i.color=o,y.set(C.cacheProductKey,i)),this.changeProductColor(t,r),!0;
}
return!1;
},
changeProductColor:function(e,t){
var r=f.validColor(e);
if(r){
C.curColor=e;
var i=$(this.editor.getUeditor().body),o=0,a=0,n=[];
i.find("."+C.className).each(function(){
var r=$(this),i=f.getOptionsFromIframe(this);
i.color=e,n.push(r),t&&this===t&&(a=o),o++;
});
var s=[];
if(a>0){
s.push(n[a]);
for(var c=a-1,d=a+1;c>=0||d<n.length;)n[c]&&s.push(n[c]),n[d]&&s.push(n[d]),c--,
d++;
}else s=n;
this.editor.fireEvent("saveScene"),h.createAsynIframeReload(s);
}
},
createIframeReadyFunc:function(){
var e=this.editor.getUeditor().uid;
h.createIframeReadyFunc({
uid:this.getIframeFuncUid(),
force:!0,
notClear:!0,
iframeSelect:!0,
onIframeReadyFunc:function(e,t,r){
return function(i){
var o=function(){
var o=t(i.iframe);
o&&(i.doc.body.innerHTML=o,r(i.iframe,i.doc.body,e));
};
C.hasTemplateData===!0?o():C.afterTemplateQueue.push(o);
};
}(e,f.getIframeContentByIframe,f.addIframeImgLoadEvent)
});
},
insertHtml:function(e){
var t=f.getTemplateDataById(e.templateId);
if(t&&t.loop){
var r=y.get(C.cacheProductKey)||{};
r.templateId=e.templateId,y.set(C.cacheProductKey,r),C.curTemplateId=e.templateId;
var i=[],o=[],a=[],n=[];
if(2==e.type)i=[].concat(e.productData.splice(0,e.smartNum)),a.push(i),n.push(e.productId);else for(i=[].concat(e.productData),
o=[].concat(e.productId);i.length>0;)a.push(i.splice(0,t.loop)),n.push(o.splice(0,t.loop));
for(var s=[],c=0,d=a.length;d>c;c++){
var l=["<section>","","</section>"],u=f.cacheIframeData({
type:e.type,
productData:a[c],
templateId:e.templateId,
productId:n[c],
packId:e.packId,
smartNum:e.smartNum,
color:e.color||C.curColor
});
l[1]=this.createLocalIframe({
datakey:u
}),s.push(l.join(""));
}
s=s.join("").replace(/<iframe /g,"<mpproduct ").replace(/<\/iframe>/g,"</mpproduct>");
var p=this.editor.execCommand("insertHtml",s),m=[],g=this.getIframeFuncUid();
$(p).find("mpproduct").each(function(){
var e=$(this),t=e.attr("data-uid")||"";
t||(t=h.getuid(),e.attr("data-uid",t)),e.attr("src",h.getIframeSrc(t,g)),m.push(e);
}),h.createAsynRenderIframe(m);
}
},
createLocalIframe:function(e){
var t=this.getIframeFuncUid();
return function(t,r,i){
return h.createLocalIframe({
noSrc:!0,
uid:r,
attr:{
" frameborder":"0",
"class":i,
"data-datakey":e.datakey,
style:C.productStyleText
}
});
}(e,t,C.className);
},
getCurProductCount:function(){
var e=$(this.editor.getUeditor().body),t=0;
return e.find("."+C.className).each(function(){
var e=f.getOptionsFromIframe(this),r=($(this),e.type),i=1*e.smartNum,o=e.productId||[];
t+=2==r?i:o.length;
}),t;
},
getNotRenderProductCount:function(){
return $(this.editor.getUeditor().body).find("mpproduct").length;
},
showPopup:function(e){
e.getUeditor();
e.addListener("mouseover_common_popup",function(e,t,r){
var i=r.target||r.srcElement;
if(d(i)===!0){
var o=y.get(C.cacheProductKey)||{};
o=o.color?o.color||[]:[],o=[].concat(o,C.defaultColorList);
var a=C.PopupIconTplCompile({
list:o
});
t.html+=C.PopupTplCompile({
colorList:a
}),t.adjust=!0,t.node=i;
}
});
},
getProductIframeFromRange:function(e,t){
if(e){
var r=e[t+"Container"];
if(r&&1==r.nodeType){
var i=r.childNodes[e[t+"Offset"]];
if(i&&1==i.nodeType){
if(d(i)===!0)return i;
for(var o,a=i.getElementsByTagName("iframe"),n=0,s=a.length;s>n;n++){
var c=a[n];
if(d(c)===!0){
o=c;
break;
}
}
return o;
}
}
}
},
showProductTemplateDialog:function(e){
var t=f.getOptionsFromIframe(e);
if(t&&t.templateId){
var r=t.productData;
if(r&&r.length>0){
{
var i=this;
t.type;
}
new m.myclass({
color:C.curColor||"",
templateId:t.templateId,
productData:r[0],
editor:this.editor,
callback:function(t){
var r=i.editor.getDomUtils(),o=i.getNeighbor(e);
if(delete o.iframeList,o.iframeList=[],o.iframeList.push(e),o&&o.opts&&o.iframeList&&0!=o.iframeList.length){
o.opts.templateId=t.id;
for(var a=this.editor.getUeditor(),n=o.iframeList.length-1;n>=0;n--){
var c=o.iframeList[n];
if(0==n){
var d=a.selection.getRange().selectNode(c).select();
d&&d.collapse(!0);
}
var l=c.parentNode;
if(f.clearIframeProductDataByDom(c),$(c).remove(),l&&!r.isBody(l)){
var u=s()(l);
if(u===!1){
if(0==n){
var d=a.selection.getRange().selectNode(l).select();
d&&d.collapse(!0);
}
$(l).remove();
}
}
}
i.insertHtml(o.opts);
}
}
});
}
}
},
getNeighbor:function(e){
var t=(this.editor.getDomUtils(),{
iframeList:[],
opts:null
});
if(!e)return t;
var r=e.getAttribute("data-uid"),i=$(this.editor.getUeditor().body);
if(e=i.find("."+C.className+"[data-uid="+r+"]"),!r||!e||0==e.length)return t;
if(e=e[0],t.opts=f.getOptionsFromIframe(e,!0),!t.opts)return t;
var a=1*t.opts.type;
if(2===a)return t.iframeList.push(e),t;
var n=0,s=void 0,c=[];
if(i.find("."+C.className).each(function(){
this===e&&(s=n),n++,c.push(this);
}),"undefined"==typeof s)return t;
for(var d=[],l=s-1;l>=0;l--){
var u=f.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
d.push(c[l]);
}
d.reverse();
for(var p=[],l=s+1,m=c.length;m>l;l++){
var u=f.getOptionsFromIframe(c[l]);
if(1*u.type===2)break;
p.push(c[l]);
}
var h=[].concat(d,c[s],p);
s=d.length;
var g={},v={
Previous:{
ratio:-1
},
Next:{
ratio:1
}
};
for(var _ in v){
var a=_;
g[a]=[];
for(var y=v[_].ratio,n=s+y,I=h[s],T=h[n];T&&o(I,T,a)===!0;)g[a].push(T),I=T,n+=y,
T=h[n];
}
g.Previous.reverse(),t.iframeList=[].concat(g.Previous,h[s],g.Next),t.opts.productData=this.mergeProduct(t.iframeList);
for(var w=[],l=0,m=t.opts.productData.length;m>l;l++)w.push(t.opts.productData[l].pid);
return t.opts.productId=w,t;
},
mergeProduct:function(e){
for(var t=[],r=0,i=e.length;i>r;r++){
var o=f.getOptionsFromIframe(e[r]);
o&&o.productData&&(t=t.concat(o.productData));
}
return t;
}
},h.initEventInterface(i),i;
});define("common/wx/mpEditor/plugin/video.js",["common/wx/popup.js","biz_common/utils/url/parse.js","common/wx/media/videoUtils.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/getVinfo.js","common/wx/mpEditor/common/eventbus.js","common/wx/Cgi.js","common/wx/mpEditor/plugin/filter.js"],function(t){
"use strict";
function e(t){
var e=27,r=wx.getBanInfo&&wx.getBanInfo(e);
return r&&t&&f.show({
msg:"经用户投诉，你的帐号上传的视频%s，已封禁添加视频能力至%s。".sprintf(r.reason_desc,r.ban_time==r.unlock_time?"永久":i(r.unlock_time)),
buttons:[{
text:"返回",
click:function(){
this.remove();
}
}]
}),r;
}
function i(t){
var e=new Date(1e3*t);
return e.getFullYear()+"年"+(e.getMonth()+1)+"月"+e.getDate()+"日";
}
function r(t){
if(!t)return g.ratio;
for(var e=[4/3,16/9],i=e[0],r=Math.abs(i-t),n=1,a=e.length;a>n;n++){
var o=Math.abs(e[n]-t);
r>o&&(r=o,i=e[n]);
}
return i;
}
function n(t){
var e=arguments[1]||window.location.search,i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),r=e.substr(e.indexOf("?")+1).match(i);
return null!=r?r[2]:"";
}
function a(t,e){
var i,r=$(t).find("iframe");
return r.each(function(){
var t=$(this),r=t.attr("src")||t.attr("data-src");
return n("vid",r)==e?(i=t,!1):void 0;
}),i;
}
function o(t){
if(t&&1==t.nodeType&&"iframe"==t.tagName.toLowerCase()){
var e=t.attributes;
if(e&&e.length>0){
for(var i=[],r=","+g.attrList.join(",")+",",n=0,a=e.length;a>n;n++)-1==r.indexOf(e[n].name)&&i.push(e[n].name);
for(var n=0,a=i.length;a>n;n++)t.removeAttribute(i[n]);
}
}
}
function d(t,e,i){
return t.find("iframe").each(function(){
var t=$(this),a=s(t),d=t.attr("data-src")||t.attr("src")||"",m=t.attr("data-vidtype");
if(1==a)t.remove();else if(2==a)t.remove();else if(3==a){
var v=n("vid",d);
if(v){
o(this),t.addClass("video_iframe wx_video_iframe"),t.removeAttr("data-src");
var f=e?c.getPreviewPhoneWidth():i,u=1*t.data("ratio");
u=u?r(u):g.ratio;
var l=Math.round(f/u);
e?t.css({
width:f,
height:l
}):t.removeAttr("style"),e===!0?(t.attr("width",f),t.attr("height","auto"),t.attr("src",c.getPlayurlByVid(v,t.attr("data-mpvid")?1:0,f,"auto",!0))):(t.attr("width",f),
t.attr("height",l),t.attr("src","/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid="+v)),
m||t.attr("data-vidtype","-1");
}else t.remove();
}else t.removeClass("video_iframe");
}),t;
}
function s(t){
var e=$(t),i=e.attr("data-src")||e.attr("src")||"";
return i.indexOf("//mp.weixin.qq.com/mp/getcdnvideourl?")>=0?1:/^http(s)*:\/\/z\.weishi\.com\/weixin\/player\.html/.test(i)?2:/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(i)||i.indexOf("/cgi-bin/readtemplate?t=tmpl/video_tmpl")>=0||/http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/.test(i)||/http(s)*\:\/\/v\.qq\.com\/txp\/iframe\/(preview|player)\.html\?/.test(i)?3:-1;
}
t("common/wx/popup.js");
var m=10,v="每篇图文最多添加十个视频",c=(t("biz_common/utils/url/parse.js"),t("common/wx/media/videoUtils.js")),f=t("common/wx/dialog.js"),u=t("common/wx/Tips.js"),l=t("common/wx/getVinfo.js"),h=t("common/wx/mpEditor/common/eventbus.js"),p=(t("common/wx/Cgi.js"),
t("common/wx/mpEditor/plugin/filter.js")),g={
ratio:16/9,
maxLength:m,
attrList:["data-src","class","data-vidtype","allowfullscreen","frameborder","style","height","width","src","data-ratio","data-w","scrolling","data-vh","data-vw","data-cover","data-mpvid"]
},w=(wx.cgiData,function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show(),t.can_show_reddot&&this.container.addClass("tpl_item_reddot"));
var e=this;
e.report_vid_type=[],e.can_use_txvideo=t.can_use_txvideo,e.show_share_dialog=t.show_share_dialog,
this._g={
renderId:null
};
});
return w.beforeSetContent=function(t){
var e=d($("<div></div>").html(t.html),t.isPreview,t.width);
return e.html();
},w.prototype={
getName:function(){
return"insertvideo";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var i=t.editor,r=this;
if(i){
var n=e(!0);
n||(t.getIframeLen()<g.maxLength?h.fireEvent("showVideoDialog",{
scene:"ueditor",
allowChooseLength:m-t.getIframeLen(),
canusetxvideo:!!t.can_use_txvideo,
showsharedialog:!!t.show_share_dialog
},function(e,n){
if(!(t.getIframeLen()>=m)){
if(e&&Object.isObject(e)&&(e=[e]),e&&Array.isArray(e)){
for(var a=e.length>m?m:e.length,o=0;a>o;o++){
var d=e[o];
"library"==n?(d.height=375,d.width=500,d.vid=d.content,d.vidtype=2):0==d.subtype?d.vidtype=1:1==d.subtype?d.vidtype=4:2==d.subtype?d.vidtype=5:3==d.subtype&&(d.vidtype=6);
}
e=e.slice(0,a),t.doCommand(r,"insertvideo",e),"library"==n?i.funcPvUvReport("mpvideo",a):i.funcPvUvReport("qqvideo",a);
}
return!0;
}
}):u.err(v));
}
};
},
doCommand:function(t,e,i){
console.log("insert video");
var r=t;
i=UE.utils.isArray(i)?i:[i];
for(var n,a=[],o=$(this.editor.getDocument().body).width(),d=Math.round(o/g.ratio),s=0,m=i.length;m>s;s++){
n=i[s];
var v="";
n.vidtype&&(v+="data-vidtype='"+n.vidtype+"'"),n.is_mp_video&&(v+=' data-mpvid="'+n.vid+'"'),
n.cover&&(v+=' data-cover="'+encodeURIComponent(n.cover)+'"'),a.push(c.creatInsertStr({
vid:n.vid,
width:o,
height:d,
attr:v,
editFrame:!0
}));
}
r.execCommand("inserthtml",a.join(""),!0);
},
addListener:function(t){
var i=this;
t.addListener("ready",function(){
var t=this;
i._g.renderId&&clearTimeout(i._g.renderId),i._g.renderId=setTimeout(function(){
i.filterInputData($(t.body),!1);
},0);
}),t.addListener("beforepaste",function(t,r){
var n=i.filterInputData($("<div></div>").html(r.html)),a=n.find("iframe.video_iframe").length;
if(n.find(".img_loading[data-vid]").remove(),a){
var o=e(!0);
if(o)return r.html="",!0;
}
return i.getIframeLen()+a>g.maxLength?(u.err(v),r.html="",!0):void(r.html=n.html());
}),t.addListener("afterpaste aftersetcontent afterinserthtml",function(e,a,o){
var d=$(o),s=d.filter("iframe.video_iframe").add(d.find("iframe.video_iframe"));
s.each(function(){
var e=$(this);
if(!e.attr("data-ratio")||!e.attr("data-w")){
var a=e.data("src")||e.attr("src")||"";
if(a){
var o=n("vid",a);
o&&!function(t,e){
var n=t.attr("data-mpvid")?!0:!1;
e.delegateDomAsyn({
dom:t,
timeout:15e3,
requsetFun:function(){
var t=this;
n?l.getMpVideoInfo({
vid:o,
onSuccess:function(e){
t.requsetSucFun(e);
},
onError:function(){
t.requsetFailFun();
}
}):l.getInfoByVid({
vid:o,
onSuccess:function(e){
t.requsetSucFun(e);
},
onError:function(){
t.requsetFailFun();
}
});
},
requsetSucFun:function(t,e){
if(t&&t.newDom){
var n,a;
if(e&&e.data&&(n=e.data.width||0,a=e.data.height||0),0!=n&&0!=a){
var o=n/a;
t.newDom.attr("data-ratio",o).attr("data-w",n).attr("height",Math.round(t.newDom.attr("width")/r(o))),
i.editor.ueditor.fireEvent("adjustheight");
}
}
},
requsetFailFun:function(t){
t&&t.newDom&&t.newDom.removeAttr("data-ratio").removeAttr("data-w");
}
});
}(e,t,o);
}
}
});
}),t.addListener("keydown",function(t,e){
var i=this.selection.getRange();
if(i.endOffset!==i.startOffset){
var r=i.startContainer,n=null;
if(r){
var a=r.nodeType;
1===a?n=r.children[i.endOffset-1]:3===a&&(n=r.parentNode);
}
if(n&&1===n.nodeType&&n.className.indexOf("video_iframe")>=0){
var o=e.keyCode||e.which;
if(13===o){
var d=n.parentNode,s=d.childNodes;
if(i.endOffset<s.length){
var m=this.document.createElement("p");
m.style.textAlign="center";
for(var v=i.startOffset;v>=0;v--)m.appendChild(s[0]);
d.insertAdjacentElement("beforebegin",m);
var c=d;
d=d.previousElementSibling,0===c.childNodes&&c.parentNode.removeChild(c);
}
return d.insertAdjacentHTML("afterend","<p><br></p>"),i.selectNodeContents(d.nextElementSibling).select(),
e.preventDefault(),this.fireEvent("saveScene"),!0;
}
}
}
});
},
getIframeLen:function(){
var t=this.editor.getDocument();
return $(t).find("iframe.video_iframe").length;
},
getContainer:function(){
return this.domid;
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),i=e&&"edui-faked-video"==e.className;
return i?1:0;
};
},
initPluginData:function(){
return["video_id","vid_type","shortvideofileid"];
},
getPluginData:function(t){
var e=t.init(this.initPluginData());
if(e.get("content")){
var i=this,r=$("<div></div>"),a=[],d=[],s=[];
return r.html(e.get("content")).find("iframe").each(function(){
var t=$(this),e=i.getTypeByDom(t),r=(t.attr("data-shortvideofileid"),t.attr("src")||t.attr("data-src")||""),s=t.attr("data-vidtype");
if(1==e)t.remove();else if(2==e)t.remove();else if(3==e){
var m=n("vid",r);
m&&(t.attr("data-src",c.getPlayurlByVid(m,t.attr("data-mpvid")?1:0,500,375)),t.removeAttr("src"),
t.addClass("video_iframe"),t.removeClass("wx_video_iframe"),t.removeAttr("width"),
t.removeAttr("height"),t.removeAttr("data-vh"),t.removeAttr("data-vw"),p.filterStyleAttr(t,["width","height"]),
o(t[0]),a.push(m),d.push(s||"-1"));
}else t.removeClass("video_iframe");
}),e.set("content",r.html()),e.set("video_id",a.join(",")),e.set("vid_type",d.join(",")),
e.set("shortvideofileid",s.join("|")),e;
}
},
getTypeByDom:function(t){
return s(t);
},
filterInputData:function(t,e){
var i=$(this.editor.getDocument().body).width();
return d(t,e,i);
},
beforeSetContent:function(t,e){
var i=$(this.editor.getDocument().body).width();
return w.beforeSetContent({
html:t,
isPreview:e,
width:i
});
}
},function(){
top.window.__crossFun||(top.window.__crossFun={});
var t=top.window.__crossFun;
t.__videoFrameClick||(t.__videoFrameClick=function(t){
var e=t.event.target||t.event.srcElement;
if(e){
var i=$(e);
if(i.hasClass("js_play_btn")&&!g.previewVideo){
var n,o,d=0;
t.win&&t.win.parent&&t.win.parent.document&&(n=a(t.win.parent.document,t.vid)),n&&n.length>0&&(o=n.attr("data-ratio"),
d=n.attr("data-mpvid")?1:0),o=r(o),g.previewVideo=!0,c.showVideoPreviewDialog({
vid:t.vid,
radio:o,
is_mp_video:d,
onClose:function(){
g.previewVideo=!1,setTimeout(function(){
window.__editorIframeSelect(t.win);
},0);
}
});
}else!!window.__editorIframeSelect&&window.__editorIframeSelect(t.win);
}
});
}(),w;
});define("common/wx/mpEditor/plugin/adv.js",["common/wx/popup.js","common/wx/Cgi.js","common/wx/media/adDialog.js","common/wx/Tips.js","biz_web/lib/store.js","tpl/media/dialog/auto_insert_tip_dialog.html.js","utils/common.js","common/wx/const.js","common/wx/mpEditor/common/eventbus.js"],function(t){
"use strict";
t("common/wx/popup.js");
var e=t("common/wx/Cgi.js"),i=t("common/wx/media/adDialog.js"),n=t("common/wx/Tips.js"),r=(t("biz_web/lib/store.js"),
t("tpl/media/dialog/auto_insert_tip_dialog.html.js"),t("utils/common.js")),o=t("common/wx/const.js"),a=(t("common/wx/mpEditor/common/eventbus.js"),
o.insertAdModeMap),d=o.maxArticleAdCount,s=o.maxArticleAutoInsertAdCount,c="iframe.js_cpc_area",m=function(t){
var e=this;
t&&t.container&&(this.container=$(t.container).show(),t.can_show_reddot&&this.container.addClass("tpl_item_reddot")),
0==t.has_ad&&this.container&&this.container.length>0&&this.container.addClass("disabled"),
this.can_see_ad=t.can_see_ad||!1,this.info=t.info,document.addEventListener("EditorCpcEdit",function(){
console.log("触发iframe EditorCpcEdit"),e._editCpc(a.op);
}),document.addEventListener("EditorCpcDel",function(t){
console.log("触发iframe EditorCpcDel"),e._delCpc(t.adId);
});
};
return m.beforeSetContent=function(t){
if(!t.html)return"";
var e=t.html.replace(/<mpcpc([^>]*?)js_editor_cpcad([^>]*?)><\/mpcpc>/g,"<iframe $1js_editor_cpcad$2></iframe>"),i=$("<div>"+e+"</div>");
return t.can_see_ad||(i=m.filterData(i)),i.html();
},m.filterData=function(t){
return t.find("mpcpc").remove(),t.find("iframe.js_cpc_area").remove(),t;
},m.prototype={
getName:function(){
return"insertad";
},
getContainer:function(){
return this.container;
},
noCommandReprot:function(){
return!0;
},
fireSetArticleAdModeEvent:function(t){
this.editor.fireEvent("setArticleAdMode",t);
},
fireSetArticleAdCategoriesListEvent:function(t){
this.editor.fireEvent("setArticleAdCategoriesList",t);
},
saveToGlobalSetting:function(t,i,n){
t&&e.post({
url:"/merchant/ad_seller_manager?action=set_ad_setting",
data:{
insert_ad_mode:i,
categories_list:JSON.stringify(n)
}
});
},
getExecCommand:function(t){
var e=this;
return function(){
var r=e.editor,o=this;
if(!r)return!1;
var m=$(r.getDocument()).find(c),l=m.attr("data-category_id_list"),_=m.length,p=_>=d,f=$(".js_appmsg_item.current").data("insertadmode")===a.auto,u="block"===$(".appmsg_edit_ad_preview").css("display"),h=p?d:f?s:1;
return $("#js_pay_setting_area .js_pay_setting_radio").eq(1).parent().hasClass("selected")?(n.err("付费图文不可插入广告"),
!1):(p||f||u)&&!t?(n.err(f?"已插入智能插入文中广告，无法继续插入其他广告，可在编辑器底部进行修改":u?"已插入互选广告，无法继续插入其他广告":"每篇图文消息只可插入"+h+"个广告卡片"),
!1):wx.cgiData.has_ad?void new i({
showStep2:t,
articleAdCount:_,
insertAdMode:_?a.op:void 0,
cpc_edit_data:_?{
category_id_list:l?l.split("|"):l
}:void 0,
idx:$(".js_appmsg_item.current").data("msgindex"),
onOK:function(t){
e.insertOrEditAd(o,t);
}
}):(n.err("暂无可插入的广告卡片"),!1);
};
},
insertOrEditAd:function(t,e,i){
var n=this.editor,r=e.insertAdMode,o=e.category_id_list,d=!!e.ad_id;
if(r=d?a.none:r,this.fireSetArticleAdModeEvent(r),n.fireEvent("editAd"),r!==a.op&&this._delCpc(),
d)return void this._insertSponsor(t,e);
if(r===a.auto)return this.fireSetArticleAdCategoriesListEvent(o),void this.saveToGlobalSetting(e.ifSaveToGlobal,r,o);
r!==a.op||i&&i===a.op||this._insertCpcCatsItems(n,o);
var s=$(n.getDocument());
s.find(c).attr("data-category_id_list",o.join("|")),n.fireEvent("hideAllErrMsg");
},
initPluginData:function(){},
beforeSetContent:function(t){
return m.beforeSetContent({
html:t,
can_see_ad:this.can_see_ad
});
},
addListener:function(t){
var e=this;
t.addListener("beforepaste",function(t,i){
var n=$("<div>"+i.html+"</div>");
n=e._filterData(n),i.html=n.html();
}),t.addListener("openCpcSetting",function(){
e._editCpc(a.auto);
});
},
getPluginData:function(t){
var e=t.init(this.initPluginData()),i=e.get("content");
if(i){
var n=$("<div>"+i+"</div>");
this.can_see_ad||(n=this._filterData(n)),e.set("content",n.html().replace(/<iframe([^>]*?)js_editor_cpcad([^>]*?)><\/iframe>/g,"<mpcpc $1js_editor_cpcad$2></mpcpc>"));
}
},
dispatchEventToIframe:function(t,e){
var i=t.contentDocument,n=i.createEvent("Event");
n.initEvent("SetAdValidStatus",!0,!0),n.invalidReasons=e,i.dispatchEvent(n);
},
check:function(t){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=this,n=t.html(),d=o.textCountAroundAd,s="js_editor_cpcad",m=e.articleData;
if(-1!==n.indexOf(s)){
for(var l,_=n.split(s),p=[],f=0;f<_.length;f++)f&&(_[f]="<mpcpc "+_[f]),f<_.length-1&&(_[f]+=">"),
p.push(r.getHtmlText(_[f]).length>=d);
return l=-1===p.indexOf(!1),setTimeout(function(){
for(var t,e,n=!0,r=$(i.editor.getDocument()).find(c),o=0;o<r.length;o++){
t=[];
var a=r[o];
if(p[o]||(t.push((o?"距离前一个广告卡片未满":"广告卡片前未满")+d+"个字符"),i.editor.fireEvent("reportAddNum",127648,33,1)),
p[o+1]||(t.push((o!==r.length-1?"距离下一个广告卡片未满":"广告卡片后未满")+d+"个字符"),i.editor.fireEvent("reportAddNum",127648,34,1)),
a){
i.dispatchEventToIframe(a,t),a.contentWindow.onload=function(t,e){
return function(){
i.dispatchEventToIframe(t,e);
};
}(a,t);
var s=a.contentDocument,m=s.createEvent("Event");
m.initEvent("SetAdValidStatus",!0,!0),m.invalidReasons=t,s.dispatchEvent(m);
}
n=n&&!t.length,n||e||(e=a);
}
l||i.editor.fireEvent("scrollIntoView",e,-250);
},20),l;
}
if(!e.ignoreAutoAdCheck&&m&&m.insert_ad_mode===a.auto){
var u;
try{
u=JSON.parse(m.sections);
}catch(h){
return!0;
}
for(var g=!1,v=0;v<u.length;v++)if(u[v].ad_available)return g=!0,!0;
if(!g)return i.editor.fireEvent("reportAddNum",127648,35,1),{
msg:"广告只能插入在段落之间的位置，且这个位置前后内容需要超过"+d+"个字符，文章中没有位置符合该要求（插入商品时不受此限制）"
};
}
return!0;
},
_showErrMsg:function(t){
var e=$(this.editor.getDom()).find(".js_content_error");
this.editor.fireEvent("showErrMsg",e,t),this.editor.fireEvent("scrollIntoView",e,200);
},
_editCpc:function(t){
var e=this,n=this.editor,r=$(n.getDocument()).find(c),o=t===a.op?r.attr("data-category_id_list")||"":$(".js_appmsg_item.current").data("categorieslist");
new i({
idx:$(".js_appmsg_item.current").data("msgindex"),
articleAdCount:r.length,
insertAdMode:t,
cpc_edit_data:{
category_id_list:o?o.split("|"):o
},
editCpc:!0,
onOK:function(i){
e.insertOrEditAd(n,i,t);
}
}),console.log("_editCpc");
},
_delCpc:function(t){
var e=$(this.editor.getDocument()).find(c);
void 0!==t&&(e=e.filter(t?"[data-id="+t+"]":":not([data-id])")),e.remove(),this.editor.fireEvent("adjustheight");
},
_filterData:function(t){
return m.filterData(t);
},
_insertCpcCatsItems:function(t,e){
var i=t,n=e.join("|"),r=Date.now(),o=['<iframe js_editor_cpcad class="js_cpc_area res_iframe cpc_iframe"','src="/cgi-bin/readtemplate?t=tmpl/cpc_tmpl#',r,'" ','data-category_id_list="',n,'" ','data-id="',r,'"',"></iframe>"].join("");
i.execCommand("insertHtml",o);
},
_insertSponsor:function(t,e){
var i=t,n=$(".js_ad_preview");
n.html(template.render("js_ad_preview_tpl",e)).parent().show(),n.parent().find(".js_tag").text(0==e.trade_mode?"广告推荐":"内容定制");
var r=new UE.dom.Range(i.document);
r.selectNode(i.body.childNodes[i.body.childNodes.length-1]).select().setCursor(!0,!1);
for(var o=$(i.body),a=o.height()-16,d="",s=0;s<o.children().length;s++)a-=o.children().eq(s).outerHeight(!0);
if(a>=0)for(var s=0;s<Math.floor(a/25);s++)d+="<br/>";
0==e.trade_mode&&i.execCommand("inserthtml","<p>"+d+e.ad_tips+"</p>",!0),i.fireEvent("scrollIntoView",n,$(window).height()-n.height()-72-30);
}
},m;
});