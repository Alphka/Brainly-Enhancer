(()=>{var __webpack_modules__={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),i=n(372),a=n(327),s=n(97),c=n(109),u=n(985),l=n(61);e.exports=function(e){return new Promise((function(t,n){var f=e.data,d=e.headers;r.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(h+":"+m)}var v=s(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),a(v,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:r,config:e,request:p};o(t,n,i),p=null}},p.onabort=function(){p&&(n(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){n(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var y=(e.withCredentials||u(v))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;y&&(d[e.xsrfHeaderName]=y)}if("setRequestHeader"in p&&r.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),n(e),p=null)})),f||(f=null),p.send(f)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),i=n(321),a=n(185);function s(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var c=s(n(655));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=n(263),c.CancelToken=n(972),c.isCancel=n(502),c.all=function(e){return Promise.all(e)},c.spread=n(713),c.isAxiosError=n(268),e.exports=c,e.exports.default=c},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),i=n(782),a=n(572),s=n(185);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)n=n.then(t.shift(),t.shift());return n},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(s(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(s(r||{},{method:e,url:t,data:n}))}})),e.exports=c},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),i=n(502),a=n(655);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function u(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(e[o],t[o])}r.forEach(o,(function(e){r.isUndefined(t[e])||(n[e]=c(void 0,t[e]))})),r.forEach(i,u),r.forEach(a,(function(o){r.isUndefined(t[o])?r.isUndefined(e[o])||(n[o]=c(void 0,e[o])):n[o]=c(void 0,t[o])})),r.forEach(s,(function(r){r in t?n[r]=c(e[r],t[r]):r in e&&(n[r]=c(void 0,e[r]))}));var l=o.concat(i).concat(a).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return r.forEach(f,u),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t,n){return r.forEach(n,(function(n){e=n(e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),o=n(16),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=n(448)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){c.headers[e]=r.merge(i)})),e.exports=c},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}})),a):a}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},867:(e,t,n)=>{"use strict";var r=n(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!a(e)&&null!==e.constructor&&!a(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:c,isUndefined:a,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},131:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";function __WEBPACK_DEFAULT_EXPORT__(object){return new Promise((function(resolve){var interval=setInterval((function(){var element=eval(object);element&&(clearInterval(interval),resolve(element))}))}))}__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__})},455:(e,t,n)=>{"use strict";const r=function(e){var t,n;if("string"==typeof e)t=document.createElement(e),n=arguments[1]||{};else{if("object"!=typeof e)throw new Error("args cannot be a type of "+typeof e);t=document.createElement(e.tagName),delete(n=e).tagName}return n.textContent&&(t.textContent=n.textContent),n.innerText&&(t.textContent=n.innerText),n.innerHTML&&(t.innerHTML=n.innerHTML),n.children&&n.children.forEach((function(e){return t.appendChild(e)})),delete n.textContent,delete n.innerText,delete n.innerHTML,delete n.children,Object.getOwnPropertyNames(n).forEach((function(e){return t.setAttribute(e,n[e])})),t},o=function(e,t){var n=(null==t?void 0:t.element)||document;return new Promise((function(r){var o=window.setInterval((function(){return n.querySelector(e)&&(clearInterval(o),r((null==t?void 0:t.multiple)?n.querySelectorAll(e):n.querySelector(e)))}))}))};var i=n(131),a=n(669),s=n.n(a);const c=JSON.parse('{"o":[{"category":52,"subCategory":338},{"category":52,"subCategory":341}],"p":[{"category":50,"subCategory":339},{"category":50,"subCategory":342}]}');var u=function(){return(u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},l=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},f=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},d=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},p=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e};const h=function(){function e(){this.quickButtonsReasons={fetched:!1,answers:c.p,questions:c.o}}return e.prototype.FetchReasons=function(){return l(this,void 0,void 0,(function(){var e=this;return f(this,(function(t){switch(t.label){case 0:return this.quickButtonsReasons.fetched?[4,this.quickButtonsReasons.promise]:[3,2];case 1:return[2,t.sent()];case 2:return this.quickButtonsReasons.fetched=!0,[2,this.quickButtonsReasons.promise=new Promise((function(t,n){return l(e,void 0,void 0,(function(){var e,r;return f(this,(function(o){switch(o.label){case 0:return[4,s().post(location.origin+"/api/28/moderation_new/get_content",{model_id:jsData.question.databaseId,model_type_id:1}).catch(n)];case 1:return(e=o.sent())&&(null===(r=e.data)||void 0===r?void 0:r.data)?(this.setDeleteReasonsDetails(e,"questions"),this.setDeleteReasonsDetails(e,"answers"),t(),[2]):[2]}}))}))}))]}}))}))},e.prototype.setDeleteReasonsDetails=function(e,t){var n,r,o,i=e.data.data.delete_reasons,a="questions"===t?"task":"response",s=function(e){if(!i[a].find((function(t){if(t.id===e.category)return Boolean(t.subcategories.find((function(t){if(t.id===e.subCategory)return e.reasonTitle=t.title,e.reasonText=t.text,!0})))})))throw console.error([i[a],e.category,i[a].find((function(t){return t.id===e.category})),null===(o=i[a].find((function(t){return t.id===e.category})))||void 0===o?void 0:o.subcategories.find((function(t){return t.id===e.subCategory}))]),new Error("Could not find delete reason for "+t)};try{for(var c=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}(this.quickButtonsReasons[t]),u=c.next();!u.done;u=c.next())s(u.value)}catch(e){n={error:e}}finally{try{u&&!u.done&&(r=c.return)&&r.call(c)}finally{if(n)throw n.error}}},e.prototype.checkPrivileges=function(){for(var e,t,n,r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];if(!(null===(e=window.dataLayer)||void 0===e?void 0:e[0].user.isLoggedIn))return!1;if(!(null===(n=null===(t=window.__default_config)||void 0===t?void 0:t.user)||void 0===n?void 0:n.ME))throw new Error("User data is not defined");return r.length&&r.filter((function(e){return JSON.parse(__default_config.user.ME).privileges.includes(e)})).length===r.length},e.prototype.Error=function(e){this.log(e)},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];e&&e.length&&(e.every((function(e){return"string"==typeof e}))?console.log("%c"+e.join(" "),"color: #3371ff; font-size:15px;"):e.every((function(e){return e instanceof Error}))?console.error.apply(console,p([],d(e))):console.log.apply(console,p([],d(e))))},e.prototype.request=function(e,t,n,r){return void 0===t&&(t="GET"),l(this,void 0,void 0,(function(){var o;return f(this,(function(i){switch(i.label){case 0:return(o=new URL(e)).searchParams.append("client","moderator-extension"),e=o.href,"GET"!==t?[3,2]:[4,s().get(e,r)];case 1:return[2,i.sent().data];case 2:return"POST"!==t?[3,4]:[4,s().post(e,n,r)];case 3:return[2,i.sent().data];case 4:throw new Error("Method not allowed: "+t)}}))}))},e.prototype.toBackground=function(e,t){var n=this;t||(t={});var r=u({action:e},t);return new Promise((function(e,t){var o;try{chrome.runtime.sendMessage(null===(o=n.extension)||void 0===o?void 0:o.id,r,e)}catch(e){t(e)}}))},e}();var m=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}))},v=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}};const y=function(){function e(){this.clicked=!1}return e.prototype.AppendIcon=function(){var e;return m(this,void 0,void 0,(function(){var t,n,i,a;return v(this,(function(s){switch(s.label){case 0:return this.image=BrainlyEnhancer.extension.URL+"/images/moon.png","html"!==document.documentElement.id?[3,2]:(t=r("li",{class:"menu-element",children:[this.element=r("a",{"data-track":"brainly-enhancer-dark-theme-icon",textContent:"Dark theme"})]}),document.head.appendChild(r("style",{innerHTML:'.menu-element > a[data-track="brainly-enhancer-dark-theme-icon"]::before{background-image: url('+this.image+");}"})),n=this,[4,o(".mint-header__right.mint-hide-for-mobile.menu-right > ul.menu-list")]);case 1:return n.container=s.sent(),this.container.firstElementChild.before(t),[3,4];case 2:return i=r("div",{class:"sg-flex",children:[this.element=r("button",{class:"sg-button sg-button--m sg-button--transparent sg-button--icon-only",children:[r("span",{class:"sg-button__icon sg-button__icon--m",children:[r("div",{class:"sg-icon sg-icon--adaptive sg-icon--x24",children:[r("img",{class:"sg-icon__svg",src:this.image})]})]})]})]}),a=this,[4,o("div[class*=HeaderController__childrenWrapper] > div > div:nth-of-type(2) > div")];case 3:a.container=s.sent(),null===(e=this.container.firstElementChild)||void 0===e||e.before(i),s.label=4;case 4:return this.element.addEventListener("click",this.listener.bind(this)),[2]}}))}))},e.prototype.listener=function(e){return m(this,void 0,void 0,(function(){return v(this,(function(t){return e.preventDefault(),this.clicked||(this.clicked=!0,chrome.runtime.sendMessage(BrainlyEnhancer.extension.id,{action:"setDarkTheme"},(function(){return location.reload()}))),[2]}))}))},e}();var b=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};new(function(){function e(){window.BrainlyEnhancer=new h,this.DarkTheme=new y,this.selectors=["div.section--lnnYy.section--3Yobl","div[class*=payments-section]","div.brn-cookie-policy-dialog","div.js-react-bottom-banner","div.js-react-payments-in-toplayer","div.js-react-brainly-plus-box-aside","div.brn-new-ad-placeholder--for-desktop-and-up","div.brn-bottom-toplayer",'div[data-testid="brainly_ads_placeholder"]','div[data-testid="brainly_plus_toaster_wrapper"]','button[data-test="navigation_payments"]',"div.brn-brainly-plus-box","div#new-ad-placeholder-question-desktop","div.brn-ads-box","div.js-react-registration-toplayer",'div[data-testid="registration_toplayer"',"div[class*=SubscriptionInfo__container]","div.truste_overlay","div.truste_box_overlay_inner","div.truste_box_overlay","div.js-react-kodiak-banner-top","div.section--lnnYy.section--9DHSr",'div[class*="OneOffAchievementTooltip-module__tooltip"]'],this.Init()}return e.prototype.Init=function(){return e=this,t=void 0,r=function(){return function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}}(this,(function(e){switch(e.label){case 0:return[4,this.setExtensionData()];case 1:return e.sent(),this.setBrainlyPreferences(),document.body?[3,3]:[4,new Promise((function(e){return window.addEventListener("DOMContentLoaded",e)}))];case 2:e.sent(),e.label=3;case 3:return this.watchForAds(),this.InitSections(),[2]}}))},new((n=void 0)||(n=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}c((r=r.apply(e,t||[])).next())}));var e,t,n,r},e.prototype.setBrainlyPreferences=function(){var e=new Date((new Date).setFullYear((new Date).getFullYear()+1));document.cookie.includes("cookieconsent_dismissed")||(document.cookie="cookieconsent_dismissed=yes; expires="+e.toUTCString()+"; path=/; samesite=Lax");var t=function(e,t){return!localStorage.getItem(e)&&localStorage.setItem(e,t)};if("nosdevoirs.fr"===location.hostname){var n=e.getTime();t("notice_preferences","2:"),t("notice_gdpr_prefs","0,1,2:"),t("truste.eu.cookie.notice_preferences",'{"name":"truste.eu.cookie.notice_preferences","value":"2:","path":"/","expires":'+n+"}"),t("truste.eu.cookie.notice_gdpr_prefs",'{"name":"truste.eu.cookie.notice_gdpr_prefs","value":"0,1,2:","path":"/","expires":'+n+"}"),t("truste.eu.cookie.cmapi_cookie_privacy",'{"name":"truste.eu.cookie.cmapi_cookie_privacy","value":"permit 1,2,3","path":"/","expires":'+n+"}"),t("truste.eu.cookie.cmapi_gtm_bl",'{"name":"truste.eu.cookie.cmapi_gtm_bl","value":"","path":"/","expires":'+n+"}")}t("registration-toplayer/expires",String(Date.now()+36e5)),t("registration-toplayer/cursor","0"),t("spotlight-notifications/achievements",'"dismissed"'),Object.getOwnPropertyNames(localStorage).forEach((function(e){return e.includes("funnel")&&localStorage.removeItem(e)}))},e.prototype.watchForAds=function(){var e=this;this.adsListener=new MutationObserver((function(t,n){var r,o,i,a;t.forEach((function(e){if("attributes"===e.type&&"style"===e.attributeName){var t=document.body.style,n=window.getComputedStyle(document.body);return[t.overflowY,n.overflowY].includes("hidden")&&(t.overflowY="auto"),void([t.position,n.position].includes("fixed")&&(t.position="initial"))}}));try{for(var s=b(e.selectors),c=s.next();!c.done;c=s.next()){var u=c.value,l=document.querySelectorAll(u);if(l.length)try{for(var f=(i=void 0,b(Array.from(l))),d=f.next();!d.done;d=f.next())d.value.remove()}catch(e){i={error:e}}finally{try{d&&!d.done&&(a=f.return)&&a.call(f)}finally{if(i)throw i.error}}}}catch(e){r={error:e}}finally{try{c&&!c.done&&(o=s.return)&&o.call(s)}finally{if(r)throw r.error}}})),this.adsListener.observe(document.body,{attributes:!0,childList:!0,subtree:!0})},e.prototype.setExtensionData=function(){var e=new CustomEvent("getExtensionData",{bubbles:!0,cancelable:!1});return new Promise((function(t){var n=function(e){e&&"setExtensionData"===e.data.action&&(window.BrainlyEnhancer.extension=e.data.data,window.removeEventListener("message",n),t(window.BrainlyEnhancer.extension))};window.addEventListener("message",n),window.dispatchEvent(e)}))},e.prototype.InitSections=function(){var e=this;(0,i.Z)("window.dataLayer").then((function(){window.dataLayer[0].user.isLoggedIn&&e.DarkTheme.AppendIcon()}))},e}())}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var __webpack_exports__=__webpack_require__(455)})();