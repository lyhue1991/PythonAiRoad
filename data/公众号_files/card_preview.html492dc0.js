define("biz_common/utils/comm_store.js",[],function(){
var e={
web:{
get:function(o,t,n){
o.get({
url:"/cgi-bin/mmbizfrontendcommstore?operate_type=GetServiceData&service_name="+t.key+"&service_option=1",
success:function(s){
r(e.web.get,o,s,t,n);
},
error:t.error
});
},
set:function(r,t,n){
r.post({
url:"/cgi-bin/mmbizfrontendcommstore",
data:{
operate_type:"SetServiceData",
service_name:t.key,
service_data:JSON.stringify(t.value)
},
success:function(s){
o(e.web.set,r,s,t,n);
},
error:t.error
});
}
},
wap:{
get:function(o,t,n){
o({
type:"GET",
dataType:"json",
url:"/mp/frontendcommstore?operate_type=GetServiceData&service_name="+t.key+"&service_option=1",
success:function(s){
r(e.wap.get,o,s,t,n);
},
error:t.error
});
},
set:function(r,t,n){
r({
type:"POST",
dataType:"json",
url:"/mp/frontendcommstore",
data:{
operate_type:"SetServiceData",
service_name:t.key,
service_data:JSON.stringify(t.value)
},
success:function(s){
o(e.wap.set,r,s,t,n);
},
error:t.error
});
}
}
},r=function(e,r,o,t,n){
if(o&&o.base_resp&&0===o.base_resp.ret)switch(o.err_code){
case 0:
try{
"function"==typeof t.success&&t.success(JSON.parse(o.service_data));
}catch(s){
console.error("JSON.parse error."),"function"==typeof t.error&&t.error(o);
}
break;

case 21396001:
"function"==typeof t.success&&t.success(null);
break;

case 21396002:
case 21396003:
3>n?e(r,t,n+1):(console.error("An error happened when get data from db."),"function"==typeof t.error&&t.error(o));
break;

case 21396005:
console.error("The key `"+t.key+"` is not in the whitelist."),"function"==typeof t.error&&t.error(o);
break;

case 21396007:
console.error("Parameter error."),"function"==typeof t.error&&t.error(o);
break;

default:
console.error("Unknown error happened."),"function"==typeof t.error&&t.error(o);
}else console.error("Unknown error happened."),"function"==typeof t.error&&t.error(o);
},o=function(e,r,o,t,n){
if(o&&o.base_resp&&0===o.base_resp.ret)switch(o.err_code){
case 0:
"function"==typeof t.success&&t.success();
break;

case 21396002:
case 21396003:
3>n?e(r,t,n+1):(console.error("An error happened when set data to db."),"function"==typeof t.error&&t.error(o));
break;

case 21396005:
console.error("The key `"+t.key+"` is not in the whitelist."),"function"==typeof t.error&&t.error(o);
break;

case 21396006:
console.error("The value is too large."),"function"==typeof t.error&&t.error(o);
break;

case 21396007:
console.error("Parameter error."),"function"==typeof t.error&&t.error(o);
break;

default:
console.error("Unknown error happened."),"function"==typeof t.error&&t.error(o);
}else console.error("Unknown error happened."),"function"==typeof t.error&&t.error(o);
};
return{
get:function(r,o,t){
e[r].get(o,t,0);
},
set:function(r,o,t){
return"object"!=typeof t.value?void console.error("opt.value should be an object."):void e[r].set(o,t,0);
}
};
});define("tpl/media/appmsg_edit/article_list_item.html.js",[],function(){
return'<div id="appmsgItem{id}" data-fileId="{file_id}" data-id="{id}" data-msgindex="{msg_index}" class="js_appmsg_item appmsg_item_wrp {if cover}has_thumb{/if} {if !isFirst}sub_card_media{/if}" >\n  <div class="appmsg_item">\n    {if share_page_type==5}\n    <div class="card_video_wrp card_container">\n      <div class="card_video">\n        <div class="card_video_inner">\n          <div class="card_video_hd weui-desktop-vm_primary">\n            <strong class="card_video_title js_appmsg_title">{title || \'标题\'}</strong>\n          </div>\n          <div class="card_video_bd weui-desktop-vm_default">\n            <div class="card_video_thumb js_appmsg_thumb" style="background-image:url(\'{share_videoinfo[0].cover}\');">\n              <div class="card_video_player_wrp">\n                <i class="card_video_player"></i>\n                <i class="card_video_length js_appmsg_video_length">{share_videoinfo[0].duration}</i>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    {else if share_page_type==7}\n    <div class="card_audio card_container">\n      <div class="card_audio_inner">\n        <div class="weui-desktop-vm_primary card_audio_hd">\n          <strong class="card_audio_title js_appmsg_title">{title || \'标题\'}</strong>\n        </div>\n        <div class="weui-desktop-vm_default card_audio_bd">\n          <i class="card_audio_player"></i>\n        </div>\n      </div>\n    </div>\n    {else if share_page_type==8}\n    <div class="card_img card_container">\n      <div class="card_img_inner">\n        <div class="weui-desktop-vm_primary card_img_hd">\n          <strong class="card_img_title js_appmsg_title">{title || \'标题\'}</strong>\n        </div>\n        <div class="weui-desktop-vm_default card_img_bd">\n          <i class="card_img_thumb js_appmsg_thumb" style="background-image: url(\'{share_imageinfo.length&&share_imageinfo[0].cdn_url}\');"></i>\n        </div>\n      </div>\n    </div>\n    {else if share_page_type==10}\n    <!-- 新创作：文字消息 -->\n    <div class="card_text">\n      <div class="card_text-inner js_appmsg_txt">{content.replace(/<\\/?a[^>]*?>/ig, \'\')}</div>\n    </div>\n    {else}\n    <div class="card_appmsg card_container">\n      <div class="card_appmsg_inner">\n        <div class="weui-desktop-vm_primary card_appmsg_hd">\n          <strong class="card_appmsg_title js_appmsg_title">{title || \'标题\'}</strong>\n        </div>\n        <div class="weui-desktop-vm_default card_appmsg_bd">\n          <div class="card_appmsg_thumb js_appmsg_thumb" style="background-image:url(\'{cover.nogif()}\');"></div>\n        </div>\n      </div>\n    </div>\n    {/if}\n    <!-- <div class="appmsg_edit_mask js_readonly"> -->\n      <!-- <a onclick="return false;" style="{if isFirst}display:none;{/if}" class="icon20_common sort_up_white   js_up"   data-id="{id}" href="javascript:;" title="上移">向上</a>\n      <a onclick="return false;" style="{if isFirst}display:none;{/if}" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n      <a onclick="return false;" style="{if isFirst}display:none;{/if}" class="icon20_common del_media_white js_del"  data-id="{id}" href="javascript:;" title="删除">删除</a> -->\n    <!-- </div> -->\n\n    <!-- <div class="mask_layer"></div>  -->\n  </div>\n</div>\n';
});define("common/wx/mpEditor/text_editor.js",["widget/text_editor.css","common/wx/richEditor/emotionEditor.js","tpl/media/appmsg_edit/text_editor.html.js","tpl/media/appmsg_edit/text_editor_word_tips.html.js","tpl/media/appmsg_edit/text_editor_toolbar.html.js","tpl/media/appmsg_edit/text_editor_link_popup.html.js"],function(o){
"use strict";
function t(o){
return u.hasInit?!0:(u.$dom=o.$dom,u.wordlimit=o.wordlimit,u.onFocus=o.onFocus,u.onBlur=o.onBlur,
void(u.onChange=o.onChange));
}
function i(o,t){
return u.$dom?(u.myEditor||e(o,t),u.myEditor):null;
}
function e(o,t){
return u.$dom?(u.$toolbar=$(p).insertAfter(u.$dom.parent().find("#edui1_toolbarbox")),
o.teditor=u,u.myEditor=new a(u.$dom,{
wordlimit:u.wordlimit,
linebreak:!0,
hideEmotion:!0,
showLinkAndWeapp:!1,
hideUpload:!0,
hideOprTips:!0,
editorTpl:m,
editorTipsTpl:s,
editorLinkPopupTpl:_,
ueditor:o,
formItemsOpt:t,
$toolbar:u.$toolbar,
onFocus:u.onFocus,
onBlur:u.onBlur,
onChange:u.onChange
}),void u.$dom.find(".js_editorArea").on("focus",r)):null;
}
function r(){
u.$toolbar&&u.$toolbar.find("#js_text_editor_toolbar_mask").hide();
}
function d(){
u.$toolbar&&u.$toolbar.find("#js_text_editor_toolbar_mask").show();
}
function l(){
u.$toolbar&&u.$toolbar.show();
}
function n(){
u.$toolbar&&u.$toolbar.hide();
}
o("widget/text_editor.css");
var a=o("common/wx/richEditor/emotionEditor.js"),m=o("tpl/media/appmsg_edit/text_editor.html.js"),s=o("tpl/media/appmsg_edit/text_editor_word_tips.html.js"),p=o("tpl/media/appmsg_edit/text_editor_toolbar.html.js"),_=o("tpl/media/appmsg_edit/text_editor_link_popup.html.js"),u={
hasInit:!1,
$dom:null,
$toolbar:null,
myEditor:null,
wordlimit:0,
showToolbar:l,
hideToolbar:n,
enableToolbar:r,
disableToolbar:d
};
return{
initEnv:t,
getEditor:i,
showToolbar:l,
hideToolbar:n,
enableToolbar:r,
disableToolbar:d
};
});define("tpl/author/authority_warn.html.js",[],function(){
return'<i style="display:block;" data-type="2" data-desc="{text}" class="js_show_author_qrcode_popover js_author_warn icon-svg-helper-tips_warn edui-default"></i>';
});define("biz_web/utils/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js","common/wx/Cgi.js"],function(e){
"use strict";
function i(e){
f.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),a=e("common/wx/dialog.js"),t=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=e("common/wx/Cgi.js"),s=wx.T,p=wx.path.webuploader,m=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",l={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:10485760
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/mp3,audio/wma,audio/wav,audio/amr"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/rm,video/rmvb,video/wmv,video/avi,video/mpg,video/mpeg,video/mp4"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf"
},
fileSingleSizeLimit:5242880
},
7:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:5242880
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg"
},
fileSingleSizeLimit:5242880
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/bmp,image/png,image/jpeg,image/jpg"
},
fileSingleSizeLimit:5242880
},
12:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/mp3,audio/wma,audio/wav,audio/amr"
},
fileSingleSizeLimit:31457280
},
13:{
accept:{
extensions:"png,bmp,jpeg,jpg,gif",
mimeTypes:"image/png,image/bmp,image/jpeg,image/jpg,image/gif"
},
fileSingleSizeLimit:2097152
},
16:{
accept:{
extensions:"mp4",
mimeTypes:"video/mp4"
},
fileSingleSizeLimit:20971520
},
17:{
accept:{
extensions:"png,jpg",
mimeTypes:"image/jpg,image/jpeg,image/png"
},
fileSingleSizeLimit:5242880
}
};
l[15]=l[4];
var c=function(e){
a.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},d=function(e){
var i=n.Uploader;
0==i.support("flash")?c("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?c("<p>您的浏览器不支持上传</p>"):e.refresh();
},u=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},g={
swf:p,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:20,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1280,
height:1e8,
quality:90,
afterCompressSizeLimit:2097152,
compressSize:0,
resizeSize:2097152,
maxResolution:6e6,
noCompressIfLarger:!1
},
imageSize:!0,
chunked:!1,
duplicate:!0
},f=new Image,h={},b=function(e){
if(!e.url)throw"missing url";
var a,p,m,c=$('<ul class="upload_file_box" style="display:none"></ul>'),f=$(e.container);
f.on("click",function(){
Math.random()<.1&&u(12),d(a);
}).parent().append(c),function(){
n&&0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),e.only_cdn&&(e.url+="&only_cdn=1"),p={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time),
pick:{
id:f,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},m=l[e.type]||l[2],e=$.extend(!0,{},g,p,m,e);
e.server;
n&&0==n.Uploader.support("html5")&&e.compress&&(e.compress.quality=70),e.url.indexOf("cgi-bin/filetransfer?")>=0&&e.url.indexOf("action=upload_material")>0&&(e.compress.afterCompressSizeLimit=10485760,
e.compress.resizeSize=10485760);
try{
a=n.create(e);
}catch(b){
if(!a)return;
}
return c.on("click",".js_cancel",function(){
var e=$(this).data("id");
a.cancelFile(e),$(this).hide();
}),a.on("beforeFileQueued",function(i){
return Math.random()<.1&&u(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),a.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
c.append(s(o,i)).show();
}),a.on("fileDequeued",function(){
Math.random()<.1&&u(14),e.onCancel&&e.onCancel();
}),a.on("uploadProgress",function(i,n){
var a="#uploadItem%s".sprintf(i.id),t=c.find(a).find(".progress_bar_thumb");
t.width("%s%".sprintf(100*n)),1==n&&c.find(a).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),a.on("uploadStart",function(e){
h[e.id]=+new Date;
}),a.on("uploadSuccess",function(n,a,o){
if(Math.random()<.1&&u(16),a&&a.base_resp){
var s=+a.base_resp.ret;
if(0==s)Math.random()<.1&&(u(17),h[n.id]&&i(+new Date-h[n.id]));else switch(n.setStatus("invalid"),
s){
case-18:
case 200018:
t.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
case 200020:
t.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
case 200013:
t.err("上传文件过于频繁，请稍后再试");
break;

case-10:
case 200010:
t.err("上传文件过大");
break;

case-22:
case 200022:
t.err("上传音频文件不能超过60秒");
break;

case-39:
case 200039:
t.err("上传图片高度（像素）与宽度（像素）的乘积不能超过600万");
break;

case 220001:
t.err('"素材管理"中的存储数量已达到上限，请删除后再操作。');
break;

case 220002:
t.err("你的图片库已达到存储上限，请进行清理。");
break;

case 200077:
t.err("图片帧数超过300帧，上传失败");
break;

default:
r.handleRet(a,{
showMsg:!0,
msg:"上传文件发送出错，请刷新页面后重试！",
id:"69271",
key:"38",
url:e.url,
ret:s
});
}
}
e.onComplete&&e.onComplete(null,n.id,n,a,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),a.on("uploadFinished",function(i){
this.reset(),c.fadeOut().html(""),h={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),a.on("uploadError",function(){
Math.random()<.1&&u(15),e.onError&&e.onError();
}),a.on("error",function(i,a,o){
switch("object"==typeof a&&(o=a),i){
case"Q_EXCEED_NUM_LIMIT":
t.err("一次上传最多只能上传%s个文件".sprintf(a));
break;

case"F_EXCEED_SIZE":
t.err("文件大小不能超过%s".sprintf(n.formatSize(a,"0")));
break;

case"F_EXCEED_COMPRESS_SIZE":
t.err("图片尺寸太大，压缩后不能超过%s，请缩小图片尺寸再试".sprintf(e.compress.afterCompressSizeLimit?e.compress.afterCompressSizeLimit/1048576+"M":"2M")),
u(42);
break;

case"Q_TYPE_DENIED":
t.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),a;
},w=function(e){
return function(i){
return i.url=e,b(i);
};
},j=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:b,
uploadBizFile:w(m+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:w(m+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:w(m+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:w(m+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:w(m+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:w(m+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:w(m+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:w(m+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:w(m+"/misc/setlocation?action=upload"),
mediaFile:w(m+"/cgi-bin/filetransfer?action=bizmedia"),
uploadBbsCdnFile:w(m+"/filetransfer?action=upload_cdn&f=json"),
uploadCdnFileFromAd:function(e){
return w(m+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=m+"/cgi-bin/filetransfer?action=upload_material&f=json","undefined"!=typeof e.scene&&(e.url+="&scene="+e.scene),
1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),b(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var a in e)n.push(encodeURIComponent(a)+"="+encodeURIComponent(e[a]));
return w(m+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
uploadTmpFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var a in e)n.push(encodeURIComponent(a)+"="+encodeURIComponent(e[a]));
return w(m+"/cgi-bin/filetransfer?action=preview_check_range&f=json&"+n.join("&"));
},
tmpFileUrl:j(m+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:j(m+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:j(m+"/cgi-bin/filetransfer?action=multimedia")
};
});define("tpl/media/product_pagebar_tpl.html.js",[],function(){
return'<div class="pagination">\n    <span class="page_nav_area">\n        {if page_num!=1}\n        <a href="javascript:void(0);" data-curpage="{page_num}" class="js_pagebtn js_first btn page_first">首页</a>\n        <a href="javascript:void(0);" data-curpage="{page_num}" class="js_pagebtn js_prev btn page_prev" title="上一页"><i class="arrow"></i></a>\n        {/if}\n        <span class="page_num">\n          <label>{page_num}</label>\n          <span class="num_gap">/</span>\n          <label>{totalPage}</label>\n        </span>\n        {if !last}\n        <a href="javascript:void(0);" data-curpage="{page_num}" class="js_pagebtn js_next btn page_next" title="下一页"><i class="arrow"></i></a>\n        {/if}\n    </span>\n</div>';
});define("tpl/media/product_dialog_loading.html.js",[],function(){
return'<tr class="empty_item"><td colspan="4" class="empty_tips"><i class="icon_loading_small white"></i></td></tr>';
});define("tpl/media/product_dialog_list.html.js",[],function(){
return'{if msg}\n<tr class="empty_item"><td colspan="4" class="empty_tips">{msg}</td></tr>\n{else}\n{each list as item index}\n<tr {if item.disabled}class="product-cell__disabled"{/if}>\n    <td class="table_cell">\n        <label class="frm_checkbox_label {if item.selected}selected{/if} {if item.disabled}disabled{/if}">\n            <i class="icon_checkbox"></i>\n            <input type="checkbox" {if item.selected}checked="true"{/if} value="{item.pid}" data-index="{index}" {if item.disabled}disabled{/if} class="js_checkbox frm_checkbox">\n        </label></td>\n    <td class="table_cell product-cell__name">\n        <div class="product-cell-item">\n            <div class="product-cell-item__info">\n                <div class="product-cell-item__image"><img style="width:50px;height:50px" src="{item.img_url}" alt="{item.title}"></div>\n                <div class="product-cell-item__name">{=item.titleEncode}</div>\n                <div class="product-cell-item__price">￥{item.min_price}</div>\n            </div>\n        </div>\n    </td>\n    <td class="table_cell product-cell__kind">{=item.category_name_str}</td>\n    <td class="table_cell">{item.saleStatusStr}</td>\n</tr>\n{/each}\n{/if}';
});define("media/productCategory.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","tpl/media/product_category_frame.html.js","media/productDropdown.js"],function(e){
"use strict";
function t(e){
this._o={
container:"",
category_loading_img:"",
defaultLabel:"请选择",
initCategoryName:[],
formObj:null,
search:!0,
canadd:!0,
candel:!0,
onChange:function(){}
},this._g={
hasInitCategory:!1
},this._extend(e),this.initData(),this.render();
}
function n(e){
m.data&&e.callback(m.data),m.getting!==!0&&(m.getting=!0,u.post({
url:"/cgi-bin/productmaterial?action=get_all_category"
},{
done:function(t){
m.getting=!1,t&&t.base_resp&&0==t.base_resp.ret&&t.category_list&&t.category_list.length>=1&&t.category_list[0].children_node&&t.category_list[0].children_node.length>=0&&(m.data={
isNew:!1,
canDel:!1,
isRoot:!0,
children_node:t.category_list[0].children_node
},a(m.data.children_node,1,"","")),e.callback(m.data);
},
fail:function(){
m.getting=!1,e.callback(m.data);
}
}));
}
function a(e,t,n,o){
for(var r=0,i=e.length;i>r;r++){
var c=e[r];
m.dataMap["c"+t]||(m.dataMap["c"+t]={});
var d=n?n+c.category_name:c.category_name,l=o?o+r:r+"";
m.dataMap["c"+t][d]={
index:l,
name:c.category_name
},c.children_node&&c.children_node.length>0&&a(c.children_node,t+1,d+m.splitKey,l+",");
}
}
function o(e,t){
var n,a=[{
name:t,
value:"",
canDel:!1
}];
if(!e)return a;
if(n="[object Array]"===Object.prototype.toString.call(e)?e:e.children_node,!n)return a;
for(var o=0,r=n.length;r>o;o++)a.push({
value:n[o].category_name,
name:n[o].category_name,
canDel:n[o].canDel===!0?!0:!1
});
return a;
}
function r(e,t){
if(0==e||!t)return m.data;
if(e="c"+e,m.dataMap&&m.dataMap[e]&&m.dataMap[e][t]){
for(var n=m.data.children_node,a=(m.dataMap[e][t].index+"").split(","),o=0,r=a.length;r>o;o++){
var c=1*a[o];
if(o==r-1)n=n&&n[c]?n[c]:null;else{
if(!n||!i(n[c])){
n=null;
break;
}
n=n[c].children_node;
}
}
return n;
}
return null;
}
function i(e){
return e&&e.children_node&&e.children_node.length>0?!0:!1;
}
function c(e){
var t=e.categoryIndex,n=e.key,a=e.callback,o=t+m.splitKey+n;
if(m.checkCategoryDel[o]!==!0){
var i=r(t,n);
if("undefined"!=typeof i.canDel)return void a(i.canDel);
m.checkCategoryDel[o]=!0;
for(var c={},d=n.split(m.splitKey),l=0,g=d.length;g>l;l++)c["category_name"+(l+1)]=d[l];
u.post({
url:"/cgi-bin/productmaterial?action=check_delete_category",
data:c
},{
done:function(e){
if(m.checkCategoryDel[o]=!1,e&&e.base_resp&&0==e.base_resp.ret){
var i=r(t,n);
i.canDel=1*e.can_delete===1?!0:!1,a(i.canDel);
}else a(-1);
},
fail:function(){
m.checkCategoryDel[o]=!1,a(-1);
}
});
}
}
function d(e,t){
if(m.dataMap["c"+e]&&m.dataMap["c"+e][t]){
var n=m.dataMap["c"+e][t].index.split(",");
if(0!=n.length){
n=n[n.length-1];
var o;
if(1==e)o=m.data;else{
var i=t.split(m.splitKey);
i=i.splice(0,i.length-1).join(m.splitKey),o=r(e-1,i);
}
o&&o.children_node&&o.children_node[n]&&(o.children_node.splice(n,1),m.dataMap={},
a(m.data.children_node,1,"",""));
}
}
}
function l(e){
var t=r(e.categoryIndex,e.key);
if(t&&t.isNew===!0)return d(e.categoryIndex,e.key),void("function"==typeof e.onSuccess&&e.onSuccess({
base_resp:{
ret:0
}
},"删除类目成功"));
if(m.delCategory[e.key]!==!0){
m.delCategory[e.key]=!0;
for(var t={},n=e.key.split(m.splitKey),a=0,o=n.length;o>a;a++)t["category_name"+(a+1)]=n[a];
u.post({
url:"/cgi-bin/productmaterial?action=delete_category",
data:t
},{
done:function(t){
m.delCategory[e.key]=!1,t&&t.base_resp&&0==t.base_resp.ret?"function"==typeof e.onSuccess&&(d(e.categoryIndex,e.key),
e.onSuccess(t,"删除类目成功")):"function"==typeof e.onError&&e.onError(t,"删除类目失败");
},
fail:function(){
m.delCategory[e.key]=!1,"function"==typeof e.onError&&e.onError(null,"系统繁忙，请稍后再试");
}
});
}
}
function g(e,t){
if(!e||!t)return!1;
for(var n=0,a=e.length;a>n;n++)if(e[n].category_name===t)return!0;
return!1;
}
function f(e,t,n){
var a=r(e-1,t);
if(a=a.children_node,g(a,n))return-1;
a.push({
category_name:n,
isNew:!0,
canDel:!0,
children_node:[]
});
var o=a.length,i=t?t+m.splitKey+n:n,c="";
if(t&&e>=2){
var d=m.dataMap["c"+(e-1)][t];
if(!d)return!1;
c=d.index;
}
return m.dataMap["c"+e]||(m.dataMap["c"+e]={}),m.dataMap["c"+e][i]={
name:n,
index:c?c+","+(o-1):o-1+""
},a[o-1];
}
function y(e,t){
if(!t||!e||0==e.length)return void 0;
for(var n=void 0,a=0,o=e.length;o>a;a++)if(e[a].value==t){
n=a;
break;
}
return n;
}
var s=e("common/wx/Tips.js"),u=e("common/wx/Cgi.js"),_=e("common/wx/dialog.js"),h=e("tpl/media/product_category_frame.html.js"),p=e("media/productDropdown.js"),m={
categoryLimit:5,
checkCategoryDel:{},
delCategory:{},
data:null,
dataMap:{},
getting:!1,
splitKey:"#$%^"
};
return t.prototype={
_extend:function(e){
if(e)for(var t in e)this._o[t]=e[t];
},
initData:function(){
for(var e=this._g,t=this._o,a=this,r=1;r<=m.categoryLimit;r++)e["category_name"+r]=t.initCategoryName[r-1]||"";
n({
callback:function(n){
if(n)if(n.children_node&&0!=n.children_node.length){
e.categoryData=n;
var r=o(e.categoryData,t.defaultLabel),i=void 0;
e.category_name1&&(i=y(r,e.category_name1),e.category_name1=""),a.initCategory(1,"",r,i),
e.hasInitCategory=!0,"function"==typeof t.afterInitCategory&&t.afterInitCategory();
}else;else s.err("获取类目数据失败");
}
});
},
render:function(){
for(var e=1;e<=m.categoryLimit;e++)this._o.container.append(wx.T(h,{
index:e
}));
},
delSubCategoryDropdown:function(e){
for(var t=e;t<=m.categoryLimit;t++)this.delCategoryDropdown(t);
},
delCategoryDropdown:function(e){
var t=this._g,n=this.getDropdownKeyByIndex(e);
t[n]&&"function"==typeof t[n].destroy&&(t[n].destroy(),t[n]=null);
var a=$("#category_"+e+"_hidden").val("");
t.hasInitCategory&&this._o.formObj&&this._o.formObj.element(a);
},
initCategory:function(e,t,n,a){
var i=this._g,d=this._o,g=this;
if(this.delSubCategoryDropdown(e),d.canadd||n&&!(n.length<=1)){
var u=$("#category_"+e);
if(u&&u.length>0){
var h=this.getDropdownKeyByIndex(e);
i[h]=new p({
loading_img:d.category_loading_img,
container:u,
label:d.defaultLabel,
data:n,
callback:function(n,a){
var i=e+1;
if(""===n){
g.delSubCategoryDropdown(i);
var c=$("#category_"+e+"_hidden").val("");
return g._o.formObj&&g._o.formObj.element(c),void("function"==typeof g._o.onChange&&g._o.onChange(g));
}
var c=$("#category_"+e+"_hidden").val(a),d=t?t+m.splitKey+a:a;
g._o.formObj&&g._o.formObj.element(c);
var l=r(e,d),f=o(l,g._o.defaultLabel),s=void 0;
g._g["category_name"+i]&&(s=y(f,g._g["category_name"+i]),g._g["category_name"+i]=""),
g.initCategory(e+1,d,f,s),"function"==typeof g._o.onChange&&g._o.onChange(g);
},
search:d.search,
canadd:d.canadd,
add:function(n,a){
if(n){
var r=f(e,t,n);
return-1===r?void s.err("同一级类目不能重名"):(r&&(a.add(o([r],g._o.defaultLabel)[1]),a.selected(a.opt.data.length-1)),
!0);
}
},
del:function(n,a){
n&&_.show({
type:"info",
width:600,
msg:"确定删除类目？",
className:"dialog-delete-confirm",
buttons:[{
text:"确定",
click:function(){
if(g._g.delingCategory!==!0){
var n=this,i=n.dom.find(".js_btn").eq(0);
i.btn(!1),g._g.delingCategory=!0,l({
categoryIndex:e,
key:t?t+m.splitKey+a:a,
onSuccess:function(){
i.btn(!0),g._g.delingCategory=!1,g.delSubCategoryDropdown(e);
var a=r(e-1,t);
g.initCategory(e,t,o(a,g._o.defaultLabel),0),s.suc("删除类目成功"),n.remove();
},
onError:function(e,t){
i.btn(!0),g._g.delingCategory=!1,s.err(t||"系统繁忙，请稍后再试");
}
});
}
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
}
}),d.candel&&u.find("ul").on("mouseover","li.js_dropdown_item_li",function(){
var n=$(this),a=n.find("a.jsDropdownItem");
if(a&&a.length>0){
var o=a.attr("data-name"),r=a.attr("data-value");
if(!r)return;
var i=n.find(".js_loading").show(),d=n.find(".js_del");
c({
categoryIndex:e,
key:t?t+m.splitKey+o:o,
callback:function(e){
e===!0?(d.show(),i.hide()):e===!1&&i.hide();
}
});
}
}),"undefined"!=typeof a&&i[h].selected(a);
}
}
},
getData:function(){
for(var e={},t=1;t<=m.categoryLimit;t++){
var n=($("#category_"+t+"_hidden").val()||"").trim();
e["category_name"+t]=n||"";
}
return e;
},
handle:function(e){
for(var t=this._g,n=1;n<=m.categoryLimit;n++){
var a=this.getDropdownKeyByIndex(n);
t[a]&&"function"==typeof t[a][e]&&t[a][e]();
}
},
select:function(e,t){
var n=this._g[this.getDropdownKeyByIndex(e)];
n&&"function"==typeof n.selected&&n.selected(t);
},
getDropdownKeyByIndex:function(e){
return"category_"+e+"_dropdown";
}
},{
myconstructor:t,
categoryLimit:m.categoryLimit
};
});define("tpl/richEditor/emotion.html.js",[],function(){
return'<span class="hook">\n	<span class="hook_dec hook_top"></span>\n	<span class="hook_dec hook_btm"></span>\n</span>\n<ul class="emotions" onselectstart="return false;">\n    {each edata as e index}\n        <li class="emotions_item">\n            <span class="icon_emotion_sprite js_emotion_i" data-name=\'{e.name}\'\n                data-title=\'{e.title}\' style=\'{e.bp}\'></span>\n        </li>\n    {/each}\n</ul>\n<span class="emotions_preview js_emotionPreviewArea"></span>\n';
});define("biz_common/utils/emoji_panel_data.js",[],function(){
return[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,54,55,56,57,60,62,63,64,65,66,67,68,70,74,75,76,78,79,80,81,82,83,84,85,89,92,93,94,95,300,301,302,303,304,305,306,307,204,205,202,206,212,211,313,314,315,316,317,318,319,320,321,322,323,308,309,310,311,312,209,324,215,214];
});define("cardticket/card_quantity.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js","tpl/cardticket/card_quantity.html.js","common/wx/tooltips.js","common/wx/tooltipsManager.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),a=t("common/wx/Tips.js"),i=(t("biz_web/ui/checkbox.js"),
t("cardticket/common_template_helper.js")),o=template.compile(t("tpl/cardticket/card_quantity.html.js")),s={
container:"",
quantityChange:$.noop,
max_sku_for_eachcard:1e4,
setquantity:!0
},n=t("common/wx/tooltips.js"),r=t("common/wx/tooltipsManager.js"),c=function(t){
t=$.extend(!0,{},s,t),this.opt=t;
var c=this;
t.data||(t.data={}),$(t.container).on("click",function(s){
function l(i,o){
$(".js_state_quantity",c.tooltip.$dom).hide();
var s=$(".js_state_"+i,c.tooltip.$dom).show(),n=s.attr("isinit");
if(0==i)e.get({
url:"/merchant/cardmoneymgr?action=get_card_price",
data:{
card_id:_
},
success:function(t){
if(0==t.base_resp.ret){
var a=$.parseJSON(t.result_json);
a.items[0].total_coin_balance=t.total_coin_balance,l(1,a.items[0]);
}else e.show(t);
}
});else if(1==i){
var d=o.price,m=o.total_coin_balance;
if(!n){
var p=$(".js_error",s),f=$(".js_total_price",s),h=$(".js_total_price_container",s),y=$(".js_value",s).keyup(function(){
var t=$(this),e=$.trim($(this).val());
if(!/^[0-9]+$/.test(e)||isNaN(e)||0>=e)return p.text("库存必须是不小于1的整数").show().addClass("fail"),
t.focus(),h.hide(),!1;
var a=1e9;
return e>=a?(p.text("库存不能大于10亿").show().addClass("fail"),t.focus(),!1):d*e>m?(p.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(m/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
t.focus(),h.show(),f.text(d*e/100),!1):(p.text("券点余额：%s，优先使用免费券点".sprintf(m/100)).show().removeClass("fail"),
h.show(),void f.text(d*e/100));
});
$(".js_confirm",s).click(function(){
var t=$.trim(y.val());
if(!/^[0-9]+$/.test(t)||isNaN(t)||0>=t)return p.text("库存必须是不小于1的整数").show().addClass("fail"),
y.focus(),h.hide(),!1;
var a=1e9;
return t>=a?(p.text("库存不能大于10亿").show().addClass("fail"),y.focus(),!1):d*t>m?(p.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(m/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
y.focus(),!1):($(this).btn(!1),t=parseInt(t),void e.get({
url:"/merchant/cardmoneymgr?action=get_card_pay_price",
data:{
card_id:_,
quantity:t
},
success:function(a){
0==a.base_resp.ret?(a.quantity=t,l(2,a)):e.show(a);
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),r.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100);
}else if(2==i){
if(!n){
var v=!1;
$(".js_confirm",s).click(function(){
v||($(this).btn(!1),v=!0,e.post({
url:"/merchant/cardmoneymgr?action=confirm_card_coin_pay",
data:{
card_id:_,
quantity:o.quantity,
free_coin:o.free_coin,
pay_coin:o.pay_coin,
order_id:o.order_id,
price:o.price
},
complete:function(){
v=!1;
},
success:function(t){
$(this).btn(!0),0==t.base_resp.ret?(t.addquantity=o.quantity,u.pay_info.is_swipe_card?l(9,t):l(3,t)):26==t.base_resp.ret?(t.is_fail=!1,
l(4,t)):10039==t.base_resp.ret||76==t.base_resp.ret?l(8,t):(t.is_fail=!0,l(4,t));
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),r.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100),s.find(".js_quantity").text(o.quantity),s.find(".js_freecoin").text(o.free_coin/100),
s.find(".js_paycoin").text(o.pay_coin/100);
}else if(3==i||9==i){
n||$(".js_close_quantity",s).click(function(){
r.removeAll();
});
var w=o.addquantity;
s.find(".js_quantity").text(w),$(t.container).data("isswipe")||a.suc("设置库存成功"),setTimeout(function(){
3==i&&r.removeAll();
},1500),t.quantityChange&&t.quantityChange.call(c,_,w);
}else 4==i||7==i||8==i?(n||$(".js_close_quantity",s).click(function(){
r.removeAll();
}),8==i&&$(".js_quantity_exceed_msg h4",s).text(t.max_sku_for_eachcard>0?" 子商户每张券累计只可发放%s份 ".sprintf(t.max_sku_for_eachcard):" 账号违规，不能改动库存，详请查看通知中心 ")):5==i?n||$(".js_go_activate",s).click(function(){
r.removeAll(),location.href=wx.url("/merchant/cardstat?action=overviewpage");
}):6==i&&e.get({
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
},function(t){
0==t.base_resp.ret?l(1==t.is_acct_open?0:5):e.handleRet(t,{
id:64463,
key:25,
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
});
});
s.attr("isinit",1);
}
var d,_=$(this).data("cid");
if(t.before&&t.before(_)===!1)return!1;
var u=t.data;
if(t.cache_card&&(u=t.cache_card[_]),u.is_sns_card&&3!=u.status&&5!=u.status&&6!=u.status)return a.err("审核中的朋友的券无法修改库存"),
!1;
if(u.is_sns_card){
if(c.tooltip=new n({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
reposition:!0,
type:"click",
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
}
}),l(6),c.tooltip.show(),r.removeAll(),r.add(c.tooltip),$(".popover").css({
"z-index":"10000",
width:"326px"
}),"fixed"==t.mode){
var m=parseInt(c.tooltip.$dom.css("top"))||0;
c.tooltip.$dom.css("top",m-($(document.documentElement||document.body).scrollTop()||0));
}
s.stopPropagation();
}else{
var p=new n({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
type:"click",
reposition:!0,
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var o=p.$dom,s=o.find(".js_value"),n=parseInt($.trim(s.val()));
if(isNaN(n)||0>=n)return a.err("库存必须是不能小于1的整数"),!1;
var l=1e9;
return n>=l?(a.err("库存不能大于10亿"),s.focus(),!1):void e.post({
url:"/merchant/electroniccardmgr",
data:{
action:t.setquantity?"modifyquantity":"setquantity",
card_id:_,
value:n,
isadd:d.value()
}
},function(o){
if(0==o.base_resp.ret)$(t.container).data("isswipe")||a.suc("设置库存成功"),r.removeAll(),
t.quantityChange&&t.quantityChange.call(c,_,!t.setquantity||d.value()?n:-n);else if(10039==o.base_resp.ret||76==o.base_resp.ret){
var s=$.parseJSON(o.biz_quota_json),l=i.parse_assistsend_quota(s.quota_list);
a.err(l.max_sku>0?"子商户每张券累计只可发放%s份".sprintf(l.max_sku):"账号违规，不能改动库存，详请查看通知中心");
}else 1e4==o.base_resp.ret?a.err("库存不能小于0"):e.show(o);
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
r.removeAll();
}
}]
});
if(p.show(),r.removeAll(),r.add(p),$(".popover").css({
"z-index":"10000",
width:"326px"
}),d=p.$dom.find(".js_quantity_type").checkbox(),p.$dom.find(".js_value").focus(),
"fixed"==t.mode){
var m=parseInt(p.$dom.css("top"))||0;
p.$dom.css("top",m-($(document.documentElement||document.body).scrollTop()||0));
}
s.stopPropagation();
}
window.report_click_ele&&window.report_click_ele(this);
});
};
return c;
});define("tpl/cardticket/card_preview.html.js",[],function(){
return'<div class="pop_card_preview js_pop_card_preview">\n	<span class="hook hook_right_top js_arrow">\n	<!--\n		箭头位置 \n		hook_right_top      右偏上\n		\n	-->\n		<span class="hook_top"></span>\n		<span class="hook_btm"></span>\n	</span>\n	<div class="card_preview">\n		<div class="client_side">\n			<div class="banner">{convert_type card.type}</div>\n			<div class="wrp">\n				<div class="top" style="background-color: {card.color};border-bottom-color: {card.color};">\n					<div class="logo group">\n						<div class="avartar l"><img src="{http2https card.logo_url}"></div>\n						<p>{card.brand_name}</p>\n					</div>\n					<div class="msg">\n						<div class="main_msg">\n							<p>{card.title}</p>\n							<p class="title_sub">{card.sub_title}</p>\n						</div>\n						<p class="time">有效期 {validtime card \'YYYY-MM-DD\'}</p>\n					</div>\n					<div class="deco"></div>\n				</div>\n				<div class="wrp_content">\n					<div class="wrp_section section_dispose">\n						{if card.code_type==0}\n							<div class="main_msg sn">1513-2290-1878</div>\n						{else if card.code_type==1}\n							<div class="bar_code_panel">\n								<div class="main_msg bar_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{else if card.code_type==2}\n							<div class="qr_code_panel">\n								<div class="main_msg qr_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{/if}\n						<p>{card.notice}</p>\n					</div>\n					<div class="wrp_section">\n						<ul class="info_list">\n							<li class="info_li">\n								<p class="info">{convert_type card.type}详情</p>\n								<span class="supply_area"><i class="ic ic_go"></i></span>\n							</li>\n							<li class="info_li">\n								<p class="info">适用门店</p>\n								<span class="supply_area">{card.location_id_list.length}家<i class="ic ic_go"></i></span>\n							</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>';
});