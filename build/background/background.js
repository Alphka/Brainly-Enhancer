(()=>{var e={150:function(e,r){var s,n;"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self&&self,void 0===(n="function"==typeof(s=function(e){"use strict";if("undefined"==typeof browser||Object.getPrototypeOf(browser)!==Object.prototype){const r="The message port closed before a response was received.",s="Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)",n=e=>{const n={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(0===Object.keys(n).length)throw new Error("api-metadata.json has not been included in browser-polyfill");class t extends WeakMap{constructor(e,r){super(r),this.createItem=e}get(e){return this.has(e)||this.set(e,this.createItem(e)),super.get(e)}}const a=(r,s)=>(...n)=>{e.runtime.lastError?r.reject(new Error(e.runtime.lastError.message)):s.singleCallbackArg||n.length<=1&&!1!==s.singleCallbackArg?r.resolve(n[0]):r.resolve(n)},g=e=>1==e?"argument":"arguments",i=(e,r,s)=>new Proxy(r,{apply:(r,n,t)=>s.call(n,e,...t)});let o=Function.call.bind(Object.prototype.hasOwnProperty);const m=(e,r={},s={})=>{let n=Object.create(null),t={has:(r,s)=>s in e||s in n,get(t,l,A){if(l in n)return n[l];if(!(l in e))return;let c=e[l];if("function"==typeof c)if("function"==typeof r[l])c=i(e,e[l],r[l]);else if(o(s,l)){let r=((e,r)=>function(s,...n){if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((t,g)=>{if(r.fallbackToNoCallback)try{s[e](...n,a({resolve:t,reject:g},r))}catch(a){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,a),s[e](...n),r.fallbackToNoCallback=!1,r.noCallback=!0,t()}else r.noCallback?(s[e](...n),t()):s[e](...n,a({resolve:t,reject:g},r))}))})(l,s[l]);c=i(e,e[l],r)}else c=c.bind(e);else if("object"==typeof c&&null!==c&&(o(r,l)||o(s,l)))c=m(c,r[l],s[l]);else{if(!o(s,"*"))return Object.defineProperty(n,l,{configurable:!0,enumerable:!0,get:()=>e[l],set(r){e[l]=r}}),c;c=m(c,r[l],s["*"])}return n[l]=c,c},set:(r,s,t,a)=>(s in n?n[s]=t:e[s]=t,!0),defineProperty:(e,r,s)=>Reflect.defineProperty(n,r,s),deleteProperty:(e,r)=>Reflect.deleteProperty(n,r)},l=Object.create(e);return new Proxy(l,t)},l=e=>({addListener(r,s,...n){r.addListener(e.get(s),...n)},hasListener:(r,s)=>r.hasListener(e.get(s)),removeListener(r,s){r.removeListener(e.get(s))}}),A=new t((e=>"function"!=typeof e?e:function(r){const s=m(r,{},{getContent:{minArgs:0,maxArgs:0}});e(s)}));let c=!1;const u=new t((e=>"function"!=typeof e?e:function(r,n,t){let a,g,i=!1,o=new Promise((e=>{a=function(r){c||(console.warn(s,(new Error).stack),c=!0),i=!0,e(r)}}));try{g=e(r,n,a)}catch(e){g=Promise.reject(e)}const m=!0!==g&&((l=g)&&"object"==typeof l&&"function"==typeof l.then);var l;if(!0!==g&&!m&&!i)return!1;return(m?g:o).then((e=>{t(e)}),(e=>{let r;r=e&&(e instanceof Error||"string"==typeof e.message)?e.message:"An unexpected error occurred",t({__mozWebExtensionPolyfillReject__:!0,message:r})})).catch((e=>{console.error("Failed to send onMessage rejected reply",e)})),!0})),x=({reject:s,resolve:n},t)=>{e.runtime.lastError?e.runtime.lastError.message===r?n():s(new Error(e.runtime.lastError.message)):t&&t.__mozWebExtensionPolyfillReject__?s(new Error(t.message)):n(t)},d=(e,r,s,...n)=>{if(n.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${g(r.minArgs)} for ${e}(), got ${n.length}`);if(n.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${g(r.maxArgs)} for ${e}(), got ${n.length}`);return new Promise(((e,r)=>{const t=x.bind(null,{resolve:e,reject:r});n.push(t),s.sendMessage(...n)}))},p={devtools:{network:{onRequestFinished:l(A)}},runtime:{onMessage:l(u),onMessageExternal:l(u),sendMessage:d.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:d.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},f={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return n.privacy={network:{"*":f},services:{"*":f},websites:{"*":f}},m(e,p,n)};if("object"!=typeof chrome||!chrome||!chrome.runtime||!chrome.runtime.id)throw new Error("This script should only be loaded in a browser extension.");e.exports=n(chrome)}else e.exports=browser})?s.apply(r,[e]):s)||(e.exports=n)}},r={};function s(n){var t=r[n];if(void 0!==t)return t.exports;var a=r[n]={exports:{}};return e[n].call(a.exports,a,a.exports,s),a.exports}s.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return s.d(r,{a:r}),r},s.d=(e,r)=>{for(var n in r)s.o(r,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},s.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";var e=s(150),r=s.n(e),n=["brainly.com.br","brainly.lat","brainly.com","brainly.pl","eodev.com","nosdevoirs.fr","brainly.in","brainly.co.id","znanija.com","brainly.ro","brainly.ph"];const t=function(e){try{return Boolean("string"==typeof e&&e.includes(".")&&new URL(e).hostname)}catch(e){return!1}};var a=function(e,r,s,n){return new(s||(s=Promise))((function(t,a){function g(e){try{o(n.next(e))}catch(e){a(e)}}function i(e){try{o(n.throw(e))}catch(e){a(e)}}function o(e){var r;e.done?t(e.value):(r=e.value,r instanceof s?r:new s((function(e){e(r)}))).then(g,i)}o((n=n.apply(e,r||[])).next())}))},g=function(e,r){var s,n,t,a,g={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(a){return function(i){return function(a){if(s)throw new TypeError("Generator is already executing.");for(;g;)try{if(s=1,n&&(t=2&a[0]?n.return:a[0]?n.throw||((t=n.return)&&t.call(n),0):n.next)&&!(t=t.call(n,a[1])).done)return t;switch(n=0,t&&(a=[2&a[0],t.value]),a[0]){case 0:case 1:t=a;break;case 4:return g.label++,{value:a[1],done:!1};case 5:g.label++,n=a[1],a=[0];continue;case 7:a=g.ops.pop(),g.trys.pop();continue;default:if(!((t=(t=g.trys).length>0&&t[t.length-1])||6!==a[0]&&2!==a[0])){g=0;continue}if(3===a[0]&&(!t||a[1]>t[0]&&a[1]<t[3])){g.label=a[1];break}if(6===a[0]&&g.label<t[1]){g.label=t[1],t=a;break}if(t&&g.label<t[2]){g.label=t[2],g.ops.push(a);break}t[2]&&g.ops.pop(),g.trys.pop();continue}a=r.call(e,g)}catch(e){a=[6,e],n=0}finally{s=t=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,i])}}};new(function(){function e(){this.BindListeners()}return e.prototype.BindListeners=function(){r().tabs.onUpdated.addListener(this.InjectContentScript.bind(this)),r().runtime.onMessage.addListener(this.MessageRequestHandler.bind(this)),r().runtime.onMessageExternal.addListener(this.MessageRequestHandler.bind(this))},e.prototype.InjectContentScript=function(e,s,i){return a(this,void 0,void 0,(function(){var a,o;return g(this,(function(g){switch(g.label){case 0:return i.url&&t(i.url)?(a=new URL(i.url),"loading"!==s.status?[3,4]:[4,r().permissions.contains({permissions:["tabs"],origins:["*://"+a.hostname+"/*"]})]):[2];case 1:return g.sent()?(o=function(e){if(!e)return!1;if("string"==typeof e){if(!t(e))return!1;e=new URL(e)}return n.includes(e.hostname)}(i.url))?[4,this.TabHasContentScript(e)]:[3,3]:[2];case 2:o=!g.sent(),g.label=3;case 3:o&&r().tabs.executeScript(e,{file:"contentScript.js",runAt:"document_start"}).catch(console.error),g.label=4;case 4:return[2]}}))}))},e.prototype.MessageRequestHandler=function(e,s){var n,t;return a(this,void 0,void 0,(function(){var a,i,o,m,l,A,c,u,x,d,p,f;return g(this,(function(g){switch(g.label){case 0:return e.action?(a=e.action,i=e.data,"insertDarkTheme"!==a?[3,2]:[4,r().tabs.insertCSS(null===(n=s.tab)||void 0===n?void 0:n.id,{file:"styles/DarkTheme.css",runAt:"document_start"})]):[2,!1];case 1:return[2,g.sent()];case 2:return"expandLayout"!==a?[3,4]:[4,r().tabs.insertCSS(null===(t=s.tab)||void 0===t?void 0:t.id,{file:"styles/Extended.css",runAt:"document_start"})];case 3:return[2,g.sent()];case 4:return"setDarkTheme"!==a?[3,8]:void 0!==i?[3,6]:(m=Boolean,[4,r().storage.local.get("darkTheme")]);case 5:return o=!m.apply(void 0,[g.sent().darkTheme]),[3,7];case 6:o=i,g.label=7;case 7:return l=o,[2,r().storage.local.set({darkTheme:l})];case 8:return"setExpandLayout"!==a?[3,12]:void 0!==i?[3,10]:(c=Boolean,[4,r().storage.local.get("expandLayout")]);case 9:return A=!c.apply(void 0,[g.sent().expandLayout]),[3,11];case 10:A=i,g.label=11;case 11:return l=A,[2,r().storage.local.set({expandLayout:l})];case 12:return"setStorage"===a?(x=i.keys,u=i.value,d=i.type,[2,r().storage[d].set(Object.fromEntries(x.map((function(e){return[e,u]}))))]):"getStorage"!==a?[3,14]:(x="string"==typeof i.keys?[i.keys]:i.keys,d=i.type,[4,r().storage[d].get(x)]);case 13:return p=g.sent(),f=x.map((function(e){return p[e]})),"string"==typeof i.keys?[2,f[0]]:[2,f];case 14:return[2,!1]}}))}))},e.prototype.TabHasContentScript=function(e){return a(this,void 0,void 0,(function(){var s;return g(this,(function(n){switch(n.label){case 0:s=!1,n.label=1;case 1:return n.trys.push([1,4,,5]),e?[4,r().tabs.sendMessage(e,{action:"isContentScriptInjected"})]:[3,3];case 2:s=n.sent(),n.label=3;case 3:return[3,5];case 4:return n.sent(),[3,5];case 5:return[2,s]}}))}))},e}())})()})();