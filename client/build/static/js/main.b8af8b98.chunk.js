(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{120:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(8),r=a.n(n),s=(a(91),a(92),a(22)),i=a(2),o=function(){return Object(i.jsx)("nav",{className:"navbar navbar-expand navbar-light bg-light",children:Object(i.jsx)("div",{className:"container",children:Object(i.jsx)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:Object(i.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-lg-0",children:[Object(i.jsx)(s.b,{className:"nav-link",to:"/",exact:!0,activeClassName:"active",children:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"}),Object(i.jsx)(s.b,{className:"nav-link",to:"/create",activeClassName:"active",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"})]})})})})},l=a(11),j=a(15),b=a.n(j),d=a(29),u=a(21),p=a(30),m=a.n(p),O=function(){var e=Object(c.useState)([]),t=Object(u.a)(e,2),a=t[0],n=t[1],r=function(){var e=Object(d.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get("/api/contest/");case 2:if(200===(t=e.sent).status){e.next=5;break}return e.abrupt("return");case 5:n(t.data);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){r()}),[]),Object(i.jsx)("div",{className:"container-xl",children:Object(i.jsx)("div",{className:"row",children:a.length?a.map((function(e,t){return Object(i.jsxs)(s.b,{to:"/contest/"+e._id,className:"col-xl-3 col-md-10 border m-xl-3 p-3 text-decoration-none",children:[Object(i.jsx)("div",{className:"text-uppercase fs-4 pointer",children:e.name}),Object(i.jsx)("br",{}),Object(i.jsx)("div",{className:"fs-6",children:e.project})]},t)})):"\u0415\u0449\u0435 \u043d\u0435\u0442 \u043a\u043e\u043d\u043a\u0443\u0440\u0441\u043e\u0432"})})},x=a(74),h=a(35),v=a(25),f=a(157),N=a(161),w=a(20),y=function(){var e=Object(l.g)(),t=Object(c.useState)({name:"",project:"",prize:""}),a=Object(u.a)(t,2),n=a[0],r=a[1],s=Object(c.useState)([]),o=Object(u.a)(s,2),j=o[0],p=o[1],O=function(e){r(Object(v.a)(Object(v.a)({},n),{},Object(h.a)({},e.target.name,e.target.value)))},y=function(){var t=Object(d.a)(b.a.mark((function t(a){var c,r,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),c=n.name,r=n.project,c&&r&&j.length){t.next=4;break}return t.abrupt("return");case 4:return t.next=6,m.a.post("/api/contest/",{name:c,project:r,prizes:j});case 6:200!==(s=t.sent).status?w.b.error(s.data):(Object(w.b)("\u041a\u043e\u043d\u043a\u0443\u0440\u0441 \u0441\u043e\u0437\u0434\u0430\u043d"),e.push("/contest/"+s.data._id));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(i.jsxs)("form",{onSubmit:y,className:"container-xl",autoComplete:"off",children:[Object(i.jsxs)("div",{className:"row mb-2",children:[Object(i.jsx)(N.a,{label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",name:"name",value:n.name,onChange:O}),Object(i.jsx)(N.a,{label:"\u041f\u0440\u043e\u0435\u043a\u0442",name:"project",value:n.project,onChange:O}),Object(i.jsx)(N.a,{label:"\u041f\u0440\u0438\u0437",name:"prize",value:n.prize,onChange:O,placeholder:"\u041d\u0430\u043f\u0440\u0438\u043c\u0435\u0440: 1000 \u0434\u043e\u043b\u0435\u0439"}),Object(i.jsx)(f.a,{className:"mt-3 mb-4",variant:"contained",color:"primary",onClick:function(){n.prize&&(p([n.prize].concat(Object(x.a)(j))),r(Object(v.a)(Object(v.a)({},n),{},{prize:""})))},children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u0440\u0438\u0437"}),j.map((function(e,t){return Object(i.jsxs)("div",{className:"row-md-12 mb-2 border-bottom w-100",children:[Object(i.jsx)("div",{className:"col-xl-10 col-md-12 w-100",children:e}),Object(i.jsx)(f.a,{className:"col-xl-2 col-md-12 w-100",color:"secondary",onClick:function(){return e=t,void p(j.filter((function(t,a){return a!==e})));var e},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]},t)}))]}),Object(i.jsx)("div",{className:"row mt-5",children:Object(i.jsx)(f.a,{variant:"contained",color:"primary",type:"submit",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043a\u043e\u043d\u043a\u0443\u0440\u0441"})})]})},g=a(158),z=a(160),k=a(163),C=a(162),S=a(159),I=a(73),_=a.n(I),E=function(){var e=Object(l.h)().id,t=Object(c.useState)(null),a=Object(u.a)(t,2),n=a[0],r=a[1],s=Object(c.useState)(""),o=Object(u.a)(s,2),j=o[0],p=o[1],O=Object(c.useState)({prize:"",type:""}),x=Object(u.a)(O,2),y=x[0],I=x[1],E=Object(c.useState)(null),P=Object(u.a)(E,2),A=P[0],D=P[1],J=Object(c.useState)({text:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430",color:"primary"}),B=Object(u.a)(J,2),F=B[0],$=B[1],q=function(){var e=Object(d.a)(b.a.mark((function e(t){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get("/api/contest/"+t);case 2:200!==(a=e.sent).status?w.b.error(a.data):r(a.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)((function(){q(e)}),[e]);var G=function(e){switch(I(Object(v.a)(Object(v.a)({},y),{},Object(h.a)({},e.target.name,e.target.value))),e.target.name){case"prize":break;case"type":$({text:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430",color:"primary"})}},H=function(){var e=Object(d.a)(b.a.mark((function e(t){var a,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),j&&y.type&&y.prize){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,m.a.post("/api/contest/"+n._id,{data:j,type:y.type,prizeId:y.prize});case 5:200!==(a=e.sent).status?w.b.error(a.data):((c=n).infos.unshift(a.data),r(Object(v.a)({},c)),Object(w.b)("\u0417\u0430\u043f\u0438\u0441\u044c \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430"));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),K=function(){var e=Object(d.a)(b.a.mark((function e(t){var a,c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.put("/api/contest/"+n._id+"/"+t);case 2:200!==(a=e.sent).status?w.b.error(a.data):((c=n).infos=c.infos.filter((function(e){return e._id!==t})),r(Object(v.a)({},c)),Object(w.b)("\u0417\u0430\u043f\u0438\u0441\u044c \u0443\u0434\u0430\u043b\u0435\u043d\u0430"));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return n?Object(i.jsxs)("div",{className:"container-xl",children:[Object(i.jsxs)("div",{className:"mb-2 mt-2 text-center bg-light p-3 text-dark fw-bold",children:[n.project," | ",n.name," | ",n._id]}),Object(i.jsxs)("div",{children:[Object(i.jsxs)("form",{onSubmit:H,children:[Object(i.jsxs)("div",{className:"row mb-2 mt-4",children:[Object(i.jsxs)("div",{className:"col-12 mb-4",children:[Object(i.jsx)(C.a,{id:"toPrize",children:"\u041f\u0440\u0438\u0437"}),Object(i.jsx)(z.a,{labelId:"toPrize",className:"w-100",name:"prize",value:y.prize,onChange:G,children:n.prizes.map((function(e,t){return Object(i.jsx)(k.a,{value:e._id,children:e.data})}))})]}),Object(i.jsxs)("div",{className:"col-xl-2 col-md-12 mb-4",children:[Object(i.jsx)(C.a,{id:"toInfo",children:"\u0422\u0438\u043f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438"}),Object(i.jsxs)(z.a,{labelId:"toInfo",className:"w-100",name:"type",value:y.type,onChange:G,children:[Object(i.jsx)(k.a,{value:"login",children:"\u041b\u043e\u0433\u0438\u043d"}),Object(i.jsx)(k.a,{value:"phone",children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u0430"}),Object(i.jsx)(k.a,{value:"any",children:"\u0414\u0440\u0443\u0433\u043e\u0435"})]})]}),Object(i.jsx)(N.a,{className:"col-xl-10 col-md-12 w-md-100",value:j,onChange:function(e){var t=e.target.value;if("phone"===y.type){if(!/^[\d,+]*$/.test(t))return;var a=Object(S.a)(t),c={text:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430",color:"primary"};a||(c={text:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u0440\u0440\u0435\u043a\u0442\u043d\u044b\u0439 \u043d\u043e\u043c\u0435\u0440",color:"secondary"}),$(c),D(a)}p(t)},label:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c",name:"name",placeholder:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430",InputProps:{startAdornment:"phone"===y.type&&A&&Object(i.jsx)(_.a,{code:A.country,height:20,fallback:Object(i.jsx)("span",{children:"?!"})})}})]}),Object(i.jsx)(f.a,{className:"row-12 mb-5 w-100",variant:"contained",color:F.color,type:"submit",disabled:!y.type||!y.prize||"phone"===y.type&&!A,children:F.text})]}),(!y.type||!y.prize)&&Object(i.jsx)("div",{className:"row mx-auto mb-5 text-danger",children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0438\u043f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0438 \u0438 \u043f\u0440\u0438\u0437"}),Object(i.jsx)("div",{className:"row",children:Object(i.jsx)("div",{className:"col-12 mt-3",children:Object(i.jsx)("div",{className:"row",children:n.infos.map((function(e,t){return e.prizeId!==y.prize?Object(i.jsx)(i.Fragment,{}):Object(i.jsx)("div",{className:"col-12 mb-3 border-bottom",children:Object(i.jsxs)("div",{className:"row",children:[Object(i.jsxs)("div",{className:"col-xl-10 col-md-12",children:[e.type,": ",e.data]}),Object(i.jsx)(f.a,{className:"col-xl-2 col-md-12",color:"secondary",onClick:function(){return K(e._id)},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]})},t)}))})})})]})]}):Object(i.jsx)("div",{className:"container text-center",children:Object(i.jsx)(g.a,{})})};a(119);var P=function(){var e=Object(i.jsxs)(l.d,{children:[Object(i.jsx)(l.b,{path:"/",exact:!0,children:Object(i.jsx)(O,{})}),Object(i.jsx)(l.b,{path:"/create",children:Object(i.jsx)(y,{})}),Object(i.jsx)(l.b,{path:"/contest/:id",children:Object(i.jsx)(E,{})}),Object(i.jsx)(l.a,{to:"/"})]});return Object(i.jsxs)(s.a,{children:[Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(o,{}),e]}),Object(i.jsx)(w.a,{})]})};r.a.render(Object(i.jsx)(P,{}),document.getElementById("root"))},91:function(e,t,a){},92:function(e,t,a){}},[[120,1,2]]]);
//# sourceMappingURL=main.b8af8b98.chunk.js.map