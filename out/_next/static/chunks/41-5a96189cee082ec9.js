(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[41],{6041:function(e,t,n){"use strict";n.d(t,{Z:function(){return f}});var a=n(3319),r=n(7294),s=n(1163),o=n(2010),i=n(4184),l=n.n(i),c=n(3888),d=n.n(c),m=n(5893),u=void 0,x=!1,p=function(){var e=(0,o.F)(),t=e.theme,n=e.setTheme,i=(0,r.useState)("#about-us"),c=i[0],p=i[1],h=(0,s.useRouter)(),f=(0,r.useMemo)((function(){return[{title:"Home",slug:"#about-us"},{title:"Objectives",slug:"#objectives"},{title:"Hamsterbox",slug:"#hamsterbox"}]}),[]),v=function(){var e,t,n=document.getElementById("mobile-toggle"),a=document.getElementById("mobile-menu");null===n||void 0===n||null===(e=n.classList)||void 0===e||e.toggle(d().active),null===a||void 0===a||null===(t=a.classList)||void 0===t||t.toggle(d().active)},g=function(e,t){var n=h.asPath;if(n&&"/"!==n&&!n.startsWith("/#"))return h.push("/".concat(e));p(e);var a=document.getElementById(null===e||void 0===e?void 0:e.split("#")[1]);a&&(history.pushState({},"","/".concat(e)),window.location.href.includes("#")&&window.scrollBy({top:a.getBoundingClientRect().top-(t||200),left:0,behavior:"smooth"}))},b=(0,r.useMemo)((function(){return function(){var e=h.asPath;return!("/"!==e&&!e.startsWith("/#"))}}),[h]);return(0,r.useEffect)((function(){window.addEventListener("scroll",(function(){var e=["about-us","objectives","hamsterbox"],t=e.map((function(e){return document.getElementById(e)}));t.map((function(n,a){void 0!==(null===n||void 0===n?void 0:n.offsetTop)&&pageYOffset>=(null===n||void 0===n?void 0:n.offsetTop)-450&&p("#".concat(e[a])),a===t.length-1&&void 0!==(null===n||void 0===n?void 0:n.offsetTop)&&pageYOffset+(null===n||void 0===n?void 0:n.offsetHeight)>=(null===n||void 0===n?void 0:n.offsetTop)&&p("#".concat(e[a]))}))}))}),[]),(0,r.useEffect)((function(){h.asPath.includes("#")&&p("#".concat(h.asPath.split("#")[1]))}),[]),(0,r.useEffect)((function(){var e=document.getElementById("app-header"),t="scrolled-header";window.onscroll=function(){document.body.scrollTop>120||document.documentElement.scrollTop>120?(null===e||void 0===e||!e.classList.contains(t))&&(null===e||void 0===e||e.classList.add("scrolled-header")):(null===e||void 0===e?void 0:e.classList.contains(t))&&(null===e||void 0===e||e.classList.remove("scrolled-header"))}}),[]),(0,r.useEffect)((function(){var e=document.getElementById("theme-checkbox");"dark"===t?e.checked=!0:"system"===t&&a.$.withInterval((function(){!0!==x?window.matchMedia("(prefers-color-scheme: dark)").matches?(n("dark"),e.checked=!0):(n("light"),e.checked=!1):clearInterval(u)}),500)}),[]),(0,r.useEffect)((function(){var e=document.documentElement.classList;document.documentElement.setAttribute("data-theme",t),"dark"===t?!e.contains("dark")&&document.documentElement.classList.add("dark"):e.contains("dark")&&document.documentElement.classList.remove("dark")}),[t]),(0,m.jsx)("div",{className:"app-header border-borderColor dark:border-borderColorDark border-b-[0.5px]",id:"app-header",children:(0,m.jsxs)("div",{className:"py-[18px] md:py-[25px] pl-[20px] pr-0 md:px-[40px] lg:px-[40px] lg:max-w-[1180px] lg:mx-auto flow-root",children:[(0,m.jsx)("div",{className:"float-left logo-wrapper md:mt-0 mt-[0px]",children:(0,m.jsxs)("a",{href:"/",children:[(0,m.jsx)("img",{src:"/assets/images/logo.png",className:"w-[95px] md:w-[149px] dark:hidden"}),(0,m.jsx)("img",{src:"/assets/images/logo-dark.png",className:"w-[95px] md:w-[149px] hidden dark:block"})]})}),(0,m.jsxs)("div",{className:"relative flex items-center float-right right-[16px]",children:[(0,m.jsxs)("div",{className:"float-right relative",children:[(0,m.jsx)("input",{type:"checkbox",className:"theme-checkbox",id:"theme-checkbox",onChange:function(){x=!0,n("dark"===t?"light":"dark")}}),(0,m.jsx)("label",{htmlFor:"theme-checkbox",className:"theme-label cursor-pointer",children:(0,m.jsxs)("div",{className:"theme-ball flex items-center",children:[(0,m.jsx)("img",{src:"/assets/images/light-icon.svg",className:"w-[9px] h-[9px] mx-auto dark:hidden"}),(0,m.jsx)("img",{src:"/assets/images/dark-icon.svg",className:"w-[9px] h-[9px] mx-auto hidden dark:block"})]})})]}),(0,m.jsx)("div",{className:"flex items-center float-right",children:(0,m.jsxs)("div",{className:l()(d()["toggle-button"],"block md:hidden ml-[20px]"),id:"mobile-toggle",onClick:v.bind(u),children:[(0,m.jsx)("span",{className:l()(d().bar,d().top,"bg-strongTitle dark:bg-strongTitleDark")}),(0,m.jsx)("span",{className:l()(d().bar,d().middle,"bg-strongTitle dark:bg-strongTitleDark")}),(0,m.jsx)("span",{className:l()(d().bar,d().bottom,"bg-strongTitle dark:bg-strongTitleDark")})]})})]}),(0,m.jsx)("div",{className:"hidden md:flex float-right memu-wrapper flex items-center md:pr-[40px]",children:(0,m.jsx)("ul",{className:"menu-container float-left",children:f.map((function(e,t){return(0,m.jsx)("li",{className:"float-left md:mr-[40px] lg:mr-[40px]",onClick:function(){return g(e.slug)},children:(0,m.jsx)("a",{className:l()("font-[16px] uppercase cursor-pointer",d()["desktop-menu-text"],{"text-menuItemSelected":e.slug===c&&b(),"dark:text-menuItemSelectedDark":e.slug===c&&b(),"text-menuItem":e.slug!==c||!b(),"dark:text-menuItemDark":e.slug!==c||!b()}),children:e.title})},"desktop-menu-item-".concat(t))}))})}),(0,m.jsx)("div",{className:l()(d()["mobile-nav"]),children:(0,m.jsx)("div",{className:l()(d()["menu-container"],"pt-[20%]"),id:"mobile-menu",children:(0,m.jsx)("ul",{className:d()["mobile-menu"],children:f.map((function(e,t){return(0,m.jsx)("li",{children:(0,m.jsxs)("a",{className:l()("mt-[30px] md:mt-[60px]",{active:e.slug===c}),onClick:function(){g(e.slug,200),v()},children:[(0,m.jsx)("div",{className:"hidden-layer"}),(0,m.jsx)("button",{className:"shown-layer",children:(0,m.jsx)("p",{className:"uppercase text-[16px] md:text-[32px] bold-text",children:e.title})})]})},"mobile-menu-".concat(t))}))})})})]})})},h=function(){var e=(0,r.useMemo)((function(){return[{name:"About Us",uri:"https://cavies.notion.site/About-Cavies-72e60c00426b450e8e57ca3ea5acb0d0"},{name:"Blog",uri:"https://cavies.notion.site/b4ff0745a92144aaaccf5b052d92b540?v=7891d7724e1349a5943c8a101174af5c"},{name:"Careers",uri:"https://cavies.notion.site/Job-Board-320ac7987dc64a53b0d3d3e7c52c5ce7"},{name:"Legal Notice",uri:"/legal/legal-notice",newWindow:!1},{name:"Privacy Notice",uri:"/legal/privacy-notice",newWindow:!1},{name:"Media Kit",uri:"https://cavies.notion.site/59aa5e24fdb146359cdd3cb9336aef45?v=83eedde046594e689d7fabf8932a7284"}]}),[]),t=(0,r.useMemo)((function(){return[{image:"/assets/images/twitter.svg",uri:"https://twitter.com/CaviesLabs"}]}),[]);return(0,m.jsx)("div",{className:"footer pt-[80px]",children:(0,m.jsx)("div",{className:"border-t-[#D2D7DF] dark:border-t-borderColorDark border-t-[1px]",children:(0,m.jsxs)("div",{className:"md:px-[40px] px-[20px] lg:max-w-[1180px] lg:mx-auto",children:[(0,m.jsxs)("div",{className:"flex items-center pt-[20px]",children:[(0,m.jsxs)("div",{className:"md:float-left logo-wrapper w-[100%] md:w-[60%] lg:w-[70%]",children:[(0,m.jsx)("img",{src:"/assets/images/logo.png",className:"w-[75px] md:w-[79.62px] ml-auto mr-auto md:ml-[0px] dark:hidden"}),(0,m.jsx)("img",{src:"/assets/images/logo-dark.png",className:"w-[75px] md:w-[79.62px] ml-auto mr-auto md:ml-[0px] hidden dark:block"})]}),(0,m.jsx)("div",{className:"md:float-right menu-wrapper py-[20px] w-[100%] hidden md:block",children:(0,m.jsx)("ul",{className:"footer-menu w-[100%]",children:t.map((function(e,t){return(0,m.jsx)("li",{className:"ml-[20px] md:ml-[30px] cursor-pointer float-right",onClick:function(){return window.open(e.uri)},children:(0,m.jsx)("img",{src:e.image,className:"text-[10px] md:text-[16px] w-[15px] h-[15px] md:w-[18px] md:h-[18px]"})},"footer-item-".concat(t))}))})})]}),(0,m.jsxs)("div",{className:"flex",children:[(0,m.jsx)("div",{className:"bottom-menu-wrapper float-left w-[60%] md:w-[27%] lg:w-[60%] hidden md:block",children:(0,m.jsx)("p",{className:"text-footerItemColor dark:text-footerItemColorDark text-[12px] md:text-[14px] mr-[20px] regular-text",children:"\xa9 2022 Cavies Ltd."})}),(0,m.jsx)("div",{className:"float-right menu-wrapper w-[100%] md:pt-0 pt-[20px]",children:(0,m.jsx)("ul",{className:"footer-menu w-[100%] flex justify-center flex-wrap md:justify-end",children:e.map((function(e,t){return(0,m.jsx)("li",{className:"md:float-right mx-[10px] md:mx-0 md:ml-[30px] cursor-pointer float-left text-center leading-[35px] md:leading-[25px]",children:(0,m.jsx)("a",{target:!1===e.newWindow?"":"_blank",href:e.uri,className:"text-[14px] md:text-[14px] normal-text text-footerItemColor dark:text-footerItemColorDark normal-text",children:e.name})},"footer-item-".concat(t))}))})})]}),(0,m.jsxs)("div",{className:"block md:hidden pt-[20px]",children:[(0,m.jsx)("div",{children:(0,m.jsx)("ul",{className:"footer-menu w-[100%] flex justify-center",children:t.map((function(e,t){return(0,m.jsx)("li",{className:"mx-[20px] md:ml-[30px] cursor-pointer",onClick:function(){return window.open(e.uri)},children:(0,m.jsx)("img",{src:e.image,className:"w-[18.8px] h-[18.8px] md:w-[18px] md:h-[18px]"})},"footer-item-".concat(t))}))})}),(0,m.jsx)("div",{className:"pt-[20px]",children:(0,m.jsx)("p",{className:"text-footerItemColor dark:text-footerItemColorDark text-[12px] md:text-[14px] cursor-pointer normal-text text-center",children:"\xa9 2022 Cavies Ltd."})})]})]})})})},f=function(e){var t=e.children;return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)("div",{className:"main-layout",children:[(0,m.jsx)(p,{}),(0,m.jsx)("div",{className:"content-wrapper",children:t}),(0,m.jsx)(h,{})]})})}},3319:function(e,t,n){"use strict";n.d(t,{$:function(){return d}});var a=n(29),r=n(2777),s=n(2262),o=n(7794),i=n.n(o),l=n(7191),c=function(){function e(){(0,r.Z)(this,e)}return(0,s.Z)(e,[{key:"scrollTo",value:function(e,t,n){var a=e.scrollTop,r=t-a,s=+new Date;!function o(){var i,l,c,d=+new Date-s;e.scrollTop=parseInt((i=d,l=a,c=r,(i/=n/2)<1?c/2*i*i+l:-c/2*(--i*(i-2)-1)+l)),d<n?requestAnimationFrame(o):e.scrollTop=t}()}},{key:"randomize",value:function(){var e=(new Date).getUTCMilliseconds().toString();return(0,l.encode)((new TextEncoder).encode(e))}},{key:"withInterval",value:function(e,t){var n=!1;return function r(){setTimeout((0,a.Z)(i().mark((function t(){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e();case 4:return t.next=6,r();case 6:case"end":return t.stop()}}),t)}))),t)}(),function(){n=!0}}},{key:"withTimeout",value:function(e,t){var n=this;return new Promise(function(){var r=(0,a.Z)(i().mark((function a(r,s){var o,l;return i().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return o=n.randomize(),l=o,setTimeout((function(){if(l===o)return console.log("Process exceeded ".concat(t," ms and returned null. Process: ").concat(e)),r(null)}),t),a.prev=3,a.next=6,e();case 6:return l=a.sent,a.abrupt("return",r(l));case 10:return a.prev=10,a.t0=a.catch(3),l="",a.abrupt("return",s(a.t0));case 14:case"end":return a.stop()}}),a,null,[[3,10]])})));return function(e,t){return r.apply(this,arguments)}}())}},{key:"makeShort",value:function(e,t){var n=e.split(" ");return n.length>t?n.splice(0,t).join(" ")+" ...":n.splice(0,t).join(" ")}}]),e}(),d=new c},3888:function(e){e.exports={"toggle-button":"header_toggle-button__tBD4T",bar:"header_bar__BTZ4U",middle:"header_middle__0xwPu",bottom:"header_bottom__lhESi",active:"header_active__0FzYZ",top:"header_top__RBLY3","mobile-nav":"header_mobile-nav__VYoPc","menu-container":"header_menu-container__v8UOw","mobile-menu":"header_mobile-menu__K5jVn","desktop-menu-text":"header_desktop-menu-text__sbZ2h"}}}]);