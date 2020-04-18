(this["webpackJsonpschedule-checker"]=this["webpackJsonpschedule-checker"]||[]).push([[0],{322:function(e,t,a){e.exports=a(579)},327:function(e,t,a){},333:function(e,t){},335:function(e,t){},367:function(e,t){},368:function(e,t){},416:function(e,t,a){},502:function(e,t,a){},577:function(e,t,a){},579:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(62),l=a.n(o),c=(a(327),a(181)),i=a.n(c),u=a(286),m=a(17),s=a(594),f=a(580),d=a(63),p=a(589),b=a(21),g=a(35),E=(a(416),a(595)),h=a(4),v=a.n(h),j=function(e){return{className:v()("item",{active:e})}},O=function(e){var t=e.isPartiallyCurrent;return j(t)},k=function(e){var t=e.isCurrent;return j(t)},S=function(e){return"".concat("/schedule-checker").concat(e)},C=function(){return r.a.createElement(E.a,{pointing:!0,secondary:!0},r.a.createElement(g.a,{to:S("/"),getProps:k},"Home"),r.a.createElement(g.a,{to:S("/settings"),getProps:O},"Settings"),r.a.createElement(g.a,{to:S("/quick-simu"),getProps:O},"Quick simulation"))},y=a(311),x=a(593),w=a(590),M=a(596),I=a(597),_=a(598),P=a(132),T=a.n(P),F=(a(502),a(133)),A=a.n(F),B=function(e,t){return{result:Math.floor(e/t),remainder:e%t}},q=function(e){var t=B(e,3600),a=t.result,n=t.remainder,r=a,o=B(n,60);return a=o.result,n=o.remainder,[r>0?"".concat(r," hours"):"",a>0?"".concat(a," minutes"):"","".concat(n," seconds")].join(" ")},N=function(e,t,a){return t(parseInt(e.target.value,10)||a)},G=function(e){if(!e)return{};var t=A()("config")||{},a=t.setup||Object(b.b)(e.getSetupProps()),n=t.model||Object(b.b)(e.getModelProps()),r=t.scrambling||Object(b.b)(e.getScramblingProps()),o=e.loadConfig(Object(b.a)(e.MapStringInt,a),Object(b.a)(e.MapStringInt,n),Object(b.a)(e.MapStringInt,r));return o!==e.ErrorKind.SUCCESS?(console.error("Could not load local config: ".concat(e.errorMessage(o))),{mapSetup:Object(b.b)(e.getSetupProps()),mapModel:Object(b.b)(e.getModelProps()),mapScrambling:Object(b.b)(e.getScramblingProps())}):{mapSetup:a,mapModel:n,mapScrambling:r}},R=function(){A()("config",{}),document.location.reload()},V=function(e){var t=e.saveAction,a=e.hasChanges;return r.a.createElement(x.a,{item:!0,icon:"cogs",className:"right"},r.a.createElement(x.a.Menu,null,r.a.createElement(x.a.Item,{onClick:t,disabled:!a},"Save settings"),r.a.createElement(x.a.Item,{onClick:R},"Reset settings to default")))},H=function(e){var t=e.props,a=e.setProps;return r.a.createElement(w.a,{className:"settings-form"},r.a.createElement(M.a,{doubling:!0,textAlign:"right",columns:3},Object.entries(t).map((function(e){var n=Object(m.a)(e,2),o=n[0],l=n[1];return r.a.createElement(M.a.Column,{key:o},r.a.createElement(w.a.Input,{inline:!0,min:0,type:"number",label:o,value:l,onChange:function(e){return function(e,n){var r=Object(y.a)({},t);r[e]=parseInt(n,10)||0,a(r)}(o,e.target.value)}}))}))))},J=function(e){var t=e.simulator,a=Object(n.useState)({}),o=Object(m.a)(a,2),l=o[0],c=o[1],i=Object(n.useState)({}),u=Object(m.a)(i,2),f=u[0],d=u[1],p=Object(n.useState)({}),h=Object(m.a)(p,2),v=h[0],j=h[1],S=Object(n.useState)({}),C=Object(m.a)(S,2),y=C[0],x=C[1];Object(n.useEffect)((function(){var e=G(t),a=e.mapSetup,n=e.mapModel,r=e.mapScrambling;c(a),d(n),j(r),x({setup:a,model:n,scrambling:r})}),[t]);var w=!T.a.isEqual(y.setup,l),M=!T.a.isEqual(y.model,f),P=!T.a.isEqual(y.scrambling,v),F=w||M||P;return r.a.createElement("div",null,r.a.createElement(I.a,null,"Simulator settings"),r.a.createElement(s.a,{color:"violet"},"All values are unsigned integers.",r.a.createElement("br",null),"All times are expressed in seconds."),r.a.createElement(E.a,{attached:"top",pointing:!0,color:"violet"},r.a.createElement(g.a,{to:"",getProps:k},"Setup"," ",w?"*":""),r.a.createElement(g.a,{to:"model",getProps:O},"Model parameters"," ",M?"*":""),r.a.createElement(g.a,{to:"scrambling",getProps:O},"Scrambling costs"," ",P?"*":""),r.a.createElement(V,{saveAction:function(){var e,a={setup:l,model:f,scrambling:v};t.loadConfig(Object(b.a)(t.MapStringInt,l),Object(b.a)(t.MapStringInt,f),Object(b.a)(t.MapStringInt,v)),x(a),e=a,A()("config",e)},hasChanges:F})),r.a.createElement(_.a,{attached:"bottom"},r.a.createElement(g.b,null,r.a.createElement(H,{path:"/",default:!0,simulator:t,props:l,setProps:c}),r.a.createElement(H,{path:"/model",simulator:t,props:f,setProps:d}),r.a.createElement(H,{path:"/scrambling",simulator:t,props:v,setProps:j}))))},U=a(184),W=a(591),K=function(e){var t=e.times,a=e.setTimes,o=e.OpenButton,l=Object(n.useState)(!1),c=Object(m.a)(l,2),i=c[0],u=c[1],s=Object(n.useState)([]),d=Object(m.a)(s,2),p=d[0],b=d[1],g=Object(n.useState)(10),E=Object(m.a)(g,2),h=E[0],v=E[1],j=Object(n.useState)(15),O=Object(m.a)(j,2),k=O[0],S=O[1],C=Object(n.useState)(20),y=Object(m.a)(C,2),x=y[0],M=y[1],I=function(){return u(!0)},_=function(){return u(!1)},P=h>k?{content:"Max must be greater than min"}:null;return Object(n.useEffect)((function(){return b(t)}),[t]),r.a.createElement(r.a.Fragment,null,o?r.a.createElement(o,{onClick:I}):r.a.createElement(f.a,{primary:!0,onClick:I},"Generate group"),r.a.createElement(W.a,{open:i,centered:!1,onClose:_},r.a.createElement(W.a.Header,null,"Generate competitors for group"),r.a.createElement(W.a.Content,null,r.a.createElement("p",null,"Use this form to generate a random population for the group. Each number represents the average time of one competitor, therefore if you want 20 competitors in the group you need to generate 20 numbers."),r.a.createElement("p",null,"There are"," ",p.length," ","competitors in the group currently:",r.a.createElement("br",null),r.a.createElement("code",null,p.join(", ")),r.a.createElement("br",null),"The form below let you add some randomly generated number within"," ",r.a.createElement("em",null,"min")," ","and"," ",r.a.createElement("em",null,"max"),"."),r.a.createElement(w.a,null,r.a.createElement(w.a.Input,{inline:!0,min:1,type:"number",label:"Min",value:h,onChange:function(e){return N(e,v,h)}}),r.a.createElement(w.a.Input,{inline:!0,min:1,type:"number",label:"Max",value:k,error:P,onChange:function(e){return N(e,S,k)}}),r.a.createElement(w.a.Input,{inline:!0,min:1,type:"number",label:"Amount",value:x,onChange:function(e){return N(e,M,x)}}),r.a.createElement(f.a,{color:"violet",disabled:!!P,content:"Generate and append",onClick:function(){return b([].concat(Object(U.a)(p),Object(U.a)(function(e,t,a){return Array.from(Array(a)).map((function(){return Math.floor(Math.random()*(t-e+1))+e}))}(h,k,x))))}}),r.a.createElement(f.a,{basic:!0,negative:!0,content:"Clear times",onClick:function(){return b([])}}))),r.a.createElement(W.a.Actions,null,r.a.createElement(f.a.Group,null,r.a.createElement(f.a,{positive:!0,onClick:function(){a(p),_()},content:"Save"}),r.a.createElement(f.a.Or,null),r.a.createElement(f.a,{color:"black",onClick:_,content:"Discard"})))))},Q=function(e){var t=e.times,a=e.setTimes,o=Object(n.useState)(!1),l=Object(m.a)(o,2),c=l[0],i=l[1];return r.a.createElement("div",{className:"times-details"},r.a.createElement(K,{times:t,setTimes:a,OpenButton:function(e){var t=e.onClick;return r.a.createElement(f.a,{color:"violet",content:"Set group times",onClick:t,compact:!0})}}),r.a.createElement(f.a,{onClick:function(){return i(!c)},compact:!0},c?r.a.createElement(r.a.Fragment,null,"Hide details."):r.a.createElement(r.a.Fragment,null,"Show average times.")),c&&r.a.createElement(_.a,null,r.a.createElement("code",null,t.join(", "))))},z=a(588),Y=a(74),D=function(e){var t=e.val,a=e.setVal,n=e.options,o=Object(Y.a)(e,["val","setVal","options"]);return r.a.createElement(x.a,Object.assign({},o,{value:t,onChange:function(e,t){var n=t.value;return a(n)},options:n}))},L=[{id:"333",name:"3x3x3 Cube",preferred_format:"a",rank:10},{id:"222",name:"2x2x2 Cube",preferred_format:"a",rank:20},{id:"444",name:"4x4x4 Cube",preferred_format:"a",rank:30},{id:"555",name:"5x5x5 Cube",preferred_format:"a",rank:40},{id:"666",name:"6x6x6 Cube",preferred_format:"m",rank:50},{id:"777",name:"7x7x7 Cube",preferred_format:"m",rank:60},{id:"333bf",name:"3x3x3 Blindfolded",preferred_format:"3",rank:70},{id:"333fm",name:"3x3x3 Fewest Moves",preferred_format:"m",rank:80},{id:"333oh",name:"3x3x3 One-Handed",preferred_format:"a",rank:90},{id:"clock",name:"Clock",preferred_format:"a",rank:110},{id:"minx",name:"Megaminx",preferred_format:"a",rank:120},{id:"pyram",name:"Pyraminx",preferred_format:"a",rank:130},{id:"skewb",name:"Skewb",preferred_format:"a",rank:140},{id:"sq1",name:"Square-1",preferred_format:"a",rank:150},{id:"444bf",name:"4x4x4 Blindfolded",preferred_format:"3",rank:160},{id:"555bf",name:"5x5x5 Blindfolded",preferred_format:"3",rank:170},{id:"333mbf",name:"3x3x3 Multi-Blind",preferred_format:"3",rank:180},{id:"333ft",name:"3x3x3 With Feet",preferred_format:"a",rank:996},{id:"magic",name:"Magic",preferred_format:"a",rank:997},{id:"mmagic",name:"Master Magic",preferred_format:"a",rank:998},{id:"333mbo",name:"3x3x3 Multi-Blind Old Style",preferred_format:"3",rank:999}],$={};L.forEach((function(e){$[e.id]=e}));var X={official:L.filter((function(e){return e.rank<900})),forSimulation:L.filter((function(e){return e.rank<900&&!["333fm","333mbf"].includes(e.id)})),byId:$}.forSimulation.map((function(e){return{text:e.name,key:e.id,value:e.id}})),Z=function(e){var t=e.event,a=e.setEvent,n=Object(Y.a)(e,["event","setEvent"]);return r.a.createElement(D,Object.assign({},n,{val:t,setVal:a,options:X}))},ee=["Runners","JudgesRun"],te=ee[0],ae=ee.map((function(e){return{text:e,key:e,value:e}})),ne=function(e){var t=e.model,a=e.setModel,n=Object(Y.a)(e,["model","setModel"]);return r.a.createElement(D,Object.assign({},n,{val:t,setVal:a,options:ae}))},re=function(e){var t=e.simulator,a=e.times,o=Object(n.useState)("333"),l=Object(m.a)(o,2),c=l[0],i=l[1],u=Object(n.useState)(te),s=Object(m.a)(u,2),d=s[0],p=s[1],g=Object(n.useState)(""),E=Object(m.a)(g,2),h=E[0],v=E[1],j=Object(n.useState)(10),O=Object(m.a)(j,2),k=O[0],S=O[1],C=Object(n.useState)(14),y=Object(m.a)(C,2),x=y[0],w=y[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,null,"Quick staff optimizer"),r.a.createElement("div",{className:"opt-content"},r.a.createElement("div",{className:"inputs"},r.a.createElement(z.a,{min:3,type:"number",label:"Total staff",value:x,onChange:function(e){return N(e,w,x)}}),r.a.createElement(z.a,{min:1,type:"number",label:"Stations",value:k,onChange:function(e){return N(e,S,k)}})),r.a.createElement("p",null,"Given I have"," ",x," ","staff and at most"," ",k," ","stations available, I want to get the shortest time for this group."),r.a.createElement("div",null,"This group is for"," ",r.a.createElement(Z,{event:c,setEvent:i,inline:!0,scrolling:!0})," ","and my staff will be using the"," ",r.a.createElement(ne,{model:d,setModel:p,inline:!0})," ","system throughout the group.")),r.a.createElement(f.a,{primary:!0,className:"run-simu",content:"Run it!",onClick:function(){var e=Object(b.c)(t.VectorTime,a),n=new t.MapStringInt,r=t.optimizeStaff(c,e,k,x,n,d),o=r.Err,l=r.BestResult,i=r.Judges,u=r.Runners,m=r.Scramblers;if(o!==t.ErrorKind.SUCCESS)v("An error occurred during the simulation: ".concat(t.errorMessage(o)));else{var s="The best group took ".concat(q(l),","),f="using ".concat(i," judges, ").concat(m," scramblers, and ").concat(u," runners. ");v("".concat(s," ").concat(f))}}}),r.a.createElement("p",null,h))},oe=function(e){var t=e.simulator,a=e.times,o=Object(n.useState)("333"),l=Object(m.a)(o,2),c=l[0],i=l[1],u=Object(n.useState)(te),d=Object(m.a)(u,2),p=d[0],g=d[1],E=Object(n.useState)(""),h=Object(m.a)(E,2),v=h[0],j=h[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,null,"Quick group simulation"),r.a.createElement(s.a,{compact:!0,color:"brown"},"You can adjust the number of judges/scramblers/runners, as well as the miscramble or extra rate in the settings."),r.a.createElement("div",null,"I want to simulate this group for"," ",r.a.createElement(Z,{event:c,setEvent:i,inline:!0,scrolling:!0})," ","and my staff will be using the"," ",r.a.createElement(ne,{model:p,setModel:g,inline:!0})," ","system throughout the group."),r.a.createElement(f.a,{primary:!0,className:"run-simu",content:"Run it!",onClick:function(){var e=Object(b.c)(t.VectorTime,a),n=new t.MapStringInt,r=t.simuGroup(c,e,n,p),o=r.Err,l=r.Value;o!==t.ErrorKind.SUCCESS?j("An error occurred during the simulation: ".concat(t.errorMessage(o))):j("The group took ".concat(q(l),"."))}}),r.a.createElement("p",null,v))},le=(a(577),[]),ce=function(e){var t=e.simulator,a=Object(n.useState)(le),o=Object(m.a)(a,2),l=o[0],c=o[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,null,"Group setup"),r.a.createElement("div",null,"There are currently"," ",l.length," ","competitors in the group.",r.a.createElement(Q,{times:l,setTimes:function(e){le=e,c(e)}})),r.a.createElement(oe,{simulator:t,times:l}),r.a.createElement(re,{simulator:t,times:l}))},ie=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a.Header,null,"Loading required content"),"Please wait while the page is loading a required module.")},ue=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"The loading of the module timed out. It&pos;s likely that there was an error and that your browser does not support WebAssembly."),r.a.createElement("p",null,"This module is necessary for this application, it is pointless to show you anything more than this error message at this point.",r.a.createElement("br",null),"Feel free to check this website to make sure your browser is supported."),r.a.createElement(f.a,{href:"https://caniuse.com/#feat=wasm",target:"_blank",secondary:!0},"Check browser compatibility"))},me=function(e){var t=e.simulator,a=e.loading;return r.a.createElement(r.a.Fragment,null,!t&&r.a.createElement(s.a,{icon:!0,color:a?"teal":"red"},a&&r.a.createElement(d.a,{name:"circle notched",loading:!0}),r.a.createElement(s.a.Content,null,a?r.a.createElement(ie,null):r.a.createElement(ue,null))))},se=function(){return r.a.createElement("div",null,"This page is a work in progress and most likely won't do what you expect.",r.a.createElement("br",null),"You should not use it.",r.a.createElement("br",null),"Come back later.")},fe=function(){return r.a.createElement("p",null,"Oups, it's a 404")};var de=function(){var e=Object(n.useState)(void 0),t=Object(m.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(!0),c=Object(m.a)(l,2),s=c[0],f=c[1],d=function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(b.d)((function(){o(t),f(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){d(),setTimeout((function(){return f(!1)}),3e3)}),[]),Object(n.useEffect)((function(){G(a)}),[a]),r.a.createElement(p.a,null,r.a.createElement(me,{simulator:a,loading:s}),a&&r.a.createElement(r.a.Fragment,null,r.a.createElement(C,null),r.a.createElement(g.b,{basepath:"/schedule-checker"},r.a.createElement(se,{path:"/"}),r.a.createElement(J,{simulator:a,path:"settings/*"}),r.a.createElement(ce,{simulator:a,path:"/quick-simu"}),r.a.createElement(fe,{default:!0}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(578);l.a.render(r.a.createElement(de,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[322,1,2]]]);
//# sourceMappingURL=main.c1e547f7.chunk.js.map