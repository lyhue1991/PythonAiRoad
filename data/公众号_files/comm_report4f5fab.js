define("pages/modules/media_dialog/mass_send_dialog/massSendOriginalDialog4Web1.js",["pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.js"],function(a,s,e){"use strict"
function o(){return{defaultShow:!1,isShow:!1,list:[]}}e.exports={getParams:o,bindEvent:function(s){s.eventBus.$on("requireMassSendOriginalDialog",function(){s.isRequired||(a("pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.js"),s.isRequired=!0)}),s.eventBus.$on("showMassSendOriginalDialog",function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
s.eventBus.$emit("requireMassSendOriginalDialog"),function(a,s){var e=o()
for(var i in s)void 0!==e[i]&&(e[i]=s[i])
for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(a.params[n]=e[n])
a.params.isShow=!0,a.params.defaultShow=!0}(s,a),s.eventBus.$emit("update-component",{key:"mp-mass-send-original-dialog",params:s.params})})},close:function(a){a.eventBus.$emit("showMassSendOriginalDialog_callback",a.data)}}})
define("pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.js",["pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.tpl.js","pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.css.js"],function(i,s,a){"use strict"
var t=i("pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.tpl.js")
i("pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.css.js"),Vue.component("mp-mass-send-original-dialog",{template:t,props:{value:{type:Boolean,default:!1},list:{type:Array,default:function(){return[]}}},data:function(){return{dialogShow:!1,innerList:this.list}},watch:{value:function(i){!0===i?this.show():this.hide()},list:function(i){this.initListData(i)},dialogShow:function(i){this.$emit("input",i)}},created:function(){this.initListData([].concat(this.innerList))},mounted:function(){!0===this.value&&this.show()},methods:{show:function(){!0!==this.dialogShow&&(this.dialogShow=!0)},hide:function(){!1!==this.dialogShow&&(this.dialogShow=!1,this.close())},close:function(){this.$emit("close")},initListData:function(i){this.innerList=[i],this.innerList.push([].concat(i))}}})})
define("pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.tpl.js",[],function(t,e,s){return'<mp-dialog wrapClass="mass_send_loading_dialog" title="声明原创" :width="960" v-model="dialogShow" @close="close">  <mp-msg icon="warn" title="以下图文内容不满足原创声明条件"></mp-msg>    <div v-for="(list, listIdx) in innerList" class="weui-desktop-table__wrp" :class="[ listIdx === 0 ? \'weui-desktop-table_show-head\' : \'weui-desktop-table_show-body\' ]">    <table class="weui-desktop-table">      <thead class="weui-desktop-table__hd">        <tr>          <th>图文标题</th>          <th>原创类型</th>          <th>原因</th>        </tr>      </thead>      <tbody class="weui-desktop-table__bd">        <tr v-for="item in list">          <td>            <strong class="send_original_article">{{ item.title }}</strong>          </td>          <td>            {{ item.copyright_type === \'TEXT\' ? \'文字原创\' : \'漫画原创\' }}          </td>          <td>            <p v-if="item.reason_type === \'TEXT_NUM_TOO_SMALL\'">字数≥300字，且自己创作的内容大于引用内容，才能声明文字原创。（字数不包含标点符号和空格 ）</p>            <p v-else-if="item.reason_type === \'IMG_NUM_TOO_SMALL\'">字数&lt;300字，且图片≥4张，才能声明漫画原创。（字数不包含标点符号和空格）</p>            <p v-else-if="item.reason_type === \'IS_NOT_CARTOON\'">系统识别该内容不属于漫画，不可声明漫画原创，如有异议可<a :href="item.apply_url" target="_blank">发起申诉</a>。</p>          </td>        </tr>      </tbody>    </table>  </div>  <template slot="footer">    <mp-button type="primary" @click="hide">确定</mp-button>  </template></mp-dialog>'})
define("pages/modules/media_dialog/mass_send_dialog/mass_send_original_dialog.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.mass_send_loading_dialog .weui-desktop-dialog__bd {  min-height: 400px;  padding: 30px 60px;}.mass_send_loading_dialog .weui-desktop-msg {  margin-bottom: 30px;}.mass_send_loading_dialog .weui-desktop-table_show-body {  height: 340px;  overflow: auto;  -webkit-overflow-scrolling: touch;}.mass_send_loading_dialog .weui-desktop-table th:first-child,.mass_send_loading_dialog .weui-desktop-table td:first-child {  width: 330px;}.mass_send_loading_dialog .weui-desktop-table th:nth-child(2n),.mass_send_loading_dialog .weui-desktop-table td:nth-child(2n) {  width: 100px;}.mass_send_loading_dialog .weui-desktop-table th:last-child,.mass_send_loading_dialog .weui-desktop-table td:last-child {  text-align: left;}.mass_send_loading_dialog .send_original_article {  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 1;  font-weight: 400;}";});define("pages/modules/media_dialog/import_file_dialog/importFileDialog4Web1.js",["pages/modules/media_dialog/import_file_dialog/import_file_dialog.js"],function(i,e,o){"use strict"
function l(){return{defaultShow:!1,isShow:!1,appidx:0,appid:0}}o.exports={getParams:l,bindEvent:function(e){e.eventBus.$on("requireImportFileDialog",function(){e.isRequired||(i("pages/modules/media_dialog/import_file_dialog/import_file_dialog.js"),e.isRequired=!0)}),e.eventBus.$on("showImportFileDialog",function(){var i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
e.eventBus.$emit("requireImportFileDialog"),function(i,e){var o=l()
for(var a in e)void 0!==o[a]&&(o[a]=e[a])
for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(i.params[t]=o[t])
i.params.isShow=!0,i.params.defaultShow=!0}(e,i),e.eventBus.$emit("update-component",{key:"mp-import-file-dialog",params:e.params})})},close:function(i){i.eventBus.$emit("showImportFileDialog_callback",i.data)}}})
define("pages/modules/media_dialog/import_file_dialog/import_file_dialog.js",["pages/modules/media_dialog/import_file_dialog/import_file_dialog.css.js","vue-weui/src/dialog/dialog.js","pages/modules/upload/upload.js","js/common/wx/Tips.js","pages/modules/media_dialog/import_file_dialog/import_file_dialog.tpl.js","3rd/utils/comm_report.js"],function(e,i,s){"use strict"
var t=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var s=arguments[i]
for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o])}return e}
e("pages/modules/media_dialog/import_file_dialog/import_file_dialog.css.js"),e("vue-weui/src/dialog/dialog.js"),e("pages/modules/upload/upload.js")
var o=e("js/common/wx/Tips.js"),a=e("pages/modules/media_dialog/import_file_dialog/import_file_dialog.tpl.js"),l=e("3rd/utils/comm_report.js")
Vue.component("mp-import-file-dialog",{template:a,props:{value:{type:Boolean,default:!1},appidx:{type:Number},appid:{type:Number}},data:function(){return{dialogShow:!1,uploading:!1,fileName:"",uploadFail:!1,uploadFailMsg:"",isDragEnterDialog:!1,uploadDocFile:"operate_appmsg?t=ajax-response&sub=import_doc&node_transform_version=2",uploadFileId:null,clickReport:!1}},mounted:function(){var o=this
this.$nextTick(function(){document.addEventListener("dragenter",function(){o.isDragEnterDialog||(o.isDragEnterDialog=!0)}),document.addEventListener("dragleave",function(e){var i=e.pageX,s=e.pageY
0<i||0<s||o.isDragEnterDialog&&(o.isDragEnterDialog=!1)}),document.addEventListener("drop",function(e){var i=document.querySelector("#js_import_file_container")
i&&i.contains(e.target)&&o.commReport(2)})}),!0===this.value&&this.show()},watch:{dialogShow:function(e){this.$emit("input",e)},value:function(e){!0===e?this.show():this.hide()}},methods:{show:function(){!1===this.dialogShow&&(this.dialogShow=!0)},hide:function(){!0===this.dialogShow&&(this.dialogShow=!1),this.resetUploadStatus()},closeDialog:function(){this.uploadFileId&&this.$refs.uploader.cancel(this.uploadFileId),this.hide(),this.$emit("cancel")},resetUploadStatus:function(){this.uploading=!1,this.uploadFail=!1,this.uploadFailMsg=!1,this.isDragEnterDialog=!1},getFileName:function(e){var i=e.lastIndexOf(".")
return e.substr(0,i)},transformErrorCode:function(e){var i=""
switch(e.response.base_resp.ret){case-1:case 21478001:case 21478002:case 21478003:case 21478004:case 21478005:case 21478006:case 21478007:case 21478008:i=""
break
case 200003:i="登录超时，请重新登录。"
break
case 200040:i="登录错误，请重新登录。"
break
case 200018:i="页面停留时间过久，请刷新页面后重试。"
break
default:i="文档导入出错，请重试"}return i},uploadError:function(e,i){if(this.uploadFileId=null,this.isDragEnterDialog=!1,this.uploading){var s=e&&e.response&&e.response.base_resp?this.transformErrorCode(e):i
e&&e.response&&e.response.base_resp?this.commReport(3,{isSuccess:e.response.base_resp.ret,file:e}):this.commReport(3,{isSuccess:-1111,file:e}),s&&""!==s&&o.err(s),this.uploading=!1,this.uploadFail=!0,this.uploadFailMsg="文档导入出错，请重试"}else o.err(i),this.commReport(3,{isSuccess:-1111,file:e})},uploadComplete:function(e,i){if(this.uploadFileId=null,i&&i.base_resp){if(0===i.base_resp.ret){var s=i.content
this.commReport(3,{isSuccess:1,file:e}),this.$emit("select",{title:this.getFileName(e.name),content:s}),this.hide()}this.resetUploadStatus()}},uploadProgress:function(e){this.uploadFileId=e.id,this.isDragEnterDialog=!1,this.uploading=!0,this.fileName=this.getFileName(e.name)},commReport:function(e,i){var s={ActionType:e}
if(3===e){var o=i.file?i.file:{}
s=t(s,{IfSuccess:i.isSuccess,DocType:"doc"===o.extension?0:1,DocSize:Math.ceil(o.size/1024),DocName:this.fileName})}this.appid&&(s=t(s,{AppMsgId:this.appid,AppMsgIndex:this.appidx})),l.report(20036,s)},reportAddFileClick:function(){var e=this
this.clickReport||(this.commReport(1),this.clickReport=!0),setTimeout(function(){e.clickReport=!1},100)}}})})
define("pages/modules/media_dialog/import_file_dialog/import_file_dialog.css.js", [], function (require, exports, module){module.exports = ".import-file-dialog__body {  margin: 0 30px;}.import-file-dialog__uploader-drag {  display: -ms-flexbox;  display: flex;  -ms-flex-direction: column;      flex-direction: column;  -ms-flex-pack: center;      justify-content: center;  -ms-flex-align: center;      align-items: center;  width: 640px;  height: 292px;  border: 2px dashed #e4e8eb;  font-size: 14px;  color: #9a9a9a;  background: #ebebeb;}.import-file-dialog__uploader-upload {  display: -ms-flexbox;  display: flex;  -ms-flex-direction: column;      flex-direction: column;  -ms-flex-pack: center;      justify-content: center;  -ms-flex-align: center;      align-items: center;  width: 640px;  height: 292px;  border: 2px dashed #e4e8eb;  font-size: 14px;  color: #9a9a9a;  background: #f6f8f9;}.import-file-dialog__uploader-upload .add_gray {  width: 34px;  height: 34px;  margin: 22px 0 30px;}.import-file-dialog__hint {  font-size: 14px;  color: #9a9a9a;  margin-top: 20px;}.import-file-dialog__uploading {  width: 500px;  margin: auto;  padding-top: 96px;  text-align: center;  min-height: 346px;  box-sizing: border-box;}.import-file-dialog__uploading .weui-desktop-media-tips_loading {  margin-top: 52px;}.import-file-dialog__uploading .weui-desktop-media-tips_loading:before {  width: 32px;  height: 32px;  background-size: contain;}.import-file-dialog__fail {  color: #fa5151;  margin: -14px 0 20px;}";});define("common/wx/Tips.js",[],function(e,n){
"use strict";
function t(e,n,t){
$(".JS_TIPS").remove();
var i=$(template.compile('<div class="JS_TIPS page_tips {type}" id="wxTips_'+(new Date).getTime()+'"><div class="inner">{msg}</div></div>')({
type:e||"error",
msg:n
})).appendTo("body").fadeIn();
setTimeout(function(){
o(i),i=null;
},1e3*(t||s.delay));
}
function o(e){
e&&e.length>0&&"function"==typeof e.fadeOut&&e.fadeOut({
complete:function(){
e&&"function"==typeof e.remove&&e.remove(),e=null;
}
});
}
var i=n,s={
errMsg:"系统发生错误，请稍后重试",
sucMsg:"操作成功",
delay:2
};
i.err=function(e,n){
t("error",e||s.errMsg,n);
},i.suc=function(e,n){
t("success",e||s.sucMsg,n);
},i.remove=function(){
$(".JS_TIPS").remove();
};
});define("pages/modules/media_dialog/import_file_dialog/import_file_dialog.tpl.js",[],function(i,o,l){return'<mp-dialog  ref="importFileDialog"  title=\'文档导入\'  :width="700"  v-model="dialogShow"  @close="closeDialog"  class="import-file-dialog">  <div class="import-file-dialog__body" id="js_import_file_container" v-show="!uploading" @click="reportAddFileClick">    <mp-upload      v-show="!uploading"      simple      :url="uploadDocFile"      :maxfilenum="9999"      :maxsize="15*1024*1024"      @error="uploadError"      @progress="uploadProgress"      @complete="uploadComplete"      extensions="doc,docx"      mimetype="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"      dnd="#js_file_uploader"      :disableGlobalDnd="true"      ref="uploader"    >      <div id="js_file_uploader" slot="button">        <div class="import-file-dialog__uploader-upload" v-if="!isDragEnterDialog">          <i class="icon20_common add_gray" v-show="!uploadFail"></i>          <div class="import-file-dialog__fail" v-show="uploadFail">            {{ uploadFailMsg }}          </div>          <p>点击上传或将文档拖拽至此处</p>          <p>文档不超过15M，支持doc及docx格式</p>        </div>        <div class="import-file-dialog__uploader-drag" v-else>          将文件拖拽至此处        </div>      </div>    </mp-upload>    <p class="import-file-dialog__hint">      导入的内容将覆盖原有内容，不支持的样式将转为图片或无法展示，请确认后发送。    </p>  </div>  <div class="import-file-dialog__uploading" v-show="uploading">    <div>《{{ fileName }}》导入中</div>    <div class="weui-desktop-media-tips weui-desktop-media-tips_loading">      加载中    </div>  </div></mp-dialog>'})
define("3rd/utils/comm_report.js",["pages/modules/utils/cgi.js","3rd/utils/mmbizcommon_js/utils/comm_report.js"],function(e,s,o){"use strict"
var t=e("pages/modules/utils/cgi.js"),r=e("3rd/utils/mmbizcommon_js/utils/comm_report.js")
o.exports={report:function(e,s,o){r.report("web",t,e,s,o)},leaveReport:function(e,s){r.leaveReport("web",t,e,s)}}})
"use strict"
define("3rd/utils/mmbizcommon_js/utils/comm_report.js",[],function(r,e,o){function n(r,e){return(e=JSON.parse(JSON.stringify(e))).log_id=r,console.log("[comm_report] reportjson: ",e),JSON.stringify(e)}var s={web:{report:"/cgi-bin/webreport"},wap:{report:"/mp/wapcommreport"}},c=!1,p=[],a={web:{report:function(r,e,o,t){t=t||{},r.post({url:s.web.report,data:{reportjson:n(e,o)},async:t.async,success:t.success,error:t.error})},leaveReport:function(r,e,o){if(p.push([r,e,o]),!c){var t=!(c=!0),n=function(){t||(t=!0,p.forEach(function(r){a.web.report(r[0],r[1],r[2])}))}
window.addEventListener("beforeunload",n,!1),window.addEventListener("unload",n,!1)}}},wap:{report:function(r,e,o,t){t=t||{},r({type:"POST",dataType:"json",url:s.wap.report,data:{reportjson:n(e,o)},async:t.async,success:t.success,error:t.error})}}}
return{report:function(r,e,o,t,n){a[r].report(e,o,t,n)},leaveReport:function(r,e,o,t){a[r].leaveReport(e,o,t)},getUrl:function(r,e){return s[r][e]},getData:function(r,e,o){var t=n(r,e)
return o&&(t=encodeURIComponent(t)),"reportjson="+t}}})
