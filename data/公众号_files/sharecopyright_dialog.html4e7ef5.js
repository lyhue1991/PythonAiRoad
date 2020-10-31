function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/wx/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js","common/wx/Cgi.js"],function(e){
"use strict";
function i(e){
g.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),a=e("common/wx/dialog.js"),t=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=e("common/wx/Cgi.js"),s=wx.T,l=wx.path.webuploader,p=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",m={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/bmp,image/png, image/jpeg, image/jpg, image/gif"
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
mimeTypes:"image/bmp,image/png, image/jpeg, image/jpg, image/gif,application/pdf"
},
fileSingleSizeLimit:5242880
},
7:{
accept:{
extensions:"bmp,jpeg,jpg,gif",
mimeTypes:"image/bmp, image/jpeg, image/jpg, image/gif"
},
fileSingleSizeLimit:5242880
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/bmp,image/png, image/jpeg, image/jpg"
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
mimeTypes:"image/bmp,image/png, image/jpeg, image/jpg"
},
fileSingleSizeLimit:5242880
},
12:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/mp3,audio/wma,audio/wav,audio/amr"
},
fileSingleSizeLimit:31457280
}
};
m[15]=m[4];
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
},f={
swf:l,
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
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},g=new Image,h={},b=function(e){
if(!e.url)throw"missing url";
var a,l,p,c=$('<ul class="upload_file_box" style="display:none"></ul>'),g=$(e.container);
g.on("click",function(){
Math.random()<.1&&u(12),d(a);
}).parent().append(c),function(){
0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),l={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time),
pick:{
id:g,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},p=m[e.type]||m[2],e=$.extend(!0,{},f,l,p,e);
e.server;
0==n.Uploader.support("html5")&&e.compress&&(e.compress.quality=70),e.url.indexOf("cgi-bin/filetransfer?")>=0&&(e.url.indexOf("action=upload_material")>0||e.url.indexOf("action=preview")>0)&&(e.compress.afterCompressSizeLimit=10485760,
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
switch("object"===("undefined"==typeof a?"undefined":_typeof(a))&&(o=a),i){
case"Q_EXCEED_NUM_LIMIT":
t.err("一次上传最多只能上传%s个文件".sprintf(a));
break;

case"F_EXCEED_SIZE":
t.err("文件大小不能超过%s".sprintf(n.formatSize(a,"0")));
break;

case"F_EXCEED_COMPRESS_SIZE":
t.err("图片压缩后过大，请缩小图片尺寸再试"),u(42);
break;

case"Q_TYPE_DENIED":
t.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),a;
},w=function(e){
return function(i){
return i.url=e,b(i);
};
},v=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:b,
uploadBizFile:w(p+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:w(p+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:w(p+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:w(p+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:w(p+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:w(p+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:w(p+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:w(p+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:w(p+"/misc/setlocation?action=upload"),
mediaFile:w(p+"/cgi-bin/filetransfer?action=bizmedia"),
uploadCdnFileFromAd:function(e){
return w(p+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=p+"/cgi-bin/filetransfer?action=upload_material&f=json","undefined"!=typeof e.scene&&(e.url+="&scene="+e.scene),
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
return w(p+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
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
return w(p+"/cgi-bin/filetransfer?action=preview_check_range&f=json&"+n.join("&"));
},
tmpFileUrl:v(p+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:v(p+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:v(p+"/cgi-bin/filetransfer?action=multimedia")
};
});define("common/wx/tooltipsManager.js",["common/wx/tooltips.js"],function(t){
"use strict";
var o=t("common/wx/tooltips.js"),i={
tooltips:[],
init:function(t,i){
var n=this;
$(t).each(function(){
i.container=this,n.add(new o(i));
});
},
add:function(t){
this.tooltips.push(t);
},
hideAll:function(){
for(var t=0;t<this.tooltips.length;t++)this.tooltips[t].hide();
},
removeItem:function(t){
for(var o=0;o<this.tooltips.length;o++)if(this.tooltips[o]===t)return this.tooltips.splice(o,1),
t.$dom.remove(),!0;
return!1;
},
removeIndex:function(t){
if(!(t>=this.tooltips.length||0>t)){
var o=this.tooltips[t];
this.tooltips.splice(t,1),o.$dom.remove();
}
},
current:function(){},
hide:function(){},
removeAll:function(){
for(var t=0;t<this.tooltips.length;t++)this.tooltips[t].$dom.remove();
this.tooltips=[];
}
};
return i;
});define("tpl/biz_web/ui/dropdown.html.js",[],function(){
return'<a href="javascript:;" class="btn dropdown_switch jsDropdownBt"><label class="jsBtLabel" {if search}contenteditable="true"{/if}>{label}</label><i class="arrow"></i></a>\n<div class="dropdown_data_container jsDropdownList">\n    <ul class="dropdown_data_list">\n        {if renderHtml}\n        {=renderHtml}\n        {else}\n            {each data as o index}\n            <li class="dropdown_data_item {if o.className}{o.className}{/if}">  \n                <a onclick="return false;" href="javascript:;" class="jsDropdownItem" data-value="{o.value}" data-index="{index}" data-name="{o.name}">{o.name}</a>\n            </li>\n            {/each}        \n        {/if}\n    </ul>\n</div>\n';
});define("media/media_dialog.js",["widget/media/media_dialog.css","widget/media/richvideo.css","common/wx/popup.js","common/wx/mpEditor/common/eventbus.js","common/wx/Tips.js","media/media_cgi.js","biz_web/utils/upload.js","common/wx/pagebar.js","common/wx/media/audio.js","common/wx/media/img.js","common/wx/media/video.js","common/wx/media/appmsg.js","cardticket/send_card.js","common/wx/time.js","tpl/media/dialog/file_layout.html.js","tpl/media/dialog/appmsg_layout.html.js","tpl/media/dialog/videomsg_layout.html.js","tpl/media/dialog/file.html.js","common/wx/Cgi.js"],function(e){
"use strict";
function i(e,i,t,o,a){
{
var n=e/i+1;
new y({
container:$(".pageNavigator",u.popup("get")),
perPage:i,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:t,
callback:function(e){
var t=e.currentPage;
t!=n&&(t--,a.begin=i*t,F.key&&(a.key=F.key),o(a));
}
});
}
}
function t(e,i,t,a,n,l,c){
u&&u.popup("remove"),15==t&&(e="videomsg");
var r=T++;
if(u=$(p(J[e],{
tpl:i,
upload_id:r,
type:t,
token:wx.data.t
}).trim()).popup({
title:"选择素材",
className:h,
width:960,
onOK:function(){
var e=this;
if(1==m)return!0;
var i=d(g).parent().data("opt");
if(!i)return void v.err("请选择素材");
if(i.data.has_cps_product=i.data.has_cps_product||0,c&&1==i.data.has_cps_product){
if(m=!0,1==i.cpsfail)return m=!1,!0;
{
d(g);
}
return i.cpsloading=!0,i.cpsfail=!1,i.isSupportPaidSubscribe=l.isSupportPaidSubscribe,
new k(i),i.container.find(".appmsg").addClass("selected"),L.get({
url:"/cgi-bin/cpsproductmaterial?action=get_appmsg_check_status&appmsg_id="+i.data.app_id
},function(t){
return 1==t.cps_check_fail?(i.cpsloading=!1,i.cpsfail=!0,new k(i),i.container.find(".appmsg").addClass("selected"),
void(m=!1)):(i.cpsloading=!1,i.cpsfail=!1,n&&!n()?(v.err("请选择素材"),!0):(e.remove(),
u=null,document.body.style.overflow=document.documentElement.style.overflow="auto",
void(m=!1)));
}),!0;
}
return n&&!n()?(v.err("请选择素材"),!0):(this.remove(),u=null,void(document.body.style.overflow=document.documentElement.style.overflow="auto"));
},
onCancel:function(){
this.remove(),u=null,document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}),g=u.popup("get"),j({
container:"#js_media_dialog_upload"+r,
type:t,
onAllComplete:function(){
v.suc("上传成功"),l.begin=0,s(l);
}
}),a){
if("file"==e&&($(".js_media_list",g).html(p(B,{
list:a
})),$(".frm_radio[type=radio]",g).checkbox(!1),$(".media_content",g).each(function(){
var e=$(this),i=e.data("id"),t=e.data("type"),o=D[i];
o&&t&&z[t]&&z[t](e,o);
})),"appmsg"==e)for(var f=a.length,_=$(".js_appmsg_list .inner",g),w=0;f>w;++w){
var y=a[w],S=_.eq(w%2),b=y.app_id,x=!1;
if(y.multi_item)for(var C=0;C<y.multi_item.length;C++)(5==y.multi_item[C].share_page_type||7==y.multi_item[C].share_page_type||8==y.multi_item[C].share_page_type)&&(x=!0);
var I=$('<div id="appmsg%s"></div>'.sprintf(b),S).appendTo(S);
new k({
highlight:F.key?!0:!1,
container:I,
data:y,
showMask:!0,
type:t,
isShareMul:x,
isSupportShareMul:l.isSupportShareMul,
isSupportPaidSubscribe:l.isSupportPaidSubscribe,
useUpdateTime:!0
});
}
if("videomsg"==e){
var A=g.find("#js_videomsg_list").find(".inner");
a.each(function(e,i){
var o=A.eq(i%2),a=$('<div id="appmsg%s"></div>'.sprintf(e.app_id),o).appendTo(o);
z[t]&&z[t](a,e);
});
}
u.popup("resetPosition"),o();
}
}
function o(){
(10==F.type||11==F.type)&&($("#msgSearchInput").on("input",function(){
0==$(this).val().length?$("#searchCloseBt").hide():$("#searchCloseBt").show();
}),$("#searchCloseBt").click(function(){
$("#msgSearchInput").val(""),$(this).hide();
}),$("#msgSearchBtn").click(function(){
return $("#msgSearchInput").val().length>0?(F.key=$("#msgSearchInput").val(),void l(F)):void v.err("请输入搜索关键词");
}),$("#msgSearchInput").keydown(function(e){
var i="which"in e?e.which:e.keyCode;
13==i&&$("#msgSearchBtn").trigger("click");
}));
}
function a(e){
f.fireEvent("showImageDialog",{
maxselect:e.maxselect||1,
uploadscene:6,
scene:"biz",
desc:"大小不超过10M"
},function(i){
if(!i)return!1;
var t=null;
t=e.maxselect>1?i.map(function(e){
return{
file_id:e.fileId,
copyright_status:e.copyrightStatus,
source:"file",
url:e.url
};
}):{
file_id:i[0].fileId,
copyright_status:i[0].copyrightStatus,
source:"file",
url:i[0].url
},e.onSelect&&e.onSelect(e.type,t);
});
}
function n(e){
f.fireEvent("showVideoDialog",{
scene:e.scene,
msgtype:5,
canusetxvideo:!0,
canuselink:"ueditor"===e.scene||"masssend"===e.scene
},function(i){
return i?(e.onSelect&&e.onSelect(15,i),!0):!1;
});
}
function s(e){
var o=e.type,d=e.onSelect,l=e.count||10,c=e.begin||0;
return 2==o?void a(e):21==o?void n(e):(t("file","loading",o),void _.getList(o,c,l,function(a){
if(u){
var n={
2:"img_cnt",
3:"voice_cnt",
4:"video_cnt"
},r=a.file_item,m=a.file_cnt[n[o]];
r.length<=0?t("file","no-media",o,r,null,e):(t("file","files",o,r,function(){
var e=g.find('[name="media"]:checked').val(),i=$("#fileItem"+e).data("opt");
return i?(d(o,i),!0):!1;
},e),i(c,l,m,s,e));
}
}));
}
function d(e){
return e.find(".appmsg.selected,.Js_videomsg.selected");
}
function l(e){
var o=e.type,a=e.onSelect,s=e.count||10,c=e.key||"",r=e.begin||0;
return F=$.extend(!0,{},e),15==o?void n(e):(t("appmsg","loading",o),void _.appmsg.getList(o,r,s,function(n){
if(u){
var c={
10:"app_msg_cnt",
11:"commondity_msg_cnt",
15:"video_msg_cnt"
},p=n.item,f=n.file_cnt[c[o]];
F.key&&(f=n.search_cnt),p.length<=0?t("appmsg","no-media",o,p,null,e):(t("appmsg","files",o,p,function(){
var e=d(g).parent().data("opt");
return e?(a(o,e),!0):!1;
},e,!0),i(r,s,f,l,e),15==o?(g.on("click",".Js_videomsg",function(){
$(this).find(".loading_tips").length?v.err("视频在转码中，不能选择"):""!=$(this).find(".title").text().trim()&&(g.find(".Js_videomsg").removeClass("selected"),
$(this).addClass("selected"));
}),g.on("mouseenter",".Js_videomsg",function(){
""==$(this).find(".title").text().trim()&&$(this).addClass("no_title");
}),g.on("mouseleave",".Js_videomsg",function(){
$(this).removeClass("no_title");
})):g.on("click",".appmsg",function(){
0==m&&("2"!=$(this).data("havepaidarticle")&&"1"!=$(this).data("issupportpaidsubscribe")||!("1"==$(this).data("completed")&&"2"==$(this).data("issharemul")||"1"==$(this).data("completed")&&"1"==$(this).data("issharemul")&&"1"==$(this).data("issupportsharemul"))||(d(g).removeClass("selected"),
$(this).addClass("selected")));
}));
}
},c));
}
function c(e){
var i=e.onSelect,t=e.type,o=new C({
multi:!1,
selectComplete:function(e){
return e?(i(t,e),void(o=null)):void v.err("请选择卡券");
},
param:{
need_member_card:1
},
source:"直接群发卡券"
});
o.show();
}
function r(e){
var i=!0;
0==e.hasAudioLengthLimit&&(i=!1),f.fireEvent("showAudioMusicDialog",{
allowAudio:!0,
allowMusic:!1,
hasAudiolengthLimit:i,
allowAudioNumber:1,
selectedAudioItems:N
},function(i){
i&&(i=i[0],N=[i],e.onSelect(3,i));
});
}
e("widget/media/media_dialog.css"),e("widget/media/richvideo.css"),e("common/wx/popup.js");
var m=!1,p=wx.T,u=null,g=null,f=e("common/wx/mpEditor/common/eventbus.js"),h="media align_edge",v=e("common/wx/Tips.js"),_=e("media/media_cgi.js"),w=e("biz_web/utils/upload.js"),y=e("common/wx/pagebar.js"),j=w.uploadBizFile,S=(template.render,
e("common/wx/media/audio.js")),b=e("common/wx/media/img.js"),x=e("common/wx/media/video.js"),k=e("common/wx/media/appmsg.js"),C=e("cardticket/send_card.js"),I=e("common/wx/time.js"),A=I.timeFormat,E=e("tpl/media/dialog/file_layout.html.js"),P=e("tpl/media/dialog/appmsg_layout.html.js"),M=e("tpl/media/dialog/videomsg_layout.html.js"),B=e("tpl/media/dialog/file.html.js"),L=e("common/wx/Cgi.js"),T=1,D={},J={
appmsg:P,
videomsg:M,
file:E
};
template.helper("mediaDialogtimeFormat",function(e){
return A(e);
}),template.helper("mediaDialogInit",function(e){
return e.file_id?(D[e.file_id]=e,""):"";
});
var z={
2:function(e,i){
return new b({
container:$("#"+e.attr("id")),
file_id:i.file_id,
source:"file",
fakeid:i.fakeid
});
},
3:function(e,i){
var t=i;
return t.selector="#"+e.attr("id"),t.source="file",new S(t);
},
4:function(e,i){
var t=i;
return t.selector="#"+e.attr("id"),t.id=t.file_id,t.source="file",new x(t);
},
15:function(e,i){
var t=i;
return t.selector=e,t.id=t.app_id,t.tpl="videomsg",t.for_selection=!0,t.for_transfer=!!t.content,
t.hide_transfer=!!t.content,t.video_id=t.content,new x(t);
}
},F={},N=[];
return{
getFile:s,
getVoice:r,
getAppmsg:l,
getCardList:c
};
});define("tpl/media/qqmusicaudio.html.js",[],function(){
return'<div class="qqmusic_audio" id="wxAudioBox{id}" data-aid="{id}">\n    <a class="audio_switch" href="javascript:;"  onclick=\'return false;\' title="点击播放">\n        <i class="icon_qqmusic"></i>\n    </a>\n</div>\n';
});define("tpl/media/audio.html.js",[],function(){
return'<div class="audio_msg" id="wxAudioBox{id}" data-aid="{id}" data-fid="{file_id}" data-source="{source}">\n    <div class="icon_audio_wrp"><span class="icon_audio_msg"></span></div>\n    <div class="audio_content">\n        <div class="audio_title">{title}</div>\n        <div class="audio_length">{play_length}</div>\n        {if showTime==true}<div class="audio_date">{update_time}</div>{/if}\n    </div>\n</div>\n';
});define("biz_web/lib/soundmanager2.js",[],function(){
"use strict";
function e(e,n){
function o(e){
return pt.preferFlash&&rt&&!pt.ignoreFlash&&pt.flash[e]!==t&&pt.flash[e];
}
function i(e){
return function(t){
var n,o=this._s;
return o&&o._a?n=e.call(this,t):(pt._wD(o&&o.id?o.id+": Ignoring "+t.type:wt+"Ignoring "+t.type),
n=null),n;
};
}
this.setupOptions={
url:e||null,
flashVersion:8,
debugMode:!1,
debugFlash:!1,
useConsole:!1,
consoleOnly:!0,
waitForWindowLoad:!1,
bgColor:"#ffffff",
useHighPerformance:!1,
flashPollingInterval:null,
html5PollingInterval:null,
flashLoadTimeout:1e3,
wmode:null,
allowScriptAccess:"always",
useFlashBlock:!1,
useHTML5Audio:!0,
html5Test:/^(probably|maybe)$/i,
preferFlash:!0,
noSWFCache:!1,
idPrefix:"sound"
},this.defaultOptions={
autoLoad:!1,
autoPlay:!1,
from:null,
loops:1,
onid3:null,
onload:null,
whileloading:null,
onplay:null,
onpause:null,
onresume:null,
whileplaying:null,
onposition:null,
onstop:null,
onfailure:null,
onfinish:null,
multiShot:!0,
multiShotEvents:!1,
position:null,
pan:0,
stream:!0,
to:null,
type:null,
usePolicyFile:!1,
volume:100
},this.flash9Options={
isMovieStar:null,
usePeakData:!1,
useWaveformData:!1,
useEQData:!1,
onbufferchange:null,
ondataerror:null
},this.movieStarOptions={
bufferTime:3,
serverURL:null,
onconnect:null,
duration:null
},this.audioFormats={
mp3:{
type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],
required:!0
},
mp4:{
related:["aac","m4a","m4b"],
type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],
required:!1
},
ogg:{
type:["audio/ogg; codecs=vorbis"],
required:!1
},
opus:{
type:["audio/ogg; codecs=opus","audio/opus"],
required:!1
},
wav:{
type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],
required:!1
}
},this.movieID="sm2-container",this.id=n||"sm2movie",this.debugID="soundmanager-debug",
this.debugURLParam=/([#?&])debug=1/i,this.versionNumber="V2.97a.20130512",this.version=null,
this.movieURL=null,this.altURL=null,this.swfLoaded=!1,this.enabled=!1,this.oMC=null,
this.sounds={},this.soundIDs=[],this.muted=!1,this.didFlashBlock=!1,this.filePattern=null,
this.filePatterns={
flash8:/\.mp3(\?.*)?$/i,
flash9:/\.mp3(\?.*)?$/i
},this.features={
buffering:!1,
peakData:!1,
waveformData:!1,
eqData:!1,
movieStar:!1
},this.sandbox={
type:null,
types:{
remote:"remote (domain-based) rules",
localWithFile:"local with file access (no internet access)",
localWithNetwork:"local with network (internet access only, no local access)",
localTrusted:"local, trusted (local+internet access)"
},
description:null,
noRemote:null,
noLocal:null
},this.html5={
usingFlash:null
},this.flash={},this.html5Only=!1,this.ignoreFlash=!1;
var a,s,r,l,u,d,f,h,c,p,m,_,g,y,w,v,b,O,D,M,L,T,P,S,F,I,H,E,A,k,C,x,R,N,U,B,W,j,q,V,Q,$,K,J,X,z,G,Z,Y,et,tt,nt,ot,it,at,st,rt,lt,ut,dt,ft,ht,ct,pt=this,mt=null,_t=null,gt="soundManager",yt=gt+": ",wt="HTML5::",vt=navigator.userAgent,bt=window.location.href.toString(),Ot=document,Dt=[],Mt=!0,Lt=!1,Tt=!1,Pt=!1,St=!1,Ft=!1,It=0,Ht=["log","info","warn","error"],Et=8,At=null,kt=null,Ct=!1,xt=!1,Rt=0,Nt=null,Ut=[],Bt=null,Wt=Array.prototype.slice,jt=!1,qt=0,Vt=vt.match(/(ipad|iphone|ipod)/i),Qt=vt.match(/android/i),$t=vt.match(/msie/i),Kt=vt.match(/webkit/i),Jt=vt.match(/safari/i)&&!vt.match(/chrome/i),Xt=vt.match(/opera/i),zt=vt.match(/firefox/i),Gt=vt.match(/(mobile|pre\/|xoom)/i)||Vt||Qt,Zt=!bt.match(/usehtml5audio/i)&&!bt.match(/sm2\-ignorebadua/i)&&Jt&&!vt.match(/silk/i)&&vt.match(/OS X 10_6_([3-7])/i),Yt=window.console!==t&&console.log!==t,en=Ot.hasFocus!==t?Ot.hasFocus():null,tn=Jt&&(Ot.hasFocus===t||!Ot.hasFocus()),nn=!tn,on=/(mp3|mp4|mpa|m4a|m4b)/i,an=1e3,sn="about:blank",rn=Ot.location?Ot.location.protocol.match(/http/i):null,ln=rn?"":"http://",un=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,dn=["mpeg4","aac","flv","mov","mp4","m4v","f4v","m4a","m4b","mp4v","3gp","3g2"],fn=new RegExp("\\.("+dn.join("|")+")(\\?.*)?$","i");
this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i,this.useAltURL=!rn,
W={
swfBox:"sm2-object-box",
swfDefault:"movieContainer",
swfError:"swf_error",
swfTimedout:"swf_timedout",
swfLoaded:"swf_loaded",
swfUnblocked:"swf_unblocked",
sm2Debug:"sm2_debug",
highPerf:"high_performance",
flashDebug:"flash_debug"
},this.hasHTML5=function(){
try{
return Audio!==t&&(Xt&&opera!==t&&opera.version()<10?new Audio(null):new Audio).canPlayType!==t;
}catch(e){
return!1;
}
}(),this.setup=function(e){
var n=!pt.url;
return e!==t&&Pt&&Bt&&pt.ok()&&(e.flashVersion!==t||e.url!==t||e.html5Test!==t)&&Q(N("setupLate")),
m(e),e&&(n&&F&&e.url!==t&&pt.beginDelayedInit(),F||e.url===t||"complete"!==Ot.readyState||setTimeout(P,1)),
pt;
},this.ok=function(){
return Bt?Pt&&!St:pt.useHTML5Audio&&pt.hasHTML5;
},this.supported=this.ok,this.getMovie=function(e){
return s(e)||Ot[e]||window[e];
},this.createSound=function(e,n){
function o(){
return r=q(r),pt.sounds[r.id]=new a(r),pt.soundIDs.push(r.id),pt.sounds[r.id];
}
var i,s,r,l=null;
if(i=gt+".createSound(): ",s=i+N(Pt?"notOK":"notReady"),!Pt||!pt.ok())return Q(s),
!1;
if(n!==t&&(e={
id:e,
url:n
}),r=p(e),r.url=z(r.url),void 0===r.id&&(r.id=pt.setupOptions.idPrefix+qt++),r.id.toString().charAt(0).match(/^[0-9]$/)&&pt._wD(i+N("badID",r.id),2),
pt._wD(i+r.id+(r.url?" ("+r.url+")":""),1),$(r.id,!0))return pt._wD(i+r.id+" exists",1),
pt.sounds[r.id];
if(Y(r))l=o(),pt._wD(r.id+": Using HTML5"),l._setup_html5(r);else{
if(pt.html5Only)return pt._wD(r.id+": No HTML5 support for this sound, and no Flash. Exiting."),
o();
if(pt.html5.usingFlash&&r.url&&r.url.match(/data\:/i))return pt._wD(r.id+": data: URIs not supported via Flash. Exiting."),
o();
d>8&&(null===r.isMovieStar&&(r.isMovieStar=!!(r.serverURL||(r.type?r.type.match(un):!1)||r.url&&r.url.match(fn))),
r.isMovieStar&&(pt._wD(i+"using MovieStar handling"),r.loops>1&&h("noNSLoop"))),
r=V(r,i),l=o(),8===d?_t._createSound(r.id,r.loops||1,r.usePolicyFile):(_t._createSound(r.id,r.url,r.usePeakData,r.useWaveformData,r.useEQData,r.isMovieStar,r.isMovieStar?r.bufferTime:!1,r.loops||1,r.serverURL,r.duration||null,r.autoPlay,!0,r.autoLoad,r.usePolicyFile),
r.serverURL||(l.connected=!0,r.onconnect&&r.onconnect.apply(l))),r.serverURL||!r.autoLoad&&!r.autoPlay||l.load(r);
}
return!r.serverURL&&r.autoPlay&&l.play(),l;
},this.destroySound=function(e,t){
if(!$(e))return!1;
var n,o=pt.sounds[e];
for(o._iO={},o.stop(),o.unload(),n=0;n<pt.soundIDs.length;n++)if(pt.soundIDs[n]===e){
pt.soundIDs.splice(n,1);
break;
}
return t||o.destruct(!0),o=null,delete pt.sounds[e],!0;
},this.load=function(e,t){
return $(e)?pt.sounds[e].load(t):!1;
},this.unload=function(e){
return $(e)?pt.sounds[e].unload():!1;
},this.onPosition=function(e,t,n,o){
return $(e)?pt.sounds[e].onposition(t,n,o):!1;
},this.onposition=this.onPosition,this.clearOnPosition=function(e,t,n){
return $(e)?pt.sounds[e].clearOnPosition(t,n):!1;
},this.play=function(e,t){
var n=null,o=t&&!(t instanceof Object);
if(!Pt||!pt.ok())return Q(gt+".play(): "+N(Pt?"notOK":"notReady")),!1;
if($(e,o))o&&(t={
url:t
});else{
if(!o)return!1;
o&&(t={
url:t
}),t&&t.url&&(pt._wD(gt+'.play(): Attempting to create "'+e+'"',1),t.id=e,n=pt.createSound(t).play());
}
return null===n&&(n=pt.sounds[e].play(t)),n;
},this.start=this.play,this.setPosition=function(e,t){
return $(e)?pt.sounds[e].setPosition(t):!1;
},this.stop=function(e){
return $(e)?(pt._wD(gt+".stop("+e+")",1),pt.sounds[e].stop()):!1;
},this.stopAll=function(){
var e;
pt._wD(gt+".stopAll()",1);
for(e in pt.sounds)pt.sounds.hasOwnProperty(e)&&pt.sounds[e].stop();
},this.pause=function(e){
return $(e)?pt.sounds[e].pause():!1;
},this.pauseAll=function(){
var e;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].pause();
},this.resume=function(e){
return $(e)?pt.sounds[e].resume():!1;
},this.resumeAll=function(){
var e;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].resume();
},this.togglePause=function(e){
return $(e)?pt.sounds[e].togglePause():!1;
},this.setPan=function(e,t){
return $(e)?pt.sounds[e].setPan(t):!1;
},this.setVolume=function(e,t){
return $(e)?pt.sounds[e].setVolume(t):!1;
},this.mute=function(e){
var t=0;
if(e instanceof String&&(e=null),e)return $(e)?(pt._wD(gt+'.mute(): Muting "'+e+'"'),
pt.sounds[e].mute()):!1;
for(pt._wD(gt+".mute(): Muting all sounds"),t=pt.soundIDs.length-1;t>=0;t--)pt.sounds[pt.soundIDs[t]].mute();
return pt.muted=!0,!0;
},this.muteAll=function(){
pt.mute();
},this.unmute=function(e){
var t;
if(e instanceof String&&(e=null),e)return $(e)?(pt._wD(gt+'.unmute(): Unmuting "'+e+'"'),
pt.sounds[e].unmute()):!1;
for(pt._wD(gt+".unmute(): Unmuting all sounds"),t=pt.soundIDs.length-1;t>=0;t--)pt.sounds[pt.soundIDs[t]].unmute();
return pt.muted=!1,!0;
},this.unmuteAll=function(){
pt.unmute();
},this.toggleMute=function(e){
return $(e)?pt.sounds[e].toggleMute():!1;
},this.getMemoryUse=function(){
var e=0;
return _t&&8!==d&&(e=parseInt(_t._getMemoryUse(),10)),e;
},this.disable=function(e){
var n;
if(e===t&&(e=!1),St)return!1;
for(St=!0,h("shutdown",1),n=pt.soundIDs.length-1;n>=0;n--)C(pt.sounds[pt.soundIDs[n]]);
return c(e),at.remove(window,"load",w),!0;
},this.canPlayMIME=function(e){
var t;
return pt.hasHTML5&&(t=et({
type:e
})),!t&&Bt&&(t=e&&pt.ok()?!!((d>8?e.match(un):null)||e.match(pt.mimePattern)):null),
t;
},this.canPlayURL=function(e){
var t;
return pt.hasHTML5&&(t=et({
url:e
})),!t&&Bt&&(t=e&&pt.ok()?!!e.match(pt.filePattern):null),t;
},this.canPlayLink=function(e){
return e.type!==t&&e.type&&pt.canPlayMIME(e.type)?!0:pt.canPlayURL(e.href);
},this.getSoundById=function(e,t){
if(!e)return null;
var n=pt.sounds[e];
return n||t||pt._wD(gt+'.getSoundById(): Sound "'+e+'" not found.',2),n;
},this.onready=function(e,t){
var n="onready",o=!1;
if("function"!=typeof e)throw N("needFunction",n);
return Pt&&pt._wD(N("queue",n)),t||(t=window),g(n,e,t),y(),o=!0,o;
},this.ontimeout=function(e,t){
var n="ontimeout",o=!1;
if("function"!=typeof e)throw N("needFunction",n);
return Pt&&pt._wD(N("queue",n)),t||(t=window),g(n,e,t),y({
type:n
}),o=!0,o;
},this._writeDebug=function(e,n){
var o,i,a="soundmanager-debug";
return pt.debugMode?Yt&&pt.useConsole&&(n&&"object"==typeof n?console.log(e,n):Ht[n]!==t?console[Ht[n]](e):console.log(e),
pt.consoleOnly)?!0:(o=s(a))?(i=Ot.createElement("div"),++It%2===0&&(i.className="sm2-alt"),
n=n===t?0:parseInt(n,10),i.appendChild(Ot.createTextNode(e)),n&&(n>=2&&(i.style.fontWeight="bold"),
3===n&&(i.style.color="#ff3333")),o.insertBefore(i,o.firstChild),o=null,!0):!1:!1;
},-1!==bt.indexOf("sm2-debug=alert")&&(this._writeDebug=function(e){
window.alert(e);
}),this._wD=this._writeDebug,this._debug=function(){
var e,t;
for(h("currentObj",1),e=0,t=pt.soundIDs.length;t>e;e++)pt.sounds[pt.soundIDs[e]]._debug();
},this.reboot=function(e,t){
pt.soundIDs.length&&pt._wD("Destroying "+pt.soundIDs.length+" SMSound object"+(1!==pt.soundIDs.length?"s":"")+"...");
var n,o,i;
for(n=pt.soundIDs.length-1;n>=0;n--)pt.sounds[pt.soundIDs[n]].destruct();
if(_t)try{
$t&&(kt=_t.innerHTML),At=_t.parentNode.removeChild(_t);
}catch(a){
h("badRemove",2);
}
if(kt=At=Bt=_t=null,pt.enabled=F=Pt=Ct=xt=Lt=Tt=St=jt=pt.swfLoaded=!1,pt.soundIDs=[],
pt.sounds={},qt=0,e)Dt=[];else for(n in Dt)if(Dt.hasOwnProperty(n))for(o=0,i=Dt[n].length;i>o;o++)Dt[n][o].fired=!1;
return t||pt._wD(gt+": Rebooting..."),pt.html5={
usingFlash:null
},pt.flash={},pt.html5Only=!1,pt.ignoreFlash=!1,window.setTimeout(function(){
T(),t||pt.beginDelayedInit();
},20),pt;
},this.reset=function(){
return h("reset"),pt.reboot(!0,!0);
},this.getMoviePercent=function(){
return _t&&"PercentLoaded"in _t?_t.PercentLoaded():null;
},this.beginDelayedInit=function(){
Ft=!0,P(),setTimeout(function(){
return xt?!1:(H(),L(),xt=!0,!0);
},20),v();
},this.destruct=function(){
pt._wD(gt+".destruct()"),pt.disable(!0);
},a=function(e){
var n,o,i,a,s,r,l,u,c,m,_=this,g=!1,y=[],w=0,v=null;
c={
duration:null,
time:null
},this.id=e.id,this.sID=this.id,this.url=e.url,this.options=p(e),this.instanceOptions=this.options,
this._iO=this.instanceOptions,this.pan=this.options.pan,this.volume=this.options.volume,
this.isHTML5=!1,this._a=null,m=this.url?!1:!0,this.id3={},this._debug=function(){
pt._wD(_.id+": Merged options:",_.options);
},this.load=function(e){
var n,o=null;
if(e!==t?_._iO=p(e,_.options):(e=_.options,_._iO=e,v&&v!==_.url&&(h("manURL"),_._iO.url=_.url,
_.url=null)),_._iO.url||(_._iO.url=_.url),_._iO.url=z(_._iO.url),_.instanceOptions=_._iO,
n=_._iO,pt._wD(_.id+": load ("+n.url+")"),!n.url&&!_.url)return pt._wD(_.id+": load(): url is unassigned. Exiting.",2),
_;
if(_.isHTML5||8!==d||_.url||n.autoPlay||pt._wD(_.id+": Flash 8 load() limitation: Wait for onload() before calling play().",1),
n.url===_.url&&0!==_.readyState&&2!==_.readyState)return h("onURL",1),3===_.readyState&&n.onload&&ct(_,function(){
n.onload.apply(_,[!!_.duration]);
}),_;
if(_.loaded=!1,_.readyState=1,_.playState=0,_.id3={},Y(n))o=_._setup_html5(n),o._called_load?pt._wD(_.id+": Ignoring request to load again"):(_._html5_canplay=!1,
_.url!==n.url&&(pt._wD(h("manURL")+": "+n.url),_._a.src=n.url,_.setPosition(0)),
_._a.autobuffer="auto",_._a.preload="auto",_._a._called_load=!0,n.autoPlay&&_.play());else{
if(pt.html5Only)return pt._wD(_.id+": No flash support. Exiting."),_;
if(_._iO.url&&_._iO.url.match(/data\:/i))return pt._wD(_.id+": data: URIs not supported via Flash. Exiting."),
_;
try{
_.isHTML5=!1,_._iO=V(q(n)),n=_._iO,8===d?_t._load(_.id,n.url,n.stream,n.autoPlay,n.usePolicyFile):_t._load(_.id,n.url,!!n.stream,!!n.autoPlay,n.loops||1,!!n.autoLoad,n.usePolicyFile);
}catch(i){
h("smError",2),f("onload",!1),E({
type:"SMSOUND_LOAD_JS_EXCEPTION",
fatal:!0
});
}
}
return _.url=n.url,_;
},this.unload=function(){
return 0!==_.readyState&&(pt._wD(_.id+": unload()"),_.isHTML5?(a(),_._a&&(_._a.pause(),
v=nt(_._a))):8===d?_t._unload(_.id,sn):_t._unload(_.id),n()),_;
},this.destruct=function(e){
pt._wD(_.id+": Destruct"),_.isHTML5?(a(),_._a&&(_._a.pause(),nt(_._a),jt||i(),_._a._s=null,
_._a=null)):(_._iO.onfailure=null,_t._destroySound(_.id)),e||pt.destroySound(_.id,!0);
},this.play=function(e,n){
var o,i,a,l,f,h,c,y=!0,w=null;
if(o=_.id+": play(): ",n=n===t?!0:n,e||(e={}),_.url&&(_._iO.url=_.url),_._iO=p(_._iO,_.options),
_._iO=p(e,_._iO),_._iO.url=z(_._iO.url),_.instanceOptions=_._iO,!_.isHTML5&&_._iO.serverURL&&!_.connected)return _.getAutoPlay()||(pt._wD(o+" Netstream not connected yet - setting autoPlay"),
_.setAutoPlay(!0)),_;
if(Y(_._iO)&&(_._setup_html5(_._iO),s()),1!==_.playState||_.paused||(i=_._iO.multiShot,
i?pt._wD(o+"Already playing (multi-shot)",1):(pt._wD(o+"Already playing (one-shot)",1),
_.isHTML5&&_.setPosition(_._iO.position),w=_)),null!==w)return w;
if(e.url&&e.url!==_.url&&(_.readyState||_.isHTML5||8!==d||!m?_.load(_._iO):m=!1),
_.loaded?pt._wD(o.substr(0,o.lastIndexOf(":"))):0===_.readyState?(pt._wD(o+"Attempting to load"),
_.isHTML5||pt.html5Only?_.isHTML5?_.load(_._iO):(pt._wD(o+"Unsupported type. Exiting."),
w=_):(_._iO.autoPlay=!0,_.load(_._iO)),_.instanceOptions=_._iO):2===_.readyState?(pt._wD(o+"Could not load - exiting",2),
w=_):pt._wD(o+"Loading - attempting to play..."),null!==w)return w;
if(!_.isHTML5&&9===d&&_.position>0&&_.position===_.duration&&(pt._wD(o+"Sound at end, resetting to position:0"),
e.position=0),_.paused&&_.position>=0&&(!_._iO.serverURL||_.position>0))pt._wD(o+"Resuming from paused state",1),
_.resume();else{
if(_._iO=p(e,_._iO),null!==_._iO.from&&null!==_._iO.to&&0===_.instanceCount&&0===_.playState&&!_._iO.serverURL){
if(l=function(){
_._iO=p(e,_._iO),_.play(_._iO);
},_.isHTML5&&!_._html5_canplay?(pt._wD(o+"Beginning load for from/to case"),_.load({
oncanplay:l
}),w=!1):_.isHTML5||_.loaded||_.readyState&&2===_.readyState||(pt._wD(o+"Preloading for from/to case"),
_.load({
onload:l
}),w=!1),null!==w)return w;
_._iO=u();
}
(!_.instanceCount||_._iO.multiShotEvents||_.isHTML5&&_._iO.multiShot&&!jt||!_.isHTML5&&d>8&&!_.getAutoPlay())&&_.instanceCount++,
_._iO.onposition&&0===_.playState&&r(_),_.playState=1,_.paused=!1,_.position=_._iO.position===t||isNaN(_._iO.position)?0:_._iO.position,
_.isHTML5||(_._iO=V(q(_._iO))),_._iO.onplay&&n&&(_._iO.onplay.apply(_),g=!0),_.setVolume(_._iO.volume,!0),
_.setPan(_._iO.pan,!0),_.isHTML5?_.instanceCount<2?(s(),a=_._setup_html5(),_.setPosition(_._iO.position),
a.play()):(pt._wD(_.id+": Cloning Audio() for instance #"+_.instanceCount+"..."),
f=new Audio(_._iO.url),h=function(){
at.remove(f,"onended",h),_._onfinish(_),nt(f),f=null;
},c=function(){
at.remove(f,"canplay",c);
try{
f.currentTime=_._iO.position/an;
}catch(e){
Q(_.id+": multiShot play() failed to apply position of "+_._iO.position/an);
}
f.play();
},at.add(f,"ended",h),_._iO.position?at.add(f,"canplay",c):f.play()):(y=_t._start(_.id,_._iO.loops||1,9===d?_.position:_.position/an,_._iO.multiShot||!1),
9!==d||y||(pt._wD(o+"No sound hardware, or 32-sound ceiling hit",2),_._iO.onplayerror&&_._iO.onplayerror.apply(_)));
}
return _;
},this.start=this.play,this.stop=function(e){
var t,n=_._iO;
return 1===_.playState&&(pt._wD(_.id+": stop()"),_._onbufferchange(0),_._resetOnPosition(0),
_.paused=!1,_.isHTML5||(_.playState=0),l(),n.to&&_.clearOnPosition(n.to),_.isHTML5?_._a&&(t=_.position,
_.setPosition(0),_.position=t,_._a.pause(),_.playState=0,_._onTimer(),a()):(_t._stop(_.id,e),
n.serverURL&&_.unload()),_.instanceCount=0,_._iO={},n.onstop&&n.onstop.apply(_)),
_;
},this.setAutoPlay=function(e){
pt._wD(_.id+": Autoplay turned "+(e?"on":"off")),_._iO.autoPlay=e,_.isHTML5||(_t._setAutoPlay(_.id,e),
e&&(_.instanceCount||1!==_.readyState||(_.instanceCount++,pt._wD(_.id+": Incremented instance count to "+_.instanceCount))));
},this.getAutoPlay=function(){
return _._iO.autoPlay;
},this.setPosition=function(e){
e===t&&(e=0);
var n,o,i=_.isHTML5?Math.max(e,0):Math.min(_.duration||_._iO.duration,Math.max(e,0));
if(_.position=i,o=_.position/an,_._resetOnPosition(_.position),_._iO.position=i,
_.isHTML5){
if(_._a){
if(_._html5_canplay){
if(_._a.currentTime!==o){
pt._wD(_.id+": setPosition("+o+")");
try{
_._a.currentTime=o,(0===_.playState||_.paused)&&_._a.pause();
}catch(a){
pt._wD(_.id+": setPosition("+o+") failed: "+a.message,2);
}
}
}else if(o)return pt._wD(_.id+": setPosition("+o+"): Cannot seek yet, sound not ready",2),
_;
_.paused&&_._onTimer(!0);
}
}else n=9===d?_.position:o,_.readyState&&2!==_.readyState&&_t._setPosition(_.id,n,_.paused||!_.playState,_._iO.multiShot);
return _;
},this.pause=function(e){
return _.paused||0===_.playState&&1!==_.readyState?_:(pt._wD(_.id+": pause()"),_.paused=!0,
_.isHTML5?(_._setup_html5().pause(),a()):(e||e===t)&&_t._pause(_.id,_._iO.multiShot),
_._iO.onpause&&_._iO.onpause.apply(_),_);
},this.resume=function(){
var e=_._iO;
return _.paused?(pt._wD(_.id+": resume()"),_.paused=!1,_.playState=1,_.isHTML5?(_._setup_html5().play(),
s()):(e.isMovieStar&&!e.serverURL&&_.setPosition(_.position),_t._pause(_.id,e.multiShot)),
!g&&e.onplay?(e.onplay.apply(_),g=!0):e.onresume&&e.onresume.apply(_),_):_;
},this.togglePause=function(){
return pt._wD(_.id+": togglePause()"),0===_.playState?(_.play({
position:9!==d||_.isHTML5?_.position/an:_.position
}),_):(_.paused?_.resume():_.pause(),_);
},this.setPan=function(e,n){
return e===t&&(e=0),n===t&&(n=!1),_.isHTML5||_t._setPan(_.id,e),_._iO.pan=e,n||(_.pan=e,
_.options.pan=e),_;
},this.setVolume=function(e,n){
return e===t&&(e=100),n===t&&(n=!1),_.isHTML5?_._a&&(_._a.volume=Math.max(0,Math.min(1,e/100))):_t._setVolume(_.id,pt.muted&&!_.muted||_.muted?0:e),
_._iO.volume=e,n||(_.volume=e,_.options.volume=e),_;
},this.mute=function(){
return _.muted=!0,_.isHTML5?_._a&&(_._a.muted=!0):_t._setVolume(_.id,0),_;
},this.unmute=function(){
_.muted=!1;
var e=_._iO.volume!==t;
return _.isHTML5?_._a&&(_._a.muted=!1):_t._setVolume(_.id,e?_._iO.volume:_.options.volume),
_;
},this.toggleMute=function(){
return _.muted?_.unmute():_.mute();
},this.onPosition=function(e,n,o){
return y.push({
position:parseInt(e,10),
method:n,
scope:o!==t?o:_,
fired:!1
}),_;
},this.onposition=this.onPosition,this.clearOnPosition=function(e,t){
var n;
if(e=parseInt(e,10),isNaN(e))return!1;
for(n=0;n<y.length;n++)e===y[n].position&&(t&&t!==y[n].method||(y[n].fired&&w--,
y.splice(n,1)));
},this._processOnPosition=function(){
var e,t,n=y.length;
if(!n||!_.playState||w>=n)return!1;
for(e=n-1;e>=0;e--)t=y[e],!t.fired&&_.position>=t.position&&(t.fired=!0,w++,t.method.apply(t.scope,[t.position]));
return!0;
},this._resetOnPosition=function(e){
var t,n,o=y.length;
if(!o)return!1;
for(t=o-1;t>=0;t--)n=y[t],n.fired&&e<=n.position&&(n.fired=!1,w--);
return!0;
},u=function(){
var e,t,n=_._iO,o=n.from,i=n.to;
return t=function(){
pt._wD(_.id+': "To" time of '+i+" reached."),_.clearOnPosition(i,t),_.stop();
},e=function(){
pt._wD(_.id+': Playing "from" '+o),null===i||isNaN(i)||_.onPosition(i,t);
},null===o||isNaN(o)||(n.position=o,n.multiShot=!1,e()),n;
},r=function(){
var e,t=_._iO.onposition;
if(t)for(e in t)t.hasOwnProperty(e)&&_.onPosition(parseInt(e,10),t[e]);
},l=function(){
var e,t=_._iO.onposition;
if(t)for(e in t)t.hasOwnProperty(e)&&_.clearOnPosition(parseInt(e,10));
},s=function(){
_.isHTML5&&K(_);
},a=function(){
_.isHTML5&&J(_);
},n=function(e){
e||(y=[],w=0),g=!1,_._hasTimer=null,_._a=null,_._html5_canplay=!1,_.bytesLoaded=null,
_.bytesTotal=null,_.duration=_._iO&&_._iO.duration?_._iO.duration:null,_.durationEstimate=null,
_.buffered=[],_.eqData=[],_.eqData.left=[],_.eqData.right=[],_.failures=0,_.isBuffering=!1,
_.instanceOptions={},_.instanceCount=0,_.loaded=!1,_.metadata={},_.readyState=0,
_.muted=!1,_.paused=!1,_.peakData={
left:0,
right:0
},_.waveformData={
left:[],
right:[]
},_.playState=0,_.position=null,_.id3={};
},n(),this._onTimer=function(e){
var t,n,o=!1,i={};
return _._hasTimer||e?(_._a&&(e||(_.playState>0||1===_.readyState)&&!_.paused)&&(t=_._get_html5_duration(),
t!==c.duration&&(c.duration=t,_.duration=t,o=!0),_.durationEstimate=_.duration,n=_._a.currentTime*an||0,
n!==c.time&&(c.time=n,o=!0),(o||e)&&_._whileplaying(n,i,i,i,i)),o):void 0;
},this._get_html5_duration=function(){
var e=_._iO,t=_._a&&_._a.duration?_._a.duration*an:e&&e.duration?e.duration:null,n=t&&!isNaN(t)&&1/0!==t?t:null;
return n;
},this._apply_loop=function(e,t){
!e.loop&&t>1&&pt._wD("Note: Native HTML5 looping is infinite.",1),e.loop=t>1?"loop":"";
},this._setup_html5=function(e){
var t,i=p(_._iO,e),a=jt?mt:_._a,s=decodeURI(i.url);
if(jt?s===decodeURI(st)&&(t=!0):s===decodeURI(v)&&(t=!0),a){
if(a._s)if(jt)a._s&&a._s.playState&&!t&&a._s.stop();else if(!jt&&s===decodeURI(v))return _._apply_loop(a,i.loops),
a;
t||(n(!1),a.src=i.url,_.url=i.url,v=i.url,st=i.url,a._called_load=!1);
}else _._a=i.autoLoad||i.autoPlay?new Audio(i.url):Xt&&opera.version()<10?new Audio(null):new Audio,
a=_._a,a._called_load=!1,jt&&(mt=a);
return _.isHTML5=!0,_._a=a,a._s=_,o(),_._apply_loop(a,i.loops),i.autoLoad||i.autoPlay?_.load():(a.autobuffer=!1,
a.preload="auto"),a;
},o=function(){
function e(e,t,n){
return _._a?_._a.addEventListener(e,t,n||!1):null;
}
if(_._a._added_events)return!1;
var t;
_._a._added_events=!0;
for(t in dt)dt.hasOwnProperty(t)&&e(t,dt[t]);
return!0;
},i=function(){
function e(e,t,n){
return _._a?_._a.removeEventListener(e,t,n||!1):null;
}
var t;
pt._wD(_.id+": Removing event listeners"),_._a._added_events=!1;
for(t in dt)dt.hasOwnProperty(t)&&e(t,dt[t]);
},this._onload=function(e){
var t,n=!!e||!_.isHTML5&&8===d&&_.duration;
return t=_.id+": ",pt._wD(t+(n?"onload()":"Failed to load / invalid sound?"+(_.duration?" -":" Zero-length duration reported.")+" ("+_.url+")"),n?1:2),
n||_.isHTML5||(pt.sandbox.noRemote===!0&&pt._wD(t+N("noNet"),1),pt.sandbox.noLocal===!0&&pt._wD(t+N("noLocal"),1)),
_.loaded=n,_.readyState=n?3:2,_._onbufferchange(0),_._iO.onload&&ct(_,function(){
_._iO.onload.apply(_,[n]);
}),!0;
},this._onbufferchange=function(e){
return 0===_.playState?!1:e&&_.isBuffering||!e&&!_.isBuffering?!1:(_.isBuffering=1===e,
_._iO.onbufferchange&&(pt._wD(_.id+": Buffer state change: "+e),_._iO.onbufferchange.apply(_)),
!0);
},this._onsuspend=function(){
return _._iO.onsuspend&&(pt._wD(_.id+": Playback suspended"),_._iO.onsuspend.apply(_)),
!0;
},this._onfailure=function(e,t,n){
_.failures++,pt._wD(_.id+": Failures = "+_.failures),_._iO.onfailure&&1===_.failures?_._iO.onfailure(_,e,t,n):pt._wD(_.id+": Ignoring failure");
},this._onfinish=function(){
var e=_._iO.onfinish;
_._onbufferchange(0),_._resetOnPosition(0),_.instanceCount&&(_.instanceCount--,_.instanceCount||(l(),
_.playState=0,_.paused=!1,_.instanceCount=0,_.instanceOptions={},_._iO={},a(),_.isHTML5&&(_.position=0)),
(!_.instanceCount||_._iO.multiShotEvents)&&e&&(pt._wD(_.id+": onfinish()"),ct(_,function(){
e.apply(_);
})));
},this._whileloading=function(e,t,n,o){
var i=_._iO;
_.bytesLoaded=e,_.bytesTotal=t,_.duration=Math.floor(n),_.bufferLength=o,_.durationEstimate=_.isHTML5||i.isMovieStar?_.duration:i.duration?_.duration>i.duration?_.duration:i.duration:parseInt(_.bytesTotal/_.bytesLoaded*_.duration,10),
_.isHTML5||(_.buffered=[{
start:0,
end:_.duration
}]),(3!==_.readyState||_.isHTML5)&&i.whileloading&&i.whileloading.apply(_);
},this._whileplaying=function(e,n,o,i,a){
var s,r=_._iO;
return isNaN(e)||null===e?!1:(_.position=Math.max(0,e),_._processOnPosition(),!_.isHTML5&&d>8&&(r.usePeakData&&n!==t&&n&&(_.peakData={
left:n.leftPeak,
right:n.rightPeak
}),r.useWaveformData&&o!==t&&o&&(_.waveformData={
left:o.split(","),
right:i.split(",")
}),r.useEQData&&a!==t&&a&&a.leftEQ&&(s=a.leftEQ.split(","),_.eqData=s,_.eqData.left=s,
a.rightEQ!==t&&a.rightEQ&&(_.eqData.right=a.rightEQ.split(",")))),1===_.playState&&(_.isHTML5||8!==d||_.position||!_.isBuffering||_._onbufferchange(0),
r.whileplaying&&r.whileplaying.apply(_)),!0);
},this._oncaptiondata=function(e){
pt._wD(_.id+": Caption data received."),_.captiondata=e,_._iO.oncaptiondata&&_._iO.oncaptiondata.apply(_,[e]);
},this._onmetadata=function(e,t){
pt._wD(_.id+": Metadata received.");
var n,o,i={};
for(n=0,o=e.length;o>n;n++)i[e[n]]=t[n];
_.metadata=i,_._iO.onmetadata&&_._iO.onmetadata.apply(_);
},this._onid3=function(e,t){
pt._wD(_.id+": ID3 data received.");
var n,o,i=[];
for(n=0,o=e.length;o>n;n++)i[e[n]]=t[n];
_.id3=p(_.id3,i),_._iO.onid3&&_._iO.onid3.apply(_);
},this._onconnect=function(e){
e=1===e,pt._wD(_.id+": "+(e?"Connected.":"Failed to connect? - "+_.url),e?1:2),_.connected=e,
e&&(_.failures=0,$(_.id)&&(_.getAutoPlay()?_.play(t,_.getAutoPlay()):_._iO.autoLoad&&_.load()),
_._iO.onconnect&&_._iO.onconnect.apply(_,[e]));
},this._ondataerror=function(e){
_.playState>0&&(pt._wD(_.id+": Data error: "+e),_._iO.ondataerror&&_._iO.ondataerror.apply(_));
},this._debug();
},I=function(){
return Ot.body||Ot._docElement||Ot.getElementsByTagName("div")[0];
},s=function(e){
return Ot.getElementById(e);
},p=function(e,n){
var o,i,a=e||{};
o=n===t?pt.defaultOptions:n;
for(i in o)o.hasOwnProperty(i)&&a[i]===t&&(a[i]="object"!=typeof o[i]||null===o[i]?o[i]:p(a[i],o[i]));
return a;
},ct=function(e,t){
e.isHTML5||8!==d?t():window.setTimeout(t,0);
},_={
onready:1,
ontimeout:1,
defaultOptions:1,
flash9Options:1,
movieStarOptions:1
},m=function(e,n){
var o,i=!0,a=n!==t,s=pt.setupOptions,r=_;
if(e===t){
i=[];
for(o in s)s.hasOwnProperty(o)&&i.push(o);
for(o in r)r.hasOwnProperty(o)&&i.push("object"==typeof pt[o]?o+": {...}":pt[o]instanceof Function?o+": function() {...}":o);
return pt._wD(N("setup",i.join(", "))),!1;
}
for(o in e)if(e.hasOwnProperty(o))if("object"!=typeof e[o]||null===e[o]||e[o]instanceof Array||e[o]instanceof RegExp)a&&r[n]!==t?pt[n][o]=e[o]:s[o]!==t?(pt.setupOptions[o]=e[o],
pt[o]=e[o]):r[o]===t?(Q(N(pt[o]===t?"setupUndef":"setupError",o),2),i=!1):pt[o]instanceof Function?pt[o].apply(pt,e[o]instanceof Array?e[o]:[e[o]]):pt[o]=e[o];else{
if(r[o]!==t)return m(e[o],o);
Q(N(pt[o]===t?"setupUndef":"setupError",o),2),i=!1;
}
return i;
},at=function(){
function e(e){
var t=Wt.call(e),n=t.length;
return i?(t[1]="on"+t[1],n>3&&t.pop()):3===n&&t.push(!1),t;
}
function t(e,t){
var n=e.shift(),o=[a[t]];
i?n[o](e[0],e[1]):n[o].apply(n,e);
}
function n(){
t(e(arguments),"add");
}
function o(){
t(e(arguments),"remove");
}
var i=window.attachEvent,a={
add:i?"attachEvent":"addEventListener",
remove:i?"detachEvent":"removeEventListener"
};
return{
add:n,
remove:o
};
}(),dt={
abort:i(function(){
pt._wD(this._s.id+": abort");
}),
canplay:i(function(){
var e,n=this._s;
if(n._html5_canplay)return!0;
if(n._html5_canplay=!0,pt._wD(n.id+": canplay"),n._onbufferchange(0),e=n._iO.position===t||isNaN(n._iO.position)?null:n._iO.position/an,
n.position&&this.currentTime!==e){
pt._wD(n.id+": canplay: Setting position to "+e);
try{
this.currentTime=e;
}catch(o){
pt._wD(n.id+": canplay: Setting position of "+e+" failed: "+o.message,2);
}
}
n._iO._oncanplay&&n._iO._oncanplay();
}),
canplaythrough:i(function(){
var e=this._s;
e.loaded||(e._onbufferchange(0),e._whileloading(e.bytesLoaded,e.bytesTotal,e._get_html5_duration()),
e._onload(!0));
}),
ended:i(function(){
var e=this._s;
pt._wD(e.id+": ended"),e._onfinish();
}),
error:i(function(){
pt._wD(this._s.id+": HTML5 error, code "+this.error.code),this._s._onload(!1);
}),
loadeddata:i(function(){
var e=this._s;
pt._wD(e.id+": loadeddata"),e._loaded||Jt||(e.duration=e._get_html5_duration());
}),
loadedmetadata:i(function(){
pt._wD(this._s.id+": loadedmetadata");
}),
loadstart:i(function(){
pt._wD(this._s.id+": loadstart"),this._s._onbufferchange(1);
}),
play:i(function(){
this._s._onbufferchange(0);
}),
playing:i(function(){
pt._wD(this._s.id+": playing"),this._s._onbufferchange(0);
}),
progress:i(function(e){
var t,n,o,i=this._s,a=0,s="progress"===e.type,r=e.target.buffered,l=e.loaded||0,u=e.total||1;
if(i.buffered=[],r&&r.length){
for(t=0,n=r.length;n>t;t++)i.buffered.push({
start:r.start(t)*an,
end:r.end(t)*an
});
if(a=(r.end(0)-r.start(0))*an,l=Math.min(1,a/(e.target.duration*an)),s&&r.length>1){
for(o=[],n=r.length,t=0;n>t;t++)o.push(e.target.buffered.start(t)*an+"-"+e.target.buffered.end(t)*an);
pt._wD(this._s.id+": progress, timeRanges: "+o.join(", "));
}
s&&!isNaN(l)&&pt._wD(this._s.id+": progress, "+Math.floor(100*l)+"% loaded");
}
isNaN(l)||(i._onbufferchange(0),i._whileloading(l,u,i._get_html5_duration()),l&&u&&l===u&&dt.canplaythrough.call(this,e));
}),
ratechange:i(function(){
pt._wD(this._s.id+": ratechange");
}),
suspend:i(function(e){
var t=this._s;
pt._wD(this._s.id+": suspend"),dt.progress.call(this,e),t._onsuspend();
}),
stalled:i(function(){
pt._wD(this._s.id+": stalled");
}),
timeupdate:i(function(){
this._s._onTimer();
}),
waiting:i(function(){
var e=this._s;
pt._wD(this._s.id+": waiting"),e._onbufferchange(1);
})
},Y=function(e){
var t;
return t=e&&(e.type||e.url||e.serverURL)?e.serverURL||e.type&&o(e.type)?!1:e.type?et({
type:e.type
}):et({
url:e.url
})||pt.html5Only||e.url.match(/data\:/i):!1;
},nt=function(e){
var t;
return e&&(t=Jt&&!Vt?null:zt?sn:null,e.removeAttribute("src"),void 0!==e._called_unload&&(e._called_load=!1)),
jt&&(st=null),t;
},et=function(e){
if(!pt.useHTML5Audio||!pt.hasHTML5)return!1;
var n,i,a,s,r=e.url||null,l=e.type||null,u=pt.audioFormats;
if(l&&pt.html5[l]!==t)return pt.html5[l]&&!o(l);
if(!tt){
tt=[];
for(s in u)u.hasOwnProperty(s)&&(tt.push(s),u[s].related&&(tt=tt.concat(u[s].related)));
tt=new RegExp("\\.("+tt.join("|")+")(\\?.*)?$","i");
}
return a=r?r.toLowerCase().match(tt):null,a&&a.length?a=a[1]:l?(i=l.indexOf(";"),
a=(-1!==i?l.substr(0,i):l).substr(6)):n=!1,a&&pt.html5[a]!==t?n=pt.html5[a]&&!o(a):(l="audio/"+a,
n=pt.html5.canPlayType({
type:l
}),pt.html5[a]=n,n=n&&pt.html5[l]&&!o(l)),n;
},it=function(){
function e(e){
var t,n,o,i=!1,a=!1;
if(!s||"function"!=typeof s.canPlayType)return i;
if(e instanceof Array){
for(n=0,o=e.length;o>n;n++)(pt.html5[e[n]]||s.canPlayType(e[n]).match(pt.html5Test))&&(a=!0,
pt.html5[e[n]]=!0,pt.flash[e[n]]=!!e[n].match(on));
i=a;
}else t=s&&"function"==typeof s.canPlayType?s.canPlayType(e):!1,i=!(!t||!t.match(pt.html5Test));
return i;
}
if(!pt.useHTML5Audio||!pt.hasHTML5)return pt.html5.usingFlash=!0,Bt=!0,!1;
var n,o,i,a,s=Audio!==t?Xt&&opera.version()<10?new Audio(null):new Audio:null,r={};
i=pt.audioFormats;
for(n in i)if(i.hasOwnProperty(n)&&(o="audio/"+n,r[n]=e(i[n].type),r[o]=r[n],n.match(on)?(pt.flash[n]=!0,
pt.flash[o]=!0):(pt.flash[n]=!1,pt.flash[o]=!1),i[n]&&i[n].related))for(a=i[n].related.length-1;a>=0;a--)r["audio/"+i[n].related[a]]=r[n],
pt.html5[i[n].related[a]]=r[n],pt.flash[i[n].related[a]]=r[n];
return r.canPlayType=s?e:null,pt.html5=p(pt.html5,r),pt.html5.usingFlash=Z(),Bt=pt.html5.usingFlash,
!0;
},M={
notReady:"Unavailable - wait until onready() has fired.",
notOK:"Audio support is not available.",
domError:gt+"exception caught while appending SWF to DOM.",
spcWmode:"Removing wmode, preventing known SWF loading issue(s)",
swf404:yt+"Verify that %s is a valid path.",
tryDebug:"Try "+gt+".debugFlash = true for more security details (output goes to SWF.)",
checkSWF:"See SWF output for more debug info.",
localFail:yt+"Non-HTTP page ("+Ot.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
waitFocus:yt+"Special case: Waiting for SWF to load with window focus...",
waitForever:yt+"Waiting indefinitely for Flash (will recover if unblocked)...",
waitSWF:yt+"Waiting for 100% SWF load...",
needFunction:yt+"Function object expected for %s",
badID:'Sound ID "%s" should be a string, starting with a non-numeric character',
currentObj:yt+"_debug(): Current sound objects",
waitOnload:yt+"Waiting for window.onload()",
docLoaded:yt+"Document already loaded",
onload:yt+"initComplete(): calling soundManager.onload()",
onloadOK:gt+".onload() complete",
didInit:yt+"init(): Already called?",
secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
badRemove:yt+"Failed to remove Flash node.",
shutdown:gt+".disable(): Shutting down",
queue:yt+"Queueing %s handler",
smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
fbTimeout:"No flash response, applying ."+W.swfTimedout+" CSS...",
fbLoaded:"Flash loaded",
fbHandler:yt+"flashBlockHandler()",
manURL:"SMSound.load(): Using manually-assigned URL",
onURL:gt+".load(): current URL already assigned.",
badFV:gt+'.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",
noNSLoop:"Note: Looping not implemented for MovieStar formats",
needfl9:"Note: Switching to flash 9, required for MP4 formats.",
mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
needFlash:yt+"Fatal error: Flash is needed to play some required formats, but is not available.",
gotFocus:yt+"Got window focus.",
policy:"Enabling usePolicyFile for data access",
setup:gt+".setup(): allowed parameters: %s",
setupError:gt+'.setup(): "%s" cannot be assigned with this method.',
setupUndef:gt+'.setup(): Could not find option "%s"',
setupLate:gt+".setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
noURL:yt+"Flash URL required. Call soundManager.setup({url:...}) to get started.",
sm2Loaded:"SoundManager 2: Ready.",
reset:gt+".reset(): Removing event callbacks",
mobileUA:"Mobile UA detected, preferring HTML5 by default.",
globalHTML5:"Using singleton HTML5 Audio() pattern for this device."
},N=function(){
var e,t,n=Wt.call(arguments),o=n.shift(),i=M&&M[o]?M[o]:"";
if(i&&n&&n.length)for(e=0,t=n.length;t>e;e++)i=i.replace("%s",n[e]);
return i;
},q=function(e){
return 8===d&&e.loops>1&&e.stream&&(h("as2loop"),e.stream=!1),e;
},V=function(e,t){
return e&&!e.usePolicyFile&&(e.onid3||e.usePeakData||e.useWaveformData||e.useEQData)&&(pt._wD((t||"")+N("policy")),
e.usePolicyFile=!0),e;
},Q=function(e){
Yt&&console.warn!==t?console.warn(e):pt._wD(e);
},r=function(){
return!1;
},C=function(e){
var t;
for(t in e)e.hasOwnProperty(t)&&"function"==typeof e[t]&&(e[t]=r);
t=null;
},x=function(e){
e===t&&(e=!1),(St||e)&&pt.disable(e);
},R=function(e){
var t,n=null;
if(e)if(e.match(/\.swf(\?.*)?$/i)){
if(n=e.substr(e.toLowerCase().lastIndexOf(".swf?")+4))return e;
}else e.lastIndexOf("/")!==e.length-1&&(e+="/");
return t=(e&&-1!==e.lastIndexOf("/")?e.substr(0,e.lastIndexOf("/")+1):"./")+pt.movieURL,
pt.noSWFCache&&(t+="?ts="+(new Date).getTime()),t;
},O=function(){
d=parseInt(pt.flashVersion,10),8!==d&&9!==d&&(pt._wD(N("badFV",d,Et)),pt.flashVersion=d=Et);
var e=pt.debugMode||pt.debugFlash?"_debug.swf":".swf";
pt.useHTML5Audio&&!pt.html5Only&&pt.audioFormats.mp4.required&&9>d&&(pt._wD(N("needfl9")),
pt.flashVersion=d=9),pt.version=pt.versionNumber+(pt.html5Only?" (HTML5-only mode)":9===d?" (AS3/Flash 9)":" (AS2/Flash 8)"),
d>8?(pt.defaultOptions=p(pt.defaultOptions,pt.flash9Options),pt.features.buffering=!0,
pt.defaultOptions=p(pt.defaultOptions,pt.movieStarOptions),pt.filePatterns.flash9=new RegExp("\\.(mp3|"+dn.join("|")+")(\\?.*)?$","i"),
pt.features.movieStar=!0):pt.features.movieStar=!1,pt.filePattern=pt.filePatterns[8!==d?"flash9":"flash8"],
pt.movieURL=(8===d?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",e),
pt.features.peakData=pt.features.waveformData=pt.features.eqData=d>8;
},A=function(e,t){
return _t?void _t._setPolling(e,t):!1;
},k=function(){
if(pt.debugURLParam.test(bt)&&(pt.debugMode=!0),s(pt.debugID))return!1;
var e,t,n,o,i;
if(!(!pt.debugMode||s(pt.debugID)||Yt&&pt.useConsole&&pt.consoleOnly)){
e=Ot.createElement("div"),e.id=pt.debugID+"-toggle",o={
position:"fixed",
bottom:"0px",
right:"0px",
width:"1.2em",
height:"1.2em",
lineHeight:"1.2em",
margin:"2px",
textAlign:"center",
border:"1px solid #999",
cursor:"pointer",
background:"#fff",
color:"#333",
zIndex:10001
},e.appendChild(Ot.createTextNode("-")),e.onclick=j,e.title="Toggle SM2 debug console",
vt.match(/msie 6/i)&&(e.style.position="absolute",e.style.cursor="hand");
for(i in o)o.hasOwnProperty(i)&&(e.style[i]=o[i]);
if(t=Ot.createElement("div"),t.id=pt.debugID,t.style.display=pt.debugMode?"block":"none",
pt.debugMode&&!s(e.id)){
try{
n=I(),n.appendChild(e);
}catch(a){
throw new Error(N("domError")+" \n"+a.toString());
}
n.appendChild(t);
}
}
n=null;
},$=this.getSoundById,h=function(e,t){
return e?pt._wD(N(e),t):"";
},j=function(){
var e=s(pt.debugID),t=s(pt.debugID+"-toggle");
return e?(Mt?(t.innerHTML="+",e.style.display="none"):(t.innerHTML="-",e.style.display="block"),
void(Mt=!Mt)):!1;
},f=function(e,n,o){
if(window.sm2Debugger!==t)try{
sm2Debugger.handleEvent(e,n,o);
}catch(i){
return!1;
}
return!0;
},B=function(){
var e=[];
return pt.debugMode&&e.push(W.sm2Debug),pt.debugFlash&&e.push(W.flashDebug),pt.useHighPerformance&&e.push(W.highPerf),
e.join(" ");
},U=function(){
var e=N("fbHandler"),t=pt.getMoviePercent(),n=W,o={
type:"FLASHBLOCK"
};
return pt.html5Only?!1:void(pt.ok()?(pt.didFlashBlock&&pt._wD(e+": Unblocked"),pt.oMC&&(pt.oMC.className=[B(),n.swfDefault,n.swfLoaded+(pt.didFlashBlock?" "+n.swfUnblocked:"")].join(" "))):(Bt&&(pt.oMC.className=B()+" "+n.swfDefault+" "+(null===t?n.swfTimedout:n.swfError),
pt._wD(e+": "+N("fbTimeout")+(t?" ("+N("fbLoaded")+")":""))),pt.didFlashBlock=!0,
y({
type:"ontimeout",
ignoreInit:!0,
error:o
}),E(o)));
},g=function(e,n,o){
Dt[e]===t&&(Dt[e]=[]),Dt[e].push({
method:n,
scope:o||null,
fired:!1
});
},y=function(e){
if(e||(e={
type:pt.ok()?"onready":"ontimeout"
}),!Pt&&e&&!e.ignoreInit)return!1;
if("ontimeout"===e.type&&(pt.ok()||St&&!e.ignoreInit))return!1;
var t,n,o={
success:e&&e.ignoreInit?pt.ok():!St
},i=e&&e.type?Dt[e.type]||[]:[],a=[],s=[o],r=Bt&&!pt.ok();
for(e.error&&(s[0].error=e.error),t=0,n=i.length;n>t;t++)i[t].fired!==!0&&a.push(i[t]);
if(a.length)for(t=0,n=a.length;n>t;t++)a[t].scope?a[t].method.apply(a[t].scope,s):a[t].method.apply(this,s),
r||(a[t].fired=!0);
return!0;
},w=function(){
window.setTimeout(function(){
pt.useFlashBlock&&U(),y(),"function"==typeof pt.onload&&(h("onload",1),pt.onload.apply(window),
h("onloadOK",1)),pt.waitForWindowLoad&&at.add(window,"load",w);
},1);
},lt=function(){
if(rt!==t)return rt;
var e,n,o,i=!1,a=navigator,s=a.plugins,r=window.ActiveXObject;
if(s&&s.length)n="application/x-shockwave-flash",o=a.mimeTypes,o&&o[n]&&o[n].enabledPlugin&&o[n].enabledPlugin.description&&(i=!0);else if(r!==t&&!vt.match(/MSAppHost/i)){
try{
e=new r("ShockwaveFlash.ShockwaveFlash");
}catch(l){
e=null;
}
i=!!e,e=null;
}
return rt=i,i;
},Z=function(){
var e,t,n=pt.audioFormats,o=Vt&&!!vt.match(/os (1|2|3_0|3_1)/i);
if(o?(pt.hasHTML5=!1,pt.html5Only=!0,pt.oMC&&(pt.oMC.style.display="none")):pt.useHTML5Audio&&(pt.html5&&pt.html5.canPlayType||(pt._wD("SoundManager: No HTML5 Audio() support detected."),
pt.hasHTML5=!1),Zt&&pt._wD(yt+"Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(rt?"will use flash fallback for MP3/MP4, if available":" would use flash fallback for MP3/MP4, but none detected."),1)),
pt.useHTML5Audio&&pt.hasHTML5){
G=!0;
for(t in n)n.hasOwnProperty(t)&&n[t].required&&(pt.html5.canPlayType(n[t].type)?pt.preferFlash&&(pt.flash[t]||pt.flash[n[t].type])&&(e=!0):(G=!1,
e=!0));
}
return pt.ignoreFlash&&(e=!1,G=!0),pt.html5Only=pt.hasHTML5&&pt.useHTML5Audio&&!e,
!pt.html5Only;
},z=function(e){
var t,n,o,i=0;
if(e instanceof Array){
for(t=0,n=e.length;n>t;t++)if(e[t]instanceof Object){
if(pt.canPlayMIME(e[t].type)){
i=t;
break;
}
}else if(pt.canPlayURL(e[t])){
i=t;
break;
}
e[i].url&&(e[i]=e[i].url),o=e[i];
}else o=e;
return o;
},K=function(e){
e._hasTimer||(e._hasTimer=!0,!Gt&&pt.html5PollingInterval&&(null===Nt&&0===Rt&&(Nt=setInterval(X,pt.html5PollingInterval)),
Rt++));
},J=function(e){
e._hasTimer&&(e._hasTimer=!1,!Gt&&pt.html5PollingInterval&&Rt--);
},X=function(){
var e;
if(null!==Nt&&!Rt)return clearInterval(Nt),Nt=null,!1;
for(e=pt.soundIDs.length-1;e>=0;e--)pt.sounds[pt.soundIDs[e]].isHTML5&&pt.sounds[pt.soundIDs[e]]._hasTimer&&pt.sounds[pt.soundIDs[e]]._onTimer();
},E=function(e){
e=e!==t?e:{},"function"==typeof pt.onerror&&pt.onerror.apply(window,[{
type:e.type!==t?e.type:null
}]),e.fatal!==t&&e.fatal&&pt.disable();
},ut=function(){
if(!Zt||!lt())return!1;
var e,t,n=pt.audioFormats;
for(t in n)if(n.hasOwnProperty(t)&&("mp3"===t||"mp4"===t)&&(pt._wD(gt+": Using flash fallback for "+t+" format"),
pt.html5[t]=!1,n[t]&&n[t].related))for(e=n[t].related.length-1;e>=0;e--)pt.html5[n[t].related[e]]=!1;
},this._setSandboxType=function(e){
var n=pt.sandbox;
n.type=e,n.description=n.types[n.types[e]!==t?e:"unknown"],"localWithFile"===n.type?(n.noRemote=!0,
n.noLocal=!1,h("secNote",2)):"localWithNetwork"===n.type?(n.noRemote=!1,n.noLocal=!0):"localTrusted"===n.type&&(n.noRemote=!1,
n.noLocal=!1);
},this._externalInterfaceOK=function(e){
if(pt.swfLoaded)return!1;
var t;
return f("swf",!0),f("flashtojs",!0),pt.swfLoaded=!0,tn=!1,Zt&&ut(),e&&e.replace(/\+dev/i,"")===pt.versionNumber.replace(/\+dev/i,"")?void setTimeout(u,$t?100:1):(t=gt+': Fatal: JavaScript file build "'+pt.versionNumber+'" does not match Flash SWF build "'+e+'" at '+pt.url+". Ensure both are up-to-date.",
setTimeout(function(){
throw new Error(t);
},0),!1);
},H=function(e,n){
function o(){
var e,t=[],n=[],o=" + ";
e="SoundManager "+pt.version+(!pt.html5Only&&pt.useHTML5Audio?pt.hasHTML5?" + HTML5 audio":", no HTML5 audio support":""),
pt.html5Only?pt.html5PollingInterval&&t.push("html5PollingInterval ("+pt.html5PollingInterval+"ms)"):(pt.preferFlash&&t.push("preferFlash"),
pt.useHighPerformance&&t.push("useHighPerformance"),pt.flashPollingInterval&&t.push("flashPollingInterval ("+pt.flashPollingInterval+"ms)"),
pt.html5PollingInterval&&t.push("html5PollingInterval ("+pt.html5PollingInterval+"ms)"),
pt.wmode&&t.push("wmode ("+pt.wmode+")"),pt.debugFlash&&t.push("debugFlash"),pt.useFlashBlock&&t.push("flashBlock")),
t.length&&(n=n.concat([t.join(o)])),pt._wD(e+(n.length?o+n.join(", "):""),1),ft();
}
function i(e,t){
return'<param name="'+e+'" value="'+t+'" />';
}
if(Lt&&Tt)return!1;
if(pt.html5Only)return O(),o(),pt.oMC=s(pt.movieID),u(),Lt=!0,Tt=!0,!1;
var a,r,l,d,f,h,c,p,m=n||pt.url,_=pt.altURL||m,g="JS/Flash audio component (SoundManager 2)",y=I(),w=B(),v=null,b=Ot.getElementsByTagName("html")[0];
if(v=b&&b.dir&&b.dir.match(/rtl/i),e=e===t?pt.id:e,O(),pt.url=R(rn?m:_),n=pt.url,
pt.wmode=!pt.wmode&&pt.useHighPerformance?"transparent":pt.wmode,null!==pt.wmode&&(vt.match(/msie 8/i)||!$t&&!pt.useHighPerformance)&&navigator.platform.match(/win32|win64/i)&&(Ut.push(M.spcWmode),
pt.wmode=null),a={
name:e,
id:e,
src:n,
quality:"high",
allowScriptAccess:pt.allowScriptAccess,
bgcolor:pt.bgColor,
pluginspage:ln+"www.macromedia.com/go/getflashplayer",
title:g,
type:"application/x-shockwave-flash",
wmode:pt.wmode,
hasPriority:"true"
},pt.debugFlash&&(a.FlashVars="debug=1"),pt.wmode||delete a.wmode,$t)r=Ot.createElement("div"),
d=['<object id="'+e+'" data="'+n+'" type="'+a.type+'" title="'+a.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+ln+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',i("movie",n),i("AllowScriptAccess",pt.allowScriptAccess),i("quality",a.quality),pt.wmode?i("wmode",pt.wmode):"",i("bgcolor",pt.bgColor),i("hasPriority","true"),pt.debugFlash?i("FlashVars",a.FlashVars):"","</object>"].join("");else{
r=Ot.createElement("embed");
for(l in a)a.hasOwnProperty(l)&&r.setAttribute(l,a[l]);
}
if(k(),w=B(),y=I())if(pt.oMC=s(pt.movieID)||Ot.createElement("div"),pt.oMC.id)p=pt.oMC.className,
pt.oMC.className=(p?p+" ":W.swfDefault)+(w?" "+w:""),pt.oMC.appendChild(r),$t&&(f=pt.oMC.appendChild(Ot.createElement("div")),
f.className=W.swfBox,f.innerHTML=d),Tt=!0;else{
if(pt.oMC.id=pt.movieID,pt.oMC.className=W.swfDefault+" "+w,h=null,f=null,pt.useFlashBlock||(pt.useHighPerformance?h={
position:"fixed",
width:"8px",
height:"8px",
bottom:"0px",
left:"0px",
overflow:"hidden"
}:(h={
position:"absolute",
width:"6px",
height:"6px",
top:"-9999px",
left:"-9999px"
},v&&(h.left=Math.abs(parseInt(h.left,10))+"px"))),Kt&&(pt.oMC.style.zIndex=1e4),
!pt.debugFlash)for(c in h)h.hasOwnProperty(c)&&(pt.oMC.style[c]=h[c]);
try{
$t||pt.oMC.appendChild(r),y.appendChild(pt.oMC),$t&&(f=pt.oMC.appendChild(Ot.createElement("div")),
f.className=W.swfBox,f.innerHTML=d),Tt=!0;
}catch(D){
throw new Error(N("domError")+" \n"+D.toString());
}
}
return Lt=!0,o(),!0;
},L=function(){
return pt.html5Only?(H(),!1):_t?!1:pt.url?(_t=pt.getMovie(pt.id),_t||(At?($t?pt.oMC.innerHTML=kt:pt.oMC.appendChild(At),
At=null,Lt=!0):H(pt.id,pt.url),_t=pt.getMovie(pt.id)),"function"==typeof pt.oninitmovie&&setTimeout(pt.oninitmovie,1),
ht(),!0):(h("noURL"),!1);
},v=function(){
setTimeout(b,1e3);
},b=function(){
var e,t=!1;
return pt.url?Ct?!1:(Ct=!0,at.remove(window,"load",v),tn&&!en?(h("waitFocus"),!1):(Pt||(e=pt.getMoviePercent(),
e>0&&100>e&&(t=!0)),void setTimeout(function(){
return e=pt.getMoviePercent(),t?(Ct=!1,pt._wD(N("waitSWF")),window.setTimeout(v,1),
!1):(Pt||(pt._wD(gt+": No Flash response within expected time. Likely causes: "+(0===e?"SWF load failed, ":"")+"Flash blocked or JS-Flash security error."+(pt.debugFlash?" "+N("checkSWF"):""),2),
!rn&&e&&(h("localFail",2),pt.debugFlash||h("tryDebug",2)),0===e&&pt._wD(N("swf404",pt.url),1),
f("flashtojs",!1," (Check flash security or flash blockers)")),void(!Pt&&nn&&(null===e?pt.useFlashBlock||0===pt.flashLoadTimeout?(pt.useFlashBlock&&U(),
h("waitForever")):!pt.useFlashBlock&&G?window.setTimeout(function(){
Q(yt+"useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false..."),
pt.setup({
preferFlash:!1
}).reboot(),pt.didFlashBlock=!0,pt.beginDelayedInit();
},1):(h("waitForever"),y({
type:"ontimeout",
ignoreInit:!0
})):0===pt.flashLoadTimeout?h("waitForever"):x(!0))));
},pt.flashLoadTimeout))):!1;
},D=function(){
function e(){
at.remove(window,"focus",D);
}
return en||!tn?(e(),!0):(nn=!0,en=!0,h("gotFocus"),Ct=!1,v(),e(),!0);
},ht=function(){
Ut.length&&(pt._wD("SoundManager 2: "+Ut.join(" "),1),Ut=[]);
},ft=function(){
ht();
var e,t=[];
if(pt.useHTML5Audio&&pt.hasHTML5){
for(e in pt.audioFormats)pt.audioFormats.hasOwnProperty(e)&&t.push(e+" = "+pt.html5[e]+(!pt.html5[e]&&Bt&&pt.flash[e]?" (using flash)":pt.preferFlash&&pt.flash[e]&&Bt?" (preferring flash)":pt.html5[e]?"":" ("+(pt.audioFormats[e].required?"required, ":"")+"and no flash support)"));
pt._wD("SoundManager 2 HTML5 support: "+t.join(", "),1);
}
},c=function(e){
if(Pt)return!1;
if(pt.html5Only)return h("sm2Loaded"),Pt=!0,w(),f("onload",!0),!0;
var t,n=pt.useFlashBlock&&pt.flashLoadTimeout&&!pt.getMoviePercent(),o=!0;
return n||(Pt=!0,St&&(t={
type:!rt&&Bt?"NO_FLASH":"INIT_TIMEOUT"
})),pt._wD("SoundManager 2 "+(St?"failed to load":"loaded")+" ("+(St?"Flash security/load error":"OK")+")",St?2:1),
St||e?(pt.useFlashBlock&&pt.oMC&&(pt.oMC.className=B()+" "+(null===pt.getMoviePercent()?W.swfTimedout:W.swfError)),
y({
type:"ontimeout",
error:t,
ignoreInit:!0
}),f("onload",!1),E(t),o=!1):f("onload",!0),St||(pt.waitForWindowLoad&&!Ft?(h("waitOnload"),
at.add(window,"load",w)):(pt.waitForWindowLoad&&Ft&&h("docLoaded"),w())),o;
},l=function(){
var e,n=pt.setupOptions;
for(e in n)n.hasOwnProperty(e)&&(pt[e]===t?pt[e]=n[e]:pt[e]!==n[e]&&(pt.setupOptions[e]=pt[e]));
},u=function(){
function e(){
at.remove(window,"load",pt.beginDelayedInit);
}
if(Pt)return h("didInit"),!1;
if(pt.html5Only)return Pt||(e(),pt.enabled=!0,c()),!0;
L();
try{
_t._externalInterfaceTest(!1),A(!0,pt.flashPollingInterval||(pt.useHighPerformance?10:50)),
pt.debugMode||_t._disableDebug(),pt.enabled=!0,f("jstoflash",!0),pt.html5Only||at.add(window,"unload",r);
}catch(t){
return pt._wD("js/flash exception: "+t.toString()),f("jstoflash",!1),E({
type:"JS_TO_FLASH_EXCEPTION",
fatal:!0
}),x(!0),c(),!1;
}
return c(),e(),!0;
},P=function(){
return F?!1:(F=!0,l(),k(),function(){
var e="sm2-usehtml5audio=",t="sm2-preferflash=",n=null,o=null,i=bt.toLowerCase();
-1!==i.indexOf(e)&&(n="1"===i.charAt(i.indexOf(e)+e.length),Yt&&console.log((n?"Enabling ":"Disabling ")+"useHTML5Audio via URL parameter"),
pt.setup({
useHTML5Audio:n
})),-1!==i.indexOf(t)&&(o="1"===i.charAt(i.indexOf(t)+t.length),Yt&&console.log((o?"Enabling ":"Disabling ")+"preferFlash via URL parameter"),
pt.setup({
preferFlash:o
}));
}(),!rt&&pt.hasHTML5&&(pt._wD("SoundManager: No Flash detected"+(pt.useHTML5Audio?". Trying HTML5-only mode.":", enabling HTML5."),1),
pt.setup({
useHTML5Audio:!0,
preferFlash:!1
})),it(),!rt&&Bt&&(Ut.push(M.needFlash),pt.setup({
flashLoadTimeout:1
})),Ot.removeEventListener&&Ot.removeEventListener("DOMContentLoaded",P,!1),L(),
!0);
},ot=function(){
return"complete"===Ot.readyState&&(P(),Ot.detachEvent("onreadystatechange",ot)),
!0;
},S=function(){
Ft=!0,at.remove(window,"load",S);
},T=function(){
Gt&&((!pt.setupOptions.useHTML5Audio||pt.setupOptions.preferFlash)&&Ut.push(M.mobileUA),
pt.setupOptions.useHTML5Audio=!0,pt.setupOptions.preferFlash=!1,(Vt||Qt&&!vt.match(/android\s2\.3/i))&&(Ut.push(M.globalHTML5),
Vt&&(pt.ignoreFlash=!0),jt=!0));
},T(),lt(),at.add(window,"focus",D),at.add(window,"load",v),at.add(window,"load",S),
Ot.addEventListener?Ot.addEventListener("DOMContentLoaded",P,!1):Ot.attachEvent?Ot.attachEvent("onreadystatechange",ot):(f("onload",!1),
E({
type:"NO_DOM2_EVENTS",
fatal:!0
}));
}
var t,n=null;
return void 0!==window.SM2_DEFER&&SM2_DEFER||(n=new e),window.soundManager=n,n;
});define("common/wx/media/reprintArticleData.js",[],function(){
"use strict";
function e(e,r){
r.source_info?r.source_info.source_can_reward:r.source_can_reward;
return e+="</div>";
}
var r=function(r){
return $.each(r.list,function(i,s){
if(s.is_pay_subscribe)s.pubType=1,s.reprintDesc="<div>非开放转载</div>";else switch(s.source_info?s.source_info.source_reprint_status:s.source_reprint_status){
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY":
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY":
s.reprintDesc='<div>开放转载<i class="icon-wenhao js_open_reprint_tips"></i></div>',
"EN_CANNOT_OPEN_AD_REPRINT"===r.openAdReprintStatus?(s.pubType=1,s.reprintDesc+='<div class="gray gray-content">无法转载，不符合开放转载条件</div>'):(s.pubType=0,
s.reprintDesc+='<div class="gray gray-content">不可修改，显示转载来源',s.reprintDesc=e(s.reprintDesc,s),
s.grayText="initiative"===r.type?"用户在转载公众号内进行阅读":"将清空对原文的修改");
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE":
s.pubType=0,s.reprintDesc='<div>已纳入白名单</div>                                <div class="gray gray-content">可修改，显示转载来源',
s.reprintDesc=e(s.reprintDesc,s),s.grayText="将保留对原文的修改";
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE":
s.pubType=0,s.reprintDesc='<div>已纳入白名单</div>                                <div class="gray gray-content">可修改，不显示转载来源',
s.reprintDesc=e(s.reprintDesc,s),s.grayText="将保留对原文的修改";
break;

case"EN_SOURCE_REPRINT_STATUS_UNDECLARE":
switch(s.pubType=-1,s.source_type){
case 2:
case 3:
s.reprintDesc="<div>时事新闻</div>";
break;

case 4:
s.reprintDesc="<div>公共公开信息</div>";
break;

case 9:
s.reprintDesc="<div>未声明原创</div>";
}
break;

case"EN_SOURCE_REPRINT_STATUS_REJECT_REPRINT":
s.pubType=1,s.reprintDesc="<div>非开放转载</div>";
break;

case"EN_SOURCE_REPRINT_STATUS_REPRINT_FROM_SELF":
s.pubType=1,s.reprintDesc="<div>无法转载，不能转载自己的图文</div>";
break;

default:
s.pubType=1,s.reprintDesc="";
}
"function"==typeof r.cb&&r.cb(i,s,r.openAdReprintStatus);
}),r.list;
};
return r;
});define("common/wx/media/chooseOriArticlePubPopover.js",["common/wx/popover.js","tpl/media/chooseOriArticlePubPopover.html.js"],function(_){
"use strict";
var e=_("common/wx/popover.js"),t=_("tpl/media/chooseOriArticlePubPopover.html.js");
return function(_){
var T;
switch(_.sourceReprintStatus){
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY":
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY":
T="initiative"===_.type?"用户在转载公众号内进行阅读":"将清空对原文的修改，在图文底部展示转载来源";
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE":
case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE":
T="将保留对原文的修改";
}
var R=!0;
_.isPay?R=!0:"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE"===_.sourceReprintStatus||"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE"===_.sourceReprintStatus?R=!1:"EN_CANNOT_OPEN_AD_REPRINT"===_.openAdReprintStatus||"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY"!==_.sourceReprintStatus&&"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY"!==_.sourceReprintStatus||(R=!1);
var o=new e({
dom:_.target,
arrowPos:_.arrowPos,
container:_.target,
content:template.compile(t)({
lang:_.lang,
type:_.type,
reprintMsg:T,
value:_.value,
onlyShare:R
}),
hideIfBlur:!0,
onHide:function(){
this.remove();
}
}),S=o.getDom();
return S.find(".js_pubWay").checkbox({
onChanged:function(e){
var t=1*e.val();
if(S.find(".js_msg").hide().eq(t).show(),0===t)switch(_.textDom&&_.textDom.text("转载"),
_.sourceReprintStatus){
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY":
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY":
_.grayDom&&_.grayDom.text("initiative"===_.type?"用户在转载公众号内进行阅读":"将清空对原文的修改");
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE":
case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE":
_.grayDom&&_.grayDom.text("将保留对原文的修改");
}else _.textDom&&_.textDom.text("分享"),_.grayDom&&_.grayDom.text("用户须跳转至原文阅读");
"function"==typeof _.change&&_.change(t,_.sourceReprintStatus,_.openAdReprintStatus);
}
}),o;
};
});define("tpl/media/reprint_tips_popover.html.js",[],function(){
return'<p style="color: rgb(34, 34, 34);">符合条件的公众号都可以转载此图文。</p>\n<p style="color: rgb(34, 34, 34);">开放转载将会以原文样式发送，显示转载来源。</p>\n<p><a href="/cgi-bin/announce?action=getannouncement&key=11526652746MV5HH&version=1&lang=zh_CN&platform=2" target="_blank">了解更多转载规则</a></p>';
});define("tpl/media/sharecopyright_card.html.js",[],function(){
return'{if ret === 0 && data.length}\n  {each data as card i}\n    <div class="js_go_page2 sharecopyright-card" data-biz="{card.bizuin}" data-nickname="{card.nickname}" data-head_img_url="{card.head_img_url || \'http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0\'}" data-can_modify="{card.can_modify}" data-can_reward="{card.can_reward}" data-can_hide_source="{card.can_hide_source}">\n      <div class="sharecopyright-card__wrap">\n        <img class="sharecopyright-card__img" src="{card.head_img_url || \'http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0\'}">\n        <div class="sharecopyright-card__name">{card.nickname}</div>\n        <span class="sharecopyright-card__right"></span>\n      </div>\n      <div>\n        <div class="sharecopyright-card__line">\n          <span class="sharecopyright-card__line-title">添加时间</span>\n          <div class="sharecopyright-card__line-content">{unixFormat card.update_time \'YYYY-MM-DD HH:mm\'}</div>\n        </div>\n        <div class="sharecopyright-card__line">\n          <span class="sharecopyright-card__line-title">白名单设置</span>\n          <div class="sharecopyright-card__line-content">\n            {if card.can_modify}<p>-可修改图文</p>{/if}\n            {if card.can_hide_source}<p>-可不显示转载来源</p>{/if}\n          </div>\n        </div>\n      </div>\n    </div>\n  {/each}\n{else if mode !== \'append\'}\n  <div class="ta-c mt-30 mb-100">\n    <p class="sharecopyright-tips_black"{if ret !== 0} style="color: #e15f63;"{/if}>\n      {if ret === 0}\n        暂无可转载公众号      {else if ret === 200013}\n        你的操作太频繁，请稍后再试      {else}\n        系统繁忙，请稍后再试      {/if}\n    </p>\n    {if ret === 0}<p class="sharecopyright-tips_gray">把你添加为全局转载白名单的公众号将会出现在这里</p>{/if}\n  </div>\n{/if}\n\n{if ret === 0 && (mode === \'append\' || (data.length && mode !== \'append\'))}\n  <div class="{if !isBizDataEnd}js_load_more {/if}sharecopyright-card ta-c gray" style="background-color: #fff; line-height: 146px; cursor: default;">{if !isBizDataEnd}加载更多{else}没有更多了{/if}</div>\n{/if}';
});define("tpl/media/sharecopyright_item.html.js",[],function(){
return'{if mode !== \'append\'}\n  <table class="weui-desktop-table sharecopyright-table">\n    <thead class="weui-desktop-table__hd">\n      <tr>\n        <th></th>\n\n        <th>图文</th>\n\n        {if type === \'article\'}\n          <th>来源</th>\n        {else if type === \'search\'}\n          <th>原创公众号</th>\n        {/if}\n\n        {if type === \'article\'}\n          <th>添加时间</th>\n        {else if type === \'bizArticle\'}\n          <th>发表日期</th>\n        {else}\n          <th>转载设置</th>\n        {/if}\n\n        <th style="width: 180px">发送方式</th>\n      </tr>\n    </thead>\n    <tbody class="weui-desktop-table__bd">\n{/if}\n\n{if ret === 0 && data.length}\n  {each data as item index}\n    {if type === \'article\' && alreadyReprintIdx === page + index}\n      <tr>\n        <td style="border-bottom: 0;" colspan="{if type === \'bizArticle\'}4{else}5{/if}">\n          <p class="gray">以下是已转载图文</p>\n        </td>\n      </tr>\n    {/if}\n    <tr>\n      <td>\n        <input type="radio" name="ori_{type}_item" data-index="{page + index}" class="frm_radio js_article_radio js_selected_radio" data-pub="{item.pubType}" data-source_reprint_status="{item.source_reprint_status}">\n      </td>\n\n      <td>\n        <a class="black-link" href="{item.url}" target="_blank">\n          {if item.is_pay_subscribe}<span class="weui-desktop-key-tag weui-desktop-key-tag_pay">付费</span>{/if}\n          {item.title}\n        </a>\n        {if type === \'article\'}\n          <div>{item.nickname}</div>\n        {/if}\n      </td>\n\n      {if type !== \'bizArticle\'}\n        <td>\n          {if type === \'article\'}\n            {=item.reprintDesc}\n          {else}\n            {item.nickname}\n          {/if}\n        </td>\n      {/if}\n\n      <td>\n        {if type === \'article\'}\n          {unixFormat item.update_time \'YYYY-MM-DD HH:mm\'}\n        {else if type === \'bizArticle\'}\n          {unixFormat item.update_time \'YYYY-MM-DD\'}\n        {else}\n          {=item.reprintDesc}\n        {/if}\n      </td>\n\n      <td>\n        <span class="js_choosePublishWay js_enable" data-open_ad_reprint_status="{openAdReprintStatus}" data-source_reprint_status="{item.source_reprint_status}" data-pub="{item.pubType}" data-is_pay="{item.is_pay_subscribe}">\n          <span class="js_publishWayText">\n            {if item.pubType === 0}\n              转载            {else}\n              分享            {/if}\n          </span>\n          <span class="icon-arrow"></span>\n        </span>\n        <div class="gray js_gray">\n          {if item.pubType === 1}\n            用户需要跳转至原文阅读          {else}\n            {item.grayText}\n          {/if}\n        </div>\n      </td>\n    </tr>\n  {/each}\n  {if total > (page + perPage)}\n    <tr class="js_load_more" data-allow_reprint="{allowReprint}" data-biz="{biz}" data-nickname="{nickname}" data-head_img_url="{headImgUrl}">\n      <td colspan="{if type === \'bizArticle\'}4{else}5{/if}">\n        <p class="ta-c gray">加载更多</p>\n      </td>\n    </tr>\n  {/if}\n{else}\n  <tr{if ret === -1 && mode === \'append\'} class="js_load_more" data-allow_reprint="{allowReprint}" data-biz="{biz}" data-nickname="{nickname}" data-head_img_url="{headImgUrl}"{/if}>\n    <td colspan="{if type === \'bizArticle\'}4{else}5{/if}">\n      <p class="sharecopyright-tips_black ta-c"{if ret !== 0} style="color: #e15f63;"{/if}>\n        {if ret === 0}\n          暂无待转载图文        {else}\n          {msg || \'系统繁忙，请稍后再试\'}\n        {/if}\n      </p>\n      {if ret === 0}<p class="sharecopyright-tips_gray ta-c">把你添加为转载白名单的图文将会出现在这里</p>{/if}\n    </td>\n  </tr>\n{/if}\n\n{if mode !== \'append\'}\n    </tbody>\n  </table>\n{/if}';
});define("tpl/media/sharecopyright_dialog.html.js",[],function(){
return'<div class="share_appmsg_dialog">\n    <div class="js_page1">\n        <div class="frm_control_group frm_control_group_new" >\n            <label for="" class="frm_label">\n                查找图文            </label>\n            <div class="frm_controls">\n                <!-- <div id="js_search_article_type" style="height:32px;" class="dropdown_menu2"></div> -->\n                <div class="search_wrapper" style="height:32px;">\n                    <span class="frm_input_box search with_del append ">\n                        <a class="del_btn js_search_del" href="javascript:" style="display: none;">\n                            <i class="icon_search_del"></i>&nbsp;\n                        </a>\n                        <a href="javascript:void(0);" class="js_search_btn frm_input_append">\n                            <i class="icon16_common search_gray">\n                                搜索                            </i>\n                            &nbsp;\n                        </a>\n                        <input type="text" class="js_search_input frm_input" placeholder="输入原创图文链接/标题/关键字，按回车查找">\n                    </span>\n                </div>\n\n                <p class="js_search_wording" style="margin-top:10px; display: none;">\n                  根据<a class="link-color" href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=11526652746MV5HH&version=1&lang=<%@GetLanguage()%>&platform=2" target="_blank">原创转载规则</a>，只能搜索并转载原创图文                   <span class="js_tooltips" data-tips=\'原创特指自己写的、独立完成创作的作品。公众平台鼓励用户发表原创图文，平台会对原创声明的图文在群发后进行审核，审核通过后图文会被标识为原创图文。\'></span>\n                </p>\n\n                <p class="js_tips_main frm_msg fail">\n                    <span class="js_search_tips frm_msg_content"></span>\n                </p>\n            </div>\n            <div class="js_type_area type-choose__wrap">\n                <div class="js_type_item type-choose__item active" data-type="article">待转载图文</div>\n                <span class="type-choose__item-split"></span>\n                <div class="js_type_item type-choose__item" data-type="biz">可转载公众号</div>\n            </div>\n        </div>\n\n        <div class="share_article_loading js_loading" style="display:none;">\n            <i class="icon_loading_small white"></i>\n            <span class="vm_box"></span>\n        </div>\n\n        <div class="share_article_area js_article_area" style="display:none;">\n            <div class="js_article_content share_article_list"></div>\n        </div>\n\n        <div class="js_biz_area" style="display: none;"></div>\n\n        <div class="share_article_area js_search_area" style="display:none;">\n            <div class="js_search_content share_article_list"></div>\n        </div>\n\n        <!-- <label style="text-align: center; margin-top: 25px; width: 100%; display: none;" id="js_open_ad_reprint_area">\n          <i class="icon_checkbox"></i>\n          <input type="checkbox" id="js_open_ad_reprint_checkbox" checked />\n          开通转载收益并同意<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=home/adhost_agreement_tmpl" target="_blank">《腾讯微信公众平台广告展示服务协议》</a>        </label> -->\n    </div>\n\n    <div class="js_page2" style="display: none;">\n        <div>\n            <a class="js_go_page1" href="javascript:;">转载图文</a>\n            &gt;\n            <span class="gray"><span class="js_card_title"></span>的可转载图文</span>\n        </div>\n\n        <div class="js_card_whitelist gopage-tips2_gray">可修改图文；可不显示转载来源</div>\n\n        <div class="share_article_loading js_loading" style="display:none;">\n            <i class="icon_loading_small white"></i>\n            <span class="vm_box"></span>\n        </div>\n\n        <div class="share_article_area js_biz_article_area">\n            <div class="js_biz_article_content share_article_list"></div>\n        </div>\n    </div>\n\n    <div id="js_agree_area" style="text-align: center; width: 100%; position: absolute; left: 0; bottom: -18px; z-index: 1; display: none;">\n      <label for="js_agree">\n        <i class="icon_checkbox"></i>\n        <input type="checkbox" id="js_agree" checked />\n        我已阅读并同意<a href="/cgi-bin/announce?action=getannouncement&key=11544165763bBflv&version=1&lang=zh_CN&platform=2" target="_blank">《微信公众平台转载功能使用条款》</a>      </label>\n    </div>\n</div>';
});