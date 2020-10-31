define("common/wx/media/productTemplateDialog.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/mpEditor/plugin/productUtils.js","common/wx/mpEditor/utils.js","tpl/media/product_style_dialog_list.html.js","tpl/media/product_style_dialog_content.html.js"],function(t){
"use strict";
function o(t){
this._o={
color:i.defaultColor,
templateId:"",
productData:null,
editor:null
},this._g={
dom:{}
},this._extend(t),this.initDialog();
}
t("common/wx/popup.js");
var e=t("common/wx/Tips.js"),i=t("common/wx/mpEditor/plugin/productUtils.js"),n=t("common/wx/mpEditor/utils.js"),s=t("tpl/media/product_style_dialog_list.html.js"),d=t("tpl/media/product_style_dialog_content.html.js");
return o.prototype={
_extend:function(t){
for(var o in t)this._o[o]=t[o];
},
renderList:function(t){
for(var o=[],e=0,d=t.template_list.length;d>e;e++){
for(var l=t.template_list[e],c=l.template_id,a=l.loop,r=[],m=0;a>m;m++)r.push(this._o.productData);
o.push({
name:l.name,
id:c,
cover:l.pic_cover_url||"",
html:function(t,o,e){
return n.createLocalIframe({
attr:{
style:"width:100%"
},
$dom:o,
onIframeReadyFunc:function(o){
o.doc.body.innerHTML=t,e(o.iframe,o.doc.body);
}
});
}(i.getIframeContent(r,c,this._o.color),this._g.dom.$content,i.addIframeImgLoadEvent)
});
}
this._g.dom.$content.html(wx.T(s,{
list:o
})),this.bindEvent();
},
initDialog:function(){
var t=this,o=this._o,n=this._g,s=n.dom;
o.editor&&o.editor.fireEvent("handleWinScroll",!1),s.$dialog=$(wx.T(d,{})).popup({
width:960,
title:"选择卡片模版",
autoShow:!0,
className:"dialog_product_template",
buttons:[{
text:"确定",
type:"primary",
classWrap:"js_save_btn",
click:function(){
if(!t._g.selected)return void e.err("请选择卡片模版");
var o=this;
t.destory(o),t._o.callback({
id:t._g.selected
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
callback:function(o){
t.hasLive&&t.renderList(o);
}
});
},
bindEvent:function(){
var t=this;
this._g.dom.$content.on("click","input[type=radio]",function(){
t._g.dom.$content.find(".js_checkbox_parent").parents().closest(".product-style").removeClass("selected");
var o=$(this);
if(o.prop("checked")){
o.parents().closest(".product-style").addClass("selected");
var e=o.attr("data-id");
t.select(e);
}
}),setTimeout(function(){
var o=t._g.dom.$content.find('input[type=radio][data-id="'+t._o.templateId+'"]');
o&&1==o.length||(o=t._g.dom.$content.find("input[type=radio]").eq(0)),o.prop("checked",!0).trigger("click");
},0);
},
select:function(t){
this._g.selected=t;
},
hasLive:function(){
return this._g.dom&&this._g.dom.$dialog?!0:!1;
},
destory:function(t){
t&&t.remove(),this._g.dom=null,this._g.productListObj=null,this._o.editor&&this._o.editor.fireEvent("handleWinScroll",!0);
}
},{
myclass:o
};
});define("common/wx/media/productDialog.js",["common/wx/popup.js","common/wx/Tips.js","common/wx/Cgi.js","tpl/media/product_select_dialog.html.js","common/wx/mpEditor/plugin/productUtils.js","media/product_list.js","tpl/media/product_dialog_upload.html.js","tpl/media/product_import_select_result.html.js","common/wx/tooltips.js","tpl/media/product_smart_tips.html.js"],function(t){
"use strict";
function i(t){
this._o={
can_use_smart:!1,
maxLen:100,
editor:null,
callback:function(){}
},this._g={
dom:{}
},this._extend(t);
var i=this;
p.templateData?this.initDialog():n.getTemplate({
callback:function(t){
p.templateData=t,i.initDialog();
}
});
}
t("common/wx/popup.js");
var e=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),a=t("tpl/media/product_select_dialog.html.js"),n=t("common/wx/mpEditor/plugin/productUtils.js"),s=t("media/product_list.js"),l=t("tpl/media/product_dialog_upload.html.js"),r=t("tpl/media/product_import_select_result.html.js"),d=t("common/wx/tooltips.js"),c=t("tpl/media/product_smart_tips.html.js"),p={
templateFileLink:wx.url("/cgi-bin/productmaterial?action=download_excel&type=2"),
templateData:null,
maxImportLen:1e3
};
return i.prototype={
_extend:function(t){
for(var i in t)this._o[i]=t[i];
},
initDialog:function(){
var t=this,i=this._o,e=this._g,o=e.dom;
i.editor&&i.editor.fireEvent("handleWinScroll",!1),o.$dialog=$(wx.T(a,{
can_use_smart:this._o.can_use_smart,
manageLink:wx.url("/cgi-bin/productmaterial?action=product_list")
})).popup({
width:925,
title:"选择商品",
autoShow:!0,
className:"dialog-select-product",
buttons:[{
text:"确定",
type:"primary",
classWrap:"js_save_btn",
click:function(){
t.getResourceId({
dialog:this,
$btn:t._g.dom.$saveBtn,
callback:function(i){
o.$saveBtn.btn(!1),t._o.callback(i);
}
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
}),o.$saveBtn=o.$dialog.find(".js_save_btn"),o.$cancelBtn=o.$dialog.find(".js_cancel_btn"),
o.$selectAllBtn=o.$dialog.find(".js_select_all"),o.$importBtn=o.$dialog.find(".js_import"),
o.$smartBtn=o.$dialog.find(".js_smart_select"),o.$smartInput=o.$dialog.find(".js_smart_count"),
o.$smartDesc=o.$dialog.find(".js_smart_desc"),o.$smartTotal=o.$dialog.find(".js_smart_total"),
o.$imporSelectFailMain=o.$dialog.find(".js_impor_select_fail_main"),o.$imporSelectFailLink=o.$dialog.find(".js_link"),
o.$pagebar=o.$dialog.find(".js_pagebar"),o.$listBody=o.$dialog.find(".js_list_body"),
o.$categoryMain=o.$dialog.find(".js_category_main"),o.$selectedCount=o.$dialog.find(".js_selected_count"),
o.$cancelSelectBtn=o.$dialog.find(".js_cancel_select"),this.beforeInitList(),this.initList(),
this.afterInitList();
},
initList:function(){
var t=this,i=this._g,e=i.dom;
i.productListObj=new s({
uploadDom:this._g.canUploadTips.$dom.find(".js_upload"),
uploadInfoDom:e.$dialog.find(".js_des_container"),
uploadInfoTpl:r,
clearUploadBtnFilter:".js_clear_import",
pageSize:5,
listContainner:e.$listBody,
categoryContianer:e.$categoryMain,
pagebarContainer:e.$pagebar,
selectAllDom:e.$selectAllBtn,
selectedCountDom:e.$selectedCount,
cancelSelectBtn:e.$cancelSelectBtn,
jumpPageSelect:!0,
disabledItem:!0,
canDelCategory:!1,
afterRenderList:function(){
e&&e.$dialog&&e.$dialog.popup("resetPosition");
},
onUploadEnd:function(){
t._g.dom.$importBtn.hide(),t._g.canUploadTips.hide();
},
onUploadClear:function(){
t._g.dom.$importBtn.show();
},
afterInitCategory:function(){
t._g.dom.$categoryMain.show();
}
});
},
beforeInitList:function(){
var t=this;
this._g.canUploadTips=new d({
container:this._g.dom.$importBtn,
position:{
left:-119
},
reposition:!0,
content:template.compile(l)({
templateFileLink:p.templateFileLink
}),
onshow:function(){
this.show(),t._g.productListObj.refreshUpload();
}
});
},
afterInitList:function(){
var t=this,i=this._g.dom;
i.$smartBtn.checkbox({
onChanged:function(i){
i.prop("checked")?t._g.dom.$smartDesc.show():t._g.dom.$smartDesc.hide();
}
}),this._g.smartTips=new d({
container:i.$dialog.find(".js_smart_tips"),
position:{
left:-137
},
reposition:!0,
content:template.compile(c)({})
});
},
getData:function(){
var t=this._g,i=t.dom,o=t.productListObj.getSelectedData();
if(!o||0==o.length)return e.err("请选择商品"),!1;
var a=o.length,n=1,s=0;
if(i.$smartBtn.prop("checked")){
var l=o.length;
if(s=parseInt(i.$smartInput.val())||0,0>=s)return e.err("个性化推荐的数量必须大于0"),!1;
if(l>200)return e.err("个性化推荐时，单次选择商品总数不能超过200"),!1;
if(1==l)return e.err("个性化推荐时，商品总数必须大于1"),!1;
if(s>l)return e.err("个性化推荐展示商品数不能大于选择的商品总数"),!1;
if(s>this._o.maxLen)return e.err("最多还能在文章中展示%s个推荐商品".sprintf(this._o.maxLen)),!1;
n=2;
}else if(a>this._o.maxLen)return e.err("最多还能选择%s个商品插入文章".sprintf(this._o.maxLen)),
!1;
var r={
type:n,
templateId:p.templateData.default_template_id,
productData:o,
productId:t.productListObj.getSelectedId(),
packId:"",
smartNum:""
};
return 2==n&&(r.smartNum=s),r;
},
getResourceId:function(t){
var i=this;
if(this._g.gettingResource!==!0){
var a=this.getData();
if(a){
if(1==a.type)return t.callback(a),void i.destory(t.dialog);
i._g.gettingResource=!0,t.$btn.btn(!1),o.post({
url:"/cgi-bin/productmaterial?action=add_product_resource",
data:{
template_id:a.templateId,
product_list:a.productId.join(n.pidSplitKey),
typenum:a.smartNum
},
mask:!1
},{
done:function(o){
t.$btn.btn(!0),i._g.gettingResource=!1,o&&o.base_resp&&0==o.base_resp.ret&&o.pack_info&&o.pack_info.pack_id?(a.packId=o.pack_info.pack_id,
t.callback(a),i.destory(t.dialog)):e.err("系统繁忙，请稍后再试");
},
fail:function(){
t.$btn.btn(!0),i._g.gettingResource=!1,e.err("系统繁忙，获取资源ID失败，请稍后再试");
}
});
}
}
},
destory:function(t){
t&&t.remove(),this._g.dom=null,this._g.smartTips&&(this._g.smartTips.destroy(),this._g.smartTips=null),
this._g.canUploadTips&&(this._g.canUploadTips.destroy(),this._g.canUploadTips=null),
this._g.productListObj&&(this._g.productListObj.destroy(),this._g.productListObj=null),
this._o.editor&&this._o.editor.fireEvent("handleWinScroll",!0);
}
},i;
});define("common/wx/mpEditor/plugin/filter.js",[],function(){
"use strict";
function e(e){
for(var t=["noscript","iframe"],r=0;r<t.length;r++){
var a="(<#targetName#\\s*[^<>]*?>)[^<\\/]+?<\\/#targetName#>".replace(/#targetName#/g,t[r]),n="$1</#targetName#>".replace(/#targetName#/g,t[r]),l=new RegExp(a,"g");
e=e.replace(l,n);
}
return e;
}
var t=function(e,t){
if(t){
e=$(e);
var r=e.attr("style");
if(r){
var a="(^|;|\\b)[^;]*#attr#\\s*:[^;]*[$;]";
"[object String]"==Object.prototype.toString.call(t)&&(t=[t]);
for(var n=0,l=t.length;l>n;n++){
var c=new RegExp(a.replace("#attr#",t[n]),"g");
r=r.replace(c,"$1");
}
e.attr("style",r);
}
}
},r=function(e){
var t="(<[^<>]*?)\\sstyle=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])",r=new RegExp(t,"g");
return e=e.replace(r,function(e,t,r,a,n,l){
var c=r||a||n||"";
if(c){
for(var c=c.split(";"),g=[],i=0,o=c.length;o>i;i++){
var p=c[i].replace(/^\s+/,"").replace(/\s+$/,"");
p&&g.push(p);
}
return t+' style="'+g.join(";")+';"'+l||"";
}
return e;
});
},a=function(e,t){
for(var r="(<#tagName#[^<>]*?)\\s#attribute#=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])",a="$1$5",n=0,l=t.length;l>n;n++){
var c=t[n],g=c[0],i=c[1],o="";
o="*"===g?r.replace("#tagName#",""):r.replace("#tagName#",g);
for(var p=new RegExp(o.replace("#attribute#",i),"g");p.test(e);)e=e.replace(p,a);
}
return e;
};
return{
formatRedundancyStr:e,
formatStyle:r,
filterStyleAttr:t,
removeAttribute:a
};
});define("common/wx/getVinfo.js",["common/wx/Cgi.js","common/wx/loadscript.js"],function(e){
"use strict";
function r(e,r){
var i="视频加载失败",t="";
switch(1*e){
case-4:
t="因版权限制，该视频不支持添加";
break;

case-5:
t="因版权限制，该视频不支持添加";
break;

case-3:
t="因版权限制，该视频不支持添加";
break;

case 61:
t="该视频不存在";
break;

case 62:
t="该视频已下架";
break;

case 63:
t="视频加载失败";
break;

case 65:
t="视频加载失败";
break;

case 67:
t="视频加载失败";
break;

case 69:
t="视频格式不支持移动端观看";
break;

case 71:
t="视频加载失败";
break;

case 73:
t="视频加载失败";
break;

case 74:
t="视频加载失败";
break;

case 80:
switch(1*r){
case 1:
t="IP地址所在地区暂不支持播放";
break;

case 2:
t="因版权限制，该视频不支持添加";
break;

default:
t="因版权限制，该视频不支持添加";
}
break;

case 81:
t="视频加载失败";
break;

case 82:
t="视频加载失败";
break;

case 83:
switch(1*r){
case-1:
t=i;
break;

case-2:
t="因版权限制，该视频不支持添加";
break;

default:
t="因版权限制，该视频不支持添加";
}
break;

case 84:
t="视频加载失败";
break;

default:
t=i;
}
return t;
}
function i(e){
var r,i;
r="function"==typeof e.onSuccess?e.onSuccess:function(){},i="function"==typeof e.onError?e.onError:function(){},
o.post({
url:wx.url("/cgi-bin/getvideockey?"),
data:{
vid:e.vid
}
},{
done:function(a){
a&&a.base_resp&&0==a.base_resp.ret&&a.ckey?n({
vid:e.vid,
ckey:a.ckey,
onSuc:function(i){
i=i||{},i.data||(i.data={}),i.data.p4_3=t(e.vid,4/3),i.data.p16_9=t(e.vid,16/9),
r(i);
},
onError:function(){
i({
code:3
});
}
}):i({
code:2,
ckeyResp:a
});
},
fail:function(){
i({
code:1
});
}
});
}
function t(e,r){
return r&&r!=16/9?"http://shp.qpic.cn/qqvideo/0/"+e+"/400":"http://shp.qpic.cn/qqvideo_ori/0/"+e+"_496_280/0";
}
function a(e){
function r(e){
2!=a||s||(s=!0,n&&c||(e="err"),"err"==e?i({
resp:{},
msg:"系统繁忙，请稍后再试"
}):(n.data.cover=c,t(n)));
}
var i="function"==typeof e.onError?e.onError:function(){},t="function"==typeof e.onSuccess?e.onSuccess:function(){},a=0,c="",n=null;
o.get({
url:"/mp/videoplayer?action=get_mp_video_play_url",
data:{
__biz:e.__biz||"",
mid:e.mid||"",
idx:e.idx||"",
vid:e.vid||""
}
},{
done:function(e){
a++;
var i,t="";
if(e&&e.base_resp&&0==e.base_resp.ret)if(e.is_mp_video_delete)t="该视频已被发布者删除";else if(e.is_mp_video_forbid)t="该视频因违规已下架";else if(e.url_info&&e.url_info.length>0){
var o=e.url_info[0],c=Math.floor(o.duration_ms/1e3);
i={
time:c,
title:e.title||"",
width:o.width,
height:o.height,
file_size:o.filesize,
totalUrl:o.url,
rate:Math.round(o.filesize/1024*8/c),
cover:""
};
}else t="系统繁忙，请稍后再试";else t="当前视频不存在，暂无法观看";
i||(i={
cover:""
}),n={
resp:e,
data:i,
err_msg:t
},r();
},
fail:function(){
a++,r("err");
}
}),o.get({
url:"/mp/videoplayer?action=get_mp_video_cover",
data:{
vid:e.vid||""
}
},{
done:function(e){
a++,e&&e.base_resp&&0==e.base_resp.ret&&e.url?(c=e.url,r()):r("err");
},
fail:function(){
a++,r("err");
}
});
var s=!1;
}
var o=e("common/wx/Cgi.js"),c=e("common/wx/loadscript.js"),n=function(e){
var i="https://h5vv.video.qq.com/getvinfo?vid=#vid#&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=#ckey#&sdtfrom=v3060";
i=i.replace("#vid#",e.vid).replace("#ckey#",e.ckey),i+="&device=60401&use_proxy_sdk=0";
var t=+new Date;
c({
url:i,
timeout:1e4,
callbackName:"video_dynamic_callback",
callback:function(i){
var a=+new Date,o=a-t;
i=i||{},"undefined"==typeof i.em&&(i.em=0);
var c,n="",s=i.em;
if(0==i.em){
if(i.exem>0?s=-4:0==i.exem&&i.vl&&i.vl.vi&&i.vl.vi[0]&&8==i.vl.vi[0].st&&(s=i.preview>0?-5:-3),
0!=s||i.vl&&i.vl.vi&&i.vl.vi[0]||(s=-2),0!=s&&(n=r(1*s,1*i.exem)),i.vl&&i.vl.vi&&i.vl.vi[0]){
var l=i.vl.vi[0];
if(c={
newVid:l.lnk,
time:l.td,
title:l.ti,
width:l.vw,
height:l.vh,
file_size:l.fs,
rate:Math.round(l.fs/1024*8/l.td)
},l.ul&&l.ul.ui&&l.ul.ui[0]){
var d=l.ul.ui[0],v=d.url+l.fn,f=i.fl,u="";
if(f&&f.cnt>0)for(var p=f.fi,m=0,_=p.length;_>m;m++)if(1*p[m].sl===1){
u=p[m].name,c.resolution=(p[m].cname||"").replace(/^.*;\((:?.*)P\)$/,"$1")||0;
break;
}
c.format=u,c.vt=d.vt,c.totalUrl=[v,-1!=v.indexOf("?")?"&":"?","vkey=",l.fvkey,"&sdtfrom=","&type=",1==d.dt?"tflv":2==d.dt||0==d.dt?"mp4":"","&platform=","&fmt=",u,"&level=",l.level,"&br=",l.br,"&sp=",l.sp].join("");
}
}
}else n=r(1*s,1*i.exem);
e.onSuc({
data:c,
oriData:i,
c_time:o,
err_msg:n||"",
ret_code:s
});
},
onerror:function(r){
var i,a=+new Date,o=a-t;
switch(1*r){
case 400:
i=-22;
break;

case 500:
i=-21;
break;

default:
i=-23;
}
"function"==typeof e.onError&&e.onError(i,{
ret_code:i,
c_time:o,
err_msg:""
});
}
});
};
return{
get:n,
getInfoByVid:i,
getMpVideoInfo:a
};
});define("common/wx/media/videoUtils.js",["common/wx/popup.js"],function(e){
"use strict";
function i(e){
e=parseInt(e,10);
var i="";
if(60>e)10>e&&(e="0"+e),i="00:"+e;else if(e>=60){
var t=Math.floor(e/60),o=(e-60*t)%60;
10>t&&(t="0"+t),10>o&&(o="0"+o),i=t+":"+o;
}
return i;
}
function t(e){
if(!e)return 0;
e=e.replace(/：/g,":");
for(var i=e.split(":"),t=0,o=1,r=i.length-1;r>=0;r--)t+=i[r]*o,o*=60;
return t;
}
function o(e){
var i;
i=$(r({
vid:e.vid,
editFrame:!1,
ratio:e.ratio||u.ratio,
is_mp_video:e.is_mp_video
})).popup({
title:"预览视频",
className:e.className||"align_edge wx_video_dialog",
width:"960",
buttons:[{
text:"关闭",
click:function(){
this.remove(),"function"==typeof e.onClose&&e.onClose();
}
}],
onClose:function(){
i.popup("remove"),i=null,"function"==typeof e.onClose&&e.onClose();
}
});
}
function r(e){
if(e.editFrame)return['<p><iframe class="video_iframe wx_video_iframe rich_pages',e.className?" "+e.className+'"':'"',e.attr?" "+e.attr+" ":"",' allowfullscreen frameborder=0 style="position:relative; z-index:1;" '," height=",e.height," width=",e.width,'  src="/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid=',e.vid,'"'," ></iframe></p>"].join("");
var i=e.width||500,t=Math.round(i/(e.ratio||u.ratio)),o=s(e.vid,e.is_mp_video,i,t);
return['<iframe class="wx_video_iframe ',e.className?" "+e.className+'"':'"',' frameborder=0 scrolling="no" '," height=",t," width=",i,'  src="'+o+'"'," ></iframe>"].join("");
}
function a(){
return 282;
}
function s(e,i,t,o,r){
return r=r===!0?!0:!1,t=t||500,o=o||375,i?"https://mp.weixin.qq.com/mp/readtemplate?t=pages/video_player_tmpl&action=mpvideo&auto=0&vid="+e:r?"https://v.qq.com/txp/iframe/player.html?vid="+e+"&width="+t+"&height=auto":"https://v.qq.com/iframe/preview.html?width="+t+"&height="+o+"&auto=0&vid="+e;
}
function n(e){
var i=0;
if("undefined"!=typeof e.create_time&&(i=e.create_time<1453914e3?1:0),0===e.status||1===e.is_mp_video&&"undefined"!=typeof e.is_mp_video_original_check_finish&&1!==e.is_mp_video_original_check_finish&&3===e.status||3===e.status&&0===e.video_ori_status&&("undefined"==typeof e.create_time||!i))return 1===e.is_mp_video&&1===e.is_mp_video_in_huiliu_check?10:0;
if(1===e.status)return 1;
if(2===e.status)return 1!==e.is_mp_video?2:1===e.is_mp_video&&0!==e.mp_video_xinan_check_result_code?2:1===e.is_mp_video&&0!==e.mp_video_modify_check_result_code?8:2;
if(3===e.status){
var t=Number(e.ori_fail_reason);
return 3===e.video_ori_status&&e.mp_video_fail_detail_wording&&e.is_mp_video||3===e.video_ori_status&&[1,3,5].indexOf(t)>-1||2===e.video_ori_status?1===e.video_reprint_status?11:2===e.video_reprint_status?12:1===e.applyori?6:7:3;
}
return 4===e.status?1===e.ext_status?2:4:5===e.status?5:9===e.status?9:-1;
}
function _(e){
var i=n(e);
return 3===i||6===i||7===i||8===i?!0:!1;
}
function d(e){
var i=n(e);
return 3===i||6===i||7===i?!0:!1;
}
e("common/wx/popup.js");
var u={
ratio:16/9
};
return{
changeTime:i,
durationStr2Sec:t,
showVideoPreviewDialog:o,
creatInsertStr:r,
getPreviewPhoneWidth:a,
getPlayurlByVid:s,
getVideoStatus:n,
canModify:_,
canMsgSend:d
};
});define("biz_common/utils/url/parse.js",[],function(){
function r(r){
var e=r.length,n=r.indexOf("?"),t=r.indexOf("#");
t=-1==t?e:t,n=-1==n?t:n;
var a=r.substr(0,n),i=r.substr(n+1,t-n-1),o=r.substr(t+1);
return{
host:a,
query_str:i,
hash:o
};
}
function e(e,n,t){
var a=r(e),i=a.query_str,o=[];
for(var s in n)n.hasOwnProperty(s)&&o.push(s+"="+(t?n[s]:encodeURIComponent(n[s])));
return o.length>0&&(i+=(""!=i?"&":"")+o.join("&")),a.host+(""!=i?"?"+i:"")+(""!=a.hash?"#"+a.hash:"");
}
function n(r,e,n,t){
r=r||location.href;
var a=r.indexOf("&"),i=r.length,o=r.replace(/^[\w\d]+:[\/\\]+/g,"").split("").reverse();
Array.prototype.indexOf||(Array.prototype.indexOf=function(r,e){
var n;
if(null==this)throw new TypeError('"this" is null or not defined');
var t=Object(this),a=t.length>>>0;
if(0===a)return-1;
var i=+e||0;
if(1/0===Math.abs(i)&&(i=0),i>=a)return-1;
for(n=Math.max(i>=0?i:a-Math.abs(i),0);a>n;){
if(n in t&&t[n]===r)return n;
n++;
}
return-1;
});
var s=i-1-o.indexOf("/");
-1!=a&&-1==r.indexOf("?")&&a>s&&(r=r.replace("&","?"));
var u=new RegExp("([\\?&]"+e+"=)[^&#]*");
if(!r.match(u)){
var h=r.indexOf("?");
return-1==h?r+"?"+e+"="+n:h==r.length-1?r+e+"="+n:r+"&"+e+"="+n;
}
return t===!0?r.replace(u,"$1"+n):r;
}
function t(r){
var e=arguments[1]||window.location.search,n=new RegExp("(^|&)"+r+"=([^&]*)(&|$)"),t=e.substr(e.indexOf("?")+1).match(n);
return null!=t?t[2]:"";
}
return{
parseUrl:r,
join:e,
addParam:n,
getQuery:t
};
});define("tpl/media/dialog/auto_insert_tip_dialog.html.js",[],function(){
return'<div class="auto_insert_tip_dialog_wrp_inner">\n    <div class="info_img">\n        <span class="circle_dot"></span><br>\n        <span class="vertical_line"></span>\n    </div>\n    <p class="first_line">文中广告智能插入功能已经上线</p>\n    <p class="second_line">新增广告智能插入能力，系统智能推荐合适的广告位置和内容，为你带来丰厚的广告收益 <a href="https://wximg.qq.com/wxp/pdftool/get.html?id=SyizVy1kM&pa=17&name=content_ads_supplier_manual1" target="_blank">文中广告插入指引</a></p>\n</div>\n';
});define("common/wx/media/adDialog.js",["common/wx/popup.js","common/wx/Cgi.js","biz_common/moment.js","common/wx/pagebar.js","common/wx/Step.js","common/wx/Tips.js","biz_web/ui/checkbox.js","common/wx/tooltips.js","biz_web/lib/store.js","common/wx/const.js","common/wx/popover.js","tpl/media/dialog/admsg_dialog.html.js","tpl/media/admsg.html.js","tpl/media/adtips.html.js","tpl/media/adcpc.html.js","tpl/media/adcpc_cat.html.js"],function(t){
"use strict";
t("common/wx/popup.js");
var e=t("common/wx/Cgi.js"),i=t("biz_common/moment.js"),o=t("common/wx/pagebar.js"),s=t("common/wx/Step.js"),a=t("common/wx/Tips.js"),n=(t("biz_web/ui/checkbox.js"),
t("common/wx/tooltips.js")),c=(t("biz_web/lib/store.js"),t("common/wx/const.js")),d=t("common/wx/popover.js"),r=t("tpl/media/dialog/admsg_dialog.html.js"),_=t("tpl/media/admsg.html.js"),p=t("tpl/media/adtips.html.js"),h=t("tpl/media/adcpc.html.js"),l=t("tpl/media/adcpc_cat.html.js"),m=c.insertAdModeMap,g=(c.maxArticleAdCount,
{});
g[m.auto]="群发后系统将根据文章长度智能地选择位置插入1~2条广告",g[m.op]="需在编辑文章时手动选择广告的插入位置",template.helper("$changeTime",function(t){
return i.unix(t).format("YYYY年MM月DD日");
});
var u=function(t){
var e=document.createElement("div");
return $(e).text(t),$(e).html();
},f=function(t){
this.onOK=t.onOK,this.idx=t.idx,this.cpc_edit_data=t.cpc_edit_data,this.editCpc=t.editCpc,
this.ad={},this.insertAdMode=t.insertAdMode,this.showStep2=t.showStep2,this.articleAdCount=t.articleAdCount,
this.init();
};
return f.prototype.init=function(){
var t=this;
this.data={},this.dialog&&this.dialog.remove(),this.dialog=$(r).popup({
title:"选择广告",
width:960,
className:"admsg_dialog_wrp",
onShow:function(){
t.$dom=this.$dialogWrp.eq(0),t._popup=this,t._initEvent(),t._getAdList(0,10,function(){
t._initPagebar();
});
},
onHide:function(){
this.remove(),t.dialog=null,t.popover&&t.popover.remove();
}
});
},f.prototype.getAdSetting=function(){
return e.get({
url:"/merchant/ad_seller_manager?action=get_ad_setting"
});
},f.prototype.getAgreetmentAd=function(t,i){
return e.get({
url:"/merchant/ad_seller_manager?action=get_agreetment_ad",
data:{
begin:t,
count:i
}
});
},f.prototype._getAdList=function(t,e,i){
var o=this;
o.$dom.find(".js_loading").show(),o.$dom.find(".js_ad_list").hide(),$.when(this.getAgreetmentAd(t,e),this.getAdSetting()).then(function(t,e){
o.$dom.find(".js_loading").hide(),t=t[0],e=e[0],t&&t.base_resp&&0==t.base_resp.ret&&e&&e.base_resp&&0==e.base_resp.ret?(t.adSettingData=e.advert_setting||{
insert_ad_mode:1
},o._parseCpc(t),o.editCpc||o.showStep2||o._parseSponsor(t),i&&i()):a.err("系统错误");
});
},f.prototype._parseCpc=function(t){
if(t.category_list&&!(t.category_list.length<1)){
this.category_list=t.category_list,this.insertAdMode=this.insertAdMode||t.adSettingData.insert_ad_mode;
var e=t.adSettingData.categories_list;
this.cpc_edit_data&&this.cpc_edit_data.category_id_list||!e||!e.length||(this.cpc_edit_data={
category_id_list:e
}),t.ad_info_list.length>0&&!this.editCpc&&!this.showStep2?this._renderCpc("step1"):(this.$dom.find(".js_prev").hide(),
this._renderCpc("step2"));
}
},f.prototype._renderCpc=function(t){
if("step1"==t)this.$dom.find(".js_cpc_area").show(),this.$dom.find(".js_cpc_area .js_admsg_item")[0].category_list=this.category_list;else if("step2"==t){
var e=function(t){
var e=t.val();
i.find(".insert_type_tips").html(g[e]||""),e===m.none?r.hide():r.show(),e===m.auto?_.show():_.hide(),
e===m.op?l.show():l.hide();
},i=this.$dom;
if(this.$dom.find(".js_step2_view").show(),this.cpc_edit_data){
var o=[];
o=this.cpc_edit_data.category_id_list;
for(var s=0;s<this.category_list.length;s++)for(var a=0;a<o.length;a++)o[a]==this.category_list[s].category_id&&(this.category_list[s].selected=!0);
}
i.find(".js_adtips").html(wx.T(h,{
category_list:this.category_list,
insertAdMode:this.insertAdMode,
insertAdModeMap:m,
globalDefaultInsertAdMode:wx.cgiData.insert_ad_mode,
is_new_seller:wx.cgiData.is_new_seller,
remainAdCount:c.maxArticleAdCount-this.articleAdCount,
editCpc:this.editCpc
}));
var d=i.find(".cpc_insert_type"),r=i.find(".js_cpc_cat_container"),_=i.find(".save_to_global"),p=i.find(".save_to_global_checkbox"),l=i.find(".remain_ad_count");
this.cpcInsertTypeBox=d.checkbox({
type:"radio",
onChanged:e
}),e(d.filter("[value="+this.insertAdMode+"]")),this.saveToGlobalCheckbox=p.checkbox({
type:"checkbox"
}),new n({
container:"#js_ad_mini_ask",
content:"仅限定商品类目指的是展示在文章内的广告卡片被限定在流量主选择的类目内",
reposition:!0,
type:"hover",
position:{
left:-50
},
onshow:function(){
this.show();
}
}),this._renderCpcCat();
}
},f.prototype._renderCpcCat=function(){
function t(){
e.find(".cpc_cat_item_all").checkbox("checked",i.cpcCatBox.values().length===i.category_list.length),
i.cpcCatBox.values().length<3?e.find(".js_frm_tips").show():e.find(".js_frm_tips").hide();
}
var e=this.$dom,i=this;
e.find(".js_cpc_cat_container").html(wx.T(l,{
category_list:this.category_list
})),this._changeMiniTips(!1),this.cpcCatBox=e.find(".js_cpc_cat_item").checkbox({
type:"checkbox",
onChanged:t
}),this.cpcCatAllBox=e.find(".cpc_cat_item_all").checkbox({
type:"checkbox",
onChanged:function(){
var i=!!this.value();
i?e.find(".js_cpc_cat_item[checked!=checked]").checkbox("checked",!0):e.find(".js_cpc_cat_item[checked=checked]").checkbox("checked",!1),
t();
}
}),this.cpc_edit_data&&this.cpc_edit_data.category_id_list.length||e.find(".js_cpc_cat_item[checked!=checked]").checkbox("checked",!0),
t();
},f.prototype._changeMiniTips=function(t,e){
t?$(".js_dialog_mini_tips").html("已选择%s个，可选择5个".sprintf(e)).show():$(".js_dialog_mini_tips").html("").hide();
},f.prototype._renderCpcItem=function(){
console.log("render cpc_item");
},f.prototype._parseSponsor=function(t){
var e=t.ad_info_list;
if(!(e.length<1)){
for(var i=this,o=0;o<e.length;o++)if(e[o].ad_tips=e[o].ad_tips.replace(/(\r\n|\n|\r)/gm,"<br />"),
e[o].background=e[o].background.replace(/(\r\n|\n|\r)/gm,"<br />"),e[o].video_info&&(e[o].ad_img=e[o].video_info.thumbUrl),
e[o].ad_request.length>0){
e[o].ad_request=JSON.parse(e[o].ad_request);
for(var s=0;s<e[o].ad_request.length;s++)e[o].ad_request[s].title=u(e[o].ad_request[s].title),
e[o].ad_request[s].content=u(e[o].ad_request[s].content),("no_compete"==e[o].ad_request[s].field||"no_policy"==e[o].ad_request[s].field)&&(e[o].ad_request[s].content=e[o].ad_request[s].content.split(", "));
}else e[o].ad_request=[];
i.total_num=t.total_num,i._initStep(),i._setStep(1),i._renderSponsor(e),i.$dom.find(".js_ad_list").show();
}
},f.prototype._renderSponsor=function(t){
var e=this.$dom,i=e.find(".admsg_col");
e.find(".js_step1_view").show(),i.empty();
for(var o=0;o<t.length;o++){
t[o].insert_status=t[o].idx!=this.idx+1?1:3==t[o].status?4:3==t[o].ad_status||4==t[o].ad_status?2:0;
var s=$(wx.T(_,t[o]));
s[0].ad_data=t[o],i.eq(o%2).append(s[0]);
}
},f.prototype._setStep=function(t){
this.stepNav.setStep(t),this.$dom.find(".js_step"+(3-t)+"_view").hide(),this.$dom.find(".js_step"+t+"_view").show();
},f.prototype._initStep=function(){
this.stepNav=new s({
container:".js_step",
selected:1,
names:["1.选择广告","2.广告详情"]
});
},f.prototype._initPagebar=function(){
var t=this;
t.total_num>10&&new o({
container:t.$dom.find(".js_pagebar").show(),
perPage:10,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:t.total_num,
callback:function(e){
t.ad={};
var i=e.currentPage;
t._getAdList(10*(i-1),10);
}
});
},f.prototype.onSubmit=function(){
this._popup.remove(),this.dialog=null,this.onOK&&this.onOK(this.ad);
},f.prototype.submitPopover=function(t,e){
var i=this;
this.popover=new d({
dom:t,
place:"top",
content:e,
buttons:[{
text:"确定",
click:function(){
this.remove(),i.onSubmit();
},
type:"primary"
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
},f.prototype._initEvent=function(){
var t=this,e=this.$dom;
e.on("click",".js_admsg_item",function(){
$(".js_admsg_item.selected").removeClass("selected"),$(this).addClass("selected"),
t.ad=$(this)[0].ad_data,t.ad||(t.ad=$(this)[0].category_list);
}),e.on("click",".js_next",function(){
return $.isEmptyObject(t.ad)?(a.err("请选择广告"),!1):(t._setStep(2),void(t.ad.ad_id?e.find(".js_adtips").html(wx.T(p,{
ad_info:t.ad,
title:wx.cgiData.nick_name
})):t._renderCpc("step2")));
}),e.on("click",".js_prev",function(){
t._setStep(1);
}),e.on("click",".js_submit",function(){
var i=t.articleAdCount;
if(t.ad.ad_id)return i?void t.submitPopover($(this),"互选广告仅支持插入1条，切换将会清空已插入的其他广告"):void t.onSubmit();
var o=t.cpcInsertTypeBox.values().join(),s=t.cpcCatBox.values();
if(!s.length)for(var a=e.find(".js_cpc_cat_item"),s=[],n=0;n<a.length;n++)s.push($(a[n]).attr("data-category_id"));
t.ad={
category_id_list:s,
insertAdMode:o,
ifSaveToGlobal:!!t.saveToGlobalCheckbox.value()
};
var c=t.editCpc&&i>1||!t.editCpc&&i,d=t.cpc_edit_data&&t.cpc_edit_data.category_id_list.sort().join()!==s.sort().join();
o===m.auto&&c?t.submitPopover($(this),"智能插入仅支持插入1条，切换将会清空已插入的其他广告"):o===m.none&&c?t.submitPopover($(this),"选择不插入广告后，将会清空所有已插入广告"):o===m.op&&c&&d?t.submitPopover($(this),"商品类目修改将对两个文中广告同时生效，确定修改？"):t.onSubmit();
});
},f;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/wx/mpEditor/plugin/exif.js",[],function(){
"use strict";
function e(e){
return!!e.exifdata;
}
function t(e,t){
t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");
for(var n=atob(e),r=n.length,o=new ArrayBuffer(r),i=new Uint8Array(o),a=0;r>a;a++)i[a]=n.charCodeAt(a);
return o;
}
function n(e,t){
var n=new XMLHttpRequest;
n.open("GET",e,!0),n.responseType="blob",n.onload=function(){
(200==this.status||0===this.status)&&t(this.response);
},n.send();
}
function r(e,r){
function a(t){
var n=o(t);
e.exifdata=n||{};
var a=i(t);
if(e.iptcdata=a||{},S.isXmpEnabled){
var s=g(t);
e.xmpdata=s||{};
}
r&&r.call(e);
}
if(e.src)if(/^data\:/i.test(e.src)){
var s=t(e.src);
a(s);
}else if(/^blob\:/i.test(e.src)){
var l=new FileReader;
l.onload=function(e){
a(e.target.result);
},n(e.src,function(e){
l.readAsArrayBuffer(e);
});
}else{
var u=new XMLHttpRequest;
u.onload=function(){
if(200!=this.status&&0!==this.status)throw"Could not load image";
a(u.response),u=null;
},u.open("GET",e.src,!0),u.responseType="arraybuffer",u.send(null);
}else if(self.FileReader&&(e instanceof self.Blob||e instanceof self.File)){
var l=new FileReader;
l.onload=function(e){
h&&console.log("Got file of length "+e.target.result.byteLength),a(e.target.result);
},l.readAsArrayBuffer(e);
}
}
function o(e){
var t=new DataView(e);
if(h&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return h&&console.log("Not a valid JPEG"),
!1;
for(var n,r=2,o=e.byteLength;o>r;){
if(255!=t.getUint8(r))return h&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),
!1;
if(n=t.getUint8(r+1),h&&console.log(n),225==n)return h&&console.log("Found 0xFFE1 marker"),
f(t,r+4,t.getUint16(r+2)-2);
r+=2+t.getUint16(r+2);
}
}
function i(e){
var t=new DataView(e);
if(h&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return h&&console.log("Not a valid JPEG"),
!1;
for(var n=2,r=e.byteLength,o=function(e,t){
return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5);
};r>n;){
if(o(t,n)){
var i=t.getUint8(n+7);
i%2!==0&&(i+=1),0===i&&(i=4);
var s=n+8+i,l=t.getUint16(n+6+i);
return a(e,s,l);
}
n++;
}
}
function a(e,t,n){
for(var r,o,i,a,s,l=new DataView(e),u={},c=t;t+n>c;)28===l.getUint8(c)&&2===l.getUint8(c+1)&&(a=l.getUint8(c+2),
a in x&&(i=l.getInt16(c+3),s=i+5,o=x[a],r=d(l,c+5,i),u.hasOwnProperty(o)?u[o]instanceof Array?u[o].push(r):u[o]=[u[o],r]:u[o]=r)),
c++;
return u;
}
function s(e,t,n,r,o){
var i,a,s,u=e.getUint16(n,!o),c={};
for(s=0;u>s;s++)i=n+12*s+2,a=r[e.getUint16(i,!o)],!a&&h&&console.log("Unknown tag: "+e.getUint16(i,!o)),
c[a]=l(e,i,t,n,o);
return c;
}
function l(e,t,n,r,o){
var i,a,s,l,u,c,f=e.getUint16(t+2,!o),g=e.getUint32(t+4,!o),m=e.getUint32(t+8,!o)+n;
switch(f){
case 1:
case 7:
if(1==g)return e.getUint8(t+8,!o);
for(i=g>4?m:t+8,a=[],l=0;g>l;l++)a[l]=e.getUint8(i+l);
return a;

case 2:
return i=g>4?m:t+8,d(e,i,g-1);

case 3:
if(1==g)return e.getUint16(t+8,!o);
for(i=g>2?m:t+8,a=[],l=0;g>l;l++)a[l]=e.getUint16(i+2*l,!o);
return a;

case 4:
if(1==g)return e.getUint32(t+8,!o);
for(a=[],l=0;g>l;l++)a[l]=e.getUint32(m+4*l,!o);
return a;

case 5:
if(1==g)return u=e.getUint32(m,!o),c=e.getUint32(m+4,!o),s=new Number(u/c),s.numerator=u,
s.denominator=c,s;
for(a=[],l=0;g>l;l++)u=e.getUint32(m+8*l,!o),c=e.getUint32(m+4+8*l,!o),a[l]=new Number(u/c),
a[l].numerator=u,a[l].denominator=c;
return a;

case 9:
if(1==g)return e.getInt32(t+8,!o);
for(a=[],l=0;g>l;l++)a[l]=e.getInt32(m+4*l,!o);
return a;

case 10:
if(1==g)return e.getInt32(m,!o)/e.getInt32(m+4,!o);
for(a=[],l=0;g>l;l++)a[l]=e.getInt32(m+8*l,!o)/e.getInt32(m+4+8*l,!o);
return a;
}
}
function u(e,t,n){
var r=e.getUint16(t,!n);
return e.getUint32(t+2+12*r,!n);
}
function c(e,t,n,r){
var o=u(e,t+n,r);
if(!o)return{};
if(o>e.byteLength)return{};
var i=s(e,t,t+o,F,r);
if(i.Compression)switch(i.Compression){
case 6:
if(i.JpegIFOffset&&i.JpegIFByteCount){
var a=t+i.JpegIFOffset,l=i.JpegIFByteCount;
i.blob=new Blob([new Uint8Array(e.buffer,a,l)],{
type:"image/jpeg"
});
}
break;

case 1:
console.log("Thumbnail image format is TIFF, which is not implemented.");
break;

default:
console.log("Unknown thumbnail image format '%s'",i.Compression);
}else 2==i.PhotometricInterpretation&&console.log("Thumbnail image format is RGB, which is not implemented.");
return i;
}
function d(e,t,n){
for(var r="",o=t;t+n>o;o++)r+=String.fromCharCode(e.getUint8(o));
return r;
}
function f(e,t){
if("Exif"!=d(e,t,4))return h&&console.log("Not valid EXIF data! "+d(e,t,4)),!1;
var n,r,o,i,a,l=t+6;
if(18761==e.getUint16(l))n=!1;else{
if(19789!=e.getUint16(l))return h&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),
!1;
n=!0;
}
if(42!=e.getUint16(l+2,!n))return h&&console.log("Not valid TIFF data! (no 0x002A)"),
!1;
var u=e.getUint32(l+4,!n);
if(8>u)return h&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(l+4,!n)),
!1;
if(r=s(e,l,l+u,y,n),r.ExifIFDPointer){
i=s(e,l,l+r.ExifIFDPointer,P,n);
for(o in i){
switch(o){
case"LightSource":
case"Flash":
case"MeteringMode":
case"ExposureProgram":
case"SensingMethod":
case"SceneCaptureType":
case"SceneType":
case"CustomRendered":
case"WhiteBalance":
case"GainControl":
case"Contrast":
case"Saturation":
case"Sharpness":
case"SubjectDistanceRange":
case"FileSource":
i[o]=C[o][i[o]];
break;

case"ExifVersion":
case"FlashpixVersion":
i[o]=String.fromCharCode(i[o][0],i[o][1],i[o][2],i[o][3]);
break;

case"ComponentsConfiguration":
i[o]=C.Components[i[o][0]]+C.Components[i[o][1]]+C.Components[i[o][2]]+C.Components[i[o][3]];
}
r[o]=i[o];
}
}
if(r.GPSInfoIFDPointer){
a=s(e,l,l+r.GPSInfoIFDPointer,b,n);
for(o in a){
switch(o){
case"GPSVersionID":
a[o]=a[o][0]+"."+a[o][1]+"."+a[o][2]+"."+a[o][3];
}
r[o]=a[o];
}
}
return r.thumbnail=c(e,l,u,n),r;
}
function g(e){
if("DOMParser"in self){
var t=new DataView(e);
if(h&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return h&&console.log("Not a valid JPEG"),
!1;
for(var n=2,r=e.byteLength,o=new DOMParser;r-4>n;){
if("http"==d(t,n,4)){
var i=n-1,a=t.getUint16(n-2)-1,s=d(t,i,a),l=s.indexOf("xmpmeta>")+8;
s=s.substring(s.indexOf("<x:xmpmeta"),l);
var u=s.indexOf("x:xmpmeta")+10;
s=s.slice(0,u)+'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '+s.slice(u);
var c=o.parseFromString(s,"text/xml");
return p(c);
}
n++;
}
}
}
function m(e){
var t={};
if(1==e.nodeType){
if(e.attributes.length>0){
t["@attributes"]={};
for(var n=0;n<e.attributes.length;n++){
var r=e.attributes.item(n);
t["@attributes"][r.nodeName]=r.nodeValue;
}
}
}else if(3==e.nodeType)return e.nodeValue;
if(e.hasChildNodes())for(var o=0;o<e.childNodes.length;o++){
var i=e.childNodes.item(o),a=i.nodeName;
if(null==t[a])t[a]=m(i);else{
if(null==t[a].push){
var s=t[a];
t[a]=[],t[a].push(s);
}
t[a].push(m(i));
}
}
return t;
}
function p(e){
try{
var t={};
if(e.children.length>0)for(var n=0;n<e.children.length;n++){
var r=e.children.item(n),o=r.attributes;
for(var i in o){
var a=o[i],s=a.nodeName,l=a.nodeValue;
void 0!==s&&(t[s]=l);
}
var u=r.nodeName;
if("undefined"==typeof t[u])t[u]=m(r);else{
if("undefined"==typeof t[u].push){
var c=t[u];
t[u]=[],t[u].push(c);
}
t[u].push(m(r));
}
}else t=e.textContent;
return t;
}catch(d){
console.log(d.message);
}
}
var h=!1,S=function v(e){
return e instanceof v?e:this instanceof v?void(this.EXIFwrapped=e):new v(e);
},P=S.Tags={
36864:"ExifVersion",
40960:"FlashpixVersion",
40961:"ColorSpace",
40962:"PixelXDimension",
40963:"PixelYDimension",
37121:"ComponentsConfiguration",
37122:"CompressedBitsPerPixel",
37500:"MakerNote",
37510:"UserComment",
40964:"RelatedSoundFile",
36867:"DateTimeOriginal",
36868:"DateTimeDigitized",
37520:"SubsecTime",
37521:"SubsecTimeOriginal",
37522:"SubsecTimeDigitized",
33434:"ExposureTime",
33437:"FNumber",
34850:"ExposureProgram",
34852:"SpectralSensitivity",
34855:"ISOSpeedRatings",
34856:"OECF",
37377:"ShutterSpeedValue",
37378:"ApertureValue",
37379:"BrightnessValue",
37380:"ExposureBias",
37381:"MaxApertureValue",
37382:"SubjectDistance",
37383:"MeteringMode",
37384:"LightSource",
37385:"Flash",
37396:"SubjectArea",
37386:"FocalLength",
41483:"FlashEnergy",
41484:"SpatialFrequencyResponse",
41486:"FocalPlaneXResolution",
41487:"FocalPlaneYResolution",
41488:"FocalPlaneResolutionUnit",
41492:"SubjectLocation",
41493:"ExposureIndex",
41495:"SensingMethod",
41728:"FileSource",
41729:"SceneType",
41730:"CFAPattern",
41985:"CustomRendered",
41986:"ExposureMode",
41987:"WhiteBalance",
41988:"DigitalZoomRation",
41989:"FocalLengthIn35mmFilm",
41990:"SceneCaptureType",
41991:"GainControl",
41992:"Contrast",
41993:"Saturation",
41994:"Sharpness",
41995:"DeviceSettingDescription",
41996:"SubjectDistanceRange",
40965:"InteroperabilityIFDPointer",
42016:"ImageUniqueID"
},y=S.TiffTags={
256:"ImageWidth",
257:"ImageHeight",
34665:"ExifIFDPointer",
34853:"GPSInfoIFDPointer",
40965:"InteroperabilityIFDPointer",
258:"BitsPerSample",
259:"Compression",
262:"PhotometricInterpretation",
274:"Orientation",
277:"SamplesPerPixel",
284:"PlanarConfiguration",
530:"YCbCrSubSampling",
531:"YCbCrPositioning",
282:"XResolution",
283:"YResolution",
296:"ResolutionUnit",
273:"StripOffsets",
278:"RowsPerStrip",
279:"StripByteCounts",
513:"JPEGInterchangeFormat",
514:"JPEGInterchangeFormatLength",
301:"TransferFunction",
318:"WhitePoint",
319:"PrimaryChromaticities",
529:"YCbCrCoefficients",
532:"ReferenceBlackWhite",
306:"DateTime",
270:"ImageDescription",
271:"Make",
272:"Model",
305:"Software",
315:"Artist",
33432:"Copyright"
},b=S.GPSTags={
0:"GPSVersionID",
1:"GPSLatitudeRef",
2:"GPSLatitude",
3:"GPSLongitudeRef",
4:"GPSLongitude",
5:"GPSAltitudeRef",
6:"GPSAltitude",
7:"GPSTimeStamp",
8:"GPSSatellites",
9:"GPSStatus",
10:"GPSMeasureMode",
11:"GPSDOP",
12:"GPSSpeedRef",
13:"GPSSpeed",
14:"GPSTrackRef",
15:"GPSTrack",
16:"GPSImgDirectionRef",
17:"GPSImgDirection",
18:"GPSMapDatum",
19:"GPSDestLatitudeRef",
20:"GPSDestLatitude",
21:"GPSDestLongitudeRef",
22:"GPSDestLongitude",
23:"GPSDestBearingRef",
24:"GPSDestBearing",
25:"GPSDestDistanceRef",
26:"GPSDestDistance",
27:"GPSProcessingMethod",
28:"GPSAreaInformation",
29:"GPSDateStamp",
30:"GPSDifferential"
},F=S.IFD1Tags={
256:"ImageWidth",
257:"ImageHeight",
258:"BitsPerSample",
259:"Compression",
262:"PhotometricInterpretation",
273:"StripOffsets",
274:"Orientation",
277:"SamplesPerPixel",
278:"RowsPerStrip",
279:"StripByteCounts",
282:"XResolution",
283:"YResolution",
284:"PlanarConfiguration",
296:"ResolutionUnit",
513:"JpegIFOffset",
514:"JpegIFByteCount",
529:"YCbCrCoefficients",
530:"YCbCrSubSampling",
531:"YCbCrPositioning",
532:"ReferenceBlackWhite"
},C=S.StringValues={
ExposureProgram:{
0:"Not defined",
1:"Manual",
2:"Normal program",
3:"Aperture priority",
4:"Shutter priority",
5:"Creative program",
6:"Action program",
7:"Portrait mode",
8:"Landscape mode"
},
MeteringMode:{
0:"Unknown",
1:"Average",
2:"CenterWeightedAverage",
3:"Spot",
4:"MultiSpot",
5:"Pattern",
6:"Partial",
255:"Other"
},
LightSource:{
0:"Unknown",
1:"Daylight",
2:"Fluorescent",
3:"Tungsten (incandescent light)",
4:"Flash",
9:"Fine weather",
10:"Cloudy weather",
11:"Shade",
12:"Daylight fluorescent (D 5700 - 7100K)",
13:"Day white fluorescent (N 4600 - 5400K)",
14:"Cool white fluorescent (W 3900 - 4500K)",
15:"White fluorescent (WW 3200 - 3700K)",
17:"Standard light A",
18:"Standard light B",
19:"Standard light C",
20:"D55",
21:"D65",
22:"D75",
23:"D50",
24:"ISO studio tungsten",
255:"Other"
},
Flash:{
0:"Flash did not fire",
1:"Flash fired",
5:"Strobe return light not detected",
7:"Strobe return light detected",
9:"Flash fired, compulsory flash mode",
13:"Flash fired, compulsory flash mode, return light not detected",
15:"Flash fired, compulsory flash mode, return light detected",
16:"Flash did not fire, compulsory flash mode",
24:"Flash did not fire, auto mode",
25:"Flash fired, auto mode",
29:"Flash fired, auto mode, return light not detected",
31:"Flash fired, auto mode, return light detected",
32:"No flash function",
65:"Flash fired, red-eye reduction mode",
69:"Flash fired, red-eye reduction mode, return light not detected",
71:"Flash fired, red-eye reduction mode, return light detected",
73:"Flash fired, compulsory flash mode, red-eye reduction mode",
77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
89:"Flash fired, auto mode, red-eye reduction mode",
93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",
95:"Flash fired, auto mode, return light detected, red-eye reduction mode"
},
SensingMethod:{
1:"Not defined",
2:"One-chip color area sensor",
3:"Two-chip color area sensor",
4:"Three-chip color area sensor",
5:"Color sequential area sensor",
7:"Trilinear sensor",
8:"Color sequential linear sensor"
},
SceneCaptureType:{
0:"Standard",
1:"Landscape",
2:"Portrait",
3:"Night scene"
},
SceneType:{
1:"Directly photographed"
},
CustomRendered:{
0:"Normal process",
1:"Custom process"
},
WhiteBalance:{
0:"Auto white balance",
1:"Manual white balance"
},
GainControl:{
0:"None",
1:"Low gain up",
2:"High gain up",
3:"Low gain down",
4:"High gain down"
},
Contrast:{
0:"Normal",
1:"Soft",
2:"Hard"
},
Saturation:{
0:"Normal",
1:"Low saturation",
2:"High saturation"
},
Sharpness:{
0:"Normal",
1:"Soft",
2:"Hard"
},
SubjectDistanceRange:{
0:"Unknown",
1:"Macro",
2:"Close view",
3:"Distant view"
},
FileSource:{
3:"DSC"
},
Components:{
0:"",
1:"Y",
2:"Cb",
3:"Cr",
4:"R",
5:"G",
6:"B"
}
},x={
120:"caption",
110:"credit",
25:"keywords",
55:"dateCreated",
80:"byline",
85:"bylineTitle",
122:"captionWriter",
105:"headline",
116:"copyright",
15:"category"
};
return S.enableXmp=function(){
S.isXmpEnabled=!0;
},S.disableXmp=function(){
S.isXmpEnabled=!1;
},S.getData=function(t,n){
return(self.Image&&t instanceof self.Image||self.HTMLImageElement&&t instanceof self.HTMLImageElement)&&!t.complete?!1:(e(t)?n&&n.call(t):r(t,n),
!0);
},S.getTag=function(t,n){
return e(t)?t.exifdata[n]:void 0;
},S.getIptcTag=function(t,n){
return e(t)?t.iptcdata[n]:void 0;
},S.getAllTags=function(t){
if(!e(t))return{};
var n,r=t.exifdata,o={};
for(n in r)r.hasOwnProperty(n)&&(o[n]=r[n]);
return o;
},S.getAllIptcTags=function(t){
if(!e(t))return{};
var n,r=t.iptcdata,o={};
for(n in r)r.hasOwnProperty(n)&&(o[n]=r[n]);
return o;
},S.pretty=function(t){
if(!e(t))return"";
var n,r=t.exifdata,o="";
for(n in r)r.hasOwnProperty(n)&&(o+="object"==_typeof(r[n])?r[n]instanceof Number?n+" : "+r[n]+" ["+r[n].numerator+"/"+r[n].denominator+"]\r\n":n+" : ["+r[n].length+" values]\r\n":n+" : "+r[n]+"\r\n");
return o;
},S.readFromBinaryFile=function(e){
return o(e);
},S;
});define("tpl/mpEditor/plugin/img_popup.html.js",[],function(){
return'<div class="js_img_popup edui_mask_edit_group edui_mask_edit_img_group">\n    {if hasCropimg}\n    <div class="edui-clickable edui_mask_edit_meta" onclick="$$._cropImg()">\n        <div class="edui_mask_edit_meta_inner">\n          <i class="icon_edui_mask_img icon_edui_mask_img_crop"></i>\n            裁剪        </div>\n    </div>\n    {/if}\n    <div class="edui-clickable edui_mask_edit_meta" onclick="$$._imgReplace()">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_replace"></i>\n            图片替换        </div>\n    </div>\n	<div class="js_canceladapt edui-clickable edui_mask_edit_meta edui_mask_edit_meta_canceladapt tips_global" onclick="$$._imgAutoWidth(false)" style="{if !hasadapt}display:none;{/if}">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_canceladapt"></i>\n            取消自适应手机屏幕宽度        </div>\n    </div>\n	<div class="js_adapt edui-clickable edui_mask_edit_meta" onclick="$$._imgAutoWidth(true)" style="{if hasadapt}display:none;{/if}">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_adapt"></i>\n            自适应手机屏幕宽度        </div>\n    </div>\n</div>';
});define("tpl/mpEditor/plugin/audio_card.html.js",[],function(){
return'<!-- 图文类型的音频卡片 -->\n{if isAudioType == false}\n<section class="appmsg_card_context appmsg_card_active audio_card js_audio_card">\n  <strong class="audio_card_title">{name}</strong>\n  <span class="weui-flex">\n    <span class="weui-flex__item">\n      <span class="audio_card_opr">\n        <span class="audio_card_progress_wrp">\n          <span class="audio_card_progress">\n            <span class="audio_card_progress_inner">\n            </span>\n          </span>\n        </span>\n      </span>\n      <span class="audio_card_tips" aria-labelledby="时长">\n        <em class="audio_card_length_current">00:00</em>\n        <em class="audio_card_length_total">{play_length}</em>\n      </span>\n    </span>\n    <span aria-labelledby="播放开关" class="audio_card_switch"><em class="weui-audio-btn" role="button"></em></span>\n  </span>\n  <span class="audio_album_null js_no_album" {if hasTopic}style="display: none;"{/if}>未加入话题</span>\n  <span class="audio_album_null js_album_name" {if !hasTopic}style="display: none;"{/if}>{if hasTopic}#{topicName}{/if}</span>\n\n  <span class="audio_action js_audio_action" style="display: none;">\n    <span class="audio_action_item js_replace_album" {if !hasTopic}style="display: none;"{/if}><em class="audio_action_icon_switch"></em>修改话题</span>\n    <span class="audio_action_item js_add_album" {if hasTopic}style="display: none;"{/if}><em class="audio_action_icon_add"></em>添加话题</span>\n  </span>\n</section>\n{else if isAudioType == true}\n  <!-- 音频类型的音频卡片 -->\n  {each share_voiceinfo as d}\n  <section class="appmsg_card_context appmsg_card_active audio_card js_audio_card" data-audio_id="{d.audioId}" data-topic_id="{d.topicId}" data-topic_name="{d.topicName}">\n    <strong class="audio_card_title">{d.title}</strong>\n    <span class="weui-flex">\n      <span class="weui-flex__item">\n        <span class="audio_card_opr">\n          <span class="audio_card_progress_wrp js_audio_progress_container">\n            <span class="audio_card_progress">\n              <span class="audio_card_progress_inner js_audio_progress" style="width: 0px;">\n              </span>\n            </span>\n          </span>\n        </span>\n        <span class="audio_card_tips" aria-labelledby="时长">\n          <em class="audio_card_length_current">00:00</em>\n          <em class="audio_card_length_total">{d.duration}</em>\n        </span>\n      </span>\n      <span aria-labelledby="播放开关" class="audio_card_switch"><em class="weui-audio-btn js_toggle_playing" role="button"></em></span>\n    </span>\n    <span class="audio_album_null js_no_album" {if d.hasTopic}style="display: none;"{/if}>未加入话题</span>\n    <span class="audio_album_null js_album_name" {if !d.hasTopic}style="display: none;"{/if}>{if d.hasTopic}#{d.topicName}{/if}</span>\n    <span class="audio_action js_audio_action" style="display: none;">\n      <span class="audio_action_item js_replace_media"><em class="audio_action_icon_switch_album"></em>替换素材</span>\n      <span class="audio_action_item js_replace_album" {if !d.hasTopic}style="display: none;"{/if}><em class="audio_action_icon_switch"></em>修改话题</span>\n      <span class="audio_action_item js_add_album" {if d.hasTopic}style="display: none;"{/if}><em class="audio_action_icon_add"></em>添加话题</span>\n    </span>\n  </section>\n  {/each}\n{/if}';
});define("tpl/mpEditor/plugin/music_card.html.js",[],function(){
return'<section class="music_card appmsg_card_context appmsg_card_active">\n  <section class="music_card_bd">\n    <strong class="music_card_title">{musicName}</strong>\n    <section class="music_card_desc">{singer}</section>\n    <span class="music_card_source {if type==2}music_card_source_kugou{else}{/if}"></span>\n  </section>\n  <span class="music_card_ft">\n    <i class="weui-play-btn"></i>\n    <img class="music_card_thumb js_nocatch js_noimgpopup js_noimgselected" src="{albumurl}" />\n    <!--音乐封面图-->\n  </span>\n  <section class="pages_mask_msg js_mask" {if errorType!=1}style="display:none;"{/if}>该音乐因版权失效无法播放，请<a href=\'javascript:;\'>更换音乐</a></section>\n</section>\n';
});