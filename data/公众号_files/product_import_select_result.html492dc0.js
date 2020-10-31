function _typeof(t){
return t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t;
}
define("media/base_article.js",["tpl/author/authority_warn.html.js","common/wx/mpEditor/utils.js","author/author_popover.js","common/wx/popover.js","media/common.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/mpEditor/common/base_class.js","media/article_data_key.js","common/wx/mpEditor/text_editor.js","tpl/media/appmsg_edit/article_list_item.html.js","common/wx/comm_store.js","common/wx/comm_report.js","media/get_article_structure.js","common/wx/const.js","common/wx/utils.js","pages/media/modules/video_status/video_status.js"],function(t){
"use strict";
var e=t("tpl/author/authority_warn.html.js"),i=t("common/wx/mpEditor/utils.js"),r=t("author/author_popover.js"),a=t("common/wx/popover.js"),n=(t("media/common.js"),
t("biz_common/jquery.validate.js")),s=t("common/wx/Tips.js"),o=t("common/wx/mpEditor/plugin/remoteimg.js"),d=n.rules,_=t("common/wx/mpEditor/common/base_class.js"),c=t("media/article_data_key.js"),l=t("common/wx/mpEditor/text_editor.js"),h=t("tpl/media/appmsg_edit/article_list_item.html.js"),u=t("common/wx/comm_store.js"),p=t("common/wx/comm_report.js"),f=t("media/get_article_structure.js"),m=f.getArticleStructure,g=f.getArticleStructureNoAd,v=f.getArticleStructureForSelfCheck,w=t("common/wx/const.js"),y=(w.moreReadModeMap,
w.DEFAULT_AD_TEXT),j=w.NO_AD_TEXT,b=w.videoPasterMinPlayLength,x=w.insertAdModeMap,k=t("common/wx/utils.js"),C=k.formatVideoTime,D=["一","二","三","四","五","六","七","八","九","十"],T={
submitKey:c.getSubmitKey()
},S={
0:"文章设置",
9:"文章设置",
5:"发布设置",
1:"文字消息设置",
7:"音频消息设置",
8:"图片消息设置",
10:"文字消息设置",
6:"音频消息设置"
},E=8,A=t("pages/media/modules/video_status/video_status.js"),N=5,I=_.inherit({
init:function(t){
this._o={
isNew:!0,
app_id:"",
$infoContainer:null,
$articleList:null,
data:null,
index:0,
ueditor:null,
$freeUEditor:null,
$navigator:null,
cgiData:null,
defaultGuideWordlimit:140,
guideWordlimit:140,
undoManagerState:{
list:[],
index:0
},
reportValidateData:[]
},this._o=this.extend(this._o,t),this.editor=this._o.ueditor,this.domUtils=this.editor.getDomUtils(),
this.initG(),this.data=this.initData(),this.renderArticleItem(this._o.index);
},
updateAppid:function(t){
1*this._o.app_id!==1*t&&(this._o.app_id=t);
},
initTextEditorEnv:function(){
var t=this;
l.initEnv({
$dom:$("#guide_words_main"),
wordlimit:this._o.defaultGuideWordlimit,
onFocus:function(){
this.selector$.find(".js_editorTip").show();
},
onChange:function(e){
if("10"==t.data.get("share_page_type")){
var i=t._o.ueditor.fireEvent("get_current_article");
i&&i.find(".js_appmsg_txt").text(e);
}
},
onBlur:function(){
this.selector$.find(".js_editorArea").each(function(){
var e=t._o.ueditor.fireEvent("get_current_article"),i=e&&e.data("article");
if(i){
var r=i.data.getData(),a=r.share_page_type;
if(!$(this).is(":hidden")&&8===a){
i.flushGuidWords();
var n=i.data.get("guide_words")||"",s=n||"分享图片";
e.find(".js_appmsg_title").html(s);
}
}
}),!this.hasOverflowed()&&this.selector$.find(".js_editorTip").hide();
}
});
},
setTextEditorWordlimit:function(t){
if("number"==typeof t){
this._o.guideWordlimit=t;
var e=l.getEditor(this._o.ueditor,this._o.formItemsOpt);
e&&e.setWordlimit(t);
}
},
enableToolbar:function(){
l.enableToolbar();
},
disableToolbar:function(){
l.disableToolbar();
},
showToolbar:function(){
l.showToolbar();
},
hideToolbar:function(){
l.hideToolbar();
},
setShowEmotionNLinkNWeapp:function(t){
var e=l.getEditor(this._o.ueditor,this._o.formItemsOpt);
e&&(e.opt.showLinkAndWeapp=t),e&&(e.opt.hideEmotion=!t),$("#js_text_editor_link_popup").hide();
},
initG:function(){
this._g={
undoHistory:null,
$item:null,
isAutoDigest:!0,
scrollTop:this._o.$navigator.offset().top,
maxDigest:120
};
},
initData:function(){
var t=this._o.data,e=this._o.index,r=this._o.cgiData,a=c.getLocalKey(e);
for(var n in t)t.hasOwnProperty(n)&&"undefined"!=typeof a[n]&&(a[n]="[object Number]"===Object.prototype.toString.call(a[n])?1*t[n]:"[object String]"===Object.prototype.toString.call(a[n])?t[n]?t[n]+"":"":t[n]);
if(a.file_id=1*a.file_id===0?"":a.file_id+"",a.writerid||(a.authority=0,a.author_status=1),
a.can_reward=1*r.can_use_reward?a.can_reward:0,r&&1==r.can_use_comment){
if(this._o.isNew){
var s=localStorage.getItem("commentStatus_"+wx.data.user_name);
null!==s&&(s=JSON.parse(s),a.need_open_comment=s.need_open_comment,a.only_fans_can_comment=s.only_fans_can_comment,
a.only_fans_days_can_comment=s.only_fans_days_can_comment);
}
}else a.need_open_comment=0;
if(0==a.need_open_comment&&(a.only_fans_can_comment=0,a.only_fans_days_can_comment=0),
a.title_tips="第%s篇图文".sprintf(D[e]),a.cdn_url_back||(a.cdn_url_back=a.cdn_url),a.cdn_url?(a.cover=a.cdn_url=a.cdn_url.nogif(),
a.cdn_235_1_url||(a.cdn_235_1_url=a.cdn_url),a.cdn_1_1_url||(a.cdn_1_1_url=a.cdn_url),
a.cdn_16_9_url||(a.cdn_16_9_url=a.cdn_url)):a.file_id&&(r&&r.appmsg_data.multi_item&&$.each(r.appmsg_data.multi_item,function(t,e){
e.file_id==a.file_id&&(a.cover=e.cover);
}),a.cover||(a.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(a.file_id)))),
a.source_url_checked=a.source_url?1:0,a.advert_info&&a.advert_info.back_transition){
var o=a.advert_info.back_transition;
if("string"==typeof o){
var d=o||"";
d=i.htmlDecode(d),a.advert_info.back_transition=JSON.parse(d);
}
}
if(!a.crop_list||"[object String]"===Object.prototype.toString.call(a.crop_list))try{
a.crop_list=JSON.parse(a.crop_list);
}catch(_){
a.crop_list={
crop_list:[]
};
}
return a.crop_list&&a.crop_list.crop_list||(a.crop_list={
crop_list:[]
}),a=this._o.ueditor.initPluginData(a),5===a.share_page_type&&(t.video_ori_status=3,
a.status=A.getVideoStatus(t)),{
set:function(t,e){
"undefined"!=typeof a[t]&&"undefined"!=typeof e&&(a[t]=e);
},
get:function(t){
return a[t];
},
getData:function(){
return a;
},
setData:function(t){
a=t;
}
};
},
renderArticleItem:function(t){
var e=this._o.$articleList,i=e.children(),r=i.length||0,a=this.data.getData(),n=$.parseHTML(wx.T(h,a))[0],s=null;
if(0===t)s=$(n).prependTo(e);else if(t===r)s=$(n).appendTo(e);else{
var o=i.eq(t+1);
s=$(n).insertBefore(o);
}
this._g.$item=s,s.data("article",this);
},
getListItem:function(){
return this._g.$item;
},
getDigestFromContent:function(){
return"";
},
setAutoDigest:function(t){
this.data.set("auto_gen_digest",t?1:0);
},
setDigest:function(){
var t=this.data,e=$.trim(t.get("digest"));
this.data.get("auto_gen_digest")?t.set("digest",this.getDigestFromContent()):t.set("digest",e);
},
updateIndex:function(t){
1*t!==this.data.get("seq")&&(this.data.set("seq",t),this.data.set("msg_index",t),
this.data.set("isFirst",0==t),this.data.set("title_tips","第%s篇图文".sprintf(D[t])),
this.changeCoverPreviewCss()),this.changeArticleItemCss();
},
changeArticleItemCss:function(){
this.data.get("isFirst")?this._g.$item.removeClass("sub_card_media"):this._g.$item.addClass("sub_card_media"),
this.data.get("cover")?this._g.$item.addClass("has_thumb"):this._g.$item.removeClass("has_thumb");
},
getIndex:function(){
return 1*this.data.get("seq");
},
showErrMsg:function(t,e){
this._o.ueditor.fireEvent("showErrMsg",t,e);
},
scrollIntoView:function(t,e){
this._o.ueditor.fireEvent("scrollIntoView",t,e);
},
hideAllErrMsg:function(){
this.hideErrorTips(),this._o.ueditor.fireEvent("hideAllErrMsg");
},
setHistory:function(t){
this._g.undoHistory=t;
},
getHistory:function(){
return this._g.undoHistory;
},
renderOriginal:function(){
var t=this,e=t.data.getData(),i=t._o.cgiData,r=$(".js_pay_open"),a=t._o.$infoContainer;
if(!i.can_use_copyright&&(r.eq(0).text("账号原创能力被封禁期间不可设置付费图文").show(),r.eq(1).hide(),
2!==e.copyright_type))return void $("#js_original").hide();
var n=$("#js_original");
if(n.find(".js_original_type").hide().eq(1==e.copyright_type||2==e.copyright_type?1:0).show(),
this.renderReward(),1==e.copyright_type||2==e.copyright_type){
if(n.find(".js_original_publish").val(e.releasefirst),n.find(".js_reprint_frm").val(e.reprint_permit_type),
n.find(".js_author").text(e.author),n.find(".js_platform").text(+e.releasefirst?"微信公众平台":e.platform),
n.find(".js_can_reprint").text(e.allow_reprint?"开启":"关闭"),n.find(".js_type").data("value",e.is_cartoon_copyright).text(e.is_cartoon_copyright?"漫画原创":"文字原创"),
n.find(".js_classify").text(e.original_article_type||e.source_article_type),"object"!==_typeof(e.ori_white_list))try{
e.ori_white_list=$.parseJSON(e.ori_white_list.html(!1)).white_list;
}catch(s){
e.ori_white_list=[];
}
$.each(e.ori_white_list,function(t,e){
e.title=[],1*e.can_modify&&e.title.push("可修改文章"),1*e.can_hide_source&&e.title.push("可不显示转载来源"),
e.title=e.title.join("，");
}),e.ori_white_list&&e.ori_white_list.length?n.find(".js_original_item").show():n.find(".js_original_item").hide(),
n.find(".js_whitelist").html(template.render("tpl_whitelist",{
list:e.ori_white_list
}));
}else n.find(".js_whitelist").html(""),a.find(".js_author").closest(".appmsg_edit_item").eq(0).show();
},
handlePay:function(){},
renderPay:function(){},
renderRewardSetting:function(){
var t=this,e=t.data.getData(),i=t._o.$infoContainer,r=$("#reward_setting_area"),a=e.share_page_type===N&&1===parseInt(e.video_ori_status,10),n=wx.cgiData,s=n.can_use_reward,o=n.totalRewardAccountCnt,d=n.inviteAuthorCnt;
if(""===e.video_ori_status&&1===e.applyori&&(a=!0),1===e.applyori&&e.writerid&&(a=!0),
1*s===1&&a)if(r.show(),o>0){
t.setAuthorInfo({
copyright_type:e.copyright_type||0,
writerid:e.writerid||"",
author_username:e.author_username||"",
author:e.author,
author_status:e.author_status,
authority:e.authority,
can_open_reward:e.can_open_reward,
can_reward:e.can_reward
}),i.find(".js_reward_setting").checkbox("checked",!!e.can_reward&&e.writerid);
var _=t.getRewardErrorText();
e.can_open_reward&&e.can_reward?(_?r.find(".reward_text_setting").addClass("reward_text_error"):r.find(".reward_text_setting").removeClass("reward_text_error"),
e.writerid&&(r.find(".reward_text_setting").html("赞赏账户："+e.author).show(),r.find(".js_reward_allow_click").addClass("open").show())):(r.find(".reward_text_setting").removeClass("reward_text_error"),
r.find(".reward_text_setting").html("赞赏未开启"),r.find(".js_reward_allow_click").removeClass("open").hide());
}else i.find(".js_reward_setting").checkbox("checked",!1),i.find(".js_reward_setting").attr("disabled","true"),
$(".js_reward_normal_status").hide(),d>0?($(".js_reward_disabled_status").show(),
$(".js_invite_reward_account").show(),$("#to-invite").on("click",function(t){
t.preventDefault(),window.open(wx.url("/cgi-bin/safecenterstatus?action=inviteauthor"),"_blank");
})):($(".js_reward_disabled_status").show(),$(".js_invite_reward_account").hide());else r.hide();
},
renderAd:function(){
var t=this,e=t.data.getData(),i=t._o.$infoContainer;
if(e.ad_info&&e.ad_info.ad_id){
$("#js_editor_insertad").addClass("disabled"),i.find(".js_ad_preview").empty(),i.find(".js_ad_preview").parent().show(),
e.ad_info.video_info&&(e.ad_info.ad_img=e.ad_info.video_info.thumbUrl);
var r=template.render("js_ad_preview_tpl",{
ad_id:e.ad_info.ad_id,
ad_img:e.ad_info.ad_img,
img:e.ad_info.img,
nick_name:e.ad_info.nick_name,
pt:e.ad_info.pt
});
i.find(".js_ad_preview").html(r),i.find(".js_tag").text(0==e.ad_info.trade_mode?"广告推荐":"内容定制");
}else $("#js_editor_insertad").removeClass("disabled"),i.find(".js_ad_preview").empty(),
i.find(".js_ad_preview").parent().hide();
},
renderPayRead:function(t){
var e=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],i=this,r=i.data.getData(),a=i._o.cgiData;
if(a.can_use_pay_subscribe){
var n=i._o.$infoContainer,s=n.find("#js_pay_setting_preview"),o=n.find("#js_pay_setting_area .js_pay_setting_checkbox"),d=$(".js_pay_open").eq(0),_=$(".js_pay_open").eq(1);
if(d.text(a.is_pay_subscribe_block?"账号付费能力被封禁期间不可设置付费图文":"声明原创后才可设置为付费图文").show(),
_.hide(),!a.is_pay_subscribe_block)if(r&&1===r.copyright_type?(d.hide(),_.show()):r&&2===r.copyright_type&&d.text("白名单转载文章不可设置为付费图文"),
r.is_pay_subscribe&&wx.cgiData.can_use_copyright&&!r.is_share_copyright){
this.initPayPopup({
show:!0,
init:!t,
isFromDialog:t,
previewPercent:1*r.pay_preview_percent,
isClickModify:e
}),o.prop("checked",!0),$("#payStatementStatus").text("已开启付费"),d.hide(),_.show(),
$(".js_edit_whitelist_btn").hide(),s.find(".js_can_send_gift").html(r.pay_gifts_count?"已开启":"未开启"),
s.find(".js_amount").html("￥"+r.pay_fee/100),""!==r.pay_desc?(s.find(".js_desc_wrap").show(),
s.find(".js_desc").html(r.pay_desc)):s.find(".js_desc_wrap").hide(),s[0].style.display="";
var c=n.find("#article_setting_area2");
$.each(c.find(".js_pay_hide_item"),function(t,e){
"none"!==e.style.display&&(e.style.display="none",e.dataset.pay=1);
});
var l=n.find("#js_comment_area");
(0===l.length||l.length&&"none"===l[0].style.display)&&c.hide(),this.data.set("insert_ad_mode",""),
$("#js_insert_ad_area .js_auto_insert_ad").removeProp("checked").parent().removeClass("selected"),
this.data.set("source_url",""),this.data.set("source_url_checked",0),this.renderSourceUrl();
}else{
if(r.is_pay_subscribe){
var h=this.data;
h.set("is_pay_subscribe",0),h.set("pay_fee",""),h.set("pay_preview_percent",""),
h.set("pay_desc",""),h.set("pay_gifts_count",0),h.set("copyright_type",0),h.set("original_article_type",""),
h.set("allow_reprint",""),h.set("releasefirst",""),h.set("reprint_permit_type",""),
h.set("allow_reprint_modify",""),h.set("ori_white_list","");
}
r.is_share_copyright||(o.prop("checked",!1),$("#payStatementStatus").text("未开启付费"),
s[0].style.display="none"),this.initPayPopup({
show:!1
}),$("#js_original").show(),this.renderOriginal(),n.find("#article_setting_area2").show().find('.js_pay_hide_item[data-pay="1"]').show().removeAttr("data-pay");
}
}
},
initPayPopup:function(t){
if(t.show){
var e={
isFromDialog:t.isFromDialog,
isClickModify:t.isClickModify
};
t.init?e.mode="init":(e.mode="set",e.previewPercent=t.previewPercent),this.setPayPopup(e),
this._o.$infoContainer.find("#js_pay_preview_popup").show();
}else this._o.$infoContainer.find("#js_pay_preview_popup").hide();
},
traversePayDomList:function(t,e){
var i=0;
t.some(function(t,r){
return t.isWrapper?void 0:"function"==typeof e?(i++,1===i&&(t.topMargin=0),e(t,r)):!0;
});
},
setPayPopup:function(t){
var e=this,i=this.data,r=this._o.$infoContainer,a=r.find("#js_pay_preview_popup"),n=r.find("#js_pay_preview_popup_temp"),o=r.find("#js_pay_set_education"),d=r.find("#js_pay_preview_popup_mask"),_=t.mode,c=t.isClickModify,l=g(this.editor.ueditor.body,{
getNestedStructure:!0,
ignoreFlexChildren:!0,
ignoreNotWriteableChildren:!0,
needEl:"init"===t.mode,
getSpan:!0
}),h=0,u=0,p=0,f=0,m=!0,v=0,w=0;
if(l.length&&(this.traversePayDomList(l,function(t,e){
var i=t.topMargin;
i>v&&(v=i,w=e);
}),v+=l[w].height+l[w].marginBottom),"init"===_)m=!1,this.traversePayDomList(l,function(t){
var e=t.el,i=t.topMargin;
return p++,"js_pay_preview_filter"===e.className?(m=!0,h=i,e.parentNode.removeChild(e),
!0):void 0;
});else if("set"===_)!function(){
t.previewPercent=parseInt(t.previewPercent)||0,t.previewPercent>=100&&(t.previewPercent=99),
t.previewPercent<0&&(t.previewPercent=0);
var i=v*t.previewPercent/100;
e.traversePayDomList(l,function(t){
var e=t.topMargin;
return p++,u=h,h=e,h>=i?(h>i&&(h=u,p--),!0):void 0;
});
}();else if("up"===_||"down"===_){
if(f=1*parseFloat(a.css("top")).toFixed(2),"up"===_&&0===f)return;
this.traversePayDomList(l,function(t){
var e=t.topMargin;
return p++,u=h,h=e,h>=f&&"up"===_?(h=u,p--,!0):h>f&&"down"===_?!0:void 0;
});
}else!function(){
var t=1*a.data("offset"),i=1*n.data("offset"),r=0,s=!1,o=!1;
e.traversePayDomList(l,function(e){
var a=e.topMargin;
return s&&o?!0:(s||(p++,h=a,p===t&&(s=!0)),void(o||(r++,r===i&&(o=!0,n.css({
marginTop:b+"px",
top:a+"px"
})))));
});
}();
if(m){
var y="init"!==_?0===v?0:Math.ceil(h/v*100):1*i.get("pay_preview_percent");
100===y&&(y=99);
var j=this._o.ueditor.ueditor.iframe.parentNode,b=parseInt(getComputedStyle(j).paddingTop);
a[0].parentNode!==j&&(j.insertAdjacentElement("afterbegin",d[0]),j.insertAdjacentElement("afterbegin",a[0]),
j.insertAdjacentElement("afterbegin",o[0])),a.css({
marginTop:b+"px",
top:h+"px"
}),d.css({
marginTop:b+"px",
height:h+"px"
}),"up"===_||"down"===_?(document.documentElement.scrollTop=document.documentElement.scrollTop+h-f,
document.body.scrollTop=document.body.scrollTop+h-f):"set"===_&&(c||(document.documentElement.scrollTop=h,
document.body.scrollTop=h),!t.isFromDialog&&t.previewPercent!==y&&s.err("由于文章以段落划分免费试读区域，输入值无法生效，已自动为你切换到最近的有效数值")),
a.data("offset",p),a.find(".js_preview_percent").html(y+"%"),r.find("#js_pay_setting_preview .js_preview_percent").html(y+"%"),
"init"!==_&&i.set("pay_preview_percent",y);
}
},
setTempPayPopup:function(t){
var e=this,i=this._o.$infoContainer,r=i.find("#js_pay_preview_popup_temp"),a=0,n=0;
if("hide"===t.mode)return void r.removeData("offset").hide();
if("top"===t.mode)a=0,n=1;else if("dom"===t.mode){
var s=function(){
var i=g(e.editor.ueditor.body,{
getNestedStructure:!0,
ignoreFlexChildren:!0,
ignoreNotWriteableChildren:!0,
needEl:!0,
getSpan:!0
}),r=!1;
return e.traversePayDomList(i,function(e){
var i=e.el,s=e.topMargin;
return n++,r?(a=s,!0):void(i.contains(t.dom)&&(r=!0));
}),r?void 0:{
v:void 0
};
}();
if("object"===("undefined"==typeof s?"undefined":_typeof(s)))return s.v;
}else{
var o=g(this.editor.ueditor.body,{
getNestedStructure:!0,
ignoreFlexChildren:!0,
ignoreNotWriteableChildren:!0,
needEl:!0,
getSpan:!0
});
if(this.traversePayDomList(o,function(e){
var i=e.topMargin;
return n++,i>=t.y?(a=i,!0):void 0;
}),0===a)return void r.removeData("offset").hide();
}
var d=this._o.ueditor.ueditor.iframe.parentNode,_=parseInt(getComputedStyle(d).paddingTop);
r[0].parentNode!==d&&d.insertAdjacentElement("afterbegin",r[0]),1*i.find("#js_pay_preview_popup").data("offset")!==n?r.css({
marginTop:_+"px",
top:a+"px"
}).data("offset",n).show():r.removeData("offset").hide();
},
showPayEducation:function(){
this._o.$infoContainer.find("#js_pay_set_education").show();
},
hidePayEducation:function(){
this._o.$infoContainer.find("#js_pay_set_education").hide();
},
hideErrorTips:function(){
var t=this._o.$infoContainer;
t.find(".js_title_error,.js_author_error,.js_desc_error,.js_tip_mask_msg,.js_cover_error,.js_url_error,.js_catch_tips,.js_content_error,.js_platform_error,.js_ad_error_tips").hide(),
t.find(".js_tip_mask").removeClass("error_mask");
},
flushGuidWords:function(){
var t=l.getEditor(this._o.ueditor,this._o.formItemsOpt),e=t.getContent();
this.data.set("guide_words",e||""),this._o.undoManagerState=t.dumpUndoManager();
},
flushPay:function(){},
flushField:function(){
var t=this.data,e=this._o.$infoContainer;
e.find(".js_field").each(function(){
var e=$(this),i=e.attr("name"),r=e.attr("type");
"checkbox"==r?t.set(i,e.checkbox("value")?1:0):"checkbox"==e.data("type")?t.set(i,1*e.val()?1:0):"guide_words"==i?t.set(i,e.val()):t.set(i,$.trim(e.val()));
});
},
flushRelatedVideo:function(){
var t=this.data,e=$(".js_related_video_desc"),i=e.data("related_video"),r=$(".js_related_video_radio_suggestion").hasClass("selected")?1:0,a=[];
try{
a=JSON.parse(i);
}catch(n){}
t.set("related_video",a),t.set("is_video_recommend",r);
},
flushAudio:function(t){
var e=this.data,i=[],r=void 0,a=void 0;
0===t?r=Array.from($("#ueditor_0").contents().find(".js_editor_audio")):7===t&&(r=Array.from($(".js_audio_card"))),
r.forEach(function(e){
0===t?a=e.getAttribute("voice_encode_fileid")||"":7===t&&(a=e.dataset.audio_id||"");
var r={
id:e.dataset.topic_id||"",
title:e.dataset.topic_name||""
};
i.push({
audio_id:a,
appmsg_album_info:r
});
}),e.set("audio_info",JSON.stringify({
audio_infos:i
}));
},
flushCommon:function(){
var t=this.data,e=this._o.$infoContainer,i=this._o.cgiData;
e.find('.js_desc[name="digest"]').val(t.get("digest")),t.set("source_url",t.get("source_url_checked")?t.get("source_url"):"");
var r=t.get("source_url");
r&&!/:\/\//.test(r)&&t.set("source_url","http://"+r);
var a=e.find("#js_original");
if(!t.get("is_pay_subscribe")&&(1==t.get("copyright_type")||2==t.get("copyright_type"))){
t.set("releasefirst",a.find(".js_original_publish").val()),t.set("author",a.find(".js_author").text()),
t.set("platform",+t.get("releasefirst")?"":a.find(".js_platform").text()),t.set("reprint_permit_type",a.find(".js_reprint_frm").val()),
t.set("original_article_type",a.find(".js_classify").text()),t.set("allow_reprint",Number("开启"===a.find(".js_can_reprint").text())),
t.set("allow_reprint_modify",Number("开启"===a.find(".js_can_modify").text()));
var n=[];
a.find(".js_whitelist .js_whitelist_item").each(function(){
var t=$(this);
n.push({
nickname:t.attr("data-nickname"),
title:t.attr("title"),
openid:t.attr("data-openid"),
wx_name:t.attr("data-wx_name"),
username:t.attr("data-username"),
avatar:t.attr("data-avatar"),
can_modify:t.attr("data-can_modify"),
can_hide_source:t.attr("data-can_hide_source"),
can_reward:t.attr("data-can_reward")
});
}),t.set("ori_white_list",JSON.stringify2({
white_list:n
})),t.set("is_cartoon_copyright",1*a.find(".js_type").data("value"));
}
t.set("copyright_img_list",JSON.stringify2({
max_width:this._o.ueditor.ueditor.iframe.parentNode.offsetWidth||578,
img_list:this.getImgList(!0)
}));
var s=$(".js_ad_msg");
if(t.set("ad_info",{
ad_id:s.data("ad_id")||"",
ad_img:s.data("ad_img")||"",
img:s.data("img")||"",
nick_name:s.data("nick_name")||"",
pt:s.data("pt")||"",
trade_mode:s.data("trade_mode")||""
}),0==t.get("need_open_comment")?(t.set("only_fans_can_comment",0),t.set("only_fans_days_can_comment",0)):(t.set("only_fans_can_comment",1*$(".js_comment_setting:checked").val()===1?1:0),
t.set("only_fans_days_can_comment",1*$(".js_comment_setting:checked").val()===2?1:0)),
1==i.can_use_hyperlink){
var o=t.get("content").match(/<a([^>]*)>(.*?)<\/a>/g);
o&&t.set("link_count",o.length);
}
var d=t.get("cdn_url"),_=t.get("file_id");
if(d)d=d.nogif(),t.set("cdn_url",d),t.set("cover",d);else if(_){
var c,i=this._o.cgiData;
i&&i.appmsg_data&&i.appmsg_data.multi_item&&$.each(i.appmsg_data.multi_item,function(t,e){
e.file_id==_&&(c=e.cover);
}),c||(c=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(_))),
t.set("cover",c);
}else t.set("cover","");
t.set("isFirst",0==this.getListItem().index());
var l=e.find("#js_article_tags_area .js_article_tags");
l&&t.set("appmsg_album_info",JSON.stringify({
appmsg_album_infos:JSON.parse(l.data("value")||"[]")
}));
var h=t.get("audio_info");
"string"!=typeof h&&(h=JSON.stringify(h)),t.set("audio_info",h),this.setScrollTop(),
this.setHistory(this._o.ueditor.getHistory());
},
getImgList:function(t){
return Array.prototype.map.call(this.editor.ueditor.document.getElementsByTagName("img"),function(e){
var i=e.src,r=e.style,a=e.offsetWidth,n=e.offsetHeight,s=void 0;
if(t){
var o=/[\d\.]+px$/,d=void 0;
o.test(r.width)?(d=parseInt(r.width,10),0===d&&(d=65536)):d=a;
var _=void 0;
o.test(r.height)?(_=parseInt(r.height,10),0===_&&(_=65536)):_=n,s={
url:i,
width:d,
height:_
};
}else s=i;
return s;
});
},
setScrollTop:function(){
this._g.scrollTop=Math.max($(window).scrollTop(),this._o.$navigator.offset().top);
},
getScrollTop:function(){
return this._g.scrollTop;
},
flush:function(){
return this;
},
countNodes:function(t){
var e=[];
if(t){
var i=[];
for(i.push(t);0!=i.length;){
var r=i.pop();
e.push(r);
for(var a=r.childNodes,n=a.length-1;n>=0;n--)i.push(a[n]);
}
return e.length;
}
},
getData:function(t,e,i,r){
var a=this,n=a.data.getData(),s={},o=T.submitKey;
if(this.isCurrentArticle()){
var d=(new Date).getTime();
n.paraLists=v(this.editor.ueditor.body),0===n.share_page_type?(r&&(d=(new Date).getTime(),
n.compose_info=JSON.stringify({
list:g(this.editor.ueditor.body,{
getNestedStructure:!0
})
})),d=(new Date).getTime(),n.insert_ad_mode===x.auto?r&&(n.sections=m(this.editor.ueditor.body),
n.can_insert_ad=n.sections&&n.sections.autoAdAvailable?1:0):n.can_insert_ad=1):n.compose_info=JSON.stringify({
list:""
}),10===n.share_page_type&&(n.count=1,n.content=n.guide_words,n.guide_words="",n.title="");
}
$.each(o,function(t,e){
switch(e){
case"fileid":
s[e]=n.file_id;
break;

case"sourceurl":
s[e]=n.source_url;
break;

case"cdn_url":
s[e]=(n.cdn_url||"").https2http().nogif();
break;

case"cover":
break;

case"ad_info":
s.ad_id=n.ad_info&&n.ad_info.ad_id||"";
break;

case"advert_info":
s.ad_video_transition=JSON.stringify(n.ad_video_transition)||n.advert_info.back_transition;
break;

case"dot":
n.dot&&n.dot.list&&n.dot.list.length&&n.dot.list.forEach(function(t){
t.dot&&(t.dot=t.dot.replace(/&quot;/g,'"'),t.position=t.position.replace(/&quot;/g,'"'));
}),s.dot=JSON.stringify(n.dot);
break;

case"share_imageinfo":
s[e]=JSON.stringify2({
list:n.share_imageinfo
});
break;

case"sections":
n.insert_ad_mode===x.auto&&(s[e]="string"==typeof n[e]?n[e]:JSON.stringify(n[e]));
break;

case"categories_list":
s[e]=JSON.stringify(n[e]);
break;

case"related_video":
s.related_video=n.related_video?n.related_video.map(function(t){
return t.aid;
}).join(","):"";
break;

case"crop_list":
s[e]=n[e]&&n[e].crop_list&&n[e].crop_list.length>0?JSON.stringify(n[e]):"";
break;

default:
s[e]=n[e];
}
});
var _=t?e?a.validateStrictly(s,i):a.validate(s,i):$.extend(!0,{},n);
return!!_&&(_.cover=void 0),_;
},
getParaList:function(){
{
var t=this;
t.data.getData();
}
this.isCurrentArticle();
var e=v(this.editor.ueditor.body);
return e;
},
isCurrentArticle:function(){
var t=this._o.ueditor.fireEvent("get_current_article");
return t&&t.data("article")===this?!0:!1;
},
removeCover:function(){
if(this.isCurrentArticle()){
var t=this._o.$infoContainer.find(".js_cover_preview");
t.hide().find("input").val(""),this._g.$item.find("div.js_appmsg_thumb").css("backgroundImage",'url("")'),
this._g.$item.removeClass("has_thumb");
}
this.data.set("file_id",""),this.data.set("cdn_url",""),this.data.set("cdn_url_back",""),
this.data.set("show_cover_pic",0);
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").hide();
},
getEditTipsContent:function(){
return"";
},
validateCommon:function(t){
{
var e=t.$dom,i=t.item;
this.data.getData();
}
return this.checkSourceUrl(t),d.rangelength(i.digest,[0,this._g.maxDigest])||(this.addValidateReport(127648,19,1),
e.find(".js_desc_error").text("摘要长度不能超过%s字".sprintf(this._g.maxDigest)).show(),t.viewClass=t.viewClass||".js_desc",
t.isValid=!1),this.validateReward(t),1==i.can_reward&&i.reward_money>0&&(i.reward_money<1||i.reward_money>256||i.reward_money.toString().indexOf(".")>-1)&&(this.addValidateReport(127648,24,1),
e.find(".js_reward_money_error").text("赞赏金额范围为1-256，只能是整数").show(),t.viewClass=t.viewClass||".js_reward_ios_money",
t.isValid=!1),t;
},
validateStrictlyCommon:function(t){
{
var e=t.$dom,i=t.item;
this.data.getData();
}
return i.fileid||i.cdn_url||(this.addValidateReport(127648,25,1),this.showErrMsg(e.find(".js_cover_error"),"必须插入一张图片"),
t.viewClass=t.viewClass||".js_cover_error",t.isValid=!1),this.checkSourceUrl(t),
d.rangelength(i.digest,[0,this._g.maxDigest])||(this.addValidateReport(127648,19,1),
e.find(".js_desc_error").text("摘要长度不能超过%s字".sprintf(this._g.maxDigest)).show(),t.viewClass=t.viewClass||".js_desc",
t.isValid=!1),this.validateReward(t),t;
},
validateReward:function(t){
var e=this.getRewardErrorText();
if(e){
var i=this.data.getData();
i.share_page_type===N?$("#reward_setting_area").find(".reward_text_setting").addClass("reward_text_error"):(this.showErrMsg(t.$dom.find(".js_content_error"),e),
t.viewClass=t.viewClass||".js_content_error"),t.isValid=!1;
}else $("#reward_setting_area").find(".reward_text_setting").removeClass("reward_text_error");
return t;
},
checkSourceUrl:function(t){
var e=t.$dom,i=t.item,r=this.data.getData();
r.source_url_checked&&""==i.sourceurl&&(this.addValidateReport(127648,17,1),e.find(".js_url_error").text("请输入原文链接").show(),
t.viewClass=t.viewClass||".js_url",t.isValid=!1),i.sourceurl&&!d.url(i.sourceurl)&&(this.addValidateReport(127648,18,1),
e.find(".js_url_error").text("链接不合法").show(),t.viewClass=t.viewClass||".js_url",
t.isValid=!1);
},
getRewardErrorText:function(){
if(1!=this.data.get("video_ori_status")&&0==this.data.get("copyright_type")||2==this.data.get("copyright_type"))return"";
var t="",e=this.data.get("can_reward"),i=this.data.get("can_open_reward"),r=this.data.get("writerid"),a=this.data.get("authority"),n=this.data.get("author_status");
return r&&!a?(t="赞赏帐户授权失败",this.addValidateReport(127648,20,1)):e&&!r?(t="因未选择赞赏账户，无法开启赞赏。请编辑原创声明重新设置。",
this.addValidateReport(127648,21,1)):r&&n?(t="因未选择赞赏账户，无法开启赞赏。请编辑原创声明重新设置。",this.addValidateReport(127648,22,1)):e&&r&&!i&&(t="选择的赞赏账户异常，请编辑原创声明重新设置。",
this.addValidateReport(127648,23,1)),t;
},
validateGuideWords:function(t){
if(!d.rangelength(t.item.guide_words,[0,this._o.guideWordlimit])){
this.addValidateReport(127648,26,1);
var e=this.getArticleType()===N?"简介":"推荐语",i="%n长度不能超过%s字".replace("%n",e).replace("%s",this._o.guideWordlimit);
this.showErrMsg(t.$dom.find(".js_content_error"),i),t.viewClass=t.viewClass||".js_content_error",
t.isValid=!1;
}
return t;
},
validateReport:function(){
this._o.ueditor.fireEvent("reportAddNum",this._o.reportValidateData);
},
addValidateReport:function(t,e,i){
t&&this._o.reportValidateData.push({
id:t,
key:e,
value:i||"1"
});
},
handleValidateResult:function(t){
return t.isValid?(this.hideAllErrMsg(),t.item):(this.validateReport(),t.viewClass&&this.scrollIntoView(t.$dom.find(t.viewClass),250),
null);
},
validate:function(t){
return t;
},
validateStrictly:function(t){
return t;
},
setGuideWordsReadOnly:function(){},
modifyCurrentEditData:function(t){
this.renderFieldData(t);
},
renderFieldData:function(t){
this._o.$infoContainer.find(".js_field").each(function(){
var e=$(this),i=e.attr("name"),r=e.attr("type");
"undefined"!=typeof t[i]&&("checkbox"==r?e.checkbox("checked",!!t[i]):e.val(t[i]||"").trigger("blur keydown "));
});
},
renderGuidWords:function(){
var t=l.getEditor(this._o.ueditor,this._o.formItemsOpt);
return t.setContent(this.data.get("guide_words")),$("#guide_words_main").show(),
t;
},
renderSharePreview:function(t){
var e=this.data,i=$("#reprint_article_main");
i.html(wx.T(t.tpl,e.getData())),i.show();
},
getArticleType:function(){
return this.data.get("share_page_type");
},
renderSourceUrl:function(){
var t=this._o.$infoContainer,e=this.data.getData();
e.source_url_checked?(t.find(".js_url_area .article_url_setting").show(),$("#js_article_url_area").find(".js_article_url_allow_click").addClass("open")):(t.find(".js_url_area .article_url_setting").hide(),
$("#js_article_url_area").find(".js_article_url_allow_click").removeClass("open")),
t.find(".js_url_area .article_url_setting").html(e.source_url);
},
renderAdBackTransition:function(){
var t=this._o.$infoContainer,e=this.data.getData(),i=e.ad_video_transition&&e.ad_video_transition.ad_video_transition,r="undefined"!=typeof localStorage.getItem("adTransitionText")?localStorage.getItem("adTransitionText"):null,a=void 0;
a=e.is_new_create?i||e.advert_info&&e.advert_info.back_transition&&e.advert_info.back_transition.ad_video_transition||r||y:i||e.advert_info&&e.advert_info.back_transition&&e.advert_info.back_transition.ad_video_transition,
t.find(".ad_transition_area").show(),a&&a!==j?(t.find(".js_ad_back").checkbox("checked",!0),
e.ad_video_transition={
ad_video_transition:a
},t.find(".ad_transition_area .ad_text_setting").html(a||""),t.find(".ad_transition_area .ad_text_setting").show()):(t.find(".js_ad_back").checkbox("checked",!1),
t.find(".ad_transition_area .ad_text_setting").html(""),t.find(".ad_transition_area .ad_text_setting").hide()),
$("#ad_transition_area").find(".js_ad_allow_click").addClass("open");
},
replaceMedia:function(){},
setAuthorInfo:function(t){
var e=this.data;
e.set("writerid",t.writerid),"undefined"!=typeof t.copyright_type&&e.set("copyright_type",1*t.copyright_type),
t.writerid?("undefined"==typeof t.author_status?e.set("author_status",0):e.set("author_status",1*t.author_status),
"undefined"==typeof t.authority?e.set("authority",1):e.set("authority",1*t.authority)):(e.set("author_status",1),
e.set("authority",0)),e.set("author_username",t.author_username),e.set("author",t.author),
e.set("can_open_reward",1*t.can_open_reward),e.set("can_reward",1*t.can_reward),
e.set("reward_reply_id",t.reward_reply_id),this.isCurrentArticle()&&(this._o.$infoContainer.find('input[name="writerid"]').val(t.writerid),
this._o.$infoContainer.find('input[name="author_username"]').val(t.author_username),
this._o.$infoContainer.find('input[name="author"]').val(t.author),this._o.$infoContainer.find('input[name="can_open_reward"]').val(1*t.can_open_reward),
this._o.$infoContainer.find('input[name="can_reward"]').val(1*t.can_reward),this.getArticleType()!==N&&this.renderReward());
},
getAuthorInfo:function(){
var t=this.data,e=1*t.get("author_status"),i=t.get("writerid"),r=t.get("authority"),a=t.get("author_username"),n=1*t.get("can_open_reward"),s=1*t.get("can_reward"),o=t.get("author"),d=t.get("reward_reply_id");
return!i||r&&!e&&n||(e=0,r=0,i="",a="",n=0,s=0,o="",d=""),{
writerid:i,
author_username:a,
author:o,
can_open_reward:n,
author_status:e,
can_reward:s,
authority:r,
copyright_type:t.get("copyright_type"),
reward_reply_id:d
};
},
renderCover:function(){
var t=this._o.$infoContainer,e=this.data.getData(),r=e.cover;
e.share_page_type===E&&(r=e.share_imageinfo[0]&&e.share_imageinfo[0].cdn_url);
var a=t.find(".js_cover_preview");
a.find("img").remove(),r&&(o.isLocalDomain(r)||i.isOuterWhiteDomain(r))?a.show().css("backgroundImage",'url("'+r+'")'):(this._g.$item.removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
a.hide(),t.find(".js_cdn_url").val(""),t.find(".js_file_id").val(""),t.find(".js_cdn_url_back").val("")),
this.changeCoverPreviewCss(a);
},
changeCoverPreviewCss:function(t){
if(this.isCurrentArticle()){
var e=this.getIndex();
t||(t=this._o.$infoContainer.find(".js_cover_preview")),0==e?t.addClass("first_appmsg_cover"):t.removeClass("first_appmsg_cover");
}
},
titleChange:function(t){
this.isCurrentArticle()&&(this._o.$infoContainer.find('.js_field[name="title"]').val(t.title).trigger("blur keydown "),
this._g.$item.find(".js_appmsg_title").text(t.title)),this.data.set("title",t.title);
},
videoLengthChange:function(t){
this.isCurrentArticle()&&this._g.$item.find(".js_appmsg_video_length").text(t.duration);
},
coverChange:function(t){
var e,i,r,a,n=this._o.$infoContainer,s=t.multiSize,o={
crop_list:[]
};
if(s){
s["16_9"]&&s["16_9"].url&&(e=s["16_9"].url.http2https().nogif()),s["16_9"]&&s["16_9"].file_id&&(i=s["16_9"].file_id),
s["2.35_1"]&&s["2.35_1"].url&&(r=s["2.35_1"].url.http2https().nogif()),s["1_1"]&&s["1_1"].url&&(a=s["1_1"].url.http2https().nogif());
for(var d in s){
var _=s[d];
o.crop_list.push({
ratio:d,
x1:Math.floor(_.absX1),
y1:Math.floor(_.absY1),
x2:Math.floor(_.absX2),
y2:Math.floor(_.absY2)
});
}
}
var c="";
c=t.url?t.url.http2https().nogif():wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(t.file_id)),
e||(e=c),i||(i=t.file_id),r||(r=c),a||(a=c);
var l,h=t.oriUrl||c,u=this.getIndex();
if(l=1*u===0?r:a,this.isCurrentArticle()){
var p=n.find(".js_cover_preview");
if(p.show(),p.css("backgroundImage",'url("'+l+'")'),p.find("input.js_file_id").val(i),
p.find("input.js_cdn_url").val(e),p.find("input.js_cdn_url_back").val(h),1*t.coverPic===1&&h){
var f=this._o.ueditor.getUeditor(),m=f.selection.getRange(),g=m.createBookmark(),v=f.body.firstChild;
m.setEndBefore(v),m.setStartBefore(v),f.fireEvent("insertMaterialImg",{
format:t.oriFormat,
src:h
}),m.moveToBookmark(g),m.select(),f.fireEvent("contentchange",!0),f.fireEvent("scrollIntoView",$("#author"),200);
}
n.find(".js_show_cover_pic").val("0"),this._g.$item.find(".js_appmsg_thumb").css("backgroundImage",'url("'+l+'")'),
this._g.$item.addClass("has_thumb"),this.changeCoverPreviewCss(p);
}
this.data.set("file_id",i),this.data.set("cdn_url",e),this.data.set("cdn_235_1_url",r),
this.data.set("cdn_1_1_url",a),this.data.set("cdn_16_9_url",e),this.data.set("cover",e),
this.data.set("cdn_url_back",h),this.data.set("show_cover_pic",0),this.data.set("crop_list",o);
},
renderComment:function(){
var t=this._o.$infoContainer,e=this.data.getData();
t.find(".js_comment").checkbox("checked",0!=e.need_open_comment),$(".js_comment_setting").each(function(t){
1==Number(e.only_fans_can_comment)&&1==t?$(this).checkbox("checked",!0):1==Number(e.only_fans_days_can_comment)&&2==t?$(this).checkbox("checked",!0):0==Number(e.only_fans_can_comment)&&0==Number(e.only_fans_days_can_comment)&&0==t?$(this).checkbox("checked",!0):$(this).checkbox("checked",!1);
}),0==e.need_open_comment?($("#js_comment_area").find(".comment_setting").hide(),
$("#js_comment_area").find(".js_comment_allow_click").removeClass("open")):($("#js_comment_area").find(".comment_setting").show(),
$("#js_comment_area").find(".js_comment_allow_click").addClass("open")),t.find("#js_comment_area").find(".comment_setting").html($(".js_comment_setting:checked").data("label"));
},
renderRelatedVideo:function(){
var t=this._o.cgiData;
if(t.can_use_related_video&&0===wx.cgiData.close_related_video){
var e=this._o.$infoContainer;
e.find(".js_related_list").empty(),e.find(".js_related_video_desc").html("全局智能推荐").show().data("related_video",""),
e.find(".js_related_video_checkbox").checkbox("checked",!0),e.find(".js_related_video_checkbox").attr("disabled",!0),
e.find(".relate_video_checkbox").addClass("disabled");
}
},
renderReward:function(){
var t=this._o.$infoContainer,i=this._o.$infoContainer.find(".js_reward_container"),a=this.data.get("author"),n=this.data.get("can_reward"),s=this.data.get("can_open_reward"),o=this.data.get("writerid"),d=this.data.get("authority"),_=this.data.get("author_status"),c=this.data.get("copyright_type"),l=this.data.get("is_share_copyright"),h=t.find(".js_author_container"),u=t.find("input.js_author"),p=t.find(".js_reward_tips");
if(1==c&&o||0==l&&2==c?h.addClass("author_active"):h.removeClass("author_active"),
1==c&&!d&&o){
var f=wx.T(e,{
text:encodeURIComponent("赞赏账户授权已失效，要重新获得授权，请前往赞赏账户小程序添加本公众号")
});
h.addClass("author_status_warn"),u.siblings(".js_author_warn").remove(),$(f).insertBefore(u),
r.init({
$container:h
});
}else h.removeClass("author_status_warn"),u.siblings(".js_author_warn").remove();
1===this.data.get("is_pay_subscribe")?(h.removeClass("author_original"),this.editor.fireEvent("setAuthorStatus",{
status:!0,
readonly:!0,
hideCounter:!0
})):1==c?(h.addClass("author_original"),this.editor.fireEvent("setAuthorStatus",{
status:!0,
readonly:!0,
hideCounter:!0
})):(h.removeClass("author_original"),0==c&&this.editor.fireEvent("setAuthorStatus",{
status:!0
}));
var m=this.getRewardErrorText();
!m&&n&&o&&d&&!_&&s||0==l&&2==c?(i.find(".js_author_username").text(a),i.find(".js_reward_preview_list").show(),
i.find(".js_no_reward_list").hide(),i.find(".js_reward_error").hide(),p.text("已开启")):(m?i.find(".js_reward_error").text(m).show():i.find(".js_reward_error").hide(),
i.find(".js_reward_preview_list").hide(),i.find(".js_no_reward_list").show(),p.text("未开启"));
},
triggerInputValidate:function(){
var t=this._o.$infoContainer,e=["input.js_title","input.js_author","textarea.js_desc"];
e=e.join(","),t.find(e).trigger("keydown"),t.find(e).trigger("blur");
},
renderReprintSource:function(){
var t=this._o.$infoContainer.find("#js_reprint_source"),e=this.data.getData();
t.find(".js_reprint_biz_avatar").attr("src",e.copyright_headimg||"http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0"),
t.find(".js_reprint_biz_nickname").html(e.copyright_nickname),t.find(".js_reprint_author").html(e.author),
t.find(".js_reprint_biz_profile_description").html(e.profile_description),t.find(".js_reprint_recommend_title").val(e.reprint_recommend_title).trigger("blur"),
t.find(".js_reprint_recommend_title_len").html(e.reprint_recommend_title.length),
t.find(".js_reprint_recommend_content").html(e.reprint_recommend_content).trigger("blur"),
t.find(".js_reprint_recommend_content_len").html(this.getReprintRecommendContentLen(e.reprint_recommend_content||"")),
t.show();
},
renderReprintTips:function(t){
if(t){
var e=this._o.$infoContainer.find("#js_reprint_article_tips");
e.find(".js_content").text(t),e.show();
}
},
getReprintRecommendContentLen:function(t){
var e=document.createElement("div");
return e.innerHTML=t,e.innerText.replace(/\s/g,"").length;
},
openAdBackTips:function(){
var t=localStorage.getItem("hasCloseAdTips-"+wx.commonData.data.uin);
"true"!==t&&$(".advert_tips").show();
},
showTextTips:function(t){
var e=1,i=[],r=function(){
u.set({
key:"mpeditor",
value:[],
success:function(){},
error:function(t){
console.error(t);
}
});
},a=function(){
i.push(t.key),u.set({
key:"mpeditor",
value:i,
success:function(){},
error:function(t){
console.error(t);
}
});
};
u.get({
key:"mpeditor",
success:function(n){
null==n||void 0==n?r():"[]"!==n&&(i=n,n.forEach(function(i){
i===t.key&&(e=0);
})),e&&(t.content&&$(t.contentDom).text(t.content),$(t.tipDom).show(),$(t.closeDom).bind("click",function(){
a(),t.close();
}),$(t.confirmDom).bind("click",function(){
a(),t.confirm();
}),$(t.cancelDom).bind("click",function(){
a(),t.cancel();
}));
},
error:function(t){
console.error(t);
}
});
},
renderNewUserTip:function(){
wx.cgiData.real_name_verify_time>1590549424&&this.showTextTips({
key:"new_user_message",
tipDom:"#js_show_text_tip",
closeDom:"#js_show_text_closed",
contentDom:"#js_show_text_content p:first",
content:"根据国家监管部门要求，自2018年2月12日起，新注册的微信公众帐号暂无留言功能，后续开通时间将依据相关政策调整。",
close:function(){
$("#js_show_text_tip").hide();
}
});
},
renderLeadAdTip:function(){
if(void 0!==wx.cgiData.advert_tips_info){
var t=wx.cgiData.advert_tips_info,e=t.tips_type,i=t.income_x,r=t.income_y,a=t.income_limit,n={
BizUin:wx.cgiData.biz_uin,
EventType:1,
MessageType:e,
MaxBenefit:"0",
MinBenefit:"0"
},s=Math.round(i),o=Math.round(r);
n.MaxBenefit=a>s?"0":o.toString(),n.MinBenefit=a>s?"0":s.toString();
var d={
key:"lead_ad",
tipDom:"#js_show_text_tip",
closeDom:"#js_show_text_closed",
contentDom:"#js_show_text_content p:first",
confirmDom:"#js_text_confirm_btn",
cancelDom:"#js_text_cancel_btn",
content:"",
close:function(){
$("#js_show_text_tip").hide(),n.EventType=2,p.report(20426,n);
},
cancel:function(){
$("#js_show_text_tip").hide(),n.EventType=4,p.report(20426,n);
},
confirm:function(){
$("#js_show_text_tip").hide(),n.EventType=3,p.report(20426,n);
}
},_="/cgi-bin/frame?t=ad_system/common_frame&t1=publisher";
switch(e){
case 1:
d.content=a>s?"你已经符合开通流量主的条件，开通后每个月可有广告收益，现邀请你前往开通。":s==o?"你已经符合开通流量主的条件，根据你近期的数据表现，开通后预计每月可收益%s元，现邀请你前往开通。".sprintf(s):"你已经符合开通流量主的条件，根据你近期的数据表现，开通后预计每月可收益%s~%s元，现邀请你前往开通。".sprintf(s).sprintf(o),
document.getElementById("js_text_confirm_btn").href=_+"/publisher_index&source_appid="+wx.cgiData.sourceAppId+"&from=edit&token="+wx.cgiData.uToken+"&lang=zh_CN";
break;

case 2:
d.content=a>s?"你已经开通了流量主，开启广告位后每个月可有广告收益，现邀请你前往开启。":s==o?"你已经开通了流量主，根据你近期的数据表现，开启广告位后预计每月可收益%s元，现邀请你前往开启。".sprintf(s):"你已经开通了流量主，根据你近期的数据表现，开启广告位后预计每月可收益%s~%s元，现邀请你前往开启。".sprintf(s).sprintf(o),
document.getElementById("js_text_confirm_btn").href=_+"/publisher_settings&source_appid="+wx.cgiData.sourceAppId+"&from=edit&token="+wx.cgiData.uToken+"&lang=zh_CN";
break;

case 3:
d.content=a>s?"你已经开通了流量主，开启文末广告位后每个月可有广告收益，现邀请你前往开启。":s==o?"你已经开通了流量主，根据你近期的数据表现，开启文末广告位后预计每月可收益%s元，现邀请你前往开启。".sprintf(s):"你已经开通了流量主，根据你近期的数据表现，开启文末广告位后预计每月可收益%s~%s元，现邀请你前往开启。".sprintf(s).sprintf(o),
document.getElementById("js_text_confirm_btn").href=_+"/publisher_settings&source_appid="+wx.cgiData.sourceAppId+"&from=edit&token="+wx.cgiData.uToken+"&lang=zh_CN";
break;

case 4:
d.content=a>s?"你已经开通了流量主，开启文中广告位后每个月可有广告收益，现邀请你前往开启。":s==o?"你已经开通了流量主，根据你近期的数据表现，开启文中广告位后预计每月可收益%s元，现邀请你前往开启。".sprintf(s):"你已经开通了流量主，根据你近期的数据表现，开启文中广告位后预计每月可收益%s~%s元，现邀请你前往开启。".sprintf(s).sprintf(o),
document.getElementById("js_text_confirm_btn").href=_+"/publisher_settings&source_appid="+wx.cgiData.sourceAppId+"&from=edit&token="+wx.cgiData.uToken+"&lang=zh_CN";
}
if(e){
$("#js_show_text_content p:last").show(),this.showTextTips(d);
var c=1;
u.get({
key:"mpeditor",
success:function(t){
null===t?u.set({
key:"mpeditor",
value:[],
success:function(){},
error:function(t){
console.error(t);
}
}):t.forEach(function(t){
"lead_ad"===t&&(c=0);
}),c&&p.report(20426,n);
},
error:function(t){
console.error(t);
}
});
}
}
},
renderAdBackTips:function(){
var t=this.data.getData(),e=this._o.cgiData;
if(5===t.share_page_type){
var i=e.advert_ctrl||{},r=i.can_open_video_back_seller,a=i.is_adseller,n=i.is_video_back_adseller;
1===a?0===n?1===r&&this.openAdBackTips():1===n?this.renderAdBackTransition():($(".ad_transition_area").hide(),
$(".ad_transition_area .ad_text_setting").hide(),$(".js_ad_back").checkbox("checked",!1),
$("#ad_transition_area").find(".js_ad_allow_click").removeClass("open")):1===r&&this.openAdBackTips();
}else $(".advert_tips").hide(),$(".ad_transition_area").hide();
},
renderSettingTitle:function(t){
var e=S[t];
$("#article_type_setting").text(e);
},
renderVideoDotArea:function(t){
var e=$("#video_dot_area"),i=e.find("#video_dot_checkbox");
if(t.share_page_type===N&&wx.cgiData.canUseVideoPaster)if(e.show(),t.share_videoinfo[0].play_length>=b&&(t.isMyMpVideo||t.is_my_mp_video))if(e.removeClass("video-disabled"),
i.attr("disabled",!1),t.dot&&Object.keys(t.dot).length){
i.checkbox("checked",!0);
var r=t.dot.list[0].begin_time,a="在%s开始出现贴片".replace("%s",C(r));
e.find(".js_paster_setting_text").html(a);
}else i.checkbox("checked",!1),e.find(".js_paster_setting_text").html("");else e.addClass("video-disabled"),
i.attr("disabled",!0),i.checkbox("checked",!1),e.find(".js_paster_setting_text").html("");else e.hide();
},
renderDanmu:function(t){
var e=$("#js_danmu_area"),i=e.find(".js_danmu"),r=e.find(".js_danmu_setting_text"),n=e.find(".js_danmu_allow_click"),s=$(".js_danmu_setting"),o=t.is_my_mp_video||t.isMyMpVideo,d=t.danmu_pub_type;
if(t&&t.share_page_type===N)if(e.show(),o){
if(e.removeClass("video-disabled"),i.attr("disabled",!1),0===d)return i.checkbox("checked",!1),
r.hide(),void n.removeClass("open");
switch(i.checkbox("checked",!0),r.show(),n.addClass("open"),d){
case 2:
s.eq(1).checkbox("checked",!0),r.html(s.eq(1).data("label"));
break;

case 3:
s.eq(2).checkbox("checked",!0),r.html(s.eq(2).data("label"));
break;

case 1:
default:
s.eq(0).checkbox("checked",!0),r.html(s.eq(0).data("label"));
}
}else!function(){
e.addClass("video-disabled"),i.attr("disabled",!0),i.checkbox("checked",!1),e.find(".js_danmu_setting_text").html("");
var t=new a({
dom:e.find(".js_danmu_text"),
content:$("#js_danmu_disabled_popover_tpl").html(),
className:"popover_paster_tips",
place:"top",
hideIfBlur:!0,
onShow:function(){
var t="从公众平台上传的视频才能设置弹幕功能";
this.$pop.find(".popover-danmu-disabled__content").text(t),this.resetPosition();
}
});
t.hide(),t.$pop.find(".popover_bar").hide(),e.find(".js_danmu_text").on("mouseover",function(){
t.show();
}),e.find(".js_danmu_text").on("mouseleave",function(){
t.hide();
});
}();else e.hide();
},
renderArticleTags:function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(1===window.wx.cgiData.can_use_public_tag||2===window.wx.cgiData.realname_type){
var e=(this._o.ueditor,this.data.getData()),i=this._o.$infoContainer.find("#js_article_tags_area").show(),r=i.find(".js_article_tags"),a=r.parent(),n=a.find(".js_article_tags_content"),s=2===wx.cgiData.realname_type||9===wx.cgiData.realname_type,o=function(t){
var e=arguments.length<=1||void 0===arguments[1]?"":arguments[1],i=arguments.length<=2||void 0===arguments[2]?!1:arguments[2];
t?(r.prop("checked",!0),a.addClass("selected")):(r.prop("checked",!1),a.removeClass("selected")),
i?(r.prop("disabled",!0),a.addClass("disabled")):(r.prop("disabled",!1),a.removeClass("disabled")),
n.text(e);
};
if(1===e.copyright_type||s||5===e.share_page_type||7===e.share_page_type){
var d=void 0;
if(t.useData){
var _=e.appmsg_album_info;
"string"==typeof e.appmsg_album_info&&(_=JSON.parse(e.appmsg_album_info));
var c=_.appmsg_album_infos;
d=c&&c.map(function(t){
var e=t.title;
return e;
})||[],r.data("value",JSON.stringify(c));
}else d=(JSON.parse(r.data("value"))||[]).map(function(t){
var e=t.title;
return e;
});
d.length?o(!0,d.join("，")):o(!1);
}else r.data("value","[]"),o(!1,"非原创文章不可编辑话题",!0);
}
},
updateTitleInputCounter:function(t){
this._o.ueditor.fireEvent("updateTitleInputCounter",t);
},
renderCommon:function(){
var t=this.data.getData(),e=t.share_page_type;
this.renderFieldData(t),this.renderComment(),this.renderCover(),this.renderSettingTitle(e),
this.renderRewardSetting(),this.renderAdBackTips(),this.renderVideoDotArea(t),this.renderSourceUrl(),
this.renderOriginal(),this.renderAd(),this.triggerInputValidate(),this.updateTitleInputCounter(64),
0==e&&(this.renderNewUserTip(),this.renderLeadAdTip()),this.renderDanmu(t);
},
resetBeforeRender:function(){
$("#word_count_container").remove(),$("#js_checktext").remove(),$("#guide_words_main").hide(),
$("#reprint_article_main").hide(),$("#js_reprint_source").hide(),$("#js_reprint_article_tips").hide(),
$("#js_related_video_area").hide(),$("#js_video_title_input").hide(),$("#js_show_text_tip").hide(),
$("#js_pay_setting_area").hide(),$("#js_pay_preview_popup").hide(),this.hidePayEducation();
var t=this._o.$infoContainer;
t.find(".js_plublish_style").show(),t.find(".js_cover_tip").html("").hide(),t.find("#article_setting_area2").show().find('.js_pay_hide_item[data-pay="1"]').removeAttr("data-pay"),
this.handleEditTips(),this.setTextEditorWordlimit(this._o.defaultGuideWordlimit);
var e=l.getEditor(this._o.ueditor,this._o.formItemsOpt);
e&&e.selector$.find(".js_editorTip").hide(),$("#js_article_tags_area").hide();
},
render:function(){
this.resetBeforeRender(),this.renderCommon();
var t=l.getEditor(this._o.ueditor,this._o.formItemsOpt);
t&&t.undumpUndoManager(this._o.undoManagerState);
},
destroy:function(){}
});
return I;
});define("biz_common/utils/comm_report.js",[],function(){
var r={
web:{
report:"/cgi-bin/webreport"
},
wap:{
report:"/mp/wapcommreport"
}
},e=function(r,e){
return e=JSON.parse(JSON.stringify(e)),e.log_id=r,console.log("[comm_report] reportjson: ",e),
JSON.stringify(e);
},o=!1,n=[],t={
web:{
report:function(o,n,t,c){
c=c||{},o.post({
url:r.web.report,
data:{
reportjson:e(n,t)
},
async:c.async,
success:c.success,
error:c.error
});
},
leaveReport:function(r,e,c){
if(n.push([r,e,c]),!o){
o=!0;
var p=!1,s=function(){
p||(p=!0,n.forEach(function(r){
t.web.report(r[0],r[1],r[2]);
}));
};
window.addEventListener("beforeunload",s,!1),window.addEventListener("unload",s,!1);
}
}
},
wap:{
report:function(o,n,t,c){
c=c||{},o({
type:"POST",
dataType:"json",
url:r.wap.report,
data:{
reportjson:e(n,t)
},
async:c.async,
success:c.success,
error:c.error
});
}
}
};
return{
report:function(r,e,o,n,c){
t[r].report(e,o,n,c);
},
leaveReport:function(r,e,o,n){
t[r].leaveReport(e,o,n);
},
getUrl:function(e,o){
return r[e][o];
},
getData:function(r,o,n){
var t=e(r,o);
return n&&(t=encodeURIComponent(t)),"reportjson="+t;
}
};
});define("tpl/media/cps_template/card_tmpl.html.js",[],function(){
return'<!--cps card类卡片-->\n<!--fail_cps的时候加className cps_inner_fail-->\n<!--hover的时候加className hover-->\n<section class="cps_inner cps_inner_card inner_edit js_product_container js_banner_container">\n    <div class="cps_inner_wrp js_product_loop_content" data-pidtype="2" data-templateid="{{templateid}}" data-appid="{{appid}}" data-pid="{{pid}}" data-wxaappid="{{wxaappid}}" data-wxapath="{{wxapath}}">\n        <div class="cps_inner_content">\n            <figure class="cps_inner_image_container">\n                <!--<span width="100%" class="js_cover cps_inner_image" style="background: url({{img_url}}) no-repeat center; background-size:cover;"></span>-->\n                <img width="100%" class="js_cover cps_inner_image" data-src="{{img_url}}" style="width: 100%!important" >\n                <!--is_ad === 1时候，出现”广告“两个字-->\n                <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                <div class="cps_inner_info_from">\n                    <span data-ratio="1" data-nopreviewclick="1" class="cps_inner_ic_from" style="background: url({{source_logo_url}}) no-repeat center;\n                    background-size: contain;"></span>{{source_name}}\n                </div>\n            </figure>\n            <div class="cps_inner_info">\n                <div class="cps_inner_info_hd">\n                    <h2 class="cps_inner_info_title">{{title}}</h2>\n                    <!--<p class="cps_inner_info_desc">{{desc}}</p>-->\n                </div>\n\n                <div class="cps_inner_info_ft">\n                    <!--is_ad === 1时候，出现”购买“，否则出”详情“-->\n                    <span class="cps_inner_btn_cps_info buy"><!--<i class="cps_inner_ic_miniapp"></i><span class=\'js_btn_word\'>购买</span>--></span><!--这里有个逻辑判断-->\n                    <p class="cps_inner_info_desc price"><span class="price_sign">¥</span>{{price}}</p><!--价格-->\n                    \n                </div>\n            </div>\n        </div>\n        <div class="cps_inner_audit_fail_mask js_cps_check_fail">\n            <p class="cps_inner_cps_audit_fail">\n                <span class="cps_inner_ic_audit_fail"></span>该商品存在违规，请删除后操作            </p>\n        </div>\n        <!--hover 操作 begin-->\n        <div class="hover_mask">\n            <span class="hover_operation_ele js_change_cps_tmpl">\n                <div class="active_wrp js_change_cps_tmpl_a" title="更换模版">\n                    <span class="ic icon20_common edit_media_white"></span>\n                    <p class="hover_operation_ele_desc">更换模版</p>\n                </div>\n            </span>\n            <span class="hover_operation_ele js_del_cps_card">\n                <div class="active_wrp js_del_cps_card_a" title="删除">\n                    <span class="ic icon20_common del_media_white"></span>\n                    <p class="hover_operation_ele_desc">删除</p>\n                </div>\n            </span>\n        </div>\n        <!--hover 操作 end-->\n    </div>\n</section>';
});define("tpl/media/cps_template/banner_tmpl.html.js",[],function(){
return'<!--cps banner类卡片-->\n<!--fail_cps的时候加className cps_inner_fail-->\n<!--hover的时候加className hover-->\n<section class="cps_inner cps_inner_banner inner_edit js_product_container js_banner_container">\n    <div class="cps_inner_wrp js_product_loop_content" data-pidtype="2" data-templateid="{{templateid}}" data-appid="{{appid}}" data-pid="{{pid}}" data-wxaappid="{{wxaappid}}" data-wxapath="{{wxapath}}">\n        <div class="cps_inner_content">\n            <figure class="cps_inner_image_container">\n                <img width="100%" class="js_cover cps_inner_image" data-src="{{img_url}}" style="width: 100%!important" >\n                <!--<span width="100%" class="js_cover cps_inner_image" style="background: url({{img_url}}) no-repeat center; background-size: cover;"></span>-->\n            </figure>\n            <!--is_ad === 1时候，出现”广告“两个字-->\n            <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n            <div class="cps_inner_info">\n                <div class="cps_inner_info_hd">\n                    <h2 class="cps_inner_info_title">{{title}}</h2>\n                    <p class="cps_inner_info_desc">{{desc}}</p>\n                </div>\n\n                <div class="cps_inner_info_ft">\n                    <div class="cps_inner_info_from">\n                        <span data-ratio="1" data-nopreviewclick="1" class="cps_inner_ic_from" style="background: url({{source_logo_url}}) no-repeat center;\n                        background-size: contain;"></span>{{source_name}}\n                    </div>\n                    <!--is_ad === 1时候，出现”购买“，否则出”详情“-->\n                    <span class="cps_inner_btn_cps_info buy"><!--<i class="cps_inner_ic_miniapp"></i><span class="js_btn_word">购买</span>--></span><!--这里有个逻辑判断-->\n                </div>\n            </div>\n        </div>\n        <div class="cps_inner_audit_fail_mask js_cps_check_fail">\n            <p class="cps_inner_cps_audit_fail">\n                <span class="cps_inner_ic_audit_fail"></span>该商品存在违规，请删除后操作            </p>\n        </div>\n        <!--hover 操作 begin-->\n        <div class="hover_mask">\n            <span class="hover_operation_ele js_change_cps_tmpl">\n                <div class="active_wrp  js_change_cps_tmpl_a" title="更换模版">\n                    <span class="ic icon20_common edit_media_white"></span>\n                    <p class="hover_operation_ele_desc">更换模版</p>\n                </div>\n            </span>\n            <span class="hover_operation_ele js_del_cps_card">\n                <div class="active_wrp js_del_cps_card_a" href="javascript:;" title="删除">\n                    <span class="ic icon20_common del_media_white"></span>\n                    <p class="hover_operation_ele_desc">删除</p>\n                </div>\n            </span>\n        </div>\n        <!--hover 操作 end-->\n    </div>\n</section>';
});define("tpl/media/cps_template/list_tmpl.html.js",[],function(){
return'<!--cps list类卡片-->\n<!--这里有个逻辑判断-->\n<!--pid_type != \'movie\'时候(即：图书、其他通用类目)，加className cps_inner_book-->\n<!--fail_cps的时候加className cps_inner_fail-->\n<!--hover的时候加className hover-->\n<section class="cps_inner cps_inner_list inner_edit js_list_container js_product_container">\n    <div class="cps_inner_wrp js_product_loop_content" data-pidtype="2" data-templateid="{{templateid}}" data-appid="{{appid}}" data-pid="{{pid}}" data-wxaappid="{{wxaappid}}" data-wxapath="{{wxapath}}">\n        <div class="cps_inner_content">\n            <figure class="cps_inner_image_container">\n                <img class="js_cover cps_inner_image" data-src="{{img_url}}" >\n                <!--<span class="js_cover cps_inner_image" style="background: url({{img_url}}) no-repeat center bottom; background-size: cover;"></span>-->\n            </figure>\n            <!--is_ad === 1时候，出现”广告“两个字-->\n            <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n            <div class="cps_inner_info">\n                <div class="cps_inner_info_hd">\n                    <!--通用模版，pid_type !== \'book\' && pid_type !== \'movie\'，加className line2-->\n                    <h2 class="cps_inner_info_title js_title">{{title}}</h2>\n                    <p class="cps_inner_info_desc js_desc">{{desc}}</p>\n                    <div class="cps_inner_info_from">\n                        <span data-ratio="1" data-nopreviewclick="1" style="background: url({{source_logo_url}}) no-repeat center;\n                        background-size: contain;" class="cps_inner_ic_from"></span>{{source_name}}\n                    </div>\n                </div>\n\n                <div class="cps_inner_info_ft">\n                    <!--is_ad === 1时候，出现”购买“，否则出”详情“-->\n                    <span class="cps_inner_btn_cps_info buy"><!--<i class="cps_inner_ic_miniapp"></i><span class=\'js_btn_word\'>购买</span>--></span>\n                    <p class="cps_inner_info_desc price js_price"><span class="price_sign">¥</span>{{price}}</p>\n                </div>\n            </div>\n        </div>\n        <div class="cps_inner_audit_fail_mask js_cps_check_fail">\n            <p class="cps_inner_cps_audit_fail">\n                <span class="cps_inner_ic_audit_fail"></span>该商品存在违规，请删除后操作            </p>\n        </div>\n        <!--hover 操作 begin-->\n        <div class="hover_mask">\n            <span class="hover_operation_ele js_change_cps_tmpl">\n                <div class="active_wrp js_change_cps_tmpl_a" title="更换模版">\n                    <span class="ic icon20_common edit_media_white"></span>\n                    <p class="hover_operation_ele_desc">更换模版</p>\n                </div>\n            </span>\n            <span class="hover_operation_ele js_del_cps_card">\n                <div class="active_wrp js_del_cps_card_a" title="删除">\n                    <span class="ic icon20_common del_media_white"></span>\n                    <p class="hover_operation_ele_desc">删除</p>\n                </div>\n            </span>\n        </div>\n        <!--hover 操作 end-->\n    </div>\n</section>\n';
});define("tpl/media/cps_template_dialog.html.js",[],function(){
return'<!--选择商品皮肤弹窗 begin-->\n<div class="dialog_select_product_skin">\n    <!--banner类 begin-->\n    <!--选中时，这里加className selected-->\n    {if show_type == \'banner\'}\n    <div class="dialog_select_product_skin_ele js_cps_template {select_id == \'banner\'? \'selected\': \'\'}" data-id="banner">\n        <div class="dialog_select_product_skin_ele_hd">海报大图</div>\n        <div class="dialog_select_product_skin_ele_bd">\n            <section class="js_product_container cps_inner cps_inner_banner" style="">\n                <div class="js_product_loop_content cps_inner_wrp" style="">\n                    <!-- 数据加载成功模版 -->\n                    <div class="cps_inner_content">\n                        <figure class="cps_inner_image_container">\n                            <img class="cps_inner_image" width="100%" src="data:image/png;base64,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" data-ratio="1" data-forceheight="100%" data-nopreviewclick="1" alt="" style="">\n                        </figure>\n                        <span class="cps_inner_info_adTag" style="">广告</span>\n                        <div class="cps_inner_info" style="">\n                            <div class="cps_inner_info_hd">\n                                <h2 class="cps_inner_info_title" style="">电影名称</h2>\n                                <p class="cps_inner_info_desc" style="">主演名称</p>\n                            </div>\n                            <div class="cps_inner_info_ft" style="">\n                                <div class="cps_inner_info_from" style="">\n                                    <i class="cps_inner_ic cps_inner_ic_from ic_undefined"></i>来源                                </div>\n                                <span class="cps_inner_btn_cps_info buy" style=""><!--<i class="cps_inner_ic_miniapp"></i>购买--></span>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        \n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </div>\n    {else}\n    <!--卡片类 begin-->\n    <div class="dialog_select_product_skin_ele js_cps_template {select_id == \'card\'? \'selected\': \'\'}" data-id="card">\n        <div class="dialog_select_product_skin_ele_hd">大图</div>\n        <div class="dialog_select_product_skin_ele_bd">\n            <section class="js_product_container cps_inner cps_inner_card" style="">\n                <div class="js_product_loop_content cps_inner_wrp" style="">\n                    <!-- 数据加载成功模版 -->\n                    <div class="cps_inner_content">\n                        <figure class="cps_inner_image_container">\n                            <img class="cps_inner_image" width="100%" src="data:image/png;base64,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" data-ratio="1" data-forceheight="100%" data-nopreviewclick="1" alt="" style="">\n                            <span class="cps_inner_info_adTag" style="">广告</span>\n                            <div class="cps_inner_info_from" style="">\n                                <i class="cps_inner_ic cps_inner_ic_from ic_undefined"></i>来源                            </div>\n                        </figure>\n                        <div class="cps_inner_info" style="">\n                            <div class="cps_inner_info_hd">\n                                <h2 class="cps_inner_info_title" style="">商品名称</h2>\n                                \n                            </div>\n                            <div class="cps_inner_info_ft" style="">\n                                <span class="cps_inner_btn_cps_info buy" style=""><!--<i class="cps_inner_ic_miniapp"></i>购买--></span>\n                                <p class="cps_inner_info_desc" style="">金额</p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        \n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </div>\n    {/if}\n    <!--列表类 begin-->\n    <!--选中时，这里加className selected-->\n    <div class="dialog_select_product_skin_ele js_cps_template {select_id == \'list\'? \'selected\': \'\'}" data-id="list">\n        <div class="dialog_select_product_skin_ele_hd ">列表        </div>\n        <div class="dialog_select_product_skin_ele_bd">\n            <section class="js_product_container cps_inner cps_inner_list" style="">\n                <div class="js_product_loop_content cps_inner_wrp" style="">\n                    <!-- 数据加载成功模版 -->\n                    <div class="cps_inner_content">\n                        <figure class="cps_inner_image_container">\n                            <img width="100%" class="cps_inner_image" data-ratio="1" data-forceheight="100%" data-nopreviewclick="1" alt="" style="" src="data:image/png;base64,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">\n                        </figure>\n                        <span class="cps_inner_info_adTag" style="">广告</span>\n                        <div class="cps_inner_info" style="">\n                            <div class="cps_inner_info_hd">\n                                <h2 class="cps_inner_info_title" style="">{if show_type == \'banner\'}电影名称{else}商品名称{/if}</h2>\n                                {if show_type == \'banner\'}\n                                <p class="cps_inner_info_desc" style="">主演名称</p>\n                                {/if}\n                                <div class="cps_inner_info_from" style="">\n                                    <i class="cps_inner_ic cps_inner_ic_from ic_undefined"></i>来源                                </div>\n                            </div>\n                            <div class="cps_inner_info_ft" style="">\n                                <span class="cps_inner_btn_cps_info buy" style=""><!--<i class="cps_inner_ic_miniapp"></i>购买--></span>\n                                {if show_type != \'banner\'}\n                                <p class="cps_inner_info_desc price">金额</p>\n                                {/if}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </section>\n        </div>\n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </div>\n</div>\n    <!--选择商品皮肤弹窗 end-->';
});define("tpl/media/product_highline_style.html.js",[],function(){
return'<style>body{margin:0;font-family:"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\\9ED1\\4F53",Arial,sans-serif;}</style>';
});define("tpl/media/product_iframe_smart_tips.html.js",[],function(){
return'<section style="position: relative;z-index: 1;margin-bottom: -32px">\n  <div style="height: 32px;background-color: #07C160;background-color: rgba(7,193,96,.9);display: inline-block;border-radius: 0 0 10px 10px;font-size: 12px;color: #fff;line-height: 32px;padding: 0 16px;"><span style="display: inline-block;vertical-align: -2px;background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAFfvTeYAAAABGdBTUEAALGPC/xhBQAAAmdJREFUOBGNlEtIVVEUhr23dw0qR6FJDzCLkiyhJs0CB4EEYUUDqUnvQRjOhAZNkhooDUKCoiAjkCYJRYGDBj0hgyKzouwl9CRKyazs9v3rrn3c96TVD99ej732Ovvsfc8tKkopoziHPJ9NzadDKq+oHJ1O5ghKLcD5LAe7F/pBsoco+Qs2K+NqTVr4qgnpRLFXPsa+df+cbZigDyo8aSabQbRoh3UwAJVwEmxXFeaMN9CjJmo3Eb8XdkLBuWRJLAWpjGaXvaG6v4duWA0jzK+Cn7CF2LbQSPAcFoFUBa9hkoJII7YgDEwsjyYX4k+B/fAhyuevISwKVsXB/6el+Lp3PIs9AudhyR8LSR4E6ZkmsdstyuVOuZV5CXWa/AG7oQuku1Bi3uhp9hDvU04LjsMLeAjSEBwzb3RQ7iZcte15vhT7Bc6A7mAmhCa4Jt2P7Xm9Qvfr83O5r27tDsK8LfBCFXyHGx6vwL+kQtdgUhwcJoqDH1vy0+J4XJ9C3fgueADXYEEoxv/vCy74JasBixdDO+h9h2AqtMBKaCW/DHRG32RdOoLbcAjWwizmC0VyIzwCaSBvbNQX0QZHQb/fcrgI0h51wW5VEEl/HrFqVKTPUBeha17jC3XtsU54vi5O4g+n4g6vm09eb6oNz1NODyqDdyDpc50Nc6AfJNm50KsA3Yc75v19aLIHhIHaGXDP17zBPoUO0AO2QQNIH6EadHevIEjHWgs9nniCnR76J5ZkBjq96AJWd9ACt0Bvchi0ER1tWl0kDkD4S96UNB7L8WJ9q32wAyaPVacccyWwAfQm+mw/QXNc/xvj7PMZChXlSwAAAABJRU5ErkJggg==\')  0 0 no-repeat;width: 25px;height: 16px;-webkit-background-size: cover;background-size: cover;margin-right: 5px;"></span>非该位置最终商品，以实际推荐为准</div>\n</section>\n';
});define("tpl/media/product_style_dialog_content.html.js",[],function(){
return'<div class="js_content dialog_media_container">\n  <div class="mpui-media-list-wrp">\n    <p class="js_loading icon_loading_small white">加载中</p>\n  </div>\n</div>';
});define("tpl/media/product_style_dialog_list.html.js",[],function(){
return'{each list as item index}\n<label for="product_style_{index}" class="product-style">\n  <div class="js_checkbox_parent product-style__meta">\n    <i class="icon_radio"></i>\n    <span class="product-style__name">{item.name}</span>\n    <input type="radio" class="frm_radio" name="productstyle" data-id="{item.id}" id="product_style_{index}">\n  </div>\n  <div class="product-style__container">\n  	{if item.cover}\n    <img src="{item.cover}" alt="">\n    {else}\n    {=html}\n    {/if}\n  </div>\n</label>\n{/each}';
});define("tpl/media/product_smart_tips.html.js",[],function(){
return"<p>商品将会根据用户特征进行个性化推荐展示，以提升转化。</p>\n<br>	\n<p>此外，包含个性化推荐商品的文章将会被系统分时段推送至用户，以进一步提升转化。</p>";
});define("tpl/media/product_import_select_result.html.js",[],function(){
return'{if errMsg}\n  <span class="filter-fail">{errMsg}</span>\n{else if templateFileLink}\n  <span class="filter-fail">\n  文件格式有误，<a href="{templateFileLink}" target="_blank" download="商品筛选模版.xls">下载商品筛选模版</a>  </span>\n{else}  \n  <span class="filter-fail">\n  成功导入筛选{suc_num}个商品  {if err_num>0}\n  ，{err_num}个商品筛选失败，    {if err_link}\n    <a href="{err_link}" target="_blank" download="筛选失败商品列表.xls">下载筛选失败的商品列表</a>    {/if}\n  {/if}  \n  </span>  \n{/if}\n。&nbsp;&nbsp;<a href="javascript:;" class="js_clear_import">清空筛选</a>';
});