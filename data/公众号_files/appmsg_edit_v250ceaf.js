define("author/author_info_list.js",["author/author_info.js","author/author_popover.js","author/author_utils.js"],function(t){
"use strict";
function i(t){
t.$inputContainer.on("blur",function(){
t.$inputContainer.val()&&t.$inputContainer.trigger("click",{
frm:"blur"
});
}),t.$inputContainer.on("keyup click",function(i,n){
e(),c.getAuthorListId&&(clearTimeout(c.getAuthorListId),c.getAuthorListId=null),
c.authorLoadingId&&(clearTimeout(c.authorLoadingId),c.authorLoadingId=null),"click"!=i.type&&(o({
$highline:t.$highline,
highlineClass:t.highlineClass
}),"function"==typeof t.stateChange&&t.stateChange());
var s=$(this),u=s.val()||"";
if(!u)return void a(t);
(13==i.keyCode||n&&13==n.keyCode)&&(c.authorLoadingId=setTimeout(function(){
r({
listDomOpt:{
info:null,
container:t.$listContainer[0]
},
$author:s
});
},800));
var d=function(o){
c.authorLoadingId&&(clearTimeout(c.authorLoadingId),c.authorLoadingId=null);
var a=s.val()||"";
if(a&&o.nickname==a){
var u=o.writerlist;
u&&1==u.length&&!(1*u[0].author_status)&&1*u[0].can_reward&&"function"==typeof t.stateChange&&t.stateChange(u[0]),
u&&u.length>0&&(!n||n&&"blur"!=n.frm)||13==i.keyCode||n&&13==n.keyCode||(!u||0==u.length)&&n&&"blur"==n.frm?r({
listDomOpt:{
info:u,
container:t.$listContainer[0],
inviteAuthorLink:t.inviteAuthorLink,
onItemClick:h({
$highline:t.$highline,
highlineClass:t.highlineClass,
stateChange:t.stateChange
})
}
}):e(s);
}
};
c.getAuthorListId=setTimeout(function(){
l.searchAuthorList({
nickname:u,
onError:function(){
d({
nickname:u
});
},
onSuccess:function(t){
d(t);
}
});
},200);
}),u.init({
$container:t.$inputContainer.parent()
});
}
function e(){
c.searchListObj&&(c.searchListObj=null,s.remove());
}
function r(t){
c.searchListObj=s.show(t.listDomOpt),t.$author&&t.$author.length>0&&u.stopPopover({
$container:t.$author
});
}
function n(t){
t.$highline&&t.highlineClass&&t.$highline.addClass(t.highlineClass),t.$authorQrcode&&(t.$authorQrcode.addClass("js_show_author_qrcode_popover ").attr("data-writerid",t.data.writerid).attr("data-type","1").attr("data-desc",encodeURIComponent(t.data.author)),
u.resetPopover({
$container:t.$authorQrcode
})),t.$highline&&t.$authorQrcode&&t.$highline[0].contains(t.$authorQrcode[0])?u.init({
$container:t.$highline
}):t.$authorQrcode&&u.init({
$container:t.$authorQrcode
});
}
function o(t){
t.$highline&&t.highlineClass&&t.$highline.removeClass(t.highlineClass),t.$authorQrcode&&t.$authorQrcode.removeClass("js_show_author_qrcode_popover ").removeAttr("data-writerid").removeAttr("data-type","1").removeAttr("data-desc");
}
function a(t){
var i=l.getHistory().author,e=[],n=0,o=1;
i&&i.length>0&&o++;
var a=0,s=function(i,s){
if("[object Array]"===Object.prototype.toString.call(i))for(var u=0,l=i.length;l>u;u++)e.push(i[u]);else if("[object Object]"===Object.prototype.toString.call(i))for(var u=0;u<e.length;u++){
var c=e[u];
c.isHistory&&(i[c.writerid]?e[u]=i[c.writerid]:(e.splice(u,1),u--));
}
if(s>0&&(n=s),a==o&&t.$inputContainer&&0!=t.$inputContainer.length&&!t.$inputContainer.val()){
if(0==e.length)e=null;else{
for(var d={},u=0;u<e.length;u++){
var c=e[u];
d[c.writerid]?(e.splice(u,1),u--):d[c.writerid]=1;
}
e=e.splice(0,4);
}
r({
listDomOpt:{
showLoading:!1,
info:e,
inviteAuthorLink:t.inviteAuthorLink,
botTips:"可以搜索已经授权给你的作者（共%s个）".sprintf(n),
container:t.$listContainer[0],
onItemClick:h({
$highline:t.$highline,
highlineClass:t.highlineClass,
stateChange:t.stateChange
})
}
});
}
};
if(i&&i.length>0){
for(var u=[],c=0,d=i.length;d>c;c++)u.push(i[c].writerid),e.push({
isHistory:!0,
writerid:i[c].writerid
});
l.searchAuthorList({
idArray:u,
onError:function(){
a++,s();
},
onSuccess:function(t){
for(var i={},e=0,r=t.writerlist.length;r>e;e++){
var n=t.writerlist[e];
!n||1*n.author_status||(i[n.writerid]=n);
}
a++,s(i);
}
});
}
l.getAuthorList({
onError:function(){
a++,s();
},
onSuccess:function(t){
for(var i=[],e=0,r=t.writerlist.length;r>e;e++){
var n=t.writerlist[e];
!n||1*n.author_status||i.push(n);
}
a++,s(i,t.totalCnt);
}
});
}
function h(t){
return function(i,e){
c.hideSearchListId&&(clearTimeout(c.hideSearchListId),c.hideSearchListId=null);
var r=e[i];
!r||1*r.author_status||1*r.can_reward==0||(n({
data:r,
$highline:t.$highline,
highlineClass:t.highlineClass
}),"function"==typeof t.stateChange&&t.stateChange(r),this.destroy());
};
}
var s=t("author/author_info.js"),u=t("author/author_popover.js"),l=t("author/author_utils.js"),c={
authorLoadingId:null,
getAuthorListId:null,
hideSearchListId:null,
searchListObj:null
};
return{
initAuthorSearchList:i,
highlineAuthor:n,
resetHighlineAuthor:o,
removeAuthorListDom:e
};
});define("author/author_popover.js",["tpl/author/qrcode_popover.html.js","widget/weui-desktop/author/author_qrcode.css"],function(o){
"use strict";
function t(o){
var t=o.$container||$("body");
t.off("mouseover","."+n.eventClass,p),t.off("mouseout","."+n.eventClass,i),t.on("mouseover","."+n.eventClass,p),
t.on("mouseout","."+n.eventClass,i);
}
function e(o){
var t=o.$container.filter("."+n.eventClass).add(o.$container.find("."+n.eventClass));
t.attr(n.stopPopoverAttr,"1"),d(0);
}
function r(o){
var t=o.$container.filter("."+n.eventClass).add(o.$container.find("."+n.eventClass));
t.removeAttr(n.stopPopoverAttr);
}
var a=o("tpl/author/qrcode_popover.html.js");
o("widget/weui-desktop/author/author_qrcode.css");
var n={
canShow:!0,
hidePopoverId:null,
$authorPopover:null,
$curBindShowtarget:null,
eventClass:"js_show_author_qrcode_popover",
stopPopoverAttr:"data-authorpopoverstop"
},d=function(o){
n.hidePopoverId&&(clearTimeout(n.hidePopoverId),n.hidePopoverId=null),"undefined"==typeof o&&(o=300),
n.hidePopoverId=setTimeout(function(){
n.$authorPopover&&n.$authorPopover.hide(),n.$curBindShowtarget=null;
},o);
},i=function(o){
var t=$(o.target||o.srcElement);
n.$authorPopover&&!$.contains(n.$authorPopover,t)&&n.$curBindShowtarget&&!$.contains(n.$curBindShowtarget,t)&&d();
},p=function(){
if(n.canShow){
var o=$(this);
if("1"!=o.attr(n.stopPopoverAttr)){
n.$curBindShowtarget=o,n.hidePopoverId&&(clearTimeout(n.hidePopoverId),n.hidePopoverId=null);
var t=n.$curBindShowtarget.attr("data-type");
if("2"==t){
var e=decodeURIComponent(n.$curBindShowtarget.attr("data-desc")||""),r=decodeURIComponent(n.$curBindShowtarget.attr("data-bottips")||""),d=n.$curBindShowtarget.attr("data-writerid"),p=n.$curBindShowtarget.attr("data-src");
1==t?(r||(r="扫码查看赞赏账户"),p||(p="/acct/writermgr?action=homepageqrcode&writerid="+d)):2==t&&(e||(e="扫码进入赞赏账户小程序"),
r||(r=""),p||(p="/mpres/htmledition/images/reward/minigram_qr.png")),n.$authorPopover||(n.$authorPopover=$(wx.T(a,{})).appendTo($("body")),
n.$authorPopover.hover(function(){
n.hidePopoverId&&(clearTimeout(n.hidePopoverId),n.hidePopoverId=null);
},i)),n.$authorPopover.find(".js_author_popover_desc").text(e),n.$authorPopover.find(".js_author_popover_botTips").text(r),
n.$authorPopover.find(".js_author_popover_qrcode").attr("src",wx.url(p)),n.$authorPopover.show();
var u=n.$curBindShowtarget[0].getBoundingClientRect(),s=$(window).height(),h=n.$authorPopover.height(),v=n.$authorPopover.width(),c=0;
c="input"==n.$curBindShowtarget[0].tagName.toLowerCase()?u.left-v/2+20:u.left-v/2+u.width/2,
u.bottom+h>s?n.$authorPopover.css({
top:u.top-h+$(window).scrollTop()-20,
left:c
}).addClass("pos_down_center"):n.$authorPopover.css({
top:u.bottom+$(window).scrollTop(),
left:c
}).removeClass("pos_down_center");
}
}
}
};
return{
init:t,
stopPopover:e,
resetPopover:r
};
});define("media/send.js",[],function(){
"use strict";
function s(s,n,a,e){
a.masssendDialog.sendData={
appmsg:s,
cgiData:n,
diff:e
},a.masssendDialog.isShow=!0;
}
return{
send:s
};
});define("common/qq/emoji.js",["widget/emoji.css","biz_common/utils/emoji_data.js"],function(f){
f("widget/emoji.css");
var e='<span class="emoji emoji%s"></span>',a=f("biz_common/utils/emoji_data.js"),b='<img class="icon_emotion_single %s" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"></img>',c={
"☀":"2600",
"☁":"2601",
"☔":"2614",
"⛄":"26c4",
"⚡":"26a1",
"🌀":"1f300",
"🌁":"1f301",
"🌂":"1f302",
"🌃":"1f303",
"🌄":"1f304",
"🌅":"1f305",
"🌆":"1f306",
"🌇":"1f307",
"🌈":"1f308",
"❄":"2744",
"⛅":"26c5",
"🌉":"1f309",
"🌊":"1f30a",
"🌋":"1f30b",
"🌌":"1f30c",
"🌏":"1f30f",
"🌑":"1f311",
"🌔":"1f314",
"🌓":"1f313",
"🌙":"1f319",
"🌕":"1f315",
"🌛":"1f31b",
"🌟":"1f31f",
"🌠":"1f320",
"🕐":"1f550",
"🕑":"1f551",
"🕒":"1f552",
"🕓":"1f553",
"🕔":"1f554",
"🕕":"1f555",
"🕖":"1f556",
"🕗":"1f557",
"🕘":"1f558",
"🕙":"1f559",
"🕚":"1f55a",
"🕛":"1f55b",
"⌚":"231a",
"⌛":"231b",
"⏰":"23f0",
"⏳":"23f3",
"♈":"2648",
"♉":"2649",
"♊":"264a",
"♋":"264b",
"♌":"264c",
"♍":"264d",
"♎":"264e",
"♏":"264f",
"♐":"2650",
"♑":"2651",
"♒":"2652",
"♓":"2653",
"⛎":"26ce",
"🍀":"1f340",
"🌷":"1f337",
"🌱":"1f331",
"🍁":"1f341",
"🌸":"1f338",
"🌹":"1f339",
"🍂":"1f342",
"🍃":"1f343",
"🌺":"1f33a",
"🌻":"1f33b",
"🌴":"1f334",
"🌵":"1f335",
"🌾":"1f33e",
"🌽":"1f33d",
"🍄":"1f344",
"🌰":"1f330",
"🌼":"1f33c",
"🌿":"1f33f",
"🍒":"1f352",
"🍌":"1f34c",
"🍎":"1f34e",
"🍊":"1f34a",
"🍓":"1f353",
"🍉":"1f349",
"🍅":"1f345",
"🍆":"1f346",
"🍈":"1f348",
"🍍":"1f34d",
"🍇":"1f347",
"🍑":"1f351",
"🍏":"1f34f",
"👀":"1f440",
"👂":"1f442",
"👃":"1f443",
"👄":"1f444",
"👅":"1f445",
"💄":"1f484",
"💅":"1f485",
"💆":"1f486",
"💇":"1f487",
"💈":"1f488",
"👤":"1f464",
"👦":"1f466",
"👧":"1f467",
"👨":"1f468",
"👩":"1f469",
"👪":"1f46a",
"👫":"1f46b",
"👮":"1f46e",
"👯":"1f46f",
"👰":"1f470",
"👱":"1f471",
"👲":"1f472",
"👳":"1f473",
"👴":"1f474",
"👵":"1f475",
"👶":"1f476",
"👷":"1f477",
"👸":"1f478",
"👹":"1f479",
"👺":"1f47a",
"👻":"1f47b",
"👼":"1f47c",
"👽":"1f47d",
"👾":"1f47e",
"👿":"1f47f",
"💀":"1f480",
"💁":"1f481",
"💂":"1f482",
"💃":"1f483",
"🐌":"1f40c",
"🐍":"1f40d",
"🐎":"1f40e",
"🐔":"1f414",
"🐗":"1f417",
"🐫":"1f42b",
"🐘":"1f418",
"🐨":"1f428",
"🐒":"1f412",
"🐑":"1f411",
"🐙":"1f419",
"🐚":"1f41a",
"🐛":"1f41b",
"🐜":"1f41c",
"🐝":"1f41d",
"🐞":"1f41e",
"🐠":"1f420",
"🐡":"1f421",
"🐢":"1f422",
"🐤":"1f424",
"🐥":"1f425",
"🐦":"1f426",
"🐣":"1f423",
"🐧":"1f427",
"🐩":"1f429",
"🐟":"1f41f",
"🐬":"1f42c",
"🐭":"1f42d",
"🐯":"1f42f",
"🐱":"1f431",
"🐳":"1f433",
"🐴":"1f434",
"🐵":"1f435",
"🐶":"1f436",
"🐷":"1f437",
"🐻":"1f43b",
"🐹":"1f439",
"🐺":"1f43a",
"🐮":"1f42e",
"🐰":"1f430",
"🐸":"1f438",
"🐾":"1f43e",
"🐲":"1f432",
"🐼":"1f43c",
"🐽":"1f43d",
"😠":"1f620",
"😩":"1f629",
"😲":"1f632",
"😞":"1f61e",
"😵":"1f635",
"😰":"1f630",
"😒":"1f612",
"😍":"1f60d",
"😤":"1f624",
"😜":"1f61c",
"😝":"1f61d",
"😋":"1f60b",
"😘":"1f618",
"😚":"1f61a",
"😷":"1f637",
"😳":"1f633",
"😃":"1f603",
"😅":"1f605",
"😆":"1f606",
"😁":"1f601",
"😂":"1f602",
"😊":"1f60a",
"☺":"263a",
"😄":"1f604",
"😢":"1f622",
"😭":"1f62d",
"😨":"1f628",
"😣":"1f623",
"😡":"1f621",
"😌":"1f60c",
"😖":"1f616",
"😔":"1f614",
"😱":"1f631",
"😪":"1f62a",
"😏":"1f60f",
"😓":"1f613",
"😥":"1f625",
"😫":"1f62b",
"😉":"1f609",
"😺":"1f63a",
"😸":"1f638",
"😹":"1f639",
"😽":"1f63d",
"😻":"1f63b",
"😿":"1f63f",
"😾":"1f63e",
"😼":"1f63c",
"🙀":"1f640",
"🙅":"1f645",
"🙆":"1f646",
"🙇":"1f647",
"🙈":"1f648",
"🙊":"1f64a",
"🙉":"1f649",
"🙋":"1f64b",
"🙌":"1f64c",
"🙍":"1f64d",
"🙎":"1f64e",
"🙏":"1f64f",
"🏠":"1f3e0",
"🏡":"1f3e1",
"🏢":"1f3e2",
"🏣":"1f3e3",
"🏥":"1f3e5",
"🏦":"1f3e6",
"🏧":"1f3e7",
"🏨":"1f3e8",
"🏩":"1f3e9",
"🏪":"1f3ea",
"🏫":"1f3eb",
"⛪":"26ea",
"⛲":"26f2",
"🏬":"1f3ec",
"🏯":"1f3ef",
"🏰":"1f3f0",
"🏭":"1f3ed",
"⚓":"2693",
"🏮":"1f3ee",
"🗻":"1f5fb",
"🗼":"1f5fc",
"🗽":"1f5fd",
"🗾":"1f5fe",
"🗿":"1f5ff",
"👞":"1f45e",
"👟":"1f45f",
"👠":"1f460",
"👡":"1f461",
"👢":"1f462",
"👣":"1f463",
"👓":"1f453",
"👕":"1f455",
"👖":"1f456",
"👑":"1f451",
"👔":"1f454",
"👒":"1f452",
"👗":"1f457",
"👘":"1f458",
"👙":"1f459",
"👚":"1f45a",
"👛":"1f45b",
"👜":"1f45c",
"👝":"1f45d",
"💰":"1f4b0",
"💱":"1f4b1",
"💹":"1f4b9",
"💲":"1f4b2",
"💳":"1f4b3",
"💴":"1f4b4",
"💵":"1f4b5",
"💸":"1f4b8",
"🇨🇳":"1f1e81f1f3",
"🇩🇪":"1f1e91f1ea",
"🇪🇸":"1f1ea1f1f8",
"🇫🇷":"1f1eb1f1f7",
"🇬🇧":"1f1ec1f1e7",
"🇮🇹":"1f1ee1f1f9",
"🇯🇵":"1f1ef1f1f5",
"🇰🇷":"1f1f01f1f7",
"🇷🇺":"1f1f71f1fa",
"🇺🇸":"1f1fa1f1f8",
"🔥":"1f525",
"🔦":"1f526",
"🔧":"1f527",
"🔨":"1f528",
"🔩":"1f529",
"🔪":"1f52a",
"🔫":"1f52b",
"🔮":"1f52e",
"🔯":"1f52f",
"🔰":"1f530",
"🔱":"1f531",
"💉":"1f489",
"💊":"1f48a",
"🅰":"1f170",
"🅱":"1f171",
"🆎":"1f18e",
"🅾":"1f17e",
"🎀":"1f380",
"🎁":"1f381",
"🎂":"1f382",
"🎄":"1f384",
"🎅":"1f385",
"🎌":"1f38c",
"🎆":"1f386",
"🎈":"1f388",
"🎉":"1f389",
"🎍":"1f38d",
"🎎":"1f38e",
"🎓":"1f393",
"🎒":"1f392",
"🎏":"1f38f",
"🎇":"1f387",
"🎐":"1f390",
"🎃":"1f383",
"🎊":"1f38a",
"🎋":"1f38b",
"🎑":"1f391",
"📟":"1f4df",
"☎":"260e",
"📞":"1f4de",
"📱":"1f4f1",
"📲":"1f4f2",
"📝":"1f4dd",
"📠":"1f4e0",
"✉":"2709",
"📨":"1f4e8",
"📩":"1f4e9",
"📪":"1f4ea",
"📫":"1f4eb",
"📮":"1f4ee",
"📰":"1f4f0",
"📢":"1f4e2",
"📣":"1f4e3",
"📡":"1f4e1",
"📤":"1f4e4",
"📥":"1f4e5",
"📦":"1f4e6",
"📧":"1f4e7",
"🔠":"1f520",
"🔡":"1f521",
"🔢":"1f522",
"🔣":"1f523",
"🔤":"1f524",
"✒":"2712",
"💺":"1f4ba",
"💻":"1f4bb",
"✏":"270f",
"📎":"1f4ce",
"💼":"1f4bc",
"💽":"1f4bd",
"💾":"1f4be",
"💿":"1f4bf",
"📀":"1f4c0",
"✂":"2702",
"📍":"1f4cd",
"📃":"1f4c3",
"📄":"1f4c4",
"📅":"1f4c5",
"📁":"1f4c1",
"📂":"1f4c2",
"📓":"1f4d3",
"📖":"1f4d6",
"📔":"1f4d4",
"📕":"1f4d5",
"📗":"1f4d7",
"📘":"1f4d8",
"📙":"1f4d9",
"📚":"1f4da",
"📛":"1f4db",
"📜":"1f4dc",
"📋":"1f4cb",
"📆":"1f4c6",
"📊":"1f4ca",
"📈":"1f4c8",
"📉":"1f4c9",
"📇":"1f4c7",
"📌":"1f4cc",
"📒":"1f4d2",
"📏":"1f4cf",
"📐":"1f4d0",
"📑":"1f4d1",
"🎽":"1f3bd",
"⚾":"26be",
"⛳":"26f3",
"🎾":"1f3be",
"⚽":"26bd",
"🎿":"1f3bf",
"🏀":"1f3c0",
"🏁":"1f3c1",
"🏂":"1f3c2",
"🏃":"1f3c3",
"🏄":"1f3c4",
"🏆":"1f3c6",
"🏈":"1f3c8",
"🏊":"1f3ca",
"🚃":"1f683",
"🚇":"1f687",
"Ⓜ":"24c2",
"🚄":"1f684",
"🚅":"1f685",
"🚗":"1f697",
"🚙":"1f699",
"🚌":"1f68c",
"🚏":"1f68f",
"🚢":"1f6a2",
"✈":"2708",
"⛵":"26f5",
"🚉":"1f689",
"🚀":"1f680",
"🚤":"1f6a4",
"🚕":"1f695",
"🚚":"1f69a",
"🚒":"1f692",
"🚑":"1f691",
"🚓":"1f693",
"⛽":"26fd",
"🅿":"1f17f",
"🚥":"1f6a5",
"🚧":"1f6a7",
"🚨":"1f6a8",
"♨":"2668",
"⛺":"26fa",
"🎠":"1f3a0",
"🎡":"1f3a1",
"🎢":"1f3a2",
"🎣":"1f3a3",
"🎤":"1f3a4",
"🎥":"1f3a5",
"🎦":"1f3a6",
"🎧":"1f3a7",
"🎨":"1f3a8",
"🎩":"1f3a9",
"🎪":"1f3aa",
"🎫":"1f3ab",
"🎬":"1f3ac",
"🎭":"1f3ad",
"🎮":"1f3ae",
"🀄":"1f004",
"🎯":"1f3af",
"🎰":"1f3b0",
"🎱":"1f3b1",
"🎲":"1f3b2",
"🎳":"1f3b3",
"🎴":"1f3b4",
"🃏":"1f0cf",
"🎵":"1f3b5",
"🎶":"1f3b6",
"🎷":"1f3b7",
"🎸":"1f3b8",
"🎹":"1f3b9",
"🎺":"1f3ba",
"🎻":"1f3bb",
"🎼":"1f3bc",
"〽":"303d",
"📷":"1f4f7",
"📹":"1f4f9",
"📺":"1f4fa",
"📻":"1f4fb",
"📼":"1f4fc",
"💋":"1f48b",
"💌":"1f48c",
"💍":"1f48d",
"💎":"1f48e",
"💏":"1f48f",
"💐":"1f490",
"💑":"1f491",
"💒":"1f492",
"🔞":"1f51e",
"©":"a9",
"®":"ae",
"™":"2122",
"ℹ":"2139",
"#⃣":"2320e3",
"1⃣":"3120e3",
"2⃣":"3220e3",
"3⃣":"3320e3",
"4⃣":"3420e3",
"5⃣":"3520e3",
"6⃣":"3620e3",
"7⃣":"3720e3",
"8⃣":"3820e3",
"9⃣":"3920e3",
"0⃣":"3020e3",
"🔟":"1f51f",
"📶":"1f4f6",
"📳":"1f4f3",
"📴":"1f4f4",
"🍔":"1f354",
"🍙":"1f359",
"🍰":"1f370",
"🍜":"1f35c",
"🍞":"1f35e",
"🍳":"1f373",
"🍦":"1f366",
"🍟":"1f35f",
"🍡":"1f361",
"🍘":"1f358",
"🍚":"1f35a",
"🍝":"1f35d",
"🍛":"1f35b",
"🍢":"1f362",
"🍣":"1f363",
"🍱":"1f371",
"🍲":"1f372",
"🍧":"1f367",
"🍖":"1f356",
"🍥":"1f365",
"🍠":"1f360",
"🍕":"1f355",
"🍗":"1f357",
"🍨":"1f368",
"🍩":"1f369",
"🍪":"1f36a",
"🍫":"1f36b",
"🍬":"1f36c",
"🍭":"1f36d",
"🍮":"1f36e",
"🍯":"1f36f",
"🍤":"1f364",
"🍴":"1f374",
"☕":"2615",
"🍸":"1f378",
"🍺":"1f37a",
"🍵":"1f375",
"🍶":"1f376",
"🍷":"1f377",
"🍻":"1f37b",
"🍹":"1f379",
"↗":"2197",
"↘":"2198",
"↖":"2196",
"↙":"2199",
"⤴":"2934",
"⤵":"2935",
"↔":"2194",
"↕":"2195",
"⬆":"2b06",
"⬇":"2b07",
"➡":"27a1",
"⬅":"2b05",
"▶":"25b6",
"◀":"25c0",
"⏩":"23e9",
"⏪":"23ea",
"⏫":"23eb",
"⏬":"23ec",
"🔺":"1f53a",
"🔻":"1f53b",
"🔼":"1f53c",
"🔽":"1f53d",
"⭕":"2b55",
"❌":"274c",
"❎":"274e",
"❗":"2757",
"⁉":"2049",
"‼":"203c",
"❓":"2753",
"❔":"2754",
"❕":"2755",
"〰":"3030",
"➰":"27b0",
"➿":"27bf",
"❤":"2764",
"💓":"1f493",
"💔":"1f494",
"💕":"1f495",
"💖":"1f496",
"💗":"1f497",
"💘":"1f498",
"💙":"1f499",
"💚":"1f49a",
"💛":"1f49b",
"💜":"1f49c",
"💝":"1f49d",
"💞":"1f49e",
"💟":"1f49f",
"♥":"2665",
"♠":"2660",
"♦":"2666",
"♣":"2663",
"🚬":"1f6ac",
"🚭":"1f6ad",
"♿":"267f",
"🚩":"1f6a9",
"⚠":"26a0",
"⛔":"26d4",
"♻":"267b",
"🚲":"1f6b2",
"🚶":"1f6b6",
"🚹":"1f6b9",
"🚺":"1f6ba",
"🛀":"1f6c0",
"🚻":"1f6bb",
"🚽":"1f6bd",
"🚾":"1f6be",
"🚼":"1f6bc",
"🚪":"1f6aa",
"🚫":"1f6ab",
"✔":"2714",
"🆑":"1f191",
"🆒":"1f192",
"🆓":"1f193",
"🆔":"1f194",
"🆕":"1f195",
"🆖":"1f196",
"🆗":"1f197",
"🆘":"1f198",
"🆙":"1f199",
"🆚":"1f19a",
"🈁":"1f201",
"🈂":"1f202",
"🈲":"1f232",
"🈳":"1f233",
"🈴":"1f234",
"🈵":"1f235",
"🈶":"1f236",
"🈚":"1f21a",
"🈷":"1f237",
"🈸":"1f238",
"🈹":"1f239",
"🈯":"1f22f",
"🈺":"1f23a",
"㊙":"3299",
"㊗":"3297",
"🉐":"1f250",
"🉑":"1f251",
"➕":"2795",
"➖":"2796",
"✖":"2716",
"➗":"2797",
"💠":"1f4a0",
"💡":"1f4a1",
"💢":"1f4a2",
"💣":"1f4a3",
"💤":"1f4a4",
"💥":"1f4a5",
"💦":"1f4a6",
"💧":"1f4a7",
"💨":"1f4a8",
"💩":"1f4a9",
"💪":"1f4aa",
"💫":"1f4ab",
"💬":"1f4ac",
"✨":"2728",
"✴":"2734",
"✳":"2733",
"⚪":"26aa",
"⚫":"26ab",
"🔴":"1f534",
"🔵":"1f535",
"🔲":"1f532",
"🔳":"1f533",
"⭐":"2b50",
"⬜":"2b1c",
"⬛":"2b1b",
"▫":"25ab",
"▪":"25aa",
"◽":"25fd",
"◾":"25fe",
"◻":"25fb",
"◼":"25fc",
"🔶":"1f536",
"🔷":"1f537",
"🔸":"1f538",
"🔹":"1f539",
"❇":"2747",
"💮":"1f4ae",
"💯":"1f4af",
"↩":"21a9",
"↪":"21aa",
"🔃":"1f503",
"🔊":"1f50a",
"🔋":"1f50b",
"🔌":"1f50c",
"🔍":"1f50d",
"🔎":"1f50e",
"🔒":"1f512",
"🔓":"1f513",
"🔏":"1f50f",
"🔐":"1f510",
"🔑":"1f511",
"🔔":"1f514",
"☑":"2611",
"🔘":"1f518",
"🔖":"1f516",
"🔗":"1f517",
"🔙":"1f519",
"🔚":"1f51a",
"🔛":"1f51b",
"🔜":"1f51c",
"🔝":"1f51d",
" ":"2003",
" ":"2002",
" ":"2005",
"✅":"2705",
"✊":"270a",
"✋":"270b",
"✌":"270c",
"👊":"1f44a",
"👍":"1f44d",
"☝":"261d",
"👆":"1f446",
"👇":"1f447",
"👈":"1f448",
"👉":"1f449",
"👋":"1f44b",
"👏":"1f44f",
"👌":"1f44c",
"👎":"1f44e",
"👐":"1f450",
"":"2600",
"":"2601",
"":"2614",
"":"26c4",
"":"26a1",
"":"1f300",
"[霧]":"1f301",
"":"1f302",
"":"1f30c",
"":"1f304",
"":"1f305",
"":"1f306",
"":"1f307",
"":"1f308",
"[雪結晶]":"2744",
"":"26c5",
"":"1f30a",
"[火山]":"1f30b",
"[地球]":"1f30f",
"●":"1f311",
"":"1f31b",
"○":"1f315",
"":"1f31f",
"☆彡":"1f320",
"":"1f550",
"":"1f551",
"":"1f552",
"":"1f553",
"":"1f554",
"":"1f555",
"":"1f556",
"":"1f557",
"":"1f558",
"":"23f0",
"":"1f55a",
"":"1f55b",
"[腕時計]":"231a",
"[砂時計]":"23f3",
"":"2648",
"":"2649",
"":"264a",
"":"264b",
"":"264c",
"":"264d",
"":"264e",
"":"264f",
"":"2650",
"":"2651",
"":"2652",
"":"2653",
"":"26ce",
"":"1f33f",
"":"1f337",
"":"1f341",
"":"1f338",
"":"1f339",
"":"1f342",
"":"1f343",
"":"1f33a",
"":"1f33c",
"":"1f334",
"":"1f335",
"":"1f33e",
"[とうもろこし]":"1f33d",
"[キノコ]":"1f344",
"[栗]":"1f330",
"[さくらんぼ]":"1f352",
"[バナナ]":"1f34c",
"":"1f34f",
"":"1f34a",
"":"1f353",
"":"1f349",
"":"1f345",
"":"1f346",
"[メロン]":"1f348",
"[パイナップル]":"1f34d",
"[ブドウ]":"1f347",
"[モモ]":"1f351",
"":"1f440",
"":"1f442",
"":"1f443",
"":"1f444",
"":"1f61d",
"":"1f484",
"":"1f485",
"":"1f486",
"":"1f487",
"":"1f488",
"〓":"2005",
"":"1f466",
"":"1f467",
"":"1f468",
"":"1f469",
"[家族]":"1f46a",
"":"1f46b",
"":"1f46e",
"":"1f46f",
"[花嫁]":"1f470",
"":"1f471",
"":"1f472",
"":"1f473",
"":"1f474",
"":"1f475",
"":"1f476",
"":"1f477",
"":"1f478",
"[なまはげ]":"1f479",
"[天狗]":"1f47a",
"":"1f47b",
"":"1f47c",
"":"1f47d",
"":"1f47e",
"":"1f47f",
"":"1f480",
"":"1f481",
"":"1f482",
"":"1f483",
"[カタツムリ]":"1f40c",
"":"1f40d",
"":"1f40e",
"":"1f414",
"":"1f417",
"":"1f42b",
"":"1f418",
"":"1f428",
"":"1f412",
"":"1f411",
"":"1f419",
"":"1f41a",
"":"1f41b",
"[アリ]":"1f41c",
"[ミツバチ]":"1f41d",
"[てんとう虫]":"1f41e",
"":"1f420",
"":"1f3a3",
"[カメ]":"1f422",
"":"1f423",
"":"1f426",
"":"1f427",
"":"1f436",
"":"1f42c",
"":"1f42d",
"":"1f42f",
"":"1f431",
"":"1f433",
"":"1f434",
"":"1f435",
"":"1f43d",
"":"1f43b",
"":"1f439",
"":"1f43a",
"":"1f42e",
"":"1f430",
"":"1f438",
"":"1f463",
"[辰]":"1f432",
"[パンダ]":"1f43c",
"":"1f620",
"":"1f64d",
"":"1f632",
"":"1f61e",
"":"1f62b",
"":"1f630",
"":"1f612",
"":"1f63b",
"":"1f63c",
"":"1f61c",
"":"1f60a",
"":"1f63d",
"":"1f61a",
"":"1f637",
"":"1f633",
"":"1f63a",
"":"1f605",
"":"1f60c",
"":"1f639",
"":"263a",
"":"1f604",
"":"1f63f",
"":"1f62d",
"":"1f628",
"":"1f64e",
"":"1f4ab",
"":"1f631",
"":"1f62a",
"":"1f60f",
"":"1f613",
"":"1f625",
"":"1f609",
"":"1f645",
"":"1f646",
"":"1f647",
"(/_＼)":"1f648",
"(・×・)":"1f64a",
"|(・×・)|":"1f649",
"":"270b",
"":"1f64c",
"":"1f64f",
"":"1f3e1",
"":"1f3e2",
"":"1f3e3",
"":"1f3e5",
"":"1f3e6",
"":"1f3e7",
"":"1f3e8",
"":"1f3e9",
"":"1f3ea",
"":"1f3eb",
"":"26ea",
"":"26f2",
"":"1f3ec",
"":"1f3ef",
"":"1f3f0",
"":"1f3ed",
"":"1f6a2",
"":"1f376",
"":"1f5fb",
"":"1f5fc",
"":"1f5fd",
"[日本地図]":"1f5fe",
"[モアイ]":"1f5ff",
"":"1f45f",
"":"1f460",
"":"1f461",
"":"1f462",
"[メガネ]":"1f453",
"":"1f45a",
"[ジーンズ]":"1f456",
"":"1f451",
"":"1f454",
"":"1f452",
"":"1f457",
"":"1f458",
"":"1f459",
"[財布]":"1f45b",
"":"1f45c",
"[ふくろ]":"1f45d",
"":"1f4b5",
"":"1f4b1",
"":"1f4c8",
"[カード]":"1f4b3",
"￥":"1f4b4",
"[飛んでいくお金]":"1f4b8",
"":"1f1e81f1f3",
"":"1f1e91f1ea",
"":"1f1ea1f1f8",
"":"1f1eb1f1f7",
"":"1f1ec1f1e7",
"":"1f1ee1f1f9",
"":"1f1ef1f1f5",
"":"1f1f01f1f7",
"":"1f1f71f1fa",
"":"1f1fa1f1f8",
"":"1f525",
"[懐中電灯]":"1f526",
"[レンチ]":"1f527",
"":"1f528",
"[ネジ]":"1f529",
"[包丁]":"1f52a",
"":"1f52b",
"":"1f52f",
"":"1f530",
"":"1f531",
"":"1f489",
"":"1f48a",
"":"1f170",
"":"1f171",
"":"1f18e",
"":"1f17e",
"":"1f380",
"":"1f4e6",
"":"1f382",
"":"1f384",
"":"1f385",
"":"1f38c",
"":"1f386",
"":"1f388",
"":"1f389",
"":"1f38d",
"":"1f38e",
"":"1f393",
"":"1f392",
"":"1f38f",
"":"1f387",
"":"1f390",
"":"1f383",
"[オメデトウ]":"1f38a",
"[七夕]":"1f38b",
"":"1f391",
"[ポケベル]":"1f4df",
"":"1f4de",
"":"1f4f1",
"":"1f4f2",
"":"1f4d1",
"":"1f4e0",
"":"1f4e7",
"":"1f4eb",
"":"1f4ee",
"[新聞]":"1f4f0",
"":"1f4e2",
"":"1f4e3",
"":"1f4e1",
"[送信BOX]":"1f4e4",
"[受信BOX]":"1f4e5",
"[ABCD]":"1f520",
"[abcd]":"1f521",
"[1234]":"1f522",
"[記号]":"1f523",
"[ABC]":"1f524",
"[ペン]":"2712",
"":"1f4ba",
"":"1f4bb",
"[クリップ]":"1f4ce",
"":"1f4bc",
"":"1f4be",
"":"1f4bf",
"":"1f4c0",
"":"2702",
"[画びょう]":"1f4cc",
"[カレンダー]":"1f4c6",
"[フォルダ]":"1f4c2",
"":"1f4d2",
"[名札]":"1f4db",
"[スクロール]":"1f4dc",
"[グラフ]":"1f4c9",
"[定規]":"1f4cf",
"[三角定規]":"1f4d0",
"":"26be",
"":"26f3",
"":"1f3be",
"":"26bd",
"":"1f3bf",
"":"1f3c0",
"":"1f3c1",
"[スノボ]":"1f3c2",
"":"1f3c3",
"":"1f3c4",
"":"1f3c6",
"":"1f3c8",
"":"1f3ca",
"":"1f683",
"":"24c2",
"":"1f684",
"":"1f685",
"":"1f697",
"":"1f699",
"":"1f68c",
"":"1f68f",
"":"2708",
"":"26f5",
"":"1f689",
"":"1f680",
"":"1f6a4",
"":"1f695",
"":"1f69a",
"":"1f692",
"":"1f691",
"":"1f6a8",
"":"26fd",
"":"1f17f",
"":"1f6a5",
"":"26d4",
"":"2668",
"":"26fa",
"":"1f3a1",
"":"1f3a2",
"":"1f3a4",
"":"1f4f9",
"":"1f3a6",
"":"1f3a7",
"":"1f3a8",
"":"1f3ad",
"[イベント]":"1f3aa",
"":"1f3ab",
"":"1f3ac",
"[ゲーム]":"1f3ae",
"":"1f004",
"":"1f3af",
"":"1f3b0",
"":"1f3b1",
"[サイコロ]":"1f3b2",
"[ボーリング]":"1f3b3",
"[花札]":"1f3b4",
"[ジョーカー]":"1f0cf",
"":"1f3b5",
"":"1f3bc",
"":"1f3b7",
"":"1f3b8",
"[ピアノ]":"1f3b9",
"":"1f3ba",
"[バイオリン]":"1f3bb",
"":"303d",
"":"1f4f7",
"":"1f4fa",
"":"1f4fb",
"":"1f4fc",
"":"1f48b",
"":"1f48c",
"":"1f48d",
"":"1f48e",
"":"1f48f",
"":"1f490",
"":"1f491",
"":"1f492",
"":"1f51e",
"":"a9",
"":"ae",
"":"2122",
"[ｉ]":"2139",
"":"2320e3",
"":"3120e3",
"":"3220e3",
"":"3320e3",
"":"3420e3",
"":"3520e3",
"":"3620e3",
"":"3720e3",
"":"3820e3",
"":"3920e3",
"":"3020e3",
"[10]":"1f51f",
"":"1f4f6",
"":"1f4f3",
"":"1f4f4",
"":"1f354",
"":"1f359",
"":"1f370",
"":"1f35c",
"":"1f35e",
"":"1f373",
"":"1f366",
"":"1f35f",
"":"1f361",
"":"1f358",
"":"1f35a",
"":"1f35d",
"":"1f35b",
"":"1f362",
"":"1f363",
"":"1f371",
"":"1f372",
"":"1f367",
"[肉]":"1f356",
"[なると]":"1f365",
"[やきいも]":"1f360",
"[ピザ]":"1f355",
"[チキン]":"1f357",
"[アイスクリーム]":"1f368",
"[ドーナツ]":"1f369",
"[クッキー]":"1f36a",
"[チョコ]":"1f36b",
"[キャンディ]":"1f36d",
"[プリン]":"1f36e",
"[ハチミツ]":"1f36f",
"[エビフライ]":"1f364",
"":"1f374",
"":"2615",
"":"1f379",
"":"1f37a",
"":"1f375",
"":"1f37b",
"":"2934",
"":"2935",
"":"2196",
"":"2199",
"⇔":"2194",
"↑↓":"1f503",
"":"2b06",
"":"2b07",
"":"27a1",
"":"1f519",
"":"25b6",
"":"25c0",
"":"23e9",
"":"23ea",
"▲":"1f53c",
"▼":"1f53d",
"":"2b55",
"":"2716",
"":"2757",
"！？":"2049",
"！！":"203c",
"":"2753",
"":"2754",
"":"2755",
"～":"27b0",
"":"27bf",
"":"2764",
"":"1f49e",
"":"1f494",
"":"1f497",
"":"1f498",
"":"1f499",
"":"1f49a",
"":"1f49b",
"":"1f49c",
"":"1f49d",
"":"1f49f",
"":"2665",
"":"2660",
"":"2666",
"":"2663",
"":"1f6ac",
"":"1f6ad",
"":"267f",
"[旗]":"1f6a9",
"":"26a0",
"":"1f6b2",
"":"1f6b6",
"":"1f6b9",
"":"1f6ba",
"":"1f6c0",
"":"1f6bb",
"":"1f6bd",
"":"1f6be",
"":"1f6bc",
"[ドア]":"1f6aa",
"[禁止]":"1f6ab",
"[チェックマーク]":"2705",
"[CL]":"1f191",
"":"1f192",
"[FREE]":"1f193",
"":"1f194",
"":"1f195",
"[NG]":"1f196",
"":"1f197",
"[SOS]":"1f198",
"":"1f199",
"":"1f19a",
"":"1f201",
"":"1f202",
"[禁]":"1f232",
"":"1f233",
"[合]":"1f234",
"":"1f235",
"":"1f236",
"":"1f21a",
"":"1f237",
"":"1f238",
"":"1f239",
"":"1f22f",
"":"1f23a",
"":"3299",
"":"3297",
"":"1f250",
"[可]":"1f251",
"[＋]":"2795",
"[－]":"2796",
"[÷]":"2797",
"":"1f4a1",
"":"1f4a2",
"":"1f4a3",
"":"1f4a4",
"[ドンッ]":"1f4a5",
"":"1f4a7",
"":"1f4a8",
"":"1f4a9",
"":"1f4aa",
"[フキダシ]":"1f4ac",
"":"2747",
"":"2734",
"":"2733",
"":"1f534",
"":"25fc",
"":"1f539",
"":"2b50",
"[花丸]":"1f4ae",
"[100点]":"1f4af",
"←┘":"21a9",
"└→":"21aa",
"":"1f50a",
"[電池]":"1f50b",
"[コンセント]":"1f50c",
"":"1f50e",
"":"1f510",
"":"1f513",
"":"1f511",
"":"1f514",
"[ラジオボタン]":"1f518",
"[ブックマーク]":"1f516",
"[リンク]":"1f517",
"[end]":"1f51a",
"[ON]":"1f51b",
"[SOON]":"1f51c",
"":"1f51d",
"":"270a",
"":"270c",
"":"1f44a",
"":"1f44d",
"":"261d",
"":"1f446",
"":"1f447",
"":"1f448",
"":"1f449",
"":"1f44b",
"":"1f44f",
"":"1f44c",
"":"1f44e",
"":"1f450"
};
String.prototype.emoji=function(){
for(var f=this.toString(),d=0;d<a.length;d++){
for(;a[d].cn&&-1!=f.indexOf(a[d].cn);)f=f.replace(a[d].cn,b.sprintf(a[d].style));
for(;a[d].hk&&-1!=f.indexOf(a[d].hk);)f=f.replace(a[d].hk,b.sprintf(a[d].style));
for(;a[d].us&&-1!=f.indexOf(a[d].us);)f=f.replace(a[d].us,b.sprintf(a[d].style));
for(;a[d].code&&-1!=f.indexOf(a[d].code);)f=f.replace(a[d].code,b.sprintf(a[d].style));
for(;a[d].web_code&&-1!=f.indexOf(a[d].web_code);)f=f.replace(a[d].web_code,b.sprintf(a[d].style));
for(;a[d].emoji&&-1!=f.indexOf(a[d].emoji);)f=f.replace(a[d].emoji,b.sprintf(a[d].style));
}
for(var i in c)for(;-1!=f.indexOf(i);)f=f.replace(i,e.sprintf(c[i]));
return f;
};
});define("biz_common/utils/string/html.js",[],function(){
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("biz_web/ui/jquery.scrollbar.js",["biz_web/widget/jquery.scrollbar.css"],function(l){
"use strict";
function e(l){
if(t.webkit&&!l)return{
height:0,
width:0
};
if(!t.data.outer){
var e={
border:"none",
"box-sizing":"content-box",
height:"200px",
margin:"0",
padding:"0",
width:"200px"
};
t.data.inner=$("<div>").css($.extend({},e)),t.data.outer=$("<div>").css($.extend({
left:"-1000px",
overflow:"scroll",
position:"absolute",
top:"-1000px"
},e)).append(t.data.inner).appendTo("body");
}
return t.data.outer.scrollLeft(1e3).scrollTop(1e3),{
height:Math.ceil(t.data.outer.offset().top-t.data.inner.offset().top||0),
width:Math.ceil(t.data.outer.offset().left-t.data.inner.offset().left||0)
};
}
function s(){
var l=e(!0);
return!(l.height||l.width);
}
function o(l){
var e=l.originalEvent;
return e.axis&&e.axis===e.HORIZONTAL_AXIS?!1:e.wheelDeltaX?!1:!0;
}
l("biz_web/widget/jquery.scrollbar.css");
var r=!1,t={
data:{
index:0,
name:"scrollbar"
},
macosx:/mac/i.test(navigator.platform),
mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
overlay:null,
scroll:null,
scrolls:[],
webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)
};
t.scrolls.add=function(l){
this.remove(l).push(l);
},t.scrolls.remove=function(l){
for(;$.inArray(l,this)>=0;)this.splice($.inArray(l,this),1);
return this;
};
var i={
autoScrollSize:!0,
autoUpdate:!0,
debug:!1,
disableBodyScroll:!1,
duration:200,
ignoreMobile:!1,
ignoreOverlay:!1,
scrollStep:30,
showArrows:!1,
stepScrolling:!0,
scrollx:null,
scrolly:null,
onDestroy:null,
onInit:null,
onScroll:null,
onUpdate:null
},n=function(l){
t.scroll||(t.overlay=s(),t.scroll=e(),a(),$(window).resize(function(){
var l=!1;
if(t.scroll&&(t.scroll.height||t.scroll.width)){
var s=e();
(s.height!==t.scroll.height||s.width!==t.scroll.width)&&(t.scroll=s,l=!0);
}
a(l);
})),this.container=l,this.namespace=".scrollbar_"+t.data.index++,this.options=$.extend({},i,window.jQueryScrollbarOptions||{}),
this.scrollTo=null,this.scrollx={},this.scrolly={},l.data(t.data.name,this),t.scrolls.add(this);
};
n.prototype={
destroy:function(){
if(this.wrapper){
this.container.removeData(t.data.name),t.scrolls.remove(this);
var l=this.container.scrollLeft(),e=this.container.scrollTop();
this.container.insertBefore(this.wrapper).css({
height:"",
margin:"",
"max-height":""
}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),
this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),
this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),
this.wrapper.remove(),$(document).add("body").off(this.namespace),$.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container]);
}
},
init:function(l){
var e=this,s=this.container,r=this.containerWrapper||s,i=this.namespace,n=$.extend(this.options,l||{}),c={
x:this.scrollx,
y:this.scrolly
},a=this.wrapper,d={
scrollLeft:s.scrollLeft(),
scrollTop:s.scrollTop()
};
if(t.mobile&&n.ignoreMobile||t.overlay&&n.ignoreOverlay||t.macosx&&!t.webkit)return!1;
if(a)r.css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
});else{
if(this.wrapper=a=$("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position","absolute"==s.css("position")?"absolute":"relative").insertBefore(s).append(s),
s.is("textarea")&&(this.containerWrapper=r=$("<div>").insertBefore(s).append(s),
a.addClass("scroll-textarea")),r.addClass("scroll-content").css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
}),s.on("scroll"+i,function(){
$.isFunction(n.onScroll)&&n.onScroll.call(e,{
maxScroll:c.y.maxScrollOffset,
scroll:s.scrollTop(),
size:c.y.size,
visible:c.y.visible
},{
maxScroll:c.x.maxScrollOffset,
scroll:s.scrollLeft(),
size:c.x.size,
visible:c.x.visible
}),c.x.isVisible&&c.x.scroll.bar.css("left",s.scrollLeft()*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",s.scrollTop()*c.y.kx+"px");
}),a.on("scroll"+i,function(){
a.scrollTop(0).scrollLeft(0);
}),n.disableBodyScroll){
var h=function(l){
o(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l);
};
a.on("MozMousePixelScroll"+i,h),a.on("mousewheel"+i,h),t.mobile&&a.on("touchstart"+i,function(l){
var e=l.originalEvent.touches&&l.originalEvent.touches[0]||l,o={
pageX:e.pageX,
pageY:e.pageY
},r={
left:s.scrollLeft(),
top:s.scrollTop()
};
$(document).on("touchmove"+i,function(l){
var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;
s.scrollLeft(r.left+o.pageX-e.pageX),s.scrollTop(r.top+o.pageY-e.pageY),l.preventDefault();
}),$(document).on("touchend"+i,function(){
$(document).off(i);
});
});
}
$.isFunction(n.onInit)&&n.onInit.apply(this,[s]);
}
$.each(c,function(l,r){
var t=null,a=1,d="x"===l?"scrollLeft":"scrollTop",h=n.scrollStep,p=function(){
var l=s[d]();
s[d](l+h),1==a&&l+h>=u&&(l=s[d]()),-1==a&&u>=l+h&&(l=s[d]()),s[d]()==l&&t&&t();
},u=0;
r.scroll||(r.scroll=e._getScroll(n["scroll"+l]).addClass("scroll-"+l),n.showArrows&&r.scroll.addClass("scroll-element_arrows_visible"),
r.mousewheel=function(t){
if(!r.isVisible||"x"===l&&o(t))return!0;
if("y"===l&&!o(t))return c.x.mousewheel(t),!0;
var i=-1*t.originalEvent.wheelDelta||t.originalEvent.detail,n=r.size-r.visible-r.offset;
return(i>0&&n>u||0>i&&u>0)&&(u+=i,0>u&&(u=0),u>n&&(u=n),e.scrollTo=e.scrollTo||{},
e.scrollTo[d]=u,setTimeout(function(){
e.scrollTo&&(s.stop().animate(e.scrollTo,240,"linear",function(){
u=s[d]();
}),e.scrollTo=null);
},1)),t.preventDefault(),!1;
},r.scroll.on("MozMousePixelScroll"+i,r.mousewheel).on("mousewheel"+i,r.mousewheel).on("mouseenter"+i,function(){
u=s[d]();
}),r.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+i,function(o){
if(1!=o.which)return!0;
a=1;
var i={
eventOffset:o["x"===l?"pageX":"pageY"],
maxScrollValue:r.size-r.visible-r.offset,
scrollbarOffset:r.scroll.bar.offset()["x"===l?"left":"top"],
scrollbarSize:r.scroll.bar["x"===l?"outerWidth":"outerHeight"]()
},c=0,f=0;
return $(this).hasClass("scroll-arrow")?(a=$(this).hasClass("scroll-arrow_more")?1:-1,
h=n.scrollStep*a,u=a>0?i.maxScrollValue:0):(a=i.eventOffset>i.scrollbarOffset+i.scrollbarSize?1:i.eventOffset<i.scrollbarOffset?-1:0,
h=Math.round(.75*r.visible)*a,u=i.eventOffset-i.scrollbarOffset-(n.stepScrolling?1==a?i.scrollbarSize:0:Math.round(i.scrollbarSize/2)),
u=s[d]()+u/r.kx),e.scrollTo=e.scrollTo||{},e.scrollTo[d]=n.stepScrolling?s[d]()+h:u,
n.stepScrolling&&(t=function(){
u=s[d](),clearInterval(f),clearTimeout(c),c=0,f=0;
},c=setTimeout(function(){
f=setInterval(p,40);
},n.duration+100)),setTimeout(function(){
e.scrollTo&&(s.animate(e.scrollTo,n.duration),e.scrollTo=null);
},1),e._handleMouseDown(t,o);
}),r.scroll.bar.on("mousedown"+i,function(o){
if(1!=o.which)return!0;
var t=o["x"===l?"pageX":"pageY"],n=s[d]();
return r.scroll.addClass("scroll-draggable"),$(document).on("mousemove"+i,function(e){
var o=parseInt((e["x"===l?"pageX":"pageY"]-t)/r.kx,10);
s[d](n+o);
}),e._handleMouseDown(function(){
r.scroll.removeClass("scroll-draggable"),u=s[d]();
},o);
}));
}),$.each(c,function(l,e){
var s="scroll-scroll"+l+"_visible",o="x"==l?c.y:c.x;
e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s);
}),$.each(c,function(l,e){
$.extend(e,"x"==l?{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:a.width()
}:{
offset:parseInt(s.css("top"),10)||0,
size:s.prop("scrollHeight"),
visible:a.height()
});
}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),$.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[s]),
$.each(c,function(l,e){
var o="x"===l?"left":"top",r="x"===l?"outerWidth":"outerHeight",t="x"===l?"width":"height",i=parseInt(s.css(o),10)||0,c=e.size,a=e.visible+i,d=e.scroll.size[r]()+(parseInt(e.scroll.size.css(o),10)||0);
n.autoScrollSize&&(e.scrollbarSize=parseInt(d*a/c,10),e.scroll.bar.css(t,e.scrollbarSize+"px")),
e.scrollbarSize=e.scroll.bar[r](),e.kx=(d-e.scrollbarSize)/(c-a)||1,e.maxScrollOffset=c-a;
}),s.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop);
},
_getScroll:function(l){
var e={
advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),
simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")
};
return e[l]&&(l=e[l]),l||(l=e.simple),l="string"==typeof l?$(l).appendTo(this.wrapper):$(l),
$.extend(l,{
bar:l.find(".scroll-bar"),
size:l.find(".scroll-element_size"),
track:l.find(".scroll-element_track")
}),l;
},
_handleMouseDown:function(l,e){
var s=this.namespace;
return $(document).on("blur"+s,function(){
$(document).add("body").off(s),l&&l();
}),$(document).on("dragstart"+s,function(l){
return l.preventDefault(),!1;
}),$(document).on("mouseup"+s,function(){
$(document).add("body").off(s),l&&l();
}),$("body").on("selectstart"+s,function(l){
return l.preventDefault(),!1;
}),e&&e.preventDefault(),!1;
},
_updateScroll:function(l,e){
var s=this.container,o=this.containerWrapper||s,r="scroll-scroll"+l+"_visible",i="x"===l?this.scrolly:this.scrollx,n=parseInt(this.container.css("x"===l?"left":"top"),10)||0,c=this.wrapper,a=e.size,d=e.visible+n;
e.isVisible=a-d>1,e.isVisible?(e.scroll.addClass(r),i.scroll.addClass(r),o.addClass(r)):(e.scroll.removeClass(r),
i.scroll.removeClass(r),o.removeClass(r)),"y"===l&&o.css(s.is("textarea")||d>a?{
height:d+t.scroll.height+"px",
"max-height":"none"
}:{
"max-height":d+t.scroll.height+"px"
}),(e.size!=s.prop("scrollWidth")||i.size!=s.prop("scrollHeight")||e.visible!=c.width()||i.visible!=c.height()||e.offset!=(parseInt(s.css("left"),10)||0)||i.offset!=(parseInt(s.css("top"),10)||0))&&($.extend(this.scrollx,{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:c.width()
}),$.extend(this.scrolly,{
offset:parseInt(s.css("top"),10)||0,
size:this.container.prop("scrollHeight"),
visible:c.height()
}),this._updateScroll("x"===l?"y":"x",i));
}
};
var c=n;
$.fn.scrollbar=function(l,e){
return"string"!=typeof l&&(e=l,l="init"),"undefined"==typeof e&&(e=[]),$.isArray(e)||(e=[e]),
this.not("body, .scroll-wrapper").each(function(){
var s=$(this),o=s.data(t.data.name);
(o||"init"===l)&&(o||(o=new c(s)),o[l]&&o[l].apply(o,e));
}),this;
},$.fn.scrollbar.options=i;
var a=$.fn.scrollbar.updateScrollbars=function(){
var l=0,e=0;
return function(s){
var o,i,n,c,d,h,p;
for(o=0;o<t.scrolls.length;o++)c=t.scrolls[o],i=c.container,n=c.options,d=c.wrapper,
h=c.scrollx,p=c.scrolly,(s||n.autoUpdate&&d&&d.is(":visible")&&(i.prop("scrollWidth")!=h.size||i.prop("scrollHeight")!=p.size||d.width()!=h.visible||d.height()!=p.visible))&&(c.init(),
r&&(window.console&&console.log({
scrollHeight:i.prop("scrollHeight")+":"+c.scrolly.size,
scrollWidth:i.prop("scrollWidth")+":"+c.scrollx.size,
visibleHeight:d.height()+":"+c.scrolly.visible,
visibleWidth:d.width()+":"+c.scrollx.visible
},!0),e++));
r&&e>10?(window.console&&console.log("Scroll updates exceed 10"),a=function(){}):(clearTimeout(l),
l=setTimeout(a,300));
};
}();
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("media/appmsg_edit_v2.js",["biz_web/ui/jquery.scrollbar.js","biz_common/utils/string/html.js","common/qq/emoji.js","common/qq/jquery.plugin/btn.js","3rd/editor/editor.js","pages/editor/editor_for_web1.js","media/send.js","author/author_popover.js","author/author_info_list.js","author/author_recent.js","tpl/media/reward_swtich_tips.html.js","author/author_utils.js","common/qq/Class.js","common/wx/mpEditor/common/eventbus.js","common/wx/inputCounter.js","common/wx/Step.js","common/wx/dropdownClassify.js","common/wx/tooltips.js","biz_common/jquery.validate.js","common/wx/Tips.js","biz_common/moment.js","common/wx/preview.js","common/wx/dialog.js","common/wx/popover.js","common/wx/ban.js","common/wx/Cgi.js","common/wx/mpEditor/common/cropImgCgi.js","common/wx/mpEditor/pluginsList.js","common/wx/mpEditor/plugins_list_manage.js","common/wx/mpEditor/plugin/templateList.js","common/wx/mpEditor/plugin/more.js","biz_web/lib/store.js","tpl/media/appmsg_edit/article.html.js","media/article_list.js","media/media_static_data.js","pages/editor/eventBus4Web1.js","3rd/editor/common/monitor.js","common/wx/const.js","common/wx/utils.js","common/wx/speedPerformance.js","common/wx/pagebar.js","tpl/media/audit_fail_tip.html.js","media/get_article_structure.js","common/wx/media/previewDialog.js"],function(e){
"use strict";
function t(e,t,i){
(t||1)>at&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
val:1,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
function i(){
Y.initSpeeds({
type:"appmsg",
pid:34
});
}
function r(e,t){
var i=$(e);
return i.find(".vote_area").length>0?"投票":i.find(".card_iframe").length>0?"卡券":i.find(".weapp_text_link").length>0?"小程序链接":i.find(".weapp_image_link").length>0?"小程序链接":i.find(".miniprogram_element").length>0?"小程序卡片":i.find(".js_editor_product").length>0?"商品":i.find(".js_editor_cps").length>0?"广告卡片":t&&t.ad_info&&t.ad_info.ad_id?"广告卡片":"";
}
window._points&&(window._points[8]=+new Date),e("biz_web/ui/jquery.scrollbar.js"),
e("biz_common/utils/string/html.js"),e("common/qq/emoji.js"),e("common/qq/jquery.plugin/btn.js"),
e("3rd/editor/editor.js"),window._points&&(window._points[9]=+new Date);
var a=e("pages/editor/editor_for_web1.js");
window._points&&(window._points[10]=+new Date);
var n,o=e("media/send.js"),s=e("author/author_popover.js"),d=e("author/author_info_list.js"),c=e("author/author_recent.js"),_=e("tpl/media/reward_swtich_tips.html.js"),l=e("author/author_utils.js"),u=e("common/qq/Class.js"),p=e("common/wx/mpEditor/common/eventbus.js"),h=e("common/wx/inputCounter.js"),m=e("common/wx/Step.js"),f=(e("common/wx/dropdownClassify.js"),
e("common/wx/tooltips.js")),g=e("biz_common/jquery.validate.js").rules,w=e("common/wx/Tips.js"),v=e("biz_common/moment.js"),j=e("common/wx/preview.js"),y=e("common/wx/dialog.js"),b=e("common/wx/popover.js"),k=e("common/wx/ban.js"),x=e("common/wx/Cgi.js"),C=e("common/wx/mpEditor/common/cropImgCgi.js"),T=e("common/wx/mpEditor/pluginsList.js"),S=e("common/wx/mpEditor/plugins_list_manage.js"),L=e("common/wx/mpEditor/plugin/templateList.js"),A=e("common/wx/mpEditor/plugin/more.js"),D=e("biz_web/lib/store.js"),I=e("tpl/media/appmsg_edit/article.html.js"),E=e("media/article_list.js"),O=e("media/media_static_data.js"),P=e("pages/editor/eventBus4Web1.js"),R=e("3rd/editor/common/monitor.js"),M=e("common/wx/const.js"),N=M.insertAdModeMap,B=M.DEFAULT_AD_TEXT,q=(M.moreReadModeMap,
M.NO_AD_TEXT),F=M.videoPasterMinPlayLength,U=M.videoPasterMinShowTime,z=M.modifyVideoTitleTips,W=e("common/wx/utils.js"),V=W.formatVideoTime,H=W.reportConsumeTime,J=(O.URL_PLATFORM_MAP,
O.article_type),Y=e("common/wx/speedPerformance.js"),K=wx.cgiData,X=document.referrer,G=e("common/wx/pagebar.js"),Q=(e("tpl/media/audit_fail_tip.html.js"),
e("media/get_article_structure.js")),Z=Q.getArticleStructure,et=0,tt=1,it=2,rt={
masssendCacheKey:"masssendMusicCheck",
originalProtoKey:"mpeditor_original_comic_proto_"+wx.data.uin,
scrollIntoViewid:null,
scrollIntoViewCount:0,
curRenderType:1,
$articlePanel:null,
hideArticlePanelId:null,
canShowArticlePanel:!0,
isReadOnly:!1,
isRewardSwitched:!1,
articleReplaceType:0,
createdAlbum:!1,
recentList:[]
};
!function(e){
var t=function(e,t){
var i=e.siblings(".tips_global"),r=e[0];
t&&""===r.value||!t&&""===r.innerText.replace(/\n|\r/g,"")?i.show():i.hide();
};
e.fn.placeholder2=function(){
var e=this,i="INPUT"===this[0].nodeName;
i&&"placeholder"in document.createElement("input")||this.on("input propertychange blur",function(){
t(e,i);
}).trigger("blur");
},e.fn.checkPlaceholder2=function(){
t(this,"INPUT"===this[0].nodeName);
},e.extend(e.easing,{
easeOutCubic:function(e,t,i,r,a){
return r*((t=t/a-1)*t*t+1)+i;
}
});
}(jQuery);
{
var at=Math.random(),nt=function(e,t){
var i=null;
return function(){
i&&(clearTimeout(i),i=null),i=setTimeout(function(){
e();
},t);
};
},ot=!1,st={},dt=!1,ct=null,_t=u.declare({
init:function(e){
var t=this;
t.opt=e,i(),$.extend(!0,t,e),t.$editor=$(t.editor_selector).html(wx.T(I,{
can_use_copyright:K.can_use_copyright,
can_use_reward:K.can_use_reward,
can_use_payforread:K.can_use_payforread,
can_use_comment:K.can_use_comment,
can_use_album:K.can_use_album,
can_use_appmsg_source_url:K.can_use_appmsg_source_url,
can_see_ad:K.can_see_ad&&""!==K.insert_ad_mode,
is_ios_reward_open:K.is_ios_reward_open,
has_invited_original:K.has_invited_original,
orginal_apply_stat:K.orginal_apply_stat,
can_use_original_reprint:K.can_use_original_reprint,
token:wx.data.t,
is_illegal:1*t.appmsg_data.is_illegal||0,
can_use_related_video:K.can_use_related_video,
can_use_video_recommend:K.can_use_video_recommend,
can_use_watch_more:K.can_use_watch_more,
can_use_pay_subscribe:K.can_use_pay_subscribe,
is_pay_subscribe_block:K.is_pay_subscribe_block,
can_use_cartoon_copyright:K.can_use_cartoon_copyright,
close_related_video:K.close_related_video,
can_use_public_tag:K.can_use_public_tag,
realname_type:wx.cgiData.realname_type
})),S.createEditorPluginsDom(K.pluginmgr_info.list),t._initUEditor({
callback:function(){
$("#media_item_list_scrollbar").scrollbar({
autoUpdate:!1
});
}
});
},
_initFormItemsOpt:function(){
this.formItemsOpt={
title:{
readonly:!1,
readonlyTips:""
},
author:{
counter:null,
readonly:!1,
readonlyTips:""
},
content:{
readonly:!1,
readonlyTips:""
},
guideWords:{
readonly:!1,
readonlyTips:""
},
description:{
readonly:!1,
readonlyTips:""
}
};
},
_renderReadOnly:function(e){
var t=e.type,i=e.time,r=e.name,a=e.ua,n=$("#read_only_container"),o=n.find(".js_close");
if(5==t){
var s=location.href+"&conflict=1",d="你有未保存的草稿，%s点击查看%s".sprintf("<a href='javascript:;'>","</a>");
return n.find("p").html(d),n.find("a").click(function(){
n.hide(),window.open(s);
}),e.showTips===!0&&y.show({
type:"warn",
msg:"你有未保存的草稿",
buttons:[{
text:"查看草稿",
click:function(){
n.hide(),window.open(s),e.callback&&_typeof(e.callback)&&e.callback(),this.remove();
}
},{
text:"编辑当前内容",
type:"normal",
click:function(){
e.callback&&_typeof(e.callback)&&e.callback(),this.remove();
}
}]
}),n.show(),void o.show();
}
if(1==t||2==t)n.find("p").text("此素材有文章存在违规，无法编辑"),n.show(),o.hide();else if(4==t){
var d="当前素材并非最新内容，你可以%s打开最新素材%s".sprintf("<a target='_blank' href='"+location.href+"'>","</a>");
n.find("p").html(d);
var c="当前素材非最新内容，是否打开重新编辑？";
i&&(c+="<br />最新素材更新时间：%s".sprintf(i)),r&&(c+="<br />操作人：%s".sprintf(r.html(!0))),
a&&(c+="<br />保存于：%s".sprintf((a+"浏览器").html(!0))),y.show({
type:"warn",
msg:c,
buttons:[{
text:"编辑新内容",
click:function(){
window.open(location.href),this.remove();
}
},{
text:"查看当前内容",
type:"normal",
click:function(){
this.remove();
}
}]
}),n.show(),o.hide();
}else(3==t||6==t)&&(n.hide(),o.hide());
rt.isReadOnly=!0;
var _=$(this.editor_selector);
if(_.find(".js_title_main").addClass("without_margin"),_.find(".js_readonly").hide(),
$(this.appmsg_selector).find(".js_readonly").hide(),$("#editor_pannel").addClass("appmsg_input_area_pull_right"),
$("#js_add_appmsg").hide(),$("#bottom_main").hide(),$("#right_pannel").hide(),this.articleList){
var l=this.articleList.getCurrentArticle();
if(l){
var u=l.data("article");
u&&"function"==typeof u.setGuideWordsReadOnly&&u.setGuideWordsReadOnly();
}
}
this.ueditor&&(this.ueditor.fireEvent("scrollIntoView",$("#read_only_container"),150),
this.ueditor.fireEvent("setToolBarStatus",{
status:!1
}));
},
_renderEditorByType:function(e,t,i){
switch(1*e){
case 1:
this._setCurRenderType(1),this._setAuthorStatus({
status:!0
}),this._switchContentType({
type:1
}),rt.isReadOnly?(this._setToolBarStatus({
status:!1
}),this._setTitleStatus({
readonly:!0
})):(this._setToolBarStatus({
status:!0
}),this._setTitleStatus({
readonly:!1
})),this._setArticleUrlStatus(!0),this._setAdInsertStatus(!0),this._setMoreReadStatus(!0),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!0
}),this._setCoverStatus({
status:!0
}),this._setDescriptionStatus({
status:!0
}),this._setCoverDescriptionStatus({
status:!0
}),this._setFoldStatus(!0);
break;

case 2:
var r="分享图文标题不可编辑";
"object"===("undefined"==typeof i?"undefined":_typeof(i))&&"isMyMpVideo"in i&&(r=z),
this._setCurRenderType(2),this._setTitleStatus({
readonly:!1,
readonlyTips:r,
isMyMpVideo:i.isMyMpVideo
}),this._setAuthorStatus({
status:!1
}),this._switchContentType({
type:2
}),this._setToolBarStatus({
status:!1,
disabledTips:"分享图文中不能插入多媒体素材"
}),this._setArticleUrlStatus(!1),this._setAdInsertStatus(!1),this._setMoreReadStatus(!1),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!1
}),this._setCoverStatus({
status:!1
}),this._setDescriptionStatus({
status:!1
}),this._setCoverDescriptionStatus({
status:!1
}),this._setFoldStatus(!1);
break;

case 4:
this._setCurRenderType(4),this._setTitleStatus({
display:"none"
}),this._setAuthorStatus({
status:!1
}),this._switchContentType({
type:2
}),this._setToolBarStatus({
status:!1,
disabledTips:"分享文本中不能插入多媒体素材"
}),this._setArticleUrlStatus(!1),this._setAdInsertStatus(!1),this._setMoreReadStatus(!1),
this._setCommentStatus(!0),this._setOriginalStatus({
status:!1
}),this._setCoverStatus({
status:!1
}),this._setDescriptionStatus({
status:!1
}),this._setCoverDescriptionStatus({
status:!1
}),this._setFoldStatus(!1);
}
"function"==typeof t&&t();
},
_setTitleStatus:function(e){
e.readonly?($("#title").attr("readonly","true"),this.formItemsOpt.title.readonlyTips=e.readonlyTips||"",
$("#js_title_main").addClass("appmsg_edit_not_appmsg")):($("#title").removeAttr("readonly"),
e.isMyMpVideo?$("#js_title_main").addClass("appmsg_edit_not_appmsg"):$("#js_title_main").removeClass("appmsg_edit_not_appmsg")),
"none"===e.display?$("#js_title_main").hide():$("#js_title_main").show(),this.formItemsOpt.title.readonly=!!e.readonly;
},
_setAuthorStatus:function(e){
e.status?($("#js_author_area").show(),e.readonly?($("#author").attr("readonly","true"),
this.formItemsOpt.author.readonlyTips=e.readonlyTips||""):$("#author").removeAttr("readonly")):$("#js_author_area").hide(),
this.formItemsOpt.author.readonly=!!e.readonly,this.formItemsOpt.author.counter[e.hideCounter?"hideWithAppend":"show"]();
},
_switchContentType:function(e){
switch(1*e.type){
case 1:
$($("#edui1_iframeholder").show().find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).attr("contenteditable",!e.readonly),
$("#guide_words_main").hide(),this.formItemsOpt.content.readonly=!!e.readonly,this.formItemsOpt.content.readonlyTips=e.readonlyTips||"";
break;

case 2:
$("#edui1_iframeholder").hide(),$("#guide_words_main").show().find(".js_editorArea").attr("contenteditable",!e.readonly).attr("placeholder",e.placeholder||"可以输入140字以内的推荐语(选填)"),
this.formItemsOpt.guideWords.readonly=!!e.readonly,this.formItemsOpt.guideWords.readonlyTips=e.readonlyTips||"";
break;

case 3:
$($("#edui1_iframeholder").show().find("iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).attr("contenteditable",!e.content.readonly),
this.formItemsOpt.content.readonly=!!e.content.readonly,this.formItemsOpt.content.readonlyTips=e.content.readonlyTips||"",
$("#guide_words_main").hide(),this.formItemsOpt.guideWords.readonly=!!e.guideWords.readonly,
this.formItemsOpt.guideWords.readonlyTips=e.guideWords.readonlyTips||"";
}
},
_setToolBarStatus:function(e){
e.status?(this.ueditor.fireEvent("star_toolbar_float"),$(this.editor_selector).find(".js_title_main").removeClass("without_margin"),
$("#edui1_toolbarbox").show(),$("#js_media_list_box").show(),$("#js_media_extra_list").show()):($(this.editor_selector).find(".js_title_main").addClass("without_margin"),
$("#edui1_toolbarbox").hide(),$("#js_media_list_box").hide(),$("#js_media_extra_list").hide());
},
_setArticleUrlStatus:function(e){
e?$("#js_article_url_area").show():$("#js_article_url_area").hide();
},
_setAdInsertStatus:function(e){
e?$("#js_insert_ad_area").show():$("#js_insert_ad_area").hide();
},
_setMoreReadStatus:function(e){
e?$("#js_article_recommend_area").show():$("#js_article_recommend_area").hide();
},
_setCommentStatus:function(e){
var t=$("#js_comment_area");
t&&(e?t.show():t.hide());
},
_setOriginalStatus:function(e){
var t=$("#js_original");
if(t)if(e.status){
var i=t.find("#js_original_open"),r=t.find(".js_original_content"),a=i.find(".js_ori_setting_checkbox");
switch(e.type){
case"reprint":
i.find(".js_original_title").text("转载文章：原文已声明原创"),a.prop("checked",!0),a.prop("disabled",!0),
i.find(".js_original_btn").hide(),r.find(".js_original_item").hide().filter(".js_reprint").show();
break;

case"article":
default:
i.find(".js_original_title").text("已声明原创"),a.prop("checked",!0),a.prop("disabled",!1),
i.find(".js_original_btn").show(),r.find(".js_original_item").hide().filter(".js_article").show();
}
t.show();
}else t.hide();
},
_setCoverStatus:function(e){
var t=$("#js_cover_area");
e.status?(t.show(),e.readonly?t.find(".js_cover_btn_area").hide():t.find(".js_cover_btn_area").show()):t.hide();
},
_setCoverDescriptionStatus:function(e){
e.status?$("#js_cover_description_area").show():$("#js_cover_description_area").hide();
},
_setDescriptionStatus:function(e){
e.status?($("#js_description_area").show(),e.readonly?($("#js_description").attr("readonly","true"),
this.formItemsOpt.description.readonlyTips=e.readonlyTips||""):$("#js_description").removeAttr("readonly")):$("#js_description_area").hide(),
this.formItemsOpt.description.readonly=!!e.readonly;
},
_setFoldStatus:function(e){
var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=$("#bot_bar_left_container");
i.find(".js_fold").remove(),1*t.type!==1&&1*t.type!==2&&(t.type=-1),e&&i.append(template.render("tpl_bot_left_fold",t));
},
_setSaveBtnStatus:function(e){
e.disabled?($("#js_send").addClass("btn_disabled"),$("#js_preview").addClass("btn_disabled"),
$("#js_submit").addClass("btn_disabled")):($("#js_send").removeClass("btn_disabled"),
$("#js_preview").removeClass("btn_disabled"),$("#js_submit").removeClass("btn_disabled"));
},
_setCurRenderType:function(e){
rt.curRenderType=1*e;
},
_initEditArea:function(){
function e(e){
var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1];
e?(J.prop("disabled",!0),Y.addClass("disabled")):(J.prop("disabled",!1),Y.removeClass("disabled")),
K.text(t);
}
function t(){
var e=_.articleList&&_.articleList.getCurrentArticleObject(),t=e.data.getData(),i=wx.cgiData.inviteAuthorCnt>0?wx.url("/cgi-bin/safecenterstatus?action=inviteauthor"):"";
p.fireEvent("showRewardSettingDialog",{
isShow:!0,
step:t.writerid?2:1,
writer:{
hasAuthor:!!t.writerid,
writerid:t.writerid||"",
authorName:t.author||"",
replyId:t.reward_reply_id||""
},
replyId:t.reward_reply_id||"",
authorName:t.author||"",
inviteAuthorLink:i
},function(i){
i?(G.checkbox("checked",!0),X.find(".js_reward_allow_click").addClass("open").show(),
i.authorName&&X.find(".reward_text_setting").html("赞赏账户："+i.authorName),i.writer&&i.writer.hasAuthor&&(e.setAuthorInfo({
copyright_type:0,
writerid:i.writer.writerid,
author_username:i.writer.username,
author:i.writer.nickname,
author_status:i.writer.authorStatus,
can_open_reward:1,
can_reward:1,
reward_reply_id:i.replyId||""
}),X.find(".reward_text_setting").removeClass("reward_text_error"))):t.writerid||(G.checkbox("checked",!1),
X.find(".js_reward_allow_click").removeClass("open").hide(),X.find(".reward_text_setting").removeClass("reward_text_error"));
});
}
function i(e){
return e.isMyMpVideo||e.is_my_mp_video;
}
function r(){
var e=_.articleList.getCurrentArticleObject().data.getData(),t=e.share_videoinfo;
t[0].play_length>=F&&i(e)&&(l.find(".video_dot_text").show(),p.fireEvent("showWeappDialog",{
isvideodot:!0,
videoinfo:t,
pasterInfo:e.dot
},function(t){
if(t){
var i=t.begin_time,r=(t.main_page,t.nickname),a=t.path,n=t.dot,o=t.end_time,s={
begin_time:i,
end_time:o,
dot:JSON.stringify({
title:n.title,
desc:n.desc,
relativeURL:a,
originalId:n.originalId,
weAppName:r,
appId:n.appId,
avatar:n.avatar
}),
type:1,
id:1,
min_show_time:U,
position:JSON.stringify({
right:0,
bottom:20,
gravity:"right|bottom"
})
},d=[];
d.push(s),e.dot={
list:d
};
var c="在%s开始出现贴片".replace("%s",V(i));
Z.find(".js_paster_setting_text").html(c);
}else e.dot&&Object.keys(e.dot).length||Q.checkbox("checked",!1);
}));
}
function a(){
var e="undefined"!=typeof localStorage.getItem("adTransitionText")?localStorage.getItem("adTransitionText"):null;
e===q&&(e=null);
var t=_.articleList&&_.articleList.getCurrentArticleObject().data.getData(),i=t.advert_info&&t.advert_info.back_transition&&t.advert_info.back_transition.ad_video_transition||"",r=t.ad_video_transition&&t.ad_video_transition.ad_video_transition;
p.fireEvent("showVideoAdTransitionDialog",{
scene:"ueditor",
selectedValue:r||i||e||B
},function(e){
return e?(localStorage.setItem("finalAdText",e),t.ad_video_transition={
ad_video_transition:e
},void l.find(".ad_text").html(e)):void($(".ad_transition_area .ad_text_setting").html()||(l.find(".js_ad_back").checkbox("checked",!1),
l.find(".ad_transition_area .ad_text_setting").html(""),l.find(".ad_transition_area .ad_text_setting").hide()));
});
}
function o(){
p.fireEvent("showRelatedVideoDialog",{
isShow:!0,
scene:"morevideo",
canuselink:!1,
allowChooseLength:3,
videoList:JSON.parse($(".js_related_video_desc").data("related_video")||"[]")
},function(t){
if("undefined"!=typeof t){
$(".js_related_video_desc").data("related_video",JSON.stringify(t)).html("已选%s条视频".sprintf(t.length)).show(),
$(".js_related_list").empty();
for(var i=0;i<t.length;i++)t[i].title=t[i].title.html(!0),$(".js_related_list").append("<li>"+t[i].title+"</li>");
$(".js_related_video_checkbox").checkbox("checked",!0),$(".js_related_video_radio_custom").addClass("selected"),
$(".js_related_video_radio_suggestion").removeClass("selected"),$(".js_relate_video_modify").show(),
$(".js_recommend_wording").hide();
}
var r=$(".js_related_video_desc").data("related_video")||"";
(0===r.length||0===JSON.parse(r).length)&&($(".js_related_video_radio_suggestion").hasClass("selected")||($(".js_related_video_checkbox").checkbox("checked",!1),
$(".js_related_video_radio_custom").removeClass("selected"),e(!1)));
});
}
function s(e){
return"none"!=$(".js_more_video_area").css("display")?!1:void(0===wx.cgiData.can_use_video_recommend?$(".js_related_video_checkbox").attr("disabled")||o():($(".js_related_video_select")[0]&&$(".js_related_video_select").toggle(),
"checked"!=$(".js_related_video_checkbox").attr("checked")&&d(!0),e&&d(!0)));
}
function d(t){
$(".js_related_video_radio_custom").removeClass("selected"),$(".js_related_video_radio_suggestion").addClass("selected"),
$(".js_relate_video_modify").hide(),$(".js_related_video_desc").data("related_video",JSON.stringify([])).html("智能推荐本公众号已群发视频").show(),
$(".js_recommend_wording").show(),$(".js_related_list").empty(),$(".js_related_video_checkbox").checkbox("checked",!0),
e(!0,"已选择观看更多，暂不支持同时设置专辑"),t||setTimeout(function(){
$(".js_related_video_select").hide();
});
}
function c(e){
var t=tt.$pop.find(".jsPopoverBt").eq(0);
if(!t.hasClass("btn_disabled")&&!t.hasClass("btn_loading")){
t.addClass("btn_loading");
var i=$.trim(e);
return/^https?:\/\//.test(i)||(i="http://"+i),g.url(i)?void x.get({
url:"/cgi-bin/operate_appmsg?sub=check_sourceurl",
data:{
sourceurl:i
}
},function(e){
if(t.removeClass("btn_loading"),"none"!=tt.$pop.css("display")){
var r=e&&e.base_resp&&e.base_resp.ret;
tt.$pop.find(".js_err_msg").hide(),0==r?(_.articleList&&_.articleList.getCurrentArticleObject().data.set("source_url",i),
$("#js_article_url_area").find(".article_url_setting").html(i),$(".js_url").val(i),
tt.hide()):1530503==r?(t.addClass("btn_disabled"),$(".js_url_tempkey").hide(),$(".js_warn.frm_msg").show()):64552==r?(t.addClass("btn_disabled"),
$(".js_url_tempkey").hide(),$(".js_url_error").show()):64508==r?(t.addClass("btn_disabled"),
tt.$pop.find(".js_common_err").text("该链接非法，微信已经禁止访问").show()):(t.addClass("btn_disabled"),
$(".js_url_tempkey").hide(),w.err("系统繁忙，请稍后再试")),tt.resetPosition();
}
}):($(".js_url_error").show(),tt.resetPosition());
}
}
var _=this,l=_.$editor,u=(_.articleList&&_.articleList.getCurrentArticleObject().data.getData(),
_.ueditor.getBrowser());
if(u.ipad||u.iphone||u.android){
var m=$(_.ueditor.getUeditor().body);
$(document.body).on("click touchstart",function(){
m.blur();
});
}
var f=_.ueditor.ueditor.body;
f.addEventListener("load",function(e){
"IMG"===e.target.nodeName&&_.ueditor.fireEvent("adjustheight");
},!0);
var v=0,j=0;
f.addEventListener("mousemove",function(e){
ct&&(window.clearTimeout(ct),ct=null);
var t=1*new Date;
if(t-v>100){
v=t;
var i=_.articleList&&_.articleList.getCurrentArticleObject();
i&&i.data.get("is_pay_subscribe")&&(0===j&&(j=parseInt(window.getComputedStyle(f).paddingLeft)),
i.setTempPayPopup(e.clientX<=j?{
mode:"y",
y:e.clientY
}:{
mode:"hide"
}));
}
},!1),_.ueditor.ueditor.iframe.parentNode.addEventListener("mouseout",function(e){
"IFRAME"===e.target.nodeName&&!function(){
var e=_.articleList&&_.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&(ct=window.setTimeout(function(){
e.setTempPayPopup({
mode:"hide"
}),ct=null;
},100));
}();
},!1),l.find(".js_field").each(function(){
{
var e=$(this).attr("name");
$(this).attr("keyup");
}
$(this).on("keyup",function(){
l.find(".js_%s_error".sprintf(e)).hide();
});
}),l.find(".js_title").on("keyup",function(){
if(_.articleList){
var e=$.trim($(this).val()).html(!0),t=_.articleList&&_.articleList.getCurrentArticle();
t&&t.find(".js_appmsg_title").html(e||"标题"),l.find(".js_title_error").hide(),$("#js_draft_tips").hide();
}
}).on("focus",function(){
_.ueditor.fireEvent("title_focus"),_.ueditor.disableToolbar(),_.ueditor.teditor&&_.ueditor.teditor.disableToolbar(),
_.formItemsOpt.title.readonly||$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("click",function(){
_.formItemsOpt.title.readonly&&_.formItemsOpt.title.readonlyTips&&w.err(_.formItemsOpt.title.readonlyTips);
}).placeholder2();
{
var y=l.find("input.js_author");
l.find("input.js_writerid");
}
y.on("focus",function(){
_.ueditor.fireEvent("author_focus"),_.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("keyup",function(){
$("#js_draft_tips").hide();
}).on("click",function(){
var e;
if(_.articleList){
var t=_.articleList.getCurrentArticleObject();
t&&t.data&&(e=t.data.get("copyright_type"));
}
_.formItemsOpt.author.readonly&&(1==e?$("#js_original").find(".js_edit_ori").eq(0).trigger("click"):_.formItemsOpt.author.readonlyTips&&w.err(_.formItemsOpt.author.readonlyTips));
}).placeholder2();
var k=0,C=l.find("#js_author_area"),T=0;
C.on("mousemove",function(e){
ct&&(window.clearTimeout(ct),ct=null);
var t=1*new Date;
if(t-k>100){
k=t;
var i=_.articleList&&_.articleList.getCurrentArticleObject();
i&&i.data.get("is_pay_subscribe")&&(0===T&&(T=parseInt(window.getComputedStyle(C[0]).paddingLeft)),
i.setTempPayPopup(e.target===e.currentTarget&&e.offsetX<=T?{
mode:"top"
}:{
mode:"hide"
}));
}
}).on("mouseout",function(e){
e.target===e.currentTarget&&!function(){
var e=_.articleList&&_.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&(ct=window.setTimeout(function(){
e.setTempPayPopup({
mode:"hide"
}),ct=null;
},100));
}();
});
var S=l.find(".js_reprint_recommend_title_len");
l.find(".js_reprint_recommend_title").on("focus",function(){
_.ueditor.disableToolbar();
}).on("input propertychange",function(){
var e=this.value.length;
S.html(e),e>10?S.parent().addClass("original_primary_tips_counter_warn"):S.parent().removeClass("original_primary_tips_counter_warn");
}).placeholder2();
var L=l.find(".js_reprint_recommend_content_len"),A=l.find(".js_reprint_recommend_content"),D=function(e){
return e.replace(/\s/g,"").length;
},I=null,E=function(e){
null!==I&&(clearTimeout(I),I=null),I=setTimeout(function(){
var t=D(e);
L.html(t),t>120?L.parent().addClass("original_primary_tips_counter_warn"):L.parent().removeClass("original_primary_tips_counter_warn");
},500);
};
A.on("focus",function(){
_.ueditor.disableToolbar();
}).on("input propertychange",function(){
E(this.innerText);
}).placeholder2();
var O=function(e){
return e.replace(/\r\n/g,"\n").replace(/\n\n/g,"<div><br></div>").replace(/\n([^\n]+)\n/g,"<div>$1</div>\n").replace(/\n([^\n]+)$/,"<div>$1</div>");
},P=function(e,t,i,r){
var a=function d(e,t){
if(!(e.childNodes.length>1))return 1===e.nodeType?{
target:e.childNodes[0],
pos:t
}:{
target:e,
pos:t
};
for(var i=0,r=e.childNodes,a=r.length;a>i;i++){
var n=r[i];
if(3===n.nodeType){
if(n.textContent.length>=t)return{
target:n,
pos:t
};
t-=n.textContent.length;
}else{
if(n.innerText.length>=t)return d(n,t);
t-=n.innerText.length;
}
}
},n=a(t,i+r.replace(/\r\n/g,"\n").replace(/\n\n/g,"a").replace(/\n/g,"").length),o=n.target,s=n.pos;
e.setBaseAndExtent(o,s,o,s);
};
A[0].addEventListener("paste",function(e){
e.preventDefault();
var t=window.getSelection(),i=t.getRangeAt(0).startOffset;
t.deleteFromDocument();
var r=t.anchorNode,a=null;
if(1===r.nodeType)a=r.childNodes[0];else if(a=r,r=a.parentNode,r.classList.contains("js_reprint_recommend_content")){
var n=document.createElement("div");
r.replaceChild(n,a),n.appendChild(a),r=n;
}
var o=(e.clipboardData||window.clipboardData).getData("text");
r.innerHTML=r.innerHTML.slice(0,i)+O(o)+r.innerHTML.slice(i),A.checkPlaceholder2(),
P(t,r,i,o),E(this.innerText);
}),A[0].addEventListener("drop",function(e){
e.preventDefault();
var t=null,i=null,r=null;
if(document.caretRangeFromPoint?(t=document.caretRangeFromPoint(e.x,e.y),i=t.startContainer,
r=t.startOffset):document.caretPositionFromPoint&&(t=document.caretPositionFromPoint(e.x,e.y),
i=t.offsetNode,r=t.offset),null!==t){
var a=window.getSelection();
a.deleteFromDocument();
var n=null;
if(1===i.nodeType)n=i.childNodes[0];else if(n=i,i=n.parentNode,i.classList.contains("js_reprint_recommend_content")){
var o=document.createElement("div");
i.replaceChild(o,n),o.appendChild(n),i=o;
}
var s=e.dataTransfer.getData("text");
i.innerHTML=i.innerHTML.slice(0,r)+O(s)+i.innerHTML.slice(r),A.checkPlaceholder2(),
P(a,i,r,s),E(this.innerText);
}
}),$(l.find("#edui1_iframeholder iframe")[0].contentWindow.document.getElementsByTagName("body")[0]).on("click",function(){
_.formItemsOpt.content.readonly&&_.formItemsOpt.content.readonlyTips&&w.err(_.formItemsOpt.content.readonlyTips);
}),l.find(".js_desc").on("keyup",function(){
if(_.articleList){
var e=$.trim($(this).val()).html(!0),t=_.articleList.getCurrentArticle(),i=t.data("article");
i.data.set("auto_gen_digest",0),t&&t.find(".appmsg_desc").html(e),l.find(".js_desc_error").hide();
}
}),l.find("textarea.js_desc[name='digest']").on("change",function(){
if(_.articleList){
var e,t=_.articleList.getCurrentArticle();
t&&(e=t.data("article"))&&e.setAutoDigest(!1);
}
});
var R=l.find(".js_auto_insert_ad");
R&&R.length>0&&R.checkbox({
multi:!0,
onChanged:function(e){
if(_.articleList){
var t=e.checkbox("value")?N.auto:N.none;
_.articleList.getCurrentArticleObject().data.getData().insert_ad_mode=t,$(".js_appmsg_item.current").data("insertadmode",t),
e.checkbox("value")?($("#js_insert_ad_area").find(".js_insert_ad_allow_click").addClass("open"),
n.fireEvent("openCpcSetting")):$("#js_insert_ad_area").find(".js_insert_ad_allow_click").removeClass("open");
}
}
});
var M=$("#js_comment_area");
if(M&&M.length>0){
var z=new b({
dom:M.find(".js_comment_allow_click"),
content:$("#js_comment_setting_popover_tpl").html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
}
});
z.hide(),$(".js_comment_setting").checkbox({
multi:!1,
onChanged:function(e){
localStorage.setItem("commentStatus_"+wx.data.user_name,JSON.stringify({
need_open_comment:l.find(".js_comment").checkbox("value")?1:0,
only_fans_can_comment:1*e.checkbox("value")===1?1:0,
only_fans_days_can_comment:1*e.checkbox("value")===2?1:0
})),M.find(".comment_setting").html(e.data("label"));
}
}),M.on("click",".js_comment_allow_click.open",function(e){
e.preventDefault(),z.show();
});
}
l.find(".js_comment").checkbox({
multi:!0,
onChanged:function(e){
var t=e.checkbox("value");
localStorage.setItem("commentStatus_"+wx.data.user_name,JSON.stringify({
need_open_comment:t?1:0,
only_fans_can_comment:1*$(".js_comment_setting:checked").val()===1?1:0,
only_fans_days_can_comment:1*$(".js_comment_setting:checked").val()===2?1:0
})),t?(l.find(".comment_setting").show(),l.find(".js_comment_allow_click").addClass("open"),
setTimeout(z.show.bind(z))):(l.find(".comment_setting").hide(),l.find(".js_comment_allow_click").removeClass("open"));
}
});
var W=$("#js_danmu_area");
W&&W.length>0&&!function(){
var e=new b({
dom:W.find(".js_danmu_allow_click"),
content:$("#js_danmu_setting_popover_tpl").html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
}
});
e.hide(),$(".js_danmu_setting").checkbox({
multi:!1,
onChanged:function(e){
var t=_.articleList.getCurrentArticleObject().data;
t.set("danmu_pub_type",+e.val()),W.find(".js_danmu_setting_text").html(e.data("label"));
}
}),W.on("click",".js_danmu_allow_click.open",function(t){
t.preventDefault(),e.show();
}),l.find(".js_danmu").checkbox({
multi:!0,
onChanged:function(t){
var i=t.checkbox("value"),r=_.articleList.getCurrentArticleObject().data,a=$(".js_danmu_setting"),n=void 0;
Array.from(a).some(function(e){
return e.checked?(n=+e.value,!0):!1;
}),i?(r.set("danmu_pub_type",n),l.find(".js_danmu_setting_text").show(),l.find(".js_danmu_allow_click").addClass("open"),
setTimeout(e.show.bind(e))):(r.set("danmu_pub_type",0),l.find(".js_danmu_setting_text").hide(),
l.find(".js_danmu_allow_click").removeClass("open"));
}
});
}();
var H=l.find("#js_article_tags_area"),J=H.find(".js_article_tags"),Y=J.parent(),K=Y.find(".js_article_tags_content");
$(".js_video_ori_tips").mouseenter(function(){
$(".js_video_ori_area").show();
}).mouseleave(function(){
$(".js_video_ori_area").hide();
}),$(".js_video_ori_area").mouseenter(function(){
$(".js_video_ori_area").show();
}).mouseleave(function(){
$(".js_video_ori_area").hide();
}),$("#to-video-list").on("click",function(e){
e.preventDefault(),window.open(wx.url("/cgi-bin/appmsg?begin=0&count=10&action=list_video&type=15"),"_blank");
});
var X=$("#reward_setting_area"),G=l.find(".js_reward_setting");
X&&X.length>0&&!function(){
G.checkbox({
multi:!0,
onChanged:function(e){
if(_.articleList)if(e.checkbox("value"))t();else{
var i=_.articleList&&_.articleList.getCurrentArticleObject();
i.setAuthorInfo({
copyright_type:0,
writerid:"",
author_username:"",
author:"",
author_status:"",
can_open_reward:0,
can_reward:0,
reward_reply_id:""
}),X.find(".js_reward_allow_click").removeClass("open").hide(),X.find(".reward_text_setting").html("赞赏未开启"),
X.find(".reward_text_setting").removeClass("reward_text_error");
}
}
}),X.on("click",".js_reward_allow_click.open",function(e){
e.preventDefault(),t();
});
var e=new b({
dom:X.find(".reward_text_setting"),
content:$("#js_reward_setting_popover_tpl").html(),
className:"",
place:"bottom",
width:260,
hideIfBlur:!0,
onShow:function(){
var e="赞赏账户授权已失效，要重新获得授权，请前往赞赏账户小程序添加本公众号";
this.$pop.find(".popover-reward_setting__content").text(e),this.resetPosition();
}
});
e.hide(),X.on("mouseover",".reward_text_setting",function(t){
$(t.currentTarget).hasClass("reward_text_error")&&e.show();
}),X.on("mouseleave",".reward_text_setting",function(t){
$(t.currentTarget).hasClass("reward_text_error")&&e.hide();
});
var i=new b({
dom:X.find(".js_reward_mini-program_tips"),
content:$("#js_reward_mini-program_popover_tpl").html(),
className:"popover_paster_tips",
place:"bottom",
width:260,
hideIfBlur:!0,
onShow:function(){
var e='<p class="weui-desktop-tips author_card_qrcode_nickname">扫码进入赞赏账户小程序</p>\n            <img src="/mpres/zh_CN/htmledition/pages/modules/author_selector/image/reward_minigram_qr.png" class="author_card_qrcode">\n            <div class="author_card_qrcode_desc"></div>';
this.$pop.find(".popover-reward_mini-program__content").html(e),this.resetPosition();
}
});
i.hide(),X.on("mouseover",".js_reward_mini-program_tips",function(){
i.show();
}),X.on("mouseleave",".js_reward_mini-program_tips",function(){
i.hide();
});
}(),l.find("#js_ad_back").checkbox({
multi:!0,
onChanged:function(e){
if(_.articleList){
var t=_.articleList.getCurrentArticleObject().data.getData(),i=e.checkbox("value");
i?(l.find(".ad_text").show(),a()):(l.find(".ad_text").html(""),t.ad_video_transition="",
t.advert_info.back_transition="",localStorage.removeItem("finalAdText"));
}
}
});
var Q=l.find("#video_dot_checkbox"),Z=l.find("#video_dot_area");
Q.checkbox({
multi:!0,
onChanged:function(e){
if(_.articleList){
var t=e.checkbox("value");
if(t)r();else{
var i=_.articleList.getCurrentArticleObject().data.getData();
i.dot={},Z.find(".js_paster_setting_text").html("");
}
}
}
}),Z.on("click",".allow_click_opr",function(e){
"checked"===Q.attr("checked")&&(e.preventDefault(),r());
});
var et=new b({
dom:Z.find(".allow_click_opr"),
content:$("#js_video_paster_popover_tpl").html(),
className:"popover_paster_tips",
place:"top",
hideIfBlur:!0,
onShow:function(){
var e="",t=_.articleList.getCurrentArticleObject().data.getData(),r=t.share_videoinfo[0].play_length;
F>r&&!i(t)?e="从公众平台上传的1分钟以上视频可设置自定义贴片":F>r&&i(t)?e="1分钟以上的视频才能设置自定义贴片":r>=F&&!i(t)&&(e="从公众平台上传的视频才能设置自定义贴片"),
this.$pop.find(".popover-video-paster__content").text(e),this.resetPosition();
}
});
et.hide(),et.$pop.find(".popover_bar").hide(),Z.find(".allow_click_opr").on("mouseover",function(){
var e=_.articleList.getCurrentArticleObject().data.getData();
(!i(e)||e.share_videoinfo[0].play_length<F)&&et.show();
}),Z.find(".allow_click_opr").on("mouseleave",function(){
et.hide();
}),l.find(".ad_transition").on("click",function(e){
"checked"===l.find("#js_ad_back").attr("checked")&&(e.preventDefault(),a());
}),l.find(".js_related_video_checkbox").checkbox({
multi:!0,
onChanged:function(t){
var i=t.checkbox("value");
i?s(!0):($(".js_related_list").empty(),$(".js_related_video_checkbox").checkbox("checked",!1),
$(".js_related_video_radio_suggestion").removeClass("selected"),$(".js_related_video_radio_custom").removeClass("selected"),
$(".js_related_video_desc").data("related_video",JSON.stringify([])).html("").hide(),
$(".js_related_video_select").hide(),e(!1));
}
}),l.find(".js_related_video_custom").on("click",function(){
o();
}),l.find(".js_related_video_suggestion").on("click",function(){
d();
}),$(document).on("click",function(e){
var t=$(e.target);
0!=t.closest(".js_related_video_allow_click").length||0!=t.closest(".js_related_video_select").length||t.hasClass("js_related_video_checkbox_icon")||t.hasClass("js_related_video_checkbox")||$(".js_related_video_select").hide();
}),$(".js_more_video_qa").mouseenter(function(){
"none"==$(".js_related_video_select").css("display")&&$(".js_more_video_area").show();
}).mouseleave(function(){
$(".js_more_video_area").hide();
}),$(".js_more_video_area").mouseenter(function(){
"none"==$(".js_related_video_select").css("display")&&$(".js_more_video_area").show();
}).mouseleave(function(){
$(".js_more_video_area").hide();
}),$("#to-global").on("click",function(e){
e.preventDefault(),window.open(wx.url("/cgi-bin/appmsg?begin=0&count=10&action=list_video&type=15&from_another=1"),"_blank");
});
var tt=new b({
dom:$("#js_article_url_area").find(".js_article_url_allow_click"),
content:$("#js_article_setting_popover_tpl").html(),
place:"top",
width:500,
className:"popover_article_setting_large",
hideIfBlur:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
c(this.$pop.find(".js_url").val());
}
},{
text:"取消",
type:"default",
click:function(){
this.hide();
}
}],
onShow:function(){
this.resetPosition();
var e="";
_.articleList&&(e=_.articleList.getCurrentArticleObject().data.get("source_url")),
$(".js_url").val(e);
var t=this.$pop.find(".jsPopoverBt").eq(0);
e?t.removeClass("btn_disabled"):t.addClass("btn_disabled");
},
onHide:function(e){
if(_.articleList&&_.articleList.getCurrentArticleObject&&(!e||e.target!=$(".js_url_checkbox")[0]&&e.target!=$(".js_url_checkbox_icon")[0]&&e.target!=$(".js_url_checkbox_icon").parent()[0])){
var t=_.articleList.getCurrentArticleObject();
if(t&&t.data){
var i=t.data.get("source_url");
l.find(".js_url_checkbox").checkbox("value")&&!i&&(l.find(".js_url_checkbox").checkbox("checked",!1),
l.find(".article_url_setting").hide(),l.find(".js_article_url_allow_click").removeClass("open"),
_.ueditor.funcPvUvReport("hidelink"),$(".js_url_error").hide(),$(".frm_msg.js_warn").hide());
}
}
}
});
tt.hide(),$(".js_url").on("keyup",function(e){
13==e.keyCode&&c($(this).val());
}),$(".js_url").on("input change",function(){
var e=tt.$pop.find(".jsPopoverBt").eq(0);
e.removeClass("btn_loading"),$(".js_warn.frm_msg").hide(),$(".js_url_error").hide();
var t=$.trim($(this).val());
t?e.removeClass("btn_disabled"):e.addClass("btn_disabled"),/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/.test(t)?"none"==$(".js_url_tempkey").css("display")&&$(".js_url_tempkey").show():"none"!=$(".js_url_tempkey").css("display")&&$(".js_url_tempkey").hide(),
tt.resetPosition();
}),$("#js_article_url_area").on("click",".js_article_url_allow_click.open",function(e){
e.preventDefault(),tt.show();
}),l.find(".js_url_checkbox").checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?(l.find(".article_url_setting").show(),l.find(".js_article_url_allow_click").addClass("open"),
_.ueditor.funcPvUvReport("showlink"),setTimeout(tt.show.bind(tt))):(l.find(".article_url_setting").hide(),
l.find(".js_article_url_allow_click").removeClass("open"),_.ueditor.funcPvUvReport("hidelink")),
$(".js_url_error").hide(),$(".frm_msg.js_warn").hide();
}
}),_._initUploadCover(),l.find(".page_msg_link").on("click",function(){
p.fireEvent("showVideoAdBackDialog",{
scene:"ueditor"
},function(e){
var t=this;
e&&x.post({
url:"/merchant/ad_seller_manager?action=quick_open_adseller"
},function(e){
var i=e.base_resp,r=void 0===i?{}:i;
0===r.ret?(t.$tipsSuc("视频后贴广告开通成功"),$("#ad_transition_area").show(),$(".js_ad_back").checkbox("checked",!0),
$(".ad_transition_area .ad_text_setting").html(B),localStorage.setItem("adTransitionText",B),
$(".ad_transition_area .ad_text_setting").show(),$(".advert_tips").hide()):t.$tipsErr("系统错误，请稍候重试"+r.ret);
});
});
}),l.find(".ad_closed").on("click",function(){
$(".advert_tips").hide(),localStorage.setItem("hasCloseAdTips-"+wx.commonData.data.uin,!0);
}),l.find("#js_description").on("click",function(){
_.formItemsOpt.description.readonly&&_.formItemsOpt.description.readonlyTips&&w.err(_.formItemsOpt.description.readonlyTips);
}),l.find(".js_counter").each(function(){
$(this).hasClass("js_author")?_.formItemsOpt.author.counter=new h(this,{
maxLength:$(this).attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}):$(this).hasClass("js_title")?_.formItemsOpt.title.counter=new h(this):new h(this,{
maxLength:$(this).attr("max-length")
});
}),_._initOriginal(),_._initPay(),_.freeUEditor=l.find(".js_fp_editor_empty_none"),
_._initBan(),_._initAd(),_._initArticleTags();
},
_initUploadCover:function(){
var e=this,t=e.$editor;
$("#js_selectCoverFromContent").on("click",function(){
if(e.articleList){
var t=e.articleList._getCurrentIndex(),i=e.ueditor.fireEvent("get_current_article_all_img")||[];
document.body.style.overflow="hidden";
var r=1*t===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}];
p.fireEvent("showImageDialog",{
maxselect:1,
uploadscene:2,
uploadgroup:3,
desc:"大小不超过10M",
fromcontent:!0,
contentimgUrls:i,
crop:!0,
ratio:r
},function(t){
if(t){
var i=t.img,r=t.info,a="content";
e._setCropImg(i,r,a),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
}),$("#js_imagedialog").on("click",function(){
if(e.articleList){
document.body.style.overflow="hidden";
var t=e.articleList._getCurrentIndex(),i=1*t===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}];
p.fireEvent("showImageDialog",{
maxselect:1,
uploadscene:2,
uploadgroup:3,
desc:"大小不超过10M",
crop:!0,
ratio:i
},function(t){
if(t){
var i=t.img,r=t.info,a="lib";
e._setCropImg(i,r,a),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
}),t.on("click",".js_modifyCover",function(){
if(e.articleList){
var i=e.articleList._getCurrentIndex(),r=e.articleList.getCurrentArticleObject().data,a=r.get("crop_list"),n=t.find("#js_cover_area"),o=n.find("input.js_cdn_url").val(),s=n.find("input.js_cdn_url_back").val();
s||(s=o);
var d=1*i===0?[{
title:"图文封面",
desc:"你的星标、常读用户将在订阅号消息列表里，看到此封面。",
ratio:2.35
},{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}]:[{
title:"图文封面",
desc:"其他用户将在订阅号消息列表里，看到此封面。",
ratio:1
}],c=[];
if(a&&a.crop_list&&a.crop_list.length>0)for(var _=0,l=a.crop_list.length;l>_;_++){
var u=a.crop_list[_];
c.push({
x:u.x1,
y:u.y1,
x2:u.x2,
y2:u.y2
});
}
p.fireEvent("showImageDialog",{
src:s,
crop:!0,
step:2,
ratio:d,
cropInfo:c
},function(t){
if(t){
var i=t.img,r=t.info,a="modify";
e._setCropImg(i,r,a),setTimeout(function(){
$("#js_description").focus();
},1e3);
}
});
}
});
},
_resizeUploadCover:function(){
if(this.articleList){
var e=this.articleList._getCurrentIndex();
0===e?(this.$editor.find(".setting-group__cover").addClass("setting-group__cover_primary"),
this.$editor.find(".setting-group__cover").removeClass("setting-group__cover_minor")):(this.$editor.find(".setting-group__cover").removeClass("setting-group__cover_primary"),
this.$editor.find(".setting-group__cover").addClass("setting-group__cover_minor"));
}
},
_setCropImg:function(e,i,r){
var a=this,n=a.articleList._getCurrentIndex(),o=[],s=1*n===0?["2.35_1","1_1"]:["1_1"],d=$.map(i,function(e){
return e.info;
});
$.each(d,function(e,t){
t&&o.push({
key:s[e],
absX1:t.x,
absY1:t.y,
absX2:t.x2,
absY2:t.y2
});
}),C.getUrlMulti({
imgurl:e.url,
size:$.map(i,function(e){
return delete e.info,e;
}),
onerror:function(e){
w.err(-1==e.retcode?"请选择裁剪区域":"系统繁忙，请稍后再试"),document.body.style.overflow="visible";
},
onsuccess:function(i){
for(var s={
oriUrl:i.oriUrl,
multiSize:{}
},d=0,c=o.length;c>d;d++){
var _=o[d],l=i.result[d];
s.multiSize[_.key]={
url:l.cdnurl,
file_id:l.file_id,
absX1:_.absX1,
absY1:_.absY1,
absX2:_.absX2,
absY2:_.absY2
};
}
1*n===0?(s.url=s.multiSize["2.35_1"].url,s.file_id=s.multiSize["2.35_1"].file_id):(s.url=s.multiSize["1_1"].url,
s.file_id=s.multiSize["1_1"].file_id),a._coverChange({
file_id:e.fileId||"",
oriUrl:s.oriUrl,
url:s.url,
multiSize:s.multiSize
}),a.ueditor.fireEvent("reportAddNum",65080,0,1),"upload"===e.source&&a.ueditor.fireEvent("reportAddNum",65080,113,1),
"lib"===r?(a.ueditor.fireEvent("reportAddNum",65080,2,100),t(38,1,"trace")):"content"===r&&a.ueditor.fireEvent("reportAddNum",65080,1,100),
document.body.style.overflow="visible";
}
});
},
_getCropImgRatio:function(e){
return 0==e?16/9:1;
},
_coverChange:function(e){
var t=this.articleList.getCurrentArticleObject();
t&&t.coverChange(e);
},
_getCropImgTips:function(e){
return 0==e?"首篇图文封面图片长宽比只能为16：9，拖拽裁剪框调整展示区域":"次篇图文封面图片长宽比只能为1：1，拖拽裁剪框调整展示区域";
},
_getFrameHeight:function(){
this.ueditor&&this.ueditor.fireEvent("adjustheight");
},
handleAutoInsertCountTips:function(e,t,i){
var r=this.$editor.find(".auto_insert_count_tips");
if(e===N.auto){
var a=t?2:i?1:0;
r.html("本文最多可插入"+a+"条广告"),r.show();
}else r.hide();
},
handleAutoInsertCountTipsTask:function(){
var e=this,t=void 0,i=Date.now(),r=500,a=500,o=3e3;
n.addListener("keyup editAd",function(){
var n=Date.now();
r>n-i&&t?clearTimeout(t):i=n,t=setTimeout(function(){
if(e.articleList){
var t=e.articleList.getCurrentArticleObject();
if(t){
var i=t.data.getData().insert_ad_mode;
if(i===N.auto){
var n=Date.now(),s=Z(e.ueditor.getUeditor().body),d=Date.now()-n;
r=Math.min(Math.max(10*d,a),o),e.handleAutoInsertCountTips(i,s.secondAutoAdAvailable,s.autoAdAvailable);
}
}
}
},r);
});
},
handleCheckMusicResult:function(){
var e=this,t=function(){
e.ueditor.fireEvent("dbcache_get",{
cacheKey:rt.masssendCacheKey,
callback:function(t){
if(t&&t.cacheValue){
e.ueditor.fireEvent("dbcache_remove",{
cacheKey:rt.masssendCacheKey
});
var i=t.cacheValue;
if(i.errorData&&i.errorData.length>0){
var r=i.appmsgid;
if(!r||wx.cgiData.app_id+""!=r+"")return;
var a=i.type||"music";
e.ueditor.fireEvent(a+"CheckResultFocus",{
focusData:i.focusData,
errorData:i.errorData
});
}
}
}
});
};
window.musicCheckResultFocus=function(){
t();
},t();
},
_reportAppmsg:function(){
function e(e){
var i=document.createElement("script");
i.onload=function(){
t.ueditor.fireEvent("reportAddNum",127648,n[e].key,1),document.body.removeChild(i);
},i.src=n[e].src,document.body.appendChild(i);
}
var t=this;
Y.saveSpeeds("appmsg",[{
sid:21,
time:window._points[11]-window._points[5]||0
},{
sid:32,
time:window._points[8]-window._points[7]||0
},{
sid:33,
time:window._points[10]-window._points[9]||0
},{
sid:34,
time:window._points[7]-window._points[6]||0
}])&&Y.send();
var i=[{
id:"122325",
key:"0",
len:"1"
},{
id:"122325",
key:"1",
len:"1"
}];
(wx.cgiData.can_use_voice||wx.cgiData.qqmusic_flag)&&i.push({
id:"122325",
key:"3",
len:"1"
}),wx.cgiData.can_use_vote&&i.push({
id:"122325",
key:"5",
len:"1"
}),wx.cgiData.can_use_qna&&i.push({
id:"122325",
key:"7",
len:"1"
}),wx.cgiData.can_use_card&&i.push({
id:"122325",
key:"9",
len:"1"
}),wx.cgiData.can_see_ad&&i.push({
id:"122325",
key:"11",
len:"1"
}),wx.cgiData.can_use_weapp_card&&i.push({
id:"122325",
key:"13",
len:"1"
}),wx.cgiData.can_use_cps&&i.push({
id:"122325",
key:"15",
len:"1"
}),i.push({
id:"122325",
key:"17",
len:"1"
}),wx.cgiData.can_insert_videosnap&&i.push({
id:"122325",
key:"31",
len:"1"
}),wx.cgiData.can_see_ad&&wx.cgiData.can_use_cps&&wx.cgiData.can_use_card&&i.push({
id:"122443",
key:"14",
len:"1"
}),(wx.cgiData.can_see_ad&&wx.cgiData.can_use_cps||wx.cgiData.can_see_ad&&wx.cgiData.can_use_card||wx.cgiData.can_use_cps&&wx.cgiData.can_use_card)&&i.push({
id:"122443",
key:"15",
len:"1"
}),this.ueditor.fireEvent("reportAddNum",i);
var r=this.ueditor.getBrowser(),a=document.documentElement.clientWidth;
768>=a?this.ueditor.fireEvent("reportAddNum",127648,0,1):1168>=a?this.ueditor.fireEvent("reportAddNum",127648,1,1):1350>=a?this.ueditor.fireEvent("reportAddNum",127648,2,1):1678>=a?this.ueditor.fireEvent("reportAddNum",127648,3,1):1920>=a?this.ueditor.fireEvent("reportAddNum",127648,4,1):this.ueditor.fireEvent("reportAddNum",127648,5,1),
r.ipad&&this.ueditor.fireEvent("reportAddNum",127648,6,1);
var n={
ibefaeehajgcpooopoegkifhgecigeeg:{
key:31,
src:"chrome-extension://ibefaeehajgcpooopoegkifhgecigeeg/assets/js/mpa-editor.js"
},
jicmnjcngcnfhgfggbdhlbjpcbadimaj:{
key:32,
src:"chrome-extension://jicmnjcngcnfhgfggbdhlbjpcbadimaj/static/js/content-scripts/editorExpand.entry.js"
}
};
setTimeout(function(){
e("ibefaeehajgcpooopoegkifhgecigeeg"),e("jicmnjcngcnfhgfggbdhlbjpcbadimaj");
},200);
},
setSelfCheckFirst:function(){
x.post({
url:"/publicpoc/selfcheck?action=updatefirsttimeflag",
data:{}
},function(){
var e=arguments.length<=0||void 0===arguments[0]?{
can_show_selfcheck:1
}:arguments[0];
0===e.errcode&&(K.selfcheck_firsttime=0);
});
},
_initUEditor:function(e){
var t=this;
if("function"!=typeof window.__MpEditor)return void setTimeout(function(){
t._initUEditor(e);
},100);
t._initFormItemsOpt();
var i=S.getEditorPluginsMap(wx.cgiData.pluginmgr_info.list),r=T.getEditorPluginsObject({
can_use_txvideo:wx.cgiData.can_use_txvideo,
show_share_dialog:wx.cgiData.can_pub_video,
biz_uin:K.biz_uin,
has_ad:wx.cgiData.has_ad,
can_use_voice:wx.cgiData.can_use_voice,
qqmusic_flag:wx.cgiData.qqmusic_flag,
can_use_hyperlink:wx.cgiData.can_use_hyperlink,
can_use_appmsg_outer_url:wx.cgiData.can_use_appmsg_outer_url,
token:wx.data.t,
appmsg_template_cnt:wx.cgiData.appmsg_template_cnt,
can_see_product:1===wx.cgiData.can_see_product?!0:!1,
can_use_smart:1===wx.cgiData.can_use_smart?!0:!1,
can_use_product:1===wx.cgiData.can_use_product?!0:!1,
can_use_wxopen_link:1===wx.cgiData.can_use_wxopen_link?!0:!1,
ueditor:t.ueditor,
cpsTipStatus:{
choiceNoCommissionNeedTip:!0
},
can_use_importfile:!0,
can_insert_videosnap:wx.cgiData.canInsertVideoSnap,
pluginmgr_info_list_map:i,
plugin_class_name:"tpl_item",
menu_plugin_class_name:"tpl_dropdown_menu_item",
fold_toolbar_event_name:"foldToolbar"
}),a=["undo","redo","|","removeformat","formatmatch","|","fontsize","bold","italic","underline","strikethrough","forecolor","backcolor","|","justify","indent","justifyindent","rowspacingtop","rowspacingbottom","lineheight","letterspacing","insertlist","imagefloat","|","inserttable","blockquote","horizontal","insertcode","mpemotion","more"];
r.push(new L({
domid:i[6]?"#js_editor_inserttemplate":null,
container:i[6]&&0==i[6].hide?"#js_editor_inserttemplate":"",
token:wx.data.t,
info:i[6]
})),r.push(new A),Y.mark("appmsg","initEditor","start"),window.wx.cgiData.can_show_selfcheck?$("#js_editor_legalCheck").show():$("#js_editor_legalCheck").hide(),
n=t.ueditor=new window.__MpEditor({
maxArticleNum:8,
app_id:(wx.cgiData.app_id||Math.random())+"",
needCheckText:!0,
wordCount:!0,
multipleTab:!1,
plugins:r,
initialFrameWidth:2e3,
autoHeightEnabled:!0,
topOffset:0,
is_illegal:1*t.appmsg_data.is_illegal||0,
toolbars:[a],
curList:[],
onReady:function(){
Y.mark("appmsg","initEditor","end"),Y.saveSpeeds("appmsg","initEditor",35)&&Y.send(),
Y.mark("appmsg","initEditArea","start"),t._initEditArea(),Y.mark("appmsg","initEditArea","end"),
Y.saveSpeeds("appmsg","initEditArea",45)&&Y.send(),Y.mark("appmsg","initArticleList","start"),
$("#editor_pannel").show(),t.articleList=new E($.extend({
createType:wx.cgiData.createType,
maxNum:8,
ueditor:t.ueditor,
freeUEditor:t.freeUEditor,
is_illegal:1*t.appmsg_data.is_illegal||0,
is_rumor:1*t.appmsg_data.is_rumor||0,
formItemsOpt:t.formItemsOpt,
is_malicious:1*t.appmsg_data.is_malicious||0
},t.opt)),$(t.ueditor.getDom("_iframeholder")).show(),$("#article_setting_area").show(),
$("#history_bt").show(),$("#bottom_main").show(),$(".edui-combox.js_toolbar_more").find(".edui-arrow").css("cssText","display:none!important"),
$(".edui-combox.js_toolbar_more").css("cssText","display:none!important"),$("#editor_pannel").css("minHeight",$(window).height()-$("#header").height()),
t._bindEvent(),t._initRecentList(),window._points&&(window._points[11]=+new Date),
Y.mark("appmsg","initArticleList","end"),Y.saveSpeeds("appmsg","initArticleList",27)&&Y.send(),
t._reportAppmsg(),t.handleCheckMusicResult(),1===wx.cgiData.isSend&&$("#js_send").trigger("click");
}
}),n.render("js_editor"),n.addListener("is_use_editor",function(){
return!$("#edui1_iframeholder").is(":hidden");
}),n.addListener("begincatchimage",function(){
w.suc("内容已上传完成");
}),n.addListener("after_change_article",function(e,i){
rt.canShowArticlePanel=!1,rt.$articlePanel&&rt.$articlePanel.hide(),"replace"===i?t.ueditor.fireEvent("reportAddNum",65080,121,1):"add"===i&&t.ueditor.fireEvent("reportAddNum",65080,122,1),
setTimeout(function(){
rt.canShowArticlePanel=!0;
},500);
}),n.addListener("showEditorMsgTips",function(e,i){
$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text(i.msg);
}),n.addListener("catchremotesuccess",function(e,i,r,a){
n.fireEvent("update_remote_img",{
article:i.article,
remoteType:"success",
uid:i.uid,
format:a,
img_url:r
});
var o=$(n.getDocument()).find(".js_catchremoteimageerror").length;
0==o?$(".js_catch_tips",t.$editor).hide():$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text("有%s张图片上传失败".sprintf(o));
}),n.addListener("catchremoteerror",function(e,i,r){
if(console.log("catchremoteerror",i,r),i&&n.fireEvent("update_remote_img",{
article:i.article,
remoteType:"error",
uid:i.uid,
img_url:i.defaultRemoteImg
}),r)$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text(r);else{
var a=$(n.getDocument()).find(".js_catchremoteimageerror").length;
0==a?$(".js_catch_tips",t.$editor).hide():$(".js_catch_tips",t.$editor).show().find(".js_msg_content").text("有%s张图片上传失败".sprintf(a));
}
}),n.addListener("setCurrentAritleTitle",function(e,i){
if(t.articleList){
var r=$.trim(i).html(!0),a=t.articleList&&t.articleList.getCurrentArticle();
a&&a.find(".js_appmsg_title").html(r||"标题");
}
}),n.addListener("scrollIntoView",function(e,t,i){
var r=this;
rt.scrollIntoViewid&&clearTimeout(rt.scrollIntoViewid),rt.scrollIntoViewid=setTimeout(function(){
var e=n.getDomUtils();
if(t=$(t)[0],0==rt.scrollIntoViewCount&&t&&e.inDoc(t,t.ownerDocument)){
var a=null;
if(3===t.nodeType){
var o=r.selection.getRange(),s=o.createBookmark(),d=t.ownerDocument.createElement("span");
t.parentNode.insertBefore(d,t),d.appendChild(t),a=$(d).offset().top,d.parentNode.insertBefore(t,d),
d.parentNode.removeChild(d),o.moveToBookmark(s).select(!0);
}else a=$(t).offset().top;
rt.scrollIntoViewCount=2,$("html, body").animate({
scrollTop:a-(i||50)
},null,null,function(){
rt.scrollIntoViewCount--;
});
}
},100);
}),n.addListener("showErrMsg",function(e,t,i){
$(t).show().find(".js_msg_content").text(i);
}),n.addListener("hideAllErrMsg",function(){
t.$editor.find(".js_error_msg,.js_tip_mask_msg").hide(),t.$editor.find(".js_tip_mask").removeClass("error_mask"),
$("#js_labels_error").hide();
}),n.addListener("keyup",function(){
$(".js_content_error",t.$editor).hide(),$(".page_msg.js_warn").hide(),$("#js_draft_tips").hide();
}),n.addListener("aftersetcontent",function(){
var e=t.articleList&&t.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&e.setPayPopup({
mode:"init"
});
}),n.addListener("afterAdjustHeightFnExcute",function(){
$(window).trigger("scroll",!1);
var e=t.articleList&&t.articleList.getCurrentArticleObject();
e&&e.data.get("is_pay_subscribe")&&e.setPayPopup({
mode:"update"
});
}),n.addListener("focus",function(){
$(".page_msg.js_warn").hide(),n.enableToolbar();
}),n.addListener("renderReadOnly",function(e,i){
0==dt?t._renderReadOnly(i):(ot=!0,st=i);
}),n.addListener("isReadOnly",function(){
return rt.isReadOnly;
}),n.addListener("renderEditorByType",function(e,i,r){
var a=i,n="number"==typeof i?i:a.type;
t._renderEditorByType(n,r,a);
}),n.addListener("setTitleStatus",function(e,i){
t._setTitleStatus(i);
}),n.addListener("setAuthorStatus",function(e,i){
t._setAuthorStatus(i);
}),n.addListener("switchContentType",function(e,i){
t._switchContentType(i);
}),n.addListener("setToolBarStatus",function(e,i){
t._setToolBarStatus(i);
}),n.addListener("setArticleUrlStatus",function(e,i){
t._setArticleUrlStatus(i);
}),n.addListener("setAdInsertStatus",function(e,i){
t._setAdInsertStatus(i);
}),n.addListener("setMoreReadStatus",function(e,i){
t._setMoreReadStatus(i);
}),n.addListener("setCommentStatus",function(e,i){
t._setCommentStatus(i);
}),n.addListener("setOriginalStatus",function(e,i){
t._setOriginalStatus(i);
}),n.addListener("setCoverStatus",function(e,i){
t._setCoverStatus(i);
}),n.addListener("setDescriptionStatus",function(e,i){
t._setDescriptionStatus(i);
}),n.addListener("setFoldStatus",function(e,i,r){
t._setFoldStatus(i,r);
}),n.addListener("setSaveBtnStatus",function(e,i){
t._setSaveBtnStatus(i);
}),n.addListener("setCurRenderType",function(e,i){
t._setCurRenderType(i);
}),n.addListener("afterArticleSelect",function(){
$(window).trigger("scroll",!1),t._resizeUploadCover();
}),n.addListener("showVideoModifyDialog",function(){
y.show({
width:600,
type:"info",
className:"media_attr_edit_dialog dialog_weui_desktop",
msg:"群发时可直接修改标题和介绍语，群发成功后会覆盖素材库原有标题或介绍语。",
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
}),n.addListener("setArticleAdMode",function(e,i){
i=1===rt.curRenderType?i:N.none,setTimeout(function(){
if(t.articleList){
var e=t.articleList.getCurrentArticleObject().data.getData();
e.insert_ad_mode=i,$(".js_appmsg_item.current").data("insertadmode",i);
var r=t.$editor.find(".js_auto_insert_ad");
i==N.op?(r.checkbox().checked(!1),r.checkbox().disabled(!0),r.parent().find(".js_insert_ad_allow_click").removeClass("open"),
r.parent().find(".insert_ad_tips").show()):(r.checkbox().checked(i!=N.none),r.checkbox().disabled(!1),
r.parent().find(".js_insert_ad_allow_click").addClass("open"),r.parent().find(".insert_ad_tips").hide()),
t.handleAutoInsertCountTips(i,e.secondAutoAdAvailable,e.autoAdAvailable);
}
},50);
}),t.handleAutoInsertCountTipsTask(),document.addEventListener("EditorCpcDel",function(){
var e=t.$editor.find(".js_auto_insert_ad");
e.checkbox().checked(!1),e.checkbox().disabled(!1),e.parent().find(".js_insert_ad_allow_click").removeClass("open"),
e.parent().find(".insert_ad_tips").hide();
}),n.addListener("setArticleAdCategoriesList",function(e,i){
if("string"==typeof i)try{
i=JSON.parse(i);
}catch(r){}
t.articleList&&setTimeout(function(){
t.articleList.getCurrentArticleObject().data.getData().categories_list=i,$(".js_appmsg_item.current").data("categorieslist",i.join("|"));
},50);
}),n.addListener("updateTitleInputCounter",function(e,i){
t.formItemsOpt.title.counter.updateMaxLength(i);
}),"function"==typeof e.callback&&e.callback();
},
renderRewardSwtich:function(e){
var t=0,i=!1,r=!1;
e.authorTotalCount?e.writerid?1*e.can_open_reward?(1*e.can_reward?(i=!0,t=3):(i=!1,
t=4),r=!1):(r=!0,i=!1,t=2):(r=!1,i=!1,t=1):(r=!0,i=!1,t=wx.cgiData.totalInviteAuthorCnt>0&&wx.cgiData.inviteAuthorCnt>0?5:6),
e.$tipsDom.html(wx.T(_,{
inviteAuthorLink:e.inviteAuthorLink,
type:t,
author_username:e.author_username,
author:e.author,
author_encode:encodeURIComponent(e.author)
})).show(),e.$inputDom&&e.$inputDom.length&&(e.$inputDom.prop("disabled",r).prop("checked",i),
e.$rewardTips2020[i?"show":"hide"](),e.updateReprint&&this.updateReprintSwitchByReward({
multiMediaText:e.multiMediaText,
rewardChecked:i,
$reprintSwitchDom:e.$reprintSwitchDom,
$reprintTipDom:e.$reprintTipDom,
reprintOptions:e.reprintOptions
}),e.$rewardReplyContainer&&this.updateReplyByReward({
$rewardReplyContainer:e.$rewardReplyContainer,
author:e.author,
rewardChecked:i,
reward_reply_id:e.reward_reply_id||"",
$dom:$(".original_dialog")
})),e.$authorityContainer&&e.$customerauthorContainer&&this.showOriginInputDom(t>=2&&4>=t?{
$authorityLabel:e.$authorityLabel,
$customerauthorLabel:e.$customerauthorLabel,
$authorityContainer:e.$authorityContainer,
$customerauthorContainer:e.$customerauthorContainer,
$authorityTips:e.$authorityTips,
showAuthority:!0,
author:e.author,
writerid:e.writerid
}:{
$authorityLabel:e.$authorityLabel,
$customerauthorLabel:e.$customerauthorLabel,
$authorityContainer:e.$authorityContainer,
$customerauthorContainer:e.$customerauthorContainer,
$authorityTips:e.$authorityTips,
showAuthority:!1,
author:e.author,
writerid:e.writerid,
trigger:!0
}),s.init({
$container:e.$tipsDom
});
},
updateReprintSwitchByReward:function(e){
e.multiMediaText||(e.rewardChecked?(e.$reprintSwitchDom.prop("disabled",!1),e.$reprintTipDom.text("开启后，所有公众号都可以转载此文章。")):(e.$reprintSwitchDom.prop("disabled",!0).prop("checked",!1),
e.$reprintTipDom.text("开启赞赏之后才能开启开放转载。")));
},
updateReplyByReward:function(e){
if(e.rewardChecked&&e.author){
e.$rewardReplyContainer.show();
var t=this,i=e.$rewardReplyContainer.find(".js_reply_list_container");
t.getRewardReplyList({
$dom:e.$rewardReplyContainer,
replyId:e.reward_reply_id
},function(r){
function a(e){
return e=e||"",e.emoji();
}
var n=e.$rewardReplyContainer.find(".js_not_reply_tips"),o=e.$rewardReplyContainer.find(".js_has_reply_tips"),s=e.$rewardReplyContainer.find(".js_choose_reply_tips");
if(!r||0===r.length)return n.show(),o.hide(),void s.hide();
e.reward_reply_id?(n.hide(),o.show(),s.hide()):(n.hide(),o.hide(),s.show());
var d=!1,c=e.$dom;
r&&r.forEach(function(t){
t.extrClass="",t.reply_id==e.reward_reply_id&&(t.extrClass="selected",d=!0),2!==t.type||t.text||(t.text="图片："+t.title),
t.text=t.text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;").replace(/\'/g,""),t.text=a(t.text).replace(/\n/g,"<br>");
});
var _=c.data("author_info");
e.reward_reply_id||d||!rt.isRewardSwitched||(r[0].extrClass="selected",_.reward_reply_id=r[0].reply_id,
t.ueditor.fireEvent("changeAuthorInfo",_,!0),n.hide(),o.show(),s.hide()),i.html(template.render("tpl_reward_reply_list",{
list:r
})),i.show();
});
}else e.$rewardReplyContainer.hide();
},
getRewardReplyList:function(e,t){
var i=e.$dom,r=e.replyId,a=i.find(".js_reply_list_loading"),n=i.find(".js_reply_list_container");
a.show(),n.hide(),n.html(""),x.get({
url:"/merchant/reward?action=getautoreply&ignore_del_reply_id="+r,
data:{}
},function(e){
e.base_resp&&0===e.base_resp.ret?(t(e.reply_infos),a.hide()):(x.handleRet(e,{
msg:"赞赏回复拉取失败，请稍后重试",
ret:e.base_resp.ret
}),t(null),a.hide());
},function(e){
x.handleRet(e,{
msg:"赞赏回复拉取失败，请稍后重试"
});
});
},
showOriginInputDom:function(e){
if(e.showAuthority){
e.$authorityContainer.show(),e.$customerauthorContainer.hide(),e.$authorityLabel.show(),
e.$customerauthorLabel.hide(),e.writerid?(d.highlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
}),e.$authorityTips.show()):(d.resetHighlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
}),e.$authorityTips.hide());
var t=e.$authorityContainer.find("input.js_author");
t.val(e.author),e.trigger&&t.trigger("keyup",{
keyCode:13
});
}else{
e.$authorityTips.hide(),e.$authorityContainer.hide(),e.$customerauthorContainer.show(),
e.$authorityLabel.hide(),e.$customerauthorLabel.show(),d.resetHighlineAuthor({
$highline:e.$authorityContainer,
highlineClass:"author_active"
});
var i=e.$customerauthorContainer.find("input.js_author");
i.val(e.author),e.trigger&&i.trigger("keyup");
}
},
_initOriginal:function(){
var e=this,t=e.$editor,i=0,a=!1;
e.rencentArticleType=[{
name:"全部类别",
data:J
}],x.get({
url:"/cgi-bin/operate_appmsg?t=ajax-response&sub=get_recently_article_type",
data:{}
},function(t){
if(t&&t.items&&t.items.length){
var i={
name:"最近使用",
data:[]
};
$.each(t.items,function(e,t){
i.data.push({
name:t.article_type,
value:t.article_type,
disabled:!1
});
}),e.rencentArticleType.unshift(i);
}
}),t.find(".js_ori_container").mouseenter(nt(function(){
var e=t.find(".js_ori_operate");
e.show();
},150)),t.find(".js_ori_container").mouseleave(nt(function(){
var e=t.find(".js_ori_operate"),i=t.find(".js_original_opr");
i.is(":hidden")&&e.hide();
},150)),t.find(".js_ori_operate").click(function(){
t.find(".js_original_opr").toggle();
}),$(document.body).click(function(e){
var i=$(e.target);
i.hasClass("js_ori_operate")||i.parent().hasClass("js_ori_operate")||(t.find(".js_ori_operate").hide(),
t.find(".js_original_opr").hide());
}),$(".js_original_apply").on("click",function(n){
var o=$(n.target),s=o.prop("checked"),c=e.articleList&&e.articleList.getCurrentArticleObject(),_=c&&c.data,u=1===_.get("is_pay_subscribe"),m=2===_.get("copyright_type");
if(!m&&window.wx.cgiData.can_use_copyright)if(s||o.hasClass("js_edit_ori")||o.hasClass("js_edit_whitelist_btn")&&!u){
var f,g,v,j=function(){
var o=function(){
2==f&&(a=!1,s(n));
},s=function(t){
function a(e){
return N.length>0&&$.each(e.list,function(t,i){
$.each(N,function(e,t){
n(i,t.openid);
}),"function"==typeof e.cb&&e.cb(i);
}),e.list;
}
function n(e,t){
e.openid===t&&(e.isSelect=!0);
}
function o(e){
var t=[];
return e.can_modify&&t.push("可修改文章"),e.can_hide_source&&t.push("不显示转载来源"),t.join("，");
}
function s(t){
var i=t.el,r=t.close,a=$(i);
if(e._checkOriginal(a)){
var n=a.find(".js_original_type_radio").eq(0).prop("checked")?0:1;
_.set("is_cartoon_copyright",n),u||$(".js_edit_whitelist_btn").show(),$(".js_pay_open").eq(0).hide(),
$(".js_pay_open").eq(1).show(),$(".js_ori_setting_checkbox").eq(0).prop("checked",!1),
$(".js_original_type").hide().eq(1).show(),$.each(N,function(e,t){
t.title=o(t);
}),$("#js_original").find(".js_whitelist").html(template.render("tpl_whitelist",{
list:N
})),N&&N.length?$("#js_original").find(".js_original_item").show():$("#js_original").find(".js_original_item").hide();
var s=a.data("author_info");
j.prop("checked")?$("#js_original").find(".js_reward_tips").text("已开启"):($("#js_original").find(".js_reward_tips").text("未开启"),
s.writerid="",s.author_username="",s.author_status=1,s.can_open_reward=0,s.can_reward=0,
s.reward_reply_id=""),c.setAuthorInfo({
copyright_type:1,
writerid:s.writerid||"",
author_username:s.author_username||"",
author:s.author,
author_status:1*s.author_status,
can_open_reward:1*s.can_open_reward,
can_reward:1*s.can_open_reward&&j.prop("checked")?1:0,
reward_reply_id:s.reward_reply_id||""
}),D.set(rt.originalProtoKey,"1"),rt.isRewardSwitched=!1,c.renderArticleTags(),r();
}
}
function m(r){
function s(e){
2==e&&(rt.isRewardSwitched=!1,N.length&&u());
}
function c(e){
M=e,J.html(template.render("js_recently_article_whitelist_tpl",{
list:"recent"===e?q:B,
type:e
})).show();
}
function _(){
J.hide();
}
function u(e){
if(e){
var t=Number(j.prop("checked"));
$.each(N,function(e,i){
i.can_reward=t,i.title=o(i);
});
}
$("#js_article_whitelist_added").html(template.render("js_article_whitelist_added_tpl",{
list:N
})).show(),N.length?(K.parent().show(),K.prop("checked")?D.find(".js_btn_p:eq(2)").enable():D.find(".js_btn_p:eq(2)").disable()):(K.parent().hide(),
D.find(".js_btn_p:eq(2)").enable());
}
function p(e){
H||(H=!0,x.post({
url:"/cgi-bin/appmsgcopyright?action=searchacct",
data:{
username:e
},
complete:function(){
H=!1;
}
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.search_list?(B=a({
list:e.search_list,
cb:function(e){
e.pic_url&&(e.pic_url=e.pic_url.endsWith("/0")?e.pic_url:e.pic_url+"/0");
}
}),c("search")):w.err(e.base_resp&&200013==e.base_resp.ret?"操作频繁，请稍后重试":"系统繁忙，请稍后重试("+e.base_resp.ret+")");
}));
}
function m(e){
e.direction=e.direction||"bottom",e.offset=e.offset||0;
var t=e.target.getBoundingClientRect()[e.direction],i=e.container.getBoundingClientRect()[e.direction];
switch(e.direction){
case"top":
case"left":
if(!e.isForce&&t>i)return;
break;

case"bottom":
case"right":
if(!e.isForce&&i>t)return;
}
e.container[["top","bottom"].indexOf(e.direction)>-1?"scrollTop":"scrollLeft"]+=t-i+e.offset;
}
var D=$(r.$el),P=D.find(".js_add_whitelist_btn"),U=D.find(".js_search_wrap"),z=$("#js_article_whitelist_setting_row"),V=$("#js_article_whitelist_search"),J=$("#js_article_whitelist_search_result"),Y=document.getElementById("js_original_edit_box"),K=D.find(".js_agree");
f=D.find(".js_reward_tips"),j=D.find("input.js_reward_switch"),y=D.find(".js_authority_label"),
k=D.find(".js_customerauthor_label"),S=D.find(".js_authority_container"),C=D.find(".js_search_del_btn"),
T=D.find(".js_search_btn"),L=S.find("input"),A=D.find(".js_customerauthor_container"),
I=A.find("input"),E=D.find(".js_authority_tips"),O=D.find(".js_reward_reply_box"),
r.$watch("curStep",s,{
immediate:!0
}),N.length&&(P.hide(),U.show());
var X=function(t,r){
if(t.author=$.trim(t.author||""),D.data("author_info",t),r!==!0){
var a={
$authorityLabel:y,
$customerauthorLabel:k,
$authorityContainer:S,
$customerauthorContainer:A,
$authorityTips:E,
$tipsDom:f,
$inputDom:j,
authorTotalCount:i,
author:t.author,
writerid:t.writerid,
author_username:t.author_username,
can_open_reward:t.can_open_reward,
can_reward:t.can_reward,
reward_reply_id:t.reward_reply_id,
inviteAuthorLink:R,
multiMediaText:F,
$reprintSwitchDom:$("#js_enable_reprint"),
$reprintTipDom:D.find(".js_reprint_tip"),
reprintOptions:W,
updateReprint:t.updateReprint,
$rewardReplyContainer:O,
$rewardTips2020:D.find(".js_reward_tips_2020")
};
e.renderRewardSwtich(a);
}
};
X({
author:v,
writerid:g.writerid,
author_username:g.author_username,
can_open_reward:g.can_open_reward,
author_status:g.author_status,
can_reward:g.copyright_type?g.can_reward:1,
reward_reply_id:g.reward_reply_id,
updateReprint:!0
}),e.ueditor.addListener("changeAuthorInfo",function(e,t,i){
X(t,i);
}),D.find(".js_reprint_frm").checkbox({
multi:!1
}),d.initAuthorSearchList({
$inputContainer:L,
$listContainer:D.find(".js_author_list"),
$highline:S,
highlineClass:"author_active",
inviteAuthorLink:R,
stateChange:function(e){
j.prop("checked")&&(L.val()?C.show():C.hide(),e?(X({
author:e.nickname,
writerid:e.writerid,
author_username:e.username,
can_open_reward:1*e.can_reward,
author_status:1*e.author_status,
can_reward:1*e.can_reward?1:0
}),D.find(".js_authority_tips").show(),l.setHistory({
author:[{
writerid:e.writerid
}]
})):(X({
author:"",
writerid:"",
author_username:"",
can_open_reward:0,
author_status:1,
can_reward:0,
reward_reply_id:""
},!0),D.find(".js_reward_reply_box").hide(),D.find(".js_authority_tips").hide()),
D.find(".js_author_error").hide());
}
}),j.on("change",function(){
var t,i,r=$(this).prop("checked");
r?(t=I.val(),i=!0,rt.isRewardSwitched=!0,D.find(".js_reward_tips_2020").show()):(t=L.val(),
i=!1,rt.isRewardSwitched=!1,D.find(".js_reward_tips_2020").hide()),e.updateReprintSwitchByReward({
multiMediaText:F,
rewardChecked:r,
$reprintSwitchDom:$("#js_enable_reprint"),
$reprintTipDom:D.find(".js_reprint_tip"),
reprintOptions:W
}),e.updateReplyByReward({
$rewardReplyContainer:O,
rewardChecked:r,
author:t,
reward_reply_id:g.reward_reply_id||"",
$dom:D
}),e.showOriginInputDom({
$authorityContainer:S,
$customerauthorContainer:A,
$authorityTips:E,
showAuthority:i,
$authorityLabel:y,
$customerauthorLabel:k,
author:t,
trigger:!0
});
var a={
author:t,
writerid:"",
author_username:"",
can_open_reward:0,
can_reward:0,
author_status:1,
updateReprint:!0
};
X(a,!0),D.find(".js_author_error").hide(),D.find(".js_authority_tips").hide(),u(!0);
}),new h(I,{
maxLength:I.attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}),I.on("keyup",function(){
var e={
author:$(this).val()||"",
writerid:"",
author_username:"",
can_open_reward:0,
can_reward:0,
author_status:1
};
X(e,!0),D.find(".js_author_error").hide();
}),C.on("click",function(){
d.removeAuthorListDom(),L.val("").trigger("keyup"),C.hide();
}),T.on("click",function(){
L.trigger("keyup",{
keyCode:13
});
});
var G,Q=function(){
var e=$(this);
if(e){
e.find(".js_reply_item_inner").addClass("hover");
var t=e.find(".js_reply_text");
t[0]&&t[0].scrollHeight>t[0].clientHeight&&(G=new b({
dom:t,
content:t.html(),
place:"top",
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
},
onHide:function(){}
}),G.hide(),setTimeout(function(){
G.show();
},500));
}
},Z=function(){
var e=$(this);
e&&(e.find(".js_reply_item_inner").removeClass("hover"),G&&G.remove());
},et=O.find(".js_reply_list_container"),tt=O.find(".js_has_reply_tips"),it=O.find(".js_choose_reply_tips");
et.on("mouseenter",".js_reply_item",Q),et.on("mouseleave",".js_reply_item",Z),et.on("click",".js_reply_item",function(){
var e=$(this),t=D.data("author_info");
if(e.hasClass("selected"))e.removeClass("selected"),e.find(".js_reply_item_inner").removeClass("hover"),
t.reward_reply_id="",X(t,!0),it.show(),tt.hide();else{
$(".js_reply_item").removeClass("selected"),e.addClass("selected");
var i=e.data("replyid");
t.reward_reply_id=i,X(t,!0),it.hide(),tt.show();
}
}),D.find(".js_article_whitelist").hover(function(){
new b({
dom:this,
content:"通过添加白名单，授权某些公众帐号可以转载文章，并允许修改或不显示转载来源，在文章群发后生效。如果文章开启了赞赏，转载文也会支持赞赏作者。",
isToggle:!0
});
});
var at=$(t.target);
if(at.hasClass("js_edit_whitelist")||at.hasClass("js_edit_whitelist_btn")){
P.remove(),U.show();
var nt=z[0].getBoundingClientRect().top-30,ot=Y.getBoundingClientRect().top;
Y.scrollTop+=nt-ot;
}
P.on("click",function(){
P.remove(),U.show();
}),V.on("focus",function(){
""===$.trim(V.val())&&c("recent"),m({
target:J[0],
container:Y,
offset:10
});
}),V.on("keyup",function(e){
var t=$.trim(e.target.value);
""===t?($("#js_article_whitelist_clear").hide(),c("recent")):($("#js_article_whitelist_clear").show(),
_(),13===e.keyCode&&p(t)),m({
target:J[0],
container:Y,
offset:10
});
}),$("#js_article_whitelist_clear").click(function(){
V.val(""),$("#js_article_whitelist_clear").hide();
}),D.find(".js_search").click(function(){
var e=$.trim(V.val());
""!==e&&p(e);
}),J.click(function(e){
for(var t=$(e.target);"js_article_whitelist_search_result"!==t.attr("id")&&!t.hasClass("js_add");)t=t.parent();
if(t.hasClass("js_add")){
var i={
nickname:t.data("nickname"),
openid:t.data("openid"),
wx_name:t.data("wx_name"),
username:t.data("username"),
avatar:t.data("avatar"),
can_modify:1,
can_reward:Number(j.prop("checked")),
can_hide_source:0
};
return i.title=o(i),N.push(i),("recent"===M?q:B).forEach(function(e){
n(e,t.data("openid"));
}),c(M),u(),!1;
}
}),$("#js_article_whitelist_added").click(function(e){
var t=$(e.target);
if(t.hasClass("js_remove"))N.splice(Number(t.data("index")),1),u(),q.forEach(function(e){
e.openid==t.data("openid")&&delete e.isSelect;
}),c("recent");else if(t.hasClass("js_edit_right")){
var i=t.siblings(".js_title_wrap"),r=i.find(".js_title"),a=new b({
dom:i,
container:i,
content:template.render("js_article_whitelist_edit_right_tpl",{
canReward:1==t.data("can_reward"),
canHideSource:1==t.data("can_hide_source")
}),
hideIfBlur:!0,
onShow:function(){
this.resetPosition();
},
onHide:function(){
this.remove();
}
}),n=a.getDom();
n.find(".js_can_hide_source").on("change",function(e){
var i=$(e.target),n=i.prop("checked");
n?i.parent().addClass("selected"):i.parent().removeClass("selected");
var s=Number(t.data("index")),d=N[s];
d.can_hide_source=Number(n),d.title=o(d),r.html(d.title),t.data("can_hide_source",d.can_hide_source),
a.remove();
}),m({
target:n[0],
container:Y
});
}
}),D.click(function(e){
$(e.target).parents(".js_search_wrap").length||_();
}),D.find(".js_reward_popup_tips_2020").hover(function(){
new b({
dom:this,
content:"募捐，或类似资金筹集为目的的作品中使用涉及资金的相关功能的，包括但不限于公益筹款、众筹、乞讨，或者带有宗教信仰色彩的募集、募捐等。",
isToggle:!0
});
});
}
var f,j,y,k,C,T,S,L,A,I,E,O,P=$("#js_original"),R=wx.cgiData.inviteAuthorCnt>0?wx.url("/cgi-bin/safecenterstatus?action=inviteauthor"):"",M="",N=[],B=[],q=[],F="",U=e.articleList&&e.articleList.getCurrentArticle().data("article").flush().getData(),z=U&&U.content?U.content:"";
F=r(z,U),x.get({
url:"/cgi-bin/appmsgcopyright?action=get_recently_add"
},function(e){
e.base_resp&&0==e.base_resp.ret&&e.white_list&&(q=e.white_list,q=a({
list:q
}));
}),P.find(".js_whitelist .js_whitelist_item").each(function(e,t){
var i=$(t);
N.push({
nickname:i.data("nickname"),
title:i.attr("title"),
openid:i.data("openid"),
wx_name:i.data("wx_name"),
username:i.data("username"),
avatar:i.data("avatar"),
can_modify:1*i.data("can_modify"),
can_hide_source:1*i.data("can_hide_source"),
can_reward:1*i.data("can_reward")
});
});
var W=JSON.parse(localStorage.getItem("reprintOptions")),V="none"!==$("#js_original .js_original_type")[0].style.display;
null===W&&(W={
canReprint:!0,
canModify:!1
},localStorage.setItem("reprintOptions",JSON.stringify(W)));
var H=!1,J=1*(P.find(".js_type").data("value")||"");
p.fireEvent("showClaimOriginalDialog",{
data:{
type:J,
author:v||"",
frm:P.find(".js_reprint_frm").val()||1,
can_use_appmsg_source_url:K.can_use_appmsg_source_url,
biz_can_use_reward:1*K.can_use_reward,
canReprint:V?W.canReprint:"开启"===P.find(".js_can_reprint").text(),
canModify:V?W.canModify:"开启"===P.find(".js_can_modify").text(),
canUseOriginalReprint:K.can_use_original_reprint,
multiMediaText:F,
whitelist:N,
can_use_cartoon_copyright:K.can_use_cartoon_copyright,
hasOpenPayStatement:u,
agreeTerm:"1"==D.get(rt.originalProtoKey,"1"),
category:P.find(".js_classify").text()
},
onShow:m,
onConfirm:s
},function(){
var e=_.get("copyright_type");
!e&&$(".js_ori_setting_checkbox").prop("checked",!1);
});
};
return $(".js_ori_setting_checkbox").prop("checked",!0),a?{
v:void 0
}:(f=0,g=c.getAuthorInfo(),v=t.find("input.js_author").val(),a=!0,0==i?l.getAuthorList({
onError:function(){
f++,o();
},
onSuccess:function(e){
f++,i=e.totalCnt,o();
}
}):(f++,o()),void(1==g.copyright_type?(f++,o()):l.searchAuthorList({
nickname:v,
onError:function(){
f++,o();
},
onSuccess:function(e){
var t=e.writerlist[0]||null;
t&&1==t.can_reward&&0==t.author_status&&(g.writerid=t.writerid,g.author_username=t.username,
g.author=v,g.can_open_reward=t.can_reward,g.author_status=t.author_status,g.can_reward=1,
g.authority=1),f++,o();
}
})));
}();
if("object"===("undefined"==typeof j?"undefined":_typeof(j)))return j.v;
}else{
if(o.hasClass("js_edit_whitelist_btn")&&u)return;
$(".js_original_cancel").trigger("click");
}
}),$(".js_original_cancel").on("click",function(){
var i=e.articleList&&e.articleList.getCurrentArticleObject(),r=i.data,a=2===r.get("copyright_type");
if(!a){
$(".js_ori_setting_checkbox").prop("checked",!1),t.find(".js_pay_open").eq(0).show(),
t.find(".js_pay_open").eq(1).hide(),t.find("#js_pay_setting_preview").hide(),t.find(".js_pay_setting_checkbox").prop("checked",!1),
t.find("#payStatementStatus").text("未开启付费"),r.set("copyright_type",0),r.set("is_cartoon_copyright",0),
r.set("original_article_type",""),r.set("allow_reprint",""),r.set("releasefirst",""),
r.set("reprint_permit_type",""),r.set("allow_reprint_modify",""),r.set("ori_white_list",""),
r.set("is_pay_subscribe",0),r.set("pay_fee",""),r.set("pay_preview_percent",""),
r.set("pay_desc",""),r.set("pay_gifts_count",0),i.hidePayEducation(),i.renderPayRead();
var n=$("#js_original");
n.find(".js_author").text(""),e.formItemsOpt.author.counter.setCount(0),t.find(".js_original_type").hide().eq(0).show(),
t.find(".js_original_content").hide(),t.find(".js_whitelist").empty(),i.setAuthorInfo({
copyright_type:0,
writerid:"",
author_username:"",
author:"",
author_status:0,
can_open_reward:0,
can_reward:0
}),i.renderArticleTags();
}
}),$("#js_original").find(".js_whitelist_tips").length&&new b({
dom:$("#js_original").find(".js_whitelist_tips"),
content:"<p>通过添加白名单，授权某些公众帐号可以转载文章，并允许修改或不显示转载来源，在文章群发后生效。如果文章开启了赞赏，转载文也会支持赞赏作者。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$(".js_reward_ios_tips").length&&new b({
dom:$(".js_reward_ios_tips"),
content:"<p>赞赏功能在iOS上将改为转账，iOS用户可以向你转账任意金额或你设置的固定金额，固定金额只对此篇图文生效。仍保持T+7结算到原收款人的微信零钱包，仍可在赞赏功能里查看流水。</p>",
isToggle:!0,
onShow:function(){
this.resetPosition();
}
}).hide(),$("#js_original").on("click",".js_del_whitelist",function(){
$(this).parent().remove();
}),$("#js_original_detail").on("click",function(){
$(this).parent().toggleClass("open"),$(this).siblings("ul").toggle();
});
var n=!0,o=K.orginal_apply_stat,s=1==K.has_invited_original?"/acct/copyrightapply?action=apply":"/acct/selfapply?action=apply";
s=wx.url(s);
var c=$("#js_original_func_open").closest(".js_original_type"),_=function u(){
x.post({
url:"/cgi-bin/appmsg?action=get_original_stat"
},function(e){
if(e.base_resp&&0==e.base_resp.ret){
var t="";
switch(+e.orginal_apply_stat){
case 0:
t="原创声明：未开通";
break;

case 1:
t="原创声明：审核中",c.find(".opt").hide();
break;

case 2:
t="原创声明：申请失败",c.find(".opt").hide();
break;

case 3:
t="原创：未声明",c.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
}
c.find(".subtitle").text(t),o=e.orginal_apply_stat;
}
3!=e.orginal_apply_stat&&setTimeout(u,2e3);
});
};
$("#js_original_func_open").on("click",function(){
0==o&&window.open(s),n&&(n=!1,setTimeout(_,2e3));
});
},
_initPay:function(){
var e=this,t=$("#js_pay_setting_area"),i=this.$editor;
t&&t.length>0&&!function(){
var t=i.find("#js_pay_setting_preview")[0];
i.find(".js_pay_setting_checkbox").checkbox({
onChanged:function(i){
var r=e.articleList&&e.articleList.getCurrentArticleObject(),a=r.data,n=a.get("copyright_type");
if(1===n){
var o=i.prop("checked");
o&&"none"===t.style.display?e._showPayStatementDialog():o||""!==t.style.display||($(".js_whitelist").removeClass("lbl_content_desc"),
$(".js_edit_whitelist_btn").show(),a.set("is_pay_subscribe",0),a.set("pay_fee",""),
a.set("pay_preview_percent",""),a.set("pay_desc",""),a.set("pay_gifts_count",0),
r.hidePayEducation(),r.renderPayRead(),r.renderArticleTags());
}
}
}),$("#js_edit_pay_setting").on("click",function(){
e._showPayStatementDialog(!0);
});
var r=$("#js_pay_preview_popup_temp"),a=$("#js_pay_preview_popup"),n=$("#js_pay_preview_popup_mask");
r.on("mouseover",function(){
ct&&(window.clearTimeout(ct),ct=null);
}).on("click",function(){
var t=e.articleList&&e.articleList.getCurrentArticleObject();
a.data("offset",1*r.data("offset")),t.hidePayEducation(),t.setPayPopup({
mode:"update"
}),t.setTempPayPopup({
mode:"hide"
});
}),a.on("mouseover",function(){
n.show();
}).on("mouseout",function(){
n.hide();
});
}();
},
_showPayStatementDialog:function(e){
var t=this.articleList&&this.articleList.getCurrentArticleObject(),i=t.data,r={
isShow:!0,
readProportion:window.wx.cgiData.default_preview_percent,
priceOptionList:window.wx.cgiData.price_option_list
};
e&&(r.payGiftsCount=i.get("pay_gifts_count"),r.payNumber=i.get("pay_fee"),r.readProportion=i.get("pay_preview_percent"),
r.description=i.get("pay_desc"),r.step=2),p.fireEvent("showPayStatementDialog",r,function(r){
r.cancel?0===i.get("is_pay_subscribe")&&($("#payStatementStatus").text("未开启付费"),
$(".js_pay_setting_checkbox").prop("checked",!1)):($("#payStatementStatus").text("已开启付费"),
i.set("ori_white_list",""),$(".js_edit_whitelist_btn").hide(),$(".js_whitelist").text("付费图文不支持白名单转载").addClass("lbl_content_desc"),
i.set("is_pay_subscribe",1),i.set("pay_fee",r.payNumber),i.set("pay_preview_percent",r.readProportion),
i.set("pay_desc",r.description),i.set("pay_gifts_count",r.payGiftsCount),t.showPayEducation(),
t.renderPayRead(!0,e),t.renderArticleTags()),delete r.cancel,p.fireEvent("showPayStatementDialog",$.extend({
isShow:!1,
step:2
},r));
});
},
_initBan:function(){
var e=this.$editor,t=e.find(".js_url_area"),i=17,r=function(){
var e;
$.each(K.func_ban_info,function(t,r){
r.func_id==i&&(e=r);
});
var r=k.getReason(e.reason_id),a='你的帐号<a href="'+(r.pc_url?r.pc_url:defaultReason.pc_url)+'">'+r.reason_description+"</a>，",n=new Date(1e3*e.unlock_time);
e.ban_time==e.unlock_time?a+="已被永久屏蔽阅读原文功能。":(a+="已被屏蔽阅读原文功能至",a+=n.getFullYear()+"/"+(n.getMonth()+1)+"/"+n.getDate(),
a+="，期间阅读原文将不可用。"),t.find(".js_url_checkbox").attr("disabled",!0).attr("checked",!1).parent().addClass("disabled"),
$(".js_url").attr("disabled",!0).parent().addClass("disabled"),$(".js_url_ban_wording").html(a);
};
k(K.func_ban_info,"source-url")?K.can_use_appmsg_source_url||t.hide():r();
},
_initAd:function(){
var e=this.$editor;
e.on("click",".js_del_ad",function(){
e.find(".js_ad_preview").html(""),e.find(".js_ad_preview").parent().hide(),$("#js_editor_insertad").removeClass("disabled");
});
},
_initArticleTags:function(){
var e=this,t=this,i=this.$editor,r=i.find("#js_article_tags_area"),a=r.find(".js_article_tags"),n=a.parent(),o=function(e){
a.prop("checked",e),n[e?"addClass":"removeClass"]("selected");
};
r.click(function(i){
if(!a.prop("disabled")){
for(var n=$(i.target);!n.hasClass("js_article_tags_label")&&"js_article_tags_area"!==n[0].id;)n=n.parent();
var s=t.articleList&&t.articleList.getCurrentArticleObject(),d=s.data.getData();
return n.hasClass("js_article_tags_label")?e._showArticleTagsDialog({
data:{
tags:JSON.parse(a.data("value")),
tagType:Number(d.share_page_type)
},
confirmCallback:function(){
return o(!0);
}
}):a.prop("checked")?(o(!1),a.data("value","[]"),r.find(".js_article_tags_content").text("")):e._showArticleTagsDialog({
data:{
tagType:Number(d.share_page_type)
},
confirmCallback:function(){
return o(!0);
}
}),!1;
}
});
},
_showArticleTagsDialog:function(e){
var t=this,i=e.data,r=e.confirmCallback,a=this.articleList&&this.articleList.getCurrentArticleObject(),n=a.data.get("copyright_type"),o=5===a.data.get("share_page_type"),s=2===wx.cgiData.realname_type||9===wx.cgiData.realname_type;
s||1*n===1||o?(i=$.extend({
isShow:!0
},i||{}),p.fireEvent("showArticleTagsDialog",i,function(e){
e.cancel||!function(){
console.log(e.tags);
var i=t.$editor.find("#js_article_tags_area");
i.find(".js_article_tags").data("value",JSON.stringify(e.tags));
var a=[];
e.tags.forEach(function(e){
a.push(e.title);
}),i.find(".js_article_tags_content").text(a.join("，")),"function"==typeof r&&r();
}();
})):w.err("请在声明原创后使用话题标签功能");
},
_showPayDialog:function(e){
var t=this,i=t.$editor,r=e.popup("get");
r.find(".js_fee").val($(".js_fee",i).text()),r.find(".js_step_panel").hide().eq(0).show(),
r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(0).show(),r.find(".js_btn_p").eq(1).show(),
e._step.setStep(1),e.popup("show");
},
_createPayDialog:function(){
var e=this,t=e.$editor,i=$("#tpl_pay").popup({
title:"付费阅读设置",
width:960,
className:"simple align_edge pay_dialog",
autoShow:!1,
data:{},
buttons:[{
text:"取消",
click:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var i=e.freeUEditor.val(),n=r.find(".js_fee").val();
return""==i?void w.err("免费区域不能为空"):g.rangelength(i,[20,200])?!n||!/^\d*(\.\d+)?$/.test(n)||n.toString().match(/\.\d{3,}/)||.01>n?void w.err("请输入正确的金额"):.01>n?void w.err("金额必须大于零"):n>200?void w.err("金额不能超过200元"):(r.find(".js_content").html(i),
r.find(".js_content_count").text(e.ueditor.getUeditor().getContent().text().length),
r.find(".js_fee_preview").text(parseFloat(n).toFixed(2)),r.find(".js_nickname").text(wx.data.nick_name),
r.find(".js_title").text($.trim($(".js_title",t).val())),r.find(".js_author").text($.trim($(".js_author",t).val())),
r.find(".js_date").text(v().format("YYYY-MM-DD")),r.find(".js_step_panel").hide().eq(1).show(),
r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(2).show(),r.find(".js_btn_p").eq(3).show(),
r.find(".js_preview").scrollTop(1e8),a.setStep(2),void this.resetPosition()):void w.err("正文字数要多于20字且不能超过200字");
}
},{
text:"上一步",
click:function(){
r.find(".js_step_panel").hide().eq(0).show(),r.find(".js_btn_p").hide(),r.find(".js_btn_p").eq(0).show(),
r.find(".js_btn_p").eq(1).show(),a.setStep(1),this.resetPosition();
}
},{
text:"确定",
type:"primary",
click:function(){
$(".js_pay_setting",t).show().find(".js_fee").text((+r.find(".js_fee").val()).toFixed(2)),
$(".js_pay_tips",t).hide(),this.hide();
}
}],
onClose:function(){
$(".js_pay_setting",t).is(":visible")||$("#js_pay",t).checkbox("checked",!1),i.popup("hide");
},
onShow:function(){
this.resetPosition();
}
}),r=i.popup("get");
r.find(".js_btn_p").eq(2).hide(),r.find(".js_btn_p").eq(3).hide();
var a=new m({
container:r.find(".js_step"),
selected:1,
names:["设置","预览并确认"]
});
return e.freeUEditor=r.find(".js_editor"),new h(e.freeUEditor,{
minLength:20,
maxLength:200
}),r.find(".js_fee").on("input propertychange",function(){
var e=$(this).val();
e&&/^\d*(\.\d+)?$/.test(e)&&!e.toString().match(/\.\d{3,}/)?.01>e?$(this).parent().addClass("error"):e>200?$(this).parent().addClass("error"):$(this).parent().removeClass("error"):$(this).parent().addClass("error");
}),i.popup("resetPosition"),i._step=a,i;
},
_checkOriginal:function(e){
var t=!0,i="",r="checked"==e.find(".js_forIEbug_frm").attr("checked")?1:e.find(".js_reprint_frm:checked").val(),a=e.data("author_info"),n=a.author,o=a.writerid,s=!!e.find("#js_enable_reprint").prop("checked"),d=!1,c=e.find("#js_original_article_type").val();
if(e.find("input.js_reward_switch").prop("checked")?n&&o?e.find(".js_author_error").hide():(e.find(".js_author_error").text("请选择赞赏账户").show(),
i=i||"请选择赞赏账户",t=!1):n.len()>16||n.len()<=0?(e.find(".js_author_error").text("作者不能为空且不超过8个字").show(),
i=i||"作者不能为空且不超过8个字",t=!1):e.find(".js_author_error").hide(),e.find(".js_article_type_error").get(0)&&(t=!1,
i=i||"请选择文章类别"),t){
var _=$("#js_original"),l=e.find(".js_original_type_radio").eq(0).prop("checked")?0:1;
_.find(".js_type").text(0===l?"文字原创":"漫画原创").data("value",l),_.find(".js_author").text(n),
_.find(".js_reprint_frm").val(r),$("#original_type_msg").hide(),_.find(".js_classify").text(c),
_.find(".js_can_reprint").text(s?"开启":"关闭"),K.can_use_original_reprint&&localStorage.setItem("reprintOptions",JSON.stringify({
canReprint:s,
canModify:d
})),this._updateWhitelist(r);
}else w.err(i);
return t;
},
_updateWhitelist:function(e){
$("#js_original").find(".js_whitelist").children().each(function(){
var t=1*$(this).attr("data-can_modify"),i=1*$(this).attr("data-can_reward"),r=1*$(this).attr("data-can_hide_source");
1==e&&(t||i||r||$(this).remove());
});
},
_updateCurUrl:function(e){
if(e){
wx.cgiData.app_id=e,window.history&&history.replaceState?history.replaceState(history.state,document.title,wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e))):1==K.isNew&&(location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e)));
var t=new RegExp("^"+location.protocol+"//"+location.hostname+"(:8080)?"+location.pathname+"?.*action=(list_card|list_list)");
X.match(t)&&window.opener&&opener.location&&(opener.location=X);
}
},
_initRecentList:function(){
c.initList({
$inputContainer:$("#author"),
$listContainer:$("#js_author_area").find(".js_author_list")
});
},
_getSendData:function(e,t){
x.get({
url:"/cgi-bin/masssendpage?f=json"
},{
fail:t,
done:function(i){
i&&i.base_resp&&0===i.base_resp.ret?e(i):t();
}
});
},
_bindEvent:function(){
function t(e,i,r){
x.post({
url:"/cgi-bin/appmsg?action=get_appmsg_update_history&appmsgid="+wx.cgiData.app_id+"&offset="+e+"&limit="+i
},function(e){
if(0==e.base_resp.ret){
var i=e.list;
i.each(function(e){
e.time=v.unix(e.update_time).format("YYYY-MM-DD HH:mm:ss"),e.action=0==e.operate_type?"保存":"群发",
""==e.operator_name&&(e.operator_name="未知"),wx.cgiData.bizmediaid&&wx.cgiData.bizmediaid==e.bizmediaid&&(e.current=!0),
e.url=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=get_history_appmsg&bizmediaid="+e.bizmediaid+"&type="+wx.cgiData.type+"&appmsgid="+wx.cgiData.app_id);
}),$("#history_list").html(template.render("history_tpl",{
list:i
})),r&&new G({
container:"#history_page",
perPage:4,
first:!1,
last:!1,
isSimple:!0,
totalItemsNum:e.total,
callback:function(e){
t(4*(e.currentPage-1),4);
}
}),$("#history_bt").addClass("appmsg_history_active"),$("#history_pop").show();
}
});
}
function i(e){
var t=e.target;
t&&($.contains($("#history_bt")[0],t)||$.contains($("#history_pop")[0],t))?($("#history_pop").show(),
$("#history_bt").addClass("appmsg_history_active")):($("#history_pop").hide(),$("#history_bt").removeClass("appmsg_history_active"));
}
function r(e){
var t={
submit:$("#js_submit"),
preview:$("#js_preview"),
send:$("#js_send")
};
t[e].btn(!0);
}
function s(e){
var t=e.step,i=void 0===t?1:t,a=e.fromsave,n=e.isneedsend,o=e.isneedpreview,s=e.btntype,_=window.wx.cgiData.can_use_selfcheck,h={},m={};
m=M.articleList.getSelfCheckData(!1);
var f=c;
n&&(f=l),o&&(f=u),p.fireEvent("showLegalCheckDialog",{
canuseselfcheck:_,
sections:h,
step:i,
fromsave:a,
savearticles:f,
isneedpreview:o,
btntype:s,
hideloading:r,
selfcheckdata:m
},function(e){
M.currentArticleIndex=M.articleList._getCurrentIndex(),Z=0,at=0,$("#js_risks_next_block").hide(),
$("#js_next_block").hide(),$("#js_next_block_key").hide(),st=null,Q=e.needModify;
var t=e.modifyDetail,i=e.isFromZero,r=t.articleIndex,n=t.blocks,o=t.scene;
t&&d({
articleIndex:r,
blocks:n,
scene:o,
fromsave:a
},!0,i);
});
}
function d(e,t,i){
function r(e){
Z+=1,Z>c.length-1&&(at+=1,at>ot.length-1?(at=0,c=ot[at].block_idx,_=ot[at].scene,
Z=0):(c=ot[at].block_idx,_=ot[at].scene,Z=0)),d({
articleIndex:o,
blocks:c,
scene:_
},!1,e);
}
function a(e){
window.scrollTo(0,e.offsetTop),e.classList.add("hightline-shake");
var t=setTimeout(function(){
e.classList.remove("hightline-shake"),clearTimeout(t);
},1e3);
}
var n=e,o=n.articleIndex,c=n.blocks,_=n.scene;
if(Q){
var l=Q.find(function(e){
return e.idx===o;
});
ot=l.remind_info_list;
}else{
var u=st.filter(function(e){
return e.idx===o;
});
ot=u[o].remind_info_list;
}
if((i||Q&&(t||M.currentArticleIndex!==o))&&($("#js_key_words").hide(),"undefined"==typeof Z&&(Z=0,
at=0),K.selfcheck_autocheck||t?($("#js_next_block").off("click"),$("#js_next_block_key").off("click"),
$("#js_all_risks").on("click",function(){
$("#js_locate_risk").hide(),s(K.hasMustModify||K.isFromSave?{
step:5,
fromsave:!!K.isFromSave
}:{
step:7,
fromsave:!!K.isFromSave
});
}),i?($("#js_next_block").hide(),(ot.length>1||c.length>1)&&($("#js_next_block_key").show(),
$("#js_next_block_key").on("click",function(){
r(!0);
}))):($("#js_next_block_key").hide(),c.length>1&&($("#js_next_block").show(),$("#js_next_block").on("click",function(){
Z+=1,Z>c.length-1&&(Z=0),d({
articleIndex:o,
blocks:c,
scene:_
},t,!1);
})))):$("#js_next_block").hide()),!st||M.currentArticleIndex===o&&$("#js_risks_next_block").attr("hasBind")||("undefined"==typeof Z&&(Z=0,
at=0),$("#js_locate_risk").hide(),$("#js_risks_next_block").attr("hasBind")||(Z=0,
at=0,$("#js_risks_next_block").attr("hasBind",!0),$("#js_risks_next_block").on("click",function(){
r();
}))),!K.isFromSave||e.fromsave||i||t)if($("#js_locate_risk").show(),$("#js_close_risks").on("click",function(){
$("#js_locate_risk").hide();
}),$("#js_locate_risk").attr("index",o),i){
var p=at+1+"/"+ot.length;
$("#js_locate_risk").find("p.whole_risks").text("当前文章共有"+ot.length+"类风险可直接定位, "+p+"类");
}else{
var h="";
h=1,$("#js_locate_risk").find("p.whole_risks").text("以下段落存在该风险");
}else $("#js_locate_risk").hide();
M.currentArticleIndex!==o&&M.articleList.select({
idx:o,
doNotScroll:!0,
isFromCheckDialog:!0
}),e=M.articleList.getParaList();
var m=void 0;
switch(_){
case 303:
m=e[o].paraLists[c[Z]-1],a(m);
break;

case 201:
m=$("#author"),a(m[0]);
break;

case 301:
m=$("#title"),a(m[0]);
break;

case 302:
m=$("#js_description_span"),a(m[0]);
break;

case 306:
m=$("#guide_words_main"),a(m[0]);
}
}
function c(){
var e=arguments.length<=0||void 0===arguments[0]?function(){}:arguments[0],t=$(this);
1*M.appmsg_data.is_illegal==1||t.hasClass("btn_disabled")||($("#js_import_tips,#js_draft_tips").hide(),
$(".js_warn").hide(),$(".js_ad_error_tips").hide(),Y.mark("appmsg","saveArticle","start"),
M.articleList&&M.articleList.save($("#js_submit"),function(i,r){
H(dt),Y.mark("appmsg","saveArtcileTotalTime","end"),Y.saveSpeeds("appmsg","saveArtcileTotalTime",49)&&Y.send();
var a=wx.cgiData,n=a.selfcheck_autocheck,o=a.can_use_selfcheck;
if(!i.appMsgId&&o&&n)return void _(i,et);
var s=localStorage.getItem("finalAdText");
s?localStorage.setItem("adTransitionText",s):localStorage.setItem("adTransitionText",q);
for(var d=0,c=0;c<r.count;c++)if(r["ad_id"+c]){
d=1;
break;
}
t.btn(!0),w.remove(),i.is_ad_optioal?$("#js_save_success_with_ad_op").show().delay(2e3).fadeOut(300):d?$("#js_save_success_with_ad").show().delay(2e3).fadeOut(300):($("#js_key_words").hide(),
$("#js_save_success").show().delay(2e3).fadeOut(300)),e(),M._updateCurUrl(i.appMsgId);
},!1,n),M.ueditor.fireEvent("reportAddNum","122333","100","1"));
}
function _(e,t){
var i=e.antispam_resp,r=void 0===i?"{}":i;
r=JSON.parse(r);
var a=r,n=a.article_result_info_list,o=a.remind_flag;
if(!K.isContinueSave&&e.antispam_resp&&r.article_result_info_list&&0!==o){
var s=function(){
$("#legal_check_container").remove(),$("#word_count_container").css("display","inline-block"),
$("#js_checktext").css("display","inline-block");
var e=!1,i=void 0,r=void 0,a=void 0;
return n.forEach(function(t){
t.remind_info_list=t.remind_info_list.filter(function(n){
return 10!==n.handle_type||e||(i=n.block_idx,r=t.idx,a=n.scene,e=!0),1===n.hit_type;
});
}),st=n,wx.cgiData.hasMustModify=e,$("#js_key_words").show(),$("#js_close_key_words").on("click",function(){
$("#js_key_words").hide();
}),$(".JS_TIPS").hide(),e?($("#js_continue_save").hide(),n[r].remind_info_list.length>1,
d({
articleIndex:r,
blocks:i,
scene:a
})):($("#js_continue_save").text(t===tt?"继续预览":"继续保存"),$("#js_continue_save").show(),
$("#js_continue_save").unbind("click"),$("#js_continue_save").on("click",function(){
$("#js_key_words").hide(),K.isContinueSave=!0,wx.cgiData.remind_flag=o,t===et?c():t===tt?u():t===it&&l();
})),{
v:void 0
};
}();
if("object"===("undefined"==typeof s?"undefined":_typeof(s)))return s.v;
}
}
function l(){
var e=arguments.length<=0||void 0===arguments[0]?function(){}:arguments[0],t=$(this);
1*M.appmsg_data.is_illegal==1||t.hasClass("btn_disabled")||(M.ueditor.fireEvent("reportAddNum",[{
id:"122333",
key:"102",
len:1
},{
id:"65080",
key:"120",
len:1
}]),$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),M.articleList&&M.articleList.save($("#js_send"),function(t,i){
var r=wx.cgiData,n=r.selfcheck_autocheck,s=r.can_use_selfcheck;
if(!t.appMsgId&&s&&n)return void _(t,it);
window.onbeforeunload=null;
var d=localStorage.getItem("finalAdText");
d?localStorage.setItem("adTransitionText",d):localStorage.setItem("adTransitionText",q),
M.articleList.draft.isDropped=!0,M._updateCurUrl(t.appMsgId),1==wx.cgiData.can_use_new_material?!function(){
for(var e={
app_id:t.appMsgId,
isMulti:i.count>1?1:0,
multi_item:[]
},r=0;r<i.count;r++)e.multi_item.push(10==i["share_page_type"+r]?{
title:i["content"+r],
share_page_type:i["share_page_type"+r],
copyright_type:i["copyright_type"+r],
can_reward:i["can_reward"+r],
is_pay_subscribe:i["is_pay_subscribe"+r]
}:5==i["share_page_type"+r]?{
title:i["title"+r],
share_page_type:i["share_page_type"+r],
copyright_type:i["video_ori_status"+r],
can_reward:i["can_reward"+r],
is_pay_subscribe:i["is_pay_subscribe"+r]
}:{
title:i["title"+r],
share_page_type:i["share_page_type"+r],
copyright_type:i["copyright_type"+r],
can_reward:i["can_reward"+r],
is_pay_subscribe:i["is_pay_subscribe"+r]
});
M._getSendData(function(t){
M.sendCgiData=t,M.sendCgiData.can_use_copyright=wx.cgiData.can_use_copyright,M.sendCgiData.can_use_reward=wx.cgiData.can_use_reward,
e.multi_item.each(function(e){
0===e.share_page_type||11===e.share_page_type||5===e.share_page_type?(e.isCopyright=1==e.copyright_type,
e.isReward=1==e.can_reward):(e.isCopyright=!1,e.isReward=!1);
}),o.send(e,M.sendCgiData,a,wx.cgiData.client_time_diff),R.setSum(129180,40,1).send();
},function(){
location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(t.appMsgId));
});
}():location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(t.appMsgId)),
e();
},!1,n,void 0,!0));
}
function u(){
var e=arguments.length<=0||void 0===arguments[0]?function(){}:arguments[0],t=$(this);
if(1*M.appmsg_data.is_illegal!=1&&!t.hasClass("btn_disabled")){
if(M.ueditor.fireEvent("reportAddNum",65080,119,1),$("#js_import_tips,#js_draft_tips").hide(),
$(".js_warn").hide(),k(K.func_ban_info,"preview")){
var t=$(this);
M.articleList&&M.articleList.preview(n,function(t){
M._updateCurUrl(t.appMsgId),e();
},_);
}
M.ueditor.fireEvent("reportAddNum","122333","101","1");
}
}
function h(e){
var t='<div class="edui-listitem edui-default"><div class="js_toolbar_more_item edui-listitem-body edui-default"></div></div>',i=$.parseHTML(t)[0],r=$(i).find(".js_toolbar_more_item");
return r.append(e),i;
}
function m(e){
e.addClass("tpl_dropdown_menu_item"),e.removeClass("tpl_item"),kt.prepend(e),Mt&&e.hasClass("tpl_item_reddot")&&(Rt+=1);
}
function g(e){
e.removeClass("tpl_dropdown_menu_item"),e.addClass("tpl_item"),e.insertBefore(bt),
Mt&&e.hasClass("tpl_item_reddot")&&(Rt-=1);
}
function C(e){
var t=jt.children().eq(-2);
return t.length?(Ot=At[t[0].id],t.is(":hidden")||Ot&&(e-=Ot),m(t),e):!1;
}
function T(e){
var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],i=kt.children().eq(0),r=qt.length-kt.children().length+1;
if(qt[r]&&1===qt[r].hide||i[0].id===Bt)return 0;
if(t){
for(;kt.children().length;){
var a=kt.children().eq(0);
if(!a.length)break;
g(a),Ot=At[a[0].id];
}
return!1;
}
return i.length?(g(i),Ot&&(e-=Ot),Ot=At[i[0].id],e):0;
}
function S(e){
var t=Ct[0]&&Ct.prev();
return t.length?(t.hasClass("edui-separator")?(e-=t.outerWidth(),t.css("cssText","display:none!important")):e-=Tt,
Dt.prepend(h(t)),e):!1;
}
function L(e){
var t=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],i=void 0,r=void 0;
if(t){
for(;Dt.children().length&&(i=Dt.children().eq(0),r=i.find(".js_toolbar_more_item").children().eq(0),
r.length);)r.hasClass("edui-separator")?(e-=r.outerWidth(),r.css("cssText","display:inline_block!important")):e-=Tt,
r.length&&r.insertBefore(Ct),i.remove();
return Ct.length&&Ct.css("cssText","display:none!important"),!1;
}
return i=Dt.children().eq(0),r=i.find(".js_toolbar_more_item").children().eq(0),
r.length?(r.hasClass("edui-separator")?(e-=r.outerWidth(),r.css("cssText","display:inline_block!important")):e-=Tt,
r.insertBefore(Ct),i.remove(),Dt.children().length?e:(Ct.length&&Ct.css("cssText","display:none!important"),
!1)):(Ct.length&&Ct.css("cssText","display:none!important"),!1);
}
function A(e,t){
if(void 0==t){
var i=M.articleList&&M.articleList.getCurrentArticle();
if(i){
var r=i.data("article");
r&&r.getArticleType&&(t=r.getArticleType());
}
}
if((0===t||100===t||9===t)&&vt&&wt){
D(),It=Math.round(wt.outerWidth(!0)),Tt=$("#js_toolbar_0").find(".edui-box").outerWidth();
var a=Math.round(document.body.clientWidth),n=parseInt(yt.css("paddingRight"),10)+parseInt(yt.css("paddingLeft"),10)+parseInt(vt.css("paddingLeft"),10),o=Math.round(a-n-St);
if(Lt=Math.round($("#edui1_toolbarboxouter").outerWidth()),e)T(0,e),It=Nt,L(0,e),
Et=Lt;else{
if(Pt&&!function(){
Pt=!1;
var e=0,t=$("#js_toolbar_0").children();
$.each(t,function(i,r){
i<t.length-1&&(e+=$(r).outerWidth(!0));
}),Lt=e,Et=e;
}(),It>o){
for(var s=It-o;s>0&&(s=C(s)););
It=o+s;
}else if(o-It>=Ot){
for(var s=o-It,d=!1;s>=Ot;)if(s=T(s),!s){
d=!0;
break;
}
It=d?Nt:o-s;
}else o===Nt&&(T(0,!0),It=Nt);
if(Lt>a){
Ct.is(":hidden")&&Ct.css("cssText","display:inline_block!important");
for(var s=Lt-a;s>0&&(s=S(s)););
Et=Lt+s;
}else if(a-Et>=Tt){
for(var s=a-Et;s>=Tt&&(s=L(s)););
Et=Math.min(a-s,Lt);
}
Mt&&(Rt>0?bt.addClass("tpl_item_reddot"):bt.hasClass("tpl_item_reddot")&&bt.removeClass("tpl_item_reddot"));
}
}
}
function D(){
var e=0;
if($.each(jt.children(),function(t,i){
qt[t]&&1===qt[t].hide&&(e+=$(i).outerWidth());
}),e)for(;e>0&&(e=C(e)););
}
function I(){
M.ueditor.fireEvent("hide_action_btn");
}
function E(e){
var t=bt.find(".js_more_plugins_menu");
bt.is($(e.target))||t.is($(e.target))||t.has($(e.target)).length||(t.length&&t.hide(),
$(document).off("click",E),M.ueditor.removeListener("click",E));
}
function O(){
var e=document.getElementById("js_btn_account_opr"),t=document.getElementById("js_div_account_opr");
if(e&&t){
window._hideHeaderMenu=!0;
var i=setTimeout(function(){
clearTimeout(i),t.style.display="none";
},100);
}
}
var M=this,N=function(){
if(rt.$articlePanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),t=$(window).height(),i=rt.$articlePanel.height(),r=10,a=e.bottom-r;
a+i>t?rt.$articlePanel.css({
top:e.top-i+$(window).scrollTop()-25,
left:e.left+e.width/2-65
}).find(".js_article_panel_inner").addClass("preview_media_add_panel_up"):rt.$articlePanel.css({
top:a+$(window).scrollTop()+20,
left:e.left+e.width/2-65
}).find(".js_article_panel_inner").removeClass("preview_media_add_panel_up");
}
},B=function(){
var e=$(".js_action_container"),t=e.offset();
rt.$articlePanel&&rt.$articlePanel.css({
top:t.top,
left:t.left+e.width()-10
});
},F=function(){
rt.hideArticlePanelId&&(clearTimeout(rt.hideArticlePanelId),rt.hideArticlePanelId=null),
rt.hideArticlePanelId=setTimeout(function(){
rt.$articlePanel&&rt.$articlePanel.hide(),rt.hideArticlePanelId=null;
},100);
},U=function(){
rt.isReplacing||M.ueditor.fireEvent("is_article_removing")||"add"===rt.actionType&&F();
},z=function(e){
return function(){
if(rt.canShowArticlePanel){
if("add"===e)M.ueditor.fireEvent("hide_action_btn"),M.ueditor.fireEvent("hide_replace_popover"),
M.ueditor.fireEvent("hide_del_popover");else if("replace"===e&&$(".js_replace_pop")[0]&&!$(".js_replace_pop").is(":hidden"))return;
rt.hideArticlePanelId&&(clearTimeout(rt.hideArticlePanelId),rt.hideArticlePanelId=null),
rt.$articlePanel||(rt.$articlePanel=$(template.render("tpl_article_panel",{})).appendTo($("body")),
rt.$articlePanel.bind({
mouseenter:function(){
rt.hideArticlePanelId&&(clearTimeout(rt.hideArticlePanelId),rt.hideArticlePanelId=null);
},
mouseleave:U
}),M.ueditor&&M.ueditor.fireEvent("can_change_article",rt.$articlePanel)),rt.actionType=e,
"replace"===e?(rt.$articlePanel.find(".js_article_panel_inner").addClass("delete_arrow"),
M.ueditor.fireEvent("reportAddNum",121548,11,1)):rt.$articlePanel.find(".js_article_panel_inner").removeClass("delete_arrow"),
"replace"===e?B():N(),rt.$articlePanel.show();
}
};
},W=function(){
if(rt.$articlePanel){
var e=$("#js_add_appmsg")[0].getBoundingClientRect(),t=$("#js_side_article_list")[0].getBoundingClientRect();
t.top+t.height<e.top?F():rt.$articlePanel.is(":hidden")||N();
}
},V=function(){
if(rt.$articlePanel){
var e=$(".js_replace_appmsg")[0].getBoundingClientRect(),t=$("#js_side_article_list")[0].getBoundingClientRect();
t.top+t.height<e.top?F():rt.$articlePanel.is(":hidden")||B();
}
};
$("#js_add_appmsg").click(z("add")).hover(z("add"),U),$("#js_mp_sidemenu").on("scroll",function(){
M.ueditor.fireEvent("article_item_list_scroll");
}),M.ueditor.addListener("update_action_panel_pos",function(){
"add"===rt.actionType&&W(),"replace"===rt.actionType&&V();
}),M.ueditor.addListener("get_article_action_type",function(){
return rt.actionType||"add";
});
var J={
0:"写新图文",
100:"选择其他图文",
5:"替换为视频",
7:"替换为音频",
8:"替换为图片",
9:"替换为转载"
};
M.ueditor.addListener("reset_replace_popover",function(){
$(".js_article_panel")&&$(".js_article_panel")[0]&&$(".js_replace_appmsg")&&$(".js_replace_appmsg")[0]&&rt._replacePopover&&(rt._replacePopover.resetPosition($(".js_replace_appmsg")),
rt._replacePopover.$dom=$(".js_article_panel"));
}),M.ueditor.addListener("hide_replace_popover",function(){
rt._replacePopover&&rt._replacePopover.hide();
}),M.ueditor.addListener("before_replace_article",function(e,t){
rt._replacePopover=new b({
dom:$(".js_replace_appmsg"),
content:$("#js_article_replace_popover_tpl").html(),
addCls:"js_replace_pop",
margin:"left_top",
width:300,
hideIfBlur:!0,
buttons:[{
text:"确定",
type:"primary",
click:function(){
M.ueditor.fireEvent("reportAddNum",121548,23,1),M.ueditor.fireEvent("replace_article",rt.articleReplaceType),
$(".js_action_container").hide(),this.hide();
}
},{
text:"取消",
type:"default",
click:function(){
M.ueditor.fireEvent("reportAddNum",121548,22,1),$(".js_action_container").hide(),
this.hide();
}
}],
onShow:function(){
var e=$(".js_replace_appmsg"),t=this.$pop.find("#js_replace_type").eq(0);
t.html(J[rt.articleReplaceType]),this.resetPosition(e),this.$dom=$(".js_article_panel"),
rt.isReplacing=!0;
},
onHide:function(){
rt.isReplacing=!1;
}
}),rt._replacePopover.hide(),rt.articleReplaceType=t,F(),M.ueditor.fireEvent("reportAddNum",121548,21,1),
rt._replacePopover.show();
}),$(".js_replace_appmsg").click(z("replace")).hover(z("replace")),$("#history_bt").click(function(){
$(this).hasClass("appmsg_history_active")?($(this).removeClass("appmsg_history_active"),
$("#history_pop").hide()):($("#history_pop").css({
top:$(this).offset().top-$(window).scrollTop()+$(this).height()+10
}),t(0,4,!0),M.ueditor.fireEvent("reportAddNum","122333","98","1"));
}),$("#history_list").on("click",".js_history_link",function(){
wx.cgiData.bizmediaid?window.location=$(this).data("url")+"&idx"+wx.cgiData.idx:window.open($(this).data("url")+"&idx"+wx.cgiData.idx),
M.ueditor.fireEvent("reportAddNum","122333","99","1");
}),$(document).on("click",i),M.ueditor.addListener("click",i),$("#read_only_container").find(".js_close").click(function(){
$("#read_only_container").hide();
}),M.$editor.on("click",".js_msg_close",function(){
$(this).closest(".page_msg").hide();
}),M.$editor.find(".js_cover_preview").on("click","img",function(){
var e=$(this).attr("src");
e&&j.show({
imgdata:[{
imgsrc:e
}]
});
}),$("#bot_bar_left_container").on("click",".js_fold",function(){
var e=$(this).find("a").data("type");
"1"==e?M.ueditor.fireEvent("scrollIntoView",$("#article_setting_area")):"2"==e&&M.ueditor.fireEvent("scrollIntoView",$("#editor_pannel"),131);
});
var X=$("#reprint_article_main");
X.on("click",".js_replace_media",function(){
var e=M.articleList&&M.articleList.getCurrentArticleObject();
e&&"function"==typeof e.replaceMedia&&e.replaceMedia();
}),X.on("click",".js_preview_hd",function(){
var e=M.articleList&&M.articleList.getCurrentArticleObject();
e&&"function"==typeof e.previewVideoPlay&&e.previewVideoPlay();
}),new f({
container:M.$editor.find(".js_edit_tips"),
content:"",
parentClass:"",
position:{
left:-136
},
reposition:!0,
onshow:function(){
var e=M.articleList&&M.articleList.getCurrentArticleObject();
e&&"function"==typeof e.getEditTipsContent&&(this.changeContent(e.getEditTipsContent()),
this.show());
},
type:"hover"
}),$("#js_editor_legalCheck").on("click",function(){
$("#js_locate_risk").hide(),$("#js_locate_risk").css("visibility","visible"),$("#js_key_words").hide(),
K.isFromSave=0,s({});
});
var Q=void 0,Z=void 0,at=void 0,ot=void 0,st={},dt=0;
if($("#js_submit").on("click",function(){
dt=(new Date).getTime(),Y.mark("appmsg","saveArtcileTotalTime","start"),$("#js_locate_risk").hide(),
$("#js_locate_risk").css("visibility","visible"),$("#js_key_words").hide(),wx.cgiData.remind_flag=null,
wx.cgiData.isContinueSave=!1,K.isFromSave=1,1===K.selfcheck_firsttime&&M.setSelfCheckFirst();
var e=K.selfcheck_firsttime,t=K.selfcheck_autocheck;
1===e||1===t?($("#js_submit").btn(!1),s({
step:2,
fromsave:!0,
btntype:"submit"
})):c();
}),$("#js_send").on("click",function(){
$("#js_locate_risk").hide(),$("#js_locate_risk").css("visibility","visible"),$("#js_key_words").hide(),
wx.cgiData.remind_flag=null,wx.cgiData.isContinueSave=!1,K.isFromSave=1,1===K.selfcheck_firsttime&&M.setSelfCheckFirst();
var e=K.selfcheck_firsttime,t=K.selfcheck_autocheck;
1===e||1===t?($("#js_send").btn(!1),s({
step:2,
fromsave:!0,
isneedsend:!0,
btntype:"send"
})):l();
}),$("#js_preview").on("click",function(){
$("#js_locate_risk").hide(),$("#js_locate_risk").css("visibility","visible"),$("#js_key_words").hide(),
wx.cgiData.remind_flag=null,wx.cgiData.isContinueSave=!1,K.isFromSave=1,1===K.selfcheck_firsttime&&M.setSelfCheckFirst();
var e=K.selfcheck_firsttime,t=K.selfcheck_autocheck;
1===e||1===t?($("#js_preview").btn(!1),s({
step:2,
fromsave:!0,
isneedpreview:!0,
btntype:"preview"
})):u();
}),1==wx.cgiData.can_use_new_material){
var ct=e("common/wx/media/previewDialog.js");
P.$on("preview",function(e){
new ct({
sendData:e,
AppMsgId:e.appmsgid,
type:2,
uin:wx.data.uin,
token:wx.data.t,
nickname:wx.data.nick_name,
onCancel:function(){
P.$emit("previewClose");
},
onOK:function(){
P.$emit("previewClose");
}
});
});
}
M.$editor.on("click",".js_jumpToOrder",function(){
y.show({
type:"info",
msg:"是否保存文章并跳转至广告订单页面？",
buttons:[{
text:"确定",
click:function(){
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),$(".js_ad_error_tips").hide();
var e=$("#js_submit"),t=this,i=$(".js_ad_msg").data("ad_id");
t.remove(),M.articleList&&M.articleList.save(e,function(e){
M._updateCurUrl(e.appMsgId),window.location.href=wx.url("/cgi-bin/frame?t=ad_system/common_simple_frame&t1=publisher/freetrade_item_detail&aid="+i);
},!1,n);
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
});
var _t,lt,ut=($("body"),$(".edui-editor-toolbarbox")),pt=$(".js_catch_tips"),ht=$("#article_setting_area")[0],mt=$("#bottom_main")[0],ft=document.getElementById("js_author_area"),gt=$(".js_editor_area")[0],wt=$("#js_media_list_box"),vt=$(".js_header_wrap"),jt=$("#js_plugins_list"),yt=$(".js_header_inner"),$t=$(".js_header_account"),bt=$("#editor_showmore"),kt=bt.find(".js_more_plugins_menu"),xt=window.matchMedia("(max-width: 1169px)"),Ct=$(".edui-combox.js_toolbar_more"),Tt=0,St=0,Lt=Math.round($("#edui1_toolbarboxouter").outerWidth()),At={},Dt=$("<div></div>"),It=0,Et=0,Ot=null,Pt=!0,Rt=0,Mt=!0;
wt.css("width","auto");
var Nt=wt.outerWidth(!0),Bt="js_editor_plugins_manage",qt=wx.cgiData.pluginmgr_info.list;
$.each(jt.children(),function(e,t){
$(t).data("index",e);
var i=$(t).outerWidth();
i&&(At[t.id]=i);
}),$.each($t.children(),function(e,t){
var i=$(t).outerWidth();
i&&(St+=i);
}),Ct.click(function(){
if(!Dt.hasClass("js_toolbar_more_list")){
$(".js_toolbar_more_list").append(Dt.children()),Dt=$(".js_toolbar_more_list");
var e=$(".edui-popup.js_toolbar_more");
e.length&&e.removeClass("edui-for-more");
}
}),xt.addListener(I),$(window).on("resize",nt(function(){
A();
},300)),A(),M.ueditor.addListener("foldToolbar",function(e,t,i){
t&&(qt=t),A(void 0,i);
}),bt&&bt.click(function(){
var e=bt.find(".js_more_plugins_menu");
e.length&&e.show(),$(document).on("click",E),M.ueditor.addListener("click",E),bt.hasClass("tpl_item_reddot")&&(Mt=!1,
bt.removeClass("tpl_item_reddot"));
}),M.ueditor.addListener("click",O),$(window).scroll(function(){
lt&&(clearTimeout(lt),lt=null),_t&&(clearTimeout(_t),_t=null),$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
var e,t=!0,i=M.articleList&&M.articleList.getCurrentArticle();
if(i){
var r=i.data("article");
r&&r.getArticleType&&(e=r.getArticleType());
}
t=!0;
var a=$(window).scrollTop(),n=gt.getBoundingClientRect();
if(t&&a>$(".main_bd").offset().top){
var o=ut[0].getBoundingClientRect();
pt.css({
position:"fixed",
top:o.bottom,
width:n.width,
zIndex:999
});
}else pt.css({
position:"",
top:"",
width:"",
zIndex:""
});
if(t&&(lt=setTimeout(function(){
M.ueditor&&M.ueditor.fireEvent("toolbar_fixed_change");
},100)),!$("#edui1_iframeholder").is(":hidden")){
var s=ht.getBoundingClientRect(),d=mt.getBoundingClientRect();
if(d.top-s.top<=50)M._setFoldStatus(!0,{
type:1
});else if(M.ueditor){
var c=M.ueditor.getDom("toolbarbox").getBoundingClientRect(),_=ft.getBoundingClientRect();
c.bottom>_.bottom?M._setFoldStatus(!0,{
type:2
}):M._setFoldStatus(!1);
}
}
}).trigger("scroll",!1),$("#js_mp_sidemenu").on("scroll",function(){
$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
}).parent().on("scroll",function(){
$("#history_pop").css({
top:$("#history_bt").offset().top-$(window).scrollTop()+$("#history_bt").height()+10
});
});
$(window).width();
$(window).on("resize",function(){
1==rt.curRenderType&&M.ueditor.fireEvent("star_toolbar_float"),M._getFrameHeight(),
$(window).trigger("scroll",!1);
}),$("#js_insert_ad_area").on("click",".js_insert_ad_allow_click.open",function(e){
e.preventDefault(),n.fireEvent("openCpcSetting");
});
}
});
new _t({
app_id:K.app_id,
editor_selector:"#js_appmsg_editor",
appmsg_selector:"#js_appmsg_preview",
appmsg_account_selector:"#js_appmsg_account",
appmsg_data:K.appmsg_data
});
}
Y.setBasicSpeeds("appmsg"),Y.send();
});