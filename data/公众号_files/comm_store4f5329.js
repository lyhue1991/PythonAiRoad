define("tpl/cardticket/card_table.html.js",[],function(){
return'<div class="release_method js_card_container send_card">\n	{if loading}\n	<div class="loading"><i class="icon_loading_small white">loading...</i></div>\n	{else}\n	<div class="sub_title_bar group">\n		{if sns_card_type==2}<a href="javascript:void(0);" class="js_add_card_link r btn btn_primary">新建朋友的券 </a>{/if}\n		<!-- <span class="frm_input_box search append">\n			<a href="javascript:void(0);" class="js_search frm_input_append">\n				<i class="icon16_common search_gray">搜索</i>\n				&nbsp;\n			</a>\n			<input type="text" placeholder="请输入卡券名称" class="frm_input js_keyword">\n		</span>  -->\n	</div>\n	<div class="table_wrp release_method_select_table_wrp">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell release_method_select_box">&nbsp;</th>\n					{if view_mode==2}\n					<th class="table_cell">商户名</th>\n					{/if}\n					<th class="table_cell release_method_kind"><div class="td_panel">卡券类型</div></th>\n					<th class="table_cell release_method_name"><div class="td_panel"><div class="js_filter_tag">卡券名称</div></div></th>\n					{if !hide_valid_date}\n					<th class="table_cell release_method_time"><div class="td_panel">卡券有效期</div></th>\n					{/if}\n					<th class="table_cell release_method_stock"><div class="td_panel">库存</div></th>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<th class="table_cell release_method_price"><div class="td_panel">微信价(元)</div></th>{/if}\n					<!-- <th class="table_cell release_method_preview"><div class="td_panel">预览</div></th> -->\n					<th class="table_cell release_method_state"><div class="td_panel">卡券状态</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n			{if !data.length}\n				<tr>\n					<td class="empty_tips" colspan="6">暂无卡券</td>\n				</tr>\n			{else}\n			{each data as card i}\n            <tr  class="{if hasdata && (i<pageInfo.begin||i>=pageInfo.begin+pageInfo.count)}dn{/if}{if (sns_card_type==2 && !card.is_sns_card) || (sns_card_type==1 && card.is_sns_card) || card.is_sub_merchant_disabled} disabled_item{/if}" id="js_ct_tr_{card.id}">\n					<td class="table_cell release_method_select_box"><div class="td_panel">\n						{if !multi}\n						<label class="frm_radio_label">\n							<i class="icon_radio"></i>\n							<input type="radio" data-id="{card.id}" value="{card.id}" class="frm_radio js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{else}\n						<label class="frm_checkbox_label">\n							<i class="icon_checkbox"></i>\n							<input type="checkbox" data-id="{card.id}" value="{card.id}" class="frm_checkbox js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{/if}\n					</div></td>\n					{if view_mode==2}\n					<td class="table_cell release_method_kind"><div class="td_panel">{card.brand_name}</div></td>\n					{/if}\n					<td class="table_cell release_method_kind"><div class="td_panel">{convert_type card.type}</div></td>\n					<td class="table_cell release_method_name"><div class="td_panel">{card.title}{if card.is_sns_card}<i class="ic_social">共享</i>{/if}{if card.is_intercomm}<i class="icon18 ic_intercomm"></i>{/if}</div></td>\n					{if !hide_valid_date}\n					<td class="table_cell release_method_time"><div class="td_panel">{validtime card \'YYYY-MM-DD\'}</div></td>\n					{/if}\n					<td class="table_cell release_method_stock"><div class="td_panel"><span class="js_sendcard_quantity{if card.quantity==0} text_weak{/if}">{card.quantity}</span>\n						{if editquantity && !card.is_from_intercomm && card.can_edit_quantity}<a class="icon14_common edit_gray js_modify_quantity" href="javascript:;" data-new="{if card.isnew}1{/if}" data-cid="{card.id}" data-x="-161" title="修改库存"></a>{else}<span class="w20"></span>{/if}</div>\n					</td>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<td class="table_cell release_method_price"><div class="td_panel">{if card.ispay}{card.price}{else}--{/if}</div></td>{/if}\n					<!-- <td class="table_cell release_method_preview"><div class="td_panel"><a data-cid="{card.id}" data-x="-125" class="js_card_preview" href="javascript:void(0);">预览</a></div></td> -->\n					<td class="table_cell release_method_state"><div class="td_panel"><span class="fail pass"><i></i>{convert_state card.status}</span></div></td></td>\n				</tr>\n			{/each}\n			{/if}\n			</tbody>\n		</table>\n		{if !hide_tips}\n			{if tips_wording}\n				<div class="mini_tips l">{=tips_wording}</div>\n			{else if sns_card_type==1}\n				<div class="mini_tips l">只能投放普通券</div>\n			{else if sns_card_type==2}\n				<div class="mini_tips l">\n					{if use_scene==2}\n						只能投放商户的其它可共享优惠券					{else}\n						只能投放可共享优惠券					{/if}\n				</div>\n			{/if}\n		{/if}\n        <div class="js_pager"></div>\n        {if multi}\n        <p class="dialog_bt_tip">已选<span class="js_selectcount">{defaultValues.length||0}</span>个</p>\n        {/if}\n	</div>\n	{/if}\n</div>\n';
});define("cardticket/create_card_select.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/popup.js","common/wx/dialog.js","cardticket/select_sub_merchant_table.js","cardticket/common_template_helper.js","tpl/cardticket/choose_card_type.html.js","common/wx/Step.js"],function(e){
"use strict";
function t(e){
return 1==window.view_mode&&(1==c||2==c)||2==window.view_mode&&e&&h.can_category_use_sns_card(e.PrimaryCategoryId,e.SecondaryCategoryId);
}
function i(e,t){
var i=$(e.step2container).html(f({
flag:e.ispay,
is_sns_card:e.is_sns_card,
show_all_card:e.show_all_card,
view_mode:window.view_mode
})),n=$(".frm_tab").height();
$(".js_is_friend_type_1 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type1=$(e).val();
var s=$(e).attr("data-not_has_condition");
t.has_condition=1==s?!1:!0;
var o=$(".frm_tab .selected",i).index(),_=0-o*n;
$(".tab_items",i).css("top",_);
}
}),$(".js_is_friend_type_2 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type2=$(e).val();
var i=$(e).attr("data-not_has_condition");
t.has_condition=1==i?!1:!0;
}
}),i.find(".js_is_friend").checkbox({
onChanged:function(e){
$(".js_is_friend_type",i).hide(),$(".js_is_friend_type_"+$(e).val(),i).show(),1==$(e).val()?(t.is_friend=!0,
setTimeout(function(){
n=$(".frm_tab",i).height();
var e=$(".js_is_friend_type_1 .frm_radio_label",i).length;
$(".choose_card_type,.frm_tab_item",i).css("height",n),$(".tab_items",i).css("height",n*e);
})):t.is_friend=!1,$(".js_is_friend_type_"+$(e).val(),i).find(".js_card_type:checked").click(),
t.$popup.popup("resetPosition");
}
}),"undefined"!=typeof c&&_(e,t,i);
}
function n(e,i){
var n=$(m()).popup({
title:"创建优惠券",
autoShow:!1,
width:956,
buttons:[{
text:"取消",
type:"default",
click:function(){
this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var e=i.merchantSelector.selectedValue();
e&&(i.merchant_data=e,o(i));
}
},{
text:"上一步",
type:"default",
click:function(){
s(i);
}
},{
text:"确定",
type:"primary",
click:function(){
return i.is_friend&&"undefined"==typeof c?!0:(i.is_friend&&!t(i.merchant_data)&&(p.show({
msg:'本公众号子商户类目不支持制作朋友的券|<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#1dot1" target="_blank">查看朋友的券类目开放范围</a>',
type:"info",
buttons:[{
text:"取消",
click:function(e){
this.remove(e);
},
type:"normal"
},{
text:"配置子商户",
click:function(e){
window.open(wx.url("/merchant/cardhelpmakesend?action=list")),this.remove(e);
},
type:"primary"
}]
}),this.hide()),i.is_friend&&i.card_type1||!i.is_friend&&i.card_type2?(window.open(wx.url("/merchant/electroniccardmgr?action=%s&type=%s&flag=%s&is_sns_card=%s&has_condition=%s%s".sprintf(i.is_friend?"addsnspage":"addpage",i.is_friend?i.card_type1:i.card_type2,1==e.ispay?1:"0",i.is_friend?1:"0",i.has_condition?1:"0",i.merchant_data?"&sub_merchant_id="+i.merchant_data.Id:""))),
void this.hide()):void d.err(i.is_friend?"请选择其他卡券类型":"请选择卡券类型"));
}
}],
onHide:function(){
e.onHide&&e.onHide.call(i),this.remove();
},
className:"align_edge"
});
i.$popup=n,i.step=new l({
container:n.find(".js_step_container"),
names:["1 选择代制的子商户","2 选择券类型"]
}),i.$popup.popup("show");
var _=n.popup("get").find(".js_step_content");
i.opt.step2container=_[1],i.opt.container=$(_[0]).find(".js_sub_merchant_list");
}
function s(e){
var t=e.$popup,i=t.popup("get").find(".js_step_content"),n=t.popup("get").find(".js_btn_p");
$(n[0]).show(),$(n[1]).show(),$(n[2]).hide(),$(n[3]).hide(),e.step.go(1),$(i[0]).show(),
$(i[1]).hide(),t.popup("resetPosition");
}
function o(e){
var t=e.$popup,n=t.popup("get").find(".js_step_content"),s=t.popup("get").find(".js_btn_p");
$(s[0]).hide(),$(s[1]).hide(),$(s[2]).show(),$(s[3]).show(),$(n[0]).hide(),$(n[1]).show(),
e.step.go(2),e.opt.merchant_data=e.merchant_data,i(e.opt,e),t.popup("resetPosition");
}
function _(e,i,n){
$(".js_is_friend_tips",n).hide(),!t(i.merchant_data)&&e.show_all_card?($(n.find(".js_is_friend")[0]).click(),
$(n.find(".js_is_friend")[1]).checkbox().disabled(!0),$(".js_is_friend_view_mode"+(window.view_mode||1)+"_tips",n).show()):($(n.find(".js_is_friend")[1]).checkbox().disabled(!1),
$(n.find(".js_is_friend")[0]).click(),$(".js_is_friend_support_tips",n).show());
}
function a(e){
var t=this;
this.opt=e,n(e,t);
var i=t.$popup.popup("get");
if(1==window.view_mode){
o(t);
var i=t.$popup.popup("get");
i.find(".js_step_container").hide();
var a=i.find(".js_btn_p");
$(a[2]).hide();
}else s(t);
var d={
resetPosition:function(){
t.$popup.popup("resetPosition");
},
getDataComplete:function(e){
var i=t.$popup.popup("get");
e&&e.length?$(i.find(".js_btn_p")[0]).removeClass("btn_disabled"):$(i.find(".js_btn_p")[0]).addClass("btn_disabled");
},
container:e.container,
is_sns_card:!1,
max_card:e.max_card
};
t.merchantSelector=new r(d),"undefined"==typeof c&&h.check_assist_brand_name_type(function(n){
c=n,_(e,t,i);
});
}
var c,d=(e("biz_web/ui/checkbox.js"),e("common/wx/Tips.js")),p=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),r=e("cardticket/select_sub_merchant_table.js"),h=e("cardticket/common_template_helper.js"),f=template.compile(e("tpl/cardticket/choose_card_type.html.js")),m=template.compile('<div>			<div class="wrp_processor js_step_container"></div>			<div class="first_step js_step_content js_step1">				<div class="js_sub_merchant_list select_subshop"></div>			</div>			<div class="second_step js_step_content js_step2"></div>			</div>'),l=e("common/wx/Step.js");
return window.view_mode||(window.view_mode=1),a;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("cardticket/common_template_helper.js",["common/wx/upload.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/add/msg_operate_type_html.js"],function(e){
"use strict";
function t(e){
for(var t,r,n,a,p=[],c=0;c<e.length;c++){
var i=e[c];
"object"===("undefined"==typeof i?"undefined":_typeof(i))&&(i=d[i.type]),a=g[i],
i?c==e.length-1?n&&i-n!=1?(p.push(t+(r?"至"+r:"")),p.push(a)):p.push(t?t+"至"+a:a):n&&i-n!=1?(p.push(t+(r?"至"+r:"")),
t=a,r="",n=i):(t?r=a:t=a,n=i):(i=8,c==e.length-1&&t&&p.push(t+"至"+r),p.push(a),t=r=n="");
}
return p.join("、");
}
function r(e){
return e.replace(/\r\n|\\n|\n/g,"<br/>");
}
function n(e){
var t="YYYY-MM-DD HH:mm:ss",r=l(e,t);
return r?r.format("YYYY-MM-DD"):"";
}
function a(e){
return 1==e||3==e||2==e;
}
function p(e,t){
return 1==e&&119>=t?!0:(2!=e||215!=t&&210!=t&&208!=t&&207!=t&&206!=t&&204!=t&&203!=t&&211!=t&&201!=t&&202!=t)&&(3!=e||308!=t&&309!=t&&306!=t&&305!=t&&304!=t&&303!=t&&314!=t&&316!=t&&317!=t)&&(6!=e||601!=t&&602!=t&&603!=t)?4==e&&402==t?!0:7==e&&701==t?!0:(5!=e||501!=t&&502!=t&&503!=t)&&(8!=e||812!=t&&811!=t&&808!=t&&817!=t&&818!=t&&827!=t&&804!=t&&803!=t&&802!=t&&801!=t&&824!=t&&822!=t&&823!=t&&821!=t&&828!=t&&814!=t&&825!=t&&826!=t&&809!=t&&807!=t&&816!=t&&819!=t&&813!=t)?!1:!0:!0;
}
function c(e){
for(var t=0;t<S.length;t++){
var r=S[t];
"function"!=typeof r&&(r=$.noop),r(e);
}
S=[];
}
function i(e){
return S.push(e),"undefined"!=typeof F?(c(F),!0):C?!1:(C=!0,u.get({
url:"/merchant/cardhelpmakesend",
data:{
action:"list",
begin:0,
count:9999999,
status_list:1
},
complete:function(){
C=!1;
}
},function(e){
if(0==e.base_resp.ret||-1==e.base_resp.ret){
for(var t=$.parseJSON(e.bind_list),r=t.List,n=!1,a=!1,i=0;i<r.length;i++){
var _=r[i];
if(p(_.PrimaryCategoryId,_.SecondaryCategoryId)){
a=!0;
break;
}
}
e.attr&&e.attr.merchant_info&&(n=p(e.attr.merchant_info.primary_category_id,e.attr.merchant_info.secondary_category_id)),
n&&a&&(F=1),n&&!a&&(F=2),!n&&a&&(F=3),n||a||(F=4),4==F&&e.is_can_use_sns_card&&!e.is_can_use_help_make_and_send&&(F=5),
c(F);
}
}),!1);
}
function _(e,t){
var r=!1;
e.create_time&&e.create_time<1463648400&&(r=!0),"undefined"==typeof t&&(t=!0);
var n="",a=!1;
if(4==e.type||2==e.type){
if(t&&e.reduce_cost&&(n="价值%s元代金券一张".sprintf(e.reduce_cost)),r){
var p=n;
return p=p.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
e.use_condition_least_cost?(n&&(n+="，"),n+="消费满%s元可用".sprintf(e.use_condition_least_cost)):4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||(n&&(n+="；"),
n+="无最低消费限制"),e.accept_category&&(n&&(n+="；"),n+="适用于%s".sprintf(e.accept_category),
a=!0),e.reject_category&&(n&&(n+="；"),n+="不适用于%s".sprintf(e.reject_category),a=!0),
"1"!=e.is_sns_card&&e.is_sns_card!==!0||4!=e.type||a||(n&&(n+="；"),n+="全场通用，不限品类"),
!(4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||e.has_condition||"0"!=e.uncheckcount&&!e.id);
var p=n;
return p=p.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
if(3==e.type){
if(t&&(e.title||e.gift_title)&&(n="%s%s%s%s".sprintf("1"==e.is_sns_card||e.is_sns_card===!0?"兑换":"",e.gift_title||e.title,e.gift_num||"",e.gift_unit||"")),
r){
var p=n;
return p=p.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
2==e.use_condition_least_cost_type&&e.object_use_for&&(n&&(n+="；"),n+="购买%s可用".sprintf(e.object_use_for),
a=!0),1==e.use_condition_least_cost_type&&e.use_condition_least_cost&&(n&&(n+="，"),
n+="消费满%s元可用".sprintf(e.use_condition_least_cost),a=!0),"1"!=e.is_sns_card&&e.is_sns_card!==!0||a||(n&&(n+="；"),
n+="无最低消费限制");
var p=n;
return p=p.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
}
function s(e){
if(!e.begin_time||!e.end_time)return"";
var t="YYYY.MM.DD";
return l.unix(e.begin_time).format(t)+"-"+l.unix(e.end_time).format(t);
}
var o=e("common/wx/upload.js"),u=e("common/wx/Cgi.js"),l=e("biz_common/moment.js"),m={
10:"会员卡",
21:"门票",
22:"电影票",
4:"代金券",
1:"团购券",
2:"折扣券",
3:"兑换券",
0:"优惠券"
},f={
1:"审核中",
2:"未通过",
3:"待投放",
4:"已删除",
5:"待投放",
6:"已投放",
8:"已过期",
7:"违规下架"
},d={
MONDAY:"1",
TUESDAY:"2",
WEDNESDAY:"3",
THURSDAY:"4",
FRIDAY:"5",
SATURDAY:"6",
SUNDAY:"7"
};
template.helper("$has_day",function(e,t){
if(!e)return"";
for(var r=0;r<e.length;r++){
var n=d[e[r].type];
if(n||(n=8),n==t)return"checked";
}
return"";
});
var g={
1:"周一",
2:"周二",
3:"周三",
4:"周四",
5:"周五",
6:"周六",
7:"周日",
8:"节假日"
};
template.helper("convert_time_limit",function(e){
return t(e);
});
var h={
1:"免费WIFI",
2:"可带宠物",
4:"免费停车",
8:"可外卖"
};
template.helper("convert_business_service",function(e){
if(!e)return"无";
var t=[];
for(var r in h){
var n=parseInt(r);
(e&n)>0&&t.push(h[r]);
}
return t.join("&nbsp;&nbsp;");
});
var l=e("biz_common/moment.js");
template.helper("convert_state",function(e){
return f[e]||e;
}),template.helper("convert_type",function(e){
return m[e]||e;
}),template.helper("card_type_map",function(e){
return e;
}),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),l.unix(e).format(t);
}),template.helper("validtime",function(e,t){
if(1==e.time_type){
var r=l.unix(e.begin_time).format(t)+"至"+l.unix(e.end_time).format(t);
return e.end_time<l().unix()&&(r+="(已过期)"),r;
}
return 2==e.time_type?0==e.from_day?"领取后当天生效%s天有效".sprintf(e.fixed_term):"领取后%s天生效%s天有效".sprintf(e.from_day,e.fixed_term):"";
}),template.helper("addtoken",function(e){
var t=wx.url(e);
return t=t.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}),template.helper("nl2br",function(e){
return r(e.html(!0));
});
var v={
1:"50万以下",
2:"50-100万",
3:"100-500万",
4:"500-1000万",
5:"1000万以上"
};
template.helper("convert_business_volume_type",function(e){
return v[e]||e;
});
var y={
0:"已提交",
2:"已提交",
3:"生效",
4:"不通过"
};
template.helper("convert_store_state",function(e){
return y[e]||e;
}),template.helper("$preview",function(e){
if(!e)return"无";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=o.tmpFileUrl(e)):t=o.multimediaFileUrl(e),
"<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t,t);
}),template.helper("$upload_preview",function(e){
if(!e)return"";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=o.tmpFileUrl(e)):t=o.multimediaFileUrl(e),
"<img src='%s' style='width:260px;' />".sprintf(t);
}),template.helper("$preview_stuffs",function(e){
for(var t=[],r=e.stuffs,n=0;n<r.length;n++){
var a=r[n]+"_preview_tpl";
$("#"+a).length&&t.push(template.render(a,e));
}
return t.join("");
});
var x={
2:"女",
1:"男"
};
template.helper("convert_gender",function(e){
return x[e]||"未知";
}),template.helper("percentage",function(e,t,r,n){
var r=e/t*100;
return n&&r>n&&(r=n),r.toFixed(2);
});
var b={
"":"全部",
0:"API渠道",
1:"嵌入图文消息",
2:"直接群发卡券",
3:"下载二维码"
};
template.helper("convert_channel",function(e){
return b[e]||e;
}),template.helper("convert_provide_time",n),template.helper("http2https",function(e){
if(!e)return"";
var t=(e+"").http2https();
return t=t.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}),template.helper("https2http",function(e){
if(!e)return"";
var t=(e+"").https2http();
return t=t.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}),template.helper("codepad",function(e){
var t=new RegExp("([^s]{4})(?=([^s])+$)","ig"),r=e.replace(t,"$1-");
return r=r.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}),template.helper("yuan",function(e){
if(!e)return"--";
var e=e/100;
return e.toFixed(2);
}),template.helper("is_paycard",function(){
return window.wx_is_paycard;
});
var w={
0:"等待接收",
1:"已接收",
3:"过期退回",
2:"已拒绝"
},j={
0:"等待接收",
2:"已拒绝",
1:"已接收",
3:"过期退回"
};
template.helper("convert_intercard_status",function(e){
return w[e]||e;
}),template.helper("convert_intercard_rec_status",function(e){
return j[e]||e;
});
var Y={
0:"无",
1:"图文消息",
2:"卡券货架",
3:"小店货架",
4:"网页链接",
5:"卡券"
};
template.helper("convert_msg_operate_type",function(e){
return Y[e]||"无";
});
var k=e("cardticket/add/msg_operate_type_html.js"),u=e("common/wx/Cgi.js");
template.helper("msg_operate_content",function(e){
return 5===e._type?"":e._notexist?"无":template.compile(k[e._type])({
msg_operation:e
})||"";
});
var D={
CHECKING:"审核中",
APPROVED:"已通过",
REJECTED:"未通过",
EXPIRED:"已过期"
};
template.helper("convert_sub_merchant_status",function(e){
return D[e]||e;
}),template.helper("$is_can_use_help_make_and_send",function(){
return 1==window.wx_is_can_use_help_make_and_send;
}),template.helper("wx_url",function(e){
var t=wx.url(e);
return t=t.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
});
var q={
".*?_4":"激活"
};
template.helper("convert_use_source",function(e,t){
var r=e+"_"+t;
return 4==t?"激活":1==t||6==t||7==t?"自助买单":5==t?"自助核销":2==t?"收款":3==e?"手机核销":1==e?"网页核销":2==e?"API核销":3==t?"积分变更":q[r]||"";
}),template.helper("convert_fee_coin",function(e,t){
return 0==t?"--":a(e)?'<span class="number_add">+%s</span>'.sprintf(t/100):'<span class="number_degress">-%s</span>'.sprintf(t/100);
});
var A={
1:"平台赠送",
2:"充值",
3:"退还券点",
4:"支出",
5:"平台扣减"
};
template.helper("convert_fee_order_type",function(e){
return A[e]||e;
});
var E={
2:{
1:"等待确认",
2:"充值成功",
3:"充值成功",
8:"充值成功"
},
3:"已退券点",
4:{
1:"等待确认",
3:"库存发放中",
4:"库存已发放",
7:"库存添加失败, 已返还券点",
6:"库存已发放",
5:"库存已发放"
}
};
template.helper("convert_fee_order_status",function(e,t){
var r=E[t];
return r?"string"==typeof r?r:r[e]||e:e;
}),template.helper("addhttp",function(e){
var t=e;
return t=t.replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),
/^http:\/\//.test(e)?t:"http://"+t;
});
var F,I=[],C=!1,S=[];
template.helper("$fix_abstract4friendcard",function(e,t){
return _(e,t);
}),template.helper("$gen_use_time",function(e){
return s(e);
});
var U={
0:"生效",
1:"已使用",
2:"过期",
3:"转赠中",
4:"已转赠",
5:"转赠过期",
6:"已删除"
};
template.helper("convert_user_card_state",function(e){
return U[e]||e;
});
var M={
0:"审核通过",
1:"待商户审核",
2:"审核不通过",
3:"待激活",
4:"请添加库存"
};
return template.helper("convert_swipe_card_status",function(e){
return M[e]||e;
}),{
type_map:m,
status_map:f,
store_status:y,
gender_map:x,
source_map:b,
convert_provide_time:n,
nl2br:r,
sub_merchant_status_map:D,
fix_money:function(e){
var t=/(\.\d{2}).+$/,r=e;
return r=parseFloat((r+"").replace(t,"$1"));
},
parse_assistsend_quota:function(e,t){
for(var r=0,n=0,a=0;a<e.length;a++){
var p=e[a];
p.quota_name==(t||"merchant_auth_create_card")&&(r=p.value),p.quota_name==(t?t+"_max_sku":"merchant_auth_create_card_max_sku")&&(n=p.value);
}
return{
max_card:r,
max_sku:n
};
},
check_friend_card_word:function(e,t){
if(!e)return!0;
for(var r=0;r<I.length;r++)if(e.indexOf(I[r])>=0)return t?t():!0;
return!0;
},
check_assist_brand_name_type:i,
can_category_use_sns_card:p,
fix_abstract4friendcard:_,
strlen:function(e){
for(var t=0,r=0;r<e.length;r++){
var n=e.charCodeAt(r);
128>n?t++:t+=2;
}
return t;
},
gen_use_time:s,
gen_time_limit:t
};
});define("cardticket/store_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),o=t("common/wx/tooltips.js"),c=t("common/wx/tooltipsManager.js"),n=(t("common/wx/dialog.js"),
{
deleteStore:function(t){
e.post({
url:"/merchant/entityshop?action=delete",
data:{
id:t.store_id
},
btn:t.btn
},function(o){
0==o.base_resp.ret?(s.suc("删除门店成功"),t.success&&t.success()):e.show(o);
});
},
deleteWithConfirm:function(t){
if(3==t.state||4==t.state){
var e=new o({
container:t.container,
content:"删除将影响在用此门店的卡券功能、微信连Wi-Fi、摇一摇周边、LBS广告等相关业务。<br />你确定要删除吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
if(t.success){
var e=t.success;
t.success=function(){
e&&e(),c.removeAll();
};
}
n.deleteStore(t);
}
},{
text:"取消",
type:"btn_default",
click:function(){
c.removeAll();
}
}]
});
e.show(),c.removeAll(),c.add(e);
}
},
listStore:function(t){
var s=$.extend({},{
action:"list",
begin:0,
count:9999999,
keyword:t.keyword,
task_id:t.task_id,
audit_state:t.audit_state||3
},t.getDataExtra);
e.get({
url:"/merchant/entityshop",
data:s
},function(s){
var o,c=s?1*s.base_resp.ret:-1;
if(0===c){
var n=$.parseJSON(s.data);
o={
shop_list:n.store_location,
total_num:s.total_count,
is_from_wxapoi:"true"===s.is_from_wxapoi
};
}else{
if(-7!==c&&200007!==c)return void e.show(s);
o={
shop_list:[],
total_num:0,
access_deny:!0
};
}
t.success&&t.success(o),wx.cgiData&&!wx.cgiData._store_data&&(wx.cgiData._store_data=o);
});
},
canSendCard:function(t){
t.success&&t.success(!0);
}
});
return n;
});define("biz_web/ui/dropdown.js",["biz_web/widget/dropdown.css","tpl/biz_web/ui/dropdown.html.js"],function(e){
"use strict";
function t(e){
e.render&&(e.renderHtml="",$.each(e.data,function(t,a){
e.renderHtml+=e.render(a);
})),e=$.extend(!0,{},d,e);
var t=this;
t.container=$(e.container),t.container.addClass(e.search?o+" search":o),this.isDisabled=e.disabled,
e.disabled?t.container.addClass("disabled"):t.container.removeClass("disabled"),
t.opt=e,t.container.html(template.compile(n)(e)).find(".jsDropdownList").hide(),
t.bt=t.container.find(".jsDropdownBt"),t.dropdown=t.container.find(".jsDropdownList"),
$.each(e.data,function(e,a){
$.data(t.dropdown.find(".jsDropdownItem")[e],"value",a.value),$.data(t.dropdown.find(".jsDropdownItem")[e],"name",a.name),
$.data(t.dropdown.find(".jsDropdownItem")[e],"item",a);
}),"undefined"!=typeof e.index&&0!==e.data.length&&(t.bt.find(".jsBtLabel").html(e.data[e.index].name||e.label),
t.value=e.data[e.index].value),t.bt.on("click",function(n){
if(t.opt.fixConflict){
if($(n.target).parents(".jsDropdownList").length)return;
t.dropdown.hide();
}else a();
return e.disabled||(t.dropdown.show(),t.container.addClass("open")),!1;
}),e.search&&t.bt.find(".jsBtLabel").on("keyup input",function(a){
if(t.dropdown.find(".dropdown_data_list").scrollTop(0),!t.disabled){
var n=$(this);
if(13==a.keyCode)if(t.value){
if(e.is_mobilePrefix){
var d=n.data("name").indexOf("+"),o=n.data("name");
n.html(o.substr(d+1)).removeClass("error");
}else n.html(n.data("name")).removeClass("error");
t.dropdown.hide();
}else n.find("div").remove();else{
var i=n.html().trim(),r=[];
t.value=null,t.dropdown.show().find(".jsDropdownItem").each(function(){
var e=$(this);
e.hasClass("js_empty")||(e.data("name").toLowerCase().indexOf(i.toLowerCase())>-1?(e.parent().show(),
r.push({
name:e.data("name"),
value:e.data("value")
})):e.parent().hide());
}),0==r.length?0==t.dropdown.find(".js_empty").length&&t.dropdown.find(".dropdown_data_list").append('<li class="jsDropdownItem js_empty empty">未找到</li>'):(t.dropdown.find(".js_empty").remove(),
1==r.length&&(r[0].name==i?n.removeClass("error"):n.data("name",r[0].name),t.value=r[0].value));
}
e.keyupHandle&&e.keyupHandle(n.html().trim(),n);
}
}).on("blur",function(){
if(!t.disabled){
var a=$(this);
if(t.value?$(this).html()!=$(this).data("name")&&(a.addClass("error"),t.value=null):""!=a.html()?a.addClass("error"):(a.html(e.label).removeClass("error"),
t.value=null),e.blurHandle){
var n=e.blurHandle(a.html().trim());
n&&a.removeClass("error");
}
}
}).on("focus",function(){
if(!t.disabled){
var a=$(this),n=$(this).html().trim();
n==e.label&&a.html("").removeClass("error"),""==n&&a.removeClass("error"),t.dropdown.show(),
t.container.addClass("open");
}
}),$(document).on("click",function(e){
if(t.opt.fixConflict){
if($(e.target).parents(".jsDropdownList").length)return;
t.dropdown.hide();
}else a();
}),t.dropdown.on("click",".jsDropdownItem",function(){
if("disabled"==$(this).attr("disabled"))return!1;
var a=$(this).data("value"),n=$(this).data("name"),d=$(this).data("index"),o=$(this).parents(".jsDropdownList").siblings(".jsDropdownBt").find(".jsBtLabel").attr("data-value");
if((!t.value||t.value&&t.value!=a)&&(t.value=a,t.name=n,e.callback&&"function"==typeof e.callback)){
var i=e.callback(a,n,d,$(this).data("item"),o)||n,r=$(this).data("value");
e.search?t.bt.find(".jsBtLabel").html(i).data("name",i).removeClass("error"):t.bt.find(".jsBtLabel").attr("data-value",r).html(i);
}
t.dropdown.hide();
});
}
function a(){
$(".jsDropdownList").hide(),$(".dropdown_menu").each(function(){
!$(this).hasClass("dropdown_checkbox")&&$(this).removeClass("open");
});
}
e("biz_web/widget/dropdown.css");
var n=e("tpl/biz_web/ui/dropdown.html.js"),d={
label:"请选择",
data:[],
callback:$.noop,
render:$.noop,
keyupHandle:$.noop,
delay:500,
disabled:!1,
search:!1,
is_mobilePrefix:!1,
blurHandle:$.noop,
fixConflict:!1
},o="dropdown_menu";
return t.prototype={
selected:function(e,t){
var a=this;
if("number"==typeof e){
if(this.opt.data&&this.opt.data[e]){
var n=this.opt.data[e].name,d=this.opt.data[e].value;
0==t||this.dropdown.find(".jsDropdownItem:eq("+e+")").trigger("click",d),this.bt.find(".jsBtLabel").html(n);
}
}else $.each(this.opt.data,function(n,o){
return e==o.value||e==o.name?(0==t||a.dropdown.find(".jsDropdownItem:eq("+n+")").trigger("click",d),
a.bt.find(".jsBtLabel").html(o.name),!1):void 0;
});
return this;
},
reset:function(){
return this.bt.find(".jsBtLabel").html(this.opt.label),this.value=null,this;
},
hidegreater:function(e){
var t=this;
return"number"==typeof e&&t.opt.data&&t.opt.data[e]&&(t.dropdown.find(".jsDropdownItem").show(),
t.dropdown.find(".jsDropdownItem:gt("+e+")").hide()),this;
},
destroy:function(){
return this.isDisabled&&this.container.removeClass("disabled"),this.container.children().remove(),
this.container.off(),this;
},
enable:function(){
return this.opt.disabled=!1,this.container.removeClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!0),
this;
},
disable:function(){
return this.opt.disabled=!0,this.container.addClass("disabled"),this.opt.search&&this.bt.find(".jsBtLabel").attr("contenteditable",!1),
this;
}
},t;
});define("tpl/top.html.js",[],function(){
return'<div class="weui-desktop-tab weui-desktop-tab_title">\n  <ul class="weui-desktop-tab__navs" data-index="{itemIndex=0}">\n    {each data as o index}\n    {if (typeof o.acl == "undefined" || o.acl == 1)}\n    <li data-index="{itemIndex++}" class="weui-desktop-tab__nav {if (itemIndex == 1)}first{/if} js_top {o.className}" data-id="{o.id}"><a title="{o.name}" href="{o.url}" {if o.target==\'_blank\'}target="_blank"{/if}>{o.name}</a></li>\n    {/if}\n    {/each}\n  </ul>\n</div>\n';
});function _defineProperty(e,t,n){
return t in e?Object.defineProperty(e,t,{
value:n,
enumerable:!0,
configurable:!0,
writable:!0
}):e[t]=n,e;
}
var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var n=arguments[t];
for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);
}
return e;
};
define("common/wx/media/img9.js",["tpl/media/appmsg_edit/image_article_content_9.html.js","common/qq/Class.js","media/media_dialog.js","common/qq/events.js"],function(e){
"use strict";
function t(e,t){
$(s).data("opt",$.extend(e,u)),console.log("update:"+$(s).data("opt")),e.length>=9?$("#imgAdd").hide():$("#imgAdd").show(),
1==e.length?($(".preview_media_context").addClass("no-hover"),$(".jsImgView").attr("draggable",!1)):($(".preview_media_context").removeClass("no-hover"),
$(".jsImgView").attr("draggable",!0)),o.trigger("img9DataChanged",e.map(function(e){
return e.url;
})),t(e);
}
function n(e){
var t=[];
return $(s).find(".jsImgView").each(function(n,i){
var a=$(i).data("id");
e.forEach(function(e){
e.seq==a&&t.push(e);
});
}),t;
}
var i=(wx.T,e("tpl/media/appmsg_edit/image_article_content_9.html.js")),a=e("common/qq/Class.js"),r=e("media/media_dialog.js").getFile,o=e("common/qq/events.js")(!0),s="",d=!0,c=function(){},g=!1,l=null,m=0,u={},f=[],v=a.declare({
init:function(e,a){
function v(e,t){
p=!0;
var n=$(s).find(".jsImgView"),i=n.map(function(e,t){
return _defineProperty({},t.dataset.id,t.getBoundingClientRect().toJSON());
}).toArray().reduce(function(e,t){
return _extends(e,t);
},{});
t();
var a=n.map(function(e,t){
return _defineProperty({},t.dataset.id,t.getBoundingClientRect().toJSON());
}).toArray().reduce(function(e,t){
return _extends(e,t);
},{}),r=300,o=50,d=-1;
n.each(function(t,n){
var s=n.dataset.id,c=i[s],g=a[s];
if(c.x!==g.x||c.y!==g.y){
var m=$(n).is(l);
m?(c.x=w.box.x+e.originalEvent.x-w.x,c.y=w.box.y+e.originalEvent.y-w.y,$(n).css({
"z-index":"10000"
})):d++,$(n).css({
transform:"translate3d("+(c.x-g.x)+"px, "+(c.y-g.y)+"px, 0)"
}),function(e){
requestAnimationFrame(function(){
$(n).addClass("animation-acting"),$(n).css({
transform:"",
"transition-delay":(m?0:o/1e3*e)+"s"
}),setTimeout(function(){
$(n).removeClass("animation-acting"),$(n).css("transition-delay","");
},m?r:r+o*e);
});
}(d),setTimeout(function(){
p=!1,$(l).css("z-index","");
},r+o*d);
}
});
}
function h(e){
var t=l.context.getBoundingClientRect(),n=e.getBoundingClientRect();
return t.y>n.y?!0:t.y<n.y?!1:t.x>n.x;
}
if(u={
hasRecommend:e.hasRecommend,
container:e.container,
append:e.append,
recommendEditor:e.recommendEditor
},e&&e.container){
s=e.container,d=!!e.append;
var p=!1;
a&&"function"==typeof a&&(c=a),e.forEach(function(e){
e.seq=e.file_id+"_"+(new Date).getTime(),e.url||(e.url="/cgi-bin/getimgdata?token="+wx.data.t+"&msgid="+e.msgid+"&mode=small&source="+e.source+"&fileId="+e.file_id+"&ow="+~e.fakeid);
var t=void 0;
t=new Image,t.onload=function(){
e.width=t.width,e.height=t.height,t=null;
},t.src=e.url;
});
if(f=e,console.log("init:"+f.length),d?$(s).append('<div data-type="2" class="js_previe_media_box">'+wx.T(i,{
share_imageinfo:f
})+"</div>").show():$(s).html(wx.T(i,{
share_imageinfo:f
})+"</div>").show(),t(f,c),!g){
$(s).on("click",".jsImgDel",function(e){
var n=$(this).data("id");
f=f.filter(function(e){
return e.seq==n?!1:e;
}),$(this).parent().remove(),t(f,c),e.stopPropagation();
}),$(s).on("click",".jsImgView",function(){
var e=$(this).data("id");
f.forEach(function(t,n){
return t.seq==e?(o.trigger("img9DataSelected",n),!1):void 0;
});
}),$(s).on("click","#imgAdd",function(){
console.log("imgAdd:"+f.length),r({
type:2,
begin:0,
count:10,
maxselect:9-f.length,
onSelect:function(e,n){
n instanceof Array||(n=[n]),n.forEach(function(e){
e.seq=e.file_id+"_"+(new Date).getTime(),e.url||(e.url="/cgi-bin/getimgdata?token="+wx.data.t+"&msgid="+e.msgid+"&mode=small&source="+e.source+"&fileId="+e.file_id+"&ow="+~e.fakeid);
var t=void 0;
t=new Image,t.src=e.url,t.onload=function(){
e.width=t.width,e.height=t.height,t=null;
};
}),console.log("imgAddback:"+f.length),f=f.concat(n),d?$(s).find(".js_previe_media_box").html(wx.T(i,{
share_imageinfo:f
})):$(s).html(wx.T(i,{
share_imageinfo:f
})),t(f,c);
}
});
});
var w=void 0;
$(s).on("dragstart",".jsImgView",function(e){
return p?(setTimeout(function(){
p=!1;
},750),void e.preventDefault()):(m=e.originalEvent.clientX,l=$(this),w={
x:e.originalEvent.clientX,
y:e.originalEvent.clientY,
box:e.target.getBoundingClientRect()
},e.target.classList.add("dragging"),requestAnimationFrame(function(){
e.target.classList.add("back");
}),e.originalEvent.dataTransfer.effectAllowed="move",void(e.originalEvent.target.style.cursor="grabbing"));
}),$(s).on("dragover",".jsImgView",function(e){
$(e.currentTarget).is(l)?$(e.currentTarget).removeClass("hover").removeClass("before").removeClass("after"):$(e.currentTarget).addClass(h(e.currentTarget)?"hover before":"hover after"),
e.preventDefault(),e.originalEvent.dataTransfer.dropEffect="move";
}),$(s).on("dragleave",".jsImgView",function(e){
$(e.currentTarget).removeClass("hover").removeClass("before").removeClass("after");
}),$(s).on("dragend",".jsImgView",function(e){
$(s).find(".jsImgView").removeClass("hover"),l.removeClass("dragging").removeClass("back"),
e.originalEvent.target.style.cursor="";
}),$(s).on("drop",".jsImgView",function(e){
var i=this;
$(s).find(".jsImgView").removeClass("hover").removeClass("before").removeClass("after"),
l.removeClass("dragging").removeClass("back"),e.preventDefault(),l!=$(this)&&(h(e.currentTarget)?v(e,function(){
$(i).before(l);
}):v(e,function(){
$(i).after(l);
}),f=n(f),t(f,c),m=0);
}),g=!0;
}
}
},
getData:function(){
return this.data;
}
});
return v;
});define("tpl/media/appmsg_edit/image_article_content_9.html.js",[],function(){
return'<div class="preview_media_context preview_media_context_9">\n  {each share_imageinfo as d i}\n  <div class="preview_img_context jsImgView" data-id="{d.seq}">\n    {if d.url}\n    <!-- <img class="preview_img" src="{d.cdn_url}" alt=""> -->\n    <i class="preview_sized_img" style="background-image: url(\'{d.url}\')"></i>\n    {else}\n    <!-- <img class="preview_img" src="http://shp.qpic.cn/qqvideo/0/m0564d1uhq6/400" alt=""> -->\n    <i class="preview_sized_img" style="background-image: url(\'empty_image\')"></i>\n    {/if}\n    <button class="preview_media_remove_btn jsImgDel" data-id="{d.seq}">\n      <svg width="14px" height="16px" viewBox="0 0 14 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n          <g transform="translate(-9.000000, -8.000000)" fill="#9B9B9B">\n            <path d="M9.875,12.4444441 C9.38864562,12.4440384 9,12.0555515 9,11.5763872 L9,11.5347239 C9,11.0612132 9.39209232,10.6666667 9.8757627,10.6666667 L22.1242373,10.6666667 C22.610948,10.6666667 23,11.0553091 23,11.5347239 L23,11.5763872 C23,12.049649 22.6083198,12.4440296 22.125,12.4444441 L22.125,23.125 C22.125,23.6082492 21.7332492,24 21.25,24 L10.75,24 C10.2667508,24 9.875,23.6082492 9.875,23.125 L9.875,12.4444441 Z M20.375,12.4444444 L11.625,12.4444444 L11.625,22.2222222 L20.375,22.2222222 L20.375,12.4444444 Z M14.2419307,8 L17.7580693,8 C18.2303967,8 18.625,8.38864247 18.625,8.86805725 L18.625,9.77777778 L13.375,9.77777778 L13.375,8.86805725 C13.375,8.39454651 13.7631381,8 14.2419307,8 Z M17.75,14.2222222 C18.2366183,14.2222222 18.625,14.6126128 18.625,15.094184 L18.625,20.4613715 C18.625,20.9510091 18.2332492,21.3333333 17.75,21.3333333 C17.2633817,21.3333333 16.875,20.9429427 16.875,20.4613715 L16.875,15.094184 C16.875,14.6045464 17.2667508,14.2222222 17.75,14.2222222 Z M14.25,14.2222222 C14.7366183,14.2222222 15.125,14.6126128 15.125,15.094184 L15.125,20.4613715 C15.125,20.9510091 14.7332492,21.3333333 14.25,21.3333333 C13.7633817,21.3333333 13.375,20.9429427 13.375,20.4613715 L13.375,15.094184 C13.375,14.6045464 13.7667508,14.2222222 14.25,14.2222222 Z"></path>\n          </g>\n        </g>\n      </svg>\n      <div class="preview_img_change_popover weui-desktop-tooltip">删除</div>\n    </button>\n    <div class="preview_img_change_hint" style="opacity: 1">拖拽调整图片顺序</div>\n  </div>\n  {/each}\n  <div class="add_img" id="imgAdd" {if share_imageinfo.length>=9} style="display:none" {/if}>\n    <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g transform="translate(-826.000000, -731.000000)" fill="#D8D8D8">\n          <g transform="translate(746.000000, 668.000000)">\n            <g transform="translate(72.000000, 63.000000)">\n              <path d="M26,18 L26,0 L30,0 L30,18 L48,18 L48,22 L30,22 L30,40 L26,40 L26,22 L8,22 L8,18 L26,18 Z"></path>\n            </g>\n          </g>\n        </g>\n      </g>\n    </svg>\n    <span>添加图片</span>\n</div>\n</div>';
});define("common/wx/media/audio.js",["biz_web/lib/soundmanager2.js","tpl/media/audio.html.js","js/tpl/mpEditor/plugin/audio_card.html.js","tpl/media/qqmusicaudio.html.js","widget/media.css","common/qq/Class.js","biz_common/moment.js"],function(i,t,s){
"use strict";
var e=wx.T,o=i("biz_web/lib/soundmanager2.js"),n=i("tpl/media/audio.html.js"),d=i("js/tpl/mpEditor/plugin/audio_card.html.js"),l=i("tpl/media/qqmusicaudio.html.js"),a=(i("widget/media.css"),
i("common/qq/Class.js")),u=(i("biz_common/moment.js"),null),r=null,h="wxAudioPlaying",m=function(){
r=o,r.setup({
url:"/mpres/zh_CN/htmledition/plprecorder/biz_web/",
preferFlash:!1,
debugMode:!1
});
};
$(window).load(function(){
m();
});
var c={
id:"",
source:"",
file_id:""
},p=a.declare({
init:function(i){
var t=this;
$.extend(!0,t,c,i),this.soundId=this.id||this.file_id,this.title=this.title||this.name,
this.timer=null,"undefined"==typeof this.play_length||0==this.play_length?this.play_length="未知时长":(this.playLengthOfSeconds=this.play_length/1e3,
this.play_length=this.duration);
var s;
this.qqmusictpl?s=$(e(l,t)):this.shareTpl?(t.isAudioType=!0,t.share_voiceinfo=[{
title:t.title,
duration:t.play_length,
audioId:i.audioId,
hasTopic:i.hasTopic,
topicId:i.topicId,
topicName:i.topicName
}],h="weui-audio-btn_playing",s=$('<div data-type="3" class="js_previe_media_box"></div>').html(e(d,t))):s=$(e(n,t)),
t.dom=$(i.selector).append(s).data("opt",i),s.click(function(i){
var s=$(i.target);
(!t.isAudioType||s.hasClass("js_toggle_playing"))&&t.toggle();
}),setTimeout(function(){
$(".js_title").attr("readonly",!0),$(".js_title").prop("readonly",!0);
});
},
getAudioURL:function(){
if(this.qqmusicurl)return this.qqmusicurl;
var i=this.source,t=this.id,s=this.file_id;
return i&&(i="&source="+i),wx.url(this.voice_encode_fileid?"https://res.wx.qq.com/voice/getvoice?mediaid="+this.voice_encode_fileid:"/cgi-bin/getvoicedata?msgid={id}&fileid={fileid}{source}".format({
id:t,
fileid:s,
source:i
}));
},
isPlaying:function(){
return null!=u&&this==u;
},
toggle:function(){
this.isPlaying()?this.stop():(u&&u.stop(),this.play());
},
play:function(i){
var t=this;
if(!this.isPlaying()){
var s=$(t.dom).find(".js_toggle_playing"),e=$(t.dom).find(".js_audio_progress"),o=$(t.dom).find(".js_audio_progress_container");
!!u&&s.removeClass(h),s.addClass(h);
var n=Date.now(),d=function l(){
clearTimeout(t.timer);
var i=Math.floor((Date.now()-n)/1e3),s=o.width(),d=Math.round(s/t.playLengthOfSeconds)*i;
e.css("width",d),t.timer=setTimeout(l,1e3);
};
t.timer=setTimeout(d,1e3),u=this,this.sound||(!r&&m(),this.sound=r.createSound({
id:t.soundId,
url:t.getAudioURL(),
onfinish:function(){
u&&(s.removeClass(h),e.css("width",0),clearTimeout(t.timer),u=null);
},
onload:function(i){
i||r.unload(t.soundId),!i&&u&&(s.removeClass(h),e.css("width",0),clearTimeout(t.timer),
u.sound=null,u=null);
},
onstop:function(){
s.removeClass(h),e.css("width",0),clearTimeout(t.timer);
}
})),r.play(this.soundId),i&&i(this);
}
},
stop:function(i){
this.isPlaying()&&(u=null,$(this.dom).find(".js_toggle_playing").removeClass(h),
$(this.dom).find(".js_audio_progress").css("width",0),clearTimeout(this.timer),r.stop(this.soundId),
i&&i(this));
},
stopAll:function(i){
u=null,r.stopAll(),i&&i(this);
},
stopCur:function(i){
u&&u.soundId&&r.stop(u.soundId),u=null,i&&i(this);
}
});
s.exports=p;
});define("tpl/media/appmsg_edit/video_article_content.html.js",[],function(){
return'{each share_videoinfo as d}\n<div class="preview_media_context">\n  <div class="preview_video_context">\n    {if status==0||status==10}\n    <div id="vTxt" class="preview_video_status"><div>视频审核中，可继续编辑其他信息</div></div>\n    {else if status==4}\n    <div id="vTxt" class="preview_video_status"><div>视频转码中，转码完成后将进入审核</div></div>\n    {else if status==2}\n    <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc">视频审核不通过，请更换素材或前往<a href=\'/cgi-bin/appmsg?begin=0&count=10&action=list_video&&type=15\' target=\'_blank\'>素材库</a>查看详情</div></div>\n    {else if status==3}\n    {else if status==5}\n    <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc">视频转码失败，请更换素材或前往<a href=\'/cgi-bin/appmsg?begin=0&count=10&action=list_video&&type=15\' target=\'_blank\'>素材库</a>查看详情</div></div>\n    {else if status==6}\n      {if video_ori_status == 2 }\n      <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc">该视频已被他人先声明原创，将按照转载样式群发，可前往<a href=\'/cgi-bin/appmsg?begin=0&count=10&action=list_video&&type=15\' target=\'_blank\'>素材库</a>查看详情</div></div>\n      {else}\n      <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc">该视频声明原创失败，群发将不带原创标识，可前往<a href=\'/cgi-bin/appmsg?begin=0&count=10&action=list_video&&type=15\' target=\'_blank\'>素材库</a>查看详情</div></div>\n      {/if}\n    {else if status==7}\n    <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc">该视频已被他人先声明原创，将按照转载样式群发，可前往<a href=\'/cgi-bin/appmsg?begin=0&count=10&action=list_video&&type=15\' target=\'_blank\'>素材库</a>查看详情</div></div>\n    {else if status==11}\n    <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc">因源视频被删除，导致转载视频无法播放，请更换视频素材。</div></div>\n    {else if status==12}\n    <div id="vTxt" class="preview_video_status"><i class="preview_video_status_warn_icon"></i><div class="preview_video_status_desc"> 因源视频被取消原创，导致转载视频无法播放，请更换视频素材。</div></div>\n    {/if}\n    <div class="js_preview_hd preview_video_hd" style="background-image: url(\'{d.cover}\');">\n      <i class="js_preview_video_play preview_video_length">{d.duration}</i>\n    </div>\n    {if d.title!=\'\'}\n    <div class="preview_video_ft">\n      <strong class="preview_video_title">{d.title}</strong>\n    </div>\n    {/if}\n    <div class="preview_media_opr weui-desktop-link-group">\n      <div class="weui-desktop-tooltip__wrp weui-desktop-link">\n        <button class="js_replace_media weui-desktop-circle-btn">\n          <svg xmlns="http://www.w3.org/2000/svg" width="16.001" height="13.597" viewBox="0 0 16.001 13.597">\n            <path fill="#9A9A9A" fill-rule="evenodd" d="M3.531 3.799h12.47v1.5H.5a.5.5 0 0 1-.33-.876L5.103.099a.4.4 0 0 1 .594.527L3.531 3.799zm8.939 6H0v-1.5h15.501a.5.5 0 0 1 .33.876l-4.933 4.323a.4.4 0 0 1-.594-.526l2.166-3.173z"/>\n          </svg>\n        </button>\n\n        <span class="weui-desktop-tooltip weui-desktop-tooltip__down-center">替换素材</span>\n      </div>\n    </div>\n  </div>\n</div>\n{/each}\n';
});define("tpl/media/appmsg_edit/share_article_content.html.js",[],function(){
return'<div class="share_media">\n    <div class="original_panel" lang="en">\n        <div class="flex_context original_account">\n            <div class="js_head_img flex_hd">\n                <span class="radius_avatar original_account_avatar">\n                    <img class="account_avatar" src="{copyright_headimg}" alt="{copyright_nickname}">\n                </span>\n            </div>\n            <div class="flex_bd">\n                <div class="original_account_nickname">{copyright_nickname}</div>\n            </div>\n        </div>\n        <div class="original_panel_title">{source_title}</div>\n        <div class="original_panel_content">{=content}</div>\n        <div class="original_panel_tool">\n            <a target="_blank" href="{share_copyright_url}">阅读全文</a>\n        </div>\n    </div>\n</div>';
});define("common/wx/media/shareCopyrightDialog.js",["biz_web/ui/checkbox.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/popover.js","biz_web/ui/dropdown.js","tpl/media/sharecopyright_dialog.html.js","tpl/media/sharecopyright_item.html.js","tpl/media/sharecopyright_card.html.js","tpl/media/reprint_tips_popover.html.js","common/wx/media/chooseOriArticlePubPopover.js","common/wx/media/reprintArticleData.js"],function(e){
"use strict";
e("biz_web/ui/checkbox.js");
var t=e("common/wx/Cgi.js"),a=e("common/wx/Tips.js"),i=(e("common/wx/popup.js"),
e("common/wx/popover.js")),r=(e("biz_web/ui/dropdown.js"),e("tpl/media/sharecopyright_dialog.html.js")),n=e("tpl/media/sharecopyright_item.html.js"),l=e("tpl/media/sharecopyright_card.html.js"),o=e("tpl/media/reprint_tips_popover.html.js"),c=e("common/wx/media/chooseOriArticlePubPopover.js"),s=e("common/wx/media/reprintArticleData.js"),d=(template.render,
function(e){
return new p(e);
}),p=function(e){
this.options=e,this._g={
perPage:10,
page:{
article:0,
biz:0,
bizArticle:0,
search:0
},
type:"article",
curData:{
article:[],
bizArticle:[],
search:[]
},
selectedIndex:{
article:null,
bizArticle:null,
search:null
},
loading:{
article:!1,
biz:!1,
bizArticle:!1,
search:!1
},
searchKey:"",
allowReprint:0,
isBizDataReady:!1,
isBizDataEnd:!1,
alreadyReprintIdx:-1,
showTypeAreaTimer:null
},this.events=[],h.init.call(this);
},h={
init:function(){
var e=this,t=e._g,i=e.options=$.extend(!0,{
dialogTpl:r,
itemTpl:n,
cardTpl:l,
className:"share_article_dialog",
title:"转载图文",
onOK:null,
onCancel:null
},e.options);
i.dialogTpl=template.compile(i.dialogTpl)(i),e.on("ok",function(){
var e=t.type,r=t.curData[e],n=t.selectedIndex[e];
return null!==n&&r[n]?("function"==typeof i.onOK&&(r[n].pubType=1*$(t.dom["$"+e+"Content"].find(".js_selected_radio").get(n)).data("pub"),
i.onOK.call(this,r[n])),this.destroy(),void(this.dialog=null)):void a.err("请选择原创图文");
}),e.on("cancel",function(){
this.destroy(),"function"==typeof i.onCancel&&i.onCancel.call(this),this.dialog=null;
}),e.dialog=$(i.dialogTpl.trim()).popup({
title:i.title,
className:"share_article_dialog",
width:900,
autoShow:!0,
buttons:[{
text:"确定",
type:"disabled",
click:function(){
e._g.dom.$ok.hasClass("btn_disabled")||e.trigger("ok");
}
},{
text:"取消",
click:function(){
e.trigger("cancel");
}
}],
onHide:function(){}
});
var o=e.dialog.popup("get");
t.dom={
$dialogDom:o,
$ok:o.find(".js_btn_p").eq(0),
$page1:o.find(".js_page1"),
$page2:o.find(".js_page2"),
$searchInput:o.find(".js_search_input"),
$searchBtn:o.find(".js_search_btn"),
$searchDel:o.find(".js_search_del"),
$searchTips:o.find(".js_search_tips"),
$searchWording:o.find(".js_search_wording"),
$tipsMain:o.find(".js_tips_main"),
$loading:o.find(".js_loading"),
$typeArea:o.find(".js_type_area"),
$articleArea:o.find(".js_article_area"),
$articleContent:o.find(".js_article_content"),
$bizArea:o.find(".js_biz_area"),
$bizArticleArea:o.find(".js_biz_article_area"),
$bizArticleContent:o.find(".js_biz_article_content"),
$searchArea:o.find(".js_search_area"),
$searchContent:o.find(".js_search_content"),
$adArea:o.find("#js_open_ad_reprint_area"),
$checkbox:o.find("#js_open_ad_reprint_checkbox"),
$agreeArea:o.find("#js_agree_area"),
$agreeCheckbox:o.find("#js_agree")
},t.dom.$loading1=t.dom.$page1.find(".js_loading"),t.dom.$loading2=t.dom.$page2.find(".js_loading"),
t.dom.$cardTitle=t.dom.$page2.find(".js_card_title"),t.dom.$cardWhitelist=t.dom.$page2.find(".js_card_whitelist"),
t.dom.$ok.addClass("btn_primary"),h.getData.call(e,{
type:"article"
}),h.initEvent.call(e);
},
initEvent:function(){
{
var e=this,t=this._g,a=t.dom;
this.options;
}
a.$searchBtn.click(function(){
var i=a.$searchInput.val().trim();
i&&(t.showTypeAreaTimer?(clearTimeout(t.showTypeAreaTimer),t.showTypeAreaTimer=null):(a.$searchWording.show(),
a.$typeArea.hide(),a.$articleArea.hide(),a.$bizArea.hide(),a.$bizArticleArea.hide()),
a.$searchTips.text(""),h.getSearchData.call(e,{
type:"search",
val:i,
allowReprint:t.allowReprint
}));
}),a.$searchInput.on("focus",function(){
"search"!==t.type&&(a.$searchWording.show(),a.$typeArea.hide(),a.$articleArea.hide(),
a.$bizArea.hide());
}),a.$searchInput.on("blur",function(){
"search"!==t.type?t.showTypeAreaTimer=setTimeout(function(){
a.$searchWording.hide(),a.$typeArea.show(),a["$"+t.type+"Area"].show(),t.showTypeAreaTimer=null;
},200):""===a.$searchInput.val().trim()&&(a.$searchArea[0].scrollTop=0,h.goTable.call(e,"article"));
}),a.$searchInput.keydown(function(e){
var t=e.keyCode||e.which||0;
13==t&&e.preventDefault();
}),a.$searchInput.keyup(function(i){
var r=a.$searchInput.val().trim();
r?(a.$searchDel.show(),a.$searchTips.text(""),a.$tipsMain.hide()):h.resetSearch.call(e);
var n=i.keyCode||i.which||0;
13==n&&r&&h.getSearchData.call(e,{
type:"search",
val:r,
allowReprint:t.allowReprint
});
}),a.$searchDel.click(function(){
h.resetSearch.call(e),a.$searchArea[0].scrollTop=0,"search"===t.type&&h.goTable.call(e,"article");
}),a.$typeArea.click(function(i){
var r=$(i.target);
if(r.hasClass("js_type_item")){
var n=r.data("type");
a.$typeArea.find(".js_type_item").removeClass("active"),r.addClass("active"),h.goTable.call(e,n),
"biz"!==n||t.isBizDataReady||(t.isBizDataReady="loading",a.$bizArea.hide(),h.showLoading.call(e,n),
h.getData.call(e,{
type:n
}));
}
});
var i=function(a){
return function(i){
var r=$(i.target);
r.parents(".js_choosePublishWay").length&&(r=r.parents(".js_choosePublishWay")),
r.hasClass("js_choosePublishWay")&&r.hasClass("js_enable")&&(c({
type:"initiative",
arrowPos:"right",
target:r,
textDom:r.find(".js_publishWayText"),
grayDom:r.siblings(".js_gray"),
value:1*r.data("pub"),
sourceReprintStatus:r.data("source_reprint_status"),
openAdReprintStatus:r.data("open_ad_reprint_status"),
isPay:r.data("is_pay"),
change:function(a,i,n){
var l=r.data("pub",a).parents("tr").find(".js_selected_radio"),o=l.data("index"),c=t.selectedIndex[t.type];
if(l.data("pub",a),0===a)switch(i){
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY":
case"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY":
c===o&&h.changeSubmitBtnText.call(e,"转载"),"EN_CAN_OPEN_AD_REPRINT"===n&&(h.showAdArea.call(e,o),
h.hideAgreeArea.call(e));
break;

case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE":
case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE":
c===o&&h.changeSubmitBtnText.call(e,"转载"),h.hideAdArea.call(e,o),h.showAgreeArea.call(e);
}else c===o&&h.changeSubmitBtnText.call(e,"分享"),h.hideAdArea.call(e,o),h.hideAgreeArea.call(e);
h.setSubmitBtnStatus.call(e,!1,a);
}
}),h.scrollToSee.call(e,r[0],a[0],"top",!0));
};
};
a.$articleContent.click(i(a.$articleArea)),a.$bizArticleContent.click(i(a.$bizArticleArea)),
a.$searchContent.click(i(a.$searchArea));
var r=function(a){
return function(i){
if(!t.loading[a]){
var r=$(i.currentTarget);
if("none"!==r[0].style.display){
var n=r.find(".js_load_more");
if(n.length&&("biz"!==a||!t.isBizDataEnd)&&h.reachEnd.call(e,n[0],r[0],"vertical")){
t.loading[a]=!0;
var l={
mode:"append",
type:a
};
switch(a){
case"bizArticle":
l.biz=n.data("biz"),l.nickname=n.data("nickname"),l.headImgUrl=n.data("head_img_url");
break;

case"search":
l.allowReprint=n.data("allow_reprint");
}
h.getData.call(e,l);
}
}
}
};
};
a.$articleArea.on("scroll",r("article")),a.$bizArea.on("scroll",r("biz")),a.$bizArticleArea.on("scroll",r("bizArticle")),
a.$searchArea.on("scroll",r("search")),a.$bizArea.click(function(i){
var r=$(i.target);
if(r.hasClass("js_go_page2")||(r=r.parents(".js_go_page2")),0!==r.length){
var n=r.data("nickname"),l=r.data("head_img_url");
a.$cardTitle.html(n),a.$cardWhitelist.html(function(e,t,a){
var i=[];
return e&&i.push("可修改图文"),a&&i.push("可不显示转载来源"),i.join("；");
}(r.data("can_modify"),r.data("can_reward"),r.data("can_hide_source"))),h.goTable.call(e,"bizArticle"),
h.getData.call(e,{
type:t.type,
biz:r.data("biz"),
nickname:n,
headImgUrl:l
});
}
}),a.$dialogDom.find(".js_go_page1").click(function(){
a.$bizArticleArea[0].scrollTop=0,h.goTable.call(e,"biz");
});
},
resetSearch:function(){
var e=this._g,t=e.dom;
t.$searchInput.val(""),t.$searchDel.hide(),t.$searchTips.text(""),t.$tipsMain.hide();
},
disableSubmitBtn:function(){
this._g.dom.$ok.disable().find("button").text("确定");
},
setSubmitBtnStatus:function(e,t){
var a=this._g;
e=e||a.dom.$agreeCheckbox.prop("checked"),null!==a.selectedIndex[a.type]?1===t?this._g.dom.$ok.enable():e?this._g.dom.$ok.enable():this._g.dom.$ok.disable():h.disableSubmitBtn.call(this);
},
changeSubmitBtnText:function(e){
this._g.dom.$ok.find("button").text("string"==typeof e?e:0===e?"转载":"分享");
},
initSelected:function(e,t){
"article"===e&&null!==t&&this._g.dom["$"+e+"Area"].find(".js_selected_radio").get(t).click();
},
goTable:function(e,t){
var a=this._g,i=a.dom;
switch(a.type=e,h.disableSubmitBtn.call(this),h.hideAgreeArea.call(this),h.initSelected.call(this,e,a.selectedIndex[e]),
e){
case"article":
i.$typeArea.show(),i.$articleArea.show(),i.$bizArea.hide(),i.$searchArea.hide(),
i.$bizArticleArea.hide(),i.$page1.show(),i.$page2.hide(),i.$searchWording.hide();
break;

case"biz":
i.$typeArea.show(),i.$articleArea.hide(),i.$bizArea.show(),i.$searchArea.hide(),
i.$bizArticleArea.hide(),i.$page1.show(),i.$page2.hide(),i.$searchWording.hide();
break;

case"bizArticle":
i.$typeArea.hide(),i.$articleArea.hide(),i.$bizArea.hide(),i.$searchArea.hide(),
i.$bizArticleArea[t?"show":"hide"](),i.$page1.hide(),i.$page2.show();
break;

case"search":
i.$typeArea.hide(),i.$articleArea.hide(),i.$bizArea.hide(),i.$searchArea[t?"show":"hide"](),
i.$bizArticleArea.hide(),i.$page1.show(),i.$page2.hide();
}
},
checkLoading:function(){
return this._g.gettingData;
},
showLoading:function(e){
var t=this._g,a=t.dom;
t.gettingData=!0,a["$loading"+("bizArticle"===e?"2":"1")].show();
},
hideLoading:function(e){
var t=this._g,a=t.dom;
t.gettingData=!1,a["$loading"+("bizArticle"===e?"2":"1")].hide();
},
getSearchData:function(e){
var t=this,a=(t.options,t._g),i=a.dom;
if(h.checkLoading.call(t)!==!0){
if(!/mp\.weixin\.qq\.com/.test(e.val)&&h.getByteLen.call(t,e.val)>160)return void h.renderArticle.call(t,{
code:-1,
msg:"输入文字超长，请保持在40个汉字字符以内"
});
i.$adArea.hide(),i.$searchArea[0].scrollTop=0,a.searchKey=e.val,h.goTable.call(t,"search"),
h.getData.call(t,e);
}
},
getData:function(e){
{
var a=this,i=a._g,r="/cgi-bin/operate_appmsg?sub=",n={};
i.dom;
}
switch("append"!==e.mode&&(i.page[e.type]=0,i.selectedIndex[e.type]=null,h.showLoading.call(a,e.type)),
e.type){
case"search":
r+="check_appmsg_copyright_stat",n={
url:i.searchKey,
allow_reprint:e.allowReprint,
begin:i.page.search,
count:i.perPage
};
break;

case"article":
r+="can_reprint_article_list",n={
begin:i.page.article,
count:i.perPage
};
break;

case"biz":
r+="can_reprint_biz_list",n={
begin:i.page.biz,
count:i.perPage
};
break;

case"bizArticle":
r+="biz_ori_list",n={
biz:e.biz,
begin:i.page.bizArticle,
count:i.perPage
};
}
var l={
mode:e.mode,
type:e.type,
allowReprint:e.allowReprint,
biz:e.biz,
nickname:e.nickname,
headImgUrl:e.headImgUrl
};
t.post({
url:r,
data:n,
mask:!1
},{
done:function(t){
if("biz"!==e.type){
var r="";
if(t&&t.base_resp){
if(0==t.base_resp.ret){
if("bizArticle"===e.type&&t.list)for(var n=0,o=t.list.length;o>n;n++)t.list[n].nickname=e.nickname,
t.list[n].head_img_url=e.headImgUrl;
return h.renderArticle.call(a,$.extend(l,{
code:0,
list:t.list||[],
total:1*t.total,
openAdReprintStatus:"EN_ALREADY_OPEN_AD_REPRINT"
})),void(i.page[e.type]+=t.list.length);
}
switch(1*t.base_resp.ret){
case 64701:
r="不是有效的公众号原创图文链接";
break;

case 200013:
r="你的操作太频繁，请稍后再试";
break;

default:
r="系统繁忙，请稍后再试";
}
return void h.renderArticle.call(a,$.extend(l,{
code:-1,
msg:r
}));
}
return void h.renderArticle.call(a,$.extend(l,{
code:-1
}));
}
h.renderBiz.call(a,$.extend(l,{
data:t.list||[],
total:1*t.total,
ret:t.base_resp.ret
})),i.page.biz+=t.list.length;
},
fail:function(){
"biz"===e.type?h.renderBiz.call(a,{
ret:-1
}):(h.hideLoading.call(a,e.type),h.renderArticle.call(a,$.extend(l,{
code:-1
})));
}
});
},
renderBiz:function(e){
var t=this._g;
t.loading.biz=!1,t.isBizDataReady=0===e.ret,e.isBizDataEnd=t.isBizDataEnd=0===e.total||e.total<t.perPage,
h.hideLoading.call(this,"biz");
var a=template.compile(this.options.cardTpl)(e).trim(),i=t.dom.$bizArea;
"append"===e.mode?(i.find(".js_load_more").remove(),i.append(a)):i.html(a).show();
},
renderArticle:function(e){
if(this.dialog){
e.type=e.type||"article";
var t=this,a=this._g,i=a.dom,r=e.msg||"",n=null,l=null;
switch(e.type){
case"article":
n=i.$articleArea,l=i.$articleContent,-1===a.alreadyReprintIdx&&e.list&&$.each(e.list,function(t,i){
return 1===i.already_reprint?(a.alreadyReprintIdx=a.page[e.type]+t,!1):void 0;
});
break;

case"bizArticle":
n=i.$bizArticleArea,l=i.$bizArticleContent;
break;

case"search":
n=i.$searchArea,l=i.$searchContent,i.$tipsMain.hide(),0==e.code||e.msg?0!=e.code||e.list&&0!=e.list.length||e.msg||(r="暂无搜索结果"):r="系统繁忙，请稍后再试";
}
if(a.loading[e.type]=!1,"search"===e.type&&r)h.hideLoading.call(this,e.type),i.$searchTips.text(r),
i.$tipsMain.show(),"append"!==e.mode?n.hide():a.page.search-=a.perPage;else{
var o=[];
e.list=s({
type:"initiative",
list:e.list||[],
openAdReprintStatus:e.openAdReprintStatus,
cb:function(e,t){
switch(t.source_reprint_status){
case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE":
case"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE":
o.push({
needAgree:!0
});
break;

default:
o.push({
needAgree:!1
});
}
}
});
var c=template.compile(this.options.itemTpl)({
ret:e.code,
msg:e.msg,
mode:e.mode,
type:e.type,
data:e.list,
openAdReprintStatus:e.openAdReprintStatus,
page:a.page[e.type],
perPage:a.perPage,
total:e.total,
allowReprint:e.allowReprint,
biz:e.biz,
nickname:e.nickname,
headImgUrl:e.headImgUrl,
alreadyReprintIdx:a.alreadyReprintIdx
}).trim();
if("append"===e.mode?(a.curData[e.type]=a.curData[e.type].concat(e.list),l.find(".js_load_more").remove(),
l.find("tbody").append(c),0!==e.code&&(a.page[e.type]-=a.perPage)):(a.curData[e.type]=e.list,
l.html(c),i.$agreeCheckbox.checkbox({
multi:!0,
onChanged:function(e){
h.setSubmitBtnStatus.call(t,e.prop("checked"));
}
})),e.list.length>0){
var d=l.find(".js_article_radio"),p=e.openAdReprintStatus;
d.removeClass("js_article_radio").checkbox({
form:l,
name:"ori_"+e.type+"_item",
onChanged:function(i){
a.selectedIndex[e.type]=1*i.data("index");
var r=i.data("source_reprint_status"),n=1*i.data("pub");
h.changeSubmitBtnText.call(t,n),"EN_CAN_OPEN_AD_REPRINT"!==p||"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY"!==r&&"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY"!==r||0!==n?h.hideAdArea.call(t):h.showAdArea.call(t),
0!==n||"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE"!==r&&"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE"!==r?h.hideAgreeArea.call(t):h.showAgreeArea.call(t),
h.setSubmitBtnStatus.call(t,!1,n);
}
}),"append"!==e.mode&&d&&1===d.length&&d.trigger("click");
}
h.bindArticleEvent.call(t,l),h.hideLoading.call(this,e.type),e.type===a.type&&n.show();
}
this.dialog.popup("resetPosition");
}
},
showAdArea:function(e){
var t=this._g,a=t.selectedIndex[t.type];
if(void 0!==a&&(void 0===e||e===a)){
var i=t.dom;
i.$adArea.show();
}
},
hideAdArea:function(e){
var t=this._g,a=t.selectedIndex[t.type];
if(void 0!==a&&(void 0===e||e===a)){
var i=this._g.dom;
i.$adArea.hide();
}
},
showAgreeArea:function(){
this._g.dom.$agreeArea.show();
},
hideAgreeArea:function(){
this._g.dom.$agreeArea.hide();
},
bindArticleEvent:function(e){
e.find(".js_open_reprint_tips").each(function(){
new i({
dom:this,
container:this,
content:o,
isToggle:!0,
defaultOpen:!1
});
}).removeClass("js_open_reprint_tips");
},
getByteLen:function(e){
return e.replace(/[^\x00-\xff]/g,"****").length;
},
scrollToSee:function(e,t,a,i){
var r=e.getBoundingClientRect()[a],n=t.getBoundingClientRect()[a];
if(!i)switch(a){
case"top":
case"left":
if(r>n)return;
break;

case"bottom":
case"right":
if(n>r)return;
}
t[["top","bottom"].indexOf(a)>-1?"scrollTop":"scrollLeft"]+=r-n;
},
reachEnd:function(e,t,a){
a="horizontal"===a?"right":"bottom";
var i=e.getBoundingClientRect()[a],r=t.getBoundingClientRect()[a];
return r>=i;
}
},_={
on:function(e,t){
if(t){
var a=this.events;
return a[e]=a[e]||[],a[e].push(t),this;
}
},
trigger:function(e){
var t=this,a=arguments,i=t.events[e];
return i?($.each(i,function(e,i){
i.apply(t,Array.prototype.slice.call(a,1));
}),this):void 0;
},
hide:function(){
return this.dialog.popup("hide"),this;
},
show:function(){
return this.dialog.popup("show"),this;
},
destroy:function(){
var e=this;
!!e.dialog&&e.dialog.popup("remove"),e.dialog=null,e._tooltips&&e._tooltips.$dom&&(e._tooltips.$dom.remove(),
e._tooltips=null),e._g.dom={};
}
};
return $.extend(p.prototype,_),d;
});define("common/wx/comm_store.js",["common/wx/Cgi.js","biz_common/utils/comm_store.js"],function(o){
"use strict";
var m=o("common/wx/Cgi.js"),t=o("biz_common/utils/comm_store.js");
return{
get:function(o){
t.get("web",m,o);
},
set:function(o){
t.set("web",m,o);
}
};
});