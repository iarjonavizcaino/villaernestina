"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8592],{1320:(M,w,u)=>{u.d(w,{c:()=>l});var d=u(1308),m=u(7864),h=u(1898);const l=(a,o)=>{let n,e;const t=(c,f,p)=>{if(typeof document>"u")return;const _=document.elementFromPoint(c,f);_&&o(_)?_!==n&&(i(),s(_,p)):i()},s=(c,f)=>{n=c,e||(e=n);const p=n;(0,d.c)(()=>p.classList.add("ion-activated")),f()},i=(c=!1)=>{if(!n)return;const f=n;(0,d.c)(()=>f.classList.remove("ion-activated")),c&&e!==n&&n.click(),n=void 0};return(0,h.createGesture)({el:a,gestureName:"buttonActiveDrag",threshold:0,onStart:c=>t(c.currentX,c.currentY,m.a),onMove:c=>t(c.currentX,c.currentY,m.b),onEnd:()=>{i(!0),(0,m.h)(),e=void 0}})}},2225:(M,w,u)=>{u.d(w,{g:()=>d});const d=(o,n,e,t,s)=>h(o[1],n[1],e[1],t[1],s).map(i=>m(o[0],n[0],e[0],t[0],i)),m=(o,n,e,t,s)=>s*(3*n*Math.pow(s-1,2)+s*(-3*e*s+3*e+t*s))-o*Math.pow(s-1,3),h=(o,n,e,t,s)=>a((t-=s)-3*(e-=s)+3*(n-=s)-(o-=s),3*e-6*n+3*o,3*n-3*o,o).filter(c=>c>=0&&c<=1),a=(o,n,e,t)=>{if(0===o)return((o,n,e)=>{const t=n*n-4*o*e;return t<0?[]:[(-n+Math.sqrt(t))/(2*o),(-n-Math.sqrt(t))/(2*o)]})(n,e,t);const s=(3*(e/=o)-(n/=o)*n)/3,i=(2*n*n*n-9*n*e+27*(t/=o))/27;if(0===s)return[Math.pow(-i,1/3)];if(0===i)return[Math.sqrt(-s),-Math.sqrt(-s)];const c=Math.pow(i/2,2)+Math.pow(s/3,3);if(0===c)return[Math.pow(i/2,.5)-n/3];if(c>0)return[Math.pow(-i/2+Math.sqrt(c),1/3)-Math.pow(i/2+Math.sqrt(c),1/3)-n/3];const f=Math.sqrt(Math.pow(-s/3,3)),p=Math.acos(-i/(2*Math.sqrt(Math.pow(-s/3,3)))),_=2*Math.pow(f,1/3);return[_*Math.cos(p/3)-n/3,_*Math.cos((p+2*Math.PI)/3)-n/3,_*Math.cos((p+4*Math.PI)/3)-n/3]}},5062:(M,w,u)=>{u.d(w,{i:()=>d});const d=m=>m&&""!==m.dir?"rtl"===m.dir.toLowerCase():"rtl"===(null==document?void 0:document.dir.toLowerCase())},6602:(M,w,u)=>{u.r(w),u.d(w,{startFocusVisible:()=>l});const d="ion-focused",h=["Tab","ArrowDown","Space","Escape"," ","Shift","Enter","ArrowLeft","ArrowRight","ArrowUp","Home","End"],l=a=>{let o=[],n=!0;const e=a?a.shadowRoot:document,t=a||document.body,s=E=>{o.forEach(g=>g.classList.remove(d)),E.forEach(g=>g.classList.add(d)),o=E},i=()=>{n=!1,s([])},c=E=>{n=h.includes(E.key),n||s([])},f=E=>{if(n&&void 0!==E.composedPath){const g=E.composedPath().filter(v=>!!v.classList&&v.classList.contains("ion-focusable"));s(g)}},p=()=>{e.activeElement===t&&s([])};return e.addEventListener("keydown",c),e.addEventListener("focusin",f),e.addEventListener("focusout",p),e.addEventListener("touchstart",i),e.addEventListener("mousedown",i),{destroy:()=>{e.removeEventListener("keydown",c),e.removeEventListener("focusin",f),e.removeEventListener("focusout",p),e.removeEventListener("touchstart",i),e.removeEventListener("mousedown",i)},setFocus:s}}},7626:(M,w,u)=>{u.d(w,{C:()=>a,a:()=>h,d:()=>l});var d=u(5861),m=u(5730);const h=function(){var o=(0,d.Z)(function*(n,e,t,s,i,c){var f;if(n)return n.attachViewToDom(e,t,i,s);if(!(c||"string"==typeof t||t instanceof HTMLElement))throw new Error("framework delegate is missing");const p="string"==typeof t?null===(f=e.ownerDocument)||void 0===f?void 0:f.createElement(t):t;return s&&s.forEach(_=>p.classList.add(_)),i&&Object.assign(p,i),e.appendChild(p),yield new Promise(_=>(0,m.c)(p,_)),p});return function(e,t,s,i,c,f){return o.apply(this,arguments)}}(),l=(o,n)=>{if(n){if(o)return o.removeViewFromDom(n.parentElement,n);n.remove()}return Promise.resolve()},a=()=>{let o,n;return{attachViewToDom:function(){var s=(0,d.Z)(function*(i,c,f={},p=[]){var _,E;if(o=i,c){const v="string"==typeof c?null===(_=o.ownerDocument)||void 0===_?void 0:_.createElement(c):c;p.forEach(r=>v.classList.add(r)),Object.assign(v,f),o.appendChild(v),yield new Promise(r=>(0,m.c)(v,r))}else if(o.children.length>0&&!o.children[0].classList.contains("ion-delegate-host")){const r=null===(E=o.ownerDocument)||void 0===E?void 0:E.createElement("div");r.classList.add("ion-delegate-host"),p.forEach(y=>r.classList.add(y)),r.append(...o.children),o.appendChild(r)}const g=document.querySelector("ion-app")||document.body;return n=document.createComment("ionic teleport"),o.parentNode.insertBefore(n,o),g.appendChild(o),o});return function(c,f){return s.apply(this,arguments)}}(),removeViewFromDom:()=>(o&&n&&(n.parentNode.insertBefore(o,n),n.remove()),Promise.resolve())}}},7864:(M,w,u)=>{u.d(w,{a:()=>l,b:()=>a,c:()=>h,d:()=>n,h:()=>o});const d={getEngine(){var e;const t=window;return t.TapticEngine||(null===(e=t.Capacitor)||void 0===e?void 0:e.isPluginAvailable("Haptics"))&&t.Capacitor.Plugins.Haptics},available(){var e;const t=window;return!!this.getEngine()&&("web"!==(null===(e=t.Capacitor)||void 0===e?void 0:e.getPlatform())||typeof navigator<"u"&&void 0!==navigator.vibrate)},isCordova:()=>!!window.TapticEngine,isCapacitor:()=>!!window.Capacitor,impact(e){const t=this.getEngine();if(!t)return;const s=this.isCapacitor()?e.style.toUpperCase():e.style;t.impact({style:s})},notification(e){const t=this.getEngine();if(!t)return;const s=this.isCapacitor()?e.style.toUpperCase():e.style;t.notification({style:s})},selection(){this.impact({style:"light"})},selectionStart(){const e=this.getEngine();!e||(this.isCapacitor()?e.selectionStart():e.gestureSelectionStart())},selectionChanged(){const e=this.getEngine();!e||(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())},selectionEnd(){const e=this.getEngine();!e||(this.isCapacitor()?e.selectionEnd():e.gestureSelectionEnd())}},m=()=>d.available(),h=()=>{m()&&d.selection()},l=()=>{m()&&d.selectionStart()},a=()=>{m()&&d.selectionChanged()},o=()=>{m()&&d.selectionEnd()},n=e=>{m()&&d.impact(e)}},9582:(M,w,u)=>{u.d(w,{a:()=>d,b:()=>c,c:()=>n,d:()=>f,e:()=>D,f:()=>o,g:()=>p,h:()=>h,i:()=>m,j:()=>r,k:()=>y,l:()=>e,m:()=>s,n:()=>_,o:()=>t,p:()=>a,q:()=>l,r:()=>v,s:()=>C,t:()=>i,u:()=>E,v:()=>g});const d="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-miterlimit='10' stroke-width='48' d='M244 400L100 256l144-144M120 256h292' class='ionicon-fill-none'/></svg>",m="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 268l144 144 144-144M256 392V100' class='ionicon-fill-none'/></svg>",h="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M368 64L144 256l224 192V64z'/></svg>",l="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 144l192 224 192-224H64z'/></svg>",a="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M448 368L256 144 64 368h384z'/></svg>",o="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M416 128L192 384l-96-96' class='ionicon-fill-none ionicon-stroke-width'/></svg>",n="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M328 112L184 256l144 144' class='ionicon-fill-none'/></svg>",e="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144' class='ionicon-fill-none'/></svg>",t="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",s="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M184 112l144 144-144 144' class='ionicon-fill-none'/></svg>",i="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z'/></svg>",c="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z'/></svg>",f="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z'/></svg>",p="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='192' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>",_="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><circle cx='256' cy='256' r='48'/><circle cx='416' cy='256' r='48'/><circle cx='96' cy='256' r='48'/></svg>",E="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-miterlimit='10' d='M80 160h352M80 256h352M80 352h352' class='ionicon-fill-none ionicon-stroke-width'/></svg>",g="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M64 384h384v-42.67H64zm0-106.67h384v-42.66H64zM64 128v42.67h384V128z'/></svg>",v="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M400 256H112' class='ionicon-fill-none ionicon-stroke-width'/></svg>",r="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='round' stroke-linejoin='round' d='M96 256h320M96 176h320M96 336h320' class='ionicon-fill-none ionicon-stroke-width'/></svg>",y="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path stroke-linecap='square' stroke-linejoin='round' stroke-width='44' d='M118 304h276M118 208h276' class='ionicon-fill-none'/></svg>",C="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path stroke-linecap='round' stroke-miterlimit='10' d='M338.29 338.29L448 448' class='ionicon-fill-none ionicon-stroke-width'/></svg>",D="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><path d='M464 428L339.92 303.9a160.48 160.48 0 0030.72-94.58C370.64 120.37 298.27 48 209.32 48S48 120.37 48 209.32s72.37 161.32 161.32 161.32a160.48 160.48 0 0094.58-30.72L428 464zM209.32 319.69a110.38 110.38 0 11110.37-110.37 110.5 110.5 0 01-110.37 110.37z'/></svg>"},8416:(M,w,u)=>{u.d(w,{I:()=>a,a:()=>s,b:()=>o,c:()=>f,d:()=>_,f:()=>i,g:()=>t,i:()=>e,p:()=>p,r:()=>E,s:()=>c});var d=u(5861),m=u(5730),h=u(4147);const a="ion-content",o=".ion-content-scroll-host",n=`${a}, ${o}`,e=g=>"ION-CONTENT"===g.tagName,t=function(){var g=(0,d.Z)(function*(v){return e(v)?(yield new Promise(r=>(0,m.c)(v,r)),v.getScrollElement()):v});return function(r){return g.apply(this,arguments)}}(),s=g=>g.querySelector(o)||g.querySelector(n),i=g=>g.closest(n),c=(g,v)=>e(g)?g.scrollToTop(v):Promise.resolve(g.scrollTo({top:0,left:0,behavior:v>0?"smooth":"auto"})),f=(g,v,r,y)=>e(g)?g.scrollByPoint(v,r,y):Promise.resolve(g.scrollBy({top:r,left:v,behavior:y>0?"smooth":"auto"})),p=g=>(0,h.a)(g,a),_=g=>{if(e(g)){const r=g.scrollY;return g.scrollY=!1,r}return g.style.setProperty("overflow","hidden"),!0},E=(g,v)=>{e(g)?g.scrollY=v:g.style.removeProperty("overflow")}},9:(M,w,u)=>{u.d(w,{s:()=>d});const d=e=>{try{if(e instanceof n)return e.value;if(!l()||"string"!=typeof e||""===e)return e;const t=document.createDocumentFragment(),s=document.createElement("div");t.appendChild(s),s.innerHTML=e,o.forEach(p=>{const _=t.querySelectorAll(p);for(let E=_.length-1;E>=0;E--){const g=_[E];g.parentNode?g.parentNode.removeChild(g):t.removeChild(g);const v=h(g);for(let r=0;r<v.length;r++)m(v[r])}});const i=h(t);for(let p=0;p<i.length;p++)m(i[p]);const c=document.createElement("div");c.appendChild(t);const f=c.querySelector("div");return null!==f?f.innerHTML:c.innerHTML}catch(t){return console.error(t),""}},m=e=>{if(e.nodeType&&1!==e.nodeType)return;for(let s=e.attributes.length-1;s>=0;s--){const i=e.attributes.item(s),c=i.name;if(!a.includes(c.toLowerCase())){e.removeAttribute(c);continue}const f=i.value;null!=f&&f.toLowerCase().includes("javascript:")&&e.removeAttribute(c)}const t=h(e);for(let s=0;s<t.length;s++)m(t[s])},h=e=>null!=e.children?e.children:e.childNodes,l=()=>{var e;const t=window,s=null===(e=null==t?void 0:t.Ionic)||void 0===e?void 0:e.config;return!s||(s.get?s.get("sanitizerEnabled",!0):!0===s.sanitizerEnabled||void 0===s.sanitizerEnabled)},a=["class","id","href","src","name","slot"],o=["script","style","iframe","meta","link","object","embed"];class n{constructor(t){this.value=t}}},5234:(M,w,u)=>{u.r(w),u.d(w,{KEYBOARD_DID_CLOSE:()=>m,KEYBOARD_DID_OPEN:()=>d,copyVisualViewport:()=>v,keyboardDidClose:()=>p,keyboardDidOpen:()=>c,keyboardDidResize:()=>f,resetKeyboardAssist:()=>n,setKeyboardClose:()=>i,setKeyboardOpen:()=>s,startKeyboardAssist:()=>e,trackViewportChanges:()=>g});const d="ionKeyboardDidShow",m="ionKeyboardDidHide";let l={},a={},o=!1;const n=()=>{l={},a={},o=!1},e=r=>{t(r),r.visualViewport&&(a=v(r.visualViewport),r.visualViewport.onresize=()=>{g(r),c()||f(r)?s(r):p(r)&&i(r)})},t=r=>{r.addEventListener("keyboardDidShow",y=>s(r,y)),r.addEventListener("keyboardDidHide",()=>i(r))},s=(r,y)=>{_(r,y),o=!0},i=r=>{E(r),o=!1},c=()=>!o&&l.width===a.width&&(l.height-a.height)*a.scale>150,f=r=>o&&!p(r),p=r=>o&&a.height===r.innerHeight,_=(r,y)=>{const D=new CustomEvent(d,{detail:{keyboardHeight:y?y.keyboardHeight:r.innerHeight-a.height}});r.dispatchEvent(D)},E=r=>{const y=new CustomEvent(m);r.dispatchEvent(y)},g=r=>{l=Object.assign({},a),a=v(r.visualViewport)},v=r=>({width:Math.round(r.width),height:Math.round(r.height),offsetTop:r.offsetTop,offsetLeft:r.offsetLeft,pageTop:r.pageTop,pageLeft:r.pageLeft,scale:r.scale})},9852:(M,w,u)=>{u.d(w,{c:()=>m});var d=u(3457);const m=h=>{let l,a,o;const n=()=>{l=()=>{o=!0,h&&h(!0)},a=()=>{o=!1,h&&h(!1)},null==d.w||d.w.addEventListener("keyboardWillShow",l),null==d.w||d.w.addEventListener("keyboardWillHide",a)};return n(),{init:n,destroy:()=>{null==d.w||d.w.removeEventListener("keyboardWillShow",l),null==d.w||d.w.removeEventListener("keyboardWillHide",a),l=a=void 0},isKeyboardVisible:()=>o}}},7741:(M,w,u)=>{u.d(w,{S:()=>m});const m={bubbles:{dur:1e3,circles:9,fn:(h,l,a)=>{const o=h*l/a-h+"ms",n=2*Math.PI*l/a;return{r:5,style:{top:9*Math.sin(n)+"px",left:9*Math.cos(n)+"px","animation-delay":o}}}},circles:{dur:1e3,circles:8,fn:(h,l,a)=>{const o=l/a,n=h*o-h+"ms",e=2*Math.PI*o;return{r:5,style:{top:9*Math.sin(e)+"px",left:9*Math.cos(e)+"px","animation-delay":n}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:()=>({r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}})},crescent:{dur:750,circles:1,fn:()=>({r:26,style:{}})},dots:{dur:750,circles:3,fn:(h,l)=>({r:6,style:{left:9-9*l+"px","animation-delay":-110*l+"ms"}})},lines:{dur:1e3,lines:8,fn:(h,l,a)=>({y1:14,y2:26,style:{transform:`rotate(${360/a*l+(l<a/2?180:-180)}deg)`,"animation-delay":h*l/a-h+"ms"}})},"lines-small":{dur:1e3,lines:8,fn:(h,l,a)=>({y1:12,y2:20,style:{transform:`rotate(${360/a*l+(l<a/2?180:-180)}deg)`,"animation-delay":h*l/a-h+"ms"}})},"lines-sharp":{dur:1e3,lines:12,fn:(h,l,a)=>({y1:17,y2:29,style:{transform:`rotate(${30*l+(l<6?180:-180)}deg)`,"animation-delay":h*l/a-h+"ms"}})},"lines-sharp-small":{dur:1e3,lines:12,fn:(h,l,a)=>({y1:12,y2:20,style:{transform:`rotate(${30*l+(l<6?180:-180)}deg)`,"animation-delay":h*l/a-h+"ms"}})}}},9210:(M,w,u)=>{u.r(w),u.d(w,{createSwipeBackGesture:()=>a});var d=u(5730),m=u(5062),h=u(1898);u(4349);const a=(o,n,e,t,s)=>{const i=o.ownerDocument.defaultView,c=(0,m.i)(o),p=r=>c?-r.deltaX:r.deltaX;return(0,h.createGesture)({el:o,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:r=>(r=>{const{startX:C}=r;return c?C>=i.innerWidth-50:C<=50})(r)&&n(),onStart:e,onMove:r=>{const C=p(r)/i.innerWidth;t(C)},onEnd:r=>{const y=p(r),C=i.innerWidth,D=y/C,O=(r=>c?-r.velocityX:r.velocityX)(r),L=O>=0&&(O>.2||y>C/2),x=(L?1-D:D)*C;let b=0;if(x>5){const T=x/Math.abs(O);b=Math.min(T,540)}s(L,D<=0?.01:(0,d.l)(0,D,.9999),b)}})}},581:(M,w,u)=>{u.d(w,{e:()=>a});var d=u(6895),m=u(4006),h=u(1082),l=u(4650);let a=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=l.oAB({type:o}),o.\u0275inj=l.cJS({imports:[d.ez,m.u5,h.Pc]}),o})()},9588:(M,w,u)=>{u.d(w,{l:()=>a});var d=u(4004),m=u(4650),h=u(3101),l=u(4074);let a=(()=>{class o{constructor(e,t){this.firestore=e,this.router=t,this.getDate(),this.getHuespeds().subscribe(s=>{this.huespeds=s}),this.getRooms().subscribe(s=>{this.rooms=s})}getDate(){this.today=new Date,this.today=this.today.toISOString()}getHuespeds(){return this.firestore.collection("Huesped").snapshotChanges().pipe((0,d.U)(e=>e.map(t=>{const s=t.payload.doc.data();return Object.assign({id:t.payload.doc.id},s)})))}getHuespedsByTokenToShow(e){return this.firestore.collection("Huesped",t=>t.where("token","==",e)).snapshotChanges().pipe((0,d.U)(t=>t.map(s=>{const i=s.payload.doc.data();return Object.assign({id:s.payload.doc.id},i)})))}getRooms(){return this.firestore.collection("Room").snapshotChanges().pipe((0,d.U)(e=>e.map(t=>{const s=t.payload.doc.data();return Object.assign({id:t.payload.doc.id},s)})))}getHuespedByToken(e){return e&&null!=e?this.huespeds.find(t=>t.token===e):(this.router.navigate([""]),null)}getRoom(e){return this.rooms.find(t=>t.name===e)}getHuespedByRoom(e){return this.firestore.collection("Huesped",s=>s.where("room","==",e)).valueChanges()}getFechasByRoom(e){return this.firestore.collection("Huesped",t=>t.where("room","==",e)).snapshotChanges().pipe((0,d.U)(t=>t.map(s=>{const i=s.payload.doc.data();return Object.assign({id:s.payload.doc.id},i)})))}newHuesped(e){this.firestore.collection("Huesped").doc(e.token).set(e)}removeHuesped(e){this.firestore.collection("Huesped").doc(e).delete()}setToken(e){this.token=e}getToken(){return this.token}filterByDateAdmission(){return this.firestore.collection("Huesped",e=>e.where("dateAdmission",">=",this.today)).snapshotChanges().pipe((0,d.U)(e=>e.map(t=>{const s=t.payload.doc.data();return Object.assign({id:t.payload.doc.id},s)})))}filterByLionRoom(){return this.firestore.collection("Huesped",e=>e.where("room","==","Le\xf3n")).snapshotChanges().pipe((0,d.U)(e=>e.map(t=>{const s=t.payload.doc.data();return Object.assign({id:t.payload.doc.id},s)})))}filterByElephantRoom(){return this.firestore.collection("Huesped",e=>e.where("room","==","Elefante")).snapshotChanges().pipe((0,d.U)(e=>e.map(t=>{const s=t.payload.doc.data();return Object.assign({id:t.payload.doc.id},s)})))}updatePay(e){return e.advance=e.price,this.firestore.collection("Huesped").doc(e.id).update(e)}}return o.\u0275fac=function(e){return new(e||o)(m.LFG(h.ST),m.LFG(l.F0))},o.\u0275prov=m.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()}}]);