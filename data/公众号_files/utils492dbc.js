define("pages/modules/media_dialog/live_dialog/live_dialog.css.js", [], function (require, exports, module){module.exports = ".mode_media_dialog_select_live .weui-toptips {  position: absolute;  margin-top: -55px;}.mode_media_dialog_select_live .weui-desktop-dialog__bd {  position: relative;}.mode_media_dialog_select_live .select_live_dialog__head {  position: relative;  padding: 0 32px;}.mode_media_dialog_select_live .select_live_dialog__body {  padding: 32px;}.mode_media_dialog_select_live .select_live_dialog__head__extra {  position: absolute;  top: 50%;  -ms-transform: translateY(-50%);      transform: translateY(-50%);  right: 32px;}.mode_media_dialog_select_live .select_live_dialog__head__tips {  position: absolute;  top: 50%;  -ms-transform: translateY(-50%);      transform: translateY(-50%);  left: 32px;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav_current {  background: none;  border-color: #C9CACE;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav_current a {  color: #07C160;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav {  position: relative;  border-right-style: none;  border-left-style: none;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav:first-child {  border-left-style: solid;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav:last-child {  border-right-style: solid;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav:last-child:after {  display: none;}.mode_media_dialog_select_live .weui-desktop-tab_section .weui-desktop-tab__nav:after {  position: absolute;  top: 50%;  right: 0;  -ms-transform: translateY(-50%);      transform: translateY(-50%);  display: inline-block;  vertical-align: middle;  content: ' ';  height: 15px;  width: 1px;  background-color: #C9CACE;}.mode_media_dialog_select_live .selec-live-dialog__table-cell__live-info__inner {  display: -ms-flexbox;  display: flex;}.mode_media_dialog_select_live .selec-live-dialog__table-cell__live-info__img {  width: 150px;  height: 120px;  -ms-flex-negative: 0;      flex-shrink: 0;}.mode_media_dialog_select_live .selec-live-dialog__table-cell__live-info__content {  -ms-flex: 1;      flex: 1;  padding-left: 16px;  padding-top: 4px;}.mode_media_dialog_select_live .selec-live-dialog__table-cell__live-info__title {  margin-bottom: 20px;}.mode_media_dialog_select_live .selec-live-dialog__table-cell__live-time,.mode_media_dialog_select_live .selec-live-dialog__table-cell__live-info__desc {  color: #9A9A9A;}.select_live_dialog .weui-desktop-table__hd,.select_live_dialog .weui-desktop-table__tr {  display: -ms-flexbox;  display: flex;}.select_live_dialog .weui-desktop-table__hd:hover,.select_live_dialog .weui-desktop-table__tr:hover {  background-color: #f6f8f9;}.select_live_dialog .weui-desktop-table__bd {  max-height: 300px;}.select_live_dialog .weui-desktop-table__tr__info {  -ms-flex-pack: center;      justify-content: center;}.select_live_dialog .weui-desktop-table__cell {  padding: 18px 20px;  width: 50%;  box-sizing: border-box;}.select_live_dialog .weui-desktop-table__cell:first-child {  width: 33%;}.select_live_dialog .weui-desktop-table__cell:last-child {  width: 17%;}label.weui-desktop-form__check-label.live-checkbox span {  display: none;}.live-checkbox {  margin-right: 20px;  float: left;}.select-table {  height: 450px;  overflow: auto;  position: relative;  overscroll-behavior: contain;}";});define("pages/modules/media_dialog/live_dialog/live_dialog.tpl.js",[],function(e,i,l){return'<div class="mode_media_dialog_select_live">  <mp-dialog     ref="liveDialog"    title="选择直播间"    v-model="dialogShow"    :width="740"    weui="true"    class="select_live_dialog"    @close="closeDialog">    <div style="overflow: hidden;position: relative">      <mp-toptips style="margin-top: 0" v-model="isShowTips" type="error" msg="每篇图文最多添加三个直播间"></mp-toptips>      <div class="select_live_dialog__head">        <mp-tab :tabs="sortTab" type="section" selected="0" @click="changeSortTab" style="visibility: hidden"/>        <span class="select_live_dialog__head__tips" v-show="showLimitTip">每篇图文最多添加三个直播间</span>        <a :href="url" class="select_live_dialog__head__extra" target="_blank">直播间配置</a>      </div>        <div class="select_live_dialog__body">          <mp-checkbox-group v-model="selectIndexs" @change="changeSelectLive" style="position: relative">            <div class="select-table" id="js_live_room_table">              <div class="weui-desktop-table">                <div class="weui-desktop-table__hd">                  <div class="weui-desktop-table__cell">                    <span v-if="selectTab===\'0\'">计划时间</span>                    <span v-else>创建时间</span>                  </div>                  <div class="weui-desktop-table__cell">直播间信息</div>                  <div class="weui-desktop-table__cell tr">状态</div>                </div>                <div class="weui-desktop-table__bd">                  <template v-if="list.length > 0">                    <div class="weui-desktop-table__tr" v-for="(item, i) in list" v-if="item.live_status !== banRoomStatus && item.live_status !== expireRoomStatus">                      <div class="weui-desktop-table__cell">                        <mp-checkbox :label="i" class="live-checkbox" :disabled="isDisabled(item, i)"></mp-checkbox>                        <div style="float: left" v-html="getDateDesc(item)"></div>                      </div>                      <div class="weui-desktop-table__cell">                        <div class="selec-live-dialog__table-cell__live-info__inner">                          <div class="selec-live-dialog__table-cell__live-info__img"                              v-bind:style="{background:\'url(\'+item.anchor_img+\') no-repeat top center / cover\'}"></div>                          <div class="selec-live-dialog__table-cell__live-info__content">                            <p class="selec-live-dialog__table-cell__live-info__title">{{item.name}}</p>                            <p class="selec-live-dialog__table-cell__live-info__desc">房间号：<span>{{item.id}}</span></p>                            <p class="selec-live-dialog__table-cell__live-info__desc">主播：<span>{{item.anchor_name}}</span></p>                          </div>                        </div>                      </div>                      <div class="weui-desktop-table__cell tr">                        <span v-html="getStatusDesc(item)"></span>                      </div>                    </div>                  </template>                  <template v-if="isLoading">                    <div class="weui-desktop-table__tr weui-desktop-table__tr__info">                      <div :colspan="3" loading="true">                        <div class="weui-desktop-loadmore">                          <i class="weui-desktop-loading"></i>加载中                        </div>                      </div>                    </div>                  </template>                </div>              </div>            </div>          </mp-checkbox-group>        </div>    </div>    <div slot="footer">      <mp-button type="primary" :disabled="!canSubmit" @click="submit">确定</mp-button>    </div>  </mp-dialog></div>'})
define("pages/editor/qa_dialog_web1.js",["pages/modules/media_dialog/qa_dialog/qa_dialog.js"],function(a,e,o){"use strict"
function n(){return{defaultShow:!1,isShow:!1,qaData:{}}}o.exports={getParams:n,bindEvent:function(e){e.eventBus.$on("requireQaDialog",function(){e.isRequired||(a("pages/modules/media_dialog/qa_dialog/qa_dialog.js"),e.isRequired=!0)}),e.eventBus.$on("showQaDialog",function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
e.eventBus.$emit("requireQaDialog"),function(a,e){var o=n()
for(var i in e)void 0!==o[i]&&(o[i]=e[i])
for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(a.params[t]=o[t])
a.params.isShow=!0,a.params.defaultShow=!0}(e,a),e.eventBus.$emit("update-component",{key:"mp-qa-dialog",params:e.params})})},close:function(a){a.eventBus.$emit("showQaDialog_callback",a.data)}}})
define("pages/modules/media_dialog/qa_dialog/qa_dialog.js",["pages/modules/media_dialog/qa_dialog/qa_dialog.css.js","vue-weui/src/button/button.js","vue-weui/src/dialog/dialog.js","vue-weui/src/radio/radio.js","vue-weui/src/radio/radio_group.js","pages/modules/reply/reply.js","pages/modules/media_dialog/qa_dialog/qa_dialog.tpl.js","pages/modules/utils/cgi.js","3rd/editor/common/domUtils.js"],function(i,e,s){"use strict"
i("pages/modules/media_dialog/qa_dialog/qa_dialog.css.js"),i("vue-weui/src/button/button.js"),i("vue-weui/src/dialog/dialog.js"),i("vue-weui/src/radio/radio.js"),i("vue-weui/src/radio/radio_group.js"),i("pages/modules/reply/reply.js")
var t=i("pages/modules/media_dialog/qa_dialog/qa_dialog.tpl.js"),o=i("pages/modules/utils/cgi.js"),a=i("3rd/editor/common/domUtils.js").domUtils
Vue.component("mp-qa-dialog",{template:t,props:{value:{type:Boolean,default:!1}},data:function(){return{title:"",commentSetting:"0",len:0,limit:40,overWarningClass:"",loading:!1,infoDialogShow:!1,saveTips:""}},methods:{closeDialog:function(){this.hide(),this.$emit("cancel")},hide:function(){this.$emit("input",!1)},onChange:function(i){this.len=a.getWordCountContent(i).length,this.len>this.limit?this.overWarningClass="warn":this.overWarningClass=""},cancel:function(){this.infoDialogShow=!1,this.loading=!1},save:function(i){var e=this
this.loading=!0
var s={title:this.title,can_answer_type:+this.commentSetting,ignore_tips:i}
o.post({url:"/cgi-bin/qnamgr?action=add_question",data:s,success:function(i){if(i.base_resp&&203e3===i.base_resp.ret)e.$tipsErr("你所编辑的信息含有违反公众平台协议，相关法律法规和政策的内容，请重新编辑")
else{if(i.base_resp&&203004===i.base_resp.ret)return e.saveTips=i.tips||"你所编辑的信息可能含有违反公众平台协议，相关法律法规和政策的内容，请仔细检查后再保存或发布该信息",void(e.infoDialogShow=!0)
if(!i.base_resp||203007!==i.base_resp.ret)return i.base_resp&&0===i.base_resp.ret?(e.$emit("select",{title:e.title,questionId:i.question_id}),void e.hide()):void e.$tipsErr("系统繁忙，请稍后再试")
e.$tipsErr("内容超出长度限制")}},error:function(){e.$tipsErr("系统繁忙，请稍后再试")},complete:function(){e.loading=!1}})},keepSubmit:function(){this.infoDialogShow=!1,this.save(1)},submit:function(){this.len>this.limit?this.$tipsErr("内容超出长度限制"):this.save(0)}}})})
define("pages/modules/media_dialog/qa_dialog/qa_dialog.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.emotion_editor {  position: relative;  border: 1px solid #E4E8EB;}.emotion_editor .edit_area {  padding: 14px 20px;  outline: 0;  color: #353535;  word-wrap: break-word;  -webkit-hyphens: auto;  -ms-hyphens: auto;  hyphens: auto;  background-color: #FFFFFF;  height: 188px;  overflow-y: auto;}.emotion_editor .edit_area img {  vertical-align: middle;}.emotion_editor .edit_area[placeholder]:empty:before {  content: attr(placeholder);  color: #9A9A9A;}.emotion_editor:disabled,.emotion_editor[disabled] {  cursor: default;}.emotion_editor:disabled .edit_area,.emotion_editor[disabled] .edit_area,.emotion_editor:disabled .editor_toolbar,.emotion_editor[disabled] .editor_toolbar {  color: #9A9A9A;  background-color: #FAFBFC;}.emotion_editor:disabled .icon_emotion,.emotion_editor[disabled] .icon_emotion {  cursor: default;}.emotion_editor:disabled .icon_emotion:hover i,.emotion_editor[disabled] .icon_emotion:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_emotion4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.emotion_editor:disabled .icon_pic,.emotion_editor[disabled] .icon_pic {  cursor: default;}.emotion_editor:disabled .icon_pic:hover i,.emotion_editor[disabled] .icon_pic:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_pic4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.editor_toolbar {  padding: 0 20px;  line-height: 36px;  background-color: #FFFFFF;  border-top: 1px solid #E4E8EB;}.editor_toolbar:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.editor_toolbar .weui-desktop-popover__wrp {  display: inline-block;  vertical-align: middle;}.editor_tip {  float: right;  color: #9A9A9A;}.editor_tip em {  font-style: normal;  margin: 0 3px;}.editor_tip.warn {  color: #FA5151;}.icon_pic {  height: 28px;  width: 28px;  display: -ms-inline-flexbox;  display: inline-flex;  -ms-flex-align: center;      align-items: center;  -ms-flex-pack: center;      justify-content: center;  overflow: hidden;  font-size: 0;  vertical-align: middle;  cursor: pointer;}.icon_pic:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_pic_hover4510e1.svg) no-repeat 0 0;}.icon_pic i {  margin-top: 3px;  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_pic4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.icon_emotion {  float: left;  height: 28px;  width: 28px;  display: -ms-flexbox;  display: flex;  -ms-flex-align: center;      align-items: center;  -ms-flex-pack: center;      justify-content: center;  overflow: hidden;  font-size: 0;  cursor: pointer;}.icon_emotion:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_emotion_hover4510e1.svg) no-repeat 0 0;}.icon_emotion i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_emotion4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.edit_upload_img {  max-width: 500px;  max-height: 300px;}.qa__insert {  width: 380px;  margin: 0 auto;  padding: 30px 0;}.qa__insert .emotion_editor {  border-radius: 4px;}.qa__insert .emotion_editor .edit_area {  height: 70px;  background-color: transparent;}.qa__insert .editor_toolbar {  border-top: none;}.qa__insert .icon_emotion.emotion_switch {  background: none;  width: auto;  height: auto;}.qa__insert .editor_toolbar {  border-radius: 4px;}.qa__insert .emotions {  border: none;  background-color: transparent;}.qa__insert .emotions_item {  border: none;}.qa__insert .weui-desktop-popover {  opacity: 1;  visibility: visible;}.qa__insert .weui-desktop-popover_pos-up-left {  margin-left: -51px;}.qa__insert-hd {  margin-bottom: 12px;}.qa__insert-input {  position: relative;}.qa__input-notice {  position: absolute;  bottom: 8px;  right: 20px;  z-index: 1;  color: #9A9A9A;}.qa__input-notice .warn {  color: #FA5151;}.qa__insert-emoji {  position: absolute;  width: 100%;  bottom: 0;  left: 0;  padding: 0 8px 3px;  box-sizing: border-box;  z-index: 10;}.qa__inset-setting {  margin-top: 30px;}.qa__inset-setting .weui-desktop-form__check-label {  display: block;  margin-bottom: 4px;}.qa__inset-setting-hd {  margin-bottom: 12px;}.qa__confirm {  padding: 20px 0 100px;}";});define("pages/modules/reply/reply.js",["pages/modules/emoji_panel/emoji_panel.js","pages/modules/media_dialog/image_dialog/image_dialog.js","pages/modules/reply/reply.css.js","pages/modules/common/emoji/emoji.js","pages/modules/reply/reply.tpl.js","pages/modules/common/emoji/emoji_data.js","3rd/editor/common/domUtils.js"],function(e,t,n){"use strict"
e("pages/modules/emoji_panel/emoji_panel.js"),e("pages/modules/media_dialog/image_dialog/image_dialog.js"),e("pages/modules/reply/reply.css.js")
for(var i=e("pages/modules/common/emoji/emoji.js"),o=e("pages/modules/reply/reply.tpl.js"),r=e("pages/modules/common/emoji/emoji_data.js"),s=e("3rd/editor/common/domUtils.js").domUtils,a=/msie/.test(navigator.userAgent.toLowerCase()),l=function(){return document.selection?document.selection:(window.getSelection||document.getSelection)()},d=function(e){var t=l()
if(!t)return null
var n,i,o,r=void 0
return t.getRangeAt&&t.rangeCount?r=t.getRangeAt(0):t.getRangeAt||(r=t.createRange()),!r||!(e&&(n=e,(o=(i=r).commonAncestorContainer||i.parentElement&&i.parentElement()||null)&&function(e,t,n){if(n||e!==t)if(e.compareDocumentPosition){var i=e.compareDocumentPosition(t)
if(20===i||0===i)return 1}else if(e.contains(t))return 1}(n,o,!0)))&&e?null:r},c=function(e,t){var n=void 0
n=t?["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"]:["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"]
for(var i=0;i<n.length;i+=2)e=e.replace(new RegExp(n[i],"g"),n[i+1])
return e},u=function(e){return String.prototype.trim?String.prototype.trim.call(e):e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},m={},h=0;h<r.length;h++)m[r[h].style]=r[h].emoji||r[h].cn
Vue.component("mp-reply",{template:o,props:{extclass:{type:String,default:""},limit:{type:Number,default:140},ishtml:{type:Boolean,default:!0},hasPic:{type:Boolean,default:!1},linebreak:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1},entertype:{type:Number,default:0},source:{type:String,default:""},content:{type:String,default:""},notEncodeHtml:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},disabledTips:{type:String,default:""},placeholder:{type:String,default:""},countContentByLang:{type:Boolean,default:!1}},model:{prop:"content",event:"change"},data:function(){var e=this._setContent()
return{lastRange:null,count:0,innerhidden:this.hidden,parsedContent:e,bakContent:this._textFilter(this.content),notRender:!1}},computed:{style:function(){var e={}
return e.display=this.innerhidden?"none":"block",e},remain:function(){var e=this.bakContent.replace(/<br\s*\/*>/g,"")
return e=this.countContentByLang?s.getWordCountContent(e):e,this.limit-e.replace(/\n/g,"").length}},watch:{content:function(){var e=this._setContent()
this.notRender||(this.parsedContent=e,this.$refs.editArea&&(this.$refs.editArea.innerHTML=e))}},methods:{_saveRange:function(){this.lastRange=d()},_restoreRange:function(){var e=this.lastRange
if(e){var t=l()
if(t.addRange)t.removeAllRanges(),t.addRange(e)
else{var n=d()
n.setEndPoint&&(n.setEndPoint("EndToEnd",e),n.setEndPoint("StartToStart",e)),n.select()}}},select:function(e){this.disabled||this.insertHtml(e.emojiHtml)},selectImage:function(e){if(!this.disabled){var t=""
e.forEach(function(e){e.url&&(t+='<img class="edit_upload_img" src="'+e.url+'" />')}),this.insertHtml(t)}},showImageDialog:function(){this.disabled||this.$refs.imageDialog.show()},getHtml:function(){var e=this.$refs.editArea.innerHTML
return e="string"==typeof e?u(e):""},getText:function(){return this.getContent().replace(/<br\s*\/*>/g,"\n")},getContent:function(){var e=this.bakContent
return e="string"==typeof e?u(e):""},setContent:function(e){var t=e||""
t=this.linebreak?t.replace(/\n/g,"<br>"):t,e=i(t),t=c(t,!1),this.clear(),this.$refs.editArea.innerHTML=i(c(this._textFilter(e).replace(/<br\s*\/*>/g,"\n"),!0)).replace(/\n/g,"<br>"),this.content=t||e},_setContent:function(){var e=this.content,t=""
return this.bakContent=this._textFilter(this.content),e=this.linebreak?e.replace(/\n/g,"<br>"):e,t=this._textFilter(e).replace(/<br\s*\/*>/g,"\n"),this.notEncodeHtml||(t=c(t.replace(/<br\s*\/*>/g,"\n"),!0)),t=c(t.replace(/&#60;|&#62;/gi,function(e){return{"&#60;":"<","&#62;":">"}[e]})),t=i(t).replace(/\n/g,"<br>")},clear:function(){this.$refs.editArea.innerHTML="",this.$emit("change","")},blur:function(){this.notRender=!1},focus:function(){this.$refs.editArea.focus(),this._restoreRange()},insertHtml:function(e){this.focus()
var t=d()
if(t){if(t.createContextualFragment){e+='<img style="width:1px;height:1px;"></img>'
var n=t.createContextualFragment(e),i=n.lastChild,o=l()
t.deleteContents(),t.insertNode(n),t.setStartBefore(i),t.setEndAfter(i),o.removeAllRanges(),o.addRange(t),document.execCommand("Delete",!1,null)}else e&&t.pasteHTML&&t.pasteHTML(e),t.collapse&&t.collapse(!1),t.select()
this._saveRange(),this.save()}},_xssFilter:function(e){return"string"==typeof e?e.replace(/<|>/g,function(e){return{"<":"&#60;",">":"&#62;"}[e]}):e},_textFilter:function(e){var t=document.createElement("div"),n="",i=[],o=""
t.innerHTML=e
for(var r=t.childNodes.length-1;0<=r;r--){var s=t.childNodes[r]
switch(s.nodeType){case 1:if("IMG"===s.nodeName.toUpperCase()&&(n=s.getAttribute("class"))&&1<(i=n.split(" ")).length&&"icon_emotion_single"===i[0]){o=m[i[1]]
var a=document.createTextNode(o)
t.replaceChild(a,s)}}var l=s.nodeValue
s.nodeValue=this._xssFilter(l)}return e=t.innerHTML,t=null,this.notEncodeHtml||(e=c(e,!1)),this.ishtml?e:e.replace(/<br.*?>/gi,"\n").replace(/<.*?>/g,"")},_filterNode:function(){for(var e=this.$refs.editArea,t=void 0,n=e.childNodes.length-1;0<=n;n--){var i=e.childNodes[n]
switch(i.nodeType){case 1:if("BR"!==i.nodeName.toUpperCase()){var o=void 0,r=!1
if((o="IMG"===i.nodeName.toUpperCase()?i:"")||(o=i.textContent||i.innerText||"",r=!0),o){var s=r?document.createTextNode(o):o
t=t||s,e.replaceChild(s,i)}else e.removeChild(i)}break
case 3:break
default:e.removeChild(i)}}this._setCursorToEnd(t)},_setCursorToEnd:function(e){if(a&&e){var t=l()
t.extend&&(t.extend(e,e.length),t.collapseToEnd&&t.collapseToEnd())}},getAfterFilterNodeHtml:function(){var e=document.createElement("div")
e.innerHTML=this.$refs.editArea.innerHTML
for(var t=e.childNodes.length-1;0<=t;t--){var n=e.childNodes[t]
switch(n.nodeType){case 1:if("BR"!==n.nodeName.toUpperCase()){var i=void 0,o=!1
if((i="IMG"===n.nodeName.toUpperCase()?n:"")||(i=n.textContent||n.innerText||"",o=!0),i){var r=o?document.createTextNode(i):i
e.replaceChild(r,n)}else e.removeChild(n)}break
case 3:break
default:e.removeChild(n)}}return e.innerHTML},save:function(){document.execCommand("AutoUrlDetect",!1,!1)
var e=this.getAfterFilterNodeHtml()
this.$emit("change",this._textFilter(e)),this.bakContent=this._textFilter(e)},keydownEnter:function(e){if(console.log("$event.keyCode",e.keyCode),229!==e.keyCode){if(e.altKey||e.ctrlKey||e.shiftKey)return
0===this.entertype?(this.insertHtml("<br/>"),this._saveRange()):(this._filterNode(),this.$emit("enter"))}},keydownShiftEnter:function(){1===this.entertype&&(this.insertHtml("<br/>"),this._saveRange())},keyup:function(){this._saveRange(),this.save()},compositionend:function(){this._saveRange(),this.save()},mouseup:function(){this._saveRange(),this.save()},drop:function(){var e=this
this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){e._filterNode(),e._saveRange(),e.save()},10)},paste:function(){var e=this
this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){e._filterNode(),e._saveRange(),e.save()},10)},hide:function(){this.innerhidden=!0},show:function(){this.innerhidden=!1},isHidden:function(){return this.innerhidden}}})})
define("pages/modules/emoji_panel/emoji_panel.js",["pages/modules/common/emoji/emoji_data.js","pages/modules/emoji_panel/emoji_panel_data.js","pages/modules/emoji_panel/emoji_panel.tpl.js","pages/modules/emoji_panel/emoji_panel.css.js"],function(e,t,o){"use strict"
var i=e("pages/modules/common/emoji/emoji_data.js"),a=e("pages/modules/emoji_panel/emoji_panel_data.js"),n=e("pages/modules/emoji_panel/emoji_panel.tpl.js")
e("pages/modules/emoji_panel/emoji_panel.css.js"),Vue.component("mp-emoji-panel",{template:n,props:{emojiheight:{type:Number,default:20},rowcount:{type:Number,default:16},columncount:{type:Number,default:7},extclass:{type:String,defalut:""},showtype:{type:String,defalut:"click"},delay:{type:Number,default:1e3}},data:function(){for(var e=this.emojiheight,t=this.rowcount,o=this.columncount,n=[],s=0;s<a.length;s++)for(var m=0;m<i.length;m++)if(i[m].id===a[s]){n[s]=i[m]
break}for(var l=[],c=0;c<o;c++)for(var p=0;p<t;p++){var u=c*t+p
n[u]&&l.push({name:n[u].style,title:n[u].emoji?n[u].emoji:n[u].cn,bp:"background-position: 0 -"+u*e+"px;"})}return{edata:l,emojiPanelPopoverShow:!1}},mounted:function(){"click"===this.showtype&&document.addEventListener("click",this.handleDocumentClick)},methods:{select:function(e){this.$emit("select",{name:this.edata[e].name,title:this.edata[e].title,emojiHtml:'<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"\n          class="icon_emotion_single '+this.edata[e].name+'" alt="mo-'+this.edata[e].title+'"></img>'})},show:function(){this.emojiPanelPopoverShow=!0},hide:function(){this.emojiPanelPopoverShow=!1},handleDocumentClick:function(e){var t=null
this.$slots.target&&this.$slots.target[0]&&(t=this.$slots.target[0].elm),t&&this.$el&&!this.$el.contains(e.target)&&!t.contains(e.target)&&this.$refs.emojiPanelPopover&&this.hide()},beforeDestroy:function(){document.removeEventListener("click",this.handleDocumentClick)}}})})
define("pages/modules/emoji_panel/emoji_panel_data.js",[],function(e,s,a){"use strict"
a.exports=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,54,55,56,57,60,62,63,64,65,66,67,68,70,74,75,76,78,79,80,81,82,83,84,85,89,92,93,94,95,300,301,302,303,304,305,306,307,204,205,202,206,212,211,313,314,315,316,317,318,319,320,321,322,323,308,309,310,311,312,209,324,215,214]})
define("pages/modules/emoji_panel/emoji_panel.tpl.js",[],function(e,o,t){return'<mp-popover :trigger="showtype" position="up-left" wrap-class="weui-desktop-popover_emoji" :delay="delay" ref="emojiPanelPopover" v-model="emojiPanelPopoverShow">  <template slot="target">    <slot name="target"></slot>  </template>  <ul class="emotions" slot="content">    <li class="emotions_item" v-for="(item, index) in edata" @click="select(index)">      <span class="icon_emotion_sprite js_emotion_i" :style=\'item.bp\'></span>    </li>  </ul></mp-popover>'})
define("pages/modules/emoji_panel/emoji_panel.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.icon_emotion_sprite {  cursor: pointer;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/emoji_panel\/icon_emotion_panel.2x4be7a8.png) no-repeat 0 0;  background-size: 20px auto;}.weui-desktop-popover_emoji {  width: 396px;  padding: 5px;}.emotions {  -moz-user-select: none;  overflow: hidden;  position: relative;  z-index: 1;}.emotions_item {  float: left;  width: 24px;  height: 24px;  line-height: 24px;  font-size: 0;  text-align: center;  background-color: #FFFFFF;}.emotions_item:hover {  background-color: #F6F8F9;}";});define("pages/modules/reply/reply.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.emotion_editor {  position: relative;  border: 1px solid #E4E8EB;}.emotion_editor .edit_area {  padding: 14px 20px;  outline: 0;  color: #353535;  word-wrap: break-word;  -webkit-hyphens: auto;  -ms-hyphens: auto;  hyphens: auto;  background-color: #FFFFFF;  height: 188px;  overflow-y: auto;}.emotion_editor .edit_area img {  vertical-align: middle;}.emotion_editor .edit_area[placeholder]:empty:before {  content: attr(placeholder);  color: #9A9A9A;}.emotion_editor:disabled,.emotion_editor[disabled] {  cursor: default;}.emotion_editor:disabled .edit_area,.emotion_editor[disabled] .edit_area,.emotion_editor:disabled .editor_toolbar,.emotion_editor[disabled] .editor_toolbar {  color: #9A9A9A;  background-color: #FAFBFC;}.emotion_editor:disabled .icon_emotion,.emotion_editor[disabled] .icon_emotion {  cursor: default;}.emotion_editor:disabled .icon_emotion:hover i,.emotion_editor[disabled] .icon_emotion:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_emotion4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.emotion_editor:disabled .icon_pic,.emotion_editor[disabled] .icon_pic {  cursor: default;}.emotion_editor:disabled .icon_pic:hover i,.emotion_editor[disabled] .icon_pic:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_pic4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.editor_toolbar {  padding: 0 20px;  line-height: 36px;  background-color: #FFFFFF;  border-top: 1px solid #E4E8EB;}.editor_toolbar:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.editor_toolbar .weui-desktop-popover__wrp {  display: inline-block;  vertical-align: middle;}.editor_tip {  float: right;  color: #9A9A9A;}.editor_tip em {  font-style: normal;  margin: 0 3px;}.editor_tip.warn {  color: #FA5151;}.icon_pic {  height: 28px;  width: 28px;  display: -ms-inline-flexbox;  display: inline-flex;  -ms-flex-align: center;      align-items: center;  -ms-flex-pack: center;      justify-content: center;  overflow: hidden;  font-size: 0;  vertical-align: middle;  cursor: pointer;}.icon_pic:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_pic_hover4510e1.svg) no-repeat 0 0;}.icon_pic i {  margin-top: 3px;  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_pic4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.icon_emotion {  float: left;  height: 28px;  width: 28px;  display: -ms-flexbox;  display: flex;  -ms-flex-align: center;      align-items: center;  -ms-flex-pack: center;      justify-content: center;  overflow: hidden;  font-size: 0;  cursor: pointer;}.icon_emotion:hover i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_emotion_hover4510e1.svg) no-repeat 0 0;}.icon_emotion i {  background: transparent url(\/mpres\/zh_CN\/htmledition\/pages\/modules\/reply\/images\/icon_emotion4510e1.svg) no-repeat 0 0;  width: 20px;  height: 20px;  vertical-align: middle;  display: inline-block;}.edit_upload_img {  max-width: 500px;  max-height: 300px;}";});define("pages/modules/reply/reply.tpl.js",[],function(e,i,t){return'<div ref="replyRef" :style="style">  <div class="emoion_editor_wrp">    <div class="emotion_editor" :disabled="disabled">      <div class="edit_area"        :contenteditable="!disabled"        :placeholder="placeholder"        ref="editArea"        @keyup="keyup"        @keydown.enter.prevent="keydownEnter"        @keydown.shift.enter.prevent="keydownShiftEnter"        @compositionend="compositionend"        @mouseup="mouseup"        @drop="drop"        @paste="paste"        @focus="notRender = true"        @blur="blur"        v-html="parsedContent"></div>       <div class="editor_toolbar">         <a v-if="hasPic" @click="showImageDialog" class="icon_pic">          <i>图片</i>        </a>        <mp-emoji-panel showtype="click" ref="emojiPanelPopover" @select="select">          <a href="javascript:void(0);" class="icon_emotion emotion_switch" slot="target">            <i>表情</i>          </a>        </mp-emoji-panel>        <template v-if="limit > 0 && !disabled">          <p class="editor_tip opr_tips" v-if="entertype == 0">，按下Enter键换行</p>          <p class="editor_tip opr_tips" v-else-if="entertype == 1">，按下Shift+Enter键换行</p>          <p class="editor_tip" v-if="remain >= 0">还可以输入<em>{{remain}}</em>字</p>          <p class="editor_tip warn" v-else>已超出<em>{{-remain}}</em>字</p>        </template>                <template v-if="disabled && disabledTips">          <p class="editor_tip opr_tips">{{disabledTips}}</p>        </template>        <div class="emotion_wrp"></div>      </div>    </div>  </div>  <slot name="imgVerifyCode"></slot>  <slot name="bar"></slot>  <mp-image-dialog v-if="hasPic" ref="imageDialog" :uploadscene="6" @select="selectImage">    <template slot="uploadTips">大小不超过10M</template>  </mp-image-dialog></div>'})
"use strict"
define("3rd/editor/common/domUtils.js",["3rd/editor/common/browser.js","3rd/editor/common/utils.js","3rd/editor/common/dtd.js"],function(e,t,r){var s=e("3rd/editor/common/browser.js").browser,f=e("3rd/editor/common/utils.js").utils,o=e("3rd/editor/common/dtd.js").dtd,d=s.ie,n=window.UE.dom
function u(e,t,r,n,i,o){var l,a=n&&e[t]
for(a=a||e[r];!a&&(l=(l||e).parentNode);){if("BODY"==l.tagName||o&&!o(l))return null
a=l[r]}return a&&i&&!i(a)?u(a,t,r,!1,i):a}var i=d&&s.version<9?{tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder"}:{tabindex:"tabIndex",readonly:"readOnly"},l=f.listToMap(["inline","inline-block","inline-table"]),c=f.listToMap(["-webkit-box","-moz-box","block","list-item","table","table-row-group","table-header-group","table-footer-group","table-row","table-column-group","table-column","table-cell","table-caption"]),p=d&&"6"==s.version?"\ufeff":"​",g=d&&"6"==s.version?"&#65279;":"&#8203;",m="_baidu_bookmark_",h="mpchecktext",y="mptmpchecktext",v="data-pluginname",N="wx-edui-media-wrp",b="custom_select_card_wrp",C=n.domUtils={NODE_ELEMENT:1,NODE_DOCUMENT:9,NODE_TEXT:3,NODE_COMMENT:8,NODE_DOCUMENT_FRAGMENT:11,POSITION_IDENTICAL:0,POSITION_DISCONNECTED:1,POSITION_FOLLOWING:2,POSITION_PRECEDING:4,POSITION_IS_CONTAINED:8,POSITION_CONTAINS:16,fillChar:p,fillCharEncode:g,fillCharReg:new RegExp(p,"g"),bookmarkFillChar:"‍",bookmarkFillCharEncdoe:"&zwj;",bookmarkFillCharReg:new RegExp("‍","g"),bookmarkPrefix:m,keys:{8:1,46:1,16:1,17:1,18:1,37:1,38:1,39:1,40:1,13:1},getPosition:function(e,t){if(!e||!t)return 1
if(e===t)return 0
var r,n=[e],i=[t]
for(r=e;r=r.parentNode;){if(r===t)return 10
n.push(r)}for(r=t;r=r.parentNode;){if(r===e)return 20
i.push(r)}if(n.reverse(),i.reverse(),n[0]!==i[0])return 1
for(var o=-1;n[++o]===i[o];);for(e=n[o],t=i[o];e=e.nextSibling;)if(e===t)return 4
return 2},createFillcharTextNode:function(e){return e.createTextNode(p)},getNodeIndex:function(e,t){for(var r=e,n=0;r=r.previousSibling;)(!t||3!=r.nodeType||r.nodeType!=r.nextSibling.nodeType)&&n++
return n},inDoc:function(e,t){return 10==C.getPosition(e,t)},findParent:function(e,t,r){if(e&&!C.isBody(e))for(e=r?e:e.parentNode;e;){if(!t||t(e)||C.isBody(e))return t&&!t(e)&&C.isBody(e)?null:e
e=e.parentNode}return null},findPreviousSibling:function(e,t,r){if(e&&!C.isBody(e))for(e=r?e:e.previousSibling;e;){if(!t||t(e)||C.isBody(e))return t&&!t(e)&&C.isBody(e)?null:e
e=e.previousSibling}return null},findNextSibling:function(e,t,r){if(e&&!C.isBody(e))for(e=r?e:e.nextSibling;e;){if(!t||t(e)||C.isBody(e))return t&&!t(e)&&C.isBody(e)?null:e
e=e.nextSibling}return null},findParentByTagName:function(e,t,r,n){return t=f.listToMap(f.isArray(t)?t:[t]),C.findParent(e,function(e){return t[e.tagName]&&!(n&&n(e))},r)},findParents:function(e,t,r,n){for(var i=t&&(r&&r(e)||!r)?[e]:[];e=C.findParent(e,r);)i.push(e)
return n?i:i.reverse()},insertAfter:function(e,t){return e&&e.parentNode?e.parentNode.insertBefore(t,e.nextSibling):null},remove:function(e,t){if(e){var r,n=e.parentNode
if(n){if(t&&e.hasChildNodes())for(;r=e.firstChild;)n.insertBefore(r,e)
n.removeChild(e)}return e}},getNextDomNode:function(e,t,r,n){return u(e,"firstChild","nextSibling",t,r,n)},isBookmarkNode:function(e){return 1==e.nodeType&&e.id&&new RegExp("^"+m,"i").test(e.id)},createBookmarkNode:function(e,t){t=t||""
var r=(e=e||document).createElement("span")
return r.style.cssText="display:none;line-height:0px;",r.appendChild(e.createTextNode("‍")),r.id=m+"start_"+t,r},getBookmarkReg:function(){return new RegExp("<span[^>]*"+m+"[^>]*>[^<]*<\\/span>","g")},getWindow:function(e){var t=e.ownerDocument||e
return t.defaultView||t.parentWindow},getCommonAncestor:function(e,t){if(e===t)return e
for(var r=[e],n=[t],i=e,o=-1;i=i.parentNode;){if(i===t)return i
r.push(i)}for(i=t;i=i.parentNode;){if(i===e)return i
n.push(i)}for(r.reverse(),n.reverse();r[++o]===n[o];);return 0==o?null:r[o-1]},clearEmptySibling:function(e,t,r){function n(e,t){for(var r;e&&!C.isBookmarkNode(e)&&(C.isEmptyInlineElement(e)||!new RegExp("[^\t\n\r"+C.fillChar+"]").test(e.nodeValue));)r=e[t],C.remove(e),e=r}t||n(e.nextSibling,"nextSibling"),r||n(e.previousSibling,"previousSibling")},split:function(e,t){var r=e.ownerDocument
if(s.ie&&t==e.nodeValue.length){var n=r.createTextNode("")
return C.insertAfter(e,n)}var i=e.splitText(t)
if(s.ie8){var o=r.createTextNode("")
C.insertAfter(i,o),C.remove(o)}return i},isWhitespace:function(e){return!new RegExp("[^ \t\n\r"+C.fillChar+"]").test(e.nodeValue)},getXY:function(e){for(var t=0,r=0;e.offsetParent;)r+=e.offsetTop,t+=e.offsetLeft,e=e.offsetParent
if(0==t&&0==r){var n=$(e).offset()
t=n.left,r=n.top}return{x:t,y:r}},on:function(e,t,r){var n=f.isArray(t)?t:f.trim(t).split(/\s+/),i=n.length
if(i)for(;i--;)if(t=n[i],e.addEventListener)e.addEventListener(t,r,!1)
else{r._d||(r._d={els:[]})
var o=t+r.toString(),l=f.indexOf(r._d.els,e)
r._d[o]&&-1!=l||(-1==l&&r._d.els.push(e),r._d[o]||(r._d[o]=function(e){return r.call(e.srcElement,e||window.event)}),e.attachEvent("on"+t,r._d[o]))}e=null},un:function(e,t,r){var n=f.isArray(t)?t:[t],i=n.length
if(i)for(;i--;)if(t=n[i],e.removeEventListener)e.removeEventListener(t,r,!1)
else{var o=t+r.toString()
try{e.detachEvent("on"+t,r._d?r._d[o]:r)}catch(e){}if(r._d&&r._d[o]){var l=f.indexOf(r._d.els,e);-1!=l&&r._d.els.splice(l,1),0==r._d.els.length&&delete r._d[o]}}},isSameElement:function(e,t){if(e.tagName!=t.tagName)return!1
var r=e.attributes,n=t.attributes
if(!d&&r.length!=n.length)return!1
for(var i,o,l=0,a=0,s=0;i=r[s++];){if("style"==i.nodeName){if(i.specified&&l++,C.isSameStyle(e,t))continue
return!1}if(d){if(!i.specified)continue
l++,o=n.getNamedItem(i.nodeName)}else o=t.attributes[i.nodeName]
if(!o.specified||i.nodeValue!=o.nodeValue)return!1}if(d){for(s=0;o=n[s++];)o.specified&&a++
if(l!=a)return!1}return!0},isSameStyle:function(e,t){var r=e.style.cssText.replace(/( ?; ?)/g,";").replace(/( ?: ?)/g,":"),n=t.style.cssText.replace(/( ?; ?)/g,";").replace(/( ?: ?)/g,":")
if(s.opera){if(r=e.style,n=t.style,r.length!=n.length)return!1
for(var i in r)if(!/^(\d+|csstext)$/i.test(i)&&r[i]!=n[i])return!1
return!0}if(!r||!n)return r==n
if(r=r.split(";"),n=n.split(";"),r.length!=n.length)return!1
for(var o,l=0;o=r[l++];)if(-1==f.indexOf(n,o))return!1
return!0},isBlockElm:function(e){return!!e&&(1==e.nodeType&&(o.$block[e.tagName]||c[C.getComputedStyle(e,"display")])&&!o.$nonChild[e.tagName])},isBlockElm2:function(e){if(e&&1==e.nodeType){var t=C.getComputedStyle(e,"display")
return!!(o.$block2[e.tagName]&&!l[t]||c[t])}return!1},isBody:function(e){return e&&1==e.nodeType&&"body"==e.tagName.toLowerCase()},breadByUneditable:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=t.node,n=null,i=[]
do{if(!(n=(n=this.getChildUneditable({node:r,isMarkNode:!1}))[0]||null)){t.attrs&&this.setAttributes(r,t.attrs),this.removePluginDefaultClass({parent:a})
for(var o=r.querySelectorAll("[class]"),l=0,s=o.length;l<s;l++){var d=o[l]
this.removePluginDefaultClass({parent:d})}i.push(r)
break}var f=null
n.parentNode&&!this.isBody(n.parentNode)&&(f=n.parentNode.cloneNode(!1)),n.nextSibling&&this.isBr(n.nextSibling)&&n.parentNode.removeChild(n.nextSibling)
var u=this.breakParent({node:n,parent:r,keepLeft:!1,keepRight:!1,returnNewDom:!0})
f&&(n.parentNode.insertBefore(f,n),f.appendChild(n)),r=null
for(var c=!1,p=0,g=u.length;p<g;p++){var m=u[p]
if(m===n)t.attrs&&t.applyUneditablParent&&this.setAttributes(m.parentNode,t.attrs),i.push(m.parentNode),c=!0
else if(c)r=m
else{i.push(m),t.attrs&&this.setAttributes(m,t.attrs),this.removePluginDefaultClass({node:m})
for(var h=m.querySelectorAll("[class]"),y=0,v=h.length;y<v;y++){var N=h[y]
this.removePluginDefaultClass({node:N})}}}}while(r)
return i},breakParent:function(e,t,r,n){var i=!1
"[object Object]"===Object.prototype.toString.call(e)&&(t=e.parent,r=e.keepLeft,n=e.keepRight,i=e.returnNewDom,e=e.node)
var o,l,a,s,d,f=e,u=e,c=!0,p=!0
for(o=e;o&&o!==t&&!(s=this.findPreviousSibling(o,function(e){return!C.isFillChar(e)}));)o=o.parentNode
for(s||!0===r||(c=!1),o=e;o&&o!==t&&!(d=this.findNextSibling(o,function(e){return!C.isFillChar(e)}));)o=o.parentNode
d||!0===n||(p=!1)
do{if(f=f.parentNode,c&&(l?((o=f.cloneNode(!1)).appendChild(l),l=o):!(s=this.findPreviousSibling(u,function(e){return!C.isFillChar(e)}))&&!0!==r||(l=f.cloneNode(!1)),l))for(;o=u.previousSibling;)l.insertBefore(o,l.firstChild)
if(p&&(a?((o=f.cloneNode(!1)).appendChild(a),a=o):!(d=this.findNextSibling(u,function(e){return!C.isFillChar(e)}))&&!0!==n||(a=f.cloneNode(!1)),a))for(;o=u.nextSibling;)a.appendChild(o)
u=f}while(t!==f)
var g=[]
return o=t.parentNode,l&&(o.insertBefore(l,t),g.push(l)),o.insertBefore(e,t),g.push(e),a&&(o.insertBefore(a,t),g.push(a)),C.remove(t),!0===i?g:e},isEmptyInlineElement:function(e){if(1!=e.nodeType||!o.$removeEmpty[e.tagName])return 0
for(e=e.firstChild;e;){if(C.isBookmarkNode(e))return 0
if(1==e.nodeType&&!C.isEmptyInlineElement(e)||3==e.nodeType&&!C.isWhitespace(e))return 0
e=e.nextSibling}return 1},trimWhiteTextNode:function(r){function e(e){for(var t;(t=r[e])&&3==t.nodeType&&C.isWhitespace(t);)r.removeChild(t)}r&&3!=r.nodeType&&(e("firstChild"),e("lastChild"))},mergeChild:function(e,t,r){for(var n,i=C.getElementsByTagName(e,e.tagName.toLowerCase()),o=0;n=i[o++];)if(n.parentNode&&!C.isBookmarkNode(n))if("span"!=n.tagName.toLowerCase())C.isSameElement(e,n)&&C.remove(n,!0)
else{if(e===n.parentNode&&(C.trimWhiteTextNode(e),1==e.childNodes.length)){e.style.cssText=n.style.cssText+";"+e.style.cssText,C.remove(n,!0)
continue}if(n.style.cssText=e.style.cssText+";"+n.style.cssText,r){var l=r.style
if(l){l=l.split(";")
for(var a,s=0;a=l[s++];)n.style[f.cssStyleToDomStyle(a.split(":")[0])]=a.split(":")[1]}}C.isSameStyle(n,e)&&C.remove(n,!0)}},getElementsByTagName:function(e,t,r){if(!e)return[]
if(r&&f.isString(r)){var n=r
r=function(e){return C.hasClass(e,n)}}t=f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var i,o=[],l=0;i=t[l++];)for(var a,s=e.getElementsByTagName(i),d=0;a=s[d++];)r&&!r(a)||o.push(a)
return o},mergeToParent:function(e){for(var t=e.parentNode;t&&o.$removeEmpty[t.tagName];){if(t.tagName==e.tagName||"A"==t.tagName){if(C.trimWhiteTextNode(t),"SPAN"==t.tagName&&!C.isSameStyle(t,e)||"A"==t.tagName&&"SPAN"==e.tagName){if(1<t.childNodes.length||t!==e.parentNode){e.style.cssText=t.style.cssText+";"+e.style.cssText,t=t.parentNode
continue}t.style.cssText+=";"+e.style.cssText}if("A"!=t.tagName){t===e.parentNode&&C.remove(e,!0)
break}}t=t.parentNode}},mergeSibling:function(e,t,r){function n(e,t,r){var n
if((n=r[e])&&!C.isBookmarkNode(n)&&1==n.nodeType&&C.isSameElement(r,n)){for(;n.firstChild;)"firstChild"==t?r.insertBefore(n.lastChild,r.firstChild):r.appendChild(n.firstChild)
C.remove(n)}}t||n("previousSibling","firstChild",e),r||n("nextSibling","lastChild",e)},unSelectable:d&&s.ie9below||s.opera?function(e){e.onselectstart=function(){return!1},e.onclick=e.onkeyup=e.onkeydown=function(){return!1},e.unselectable="on",e.setAttribute("unselectable","on")
for(var t,r=0;t=e.all[r++];)switch(t.tagName.toLowerCase()){case"iframe":case"textarea":case"input":case"select":break
default:t.unselectable="on",e.setAttribute("unselectable","on")}}:function(e){e.style.MozUserSelect=e.style.webkitUserSelect=e.style.KhtmlUserSelect="none"},removeAttributes:function(e,t){t=f.isArray(t)?t:f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0;r=t[n++];){switch(r=i[r]||r){case"className":e[r]=""
break
case"style":e.style.cssText="",!s.ie&&e.getAttributeNode("style")&&e.removeAttributeNode(e.getAttributeNode("style"))}e.removeAttribute(r)}},createElement:function(e,t,r){return C.setAttributes(e.createElement(t),r)},setAttributes:function(e,t){for(var r in t)if(t.hasOwnProperty(r)){var n=t[r]
switch(r){case"class":e.className=n
break
case"style":e.style.cssText=e.style.cssText+";"+n
break
case"innerHTML":e[r]=n
break
case"value":e.value=n
break
default:e.setAttribute(i[r]||r,n)}}return e},getComputedStyle:function(e,t){if(-1<"width height top left".indexOf(t))return e["offset"+t.replace(/^\w/,function(e){return e.toUpperCase()})]+"px"
if(3==e.nodeType&&(e=e.parentNode),s.ie&&s.version<9&&"font-size"==t&&!e.style.fontSize&&!o.$empty[e.tagName]&&!o.$nonChild[e.tagName]){var r=e.ownerDocument.createElement("span")
r.style.cssText="padding:0;border:0;font-family:simsun;",r.innerHTML=".",e.appendChild(r)
var n=r.offsetHeight
return e.removeChild(r),r=null,n+"px"}try{var i=C.getStyle(e,t)||(window.getComputedStyle?C.getWindow(e).getComputedStyle(e,"").getPropertyValue(t):(e.currentStyle||e.style)[f.cssStyleToDomStyle(t)])}catch(e){return""}return f.transUnitToPx(f.fixColor(t,i))},removeClasses:function(e,t){t=f.isArray(t)?t:f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0,i=e.className;r=t[n++];)i=i.replace(new RegExp("\\b"+r+"\\b"),"");(i=f.trim(i).replace(/[ ]{2,}/g," "))?e.className=i:C.removeAttributes(e,["class"])},addClass:function(e,t){if(e){t=f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0,i=e.className;r=t[n++];)new RegExp("\\b"+r+"\\b").test(i)||(e.className+=" "+r)}},hasClass:function(e,t){if(!e)return!1
if(f.isRegExp(t))return t.test(e.className)
t=f.trim(t).replace(/[ ]{2,}/g," ").split(" ")
for(var r,n=0,i=e.className;r=t[n++];)if(!new RegExp("\\b"+r+"\\b","i").test(i))return!1
return n-1==t.length},preventDefault:function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},removeStyle:function(e,t){s.ie?("color"==t&&(t="(^|;)"+t),e.style.cssText=e.style.cssText.replace(new RegExp(t+"[^:]*:[^;]+;?","ig"),"")):e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(f.cssStyleToDomStyle(t)),e.style.cssText||C.removeAttributes(e,["style"])},getStyles:function(e){if(!e||!e.style||!e.style.cssText)return null
for(var t={},r=e.style.cssText.replace(/( *; *)/g,";").replace(/( *: *)/g,":").split(";"),n=0,i=r.length;n<i;n++){var o=r[n]
if(o){var l=o.split(":")
l[0]&&l[1]&&!t[l[0]]&&(t[l[0]]=l[1])}}return t},getStyle:function(e,t){var r=e.style[f.cssStyleToDomStyle(t)]
return f.fixColor(t,r)},setStyle:function(e,t,r){e.style[f.cssStyleToDomStyle(t)]=r,f.trim(e.style.cssText)||this.removeAttributes(e,"style")},setStyles:function(e,t){for(var r in t)t.hasOwnProperty(r)&&C.setStyle(e,r,t[r])},removeDirtyAttr:function(e){for(var t,r=0,n=e.getElementsByTagName("*");t=n[r++];)t.removeAttribute("_moz_dirty")
e.removeAttribute("_moz_dirty")},getChildCount:function(e,t){var r=0,n=e.firstChild
for(t=t||function(){return 1};n;)t(n)&&r++,n=n.nextSibling
return r},isEmptyNode:function(e,n){return!e||1!=e.nodeType||(null==n&&(n=!0),!e.firstChild||0==C.getChildCount(e,function(e){var t=!C.isBr(e)&&!C.isMarkNode(e)&&!C.isWhitespace(e),r=!("none"!==C.getComputedStyle(e,"display"))
return n?t:t&&!r}))},clearSelectedArr:function(e){for(var t;t=e.pop();)C.removeAttributes(t,["class"])},scrollToView:function(e,t,r){var n,i,o=(n=t.document,(i="CSS1Compat"==n.compatMode)?n.documentElement.clientWidth:n.body.clientWidth,(i?n.documentElement.clientHeight:n.body.clientHeight)||0),l=-1*o+r
l+=e.offsetHeight||0,l+=C.getXY(e).y
var a=function(e){if("pageXOffset"in e)return{x:e.pageXOffset||0,y:e.pageYOffset||0}
var t=e.document
return{x:t.documentElement.scrollLeft||t.body.scrollLeft||0,y:t.documentElement.scrollTop||t.body.scrollTop||0}}(t).y;(a<l||l<a-o)&&t.scrollTo(0,l+(l<0?-20:20))},isBr:function(e){return 1==e.nodeType&&"BR"==e.tagName},isFillChar:function(e,t){return 3==e.nodeType&&!e.nodeValue.replace(new RegExp((t?"^":"")+C.fillChar,"g"),"").length},isFillChar2:function(e){return!(!e||3!==e.nodeType||this.replaceFillChar(e.nodeValue))},isStartInblock:function(e){var t,r=e.cloneRange(),n=0,i=r.startContainer
if(1==i.nodeType&&i.childNodes[r.startOffset])for(var o=(i=i.childNodes[r.startOffset]).previousSibling;o&&C.isFillChar(o);)o=(i=o).previousSibling
for(this.isFillChar(i,!0)&&1==r.startOffset&&(r.setStartBefore(i),i=r.startContainer);i&&C.isFillChar(i);)i=(t=i).previousSibling
for(t&&(r.setStartBefore(t),i=r.startContainer),1==i.nodeType&&C.isEmptyNode(i)&&1==r.startOffset&&r.setStart(i,0).collapse(!0);!r.startOffset;){if(i=r.startContainer,C.isBlockElm(i)||C.isBody(i)){n=1
break}var l
if(o=r.startContainer.previousSibling){for(;o&&C.isFillChar(o);)o=(l=o).previousSibling
l?r.setStartBefore(l):r.setStartBefore(r.startContainer)}else r.setStartBefore(r.startContainer)}return n&&!C.isBody(r.startContainer)?1:0},isEmptyBlock:function(e,t){if(!e)return 0
if(1!=e.nodeType)return 0
if(t=t||new RegExp("[ \t\r\n"+C.fillChar+"]","g"),0<e[s.ie?"innerText":"textContent"].replace(t,"").length)return 0
for(var r in o.$isNotEmpty)if(e.getElementsByTagName(r).length)return 0
return 1},getChildUneditable:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=[]
if(!t.node||!t.node.querySelectorAll)return r
for(var n=t.node.querySelectorAll('[contenteditable="false"]'),i=0,o=n.length;i<o;i++){var l=n[i]
!t.isMarkNode&&this.isMarkNode(l)||r.push(l)}return r},getContentEditableNode:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=null
if(!t.node)return r
var n=t.node
for(n&&3===n.nodeType&&(n=n.parentNode);n&&n.nodeName&&"body"!==n.nodeName.toLocaleLowerCase();){if(2===this.isContentEditable({node:n,checkParent:!1})&&(t.isMarkNode||!t.isMarkNode&&!this.isMarkNode(n))){r=n
break}n=n.parentNode}return r},isContentEditable:function(e){var t=0<arguments.length&&void 0!==e?e:{},r=t.node,n=t.checkParent
if(!r)return 2
var i=r
if(1!==i.nodeType&&(i=i.parentNode),!i||1!==i.nodeType)return 2
if(!n)return"false"==i.contentEditable+""?2:3
for(;i;){var o=i.contentEditable+""
if("false"==o)return 2
if("true"==o)return 1
i=i.parentNode}return 2},setViewportOffset:function(e,t){var r=0|parseInt(e.style.left),n=0|parseInt(e.style.top),i=e.getBoundingClientRect(),o=t.left-i.left,l=t.top-i.top
o&&(e.style.left=r+o+"px"),l&&(e.style.top=n+l+"px")},fillNode:function(e,t){var r=s.ie?e.createTextNode(C.fillChar):e.createElement("br")
t.innerHTML="",t.appendChild(r)},moveChild:function(e,t,r){for(;e.firstChild;)r&&t.firstChild?t.insertBefore(e.lastChild,t.firstChild):t.appendChild(e.firstChild)},hasNoAttributes:function(e){return s.ie?/^<\w+\s*?>/.test(e.outerHTML):0==e.attributes.length},isCustomeNode:function(e){return 1==e.nodeType&&e.getAttribute("_ue_custom_node_")},isTagNode:function(e,t){return 1==e.nodeType&&new RegExp("^"+e.tagName+"$","i").test(t)},filterNodeList:function(e,t,r){var n=[]
if(!f.isFunction(t)){var i=t
t=function(e){return-1!=f.indexOf(f.isArray(i)?i:i.split(" "),e.tagName.toLowerCase())}}return f.each(e,function(e){t(e)&&n.push(e)}),0==n.length?null:1!=n.length&&r?n:n[0]},isInNodeEndBoundary:function(e,t){var r=e.startContainer
if(3==r.nodeType&&e.startOffset!=r.nodeValue.length)return 0
if(1==r.nodeType&&e.startOffset!=r.childNodes.length)return 0
for(;r!==t;){if(r.nextSibling)return 0
r=r.parentNode}return 1},isBoundaryNode:function(e,t){for(;!C.isBody(e);)if(e!==(e=e.parentNode)[t])return!1
return!0},canContainByP:function(e){var t=0<arguments.length&&void 0!==e?e:{},r={body:1,div:1,p:1,section:1,ol:1,ul:1}
if(t.tagName)return!r[t.tagName]
if(t.dom){var n=t.dom.nodeType
if(1!==n)return 3===n
var i=t.dom.outerHTML
for(var o in r){if(Object.prototype.hasOwnProperty.call(r,o))if(new RegExp("<"+o+"\\s*[^>]*>","i").test(i))return!1}return!0}return!1},canContainP:function(e){var t=0<arguments.length&&void 0!==e?e:{},r={p:1}
if(t.tagName)return!r[t.tagName]
if(t.dom){for(var n=t.dom;n&&"body"!==n.nodeName.toLowerCase();){if(r[n.nodeName.toLowerCase()])return!1
n=n.parentNode}return!0}return!1},isMarkNode:function(e){if(!e||!e.tagName)return!1
var t=e.tagName.toLowerCase()
return t===h||t===y||"mp-pay-preview-filter"===t||!!this.isBookmarkNode(e)},replaceFillChar:function(e){return e?e.replace(this.fillCharReg,"").replace(this.bookmarkFillCharReg,""):""},getTreeWalker:function(e){var t=this,r=0<arguments.length&&void 0!==e?e:{}
if(!r.root||!f.isSupportWalker())return null
var n=null
return(r.filterMarkNode||r.filterFillchar||"function"==typeof r.filter)&&(n={acceptNode:function(e){return!(r.filterMarkNode&&t.isMarkNode(e)||r.filterFillchar&&t.isFillChar2(e))&&("function"!=typeof r.filter||r.filter({node:e}))?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}}),r.root.ownerDocument.createTreeWalker(r.root,r.whatToShow,n,!1)},isContainUneditable:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(!t.node||1!==t.node.nodeType)return!1
var r=t.node.querySelectorAll('[contenteditable="false"]')
if(!1===t.ignoreMarkNode)return 0<r.length
for(var n=0,i=r.length;n<i;n++)if(!this.isMarkNode(r[n]))return!0
return!1},isUneditableApplyStyle:function(e){return!!{margin:1,"margin-left":1,"margin-right":1,"margin-top":1,"margin-bottom":1}[(0<arguments.length&&void 0!==e?e:{}).styleKey]},getDelNode:function(e){var t=0<arguments.length&&void 0!==e?e:{},r="",n=""
if(n="pre"===t.type?(r="lastChild","previousSibling"):(r="firstChild","nextSibling"),!r)return null
for(var i=u(t.node,r,n,!1),o=null,l=null;i&&(!t.endNode||(l=C.getPosition(i,t.endNode)&C.POSITION_FOLLOWING)&&"pre"===t.type||"next"===t.type&&!l);){if(3==i.nodeType||t.filter&&t.filter(i)||!this.isBlockElm(i)&&!i[r]){o=i
break}i=u(i,r,n,!0)}return o},isUneditablePluginNode:function(e){var t=0<arguments.length&&void 0!==e?e:{}
return!!(t.node&&t.node.getAttribute&&t.node.getAttribute(v)&&2===this.isContentEditable({node:t.node,checkParent:!1}))},findUneditablePluginNode:function(e){return(0<arguments.length&&void 0!==e?e:{}).node.querySelectorAll('[contenteditable="false"]['+v+"]")},removeSiblingFillchar:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.node)for(var r=["previousSibling","nextSibling"],n=0,i=r.length;n<i;n++)for(var o=r[n],l=null,a=t.node[o];a&&this.isFillChar2(a);)l=a[o],this.remove(a),a=l},removePluginDefaultClass:function(e){var t=0<arguments.length&&void 0!==e?e:{}
if(t.node&&1===t.node.nodeType&&t.node.className&&"[object String]"===Object.prototype.toString.call(t.node.className)){var r=t.node.className.split(" ")
r.indexOf(N)<0||r.indexOf(b)<0||this.isContainUneditable({node:t.node,ignoreMarkNode:!0})||(r.splice(r.indexOf(N),1),r.splice(r.indexOf(b),1),t.node.className=r.join(" "),t.node.className||t.node.removeAttribute("class"))}},fillHtml:s.ie11below?p:"<br/>",getWordCountContent:function(e){return e?e.replace(C.fillCharReg,"").replace(C.bookmarkFillCharReg,"").replace(/(\b|^)\w+(\b|$)/g,"#").replace(/\s/g,""):""}}
return{domUtils:C,fillCharReg:C.fillCharReg,fillChar:p,fillCharEncode:g,getDomNode:u,checktextTagName:h,checktextTmpTagName:y,pluginAttr:v,pluginParentClass:N,uneditableParentClass:b}})
"use strict"
define("3rd/editor/common/browser.js",[],function(e,o,t){return window.UE||(window.UE={}),{browser:UE.browser=function(){var e=navigator.userAgent.toLowerCase(),o=window.opera,t={ipad:/(ipad).*\s([\d_]+)/i.test(e),iphone:/(iphone)\sos\s([\d_]+)/i.test(e),android:/(android)\s([\d\.]+)/i.test(e),edge:/edge\/([\w.]+)/i.test(e),ie:/(msie\s|trident.*rv:)([\w.]+)/.test(e),opera:!!o&&o.version,webkit:-1<e.indexOf(" applewebkit/"),mac:-1<e.indexOf("macintosh"),quirks:"BackCompat"==document.compatMode}
t.gecko="Gecko"==navigator.product&&!t.webkit&&!t.opera&&!t.ie
var i=0
if(t.ie){var d=e.match(/(?:msie\s([\w.]+))/),a=e.match(/(?:trident.*rv:([\w.]+))/)
i=d&&a&&d[1]&&a[1]?Math.max(1*d[1],1*a[1]):d&&d[1]?1*d[1]:a&&a[1]?1*a[1]:0,t.ie11Compat=11==document.documentMode,t.ie9Compat=9==document.documentMode,t.ie8=!!document.documentMode,t.ie8Compat=8==document.documentMode,t.ie7Compat=7==i&&!document.documentMode||7==document.documentMode,t.ie6Compat=i<7||t.quirks,t.ie9above=8<i,t.ie9below=i<9,t.ie11above=10<i,t.ie11below=i<11}if(t.gecko){var r=e.match(/rv:([\d\.]+)/)
r&&(i=1e4*(r=r[1].split("."))[0]+100*(r[1]||0)+1*(r[2]||0))}return/chrome\/(\d+\.\d)/i.test(e)&&(t.chrome=+RegExp.$1),/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e)&&!/chrome/i.test(e)&&(t.safari=+(RegExp.$1||RegExp.$2)),t.opera&&(i=parseFloat(o.version())),t.webkit&&(i=parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),t.version=i,t.isCompatible=!t.mobile&&(t.ie&&6<=i||t.gecko&&10801<=i||t.opera&&9.5<=i||t.air&&1<=i||t.webkit&&522<=i||!1),t}()}})
"use strict"
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
define("3rd/editor/common/utils.js",["3rd/editor/common/browser.js"],function(e,t,r){var n=e("3rd/editor/common/browser.js").browser,i={supportWalker:!1,hasCheckWalker:!1}
window.UE||(window.UE={})
var o,u,a,c,l=UE.utils={each:function(e,t,r){if(null!=e)if(e.length===+e.length){for(var n=0,o=e.length;n<o;n++)if(!1===t.call(r,e[n],n,e))return!1}else for(var i in e)if(e.hasOwnProperty(i)&&!1===t.call(r,e[i],i,e))return!1},isSupportWalker:function(){if(i.hasCheckWalker)return i.supportWalker
if(i.hasCheckWalker=!0,"function"==typeof document.createTreeWalker&&window.NodeFilter&&window.NodeFilter.SHOW_ALL&&window.NodeFilter.SHOW_TEXT&&window.NodeFilter.FILTER_ACCEPT&&window.NodeFilter.FILTER_REJECT){var e=document.createElement("div")
e.style.display="none",e.innerHTML='<div id="test_walker_accept"></div>a<div id="test_walker_reject"></div>'
var t=[],r=[]
try{for(var n=document.createTreeWalker(e,window.NodeFilter.SHOW_TEXT,{acceptNode:function(e){return window.NodeFilter.FILTER_ACCEPT}},!1),o=document.createTreeWalker(e,window.NodeFilter.SHOW_ALL,{acceptNode:function(e){return 1==e.nodeType&&"test_walker_accept"==e.id?window.NodeFilter.FILTER_ACCEPT:window.NodeFilter.FILTER_REJECT}},!1);n.nextNode();)t.push(n.currentNode)
for(;o.nextNode();)r.push(o.currentNode)}catch(e){t=[],r=[]}return 1==t.length&&"a"===t[0].nodeValue&&1==r.length&&"test_walker_accept"===r[0].id?i.supportWalker=!0:i.supportWalker=!1,i.supportWalker}},makeInstance:function(e){var t=new Function
return t.prototype=e,e=new t,t.prototype=null,e},extend:function(e,t,r){if(t)for(var n in t)r&&e.hasOwnProperty(n)||(e[n]=t[n])
return e},extend2:function(e){for(var t=arguments,r=1;r<t.length;r++){var n=t[r]
for(var o in n)e.hasOwnProperty(o)||(e[o]=n[o])}return e},inherits:function(e,t){var r=e.prototype,n=l.makeInstance(t.prototype)
return l.extend(n,r,!0),(e.prototype=n).constructor=e},bind:function(e,t){return function(){return e.apply(t,arguments)}},defer:function(e,t,r){var n
return function(){r&&clearTimeout(n),n=setTimeout(e,t)}},indexOf:function(e,r,n){var o=-1
return n=this.isNumber(n)?n:0,this.each(e,function(e,t){if(n<=t&&e===r)return o=t,!1}),o},removeItem:function(e,t){for(var r=0,n=e.length;r<n;r++)e[r]===t&&(e.splice(r,1),r--)},trim:function(e){return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")},listToMap:function(e){if(!e)return{}
e=l.isArray(e)?e:e.split(",")
for(var t,r=0,n={};t=e[r++];)n[t.toUpperCase()]=n[t]=1
return n},unhtml:function(e,t){return e?e.replace(t||/[&<">'](?:(amp|lt|quot|gt|#39|nbsp);)?/g,function(e,t){return t?e:{"<":"&lt;","&":"&amp;",'"':"&quot;",">":"&gt;","'":"&#39;"}[e]}):""},html:function(e){return e?e.replace(/&((g|l|quo)t|amp|#39);/g,function(e){return{"&lt;":"<","&amp;":"&","&quot;":'"',"&gt;":">","&#39;":"'"}[e]}):""},cssStyleToDomStyle:(a=document.createElement("div").style,c={float:null!=a.cssFloat?"cssFloat":null!=a.styleFloat?"styleFloat":"float"},function(e){return c[e]||(c[e]=e.toLowerCase().replace(/-./g,function(e){return e.charAt(1).toUpperCase()}))}),loadFile:(u=[],function(t,r,e){r.src&&(r.src+="?v="+UE.version),r.href&&(r.href+="?v="+UE.version)
var n=d(t,r)
if(n)n.ready?e&&e():n.funs.push(e)
else if(u.push({doc:t,url:r.src||r.href,funs:[e]}),t.body){if(!r.id||!t.getElementById(r.id)){var o=t.createElement(r.tag)
for(var i in delete r.tag,r)o.setAttribute(i,r[i])
o.onload=o.onreadystatechange=function(){if(!this.readyState||/loaded|complete/.test(this.readyState)){if(0<(n=d(t,r)).funs.length){n.ready=1
for(var e;e=n.funs.pop();)e()}o.onload=o.onreadystatechange=null}},o.onerror=function(){throw Error("The load "+(r.href||r.src)+" fails,check the url settings of file ueditor.config.js ")},t.getElementsByTagName("head")[0].appendChild(o)}}else{var a=[]
for(var i in r)"tag"!=i&&a.push(i+'="'+r[i]+'"')
t.write("<"+r.tag+" "+a.join(" ")+" ></"+r.tag+">")}}),isEmptyObject:function(e){if(null==e)return!0
if(this.isArray(e)||this.isString(e))return 0===e.length
for(var t in e)if(e.hasOwnProperty(t))return!1
return!0},fixColor:function(e,t){if(/color/i.test(e)&&/rgba?/.test(t)){var r=t.split(",")
if(3<r.length)return""
t="#"
for(var n,o=0;n=r[o++];)t+=1==(n=parseInt(n.replace(/[^\d]/gi,""),10).toString(16)).length?"0"+n:n
t=t.toUpperCase()}return t},optCss:function(e){var o,i
function t(e,t){if(!e)return""
var r=e.top,n=e.bottom,o=e.left,i=e.right,a=""
if(r&&o&&n&&i)a+=";"+t+":"+(r==n&&n==o&&o==i?r:r==n&&o==i?r+" "+o:o==i?r+" "+o+" "+n:r+" "+i+" "+n+" "+o)+";"
else for(var u in e)a+=";"+t+"-"+u+":"+e[u]+";"
return a}return e=e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi,function(e,t,r,n){if(1==n.split(" ").length)switch(t){case"padding":return(o=o||{})[r]=n,""
case"margin":return(i=i||{})[r]=n,""
case"border":return"initial"==n?"":e}return e}),(e+=t(o,"padding")+t(i,"margin")).replace(/^[ \n\r\t;]*|[ \n\r\t]*$/,"").replace(/;([ \n\r\t]+)|\1;/g,";").replace(/(&((l|g)t|quot|#39))?;{2,}/g,function(e,t){return t?t+";;":";"})},clone:function(e,t){var r
for(var n in t=t||{},e)e.hasOwnProperty(n)&&("object"==(void 0===(r=e[n])?"undefined":_typeof(r))?(t[n]=l.isArray(r)?[]:{},l.clone(e[n],t[n])):t[n]=r)
return t},transUnitToPx:function(n){if(!/(pt|cm)/.test(n))return n
var o
switch(n.replace(/([\d.]+)(\w+)/,function(e,t,r){n=t,o=r}),o){case"cm":n=25*parseFloat(n)
break
case"pt":n=Math.round(96*parseFloat(n)/72)}return n+(n?"px":"")},domReady:(o=[],function(e,t){var r=(t=t||window).document
e&&o.push(e),"complete"===r.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?s(r):(r.isReady&&s(r),t.addEventListener?(r.addEventListener("DOMContentLoaded",function e(){r.removeEventListener("DOMContentLoaded",e,!1),s(r)},!1),t.addEventListener("load",function(){s(r)},!1)):(function(){if(!r.isReady){try{r.documentElement.doScroll("left")}catch(e){return setTimeout(arguments.callee,0)}s(r)}}(),t.attachEvent("onload",function(){s(r)})))}),cssRule:n.ie&&11!=n.version&&document.createStyleSheet?function(e,t,r){var n,o,i
if((n=(r=r||document).indexList?r.indexList:r.indexList={})[e])i=r.styleSheets[n[e]]
else{if(void 0===t)return""
i=r.createStyleSheet("",o=r.styleSheets.length),n[e]=o}if(void 0===t)return i.cssText
i.cssText=t||""}:function(e,t,r){var n,o=(r=r||document).getElementsByTagName("head")[0]
if(!(n=r.getElementById(e))){if(void 0===t)return"";(n=r.createElement("style")).id=e,o.appendChild(n)}if(void 0===t)return n.innerHTML
""!==t?n.innerHTML=t:o.removeChild(n)},sort:function(e,t){t=t||function(e,t){return e.localeCompare(t)}
for(var r=0,n=e.length;r<n;r++)for(var o=r,i=e.length;o<i;o++)if(0<t(e[r],e[o])){var a=e[r]
e[r]=e[o],e[o]=a}return e}}
function s(e){e.isReady=!0
for(var t;t=o.pop();t());}function d(e,t){try{for(var r,n=0;r=u[n++];)if(r.doc===e&&r.url==(t.src||t.href))return r}catch(e){return null}}return l.each(["String","Function","Array","Number","RegExp","Object"],function(t){UE.utils["is"+t]=function(e){return Object.prototype.toString.apply(e)=="[object "+t+"]"}}),{utils:l}})
