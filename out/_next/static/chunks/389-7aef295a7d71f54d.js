(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[389],{8162:function(e){"use strict";e.exports=function(e){if(e.length>=255)throw new TypeError("Alphabet too long");for(var t=new Uint8Array(256),r=0;r<t.length;r++)t[r]=255;for(var n=0;n<e.length;n++){var s=e.charAt(n),a=s.charCodeAt(0);if(255!==t[a])throw new TypeError(s+" is ambiguous");t[a]=n}var i=e.length,o=e.charAt(0),l=Math.log(i)/Math.log(256),c=Math.log(256)/Math.log(i);function d(e){if("string"!==typeof e)throw new TypeError("Expected String");if(0===e.length)return new Uint8Array;for(var r=0,n=0,s=0;e[r]===o;)n++,r++;for(var a=(e.length-r)*l+1>>>0,c=new Uint8Array(a);e[r];){var d=t[e.charCodeAt(r)];if(255===d)return;for(var p=0,u=a-1;(0!==d||p<s)&&-1!==u;u--,p++)d+=i*c[u]>>>0,c[u]=d%256>>>0,d=d/256>>>0;if(0!==d)throw new Error("Non-zero carry");s=p,r++}for(var f=a-s;f!==a&&0===c[f];)f++;for(var m=new Uint8Array(n+(a-f)),h=n;f!==a;)m[h++]=c[f++];return m}return{encode:function(t){if(t instanceof Uint8Array||(ArrayBuffer.isView(t)?t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength):Array.isArray(t)&&(t=Uint8Array.from(t))),!(t instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(0===t.length)return"";for(var r=0,n=0,s=0,a=t.length;s!==a&&0===t[s];)s++,r++;for(var l=(a-s)*c+1>>>0,d=new Uint8Array(l);s!==a;){for(var p=t[s],u=0,f=l-1;(0!==p||u<n)&&-1!==f;f--,u++)p+=256*d[f]>>>0,d[f]=p%i>>>0,p=p/i>>>0;if(0!==p)throw new Error("Non-zero carry");n=u,s++}for(var m=l-n;m!==l&&0===d[m];)m++;for(var h=o.repeat(r);m<l;++m)h+=e.charAt(d[m]);return h},decodeUnsafe:d,decode:function(e){var t=d(e);if(t)return t;throw new Error("Non-base"+i+" character")}}}},7191:function(e,t,r){const n=r(8162);e.exports=n("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")},8679:function(e,t,r){"use strict";var n=r(9864),s={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},i={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},o={};function l(e){return n.isMemo(e)?i:o[e.$$typeof]||s}o[n.ForwardRef]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},o[n.Memo]=i;var c=Object.defineProperty,d=Object.getOwnPropertyNames,p=Object.getOwnPropertySymbols,u=Object.getOwnPropertyDescriptor,f=Object.getPrototypeOf,m=Object.prototype;e.exports=function e(t,r,n){if("string"!==typeof r){if(m){var s=f(r);s&&s!==m&&e(t,s,n)}var i=d(r);p&&(i=i.concat(p(r)));for(var o=l(t),h=l(r),g=0;g<i.length;++g){var v=i[g];if(!a[v]&&(!n||!n[v])&&(!h||!h[v])&&(!o||!o[v])){var y=u(r,v);try{c(t,v,y)}catch(b){}}}}return t}},8e3:function(e,t,r){"use strict";var n;Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var s=((n=r(7294))&&n.__esModule?n:{default:n}).default.createContext({});t.AmpStateContext=s},5646:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=i,t.useAmp=function(){return i(s.default.useContext(a.AmpStateContext))};var n,s=(n=r(7294))&&n.__esModule?n:{default:n},a=r(8e3);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,r=void 0!==t&&t,n=e.hybrid,s=void 0!==n&&n,a=e.hasQuery,i=void 0!==a&&a;return r||s&&i}},2717:function(e,t,r){"use strict";var n=r(930);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=p,t.default=void 0;var a,i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(7294)),o=(a=r(1585))&&a.__esModule?a:{default:a},l=r(8e3),c=r(5850),d=r(5646);function p(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function u(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var f=["name","httpEquiv","charSet","itemProp"];function m(e,t){return e.reduce((function(e,t){var r=i.default.Children.toArray(t.props.children);return e.concat(r)}),[]).reduce(u,[]).reverse().concat(p(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,r=new Set,n={};return function(s){var a=!0,i=!1;if(s.key&&"number"!==typeof s.key&&s.key.indexOf("$")>0){i=!0;var o=s.key.slice(s.key.indexOf("$")+1);e.has(o)?a=!1:e.add(o)}switch(s.type){case"title":case"base":t.has(s.type)?a=!1:t.add(s.type);break;case"meta":for(var l=0,c=f.length;l<c;l++){var d=f[l];if(s.props.hasOwnProperty(d))if("charSet"===d)r.has(d)?a=!1:r.add(d);else{var p=s.props[d],u=n[d]||new Set;"name"===d&&i||!u.has(p)?(u.add(p),n[d]=u):a=!1}}}return a}}()).reverse().map((function(e,r){var a=e.key||r;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some((function(t){return e.props.href.startsWith(t)}))){var o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e.props||{});return o["data-href"]=o.href,o.href=void 0,o["data-optimized-fonts"]=!0,i.default.cloneElement(e,o)}return i.default.cloneElement(e,{key:a})}))}var h=function(e){var t=e.children,r=i.useContext(l.AmpStateContext),n=i.useContext(c.HeadManagerContext);return i.default.createElement(o.default,{reduceComponentsToState:m,headManager:n,inAmpMode:d.isInAmpMode(r)},t)};t.default=h},1585:function(e,t,r){"use strict";var n=r(7980),s=r(3227),a=r(8361),i=(r(2191),r(5971)),o=r(2715),l=r(1193);function c(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=l(e);if(t){var s=l(this).constructor;r=Reflect.construct(n,arguments,s)}else r=n.apply(this,arguments);return o(this,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}(r(7294));var p=function(e){i(r,e);var t=c(r);function r(e){var a;return s(this,r),(a=t.call(this,e)).emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(n(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,a}return a(r,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),r}(d.Component);t.default=p},933:function(){},9008:function(e,t,r){e.exports=r(2717)},1163:function(e,t,r){e.exports=r(9898)},5746:function(e,t,r){"use strict";r.d(t,{pT:function(){return lr}});var n=r(7294),s=r.t(n,2);var a=function(){function e(e){var t=this;this._insertTag=function(e){var r;r=0===t.tags.length?t.insertionPoint?t.insertionPoint.nextSibling:t.prepend?t.container.firstChild:t.before:t.tags[t.tags.length-1].nextSibling,t.container.insertBefore(e,r),t.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(e){e.forEach(this._insertTag)},t.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}(this));var t=this.tags[this.tags.length-1];if(this.isSpeedy){var r=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(t);try{r.insertRule(e,r.cssRules.length)}catch(n){0}}else t.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}(),i=Math.abs,o=String.fromCharCode,l=Object.assign;function c(e){return e.trim()}function d(e,t,r){return e.replace(t,r)}function p(e,t){return e.indexOf(t)}function u(e,t){return 0|e.charCodeAt(t)}function f(e,t,r){return e.slice(t,r)}function m(e){return e.length}function h(e){return e.length}function g(e,t){return t.push(e),e}var v=1,y=1,b=0,w=0,x=0,C="";function S(e,t,r,n,s,a,i){return{value:e,root:t,parent:r,type:n,props:s,children:a,line:v,column:y,length:i,return:""}}function E(e,t){return l(S("",null,null,"",null,null,0),e,{length:-e.length},t)}function T(){return x=w>0?u(C,--w):0,y--,10===x&&(y=1,v--),x}function k(){return x=w<b?u(C,w++):0,y++,10===x&&(y=1,v++),x}function O(){return u(C,w)}function $(){return w}function P(e,t){return f(C,e,t)}function M(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function _(e){return v=y=1,b=m(C=e),w=0,[]}function A(e){return C="",e}function L(e){return c(P(w-1,I(91===e?e+2:40===e?e+1:e)))}function z(e){for(;(x=O())&&x<33;)k();return M(e)>2||M(x)>3?"":" "}function N(e,t){for(;--t&&k()&&!(x<48||x>102||x>57&&x<65||x>70&&x<97););return P(e,$()+(t<6&&32==O()&&32==k()))}function I(e){for(;k();)switch(x){case e:return w;case 34:case 39:34!==e&&39!==e&&I(x);break;case 40:41===e&&I(e);break;case 92:k()}return w}function j(e,t){for(;k()&&e+x!==57&&(e+x!==84||47!==O()););return"/*"+P(t,w-1)+"*"+o(47===e?e:k())}function D(e){for(;!M(O());)k();return P(e,w)}var G="-ms-",B="-moz-",V="-webkit-",F="comm",R="rule",H="decl",Y="@keyframes";function W(e,t){for(var r="",n=h(e),s=0;s<n;s++)r+=t(e[s],s,e,t)||"";return r}function X(e,t,r,n){switch(e.type){case"@import":case H:return e.return=e.return||e.value;case F:return"";case Y:return e.return=e.value+"{"+W(e.children,n)+"}";case R:e.value=e.props.join(",")}return m(r=W(e.children,n))?e.return=e.value+"{"+r+"}":""}function q(e,t){switch(function(e,t){return(((t<<2^u(e,0))<<2^u(e,1))<<2^u(e,2))<<2^u(e,3)}(e,t)){case 5103:return V+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return V+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return V+e+B+e+G+e+e;case 6828:case 4268:return V+e+G+e+e;case 6165:return V+e+G+"flex-"+e+e;case 5187:return V+e+d(e,/(\w+).+(:[^]+)/,"-webkit-box-$1$2-ms-flex-$1$2")+e;case 5443:return V+e+G+"flex-item-"+d(e,/flex-|-self/,"")+e;case 4675:return V+e+G+"flex-line-pack"+d(e,/align-content|flex-|-self/,"")+e;case 5548:return V+e+G+d(e,"shrink","negative")+e;case 5292:return V+e+G+d(e,"basis","preferred-size")+e;case 6060:return V+"box-"+d(e,"-grow","")+V+e+G+d(e,"grow","positive")+e;case 4554:return V+d(e,/([^-])(transform)/g,"$1-webkit-$2")+e;case 6187:return d(d(d(e,/(zoom-|grab)/,V+"$1"),/(image-set)/,V+"$1"),e,"")+e;case 5495:case 3959:return d(e,/(image-set\([^]*)/,V+"$1$`$1");case 4968:return d(d(e,/(.+:)(flex-)?(.*)/,"-webkit-box-pack:$3-ms-flex-pack:$3"),/s.+-b[^;]+/,"justify")+V+e+e;case 4095:case 3583:case 4068:case 2532:return d(e,/(.+)-inline(.+)/,V+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(m(e)-1-t>6)switch(u(e,t+1)){case 109:if(45!==u(e,t+4))break;case 102:return d(e,/(.+:)(.+)-([^]+)/,"$1-webkit-$2-$3$1"+B+(108==u(e,t+3)?"$3":"$2-$3"))+e;case 115:return~p(e,"stretch")?q(d(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(115!==u(e,t+1))break;case 6444:switch(u(e,m(e)-3-(~p(e,"!important")&&10))){case 107:return d(e,":",":"+V)+e;case 101:return d(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+V+(45===u(e,14)?"inline-":"")+"box$3$1"+V+"$2$3$1"+G+"$2box$3")+e}break;case 5936:switch(u(e,t+11)){case 114:return V+e+G+d(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return V+e+G+d(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return V+e+G+d(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return V+e+G+e+e}return e}function U(e){return A(Z("",null,null,null,[""],e=_(e),0,[0],e))}function Z(e,t,r,n,s,a,i,l,c){for(var u=0,f=0,h=i,v=0,y=0,b=0,w=1,x=1,C=1,S=0,E="",P=s,M=a,_=n,A=E;x;)switch(b=S,S=k()){case 40:if(108!=b&&58==A.charCodeAt(h-1)){-1!=p(A+=d(L(S),"&","&\f"),"&\f")&&(C=-1);break}case 34:case 39:case 91:A+=L(S);break;case 9:case 10:case 13:case 32:A+=z(b);break;case 92:A+=N($()-1,7);continue;case 47:switch(O()){case 42:case 47:g(Q(j(k(),$()),t,r),c);break;default:A+="/"}break;case 123*w:l[u++]=m(A)*C;case 125*w:case 59:case 0:switch(S){case 0:case 125:x=0;case 59+f:y>0&&m(A)-h&&g(y>32?J(A+";",n,r,h-1):J(d(A," ","")+";",n,r,h-2),c);break;case 59:A+=";";default:if(g(_=K(A,t,r,u,f,s,l,E,P=[],M=[],h),a),123===S)if(0===f)Z(A,t,_,_,P,a,h,l,M);else switch(v){case 100:case 109:case 115:Z(e,_,_,n&&g(K(e,_,_,0,0,s,l,E,s,P=[],h),M),s,M,h,l,n?P:M);break;default:Z(A,_,_,_,[""],M,0,l,M)}}u=f=y=0,w=C=1,E=A="",h=i;break;case 58:h=1+m(A),y=b;default:if(w<1)if(123==S)--w;else if(125==S&&0==w++&&125==T())continue;switch(A+=o(S),S*w){case 38:C=f>0?1:(A+="\f",-1);break;case 44:l[u++]=(m(A)-1)*C,C=1;break;case 64:45===O()&&(A+=L(k())),v=O(),f=h=m(E=A+=D($())),S++;break;case 45:45===b&&2==m(A)&&(w=0)}}return a}function K(e,t,r,n,s,a,o,l,p,u,m){for(var g=s-1,v=0===s?a:[""],y=h(v),b=0,w=0,x=0;b<n;++b)for(var C=0,E=f(e,g+1,g=i(w=o[b])),T=e;C<y;++C)(T=c(w>0?v[C]+" "+E:d(E,/&\f/g,v[C])))&&(p[x++]=T);return S(e,t,r,0===s?R:l,p,u,m)}function Q(e,t,r){return S(e,t,r,F,o(x),f(e,2,-2),0)}function J(e,t,r,n){return S(e,t,r,H,f(e,0,n),f(e,n+1,-1),n)}var ee=function(e,t,r){for(var n=0,s=0;n=s,s=O(),38===n&&12===s&&(t[r]=1),!M(s);)k();return P(e,w)},te=function(e,t){return A(function(e,t){var r=-1,n=44;do{switch(M(n)){case 0:38===n&&12===O()&&(t[r]=1),e[r]+=ee(w-1,t,r);break;case 2:e[r]+=L(n);break;case 4:if(44===n){e[++r]=58===O()?"&\f":"",t[r]=e[r].length;break}default:e[r]+=o(n)}}while(n=k());return e}(_(e),t))},re=new WeakMap,ne=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var t=e.value,r=e.parent,n=e.column===r.column&&e.line===r.line;"rule"!==r.type;)if(!(r=r.parent))return;if((1!==e.props.length||58===t.charCodeAt(0)||re.get(r))&&!n){re.set(e,!0);for(var s=[],a=te(t,s),i=r.props,o=0,l=0;o<a.length;o++)for(var c=0;c<i.length;c++,l++)e.props[l]=s[o]?a[o].replace(/&\f/g,i[c]):i[c]+" "+a[o]}}},se=function(e){if("decl"===e.type){var t=e.value;108===t.charCodeAt(0)&&98===t.charCodeAt(2)&&(e.return="",e.value="")}},ae=[function(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case H:e.return=q(e.value,e.length);break;case Y:return W([E(e,{value:d(e.value,"@","@"+V)})],n);case R:if(e.length)return function(e,t){return e.map(t).join("")}(e.props,(function(t){switch(function(e,t){return(e=t.exec(e))?e[0]:e}(t,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return W([E(e,{props:[d(t,/:(read-\w+)/,":-moz-$1")]})],n);case"::placeholder":return W([E(e,{props:[d(t,/:(plac\w+)/,":-webkit-input-$1")]}),E(e,{props:[d(t,/:(plac\w+)/,":-moz-$1")]}),E(e,{props:[d(t,/:(plac\w+)/,G+"input-$1")]})],n)}return""}))}}],ie=function(e){var t=e.key;if("css"===t){var r=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(r,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var n=e.stylisPlugins||ae;var s,i,o={},l=[];s=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+t+' "]'),(function(e){for(var t=e.getAttribute("data-emotion").split(" "),r=1;r<t.length;r++)o[t[r]]=!0;l.push(e)}));var c,d,p=[X,(d=function(e){c.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],u=function(e){var t=h(e);return function(r,n,s,a){for(var i="",o=0;o<t;o++)i+=e[o](r,n,s,a)||"";return i}}([ne,se].concat(n,p));i=function(e,t,r,n){c=r,W(U(e?e+"{"+t.styles+"}":t.styles),u),n&&(f.inserted[t.name]=!0)};var f={key:t,sheet:new a({key:t,container:s,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:o,registered:{},insert:i};return f.sheet.hydrate(l),f};function oe(e,t,r){var n="";return r.split(" ").forEach((function(r){void 0!==e[r]?t.push(e[r]+";"):n+=r+" "})),n}var le=function(e,t,r){var n=e.key+"-"+t.name;!1===r&&void 0===e.registered[n]&&(e.registered[n]=t.styles)},ce=function(e,t,r){le(e,t,r);var n=e.key+"-"+t.name;if(void 0===e.inserted[t.name]){var s=t;do{e.insert(t===s?"."+n:"",s,e.sheet,!0);s=s.next}while(void 0!==s)}};var de=function(e){for(var t,r=0,n=0,s=e.length;s>=4;++n,s-=4)t=1540483477*(65535&(t=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(t>>>16)<<16),r=1540483477*(65535&(t^=t>>>24))+(59797*(t>>>16)<<16)^1540483477*(65535&r)+(59797*(r>>>16)<<16);switch(s){case 3:r^=(255&e.charCodeAt(n+2))<<16;case 2:r^=(255&e.charCodeAt(n+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(n)))+(59797*(r>>>16)<<16)}return(((r=1540483477*(65535&(r^=r>>>13))+(59797*(r>>>16)<<16))^r>>>15)>>>0).toString(36)},pe={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};var ue=/[A-Z]|^ms/g,fe=/_EMO_([^_]+?)_([^]*?)_EMO_/g,me=function(e){return 45===e.charCodeAt(1)},he=function(e){return null!=e&&"boolean"!==typeof e},ge=function(e){var t=Object.create(null);return function(r){return void 0===t[r]&&(t[r]=e(r)),t[r]}}((function(e){return me(e)?e:e.replace(ue,"-$&").toLowerCase()})),ve=function(e,t){switch(e){case"animation":case"animationName":if("string"===typeof t)return t.replace(fe,(function(e,t,r){return be={name:t,styles:r,next:be},t}))}return 1===pe[e]||me(e)||"number"!==typeof t||0===t?t:t+"px"};function ye(e,t,r){if(null==r)return"";if(void 0!==r.__emotion_styles)return r;switch(typeof r){case"boolean":return"";case"object":if(1===r.anim)return be={name:r.name,styles:r.styles,next:be},r.name;if(void 0!==r.styles){var n=r.next;if(void 0!==n)for(;void 0!==n;)be={name:n.name,styles:n.styles,next:be},n=n.next;return r.styles+";"}return function(e,t,r){var n="";if(Array.isArray(r))for(var s=0;s<r.length;s++)n+=ye(e,t,r[s])+";";else for(var a in r){var i=r[a];if("object"!==typeof i)null!=t&&void 0!==t[i]?n+=a+"{"+t[i]+"}":he(i)&&(n+=ge(a)+":"+ve(a,i)+";");else if(!Array.isArray(i)||"string"!==typeof i[0]||null!=t&&void 0!==t[i[0]]){var o=ye(e,t,i);switch(a){case"animation":case"animationName":n+=ge(a)+":"+o+";";break;default:n+=a+"{"+o+"}"}}else for(var l=0;l<i.length;l++)he(i[l])&&(n+=ge(a)+":"+ve(a,i[l])+";")}return n}(e,t,r);case"function":if(void 0!==e){var s=be,a=r(e);return be=s,ye(e,t,a)}}if(null==t)return r;var i=t[r];return void 0!==i?i:r}var be,we=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var xe=function(e,t,r){if(1===e.length&&"object"===typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var n=!0,s="";be=void 0;var a=e[0];null==a||void 0===a.raw?(n=!1,s+=ye(r,t,a)):s+=a[0];for(var i=1;i<e.length;i++)s+=ye(r,t,e[i]),n&&(s+=a[i]);we.lastIndex=0;for(var o,l="";null!==(o=we.exec(s));)l+="-"+o[1];return{name:de(s)+l,styles:s,next:be}},Ce=!!s.useInsertionEffect&&s.useInsertionEffect,Se=Ce||function(e){return e()},Ee=(Ce||n.useLayoutEffect,{}.hasOwnProperty),Te=(0,n.createContext)("undefined"!==typeof HTMLElement?ie({key:"css"}):null);Te.Provider;var ke=function(e){return(0,n.forwardRef)((function(t,r){var s=(0,n.useContext)(Te);return e(t,s,r)}))},Oe=(0,n.createContext)({});var $e="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",Pe=function(e){var t=e.cache,r=e.serialized,n=e.isStringTag;le(t,r,n);Se((function(){return ce(t,r,n)}));return null},Me=ke((function(e,t,r){var s=e.css;"string"===typeof s&&void 0!==t.registered[s]&&(s=t.registered[s]);var a=e[$e],i=[s],o="";"string"===typeof e.className?o=oe(t.registered,i,e.className):null!=e.className&&(o=e.className+" ");var l=xe(i,void 0,(0,n.useContext)(Oe));o+=t.key+"-"+l.name;var c={};for(var d in e)Ee.call(e,d)&&"css"!==d&&d!==$e&&(c[d]=e[d]);return c.ref=r,c.className=o,(0,n.createElement)(n.Fragment,null,(0,n.createElement)(Pe,{cache:t,serialized:l,isStringTag:"string"===typeof a}),(0,n.createElement)(a,c))}));r(8679);var _e=r(5893),Ae=_e.Fragment;function Le(e,t,r){return Ee.call(t,"css")?(0,_e.jsx)(Me,function(e,t){var r={};for(var n in t)Ee.call(t,n)&&(r[n]=t[n]);return r[$e]=e,r}(e,t),r):(0,_e.jsx)(e,t,r)}function ze(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return xe(t)}var Ne=function(){var e=ze.apply(void 0,arguments),t="animation-"+e.name;return{name:t,styles:"@keyframes "+t+"{"+e.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}},Ie=function e(t){for(var r=t.length,n=0,s="";n<r;n++){var a=t[n];if(null!=a){var i=void 0;switch(typeof a){case"boolean":break;case"object":if(Array.isArray(a))i=e(a);else for(var o in i="",a)a[o]&&o&&(i&&(i+=" "),i+=o);break;default:i=a}i&&(s&&(s+=" "),s+=i)}}return s};function je(e,t,r){var n=[],s=oe(e,n,r);return n.length<2?r:s+t(n)}var De=function(e){var t=e.cache,r=e.serializedArr;Se((function(){for(var e=0;e<r.length;e++)ce(t,r[e],!1)}));return null},Ge=ke((function(e,t){var r=[],s=function(){for(var e=arguments.length,n=new Array(e),s=0;s<e;s++)n[s]=arguments[s];var a=xe(n,t.registered);return r.push(a),le(t,a,!1),t.key+"-"+a.name},a={css:s,cx:function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return je(t.registered,s,Ie(r))},theme:(0,n.useContext)(Oe)},i=e.children(a);return!0,(0,n.createElement)(n.Fragment,null,(0,n.createElement)(De,{cache:t,serializedArr:r}),i)}));function Be(){return Be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},Be.apply(this,arguments)}const Ve=new Map,Fe=new WeakMap;let Re,He=0;function Ye(e){return Object.keys(e).sort().filter((t=>void 0!==e[t])).map((t=>{return`${t}_${"root"===t?(r=e.root,r?(Fe.has(r)||(He+=1,Fe.set(r,He.toString())),Fe.get(r)):"0"):e[t]}`;var r})).toString()}function We(e,t,r={},n=Re){if("undefined"===typeof window.IntersectionObserver&&void 0!==n){const s=e.getBoundingClientRect();return t(n,{isIntersecting:n,target:e,intersectionRatio:"number"===typeof r.threshold?r.threshold:0,time:0,boundingClientRect:s,intersectionRect:s,rootBounds:s}),()=>{}}const{id:s,observer:a,elements:i}=function(e){let t=Ye(e),r=Ve.get(t);if(!r){const n=new Map;let s;const a=new IntersectionObserver((t=>{t.forEach((t=>{var r;const a=t.isIntersecting&&s.some((e=>t.intersectionRatio>=e));e.trackVisibility&&"undefined"===typeof t.isVisible&&(t.isVisible=a),null==(r=n.get(t.target))||r.forEach((e=>{e(a,t)}))}))}),e);s=a.thresholds||(Array.isArray(e.threshold)?e.threshold:[e.threshold||0]),r={id:t,observer:a,elements:n},Ve.set(t,r)}return r}(r);let o=i.get(e)||[];return i.has(e)||i.set(e,o),o.push(t),a.observe(e),function(){o.splice(o.indexOf(t),1),0===o.length&&(i.delete(e),a.unobserve(e)),0===i.size&&(a.disconnect(),Ve.delete(s))}}const Xe=["children","as","triggerOnce","threshold","root","rootMargin","onChange","skip","trackVisibility","delay","initialInView","fallbackInView"];function qe(e){return"function"!==typeof e.children}class Ue extends n.Component{constructor(e){super(e),this.node=null,this._unobserveCb=null,this.handleNode=e=>{this.node&&(this.unobserve(),e||this.props.triggerOnce||this.props.skip||this.setState({inView:!!this.props.initialInView,entry:void 0})),this.node=e||null,this.observeNode()},this.handleChange=(e,t)=>{e&&this.props.triggerOnce&&this.unobserve(),qe(this.props)||this.setState({inView:e,entry:t}),this.props.onChange&&this.props.onChange(e,t)},this.state={inView:!!e.initialInView,entry:void 0}}componentDidUpdate(e){e.rootMargin===this.props.rootMargin&&e.root===this.props.root&&e.threshold===this.props.threshold&&e.skip===this.props.skip&&e.trackVisibility===this.props.trackVisibility&&e.delay===this.props.delay||(this.unobserve(),this.observeNode())}componentWillUnmount(){this.unobserve(),this.node=null}observeNode(){if(!this.node||this.props.skip)return;const{threshold:e,root:t,rootMargin:r,trackVisibility:n,delay:s,fallbackInView:a}=this.props;this._unobserveCb=We(this.node,this.handleChange,{threshold:e,root:t,rootMargin:r,trackVisibility:n,delay:s},a)}unobserve(){this._unobserveCb&&(this._unobserveCb(),this._unobserveCb=null)}render(){if(!qe(this.props)){const{inView:e,entry:t}=this.state;return this.props.children({inView:e,entry:t,ref:this.handleNode})}const e=this.props,{children:t,as:r}=e,s=function(e,t){if(null==e)return{};var r,n,s={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(s[r]=e[r]);return s}(e,Xe);return n.createElement(r||"div",Be({ref:this.handleNode},s),t)}}function Ze({threshold:e,delay:t,trackVisibility:r,rootMargin:s,root:a,triggerOnce:i,skip:o,initialInView:l,fallbackInView:c,onChange:d}={}){var p;const[u,f]=n.useState(null),m=n.useRef(),[h,g]=n.useState({inView:!!l,entry:void 0});m.current=d,n.useEffect((()=>{if(o||!u)return;let n=We(u,((e,t)=>{g({inView:e,entry:t}),m.current&&m.current(e,t),t.isIntersecting&&i&&n&&(n(),n=void 0)}),{root:a,rootMargin:s,threshold:e,trackVisibility:r,delay:t},c);return()=>{n&&n()}}),[Array.isArray(e)?e.toString():e,u,a,s,i,o,r,c,t]);const v=null==(p=h.entry)?void 0:p.target;n.useEffect((()=>{u||!v||i||o||g({inView:!!l,entry:void 0})}),[u,v,i,o,l]);const y=[f,h.inView,h.entry];return y.ref=y[0],y.inView=y[1],y.entry=y[2],y}var Ke=r(4954);function Qe(e,t){return Object.keys(t).forEach((function(r){"default"===r||"__esModule"===r||e.hasOwnProperty(r)||Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[r]}})})),e}function Je(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var et={},tt={};Je(tt,"AttentionSeeker",(()=>Nt));const rt=Ne`
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
`,nt=Ne`
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
`,st=Ne`
  0% {
    transform: translateX(0);
  }

  6.5% {
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    transform: translateX(0);
  }
`,at=Ne`
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
`,it=Ne`
  from,
  11.1%,
  to {
    transform: translate3d(0, 0, 0);
  }

  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg);
  }

  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg);
  }

  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg);
  }

  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg);
  }

  66.6% {
    transform: skewX(-0.78125deg) skewY(-0.78125deg);
  }

  77.7% {
    transform: skewX(0.390625deg) skewY(0.390625deg);
  }

  88.8% {
    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
  }
`,ot=Ne`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`,lt=Ne`
  from {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(0.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, 0.95, 1);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`,ct=Ne`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
`,dt=Ne`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
  }
`,pt=Ne`
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(0, -10px, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(0, 10px, 0);
  }
`,ut=Ne`
  20% {
    transform: rotate3d(0, 0, 1, 15deg);
  }

  40% {
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    transform: rotate3d(0, 0, 1, 0deg);
  }
`,ft=Ne`
  from {
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`,mt=Ne`
  from {
    transform: translate3d(0, 0, 0);
  }

  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;Je({},"Reveal",(()=>At));const ht=Ne`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`,gt=Ne`
  from {
    opacity: 0;
    transform: translate3d(-100%, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,vt=Ne`
  from {
    opacity: 0;
    transform: translate3d(100%, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,yt=Ne`
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,bt=Ne`
  from {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,wt=Ne`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,xt=Ne`
  from {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Ct=Ne`
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,St=Ne`
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Et=Ne`
  from {
    opacity: 0;
    transform: translate3d(-100%, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Tt=Ne`
  from {
    opacity: 0;
    transform: translate3d(100%, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,kt=Ne`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,Ot=Ne`
  from {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;function $t({duration:e=1e3,delay:t=0,timingFunction:r="ease",keyframes:n=wt,iterationCount:s=1}){return ze`
    animation-duration: ${e}ms;
    animation-timing-function: ${r};
    animation-delay: ${t}ms;
    animation-name: ${n};
    animation-direction: normal;
    animation-fill-mode: both;
    animation-iteration-count: ${s};
  `}function Pt(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e}const Mt=ze`
  opacity: 0;
`,_t=ze`
  display: inline-block;
  white-space: pre;
`,At=e=>{const{cascade:t=!1,damping:r=.5,delay:s=0,duration:a=1e3,fraction:i=0,keyframes:o=wt,triggerOnce:l=!1,css:c,className:d,style:p,childClassName:u,childStyle:f,children:m,onVisibilityChange:h}=e,g=(0,n.useMemo)((()=>$t({keyframes:o,duration:a})),[a,o]);return null===(v=m)||void 0===v?null:Pt(m)?Le(Lt,{...e,animationStyles:g,children:String(m)}):(0,Ke.isFragment)(m)?Le(zt,{...e,animationStyles:g}):Le(Ae,{children:n.Children.map(m,((o,m)=>{if(!(0,n.isValidElement)(o))return null;const v=[c,g],y=s+(t?m*a*r:0);switch(o.type){case"ol":case"ul":return Le(Ge,{children:({cx:t})=>Le(o.type,{...o.props,className:t(d,o.props.className),style:{...p,...o.props.style},children:Le(At,{...e,children:o.props.children})})});case"li":return Le(Ue,{threshold:i,triggerOnce:l,onChange:h,children:({inView:e,ref:t})=>Le(Ge,{children:({cx:r})=>Le(o.type,{...o.props,ref:t,className:r(u,o.props.className),css:e?v:Mt,style:{...f,...o.props.style,animationDelay:y+"ms"}})})});default:return Le(Ue,{threshold:i,triggerOnce:l,onChange:h,children:({inView:e,ref:t})=>Le("div",{ref:t,className:d,css:e?v:Mt,style:{...p,animationDelay:y+"ms"},children:Le(Ge,{children:({cx:e})=>Le(o.type,{...o.props,className:e(u,o.props.className),style:{...f,...o.props.style}})})})})}}))});var v},Lt=e=>{const{animationStyles:t,cascade:r=!1,damping:n=.5,delay:s=0,duration:a=1e3,fraction:i=0,triggerOnce:o=!1,css:l,className:c,style:d,children:p,onVisibilityChange:u}=e,{ref:f,inView:m}=Ze({triggerOnce:o,threshold:i,onChange:u});return r?Le("div",{ref:f,className:c,css:[l,_t],style:d,children:p.split("").map(((e,r)=>Le("span",{css:m?t:Mt,style:{animationDelay:s+r*a*n+"ms"},children:e},r)))}):Le(zt,{...e,children:p})},zt=e=>{const{animationStyles:t,fraction:r=0,triggerOnce:n=!1,css:s,className:a,style:i,children:o,onVisibilityChange:l}=e,{ref:c,inView:d}=Ze({triggerOnce:n,threshold:r,onChange:l});return Le("div",{ref:c,className:a,css:d?[s,t]:Mt,style:i,children:o})};const Nt=e=>{const{effect:t="bounce",...r}=e,[s,a]=(0,n.useMemo)((()=>function(e){switch(e){case"flash":return[nt];case"headShake":return[st,{animationTimingFunction:"ease-in-out"}];case"heartBeat":return[at,{animationTimingFunction:"ease-in-out"}];case"jello":return[it,{transformOrigin:"center"}];case"pulse":return[ot,{animationTimingFunction:"ease-in-out"}];case"rubberBand":return[lt];case"shake":return[ct];case"shakeX":return[dt];case"shakeY":return[pt];case"swing":return[ut,{transformOrigin:"top center"}];case"tada":return[ft];case"wobble":return[mt];default:return[rt,{transformOrigin:"center bottom"}]}}(t)),[t]);return Le(At,{keyframes:s,css:a,...r})};var It={};Je(It,"Bounce",(()=>Xt));const jt=Ne`
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`,Dt=Ne`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0) scaleY(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, -10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, 5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Gt=Ne`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0) scaleX(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0) scaleX(1);
  }

  75% {
    transform: translate3d(-10px, 0, 0) scaleX(0.98);
  }

  90% {
    transform: translate3d(5px, 0, 0) scaleX(0.995);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Bt=Ne`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0) scaleX(3);
  }

  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0) scaleX(1);
  }

  75% {
    transform: translate3d(10px, 0, 0) scaleX(0.98);
  }

  90% {
    transform: translate3d(-5px, 0, 0) scaleX(0.995);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Vt=Ne`
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0) scaleY(5);
  }

  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  75% {
    transform: translate3d(0, 10px, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -5px, 0) scaleY(0.985);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Ft=Ne`
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
`,Rt=Ne`
  20% {
    transform: translate3d(0, 10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0) scaleY(3);
  }
`,Ht=Ne`
  20% {
    opacity: 1;
    transform: translate3d(20px, 0, 0) scaleX(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0) scaleX(2);
  }
`,Yt=Ne`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0) scaleX(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0) scaleX(2);
  }
`,Wt=Ne`
  20% {
    transform: translate3d(0, -10px, 0) scaleY(0.985);
  }

  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0) scaleY(0.9);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0) scaleY(3);
  }
`;const Xt=e=>{const{direction:t,reverse:r=!1,...s}=e,a=(0,n.useMemo)((()=>function(e,t){switch(t){case"down":return e?Rt:Dt;case"left":return e?Ht:Gt;case"right":return e?Yt:Bt;case"up":return e?Wt:Vt;default:return e?Ft:jt}}(r,t)),[t,r]);return Le(At,{keyframes:a,...s})};var qt={};Je(qt,"Fade",(()=>lr));const Ut=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`,Zt=Ne`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, 100%, 0);
  }
`,Kt=Ne`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 100%, 0);
  }
`,Qt=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
`,Jt=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
`,er=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
`,tr=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
`,rr=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
`,nr=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
`,sr=Ne`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, -100%, 0);
  }
`,ar=Ne`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(100%, -100%, 0);
  }
`,ir=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
`,or=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
`;const lr=e=>{const{big:t=!1,direction:r,reverse:s=!1,...a}=e,i=(0,n.useMemo)((()=>function(e,t,r){switch(r){case"bottom-left":return t?Zt:gt;case"bottom-right":return t?Kt:vt;case"down":return e?t?Jt:bt:t?Qt:yt;case"left":return e?t?tr:xt:t?er:wt;case"right":return e?t?nr:St:t?rr:Ct;case"top-left":return t?sr:Et;case"top-right":return t?ar:Tt;case"up":return e?t?or:Ot:t?ir:kt;default:return t?Ut:ht}}(t,s,r)),[t,r,s]);return Le(At,{keyframes:i,...a})};var cr={};Je(cr,"Flip",(()=>gr));const dr=Ne`
  from {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);
    animation-timing-function: ease-out;
  }

  40% {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -190deg);
    animation-timing-function: ease-out;
  }

  50% {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)
      rotate3d(0, 1, 0, -170deg);
    animation-timing-function: ease-in;
  }

  80% {
    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)
      rotate3d(0, 1, 0, 0deg);
    animation-timing-function: ease-in;
  }

  to {
    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);
    animation-timing-function: ease-in;
  }
`,pr=Ne`
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`,ur=Ne`
  from {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
`,fr=Ne`
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
`,mr=Ne`
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
`;const hr=ze`
  backface-visibility: visible;
`,gr=e=>{const{direction:t,reverse:r=!1,...s}=e,a=(0,n.useMemo)((()=>function(e,t){switch(t){case"horizontal":return e?fr:pr;case"vertical":return e?mr:ur;default:return dr}}(r,t)),[t,r]);return Le(At,{css:hr,keyframes:a,...s})};var vr={};Je(vr,"Hinge",(()=>Sr));const yr=Ne`
  0% {
    animation-timing-function: ease-in-out;
  }

  20%,
  60% {
    transform: rotate3d(0, 0, 1, 80deg);
    animation-timing-function: ease-in-out;
  }

  40%,
  80% {
    transform: rotate3d(0, 0, 1, 60deg);
    animation-timing-function: ease-in-out;
    opacity: 1;
  }

  to {
    transform: translate3d(0, 700px, 0);
    opacity: 0;
  }
`,br=Ne`
  from {
    opacity: 0;
    transform: scale(0.1) rotate(30deg);
    transform-origin: center bottom;
  }

  50% {
    transform: rotate(-10deg);
  }

  70% {
    transform: rotate(3deg);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`,wr=Ne`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`,xr=Ne`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);
  }
`,Cr=ze`
  transform-origin: top left;
`,Sr=e=>Le(At,{css:Cr,keyframes:yr,...e});var Er={};Je(Er,"JackInTheBox",(()=>Tr));const Tr=e=>Le(At,{keyframes:br,...e});var kr={};Je(kr,"Roll",(()=>Or));const Or=e=>{const{reverse:t=!1,...r}=e,s=(0,n.useMemo)((()=>function(e){return e?xr:wr}(t)),[t]);return Le(At,{keyframes:s,...r})};var $r={};Je($r,"Rotate",(()=>Gr));const Pr=Ne`
  from {
    transform: rotate3d(0, 0, 1, -200deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`,Mr=Ne`
  from {
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`,_r=Ne`
  from {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`,Ar=Ne`
  from {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`,Lr=Ne`
  from {
    transform: rotate3d(0, 0, 1, -90deg);
    opacity: 0;
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
`,zr=Ne`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, 200deg);
    opacity: 0;
  }
`,Nr=Ne`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }
`,Ir=Ne`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }
`,jr=Ne`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }
`,Dr=Ne`
  from {
    opacity: 1;
  }

  to {
    transform: rotate3d(0, 0, 1, 90deg);
    opacity: 0;
  }
`;const Gr=e=>{const{direction:t,reverse:r=!1,...s}=e,[a,i]=(0,n.useMemo)((()=>function(e,t){switch(t){case"bottom-left":return e?[Nr,{transformOrigin:"left bottom"}]:[Mr,{transformOrigin:"left bottom"}];case"bottom-right":return e?[Ir,{transformOrigin:"right bottom"}]:[_r,{transformOrigin:"right bottom"}];case"top-left":return e?[jr,{transformOrigin:"left bottom"}]:[Ar,{transformOrigin:"left bottom"}];case"top-right":return e?[Dr,{transformOrigin:"right bottom"}]:[Lr,{transformOrigin:"right bottom"}];default:return e?[zr,{transformOrigin:"center"}]:[Pr,{transformOrigin:"center"}]}}(r,t)),[t,r]);return Le(At,{css:i,keyframes:a,...s})};var Br={};Je(Br,"Slide",(()=>Ur));const Vr=Ne`
  from {
    transform: translate3d(0, -100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Fr=Ne`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Rr=Ne`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Hr=Ne`
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`,Yr=Ne`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, 100%, 0);
  }
`,Wr=Ne`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(-100%, 0, 0);
  }
`,Xr=Ne`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(100%, 0, 0);
  }
`,qr=Ne`
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
  }
`;const Ur=e=>{const{direction:t,reverse:r=!1,...s}=e,a=(0,n.useMemo)((()=>function(e,t){switch(t){case"down":return e?Yr:Vr;case"right":return e?Xr:Rr;case"up":return e?qr:Hr;default:return e?Wr:Fr}}(r,t)),[t,r]);return Le(At,{keyframes:a,...s})};var Zr={};Je(Zr,"Zoom",(()=>ln));const Kr=Ne`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
`,Qr=Ne`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`,Jr=Ne`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`,en=Ne`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`,tn=Ne`
  from {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`,rn=Ne`
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
`,nn=Ne`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`,sn=Ne`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);
  }

  to {
    opacity: 0;
    transform: scale(0.1) translate3d(-2000px, 0, 0);
  }
`,an=Ne`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);
  }

  to {
    opacity: 0;
    transform: scale(0.1) translate3d(2000px, 0, 0);
  }
`,on=Ne`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  to {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;const ln=e=>{const{direction:t,reverse:r=!1,...s}=e,a=(0,n.useMemo)((()=>function(e,t){switch(t){case"down":return e?nn:Qr;case"left":return e?sn:Jr;case"right":return e?an:en;case"up":return e?on:tn;default:return e?rn:Kr}}(r,t)),[t,r]);return Le(At,{keyframes:a,...s})};Qe(et,tt),Qe(et,It),Qe(et,qt),Qe(et,cr),Qe(et,vr),Qe(et,Er),Qe(et,kr),Qe(et,$r),Qe(et,Br),Qe(et,Zr)},4415:function(e,t){"use strict";var r,n=Symbol.for("react.element"),s=Symbol.for("react.portal"),a=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),o=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),c=Symbol.for("react.context"),d=Symbol.for("react.server_context"),p=Symbol.for("react.forward_ref"),u=Symbol.for("react.suspense"),f=Symbol.for("react.suspense_list"),m=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),g=Symbol.for("react.offscreen");function v(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case a:case o:case i:case u:case f:return e;default:switch(e=e&&e.$$typeof){case d:case c:case p:case h:case m:case l:return e;default:return t}}case s:return t}}}r=Symbol.for("react.module.reference"),t.isFragment=function(e){return v(e)===a}},4954:function(e,t,r){"use strict";e.exports=r(4415)},9921:function(e,t){"use strict";var r="function"===typeof Symbol&&Symbol.for,n=r?Symbol.for("react.element"):60103,s=r?Symbol.for("react.portal"):60106,a=r?Symbol.for("react.fragment"):60107,i=r?Symbol.for("react.strict_mode"):60108,o=r?Symbol.for("react.profiler"):60114,l=r?Symbol.for("react.provider"):60109,c=r?Symbol.for("react.context"):60110,d=r?Symbol.for("react.async_mode"):60111,p=r?Symbol.for("react.concurrent_mode"):60111,u=r?Symbol.for("react.forward_ref"):60112,f=r?Symbol.for("react.suspense"):60113,m=r?Symbol.for("react.suspense_list"):60120,h=r?Symbol.for("react.memo"):60115,g=r?Symbol.for("react.lazy"):60116,v=r?Symbol.for("react.block"):60121,y=r?Symbol.for("react.fundamental"):60117,b=r?Symbol.for("react.responder"):60118,w=r?Symbol.for("react.scope"):60119;function x(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case n:switch(e=e.type){case d:case p:case a:case o:case i:case f:return e;default:switch(e=e&&e.$$typeof){case c:case u:case g:case h:case l:return e;default:return t}}case s:return t}}}function C(e){return x(e)===p}t.AsyncMode=d,t.ConcurrentMode=p,t.ContextConsumer=c,t.ContextProvider=l,t.Element=n,t.ForwardRef=u,t.Fragment=a,t.Lazy=g,t.Memo=h,t.Portal=s,t.Profiler=o,t.StrictMode=i,t.Suspense=f,t.isAsyncMode=function(e){return C(e)||x(e)===d},t.isConcurrentMode=C,t.isContextConsumer=function(e){return x(e)===c},t.isContextProvider=function(e){return x(e)===l},t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===n},t.isForwardRef=function(e){return x(e)===u},t.isFragment=function(e){return x(e)===a},t.isLazy=function(e){return x(e)===g},t.isMemo=function(e){return x(e)===h},t.isPortal=function(e){return x(e)===s},t.isProfiler=function(e){return x(e)===o},t.isStrictMode=function(e){return x(e)===i},t.isSuspense=function(e){return x(e)===f},t.isValidElementType=function(e){return"string"===typeof e||"function"===typeof e||e===a||e===p||e===o||e===i||e===f||e===m||"object"===typeof e&&null!==e&&(e.$$typeof===g||e.$$typeof===h||e.$$typeof===l||e.$$typeof===c||e.$$typeof===u||e.$$typeof===y||e.$$typeof===b||e.$$typeof===w||e.$$typeof===v)},t.typeOf=x},9864:function(e,t,r){"use strict";e.exports=r(9921)},29:function(e,t,r){"use strict";function n(e,t,r,n,s,a,i){try{var o=e[a](i),l=o.value}catch(c){return void r(c)}o.done?t(l):Promise.resolve(l).then(n,s)}function s(e){return function(){var t=this,r=arguments;return new Promise((function(s,a){var i=e.apply(t,r);function o(e){n(i,s,a,o,l,"next",e)}function l(e){n(i,s,a,o,l,"throw",e)}o(void 0)}))}}r.d(t,{Z:function(){return s}})},2777:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}r.d(t,{Z:function(){return n}})},2262:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}r.d(t,{Z:function(){return s}})},719:function(e,t,r){"use strict";r.d(t,{tq:function(){return C},o5:function(){return E},oc:function(){return w}});var n=r(7294),s=r(1911);function a(e){return"object"===typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function i(e,t){const r=["__proto__","constructor","prototype"];Object.keys(t).filter((e=>r.indexOf(e)<0)).forEach((r=>{"undefined"===typeof e[r]?e[r]=t[r]:a(t[r])&&a(e[r])&&Object.keys(t[r]).length>0?t[r].__swiper__?e[r]=t[r]:i(e[r],t[r]):e[r]=t[r]}))}function o(e={}){return e.navigation&&"undefined"===typeof e.navigation.nextEl&&"undefined"===typeof e.navigation.prevEl}function l(e={}){return e.pagination&&"undefined"===typeof e.pagination.el}function c(e={}){return e.scrollbar&&"undefined"===typeof e.scrollbar.el}function d(e=""){const t=e.split(" ").map((e=>e.trim())).filter((e=>!!e)),r=[];return t.forEach((e=>{r.indexOf(e)<0&&r.push(e)})),r.join(" ")}const p=["modules","init","_direction","touchEventsTarget","initialSlide","_speed","cssMode","updateOnWindowResize","resizeObserver","nested","focusableElements","_enabled","_width","_height","preventInteractionOnTransition","userAgent","url","_edgeSwipeDetection","_edgeSwipeThreshold","_freeMode","_autoHeight","setWrapperSize","virtualTranslate","_effect","breakpoints","_spaceBetween","_slidesPerView","maxBackfaceHiddenSlides","_grid","_slidesPerGroup","_slidesPerGroupSkip","_slidesPerGroupAuto","_centeredSlides","_centeredSlidesBounds","_slidesOffsetBefore","_slidesOffsetAfter","normalizeSlideIndex","_centerInsufficientSlides","_watchOverflow","roundLengths","touchRatio","touchAngle","simulateTouch","_shortSwipes","_longSwipes","longSwipesRatio","longSwipesMs","_followFinger","allowTouchMove","_threshold","touchMoveStopPropagation","touchStartPreventDefault","touchStartForcePreventDefault","touchReleaseOnEdges","uniqueNavElements","_resistance","_resistanceRatio","_watchSlidesProgress","_grabCursor","preventClicks","preventClicksPropagation","_slideToClickedSlide","_preloadImages","updateOnImagesReady","_loop","_loopAdditionalSlides","_loopedSlides","_loopedSlidesLimit","_loopFillGroupWithBlank","loopPreventsSlide","_rewind","_allowSlidePrev","_allowSlideNext","_swipeHandler","_noSwiping","noSwipingClass","noSwipingSelector","passiveListeners","containerModifierClass","slideClass","slideBlankClass","slideActiveClass","slideDuplicateActiveClass","slideVisibleClass","slideDuplicateClass","slideNextClass","slideDuplicateNextClass","slidePrevClass","slideDuplicatePrevClass","wrapperClass","runCallbacksOnInit","observer","observeParents","observeSlideChildren","a11y","_autoplay","_controller","coverflowEffect","cubeEffect","fadeEffect","flipEffect","creativeEffect","cardsEffect","hashNavigation","history","keyboard","lazy","mousewheel","_navigation","_pagination","parallax","_scrollbar","_thumbs","virtual","zoom"];const u=(e,t)=>{let r=t.slidesPerView;if(t.breakpoints){const e=s.ZP.prototype.getBreakpoint(t.breakpoints),n=e in t.breakpoints?t.breakpoints[e]:void 0;n&&n.slidesPerView&&(r=n.slidesPerView)}let n=Math.ceil(parseFloat(t.loopedSlides||r,10));return n+=t.loopAdditionalSlides,n>e.length&&t.loopedSlidesLimit&&(n=e.length),n};function f(e){return e.type&&e.type.displayName&&e.type.displayName.includes("SwiperSlide")}function m(e){const t=[];return n.Children.toArray(e).forEach((e=>{f(e)?t.push(e):e.props&&e.props.children&&m(e.props.children).forEach((e=>t.push(e)))})),t}function h(e){const t=[],r={"container-start":[],"container-end":[],"wrapper-start":[],"wrapper-end":[]};return n.Children.toArray(e).forEach((e=>{if(f(e))t.push(e);else if(e.props&&e.props.slot&&r[e.props.slot])r[e.props.slot].push(e);else if(e.props&&e.props.children){const n=m(e.props.children);n.length>0?n.forEach((e=>t.push(e))):r["container-end"].push(e)}else r["container-end"].push(e)})),{slides:t,slots:r}}function g({swiper:e,slides:t,passedParams:r,changedParams:n,nextEl:s,prevEl:o,scrollbarEl:l,paginationEl:c}){const d=n.filter((e=>"children"!==e&&"direction"!==e)),{params:p,pagination:u,navigation:f,scrollbar:m,virtual:h,thumbs:g}=e;let v,y,b,w,x;n.includes("thumbs")&&r.thumbs&&r.thumbs.swiper&&p.thumbs&&!p.thumbs.swiper&&(v=!0),n.includes("controller")&&r.controller&&r.controller.control&&p.controller&&!p.controller.control&&(y=!0),n.includes("pagination")&&r.pagination&&(r.pagination.el||c)&&(p.pagination||!1===p.pagination)&&u&&!u.el&&(b=!0),n.includes("scrollbar")&&r.scrollbar&&(r.scrollbar.el||l)&&(p.scrollbar||!1===p.scrollbar)&&m&&!m.el&&(w=!0),n.includes("navigation")&&r.navigation&&(r.navigation.prevEl||o)&&(r.navigation.nextEl||s)&&(p.navigation||!1===p.navigation)&&f&&!f.prevEl&&!f.nextEl&&(x=!0);if(d.forEach((t=>{if(a(p[t])&&a(r[t]))i(p[t],r[t]);else{const s=r[t];!0!==s&&!1!==s||"navigation"!==t&&"pagination"!==t&&"scrollbar"!==t?p[t]=r[t]:!1===s&&e[n=t]&&(e[n].destroy(),"navigation"===n?(p[n].prevEl=void 0,p[n].nextEl=void 0,e[n].prevEl=void 0,e[n].nextEl=void 0):(p[n].el=void 0,e[n].el=void 0))}var n})),d.includes("controller")&&!y&&e.controller&&e.controller.control&&p.controller&&p.controller.control&&(e.controller.control=p.controller.control),n.includes("children")&&t&&h&&p.virtual.enabled?(h.slides=t,h.update(!0)):n.includes("children")&&e.lazy&&e.params.lazy.enabled&&e.lazy.load(),v){g.init()&&g.update(!0)}y&&(e.controller.control=p.controller.control),b&&(c&&(p.pagination.el=c),u.init(),u.render(),u.update()),w&&(l&&(p.scrollbar.el=l),m.init(),m.updateSize(),m.setTranslate()),x&&(s&&(p.navigation.nextEl=s),o&&(p.navigation.prevEl=o),f.init(),f.update()),n.includes("allowSlideNext")&&(e.allowSlideNext=r.allowSlideNext),n.includes("allowSlidePrev")&&(e.allowSlidePrev=r.allowSlidePrev),n.includes("direction")&&e.changeDirection(r.direction,!1),e.update()}function v(e,t){return"undefined"===typeof window?(0,n.useEffect)(e,t):(0,n.useLayoutEffect)(e,t)}const y=(0,n.createContext)(null),b=(0,n.createContext)(null),w=()=>(0,n.useContext)(b);function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},x.apply(this,arguments)}const C=(0,n.forwardRef)((function(e,t){let{className:r,tag:f="div",wrapperTag:m="div",children:y,onSwiper:w,...C}=void 0===e?{}:e,S=!1;const[E,T]=(0,n.useState)("swiper"),[k,O]=(0,n.useState)(null),[$,P]=(0,n.useState)(!1),M=(0,n.useRef)(!1),_=(0,n.useRef)(null),A=(0,n.useRef)(null),L=(0,n.useRef)(null),z=(0,n.useRef)(null),N=(0,n.useRef)(null),I=(0,n.useRef)(null),j=(0,n.useRef)(null),D=(0,n.useRef)(null),{params:G,passedParams:B,rest:V,events:F}=function(e={},t=!0){const r={on:{}},n={},o={};i(r,s.ZP.defaults),i(r,s.ZP.extendedDefaults),r._emitClasses=!0,r.init=!1;const l={},c=p.map((e=>e.replace(/_/,""))),d=Object.assign({},e);return Object.keys(d).forEach((s=>{"undefined"!==typeof e[s]&&(c.indexOf(s)>=0?a(e[s])?(r[s]={},o[s]={},i(r[s],e[s]),i(o[s],e[s])):(r[s]=e[s],o[s]=e[s]):0===s.search(/on[A-Z]/)&&"function"===typeof e[s]?t?n[`${s[2].toLowerCase()}${s.substr(3)}`]=e[s]:r.on[`${s[2].toLowerCase()}${s.substr(3)}`]=e[s]:l[s]=e[s])})),["navigation","pagination","scrollbar"].forEach((e=>{!0===r[e]&&(r[e]={}),!1===r[e]&&delete r[e]})),{params:r,passedParams:o,rest:l,events:n}}(C),{slides:R,slots:H}=h(y),Y=()=>{P(!$)};Object.assign(G.on,{_containerClasses(e,t){T(t)}});const W=()=>{if(Object.assign(G.on,F),S=!0,A.current=new s.ZP(G),A.current.loopCreate=()=>{},A.current.loopDestroy=()=>{},G.loop&&(A.current.loopedSlides=u(R,G)),A.current.virtual&&A.current.params.virtual.enabled){A.current.virtual.slides=R;const e={cache:!1,slides:R,renderExternal:O,renderExternalUpdate:!1};i(A.current.params.virtual,e),i(A.current.originalParams.virtual,e)}};_.current||W(),A.current&&A.current.on("_beforeBreakpoint",Y);return(0,n.useEffect)((()=>()=>{A.current&&A.current.off("_beforeBreakpoint",Y)})),(0,n.useEffect)((()=>{!M.current&&A.current&&(A.current.emitSlidesClasses(),M.current=!0)})),v((()=>{if(t&&(t.current=_.current),_.current)return A.current.destroyed&&W(),function({el:e,nextEl:t,prevEl:r,paginationEl:n,scrollbarEl:s,swiper:a},i){o(i)&&t&&r&&(a.params.navigation.nextEl=t,a.originalParams.navigation.nextEl=t,a.params.navigation.prevEl=r,a.originalParams.navigation.prevEl=r),l(i)&&n&&(a.params.pagination.el=n,a.originalParams.pagination.el=n),c(i)&&s&&(a.params.scrollbar.el=s,a.originalParams.scrollbar.el=s),a.init(e)}({el:_.current,nextEl:N.current,prevEl:I.current,paginationEl:j.current,scrollbarEl:D.current,swiper:A.current},G),w&&w(A.current),()=>{A.current&&!A.current.destroyed&&A.current.destroy(!0,!1)}}),[]),v((()=>{!S&&F&&A.current&&Object.keys(F).forEach((e=>{A.current.on(e,F[e])}));const e=function(e,t,r,n,s){const i=[];if(!t)return i;const o=e=>{i.indexOf(e)<0&&i.push(e)};if(r&&n){const e=n.map(s),t=r.map(s);e.join("")!==t.join("")&&o("children"),n.length!==r.length&&o("children")}return p.filter((e=>"_"===e[0])).map((e=>e.replace(/_/,""))).forEach((r=>{if(r in e&&r in t)if(a(e[r])&&a(t[r])){const n=Object.keys(e[r]),s=Object.keys(t[r]);n.length!==s.length?o(r):(n.forEach((n=>{e[r][n]!==t[r][n]&&o(r)})),s.forEach((n=>{e[r][n]!==t[r][n]&&o(r)})))}else e[r]!==t[r]&&o(r)})),i}(B,L.current,R,z.current,(e=>e.key));return L.current=B,z.current=R,e.length&&A.current&&!A.current.destroyed&&g({swiper:A.current,slides:R,passedParams:B,changedParams:e,nextEl:N.current,prevEl:I.current,scrollbarEl:D.current,paginationEl:j.current}),()=>{F&&A.current&&Object.keys(F).forEach((e=>{A.current.off(e,F[e])}))}})),v((()=>{var e;!(e=A.current)||e.destroyed||!e.params.virtual||e.params.virtual&&!e.params.virtual.enabled||(e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.lazy&&e.params.lazy.enabled&&e.lazy.load(),e.parallax&&e.params.parallax&&e.params.parallax.enabled&&e.parallax.setTranslate())}),[k]),n.createElement(f,x({ref:_,className:d(`${E}${r?` ${r}`:""}`)},V),n.createElement(b.Provider,{value:A.current},H["container-start"],n.createElement(m,{className:"swiper-wrapper"},H["wrapper-start"],G.virtual?function(e,t,r){if(!r)return null;const s=e.isHorizontal()?{[e.rtlTranslate?"right":"left"]:`${r.offset}px`}:{top:`${r.offset}px`};return t.filter(((e,t)=>t>=r.from&&t<=r.to)).map((t=>n.cloneElement(t,{swiper:e,style:s})))}(A.current,R,k):!G.loop||A.current&&A.current.destroyed?R.map((e=>n.cloneElement(e,{swiper:A.current}))):function(e,t,r){const s=t.map(((t,r)=>n.cloneElement(t,{swiper:e,"data-swiper-slide-index":r})));function a(e,t,s){return n.cloneElement(e,{key:`${e.key}-duplicate-${t}-${s}`,className:`${e.props.className||""} ${r.slideDuplicateClass}`})}if(r.loopFillGroupWithBlank){const e=r.slidesPerGroup-s.length%r.slidesPerGroup;if(e!==r.slidesPerGroup)for(let t=0;t<e;t+=1){const e=n.createElement("div",{className:`${r.slideClass} ${r.slideBlankClass}`});s.push(e)}}"auto"!==r.slidesPerView||r.loopedSlides||(r.loopedSlides=s.length);const i=u(s,r),o=[],l=[];for(let n=0;n<i;n+=1){const e=n-Math.floor(n/s.length)*s.length;l.push(a(s[e],n,"append")),o.unshift(a(s[s.length-e-1],n,"prepend"))}return e&&(e.loopedSlides=i),[...o,...s,...l]}(A.current,R,G),H["wrapper-end"]),o(G)&&n.createElement(n.Fragment,null,n.createElement("div",{ref:I,className:"swiper-button-prev"}),n.createElement("div",{ref:N,className:"swiper-button-next"})),c(G)&&n.createElement("div",{ref:D,className:"swiper-scrollbar"}),l(G)&&n.createElement("div",{ref:j,className:"swiper-pagination"}),H["container-end"]))}));function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},S.apply(this,arguments)}C.displayName="Swiper";const E=(0,n.forwardRef)((function(e,t){let{tag:r="div",children:s,className:a="",swiper:i,zoom:o,virtualIndex:l,...c}=void 0===e?{}:e;const p=(0,n.useRef)(null),[u,f]=(0,n.useState)("swiper-slide");function m(e,t,r){t===p.current&&f(r)}v((()=>{if(t&&(t.current=p.current),p.current&&i){if(!i.destroyed)return i.on("_slideClass",m),()=>{i&&i.off("_slideClass",m)};"swiper-slide"!==u&&f("swiper-slide")}})),v((()=>{i&&p.current&&!i.destroyed&&f(i.getSlideClasses(p.current))}),[i]);const h={isActive:u.indexOf("swiper-slide-active")>=0||u.indexOf("swiper-slide-duplicate-active")>=0,isVisible:u.indexOf("swiper-slide-visible")>=0,isDuplicate:u.indexOf("swiper-slide-duplicate")>=0,isPrev:u.indexOf("swiper-slide-prev")>=0||u.indexOf("swiper-slide-duplicate-prev")>=0,isNext:u.indexOf("swiper-slide-next")>=0||u.indexOf("swiper-slide-duplicate-next")>=0},g=()=>"function"===typeof s?s(h):s;return n.createElement(r,S({ref:p,className:d(`${u}${a?` ${a}`:""}`),"data-swiper-slide-index":l},c),n.createElement(y.Provider,{value:h},o?n.createElement("div",{className:"swiper-zoom-container","data-swiper-zoom":"number"===typeof o?o:void 0},g()):g()))}));E.displayName="SwiperSlide"},1911:function(e,t,r){"use strict";function n(e){return null!==e&&"object"===typeof e&&"constructor"in e&&e.constructor===Object}function s(e={},t={}){Object.keys(t).forEach((r=>{"undefined"===typeof e[r]?e[r]=t[r]:n(t[r])&&n(e[r])&&Object.keys(t[r]).length>0&&s(e[r],t[r])}))}r.d(t,{Qr:function(){return ae},W_:function(){return re},tl:function(){return se},ZP:function(){return ee}});const a={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function i(){const e="undefined"!==typeof document?document:{};return s(e,a),e}const o={document:a,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"===typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!==typeof setTimeout&&clearTimeout(e)}};function l(){const e="undefined"!==typeof window?window:{};return s(e,o),e}class c extends Array{constructor(e){"number"===typeof e?super(e):(super(...e||[]),function(e){const t=e.__proto__;Object.defineProperty(e,"__proto__",{get:()=>t,set(e){t.__proto__=e}})}(this))}}function d(e=[]){const t=[];return e.forEach((e=>{Array.isArray(e)?t.push(...d(e)):t.push(e)})),t}function p(e,t){return Array.prototype.filter.call(e,t)}function u(e,t){const r=l(),n=i();let s=[];if(!t&&e instanceof c)return e;if(!e)return new c(s);if("string"===typeof e){const r=e.trim();if(r.indexOf("<")>=0&&r.indexOf(">")>=0){let e="div";0===r.indexOf("<li")&&(e="ul"),0===r.indexOf("<tr")&&(e="tbody"),0!==r.indexOf("<td")&&0!==r.indexOf("<th")||(e="tr"),0===r.indexOf("<tbody")&&(e="table"),0===r.indexOf("<option")&&(e="select");const t=n.createElement(e);t.innerHTML=r;for(let r=0;r<t.childNodes.length;r+=1)s.push(t.childNodes[r])}else s=function(e,t){if("string"!==typeof e)return[e];const r=[],n=t.querySelectorAll(e);for(let s=0;s<n.length;s+=1)r.push(n[s]);return r}(e.trim(),t||n)}else if(e.nodeType||e===r||e===n)s.push(e);else if(Array.isArray(e)){if(e instanceof c)return e;s=e}return new c(function(e){const t=[];for(let r=0;r<e.length;r+=1)-1===t.indexOf(e[r])&&t.push(e[r]);return t}(s))}u.fn=c.prototype;const f="resize scroll".split(" ");function m(e){return function(...t){if("undefined"===typeof t[0]){for(let t=0;t<this.length;t+=1)f.indexOf(e)<0&&(e in this[t]?this[t][e]():u(this[t]).trigger(e));return this}return this.on(e,...t)}}m("click"),m("blur"),m("focus"),m("focusin"),m("focusout"),m("keyup"),m("keydown"),m("keypress"),m("submit"),m("change"),m("mousedown"),m("mousemove"),m("mouseup"),m("mouseenter"),m("mouseleave"),m("mouseout"),m("mouseover"),m("touchstart"),m("touchend"),m("touchmove"),m("resize"),m("scroll");const h={addClass:function(...e){const t=d(e.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.add(...t)})),this},removeClass:function(...e){const t=d(e.map((e=>e.split(" "))));return this.forEach((e=>{e.classList.remove(...t)})),this},hasClass:function(...e){const t=d(e.map((e=>e.split(" "))));return p(this,(e=>t.filter((t=>e.classList.contains(t))).length>0)).length>0},toggleClass:function(...e){const t=d(e.map((e=>e.split(" "))));this.forEach((e=>{t.forEach((t=>{e.classList.toggle(t)}))}))},attr:function(e,t){if(1===arguments.length&&"string"===typeof e)return this[0]?this[0].getAttribute(e):void 0;for(let r=0;r<this.length;r+=1)if(2===arguments.length)this[r].setAttribute(e,t);else for(const t in e)this[r][t]=e[t],this[r].setAttribute(t,e[t]);return this},removeAttr:function(e){for(let t=0;t<this.length;t+=1)this[t].removeAttribute(e);return this},transform:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transform=e;return this},transition:function(e){for(let t=0;t<this.length;t+=1)this[t].style.transitionDuration="string"!==typeof e?`${e}ms`:e;return this},on:function(...e){let[t,r,n,s]=e;function a(e){const t=e.target;if(!t)return;const s=e.target.dom7EventData||[];if(s.indexOf(e)<0&&s.unshift(e),u(t).is(r))n.apply(t,s);else{const e=u(t).parents();for(let t=0;t<e.length;t+=1)u(e[t]).is(r)&&n.apply(e[t],s)}}function i(e){const t=e&&e.target&&e.target.dom7EventData||[];t.indexOf(e)<0&&t.unshift(e),n.apply(this,t)}"function"===typeof e[1]&&([t,n,s]=e,r=void 0),s||(s=!1);const o=t.split(" ");let l;for(let c=0;c<this.length;c+=1){const e=this[c];if(r)for(l=0;l<o.length;l+=1){const t=o[l];e.dom7LiveListeners||(e.dom7LiveListeners={}),e.dom7LiveListeners[t]||(e.dom7LiveListeners[t]=[]),e.dom7LiveListeners[t].push({listener:n,proxyListener:a}),e.addEventListener(t,a,s)}else for(l=0;l<o.length;l+=1){const t=o[l];e.dom7Listeners||(e.dom7Listeners={}),e.dom7Listeners[t]||(e.dom7Listeners[t]=[]),e.dom7Listeners[t].push({listener:n,proxyListener:i}),e.addEventListener(t,i,s)}}return this},off:function(...e){let[t,r,n,s]=e;"function"===typeof e[1]&&([t,n,s]=e,r=void 0),s||(s=!1);const a=t.split(" ");for(let i=0;i<a.length;i+=1){const e=a[i];for(let t=0;t<this.length;t+=1){const a=this[t];let i;if(!r&&a.dom7Listeners?i=a.dom7Listeners[e]:r&&a.dom7LiveListeners&&(i=a.dom7LiveListeners[e]),i&&i.length)for(let t=i.length-1;t>=0;t-=1){const r=i[t];n&&r.listener===n||n&&r.listener&&r.listener.dom7proxy&&r.listener.dom7proxy===n?(a.removeEventListener(e,r.proxyListener,s),i.splice(t,1)):n||(a.removeEventListener(e,r.proxyListener,s),i.splice(t,1))}}}return this},trigger:function(...e){const t=l(),r=e[0].split(" "),n=e[1];for(let s=0;s<r.length;s+=1){const a=r[s];for(let r=0;r<this.length;r+=1){const s=this[r];if(t.CustomEvent){const r=new t.CustomEvent(a,{detail:n,bubbles:!0,cancelable:!0});s.dom7EventData=e.filter(((e,t)=>t>0)),s.dispatchEvent(r),s.dom7EventData=[],delete s.dom7EventData}}}return this},transitionEnd:function(e){const t=this;return e&&t.on("transitionend",(function r(n){n.target===this&&(e.call(this,n),t.off("transitionend",r))})),this},outerWidth:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetWidth+parseFloat(e.getPropertyValue("margin-right"))+parseFloat(e.getPropertyValue("margin-left"))}return this[0].offsetWidth}return null},outerHeight:function(e){if(this.length>0){if(e){const e=this.styles();return this[0].offsetHeight+parseFloat(e.getPropertyValue("margin-top"))+parseFloat(e.getPropertyValue("margin-bottom"))}return this[0].offsetHeight}return null},styles:function(){const e=l();return this[0]?e.getComputedStyle(this[0],null):{}},offset:function(){if(this.length>0){const e=l(),t=i(),r=this[0],n=r.getBoundingClientRect(),s=t.body,a=r.clientTop||s.clientTop||0,o=r.clientLeft||s.clientLeft||0,c=r===e?e.scrollY:r.scrollTop,d=r===e?e.scrollX:r.scrollLeft;return{top:n.top+c-a,left:n.left+d-o}}return null},css:function(e,t){const r=l();let n;if(1===arguments.length){if("string"!==typeof e){for(n=0;n<this.length;n+=1)for(const t in e)this[n].style[t]=e[t];return this}if(this[0])return r.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"===typeof e){for(n=0;n<this.length;n+=1)this[n].style[e]=t;return this}return this},each:function(e){return e?(this.forEach(((t,r)=>{e.apply(t,[t,r])})),this):this},html:function(e){if("undefined"===typeof e)return this[0]?this[0].innerHTML:null;for(let t=0;t<this.length;t+=1)this[t].innerHTML=e;return this},text:function(e){if("undefined"===typeof e)return this[0]?this[0].textContent.trim():null;for(let t=0;t<this.length;t+=1)this[t].textContent=e;return this},is:function(e){const t=l(),r=i(),n=this[0];let s,a;if(!n||"undefined"===typeof e)return!1;if("string"===typeof e){if(n.matches)return n.matches(e);if(n.webkitMatchesSelector)return n.webkitMatchesSelector(e);if(n.msMatchesSelector)return n.msMatchesSelector(e);for(s=u(e),a=0;a<s.length;a+=1)if(s[a]===n)return!0;return!1}if(e===r)return n===r;if(e===t)return n===t;if(e.nodeType||e instanceof c){for(s=e.nodeType?[e]:e,a=0;a<s.length;a+=1)if(s[a]===n)return!0;return!1}return!1},index:function(){let e,t=this[0];if(t){for(e=0;null!==(t=t.previousSibling);)1===t.nodeType&&(e+=1);return e}},eq:function(e){if("undefined"===typeof e)return this;const t=this.length;if(e>t-1)return u([]);if(e<0){const r=t+e;return u(r<0?[]:[this[r]])}return u([this[e]])},append:function(...e){let t;const r=i();for(let n=0;n<e.length;n+=1){t=e[n];for(let e=0;e<this.length;e+=1)if("string"===typeof t){const n=r.createElement("div");for(n.innerHTML=t;n.firstChild;)this[e].appendChild(n.firstChild)}else if(t instanceof c)for(let r=0;r<t.length;r+=1)this[e].appendChild(t[r]);else this[e].appendChild(t)}return this},prepend:function(e){const t=i();let r,n;for(r=0;r<this.length;r+=1)if("string"===typeof e){const s=t.createElement("div");for(s.innerHTML=e,n=s.childNodes.length-1;n>=0;n-=1)this[r].insertBefore(s.childNodes[n],this[r].childNodes[0])}else if(e instanceof c)for(n=0;n<e.length;n+=1)this[r].insertBefore(e[n],this[r].childNodes[0]);else this[r].insertBefore(e,this[r].childNodes[0]);return this},next:function(e){return this.length>0?e?this[0].nextElementSibling&&u(this[0].nextElementSibling).is(e)?u([this[0].nextElementSibling]):u([]):this[0].nextElementSibling?u([this[0].nextElementSibling]):u([]):u([])},nextAll:function(e){const t=[];let r=this[0];if(!r)return u([]);for(;r.nextElementSibling;){const n=r.nextElementSibling;e?u(n).is(e)&&t.push(n):t.push(n),r=n}return u(t)},prev:function(e){if(this.length>0){const t=this[0];return e?t.previousElementSibling&&u(t.previousElementSibling).is(e)?u([t.previousElementSibling]):u([]):t.previousElementSibling?u([t.previousElementSibling]):u([])}return u([])},prevAll:function(e){const t=[];let r=this[0];if(!r)return u([]);for(;r.previousElementSibling;){const n=r.previousElementSibling;e?u(n).is(e)&&t.push(n):t.push(n),r=n}return u(t)},parent:function(e){const t=[];for(let r=0;r<this.length;r+=1)null!==this[r].parentNode&&(e?u(this[r].parentNode).is(e)&&t.push(this[r].parentNode):t.push(this[r].parentNode));return u(t)},parents:function(e){const t=[];for(let r=0;r<this.length;r+=1){let n=this[r].parentNode;for(;n;)e?u(n).is(e)&&t.push(n):t.push(n),n=n.parentNode}return u(t)},closest:function(e){let t=this;return"undefined"===typeof e?u([]):(t.is(e)||(t=t.parents(e).eq(0)),t)},find:function(e){const t=[];for(let r=0;r<this.length;r+=1){const n=this[r].querySelectorAll(e);for(let e=0;e<n.length;e+=1)t.push(n[e])}return u(t)},children:function(e){const t=[];for(let r=0;r<this.length;r+=1){const n=this[r].children;for(let r=0;r<n.length;r+=1)e&&!u(n[r]).is(e)||t.push(n[r])}return u(t)},filter:function(e){return u(p(this,e))},remove:function(){for(let e=0;e<this.length;e+=1)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this}};Object.keys(h).forEach((e=>{Object.defineProperty(u.fn,e,{value:h[e],writable:!0})}));var g=u;function v(e,t=0){return setTimeout(e,t)}function y(){return Date.now()}function b(e,t="x"){const r=l();let n,s,a;const i=function(e){const t=l();let r;return t.getComputedStyle&&(r=t.getComputedStyle(e,null)),!r&&e.currentStyle&&(r=e.currentStyle),r||(r=e.style),r}(e);return r.WebKitCSSMatrix?(s=i.transform||i.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map((e=>e.replace(",","."))).join(", ")),a=new r.WebKitCSSMatrix("none"===s?"":s)):(a=i.MozTransform||i.OTransform||i.MsTransform||i.msTransform||i.transform||i.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),n=a.toString().split(",")),"x"===t&&(s=r.WebKitCSSMatrix?a.m41:16===n.length?parseFloat(n[12]):parseFloat(n[4])),"y"===t&&(s=r.WebKitCSSMatrix?a.m42:16===n.length?parseFloat(n[13]):parseFloat(n[5])),s||0}function w(e){return"object"===typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function x(...e){const t=Object(e[0]),r=["__proto__","constructor","prototype"];for(let s=1;s<e.length;s+=1){const a=e[s];if(void 0!==a&&null!==a&&(n=a,!("undefined"!==typeof window&&"undefined"!==typeof window.HTMLElement?n instanceof HTMLElement:n&&(1===n.nodeType||11===n.nodeType)))){const e=Object.keys(Object(a)).filter((e=>r.indexOf(e)<0));for(let r=0,n=e.length;r<n;r+=1){const n=e[r],s=Object.getOwnPropertyDescriptor(a,n);void 0!==s&&s.enumerable&&(w(t[n])&&w(a[n])?a[n].__swiper__?t[n]=a[n]:x(t[n],a[n]):!w(t[n])&&w(a[n])?(t[n]={},a[n].__swiper__?t[n]=a[n]:x(t[n],a[n])):t[n]=a[n])}}}var n;return t}function C(e,t,r){e.style.setProperty(t,r)}function S({swiper:e,targetPosition:t,side:r}){const n=l(),s=-e.translate;let a,i=null;const o=e.params.speed;e.wrapperEl.style.scrollSnapType="none",n.cancelAnimationFrame(e.cssModeFrameID);const c=t>s?"next":"prev",d=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,p=()=>{a=(new Date).getTime(),null===i&&(i=a);const l=Math.max(Math.min((a-i)/o,1),0),c=.5-Math.cos(l*Math.PI)/2;let u=s+c*(t-s);if(d(u,t)&&(u=t),e.wrapperEl.scrollTo({[r]:u}),d(u,t))return e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.scrollSnapType="",setTimeout((()=>{e.wrapperEl.style.overflow="",e.wrapperEl.scrollTo({[r]:u})})),void n.cancelAnimationFrame(e.cssModeFrameID);e.cssModeFrameID=n.requestAnimationFrame(p)};p()}let E,T,k;function O(){return E||(E=function(){const e=l(),t=i();return{smoothScroll:t.documentElement&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch),passiveListener:function(){let t=!1;try{const r=Object.defineProperty({},"passive",{get(){t=!0}});e.addEventListener("testPassiveListener",null,r)}catch(r){}return t}(),gestures:"ongesturestart"in e}}()),E}function $(e={}){return T||(T=function({userAgent:e}={}){const t=O(),r=l(),n=r.navigator.platform,s=e||r.navigator.userAgent,a={ios:!1,android:!1},i=r.screen.width,o=r.screen.height,c=s.match(/(Android);?[\s\/]+([\d.]+)?/);let d=s.match(/(iPad).*OS\s([\d_]+)/);const p=s.match(/(iPod)(.*OS\s([\d_]+))?/),u=!d&&s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),f="Win32"===n;let m="MacIntel"===n;return!d&&m&&t.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${i}x${o}`)>=0&&(d=s.match(/(Version)\/([\d.]+)/),d||(d=[0,1,"13_0_0"]),m=!1),c&&!f&&(a.os="android",a.android=!0),(d||u||p)&&(a.os="ios",a.ios=!0),a}(e)),T}function P(){return k||(k=function(){const e=l();return{isSafari:function(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}(),isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),k}var M={on(e,t,r){const n=this;if(!n.eventsListeners||n.destroyed)return n;if("function"!==typeof t)return n;const s=r?"unshift":"push";return e.split(" ").forEach((e=>{n.eventsListeners[e]||(n.eventsListeners[e]=[]),n.eventsListeners[e][s](t)})),n},once(e,t,r){const n=this;if(!n.eventsListeners||n.destroyed)return n;if("function"!==typeof t)return n;function s(...r){n.off(e,s),s.__emitterProxy&&delete s.__emitterProxy,t.apply(n,r)}return s.__emitterProxy=t,n.on(e,s,r)},onAny(e,t){const r=this;if(!r.eventsListeners||r.destroyed)return r;if("function"!==typeof e)return r;const n=t?"unshift":"push";return r.eventsAnyListeners.indexOf(e)<0&&r.eventsAnyListeners[n](e),r},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const r=t.eventsAnyListeners.indexOf(e);return r>=0&&t.eventsAnyListeners.splice(r,1),t},off(e,t){const r=this;return!r.eventsListeners||r.destroyed?r:r.eventsListeners?(e.split(" ").forEach((e=>{"undefined"===typeof t?r.eventsListeners[e]=[]:r.eventsListeners[e]&&r.eventsListeners[e].forEach(((n,s)=>{(n===t||n.__emitterProxy&&n.__emitterProxy===t)&&r.eventsListeners[e].splice(s,1)}))})),r):r},emit(...e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsListeners)return t;let r,n,s;"string"===typeof e[0]||Array.isArray(e[0])?(r=e[0],n=e.slice(1,e.length),s=t):(r=e[0].events,n=e[0].data,s=e[0].context||t),n.unshift(s);return(Array.isArray(r)?r:r.split(" ")).forEach((e=>{t.eventsAnyListeners&&t.eventsAnyListeners.length&&t.eventsAnyListeners.forEach((t=>{t.apply(s,[e,...n])})),t.eventsListeners&&t.eventsListeners[e]&&t.eventsListeners[e].forEach((e=>{e.apply(s,n)}))})),t}};var _={updateSize:function(){const e=this;let t,r;const n=e.$el;t="undefined"!==typeof e.params.width&&null!==e.params.width?e.params.width:n[0].clientWidth,r="undefined"!==typeof e.params.height&&null!==e.params.height?e.params.height:n[0].clientHeight,0===t&&e.isHorizontal()||0===r&&e.isVertical()||(t=t-parseInt(n.css("padding-left")||0,10)-parseInt(n.css("padding-right")||0,10),r=r-parseInt(n.css("padding-top")||0,10)-parseInt(n.css("padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(r)&&(r=0),Object.assign(e,{width:t,height:r,size:e.isHorizontal()?t:r}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function r(e,r){return parseFloat(e.getPropertyValue(t(r))||0)}const n=e.params,{$wrapperEl:s,size:a,rtlTranslate:i,wrongRTL:o}=e,l=e.virtual&&n.virtual.enabled,c=l?e.virtual.slides.length:e.slides.length,d=s.children(`.${e.params.slideClass}`),p=l?e.virtual.slides.length:d.length;let u=[];const f=[],m=[];let h=n.slidesOffsetBefore;"function"===typeof h&&(h=n.slidesOffsetBefore.call(e));let g=n.slidesOffsetAfter;"function"===typeof g&&(g=n.slidesOffsetAfter.call(e));const v=e.snapGrid.length,y=e.slidesGrid.length;let b=n.spaceBetween,w=-h,x=0,S=0;if("undefined"===typeof a)return;"string"===typeof b&&b.indexOf("%")>=0&&(b=parseFloat(b.replace("%",""))/100*a),e.virtualSize=-b,i?d.css({marginLeft:"",marginBottom:"",marginTop:""}):d.css({marginRight:"",marginBottom:"",marginTop:""}),n.centeredSlides&&n.cssMode&&(C(e.wrapperEl,"--swiper-centered-offset-before",""),C(e.wrapperEl,"--swiper-centered-offset-after",""));const E=n.grid&&n.grid.rows>1&&e.grid;let T;E&&e.grid.initSlides(p);const k="auto"===n.slidesPerView&&n.breakpoints&&Object.keys(n.breakpoints).filter((e=>"undefined"!==typeof n.breakpoints[e].slidesPerView)).length>0;for(let C=0;C<p;C+=1){T=0;const s=d.eq(C);if(E&&e.grid.updateSlide(C,s,p,t),"none"!==s.css("display")){if("auto"===n.slidesPerView){k&&(d[C].style[t("width")]="");const a=getComputedStyle(s[0]),i=s[0].style.transform,o=s[0].style.webkitTransform;if(i&&(s[0].style.transform="none"),o&&(s[0].style.webkitTransform="none"),n.roundLengths)T=e.isHorizontal()?s.outerWidth(!0):s.outerHeight(!0);else{const e=r(a,"width"),t=r(a,"padding-left"),n=r(a,"padding-right"),i=r(a,"margin-left"),o=r(a,"margin-right"),l=a.getPropertyValue("box-sizing");if(l&&"border-box"===l)T=e+i+o;else{const{clientWidth:r,offsetWidth:a}=s[0];T=e+t+n+i+o+(a-r)}}i&&(s[0].style.transform=i),o&&(s[0].style.webkitTransform=o),n.roundLengths&&(T=Math.floor(T))}else T=(a-(n.slidesPerView-1)*b)/n.slidesPerView,n.roundLengths&&(T=Math.floor(T)),d[C]&&(d[C].style[t("width")]=`${T}px`);d[C]&&(d[C].swiperSlideSize=T),m.push(T),n.centeredSlides?(w=w+T/2+x/2+b,0===x&&0!==C&&(w=w-a/2-b),0===C&&(w=w-a/2-b),Math.abs(w)<.001&&(w=0),n.roundLengths&&(w=Math.floor(w)),S%n.slidesPerGroup===0&&u.push(w),f.push(w)):(n.roundLengths&&(w=Math.floor(w)),(S-Math.min(e.params.slidesPerGroupSkip,S))%e.params.slidesPerGroup===0&&u.push(w),f.push(w),w=w+T+b),e.virtualSize+=T+b,x=T,S+=1}}if(e.virtualSize=Math.max(e.virtualSize,a)+g,i&&o&&("slide"===n.effect||"coverflow"===n.effect)&&s.css({width:`${e.virtualSize+n.spaceBetween}px`}),n.setWrapperSize&&s.css({[t("width")]:`${e.virtualSize+n.spaceBetween}px`}),E&&e.grid.updateWrapperSize(T,u,t),!n.centeredSlides){const t=[];for(let r=0;r<u.length;r+=1){let s=u[r];n.roundLengths&&(s=Math.floor(s)),u[r]<=e.virtualSize-a&&t.push(s)}u=t,Math.floor(e.virtualSize-a)-Math.floor(u[u.length-1])>1&&u.push(e.virtualSize-a)}if(0===u.length&&(u=[0]),0!==n.spaceBetween){const r=e.isHorizontal()&&i?"marginLeft":t("marginRight");d.filter(((e,t)=>!n.cssMode||t!==d.length-1)).css({[r]:`${b}px`})}if(n.centeredSlides&&n.centeredSlidesBounds){let e=0;m.forEach((t=>{e+=t+(n.spaceBetween?n.spaceBetween:0)})),e-=n.spaceBetween;const t=e-a;u=u.map((e=>e<0?-h:e>t?t+g:e))}if(n.centerInsufficientSlides){let e=0;if(m.forEach((t=>{e+=t+(n.spaceBetween?n.spaceBetween:0)})),e-=n.spaceBetween,e<a){const t=(a-e)/2;u.forEach(((e,r)=>{u[r]=e-t})),f.forEach(((e,r)=>{f[r]=e+t}))}}if(Object.assign(e,{slides:d,snapGrid:u,slidesGrid:f,slidesSizesGrid:m}),n.centeredSlides&&n.cssMode&&!n.centeredSlidesBounds){C(e.wrapperEl,"--swiper-centered-offset-before",-u[0]+"px"),C(e.wrapperEl,"--swiper-centered-offset-after",e.size/2-m[m.length-1]/2+"px");const t=-e.snapGrid[0],r=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+r))}if(p!==c&&e.emit("slidesLengthChange"),u.length!==v&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),f.length!==y&&e.emit("slidesGridLengthChange"),n.watchSlidesProgress&&e.updateSlidesOffset(),!l&&!n.cssMode&&("slide"===n.effect||"fade"===n.effect)){const t=`${n.containerModifierClass}backface-hidden`,r=e.$el.hasClass(t);p<=n.maxBackfaceHiddenSlides?r||e.$el.addClass(t):r&&e.$el.removeClass(t)}},updateAutoHeight:function(e){const t=this,r=[],n=t.virtual&&t.params.virtual.enabled;let s,a=0;"number"===typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const i=e=>n?t.slides.filter((t=>parseInt(t.getAttribute("data-swiper-slide-index"),10)===e))[0]:t.slides.eq(e)[0];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||g([])).each((e=>{r.push(e)}));else for(s=0;s<Math.ceil(t.params.slidesPerView);s+=1){const e=t.activeIndex+s;if(e>t.slides.length&&!n)break;r.push(i(e))}else r.push(i(t.activeIndex));for(s=0;s<r.length;s+=1)if("undefined"!==typeof r[s]){const e=r[s].offsetHeight;a=e>a?e:a}(a||0===a)&&t.$wrapperEl.css("height",`${a}px`)},updateSlidesOffset:function(){const e=this,t=e.slides;for(let r=0;r<t.length;r+=1)t[r].swiperSlideOffset=e.isHorizontal()?t[r].offsetLeft:t[r].offsetTop},updateSlidesProgress:function(e=this&&this.translate||0){const t=this,r=t.params,{slides:n,rtlTranslate:s,snapGrid:a}=t;if(0===n.length)return;"undefined"===typeof n[0].swiperSlideOffset&&t.updateSlidesOffset();let i=-e;s&&(i=e),n.removeClass(r.slideVisibleClass),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(let o=0;o<n.length;o+=1){const e=n[o];let l=e.swiperSlideOffset;r.cssMode&&r.centeredSlides&&(l-=n[0].swiperSlideOffset);const c=(i+(r.centeredSlides?t.minTranslate():0)-l)/(e.swiperSlideSize+r.spaceBetween),d=(i-a[0]+(r.centeredSlides?t.minTranslate():0)-l)/(e.swiperSlideSize+r.spaceBetween),p=-(i-l),u=p+t.slidesSizesGrid[o];(p>=0&&p<t.size-1||u>1&&u<=t.size||p<=0&&u>=t.size)&&(t.visibleSlides.push(e),t.visibleSlidesIndexes.push(o),n.eq(o).addClass(r.slideVisibleClass)),e.progress=s?-c:c,e.originalProgress=s?-d:d}t.visibleSlides=g(t.visibleSlides)},updateProgress:function(e){const t=this;if("undefined"===typeof e){const r=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*r||0}const r=t.params,n=t.maxTranslate()-t.minTranslate();let{progress:s,isBeginning:a,isEnd:i}=t;const o=a,l=i;0===n?(s=0,a=!0,i=!0):(s=(e-t.minTranslate())/n,a=s<=0,i=s>=1),Object.assign(t,{progress:s,isBeginning:a,isEnd:i}),(r.watchSlidesProgress||r.centeredSlides&&r.autoHeight)&&t.updateSlidesProgress(e),a&&!o&&t.emit("reachBeginning toEdge"),i&&!l&&t.emit("reachEnd toEdge"),(o&&!a||l&&!i)&&t.emit("fromEdge"),t.emit("progress",s)},updateSlidesClasses:function(){const e=this,{slides:t,params:r,$wrapperEl:n,activeIndex:s,realIndex:a}=e,i=e.virtual&&r.virtual.enabled;let o;t.removeClass(`${r.slideActiveClass} ${r.slideNextClass} ${r.slidePrevClass} ${r.slideDuplicateActiveClass} ${r.slideDuplicateNextClass} ${r.slideDuplicatePrevClass}`),o=i?e.$wrapperEl.find(`.${r.slideClass}[data-swiper-slide-index="${s}"]`):t.eq(s),o.addClass(r.slideActiveClass),r.loop&&(o.hasClass(r.slideDuplicateClass)?n.children(`.${r.slideClass}:not(.${r.slideDuplicateClass})[data-swiper-slide-index="${a}"]`).addClass(r.slideDuplicateActiveClass):n.children(`.${r.slideClass}.${r.slideDuplicateClass}[data-swiper-slide-index="${a}"]`).addClass(r.slideDuplicateActiveClass));let l=o.nextAll(`.${r.slideClass}`).eq(0).addClass(r.slideNextClass);r.loop&&0===l.length&&(l=t.eq(0),l.addClass(r.slideNextClass));let c=o.prevAll(`.${r.slideClass}`).eq(0).addClass(r.slidePrevClass);r.loop&&0===c.length&&(c=t.eq(-1),c.addClass(r.slidePrevClass)),r.loop&&(l.hasClass(r.slideDuplicateClass)?n.children(`.${r.slideClass}:not(.${r.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(r.slideDuplicateNextClass):n.children(`.${r.slideClass}.${r.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(r.slideDuplicateNextClass),c.hasClass(r.slideDuplicateClass)?n.children(`.${r.slideClass}:not(.${r.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(r.slideDuplicatePrevClass):n.children(`.${r.slideClass}.${r.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(r.slideDuplicatePrevClass)),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,r=t.rtlTranslate?t.translate:-t.translate,{slidesGrid:n,snapGrid:s,params:a,activeIndex:i,realIndex:o,snapIndex:l}=t;let c,d=e;if("undefined"===typeof d){for(let e=0;e<n.length;e+=1)"undefined"!==typeof n[e+1]?r>=n[e]&&r<n[e+1]-(n[e+1]-n[e])/2?d=e:r>=n[e]&&r<n[e+1]&&(d=e+1):r>=n[e]&&(d=e);a.normalizeSlideIndex&&(d<0||"undefined"===typeof d)&&(d=0)}if(s.indexOf(r)>=0)c=s.indexOf(r);else{const e=Math.min(a.slidesPerGroupSkip,d);c=e+Math.floor((d-e)/a.slidesPerGroup)}if(c>=s.length&&(c=s.length-1),d===i)return void(c!==l&&(t.snapIndex=c,t.emit("snapIndexChange")));const p=parseInt(t.slides.eq(d).attr("data-swiper-slide-index")||d,10);Object.assign(t,{snapIndex:c,realIndex:p,previousIndex:i,activeIndex:d}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),o!==p&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function(e){const t=this,r=t.params,n=g(e).closest(`.${r.slideClass}`)[0];let s,a=!1;if(n)for(let i=0;i<t.slides.length;i+=1)if(t.slides[i]===n){a=!0,s=i;break}if(!n||!a)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=n,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(g(n).attr("data-swiper-slide-index"),10):t.clickedIndex=s,r.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}};var A={getTranslate:function(e=(this.isHorizontal()?"x":"y")){const{params:t,rtlTranslate:r,translate:n,$wrapperEl:s}=this;if(t.virtualTranslate)return r?-n:n;if(t.cssMode)return n;let a=b(s[0],e);return r&&(a=-a),a||0},setTranslate:function(e,t){const r=this,{rtlTranslate:n,params:s,$wrapperEl:a,wrapperEl:i,progress:o}=r;let l,c=0,d=0;r.isHorizontal()?c=n?-e:e:d=e,s.roundLengths&&(c=Math.floor(c),d=Math.floor(d)),s.cssMode?i[r.isHorizontal()?"scrollLeft":"scrollTop"]=r.isHorizontal()?-c:-d:s.virtualTranslate||a.transform(`translate3d(${c}px, ${d}px, 0px)`),r.previousTranslate=r.translate,r.translate=r.isHorizontal()?c:d;const p=r.maxTranslate()-r.minTranslate();l=0===p?0:(e-r.minTranslate())/p,l!==o&&r.updateProgress(e),r.emit("setTranslate",r.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e=0,t=this.params.speed,r=!0,n=!0,s){const a=this,{params:i,wrapperEl:o}=a;if(a.animating&&i.preventInteractionOnTransition)return!1;const l=a.minTranslate(),c=a.maxTranslate();let d;if(d=n&&e>l?l:n&&e<c?c:e,a.updateProgress(d),i.cssMode){const e=a.isHorizontal();if(0===t)o[e?"scrollLeft":"scrollTop"]=-d;else{if(!a.support.smoothScroll)return S({swiper:a,targetPosition:-d,side:e?"left":"top"}),!0;o.scrollTo({[e?"left":"top"]:-d,behavior:"smooth"})}return!0}return 0===t?(a.setTransition(0),a.setTranslate(d),r&&(a.emit("beforeTransitionStart",t,s),a.emit("transitionEnd"))):(a.setTransition(t),a.setTranslate(d),r&&(a.emit("beforeTransitionStart",t,s),a.emit("transitionStart")),a.animating||(a.animating=!0,a.onTranslateToWrapperTransitionEnd||(a.onTranslateToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.$wrapperEl[0].removeEventListener("transitionend",a.onTranslateToWrapperTransitionEnd),a.$wrapperEl[0].removeEventListener("webkitTransitionEnd",a.onTranslateToWrapperTransitionEnd),a.onTranslateToWrapperTransitionEnd=null,delete a.onTranslateToWrapperTransitionEnd,r&&a.emit("transitionEnd"))}),a.$wrapperEl[0].addEventListener("transitionend",a.onTranslateToWrapperTransitionEnd),a.$wrapperEl[0].addEventListener("webkitTransitionEnd",a.onTranslateToWrapperTransitionEnd))),!0}};function L({swiper:e,runCallbacks:t,direction:r,step:n}){const{activeIndex:s,previousIndex:a}=e;let i=r;if(i||(i=s>a?"next":s<a?"prev":"reset"),e.emit(`transition${n}`),t&&s!==a){if("reset"===i)return void e.emit(`slideResetTransition${n}`);e.emit(`slideChangeTransition${n}`),"next"===i?e.emit(`slideNextTransition${n}`):e.emit(`slidePrevTransition${n}`)}}var z={slideTo:function(e=0,t=this.params.speed,r=!0,n,s){if("number"!==typeof e&&"string"!==typeof e)throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);if("string"===typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const a=this;let i=e;i<0&&(i=0);const{params:o,snapGrid:l,slidesGrid:c,previousIndex:d,activeIndex:p,rtlTranslate:u,wrapperEl:f,enabled:m}=a;if(a.animating&&o.preventInteractionOnTransition||!m&&!n&&!s)return!1;const h=Math.min(a.params.slidesPerGroupSkip,i);let g=h+Math.floor((i-h)/a.params.slidesPerGroup);g>=l.length&&(g=l.length-1);const v=-l[g];if(o.normalizeSlideIndex)for(let b=0;b<c.length;b+=1){const e=-Math.floor(100*v),t=Math.floor(100*c[b]),r=Math.floor(100*c[b+1]);"undefined"!==typeof c[b+1]?e>=t&&e<r-(r-t)/2?i=b:e>=t&&e<r&&(i=b+1):e>=t&&(i=b)}if(a.initialized&&i!==p){if(!a.allowSlideNext&&v<a.translate&&v<a.minTranslate())return!1;if(!a.allowSlidePrev&&v>a.translate&&v>a.maxTranslate()&&(p||0)!==i)return!1}let y;if(i!==(d||0)&&r&&a.emit("beforeSlideChangeStart"),a.updateProgress(v),y=i>p?"next":i<p?"prev":"reset",u&&-v===a.translate||!u&&v===a.translate)return a.updateActiveIndex(i),o.autoHeight&&a.updateAutoHeight(),a.updateSlidesClasses(),"slide"!==o.effect&&a.setTranslate(v),"reset"!==y&&(a.transitionStart(r,y),a.transitionEnd(r,y)),!1;if(o.cssMode){const e=a.isHorizontal(),r=u?v:-v;if(0===t){const t=a.virtual&&a.params.virtual.enabled;t&&(a.wrapperEl.style.scrollSnapType="none",a._immediateVirtual=!0),f[e?"scrollLeft":"scrollTop"]=r,t&&requestAnimationFrame((()=>{a.wrapperEl.style.scrollSnapType="",a._swiperImmediateVirtual=!1}))}else{if(!a.support.smoothScroll)return S({swiper:a,targetPosition:r,side:e?"left":"top"}),!0;f.scrollTo({[e?"left":"top"]:r,behavior:"smooth"})}return!0}return a.setTransition(t),a.setTranslate(v),a.updateActiveIndex(i),a.updateSlidesClasses(),a.emit("beforeTransitionStart",t,n),a.transitionStart(r,y),0===t?a.transitionEnd(r,y):a.animating||(a.animating=!0,a.onSlideToWrapperTransitionEnd||(a.onSlideToWrapperTransitionEnd=function(e){a&&!a.destroyed&&e.target===this&&(a.$wrapperEl[0].removeEventListener("transitionend",a.onSlideToWrapperTransitionEnd),a.$wrapperEl[0].removeEventListener("webkitTransitionEnd",a.onSlideToWrapperTransitionEnd),a.onSlideToWrapperTransitionEnd=null,delete a.onSlideToWrapperTransitionEnd,a.transitionEnd(r,y))}),a.$wrapperEl[0].addEventListener("transitionend",a.onSlideToWrapperTransitionEnd),a.$wrapperEl[0].addEventListener("webkitTransitionEnd",a.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e=0,t=this.params.speed,r=!0,n){if("string"===typeof e){const t=parseInt(e,10);if(!isFinite(t))throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);e=t}const s=this;let a=e;return s.params.loop&&(a+=s.loopedSlides),s.slideTo(a,t,r,n)},slideNext:function(e=this.params.speed,t=!0,r){const n=this,{animating:s,enabled:a,params:i}=n;if(!a)return n;let o=i.slidesPerGroup;"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(o=Math.max(n.slidesPerViewDynamic("current",!0),1));const l=n.activeIndex<i.slidesPerGroupSkip?1:o;if(i.loop){if(s&&i.loopPreventsSlide)return!1;n.loopFix(),n._clientLeft=n.$wrapperEl[0].clientLeft}return i.rewind&&n.isEnd?n.slideTo(0,e,t,r):n.slideTo(n.activeIndex+l,e,t,r)},slidePrev:function(e=this.params.speed,t=!0,r){const n=this,{params:s,animating:a,snapGrid:i,slidesGrid:o,rtlTranslate:l,enabled:c}=n;if(!c)return n;if(s.loop){if(a&&s.loopPreventsSlide)return!1;n.loopFix(),n._clientLeft=n.$wrapperEl[0].clientLeft}function d(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const p=d(l?n.translate:-n.translate),u=i.map((e=>d(e)));let f=i[u.indexOf(p)-1];if("undefined"===typeof f&&s.cssMode){let e;i.forEach(((t,r)=>{p>=t&&(e=r)})),"undefined"!==typeof e&&(f=i[e>0?e-1:e])}let m=0;if("undefined"!==typeof f&&(m=o.indexOf(f),m<0&&(m=n.activeIndex-1),"auto"===s.slidesPerView&&1===s.slidesPerGroup&&s.slidesPerGroupAuto&&(m=m-n.slidesPerViewDynamic("previous",!0)+1,m=Math.max(m,0))),s.rewind&&n.isBeginning){const s=n.params.virtual&&n.params.virtual.enabled&&n.virtual?n.virtual.slides.length-1:n.slides.length-1;return n.slideTo(s,e,t,r)}return n.slideTo(m,e,t,r)},slideReset:function(e=this.params.speed,t=!0,r){return this.slideTo(this.activeIndex,e,t,r)},slideToClosest:function(e=this.params.speed,t=!0,r,n=.5){const s=this;let a=s.activeIndex;const i=Math.min(s.params.slidesPerGroupSkip,a),o=i+Math.floor((a-i)/s.params.slidesPerGroup),l=s.rtlTranslate?s.translate:-s.translate;if(l>=s.snapGrid[o]){const e=s.snapGrid[o];l-e>(s.snapGrid[o+1]-e)*n&&(a+=s.params.slidesPerGroup)}else{const e=s.snapGrid[o-1];l-e<=(s.snapGrid[o]-e)*n&&(a-=s.params.slidesPerGroup)}return a=Math.max(a,0),a=Math.min(a,s.slidesGrid.length-1),s.slideTo(a,e,t,r)},slideToClickedSlide:function(){const e=this,{params:t,$wrapperEl:r}=e,n="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let s,a=e.clickedIndex;if(t.loop){if(e.animating)return;s=parseInt(g(e.clickedSlide).attr("data-swiper-slide-index"),10),t.centeredSlides?a<e.loopedSlides-n/2||a>e.slides.length-e.loopedSlides+n/2?(e.loopFix(),a=r.children(`.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),v((()=>{e.slideTo(a)}))):e.slideTo(a):a>e.slides.length-n?(e.loopFix(),a=r.children(`.${t.slideClass}[data-swiper-slide-index="${s}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),v((()=>{e.slideTo(a)}))):e.slideTo(a)}else e.slideTo(a)}};var N={loopCreate:function(){const e=this,t=i(),{params:r,$wrapperEl:n}=e,s=n.children().length>0?g(n.children()[0].parentNode):n;s.children(`.${r.slideClass}.${r.slideDuplicateClass}`).remove();let a=s.children(`.${r.slideClass}`);if(r.loopFillGroupWithBlank){const e=r.slidesPerGroup-a.length%r.slidesPerGroup;if(e!==r.slidesPerGroup){for(let n=0;n<e;n+=1){const e=g(t.createElement("div")).addClass(`${r.slideClass} ${r.slideBlankClass}`);s.append(e)}a=s.children(`.${r.slideClass}`)}}"auto"!==r.slidesPerView||r.loopedSlides||(r.loopedSlides=a.length),e.loopedSlides=Math.ceil(parseFloat(r.loopedSlides||r.slidesPerView,10)),e.loopedSlides+=r.loopAdditionalSlides,e.loopedSlides>a.length&&e.params.loopedSlidesLimit&&(e.loopedSlides=a.length);const o=[],l=[];a.each(((e,t)=>{g(e).attr("data-swiper-slide-index",t)}));for(let i=0;i<e.loopedSlides;i+=1){const e=i-Math.floor(i/a.length)*a.length;l.push(a.eq(e)[0]),o.unshift(a.eq(a.length-e-1)[0])}for(let i=0;i<l.length;i+=1)s.append(g(l[i].cloneNode(!0)).addClass(r.slideDuplicateClass));for(let i=o.length-1;i>=0;i-=1)s.prepend(g(o[i].cloneNode(!0)).addClass(r.slideDuplicateClass))},loopFix:function(){const e=this;e.emit("beforeLoopFix");const{activeIndex:t,slides:r,loopedSlides:n,allowSlidePrev:s,allowSlideNext:a,snapGrid:i,rtlTranslate:o}=e;let l;e.allowSlidePrev=!0,e.allowSlideNext=!0;const c=-i[t]-e.getTranslate();if(t<n){l=r.length-3*n+t,l+=n;e.slideTo(l,0,!1,!0)&&0!==c&&e.setTranslate((o?-e.translate:e.translate)-c)}else if(t>=r.length-n){l=-r.length+t+n,l+=n;e.slideTo(l,0,!1,!0)&&0!==c&&e.setTranslate((o?-e.translate:e.translate)-c)}e.allowSlidePrev=s,e.allowSlideNext=a,e.emit("loopFix")},loopDestroy:function(){const{$wrapperEl:e,params:t,slides:r}=this;e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),r.removeAttr("data-swiper-slide-index")}};function I(e){const t=this,r=i(),n=l(),s=t.touchEventsData,{params:a,touches:o,enabled:c}=t;if(!c)return;if(t.animating&&a.preventInteractionOnTransition)return;!t.animating&&a.cssMode&&a.loop&&t.loopFix();let d=e;d.originalEvent&&(d=d.originalEvent);let p=g(d.target);if("wrapper"===a.touchEventsTarget&&!p.closest(t.wrapperEl).length)return;if(s.isTouchEvent="touchstart"===d.type,!s.isTouchEvent&&"which"in d&&3===d.which)return;if(!s.isTouchEvent&&"button"in d&&d.button>0)return;if(s.isTouched&&s.isMoved)return;const u=!!a.noSwipingClass&&""!==a.noSwipingClass,f=e.composedPath?e.composedPath():e.path;u&&d.target&&d.target.shadowRoot&&f&&(p=g(f[0]));const m=a.noSwipingSelector?a.noSwipingSelector:`.${a.noSwipingClass}`,h=!(!d.target||!d.target.shadowRoot);if(a.noSwiping&&(h?function(e,t=this){return function t(r){if(!r||r===i()||r===l())return null;r.assignedSlot&&(r=r.assignedSlot);const n=r.closest(e);return n||r.getRootNode?n||t(r.getRootNode().host):null}(t)}(m,p[0]):p.closest(m)[0]))return void(t.allowClick=!0);if(a.swipeHandler&&!p.closest(a.swipeHandler)[0])return;o.currentX="touchstart"===d.type?d.targetTouches[0].pageX:d.pageX,o.currentY="touchstart"===d.type?d.targetTouches[0].pageY:d.pageY;const v=o.currentX,b=o.currentY,w=a.edgeSwipeDetection||a.iOSEdgeSwipeDetection,x=a.edgeSwipeThreshold||a.iOSEdgeSwipeThreshold;if(w&&(v<=x||v>=n.innerWidth-x)){if("prevent"!==w)return;e.preventDefault()}if(Object.assign(s,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),o.startX=v,o.startY=b,s.touchStartTime=y(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,a.threshold>0&&(s.allowThresholdMove=!1),"touchstart"!==d.type){let e=!0;p.is(s.focusableElements)&&(e=!1,"SELECT"===p[0].nodeName&&(s.isTouched=!1)),r.activeElement&&g(r.activeElement).is(s.focusableElements)&&r.activeElement!==p[0]&&r.activeElement.blur();const n=e&&t.allowTouchMove&&a.touchStartPreventDefault;!a.touchStartForcePreventDefault&&!n||p[0].isContentEditable||d.preventDefault()}t.params.freeMode&&t.params.freeMode.enabled&&t.freeMode&&t.animating&&!a.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",d)}function j(e){const t=i(),r=this,n=r.touchEventsData,{params:s,touches:a,rtlTranslate:o,enabled:l}=r;if(!l)return;let c=e;if(c.originalEvent&&(c=c.originalEvent),!n.isTouched)return void(n.startMoving&&n.isScrolling&&r.emit("touchMoveOpposite",c));if(n.isTouchEvent&&"touchmove"!==c.type)return;const d="touchmove"===c.type&&c.targetTouches&&(c.targetTouches[0]||c.changedTouches[0]),p="touchmove"===c.type?d.pageX:c.pageX,u="touchmove"===c.type?d.pageY:c.pageY;if(c.preventedByNestedSwiper)return a.startX=p,void(a.startY=u);if(!r.allowTouchMove)return g(c.target).is(n.focusableElements)||(r.allowClick=!1),void(n.isTouched&&(Object.assign(a,{startX:p,startY:u,currentX:p,currentY:u}),n.touchStartTime=y()));if(n.isTouchEvent&&s.touchReleaseOnEdges&&!s.loop)if(r.isVertical()){if(u<a.startY&&r.translate<=r.maxTranslate()||u>a.startY&&r.translate>=r.minTranslate())return n.isTouched=!1,void(n.isMoved=!1)}else if(p<a.startX&&r.translate<=r.maxTranslate()||p>a.startX&&r.translate>=r.minTranslate())return;if(n.isTouchEvent&&t.activeElement&&c.target===t.activeElement&&g(c.target).is(n.focusableElements))return n.isMoved=!0,void(r.allowClick=!1);if(n.allowTouchCallbacks&&r.emit("touchMove",c),c.targetTouches&&c.targetTouches.length>1)return;a.currentX=p,a.currentY=u;const f=a.currentX-a.startX,m=a.currentY-a.startY;if(r.params.threshold&&Math.sqrt(f**2+m**2)<r.params.threshold)return;if("undefined"===typeof n.isScrolling){let e;r.isHorizontal()&&a.currentY===a.startY||r.isVertical()&&a.currentX===a.startX?n.isScrolling=!1:f*f+m*m>=25&&(e=180*Math.atan2(Math.abs(m),Math.abs(f))/Math.PI,n.isScrolling=r.isHorizontal()?e>s.touchAngle:90-e>s.touchAngle)}if(n.isScrolling&&r.emit("touchMoveOpposite",c),"undefined"===typeof n.startMoving&&(a.currentX===a.startX&&a.currentY===a.startY||(n.startMoving=!0)),n.isScrolling)return void(n.isTouched=!1);if(!n.startMoving)return;r.allowClick=!1,!s.cssMode&&c.cancelable&&c.preventDefault(),s.touchMoveStopPropagation&&!s.nested&&c.stopPropagation(),n.isMoved||(s.loop&&!s.cssMode&&r.loopFix(),n.startTranslate=r.getTranslate(),r.setTransition(0),r.animating&&r.$wrapperEl.trigger("webkitTransitionEnd transitionend"),n.allowMomentumBounce=!1,!s.grabCursor||!0!==r.allowSlideNext&&!0!==r.allowSlidePrev||r.setGrabCursor(!0),r.emit("sliderFirstMove",c)),r.emit("sliderMove",c),n.isMoved=!0;let h=r.isHorizontal()?f:m;a.diff=h,h*=s.touchRatio,o&&(h=-h),r.swipeDirection=h>0?"prev":"next",n.currentTranslate=h+n.startTranslate;let v=!0,b=s.resistanceRatio;if(s.touchReleaseOnEdges&&(b=0),h>0&&n.currentTranslate>r.minTranslate()?(v=!1,s.resistance&&(n.currentTranslate=r.minTranslate()-1+(-r.minTranslate()+n.startTranslate+h)**b)):h<0&&n.currentTranslate<r.maxTranslate()&&(v=!1,s.resistance&&(n.currentTranslate=r.maxTranslate()+1-(r.maxTranslate()-n.startTranslate-h)**b)),v&&(c.preventedByNestedSwiper=!0),!r.allowSlideNext&&"next"===r.swipeDirection&&n.currentTranslate<n.startTranslate&&(n.currentTranslate=n.startTranslate),!r.allowSlidePrev&&"prev"===r.swipeDirection&&n.currentTranslate>n.startTranslate&&(n.currentTranslate=n.startTranslate),r.allowSlidePrev||r.allowSlideNext||(n.currentTranslate=n.startTranslate),s.threshold>0){if(!(Math.abs(h)>s.threshold||n.allowThresholdMove))return void(n.currentTranslate=n.startTranslate);if(!n.allowThresholdMove)return n.allowThresholdMove=!0,a.startX=a.currentX,a.startY=a.currentY,n.currentTranslate=n.startTranslate,void(a.diff=r.isHorizontal()?a.currentX-a.startX:a.currentY-a.startY)}s.followFinger&&!s.cssMode&&((s.freeMode&&s.freeMode.enabled&&r.freeMode||s.watchSlidesProgress)&&(r.updateActiveIndex(),r.updateSlidesClasses()),r.params.freeMode&&s.freeMode.enabled&&r.freeMode&&r.freeMode.onTouchMove(),r.updateProgress(n.currentTranslate),r.setTranslate(n.currentTranslate))}function D(e){const t=this,r=t.touchEventsData,{params:n,touches:s,rtlTranslate:a,slidesGrid:i,enabled:o}=t;if(!o)return;let l=e;if(l.originalEvent&&(l=l.originalEvent),r.allowTouchCallbacks&&t.emit("touchEnd",l),r.allowTouchCallbacks=!1,!r.isTouched)return r.isMoved&&n.grabCursor&&t.setGrabCursor(!1),r.isMoved=!1,void(r.startMoving=!1);n.grabCursor&&r.isMoved&&r.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const c=y(),d=c-r.touchStartTime;if(t.allowClick){const e=l.path||l.composedPath&&l.composedPath();t.updateClickedSlide(e&&e[0]||l.target),t.emit("tap click",l),d<300&&c-r.lastClickTime<300&&t.emit("doubleTap doubleClick",l)}if(r.lastClickTime=y(),v((()=>{t.destroyed||(t.allowClick=!0)})),!r.isTouched||!r.isMoved||!t.swipeDirection||0===s.diff||r.currentTranslate===r.startTranslate)return r.isTouched=!1,r.isMoved=!1,void(r.startMoving=!1);let p;if(r.isTouched=!1,r.isMoved=!1,r.startMoving=!1,p=n.followFinger?a?t.translate:-t.translate:-r.currentTranslate,n.cssMode)return;if(t.params.freeMode&&n.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:p});let u=0,f=t.slidesSizesGrid[0];for(let v=0;v<i.length;v+=v<n.slidesPerGroupSkip?1:n.slidesPerGroup){const e=v<n.slidesPerGroupSkip-1?1:n.slidesPerGroup;"undefined"!==typeof i[v+e]?p>=i[v]&&p<i[v+e]&&(u=v,f=i[v+e]-i[v]):p>=i[v]&&(u=v,f=i[i.length-1]-i[i.length-2])}let m=null,h=null;n.rewind&&(t.isBeginning?h=t.params.virtual&&t.params.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(m=0));const g=(p-i[u])/f,b=u<n.slidesPerGroupSkip-1?1:n.slidesPerGroup;if(d>n.longSwipesMs){if(!n.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(g>=n.longSwipesRatio?t.slideTo(n.rewind&&t.isEnd?m:u+b):t.slideTo(u)),"prev"===t.swipeDirection&&(g>1-n.longSwipesRatio?t.slideTo(u+b):null!==h&&g<0&&Math.abs(g)>n.longSwipesRatio?t.slideTo(h):t.slideTo(u))}else{if(!n.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(l.target===t.navigation.nextEl||l.target===t.navigation.prevEl)?l.target===t.navigation.nextEl?t.slideTo(u+b):t.slideTo(u):("next"===t.swipeDirection&&t.slideTo(null!==m?m:u+b),"prev"===t.swipeDirection&&t.slideTo(null!==h?h:u))}}function G(){const e=this,{params:t,el:r}=e;if(r&&0===r.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:n,allowSlidePrev:s,snapGrid:a}=e;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses(),("auto"===t.slidesPerView||t.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.run(),e.allowSlidePrev=s,e.allowSlideNext=n,e.params.watchOverflow&&a!==e.snapGrid&&e.checkOverflow()}function B(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function V(){const e=this,{wrapperEl:t,rtlTranslate:r,enabled:n}=e;if(!n)return;let s;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const a=e.maxTranslate()-e.minTranslate();s=0===a?0:(e.translate-e.minTranslate())/a,s!==e.progress&&e.updateProgress(r?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}let F=!1;function R(){}const H=(e,t)=>{const r=i(),{params:n,touchEvents:s,el:a,wrapperEl:o,device:l,support:c}=e,d=!!n.nested,p="on"===t?"addEventListener":"removeEventListener",u=t;if(c.touch){const t=!("touchstart"!==s.start||!c.passiveListener||!n.passiveListeners)&&{passive:!0,capture:!1};a[p](s.start,e.onTouchStart,t),a[p](s.move,e.onTouchMove,c.passiveListener?{passive:!1,capture:d}:d),a[p](s.end,e.onTouchEnd,t),s.cancel&&a[p](s.cancel,e.onTouchEnd,t)}else a[p](s.start,e.onTouchStart,!1),r[p](s.move,e.onTouchMove,d),r[p](s.end,e.onTouchEnd,!1);(n.preventClicks||n.preventClicksPropagation)&&a[p]("click",e.onClick,!0),n.cssMode&&o[p]("scroll",e.onScroll),n.updateOnWindowResize?e[u](l.ios||l.android?"resize orientationchange observerUpdate":"resize observerUpdate",G,!0):e[u]("observerUpdate",G,!0)};var Y={attachEvents:function(){const e=this,t=i(),{params:r,support:n}=e;e.onTouchStart=I.bind(e),e.onTouchMove=j.bind(e),e.onTouchEnd=D.bind(e),r.cssMode&&(e.onScroll=V.bind(e)),e.onClick=B.bind(e),n.touch&&!F&&(t.addEventListener("touchstart",R),F=!0),H(e,"on")},detachEvents:function(){H(this,"off")}};const W=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var X={setBreakpoint:function(){const e=this,{activeIndex:t,initialized:r,loopedSlides:n=0,params:s,$el:a}=e,i=s.breakpoints;if(!i||i&&0===Object.keys(i).length)return;const o=e.getBreakpoint(i,e.params.breakpointsBase,e.el);if(!o||e.currentBreakpoint===o)return;const l=(o in i?i[o]:void 0)||e.originalParams,c=W(e,s),d=W(e,l),p=s.enabled;c&&!d?(a.removeClass(`${s.containerModifierClass}grid ${s.containerModifierClass}grid-column`),e.emitContainerClasses()):!c&&d&&(a.addClass(`${s.containerModifierClass}grid`),(l.grid.fill&&"column"===l.grid.fill||!l.grid.fill&&"column"===s.grid.fill)&&a.addClass(`${s.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{const r=s[t]&&s[t].enabled,n=l[t]&&l[t].enabled;r&&!n&&e[t].disable(),!r&&n&&e[t].enable()}));const u=l.direction&&l.direction!==s.direction,f=s.loop&&(l.slidesPerView!==s.slidesPerView||u);u&&r&&e.changeDirection(),x(e.params,l);const m=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),p&&!m?e.disable():!p&&m&&e.enable(),e.currentBreakpoint=o,e.emit("_beforeBreakpoint",l),f&&r&&(e.loopDestroy(),e.loopCreate(),e.updateSlides(),e.slideTo(t-n+e.loopedSlides,0,!1)),e.emit("breakpoint",l)},getBreakpoint:function(e,t="window",r){if(!e||"container"===t&&!r)return;let n=!1;const s=l(),a="window"===t?s.innerHeight:r.clientHeight,i=Object.keys(e).map((e=>{if("string"===typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:a*t,point:e}}return{value:e,point:e}}));i.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let o=0;o<i.length;o+=1){const{point:e,value:a}=i[o];"window"===t?s.matchMedia(`(min-width: ${a}px)`).matches&&(n=e):a<=r.clientWidth&&(n=e)}return n||"max"}};var q={addClasses:function(){const e=this,{classNames:t,params:r,rtl:n,$el:s,device:a,support:i}=e,o=function(e,t){const r=[];return e.forEach((e=>{"object"===typeof e?Object.keys(e).forEach((n=>{e[n]&&r.push(t+n)})):"string"===typeof e&&r.push(t+e)})),r}(["initialized",r.direction,{"pointer-events":!i.touch},{"free-mode":e.params.freeMode&&r.freeMode.enabled},{autoheight:r.autoHeight},{rtl:n},{grid:r.grid&&r.grid.rows>1},{"grid-column":r.grid&&r.grid.rows>1&&"column"===r.grid.fill},{android:a.android},{ios:a.ios},{"css-mode":r.cssMode},{centered:r.cssMode&&r.centeredSlides},{"watch-progress":r.watchSlidesProgress}],r.containerModifierClass);t.push(...o),s.addClass([...t].join(" ")),e.emitContainerClasses()},removeClasses:function(){const{$el:e,classNames:t}=this;e.removeClass(t.join(" ")),this.emitContainerClasses()}};var U={init:!0,direction:"horizontal",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:0,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,loopedSlidesLimit:!0,loopFillGroupWithBlank:!1,loopPreventsSlide:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-invisible-blank",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",runCallbacksOnInit:!0,_emitClasses:!1};function Z(e,t){return function(r={}){const n=Object.keys(r)[0],s=r[n];"object"===typeof s&&null!==s?(["navigation","pagination","scrollbar"].indexOf(n)>=0&&!0===e[n]&&(e[n]={auto:!0}),n in e&&"enabled"in s?(!0===e[n]&&(e[n]={enabled:!0}),"object"!==typeof e[n]||"enabled"in e[n]||(e[n].enabled=!0),e[n]||(e[n]={enabled:!1}),x(t,r)):x(t,r)):x(t,r)}}const K={eventsEmitter:M,update:_,translate:A,transition:{setTransition:function(e,t){const r=this;r.params.cssMode||r.$wrapperEl.transition(e),r.emit("setTransition",e,t)},transitionStart:function(e=!0,t){const r=this,{params:n}=r;n.cssMode||(n.autoHeight&&r.updateAutoHeight(),L({swiper:r,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e=!0,t){const r=this,{params:n}=r;r.animating=!1,n.cssMode||(r.setTransition(0),L({swiper:r,runCallbacks:e,direction:t,step:"End"}))}},slide:z,loop:N,grabCursor:{setGrabCursor:function(e){const t=this;if(t.support.touch||!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const r="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;r.style.cursor="move",r.style.cursor=e?"grabbing":"grab"},unsetGrabCursor:function(){const e=this;e.support.touch||e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="")}},events:Y,breakpoints:X,checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:r}=e,{slidesOffsetBefore:n}=r;if(n){const t=e.slides.length-1,r=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*n;e.isLocked=e.size>r}else e.isLocked=1===e.snapGrid.length;!0===r.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===r.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:q,images:{loadImage:function(e,t,r,n,s,a){const i=l();let o;function c(){a&&a()}g(e).parent("picture")[0]||e.complete&&s?c():t?(o=new i.Image,o.onload=c,o.onerror=c,n&&(o.sizes=n),r&&(o.srcset=r),t&&(o.src=t)):c()},preloadImages:function(){const e=this;function t(){"undefined"!==typeof e&&null!==e&&e&&!e.destroyed&&(void 0!==e.imagesLoaded&&(e.imagesLoaded+=1),e.imagesLoaded===e.imagesToLoad.length&&(e.params.updateOnImagesReady&&e.update(),e.emit("imagesReady")))}e.imagesToLoad=e.$el.find("img");for(let r=0;r<e.imagesToLoad.length;r+=1){const n=e.imagesToLoad[r];e.loadImage(n,n.currentSrc||n.getAttribute("src"),n.srcset||n.getAttribute("srcset"),n.sizes||n.getAttribute("sizes"),!0,t)}}}},Q={};class J{constructor(...e){let t,r;if(1===e.length&&e[0].constructor&&"Object"===Object.prototype.toString.call(e[0]).slice(8,-1)?r=e[0]:[t,r]=e,r||(r={}),r=x({},r),t&&!r.el&&(r.el=t),r.el&&g(r.el).length>1){const e=[];return g(r.el).each((t=>{const n=x({},r,{el:t});e.push(new J(n))})),e}const n=this;n.__swiper__=!0,n.support=O(),n.device=$({userAgent:r.userAgent}),n.browser=P(),n.eventsListeners={},n.eventsAnyListeners=[],n.modules=[...n.__modules__],r.modules&&Array.isArray(r.modules)&&n.modules.push(...r.modules);const s={};n.modules.forEach((e=>{e({swiper:n,extendParams:Z(r,s),on:n.on.bind(n),once:n.once.bind(n),off:n.off.bind(n),emit:n.emit.bind(n)})}));const a=x({},U,s);return n.params=x({},a,Q,r),n.originalParams=x({},n.params),n.passedParams=x({},r),n.params&&n.params.on&&Object.keys(n.params.on).forEach((e=>{n.on(e,n.params.on[e])})),n.params&&n.params.onAny&&n.onAny(n.params.onAny),n.$=g,Object.assign(n,{enabled:n.params.enabled,el:t,classNames:[],slides:g(),slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===n.params.direction,isVertical:()=>"vertical"===n.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:n.params.allowSlideNext,allowSlidePrev:n.params.allowSlidePrev,touchEvents:function(){const e=["touchstart","touchmove","touchend","touchcancel"],t=["pointerdown","pointermove","pointerup"];return n.touchEventsTouch={start:e[0],move:e[1],end:e[2],cancel:e[3]},n.touchEventsDesktop={start:t[0],move:t[1],end:t[2]},n.support.touch||!n.params.simulateTouch?n.touchEventsTouch:n.touchEventsDesktop}(),touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:n.params.focusableElements,lastClickTime:y(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,isTouchEvent:void 0,startMoving:void 0},allowClick:!0,allowTouchMove:n.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),n.emit("_swiper"),n.params.init&&n.init(),n}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const r=this;e=Math.min(Math.max(e,0),1);const n=r.minTranslate(),s=(r.maxTranslate()-n)*e+n;r.translateTo(s,"undefined"===typeof t?0:t),r.updateActiveIndex(),r.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.each((r=>{const n=e.getSlideClasses(r);t.push({slideEl:r,classNames:n}),e.emit("_slideClass",r,n)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e="current",t=!1){const{params:r,slides:n,slidesGrid:s,slidesSizesGrid:a,size:i,activeIndex:o}=this;let l=1;if(r.centeredSlides){let e,t=n[o].swiperSlideSize;for(let r=o+1;r<n.length;r+=1)n[r]&&!e&&(t+=n[r].swiperSlideSize,l+=1,t>i&&(e=!0));for(let r=o-1;r>=0;r-=1)n[r]&&!e&&(t+=n[r].swiperSlideSize,l+=1,t>i&&(e=!0))}else if("current"===e)for(let c=o+1;c<n.length;c+=1){(t?s[c]+a[c]-s[o]<i:s[c]-s[o]<i)&&(l+=1)}else for(let c=o-1;c>=0;c-=1){s[o]-s[c]<i&&(l+=1)}return l}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:r}=e;function n(){const t=e.rtlTranslate?-1*e.translate:e.translate,r=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(r),e.updateActiveIndex(),e.updateSlidesClasses()}let s;r.breakpoints&&e.setBreakpoint(),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(n(),e.params.autoHeight&&e.updateAutoHeight()):(s=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),s||n()),r.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t=!0){const r=this,n=r.params.direction;return e||(e="horizontal"===n?"vertical":"horizontal"),e===n||"horizontal"!==e&&"vertical"!==e||(r.$el.removeClass(`${r.params.containerModifierClass}${n}`).addClass(`${r.params.containerModifierClass}${e}`),r.emitContainerClasses(),r.params.direction=e,r.slides.each((t=>{"vertical"===e?t.style.width="":t.style.height=""})),r.emit("changeDirection"),t&&r.update()),r}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.$el.addClass(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.$el.removeClass(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;const r=g(e||t.params.el);if(!(e=r[0]))return!1;e.swiper=t;const n=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let s=(()=>{if(e&&e.shadowRoot&&e.shadowRoot.querySelector){const t=g(e.shadowRoot.querySelector(n()));return t.children=e=>r.children(e),t}return r.children?r.children(n()):g(r).children(n())})();if(0===s.length&&t.params.createElements){const e=i().createElement("div");s=g(e),e.className=t.params.wrapperClass,r.append(e),r.children(`.${t.params.slideClass}`).each((e=>{s.append(e)}))}return Object.assign(t,{$el:r,el:e,$wrapperEl:s,wrapperEl:s[0],mounted:!0,rtl:"rtl"===e.dir.toLowerCase()||"rtl"===r.css("direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===e.dir.toLowerCase()||"rtl"===r.css("direction")),wrongRTL:"-webkit-box"===s.css("display")}),!0}init(e){const t=this;if(t.initialized)return t;return!1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.params.loop&&t.loopCreate(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.preloadImages&&t.preloadImages(),t.params.loop?t.slideTo(t.params.initialSlide+t.loopedSlides,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.attachEvents(),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(e=!0,t=!0){const r=this,{params:n,$el:s,$wrapperEl:a,slides:i}=r;return"undefined"===typeof r.params||r.destroyed||(r.emit("beforeDestroy"),r.initialized=!1,r.detachEvents(),n.loop&&r.loopDestroy(),t&&(r.removeClasses(),s.removeAttr("style"),a.removeAttr("style"),i&&i.length&&i.removeClass([n.slideVisibleClass,n.slideActiveClass,n.slideNextClass,n.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),r.emit("destroy"),Object.keys(r.eventsListeners).forEach((e=>{r.off(e)})),!1!==e&&(r.$el[0].swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(r){}try{delete t[e]}catch(r){}}))}(r)),r.destroyed=!0),null}static extendDefaults(e){x(Q,e)}static get extendedDefaults(){return Q}static get defaults(){return U}static installModule(e){J.prototype.__modules__||(J.prototype.__modules__=[]);const t=J.prototype.__modules__;"function"===typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>J.installModule(e))),J):(J.installModule(e),J)}}Object.keys(K).forEach((e=>{Object.keys(K[e]).forEach((t=>{J.prototype[t]=K[e][t]}))})),J.use([function({swiper:e,on:t,emit:r}){const n=l();let s=null,a=null;const i=()=>{e&&!e.destroyed&&e.initialized&&(r("beforeResize"),r("resize"))},o=()=>{e&&!e.destroyed&&e.initialized&&r("orientationchange")};t("init",(()=>{e.params.resizeObserver&&"undefined"!==typeof n.ResizeObserver?e&&!e.destroyed&&e.initialized&&(s=new ResizeObserver((t=>{a=n.requestAnimationFrame((()=>{const{width:r,height:n}=e;let s=r,a=n;t.forEach((({contentBoxSize:t,contentRect:r,target:n})=>{n&&n!==e.el||(s=r?r.width:(t[0]||t).inlineSize,a=r?r.height:(t[0]||t).blockSize)})),s===r&&a===n||i()}))})),s.observe(e.el)):(n.addEventListener("resize",i),n.addEventListener("orientationchange",o))})),t("destroy",(()=>{a&&n.cancelAnimationFrame(a),s&&s.unobserve&&e.el&&(s.unobserve(e.el),s=null),n.removeEventListener("resize",i),n.removeEventListener("orientationchange",o)}))},function({swiper:e,extendParams:t,on:r,emit:n}){const s=[],a=l(),i=(e,t={})=>{const r=new(a.MutationObserver||a.WebkitMutationObserver)((e=>{if(1===e.length)return void n("observerUpdate",e[0]);const t=function(){n("observerUpdate",e[0])};a.requestAnimationFrame?a.requestAnimationFrame(t):a.setTimeout(t,0)}));r.observe(e,{attributes:"undefined"===typeof t.attributes||t.attributes,childList:"undefined"===typeof t.childList||t.childList,characterData:"undefined"===typeof t.characterData||t.characterData}),s.push(r)};t({observer:!1,observeParents:!1,observeSlideChildren:!1}),r("init",(()=>{if(e.params.observer){if(e.params.observeParents){const t=e.$el.parents();for(let e=0;e<t.length;e+=1)i(t[e])}i(e.$el[0],{childList:e.params.observeSlideChildren}),i(e.$wrapperEl[0],{attributes:!1})}})),r("destroy",(()=>{s.forEach((e=>{e.disconnect()})),s.splice(0,s.length)}))}]);var ee=J;function te(e,t,r,n){const s=i();return e.params.createElements&&Object.keys(n).forEach((a=>{if(!r[a]&&!0===r.auto){let i=e.$el.children(`.${n[a]}`)[0];i||(i=s.createElement("div"),i.className=n[a],e.$el.append(i)),r[a]=i,t[a]=i}})),r}function re({swiper:e,extendParams:t,on:r,emit:n}){function s(t){let r;return t&&(r=g(t),e.params.uniqueNavElements&&"string"===typeof t&&r.length>1&&1===e.$el.find(t).length&&(r=e.$el.find(t))),r}function a(t,r){const n=e.params.navigation;t&&t.length>0&&(t[r?"addClass":"removeClass"](n.disabledClass),t[0]&&"BUTTON"===t[0].tagName&&(t[0].disabled=r),e.params.watchOverflow&&e.enabled&&t[e.isLocked?"addClass":"removeClass"](n.lockClass))}function i(){if(e.params.loop)return;const{$nextEl:t,$prevEl:r}=e.navigation;a(r,e.isBeginning&&!e.params.rewind),a(t,e.isEnd&&!e.params.rewind)}function o(t){t.preventDefault(),(!e.isBeginning||e.params.loop||e.params.rewind)&&(e.slidePrev(),n("navigationPrev"))}function l(t){t.preventDefault(),(!e.isEnd||e.params.loop||e.params.rewind)&&(e.slideNext(),n("navigationNext"))}function c(){const t=e.params.navigation;if(e.params.navigation=te(e,e.originalParams.navigation,e.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!t.nextEl&&!t.prevEl)return;const r=s(t.nextEl),n=s(t.prevEl);r&&r.length>0&&r.on("click",l),n&&n.length>0&&n.on("click",o),Object.assign(e.navigation,{$nextEl:r,nextEl:r&&r[0],$prevEl:n,prevEl:n&&n[0]}),e.enabled||(r&&r.addClass(t.lockClass),n&&n.addClass(t.lockClass))}function d(){const{$nextEl:t,$prevEl:r}=e.navigation;t&&t.length&&(t.off("click",l),t.removeClass(e.params.navigation.disabledClass)),r&&r.length&&(r.off("click",o),r.removeClass(e.params.navigation.disabledClass))}t({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),e.navigation={nextEl:null,$nextEl:null,prevEl:null,$prevEl:null},r("init",(()=>{!1===e.params.navigation.enabled?p():(c(),i())})),r("toEdge fromEdge lock unlock",(()=>{i()})),r("destroy",(()=>{d()})),r("enable disable",(()=>{const{$nextEl:t,$prevEl:r}=e.navigation;t&&t[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass),r&&r[e.enabled?"removeClass":"addClass"](e.params.navigation.lockClass)})),r("click",((t,r)=>{const{$nextEl:s,$prevEl:a}=e.navigation,i=r.target;if(e.params.navigation.hideOnClick&&!g(i).is(a)&&!g(i).is(s)){if(e.pagination&&e.params.pagination&&e.params.pagination.clickable&&(e.pagination.el===i||e.pagination.el.contains(i)))return;let t;s?t=s.hasClass(e.params.navigation.hiddenClass):a&&(t=a.hasClass(e.params.navigation.hiddenClass)),n(!0===t?"navigationShow":"navigationHide"),s&&s.toggleClass(e.params.navigation.hiddenClass),a&&a.toggleClass(e.params.navigation.hiddenClass)}}));const p=()=>{e.$el.addClass(e.params.navigation.navigationDisabledClass),d()};Object.assign(e.navigation,{enable:()=>{e.$el.removeClass(e.params.navigation.navigationDisabledClass),c(),i()},disable:p,update:i,init:c,destroy:d})}function ne(e=""){return`.${e.trim().replace(/([\.:!\/])/g,"\\$1").replace(/ /g,".")}`}function se({swiper:e,extendParams:t,on:r,emit:n}){const s="swiper-pagination";let a;t({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${s}-bullet`,bulletActiveClass:`${s}-bullet-active`,modifierClass:`${s}-`,currentClass:`${s}-current`,totalClass:`${s}-total`,hiddenClass:`${s}-hidden`,progressbarFillClass:`${s}-progressbar-fill`,progressbarOppositeClass:`${s}-progressbar-opposite`,clickableClass:`${s}-clickable`,lockClass:`${s}-lock`,horizontalClass:`${s}-horizontal`,verticalClass:`${s}-vertical`,paginationDisabledClass:`${s}-disabled`}}),e.pagination={el:null,$el:null,bullets:[]};let i=0;function o(){return!e.params.pagination.el||!e.pagination.el||!e.pagination.$el||0===e.pagination.$el.length}function l(t,r){const{bulletActiveClass:n}=e.params.pagination;t[r]().addClass(`${n}-${r}`)[r]().addClass(`${n}-${r}-${r}`)}function c(){const t=e.rtl,r=e.params.pagination;if(o())return;const s=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,c=e.pagination.$el;let d;const p=e.params.loop?Math.ceil((s-2*e.loopedSlides)/e.params.slidesPerGroup):e.snapGrid.length;if(e.params.loop?(d=Math.ceil((e.activeIndex-e.loopedSlides)/e.params.slidesPerGroup),d>s-1-2*e.loopedSlides&&(d-=s-2*e.loopedSlides),d>p-1&&(d-=p),d<0&&"bullets"!==e.params.paginationType&&(d=p+d)):d="undefined"!==typeof e.snapIndex?e.snapIndex:e.activeIndex||0,"bullets"===r.type&&e.pagination.bullets&&e.pagination.bullets.length>0){const n=e.pagination.bullets;let s,o,p;if(r.dynamicBullets&&(a=n.eq(0)[e.isHorizontal()?"outerWidth":"outerHeight"](!0),c.css(e.isHorizontal()?"width":"height",a*(r.dynamicMainBullets+4)+"px"),r.dynamicMainBullets>1&&void 0!==e.previousIndex&&(i+=d-(e.previousIndex-e.loopedSlides||0),i>r.dynamicMainBullets-1?i=r.dynamicMainBullets-1:i<0&&(i=0)),s=Math.max(d-i,0),o=s+(Math.min(n.length,r.dynamicMainBullets)-1),p=(o+s)/2),n.removeClass(["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${r.bulletActiveClass}${e}`)).join(" ")),c.length>1)n.each((e=>{const t=g(e),n=t.index();n===d&&t.addClass(r.bulletActiveClass),r.dynamicBullets&&(n>=s&&n<=o&&t.addClass(`${r.bulletActiveClass}-main`),n===s&&l(t,"prev"),n===o&&l(t,"next"))}));else{const t=n.eq(d),a=t.index();if(t.addClass(r.bulletActiveClass),r.dynamicBullets){const t=n.eq(s),i=n.eq(o);for(let e=s;e<=o;e+=1)n.eq(e).addClass(`${r.bulletActiveClass}-main`);if(e.params.loop)if(a>=n.length){for(let e=r.dynamicMainBullets;e>=0;e-=1)n.eq(n.length-e).addClass(`${r.bulletActiveClass}-main`);n.eq(n.length-r.dynamicMainBullets-1).addClass(`${r.bulletActiveClass}-prev`)}else l(t,"prev"),l(i,"next");else l(t,"prev"),l(i,"next")}}if(r.dynamicBullets){const s=Math.min(n.length,r.dynamicMainBullets+4),i=(a*s-a)/2-p*a,o=t?"right":"left";n.css(e.isHorizontal()?o:"top",`${i}px`)}}if("fraction"===r.type&&(c.find(ne(r.currentClass)).text(r.formatFractionCurrent(d+1)),c.find(ne(r.totalClass)).text(r.formatFractionTotal(p))),"progressbar"===r.type){let t;t=r.progressbarOpposite?e.isHorizontal()?"vertical":"horizontal":e.isHorizontal()?"horizontal":"vertical";const n=(d+1)/p;let s=1,a=1;"horizontal"===t?s=n:a=n,c.find(ne(r.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${s}) scaleY(${a})`).transition(e.params.speed)}"custom"===r.type&&r.renderCustom?(c.html(r.renderCustom(e,d+1,p)),n("paginationRender",c[0])):n("paginationUpdate",c[0]),e.params.watchOverflow&&e.enabled&&c[e.isLocked?"addClass":"removeClass"](r.lockClass)}function d(){const t=e.params.pagination;if(o())return;const r=e.virtual&&e.params.virtual.enabled?e.virtual.slides.length:e.slides.length,s=e.pagination.$el;let a="";if("bullets"===t.type){let n=e.params.loop?Math.ceil((r-2*e.loopedSlides)/e.params.slidesPerGroup):e.snapGrid.length;e.params.freeMode&&e.params.freeMode.enabled&&!e.params.loop&&n>r&&(n=r);for(let r=0;r<n;r+=1)t.renderBullet?a+=t.renderBullet.call(e,r,t.bulletClass):a+=`<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`;s.html(a),e.pagination.bullets=s.find(ne(t.bulletClass))}"fraction"===t.type&&(a=t.renderFraction?t.renderFraction.call(e,t.currentClass,t.totalClass):`<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`,s.html(a)),"progressbar"===t.type&&(a=t.renderProgressbar?t.renderProgressbar.call(e,t.progressbarFillClass):`<span class="${t.progressbarFillClass}"></span>`,s.html(a)),"custom"!==t.type&&n("paginationRender",e.pagination.$el[0])}function p(){e.params.pagination=te(e,e.originalParams.pagination,e.params.pagination,{el:"swiper-pagination"});const t=e.params.pagination;if(!t.el)return;let r=g(t.el);0!==r.length&&(e.params.uniqueNavElements&&"string"===typeof t.el&&r.length>1&&(r=e.$el.find(t.el),r.length>1&&(r=r.filter((t=>g(t).parents(".swiper")[0]===e.el)))),"bullets"===t.type&&t.clickable&&r.addClass(t.clickableClass),r.addClass(t.modifierClass+t.type),r.addClass(e.isHorizontal()?t.horizontalClass:t.verticalClass),"bullets"===t.type&&t.dynamicBullets&&(r.addClass(`${t.modifierClass}${t.type}-dynamic`),i=0,t.dynamicMainBullets<1&&(t.dynamicMainBullets=1)),"progressbar"===t.type&&t.progressbarOpposite&&r.addClass(t.progressbarOppositeClass),t.clickable&&r.on("click",ne(t.bulletClass),(function(t){t.preventDefault();let r=g(this).index()*e.params.slidesPerGroup;e.params.loop&&(r+=e.loopedSlides),e.slideTo(r)})),Object.assign(e.pagination,{$el:r,el:r[0]}),e.enabled||r.addClass(t.lockClass))}function u(){const t=e.params.pagination;if(o())return;const r=e.pagination.$el;r.removeClass(t.hiddenClass),r.removeClass(t.modifierClass+t.type),r.removeClass(e.isHorizontal()?t.horizontalClass:t.verticalClass),e.pagination.bullets&&e.pagination.bullets.removeClass&&e.pagination.bullets.removeClass(t.bulletActiveClass),t.clickable&&r.off("click",ne(t.bulletClass))}r("init",(()=>{!1===e.params.pagination.enabled?f():(p(),d(),c())})),r("activeIndexChange",(()=>{(e.params.loop||"undefined"===typeof e.snapIndex)&&c()})),r("snapIndexChange",(()=>{e.params.loop||c()})),r("slidesLengthChange",(()=>{e.params.loop&&(d(),c())})),r("snapGridLengthChange",(()=>{e.params.loop||(d(),c())})),r("destroy",(()=>{u()})),r("enable disable",(()=>{const{$el:t}=e.pagination;t&&t[e.enabled?"removeClass":"addClass"](e.params.pagination.lockClass)})),r("lock unlock",(()=>{c()})),r("click",((t,r)=>{const s=r.target,{$el:a}=e.pagination;if(e.params.pagination.el&&e.params.pagination.hideOnClick&&a&&a.length>0&&!g(s).hasClass(e.params.pagination.bulletClass)){if(e.navigation&&(e.navigation.nextEl&&s===e.navigation.nextEl||e.navigation.prevEl&&s===e.navigation.prevEl))return;const t=a.hasClass(e.params.pagination.hiddenClass);n(!0===t?"paginationShow":"paginationHide"),a.toggleClass(e.params.pagination.hiddenClass)}}));const f=()=>{e.$el.addClass(e.params.pagination.paginationDisabledClass),e.pagination.$el&&e.pagination.$el.addClass(e.params.pagination.paginationDisabledClass),u()};Object.assign(e.pagination,{enable:()=>{e.$el.removeClass(e.params.pagination.paginationDisabledClass),e.pagination.$el&&e.pagination.$el.removeClass(e.params.pagination.paginationDisabledClass),p(),d(),c()},disable:f,render:d,update:c,init:p,destroy:u})}function ae({swiper:e,extendParams:t,on:r}){function n(e,t){const r=function(){let e,t,r;return(n,s)=>{for(t=-1,e=n.length;e-t>1;)r=e+t>>1,n[r]<=s?t=r:e=r;return e}}();let n,s;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(s=r(this.x,e),n=s-1,(e-this.x[n])*(this.y[s]-this.y[n])/(this.x[s]-this.x[n])+this.y[n]):0},this}function s(){e.controller.control&&e.controller.spline&&(e.controller.spline=void 0,delete e.controller.spline)}t({controller:{control:void 0,inverse:!1,by:"slide"}}),e.controller={control:void 0},r("beforeInit",(()=>{e.controller.control=e.params.controller.control})),r("update",(()=>{s()})),r("resize",(()=>{s()})),r("observerUpdate",(()=>{s()})),r("setTranslate",((t,r,n)=>{e.controller.control&&e.controller.setTranslate(r,n)})),r("setTransition",((t,r,n)=>{e.controller.control&&e.controller.setTransition(r,n)})),Object.assign(e.controller,{setTranslate:function(t,r){const s=e.controller.control;let a,i;const o=e.constructor;function l(t){const r=e.rtlTranslate?-e.translate:e.translate;"slide"===e.params.controller.by&&(!function(t){e.controller.spline||(e.controller.spline=e.params.loop?new n(e.slidesGrid,t.slidesGrid):new n(e.snapGrid,t.snapGrid))}(t),i=-e.controller.spline.interpolate(-r)),i&&"container"!==e.params.controller.by||(a=(t.maxTranslate()-t.minTranslate())/(e.maxTranslate()-e.minTranslate()),i=(r-e.minTranslate())*a+t.minTranslate()),e.params.controller.inverse&&(i=t.maxTranslate()-i),t.updateProgress(i),t.setTranslate(i,e),t.updateActiveIndex(),t.updateSlidesClasses()}if(Array.isArray(s))for(let e=0;e<s.length;e+=1)s[e]!==r&&s[e]instanceof o&&l(s[e]);else s instanceof o&&r!==s&&l(s)},setTransition:function(t,r){const n=e.constructor,s=e.controller.control;let a;function i(r){r.setTransition(t,e),0!==t&&(r.transitionStart(),r.params.autoHeight&&v((()=>{r.updateAutoHeight()})),r.$wrapperEl.transitionEnd((()=>{s&&(r.params.loop&&"slide"===e.params.controller.by&&r.loopFix(),r.transitionEnd())})))}if(Array.isArray(s))for(a=0;a<s.length;a+=1)s[a]!==r&&s[a]instanceof n&&i(s[a]);else s instanceof n&&r!==s&&i(s)}})}}}]);