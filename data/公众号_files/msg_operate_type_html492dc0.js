define("tpl/media/appmsg_edit/text_editor_link_popup.html.js",[],function(){
return'<div class="edui-default" id="js_text_editor_link_popup" style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px; z-index: 1008;">\n  <div class="edui-popup edui_mask_edit_bar edui-bubble edui-default" style="z-index: 1009;">\n    <div class="edui-popup-body edui-default" style="width: 420px; height: 42px;">\n      <div class="edui-popup-content edui-default">\n        <div class="edui_mask_edit_group with_line">\n          <a id="js_link_place" class="edui_mask_edit_meta"></a>\n          <div class="js_text_editor_link_edit primary edui_mask_edit_meta edui-clickable">\n            <div class="edui_mask_edit_meta_inner">\n              修改            </div>\n          </div>\n          <div class="primary edui_mask_edit_meta edui-clickable">\n            <div class="js_text_editor_link_delete edui_mask_edit_meta_inner">\n              清除            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>';
});define("tpl/media/appmsg_edit/text_editor_toolbar.html.js",[],function(){
return'<div id="js_text_editor_toolbar" class="text_editor_toolbar" style="display: none; user-select: none;" onselectstate="return false;">\n  <div class="text_editor_toolbar_placeholder"></div>\n  <div class="text_editor_toolbar_inner">\n    <!-- 撤销 -->\n    <div id="js_undo" class="text-tool edui-box edui-button edui-for-undo edui-default">\n      <div id="js_text_editor_tool_undo" class="edui-default edui-state-disabled">\n        <div class="edui-button-wrap edui-default">\n          <div unselectable="on" class="edui-button-body edui-default" onmousedown="return false;">\n            <div class="edui-box edui-icon edui-default">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- 重做 -->\n    <div id="js_redo" class="text-tool edui-box edui-button edui-for-redo edui-default">\n      <div id="js_text_editor_tool_redo" class="edui-default edui-state-disabled">\n        <div class="edui-button-wrap edui-default">\n          <div unselectable="on" class="edui-button-body edui-default" onmousedown="return false;">\n            <div class="edui-box edui-icon edui-default">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- 链接 -->\n    <div id="js_link" class="text-tool edui-box edui-button edui-for-link edui-default">\n      <div id="js_text_editor_tool_link" class="edui-default">\n        <div class="edui-button-wrap edui-default">\n          <div unselectable="on" class="edui-button-body edui-default" onmousedown="return false;">\n            <div class="edui-box edui-icon edui-default">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- 取消链接 -->\n    <div id="js_unlink" class="text-tool edui-box edui-button edui-for-unlink edui-default">\n      <div id="js_text_editor_tool_unlink" class="edui-default edui-state-disabled">\n        <div class="edui-button-wrap edui-default">\n          <div unselectable="on" class="edui-button-body edui-default" onmousedown="return false;">\n            <div class="edui-box edui-icon edui-default">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- 小程序 -->\n    <div id="js_weapp" class="text-tool edui-box edui-button edui-for-miniapp edui-default">\n      <div id="js_text_editor_tool_weapp" class="edui-default">\n        <div class="edui-button-wrap edui-default">\n          <div unselectable="on" class="edui-button-body edui-default" onmousedown="return false;">\n            <div class="edui-box edui-icon edui-default">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- 表情 -->\n    <div class="text-tool edui-box edui-button edui-for-mpemotion edui-default js_switch">\n      <div id="js_text_editor_tool_mpemotion" class="edui-default">\n        <div class="edui-button-wrap edui-default">\n          <div unselectable="on" class="edui-button-body edui-default" onmousedown="return false;">\n            <div class="edui-box edui-icon edui-default">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="emotion_wrp js_emotionArea" style="top: 130%; z-index: 999; display: none;"></div>\n  </div>\n  <div id="js_text_editor_toolbar_mask" class="edui_toolbar_mask edui-default"></div>\n</div>';
});define("tpl/media/appmsg_edit/text_editor_word_tips.html.js",[],function(){
return'<em class="share-text__counter">\n  <span class="share-text__counter_current{if curCount>wordlimit} share-text__counter_warn{/if}">{curCount}</span>/{wordlimit}\n</em>';
});define("tpl/media/appmsg_edit/text_editor.html.js",[],function(){
return'<div class="share-text__area">\n    <span class="share-text__wrp">\n        <div class="share-text__input js_editorArea" contenteditable="true" placeholder="{if placeHolder}{placeHolder}{else}可以输入140字以内的推荐语(选填){/if}"></div>\n    </span>\n    {if inlineToolBar}\n    <div id="js_inlineToolBar" style="position: relative;">\n        {if !hideEmotion}\n        <button type="button" style="margin-top: 0;" class="weui-desktop-icon  editor_toolbar_switch js_switch">\n            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-450 -53)" fill="#fff" style="fill:#fff;" fill-rule="evenodd"><circle stroke="#4A4A51" stroke-width="1.5" cx="460" cy="63" r="8"/><circle fill="#4A4A51" cx="457" cy="61" r="1"/><path d="M460 68a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4z" fill="#4A4A51"/><circle fill="#4A4A51" cx="463" cy="61" r="1"/></g></svg>\n        </button>\n        <div class="emotion_wrp js_emotionArea" style="top: 29px; left: -21px; z-index: 999; display: none;">			\n        </div>\n        {/if}\n\n        {if showLinkAndWeapp}\n        <button type="button" style="margin-top: 0;" class="weui-desktop-icon  editor_toolbar_switch" id="js_link">\n            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#4A4A51" fill-rule="evenodd"><path d="M14.057 2.571a3.5 3.5 0 0 1 1.281 4.781l-.75 1.299-1.278-.738.737-1.276a2.05 2.05 0 0 0-3.47-2.18l-.081.13-2.005 3.472a2.051 2.051 0 0 0 .368 2.516l-.743 1.287a3.5 3.5 0 0 1-.866-4.5l2.026-3.51a3.5 3.5 0 0 1 4.781-1.281z"/><path d="M5.526 17.348a3.5 3.5 0 0 1-1.281-4.781l.75-1.3 1.278.739-.725 1.254a2.05 2.05 0 0 0 3.47 2.18l.082-.13 1.989-3.445a2.051 2.051 0 0 0-.368-2.516l.743-1.287a3.5 3.5 0 0 1 .866 4.5l-2.023 3.505a3.5 3.5 0 0 1-4.781 1.28z"/></g></svg>\n        </button>\n        <button type="button" style="margin-top: 0;" class="weui-desktop-icon  editor_toolbar_switch" id="js_weapp">\n            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M10 1.25a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5zm0 1.5a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5zM12.448 5C14.132 5 15.5 6.249 15.5 7.8c0 1.366-1.034 2.513-2.475 2.767l-.143.002c-.431 0-.682-.32-.52-.69a.937.937 0 0 1 .657-.532c.791-.193 1.329-.82 1.329-1.548 0-.883-.832-1.603-1.872-1.603-1.039 0-1.871.72-1.871 1.603v4.402c0 1.55-1.368 2.799-3.053 2.799C5.868 15 4.5 13.751 4.5 12.2c0-1.359 1.06-2.519 2.502-2.74h.116c.326 0 .562.198.562.481 0 .049-.001.071-.006.1a.382.382 0 0 1-.036.11c-.104.245-.37.458-.657.53-.786.193-1.329.816-1.329 1.52 0 .883.832 1.603 1.872 1.603 1.039 0 1.871-.72 1.871-1.603V7.799C9.395 6.25 10.763 5 12.448 5z" fill="#4A4A51" fill-rule="nonzero"/></svg>\n        </button>\n        {/if}\n    </div>\n    {/if}\n    <span class="share-text__append-in js_editorTip">\n    </span>\n</div>\n\n';
});define("common/wx/richEditor/emotionEditor.js",["biz_common/utils/string/html.js","widget/emotion_editor.css","tpl/richEditor/emotionEditor.html.js","common/wx/richEditor/wysiwyg.js","common/wx/richEditor/emotion.js","common/wx/richEditor/undoManager.js","biz_web/utils/upload.js","common/wx/Tips.js","common/qq/Class.js","common/wx/mpEditor/common/eventbus.js","tpl/tooltip.html.js"],function(t,e,i){
"use strict";
function n(t,e){
var i=e;
for(var n in e)i[n]=((e[n]||"")+"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
return t.format(i);
}
function o(t,e){
if(document.documentElement.clientWidth<1169)e.css({
left:t.offset().left-t.width()+4
});else{
var i=$("#js_mp_sidemenu").width();
e.css({
left:t.offset().left-i+t.width()/2
});
}
}
t("biz_common/utils/string/html.js");
var a=wx.T,r=(t("widget/emotion_editor.css"),t("tpl/richEditor/emotionEditor.html.js")),s=t("common/wx/richEditor/wysiwyg.js"),d=t("common/wx/richEditor/emotion.js"),p=t("common/wx/richEditor/undoManager.js"),l=t("biz_web/utils/upload.js"),c=t("common/wx/Tips.js"),m=l.uploadCdnFile,u="##__linebreaktag__##",h=new RegExp(u,"g"),g=t("common/qq/Class.js"),f=t("common/wx/mpEditor/common/eventbus.js"),w="share-text__input_placeholder",_={
isHTML:!0,
wordlimit:500,
hideUpload:!0,
hideEmotion:!1,
hideOprTips:!1,
editorTpl:r,
editorTipsTpl:"",
placeholder:"",
showLinkAndWeapp:!1,
inlineToolBar:!1,
autoFocus:!0
},y=1,v=g.declare({
init:function(t,e){
var i=this;
this.opt=$.extend(!0,{},_,e),this.opt.formItemsOpt=e.formItemsOpt,e=this.opt,i.selector$=t,
e.gid=y++,i.selector$.html(a(e.editorTpl,e)),i.emotion=new d((this.opt.$toolbar||t).find(".js_emotionArea")),
i.wysiwyg=new s(t.find(".js_editorArea"),{
showLinkAndWeapp:i.opt.showLinkAndWeapp,
init:function(){
i.updateWordLimitTips("");
},
textFilter:function(t,e){
return t=i.emotion.getEmotionText(t).replace(/<br.*?>/gi,"\n").replace(/\n/g,u),
t=i.opt.showLinkAndWeapp?i.filterContentWithLinkNWeapp(t):t.replace(/<.*?>/g,""),
t=t.replace(h,"\n"),i.opt.showLinkAndWeapp||e||(t=t.html(!1)),t;
},
nodeFilter:function(t){
var e="";
return"IMG"===t.nodeName.toUpperCase()?e=t:i.opt.showLinkAndWeapp&&"A"===t.nodeName.toUpperCase()&&(e=t),
e;
},
change:function(){
var n=i.getContentForTextPage(),o=n;
i.opt.showLinkAndWeapp&&(n=n.replace(/<(\/?)(?=((a(\s|>))|(\/a))).*?>/g,""),n=n.html(!1));
{
var a=(e.wordlimit-n.length,t.find(".js_editorArea"));
t.find(".js_editorTip");
}
a.attr("placeholder")&&(o?a.removeClass(w):a.addClass(w)),i.updateWordLimitTips(),
e.onChange&&"function"==typeof e.onChange&&e.onChange(n);
}
}),this.opt.hideUpload||(i.upload=m({
container:t.find(".js_upload"),
type:2,
multi:!1,
onComplete:function(t,e,n,o){
if(o&&o.base_resp&&0==o.base_resp.ret){
var a=o.content;
c.suc("上传成功"),i.wysiwyg.insertHTML(a);
}
}
})),this.opt.$toolbar&&(i.undoManager=new p),i._initEvent(),i.insertHTML(e.text),
!e.autoFocus&&i.blur();
},
_initEvent:function(){
var t,e,i=this,n=this,r=$(".js_switch",this.opt.$toolbar||this.selector$),s=$(".js_editorArea",this.selector$),d=this.emotion,p=this.wysiwyg,l=window.UE&&window.UE.dom&&window.UE.dom.domUtils,m=$("#js_undo",this.opt.$toolbar||this.selector$),u=$("#js_redo",this.opt.$toolbar||this.selector$),h=$("#js_link",this.opt.$toolbar||this.selector$),g=$("#js_weapp",this.opt.$toolbar||this.selector$),w=$("#js_unlink",this.opt.$toolbar||this.selector$);
n.onToolHover(r,"表情"),d.click(function(t){
return n.opt.hideEmotion?!1:(p.insertHTML(d.getEmotionHTML(t)),n.saveContent&&n.saveContent(),
d.hide(),!1);
}),d.hide(),r.click(function(){
return n.opt.hideEmotion?!1:void($(this).parents(".js_editor").hasClass("disabled")||(o(r,d.selector$),
d.show()));
}),$(document).on("click","*",function(t){
if(!n.opt.hideEmotion){
var i=$(t.target),o=i.filter(".js_switch"),a=i.filter(".js_emotion_i"),r=i.parents(".js_switch"),s=i.filter(".emotions_item");
o.length||a.length||s.length||r.length||d.hide(),n.opt.showLinkAndWeapp&&e&&e.hide();
}
}),n.onToolHover(h,"超链接"),h.click(function(){
if(!i.opt.showLinkAndWeapp)return!1;
var t=i.wysiwyg.getSelectionRange(),e=t.startContainer;
e=1===e.nodeType?e:e.parentNode;
var o=s.find(t.startContainer).length>0||$(t.startContainer).hasClass("js_editorArea"),a=s.find(t.endContainer).length>0||$(t.endContainer).hasClass("js_editorArea");
o&&a||(i.wysiwyg.focus(),i.wysiwyg.setCursorToEnd(),t=i.wysiwyg.getSelectionRange());
var r="";
r=l&&(r=l.findParentByTagName(t.startContainer,"a",!0))&&!l.isInNodeEndBoundary(t,e)?r.text:i.wysiwyg.getSelectionText(),
f.fireEvent("showLinkDialog",{
type:["innerlink"],
linkinfo:{
title:r
}
},function(e){
"undefined"!=typeof e&&(console.log(e),n.__insertLink(e,t),n.saveContent&&n.saveContent());
});
}),n.onToolHover(g,"小程序"),g.click(function(){
if(!i.opt.showLinkAndWeapp)return!1;
var t=i.wysiwyg.getSelectionRange(),e=s.find(t.startContainer).length>0||$(t.startContainer).hasClass("js_editorArea"),o=s.find(t.endContainer).length>0||$(t.endContainer).hasClass("js_editorArea");
e&&o||(i.wysiwyg.focus(),i.wysiwyg.setCursorToEnd(),t=i.wysiwyg.getSelectionRange());
var a=void 0,r=void 0,d=!1;
l&&(r=l.findParentByTagName(t.startContainer,"a",!0))&&r.getAttribute("data-miniprogram-appid")&&(a={
type:"text",
service_type:r.getAttribute("data-miniprogram-servicetype")||"0",
appid:r.getAttribute("data-miniprogram-appid"),
path:r.getAttribute("data-miniprogram-path")||"",
nickname:r.getAttribute("data-miniprogram-nickname")||"",
content:r.innerText||""
},d=!0),f.fireEvent("showWeappDialog",{
weappinfo:a,
type:["text"]
},function(e){
"undefined"!=typeof e&&(n.__insertWeapp(e,t,d),n.saveContent&&n.saveContent());
});
}),this.opt.$toolbar&&!function(){
var o=function(){
return n.opt.showLinkAndWeapp?void(t&&(t.data("miniprogramAppid")?g.click():h.click())):!1;
},r=function(){
return n.opt.showLinkAndWeapp?void(t&&($(document.createTextNode(t.text())).insertBefore(t),
t.remove(),e&&e.hide(),w.find("#js_text_editor_tool_unlink").addClass("edui-state-disabled"),
n.saveContent())):!1;
},d=function(){
var i=n.wysiwyg.getSelectionRange(),o=s.find(i.startContainer).length>0||$(i.startContainer).hasClass("js_editorArea"),r=s.find(i.endContainer).length>0||$(i.endContainer).hasClass("js_editorArea");
if(o&&r&&l&&(t=l.findParentByTagName(i.startContainer,"a",!0))){
if(t=$(t),e){
e.show();
var d=e.find("#js_link_place"),p=null!=t.data("miniprogramNickname")?t.data("miniprogramNickname"):t.attr("href");
$(a('<a id="js_link_place" class="edui_mask_edit_meta" {if !isWeapp}target="_blank"{/if} href="{url}" {if !isWeapp}title="{url}"{/if}>{txt}</a>',{
txt:p.substring(0,20)+(p.length>20?"...":""),
url:t.attr("href"),
isWeapp:t.data("miniprogramAppid")
})).insertBefore(d),d.remove(),e.find(".edui-popup").css("top",t.offset().top-e.find(".edui-popup").height()).css("left",t.offset().left);
}
w.find("#js_text_editor_tool_unlink").removeClass("edui-state-disabled");
}else w.find("#js_text_editor_tool_unlink").addClass("edui-state-disabled");
},p=function(){
n.undoManager.hasUndo?m.find("#js_text_editor_tool_undo").removeClass("edui-state-disabled"):m.find("#js_text_editor_tool_undo").addClass("edui-state-disabled"),
n.undoManager.hasRedo?u.find("#js_text_editor_tool_redo").removeClass("edui-state-disabled"):u.find("#js_text_editor_tool_redo").addClass("edui-state-disabled");
};
i.opt.editorLinkPopupTpl&&(e=$(i.opt.editorLinkPopupTpl),e.hide(),e.find(".js_text_editor_link_edit").click(o),
e.find(".js_text_editor_link_delete").click(r),$(document.body).append(e)),n.saveContent=function(){
n.undoManager.save(n.getContent()),p();
};
var c=void 0,f=void 0;
$(document).on("selectionchange",function(){
return n.opt.showLinkAndWeapp?(e&&e.hide(),c&&clearTimeout(c),void(c=setTimeout(d,300))):!1;
}),n.selector$.on("keyup",function(){
f&&clearTimeout(f),f=setTimeout(function(){
return n.saveContent();
},300);
}),n.onToolHover(w,"取消超链接"),w.click(r),n.onToolHover(m,"撤销"),m.click(function(){
n.undoManager.hasUndo&&(n.setContent(n.undoManager.undo()),n.wysiwyg.setCursorToEnd()),
p();
}),n.onToolHover(u,"重做"),u.click(function(){
n.undoManager.hasRedo&&(n.setContent(n.undoManager.redo()),n.wysiwyg.setCursorToEnd()),
p();
}),n.undoManager.onUndump(function(){
setTimeout(function(){
return n.saveContent();
}),p();
});
}(),this.selector$.find(".js_editorArea").on("focus",function(){
n.opt.ueditor&&n.opt.ueditor.disableToolbar(),n.opt.onFocus&&n.opt.onFocus.call(n);
}).on("click",function(){
n.opt.formItemsOpt&&n.opt.formItemsOpt.guideWords.readonly&&n.opt.formItemsOpt.guideWords.readonlyTips&&c.err(n.opt.formItemsOpt.guideWords.readonlyTips);
}).on("blur",function(){
n.opt.onBlur&&n.opt.onBlur.call(n);
});
},
updateWordLimitTips:function(t){
t=void 0!==t?t:this.getContent();
var e=this.opt,i=this.selector$.find(".js_editorTip");
e.showLinkAndWeapp&&(t=t.replace(/<a\s+\w[^>]*>([\s\S]*?)<\/a>/g,"$1"));
var n=e.wordlimit-t.length;
i.html(e.editorTipsTpl?a(e.editorTipsTpl,{
wordlimit:e.wordlimit,
curCount:t.length
}):0>n?"已超出<em{cls}>{l}</em>字".format({
l:-n,
cls:' class="warn"'
}):"还可以输入<em>{l}</em>字".format({
l:n
}));
},
onToolHover:function(e,i){
var n=this,o=$(document.body).find(".tooltip");
o.length||(o=$(a(t("tpl/tooltip.html.js"),{
content:""
})).hide(),$(document.body).append(o)),e.mouseenter(function(){
n.opt.showLinkAndWeapp&&(e.children(".edui-default").hasClass("edui-state-disabled")||e.children(".edui-default").addClass("edui-state-hover"),
o.show(),o.children(".tooltip_inner").text(i),o.css("top",e.offset().top-o.height()-6).css("left",e.offset().left-(o.width()-e.width())/2));
}),e.mouseleave(function(){
n.opt.showLinkAndWeapp&&(e.children(".edui-default").removeClass("edui-state-hover"),
o.hide());
});
},
setContent:function(t){
t=t||"",this.opt.showLinkAndWeapp||(t=t.html(!0)),t=this.opt.linebreak?t.replace(/\n/g,"<br>"):t,
t=this.wysiwyg.emojiFormat(t),this.wysiwyg.setContent(t);
},
insertHTML:function(t){
t=t||"",this.wysiwyg.insertHTML(t);
},
getContent:function(){
var t=this.wysiwyg.getContent();
return t="string"==typeof t?t.trim():"";
},
getContentForTextPage:function(){
var t=this.wysiwyg.getContent(!0);
return t;
},
getHTML:function(){
var t=this.wysiwyg.getHTML().html(!1);
return"string"==typeof t?t.trim():"";
},
focus:function(){
this.wysiwyg.focus();
},
blur:function(){
this.wysiwyg.blur();
},
setWordlimit:function(t){
"number"==typeof t&&(this.opt.wordlimit=t,this.updateWordLimitTips());
},
setCursorToEnd:function(){
this.wysiwyg.setCursorToEnd();
},
filterContentWithLinkNWeapp:function(t){
t=t.split(/(<a\s+\w[^>]*>)(.*?)(<\/a>)/);
for(var e=function(t,e){
var i=t.match(new RegExp(e+"\\s*=\\s*[\"']?([^\"'\\s>]+)[\"']?"));
return i&&i[1];
},i=function(t){
return/^https?:\/\/mp\.weixin\.qq\.com\/(s\?|s\/|mp\/appmsg\/show\?)/.test(t)?!0:/^https?:\/\/mp\.weixin\.qq\.com\/mp\/qa\?/.test(t)?!0:/^https?:\/\/mp\.weixin\.qq\.com\/mp\/homepage\?/.test(t)?!0:/^https?:\/\/mp\.weixin\.qq\.com\/mp\/appmsgalbum\?/.test(t)?!0:!1;
},n=void 0,o=0;o<t.length;o++)if(o%4===1){
n=!1;
var a=e(t[o],"href");
i(a)&&(n=!0);
var r='<a target="_blank"',s=e(t[o],"data-miniprogram-appid");
if(s)r+=' class="weapp_text_link" data-miniprogram-type="text" data-miniprogram-appid="'+s+'" data-miniprogram-path="'+(e(t[o],"data-miniprogram-path")||"")+'" data-miniprogram-nickname="'+(e(t[o],"data-miniprogram-nickname")||"")+'" data-miniprogram-servicetype="'+(e(t[o],"data-miniprogram-servicetype")||"0")+'"',
n=!0;else if(n){
var d=e(t[o],"data-itemshowtype");
d&&(r+=' data-itemshowtype="'+d+'"');
}
r+=' href="'+(n?a:"javascript:void 0")+'"',t[o]=n?r+">":"";
}else o%4===3?!n&&(t[o]=""):t[o]=t[o].replace(/<.*?>/g,"");
return t.join("");
},
disableAutoUrlDetect:function(){
var t=this;
$(".js_editorArea",this.selector$).on("paste",function(e){
e.preventDefault();
var i="";
i=window.clipboardData&&clipboardData.setData?window.clipboardData.getData("text")||"":(e.originalEvent||e).clipboardData.getData("text/plain")||"";
var n=t.wysiwyg.getSelectionRange();
n.collapsed||n.deleteContents(),t.wysiwyg.insertHTML(i);
});
},
dumpUndoManager:function(){
return this.undoManager&&this.undoManager.dump();
},
undumpUndoManager:function(t){
this.undoManager&&this.undoManager.undump(t);
},
__insert:function(t){
var e=t.type,i="",o={
type:e,
servicetype:t.service_type,
appid:t.appid,
nickname:t.nickname,
avatar:t.headimg_url,
title:t.title,
imageUrl:t.cardImage,
path:t.path,
content:t.content
};
"text"==e&&(i='<a class="weapp_text_link" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="" data-miniprogram-type="{type}" data-miniprogram-servicetype="{servicetype}">{content}</a>'),
i=n(i,o),console.log("execCommand",i),this.wysiwyg.insertHTML(i);
},
__insertWeapp:function(t,e,i){
var n={
"class":"weapp_text_link",
href:"javascript:void 0",
textValue:t.content,
"data-miniprogram-appid":t.appid,
"data-miniprogram-path":t.path,
"data-miniprogram-nickname":t.nickname,
"data-miniprogram-type":t.type,
"data-miniprogram-servicetype":t.service_type
};
this.wysiwyg.insertWeapp(n,e,i);
},
__insertLink:function(t,e){
this.wysiwyg.insertLink(t,e);
},
hasOverflowed:function(){
return this.getContent().length>this.opt.wordlimit;
}
});
i.exports=v;
});define("tpl/uploader.html.js",[],function(){
return'<li id="uploadItem{id}" data-status="{className}" class="upload_file">\n    <strong class="upload_file_name">{fileName}</strong>\n    <span class="upload_file_size">({size})</span>\n    <div class="progress_bar"><div class="progress_bar_thumb" style="width:0%"></div></div>\n    <a href="javascript:;" data-id="{id}" class="upload_file_cancel js_cancel">取消</a>\n</li>\n';
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/productDropdown.js",["biz_web/widget/dropdown.css","tpl/media/product_dropdown.html.js","tpl/media/product_dropdown_item.html.js","common/wx/Tips.js"],function(e){
"use strict";
function t(e){
e.render&&_typeof(e.render)&&(e.renderHtml="",$.each(e.data,function(t,a){
e.renderHtml+=e.render(a);
})),e=$.extend(!0,{},d,e);
var t=this;
if(t.container=$(e.container),t.container.addClass(e.search?o+" search":o),this.isDisabled=e.disabled,
e.disabled&&t.container.addClass("disabled"),t.opt=e,e.itemHtml=template.compile(n)(e),
t.container.html(template.compile(a)(e)),t.bt=t.container.find(".jsDropdownBt"),
t.dropdown=t.container.find(".jsDropdownList"),t.addform=t.container.find(".js_addform"),
$.each(e.data,function(e,a){
$.data(t.dropdown.find(".jsDropdownItem")[e],"value",a.value),$.data(t.dropdown.find(".jsDropdownItem")[e],"name",a.name),
$.data(t.dropdown.find(".jsDropdownItem")[e],"item",a);
}),"undefined"!=typeof e.index&&0!==e.data.length&&(t.bt.find(".jsBtLabel").text(e.data[e.index].name||e.label),
t.value=e.data[e.index].value),t.hideDropdowns=function(e){
t.container.find(e.target).length||t.hideMenu();
},t.bt.on("click",function(){
t.hideMenu(),t.isDisabled||t.showMenu();
}),e.search&&t.bt.find(".jsBtLabel").on("keyup",function(a){
if(!t.isDisabled){
var n=$(this);
if(13==a.keyCode)if(t.value){
var i=n.data("name"),d=n.data("index");
if(n.removeClass("error"),t.hideMenu(),n.find("div").remove(),e.callback&&"function"==typeof e.callback){
var o=t.value;
e.callback(o,i,d);
}
}else n.find("div").remove();else{
var s=n.text().trim(),r=[];
t.value=null,n.data("name",""),n.data("index",""),t.dropdown.show().find(".jsDropdownItem").each(function(){
var e=$(this);
e.hasClass("js_empty")||(e.data("name").indexOf(s)>-1?(e.parent().show(),r.push({
name:e.data("name"),
value:e.data("value"),
index:e.data("index")
})):e.parent().hide());
}),0==r.length?(t.dropdown.find(".js_empty").text("未找到"+s).show(),n.addClass("error")):(t.dropdown.find(".js_empty").hide(),
n.removeClass("error"),1==r.length&&r[0].name==s&&(n.data("name",r[0].name),n.data("index",r[0].index),
t.value=r[0].value));
}
}
}).on("blur",function(){
if(!t.isDisabled){
var a=$(this);
t.value?$(this).html()!=$(this).data("name")&&($(this).data("name",""),$(this).data("index",""),
a.addClass("error"),t.value=null):""!=a.html()?a.addClass("error"):a.html(e.label).removeClass("error");
}
}).on("focus",function(){
if(!t.isDisabled){
var a=$(this),n=$(this).html().trim();
n==e.label&&a.html("").removeClass("error"),""==n&&a.removeClass("error"),t.showMenu();
}
}),e.canadd){
var s=t.addform;
s.find(".js_btn").on("click",function(){
if(!t.isDisabled){
var e=t.container.find(".js_addform");
e.find(".js_btn").hide(),e.find(".js_additem").show(),e.parent().scrollTop(e.parent().scrollTop()+60);
}
}),s.find(".js_cancel").on("click",function(){
if(!t.isDisabled){
var e=t.container.find(".js_addform");
e.find(".js_additem").hide(),e.find(".js_btn").show();
}
}),s.find("input").on("click",function(){}),s.find("input").on("keyup",function(e){
var a=$(this),n=a.val().trim(),i=n.bytes(),d=(i+i%2)/2,o=a.siblings(".js_addnum");
o.text(d+"/15"),d>15?!o.hasClass("error")&&o.addClass("error"):(o.hasClass("error")&&o.removeClass("error"),
13==e.keyCode&&t.addform.find(".js_sure").trigger("click"));
}),s.find(".js_sure").on("click",function(){
if(!t.isDisabled){
var a=t.container.find(".js_addform"),n=a.find(".js_addnum");
if(n.hasClass("error"))i.err("超过长度限制");else{
var d=a.find("input").val();
d||i.err("类目不能为空");
var o=e.add(d,t);
o===!0&&t.addform.find(".js_cancel").trigger("click");
}
}
});
}
t.container.on("click",".js_del",function(a){
if(!t.isDisabled){
var n=$(this);
e.del(n.attr("data-value"),n.attr("data-name"),n.attr("data-index"),n);
}
return a.stopPropagation(),a.preventDefault(),!1;
}),$(document).on("click",t.hideDropdowns),t.dropdown.on("click",".jsDropdownItem",function(a){
if(!t.isDisabled&&!$(a.target).hasClass("js_empty")&&!$(a.target).hasClass("js_del")){
var n=$(this).data("value")+"",i=$(this).data("name")+"",d=$(this).data("index");
if((!t.value||t.value&&t.value!=n)&&(t.value=n,t.name=i,e.callback&&"function"==typeof e.callback)){
var o=e.callback(n,i,d,$(this).data("item"))||i;
e.search?t.bt.find(".jsBtLabel").text(o).data("name",i).data("index",d).removeClass("error"):t.bt.find(".jsBtLabel").text(o);
}
t.hideMenu();
}
});
}
e("biz_web/widget/dropdown.css");
var a=e("tpl/media/product_dropdown.html.js"),n=e("tpl/media/product_dropdown_item.html.js"),i=e("common/wx/Tips.js"),d={
label:"请选择",
data:[],
callback:$.noop,
render:$.noop,
delay:500,
disabled:!1,
search:!1,
canadd:!1,
add:$.noop,
del:$.noop
},o="dropdown_menu";
return t.prototype={
selected:function(e){
var t=this;
if("number"==typeof e){
if(this.opt.data&&this.opt.data[e]){
var a=this.opt.data[e].name,n=this.opt.data[e].value;
this.dropdown.find(".jsDropdownItem:eq("+e+")").trigger("click",n),this.bt.find(".jsBtLabel").text(a);
}
}else $.each(this.opt.data,function(i,d){
return e==d.value||e==d.name?(t.dropdown.find(".jsDropdownItem:eq("+i+")").trigger("click",n),
t.bt.find(".jsBtLabel").text(a),!1):void 0;
});
return this;
},
hideMenu:function(){
this.dropdown.hide(),this.container.removeClass("open");
},
showMenu:function(){
this.dropdown.show(),this.container.addClass("open");
},
hide:function(){
this.container.hide();
},
show:function(){
this.container.show();
},
reset:function(){
return this.bt.find(".jsBtLabel").text(this.opt.label),this.value=null,this;
},
add:function(e){
this.opt.data.push(e);
var t=template.compile(n)({
data:[e],
loading_img:this.opt.loading_img
});
this.container.find(".js_empty").before(t);
},
hidegreater:function(e){
var t=this;
return"number"==typeof e&&t.opt.data&&t.opt.data[e]&&(t.dropdown.find(".jsDropdownItem").show(),
t.dropdown.find(".jsDropdownItem:gt("+e+")").hide()),this;
},
destroy:function(){
return $(document).off("click",this.hideDropdowns),this.isDisabled&&this.container.removeClass("disabled"),
this.container.children().remove(),this.container.off(),this;
},
enable:function(){
return this.hideMenu(),this.isDisabled=!1,this.container.removeClass("disabled"),
this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!0),this;
},
disable:function(){
return this.isDisabled=!0,this.container.addClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!1),
this;
}
},t;
});define("tpl/media/product_category_frame.html.js",[],function(){
return'<span id="category_{index}"></span>\n<input type="hidden" id="category_{index}_hidden" name="category_{index}_hidden" value="{value}" />';
});define("tpl/cardticket/card_quantity.html.js",[],function(){
return'<div class="pop_store">\n	{if !data.is_sns_card}\n	{if data.quantity==0}\n	<p class="frm_msg fail" style="display:block;">库存为0，请先增加库存</p>\n	{/if}\n	<!-- 普通卡券增减库存 -->\n	<div class="pop_card_normal">\n		<!--增减库存-->\n		{if setquantity}\n		<!-- 这一部分貌似要废弃掉 -->\n		<div class="frm_control_group">\n			<div class="frm_controls">\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">增加</span>\n					<input type="radio" name="isadd" checked value="1" class="frm_radio js_quantity_type">\n				</label>\n				<label class="frm_radio_label">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">减少</span>\n					<input type="radio" name="isadd" value="0" class="frm_radio js_quantity_type">\n				</label>\n			</div>\n		</div>\n		{/if}\n		<div class="frm_control_group">                        \n			<div class="frm_controls">\n				<div class="frm_controls_hint group">\n					<span class="frm_input_box"><input type="text" class="frm_input js_value"></span>\n					<span class="frm_hint">份</span>\n				</div>\n				<p class="frm_tips fail">库存不能少于1</p>\n			</div>\n		</div>\n		<!--增减库存 end-->\n	</div>\n	{else}\n	<!-- 朋友券增加库存 -->\n	<!-- message fail-->\n	<div class="js_state_5 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n    </div>\n	<i class="loading js_satate_0 js_state_quantity" style="display:none"></i>\n	<div class="js_state_1 js_state_quantity pop_card_quantity" style="display:none">\n		<div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n	</div>\n	<!-- 朋友券 确认预览 -->\n	<div class="js_state_2 js_state_quantity pop_card_quantity" style="display:none">\n		<div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n	</div>\n	<!-- message success-->\n	<div class="js_state_3 js_state_quantity pop_card_quantity page_msg small msg_success default" style="display:none">\n        <div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n    </div>\n	<!-- message success-->\n	<div class="js_state_9 js_state_quantity pop_card_quantity page_msg small msg_success default" style="display:none">\n        <div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n    </div>\n	<!-- message fail-->\n	<div class="js_state_4 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n    </div>\n    <!-- 子商户库存提示-->\n	<div class="js_state_8 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n    </div>\n	<!-- message fail-->\n	<div class="js_state_7 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <div class="msg_content">\n                <br>\n                <h4> 朋友的券功能将在近期暂停使用，并进行玩法升级 </h4>\n                <p> 目前已暂停券点充值、新券创建及更改库存，敬请留意朋友的券后续动态 </p>\n                <br>\n            </div>\n        </div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_default js_cancel">确定</a>\n        </div>\n    </div>\n    {/if}\n</div>\n';
});define("tpl/cardticket/choose_card_type.html.js",[],function(){
return'{if is_sns_card}<div class="proc_put_tick">\n{if show_all_card}\n	<div class="choose_card_normal">\n	    <div class="frm_control_group frm_card_normal">\n	        <label class="frm_radio_label selected">\n	            <i class="icon_radio"></i>\n	            <span class="lbl_content">我要创建普通优惠券</span>\n	            <input type="radio" value="2" class="frm_radio js_is_friend">\n	        </label>\n	        <div class="frm_tips">传统优惠券的电子版，可在微信中收纳、传播和使用。只可领取到我的卡券自己使用</div>\n	        <div class="frm_control_group radio_row js_is_friend_type js_is_friend_type_2" style="display:none">\n				<div class="frm_controls frm_vertical_lh">\n					{if flag==0}\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">折扣券</span>\n						<input type="radio" value="2" class="frm_radio js_card_type">\n		                <p class="frm_tips">可为用户提供消费折扣{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">代金券</span>\n						<input type="radio" value="4" class="frm_radio js_card_type">\n		                <p class="frm_tips">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">兑换券</span>\n						<input type="radio" value="3" class="frm_radio js_card_type">\n						<p class="frm_tips">可为用户提供消费送赠品服务</p>\n					</label>\n					{/if}\n					<label class="frm_radio_label selected">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">团购券</span>\n						<input type="radio" value="1" class="frm_radio js_card_type">\n						<p class="frm_tips">可为用户提供团购套餐服务</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">优惠券</span>\n						<input type="radio" value="0" class="frm_radio js_card_type">\n						<p class="frm_tips">{if flag==0}即“通用券”，建议当以上四种无法满足需求时采用{else}即“通用券”，建议当团购券无法满足需求时适用{/if}</p>\n					</label>\n				</div>\n			</div>\n	    </div>\n    </div>\n{/if} \n	<div class="choose_card_friend">\n	    <div class="frm_control_group">\n	        <label class="frm_radio_label ">\n	            <i class="icon_radio"></i>\n	            <span class="lbl_content">创建朋友共享的优惠券</span> \n	            <input type="radio" value="1" checked class="frm_radio js_is_friend">\n	        </label>\n	        <div class="frm_tips js_is_friend_tips js_is_friend_support_tips">朋友的券玩法升级中，当前暂停创建，请创建其他类型卡券</div>\n	        <div style="display:none;" class="frm_tips js_is_friend_tips js_is_friend_view_mode2_tips">所选子商户类目不支持制作朋友的券，<a target="_blank" href="/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#0dot2">查看类目要求</a></div>\n	        <div style="display:none;" class="frm_tips js_is_friend_tips js_is_friend_view_mode1_tips">当前商户类目不支持制作朋友的券，<a target="_blank" href="/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#0dot2">查看类目要求</a></div>\n	    </div>\n	</div>   \n</div>\n{else}<div class="proc_put_tick js_is_friend_type_2">\n<div class="choose_card_normal">\n	<div class="frm_control_group radio_row frm_card_normal">\n		<label for="" class="frm_label">选择你要创建的卡券类型</label>\n		<div class="frm_controls frm_vertical_lh">\n		{if flag==0}\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">折扣券</span>\n				<input type="radio" value="2" class="frm_radio js_card_type">\n                <p class="frm_tips">可为用户提供消费折扣{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">代金券</span>\n				<input type="radio" value="4" class="frm_radio js_card_type">\n                <p class="frm_tips">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">兑换券</span>\n				<input type="radio" value="3" class="frm_radio js_card_type">\n				<p class="frm_tips">可为用户提供消费送赠品服务</p>\n			</label>\n		{/if}\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">团购券</span>\n				<input type="radio" value="1" class="frm_radio js_card_type">\n				<p class="frm_tips">可为用户提供团购套餐服务</p>\n			</label>\n		\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">优惠券</span>\n				<input type="radio" value="0" class="frm_radio js_card_type">\n				<p class="frm_tips">{if flag==0}即“通用券”，建议当以上四种无法满足需求时采用{else}即“通用券”，建议当团购券无法满足需求时适用{/if}</p>\n			</label>\n		</div>\n	</div>\n</div>\n</div>\n{/if}';
});define("cardticket/select_sub_merchant_table.js",["tpl/cardticket/select_sub_merchant_table.html.js","common/wx/popup.js","common/wx/Cgi.js","common/wx/pagebar.js","common/wx/Tips.js","biz_web/ui/checkbox.js","page/cardticket/dialog_choose_sub_store.css","cardticket/common_template_helper.js"],function(t){
"use strict";
function e(t){
var e,a=t.opt;
e=t.$container,e.html(c({
loading:!0,
param:a.param
})),a.resetPosition&&a.resetPosition();
}
function a(t,a){
var o=a.opt,r=$.extend(!0,{
action:"list",
offset:o.pageInfo.begin,
limit:o.pageInfo.count
},o.param);
f=!0,e(a),l.get({
url:o.url||"/merchant/cardhelpmakesend",
data:r,
complete:function(){
f=!1;
}
},function(t){
if(0==t.base_resp.ret||-1==t.base_resp.ret){
var e=$.parseJSON(t.bind_list),r=$.parseJSON(t.sub_merchant_remain_quota);
if(o.data=e.List,o.remain_data=r.list,o.is_sns_card)for(var i=0;i<e.List.length;i++){
var s=e.List[i];
s.can_not_use_sns_card=!p.can_category_use_sns_card(s.PrimaryCategoryId,s.SecondaryCategoryId);
}
o.pageInfo.total_count=t.total_count||0,n(o.pageInfo,a);
}else l.show(t);
});
}
function n(t,e){
for(var a,n=e.opt,s=0;s<n.data.length;s++)$.extend(n.data[s],n.remain_data[s]);
return a=e.$container,a.html(c(n)),n.resetPosition&&n.resetPosition(),n.data.length?(e.pagebar=null,
i(n.pageInfo,e),r(e,n.data,a),o(e,a),void(n.getDataComplete&&n.getDataComplete(n.data))):(r(e,n.data,a),
void o(e,a));
}
function o(t,e){
function n(e){
o.param.keyword=e,a(o.pageInfo,t);
}
var o=t.opt,r=$(".js_search_input",e).on("keyup",function(t){
var e=$.trim($(this).val());
wx.isHotkey(t,"enter")&&n(e);
});
$(".js_search_btn",e).click(function(){
var t=$.trim(r.val());
n(t);
});
}
function r(t){
var e=t.opt;
$(".js_merchant_item").click(function(){
var t=$(this).hasClass("js_merchant_disabled");
t||($(".js_merchant_item").removeClass("selected"),$(this).addClass("selected"));
}),e.resetPosition&&e.resetPosition();
}
function i(t,e){
var n=t.total_count,o=e.$container;
if(t.count&&n>t.count){
var r=t.begin/t.count;
e.pagebar=new u({
container:$(".js_pager",o),
first:!1,
last:!1,
midRange:5,
initShowPage:r+1,
perPage:t.count,
totalItemsNum:n,
callback:function(n){
if(f)return!1;
var o=n.currentPage;
return o!=r+1&&(t.begin=(o-1)*t.count,a(t,e)),!0;
}
});
}
}
function s(t,e){
for(var a=0;a<t.length;a++)if(t[a].Id==e)return t[a];
return null;
}
{
var c=t("tpl/cardticket/select_sub_merchant_table.html.js"),l=(t("common/wx/popup.js"),
t("common/wx/Cgi.js")),u=t("common/wx/pagebar.js"),m=t("common/wx/Tips.js");
t("biz_web/ui/checkbox.js");
}
t("page/cardticket/dialog_choose_sub_store.css");
var p=t("cardticket/common_template_helper.js");
c=template.compile(c);
var _={
pageInfo:{
begin:0,
count:12,
total_count:0
},
param:{
status_list:1,
keyword:""
},
url:null,
data:null,
is_sns_card:!1,
selectComplete:$.noop,
onHide:$.noop
},d=function(t){
this.opt=$.extend(!0,{},_,t),this.init();
},f=!1;
return d.prototype={
init:function(){
var t=this.opt,e=this;
e.$container=$(t.container),t.data?n(t.pageInfo,e):a(t.pageInfo,e);
},
get:function(){
return this.$container;
},
selectedValue:function(){
var t=this.opt;
if(!t.data||!t.data.length)return!1;
var e=this.get(),a=e.find(".js_merchant_item.selected");
if(!a.length)return m.err("请选择子商户"),!1;
var n=a.attr("data-id"),o=s(t.data,n);
return o;
}
},d;
});define("cardticket/add/msg_operate_type_html.js",["tpl/media/cardmsg.html.js"],function(a){
"use strict";
var s={
1:'{if msg_operation.appmsg_title}<div class="appmsg single">                <div class="appmsg_content">                    <div class="appmsg_info">                        <em class="appmsg_date">{msg_operation.appmsg_update_time}</em>                    </div>                    <div class="appmsg_item">                        <h4 class="appmsg_title">                            <a href="{msg_operation.url}" target="_blank">{msg_operation.appmsg_title}</a>                        </h4>                        <div class="appmsg_thumb_wrp" style="background-image:url(\'{msg_operation.appmsg_cover}\')"></div>                        <p class="appmsg_desc">{msg_operation.appmsg_digest}</p>                    </div>                    {if msg_operation.appmsg_type == 10}<a href="" class="edit_mask preview_mask js_preview" data-msgid="{msg_operation.appmsg_appmsgid}" data-idx="{msg_operation.appmsg_itemidx-1}">                        <div class="edit_mask_content">                            <p class="">                                预览文章                            </p>                        </div>                        <span class="vm_box"></span>                    </a>{/if}                </div>             </div>             {else}            <a href="{msg_operation.url}" target="_blank">{msg_operation.text}</a>             {/if}',
2:'<a target="_blank" href="{msg_operation.url}">{msg_operation.url}</a>',
5:a("tpl/media/cardmsg.html.js"),
4:'<a target="_blank" href="{msg_operation.url}">{msg_operation.url}</a>',
0:""
};
return s;
});