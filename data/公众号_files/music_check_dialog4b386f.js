define("pages/modules/media_dialog/blockquote_dialog/blockquote_dialog.tpl.js",[],function(e,a,t){return'<mp-dialog weui="true" v-model="dialogShow" title="插入引用格式" wrap-class="weui-desktop-video-dialog" @close="dialogClose">  <mp-tab class="weui-desktop-tab_dialog" :tabs="tabs" :selected="tab" @click="tabChange"></mp-tab>    <div class="quote_wrp">    <div class="quote_inner">      <mp-form>        <mp-form-item>          <template slot="label">引用文本</template>          <mp-input v-if="text === \'\'" :multi="true" :countable="true" :maxlength="300" v-model="digest" filter="trim" placeholder="输入引用文本（300字以内）" @input="digestInput" :status="digestError ? \'warn\' : \'normal\'">            <template slot="message">{{ digestError }}</template>          </mp-input>          <mp-input v-else :multi="true" v-model="text" disabled></mp-input>        </mp-form-item>                <template v-if="tab === \'inner\'">          <mp-form-item class="weui-desktop-form__control-group_offset">            <template slot="label">查找来源</template>            <mp-radio-group v-model="source">              <mp-radio value="url">输入文章地址</mp-radio>              <mp-radio value="biz">查找公众号文章</mp-radio>            </mp-radio-group>          </mp-form-item>          <div class="quote_article_area">                        <div class="quote_article_area_inner" v-if="source === \'url\'">              <mp-form-item>                <template slot="label">文章链接</template>                <template>                  <mp-input filter="trim" v-model.trim="search.url.data" placeholder="输入引用文本所属公众号文章链接" @input="searchUrl" :status="search.url.error ? \'warn\' : \'normal\'">                    <template slot="message">{{ search.url.error }}</template>                  </mp-input>                  <div class="weui-desktop-table__wrp quote_article_table" v-if="search.url.loading !== null && !search.url.error">                    <table class="weui-desktop-table">                      <thead class="weui-desktop-table__hd">                        <tr>                          <th class="weui-desktop-table__check-cell"></th>                          <th>文章</th>                          <th>公众号</th>                        </tr>                      </thead>                      <tbody class="weui-desktop-table__bd">                        <tr v-if="search.url.loading">                          <td colspan="3" loading="true">                            <i class="weui-desktop-loading">加载中</i>                          </td>                        </tr>                        <tr v-else-if="search.url.result === null">                          <td colspan="3" empty="true">暂无数据</td>                        </tr>                        <tr v-else>                          <td class="weui-desktop-table__check-cell">                            <mp-radio-group v-model="chooseUrlIdx">                              <mp-radio :value="0"></mp-radio>                            </mp-radio-group>                          </td>                          <td>                            <a :href="search.url.result.url" target="_blank" class="quote_article_title">{{ search.url.result.title }}</a>                          </td>                          <td>                            <div class="quote_article_nickname">{{ search.url.result.nickname }}</div>                          </td>                        </tr>                      </tbody>                    </table>                  </div>                </template>              </mp-form-item>            </div>                        <div class="quote_article_area_inner" v-else>              <mp-form-item>                <template slot="label">公众号</template>                <template>                                    <div class="quote_account_area quote_account_area_account" v-if="chooseBizIdx === null">                    <mp-search filter="trim" placeholder="输入引用文章所属的公众号名称或微信号" v-model.trim="search.biz.data" @search="searchBiz" @input="search.biz.error = \'\', search.biz.loading = null" :status="search.biz.error ? \'warn\' : \'normal\'">                      <template v-if="search.biz.error" slot="message">{{ search.biz.error }}</template>                    </mp-search>                    <div v-if="search.biz.loading !== null && !search.biz.error" class="weui-desktop-media__list-wrp">                      <div v-if="search.biz.loading" class="weui-desktop-media-tips"><i class="weui-desktop-loading"></i></div>                      <ul v-else-if="search.biz.result.length" class="quote_account_list">                        <li class="quote_account_item" v-for="(biz, bizIdx) in search.biz.result" @click="chooseBiz(bizIdx)">                          <div class="weui-desktop-vm_primary">                            <img class="quote_account_avatar" :src="biz.round_head_img || defaultBizAvatar">                            <strong class="quote_account_nickname">{{ biz.nickname }}</strong>                            <i class="quote_account_wechat">微信号：{{ biz.alias || \'未设置\' }}</i>                          </div>                          <div class="weui-desktop-vm_default quote_account_type">{{ biz.service_type === 0 ? \'订阅号\' : \'服务号\' }}</div>                        </li>                      </ul>                      <div v-else class="weui-desktop-media-tips">暂无数据</div>                    </div>                    <mp-pagination v-if="search.biz.loading !== null && !search.biz.error && !search.biz.loading && search.biz.result.length" :total-num="search.biz.pagination.total" :per-page="3" :current="search.biz.pagination.current" @page-change="bizPageChange"></mp-pagination>                  </div>                                    <div class="quote_account_area quote_account_area_article" v-else>                    <p class="quote_account_msg">                      {{ search.biz.result[chooseBizIdx].nickname }}<mp-button class="weui-desktop-link-btn weui-desktop-link" @click="chooseBizIdx = null, chooseArticleIdx = null, search.biz.data = \'\', search.biz.loading = null">重新搜索</mp-button>                    </p>                    <mp-search filter="trim" placeholder="输入文章名查找公众号群发过的文章" v-model.trim="search.article.data" @search="searchArticle"></mp-search>                    <div v-if="search.article.loading !== null" class="weui-desktop-media__list-wrp">                      <div v-if="search.article.loading" class="weui-desktop-media-tips"><i class="weui-desktop-loading"></i></div>                      <div v-else-if="search.article.result.length" class="quote_article_list">                        <mp-radio-group v-model="chooseArticleIdx">                          <label class="quote_article_item" v-for="(article, articleIdx) in search.article.result">                            <span class="weui-desktop-vm_default">                              <mp-radio :value="articleIdx" :disabled="article.is_pay_subscribe === 1"></mp-radio>                            </span>                            <span class="weui-desktop-vm_primary">                              <span v-if="article.is_pay_subscribe" class="weui-desktop-key-tag weui-desktop-key-tag_pay">付费</span>                              <a :href="article.link" target="_blank" class="quote_article_title" v-html="article.title"></a>                            </span>                            <span class="weui-desktop-vm_default quote_article_date">{{ article.update_time | formatDate }}</span>                          </label>                        </mp-radio-group>                      </div>                      <div v-else class="weui-desktop-media-tips">暂无数据</div>                    </div>                    <mp-pagination v-if="search.article.loading !== null && !search.article.loading && search.article.result.length" :total-num="search.article.pagination.total" :per-page="4" :current="search.article.pagination.current" :show-jumper="search.article.pagination.showJumper" :show-endpage="search.article.pagination.showEndpage" @page-change="articlePageChange"></mp-pagination>                  </div>                </template>              </mp-form-item>            </div>          </div>        </template>                <template v-else>          <mp-form-item>            <template slot="label">引用来源</template>            <mp-input filter="trim" placeholder="输入外部内容来源信息：作者，来源等（选填）" v-model="from"></mp-input>          </mp-form-item>        </template>      </mp-form>    </div>  </div>  <template slot="footer">    <mp-button type="primary" :disabled="confirmDisabled" @click="confirm">确定</mp-button>    <mp-button @click="dialogClose">取消</mp-button>  </template></mp-dialog>'})
define("pages/editor/templateDialog4Web1.js",["pages/modules/media_dialog/template_dialog/template_dialog.js"],function(e,a,t){"use strict"
function l(){return{isShow:!1,defaultShow:!1}}t.exports={getParams:l,bindEvent:function(a){a.eventBus.$on("requireTemplateDialog",function(){a.isRequired||(e("pages/modules/media_dialog/template_dialog/template_dialog.js"),a.isRequired=!0)}),a.eventBus.$on("showTemplateDialog",function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
a.eventBus.$emit("requireTemplateDialog"),function(e,a){var t=l()
for(var o in a)void 0!==t[o]&&(t[o]=a[o])
for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e.params[i]=t[i])
e.params.isShow=!0,e.params.defaultShow=!0}(a,e),a.eventBus.$emit("update-component",{key:"mp-template-dialog",params:a.params})}),a.eventBus.$on("hideTemplateDialog",function(e){a.params.defaultshow=!e})},close:function(e){e.eventBus.$emit("showTemplateDialog_callback",e.data)}}})
define("pages/modules/media_dialog/template_dialog/template_dialog.js",["vue-weui/src/dialog/dialog.js","vue-weui/src/pagination/pagination.js","pages/modules/media/templatemsg/templatemsg.js","pages/modules/media_dialog/template_dialog/template_dialog.css.js","pages/modules/media_dialog/template_dialog/template_dialog.tpl.js","pages/modules/utils/cgi.js","pages/modules/media_dialog/template_dialog/template_common.js"],function(e,t,i){"use strict"
e("vue-weui/src/dialog/dialog.js"),e("vue-weui/src/pagination/pagination.js"),e("pages/modules/media/templatemsg/templatemsg.js"),e("pages/modules/media_dialog/template_dialog/template_dialog.css.js")
var a=e("pages/modules/media_dialog/template_dialog/template_dialog.tpl.js"),s=e("pages/modules/utils/cgi.js"),o=e("pages/modules/media_dialog/template_dialog/template_common.js")
Vue.component("mp-template-dialog",{template:a,props:{value:{type:Boolean,default:!1}},data:function(){return{dialogShow:!1,dialogTitle:"插入模版",loading:!1,pageConf:{pageLen:4,totalNum:0,currentPage:1},selectedTemplate:null,msg:null,list:[],itemHeight:238,dialogHeight:0,lastHeight:0,height:0}},mounted:function(){var e=this
!0===this.value&&this.show()
var t=this.$refs.templateDialog,i=t&&t.$refs.main,a=i&&i.querySelector(".weui-desktop-dialog")
this.dialogHeight=function(e,t){if(!e)return 0;(e=e.cloneNode(!0)).style.visibility="hidden",document.body.appendChild(e)
var i=0,a=e.offsetHeight
return i+=t?parseInt(window.getComputedStyle(e).marginTop,10)+parseInt(window.getComputedStyle(e).marginBottom,10)+a:a,document.body.removeChild(e),e.style.visibility="visible",i}(a),this.needResize(),this.pageChange({currentPage:1})
var s=this
window.addEventListener("resize",function(){s.timer&&clearTimeout(s.timer),s.timer=setTimeout(function(){s.needResize()&&e.pageChange({currentPage:e.pageConf.currentPage})},250)})},watch:{value:function(e){!0===e?this.show():this.hide()},dialogShow:function(e){this.$emit("input",e)}},methods:{show:function(){!1===this.dialogShow&&(this.dialogShow=!0)},hide:function(){!0===this.dialogShow&&(this.dialogShow=!1)},closeDialog:function(){this.hide(),this.$emit("cancel")},getTemplateData:function(e){var a=this
return this.loading=!0,new Promise(function(t,i){s.post({url:"/cgi-bin/appmsgtemplate?action=list",data:{begin:e*a.pageConf.pageLen,count:a.pageConf.pageLen},mask:!1},function(e){(e&&e.base_resp&&0===e.base_resp.ret?t:i)(e)},function(){i({code:-1})})})},pageChangeSucCb:function(e){var t=e.appmsg_template||[]
if(0===t.length)return!(this.msg="暂无数据")
var i=+e.total
return this.pageConf.totalNum=i,o.formatTemplateData(t,{canSelect:!0,canPreview:!1,showUpdateTime:!0,showEdit:!1,highLine:!1}),this.list=t,!(this.loading=!1)},pageChangeErrCb:function(e){if(this.loading=!1,e&&e.base_resp)switch(e.base_resp.ret){case 200013:this.msg="操作太频繁，请稍后再试"
break
default:this.msg=""}e&&0!==e.code&&(this.msg="系统繁忙，请稍后再试")},pageChange:function(e){var t=this,i=e.currentPage,a=0<=(this.pageConf.currentPage=i)-1?i-1:0
this.getTemplateData(a).then(function(e){t.pageChangeSucCb(e)}).catch(function(e){t.pageChangeErrCb(e)})},selectTemplate:function(e){this.selectedTemplate=e},submit:function(){this.$emit("select",{content:this.selectedTemplate&&this.selectedTemplate.content?this.selectedTemplate.content:""}),this.hide()},needResize:function(){var e=!1,t=window.innerHeight-this.dialogHeight,i=Math.floor(t/this.itemHeight)
return i=i<2?2:i,t/this.itemHeight-i!=0&&(t=this.itemHeight*i),t!==this.lastHeight&&(e=!0),this.pageConf.pageLen=2*i,this.lastHeight=t,this.height=t+"px",e},reportManageClick:function(){(new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=122333_83_1&t="+Math.random()}}})})
define("pages/modules/media/templatemsg/templatemsg.js",["pages/modules/media/templatemsg/templatemsg.tpl.js"],function(e,t,m){"use strict"
var s=e("pages/modules/media/templatemsg/templatemsg.tpl.js")
Vue.component("mp-template-msg",{template:s,props:{item:{type:Object,default:function(){return{}}},selectedTemplate:{type:Object,default:function(){return{}}}},computed:{isSelected:function(){return this.selectedTemplate&&this.item.appmsgid===this.selectedTemplate.appmsgid?"display:block":""}},methods:{choose:function(){this.$emit("click",this.item)}}})})
define("pages/modules/media/templatemsg/templatemsg.tpl.js",[],function(t,e,s){return'<span><svg xmlns="http://www.w3.org/2000/svg" style="width:0;height:0;visibility:hidden;position:absolute;z-index:-1"><symbol id="common-edit" viewBox="0 0 16 17"><path d="M8 1H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8h-2v7H2V3h6V1z"></path><path d="M15.185 2.714l.448-.448c.3-.3.31-.81 0-1.118l-.296-.296a.787.787 0 0 0-1.118 0l-.448.448 1.414 1.414zm-.707.707L8.414 9.485 7 8.071l6.064-6.064 1.414 1.414zm-8.15 6.21L7 8.071l1.414 1.414-1.56.673c-.515.222-.747-.016-.526-.527z"></path></symbol><symbol id="common-del" viewBox="0 0 16 18"><path d="M1 5c-.556 0-1-.448-1-1 0-.556.448-1 1-1h14c.555 0 1 .448 1 1 0 .556-.448 1-1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5zm12 0H3v11h10V5zM5.99 0h4.02A1 1 0 0 1 11 1v1H5V1c0-.556.444-1 .99-1zM10 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C9 7.453 9.448 7 10 7zM6 7c.556 0 1 .446 1 .997v6.006c0 .544-.448.997-1 .997-.556 0-1-.446-1-.997V7.997C5 7.453 5.448 7 6 7z"></path></symbol></svg><div class="js_appmsg weui-desktop-card weui-desktop-appmsg" :data-id="item.appmsgid" @click="choose">  <div class="weui-desktop-card__inner">    <div class="weui-desktop-card__bd">        <div class="weui-desktop-appmsg__cover-item weui-desktop-appmsg__cover_thumb">            <h4 class="weui-desktop-appmsg__cover__title__wrp js_title">                <span class="weui-desktop-appmsg__cover__title">{{item.titleEncode}}</span>            </h4>            <div class="weui-desktop-appmsg__cover__thumb" v-html="item.iframeHtml"></div>            <div v-show="!item.canPreview && !item.canSelect" class="weui-desktop-mask weui-desktop-mask_transparent weui-desktop-mask_status"></div>        </div>    </div>    <div class="weui-desktop-card__ft">      <div v-show="item.showEdit" class="weui-desktop-appmsg__opr weui-desktop-link-group">        <mp-tooltip class="weui-desktop-link" content="编辑" position="down-center" :delay="300">          <a slot="target" class="weui-desktop-icon-btn" href="/cgi-bin/appmsgtemplate?action=edit&lang=zh_CN&token={token}&appmsgid={appmsgid}">              <svg width="16" height="17" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#common-edit"/></svg>          </a>        </mp-tooltip>        <mp-popover class="weui-desktop-link">          <mp-tooltip slot="target" content="删除" position="down-center" :delay="300">            <a slot="target" class="js_del weui-desktop-icon-btn" data-id="{appmsgid}" href="javascript:;">              <svg width="16" height="18" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#common-del"/></svg>            </a>          </mp-tooltip>          <div slot="content">删除后不会影响已群发的图文消息，确定删除该模版？</div>          <div slot="bar">            <mp-button type="primary">删除</mp-button>            <mp-button type="default">取消</mp-button>          </div>        </mp-popover>      </div>      <div v-show="item.showUpdateTime" class="weui-desktop-appmsg__tips weui-desktop-tips">更新于 {{item.update_time_str}}</div>    </div>  </div>  <div class="js_mask weui-desktop-mask weui-desktop-mask_status" v-show="item.canSelect" v-bind:style="isSelected">    <i class="icon_card_selected">已选择</i>  </div></div></span>'})
define("pages/modules/media_dialog/template_dialog/template_dialog.css.js", [], function (require, exports, module){module.exports = ".weui-desktop-appmsg {  position: relative;}.weui-desktop-appmsg .weui-desktop-mask {  display: none;  color: #FFFFFF;}.weui-desktop-appmsg .weui-desktop-mask_msg {  display: block;}.weui-desktop-appmsg .weui-desktop-card__inner {  padding: 0;}.weui-desktop-appmsg .weui-desktop-card__ft {  padding-left: 15px;  padding-right: 15px;  padding-top: 10px;}.weui-desktop-appmsg:hover .weui-desktop-appmsg__opr {  opacity: 1;  visibility: visible;}.weui-desktop-appmsg__cover-item {  word-wrap: break-word;  -webkit-hyphens: auto;  -ms-hyphens: auto;  hyphens: auto;  position: relative;  padding: 20px 15px 15px;}.weui-desktop-appmsg__cover-item:not(:last-child) {  padding: 12px 15px;}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb {  position: relative;}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb .weui-desktop-appmsg__cover__title__wrp {  position: absolute;  left: 15px;  right: 15px;  bottom: 12px;  padding: 8px 12px;  background-color: rgba(0, 0, 0, 0.55);}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb .weui-desktop-appmsg__cover__title {  color: #FFFFFF;}.weui-desktop-appmsg__cover-item:not(:last-child).weui-desktop-appmsg__cover_thumb .weui-desktop-appmsg__cover__thumb {  margin-top: 0;}.weui-desktop-appmsg__cover-item:hover .weui-desktop-mask_preview {  display: block;}.weui-desktop-appmsg__cover__title {  font-size: 16px;  font-weight: 400;  display: block;  line-height: 1.2;  color: #353535;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 2;}.weui-desktop-appmsg__cover__thumb {  width: 100%;  height: auto;  -webkit-background-size: cover;  background-size: cover;  background-position: 50% 50%;  background-repeat: no-repeat;  background-color: #F6F8F9;  padding-bottom: 47.07792208%;  display: block;  margin-top: 20px;}.weui-desktop-appmsg__cover__desc {  padding-top: 12px;  color: #9A9A9A;}.weui-desktop-appmsg__item:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.weui-desktop-appmsg__item:hover .weui-desktop-mask_preview {  display: block;}.weui-desktop-appmsg__item {  padding: 12px 15px;  position: relative;}.weui-desktop-appmsg__item:before {  content: \" \";  position: absolute;  top: 0;  left: 15px;  right: 15px;  border-top: 1px solid #E4E8EB;}.weui-desktop-appmsg__thumb {  float: right;  margin-left: 12px;  width: 60px;  height: 60px;  -webkit-background-size: cover;  background-size: cover;  background-position: 50% 50%;  background-repeat: no-repeat;  background-color: #F6F8F9;}.weui-desktop-appmsg__title {  font-weight: 400;  word-wrap: break-word;  -webkit-hyphens: auto;  -ms-hyphens: auto;  hyphens: auto;  color: #353535;  overflow: hidden;  text-overflow: ellipsis;  display: -webkit-box;  -webkit-box-orient: vertical;  -webkit-line-clamp: 2;}.weui-desktop-appmsg__opr {  float: right;  opacity: 0;  visibility: hidden;  -webkit-transition: opacity .3s;  transition: opacity .3s;}.weui-desktop-appmsg__tips {  color: #9A9A9A;}.weui-desktop-dialog .weui-desktop-appmsg .weui-desktop-mask_preview {  display: none;}.weui-desktop-dialog .weui-desktop-appmsg.selected .weui-desktop-mask_status,.weui-desktop-dialog .weui-desktop-appmsg:hover .weui-desktop-mask_status {  display: block;}.weui-desktop-appmsg__cover__title em,.weui-desktop-appmsg__title em {  color: #07C160;  font-style: normal;}/*How to usefont-family: 'wechatnum';*/.template_dialog .weui-desktop-dialog {  width: 726px;}.template_dialog .weui-desktop-media-global-bar {  padding-top: 0;  padding-bottom: 15px;  border: 0;}.template_dialog .weui-desktop-media__list {  padding: 0 32px;}.template_dialog .weui-desktop-pagination {  padding: 6px 32px 0;}.template_dialog .weui-desktop-appmsg__cover-item {  padding: 15px 15px 0;}.template_dialog .weui-desktop-card__ft {  padding: 10px 15px 15px;}.template_dialog .template_card_wrp:nth-child(2n) .weui-desktop-card {  margin-right: 0;}.template_dialog .weui-desktop-card {  width: 324px;  text-align: left;  display: inline-block;  vertical-align: top;  margin: 0 14px 14px 0;}.template_dialog .weui-desktop-appmsg__cover__thumb {  position: relative;  padding-bottom: 47.07792208%;  margin-top: 5px;  background: transparent;}.template_dialog iframe {  position: absolute;  top: 0;  left: 0;  width: 100%;  height: 100%;  border: 0;}.weui-desktop-media__list-col:first-child:last-child {  width: 100%;}";});define("pages/modules/media_dialog/template_dialog/template_dialog.tpl.js",[],function(e,t,a){return'<mp-dialog ref="templateDialog" weui="true" v-model="dialogShow" :title="dialogTitle" @close="closeDialog" wrap-class="weui-desktop-appmsg-dialog template_dialog">  <template>    <div class="weui-desktop-global-mod weui-desktop-media-global-bar">      <div class="weui-desktop-global__extra">        <a class="js_gomanage btn btn_default" @click="reportManageClick" target="_blank" href=\'/cgi-bin/appmsgtemplate?action=list&begin=0&count=6&lang=zh_CN\'>管理模版</a>      </div>    </div>    <div class="weui-desktop-media-list-wrp">      <p v-show="loading" class="weui-desktop-media-tips weui-desktop-media-tips_loading" :style="{height: height}">加载中</p>      <p class="weui-desktop-media-tips" v-show="!!msg && !loading" :style="{height: height}">{{msg}}</p>      <div class="weui-desktop-media__list" v-show="!loading && !msg && list && list.length > 0" :style="{height: height}">          <mp-template-msg class="weui-desktop-card_inside template_card_wrp" v-for="(item, index) in list" :key="index"           :item="item" @click="selectTemplate" :selected-template="selectedTemplate"></mp-template-msg>      </div>    </div>    <mp-pagination       :per-page="pageConf.pageLen"      :total-num="pageConf.totalNum"      :current="pageConf.currentPage"      @page-change="pageChange"      v-show="list && list.length > 0">    </mp-pagination>  </template>  <template slot="footer">      <mp-button :disabled="!selectedTemplate" type="primary" @click="submit">添加到正文</mp-button>      <mp-button type="default" @click="closeDialog">取消</mp-button>  </template></mp-dialog>'})
define("pages/modules/media_dialog/template_dialog/template_common.js",["pages/modules/utils/time.js","js/common/wx/mpEditor/pluginsList.js","js/common/wx/mpEditor/utils.js"],function(e,t,o){"use strict"
var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]
for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])}return e},c=e("pages/modules/utils/time.js"),w=e("js/common/wx/mpEditor/pluginsList.js"),p=e("js/common/wx/mpEditor/utils.js")
o.exports={formatTemplateData:function(e,t){var o=!!t.canSelect,i=!!t.canPreview,n=!!t.showUpdateTime,a=!!t.showEdit,m=!!t.highLine,r=t.token||""
!r&&window.wx&&window.wx.data&&window.wx.data.t&&(r=window.wx.data.t)
for(var s=0;s<e.length;s++){var d=e[s]
l(d,{token:r,canSelect:o,canPreview:i,showUpdateTime:n,showEdit:a,highLine:m}),d.update_time&&(d.update_time_str=c.timeFormat(d.update_time)),d.titleEncode=d.title,d.titleEncode=m?d.titleEncode.replace(/<em>/g,"__em_start__").replace(/<\/em>/g,"__em_end__").html(!0).replace(/__em_end__/g,"<em>").replace(/__em_start/g,"</em>"):d.titleEncode.html(!0),d.content=w.formatTemplateContent({content:d.content,appmsgTmplVideoWidth:400}),d.iframeHtml=function(t,o){return p.createLocalIframe({onIframeReadyFunc:function(e){e.doc.body.innerHTML=t[o].content,window.wx&&window.wx.EditorRes&&window.wx.EditorRes.template_iframe&&(e.doc.head.innerHTML='<link rel="stylesheet" type="text/css" href="'+window.wx.EditorRes.template_iframe+'">')}})}(e,s)}}}})
var _extends=Object.assign||function(n){
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
});define("common/wx/mpEditor/utils.js",[],function(){
"use strict";
function e(){
return l.uid++;
}
function t(e,t){
return(l.ie&&l.version<9?"":"<!DOCTYPE html>")+"<html xmlns='http://www.w3.org/1999/xhtml' style='overflow:hidden;'><head></head><body></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){window.parent.parent.window.__templateCardIframeReady(document,'"+e+"','"+(t||"")+"');var _tmpScript = document.getElementById('_initialScript');if(_tmpScript&&_tmpScript.parentNode){_tmpScript.parentNode.removeChild(_tmpScript);}},0)</script></html>";
}
function n(t){
var n=e();
i(t,n);
var a="";
if(t.attr)for(var c in t.attr)t.attr.hasOwnProperty(c)&&(a+=" "+c+'="'+t.attr[c]+'"');
var o="<iframe "+a+' data-uid="'+n+'" src="#src#"></iframe>';
return t.noSrc===!0?o.replace("#src#","about:blank"):o.replace("#src#",r(n,t.uid));
}
function r(e,t){
return"javascript:void(function(){window.parent.parent.window.__templateCardIframeWrite(document,'"+e+"','"+(t||"")+"');}())";
}
function a(e){
try{
delete l.iframeReadyFunc[e];
}catch(t){}
}
function i(e,t){
function n(e){
return function(t){
var n,r=t.uid,a=e.$dom;
return a||(a=$(t.win.parent.document.body)),a&&a.length>0&&(n=a.find("iframe[data-uid="+r+"]"),
n=n&&n.length>0?n[0]:null),n||(n=$(document.body).find("iframe[data-uid="+r+"]"),
n=n&&n.length>0?n[0]:null),n&&("function"==typeof e.onIframeReadyFunc&&e.onIframeReadyFunc({
doc:t.doc,
win:t.win,
iframe:n
}),e.iframeSelect===!0&&window.__editorIframeSelect&&$(t.doc.body).on("click",function(){
var e=this.ownerDocument,t=e?e.defaultView||e.parentWindow:null;
t&&window.__editorIframeSelect(t);
})),e;
};
}
e&&(e.uid?l.iframeReadyFunc[e.uid]&&e.force!==!0||(l.iframeReadyFunc[e.uid]=n(e)):t&&(l.iframeReadyFunc[t]=n(e)));
}
function c(e){
e.prototype.bindEventInterface=function(e){
return this.domUtils&&this.editor?("domUtils"==e.type?this.domUtils.on(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.addListener(e.eventName,e.fun),
this.__EventInterfaceCache||(this.__EventInterfaceCache=[]),void this.__EventInterfaceCache.push(e)):!1;
},e.prototype.unbindEventInterface=function(){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache)for(;this.__EventInterfaceCache.length>0;){
var e=this.__EventInterfaceCache[0];
"domUtils"==e.type?this.domUtils.un(e.dom,e.eventName,e.fun):"editor"==e.type&&this.editor.removeListener(e.eventName,e.fun),
this.__EventInterfaceCache.shift();
}
this.__EventInterfaceCache=[];
},e.prototype.unbindSpecifyEvent=function(e){
if(!this.domUtils||!this.editor)return!1;
if(this.__EventInterfaceCache&&e)for(var t=0,n=this.__EventInterfaceCache.length;n>t;t++){
var r=this.__EventInterfaceCache[t];
if(r.type===e.type&&r.eventName===e.eventName&&r.fun===e.fun&&(!e.dom||e.dom&&r.dom===e.dom)){
"domUtils"==r.type?this.domUtils.un(r.dom,r.eventName,r.fun):"editor"==r.type&&this.editor.removeListener(r.eventName,r.fun),
this.__EventInterfaceCache.splice(t,1);
break;
}
}
};
}
function o(e){
if(e&&0!=e.length){
var t=l.asynRenderIframeKey++;
l.asynRenderIframeId[t]=null,f(e,t,function(e){
e.replaceTagName("iframe");
});
}
}
function d(e){
if(e&&0!=e.length){
var t=l.asynRenderIframeKey++;
l.asynRenderIframeId[t]=null,f(e,t,function(e){
e.attr("src",e.attr("src"));
});
}
}
function f(e,t,n){
if(e&&0!=e.length){
var r=function(){
var r=+new Date;
if(e&&e.length>0)if(l.asynRenderIframeId[t]){
var a=r-l.asynRenderIframeId[t];
if(l.asynRenderIframeId[t]=r,120>a){
var i=e.shift(),c=i.parent();
c&&c.length>0?n(i):e=[];
}
}else l.asynRenderIframeId[t]=r;
f(e,t,n);
};
window.requestAnimationFrame(r);
}else try{
delete l.asynRenderIframeId[t];
}catch(a){}
}
function m(e){
for(var t,n=[/^http(s)?:\/\/vpic\.video\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/shp\.qpic\.cn([\/?].*)*$/i],r=0;t=n[r++];)if(t.test(e))return!0;
return!1;
}
function u(e){
e=e||"";
var t="";
return 0==e.length?"":(t=e.replace(/&lt;/g,"<"),t=t.replace(/&gt;/g,">"),t=t.replace(/&nbsp;/g,"    "),
t=t.replace(/&#039;|&#39;/g,"'"),t=t.replace(/&#047;|&#47;/g,"/"),t=t.replace(/&#092;|&#92;/g,"\\"),
t=t.replace(/&quot;/g,'"'),t=t.replace(/&amp;/g,"&"),t=t.replace(/<br>/g,"\n"),t=t.replace(/<br\/>/g,"\n"),
t=t.replace(/<br \/>/g,"\n"));
}
var s=navigator.userAgent.toLowerCase(),l={
uid:+new Date,
iframeReadyFunc:{},
ie:/(msie\s|trident.*rv:)([\w.]+)/.test(s),
version:0,
edge:/edge\/([\w.]+)/i.test(s),
asynRenderIframeKey:+new Date,
asynRenderIframeId:{}
};
return function(e,t){
if(e.ie){
var n=t.match(/(?:msie\s([\w.]+))/),r=t.match(/(?:trident.*rv:([\w.]+))/);
e.version=n&&r&&n[1]&&r[1]?Math.max(1*n[1],1*r[1]):n&&n[1]?1*n[1]:r&&r[1]?1*r[1]:0;
}
}(l,s,window),function(e,t){
"function"!=typeof e.__templateCardIframeWrite&&(e.__templateCardIframeWrite=function(e,n,r){
e.open(),e.write(t(n,r)),e.close();
});
}(window,t),function(e,t){
"function"!=typeof e.__templateCardIframeReady&&(e.__templateCardIframeReady=function(e,n,r){
var a,i;
if(i=r?t[r]:t[n],"function"==typeof i&&e){
var c=e.defaultView||e.parentWindow;
c&&(a=i({
uid:n,
customerUid:r,
doc:e,
win:c
}));
}
if(!a||a.notClear!==!0)try{
delete t[n];
}catch(o){}
});
}(window,l.iframeReadyFunc),{
getuid:e,
getIframeSrc:r,
createIframeReadyFunc:i,
createLocalIframe:n,
clearIframeReadyFunc:a,
initEventInterface:c,
createAsynRenderIframe:o,
createAsynIframeReload:d,
isOuterWhiteDomain:m,
htmlDecode:u
};
});define("pages/modules/media_dialog/music_check_dialog/musicCheckDialog4Web1.js",["pages/modules/media_dialog/music_check_dialog/music_check_dialog.js"],function(e,i,a){"use strict"
function c(){return{defaultShow:!1,isShow:!1,appmsgid:"",musicdata:[],focustype:"opentab"}}a.exports={getParams:c,bindEvent:function(i){i.eventBus.$on("requireMusicCheckDialog",function(){i.isRequired||(e("pages/modules/media_dialog/music_check_dialog/music_check_dialog.js"),i.isRequired=!0)}),i.eventBus.$on("showMusicCheckDialog",function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}
i.eventBus.$emit("requireMusicCheckDialog"),function(e,i){var a=c()
for(var o in i)void 0!==a[o]&&(a[o]=i[o])
for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e.params[s]=a[s])
e.params.isShow=!0,e.params.defaultShow=!0}(i,e),i.eventBus.$emit("update-component",{key:"mp-music-check-dialog",params:i.params})})},close:function(e){e.eventBus.$emit("showMusicCheckDialog_callback",e.data)}}})
define("pages/modules/media_dialog/music_check_dialog/music_check_dialog.js",["pages/modules/media_dialog/music_check_dialog/music_check_dialog.css.js","pages/modules/media_dialog/music_check_dialog/music_check_dialog.tpl.js","pages/modules/dbCache/dbCache.js"],function(a,i,t){"use strict"
a("pages/modules/media_dialog/music_check_dialog/music_check_dialog.css.js")
var e=a("pages/modules/media_dialog/music_check_dialog/music_check_dialog.tpl.js"),o=a("pages/modules/dbCache/dbCache.js"),c="masssendMusicCheck",d=3e5
Vue.component("mp-music-check-dialog",{template:e,props:{value:{type:Boolean,default:!1},appmsgid:{type:String,default:""},focustype:{type:String,default:"opentab"},musicdata:{type:Array,default:[]}},data:function(){for(var a=[],i=0,t=this.musicdata.length;i<t;i++){var e=this.musicdata[i]
a.push({song_type:e.song_type,song_mid:e.song_mid,song_title:e.song_title,appmsg_title:e.appmsg_title,appmsg_idx:e.appmsg_idx,appmsg_id:this.appmsgid})}return{title:"校验提醒",dialogShow:!1,data:a,cacheWin:{}}},watch:{value:function(a){!0===a?this.show():this.hide()},dialogShow:function(a){this.$emit("input",a)}},mounted:function(){!0===this.value&&this.show()},methods:{show:function(){!0!==this.dialogShow&&(this.dialogShow=!0)},hide:function(){!1!==this.dialogShow&&(this.dialogShow=!1)},dialogClose:function(a){var i=0<arguments.length&&void 0!==a?a:{}
this.hide()
var t=null
i.errorData&&0<i.errorData.length&&i.focusData&&(t={errorData:i.errorData,focusData:i.focusData}),this.$emit("cancel",t)},musicTitleClick:function(a){var i=0<arguments.length&&void 0!==a?a:{}
this.focusMusic({focusData:i.item,errorData:this.data})},modifyBtnClick:function(){this.focusMusic({focusData:this.data[0],errorData:this.data})},focusMusic:function(a){var i=0<arguments.length&&void 0!==a?a:{}
"opentab"===this.focustype?this.openNewTab({errorData:i.errorData,focusData:i.focusData}):this.dialogClose({errorData:i.errorData,focusData:i.focusData})},openNewTab:function(a){var i=0<arguments.length&&void 0!==a?a:{}
if(wx&&wx.commonData&&wx.commonData.data&&wx.commonData.data.param){o.set({data:{cacheKey:c,cacheValue:{type:"music",appmsgid:this.appmsgid,focusData:i.focusData,errorData:i.errorData},expireTime:+new Date+d}})
var t="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid="+this.appmsgid+wx.commonData.data.param,e="appmsg_"+this.appmsgid,s=this.cacheWin[e]||null
!s||s.location&&s.location.href||(s=null,delete this.cacheWin[e]),s&&0<s.location.href.indexOf("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit")&&0<s.location.href.indexOf("&appmsgid="+this.appmsgid)?window.open("",e):(s=window.open(t,e),this.cacheWin[e]=s),s&&"function"==typeof s.musicCheckResultFocus&&s.musicCheckResultFocus()}}}})})
