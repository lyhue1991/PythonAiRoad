define("common/wx/richEditor/editorRange.js",[],function(n,e,t){
"use strict";
var r=function(){
return document.selection?document.selection:(window.getSelection||document.getSelection)();
},o=function(n,e,t){
if(!t&&n===e)return!1;
if(n.compareDocumentPosition){
var r=n.compareDocumentPosition(e);
if(20==r||0==r)return!0;
}else if(n.contains(e))return!0;
return!1;
},i=function(n,e){
var t=e.commonAncestorContainer||e.parentElement&&e.parentElement()||null;
return t?o(n,t,!0):!1;
},c=function(n){
var e=r();
if(!e)return null;
var t=e.getRangeAt?e.rangeCount?e.getRangeAt(0):null:e.createRange();
return t?n?i(n,t)?t:null:t:null;
},u=function(n){
return n.parentElement?n.parentElement():n.commonAncestorContainer;
};
t.exports={
getSelection:r,
getRange:c,
containsRange:i,
parentContainer:u
};
});define("tpl/media/appmsg.html.js",[],function(){
return'<div class="appmsg {if isMul}{else}single{/if} {if first.cover}has_first_cover{/if}"\n  data-id="{id}"\n  data-fileid="{file_id}"\n  data-completed="{completed===true?1:2}"\n  data-issharemul="{isShareMul == true?1:2}"\n  data-issupportsharemul="{isSupportShareMul == true?1:2}"\n  data-havepaidarticle="{havePaidArticle == true?1:2}"\n  data-issupportpaidsubscribe="{isSupportPaidSubscribe == true?1:2}"\n>\n    <div class="appmsg_content">\n        <div class="appmsg_info">\n            {if useUpdateTime}\n                <em class="appmsg_date">更新于 {update_time}</em>\n            {else}\n                <em class="appmsg_date">{time}</em>\n            {/if}\n            {if completed===false}\n                {if cpsfail}\n                <div class="undone_tips">\n                    文章内商品存在违规                    <br />\n                    请删除违规商品                </div>\n                {else if autoAdValid}\n                <div class="undone_tips">\n                    不满足插入广告的条件                    <br />\n                    广告需在段落间且前后超过300字符                </div>\n                {else if isMul}\n                <div class="undone_tips">\n                    图文内容不完整                    <br />\n                    {if notCompletedType === \'title-emoji\'}\n                    标题中含有特殊字符，请重新编辑                    {else}\n                    请补充封面图、标题或者正文                    {/if}\n                </div>\n                {else}\n                <div class="undone_tips">\n                    图文内容不完整                    <br />\n                    {if notCompletedType === \'title-emoji\'}\n                    标题中含有特殊字符，请重新编辑                    {else}\n                    请补充封面图、标题或者正文                    {/if}\n                </div>\n                {/if}\n            {else if isShareMul == true && isSupportShareMul == false}\n                <div class="undone_tips">\n                    暂不支持音视频素材                    <br />\n                    该功能暂不支持有除文章外的素材样式                </div>\n            {else if havePaidArticle == true && isSupportPaidSubscribe == false}\n                <div class="undone_tips">\n                    暂不支持付费图文素材                    <br />\n                    如需插入付费图文，请在“跳转网页”里选择已发送的付费图文                </div>\n            {/if}\n        </div>\n        {if isMul}\n            <div class="cover_appmsg_item">\n                {if first.share_page_type == 5}\n                  <!-- 视频 -->\n                  <div class="card_video_wrp">\n                    <div class="card_video">\n                      <div class="card_video_inner">\n                        <div class="weui-desktop-vm_primary card_video_hd">\n                          <strong class="card_video_title js_title">\n                          {if first.title&&first.cover}\n                              <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                              {=(first.renderTitle)}\n                              </a>\n                          {else}\n                              <span>\n                              {=(first.renderTitle)}\n                              </span>\n                          {/if}\n                          </strong>\n                        </div>\n                        <div class="weui-desktop-vm_default card_video_bd">\n                          <div class="card_video_thumb" style="background-image:url(\'{first.cover}\');">\n                            <span class="card_video_player_wrp">\n                              <i class="card_video_player"></i>\n                              <i class="card_video_length">{first.share_videoinfo[0].duration}</i>\n                            </span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                {else if first.share_page_type == 7}\n                  <!-- 音频  -->\n                  <div class="card_audio">\n                    <div class="card_audio_inner">\n                      <div class="weui-desktop-vm_primary card_audio_hd">\n                        <strong class="card_audio_title js_title">\n                        {if first.title&&first.cover}\n                            <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                            {=(first.renderTitle)}\n                            </a>\n                        {else}\n                            <span>\n                            {=(first.renderTitle)}\n                            </span>\n                        {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_audio_bd">\n                        <i class="card_audio_player"></i>\n                      </div>\n                    </div>\n                  </div>\n                {else if first.share_page_type == 8}\n                  <!-- 图片  -->\n                  <div class="card_img">\n                    <div class="card_img_inner">\n                      <div class="weui-desktop-vm_primary card_img_hd">\n                        <strong class="card_img_title js_title">\n                        {if first.title&&first.cover}\n                            <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                            {=(first.renderTitle)}\n                            </a>\n                        {else}\n                            <span>\n                            {=(first.renderTitle)}\n                            </span>\n                        {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_img_bd">\n                        <i class="card_img_thumb" style="background-image: url(\'{first.share_imageinfo[0].cdn_url}\');"></i>\n                      </div>\n                    </div>\n                  </div>\n                {else}\n                  <!-- 图文  -->\n                  <div class="card_appmsg">\n                    <div class="card_appmsg_inner">\n                      <div class="weui-desktop-vm_primary card_appmsg_hd">\n                        <strong class="card_appmsg_title js_title">\n                        {if first.title&&first.cover}\n                            <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                            {=(first.renderTitle)}\n                            </a>\n                        {else}\n                            <span>\n                            {=(first.renderTitle)}\n                            </span>\n                        {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_appmsg_bd">\n                        <div class="card_appmsg_thumb" style="background-image:url(\'{first.cover}\');"></div>\n                      </div>\n                    </div>\n                  </div>\n                {/if}\n                {if first.completed && !first.content_url && type == 10}\n                <a href="" class="edit_mask preview_mask js_preview" data-msgid="{id}" data-idx="{if first.seq}{first.seq}{else}0{/if}">\n                    <div class="edit_mask_content">\n                        <p class="">\n                        预览文章                        </p>\n                    </div>\n                    <span class="vm_box"></span>\n                </a>\n                {/if}\n            </div>\n            {each list as item k}\n            <div class="appmsg_item sub_card_media {if item.cover}has_cover{/if}">\n\n                {if item.share_page_type == 5}\n                  <!-- 视频  -->\n                  <div class="card_video_wrp">\n                    <div class="card_video">\n                      <div class="card_video_inner">\n                        <div class="weui-desktop-vm_primary card_video_hd">\n                          <strong class="card_video_title js_title">\n                            {if item.title&&item.cover}\n                                <a href="{item.content_url}" target="_blank" data-msgid="{id}" data-idx="{item.seq}">\n                                {=(item.renderTitle)}\n                                </a>\n                            {else}\n                                <span>\n                                {=(item.renderTitle)}\n                                </span>\n                            {/if}\n                          </strong>\n                        </div>\n                        <div class="weui-desktop-vm_default card_video_bd">\n                          <div class="card_video_thumb" style="background-image:url(\'{item.cover}\');">\n                            <span class="card_video_player_wrp">\n                              <i class="card_video_player"></i>\n                              {if item.share_videoinfo[0]}\n                              <i class="card_video_length">{item.share_videoinfo[0].duration}</i>\n                              {/if}\n                            </span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                {else if item.share_page_type == 7}\n                  <!-- 音频  -->\n                  <div class="card_audio">\n                    <div class="card_audio_inner">\n                      <div class="weui-desktop-vm_primary card_audio_hd">\n                        <strong class="card_audio_title js_title">\n                          {if item.title&&item.cover}\n                              <a href="{item.content_url}" target="_blank" data-msgid="{id}" data-idx="{item.seq}">\n                              {=(item.renderTitle)}\n                              </a>\n                          {else}\n                              <span>\n                              {=(item.renderTitle)}\n                              </span>\n                          {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_audio_bd">\n                        <i class="card_audio_player"></i>\n                      </div>\n                    </div>\n                  </div>\n                {else if item.share_page_type == 8}\n                  <!-- 图片  -->\n                  <div class="card_img">\n                    <div class="card_img_inner">\n                      <div class="weui-desktop-vm_primary card_img_hd">\n                        <strong class="card_img_title js_title">\n                          {if item.title&&item.cover}\n                              <a href="{item.content_url}" target="_blank" data-msgid="{id}" data-idx="{item.seq}">\n                              {=(item.renderTitle)}\n                              </a>\n                          {else}\n                              <span>\n                              {=(item.renderTitle)}\n                              </span>\n                          {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_img_bd">\n                        <i class="card_img_thumb" style="background-image: url(\'{item.share_imageinfo[0].cdn_url}\');"></i>\n                      </div>\n                    </div>\n                  </div>\n                {else}\n                  <!-- 图文  -->\n                  <div class="card_appmsg">\n                    <div class="card_appmsg_inner">\n                      <div class="weui-desktop-vm_primary card_appmsg_hd">\n                        <strong class="card_appmsg_title js_title">\n                          {if item.title&&item.cover}\n                              <a href="{item.content_url}" target="_blank" data-msgid="{id}" data-idx="{item.seq}">\n                              {=(item.renderTitle)}\n                              </a>\n                          {else}\n                              <span>\n                              {=(item.renderTitle)}\n                              </span>\n                          {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_appmsg_bd">\n                        <div class="card_appmsg_thumb" style="background-image:url(\'{item.cover}\');"></div>\n                      </div>\n                    </div>\n                  </div>\n                {/if}\n\n                {if item.completed && !item.content_url && type == 10}\n                <a href="" class="edit_mask preview_mask js_preview" data-msgid="{id}" data-idx="{if item.seq}{item.seq}{else}{k+1}{/if}">\n                    <div class="edit_mask_content">\n                        <p class="">\n                            预览文章                        </p>\n                    </div>\n                    <span class="vm_box"></span>\n                </a>\n                {/if}\n            </div>\n            {/each}\n        {else}\n            <div class="appmsg_item simple_card_media">\n                {if first.share_page_type == 5}\n                  <!-- 视频  -->\n                  <div class="card_video_wrp">\n                    <div class="card_video">\n                      <div class="card_video_inner">\n                        <div class="weui-desktop-vm_primary card_video_hd">\n                          <strong class="card_video_title js_title">\n                          {if first.title&&first.cover}\n                              <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                              {=(first.renderTitle)}\n                              </a>\n                          {else}\n                              <span>\n                              {=(first.renderTitle)}\n                              </span>\n                          {/if}\n                          </strong>\n                        </div>\n                        <div class="weui-desktop-vm_default card_video_bd">\n                          <div class="card_video_thumb" style="background-image:url(\'{first.cover}\');">\n                            <span class="card_video_player_wrp">\n                              <i class="card_video_player"></i>\n                              <i class="card_video_length">{first.share_videoinfo[0].duration}</i>\n                            </span>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                {else if first.share_page_type == 7}\n                  <!-- 音频  -->\n                  <div class="card_audio">\n                    <div class="card_audio_inner">\n                      <div class="weui-desktop-vm_primary card_audio_hd">\n                        <strong class="card_audio_title js_title">\n                        {if first.title&&first.cover}\n                            <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                            {=(first.renderTitle)}\n                            </a>\n                        {else}\n                            <span>\n                            {=(first.renderTitle)}\n                            </span>\n                        {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_audio_bd">\n                        <i class="card_audio_player"></i>\n                      </div>\n                    </div>\n                  </div>\n                {else if first.share_page_type == 8}\n                  <!-- 图片  -->\n                  <div class="card_img">\n                    <div class="card_img_inner">\n                      <div class="weui-desktop-vm_primary card_img_hd">\n                        <strong class="card_img_title js_title">\n                        {if first.title&&first.cover}\n                            <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                            {=(first.renderTitle)}\n                            </a>\n                        {else}\n                            <span>\n                            {=(first.renderTitle)}\n                            </span>\n                        {/if}\n                        </strong>\n                      </div>\n                      <div class="weui-desktop-vm_default card_img_bd">\n                        <i class="card_img_thumb" style="background-image: url(\'{first.share_imageinfo[0].cdn_url}\');"></i>\n                      </div>\n                    </div>\n                  </div>\n                {else}\n                  <!-- 图文  -->\n                  <div class="card_appmsg">\n                    <div class="card_appmsg_inner">\n                      <div class="weui-desktop-vm_primary card_appmsg_hd">\n                        <strong class="card_appmsg_title js_title">\n                        {if first.title&&first.cover}\n                            <a href="{first.content_url}" target="_blank" data-msgid="{id}" data-idx="{first.seq}">\n                            {=(first.renderTitle)}\n                            </a>\n                        {else}\n                            <span>\n                            {=(first.renderTitle)}\n                            </span>\n                        {/if}\n                        </strong>\n                      <div class="weui-desktop-vm_default card_appmsg_bd">\n                        <div class="card_appmsg_thumb" style="background-image:url(\'{first.cover}\');"></div>\n                      </div>\n                    </div>\n                  </div>\n                {/if}\n                {if completed && !first.content_url && type == 10}\n                <a href="" class="edit_mask preview_mask js_preview" data-msgid="{id}" data-idx="{first.seq}">\n                    <div class="edit_mask_content">\n                        <p class="">\n                            预览文章                        </p>\n                    </div>\n                    <span class="vm_box"></span>\n                </a>\n                {/if}\n            </div>\n        {/if}\n    </div>\n    {if completed===false && !showEdit}\n    {if cpsfail}\n    <div class="edit_mask appmsg_mask">\n        <p class="appmsg_mask_desc">文章内商品存在违规，请删除后操作</p>\n        <a class="btn btn_primary" target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token={token}&type={type}&appmsgid={id}&isMul=1">继续编辑</a>\n    </div>\n    {else if autoAdValid}\n    <div class="edit_mask appmsg_mask">\n      <div class="edit_mask_content">\n            <p>不满足插入广告的条件，无法选中，<a target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token={token}&type={type}&appmsgid={id}&isMul=1">继续编辑</a></p>\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    {else}\n    <div class="edit_mask appmsg_mask">\n        <div class="edit_mask_content">\n            <p>图文不完整，无法选中，<a target="_blank" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token={token}&type={type}&appmsgid={id}&isMul=1">继续编辑</a></p>\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    {/if}\n    {else if isShareMul == true && isSupportShareMul == false}\n    <div class="edit_mask appmsg_mask">\n        <div class="edit_mask_content">\n            <p>暂不支持音视频素材</p>\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    {else if havePaidArticle == true && isSupportPaidSubscribe == false}\n    <div class="edit_mask appmsg_mask">\n        <div class="edit_mask_content">\n          <p>暂不支持付费图文素材</p>\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    {/if}\n    {if showEdit}\n    <div class="appmsg_opr">\n        <ul>\n            <li class="appmsg_opr_item grid_item size1of2">\n            <a target="_blank" class="js_tooltip" href="/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token={token}&type={type}&appmsgid={id}&isMul=1" data-tooltip="编辑">&nbsp;<i class="icon18_common edit_gray">编辑</i></a>\n            </li>\n            <li class="appmsg_opr_item grid_item size1of2 no_extra">\n                <a class="js_del no_extra js_tooltip" data-id="{id}" href="javascript:void(0);" data-tooltip="删除">&nbsp;<i class="icon18_common del_gray">删除</i></a>\n            </li>\n        </ul>\n    </div>\n    {/if}\n    {if cpsloading}\n    <div class="edit_mask appmsg_mask">\n    <div>\n    <!--审核中 begin-->\n        <i class="icon46_loading light">加载中</i>\n    <!--审核中 end-->\n        <p class="appmsg_mask_desc">正在查询商品审核信息</p>\n    </div>\n    </div> \n    {else}\n    <!-- 付费图文不允许选择 @deantiwang -->\n    {if (havePaidArticle===false || isSupportPaidSubscribe===true) && ((showMask&&completed!==false && isShareMul == false) || (showMask&&completed!==false && isShareMul == true && isSupportShareMul == true))}\n    <div class="edit_mask appmsg_mask">\n        <i class="icon_card_selected">已选择</i>\n    </div>   \n    {/if}\n    {/if}\n\n</div>\n';
});define("media/appmsg_temp_url.js",["common/wx/Cgi.js","common/wx/Tips.js"],function(i){
"use strict";
var t=i("common/wx/Cgi.js"),e=i("common/wx/Tips.js");
return function(i,a,n){
n=n||"/cgi-bin/appmsg?action=get_temp_url",$(i).on("click",a,function(i){
var a=$(this),r=a.attr("href"),s=a.find("a").attr("href");
if(!(r&&0!=r.indexOf("javascript:")||s&&0!=s.indexOf("javascript:"))){
i.preventDefault();
var o=window.open();
t.get({
url:n,
data:{
appmsgid:$(this).data("msgid"),
itemidx:$(this).data("idx")+1
}
},function(i){
i.base_resp&&0==i.base_resp.ret?o&&o.location&&(o.location.href=i.temp_url):(o.close(),
e.err("生成临时链接失败，请重试"));
});
}
});
};
});define("tpl/media/videomsg.html.js",[],function(){
return'<div id="wxVideoBox{id}" class="richvideo Js_videomsg">\n    <div class="richvideo_content" style="z-index: 0">\n        <h4 class="title">{title}</h4>\n        <div class="video_info">\n            <em class="time">{time}</em>\n            <!--#0001#-->\n            <em class="res">{from}</em>\n            <!--%0001%-->\n        </div>\n        <div class="video_wrp Js_videoContent">\n            <div id="wxVideoPlayer{id}" class="wxVideoPlayContent video_player">\n                <video id="wxVideo{id}" class="video-js vjs-default-skin"  \n                    preload="auto" controls="controls" data-src="{video_url}"></video>\n            </div>\n            {if for_network}\n            <div class="wxNetworkVideo video_shot" data-contenturl="{content_url}">\n            {else}\n            <div class="{if !for_transfer}wxVideoScreenshot {/if}video_shot">\n            {/if}\n                <!--#0002#-->\n                {if img_url}\n                    <img src="{img_url}"/>\n                {else}\n                    <img src="/cgi-bin/getimgdata?token={token}&msgid={app_id}&mode=large&source=file&fileId={file_id}"/>\n                {/if}\n                <!--%0002%-->\n                <!-- <i class="icon_video"></i> -->\n                <!-- <span class="video_duration"><em>{play_length}"</em></span> -->\n                {if for_transfer}\n                <div class="loading_tips" {if hide_transfer}style="display:none"{/if}>\n                    <i class="icon32_loading dark"></i>\n                    <p>转码中</p>\n                </div>\n                {/if}\n            </div>\n        </div>\n        <div class="video_desc" data-digest="{digest}">{digest}</div>\n    </div>\n    {if for_operation}\n    <div class="richvideo_opr">\n        <ul class="grid_line">\n            {if for_network}\n            <li class="richvideo_opr_item grid_item size1of2">\n                <a class="js_edit js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n                <a class="js_del js_tooltip" data-id="{id}" href="javascript:void(0);" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else}\n            <li class="richvideo_opr_item grid_item size1of3">\n                <a class="js_edit js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3">\n                <a {if for_transfer}href="javascript:;" class="js_tooltip js_download"{else}href="{video_download_url}" class="js_tooltip"{/if} data-tooltip="下载">\n                    <i class="icon18_common download_gray">下载</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3 no_extra">\n                <a class="js_del js_tooltip" data-id="{app_id}" href="javascript:void(0);" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {/if}\n        </ul>\n    </div>\n    {/if}\n    {if for_selection}\n    <div class="richvideo_mask"></div>\n    <i class="icon_card_selected">已选择</i>\n    <div class="richvideo_tips">\n        <i class="icon_richvideo_error"></i>\n        <p>该素材没有标题，<a href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}">马上编辑</a></p>\n    </div>\n    {/if}\n    {if for_notitle}\n    <div class="richvideo_mask"></div>\n    <div class="richvideo_tips">\n        <i class="icon_richvideo_error"></i>\n        <p>该素材没有标题，<a href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}">马上编辑</a></p>\n    </div>\n    {/if}\n</div>';
});define("tpl/media/wxvideo.html.js",[],function(){
return'<div id="wxVideoBox{id}" class="richvideo smallvideo with_msg_box Js_videomsg">\n	<div class="richvideo_content" style="z-index: 0">\n		<h4 class="title">{name}</h4>\n        <div class="video_wrp Js_videoContent">\n            <div id="wxVideoPlayer{id}" class="wxVideoPlayContent video_player">\n                <video id="wxVideo{id}" class="video-js vjs-default-skin"  \n                    preload="auto" controls="controls" data-src="{video_url}"></video>\n            </div>\n			<div class="wxVideoScreenshot video_shot">\n                {if video_thumb_cdn_url}\n                <img src="{video_thumb_cdn_url}">\n                {else}\n                <!--#00001#-->\n				<img src="/cgi-bin/getimgdata?token={token}&msgid={id}&mode=small&source=file&fileId={file_id}">\n                <!--%00001%-->\n                {/if}\n				<div class="video_mask">\n					<span class="ic_play"></span>\n				</div>\n			</div>\n        </div>\n	</div>\n    {if for_operation}\n    <div class="richvideo_opr">\n        <ul class="grid_line">\n            <li class="richvideo_opr_item grid_item size1of2">\n                <a class="js_popedit js_tooltip" data-id="{id}" data-name="{name}" href="javascript:void(0);" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n                <a class="js_del js_tooltip" data-id="{id}" data-type="sv" href="javascript:void(0);" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n        </ul>\n    </div>\n    {/if}\n    {if for_selection}\n    <div class="richvideo_mask"></div>\n    <i class="icon_card_selected">已选择</i>\n    {/if}\n</div>\n<div class="richvideo_msg_box">\n    <p class="mini_tips warn" style="display: none;">该视频由于版权问题无法在微信中播放</p>\n</div>';
});define("tpl/media/simple_videomsg.html.js",[],function(){
return'<!--群发功能-已发送页面视频模版-->\n<div class="appmsgSendedItem simple_videomsg" data-id="{id}" data-src="{video_url}">\n    {if for_network}\n    <a href="{content_url}" class="title_wrp" data-contenturl="{content_url}" target="_blank">\n    {else}\n    <a href="javascript:;" class="title_wrp js_video">\n    {/if}\n        <!-- <img class="icon icon_lh" src="/cgi-bin/getimgdata?token={token}&msgid={app_id}&mode=large&source=file&fileId={file_id}"/> -->\n        <span class="icon icon_lh cover" style="background-image:url("/cgi-bin/getimgdata?token={token}&msgid={app_id}&mode=large&source=file&fileId={file_id}");"></span>\n        <span class="title">[视频]{title}</span>\n    </a>\n    <p class="desc">{if for_transfer}{if !hide_transfer}转码中{/if}{/if} {digest}</p>\n</div>\n';
});define("tpl/media/video.html.js",[],function(){
return'<div id="wxVideoBox{id}" class="mediaBox videoBox{if type == 62} smallvideo_box{/if}">\n	<div class="mediaContent">\n		<div class="wxVideoPlayContent">\n            <div class="wxVideoBoxAction{id}">\n                <a id="wxVideoBoxFold{id}" class="video_switch"><i class="icon14_common switch_gray"></i>收起</a>\n			</div>\n            <div id="wxVideoPlayer{id}" class="wxVideoPlayer">\n                <video id="wxVideo{id}" class="video-js vjs-default-skin" width="260" height="195" preload="auto"  loop controls="controls" data-src="{src}" poster="/cgi-bin/getimgdata?token={token}&msgid={id}&mode=small&source={source}&fileId={file_id}"></video>\n            </div>\n            <div class="wxVideoNoSupport" style="display: none">\n                当前浏览器暂不支持播放视频，建议更换至Chrome浏览器            </div>\n		</div>\n        <div class="wxVideoScreenshot" data-vid="{id}" data-fid="{fileid}" data-source="{source}">\n            {if video_thumb_url}\n            <img class="wxImg" src="{video_thumb_url}">\n            {else}\n            <img class="wxImg" src="/cgi-bin/getimgdata?token={token}&msgid={id}&mode=small&source={source}&fileId={file_id}" alt="" title=\'点击播放视频\' />\n            {/if}\n			<span class="iconVideo" title=\'点击播放视频\'></span>\n            <div class="videoDuration"><em>{play_length}"</em></div>\n		</div>\n    </div>\n</div>\n';
});define("biz_web/lib/swfobject.js",[],function(){
var e=function(){
function t(){
if(!G){
try{
var e=V.getElementsByTagName("body")[0].appendChild(m("span"));
e.parentNode.removeChild(e);
}catch(t){
return;
}
G=!0;
for(var n=D.length,a=0;n>a;a++)D[a]();
}
}
function n(e){
G?e():D[D.length]=e;
}
function a(e){
if(typeof M.addEventListener!=k)M.addEventListener("load",e,!1);else if(typeof V.addEventListener!=k)V.addEventListener("load",e,!1);else if(typeof M.attachEvent!=k)g(M,"onload",e);else if("function"==typeof M.onload){
var t=M.onload;
M.onload=function(){
t(),e();
};
}else M.onload=e;
}
function i(){
R?r():o();
}
function r(){
var e=V.getElementsByTagName("body")[0],t=m(B);
t.setAttribute("type",F);
var n=e.appendChild(t);
if(n){
var a=0;
!function(){
if(typeof n.GetVariable!=k){
var i=n.GetVariable("$version");
i&&(i=i.split(" ")[1].split(","),X.pv=[parseInt(i[0],10),parseInt(i[1],10),parseInt(i[2],10)]);
}else if(10>a)return a++,void setTimeout(arguments.callee,10);
e.removeChild(t),n=null,o();
}();
}else o();
}
function o(){
var e=W.length;
if(e>0)for(var t=0;e>t;t++){
var n=W[t].id,a=W[t].callbackFn,i={
success:!1,
id:n
};
if(X.pv[0]>0){
var r=h(n);
if(r)if(!w(W[t].swfVersion)||X.wk&&X.wk<312)if(W[t].expressInstall&&s()){
var o={};
o.data=W[t].expressInstall,o.width=r.getAttribute("width")||"0",o.height=r.getAttribute("height")||"0",
r.getAttribute("class")&&(o.styleclass=r.getAttribute("class")),r.getAttribute("align")&&(o.align=r.getAttribute("align"));
for(var f={},u=r.getElementsByTagName("param"),p=u.length,v=0;p>v;v++)"movie"!=u[v].getAttribute("name").toLowerCase()&&(f[u[v].getAttribute("name")]=u[v].getAttribute("value"));
c(o,f,n,a);
}else d(r),a&&a(i);else C(n,!0),a&&(i.success=!0,i.ref=l(n),a(i));
}else if(C(n,!0),a){
var y=l(n);
y&&typeof y.SetVariable!=k&&(i.success=!0,i.ref=y),a(i);
}
}
}
function l(e){
var t=null,n=h(e);
if(n&&"OBJECT"==n.nodeName)if(typeof n.SetVariable!=k)t=n;else{
var a=n.getElementsByTagName(B)[0];
a&&(t=a);
}
return t;
}
function s(){
return!J&&w("6.0.65")&&(X.win||X.mac)&&!(X.wk&&X.wk<312);
}
function c(e,t,n,a){
J=!0,N=a||null,T={
success:!1,
id:n
};
var i=h(n);
if(i){
"OBJECT"==i.nodeName?(S=f(i),A=null):(S=i,A=n),e.id=$,(typeof e.width==k||!/%$/.test(e.width)&&parseInt(e.width,10)<310)&&(e.width="310"),
(typeof e.height==k||!/%$/.test(e.height)&&parseInt(e.height,10)<137)&&(e.height="137"),
V.title=V.title.slice(0,47)+" - Flash Player Installation";
var r=X.ie&&X.win?"ActiveX":"PlugIn",o="MMredirectURL="+M.location.toString().replace(/&/g,"%26")+"&MMplayerType="+r+"&MMdoctitle="+V.title;
if(typeof t.flashvars!=k?t.flashvars+="&"+o:t.flashvars=o,X.ie&&X.win&&4!=i.readyState){
var l=m("div");
n+="SWFObjectNew",l.setAttribute("id",n),i.parentNode.insertBefore(l,i),i.style.display="none",
function(){
4==i.readyState?i.parentNode.removeChild(i):setTimeout(arguments.callee,10);
}();
}
u(e,t,n);
}
}
function d(e){
if(X.ie&&X.win&&4!=e.readyState){
var t=m("div");
e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(f(e),t),e.style.display="none",
function(){
4==e.readyState?e.parentNode.removeChild(e):setTimeout(arguments.callee,10);
}();
}else e.parentNode.replaceChild(f(e),e);
}
function f(e){
var t=m("div");
if(X.win&&X.ie)t.innerHTML=e.innerHTML;else{
var n=e.getElementsByTagName(B)[0];
if(n){
var a=n.childNodes;
if(a)for(var i=a.length,r=0;i>r;r++)1==a[r].nodeType&&"PARAM"==a[r].nodeName||8==a[r].nodeType||t.appendChild(a[r].cloneNode(!0));
}
}
return t;
}
function u(e,t,n){
var a,i=h(n);
if(X.wk&&X.wk<312)return a;
if(i)if(typeof e.id==k&&(e.id=n),X.ie&&X.win){
var r="";
for(var o in e)e[o]!=Object.prototype[o]&&("data"==o.toLowerCase()?t.movie=e[o]:"styleclass"==o.toLowerCase()?r+=' class="'+e[o]+'"':"classid"!=o.toLowerCase()&&(r+=" "+o+'="'+e[o]+'"'));
var l="";
for(var s in t)t[s]!=Object.prototype[s]&&(l+='<param name="'+s+'" value="'+t[s]+'" />');
i.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+r+">"+l+"</object>",
H[H.length]=e.id,a=h(e.id);
}else{
var c=m(B);
c.setAttribute("type",F);
for(var d in e)e[d]!=Object.prototype[d]&&("styleclass"==d.toLowerCase()?c.setAttribute("class",e[d]):"classid"!=d.toLowerCase()&&c.setAttribute(d,e[d]));
for(var f in t)t[f]!=Object.prototype[f]&&"movie"!=f.toLowerCase()&&p(c,f,t[f]);
i.parentNode.replaceChild(c,i),a=c;
}
return a;
}
function p(e,t,n){
var a=m("param");
a.setAttribute("name",t),a.setAttribute("value",n),e.appendChild(a);
}
function v(e){
var t=h(e);
t&&"OBJECT"==t.nodeName&&(X.ie&&X.win?(t.style.display="none",function(){
4==t.readyState?y(e):setTimeout(arguments.callee,10);
}()):t.parentNode.removeChild(t));
}
function y(e){
var t=h(e);
if(t){
for(var n in t)"function"==typeof t[n]&&(t[n]=null);
t.parentNode.removeChild(t);
}
}
function h(e){
var t=null;
try{
t=V.getElementById(e);
}catch(n){}
return t;
}
function m(e){
return V.createElement(e);
}
function g(e,t,n){
e.attachEvent(t,n),z[z.length]=[e,t,n];
}
function w(e){
var t=X.pv,n=e.split(".");
return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,
t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1;
}
function b(e,t,n,a){
if(!X.ie||!X.mac){
var i=V.getElementsByTagName("head")[0];
if(i){
var r=n&&"string"==typeof n?n:"screen";
if(a&&(I=null,L=null),!I||L!=r){
var o=m("style");
o.setAttribute("type","text/css"),o.setAttribute("media",r),I=i.appendChild(o),X.ie&&X.win&&typeof V.styleSheets!=k&&V.styleSheets.length>0&&(I=V.styleSheets[V.styleSheets.length-1]),
L=r;
}
X.ie&&X.win?I&&typeof I.addRule==B&&I.addRule(e,t):I&&typeof V.createTextNode!=k&&I.appendChild(V.createTextNode(e+" {"+t+"}"));
}
}
}
function C(e,t){
if(U){
var n=t?"visible":"hidden";
G&&h(e)?h(e).style.visibility=n:b("#"+e,"visibility:"+n);
}
}
function E(e){
var t=/[\\\"<>\.;]/,n=null!=t.exec(e);
return n&&typeof encodeURIComponent!=k?encodeURIComponent(e):e;
}
{
var S,A,N,T,I,L,k="undefined",B="object",O="Shockwave Flash",j="ShockwaveFlash.ShockwaveFlash",F="application/x-shockwave-flash",$="SWFObjectExprInst",x="onreadystatechange",M=window,V=document,P=navigator,R=!1,D=[i],W=[],H=[],z=[],G=!1,J=!1,U=!0,X=function(){
var e=typeof V.getElementById!=k&&typeof V.getElementsByTagName!=k&&typeof V.createElement!=k,t=P.userAgent.toLowerCase(),n=P.platform.toLowerCase(),a=/win/.test(n?n:t),i=/mac/.test(n?n:t),r=/webkit/.test(t)?parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,o=!1,l=[0,0,0],s=null;
if(typeof P.plugins!=k&&typeof P.plugins[O]==B)s=P.plugins[O].description,!s||typeof P.mimeTypes!=k&&P.mimeTypes[F]&&!P.mimeTypes[F].enabledPlugin||(R=!0,
o=!1,s=s.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),l[0]=parseInt(s.replace(/^(.*)\..*$/,"$1"),10),
l[1]=parseInt(s.replace(/^.*\.(.*)\s.*$/,"$1"),10),l[2]=/[a-zA-Z]/.test(s)?parseInt(s.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof M.ActiveXObject!=k)try{
var c=new ActiveXObject(j);
c&&(s=c.GetVariable("$version"),s&&(o=!0,s=s.split(" ")[1].split(","),l=[parseInt(s[0],10),parseInt(s[1],10),parseInt(s[2],10)]));
}catch(d){}
return{
w3:e,
pv:l,
wk:r,
ie:o,
win:a,
mac:i
};
}();
!function(){
X.w3&&((typeof V.readyState!=k&&"complete"==V.readyState||typeof V.readyState==k&&(V.getElementsByTagName("body")[0]||V.body))&&t(),
G||(typeof V.addEventListener!=k&&V.addEventListener("DOMContentLoaded",t,!1),X.ie&&X.win&&(V.attachEvent(x,function(){
"complete"==V.readyState&&(V.detachEvent(x,arguments.callee),t());
}),M==top&&!function(){
if(!G){
try{
V.documentElement.doScroll("left");
}catch(e){
return void setTimeout(arguments.callee,0);
}
t();
}
}()),X.wk&&!function(){
return G?void 0:/loaded|complete/.test(V.readyState)?void t():void setTimeout(arguments.callee,0);
}(),a(t)));
}(),function(){
X.ie&&X.win&&window.attachEvent("onunload",function(){
for(var t=z.length,n=0;t>n;n++)z[n][0].detachEvent(z[n][1],z[n][2]);
for(var a=H.length,i=0;a>i;i++)v(H[i]);
for(var r in X)X[r]=null;
X=null;
for(var o in e)e[o]=null;
e=null;
});
}();
}
return{
registerObject:function(e,t,n,a){
if(X.w3&&e&&t){
var i={};
i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=a,W[W.length]=i,C(e,!1);
}else a&&a({
success:!1,
id:e
});
},
getObjectById:function(e){
return X.w3?l(e):void 0;
},
embedSWF:function(e,t,a,i,r,o,l,d,f,p){
var v={
success:!1,
id:t
};
X.w3&&!(X.wk&&X.wk<312)&&e&&t&&a&&i&&r?(C(t,!1),n(function(){
a+="",i+="";
var n={};
if(f&&typeof f===B)for(var y in f)n[y]=f[y];
n.data=e,n.width=a,n.height=i;
var h={};
if(d&&typeof d===B)for(var m in d)h[m]=d[m];
if(l&&typeof l===B)for(var g in l)typeof h.flashvars!=k?h.flashvars+="&"+g+"="+l[g]:h.flashvars=g+"="+l[g];
if(w(r)){
var b=u(n,h,t);
n.id==t&&C(t,!0),v.success=!0,v.ref=b;
}else{
if(o&&s())return n.data=o,void c(n,h,t,p);
C(t,!0);
}
p&&p(v);
})):p&&p(v);
},
switchOffAutoHideShow:function(){
U=!1;
},
ua:X,
getFlashPlayerVersion:function(){
return{
major:X.pv[0],
minor:X.pv[1],
release:X.pv[2]
};
},
hasFlashPlayerVersion:w,
createSWF:function(e,t,n){
return X.w3?u(e,t,n):void 0;
},
showExpressInstall:function(e,t,n,a){
X.w3&&s()&&c(e,t,n,a);
},
removeSWF:function(e){
X.w3&&v(e);
},
createCSS:function(e,t,n,a){
X.w3&&b(e,t,n,a);
},
addDomLoadEvent:n,
addLoadEvent:a,
getQueryParamValue:function(e){
var t=V.location.search||V.location.hash;
if(t){
if(/\?/.test(t)&&(t=t.split("?")[1]),null==e)return E(t);
for(var n=t.split("&"),a=0;a<n.length;a++)if(n[a].substring(0,n[a].indexOf("="))==e)return E(n[a].substring(n[a].indexOf("=")+1));
}
return"";
},
expressInstallCallback:function(){
if(J){
var e=h($);
e&&S&&(e.parentNode.replaceChild(S,e),A&&(C(A,!0),X.ie&&X.win&&(S.style.display="block")),
N&&N(T)),J=!1;
}
}
};
}();
return e;
});define("biz_web/lib/video.js",[],function(require,exports,module){
function createMethod(t){
return function(){
throw new Error('The "'+t+"\" method is not available on the playback technology's API");
};
}
document.createElement("video"),document.createElement("audio"),document.createElement("track");
var vjs=function(t,e,s){
var n;
if("string"==typeof t){
if(0===t.indexOf("#")&&(t=t.slice(1)),vjs.players[t])return vjs.players[t];
n=vjs.el(t);
}else n=t;
if(!n||!n.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");
return n.player||new vjs.Player(n,e,s);
},videojs=vjs;
window.videojs=window.vjs=vjs,vjs.CDN_VERSION="4.1",vjs.ACCESS_PROTOCOL="https:"==document.location.protocol?"https://":"http://",
vjs.options={
techOrder:["html5","flash"],
html5:{},
flash:{},
width:300,
height:150,
defaultVolume:0,
children:{
mediaLoader:{},
posterImage:{},
textTrackDisplay:{},
loadingSpinner:{},
bigPlayButton:{},
controlBar:{}
}
},"GENERATED_CDN_VSN"!==vjs.CDN_VERSION&&(videojs.options.flash.swf=vjs.ACCESS_PROTOCOL+"vjs.zencdn.net/"+vjs.CDN_VERSION+"/video-js.swf"),
vjs.players={},vjs.CoreObject=vjs.CoreObject=function(){},vjs.CoreObject.extend=function(t){
var e,s;
t=t||{},e=t.init||t.init||this.prototype.init||this.prototype.init||function(){},
s=function(){
e.apply(this,arguments);
},s.prototype=vjs.obj.create(this.prototype),s.prototype.constructor=s,s.extend=vjs.CoreObject.extend,
s.create=vjs.CoreObject.create;
for(var n in t)t.hasOwnProperty(n)&&(s.prototype[n]=t[n]);
return s;
},vjs.CoreObject.create=function(){
var t=vjs.obj.create(this.prototype);
return this.apply(t,arguments),t;
},vjs.on=function(t,e,s){
var n=vjs.getData(t);
n.handlers||(n.handlers={}),n.handlers[e]||(n.handlers[e]=[]),s.guid||(s.guid=vjs.guid++),
n.handlers[e].push(s),n.dispatcher||(n.disabled=!1,n.dispatcher=function(e){
if(!n.disabled){
e=vjs.fixEvent(e);
var s=n.handlers[e.type];
if(s)for(var o=s.slice(0),i=0,r=o.length;r>i&&!e.isImmediatePropagationStopped();i++)o[i].call(t,e);
}
}),1==n.handlers[e].length&&(document.addEventListener?t.addEventListener(e,n.dispatcher,!1):document.attachEvent&&t.attachEvent("on"+e,n.dispatcher));
},vjs.off=function(t,e,s){
if(vjs.hasData(t)){
var n=vjs.getData(t);
if(n.handlers){
var o=function(e){
n.handlers[e]=[],vjs.cleanUpEvents(t,e);
};
if(e){
var i=n.handlers[e];
if(i){
if(!s)return void o(e);
if(s.guid)for(var r=0;r<i.length;r++)i[r].guid===s.guid&&i.splice(r--,1);
vjs.cleanUpEvents(t,e);
}
}else for(var a in n.handlers)o(a);
}
}
},vjs.cleanUpEvents=function(t,e){
var s=vjs.getData(t);
0===s.handlers[e].length&&(delete s.handlers[e],document.removeEventListener?t.removeEventListener(e,s.dispatcher,!1):document.detachEvent&&t.detachEvent("on"+e,s.dispatcher)),
vjs.isEmpty(s.handlers)&&(delete s.handlers,delete s.dispatcher,delete s.disabled),
vjs.isEmpty(s)&&vjs.removeData(t);
},vjs.fixEvent=function(t){
function e(){
return!0;
}
function s(){
return!1;
}
if(!t||!t.isPropagationStopped){
var n=t||window.event;
t={};
for(var o in n)"layerX"!==o&&"layerY"!==o&&(t[o]=n[o]);
if(t.target||(t.target=t.srcElement||document),t.relatedTarget=t.fromElement===t.target?t.toElement:t.fromElement,
t.preventDefault=function(){
n.preventDefault&&n.preventDefault(),t.returnValue=!1,t.isDefaultPrevented=e;
},t.isDefaultPrevented=s,t.stopPropagation=function(){
n.stopPropagation&&n.stopPropagation(),t.cancelBubble=!0,t.isPropagationStopped=e;
},t.isPropagationStopped=s,t.stopImmediatePropagation=function(){
n.stopImmediatePropagation&&n.stopImmediatePropagation(),t.isImmediatePropagationStopped=e,
t.stopPropagation();
},t.isImmediatePropagationStopped=s,null!=t.clientX){
var i=document.documentElement,r=document.body;
t.pageX=t.clientX+(i&&i.scrollLeft||r&&r.scrollLeft||0)-(i&&i.clientLeft||r&&r.clientLeft||0),
t.pageY=t.clientY+(i&&i.scrollTop||r&&r.scrollTop||0)-(i&&i.clientTop||r&&r.clientTop||0);
}
t.which=t.charCode||t.keyCode,null!=t.button&&(t.button=1&t.button?0:4&t.button?1:2&t.button?2:0);
}
return t;
},vjs.trigger=function(t,e){
var s=vjs.hasData(t)?vjs.getData(t):{},n=t.parentNode||t.ownerDocument;
if("string"==typeof e&&(e={
type:e,
target:t
}),e=vjs.fixEvent(e),s.dispatcher&&s.dispatcher.call(t,e),n&&!e.isPropagationStopped())vjs.trigger(n,e);else if(!n&&!e.isDefaultPrevented()){
var o=vjs.getData(e.target);
e.target[e.type]&&(o.disabled=!0,"function"==typeof e.target[e.type]&&e.target[e.type](),
o.disabled=!1);
}
return!e.isDefaultPrevented();
},vjs.one=function(t,e,s){
vjs.on(t,e,function(){
vjs.off(t,e,arguments.callee),s.apply(this,arguments);
});
};
var hasOwnProp=Object.prototype.hasOwnProperty;
vjs.createEl=function(t,e){
var s=document.createElement(t||"div");
for(var n in e)hasOwnProp.call(e,n)&&(-1!==n.indexOf("aria-")||"role"==n?s.setAttribute(n,e[n]):s[n]=e[n]);
return s;
},vjs.capitalize=function(t){
return t.charAt(0).toUpperCase()+t.slice(1);
},vjs.obj={},vjs.obj.create=Object.create||function(t){
function e(){}
return e.prototype=t,new e;
},vjs.obj.each=function(t,e,s){
for(var n in t)hasOwnProp.call(t,n)&&e.call(s||this,n,t[n]);
},vjs.obj.merge=function(t,e){
if(!e)return t;
for(var s in e)hasOwnProp.call(e,s)&&(t[s]=e[s]);
return t;
},vjs.obj.deepMerge=function(t,e){
var s,n,o,i;
i="[object Object]",t=vjs.obj.copy(t);
for(s in e)hasOwnProp.call(e,s)&&(n=t[s],o=e[s],t[s]=vjs.obj.isPlain(n)&&vjs.obj.isPlain(o)?vjs.obj.deepMerge(n,o):e[s]);
return t;
},vjs.obj.copy=function(t){
return vjs.obj.merge({},t);
},vjs.obj.isPlain=function(t){
return!!t&&"object"==typeof t&&"[object Object]"===t.toString()&&t.constructor===Object;
},vjs.bind=function(t,e,s){
e.guid||(e.guid=vjs.guid++);
var n=function(){
return e.apply(t,arguments);
};
return n.guid=s?s+"_"+e.guid:e.guid,n;
},vjs.cache={},vjs.guid=1,vjs.expando="vdata"+(new Date).getTime(),vjs.getData=function(t){
var e=t[vjs.expando];
return e||(e=t[vjs.expando]=vjs.guid++,vjs.cache[e]={}),vjs.cache[e];
},vjs.hasData=function(t){
var e=t[vjs.expando];
return!(!e||vjs.isEmpty(vjs.cache[e]));
},vjs.removeData=function(t){
var e=t[vjs.expando];
if(e){
delete vjs.cache[e];
try{
delete t[vjs.expando];
}catch(s){
t.removeAttribute?t.removeAttribute(vjs.expando):t[vjs.expando]=null;
}
}
},vjs.isEmpty=function(t){
for(var e in t)if(null!==t[e])return!1;
return!0;
},vjs.addClass=function(t,e){
-1==(" "+t.className+" ").indexOf(" "+e+" ")&&(t.className=""===t.className?e:t.className+" "+e);
},vjs.removeClass=function(t,e){
if(-1!=t.className.indexOf(e)){
for(var s=t.className.split(" "),n=s.length-1;n>=0;n--)s[n]===e&&s.splice(n,1);
t.className=s.join(" ");
}
},vjs.TEST_VID=vjs.createEl("video"),vjs.USER_AGENT=navigator.userAgent,vjs.IS_IPHONE=/iPhone/i.test(vjs.USER_AGENT),
vjs.IS_IPAD=/iPad/i.test(vjs.USER_AGENT),vjs.IS_IPOD=/iPod/i.test(vjs.USER_AGENT),
vjs.IS_IOS=vjs.IS_IPHONE||vjs.IS_IPAD||vjs.IS_IPOD,vjs.IOS_VERSION=function(){
var t=vjs.USER_AGENT.match(/OS (\d+)_/i);
return t&&t[1]?t[1]:void 0;
}(),vjs.IS_ANDROID=/Android/i.test(vjs.USER_AGENT),vjs.ANDROID_VERSION=function(){
var t,e,s=vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
return s?(t=s[1]&&parseFloat(s[1]),e=s[2]&&parseFloat(s[2]),t&&e?parseFloat(s[1]+"."+s[2]):t?t:null):null;
}(),vjs.IS_OLD_ANDROID=vjs.IS_ANDROID&&/webkit/i.test(vjs.USER_AGENT)&&vjs.ANDROID_VERSION<2.3,
vjs.IS_FIREFOX=/Firefox/i.test(vjs.USER_AGENT),vjs.IS_CHROME=/Chrome/i.test(vjs.USER_AGENT),
vjs.getAttributeValues=function(t){
var e={},s=",autoplay,controls,loop,muted,default,";
if(t&&t.attributes&&t.attributes.length>0)for(var n,o,i=t.attributes,r=i.length-1;r>=0;r--)n=i[r].name,
o=i[r].value,("boolean"==typeof t[n]||-1!==s.indexOf(","+n+","))&&(o=null!==o?!0:!1),
e[n]=o;
return e;
},vjs.getComputedDimension=function(t,e){
var s="";
return document.defaultView&&document.defaultView.getComputedStyle?s=document.defaultView.getComputedStyle(t,"").getPropertyValue(e):t.currentStyle&&(s=t["client"+e.substr(0,1).toUpperCase()+e.substr(1)]+"px"),
s;
},vjs.insertFirst=function(t,e){
e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t);
},vjs.support={},vjs.el=function(t){
return 0===t.indexOf("#")&&(t=t.slice(1)),document.getElementById(t);
},vjs.formatTime=function(t,e){
e=e||t;
var s=Math.floor(t%60),n=Math.floor(t/60%60),o=Math.floor(t/3600),i=Math.floor(e/60%60),r=Math.floor(e/3600);
return o=o>0||r>0?o+":":"",n=((o||i>=10)&&10>n?"0"+n:n)+":",s=10>s?"0"+s:s,o+n+s;
},vjs.blockTextSelection=function(){
document.body.focus(),document.onselectstart=function(){
return!1;
};
},vjs.unblockTextSelection=function(){
document.onselectstart=function(){
return!0;
};
},vjs.trim=function(t){
return t.toString().replace(/^\s+/,"").replace(/\s+$/,"");
},vjs.round=function(t,e){
return e||(e=0),Math.round(t*Math.pow(10,e))/Math.pow(10,e);
},vjs.createTimeRange=function(t,e){
return{
length:1,
start:function(){
return t;
},
end:function(){
return e;
}
};
},vjs.get=function(t,e,s){
var n=0===t.indexOf("file:")||0===window.location.href.indexOf("file:")&&-1===t.indexOf("http");
"undefined"==typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){
try{
return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
}catch(t){}
try{
return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
}catch(e){}
try{
return new window.ActiveXObject("Msxml2.XMLHTTP");
}catch(s){}
throw new Error("This browser does not support XMLHttpRequest.");
});
var o=new XMLHttpRequest;
try{
o.open("GET",t);
}catch(i){
s(i);
}
o.onreadystatechange=function(){
4===o.readyState&&(200===o.status||n&&0===o.status?e(o.responseText):s&&s());
};
try{
o.send();
}catch(i){
s&&s(i);
}
},vjs.setLocalStorage=function(t,e){
try{
var s=window.localStorage||!1;
if(!s)return;
s[t]=e;
}catch(n){
22==n.code||1014==n.code?vjs.log("LocalStorage Full (VideoJS)",n):18==n.code?vjs.log("LocalStorage not allowed (VideoJS)",n):vjs.log("LocalStorage Error (VideoJS)",n);
}
},vjs.getAbsoluteURL=function(t){
return t.match(/^https?:\/\//)||(t=vjs.createEl("div",{
innerHTML:'<a href="'+t+'">x</a>'
}).firstChild.href),t;
},vjs.log=function(){
vjs.log.history=vjs.log.history||[],vjs.log.history.push(arguments),window.console&&window.console.log(Array.prototype.slice.call(arguments));
},vjs.findPosition=function(t){
var e,s,n,o,i,r,a,l,c;
return t.getBoundingClientRect&&t.parentNode&&(e=t.getBoundingClientRect()),e?(s=document.documentElement,
n=document.body,o=s.clientLeft||n.clientLeft||0,i=window.pageXOffset||n.scrollLeft,
r=e.left+i-o,a=s.clientTop||n.clientTop||0,l=window.pageYOffset||n.scrollTop,c=e.top+l-a,
{
left:r,
top:c
}):{
left:0,
top:0
};
},vjs.Component=vjs.CoreObject.extend({
init:function(t,e,s){
this.player_=t,this.options_=vjs.obj.copy(this.options_),e=this.options(e),this.id_=e.id||(e.el&&e.el.id?e.el.id:t.id()+"_component_"+vjs.guid++),
this.name_=e.name||null,this.el_=e.el||this.createEl(),this.children_=[],this.childIndex_={},
this.childNameIndex_={},this.initChildren(),this.ready(s);
}
}),vjs.Component.prototype.dispose=function(){
if(this.children_)for(var t=this.children_.length-1;t>=0;t--)this.children_[t].dispose&&this.children_[t].dispose();
this.children_=null,this.childIndex_=null,this.childNameIndex_=null,this.off(),this.el_.parentNode&&this.el_.parentNode.removeChild(this.el_),
vjs.removeData(this.el_),this.el_=null;
},vjs.Component.prototype.player_,vjs.Component.prototype.player=function(){
return this.player_;
},vjs.Component.prototype.options_,vjs.Component.prototype.options=function(t){
return void 0===t?this.options_:this.options_=vjs.obj.deepMerge(this.options_,t);
},vjs.Component.prototype.el_,vjs.Component.prototype.createEl=function(t,e){
return vjs.createEl(t,e);
},vjs.Component.prototype.el=function(){
return this.el_;
},vjs.Component.prototype.contentEl_,vjs.Component.prototype.contentEl=function(){
return this.contentEl_||this.el_;
},vjs.Component.prototype.id_,vjs.Component.prototype.id=function(){
return this.id_;
},vjs.Component.prototype.name_,vjs.Component.prototype.name=function(){
return this.name_;
},vjs.Component.prototype.children_,vjs.Component.prototype.children=function(){
return this.children_;
},vjs.Component.prototype.childIndex_,vjs.Component.prototype.getChildById=function(t){
return this.childIndex_[t];
},vjs.Component.prototype.childNameIndex_,vjs.Component.prototype.getChild=function(t){
return this.childNameIndex_[t];
},vjs.Component.prototype.addChild=function(t,e){
var s,n,o;
return"string"==typeof t?(o=t,e=e||{},n=e.componentClass||vjs.capitalize(o),e.name=o,
s=new window.videojs[n](this.player_||this,e)):s=t,this.children_.push(s),"function"==typeof s.id&&(this.childIndex_[s.id()]=s),
o=o||s.name&&s.name(),o&&(this.childNameIndex_[o]=s),"function"==typeof s.el&&s.el()&&this.contentEl().appendChild(s.el()),
s;
},vjs.Component.prototype.removeChild=function(t){
if("string"==typeof t&&(t=this.getChild(t)),t&&this.children_){
for(var e=!1,s=this.children_.length-1;s>=0;s--)if(this.children_[s]===t){
e=!0,this.children_.splice(s,1);
break;
}
if(e){
this.childIndex_[t.id]=null,this.childNameIndex_[t.name]=null;
var n=t.el();
n&&n.parentNode===this.contentEl()&&this.contentEl().removeChild(t.el());
}
}
},vjs.Component.prototype.initChildren=function(){
var t=this.options_;
if(t&&t.children){
var e=this;
vjs.obj.each(t.children,function(t,s){
if(s!==!1){
var n=function(){
e[t]=e.addChild(t,s);
};
s.loadEvent||n();
}
});
}
},vjs.Component.prototype.buildCSSClass=function(){
return"";
},vjs.Component.prototype.on=function(t,e){
return vjs.on(this.el_,t,vjs.bind(this,e)),this;
},vjs.Component.prototype.off=function(t,e){
return vjs.off(this.el_,t,e),this;
},vjs.Component.prototype.one=function(t,e){
return vjs.one(this.el_,t,vjs.bind(this,e)),this;
},vjs.Component.prototype.trigger=function(t,e){
return vjs.trigger(this.el_,t,e),this;
},vjs.Component.prototype.isReady_,vjs.Component.prototype.isReadyOnInitFinish_=!0,
vjs.Component.prototype.readyQueue_,vjs.Component.prototype.ready=function(t){
return t&&(this.isReady_?t.call(this):(void 0===this.readyQueue_&&(this.readyQueue_=[]),
this.readyQueue_.push(t))),this;
},vjs.Component.prototype.triggerReady=function(){
this.isReady_=!0;
var t=this.readyQueue_;
if(t&&t.length>0){
for(var e=0,s=t.length;s>e;e++)t[e].call(this);
this.readyQueue_=[],this.trigger("ready");
}
},vjs.Component.prototype.addClass=function(t){
return vjs.addClass(this.el_,t),this;
},vjs.Component.prototype.removeClass=function(t){
return vjs.removeClass(this.el_,t),this;
},vjs.Component.prototype.show=function(){
return this.el_.style.display="block",this;
},vjs.Component.prototype.hide=function(){
return this.el_.style.display="none",this;
},vjs.Component.prototype.fadeIn=function(){
return this.removeClass("vjs-fade-out"),this.addClass("vjs-fade-in"),this;
},vjs.Component.prototype.fadeOut=function(){
return this.removeClass("vjs-fade-in"),this.addClass("vjs-fade-out"),this;
},vjs.Component.prototype.lockShowing=function(){
return this.addClass("vjs-lock-showing"),this;
},vjs.Component.prototype.unlockShowing=function(){
return this.removeClass("vjs-lock-showing"),this;
},vjs.Component.prototype.disable=function(){
this.hide(),this.show=function(){},this.fadeIn=function(){};
},vjs.Component.prototype.width=function(t,e){
return this.dimension("width",t,e);
},vjs.Component.prototype.height=function(t,e){
return this.dimension("height",t,e);
},vjs.Component.prototype.dimensions=function(t,e){
return this.width(t,!0).height(e);
},vjs.Component.prototype.dimension=function(t,e,s){
if(void 0!==e)return this.el_.style[t]=-1!==(""+e).indexOf("%")||-1!==(""+e).indexOf("px")?e:"auto"===e?"":e+"px",
s||this.trigger("resize"),this;
if(!this.el_)return 0;
var n=this.el_.style[t],o=n.indexOf("px");
return-1!==o?parseInt(n.slice(0,o),10):parseInt(this.el_["offset"+vjs.capitalize(t)],10);
},vjs.Button=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e);
var s=!1;
this.on("touchstart",function(){
s=!0;
}),this.on("touchmove",function(){
s=!1;
});
var n=this;
this.on("touchend",function(t){
s&&n.onClick(t),t.preventDefault(),t.stopPropagation();
}),this.on("click",this.onClick),this.on("focus",this.onFocus),this.on("blur",this.onBlur);
}
}),vjs.Button.prototype.createEl=function(t,e){
return e=vjs.obj.merge({
className:this.buildCSSClass(),
innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">'+(this.buttonText||"Need Text")+"</span></div>",
role:"button",
"aria-live":"polite",
tabIndex:0
},e),vjs.Component.prototype.createEl.call(this,t,e);
},vjs.Button.prototype.buildCSSClass=function(){
return"vjs-control "+vjs.Component.prototype.buildCSSClass.call(this);
},vjs.Button.prototype.onClick=function(){},vjs.Button.prototype.onFocus=function(){
vjs.on(document,"keyup",vjs.bind(this,this.onKeyPress));
},vjs.Button.prototype.onKeyPress=function(t){
(32==t.which||13==t.which)&&(t.preventDefault(),this.onClick());
},vjs.Button.prototype.onBlur=function(){
vjs.off(document,"keyup",vjs.bind(this,this.onKeyPress));
},vjs.Slider=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),this.bar=this.getChild(this.options_.barName),this.handle=this.getChild(this.options_.handleName),
t.on(this.playerEvent,vjs.bind(this,this.update)),this.on("mousedown",this.onMouseDown),
this.on("touchstart",this.onMouseDown),this.on("focus",this.onFocus),this.on("blur",this.onBlur),
this.on("click",this.onClick),this.player_.on("controlsvisible",vjs.bind(this,this.update)),
t.ready(vjs.bind(this,this.update)),this.boundEvents={};
}
}),vjs.Slider.prototype.createEl=function(t,e){
return e=e||{},e.className=e.className+" vjs-slider",e=vjs.obj.merge({
role:"slider",
"aria-valuenow":0,
"aria-valuemin":0,
"aria-valuemax":100,
tabIndex:0
},e),vjs.Component.prototype.createEl.call(this,t,e);
},vjs.Slider.prototype.onMouseDown=function(t){
t.preventDefault(),vjs.blockTextSelection(),this.boundEvents.move=vjs.bind(this,this.onMouseMove),
this.boundEvents.end=vjs.bind(this,this.onMouseUp),vjs.on(document,"mousemove",this.boundEvents.move),
vjs.on(document,"mouseup",this.boundEvents.end),vjs.on(document,"touchmove",this.boundEvents.move),
vjs.on(document,"touchend",this.boundEvents.end),this.onMouseMove(t);
},vjs.Slider.prototype.onMouseUp=function(){
vjs.unblockTextSelection(),vjs.off(document,"mousemove",this.boundEvents.move,!1),
vjs.off(document,"mouseup",this.boundEvents.end,!1),vjs.off(document,"touchmove",this.boundEvents.move,!1),
vjs.off(document,"touchend",this.boundEvents.end,!1),this.update();
},vjs.Slider.prototype.update=function(){
if(this.el_){
var t,e=this.getPercent(),s=this.handle,n=this.bar;
if(isNaN(e)&&(e=0),t=e,s){
var o=this.el_,i=o.offsetWidth,r=s.el().offsetWidth,a=r?r/i:0,l=1-a,c=e*l;
t=c+a/2,s.el().style.left=vjs.round(100*c,2)+"%";
}
n.el().style.width=vjs.round(100*t,2)+"%";
}
},vjs.Slider.prototype.calculateDistance=function(t){
var e,s,n,o,i,r,a,l,c;
if(e=this.el_,s=vjs.findPosition(e),i=r=e.offsetWidth,a=this.handle,this.options_.vertical){
if(o=s.top,c=t.changedTouches?t.changedTouches[0].pageY:t.pageY,a){
var u=a.el().offsetHeight;
o+=u/2,r-=u;
}
return Math.max(0,Math.min(1,(o-c+r)/r));
}
if(n=s.left,l=t.changedTouches?t.changedTouches[0].pageX:t.pageX,a){
var p=a.el().offsetWidth;
n+=p/2,i-=p;
}
return Math.max(0,Math.min(1,(l-n)/i));
},vjs.Slider.prototype.onFocus=function(){
vjs.on(document,"keyup",vjs.bind(this,this.onKeyPress));
},vjs.Slider.prototype.onKeyPress=function(t){
37==t.which?(t.preventDefault(),this.stepBack()):39==t.which&&(t.preventDefault(),
this.stepForward());
},vjs.Slider.prototype.onBlur=function(){
vjs.off(document,"keyup",vjs.bind(this,this.onKeyPress));
},vjs.Slider.prototype.onClick=function(t){
t.stopImmediatePropagation(),t.preventDefault();
},vjs.SliderHandle=vjs.Component.extend(),vjs.SliderHandle.prototype.defaultValue=0,
vjs.SliderHandle.prototype.createEl=function(t,e){
return e=e||{},e.className=e.className+" vjs-slider-handle",e=vjs.obj.merge({
innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"
},e),vjs.Component.prototype.createEl.call(this,"div",e);
},vjs.Menu=vjs.Component.extend(),vjs.Menu.prototype.addItem=function(t){
this.addChild(t),t.on("click",vjs.bind(this,function(){
this.unlockShowing();
}));
},vjs.Menu.prototype.createEl=function(){
var t=this.options().contentElType||"ul";
this.contentEl_=vjs.createEl(t,{
className:"vjs-menu-content"
});
var e=vjs.Component.prototype.createEl.call(this,"div",{
append:this.contentEl_,
className:"vjs-menu"
});
return e.appendChild(this.contentEl_),vjs.on(e,"click",function(t){
t.preventDefault(),t.stopImmediatePropagation();
}),e;
},vjs.MenuItem=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e),this.selected(e.selected);
}
}),vjs.MenuItem.prototype.createEl=function(t,e){
return vjs.Button.prototype.createEl.call(this,"li",vjs.obj.merge({
className:"vjs-menu-item",
innerHTML:this.options_.label
},e));
},vjs.MenuItem.prototype.onClick=function(){
this.selected(!0);
},vjs.MenuItem.prototype.selected=function(t){
t?(this.addClass("vjs-selected"),this.el_.setAttribute("aria-selected",!0)):(this.removeClass("vjs-selected"),
this.el_.setAttribute("aria-selected",!1));
},vjs.MenuButton=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e),this.menu=this.createMenu(),this.addChild(this.menu),this.items&&0===this.items.length&&this.hide(),
this.on("keyup",this.onKeyPress),this.el_.setAttribute("aria-haspopup",!0),this.el_.setAttribute("role","button");
}
}),vjs.MenuButton.prototype.buttonPressed_=!1,vjs.MenuButton.prototype.createMenu=function(){
var t=new vjs.Menu(this.player_);
if(this.options().title&&t.el().appendChild(vjs.createEl("li",{
className:"vjs-menu-title",
innerHTML:vjs.capitalize(this.kind_),
tabindex:-1
})),this.items=this.createItems(),this.items)for(var e=0;e<this.items.length;e++)t.addItem(this.items[e]);
return t;
},vjs.MenuButton.prototype.createItems=function(){},vjs.MenuButton.prototype.buildCSSClass=function(){
return this.className+" vjs-menu-button "+vjs.Button.prototype.buildCSSClass.call(this);
},vjs.MenuButton.prototype.onFocus=function(){},vjs.MenuButton.prototype.onBlur=function(){},
vjs.MenuButton.prototype.onClick=function(){
this.one("mouseout",vjs.bind(this,function(){
this.menu.unlockShowing(),this.el_.blur();
})),this.buttonPressed_?this.unpressButton():this.pressButton();
},vjs.MenuButton.prototype.onKeyPress=function(t){
t.preventDefault(),32==t.which||13==t.which?this.buttonPressed_?this.unpressButton():this.pressButton():27==t.which&&this.buttonPressed_&&this.unpressButton();
},vjs.MenuButton.prototype.pressButton=function(){
this.buttonPressed_=!0,this.menu.lockShowing(),this.el_.setAttribute("aria-pressed",!0),
this.items&&this.items.length>0&&this.items[0].el().focus();
},vjs.MenuButton.prototype.unpressButton=function(){
this.buttonPressed_=!1,this.menu.unlockShowing(),this.el_.setAttribute("aria-pressed",!1);
},vjs.Player=vjs.Component.extend({
init:function(t,e,s){
this.tag=t,e=vjs.obj.merge(this.getTagSettings(t),e),this.cache_={},this.poster_=e.poster,
this.controls_=e.controls,e.customControlsOnMobile!==!0&&(vjs.IS_IOS||vjs.IS_ANDROID)?(t.controls=e.controls,
this.controls_=!1):t.controls=!1,vjs.Component.call(this,this,e,s),this.one("play",function(t){
var e={
type:"firstplay",
target:this.el_
},s=vjs.trigger(this.el_,e);
s||(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation());
}),this.on("ended",this.onEnded),this.on("play",this.onPlay),this.on("firstplay",this.onFirstPlay),
this.on("pause",this.onPause),this.on("progress",this.onProgress),this.on("durationchange",this.onDurationChange),
this.on("error",this.onError),this.on("fullscreenchange",this.onFullscreenChange),
vjs.players[this.id_]=this,e.plugins&&vjs.obj.each(e.plugins,function(t,e){
this[t](e);
},this);
}
}),vjs.Player.prototype.options_=vjs.options,vjs.Player.prototype.dispose=function(){
vjs.players[this.id_]=null,this.tag&&this.tag.player&&(this.tag.player=null),this.el_&&this.el_.player&&(this.el_.player=null),
this.stopTrackingProgress(),this.stopTrackingCurrentTime(),this.tech&&this.tech.dispose(),
vjs.Component.prototype.dispose.call(this);
},vjs.Player.prototype.getTagSettings=function(t){
var e={
sources:[],
tracks:[]
};
if(vjs.obj.merge(e,vjs.getAttributeValues(t)),t.hasChildNodes()){
var s,n,o,i,r;
for(s=t.childNodes,i=0,r=s.length;r>i;i++)n=s[i],o=n.nodeName.toLowerCase(),"source"===o?e.sources.push(vjs.getAttributeValues(n)):"track"===o&&e.tracks.push(vjs.getAttributeValues(n));
}
return e;
},vjs.Player.prototype.createEl=function(){
var t=this.el_=vjs.Component.prototype.createEl.call(this,"div"),e=this.tag;
if(e.removeAttribute("width"),e.removeAttribute("height"),e.hasChildNodes()){
var s,n,o,i,r,a;
for(s=e.childNodes,n=s.length,a=[];n--;)i=s[n],r=i.nodeName.toLowerCase(),("source"===r||"track"===r)&&a.push(i);
for(o=0;o<a.length;o++)e.removeChild(a[o]);
}
return e.id=e.id||"vjs_video_"+vjs.guid++,t.id=e.id,t.className=e.className,e.id+="_html5_api",
e.className="vjs-tech",e.player=t.player=this,this.addClass("vjs-paused"),this.width(this.options_.width,!0),
this.height(this.options_.height,!0),e.parentNode&&e.parentNode.insertBefore(t,e),
vjs.insertFirst(e,t),t;
},vjs.Player.prototype.loadTech=function(t,e){
this.tech?this.unloadTech():"Html5"!==t&&this.tag&&(this.el_.removeChild(this.tag),
this.tag.player=null,this.tag=null),this.techName=t,this.isReady_=!1;
var s=function(){
this.player_.triggerReady(),this.features.progressEvents||this.player_.manualProgressOn(),
this.features.timeupdateEvents||this.player_.manualTimeUpdatesOn();
},n=vjs.obj.merge({
source:e,
parentEl:this.el_
},this.options_[t.toLowerCase()]);
e&&(e.src==this.cache_.src&&this.cache_.currentTime>0&&(n.startTime=this.cache_.currentTime),
this.cache_.src=e.src),this.tech=new window.videojs[t](this,n),this.tech.ready(s);
},vjs.Player.prototype.unloadTech=function(){
this.isReady_=!1,this.tech.dispose(),this.manualProgress&&this.manualProgressOff(),
this.manualTimeUpdates&&this.manualTimeUpdatesOff(),this.tech=!1;
},vjs.Player.prototype.manualProgressOn=function(){
this.manualProgress=!0,this.trackProgress(),this.tech.one("progress",function(){
this.features.progressEvents=!0,this.player_.manualProgressOff();
});
},vjs.Player.prototype.manualProgressOff=function(){
this.manualProgress=!1,this.stopTrackingProgress();
},vjs.Player.prototype.trackProgress=function(){
this.progressInterval=setInterval(vjs.bind(this,function(){
this.cache_.bufferEnd<this.buffered().end(0)?this.trigger("progress"):1==this.bufferedPercent()&&(this.stopTrackingProgress(),
this.trigger("progress"));
}),500);
},vjs.Player.prototype.stopTrackingProgress=function(){
clearInterval(this.progressInterval);
},vjs.Player.prototype.manualTimeUpdatesOn=function(){
this.manualTimeUpdates=!0,this.on("play",this.trackCurrentTime),this.on("pause",this.stopTrackingCurrentTime),
this.tech.one("timeupdate",function(){
this.features.timeupdateEvents=!0,this.player_.manualTimeUpdatesOff();
});
},vjs.Player.prototype.manualTimeUpdatesOff=function(){
this.manualTimeUpdates=!1,this.stopTrackingCurrentTime(),this.off("play",this.trackCurrentTime),
this.off("pause",this.stopTrackingCurrentTime);
},vjs.Player.prototype.trackCurrentTime=function(){
this.currentTimeInterval&&this.stopTrackingCurrentTime(),this.currentTimeInterval=setInterval(vjs.bind(this,function(){
this.trigger("timeupdate");
}),250);
},vjs.Player.prototype.stopTrackingCurrentTime=function(){
clearInterval(this.currentTimeInterval);
},vjs.Player.prototype.onEnded=function(){
this.options_.loop&&(this.currentTime(0),this.play());
},vjs.Player.prototype.onPlay=function(){
vjs.removeClass(this.el_,"vjs-paused"),vjs.addClass(this.el_,"vjs-playing");
},vjs.Player.prototype.onFirstPlay=function(){
this.options_.starttime&&this.currentTime(this.options_.starttime);
},vjs.Player.prototype.onPause=function(){
vjs.removeClass(this.el_,"vjs-playing"),vjs.addClass(this.el_,"vjs-paused");
},vjs.Player.prototype.onProgress=function(){
1==this.bufferedPercent()&&this.trigger("loadedalldata");
},vjs.Player.prototype.onDurationChange=function(){
this.duration(this.techGet("duration"));
},vjs.Player.prototype.onError=function(t){
vjs.log("Video Error",t);
},vjs.Player.prototype.onFullscreenChange=function(){
this.isFullScreen?this.addClass("vjs-fullscreen"):this.removeClass("vjs-fullscreen");
},vjs.Player.prototype.cache_,vjs.Player.prototype.getCache=function(){
return this.cache_;
},vjs.Player.prototype.techCall=function(t,e){
if(this.tech&&!this.tech.isReady_)this.tech.ready(function(){
this[t](e);
});else try{
this.tech[t](e);
}catch(s){
throw vjs.log(s),s;
}
},vjs.Player.prototype.techGet=function(t){
if(this.tech.isReady_)try{
return this.tech[t]();
}catch(e){
throw void 0===this.tech[t]?vjs.log("Video.js: "+t+" method not defined for "+this.techName+" playback technology.",e):"TypeError"==e.name?(vjs.log("Video.js: "+t+" unavailable on "+this.techName+" playback technology element.",e),
this.tech.isReady_=!1):vjs.log(e),e;
}
},vjs.Player.prototype.play=function(){
return this.techCall("play"),this;
},vjs.Player.prototype.pause=function(){
return this.techCall("pause"),this;
},vjs.Player.prototype.paused=function(){
return this.techGet("paused")===!1?!1:!0;
},vjs.Player.prototype.currentTime=function(t){
return void 0!==t?(this.cache_.lastSetCurrentTime=t,this.techCall("setCurrentTime",t),
this.manualTimeUpdates&&this.trigger("timeupdate"),this):this.cache_.currentTime=this.techGet("currentTime")||0;
},vjs.Player.prototype.duration=function(t){
return void 0!==t?(this.cache_.duration=parseFloat(t),this):this.cache_.duration;
},vjs.Player.prototype.remainingTime=function(){
return this.duration()-this.currentTime();
},vjs.Player.prototype.buffered=function(){
var t=this.techGet("buffered"),e=0,s=this.cache_.bufferEnd=this.cache_.bufferEnd||0;
return t&&t.length>0&&t.end(0)!==s&&(s=t.end(0),this.cache_.bufferEnd=s),vjs.createTimeRange(e,s);
},vjs.Player.prototype.bufferedPercent=function(){
return this.duration()?this.buffered().end(0)/this.duration():0;
},vjs.Player.prototype.volume=function(t){
var e;
return void 0!==t?(e=Math.max(0,Math.min(1,parseFloat(t))),this.cache_.volume=e,
this.techCall("setVolume",e),vjs.setLocalStorage("volume",e),this):(e=parseFloat(this.techGet("volume")),
isNaN(e)?1:e);
},vjs.Player.prototype.muted=function(t){
return void 0!==t?(this.techCall("setMuted",t),this):this.techGet("muted")||!1;
},vjs.Player.prototype.supportsFullScreen=function(){
return this.techGet("supportsFullScreen")||!1;
},vjs.Player.prototype.requestFullScreen=function(){
var t=vjs.support.requestFullScreen;
return this.isFullScreen=!0,t?(vjs.on(document,t.eventName,vjs.bind(this,function(){
this.isFullScreen=document[t.isFullScreen],this.isFullScreen===!1&&vjs.off(document,t.eventName,arguments.callee),
this.trigger("fullscreenchange");
})),this.el_[t.requestFn]()):this.tech.supportsFullScreen()?this.techCall("enterFullScreen"):(this.enterFullWindow(),
this.trigger("fullscreenchange")),this;
},vjs.Player.prototype.cancelFullScreen=function(){
var t=vjs.support.requestFullScreen;
return this.isFullScreen=!1,t?document[t.cancelFn]():this.tech.supportsFullScreen()?this.techCall("exitFullScreen"):(this.exitFullWindow(),
this.trigger("fullscreenchange")),this;
},vjs.Player.prototype.enterFullWindow=function(){
this.isFullWindow=!0,this.docOrigOverflow=document.documentElement.style.overflow,
vjs.on(document,"keydown",vjs.bind(this,this.fullWindowOnEscKey)),document.documentElement.style.overflow="hidden",
vjs.addClass(document.body,"vjs-full-window"),this.trigger("enterFullWindow");
},vjs.Player.prototype.fullWindowOnEscKey=function(t){
27===t.keyCode&&(this.isFullScreen===!0?this.cancelFullScreen():this.exitFullWindow());
},vjs.Player.prototype.exitFullWindow=function(){
this.isFullWindow=!1,vjs.off(document,"keydown",this.fullWindowOnEscKey),document.documentElement.style.overflow=this.docOrigOverflow,
vjs.removeClass(document.body,"vjs-full-window"),this.trigger("exitFullWindow");
},vjs.Player.prototype.selectSource=function(t){
for(var e=0,s=this.options_.techOrder;e<s.length;e++){
var n=vjs.capitalize(s[e]),o=window.videojs[n];
if(o.isSupported())for(var i=0,r=t;i<r.length;i++){
var a=r[i];
if(o.canPlaySource(a))return{
source:a,
tech:n
};
}
}
return!1;
},vjs.Player.prototype.src=function(t){
if(t instanceof Array){
var e,s=this.selectSource(t);
s?(t=s.source,e=s.tech,e==this.techName?this.src(t):this.loadTech(e,t)):this.el_.appendChild(vjs.createEl("p",{
innerHTML:'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
}));
}else t instanceof Object?this.src(window.videojs[this.techName].canPlaySource(t)?t.src:[t]):(this.cache_.src=t,
this.isReady_?(this.techCall("src",t),"auto"==this.options_.preload&&this.load(),
this.options_.autoplay&&this.play()):this.ready(function(){
this.src(t);
}));
return this;
},vjs.Player.prototype.load=function(){
return this.techCall("load"),this;
},vjs.Player.prototype.currentSrc=function(){
return this.techGet("currentSrc")||this.cache_.src||"";
},vjs.Player.prototype.preload=function(t){
return void 0!==t?(this.techCall("setPreload",t),this.options_.preload=t,this):this.techGet("preload");
},vjs.Player.prototype.autoplay=function(t){
return void 0!==t?(this.techCall("setAutoplay",t),this.options_.autoplay=t,this):this.techGet("autoplay",t);
},vjs.Player.prototype.loop=function(t){
return void 0!==t?(this.techCall("setLoop",t),this.options_.loop=t,this):this.techGet("loop");
},vjs.Player.prototype.poster_,vjs.Player.prototype.poster=function(t){
return void 0!==t&&(this.poster_=t),this.poster_;
},vjs.Player.prototype.controls_,vjs.Player.prototype.controls=function(t){
return void 0!==t&&this.controls_!==t&&(this.controls_=!!t,this.trigger("controlschange")),
this.controls_;
},vjs.Player.prototype.error=function(){
return this.techGet("error");
},vjs.Player.prototype.ended=function(){
return this.techGet("ended");
},function(){
var t,e,s;
s=document.createElement("div"),e={},void 0!==s.cancelFullscreen?(e.requestFn="requestFullscreen",
e.cancelFn="exitFullscreen",e.eventName="fullscreenchange",e.isFullScreen="fullScreen"):(document.mozCancelFullScreen?(t="moz",
e.isFullScreen=t+"FullScreen"):(t="webkit",e.isFullScreen=t+"IsFullScreen"),s[t+"RequestFullScreen"]&&(e.requestFn=t+"RequestFullScreen",
e.cancelFn=t+"CancelFullScreen"),e.eventName=t+"fullscreenchange"),document[e.cancelFn]&&(vjs.support.requestFullScreen=e);
}(),vjs.ControlBar=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.controls()||this.disable(),t.one("play",vjs.bind(this,function(){
var t,e=vjs.bind(this,this.fadeIn),s=vjs.bind(this,this.fadeOut);
this.fadeIn(),"ontouchstart"in window||(this.player_.on("mouseover",e),this.player_.on("mouseout",s),
this.player_.on("pause",vjs.bind(this,this.lockShowing)),this.player_.on("play",vjs.bind(this,this.unlockShowing))),
t=!1,this.player_.on("touchstart",function(){
t=!0;
}),this.player_.on("touchmove",function(){
t=!1;
}),this.player_.on("touchend",vjs.bind(this,function(e){
var s;
t&&(s=this.el().className.search("fade-in"),-1!==s?this.fadeOut():this.fadeIn()),
t=!1,this.player_.paused()||e.preventDefault();
}));
}));
}
}),vjs.ControlBar.prototype.options_={
loadEvent:"play",
children:{
playToggle:{},
currentTimeDisplay:{},
timeDivider:{},
durationDisplay:{},
remainingTimeDisplay:{},
progressControl:{},
fullscreenToggle:{},
volumeControl:{},
muteToggle:{}
}
},vjs.ControlBar.prototype.createEl=function(){
return vjs.createEl("div",{
className:"vjs-control-bar"
});
},vjs.ControlBar.prototype.fadeIn=function(){
vjs.Component.prototype.fadeIn.call(this),this.player_.trigger("controlsvisible");
},vjs.ControlBar.prototype.fadeOut=function(){
vjs.Component.prototype.fadeOut.call(this),this.player_.trigger("controlshidden");
},vjs.PlayToggle=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e),t.on("play",vjs.bind(this,this.onPlay)),t.on("pause",vjs.bind(this,this.onPause));
}
}),vjs.PlayToggle.prototype.buttonText="Play",vjs.PlayToggle.prototype.buildCSSClass=function(){
return"vjs-play-control "+vjs.Button.prototype.buildCSSClass.call(this);
},vjs.PlayToggle.prototype.onClick=function(){
this.player_.paused()?this.player_.play():this.player_.pause();
},vjs.PlayToggle.prototype.onPlay=function(){
vjs.removeClass(this.el_,"vjs-paused"),vjs.addClass(this.el_,"vjs-playing"),this.el_.children[0].children[0].innerHTML="Pause";
},vjs.PlayToggle.prototype.onPause=function(){
vjs.removeClass(this.el_,"vjs-playing"),vjs.addClass(this.el_,"vjs-paused"),this.el_.children[0].children[0].innerHTML="Play";
},vjs.CurrentTimeDisplay=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.on("timeupdate",vjs.bind(this,this.updateContent));
}
}),vjs.CurrentTimeDisplay.prototype.createEl=function(){
var t=vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-current-time vjs-time-controls vjs-control"
});
return this.content=vjs.createEl("div",{
className:"vjs-current-time-display",
innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',
"aria-live":"off"
}),t.appendChild(vjs.createEl("div").appendChild(this.content)),t;
},vjs.CurrentTimeDisplay.prototype.updateContent=function(){
var t=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();
this.content.innerHTML='<span class="vjs-control-text">Current Time </span>'+vjs.formatTime(t,this.player_.duration());
},vjs.DurationDisplay=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.on("timeupdate",vjs.bind(this,this.updateContent));
}
}),vjs.DurationDisplay.prototype.createEl=function(){
var t=vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-duration vjs-time-controls vjs-control"
});
return this.content=vjs.createEl("div",{
className:"vjs-duration-display",
innerHTML:'<span class="vjs-control-text">Duration Time </span>0:00',
"aria-live":"off"
}),t.appendChild(vjs.createEl("div").appendChild(this.content)),t;
},vjs.DurationDisplay.prototype.updateContent=function(){
this.player_.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Duration Time </span>'+vjs.formatTime(this.player_.duration()));
},vjs.TimeDivider=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e);
}
}),vjs.TimeDivider.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-time-divider",
innerHTML:"<div><span>/</span></div>"
});
},vjs.RemainingTimeDisplay=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.on("timeupdate",vjs.bind(this,this.updateContent));
}
}),vjs.RemainingTimeDisplay.prototype.createEl=function(){
var t=vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-remaining-time vjs-time-controls vjs-control"
});
return this.content=vjs.createEl("div",{
className:"vjs-remaining-time-display",
innerHTML:'<span class="vjs-control-text">Remaining Time </span>-0:00',
"aria-live":"off"
}),t.appendChild(vjs.createEl("div").appendChild(this.content)),t;
},vjs.RemainingTimeDisplay.prototype.updateContent=function(){
this.player_.duration()&&this.player_.duration()&&(this.content.innerHTML='<span class="vjs-control-text">Remaining Time </span>-'+vjs.formatTime(this.player_.remainingTime()));
},vjs.FullscreenToggle=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e);
}
}),vjs.FullscreenToggle.prototype.buttonText="Fullscreen",vjs.FullscreenToggle.prototype.buildCSSClass=function(){
return"vjs-fullscreen-control "+vjs.Button.prototype.buildCSSClass.call(this);
},vjs.FullscreenToggle.prototype.onClick=function(){
this.player_.isFullScreen?(this.player_.cancelFullScreen(),this.el_.children[0].children[0].innerHTML="Fullscreen"):(this.player_.requestFullScreen(),
this.el_.children[0].children[0].innerHTML="Non-Fullscreen");
},vjs.ProgressControl=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e);
}
}),vjs.ProgressControl.prototype.options_={
children:{
seekBar:{}
}
},vjs.ProgressControl.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-progress-control vjs-control"
});
},vjs.SeekBar=vjs.Slider.extend({
init:function(t,e){
vjs.Slider.call(this,t,e),t.on("timeupdate",vjs.bind(this,this.updateARIAAttributes)),
t.ready(vjs.bind(this,this.updateARIAAttributes));
}
}),vjs.SeekBar.prototype.options_={
children:{
loadProgressBar:{},
playProgressBar:{},
seekHandle:{}
},
barName:"playProgressBar",
handleName:"seekHandle"
},vjs.SeekBar.prototype.playerEvent="timeupdate",vjs.SeekBar.prototype.createEl=function(){
return vjs.Slider.prototype.createEl.call(this,"div",{
className:"vjs-progress-holder",
"aria-label":"video progress bar"
});
},vjs.SeekBar.prototype.updateARIAAttributes=function(){
var t=this.player_.scrubbing?this.player_.getCache().currentTime:this.player_.currentTime();
this.el_.setAttribute("aria-valuenow",vjs.round(100*this.getPercent(),2)),this.el_.setAttribute("aria-valuetext",vjs.formatTime(t,this.player_.duration()));
},vjs.SeekBar.prototype.getPercent=function(){
return this.player_.currentTime()/this.player_.duration();
},vjs.SeekBar.prototype.onMouseDown=function(t){
vjs.Slider.prototype.onMouseDown.call(this,t),this.player_.scrubbing=!0,this.videoWasPlaying=!this.player_.paused(),
this.player_.pause();
},vjs.SeekBar.prototype.onMouseMove=function(t){
var e=this.calculateDistance(t)*this.player_.duration();
e==this.player_.duration()&&(e-=.1),this.player_.currentTime(e);
},vjs.SeekBar.prototype.onMouseUp=function(t){
vjs.Slider.prototype.onMouseUp.call(this,t),this.player_.scrubbing=!1,this.videoWasPlaying&&this.player_.play();
},vjs.SeekBar.prototype.stepForward=function(){
this.player_.currentTime(this.player_.currentTime()+5);
},vjs.SeekBar.prototype.stepBack=function(){
this.player_.currentTime(this.player_.currentTime()-5);
},vjs.LoadProgressBar=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.on("progress",vjs.bind(this,this.update));
}
}),vjs.LoadProgressBar.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-load-progress",
innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'
});
},vjs.LoadProgressBar.prototype.update=function(){
this.el_.style&&(this.el_.style.width=vjs.round(100*this.player_.bufferedPercent(),2)+"%");
},vjs.PlayProgressBar=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e);
}
}),vjs.PlayProgressBar.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-play-progress",
innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'
});
},vjs.SeekHandle=vjs.SliderHandle.extend(),vjs.SeekHandle.prototype.defaultValue="00:00",
vjs.SeekHandle.prototype.createEl=function(){
return vjs.SliderHandle.prototype.createEl.call(this,"div",{
className:"vjs-seek-handle"
});
},vjs.VolumeControl=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.tech&&t.tech.features&&t.tech.features.volumeControl===!1&&this.addClass("vjs-hidden"),
t.on("loadstart",vjs.bind(this,function(){
t.tech.features&&t.tech.features.volumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden");
}));
}
}),vjs.VolumeControl.prototype.options_={
children:{
volumeBar:{}
}
},vjs.VolumeControl.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-volume-control vjs-control"
});
},vjs.VolumeBar=vjs.Slider.extend({
init:function(t,e){
vjs.Slider.call(this,t,e),t.on("volumechange",vjs.bind(this,this.updateARIAAttributes)),
t.ready(vjs.bind(this,this.updateARIAAttributes)),setTimeout(vjs.bind(this,this.update),0);
}
}),vjs.VolumeBar.prototype.updateARIAAttributes=function(){
this.el_.setAttribute("aria-valuenow",vjs.round(100*this.player_.volume(),2)),this.el_.setAttribute("aria-valuetext",vjs.round(100*this.player_.volume(),2)+"%");
},vjs.VolumeBar.prototype.options_={
children:{
volumeLevel:{},
volumeHandle:{}
},
barName:"volumeLevel",
handleName:"volumeHandle"
},vjs.VolumeBar.prototype.playerEvent="volumechange",vjs.VolumeBar.prototype.createEl=function(){
return vjs.Slider.prototype.createEl.call(this,"div",{
className:"vjs-volume-bar",
"aria-label":"volume level"
});
},vjs.VolumeBar.prototype.onMouseMove=function(t){
this.player_.volume(this.calculateDistance(t));
},vjs.VolumeBar.prototype.getPercent=function(){
return this.player_.muted()?0:this.player_.volume();
},vjs.VolumeBar.prototype.stepForward=function(){
this.player_.volume(this.player_.volume()+.1);
},vjs.VolumeBar.prototype.stepBack=function(){
this.player_.volume(this.player_.volume()-.1);
},vjs.VolumeLevel=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e);
}
}),vjs.VolumeLevel.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-volume-level",
innerHTML:'<span class="vjs-control-text"></span>'
});
},vjs.VolumeHandle=vjs.SliderHandle.extend(),vjs.VolumeHandle.prototype.defaultValue="00:00",
vjs.VolumeHandle.prototype.createEl=function(){
return vjs.SliderHandle.prototype.createEl.call(this,"div",{
className:"vjs-volume-handle"
});
},vjs.MuteToggle=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e),t.on("volumechange",vjs.bind(this,this.update)),t.tech&&t.tech.features&&t.tech.features.volumeControl===!1&&this.addClass("vjs-hidden"),
t.on("loadstart",vjs.bind(this,function(){
t.tech.features&&t.tech.features.volumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden");
}));
}
}),vjs.MuteToggle.prototype.createEl=function(){
return vjs.Button.prototype.createEl.call(this,"div",{
className:"vjs-mute-control vjs-control",
innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'
});
},vjs.MuteToggle.prototype.onClick=function(){
this.player_.muted(this.player_.muted()?!1:!0);
},vjs.MuteToggle.prototype.update=function(){
var t=this.player_.volume(),e=3;
0===t||this.player_.muted()?e=0:.33>t?e=1:.67>t&&(e=2),this.player_.muted()?"Unmute"!=this.el_.children[0].children[0].innerHTML&&(this.el_.children[0].children[0].innerHTML="Unmute"):"Mute"!=this.el_.children[0].children[0].innerHTML&&(this.el_.children[0].children[0].innerHTML="Mute");
for(var s=0;4>s;s++)vjs.removeClass(this.el_,"vjs-vol-"+s);
vjs.addClass(this.el_,"vjs-vol-"+e);
},vjs.VolumeMenuButton=vjs.MenuButton.extend({
init:function(t,e){
vjs.MenuButton.call(this,t,e),t.on("volumechange",vjs.bind(this,this.update)),t.tech&&t.tech.features&&t.tech.features.volumeControl===!1&&this.addClass("vjs-hidden"),
t.on("loadstart",vjs.bind(this,function(){
t.tech.features&&t.tech.features.volumeControl===!1?this.addClass("vjs-hidden"):this.removeClass("vjs-hidden");
})),this.addClass("vjs-menu-button");
}
}),vjs.VolumeMenuButton.prototype.createMenu=function(){
var t=new vjs.Menu(this.player_,{
contentElType:"div"
}),e=new vjs.VolumeBar(this.player_,vjs.obj.merge({
vertical:!0
},this.options_.volumeBar));
return t.addChild(e),t;
},vjs.VolumeMenuButton.prototype.onClick=function(){
vjs.MuteToggle.prototype.onClick.call(this),vjs.MenuButton.prototype.onClick.call(this);
},vjs.VolumeMenuButton.prototype.createEl=function(){
return vjs.Button.prototype.createEl.call(this,"div",{
className:"vjs-volume-menu-button vjs-menu-button vjs-control",
innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'
});
},vjs.VolumeMenuButton.prototype.update=vjs.MuteToggle.prototype.update,vjs.PosterImage=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e),t.poster()&&t.controls()||this.hide(),t.on("play",vjs.bind(this,this.hide));
}
}),vjs.PosterImage.prototype.createEl=function(){
var t=vjs.createEl("div",{
className:"vjs-poster",
tabIndex:-1
}),e=this.player_.poster();
return e&&("backgroundSize"in t.style?t.style.backgroundImage='url("'+e+'")':t.appendChild(vjs.createEl("img",{
src:e
}))),t;
},vjs.PosterImage.prototype.onClick=function(){
this.player_.play();
},vjs.LoadingSpinner=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),t.on("canplay",vjs.bind(this,this.hide)),t.on("canplaythrough",vjs.bind(this,this.hide)),
t.on("playing",vjs.bind(this,this.hide)),t.on("seeked",vjs.bind(this,this.hide)),
t.on("seeking",vjs.bind(this,this.show)),t.on("seeked",vjs.bind(this,this.hide)),
t.on("error",vjs.bind(this,this.show)),t.on("waiting",vjs.bind(this,this.show));
}
}),vjs.LoadingSpinner.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-loading-spinner"
});
},vjs.BigPlayButton=vjs.Button.extend({
init:function(t,e){
vjs.Button.call(this,t,e),t.controls()||this.hide(),t.on("play",vjs.bind(this,this.hide));
}
}),vjs.BigPlayButton.prototype.createEl=function(){
return vjs.Button.prototype.createEl.call(this,"div",{
className:"vjs-big-play-button",
innerHTML:"<span></span>",
"aria-label":"play video"
});
},vjs.BigPlayButton.prototype.onClick=function(){
this.player_.play();
},vjs.MediaTechController=vjs.Component.extend({
init:function(t,e,s){
vjs.Component.call(this,t,e,s);
}
}),vjs.MediaTechController.prototype.onClick=function(){
return vjs.IS_ANDROID?function(){}:function(){
this.player_.controls()&&(this.player_.paused()?this.player_.play():this.player_.pause());
};
}(),vjs.MediaTechController.prototype.features={
volumeControl:!0,
fullscreenResize:!1,
progressEvents:!1,
timeupdateEvents:!1
},vjs.media={},vjs.media.ApiMethods="play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted".split(",");
for(var i=vjs.media.ApiMethods.length-1;i>=0;i--){
var methodName=vjs.media.ApiMethods[i];
vjs.MediaTechController.prototype[vjs.media.ApiMethods[i]]=createMethod(methodName);
}
vjs.Html5=vjs.MediaTechController.extend({
init:function(t,e,s){
this.features.volumeControl=vjs.Html5.canControlVolume(),this.features.movingMediaElementInDOM=!vjs.IS_IOS,
this.features.fullscreenResize=!0,vjs.MediaTechController.call(this,t,e,s);
var n=e.source;
n&&this.el_.currentSrc==n.src?t.trigger("loadstart"):n&&(this.el_.src=n.src),t.ready(function(){
this.tag&&this.options_.autoplay&&this.paused()&&(delete this.tag.poster,this.play());
}),this.on("click",this.onClick),this.setupTriggers(),this.triggerReady();
}
}),vjs.Html5.prototype.dispose=function(){
vjs.MediaTechController.prototype.dispose.call(this);
},vjs.Html5.prototype.createEl=function(){
var t=this.player_,e=t.tag;
e&&this.features.movingMediaElementInDOM!==!1||(e?(e.player=null,t.tag=null,t.el().removeChild(e),
e=e.cloneNode(!1)):e=vjs.createEl("video",{
id:t.id()+"_html5_api",
className:"vjs-tech"
}),e.player=t,vjs.insertFirst(e,t.el()));
for(var s=["autoplay","preload","loop","muted"],n=s.length-1;n>=0;n--){
var o=s[n];
null!==t.options_[o]&&(e[o]=t.options_[o]);
}
return e;
},vjs.Html5.prototype.setupTriggers=function(){
for(var t=vjs.Html5.Events.length-1;t>=0;t--)vjs.on(this.el_,vjs.Html5.Events[t],vjs.bind(this.player_,this.eventHandler));
},vjs.Html5.prototype.eventHandler=function(t){
this.trigger(t),t.stopPropagation();
},vjs.Html5.prototype.play=function(){
this.el_.play();
},vjs.Html5.prototype.pause=function(){
this.el_.pause();
},vjs.Html5.prototype.paused=function(){
return this.el_.paused;
},vjs.Html5.prototype.currentTime=function(){
return this.el_.currentTime;
},vjs.Html5.prototype.setCurrentTime=function(t){
try{
this.el_.currentTime=t;
}catch(e){
vjs.log(e,"Video is not ready. (Video.js)");
}
},vjs.Html5.prototype.duration=function(){
return this.el_.duration||0;
},vjs.Html5.prototype.buffered=function(){
return this.el_.buffered;
},vjs.Html5.prototype.volume=function(){
return this.el_.volume;
},vjs.Html5.prototype.setVolume=function(t){
this.el_.volume=t;
},vjs.Html5.prototype.muted=function(){
return this.el_.muted;
},vjs.Html5.prototype.setMuted=function(t){
this.el_.muted=t;
},vjs.Html5.prototype.width=function(){
return this.el_.offsetWidth;
},vjs.Html5.prototype.height=function(){
return this.el_.offsetHeight;
},vjs.Html5.prototype.supportsFullScreen=function(){
return"function"!=typeof this.el_.webkitEnterFullScreen||!/Android/.test(vjs.USER_AGENT)&&/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)?!1:!0;
},vjs.Html5.prototype.enterFullScreen=function(){
var t=this.el_;
t.paused&&t.networkState<=t.HAVE_METADATA?(this.el_.play(),setTimeout(function(){
t.pause(),t.webkitEnterFullScreen();
},0)):t.webkitEnterFullScreen();
},vjs.Html5.prototype.exitFullScreen=function(){
this.el_.webkitExitFullScreen();
},vjs.Html5.prototype.src=function(t){
this.el_.src=t;
},vjs.Html5.prototype.load=function(){
this.el_.load();
},vjs.Html5.prototype.currentSrc=function(){
return this.el_.currentSrc;
},vjs.Html5.prototype.preload=function(){
return this.el_.preload;
},vjs.Html5.prototype.setPreload=function(t){
this.el_.preload=t;
},vjs.Html5.prototype.autoplay=function(){
return this.el_.autoplay;
},vjs.Html5.prototype.setAutoplay=function(t){
this.el_.autoplay=t;
},vjs.Html5.prototype.loop=function(){
return this.el_.loop;
},vjs.Html5.prototype.setLoop=function(t){
this.el_.loop=t;
},vjs.Html5.prototype.error=function(){
return this.el_.error;
},vjs.Html5.prototype.seeking=function(){
return this.el_.seeking;
},vjs.Html5.prototype.ended=function(){
return this.el_.ended;
},vjs.Html5.prototype.defaultMuted=function(){
return this.el_.defaultMuted;
},vjs.Html5.isSupported=function(){
return!!vjs.TEST_VID.canPlayType;
},vjs.Html5.canPlaySource=function(t){
try{
return!!vjs.TEST_VID.canPlayType(t.type);
}catch(e){
return"";
}
},vjs.Html5.canControlVolume=function(){
var t=vjs.TEST_VID.volume;
return vjs.TEST_VID.volume=t/2+.1,t!==vjs.TEST_VID.volume;
},vjs.Html5.Events="loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","),
vjs.IS_OLD_ANDROID&&(document.createElement("video").constructor.prototype.canPlayType=function(t){
return t&&-1!=t.toLowerCase().indexOf("video/mp4")?"maybe":"";
}),vjs.Flash=vjs.MediaTechController.extend({
init:function(t,e,s){
vjs.MediaTechController.call(this,t,e,s);
var n=e.source,o=e.parentEl,i=this.el_=vjs.createEl("div",{
id:t.id()+"_temp_flash"
}),r=t.id()+"_flash_api",a=t.options_,l=vjs.obj.merge({
readyFunction:"videojs.Flash.onReady",
eventProxyFunction:"videojs.Flash.onEvent",
errorEventProxyFunction:"videojs.Flash.onError",
autoplay:a.autoplay,
preload:a.preload,
loop:a.loop,
muted:a.muted
},e.flashVars),c=vjs.obj.merge({
wmode:"transparent",
bgcolor:"#000000"
},e.params),u=vjs.obj.merge({
id:r,
name:r,
"class":"vjs-tech"
},e.attributes);
if(n&&(l.src=encodeURIComponent(vjs.getAbsoluteURL(n.src))),vjs.insertFirst(i,o),
e.startTime&&this.ready(function(){
this.load(),this.play(),this.currentTime(e.startTime);
}),e.iFrameMode!==!0||vjs.IS_FIREFOX)vjs.Flash.embed(e.swf,i,l,c,u);else{
var p=vjs.createEl("iframe",{
id:r+"_iframe",
name:r+"_iframe",
className:"vjs-tech",
scrolling:"no",
marginWidth:0,
marginHeight:0,
frameBorder:0
});
l.readyFunction="ready",l.eventProxyFunction="events",l.errorEventProxyFunction="errors",
vjs.on(p,"load",vjs.bind(this,function(){
var t,s=p.contentWindow;
t=p.contentDocument?p.contentDocument:p.contentWindow.document,t.write(vjs.Flash.getEmbedCode(e.swf,l,c,u)),
s.player=this.player_,s.ready=vjs.bind(this.player_,function(e){
var s=t.getElementById(e),n=this,o=n.tech;
o.el_=s,vjs.on(s,"click",o.bind(o.onClick)),vjs.Flash.checkReady(o);
}),s.events=vjs.bind(this.player_,function(t,e){
var s=this;
s&&"flash"===s.techName&&s.trigger(e);
}),s.errors=vjs.bind(this.player_,function(t,e){
vjs.log("Flash Error",e);
});
})),i.parentNode.replaceChild(p,i);
}
}
}),vjs.Flash.prototype.dispose=function(){
vjs.MediaTechController.prototype.dispose.call(this);
},vjs.Flash.prototype.play=function(){
this.el_.vjs_play();
},vjs.Flash.prototype.pause=function(){
this.el_.vjs_pause();
},vjs.Flash.prototype.src=function(t){
if(t=vjs.getAbsoluteURL(t),this.el_.vjs_src(t),this.player_.autoplay()){
var e=this;
setTimeout(function(){
e.play();
},0);
}
},vjs.Flash.prototype.load=function(){
this.el_.vjs_load();
},vjs.Flash.prototype.poster=function(){
this.el_.vjs_getProperty("poster");
},vjs.Flash.prototype.buffered=function(){
return vjs.createTimeRange(0,this.el_.vjs_getProperty("buffered"));
},vjs.Flash.prototype.supportsFullScreen=function(){
return!1;
},vjs.Flash.prototype.enterFullScreen=function(){
return!1;
};
var api=vjs.Flash.prototype,readWrite="preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","),readOnly="error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(","),createSetter=function(t){
var e=t.charAt(0).toUpperCase()+t.slice(1);
api["set"+e]=function(e){
return this.el_.vjs_setProperty(t,e);
};
},createGetter=function(t){
api[t]=function(){
return this.el_.vjs_getProperty(t);
};
};
if(function(){
var t;
for(t=0;t<readWrite.length;t++)createGetter(readWrite[t]),createSetter(readWrite[t]);
for(t=0;t<readOnly.length;t++)createGetter(readOnly[t]);
}(),vjs.Flash.isSupported=function(){
return vjs.Flash.version()[0]>=10;
},vjs.Flash.canPlaySource=function(t){
return t.type in vjs.Flash.formats?"maybe":void 0;
},vjs.Flash.formats={
"video/flv":"FLV",
"video/x-flv":"FLV",
"video/mp4":"MP4",
"video/m4v":"MP4"
},vjs.Flash.onReady=function(t){
var e=vjs.el(t),s=e.player||e.parentNode.player,n=s.tech;
e.player=s,n.el_=e,n.on("click",n.onClick),vjs.Flash.checkReady(n);
},vjs.Flash.checkReady=function(t){
t.el().vjs_getProperty?t.triggerReady():setTimeout(function(){
vjs.Flash.checkReady(t);
},50);
},vjs.Flash.onEvent=function(t,e){
var s=vjs.el(t).player;
s.trigger(e);
},vjs.Flash.onError=function(t,e){
var s=vjs.el(t).player;
s.trigger("error"),vjs.log("Flash Error",e,t);
},vjs.Flash.version=function(){
var t="0,0,0";
try{
t=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1];
}catch(e){
try{
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(t=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1]);
}catch(s){}
}
return t.split(",");
},vjs.Flash.embed=function(t,e,s,n,o){
var i=vjs.Flash.getEmbedCode(t,s,n,o),r=vjs.createEl("div",{
innerHTML:i
}).childNodes[0],a=e.parentNode;
e.parentNode.replaceChild(r,e);
var l=a.childNodes[0];
return setTimeout(function(){
l.style.display="block";
},1e3),r;
},vjs.Flash.getEmbedCode=function(t,e,s,n){
var o='<object type="application/x-shockwave-flash"',i="",r="",a="";
return e&&vjs.obj.each(e,function(t,e){
i+=t+"="+e+"&amp;";
}),s=vjs.obj.merge({
movie:t,
flashvars:i,
allowScriptAccess:"always",
allowNetworking:"all"
},s),vjs.obj.each(s,function(t,e){
r+='<param name="'+t+'" value="'+e+'" />';
}),n=vjs.obj.merge({
data:t,
width:"100%",
height:"100%"
},n),vjs.obj.each(n,function(t,e){
a+=t+'="'+e+'" ';
}),o+a+">"+r+"</object>";
},vjs.MediaLoader=vjs.Component.extend({
init:function(t,e,s){
if(vjs.Component.call(this,t,e,s),t.options_.sources&&0!==t.options_.sources.length)t.src(t.options_.sources);else for(var n=0,o=t.options_.techOrder;n<o.length;n++){
var i=vjs.capitalize(o[n]),r=window.videojs[i];
if(r&&r.isSupported()){
t.loadTech(i);
break;
}
}
}
}),vjs.Player.prototype.textTracks_,vjs.Player.prototype.textTracks=function(){
return this.textTracks_=this.textTracks_||[],this.textTracks_;
},vjs.Player.prototype.addTextTrack=function(t,e,s,n){
var o=this.textTracks_=this.textTracks_||[];
n=n||{},n.kind=t,n.label=e,n.language=s;
var i=vjs.capitalize(t||"subtitles"),r=new window.videojs[i+"Track"](this,n);
return o.push(r),r;
},vjs.Player.prototype.addTextTracks=function(t){
for(var e,s=0;s<t.length;s++)e=t[s],this.addTextTrack(e.kind,e.label,e.language,e);
return this;
},vjs.Player.prototype.showTextTrack=function(t,e){
for(var s,n,o,i=this.textTracks_,r=0,a=i.length;a>r;r++)s=i[r],s.id()===t?(s.show(),
n=s):e&&s.kind()==e&&s.mode()>0&&s.disable();
return o=n?n.kind():e?e:!1,o&&this.trigger(o+"trackchange"),this;
},vjs.TextTrack=vjs.Component.extend({
init:function(t,e){
vjs.Component.call(this,t,e),this.id_=e.id||"vjs_"+e.kind+"_"+e.language+"_"+vjs.guid++,
this.src_=e.src,this.dflt_=e["default"]||e.dflt,this.title_=e.title,this.language_=e.srclang,
this.label_=e.label,this.cues_=[],this.activeCues_=[],this.readyState_=0,this.mode_=0,
this.player_.on("fullscreenchange",vjs.bind(this,this.adjustFontSize));
}
}),vjs.TextTrack.prototype.kind_,vjs.TextTrack.prototype.kind=function(){
return this.kind_;
},vjs.TextTrack.prototype.src_,vjs.TextTrack.prototype.src=function(){
return this.src_;
},vjs.TextTrack.prototype.dflt_,vjs.TextTrack.prototype.dflt=function(){
return this.dflt_;
},vjs.TextTrack.prototype.title_,vjs.TextTrack.prototype.title=function(){
return this.title_;
},vjs.TextTrack.prototype.language_,vjs.TextTrack.prototype.language=function(){
return this.language_;
},vjs.TextTrack.prototype.label_,vjs.TextTrack.prototype.label=function(){
return this.label_;
},vjs.TextTrack.prototype.cues_,vjs.TextTrack.prototype.cues=function(){
return this.cues_;
},vjs.TextTrack.prototype.activeCues_,vjs.TextTrack.prototype.activeCues=function(){
return this.activeCues_;
},vjs.TextTrack.prototype.readyState_,vjs.TextTrack.prototype.readyState=function(){
return this.readyState_;
},vjs.TextTrack.prototype.mode_,vjs.TextTrack.prototype.mode=function(){
return this.mode_;
},vjs.TextTrack.prototype.adjustFontSize=function(){
this.el_.style.fontSize=this.player_.isFullScreen?screen.width/this.player_.width()*1.4*100+"%":"";
},vjs.TextTrack.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-"+this.kind_+" vjs-text-track"
});
},vjs.TextTrack.prototype.show=function(){
this.activate(),this.mode_=2,vjs.Component.prototype.show.call(this);
},vjs.TextTrack.prototype.hide=function(){
this.activate(),this.mode_=1,vjs.Component.prototype.hide.call(this);
},vjs.TextTrack.prototype.disable=function(){
2==this.mode_&&this.hide(),this.deactivate(),this.mode_=0;
},vjs.TextTrack.prototype.activate=function(){
0===this.readyState_&&this.load(),0===this.mode_&&(this.player_.on("timeupdate",vjs.bind(this,this.update,this.id_)),
this.player_.on("ended",vjs.bind(this,this.reset,this.id_)),("captions"===this.kind_||"subtitles"===this.kind_)&&this.player_.getChild("textTrackDisplay").addChild(this));
},vjs.TextTrack.prototype.deactivate=function(){
this.player_.off("timeupdate",vjs.bind(this,this.update,this.id_)),this.player_.off("ended",vjs.bind(this,this.reset,this.id_)),
this.reset(),this.player_.getChild("textTrackDisplay").removeChild(this);
},vjs.TextTrack.prototype.load=function(){
0===this.readyState_&&(this.readyState_=1,vjs.get(this.src_,vjs.bind(this,this.parseCues),vjs.bind(this,this.onError)));
},vjs.TextTrack.prototype.onError=function(t){
this.error=t,this.readyState_=3,this.trigger("error");
},vjs.TextTrack.prototype.parseCues=function(t){
for(var e,s,n,o,i=t.split("\n"),r="",a=1,l=i.length;l>a;a++)if(r=vjs.trim(i[a])){
for(-1==r.indexOf("-->")?(o=r,r=vjs.trim(i[++a])):o=this.cues_.length,e={
id:o,
index:this.cues_.length
},s=r.split(" --> "),e.startTime=this.parseCueTime(s[0]),e.endTime=this.parseCueTime(s[1]),
n=[];i[++a]&&(r=vjs.trim(i[a]));)n.push(r);
e.text=n.join("<br/>"),this.cues_.push(e);
}
this.readyState_=2,this.trigger("loaded");
},vjs.TextTrack.prototype.parseCueTime=function(t){
var e,s,n,o,i,r=t.split(":"),a=0;
return 3==r.length?(e=r[0],s=r[1],n=r[2]):(e=0,s=r[0],n=r[1]),n=n.split(/\s+/),o=n.splice(0,1)[0],
o=o.split(/\.|,/),i=parseFloat(o[1]),o=o[0],a+=3600*parseFloat(e),a+=60*parseFloat(s),
a+=parseFloat(o),i&&(a+=i/1e3),a;
},vjs.TextTrack.prototype.update=function(){
if(this.cues_.length>0){
var t=this.player_.currentTime();
if(void 0===this.prevChange||t<this.prevChange||this.nextChange<=t){
var e,s,n,o,i=this.cues_,r=this.player_.duration(),a=0,l=!1,c=[];
for(t>=this.nextChange||void 0===this.nextChange?o=void 0!==this.firstActiveIndex?this.firstActiveIndex:0:(l=!0,
o=void 0!==this.lastActiveIndex?this.lastActiveIndex:i.length-1);;){
if(n=i[o],n.endTime<=t)a=Math.max(a,n.endTime),n.active&&(n.active=!1);else if(t<n.startTime){
if(r=Math.min(r,n.startTime),n.active&&(n.active=!1),!l)break;
}else l?(c.splice(0,0,n),void 0===s&&(s=o),e=o):(c.push(n),void 0===e&&(e=o),s=o),
r=Math.min(r,n.endTime),a=Math.max(a,n.startTime),n.active=!0;
if(l){
if(0===o)break;
o--;
}else{
if(o===i.length-1)break;
o++;
}
}
this.activeCues_=c,this.nextChange=r,this.prevChange=a,this.firstActiveIndex=e,this.lastActiveIndex=s,
this.updateDisplay(),this.trigger("cuechange");
}
}
},vjs.TextTrack.prototype.updateDisplay=function(){
for(var t=this.activeCues_,e="",s=0,n=t.length;n>s;s++)e+='<span class="vjs-tt-cue">'+t[s].text+"</span>";
this.el_.innerHTML=e;
},vjs.TextTrack.prototype.reset=function(){
this.nextChange=0,this.prevChange=this.player_.duration(),this.firstActiveIndex=0,
this.lastActiveIndex=0;
},vjs.CaptionsTrack=vjs.TextTrack.extend(),vjs.CaptionsTrack.prototype.kind_="captions",
vjs.SubtitlesTrack=vjs.TextTrack.extend(),vjs.SubtitlesTrack.prototype.kind_="subtitles",
vjs.ChaptersTrack=vjs.TextTrack.extend(),vjs.ChaptersTrack.prototype.kind_="chapters",
vjs.TextTrackDisplay=vjs.Component.extend({
init:function(t,e,s){
vjs.Component.call(this,t,e,s),t.options_.tracks&&t.options_.tracks.length>0&&this.player_.addTextTracks(t.options_.tracks);
}
}),vjs.TextTrackDisplay.prototype.createEl=function(){
return vjs.Component.prototype.createEl.call(this,"div",{
className:"vjs-text-track-display"
});
},vjs.TextTrackMenuItem=vjs.MenuItem.extend({
init:function(t,e){
var s=this.track=e.track;
e.label=s.label(),e.selected=s.dflt(),vjs.MenuItem.call(this,t,e),this.player_.on(s.kind()+"trackchange",vjs.bind(this,this.update));
}
}),vjs.TextTrackMenuItem.prototype.onClick=function(){
vjs.MenuItem.prototype.onClick.call(this),this.player_.showTextTrack(this.track.id_,this.track.kind());
},vjs.TextTrackMenuItem.prototype.update=function(){
this.selected(2==this.track.mode());
},vjs.OffTextTrackMenuItem=vjs.TextTrackMenuItem.extend({
init:function(t,e){
e.track={
kind:function(){
return e.kind;
},
player:t,
label:function(){
return e.kind+" off";
},
dflt:function(){
return!1;
},
mode:function(){
return!1;
}
},vjs.TextTrackMenuItem.call(this,t,e),this.selected(!0);
}
}),vjs.OffTextTrackMenuItem.prototype.onClick=function(){
vjs.TextTrackMenuItem.prototype.onClick.call(this),this.player_.showTextTrack(this.track.id_,this.track.kind());
},vjs.OffTextTrackMenuItem.prototype.update=function(){
for(var t,e=this.player_.textTracks(),s=0,n=e.length,o=!0;n>s;s++)t=e[s],t.kind()==this.track.kind()&&2==t.mode()&&(o=!1);
this.selected(o);
},vjs.TextTrackButton=vjs.MenuButton.extend({
init:function(t,e){
vjs.MenuButton.call(this,t,e),this.items.length<=1&&this.hide();
}
}),vjs.TextTrackButton.prototype.createItems=function(){
var t,e=[];
e.push(new vjs.OffTextTrackMenuItem(this.player_,{
kind:this.kind_
}));
for(var s=0;s<this.player_.textTracks().length;s++)t=this.player_.textTracks()[s],
t.kind()===this.kind_&&e.push(new vjs.TextTrackMenuItem(this.player_,{
track:t
}));
return e;
},vjs.CaptionsButton=vjs.TextTrackButton.extend({
init:function(t,e,s){
vjs.TextTrackButton.call(this,t,e,s),this.el_.setAttribute("aria-label","Captions Menu");
}
}),vjs.CaptionsButton.prototype.kind_="captions",vjs.CaptionsButton.prototype.buttonText="Captions",
vjs.CaptionsButton.prototype.className="vjs-captions-button",vjs.SubtitlesButton=vjs.TextTrackButton.extend({
init:function(t,e,s){
vjs.TextTrackButton.call(this,t,e,s),this.el_.setAttribute("aria-label","Subtitles Menu");
}
}),vjs.SubtitlesButton.prototype.kind_="subtitles",vjs.SubtitlesButton.prototype.buttonText="Subtitles",
vjs.SubtitlesButton.prototype.className="vjs-subtitles-button",vjs.ChaptersButton=vjs.TextTrackButton.extend({
init:function(t,e,s){
vjs.TextTrackButton.call(this,t,e,s),this.el_.setAttribute("aria-label","Chapters Menu");
}
}),vjs.ChaptersButton.prototype.kind_="chapters",vjs.ChaptersButton.prototype.buttonText="Chapters",
vjs.ChaptersButton.prototype.className="vjs-chapters-button",vjs.ChaptersButton.prototype.createItems=function(){
for(var t,e=[],s=0;s<this.player_.textTracks().length;s++)t=this.player_.textTracks()[s],
t.kind()===this.kind_&&e.push(new vjs.TextTrackMenuItem(this.player_,{
track:t
}));
return e;
},vjs.ChaptersButton.prototype.createMenu=function(){
for(var t,e,s=this.player_.textTracks(),n=0,o=s.length,i=this.items=[];o>n;n++)if(t=s[n],
t.kind()==this.kind_&&t.dflt()){
if(t.readyState()<2)return this.chaptersTrack=t,void t.on("loaded",vjs.bind(this,this.createMenu));
e=t;
break;
}
var r=this.menu=new vjs.Menu(this.player_);
if(r.el_.appendChild(vjs.createEl("li",{
className:"vjs-menu-title",
innerHTML:vjs.capitalize(this.kind_),
tabindex:-1
})),e){
var a,l,c=e.cues_;
for(n=0,o=c.length;o>n;n++)a=c[n],l=new vjs.ChaptersTrackMenuItem(this.player_,{
track:e,
cue:a
}),i.push(l),r.addChild(l);
}
return this.items.length>0&&this.show(),r;
},vjs.ChaptersTrackMenuItem=vjs.MenuItem.extend({
init:function(t,e){
var s=this.track=e.track,n=this.cue=e.cue,o=t.currentTime();
e.label=n.text,e.selected=n.startTime<=o&&o<n.endTime,vjs.MenuItem.call(this,t,e),
s.on("cuechange",vjs.bind(this,this.update));
}
}),vjs.ChaptersTrackMenuItem.prototype.onClick=function(){
vjs.MenuItem.prototype.onClick.call(this),this.player_.currentTime(this.cue.startTime),
this.update(this.cue.startTime);
},vjs.ChaptersTrackMenuItem.prototype.update=function(){
var t=this.cue,e=this.player_.currentTime();
this.selected(t.startTime<=e&&e<t.endTime);
},vjs.obj.merge(vjs.ControlBar.prototype.options_.children,{
subtitlesButton:{},
captionsButton:{},
chaptersButton:{}
}),vjs.JSON,"undefined"!=typeof window.JSON&&"function"===window.JSON.parse)vjs.JSON=window.JSON;else{
vjs.JSON={};
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
vjs.JSON.parse=function(text,reviver){
function walk(t,e){
var s,n,o=t[e];
if(o&&"object"==typeof o)for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(n=walk(o,s),
void 0!==n?o[s]=n:delete o[s]);
return reviver.call(t,e,o);
}
var j;
if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){
return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4);
})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),
"function"==typeof reviver?walk({
"":j
},""):j;
throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
};
}
return vjs.autoSetup=function(){
var t,e,s,n=document.getElementsByTagName("video");
if(n&&n.length>0)for(var o=0,i=n.length;i>o;o++){
if(e=n[o],!e||!e.getAttribute){
vjs.autoSetupTimeout(1);
break;
}
void 0===e.player&&(t=e.getAttribute("data-setup"),null!==t&&(t=vjs.JSON.parse(t||"{}"),
s=videojs(e,t)));
}else vjs.windowLoaded||vjs.autoSetupTimeout(1);
},vjs.autoSetupTimeout=function(t){
setTimeout(vjs.autoSetup,t);
},vjs.one(window,"load",function(){
vjs.windowLoaded=!0;
}),vjs.autoSetupTimeout(1),vjs.plugin=function(t,e){
vjs.Player.prototype[t]=e;
},videojs;
});define("tpl/media/appmsg_edit/image_article_content.html.js",[],function(){
return'<div class="preview_media_context">\n  {each share_imageinfo as d}\n  <div class="preview_img_context">\n    {if d.cdn_url}\n    <img class="preview_img" src="{d.cdn_url}" alt="">\n    {else}\n    <img class="preview_img" src="http://shp.qpic.cn/qqvideo/0/m0564d1uhq6/400" alt="">\n    {/if}\n    <button class="js_replace_media preview_media_replace_btn">\n      <svg width="17" height="13" viewBox="0 0 17 13" xmlns="http://www.w3.org/2000/svg"><path d="M4.05 11H16a1 1 0 0 0 0-2H4.015l-.017-.988a.5.5 0 0 0-.811-.383L.565 9.711a.5.5 0 0 0 .014.793l2.693 1.989a.5.5 0 0 0 .797-.411L4.049 11zm9.02-9H2a1 1 0 1 0 0 2h11.035l-.017 1.002a.5.5 0 0 0 .794.413l2.684-1.953a.5.5 0 0 0 .014-.798L13.895.618a.5.5 0 0 0-.808.386L13.07 2z"/></svg>\n      替换素材    </button>\n  </div>\n  {/each}\n</div>';
});define("tpl/media/img.html.js",[],function(){
return'<div class="appmsgSendedItem simple_img">\n	<!-- 付费表情不用能a标签 -->\n	{if (!payEmoji)}\n    <a class="title_wrp" href="/cgi-bin/getimgdata?token={token}&msgid={msgid}&mode=large&source={source}&fileId={id}&ow={ow}" target="_blank">\n    {else}\n    <span class="title_wrp">\n    {/if}\n        <!-- <img class="icon" src="/cgi-bin/getimgdata?token={token}&msgid={msgid}&mode=small&source={source}&fileId={id}&ow={ow}"> -->\n        <span class="js_media_img icon cover" style="background-image:url(/cgi-bin/getimgdata?token={token}&msgid={msgid}&mode=small&source={source}&fileId={id}&ow={ow});"></span>\n        <span class="title">[图片]</span>\n    {if (!payEmoji)}\n    </a>\n    {else}\n	</span>\n	{/if}\n</div>\n';
});define("tpl/tooltip.html.js",[],function(){
return'<div class="tooltip">\n    <div class="tooltip_inner">{content}</div>\n    <i class="tooltip_arrow"></i>\n</div>\n';
});define("common/wx/richEditor/undoManager.js",[],function(){
"use strict";
function t(){
this.list=[],this.index=0;
}
return t.prototype.undo=function(){
return this.hasUndo?(this.index--,this.list[this.index-1]):void 0;
},t.prototype.redo=function(){
return this.hasRedo?this.list[this.index++]:void 0;
},t.prototype.save=function(t){
this.list[this.index-1]!==t&&(this.list.length=this.index,this.list[this.index++]=t);
},t.prototype.dump=function(){
return{
list:this.list,
index:this.index
};
},t.prototype.undump=function(t){
this.list=t.list,this.index=t.index,"function"==typeof this.onUndump&&this.onUndump.call(null);
},t.prototype.onUndump=function(t){
"function"==typeof t&&(this.onUndump=t);
},Object.defineProperties(t.prototype,{
hasUndo:{
get:function(){
return this.index>1;
}
},
hasRedo:{
get:function(){
return this.index<this.list.length;
}
}
}),t;
});define("common/wx/richEditor/wysiwyg.js",["common/wx/richEditor/editorRange.js","common/qq/Class.js","biz_common/utils/emoji_data.js"],function(e,t,n){
"use strict";
for(var i=/msie/.test(navigator.userAgent.toLowerCase()),a="Wysiwyg",o=e("common/wx/richEditor/editorRange.js"),s="​",r=new RegExp(s,"g"),l=e("common/qq/Class.js"),d=e("biz_common/utils/emoji_data.js"),c='<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="mo-#name#"></a>',u={},h=0,m=d.length;m>h;h++){
var f=d[h];
f.cn&&!u[f.cn]&&(u[f.cn]={
index:h
}),f.hk&&!u[f.hk]&&(u[f.hk]={
index:h
}),f.us&&!u[f.us]&&(u[f.us]={
index:h
});
}
var p=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(u[e]&&d[u[e].index]){
var t=d[u[e].index];
return c.replace("#name#",e).replace("#style#",t.style);
}
return e;
}):e;
},g=void 0,v=l.declare({
init:function(e,t){
var n=e,i=$('<div class="edit_area"></div>');
this._dom$=n,this._val="",this._lastRange=null,this._editArea$=i,$.extend(this,t),
this._initEditArea(),this._initEvent(),window.UE&&(this._selection=new window.UE.dom.Selection(document));
},
_initEvent:function(){
var e=this,t=function(){
e.__tid&&clearTimeout(e.__tid),e.__tid=setTimeout(function(){
e._filterNode(),e.change&&e.change();
},10);
};
e._editArea$.bind({
keydown:function(t){
e._keydown(t);
},
keyup:function(t){
e._keyup(t);
},
compositionend:function(t){
e._compositionend(t);
},
mouseup:function(t){
e._mouseup(t);
},
drop:t,
paste:t
});
},
_keydown:function(e){
var t=this,n=wx.isHotkey;
if(n(e,"backspace")){
"<br>"==$.trim(t._editArea$.html()).replace(r,"")&&t._editArea$.html(s);
var a=o.getSelection();
a.type&&"control"===a.type.toLowerCase()&&(e.preventDefault(),a.clear());
}
if(n(e,"ctrlenter")||n(e,"altenter")||n(e,"enter"))if(e.preventDefault(),window.UE){
var l=this.getSelectionRange();
if(l.collapsed){
var d=window.UE.dom.domUtils,c=d.findParentByTagName(l.startContainer,"A");
c&&(0==l.startOffset?l.setStartBefore(c).setEndBefore(c).select():l.selectNode(c).collapse().select());
}
var l=o.getRange();
if(!l)return t;
if(l.createContextualFragment){
var u='<br/><img style="width:1px;height:1px;"></img>',h=l.createContextualFragment(u),m=h.lastChild;
l.deleteContents(),l.insertNode(h),l.setEndAfter(m),l.setStartAfter(m);
var a=o.getSelection();
a.removeAllRanges(),a.addRange(l),m.offsetTop+17>t._editArea$[0].clientHeight+t._editArea$[0].scrollTop&&t._editArea$.scrollTop(m.offsetTop),
document.execCommand("Delete",!1,null);
}else i&&/>$/.test(u),!!u&&l.pasteHTML&&l.pasteHTML(u),l.collapse&&l.collapse(!1),
l.select();
}else t.insertHTML("<br/>")._saveRang();
t.keydown&&t.keydown(e);
},
_keyup:function(e){
var t=this,n=$.trim(t._editArea$.html()).replace(r,"");
n||g||t._editArea$.html(s),t._saveRang(),t.keyup&&t.keyup(e),t.save();
},
_compositionend:function(e){
var t=this;
t._saveRang(),t.keyup&&t.keyup(e),t.save();
},
_mouseup:function(e){
var t=this;
setTimeout(function(){
t._saveRang();
},0),t.mouseup&&t.mouseup(e);
},
focus:function(){
this._editArea$.focus(),this._resotreRange();
},
blur:function(){
this._editArea$.blur();
},
_setCursorToEnd:function(e){
if(i&&e){
var t=o.getSelection();
t.extend&&(t.extend(e,e.length),t.collapseToEnd&&t.collapseToEnd());
}
},
setCursorToEnd:function(){
var e=o.getSelection();
if(e&&this._editArea$[0])try{
this._editArea$[0].focus(),e.selectAllChildren(this._editArea$[0]),e.collapseToEnd();
}catch(t){
console.error(t);
}
},
insertHTML:function(e){
var t=this;
t.focus();
var n=o.getRange();
if(!n)return t;
if(n.createContextualFragment){
e+='<img style="width:1px;height:1px;"></img>';
var a=n.createContextualFragment(e),s=a.lastChild;
n.deleteContents(),n.insertNode(a),n.setEndAfter(s),n.setStartAfter(s);
var r=o.getSelection();
r.removeAllRanges(),r.addRange(n),document.execCommand("Delete",!1,null);
}else i&&/>$/.test(e),!!e&&n.pasteHTML&&n.pasteHTML(e),n.collapse&&n.collapse(!1),
n.select();
return t._saveRang().save(),t;
},
save:function(e){
var t=this,e=e||this.textFilter,n=t._editArea$.html();
return n=n.replace(r,""),t.val="function"==typeof e?e(n):n,t.change&&t.change(),
t;
},
_filterNode:function(e){
for(var t,n=this,e=e||this.nodeFilter,i=n._editArea$.get(0),a=i.childNodes,o=a.length-1;o>=0;o--){
var s=a[o];
switch(s.nodeType){
case 1:
if(this.showLinkAndWeapp&&"BR"!==s.nodeName.toUpperCase()&&"A"!==s.nodeName.toUpperCase()||!this.showLinkAndWeapp&&"BR"!==s.nodeName.toUpperCase()){
var r,l=!1;
if((r=e&&e(s))||(r=s.textContent||s.innerText||"",l=!0),l&&(r=r.replace(/\n/g,"")),
r){
var d=l?document.createTextNode(r):r;
!t&&(t=d),i.replaceChild(d,s);
}else i.removeChild(s);
}
break;

case 3:
break;

default:
i.removeChild(s);
}
}
if(console.log(t),!window.UE)return n._setCursorToEnd(t),n._saveRang().save();
if(t){
var c=this.getSelectionRange();
c.selectNode(t).collapse().select(!0);
}
},
getHTML:function(){
return this._editArea$.html();
},
getText:function(){
return this.getHTML().text();
},
getContent:function(e){
var t=this,n=this.textFilter,i=t._editArea$.html();
return i=i.replace(r,""),t.val="function"==typeof n?n(i,e):i,this.val;
},
setContent:function(e,t){
if(this.clear(),e=e||s,this._editArea$.html(e),!t)if("function"==typeof this.textFilter){
var n=this._editArea$.html().replace(r,"");
t=this.textFilter(n);
}else t=e;
this.val=t,this.setCursorToEnd(),this._saveRang(),this.change&&this.change();
},
clear:function(){
this.val="",this._editArea$.html(s);
},
_initEditArea:function(){
var e=this;
e._editArea$.attr("class",e._dom$.attr("class")).attr("placeholder",e._dom$.attr("placeholder")).attr("contentEditable",!0).css({
"overflow-y":"auto",
"overflow-x":"hidden"
}),e._dom$.after(e._editArea$).hide().data(a,e),e.init&&e.init();
},
_saveRang:function(){
return this._lastRange=o.getRange(),this;
},
_resotreRange:function(){
var e=this._lastRange;
if(e){
var t=o.getSelection();
if(t.addRange)t.removeAllRanges(),t.addRange(e);else{
var n=o.getRange();
n.setEndPoint&&(n.setEndPoint("EndToEnd",e),n.setEndPoint("StartToStart",e)),n.select();
}
}
return this;
},
getSelectionRange:function(){
return this._selection&&this._selection.getRange();
},
getSelectionText:function(){
return this._selection&&this._selection.getText();
},
optimize:function(e){
var t=window.UE.dom.domUtils,n=e.startContainer,i=e.endContainer;
(n=t.findParentByTagName(n,"a",!0))&&e.setStartBefore(n),(i=t.findParentByTagName(i,"a",!0))&&e.setEndAfter(i);
},
insertLink:function(e,t){
var n=window.UE.browser,i=window.UE.dom.domUtils,a=window.UE.utils,o=t.startContainer,s=t.cloneRange();
if(this.optimize(t=t.adjustmentBoundary()),1==o.nodeType&&(o=o.childNodes[t.startOffset],
o&&1==o.nodeType&&"A"==o.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(o[n.ie?"innerText":"textContent"])&&(o[n.ie?"innerText":"textContent"]=a.html(e.textValue||e.href))),
s.collapsed||(t.removeInlineStyle("a"),s=t.cloneRange()),s.collapsed){
var r=document.createElement("a"),l="";
e.textValue?(l=p(a.unhtml(e.textValue).replace(/\n/g,"<br>")),delete e.textValue):l=a.html(e.href),
i.setAttributes(r,e),o=i.findParentByTagName(s.startContainer,"a",!0),o&&i.isInNodeEndBoundary(s,o)&&t.setStartAfter(o).collapse(!0),
r.innerHTML=l,t.insertNode(r).selectNode(r);
}else t.applyInlineStyle("a",e);
return t.collapse().select(!0),this._saveRang().save(),this;
},
insertWeapp:function(e,t,n){
var i=window.UE.browser,a=window.UE.dom.domUtils,o=window.UE.utils,s=t.startContainer,r=t.cloneRange();
this.optimize(t=t.adjustmentBoundary()),1==s.nodeType&&(s=s.childNodes[t.startOffset],
s&&1==s.nodeType&&"A"==s.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(s[i.ie?"innerText":"textContent"])&&(s[i.ie?"innerText":"textContent"]=o.html(e.textValue||e.href))),
r.collapsed||(n||t.deleteContents(),r=t.cloneRange());
var l=document.createElement("a"),d="";
return e.textValue?(d=p(o.html(e.textValue).replace(/\n/g,"<br>")),delete e.textValue):d=o.html(e.href),
a.setAttributes(l,e),s=a.findParentByTagName(r.startContainer,"a",!0),s&&a.isInNodeEndBoundary(r,s)&&t.setStartAfter(s).collapse(!0),
l.innerHTML=d,t.insertNode(l).selectNode(l),n&&l.nextElementSibling.remove(),t.collapse().select(!0),
this._saveRang().save(),this;
},
emojiFormat:function(e){
return p(e);
}
}),_=function(e,t){
return e.data(a)||new v(e,t);
};
document.body.addEventListener("compositionstart",function(){
g=!0;
}),document.body.addEventListener("compositionend",function(){
g=!1;
}),n.exports=_;
});