define("pages/modules/verify_code/verify_code.tpl.js",[],function(e,i,r){return'<mp-form-item class="verify-code__area" :prop="name" :rules="codeRules">  <span slot="label">验证码</span>\t<mp-input v-model.trim="internalCode" :clearable="true" filter="trim" autocomplete="off">\t</mp-input>\t<div class="verify-code__wrp">\t  <img :src="verifyImg" @click="onClickRefresh">\t  <a href="javascript:;" class="weui-desktop-link" @click="onClickRefresh">换一张</a>\t</div></mp-form-item>'})
define("pages/modules/verify_code/verify_code.css.js", [], function (require, exports, module){module.exports = ".verify-code__wrp {  margin-top: 10px;}.verify-code__wrp img,.verify-code__wrp a {  vertical-align: middle;}";});define("pages/modules/region/region.js",["pages/modules/region/region.tpl.js","pages/modules/utils/cgi.js","vue-weui/src/dropdown/dropdown.js"],function(t,n,i){"use strict"
var e=t("pages/modules/region/region.tpl.js"),s=t("pages/modules/utils/cgi.js")
t("vue-weui/src/dropdown/dropdown.js"),Vue.component("mp-region",{name:"mpregin",template:e,props:{cgi:{type:String,default:"/cgi-bin/getregions?t=setting/ajax-getregions&id="},change:{type:Function},initChina:{type:Boolean,default:!0}},data:function(){return{countryList:[],provinceList:[],cityList:[],country:{value:0,label:""},province:{value:0,label:"",show:!0},city:{value:0,label:"",show:!1}}},mounted:function(){this.initCountryList()},methods:{asyncGetRegions:function(t){var e=this,o=0<arguments.length&&void 0!==t?t:0
return new Promise(function(n,i){s.get({url:e.cgi+o,success:function(t){t&&t.base_resp&&0===t.base_resp.ret?(t.list=e.toList(t.data),n(t)):i(t)},error:function(t){i(t)}})})},toList:function(t){var n=[]
return t&&0<t.length?t.forEach(function(t){n.push({label:t.name,value:t.id})}):n=t,n},initCountryList:function(){var n=this
this.asyncGetRegions().then(function(t){n.countryList=t.list,n.countryList.unshift({label:"全部",value:-1}),n.initChina&&(n.country={label:"中国",value:1017})}),this.initChina?this.asyncGetRegions(1017).then(function(t){n.provinceList=t.list,n.province.show=!0}):this.province.show=!1},countryChange:function(t){var n=this
this.country=t,this.asyncGetRegions(t.value).then(function(t){n.provinceList=t.list,n.province.show=!0,n.city.show=!1}).catch(function(){n.province.show=!1}).finally(function(){n.commonChange()})},provinceChange:function(t){var n=this
this.province={value:t.value,label:t.label,show:!0},this.asyncGetRegions(t.value).then(function(t){n.cityList=t.list,n.city.show=!0}).catch(function(){n.city.show=!1}).finally(function(){n.commonChange()})},cityChange:function(t){this.city={value:t.value,label:t.label,show:!0},this.commonChange()},commonChange:function(){this.$emit("change",this.getAll())},validate:function(){return!1===this.province.show||""!==this.get("country")&&""!==this.get("province")&&""!==this.get("city")},get:function(t){return this[t]||null},getAll:function(){return{country:this.get("country"),province:this.get("province"),city:this.get("city")}}}})})
define("pages/modules/region/region.tpl.js",[],function(o,n,e){return'<div class="mp-region">  <mp-dropdown :options="countryList" :initvalue="country.value"               class="mp-region-dropdown" @select="countryChange" placeholder="国家"></mp-dropdown>  <mp-dropdown :options="provinceList" v-if="province.show"               placeholder="省份"               class="mp-region-dropdown" @select="provinceChange"></mp-dropdown>  <mp-dropdown :options="cityList" v-if="province.show && city.show"               placeholder="城市/区县"               class="mp-region-dropdown" @select="cityChange"></mp-dropdown></div>'})
define("vue-weui/src/dropdown_cascade/dropdown_cascade.js",["vue-weui/src/dropdown_cascade/dropdown_cascade.css.js","vue-weui/src/dropdown_cascade/dropdown_cascade.tpl.js"],function(e,t,i){"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
e("vue-weui/src/dropdown_cascade/dropdown_cascade.css.js")
var s,n=e("vue-weui/src/dropdown_cascade/dropdown_cascade.tpl.js")
var l={name:"mp-dropdowncascade",template:((s=n)&&s.__esModule?s:{default:s}).default,props:{name:{type:String,default:""},type:{type:String,default:"default"},placeholder:{type:String,default:"请选择"},classname:{type:String,default:""},initvalue:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1},filterable:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},newoptiontext:{type:String,default:""},isverifyfinish:{type:Boolean,default:!1},options:{type:Array,default:[]},required:{type:Boolean,default:!1}},data:function(){return{searchValue:"",forFormDecoratorValue:[],v:[],isOpen:!1,optionsList:[],isWarn:!1}},methods:{cloneObject:function(e){var t=e instanceof Array?[]:{}
for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]="object"===o(e[i])?this.cloneObject(e[i]):e[i])
return t},isOpenOptionsList:function(){this.isOpen=!this.isOpen},resetOptionsList:function(e,t,i){if(this.optionsList.push(t),0!==e.length){for(var s="",n=0;n<t.length;n++)t[n].isChecked=!1,"object"!==o(e[0])?t[n].value===e[0]&&(s={index:n,ele:t[n]},this.v.push(this.cloneObject(s)),this.v[this.v.length-1].ele.isChecked&&delete this.v[this.v.length-1].ele.isChecked,this.v[this.v.length-1].ele.options&&delete this.v[this.v.length-1].ele.options,this.optionsList[this.optionsList.length-1][n].isChecked=!0):t[n].value===e[0].value&&(s={index:n,ele:t[n]},this.v.push(this.cloneObject(s)),this.v[this.v.length-1].ele.isChecked&&delete this.v[this.v.length-1].ele.isChecked,this.v[this.v.length-1].ele.options&&delete this.v[this.v.length-1].ele.options,this.optionsList[this.optionsList.length-1][n].isChecked=!0)
""!==s&&s.ele.options&&0!==s.ele.options.length?(e.shift(),this.resetOptionsList(e,s.ele.options,i)):"init"===i&&(this.forFormDecoratorValue=this.cloneObject(this.v))}else"init"===i&&(this.isverifyfinish&&t&&0!==t.length?this.forFormDecoratorValue=[]:this.forFormDecoratorValue=this.cloneObject(this.v))},resetSingleOptinsList:function(e,t){for(var i=0;i<this.optionsList[e].length;i++)this.optionsList[e][i].isChecked=!1
this.optionsList[e][t].isChecked=!0},handleNext:function(e){for(var t={index:e.index,ele:this.cloneObject(e.ele)},i=this.optionsList.length-1;i>e.level;--i)this.optionsList.pop()
for(var s=this.v.length;s>e.level;--s)this.v.pop()
this.v.push(t),delete this.v[this.v.length-1].ele.isChecked,delete this.v[this.v.length-1].ele.options,this.resetSingleOptinsList(e.level,e.index),e.ele.options&&0<e.ele.options.length?(this.optionsList.push(e.ele.options),this.$emit("change",{name:this.name?this.name:void 0,isFinish:!1,value:this.v}),this.isverifyfinish?this.forFormDecoratorValue=[]:this.forFormDecoratorValue=this.v):(this.isOpenOptionsList(),this.$emit("change",{name:this.name?this.name:void 0,isFinish:!0,value:this.v}),this.forFormDecoratorValue=this.v),this.isWarn=!1},handleSearch:function(){this.$emit("search",{name:this.name?this.name:void 0,value:this.v,searchValue:this.searchValue})},handleActive:function(){this.disabled||this.isOpenOptionsList()},handleDocumentClick:function(e){this.$el&&!this.$el.contains(e.target)&&(this.isOpen=!1)},validate:function(e,t){return this.required&&0===this.forFormDecoratorValue.length?(this.isWarn=!0,t("required")):(this.isWarn=!1,e())}},created:function(){this.resetOptionsList(this.initvalue,this.options,"init")
var i=this
this.APIs=Object.create(null,{validate:{value:function(e,t){i.validate(e,function(e){t({info:e||"",name:i.name,value:i.v})})}}})},mounted:function(){document.addEventListener("click",this.handleDocumentClick)},beforeDestroy:function(){document.removeEventListener("click",this.handleDocumentClick)}}
"function"==typeof l.template&&l.template(l),l.install=function(e){return e.component(l.name,l)},t.default=l})
define("vue-weui/src/dropdown_cascade/dropdown_cascade.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.weui-desktop-form__dropdowncascade__horizontal {  /*    .weui-desktop-dropdowncascade-menu__section__head{        padding: 16px 0 0 16px;        color: @weuiDesktopTipsColor;    }*/}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__wrp {  position: absolute;  z-index: 2;  background: #FFFFFF;  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);  border-radius: 2px;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head {  padding: 16px 18px;  font-size: 16px;  font-weight: 450;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdown__list-ele__text {  display: block;  max-width: 8.5em;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head__item {  position: relative;  cursor: pointer;  line-height: 22px;  margin-right: 24px;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head__item:hover {  background-color: #F6F8F9;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head__item:after {  position: absolute;  right: 0;  margin-right: -15.5px;  top: 50%;  margin-top: -5.5px;  content: ' ';  display: inline-block;  width: 7px;  height: 11px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head__item:last-child:after {  display: none;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head__item.weui-desktop-dropdowncascade-menu__head__item__placeholder {  font-weight: normal;  color: #A3A3A3;  cursor: default;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu__head__item.weui-desktop-dropdowncascade-menu__head__item__placeholder:hover {  background: none;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdown-menu {  box-shadow: none;  position: static;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu {  position: static;  box-shadow: none;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu {  padding-top: 0;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list {  padding: 0;}.weui-desktop-form__dropdowncascade__horizontal .weui-desktop-dropdown-menu.horizontal {  width: initial;  max-width: initial;  min-width: initial;}.weui-desktop-form__dropdowncascade {  min-width: 15em;  display: inline-block;  vertical-align: middle;}.weui-desktop-form__dropdowncascade-label {  display: inline-block;}.weui-desktop-form__dropdowncascade.weui-desktop-form__dropdowncascade__warn .weui-desktop-form__dropdowncascade__dt.weui-desktop-form__dropdowncascade__dt__inner-button {  border: 1px solid #FA5151;}.weui-desktop-form__recent {  line-height: 24px;  margin-top: 12px;  font-size: 14px;}.weui-desktop-form__recent .weui-desktop-form__recent__label {  display: inline-block;  margin-right: 8px;  color: #9A9A9A;}.weui-desktop-form__recent .weui-desktop-form__recent__ele {  position: relative;  display: inline-block;  margin-right: 8px;  margin-bottom: 5px;  line-height: 24px;  padding: 0 8px 0 8px;  background-color: #F6F8F9;  cursor: pointer;}.weui-desktop-form__recent .weui-desktop-form__recent__ele__inner {  display: -ms-flexbox;  display: flex;  -ms-flex-align: center;      align-items: center;}.weui-desktop-form__recent .weui-desktop-form__recent__ele__item {  position: relative;}.weui-desktop-form__recent .weui-desktop-form__recent__ele__item:after {  position: relative;  left: -2px;  content: ' ';  margin: 0 4px;  display: inline-block;  width: 7px;  height: 11px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;  left: 0;}.weui-desktop-form__recent .weui-desktop-form__recent__ele__item:last-of-type:after {  display: none;}.weui-desktop-form__recent .weui-desktop-form__recent__ele__delete {  position: relative;  right: -5px;  display: inline-block;  width: 14px;  height: 14px;  text-align: center;  line-height: 12px;  padding-left: 1px;  border-left: 1px solid #E7E7EB;  margin-left: 1px;}.weui-desktop-form__recent .weui-desktop-form__recent__ele__delete svg {  position: static;  -ms-transform: none;      transform: none;}.weui-desktop-form__recent .weui-desktop-icon__delete {  width: initial;  height: initial;  background: none;  margin: 0;}.weui-desktop-form__dropdowncascade__dt {  position: relative;  min-width: 75px;  padding: 0 36px 0 15px;  line-height: 34px;  text-overflow: ellipsis;  overflow: hidden;  white-space: nowrap;  cursor: pointer;}.weui-desktop-form__dropdowncascade__dt .weui-desktop-form__dropdowncascade__dt__value_ele:after {  position: relative;  left: -2px;  content: ' ';  margin: 0 4px;  display: inline-block;  width: 7px;  height: 11px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;}.weui-desktop-form__dropdowncascade__dt .weui-desktop-form__dropdowncascade__dt__value_ele:last-child:after {  display: none;}.weui-desktop-form__dropdowncascade__dt:after {  position: absolute;  top: 50%;  right: 8px;  margin-top: -6px;  content: ' ';  display: block;  width: 6px;  height: 6px;  border-width: 1px;  border-style: solid;  border-color: #9A9A9A #9A9A9A transparent transparent;  -ms-transform-origin: 50% 50%;      transform-origin: 50% 50%;  -ms-transform: rotate(135deg);      transform: rotate(135deg);}.weui-desktop-form__dropdowncascade__dt.weui-desktop-form__dropdowncascade__dt__inner-button {  border: 1px solid #E4E8EB;  border-radius: 2px;  background-color: #FFFFFF;}.weui-desktop-form__dropdowncascade__dt.weui-desktop-form__dropdowncascade__dt__inner-button.weui-desktop-form__dropdowncascade__dt__active {  border-color: #07C160;}.weui-desktop-form__dropdowncascade__dt.weui-desktop-form__dropdowncascade__dt__inner-button.disabled {  color: #A1A1A1;  background-color: #F5F6F6;}.weui-desktop-form__dropdowncascade__dt.disabled {  color: #E9E9E9;}.weui-desktop-form__dropdowncascade__dt.placeholder {  color: #8D8D8D;}.weui-desktop-form__dropdowncascade__dt .weui-desktop-form__dropdowncascade__search {  width: 98%;  font-size: inherit;  border: none;  outline: none;}.weui-desktop-dropdowncascade-menu__wrp {  position: relative;}/*选项*/.weui-desktop-dropdowncascade-menu {  display: table;  display: -ms-flexbox;  display: flex;  padding: 0;  font-size: 14px;  width: -webkit-fit-content;  width: fit-content;  position: absolute;  left: 0;  right: 0;  z-index: 4000;  border-radius: 5px;  background: #FFFFFF;  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);  border-radius: 2px;  /*加载中*/}.weui-desktop-dropdowncascade-menu.single {  right: 0;  border-left: none;}.weui-desktop-dropdowncascade-menu.single .weui-desktop-dropdowncascade__list {  width: 100%;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade-menu__open-more {  right: initial;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list {  display: table-cell;  position: relative;  width: 11em;  padding: 11px 0;  overflow-y: auto;  border-right: 1px solid #E4E8EB;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list:last-child {  border-right: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list.last-list:after {  display: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list.last-list .weui-desktop-dropdowncascade__list-ele-contain {  padding: 7px 30px 7px 15px;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.more .weui-desktop-dropdowncascade__list-ele-contain:after {  content: ' ';  width: 7px;  height: 11px;  position: absolute;  display: block;  right: 15px;  top: 50%;  margin-top: -5px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.more.checked .weui-desktop-dropdowncascade__list-ele-contain:after {  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dCBITDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IEw1LjQ0OTc0NzQ3LDguNDQ5NzQ3NDcgTDUuNDQ5NzQ3NDcsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOC45NDk3NDc0NyBMLTEuNTUwMjUyNTMsMi40NDk3NDc0NyBMLTAuNTUwMjUyNTMyLDIuNDQ5NzQ3NDcgTC0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE2IiBmaWxsPSIjMUFBRDE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjk0OTc0NywgNS45NDk3NDcpIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTEuOTQ5NzQ3LCAtNS45NDk3NDcpICI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=) no-repeat center;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.checked {  color: #07C160;}.weui-desktop-dropdowncascade-menu .weui-desktop-form__dropdowncascade-ele.disabled {  color: #E9E9E9;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdowncascade__list-ele-contain {  position: relative;  padding: 7px 30px 7px 15px;  width: inherit;  text-overflow: ellipsis;  overflow: hidden;  white-space: nowrap;}.weui-desktop-dropdowncascade-menu .loading {  text-align: center;  padding: 40px 0;  color: #9A9A9A;}.weui-desktop-dropdowncascade-menu .empty {  text-align: center;  padding: 40px 0;  color: #9A9A9A;}.weui-desktop-dropdowncascade-menu.weui-desktop-dropdowncascade-menu__open-more .weui-desktop-dropdown-menu {  min-width: 11em;  max-width: 13em;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu {  position: relative;  width: 100%;  max-height: 300px;  overflow-y: auto;  border-right: 1px solid #E4E8EB;  box-shadow: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu:last-child {  border-right: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu.last-list:after {  display: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown-menu.last-list .weui-desktop-dropdown__list-ele {  padding: 7px 30px 7px 15px;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list {  max-height: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele {  position: relative;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.checked {  color: #07C160;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.checked .weui-desktop-dropdown__list-ele-contain {  color: #07C160;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.checked:after {  /*content: ' ';\t\t\t\tdisplay: block;\t\t\t\twidth: 7px;\t\t\t\theight: 11px;\t\t\t\tposition: absolute;\t\t\t\tdisplay: block;\t\t\t\tright: 15px;\t\t\t\ttop: 50%;\t\t\t\tmargin-top: -5px;\t\t\t\tbackground: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;\t\t\t\tbackground-size: contain;*/  display: none;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.module-has-options {  /*.weui-desktop-dropdown__list-ele-contain{\t\t\t\tpadding-right: 30px;\t\t\t}*/}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.module-has-options:after {  content: ' ';  width: 7px;  height: 11px;  position: absolute;  display: block;  right: 15px;  top: 50%;  margin-top: -5px;  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDkzLjAwMDAwMCwgLTg5LjAwMDAwMCkiIGZpbGw9IiM5QTlBOUEiPgogICAgICAgICAgICA8cGF0aCBkPSJNNDkxLjc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5NyBMNDk3Ljc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5OCBMNDkwLjc1NzM1OSw5Ny41IEw0OTAuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDkxIEw0OTEuNzU3MzU5LDk3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0OTQuMjU3MzU5LCA5NC41MDAwMDApIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTQ5NC4yNTczNTksIC05NC41MDAwMDApICI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+) no-repeat center;  background-size: contain;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.module-has-options.checked:after {  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iN3B4IiBoZWlnaHQ9IjExcHgiIHZpZXdCb3g9IjAgMCA3IDExIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0Ny4xICg0NTQyMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+bmV4dCBITDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJDYXNjYWRlci3nuqfogZTpgInmi6nlmagtLeKchSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IEw1LjQ0OTc0NzQ3LDguNDQ5NzQ3NDcgTDUuNDQ5NzQ3NDcsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOS40NDk3NDc0NyBMLTEuNTUwMjUyNTMsOC45NDk3NDc0NyBMLTEuNTUwMjUyNTMsMi40NDk3NDc0NyBMLTAuNTUwMjUyNTMyLDIuNDQ5NzQ3NDcgTC0wLjU1MDI1MjUzMiw4LjQ0OTc0NzQ3IFoiIGlkPSJDb21iaW5lZC1TaGFwZS1Db3B5LTE2IiBmaWxsPSIjMUFBRDE5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjk0OTc0NywgNS45NDk3NDcpIHNjYWxlKC0xLCAtMSkgcm90YXRlKC0zMTUuMDAwMDAwKSB0cmFuc2xhdGUoLTEuOTQ5NzQ3LCAtNS45NDk3NDcpICI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=) no-repeat center;}.weui-desktop-dropdowncascade-menu .weui-desktop-dropdown__list-ele.disabled {  color: #E9E9E9;}.weui-desktop-dropdowncascade-menu .horizontal .weui-desktop-dropdown__list-ele.module-has-options:after {  display: none;}";});define("vue-weui/src/dropdown_cascade/dropdown_cascade.tpl.js",[],function(t,e,s){return'<div\tclass="weui-desktop-form__dropdowncascade"\t:class="{\t\t\'weui-desktop-form__dropdowncascade__default\': type == \'default\',\t\t\'weui-desktop-form__dropdowncascade__inner-text\': type == \'text\',\t\t\'weui-desktop-form__dropdowncascade__inner-table\': type == \'table-head\',\t\t\'weui-desktop-form__dropdowncascade__warn\': isWarn == true\t}">\t<dl class="weui-desktop-form__dropdowncascade-label">\t\t\t\t<dt\t\t\tclass="weui-desktop-form__dropdowncascade__dt"\t\t\t:class="{\t\t\t\t\'focus\': isOpen,\t\t\t\t\'weui-desktop-form__dropdowncascade__dt__inner-button\': type == \'default\',\t\t\t\t\'filter\': filterable,\t\t\t\t\'disabled\': disabled,\t\t\t\t\'placeholder\': !v.length\t\t\t}"\t\t\t@click.stop.prevent="handleActive()">\t\t\t<slot name="head"></slot>\t\t\t<template v-if="!filterable">\t\t\t\t<template v-if="v.length">\t\t\t\t\t<span\t\t\t\t\t\tv-for="(item, index) in v"\t\t\t\t\t\tclass="weui-desktop-form__dropdowncascade__dt__value_ele"\t\t\t\t\t\t:class="{\'last\': index == (v.length - 1)}">\t\t\t\t\t\t<i\t\t\t\t\t\t\tv-if="item.ele.icon || item.optionHeadClassName"\t\t\t\t\t\t\tclass="weui-desktop-dropdown__list-ele__head"\t\t\t\t\t\t\t:class="item.ele.optionHeadClassName">\t\t\t\t\t\t\t<img\t\t\t\t\t\t\t\tclass="weui-desktop-dropdown__list-ele__head__icon"\t\t\t\t\t\t\t\tv-if="item.ele.icon"\t\t\t\t\t\t\t\t:src="item.ele.icon" />\t\t\t\t\t\t</i>{{item.ele.label}}\t\t\t\t\t</span>\t\t\t\t</template>\t\t\t\t\t\t\t\t<template v-else>{{placeholder}}</template>\t\t\t</template>\t\t\t<template v-else>\t\t\t\t<input type="text" class="weui-desktop-form__dropdowncascade__search"  v-model="searchValue" @change="handleSearch" :placeholder="placeholder" :disabled="disabled" />\t\t\t</template>\t\t</dt>\t\t<dd class="weui-desktop-dropdowncascade-menu__wrp">\t\t\t<div class="weui-desktop-dropdowncascade-menu" v-if="" :class="{\'single\': optionsList.length == 1}">\t\t\t\t<template v-if="isOpen" v-for="(op, level) in optionsList">\t\t\t\t\t<ul :ref="\'list_\' + level" v-if="!loading && op && op.length != 0" class="weui-desktop-dropdowncascade__list" :class="{\'last-list\': level == (optionsList.length - 1)}">\t\t\t\t      <li class="weui-desktop-form__dropdowncascade-ele" v-for="(ele, index) in op" :title="ele.label" :class="{\'checked\': ele.isChecked, \'more\': ele.options && ele.options.length}">\t\t\t\t        <div class="weui-desktop-dropdowncascade__list-ele-contain" @click="handleNext({\'ele\': ele, \'level\': level, \'index\': index})">\t\t\t\t          {{ele.label}}\t\t\t\t        </div>\t\t\t\t      </li>\t\t\t\t    </ul>\t\t\t\t    <div v-if="loading" class="weui-desktop-dropdowncascade__list loading">\t\t\t\t\t\t加载中...\t\t\t\t\t</div>\t\t\t\t\t<div v-if="op && op.length == 0" class="weui-desktop-dropdowncascade__list weui-desktop-dropdown__list__empty">\t\t\t\t\t\t暂无数据\t\t\t\t\t</div>\t\t\t\t</template>\t\t\t</div>\t\t</dd>\t</dl>  <p class="weui-desktop-form__msg weui-desktop-form__msg_warn" v-if="isWarn && $slots.msg">    <slot name="msg"></slot>  </p>  <p class="weui-desktop-form__tips" v-if="$slots.tips">    <slot name="tips"></slot>  </p></div>'})
define("pages/modules/masssend/originalDialog/originalDialog.js",["pages/modules/masssend/originalDialog/originalDialog.tpl.js","vue-weui/src/dialog/dialog.js","vue-weui/src/step/step.js","vue-weui/src/input/input.js","pages/modules/masssend/originalDialog/originalDialog.css.js","pages/editor/eventBus4Web1.js"],function(e,t,r){"use strict"
var i=e("pages/modules/masssend/originalDialog/originalDialog.tpl.js")
e("vue-weui/src/dialog/dialog.js"),e("vue-weui/src/step/step.js"),e("vue-weui/src/input/input.js"),e("pages/modules/masssend/originalDialog/originalDialog.css.js")
var s=e("pages/editor/eventBus4Web1.js")
function n(e,t){if(0<arguments.length)for(var r in t)if(void 0!==t[r]){var i=new RegExp("({"+r+"})","g")
e=e.replace(i,t[r])}return e}Vue.component("masssend-original-dialog",{template:i,props:{canUsePublicTag:{type:Number,default:0},realnameType:{type:Number,default:0},show:{type:Boolean,default:!1},list:{type:Array},appmsgid:{type:String}},watch:{show:function(e){this.innerShow=e},innerShow:function(e){this.$emit("show-change",e)},list:function(e){e&&(this.step=1,this.dataList=this.getDataList(e))}},methods:{cancel:function(){this.innerShow=!1,this.$emit("cancel")},onClose:function(){this.$emit("cancel")},getDataList:function(e){return e.map(function(e){var t={article_title:e.article_title,source_url:e.source_url,source_title:e.source_title,idx:e.idx}
return t.complainUrl="/cgi-bin/appmsgcopyright?action=appeal&original_type="+e.source_type+"&original_url="+encodeURIComponent(e.source_url)+"&article_url="+encodeURIComponent(e.article_url)+"&article_title="+e.article_title,e.source_info.is_pay_subscribe||"EN_SOURCE_REPRINT_STATUS_REJECT_REPRINT"===e.source_info.source_reprint_status||"EN_SOURCE_REPRINT_STATUS_REPRINT_WITH_MODIFY"===e.source_info.source_reprint_status||"EN_SOURCE_REPRINT_STATUS_REPRINT_WITHOUT_MODIFY"===e.source_info.source_reprint_status?(1===e.user_source?t.reseaon=n('你的内容《{article_title}》与原创内容<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以分享方式群发，如有异议可在当前页面申诉。',t):t.reseaon=n('你的内容《{article_title}》与原创内容<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，将以分享方式群发，如有异议可在当前页面申诉。',t),t.sendType=2):"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITH_SOURCE"===e.source_info.source_reprint_status?(t.reseaon=n('你的内容《{article_title}》已被原创内容<a href="{source_url}" target="_blank">《{source_title}》</a>纳入白名单，将默认以白名单约定的转载方式<span class="gray-content">（可修改，显示转载来源）</span>群发，如有异议可在当前页面申诉。',t),t.sendType=3,t.reprintTypeShow=!1,t.reprintType="white"):"EN_SOURCE_REPRINT_STATUS_IN_WHITE_LIST_WITHOUT_SOURCE"===e.source_info.source_reprint_status?(t.reseaon=n('你的内容《{article_title}》已被原创内容<a href="{source_url}" target="_blank">《{source_title}》</a>纳入白名单，将默认以白名单约定的转载方式<span class="gray-content">（可修改，不显示转载来源）</span>群发，如有异议可在当前页面申诉。',t),t.sendType=3,t.reprintTypeShow=!1,t.double=!0,t.reprintType="white"):"EN_SOURCE_REPRINT_STATUS_UNDECLARE"===e.source_info.source_reprint_status&&9===e.source_type?(t.reseaon=n('你的内容《{article_title}》与历史内容<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以非原创方式群发，如有异议可在当前页面申诉。',t),t.sendType=1):"EN_SOURCE_REPRINT_STATUS_UNDECLARE"!==e.source_info.source_reprint_status||2!==e.source_type&&3!==e.source_type?"EN_SOURCE_REPRINT_STATUS_UNDECLARE"===e.source_info.source_reprint_status&&4===e.source_type?(t.sendType=1,4===e.black_type?t.black_name="公共公开信息":6===e.black_type?t.black_name="网络整合信息":5===e.black_type?t.black_name="营销宣传信息":t.black_name="默认类型",t.reseaon=n('你的内容《{article_title}》与{black_name}<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以非原创方式群发，如有异议可在当前页面申诉。',t)):1===e.source_type&&(1===e.user_source?t.reseaon=n('你的内容《{article_title}》与原创内容<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以分享方式群发，如有异议可在当前页面申诉。',t):t.reseaon=n('你的内容《{article_title}》与原创内容<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，将以分享方式群发，如有异议可在当前页面申诉。',t),t.sendType=2):(t.reseaon=n('你的内容《{article_title}》与时事新闻<a href="{source_url}" target="_blank">《{source_title}》</a>相似度过高，不能声明原创，将以非原创方式群发，如有异议可在当前页面申诉。',t),t.sendType=1),t.word="",t})},next:function(){this.step=2},pre:function(){this.step=1},preview:function(){var e={appmsgid:this.appmsgid,copyright_check_result:this.list,operate_info:[]}
this.valid()&&(e.operate_info=this.dataList.map(function(e){var t=1
return 1===e.sendType?t=3:2===e.sendType?t=1:3===e.sendType&&(t="white"===e.reprintType?2:1),{idx:e.idx,operate_type:t,recommend_msg:e.word}}),this.$emit("preview",e),s.$emit("preview",e),this.innerShow=!1)},valid:function(){var t=!0
return this.dataList.forEach(function(e){2===e.sendType&&e.word&&140<e.word.length&&(t=!1),3===e.sendType&&("share"===e.reprintType&&e.word&&140<e.word.length&&(t=!1),"white"===e.reprintType&&e.word&&120<e.word.length&&(t=!1))}),!!t||(this.$tipsErr("推荐语长度超过限制，请依次检查并更正后重试"),!1)},send:function(){if(this.valid()){var e=this.dataList.map(function(e){var t={idx:e.idx}
return 3===e.sendType&&"white"===e.reprintType?(t.reprint_type="EN_REPRINT_TYPE_WHITELIST",t.recommend_msg=e.word):(t.reprint_type="EN_REPRINT_TYPE_SHARE",t.guide_words=e.word),t})
this.$emit("submit",e)}}},mounted:function(){var e=this
document.addEventListener?document.addEventListener("click",function(){e.dataList.forEach(function(e){3===e.sendType&&!0===e.reprintTypeShow&&(e.reprintTypeShow=!1)})},!0):document.attachEvent("onclick",function(){e.dataList.forEach(function(e){3===e.sendType&&!0===e.reprintTypeShow&&(e.reprintTypeShow=!1)})})},data:function(){return{innerShow:this.show,step:1,dataList:this.getDataList(this.list)}}})})
define("pages/modules/masssend/originalDialog/originalDialog.tpl.js",[],function(t,e,s){return'<mp-dialog ref="dialog" v-model="innerShow" title="原创校验"  width.number="800" height.number="800" @close="onClose">  <div class=" js_maincontent">    <div>      <mp-step :step="step">        <mp-step-item title="确认群发方式"></mp-step-item>        <mp-step-item title="填写编者推荐语"></mp-step-item>      </mp-step>    </div>    <div class="flex original_popup-tips">      <div class="weui-desktop-flex__item">        共{{dataList.length}}篇内容未通过原创校验逻辑，将按下列情况调整群发方式，如有异议可申诉      </div>      <div class="">        <a class="gray-content" href="https://mp.weixin.qq.com/cgi-bin/announce?action=getannouncement&key=11540820414s4Fh8&version=1&lang=zh_CN&platform=2" target="_blank"><span class="icon-file"></span>原创规则指引</a>      </div>    </div>          <div class="weui-desktop-table__wrp original-table__wrap js_original_table" v-show="step==1">        <table class="weui-desktop-table js_list_wrap desktop-send-table">            <thead class="weui-desktop-table__hd">                <tr>                    <th class="original_td-max-width">未通过原因</th>                    <th class="original_popup-tabletd-one-last tl">群发方式</th>                </tr>            </thead>            <tbody class="weui-desktop-table__bd">                <tr v-for="item in dataList">                    <td class="original_td-max-width" v-html="item.reseaon"></td>                    <td class="original_popup-tabletd-one-last tl" v-if="item.sendType==1">                        <div class=" js_choosePublishWay js_enable" >                          <span class="js_publishWayText">                              非原创方式群发                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          如有异议，可<a :href="item.complainUrl" target="_blank">申诉</a>                        </div>                    </td>                    <td class="original_popup-tabletd-one-last tl" v-if="item.sendType==2">                        <div class=" js_choosePublishWay js_enable" >                          <span class="js_publishWayText">                              分享                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          如有异议，可<a :href="item.complainUrl" target="_blank">申诉</a>                        </div>                    </td>                    <td class="original_popup-tabletd-one-last tl" v-if="item.sendType==3">                        <div class=" js_choosePublishWay js_enable pb-position" >                          <span class="js_publishWayText">                              转载                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          如有异议，可<a :href="item.complainUrl" target="_blank">申诉</a>                        </div>                    </td>                </tr>            </tbody>        </table>    </div>        <div class="weui-desktop-table__wrp original-table__wrap js_original_table" v-show="step==2">        <table class="weui-desktop-table js_list_wrap desktop-send-table">            <thead class="weui-desktop-table__hd">                <tr>                    <th class="original_popup-tabletd-two-left">待群发内容</th>                    <th class="tl original_popup-tabletd-two-middle">群发方式</th>                    <th class="tl">编者荐语</th>                </tr>            </thead>            <tbody class="weui-desktop-table__bd">                <tr v-for="item in dataList">                    <td class="original_popup-tabletd-two-left">                        {{item.article_title}}                    </td>                    <td class="tl original_popup-tabletd-two-middle" v-if="item.sendType==1">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              非原创方式群发                          </span>                          <div class="gray-content js_publishWay_below_text">                            <a @click="preview(item)">预览</a>                          </div>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==2">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              分享                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          分享样式，可<a @click="preview(item)">预览</a>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==3&&item.reprintType==\'white\'">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              转载                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          转载样式，可<a @click="preview(item)">预览</a>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==3&&item.reprintType==\'share\'">                        <div class=" js_choosePublishWay" >                          <span class="js_publishWayText">                              分享                          </span>                        </div>                        <div class="gray-content js_publishWay_below_text">                          分享样式，可<a @click="preview(item)">预览</a>                        </div>                    </td>                    <td class="tl" v-if="item.sendType==2||(item.sendType==3&&!item.double)">                        <div class="textarea-area" >                                                    <mp-input :multi="true" v-model="item.word" :countable="true" placeholder="分享推荐语，可以不填写" :maxlength="140" v-show="item.sendType==2||(item.sendType==3&&item.reprintType==\'share\')">                            <template slot="message">最大不能超过140个字</template>                          </mp-input>                          <mp-input :multi="true" v-model="item.word" :countable="true" placeholder="转载推荐语，可以不填写" :maxlength="120" v-show="item.sendType==3&&item.reprintType==\'white\'">                            <template slot="message">最大不能超过120个字</template>                          </mp-input>                        </div>                    </td>                    <td class="tl gray-content" v-if="item.sendType==1||(item.sendType==3&&item.double)">                       无需填写推荐语                    </td>                </tr>            </tbody>        </table>    </div>          </div>  <template slot="footer">    <mp-button  @click="cancel" v-show="step==1">取消</mp-button>    <mp-button type="primary" @click="next" v-show="step==1">下一步</mp-button>    <mp-button  @click="pre" v-show="step==2">上一步</mp-button>    <mp-button type="primary" @click="send" v-show="step==2">继续群发</mp-button>  </template></mp-dialog>'})
define("pages/modules/masssend/originalDialog/originalDialog.css.js", [], function (require, exports, module){module.exports = "/*How to usefont-family: 'wechatnum';*/.flex {  display: -ms-flexbox;  display: flex;}.flex__item {  -ms-flex: 1;      flex: 1;}.weui-desktop-step.weui-desktop-step:before {  display: inline-block !important;}.original_popup-tips {  padding: 20px 30px;}.original_popup-tabletd-one-last {  width: 140px;  padding-left: 80px;}.original_popup-tabletd-two-left {  width: 150px;  padding-right: 50px !important;}.original_popup-tabletd-two-middle {  padding-right: 50px !important;}.new-page_msg.large .inner {  padding: 0;}.new-msg_icon_wrapper {  width: 100%;  text-align: center;  padding-bottom: 30px;}.new-msg_icon_wrapper p {  color: #353535;  font-size: 18px;}.center-msg-icon .icon_msg {  margin-bottom: 30px;}.desktop-send-table td {  vertical-align: top;}.pdb-10 {  margin-bottom: 10px;}.desktop-send-table textarea {  height: 45px;  resize: none;  width: 100%;  border: 0;}.textarea-tips {  font-size: 14px;  color: #d7d7d7;  position: absolute;  right: 15px;  bottom: 10px;}.textarea-tips .share-text__counter_current {  color: #07C160;}.textarea-tips .share-text__counter_warn {  color: #fa5151;}.textarea-area {  position: relative;  padding: 10px;  border-radius: 3px;  width: 270px;  border: 1px solid #DFE3E5;}.textarea-area textarea {  height: 57px;  margin-bottom: 33px;  min-height: auto;}.textarea-area .weui-desktop-form__msg_warn {  padding-top: 0;  padding-bottom: 0;  margin-right: 10px;  margin-left: 10px;  margin-top: -29px;}.gray-content {  color: #9a9a9a;}.original-label {  margin-left: 2px;  font-size: 12px;  color: #ffffff;  padding: 0 5px;  border-radius: 2px;  display: inline-block;  background-color: rgba(0, 0, 0, 0.4);}.bold {  color: #353535;  font-weight: bold;}.tl {  text-align: left !important;}.black-link {  font-size: 14px;  color: #353535 !important;}.black-link:hover {  text-decoration: underline;}.original-table__wrap {  min-height: 240px;  max-height: 400px;  min-width: 750px;  overflow: auto;  width: 100%;  padding: 0 30px;  box-sizing: border-box;}.origin_dialog_bd {  padding: 66px 45px 0;}.icon-wenhao {  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAYAAADsHujfAAAABGdBTUEAALGPC/xhBQAABb9JREFUWAm1mFtMnEUUx9nlFhsKUSMBFxWpaFOrAuLdh4JWm7XEJhIa0Yhc9bGpWhMTm5QmJsWXvlm5rTyZIA8alFSD8OKtiniLpC2GNpblZmMDDyiwgL//53zbj+XbW5tOcnZmzvzPZc7MnG9mPSlJlJGRkfTR0dFKj8fz7Pr6ejG1D/ECo2ISXhDeOPUnZWVlQ+Xl5SuJqvckAuzo6CjAwOG1tbVq8NcnIgP+b3B90NHm5ubJeDIxHent7b1ufn7+EDM8hKItRtkaRr6CvsWxIDzbSIHX6/WBfQR6HL7X4BfBtuXk5LTV1NT8Y3ibqqiOdHd3F62urg6g9C4j9acU0u5jhrObNDkYgUAgLxQKPWcmcKuGkD2Tmprqb2homHBAw01XRzo7Ox9ktv2gcqFFZnosOzv73VgzCmt0NBTRhYWFN9D1JmxFdA5dVU1NTd87YFZzkyNE4iFmM2QEtfn8RODXSMFk+uyxe4nOADLa3ItpaWmVROaUU8cGR3DiJpbjR4RuAfSbccLeA065pNva8MaZe9B7gWW6H2f+shXZGyqFMKbixIdyAuAswD2J7HZbUbxauqRTumVDtmTTlkuzG5yOlwA8QT+EwH68nbLH3GpmuBv+y9BOaCuyY6z/SfbSe+ylVXibSmNj4xRR38/SD8qWbAIKCGgtjUlUZ+kXQm0tLS3aXK5lYGAgMxgMdqHoBTcAM/45IyNjb11dnY62a2lvbz/GgFLCeRLfnUp81tKQLRthFkILOiHUUcvU1NQROYHBVegdNt4u6GHk3qL/L2Mly8vLAeoN+8+p0NhYgFdobKdYS4OCVxAU9jhHSxnRtZAfthPW1zWIzKtgOx3AUxz7P9DTC+0Gq2UedIyHm7JBVI7DOCzb1Ce8PT09yoYlQqWnp1vrpbZbwYmnwKYiPLtt27YPIjEY+AjeRfHJHWWR486+bUu25YN3aWnJbwBj9fX1553gyDYO3CYewqcrKipCkeOmP6caR5QCohZja0wA+aClqVQHI5+pjlVQ/gXrq+N3xg3X39+/ZXp6utCM/e6GieApye3AdoUcKdAgyi3v1I5WOE2fMyZyLTMzM60MKJWHCP2XriAHEwfGsCtOgZdOnlrMdEb1lRbySj1KX5M8OlsJ/Xg8XeCmDSbfi7DlCGG/Yke6urq0iduNEwGy6NF4Tmjctikfwik+EUE3DEf2DtK1TksaM+zj3tHshovH09JYkWBprMjEE4gcZ1aafTb0i8/nezFaeo+UU9+2KR8UEWudUJi0I0TjBuR1fVQ54vf7l/5vJvbrsDktRyaN2N2JiV9GMZMd9KzsnJ+fH/U0XZbY2EJeH0yVSW3WYbVgPqM6yaKjekmhraqqWkxSVnC/fpAf8rDjb2azWV9KGEXs+HMavNaF4347QbDur1w7fF7dEXDgJ2O4/lo74NBv2ZJt+WAdXzrvG8ABPkA3OsAxm2zWfXxFz4q48MT8tjgVGRsHDO+EasuRkpKSbpw5R6i2cpeIeilyKlMbvI5tsaF08RIpsiFbsllaWhqQjOWIbkgMtBolB1m/XaYdr9JxvSRC6Vo8sMbZkxVUB9WWTftZGr5FwfTigI7gk9BcZmZmWazrnhQlW3Tv4JM/ilwuNMjBeNqegBURKRQjKyvreeoLAhK+k8msu3TEKtIlnWByZcPYCkcx7IiU1NbWXgSkTLlIhHZyrL8jlPdp7GqKdEiXdKJHb+Fq2XLqDC+Nk8l984GVlZVP4SmECT2infJ22+URP8c9ZS9XhB9sjF27OqJBk3AGaG5XX+GE2kg+fSiKeWVgInlEoJoI6J8E+1ifRl7PV9eEGdURGXd5RIutvyW+hr7ho6W3sZWVMejja6qL+KPQY+DsZU/oER/TEVlVITq6Tr4NaZb64sYtOKhnSR909X/URFobHh5Om5iYqCQS+3CoGGOKgF74WrogbUVonMh8XFRUNBTjph+pOuU/U5uwM0vfkSQAAAAASUVORK5CYII=);  background-size: 17px 18px;  width: 17px;  height: 18px;  display: inline-block;  cursor: pointer;  margin-left: 5px;  vertical-align: middle;  background-repeat: no-repeat;}.icon-file {  display: inline-block;  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAMAAABMOI/cAAAADFBMVEUAAACdnZ2bm5uamprkb5frAAAAA3RSTlMASePizoNQAAAANElEQVR4AWNgZGLGApgYGSDimDIMzMwMmAAkOvASMEfilKC15QiAU2JoWE5/CZwJDmcSBQAW5AMJVP7LrQAAAABJRU5ErkJggg==);  width: 12px;  height: 14px;  background-size: 12px 14px;  vertical-align: middle;  margin-right: 5px;}.icon-arrow {  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAABGdBTUEAALGPC/xhBQAAAE1JREFUGBljNDMza/j//389AxGAkZGxkfnp06cHZGRkGIHqHfDpASk+depUAzNIESFNMMUgtWAN+DQhK0bRgE0TumKQGqwAFBAgjE0SABXvJQzoKuPQAAAAAElFTkSuQmCC);  width: 6px;  height: 3px;  background-size: 6px 3px;  display: inline-block;  background-position: center center;  vertical-align: middle;  padding: 5px;  background-repeat: no-repeat;}.ad_transition_area {  margin-bottom: 20px;}.ad_transition_area.hide {  display: none;}.related_video_area {  margin-top: 20px;}.related_video_area .weui-desktop-popover__wrp {  vertical-align: -4px;}.related_video_img {  max-width: 100%;  margin-top: 5px;}.share-white_button {  display: inline-block;  box-shadow: 0px 1px 6px 0px #e4e8eb;  width: 86px;  height: 38px;  background-color: #ffffff;  font-size: 14px;  line-height: 38px;  color: #353535;  padding: 0 0 0 10px;  position: absolute;  cursor: pointer;}.share-white_button:hover {  background-color: #F7F7F7;}.pb-position {  position: relative;}.original_td-max-width {  width: 380px;  padding-right: 80px !important;}.weui-desktop-wechat-search {  position: relative;}.weui-desktop-wechat-search .weui-desktop-form-tag__input {  width: 14em;  font-size: 14px;}.weui-desktop-wechat-search .weui-desktop-opr-btn_close {  display: inline-block;}.weui-desktop-pop-panel {  position: absolute;  top: 100%;  left: 0;  right: 0;  background: #FFFFFF;  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);  border-radius: 2px;  padding: 15px 0;  z-index: 1;}.weui-desktop-pop-panel__hd {  padding: 0 20px 15px;}.weui-desktop-pop-panel__hd .weui-desktop-global__info {  color: #9A9A9A;}.weui-desktop-wechat-list {  max-height: 300px;  overflow: auto;}.weui-desktop-wechat {  padding: 9px 40px 9px 20px;  width: auto;  overflow: hidden;  text-overflow: ellipsis;  white-space: nowrap;  word-wrap: normal;  color: #353535;}.weui-desktop-wechat:hover {  background-color: #FAFAFA;  cursor: pointer;}.weui-desktop-wechat_selected {  color: #07C160;  position: relative;}.weui-desktop-wechat_selected:after {  content: \" \";  width: 8px;  height: 4px;  border-left: 2px solid #21B020;  border-bottom: 2px solid #21B020;  border-radius: 1px;  transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);  -ms-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);  -webkit-transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);  position: absolute;  right: 20px;  top: 50%;  margin-top: -4px;}.wechat_send_dialog .dialog_bd {  padding: 45px 100px 0;  min-height: 355px;}.wechat_send_dialog .frm_control_group {  padding-bottom: 0;}.wechat_send_dialog .frm_tips,.wechat_send_dialog .frm_msg {  width: auto;}.wechat_send_content.with_qrcheck .wechat_send_qrcheck {  display: block;}.wechat_send_extra_info {  padding-top: 10px;}.wechat_send_extra_info:after {  content: \"\\200B\";  display: block;  height: 0;  clear: both;}.wechat_send_msg {  float: none;  display: table-cell;  word-break: break-all;  vertical-align: top;  width: auto;}.wechat_send_msg:after {  content: \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . \";  display: block;  clear: both;  height: 0;  line-height: 0;  visibility: hidden;}.wechat_send_qrcheck {  float: right;  margin-left: 50px;  padding-left: 40px;  border-left: 1px solid #E7E7EB;  text-align: center;  display: none;}.wechat_send_qrcheck_img {  width: 140px;  height: 140px;  margin-bottom: 10px;}.weui-desktop-form-tag__wrp {  margin: 0;}";});define("pages/editor/eventBus4Web1.js",[],function(e,n,s){"use strict"
var t=new Vue
window.web2_eventBus||(window.web2_eventBus=t),s.exports=t})
define("3rd/moment/moment.js",[],function(t,e,n){var i
function h(){return i.apply(null,arguments)}function s(t){return"[object Array]"===Object.prototype.toString.call(t)}function a(t){return t instanceof Date||"[object Date]"===Object.prototype.toString.call(t)}function f(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function o(t,e){for(var n in e)f(e,n)&&(t[n]=e[n])
return f(e,"toString")&&(t.toString=e.toString),f(e,"valueOf")&&(t.valueOf=e.valueOf),t}function u(t,e,n,i){return zt(t,e,n,i,!0).utc()}function m(t){return null==t._pf&&(t._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}),t._pf}function l(t){if(null==t._isValid){var e=m(t)
t._isValid=!(isNaN(t._d.getTime())||!(e.overflow<0)||e.empty||e.invalidMonth||e.invalidWeekday||e.nullInput||e.invalidFormat||e.userInvalidated),t._strict&&(t._isValid=t._isValid&&0===e.charsLeftOver&&0===e.unusedTokens.length&&void 0===e.bigHour)}return t._isValid}function d(t){var e=u(NaN)
return null!=t?o(m(e),t):m(e).userInvalidated=!0,e}var c=h.momentProperties=[]
function _(t,e){var n,i,r
if(void 0!==e._isAMomentObject&&(t._isAMomentObject=e._isAMomentObject),void 0!==e._i&&(t._i=e._i),void 0!==e._f&&(t._f=e._f),void 0!==e._l&&(t._l=e._l),void 0!==e._strict&&(t._strict=e._strict),void 0!==e._tzm&&(t._tzm=e._tzm),void 0!==e._isUTC&&(t._isUTC=e._isUTC),void 0!==e._offset&&(t._offset=e._offset),void 0!==e._pf&&(t._pf=m(e)),void 0!==e._locale&&(t._locale=e._locale),0<c.length)for(n in c)void 0!==(r=e[i=c[n]])&&(t[i]=r)
return t}var r=!1
function y(t){_(this,t),this._d=new Date(null!=t._d?t._d.getTime():NaN),!1===r&&(r=!0,h.updateOffset(this),r=!1)}function v(t){return t instanceof y||null!=t&&null!=t._isAMomentObject}function g(t){return t<0?Math.ceil(t):Math.floor(t)}function p(t){var e=+t,n=0
return 0!=e&&isFinite(e)&&(n=g(e)),n}function D(t,e,n){var i,r=Math.min(t.length,e.length),s=Math.abs(t.length-e.length),a=0
for(i=0;i<r;i++)(n&&t[i]!==e[i]||!n&&p(t[i])!==p(e[i]))&&a++
return a+s}function M(){}var Y,w={}
function S(t){return t?t.toLowerCase().replace("_","-"):t}function k(t){if(!w[t]&&void 0!==n&&n&&n.exports)try{T(Y._abbr)}catch(t){}return w[t]}function T(t,e){var n
return t&&(n=void 0===e?O(t):b(t,e))&&(Y=n),Y._abbr}function b(t,e){return null!==e?(e.abbr=t,w[t]=w[t]||new M,w[t].set(e),T(t),w[t]):(delete w[t],null)}function O(t){var e
if(t&&t._locale&&t._locale._abbr&&(t=t._locale._abbr),!t)return Y
if(!s(t)){if(e=k(t))return e
t=[t]}return function(t){for(var e,n,i,r,s=0;s<t.length;){for(e=(r=S(t[s]).split("-")).length,n=(n=S(t[s+1]))?n.split("-"):null;0<e;){if(i=k(r.slice(0,e).join("-")))return i
if(n&&n.length>=e&&D(r,n,!0)>=e-1)break
e--}s++}return null}(t)}var U={}
function W(t,e){var n=t.toLowerCase()
U[n]=U[n+"s"]=U[e]=t}function C(t){return"string"==typeof t?U[t]||U[t.toLowerCase()]:void 0}function G(t){var e,n,i={}
for(n in t)f(t,n)&&(e=C(n))&&(i[e]=t[n])
return i}function F(e,n){return function(t){return null!=t?(x(this,e,t),h.updateOffset(this,n),this):P(this,e)}}function P(t,e){return t._d["get"+(t._isUTC?"UTC":"")+e]()}function x(t,e,n){return t._d["set"+(t._isUTC?"UTC":"")+e](n)}function H(t,e){var n
if("object"==typeof t)for(n in t)this.set(n,t[n])
else if("function"==typeof this[t=C(t)])return this[t](e)
return this}function L(t,e,n){var i=""+Math.abs(t),r=e-i.length
return(0<=t?n?"+":"":"-")+Math.pow(10,Math.max(0,r)).toString().substr(1)+i}var I=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,A=/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,z={},N={}
function Z(t,e,n,i){var r=i
"string"==typeof i&&(r=function(){return this[i]()}),t&&(N[t]=r),e&&(N[e[0]]=function(){return L(r.apply(this,arguments),e[1],e[2])}),n&&(N[n]=function(){return this.localeData().ordinal(r.apply(this,arguments),t)})}function j(t,e){return t.isValid()?(e=E(e,t.localeData()),z[e]=z[e]||function(n){var i,r,t,s=n.match(I)
for(i=0,r=s.length;i<r;i++)N[s[i]]?s[i]=N[s[i]]:s[i]=(t=s[i]).match(/\[[\s\S]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"")
return function(t){var e=""
for(i=0;i<r;i++)e+=s[i]instanceof Function?s[i].call(t,n):s[i]
return e}}(e),z[e](t)):t.localeData().invalidDate()}function E(t,e){var n=5
function i(t){return e.longDateFormat(t)||t}for(A.lastIndex=0;0<=n&&A.test(t);)t=t.replace(A,i),A.lastIndex=0,--n
return t}var V=/\d/,q=/\d\d/,J=/\d{3}/,$=/\d{4}/,R=/[+-]?\d{6}/,B=/\d\d?/,Q=/\d{1,3}/,X=/\d{1,4}/,K=/[+-]?\d{1,6}/,tt=/\d+/,et=/[+-]?\d+/,nt=/Z|[+-]\d\d:?\d\d/gi,it=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,rt={}
function st(t,e,n){var i
rt[t]="function"==typeof(i=e)&&"[object Function]"===Object.prototype.toString.call(i)?e:function(t){return t&&n?n:e}}function at(t,e){return f(rt,t)?rt[t](e._strict,e._locale):new RegExp(t.replace("\\","").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(t,e,n,i,r){return e||n||i||r}).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"))}var ot={}
function ut(t,n){var e,i=n
for("string"==typeof t&&(t=[t]),"number"==typeof n&&(i=function(t,e){e[n]=p(t)}),e=0;e<t.length;e++)ot[t[e]]=i}function lt(t,r){ut(t,function(t,e,n,i){n._w=n._w||{},r(t,n._w,n,i)})}var dt=0,ct=1,ht=2,ft=3,mt=4,_t=5,yt=6
function vt(t,e){return new Date(Date.UTC(t,e+1,0)).getUTCDate()}Z("M",["MM",2],"Mo",function(){return this.month()+1}),Z("MMM",0,0,function(t){return this.localeData().monthsShort(this,t)}),Z("MMMM",0,0,function(t){return this.localeData().months(this,t)}),W("month","M"),st("M",B),st("MM",B,q),st("MMM",it),st("MMMM",it),ut(["M","MM"],function(t,e){e[ct]=p(t)-1}),ut(["MMM","MMMM"],function(t,e,n,i){var r=n._locale.monthsParse(t,i,n._strict)
null!=r?e[ct]=r:m(n).invalidMonth=t})
var gt="January_February_March_April_May_June_July_August_September_October_November_December".split("_")
var pt="Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
function Dt(t,e){var n
return"string"==typeof e&&"number"!=typeof(e=t.localeData().monthsParse(e))||(n=Math.min(t.date(),vt(t.year(),e)),t._d["set"+(t._isUTC?"UTC":"")+"Month"](e,n)),t}function Mt(t){return null!=t?(Dt(this,t),h.updateOffset(this,!0),this):P(this,"Month")}function Yt(t){var e,n=t._a
return n&&-2===m(t).overflow&&(e=n[ct]<0||11<n[ct]?ct:n[ht]<1||n[ht]>vt(n[dt],n[ct])?ht:n[ft]<0||24<n[ft]||24===n[ft]&&(0!==n[mt]||0!==n[_t]||0!==n[yt])?ft:n[mt]<0||59<n[mt]?mt:n[_t]<0||59<n[_t]?_t:n[yt]<0||999<n[yt]?yt:-1,m(t)._overflowDayOfYear&&(e<dt||ht<e)&&(e=ht),m(t).overflow=e),t}function wt(t){!1===h.suppressDeprecationWarnings&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+t)}function St(t,e){var n=!0
return o(function(){return n&&(wt(t+"\n"+(new Error).stack),n=!1),e.apply(this,arguments)},e)}var kt={}
h.suppressDeprecationWarnings=!1
var Tt=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,bt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Ot=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Ut=/^\/?Date\((\-?\d+)/i
function Wt(t){var e,n,i=t._i,r=Tt.exec(i)
if(r){for(m(t).iso=!0,e=0,n=bt.length;e<n;e++)if(bt[e][1].exec(i)){t._f=bt[e][0]
break}for(e=0,n=Ot.length;e<n;e++)if(Ot[e][1].exec(i)){t._f+=(r[6]||" ")+Ot[e][0]
break}i.match(nt)&&(t._f+="Z"),It(t)}else t._isValid=!1}function Ct(t){var e=new Date(Date.UTC.apply(null,arguments))
return t<1970&&e.setUTCFullYear(t),e}function Gt(t){return Ft(t)?366:365}function Ft(t){return t%4==0&&t%100!=0||t%400==0}h.createFromInputFallback=St("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(t){t._d=new Date(t._i+(t._useUTC?" UTC":""))}),Z(0,["YY",2],0,function(){return this.year()%100}),Z(0,["YYYY",4],0,"year"),Z(0,["YYYYY",5],0,"year"),Z(0,["YYYYYY",6,!0],0,"year"),W("year","y"),st("Y",et),st("YY",B,q),st("YYYY",X,$),st("YYYYY",K,R),st("YYYYYY",K,R),ut(["YYYYY","YYYYYY"],dt),ut("YYYY",function(t,e){e[dt]=2===t.length?h.parseTwoDigitYear(t):p(t)}),ut("YY",function(t,e){e[dt]=h.parseTwoDigitYear(t)})
var Pt=F("FullYear",!(h.parseTwoDigitYear=function(t){return p(t)+(68<p(t)?1900:2e3)}))
function xt(t,e,n){var i,r=n-e,s=n-t.day()
return r<s&&(s-=7),s<r-7&&(s+=7),i=Nt(t).add(s,"d"),{week:Math.ceil(i.dayOfYear()/7),year:i.year()}}Z("w",["ww",2],"wo","week"),Z("W",["WW",2],"Wo","isoWeek"),W("week","w"),W("isoWeek","W"),st("w",B),st("ww",B,q),st("W",B),st("WW",B,q),lt(["w","ww","W","WW"],function(t,e,n,i){e[i.substr(0,1)]=p(t)})
function Ht(t,e,n){return null!=t?t:null!=e?e:n}function Lt(t){var e,n,i,r,s=[]
if(!t._d){var a,o
for(a=t,o=new Date,i=a._useUTC?[o.getUTCFullYear(),o.getUTCMonth(),o.getUTCDate()]:[o.getFullYear(),o.getMonth(),o.getDate()],t._w&&null==t._a[ht]&&null==t._a[ct]&&function(t){var e,n,i,r,s,a,o
null!=(e=t._w).GG||null!=e.W||null!=e.E?(s=1,a=4,n=Ht(e.GG,t._a[dt],xt(Nt(),1,4).year),i=Ht(e.W,1),r=Ht(e.E,1)):(s=t._locale._week.dow,a=t._locale._week.doy,n=Ht(e.gg,t._a[dt],xt(Nt(),s,a).year),i=Ht(e.w,1),null!=e.d?(r=e.d)<s&&++i:r=null!=e.e?e.e+s:s)
o=function(t,e,n,i,r){var s,a=6+r-i,o=Ct(t,0,1+a).getUTCDay()
return o<r&&(o+=7),{year:0<(s=1+a+7*(e-1)-o+(n=null!=n?+n:r))?t:t-1,dayOfYear:0<s?s:Gt(t-1)+s}}(n,i,r,a,s),t._a[dt]=o.year,t._dayOfYear=o.dayOfYear}(t),t._dayOfYear&&(r=Ht(t._a[dt],i[dt]),t._dayOfYear>Gt(r)&&(m(t)._overflowDayOfYear=!0),n=Ct(r,0,t._dayOfYear),t._a[ct]=n.getUTCMonth(),t._a[ht]=n.getUTCDate()),e=0;e<3&&null==t._a[e];++e)t._a[e]=s[e]=i[e]
for(;e<7;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e]
24===t._a[ft]&&0===t._a[mt]&&0===t._a[_t]&&0===t._a[yt]&&(t._nextDay=!0,t._a[ft]=0),t._d=(t._useUTC?Ct:function(t,e,n,i,r,s,a){var o=new Date(t,e,n,i,r,s,a)
return t<1970&&o.setFullYear(t),o}).apply(null,s),null!=t._tzm&&t._d.setUTCMinutes(t._d.getUTCMinutes()-t._tzm),t._nextDay&&(t._a[ft]=24)}}function It(t){if(t._f!==h.ISO_8601){t._a=[],m(t).empty=!0
var e,n,i,r,s,a,o,u,l=""+t._i,d=l.length,c=0
for(i=E(t._f,t._locale).match(I)||[],e=0;e<i.length;e++)r=i[e],(n=(l.match(at(r,t))||[])[0])&&(0<(s=l.substr(0,l.indexOf(n))).length&&m(t).unusedInput.push(s),l=l.slice(l.indexOf(n)+n.length),c+=n.length),N[r]?(n?m(t).empty=!1:m(t).unusedTokens.push(r),a=r,u=t,null!=(o=n)&&f(ot,a)&&ot[a](o,u._a,u,a)):t._strict&&!n&&m(t).unusedTokens.push(r)
m(t).charsLeftOver=d-c,0<l.length&&m(t).unusedInput.push(l),!0===m(t).bigHour&&t._a[ft]<=12&&0<t._a[ft]&&(m(t).bigHour=void 0),t._a[ft]=function(t,e,n){var i
if(null==n)return e
return null!=t.meridiemHour?t.meridiemHour(e,n):(null!=t.isPM&&((i=t.isPM(n))&&e<12&&(e+=12),i||12!==e||(e=0)),e)}(t._locale,t._a[ft],t._meridiem),Lt(t),Yt(t)}else Wt(t)}function At(t){var e,n,i=t._i,r=t._f
return t._locale=t._locale||O(t._l),null===i||void 0===r&&""===i?d({nullInput:!0}):("string"==typeof i&&(t._i=i=t._locale.preparse(i)),v(i)?new y(Yt(i)):(s(r)?function(t){var e,n,i,r,s
if(0===t._f.length)return m(t).invalidFormat=!0,t._d=new Date(NaN)
for(r=0;r<t._f.length;r++)s=0,e=_({},t),null!=t._useUTC&&(e._useUTC=t._useUTC),e._f=t._f[r],It(e),l(e)&&(s+=m(e).charsLeftOver,s+=10*m(e).unusedTokens.length,m(e).score=s,(null==i||s<i)&&(i=s,n=e))
o(t,n||e)}(t):r?It(t):a(i)?t._d=i:void 0===(n=(e=t)._i)?e._d=new Date:a(n)?e._d=new Date(+n):"string"==typeof n?function(t){var e=Ut.exec(t._i)
null===e?(Wt(t),!1===t._isValid&&(delete t._isValid,h.createFromInputFallback(t))):t._d=new Date(+e[1])}(e):s(n)?(e._a=function(t,e){var n,i=[]
for(n=0;n<t.length;++n)i.push(e(t[n],n))
return i}(n.slice(0),function(t){return parseInt(t,10)}),Lt(e)):"object"==typeof n?function(t){if(!t._d){var e=G(t._i)
t._a=[e.year,e.month,e.day||e.date,e.hour,e.minute,e.second,e.millisecond],Lt(t)}}(e):"number"==typeof n?e._d=new Date(n):h.createFromInputFallback(e),t))}function zt(t,e,n,i,r){var s,a={}
return"boolean"==typeof n&&(i=n,n=void 0),a._isAMomentObject=!0,a._useUTC=a._isUTC=r,a._l=n,a._i=t,a._f=e,a._strict=i,(s=new y(Yt(At(a))))._nextDay&&(s.add(1,"d"),s._nextDay=void 0),s}function Nt(t,e,n,i){return zt(t,e,n,i,!1)}Z("DDD",["DDDD",3],"DDDo","dayOfYear"),W("dayOfYear","DDD"),st("DDD",Q),st("DDDD",J),ut(["DDD","DDDD"],function(t,e,n){n._dayOfYear=p(t)}),h.ISO_8601=function(){}
var Zt=St("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(){var t=Nt.apply(null,arguments)
return t<this?this:t}),jt=St("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(){var t=Nt.apply(null,arguments)
return this<t?this:t})
function Et(t,e){var n,i
if(1===e.length&&s(e[0])&&(e=e[0]),!e.length)return Nt()
for(n=e[0],i=1;i<e.length;++i)e[i].isValid()&&!e[i][t](n)||(n=e[i])
return n}function Vt(t){var e=G(t),n=e.year||0,i=e.quarter||0,r=e.month||0,s=e.week||0,a=e.day||0,o=e.hour||0,u=e.minute||0,l=e.second||0,d=e.millisecond||0
this._milliseconds=+d+1e3*l+6e4*u+36e5*o,this._days=+a+7*s,this._months=+r+3*i+12*n,this._data={},this._locale=O(),this._bubble()}function qt(t){return t instanceof Vt}function Jt(t,n){Z(t,0,0,function(){var t=this.utcOffset(),e="+"
return t<0&&(t=-t,e="-"),e+L(~~(t/60),2)+n+L(~~t%60,2)})}Jt("Z",":"),Jt("ZZ",""),st("Z",nt),st("ZZ",nt),ut(["Z","ZZ"],function(t,e,n){n._useUTC=!0,n._tzm=Rt(t)})
var $t=/([\+\-]|\d\d)/gi
function Rt(t){var e=(t||"").match(nt)||[],n=((e[e.length-1]||[])+"").match($t)||["-",0,0],i=60*n[1]+p(n[2])
return"+"===n[0]?i:-i}function Bt(t,e){var n,i
return e._isUTC?(n=e.clone(),i=(v(t)||a(t)?+t:+Nt(t))-n,n._d.setTime(+n._d+i),h.updateOffset(n,!1),n):Nt(t).local()}function Qt(t){return 15*-Math.round(t._d.getTimezoneOffset()/15)}function Xt(){return this._isUTC&&0===this._offset}h.updateOffset=function(){}
var Kt=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,te=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/
function ee(t,e){var n,i,r,s=t,a=null
return qt(t)?s={ms:t._milliseconds,d:t._days,M:t._months}:"number"==typeof t?(s={},e?s[e]=t:s.milliseconds=t):(a=Kt.exec(t))?(n="-"===a[1]?-1:1,s={y:0,d:p(a[ht])*n,h:p(a[ft])*n,m:p(a[mt])*n,s:p(a[_t])*n,ms:p(a[yt])*n}):(a=te.exec(t))?(n="-"===a[1]?-1:1,s={y:ne(a[2],n),M:ne(a[3],n),d:ne(a[4],n),h:ne(a[5],n),m:ne(a[6],n),s:ne(a[7],n),w:ne(a[8],n)}):null==s?s={}:"object"==typeof s&&("from"in s||"to"in s)&&(r=function(t,e){var n
e=Bt(e,t),t.isBefore(e)?n=ie(t,e):((n=ie(e,t)).milliseconds=-n.milliseconds,n.months=-n.months)
return n}(Nt(s.from),Nt(s.to)),(s={}).ms=r.milliseconds,s.M=r.months),i=new Vt(s),qt(t)&&f(t,"_locale")&&(i._locale=t._locale),i}function ne(t,e){var n=t&&parseFloat(t.replace(",","."))
return(isNaN(n)?0:n)*e}function ie(t,e){var n={milliseconds:0,months:0}
return n.months=e.month()-t.month()+12*(e.year()-t.year()),t.clone().add(n.months,"M").isAfter(e)&&--n.months,n.milliseconds=e-t.clone().add(n.months,"M"),n}function re(s,a){return function(t,e){var n,i,r
return null===e||isNaN(+e)||(r="moment()."+(i=a)+"(period, number) is deprecated. Please use moment()."+a+"(number, period).",kt[i]||(wt(r),kt[i]=!0),n=t,t=e,e=n),se(this,ee(t="string"==typeof t?+t:t,e),s),this}}function se(t,e,n,i){var r=e._milliseconds,s=e._days,a=e._months
i=null==i||i,r&&t._d.setTime(+t._d+r*n),s&&x(t,"Date",P(t,"Date")+s*n),a&&Dt(t,P(t,"Month")+a*n),i&&h.updateOffset(t,s||a)}ee.fn=Vt.prototype
var ae=re(1,"add"),oe=re(-1,"subtract")
function ue(){var t=this.clone().utc()
return 0<t.year()&&t.year()<=9999?"function"==typeof Date.prototype.toISOString?this.toDate().toISOString():j(t,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):j(t,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")}function le(t){var e
return void 0===t?this._locale._abbr:(null!=(e=O(t))&&(this._locale=e),this)}h.defaultFormat="YYYY-MM-DDTHH:mm:ssZ"
var de=St("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",function(t){return void 0===t?this.localeData():this.locale(t)})
function ce(){return this._locale}function he(t,e){Z(0,[t,t.length],0,e)}function fe(t,e,n){return xt(Nt([t,11,31+e-n]),e,n).week}Z(0,["gg",2],0,function(){return this.weekYear()%100}),Z(0,["GG",2],0,function(){return this.isoWeekYear()%100}),he("gggg","weekYear"),he("ggggg","weekYear"),he("GGGG","isoWeekYear"),he("GGGGG","isoWeekYear"),W("weekYear","gg"),W("isoWeekYear","GG"),st("G",et),st("g",et),st("GG",B,q),st("gg",B,q),st("GGGG",X,$),st("gggg",X,$),st("GGGGG",K,R),st("ggggg",K,R),lt(["gggg","ggggg","GGGG","GGGGG"],function(t,e,n,i){e[i.substr(0,2)]=p(t)}),lt(["gg","GG"],function(t,e,n,i){e[i]=h.parseTwoDigitYear(t)}),Z("Q",0,0,"quarter"),W("quarter","Q"),st("Q",V),ut("Q",function(t,e){e[ct]=3*(p(t)-1)}),Z("D",["DD",2],"Do","date"),W("date","D"),st("D",B),st("DD",B,q),st("Do",function(t,e){return t?e._ordinalParse:e._ordinalParseLenient}),ut(["D","DD"],ht),ut("Do",function(t,e){e[ht]=p(t.match(B)[0])})
var me=F("Date",!0)
Z("d",0,"do","day"),Z("dd",0,0,function(t){return this.localeData().weekdaysMin(this,t)}),Z("ddd",0,0,function(t){return this.localeData().weekdaysShort(this,t)}),Z("dddd",0,0,function(t){return this.localeData().weekdays(this,t)}),Z("e",0,0,"weekday"),Z("E",0,0,"isoWeekday"),W("day","d"),W("weekday","e"),W("isoWeekday","E"),st("d",B),st("e",B),st("E",B),st("dd",it),st("ddd",it),st("dddd",it),lt(["dd","ddd","dddd"],function(t,e,n){var i=n._locale.weekdaysParse(t)
null!=i?e.d=i:m(n).invalidWeekday=t}),lt(["d","e","E"],function(t,e,n,i){e[i]=p(t)})
var _e="Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
var ye="Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
var ve="Su_Mo_Tu_We_Th_Fr_Sa".split("_")
function ge(t,e){Z(t,0,0,function(){return this.localeData().meridiem(this.hours(),this.minutes(),e)})}function pe(t,e){return e._meridiemParse}Z("H",["HH",2],0,"hour"),Z("h",["hh",2],0,function(){return this.hours()%12||12}),ge("a",!0),ge("A",!1),W("hour","h"),st("a",pe),st("A",pe),st("H",B),st("h",B),st("HH",B,q),st("hh",B,q),ut(["H","HH"],ft),ut(["a","A"],function(t,e,n){n._isPm=n._locale.isPM(t),n._meridiem=t}),ut(["h","hh"],function(t,e,n){e[ft]=p(t),m(n).bigHour=!0})
var De=F("Hours",!0)
Z("m",["mm",2],0,"minute"),W("minute","m"),st("m",B),st("mm",B,q),ut(["m","mm"],mt)
var Me=F("Minutes",!1)
Z("s",["ss",2],0,"second"),W("second","s"),st("s",B),st("ss",B,q),ut(["s","ss"],_t)
var Ye,we=F("Seconds",!1)
for(Z("S",0,0,function(){return~~(this.millisecond()/100)}),Z(0,["SS",2],0,function(){return~~(this.millisecond()/10)}),Z(0,["SSS",3],0,"millisecond"),Z(0,["SSSS",4],0,function(){return 10*this.millisecond()}),Z(0,["SSSSS",5],0,function(){return 100*this.millisecond()}),Z(0,["SSSSSS",6],0,function(){return 1e3*this.millisecond()}),Z(0,["SSSSSSS",7],0,function(){return 1e4*this.millisecond()}),Z(0,["SSSSSSSS",8],0,function(){return 1e5*this.millisecond()}),Z(0,["SSSSSSSSS",9],0,function(){return 1e6*this.millisecond()}),W("millisecond","ms"),st("S",Q,V),st("SS",Q,q),st("SSS",Q,J),Ye="SSSS";Ye.length<=9;Ye+="S")st(Ye,tt)
function Se(t,e){e[yt]=p(1e3*("0."+t))}for(Ye="S";Ye.length<=9;Ye+="S")ut(Ye,Se)
var ke=F("Milliseconds",!1)
Z("z",0,0,"zoneAbbr"),Z("zz",0,0,"zoneName")
var Te=y.prototype
Te.add=ae,Te.calendar=function(t,e){var n=t||Nt(),i=Bt(n,this).startOf("day"),r=this.diff(i,"days",!0),s=r<-6?"sameElse":r<-1?"lastWeek":r<0?"lastDay":r<1?"sameDay":r<2?"nextDay":r<7?"nextWeek":"sameElse"
return this.format(e&&e[s]||this.localeData().calendar(s,this,Nt(n)))},Te.clone=function(){return new y(this)},Te.diff=function(t,e,n){var i,r,s=Bt(t,this),a=6e4*(s.utcOffset()-this.utcOffset())
return"year"===(e=C(e))||"month"===e||"quarter"===e?(r=function(t,e){var n,i,r=12*(e.year()-t.year())+(e.month()-t.month()),s=t.clone().add(r,"months")
i=e-s<0?(n=t.clone().add(r-1,"months"),(e-s)/(s-n)):(n=t.clone().add(1+r,"months"),(e-s)/(n-s))
return-(r+i)}(this,s),"quarter"===e?r/=3:"year"===e&&(r/=12)):(i=this-s,r="second"===e?i/1e3:"minute"===e?i/6e4:"hour"===e?i/36e5:"day"===e?(i-a)/864e5:"week"===e?(i-a)/6048e5:i),n?r:g(r)},Te.endOf=function(t){return void 0===(t=C(t))||"millisecond"===t?this:this.startOf(t).add(1,"isoWeek"===t?"week":t).subtract(1,"ms")},Te.format=function(t){var e=j(this,t||h.defaultFormat)
return this.localeData().postformat(e)},Te.from=function(t,e){return this.isValid()?ee({to:this,from:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()},Te.fromNow=function(t){return this.from(Nt(),t)},Te.to=function(t,e){return this.isValid()?ee({from:this,to:t}).locale(this.locale()).humanize(!e):this.localeData().invalidDate()},Te.toNow=function(t){return this.to(Nt(),t)},Te.get=H,Te.invalidAt=function(){return m(this).overflow},Te.isAfter=function(t,e){return"millisecond"===(e=C(void 0!==e?e:"millisecond"))?+(t=v(t)?t:Nt(t))<+this:(v(t)?+t:+Nt(t))<+this.clone().startOf(e)},Te.isBefore=function(t,e){var n
return"millisecond"===(e=C(void 0!==e?e:"millisecond"))?+this<+(t=v(t)?t:Nt(t)):(n=v(t)?+t:+Nt(t),+this.clone().endOf(e)<n)},Te.isBetween=function(t,e,n){return this.isAfter(t,n)&&this.isBefore(e,n)},Te.isSame=function(t,e){var n
return"millisecond"===(e=C(e||"millisecond"))?+this==+(t=v(t)?t:Nt(t)):(n=+Nt(t),+this.clone().startOf(e)<=n&&n<=+this.clone().endOf(e))},Te.isValid=function(){return l(this)},Te.lang=de,Te.locale=le,Te.localeData=ce,Te.max=jt,Te.min=Zt,Te.parsingFlags=function(){return o({},m(this))},Te.set=H,Te.startOf=function(t){switch(t=C(t)){case"year":this.month(0)
case"quarter":case"month":this.date(1)
case"week":case"isoWeek":case"day":this.hours(0)
case"hour":this.minutes(0)
case"minute":this.seconds(0)
case"second":this.milliseconds(0)}return"week"===t&&this.weekday(0),"isoWeek"===t&&this.isoWeekday(1),"quarter"===t&&this.month(3*Math.floor(this.month()/3)),this},Te.subtract=oe,Te.toArray=function(){var t=this
return[t.year(),t.month(),t.date(),t.hour(),t.minute(),t.second(),t.millisecond()]},Te.toObject=function(){var t=this
return{years:t.year(),months:t.month(),date:t.date(),hours:t.hours(),minutes:t.minutes(),seconds:t.seconds(),milliseconds:t.milliseconds()}},Te.toDate=function(){return this._offset?new Date(+this):this._d},Te.toISOString=ue,Te.toJSON=ue,Te.toString=function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},Te.unix=function(){return Math.floor(this/1e3)},Te.valueOf=function(){return this._d-6e4*(this._offset||0)},Te.year=Pt,Te.isLeapYear=function(){return Ft(this.year())},Te.weekYear=function(t){var e=xt(this,this.localeData()._week.dow,this.localeData()._week.doy).year
return null==t?e:this.add(t-e,"y")},Te.isoWeekYear=function(t){var e=xt(this,1,4).year
return null==t?e:this.add(t-e,"y")},Te.quarter=Te.quarters=function(t){return null==t?Math.ceil((this.month()+1)/3):this.month(3*(t-1)+this.month()%3)},Te.month=Mt,Te.daysInMonth=function(){return vt(this.year(),this.month())},Te.week=Te.weeks=function(t){var e=this.localeData().week(this)
return null==t?e:this.add(7*(t-e),"d")},Te.isoWeek=Te.isoWeeks=function(t){var e=xt(this,1,4).week
return null==t?e:this.add(7*(t-e),"d")},Te.weeksInYear=function(){var t=this.localeData()._week
return fe(this.year(),t.dow,t.doy)},Te.isoWeeksInYear=function(){return fe(this.year(),1,4)},Te.date=me,Te.day=Te.days=function(t){var e,n,i=this._isUTC?this._d.getUTCDay():this._d.getDay()
return null!=t?(e=t,n=this.localeData(),t="string"!=typeof e?e:isNaN(e)?"number"==typeof(e=n.weekdaysParse(e))?e:null:parseInt(e,10),this.add(t-i,"d")):i},Te.weekday=function(t){var e=(this.day()+7-this.localeData()._week.dow)%7
return null==t?e:this.add(t-e,"d")},Te.isoWeekday=function(t){return null==t?this.day()||7:this.day(this.day()%7?t:t-7)},Te.dayOfYear=function(t){var e=Math.round((this.clone().startOf("day")-this.clone().startOf("year"))/864e5)+1
return null==t?e:this.add(t-e,"d")},Te.hour=Te.hours=De,Te.minute=Te.minutes=Me,Te.second=Te.seconds=we,Te.millisecond=Te.milliseconds=ke,Te.utcOffset=function(t,e){var n,i=this._offset||0
return null!=t?("string"==typeof t&&(t=Rt(t)),Math.abs(t)<16&&(t*=60),!this._isUTC&&e&&(n=Qt(this)),this._offset=t,this._isUTC=!0,null!=n&&this.add(n,"m"),i!==t&&(!e||this._changeInProgress?se(this,ee(t-i,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,h.updateOffset(this,!0),this._changeInProgress=null)),this):this._isUTC?i:Qt(this)},Te.utc=function(t){return this.utcOffset(0,t)},Te.local=function(t){return this._isUTC&&(this.utcOffset(0,t),this._isUTC=!1,t&&this.subtract(Qt(this),"m")),this},Te.parseZone=function(){return this._tzm?this.utcOffset(this._tzm):"string"==typeof this._i&&this.utcOffset(Rt(this._i)),this},Te.hasAlignedHourOffset=function(t){return t=t?Nt(t).utcOffset():0,(this.utcOffset()-t)%60==0},Te.isDST=function(){return this.utcOffset()>this.clone().month(0).utcOffset()||this.utcOffset()>this.clone().month(5).utcOffset()},Te.isDSTShifted=function(){if(void 0!==this._isDSTShifted)return this._isDSTShifted
var t={}
if(_(t,this),(t=At(t))._a){var e=(t._isUTC?u:Nt)(t._a)
this._isDSTShifted=this.isValid()&&0<D(t._a,e.toArray())}else this._isDSTShifted=!1
return this._isDSTShifted},Te.isLocal=function(){return!this._isUTC},Te.isUtcOffset=function(){return this._isUTC},Te.isUtc=Xt,Te.isUTC=Xt,Te.zoneAbbr=function(){return this._isUTC?"UTC":""},Te.zoneName=function(){return this._isUTC?"Coordinated Universal Time":""},Te.dates=St("dates accessor is deprecated. Use date instead.",me),Te.months=St("months accessor is deprecated. Use month instead",Mt),Te.years=St("years accessor is deprecated. Use year instead",Pt),Te.zone=St("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779",function(t,e){return null!=t?("string"!=typeof t&&(t=-t),this.utcOffset(t,e),this):-this.utcOffset()})
var be=Te
function Oe(t){return t}var Ue=M.prototype
function We(t,e,n,i){var r=O(),s=u().set(i,e)
return r[n](s,t)}function Ce(t,e,n,i,r){if("number"==typeof t&&(e=t,t=void 0),t=t||"",null!=e)return We(t,e,n,r)
var s,a=[]
for(s=0;s<i;s++)a[s]=We(t,s,n,r)
return a}Ue._calendar={sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},Ue.calendar=function(t,e,n){var i=this._calendar[t]
return"function"==typeof i?i.call(e,n):i},Ue._longDateFormat={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Ue.longDateFormat=function(t){var e=this._longDateFormat[t],n=this._longDateFormat[t.toUpperCase()]
return e||!n?e:(this._longDateFormat[t]=n.replace(/MMMM|MM|DD|dddd/g,function(t){return t.slice(1)}),this._longDateFormat[t])},Ue._invalidDate="Invalid date",Ue.invalidDate=function(){return this._invalidDate},Ue._ordinal="%d",Ue.ordinal=function(t){return this._ordinal.replace("%d",t)},Ue._ordinalParse=/\d{1,2}/,Ue.preparse=Oe,Ue.postformat=Oe,Ue._relativeTime={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},Ue.relativeTime=function(t,e,n,i){var r=this._relativeTime[n]
return"function"==typeof r?r(t,e,n,i):r.replace(/%d/i,t)},Ue.pastFuture=function(t,e){var n=this._relativeTime[0<t?"future":"past"]
return"function"==typeof n?n(e):n.replace(/%s/i,e)},Ue.set=function(t){var e,n
for(n in t)"function"==typeof(e=t[n])?this[n]=e:this["_"+n]=e
this._ordinalParseLenient=new RegExp(this._ordinalParse.source+"|"+/\d{1,2}/.source)},Ue.months=function(t){return this._months[t.month()]},Ue._months=gt,Ue.monthsShort=function(t){return this._monthsShort[t.month()]},Ue._monthsShort=pt,Ue.monthsParse=function(t,e,n){var i,r,s
for(this._monthsParse||(this._monthsParse=[],this._longMonthsParse=[],this._shortMonthsParse=[]),i=0;i<12;i++){if(r=u([2e3,i]),n&&!this._longMonthsParse[i]&&(this._longMonthsParse[i]=new RegExp("^"+this.months(r,"").replace(".","")+"$","i"),this._shortMonthsParse[i]=new RegExp("^"+this.monthsShort(r,"").replace(".","")+"$","i")),n||this._monthsParse[i]||(s="^"+this.months(r,"")+"|^"+this.monthsShort(r,""),this._monthsParse[i]=new RegExp(s.replace(".",""),"i")),n&&"MMMM"===e&&this._longMonthsParse[i].test(t))return i
if(n&&"MMM"===e&&this._shortMonthsParse[i].test(t))return i
if(!n&&this._monthsParse[i].test(t))return i}},Ue.week=function(t){return xt(t,this._week.dow,this._week.doy).week},Ue._week={dow:0,doy:6},Ue.firstDayOfYear=function(){return this._week.doy},Ue.firstDayOfWeek=function(){return this._week.dow},Ue.weekdays=function(t){return this._weekdays[t.day()]},Ue._weekdays=_e,Ue.weekdaysMin=function(t){return this._weekdaysMin[t.day()]},Ue._weekdaysMin=ve,Ue.weekdaysShort=function(t){return this._weekdaysShort[t.day()]},Ue._weekdaysShort=ye,Ue.weekdaysParse=function(t){var e,n,i
for(this._weekdaysParse=this._weekdaysParse||[],e=0;e<7;e++)if(this._weekdaysParse[e]||(n=Nt([2e3,1]).day(e),i="^"+this.weekdays(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse[e]=new RegExp(i.replace(".",""),"i")),this._weekdaysParse[e].test(t))return e},Ue.isPM=function(t){return"p"===(t+"").toLowerCase().charAt(0)},Ue._meridiemParse=/[ap]\.?m?\.?/i,Ue.meridiem=function(t,e,n){return 11<t?n?"pm":"PM":n?"am":"AM"},T("en",{ordinalParse:/\d{1,2}(th|st|nd|rd)/,ordinal:function(t){var e=t%10
return t+(1===p(t%100/10)?"th":1==e?"st":2==e?"nd":3==e?"rd":"th")}}),h.lang=St("moment.lang is deprecated. Use moment.locale instead.",T),h.langData=St("moment.langData is deprecated. Use moment.localeData instead.",O)
var Ge=Math.abs
function Fe(t,e,n,i){var r=ee(e,n)
return t._milliseconds+=i*r._milliseconds,t._days+=i*r._days,t._months+=i*r._months,t._bubble()}function Pe(t){return t<0?Math.floor(t):Math.ceil(t)}function xe(t){return 4800*t/146097}function He(t){return 146097*t/4800}function Le(t){return function(){return this.as(t)}}var Ie=Le("ms"),Ae=Le("s"),ze=Le("m"),Ne=Le("h"),Ze=Le("d"),je=Le("w"),Ee=Le("M"),Ve=Le("y")
function qe(t){return function(){return this._data[t]}}var Je=qe("milliseconds"),$e=qe("seconds"),Re=qe("minutes"),Be=qe("hours"),Qe=qe("days"),Xe=qe("months"),Ke=qe("years")
var tn=Math.round,en={s:45,m:45,h:22,d:26,M:11}
function nn(t,e,n){var i=ee(t).abs(),r=tn(i.as("s")),s=tn(i.as("m")),a=tn(i.as("h")),o=tn(i.as("d")),u=tn(i.as("M")),l=tn(i.as("y")),d=(r<en.s?["s",r]:1===s&&["m"])||s<en.m&&["mm",s]||1===a&&["h"]||a<en.h&&["hh",a]||1===o&&["d"]||o<en.d&&["dd",o]||1===u&&["M"]||u<en.M&&["MM",u]||1===l&&["y"]||["yy",l]
return d[2]=e,d[3]=0<+t,d[4]=n,function(t,e,n,i,r){return r.relativeTime(e||1,!!n,t,i)}.apply(null,d)}var rn=Math.abs
function sn(){var t,e,n=rn(this._milliseconds)/1e3,i=rn(this._days),r=rn(this._months)
t=g(n/60),e=g(t/60),n%=60,t%=60
var s=g(r/12),a=r%=12,o=i,u=e,l=t,d=n,c=this.asSeconds()
return c?(c<0?"-":"")+"P"+(s?s+"Y":"")+(a?a+"M":"")+(o?o+"D":"")+(u||l||d?"T":"")+(u?u+"H":"")+(l?l+"M":"")+(d?d+"S":""):"P0D"}var an=Vt.prototype
an.abs=function(){var t=this._data
return this._milliseconds=Ge(this._milliseconds),this._days=Ge(this._days),this._months=Ge(this._months),t.milliseconds=Ge(t.milliseconds),t.seconds=Ge(t.seconds),t.minutes=Ge(t.minutes),t.hours=Ge(t.hours),t.months=Ge(t.months),t.years=Ge(t.years),this},an.add=function(t,e){return Fe(this,t,e,1)},an.subtract=function(t,e){return Fe(this,t,e,-1)},an.as=function(t){var e,n,i=this._milliseconds
if("month"===(t=C(t))||"year"===t)return e=this._days+i/864e5,n=this._months+xe(e),"month"===t?n:n/12
switch(e=this._days+Math.round(He(this._months)),t){case"week":return e/7+i/6048e5
case"day":return e+i/864e5
case"hour":return 24*e+i/36e5
case"minute":return 1440*e+i/6e4
case"second":return 86400*e+i/1e3
case"millisecond":return Math.floor(864e5*e)+i
default:throw new Error("Unknown unit "+t)}},an.asMilliseconds=Ie,an.asSeconds=Ae,an.asMinutes=ze,an.asHours=Ne,an.asDays=Ze,an.asWeeks=je,an.asMonths=Ee,an.asYears=Ve,an.valueOf=function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*p(this._months/12)},an._bubble=function(){var t,e,n,i,r,s=this._milliseconds,a=this._days,o=this._months,u=this._data
return 0<=s&&0<=a&&0<=o||s<=0&&a<=0&&o<=0||(s+=864e5*Pe(He(o)+a),o=a=0),u.milliseconds=s%1e3,t=g(s/1e3),u.seconds=t%60,e=g(t/60),u.minutes=e%60,n=g(e/60),u.hours=n%24,a+=g(n/24),o+=r=g(xe(a)),a-=Pe(He(r)),i=g(o/12),o%=12,u.days=a,u.months=o,u.years=i,this},an.get=function(t){return this[(t=C(t))+"s"]()},an.milliseconds=Je,an.seconds=$e,an.minutes=Re,an.hours=Be,an.days=Qe,an.weeks=function(){return g(this.days()/7)},an.months=Xe,an.years=Ke,an.humanize=function(t){var e=this.localeData(),n=nn(this,!t,e)
return t&&(n=e.pastFuture(+this,n)),e.postformat(n)},an.toISOString=sn,an.toString=sn,an.toJSON=sn,an.locale=le,an.localeData=ce,an.toIsoString=St("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",sn),an.lang=de,Z("X",0,0,"unix"),Z("x",0,0,"valueOf"),st("x",et),st("X",/[+-]?\d+(\.\d{1,3})?/),ut("X",function(t,e,n){n._d=new Date(1e3*parseFloat(t,10))}),ut("x",function(t,e,n){n._d=new Date(p(t))}),h.version="2.10.6",i=Nt,h.fn=be,h.min=function(){return Et("isBefore",[].slice.call(arguments,0))},h.max=function(){return Et("isAfter",[].slice.call(arguments,0))},h.utc=u,h.unix=function(t){return Nt(1e3*t)},h.months=function(t,e){return Ce(t,e,"months",12,"month")},h.isDate=a,h.locale=T,h.invalid=d,h.duration=ee,h.isMoment=v,h.weekdays=function(t,e){return Ce(t,e,"weekdays",7,"day")},h.parseZone=function(){return Nt.apply(null,arguments).parseZone()},h.localeData=O,h.isDuration=qt,h.monthsShort=function(t,e){return Ce(t,e,"monthsShort",12,"month")},h.weekdaysMin=function(t,e){return Ce(t,e,"weekdaysMin",7,"day")},h.defineLocale=b,h.weekdaysShort=function(t,e){return Ce(t,e,"weekdaysShort",7,"day")},h.normalizeUnits=C,h.relativeTimeThreshold=function(t,e){return void 0!==en[t]&&(void 0===e?en[t]:(en[t]=e,!0))}
var on=h
n.exports=on})
define("pages/modules/media_dialog/mass_send_dialog/mass_send_dialog.tpl.js",[],function(i,s,a){return'<div v-if="data.cgiData">    <mp-dialog v-if="!isSendTicket" title="群发消息" :width="960" v-model="innerShow">    <div class="mass-send">                  <div class="mass-send__list">        <div class="weui-desktop-table__wrp">          <table class="weui-desktop-table">            <colgroup>              <col width="220px">            </colgroup>            <thead class="weui-desktop-table__hd">              <tr>                <th>群发消息</th>                <th class="ta-c" v-show="data.cgiData.can_use_copyright">原创</th>                <th class="ta-c" v-show="data.cgiData.can_use_reward">赞赏</th>              </tr>            </thead>            <tbody class="weui-desktop-table__bd">              <tr v-for="(item,idx) in data.appmsg.multi_item">                <td>                  <b class="weui-desktop-key-tag weui-desktop-key-tag_pay" v-if="item.is_pay_subscribe == 1">付费</b>                  <div class="mass-send__item-title">{{item.title}}</div>                </td>                <td class="ta-c" v-show="data.cgiData.can_use_copyright">                  <i :class="item.isCopyright?\'mass-send__icon-check\':\'mass-send__icon-null\'"></i>                </td>                <td class="ta-c" v-show="data.cgiData.can_use_reward">                  <i :class="item.isReward?\'mass-send__icon-check\':\'mass-send__icon-null\'"></i>                </td>              </tr>            </tbody>          </table>        </div>      </div>      <div class="mass-send__form">        <mp-form>                              <mp-form-item label="定时群发">            <div class="mass-send__timer-wrp">              <mp-switch v-model="timer" @change="timerSwitchChange"></mp-switch>              <div class="weui-desktop-form__tips" v-show="timer">                你可以选择5分钟后的今、明两天内任意时刻定时群发，成功设置后不支持修改，但在设定的时间之前可取消，取消后不占用群发条数。<a target="blank" href="http://kf.qq.com/faq/170627JRVbAb170627mMza6F.html">查看详情</a>              </div>              <div class="mass-send__timer" v-if="timer">                <mp-dropdown :options="dayData" v-model="day"></mp-dropdown>                <mp-time-picker v-model="curTime" :min="minTime" @time-change="timerChange"  accuracy="minute" v-show="timer&&day==1" format="HH:mm"> </mp-time-picker>                <mp-time-picker v-model="curTime2" accuracy="minute" @time-change="timerChange" v-show="timer&&day==2" format="HH:mm"> </mp-time-picker>              </div>            </div>            <p v-show="hot_time_type!=0">{{hot_time_word}}</p>          </mp-form-item>          <mp-form-item label="分组群发">            <div class="mass-send__timer-wrp">              <mp-switch v-model="hasGroup" @change="groupSwitchChange"></mp-switch>              <div class="mass-send__group-setting" v-show="hasGroup">                <mp-region :initChina="false" @change="areaChange"></mp-region>                <mp-dropdown :options="sexData" v-model="sex"></mp-dropdown>                <mp-cascader placeholder="全部标签" v-model="group" :options="groupData"></mp-cascader>              </div>            </div>          </mp-form-item>          <mp-form-item>            <mp-verify-code v-if="needVerifycode" v-model="verifyCode"></mp-verify-code>          </mp-form-item>        </mp-form>      </div>                </div>    <div slot="footer" class="mass-send__footer">      <div class="multi-sent__notice" v-show="!timer">        <div v-show="serviceType==0||serviceType==1">          今天还可以群发<span>{{data.cgiData.time_send_today_left}}</span>次</div>        <div v-show="serviceType==2">本月还可以群发<span>{{data.cgiData.mass_send_left}}</span>次</div>      </div>      <div class="multi-sent__notice" v-show="timer">        <div v-show="day==1">今天还可以群发<span>{{data.cgiData.time_send_today_left}}</span>次</div>        <div v-show="day==2">明天还可以群发<span>{{data.cgiData.time_send_tomorrow_left}}</span>次</div>      </div>      <div class="weui-desktop-popover__wrp">                <mp-button type="primary" :disabled="submitDisabled" @click="submit" slot="target" :loading="loading">{{btTxt}}</mp-button>                      </div>    </div>  </mp-dialog>    <mp-dialog v-if="isSendTicket" title="发布卡券" :width="720" v-model="innerShow">    <div class="mass-send mass-send_card">      <div class="mass-send__form">        <h2 class="mass-send__title">消息开始群发后无法撤销，确定群发？</h2>        <mp-form>          <div class="mass-send__card-item">            <mp-form-item label="定时群发">              <div class="mass-send__timer-wrp">                <mp-switch v-model="timer" @change="timerSwitchChange"></mp-switch>              </div>            </mp-form-item>            <div class="weui-desktop-form__tips" v-show="timer">              你可以选择5分钟后的今、明两天内任意时刻定时群发，成功设置后不支持修改，但在设定的时间之前可取消，取消后不占用群发条数。<a target="blank" href="http://kf.qq.com/faq/170627JRVbAb170627mMza6F.html">查看详情</a>            </div>            <div class="mass-send__timer" v-if="timer">              <mp-dropdown :options="dayData" v-model="day"></mp-dropdown>              <mp-time-picker v-model="curTime" :min="minTime" @time-change="timerChange"  accuracy="minute" v-show="timer&&day==1" format="HH:mm"> </mp-time-picker>              <mp-time-picker v-model="curTime2" accuracy="minute" @time-change="timerChange" v-show="timer&&day==2" format="HH:mm"> </mp-time-picker>            </div>            <p v-show="hot_time_type!=0" class="weui-desktop-form__tips">{{hot_time_word}}</p>          </div>          <div class="mass-send__card-item">            <mp-form-item label="分组群发">              <div class="mass-send__timer-wrp">                <mp-switch v-model="hasGroup" @change="groupSwitchChange"></mp-switch>              </div>            </mp-form-item>            <div class="mass-send__group-setting" v-show="hasGroup">              <mp-region :initChina="false" @change="areaChange"></mp-region>              <mp-dropdown :options="sexData" v-model="sex"></mp-dropdown>              <mp-cascader placeholder="全部标签" v-model="group" :options="groupData"></mp-cascader>            </div>          </div>          <div class="mass-send__card-item"  v-if="needVerifycode">            <mp-form-item>              <mp-verify-code v-model="verifyCode"></mp-verify-code>            </mp-form-item>          </div>        </mp-form>      </div>    </div>    <div slot="footer" class="mass-send__footer">      <div class="multi-sent__notice" v-show="!timer">        <div v-show="serviceType==2">本月还可以群发<span>{{data.cgiData.mass_send_left}}</span>次</div>      </div>      <div class="multi-sent__notice" v-show="timer">        <div v-show="day==1">今天还可以群发<span>{{data.cgiData.time_send_today_left}}</span>次</div>        <div v-show="day==2">明天还可以群发<span>{{data.cgiData.time_send_tomorrow_left}}</span>次</div>      </div>      <div class="weui-desktop-popover__wrp">                <mp-button type="primary" :disabled="submitDisabled" @click="submit" slot="target" :loading="loading">{{btTxt}}</mp-button>      </div>    </div>  </mp-dialog>    <mp-dialog title="群发消息" v-model="confirmShow" @close="cancelConfirm">    <div class="dialog_bd">      <div class="weui-desktop-msg">        <div class="weui-desktop-msg__inner"> <span class="weui-desktop-msg__hd"> <i              class="weui-desktop-icon-info weui-desktop-icon_msg"></i> </span>          <div class="weui-desktop-msg__bd">            <h4 class="weui-desktop-msg__title" v-html="confirmMsg"></h4>          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="primary" @click="doConfirm">继续群发</mp-button>      <mp-button type="default" @click="cancelConfirm">取消</mp-button>    </div>  </mp-dialog>    <masssend-original-dialog v-if="originalList.length>0" :can-use-public-tag="canUsePublicTag" :realname-type="realnameType" :show="originalDialogShow" :list="originalList" :appmsgid="originalAppmsgid" @show-change="originalDialogShowChange" @submit="originalDialogSubmit" @preview="onPreview" @cancel="originalDialogCancel"></masssend-original-dialog>  <mp-dialog title="添加广告" v-model="adWarnShow">    <div class="dialog_bd">      <div class="page_msg large simple default">        <div class="inner group">          <span class="msg_icon_wrapper"><i class="icon_msg info"></i></span>          <div class="msg_content ">            {{adWarnContent}}          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="default" @click="adWarnShow=false">确定</mp-button>    </div>  </mp-dialog>  <mp-dialog title="添加广告" v-model="adViewShow" @close="adCancel">    <div class="mpda_send_panel">      <div class="mpda_preview_area">        <div class="wx_preview_default" v-for="item in adViewList">          <div class="wx_preview_default_hd">            <h3 class="wx_preview_default_title">{{nick_name}}</h3>          </div>          <div class="mpda_wrp">            <div class="mpda_area show">              <div class="mpda_placeholder">                <p class="mpda_tips">广告，也是生活的一部分</p>              </div>              <div class="mpda_inner">                <div class="mpda_hd">                  <span class="mpda_main_img img_bg_cover" :style="{backgroundImage:\'url(\'+item.ad_img+\')\'}"></span>                </div>                <div class="mpda_bd">                  <span class="mpda_logo img_bg_cover" :style="{backgroundImage:\'url(\'+item.img+\')\'}"></span>                  <div class="mpda_desc_box">                    <p class="mpda_title">{{item.nick_name}}</p>                    <p class="mpda_details">提供的广告</p>                  </div>                  <a class="mpda_btn_more" v-if="item.pt == 108 || item.pt==116">查看详情</a>                  <a class="mpda_btn_more" v-else-if="item.pt == 109">下载应用</a>                  <a class="mpda_btn_more" v-else-if="item.pt == 110 || item.pt==117">了解公众号</a>                  <a class="mpda_btn_about" id="js_btn_about" href="./about.html">关于赞助广告</a>                </div>              </div>            </div>          </div>        </div>      </div>      <div class="mpda_msg_area">        <div class="page_msg mini default">          <div class="inner">            <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>            <div class="msg_content">              <p>{{adViewContent}}</p>            </div>          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="primary" @click="adSend">群发</mp-button>      <mp-button type="default" @click="adCancel">取消</mp-button>    </div>  </mp-dialog>  <mp-dialog title="原创校验中" v-model="copyRightingShow" @close="copyRightingClose">    <div class="dialog_bd">      <div class="page_msg large simple default">        <div class="inner group">          <span class="msg_icon_wrapper"><i class="icon_msg waiting"></i></span>          <div class="msg_content ">            {{copyRightingContent}}          </div>        </div>      </div>    </div>  </mp-dialog>  <mp-dialog title="原创校验超时" v-model="copyRightedShow" @close="copyRightedClose">    <div class="dialog_bd">      <div class="page_msg large simple default">        <div class="inner group">          <span class="msg_icon_wrapper"><i class="icon_msg warn_primary"></i></span>          <div class="msg_content ">            原创校验超时，暂时无法声明原创|你可以选择继续群发，先以非原创的样式发出。原创校验一旦完成，将对已群发并成功声明原创的文章补上原创标志，若文章有设置赞赏则同步恢复文章中的赞赏。          </div>        </div>      </div>    </div>    <div slot="footer">      <mp-button type="primary" @click="copyRightTimeout">继续群发</mp-button>      <mp-button type="default" @click="copyRightedClose">取消</mp-button>    </div>  </mp-dialog></div>'})
define("message/message_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/dialog.js","resp_types/base_resp.rt.js"],function(e,s,r){
"use strict";
var t={
masssend:"/cgi-bin/masssend?t=ajax-response",
massTimesend:"/cgi-bin/masssend?action=time_send&t=ajax-response",
massCheckTimer:"/cgi-bin/masssend?action=check_send_time",
massdel:"/cgi-bin/masssendpage?action=delete",
star:"/cgi-bin/setstarmessage?t=ajax-setstarmessage&only_cdn=0",
save:"/cgi-bin/savemsgtofile?t=ajax-response&only_cdn=0",
sendMsg:"/cgi-bin/singlesend?t=ajax-response&f=json",
getNewMsg:"/cgi-bin/singlesendpage?tofakeid=%s&f=json&action=sync&lastmsgfromfakeid=%s&lastmsgid=%s&createtime=%s",
getNewMsgCount:"/cgi-bin/getnewmsgnum?f=json&t=ajax-getmsgnum&lastmsgid=",
pageNav:"/cgi-bin/message?f=json&offset=%s&day=%s&keyword=%s&action=%s&frommsgid=%s&count=%s",
searchMsgByKeyword:"/cgi-bin/getmessage?t=ajax-message&count=10&keyword=",
checkcopyright:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
checkSponsorAd:"/cgi-bin/masssend?action=check_ad",
openAdReprint:"/cgi-bin/operate_appmsg?sub=open_ad_reprint"
},n=e("common/wx/Tips.js"),i=e("common/wx/Cgi.js"),o=e("common/wx/dialog.js"),a=e("resp_types/base_resp.rt.js");
r.exports={
masssend:function(e,s,r){
i.post({
url:wx.url(e.send_time?t.massTimesend:t.masssend),
data:e,
rtDesc:$.extend({},a,{
month_max_count:"number",
month_cur_count:"number",
pub_product_count:"number"
}),
error:function(){
n.err("发送失败"),r&&r();
}
},function(t){
if(!t||!t.base_resp)return n.err("发送失败"),void(r&&r(t));
var i=t.base_resp.ret;
if("0"==i){
var a="";
return a=e.send_time?"定时发送成功":"发送成功",n.suc(a),void(s&&s(t));
}
if("202702"==i)n.err("请删除红包封面后再群发");else if("67016"==i){
var c=t.video_title?"视频《%s》".sprintf(t.video_title):"视频";
n.err(c+"还在审核中，若审核失败则将无法播放");
}else if("67012"==i)n.err("设置失败，定时时间与已有互选广告订单时间冲突");else if("67013"==i)n.err("设置失败，定时时间超过卡券有效期");else if("200002"==i)n.err("系统繁忙，请稍后重试");else if("200013"==i)n.err("操作太频繁，请稍后再试");else if("67014"==i)n.err("该时刻定时消息过多，请选择其他时刻");else if("67020"==i)n.err("赞赏账户授权失效或者状态异常");else if("67023"==i)n.err("内容不能包含外部链接，请调整后发送");else if("67023"==i)n.err("内容不能包含外部链接，请输入以http://和https://开头的公众号相关链接");else if("64563"==i)n.err("话题链接格式错误，请确认后重试");else if("67011"==i)n.err("设置的定时群发时间错误，请重新选择");else if("64004"==i)n.err(e.send_time?"剩余定时群发数量不足":"今天的群发数量已到，无法群发");else if("67008"==i)n.err("消息中可能含有具备安全风险的链接，请检查");else if("200008"==i)n.err("请输入验证码");else if("14002"==i)n.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行卡券投放。");else if("200001"==i)n.err("图文内包含的音频已被删除，请重新添加。");else if("200046"==i)n.err("图文内含有不合法的音频，请重新上传后再次插入。");else if("14003"==i)n.err("投放用户缺少测试权限，请先设置白名单");else if("67010"==i);else if("155001"==i){
var a=t.month_cur_count>=t.month_max_count?"本月发表付费文章已达10篇|每个月发送的付费文章最多10篇，本月你已超过限制数量，不能再发送付费文章":"本月发表付费文章已达10篇|每个月发送的付费文章最多10篇，本月你还可以发送"+(t.month_max_count-t.month_cur_count)+"篇付费文章，请重新设置。";
o.show({
type:"warn",
msg:a,
buttons:[{
text:"关闭",
click:function(){
this.remove();
}
}]
});
}else"154017"==i?n.err("先绑定管理员再群发"):"64559"==i?n.err("不支持添加未群发的文章链接"):"202605"==i?n.err("帐号付费功能被封禁期间不可群发付费内容"):"202610"==i?n.err("帐号未开通付费功能，不可群发付费内容"):"67015"==i||"67024"==i||"67025"==i?n.err("所选视频状态异常，请重新选择或者前往视频素材库查看详情"):t.hasnotHandle=!0;
r&&r(t);
});
},
massCheckTimer:function(e,s,r){
i.post({
url:wx.url(t.massCheckTimer),
data:e,
rtDesc:$.extend({},a,{
time_now:"number"
}),
error:function(){
n.err("校验定时群发失败"),r&&r();
}
},function(e){
if(!e||!e.base_resp)return n.err("校验定时群发失败"),void(r&&r(e));
var t=e.base_resp.ret;
return"0"==t?void(s&&s(e)):("67018"==t?(e.customerMsg="你已设置过相同时间的定时消息，请到定时列表检查，避免重复操作。",
n.err(e.customerMsg)):n.err("67014"==t?"该时刻定时消息过多，请选择其他时刻":"67012"==t?"设置失败，定时时间与已有互选广告订单时间冲突":"67013"==t?"设置失败，定时时间超过卡券有效期":"200013"==t?"操作频率过高，请明天再试":"64004"==t?"剩余定时群发数量不足":"67011"==t?"设置的定时群发时间错误，请重新选择":"系统繁忙，请稍后再试"),
void(r&&r(e)));
});
},
checkCopyright:function(e,s,r){
return i.post({
url:wx.url(t.checkcopyright),
data:e,
rtDesc:$.extend({},a,{
list:"string"
}),
error:function(e,s){
r&&r(s);
}
},function(e){
return e&&e.base_resp?void(s&&s(e)):(i.handleRet(e,{
id:64462,
key:49,
url:"/cgi-bin/masssend?action=get_appmsg_copyright_stat",
showMsg:!1
}),void(r&&r(e)));
});
},
checkSponsorAd:function(e,s,r){
return i.post({
url:wx.url(t.checkSponsorAd),
data:e,
error:function(e,s){
s&&s(status);
}
},function(e){
return e&&e.base_resp?void(s&&s(e)):void(r&&r(e));
});
},
massdel:function(e,s,r,o){
i.post({
url:wx.url(t.massdel),
data:{
id:e,
idx:o
},
error:function(){
n.err("删除失败");
}
},function(e){
return e&&e.base_resp&&0==e.base_resp.ret?(n.suc("删除成功"),void(s&&s(e))):(i.handleRet(e,{
id:64462,
key:50,
url:"/cgi-bin/masssendpage?action=delete",
msg:"删除失败"
}),void(r&&r(e)));
});
},
getNewMsg:function(e,s,r,n,o,a){
i.get({
url:wx.url(t.getNewMsg.sprintf(e,s,r,n)),
mask:!1,
handlerTimeout:!0,
error:a
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(e.page_info.msg_items.msg_item.forEach(function(e){
e.id=e.id_64bit;
}),o&&o(e.page_info.msg_items.msg_item)):i.handleRet(e,{
id:64462,
key:51,
url:"/cgi-bin/singlesendpage?action=sync",
showMsg:!1
});
});
},
saveVoice:function(e,s,r,o){
i.post({
mask:!1,
url:wx.url(t.save),
data:{
msgid:e,
title:s,
filename:s,
voice_cagtegory:r
},
error:function(){
n.err("保存音频失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err("保存音频失败");
var s=e.base_resp.ret;
"0"==s?(n.suc("保存音频成功"),"function"==typeof o&&o(e)):"220001"==s?n.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):"220002"==s?n.err("你的图片库已达到存储上限，请进行清理。"):i.handleRet(e,{
id:64462,
key:52,
url:"/cgi-bin/savemsgtofile",
msg:"保存音频失败"
});
});
},
save:function(e,s,r,o,a){
"function"==typeof r&&(o=r,r=""),i.post({
mask:!1,
url:wx.url(t.save),
data:{
msgid:e,
filename:s,
digest:r,
scene:a
},
error:function(){
n.err("保存素材失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err("保存素材失败");
var s=e.base_resp.ret;
"0"==s?(n.suc("保存素材成功"),"function"==typeof o&&o(e)):"220001"==s?n.err('"素材管理"中的存储数量已达到上限，请删除后再操作。'):"220002"==s?n.err("你的图片库已达到存储上限，请进行清理。"):i.handleRet(e,{
id:64462,
key:53,
url:"/cgi-bin/savemsgtofile",
msg:"保存素材失败"
});
});
},
star:function(e,s,r){
i.post({
mask:!1,
url:wx.url(t.star),
data:{
msgid:e,
value:1==s?0:1
},
error:function(){
n.err(1==s?"取消收藏失败":"收藏消息失败");
}
},function(e){
if(!e||!e.base_resp)return void n.err(1==s?"取消收藏失败":"收藏消息失败");
var t=e.base_resp.ret;
0!=t?i.handleRet(e,{
id:64462,
key:54,
url:"/cgi-bin/setstarmessage",
msg:1==s?"取消收藏失败":"收藏消息失败"
}):(n.suc(1==s?"已取消收藏":"已收藏"),"function"==typeof r&&r(e));
});
},
sendMsg:function(e,s,r){
i.post({
url:wx.url(t.sendMsg),
data:e,
error:function(){
n.err("发送失败"),r&&r();
}
},function(e){
if(!e||!e.base_resp)return n.err("发送失败"),void(r&&r(e));
var t=e.base_resp.ret;
return 0==t?(n.suc("回复成功"),void("function"==typeof s&&s(e))):(10703==t?n.err("对方关闭了接收消息"):10700==t?n.err("该用户已经取消关注，你无法再给他发送消息。"):10701==t?n.err("该用户已被加入黑名单，无法向其发送消息"):62752==t?n.err("消息中可能含有具备安全风险的链接，请检查"):10704==t?n.err("该素材已被删除"):10705==t?n.err("该素材已被删除"):10706==t?n.err("由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。"):200008==t?n.err("请输入验证码"):(1530500!=t||1530507!=t)&&i.handleRet(e,{
id:64462,
key:55,
url:"/cgi-bin/singlesend",
msg:"发送失败"
}),void(r&&r(e)));
});
},
getNewMsgCount:function(e,s,r,n,o){
i.post({
mask:!1,
handlerTimeout:!0,
url:wx.url(t.getNewMsgCount+e+"&filterivrmsg="+s+"&filterspammsg="+r),
error:o
},function(e){
"function"==typeof n&&n(e),e&&e.base_resp&&e.base_resp.ret&&i.handleRet(e,{
id:64462,
key:56,
url:"/cgi-bin/getnewmsgnum",
showMsg:!1
});
});
},
quickReply:function(e,s,r){
this.sendMsg({
mask:!1,
tofakeid:e.toFakeId,
imgcode:e.imgcode,
type:1,
content:e.content,
out_trade_no:e.out_trade_no,
appmsg:e.appmsg||"",
quickreplyid:e.quickReplyId
},s,r);
},
pageNav:function(e,s,r){
var n=t.pageNav.sprintf((e.page-1)*e.count,e.day||"",e.keyword||"",e.action||"",e.frommsgid||"",e.count||"");
i.post({
dataType:"json",
url:wx.url(n),
mask:!1,
data:{},
error:r
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?"function"==typeof s&&s(e.msg_items.msg_item):i.handleRet(e,{
id:64462,
key:57,
url:"/cgi-bin/message",
showMsg:!1
});
});
},
searchMsgByKeyword:function(e,s,r){
i.post({
dataType:"html",
mask:!1,
url:wx.url(url.searchMsgByKeyword+e),
error:function(){
n.err("系统发生异常，请刷新页面重试"),r&&r({});
}
},function(e){
"function"==typeof s&&s($.parseJSON(e)),e&&e.base_resp&&e.base_resp.ret&&i.handleRet(e,{
id:64462,
key:58,
url:"/cgi-bin/getmessage",
showMsg:!1
});
});
},
openAdReprint:function(e,s,r){
"EN_CAN_OPEN_AD_REPRINT"===s?i.post({
url:t.openAdReprint,
data:{
msgid:e.appmsgid,
idx_list:e.idxList
}
},{
done:function(e){
e&&e.base_resp&&64706===e.base_resp.ret&&console.log("不满足开通条件"),"function"==typeof r&&r();
},
fail:function(){
"function"==typeof r&&r();
}
}):"function"==typeof r&&r();
}
};
});