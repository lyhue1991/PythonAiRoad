define("tpl/richEditor/emotionEditor.html.js",[],function(){
return'<div class="emotion_editor">\n    <div class="edit_area js_editorArea"></div>\n    <div class="editor_toolbar">\n        {if !hideEmotion}\n        \n        <button type="button" class="weui-desktop-icon weui-desktop-icon_opr editor_toolbar_switch js_switch">\n          <!-- <a href="javascript:;" class="editor_toolbar_switch icon_emotion emotion_switch js_switch"> -->\n          表情          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n            <path fill="#4A4A51" d="M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm.426 1C4.526 1 .9 4.582.9 9.421.9 13.418 4.526 17 9.426 17c4.048 0 7.674-3.582 7.674-7.579C17.1 4.581 13.474 1 9.426 1zM15 10c-.337 2.978-2.415 5-5.538 5C5.415 15 3.337 12.978 3 10h12zm-2.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>\n          </svg>\n        <!-- </a> -->\n        </button>\n        {/if}\n        {if showLinkAndWeapp}\n        <button type="button" class="weui-desktop-icon weui-desktop-icon_opr editor_toolbar_switch" id="js_link">\n          链接          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20">\n            <g fill="#4A4A51" transform="rotate(30 4.75 17.727)">\n            <path d="M3.5.948a3.5 3.5 0 0 1 3.5 3.5l-.001 1.5H5.524V4.474A2.05 2.05 0 0 0 1.43 4.32l-.005.153v4.01a2.05 2.05 0 0 0 1.576 1.995v1.486A3.5 3.5 0 0 1 0 8.5V4.448a3.5 3.5 0 0 1 3.5-3.5z"/>\n            <path d="M3.5 18.01a3.5 3.5 0 0 1-3.5-3.5v-1.5h1.476v1.45a2.05 2.05 0 0 0 4.095.152l.005-.153v-3.978A2.05 2.05 0 0 0 4 8.486V7a3.5 3.5 0 0 1 3 3.465v4.046a3.5 3.5 0 0 1-3.5 3.5z"/>\n            </g>\n          </svg>\n\n        </button>\n        <button type="button" class="weui-desktop-icon weui-desktop-icon_opr editor_toolbar_switch" id="js_weapp">\n          小程序          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n            <path fill="#4A4A51" d="M9 .667a8.333 8.333 0 1 1 0 16.666A8.333 8.333 0 0 1 9 .667zm0 1a7.333 7.333 0 1 0 0 14.666A7.333 7.333 0 0 0 9 1.667zm2.48 2.388c1.706 0 3.092 1.248 3.092 2.799 0 1.366-1.048 2.513-2.508 2.767l-.144.002c-.437 0-.691-.32-.527-.69a.947.947 0 0 1 .666-.53c.801-.194 1.346-.82 1.346-1.55 0-.882-.843-1.602-1.896-1.602s-1.896.72-1.896 1.603v4.401c0 1.55-1.386 2.8-3.093 2.8-1.706 0-3.092-1.25-3.092-2.8 0-1.359 1.073-2.52 2.535-2.74h.117c.33 0 .57.198.57.48 0 .05-.002.072-.007.1a.379.379 0 0 1-.036.11c-.105.246-.375.459-.666.531-.796.193-1.346.815-1.346 1.52 0 .882.843 1.602 1.896 1.602s1.896-.72 1.896-1.603V6.854c0-1.55 1.386-2.8 3.093-2.8z"/>\n          </svg>\n\n        </button>\n        {/if}\n        {if !hideUpload}\n        <div class="upload_box">\n            <div class="upload_area">\n                <a id="emotionEditor_{gid}_" href="javascript:void(0);" class="js_upload upload_access">\n                    <i class="icon18_common upload_gray"></i>\n                    上传图片                </a>\n            </div>\n        </div>\n        {/if}\n        {if !hideOprTips}\n        <p class="editor_tip opr_tips">，按下Shift+Enter键换行</p>\n        {/if}\n        <p class="editor_tip js_editorTip"></p>\n        {if !hideEmotion}\n        <div class="emotion_wrp js_emotionArea">			\n		</div>\n        {/if}\n    </div>\n</div>\n\n';
});define("tpl/media/product_dropdown_item.html.js",[],function(){
return'{each data as o index}\n<li class="js_dropdown_item_li dropdown_data_item {if o.className}{o.className}{/if}">\n  <a onclick="return false;" class="jsDropdownItem" href="javascript:void(0);" data-value="{o.value}" data-index="{index}" data-name="{o.name}">\n      {o.name}\n      {if loading_img}\n      <img style="display:none;" class="js_loading dropdown_item_loading" src="{loading_img}" alt="">\n      {/if}\n      <i {if o.canDel!==true}style="display:none;"{/if} class="js_del icon14_common del_gray dropdown_item_del" data-value="{o.value}" data-index="{index}" data-name="{o.name}"></i>\n  </a>\n</li>\n{/each}';
});define("tpl/media/product_dropdown.html.js",[],function(){
return'<div class="dropdown_menu">\n    <a href="javascript:void(0);" class="jsDropdownBt btn dropdown_switch">\n        <label class="jsBtLabel" {if search}contenteditable="true"{/if}>{label}</label>\n        <i class="arrow"></i>\n    </a>\n    <div class="dropdown_data_container jsDropdownList" style="display:none;">\n        <ul class="dropdown_data_list">\n            {=itemHtml}\n            {if search}\n            <li class="jsDropdownItem js_empty empty" style="display:none;"></li>\n            {/if}\n            {if canadd}\n            <div class="dropdown_extra js_addform">\n                <a href="javascript:void(0);" class="js_btn btn_custom_property">新建类目</a>\n                <div class="js_additem" style="display:none;">\n                    <span class="frm_input_box with_counter counter_in append">\n                        <input type="text" class="frm_input" placeholder="新建类目">\n                        <em class="frm_input_append frm_counter js_addnum">0/15</em>\n                    </span>\n                    <div class="dropdown_btn_wrp">            \n                        <a class="btn btn_primary js_sure" href="javascript:void(0);">确定</a>\n                        <a class="btn btn_default js_cancel" href="javascript:void(0);">取消</a>\n                    </div>\n                </div>\n            </div>\n            {/if}\n        </ul>\n        \n    </div>\n</div>';
});define("tpl/cardticket/select_sub_merchant_table.html.js",[],function(){
return'{if loading}<i class="icon_loading_small white"></i>\n{else}\n<div class="sub_title_bar">\n    <span class="frm_input_box search append l">\n        <a href="javascript:void(0);" class="js_search_btn frm_input_append">\n            <i class="icon16_common search_gray">\n                搜索            </i>\n            &nbsp;\n        </a>\n        <input type="text" placeholder="请输入商户名" value="{param.keyword}" class="frm_input js_search_input">\n    </span>\n    <div class="tr">\n        <a data-actionid="2014" class="btn btn_primary r" href="{wx_url \'/merchant/cardhelpmakesend?action=addpage\'}" target="_blank"><i class="icon14_common add_white"></i>添加子商户</a>\n    </div>\n</div>\n<div class="in_bd">\n	{if !data.length}\n	<div class="account_list empty js_empty">\n		{if param.keyword}\n		你输入的名称未搜索到，请确认否输入正确或未添加该子商户。		{else}\n		您还没有添加子商户，请点击右上角按钮添加子商户		{/if}\n		<!-- 抱歉，未找到符合公众号 -->\n	</div>\n	{else}\n	<ul class="account_list js_merchant_item_p">\n		{each data as sub i}\n		<li class="list_item js_merchant_item{if check_remain_quota && (sub.remain_quota==0||sub.can_not_use_sns_card)} js_merchant_disabled disabled{/if}" data-id="{sub.Id}">\n	        <div class="inner_list_item">\n	            <img class="pic" src="{http2https sub.Logo}" width="100px">\n				<div class="item_txt">\n					<p class="nick_name">{sub.BrandName}</p>\n                    {if check_remain_quota}{if max_card===0}<p>帐号违规，暂停制券</p>{else}{if sub.remain_quota==0}<p>已超出制券量</p>{else if sub.can_not_use_sns_card}<p>该商户类目不可创建朋友的券</p>{/if}{/if}{/if}\n				</div>\n			</div>\n			<a href="javascript:;" class="account_selected"></a>\n			<div class="list_mask"></div>\n	    </li>\n	    {/each}\n	</ul>\n	<div class="js_pager"></div>\n	{/if}\n	<!-- <div class="loading_box empty dn" id="js_loading">\n		<img src="<%@GetResFullName($images_comm_path$icon/common/icon32_loading_light.gif)%>">\n		<p>加载中，请稍候</p>\n	</div> -->\n</div>\n{/if}\n';
});define("tpl/media/cardmsg.html.js",[],function(){
return'<div class="msg_card{if _className} {_className}{/if}">\n	<div class="card_content" style="background-color: {color};">\n		<img class="logo js_logourl" data-src="{logo_url}" />\n		<div class="card_info">\n			<h4 class="card_title">{title}</h4>\n		</div>\n		<div class="deco"></div>\n	</div>\n	<p class="store">{brand_name}</p>\n</div>\n';
});define("tpl/media/dialog/file.html.js",[],function(){
return'{each list as item}\n{mediaDialogInit item}\n<li class="media_item">\n    <div class="media_info">\n        <label class="media_name frm_radio_label">\n        	<i class="icon_radio"></i>\n        	<input name="media" type="radio" class="frm_radio" value="{item.file_id}">\n            {item.name}\n        </label>\n        <span class="media_size">{item.size}</span>\n        <span class="media_time">{mediaDialogtimeFormat item.update_time}</span>\n    </div>\n    <div id="fileItem{item.file_id}" data-id="{item.file_id}" data-type="{item.type}" class="media_content"></div>\n</li>\n{/each}\n';
});define("tpl/media/dialog/videomsg_layout.html.js",[],function(){
return'<div class="dialog_media_container">\n    <div class="sub_title_bar in_dialog">\n        <div class="title_tab js_videotab weui-desktop-tab_dialog"></div>\n        <div class="search_bar dn" style="display:none;">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="richvideo_create js_video_create">\n            {if showShareDialog}\n            <span class="weui-desktop-tips weui-desktop-tips_icon-after js_look_wording">视频推荐说明<i class="icon-svg-common-ask"></i></span>\n            {/if}\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建视频            </a>\n        </div>\n    </div>\n    <div class="js_video_status js_video_content dn">\n        <div class="richvideo_list media_dialog" id="js_videomsg_list">\n            <div class="richvideo_col"><div class="inner"></div></div>&nbsp;\n            <div class="richvideo_col"><div class="inner"></div></div>\n        </div>\n    </div>\n    <div class="js_video_status js_video_tencent link_search_video_box dn js_video_search">\n        <div class="video">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">视频/图文网址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        <input type="text" class="frm_input js_video_txurl js_video_url" placeholder="支持插入微信公众号文章链接、视频详情页链接和腾讯视频链接">\n                    </span>\n                    <p class="frm_msg fail js_video_url_tip">只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接</p>\n                </div>\n            </div>\n			<!-- <div class="video_preview js_video_preview"></div> --><!-- 原来的js_video_preview去掉改成和素材库、小视频一样的方式通过richvideo_list插入视频@lulu -->\n		</div>\n        <div class="richvideo_list media_dialog" id="js_video_search_list">\n            <div class="richvideo_col"><div class="inner"></div></div><!-- 这里能否控制如果是腾讯视频的链接则只显示一个richvideo_col，如需支持多视频才显示两个richvideo_col？@lulu\n            肯定可以啊！ @radeonwu -->\n            <div class="richvideo_col"><div class="inner"></div></div>\n            <!--<div class="pagination_wrp pageNavigator js_video_tencent_pagebar"></div>--><!-- 如果有多视频的情况下才显示分页，视频搜索这里用单独的分页组件，不要使用外面的分页（js_pagebar） @lulu-->\n            <!--图文消息最多出现3个视频，这里不需要分页 @radeonwu-->\n        </div>\n    </div>\n    <div class="js_video_status js_video_loading">\n        <i class="icon_loading_small white">loading...</i>\n    </div>\n    <div class="js_video_status js_video_none dn">\n        <div class="no_media_wrp">\n            <p class="empty_tips js_empty_tips"></p>\n            <!--\n            <div class="richvideo_create js_video_create">\n                <a class="" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                    <i class="icon_richvideo_small"></i><strong>新建视频消息</strong>\n                </a>\n            </div>\n            -->\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    \n    <div class="pagination_wrp pageNavigator js_pagebar"></div><!-- 在视频搜索的tab下不要使用这个分页组件 @lulu-->\n</div>\n\n';
});define("tpl/media/dialog/appmsg_layout.html.js",[],function(){
return'<div class="dialog_media_container appmsg_media_dialog">\n    <div class="sub_title_bar in_dialog">\n        <div class="search_bar">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn dn" href="javascript:" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="搜索图文消息" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="appmsg_create tr">\n            {if type==10}\n            <!--\n            <a class="" target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&lang=zh_CN&token={token}">\n                <i class="icon_appmsg_small"></i><strong>新建单图文消息</strong>\n            </a>\n            -->\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&isMul=1&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建图文消息            </a>\n            {else if type==11}\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=11&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建单商品消息            </a>\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=11&isMul=1&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建多商品消息            </a>\n            {/if}\n        </div>\n    </div>\n    <div class="dialog_media_inner">\n        {if tpl=="loading"}\n        <i class="icon_loading_small white">loading...</i>\n        {else if tpl=="no-media"}\n        <div class="no_media_wrp">\n            <p class="tips">暂无素材</p>\n        </div>\n        <span class="vm_box"></span>\n        {else}\n        <div class="js_appmsg_list appmsg_list media_dialog">\n            <div class="appmsg_col"><div class="inner"></div></div>&nbsp;\n            <div class="appmsg_col"><div class="inner"></div></div>\n        </div>\n        <div class="pagination_wrp pageNavigator"></div>\n        {/if}\n    </div>\n</div>\n';
});define("tpl/media/dialog/file_layout.html.js",[],function(){
return'<div class=\'dialog_media_container {if tpl=="no-media"}no_media{/if}\'>\n    {if tpl=="loading"}\n    <i class="icon_loading_small white">loading...</i>\n    {else if tpl=="no-media"}\n    <div class="no_media_wrp">\n        <p class="tips">\n        暂无素材        </p>\n        <div class="upload_box">\n            <span class="upload_area"><a id="js_media_dialog_upload{upload_id}" class="btn btn_upload" data-gid="">上传</a></span>\n            <div class="bubble_tips bubble_right warn">\n                <div class="bubble_tips_inner">\n                    {if type=="2"}\n                        大小不超过5M                    {/if}\n                    {if type=="3"}\n                        大小: 不超过5M,&nbsp;&nbsp;&nbsp;&nbsp;长度: 不超过60s,&nbsp;&nbsp;&nbsp;&nbsp;格式: mp3, wma, wav, amr                    {/if}\n                    {if type=="4"}\n                        大小: 不超过20M,&nbsp;&nbsp;&nbsp;&nbsp;格式: rm, rmvb, wmv, avi, mpg, mpeg, mp4                    {/if}\n                </div> \n                <i class="bubble_tips_arrow out"></i>\n                <i class="bubble_tips_arrow in"></i>\n            </div>\n        </div>\n    </div>\n    <span class="vm_box"></span>\n    {else}\n    <div class="sub_title_bar in_dialog">\n        <div class="search_bar dn">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="upload_box">\n            <span class="upload_area"><a id="js_media_dialog_upload{upload_id}" class="btn btn_upload" data-gid="">上传</a></span>&nbsp;\n            <div class="bubble_tips bubble_left warn">\n                <div class="bubble_tips_inner">\n                    {if type=="2"}\n                        大小: 不超过5M,&nbsp;&nbsp;&nbsp;&nbsp;格式: bmp, png, jpeg, jpg, gif                    {/if}\n                    {if type=="3"}\n                        大小: 不超过5M,&nbsp;&nbsp;&nbsp;&nbsp;长度: 不超过60s,&nbsp;&nbsp;&nbsp;&nbsp;格式: mp3, wma, wav, amr                    {/if}\n                    {if type=="4"}\n                        大小: 不超过20M,&nbsp;&nbsp;&nbsp;&nbsp;格式: rm, rmvb, wmv, avi, mpg, mpeg, mp4                    {/if}\n                </div>\n                <i class="bubble_tips_arrow out"></i>\n                <i class="bubble_tips_arrow in"></i>\n            </div>\n        </div>&nbsp;\n    </div>\n    <ul class=\'dialog_media_list js_media_list\'></ul>\n    <div class="pagination_wrp pageNavigator"></div>\n    {/if}\n</div>\n';
});define("common/wx/media/appmsg.js",["widget/media.css","common/wx/time.js","media/appmsg_temp_url.js","tpl/media/appmsg.html.js","common/qq/Class.js"],function(e){
"use strict";
function t(e,t){
t?(e.renderTitle=e.title.replace(/<em>/g,"__em_start__"),e.renderTitle=e.renderTitle.replace(/<\/em>/g,"__em_end__").html(!0),
e.renderTitle=e.renderTitle.replace(/__em_start__/g,"<em>").replace(/__em_end__/g,"</em>")):e.renderTitle=e.title,
e.renderTitle=e.renderTitle||r;
}
function i(e){
return 0===e.share_page_type&&0===e.can_insert_ad;
}
e("widget/media.css");
var a=/[\u2600-\u27BF]|[\u2B00-\u2BFF]|[\u3291-\u32B0]|[\uD83C\uD83D][\uDC00-\uDFFF]/,r="未命名图文",l=(wx.T,
e("common/wx/time.js")),m=e("media/appmsg_temp_url.js"),s=e("tpl/media/appmsg.html.js"),d=e("common/qq/Class.js"),o=d.declare({
init:function(e){
if(e&&e.container){
if(e.data=e.data||$.extend({},e),e.data.multi_item)for(var r=0;r<e.data.multi_item.length;r++){
var d=e.data.multi_item[r];
if(1==d.smart_product){
e.data.smart_product=1;
break;
}
}
var o=e.data,p=o.multi_item||[],n=p.length,c=null,u=!0,_="",g=[],h=!1;
if(!(0>=n)){
c=p[0],c.completed=!0,(!c.title||!c.cover&&7!=c.share_page_type)&&(u=!1,c.completed=!1),
a.test(c.title)&&(_="title-emoji",u=!1,c.completed=!1),c.cover&&(c.cover=c.cover.nogif()),
i(c)&&(u=!1,h=!0);
for(var r=1;n>r;++r){
var d=p[r];
d.completed=!0,g.push(d),d.title&&d.cover||7==d.share_page_type||(u=!1,d.completed=!1),
a.test(d.title)&&(_="title-emoji",u=!1,c.completed=!1),i(d)&&(u=!1,h=!0),d.cover&&(d.cover=d.cover.nogif());
}
e.cpsfail&&1==e.cpsfail&&(u=!1);
var f=e.highlight===!0;
t(c,f),g.forEach(function(e){
t(e);
});
var v=!1;
p.forEach(function(e){
e.is_pay_subscribe&&(v=!0);
});
var T={
highlight:f,
id:o.app_id,
type:e.type,
file_id:o.file_id,
time:o.create_time?l.timeFormat(o.create_time):"",
update_time:o.update_time?l.timeFormat(o.update_time):"",
isMul:n>1,
first:c,
list:g,
completed:u,
notCompletedType:_,
is_illegal:1*o.is_illegal||0,
token:wx.data.t,
showEdit:e.showEdit||!1,
showMask:e.showMask||!1,
useUpdateTime:e.useUpdateTime||!1,
isShareMul:e.isShareMul||!1,
isSupportShareMul:e.isSupportShareMul||!1,
isSupportPaidSubscribe:void 0===e.isSupportPaidSubscribe?!0:e.isSupportPaidSubscribe,
cpsfail:e.cpsfail||!1,
cpsloading:e.cpsloading||!1,
autoAdValid:h,
havePaidArticle:v
},j=function(e){
return"string"==typeof e?e.replace(/<|>/g,function(e){
return{
"<":"&#60;",
">":"&#62;"
}[e];
}):e;
},w=T.first.renderTitle;
T.first.renderTitle=j(w);
var S=$(e.container).html(wx.T(s,T));
if(e.highlight===!0){
for(var d=$.extend({},e),r=0,b=d.data.multi_item.length;b>r;r++){
var x=d.data.multi_item[r];
x.title=x.title.replace(/<em>/g,"").replace(/<\/em>/g,"");
}
S.data("opt",d);
}else S.data("opt",e);
this.renderData=T,m(e.container,".js_title a,.js_preview");
}
}
},
getData:function(){
return this.renderData;
}
});
return o;
});define("common/wx/media/video.js",["widget/media/richvideo.css","widget/media.css","biz_web/lib/video.js","common/wx/Cgi.js","common/wx/time.js","common/qq/Class.js","biz_web/lib/swfobject.js","tpl/media/video.html.js","tpl/media/simple_videomsg.html.js","tpl/media/wxvideo.html.js","tpl/media/videomsg.html.js"],function(e){
"use strict";
e("widget/media/richvideo.css"),e("widget/media.css");
var i,o=e("biz_web/lib/video.js"),t=e("common/wx/Cgi.js"),d=e("common/wx/time.js"),s=e("common/qq/Class.js"),n=e("biz_web/lib/swfobject.js"),a=e("tpl/media/video.html.js"),r=wx.T,l=wx.data.t,m=document,c=n&&!!n.ua.pv[0],f=m.createElement("video"),u=navigator.userAgent.toLowerCase(),v=/msie/.test(u),p=/firefox/.test(u);
o.options.flash.swf=wx.path.video;
var w={
id:"",
source:"",
type:"",
file_id:""
},h=5e3,g=function _(e){
if(e.video_url){
{
var i="tmp"+(1e5*Math.random()|0);
$('<video id="%s"></video>'.sprintf(i)).appendTo("body");
}
o("#"+i).ready(function(){
$("#"+i).hide();
var o=this;
this.on("error",function(){
o.dispose(),e.dom.find(".loading_tips").show(),e.video_url="",setTimeout(function(){
_(e);
},h);
}),this.on("loadedmetadata",function(){
o.dispose(),$(e.selector).children().remove(),e.for_transfer=!1,e.digest=e.digest?e.digest.html(!1):"",
new x(e);
});
var t=e.video_url;
o.src(f.canPlayType?t:[{
type:"video/x-flv",
src:t+"&trans=1"
}]),o.play();
});
}else t.get({
url:wx.url("/cgi-bin/appmsg?action=get_video_url&videoid=%s".sprintf(e.video_id)),
error:function(){
setTimeout(function(){
_(e);
},h);
}
},function(i){
e.video_url=i.video_url||"",e.video_download_url=i.video_download_url||"",setTimeout(function(){
_(e);
},h);
});
},x=s.declare({
init:function(o){
function t(){
var e=window.navigator.userAgent;
return e.toLowerCase().indexOf("firefox")>-1?!0:e.toLowerCase().indexOf("msie ")>-1&&"Microsoft Internet Explorer"==navigator.appName?!0:!1;
}
var s=this;
if($(o.selector).data("opt",o),o=$.extend(!0,{},w,o),s.id=o.id,s.source=o.source,
s.file_id=o.file_id,s.type=o.type,s.video_url=o.video_url,s.tpl=o.tpl,s.ff_must_flash=o.ff_must_flash,
o.src=s.getVideoURL(),o.token=l||wx.data.t,o.time=o.create_time?d.timeFormat(o.create_time):"",
o.digest=o.digest?o.digest.replace(/<br.*>/g,"\n").html():"",o.for_network="string"==typeof o.video_url?!o.video_url:!o.content,
!o.file_id&&o.multi_item&&o.multi_item.length>0){
var n=o.multi_item[0];
n&&n.cover&&(o.img_url=n.cover);
}
i=e(o.sent?"tpl/media/simple_videomsg.html.js":21==+o.type||9==+o.type||11==+o.type?"tpl/media/wxvideo.html.js":"tpl/media/videomsg.html.js");
var m=$("videomsg"==o.tpl?r(i,o):r(a,o));
s.dom=o.dom=$(o.selector).append(m),"videomsg"==o.tpl&&o.for_transfer&&g(o,s.dom),
s.dom.find(".video_desc").length&&s.dom.find(".video_desc").html(s.dom.find(".video_desc").attr("data-digest").replace(/\n/g,"<br>")),
s.dom.find(".wxVideoScreenshot").on("click",function(){
s.dom.find(".mediaContent").css({
height:"auto"
}),t()?(s.dom.addClass("wxVideoPlaying"),s.dom.find(".wxVideoPlayer").hide(),s.dom.find(".wxVideoNoSupport").show()):s.play(o.play);
}),s.dom.find(".wxNetworkVideo").on("click",function(){
window.open($(this).attr("data-contenturl"));
}),s.dom.find(".video_switch").click(function(){
s.dom.find(".mediaContent").css({
height:"104px"
}),t()?s.dom.removeClass("wxVideoPlaying"):s.pause(o.pause);
});
},
getVideoURL:function(){
var e=this.source,i=this.id,o=(this.msg_id||"",this.file_id);
return e&&(e="&source="+e),this.video_url||"/cgi-bin/getvideodata?msgid={msgid}&fileid={fileid}&token={token}{source}".format({
msgid:i,
fileid:o,
source:e,
token:wx.data.t
});
},
canPlayType:function(){
this.type;
return!f.canPlayType&&!c;
},
play:function(e){
var i=this;
if(i.canPlayType())return void alert("您当前浏览器无法播放视频，请安装Flash插件/更换Chrome浏览器");
var t=this.id,d=this.player;
if(d)return $("#wxVideoBox"+t).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show(),
d.play(),e&&e(this);
var s=i.getVideoURL();
$("#wxVideoBox"+t).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show();
var n="videomsg"==i.tpl?{
width:"100%",
height:"100%"
}:{};
o("#wxVideo"+t,n).ready(function(){
d=this;
var o=0;
return d.on("fullscreenchange",function(){
o?($("#wxVideoPlayer"+t).css({
overflow:"hidden",
zoom:"1"
}),$("#wxVideoBox"+t).css({
"z-index":"0"
})):($("#wxVideoPlayer"+t).css({
overflow:"visible",
zoom:"normal"
}),$("#wxVideoBox"+t).css({
"z-index":"1"
})),o=~o;
}),d.on("ended",function(){
this.currentTime(0);
}),d.src(v||!f.canPlayType||i.ff_must_flash&&p?[{
type:"video/x-flv",
src:s+"&trans=1"
}]:s),d.play(),i.player=d,e&&e(this);
});
},
pause:function(e){
var i=this.player;
i&&i.pause(),$("#wxVideoBox"+this.id).removeClass("wxVideoPlaying").find(".wxVideoPlayContent").hide(),
e&&e(this);
}
});
return x;
});define("common/wx/media/img.js",["widget/media.css","tpl/media/img.html.js","tpl/media/appmsg_edit/image_article_content.html.js","common/qq/Class.js"],function(i){
"use strict";
var t=(wx.T,i("widget/media.css"),i("tpl/media/img.html.js")),e=i("tpl/media/appmsg_edit/image_article_content.html.js"),a=i("common/qq/Class.js"),d=a.declare({
init:function(i){
if(i&&i.container){
var a,d=i,m="/cgi-bin/getimgdata?token="+wx.data.t+"&msgid="+i.msgid+"&mode=small&source="+i.source+"&fileId="+i.file_id+"&ow="+~i.fakeid;
console.log("img init",i),i.append?($(i.container).append('<div data-type="2" class="js_previe_media_box">'+wx.T(e,{
share_imageinfo:[{
cdn_url:m
}]
})+"</div>").data("opt",i),a=new Image,a.onload=function(){
i.imgWidth=a.width,i.imgHeight=a.height,a=null;
},a.src=m):$(i.container).html(wx.T(t,{
token:wx.data.t,
id:i.file_id,
msgid:i.msgid||"",
source:i.source||"",
ow:~i.fakeid,
payEmoji:i.payEmoji
})).data("opt",i),this.data=d;
}
},
getData:function(){
return console.log(this),this.data;
}
});
return d;
});define("tpl/media/chooseOriArticlePubPopover.html.js",[],function(){
return'<p style="color: rgb(34, 34, 34);">根据<a href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=11526652746MV5HH&version=1&lang={=lang}&platform=2" target="_blank">原创转载规则</a>，你可以选择下列发送方式：</p>\n<ul>\n  <li style="overflow: hidden; margin-top: 15px; {if onlyShare}display: none;{/if}" >\n    <input type="radio" class="frm_radio js_pubWay" name="ori_publish_way" value="0"{if value == 0} checked{/if}>\n    <div style="float: right; width: 195px;">\n    	<label>转载</label>\n    	<div class="js_msg" style="margin-top: 10px; color: #9A9A9A;{if value == 1} display: none;{/if}">{=reprintMsg}</div>\n    </div>\n  </li>\n  <li style="overflow: hidden; margin-top: 15px;">\n    <input type="radio" class="frm_radio js_pubWay" name="ori_publish_way" value="1"{if value == 1} checked{/if}>\n    <div style="float: right; width: 195px;">\n      <label>分享</label>\n      <div class="js_msg" style="margin-top: 10px; color: #9A9A9A;{if value == 0} display: none;{/if}">用户需要跳转至原文阅读</div>\n    </div>\n  </li>\n</ul>';
});