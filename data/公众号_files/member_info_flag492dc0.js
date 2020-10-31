define("tpl/media/product_dialog_upload.html.js",[],function(){
return'<div class="product-filter__upload">\n    <a href="javascript:;" class="js_upload btn btn_primary">上传文件</a>\n    <div class="product-filter__upload-description">\n        通过excel上传商品id列表，快速筛选出商品，内容格式请严格参照<a href="{templateFileLink}" target="_blank" download="商品筛选模版.xls">商品筛选模版</a>（请确保商品是已导入商品素材库的）    </div>\n\n    <div class="product-filter__upload-process" style="display: none">\n        文件名.xls <div class="progress_bar"><div class="progress_bar_thumb" style="width:57%"></div></div>\n    </div>\n</div>';
});define("media/product_list.js",["biz_web/ui/checkbox.js","common/wx/pagebar.js","common/wx/dialog.js","media/productCategory.js","tpl/media/product_dialog_list.html.js","tpl/media/product_dialog_loading.html.js","tpl/media/product_pagebar_tpl.html.js","common/wx/Cgi.js","biz_web/utils/upload.js","common/wx/Tips.js"],function(t){
"use strict";
function e(t){
this._o={
pageSize:10,
listContainner:null,
categoryContianer:null,
pagebarContainer:null,
listTpl:n,
listLoadingTpl:l,
PagebarTpl:r,
uploadDom:null,
uploadInfoDom:null,
uploadInfoTpl:null,
clearUploadBtnFilter:"",
selectAllDom:null,
selectedCountDom:null,
cancelSelectBtn:null,
batchDelBtn:null,
jumpAnimateDom:null,
totalCountDom:null,
initData:null,
initTotal:0,
initPageContext:"",
jumpPageSelect:!1,
disabledItem:!1,
canDelCategory:!0,
afterRenderList:function(){},
onUploadEnd:function(){},
onUploadClear:function(){},
afterInitCategory:function(){}
},this._g={
curMod:"polo",
importData:null,
hasDestroy:!1,
uploading:!1,
selectedData:[],
listCompile:null,
loadingHtml:"",
poloTotal:0,
pageContext:"",
curPageContext:"",
prePageContext:"",
queryOpt:{
page_num:1
}
},this._extend(t),this.init(),this.bindEvent();
}
t("biz_web/ui/checkbox.js"),window.wx.url=function(t){
if(t.startsWith("javasript:"))return t;
var e=wx.data.param;
return-1!=t.indexOf("?")?t+e:t+"?1=1"+e;
};
var o=t("common/wx/pagebar.js"),a=t("common/wx/dialog.js"),i=t("media/productCategory.js"),n=t("tpl/media/product_dialog_list.html.js"),l=t("tpl/media/product_dialog_loading.html.js"),r=t("tpl/media/product_pagebar_tpl.html.js"),s=t("common/wx/Cgi.js"),c=t("biz_web/utils/upload.js"),p=t("common/wx/Tips.js"),u={
templateFileLink:wx.url("/cgi-bin/productmaterial?action=download_excel&type=2"),
importMax:200,
delSplitKey:"#$%^",
categoryLimit:i.categoryLimit,
saleStatusMap:{
0:"-",
1:"已下架",
2:"已上架"
},
sourceMap:{
1:"API",
2:"手动添加",
3:"其他",
4:"微信小店"
}
};
return e.prototype={
_extend:function(t){
if(t)for(var e in t)this._o[e]=t[e];
},
init:function(){
var t=this;
this._g.loadingHtml=template.compile(this._o.listLoadingTpl)({}),this._g.listCompile=template.compile(this._o.listTpl),
this._g.PagebarCompile=template.compile(this._o.PagebarTpl);
for(var e=1;e<=u.categoryLimit;e++)this._g.queryOpt["category_name"+e]="";
this._g.categoryObj=new i.myconstructor({
container:this._o.categoryContianer,
defaultLabel:"全部",
initCategoryName:[],
search:!0,
canadd:!1,
candel:this._o.canDelCategory,
afterInitCategory:function(){
"function"==typeof t._o.afterInitCategory&&t._o.afterInitCategory();
},
onChange:function(e){
var o=e.getData();
o.page_num=1,t.getList(o);
}
}),this._o.initData&&this._o.initPageContext?(this._g.prePageContext=this._g.curPageContext=this._g.pageContext=this._o.initPageContext,
this._g.poloTotal=this._o.initTotal,this.renderList({
code:0,
list:this._o.initData,
total:this._g.poloTotal,
page:1
})):this.refresh("cur");
},
bindEvent:function(){
var t=this,e=this._o;
e.selectAllDom&&e.selectAllDom.checkbox({
onChanged:function(e){
var o=e.prop("checked");
t._o.listContainner.find(".js_checkbox").each(function(){
var t=$(this);
o!==t.prop("checked")&&t.trigger("click");
});
}
}),e.cancelSelectBtn&&e.cancelSelectBtn.click(function(){
t.cancelAllSelect();
}),e.batchDelBtn&&e.batchDelBtn.click(function(){
t.batchDel();
}),e.listContainner.on("click",".js_del_product",function(){
var e=$(this).attr("data-pid");
t.delProduct(e);
}),e.uploadDom&&(this._g.myupload=c.uploadFile({
container:e.uploadDom,
url:"/cgi-bin/productmaterial?action=get_product_by_file&need_count=200",
multi:!1,
type:10,
onSelect:function(){
return t._g.uploadResp=null,t._g.hasDestroy||t._g.uploading?!1:void 0;
},
onProgress:function(){
t._g.uploading=!0,t._g.curMod="import",t._g.categoryObj.handle("disable"),t.showLoading(),
t._g.uploadResp=null;
},
onError:function(){
t.importComplete();
},
onAllComplete:function(){},
onComplete:function(e,o,a,i){
t._g.uploadResp=i,t.importComplete();
}
}),e.uploadInfoDom&&e.clearUploadBtnFilter&&e.uploadInfoDom.on("click",e.clearUploadBtnFilter,function(){
var o=t._g;
o.curMod="polo",o.importData=null,o.categoryObj.handle("enable"),o.categoryObj.handle("show"),
e.categoryContianer.show(),t._o.uploadInfoDom.hide(),o.selectedData=[],t.refresh(),
"function"==typeof t._o.onUploadClear&&t._o.onUploadClear();
})),e.pagebarContainer.on("click",function(e){
if("import"!=t._g.curMod){
var o=$(e.target);
if(o.hasClass("js_pagebtn")||(o=o.parents(".js_pagebtn")),o.length>0){
{
var a;
1*o.attr("data-curpage")||1;
}
o.hasClass("js_first")||(o.hasClass("js_prev")?a="pre":o.hasClass("js_next")&&(a="next")),
t.refresh(a);
}
}
});
},
delProduct:function(t){
var e=this;
a.show({
type:"info",
title:"删除确认",
msg:"确定删除商品？",
width:600,
className:"dialog-delete-confirm",
buttons:[{
text:"确定",
click:function(){
if(e._g.delingProduct!==!0){
var o=this,a=o.dom.find(".js_btn").eq(0);
a.btn(!1),e._g.delingProduct=!0,s.post({
url:"/cgi-bin/productmaterial?action=delete_product",
data:{
pids:t
},
mask:!1
},{
done:function(i){
if(a.btn(!0),e._g.delingProduct=!1,i&&i.base_resp&&0==i.base_resp.ret){
p.suc("已删除");
var n=t.split(u.delSplitKey);
e._g.poloTotal=e._g.poloTotal-n.length,e.cancelSelect(n),e.refresh("cur"),e.updateTotalCount(),
o.remove();
}else p.err("系统繁忙，请稍后再试");
},
fail:function(){
a.btn(!0),e._g.delingProduct=!1,p.err("系统繁忙，请稍后再试");
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
},
importComplete:function(){
var t=this,e=this._g;
t._g.uploading=!1,t._o.categoryContianer.hide();
var o=t._g.uploadResp;
if(o&&o.base_resp&&0==o.base_resp.ret&&o.upload_status){
var a="";
o.download_ticket&&(a=wx.url("/cgi-bin/productmaterial?action=download_fail_excel&type=2&download_ticket="+o.download_ticket)),
t._o.uploadInfoDom.html(template.compile(t._o.uploadInfoTpl)({
suc_num:o.upload_status.succ_cnt,
err_num:o.upload_status.fail_cnt,
err_link:a
})).show(),o.upload_status.succ_cnt==u.importMax&&o.upload_status.fail_cnt>0?p.err("已选择前%s个，一篇文章最多支持%s个商品展示".sprintf(u.importMax,u.importMax)):p.suc("已选择%s个商品".sprintf(o.upload_status.succ_cnt)),
e.importData=o.product_info_list&&o.product_info_list.product_info?o.product_info_list.product_info:[];
for(var i=0;i<e.importData.length;i++)e.importData[i]=this.formatData(e.importData[i]);
e.selectedData=[].concat(e.importData),t.renderList({
code:0,
list:t.getImportData(1),
total:e.importData.length,
page:1
});
}else{
e.importData=null,e.selectedData=[];
var n="导入筛选失败",l="导入筛选失败，请稍后再试";
o&&o.base_resp&&0!=o.base_resp.ret?t._o.uploadInfoDom.html(template.compile(t._o.uploadInfoTpl)({
templateFileLink:u.templateFileLink
})).show():t._o.uploadInfoDom.html(template.compile(t._o.uploadInfoTpl)({
errMsg:n
})).show(),t.renderList({
code:-1,
msg:l
}),p.err(n);
}
"function"==typeof t._o.onUploadEnd&&t._o.onUploadEnd();
},
getImportData:function(t){
this.showLoading();
var e=[];
if(!this._g.importData)return e;
var o=(t-1)*this._o.pageSize,a=o+this._o.pageSize-1;
a=Math.min(this._g.importData.length,a),o=Math.max(0,o);
for(var i=o;a>=i;i++)this._g.importData[i]&&e.push(this._g.importData[i]);
return e;
},
refreshUpload:function(){
!this._g.myupload||this._g.uploading||this._g.hasDestroy||this._g.myupload.refresh();
},
showLoading:function(){
var t=this._o;
t.listContainner.html(this._g.loadingHtml),t.pagebarContainer.hide(),t.selectAllDom&&t.selectAllDom.checkbox("checked",!1);
},
checkQueryOpt:function(t){
var e=!0;
for(var o in this._g.queryOpt)if(this._g.queryOpt.hasOwnProperty(o)&&t[o]!==this._g.queryOpt[o])return!1;
return e;
},
getList:function(t){
this.showLoading();
var e=this,o=this._g,a={};
for(var i in o.queryOpt)o.queryOpt.hasOwnProperty(i)&&(o.queryOpt[i]=t[i]||"",a[i]=o.queryOpt[i]);
a.page_size=this._o.pageSize,a.page_num>1&&(a.page_context=t.pageContext),s.post({
url:"/cgi-bin/productmaterial?action=product_list",
data:a,
mask:!1
},{
done:function(o){
if(e.checkQueryOpt(t)===!0)if(o&&o.base_resp&&0==o.base_resp.ret){
1==t.page_num&&(e._g.poloTotal=o.total||0);
var i=[];
if(o.product_info_list&&o.product_info_list.product_info&&(i=o.product_info_list.product_info),
t.page_num>1&&0==i.length)return void e.refresh("pre");
e._g.prePageContext=o.page_context,e._g.curPageContext=t.pageContext,e._g.pageContext=o.page_context,
e.renderList({
code:0,
list:i,
last:0==i.length||i.length<a.page_size?!0:!1,
total:e._g.poloTotal,
page:t.page_num
});
}else{
var n="";
o&&o.base_resp&&200013==o.base_resp.ret&&(n="操作太频繁，请稍后再试"),e.renderList({
code:-1,
msg:n
});
}
},
fail:function(){
e.checkQueryOpt(t)===!0&&(e.renderList({
code:-1
}),p.err("系统繁忙，请稍后再试"));
}
});
},
renderList:function(t){
var e=this,o=this._g,a=this._o;
0==t.code||t.msg?0!=t.code||t.list&&0!=t.list.length||t.msg||(t.msg="import"==o.curMod?"选择失败，列表中所有商品都无法选择":"暂无商品"):t.msg="系统繁忙，请稍后再试",
o.curDataList=t.list||[],a.jumpPageSelect!==!0&&e.cancelAllSelect();
var i=!0,n=this.getSelectedId();
n=","+n.join(",")+",",o.curDataList.each(function(t){
t=e.formatData(t),n.indexOf(","+t.pid+",")>=0?t.selected=!0:(t.selected=!1,i=!1);
}),i&&o.curDataList.length>0&&a.selectAllDom&&!a.selectAllDom.prop("checked")&&a.selectAllDom.checkbox("checked",!0),
this._o.listContainner.html(o.listCompile({
list:o.curDataList,
msg:t.msg
})),this.renderSelectCount(),this.renderTotalCount(t.total),o.curDataList.length>0&&this._o.listContainner.find(".js_checkbox").checkbox({
onChanged:function(t){
var o=t.val(),a=t.attr("data-index");
t.prop("checked")?e.addSelect(o,a):e.cancelSelect(o);
}
}),0==t.code&&"undefined"!=typeof t.page?this.initPageBar({
curPage:t.page,
total:t.total,
last:t.last
}):this._o.pagebarContainer.hide(),"function"==typeof this._o.afterRenderList&&this._o.afterRenderList(),
this._o.jumpAnimateDom&&setTimeout(function(){
$("body").animate({
scrollTop:e._o.jumpAnimateDom.offset().top
});
},100);
},
formatData:function(t){
t.category_name_str=[];
for(var e=1;e<=u.categoryLimit&&t["category_name"+e];e++)t.category_name_str.push(t["category_name"+e]);
return t.titleEncode=t.title.html(!0),t.category_name_str=t.category_name_str.join(";").html(!0),
t.saleStatusStr=u.saleStatusMap[t.sale_status]||"-",t.disabled=this._o.disabledItem===!0&&1==t.sale_status?!0:!1,
t.sourceStr=u.sourceMap[t.source]||"-",t.pidEncode=encodeURIComponent(t.pid),t.str_price=t.min_price,
t.str_original_price=t.min_ori_price,t;
},
getSelectedId:function(){
for(var t=this._g,e=[],o=0,a=t.selectedData.length;a>o;o++)e.push(t.selectedData[o].pid);
return e;
},
addSelect:function(t,e){
var o=this._g,a=this._o;
if(o.curDataList[e]&&o.curDataList[e].pid==t&&o.selectedData.push(o.curDataList[e]),
a.selectAllDom){
var i=0;
this._o.listContainner.find(".js_checkbox").each(function(){
$(this).prop("checked")&&i++;
}),i>0&&i==o.curDataList.length&&a.selectAllDom.checkbox("checked",!0);
}
this.renderSelectCount();
},
cancelSelect:function(t){
if(t){
var e=this._g,o=this._o;
if("[object Array]"===Object.prototype.toString.call(t))for(var a=","+t.join(",")+",",i=0;i<e.selectedData.length;i++)a.indexOf(","+e.selectedData[i].pid+",")>=0&&(e.selectedData.splice(i,1),
i--);else for(var i=0,n=e.selectedData.length;n>i;i++)if(e.selectedData[i].pid==t){
e.selectedData.splice(i,1);
break;
}
o.selectAllDom&&o.selectAllDom.checkbox("checked",!1),this.renderSelectCount();
}
},
batchDel:function(){
var t=this.getSelectedCount();
if(0==t)return void p.err("请选择需要删除的商品");
var e=this.getSelectedId();
e=e.join(u.delSplitKey),this.delProduct(e);
},
updateTotalCount:function(){
if(this._o.totalCountDom&&this._o.totalCountDom.length>0){
var t=this;
this.getTotalCount({
callback:function(e){
"undefined"!=typeof e&&t.renderTotalCount(e);
}
});
}
},
renderTotalCount:function(t){
this._o.totalCountDom&&this._o.totalCountDom.length>0&&this._o.totalCountDom.text(t||0);
},
getTotalCount:function(t){
var e=this._g.categoryObj.getData();
e.page_num=1,e.page_size=this._o.pageSize,s.post({
url:"/cgi-bin/productmaterial?action=product_list",
data:e,
mask:!1
},{
done:function(e){
e&&e.base_resp&&0==e.base_resp.ret&&t.callback(e.total);
},
fail:function(){}
});
},
cancelAllSelect:function(){
var t=this._g,e=this._o;
t.selectedData=[],this._o.listContainner.find(".js_checkbox").checkbox("checked",!1),
e.selectAllDom&&e.selectAllDom.checkbox("checked",!1),this.renderSelectCount();
},
renderSelectCount:function(){
var t=this._o,e=this.getSelectedCount();
e>0?(t.cancelSelectBtn&&t.cancelSelectBtn.removeClass("btn_disabled"),t.batchDelBtn&&t.batchDelBtn.removeClass("btn_disabled")):(t.cancelSelectBtn&&t.cancelSelectBtn.addClass("btn_disabled"),
t.batchDelBtn&&t.batchDelBtn.addClass("btn_disabled")),t.selectedCountDom&&t.selectedCountDom.text(e);
},
initPageBar:function(t){
var e=this;
if("import"==e._g.curMod)new o({
container:this._o.pagebarContainer,
perPage:this._o.pageSize,
initShowPage:t.curPage,
totalItemsNum:t.total,
last:!1,
isNavHide:!0,
callback:function(t){
e.renderList({
code:0,
list:e.getImportData(1*t.currentPage),
total:e._g.importData.length,
page:1*t.currentPage
});
}
});else{
var a=Math.ceil(this._g.poloTotal/this._o.pageSize);
if(1>=a)return void this._o.pagebarContainer.hide();
var i=!1;
(t.last===!0||t.curPage>=a)&&(i=!0),this._o.pagebarContainer.html(this._g.PagebarCompile({
page_num:t.curPage,
totalPage:a,
last:i
})).show();
}
},
getSelectedCount:function(){
return this._g.selectedData.length;
},
getSelectedData:function(){
return this._g.selectedData;
},
refresh:function(t){
var e,o,a=this._g.categoryObj.getData();
"pre"==t?(e=Math.max(1,this._g.queryOpt.page_num-1),o=this._g.prePageContext):"next"==t?(e=this._g.queryOpt.page_num+1,
o=this._g.pageContext):"cur"==t?(e=this._g.queryOpt.page_num,o=this._g.curPageContext):e=1,
e>1&&o?(a.pageContext=o,a.page_num=e):a.page_num=1,this.getList(a);
},
refreshAllData:function(){
this._g.categoryObj.select(1,"");
},
destroy:function(){
this._g.hasDestroy=!0,this._g.myupload&&"function"==typeof this._g.myupload.destroy&&this._g.myupload.destroy(),
this._g.categoryObj&&this._g.categoryObj.handle("destroy");
}
},e;
});define("tpl/media/product_select_dialog.html.js",[],function(){
return'<div>\n\n<!--旧商品选择 begin-->\n<div class="product-filter">\n  <a href="{manageLink}" target="_blank" class="btn btn_default r">管理商品</a>\n	<span class="product-filter__title">商品筛选</span>\n	<div class="product-filter__main">\n		<div class="js_category_main cascade_dropdown" style="display: none;"></div>\n		<a href="javascript:;" class="js_import">导入筛选</a>\n	</div>\n	<div class="js_des_container product-filter__main" style="display: none;">\n	</div>\n</div>\n<div class="product_table_wrp table_wrp with_border">\n    <div class="table_opr">\n        <a href="javascript:;" class="js_cancel_select btn btn_default btn_disabled">取消选择</a>\n        <span class="product-select-count">已选择<span class="js_selected_count">0</span>个商品</span>\n    </div>\n    <table class="table" cellspacing="0">\n        <thead class="thead">\n            <tr>\n                <th class="table_cell product-cell__checkbox">\n                	<label class="frm_checkbox_label">\n                        <i class="icon_checkbox"></i>\n                        <input type="checkbox" class="js_select_all frm_checkbox">\n                    </label>\n                </th>\n                <th class="table_cell product-cell__name">\n                    商品                </th>\n                <th class="table_cell product-cell__kind">类目</th>\n                <th class="table_cell product-cell__status">上架状态</th>\n            </tr>\n        </thead>\n        <tbody class="js_list_body tbody">\n            <tr class="empty_item"><td colspan="4" class="empty_tips"><i class="icon32_loading light"></i></td></tr>\n        </tbody>\n    </table>\n</div>\n<div class="product-select-footer">\n    <div class="js_pagebar pagination_wrp r"></div>\n    {if can_use_smart}\n    <div class="product-promotion__setting">\n        <label class="frm_checkbox_label">\n            <i class="icon_checkbox"></i>\n            <span class="lbl_content">个性化推荐</span>\n            <input type="checkbox" class="js_smart_select frm_checkbox">\n        </label>\n        <span class="js_smart_tips icon_msg_mini ask"></span>\n    </div>\n    <div class="js_smart_desc product-promotion__setting-expand" style="display: none;">\n        在已选的<span class="js_smart_total js_selected_count">0</span>个商品中，系统将个性化推荐<span class="frm_input_box frm_input_product"><input type="number" placeholder="" class="js_smart_count frm_input"></span>个商品展示给用户    </div>\n    {/if}\n</div>\n<!--旧商品选择 end-->\n</div>\n\n\n\n';
});define("common/wx/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=document.createElement("script"),r=document.head||document.getElementsByTagName("head")[0]||document.documentElement,d=t.url+"&t="+Math.random(),i=t.callbackName,a="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,c="undefined"==typeof t.timeoutCode?500:t.timeoutCode,l="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,s=!1,f=null,m=function(e){
o&&!s&&(s=!0,f&&(clearTimeout(f),f=null),o.onload=o.onreadystatechange=o.onerror=null,
r&&o.parentNode&&r.removeChild(o),o=null,i&&-1==i.indexOf(".")&&(window[i]=null),
e!=u&&"loaded"!=a&&"function"==typeof t.onerror&&t.onerror(e));
};
if(i&&"function"==typeof t.callback){
var p=i;
-1==i.indexOf(".")&&(i=window[i]?i+e.counter++:i,window[i]=function(){
a="loaded",t.callback.apply(null,arguments);
}),d=d.replace("="+p,"="+i);
}
o.onload=o.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&m("loaded"==a?u:l);
},o.onerror=function(){
return n>0?(t.retry=n-1,f&&(clearTimeout(f),f=null),void e(t)):void m(l);
},t.timeout&&(f=setTimeout(function(){
m(c);
},parseInt(t.timeout,10))),a="loading",o.charset="utf-8",setTimeout(function(){
o.src=d;
try{
r.insertBefore(o,r.lastChild);
}catch(e){}
},0);
}
return e;
});define("tpl/media/adcpc_cat.html.js",[],function(){
return'<div class="frm_control_group">\n    <label for="" class="frm_label">商品类目</label>\n    <div class="frm_controls">\n        <label class="frm_checkbox_label tag_choose_label">\n            <i class="icon_checkbox"></i>\n            <span class="lbl_content">全部类目</span>\n            <input type="checkbox" class="frm_checkbox cpc_cat_item_all">\n        </label>\n        <div class="tag_choose_dropdown_bd js_cat_choose_dp">\n            {each category_list as item i}\n            <label class="frm_checkbox_label tag_choose_label">\n                <i class="icon_checkbox"></i>\n                <span class="lbl_content">{item.name}</span>\n                <input type="checkbox" class="frm_checkbox js_cpc_cat_item" data-category_id="{item.category_id}" value="{item.category_id}" {if item.selected}checked=\'checked\'{/if}>\n            </label>\n            {/each}\n        </div>\n        <p class="frm_tips js_frm_tips" style="display:none">您选择的商品类目过少，将会影响您的广告变现，建议选择3个以上类目</p>\n    </div>\n</div>\n';
});define("tpl/media/adcpc.html.js",[],function(){
return'<div class="mpda_cpc_choose_context">\n\n    {if globalDefaultInsertAdMode == insertAdModeMap.auto}<div class="frm_control_group auto_insert_top_tip">文中广告智能插入已开启，新文章群发后系统将自动插入文中广告，如需修改请前往  <a href="/cgi-bin/frame?t=ad_system/common_frame&t1=publisher/publisher_manage" target="_blank">流量主广告设置页面</a></div>{/if}\n    <div class="frm_control_group">\n        <label for="" class="frm_label">本文广告位</label>\n        <div class="frm_controls frm_vertical_pt">\n            <label class="frm_radio_label">\n                <i class="icon_radio"></i>\n                <span class="lbl_content mini_tips icon_after">智能插入</span>\n                <input type="radio" class="frm_radio cpc_insert_type" value="{insertAdModeMap.auto}" {if insertAdMode == insertAdModeMap.auto}checked{/if}>\n            </label>\n            <label class="frm_radio_label">\n                <i class="icon_radio"></i>\n                <span class="lbl_content mini_tips icon_after">手动插入</span>\n                <input type="radio" class="frm_radio cpc_insert_type" value="{insertAdModeMap.op}" {if insertAdMode == insertAdModeMap.op}checked{/if}>\n            </label>\n            {if editCpc}\n            <label class="frm_radio_label">\n                <i class="icon_radio"></i>\n                <span class="lbl_content mini_tips icon_after">不插入文中广告</span>\n                <input type="radio" class="frm_radio cpc_insert_type" value="{insertAdModeMap.none}" {if insertAdMode == insertAdModeMap.none}checked{/if}>\n            </label>\n            {/if}\n        </div>\n        <div class="insert_type_tips"></div>\n    </div>\n\n    <div class="cpc_cat_container js_cpc_cat_container"></div>\n\n    <p class="empty_tips js_single_loading" style="display:none;">\n        <i class="icon_loading_small white"></i>\n    </p>\n\n    <p class="save_to_global">\n        <label class="frm_checkbox_label">\n            <i class="icon_checkbox"></i>\n            <span>保存为默认设置</span>\n            <input type="checkbox" class="frm_checkbox save_to_global_checkbox" checked>\n        </label>\n    </p>\n    <!--BEGIN 修改类目提示-->\n    {if remainAdCount}\n        <p class="remain_ad_count desc">本文还可以手动插入 <span class="hightline">{remainAdCount}</span> 条广告</p>\n    {/if}\n    <!--END 修改类目提示-->\n\n</div>\n';
});define("tpl/media/adtips.html.js",[],function(){
return'<div class="mpda_preview_area">\n    <div class="wx_preview_default">\n        <div class="wx_preview_default_hd">\n            <h3 class="wx_preview_default_title">{title}</h3>\n        </div>\n        <div class="mpda_tips_box">\n            <p class="tips_global">{=ad_info.ad_tips}</p>\n        </div>\n        <div class="mpda_wrp">\n            <div class="mpda_area show">\n                <div class="mpda_placeholder">\n                    <p class="mpda_tips">广告，也是生活的一部分</p>\n                </div>\n                <div class="mpda_inner">\n                    <div class="mpda_hd">\n                        <span class="mpda_main_img img_bg_cover" style="background-image:url({ad_info.ad_img})"></span> \n                    </div>\n                    <div class="mpda_bd"> \n                        <span class="mpda_logo img_bg_cover" style="background-image:url({ad_info.img})"></span>\n                        <div class="mpda_desc_box">\n                            <p class="mpda_title">{ad_info.nick_name}</p>\n                            <p class="mpda_details">提供的广告</p>\n                        </div>\n                        <a class="mpda_btn_more">\n                        {if ad_info.pt == 108 || ad_info.pt==116}\n                        查看详情                        {else if ad_info.pt == 109}\n                        下载应用                        {else if ad_info.pt == 110 || ad_info.pt==117}\n                        了解公众号                        {/if}\n                        </a>\n                        <a class="mpda_btn_about" href="javascript:void(0);">关于赞助广告</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="mpda_msg_area">\n    <div class="admsg_confirm_info">\n        <div class="admsg_info_key">推广要求</div>\n        <div class="admsg_info_value">\n            <!-- {if ad_info.background}\n            {=ad_info.background}\n            {else}\n            无            {/if} -->\n            {if ad_info.background}\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_bd">\n                    {=ad_info.background}\n                </div>\n            </div>\n            {/if}\n\n            {if ad_info.ad_request.length}\n            {each ad_info.ad_request as a}\n            {if a.field == \'no_compete\' || a.field == \'no_policy\'}\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    {a.title}\n                </div>\n                <div class="admsg_info_faq_bd">\n                    {each a.content as c}\n                    <span class="radius_tag">{c}</span>\n                    {/each}\n                </div>\n            </div>\n            {else}\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    {a.title}\n                </div>\n                <div class="admsg_info_faq_bd">\n                    {a.content}\n                </div>\n            </div>\n            {/if}\n            {/each}\n            {/if}\n\n            <!-- \n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_bd">\n                    xxxxxxxxxxxxxxxxxxxxxxx\n                </div>\n            </div>\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    禁止出现竞品\n                </div>\n                <div class="admsg_info_faq_bd">\n                    <span class="radius_tag">华为</span>\n                    <span class="radius_tag">小米</span>\n                </div>\n            </div>\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    禁止涉及敏感内容\n                </div>\n                <div class="admsg_info_faq_bd">\n                    <span class="radius_tag">政治</span>\n                    <span class="radius_tag">宗教</span>\n                </div>\n            </div>\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    其它\n                </div>\n                <div class="admsg_info_faq_bd">\n                    xxxxxxxxxxxxxxxxxxxxxxx\n                </div>\n            </div>\n            -->\n        </div>\n    </div>\n    <!--\n    {if ad_info.ad_request.length}\n    <div class="admsg_confirm_info">\n        <div class="admsg_info_key">服务要求</div>\n        <ol class="admsg_info_value">\n            {each ad_info.ad_request as a}\n            <li class="admsg_value_item">{a.title}：{a.content}</li>\n            {/each}\n        </ol>\n    </div>\n    {/if}\n    -->\n    <div class="admsg_confirm_info">\n        <div class="admsg_info_key">\n            {if ad_info.trade_mode == 1} <!-- 软文广告 -->\n            撰文要点            {else}\n            广告宣传语            {/if}\n        </div>\n        <div class="admsg_info_value">\n            {if ad_info.ad_tips}\n            {=ad_info.ad_tips}\n            {else}\n            无            {/if}\n        </div>\n    </div>\n</div>\n';
});define("tpl/media/admsg.html.js",[],function(){
return'<div class="admsg_item js_admsg_item" data-aid="{ad_id}">\n    <div class="admsg_item_hd">\n        <p class="admsg_info disabled_desc" {if insert_status == 0 || insert_status == 2}style="display: none;"{/if}>\n        {if insert_status == 1}\n            该广告卡片与图文消息位置不一致        {else if insert_status == 3 || insert_status == 4}\n            该广告卡片素材优化中        {/if}\n        </p>\n        <p class="admsg_info start_time">\n            投放时间：<span>{$changeTime play_time}</span>      \n            <span class="radius_tag">\n                {if trade_mode == 0}\n                广告推荐                {else}\n                内容定制                {/if}\n            </span>\n        </p>\n    </div>\n    <div class="admsg_item_bd">\n        <div class="mpda_wrp">\n            <div class="mpda_area show">\n                <div class="mpda_placeholder">\n                    <p class="mpda_tips">广告，也是生活的一部分</p>\n                </div>\n                <div class="mpda_inner">\n                    <div class="mpda_hd">\n                        <span class="mpda_main_img img_bg_cover" style="background-image:url({ad_img})"></span> \n                    </div>\n                    <div class="mpda_bd"> \n                        <span class="mpda_logo img_bg_cover" style="background-image:url({img})"></span>\n                        <div class="mpda_desc_box">\n                            <p class="mpda_title">{nick_name}</p>\n                            <p class="mpda_details">提供的广告</p>\n                        </div>\n                        <a class="mpda_btn_more">\n                        {if pt == 108||pt==116}\n                        了解详情                        {else if pt == 109}\n                        下载应用                        {else if pt == 110||pt==117}\n                        了解公众号                        {/if}\n                        </a>\n                        <a class="mpda_btn_about" href="javascript:void(0);">关于赞助广告</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="admsg_item_ft {if insert_status == 0 || insert_status == 2}js_cover{/if}">\n        <div class="cover_choosable icon_card_selected" {if insert_status != 0 && insert_status != 2}style="display: none;"{/if}></div>\n        <div class="cover_un_choosable" {if insert_status == 0 || insert_status == 2}style="display: none;"{/if}>\n        {if insert_status == 1}\n            该广告卡片与图文消息位置不一致        {else if insert_status == 3 || insert_status == 4}\n            该广告卡片素材优化中        {/if}\n        </div>\n    </div>\n</div> \n';
});define("tpl/media/dialog/admsg_dialog.html.js",[],function(){
return'<div><!-- popup组件也是感人，debug了一个多钟，发现外层没有div会调用3次 -->\n    <div class="processor_bar_wrp js_step">\n        <!-- 初始化进度条 -->\n    </div>\n    <div class="processor_panel">\n        <!-- 第一步：选择广告 -->\n        <div class="loading_box js_loading" style="display: none;">\n            <i class="icon_loading_small white"></i>\n            <span class="vm_box"></span>\n        </div>\n        <div class="processor_content_step admsg_choose js_step1_view" style="display: none;">\n            <div class="admsg_choose_bd">\n                \n                <div class="mpda_list_area">\n                    <div class="js_cpc_area" style="display:none;">\n                        <strong class="mpda_list_title">选择文中广告</strong>\n                        <div class="cpc_area ">\n                            <div class="appmsg_card_context mpda_cpc_context js_admsg_item">\n                                <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(/mpres/htmledition/images/pic/media/mpda/pic_mpda_cpc_thumb.png);"></div>\n                                <div class="appmsg_card_ft mpda_cpc_ft">\n                                    <span class="dropdown_opr_tips">\n                                        广告<span class="dropdown_opr_popover">xxxxx</span>\n                                    </span>\n                                    <a href="javascript:void(0);" class="appmsg_card_btn">\n                                        按钮                                    </a>\n                                </div>\n                                \n                                <div class="card_mask_global"><i class="icon_card_selected_global"></i></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="js_ad_list" style="display: none;">\n                        <strong class="mpda_list_title">选择互选广告</strong>\n                        <div class="admsg_list">\n                        <!-- \n                            admsg_item在js/tpl/media/admsg.html\n                            admsg_col有两列需要像视频消息一样依次堆到这两列中 \n                            ！！示例：\n                            <div class="admsg_col">\n                                <div class="admsg_item">第一个item</div>\n                                <div class="admsg_item">第三个item</div>\n                            </div>\n                            <div class="admsg_col">\n                                <div class="admsg_item">第二个item</div>\n                                <div class="admsg_item">第四个item</div>\n                            </div>\n                            哈哈哈哈这里Radeon你get了就可以删掉了\n                        -->\n                            <div class="admsg_col">\n\n                            </div>\n                            <div class="admsg_col">\n                                \n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="admsg_choose_ft">\n                <div class="pagination_wrp js_pagebar"></div>\n            </div>\n            <div class="processor_step_opr">\n                <span class="btn btn_primary btn_input js_next">\n                    <button type="button">下一步</button>\n                </span>\n            </div>\n        </div>\n        <!-- 第二步：广告条款 -->\n        <div class="processor_content_step admsg_confirm js_step2_view" style="display: none;">\n            <div class="mpda_send_panel js_adtips"></div>\n            <div class="processor_step_opr">\n                <div class="dialog_tool_tips js_dialog_mini_tips" style="display:none;"></div>\n                <span class="btn btn_default btn_input js_prev">\n                    <button type="button">上一步</button>\n                </span>\n                <span class="btn btn_primary btn_input js_submit">\n                    <button type="button">确定</button>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>\n';
});define("tpl/biz_web/ui/checkbox.html.js",[],function(){
return'<label for="_checkbox_{index}" class="frm_{type}_label">\n	<i class="icon_{type}"></i>\n	<input type="{type}" class="frm_{type}" name="{name}" id="_checkbox_{index}">\n	<span class="lbl_content">{label}</span>\n</label>';
});define("tpl/mpEditor/plugin/emotion.html.js",[],function(){
return'<ul class="emotions" onselectstart="return false;" onclick="$$._onEmotionClick(event)">\n    {each edata as e index}\n        <li data-name=\'{e.name}\' data-title=\'{e.title}\' class="emotions_item js_emotion_li">\n            <span class="icon_emotion_sprite" style=\'{e.bp}\'></span>\n        </li>\n    {/each}\n</ul>\n';
});define("common/wx/richEditor/emotion.js",["common/qq/emoji.js","widget/emotion_panel.css","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js","tpl/richEditor/emotion.html.js","common/qq/Class.js"],function(t,i,e){
"use strict";
function o(t){
return k.format(t);
}
var n=wx.T;
t("common/qq/emoji.js"),t("widget/emotion_panel.css");
for(var m=t("biz_common/utils/emoji_data.js"),s=t("biz_common/utils/emoji_panel_data.js"),a=[],c=0;c<s.length;c++)for(var r=0;r<m.length;r++)if(m[r].id==s[c]){
a[c]=m[r];
break;
}
for(var l=t("tpl/richEditor/emotion.html.js"),u=t("common/qq/Class.js"),h=20,f=16,d=7,_=[],j=h,g=f,p=d,r=0;p>r;++r)for(var v=0;g>v;++v){
var b=r*g+v;
_.push(a[b]?{
name:a[b].style,
title:a[b].emoji?a[b].emoji:a[b].cn,
bp:"background-position:0 -"+b*j+"px;"
}:{
name:"",
title:"",
bp:"background-position:0 -"+m.length*j+"px;"
});
}
var k='<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single {name}" alt="mo-{title}"></img>',E=u.declare({
init:function(t){
this.selector$=t,this.selector$.html(n(l,{
edata:_
})),this._previewArea$=this.selector$.find(".js_emotionPreviewArea"),this._initEvent();
},
getEmotionText:function(t){
return t.replace(/<img.*?alt=["]{0,1}mo-([^"\s]*).*?>/gi,"$1");
},
getEmotionHTML:function(t){
return o(t);
},
_getData:function(t){
return{
title:t.data("title"),
name:t.data("name")
};
},
_initEvent:function(){
var t=this;
t.selector$.click(function(i){
var e=t._getData($(i.target));
e.name&&t.clickCB&&t.clickCB(e);
});
},
click:function(t){
this.clickCB=t;
},
mouseleave:function(t){
return this.mouseleaveCB=t,this;
},
mouseover:function(t){
return this.mouseoverCB=t,this;
},
show:function(){
this.selector$.fadeIn();
},
hide:function(){
this.selector$.fadeOut();
}
});
E.emoji=function(t){
return t=t||"",t.emoji();
},E.getEdata=function(){
return _;
},E.getEmotionHtml=o,e.exports=E;
});define("cardticket/add/member_info_flag.js",[],function(){
"use strict";
function n(n,f){
for(var i=0;i<n.length;i++)if(n[i]===f)return i;
return-1;
}
var f=[1,4096,2,4,8,0,32,64,128,256,512,1024,2048];
return{
sys_info:["手机号","姓名","性别","所在地区","生日","身份证号","邮箱","详细地址","学历","职业","行业","收入","爱好"],
info_flag:f,
flag2info:function(n){
for(var f=[],i=0;i<this.info_flag.length;i++){
var r=this.info_flag[i];
r&n&&f.push(this.sys_info[i]);
}
return f;
},
info2flag:function(f){
for(var i=0,r=0;r<f.length;r++){
var t=n(this.sys_info,f[r]);
t>=0&&(i|=this.info_flag[t]);
}
return i;
}
};
});