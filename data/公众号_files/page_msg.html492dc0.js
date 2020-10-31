define("common/wx/mpEditor/plugin/img.js",["tpl/mpEditor/plugin/img_popup.html.js","common/wx/mpEditor/common/eventbus.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/Tips.js","common/wx/mpEditor/plugin/exif.js","common/wx/Cgi.js"],function(t){
"use strict";
var e=t("tpl/mpEditor/plugin/img_popup.html.js"),i=t("common/wx/mpEditor/common/eventbus.js"),a=t("common/wx/mpEditor/plugin/remoteimg.js"),n=t("common/wx/Tips.js"),r=t("common/wx/mpEditor/plugin/exif.js"),o=t("common/wx/Cgi.js"),s={
attrWhiteList:",data-remoteid,data-asynid,src,data-src,_src,align,alt,border,class,data-ratio,data-s,data-type,data-w,height,hspace,ismap,opacity,sizes,style,title,type,usemap,vspace,width,data-width,data-height,data-croporisrc,data-cropx1,data-cropx2,data-cropy1,data-cropy2,data-cropselx1,data-cropselx2,data-cropsely1,data-cropsely2,data-backw,data-backh,data-copyright,data-oversubscription-url,data-before-oversubscription-url,"
},d=function(t){
t&&t.container&&(this.domid=t.container,this.container=$(t.container).show(),this._canvas=document.createElement("canvas"),
this._ctx=this._canvas.getContext("2d"),this._bindHideMenuOnDocument=this._hideMenuOnDocument.bind(this),
this._bindHideMenuOnEditor=this._hideMenuOnEditor.bind(this),t.can_show_reddot&&this.container.addClass("tpl_item_reddot")),
this.notHideMenu=!1;
};
return d.beforeSetContent=function(t){
if(!t.html)return"";
var e=t.html.replace(/<img(.*?)\s+data\-src="/g,'<img$1 src="');
return e;
},d.formatHTML=function(t){
var e="300,640";
if(t=UE.utils.isArray(t)?t:[t],t.length){
var i,a=[],n="";
if(i=t[0],1==t.length){
var r=i.format||"",o=i.name||"";
"gif"==r&&(i.src+="/mmbizgif");
var s=' data-s="'+e+'" ';
i.src&&/\/mmbizgif$/.test(i.src)&&(i.src=i.src.replace(/\/mmbizgif$/,""),s=" "),
s+=r?' data-type="'+r+'" ':"",s+=o?' data-filename="'+o+'" ':"";
var d="rich_pages";
i.classname&&(d+=" "+i.classname),s+=' class="'+d+'"',n="<img "+s+' src="'+i.src+'"'+("undefined"!=typeof i.copyright_status?' data-copyright="'+i.copyright_status+'"':"")+(i.title&&""!=i.title?' title="'+i.title+'"':"")+(i.border&&"0"!=i.border?' border="'+i.border+'"':"")+(i.alt&&""!=i.alt?' alt="'+i.alt+'"':"")+(i.hspace&&"0"!=i.hspace?' hspace = "'+i.hspace+'"':"")+(i.vspace&&"0"!=i.vspace?' vspace = "'+i.vspace+'"':"")+' style="'+(i.width?"width:"+i.width+"px;":"")+(i.height?" height:"+i.height+"px;":"")+("left"==i.floatStyle||"right"==i.floatStyle?"float:"+i.floatStyle+";":"")+'" />',
n='<p style="text-align: center">'+n+"</p>",a.push(n);
}else for(var c=0;i=t[c++];){
"gif"==i.format&&(i.src+="/mmbizgif");
var s=' data-s="'+e+'" ';
i.src&&/\/mmbizgif$/.test(i.src)&&(i.src=i.src.replace(/\/mmbizgif$/,""),s=" "),
s+=i.format?' data-type="'+i.format+'" ':"",s+=i.name?' data-filename="'+i.name+'" ':"";
var d="rich_pages";
i.classname&&(d+=" "+i.classname),s+=' class="'+d+'"',n="<p "+("center"==i.floatStyle?'style="text-align: center" ':"")+"><img "+s+' src="'+i.src+'" '+("undefined"!=typeof i.copyright_status?' data-copyright="'+i.copyright_status+'"':"")+(i.title&&""!=i.title?' title="'+i.title+'"':"")+(i.border&&"0"!=i.border?' border="'+i.border+'"':"")+(i.alt&&""!=i.alt?' alt="'+i.alt+'"':"")+(i.hspace&&"0"!=i.hspace?' hspace = "'+i.hspace+'"':"")+(i.vspace&&"0"!=i.vspace?' vspace = "'+i.vspace+'"':"")+' style="'+(i.width?"width:"+i.width+"px;":"")+(i.height?" height:"+i.height+"px;":"")+("left"==i.floatStyle||"right"==i.floatStyle?"float:"+i.floatStyle+";":"")+'" /></p>',
a.push(n);
}
return a;
}
},d.prototype={
getName:function(){
return"insertimage";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return this._hasMenuShow=!1,function(){
var e=this;
t.$imgMenu=$(".js_img_dropdown_menu"),t.$uploadFile=t.$imgMenu.children().find("input[type=file]"),
t._hasMenuShow||t._showMenu(e);
};
},
doCommand:function(t,e,i,a){
if(i){
console.log("insert image");
var n=t,r=d.formatHTML(i);
return n.execCommand("insertHtml",r.join(""),void 0,a);
}
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
var e=t.init(),i=e.get("content");
e.set("content",i.replace(/<img(.*?)\s+src="/g,'<img$1 data-src="'));
},
addListener:function(t){
var e=this,i=t.getUeditor();
t.getBrowser().ie?this._showPopup(t):t.addListener("click",function(e,a){
var n=a.target||a.srcElement;
if(n&&"IMG"==n.tagName&&-1===n.className.indexOf("js_noimgselected")){
var r=new UE.dom.Range(i.document);
r.selectNode(a.target).select(),t.fireEvent("img_selected",a,n);
}
}),t.addListener("get_img_popup_html",function(t,i,a){
return e._getImgPopupHtml(i,a);
}),t.addListener("afterpaste",function(t,e,i){
$(i).find(".gif_bg_tips_wrp").each(function(){
$(this).remove();
}),$(i).find(".gif_img_tips_group").each(function(){
$(this).remove();
}),$(i).find(".gif_img_tips").each(function(){
$(this).remove();
}),$(i).find(".load_img_tips").each(function(){
$(this).remove();
}),$(i).find(".load_img_wrp").each(function(){
$(this).remove();
}),$(i).find(".js_img_tips").each(function(){
$(this).remove();
}),$.each(i,function(){
$(this).find("img").each(function(){
var t=$(this).attr("src")||"";
t.indexOf("/s640?")>-1&&t.indexOf("wx_fmt=gif")>-1&&$(this).parent().hasClass("gif_img_wrp")&&$(this).parent().before(this).remove(),
$(this).removeAttr("data-forceheight").removeAttr("data-nopreviewclick");
}),$(this).hasClass("js_img_tips")&&$(this).remove();
});
}),t.addListener("insertMaterialImg",function(t,a){
return e.doCommand(i,"insertimage",a);
}),t.addListener("uploadLocalImg",function(t,i){
e._getImgFromLocal(this,i.evt,{
type:"fireEvent"
});
}),t.addListener("afterpaste",function(t,i,a){
e.filterLinkImgIcon(a);
}),t.addListener("afterpasteimg aftersetcontent afterinserthtml afterCropImg",function(i,a,n){
var r=$(t.getDocument()).find("body").width(),o=$(n),s=o.filter("img").add(o.find("img"));
s.each(function(){
var i,a=$(this);
e.filterAttr(a),i=a.attr("data-w"),isNaN(parseInt(i))&&a.removeAttr("data-w"),a.attr("data-ratio")&&a.attr("data-w")||!function(t,e){
var i=new Image,a=t.attr("src");
e.delegateDomAsyn({
dom:t,
timeout:1e4,
requsetFun:function(){
i.onload=this.requsetSucFun,i.onerror=this.requsetFailFun,i.src=a;
},
requsetSucFun:function(t){
if(i){
if(t&&t.newDom){
var e=i.naturalWidth||i.width||0,a=i.naturalHeight||i.height||0;
0!=e&&0!=a&&(t.newDom.attr("data-ratio",a/e),t.newDom.attr("data-w",r==e?"":e));
}
i.onload=null,i.onerror=null,i=null;
}
},
requsetFailFun:function(t){
i&&(t&&t.newDom&&t.newDom.removeAttr("data-ratio").removeAttr("data-w"),i.onload=null,
i.onerror=null,i=null);
}
});
}(a,t),e.handlerH5LinkImg(a[0]);
});
}),t.addListener("handlerH5LinkImg",function(t,i){
e.handlerH5LinkImg(i);
}),t.addListener("keydown",function(t,e){
var i=this.selection.getRange();
if(i.endOffset!==i.startOffset){
var a=i.startContainer,n=null;
if(a){
var r=a.nodeType;
1===r?n=a.children[i.endOffset-1]:3===r&&(n=a.parentNode);
}
if(n&&1===n.nodeType&&"IMG"===n.nodeName){
var o=e.keyCode||e.which;
if(13===o){
var s=n.parentNode,d=s.childNodes;
if(i.endOffset<d.length){
var c=this.document.createElement("p");
c.style.textAlign="center";
for(var m=i.startOffset;m>=0;m--)c.appendChild(d[0]);
s.insertAdjacentElement("beforebegin",c),0===s.childNodes&&s.parentNode.removeChild(s);
}else s.insertAdjacentHTML("afterend","<p><br></p>"),i.selectNodeContents(s.nextElementSibling).select();
return e.preventDefault(),this.fireEvent("saveScene"),!0;
}
}
}
});
},
filterAttr:function(t){
if(t&&0!=t.length)for(var e=t[0].attributes,i=0;i<e.length;i++){
var a=","+e[i].name+",";
-1==s.attrWhiteList.indexOf(a)&&(t.removeAttr(e[i].name),i--);
}
},
filterLinkImgIcon:function(t){
var e=$(t),i=e.filter("span.js_jump_icon").add(e.find("span.js_jump_icon")),a=this.editor.getDomUtils();
i.each(function(){
0==this.getElementsByTagName("img").length&&a.remove(this,!0);
});
},
handlerH5LinkImg:function(t){
function e(t,e){
var i=t.ownerDocument,a=i.defaultView||i.parentWindow,r=a.getComputedStyle(t);
for(var o in n)("position"!=o||"position"==o&&/^(absolute)|(fixed)|(sticky)$/.test(r[o]))&&(e.style[o]=r[o]);
"span"==e.tagName.toLowerCase()&&e.setAttribute("data-positionback",r.position),
t.style.margin="0px",t.style.position="static";
}
function i(t){
var e={};
for(var i in n)e[i]=t.style[i];
return t.getAttribute("data-positionback")&&(e.position=t.getAttribute("data-positionback")),
e;
}
var a=$(t);
if(a&&0!=a.length&&"img"==a[0].tagName.toLowerCase()){
var n={
position:"",
top:"",
left:"",
margin:"",
right:"",
bottom:""
},r=this.editor.getUeditor(),o=this.editor.getDomUtils(),s=a.parents("a"),d=!1;
s.each(function(){
var t=this.getAttribute("href");
return/^http(s)?:\/\//i.test(t)?(d=!0,!1):void 0;
});
var c=null;
if(a.parents("span.js_jump_icon").each(function(){
(1!=this.childElementCount||"img"!=this.firstElementChild.tagName.toLowerCase())&&this.parentNode&&(c||(c=i(this,{})),
o.remove(this,!0));
}),c)for(var m in c)a[0].style[m]=c[m];
var l=!1,h=a.parent();
if(h.length>0&&"span"==h[0].tagName.toLowerCase()&&h.hasClass("js_jump_icon")&&(l=!0),
d){
if(!l){
h=a.parent();
var p=r.document.createElement("span");
p.className="js_jump_icon h5_image_link",e(a[0],p),h[0].insertBefore(p,a[0]),p.appendChild(a[0]);
}
}else if(l){
for(h=a.parent(),e(h[0],a[0]);h[0].firstChild;)h[0].parentNode.insertBefore(h[0].firstChild,h[0]);
a[0].style.position=h[0].getAttribute("data-positionback"),h[0].parentNode.removeChild(h[0]);
}
}
},
beforeSetContent:function(t){
return d.beforeSetContent({
html:t
});
},
_showPopup:function(t){
var e=this,i=t.getUeditor();
t.addListener("handle_common_popup",function(t,a){
var n=i.selection.getRange().getClosedNode();
e._getImgPopupHtml(n,a);
});
},
_getImgPopupHtml:function(t,i){
var n=$(t),r="";
if(t&&/^img$/i.test(t.tagName)&&!n.hasClass("js_noimgpopup")&&!this._filterPopup(t)){
var o=!1;
"100%"==t.style.width&&"auto"==t.style.height&&(o=!0);
var s=!0,d=a.defaultRemoteImg.replace("http://","").replace("https://","");
(!a.isLocalDomain(t.src)||t.src.indexOf(d)>0||a.isCdnImg(t.src)&&t.src.indexOf("mmbiz_gif")>=0)&&(s=!1);
var c={
hasCropimg:s,
needBreak:i&&i.data.length>0?!0:!1,
hasadapt:o
};
r=wx.T(e,c),i&&i.data&&i.data.push({
html:r,
renderData:c,
cmd:this.getName(),
node:t
}),this.editor.fireEvent("reportAddNum","122333","85","1");
}
return r;
},
_filterPopup:function(t){
if(!t)return!1;
var e=t.src||"";
return/^http(s)?:\/\/res\.wx\.qq\.com\/mpres\/htmledition\/images\/icon\/common\/emotion_panel/.test(e)?!0:/http(s)?:\/\/res\.wx\.qq\.com\/mpres\/zh_CN\/htmledition\/comm_htmledition\/images\/pic\/common\/pic_blank\.gif/.test(e)?!0:void 0;
},
_dataURLtoBlob:function(t){
for(var e=t.split(","),i=e[0].match(/:(.*?);/)[1],a=atob(e[1]),n=a.length,r=new Uint8Array(n);n--;)r[n]=a.charCodeAt(n);
return new Blob([r],{
type:i
});
},
_compressAsDataURL:function(t,e){
return this._canvas.toDataURL(t,e/100);
},
_doCompress:function(t,e,i,a){
var n=a.afterCompressSizeLimit;
if(!a||!~"image/jpeg,image/jpg,image/png,image/bmp".indexOf(e.type))return{
quality:t,
blob:e
};
var r=this._compressAsDataURL(e.type,0|t),o=this._dataURLtoBlob(r),s=e.size;
return o.size<s&&o.size>n&&t>40&&(e.size=o.size,t*=a.quality/100,t=this._doCompress(t,e,i,a).quality),
{
quality:t,
blob:o
};
},
_rotate2Orientation:function(t,e){
var i=t.width,a=t.height,n=t.getContext("2d");
switch(e){
case 5:
case 6:
case 7:
case 8:
t.width=a,t.height=i;
}
switch(e){
case 2:
n.translate(i,0),n.scale(-1,1);
break;

case 3:
n.translate(i,a),n.rotate(Math.PI);
break;

case 4:
n.translate(0,a),n.scale(1,-1);
break;

case 5:
n.rotate(.5*Math.PI),n.scale(1,-1);
break;

case 6:
n.rotate(.5*Math.PI),n.translate(0,-a);
break;

case 7:
n.rotate(.5*Math.PI),n.translate(i,-a),n.scale(-1,1);
break;

case 8:
n.rotate(-.5*Math.PI),n.translate(-i,0);
}
},
_resizeImg:function(t,e,i){
var a,n,r=e.width,o=e.height,s=i.afterCompressSizeLimit;
s&&t.size<s&&(!i.maxResolution||e.width*e.height<i.maxResolution)?(a=e.width,n=e.height):(a=i.maxWidth,
n=i.maxHeight);
var d=Math.min(a/r,n/o);
d=Math.min(1,d);
var c=r*d,m=o*d;
this._canvas.width=c,this._canvas.height=m,e.width=c,e.height=m,this._rotate2Orientation(this._canvas,i.orientation),
this._ctx.clearRect(0,0,c,m),this._ctx.drawImage(e,0,0,c,m);
},
_appendImage:function(t,e){
var i=this;
if(t!==i._curFiles.length){
var a=i._curFiles[t],o=i._validImg(a);
if(null!==a&&o!==!0&&2===o.type?this.editor.fireEvent("reportAddNum",[{
id:"122443",
key:"2",
len:"1"
},{
id:"122443",
key:"0",
len:"1"
},{
id:"122443",
key:"22",
len:"1"
}]):null!==a&&o===!0&&this.editor.fireEvent("reportAddNum",[{
id:"122443",
key:"1",
len:"1"
},{
id:"122443",
key:"0",
len:"1"
},{
id:"122443",
key:"22",
len:"1"
}]),null!==a&&o===!0){
var s=new Image,d=1;
s.onload=function(){
r.getData(a,function(){
d=r.getTag(this,"Orientation"),1!==d&&((new Image).src="/mp/jsmonitor?idkey=65080_118_1"),
i._resizeImg(a,s,{
maxWidth:1280,
maxHeight:1e8,
maxResolution:6e6,
orientation:d
});
var o=i._doCompress(100,a,s,{
afterCompressSizeLimit:10485760,
quality:90
}),c=i._validImgCompressSize(o.blob,a);
if(c===!0)i._getDataURL(o.blob,function(n){
a.src=a.url=n.target.result,a.classname="js_insertlocalimg";
var r=[];
r.push(a),i.doCommand(e,"insertimage",r,{
isUpload:!0
}),i._appendImage(t+1,e);
});else{
var m=2097152,l=5242880,h=[];
o.blob&&o.blob.size>m&&h.push({
id:"122443",
key:"3",
len:"1"
}),o.blob&&o.blob.size>m&&o.blob.size<l&&h.push({
id:"122443",
key:"4",
len:"1"
}),h.length>0&&i.editor.fireEvent("reportAddNum",h),n.err(c.msg||""),i._appendImage(t+1,e);
}
});
},s.onerror=function(){
i._appendImage(t+1,e);
},i._getDataURL(a,function(t){
s.src=t.target.result;
});
}else n.err(o.msg||""),i._appendImage(t+1,e);
}
},
_getDataURL:function(t,e){
var i=new FileReader;
i.onload=e,i.readAsDataURL(t);
},
_getImgFromLocal:function(t,e){
var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],a=this,r=20,o=e.target.files,s=o.length;
if(a._curFiles=[],0===s)console.log("no files"),o=null;else if(s>r)n.err("最多可同时上传20张");else{
$.each(o,function(t,e){
a._curFiles.push(e);
});
var d=this.editor.getUeditor();
d.fireEvent("reportAddNum",65080,115,s),d.fireEvent("reportAddNum",65080,116,1),
a._appendImage(0,t);
}
a.destroy(),a.$uploadFile.val(""),i&&i.type||this.editor.fireEvent("reportToolbarClick",[{
id:"122333",
key:"27"
},{
id:"122333",
key:"29"
}]);
},
_getImgFromLib:function(t){
var e=this,a=this.editor;
a&&((new Image).src="/mp/jsmonitor?idkey=69271_33_1",i.fireEvent("showImageDialog",{
maxselect:100,
uploadscene:3,
uploadgroup:3,
desc:"大小不超过10M"
},function(i){
if(i){
var n;
!function(){
var r=0,s=0;
e.doCommand(t,"insertimage",i.map(function(t){
"upload"===t.source?r++:s++,o.post({
url:"/cgi-bin/modifyfile?oper=updaterecent&fileid="+t.fileId+"&seq="+(wx&&wx.getSeq())
});
var e=a.fireEvent("get_current_article");
if(e){
var i=e.data("article");
if(i){
var n=i.data;
if(n){
var d=3;
1*n.get("copyright_type")===1&&(d=1*n.get("is_cartoon_copyright")===0?1:2),o.post({
url:"/cgi-bin/operate_appmsg?t=ajax-response&sub=pre_load_copyright_img",
data:{
appmsg_id:wx.cgiData.app_id||"",
index:i.getIndex(),
img_list:JSON.stringify({
url:[t.url]
}),
article_type:d
}
});
}
}
}
return t.src=t.url,t;
}),{
isFromLib:!0
}),r>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:39,
val:r,
level:"trace",
content:"[file=media/appmsg_edit]"
}),s>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:40,
val:s,
level:"trace",
content:"[file=media/appmsg_edit]"
}),n=i.length,n>0&&a.funcPvUvReport("insertimage",n);
}();
}
}));
},
_validImg:function(t){
var e=",bmp,png,jpeg,jpg,gif,",i=","+(t.type.split("/")[1]||"")+",",a=10485760;
return-1==e.indexOf(i)?{
type:1,
msg:"不支持该格式"
}:t.size>a?{
type:2,
msg:"文件大小超过10M"
}:!0;
},
_validImgCompressSize:function(t,e){
var i=10485760,a=!!(wx&&wx.commonData&&wx.commonData.acl&&wx.commonData.acl.msg_acl&&wx.commonData.acl.msg_acl.can_upload_2m_more_gif);
if(t.size>i){
if(!~"image/gif".indexOf(e.type))return{
type:3,
msg:"图片尺寸太大，压缩后不能超过10M，请缩小图片尺寸再试"
};
if(!a)return{
type:3,
msg:"图片尺寸太大，压缩后不能超过10M，请缩小图片尺寸再试"
};
}
return!0;
},
_showMenu:function(t){
var e=this.$imgMenu,i=this.editor;
i&&!this._hasMenuShow&&(this._bindMenuClickEvent=this._menuClickEvent.bind(this,t),
this._bindGetImgFromLocal=this._getImgFromLocal.bind(this,t),this._hasMenuShow=!0,
e.show(),$(document).on("click",this._bindHideMenuOnDocument),this.$uploadFile.on("change",this._bindGetImgFromLocal),
this._bindMenuClickEvent&&e.on("click",this._bindMenuClickEvent),i.addListener("click",this._bindHideMenuOnEditor));
},
_hideMenuOnDocument:function(t){
if(!this.notHideMenu){
var e=$(this.domid);
e.is(t.target)||e.find(t.target).length||this._hasMenuShow&&this.destroy();
}
},
_hideMenuOnEditor:function(){
this.destroy();
},
_menuClickEvent:function(t,e){
var i=this.$imgMenu.children()[1];
e.target===i&&(this._getImgFromLib(t),this.editor.fireEvent("reportToolbarClick",[{
id:"122333",
key:"27"
},{
id:"122333",
key:"31"
}]));
},
destroy:function(){
var t=this.$imgMenu;
this._bindMenuClickEvent&&t.off("click",this._bindMenuClickEvent),this._hasMenuShow=!1,
t.hide(),this.$uploadFile.off("change",this._bindGetImgFromLocal),this.editor.removeListener("click",this._bindHideMenuOnEditor),
$(document).off("click",this._bindHideMenuOnDocument);
}
},d;
});define("common/wx/mpEditor/plugin/weapp.js",["common/wx/popup.js","biz_web/ui/checkbox.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/mpEditor/common/eventbus.js","tpl/mpEditor/plugin/link_popup.html.js","common/wx/mpEditor/plugin/img.js"],function(t){
"use strict";
function a(t,a){
var e={};
for(var r in a)e[r]=encodeURIComponent(a[r]);
return t.replace(/\{(.+?)\}/g,function(t,a){
return e[a]||a;
});
}
function e(t,a){
var e=a;
for(var r in a)e[r]=((a[r]||"")+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
return t.format(e);
}
function r(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.html,r=t.editor,i=$("<div>"+e+"</div>"),n=[];
if(i.find("mp-miniprogram,mp-weapp").replaceWith(function(){
var t=$(this),e=t.attr("data-miniprogram-appid")||t.attr("data-weapp-appid")||"",r=t.attr("data-miniprogram-title")||t.attr("data-weapp-title")||"",i=t.attr("data-miniprogram-imageUrl")||t.attr("data-weapp-imageUrl")||"",p=t.attr("data-miniprogram-nickname")||t.attr("data-weapp-nickname")||"",m=t.attr("data-miniprogram-avatar")||t.attr("data-weapp-avatar")||"",o=t.attr("data-miniprogram-path")||t.attr("data-weapp-path")||"",d=t.attr("data-miniprogram-type")||"",s=t.attr("data-miniprogram-servicetype")||"0";
return n.push({
imageUrl:i
}),$('<iframe class="res_iframe weapp_app_iframe js_editor_weapp" frameborder="0">').attr("src",a("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}",{
nickname:p,
avatar:m,
title:r,
imageUrl:i
})).attr("data-miniprogram-appid",e).attr("data-miniprogram-path",o).attr("data-miniprogram-nickname",p).attr("data-miniprogram-avatar",m).attr("data-miniprogram-title",r).attr("data-miniprogram-imageUrl",i).attr("data-miniprogram-type",d).attr("data-miniprogram-servicetype",s);
}),i.find("a.weapp_text_link,a.weapp_image_link").each(function(){
$(this).attr("href",""),$(this).attr("_href","");
}),i.find("span.js_weapp_display_element").remove(),r&&"function"==typeof r.fireEvent&&n.length>0){
for(var m=[],o=0,d=n.length;d>o;o++){
m.push({
id:"122443",
key:"12"
});
var s=n[o];
s.imageUrl&&!p.isLocalDomain(s.imageUrl)&&m.push({
id:"122443",
key:"13"
});
}
m.length>0&&r.fireEvent("reportAddNum",m);
}
return i.html();
}
function i(t){
var a=$("<div>"+t+"</div>");
return a.find("iframe.js_editor_weapp").replaceWith(function(){
var t=$(this),a=t.attr("data-miniprogram-appid"),e=t.attr("data-miniprogram-title"),r=t.attr("data-miniprogram-imageUrl"),i=t.attr("data-miniprogram-nickname"),n=t.attr("data-miniprogram-avatar"),p=t.attr("data-miniprogram-path"),m=t.attr("data-miniprogram-type")||"",o=t.attr("data-miniprogram-servicetype")||"0";
return $("<mp-miniprogram>").attr("class","miniprogram_element").attr("data-miniprogram-appid",a).attr("data-miniprogram-path",p).attr("data-miniprogram-nickname",i).attr("data-miniprogram-avatar",n).attr("data-miniprogram-title",e).attr("data-miniprogram-imageUrl",r).attr("data-miniprogram-type",m).attr("data-miniprogram-servicetype",o);
}),a.html();
}
function n(t){
this.__o={
container:""
},this.editor=null,this.__init(t||{}),t&&t.container&&($(t.container).show(),t.can_show_reddot&&$(t.container).addClass("tpl_item_reddot")),
this.can_use_weapp_card=t.can_use_weapp_card||!1,this.info=t.info;
}
t("common/wx/popup.js"),t("biz_web/ui/checkbox.js"),t("common/wx/popup.js");
var p=t("common/wx/mpEditor/plugin/remoteimg.js"),m=(t("common/wx/Tips.js"),t("common/wx/dialog.js")),o=t("common/wx/mpEditor/common/eventbus.js"),d=t("tpl/mpEditor/plugin/link_popup.html.js"),s=t("common/wx/mpEditor/plugin/img.js"),c={
maxCount:50,
maxUniqueCount:10
};
return n.beforeSetContent=function(t){
if(!t.html)return"";
var a=r({
html:t.html,
editor:t.editor
});
return a;
},n.prototype={
getName:function(){
return"insertweapp";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var a,e=t.editor.queryCommandValue("insertweapp"),r=!1;
if(e){
var i=e.getAttribute("data-miniprogram-appid"),n=e.getAttribute("data-miniprogram-type"),p=e.getAttribute("data-miniprogram-servicetype")||"0";
("qrcode"!=n||"text"!=n||"image"!=n)&&(n="");
var m=e.innerText||"",d=$(e).find("img").attr("src")||"";
n||(d?n="image":m&&(n="text")),a={
type:n||"text",
service_type:p,
appid:i,
path:e.getAttribute("data-miniprogram-path")||"",
nickname:e.getAttribute("data-miniprogram-nickname")||"",
content:m,
image:d,
qrcode:d
},r=!0;
}
(r!==!1||t.check($(t.editor.getUeditor().body))!==!1)&&o.fireEvent("showWeappDialog",{
weappinfo:a
},function(a){
a&&t.__insert(a,r);
});
};
},
getContainer:function(){
return this.__o.container;
},
getQueryCommandValue:function(){
var t=this;
return function(){
var a=t.editor;
if(a){
var e,r=a.getSelectionRange(),i=a.getDomUtils();
if(!r.collapsed){
r.shrinkBoundary();
var n=3!=r.startContainer.nodeType&&r.startContainer.childNodes[r.startOffset]?r.startContainer.childNodes[r.startOffset]:r.startContainer,p=3==r.endContainer.nodeType||0==r.endOffset?r.endContainer:r.endContainer.childNodes[r.endOffset-1],m=r.getCommonAncestor();
if(e=i.findParentByTagName(m,"a",!0),!e&&1==m.nodeType)for(var o,d,s,c=m.getElementsByTagName("a"),g=0;s=c[g++];)if(o=i.getPosition(s,n),
d=i.getPosition(s,p),(o&i.POSITION_FOLLOWING||o&i.POSITION_CONTAINS)&&(d&i.POSITION_PRECEDING||d&i.POSITION_CONTAINS)){
e=s;
break;
}
return e;
}
return e=r.startContainer,e=1==e.nodeType?e:e.parentNode,e&&(e=i.findParentByTagName(e,"a",!0))&&!i.isInNodeEndBoundary(r,e)?e:void 0;
}
};
},
addListener:function(t){
var a=this;
t.addListener("beforepaste",function(t,e){
e.html=r({
html:e.html,
editor:a.editor
});
}),t.addListener("handle_common_popup",function(e,r){
var i=t.queryCommandValue("insertweapp");
if(i&&-1==(i.href||"").indexOf("javascript:")){
if(!i.getAttribute("data-miniprogram-appid"))return;
for(var n=void 0,p=0;p<r.data.length;p++){
var m=r.data[p];
"checktext"===m.cmd&&(n=m.renderData,r.data.splice(p,1),p--);
}
var o=i.getAttribute("data-miniprogram-nickname")||"";
o.length>30&&(o=o.substring(0,20)+"...");
var s={
needBreak:r.data.length>0?!0:!1,
url:"javascript:;",
txt:o,
isWeapp:!0
},c=void 0;
n?(c=n,c.url=s.url,c.txt=s.txt,c.needBreak=s.needBreak,c.isWeapp=s.isWeapp):c=s,
r.data.push({
html:wx.T(d,c),
renderData:c,
renderTpl:d,
cmd:a.getName(),
node:i
});
}
});
},
beforeSetContent:function(t){
return n.beforeSetContent({
html:t,
editor:this.editor
});
},
getPluginData:function(t){
var a=t.init(),e=a.get("content");
return e?(e=i(e),a.set("content",e),a):void 0;
},
__init:function(t){
var a=this.__o;
for(var e in t)Object.prototype.hasOwnProperty.call(a,e)&&(a[e]=t[e]);
},
check:function(t){
var a=this.getWeappCount(t);
return a.totalCount>c.maxCount||a.uniqueCount>c.maxUniqueCount?(m.show({
width:750,
type:"warn",
msg:"图文中包含的小程序素材不能多于%s个、小程序帐号不能多于%s个".sprintf(c.maxCount,c.maxUniqueCount),
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
}),!1):!0;
},
getWeappCount:function(t){
if(!t){
var a=this.editor.getUeditor();
t=$(a.body);
}
var e=[],r={};
t.find("iframe[data-miniprogram-appid]").each(function(){
var t=this.getAttribute("data-miniprogram-appid");
t&&(e.push(e),r[t]=1);
}),t.find("a[data-miniprogram-appid]").each(function(){
var t=this.getAttribute("data-miniprogram-appid");
t&&(e.push(e),r[t]=1);
});
var i=0;
for(var n in r)i++;
return{
totalCount:e.length,
uniqueCount:i
};
},
__insert:function(t,r){
var i=t.type,n="",p={
type:i,
servicetype:t.service_type,
appid:t.appid,
nickname:t.nickname,
avatar:t.headimg_url,
title:t.title,
imageUrl:t.cardImage,
path:t.path,
content:t.content
};
if(p.src=a("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}",p),
"card"==i)n='<p><iframe class="res_iframe weapp_app_iframe js_editor_weapp js_weapp_entry" frameborder="0" src="{src}" data-miniprogram-appid="{appid}" data-miniprogram-nickname="{nickname}" data-miniprogram-title="{title}" data-miniprogram-imageUrl="{imageUrl}" data-miniprogram-avatar="{avatar}" data-miniprogram-path="{path}" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}"></iframe></p>';else if("text"==i){
var m=this.editor.queryCommandValue("fontsize");
if(n='<a class="weapp_text_link js_weapp_entry" '+(m?'style="font-size:'+m+';"':"")+' data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}">{content}</a>',
r){
var o=this.editor.queryCommandValue("insertweapp");
if(o)return void $(o).replaceWith(function(){
return $(e(n,p));
});
}
}else if("image"==i){
if(n=s.formatHTML({
src:t.image,
_src:t.image
}).join(""),n=$(n).find("img").get(0).outerHTML,n='<p><a class="weapp_image_link js_weapp_entry" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}">'+n+"</a></p>",
r){
var o=this.editor.queryCommandValue("insertweapp");
if(o)return void $(o).replaceWith(function(){
return $(e(n,p));
});
}
}else"qrcode"==i&&this.editor.fireEvent("insertMaterialImg",{
src:t.qrcode,
classname:"js_weapp_entry"
});
n=e(n,p);
var d=this.editor,c=d.execCommand("inserthtml",n,!0);
console.log("execCommand",c);
}
},n;
});define("common/wx/mpEditor/plugin/audio_music.js",["common/wx/popup.js","biz_web/ui/checkbox.js","3rd/editor/common/domUtils.js","common/wx/Cgi.js","common/wx/mpEditor/common/eventbus.js","common/wx/Tips.js","tpl/mpEditor/plugin/music_card.html.js","tpl/mpEditor/plugin/audio_card.html.js","3rd/editor/common/no_editable.js"],function(t){
"use strict";
function e(t,e){
if(!e){
var i=t.getUeditor();
e=$(i.body);
}
return e.find(v.cardTag+"."+v.audioCardClass).length;
}
function i(t){
return t.find(v.cardTag+"."+v.audioCardClass).removeAttr("isaac"),t.find(v.audioSaveTag).remove(),
t.find(".js_audio_frame").remove(),t.find("span.js_wap_qqmusic").remove(),t;
}
function a(t,e){
var i="";
if(!t)return i;
if(1==e){
if(/^http(s)?:\/\//i.test(t)){
for(var a,r=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],n=!1,o=0;a=r[o++];)if(a.test(t)){
n=!0;
break;
}
n&&(i=t);
}else{
var s="https://imgcache.qq.com/music/photo/mid_album_90",d="https://y.gtimg.cn/music/photo_new/T002R90x90M000#mid#.jpg",c=t.split("/");
try{
c=c[c.length-1],c=c.split(".")[0];
}catch(u){
c="";
}
i=c?d.replace("#mid#",c):s+t;
}
i=i.replace("mid_album_68","mid_album_90").replace("68x68","90x90");
}else{
for(var a,r=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],n=!1,o=0;a=r[o++];)if(a.test(t)){
n=!0;
break;
}
n&&(i=t);
}
return i;
}
function r(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return template.compile(p)({
musicName:t.musicName,
singer:t.singer,
type:t.type,
albumurl:a(t.albumurl,t.type),
errorType:t.errorType
});
}
function n(t){
var e=Math.floor(t/1e3),i="";
if(60>e)i="00:"+(10>e?"0":"")+e;else{
var a=Math.floor(e/60);
e-=60*a,i=(10>a?"0":"")+a+":"+(10>e?"0":"")+e;
}
return i;
}
function o(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return template.compile(f)({
name:t.name,
play_length:n(t.play_length),
isAudioType:!1,
hasTopic:t.hasTopic,
topicName:t.topicName
});
}
function s(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.$dom;
return 1===t.type?e.find(v.cardTag+"."+v.musicCardClass+"["+v.musicErrTypeAttr+'="1"]'):2===t.type?e.find(v.musicSaveTag+"."+v.musicCardClass+"["+v.musicErrTypeAttr+'="1"]'):e.find(v.cardTag+"."+v.musicCardClass+"["+v.musicErrTypeAttr+'="1"]').add(v.musicSaveTag+"."+v.musicCardClass+"["+v.musicErrTypeAttr+'="1"]',e);
}
function d(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=!1,i=!1;
return t.$dom.find(v.musicSaveTag).each(function(){
var t=$(this),a=t.attr(v.musicErrTypeAttr)||"";
1*a===1&&(i=!0);
var n=t.replaceTagName(v.cardTag).addClass(v.musicCardClass+" qqmusic_iframe"),o=(n.attr("music_name")||"").html(!1),s=(n.attr("singer")||"").html(!1),d=n.attr("musictype")||"",c=(n.attr("albumurl")||"").html(!1);
n.html(r({
musicName:o,
singer:s,
type:d,
albumurl:c,
errorType:a
})),_.setDisable({
dom:n[0]
}),e=!0;
}),{
hasMusicCard:e,
hasNoCopyrightMusicCard:i
};
}
function c(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=C.app_msg_info&&C.app_msg_info.item[0]&&C.app_msg_info.item[0].multi_item,i=!1;
t.$dom.find(v.audioSaveTag).each(function(){
var t=$(this).replaceTagName(v.cardTag).addClass(v.audioCardClass+" audio_iframe"),a=(t.attr("name")||"").html(!1),r=t.attr("play_length")||0,n=t.attr("data-topic_id")||"",s=0!==n.length?!0:!1,d=t.attr("data-topic_name")||"";
!!e&&e.forEach(function(e){
var i=e.audio_info&&e.audio_info.audio_infos;
!!i&&i.forEach(function(e){
var i=e.appmsg_album_info?e.appmsg_album_info.id:"";
i&&i===n&&(d=e.appmsg_album_info.title,t.attr("data-topic_name",d));
});
}),t.html(o({
name:a,
play_length:r,
hasTopic:s,
topicName:d
})),_.setDisable({
dom:t[0]
}),i=!0;
}),i&&t.editor&&_.handleEvent({
editor:t.editor
});
}
function u(t){
this.__o={
container:"",
allowAudio:!1,
allowMusic:!1
},this._g={
pasteMusic:!1,
app_id:"",
curSeq:-1,
hasBindErrCardEvent:!1,
hasNoCopyrightMusicCard:!1,
focusMusicErrData:null,
event:{},
need2CheckMusic:!1
},this.editor=null,this.__init(t||{}),t&&t.container&&($(t.container).show(),t.can_show_reddot&&$(t.container).addClass("tpl_item_reddot"));
}
t("common/wx/popup.js"),t("biz_web/ui/checkbox.js");
var m=t("3rd/editor/common/domUtils.js"),l=t("common/wx/Cgi.js"),g=t("common/wx/mpEditor/common/eventbus.js"),h=t("common/wx/Tips.js"),p=t("tpl/mpEditor/plugin/music_card.html.js").replace(/>\s*</g,"><"),f=t("tpl/mpEditor/plugin/audio_card.html.js").replace(/>\s*</g,"><"),_=t("3rd/editor/common/no_editable.js"),v={
pluginName:"insertaudio",
cardWarpClass:_.pluginParentClass,
musicCardClass:"js_editor_qqmusic",
audioCardClass:"js_editor_audio",
cardTag:"section",
musicSaveTag:"qqmusic",
audioSaveTag:"mpvoice",
musicErrTypeAttr:"data-errortype"
},C=window.wx.cgiData,E=10,y="每篇图文最多添加十条素材库音频",b=7,T=function(t,e,i){
var a=arguments.length<=3||void 0===arguments[3]?"":arguments[3],r=e.find(".js_no_album").eq(i),n=e.find(".js_album_name").eq(i),o=e.find(".js_replace_album").eq(i),s=e.find(".js_add_album").eq(i);
t?(o.show(),s.hide(),r.hide(),n.html("#"+a),n.show()):(o.hide(),s.show(),n.hide(),
n.html(""),r.show());
};
return u.beforeSetContent=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(!t.html)return"";
var e=$("<div>").html(t.html);
c({
$dom:e,
outerContainer:e[0]
}),e=i(e);
var a=d({
$dom:e,
outerContainer:e[0]
});
return a&&a.hasNoCopyrightMusicCard&&t.instance&&t.instance._g&&(t.instance._g.hasNoCopyrightMusicCard=!0),
e.html();
},u.prototype={
registerPlugin:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.app_id=t.app_id+"";
},
updateSeq:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.curSeq=1*t.seq;
},
updateAppid:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._g.app_id=t.app_id+"";
},
getName:function(){
return v.pluginName;
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
t.showDialog({
checkAudioCount:!0
});
};
},
showDialog:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=this,a=!0,r=!0;
t.allowAudio!==!1&&i.__o.allowAudio||(a=!1),t.allowMusic!==!1&&i.__o.allowMusic||(r=!1);
var n=e(i.editor),o=!1;
if(t.checkAudioCount&&a&&n>=E){
if(!r)return void h.err(y);
o=!0;
}
g.fireEvent("showAudioMusicDialog",{
allowAudio:!!a,
allowMusic:!!r,
audioDisabled:!!o,
audiotips:!!o==!0?y:"",
allowAudioNumber:E-n
},function(e){
e&&!function(){
if(t.replaceDom){
var a=i.editor.getUeditor().selection.getRange();
a.selectNode(t.replaceDom).select(!0);
}
i.__insert(e,{
replaceMusicId:t.replaceMusicId,
replaceMusicType:t.replaceMusicType
});
var r=$(i.editor.ueditor.body),n=r.find(".js_editor_audio"),o=r.find(".js_audio_action"),s=n[0];
if(s){
var d=s.getBoundingClientRect().y;
50>d&&(s.style.marginTop="50px"),$(document.body).click(function(){
o.hide();
});
}
}();
});
},
getContainer:function(){
return this.__o.container;
},
addListener:function(t){
var a=this;
t.addListener("ready",function(){
var e=$(a.editor.getUeditor().body);
e.click(function(i){
t.fireEvent("clickAudioCard",i,$(i.target),e);
});
}),t.addListener("beforeWaitAsynAction",function(){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
a._g.need2CheckMusic=!1;
for(var i={
list:[]
},r=1*e.postData.count,n=0;r>n;n++)i.list.push({
title:e.postData["title"+n]||"未设置标题",
content:e.postData["content"+n]||""
});
i.list.length>0&&t.delegateDomAsyn({
dom:null,
timeout:1e4,
requsetFun:function(){
var t=this;
l.post({
url:"/cgi-bin/masssend?action=check_music",
data:{
item_list:JSON.stringify(i)
}
},{
done:function(e){
var i=e&&e.base_resp?e.base_resp.ret:-1;
(0!=i||e.list&&0!==e.list.length)&&0==i&&e.list&&e.list.length>0?t.requsetSucFun(e.list):t.requsetFailFun();
},
fail:function(){
t.requsetFailFun();
}
});
},
requsetSucFun:function(i,r){
a._g.need2CheckMusic=!0,t.fireEvent("musicCheckResultFocus",{
errorData:r
}),e.hasShowTips||(e.hasShowTips=!0,g.fireEvent("showMusicCheckDialog",{
musicdata:r,
focustype:"callback"
},function(e){
e&&t.fireEvent("musicCheckResultFocus",{
errorData:e.errorData,
focusData:e.focusData
});
}));
},
requsetFailFun:function(){}
});
}),t.addListener("beforepaste",function(t,r){
a._g.pasteMusic=!1;
var n=$("<div></div>").html(r.html),o=n.find(v.cardTag+"."+v.audioCardClass).length;
return e(a.editor)+o>E?(h.err(y),r.html="",!0):(n=i(n),s({
$dom:n,
type:3
}).remove(),a.changeCardToAudioTag({
$dom:n
}),a.changeCardToMusicTag({
$dom:n
}),n.find(v.audioSaveTag).length>0&&(c({
$dom:n,
outerContainer:n[0]
}),a._g.pasteMusic=!0),n.find(v.musicSaveTag).length>0&&(d({
$dom:n,
outerContainer:n[0]
}),a._g.pasteMusic=!0),void(r.html=n.html()));
}),t.addListener("afterpaste",function(){
a._g.pasteMusic&&_.handleEvent({
editor:a.editor
});
}),t.addListener("musicCheckResultFocus",function(){
var t=this,e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=e.errorData,r=e.focusData;
this.fireEvent("saveScene");
for(var n=r,o={},s=!1,d=0,c=i.length;c>d;d++){
var u=i[d];
o[u.appmsg_idx]||(o[u.appmsg_idx]={}),o[u.appmsg_idx][u.song_mid]=u,1*u.appmsg_idx!==1*a._g.curSeq&&(s=!0);
}
var m=null,l=null;
s&&!function(){
l={},m=t.fireEvent("getArticleDomList");
var e=0;
m.each(function(){
var t=$(this).data("article");
t&&t.data&&(l[e]=t),e++;
});
}();
var g=null;
for(var d in o)if(Object.prototype.hasOwnProperty.call(o,d)){
var u=o[d];
if(1*d===1*a._g.curSeq){
var h=null;
n&&1*n.appmsg_idx===1*a._g.curSeq&&(h=n);
var p=a.setMusicError({
tagName:v.cardTag,
$dom:$(this.body),
data:u,
focusData:h
});
h&&p&&p.$focusDom&&p.$focusDom.length>0&&(g=p.$focusDom);
}else if(l&&l[d]){
var f=$("<div></div>").html(l[d].data.get("content"));
a.setMusicError({
tagName:v.musicSaveTag,
$dom:f,
data:u
}),l[d].data.set("content",f.html());
}
}
n&&(g?(this.fireEvent("scrollIntoView",g),a._g.focusMusicErrData=null):(a._g.focusMusicErrData=n,
a.bindArticleChangeEvent(),this.fireEvent("selectArticle",{
idx:n.appmsg_idx,
doNotHideErr:!0,
doNotScroll:!0,
isNewCreate:!1,
markInited:!1
}))),a.bindErrCardEvent(),this.fireEvent("saveScene");
}),t.addListener("clickAudioCard",function(t,e,i,a){
var r=a.find(".js_editor_audio"),n=a.find(".js_audio_action"),o=-1,s=void 0;
if(Array.from(r).some(function(t,e){
return t.contains(i[0])||t.isEqualNode(i[0])?(o=e,s=r.eq(o),!0):void 0;
}),Array.from(n).forEach(function(t,e){
e!==o&&$(t).hide();
}),-1!==o){
s.find(".js_audio_action").toggle();
var d=i.hasClass("js_add_album")||i.parent().hasClass("js_add_album"),c=i.hasClass("js_replace_album")||i.parent().hasClass("js_replace_album"),u=s.attr("data-topic_id")?s.attr("data-topic_id"):"",m=s.attr("data-topic_name")?s.attr("data-topic_name"):"",l={
id:u,
title:m
};
(d||c)&&g.fireEvent("showArticleTagsDialog",{
tagType:b,
tags:u.length?[l]:[],
allowDeleteAll:!0
},function(t){
t.cancel||!function(){
var e={
id:t.tags.length?t.tags[0].id:"",
title:t.tags.length?t.tags[0].title:""
};
Array.from(r).forEach(function(i,r){
var n=s.attr("voice_encode_fileid"),o=$(i).attr("voice_encode_fileid");
o===n&&(i.dataset.topic_id=e.id,i.dataset.topic_name=e.title,t.tags.length?T(!0,a,r,e.title):T(!1,a,r));
});
}();
});
}
});
},
beforeSetContent:function(t){
var e=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];
return this._g.curSeq=1*e.seq,this._g.hasNoCopyrightMusicCard=!1,u.beforeSetContent({
html:t,
instance:this
});
},
afterSetContent:function(){
this._g.hasNoCopyrightMusicCard?this.bindErrCardEvent():this.removeErrCardEvent();
var t=$(this.editor.ueditor.body),e=t.find(".js_editor_audio"),i=t.find(".js_audio_action"),a=e[0];
if(a){
var r=a.getBoundingClientRect().y;
50>r&&(a.style.marginTop="50px"),$(document.body).click(function(){
i.hide();
});
}
},
initPluginData:function(){
return["music_id"];
},
getPluginData:function(t){
var e=t.init(this.initPluginData()),a=e.get("content");
if(a){
var r=$("<div></div>").html(a);
r=i(r),this.changeCardToAudioTag({
$dom:r
});
var n=this.changeCardToMusicTag({
$dom:r
}),o=[],s=",";
return n.each(function(){
var t=this.getAttribute("musicid")||"";
t&&-1===s.indexOf(","+t+",")&&(o.push(t),s+=t+",");
}),e.set("content",r.html()),e.set("music_id",o.join(",")),e;
}
},
changeCardToMusicTag:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return t.$dom.find(v.cardTag+"."+v.musicCardClass).replaceTagName(v.musicSaveTag).html("");
},
changeCardToAudioTag:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
return t.$dom.find(v.cardTag+"."+v.audioCardClass).replaceTagName(v.audioSaveTag).html("");
},
bindArticleChangeEvent:function(){
this.removeArticleChangeEvent(),this.editor.addListener("afterArticleSelect",this._g.event.afterArticleSelectEvent);
},
removeArticleChangeEvent:function(){
this.editor.removeListener("afterArticleSelect",this._g.event.afterArticleSelectEvent);
},
bindErrCardEvent:function(){
this._g.hasBindErrCardEvent||(this._g.hasBindErrCardEvent=!0,this.editor.addListener("afterscencerestore cleardoc",this._g.event.handleErrCardEvent),
this.editor.addListener("noEditableClick",this._g.event.noEditableClick),this.editor.addListener("noeditableDel",this._g.event.noeditableDel));
},
removeErrCardEvent:function(){
this._g.hasBindErrCardEvent&&(this._g.hasBindErrCardEvent=!1,this.editor.removeListener("cleardoc",this._g.event.handleErrCardEvent),
this.editor.removeListener("noEditableClick",this._g.event.noEditableClick),this.editor.removeListener("noeditableDel",this._g.event.noeditableDel));
},
handleErrCard:function(){
var t=s({
$dom:$(this.editor.getUeditor().body),
type:1
});
t.length>0?this.bindErrCardEvent():this.removeErrCardEvent();
},
setMusicError:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e={
$focusDom:null
};
return t.$dom.find(t.tagName+"."+v.musicCardClass).each(function(){
var i=$(this),a=(i.attr("mid")||"").html(!1),r=1*(i.attr("musictype")||"");
t.focusData&&t.focusData.song_mid===a&&1*t.focusData.song_type===r&&(e.$focusDom=i),
t.data[a]&&1*t.data[a].song_type===r&&(_.setNoSelect({
dom:this
}),i.attr(v.musicErrTypeAttr,"1").find(".js_mask").show());
}),e;
},
check:function(t){
return t.find(v.audioSaveTag).length>E?{
msg:"单篇文章最多只能添加三条素材库音频"
}:this._g.need2CheckMusic&&s({
$dom:t,
type:2
}).length>0?(this._g.need2CheckMusic=!1,{
msg:"",
noTips:!0
}):!0;
},
__init:function(t){
var e=this.__o;
for(var i in t)Object.prototype.hasOwnProperty.call(e,i)&&(e[i]=t[i]);
this.defineEvent();
},
defineEvent:function(){
var t=this;
this._g.event={
handleErrCardEvent:function(){
t.handleErrCard();
},
noEditableClick:function(){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
if(e.unEditableDom){
var i=$(e.unEditableDom);
i.hasClass(v.musicCardClass)&&1*i.attr(v.musicErrTypeAttr)===1&&t.showDialog({
allowAudio:!1,
replaceDom:e.unEditableDom
});
}
},
noeditableDel:function(){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=$(e.target);
i.hasClass(v.musicCardClass)&&1*i.attr(v.musicErrTypeAttr)===1&&t.handleErrCard();
},
afterArticleSelectEvent:function(e,i){
var a=t._g.focusMusicErrData;
if(a){
if(a&&1*a.appmsg_idx===1*i){
var r=null;
$(this.body).find(v.cardTag+"."+v.musicCardClass).each(function(){
var t=$(this),e=(t.attr("mid")||"").html(!1),i=1*(t.attr("musictype")||"");
return e===a.song_mid&&i===1*a.song_type?(r=t,!1):void 0;
}),r&&this.fireEvent("scrollIntoView",r),t._g.focusMusicErrData=null,t.removeArticleChangeEvent();
}
}else t.removeArticleChangeEvent();
}
};
},
getAudioHtml:function(t){
console.log("data",t),t.uri_encoded_name=encodeURIComponent(t.name),t.uri_encoded_title=encodeURIComponent(t.title),
t.title_encode=t.title.html(!0),t.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={uri_encoded_title}&play_length={duration}".format(t);
var e="<"+v.cardTag+"><"+v.cardTag+' class="'+v.audioCardClass+' audio_iframe res_iframe" src="{src}" isaac2={is_aac} low_size="{low_size}" source_size="{source_size}" high_size="{high_size}" name="{title_encode}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}" data-topic_id="'+t.topicId+'" data-topic_name="'+t.topicName+'" '+m.pluginAttr+'="'+this.getName()+'">'+o({
name:t.title,
play_length:t.play_length,
hasTopic:t.hasTopic,
topicName:t.topicName
})+"</"+v.cardTag+"></"+v.cardTag+">";
e=e.format(t);
var i=$("<div></div>").html(e);
return _.setDisable({
dom:i[0].firstChild.firstChild
}),i.html();
},
execInsertCommand:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
_.insertHtml({
html:t.html,
editor:this.editor
});
},
__insertAudio:function(t){
if(t&&t.length){
var e=this.editor.ueditor.body,i=$(e).find(".js_editor_audio");
t.forEach(function(t){
t.hasTopic=!1,t.topicId="",t.topicName="",i.length&&Array.from(i).forEach(function(e){
var i=$(e).attr("voice_encode_fileid"),a=$(e).attr("data-topic_id"),r=$(e).attr("data-topic_name");
i===t.voice_encode_fileid&&a.length&&(t.hasTopic=!0,t.topicId=a,t.topicName=r);
});
});
for(var a="",r=0,n=0;n<t.length;n++)t[n]&&(a+=this.getAudioHtml(t[n]),r++);
this.execInsertCommand({
html:a
}),this.editor.funcPvUvReport("insertaudio",r);
}
},
getMusicHtml:function(t){
var e=t.musicid,i=t.mid,a=t.url,n=t.songname,o=t.albumurl,s=t.singername,d=t.play_length,c=(t.commentid||"",
"/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(s)+"&music_name="+encodeURIComponent(n)+"&albumurl="+encodeURIComponent(o)+"&musictype="+encodeURIComponent(t.musictype)),u=["<"+v.cardTag+"><"+v.cardTag+' class="'+v.musicCardClass+' qqmusic_iframe res_iframe"',' musicid="'+e.html(!0)+'"',' mid="'+i.html(!0)+'"',' albumurl="'+o.html(!0)+'"',' audiourl="'+a.html(!0)+'"',' music_name="'+n.html(!0)+'"',' singer="'+s.html(!0)+'"',' play_length="'+d+'"',' src="'+c+'"',' musictype="'+t.musictype+'"',' otherid="'+t.otherid+'"',' albumid="'+t.albumid+'"',' jumpurlkey="'+t.jumpurlkey+'"'," "+m.pluginAttr+'="'+this.getName()+'"',">",r({
musicName:n,
singer:s,
type:t.musictype,
albumurl:o
}),"</"+v.cardTag+"></"+v.cardTag+">"].join(""),l=$("<div></div>").html(u);
return _.setDisable({
dom:l[0].firstChild.firstChild
}),l.html();
},
__insertMusic:function(t){
arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
if(t&&t.length){
for(var e="",i=0,a=0;a<t.length;a++)t[a]&&(e+=this.getMusicHtml(t[a]),i++);
this.execInsertCommand({
html:e
}),this.editor.funcPvUvReport("insertmusic",i);
}
},
__insert:function(t){
var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
"audio"===t[0].type?this.__insertAudio(t):this.__insertMusic(t,{
replaceMusicId:e.replaceMusicId,
replaceMusicType:e.replaceMusicType
});
}
},u;
});define("common/wx/mpEditor/plugin/unlink.js",[],function(){
"use strict";
function t(){
this.editor=null,this.__g={
name:"unlink",
title:"取消超链接"
};
}
return t.beforeSetContent=function(t){
return t.html;
},t.prototype={
getName:function(){
return this.__g.name;
},
getExecCommand:function(){
var t=this;
return function(e,n){
if(t.editor){
var i,r=t.editor,o=r.getSelectionRange(),a=r.getDomUtils(),u=a.findParentByTagName(o.startContainer,"a",!0);
if(!o.collapsed||u){
var m;
u&&(m=u.getElementsByTagName("img")[0]),i=o.createBookmark(),this.fireEvent("link_optimize",o),
o.removeInlineStyle("a",{
ignoreUnEditable:!0
}),m&&this.fireEvent("handlerH5LinkImg",m),"popup"===n&&this.fireEvent("reportAddNum","122333","81","1"),
o.moveToBookmark(i).select();
}
}
};
},
beforeSetContent:function(e){
return t.beforeSetContent({
html:e
});
},
getType:function(){
return 1;
},
getTitle:function(){
return this.__g.title;
},
getQueryCommandState:function(){
var t=this;
return function(){
var e=t.editor;
return e&&!e.isHighlight()&&e.queryCommandValue("link")?0:-1;
};
},
getContextMenu:function(){
var t=this.__g,e={
label:t.title,
cmdName:t.name
};
return e;
}
},t;
});define("common/wx/mpEditor/plugin/link.js",["common/wx/popup.js","biz_web/ui/checkbox.js","biz_common/jquery.validate.js","common/wx/mpEditor/common/eventbus.js","common/wx/Cgi.js","tpl/mpEditor/plugin/link_dialog.html.js","tpl/mpEditor/plugin/link_appmsg.html.js","tpl/mpEditor/plugin/link_acc_item.html.js","tpl/mpEditor/plugin/link_popup.html.js","biz_common/moment.js","common/wx/Tips.js","common/wx/ban.js","common/wx/pagebar.js"],function(e){
"use strict";
function t(e){
this.editor=null,e&&e.container&&(this.container=$(e.container).show()),this.info=e.info,
this.__g={
dom:{},
form:{},
canWriteBack:!1,
articlePerPage:5,
accPerPage:5,
can_use_hyperlink:e.can_use_hyperlink,
can_use_appmsg_outer_url:e.can_use_appmsg_outer_url,
can_use_new_search:window.wx&&window.wx.cgiData?window.wx.cgiData.can_use_new_search||0:0,
articleData:{},
showPageMap:[]
},a.addMethod("inner_link",function(e){
return/http(s)?:\/\/mp\.weixin\.qq\.com\/(s\?|s\/|mp\/appmsg\/show\?)/.test(e)?!0:/http(s)?:\/\/mp\.weixin\.qq\.com\/mp\/qa\?/.test(e)?!0:!1;
},"请输入公众号文章链接"),a.addMethod("temp_link",function(e){
return/^https?\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/.test(e)?!1:!0;
},"不能输入公众号文章的预览链接");
}
e("common/wx/popup.js"),e("biz_web/ui/checkbox.js");
var a=e("biz_common/jquery.validate.js"),i=e("common/wx/mpEditor/common/eventbus.js"),n=e("common/wx/Cgi.js"),r=e("tpl/mpEditor/plugin/link_dialog.html.js"),c=e("tpl/mpEditor/plugin/link_appmsg.html.js"),s=e("tpl/mpEditor/plugin/link_acc_item.html.js"),o=e("tpl/mpEditor/plugin/link_popup.html.js"),l=e("biz_common/moment.js"),_=e("common/wx/Tips.js"),d=e("common/wx/ban.js"),p=e("common/wx/pagebar.js"),g={
service_type:{
0:"订阅号",
1:"订阅号",
2:"服务号",
"-1":"服务号"
},
noKey:"__mpnokey"
},h=["video_iframe","qqmusic_iframe","audio_iframe","vote_iframe","wx-edui-question_iframe_js","card_iframe","cpc_iframe","weapp_app_iframe","js_weapp_entry","js_editor_product","js_editor_cps","js_poi_entry"].join("|"),u=new RegExp('class="[^"]*('+h+')[^"]*"');
return t.beforeSetContent=function(e){
return e.html;
},t.prototype={
getName:function(){
return"link";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(t,a){
e.editor&&(e.__openDialog(),"popup"===a&&this.fireEvent("reportAddNum","122333","82","1"));
};
},
addListener:function(e){
var t=this;
e.addListener("link_click_popupurl",function(){
this.fireEvent("reportAddNum","122333","80","1");
}),e.addListener("insert_link",function(e,a){
t.__insertLink(a);
}),e.addListener("link_optimize",function(e,a){
t.__optimize(a);
}),e.addListener("handle_common_popup",function(a,i){
var n=i.data.length>0?i.data[i.data.length-1].node:null,r=e.queryCommandValue("link",n||null),c=r?r.getAttribute("_href")||r.getAttribute("href"):"";
if(r&&c&&0!==c.indexOf("javascript")){
for(var s=void 0,l=0;l<i.data.length;l++){
var _=i.data[l];
"blockquote"===_.cmd?(i.data.splice(l,1),i.size=void 0,i.pos=void 0,l--):"checktext"===_.cmd&&(s=_.renderData,
i.data.splice(l,1),l--);
}
var d=c,p={
needBreak:i.data.length>0?!0:!1,
url:c,
txt:d
},g=void 0;
s?(g=s,g.url=p.url,g.txt=p.txt,g.needBreak=p.needBreak):g=p,i.data.push({
html:wx.T(o,g),
renderData:g,
renderTpl:o,
cmd:t.getName(),
node:r
}),this.fireEvent("reportAddNum","122333","79","1");
}
}),e.addListener("keydown",function(t,a){
var i=a.keyCode||a.which;
if(13==i){
var n=this.selection.getRange();
if(n.collapsed){
var r=e.getDomUtils(),c=r.findParentByTagName(n.startContainer,"A");
c&&(n.selectNode(c).collapse().select(),setTimeout(function(){
var e=r.findNextSibling(c,function(e){
return r.isFillChar(e);
});
e&&e.parentNode&&e.parentNode.removeChild(e);
},0));
}
}else if(46==i||8==i){
var r=e.getDomUtils(),n=this.selection.getRange(),c=r.findParentByTagName(n.startContainer,"A",!0);
if(c){
var s=c.innerHTML.text().replace(r.fillCharReg,"");
!s&&(0==c.childElementCount||1==c.childElementCount&&c.firstElementChild.className.indexOf("js_jump_icon")>=0&&0==c.firstElementChild.childElementCount)&&(n.selectNode(c).collapse().select(),
r.remove(c));
}
}
});
},
beforeSetContent:function(e){
return t.beforeSetContent({
html:e
});
},
getPluginData:function(e){
var t=e.init(),a=t.get("content"),i=$("<div>");
i.html(a).find("a").each(function(){
var e=this.getAttribute("href");
if(/^http(s)?:\/\//i.test(e)){
var t=$(this).find("img");
t&&t.length>0?this.setAttribute("data-linktype","1"):this.setAttribute("data-linktype","2");
}else this.removeAttribute("data-linktype");
}),t.set("content",i.html());
},
getType:function(){
return 0;
},
getTitle:function(){
return"超链接";
},
getContainer:function(){
return this.container;
},
getQueryCommandState:function(){
var e=this;
return function(t,a){
var i=void 0,n=e.editor;
if(!n)return 0;
var r=n.getSelectionRange().getClosedNode(),c=r&&"edui-faked-video"==r.className;
if(a&&a.allDomInRange&&a.allDomInRange.length)for(var s=0;s<a.allDomInRange.length;s++){
var o=a.allDomInRange[s],l=n.getDomUtils();
if(u.test(o.outerHTML)||l.isUneditablePluginNode({
node:o
})||o.parentNode&&o.parentNode.className&&o.parentNode.className.indexOf&&(o.parentNode.className.indexOf("js_weapp_entry")>-1||o.parentNode.className.indexOf("js_poi_entry")>-1||o.parentNode.className.indexOf("qqmusic_iframe")>-1||o.parentNode.className.indexOf("audio_iframe")>-1)){
i=!0;
break;
}
}
return i||c?-1:0;
};
},
getQueryCommandValue:function(){
var e=this;
return function(t,a){
var i=e.editor;
if(i){
var n,r,c=i.getDomUtils();
if(a||(n=i.getSelectionRange()),n&&n.collapsed){
if(r=n.startContainer,r=1==r.nodeType?r:r.parentNode,r&&(r=c.findParentByTagName(r,"a",!0))&&!c.isInNodeEndBoundary(n,r)&&r.href&&0!==r.href.indexOf("javascript:"))return r;
}else{
if(n){
n.shrinkBoundary();
var s=3!=n.startContainer.nodeType&&n.startContainer.childNodes[n.startOffset]?n.startContainer.childNodes[n.startOffset]:n.startContainer,o=3==n.endContainer.nodeType||0==n.endOffset?n.endContainer:n.endContainer.childNodes[n.endOffset-1],l=n.getCommonAncestor();
if(r=c.findParentByTagName(l,"a",!0),!r&&1==l.nodeType)for(var _,d,p,g=l.getElementsByTagName("a"),h=0;p=g[h++];)if((!p||!p.href||0!==p.href.indexOf("javascript:"))&&(_=c.getPosition(p,s),
d=c.getPosition(p,o),(_&c.POSITION_FOLLOWING||_&c.POSITION_CONTAINS)&&(d&c.POSITION_PRECEDING||d&c.POSITION_CONTAINS))){
r=p;
break;
}
return r&&r.href&&0===r.href.indexOf("javascript:")&&(r=null),r;
}
if(a){
if(r=c.findParentByTagName(a,"a",!0),!r&&1==a.nodeType){
var g=a.getElementsByTagName("a");
if(g&&g[0]&&g[0].href&&0!==g[0].href.indexOf("javascript:"))return g[0];
}
return r&&r.href&&0===r.href.indexOf("javascript:")&&(r=null),r;
}
}
}
};
},
__openDialog:function(){
var e=this,t=this.editor,a=t.getDomUtils(),n=t.getSelectionRange(),r=n.collapsed?t.queryCommandValue("link"):t.getSelectionStart(),c="";
if(r){
a.findParentByTagName(r,"a",!0)&&(r=a.findParentByTagName(r,"a",!0));
var s=!0,o=n.getRangeDom();
if(o&&o.length)for(var l=0;l<o.length;l++)if("IMG"===o[l].tagName){
s=!1;
break;
}
var _=s?n.getRangeText():"";
c=r.text||_||"你已选中了添加链接的内容";
}
i.fireEvent("showLinkDialog",{
linkinfo:{
title:c,
type:r?r.getAttribute("tab"):""
},
linkUrl:r?r.href:"",
type:["innerlink",this.__g.can_use_hyperlink&&0!=this.__g.can_use_appmsg_outer_url?"outerlink":void 0]
},function(t){
"undefined"!=typeof t&&e.__insertLink(t);
});
},
__DialogEvent:function(){
{
var e=this,t=this.__g,a=t.dom,i=t._linkDialog;
t._perPage;
}
a.$innerMain.find("input[name=link_type][type=radio]").checkbox({
onChanged:function(e){
var t=e.val();
a.$innerMain.find(".js_link_type").hide(),a.$innerMain.find(".js_link_type_"+t).show(),
i.popup("resetPosition");
}
});
var n="请输入公众号文章链接，且必须以http://或https://开头";
t.form=a.$dialogDom.find("#myform").validate({
rules:{
innerLink:{
required:function(){
return a.$innerTabItem.hasClass("selected")&&a.$innerMain.find("input[name=link_type][type=radio][value=1]").prop("checked")?!0:!1;
},
url:!0,
inner_link:!0,
temp_link:!0
},
outerLink:{
required:function(){
return a.$outerTabItem.hasClass("selected")?!0:!1;
},
url:!0
},
outerTitle:{
required:function(){
return a.$outerTabItem.hasClass("selected")?!0:!1;
}
},
innerTitle:{
required:function(){
return a.$innerTabItem.hasClass("selected")?!0:!1;
}
}
},
messages:{
innerLink:{
required:"链接地址不能为空，且必须以http://或https://开头",
url:n,
inner_link:n,
temp_link:"不能输入公众号文章的预览链接"
},
outerLink:{
required:"链接地址不能为空，且必须以http://或https://开头",
url:"请输入有效的链接(必须以http://或https://开头)"
},
outerTitle:{
required:"请输入链接标题"
},
innerTitle:{
required:"请输入链接标题"
}
}
}),a.$tabMain.on("click",".js_tab_item",function(){
var e=$(this),i=e.data("tab");
"inner"==i?(a.$innerTabItem.addClass("selected"),a.$outerTabItem.removeClass("selected"),
a.$innerMain.show(),a.$outerMain.hide(),t._linkDialog.popup("resetPosition")):(a.$innerTabItem.removeClass("selected"),
a.$outerTabItem.addClass("selected"),a.$innerMain.hide(),a.$outerMain.show(),t._linkDialog.popup("resetPosition"));
}),a.$jsSelfAcc.click(function(){
e.__selectAcc({
nickname:wx.data.nick_name||wx.data.user_name||"",
fakeid:""
});
}),a.$dialogDom.find(".js_reset_acc").click(function(){
e.__resetAcc();
}),a.$accSearchDel.click(function(){
$(this).hide(),e.__resetAcc();
}),a.$accSearchInput.keyup(function(t){
a.$accSearchInput.val().trim()?a.$accSearchDel.show():(a.$accSearchDel.hide(),e.__resetAcc());
var i=t.keyCode||t.which||0;
13==i&&a.$accSearchBtn.trigger("click");
}),a.$accSearchBtn.click(function(){
var t=a.$accSearchInput.val().trim();
t&&e.__searchAcc(t);
}),a.$articleSearchDel.click(function(){
$(this).hide(),e.__resetArticle();
}),a.$articleSearchInput.keyup(function(t){
a.$articleSearchInput.val().trim()?a.$articleSearchDel.show():(a.$articleSearchDel.hide(),
e.__resetArticle());
var i=t.keyCode||t.which||0;
13==i&&a.$articleSearchBtn.trigger("click");
}),a.$articleSearchBtn.click(function(){
var t=a.$articleSearchInput.val().trim()||"";
e.__searchArticle(t);
}),a.$accList.on("click",".js_acc_item",function(){
var t=$(this),a=t.data("fakeid"),i=t.data("nickname");
e.__selectAcc({
fakeid:a,
nickname:i
});
});
},
__searchAcc:function(e){
var t=this.__g.dom;
t.$accSearchTips.hide(),t.$jsSelfAcc.parent().hide(),this.__getAccList({
searchKey:e,
page:0
});
},
__searchArticle:function(e){
this.__getArticleList({
searchKey:e,
page:0,
type:"next"
});
},
__checkAccLoading:function(e){
return this.__g["getting_"+e+"_data"];
},
__showLoading:function(e){
var t=this.__g,a=t.dom;
t["getting_"+e+"_data"]=!0,a["$"+e+"Content"].show(),a["$"+e+"Loading"].show(),a["$"+e+"List"].hide(),
a["$"+e+"Pagebar"].hide();
},
__hideLoading:function(e){
var t=this.__g,a=t.dom;
t["getting_"+e+"_data"]=!1,a["$"+e+"Loading"].hide();
},
__getNewArticleList:function(e){
var t=this;
if(this.__checkAccLoading("article")!==!0){
this.__showLoading("article"),e.searchKey=e.searchKey||"";
var a=this.__g.currentFakeid||g.noKey,i=encodeURIComponent(e.searchKey||g.noKey),r=null;
if(this.__g.articleData[a]&&this.__g.articleData[a][i]&&this.__g.articleData[a][i][e.page]){
var c=this.__g.articleData[a][i][e.page];
r=c.resp;
}
var s=function(n){
if(t.__g._linkDialog)if(t.__hideLoading("article"),n&&n.base_resp&&0==n.base_resp.ret){
t.__g.articleData[a]||(t.__g.articleData[a]={}),t.__g.articleData[a][i]||(t.__g.articleData[a][i]={});
var r=!0;
t.__g.articleData[a][i][e.page]||(t.__g.articleData[a][i][e.page]={
resp:n,
showPage:null
},r=!1),n.app_msg_list&&0!==n.app_msg_list.length||!("next"===e.type&&n.app_msg_cnt>(e.page+1)*t.__g.articlePerPage||"pre"===e.type&&e.page-1>=0)?(r||(t.__g.showPageMap.push({
requestPage:e.page
}),t.__g.articleData[a][i][e.page].showPage=t.__g.showPageMap.length-1),t.__renderArticleList({
code:0,
list:n.app_msg_list||[],
total:1*n.app_msg_cnt,
page:e.page,
searchKey:e.searchKey
})):t.__getNewArticleList({
searchKey:e.searchKey,
page:"next"===e.type?e.page+1:e.page-1,
type:e.type
});
}else{
var c="";
n&&n.base_resp&&200013==n.base_resp.ret&&(c="操作太频繁，请稍后再试"),t.__renderArticleList({
code:-1,
msg:c,
searchKey:e.searchKey
});
}
},o=function(){
t.__g._linkDialog&&(t.__hideLoading("article"),t.__renderArticleList({
code:-1,
searchKey:e.searchKey
}));
};
return r?void s(r):void n.get({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:e.page*this.__g.articlePerPage,
count:this.__g.articlePerPage,
query:e.searchKey,
fakeid:this.__g.currentFakeid||"",
type:9
},
mask:!1
},{
done:s,
fail:o
});
}
},
__getArticleList:function(e){
if(this.__g.can_use_new_search&&e.searchKey)return void this.__getNewArticleList(e);
var t=this,a=this.__g;
t.__checkAccLoading("article")!==!0&&(t.__showLoading("article"),e.searchKey=e.searchKey||"",
n.get({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:e.page*a.articlePerPage,
count:a.articlePerPage,
query:e.searchKey,
fakeid:a.currentFakeid||"",
type:9
},
mask:!1
},{
done:function(i){
if(a._linkDialog)if(t.__hideLoading("article"),i&&i.base_resp&&0==i.base_resp.ret)t.__renderArticleList({
code:0,
list:i.app_msg_list||[],
total:1*i.app_msg_cnt,
page:e.page,
searchKey:e.searchKey
});else{
var n="";
i&&i.base_resp&&200013==i.base_resp.ret&&(n="操作太频繁，请稍后再试"),t.__renderArticleList({
code:-1,
msg:n,
searchKey:e.searchKey
});
}
},
fail:function(){
a._linkDialog&&(t.__hideLoading("article"),t.__renderArticleList({
code:-1,
searchKey:e.searchKey
}));
}
}));
},
__getAccList:function(e){
var t=this,a=this.__g;
e.searchKey&&t.__checkAccLoading("acc")!==!0&&(t.__showLoading("acc"),n.get({
url:"/cgi-bin/searchbiz?action=search_biz",
data:{
query:e.searchKey,
begin:e.page*a.accPerPage,
count:a.accPerPage
},
mask:!1
},{
done:function(i){
if(a._linkDialog)if(t.__hideLoading("acc"),i&&i.base_resp&&0==i.base_resp.ret)t.__renderAccList({
code:0,
list:i.list||[],
total:1*i.total,
page:e.page,
searchKey:e.searchKey
});else{
var n="";
i&&i.base_resp&&200013==i.base_resp.ret&&(n="操作太频繁，请稍后再试"),t.__renderAccList({
code:-1,
msg:n,
searchKey:e.searchKey
});
}
},
fail:function(){
a._linkDialog&&(t.__hideLoading("acc"),t.__renderAccList({
code:-1,
searchKey:e.searchKey
}));
}
}));
},
__renderArticleList:function(e){
var t=this.__g,a=t.dom;
t._linkDialog&&(0==e.code||e.msg?0!=e.code||e.list&&0!=e.list.length||e.msg||(e.msg="暂无搜索结果"):e.msg="系统繁忙，请稍后再试",
t.curArticleList=JSON.parse(JSON.stringify(e.list||[])),t.selectedArticle=void 0,
t.curArticleList.each(function(e){
e.update_time_str=l.unix(e.create_time||e.update_time).format("YYYY-MM-DD"),e.link=$.trim(e.link.replace("#rd","&scene=21#wechat_redirect")),
e.title=$.trim(e.title||"无标题"),e.titleNoEncode=e.title.replace(/<em>/g,"").replace(/<\/em>/g,""),
e.title=e.title.replace(/<em>/g,"__em_start__").replace(/<\/em>/g,"__em_end__"),
e.title=e.title.html(!0).replace(/__em_start__/g,"<em>").replace(/__em_end__/g,"</em>");
}),a.$articleList.html(template.compile(c)({
list:t.curArticleList,
service_type:g.service_type,
msg:e.msg
})).show(),a.$articleLoading.hide(),t.curArticleList.length>0&&a.$articleList.on("click",".js_article_i",function(){
var e=$(this);
a.$articleList.find(".js_article_label.selected").removeClass("selected").find("input[type=radio]").attr("checked",!1).prop("checked",!1),
e.parents(".js_article_label").addClass("selected").find("input[type=radio]").attr("checked",!0).prop("checked",!0),
t.selectedArticle=e.data("index");
}),0==e.code&&e.total>0&&"undefined"!=typeof e.page?this.__initPageBar({
type:"article",
curPage:e.page+1,
total:e.total,
searchKey:e.searchKey
}):a.$accPagebar.hide(),t._linkDialog.popup("resetPosition"));
},
__renderAccList:function(e){
var t=this.__g,a=t.dom;
t._linkDialog&&(0==e.code||e.msg?0!=e.code||e.list&&0!=e.list.length||e.msg||(e.msg="不存在该公众号"):e.msg="系统繁忙，请稍后再试",
e.msg?(a.$accSearchTips.show().find("span").text(e.msg),a.$accContent.hide()):(a.$accSearchTips.hide(),
a.$accContent.show(),a.$accList.html(template.compile(s)({
list:e.list,
service_type:g.service_type
})).show()),a.$accLoading.hide(),0==e.code&&e.total>0&&"undefined"!=typeof e.page?this.__initPageBar({
type:"acc",
curPage:e.page+1,
total:e.total,
searchKey:e.searchKey
}):a.$accPagebar.hide(),t._linkDialog.popup("resetPosition"));
},
__initPageBar:function(e){
var t=this,a=this.__g,i=a.dom,n=e.type+"_pagebar";
a[n]&&a[n].destroy();
var r=!0,c=!0;
this.__g.can_use_new_search&&"article"===e.type&&e.searchKey&&(r=!1,c=!1),a[n]=new p({
container:i["$"+e.type+"Pagebar"],
perPage:a[e.type+"PerPage"],
initShowPage:e.curPage,
totalItemsNum:Math.min(e.total,2e3),
first:!1,
last:!1,
isSimple:!0,
jumpPage:r,
showEndPage:c,
callback:function(i){
var n=e.type.substr(0,1).toUpperCase()+e.type.substr(1),c=1*i.currentPage-1;
r||(a.showPageMap[c]?c=a.showPageMap[c].requestPage:a.showPageMap[1*i.currentPage-2]&&(c=a.showPageMap[1*i.currentPage-2].requestPage+1)),
t["__get"+n+"List"]({
searchKey:e.searchKey,
page:c,
type:i.currentPage>e.curPage?"next":"pre"
});
}
});
},
__resetArticle:function(){
var e=this.__g.dom;
e.$articleSearchInput.val("");
},
__resetAcc:function(){
var e=this.__g,t=e.dom;
e.currentFakeid="",e.curArticleList=[],e.selectedArticle=void 0,t.$accText.html(""),
t.$accDesc.hide(),t.$accSearchInput.val(""),t.$accSearchTips.hide().find("span").text(""),
t.$accSearchMain.show().parents(".frm_control_group").removeClass("show_value"),
t.$jsSelfAcc.parent().show(),t.$accContent.hide(),t.$articleContent.hide(),e._linkDialog.popup("resetPosition");
},
__selectAcc:function(e){
this.__g.currentFakeid=e.fakeid||"";
var t=this.__g.dom;
t.$accSearchMain.hide().parents(".frm_control_group").addClass("show_value"),t.$jsSelfAcc.parent().hide(),
t.$accContent.hide(),t.$accText.html((e.nickname||"").html(!0)),t.$accDesc.show(),
t.$articleContent.show(),t.$articleList.hide(),t.$articlePagebar.hide(),this.__resetArticle(),
this.__getArticleList({
searchKey:"",
page:0,
type:"next"
});
},
__initDialogData:function(){
var e=this.__g,t=e.dom,a=(e._linkDialog,this.editor),i=a.getDomUtils(),n=a.getSelectionRange(),r=n.collapsed?a.queryCommandValue("link"):a.getSelectionStart();
if(e.tempLinkWarn=!0,e.getting_acc_data=!1,e.getting_article_data=!1,r){
i.findParentByTagName(r,"a",!0)&&(r=i.findParentByTagName(r,"a",!0));
var c=!0,s=n.getRangeDom();
if(s&&s.length)for(var o=0;o<s.length;o++)if("IMG"===s[o].tagName){
c=!1;
break;
}
var l=c?n.getRangeText():"",_=r.text||l||"你已选中了添加链接的文本内容";
t.$outerTitle.val(_).attr("disabled",!0).parent().addClass("disabled"),t.$innerTitle.val(_).attr("disabled",!0).parent().addClass("disabled"),
t.$outerLinkInput.val(r.href||"http://"),t.$innerLinkInput.val(r.href||"http://"),
e.canWriteBack=!1;
}else e.canWriteBack=!0;
if(window.wx&&window.wx.cgiData&&"undefined"!=typeof window.wx.cgiData.func_ban_info&&!d(wx.cgiData.func_ban_info,"outer-url")){
var p,g=18;
$.each(wx.cgiData.func_ban_info,function(e,t){
return t.func_id==g?(p=t,!1):void 0;
});
var h=d.getReason(p.reason_id),u='你的帐号<a target="_blank" href="'+(h.pc_url?h.pc_url:defaultReason.pc_url)+'">'+h.reason_description+"</a>，",m=new Date(1e3*p.unlock_time);
p.ban_time==p.unlock_time?u+="已被永久屏蔽图文消息外链功能。":(u+="已被屏蔽图文消息外链功能至",u+=m.getFullYear()+"/"+(m.getMonth()+1)+"/"+m.getDate(),
u+="，期间图文消息外链功能将不可用。"),t.$outerLinkInput.attr("disabled",!0).parent().addClass("disabled"),
t.$ok.disable(),t.$warnTips.show().find(".js_tips").html(u);
}
e._linkDialog.popup("show");
},
__destroy:function(){
var e=this.__g;
e._linkDialog&&(e._linkDialog.popup("remove"),e._linkDialog=null),this._popover&&(this._popover.remove(),
this._popover=null),e.acc_pagebar&&(e.acc_pagebar.destroy(),e.acc_pagebar=null),
e.article_pagebar&&(e.article_pagebar.destroy(),e.article_pagebar=null),e.dom={},
e.form={},e.currentFakeid="",e.selectedArticle=void 0,e.curArticleList=[],e.articleData={},
e.showPageMap=[];
},
__DialogInit:function(){
var e=this,t=this.__g,a=wx.T(r,{
flag:t.can_use_hyperlink&&0!=t.can_use_appmsg_outer_url
});
t._linkDialog=$(a).popup({
title:"编辑超链接",
className:"align_edge link_dialog_wrap",
width:"800",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
t._linkDialog;
if(e.__checkAccLoading("acc")!==!0&&e.__checkAccLoading("article")!==!0){
if(!t.form.form()){
var a=t.form.errorList;
return void(a&&a[0]&&a[0].message&&_.err(a[0].message));
}
if(t.dom.$innerTabItem.hasClass("selected")){
var i;
if(t.dom.$innerMain.find("input[name=link_type][type=radio][value=1]").prop("checked"))i={
href:t.dom.$innerLinkInput.val().trim(),
target:"_blank"
},t.canWriteBack&&(i.textValue=t.dom.$innerTitle.val().trim());else{
if(!t.curArticleList||0==t.curArticleList.length)return void _.err("请搜索公众号文章");
if("undefined"==typeof t.selectedArticle||!t.curArticleList[t.selectedArticle])return void _.err("请选择公众号文章");
var n=t.curArticleList[t.selectedArticle];
i={
href:n.link,
target:"_blank"
},"undefined"!=typeof n.item_show_type&&(i["data-itemshowtype"]=n.item_show_type),
t.canWriteBack&&(i.textValue=n.titleNoEncode);
}
i&&e.__insertLink(i);
}else t.dom.$outerTabItem.hasClass("selected")&&(i={
href:t.dom.$outerLinkInput.val().trim(),
target:"_blank"
},t.canWriteBack&&(i.textValue=t.dom.$outerTitle.val().trim()),e.__insertLink(i));
e.__destroy();
}
}
},{
text:"取消",
click:function(){
e.__destroy();
}
}],
onHide:function(){
e.__destroy();
}
});
var i=t._linkDialog.popup("get");
t.dom={
$dialogDom:i,
$ok:i.find(".js_btn").eq(0),
$tabMain:i.find(".js_tab_main"),
$innerTabItem:i.find(".js_tab_item[data-tab=inner]"),
$outerTabItem:i.find(".js_tab_item[data-tab=outer]"),
$innerMain:i.find(".js_inner_main"),
$outerMain:i.find(".js_outer_main"),
$accPagebar:i.find(".js_acc_pagebar"),
$articlePagebar:i.find(".js_article_pagebar"),
$accLoading:i.find(".js_acc_loading"),
$articleLoading:i.find(".js_article_loading"),
$articleContent:i.find(".js_article_content"),
$accContent:i.find(".js_acc_content"),
$articleList:i.find(".js_article_list"),
$accList:i.find(".js_acc_list"),
$warnTips:i.find(".js_warn_tips"),
$outerTitle:i.find(".js_outer_title"),
$innerTitle:i.find(".js_inner_title"),
$innerLinkInput:i.find(".js_inner_link_input"),
$outerLinkInput:i.find(".js_outer_link_input"),
$accSearchMain:i.find(".js_acc_search_main"),
$jsSelfAcc:i.find(".js_self_acc"),
$accSearchBtn:i.find(".js_acc_search_btn"),
$accSearchDel:i.find(".js_acc_search_del"),
$accSearchInput:i.find(".js_acc_search_input"),
$accSearchTips:i.find(".js_acc_search_tips"),
$articleSearchBtn:i.find(".js_article_search_btn"),
$articleSearchDel:i.find(".js_article_search_del"),
$articleSearchInput:i.find(".js_article_search_input"),
$accDesc:i.find(".js_acc_desc"),
$accText:i.find(".js_acc_Text")
};
},
__insertLink:function(e){
var t,a=this.editor;
a.fireEvent("funcPvUvReport","link"),this.__doLink(t=a.getSelectionRange(),e),t.collapse().select(!0);
},
__optimize:function(e){
var t=this.editor.getDomUtils(),a=e.startContainer,i=e.endContainer;
(a=t.findParentByTagName(a,"a",!0))&&e.setStartBefore(a),(i=t.findParentByTagName(i,"a",!0))&&e.setEndAfter(i);
},
__doLink:function(e,t){
var a=this.editor,i=e.cloneRange(),n=a.getBrowser(),r=a.getDomUtils(),c=a.queryCommandValue("link"),s=a.getUtils();
this.__optimize(e=e.adjustmentBoundary());
var o=e.startContainer;
if(1==o.nodeType&&c&&(o=o.childNodes[e.startOffset],o&&1==o.nodeType&&"A"==o.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(o[n.ie?"innerText":"textContent"])&&(o[n.ie?"innerText":"textContent"]=s.html(t.textValue||t.href))),
(!i.collapsed||c)&&(e.removeInlineStyle("a"),i=e.cloneRange()),i.collapsed){
var l=e.document.createElement("a"),_="";
t.textValue?(_=s.html(t.textValue),delete t.textValue):_=s.html(t.href),r.setAttributes(l,t),
o=r.findParentByTagName(i.startContainer,"a",!0),o&&r.isInNodeEndBoundary(i,o)&&e.setStartAfter(o).collapse(!0),
_=_.replace(/<em>(.+?)<\/em>/g,function(e,t){
return t;
}),l[n.ie?"innerText":"textContent"]=_,e.insertNode(l).selectNode(l);
}else{
var d,p;
!function(){
e.applyInlineStyle("a",t);
var i=[],n=e.getRangeDom();
if(n&&n.length&&n.forEach(function(e){
e.getElementsByTagName&&(i=i.concat(e.getElementsByTagName("img")));
}),i&&i.length>0)for(d=0,p=i.length;p>d;d++)a.fireEvent("handlerH5LinkImg",i[d]);
}();
}
}
},t;
});define("common/wx/mpEditor/plugin/emotion.js",["common/wx/mpEditor/plugin/emotionButton.js"],function(t){
"use strict";
function e(){
this.__o={},this.editor=null;
}
var n=t("common/wx/mpEditor/plugin/emotionButton.js"),o={
defaultImg:"https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"
};
return e.beforeSetContent=function(t){
return t.html;
},e.prototype={
getName:function(){
return"mpemotion";
},
noCommandReprot:function(){
return!0;
},
beforeSetContent:function(t){
return e.beforeSetContent({
html:t
});
},
getExecCommand:function(){
var t=this;
return function(e,n){
var o=t.editor;
if(o&&n&&n.name){
var i=o.execCommand("insertHtml",t.formatHtml(n.name)),r=$(i[0]),m=r.css("backgroundImage").match(/url\(([^\)]+)\)/);
if(m&&m[1]){
var a=6;
/^http(s)?:\/\/(.+\.)?mp.weixin.qq.com(\:\d+)?/.test(m)&&(a=0);
var c=m[1].match(/(.{6})\.png/);
c&&c[1]&&(/[0-9a-fA-F]{6}/.test(c[1])||(a=0)),m=m[1].replace(/^['"]|['"]$/g,""),
m=m.replace(/^http(s)?:\/\/.*\.mp.weixin.qq.com(\:\d+)?/,"https://res.wx.qq.com"),
m=m.split(".");
var u=m[m.length-2];
m[m.length-2]=u.substring(0,u.length-a),r.removeAttr("class").removeAttr("_src").attr({
src:m.join("."),
style:"display:inline-block;width:20px;vertical-align:text-bottom;"
});
}
}
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"表情";
},
formatHtml:function(t){
return'<img class="'+t+'" src="'+o.defaultImg+'" data-ratio="1" data-w="20" style="width:20px;height:20px;vertical-align:middle;display:inline-block;-webkit-background-size:20px auto;background-size:20px auto;" />';
},
initToolBar:function(t){
n.defineButton();
var e=t.getUi(),o=this.getTitle(),i=this.getName();
return e[i]=function(t){
return function(n){
var i=new e.EmotionButton({
useArrow:!1,
title:o,
editor:n,
_onEmotionSelect:function(t){
n.execCommand("mpemotion",t);
}
});
return e.buttons[t]=i,n.addListener("selectionchange",function(){
i.setDisabled(-1==n.queryCommandState(t));
}),i;
};
}(i),!0;
}
},e;
});define("common/wx/mpEditor/plugin/card.js",["common/wx/Tips.js","cardticket/send_card.js","common/wx/Cgi.js","cardticket/parse_data.js"],function(t){
"use strict";
function e(t){
var e=t.key,r=t.content,a=(t.ifrmName,new RegExp("<iframe[^>]*?"+t.ifrmName+"[^>]*?"+e+"=('|\")(.*?)('|\").*?>","g"));
return a.test(r)?RegExp.$2:null;
}
function r(t){
return t.replace(/<iframe class="res_iframe card_iframe js_editor_card"[^>]*>[^<>]*?<\/iframe>/g,function(t){
var r=e({
content:t,
key:"data-cardid",
ifrmName:"js_editor_card"
}),a=e({
content:t,
key:"data-num",
ifrmName:"js_editor_card"
}),i=e({
content:t,
key:"data-display-src",
ifrmName:"js_editor_card"
}),n=e({
content:t,
key:"src",
ifrmName:"js_editor_card"
}),d=e({
content:t,
key:"data-src",
ifrmName:"js_editor_card"
});
i=n||i,i=i?i.indexOf("cardid=")>=0?i:i+"&cardid="+r:"";
var c="";
return window.wx&&window.wx.data&&window.wx.data.t&&(c=window.wx.data.t),i=i?i.indexOf("token=")>=0?i.replace(/token=([^&]*|$)/,"token="+c):i+"&token="+c:"",
'<iframe class="res_iframe card_iframe js_editor_card" data-cardid="%s"                 data-num="%s" %s %s></iframe>'.sprintf(r,a,i?'src="'+i+'"':"",d?'data-src="'+d+'"':"");
});
}
var a=t("common/wx/Tips.js"),i=t("cardticket/send_card.js"),n=t("common/wx/Cgi.js"),d=wx.cgiData,c=t("cardticket/parse_data.js"),o=function(t){
t&&t.container&&(this.container=$(t.container).show(),t.can_show_reddot&&this.container.addClass("tpl_item_reddot")),
this.biz_uin=t.biz_uin||"",this.can_use_card=t.can_use_card||!1,this.info=t.info;
var e=this;
e.report_vid_type=[],e._init();
};
return o.beforeSetContent=function(t){
return t.html?r(t.html):"";
},o.prototype={
getName:function(){
return"insertcard";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var e=t.editor,r=this;
if(e){
{
e.getDocument();
}
t._openCardSelect(r);
}
};
},
_init:function(){
var t=this;
d.cardid&&n.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(d.cardid)
},function(e){
e.base_resp&&0==e.base_resp.ret&&(t.card_data=$.parseJSON(e.card_detail),t.card_data=c.parse_cardticket(t.card_data),
t._initCard());
});
},
_initCard:function(){
if(this.hasSetContent&&this.card_data&&!this.isInit){
var t=this.editor.getUeditor().getContent(),e=/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi;
if(e.test(t))return void(this.isInit=!0);
this._insertCard(this.editor,this.card_data,d.cardnum),this.isInit=!0;
}
},
_checkCard:function(t,e){
var r=$(t).find("iframe"),i=0,n=5;
return $.each(r,function(t,e){
$(e).hasClass("js_editor_card")&&i++;
}),i>n||e&&i>=n?(a.err("正文只能包含%s个卡券".sprintf(n)),!1):!0;
},
_getCardIframe:function(t,e){
return['<iframe class="res_iframe card_iframe js_editor_card" scrolling="no" frameborder="0" ','data-cardid="%s" data-num="%s" '.sprintf(t.id,e),'src="/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=%s&brand_name=%s&title=%s&color=%s&lang=zh_CN&cardid=%s&token=%s&lang=zh_CN"'.sprintf(encodeURIComponent(t.logo_url),encodeURIComponent(t.brand_name),encodeURIComponent(t.title),encodeURIComponent(t.color),t.id,wx.data.t),' data-src="http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=%s&cardid=%s&wechat_card_js=1#wechat_redirect" '.sprintf(this.biz_uin,t.id),"></iframe>"].join("");
},
_insertCard:function(t,e,r){
var a=this._getCardIframe(e,r);
t.execCommand("inserthtml",a,!0),this.editor.fireEvent("funcPvUvReport","insertcard");
},
_openCardSelect:function(t){
if(this._checkCard(this.editor.getDocument(),!0)){
var e=this,r=new i({
multi:!1,
param:{
need_member_card:1
},
selectComplete:function(r,a){
e._insertCard(t,r,a);
},
source:"嵌入图文消息素材"
});
r.show();
}
},
check:function(t){
return this._checkCard(t);
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),r=e&&"edui-faked-video"==e.className;
return r?1:0;
};
},
getContainer:function(){
return this.container;
},
initPluginData:function(){
return["cardid","cardquantity","cardlimit"];
},
getPluginData:function(t){
var r=t.init(this.initPluginData()),a=e({
content:r.get("content"),
key:"data-cardid",
ifrmName:"js_editor_card"
});
if(a){
var i=e({
content:r.get("content"),
key:"data-num",
ifrmName:"js_editor_card"
});
r.set("cardid",a),r.set("cardquantity",i),r.set("cardlimit",0==i?0:1);
}
},
addListener:function(t){
this.__g;
this.can_use_card&&t.addListener("beforepaste",function(t,e){
e.html=r(e.html);
});
},
beforeSetContent:function(t){
return o.beforeSetContent({
html:t
});
},
afterSetContent:function(){
this.hasSetContent=!0,this._initCard();
}
},o;
});define("common/wx/mpEditor/plugin/vote.js",["biz_web/widget/date_range.css","page/vote/dialog_vote_table.css","widget/date_select.css","common/wx/Tips.js","common/wx/pagebar.js","common/wx/Cgi.js","tpl/vote/vote_table.html.js"],function(require,exports,module){
"use strict";
function iframeUrlSwitcher(e){
for(var t=e.content,o=e.returnValue||"content",n=e.wrapper||"add",i=t.split(/<\/?iframe/),a="",r=" TMP_NAME=",s=[],c=[],l=[],d=0;d<i.length;d++){
if(-1!==i[d].indexOf("js_editor_vote_card")||-1!==i[d].indexOf("js_editor_card")){
i[d]=i[d].replace(" src=",r).replace(" data-display-src="," src=").replace(r," data-display-src="),
i[d]=i[d].replace(" style=",r).replace(" data-display-style="," style=").replace(r," data-display-style=");
var u=i[d].match(/data-voteid=\"([^\"]*)/);
u&&u[1]&&s.push(u[1]);
var p=i[d].match(/isMlt=(\d)/);
p&&p[1]&&c.push(p[1]),i[d]=i[d].replace(/token=(\d+)&/gi,"token="+wx.getUrl("token")+"&");
var m=i[d].match(/data-supervoteid=\"([^\"]*)/);
m&&m[1]&&l.push(m[1]);
}
a+=i[d],d<i.length-1&&(a+=(d%2?"</":"<")+"iframe");
}
switch(a="add"===n?a.replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi,function(e){
return['<span class="vote_area">',e,'<span class="vote_box skin_help po_left"></span>','<span class="vote_box skin_help po_right"></span>',"</span>"].join("");
}):a.replace(/<span class="vote_area">/g,"").replace(/<span class="vote_box skin_help po_left"><\/span><span class="vote_box skin_help po_right"><\/span><\/span>/g,"").replace(/<span class="vote_box skin_help po_left"><\/span><span class="vote_box skin_help po_right"><\/span>/g,""),
o){
case"voteid":
return s;

case"isMlt":
return c;

case"supervoteid":
return l;

case"content":
default:
return a;
}
}
function setVoteIframeHeight(e){
var t=e.getDocument();
$(t).find("iframe").each(function(){
var t=this;
$(t).hasClass("js_editor_vote_card")&&$(t).on("load",function(){
$(t.contentWindow.document).on("finished",function(){
var o=$(this).height();
t.contentDocument&&t.contentDocument.body.offsetHeight?o=t.contentDocument.body.offsetHeight:t.Document&&t.Document.body&&t.Document.body.scrollHeight?o=t.Document.body.scrollHeight:t.document&&t.document.body&&t.document.body.scrollHeight&&(o=t.document.body.scrollHeight),
$(t).height(o).off("finished"),e.fireEvent("contentchange");
}),$(t).off("load");
});
});
}
require("biz_web/widget/date_range.css"),require("page/vote/dialog_vote_table.css"),
require("widget/date_select.css");
var Tips=require("common/wx/Tips.js"),Pagebar=require("common/wx/pagebar.js"),Cgi=require("common/wx/Cgi.js");
template.helper("datestring",function(e){
function t(e,t){
for(var o=0,n=t-(e+"").length;n>o;o++)e="0"+e;
return e+"";
}
var o=new Date(e),n=["日","一","二","三","四","五","六"],i="yyyy-mm-dd".replace(/yyyy|YYYY/,o.getFullYear()).replace(/yy|YY/,t(o.getFullYear()%100,2)).replace(/mm|MM/,t(o.getMonth()+1,2)).replace(/m|M/g,o.getMonth()+1).replace(/dd|DD/,t(o.getDate(),2)).replace(/d|D/g,o.getDate()).replace(/hh|HH/,t(o.getHours(),2)).replace(/h|H/g,o.getHours()).replace(/ii|II/,t(o.getMinutes(),2)).replace(/i|I/g,o.getMinutes()).replace(/ss|SS/,t(o.getSeconds(),2)).replace(/s|S/g,o.getSeconds()).replace(/w/g,o.getDay()).replace(/W/g,n[o.getDay()]);
return i;
});
var Vote=function(e){
e&&e.container&&(this.domid=e.container,this.container=$(e.container).show(),$(e.container).show(),
e.can_show_reddot&&this.container.addClass("tpl_item_reddot")),this.info=e.info,
this.can_use_vote=e.can_use_vote||!1;
};
return Vote.beforeSetContent=function(e){
var t=iframeUrlSwitcher({
content:e.html,
wrapper:"remove"
});
return t;
},Vote.prototype={
getName:function(){
return"insertvote";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
var t=this,o=e.editor;
o&&e.openVotePopup(t);
};
},
doCommand:function(e,t,o){
},
getContainer:function(){
return this.domid;
},
initPluginData:function(){
return["voteid","voteismlt","supervoteid"];
},
getPluginData:function(e){
var t=e.init(this.initPluginData());
t.set("content",iframeUrlSwitcher({
content:t.get("content"),
wrapper:"add"
}));
var o=iframeUrlSwitcher({
content:t.get("content"),
returnValue:"voteid"
})[0],n=iframeUrlSwitcher({
content:t.get("content"),
returnValue:"isMlt"
})[0],i=iframeUrlSwitcher({
content:t.get("content"),
returnValue:"supervoteid"
});
o&&"undefined"!=typeof n&&(t.set("voteid",o),t.set("voteismlt",n||store.get("appmsg_vote_"+o))),
i&&t.set("supervoteid",i[0]||"");
},
beforeSetContent:function(e){
return Vote.beforeSetContent({
html:e
});
},
afterSetContent:function(){
setVoteIframeHeight(this.editor);
},
insertVoteIframe:function(e,t){
var o=this.editor;
e.execCommand("inserthtml",t.join(""),!0),o.fireEvent("funcPvUvReport","insertvote");
},
_setIframeHeight:function(){
var e=this;
setTimeout(function(){
var t=e.editor.getDocument().getElementsByTagName("iframe");
if(t&&t.length>0)for(var o=0;o<t.length;o++)if($(t[o]).hasClass("js_editor_vote_card")){
var n=t[o],i=$(n).height();
n.contentDocument&&n.contentDocument.body.offsetHeight?i=n.contentDocument.body.offsetHeight:n.Document&&n.Document.body&&n.Document.body.scrollHeight?i=n.Document.body.scrollHeight:n.document&&n.document.body&&n.document.body.scrollHeight&&(i=n.document.body.scrollHeight),
n.style.height=i+"px";
}
},5e3);
},
_checkIframe:function(e,t){
var o=$(e).find("iframe"),n=0;
return $.each(o,function(e,t){
$(t).hasClass("js_editor_vote_card")&&n++;
}),n>1||t&&n>=1?(Tips.err("正文只能包含%s个投票".sprintf(1)),!1):!0;
},
check:function(e){
return this._checkIframe(e);
},
openVotePopup:function openVotePopup(ueditor){
function renderList(begin){
$.ajax({
url:wx.url("/cgi-bin/newoperatevote?action=list&vote_status=1&is_editing=0&f=json&count=6&begin="+begin),
type:"get",
dataType:"json",
success:function success(data){
if(data.data){
for(var voteData=eval("("+data.data+")"),iframeH=0,i=0;i<voteData.super_vote_info.length;i++)voteData.super_vote_info[i].height=150*voteData.super_vote_info[i].vote_id_list.vote_id.length,
voteData.super_vote_info[i].title=voteData.super_vote_info[i].title.html(!1);
$(".js_vote_list").html(compile_html({
loading:!1,
data:voteData,
iframeH:iframeH,
biz:data.bizuin,
token:wx.data.param
})),$(".js_select").checkbox({
multi:!1
});
var total_count=voteData.total_count,count=6,showpage=begin/count+1,pagebar=new Pagebar({
container:".js_pager",
perPage:count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:showpage,
totalItemsNum:total_count,
callback:function(e){
var t=e.currentPage;
if(t!=showpage)return t--,renderList(t*count),!1;
}
});
}else $(".js_vote_list").html(compile_html({
loading:!1,
data:{
super_vote_info:[]
}
}));
},
error:function(){}
});
}
var that=this;
if(!that._checkIframe(this.editor.getDocument(),!0))return null;
document.body.style.overflow=document.documentElement.style.overflow="hidden";
var pop=$("<div class='' id='js_vote_menu'><div class='vote_list js_vote_list'></div></div>").popup({
title:"发起投票",
className:"vote_edit tc_dialog dialog_normal_form",
buttons:[{
text:"确定",
click:function(){},
type:"primary"
}],
close:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}),_vote_list_tpl=require("tpl/vote/vote_table.html.js"),compile_html=template.compile(_vote_list_tpl);
$(".js_vote_list").html(compile_html({
loading:!0
})),$("#js_vote_list").parent().addClass("selected"),renderList(0),$(".js_vote_list").on("click",".js_new_vote",function(){
window.open(wx.url("/cgi-bin/newoperatevote?action=create&t=vote/vote_edit"));
}),$(".js_vote_list").on("click",".js_manage_vote",function(){
window.open(wx.url("/cgi-bin/newoperatevote?action=list"));
}),$(".vote_edit button").click(function(){
var iframeH=0,saveBtn=pop.find(":button").last();
saveBtn.removeClass("btn_loading");
var supervoteid=0,biz=0;
if("none"==$(".js_vote_list").css("display")){
var data=vote.getFullData();
if(data){
var tempData=eval("("+data+")"),optionL=0;
iframeH+=70*tempData.vote_subject.length;
for(var i=0;i<tempData.vote_subject.length;i++)optionL+=tempData.vote_subject[i].options.length;
iframeH+=30*optionL,saveBtn.btn(!1),Cgi.post({
url:wx.url("/cgi-bin/newoperatevote?action=create"),
dataType:"json",
data:{
action:"create",
json:data
},
mask:!1
},function(e){
0==e.base_resp.ret?(Tips.suc("操作成功"),supervoteid=e.super_vote_id,biz=e.bizuin,that.insertVoteIframe(ueditor,['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setVoteIframeHeight(that.editor),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
$(".mask").hide()):(Tips.err(e.base_resp.err_msg),saveBtn.btn(!0));
});
}
}else saveBtn.btn(!1),1==$(".js_select:checked").length?(supervoteid=$(".js_select:checked").val(),
biz=$(".js_select:checked").data("biz"),iframeH=$(".js_select:checked").data("height"),
that.insertVoteIframe(ueditor,['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setVoteIframeHeight(that.editor),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
saveBtn.btn(!0),$(".mask").hide()):(Tips.err("请选择投票"),saveBtn.btn(!0));
});
}
},Vote;
});define("common/qq/events.js",[],function(t,n,a){
"use strict";
function i(t){
this.data=t===!0?window.wx.events||{}:{};
}
i.prototype={
on:function(t,n){
return this.data[t]=this.data[t]||[],this.data[t].push(n),this;
},
off:function(t,n){
return this.data[t]&&this.data[t].length>0&&(n&&"function"==typeof n?$.each(this.data[t],function(a,i){
i===n&&this.data[t].splice(a,1);
}):this.data[t]=[]),this;
},
trigger:function(t){
var n=arguments;
return this.data[t]&&this.data[t].length>0&&$.each(this.data[t],function(t,a){
var i=a.apply(this,Array.prototype.slice.call(n,1));
return i===!1?!1:void 0;
}),this;
}
},a.exports=function(t){
return new i(t);
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/lib/MockJax.js",[],function(){
!function(e){
function t(t){
void 0==window.DOMParser&&window.ActiveXObject&&(DOMParser=function(){},DOMParser.prototype.parseFromString=function(e){
var t=new ActiveXObject("Microsoft.XMLDOM");
return t.async="false",t.loadXML(e),t;
});
try{
var n=(new DOMParser).parseFromString(t,"text/xml");
if(!e.isXMLDoc(n))throw"Unable to parse XML";
var s=e("parsererror",n);
if(1==s.length)throw"Error: "+e(n).text();
return n;
}catch(o){
var r=void 0==o.name?o:o.name+": "+o.message;
return void e(document).trigger("xmlParseError",[r]);
}
}
function n(t,n,s){
(t.context?e(t.context):e.event).trigger(n,s);
}
function s(t,n){
var o=!0;
return"string"==typeof n?e.isFunction(t.test)?t.test(n):t==n:(e.each(t,function(r){
return void 0===n[r]?o=!1:void(o="object"==_typeof(n[r])?o&&s(t[r],n[r]):e.isFunction(t[r].test)?o&&t[r].test(n[r]):o&&t[r]==n[r]);
}),o);
}
function o(t,n){
if(e.isFunction(t))return t(n);
if(e.isFunction(t.url.test)){
if(!t.url.test(n.url))return null;
}else{
var o=t.url.indexOf("*");
if(t.url!==n.url&&-1===o||!new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g,"\\$&").replace(/\*/g,".+")).test(n.url))return null;
}
return t.data&&n.data&&!s(t.data,n.data)?null:t&&t.type&&t.type.toLowerCase()!=n.type.toLowerCase()?null:t;
}
function r(n,s,o){
var r=function(r){
return function(){
return function(){
var r;
this.status=n.status,this.statusText=n.statusText,this.readyState=4,e.isFunction(n.response)&&n.response(o),
"json"==s.dataType&&"object"==_typeof(n.responseText)?this.responseText=JSON.stringify(n.responseText):"xml"==s.dataType?"string"==typeof n.responseXML?(this.responseXML=t(n.responseXML),
this.responseText=n.responseXML):this.responseXML=n.responseXML:this.responseText=n.responseText,
("number"==typeof n.status||"string"==typeof n.status)&&(this.status=n.status),"string"==typeof n.statusText&&(this.statusText=n.statusText),
r=this.onreadystatechange||this.onload,e.isFunction(r)?(n.isTimeout&&(this.status=-1),
r.call(this,n.isTimeout?"timeout":void 0)):n.isTimeout&&(this.status=-1);
}.apply(r);
};
}(this);
n.proxy?g({
global:!1,
url:n.proxy,
type:n.proxyType,
data:n.data,
dataType:"script"===s.dataType?"text/plain":s.dataType,
complete:function(e){
n.responseXML=e.responseXML,n.responseText=e.responseText,n.status=e.status,n.statusText=e.statusText,
this.responseTimer=setTimeout(r,n.responseTime||0);
}
}):s.async===!1?r():this.responseTimer=setTimeout(r,n.responseTime||50);
}
function a(t,n,s,o){
return t=e.extend(!0,{},e.mockjaxSettings,t),"undefined"==typeof t.headers&&(t.headers={}),
t.contentType&&(t.headers["content-type"]=t.contentType),{
status:t.status,
statusText:t.statusText,
readyState:1,
open:function(){},
send:function(){
o.fired=!0,r.call(this,t,n,s);
},
abort:function(){
clearTimeout(this.responseTimer);
},
setRequestHeader:function(e,n){
t.headers[e]=n;
},
getResponseHeader:function(e){
return t.headers&&t.headers[e]?t.headers[e]:"last-modified"==e.toLowerCase()?t.lastModified||(new Date).toString():"etag"==e.toLowerCase()?t.etag||"":"content-type"==e.toLowerCase()?t.contentType||"text/plain":void 0;
},
getAllResponseHeaders:function(){
var n="";
return e.each(t.headers,function(e,t){
n+=e+": "+t+"\n";
}),n;
}
};
}
function i(e,t,n){
if(u(e),e.dataType="json",e.data&&T.test(e.data)||T.test(e.url)){
c(e,t,n);
var s=/^(\w+:)?\/\/([^\/?#]+)/,o=s.exec(e.url),r=o&&(o[1]&&o[1]!==location.protocol||o[2]!==location.host);
if(e.dataType="script","GET"===e.type.toUpperCase()&&r){
var a=l(e,t,n);
return a?a:!0;
}
}
return null;
}
function u(e){
"GET"===e.type.toUpperCase()?T.test(e.url)||(e.url+=(/\?/.test(e.url)?"&":"?")+(e.jsonp||"callback")+"=?"):e.data&&T.test(e.data)||(e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?");
}
function l(t,n,s){
var o=s&&s.context||t,r=null;
return n.response&&e.isFunction(n.response)?n.response(s):e.globalEval("object"===_typeof(n.responseText)?"("+JSON.stringify(n.responseText)+")":"("+n.responseText+")"),
p(t,o,n),d(t,o,n),e.Deferred&&(r=new e.Deferred,"object"==_typeof(n.responseText)?r.resolveWith(o,[n.responseText]):r.resolveWith(o,[e.parseJSON(n.responseText)])),
r;
}
function c(e,t,n){
var s=n&&n.context||e,o=e.jsonpCallback||"jsonp"+m++;
e.data&&(e.data=(e.data+"").replace(T,"="+o+"$1")),e.url=e.url.replace(T,"="+o+"$1"),
window[o]=window[o]||function(n){
data=n,p(e,s,t),d(e,s,t),window[o]=void 0;
try{
delete window[o];
}catch(r){}
head&&head.removeChild(script);
};
}
function p(e,t,s){
e.success&&e.success.call(t,s.responseText||"",status,{}),e.global&&n(e,"ajaxSuccess",[{},e]);
}
function d(t,s){
t.complete&&t.complete.call(s,{},status),t.global&&n("ajaxComplete",[{},t]),t.global&&!--e.active&&e.event.trigger("ajaxStop");
}
function f(t,n){
var s,r,u;
"object"===("undefined"==typeof t?"undefined":_typeof(t))?(n=t,t=void 0):n.url=t,
r=e.extend(!0,{},e.ajaxSettings,n);
for(var l=0;l<y.length;l++)if(y[l]&&(u=o(y[l],r)))return h.push(r),e.mockjaxSettings.log(u,r),
"jsonp"===r.dataType&&(s=i(r,u,n))?s:(u.cache=r.cache,u.timeout=r.timeout,u.global=r.global,
x(u,n),function(t,n,o,r){
s=g.call(e,e.extend(!0,{},o,{
xhr:function(){
return a(t,n,o,r);
}
}));
}(u,r,n,y[l]),s);
return g.apply(e,[n]);
}
function x(e,t){
if(e.url instanceof RegExp&&e.hasOwnProperty("urlParams")){
var n=e.url.exec(t.url);
if(1!==n.length){
n.shift();
var s=0,o=n.length,r=e.urlParams.length,a=Math.min(o,r),i={};
for(s;a>s;s++){
var u=e.urlParams[s];
i[u]=n[s];
}
t.urlParams=i;
}
}
}
var g=e.ajax,y=[],h=[],T=/=\?(&|$)/,m=(new Date).getTime();
e.extend({
ajax:f
}),e.mockjaxSettings={
log:function(t,n){
if(t.logging!==!1&&("undefined"!=typeof t.logging||e.mockjaxSettings.logging!==!1)&&window.console&&console.log){
var s="MOCK "+n.type.toUpperCase()+": "+n.url,o=e.extend({},n);
if("function"==typeof console.log)console.log(s,o);else try{
console.log(s+" "+JSON.stringify(o));
}catch(r){
console.log(s);
}
}
},
logging:!0,
status:200,
statusText:"OK",
responseTime:500,
isTimeout:!1,
contentType:"text/plain",
response:"",
responseText:"",
responseXML:"",
proxy:"",
proxyType:"GET",
lastModified:null,
etag:"",
headers:{
etag:"IJF@H#@923uf8023hFO@I#H#",
"content-type":"text/plain"
}
},e.mockjax=function(e){
var t=y.length;
return y[t]=e,t;
},e.mockjaxClear=function(e){
1==arguments.length?y[e]=null:y=[],h=[];
},e.mockjax.handler=function(e){
return 1==arguments.length?y[e]:void 0;
},e.mockjax.mockedAjaxCalls=function(){
return h;
};
}(jQuery);
});define("common/wx/cgiReport.js",["common/wx/Tips.js"],function(e,a){
"use strict";
var r=e("common/wx/Tips.js");
a.error=function(e,a,t){
t.responseText=t.responseText||"";
var s=-1!==location.href.indexOf("/cgi-bin/home")&&(-1!==a.url.indexOf("/misc/safeassistant")||-1!==a.url.indexOf("/safe/safeuuid")),n=11;
switch(e){
case"timeout":
n=7;
break;

case"error":
n=8;
break;

case"notmodified":
n=9;
break;

case"parsererror":
n=10;
}
a.data.lang&&delete a.data.lang,a.data.random&&delete a.data.random,a.data.f&&delete a.data.f,
a.data.ajax&&delete a.data.ajax,a.data.token&&delete a.data.token,n+=s?100:0,$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}] [text={responseText}] [headers={headers}] [status={status}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url,
param:$.param(a.data).substr(0,50),
info:e,
responseText:t.responseText.substr(0,500),
headers:(t.getAllResponseHeaders()||"").replace(/\s/g,""),
status:t.status
}),
id:n,
level:"error"
},
type:"POST"
}),$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:a.url,
param:$.param(a.data).substr(0,50),
info:e
}),
id:6+(s?100:0),
level:"error"
},
type:"POST"
}),"timeout"==e&&r.err("你的网络环境较差，请稍后重试");
};
});define("common/qq/url.js",[],function(t,i,a){
"use strict";
function n(t){
var i=this,a="";
if(this.base="",this.param={},t){
var n=t.match(/(\w.*?)\?([^#]*)(#(.*))?$/);
n&&n[1]&&n[2]&&(this.base=n[1],a=n[2]);
}else this.base=[window.location.origin,window.location.pathname].join(""),a=window.location.search.slice(1);
a=a.split("&"),a.each(function(t){
t=t&&t.split("="),2==t.length&&(i.param[t[0]]=t[1]);
});
}
n.prototype={
get:function(t){
return t?this.param[t]:this.param;
},
set:function(t,i){
var a={};
return $.isPlainObject(t)?(a=$.extend(!0,{},this.param,t),new n([this.base,"?",Object.param(a)].join(""))):"string"==typeof t&&i?(a=Object.clone(this.param),
a[t]=i,new n([this.base,"?",Object.param(a)].join(""))):this;
},
toString:function(){
return[this.base,"?",Object.param(this.param)].join("");
}
},a.exports=n;
});define("common/qq/mask.js",["biz_web/lib/spin.js"],function(s,i){
"use strict";
function n(s){
if(this.mask)this.mask.show();else{
var i="body";
s&&s.parent&&(i=$(s.parent)),this.mask=$(t).appendTo(i),this.mask.id="wxMask_"+ ++e,
this.mask.spin("flower");
}
if(s){
if(s.spin===!1)return this;
this.mask.spin(s.spin||"flower");
}
return this;
}
s("biz_web/lib/spin.js");
var e=0,t='<div class="mask"></div>';
n.prototype={
show:function(){
this.mask.show();
},
hide:function(){
this.mask.hide();
},
remove:function(){
this.mask.remove();
}
},i.show=function(s){
return new n(s);
},i.hide=function(){
$(".mask").hide();
},i.remove=function(){
$(".mask").remove();
};
});define("tpl/ban/page_msg.html.js",[],function(){
return'<div class="page_msg mini ban_page_msg">\n    <div class="inner group">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n        <div class="msg_content">{=content}</div>\n    </div>\n</div>';
});