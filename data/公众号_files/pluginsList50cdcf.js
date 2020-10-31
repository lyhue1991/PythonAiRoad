define("tpl/media/audit_fail_tip.html.js",[],function(){
return'<div>\n        <!--cps审核不通过不能群发 begin-->\n        <div class="page_msg small default js_no_commission_tip">\n            <div class="inner group">\n                <span class="msg_icon_wrp">\n                    <i class="icon_msg warn"></i>\n                </span>\n                <div class="msg_content">\n                    <h4>文章内容有审核不通过商品，无法群发</h4>\n                </div>\n            </div>\n        </div>\n        <!--无法获得推广收益 end-->\n    </div>\n    \n    ';
});define("common/wx/pagebar.js",["widget/pagination.css","tpl/pagebar.html.js","common/qq/Class.js","common/wx/Tips.js"],function(t,e){
"use strict";
var i,n,s,a=(t("widget/pagination.css"),t("tpl/pagebar.html.js")),r=t("common/qq/Class.js"),h=t("common/wx/Tips.js");
s=template.compile(a),i=e,n={
first:"首页",
last:"末页",
prev:"上页",
next:"下页",
startPage:1,
initShowPage:1,
perPage:10,
startRange:1,
midRange:3,
endRange:1,
totalItemsNum:0,
container:"",
callback:null,
isNavHide:!1,
isSimple:!0,
jumpPage:!0,
showEndPage:!0
};
var o=function(t,e,i){
var n;
return n=t+(e-1),n=n>i?i:n;
},g=function(t,e,i){
var n;
return n=i%2===0?e-(i/2-1):e-(i-1)/2,n=t>n?t:n;
},u=function(t,e,i){
var n;
return n=e%2===0?parseInt(t)+e/2:parseInt(t)+(e-1)/2,n=n>i?i:n;
},c=function(t,e,i){
var n;
return n=e-(i-1),n=t>n?t:n;
},l=function(t,e){
if(e[t]&&isNaN(e[t]))throw new Error("Invalid arguments: "+t+" should be a number");
},p=function(t){
if(l("perPage",t),l("totalItemsNum",t),l("startPage",t),l("startRange",t),l("midRange",t),
l("endRange",t),l("initShowPage",t),void 0!==t.callback&&null!==t.callback&&!$.isFunction(t.callback))throw new Error("Invalid arguments: callback should be a function");
},d=function(t,e,i){
var n=t.container.find(".page_"+i);
if("string"==typeof e){
var s=$(e);
0!==s.length&&(n=s);
}else{
if(e!==!1)throw new Error("Invalid Paramter: '"+i+"' should be a string or false");
n.hide();
}
return n;
},P=r.declare({
init:function(t){
if(t.totalItemsNum){
var e;
if(p(t),e=$.extend(!0,{},n,t),this._init(e),e.initShowPage<e.startPage)throw new Error("Invalid arguments: initShowPage should be larger than startPage");
if(e.initShowPage>e.endPage)throw new Error("Invalid arguments: initShowPage should be smaller than endPage");
this.paginate();
}
},
_init:function(t){
this.currentPage=t.initShowPage,this._isNextButtonShow=!0,this._isPrevButtonShow=!0,
this.uid="wxPagebar_"+ +new Date,this.initEventCenter(),this.optionsForTemplate={},
$.extend(this,t),this.container=$(t.container),this.optionsForTemplate.isSimple=t.isSimple,
this.optionsForTemplate.jumpPage=t.jumpPage===!1?!1:!0,this.optionsForTemplate.showEndPage=t.showEndPage===!1?!1:!0,
this.optionsForTemplate.firstButtonText=0===$(t.first).length?t.first:n.first,this.optionsForTemplate.lastButtonText=0===$(t.last).length?t.last:n.last,
this.optionsForTemplate.nextButtonText=0===$(t.next).length?t.next:n.next,this.optionsForTemplate.prevButtonText=0===$(t.prev).length?t.prev:n.prev,
this.optionsForTemplate.isNavHide=t.isNavHide,this.generatePages(parseInt(this.totalItemsNum)),
this.gapForStartRange=this.container.find(".gap_prev"),this.gapForEndRange=this.container.find(".gap_next"),
this.firstButton=d(this,t.first,"first"),this.lastButton=d(this,t.last,"last"),this.prevButton=d(this,t.prev,"prev"),
this.nextButton=d(this,t.next,"next"),this.bindEvent();
},
initEventCenter:function(){
this.eventCenter={
eventList:[],
bind:function(t,e){
this.eventList[t]||(this.eventList[t]=[]),this.eventList[t].push(e);
},
trigger:function(t){
var e,i;
this.eventList[t]||(this.eventList[t]=[]),e=this.eventList[t];
for(var n=0;n<e.length;n++)if(i=Array.prototype.slice.call(arguments,1),e[n].apply(this,i)===!1)return!1;
},
unbind:function(t,e){
if(!this.eventList)throw new Error("The eventList was undefined");
if(!this.eventList[t])throw new Error("The event type "+t+" was not found");
if(void 0===e)this.eventList[t]=[];else for(var i=this.eventList[t],n=i.length,s=0;n>s;s++)if(i[s]===e){
i.splice(s,1);
break;
}
}
};
},
generatePages:function(t){
var e,i,n,a,r,h;
for(this.pageNum=Math.ceil(t/this.perPage),this.endPage=this.startPage+this.pageNum-1,
this.gapForStartRange=null,this.gapForEndRange=null,this.optionsForTemplate.startRange=[],
this.optionsForTemplate.midRange=[],this.optionsForTemplate.endRange=[],i=o(this.startPage,this.startRange,this.endPage),
n=g(this.startPage,this.currentPage,this.midRange),a=u(this.currentPage,this.midRange,this.endPage),
r=c(this.startPage,this.endPage,this.endRange),i>=r&&(r=i+1),e=this.startPage;i>=e;e+=1)this.optionsForTemplate.startRange.push(e);
for(var l=0,e=n;l<this.midRange;l+=1,e+=1)this.optionsForTemplate.midRange.push(e);
for(e=r;e<=this.endPage;e+=1)this.optionsForTemplate.endRange.push(e);
this.optionsForTemplate.endPage=this.endPage,this.optionsForTemplate.initShowPage=this.initShowPage,
h=s(this.optionsForTemplate),this.container.html(h),1==this.pageNum?this.container.hide():this.container.show(),
this.pages=this.container.find(".page_nav"),this.midPages=this.container.find(".js_mid"),
this.labels=this.container.find(".page_num label"),this.container.find(".pagination").attr("id",this.uid);
},
paginate:function(){
var t,e,i,n,s,a,r,h,l,p;
if(this.isSimple===!0)for(var d=0,P=this.labels.length;P>d;d++)d%2===0&&$(this.labels[d]).html(this.currentPage);else{
e=o(this.startPage,this.startRange,this.endPage),a=g(this.startPage,this.currentPage,this.midRange),
r=u(this.currentPage,this.midRange,this.endPage),h=c(this.startPage,this.endPage,this.endRange),
e>=h&&(h=e+1),e>=a&&(a=e+1),r>=h&&(r=h-1),this.pages.show(),this.pages.removeClass("current"),
p=parseInt(this.midPages.length/this.midRange);
for(var d=0,P=p;P>d;d++){
for(s=0,t=a;r>=t;t+=1)n=this.midRange*d+(t-a),l=$(this.midPages[n]),l.html(t),s+=1,
t==this.currentPage&&l.addClass("current");
for(n=this.midRange*d+s;s<this.midRange;s+=1)l=$(this.midPages[n]),l.hide(),l.removeClass("current"),
n+=1;
}
for(var d=0,P=this.pages.length;P>=d;d++)i=$(this.pages[d]),t=parseInt(i.html()),
t===parseInt(this.currentPage)&&i.addClass("current");
if(a>e+1?this.gapForStartRange.show():this.gapForStartRange.hide(),h>r+1?this.gapForEndRange.show():this.gapForEndRange.hide(),
this.isNavHide){
for(var d=this.startPage;d<=this.endPage;d+=1)this.pages.hide();
this.gapForStartRange.hide(),this.gapForEndRange.hide();
}
}
this.checkButtonShown();
},
destroy:function(){
this.container.off("click","#"+this.uid+" a.page_nav"),this.container.off("click","#"+this.uid+" a.page_go"),
this.container.off("keydown","#"+this.uid+" .goto_area input"),this.nextButton.off("click"),
this.prevButton.off("click"),this.firstButton.off("click"),this.lastButton.off("click");
},
bindEvent:function(){
this.container.on("click","#"+this.uid+" a.page_nav",this.proxy(function(t){
var e=$(t.target);
return e.hasClass("current")?!1:(this.clickPage(parseInt(e.html())),!1);
},this)),this.nextButton.on("click",this.proxy(function(t){
$(t.target);
return this.nextPage(),!1;
},this)),this.prevButton.on("click",this.proxy(function(t){
$(t.target);
return this.prevPage(),!1;
},this)),this.firstButton.on("click",this.proxy(function(t){
$(t.target);
return this.goFirstPage(),!1;
},this)),this.lastButton.on("click",this.proxy(function(t){
$(t.target);
return this.goLastPage(),!1;
},this)),this.container.on("click","#"+this.uid+" a.page_go",this.proxy(function(t){
var e=$(t.target).prev();
return this.goPage(e.val()),!1;
},this)),this.container.on("keydown","#"+this.uid+" .goto_area input",this.proxy(function(t){
return wx.isHotkey(t,"enter")?(this.container.find("a.page_go").click(),!1):void 0;
},this));
},
on:function(t,e){
this.eventCenter.bind(t,this.proxy(e,this));
},
callbackFunc:function(t){
var e={
currentPage:this.currentPage,
perPage:this.perPage,
count:this.pageNum
};
return $.isFunction(this.callback)&&this.callback(e)===!1?!1:this.eventCenter.trigger(t,e)===!1?!1:void this.paginate();
},
proxy:function(t,e){
return function(){
var i=Array.prototype.slice.call(arguments,0);
return t.apply(e,i);
};
},
nextPage:function(){
this.currentPage!==this.endPage&&(this.currentPage++,this.callbackFunc("next")===!1&&this.currentPage--);
},
prevPage:function(){
this.currentPage!==this.startPage&&(this.currentPage--,this.callbackFunc("prev")===!1&&this.currentPage++);
},
goFirstPage:function(){
var t=this.currentPage;
this.currentPage=this.startPage,this.callbackFunc("goFirst")===!1&&(this.currentPage=t);
},
goLastPage:function(){
var t=this.currentPage;
this.currentPage=this.endPage,this.callbackFunc("goLast")===!1&&(this.currentPage=t);
},
checkButtonShown:function(){
+this.currentPage===+this.startPage?this.hidePrevButton():this.showPrevButton(),
+this.currentPage===+this.endPage?this.hideNextButton():this.showNextButton();
},
goPage:function(t){
var e=this.currentPage,t=Math.round(t);
return t===this.currentPage?!1:isNaN(t)?(h.err("请输入正确的页码"),!1):""===t?!1:t<this.startPage?(h.err("请输入正确的页码"),
!1):t>this.endPage?(h.err("请输入正确的页码"),!1):(this.currentPage=t,void(this.callbackFunc("go")===!1&&(this.currentPage=e)));
},
clickPage:function(t){
var e=this.currentPage;
isNaN(t)&&(t=this.startPage),this.currentPage=t<this.startPage?this.startPage:t>this.endPage?this.endPage:t,
this.callbackFunc("click")===!1&&(this.currentPage=e);
},
showNextButton:function(){
this.nextButton&&this._isNextButtonShow===!1&&(this.nextButton.show(),this._isNextButtonShow=!0);
},
showPrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!1&&(this.prevButton.show(),this._isPrevButtonShow=!0);
},
hideNextButton:function(){
this.nextButton&&this._isNextButtonShow===!0&&(this.nextButton.hide(),this._isNextButtonShow=!1);
},
hidePrevButton:function(){
this.prevButton&&this._isPrevButtonShow===!0&&(this.prevButton.hide(),this._isPrevButtonShow=!1);
}
});
return e=P;
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("common/wx/speedPerformance.js",["biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function s(e){
if(e)if(e.length>0)for(var s=0,n=e.length;n>s;s++){
var i=e[s];
a[i.type]=a[i.type]?$.extend(e,a[i.type]):{
uin:wx&&wx.data&&wx.data.uin||0,
pid:i.pid,
rid:i.rid||0,
speeds:[]
};
}else"object"===("undefined"==typeof e?"undefined":_typeof(e))&&(a[e.type]={
uin:wx&&wx.data&&wx.data.uin||0,
pid:e.pid,
rid:e.rid||0,
speeds:[]
});
}
function n(e,s,n){
a[e]?(u[e+s]||(u[e+s]=[]),"start"===n?u[e+s][0]=+new Date:"end"===n&&(u[e+s][1]=+new Date)):o(e);
}
function i(e,s,n){
var i=!0;
if(a[e]){
if("string"==typeof s&&1*n){
var t=e+s;
if(u[t][0]&&u[t][1]){
for(var d=u[t][1]-u[t][0],p=d>0?d:0,c=0,l=a[e].speeds.length;l>c;c++){
var m=a[e].speeds[c];
if(m.sid===n){
m.time=p;
break;
}
}
(c===l||0===a[e].speeds.length)&&a[e].speeds.push({
sid:n,
time:p
}),f.saveSpeeds(a[e]),r(e,s);
}else i=!1;
}else if(s&&s.length>0){
for(var c=0,l=s.length;l>c;c++)a[e].speeds.push(s[c]);
f.saveSpeeds(a[e]);
}else i=!1;
return i;
}
o(e),i=!1;
}
function t(e){
a[e]={};
}
function d(e,s){
if(a[e]){
if(f.setBasicTime({
uin:a[e].uin,
pid:a[e].pid,
rid:a[e].rid
}),s&&a[e].speeds.length>=0){
for(var n=0,i=s.length;i>n;n++)a[e].speeds.push(s[n]);
f.saveSpeeds(a[e]);
}
}else o(e);
}
function p(){
f.send();
}
function r(e,s){
u[e+s]=[];
}
function o(e){
console.error("cannot find speed type: %s, please init speeds",e);
}
var f=e("biz_common/utils/wxgspeedsdk.js"),a={},u={};
return{
initSpeeds:s,
saveSpeeds:i,
clearSpeeds:t,
setBasicSpeeds:d,
mark:n,
send:p
};
});define("common/wx/utils.js",["biz_common/utils/monitor.js"],function(e){
"use strict";
var s=e("biz_common/utils/monitor.js");
return{
formatVideoTime:function(e){
var s=Math.floor(e%60),a=Math.floor(e/60);
return s=s&&10>s?"0"+s:s,"%s分%s秒".replace("%s",a).replace("%s",s);
},
reportConsumeTime:function(e){
var a=(new Date).getTime(),t=a-e;
switch(!0){
case 1e3>=t&&t>0:
s.setSum(128961,26,1);
break;

case 2e3>=t&&t>1e3:
s.setSum(128961,27,1);
break;

case 3e3>=t&&t>2e3:
s.setSum(128961,28,1);
break;

case 4e3>=t&&t>3e3:
s.setSum(128961,29,1);
break;

case 5e3>=t&&t>4e3:
s.setSum(128961,30,1);
break;

case 1e4>=t&&t>5e3:
s.setSum(128961,31,1);
break;

case 2e4>=t&&t>1e4:
s.setSum(128961,32,1);
break;

case 3e4>=t&&t>2e4:
s.setSum(128961,33,1);
break;

case 4e4>=t&&t>3e4:
s.setSum(128961,34,1);
break;

case 5e4>=t&&t>4e4:
s.setSum(128961,35,1);
break;

case t>5e4:
s.setSum(128961,36,1);
}
s.send();
}
};
});define("common/wx/const.js",[],function(){
"use strict";
var o=30;
return{
insertAdModeMap:{
auto:"2",
op:"1",
none:"0"
},
moreReadModeMap:{
custom:2,
auto:1,
none:0
},
textCountAroundAd:300,
maxArticleAdCount:2,
maxArticleAutoInsertAdCount:2,
videoDigestPlaceholder:"从这里开始输入视频介绍，可以不填",
hasShowVideoModifyDialogKey:"hasShowVideoModifyDialog",
DEFAULT_AD_TEXT:"接下来，是广告时间",
NO_AD_TEXT:"noAdText",
videoPasterMinPlayLength:60,
videoPasterMinShowTime:3,
videoTitleMaxLen:o,
modifyVideoTitleTips:"链接中的视频不可修改标题",
videoMsgMaxGuideWord:300
};
});define("media/media_static_data.js",[],function(w,e){
"use strict";
e.article_type=[{
name:"文学",
value:"文学"
},{
name:"金融财经",
value:"金融财经"
},{
name:"房产",
value:"房产"
},{
name:"时事政治",
value:"时事政治"
},{
name:"社会新闻",
value:"社会新闻"
},{
name:"工业农业",
value:"工业农业"
},{
name:"汽车",
value:"汽车"
},{
name:"科技互联网",
value:"科技互联网"
},{
name:"教育培训",
value:"教育培训"
},{
name:"艺术文化",
value:"艺术文化"
},{
name:"美妆时尚",
value:"美妆时尚"
},{
name:"娱乐",
value:"娱乐"
},{
name:"旅游",
value:"旅游"
},{
name:"健康医疗",
value:"健康医疗"
},{
name:"体育",
value:"体育"
},{
name:"餐饮美食",
value:"餐饮美食"
},{
name:"母婴育儿",
value:"母婴育儿"
},{
name:"情感",
value:"情感"
},{
name:"历史",
value:"历史"
},{
name:"军事",
value:"军事"
},{
name:"宗教",
value:"宗教"
},{
name:"星座占卜",
value:"星座占卜"
},{
name:"幽默笑话",
value:"幽默笑话"
},{
name:"图片",
value:"图片"
},{
name:"视频",
value:"视频"
},{
name:"其他",
value:"其他"
}],e.URL_PLATFORM_MAP={
"www.guokr.com":"果壳",
"www.zhihu.com":"知乎",
"blog.sina.com.cn":"新浪博客",
"www.huxiu.com":"虎嗅网",
"www.dreamore.com":"追梦网",
"cn.engadget.com":"瘾科技",
"www.cnbeta.com":"cnBeta",
"www.199it.com":"199IT",
"www.36kr.com":"36氪",
"www.tmtpost.com":"钛媒体",
"www.iheima.com":"i黑马",
"www.cyzone.cn":"创业邦",
"www.ikanchai.com":"砍柴网",
"www.iresearch.cn":"艾瑞网",
"xianguo.com":"鲜果网",
"www.myzaker.com":"ZAKER",
"jandan.net":"煎蛋网",
"pianke.me":"片刻网",
"www.techweb.com.cn":" TechWeb",
"www.leiphone.com":"雷锋网",
"www.douban.com":"豆瓣",
"www.mop.com":"猫扑",
"www.tianya.cn":"天涯",
"jingyan.baidu.com":"百度经验",
"baike.baidu.com":"百度百科",
"wenku.baidu.com":"百度文库",
"tieba.baidu.com":"百度贴吧",
"zhidao.baidu.com":"百度知道",
"news.sina.com.cn":" 新浪新闻",
"news.qq.com":"腾讯新闻",
"news.ifeng.com":"凤凰资讯",
"news.163.com":"网易新闻",
"www.xinhuanet.com":"新华社",
"www.people.com.cn":"人民网",
"www.huanqiu.com":"环球时报",
"www.gov.cn":"中国政府网",
"www.china.com":"中华网",
"www.takungpao.com":"大公网",
"www.81.cn":"中国军网",
"www.zaobao.com":"联合早报",
"d.weibo.com":"新浪微博",
"weibo.com":"新浪微博",
"www.baidu.com":"百度",
"www.sina.com.cn":"新浪",
"www.163.com":"网易",
"news.sohu.com":"搜狐新闻",
"www.sohu.com":"搜狐",
"www.ifeng.com":"凤凰网",
"qzone.qq.com":"QQ空间"
};
});define("media/article_list.js",["common/wx/media/previewDialog.js","media/common.js","common/wx/media/keywordDialog.js","common/qq/events.js","common/wx/mpEditor/common/base_class.js","common/wx/time.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/popover.js","biz_common/utils/monitor.js","common/wx/mpEditor/plugin/remoteimg.js","biz_common/moment.js","common/wx/const.js","common/wx/Cgi.js","common/wx/speedPerformance.js","media/media_cgi.js","media/article_interface.js","media/draft.js","3rd/editor/common/report.js","media/appmsg_dialog.js","media/get_article_structure.js","common/wx/mpEditor/common/eventbus.js","pages/media/modules/video_status/video_status.js"],function(e){
"use strict";
function t(){
if("-1"==O.navigatorType)return"";
if(!O.navigatorType){
var e=window.navigator.userAgent;
O.navigatorType=/360se/i.test(e)?"360":/metasr/i.test(e)?"搜狗":/LBBROWSER/i.test(e)?"猎豹":/QQBrowser/i.test(e)?"QQ":/Edge/i.test(e)?"Edge":/Opera/i.test(e)||/Opr\//i.test(e)?"Opera":/chrome/i.test(e)?"Chrome":/Safari/i.test(e)?"Safari":/Firefox/i.test(e)?"Firefox":/MSIE/i.test(e)||/Trident\//i.test(e)?"IE":"-1";
}
return O.navigatorType;
}
function i(e){
var t=e&&e.multi_item;
return t&&t.length?($.each(t,function(e,t){
$.each(t,function(e,i){
i.html&&(t[e]=i.html(!1));
}),"10"==t.share_page_type&&(t.guide_words=t.content);
}),t):null;
}
function r(e,t,i){
(t||1)>L&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
var a=e("common/wx/media/previewDialog.js"),n=e("media/common.js"),o=e("common/wx/media/keywordDialog.js"),s=e("common/qq/events.js")(!0),c=e("common/wx/mpEditor/common/base_class.js"),l=e("common/wx/time.js"),_=e("biz_web/lib/store.js"),p=e("common/wx/Tips.js"),u=e("common/wx/dialog.js"),f=e("common/wx/popover.js"),m=e("biz_common/utils/monitor.js"),g=e("common/wx/mpEditor/plugin/remoteimg.js"),h=e("biz_common/moment.js"),v=e("common/wx/const.js").insertAdModeMap,w=e("common/wx/Cgi.js"),x=e("common/wx/speedPerformance.js"),y=e("media/media_cgi.js"),b=e("media/article_interface.js"),k=e("media/draft.js"),j=e("3rd/editor/common/report.js"),A=e("media/appmsg_dialog.js"),D=e("media/get_article_structure.js"),E=D.getArticleStructure,S=D.getArticleStructureNoAd,T=D.getArticleStructureForSelfCheck,C=e("common/wx/mpEditor/common/eventbus.js"),N=wx.cgiData,I=["一","二","三","四","五","六","七","八","九","十"],O={
articleScrollId:null,
navigatorType:"",
articleSelectIdx:0,
actionClicked:!1,
CACHE_DATA_KEY:"mpnewappmsg_"+wx.uin,
CACHE_TYPE_KEY:"appmsgtype_"+wx.uin,
debug:window.location.href.indexOf("&_debug=1")>0?!0:!1,
draftTipsreportList:["2397429400","3086281409","2398460220"]
},q=wx.cgiData.material_id||wx.cgiData.material_list,B={},L=Math.random(),M=n.eq,R=c.inherit({
init:function(e){
var t=this;
if($.extend(!0,t,e),t.editor=t.ueditor,t.domUtils=t.editor.getDomUtils(),t._g={
delPopover:null,
hasInitArticleData:!1
},t.opt=e,t.data_seq=(e.appmsg_data.data_seq||"0")+"",t.crop_img_ing=!1,t.$list=$(e.appmsg_selector),
t.$accountHeader=$(e.appmsg_account_selector),t.canAddArticleMoveLog=-1,t.isshare=1!=wx.cgiData.share||e.app_id?0:1,
t.gid=0,t.readOnlyType=0,t.defineEvent(),t.is_illegal)t.draft=null,t.readOnlyType="3_1",
t.list=i(e.appmsg_data),t._initArticleList();else if(t.is_rumor||t.is_malicious)t.draft=null,
t.readOnlyType="3_2",t.list=i(e.appmsg_data),t._initArticleList();else if(1==wx.cgiData.conflict){
t.readOnlyType="3_3",t.draft=null,t.list=k.getReadOnlyDraft(e.app_id),k.clearReadOnlyDraft(e.app_id);
var r="65080_99_1";
t.list||(r+=";65080_100_1"),j.logReport(r,"","img"),t._initArticleList();
}else if(wx.cgiData.bizmediaid)t.draft=null,t.readOnlyType="1_6",t.list=i(e.appmsg_data),
t._initArticleList();else if(t.ueditor.fireEvent("reportAddNum",65080,107,1),t.draft=new k.constructor(e.app_id,t.data_seq,t.ueditor),
e.app_id||t.data_seq&&"0"!=t.data_seq)t.list=i(e.appmsg_data),t.draft.seq=t.data_seq,
t.conflict_ls_seq=t.conflict_ls_seq,t._initArticleList();else if(t._hasAppmsgType()){
var a=!1;
a=this._hasMaterial(),t.list=a&&[a],t._initArticleList();
}else t.list=!1,t._initArticleList();
t._bindEvent();
},
_hasMaterial:function(){
var t=null;
if(2==wx.cgiData.material_type&&q){
t=wx.cgiData.app_msg_info.material_info.share_imageinfo;
var i=t.map(function(e){
return{
file_id:e.file_id,
cdn_url:e.cdn_url,
width:"",
height:""
};
});
return{
cdn_url:t.cdn_ur,
share_imageinfo:i,
share_page_type:8
};
}
if(3==wx.cgiData.material_type&&wx.cgiData.material_id)return t=wx.cgiData.app_msg_info.material_info.share_voiceinfo[0],
{
share_voice_id:t.file_id,
share_voiceinfo:[{
file_id:t.file_id,
duration:h.unix(t.play_length/1e3).format("mm:ss"),
title:t.title,
play_length:t.play_length/1e3,
play_url:t.play_url
}],
title:t.title,
share_page_type:7
};
if(15==wx.cgiData.material_type&&wx.cgiData.material_id){
t=wx.cgiData.app_msg_info.material_info;
var r=e("pages/media/modules/video_status/video_status.js");
return{
share_video_id:t.content,
share_videoinfo:[{
is_mp_video:t.is_mp_video,
title:t.title,
cover:t.cover,
video_id:t.content,
duration:t.duration,
play_length:this._durationStr2Sec(t.duration)
}],
cdn_url:t.cover,
title:t.title,
isMyMpVideo:1===t.is_my_mp_video,
share_page_type:5,
status:r.getVideoStatus(t),
videoDescForGuideWords:t.digest||"",
video_ori_status:t.video_ori_status,
applyori:t.applyori,
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
};
}
return!1;
},
_durationStr2Sec:function(e){
if(!e)return 0;
e=e.replace(/：/g,":");
for(var t=e.split(":"),i=0,r=1,a=t.length-1;a>=0;a--)i+=t[a]*r,r*=60;
return i;
},
_hasAppmsgType:function(){
return wx.cgiData.material_type&&q;
},
_initArticleList:function(){
var e=this;
if(e.list){
var t=e.list.length;
$.each(e.list,function(i,r){
e.add({
data:r,
isNew:!1
}),t>1&&e.select({
idx:i,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
});
}),wx.cgiData.bizmediaid?(e.select({
idx:wx.cgiData.idx,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1,
markInited:!0
}),$("#nav").text(wx.cgiData.appmsg_data.history_time?"正在查看历史版本："+h.unix(wx.cgiData.appmsg_data.update_time).format("YYYY-MM-DD HH:mm:ss")+"由"+(wx.cgiData.appmsg_data.operator_name||"未知")+"保存":"正在查看历史版本")):e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1,
markInited:!0
});
}else if(1!=e.isshare)if("5"==e.createType||"7"==e.createType||"8"==e.createType||"9"==e.createType)e.createArticle({
type:e.createType,
onCancel:function(){
e.add({
isNew:!0
}),e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
});
}
});else if("10"==e.createType){
var i={
share_page_type:10
};
wx.cgiData.can_use_related_video=0;
var r=e.add({
data:i,
isNew:!0
});
e.select({
idx:r.index(),
doNotHideErr:!1,
doNotScroll:!1,
isNewCreate:!0
});
}else e.add({
isNew:!0
}),e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!0
});else e.createArticle({
type:9,
onCancel:function(){
e.add({
isNew:!0
}),e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
});
}
});
e._g.hasInitArticleData=!0,e._updateTitleTips(),e.lastData=e._hasAppmsgType()?!1:e.getData()||!1,
e.hasConfirmed=!1,"10"!==e.createType&&(O.$actionBtn=$(template.render("tpl_article_action",{})).appendTo("body")),
e._renderReadOnly(),e._warnDraft(),e._initDraftSyn(),e.renderCreateBtn();
},
_deserializeReadOnlyType:function(){
var e={
right:0,
index:0
};
if(this.readOnlyType){
var t=this.readOnlyType.split("_");
return e.right=1*t[0],e.index=1*t[1],e;
}
return e;
},
_warnDraft:function(){
var e=this;
if(this.draft&&this.draft.data){
if(M(this.lastData,this.draft.data))return void e.draft.clear();
e.ueditor.fireEvent("reportAddNum",65080,108,1);
var t=!0;
1*!e.app_id&&1*!e.draft.seq&&(t=!1),e.readOnlyType="0_5";
{
k.saveReadOnlyDraft(this.draft.data,e.app_id||0,e.draft.seq||0);
}
e.draft.clear();
var i=e._deserializeReadOnlyType();
e.ueditor.fireEvent("renderReadOnly",{
right:i.right,
type:i.index,
showTips:t,
callback:function(){
e._setMaterialDialg(!0);
}
}),e._setMaterialDialg(!1);
try{
var r=window.wx.data.uin;
if(O.debug||50==Math.floor(100*Math.random())||(","+O.draftTipsreportList.join(",")+",").indexOf(","+r+",")>=0){
var a=["draft_tips_",r,";time:",+new Date,";uin:",window.wx.data.uin||"",";app_id:",e.app_id||"",";service_ori:",JSON.stringify(e.list),";service:",JSON.stringify(e.lastData),";draft:",JSON.stringify(d)].join("");
j.logReport("",a,"ajax"),_.set("draft_tips",a),console.log("draft_tips,service:"),
console.log(e.lastData),console.log("draft_tips,draft:"),console.log(d);
}
}catch(n){}
}
},
_articleChoose:function(e,t){
var i=this,r=i.$list.children().length;
if(r>=i.maxNum&&"add"===e)return void p.err("你最多只可以加入%s条消息".sprintf(i.maxNum));
if("replace"===e&&i._reportReplaceType(t),100==t){
var a=new Image;
a.src="/cgi-bin/reportmaterialoper?oper=2&token="+wx.data.t,new A({
link:1,
onOK:function(r){
if(r){
var a=i[e]({
data:r,
isNew:!0
});
i.select({
idx:a.index()
}),i._updateTitleTips();
var n=new Image;
n.src="/cgi-bin/reportmaterialoper?oper=3&token="+wx.data.t,i.ueditor.fireEvent("isReadOnly")||i.ueditor.fireEvent("foldToolbar",null,t);
}
}
});
}else i.createArticle({
type:t,
action:e,
onOk:function(r){
if(r&&(i.renderCreateBtn(),i._updateTitleTips(),i.ueditor.fireEvent("after_change_article",e),
i.app_id)){
var a=new Image;
a.src="/cgi-bin/reportmaterialoper?oper=0&idx="+r.index()+"&msgid="+i.app_id+"&token="+wx.data.t;
}
0!==t&&9!==t||i.ueditor.fireEvent("isReadOnly")||i.ueditor.fireEvent("foldToolbar",null,t);
}
});
},
_reportReplaceType:function(e){
switch(e){
case 0:
this.ueditor.fireEvent("reportAddNum",121548,15,1);
break;

case 100:
this.ueditor.fireEvent("reportAddNum",121548,16,1);
break;

case 5:
this.ueditor.fireEvent("reportAddNum",121548,17,1);
break;

case 7:
this.ueditor.fireEvent("reportAddNum",121548,18,1);
break;

case 8:
this.ueditor.fireEvent("reportAddNum",121548,19,1);
break;

case 9:
this.ueditor.fireEvent("reportAddNum",121548,20,1);
}
},
_initDraftSyn:function(){
var e=this;
e.draft&&(e.ueditor.addListener("syn_draft",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.data;
if(i){
var r=e.ueditor.fireEvent("checkRemoteList"),a=e.ueditor.fireEvent("checkdomAsynList");
if(e._saving!==!0&&e.crop_img_ing!==!0&&r===!0&&a===!0&&!M(i||!1,e.getData()||!1)){
e.ueditor.fireEvent("reportAddNum",65080,105,1);
var n,o=+new Date,s=0;
e.$current&&(s=e.$current.index()||0,n=e.ueditor.getSelectionRange().createDomAddress(!1,!0));
for(var d=e.$list.find(".js_appmsg_item"),c=[],l=[];d.length>0;){
e.select({
idx:0,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
}),e.ueditor.fireEvent("saveScene");
var _=e.remove(0,!0);
c.push(_.getHistory()||null),l.push(_.getScrollTop()||0),d=e.$list.find(".js_appmsg_item");
}
e.list=i,e.lastData=e.list,$.each(e.list,function(t,i){
var r=e.add({
data:i,
isNew:!1
}),a=r.data("article");
a&&(c&&c[t]&&a.setHistory(c[t]),l&&"undefined"!=typeof l[t]&&a.setScrollTop(l[t])),
r.data("article",a),e.select({
idx:t,
doNotHideErr:!1,
doNotScroll:!0,
isNewCreate:!1
}),e.ueditor.fireEvent("saveScene");
});
var p=e.$list.find(".js_appmsg_item").length;
e.select({
idx:Math.min(s,p-1)
}),e.renderCreateBtn(),setTimeout(function(){
n&&e.ueditor.getSelectionRange().moveToDomAddress(n,!1).select(!0);
},0),e.ueditor.fireEvent("reportAddNum",69271,66,1),e.ueditor.fireEvent("reportAddNum",69271,67,+new Date-o);
}
}
}),e.ueditor.fireEvent("initMultipleTab"));
},
_renderReadOnly:function(e,t,i){
var r=this,a=r._deserializeReadOnlyType();
if(4==a.index){
var n=r.getData()||!1;
r.draft=null,k.clear(r.app_id),k.saveConflict(n,r.app_id,r.data_seq,r.conflict_ls_seq);
}
1&a.right&&(O.$actionBtn=null,r.ueditor.fireEvent("renderReadOnly",{
right:a.right,
type:a.index,
time:e||"",
name:t||"",
ua:i||""
}));
},
_setMaterialDialg:function(e){
b.setDialog({
type:this.isshare?9:this.createType,
hide:!e
});
},
_clearIntervalSave:function(){
this.draftSaveId&&(clearInterval(this.draftSaveId),this.draftSaveId=null);
},
_activeIntervalSave:function(){
var e=this;
e.draft&&(e._clearIntervalSave(),this.draftSaveId=setInterval(function(){
if(e._clearIntervalSave(),e.draft){
var t=e.getData()||!1;
e.draft.save(t);
}
e._activeIntervalSave();
},6e4));
},
_updateActionBtnPos:function(){
var e=this.$list.children().eq(O.articleSelectIdx),t=e.data("article"),i=t.getListItem(),r=i.offset(),a=r.top;
O.$actionBtn.css({
top:a+i.height()/2-O.$actionBtn.height()/2,
left:r.left+i.width()
});
},
_hoverOnArea:function(e,t){
var i=e&&(e.find(t).length>0||e.is($(t)));
return!!i;
},
_changeMoveBtnCss:function(){
var e=this.$list.children().eq(O.articleSelectIdx),t=$(".js_replace_appmsg"),i=$(".js_down"),r=$(".js_up"),a=$(".js_del");
e.is(":first-child")?(t.show(),r.hide(),r.removeClass("first_item"),i.show(),a.hide()):(t.hide(),
r.show(),r.addClass("first_item"),i.show(),a.show()),e.is(":last-child")&&i.hide();
},
_updateActionBtn:function(){
this._changeMoveBtnCss(),this._updateActionBtnPos();
},
_showActionBtn:function(e){
var t=this;
if(O.$actionBtn){
var i=$(".js_article_panel"),r=!O.$actionBtn.is(":hidden"),a=i[0]&&!i.is(":hidden");
a&&!r&&(i.hide(),a=!1);
var n=$(e.target).closest(".js_appmsg_item"),o=n.index();
o===O.articleSelectIdx&&(t._updateActionBtn(),O.$actionBtn.show());
}
},
_hideActionBtn:function(){
var e=O.$actionBtn,t=$(".js_article_panel");
if(e){
var i=!e.is(":hidden"),r=t[0]&&!t.is(":hidden"),a=this.ueditor.fireEvent("get_article_action_type");
$(".js_action_btn").removeClass("current"),i&&e.hide(),"replace"===a&&r&&t.hide();
}
},
_hideActionBtnOnDocumentClick:function(e){
var t=O.$actionBtn,i=$(".js_article_panel"),r=e.target;
this._hoverOnArea($(".js_appmsg_item"),r)||this._hoverOnArea(i,r)||this._hoverOnArea(t,r)||this._hoverOnArea($(".js_replace_pop"),r)||this._hoverOnArea($(".js_del_pop"),r)||(this._hideActionBtn(),
this.ueditor.fireEvent("hide_replace_popover"),this.ueditor.fireEvent("hide_del_popover"));
},
defineEvent:function(){
var e=this;
this._g.event={
delPopoverScroll:function(){
e._g.delPopover&&(e._g.delPopover.resetPosition($(".js_del")),e._g.delPopover.$dom=O.$actionBtn);
}
};
},
_bindEvent:function(){
var e=this;
e.ueditor.addListener("selectArticle",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
e.select({
idx:t.idx,
doNotHideErr:t.doNotHideErr,
doNotScroll:t.doNotScroll,
isNewCreate:t.isNewCreate,
markInited:!1
});
}),e.ueditor.addListener("getArticleDomList",function(){
return e.$list.find(".js_appmsg_item");
}),e.ueditor.addListener("is_article_removing",function(e,t){
return O.isArticleRemoving=void 0===t?O.isArticleRemoving:!!t,O.isArticleRemoving;
}),e.ueditor.addListener("hide_del_popover",function(){
e._g.delPopover&&e._g.delPopover.hide();
}),e.ueditor.addListener("hide_action_btn",function(){
e._hideActionBtn();
}),e.$list.on("click",".js_appmsg_item",function(t){
var i=$(this).closest(".js_appmsg_item").index();
0!==i&&$(".js_article_panel").hide(),$(".js_replace_pop").hide(),$(".js_del_pop").hide(),
$(".js_action_btn").removeClass("current"),x.mark("appmsg","articleSelect","start"),
i!=e.$current.index()&&(e.select({
idx:i
}),e.ueditor.fireEvent("isReadOnly")||e.ueditor.fireEvent("foldToolbar")),wx.cgiData.idx=i,
x.mark("appmsg","articleSelect","end"),x.saveSpeeds("appmsg","articleSelect",29)&&x.send(),
e._showActionBtn.bind(e)(t);
}),e._bindHideActionBtnOnDocClick=e._hideActionBtnOnDocumentClick.bind(e),e._bindHideActionBtn=e._hideActionBtn.bind(e),
$(document).on("click",e._bindHideActionBtnOnDocClick),e.ueditor.addListener("click",e._bindHideActionBtn),
$(window).on("scroll",function(){
e.ueditor.fireEvent("article_item_list_scroll");
}),e.$list.on("mouseenter",".js_appmsg_item",e._showActionBtn.bind(e)),$(".js_appmsg_action").on("mouseenter",".js_action_btn",function(){
var e=this,t=$(".js_article_panel"),i=$(".js_replace_pop"),r=$(".js_del_pop"),a=i[0]&&!i.is(":hidden"),n=r[0]&&!r.is(":hidden"),o=t[0]&&!t.is(":hidden");
$(e).hasClass("js_replace_appmsg")||$(e).hasClass("js_del")?O.actionClicked=a||n||o?!0:!1:($(".js_article_panel").hide(),
O.actionClicked=!1,a||n||$(".js_appmsg_action").find(".js_action_btn").removeClass("current")),
$(e).addClass("current"),O.actionBtnToolTipsId&&(clearTimeout(O.actionBtnToolTipsId),
O.actionBtnToolTipsId=null),O.actionBtnToolTipsId=setTimeout(function(){
$(e).find(".js_tooltips").show();
},1e3);
}),$(".js_appmsg_action").on("click",".js_action_btn",function(){
$(this).hasClass("js_replace_appmsg")||$(this).hasClass("js_del")?($(this).addClass("current"),
O.actionClicked=!0):(e._hideActionBtn(),e._g.delPopover&&e._g.delPopover.hide());
}),$(".js_appmsg_action").on("mouseleave",".js_action_btn",function(){
O.actionClicked||$(this).removeClass("current"),O.actionBtnToolTipsId&&(clearTimeout(O.actionBtnToolTipsId),
O.actionBtnToolTipsId=null),$(this).find(".js_tooltips").hide();
}),$(".js_appmsg_action").on("click",".js_del",function(){
if(e._saving!==!0&&e.ueditor.fireEvent("before_del_article")!==!1){
e.ueditor.fireEvent("reportAddNum",121548,14,1);
var t=O.articleSelectIdx;
return t!=e.$current.index()&&e.select({
idx:t
}),e.remove(t),!1;
}
}),$(".js_appmsg_action").on("click",".js_up",function(){
if(e._saving!==!0){
e.ueditor.fireEvent("reportAddNum",121548,12,1);
var t=e.$list.children().eq(O.articleSelectIdx),i=t.prev();
t.insertBefore(i),e._updateTitleTips(),O.articleSelectIdx--;
}
}),$(".js_appmsg_action").on("click",".js_down",function(){
if(e._saving!==!0){
e.ueditor.fireEvent("reportAddNum",121548,13,1);
var t=e.$list.children().eq(O.articleSelectIdx),i=t.next();
i.insertBefore(t),e._updateTitleTips(),O.articleSelectIdx++;
}
}),$("#js_btn_account_opr").on("mouseover",function(){
$("#js_div_account_opr").is(":hidden")&&(e.accountMouseOverId&&clearTimeout(e.accountMouseOverId),
e.accountMouseOverId=setTimeout(function(){
e.ueditor.fireEvent("reportAddNum","122333","108",1);
},50));
}),$("body").on("click","a",function(t){
var i=$(this).attr("href"),r=$(this).attr("target");
if("_blank"!==r&&"string"==typeof i&&0!==i.indexOf("javascript:")&&0!==i.indexOf("#")){
e.reportAclick({
href:i
});
var a=e.getData()||!1,n=e._deserializeReadOnlyType();
if(2&n.right)return t.preventDefault(),void u.show({
type:"warn",
msg:"如果离开此页面，当前页面数据将丢失！",
buttons:[{
text:"留在此页面",
click:function(){
this.remove();
}
},{
text:"离开此页面",
type:"normal",
click:function(){
window.onbeforeunload=null,4==n.index&&k.saveConflict(a,e.app_id,e.data_seq,e.conflict_ls_seq),
location.href=i,this.remove();
}
}]
});
if(M(a,e.lastData))return void(e.draft&&e.draft.clear());
t.preventDefault();
var o=1==wx.cgiData.isNew?"是否保存当前图文消息内容？":"是否保存此次修改？";
u.show({
type:"info",
msg:o,
buttons:[{
text:"保存",
click:function(){
e.save($("#js_submit"),function(){
window.onbeforeunload=null,p.remove(),$("#js_save_success").show(),location.href=i;
}),this.remove();
}
},{
text:"不保存",
type:"normal",
click:function(){
e.draft&&e.draft.clear(),window.onbeforeunload=null,location.href=i,this.remove();
}
}]
});
}
}),e.ueditor.addListener("is_article_data_inited",function(){
return e._g.hasInitArticleData;
}),e.ueditor.addListener("can_change_article",function(t,i){
i.on("click",".js_create_article",function(){
if(e._saving!==!0&&e.ueditor.fireEvent("before_add_article")!==!1){
var t=1*$(this).attr("data-type"),r=e.ueditor.fireEvent("get_article_action_type");
"replace"===r?e.ueditor.fireEvent("before_replace_article",t):"add"===r&&(e._hideActionBtn(),
i.hide(),e._articleChoose("add",t));
}
});
}),e.ueditor.addListener("replace_article",function(t,i){
e._articleChoose("replace",i);
}),e.ueditor.addListener("contentchange",function(){
$("#js_import_tips,#js_draft_tips").hide();
}),e._activeIntervalSave(),window.onbeforeunload=function(t){
var i=e.getData()||!1,r="--------------------------------------------\n如果离开此页面，当前页面数据将丢失！\n--------------------------------------------",a=e._deserializeReadOnlyType();
if(2&a.right){
4==a.index&&k.saveConflict(i,e.app_id,e.data_seq,e.conflict_ls_seq);
try{
t.returnValue=r;
}catch(t){}
return r;
}
if(e.draft){
var n=!M(i,e.lastData);
if(!n)return void e.draft.clear();
try{
t.returnValue=r;
}catch(t){}
return r;
}
},$(window).on("unload",function(){
e._hasAppmsgType()&&window.localStorage&&localStorage.removeItem(O.CACHE_TYPE_KEY),
e.draft&&e.draft.clear();
}),e.ueditor.addListener("is_article_alive",function(e,t){
return t&&t.data("article")&&t.data("article").data&&"function"==typeof t.data("article").data.getData?!0:!1;
}),e.ueditor.addListener("is_article_editing",function(e,t){
return t.hasClass("current")?!0:!1;
}),e.ueditor.addListener("get_current_article",function(){
return e.getCurrentArticle();
}),e.ueditor.addListener("get_current_article_all_img",function(){
var t=e.$current?e.$current.data("article"):null;
return t&&"function"==typeof t.getAllImgData?t.getAllImgData():[];
}),e.ueditor.addListener("article_item_list_scroll",function(){
O.$actionBtn&&!O.$actionBtn.is(":hidden")&&e._updateActionBtn(),e.ueditor.fireEvent("update_action_panel_pos"),
e._g.event.delPopoverScroll(),e.ueditor.fireEvent("reset_replace_popover");
}),e.ueditor.addListener("end_crop_img",function(){
e.crop_img_ing=!1;
}),e.ueditor.addListener("start_crop_img",function(){
e.crop_img_ing=!0;
}),e.ueditor.addListener("getArticleListData",function(){
return{
data:e.getData()
};
}),e.ueditor.addListener("activeStateChange",function(){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];
t.isFocus?e._activeIntervalSave():e._clearIntervalSave();
}),s.on("_preview",function(t){
e._preview(t);
});
},
renderCreateBtn:function(){
if("10"==this.createType)return $("#add_appmsg_container").hide(),$("#jsTxtTips").show(),
void $(".js_editorArea").addClass("share-text__input_h");
if(this.list&&1==this.list.length&&10==this.list[0].share_page_type)return $("#add_appmsg_container").hide(),
$("#jsTxtTips").show(),void $(".js_editorArea").addClass("share-text__input_h");
var e=this.$list.children().length;
e>=this.maxNum?$("#add_appmsg_container").hide():$("#add_appmsg_container").show();
},
reportAclick:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
if(e.href){
var t=location.protocol+"//"+location.host,i="122333",r=null;
0===e.href.indexOf(t+"/?")?r="106":0===e.href.indexOf(t+"/cgi-bin/settingpage?t=setting/index&action=index")?r="109":0===e.href.indexOf(t+"/cgi-bin/frame?t=notification/index_frame")?r="107":0===e.href.indexOf(t+"/acct/wxverifyorder?action=index")?r="110":0===e.href.indexOf(t+"/cgi-bin/settingpage?t=setting/function&action=function")?r="111":0===e.href.indexOf(t+"/cgi-bin/logout?t=wxm-logout")&&(r="112"),
r&&this.ueditor.fireEvent("reportAddNum",i,r,1);
}
},
createArticle:function(e){
var t=this,i=e.type,r=e.action||"add";
b.showDialog({
ueditor:t.ueditor,
can_use_txvideo:wx.cgiData.can_use_txvideo,
type:i,
onOk:function(a){
var n;
n=t[r](0==i?{
isNew:!0
}:{
data:a.data,
isNew:!0
}),t.select({
idx:n.index(),
doNotHideErr:!1,
doNotScroll:!1,
isNewCreate:!0
}),"function"==typeof e.onOk&&e.onOk(n);
},
onCancel:function(){
"function"==typeof e.onCancel&&e.onCancel();
}
});
},
_getArticleDiffData:function(){
var e=200,t=this.getData(),i=[],r=null;
if(t){
for(var a=!0,n=0,o=t.length;o>n;n++)i.push({
content:t[n].content.text().substr(0,e),
title:t[n].title
});
for(var n=0,o=i.length;o>n;n++){
var s=i[n];
if(!s.title||!s.content||s.content.length!=e){
a=!1;
break;
}
for(var d=n+1;o>d;d++){
var c=i[d];
if(!c.title||!c.content||c.content.length!=e){
a=!1;
break;
}
if(s.title==c.title||s.content==c.content){
a=!1;
break;
}
}
if(a===!1)break;
}
a===!0&&i.length>0&&(r=i);
}
return r;
},
_getCurrentIndex:function(){
return this.$current&&this.$current.data("article")?this.$current.data("article").getIndex():0;
},
_updateTitleTips:function(){
var e=0;
if(this.$list.children().each(function(){
var t=$(this);
t.data("msgindex",e),t.children().attr("title","第%s篇图文".sprintf(I[e]));
var i=t.data("article");
i&&i.updateIndex(e),e++;
}),this._g.hasInitArticleData&&this.$current&&this.ueditor.fireEvent("is_use_editor")){
var t=this.$current.data("article");
t&&this.ueditor.updateSeq({
article:t,
seq:1*t.data.get("seq")
});
}
},
_checkExternalLink:function(e){
var t=[],i=$.map(e,function(e,t){
return 0==t.indexOf("content")?e:void 0;
});
if($.each(i,function(e,i){
for(var r=/http\:\/\/([\w-]+\.)+[\w-]+(\:\d*)?(\/[\w\- \.\/\?%&=]*)?/gi,a=null,n="";null!=(a=r.exec(i));)n=i.substring(a.index,r.lastIndex),
g.isLocalDomain(n)||t.push(i.substring(Math.max(0,a.index-20),r.lastIndex));
}),t.length){
var r=(t.length,{
lc:t.length
});
$.each(t,function(e,t){
r["log"+e]=encodeURIComponent(t);
}),$.post("//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_7_1",r);
}
},
getCurrentArticle:function(){
return this.$current||null;
},
getCurrentArticleObject:function(){
return this.$current?this.$current.data("article"):null;
},
add:function(e){
var t=this,i=t.$list.children().length;
i==t.maxNum-1&&t.$list.parent().siblings("a").hide(),i>=0&&t.$accountHeader&&"none"===t.$accountHeader.css("display")&&t.$accountHeader.show();
var r=new b.create({
isNew:e.isNew===!1?!1:!0,
app_id:t.app_id||"",
$infoContainer:$(t.opt.editor_selector),
$articleList:t.$list,
data:e.data,
index:i,
ueditor:t.ueditor,
$freeUEditor:t.freeUEditor,
$navigator:$(".js_main_title"),
cgiData:window.wx.cgiData,
formItemsOpt:t.opt.formItemsOpt
});
return $(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips(),r.getListItem();
},
remove:function(e,t){
var i=this,r=i.$list.children().eq(e);
i.$current&&e!=i.$current.index()&&i.select({
idx:e
});
var a=r.data("article").flush();
return t===!0?i.drop(e):(i._g.delPopover=new f({
dom:O.$actionBtn,
content:$("#js_article_del_popover_tpl").html(),
className:"menu-inside-popover menu-inside-del js_del_pop",
margin:"left_top",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
if(i.ueditor.fireEvent("reportAddNum",121548,24,1),i.drop(O.articleSelectIdx),i.renderCreateBtn(),
i.app_id){
var e=new Image;
e.src="/cgi-bin/reportmaterialoper?oper=1&idx="+O.articleSelectIdx+"&msgid="+i.app_id+"&token="+wx.data.t;
}
i._hideActionBtn(),this.hide();
},
type:"primary"
},{
text:"取消",
click:function(){
i.ueditor.fireEvent("reportAddNum",121548,25,1),i._hideActionBtn(),this.hide();
}
}],
onShow:function(){
var e=i.$list.children().eq(O.articleSelectIdx),t=e.data("article").data.getData(),r=this.$pop.find("#js_del_title").eq(0),a=8===t.share_page_type?t.guide_words||"":t.title;
r.html(t&&a?"："+a+"？":"？"),this.resetPosition($(".js_del")),this.$dom=O.$actionBtn,
i.ueditor.fireEvent("is_article_removing",!0);
},
onHide:function(){
i.ueditor.fireEvent("is_article_removing",!1),i.unbindSpecifyEvent({
dom:window,
type:"domUtils",
eventName:"scroll",
fun:i._g.event.delPopoverScroll
});
}
}),i._g.delPopover.hide(),i._g.delPopover.show(),i.bindEventInterface({
dom:window,
type:"domUtils",
eventName:"scroll",
fun:i._g.event.delPopoverScroll
})),a;
},
replace:function(e){
var t=this;
t.remove(e.idx||0,!0);
var i=new b.create({
isNew:e.isNew===!1?!1:!0,
app_id:t.app_id||"",
$infoContainer:$(t.opt.editor_selector),
$articleList:t.$list,
data:e.data,
index:e.idx||0,
ueditor:t.ueditor,
$freeUEditor:t.freeUEditor,
$navigator:$(".js_main_title"),
cgiData:window.wx.cgiData,
formItemsOpt:t.opt.formItemsOpt
});
return $(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips(),i.getListItem();
},
drop:function(e){
var t=this;
0!=e&&t.select({
idx:Math.max(0,e-1)
});
var i=t.$list.children().eq(e),r=i.data("article");
r&&"function"==typeof r.destroy&&r.destroy(),t.$list.children().eq(e).remove(),t.$list.parent().siblings("a").show(),
$(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips();
},
select:function(){
var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=e.idx,i=e.doNotHideErr,r=e.doNotScroll,a=e.isNewCreate,n=(e.isFromCheckDialog,
this),o="number"!=typeof t?t:n.$list.find(".js_appmsg_item").eq(t);
o.addClass("current");
var s=null;
if(o.siblings().removeClass("current"),O.articleSelectIdx=t,$("#js_locate_risk")){
var d=Number($("#js_locate_risk").attr("index"));
isNaN(d)||d===t?$("#js_locate_risk").css("visibility","visible"):"block"===$("#js_locate_risk").css("display")&&$("#js_locate_risk").css("visibility","hidden");
}
if(n.$current){
if(t==n.$current.index())return void n.ueditor.fireEvent("afterArticleSelect",t);
if(s=n.$current.data("article")){
var c=s.data.getData(),l=E(s.editor.ueditor.body);
c.compose_info=JSON.stringify({
list:S(this.editor.ueditor.body)
}),c.paraLists=T(this.editor.ueditor.body),c.sections=JSON.stringify(l),c.secondAutoAdAvailable=l.secondAutoAdAvailable,
c.autoAdAvailable=l.autoAdAvailable,s.flush(),s.destroy();
}
n._checkRepeat();
}
e.markInited&&(n._g.hasInitArticleData=!0),s=o.data("article"),s&&(!i&&s.hideErrorTips(),
n.$current=o,s.data.getData().is_new_create=a,s.render()),n.ueditor.fireEvent("showContentplaceholder");
var _=$("html"),p=s.getScrollTop(),u=_.scrollTop();
if(O.articleScrollId&&(clearTimeout(O.articleScrollId),O.articleScrollId=null),r||(O.articleScrollId=setTimeout(function(){
var e=Math.max(_.height()-$(window).height(),0);
!r&&p!=u&&e>=p&&_.animate({
scrollTop:p-131
});
},100)),$("#js_appmsg_upload_cover").siblings("ul").hide(),n.ueditor.fireEvent("afterArticleSelect",t),
wx.cgiData.can_see_ad){
var c=s.data.getData(),f=c.insert_ad_mode?c.insert_ad_mode:a?wx.cgiData.insert_ad_mode:v.none,m=-1!==c.content.indexOf("js_cpc_area"),g=-1!==c.content.indexOf("appmsg_edit_ad_preview"),h=m||g?v.op:f;
n.ueditor.fireEvent("setArticleAdMode",h),n.ueditor.fireEvent("setArticleAdCategoriesList",c.categories_list),
setTimeout(function(){
n.ueditor.fireEvent("editAd");
},50);
}
},
_checkRepeat:function(){
try{
var e=function(e,t,i){
var r={};
return e=$.extend(e,t),$.each(i,function(t,i){
r[i]=e[i];
}),r;
},t=this,i=t.$current.index(),r=t.$current.data("article").data,a=["author","digest","file_id","source_url","title","content"],n=e({},r.getData(),a);
if(""==r.get("content")||""==r.get("title"))return;
var o=!0;
if($.each(a,function(e,t){
n[t]&&(o=!1);
}),o)return;
t.$list.find(".js_appmsg_item").each(function(r){
if(r!=i){
var o=e({},$(this).data("article").data.getData(),a);
M(n,o,null,null,!0)&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[repeat][appid:%s,idx:%s,bizuin:%s]".sprintf(28308,1,t.app_id||0,r,wx.data.uin));
}
});
}catch(s){}
},
getData:function(e,t,i,r,a){
var n=this,o=[],s=null,d=n.$current;
d&&(s=d.data("article"),s&&s.flush());
var c=!0;
return n.$list.find(".js_appmsg_item").each(function(s){
var d=$(this).data("article");
if(d){
var l=d.getData(e,t,!t||i,a);
return null==l?(n.select({
idx:s,
doNotHideErr:!0,
doNotScroll:!0,
isNewCreate:!1
}),c=!1,r&&r.hasClass("btn_loading")&&r.btn(!0),!1):void o.push(l);
}
}),0==o.length?!1:c&&o;
},
getPostData:function(e,i,r,a){
var n=this,o=!0;
i&&(o=!1);
var s=n.getData(o,e,null,r,a);
if(!s)return null;
var d={
AppMsgId:n.app_id||wx.cgiData.app_id,
count:s.length,
data_seq:(n.data_seq||"0")+"",
operate_from:t(),
isnew:0
};
return a&&(B={
AppMsgId:n.app_id||wx.cgiData.app_id,
count:s.length
},s.forEach(function(e,t){
var i=e.compose_info;
B["compose_info"+t]=i;
})),$.each(s,function(e,t){
var i={};
$.each(t,function(r,n){
if("writerid"==r&&""==n&&(n=0),"title"===r&&8==t.share_page_type&&(n="分享图片"),i[r+e]=n,
"compose_info"===r&&a){
n=JSON.parse(n);
var o=n.list&&n.list.map(function(e){
return{
blockIdx:e.blockIdx,
imgList:e.imgList,
text:e.text
};
});
i[r+e]=JSON.stringify({
list:o
});
}
"content"==r&&10==t.share_page_type&&(i[r]=n);
}),$.extend(d,i);
}),d;
},
updateAppid:function(e){
1*this.app_id!==1*e&&(this.app_id=e,this.$list.find(".js_appmsg_item").each(function(){
var t=$(this).data("article");
t&&"function"==typeof t.updateAppid&&t.updateAppid(e);
}),this.ueditor.updateAppid(e));
},
update:function(e,t){
if(e&&0!=e.length){
var i;
this.$current&&(i=this.$current.index()||0);
for(var r=["content","title","author","digest"],a=0,n=e.length;n>a;a++){
var o=e[a];
if(o){
for(var s=!1,d={},c=0;c<r.length;c++)"undefined"!=typeof o[r[c]]&&(s=!0,d[r[c]]=o[r[c]]);
if(s!==!1){
var l=void 0;
if("undefined"!=typeof d.content&&t&&t["content"+a]){
var _=t["content"+a];
l={
description:"mp editor modify content after save",
level:"info",
data:{
appmsgid:this.app_id,
seq:a,
beforeSaveContent:_.substring(_.length-500),
afterSaveContent:d.content.substring(d.content.length-500)
}
};
}
if(this.$current&&this.$current.index()==a){
var p=this.$current.data("article");
p&&p.data&&"function"==typeof p.data.get&&1*p.data.get("is_share_copyright")!=1&&(l&&this.ueditor.fireEvent("commonLog","article save","after save content",l.data),
p.modifyCurrentEditData(d));
}else{
var p=this.$list.find(".js_appmsg_item").eq(a).data("article");
if(p&&p.data&&"function"==typeof p.data.set&&1*p.data.get("is_share_copyright")!=1){
l&&this.ueditor.fireEvent("commonLog","article save","after save content",l.data);
for(var u in d)p.data.set(u,d[u]);
}
}
}
}
}
this.$current&&this.$current.index()!=i&&this.select({
idx:i,
doNotHideErr:!1,
doNotScroll:!1,
isNewCreate:!1
});
}
},
getSelfCheckData:function(e,t){
var i=this,r=window.wx.cgiData,a=r.bizmediaid,n=r.idx,o=this.getData(e,t),s=this.getPostData(!1,!0),d={
appmsgid:i.app_id,
bizmediaid:a,
idx:n,
updateautocheck:1,
isnew:0,
articlenum:o.length
};
return o&&o.forEach(function(e,t){
var i=e.title,r=e.author,a=e.digest,n=e.content,o=e.guide_words;
d["title"+t]=i,d["author"+t]=r,d["digest"+t]=a,d["content"+t]=n,d["idx"+t]=t,d["guide_words"+t]=o;
}),{
forSensitive:d,
forKeyWords:s
};
},
hideLegalCheck:function(){
$("#legal_check_container").remove(),$("#word_count_container").css("display","inline-block"),
$("#js_checktext").css("display","inline-block");
},
addVideoSnapStatus:function(e,t){
if(e){
var i=e.querySelector(".js_wechannel_msg");
i&&(i.style.display="flex");
var r=e.querySelector(".js_wechannel_msg_text");
r&&(r.innerHTML=t);
var a=e.querySelector(".js_wechannel_card");
a&&a.classList.add("wxw_wechannel_card_disabled");
}
},
changeVideoSnapStatus:function(e){
var t=this.editor.ueditor&&this.editor.ueditor.document;
if(e&&e.err_num)for(var i=0;i<e.err_num;i++){
var r=e.list[i],a=t.querySelector("mpvideosnap[data-id='"+r.export_id+"']");
65211===r.err_code?this.addVideoSnapStatus(a,"该视频动态不可引用"):65212===r.err_code&&this.addVideoSnapStatus(a,"该视频号不可用");
}
},
getParaList:function(){
var e=(this.$current.data("article"),this.getData());
return e;
},
reportConsumeTime:function(e){
var t=(new Date).getTime(),i=t-e;
switch(!0){
case 500>=i&&i>0:
m.setSum(128961,16,1);
break;

case 1e3>=i&&i>500:
m.setSum(128961,17,1);
break;

case 1500>=i&&i>1e3:
m.setSum(128961,18,1);
break;

case 2e3>=i&&i>1500:
m.setSum(128961,19,1);
break;

case 2500>=i&&i>2e3:
m.setSum(128961,20,1);
break;

case 3e3>=i&&i>2500:
m.setSum(128961,21,1);
break;

case 3500>=i&&i>3e3:
m.setSum(128961,22,1);
break;

case 4e3>=i&&i>3500:
m.setSum(128961,23,1);
break;

case 4500>=i&&i>4e3:
m.setSum(128961,24,1);
break;

case i>4500:
m.setSum(128961,25,1);
}
m.send();
},
save:function(e,t,i,a,s,d){
var c=(new Date).getTime(),_=(N.selfcheck_firsttime,N.selfcheck_autocheck,N.hasMustModify,
this._deserializeReadOnlyType());
if(!(1&_.right||this._saving===!0)){
this.ueditor.fireEvent("beforeSaveArticle");
var f=0,m=this;
try{
f=3;
{
m.getData();
}
f=4;
var g=m.getPostData(i||d,null,e);
if(f=5,!g)return void m.hideLegalCheck();
m.hasConfirmed&&(m.hasConfirmed=!1,g.confirm=1),"undefined"!=typeof m.confirm_treatment&&(g.confirm_treatment=m.confirm_treatment),
"undefined"!=typeof m.cover_word&&(g.cover_word=m.cover_word),"undefined"!=typeof m.hint_word&&(g.hint_word=m.hint_word),
e.hasClass("btn_loading")||e.btn(!1),m._saving=!0,r(30,.1,"error"),this.ueditor.fireEvent("beforeWaitAsynAction",{
postData:g,
hasShowTips:!1
}),n.waitAsynAction({
editor:m.ueditor,
callback:function(){
var n=m.getPostData(i||d,null,e,!0);
if(w.post({
url:"/cgi-bin/composeinforeport",
data:B
},function(e){
console.log(e);
}),!n)return $("#legal_check_container").remove(),$("#word_count_container").css("display","inline-block"),
$("#js_checktext").css("display","inline-block"),m._saving=!1,void e.btn(!0);
1===g.confirm&&(n.confirm=1),g.confirm_treatment&&(n.confirm_treatment=g.confirm_treatment),
g.cover_word&&(n.cover_word=g.cover_word),g.hint_word&&(n.hint_word=g.hint_word),
n=m.filtercharCode(n),r(31,.1,"error"),m.ueditor.fireEvent("reportAddNum",65080,91,1),
m.reportConsumeTime(c),x.mark("appmsg","saveArticle","end"),x.saveSpeeds("appmsg","saveArticle",28)&&x.send(),
n.remind_flag=N.remind_flag,n.self_check_ticket=N.self_check_ticket;
for(var s=0;n["content"+s]&&s<=m.maxNum;){
var _=n["content"+s],f={
description:"mp editor before save content",
level:"info",
data:{
appmsgid:m.app_id,
seq:s,
beforeSaveContent:_.substring(_.length-500)
}
};
m.ueditor.fireEvent("commonLog","article save","before save content",f.data),s+=1;
}
y.appmsg.save(!0,10,n,function(i){
$("#reward_setting_area").find(".reward_text_setting").hasClass("reward_text_error")&&$("#reward_setting_area").find(".reward_text_setting").removeClass("reward_text_error"),
m.confirm_treatment=void 0,m.cover_word=void 0,m._saving=!1,e.btn(!0),m.updateAppid(i.appMsgId),
m.data_seq=i.data_seq+"",m.update(i.filter_content_html,n),m.lastData=m.getData()||!1,
m.lastData=m.getData()||!1,m.draft&&(m.draft.clear(),m.draft._updateAppid(m.app_id,m.data_seq)),
t(i,n),m._checkExternalLink(n);
},function(t,r,s,d){
switch(m._saving=!1,e.btn(!0),0!=t&&m.select({
idx:1*t
}),+r){
case 64515:
m.ueditor.fireEvent("reportAddNum",65080,92,1),m.readOnlyType="3_4",m.conflict_ls_seq=m.data_seq+"",
m.data_seq=d.data_seq+"",m._renderReadOnly(l.timeFormat(d.update_time),d.operator_name,d.operate_from);
break;

case 200041:
p.err(d.myErrMsg),m.draft=null,m.readOnlyType="3_1",m._renderReadOnly();
break;

case 1530503:
$(".frm_msg.js_warn").text(d.myErrMsg).show(),$("input[name='source_url']").focus(),
p.err(d.myErrMsg);
break;

case 1530504:
$(".page_msg.js_warn").show().find(".profile_link_msg_global").text(d.myErrMsg),
$(window).scrollTop(0),p.err(d.myErrMsg);
break;

case 1530510:
$(".frm_msg.js_warn").text(d.myErrMsg).show(),$("input[name='source_url']").focus(),
p.err(d.myErrMsg);
break;

case 1530511:
$(".page_msg.js_warn").show().find(".profile_link_msg_global").text(d.myErrMsg),
$(window).scrollTop(0),p.err(d.myErrMsg);
break;

case 153007:
case 153008:
case 153009:
case 200042:
case 200043:
case 64601:
case 64602:
case 64603:
case 64604:
case 64605:
case 153010:
u.show({
width:750,
type:"warn",
msg:d.myErrMsg,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 10811:
case 10812:
case 10813:
case 10814:
m.hint_word=d.hint_word.join("|"),new o({
hint_word:d.hint_word,
remind_wording:d.remind_wording,
onHide:function(){
m.confirm_treatment=void 0,m.cover_word=void 0;
},
onChange:function(e,t){
e.find(".js_btn_p").eq(0).enable(),m.cover_word=0==t.checkbox("value")?0:1;
},
buttons:[{
text:"继续保存",
type:"primary",
click:function(){
this.remove(),m.confirm_treatment=d.confirm_treatment,e.trigger("click");
}
},{
text:"取消",
click:function(){
m.confirm_treatment=void 0,m.cover_word=void 0,this.remove();
}
}]
});
break;

case 13002:
$(".js_ad_tips_wording").text(d.myErrMsg),$(".js_ad_error_tips").parent().show(),
$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 13003:
var c="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token="+wx.data.t+"&type=10&appmsgid="+d.ad_article_msgid+"&isMul=1";
$(".js_ad_tips_wording").html('已有文章<a href="%s" target="_blank">《%s》</a>过该广告卡片，一个广告卡片仅可插入一篇文章'.sprintf(c,d.ad_article_title)),
$(".js_ad_error_tips").parent().show(),$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 13004:
$(".js_ad_tips_wording").text(d.myErrMsg),$(".js_ad_error_tips").parent().show(),
$(".js_ad_error_tips").show(),a&&a.fireEvent("scrollIntoView",$(".js_ad_preview"),$(window).height()-$(".js_ad_preview").height()-72-30);
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
u.show({
type:"info",
msg:s||"你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
buttons:[{
text:i?"继续预览":"继续保存",
click:function(){
this.remove(),m.hasConfirmed=!0,m.confirm_treatment=d.confirm_treatment,e.trigger("click"),
i||m._remindReport(1,d.remind_type,JSON.stringify(d.hint_word));
}
},{
text:"取消",
type:"normal",
click:function(){
m._remindReport(2,d.remind_type,JSON.stringify(d.hint_word)),m.confirm_treatment=void 0,
m.cover_word=void 0,this.remove();
}
}],
close:function(){
return m._remindReport(0,d.remind_type,JSON.stringify(d.hint_word)),m.confirm_treatment=void 0,
m.cover_word=void 0,!0;
}
});
break;

case 153012:
setTimeout(function(){
$("html, body").animate({
scrollTop:$(".origined").offset().top-60
});
},100),$("#original_type_msg").show();
break;

case 64518:
p.err("保存失败，不允许包含多个投票");
break;

case 64519:
p.err("保存失败，包含了不属于该公众号的投票");
break;

case 64713:
p.err("因原视频被取消原创，导致转载视频无法播放，请重新上传视频");
break;

case 64712:
p.err("因原视频被删除，导致转载视频无法播放，请重新上传视频");
break;

case 64701:
p.err("不是有效的公众号原创文章链接");
break;

case 64520:
p.err("保存失败，包含了未发布的投票");
break;

case 442001:
p.err("帐号新建/编辑素材能力已被封禁，暂不可使用。");
break;

case 353001:
for(var _=[],f=0;20>f;f++){
var g="content"+f;
if(!n[g])break;
_.push({
content:n[g]
});
}
m.update(_),u.show({
type:"warn",
msg:"文章内商品存在违规，请删除后群发",
buttons:[{
text:"返回编辑",
type:"primary",
click:function(){
this.remove();
}
}],
onHide:function(){
this.remove();
}
});
break;

case 202700:
var t="保存失败，红包封面数据异常";
if(d&&d.cover_uri_info_list&&d.cover_uri_info_list.list&&d.cover_uri_info_list.list.length>0){
for(var h=[],v=0,w=d.cover_uri_info_list.list.length;w>v;v++){
var x=d.cover_uri_info_list.list[v];
1*x.status>0&&h.push(x);
}
0===h.length?p.err(t):m.editor.fireEvent("showRedPackageCoverDialog",{
errorData:h
});
}else p.err(t);
break;

case 202701:
p.err("保存失败，每篇图文最多插入三款红包封面");
break;

case 202702:
p.err("请删除红包封面后再保存");
break;

case 202606:
p.err("请重新选择正确的价格"),wx.cgiData.price_option_list=d.price_option_list.map(function(e){
return{
label:"¥"+e/100,
value:1*e
};
});
break;

case 10801:
case 10802:
case 10804:
case 10806:
var y="你所编辑的信息可能含有违反公众平台协议，相关法律法规和政策的内容，请仔细检查后再保存或发布该信息。";
p.err(""===s?y:s);
break;

case 64715:
var b=d.check_copyright_declare_resp_info;
m.data_seq=""+d.data_seq,C.fireEvent("showMassSendOriginalDialog",{
list:b?b.check_copyright_declare_resp_list:[]
},function(){
p.suc("保存成功");
});
break;

case 64707:
$("#reward_setting_area").find(".reward_text_setting").addClass("reward_text_error"),
p.err(d&&d.myErrMsg);
break;

case 203001:
p.err("文章插入读者讨论卡片数超出上限");
break;

case 203002:
p.err("读者讨论能力已被封禁，文章不能包含读者讨论卡片");
break;

case 203003:
p.err("尚未开通读者讨论功能，文章不能包含读者讨论卡片");
break;

case 202901:
p.err("文章插入直播间超过数量限制");
break;

case 202902:
p.err("文章插入直播间失败");
break;

case 202903:
p.err("没有权限插入直播间");
break;

case 202905:
p.err("直播能力已被封禁，文章不能包含直播卡片");
break;

case 202906:
p.err("文章插入直播间已过期");
break;

case 200050:
p.err("文章插入视频号卡片数超出上限");
break;

case 200051:
p.err("文章插入视频号卡片能力已被封禁");
break;

case 65211:
var k=d.video_snap_errmsg&&d.video_snap_errmsg.err_num?d.video_snap_errmsg.err_num:0;
p.err("有%s个视频号动态不可引用，请删除或者更换。".sprintf(k)),m.changeVideoSnapStatus(d.video_snap_errmsg);
break;

case 65212:
var j=d.video_snap_errmsg&&d.video_snap_errmsg.err_num?d.video_snap_errmsg.err_num:0;
p.err("有%s个视频号动态不可引用，请删除或者更换。".sprintf(j)),m.changeVideoSnapStatus(d.video_snap_errmsg);
break;

default:
var t=d&&d.myErrMsg?d.myErrMsg:"保存失败("+r+")";
p.err(t);
}
m.hideLegalCheck();
});
}
}),f=6;
}catch(h){
m._saving=!1,e.btn(!0),p.err("保存失败，请稍后再试"),f&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_save_error;errmsg:%s,appid:%s,bizuin:%s".sprintf(28308,f,h.message,m.app_id||0,wx.data.uin)),
"undefined"!=typeof window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&h&&h.stack&&window.WX_BJ_REPORT.BadJs.report("EventError","editor_save_error",{
mid:window.PAGE_MID,
stack:h.stack
}),h.stack&&console&&console.error&&console.error("[BJ-REPORT]",h.stack);
}
}
},
_remindReport:function(e,t,i){
var r=this;
w.post({
url:"/cgi-bin/appmsg?action=remind_report",
data:{
appmsgid:r.app_id,
operate_type:e,
remind_type:t,
hint_words:i
}
});
},
filtercharCode:function(e){
var t=!1;
for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i].replace&&(e[i]=e[i].replace(/[\ud800-\uDFFF]/g,function(e,i,r){
return/[\ud800-\udbff]/.test(e)&&/[\uDC00-\uDFFF]/.test(r.charAt(i+1)||"")?e:/[\ud800-\udbff]/.test(r.charAt(i-1)||"")&&/[\uDC00-\uDFFF]/.test(e)?e:(t=!0,
"");
}));
return t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_11_1"),e;
},
preview:function(e,t,i){
var r=this;
r.save($("#js_preview"),function(a){
var n=wx.cgiData,o=n.selfcheck_autocheck,s=n.can_use_selfcheck;
if(!a.appMsgId&&s&&o)return void i(a,1);
for(var d=r.getPostData(),c=r.getData(),l=0;8>l;l++)d["content"+l]&&(d["content"+l]=e.handlerContent(d["content"+l],!0),
d["content"+l]=d["content"+l].replace("/cgi-bin/readtemplate?t=tmpl/cpc_tmpl","/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&preview=1")),
c&&c[l]&&(d["ad_info"+l]=c[l].ad_info);
r._preview({
data:d,
index:r.$current.index(),
allData:c,
editor:e
}),"function"==typeof t&&t(a);
},!0,e,r.$current.index());
},
_preview:function(e){
var t=this,i=t.getPostData();
new a({
AppMsgId:i.AppMsgId,
type:2,
hasConfirmed:t.hasConfirmed,
selectFun:t.select,
uin:wx.data.uin,
token:wx.data.t,
nickname:wx.data.nick_name,
pData:e
});
}
});
return R;
});define("tpl/media/appmsg_edit/article.html.js",[],function(){
return'<div id="read_only_container" class="page_msg mini" style="display:none;">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n        <div class="msg_content">\n            <p></p>\n            <span class="js_close msg_closed" style="display:none;">关闭</span>\n        </div>\n    </div>\n</div>\n\n<!--todo: BEGIN 视频尾贴顶部 tips-->\n<div class="page_msg mini advert_tips hide">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n        <div class="msg_content">\n            <p>视频尾部贴片广告已上线<a class="page_msg_link" href="javascript:;">立即开通</a></p>\n            <span class="js_close msg_closed ad_closed">关闭</span>\n        </div>\n    </div>\n</div>\n<!--todo: END 视频尾贴顶部 tips-->\n\n<div class="appmsg_editor">\n    <div class="appmsg_editor_inner">\n        <!-- BEGIN UEDITOR -->\n        <div id="js_ueditor" class="appmsg_edit_item content_edit">\n            <label for="" class="frm_label" style="display:none;">\n                <strong class="title">正文</strong>\n\n                <p class="tips l">\n                    <em id="js_auto_tips"></em>\n                    <a id="js_cancle" style="display:none;" href="javascript:void(0);"\n                       onclick="return false;">取消</a>\n                </p>\n            </label>\n<!--        <div class="frm_msg fail js_catch_tips" style="display:none;">有5张图片粘贴失败</div>\n            <div class="frm_msg fail js_content_error" style="display:none;">正文不能为空且长度不能超过20000字</div> -->\n            <div id="js_editor" class="edui_editor_wrp"></div>\n        </div>\n        <!-- END UEDITOR -->\n\n        <!-- BEGIN 原创文章预览 -->\n        <div id="reprint_article_main" style="display:none;" class="appmsg_edit_origin_preview">\n        </div>\n        <!-- END 原创文章预览 -->\n\n        <!-- BEGIN 广告预览 -->\n        <div class="appmsg_edit_ad_preview js_readonly" style="display: none;">\n            <div class="page_msg mini js_ad_error_tips" style="display: none;">\n                <div class="inner">\n                    <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n                    <div class="msg_content">\n                        <p class="js_ad_tips_wording">该广告为头条广告位，不能插入在非头条文章中。</p>\n                    </div>\n                </div>\n                <span class="msg_closed js_msg_close">关闭</span>\n            </div>\n            <div class="ad_preview_box js_ad_preview"></div>\n            <div class="mpda_preview_ft_tips">\n                <span class="radius_tag js_tag">广告推荐</span><span class="tips_global">文章编辑后需发送给广告主预览，操作请进入<a class="js_jumpToOrder" target="_blank" href="javascript:void(0);">广告订单页面</a></span>\n            </div>\n        </div>\n        <!-- END 广告预览 -->\n\n        <div id="article_setting_area" class="appsmg-editor__after-area" style="display: none;">\n            <div id=\'js_cover_description_area\' class="appmsg-editor__setting-group">\n                <div class="setting-group__title">封面和摘要</div>\n                <div class="setting-group__content setting-group__content_main">\n                    <!--\n                        主要图文+class: setting-group__cover_primary\n                        次要图文+class: setting-group__cover_minor\n                    -->\n                    <div id="js_cover_area" class="setting-group__cover setting-group__cover_primary">\n                        <div class="select-cover__btn js_cover_btn_area">\n                            <i class="icon-add_css"></i>\n                            <span class="btn-text">选择封面</span>\n                        </div>\n                        <div class="select-cover__preview js_cover_preview" style="display: none;"> <!-- 默认隐藏，选中图片后才显示 -->\n                            <div class="select-cover__preview__mask js_cover_btn_area">\n                                <a href="javascript:;" class="icon20_common edit_media_white js_modifyCover" onclick="return false;">修改</a>\n                            </div>\n                            <input type="hidden" class="js_field js_file_id" name="file_id">\n                            <input type="hidden" class="js_field js_cdn_url" name="cdn_url">\n                            <input type="hidden" class="js_field js_cdn_url_back" name="cdn_url_back">\n                            <input type="hidden" class="js_show_cover_pic js_field" data-type=\'checkbox\' name="show_cover_pic">\n                        </div>\n                        <div class="pop-opr__group js_cover_opr js_cover_btn_area">\n                            <ul class="pop-opr__list">\n                                <li class="pop-opr__item">\n                                    <a href="javascript:;" class="pop-opr__button" onclick="return false;" id="js_selectCoverFromContent">从正文选择</a>\n                                </li>\n                                <li class="pop-opr__item">\n                                    <a href="javascript:;" class="pop-opr__button" onclick="return false;" id="js_imagedialog">从图片库选择</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div id="js_description_area" class="setting-group__abstract js_desc_area">\n                        <span class="frm_textarea_box" id="js_description_span">\n                            <textarea id="js_description" placeholder="选填，摘要会在订阅号消息、转发链接等文章外的场景显露，帮助读者快速了解内容，如不填写则默认抓取正文前54字" class="frm_textarea js_desc js_counter js_field" name="digest" max-length="120"></textarea>\n                            <em class="frm_input_append frm_counter">0/120</em>\n                        </span>\n                        <div class="frm_msg fail js_desc_error" style="display:none;"></div>\n                    </div>\n                </div>\n                <div class="frm_msg fail js_cover_error js_error_msg" style="display:none;">必须插入一张图片</div>\n            </div>\n\n            <!-- BEGIN 原创声明 -->\n            <div id="js_original" class="appmsg-editor__setting-group">\n              <div class="setting-group__title">原创声明</div>\n\n              <!-- 未声明原创 -->\n              <div class="setting-group__content js_original_type">\n                <div class="setting-group__switch">\n                  <label class="weui-desktop-switch">\n                    <input class="weui-desktop-switch__input js_original_apply js_ori_setting_checkbox" type="checkbox">\n                    <div class="weui-desktop-switch__box"></div>\n                  </label>\n                  <div>未声明原创</div>\n                </div>\n              </div>\n\n              <!-- 已声明原创 -->\n              <div id="js_original_open" class="setting-group__content js_original_type" style="display:none;">\n                <div class="setting-group__switch">\n                  <label class="weui-desktop-switch">\n                    <input class="weui-desktop-switch__input js_original_apply js_ori_setting_checkbox" type="checkbox">\n                    <div class="weui-desktop-switch__box"></div>\n                  </label>\n                  <div class="js_original_title">已声明原创</div>\n                </div>\n\n                <div class="origined__area js_ori_container">\n                  <div class="origined__area-action js_original_btn">\n                    <div class="origined__area-action-btn js_ori_operate" style="display: none;">\n                      <i class="icon icon-more"></i>\n                    </div>\n                    <div class="weui-desktop-dropdown-menu weui-desktop-dropdown-menu_top js_original_opr" style="left: auto; display: none;">\n                      <ul class="weui-desktop-dropdown__list">\n                        <li class="weui-desktop-dropdown__list-ele">\n                          <div class="weui-desktop-dropdown__list-ele-contain js_original_apply js_edit_ori">编辑声明</div>\n                        </li>\n                        <li class="weui-desktop-dropdown__list-ele js_edit_whitelist">\n                          <div class="weui-desktop-dropdown__list-ele-contain js_original_apply js_edit_whitelist_btn">编辑白名单</div>\n                        </li>\n                        <li class="weui-desktop-dropdown__list-ele">\n                          <div class="weui-desktop-dropdown__list-ele-contain js_original_cancel">撤销声明</div>\n                        </li>\n                      </ul>\n                    </div>\n                  </div>\n                  <div class="origined__main js_ori_info">\n                    <ul class="simple_preview_list tips_global">\n                      <li class="simple_preview_item" {if !can_use_cartoon_copyright}style="display: none;"{/if}>\n                        <label class="simple_preview_label">原创类型</label>\n                        <div class="simple_preview_value js_type"></div>\n                      </li>\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">作者</label>\n                        <div class="simple_preview_value js_author"></div>\n                      </li>\n                      <li class="simple_preview_item" style="display: none;">\n                        <label class="simple_preview_label" for="">文章类别</label>\n                        <div class="simple_preview_value js_classify"></div>\n                      </li>\n                      <!-- 一般图文用到的 -->\n                      {if can_use_original_reprint}\n                      <li class="simple_preview_item js_original_item js_article">\n                          <label class="simple_preview_label" for="">开放转载</label>\n                          <div class="simple_preview_value js_can_reprint"></div>\n                      </li>\n                      <li class="simple_preview_item" style="display: none;">\n                          <label class="simple_preview_label" for="">允许修改</label>\n                          <div class="simple_preview_value js_can_modify"></div>\n                      </li>\n                      {/if}\n                      {if can_use_reward}\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">赞赏</label>\n                        <div class="simple_preview_value js_reward_tips">未开启</div>\n                      </li>\n                      {/if}\n                      <li class="simple_preview_item js_original_item js_article">\n                        <label class="simple_preview_label">白名单<i class="icon_msg_mini ask js_whitelist_tips"></i></label>\n                        <div class="simple_preview_value">\n                          <div class="original_user_list js_whitelist"></div>\n                        </div>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <!-- END 原创声明 -->\n\n            <!-- BEGIN 付费 -->\n            {if can_use_pay_subscribe}\n            <div class="appmsg-editor__setting-group" id="js_pay_setting_area" style="display: none;">\n              <div class="setting-group__title">付费</div>\n              <div class="setting-group__content">\n                <div class="lbl_content_desc js_pay_open"></div>\n                <div class="setting-group__switch js_pay_open" style="display: none;">\n                  <label class="weui-desktop-switch">\n                    <input data-label="付费图文" class="weui-desktop-switch__input js_pay_setting_checkbox" type="checkbox" {if !can_use_copyright || is_pay_subscribe_block}disabled{/if}>\n                    <div class="weui-desktop-switch__box"></div>\n                  </label>\n                  <div id="payStatementStatus"></div>\n                </div>\n\n                <div class="origined__area" id="js_pay_setting_preview" style="display: none;">\n                  <div class="origined__area-action">\n                    <div class="origined__area-action-btn">\n                      <i class="icon icon-edit" id="js_edit_pay_setting"></i>\n                    </div>\n                  </div>\n                  <div class="origined__main">\n                    <div class="lbl_content_desc simple_preview_item">以下设置仅在原创校验成功后生效</div>\n                    <ul class="simple_preview_list tips_global">\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">付费金额</label>\n                        <div class="simple_preview_value js_amount"></div>\n                      </li>\n                      <li class="simple_preview_item js_desc_wrap">\n                        <label class="simple_preview_label">前言</label>\n                        <div class="simple_preview_value js_desc"></div>\n                      </li>\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">赠送</label>\n                        <div class="simple_preview_value js_can_send_gift"></div>\n                      </li>\n                      <li class="simple_preview_item">\n                        <label class="simple_preview_label">可试读比例</label>\n                        <div class="simple_preview_value js_preview_percent"></div>\n                      </li>\n                    </ul>\n                  </div>\n                </div>\n              </div>\n            </div>\n            {/if}\n            <!-- END 付费 -->\n\n            <div id="article_setting_area2" class="appmsg-editor__setting-group">\n                <!-- BEGIN 视频落地页的原创和赞赏功能，原创纯展示，只有赞赏可操作 -->\n                <div id="reward_setting_area" class="appmsg-editor__setting-group reward_setting_area hide js_pay_hide_item">\n                  <div class="setting-group__title">原创和赞赏</div>\n                \n                  <div class="setting-group__content">\n                    <!-- 原创部分纯展示 -->\n                    <div class="setting-group__switch">\n                      <label class="weui-desktop-switch">\n                        <input class="weui-desktop-switch__input" type="checkbox" checked disabled>\n                        <div class="weui-desktop-switch__box"></div>\n                      </label>\n                      <span>已声明原创</span>\n                      <div class="weui-desktop-popover__wrp video-ori-popover__bd">\n                        <span class="weui-desktop-popover__target js_video_ori_tips">\n                          <span class="weui-desktop-icon weui-desktop-icon__tips video-ori-popover__icon">\n                            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">\n                              <path d="M9 1.133c4.338 0 7.867 3.528 7.867 7.865 0 1.06-.208 2.088-.619 3.057a7.864 7.864 0 0 1-1.689 2.503 7.862 7.862 0 0 1-2.502 1.689A7.791 7.791 0 0 1 9 16.866a7.791 7.791 0 0 1-3.057-.619 7.862 7.862 0 0 1-2.502-1.69 7.864 7.864 0 0 1-1.69-2.502 7.794 7.794 0 0 1-.618-3.057c0-4.337 3.53-7.865 7.867-7.865zM9 0C4.038 0 0 4.036 0 8.998c0 4.961 4.038 9.001 9 9.001s9-4.04 9-9.001C18 4.036 13.962 0 9 0zm.601 13.966H8.276v-1.394H9.6v1.394zm2.166-6.264c-.142.296-.442.665-.902 1.106-.46.442-.765.757-.915.943-.15.187-.265.41-.342.67-.078.26-.112.608-.102 1.045H8.303c0-.51.041-.918.123-1.223.082-.305.205-.571.369-.8.164-.227.46-.562.888-1.003.428-.442.704-.763.827-.964.123-.2.184-.498.184-.895 0-.396-.141-.746-.423-1.052-.283-.305-.693-.457-1.23-.457-1.211 0-1.817.72-1.817 2.158H6.022c.018-.655.095-1.154.232-1.496.136-.341.355-.646.656-.915.3-.269.635-.467 1.004-.594a3.55 3.55 0 0 1 1.168-.192c.829 0 1.519.244 2.07.731.55.488.826 1.137.826 1.947 0 .365-.07.695-.211.99z"></path>\n                            </svg>\n                          </span>\n                        </span>\n                        <div class="weui-desktop-popover weui-desktop-popover_pos-down-center video-ori-popover__content js_video_ori_area">\n                          <div class="weui-desktop-popover__inner">\n                            <span>视频原创在视频上传时声明，不可修改，详情<a id=\'to-video-list\' href=\'javascript:void(0);\'>前往素材库查看</a></span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                \n                    <!-- 赞赏部分 -->\n                    <div>\n                      <div class="setting-group__switch">\n                        <label class="weui-desktop-switch reward_setting_checkbox">\n                          <input type="checkbox" class="weui-desktop-switch__input js_reward_setting">\n                          <div class="weui-desktop-switch__box"></div>\n                        </label>\n                        <div class="frm_checkbox_label js_reward_normal_status">\n                          <span class="lbl_content reward_text reward_text_setting"></span>\n                          <a href="javascript:void(0);" class="modify_reward_info js_reward_allow_click">修改</a>\n                        </div>\n\n                        <!-- 无法开启赞赏情况 1 : 没有剩余邀请赞赏账户 quota -->\n                        <div class="js_reward_disabled_status" style="display: none;">\n                          <p style="margin-bottom: 5px;">无法开启赞赏，因为还没有赞赏账户授权给本公众号</p>\n                          <p class="info-text_disabled">\n                            <span>如果要取得授权，请到</span><a class="js_reward_mini-program_tips" href="javascript:void(0);">赞赏账户小程序</a>-赞赏账户设置-可收款公众号中添加本公众号。                          </p>\n                          <!-- 无法开启赞赏情况 2 : 有剩余邀请赞赏账户 quota -->\n                          <p class="info-text_disabled js_invite_reward_account" style="display: none;">\n                            如果要创建赞赏账户，你可以发送<a id=\'to-invite\' target=\'_blank\' href=\'javascript:void(0);\'>赞赏账户邀请</a>。                          </p>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n                <!-- END -->\n\n                <!--todo: 这里需要区分视频编辑页的话，这句wording是 ”视频设置“-->\n                <div class="setting-group__title" id="article_type_setting"></div>\n                <!-- 通用纯文本弹窗组件BEGIN@joyduan -->\n                <div class="page_msg mini with_closed page_msg_beta" id="js_show_text_tip" style="display: none;">\n                    <div class="inner">\n                        <div class="msg_content" id="js_show_text_content">\n                            <p> \n                                <!-- 你已经符合开通流量主的条件，现邀请你前往开通，开通后每个月可有广告收益。wording@经理 -->\n                            </p>\n                            <p style="margin-top:10px;display: none;"><a id="js_text_confirm_btn" target="_blank" href="javascript:;" style="margin-right:16px;">立即开通</a><a id="js_text_cancel_btn" href="javascript:;">暂不开通</a></p>\n                        </div>\n                    </div> <span class="msg_closed" id="js_show_text_closed">关闭</span>\n                </div>\n                <!-- 通用纯文本弹窗组件END -->\n                <div class="setting-group__content">\n                    <!-- BEGIN 旧赞赏 -->\n                    <!-- <div id="reward_setting_area" class="setting-group__checkbox-item reward_setting_area hide js_pay_hide_item">\n                        <label class="frm_checkbox_label reward_setting_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_reward_setting" name="">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_reward_allow_click">\n                                <span class="lbl_content">赞赏</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc reward_text reward_text_setting"></span>\n                            </div>\n                        </label>\n                    </div> -->\n                    <!-- END 旧赞赏 -->\n\n                    <!-- BEGIN 弹幕 -->\n                    <div id="js_danmu_area" class="setting-group__checkbox-item">\n                      <label class="frm_checkbox_label" for="">\n                        <input type="checkbox" class="frm_checkbox js_danmu js_field" checked>\n                        <i class="icon_checkbox"></i>\n                        <div class="allow_click_opr js_danmu_allow_click">\n                          <span class="lbl_content js_danmu_text">弹幕</span>\n                          <i class="lbl_content_after read-more__icon__more">icon</i>\n                          <span class="lbl_content_after lbl_content_desc js_danmu_setting_text" style="display:none;"></span>\n                        </div>\n                      </label>\n                    </div>\n                    <!-- END 弹幕 -->\n\n                    <!--todo: BEGIN 视频贴片设置-->\n                    <div class="setting-group__checkbox-item video_dot_area hide js_pay_hide_item" id="video_dot_area">\n                        <label class="frm_checkbox_label">\n                            <input type="checkbox" class="frm_checkbox video_dot_checkbox" name="" id="video_dot_checkbox">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr">\n                                <span class="lbl_content">自定义贴片</span>\n                                <i class="lbl_content_after read-more__icon__more" onclick="return false;">icon</i>\n                                <span class="lbl_content_after lbl_content_desc video_dot_text"></span>\n                                <span class="lbl_content_after lbl_content_desc js_paster_setting_text"></span>\n                            </div>\n                        </label>\n                    </div>\n                    <!--END 视频贴片设置-->\n\n                    {if can_see_ad}\n                    <div id="js_insert_ad_area" class="setting-group__checkbox-item js_pay_hide_item">\n                        <!-- <p class="auto_insert_bottom_tips" style="display: none;">文中广告：已智能插入 <span class="auto_insert_ad_setting">修改</span></p> -->\n                        <label class="frm_checkbox_label" for="js_auto_insert_ad">\n                            <input type="checkbox" class="frm_checkbox js_auto_insert_ad" name="">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_insert_ad_allow_click">\n                                <span class="lbl_content">文中广告智能插入</span>\n                                <i class="lbl_content_after read-more__icon__more" onclick="return false;">icon</i>\n                                <span class="lbl_content_after lbl_content_desc insert_ad_tips" style="display:none;">\n                                    已手动插入文中广告，无法开启自动插入功能                                </span>\n                                <span class="lbl_content_after lbl_content_desc auto_insert_count_tips" style="display:none;"></span>\n                            </div>\n                        </label>\n                    </div>\n                    {/if}\n\n                    <!-- 更多阅读start\n                    <div id="js_article_recommend_area" class="setting-group__checkbox-item">\n                        <label class="frm_checkbox_label" for="js_recommend">\n                            <input type="checkbox" class="frm_checkbox js_recommend js_field" checked>\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_article_recommend_allow_click">\n                                <span class="lbl_content">更多阅读</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc recommend_setting" style="display:none;">智能推荐</span>\n                            </div>\n                        </label>\n                    </div>\n                    更多阅读end-->\n                    <!-- BEGIN 原文链接 -->\n                    <div id="js_article_url_area" class="setting-group__checkbox-item js_url_area js_pay_hide_item">\n                        <label class="frm_checkbox_label" for="js_url_checkbox">\n                            <input type="checkbox" class="frm_checkbox js_url_checkbox js_field" name="source_url_checked">\n                            <i class="icon_checkbox js_url_checkbox_icon"></i>\n                            <div class="allow_click_opr js_article_url_allow_click">\n                                <span class="lbl_content">原文链接</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc lbl_content_desc_url article_url_setting" style="display:none;">https://mp.weixin.qq.com</span>\n                            </div>\n                        </label>\n                        <!-- <span class="frm_input_box" style="display:none;"><input type="text" class="js_url frm_input js_field" name="source_url"></span>\n                        <span class="js_url_ban_wording" style="position:relative; top:1em;"></span>\n                        <div class="profile_link_msg_global source_url frm_msg fail js_warn" style="display:none;">请勿添加其他公众号的主页链接</div>\n                        <div class="frm_msg fail js_url_error" style="display:none;">链接不合法</div> -->\n                    </div>\n                    <!-- END 原文链接 -->\n\n                    <!--todo: BEGIN 视频尾部贴片广告过渡-->\n                    <div id="ad_transition_area" class="setting-group__checkbox-item ad_transition_area hide js_pay_hide_item">\n                        <label class="frm_checkbox_label comment_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_ad_back" name="" id="js_ad_back">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr ad_transition js_ad_allow_click">\n                                <span class="lbl_content">视频后贴广告过渡</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc ad_text ad_text_setting" ></span>\n                            </div>\n                        </label>\n\n                    </div>\n                    <!--END 视频尾部贴片广告过渡-->\n\n                    <!--BEGIN 专辑 -->\n                    <!-- {if can_use_album}\n                    <div id="js_album_area" class="setting-group__checkbox-item" style="display: none;">\n                        <label class="frm_checkbox_label album_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_album js_field" name="need_open_album">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_album_allow_click">\n                                <span class="lbl_content js_album_type">图文专辑</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc album_setting" style="display:none;"></span>\n                            </div>\n                        </label>\n                    </div>\n                    {/if} -->\n                    <!-- END 专辑-->\n\n                    <!--BEGIN 留言 -->\n                    {if can_use_comment}\n                    <div id="js_comment_area" class="setting-group__checkbox-item">\n                        <label class="frm_checkbox_label comment_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_comment js_field" checked name="need_open_comment">\n                            <i class="icon_checkbox"></i>\n                            <div class="allow_click_opr js_comment_allow_click">\n                                <span class="lbl_content">留言</span>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc comment_setting" style="display:none;">所有人均可留言</span>\n                            </div>\n                        </label>\n                        <!-- <div class="comment_radio_wrp" id="js_comment_setting_wrp" style="display:none;">\n                            <input data-label="所有人可留言" class="frm_radio js_comment_setting" type="radio" value="0">\n                            <input data-label="仅关注后可留言" class="frm_radio js_comment_setting" type="radio" value="1">\n                        </div> -->\n                    </div>\n                    {/if}\n                    <!-- END 留言-->\n\n                    <!-- BEGIN 更多视频 --> \n                    <div id="js_related_video_area" class="setting-group__checkbox-item related_video_area js_pay_hide_item" style="display: none;">\n                        <label class="frm_checkbox_label relate_video_checkbox" for="">\n                            <input type="checkbox" class="frm_checkbox js_related_video_checkbox js_field" name="need_open_tags">\n                            <i class="icon_checkbox js_related_video_checkbox_icon"></i>\n                            <div class="allow_click_opr js_related_video_allow_click">\n                                <div class="weui-desktop-popover__wrp related_video_target">\n                                    <span class="weui-desktop-popover__target">\n                                      <span class="lbl_content">观看更多</span>\n                                    </span>\n                                    <div class="weui-desktop-popover weui-desktop-popover_pos-down-left related_video_select js_related_video_select" style="">\n                                      <div class="weui-desktop-popover__inner">\n                                        <h4 class="weui-desktop-popover__title">观看更多</h4>\n                                        <div class="weui-desktop-popover__content">\n                                          <label class="frm_radio_label js_related_video_suggestion">\n                                            <i class="icon_radio js_related_video_radio_suggestion"></i>\n                                            <span class="lbl_content">智能推荐</span><span class="lbl_desc js_recommend_wording">根据观看数据和用户兴趣，推荐最多三条本公众号已群发视频</span>\n                                                <input type="radio" name="js_related_video_type" class="frm_radio">\n                                          </label>\n                                          <label class="frm_radio_label js_related_video_custom">\n                                            <i class="icon_radio js_related_video_radio_custom"></i>\n                                            <span class="lbl_content">指定视频</span><i class="lbl_desc lbl_content_after read-more__icon__more">icon</i>\n                                            <a class="related_video_modify js_relate_video_modify">修改</a>\n                                                <input type="radio" name="js_related_video_type" class="frm_radio">\n                                          </label>\n\n                                          <ul class="related_video_list js_related_list"></ul>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n\n                                <div class="weui-desktop-popover__wrp related_video_target relate_video_target_qa">  \n                                    <span class="weui-desktop-popover__target js_more_video_qa">\n                                    <div class="weui-desktop-icon weui-desktop-icon__tips weui-desktop-icon__small weui-desktop-icon__normal"><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.133c4.338 0 7.867 3.528 7.867 7.865 0 1.06-.208 2.088-.619 3.057a7.864 7.864 0 0 1-1.689 2.503 7.862 7.862 0 0 1-2.502 1.689A7.791 7.791 0 0 1 9 16.866a7.791 7.791 0 0 1-3.057-.619 7.862 7.862 0 0 1-2.502-1.69 7.864 7.864 0 0 1-1.69-2.502 7.794 7.794 0 0 1-.618-3.057c0-4.337 3.53-7.865 7.867-7.865zM9 0C4.038 0 0 4.036 0 8.998c0 4.961 4.038 9.001 9 9.001s9-4.04 9-9.001C18 4.036 13.962 0 9 0zm.601 13.966H8.276v-1.394H9.6v1.394zm2.166-6.264c-.142.296-.442.665-.902 1.106-.46.442-.765.757-.915.943-.15.187-.265.41-.342.67-.078.26-.112.608-.102 1.045H8.303c0-.51.041-.918.123-1.223.082-.305.205-.571.369-.8.164-.227.46-.562.888-1.003.428-.442.704-.763.827-.964.123-.2.184-.498.184-.895 0-.396-.141-.746-.423-1.052-.283-.305-.693-.457-1.23-.457-1.211 0-1.817.72-1.817 2.158H6.022c.018-.655.095-1.154.232-1.496.136-.341.355-.646.656-.915.3-.269.635-.467 1.004-.594a3.55 3.55 0 0 1 1.168-.192c.829 0 1.519.244 2.07.731.55.488.826 1.137.826 1.947 0 .365-.07.695-.211.99z"></path></svg></div>\n                                </span>\n                                    <div class="weui-desktop-popover weui-desktop-popover_pos-down-center js_more_video_area">\n                                    <div class="weui-desktop-popover__inner">\n                                      <div class="weui-desktop-popover__desc">\n                                        观看更多设置跟随全局, 不可针对单篇修改                                      </div>\n                                      <a id="to-global" href="javascript:void(0);">更改全局设置</a>\n                                    </div>\n                                  </div>\n                                \n                                </div>\n                                <i class="lbl_content_after read-more__icon__more">icon</i>\n                                <span class="lbl_content_after lbl_content_desc js_related_video_desc" style="display:none;"></span>                     \n                            </div>\n                        </label>\n                    </div>\n                    <!-- END 更多视频 -->\n\n                    <!-- BEGIN 标签 -->\n                    <div id="js_article_tags_area" class="setting-group__checkbox-item"{if can_use_public_tag !== 1 && realname_type !== 2} style="display: none;"{/if}>\n                      <label class="frm_checkbox_label">\n                        <input type="checkbox" class="frm_checkbox js_article_tags">\n                        <i class="icon_checkbox"></i>\n                        <div class="allow_click_opr js_article_tags_label">\n                          <span class="lbl_content">话题标签</span>\n                          <i class="lbl_content_after read-more__icon__more">icon</i>\n                          <span class="lbl_content_after lbl_content_desc js_article_tags_content"></span>\n                        </div>\n                      </label>\n                    </div>\n                    <!-- END 标签 -->\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- 付费设置教育 -->\n<div id="js_pay_set_education" class="pay__preview-notice" style="display: none;">在此区域调整试读段落</div>\n\n<!-- 临时付费游标 -->\n<div id="js_pay_preview_popup_temp" class="pay__preview-popup-wrp" style="display: none;">\n  <div class="pay__preview-line"></div>\n  <div class="pay__preview-popup">\n    试读至此  </div>\n</div>\n\n<!-- 付费游标 -->\n<div id="js_pay_preview_popup" class="pay__preview-popup-wrp" style="display: none;">\n  <div class="pay__preview-line pay__preview-line_active"></div>\n  <div class="pay__preview-popup pay__preview-popup_active">\n    试读<span class="js_preview_percent"></span>\n  </div>\n</div>\n\n<!-- 付费预览区域遮罩 -->\n<div id="js_pay_preview_popup_mask" class="pay__preview-mask pay__preview-mask_active"></div>';

});define("biz_web/lib/store.js",["biz_web/lib/json.js"],function(e,t,r){
function n(){
try{
return m in window&&window[m];
}catch(e){
return!1;
}
}
function i(e){
return function(){
var t=Array.prototype.slice.call(arguments,0);
t.unshift(a),l.appendChild(a),a.addBehavior("#default#userData"),a.load(m);
var r=e.apply(u,t);
return l.removeChild(a),r;
};
}
function o(e){
return e.replace(p,"___");
}
var a,c=e("biz_web/lib/json.js"),u={},s=window.document,m="localStorage",d="__storejs__";
if(u.disabled=!1,u.set=function(){},u.get=function(){},u.remove=function(){},u.clear=function(){},
u.transact=function(e,t,r){
var n=u.get(e);
null==r&&(r=t,t=null),"undefined"==typeof n&&(n=t||{}),r(n),u.set(e,n);
},u.getAll=function(){},u.serialize=function(e){
return c.stringify2(e);
},u.deserialize=function(e){
if("string"!=typeof e)return void 0;
try{
return c.parse(e);
}catch(t){
return e||void 0;
}
},n())a=window[m],u.set=function(e,t,r){
if(void 0===t)return u.remove(e);
(new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=69271_78_1&t="+Math.random();
try{
a.setItem(e,u.serialize(t));
}catch(n){
(new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=69271_79_1&t="+Math.random(),
n.message&&/exceeded/i.test(n.message)&&/quota/i.test(n.message)&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=69271_81_1&t="+Math.random()),
WX_BJ_REPORT&&WX_BJ_REPORT.BadJs&&WX_BJ_REPORT.BadJs.onError&&WX_BJ_REPORT.BadJs.onError(n,{
mid:"mmbizweb2:monitorLsQuotaExceeded"
}),a.clear();
try{
a.setItem(e,u.serialize(t));
}catch(i){
"function"==typeof r&&r(i);
}
}
return t;
},u.get=function(e,t){
try{
return u.deserialize(a.getItem(e));
}catch(r){
return void("function"==typeof t&&t(r));
}
},u.remove=function(e,t){
try{
a.removeItem(e);
}catch(r){
"function"==typeof t&&t(r);
}
},u.clear=function(e){
try{
a.clear();
}catch(t){
"function"==typeof e&&e(t);
}
},u.getAll=function(){
for(var e={},t=0;t<a.length;++t){
var r=a.key(t);
e[r]=u.get(r);
}
return e;
};else if(s.documentElement.addBehavior){
var l,f;
try{
f=new ActiveXObject("htmlfile"),f.open(),f.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'),
f.close(),l=f.w.frames[0].document,a=l.createElement("div");
}catch(v){
a=s.createElement("div"),l=s.body;
}
var p=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g");
u.set=i(function(e,t,r){
return t=o(t),void 0===r?u.remove(t):(e.setAttribute(t,u.serialize(r)),e.save(m),
r);
}),u.get=i(function(e,t){
return t=o(t),u.deserialize(e.getAttribute(t));
}),u.remove=i(function(e,t){
t=o(t),e.removeAttribute(t),e.save(m);
}),u.clear=i(function(e){
var t=e.XMLDocument.documentElement.attributes;
e.load(m);
for(var r,n=0;r=t[n];n++)e.removeAttribute(r.name);
e.save(m);
}),u.getAll=i(function(e){
for(var t,r=e.XMLDocument.documentElement.attributes,n={},i=0;t=r[i];++i){
var a=o(t.name);
n[t.name]=u.deserialize(e.getAttribute(a));
}
return n;
});
}
try{
u.set(d,d),u.get(d)!=d&&(u.disabled=!0),u.remove(d);
}catch(v){
u.disabled=!0;
}
u.isLocalStorageNameSupported=n,u.enabled=!u.disabled,r.exports=u;
});define("common/wx/mpEditor/plugin/more.js",[],function(){
"use strict";
function t(){
this.editor=null,this.__g={
isFirstClick:!0
};
}
return t.prototype={
getName:function(){
return"more";
},
getExecCommand:function(){
var t=this;
return function(){
!t.editor;
};
},
getType:function(){
return 1;
},
getTitle:function(){
return"更多";
},
getMoreButtonHtml:function(t){
return'<div class="edui-default"><div class="edui-button-wrap edui-default"><div unselectable="on" data-tooltip="'+t+'" class="edui-button-body js_tooltip" onmousedown="return false;"><div class="edui-box edui-icon"></div></div></div></div>';
},
renderMoreToolbarList:function(t){
if(t.length){
var e=document.createElement("div");
e.className="edui-list-body js_toolbar_more_list edui-default",t.append(e);
}
},
initToolBar:function(t){
var e=this,i=t.getUi(),o=this.getTitle(),n=this.getName();
return i[n]=function(t){
return function(n){
var r=[],u=new i.Combox({
editor:n,
items:r,
title:o,
initValue:e.getMoreButtonHtml(o),
className:"js_toolbar_more edui-for-more toolbar_more",
onbuttonclick:function(){
this.showPopup();
var t=this.popup.getDom("content");
e.__g.isFirstClick&&(e.renderMoreToolbarList($(t)),e.__g.isFirstClick=!1);
}
});
return i.buttons[t]=u,n.addListener("selectionchange",function(){
var t=n.queryCommandState("more");
u.setDisabled(-1==t);
}),u;
};
}(n),!0;
}
},t;
});define("common/wx/mpEditor/plugin/templateList.js",["common/wx/media/templateListDialog.js","common/wx/mpEditor/common/eventbus.js"],function(t){
"use strict";
function n(t){
this.domid=t.container||t.domid,this.container=t.container?$(t.container).show():null,
this._o={
token:""
},this._extend(t),this.editor=null,this.info=t.info;
}
var e=(t("common/wx/media/templateListDialog.js"),t("common/wx/mpEditor/common/eventbus.js"));
return n.prototype={
_extend:function(t){
if(t)for(var n in t)this._o[n]=t[n];
},
getName:function(){
return"templatelist";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
{
var t=this;
this._o;
}
return function(){
var n=t.editor;
console.log(n),n&&e.fireEvent("showTemplateDialog",{},function(t){
t&&t.content&&(n.fireEvent("reportAddNum","122333","84","1"),n.insertTemplate(t.content));
});
};
},
getQueryCommandState:function(){
var t=this;
return function(){
var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],e=t.editor;
return e?n.allDomInRange&&n.allDomInRange[0]&&2===e.getDomUtils().isContentEditable({
node:n.allDomInRange[0],
checkParent:!1
})?-1:0:-1;
};
},
getType:function(){
return 0;
},
getTitle:function(){
return"插入图文模版";
},
getContainer:function(){
return this.domid;
}
},n;
});var _extends=Object.assign||function(e){
for(var t=1;t<arguments.length;t++){
var r=arguments[t];
for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);
}
return e;
};
define("common/wx/mpEditor/plugins_list_manage.js",[],function(){
"use strict";
function e(e){
var t=document.getElementById("js_plugins_list");
if(!t||!e)return!1;
for(var i="",n=0,s=e.length;s>n;n++){
var o=e[n],d=r[o.id]||"js_editor_"+o.id;
i+='<li class="tpl_item" id="'+d+'" data-id="'+o.id+'">'+o.name+"</li>\n";
}
t.innerHTML=i+t.innerHTML;
}
function t(e){
if(!e)return{};
for(var t={},i=0,n=e.length;n>i;i++){
var s=e[i],o=r[s.id]||"js_editor_"+s.id;
t[s.id]=_extends({},s,{
domId:o,
index:i
});
}
return t;
}
var r={
1:"js_editor_insertlink",
2:"js_editor_insertweapp",
3:"js_editor_insertad",
4:"editor_insertcpsmoviebook",
5:"js_editor_insertcard",
6:"js_editor_inserttemplate",
7:"js_editor_insertvote",
8:"js_editor_insertquestion",
9:"js_editor_insertsearch",
10:"editor_redpacketcover",
11:"editor_poi",
12:"editor_live",
13:"js_editor_insertVideoSnap"
};
return{
getEditorPluginsMap:t,
createEditorPluginsDom:e
};
});var _extends=Object.assign||function(n){
for(var e=1;e<arguments.length;e++){
var o=arguments[e];
for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i]);
}
return n;
};
define("common/wx/mpEditor/pluginsList.js",["common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/emotion.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio_music.js","common/wx/mpEditor/plugin/weapp.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/adv.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/insert_product.js","common/wx/mpEditor/plugin/cps.js","common/wx/mpEditor/plugin/insertcode.js","common/wx/mpEditor/plugin/blockquote.js","3rd/editor/plugin/insertquestion.js","common/wx/mpEditor/plugin/redPacketCover.js","3rd/editor/plugin/poi.js","3rd/editor/plugin/live.js","common/wx/mpEditor/plugin/insertsearch.js","3rd/editor/common/no_editable.js","common/wx/mpEditor/plugin/importFile.js","3rd/editor/plugin/videosnap.js","common/wx/mpEditor/plugin/pluginsManage.js"],function(n){
"use strict";
function e(){
return{
Vote:r,
Card:s,
Emotion:a,
MyLink:c,
Unlink:_,
AudioMusicPlugin:d,
WeappPlugin:m,
Img:u,
Ad:p,
Video:l,
InsertProduct:w,
InsertCps:g,
InsertCode:j,
Blockquote:v,
InsertQuestion:x,
RedPacketCover:h,
Poi:E,
Live:f,
InsertSearch:b,
InsertVideoChannel:P,
PluginsManage:q
};
}
function o(n){
var e=n.pluginmgr_info_list_map,o=function(n){
return{
container:e[n]?"#"+e[n].domId:"",
can_show_reddot:e[n]&&e[n].reddot,
info:e[n]
};
};
return[new u({
container:"#js_editor_insertimage",
can_show_reddot:1&n.red_dot_flag
}),new l({
container:"#js_editor_insertvideo",
can_use_txvideo:n.can_use_txvideo,
show_share_dialog:n.show_share_dialog,
can_show_reddot:2&n.red_dot_flag
}),new r(_extends({},o(7),{
can_use_vote:void 0==e[7]?0:1
})),new s(_extends({},o(5),{
can_use_card:void 0==e[5]?0:1,
biz_uin:n.biz_uin
})),new p(_extends({},o(3),{
can_see_ad:void 0==e[3]?0:1,
has_ad:n.has_ad
})),new d({
container:n.can_use_voice||n.qqmusic_flag?"#audio_music_plugin_btn":"",
allowAudio:n.can_use_voice,
allowMusic:n.qqmusic_flag,
can_show_reddot:4&n.red_dot_flag
}),new m(_extends({},o(2),{
can_use_weapp_card:void 0==e[2]?0:1
})),new c(_extends({},o(1),{
can_use_hyperlink:n.can_use_hyperlink,
can_use_appmsg_outer_url:n.can_use_appmsg_outer_url
})),new _,new a,new g(_extends({},o(4),{
can_use_cps:void 0==e[4]?0:1,
tipStatus:n.cpsTipStatus
})),new v({}),new x(_extends({},o(8))),new h(_extends({},o(10),{
can_use_redpacketcover:void 0==e[10]?0:1
})),new k({
container:n.can_use_importfile?"#js_import_file":"",
can_use_importfile:n.can_use_importfile
}),new b(_extends({},o(9),{
can_use_mpsearch:1
})),new E(_extends({},o(11),{
can_use_mppoi:1
})),new P(_extends({},o(13),{
can_insert_videosnap:n.can_insert_videosnap
})),new f(_extends({},o(12),{
container:"#editor_live",
can_use_live:void 0==e[12]?0:1
})),new q({
container:"#js_editor_plugins_manage",
listDomId:"js_plugins_list",
curList:n.curList,
pluginClassName:n.plugin_class_name,
menuPluginClassName:n.menu_plugin_class_name,
foldToolbarEventName:n.fold_toolbar_event_name
})];
}
function i(n){
return[new u({
container:n.hasContainer?"#js_editor_insertimage":""
}),new l({
container:n.hasContainer?"#js_editor_insertvideo":"",
can_use_txvideo:n.can_use_txvideo,
show_share_dialog:!1
}),new r({
container:n.can_use_vote&&n.hasContainer?"#js_editor_insertvote":"",
can_use_vote:n.can_use_vote
}),new s({
container:n.can_use_card&&n.hasContainer?"#js_editor_insertcard":"",
biz_uin:n.biz_uin,
can_use_card:n.can_use_card
}),new p({
can_see_ad:!1,
has_ad:0
}),new d({
container:(n.can_use_voice||n.qqmusic_flag)&&n.hasContainer?"#audio_music_plugin_btn":"",
allowAudio:n.can_use_voice,
allowMusic:n.qqmusic_flag
}),new m({
container:n.can_use_weapp_card&&n.hasContainer?"#js_editor_insertweapp":"",
can_use_weapp_card:n.can_use_weapp_card
}),new c({
container:"#js_editor_insertlink",
can_use_hyperlink:n.can_use_hyperlink,
can_use_appmsg_outer_url:n.can_use_appmsg_outer_url
}),new _,new a,new g({
clearProduct:!0
}),new v({}),new x({
container:n.hasContainer?"#js_editor_insertquestion":""
}),new h({
container:"",
can_use_redpacketcover:!1,
remove:!0
}),new b({
container:"",
can_use_mpsearch:!1
}),new E({
container:"",
can_use_mppoi:!1
}),new P({
container:"",
can_insert_videosnap:!1
}),new f({
container:"",
can_use_live:!1
})];
}
function t(n){
var o=e();
for(var i in o)if(o.hasOwnProperty(i))switch(name){
case"Video":
n.content=o[i].beforeSetContent({
isPreview:!1,
html:n.content,
width:n.appmsgTmplVideoWidth
});
break;

case"Ad":
n.content=o[i].beforeSetContent({
html:n.content,
can_see_ad:!1
});
break;

case"InsertProduct":
n.content=o[i].beforeSetContent({
html:n.content,
clearProduct:!0,
isPreview:!1
});
break;

case"InsertCps":
n.content=o[i].beforeSetContent({
html:n.content,
clearProduct:!0,
isPreview:!1
});
break;

default:
"function"==typeof o[i].beforeSetContent&&(n.content=o[i].beforeSetContent({
html:n.content
}));
}
var t=$("<div></div>").html(n.content);
return C.formatUneditablePluginHtml({
$container:t
}),n.content=t.html(),n.content;
}
var r=n("common/wx/mpEditor/plugin/vote.js"),s=n("common/wx/mpEditor/plugin/card.js"),a=n("common/wx/mpEditor/plugin/emotion.js"),c=n("common/wx/mpEditor/plugin/link.js"),_=n("common/wx/mpEditor/plugin/unlink.js"),d=n("common/wx/mpEditor/plugin/audio_music.js"),m=n("common/wx/mpEditor/plugin/weapp.js"),u=n("common/wx/mpEditor/plugin/img.js"),p=n("common/wx/mpEditor/plugin/adv.js"),l=n("common/wx/mpEditor/plugin/video.js"),w=n("common/wx/mpEditor/plugin/insert_product.js"),g=n("common/wx/mpEditor/plugin/cps.js"),j=n("common/wx/mpEditor/plugin/insertcode.js"),v=n("common/wx/mpEditor/plugin/blockquote.js"),x=n("3rd/editor/plugin/insertquestion.js"),h=n("common/wx/mpEditor/plugin/redPacketCover.js"),E=n("3rd/editor/plugin/poi.js"),f=n("3rd/editor/plugin/live.js"),b=n("common/wx/mpEditor/plugin/insertsearch.js"),C=n("3rd/editor/common/no_editable.js"),k=n("common/wx/mpEditor/plugin/importFile.js"),P=n("3rd/editor/plugin/videosnap.js"),q=n("common/wx/mpEditor/plugin/pluginsManage.js");
return{
getList:e,
getEditorPluginsObject:o,
getTemplateEditorPluginsObject:i,
formatTemplateContent:t
};
});