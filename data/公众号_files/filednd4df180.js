define("3rd/webuploader/mediator.js",["3rd/webuploader/base.js"],function(t,n,e){var r,i=t("3rd/webuploader/base.js").$,c=[].slice,s=/\s+/
function u(t,n,e,r){return i.grep(t,function(t){return t&&(!n||t.e===n)&&(!e||t.cb===e||t.cb._cb===e)&&(!r||t.ctx===r)})}function o(t,e,r){i.each((t||"").split(s),function(t,n){r(n,e)})}function f(t,n){for(var e,r=!1,i=-1,c=t.length;++i<c;)if(!1===(e=t[i]).cb.apply(e.ctx2,n)){r=!0
break}return!r}return r={on:function(t,n,r){var i,c=this
return n&&(i=this._events||(this._events=[]),o(t,n,function(t,n){var e={e:t}
e.cb=n,e.ctx=r,e.ctx2=r||c,e.id=i.length,i.push(e)})),this},once:function(t,n,r){var i=this
return n&&o(t,n,function(t,n){var e=function(){return i.off(t,e),n.apply(r||i,arguments)}
e._cb=n,i.on(t,e,r)}),i},off:function(t,n,e){var r=this._events
return r&&(t||n||e?o(t,n,function(t,n){i.each(u(r,t,n,e),function(){delete r[this.id]})}):this._events=[]),this},trigger:function(t){var n,e,r
return this._events&&t?(n=c.call(arguments,1),e=u(this._events,t),r=u(this._events,"all"),f(e,n)&&f(r,arguments)):this}},i.extend({installTo:function(t){return i.extend(t,r)}},r)})
define("3rd/webuploader/lib/filepicker.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/lib/file.js","3rd/webuploader/lib/image.js"],function(e,i,t){var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/runtime/client.js"),a=e("3rd/webuploader/lib/file.js"),l=e("3rd/webuploader/lib/image.js"),u=r.$
function o(e){if((e=this.options=u.extend({},o.options,e)).container=u(e.id),!e.container.length)throw new Error('_("按钮指定错误")')
e.button=e.container,n.call(this,"FilePicker",!0)}return o.options={button:null,container:null,label:null,innerHTML:null,multiple:!0,accept:null},r.inherits(n,{constructor:o,init:function(){var o=this,s=o.options,i=s.button
i.addClass("webuploader-pick"),o.on("all",function(e){var r,n
switch(e){case"mouseenter":i.addClass("webuploader-pick-hover")
break
case"mouseleave":i.removeClass("webuploader-pick-hover")
break
case"change":r=o.exec("getFiles"),n=0,r=u.map(r,function(i){if((i=new a(o.getRuid(),i))._refer=s.container,s.imageSize&&~"image/jpeg,image/jpg,image/png,image/bmp,image/gif".indexOf(i.type)){var t=new l(s.compress||s.resize)
t.on("load",function(){var e=t.info()
i.width=e.width,i.height=e.height,++n==r.length&&o.trigger("select",r,s.container)}),t.on("error",function(){++n==r.length&&o.trigger("select",r,s.container)}),t.loadFromBlob(i)}else n++
return i}),n==r.length&&o.trigger("select",r,s.container)}}),o.connectRuntime(s,function(){o.refresh(),o.exec("init",s),o.trigger("ready")}),this._resizeHandler=r.bindFn(this.refresh,this),u(window).on("resize",this._resizeHandler),this.refreshInterval=setInterval(function(){o.refresh()},1e3)},refresh:function(){var e=this.getRuntime().getContainer(),i=this.options.button,t=i.outerWidth?i.outerWidth():i.width(),r=i.outerHeight?i.outerHeight():i.height(),n=i.offset()
try{i.is(":visible")||(t+=parseInt(i.css("min-width"))||0)}catch(e){}t&&r&&e.css({bottom:"auto",right:"auto",width:t+"px",height:r+"px"}).offset(n)},enable:function(){this.options.button.removeClass("webuploader-pick-disable"),this.refresh()},disable:function(){var e=this.options.button
this.getRuntime().getContainer().css({top:"-99999px"}),e.addClass("webuploader-pick-disable")},destroy:function(){var e=this.options.button
u(window).off("resize",this._resizeHandler),e.removeClass("webuploader-pick-disable webuploader-pick-hover webuploader-pick"),clearInterval(this.refreshInterval)}}),o})
define("3rd/webuploader/runtime/client.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/runtime/runtime.js"],function(e,t,n){var o,r,u=e("3rd/webuploader/base.js"),i=e("3rd/webuploader/mediator.js"),d=e("3rd/webuploader/runtime/runtime.js")
function s(t,n){var r,e,i=u.Deferred()
this.uid=u.guid("client_"),this.runtimeReady=function(e){return i.done(e)},this.connectRuntime=function(e,t){if(r)throw new Error("already connected!")
return i.done(t),"string"==typeof e&&o.get(e)&&(r=o.get(e)),(r=r||o.get(null,n))?(u.$.extend(r.options,e),r.__promise.then(i.resolve),r.__client++):((r=d.create(e,e.runtimeOrder)).__promise=i.promise(),r.once("ready",i.resolve),r.init(),o.add(r),r.__client=1),n&&(r.__standalone=n),r},this.getRuntime=function(){return r},this.disconnectRuntime=function(){r&&(r.__client--,r.__client<=0&&(o.remove(r),delete r.__promise,r.destroy()),r=null)},this.exec=function(){if(r){var e=u.slice(arguments)
return t&&e.unshift(t),r.exec.apply(this,e)}},this.getRuid=function(){return r&&r.uid},this.destroy=(e=this.destroy,function(){e&&e.apply(this,arguments),this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()})}return r={},o={add:function(e){r[e.uid]=e},get:function(e,t){var n
if(e)return r[e]
for(n in r)if(!t||!r[n].__standalone)return r[n]
return null},remove:function(e){delete r[e.uid]}},i.installTo(s.prototype),s})
define("3rd/webuploader/runtime/runtime.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,n){function r(t){for(var e in t)if(t.hasOwnProperty(e))return e
return null}var o=t("3rd/webuploader/base.js"),i=t("3rd/webuploader/mediator.js"),a=o.$,s={}
function d(t){this.options=a.extend({container:document.body},t),this.uid=o.guid("rt_")}return a.extend(d.prototype,{getContainer:function(){var t,e,n=this.options
return this._container?this._container:(t=a(n.container||document.body).parent(),(e=a(document.createElement("div"))).attr("id","rt_"+this.uid),e.css({position:"absolute",top:"0px",left:"0px",width:"1px",height:"1px",overflow:"hidden"}),t.append(e),t.addClass("webuploader-container"),this._container=e,this._parent=t,e)},init:o.noop,exec:o.noop,destroy:function(){this._container&&this._container.remove(),this._parent&&this._parent.removeClass("webuploader-container"),this.off()}}),d.orders="html5,flash",d.addRuntime=function(t,e){s[t]=e},d.hasRuntime=function(t){return!!(t?s[t]:r(s))},d.create=function(t,e){var n
if(e=e||d.orders,a.each(e.split(/\s*,\s*/g),function(){if(s[this])return n=this,!1}),!(n=n||r(s)))throw new Error("Runtime Error")
return new s[n](t)},i.installTo(d.prototype),d})
define("3rd/webuploader/lib/file.js",["3rd/webuploader/base.js","3rd/webuploader/lib/blob.js"],function(e,t,a){var i=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/lib/blob.js"),o=1,s=/\.([^.]+)$/
return i.inherits(r,function(e,t){var a
this.name=t.name||"untitled"+o++,!(a=s.exec(t.name)?RegExp.$1.toLowerCase():"")&&t.type&&(a=/\/(jpg|jpeg|png|gif|bmp)$/i.exec(t.type)?RegExp.$1.toLowerCase():"",this.name+="."+a),this.ext=a,this.lastModifiedDate=t.lastModifiedDate||(new Date).toLocaleString(),r.apply(this,arguments)})})
define("3rd/webuploader/lib/blob.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js"],function(e,t,i){var r=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/runtime/client.js")
function n(e,t){var i=this
i.source=t,i.ruid=e,this.size=t.size||0,!t.type&&this.ext&&~"jpg,jpeg,png,gif,bmp".indexOf(this.ext)?this.type="image/"+("jpg"===this.ext?"jpeg":this.ext):this.type=t.type||"application/octet-stream",s.call(i,"Blob"),this.uid=t.uid||this.uid,e&&i.connectRuntime(e)}return r.inherits(s,{constructor:n,slice:function(e,t){return this.exec("slice",e,t)},getSource:function(){return this.source}}),n})
define("3rd/webuploader/lib/image.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/lib/blob.js"],function(e,t,i){var n=e("3rd/webuploader/base.js"),o=e("3rd/webuploader/runtime/client.js"),r=e("3rd/webuploader/lib/blob.js"),s=n.$
function a(e){this.options=s.extend({},a.options,e),o.call(this,"Image"),this.on("load",function(){this._info=this.exec("info"),this._meta=this.exec("meta")})}return a.options={quality:90,crop:!1,preserveHeaders:!1,allowMagnify:!1},n.inherits(o,{constructor:a,info:function(e){return e?(this._info=e,this):this._info},meta:function(e){return e?(this._meta=e,this):this._meta},loadFromBlob:function(e){var t=this,i=e.getRuid()
this.connectRuntime(i,function(){t.exec("init",t.options),t.exec("loadFromBlob",e)})},resize:function(){var e=n.slice(arguments)
return this.exec.apply(this,["resize"].concat(e))},crop:function(){var e=n.slice(arguments)
return this.exec.apply(this,["crop"].concat(e))},getAsDataUrl:function(e){return this.exec("getAsDataUrl",e)},getAsBlob:function(e,t){var i=t?this.exec("getAsBlob",e,t):this.exec("getAsBlob",e)
return new r(this.getRuid(),i)}}),a})
define("3rd/webuploader/widgets/widget.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js"],function(e,n,t){var h=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/uploader.js"),l=h.$,o=r.prototype._init,i=r.prototype.destroy,f={},s=[]
function p(e){this.owner=e,this.options=e.options}return l.extend(p.prototype,{init:h.noop,invoke:function(e,n){var t=this.responseMap
return t&&e in t&&t[e]in this&&l.isFunction(this[t[e]])?this[t[e]].apply(this,n):f},request:function(){return this.owner.request.apply(this.owner,arguments)}}),l.extend(r.prototype,{_init:function(){var t=this,r=t._widgets=[],i=t.options.disableWidgets||""
return l.each(s,function(e,n){i&&~i.indexOf(n._name)||r.push(new n(t))}),o.apply(t,arguments)},request:function(e,n,t){var r,i,o,s=0,p=this._widgets,u=p&&p.length,a=[],d=[]
for(n=function(e){if(!e)return!1
var n=e.length,t=l.type(e)
return!(1!==e.nodeType||!n)||("array"===t||"function"!==t&&"string"!==t&&(0===n||"number"==typeof n&&0<n&&n-1 in e))}(n)?n:[n];s<u;s++)(r=p[s].invoke(e,n))!==f&&(h.isPromise(r)?d.push(r):a.push(r))
return t||d.length?(i=h.when.apply(h,d))[o=i.pipe?"pipe":"then"](function(){var e=h.Deferred(),n=arguments
return 1===n.length&&(n=n[0]),setTimeout(function(){e.resolve(n)},1),e.promise()})[t?o:"done"](t||h.noop):a[0]},destroy:function(){i.apply(this,arguments),this._widgets=null}}),r.register=p.register=function(e,n){var t,r={init:"init",destroy:"destroy",name:"anonymous"}
return 1===arguments.length?(n=e,l.each(n,function(e){"_"!==e[0]&&"name"!==e?r[e.replace(/[A-Z]/g,"-$&").toLowerCase()]=e:"name"===e&&(r.name=n.name)})):r=l.extend(r,e),n.responseMap=r,(t=h.inherits(p,n))._name=r.name,s.push(t),t},r.unRegister=p.unRegister=function(e){if(e&&"anonymous"!==e)for(var n=s.length;n--;)s[n]._name===e&&s.splice(n,1)},p})
define("3rd/webuploader/widgets/queue.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/queue.js","3rd/webuploader/file.js","3rd/webuploader/lib/file.js","3rd/webuploader/runtime/client.js","3rd/webuploader/widgets/widget.js"],function(e,t,r){var o=e("3rd/webuploader/base.js"),i=e("3rd/webuploader/uploader.js"),d=e("3rd/webuploader/queue.js"),u=e("3rd/webuploader/file.js"),s=e("3rd/webuploader/lib/file.js"),c=e("3rd/webuploader/runtime/client.js")
e("3rd/webuploader/widgets/widget.js")
var p=o.$,n=u.Status
return i.register({name:"queue",init:function(e){var t,r,i,u,s,n,a,l=this
if(p.isPlainObject(e.accept)&&(e.accept=[e.accept]),e.accept){for(s=[],i=0,r=e.accept.length;i<r;i++)(u=e.accept[i].extensions)&&s.push(u)
s.length&&(n="\\."+s.join(",").replace(/,/g,"$|\\.").replace(/\*/g,".*")+"$"),l.accept=new RegExp(n,"i")}if(l.queue=new d,l.stats=l.queue.stats,"html5"===this.request("predict-runtime-type"))return t=o.Deferred(),this.placeholder=a=new c("Placeholder"),a.connectRuntime({runtimeOrder:"html5"},function(){l._ruid=a.getRuid(),t.resolve()}),t.promise()},_wrapFile:function(e){if(!(e instanceof u)){if(!(e instanceof s)){if(!this._ruid)throw new Error("Can't add external files.")
e=new s(this._ruid,e)}e=new u(e)}return e},acceptFile:function(e){return!(!e||!e.size||this.accept&&!this.accept.test(e.name))},_addFile:function(e){var t=this
if(e=t._wrapFile(e),t.owner.trigger("beforeFileQueued",e)){if(t.acceptFile(e))return t.queue.append(e),t.owner.trigger("fileQueued",e),e
t.owner.trigger("error","Q_TYPE_DENIED",e)}},getFile:function(e){return this.queue.getFile(e)},addFile:function(e){var t=this
e.length||(e=[e]),e=p.map(e,function(e){return t._addFile(e)}),t.owner.trigger("filesQueued",e),t.options.auto&&setTimeout(function(){t.request("start-upload")},20)},getStats:function(){return this.stats},removeFile:function(e,t){e=e.id?e:this.queue.getFile(e),this.request("cancel-file",e),t&&this.queue.removeFile(e)},getFiles:function(){return this.queue.getFiles.apply(this.queue,arguments)},fetchFile:function(){return this.queue.fetch.apply(this.queue,arguments)},retry:function(e,t){var r,i,u,s=this
if(e)return(e=e.id?e:s.queue.getFile(e)).setStatus(n.QUEUED),void(t||s.request("start-upload"))
for(i=0,u=(r=s.queue.getFiles(n.ERROR)).length;i<u;i++)(e=r[i]).setStatus(n.QUEUED)
s.request("start-upload")},sortFiles:function(){return this.queue.sort.apply(this.queue,arguments)},reset:function(){this.owner.trigger("reset"),this.queue=new d,this.stats=this.queue.stats},destroy:function(){this.reset(),this.placeholder&&this.placeholder.destroy()}})})
define("3rd/webuploader/queue.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js","3rd/webuploader/file.js"],function(e,t,u){var n=e("3rd/webuploader/base.js"),s=e("3rd/webuploader/mediator.js"),a=e("3rd/webuploader/file.js"),r=n.$,i=a.Status
function o(){this.stats={numOfQueue:0,numOfSuccess:0,numOfCancel:0,numOfProgress:0,numOfUploadFailed:0,numOfInvalid:0,numofDeleted:0,numofInterrupt:0},this._queue=[],this._map={}}return r.extend(o.prototype,{append:function(e){return this._queue.push(e),this._fileAdded(e),this},prepend:function(e){return this._queue.unshift(e),this._fileAdded(e),this},getFile:function(e){return"string"!=typeof e?e:this._map[e]},fetch:function(e){var t,u,n=this._queue.length
for(e=e||i.QUEUED,t=0;t<n;t++)if(e===(u=this._queue[t]).getStatus())return u
return null},sort:function(e){"function"==typeof e&&this._queue.sort(e)},getFiles:function(){for(var e,t=[].slice.call(arguments,0),u=[],n=0,s=this._queue.length;n<s;n++)e=this._queue[n],t.length&&!~r.inArray(e.getStatus(),t)||u.push(e)
return u},removeFile:function(e){this._map[e.id]&&(delete this._map[e.id],e.destroy(),this.stats.numofDeleted++)},_fileAdded:function(e){var u=this
this._map[e.id]||(this._map[e.id]=e).on("statuschange",function(e,t){u._onFileStatusChange(e,t)})},_onFileStatusChange:function(e,t){var u=this.stats
switch(t){case i.PROGRESS:u.numOfProgress--
break
case i.QUEUED:u.numOfQueue--
break
case i.ERROR:u.numOfUploadFailed--
break
case i.INVALID:u.numOfInvalid--
break
case i.INTERRUPT:u.numofInterrupt--}switch(e){case i.QUEUED:u.numOfQueue++
break
case i.PROGRESS:u.numOfProgress++
break
case i.ERROR:u.numOfUploadFailed++
break
case i.COMPLETE:u.numOfSuccess++
break
case i.CANCELLED:u.numOfCancel++
break
case i.INVALID:u.numOfInvalid++
break
case i.INTERRUPT:u.numofInterrupt++}}}),s.installTo(o.prototype),o})
define("3rd/webuploader/file.js",["3rd/webuploader/base.js","3rd/webuploader/mediator.js"],function(t,e,i){var s=t("3rd/webuploader/base.js"),r=t("3rd/webuploader/mediator.js"),a=s.$,d="WU_FILE_",o=0,n=/\.([^.]+)$/,h={}
function u(t){this.name=t.name||"Untitled",this.size=t.size||0,this.width=t.width||-1,this.height=t.height||-1,this.type=t.type||"application/octet-stream",this.lastModifiedDate=t.lastModifiedDate||1*new Date,this.id=d+o++,this.ext=n.exec(this.name)?RegExp.$1:"",this.statusText="",h[this.id]=u.Status.INITED,this.source=t,this.loaded=0,this.on("error",function(t){this.setStatus(u.Status.ERROR,t)})}return a.extend(u.prototype,{setStatus:function(t,e){var i=h[this.id]
void 0!==e&&(this.statusText=e),t!==i&&(h[this.id]=t,this.trigger("statuschange",t,i))},getStatus:function(){return h[this.id]},getSource:function(){return this.source},destroy:function(){this.off(),delete h[this.id]}}),r.installTo(u.prototype),u.Status={INITED:"inited",QUEUED:"queued",PROGRESS:"progress",ERROR:"error",COMPLETE:"complete",CANCELLED:"cancelled",INTERRUPT:"interrupt",INVALID:"invalid"},u})
define("3rd/webuploader/widgets/runtime.js",["3rd/webuploader/uploader.js","3rd/webuploader/runtime/runtime.js","3rd/webuploader/widgets/widget.js"],function(e,r,t){var i=e("3rd/webuploader/uploader.js"),u=e("3rd/webuploader/runtime/runtime.js")
return e("3rd/webuploader/widgets/widget.js"),i.support=function(){return u.hasRuntime.apply(u,arguments)},i.register({name:"runtime",init:function(){if(!this.predictRuntimeType())throw Error("Runtime Error")},predictRuntimeType:function(){var e,r,t=this.options.runtimeOrder||u.orders,i=this.type
if(!i)for(e=0,r=(t=t.split(/\s*,\s*/g)).length;e<r;e++)if(u.hasRuntime(t[e])){this.type=i=t[e]
break}return i}})})
define("3rd/webuploader/widgets/upload.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/file.js","3rd/webuploader/lib/transport.js","3rd/webuploader/widgets/widget.js"],function(t,e,r){var p=t("3rd/webuploader/base.js"),i=t("3rd/webuploader/uploader.js"),n=t("3rd/webuploader/file.js"),c=t("3rd/webuploader/lib/transport.js")
t("3rd/webuploader/widgets/widget.js")
var d=p.$,o=p.isPromise,f=n.Status
d.extend(i.options,{prepareNextFile:!1,chunked:!1,chunkSize:5242880,chunkRetry:2,threads:3,formData:{}}),i.register({name:"upload",init:function(){var t=this.owner,e=this
this.runing=!1,this.progress=!1,t.on("startUpload",function(){e.progress=!0}).on("uploadFinished",function(){e.progress=!1}),this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this.__tick=p.bindFn(this._tick,this),t.on("uploadComplete",function(t){t.blocks&&d.each(t.blocks,function(t,e){e.transport&&(e.transport.abort(),e.transport.destroy()),delete e.transport}),delete t.blocks,delete t.remaning})},reset:function(){this.request("stop-upload",!0),this.runing=!1,this.pool=[],this.stack=[],this.pending=[],this.remaning=0,this._trigged=!1,this._promise=null},startUpload:function(r){var i=this
if(d.each(i.request("get-files",f.INVALID),function(){i.request("remove-file",this)}),r)if((r=r.id?r:i.request("get-file",r)).getStatus()===f.INTERRUPT)d.each(i.pool,function(t,e){e.file===r&&e.transport&&e.transport.send()}),r.setStatus(f.QUEUED)
else{if(r.getStatus()===f.PROGRESS)return
r.setStatus(f.QUEUED)}else d.each(i.request("get-files",[f.INITED]),function(){this.setStatus(f.QUEUED)})
if(!i.runing){i.runing=!0
var n=[]
for(d.each(i.pool,function(t,e){var r=e.file
r.getStatus()===f.INTERRUPT&&(n.push(r),i._trigged=!1,e.transport&&e.transport.send())});r=n.shift();)r.setStatus(f.PROGRESS)
r||d.each(i.request("get-files",f.INTERRUPT),function(){this.setStatus(f.PROGRESS)}),i._trigged=!1,p.nextTick(i.__tick),i.owner.trigger("startUpload")}},stopUpload:function(r,t){var i=this
if(!0===r&&(t=r,r=null),!1!==i.runing){if(r){if((r=r.id?r:i.request("get-file",r)).getStatus()!==f.PROGRESS&&r.getStatus()!==f.QUEUED)return
return r.setStatus(f.INTERRUPT),d.each(i.pool,function(t,e){e.file===r&&(e.transport&&e.transport.abort(),i._putback(e),i._popBlock(e))}),p.nextTick(i.__tick)}i.runing=!1,this._promise&&this._promise.file&&this._promise.file.setStatus(f.INTERRUPT),t&&d.each(i.pool,function(t,e){e.transport&&e.transport.abort(),e.file.setStatus(f.INTERRUPT)}),i.owner.trigger("stopUpload")}},cancelFile:function(t){(t=t.id?t:this.request("get-file",t)).blocks&&d.each(t.blocks,function(t,e){var r=e.transport
r&&(r.abort(),r.destroy(),delete e.transport)}),t.setStatus(f.CANCELLED),this.owner.trigger("fileDequeued",t)},isInProgress:function(){return!!this.progress},_getStats:function(){return this.request("get-stats")},skipFile:function(t,e){(t=t.id?t:this.request("get-file",t)).setStatus(e||f.COMPLETE),t.skipped=!0,t.blocks&&d.each(t.blocks,function(t,e){var r=e.transport
r&&(r.abort(),r.destroy(),delete e.transport)}),this.owner.trigger("uploadSkip",t)},_tick:function(){var t,e,r=this,i=r.options
if(r._promise)return r._promise.always(r.__tick)
r.pool.length<i.threads&&(e=r._nextBlock())?(r._trigged=!1,t=function(t){r._promise=null,t&&t.file&&r._startSend(t),p.nextTick(r.__tick)},r._promise=o(e)?e.always(t):t(e)):r.remaning||r._getStats().numOfQueue||r._getStats().numofInterrupt||(r.runing=!1,r._trigged||p.nextTick(function(){r.owner.trigger("uploadFinished",r._getStats())}),r._trigged=!0)},_putback:function(t){t.cuted.unshift(t),~this.stack.indexOf(t.cuted)||this.stack.unshift(t.cuted)},_getStack:function(){for(var t,e=0;t=this.stack[e++];){if(t.has()&&t.file.getStatus()===f.PROGRESS)return t
t.has()&&(t.file.getStatus()===f.PROGRESS||t.file.getStatus()===f.INTERRUPT)||this.stack.splice(--e,1)}return null},_nextBlock:function(){var e,t,r,i,n=this,s=n.options
return(e=this._getStack())?(s.prepareNextFile&&!n.pending.length&&n._prepareNextFile(),e.shift()):n.runing?(!n.pending.length&&n._getStats().numOfQueue&&n._prepareNextFile(),t=n.pending.shift(),r=function(t){return t?(e=function(t,e){var r,i,n=[],s=t.source.size,o=e?Math.ceil(s/e):1,a=0,u=0
for(i={file:t,has:function(){return!!n.length},shift:function(){return n.shift()},unshift:function(t){n.unshift(t)}};u<o;)r=Math.min(e,s-a),n.push({file:t,start:a,end:e?a+r:s,total:s,chunks:o,chunk:u++,cuted:i}),a+=r
return t.blocks=n.concat(),t.remaning=n.length,i}(t,s.chunked?s.chunkSize:0),n.stack.push(e),e.shift()):null},o(t)?(i=t.file,(t=t[t.pipe?"pipe":"then"](r)).file=i,t):r(t)):void 0},_prepareNextFile:function(){var e,r=this,i=r.request("fetch-file"),n=r.pending
i&&(e=r.request("before-send-file",i,function(){return i.getStatus()===f.PROGRESS||i.getStatus()===f.INTERRUPT?i:r._finishFile(i)}),r.owner.trigger("uploadStart",i),i.setStatus(f.PROGRESS),e.file=i,e.done(function(){var t=d.inArray(e,n)
~t&&n.splice(t,1,i)}),e.fail(function(t){var e=r.options.compress
i.setStatus(f.ERROR,t),"F_EXCEED_COMPRESS_SIZE"==t&&r.owner.trigger("error",t,e&&e.afterCompressSizeLimit,i),r.owner.trigger("uploadError",i,t),r.owner.trigger("uploadComplete",i)}),n.push(e))},_popBlock:function(t){var e=d.inArray(t,this.pool)
this.pool.splice(e,1),t.file.remaning--,this.remaning--},_startSend:function(t){var e=this,r=t.file
r.getStatus()===f.PROGRESS?(e.pool.push(t),e.remaning++,t.blob=1===t.chunks?r.source:r.source.slice(t.start,t.end),e.request("before-send",t,function(){r.getStatus()===f.PROGRESS?e._doSend(t):(e._popBlock(t),p.nextTick(e.__tick))}).fail(function(){1===r.remaning?e._finishFile(r).always(function(){t.percentage=1,e._popBlock(t),e.owner.trigger("uploadComplete",r),p.nextTick(e.__tick)}):(t.percentage=1,e.updateFileProgress(r),e._popBlock(t),p.nextTick(e.__tick))})):r.getStatus()===f.INTERRUPT&&e._putback(t)},_doSend:function(r){var i,n,e=this,s=e.owner,o=e.options,a=r.file,u=new c(o),t=d.extend({},o.formData),l=d.extend({},o.headers);(r.transport=u).on("destroy",function(){delete r.transport,e._popBlock(r),p.nextTick(e.__tick)}),u.on("progress",function(t){r.percentage=t,e.updateFileProgress(a)}),i=function(e){var t
return(n=u.getResponseAsJson()||{})._raw=u.getResponse(),t=function(t){e=t},s.trigger("uploadAccept",r,n,t)||(e=e||"server"),e},u.on("error",function(t,e){r.retried=r.retried||0,1<r.chunks&&~"http,abort".indexOf(t)&&r.retried<o.chunkRetry?(r.retried++,u.send()):(e||"server"!==t||(t=i(t)),a.setStatus(f.ERROR,t),s.trigger("uploadError",a,t),s.trigger("uploadComplete",a))}),u.on("load",function(){var t;(t=i())?u.trigger("error",t,!0):1===a.remaning?e._finishFile(a,n):u.destroy()}),t=d.extend(t,{id:a.id,name:a.name,type:a.type,lastModifiedDate:a.lastModifiedDate,size:a.size}),1<r.chunks&&d.extend(t,{chunks:r.chunks,chunk:r.chunk}),s.trigger("uploadBeforeSend",r,t,l),u.appendBlob(o.fileVal,r.blob,a.name),u.append(t),u.setRequestHeader(l),u.send()},_finishFile:function(e,t,r){var i=this,n=this.owner
return n.request("after-send-file",arguments,function(){e.setStatus(f.COMPLETE),n.trigger("uploadSuccess",e,t,i._getStats(),r)}).fail(function(t){e.getStatus()===f.PROGRESS&&e.setStatus(f.ERROR,t),n.trigger("uploadError",e,t)}).always(function(){n.trigger("uploadComplete",e)})},updateFileProgress:function(t){var e,r=0
t.blocks&&(d.each(t.blocks,function(t,e){r+=(e.percentage||0)*(e.end-e.start)}),e=r/t.size,this.owner.trigger("uploadProgress",t,e||0))}})})
define("3rd/webuploader/lib/transport.js",["3rd/webuploader/base.js","3rd/webuploader/runtime/client.js","3rd/webuploader/mediator.js"],function(e,t,i){var o=e("3rd/webuploader/base.js"),r=e("3rd/webuploader/runtime/client.js"),n=e("3rd/webuploader/mediator.js"),s=o.$
function a(e){var t=this
e=t.options=s.extend(!0,{},a.options,e||{}),r.call(this,"Transport"),this._blob=null,this._formData=e.formData||{},this._headers=e.headers||{},this.on("progress",this._timeout),this.on("load error",function(){t.trigger("progress",1),clearTimeout(t._timer)})}return a.options={server:"",method:"POST",withCredentials:!1,fileVal:"file",timeout:12e4,formData:{},headers:{},sendAsBinary:!1},s.extend(a.prototype,{appendBlob:function(e,t,i){var o=this,r=o.options
o.getRuid()&&o.disconnectRuntime(),o.connectRuntime(t.ruid,function(){o.exec("init")}),o._blob=t,r.fileVal=e||r.fileVal,r.filename=i||r.filename},append:function(e,t){"object"==typeof e?s.extend(this._formData,e):this._formData[e]=t},setRequestHeader:function(e,t){"object"==typeof e?s.extend(this._headers,e):this._headers[e]=t},send:function(e){this.exec("send",e),this._timeout()},abort:function(){return clearTimeout(this._timer),this.exec("abort")},destroy:function(){this.trigger("destroy"),this.off(),this.exec("destroy"),this.disconnectRuntime()},getResponse:function(){return this.exec("getResponse")},getResponseAsJson:function(){return this.exec("getResponseAsJson")},getStatus:function(){return this.exec("getStatus")},_timeout:function(){var e=this,t=e.options.timeout
t&&(clearTimeout(e._timer),e._timer=setTimeout(function(){e.abort(),e.trigger("error","timeout")},t))}}),n.installTo(a.prototype),a})
define("3rd/webuploader/widgets/validator.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/file.js","3rd/webuploader/widgets/widget.js"],function(e,i,t){var r=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/uploader.js"),o=e("3rd/webuploader/file.js")
e("3rd/webuploader/widgets/widget.js")
var u,a=r.$,d={}
return u={addValidator:function(e,i){d[e]=i},removeValidator:function(e){delete d[e]}},n.register({name:"validator",init:function(){var e=this
r.nextTick(function(){a.each(d,function(){this.call(e.owner)})})}}),u.addValidator("fileNumLimit",function(){var e=this,i=e.options,t=0,r=parseInt(i.fileNumLimit,10),n=!0
r&&(e.on("beforeFileQueued",function(e){return r<=t&&n&&(n=!1,this.trigger("error","Q_EXCEED_NUM_LIMIT",r,e),setTimeout(function(){n=!0},1)),!(r<=t)}),e.on("fileQueued",function(){t++}),e.on("fileDequeued",function(){t--}),e.on("reset",function(){t=0}))}),u.addValidator("fileSizeLimit",function(){var e=this,i=e.options,t=0,r=parseInt(i.fileSizeLimit,10),n=!0
r&&(e.on("beforeFileQueued",function(e){var i=t+e.size>r
return i&&n&&(n=!1,this.trigger("error","Q_EXCEED_SIZE_LIMIT",r,e),setTimeout(function(){n=!0},1)),!i}),e.on("fileQueued",function(e){t+=e.size}),e.on("fileDequeued",function(e){t-=e.size}),e.on("reset",function(){t=0}))}),u.addValidator("fileSingleSizeLimit",function(){var i=this.options.fileSingleSizeLimit
i&&this.on("beforeFileQueued",function(e){if(e.size>i)return e.setStatus(o.Status.INVALID,"exceed_size"),this.trigger("error","F_EXCEED_SIZE",i,e),!1})}),u.addValidator("duplicate",function(){var e=this,i=e.options,t={}
i.duplicate||(e.on("beforeFileQueued",function(e){var i=e.__hash||(e.__hash=function(e){for(var i=0,t=0,r=e.length;t<r;t++)i=e.charCodeAt(t)+(i<<6)+(i<<16)-i
return i}(e.name+e.size+e.lastModifiedDate))
if(t[i])return this.trigger("error","F_DUPLICATE",e),!1}),e.on("fileQueued",function(e){var i=e.__hash
i&&(t[i]=!0)}),e.on("fileDequeued",function(e){var i=e.__hash
i&&delete t[i]}),e.on("reset",function(){t={}}))}),u})
define("3rd/webuploader/widgets/image.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/lib/image.js","3rd/webuploader/widgets/widget.js"],function(e,i,o){var n=e("3rd/webuploader/base.js"),m=e("3rd/webuploader/uploader.js"),l=e("3rd/webuploader/lib/image.js")
e("3rd/webuploader/widgets/widget.js")
var a,t,r,d=n.$
function s(){for(var e;r.length&&t<5242880;)e=r.shift(),t+=e[0],e[1]()}return t=0,r=[],a=function(e,i,o){r.push([i,o]),e.once("destroy",function(){t-=i,setTimeout(s,1)}),setTimeout(s,1)},d.extend(m.options,{thumb:{width:110,height:110,quality:70,allowMagnify:!0,crop:!0,preserveHeaders:!1,type:"image/jpeg"},compress:{width:1600,height:1600,quality:90,allowMagnify:!1,crop:!1,preserveHeaders:!1}}),m.register({name:"image",makeThumb:function(e,i,o,t){var r,s;(e=this.request("get-file",e)).type.match(/^image/)?(r=d.extend({},this.options.thumb),d.isPlainObject(o)&&(r=d.extend(r,o),o=null),o=o||r.width,t=t||r.height,(s=new l(r)).once("load",function(){e._info=e._info||s.info(),e._meta=e._meta||s.meta(),o<=1&&0<o&&(o=e._info.width*o),t<=1&&0<t&&(t=e._info.height*t),s.resize(o,t)}),s.once("complete",function(){i(!1,s.getAsDataUrl(r.type)),s.destroy()}),s.once("error",function(e){i(e||!0),s.destroy()}),a(s,e.source.size,function(){e._info&&s.info(e._info),e._meta&&s.meta(e._meta),s.loadFromBlob(e.source)})):i(!0)},beforeSendFile:function(o){var t,r,s=this.options.compress||this.options.resize,e=s&&s.compressSize||0,a=s&&s.noCompressIfLarger||!1
o=this.request("get-file",o)
var i=!!(wx&&wx.commonData&&wx.commonData.acl&&wx.commonData.acl.msg_acl&&wx.commonData.acl.msg_acl.can_upload_2m_more_gif)
return s&&~"image/gif".indexOf(o.type)&&o.size>s.afterCompressSizeLimit&&!i?(r=n.Deferred(),setTimeout(function(){r.reject("F_EXCEED_COMPRESS_SIZE")},0),r.promise()):!s||!~"image/jpeg,image/jpg,image/png,image/bmp".indexOf(o.type)||o.size<e||o._compressed?void 0:(s=d.extend({},s),r=n.Deferred(),t=new l(s),r.always(function(){t.destroy(),t=null}),t.once("error",r.reject),t.once("load",function(){var e=s.width,i=s.height
o._info=o._info||t.info(),o._meta=o._meta||t.meta(),e<=1&&0<e&&(e=o._info.width*e),i<=1&&0<i&&(i=o._info.height*i),s.resizeSize&&o.size<s.resizeSize&&(!s.maxResolution||o._info.width*o._info.height<s.maxResolution)?t.resize(o._info.width,o._info.height):t.resize(e,i)}),t.once("complete",function(){var e,i
try{i=o.size,e=function e(i,o,t,r){var s,a
return s=m.support("html5")?o.getAsBlob(t.type,0|i):o.getAsBlob(t.type),console.log(s.size,0|i),a=r.size,s.size<a&&t.afterCompressSizeLimit&&s.size>t.afterCompressSizeLimit&&40<i&&(r.size=s.size,i=e(i*=t.quality/100,o,t,r).quality),{quality:i,blob:s}}(100,t,s,{source:o.source,size:o.size}).blob,(!a||e.size<i)&&(o.source=e,o.size=e.size,o.trigger("resize",e.size,i)),o._compressed=!0,o.size>s.afterCompressSizeLimit?r.reject("F_EXCEED_COMPRESS_SIZE"):r.resolve()}catch(e){o.size>s.afterCompressSizeLimit?r.reject("F_EXCEED_COMPRESS_SIZE"):r.resolve()}}),o._info&&t.info(o._info),o._meta&&t.meta(o._meta),t.loadFromBlob(o.source),r.promise())}})})
define("3rd/webuploader/widgets/filednd.js",["3rd/webuploader/base.js","3rd/webuploader/uploader.js","3rd/webuploader/lib/dnd.js","3rd/webuploader/widgets/widget.js"],function(e,d,r){var i=e("3rd/webuploader/base.js"),n=e("3rd/webuploader/uploader.js"),o=e("3rd/webuploader/lib/dnd.js")
e("3rd/webuploader/widgets/widget.js")
var s=i.$
return n.options.dnd="",n.register({name:"dnd",init:function(e){if(e.dnd&&"html5"===this.request("predict-runtime-type")){var d,r=this,n=i.Deferred(),t=s.extend({},{disableGlobalDnd:e.disableGlobalDnd,container:e.dnd,accept:e.accept})
return this.dnd=d=new o(t),d.once("ready",n.resolve),d.on("drop",function(e){r.request("add-file",[e])}),d.on("accept",function(e){return r.owner.trigger("dndAccept",e)}),d.init(),n.promise()}},destroy:function(){this.dnd&&this.dnd.destroy()}})})
