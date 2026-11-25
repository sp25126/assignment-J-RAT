function Ve(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Y={exports:{}},a={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q;function Ze(){if(Q)return a;Q=1;var r=Symbol.for("react.transitional.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),M=Symbol.for("react.consumer"),x=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),$=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),f=Symbol.for("react.view_transition"),_=Symbol.iterator;function g(e){return e===null||typeof e!="object"?null:(e=_&&e[_]||e["@@iterator"],typeof e=="function"?e:null)}var R={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,P={};function E(e,t,o){this.props=e,this.context=t,this.refs=P,this.updater=o||R}E.prototype.isReactComponent={},E.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},E.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function H(){}H.prototype=E.prototype;function j(e,t,o){this.props=e,this.context=t,this.refs=P,this.updater=o||R}var b=j.prototype=new H;b.constructor=j,A(b,E.prototype),b.isPureReactComponent=!0;var N=Array.isArray;function L(){}var d={H:null,A:null,T:null,S:null},V=Object.prototype.hasOwnProperty;function q(e,t,o){var s=o.ref;return{$$typeof:r,type:e,key:t,ref:s!==void 0?s:null,props:o}}function qe(e,t){return q(e.type,t,e.props)}function I(e){return typeof e=="object"&&e!==null&&e.$$typeof===r}function Ie(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return t[o]})}var Z=/\/+/g;function U(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Ie(""+e.key):t.toString(36)}function Ue(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(L,L):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function T(e,t,o,s,c){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var h=!1;if(e===null)h=!0;else switch(l){case"bigint":case"string":case"number":h=!0;break;case"object":switch(e.$$typeof){case r:case n:h=!0;break;case w:return h=e._init,T(h(e._payload),t,o,s,c)}}if(h)return c=c(e),h=s===""?"."+U(e,0):s,N(c)?(o="",h!=null&&(o=h.replace(Z,"$&/")+"/"),T(c,t,o,"",function(Be){return Be})):c!=null&&(I(c)&&(c=qe(c,o+(c.key==null||e&&e.key===c.key?"":(""+c.key).replace(Z,"$&/")+"/")+h)),t.push(c)),1;h=0;var k=s===""?".":s+":";if(N(e))for(var y=0;y<e.length;y++)s=e[y],l=k+U(s,y),h+=T(s,t,o,l,c);else if(y=g(e),typeof y=="function")for(e=y.call(e),y=0;!(s=e.next()).done;)s=s.value,l=k+U(s,y++),h+=T(s,t,o,l,c);else if(l==="object"){if(typeof e.then=="function")return T(Ue(e),t,o,s,c);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return h}function O(e,t,o){if(e==null)return e;var s=[],c=0;return T(e,s,"","",function(l){return t.call(o,l,c++)}),s}function Ye(e){if(e._status===-1){var t=e._result,o=t();o.then(function(s){(e._status===0||e._status===-1)&&(e._status=1,e._result=s,o.status===void 0&&(o.status="fulfilled",o.value=s))},function(s){(e._status===0||e._status===-1)&&(e._status=2,e._result=s,o.status===void 0&&(o.status="rejected",o.reason=s))}),e._status===-1&&(e._status=0,e._result=o)}if(e._status===1)return e._result.default;throw e._result}var G=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function K(e){var t=d.T,o={};o.types=t!==null?t.types:null,d.T=o;try{var s=e(),c=d.S;c!==null&&c(o,s),typeof s=="object"&&s!==null&&typeof s.then=="function"&&s.then(L,G)}catch(l){G(l)}finally{t!==null&&o.types!==null&&(t.types=o.types),d.T=t}}function X(e){var t=d.T;if(t!==null){var o=t.types;o===null?t.types=[e]:o.indexOf(e)===-1&&o.push(e)}else K(X.bind(null,e))}var We={map:O,forEach:function(e,t,o){O(e,function(){t.apply(this,arguments)},o)},count:function(e){var t=0;return O(e,function(){t++}),t},toArray:function(e){return O(e,function(t){return t})||[]},only:function(e){if(!I(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};return a.Activity=S,a.Children=We,a.Component=E,a.Fragment=p,a.Profiler=v,a.PureComponent=j,a.StrictMode=u,a.Suspense=m,a.ViewTransition=f,a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=d,a.__COMPILER_RUNTIME={__proto__:null,c:function(e){return d.H.useMemoCache(e)}},a.addTransitionType=X,a.cache=function(e){return function(){return e.apply(null,arguments)}},a.cacheSignal=function(){return null},a.cloneElement=function(e,t,o){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var s=A({},e.props),c=e.key;if(t!=null)for(l in t.key!==void 0&&(c=""+t.key),t)!V.call(t,l)||l==="key"||l==="__self"||l==="__source"||l==="ref"&&t.ref===void 0||(s[l]=t[l]);var l=arguments.length-2;if(l===1)s.children=o;else if(1<l){for(var h=Array(l),k=0;k<l;k++)h[k]=arguments[k+2];s.children=h}return q(e.type,c,s)},a.createContext=function(e){return e={$$typeof:x,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:M,_context:e},e},a.createElement=function(e,t,o){var s,c={},l=null;if(t!=null)for(s in t.key!==void 0&&(l=""+t.key),t)V.call(t,s)&&s!=="key"&&s!=="__self"&&s!=="__source"&&(c[s]=t[s]);var h=arguments.length-2;if(h===1)c.children=o;else if(1<h){for(var k=Array(h),y=0;y<h;y++)k[y]=arguments[y+2];c.children=k}if(e&&e.defaultProps)for(s in h=e.defaultProps,h)c[s]===void 0&&(c[s]=h[s]);return q(e,l,c)},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:z,render:e}},a.isValidElement=I,a.lazy=function(e){return{$$typeof:w,_payload:{_status:-1,_result:e},_init:Ye}},a.memo=function(e,t){return{$$typeof:$,type:e,compare:t===void 0?null:t}},a.startTransition=K,a.unstable_useCacheRefresh=function(){return d.H.useCacheRefresh()},a.use=function(e){return d.H.use(e)},a.useActionState=function(e,t,o){return d.H.useActionState(e,t,o)},a.useCallback=function(e,t){return d.H.useCallback(e,t)},a.useContext=function(e){return d.H.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e,t){return d.H.useDeferredValue(e,t)},a.useEffect=function(e,t){return d.H.useEffect(e,t)},a.useEffectEvent=function(e){return d.H.useEffectEvent(e)},a.useId=function(){return d.H.useId()},a.useImperativeHandle=function(e,t,o){return d.H.useImperativeHandle(e,t,o)},a.useInsertionEffect=function(e,t){return d.H.useInsertionEffect(e,t)},a.useLayoutEffect=function(e,t){return d.H.useLayoutEffect(e,t)},a.useMemo=function(e,t){return d.H.useMemo(e,t)},a.useOptimistic=function(e,t){return d.H.useOptimistic(e,t)},a.useReducer=function(e,t,o){return d.H.useReducer(e,t,o)},a.useRef=function(e){return d.H.useRef(e)},a.useState=function(e){return d.H.useState(e)},a.useSyncExternalStore=function(e,t,o){return d.H.useSyncExternalStore(e,t,o)},a.useTransition=function(){return d.H.useTransition()},a.version="19.3.1",a}var F;function Ge(){return F||(F=1,Y.exports=Ze()),Y.exports}var C=Ge();const rt=Ve(C);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=r=>(r.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase();/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Xe(r,n,p=[]){if(n==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Ke(r),size:24,node:n,...p.length>0?{aliases:p}:{}}}/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=r=>{let n="",p=!1;for(const u of r){if(u==="-"||u==="_"||u<=" "){p=n.length>0;continue}n.length===0?n+=u.toLowerCase():n+=p?u.toUpperCase():u,p=!1}return n};/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fe=r=>{const n=Qe(r);return n.charAt(0).toUpperCase()+n.slice(1)};/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(...r)=>{const n=new Set;for(const p of r)if(typeof p=="string")for(const u of p.split(/\s+/))u&&n.add(u);return[...n].join(" ")};/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function W(r){return r!=null}function Je(r,n={}){const p=n.attributeNames??{},u=f=>p[f]??f,v=r.size??r.width??D.width,M=r.size??r.height??D.height,x=r.aliases?.filter(f=>typeof f=="string"&&f.trim()!=="").map(f=>`lucide-${f}`)??[],z=[...r.name?[`lucide-${r.name}`]:[],...x],m=n.className?.split(" ").filter(Boolean)??[],$=n.includeDefaultClasses===!1?B(...m):B("lucide",...z,...m);let w=n.strokeWidth??D["stroke-width"];if(n.absoluteStrokeWidth){const f=Number(w)*Number(r.size??r.width??D.width)/Number(n.size??n.width??D.width);Number.isFinite(f)&&(w=f)}return["svg",{...Object.entries(D).reduce((f,[_,g])=>(f[u(_)]=g,f),{}),..."color"in n&&n.color&&{[u("stroke")]:n.color},..."size"in n&&W(n.size)&&{[u("width")]:n.size,[u("height")]:n.size},..."width"in n&&W(n.width)&&{[u("width")]:n.width},..."height"in n&&W(n.height)&&{[u("height")]:n.height},[u("stroke-width")]:w,...$&&{[u("class")]:$},[u("viewBox")]:`0 0 ${v} ${M}`,...n.hasA11yProp===!1?{[u("aria-hidden")]:"true"}:{},..."attributes"in n&&n.attributes},r.node.map(f=>{const[_,g,R]=f,A=n.nonScalingStroke?{[u("vector-effect")]:"non-scaling-stroke",...g}:g;return R?[_,A,R]:[_,A]})]}/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function et(r,n={}){return Je(r,{...n,attributeNames:{...n.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=r=>{if(r==null||typeof r!="object")return!1;for(const n in r)if(Object.prototype.hasOwnProperty.call(r,n)&&(n.startsWith("aria-")||n==="role"||n==="title")&&r[n]!=null)return!0;return!1},nt=C.createContext({}),ot=()=>C.useContext(nt),st=C.forwardRef(({color:r,size:n,width:p,height:u,strokeWidth:v,absoluteStrokeWidth:M,nonScalingStroke:x,className:z="",children:m,iconNode:$=[],icon:w={node:$,aliases:[],size:24},...S},f)=>{const{size:_=24,strokeWidth:g=2,absoluteStrokeWidth:R=!1,nonScalingStroke:A=!1,color:P="currentColor",className:E=""}=ot()??{},H=!!m||tt(S),[j,b,N=[]]=et(w,{color:r??P,width:p??n??_,height:u??n??_,strokeWidth:v??g,absoluteStrokeWidth:M??R,nonScalingStroke:x??A,className:B(E,z),hasA11yProp:H,attributes:S});return C.createElement(j,{ref:f,...b},[...N.map(([L,d])=>C.createElement(L,d)),...Array.isArray(m)?m:[m]])});/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function i(r,n=[],p=[]){const u=typeof r=="string"?Xe(r,n,p):r,v=C.forwardRef(({className:M,...x},z)=>C.createElement(st,{ref:z,icon:u,className:M,...x}));return u.name&&(v.displayName=Fe(u.name)),v}/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J={name:"arrow-left-right",size:24,node:[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]};J.node;const at=i(J);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee={name:"arrow-left",size:24,node:[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]};ee.node;const it=i(ee);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te={name:"arrow-right",size:24,node:[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]};te.node;const ct=i(te);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne={name:"arrow-up-right",size:24,node:[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]};ne.node;const ut=i(ne);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe={name:"bath",size:24,node:[["path",{d:"M10 4 8 6",key:"1rru8s"}],["path",{d:"M17 19v2",key:"ts1sot"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M7 19v2",key:"12npes"}],["path",{d:"M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5",key:"14ym8i"}]]};oe.node;const dt=i(oe);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};se.node;const lt=i(se);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re={name:"chevron-down",size:24,node:[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]};re.node;const ht=i(re);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};ae.node;const ft=i(ae);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};ie.node;const pt=i(ie);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};ce.node;const yt=i(ce);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={name:"circle-exclamation-point",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle","circle-alert"]};ue.node;const _t=i(ue);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"clock",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]]};de.node;const kt=i(de);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};le.node;const mt=i(le);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he={name:"droplets",size:24,node:[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]]};he.node;const vt=i(he);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};fe.node;const wt=i(fe);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={name:"flame",size:24,node:[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]]};pe.node;const gt=i(pe);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye={name:"grid-3x3",size:24,node:[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],aliases:["grid","grid-3-x-3"]};ye.node;const Et=i(ye);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={name:"hammer",size:24,node:[["path",{d:"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9",key:"1hayfq"}],["path",{d:"m18 15 4-4",key:"16gjal"}],["path",{d:"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5",key:"15ts47"}]]};_e.node;const Ct=i(_e);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke={name:"layout-dashboard",size:24,node:[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]};ke.node;const Mt=i(ke);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};me.node;const xt=i(me);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve={name:"map-pin",size:24,node:[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]};ve.node;const zt=i(ve);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we={name:"menu",size:24,node:[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]};we.node;const Rt=i(we);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge={name:"message-circle",size:24,node:[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]};ge.node;const At=i(ge);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee={name:"paintbrush",size:24,node:[["path",{d:"m14.622 17.897-10.68-2.913",key:"vj2p1u"}],["path",{d:"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",key:"18tc5c"}],["path",{d:"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",key:"ytzfxy"}]]};Ee.node;const $t=i(Ee);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};Ce.node;const Tt=i(Ce);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me={name:"pen",size:24,node:[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-2"]};Me.node;const Dt=i(Me);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe={name:"phone",size:24,node:[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};xe.node;const St=i(xe);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};ze.node;const jt=i(ze);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re={name:"refresh-cw",size:24,node:[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]};Re.node;const bt=i(Re);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae={name:"save",size:24,node:[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]};Ae.node;const Lt=i(Ae);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};$e.node;const Pt=i($e);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={name:"settings",size:24,node:[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]};Te.node;const Ht=i(Te);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};De.node;const Nt=i(De);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se={name:"snowflake",size:24,node:[["path",{d:"m10 20-1.25-2.5L6 18",key:"18frcb"}],["path",{d:"M10 4 8.75 6.5 6 6",key:"7mghy3"}],["path",{d:"m14 20 1.25-2.5L18 18",key:"1chtki"}],["path",{d:"m14 4 1.25 2.5L18 6",key:"1b4wsy"}],["path",{d:"m17 21-3-6h-4",key:"15hhxa"}],["path",{d:"m17 3-3 6 1.5 3",key:"11697g"}],["path",{d:"M2 12h6.5L10 9",key:"kv9z4n"}],["path",{d:"m20 10-1.5 2 1.5 2",key:"1swlpi"}],["path",{d:"M22 12h-6.5L14 15",key:"1mxi28"}],["path",{d:"m4 10 1.5 2L4 14",key:"k9enpj"}],["path",{d:"m7 21 3-6-1.5-3",key:"j8hb9u"}],["path",{d:"m7 3 3 6h4",key:"1otusx"}]]};Se.node;const Ot=i(Se);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je={name:"star",size:24,node:[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]};je.node;const qt=i(je);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be={name:"thumbs-up",size:24,node:[["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}],["path",{d:"M7 10v12",key:"1qc93n"}]]};be.node;const It=i(be);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le={name:"utensils",size:24,node:[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"j28e5"}]],aliases:["fork-knife"]};Le.node;const Ut=i(Le);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe={name:"users",size:24,node:[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]};Pe.node;const Yt=i(Pe);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He={name:"wrench",size:24,node:[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]]};He.node;const Wt=i(He);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Ne.node;const Bt=i(Ne);/**
 * @license lucide-react v1.79.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe={name:"zap",size:24,node:[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]]};Oe.node;const Vt=i(Oe);export{ct as A,dt as B,lt as C,vt as D,wt as E,gt as F,Et as G,Ct as H,xt as L,Rt as M,St as P,rt as R,Ot as S,It as T,Ut as U,Wt as W,Bt as X,Vt as Z,C as a,$t as b,Nt as c,qt as d,zt as e,ht as f,At as g,Tt as h,jt as i,ft as j,pt as k,Pt as l,kt as m,yt as n,_t as o,at as p,ut as q,Ge as r,it as s,Mt as t,Yt as u,Ht as v,Dt as w,Lt as x,mt as y,bt as z};
