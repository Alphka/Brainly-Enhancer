(()=>{var __webpack_modules__={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),i=n(372),s=n(327),a=n(97),c=n(109),u=n(985),l=n(61);e.exports=function(e){return new Promise((function(t,n){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var v=a(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),s(v,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};o(t,n,i),p=null}},p.onabort=function(){p&&(n(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var y=(e.withCredentials||u(v))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;y&&(d[e.xsrfHeaderName]=y)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),f||(f=null),p.send(f)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),i=n(321),s=n(185);function a(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=a(n(655));c.Axios=i,c.create=function(e){return a(s(c.defaults,e))},c.Cancel=n(263),c.CancelToken=n(972),c.isCancel=n(502),c.all=function(e){return Promise.all(e)},c.spread=n(713),c.isAxiosError=n(268),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),i=n(782),s=n(572),a=n(185);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[s,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(a(r||{},{method:e,url:t,data:n}))}})),e.exports=c},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),i=n(502),s=n(655);function a(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return a(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return a(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(a(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],i=["headers","auth","proxy","params"],s=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],a=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(i,u),r.forEach(s,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(a,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var l=o.concat(i).concat(s).concat(a),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return r.forEach(f,u),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),o=n(16),i={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(a=n(448)),a),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(s(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(i)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,n)=>{"use strict";var r=n(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function s(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},131:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function __WEBPACK_DEFAULT_EXPORT__(object){return new Promise((function(resolve){var interval=setInterval((function(){var element=eval(object);element&&(clearInterval(interval),resolve(element))}))}))}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__})}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__={};(()=>{"use strict";const e=function(e){var t,n;if("string"==typeof e)t=document.createElement(e),n=arguments[1]||{};else{if("object"!=typeof e)throw new Error("args cannot be a type of "+typeof e);t=document.createElement(e.tagName),delete(n=e).tagName}return n.textContent&&(t.textContent=n.textContent),n.innerText&&(t.textContent=n.innerText),n.innerHTML&&(t.innerHTML=n.innerHTML),n.children&&n.children.forEach((function(e){return t.appendChild(e)})),delete n.textContent,delete n.innerText,delete n.innerHTML,delete n.children,Object.getOwnPropertyNames(n).forEach((function(e){return t.setAttribute(e,n[e])})),t},t=function(e,t){var n=Date.now(),r=(null==t?void 0:t.element)||document;return new Promise((function(o,i){var s=window.setInterval((function(){if(r.querySelector(e))return clearInterval(s),o(Object.assign((null==t?void 0:t.multiple)?r.querySelectorAll(e):r.querySelector(e),{isError:!1}));(null==t?void 0:t.expires)&&Date.now()>=t.expires+n&&(clearInterval(s),t.noError?o({isError:!0}):i())}))}))};var n=__webpack_require__(131);const r=function(){function e(){}return e.prototype.ButtonsListener=function(e,t){var n=t.parentElement.parentElement.classList.contains("header")?t.parentElement.parentElement.parentElement.querySelector(":scope > .contents > .action-delete"):t.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(":scope > .action-delete");n.querySelectorAll(":scope > div > div:nth-of-type(1) > span.pull-left")[0].querySelector(":scope > input").click();var r=n.querySelectorAll(":scope > div > .subs > .subcategories");n.querySelector(":scope > div > p:nth-of-type(1) textarea").value=r[0].querySelector(":scope > input").getAttribute("z-text");var o=n.querySelector("input.dont-return-points"),i=n.querySelector("input.take-answerers-points");(null==o?void 0:o.checked)||null==o||o.click(),(null==i?void 0:i.checked)||null==i||i.click()},e}();var o=__webpack_require__(669),i=__webpack_require__.n(o),s=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},a=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};function c(e){var t=new URL(location.origin+e);return t.searchParams.append("client","moderator-extension"),t.href.replace(/%5B%5D/g,"[]")}function u(e,t,n,r){return s(this,void 0,void 0,(function(){var o,s;return a(this,(function(a){switch(a.label){case 0:return o={method:t||"GET",url:c(e)},n&&(o.data=n),r&&Object.assign(o,r),[4,new Promise((function(e){i()(o).then((function(e){s=e})).catch((function(e){s=e.response})).finally(e)}))];case 1:return a.sent(),[2,s]}}))}))}function l(e,t,n){var r,o;return s(this,void 0,void 0,(function(){var i;return a(this,(function(s){switch(s.label){case 0:return[4,u(e,"POST",t,n)];case 1:return i=s.sent(),[2,{success:Boolean(null===(r=null==i?void 0:i.data)||void 0===r?void 0:r.success),message:null===(o=null==i?void 0:i.data)||void 0===o?void 0:o.message}]}}))}))}function f(e,t,n){return s(this,void 0,void 0,(function(){var r;return a(this,(function(o){switch(o.label){case 0:return[4,l(e,t,n)];case 1:return(r=o.sent()).success&&setTimeout((function(){return l("/api/28/moderate_tickets/expire",{model_id:t.taskId,model_type_id:1})}),1e3),[2,r]}}))}))}const d=function(){function t(t,n){var r,o=this;this.reasonId=n.category,this.reasonText=n.text,this.element=e("button",{class:"sg-button sg-button--icon-only sg-button--m sg-flex--margin-left-xs",title:n.title+"\n".repeat(2)+n.text,children:[e("span",{class:"sg-text sg-text--white",textContent:String(n.index+1)})]}),0===t.buttons.length&&this.element.classList.remove("sg-flex--margin-left-xs"),(r=this.element.classList).add.apply(r,function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e}([],function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return s}(n.className.split(" ")))),this.element.addEventListener("click",(function(e){t.main.isBusy=!0,t.main.onDelete.call(t.main,e,o)}))}return t.prototype.GetButtonText=function(e){var t=e instanceof HTMLButtonElement?e:e.parentElement;return{button:t,span:t.firstElementChild}},t.prototype.RenderSpinner=function(e){var t=this.GetButtonText(e).span;t.dataset.text=t.textContent,t.textContent="",t.classList.remove("sg-text"),t.classList.add("sg-spinner","sg-spinner--white","sg-spinner--xsmall")},t.prototype.HideSpinner=function(e){var t=this.GetButtonText(e).span;t.textContent=t.dataset.text,t.removeAttribute("data-text"),t.classList.remove("sg-spinner","sg-spinner--white","sg-spinner--xsmall"),t.classList.add("sg-text")},t}();var p=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},h=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};const m=function(){function t(e){this.main=e,this.buttons=[],this.Init()}return t.prototype.Init=function(){return p(this,void 0,void 0,(function(){return h(this,(function(t){switch(t.label){case 0:return this.container=e("div",{class:"sg-flex sg-flex--wrap sg-flex--justify-content-space-between"}),[4,BrainlyEnhancer.FetchReasons()];case 1:return t.sent(),this.RenderDeleteButtons(),[2]}}))}))},t.prototype.RenderDeleteButtons=function(){return p(this,void 0,void 0,(function(){var e,t,n=this;return h(this,(function(r){return e=BrainlyEnhancer.checkPrivileges,t=BrainlyEnhancer.quickButtonsReasons,e(102)?(t.answers.forEach((function(e,t){var r=new d(n,{className:"solid-peach",text:e.reasonText,title:e.reasonTitle,category:e.category,index:t});n.buttons.push(r),n.container.appendChild(r.element)})),[2]):[2]}))}))},t}();var v=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},y=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};const b=function(){function e(e,t){this.main=e,this.data=t}return e.prototype.Init=function(){return v(this,void 0,void 0,(function(){var e=this;return y(this,(function(t){switch(t.label){case 0:return[4,(0,n.Z)("window.jsData")];case 1:return t.sent(),this.extraDetails=jsData.question.answers.find((function(t){return t.databaseId===e.data.id})),this.FindModerationContainer(),this.FindModerateButton(),this.main.data.is_deleted?[3,3]:[4,BrainlyEnhancer.FetchReasons()];case 2:t.sent(),this.quickButtons||this.AppendQuickButtons(),t.label=3;case 3:return[2]}}))}))},e.prototype.FindModerationContainer=function(){return v(this,void 0,void 0,(function(){return y(this,(function(e){if(this.moderationContainer=this.mainContainer.querySelector(":scope > .sg-box > .sg-flex"),this.answerContainer=this.mainContainer.querySelector(":scope > .js-answer"),!this.moderationContainer)throw new Error("Could not find moderation container");if(!this.answerContainer)throw new Error("Could not find answer container");return this.moderationContainer.classList.add("sg-flex--wrap"),[2]}))}))},e.prototype.FindModerateButton=function(){return v(this,void 0,void 0,(function(){return y(this,(function(e){if(this.moderateButton=this.moderationContainer.querySelector(":scope > div:first-child > button"),!this.moderateButton)throw new Error("Couldn't find the moderate button of the answer "+this.data.id);return[2]}))}))},e.prototype.AppendQuickButtons=function(){this.quickButtons=new m(this),this.moderationContainer.firstElementChild.after(this.quickButtons.container)},e.prototype.onDelete=function(e,t){return v(this,void 0,void 0,(function(){var n,r,o;return y(this,(function(i){switch(i.label){case 0:if(this.data.settings.isConfirmed&&!confirm("Esta resposta está aprovada.\nVocê tem certeza que deseja eliminá-la?"))return[2];n=e.target,i.label=1;case 1:return i.trys.push([1,3,4,5]),t.RenderSpinner(n),[4,(s={model_id:this.data.id,reason_id:t.reasonId,reason:t.reasonText,taskId:this.main.data.id},f("/api/28/moderation_new/delete_response_content",s=Object.assign({model_type_id:2,give_warning:!1,take_points:!0},s),undefined))];case 2:if(!(r=i.sent()).success)throw r.message||"Algo deu errado";return this.quickButtons.container.remove(),this.mainContainer.lastElementChild.classList.add("solid-peach-light"),[3,5];case 3:return o=i.sent(),BrainlyEnhancer.Error(o),this.isBusy=!1,[3,5];case 4:return t.HideSpinner(n),[7];case 5:return[2]}var s}))}))},e}();const w=function(){function t(e){this.main=e,this.buttons=[],this.Init()}return t.prototype.Init=function(){this.container=e("div",{class:"sg-flex sg-flex--wrap sg-flex--justify-content-space-between"}),this.RenderDeleteButtons()},t.prototype.RenderDeleteButtons=function(){return e=this,t=void 0,r=function(){var e,t,n=this;return function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}}(this,(function(r){return e=BrainlyEnhancer.checkPrivileges,t=BrainlyEnhancer.quickButtonsReasons,e(102)?(t.questions.forEach((function(e,t){var r=new d(n,{className:"solid-blue",text:e.reasonText,title:e.reasonTitle,category:e.category,index:t});n.buttons.push(r),n.container.appendChild(r.element)})),[2]):[2]}))},new((n=void 0)||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}));var e,t,n,r},t}();var g=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},x=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};const _=function(){function e(e){this.main=e}return e.prototype.Init=function(){return g(this,void 0,void 0,(function(){return x(this,(function(e){switch(e.label){case 0:return this.isSearching?[2]:[4,this.FindModerationContainer()];case 1:return e.sent(),this.main.data.is_deleted?[3,4]:[4,BrainlyEnhancer.FetchReasons()];case 2:return e.sent(),[4,t("button.sg-button",{element:this.moderationContainer})];case 3:e.sent(),this.quickButtons||this.AppendQuickButtons(),e.label=4;case 4:return[2]}}))}))},e.prototype.FindModerationContainer=function(){return g(this,void 0,void 0,(function(){var e;return x(this,(function(n){switch(n.label){case 0:return this.isSearching=!0,e=this,[4,t(":scope > [class*=empty] > .sg-box > .sg-flex",{element:this.main.questionContainer})];case 1:return e.moderationContainer=n.sent(),this.moderationContainer.classList.add("sg-flex--wrap"),this.isSearching=!1,[2]}}))}))},e.prototype.AppendQuickButtons=function(){this.quickButtons=new w(this),this.moderationContainer.firstElementChild.after(this.quickButtons.container)},e.prototype.onDelete=function(e,t){return g(this,void 0,void 0,(function(){var n,r,o;return x(this,(function(i){switch(i.label){case 0:if(this.main.data.approvedAnswersCount>0&&!confirm("Esta questão possui respostas aprovadas.\nVocê tem certeza que deseja eliminá-la?"))return[2];n=e.target,i.label=1;case 1:return i.trys.push([1,3,4,5]),t.RenderSpinner(n),[4,(s={model_id:this.main.data.id,reason:t.reasonText,reason_id:t.reasonId},f("/api/28/moderation_new/delete_task_content",s=Object.assign({give_warning:!1,return_points:!1,take_points:!0,model_type_id:1},s),undefined))];case 2:if(!(r=i.sent()).success)throw r.message||"Algo deu errado";return this.quickButtons.container.remove(),this.main.questionContainer.querySelector(":scope > div > div:last-child").classList.add("solid-peach-light"),this.main.answersSections.all.forEach((function(e){return e.quickButtons.container.remove()})),[3,5];case 3:return o=i.sent(),BrainlyEnhancer.Error(o),this.isBusy=!1,[3,5];case 4:return t.HideSpinner(n),[7];case 5:return[2]}var s}))}))},e}();var E=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},k=function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};const S=function(){function e(){this.answersSections={containers:[],all:[],byId:{}},this.Init()}return e.prototype.Init=function(){return E(this,void 0,void 0,(function(){return k(this,(function(e){switch(e.label){case 0:return[4,this.FindQuestionContainer()];case 1:return e.sent(),this.SetQuestionData(),this.InitSections(),this.ObserveForElements(),[2]}}))}))},e.prototype.FindQuestionContainer=function(){return E(this,void 0,void 0,(function(){var e;return k(this,(function(n){switch(n.label){case 0:return e=this,[4,t(".js-main-question")];case 1:return e.questionContainer=n.sent(),[2]}}))}))},e.prototype.SetQuestionData=function(){try{if(this.data=JSON.parse(this.questionContainer.dataset.z),!this.data)throw new Error("Could not set question's data")}catch(e){console.error(e)}},e.prototype.InitSections=function(){BrainlyEnhancer.checkPrivileges(1)&&(this.questionSection=new _(this),this.questionSection.Init()),this.RenderAnswersSections()},e.prototype.RenderAnswersSections=function(){return E(this,void 0,void 0,(function(){var e,n,r,o=this;return k(this,(function(i){switch(i.label){case 0:return this.data.responses.length?(e=this.answersSections,r=(n=Array).from,[4,t(".js-question-answers > div > div[class*=empty]",{multiple:!0})]):[2];case 1:return e.containers=r.apply(n,[i.sent()]),this.data.responses.forEach((function(e,t){var n=new b(o,e);n.mainContainer=o.answersSections.containers[t],n.Init(),o.answersSections.byId[e.id]=n,o.answersSections.all.push(n)})),[2]}}))}))},e.prototype.ObserveForElements=function(){return E(this,void 0,void 0,(function(){var e,n,r=this;return k(this,(function(o){switch(o.label){case 0:return this.data.is_deleted?[4,t(".brn-qpage-next-question-box__content--deleted")]:[3,2];case 1:o.sent(),(e=this.questionContainer.querySelector(":scope > div > div:last-child")).classList.add("solid-peach-light"),e.lastElementChild.classList.remove("brn-qpage-next-question-box__content--deleted"),o.label=2;case 2:return n=document.querySelector(".js-main-container"),new MutationObserver((function(e){e.forEach((function(e){var t;if(e.addedNodes.length&&e.target instanceof HTMLElement)return e.target.classList.contains("js-main-question")?null===(t=r.questionSection)||void 0===t?void 0:t.Init():e.target.classList.contains("js-react-answers")?r.answersSections.all.forEach((function(e){return e.Init()})):void 0}))})).observe(n,{childList:!0,subtree:!0}),t(".js-react-answers").then((function(){return r.answersSections.all.forEach((function(e){return e.Init()}))})),[2]}}))}))},e}();BrainlyEnhancer.isModerator.then((function(e){var t;e&&BrainlyEnhancer.checkPrivileges(102)&&(new S,t=new r,new MutationObserver((function(e,n){e.forEach((function(e){e.addedNodes.length&&e.target instanceof HTMLElement&&"moderate-task-toplayer"===e.target.id&&"childList"===e.type&&document.querySelectorAll("button.btn.btn-mini.btn-danger.delete").forEach((function(e){return e.addEventListener("click",(function(n){return t.ButtonsListener(n,e)}),{once:!0})}))}))})).observe(document.body,{attributes:!0,childList:!0,subtree:!0}))}))})()})();