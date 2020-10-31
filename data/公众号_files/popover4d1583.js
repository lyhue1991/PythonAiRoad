define("pages/editor/editor_for_web1.js",["vat/vat.js","pages/editor/editor_store.js","pages/modules/media_dialog/mass_send_dialog/mass_send_dialog.js","vue-weui/src/gallery/gallery.js","pages/reward/modules/auto_apply_list/auto_apply_list.js","pages/editor/cpsDialog4Web1.js","pages/editor/weappDialog4Web1.js","pages/modules/media_dialog/search_dialog/searchDialog4Web1.js","pages/editor/audioMusicDialog4Web1.js","pages/modules/media_dialog/pay_statement_dialog/payStatementDialog4Web1.js","pages/modules/media_dialog/image_dialog/imageDialog4Web1.js","pages/modules/media_dialog/link_dialog/linkDialog4Web1.js","pages/editor/videoDialog4Web1.js","pages/modules/media_dialog/red_package_cover_dialog/redPackageCoverDialog4Web1.js","pages/editor/videoAdBackPanelDialog4web1.js","pages/editor/legalDialog4web1.js","pages/editor/videoTransitionDialog4web1.js","pages/editor/blockquoteDialog4Web1.js","pages/editor/templateDialog4Web1.js","pages/modules/media_dialog/music_check_dialog/musicCheckDialog4Web1.js","pages/editor/albumChooseDialog4Web1.js","pages/editor/claimOriginalDialog4Web1.js","pages/modules/media_dialog/darkmode_notice_dialog/darkmodeNoticeDialog4Web1.js","pages/modules/media_dialog/article_tags_dialog/articleTagsDialog4Web1.js","pages/modules/media_dialog/mass_send_dialog/massSendOriginalDialog4Web1.js","pages/modules/media_dialog/import_file_dialog/importFileDialog4Web1.js","pages/editor/poiDialog4Web1.js","pages/modules/media_dialog/video_snap_dialog/videoSnapDialog4Web1.js","pages/editor/liveDialog4Web1.js","pages/editor/qa_dialog_web1.js","pages/editor/eventBus4Web1.js","pages/editor/rewardSettingDialog4Web1.js","pages/editor/plugins_manage_dialog.js","js/common/qq/events.js"],function(e,a,i){"use strict"
var s=e("vat/vat.js"),o=e("pages/editor/editor_store.js")
e("pages/modules/media_dialog/mass_send_dialog/mass_send_dialog.js"),e("vue-weui/src/gallery/gallery.js"),e("pages/reward/modules/auto_apply_list/auto_apply_list.js")
var l=e("pages/editor/cpsDialog4Web1.js"),g=e("pages/editor/weappDialog4Web1.js"),t=e("pages/modules/media_dialog/search_dialog/searchDialog4Web1.js"),d=e("pages/editor/audioMusicDialog4Web1.js"),n=e("pages/modules/media_dialog/pay_statement_dialog/payStatementDialog4Web1.js"),r=e("pages/modules/media_dialog/image_dialog/imageDialog4Web1.js"),p=e("pages/modules/media_dialog/link_dialog/linkDialog4Web1.js"),m=e("pages/editor/videoDialog4Web1.js"),c=e("pages/modules/media_dialog/red_package_cover_dialog/redPackageCoverDialog4Web1.js"),u=e("pages/editor/videoAdBackPanelDialog4web1.js"),D=e("pages/editor/legalDialog4web1.js"),_=e("pages/editor/videoTransitionDialog4web1.js"),v=e("pages/editor/blockquoteDialog4Web1.js"),b=e("pages/editor/templateDialog4Web1.js"),j=e("pages/modules/media_dialog/music_check_dialog/musicCheckDialog4Web1.js"),W=e("pages/editor/albumChooseDialog4Web1.js"),h=e("pages/editor/claimOriginalDialog4Web1.js"),k=e("pages/modules/media_dialog/darkmode_notice_dialog/darkmodeNoticeDialog4Web1.js"),B=e("pages/modules/media_dialog/article_tags_dialog/articleTagsDialog4Web1.js"),w=e("pages/modules/media_dialog/mass_send_dialog/massSendOriginalDialog4Web1.js"),f=e("pages/modules/media_dialog/import_file_dialog/importFileDialog4Web1.js"),y=e("pages/editor/poiDialog4Web1.js"),P=e("pages/modules/media_dialog/video_snap_dialog/videoSnapDialog4Web1.js"),C=e("pages/editor/liveDialog4Web1.js"),S=e("pages/editor/qa_dialog_web1.js"),E=e("pages/editor/eventBus4Web1.js"),q=e("pages/editor/rewardSettingDialog4Web1.js"),O=e("pages/editor/plugins_manage_dialog.js"),T=e("js/common/qq/events.js")(!0),A={redPackageCoverDialog:c,payStatementDialog:n,poiDialog:y,qaDialog:S,darkmodeNoticeDialog:k,importFileDialog:f,searchDialog:t,albumChooseDialog:W,claimOriginalDialog:h,massSendOriginalDialog:w,rewardSettingDialog:q,videoSnapDialog:P,articleTagsDialog:B,liveDialog:C},M=s.init({el:"#vue_app",store:o,data:function(){var e={audioMusicDialog:d.getParams(),videoDialog:m.getParams(),weappDialog:g.getParams(),cpsDialog:l.getParams(),blockquoteDialog:v.getParams(),videoAdBackpanelDialog:u.getParams(),videoAdBacktransitionDialog:_.getParams(),imageDialog:r.getParams(),linkDialog:p.getParams(),imageUrls:[],showGallery:!1,gallerySelected:0,masssendDialog:{sendData:{},isShow:!1,canUsePublicTag:window.wx.cgiData.can_use_public_tag,realnameType:window.wx.cgiData.realname_type,sendType:""},templateDialog:b.getParams(),legalCheckDialog:D.getParams(),musicCheckDialog:j.getParams(),darkmodeNoticeDialog:k.getParams(),pluginsManageDialog:O.getParams(),massSendOriginalDialog:w.getParams()}
for(var a in A){if(Object.prototype.hasOwnProperty.call(A,a))e[a.substr(0,1).toLocaleLowerCase()+a.substr(1)]=A[a].getParams()}return e},mounted:function(){var a=this
for(var e in E.$on("update-component",function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
console.log(e)}),d.bindEvent({eventBus:E,params:this.audioMusicDialog}),m.bindEvent({eventBus:E,params:this.videoDialog}),u.bindEvent({eventBus:E,params:this.videoAdBackpanelDialog}),_.bindEvent({eventBus:E,params:this.videoAdBacktransitionDialog}),g.bindEvent({eventBus:E,params:this.weappDialog}),l.bindEvent({eventBus:E,params:this.cpsDialog}),D.bindEvent({eventBus:E,params:this.legalCheckDialog}),v.bindEvent({eventBus:E,params:this.blockquoteDialog}),r.bindEvent({eventBus:E,$store:this.$store,params:this.imageDialog}),p.bindEvent({eventBus:E,params:this.linkDialog}),b.bindEvent({eventBus:E,params:this.templateDialog}),j.bindEvent({eventBus:E,params:this.musicCheckDialog}),O.bindEvent({eventBus:E,params:this.pluginsManageDialog}),T.on("img9DataChanged",function(e){a.imageUrls=e}),T.on("img9DataSelected",function(e){a.gallerySelected=e,a.showGallery=!0}),A)if(Object.prototype.hasOwnProperty.call(A,e)){var i=e.substr(0,1).toLocaleLowerCase()+e.substr(1)
A[e].bindEvent({eventBus:E,params:this[i],isRequired:!1})}},methods:function(){var i={selectAudio:function(e){d.close({eventBus:E,data:e})},selectVideo:function(e,a,i){m.close({eventBus:E,data:e,tab:a,scene:i})},closeVideoAdBack:function(e){u.close({eventBus:E,data:e})},closeVideoAdTransition:function(e){_.close({eventBus:E,data:e})},closeLegalCheck:function(e){D.close({eventBus:E,data:e})},selectWeapp:function(e){g.close({eventBus:E,data:e})},selectCps:function(e){l.close({eventBus:E,data:e})},selectBlockquote:function(e){v.close({eventBus:E,data:e})},selectImage:function(e){r.close({eventBus:E,data:e})},selectLink:function(e){p.close({eventBus:E,data:e})},selectTemplate:function(e){b.close({eventBus:E,data:e})},closeMusicCheck:function(e){j.close({eventBus:E,data:e})},changePlugins:function(e){O.changeHandler({eventBus:E,data:e})}}
for(var e in A)Object.prototype.hasOwnProperty.call(A,e)&&function(a){var e=a.substr(0,1).toUpperCase()+a.substr(1)
i["close"+e]=function(e){A[a].close({eventBus:E,data:e})}}(e)
return i}()})
i.exports=M})
define("vat/vat.js",["vat/vat-store.js","vat/vuex-auto-test.js","pages/modules/base/base.js","pages/modules/utils/cgi.js"],function(t,e,s){"use strict"
function o(){i.updateCommonPostData()}var a=t("vat/vat-store.js"),r=t("vat/vuex-auto-test.js"),n=t("pages/modules/base/base.js"),i=t("pages/modules/utils/cgi.js")
s.exports.VatStore=a,s.exports.init=function(t){var e=void 0
if(!t.store)return console.error("[VAT] VAT must need a store for auto testing"),!1
var s=window.openUrl,a=window.reloadPage
return window.openUrl=function(e,o,a){s.apply(t.store,[e,o,a])},window.reloadPage=function(e){a.apply(t.store,[e])},r.VatAsyncFlowRecord(function(){return e=new n(t)},t.store,o),e},s.exports.simpleVModelMapState=function(t,e){var s={}
return t.forEach(function(t){s[t]={get:function(){return e?this.$store.state[e][t]:this.$store.state[t]},set:function(s){var o={}
o[t]=s,e?this.$store.dispatch(e+"/__set_state",o):this.$store.dispatch("__set_state",o)}}}),s}})
define("vat/vat-store.js",["vat/vuex-auto-test.js","3rd/vuex/vuex.min.js"],function(t,e,o){"use strict"
var n=t("vat/vuex-auto-test.js"),s=t("3rd/vuex/vuex.min.js")
Vue.use(s)
var r=function(t){function e(t){var o=function(t,e){var o={}
for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(o[n]=t[n])
return o}(t,[])
!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e)
var s=void 0
o.modules||(o.modules={}),(s=o).modules.vat={namespaced:!0,state:{location:window.location.href}}
for(var r in s.modules)s.modules[r].mutations?s.modules[r].mutations.__set_state=function(t,e){for(var o in e)t[o]=e[o]}:s.modules[r].mutations={__set_state:function(t,e){for(var o in e)t[o]=e[o]}},s.modules[r].actions?s.modules[r].actions.__set_state=function(t,e){t.commit("__set_state",e)}:s.modules[r].actions={__set_state:function(t,e){t.commit("__set_state",e)}}
return s.actions&&(s.actions.__set_state=function(t,e){t.commit("__set_state",e)}),s.mutations&&(s.mutations.__set_state=function(t,e){for(var o in e)t[o]=e[o]}),s.plugins||(s.plugins=[]),s.plugins.push(n.VatFlowRecordPlugin),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,s))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e)
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,s.Store),e}()
o.exports=r})
define("vat/vuex-auto-test.js",["vat/vat-check.js","vat/vat-stack-creator.js","vat/vat-extension-hooker.js","vat/vat-config.js"],function(t,e,o){"use strict"
Object.defineProperty(e,"__esModule",{value:!0})
var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e]
for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}
e.StartRecord=function(){for(var t=0;t<F.length;t++)F[t].spy=r.spy(F[t].obj,F[t].method)
for(var e=function(n){switch(console.log("stub function: ",q[n].method),q[n].method){case"urlRedirect":q[n].args=[],q[n].stub=r.stub(q[n].obj,q[n].method).callsFake(function(){for(var t=arguments.length,e=Array(t),o=0;o<t;o++)e[o]=arguments[o]
console.info("stub ",q[n].method,"with args: ",e),q[n].args.push(e)})}},o=0;o<q.length;o++)e(o)
v=[],s=[],i={},d={},p=[],R={},A=0,m=!0,T=+new Date,g=window.location.href,J=JSON.parse(JSON.stringify(M.$data,function(t,e){return e instanceof Element?"domObject":e},4))
for(var n=0;n<a.windowEnvData.length;n++)y[a.windowEnvData[n]]=window[a.windowEnvData[n]]},e.StopRecord=function(){if(!m)return!1
for(var t=0;t<F.length;t++)i[F[t].obj.toString()]||(i[F[t].obj.toString()]={}),F[t].spy&&(i[F[t].obj.toString()][F[t].method]=F[t].spy.getCalls(),F[t].obj[F[t].method].restore())
var e={pageUrl:g,envTimestamp:T,timeFlow:v,asyncActions:s,syncActions:i,mockActions:d,eventLoops:p,vmRootData:J,vmLastData:M.$data,storeState:V.state,checkPoints:R,customGlobalData:y}
"eventTask"==p[p.length-1].type&&"Window.addEventListener:message"==p[p.length-1].source&&p.pop()
return m=!1,JSON.stringify(e,function(t,e){return e instanceof Element?"domObject":e},4)},e.VatReplay=function(t,c){var e=t.timeFlow,o=t.syncActions
t.mockActions;(function(t){if(window.___VAT_isReplay=!0,t.customGlobalData)for(var e in t.customGlobalData)window[e]=t.customGlobalData[e]
if(I&&I(),E=!(h=!0),j=(x=t).eventLoops,D=t.eventLoops.slice(0),O=[],N=[],b=null,k=A=0,S=w=!(L={}),n.stackLineInit(),M.$data.baseVueToptipsData&&t.vmRootData.baseVueToptipsData)for(var o in t.vmRootData.baseVueToptipsData)M.$data.baseVueToptipsData[o]=t.vmRootData.baseVueToptipsData[o]
t.vmRootData.baseVueToptipsData&&delete t.vmRootData.baseVueToptipsData,l(M.$data,t.vmRootData),$=JSON.parse(JSON.stringify(M.$data))})(t),function(t){var e=void 0,o=void 0
for(var n in t){for(var a=0;a<F.length;a++)if(F[a].obj.toString()==n){e=F[a].obj
break}for(var s in t[n]){o=r.stub(e,s)
for(var i=0;i<t[n][s].length;i++)o.onCall(i).returns(t[n][s][i].returnValue)
N.push(o)}}}(o),_=f.xhrMockInit(t.asyncActions),console.log("mockXhr",_),function(o){for(var n=void 0,a=void 0,s=void 0,i=void 0,r=void 0,t=function(e){setTimeout(function(){if(n=l({},o[e]),c.replaceState(n.flowState),console.info("start flow: ",n.flowName," type: ",n.flowType),"action"==n.flowType)P=!0,c.dispatch(n.flowName,n.flowArgs)
else if("mutation"==n.flowType)c.commit(n.flowName,n.flowArgs)
else if("imitation event"==n.flowType)if(s=o[e].imitation,a=document.querySelectorAll("."+s.className.split(" ").join(".")),i=a[s.index],r=s.source.split(":")[1],"createEvent"in document){var t=document.createEvent("HTMLEvents")
t.initEvent(r,!1,!0),i.dispatchEvent(t)}else i.fireEvent(r)
console.info("exec flow: ",n.flowName," type: ",n.flowType),e==o.length-1&&(w=!0,G())},o[e].stepTime,"vatSetTimeout")},e=0;e<o.length;e++)t(e)}(e)},e.VatFlowRecordPlugin=function(s){var i=s.dispatch
s.commit
s.subscribe(function(t,e){var o=t.type+":"+A,n={state:JSON.parse(JSON.stringify(e)),vmData:M?JSON.parse(JSON.stringify(M.$data,function(t,e){return e instanceof Element?"domObject":e},4)):null}
!0===m?R[o]=n:!0===h&&(x.checkPoints[o]?L[o]={state:JSON.stringify(e)==JSON.stringify(x.checkPoints[o].state),vmData:JSON.stringify(M.$data,function(t,e){return e instanceof Element?"domObject":e})==JSON.stringify(x.checkPoints[o].vmData)}:L[o]="ignore"),A++}),s.dispatch=function(){for(var t=arguments.length,e=Array(t),o=0;o<t;o++)e[o]=arguments[o]
var n=e[0],a=e[1]
return!(1==h&&!P)&&(P=!1,h||function(t,e,o){var n=+new Date
if(!1===m)return
var a=JSON.parse(JSON.stringify(s.state))
"action"==o&&v.push({flowName:t,flowArgs:e,flowState:a,flowType:o,stepTime:n-T,timeStamp:n})}(n,a,"action"),i.apply(s,e))}},e.VatAsyncFlowRecord=function(t,e,o){M=t()}
var c=t("vat/vat-check.js"),n=t("vat/vat-stack-creator.js"),f=(t("vat/vat-extension-hooker.js"),{}),r={},a=t("vat/vat-config.js"),u=!0,v=[],s=[],i={},d={},p=[],m=!1,h=!1,g=null,y={},w=!1,b=null,k=0,S=!1,T=0,j=[],D=[],O=[],N=[],R={},E=!1,x=null,A=0,J=void 0,V=null,M=null,_=null,L={},P=!1,$=null,I=null,F=[{obj:Math,method:"random"},{obj:window,method:"confirm"},{obj:window,method:"alert"}],q=[]
function G(){var e=void 0,t=void 0,o=!1
if(console.info("eventloops remaining: ",j.length,j),console.log("execloops remaining:",O.length,O),S)r()
else{if(0==j.length&&w)return console.log("all events which should be exec are already executed"),void setTimeout(function(){r()},5e3,"vatSetTimeout")
var n=j[0]
if(1==w){if(30<k&&E)return S=!0,console.info("after task exec more than 10. Test end."),void G()
b&&clearTimeout(b),k++,b=setTimeout(function(){return S=!0,console.info("no more task in queue. Test end."),G(),!1},5e3,"vatSetTimeout")}for(var a=0;a<O.length;a++){if(t=O[a].task,E){i(a),G()
break}if(n&&("XMLHttpRequest.addEventListener:readystatechange"==n.source||"XMLHttpRequest.send"==n.source)&&u){console.log("ignore xhr readystate or send"),n.data&&n.data.url&&console.log("nextTask.data.url",n.data.url),j.shift(),G()
break}if(n&&n.source==t.source&&n.type==t.type&&n.asyncMd5==t.asyncMd5&&n.asyncStackIndex==t.asyncStackIndex){j.shift(),i(a),G()
break}for(var s=0;s<D.length;s++)if(console.log("currentTask",t.source,t.type),t.source==D[s].source&&t.type==D[s].type&&t.asyncMd5==D[s].asyncMd5&&t.asyncStackIndex==D[s].asyncStackIndex){o=!0
break}o||(E=!0,console.info("Event Loop break. Exec all events."))}}function i(t){try{O[t].func()}catch(t){console.error("something is wrong")}O.splice(t,1)}function r(){window.___VAT_isReplay=!1,console.log("replay done"),b&&clearTimeout(b)
for(var t=0;t<N.length;t++)N[t].restore()
f.xhrMockRestore(_),h=!1,e=c.checkPerformance(M,V,x,$),console.log("回放结束"),console.info("测试结果：",e),console.info("子快照测试",L),window.postMessage({type:"FROM_VUE_AUTO_EXTENSION",op:"ReplayEnd",testResult:e,checkpointResult:L},"*")}}})
define("vat/vat-check.js",["vat/objectDiff.js"],function(t,e,n){"use strict"
function o(t){if("object"==(void 0===t?"undefined":r(t))&&t instanceof Element&&(t="domObject"),"object"==(void 0===t?"undefined":r(t))){var e
if(Array.isArray(t)){e=[]
for(var n=0;n<t.length;++n)e[n]=o(t[n])}else{e={}
for(var i in t)t.hasOwnProperty(i)&&!/\$\$$/.test(i)&&(e[i]=o(t[i]))}return e}return t}Object.defineProperty(e,"__esModule",{value:!0})
var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t}
e.checkPerformance=function(t,e,n){var r=void 0,f=void 0,a=void 0,c=void 0
return a=JSON.parse(JSON.stringify(t.$data,function(t,e){return e instanceof Element?"domObject":e})),c=JSON.parse(JSON.stringify(e.state,function(t,e){return e instanceof Element?"domObject":e})),n?(r=JSON.stringify(o(a))==JSON.stringify(o(n.vmLastData)),f=JSON.stringify(o(c))==JSON.stringify(o(n.storeState))):r=f=!1,{vm:{result:r,detail:i.convertToXMLString(i.diff(o(a),o(n.vmLastData)))},store:{result:f,detail:i.convertToXMLString(i.diff(o(c),o(n.storeState)))},rawResult:n}},e.checkBehavior=function(){}
var i=t("vat/objectDiff.js")})
define("vat/objectDiff.js",[],function(e,a,n){"use strict"
var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=void 0!==a?a:{}
r.diff=function e(a,n){if(a===n)return{changed:"equal",value:a}
var r={},c=!0
for(var i in a)if(i in n)if(a[i]===n[i])r[i]={changed:"equal",value:a[i]}
else{var l=s(a[i]),t=s(n[i])
if(!a[i]||!n[i]||"object"!=l&&"function"!=l||"object"!=t&&"function"!=t)c=!1,r[i]={changed:"primitive change",removed:a[i],added:n[i]}
else{var d=e(a[i],n[i])
"equal"==d.changed?r[i]={changed:"equal",value:a[i]}:(c=!1,r[i]=d)}}else c=!1,r[i]={changed:"removed",value:a[i]}
for(i in n)i in a||(c=!1,r[i]={changed:"added",value:n[i]})
return c?{changed:"equal",value:a}:{changed:"object change",value:r}},r.diffOwnProperties=function e(a,n){if(a===n)return{changed:"equal",value:a}
for(var r={},c=!0,i=Object.keys(a),l=0,t=i.length;l<t;l++){var d=i[l]
if(n.hasOwnProperty(d))if(a[d]===n[d])r[d]={changed:"equal",value:a[d]}
else{var p=s(a[d]),u=s(n[d])
if(!a[d]||!n[d]||"object"!=p&&"function"!=p||"object"!=u&&"function"!=u)c=!1,r[d]={changed:"primitive change",removed:a[d],added:n[d]}
else{var f=e(a[d],n[d])
"equal"==f.changed?r[d]={changed:"equal",value:a[d]}:(c=!1,r[d]=f)}}else c=!1,r[d]={changed:"removed",value:a[d]}}for(l=0,t=(i=Object.keys(n)).length;l<t;l++)d=i[l],a.hasOwnProperty(d)||(c=!1,r[d]={changed:"added",value:n[d]})
return c?{value:a,changed:"equal"}:{changed:"object change",value:r}},function(){function e(e){return/^[a-z0-9_$]*$/i.test(e)?e:JSON.stringify(e)}function a(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function n(n){function r(n,c){switch(void 0===c?"undefined":s(c)){case"object":if(!c){n+="null"
break}var i=Object.keys(c),l=i.length
if(0===l)n+="<span>{}</span>"
else{Array.isArray(c)?n+='<span>[</span>\n<div class="diff-level">':n+='<span>{</span>\n<div class="diff-level">'
for(var t=0;t<l;t++){var d=i[t]
n=Array.isArray(c)?r(n,c[d]):r(n+'<span class="line"><span class="key">'+e(a(d))+"</span><span>: </span>",c[d]),t<l-1&&(n+="<span>,</span></span>\n")}Array.isArray(c)?n+="\n</div><span>]</span>":n+="\n</div><span>}</span>"}break
case"string":n+=JSON.stringify(a(c))
break
case"undefined":n+="undefined"
break
default:n+=a(String(c))}return n}return r("",n)}r.convertToXMLString=function s(r){var c=[],i=r.value
if("equal"==r.changed)return n(i)
for(var l in i){switch(i[l].changed){case"equal":c.push('<span class="key">'+e(a(l))+"</span><span>: </span>"+n(i[l].value))
break
case"removed":c.push('<del class="diff">[Actual] <span class="key">'+e(a(l))+"</span><span>: </span>"+n(i[l].value)+"</del>")
break
case"added":c.push('<ins class="diff">[Expected] <span class="key">'+e(a(l))+"</span><span>: </span>"+n(i[l].value)+"</ins>")
break
case"primitive change":var t='<span class="key">'+e(a(l))+"</span><span>: </span>"
c.push('<span class="line"><del class="diff diff-key">[Actual] '+t+n(i[l].removed)+'</del><span>,</span></span>\n<ins class="diff diff-key">[Expected] '+t+n(i[l].added)+"</ins>")
break
case"object change":c.push('<span class="key">'+e(l)+"</span><span>: </span>"+s(i[l]))}}return'<span>{</span>\n<div class="diff-level">'+c.join('<span>,</span></span>\n<span class="line">')+"\n</div><span>}</span>"}}()})
define("vat/vat-stack-creator.js",[],function(n,t,e){"use strict"
function i(){return new Error("vat-error")}function r(){try{throw i()}catch(n){return n}}Object.defineProperty(t,"__esModule",{value:!0})
var o=i(),c=r(),s=o.stack?i:c.stack?r:i,a={}
t.getStacktrace=s,t.md5Traceback=function(n){for(var t=n.stack.toString().split("\n"),e=[],i=[],r=void 0,o=void 0,c=void 0,s=void 0,a=0;a<t.length;a++){if(r=t[a],!o){if(!(r.indexOf("zone.min.js")>0))continue
o=!0}if(o){if(!(r.indexOf("zone.min.js")<0))continue
c=!0}c&&((r=r.split(" "))[5].indexOf(":")>0?(e.push("anonymous"),r[5]&&(s=r[5].split("?")[1])):(e.push(r[5]),r[6]&&(s=r[6].split("?")[1])),i.push(s))}return{logs:e.join(","),lines:i.join(",")}},t.stackLineInit=function(){a={}},t.getFuncRealIndex=function(n,t){var e=void 0
if(a[n]){e=!1
for(var i=0;i<a[n].length;i++)if(a[n][i]==t){e=!0
break}e||a[n].push(t)}else a[n]=[t]
return a[n].length}})
define("vat/vat-extension-hooker.js",[],function(e,o,t){"use strict"
Object.defineProperty(o,"__esModule",{value:!0})
o.extensionFuncName="vatChromeExtensionHooker",o.vatChromeExtensionHooker=function(e,o,t,r){return function(n){var a=void 0
if(console.log("vatChromeExtensionHooker",n),"FROM_VUE_AUTO_EXTENSION"!=n.data.type)return!1
switch(n.data.op){case"StartRecord":alert("请开始录制操作"),e()
break
case"StopRecord":(a=o())&&window.postMessage({type:"FROM_VUE_AUTO_EXTENSION",op:"ReturnRecordResult",recordResult:a},"*")
break
case"Replay":t(n.data.recordResult,r)}}}})
define("vat/vat-config.js",[],function(t,n,i){"use strict"
i.exports.windowEnvData=["wx"]})
define(function(t,e,n){var i,o
i=this,o=function(){"use strict"
function s(e,n){Object.keys(e).forEach(function(t){return n(e[t],t)})}function e(e,n){return n.indexOf(e)<0&&n.push(e),function(){var t=n.indexOf(e);-1<t&&n.splice(t,1)}}function i(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null)
var n=t.state
m(t,n,[],t._modules.root,!0),u(t,n,e)}function u(n,t,e){var i=n._vm
n.getters={}
var o={}
s(n._wrappedGetters,function(t,e){o[e]=function(){return t(n)},Object.defineProperty(n.getters,e,{get:function(){return n._vm[e]},enumerable:!0})})
var r=y.config.silent
y.config.silent=!0,n._vm=new y({data:{$$state:t},computed:o}),y.config.silent=r,n.strict&&n._vm.$watch(function(){return this._data.$$state},function(){},{deep:!0,sync:!0}),i&&(e&&n._withCommit(function(){i._data.$$state=null}),y.nextTick(function(){return i.$destroy()}))}function m(c,n,i,t,o){var e=!i.length,u=c._modules.getNamespace(i)
if(t.namespaced&&(c._modulesNamespaceMap[u]=t),!e&&!o){var r=v(n,i.slice(0,-1)),s=i[i.length-1]
c._withCommit(function(){y.set(r,s,t.state)})}var a,f,h,p,l,d=t.context=(a=c,h=i,l={dispatch:(p=""===(f=u))?a.dispatch:function(t,e,n){var i=_(t,e,n),o=i.payload,r=i.options,s=i.type
return r&&r.root||(s=f+s),a.dispatch(s,o)},commit:p?a.commit:function(t,e,n){var i=_(t,e,n),o=i.payload,r=i.options,s=i.type
r&&r.root||(s=f+s),a.commit(s,o,r)}},Object.defineProperties(l,{getters:{get:p?function(){return a.getters}:function(){return n=a,o={},r=(i=f).length,Object.keys(n.getters).forEach(function(t){if(t.slice(0,r)===i){var e=t.slice(r)
Object.defineProperty(o,e,{get:function(){return n.getters[t]},enumerable:!0})}}),o
var n,i,o,r}},state:{get:function(){return v(a.state,h)}}}),l)
t.forEachMutation(function(t,e){var n,i,o,r
i=u+e,o=t,r=d,((n=c)._mutations[i]||(n._mutations[i]=[])).push(function(t){o.call(n,r.state,t)})}),t.forEachAction(function(t,e){var o,n,r,s,i=t.root?e:u+e,a=t.handler||t
n=i,r=a,s=d,((o=c)._actions[n]||(o._actions[n]=[])).push(function(t,e){var n,i=r.call(o,{dispatch:s.dispatch,commit:s.commit,getters:s.getters,state:s.state,rootGetters:o.getters,rootState:o.state},t,e)
return(n=i)&&"function"==typeof n.then||(i=Promise.resolve(i)),o._devtoolHook?i.catch(function(t){throw o._devtoolHook.emit("vuex:error",t),t}):i})}),t.forEachGetter(function(t,e){var n,i,o,r
i=u+e,o=t,r=d,(n=c)._wrappedGetters[i]||(n._wrappedGetters[i]=function(t){return o(r.state,r.getters,t.state,t.getters)})}),t.forEachChild(function(t,e){m(c,n,i.concat(e),t,o)})}function v(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function _(t,e,n){return null!==(i=t)&&"object"==typeof i&&t.type&&(n=e,t=(e=t).type),{type:t,payload:e,options:n}
var i}function f(t){y&&t===y||function(t){function e(){var t=this.$options
t.store?this.$store="function"==typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}if(Number(t.version.split(".")[0])>=2)t.mixin({beforeCreate:e})
else{var n=t.prototype._init
t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[e].concat(t.init):e,n.call(this,t)}}}(y=t)}function a(e){return Array.isArray(e)?e.map(function(t){return{key:t,val:t}}):Object.keys(e).map(function(t){return{key:t,val:e[t]}})}function t(n){return function(t,e){return"string"!=typeof t?(e=t,t=""):"/"!==t.charAt(t.length-1)&&(t+="/"),n(t,e)}}function c(t,e,n){return t._modulesNamespaceMap[n]}function r(t,e){this.runtime=e,this._children=Object.create(null)
var n=(this._rawModule=t).state
this.state=("function"==typeof n?n():n)||{}}var h="undefined"!=typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,n={namespaced:{configurable:!0}}
n.namespaced.get=function(){return!!this._rawModule.namespaced},r.prototype.addChild=function(t,e){this._children[t]=e},r.prototype.removeChild=function(t){delete this._children[t]},r.prototype.getChild=function(t){return this._children[t]},r.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},r.prototype.forEachChild=function(t){s(this._children,t)},r.prototype.forEachGetter=function(t){this._rawModule.getters&&s(this._rawModule.getters,t)},r.prototype.forEachAction=function(t){this._rawModule.actions&&s(this._rawModule.actions,t)},r.prototype.forEachMutation=function(t){this._rawModule.mutations&&s(this._rawModule.mutations,t)},Object.defineProperties(r.prototype,n)
function p(t){this.register([],t,!1)}p.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},p.prototype.getNamespace=function(t){var n=this.root
return t.reduce(function(t,e){return t+((n=n.getChild(e)).namespaced?e+"/":"")},"")},p.prototype.update=function(t){!function t(e,n,i){if(n.update(i),i.modules)for(var o in i.modules){if(!n.getChild(o))return
t(e.concat(o),n.getChild(o),i.modules[o])}}([],this.root,t)},p.prototype.register=function(n,t,i){var o=this
void 0===i&&(i=!0)
var e=new r(t,i)
0===n.length?this.root=e:this.get(n.slice(0,-1)).addChild(n[n.length-1],e),t.modules&&s(t.modules,function(t,e){o.register(n.concat(e),t,i)})},p.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1]
e.getChild(n).runtime&&e.removeChild(n)}
function o(t){var e=this
void 0===t&&(t={}),!y&&"undefined"!=typeof window&&window.Vue&&f(window.Vue)
var n=t.plugins
void 0===n&&(n=[])
var i=t.strict
void 0===i&&(i=!1)
var o=t.state
void 0===o&&(o={}),"function"==typeof o&&(o=o()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new p(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new y
var r,s=this,a=this.dispatch,c=this.commit
this.dispatch=function(t,e){return a.call(s,t,e)},this.commit=function(t,e,n){return c.call(s,t,e,n)},this.strict=i,m(this,o,[],this._modules.root),u(this,o),n.forEach(function(t){return t(e)}),y.config.devtools&&(r=this,h&&((r._devtoolHook=h).emit("vuex:init",r),h.on("vuex:travel-to-state",function(t){r.replaceState(t)}),r.subscribe(function(t,e){h.emit("vuex:mutation",t,e)})))}var y,l={state:{configurable:!0}}
l.state.get=function(){return this._vm._data.$$state},l.state.set=function(t){},o.prototype.commit=function(t,e,n){var i=this,o=_(t,e,n),r=o.type,s=o.payload,a=(o.options,{type:r,payload:s}),c=this._mutations[r]
c&&(this._withCommit(function(){c.forEach(function(t){t(s)})}),this._subscribers.forEach(function(t){return t(a,i.state)}))},o.prototype.dispatch=function(t,e){var n=this,i=_(t,e),o=i.type,r=i.payload,s={type:o,payload:r},a=this._actions[o]
if(a)return this._actionSubscribers.forEach(function(t){return t(s,n.state)}),1<a.length?Promise.all(a.map(function(t){return t(r)})):a[0](r)},o.prototype.subscribe=function(t){return e(t,this._subscribers)},o.prototype.subscribeAction=function(t){return e(t,this._actionSubscribers)},o.prototype.watch=function(t,e,n){var i=this
return this._watcherVM.$watch(function(){return t(i.state,i.getters)},e,n)},o.prototype.replaceState=function(t){var e=this
this._withCommit(function(){e._vm._data.$$state=t})},o.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"==typeof t&&(t=[t]),this._modules.register(t,e),m(this,this.state,t,this._modules.get(t),n.preserveState),u(this,this.state)},o.prototype.unregisterModule=function(e){var n=this
"string"==typeof e&&(e=[e]),this._modules.unregister(e),this._withCommit(function(){var t=v(n.state,e.slice(0,-1))
y.delete(t,e[e.length-1])}),i(this)},o.prototype.hotUpdate=function(t){this._modules.update(t),i(this,!0)},o.prototype._withCommit=function(t){var e=this._committing
this._committing=!0,t(),this._committing=e},Object.defineProperties(o.prototype,l)
var d=t(function(o,t){var n={}
return a(t).forEach(function(t){var e=t.key,i=t.val
n[e]=function(){var t=this.$store.state,e=this.$store.getters
if(o){var n=c(this.$store,0,o)
if(!n)return
t=n.context.state,e=n.context.getters}return"function"==typeof i?i.call(this,t,e):t[i]},n[e].vuex=!0}),n}),g=t(function(r,t){var n={}
return a(t).forEach(function(t){var e=t.key,o=t.val
n[e]=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e]
var n=this.$store.commit
if(r){var i=c(this.$store,0,r)
if(!i)return
n=i.context.commit}return"function"==typeof o?o.apply(this,[n].concat(t)):n.apply(this.$store,[o].concat(t))}}),n}),b=t(function(i,t){var o={}
return a(t).forEach(function(t){var e=t.key,n=t.val
n=i+n,o[e]=function(){if(!i||c(this.$store,0,i))return this.$store.getters[n]},o[e].vuex=!0}),o}),w=t(function(r,t){var n={}
return a(t).forEach(function(t){var e=t.key,o=t.val
n[e]=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e]
var n=this.$store.dispatch
if(r){var i=c(this.$store,0,r)
if(!i)return
n=i.context.dispatch}return"function"==typeof o?o.apply(this,[n].concat(t)):n.apply(this.$store,[o].concat(t))}}),n})
return{Store:o,install:f,version:"3.0.1",mapState:d,mapMutations:g,mapGetters:b,mapActions:w,createNamespacedHelpers:function(t){return{mapState:d.bind(null,t),mapGetters:b.bind(null,t),mapMutations:g.bind(null,t),mapActions:w.bind(null,t)}}}},"object"==typeof e&&void 0!==n?n.exports=o():"function"==typeof define&&define.amd?define("3rd/vuex/vuex.min.js",[],o):i.Vuex=o()})
define("pages/modules/base/base.js",["vue-weui/src/index.js","pages/modules/faq/faq.js","pages/modules/announcement/announcement.js","pages/modules/mp_header/mp_header.js","pages/modules/base/polyfill/symbol.js","pages/modules/base/polyfill/promise.js","pages/modules/base/polyfill/array.js","pages/modules/base/polyfill/string.js","3rd/mplogd/mplogd.js","pages/modules/mplog/uplog.js"],function(e,s,o){"use strict"
e("vue-weui/src/index.js"),e("pages/modules/faq/faq.js"),e("pages/modules/announcement/announcement.js"),e("pages/modules/mp_header/mp_header.js"),e("pages/modules/base/polyfill/symbol.js"),e("pages/modules/base/polyfill/promise.js"),e("pages/modules/base/polyfill/array.js"),e("pages/modules/base/polyfill/string.js")
var l=e("3rd/mplogd/mplogd.js"),a=e("pages/modules/mplog/uplog.js")
try{new l({autoLogAjax:!0,autoLogError:!0,autoLogRejection:!0,BadJsReport:function(e,s){window.WX_BJ_REPORT&&window.WX_BJ_REPORT.BadJs&&"function"==typeof window.WX_BJ_REPORT.BadJs.report&&window.WX_BJ_REPORT.BadJs.report("mplog: error",e,{view:"mmbizweb_monitor",mid:window.PAGE_MID,info:s})}}),setTimeout(function(){a.uploadLogs()},3e3)}catch(e){console.log(e)}var p={isShow:!1,type:"success",msg:""}
Vue.prototype.$tipsSuc=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:""
p.type="success",p.msg=e,p.isShow=!0},Vue.prototype.$tipsErr=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:""
p.type="error",p.msg=e,p.isShow=!0},Vue.prototype.$tipsHide=function(){p.msg="",p.isShow=!1}
var i=Vue.extend({data:function(){return{baseVueToptipsData:p}},mounted:function(){this.$el&&this.$el.style&&(this.$el.style.visibility="visible")}})
o.exports=i})
define("vue-weui/src/index.js",["vue-weui/src/tab/tab.js","vue-weui/src/tab/tab_item.js","vue-weui/src/popover/popover.js","vue-weui/src/pagination/pagination.js","vue-weui/src/slider/slider.js","vue-weui/src/dialog/dialog.js","vue-weui/src/button/button.js","vue-weui/src/step/step.js","vue-weui/src/step/step_item.js","vue-weui/src/switch/switch.js","vue-weui/src/tag/tag.js","vue-weui/src/form/form.js","vue-weui/src/form/form_item.js","vue-weui/src/icon/icon.js","vue-weui/src/tooltip/tooltip.js","vue-weui/src/breadcrumb/breadcrumb.js","vue-weui/src/toptips/toptips.js","vue-weui/src/date_picker/date_picker.js","vue-weui/src/date_picker/date_range_picker.js","vue-weui/src/color_picker/color_picker.js","vue-weui/src/input/input.js","vue-weui/src/gallery/gallery.js","vue-weui/src/operation_group/operation_group.js","vue-weui/src/dropdown_menu/dropdown_menu.js","vue-weui/src/dropdown_item/dropdown_item.js","vue-weui/src/search/search.js","vue-weui/src/dropdown/dropdown.js","vue-weui/src/time_picker/time_picker.js","vue-weui/src/checkbox/checkbox.js","vue-weui/src/checkbox/checkbox_group.js","vue-weui/src/radio/radio_group.js","vue-weui/src/radio/radio.js","vue-weui/src/cascader/cascader.js","vue-weui/src/msg/msg.js","vue-weui/src/utils/object.js"],function(e,u,r){"use strict"
Object.defineProperty(u,"__esModule",{value:!0}),u.Msg=u.Cascader=u.Radio=u.RadioGroup=u.CheckboxGroup=u.Checkbox=u.TimePicker=u.Dropdown=u.Search=u.DropdownItem=u.DropdownMenu=u.OperationGroup=u.Gallery=u.Input=u.ColorPicker=u.DateRangePicker=u.DatePicker=u.Toptips=u.Breadcrumb=u.Tooltip=u.Icon=u.FormItem=u.Form=u.Popover=u.Tag=u.Switch=u.StepItem=u.Step=u.Button=u.Dialog=u.Slider=u.Pagination=u.Tab=void 0
var t=q(e("vue-weui/src/tab/tab.js")),i=q(e("vue-weui/src/tab/tab_item.js")),o=q(e("vue-weui/src/popover/popover.js")),a=q(e("vue-weui/src/pagination/pagination.js")),s=q(e("vue-weui/src/slider/slider.js")),c=q(e("vue-weui/src/dialog/dialog.js")),d=q(e("vue-weui/src/button/button.js")),l=q(e("vue-weui/src/step/step.js")),p=q(e("vue-weui/src/step/step_item.js")),w=q(e("vue-weui/src/switch/switch.js")),n=q(e("vue-weui/src/tag/tag.js")),f=q(e("vue-weui/src/form/form.js")),v=q(e("vue-weui/src/form/form_item.js")),j=q(e("vue-weui/src/icon/icon.js")),m=q(e("vue-weui/src/tooltip/tooltip.js")),b=q(e("vue-weui/src/breadcrumb/breadcrumb.js")),g=q(e("vue-weui/src/toptips/toptips.js")),_=q(e("vue-weui/src/date_picker/date_picker.js")),k=q(e("vue-weui/src/date_picker/date_range_picker.js")),h=q(e("vue-weui/src/color_picker/color_picker.js")),P=q(e("vue-weui/src/input/input.js")),D=q(e("vue-weui/src/gallery/gallery.js")),I=q(e("vue-weui/src/operation_group/operation_group.js")),T=q(e("vue-weui/src/dropdown_menu/dropdown_menu.js")),x=q(e("vue-weui/src/dropdown_item/dropdown_item.js")),S=q(e("vue-weui/src/search/search.js")),C=q(e("vue-weui/src/dropdown/dropdown.js")),G=q(e("vue-weui/src/time_picker/time_picker.js")),y=q(e("vue-weui/src/checkbox/checkbox.js")),R=q(e("vue-weui/src/checkbox/checkbox_group.js")),M=q(e("vue-weui/src/radio/radio_group.js")),B=q(e("vue-weui/src/radio/radio.js")),F=q(e("vue-weui/src/cascader/cascader.js")),O=q(e("vue-weui/src/msg/msg.js")),V=e("vue-weui/src/utils/object.js")
function q(e){return e&&e.__esModule?e:{default:e}}var z={Tab:t.default,TabItem:i.default,Pagination:a.default,Slider:s.default,Dialog:c.default,Button:d.default,Step:l.default,StepItem:p.default,Switch:w.default,Tag:n.default,Popover:o.default,Form:f.default,FormItem:v.default,Icon:j.default,Tooltip:m.default,Breadcrumb:b.default,Toptips:g.default,DatePicker:_.default,DateRangePicker:k.default,ColorPicker:h.default,Input:P.default,Gallery:D.default,OperationGroup:I.default,DropdownMenu:T.default,DropdownItem:x.default,Search:S.default,Dropdown:C.default,TimePicker:G.default,Checkbox:y.default,CheckboxGroup:R.default,RadioGroup:M.default,Radio:B.default,Cascader:F.default,Msg:O.default}
Object.defineProperty(z,"install",{value:function(e){for(var u in z)(0,V.hasOwn)(z,u)&&e.use(z[u])},writable:!0,enumerable:!1,configurable:!0}),"undefined"!=typeof window&&window.Vue&&window.Vue.use(z),u.default=z,u.Tab=t.default,u.Pagination=a.default,u.Slider=s.default,u.Dialog=c.default,u.Button=d.default,u.Step=l.default,u.StepItem=p.default,u.Switch=w.default,u.Tag=n.default,u.Popover=o.default,u.Form=f.default,u.FormItem=v.default,u.Icon=j.default,u.Tooltip=m.default,u.Breadcrumb=b.default,u.Toptips=g.default,u.DatePicker=_.default,u.DateRangePicker=k.default,u.ColorPicker=h.default,u.Input=P.default,u.Gallery=D.default,u.OperationGroup=I.default,u.DropdownMenu=T.default,u.DropdownItem=x.default,u.Search=S.default,u.Dropdown=C.default,u.TimePicker=G.default,u.Checkbox=y.default,u.CheckboxGroup=R.default,u.RadioGroup=M.default,u.Radio=B.default,u.Cascader=F.default,u.Msg=O.default})
define("vue-weui/src/tab/tab.js",["vue-weui/src/tab/tab.css.js","vue-weui/src/tab/tab.tpl.js","vue-weui/src/tab/common.js"],function(t,e,i){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),t("vue-weui/src/tab/tab.css.js")
var s,a=t("vue-weui/src/tab/tab.tpl.js"),n=(s=a)&&s.__esModule?s:{default:s},r=t("vue-weui/src/tab/common.js")
var c={name:"mp-tab",template:n.default,model:{prop:"tabs",event:"tabs-change"},props:{tabs:{type:Array,required:!1},selected:{type:[String,Number],default:""},type:{type:String,default:"normal",validator:function(t){return-1<["normal","section","simple"].indexOf(t)}}},mounted:function(){(!this.tabs||Array.isArray(this.tabs)&&0===this.tabs.length)&&this._mapPropsChildren()},data:function(){return{active:this.selected}},watch:{selected:function(t){this.active=t,(!this.tabs||Array.isArray(this.tabs)&&0===this.tabs.length)&&this._mapPropsChildren()},active:function(){(!this.tabs||Array.isArray(this.tabs)&&0===this.tabs.length)&&this._mapPropsChildren()}},methods:{onClick:function(t,e){this.active=t,this.$emit("click",t,e)},childClick:function(t,e){this.active=t.id,this.$emit("click",t,e)},_mapPropsChildren:function(){if(this.childs=(0,r.findDownComponent)(this,"mp-tab-item"),this.childs){var e=this.active
this.childs.forEach(function(t){t.currentActive=e})}}}}
"function"==typeof c.template&&c.template(c),c.install=function(t){return t.component(c.name,c)},e.default=c})
define("vue-weui/src/tab/tab.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.weui-desktop-tab__navs {  text-align: center;  line-height: 30px;  font-size: 14px;}.weui-desktop-tab__navs:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.weui-desktop-tab__navs:after {  content: \"\";}.weui-desktop-tab__nav {  position: relative;  float: left;  margin-right: 24px;}.weui-desktop-tab__nav a {  display: block;  text-decoration: none;  color: #9A9A9A;}.weui-desktop-tab__nav_current a {  color: #353535;}.weui-desktop-tab_title .weui-desktop-tab__navs {  text-align: left;  line-height: 40px;  border-bottom: 1px solid #E0E1E2;  font-size: 16px;}.weui-desktop-tab_title .weui-desktop-tab__nav {  margin-bottom: -1px;}.weui-desktop-tab_title .weui-desktop-tab__nav:hover a {  color: #07C160;}.weui-desktop-tab_title .weui-desktop-tab__nav a {  color: #353535;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 1;  max-width: 120px;}.weui-desktop-tab_title .weui-desktop-tab__nav_current {  border-bottom: 2px solid #07C160;}.weui-desktop-tab_title .weui-desktop-tab__nav_current a {  color: #07C160;}.weui-desktop-tab_section .weui-desktop-tab__nav {  border: 1px solid #C9CACE;  margin-right: -1px;}.weui-desktop-tab_section .weui-desktop-tab__nav a {  padding: 0 22px;  min-width: 54px;}.weui-desktop-tab_section .weui-desktop-tab__nav:first-child {  border-top-left-radius: 3px;  border-bottom-left-radius: 3px;}.weui-desktop-tab_section .weui-desktop-tab__nav:last-child {  border-top-right-radius: 3px;  border-bottom-right-radius: 3px;  margin-right: 0;}.weui-desktop-tab_section .weui-desktop-tab__nav_current {  background-color: #07C160;  border-color: #07C160;  position: relative;}.weui-desktop-tab_section .weui-desktop-tab__nav_current a {  color: #FFFFFF;}";});define("vue-weui/src/tab/tab.tpl.js",[],function(t,e,i){return'<div class="weui-desktop-tab"  :class="{    \'weui-desktop-tab_title\': type === \'normal\',    \'weui-desktop-tab_section\': type === \'section\'  }">  <ul class="weui-desktop-tab__navs">    <li v-for="(item, index) in tabs"      v-if="typeof item.show === \'undefined\' ? true : !!item.show"      class="weui-desktop-tab__nav"      :class="{        \'weui-desktop-tab__nav_current\': item.id === active      }"      @click="onClick(item.id, index)"    >      <a :href="item.url || \'javascript:void(0);\'" :target="item.target || \'\'">        {{item.name}}      </a>    </li>    <slot></slot>  </ul></div>'})
define("vue-weui/src/tab/common.js",[],function(n,e,o){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.findUpComponent=function(n,e,o){o="string"==typeof e?[e]:e
var t=n.$parent,r=t.$options.name
for(;t&&(!r||o.indexOf(r)<0);)(t=t.$parent)&&(r=t.$options.name)
return t},e.findDownComponent=function t(n,r){return n.$children.reduce(function(n,e){e.$options.name===r&&n.push(e)
var o=t(e,r)
return n.concat(o)},[])}})
define("vue-weui/src/tab/tab_item.js",["vue-weui/src/tab/tab_item.css.js","vue-weui/src/tab/tab_item.tpl.js","vue-weui/src/tab/common.js"],function(t,e,i){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),t("vue-weui/src/tab/tab_item.css.js")
var n,u=t("vue-weui/src/tab/tab_item.tpl.js"),a=(n=u)&&n.__esModule?n:{default:n},s=t("vue-weui/src/tab/common.js")
var r={name:"mp-tab-item",template:a.default,props:{show:{type:Boolean,default:!0},id:{type:String,default:""},index:{type:Number,default:0},name:{type:String,default:""},url:{type:String,default:""},target:{type:String,default:""}},data:function(){return{isGroup:!1,currentActive:"",parent:(0,s.findUpComponent)(this,"mp-tab")}},mounted:function(){this.parent=(0,s.findUpComponent)(this,"mp-tab"),this.parent&&(this.isGroup=!0)},methods:{clickItem:function(t){this.currentActive=this.id,this.isGroup?this.parent.childClick(this,t):this.$emit("click",this,t)}}}
"function"==typeof r.template&&r.template(r),r.install=function(t){return t.component(r.name,r)},e.default=r})
define("vue-weui/src/tab/tab_item.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.weui-desktop-tab__navs {  text-align: center;  line-height: 30px;  font-size: 14px;}.weui-desktop-tab__navs:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.weui-desktop-tab__navs:after {  content: \"\";}.weui-desktop-tab__nav {  position: relative;  float: left;  margin-right: 24px;}.weui-desktop-tab__nav a {  display: block;  text-decoration: none;  color: #9A9A9A;}.weui-desktop-tab__nav_current a {  color: #353535;}.weui-desktop-tab_title .weui-desktop-tab__navs {  text-align: left;  line-height: 40px;  border-bottom: 1px solid #E0E1E2;  font-size: 16px;}.weui-desktop-tab_title .weui-desktop-tab__nav {  margin-bottom: -1px;}.weui-desktop-tab_title .weui-desktop-tab__nav:hover a {  color: #07C160;}.weui-desktop-tab_title .weui-desktop-tab__nav a {  color: #353535;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 1;  max-width: 120px;}.weui-desktop-tab_title .weui-desktop-tab__nav_current {  border-bottom: 2px solid #07C160;}.weui-desktop-tab_title .weui-desktop-tab__nav_current a {  color: #07C160;}.weui-desktop-tab_section .weui-desktop-tab__nav {  border: 1px solid #C9CACE;  margin-right: -1px;}.weui-desktop-tab_section .weui-desktop-tab__nav a {  padding: 0 22px;  min-width: 54px;}.weui-desktop-tab_section .weui-desktop-tab__nav:first-child {  border-top-left-radius: 3px;  border-bottom-left-radius: 3px;}.weui-desktop-tab_section .weui-desktop-tab__nav:last-child {  border-top-right-radius: 3px;  border-bottom-right-radius: 3px;  margin-right: 0;}.weui-desktop-tab_section .weui-desktop-tab__nav_current {  background-color: #07C160;  border-color: #07C160;  position: relative;}.weui-desktop-tab_section .weui-desktop-tab__nav_current a {  color: #FFFFFF;}";});define("vue-weui/src/tab/tab_item.tpl.js",[],function(t,e,i){return'<li v-if="typeof show === \'undefined\' ? true : !!show"  class="weui-desktop-tab__nav"  :class="{    \'weui-desktop-tab__nav_current\': id === currentActive  }"  @click="clickItem">  <a :href="url || \'javascript:void(0);\'" :target="target || \'\'">    {{name}}  </a>  <slot></slot></li>'})
define("vue-weui/src/popover/popover.js",["vue-weui/src/popover/popover.css.js","vue-weui/src/popover/popover.tpl.js"],function(e,t,i){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),e("vue-weui/src/popover/popover.css.js")
var s,o=e("vue-weui/src/popover/popover.tpl.js")
var n={name:"mp-popover",template:((s=o)&&s.__esModule?s:{default:s}).default,model:{prop:"value",event:"change"},props:{content:String,title:String,trigger:{type:String,default:"click",validator:function(e){return-1<["click","hover"].indexOf(e)}},value:{type:Boolean,default:!1},delay:{type:Number,default:200},width:{},position:{type:String,default:"up-center"},wrapClass:{type:String,default:""},disabled:Boolean},data:function(){return{isShow:this.value}},watch:{value:function(e){e!==this.isShow&&this.show(e)}},mounted:function(){this.$slots&&this.$slots.target&&(this.target=this.$refs.target,this.popper=this.$refs.popper,"click"===this.trigger?(this.target.addEventListener("click",this.doClick),document.addEventListener("click",this.handleDocumentClick,!0)):(this.target.addEventListener("mouseenter",this.handleMouseEnter),this.popper.addEventListener("mouseenter",this.handleMouseEnter),this.target.addEventListener("mouseleave",this.handleMouseLeave),this.popper.addEventListener("mouseleave",this.handleMouseLeave)))},beforeDestroy:function(){"click"===this.trigger&&document.removeEventListener("click",this.handleDocumentClick)},methods:{show:function(e){void 0===e&&(e=!0),e!==this.isShow&&((this.isShow=e)?this.$emit("show"):this.$emit("hide"),this.$emit("change",e))},hide:function(){this.show(!1)},doClick:function(e){return e.stopPropagation(),this.show(!0),!1},handleDocumentClick:function(e){this.target&&this.$el&&(this.$el.contains(e.target)||this.target.contains(e.target)||this.show(!1))},handleMouseEnter:function(){var e=this
clearTimeout(this._timer),this._timer=setTimeout(function(){e.show(!0)},this.delay)},handleMouseLeave:function(){var e=this
clearTimeout(this._timer),this._timer=setTimeout(function(){e.show(!1)},this.delay)}}}
"function"==typeof n.template&&n.template(n),n.install=function(e){return e.component(n.name,n)},t.default=n})
