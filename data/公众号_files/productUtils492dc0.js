define("tpl/mpEditor/plugin/blockquote_popup.html.js",[],function(){
return'{if needBreak}\n  <div style="height:5px;display:none"></div>\n{/if}\n<div class="edui_mask_edit_blockquote js_link_popup edui_mask_edit_group with_line">\n  <div class="edui_mask_edit_meta first_child edui-clickable" onclick="$$._execCommandAndHide(\'blockquote\', undefined)">\n    <div class="edui_mask_edit_meta_inner">清除引用格式</div>\n  </div>\n  <div class="edui_mask_edit_meta edui-clickable no_extra" onclick="$$._execCommandAndHide(\'blockquote\', \'{text}\')">\n    <div class="edui_mask_edit_meta_inner">修改引用来源</div>\n  </div>\n</div>\n';
});define("tpl/mpEditor/plugin/blockquote_tips.html.js",[],function(){
return'<div class="weui-desktop-msg_blockquote weui-desktop-msg weui-desktop-msg_temp weui-desktop-msg_mini">\n  <div class="weui-desktop-msg__inner">\n    <span class="weui-desktop-msg__hd">\n      <em class="weui-desktop-icon-info weui-desktop-icon_msg"></em>\n    </span>\n    <div class="weui-desktop-msg__bd">\n      <h4 class="weui-desktop-msg__title">引用字数：<span id="js_blockquote_tips_len">{len}</span>/300（单次引用不得超过300字，避免不合理引用）</h4>\n    </div>\n  </div>\n</div>';
});define("tpl/mpEditor/plugin/blockquote_source.html.js",[],function(){
return'<section class="blockquote_info js_blockquote_source" data-json="{json}">\n  {if type === \'inner\'}\n    <!-- 公众号 -->\n    <span class="blockquote_biz">{if article.authorName}{article.authorName}，{/if}公众号：{article.nickname}<a href="{article.url}" class="blockquote_article">{article.title}</a></span>\n  {else if from !== \'\'}\n    <!-- 外部 -->\n    <span class="blockquote_other">{from}</span>\n  {/if}\n</section>';
});define("tpl/mpEditor/plugin/blockquote.html.js",[],function(){
return'<blockquote class="js_blockquote_wrap" data-type="{type === \'inner\' ? 1 : 2}" data-url="{article.url || \'\'}" data-author-name="{article.authorName || \'\'}" data-content-utf8-length="{digestLen}" data-source-title="{article.title || from || \'\'}">\n  <section class="js_blockquote_digest">{=digest}</section>\n  {=sourceDom}\n</blockquote>';
});define("common/wx/mpEditor/plugin/basePlugin.js",["common/wx/mpEditor/common/base_class.js"],function(o){
"use strict";
var m=o("common/wx/mpEditor/common/base_class.js"),n=m.inherit({});
return n;
});define("tpl/mpEditor/plugin/cps_template_popup.html.js",[],function(){
return'<div class="js_product_popup edui_mask_edit_group with_line edui-product-popup cps">\n  <div class="js_template primary edui_mask_edit_meta no_extra edui-clickable" onclick="$$._fireEventAndHide(\'show_cps_template_dialog\',this);">\n    <div class="edui_mask_edit_meta_inner">\n      <i class="icon_edui_mask_img icon_edui_mask_product_theme"></i>\n      切换模版    </div>\n  </div>\n</div>';
});define("common/wx/media/cpsUtils.js",["tpl/media/product_iframe_smart_tips.html.js","tpl/media/product_highline_style.html.js","common/wx/Cgi.js","tpl/media/cps_template/list_tmpl.html.js","tpl/media/cps_template/banner_tmpl.html.js","tpl/media/cps_template/card_tmpl.html.js"],function(t){
"use strict";
function a(){
return b.category_id_book;
}
function e(){
return b.category_id_movie;
}
function r(){
return++b.datakeyUid+"_"+Math.random();
}
function i(t){
return t=(t||"").toLowerCase(),/^#[0-9a-f]{6}$/.test(t)?!0:!1;
}
function o(t){
if(!t)return"";
var a=d(t),e="";
if(a&&a.templateId){
var r=a.productData;
if(r||(r=b.copyIframeProductData[a.datakey].productData),r&&r.length>0)if(2==a.type){
var i=p(a.templateId);
if(i){
var o=[];
for(r=[].concat(a.productData);r.length>0;)o.push(r.splice(0,i.loop));
for(var l=0,n=o.length;n>l;l++){
var c="";
c=b.smartTipsCompile({
smart_num:a.smartNum
}),e+=c,e+=m(o[l],a.templateId,a.color);
}
}
}else e=m(r,a.templateId,a.color);
}
return $("#mpcps_iframe_css").html()+e;
}
function d(t,a){
if(!t)return null;
var e=t.getAttribute("data-datakey")||"";
if(!e||!b.iframeProductData[e])return null;
if(a!==!0)return b.iframeProductData[e];
try{
return JSON.parse(JSON.stringify(b.iframeProductData[e]));
}catch(r){
return null;
}
}
function p(t){
var a=b.templateData||null;
if(!a||!a.template_list)return null;
for(var e=null,r=0,i=a.template_list.length;i>r;r++)if(a.template_list[r].template_id==t){
e=a.template_list[r];
break;
}
return e&&e.loop&&e.template_xml?e:null;
}
function l(t){
if(t=t||{},b.templateData&&"function"==typeof t.callback)return void t.callback(b.templateData);
b.templateData={
default_template_id:"banner",
template_list:[{
template_id:"banner",
template_xml:C,
loop:1
},{
template_id:"list",
template_xml:I,
loop:1
},{
template_id:"card",
template_xml:j,
loop:1
}]
};
var a=!1;
0==location.href.indexOf("http://dev")&&(a=!0);
for(var e=0,r=b.templateData.template_list.length;r>e;e++){
var i=b.templateData.template_list[e];
i.name||(i.name="模版"+(e+1)),i.color=b.defaultColor,i.pic_cover_url=i.pic_cover_url||"",
0==i.pic_cover_url.indexOf("http")||a||(i.pic_cover_url="https://res.wx.qq.com"+i.pic_cover_url);
}
"function"==typeof t.callback&&t.callback(b.templateData);
}
function n(t){
if(t.category_id==e()){
var r="";
t.movie.actor.forEach(function(t){
0!=r.length&&0!=t.length&&(r+="/"),r+=t;
}),t.cps_desc=r,t.cps_desc_long="主演："+r;
}else if(t.category_id==a()){
var i="";
t.book.author.forEach(function(t){
0!=i.length&&0!=t.length&&(i+="/"),i+=t;
}),t.cps_desc=i,t.cps_desc_long="作者："+i;
}
}
function c(t){
if(void 0!=t&&0!=t.length){
var a=0,e=0,r=[],i=[],o=[];
t.dataList.forEach(function(t){
t.dataValue.appid&&a++,t.dataValue.appuin&&e++,r.push(t.dataValue.appid||""),o.push(t.dataValue.appuin||""),
i.push(t.dataValue.productId[0]);
}),D.post({
url:"/cgi-bin/cpsproductmaterial?action=batch_get_product_info",
data:{
appid_list:a?encodeURI(r.join(";")):"",
appuin_list:e?encodeURI(o.join(";")):"",
pid_list:encodeURI(i.join(";"))
}
},function(a){
if(a&&a.base_resp&&0==a.base_resp.ret&&0!=a.product_list.length){
var e={};
a.product_list.forEach(function(t,a){
n(t);
var r=t.appid+"_"+t.pid,i=o[a]?o[a]+"_"+t.pid:"";
e[r]=t,i&&(e[i]=t);
}),t.dataList.forEach(function(t){
var a=t.dataValue,r=a.appid+"_"+a.productId[0],i=a.appuin?a.appuin+"_"+a.productId[0]:"",o=e[r]||e[i];
b.iframeProductData[t.datakey].productData||(b.iframeProductData[t.datakey].productData=[]),
b.iframeProductData[t.datakey].productData[0]=o,b.copyIframeProductData[t.datakey]=b.iframeProductData[t.datakey];
}),t.onSuccess&&t.onSuccess();
}else t.onError&&t.onError();
});
}
}
function s(t,a,e){
$(a).find("img").each(function(){
this.onload=u(t,a,e),this.onerror=u(t,a,e);
var r=this.getAttribute("data-src");
this.src=r;
});
}
function u(t,a,e){
return function(){
var r=this;
if(r.onload=null,r.onerror=null,this.className.indexOf(".js_cover")&&$(this).parents(".js_list_container").length>0){
var i=this.parentNode;
if(i){
var o=document.createElement("span");
o.className=this.className,o.style.background='url("'+this.src+'") no-repeat center',
i.insertBefore(o,this),i.removeChild(this);
}
}
setTimeout(function(){
var r=a.ownerDocument,i=r?r.defaultView||r.parentWindow:null;
if(i&&t&&t.contentWindow===i){
var o=$(a).outerHeight()+24;
if($(t).css({
height:o+"px"
}),"undefined"!=typeof e){
var d=window.UE.instants["ueditorInstant"+e];
d&&(b.adjustheightId&&(clearTimeout(b.adjustheightId),b.adjustheightId=null),b.adjustheightId=setTimeout(function(){
d.fireEvent("adjustheight");
},50));
}
}
},0);
};
}
function m(t,r){
t[0].category_id==a()&&(r="list");
var i=p(r);
if(!i)return"";
for(var o=i.template_xml,d=Math.min(i.loop,t.length),l={
url:"url",
title:"title",
desc:"cps_desc_long",
source_logo_url:"source_logo_url",
source_name:"source_name",
img_url:"img_url",
appid:"appid",
appuin:"appuin",
pid:"pid",
price:"price",
templateid:r
},n=0;d>n;n++){
var c=t[n];
for(var s in l){
var u=new RegExp("\\{\\{"+s+"\\}\\}","g"),m="";
m="undefined"!=typeof c[l[s]]?c[l[s]]:l[s],o=o.replace(u,m);
}
}
var f=$("<div>").html(o),_=1;
return f.find("."+b.appmsgLoopClass).each(function(){
_>d&&$(this).remove(),_++;
}),0==t[0].has_commission&&(f.find(".js_cps_adTag").hide(),f.find(".js_btn_word").text("详情")),
1==t[0].ad_block_status?f.find(".js_cps_check_fail").show():f.find(".js_cps_check_fail").hide(),
"list"==r&&(t[0].category_id==a()||t[0].category_id==e()?(f.find(".js_price").removeClass("show"),
f.find(".js_price").addClass("hide"),f.find(".js_desc").removeClass("hide"),f.find(".js_desc").addClass("show")):(f.find(".js_price").removeClass("hide"),
f.find(".js_price").addClass("show"),f.find(".js_desc").removeClass("show"),f.find(".js_desc").addClass("hide"),
f.find(".js_title").addClass("line2"))),t[0].category_id!=e()&&f.find(".js_product_container").addClass("cps_inner_book"),
f.html();
}
function f(t){
if(!t||!t.productData)return null;
for(var a=[],e=0;e<t.productData.length;e++){
var i=g(t.productData[e]);
a.push(i);
}
var o=r();
return b.iframeProductData[o]={
type:t.type,
productData:a,
templateId:t.templateId,
productId:t.productId,
packId:t.packId,
smartNum:t.smartNum,
color:t.color,
categoryid:t.categoryid,
appuin:t.appuin,
report:t.report
},b.copyIframeProductData[o]=b.iframeProductData[o],o;
}
function _(t){
var a=t.getAttribute("data-datakey")||"";
a||(a=r(),t.setAttribute("data-datakey",a));
var e={
datakey:a,
productId:t.getAttribute("data-pid"),
appid:t.getAttribute("data-appid"),
appuin:t.getAttribute("data-appuin"),
categoryid:t.getAttribute("data-categoryid"),
templateId:t.getAttribute("data-templateid"),
report:t.getAttribute("data-report")
};
try{
e.productId=decodeURIComponent(e.productId).split(b.pidSplitKey);
}catch(i){
e.productId=e.productId.split(b.pidSplitKey);
}
return b.iframeProductData[a]=e,{
datakey:a,
dataValue:e
};
}
function h(t){
var a=t.getAttribute("data-datakey")||"";
if(a&&b.iframeProductData[a]){
var e=b.iframeProductData[a];
for(var r in e)if(e.hasOwnProperty(r)){
var i=e[r];
"productData"==r?t.setAttribute("data-product",""):"productId"==r?t.setAttribute("data-pid",encodeURIComponent(i.join(b.pidSplitKey))):i&&t.setAttribute("data-"+r.toLowerCase(),i);
}
}
}
function g(t){
return t&&t.pid?(b.productData[t.pid]=t,b.productData[t.pid]):null;
}
function v(t){
var a=t.getAttribute("data-datakey")||"";
if(a&&b.iframeProductData[a])try{
delete b.iframeProductData[a];
}catch(e){}
if(a&&b.copyIframeProductData[a])try{
delete b.copyIframeProductData[a];
}catch(e){}
}
var y=t("tpl/media/product_iframe_smart_tips.html.js"),D=(t("tpl/media/product_highline_style.html.js"),
t("common/wx/Cgi.js")),I=t("tpl/media/cps_template/list_tmpl.html.js"),C=t("tpl/media/cps_template/banner_tmpl.html.js"),j=t("tpl/media/cps_template/card_tmpl.html.js"),b={
datakeyUid:+new Date,
templateData:null,
adjustheightId:null,
smartTipsCompile:template.compile(y),
productData:{},
iframeProductData:{},
appmsgContainerClass:"js_product_container",
appmsgLoopClass:"js_product_loop_content",
appmsgProductErrClass:"js_product_err_container",
defaultColor:"#fa7834",
pidSplitKey:",#%$&",
category_id_book:3,
category_id_movie:2,
copyIframeProductData:{}
};
return{
validColor:i,
defaultColor:b.defaultColor,
pidSplitKey:b.pidSplitKey,
appmsgContainerClass:b.appmsgContainerClass,
appmsgLoopClass:b.appmsgLoopClass,
appmsgProductErrClass:b.appmsgProductErrClass,
getIframeContentByIframe:o,
getIframeContent:m,
getOptionsFromIframe:d,
getTemplateDataById:p,
getTemplate:l,
addIframeImgLoadEvent:s,
getDataFromCustomTag:_,
setData2CustomTag:h,
cacheIframeData:f,
clearIframeProductDataByDom:v,
updateCpsData:c,
dealCpsData:n,
getBookCategoryId:a,
getMovieCategoryId:e
};
});define("common/wx/media/cpsTemplateDialog.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/media/cpsUtils.js","common/wx/mpEditor/utils.js","tpl/media/cps_template_dialog.html.js","tpl/media/product_style_dialog_content.html.js"],function(t){
"use strict";
function e(t){
this._o={
color:i.defaultColor,
templateId:"banner",
showType:"banner",
productData:null,
editor:null
},this._g={
dom:{}
},this._extend(t),this.initDialog();
}
t("common/wx/popup.js");
var o=t("common/wx/Tips.js"),i=t("common/wx/media/cpsUtils.js"),n=t("common/wx/mpEditor/utils.js"),s=t("tpl/media/cps_template_dialog.html.js"),a=t("tpl/media/product_style_dialog_content.html.js");
return e.prototype={
_extend:function(t){
for(var e in t)this._o[e]=t[e];
},
renderList:function(t){
for(var e=this,o=[],a=0,l=t.template_list.length;l>a;a++){
for(var d=t.template_list[a],c=d.template_id,r=d.loop,m=[],p=0;r>p;p++)m.push(this._o.productData);
o.push({
name:d.name,
id:c,
cover:d.pic_cover_url||"",
html:function(t,e,o){
return n.createLocalIframe({
attr:{
style:"width:100%"
},
$dom:e,
onIframeReadyFunc:function(e){
e.doc.body.innerHTML=t,o(e.iframe,e.doc.body);
}
});
}(i.getIframeContent(m,c,this._o.color),this._g.dom.$content,i.addIframeImgLoadEvent)
});
}
var _=wx.T(s,{
show_type:e._o.showType,
select_id:e._o.templateId
});
this._g.dom.$content.html(_),this.bindEvent();
},
initDialog:function(){
var t=this,e=this._o,n=this._g,s=n.dom;
e.editor&&e.editor.fireEvent("handleWinScroll",!1),s.$dialog=$(wx.T(a,{})).popup({
height:610,
width:925,
title:"选择卡片模版",
autoShow:!0,
className:"dialog_product_template",
buttons:[{
text:"确定",
type:"primary",
classWrap:"js_save_btn",
click:function(){
if(!t._o.templateId)return void o.err("请选择卡片模版");
var e=this;
t.destory(e),t._o.callback({
id:t._o.templateId
});
}
},{
text:"取消",
type:"default",
classWrap:"js_cancel_btn",
click:function(){
t.destory(this);
}
}],
onHide:function(){
t.destory(this);
}
}),s.$saveBtn=s.$dialog.find(".js_save_btn"),s.$cancelBtn=s.$dialog.find(".js_cancel_btn"),
s.$content=s.$dialog.find(".js_content"),i.getTemplate({
callback:function(e){
t.hasLive&&t.renderList(e);
}
});
},
bindEvent:function(){
var t=this,e=this._g.dom;
e.$content.find(".js_cps_template").click(function(){
var o=$(this).data("id");
e.$content.find(".js_cps_template.selected").removeClass("selected"),$(this).addClass("selected"),
t.select(o);
});
},
select:function(t){
this._o.templateId=t;
},
hasLive:function(){
return this._g.dom&&this._g.dom.$dialog?!0:!1;
},
destory:function(t){
t&&t.remove(),this._g.dom=null,this._g.productListObj=null,this._o.editor&&this._o.editor.fireEvent("handleWinScroll",!0);
}
},{
myclass:e
};
});define("tpl/mpEditor/plugin/product_popup_icon.html.js",[],function(){
return'{each list as item}\n<span data-color="{item}" class="js_color_icon product-color__item" style="background-color: {item}"></span>\n{/each}';
});define("tpl/mpEditor/plugin/product_popup.html.js",[],function(){
return'<div class="js_product_popup edui_mask_edit_group with_line edui-product-popup">\n    <div class="js_template primary edui_mask_edit_meta no_extra edui-clickable" onclick="$$._fireEventAndHide(\'show_product_template_dialog\',this);">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_product_theme"></i>\n        选择模版        </div>\n    </div>\n	<div class="js_toggle primary edui_mask_edit_meta edui-clickable" onclick="$$._fireEvent(\'toggle_product_color\',arguments[0]||event,this);">\n        <div class="js_toggle edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_product_color"></i>\n        选择配色        </div>\n        <div class="js_color_picker product-color" style="display: none;">\n            <div class="product-color__list" onclick="$$._fireEvent(\'product_color_pick\',arguments[0]||event,this);">\n                {=colorList}\n            </div>\n            <div>\n                <span class="frm_input_box">\n                    <input type="text" class="js_color_input frm_input" placeholder="请输入色值，如#666666" onkeyup="$$._fireEvent(\'product_color_change\',arguments[0]||event,this);">\n                </span>\n            </div>\n            <p class="js_fail frm_msg fail" style="display: none;">\n                <span class="js_fail_msg frm_msg_content" style="display: inline;"></span>\n            </p>\n            <div class="product-color__description">一篇文章中只能使用一种自定义颜色，对所有默认模版生效</div>\n            <div class="product-color__opr"><a href="javascript:;" onclick="$$._fireEvent(\'product_color_change\',arguments[0]||event,this);return false;" class="btn btn_primary">确定</a></div>\n        </div>\n    </div>\n</div>\n';
});define("common/wx/mpEditor/utils.js",[],function(){
"use strict";
function e(){
return l.uid++;
}
function t(e,t){
return(l.ie&&l.version<9?"":"<!DOCTYPE html>")+"<html xmlns='http://www.w3.org/1999/xhtml' style='overflow:hidden;'><head></head><body></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){window.parent.parent.window.__templateCardIframeReady(document,'"+e+"','"+(t||"")+"');var _tmpScript = document.getElementById('_initialScript');if(_tmpScript&&_tmpScript.parentNode){_tmpScript.parentNode.removeChild(_tmpScript);}},0)</script></html>";
}
function n(t){
var n=e();
i(t,n);
var a="";
if(t.attr)for(var c in t.attr)t.attr.hasOwnProperty(c)&&(a+=" "+c+'="'+t.attr[c]+'"');
var o="<iframe "+a+' data-uid="'+n+'" src="#src#"></iframe>';
return t.noSrc===!0?o.replace("#src#","about:blank"):o.replace("#src#",r(n,t.uid));
}
function r(e,t){
return"javascript:void(function(){window.parent.parent.window.__templateCardIframeWrite(document,'"+e+"','"+(t||"")+"');}())";
}
function a(e){
try{
delete l.iframeReadyFunc[e];
}catch(t){}
}
function i(e,t){
function n(e){
return function(t){
var n,r=t.uid,a=e.$dom;
return a||(a=$(t.win.parent.document.body)),a&&a.length>0&&(n=a.find("iframe[data-uid="+r+"]"),
n=n&&n.length>0?n[0]:null),n||(n=$(document.body).find("iframe[data-uid="+r+"]"),
n=n&&n.length>0?n[0]:null),n&&("function"==typeof e.onIframeReadyFunc&&e.onIframeReadyFunc({
doc:t.doc,
win:t.win,
iframe:n
}),e.iframeSelect===!0&&window.__editorIframeSelect&&$(t.doc.body).on("click",function(){
var e=this.ownerDocument,t=e?e.defaultView||e.parentWindow:null;
t&&window.__editorIframeSelect(t);
})),e;
};
}
e&&(e.uid?l.iframeReadyFunc[e.uid]&&e.force!==!0||(l.iframeReadyFunc[e.uid]=n(e)):t&&(l.iframeReadyFunc[t]=n(e)));
}
function c(e){
e.prototype.bindEventInterface=function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},e.prototype.unbindEventInterface=function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},e.prototype.unbindSpecifyEvent=function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var r=this.__EventInterfaceCache[t];
if(r.type===e.type&&r.eventName===e.eventName&&r.fun===e.fun&&(!e.dom||e.dom&&r.dom===e.dom)){
"domUtils"==r.type?this.domUtils.un(r.dom,r.eventName,r.fun):"editor"==r.type&&this.editor.removeListener(r.eventName,r.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
};
}
function o(e){
if(e&&0!=e.length){
var t=l.asynRenderIframeKey++;
l.asynRenderIframeId[t]=null,f(e,t,function(e){
e.replaceTagName("iframe");
});
}
}
function d(e){
if(e&&0!=e.length){
var t=l.asynRenderIframeKey++;
l.asynRenderIframeId[t]=null,f(e,t,function(e){
e.attr("src",e.attr("src"));
});
}
}
function f(e,t,n){
if(e&&0!=e.length){
var r=function(){
var r=+new Date;
if(e&&e.length>0)if(l.asynRenderIframeId[t]){
var a=r-l.asynRenderIframeId[t];
if(l.asynRenderIframeId[t]=r,120>a){
var i=e.shift(),c=i.parent();
c&&c.length>0?n(i):e=[];
}
}else l.asynRenderIframeId[t]=r;
f(e,t,n);
};
window.requestAnimationFrame(r);
}else try{
delete l.asynRenderIframeId[t];
}catch(a){}
}
function m(e){
for(var t,n=[/^http(s)?:\/\/vpic\.video\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/shp\.qpic\.cn([\/?].*)*$/i],r=0;t=n[r++];)if(t.test(e))return!0;
return!1;
}
function u(e){
e=e||"";
var t="";
return 0==e.length?"":(t=e.replace(/&lt;/g,"<"),t=t.replace(/&gt;/g,">"),t=t.replace(/&nbsp;/g,"    "),
t=t.replace(/&#039;|&#39;/g,"'"),t=t.replace(/&#047;|&#47;/g,"/"),t=t.replace(/&#092;|&#92;/g,"\\"),
t=t.replace(/&quot;/g,'"'),t=t.replace(/&amp;/g,"&"),t=t.replace(/<br>/g,"\n"),t=t.replace(/<br\/>/g,"\n"),
t=t.replace(/<br \/>/g,"\n"));
}
var s=navigator.userAgent.toLowerCase(),l={
uid:+new Date,
iframeReadyFunc:{},
ie:/(msie\s|trident.*rv:)([\w.]+)/.test(s),
version:0,
edge:/edge\/([\w.]+)/i.test(s),
asynRenderIframeKey:+new Date,
asynRenderIframeId:{}
};
return function(e,t){
if(e.ie){
var n=t.match(/(?:msie\s([\w.]+))/),r=t.match(/(?:trident.*rv:([\w.]+))/);
e.version=n&&r&&n[1]&&r[1]?Math.max(1*n[1],1*r[1]):n&&n[1]?1*n[1]:r&&r[1]?1*r[1]:0;
}
}(l,s,window),function(e,t){
"function"!=typeof e.__templateCardIframeWrite&&(e.__templateCardIframeWrite=function(e,n,r){
e.open(),e.write(t(n,r)),e.close();
});
}(window,t),function(e,t){
"function"!=typeof e.__templateCardIframeReady&&(e.__templateCardIframeReady=function(e,n,r){
var a,i;
if(i=r?t[r]:t[n],"function"==typeof i&&e){
var c=e.defaultView||e.parentWindow;
c&&(a=i({
uid:n,
customerUid:r,
doc:e,
win:c
}));
}
if(!a||a.notClear!==!0)try{
delete t[n];
}catch(o){}
});
}(window,l.iframeReadyFunc),{
getuid:e,
getIframeSrc:r,
createIframeReadyFunc:i,
createLocalIframe:n,
clearIframeReadyFunc:a,
initEventInterface:c,
createAsynRenderIframe:o,
createAsynIframeReload:d,
isOuterWhiteDomain:m,
htmlDecode:u
};
});define("common/wx/mpEditor/plugin/productUtils.js",["tpl/media/product_iframe_smart_tips.html.js","tpl/media/product_highline_style.html.js","common/wx/Cgi.js"],function(t){
"use strict";
function a(){
return++v.datakeyUid+"_"+Math.random();
}
function e(t){
return t=(t||"").toLowerCase(),/^#[0-9a-f]{6}$/.test(t)?!0:!1;
}
function r(t){
if(!t)return"";
var a=o(t),e="";
if(a&&a.templateId){
var r=a.productData;
if(r&&r.length>0)if(2==a.type){
var l=i(a.templateId);
if(l){
var n=[];
for(r=[].concat(a.productData);r.length>0;)n.push(r.splice(0,l.loop));
for(var p=0,d=n.length;d>p;p++){
var c="";
c=v.smartTipsCompile({
smart_num:a.smartNum
}),e+=c,e+=u(n[p],a.templateId,a.color);
}
}
}else e=u(r,a.templateId,a.color);
}
return g+e;
}
function o(t,a){
if(!t)return null;
var e=t.getAttribute("data-datakey")||"";
if(!e||!v.iframeProductData[e])return null;
if(a!==!0)return v.iframeProductData[e];
try{
return JSON.parse(JSON.stringify(v.iframeProductData[e]));
}catch(r){
return null;
}
}
function i(t){
var a=v.templateData||null;
if(!a||!a.template_list)return null;
for(var e=null,r=0,o=a.template_list.length;o>r;r++)if(a.template_list[r].template_id==t){
e=a.template_list[r];
break;
}
return e&&e.loop&&e.template_xml?e:null;
}
function l(t){
return t=t||{},v.templateData&&"function"==typeof t.callback?void t.callback(v.templateData):void h.post({
url:"/cgi-bin/productmaterial?action=get_template_list",
mask:!1
},{
done:function(a){
if(a&&a.base_resp&&0==a.base_resp.ret&&a.template_info_list&&a.template_info_list.template_list&&a.template_info_list.template_list.length>0){
v.templateData=a.template_info_list,v.templateData.default_template_id||(v.templateData.default_template_id=v.templateData.template_list[0].template_id),
v.templateData.default_color||(v.templateData.default_color=v.defaultColor);
var e=!1;
0==location.href.indexOf("http://dev")&&(e=!0);
for(var r=0,o=v.templateData.template_list.length;o>r;r++){
var i=v.templateData.template_list[r];
i.name||(i.name="模版"+(r+1)),i.color=v.defaultColor,i.pic_cover_url=i.pic_cover_url||"",
0==i.pic_cover_url.indexOf("http")||e||(i.pic_cover_url="https://res.wx.qq.com"+i.pic_cover_url);
}
"function"==typeof t.callback&&t.callback(v.templateData);
}else"function"==typeof t.onError&&t.onError();
},
fail:function(){
"function"==typeof t.onError&&t.onError();
}
});
}
function n(t,a,e){
$(a).find("img").each(function(){
this.onload=p(t,a,e),this.onerror=p(t,a,e);
var r=this.getAttribute("data-src");
this.src=r;
});
}
function p(t,a,e){
return function(){
var r=this;
r.onload=null,r.onerror=null,setTimeout(function(){
var r=a.ownerDocument,o=r?r.defaultView||r.parentWindow:null;
if(o&&t&&t.contentWindow===o){
var i=$(a).outerHeight();
if($(t).css({
height:i+"px"
}),"undefined"!=typeof e){
var l=window.UE.instants["ueditorInstant"+e];
l&&(v.adjustheightId&&(clearTimeout(v.adjustheightId),v.adjustheightId=null),v.adjustheightId=setTimeout(function(){
l.fireEvent("adjustheight");
},50));
}
}
},0);
};
}
function u(t,a,e){
var r=i(a);
if(!r)return"";
for(var o=r.template_xml,l=Math.min(r.loop,t.length),n={
url:"url",
title:"title",
img_url:"img_url",
str_price:"str_price",
str_original_price:"str_original_price",
sub_title:"sub_title",
color:e||v.defaultColor
},p=0;l>p;p++){
var u=t[p];
for(var d in n){
var c=new RegExp("\\{\\{"+d+(p+1)+"\\}\\}","g"),s="";
s="undefined"!=typeof u[n[d]]?u[n[d]]:n[d],"str_original_price"==d&&1*s===0?s="<span class='js_delparent'></span>":"[object String]"==Object.prototype.toString.call(s)&&(s=s.html(!0)),
o=o.replace(c,s);
}
}
var m=$("<div>").html(o),f=1;
return m.find("."+v.appmsgLoopClass).each(function(){
f>l&&$(this).remove(),f++;
}),m.find(".js_delparent").parent().remove(),m.html();
}
function d(t){
if(!t||!t.productData)return null;
for(var e=[],r=0;r<t.productData.length;r++){
var o=m(t.productData[r]);
e.push(o);
}
var i=a();
return v.iframeProductData[i]={
type:t.type,
productData:e,
templateId:t.templateId,
productId:t.productId,
packId:t.packId,
smartNum:t.smartNum,
color:t.color
},i;
}
function c(t){
var e=t.getAttribute("data-product")||"";
try{
e=decodeURIComponent(e),e=JSON.parse(e);
}catch(r){
e=null;
}
var o,i;
if(e&&e.productData&&e.productData.length>0){
o=[];
for(var l=0;l<e.productData.length;l++){
var n=m(e.productData[l]);
o.push(n);
}
var p=t.getAttribute("data-datakey")||"";
p||(p=a(),t.setAttribute("data-datakey",p)),i={
productData:o,
type:t.getAttribute("data-type"),
color:t.getAttribute("data-color"),
smartNum:t.getAttribute("data-smartnum"),
packId:t.getAttribute("data-packid"),
productId:t.getAttribute("data-pid"),
templateId:t.getAttribute("data-templateid")
};
try{
i.productId=decodeURIComponent(i.productId).split(v.pidSplitKey);
}catch(r){
i.productId=i.productId.split(v.pidSplitKey);
}
v.iframeProductData[p]=i;
for(var l in i)if(i.hasOwnProperty(l)){
var u=l;
"productData"==l?u="product":"productId"==l&&(u="pid"),t.removeAttribute("data-"+u.toLowerCase());
}
}else i=null;
return i;
}
function s(t){
var a=t.getAttribute("data-datakey")||"";
if(a&&v.iframeProductData[a]){
var e=v.iframeProductData[a];
for(var r in e)if(e.hasOwnProperty(r)){
var o=e[r];
if("productData"==r)try{
t.setAttribute("data-product",encodeURIComponent(JSON.stringify({
productData:o
})));
}catch(i){
t.setAttribute("data-product","");
}else"productId"==r?t.setAttribute("data-pid",encodeURIComponent(o.join(v.pidSplitKey))):t.setAttribute("data-"+r.toLowerCase(),o);
}
}
}
function m(t){
return t&&t.pid?(v.productData[t.pid]=t,v.productData[t.pid]):null;
}
function f(t){
var a=t.getAttribute("data-datakey")||"";
if(a&&v.iframeProductData[a])try{
delete v.iframeProductData[a];
}catch(e){}
}
var _=t("tpl/media/product_iframe_smart_tips.html.js"),g=t("tpl/media/product_highline_style.html.js"),h=t("common/wx/Cgi.js"),v={
datakeyUid:+new Date,
templateData:null,
adjustheightId:null,
smartTipsCompile:template.compile(_),
productData:{},
iframeProductData:{},
appmsgContainerClass:"js_product_container",
appmsgLoopClass:"js_product_loop_content",
appmsgProductErrClass:"js_product_err_container",
defaultColor:"#fa7834",
pidSplitKey:",#%$&"
};
return{
validColor:e,
defaultColor:v.defaultColor,
pidSplitKey:v.pidSplitKey,
appmsgContainerClass:v.appmsgContainerClass,
appmsgLoopClass:v.appmsgLoopClass,
appmsgProductErrClass:v.appmsgProductErrClass,
getIframeContentByIframe:r,
getIframeContent:u,
getOptionsFromIframe:o,
getTemplateDataById:i,
getTemplate:l,
addIframeImgLoadEvent:n,
getDataFromCustomTag:c,
setData2CustomTag:s,
cacheIframeData:d,
clearIframeProductDataByDom:f
};
});