(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{117:function(e,a,t){e.exports=t(148)},122:function(e,a,t){},148:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(36),i=t.n(l),o=(t(122),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function c(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var s=t(13),u=t(28),m=t(38),d=t(161),g=t(21),p=t(26),E=t.n(p);function b(){var e=Object(g.a)(["\n    query fetchCategories($apikey: String!) {\n      categories(apikey: $apikey) {\n        name\n        id\n      }\n      subcategories(apikey: $apikey) {\n        name\n        id\n        parent\n      }\n      types(apikey: $apikey) {\n        name\n        id\n      }\n      account(apikey: $apikey) {\n        name\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return b=function(){return e},e}function h(){var e=Object(g.a)(["\n    query fetchAccount($apikey: String!) {\n      account(apikey: $apikey) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return h=function(){return e},e}function f(){var e=Object(g.a)(["\n    query fetchAccounts($apikeys: [String!]) {\n      accounts(apikeys: $apikeys) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return f=function(){return e},e}function v(){var e=Object(g.a)(["\n    query fetchUser($userId: ID!) {\n      user(id: $userId) {\n        id\n        email\n        apikeys\n      }\n    }\n  "]);return v=function(){return e},e}function y(){var e=Object(g.a)(["\n    query fetchUserId {\n      userId @client\n    }\n  "]);return y=function(){return e},e}function k(){var e=Object(g.a)(["\n    query IsUserLoggedIn {\n      isLoggedIn @client\n    }\n  "]);return k=function(){return e},e}var O={IS_LOGGED_IN:E()(k()),FETCH_USER_ID:E()(y()),FETCH_USER:E()(v()),FETCH_ACCOUNTS:E()(f()),FETCH_ACCOUNT:E()(h()),FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES:E()(b())},j=O.IS_LOGGED_IN,w=function(e){var a=e.component,t=e.path,n=e.exact,l=e.routeType,i=Object(u.a)(e,["component","path","exact","routeType"]);return r.a.createElement(d.a,{query:j},(function(e){var o=e.data;return"auth"===l?r.a.createElement(m.b,{path:t,exact:n,render:function(e){return o.isLoggedIn?r.a.createElement(m.a,{to:"/"}):r.a.createElement(a,Object.assign({},e,i))}}):r.a.createElement(m.b,Object.assign({},i,{render:function(e){return o.isLoggedIn?r.a.createElement(a,Object.assign({},e,i)):r.a.createElement(m.a,{to:"/login"})}}))}))},S=t(12);function I(){var e=Object(g.a)(["\n    mutation deleteAPIkey($id: ID!, $apikey: String!) {\n      deleteAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n      }\n    }\n  "]);return I=function(){return e},e}function C(){var e=Object(g.a)(["\n    mutation pushAPIkey($id: ID!, $apikey: String!) {\n      pushAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n      }\n    }\n  "]);return C=function(){return e},e}function x(){var e=Object(g.a)(["\n    mutation VerifyUser($token: String!) {\n      verifyUser(token: $token) {\n        id\n        loggedIn\n      }\n    }\n  "]);return x=function(){return e},e}function _(){var e=Object(g.a)(["\n    mutation RegisterUser($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return _=function(){return e},e}function A(){var e=Object(g.a)(["\n    mutation LoginUser($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return A=function(){return e},e}var T={LOGIN_USER:E()(A()),REGISTER_USER:E()(_()),VERIFY_USER:E()(x()),PUSH_API_KEY:E()(C()),DELETE_API_KEY:E()(I())},P=t(27),$=t(181),D=t(162),R=t(177),z=t(178),U=t(73),L=t(72),F=function(e){var a=e.label,t=e.onClick,n="tab-item",l=!1;return e.activeTab===a&&(n+="active",l=!0),r.a.createElement(P.a,{margin:"medium",className:n,onClick:function(){return t(a)}},r.a.createElement(L.a,{weight:l?"bold":"normal"},a))},q=function(e){var a=e.children,t=Object(n.useState)(a[0].props.label),l=Object(s.a)(t,2),i=l[0],o=l[1],c=function(e){o(e)};return r.a.createElement(P.a,null,r.a.createElement(P.a,{direction:"row"},a.map((function(e){var a=e.props.label;return r.a.createElement(F,{activeTab:i,key:a,label:a,onClick:c})}))),r.a.createElement(P.a,null,a.map((function(e){if(e.props.label===i)return e.props.children}))))},N=t(163),M=function(e){var a=e.email,t=e.setEmail,l=e.password,i=e.setPassword,o=e.login,c=e.error,s=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e=0,a="demo@demo.com123456",n=setInterval((function(){return e<=13?t(a.slice(0,e)):e<a.length&&e>13?i(a.slice(13,e+1)):(s.current.click(),clearInterval(n)),e++,function(){clearInterval(n)}}),200)}),[t,i]),r.a.createElement(D.a,{align:"end",onSubmit:function(e){e.preventDefault(),o({variables:{email:a,password:l}})}},r.a.createElement(R.a,{info:"Email Address",align:"start"},r.a.createElement(z.a,{icon:r.a.createElement(N.a,null),value:a,onChange:function(e){return t(e.target.value)},placeholder:"example@example.com"})),r.a.createElement(R.a,{info:"Password",align:"start"},r.a.createElement(z.a,{value:l,onChange:function(e){return i(e.target.value)},type:"password",placeholder:"Password"})),r.a.createElement(U.a,{ref:s,margin:{left:"auto"},type:"submit",primary:!0,label:"Submit"}),r.a.createElement(P.a,{style:{color:"Red"},align:"center",height:"20px",pad:"large"},c))},G=T.LOGIN_USER,H=T.REGISTER_USER,W=function(e){var a=Object(n.useState)(""),t=Object(s.a)(a,2),l=t[0],i=t[1],o=Object(n.useState)(""),c=Object(s.a)(o,2),u=c[0],m=c[1],d=Object(n.useState)(""),g=Object(s.a)(d,2),p=g[0],E=g[1],b=Object(S.b)(G,{onCompleted:function(a){var t=a.login,n=t.token,r=t.id;localStorage.setItem("auth-token",n),localStorage.setItem("userId",r),e.history.push("/")},onError:function(e){var a=e.message.split(":")[1];E(a)},update:function(e,a){!function(e,a){var t=a.data;e.writeData({data:{isLoggedIn:t.login.loggedIn,userId:t.login.id}})}(e,a)}}),h=Object(s.a)(b,1)[0],f=Object(S.b)(H,{onCompleted:function(e){h({variables:{email:l,password:u}})},onError:function(e){var a=e.message.split(":")[1];E(a+"hello")}}),v=Object(s.a)(f,1)[0];return r.a.createElement(P.a,{width:"100%",height:"100%",align:"center"},r.a.createElement($.a,null,"Event Tool"),r.a.createElement(q,null,r.a.createElement(P.a,{label:"Login",align:"center",pad:"small"},r.a.createElement(D.a,{align:"end",onSubmit:function(e){e.preventDefault(),h({variables:{email:l,password:u}})}},r.a.createElement(R.a,{info:"Email Address",align:"start"},r.a.createElement(z.a,{icon:r.a.createElement(N.a,null),value:l,onChange:function(e){return i(e.target.value)},placeholder:"example@example.com"})),r.a.createElement(R.a,{info:"Password",align:"start"},r.a.createElement(z.a,{value:u,onChange:function(e){return m(e.target.value)},type:"password",placeholder:"Password"})),r.a.createElement(U.a,{margin:{left:"auto"},type:"submit",primary:!0,label:"Submit"}),r.a.createElement(P.a,{style:{color:"Red"},align:"center",height:"20px",pad:"large"},p))),r.a.createElement(P.a,{label:"Register"},r.a.createElement(D.a,{align:"end",onSubmit:function(e){e.preventDefault(),v({variables:{email:l,password:u}})}},r.a.createElement(R.a,{info:"Email Address",align:"start"},r.a.createElement(z.a,{value:l,onChange:function(e){return i(e.target.value)},placeholder:"example@example.com"})),r.a.createElement(R.a,{info:"Password",align:"start"},r.a.createElement(z.a,{value:u,onChange:function(e){return m(e.target.value)},type:"password",placeholder:"Password"})),r.a.createElement(U.a,{margin:{left:"auto"},type:"submit",primary:!0,label:"Submit"}),r.a.createElement(P.a,{style:{color:"Red"},align:"center",height:"20px",pad:"large"},p))),r.a.createElement(P.a,{label:"Demo",align:"center",pad:"small"},r.a.createElement(M,{error:p,login:h,password:u,setPassword:m,email:l,setEmail:i}))))},B=t(164),Y=t(166),K=t(167),V=t(179),Q=t(165),X=t(168),J=t(169),Z=O.IS_LOGGED_IN,ee=function(e){var a=e.sidePanel,t=e.setSidePanel,n=e.pending,l=e.setPending,i=e.mode,o=e.setMode,c=(Object(u.a)(e,["sidePanel","setSidePanel","pending","setPending","mode","setMode"]),Object(S.c)(Z)),s=c.data,m=c.error,d=Object(S.a)();if(m)return r.a.createElement("h3",null,"Error: ",m.message);var g=function(e){e.preventDefault(),localStorage.removeItem("auth-token"),localStorage.removeItem("userId"),d.writeData({data:{isLoggedIn:!1,userId:null}})};return r.a.createElement(B.a,{height:"8vh",background:{light:"light-2",dark:"dark-1"},style:{transition:"0.25s ease-out"},width:"100vw",pad:"small"},r.a.createElement(P.a,{direction:"row",align:"center"},r.a.createElement($.a,{margin:"xsmall",level:"1",color:"brand",style:{userSelect:"none"}},"Event Tool"),r.a.createElement(Q.a,{color:"brand",size:"large"})),r.a.createElement(Y.a.Consumer,null,(function(e){return"small"===e?r.a.createElement(r.a.Fragment,null,r.a.createElement(U.a,{margin:"none",primary:!0,color:"accent-1",label:"Submit"}),r.a.createElement(K.a,{dropProps:{align:{top:"bottom",left:"left"}},icon:r.a.createElement(X.a,null),pad:"small",items:s.isLoggedIn?[{label:r.a.createElement(V.a,{checked:i,label:"Dark Mode"}),onClick:function(){return o(!i)}},{label:r.a.createElement(V.a,{checked:a,label:"Options"}),onClick:function(){return t(!a)}},{label:"Logout",onClick:function(e){return g(e)}}]:[]})):r.a.createElement(P.a,{direction:"row",gap:"small"},r.a.createElement(V.a,{label:"Dark Mode",checked:i,onChange:function(){return o(!i)},toggle:!0}),s.isLoggedIn?r.a.createElement(r.a.Fragment,null,r.a.createElement(V.a,{label:"Options",checked:a,onClick:function(){l(!1),t(!a)},toggle:!0}),r.a.createElement(V.a,{label:"Pending",checked:n,onClick:function(){l(!n),t(!1)},toggle:!0}),r.a.createElement(P.a,{gap:"small",margin:"medium",direction:"row"},r.a.createElement(U.a,{primary:!0,color:"accent-1",label:"Submit"}),r.a.createElement(U.a,{icon:r.a.createElement(J.a,null),color:{light:"brand",dark:"brand"},primary:!0,label:"Logout",onClick:g,style:{cursor:"pointer"}}))):null)})))},ae=t(11),te=t(171),ne=t(170),re=T.DELETE_API_KEY,le=O.FETCH_ACCOUNT,ie=O.FETCH_USER;function oe(e){var a=e.apikey,t=e.id,l=e.userId,i=e.active,o=e.setActive,c=Object(n.useState)(!1),u=Object(s.a)(c,2),m=u[0],d=u[1],g=Object(S.b)(re,{onError:function(e){var a=e.message.split(":")[1];console.log(a)},update:function(e,a){var t=a.data.deleteAPIkey,n=e.readQuery({query:ie,variables:{userId:l}});e.writeQuery({query:ie,variables:{userId:l},data:{user:Object(ae.a)({},n.user,{apikeys:t.apikeys})}})}}),p=Object(s.a)(g,1)[0],E=Object(S.c)(le,{variables:{apikey:a}}),b=E.loading,h=E.data,f=E.error;if(f)return r.a.createElement("h3",{style:{color:"red",fontWeight:"bolder"}},f.message.split(":")[1]);if(b)return null;var v=h.account;return r.a.createElement(P.a,{margin:"none",key:t,direction:"row",border:t===i&&{color:"brand",size:"small"},justify:"between",background:{light:"light-4",dark:"dark-5"},flex:"grow",style:{cursor:"pointer"},onClick:function(){return o(t)}},r.a.createElement(P.a,{pad:"xsmall",margin:"xsmall",direction:"column"},r.a.createElement(L.a,{size:"xsmall",truncate:!0},r.a.createElement(L.a,{size:"xsmall",weight:"bold"},"Account Name:")," ",v.name),r.a.createElement(L.a,{size:"xsmall",truncate:!0},r.a.createElement(L.a,{size:"xsmall",weight:"bold"},"Email:")," ",v.email),r.a.createElement(L.a,{size:"xsmall",truncate:!0},r.a.createElement(L.a,{size:"xsmall",weight:"bold"},"API_KEY:")," ",v.apikey)),r.a.createElement("div",{style:{width:"25px",padding:"3px"}},r.a.createElement(ne.a,{onMouseEnter:function(){return d(!0)},onMouseLeave:function(){return d(!1)},onClick:function(e){e.preventDefault(),p({variables:{id:l,apikey:a}})},color:m?"status-error":"status-disabled"})))}var ce=function(e){var a=e.user,t=Object(n.useState)(0),l=Object(s.a)(t,2),i=l[0],o=l[1];return r.a.createElement(te.a,{primaryKey:function(e,t){return r.a.createElement(oe,{key:t,apikey:e,userId:a.id,id:t,active:i,setActive:o})},data:a.apikeys})},se=t(172),ue=t(182),me=O.FETCH_USER,de=T.PUSH_API_KEY;var ge=function(e){var a=e.id,t=Object(S.c)(me,{variables:{userId:a}}),l=t.loading,i=t.data,o=t.error,c=Object(n.useState)(null),u=Object(s.a)(c,2),m=u[0],d=u[1],g=Object(n.useState)(""),p=Object(s.a)(g,2),E=p[0],b=p[1],h=Object(S.b)(de,{onError:function(e){var a=e.message.split(":")[1];d(r.a.createElement(L.a,{size:"small"},a)),setTimeout((function(){d(null)}),1e4)},update:function(e,t){var n=t.data.pushAPIkey;e.writeQuery({query:me,variables:{userId:a},data:{user:Object(ae.a)({},i.user,{apikeys:n.apikeys})}})}}),f=Object(s.a)(h,1)[0];return o?r.a.createElement("h3",null,"Error ",o.message):l?null:r.a.createElement(P.a,{height:"100%",pad:"small",align:"start"},r.a.createElement(P.a,{height:{max:"65.6vh"},width:"100%",overflow:"auto"},r.a.createElement(P.a,{margin:{top:"small",bottom:"small",left:"15px",right:"15px"},pad:"xsmall",background:"brand"},r.a.createElement($.a,{level:"4"},"Accounts")),r.a.createElement(ce,{user:i.user}),r.a.createElement(P.a,null,r.a.createElement(se.a,{alignSelf:"center"},r.a.createElement(ue.a,{height:"30px",pad:"small",margin:{top:"small",bottom:"small",left:"15px",right:"15px"},background:"brand",label:"Add Account"},r.a.createElement(P.a,{margin:"medium"},r.a.createElement(D.a,{onSubmit:function(e){e.preventDefault(),f({variables:{id:i.user.id,apikey:E}}),b("")}},r.a.createElement(R.a,{error:m,label:"API Key",align:"start"},r.a.createElement(z.a,{onChange:function(e){return b(e.target.value)},value:E,placeholder:"2HFXXX2G...."})),r.a.createElement(U.a,{margin:{left:"auto"},type:"submit",primary:!0,label:"Submit"}))))))))},pe=function(e){return r.a.createElement("div",null,"pending")},Ee=t(174),be=function(e){var a=e.required,t=e.label,n=Object(u.a)(e,["required","label"]);return r.a.createElement(R.a,Object.assign({label:a?r.a.createElement(P.a,{direction:"row"},r.a.createElement(L.a,null,t),r.a.createElement(L.a,{color:"status-critical"},"*")):t,required:a},n))},he=t(37),fe=O.FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES;function ve(e){var a=e.apikey,t=e.form,n=e.setForm,l=t.title,i=t.location,o=t.category,c=t.subcategory,s=t.type,u=Object(S.c)(fe,{variables:{apikey:a}}),m=u.loading,d=u.data,g=u.error;if(m)return r.a.createElement(P.a,{width:"100vw"},"...loading");if(g)return console.log(g),null;var p=d.categories.map((function(e){return e.name})),E=d.subcategories.filter((function(e){return e.parent===o})).map((function(e){return e.name})),b=d.types.map((function(e){return e.name})),h=d.account.organizations.map((function(e){var a=e.name;e.id;return a}));return r.a.createElement(P.a,{pad:"small",width:"100vw"},r.a.createElement($.a,{color:{light:"light-6",dark:"dark-6"},level:"2"},r.a.createElement(he.e,{style:{verticalAlign:"bottom"}}),r.a.createElement(L.a,{color:{light:"dark-1",dark:"light-1"},size:"xlarge"}," ","Basic Info")),r.a.createElement(P.a,{margin:{left:"large",top:"small",right:"small",bottom:"small"}},r.a.createElement(be,{margin:"small",required:!0,info:r.a.createElement(P.a,{align:"end"},r.a.createElement(L.a,{size:"small"},l.length," / 70")),label:"Event Title"},r.a.createElement(z.a,{maxLength:"70",margin:"small",value:l,onChange:function(e){return n(Object(ae.a)({},t,{title:e.target.value}))},placeholder:"Be clear and descriptive"})),r.a.createElement(P.a,{margin:"small",gap:"small",direction:"row"},r.a.createElement(be,{label:"Type"},r.a.createElement(Ee.a,{placeholder:"Conference",value:s,onChange:function(e){var a=e.option;return n(Object(ae.a)({},t,{type:a}))},options:b})),r.a.createElement(be,{label:"Category"},r.a.createElement(Ee.a,{placeholder:"Music",value:o,onChange:function(e){var a=e.option;return n(Object(ae.a)({},t,{category:a}))},options:p})),E.length>1?r.a.createElement(be,{label:"Subcategory"},r.a.createElement(Ee.a,{value:c,onChange:function(e){var a=e.option;return n(Object(ae.a)({},t,{subcategory:a}))},options:E})):null),r.a.createElement(be,{label:"Organizer",margin:"small"},r.a.createElement(Ee.a,{value:h[0],options:h}))),r.a.createElement($.a,{color:{light:"light-6",dark:"dark-6"},level:"2"},r.a.createElement(he.c,{style:{verticalAlign:"bottom"}}),r.a.createElement(L.a,{color:{light:"dark-1",dark:"light-1"},size:"xlarge"}," ","Locations")),r.a.createElement(P.a,{margin:{left:"large",top:"small",right:"small",bottom:"small"}},r.a.createElement(be,{label:"Venue",margin:"small",required:!0},r.a.createElement(Ee.a,{value:i,onChange:function(e){var a=e.option;return n(Object(ae.a)({},t,{location:a}))},options:["Venue","Online Event","To Be Announced"]})),"Venue"===i?r.a.createElement(be,{margin:"small"},r.a.createElement(z.a,{icon:r.a.createElement(he.d,null),placeholder:"Search for a venue or address."})):null))}var ye=t(180),ke=t(176),Oe=t(183),je=function(e){var a=e.label,t=e.required,n=Object(u.a)(e,["label","required"]);return r.a.createElement(be,{label:a,required:t},r.a.createElement(Oe.a,Object.assign({mask:[{length:[1,2],options:Array.from({length:12},(function(e,a){return a+1})),regexp:/^1[0,1-2]$|^0?[1-9]$|^0$/,placeholder:"hh"},{fixed:":"},{length:2,options:["00","15","30","45"],regexp:/^[0-5][0-9]$|^[0-9]$/,placeholder:"mm"},{fixed:" "},{length:2,options:["AM","PM"],regexp:/^[ap]m$|^[AP]M$|^[aApP]$/,placeholder:"ap"}]},n)))};function we(e){var a=e.form,t=e.setForm,n=(e.apikey,Object(u.a)(e,["form","setForm","apikey"])),l=new Date,i=l.getFullYear(),o=l.getDate(),c=l.getMonth(),s=[l.toISOString(),new Date(i+5,c,o).toISOString()],m=function(e,n){"start"===n&&t(Object(ae.a)({},a,{start:Object(ae.a)({},a.start,{time:e.target.value})})),"end"===n&&t(Object(ae.a)({},a,{end:Object(ae.a)({},a.end,{time:e.target.value})}))};return console.log(a),r.a.createElement(P.a,{pad:"small",width:"100vw"},r.a.createElement($.a,{color:"status-unknown",level:"2"},r.a.createElement(he.a,{style:{verticalAlign:"bottom"}}),r.a.createElement(L.a,{color:{light:"dark-1",dark:"light-2"},size:"xlarge"}," ","Schedule")),r.a.createElement(P.a,{margin:{left:"large",top:"small",right:"small",bottom:"small"}},r.a.createElement(be,{pad:!0,help:r.a.createElement(P.a,{pad:"medium",margin:"small",background:{light:"light-4",dark:"dark-4"}},r.a.createElement(ye.a,Object.assign({name:"single",label:r.a.createElement(P.a,{margin:"xxsmall"},r.a.createElement(L.a,{size:"small"},r.a.createElement(L.a,{size:"small",weight:"bold"},"Single occurrence")," ","- happens once and can last multiple days")),checked:!a.series,onChange:function(e){return t(Object(ae.a)({},a,{series:!1}))}},n)),r.a.createElement(ye.a,Object.assign({label:r.a.createElement(P.a,{margin:"xxsmall"},r.a.createElement(L.a,{size:"small"},r.a.createElement(L.a,{size:"small",weight:"bold"},"Recurring events")," ","- repeats or occurs more than once")),name:"series",checked:a.series,onChange:function(e){return t(Object(ae.a)({},a,{series:!0}))}},n))," ")},a.series?r.a.createElement(P.a,{justify:"center",margin:"small",direction:"row"},r.a.createElement(ke.a,{bounds:s,size:"medium",range:!0}),r.a.createElement(P.a,{pad:"small",justify:"center"},r.a.createElement(je,{label:"Start Time:",value:a.start.time,onChange:function(e){return m(e,"start")},required:!0}),r.a.createElement(je,{label:"End Time:",value:a.end.time,onChange:function(e){return m(e,"end")},required:!0}),r.a.createElement(be,{label:"Occurs:"},r.a.createElement(Ee.a,{value:a.recurrence.occurs,options:["Daily","Weekly","Monthly"],onChange:function(e){var n=e.option;return t(Object(ae.a)({},a,{recurrence:Object(ae.a)({},a.recurrence,{occurs:n})}))}})),r.a.createElement(be,{info:"Event repeats "+a.recurrence.times+(a.recurrence.times>1?" times.":" time.")},r.a.createElement(z.a,{value:a.recurrence.times,onChange:function(e){return t(Object(ae.a)({},a,{recurrence:Object(ae.a)({},a.recurrence,{times:e.target.value})}))}})))):r.a.createElement(P.a,{justify:"around",margin:"small",direction:"row"},r.a.createElement(ke.a,{bounds:s,size:"medium",onSelect:function(e){2===e[0].length&&t(Object(ae.a)({},a,{start:Object(ae.a)({},a.start,{date:e[0][0]}),end:Object(ae.a)({},a.end,{date:e[0][1]})}))},range:!0}),r.a.createElement(P.a,{pad:"small",justify:"center"},r.a.createElement(je,{label:"Start Time:",value:a.start.time,onChange:function(e){return m(e,"start")},required:!0}),r.a.createElement(je,{label:"End Time:",value:a.end.time,onChange:function(e){return m(e,"end")},required:!0}))))))}var Se=t(102),Ie=t(103),Ce=t(107),xe=t(112),_e=t(108),Ae=t(184),Te=function(e){Object(xe.a)(t,e);var a=Object(Ce.a)(t);function t(){var e;Object(Se.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={editor:""},e.handleEditorChange=function(a){console.log(a.target.getContent()),e.setState({editor:a.target.getContent()}),console.log(e.state)},e}return Object(Ie.a)(t,[{key:"render",value:function(){return r.a.createElement(P.a,{pad:"small",width:"100vw"},r.a.createElement($.a,{color:{light:"light-6",dark:"dark-6"},level:"2"},r.a.createElement(he.b,{style:{verticalAlign:"bottom"}}),r.a.createElement(L.a,{color:{light:"dark-1",dark:"light-1"},size:"xlarge"}," ","Basic Info")),r.a.createElement(P.a,{margin:"small"},r.a.createElement(be,{help:"Summary",info:r.a.createElement(P.a,{align:"end"},r.a.createElement(L.a,{size:"small"}," / 140"))},r.a.createElement(Ae.a,{placeholder:"Write a short event summary to get attendees excited",size:"xsmall",plain:!0,resize:!1}))),r.a.createElement(P.a,{margin:"small"},r.a.createElement(_e.a,{apiKey:"l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic",initialValue:"",init:{height:400,resize:!1,menubar:!1,plugins:["advlist autolink lists link image","charmap print preview anchor help","searchreplace visualblocks code","insertdatetime media table paste wordcount"],toolbar:"undo redo | formatselect | bold italic | bullist numlist"},onChange:this.handleEditorChange})))}}]),t}(r.a.Component),Pe=function(e){return r.a.createElement(P.a,{pad:"small",width:"100vw"},"Tickets")},$e=O.FETCH_USER,De={title:"",location:"Venue",category:"Category",subcategory:"subcategory",type:"Type",start:{date:(new Date).toISOString(),time:""},end:{date:(new Date).toISOString(),time:""},series:!1,recurrence:{times:1,occurs:"Daily"}};var Re=function(e){var a=e.userId,t=Object(n.useState)(De),l=Object(s.a)(t,2),i=l[0],o=l[1],c=Object(S.c)($e,{variables:{userId:a}}),u=c.loading,m=c.data,d=c.error;if(u)return r.a.createElement(P.a,{width:"100vw"},"...loading");if(d)return console.log(d),null;var g=m.user.apikeys[0];return r.a.createElement(D.a,{value:i},r.a.createElement(q,{form:i,setForm:o},r.a.createElement(P.a,{label:"Basic Info"},r.a.createElement(ve,{form:i,setForm:o,apikey:g})),r.a.createElement(P.a,{label:"Schedule"},r.a.createElement(we,{form:i,setForm:o,apikey:g})),r.a.createElement(P.a,{label:"Description"},r.a.createElement(Te,{form:i,setForm:o,apikey:g})),r.a.createElement(P.a,{label:"Tickets"},r.a.createElement(Pe,null))))},ze=t(1);function Ue(){var e=Object(g.a)(["\n  .open {\n    opacity: 1;\n    height: 98%;\n    width: 400px;\n    transform: translateX(2%);\n    transition: 0.25s ease-out;\n  }\n  .closed {\n    opacity: 0;\n    transition: 0.2s ease-in;\n    width: 0;\n    height: 98%;\n    transform: translateX(-130%);\n  }\n  .here {\n    opacity: 1;\n    transition: 0.25s ease-out;\n  }\n  .gone {\n    opacity: 0;\n  }\n"]);return Ue=function(){return e},e}var Le=Object(ze.default)(P.a)(Ue()),Fe=O.FETCH_USER_ID;var qe=function(e){var a=e.sidePanel,t=e.pending,n=Object(u.a)(e,["sidePanel","pending"]),l=Object(S.c)(Fe),i=l.data,o=l.error;return o?r.a.createElement("h3",null,"Error: ",o.message):r.a.createElement(P.a,{height:{min:"92vh"},direction:"column"},r.a.createElement(Le,{style:{position:"relative"},height:"100vh",direction:"row",justify:"start",align:"start"},r.a.createElement(P.a,{elevation:"small",className:a?"open":"closed"},r.a.createElement(ge,{id:i.userId,history:n.history})),r.a.createElement(P.a,{style:{transform:"translateX(-50%)",position:"absolute",zIndex:"1",top:"15%",left:"50%"},pad:"small",background:{dark:"dark-6",light:"light-6"},elevation:"small",className:t?"here":"gone"},r.a.createElement(pe,null)),r.a.createElement(P.a,{height:"100%",width:"100%",direction:"column"},r.a.createElement(Re,{userId:i.userId}))))},Ne=t(173),Me=t(175),Ge=t(105),He=Object(Ge.deepMerge)(Ne.a,{defaultMode:"light",global:{font:{family:"Roboto",size:"18px",height:"20px"}}});var We=function(e){var a=Object(n.useState)(!1),t=Object(s.a)(a,2),l=t[0],i=t[1],o=Object(n.useState)(!1),c=Object(s.a)(o,2),u=c[0],m=c[1],d=Object(n.useState)(!1),g=Object(s.a)(d,2),p=g[0],E=g[1];return r.a.createElement(Me.a,{theme:He,themeMode:p?"dark":"light"},r.a.createElement(ee,{mode:p,setMode:E,sidePanel:l,setSidePanel:i,pending:u,setPending:m}),r.a.createElement(P.a,Object.assign({background:{light:"light-2",dark:"dark-1"},style:{transition:"0.25s ease-out"},tag:"main",direction:"column",align:"center",justify:"start",height:"92vh"},e),r.a.createElement(w,{exact:!0,path:"/login",component:W,routeType:"auth"}),r.a.createElement(w,{exact:!0,path:"/",component:qe,pending:u,sidePanel:l,routeType:"protected"})))},Be=t(64),Ye=t(39),Ke=t(109),Ve=t(110),Qe=t(14),Xe=t(106),Je=t(20),Ze=T.VERIFY_USER,ea=new Ke.a({dataIdFromObject:function(e){return e._id||null}}),aa=Object(Xe.a)((function(e){var a=e.graphQLErrors;a&&a.map((function(e){var a=e.message;return console.log(a)}))})),ta=Object(Ve.a)({uri:"http://localhost:5000/graphql",headers:{authorization:localStorage.getItem("auth-token")}}),na=new Ye.c({link:Je.a.from([aa,ta]),cache:ea,onError:function(e){var a=e.networkError,t=e.graphQLErrors;console.log("graphQLErrors",t),console.log("networkError",a)},resolvers:{}}),ra=localStorage.getItem("auth-token"),la=localStorage.getItem("userId");ea.writeData({data:{isLoggedIn:Boolean(ra),userId:la}}),ra&&na.mutate({mutation:Ze,variables:{token:ra}}).then((function(e){var a=e.data;ea.writeData({data:{isLoggedIn:a.verifyUser.loggedIn,userId:a.verifyUser.id}})}));var ia=function(){return r.a.createElement(Qe.a,{client:na},r.a.createElement(Be.a,null,r.a.createElement(We,null)))};i.a.render(r.a.createElement(ia,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("","/service-worker.js");o?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):c(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):c(a,e)}))}}()}},[[117,1,2]]]);
//# sourceMappingURL=main.98401f71.chunk.js.map