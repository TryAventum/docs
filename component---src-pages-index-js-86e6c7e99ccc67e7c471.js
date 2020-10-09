(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"8k0H":function(e,t,a){"use strict";var r=a("q1tI"),n=a.n(r),l=a("Wbzz"),s=a("pBi2"),c=a.n(s);function i(){var e="flex flex-col mb-4 p-2 md:w-1/2 lg:w-1/3",t="mb-2 hover:underline hover:text-brand-red";return n.a.createElement("footer",{className:"w-full "+c.a.Wrapper+" p-8 flex flex-col items-center footer pb-32 md:pb-8"},n.a.createElement("div",{className:"flex flex-wrap flex-col md:flex-row w-full md:w-3/4 max-w-screen-xl"},n.a.createElement("div",{className:e},n.a.createElement("h5",{className:"mb-3 font-bold"},"Docs"),n.a.createElement(l.Link,{className:t,to:"/docs/getting-started/"},"Getting Started"),n.a.createElement(l.Link,{className:t,to:"/tutorial/"},"Tutorial"),n.a.createElement(l.Link,{className:t,to:"/docs/front-end/"},"Frontend"),n.a.createElement(l.Link,{className:t,to:"/docs/api/"},"Deep Dive"),n.a.createElement(l.Link,{className:t,to:"/docs/deep-dive/"},"API")),n.a.createElement("div",{className:e},n.a.createElement("h5",{className:"mb-3 font-bold"},"Ecosystem"),n.a.createElement("a",{href:"https://github.com/TryAventum/server",className:t},"Server"),n.a.createElement("a",{href:"https://github.com/TryAventum/dashboard",className:t},"Dashboard"),n.a.createElement("a",{href:"https://github.com/TryAventum/Docsator",className:t},"Docsator"),n.a.createElement("a",{className:t,href:"https://github.com/TryAventum/hooks"},"Hooks")),n.a.createElement("div",{className:e},n.a.createElement("h5",{className:"mb-3 font-bold"},"Links"),n.a.createElement("a",{className:t,href:"https://discord.gg/tmXT64N"},"Discord"),n.a.createElement("a",{className:t,href:"https://github.com/TryAventum"},"GitHub"),n.a.createElement("a",{className:t,href:"https://www.npmjs.com/org/aventum"},"npm"))),n.a.createElement(l.Link,{to:"/",className:"mb-2"},n.a.createElement("img",{src:"/img/Aventum_Red_Logo.svg",alt:"Aventum",width:"170",height:"45"})),n.a.createElement("div",{className:""},"© 2020"))}var o=function(e){return{isDocsActive:function(t){var a=t.location;return!a.pathname.startsWith("/docs/api")&&a.pathname.startsWith("/docs")?{className:e}:{}},isApiActive:function(t){return t.location.pathname.startsWith("/docs/api")?{className:e}:{}}}},m=a("ma3e");function d(){var e="px-4 lg:px-4 text-gray-500 hover:text-brand-red h-16 flex items-center text-2xl",t="font-bold text-brand-red border-b-4 border-brand-red "+e,a=o(t),r=a.isDocsActive,s=a.isApiActive,c={lineHeight:"4rem"};return n.a.createElement("div",{className:"md:hidden fixed bottom-0 w-full flex bg-white justify-evenly",style:{boxShadow:"0 1px 15px rgba(27,31,35,.15), 0 0 1px rgba(106,115,125,.35)"}},n.a.createElement(l.Link,{className:e,to:"/docs/",style:c,getProps:r,title:"Docs"},n.a.createElement(m.c,null)),n.a.createElement(l.Link,{className:e,to:"/tutorial/",style:c,partiallyActive:!0,activeClassName:""+t,title:"Tutorial"},n.a.createElement(m.g,null)),n.a.createElement(l.Link,{className:e,style:c,to:"/docs/api/",getProps:s,title:"API"},n.a.createElement(m.d,null)))}var u=a("WTre"),p=a.n(u);function f(){var e="block px-4 lg:px-4 text-gray-500 hover:text-brand-red h-16",t={lineHeight:"4rem"},a="font-bold text-brand-red border-b-4 border-brand-red "+e,r=o(a),s=r.isDocsActive,c=r.isApiActive;return n.a.createElement("nav",{className:p.a.Wrapper+" bg-white shadow",role:"navigation"},n.a.createElement("div",{className:"h-16 container mx-auto flex items-center"},n.a.createElement(l.Link,{to:"/",rel:"home",className:"pl-2"},n.a.createElement("img",{className:"h-8",height:"54",src:"/img/Aventum_Red_Logo.svg",alt:"Aventum"})),n.a.createElement("ul",{className:"flex ml-auto"},n.a.createElement("li",{className:"hidden md:inline"},n.a.createElement(l.Link,{className:e,to:"/docs/",style:t,getProps:s,title:"Docs"},"Docs")),n.a.createElement("li",{className:"hidden md:inline"},n.a.createElement(l.Link,{className:e,to:"/tutorial/",style:t,partiallyActive:!0,activeClassName:""+a,title:"Tutorial"},"Tutorial")),n.a.createElement("li",{className:"hidden md:inline"},n.a.createElement(l.Link,{className:e,style:t,to:"/docs/api/",getProps:c,title:"API"},"API")),n.a.createElement("li",{className:e+" flex items-center text-2xl"},n.a.createElement("a",{href:"https://github.com/TryAventum"},n.a.createElement(m.f,null))),n.a.createElement("li",{className:e+" flex items-center text-2xl"},n.a.createElement("a",{href:"https://discord.gg/tmXT64N"},n.a.createElement(m.e,null))))))}var h=a("WboA"),v=a.n(h);function g(){return n.a.createElement("header",{className:"z-10 "+v.a.header+" fixed w-full"},n.a.createElement(f,null))}t.a=function(e){var t=e.children,a=e.wrapperClass;return n.a.createElement("div",{className:"flex flex-col min-h-screen items-center "+a},n.a.createElement(g,null),t,n.a.createElement(i,null),n.a.createElement(d,null))}},"A1/l":function(e,t,a){e.exports={FeaturesWrapper:"Features-module--FeaturesWrapper--3RfYD"}},Lnxd:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var r=a("q1tI"),n={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=r.createContext&&r.createContext(n),s=function(){return(s=Object.assign||function(e){for(var t,a=1,r=arguments.length;a<r;a++)for(var n in t=arguments[a])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},c=function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&(a[r[n]]=e[r[n]])}return a};function i(e){return function(t){return r.createElement(o,s({attr:s({},e.attr)},t),function e(t){return t&&t.map((function(t,a){return r.createElement(t.tag,s({key:a},t.attr),e(t.child))}))}(e.child))}}function o(e){var t=function(t){var a,n=e.size||t.size||"1em";t.className&&(a=t.className),e.className&&(a=(a?a+" ":"")+e.className);var l=e.attr,i=e.title,o=c(e,["attr","title"]);return r.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,l,o,{className:a,style:s({color:e.color||t.color},t.style,e.style),height:n,width:n,xmlns:"http://www.w3.org/2000/svg"}),i&&r.createElement("title",null,i),e.children)};return void 0!==l?r.createElement(l.Consumer,null,(function(e){return t(e)})):t(n)}},RXBc:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return x}));var r=a("q1tI"),n=a.n(r),l=a("Wbzz");function s(e){var t=e.children,a=e.to,r=e.wrapperClass;return n.a.createElement(l.Link,{to:a,className:r+" bg-white hover:bg-brand-red hover:text-white text-brand-red border-brand-red border-2 font-bold py-2 px-4 transition-all duration-200",style:{boxShadow:"0 1px 15px rgba(27,31,35,.15), 0 0 1px rgba(106,115,125,.35)"}},t)}var c=a("masE"),i=a.n(c);function o(){var e=Object(l.useStaticQuery)("4006707078");return n.a.createElement("div",{className:i.a.Wrapper+" bg-white flex flex-col-reverse items-center p-6 md:flex-row justify-center min-h-screen overflow-hidden w-full"},n.a.createElement("div",{className:"flex items-center flex-col text-center mb-6 md:p-8 md:w-1/2"},n.a.createElement("div",{className:"w-1/2 md:block animated  fadeInDown"},n.a.createElement("img",{src:"/img/Aventum_Red_Logo.svg",alt:"Aventum Logo"})),n.a.createElement("h2",{className:"text-3xl mb-4 animated bounceIn delay-1s"},""+e.site.siteMetadata.tagline),n.a.createElement("div",{className:"flex items-center"},n.a.createElement(s,{wrapperClass:"animated fadeInLeft delay-1s",to:"/docs/getting-started/installation/"},"Get Started"),n.a.createElement("a",{className:"ml-2 hover:text-brand-red animated fadeInRight delay-1s",href:"#why"},"Why Aventum?"))),n.a.createElement("div",{className:"w-3/4 md:w-1/2 md:p-8"},n.a.createElement("img",{className:"animated fadeInRight",src:"/img/undraw_content_vbqo.svg",alt:"Content"})))}var m=a("A1/l"),d=a.n(m);function u(){return n.a.createElement("div",{className:"p-5 md:p-16 max-w-screen-xl"},n.a.createElement("div",{className:"p-8 flex flex-wrap "+d.a.FeaturesWrapper},[{content:"PostgreSQL/MySQL/MariaDB/MongoDB and much more!",image:"/img/features/undraw_server_status_5pbv.svg",title:"SQL/NoSQL"},{content:"Everything is automatically cached using Redis for optimal performance and speed!",image:"/img/features/undraw_speed_test_wxl0.svg",title:"Redis"},{content:"English/Arabic & RTL/LTR and we will be more than happy to add your language!",image:"/img/features/undraw_around_the_world_v9nu.svg",title:"i18n & RTL"},{content:"Visual Access Control List builder, create your complex ACL per content type.",image:"/img/features/undraw_subscriptions_1xdv.svg",title:"ACL"},{content:"Out of the box user management with roles and capabilities.",image:"/img/features/undraw_add_user_ipe3.svg",title:"Users/Roles/Capabilities"},{content:"One language JavaScript, the frontend uses React and the backend uses Node.js",image:"/img/features/undraw_web_developer_p3e5.svg",title:"One Language!"},{content:"Don't worry about brute force and other attacks, we took care of them!",image:"/img/features/undraw_secure_server_s9u8.svg",title:"Secure!"},{content:"Aventum extends easily using a WordPress like extensions system!",image:"/img/features/undraw_add_content_d1tf.svg",title:"Extendability!"},{content:"Completely free and open source!",image:"/img/features/undraw_open_source_1qxw.svg",title:"MIT"}].map((function(e){return n.a.createElement("div",{key:e.title,className:"flex flex-col justify-center w-full md:w-2/6 p-6 items-center text-center"},n.a.createElement("img",{className:"w-2/5",src:e.image,alt:"Aventum Logo"}),n.a.createElement("h3",{className:"font-bold mb-3 mt-6 text-brand-red"},e.title),n.a.createElement("p",null,e.content))}))))}var p=a("uh8H"),f=a.n(p);function h(e){var t=e.title,a=e.content,r=e.img,l=e.imageAlinement,s=e.id;return n.a.createElement("div",{className:"p-5 md:p-16 max-w-screen-xl",id:s},n.a.createElement("div",{className:"p-8 flex flex-col md:flex-row "+f.a.InnerWrapper},n.a.createElement("div",{className:"md:w-1/2 p-8 "+("right"===l?"order-1":"order-2")},n.a.createElement("img",{src:r,alt:t})),n.a.createElement("div",{className:"md:w-1/2 p-8 flex flex-col justify-center "+("right"===l?"order-2":"order-1")},n.a.createElement("h2",{className:"font-bold mb-3 text-2xl text-brand-red"},t),n.a.createElement("p",null,a))))}var v=a("8k0H"),g=a("vGFT"),b=a.n(g),x=(t.default=function(e){e.data;return n.a.createElement(v.a,{wrapperClass:b.a.Wrapper},n.a.createElement("div",{className:"flex flex-col items-center"},n.a.createElement(o,null),n.a.createElement(u,null),n.a.createElement(h,{title:"What is Aventum?",content:"Aventum is high performance and speeds open source Headless CMS, or you can call it API visual builder or Headless CMS visual builder because it is content agnostic, create your own content, no matter how complex it was!",img:"/img/undraw_feeling_proud_qne1.svg",id:"what"}),n.a.createElement(h,{title:"Why Aventum?",imageAlinement:"right",content:"Did you suffer from creating a backend server and dashboard and set up a database schemas for each app and always one backend is slightly different from the other? are you a frontend developer that hates to work with the backend and wished if there is a magic solution for this issue? meet Aventum!",img:"/img/undraw_a_moment_to_relax_bbpa.svg",id:"why"})))},"4006707078")},WTre:function(e,t,a){e.exports={Wrapper:"Navbar-module--Wrapper--1OnIE"}},WboA:function(e,t,a){e.exports={header:"Header-module--header--1Op28"}},masE:function(e,t,a){e.exports={Wrapper:"Hero-module--Wrapper--2fibk"}},pBi2:function(e,t,a){e.exports={Wrapper:"Footer-module--Wrapper--3EKIV"}},uh8H:function(e,t,a){e.exports={InnerWrapper:"Block-module--InnerWrapper--3x38N"}},vGFT:function(e,t,a){e.exports={Wrapper:"index-module--Wrapper--2Xv5_"}}}]);
//# sourceMappingURL=component---src-pages-index-js-86e6c7e99ccc67e7c471.js.map