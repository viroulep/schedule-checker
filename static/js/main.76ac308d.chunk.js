(this["webpackJsonpschedule-checker"]=this["webpackJsonpschedule-checker"]||[]).push([[0],{320:function(e,t,a){e.exports=a(575)},325:function(e,t,a){},331:function(e,t){},333:function(e,t){},365:function(e,t){},366:function(e,t){},414:function(e,t,a){},500:function(e,t,a){},573:function(e,t,a){},575:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(61),l=a.n(o),c=(a(325),a(179)),i=a.n(c),u=a(284),m=a(17),s=a(588),d=a(589),f=a(77),p=a(583),b=a(34),E=a(73),g=(a(414),a(590)),h=a(50),v=(a(4),function(e){e.prefixed,e.exact,e.to,Object(h.a)(e,["prefixed","exact","to"])}),k=function(){return r.a.createElement(g.a,{pointing:!0,secondary:!0},r.a.createElement(v,{exact:!0,prefixed:!0,to:"/"},"Home"),r.a.createElement(v,{prefixed:!0,to:"/settings"},"Settings"),r.a.createElement(v,{prefixed:!0,to:"/quick-simu"},"Quick simulation"))},O=a(309),j=a(584),x=a(591),y=a(592),S=a(593),w=a(129),C=a.n(w),M=(a(500),function(e){var t=e.props,a=e.setProps;return r.a.createElement(j.a,{className:"settings-form"},r.a.createElement(x.a,{doubling:!0,textAlign:"right",columns:3},Object.entries(t).map((function(e){var n=Object(m.a)(e,2),o=n[0],l=n[1];return r.a.createElement(x.a.Column,{key:o},r.a.createElement(j.a.Input,{inline:!0,min:0,type:"number",label:o,value:l,onChange:function(e){return function(e,n){var r=Object(O.a)({},t);r[e]=parseInt(n,10)||0,a(r)}(o,e.target.value)}}))}))))}),_=function(e){var t=e.simulator,a=Object(n.useState)({}),o=Object(m.a)(a,2),l=o[0],c=o[1],i=Object(n.useState)({}),u=Object(m.a)(i,2),f=u[0],p=u[1],h=Object(n.useState)({}),k=Object(m.a)(h,2),O=k[0],j=k[1],x=Object(n.useState)({}),w=Object(m.a)(x,2),_=w[0],I=w[1];Object(n.useEffect)((function(){var e=Object(b.b)(t.getSetupProps()),a=Object(b.b)(t.getModelProps()),n=Object(b.b)(t.getScramblingProps());c(e),p(a),j(n),I({setup:e,model:a,scrambling:n})}),[t]);var T=!C.a.isEqual(_.setup,l),F=!C.a.isEqual(_.model,f),q=!C.a.isEqual(_.scrambling,O),A=T||F||q,B=r.a.createElement(d.a,{content:"Save settings",onClick:function(){t.loadConfig(Object(b.a)(t.MapStringInt,l),Object(b.a)(t.MapStringInt,f),Object(b.a)(t.MapStringInt,O)),I({setup:l,model:f,scrambling:O})},disabled:!A,positive:!0});return r.a.createElement("div",null,r.a.createElement(y.a,null,"Simulator settings"),r.a.createElement(s.a,{color:"violet"},"All values are unsigned integers.",r.a.createElement("br",null),"All times are expressed in seconds."),r.a.createElement(g.a,{attached:"top",pointing:!0,color:"violet"},r.a.createElement(v,{exact:!0,to:""},"Setup"," ",T?"*":""),r.a.createElement(v,{to:"model"},"Model parameters"," ",F?"*":""),r.a.createElement(v,{to:"scrambling"},"Scrambling costs"," ",q?"*":""),r.a.createElement(g.a.Item,{position:"right",content:B})),r.a.createElement(S.a,{attached:"bottom"},r.a.createElement(E.b,null,r.a.createElement(M,{path:"/",default:!0,simulator:t,props:l,setProps:c}),r.a.createElement(M,{path:"/model",simulator:t,props:f,setProps:p}),r.a.createElement(M,{path:"/scrambling",simulator:t,props:O,setProps:j}))))},I=a(182),T=a(585),F=function(e,t){return{result:Math.floor(e/t),remainder:e%t}},q=function(e,t,a){return t(parseInt(e.target.value,10)||a)},A=function(e){var t=e.times,a=e.setTimes,o=e.OpenButton,l=Object(n.useState)(!1),c=Object(m.a)(l,2),i=c[0],u=c[1],s=Object(n.useState)([]),f=Object(m.a)(s,2),p=f[0],b=f[1],E=Object(n.useState)(10),g=Object(m.a)(E,2),h=g[0],v=g[1],k=Object(n.useState)(15),O=Object(m.a)(k,2),x=O[0],y=O[1],S=Object(n.useState)(20),w=Object(m.a)(S,2),C=w[0],M=w[1],_=function(){return u(!0)},F=function(){return u(!1)},A=h>x?{content:"Max must be greater than min"}:null;return Object(n.useEffect)((function(){return b(t)}),[t]),r.a.createElement(r.a.Fragment,null,o?r.a.createElement(o,{onClick:_}):r.a.createElement(d.a,{primary:!0,onClick:_},"Generate group"),r.a.createElement(T.a,{open:i,centered:!1,onClose:F},r.a.createElement(T.a.Header,null,"Generate competitors for group"),r.a.createElement(T.a.Content,null,r.a.createElement("p",null,"Use this form to generate a random population for the group. Each number represents the average time of one competitor, therefore if you want 20 competitors in the group you need to generate 20 numbers."),r.a.createElement("p",null,"There are"," ",p.length," ","competitors in the group currently:",r.a.createElement("br",null),r.a.createElement("code",null,p.join(", ")),r.a.createElement("br",null),"The form below let you add some randomly generated number within"," ",r.a.createElement("em",null,"min")," ","and"," ",r.a.createElement("em",null,"max"),"."),r.a.createElement(j.a,null,r.a.createElement(j.a.Input,{inline:!0,min:1,type:"number",label:"Min",value:h,onChange:function(e){return q(e,v,h)}}),r.a.createElement(j.a.Input,{inline:!0,min:1,type:"number",label:"Max",value:x,error:A,onChange:function(e){return q(e,y,x)}}),r.a.createElement(j.a.Input,{inline:!0,min:1,type:"number",label:"Amount",value:C,onChange:function(e){return q(e,M,C)}}),r.a.createElement(d.a,{color:"violet",disabled:!!A,content:"Generate and append",onClick:function(){return b([].concat(Object(I.a)(p),Object(I.a)(function(e,t,a){return Array.from(Array(a)).map((function(){return Math.floor(Math.random()*(t-e+1))+e}))}(h,x,C))))}}),r.a.createElement(d.a,{basic:!0,negative:!0,content:"Clear times",onClick:function(){return b([])}}))),r.a.createElement(T.a.Actions,null,r.a.createElement(d.a.Group,null,r.a.createElement(d.a,{positive:!0,onClick:function(){a(p),F()},content:"Save"}),r.a.createElement(d.a.Or,null),r.a.createElement(d.a,{color:"black",onClick:F,content:"Discard"})))))},B=function(e){var t=e.times,a=e.setTimes,o=Object(n.useState)(!1),l=Object(m.a)(o,2),c=l[0],i=l[1];return r.a.createElement("div",{className:"times-details"},r.a.createElement(A,{times:t,setTimes:a,OpenButton:function(e){var t=e.onClick;return r.a.createElement(d.a,{color:"violet",content:"Set group times",onClick:t,compact:!0})}}),r.a.createElement(d.a,{onClick:function(){return i(!c)},compact:!0},c?r.a.createElement(r.a.Fragment,null,"Hide details."):r.a.createElement(r.a.Fragment,null,"Show average times.")),c&&r.a.createElement(S.a,null,r.a.createElement("code",null,t.join(", "))))},P=a(587),G=function(e){var t=e.val,a=e.setVal,n=e.options,o=Object(h.a)(e,["val","setVal","options"]);return r.a.createElement(P.a,Object.assign({},o,{value:t,onChange:function(e,t){var n=t.value;return a(n)},options:n}))},V=[{id:"333",name:"3x3x3 Cube",preferred_format:"a",rank:10},{id:"222",name:"2x2x2 Cube",preferred_format:"a",rank:20},{id:"444",name:"4x4x4 Cube",preferred_format:"a",rank:30},{id:"555",name:"5x5x5 Cube",preferred_format:"a",rank:40},{id:"666",name:"6x6x6 Cube",preferred_format:"m",rank:50},{id:"777",name:"7x7x7 Cube",preferred_format:"m",rank:60},{id:"333bf",name:"3x3x3 Blindfolded",preferred_format:"3",rank:70},{id:"333fm",name:"3x3x3 Fewest Moves",preferred_format:"m",rank:80},{id:"333oh",name:"3x3x3 One-Handed",preferred_format:"a",rank:90},{id:"clock",name:"Clock",preferred_format:"a",rank:110},{id:"minx",name:"Megaminx",preferred_format:"a",rank:120},{id:"pyram",name:"Pyraminx",preferred_format:"a",rank:130},{id:"skewb",name:"Skewb",preferred_format:"a",rank:140},{id:"sq1",name:"Square-1",preferred_format:"a",rank:150},{id:"444bf",name:"4x4x4 Blindfolded",preferred_format:"3",rank:160},{id:"555bf",name:"5x5x5 Blindfolded",preferred_format:"3",rank:170},{id:"333mbf",name:"3x3x3 Multi-Blind",preferred_format:"3",rank:180},{id:"333ft",name:"3x3x3 With Feet",preferred_format:"a",rank:996},{id:"magic",name:"Magic",preferred_format:"a",rank:997},{id:"mmagic",name:"Master Magic",preferred_format:"a",rank:998},{id:"333mbo",name:"3x3x3 Multi-Blind Old Style",preferred_format:"3",rank:999}],H={};V.forEach((function(e){H[e.id]=e}));var W={official:V.filter((function(e){return e.rank<900})),forSimulation:V.filter((function(e){return e.rank<900&&!["333fm","333mbf"].includes(e.id)})),byId:H}.forSimulation.map((function(e){return{text:e.name,key:e.id,value:e.id}})),J=function(e){var t=e.event,a=e.setEvent,n=Object(h.a)(e,["event","setEvent"]);return r.a.createElement(G,Object.assign({},n,{val:t,setVal:a,options:W}))},N=["Runners","JudgesRun"],R=N[0],Q=N.map((function(e){return{text:e,key:e,value:e}})),U=function(e){var t=e.model,a=e.setModel,n=Object(h.a)(e,["model","setModel"]);return r.a.createElement(G,Object.assign({},n,{val:t,setVal:a,options:Q}))},Y=function(e){var t=e.simulator,a=e.times,o=Object(n.useState)("333"),l=Object(m.a)(o,2),c=l[0],i=l[1],u=Object(n.useState)(R),f=Object(m.a)(u,2),p=f[0],E=f[1],g=Object(n.useState)(""),h=Object(m.a)(g,2),v=h[0],k=h[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,null,"Quick group simulation"),r.a.createElement(s.a,{compact:!0,color:"brown"},"You can adjust the number of judges/scramblers/runners in the settings."),r.a.createElement("div",null,"I want to simulate this group for"," ",r.a.createElement(J,{event:c,setEvent:i,inline:!0})," ","and my staff will be using the"," ",r.a.createElement(U,{model:p,setModel:E,inline:!0})," ","system throughout the group."),r.a.createElement(d.a,{primary:!0,className:"run-simu",content:"Run it!",onClick:function(){var e=Object(b.c)(t.VectorTime,a),n=new t.MapStringInt,r=t.simuGroup(c,e,n,p),o=r.Err,l=r.Value;o!==t.ErrorKind.SUCCESS?k("An error occurred during the simulation: ".concat(t.errorMessage(o))):k("The group took ".concat(function(e){var t=F(e,3600),a=t.result,n=t.remainder,r=a,o=F(n,60);return a=o.result,n=o.remainder,[r>0?"".concat(r," hours"):"",a>0?"".concat(a," minutes"):"","".concat(n," seconds")].join(" ")}(l),"."))}}),r.a.createElement("p",null,v))},D=(a(573),[]),K=function(e){var t=e.simulator,a=Object(n.useState)(D),o=Object(m.a)(a,2),l=o[0],c=o[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,null,"Group setup"),r.a.createElement("div",null,"There are currently"," ",l.length," ","competitors in the group.",r.a.createElement(B,{times:l,setTimes:function(e){D=e,c(e)}})),r.a.createElement(Y,{simulator:t,times:l}))},L=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a.Header,null,"Loading required content"),"Please wait while the page is loading a required module.")},$=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"The loading of the module timed out. It&pos;s likely that there was an error and that your browser does not support WebAssembly."),r.a.createElement("p",null,"This module is necessary for this application, it is pointless to show you anything more than this error message at this point.",r.a.createElement("br",null),"Feel free to check this website to make sure your browser is supported."),r.a.createElement(d.a,{href:"https://caniuse.com/#feat=wasm",target:"_blank",secondary:!0},"Check browser compatibility"))},z=function(e){var t=e.simulator,a=e.loading;return r.a.createElement(r.a.Fragment,null,!t&&r.a.createElement(s.a,{icon:!0,color:a?"teal":"red"},a&&r.a.createElement(f.a,{name:"circle notched",loading:!0}),r.a.createElement(s.a.Content,null,a?r.a.createElement(L,null):r.a.createElement($,null))))},X=function(){return r.a.createElement("div",null,"This page is a work in progress and most likely won't do what you expect.",r.a.createElement("br",null),"You should not use it.",r.a.createElement("br",null),"Come back later.")},Z=function(){return r.a.createElement("p",null,"Oups, it's a 404")};var ee=function(){var e=Object(n.useState)(void 0),t=Object(m.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)(!0),c=Object(m.a)(l,2),s=c[0],d=c[1],f=function(){var e=Object(u.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=Object(b.d)((function(){o(t),d(!1)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){f(),setTimeout((function(){return d(!1)}),3e3)}),[]),r.a.createElement(p.a,null,r.a.createElement(z,{simulator:a,loading:s}),a&&r.a.createElement(r.a.Fragment,null,r.a.createElement(k,null),r.a.createElement(E.b,{basepath:"/schedule-checker"},r.a.createElement(X,{path:"/"}),r.a.createElement(_,{simulator:a,path:"settings/*"}),r.a.createElement(K,{simulator:a,path:"/quick-simu"}),r.a.createElement(Z,{default:!0}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(574);l.a.render(r.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[320,1,2]]]);
//# sourceMappingURL=main.76ac308d.chunk.js.map