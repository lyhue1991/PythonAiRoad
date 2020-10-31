define("tpl/cardticket/send_card.html.js",[],function(){
return'<div>\n	<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_card_list"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	<div class="second_step js_step_content js_step2">\n	</div>\n</div>';
});define("cardticket/send_card_table.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","cardticket/create_card_select.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$container,e.find(".js_card_list").html(k({
loading:!0
}));
}
function a(t,a){
var r=a.opt,c=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count,
tag_filter:r.tag_filter,
filter_out_expired_card:r.filter_out_expired_card
},r.param);
1==r.view_mode&&(c.sub_merchant_id=0),w=!0,e(a),o.get({
url:r.url||"/merchant/electroniccardmgr",
data:c,
complete:function(){
w=!1;
}
},function(t){
if(0==t.base_resp.ret){
var e=t,n=t.card_dispatching_list;
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,r.data=t.card_list;
var s=l.parse_cardlist(r.data);
if(b=s.card_cache,r.data=s.card_list,r.cache_data=b,r.acl={
is_can_shake:e.is_can_shake_card,
is_can_use_sns_card:e.is_can_use_sns_card,
is_intercomm_card:e.is_intercomm_card,
is_can_card_friend:e.is_can_use_sns_card
},n)try{
var _=$.parseJSON(e.card_dispatching_list);
if(_){
_=_.card_dispatching_list;
for(var d=0;d<_.length;d++){
var u=_[d],p=b[u.card_id];
p&&(p.cansend=!u.is_dispatching);
}
}
}catch(h){}
if(r.pageInfo.total_count=t.total_num,e.biz_quota_json){
var m=$.parseJSON(e.biz_quota_json);
m=f.parse_assistsend_quota(m.quota_list),a._quota=m;
}
i(r.pageInfo,a);
}else o.handleRet(t,{
id:64463,
key:33,
url:"/merchant/electroniccardmgr"
}),(new Image).src="https://badjs.weixinbridge.com/badjs?id=33&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent("[card][sendout_err][cgi=/merchant/electroniccardmgr][data="+JSON.stringify(c)+"][ret="+(t?t.base_resp.ret:"null")+"]");
});
}
function i(t,e,a){
var i,_=e.opt;
if(_.payflag=_.param.flag,i=e.$container,a){
var o=i.find(".js_select");
return o.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.pagebar=null,s(_.pageInfo,e),void(e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a));
}
if(_.data&&"undefined"!=typeof _.sub_merchant_id)for(var d=0;d<_.data.length;d++)_.sub_merchant_id?_.data[d].sub_merchant_id!=_.sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0):_.data[d].sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0);
i.find(".js_card_list").html(k(_));
var l=_.defaultValues,o=i.find(".js_select");
l.length&&o.each(function(){
for(var t=$(this),e=0;e<l.length;e++)if(l[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=o.checkbox({
onChanged:function(){
if(_.multi){
var t=0;
o.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",i).text(t);
}
}
}),e.pagebar=null,s(_.pageInfo,e),c(e),n(e),1==_.no_filter||r(e);
var u,p=[];
1==_.sns_card_type?u=o.filter(".js_select_disabled_1"):2==_.sns_card_type&&(u=o.filter(".js_select_disabled_2")),
u&&(u.each(function(){
p.push($(this).val());
}),e.select_card_checkbox.disable(p)),$(".js_add_card_link",i).click(function(){
return new h({
ispay:_.payflag,
is_sns_card:window.wx_is_can_use_sns_card
}),e.opt.hidePopup&&e.opt.hidePopup(),!1;
}),e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a);
}
function r(t){
var e=t.opt;
if("2"!=e.sns_card_type){
var i=[];
1==e.sns_card_type?i=[{
name:"全部卡券",
value:"friends,0"
}]:0==e.sns_card_type&&(i=[{
name:"全部卡券",
value:""
}],e.acl.is_can_card_friend&&i.push({
name:"朋友共享的券",
value:"friends,1"
})),e.acl.is_can_shake&&i.push({
name:"摇一摇",
value:"shake,1"
}),e.acl.is_intercomm_card;
var r=t.base_tag_filter?"|":"",c={};
if(c[t.base_tag_filter+r+"task,1"]="互通",c[t.base_tag_filter+r+"shake,1"]="摇一摇",c[t.base_tag_filter+r+"friends,1"]="朋友的券",
i.length>1){
new u({
container:$(".js_filter_tag",t.$container),
label:c[e.tag_filter]||"全部卡券",
data:i,
callback:function(i){
var r=t.base_tag_filter+(t.base_tag_filter&&i?"|"+i:i);
r!=e.tag_filter&&(e.tag_filter=r,a(e.pageInfo,t));
}
});
}
}
}
function c(t){
function e(e){
var i=$.trim(c.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(n.param.keyword=i,a(n.pageInfo,t));
}
var i=t.$container,r=$(".js_search",i),c=$(".js_keyword",i),n=t.opt;
r.click(function(){
e();
}),c.keyup(function(t){
e(t);
}),c.val(n.param.keyword);
}
function n(t){
var e=t.$container,a=e.find(".js_modify_quantity");
a.each(function(){
var e=$(this),a=1*e.attr("data-new")||0;
new y({
container:e,
mode:"fixed",
cache_card:t.opt.cache_data,
setquantity:a?!0:!1,
max_sku_for_eachcard:t._quota&&t._quota.max_sku||1e4,
quantityChange:function(t,a){
var i=b[t];
if(i){
if(i.pay_info.is_swipe_card)return i.pay_info.swipe_card_status=1,void e.hide();
i.quantity=this.opt.setquantity?i.quantity+a:a,e.attr("data-new",1),i.isnew=!0,this.opt.setquantity=!0,
$("#js_ct_tr_"+t).find(".js_sendcard_quantity").text(i.quantity);
}
}
});
});
}
function s(t,e){
var r=t.total_count,c=e.$container;
if(t.count&&r>t.count){
var n=t.begin/t.count;
e.pagebar=new d({
container:$(".js_pager",c),
first:!1,
last:!1,
midRange:5,
initShowPage:n+1,
perPage:t.count,
totalItemsNum:r,
callback:function(r){
if(w)return!1;
var c=r.currentPage;
return c!=n+1&&(t.begin=(c-1)*t.count,e.opt.hasdata&&e.opt.data?i(t,e,!0):a(t,e)),
e.opt.pageChanged&&e.opt.pageChanged.call(e),!0;
}
});
}
}
var _=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),d=(t("common/wx/Step.js"),t("common/wx/pagebar.js")),l=t("cardticket/parse_data.js"),u=t("biz_web/ui/dropdown.js"),p=t("cardticket/store_cgi.js"),f=t("cardticket/common_template_helper.js"),h=t("cardticket/create_card_select.js"),m={
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
sns_card_type:1,
defaultValues:[],
url:"",
removeOnHide:!0,
source:"",
has_sendout:!1,
acl:{},
view_mode:0,
sub_merchant_id:void 0,
filter_out_expired_card:1
},g=t("tpl/cardticket/card_table.html.js"),b=(template.compile(t("tpl/cardticket/card_preview.html.js")),
{});
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var v=function(t){
this.opt=$.extend(!0,{},m,t),this.opt.tag_filter=0==this.opt.sns_card_type?"":2==this.opt.sns_card_type?"friends,1":"friends,0",
this.init();
},k=template.compile(g),w=!1,y=t("cardticket/card_quantity.js");
return v.prototype={
_html:g,
init:function(){
var t=this.opt,e=this;
if(this.$container=$(t.container),e.base_tag_filter="",2==t.view_mode&&(e.base_tag_filter="sub_merchant,1",
t.tag_filter=t.tag_filter?e.base_tag_filter+"|"+t.tag_filter:e.base_tag_filter),
t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,b={};
for(var r=0;r<t.data.length;r++){
var c=t.data[r];
b[c.id]=c;
}
i(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$container.show();
},
select:function(){
if(!w){
var t=this,e=this.opt,a=t.select_card_checkbox.values()[0],i=this.$container,r=b[a];
if(!a||!r)return void _.err("请选择卡券");
if(!e.neednew||!r.pay_info.is_swipe_card||0==r.pay_info.swipe_card_status||0!=r.quantity){
if(e.multi)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(e.neednew&&(!s.isnew||0==s.quantity))return void _.err("卡券库存不能为0，请先设置库存再投放");
}else if(e.neednew&&(!r.isnew||0==r.quantity))return _.err("卡券库存不能为0，请先设置库存再投放"),
void setTimeout(function(){
var t=i.find("input[data-id="+a+"]");
$(t.closest("tr").find(".js_modify_quantity")[0]).click();
},50);
if(!e.multi&&e.noexpire&&r.is_expire)return void _.err(r.is_sns_card?"卡券已过期":"卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(e.multi&&e.noexpire)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(s.is_expire)return void _.err("不能选择已过期的卡券，请先到卡券详情去延长有效期");
}
var c=t.select_card_checkbox.values();
return c.length>e.maxcount?void _.err("最多只能选择%s个卡券".sprintf(e.maxcount)):2!=e.sns_card_type||r.is_sns_card?1==e.sns_card_type&&r.is_sns_card?void _.err("朋友的券只能进行社交投放, 请重新选择"):"undefined"!=typeof e.sub_merchant_id&&r.is_sub_merchant_disabled?void _.err("不支持赠送其他商户的“朋友的券”，请重新选择。"):void p.canSendCard({
card_id:a,
success:function(a){
if(a===!1)_.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var i=t.select_card_checkbox.values(),r=e.multi?i:i,c=[];
if(e.multi)for(var n=0;n<r.length;n++)b[r[n]].cardid=b[r[n]].id,c.push(b[r[n]]);else c=b[r],
c.cardid=b[r].id;
e.selectComplete&&e.selectComplete(c,0);
}
}
}):void _.err("朋友的券才能进行社交投放, 请重新选择");
}
switch(r.pay_info.swipe_card_status){
case 1:
_.err("添加库存暂未生效，待商户审核完成");
break;

case 3:
_.err("请先激活本券");
break;

case 2:
case 4:
_.err("卡券库存不能为0，请先设置库存再投放");
}
}
},
isLoading:function(){
return w;
},
hide:function(){
this.$container.hide();
},
destroy:function(){
this.$container.remove();
}
},v;
});define("tpl/media/appmsg_tmpl.html.js",[],function(){
return'<div class="js_appmsg weui-desktop-card weui-desktop-appmsg" data-id="{appmsgid}">\n  <div class="weui-desktop-card__inner">\n    <div class="weui-desktop-card__bd">\n      <div class="weui-desktop-appmsg__cover-item weui-desktop-appmsg__cover_thumb">\n        <div class="weui-desktop-appmsg__cover__title__wrp">\n          <span class="weui-desktop-appmsg__cover__title js_title">{=title_encode}</span>\n        </div>\n        <div class="weui-desktop-appmsg__cover__thumb">{=iframeHtml}</div>\n        {if canPreview}\n        {else if !canSelect}\n        <div class="weui-desktop-mask weui-desktop-mask_status weui-desktop-mask_transparent">\n        </div>\n        {/if}\n      </div>\n      {if canSelect}\n      <div class="js_mask weui-desktop-mask weui-desktop-mask_status">\n        <i class="icon_card_selected">已选择</i>\n      </div>\n      {/if}\n    </div>\n    <div class="weui-desktop-card__ft">\n      {if showEdit}\n      <div class="weui-desktop-appmsg__opr weui-desktop-link-group">\n        <div class="weui-desktop-tooltip__wrp weui-desktop-link">\n          <a target="_blank" href="/cgi-bin/appmsgtemplate?action=edit&lang=zh_CN&token={token}&appmsgid={appmsgid}" class="weui-desktop-icon-btn">\n            <svg width="16" height="17" xmlns="http://www.w3.org/2000/svg">\n              <use xlink:href="#common-edit"></use>\n            </svg>\n          </a>\n          <span class="weui-desktop-tooltip weui-desktop-tooltip__down-center">编辑</span></div>\n        <div class="weui-desktop-popover__wrp weui-desktop-link js_del_wrap">\n        <!-- 点击weui-desktop-popover__target的时候往weui-desktop-popover__wrp加class: weui-desktop-popover_show -->\n          <span class="weui-desktop-popover__target">\n            <div class="weui-desktop-tooltip__wrp">\n              <a href="javascript:;" data-id="{appmsgid}" class="js_del weui-desktop-icon-btn">\n                <svg width="16" height="18" xmlns="http://www.w3.org/2000/svg">\n                  <use xlink:href="#common-del" ></use>\n                </svg>\n              </a>\n              <span class="weui-desktop-tooltip weui-desktop-tooltip__down-center">删除</span></div>\n          </span>\n          <div class="weui-desktop-popover weui-desktop-popover_pos-up-center">\n            <div class="weui-desktop-popover__inner">\n              <div class="weui-desktop-popover__desc">\n                删除后不会影响已群发的图文消息，确定删除该模版？              </div>\n              <div class="weui-desktop-popover__bar">\n                  <button type="button" class="js_del_confirm weui-desktop-btn weui-desktop-btn_primary" data-id="{appmsgid}">删除</button>\n                  <button type="button" class="js_del_cancel weui-desktop-btn weui-desktop-btn_default">取消</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!--\n      <div class="appmsg_opr">\n        <ul>\n          <li class="appmsg_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="" data-tooltip="编辑">&nbsp;<i class="icon18_common edit_gray">编辑</i></a>\n          </li>\n          <li class="appmsg_opr_item grid_item size1of2 no_extra">\n            <a class="no_extra js_tooltip" href="javascript:void(0);" data-tooltip="删除">&nbsp;<i class="icon18_common del_gray">删除</i></a>\n          </li>\n        </ul>\n      </div>\n      -->\n      {/if}\n      {if showUpdateTime}\n      <div class="weui-desktop-appmsg__tips weui-desktop-tips ">更新于 {update_time_str}</div>\n      {/if}\n    </div>\n  </div>\n</div>\n<svg xmlns="http://www.w3.org/2000/svg" style="width: 0px; height: 0px; visibility: hidden; position: absolute; z-index: -1;"><symbol id="common-edit" viewBox="0 0 16 17"><path d="M8 1H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8h-2v7H2V3h6V1z"></path><path d="M15.185 2.714l.448-.448c.3-.3.31-.81 0-1.118l-.296-.296a.787.787 0 0 0-1.118 0l-.448.448 1.414 1.414zm-.707.707L8.414 9.485 7 8.071l6.064-6.064 1.414 1.414zm-8.15 6.21L7 8.071l1.414 1.414-1.56.673c-.515.222-.747-.016-.526-.527z"></path></symbol><symbol id="common-del" viewBox="0 0 16 18"><path d="M1 5c-.556 0-1-.448-1-1 0-.556.448-1 1-1h14c.555 0 1 .448 1 1 0 .556-.448 1-1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5zm12 0H3v11h10V5zM5.99 0h4.02A1 1 0 0 1 11 1v1H5V1c0-.556.444-1 .99-1zM10 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C9 7.453 9.448 7 10 7zM6 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C5 7.453 5.448 7 6 7z"></path></symbol></svg>\n';
});define("tpl/popup.html.js",[],function(){
return'<div class="dialog_wrp {className}" style="{if width}width:{width}px;{/if}{if height}height:{height}px;{/if}">\n	<div class="dialog">\n		<div class="dialog_hd">\n			<h3>{title}</h3>\n      <button onclick="return false;" class="weui-desktop-icon-btn weui-desktop-dialog__close-btn pop_closed">\n        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><title>Element / Icon - Close</title><path d="M10.01 8.996l7.922-7.922c.086-.086.085-.21.008-.289l-.73-.73c-.075-.074-.208-.075-.29.007L9 7.984 1.077.062C.995-.02.863-.019.788.055l-.73.73c-.078.078-.079.203.007.29l7.922 7.92-7.922 7.922c-.086.086-.085.212-.007.29l.73.73c.075.074.207.074.29-.008l7.92-7.921 7.922 7.921c.082.082.215.082.29.008l.73-.73c.077-.078.078-.204-.008-.29l-7.921-7.921z"/></svg>\n      </button>\n      <!--\n      <a href="javascript:;" onclick="return false" class="icon16_opr closed pop_closed">关闭</a>\n      -->\n		</div>\n		<div class="dialog_bd {contentClassName}">{=content}</div>\n		{if buttons && buttons.length}\n		<div class="dialog_ft">\n			{if miniTips}\n			<div class="js_mini_tips dialog_tool_tips">\n                {=miniTips.text}\n            </div>\n			{/if}\n			{each buttons as bt index}\n            <span style="{if bt.isHide}display:none;{/if}" class="{bt.classWrap} btn {bt.type} btn_input js_btn_p"><button type="button" class="js_btn" data-index="{index}">{bt.text}</button></span>\n	        {/each}\n		</div>\n		{/if}\n	</div>\n</div>{if mask}<div class="mask"><iframe frameborder="0" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0px;left:0px;width:100%;height:100%;" src="about:blank"></iframe></div>{/if}\n';
});define("common/wx/widgetBridge.js",[],function(){
"use strict";
$.widgetBridge||($.widgetBridge=function(t,e){
var i=t,n=i.split("."),t=n.length>1?n[1]:n[0];
$.fn[t]=function(n){
var o="string"==typeof n,r=[].slice.call(arguments,1),a=this;
if(n=n||{},o){
var s;
return 0!==n.indexOf("_")&&this.each(function(){
var e=$.data(this,i);
return e?"instance"===n?(s=e,!1):"option"===n?(s=e.options,!1):(s||(s=(e[n]||jQuery.noop).apply(e,r)),
void("destroy"===n&&(e.elements=null))):$.error("cannot call methods on "+t+" prior to initialization; attempted to call method '"+n+"'");
}),s;
}
var d=this;
return this.each(function(){
var t=this,o=$.data(this,i);
if(!o){
o=$.extend(!0,{},e),o.destroy||(o.destroy=function(){
$.removeData(t,i);
}),o.options=$.extend(!0,o.options||{},n),o.element=$(this),o.elements=d,o._create&&(a=o._create.call(o,n));
var r=a&&a.length&&a.get(0)||this;
$.data(r,i,o);
}
}),a;
};
});
});define("tpl/media/appmsg_list.html.js",[],function(){
return'{each data as item}\n<ul class="s_row"  data-id="{item.id}" data-index="{item.index}">\n    <li class="s_cell last_child">\n        <label class="frm_radio_label {if !item.cover||!item.title}disabled {/if}">\n            <i class="icon_radio"></i>\n            <span class="lbl_content">\n              {if item.is_pay_subscribe == 1}\n              <span class="weui-desktop-key-tag weui-desktop-key-tag_pay select_appmsg_pay_icon">付费</span>\n              {/if} \n              {if (item.cover || item.share_page_type == 7) && item.title }\n              <a class="select_appmsg_title jsTempLink" href="javascript:;">{=item.title}</a>\n              {else}\n              <span class="select_appmsg_title">{=item.title}</span>\n              {/if}\n              {if item.info}<span class="weui-desktop-tips">{item.info}</span>{/if}\n              <span class="select_appmsg_date">{item.time}</span>\n            </span>\n            <input type="radio" class="frm_radio jsAppmsgRadio"  >\n        </label>\n    </li>\n</ul>\n{/each}\n';
});define("tpl/media/appmsg_dialog.html.js",[],function(){
return'<div class="appmsg_list_wrp js_content js_appmsg">\n  <div class="search_wrp">\n    <span class="frm_input_box search append with_del">\n      <a class="del_btn  js_search_clear_btn" style="display: none;" href="javascript:;"><i class="icon_search_del"></i>&nbsp;</a>\n      <a href="javascript:void(0);" class="frm_input_append js_search_btn" onclick="return false;">\n        <i class="icon16_common search_gray">\n          搜索        </i>\n        &nbsp;\n      </a>\n      <input type="text" placeholder="搜索图文消息" value="" class="frm_input js_search">\n    </span>\n  </div>\n  <div class="s_table_wrp js_appmsg_list js_list">\n    <div class="s_table">\n      <ul class="s_thead">\n        <li class="s_th s_cell">文章标题</li>\n        <li class="s_th s_cell last_child">最近修改时间</li>\n      </ul>\n      <div class="s_tbody ">\n        <div class="s_tbody_inner js_tbody">\n        </div>\n        <div class="js_loading empty_tips" style="display:none">\n          <i class="icon_loading_small white"></i>\n        </div>\n        <div class="empty_tips js_empty" style="display:none">\n          暂无素材库文章        </div>\n      </div>\n    </div>\n  </div>\n  <!-- for: 编辑器更多阅读选择指定文章 start  -->\n  <p class="select-article__after-tip tips_global l js_appmsg_dialog_opr" style="display: none;"><span class="js_selected_desc">已选择0篇文章</span>&nbsp;<a href="javascript:;" class="js_selected_cancel">取消选择</a></p>\n  <!-- for: 编辑器更多阅读选择指定文章 end  -->\n  <div class="pagination_wrp js_pagebar"></div>\n</div>\n';
});define("common/wx/top.js",["tpl/top.html.js"],function(a,e,t){
"use strict";
function i(a,e,t){
return this.dom=$(a),this.dom.addClass("title_tab"),e&&"string"==typeof e&&(e=[{
name:"",
url:"javascript:;",
className:"selected"
}]),$.each(e,function(a,e){
e.url=e.url&&[e.url,wx.data.param].join("")||"javascript:;";
}),this.dom.html(template.compile(n)({
data:e
})),t&&t.render&&"function"==typeof t.render?$.each(this.dom.find("li"),function(a,i){
t.render.apply($(i),[e[a],t&&t.data]);
}):this.dom.html(template.compile(n)({
data:e
})),this.dom.on("click",".top_item",function(){
$(this).addClass("selected").siblings().removeClass("selected");
}),this;
}
var n=a("tpl/top.html.js"),s=wx.acl;
i.prototype.selected=function(a){
this.dom.find(".js_top").removeClass("selected"),"number"==typeof a?this.dom.find(".js_top:eq("+a+")").addClass("selected"):this.dom.find(".js_top[data-id="+a+"]").addClass("selected");
};
var c=1e3*window.wx.data.time>new Date(2020,0,15,0,0,0).getTime();
i.DATA={
setting:[{
id:"info",
name:"帐号详情",
url:"/cgi-bin/settingpage?t=setting/index&action=index"
},{
id:"function",
name:"功能设置",
url:"/cgi-bin/settingpage?t=setting/function&action=function"
},{
id:"auth_plugins",
name:"授权管理",
url:"/cgi-bin/component_unauthorize?action=list"
}],
mass:[{
id:"send",
name:"新建群发消息",
url:"/cgi-bin/masssendpage?t=mass/send"
},{
id:"jurisdiction",
name:"授权申请",
acl:s&&s.msg_acl&&s.msg_acl.can_use_reprintapply_list,
url:"/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0&lang=zh_CN"
}],
message:[{
id:"total",
name:"全部消息",
url:"/cgi-bin/message?t=message/list&count=20&day=7"
},{
id:"star",
name:"已收藏的消息",
url:"/cgi-bin/message?t=message/list&count=20&action=star"
},{
id:"search",
name:"搜索结果"
}],
media:[{
id:"media10",
name:"图文消息",
acl:s&&s.material_acl&&s.material_acl.can_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&type=10&action=list_card"
},{
id:"media2",
name:"图片",
acl:s&&s.material_acl&&s.material_acl.can_image_msg,
url:"/cgi-bin/filepage?type=2&begin=0&count=12&t=media/img_list"
},{
id:"media3",
name:"音频",
acl:s&&s.material_acl&&s.material_acl.can_voice_msg,
url:"/cgi-bin/filepage?type=3&begin=0&count=21&t=media/list"
},{
id:"media15",
name:"视频",
acl:s&&s.material_acl&&s.material_acl.can_video_msg,
url:"/cgi-bin/appmsg?begin=0&count=9&t=media/video_list&action=list_video&type=15"
},{
id:"product",
name:"商品",
acl:s&&s.product_acl&&s.product_acl.can_see_product,
url:"/cgi-bin/productmaterial?action=product_list"
}],
business:[{
id:"overview",
name:"数据概览",
url:"/merchant/business?t=business/overview&action=overview"
},{
id:"order",
name:"订单流水",
url:"/merchant/business?t=business/order&action=order"
},{
id:"info",
name:"商户信息",
url:"/merchant/business?t=business/info&action=info"
},{
id:"test",
name:"支付测试",
url:"/merchant/business?t=business/whitelist&action=whitelist"
},{
id:"rights",
name:"维权仲裁",
url:"/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"
},{
id:"course",
name:"使用教程",
url:"/merchant/business?t=business/course&action=course"
}],
user:[{
id:"useradmin",
name:"已关注",
url:"/cgi-bin/contactmanage?t=user/index&pagesize=10&pageidx=0&type=0&groupid=0"
}],
statistics:{
user:[{
id:"summary",
name:"用户增长",
url:"/misc/pluginloginpage?action=stat_user_summary&pluginid=luopan&t=statistics/index"
},{
id:"attr",
name:"用户属性",
url:"/misc/pluginloginpage?action=stat_user_attr&pluginid=luopan&t=statistics/index"
}],
article:[{
id:"detail",
name:"图文群发",
url:"/misc/pluginloginpage?action=stat_article_detail&pluginid=luopan&t=statistics/index"
},{
id:"analyse",
name:"图文统计",
url:"/misc/pluginloginpage?action=stat_article_analyse&pluginid=luopan&t=statistics/index"
}],
message:[{
id:"message",
name:"消息分析",
url:"/misc/pluginloginpage?action=stat_message&pluginid=luopan&t=statistics/index"
},{
id:"key",
name:"消息关键词",
url:"/misc/pluginloginpage?action=ctr_keyword&pluginid=luopan&t=statistics/index"
}],
"interface":[{
id:"interface",
name:"接口分析",
url:"/misc/pluginloginpage?action=stat_interface&pluginid=luopan&t=statistics/index"
}]
},
notification:[{
id:"notification",
name:"通知中心",
url:"/cgi-bin/frame?t=notification/index_frame"
}],
templateMessage:[{
id:"my_template",
name:"我的模版",
url:"/advanced/tmplmsg?action=list&t=tmplmsg/list"
},{
id:"template_message",
name:"模版库",
url:"/advanced/tmplmsg?action=tmpl_store&t=tmplmsg/store"
}],
assistant:[{
id:"mphelper",
name:"公众号助手",
url:"/misc/assistant?t=setting/mphelper&action=mphelper"
},{
id:"warning",
name:"接口告警",
url:"/misc/assistant?t=setting/warning&action=warning"
}],
shop:[{
id:"shopupgrade",
name:"下线通知",
url:"/merchant/merchantentrance?action=getupgradestatus"
},{
id:"shopoverview",
name:"小店概况",
url:"/merchant/merchantstat?t=shop/overview&action=getoverview"
},{
id:"addGoods",
name:"添加商品",
url:"/merchant/goods?type=11&t=shop/precreate",
target:"_blank"
},{
id:"goodsManagement",
name:"商品管理",
url:"/merchant/goodsgroup?t=shop/category&type=1"
},{
id:"shelfManagement",
name:"货架管理",
url:"/merchant/shelf?status=0&action=get_shelflist&t=shop/myshelf&offset=0&count=5"
},{
id:"orderManagement",
name:"订单管理",
url:"/merchant/productorder?action=getlist&t=shop/order_list&last_days=30&count=10&offset=0"
},{
id:"deliverylist",
name:"运费管理",
url:"/merchant/delivery?action=globalfee&t=shop/delivery_global"
},{
id:"images",
name:"图片库",
url:"/merchant/goodsimage?action=getimage&t=shop/shop_img&count=20&offset=0"
}],
adClient:[{
id:"adclientreport",
name:"报表统计",
url:"/merchant/ad_client_report?t=ad_system/client_report&action=list"
},{
id:"adclientmanage",
name:"广告管理",
url:"/merchant/advert?t=ad_system/promotion_list&action=get_advert_count"
},{
id:"materialmanage",
name:"推广页管理",
url:"/merchant/ad_material?t=material/list&action=get_material_list"
},{
id:"adclientpay",
name:"财务管理",
url:"/cgi-bin/frame?nav=10026&t=ad_system/host_frame"
},{
id:"adservice",
name:"广告服务商",
acl:s&&s.ad_system&&s.ad_system.can_use_sp,
url:"/cgi-bin/frame?nav=10026&t=ad_system/client_service_frame"
}],
adHost:[{
id:"adhostreport",
name:"报表统计",
url:"/merchant/ad_host_report?t=ad_system/host_report"
},{
id:"adhostmanage",
name:"流量管理",
url:"/merchant/ad_host_manage?t=ad_system/host_manage"
},{
id:"adhostpay",
name:"财务管理",
url:"/merchant/ad_host_pay?action=ad_host_pay&t=ad_system/host_pay"
}],
advanced:[{
id:"dev",
name:"日志查询",
url:"/advanced/advanced?action=log_home"
},{
id:"group-alert",
name:"接口报警",
url:"/advanced/advanced?action=alarm&t=advanced/alarm"
}],
cardticket:[{
id:"cardmgr",
name:"卡券管理",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card"
},{
id:"permission",
name:"卡券核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission"
},{
id:"carduse",
name:"核销记录",
url:"/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record"
},{
id:"cardreport",
name:"数据报表",
url:"/merchant/ecardreport?action=overviewpage&t=cardticket/overviewpage"
}],
infringement:[{
id:"infringement",
name:"我要投诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=1"
},{
id:"antiinfringement",
name:"我要申诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=2"
},{
id:"list",
name:"提交记录",
url:"/acct/infringement?action=getlist&t=infringement/ingringement_list&type=1&begin=0&count=10"
}],
scan:[{
id:"overview",
name:"数据概况",
url:"/merchant/scandataoverview?action=keydata"
},{
id:"product_list",
name:"商品管理",
url:"/merchant/scanproductlist?action=list&page=1&status=1"
},{
id:"firmcat_list",
name:"资质管理",
url:"/merchant/scanqualification?action=firmcatpage"
}],
rumor:[{
id:"list",
name:"谣言池",
url:"/misc/rumor?action=rumorlist&t=rumor/list"
},{
id:"result",
name:"辟谣数据",
url:"/misc/rumor?action=summarylist&t=rumor/result"
}],
reward:[{
id:"list",
name:"数据概况",
url:"/merchant/rewardstat?action=getoverview&t=reward/overview"
},{
id:"setting",
name:"赞赏设置",
url:"/merchant/reward?action=rewardsetting"
}],
discuss:[{
id:"list_latest",
name:"留言列表",
url:"/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7"
},{
id:"index",
name:"群发消息管理",
url:"/misc/appmsgcomment?action=list_app_msg&begin=0&count=10"
}],
search:[{
id:"search",
name:"搜索",
url:"/advanced/componentsearch?action=search"
},{
id:"authorized",
name:"已添加",
url:"/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins"
}],
kf:[{
id:"account",
name:"帐号管理",
url:"/misc/kf?t=services/list&action=list"
},{
id:"state",
name:"客服数据",
url:"/misc/kf?t=services/kf_stat&action=getstatpage"
},{
id:"media",
name:"客服素材",
url:"/misc/kf?t=services/kf-public-text&action=publicreplypage"
}],
ibeacon:[{
id:"deviceManagement",
name:"设备管理",
url:"/merchant/beacongetdevices?action=list"
},{
id:"pageManagement",
name:"页面管理",
url:"/merchant/beaconlistpage?action=list&need_dc=1"
}]
},s&&s.ad_system&&s.ad_system.can_use_new_ad&&(i.DATA.adClient[0].url="/cgi-bin/frame?nav=10026&t=ad_system/client_report_frame",
i.DATA.adClient[1].url="/cgi-bin/frame?nav=10026&t=ad_system/promotion_list_frame"),
s&&s.merchant_acl&&s.merchant_acl.can_use_account_manage&&i.DATA.adClient.push({
id:"adclientaccountmanage",
name:"账户管理",
acl:s&&s.ad_system&&s.ad_system.can_use_account_manage,
url:"/cgi-bin/frame?nav=10026&t=ad_system/account_frame"
}),s&&s.merchant_acl&&s.merchant_acl.can_use_pay_tmpl&&i.DATA.templateMessage.push({
id:"template_pay_list",
name:"支付模版消息",
url:"/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment"
}),s&&s.merchant_acl&&2==s.merchant_acl.wxa_mall_status&&i.DATA.shop.push({
id:"weapp_shop_weapp_management",
name:"小程序管理",
url:"/misc/wxaadmin?action=index"
}),(!c||c&&window.wx&&window.wx.cgiData&&2===window.wx.cgiData.service_type)&&i.DATA.media.unshift({
id:"media11",
name:"商品消息",
acl:s&&s.material_acl&&s.material_acl.can_commodity_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list&type=11&action=list"
}),i.RENDER={
setting:function(a,e){
"meeting"==a.id&&15!=e.role&&this.remove();
},
message:function(a,e){
"search"!=a.id||e&&"search"==e.action||this.remove();
},
assistant:function(a,e){
"warning"!=a.id||e&&0!=e.have_service_package||this.remove();
},
reward:function(a,e){
"invite"!=a.id||e&&0!=e.invite_authority||this.remove();
}
},t.exports=i;
});!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);define("media/reprint_article.js",["media/common.js","media/base_article.js","common/wx/Tips.js"],function(t){
"use strict";
var e=t("media/common.js"),i=t("media/base_article.js"),r=t("common/wx/Tips.js"),n=i.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var t=i.prototype.initData.call(this);
return t.set("guide_words",t.get("guide_words")),t.set("is_share_copyright",0),t.set("copyright_type",2),
t.set("share_page_type",0),t;
},
getDigestFromContent:function(){
var t=this.data;
return $.trim(t.get("guide_words").text().html(!1).substr(0,120))||$.trim(t.get("content").text().html(!1).substr(0,54));
},
setEditorContent:function(){
var t=this;
t._o.ueditor.ready(function(){
var e=t.data.getData(),i=t._o.ueditor;
i.setContent({
content:"",
data:e
});
try{
i.setContent({
content:e.content,
data:e
});
}catch(r){
e.content&&""==i.getUeditor().getContent()&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_setcontent_error;errmsg:%s,uin:%s".sprintf(28308,0,r.message,wx.data.uin),
"undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&r&&r.stack&&window.WX_BJ_REPORT.BadJs.report("EventError","editor_setcontent_error",{
mid:window.PAGE_MID,
stack:r.stack
}),r.stack&&console&&console.error&&console.error("[BJ-REPORT]",r.stack));
}
i.setHistory(t.getHistory());
});
},
flush:function(){
{
var t=this.data,e=this._o.$infoContainer;
this._o.cgiData;
}
return this.flushField(),this.flushGuidWords(),t.setData(this._o.ueditor.getEditorData(t.getData())),
this.setDigest(),t.set("guide_words",t.get("guide_words")),"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE"===this._o.data.source_reprint_status?(t.set("reprint_recommend_title",""),
t.set("reprint_recommend_content","")):(t.set("reprint_recommend_title",e.find(".js_reprint_recommend_title").val()),
""===$.trim(e.find(".js_reprint_recommend_content")[0].innerText)?t.set("reprint_recommend_content",""):t.set("reprint_recommend_content",e.find(".js_reprint_recommend_content").html())),
this.flushCommon(),this;
},
getAllImgData:function(){
var t=this._o.ueditor,e=t.fireEvent("getRemoteList"),i=[];
for(var r in e){
var n=e[r];
i.push(n.uid);
}
i=0==i.length?"":","+i.join(",")+",";
for(var s=t.getDocument(),a=s.getElementsByTagName("*"),o=",",d=[],r=0,c=a.length;c>r;r++){
var n=a[r];
if(/img/i.test(n.nodeName)){
var _=n.getAttribute("_src")||n.src||"",l=n.getAttribute("data-remoteid")||"";
if($(n).hasClass("js_catchremoteimageerror"))continue;
if(!_)continue;
if(o.indexOf(","+_+",")>=0)continue;
var m=!1;
i&&l&&i.indexOf(","+l+",")>=0&&(m=!0),o+=_+",",d.push({
url:this.gif2Img(_),
uid:l,
isRemote:m
});
}else{
var u=n.getAttribute("style")||n.style.cssText||"";
if(u=u.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),u&&u[2]){
var _=u[2].replace(/^['"]|['"]$/g,""),l=n.getAttribute("data-remoteid")||"";
if($(n).hasClass("js_catchremoteimageerror"))continue;
if(!_)continue;
if(o.indexOf(","+_+",")>=0)continue;
var m=!1;
i&&l&&i.indexOf(","+l+",")>=0&&(m=!0),o+=_+",",d.push({
url:this.gif2Img(_),
uid:l,
isRemote:m
});
}
}
}
return d;
},
gif2Img:function(t){
return/\/0\?(.*&)?wx_fmt=gif/.test(t)?t.replace(/\/0\?/,"/s640?"):t;
},
validateCatchRemoteImage:function(t){
var e=$("<div>").html(t.content),i=this._o.ueditor.fireEvent("handleCatchTips",{
$dom:e,
needPost:!1
});
return i.errNum?!1:!0;
},
validateTitle:function(t){
var i=t.item,r=t.$dom,n=e.validate({
key:"title",
content:i.title,
strict:t.strict
});
return n&&n.msg&&(1===n.errType?t.strict?this.addValidateReport(127648,10,1):this.addValidateReport(127648,9,1):2===n.errType&&this.addValidateReport(127648,11,1),
this.showErrMsg(r.find(".js_title_error"),n.msg),t.viewClass=t.viewClass||".js_title_error",
t.isValid=!1,2==n.type&&((new Image).src="https://mp.weixin.qq.com/misc/jslog?id=115&content=badjs&level=error")),
t;
},
validateEditor:function(t,i){
var r=t.item,n=t.$dom,s=e.validate({
key:"content",
content:r.content,
editor:i,
strict:t.strict
});
if(s&&s.msg){
switch(s.errType){
case 1:
this.addValidateReport(127648,13,1);
break;

case 2:
this.addValidateReport(127648,14,1);
break;

case 3:
this.addValidateReport(127648,16,1);
break;

case 4:
this.addValidateReport(127648,15,1);
}
4==s.errType?t.isValid=!1:(this.showErrMsg(n.find(".js_content_error"),s.msg),t.viewClass=t.viewClass||".js_content_error",
t.isValid=!1);
}
return t;
},
validate:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.$infoContainer,i=this._o.ueditor,r={
isValid:!0,
viewClass:"",
item:t,
$dom:e,
strict:!1
};
return t.title||t.content||t.fileid||(this.showErrMsg(e.find(".js_content_error"),"请先输入一段正文（或者标题），再点击保存按钮。"),
i.getUeditor().focus(),r.viewClass=r.viewClass||".js_content_error",r.isValid=!1),
r=this.validateTitle(r),r=this.validateGuideWords(r),r=this.validateEditor(r,i),
r=this.validateCommon(r),r=this.validateReprintRecommend(r),this.handleValidateResult(r);
},
validateStrictly:function(t){
if(this.validateCatchRemoteImage(t)===!1)return null;
var e=this._o.ueditor,i={
isValid:!0,
viewClass:"",
item:t,
$dom:this._o.$infoContainer,
strict:!0
};
return i=this.validateTitle(i),i=this.validateGuideWords(i),i=this.validateEditor(i,e),
i=this.validateStrictlyCommon(i),i=this.validateReprintRecommend(i),this.handleValidateResult(i);
},
validateReprintRecommend:function(t){
return t.item.reprint_recommend_title.length>10?(this.addValidateReport(127648,27,1),
t.$dom.find(".js_reprint_recommend_title_len").parent().addClass("original_primary_tips_counter_warn"),
r.err("编者荐语不能超过10个字"),t.viewClass=t.viewClass||".js_reprint_recommend_title",t.isValid=!1):this.getReprintRecommendContentLen(t.item.reprint_recommend_content)>120&&(this.addValidateReport(127648,28,1),
t.$dom.find(".js_reprint_recommend_content_len").parent().addClass("original_primary_tips_counter_warn"),
r.err("推荐语不能超过120个字"),t.viewClass=t.viewClass||".js_reprint_recommend_content",t.isValid=!1),
t;
},
modifyCurrentEditData:function(t){
i.prototype.modifyCurrentEditData.call(this,t),"undefined"!=typeof t.content&&(this.data.set("content",t.content),
this._o.ueditor.setContent({
content:t.content,
data:this.data.getData(),
isModify:!0
}));
},
render:function(){
var t=this._o.ueditor,e=!1,r=!1,n=!1,s="该转载文章不可编辑",a="";
switch(i.prototype.render.call(this),this.setTextEditorWordlimit(300),this.renderGuidWords(),
this._o.data.source_reprint_status){
case"EN_SOURCE_REPRINT_STATUS_REJECT_REPRINT":
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY":
e=!1,r=!1,n=!1,a="当前为开放转载文章，不支持修改";
break;

case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY":
e=!1,r=!0,n=!1,a="当前为开放转载文章，不支持修改";
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE":
e=!0,r=!0,n=!1,a="当前为白名单转载文章，支持修改";
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE":
e=!0,r=!0,n=!0,a="当前为白名单转载文章，支持修改";
}
n||this.renderReprintSource(),this.renderReprintTips(a),t.fireEvent("isReadOnly")&&(r=!1),
t.fireEvent("setCurRenderType",1),t.fireEvent("setTitleStatus",{
readonly:!r,
readonlyTips:s
}),t.fireEvent("setAuthorStatus",{
status:n,
readonly:!0,
readonlyTips:e?"转载文章不能修改作者":s,
hideCounter:!0
}),t.fireEvent("switchContentType",{
type:3,
content:{
readonly:!r,
readonlyTips:s
},
guideWords:{
placeholder:"在这里写下对文章和作者的推荐语"
}
}),t.fireEvent("setToolBarStatus",{
status:r,
disabledTips:s
}),t.fireEvent("setArticleUrlStatus",!0),t.fireEvent("setAdInsertStatus",!0),t.fireEvent("setCommentStatus",!0),
t.fireEvent("setAlbumStatus",!1),t.fireEvent("setOriginalStatus",{
status:!0,
type:"reprint"
}),t.fireEvent("setCoverStatus",{
status:!0,
readonly:!r,
tips:r?"":"该转载文章不可修改封面"
}),t.fireEvent("setDescriptionStatus",{
status:!0
}),t.fireEvent("setFoldStatus",!0);
$("#js_pay_setting_area").show();
this.setEditorContent(),i.prototype.renderPayRead.call(this),this._o.$infoContainer.find(".js_reprint_recommend_content")[0].focus();
}
});
return n.showDialog=function(t){
t.onOk();
},n;
});define("media/image_article.js",["tpl/media/appmsg_edit/image_article_content_9.html.js","media/base_article.js","biz_common/jquery.validate.js","common/wx/mpEditor/common/eventbus.js","common/wx/media/img9.js"],function(i){
"use strict";
var t=i("tpl/media/appmsg_edit/image_article_content_9.html.js"),e=i("media/base_article.js"),a=(i("biz_common/jquery.validate.js"),
i("common/wx/mpEditor/common/eventbus.js")),n=i("common/wx/media/img9.js"),r=e.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var i=this,t=e.prototype.initData.call(this);
return t.set("share_page_type",8),t.get("share_imageinfo")||t.set("share_imageinfo",[]),
this.setTitle(t),this.setShareImageid(t),t.set("author",""),t.set("file_id",""),
setTimeout(function(){
i.getImageWh();
},0),t;
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").show();
},
getEditTipsContent:function(){
return"填写推荐语，上限140个字。不支持插入其他素材。";
},
setTitle:function(i){
var t=i.get("guide_words")||"";
i.set("title",t||"分享图片");
},
setShareImageid:function(i){
for(var t=i.get("share_imageinfo")||[],e=[],a=0;a<t.length;a++)e.push(t[a].file_id);
i.set("share_imageid",e.join(","));
},
getImageWh:function(){
var i=this.data.get("share_imageinfo");
if(i&&0!=i.length)for(var t=0;t<i.length;t++){
var e=i[t];
!e.cdn_url||e.height&&e.width||!function(i,t,e){
var a=new window.Image;
a.onload=function(){
var t=this.naturalWidth||this.width||0,e=this.naturalHeight||this.height||0;
i.setImageWh(this.src,t,e);
},a.src=e;
}(this,t,e.cdn_url);
}
},
setImageWh:function(i,t,e){
if(i&&t&&e){
var a=this.data.get("share_imageinfo");
if(a&&a.length>0){
for(var n=0;n<a.length;n++){
var r=a[n];
r.cdn_url===i&&(r.width=t,r.height=e);
}
this.data.set("share_imageinfo",a);
}
}
},
validate:function(i){
var t={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!1
},e=JSON.parse(i.share_imageinfo);
if(e&&e.list&&e.list.length>0)t=this.validateGuideWords(t);else{
var a=this._o.$infoContainer;
this.showErrMsg(a.find(".js_content_error"),"请先上传图片，再点击保存按钮。"),t.viewClass=".js_content_error",
t.isValid=!1,this.addValidateReport(127648,29,1);
}
return this.handleValidateResult(t);
},
validateStrictly:function(i){
var t={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!0
};
return t=this.validateGuideWords(t),this.handleValidateResult(t);
},
flush:function(){
this.data,this._o.$infoContainer;
return this.flushField(),this.flushGuidWords(),this.flushCommon(),this;
},
render:function(){
var i=this,t=this._o.ueditor;
e.prototype.render.call(this);
this._o.$infoContainer;
this.renderGuidWords(),this._o.$infoContainer.find(".js_plublish_style").hide();
var a=this.data.getData().share_imageinfo;
a=a.map(function(i){
return i.url=i.cdn_url?i.cdn_url:"/cgi-bin/getimgdata?token="+wx.data.t+"&msgid="+a.msgid+"&mode=small&source="+a.source+"&fileId="+a.file_id+"&ow="+~a.fakeid,
i;
}),a.container="#reprint_article_main",a.isappend=!1,new n(a,function(t){
t.map(function(i){
return i.cdn_url=i.url,i;
}),i.data.set("share_imageinfo",t),i.coverChange(t&&t.length>0?{
url:t[0].cdn_url,
file_id:"",
oriUrl:t[0].cdn_url,
oriFormat:"",
coverPic:0
}:{
url:"",
file_id:"",
oriUrl:"",
oriFormat:"",
coverPic:0
});
}),t.fireEvent("renderEditorByType",2),t.fireEvent("setTitleStatus",{
display:"none"
}),setTimeout(function(){
i.getImageWh();
},0);
},
replaceMedia:function(){
var i=this;
r.showDialog({
onCancel:function(){},
onOk:function(e){
var a=e.data;
i.data.set("share_imageinfo",a.share_imageinfo),i.data.set("cdn_url",a.cdn_url),
i.setTitle(i.data),i.setShareImageid(i.data),i.isCurrentArticle()&&i.renderSharePreview({
tpl:t
}),i.coverChange({
url:a.cdn_url,
file_id:"",
oriUrl:a.cdn_url,
oriFormat:"",
coverPic:0
}),i.titleChange({
title:i.data.get("title")
}),i.getImageWh();
}
});
}
});
return r.hideDialog=function(i){
a.fireEvent("hideImageDialog",i);
},r.showDialog=function(i){
a.fireEvent("showImageDialog",{
maxselect:9,
crop:!1,
desc:"大小不超过10M"
},function(t){
if(!t)return void i.onCancel();
var e=[];
if(t&&t.length>0)for(var a=0;a<t.length;a++)e.push({
file_id:t[a].fileId,
cdn_url:t[a].url,
width:"",
height:""
});
i.onOk({
data:{
cdn_url:e[0]?e[0].cdn_url:"",
share_imageinfo:e,
share_page_type:8
}
});
});
},r;
});define("media/audio_article.js",["common/wx/media/audio.js","common/wx/media/videoUtils.js","common/wx/mpEditor/common/eventbus.js","media/base_article.js","biz_common/jquery.validate.js"],function(i){
"use strict";
var e=i("common/wx/media/audio.js"),t=i("common/wx/media/videoUtils.js"),a=i("common/wx/mpEditor/common/eventbus.js"),o=i("media/base_article.js"),s=i("biz_common/jquery.validate.js"),n=(s.rules,
{}),d=7,l=function(i,e,t){
var a=arguments.length<=3||void 0===arguments[3]?"":arguments[3],o=e.find(".js_no_album").eq(t),s=e.find(".js_album_name").eq(t),n=e.find(".js_replace_album").eq(t),d=e.find(".js_add_album").eq(t);
i?(n.show(),d.hide(),o.hide(),s.html("#"+a),s.show()):(n.hide(),d.show(),s.hide(),
s.html(""),o.show());
},r=o.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var i=o.prototype.initData.call(this);
i.set("share_page_type",7);
var e=i.get("share_voiceinfo");
return e=e[0]||{},e.file_id?(e.title=i.get("title"),e.duration=t.changeTime(e.play_length),
i.set("share_voiceinfo",[e]),i.set("share_voice_id",e.file_id)):(i.set("share_voiceinfo",[]),
i.set("share_voice_id","")),i;
},
handleEditTips:function(){
this._o.$infoContainer.find(".js_edit_tips").show();
},
getEditTipsContent:function(){
return"音频消息标题与音频素材一致，不支持当前修改。填写推荐语，上限140个字。不支持插入其他素材。";
},
validate:function(i){
var e={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!1
};
return e=this.validateGuideWords(e),this.handleValidateResult(e);
},
validateStrictly:function(i){
var e={
isValid:!0,
viewClass:"",
item:i,
$dom:this._o.$infoContainer,
strict:!0
};
return e=this.validateGuideWords(e),this.handleValidateResult(e);
},
flush:function(){
this.data,this._o.$infoContainer;
return this.flushField(),this.flushGuidWords(),this.flushAudio(7),this.flushCommon(),
this;
},
render:function(){
var i=this._o.ueditor;
o.prototype.render.call(this);
this._o.$infoContainer;
this.renderGuidWords(),this._o.$infoContainer.find(".js_plublish_style").hide(),
this.renderVoiceCard(),i.fireEvent("renderEditorByType",2);
},
renderVoiceCard:function(){
var i=$("#reprint_article_main").html("").show(),t=this._o.$infoContainer,a=this.data.get("share_voiceinfo")[0],o=this.data.get("audio_info"),s=!1,n="",d="",l=void 0;
"string"==typeof o&&(o=JSON.parse(o));
var r=o.audio_infos[0].appmsg_album_info;
r&&r.id&&(s=!0),s&&(n=r.id,d=r.title),l=o.audio_infos[0].audio_id?o.audio_infos[0].audio_id:a.audio_id,
this._g.player=new e({
selector:i,
shareTpl:!0,
file_id:a.file_id,
title:a.title,
duration:a.duration,
play_length:1e3*a.play_length,
qqmusicurl:a.play_url,
audioId:l,
hasTopic:s,
topicId:n,
topicName:d
}),this.clickAudioCard(t);
},
replaceMedia:function(){
var i=this,e=n[i.data.get("share_voice_id")];
r.showDialog({
selectedAudioItems:e?[e]:[],
onCancel:function(){},
onOk:function(e){
delete n[i.data.get("share_voice_id")];
var t=e.data;
i.data.set("share_voice_id",t.share_voice_id),i.data.set("share_voiceinfo",t.share_voiceinfo),
i.data.set("title",t.title),i.isCurrentArticle()&&(i.stopPlay(),i.renderVoiceCard()),
i.titleChange({
title:t.title
});
}
});
},
clickAudioCard:function(i){
var e=this,t=i.find(".js_audio_card"),o=t.find(".js_audio_action");
$(document.body).click(function(i){
var e=$(i.target);
return t[0].contains(e[0])&&!e.hasClass("js_toggle_playing")?void o.toggle():void(o.is(":hidden")||o.hide());
}),t.unbind("click").click(function(i){
var o=$(i.target),s=o.hasClass("js_add_album")||o.parent().hasClass("js_add_album"),n=o.hasClass("js_replace_album")||o.parent().hasClass("js_replace_album");
if(t.find(".js_replace_media").click(function(){
e.replaceMedia();
}),!o.hasClass("js_toggle_playing")){
var r=t.attr("data-topic_id"),c=t.attr("data-topic_name"),_={
id:r,
title:c
};
(s||n)&&a.fireEvent("showArticleTagsDialog",{
tagType:d,
tags:r.length?[_]:[],
allowDeleteAll:!0
},function(i){
if(!i.cancel){
var e={
id:"",
title:""
};
i.tags.length?(e.id=i.tags[0].id,e.title=i.tags[0].title,l(!0,t,0,e.title)):l(!1,t,0),
t[0].dataset.topic_id=e.id,t[0].dataset.topic_name=e.title;
}
});
}
});
},
stopPlay:function(){
this._g.player&&"function"==typeof this._g.player.stop&&this._g.player.stop();
},
destroy:function(){
this.stopPlay();
}
});
return r.hideDialog=function(i){
a.fireEvent("hideAudioMusicDialog",i);
},r.showDialog=function(i){
a.fireEvent("showAudioMusicDialog",{
allowAudio:!0,
allowMusic:!1,
audioDisabled:!1,
allowAudioNumber:1,
selectedAudioItems:i.selectedAudioItems
},function(e){
return e?(e=e[0],n[e.file_id+""]=e,void i.onOk({
data:{
share_voice_id:e.file_id+"",
share_voiceinfo:[{
file_id:e.file_id+"",
duration:e.duration,
title:e.title,
play_length:parseInt(e.play_length/1e3),
play_url:"https://res.wx.qq.com/voice/getvoice?mediaid="+e.voice_encode_fileid,
audio_id:e.voice_encode_fileid
}],
title:e.title,
share_page_type:7
}
})):void i.onCancel();
});
},r;
});define("media/txt_article.js",["media/base_article.js","biz_common/jquery.validate.js","common/wx/const.js","media/common.js"],function(t){
"use strict";
var i=t("media/base_article.js"),e=t("biz_common/jquery.validate.js"),s=(t("common/wx/const.js"),
t("media/common.js"),e.rules),o=i.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var t=i.prototype.initData.call(this);
return t.set("share_page_type",10),t.get("content")&&t.set("guide_words",t.get("content")),
this._o.defaultGuideWordlimit=300,t;
},
flush:function(){
this.data,this._o.$infoContainer;
return this.flushField(),this.flushGuidWords(),this.flushRelatedVideo(),this.flushCommon(),
this;
},
validate:function(t){
var i={
isValid:!0,
viewClass:"",
item:t,
$dom:this._o.$infoContainer,
strict:!1
};
return s.rangelength(i.item.content.replace(/<.*?>/g,""),[0,300])||(this.addValidateReport(127648,30,1),
this.showErrMsg(i.$dom.find(".js_content_error"),"文本长度不能超过%s字".replace("%s",300)),
i.viewClass=i.viewClass||".js_content_error",i.isValid=!1),this.handleValidateResult(i);
},
validateStrictly:function(t){
return this.validate(t);
},
renderGuidWordsExtra:function(){
this._o.ueditor.fireEvent("switchContentType",{
placeholder:"从这里开始输入文字",
type:2
});
},
handleTitleAndGuideWords:function(t){
var i=this,e=this.data.get("isMyMpVideo")||this.data.get("is_my_mp_video"),s=t||this._o.data;
this._o.ueditor.fireEvent("renderEditorByType",{
type:4,
isMyMpVideo:e
},function(){
i.renderGuidWordsExtra(s);
});
},
render:function(){
var t=this._o.ueditor;
i.prototype.render.call(this),this.setShowEmotionNLinkNWeapp(!0);
this._o.$infoContainer;
this.renderGuidWords(),this._o.$infoContainer.find(".js_plublish_style").hide(),
this.handleTitleAndGuideWords();
var e=t.fireEvent("isReadOnly");
e||(this.showToolbar(),this.enableToolbar()),this._hasRendered=!0;
},
destroy:function(){
i.prototype.destroy.call(this),this._hasRendered&&(this.setShowEmotionNLinkNWeapp(!1),
this.hideToolbar(),this.disableToolbar()),this._hasRendered=!1;
}
});
return o;
});define("media/video_article.js",["common/wx/media/videoUtils.js","common/wx/mpEditor/common/eventbus.js","tpl/media/appmsg_edit/video_article_content.html.js","media/base_article.js","biz_common/jquery.validate.js","biz_web/lib/store.js","common/wx/const.js","media/common.js","pages/media/modules/video_status/video_status.js"],function(e){
"use strict";
function i(e,i){
switch(e){
case 0:
$("#vTxt").text("视频审核中，可继续编辑其他信息");
break;

case 3:
$("#vTxt").text("视频已审核通过"),setTimeout(function(){
$("#vTxt").hide();
},5e3);
break;

case 4:
$("#vTxt").text("视频转码中，转码完成后将进入审核");
break;

case 5:
$("#vTxt").html("视频转码失败，请更换素材或前往<a href='/cgi-bin/appmsg?begin=0&count=10&action=list_video&type=15' target='_blank'>素材库</a>查看详情");
break;

case 6:
case 7:
$("#vTxt").html(2==i.video_ori_status&&3==i.status?"该视频已被他人先声明原创，将按照转载样式群发，可前往<a href='/cgi-bin/appmsg?begin=0&count=10&action=list_video&type=15' target='_blank'>素材库</a>查看详情":"该视频声明原创失败，群发将不带原创标识，可前往<a href='/cgi-bin/appmsg?begin=0&count=10&action=list_video&type=15' target='_blank'>素材库</a>查看详情");
break;

case 11:
$("#vTxt").text("因源视频被删除，导致转载视频无法播放，请更换视频素材。");
break;

case 12:
$("#vTxt").text("因源视频被取消原创，导致转载视频无法播放，请更换视频素材。 ");
break;

default:
$("#vTxt").text("未知状态： "+e);
}
}
var t=e("common/wx/media/videoUtils.js"),o=e("common/wx/mpEditor/common/eventbus.js"),a=e("tpl/media/appmsg_edit/video_article_content.html.js"),d=e("media/base_article.js"),s=e("biz_common/jquery.validate.js"),r=e("biz_web/lib/store.js"),n=e("common/wx/const.js"),_=e("media/common.js"),l=(s.rules,
e("pages/media/modules/video_status/video_status.js")),u={
timer:null
},h=300,c=d.inherit({
init:function(){
this.initTextEditorEnv();
},
initData:function(){
var e=d.prototype.initData.call(this);
e.set("share_page_type",5),this._o.data.videoDescForGuideWords&&e.set("guide_words",this._o.data.videoDescForGuideWords),
"isMyMpVideo"in this._o.data&&e.set("isMyMpVideo",this._o.data.isMyMpVideo);
var i=e.get("share_videoinfo");
return i=i[0]||{},i.video_id?(i.is_mp_video=1*i.is_mp_video,i.title=e.get("title"),
i.cover=e.get("cover"),i.duration=t.changeTime(i.play_length),e.set("share_videoinfo",[i]),
e.set("share_video_id",i.video_id),e.set("video_id",i.video_id),e.set("status",l.getVideoStatus(e.getData()))):(e.set("share_videoinfo",[]),
e.set("share_video_id",""),e.set("video_id","")),e;
},
validateTitle:function(e){
var i=_.validate({
key:"title",
content:e.item.title,
strict:e.strict,
maxlen:n.videoTitleMaxLen
});
return i&&i.msg&&(1===i.errType?e.strict?this.addValidateReport(127648,10,1):this.addValidateReport(127648,9,1):2===i.errType&&this.addValidateReport(127648,11,1),
this.showErrMsg(e.$dom.find(".js_title_error"),i.msg),e.isValid=!1),e.viewClass=e.viewClass||".js_content_error",
e;
},
validate:function(e){
var i=e.guide_words;
e.guide_words=e.guide_words.replace(/<.*?>/g,"");
var t={
isValid:!0,
viewClass:"",
item:e,
$dom:this._o.$infoContainer,
strict:!1
};
return t=this.validateGuideWords(t),t=this.validateTitle(t),t=this.validateReward(t),
e.guide_words=i,this.handleValidateResult(t);
},
validateStrictly:function(e){
var i=e.guide_words;
e.guide_words=e.guide_words.replace(/<.*?>/g,"");
var t={
isValid:!0,
viewClass:"",
item:e,
$dom:this._o.$infoContainer,
strict:!0
};
return t=this.validateGuideWords(t),t=this.validateTitle(t),e.guide_words=i,this.handleValidateResult(t);
},
flush:function(){
this.data,this._o.$infoContainer;
return this.flushField(),this.flushGuidWords(),this.flushRelatedVideo(),this.flushCommon(),
this;
},
renderOriInfo:function(e){
var i=this._o.$infoContainer;
1===parseInt(e.video_ori_status,10)?(i.find("#js_video_ori_info").text("原创"),i.find("#js_video_ori_username").text(""),
i.find("#js_video_ori_display").show()):2===parseInt(e.video_ori_status,10)?(i.find("#js_video_ori_username").text(e.hit_nickname),
i.find("#js_video_ori_info").text("视频来源："),i.find("#js_video_ori_display").show()):i.find("#js_video_ori_display").hide();
},
renderGuidWordsExtra:function(e){
console.log("renderGuidWordsExtra",e);
var i=e.isMyMpVideo||e.is_my_mp_video?n.videoDigestPlaceholder:"从这里开始输入推荐语，可以不填";
this._o.ueditor.fireEvent("switchContentType",{
placeholder:i,
type:2
});
},
renderRewardArea:function(e){
1===parseInt(e.video_ori_status,10)&&1*wx.cgiData.can_use_reward===1?$("#reward_setting_area").show():(this.setAuthorInfo({
copyright_type:0,
writerid:"",
author_username:"",
author:"",
author_status:"",
can_open_reward:0,
can_reward:0,
reward_reply_id:""
}),$("#reward_setting_area").hide()),0===parseInt(e.video_ori_status,10)&&1===e.applyori&&$("#reward_setting_area").show();
},
showVideoModifyDialog:function(){
var e=n.hasShowVideoModifyDialogKey+location.pathname;
r.get(e)||!this.data.get("isMyMpVideo")&&!this.data.get("is_my_mp_video")||(this._o.ueditor.fireEvent("showVideoModifyDialog"),
r.set(e,1));
},
handleTitleAndGuideWords:function(e){
var i=this,t=this.data.get("isMyMpVideo")||this.data.get("is_my_mp_video"),o=e||this._o.data;
this._o.ueditor.fireEvent("renderEditorByType",{
type:2,
isMyMpVideo:t
},function(){
i.renderGuidWordsExtra(o),i.renderOriInfo(o);
});
},
hideOriInfo:function(){
var e=this._o.$infoContainer;
e.find("#js_video_ori_display").hide();
},
render:function(){
var e=this._o.ueditor;
d.prototype.render.call(this),this.setShowEmotionNLinkNWeapp(!0);
this._o.$infoContainer;
this.renderGuidWords(),this.renderRelatedVideo(),this._o.$infoContainer.find(".js_plublish_style").hide(),
this.renderSharePreview({
tpl:a
}),this.showVideoModifyDialog(),this.handleTitleAndGuideWords();
var t=e.fireEvent("isReadOnly");
t||(this.showToolbar(),this.enableToolbar()),this.setTextEditorWordlimit(h),d.prototype.renderArticleTags.call(this,{
useData:!0
}),this._hasRendered=!0;
var o=this.data.getData(),s=l.getVideoStatus(o);
(0===s||4==s||-1==s)&&l.rollStatus(o.video_id,i,u);
},
destroy:function(){
d.prototype.destroy.call(this),this._hasRendered&&(this.setShowEmotionNLinkNWeapp(!1),
this.hideToolbar(),this.disableToolbar(),this.hideOriInfo()),u.timer&&(clearTimeout(u.timer),
u.timer=null),this._hasRendered=!1;
},
previewVideoPlay:function(){
var e=this.data.get("share_video_id"),i=this.data.get("share_videoinfo");
e&&t.showVideoPreviewDialog({
vid:e,
is_mp_video:i[0].is_mp_video,
onClose:function(){}
});
},
replaceMedia:function(){
var e=this;
c.showDialog({
can_use_txvideo:this._o.cgiData.can_use_txvideo,
onCancel:function(){},
onOk:function(i){
var t=i.data;
e.data.set("share_video_id",t.share_video_id),e.data.set("share_videoinfo",t.share_videoinfo),
e.data.set("cdn_url",t.cdn_url),e.data.set("title",t.title),e.data.set("status",t.status),
e.data.set("video_ori_status",t.video_ori_status),e.isCurrentArticle()&&e.renderSharePreview({
tpl:a
}),e.coverChange({
url:t.cdn_url,
file_id:"",
oriUrl:t.cdn_url,
oriFormat:"",
coverPic:0
}),e.titleChange({
title:t.title
}),e.videoLengthChange({
duration:t.share_videoinfo[0].duration
}),e.data.set("guide_words",t.videoDescForGuideWords),e.data.set("isMyMpVideo",t.isMyMpVideo),
e.data.set("is_my_mp_video",!1),e.renderGuidWords(),e.handleTitleAndGuideWords(t),
e.renderGuidWordsExtra(t),e.renderVideoDotArea(t),e.renderRewardArea(t),e.data.set("dot",{});
}
});
},
updateTitleInputCounter:function(){
d.prototype.updateTitleInputCounter.call(this,n.videoTitleMaxLen);
}
});
return c.hideDialog=function(e){
o.fireEvent("hideVideoDialog",e);
},c.showDialog=function(e){
o.fireEvent("showVideoDialog",{
scene:"ueditor",
msgtype:5,
canusetxvideo:!!e.can_use_txvideo
},function(t){
if(!t)return e.onCancel(),!0;
console.log("VideoArticle.showDialog",t),u.timer&&(console.log("timer clear:"+u.timer),
clearTimeout(u.timer),u.timer=null);
var o=l.getVideoStatus(t);
(0===o||4==o)&&l.rollStatus(t.video_id,i,u),console.log(t);
var a=0;
return t.multi_item&&t.multi_item.length>0&&(a=t.multi_item[0].applyori),e.onOk({
data:{
status:o,
share_video_id:t.vid,
share_videoinfo:[{
is_mp_video:1*t.is_mp_video,
title:t.title.html(!1),
cover:t.cover,
video_id:t.vid,
video_ori_status:t.video_ori_status,
status:t.status,
duration:t.duration,
play_length:t.play_length
}],
applyori:a,
cdn_url:t.cover,
title:t.title.html(!1),
isMyMpVideo:t.isMyMpVideo,
share_page_type:5,
videoDescForGuideWords:t.digest||t.video_desc,
video_ori_status:t.video_ori_status,
hit_nickname:t.hit_nickname,
author_status:t.author_status,
authority:t.authority,
author_username:t.author_username,
can_reward:t.can_reward,
can_open_reward:t.can_open_reward,
author:t.author,
reward_reply_id:t.reward_reply_id&&t.reward_reply_id.toString(),
writerid:t.writerid,
danmu_pub_type:t.danmu_pub_type,
dot:t.dot,
advert_info:t.advert_info||{},
need_open_comment:t.need_open_comment,
only_fans_can_comment:Number(t.only_fans_can_comment),
only_fans_days_can_comment:Number(t.only_fans_days_can_comment),
appmsg_album_info:t.appmsg_album_info||{}
}
}),!0;
});
},c;
});