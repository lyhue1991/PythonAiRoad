define("tpl/mpEditor/plugin/link_popup.html.js",[],function(){
return'{if needBreak}\n<div style="height:5px;display:none"></div>\n{/if}\n<div class="js_link_popup edui_mask_edit_bar_link edui_mask_edit_group with_line">\n    {if txt || url || isWeapp}\n    <a class="edui_mask_edit_meta" {if !isWeapp}target="_blank"{/if} href="{url}" onclick="$$._fireEventAndHide(\'link_click_popupurl\');" {if !isWeapp}title="{url}"{/if}>{txt}</a>\n    {if hasNextCheckText}\n    <div class="primary edui_mask_edit_meta no_extra edui-clickable" onclick="$$._fireEventAndHide(\'next_check_text\');">\n      <div class="edui_mask_edit_meta_inner">\n        下一个错别字      </div>\n    </div>\n    {/if}\n    <div class="primary edui_mask_edit_meta edui-clickable" \n        {if !isWeapp}onclick="$$._execCommandAndHide(\'link\', \'popup\');"{else}onclick="$$._execCommandAndHide(\'insertweapp\', 4);"{/if}>\n        <div class="edui_mask_edit_meta_inner">\n        修改        </div>\n    </div>\n	<div class="primary edui_mask_edit_meta edui-clickable" onclick="$$._execCommandAndHide(\'unlink\', \'popup\');">\n        <div class="edui_mask_edit_meta_inner">\n        清除        </div>\n    </div>\n    {/if}\n</div>\n';
});define("tpl/mpEditor/plugin/link_acc_item.html.js",[],function(){
return'{each list as item}\n<div data-fakeid="{item.fakeid}" data-nickname="{item.nickname||item.alias}" class="js_acc_item search_biz_item">\n    <div class="search_biz_type">\n        <p>{service_type[item.service_type]||service_type[\'-1\']}</p>\n    </div>\n    <div class="search_biz_avatar">\n        <img src="{item.round_head_img}" alt="{item.nickname}">\n    </div>\n    <div class="search_biz_info">\n        <p class="search_biz_nickname">{item.nickname||item.alias}</p>\n        <p class="search_biz_id">微信号：{item.alias}</p>\n    </div>\n</div>\n{/each}';
});define("tpl/mpEditor/plugin/link_appmsg.html.js",[],function(){
return'{if !!msg}\n<div class="media_list_tips_wrp tips_global">\n	<span class="tips">{msg}</span>\n	<span class="vm_box"></span>\n</div>\n{else}\n<ul class=" my_link_list">\n	{each list as item index}\n	<li data-index="{index}" class="my_link_item">\n		<label class="frm_radio_label js_article_label" for="">\n			<span class="date">{item.update_time_str}</span>\n	        <i data-index="{index}" class="icon_radio js_article_i"></i>\n	        <input type="radio" data-index="{index}" name="article_item" class="frm_radio">\n	        <span class="lbl_content">\n	        	<a target="_blank" href="{item.link}">{=item.title}</a>\n	        </span>\n	    </label>\n	</li>\n	{/each}\n</ul>\n{/if}';
});define("tpl/mpEditor/plugin/link_dialog.html.js",[],function(){
return'<form id="myform" class="link_dialog">\n    <div class="title_tab">\n        <ul class="js_tab_main tab_navs title_tab">\n            <li data-tab="inner" class="js_tab_item tab_nav first selected">\n                <a href="javascript:;">公众号文章链接</a>\n            </li>\n            {if !!flag}\n            <li data-tab="outer" class="js_tab_item tab_nav">\n                <a href="javascript:;" >外部链接</a>\n            </li>\n            {/if}\n        </ul>\n    </div>\n    <div class="js_warn_tips page_msg mini" style="display:none;">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg_mini warn"></i>\n            </span>\n            <div class="msg_content">\n                <p class="js_tips"></p>\n            </div>\n        </div>\n    </div>\n    <!--BEGIN 公众号消息链接-->\n    <div class="js_inner_main biz_link_form" style="display: block;">\n        <div class="frm_control_group">\n            <label for="" class="frm_label">链接输入方式</label>\n            <div class="frm_controls frm_vertical_lh">\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">输入地址</span>\n                    <input type="radio" name="link_type" value="1" class="frm_radio" checked="true">\n                </label>\n                <label class="frm_radio_label selected">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">查找文章</span>\n                    <input type="radio" name="link_type" value="2" class="frm_radio">\n                </label>\n            </div>\n        </div>\n        <!--BEGIN 输入文章链接-->\n        <div class="js_link_type js_link_type_1 input_address_tab">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">链接标题</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box link_address_input">\n                        <input type="text" name="innerTitle" class="js_inner_title frm_input">\n                    </span>\n                </div>\n            </div>\n            <div class="frm_control_group">\n                <label for="" class="frm_label">链接地址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box link_address_input">\n                        <input type="text" name="innerLink" class="js_inner_link_input frm_input" placeholder="https://">\n                    </span>\n                </div>\n            </div>\n        </div>\n        <!--END 输入文章链接-->\n        <!--BEGIN 搜索文章-->\n        <div style="display:none;" class="js_link_type js_link_type_2 search_article_tab">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">公众号</label>\n                <div class="frm_controls">\n                    <span class="js_acc_search_main frm_input_box search_input_box search with_del append">\n                        <a style="display:none;" class="js_acc_search_del del_btn" href="javascript:">\n                            <i class="icon_search_del"></i>&nbsp;\n                        </a>\n                        <a href="javascript:void(0);" class="js_acc_search_btn frm_input_append">\n                            <i class="icon16_common search_gray">\n                                搜索                            </i>\n                            &nbsp;\n                        </a>\n                        <input type="text" placeholder="输入文章来源的公众号名称或微信号，回车进行搜索" value="" class="frm_input js_acc_search_input">\n                    </span>\n                    <!--选择了公众号之后，隐藏以上节点，show出以下节点，并给上面的 .frm_control_group 加上 show_value 类-->\n                    <span class="js_acc_desc frm_input_box" style="display: none;">\n                        <span class="js_acc_Text"></span>\n                        <a class="js_reset_acc" href="javascript:;">重新搜索</a>\n                    </span>\n                    <p class="frm_tips">\n                        <a class="js_self_acc" href="javascript:;">从本公众号已群发的消息中进行选择</a>\n                    </p>\n                    <p class="js_acc_search_tips frm_msg fail">\n                        <span class="frm_msg_content"></span>\n                    </p>\n                </div>\n            </div>\n            <div class="js_acc_content frm_control_group" style="display: none;">\n                <label for="" class="frm_label"></label>\n                <div class="frm_controls">\n                    <div class="search_biz_result_wrap">\n                        <!--loading-->\n                        <i style="display:none;" class="js_acc_loading icon_loading_small white"></i>\n                        <div class="search_biz_result js_acc_list"></div>\n                    </div>\n                    <div class="js_acc_pagebar pagination_wrp"></div>\n                </div>\n            </div>\n\n            <div class="js_article_content frm_control_group" style="display: none;">\n                <label for="" class="frm_label">公众号文章</label>\n                <div class="frm_controls">\n                    <div class="search_article_result">\n                        <div class="info_box">\n                            <div class="inner">\n                                <div class="info_hd">\n                                    <div class="ext_info"></div>\n                                    <h4>\n                                        <span class="frm_input_box search with_del append ">\n                                            <a style="display:none;" class="js_article_search_del del_btn" href="javascript:">\n                                                <i class="icon_search_del"></i>&nbsp;\n                                            </a>\n                                            <a href="javascript:" class="js_article_search_btn frm_input_append">\n                                                <i class="icon16_common search_gray">搜索</i>&nbsp;\n                                            </a>\n                                            <input type="text" value="" class="js_article_search_input frm_input" placeholder="输入文章名查找公众号群发过的文章">\n                                        </span>\n                                    </h4>\n                                </div>\n                                <div class="info_bd tc">\n                                    <i style="display:none;" class="js_article_loading icon_loading_small white"></i>\n                                    <div class="js_article_list">\n                                    </div>\n                                </div>\n                            </div>\n                            <!--BEGIN 分页-->\n                            <div class="js_article_pagebar pagination_wrp"></div>\n                            <!--END 分页-->\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!--END 搜索文章-->\n    </div>\n    <!--END 公众号消息链接-->\n    <!--BEGIN 外链-->\n    {if !!flag}\n    <div class="js_outer_main biz_link_form" style="display: none;">\n        <div class="frm_control_group">\n            <label for="" class="frm_label">链接标题</label>\n            <div class="frm_controls">\n                <span class="frm_input_box link_address_input">\n                    <input name="outerTitle" type="text" class="js_outer_title frm_input" placeholder="">\n                </span>\n            </div>\n        </div>\n        <div class="frm_control_group">\n                <label for="" class="frm_label">链接地址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box link_address_input">\n                        <input name="outerLink" type="text" class="js_outer_link_input frm_input" placeholder="https://">\n                    </span>\n                </div>\n            </div>\n    </div>\n    {/if}\n    <!--END 外链-->\n</form>';
});define("biz_web/ui/checkbox.js",["tpl/biz_web/ui/checkbox.html.js"],function(t){
"use strict";
function e(t){
var e=$(t);
e.each(function(){
var t=$(this),e=t.prop("checked"),n=t.parent();
e?n.addClass("selected"):n.removeClass("selected");
});
}
function n(t){
var e=$(t);
e.each(function(){
var t=$(this).prop("disabled"),e=$(this).parent();
t?e.addClass("disabled"):e.removeClass("disabled");
});
}
function i(){
return"checkbox"+s++;
}
var a={
container:null,
label:"",
name:"",
type:"checkbox"
},c=t("tpl/biz_web/ui/checkbox.html.js"),r=wx.T,s=1,o=1,p=function(t){
this.options=$.extend(!0,{},a,t),this.options.index=o++,this.$container=$(this.options.container),
this.$dom=$(r(c,this.options)).appendTo(this.$container),this.$input=this.$dom.find("input"),
this.$input.checkbox();
};
return p.prototype={
checked:function(t){
return"undefined"!=typeof t&&(this.$input.prop("checked",t),e(this.$input)),this.$input.prop("checked");
},
disabled:function(t){
return"undefined"!=typeof t&&(this.$input.prop("disabled",t),n(this.$input)),this.$input.prop("disabled");
}
},$.fn.checkbox=function(t){
var a,c,r,s,o,p,d=!1;
"boolean"==typeof t?a=t:$.isPlainObject(t)?(a=t.multi,o=t.form,p=t.name,c=t.onChanged):"string"==typeof t?(d=!0,
r=t,s=[].slice.call(arguments,1)):"undefined"==typeof t&&(t={}),"undefined"==typeof a&&(a=this.is("input[type=checkbox]"));
var h=this,l=a?"checkbox":"radio",u={
checked:function(t){
return h.attr("checked",t),h.prop("checked",t),e(h),h;
},
disabled:function(t){
return h.attr("disabled",t),h.prop("disabled",t),n(h),h;
},
value:function(){
var t=h.eq(0);
return t.prop("checked")?t.val():"";
},
values:function(){
var t=[];
return h.each(function(){
$(this).prop("checked")&&t.push($(this).val());
}),t;
},
adjust:function(t){
var n;
return n="string"==typeof t?t.split(","):t,n&&n.length>0&&h.each(function(){
var t=$(this);
n.indexOf(t.val())>=0&&(t.attr("checked",!0),e(t));
}),this;
},
disable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&h.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!0),n(t));
}),this;
},
setall:function(t){
h.each(function(){
var e=$(this);
e.attr("disabled",t?!1:!0),n(e);
});
},
enable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&h.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!1),n(t));
}),this;
},
label:function(t){
return t&&(h.parent().find(".lbl_content").html(t),h.attr("data-label",t)),h;
}
};
return d&&"function"==typeof u[r]?u[r].apply(u,s):(this.addClass("frm_"+l).each(function(){
var t=$(this),e=t.parent();
if(!e.is("label")){
var n=t.attr("data-label")||"";
e=$('<label class="frm_{type}_label"><i class="icon_{type}"></i></label>'.format({
type:l
})).append('<span class="lbl_content">'+n+"</span>"),e.insertBefore(t).prepend(t);
}
if(!this.id){
var a=i();
this.id=a;
}
e.attr("for",this.id);
}),e(this),n(this),t&&t.initOnChanged&&"function"==typeof c&&h.parent().find("input[type=checkbox],input[type=radio]").each(function(){
c.call(u,$(this));
}),this.parent().delegate("input[type=checkbox],input[type=radio]","click",function(){
var t=$(this),n=t.prop("checked");
a?(t.attr("checked",n),e(t)):(h.attr("checked",!1),t.attr("checked",!0).prop("checked",!0),
e(o&&p?o.find("[name="+p+"]"):h)),"function"==typeof c&&c.call(u,t);
}).addClass("frm_"+l+"_label"),u);
},p;
});define("common/wx/mpEditor/plugin/emotionButton.js",["widget/emotion_editor.css","widget/emotion_panel.css","common/wx/richEditor/emotion.js","tpl/mpEditor/plugin/emotion.html.js"],function(t){
"use strict";
function i(){
var t=window.baidu.editor,i=t.ui;
if(!i.EmotionButton){
var e=t.utils,s=i.UIBase,r=i.Popup,m=i.EmotionPicker=function(t){
this.initOptions(t),this.init();
};
m.prototype={
getHtmlTpl:function(){
return window.wx.T(n,{
edata:o.getEdata()
});
},
init:function(){
this.initUIBase();
},
_onEmotionClick:function(){
this.fireEvent("emotionclick");
}
},e.inherits(m,s);
var p=i.SplitButton,c=i.EmotionButton=function(t){
this.initOptions(t),this.init();
};
c.prototype={
init:function(){
var t=this;
this.popup=new r({
content:new m({
editor:t.editor,
_onEmotionClick:function(i){
var o=i.target||i.srcElement;
o=/^li/i.test(o.nodeName)?$(o):$(o).parents("li.js_emotion_li");
var n=o.data("title"),e=o.data("name");
t._onEmotionSelect({
title:n,
name:e
});
}
}),
contentClass:"emotion_wrp",
editor:t.editor
}),this.initSplitButton();
},
className:"edui-for-mpemotion",
_SplitButton_postRender:p.prototype.postRender,
postRender:function(){
this._SplitButton_postRender();
},
_onButtonClick:function(){
this.showPopup(),this.editor.fireEvent("reportToolbarClick","122325","43",1);
},
_onEmotionSelect:function(t){
this.fireEvent("emotionselect",t);
}
},e.inherits(c,p);
}
}
t("widget/emotion_editor.css"),t("widget/emotion_panel.css");
var o=t("common/wx/richEditor/emotion.js"),n=t("tpl/mpEditor/plugin/emotion.html.js");
return{
defineButton:i
};
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("cardticket/parse_data.js",["cardticket/add/member_info_flag.js"],function(e){
"use strict";
function _(e){
var _=u[e.card_type]||e.card_type;
switch(_+=""){
case"2":
e=e.discount;
break;

case"1":
e=e.groupon;
break;

case"3":
e=e.gift;
break;

case"4":
e=e.cash;
break;

case"0":
e=e.general_coupon;
break;

case"10":
e=e.member_card;
break;

case"21":
e=e.scenic_ticket;
break;

case"22":
e=e.movie_ticket;
break;

default:
e=e.general_coupon||e.coupon;
}
return e?(e.type=_,e):null;
}
function t(e,_){
return"number"!=typeof e&&(e=praseFloat(e),isNaN(e))?0:(_||(_=2),parseFloat(e.toFixed(_)));
}
function i(e){
var _=/^https?:\/\/mp.weixin.qq.com\/s/,t=/^http:\/\/mp.weixin.qq.com\/bizmall\/cardshelf/,i=/^http:\/\/mp.weixin.qq.com\/bizmall\/mallshelf/;
return _.test(e)?1:t.test(e)?2:i.test(e)?3:4;
}
function s(e){
return e?(e+"").html(!1):"";
}
function o(e){
var _=e.url||"",t=e.url_type;
return 4==t?_.replace("http://",""):s(_);
}
function n(e){
var n={},e=_(e);
if(!e)return null;
a(n,e),a(n,e.base_info),n.background_pic_url=e.background_pic_url;
var r=e.base_info.date_info||{};
n.time_type=f[r.type]||r.type,1==n.time_type&&(n.begin_time=r.begin_timestamp,n.end_time=r.end_timestamp),
n.from_day=r.fixed_begin_term||0,n.fixed_term=r.fixed_term||30,n.quantity=e.base_info.sku.quantity,
n.shop_id_list=e.base_info.shop_id_list,n.location_id_list=e.base_info.location_id_list;
var u=l[n.code_type];
if(n.code_type="undefined"!=typeof u?u:n.code_type,"undefined"==typeof n.code_type&&(n.code_type=1),
n.least_cost=e.least_cost&&e.least_cost/100,n.reduce_cost=e.reduce_cost&&e.reduce_cost/100,
"0"==n.least_cost&&(n.least_cost=""),n.discount=n.discount&&(100-n.discount)/10,
n.detail=1==n.type?n.deal_detail:n.default_detail,/^http/.test(n.logo_url)||(n.logo_url=""),
n.shop_type||(n.shop_type=n.location_id_list&&n.location_id_list.length?2:3),n.auto_update_new_location&&(n.shop_type=1),
n.isnew=n.func_flag?!!(16&n.func_flag):!1,n.ispay=n.func_flag?64&n.func_flag:!1,
n.func_flag&&(n.show_in_nearby=!1),n.ispay&&(n.can_share=!0),n.ispay&&(n.detail=n.detail?n.detail.replace(/\n微信价：.*?元$/gm,""):""),
n.price=t(e.base_info.sku.price/100),n.original_price=t(e.base_info.sku.original_price/100),
1==n.create_source&&(n.isnew=!0),1==n.time_type&&n.end_time<new Date/1e3&&(n.is_expire=!0),
n.is_intercomm=16384&n.func_flag,"undefined"!=typeof e.base_info.task_info&&(n.is_from_intercomm=!0,
n.task_info=e.base_info.task_info),n.is_from_intercomm&&(n.isnew=!0),n.status=m[n.status]||n.status,
n.discount&&(n.supply_discount=!0),10==n.type){
var d=[];
if(n.promotion_url_name){
var p={
name:n.promotion_url_name,
tips:n.promotion_url_sub_title,
url:n.promotion_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
e.custom_cell1&&(e.custom_cell1.url_type=i(e.custom_cell1.url),e.custom_cell1.url=o(e.custom_cell1),
d.push(e.custom_cell1)),e.custom_cell2&&(e.custom_cell2.url_type=i(e.custom_cell2.url),
e.custom_cell2.url=o(e.custom_cell2),d.push(e.custom_cell2)),n.config_url=d;
var y=e.required_info||{
info_flag:0
},g=e.optional_info||{
info_flag:0
};
n.require_keywords=c.flag2info(y.info_flag),n.option_keywords=c.flag2info(g.info_flag),
n.require_self_keywords=y.field_list,n.option_self_keywords=g.field_list,n.must_activate=!n.auto_activate,
n.supply_discount&&(n.prerogative=n.prerogative.replace(/^用卡可享受.*?折优惠\n/,"")),n.quantity="--",
n.can_modify=(e.required_info?e.required_info.can_modify:!1)||(e.optional_info?e.optional_info.can_modify:!1),
n.supply_balance=e.supply_balance;
}else{
var d=[];
if(n.custom_url_name){
var p={
name:n.custom_url_name,
tips:n.custom_url_sub_title,
url:n.custom_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
n.config_url=d;
}
var b=e.base_info;
if(10==n.type)var h=e.modify_msg_operation||{
_notexist:!0
};else var h=b.consume_msg_operation||{
_notexist:!0
};
n.msg_operation=h.url_cell||h.card_cell||{
_notexist:!0
},n.msg_operation._notexist||(n.msg_operation._type=n.msg_operation.card_id?5:i(n.msg_operation.url),
n.msg_operation.url&&(n.msg_operation.url=s(n.msg_operation.url))),n.msg_operation.endtime=n.msg_operation.end_time,
n.bonus_rule=e.bonus_rule||{},n.bonus_rule.init_bonus=n.bonus_rule.init_increase_bonus,
n.bonus_rule.cost_money_unit=n.bonus_rule.cost_money_unit&&n.bonus_rule.cost_money_unit/100,
n.bonus_rule.reduce_money=n.bonus_rule.reduce_money&&n.bonus_rule.reduce_money/100,
n.bonus_rule.least_money_to_use_bonus=n.bonus_rule.least_money_to_use_bonus&&n.bonus_rule.least_money_to_use_bonus/100,
b.sub_merchant_info&&(n.sub_merchant_id=b.sub_merchant_info.merchant_id);
var v=e.advanced_info;
if(n.use_hours=[],v){
n.is_sns_card=1==v.gen_type,n.orig_time_limit=v.time_limit||[],n.text_image_list=v.text_image_list||[],
n.time_limit=[];
var T={};
if(v.time_limit)for(var E=0;E<v.time_limit.length;E++){
var w=v.time_limit[E];
T[w.type]||(T[w.type]=!0,n.time_limit.push(w));
}
1!=n.create_source&&v.time_limit&&v.time_limit.length&&v.time_limit[0].end_hour&&(n.use_hours.push(v.time_limit[0]),
v.time_limit.length>1&&v.time_limit[0].type==v.time_limit[1].type&&n.use_hours.push(v.time_limit[1])),
n.consume_share_self_num=v.consume_share_self_num,n.consume_share_self_num>0?(n.consume_is_share=!0,
n.consume_share_type=1):v.consume_share_card_list&&v.consume_share_card_list.length?(n.consume_is_share=!0,
n.consume_share_type=2,n.consume_share_card_id=v.consume_share_card_list[0].card_id):n.consume_is_share=!1,
n.business_service=v.business_service;
var S=v.abstract;
S&&($(".section_card_intro").show(),n.abstract=S.abstract,n.cover_logo=S.icon_url_list?S.icon_url_list[0]:"");
}
if(n.is_quit_money=n.func_flag&1<<22,n.can_edit_quantity=!(n.is_quit_money||10==n.type||n.is_from_intercomm||(3!=n.status&&5!=n.status&&6!=n.status||!n.is_sns_card||n.is_expire)&&n.is_sns_card),
n.is_sns_card&&(n.isnew=!0),n.isnew||(n.quantity="--"),3==n.type&&n.is_sns_card){
n.gift_title=n.title;
var A=v.use_condition;
n.title=A?A.least_cost?"满%s送%s".sprintf(A.least_cost/100,n.gift_title):A.object_use_for?"买%s送%s".sprintf(A.object_use_for,n.gift_title):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:""):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:"");
}
n.pay_info=b.pay_info&&b.pay_info.swipe_card||{};
var k=65536&n.func_flag;
if(k)n.dispose_method=1;else{
var D=n.func_flag&1<<24;
n.pay_info.is_swipe_card?(n.dispose_method=4,n.code_type=1e4):D?(n.dispose_method=2,
n.code_type=1e4):n.dispose_method=3;
}
var C=n.pay_info;
if(C.auditing_info_list||(C.auditing_info_list=[]),C.is_swipe_card){
var R=C.auditing_info_list;
if(R.length){
var q=R[R.length-1];
if(C.swipe_card_status=0==q.mid_list.length?1:1==q.ret?C.is_active?0:3:2,q.trans_buff){
var I=q.trans_buff.html(!1);
try{
I=$.parseJSON(I);
}catch(x){
I="";
}
q.trans_buff=I,C.last_audit_item=q;
}
}else C.swipe_card_status=0==n.quantity?4:0;
}
!C.is_swipe_card||1!=C.swipe_card_status&&3!=C.swipe_card_status||(n.can_edit_quantity=!1),
v&&v.consume_cell_info&&(n.need_verify_code=v.consume_cell_info.need_verify_code,
n.need_remark=v.consume_cell_info.need_remark),n._can_global_edit=!n.is_from_intercomm&&(!n.is_sns_card||n.is_sns_card&&!n.is_expire&&(3==n.status||5==n.status||6==n.status)||n.is_sns_card&&(1==n.status||2==n.status));
var A=v&&v.use_condition;
return A&&(n.use_condition_least_cost=A.least_cost/100||"",n.accept_category=A.accept_category,
n.reject_category=A.reject_category,n.can_use_with_other_discount=A.can_use_with_other_discount,
n.can_use_with_membercard=A.can_use_with_membercard,n.object_use_for=A.object_use_for,
n.has_condition=A.least_cost||A.object_use_for||A.accept_category||A.reject_category||!A.can_use_with_other_discount,
3==n.type&&(n.use_condition_least_cost_type=n.object_use_for?2:1)),n.is_sns_card&&3==n.type&&(n.has_condition=!0),
n;
}
function a(e,_){
for(var t in _)_.hasOwnProperty(t)&&"object"!==_typeof(_[t])&&(e[t]=_[t]);
return e;
}
function r(e){
for(var _={},t=[],i=0;i<e.length;i++){
var s=n(e[i]);
s&&(_[s.id]=s,t.push(s));
}
return{
card_cache:_,
card_list:t
};
}
var c=e("cardticket/add/member_info_flag.js"),u={
DISCOUNT:"2",
MEMBER_CARD:"10",
GROUPON:"1",
GIFT:"3",
CASH:"4",
GENERAL_COUPON:"0",
SCENIC_TICKET:"21",
MOVIE_TICKET:"22"
},l={
CODE_TYPE_TEXT:0,
CODE_TYPE_BARCODE:1,
CODE_TYPE_QRCODE:2
},m={
CARD_STATUS_INIT:0,
CARD_STATUS_NOT_VERIFY:1,
CARD_STATUS_VERIFY_FAIL:2,
CARD_STATUS_VERIFY_OK:3,
CARD_STATUS_DELETE:4,
CARD_STATUS_SYS_DELETE:5,
CARD_STATUS_DISPATCH:6,
CARD_STATUS_SYS_OFF_SHELF:7,
CARD_STATUS_EXPIRED:8
},f={
DATE_TYPE_FIX_TIME_RANGE:1,
DATE_TYPE_FIX_TERM:2,
DATE_TYPE_PERMANENT:100
};
return{
parse_cardticket:n,
parse_cardlist:r,
url_type:i
};
});define("cardticket/send_card.js",["common/wx/popup.js","common/wx/Step.js","cardticket/send_card_table.js","tpl/cardticket/send_card.html.js"],function(e){
"use strict";
var t=(e("common/wx/popup.js"),{
removeOnHide:!0,
view_mode:window.view_mode||0
}),p=(e("common/wx/Step.js"),function(e){
this.opt=$.extend(!0,{},t,e),this.init();
}),o=e("cardticket/send_card_table.js");
return p.prototype={
_html:e("tpl/cardticket/send_card.html.js"),
init:function(){
var e=this.opt,t=this,p=$(template.compile(this._html)()).popup({
title:"选择卡券",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
t.sendCardTable.select();
}
},{
text:"取消",
type:"default",
click:function(){
t.sendCardTable.isLoading()||this.hide();
}
}],
onHide:function(){
e.onHide&&e.onHide.call(t),e.removeOnHide&&this.remove();
},
className:"send_card align_edge",
width:960
});
if(this.$send_popup=p,e.container=this.$send_popup,e.pageChanged=function(){
t.$send_popup.popup("resetPosition");
},e.getDataComplete=function(){
t.$send_popup.popup("resetPosition");
},e.selectComplete){
var n=e.selectComplete;
e.selectComplete=function(){
n.call(t,arguments[0],arguments[1],arguments[2]),t.hide();
};
}else e.selectComplete=function(){
t.hide();
};
e.hidePopup=function(){
t.$send_popup.popup("hide");
},this.sendCardTable=new o(e);
},
show:function(){
this.$send_popup.popup("show"),this.$send_popup.popup("resetPosition");
},
hide:function(){
this.$send_popup.popup("hide");
},
destroy:function(){
this.$send_popup.popup("remove");
}
},p;
});define("tpl/vote/vote_table.html.js",[],function(){
return'\n<div class="">\n    <div class="mini_tips weak_text img_water_tips r">\n      只可以选择已发布且在有效期内的投票，若投票未发布，请在<a href="javascript:;" class="js_manage_vote">投票管理</a>发布投票<a class="btn btn_default js_new_vote" target="_blank">新建投票</a>    </div>\n	<div class="table_wrp with_border">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell vote_check">&nbsp;</th>\n					<th class="table_cell vote_title tl"><div class="td_panel">投票名称</div></th>\n					<th class="table_cell vote_time tl"><div class="td_panel">截至时间</div></th>\n					<th class="table_cell vote_num"><div class="td_panel">投票人数</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n            {if loading}\n                <tr>\n                    <td class="empty_tips" colspan="4"><i class="icon_loading_small white">loading...</i></td>\n                </tr>\n            {else}\n                {if !data.super_vote_info.length}\n                    <tr>\n                        <td class="empty_tips" colspan="4">暂无有效投票</td>\n                    </tr>\n                {else}\n                {each data.super_vote_info as vote i}\n                    <!--Begin 现在的-->\n                    <tr id="js_ct_tr_{vote.super_vote_id}">\n                        <td class="table_cell" colspan="4">\n                            <label class="frm_radio_label">\n                                <span class="td_panel vote_check">\n                                    <i class="icon_radio"></i>\n                                </span>\n                                <input type="radio" data-id="{vote.super_vote_id}" data-biz="{biz}" value="{vote.super_vote_id}" class="frm_radio js_select" data-height="{vote.height}">\n\n                                <span class="td_panel vote_title">\n                                    <a target="_blank" href="/cgi-bin/newoperatevote?action=show&supervoteid={vote.super_vote_id}{token}">{vote.title}</a>\n                                </span>\n                                <span class="td_panel vote_time">\n                                    {datestring vote.expire_time*1000}\n                                </span>\n                                <span class="td_panel vote_num">\n                                    {vote.person_count}\n                                </span>\n                            </label>\n                        </td>\n                    </tr>\n                    <!--End 现在的-->\n\n                    <!--Begin 原来的-->\n                    <!--<tr id="js_ct_tr_{vote.super_vote_id}">\n                        <td class="table_cell vote_check">\n                            <div class="td_panel">\n                                <label class="frm_radio_label">\n                                    <i class="icon_radio"></i>\n                                    <input type="radio" data-id="{vote.super_vote_id}" data-biz="{biz}" value="{vote.super_vote_id}" class="frm_radio js_select" data-height="{vote.height}">\n                                </label>\n                            </div>\n                        </td>\n                        <td class="table_cell vote_title"><div class="td_panel"><a target="_blank" href="/cgi-bin/newoperatevote?action=show&supervoteid={vote.super_vote_id}{token}">{vote.title}</a></div></td>\n                        <td class="table_cell vote_time"><div class="td_panel">{datestring vote.expire_time*1000}</div></td>\n                        <td class="table_cell vote_num"><div class="td_panel">{vote.person_count}</div></td>\n                    </tr>-->\n                    <!--End 原来的-->\n                {/each}\n                {/if}\n            {/if}\n			</tbody>\n		</table>\n		<div class="js_pager"></div>\n	</div>\n</div>';
});define("biz_web/lib/spin.js",[],function(){
var t=function(){
function t(t,n){
for(var e=~~((t[f]-1)/2),r=1;e>=r;r++)n(t[2*r-1],t[2*r]);
}
function n(n){
var e=document.createElement(n||"div");
return t(arguments,function(t,n){
e[t]=n;
}),e;
}
function e(t,n,r){
return r&&!r[z]&&e(t,r),t.insertBefore(n,r||null),t;
}
function r(t,n){
var e,r=[h,n,~~(100*t)].join("-"),i="{"+h+":"+t+"}";
if(!A[r]){
for(e=0;e<T[f];e++)try{
D.insertRule("@"+(T[e]&&"-"+T[e].toLowerCase()+"-"||"")+"keyframes "+r+"{0%{"+h+":1}"+n+"%"+i+"to"+i+"}",D.cssRules[f]);
}catch(o){}
A[r]=1;
}
return r;
}
function i(t,n){
var e,r,i=t[g];
if(void 0!==i[n])return n;
for(n=n.charAt(0).toUpperCase()+n.slice(1),r=0;r<T[f];r++)if(e=T[r]+n,void 0!==i[e])return e;
}
function o(n){
return t(arguments,function(t,e){
n[g][i(n,t)||t]=e;
}),n;
}
function s(n){
return t(arguments,function(t,e){
void 0===n[t]&&(n[t]=e);
}),n;
}
var a,u="width",f="length",l="radius",c="lines",d="trail",p="color",h="opacity",v="speed",m="shadow",g="style",w="height",b="left",x="top",y="px",k="childNodes",$="firstChild",z="parentNode",C="position",M="relative",R="absolute",j="animation",B="transform",N="Origin",E="Timeout",L="coord",O="#000",S=g+"Sheets",T="webkit0Moz0ms0O".split(0),A={};
e(document.getElementsByTagName("head")[0],n(g));
var D=document[S][document[S][f]-1],H=function(t){
this.opts=s(t||{},c,12,d,100,f,7,u,5,l,10,p,O,h,.25,v,1);
},I=H.prototype={
spin:function(t){
var n=this,r=n.el=n[c](n.opts);
if(t&&e(t,o(r,b,~~(t.offsetWidth/2)+y,x,~~(t.offsetHeight/2)+y),t[$]),!a){
var i=n.opts,s=0,u=20/i[v],f=(1-i[h])/(u*i[d]/100),l=u/i[c];
!function p(){
s++;
for(var t=i[c];t;t--){
var e=Math.max(1-(s+t*l)%u*f,i[h]);
n[h](r,i[c]-t,e,i);
}
n[E]=n.el&&window["set"+E](p,50);
}();
}
return n;
},
stop:function(){
var t=this,n=t.el;
return window["clear"+E](t[E]),n&&n[z]&&n[z].removeChild(n),t.el=void 0,t;
}
};
I[c]=function(t){
function i(e,r){
return o(n(),C,R,u,t[f]+t[u]+y,w,t[u]+y,"background",e,"boxShadow",r,B+N,b,B,"rotate("+~~(360/t[c]*k)+"deg) translate("+t[l]+y+",0)","borderRadius","100em");
}
for(var s,a=o(n(),C,M),g=r(t[h],t[d]),k=0;k<t[c];k++)s=o(n(),C,R,x,1+~(t[u]/2)+y,B,"translate3d(0,0,0)",j,g+" "+1/t[v]+"s linear infinite "+(1/t[c]/t[v]*k-1/t[v])+"s"),
t[m]&&e(s,o(i(O,"0 0 4px "+O),x,2+y)),e(a,e(s,i(t[p],"0 0 1px rgba(0,0,0,.1)")));
return a;
},I[h]=function(t,n,e){
t[k][n][g][h]=e;
};
var U="behavior",V="url(#default#VML)",W="group0roundrect0fill0stroke".split(0);
return function(){
var t,r=o(n(W[0]),U,V);
if(!i(r,B)&&r.adj){
for(t=0;t<W[f];t++)D.addRule(W[t],U+":"+V);
I[c]=function(){
function t(){
return o(n(W[0],L+"size",d+" "+d,L+N,-a+" "+-a),u,d,w,d);
}
function r(r,i,f){
e(v,e(o(t(),"rotation",360/s[c]*r+"deg",b,~~i),e(o(n(W[1],"arcsize",1),u,a,w,s[u],b,s[l],x,-s[u]/2,"filter",f),n(W[2],p,s[p],h,s[h]),n(W[3],h,0))));
}
var i,s=this.opts,a=s[f]+s[u],d=2*a,v=t(),g=~(s[f]+s[l]+s[u])+y;
if(s[m])for(i=1;i<=s[c];i++)r(i,-2,"progid:DXImage"+B+".Microsoft.Blur(pixel"+l+"=2,make"+m+"=1,"+m+h+"=.3)");
for(i=1;i<=s[c];i++)r(i);
return e(o(n(),"margin",g+" 0 0 "+g,C,M),v);
},I[h]=function(t,n,e,r){
r=r[m]&&r[c]||0,t[$][k][n+r][$][$][h]=e;
};
}else a=i(r,j);
}(),H;
}();
$.fn.spin=function(n,e){
return this.each(function(){
var r=$(this),i=r.data();
i.spinner&&(i.spinner.stop(),delete i.spinner),n!==!1&&(n=$.extend({
color:e||r.css("color")
},$.fn.spin.presets[n]||n),i.spinner=new t(n).spin(this));
});
},$.fn.spin.presets={
tiny:{
lines:8,
length:2,
width:2,
radius:3
},
small:{
lines:8,
length:4,
width:3,
radius:5
},
large:{
lines:10,
length:8,
width:4,
radius:8
}
};
});define("tpl/author/author_select.html.js",[],function(){
return'<div class="author_select_pop">\n  {if !info && showLoading}\n  <div class="weui-desktop-empty-tips"><i class="weui-desktop-loading"></i>正在查找</div>\n  {else if info && info.length == 0}\n  <div class="author_select_empty_data">\n    <p class="weui-desktop-tips_warn">\n    没有在已授权的赞赏账户中找到此名称    </p>\n    <p class="weui-desktop-tips">\n      如果要取得授权，请到<a data-type="2" class="js_show_author_qrcode_popover" href="javascript:;">赞赏账户小程序</a>-赞赏账户设置-可收款公众号中添加本公众号。      {if inviteAuthorLink}\n      <br>\n      如果要创建赞赏账户，你可以发送<a target=\'_blank\' href=\'{inviteAuthorLink}\'>赞赏账户邀请</a>。      {/if}      \n    </p>\n  </div>\n  {else if info && info.length > 0}\n  <ul class="author_select_list">\n    {each info as item idx}\n    <li data-idx="{idx}" class="js_item author_select_item {if item.author_status*1||item.can_reward*1==0}author_select_item_disabled{/if}">\n      {if item.nicknameHighline}\n      <strong class="author_nickname">{=item.nicknameHighline}</strong>\n      {else}\n      <strong class="author_nickname">{item.nickname}</strong>\n      {/if}\n      <span class="author_avatar" style="background-image:url({item.headimg})"></span>\n      {if item.author_status*1}\n      <span class="weui-desktop-tips author_status">作者被封禁</span>\n      {else if item.can_reward*1 == 0}\n      <span class="weui-desktop-tips author_status">赞赏能力被封禁</span>\n      {/if}        \n      <a style="display:none;" class="author_nickname js_show_author_qrcode_popover" data-type="1" data-writerid="{item.writerid}" data-desc="{item.nickname_encode}">查看作者</a>\n    </li>\n    {/each}\n  </ul>\n  {/if}\n  {if botTips}\n  <p class="author_select_tips">\n  {botTips}\n  </p>\n  {/if}\n</div>\n\n';
});define("tpl/media/appmsg_edit/previewDialog.html.js",[],function(){
return'<div class="js_preview_dialog_content wechat_send_content">\n    <div class="wechat_send_form_box">\n        <form class="form"  onSubmit="return false;">\n            <div class="frm_control_group">\n                <label class="frm_label">关注公众号后，才能接收图文消息预览</label>\n\n                <div class="weui-desktop-wechat-search">\n                    <span class="weui-desktop-form-tag__area">\n                        <label id="js_preview_wxname_label" class="weui-desktop-form-tag__input__label" for="js_preview_wxname"></label>\n                        <span class="weui-desktop-form-tag__wrp">\n                            <span id="js_preview_wxname_container"></span>\n                            <input id="js_preview_wxname" type="text" class="weui-desktop-form-tag__input" autocomplete="off" placeholder="可输入多个微信号，按回车分隔">\n                        </span>\n                    </span>\n                    <div id="js_recently_preview_wxname_container" class="weui-desktop-pop-panel" style="display: none;">\n                        <div class="weui-desktop-global-mod weui-desktop-pop-panel__hd js_rencently_title">\n                            <div class="weui-desktop-global__info">发送过的微信号</div>\n                            <div class="weui-desktop-global__extra"><a href="javascript:void(0);" id="js_clear_rencently_wxname">清空历史记录</a></div>\n                        </div>\n                        <div class="weui-desktop-pop-panel__bd">\n                            <ul id="js_recently_preview_wxname" class="weui-desktop-wechat-list"></ul>\n                        </div>\n                    </div>\n                </div>\n                <p class="weui-desktop-form__tips">预览功能仅用于公众号查看文章效果，不适用于公众传播，预览链接会在短期内失效</p>\n\n                <div class="wechat_send_extra_info">\n                  <div class="wechat_send_qrcheck">\n                    <img class="wechat_send_qrcheck_img" src="/misc/getqrcode?fakeid={uin}&token={token}&style=1">\n                    <p>扫描关注{nickname}</p>\n                  </div>\n                  <div class="wechat_send_msg">\n                    <p class="weui-desktop-tips_warn jsAccountFail" style="display: none;"></p>\n                  </div>\n                </div>\n            </div>\n        </form>\n    </div>\n</div>\n';
});define("media/template_common.js",["media/common.js","common/wx/Cgi.js","common/wx/time.js","tpl/media/appmsg_tmpl.html.js","common/wx/mpEditor/utils.js","common/wx/mpEditor/pluginsList.js"],function(e){
"use strict";
function t(e,t){
var a=t.canSelect===!1?!1:!0,o=t.canPreview===!1?!1:!0,n=t.showUpdateTime===!1?!1:!0,i=t.showEdit===!1?!1:!0,m=t.showEdit===!0?!0:!1,r=t.token||"";
!r&&window.wx&&window.wx.data&&window.wx.data.t&&(r=window.wx.data.t);
for(var _=0,w=e.length;w>_;_++){
var u=e[_];
u.token=r,u.canSelect=a,u.canPreview=o,u.showUpdateTime=n,u.showEdit=i,u.highLine=m,
u.update_time&&(u.update_time_str=s.timeFormat(u.update_time)),u.title_encode=u.title,
u.title_encode=m?u.title_encode.replace(/<em>/g,"__em_start__").replace(/<\/em>/g,"__em_end__").html(!0).replace(/__em_start__/g,"<em>").replace(/__em_end__/g,"</em>"):u.title_encode.html(!0),
u.content=d.formatTemplateContent({
content:u.content,
appmsgTmplVideoWidth:l
}),u.iframeHtml=function(e,t){
return c.createLocalIframe({
$dom:$(document.body),
onIframeReadyFunc:function(a){
a.doc.body.innerHTML=e[t].content,window.wx&&window.wx.EditorRes&&window.wx.EditorRes.template_iframe&&(a.doc.head.innerHTML='<link rel="stylesheet" type="text/css" href="'+window.wx.EditorRes.template_iframe+'">');
}
});
}(e,_),u.contentHtml=template.compile(p)(u);
}
return e;
}
function a(e){
var t="";
t="undefined"!=typeof e.postData.appmsgid?"update":"create",e.isDefault&&(t="create"),
r.post({
url:"/cgi-bin/appmsgtemplate?action="+t,
data:e.postData
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret)return void e.onSuccess(t);
var a;
if(t&&t.base_resp){
var o=m.articleRetCode(t);
a=o.errmsg||"系统繁忙，请稍后再试";
}else a="系统繁忙，请稍后再试";
e.onError(a,t||{});
},
fail:function(t){
e.onError("系统繁忙，请稍后再试",t||{});
}
});
}
function o(e){
var t=e.page||0,a=e.perPage||6;
r.post({
url:"/cgi-bin/appmsgtemplate?action=list",
data:{
begin:t*a,
count:a
},
mask:!1
},{
done:function(a){
if(a&&a.base_resp&&0==a.base_resp.ret)e.callback({
code:0,
list:a.appmsg_template||[],
total:1*a.total,
page:t
});else{
var o="";
a&&a.base_resp&&200013==a.base_resp.ret&&(o="操作太频繁，请稍后再试"),e.callback({
code:-1,
msg:o
});
}
},
fail:function(){
e.callback({
code:-1
});
}
});
}
function n(e){
r.post({
url:"/cgi-bin/appmsgtemplate?action=delete",
data:{
appmsgid:e.id
},
mask:!1
},{
done:function(t){
t&&t.base_resp&&0==t.base_resp.ret?e.onSuccess():e.onError({
resp:t||{},
msg:"系统繁忙，请稍后再试"
});
},
fail:function(t){
e.onError({
resp:t||{},
msg:"系统繁忙，请稍后再试"
});
}
});
}
function i(e){
r.post({
url:"/cgi-bin/appmsgtemplate?action=preview",
data:e.postData,
mask:!1
},{
done:function(t){
if(t&&t.base_resp&&0==t.base_resp.ret)e.onSuccess(t);else{
var a=m.articleRetCode(t);
t.word=a.errmsg,t.antispam=a.index,e.onError(t);
}
},
fail:function(){
e.onError({
word:"系统繁忙，请稍后再试"
});
}
});
}
var m=e("media/common.js"),r=e("common/wx/Cgi.js"),s=e("common/wx/time.js"),p=e("tpl/media/appmsg_tmpl.html.js"),c=e("common/wx/mpEditor/utils.js"),d=e("common/wx/mpEditor/pluginsList.js"),l=400,_=20;
return{
formatTemplateData:t,
maxTemplateNum:_,
handleTemplate:a,
getTemplateList:o,
delTemplateList:n,
preview:i
};
});