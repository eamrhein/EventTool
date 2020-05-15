(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{137:function(e,a,t){e.exports=t(171)},143:function(e,a,t){},171:function(e,a,t){"use strict";t.r(a);var n=t(79),r=t.n(n),l=t(99),i=t(0),c=t.n(i),o=t(44),s=t.n(o),u=(t(143),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function m(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("","/service-worker.js");u?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):d(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):d(a,e)}))}}function d(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var g=t(9),p=t(43),E=t(45),f=t(17),b=t(19),h=t(27),v=t.n(h);function y(){var e=Object(b.a)(["\n    query fetchCategories($apikey: String!) {\n      categories(apikey: $apikey) {\n        name\n        id\n      }\n      subcategories(apikey: $apikey) {\n        name\n        id\n        parent\n      }\n      types(apikey: $apikey) {\n        name\n        id\n      }\n      account(apikey: $apikey) {\n        name\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return y=function(){return e},e}function k(){var e=Object(b.a)(["\n    query fetchAccount($apikey: String!) {\n      account(apikey: $apikey) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return k=function(){return e},e}function O(){var e=Object(b.a)(["\n    query fetchAccounts($apikeys: [String!]) {\n      accounts(apikeys: $apikeys) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return O=function(){return e},e}function j(){var e=Object(b.a)(["\n    query fetchUser($userId: ID!) {\n      user(id: $userId) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return j=function(){return e},e}function S(){var e=Object(b.a)(["\n    query fetchUserId {\n      userId @client\n    }\n  "]);return S=function(){return e},e}function w(){var e=Object(b.a)(["\n    query IsUserLoggedIn {\n      isLoggedIn @client\n    }\n  "]);return w=function(){return e},e}var I={IS_LOGGED_IN:v()(w()),FETCH_USER_ID:v()(S()),FETCH_USER:v()(j()),FETCH_ACCOUNTS:v()(O()),FETCH_ACCOUNT:v()(k()),FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES:v()(y())},C=I.IS_LOGGED_IN,x=function(e){var a=e.component,t=e.path,n=e.exact,r=e.routeType,l=Object(p.a)(e,["component","path","exact","routeType"]),i=Object(f.c)(C),o=i.data;if(i.error)return c.a.createElement("p",null,"Error");var s=o.isLoggedIn;return"protected"===r?c.a.createElement(E.b,{path:t,exact:n,render:function(e){return s?c.a.createElement(a,Object.assign({},e,l)):c.a.createElement(E.a,{to:"/login"})}}):c.a.createElement(E.b,{path:t,exact:n,render:function(e){return s?c.a.createElement(E.a,{to:"/"}):c.a.createElement(a,Object.assign({},e,l))}})},A=t(47);function z(){var e=Object(b.a)(["\n    mutation submitForm($id: ID!, $date: String!, $data: String!) {\n      scheduleEvent(id: $id, date: $date, data: $data) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return z=function(){return e},e}function T(){var e=Object(b.a)(["\n    mutation deleteAPIkey($id: ID!, $apikey: String!) {\n      deleteAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return T=function(){return e},e}function _(){var e=Object(b.a)(["\n    mutation pushAPIkey($id: ID!, $apikey: String!) {\n      pushAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return _=function(){return e},e}function F(){var e=Object(b.a)(["\n    mutation VerifyUser($token: String!) {\n      verifyUser(token: $token) {\n        id\n        loggedIn\n      }\n    }\n  "]);return F=function(){return e},e}function $(){var e=Object(b.a)(["\n    mutation RegisterUser($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return $=function(){return e},e}function P(){var e=Object(b.a)(["\n    mutation LoginUser($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return P=function(){return e},e}var D={LOGIN_USER:v()(P()),REGISTER_USER:v()($()),VERIFY_USER:v()(F()),PUSH_API_KEY:v()(_()),DELETE_API_KEY:v()(T()),SUBMIT_FORM:v()(z())},L=t(35),R=t(224),U=t(225),q=t(226),M=t(14),K=t(174),N=t(218),V=t(187),G=D.DELETE_API_KEY,H=I.FETCH_ACCOUNT,B=I.FETCH_USER;function W(e){var a=e.apikey,t=e.id,n=e.userId,r=e.selectedKey,l=e.setSelectedKey,o=Object(i.useState)(!1),s=Object(g.a)(o,2),u=s[0],m=s[1],d=Object(f.b)(G,{onError:function(e){var a=e.message.split(":")[1];console.log(a)},update:function(e,a){var t=a.data.deleteAPIkey,r=e.readQuery({query:B,variables:{userId:n}});e.writeQuery({query:B,variables:{userId:n},data:{user:Object(M.a)({},r.user,{apikeys:t.apikeys})}})}}),p=Object(g.a)(d,1)[0],E=Object(f.c)(H,{variables:{apikey:a}}),b=E.loading,h=E.data,v=E.error;if(v)return c.a.createElement("h3",{style:{color:"red",fontWeight:"bolder"}},v.message.split(":")[1]);if(b)return null;var y=h.account;return c.a.createElement(L.a,{focusIndicator:!1,width:"100vw",key:t,direction:"row",border:a===r?{color:"brand",size:"small"}:{size:"small"},background:{light:"light-2",dark:"dark-1"},as:"button",type:"button",style:{cursor:"pointer"},onClick:function(){return l(a)}},c.a.createElement(L.a,{pad:"xsmall",direction:"column"},c.a.createElement(K.a,{size:"xsmall",truncate:!0},c.a.createElement(K.a,{size:"xsmall",weight:"bold"},"Account Name:")," ",y.name),c.a.createElement(K.a,{size:"xsmall",truncate:!0},c.a.createElement(K.a,{size:"xsmall",weight:"bold"},"Email:")," ",y.email),c.a.createElement(K.a,{size:"xsmall",truncate:!0},c.a.createElement(K.a,{size:"xsmall",weight:"bold"},"API_KEY:")," ",y.apikey)),c.a.createElement("div",{style:{width:"25px",padding:"3px"}},c.a.createElement(V.a,{onMouseEnter:function(){return m(!0)},onMouseLeave:function(){return m(!1)},onClick:function(e){e.preventDefault(),p({variables:{id:n,apikey:a}})},color:u?"status-error":"status-disabled"})))}var Y=function(e){var a=e.user,t=e.selectedKey,n=e.setSelectedKey;return a.apikeys.length>0?c.a.createElement(N.a,{columns:{count:a.apikeys.length<4?a.apikeys.length:4,size:"xsmall"},margin:"small",gap:"small"},a.apikeys.map((function(e,r){return c.a.createElement(W,{key:r,apikey:e,userId:a.id,id:r,selectedKey:t,setSelectedKey:n})}))):c.a.createElement(L.a,{width:"100vw"},c.a.createElement(L.a,{margin:"medium"},c.a.createElement(K.a,{pad:"small"},"Please add the secret keys from the accounts you want to post with.")))},Q=t(219),X=function(e){var a=e.required,t=e.label,n=Object(p.a)(e,["required","label"]);return c.a.createElement(Q.a,Object.assign({label:a?c.a.createElement(L.a,{direction:"row"},c.a.createElement(K.a,null,t),c.a.createElement(K.a,{color:"status-critical"},"*")):t,required:a},n))},J=t(191),Z=t(221),ee=t(135),ae=t(215),te=Object(i.createContext)({}),ne=[{name:"San Francisco",id:"32131232"},{name:"New York",id:"32131232"},{name:"Denver",id:"32131242"},{name:"Austin",id:"32131252"},{name:"Seattle",id:"32131262"},{name:"San Antonio",id:"32131272"},{name:"Boston",id:"32131272"},{name:"Washington D.C.",id:"32131272"},{name:"Miami",id:"32131272"},{name:"Atlanta",id:"32131272"},{name:"Cleveland",id:"32131272"}],re=function(e){var a=e.setFieldValue,t=e.values,n=Object(i.useState)(ne),r=Object(g.a)(n,2),l=r[0],o=r[1],s=Object(i.useState)(!1),u=Object(g.a)(s,2),m=u[0],d=u[1],p=Object(i.useState)(""),E=Object(g.a)(p,2),f=E[0],b=E[1],h=Object(i.useRef)();Object(i.useEffect)((function(){var e=ne.filter((function(e){return e.name.toLowerCase().indexOf(f.toLowerCase())>=0}));setTimeout((function(){d(!1),o(e)}),500)}),[m,f]);var v=function(e){var a=e.name;return c.a.createElement(L.a,{direction:"row",align:"center",pad:"small",flex:!1},c.a.createElement(Z.a,{tabIndex:"-1",checked:t.locations.some((function(e){return e.name===a})),label:c.a.createElement(K.a,{size:"small"},a),onChange:function(){}}))};return c.a.createElement(te.Provider,null,c.a.createElement(X,null,c.a.createElement(ae.a,{ref:h,closeOnChange:!1,placeholder:"Select Content Partners",searchPlaceholder:"Search Content Partners",emptySearchMessage:"No partners found",multiple:!0,value:t.locations.length?c.a.createElement(L.a,{direction:"row",gap:"xsmall",pad:{left:"small",vertical:"small"},align:"center",flex:!0},c.a.createElement(L.a,{background:"brand",round:"medium",align:"center",justify:"center",pad:{horizontal:"xsmall"},style:{minWidth:"21px"}},c.a.createElement(K.a,{size:"small"},t.locations.length)),c.a.createElement(L.a,{flex:!0},c.a.createElement(K.a,{size:"small",truncate:!0},t.locations.map((function(e){return e.name})).join(", "))),c.a.createElement(ee.a,{href:"#",onFocus:function(e){return e.stopPropagation()},onClick:function(e){e.preventDefault(),e.stopPropagation(),a("locations",[]),h.current.focus()}},c.a.createElement(L.a,{background:"accent-4",round:"full"},c.a.createElement(J.a,{style:{width:"12px",height:"12px"}})))):void 0,selected:t.locations.map((function(e){return l.indexOf(e)})),options:l,onChange:function(e){return function(e){var n=Object(A.a)(t.locations),r=n.map((function(e){return e.name})).indexOf(e.name);r>=0?n.splice(r,1):n.push(e);var l=n.map((function(e){return e.name})),i=[].concat(ne).sort(function(e){return function(a,t){var n=e.includes(a.name),r=e.includes(t.name);return!n&&r?1:n&&!r||a.name.toLowerCase()<t.name.toLowerCase()?-1:1}}(l));a("locations",n),o(i)}(e.option)},onSearch:function(e){d(!0),b(e)}},v)))},le=c.a.createElement("svg",{version:"1.1",viewBox:"0 0 32 32",width:"68px",height:"68px",fill:"#f05537"},c.a.createElement("path",{opacity:".25",d:"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}),c.a.createElement("path",{d:"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"},c.a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 16 16",to:"360 16 16",dur:"0.8s",repeatCount:"indefinite"}))),ie=function(){return c.a.createElement(L.a,{align:"center",justify:"center"},le)},ce=t(223),oe=function(e){var a=e.label,t=e.required,n=Object(p.a)(e,["label","required"]);return c.a.createElement(X,{label:a,required:t},c.a.createElement(ce.a,Object.assign({mask:[{length:[1,2],regexp:/^1[0,1-2]$|^0?[1-9]$|^0$/,placeholder:"Hour"},{fixed:":"},{length:2,options:["00","15","30","45"],regexp:/^[0-5][0-9]$|^[0-9]$/,placeholder:"Min"},{fixed:" "},{length:2,options:["AM","PM"],regexp:/^[ap]m$|^[AP]M$|^[aApP]$/,placeholder:"AM/PM"}]},n)))},se=t(192),ue=t(220),me=t(193),de=function(e){var a=e.email,t=e.setEmail,n=e.password,r=e.setPassword,l=e.error,o=e.action,s=e.demo,u=Object(i.useRef)(null);return Object(i.useEffect)((function(){if(s)var e=0,a="demo@demo.com123456",n=setInterval((function(){return e<=13?t(a.slice(0,e)):e<a.length&&e>13?r(a.slice(13,e+1)):(u.current.click(),clearInterval(n)),e++,function(){clearInterval(n)}}),100)}),[t,r,s]),c.a.createElement(se.a,{align:"start",onSubmit:function(e){e.preventDefault(),o({variables:{email:a,password:n}})}},c.a.createElement(Q.a,{info:"Email Address"},c.a.createElement(ue.a,{icon:c.a.createElement(me.a,null),value:a,onChange:function(e){return t(e.target.value)},placeholder:"example@example.com"})),c.a.createElement(Q.a,{info:"Password"},c.a.createElement(ue.a,{value:n,onChange:function(e){return r(e.target.value)},type:"password",placeholder:"Password"})),c.a.createElement(L.a,{style:{color:"Red"},align:"center",height:"20px"},c.a.createElement(K.a,{style:{fontStyle:"italic",fontFamily:"Fira Sans"},size:"large"},l)),c.a.createElement(L.a,null,c.a.createElement(ee.a,{ref:u,size:"large",alignSelf:"end",type:"submit",primary:!0,label:"Submit"})))},ge=D.LOGIN_USER,pe=D.REGISTER_USER,Ee=function(e){var a=Object(i.useState)(""),t=Object(g.a)(a,2),n=t[0],r=t[1],l=Object(i.useState)(["brand","plain","plain"]),o=Object(g.a)(l,2),s=o[0],u=o[1],m=c.a.useState(0),d=Object(g.a)(m,2),p=d[0],E=d[1],b=Object(i.useState)(""),h=Object(g.a)(b,2),v=h[0],y=h[1],k=Object(i.useState)(""),O=Object(g.a)(k,2),j=O[0],S=O[1],w=Object(f.b)(ge,{onCompleted:function(a){var t=a.login,n=t.token,r=t.id;localStorage.setItem("auth-token",n),localStorage.setItem("userId",r),e.history.push("/")},onError:function(e){var a=e.message.split(":")[1];S(a)},update:function(e,a){!function(e,a){var t=a.data;e.writeData({data:{isLoggedIn:t.login.loggedIn,userId:t.login.id}})}(e,a)}}),I=Object(g.a)(w,1)[0],C=Object(f.b)(pe,{onCompleted:function(e){I({variables:{email:n,password:v}})},onError:function(e){var a=e.message.split(":")[1];S(a+"hello")}}),x=Object(g.a)(C,1)[0];return c.a.createElement(L.a,{width:"100vw",height:"100vh",align:"center",justify:"center"},c.a.createElement(R.a,{level:"1",size:"large",color:"brand",style:{userSelect:"none",fontFamily:"Playball"}},"Event Tool"),c.a.createElement(U.a,{activeIndex:p,onActive:function(e){var a=Object(A.a)(s);a[p]="plain",a[e]="brand",u(Object(A.a)(a)),E(e)},pad:"small",width:"70vw"},c.a.createElement(q.a,{title:c.a.createElement(R.a,{color:s[0],level:"3",weight:"bold"},"Login"),pad:"small"},c.a.createElement(de,{email:n,setEmail:r,password:v,setPassword:y,error:j,action:I})),c.a.createElement(q.a,{title:c.a.createElement(R.a,{color:s[1],level:"3",weight:"bold"},"Register")},c.a.createElement(de,{email:n,setEmail:r,password:v,setPassword:y,error:j,action:x})),c.a.createElement(q.a,{title:c.a.createElement(R.a,{color:s[2],level:"3",weight:"bold"},"Demo"),align:"center",pad:"small"},c.a.createElement(de,{email:n,setEmail:r,password:v,setPassword:y,error:j,action:I,demo:!0}))))},fe=t(194),be=t(195),he=t(196),ve=I.IS_LOGGED_IN,ye=function(e){var a=e.responsive,t=e.pending,n=e.setPending,r=(e.mode,e.setMode,Object(f.c)(ve)),l=r.data,i=r.error,o=Object(f.a)();if(i)return c.a.createElement("h3",null,"Error: ",i.message);var s=function(e){e.preventDefault(),localStorage.removeItem("auth-token"),localStorage.removeItem("userId"),o.writeData({data:{isLoggedIn:!1,userId:null}})};return"small"===a?c.a.createElement(fe.a,null,c.a.createElement(be.a,{alignSelf:"center",dropProps:{align:{top:"bottom",left:"left"}},icon:c.a.createElement(he.a,null),pad:"small",items:l.isLoggedIn?[{label:c.a.createElement(Z.a,{background:{light:"light-2",dark:"dark-2"},checked:t,label:"Scheduled Events"}),onClick:function(){return n(!t)}},{label:"Logout",onClick:function(e){return s(e)}}]:[]})):c.a.createElement(fe.a,null,l.isLoggedIn?c.a.createElement(c.a.Fragment,null,c.a.createElement(L.a,{pad:"medium",direction:"row",align:"center"},c.a.createElement(R.a,{level:"1",color:"brand",style:{userSelect:"none",fontFamily:"Playball"}},"Event Tool")),c.a.createElement(L.a,{direction:"row",gap:"small"},c.a.createElement(L.a,{gap:"small",margin:"medium",direction:"row"},c.a.createElement(ee.a,{onClick:function(){n(!t)},style:{fontFamily:"Fira Sans",textDecoration:t?"underline":"none"}},"Scheduled Events")),c.a.createElement(L.a,{gap:"small",margin:"medium",direction:"row"},c.a.createElement(ee.a,{style:{fontFamily:"Fira Sans"},weight:"bold",plain:!0,label:"Logout",onClick:s})))):null)},ke=t(1),Oe=t(66),je=t.n(Oe),Se=t(197),we=t(198),Ie=t(199),Ce=t(200),xe=t(201);function Ae(){var e=Object(b.a)(["\n  @keyframes fadeIn {\n    0% {\n      transition: ease-in;\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n      transition: ease-out;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"]);return Ae=function(){return e},e}var ze=I.FETCH_USER,Te=Object(ke.default)(L.a)(Ae()),_e=function(e){var a=e.user,t=e.pending,n=Object(i.useState)(t),r=Object(g.a)(n,2),l=r[0],o=r[1];Object(i.useEffect)((function(){t&&o(!0)}),[t]);var s=Object(f.c)(ze,{variables:{userId:a.id},pollInterval:500}),u=s.data,m=s.error,d=s.loading;return m?c.a.createElement(L.a,null,c.a.createElement(R.a,{color:"red"},m.message)):d?c.a.createElement(L.a,null,c.a.createElement(R.a,{color:"green"},"Loading")):l&&c.a.createElement(Te,{width:"93vw",pad:"medium",style:{animation:"".concat(t?"fadeIn":"fadeOut"," 1s")},onAnimationEnd:function(){t||o(!1)}},c.a.createElement(Se.a,null,c.a.createElement(we.a,null,c.a.createElement(Ie.a,null,c.a.createElement(Ce.a,{scope:"col",border:"bottom"},"Date"),c.a.createElement(Ce.a,{scope:"col",border:"bottom"},"Status"))),c.a.createElement(xe.a,null,u.user.jobs.map((function(e,a){var t=new Date(e.schedule);return c.a.createElement(Ie.a,{key:a},c.a.createElement(Ce.a,null,je()(t).format("dddd, MMMM Do YYYY, h:mm:ss a")),c.a.createElement(Ce.a,null,e.status))})))))},Fe=t(228),$e=t(69),Pe=t(204),De=t(202),Le=t(203),Re=I.FETCH_USER,Ue=D.PUSH_API_KEY;var qe=function(e){var a=e.user,t=e.selectedKey,n=e.setSelectedKey,r=e.isSubmitting,l=a.apikeys,o=Object(i.useState)(!0),s=Object(g.a)(o,2),u=s[0],m=s[1],d=Object(i.useState)(!1),p=Object(g.a)(d,2),E=p[0],b=p[1];Object(i.useEffect)((function(){n(l[0])}),[l,n]);var h=Object(i.useState)(null),v=Object(g.a)(h,2),y=v[0],k=v[1],O=Object(i.useState)(""),j=Object(g.a)(O,2),S=j[0],w=j[1],I=Object(f.b)(Ue,{onError:function(e){var a=e.message.split(":")[1];k(c.a.createElement(K.a,{size:"small"},a)),setTimeout((function(){k(null)}),1e4)},update:function(e,t){var n=t.data.pushAPIkey,r=e.readQuery({query:Re,variables:{userId:a.id}});console.log(r),e.writeQuery({query:Re,variables:{userId:a.id},data:{user:Object(M.a)({},a,{apikeys:n.apikeys})}})}}),C=Object(g.a)(I,1)[0];return c.a.createElement(L.a,{pad:"medium",width:"100vw",justify:"between",flex:!0},c.a.createElement(R.a,{color:u?"brand":{dark:"light-1",light:"dark-1"},level:"3"},c.a.createElement(ee.a,{plain:!0,onClick:function(){return m(!u)}},"Eventbrite Accounts")),c.a.createElement(L.a,{margin:{right:"small"},direction:"row",justify:"end"},c.a.createElement(L.a,{justify:"center"},c.a.createElement(L.a,{direction:"row",align:"center",gap:"small",label:"Account",as:"button",type:"button",border:{color:"neutral-3",size:"small"},size:"medium",onClick:function(){return b(!E)}},E?c.a.createElement(De.a,{size:"small",color:"neutral-3"}):c.a.createElement(Le.a,{size:"small",color:"neutral-3"}),c.a.createElement(K.a,{size:"small",color:"neutral-3"},"Edit")))),c.a.createElement(Pe.a,{open:u},c.a.createElement(Y,{user:a,selectedKey:t,setSelectedKey:n}),c.a.createElement(Pe.a,{open:E},c.a.createElement(L.a,{margin:"small"},c.a.createElement(Q.a,{error:y,label:"API Key"},c.a.createElement(ue.a,{onChange:function(e){return w(e.target.value)},value:S,placeholder:"2HFXXX2G...."})),c.a.createElement(ee.a,{type:"button",onClick:function(e){e.preventDefault(),C({variables:{id:a.id,apikey:S}}),w("")},color:"neutral-2",label:"Submit"}))),c.a.createElement(L.a,{align:"end"},c.a.createElement(L.a,{direction:"row",gap:"small"},c.a.createElement(ee.a,{label:"Submit",type:"submit",primary:!0,size:"large",color:"brand",disabled:r})))))},Me=t(205),Ke=t(206),Ne=I.FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES;function Ve(e){var a=e.apikey,t=e.values,n=e.handleChange,r=e.setFieldValue,l=e.errors,o=Object(i.useState)(!0),s=Object(g.a)(o,2),u=s[0],m=s[1],d=Object(f.c)(Ne,{variables:{apikey:a}}),p=d.loading,E=d.data,b=d.error;if(p)return c.a.createElement(L.a,{height:"100vh",justify:"center",align:"center"},c.a.createElement(ie,null));if(b)return console.log(b),null;var h=E.categories.map((function(e){return e.name})),v=E.subcategories.filter((function(e){return e.parent===t.category})).map((function(e){return e.name})),y=E.types.map((function(e){return e.name})),k=E.account.organizations.map((function(e){var a=e.name;e.id;return a}));return c.a.createElement(L.a,{pad:"medium",width:"100vw",justify:"between",flex:!0},c.a.createElement(ee.a,{plain:!0,onClick:function(){return m(!u)}},c.a.createElement(R.a,{color:u?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},u?"-":"+"," ",c.a.createElement(Me.a,{color:u?"neutral-2":{dark:"light-1",light:"dark-1"},size:"medium"})," ","Basic Info")),c.a.createElement(Pe.a,{open:u},c.a.createElement(L.a,{margin:"small"},c.a.createElement(X,{margin:"small",info:c.a.createElement(L.a,{align:"end"},c.a.createElement(K.a,{size:"small"},t.title.length," / 70")),error:l.title,label:"Event Title"},c.a.createElement(ue.a,{name:"title",margin:"small",value:t.title,onChange:n,placeholder:"Be clear and descriptive"})),c.a.createElement(L.a,{margin:"small",gap:"small",direction:"row"},c.a.createElement(X,{label:"Type"},c.a.createElement(ae.a,{placeholder:"Type",value:t.type,onChange:function(e){var a=e.option;return r("type",a)},options:y})),c.a.createElement(X,{label:"Category"},c.a.createElement(ae.a,{placeholder:"Music",value:t.category,onChange:function(e){var a=e.option;return r("category",a)},options:h})),v.length>1?c.a.createElement(X,{label:"Subcategory"},c.a.createElement(ae.a,{value:t.subcategory,onChange:function(e){var a=e.option;return r("subcategory",a)},options:v})):null),c.a.createElement(X,{label:"Organizer",margin:"small"},c.a.createElement(ae.a,{value:k[0],options:k}))),c.a.createElement(R.a,{level:"2"},c.a.createElement(Ke.a,null)," Locations"),c.a.createElement(L.a,{margin:"small"},c.a.createElement(X,{label:"Venue",margin:"small"},c.a.createElement(ae.a,{multiple:!1,value:t.locationType||"",placeholder:"Venue",options:["Venue","Online Event","To Be Announced"],onChange:function(e){var a=e.option;return r("locationType",a)}})),"Venue"===t.locationType?c.a.createElement(X,{margin:"small"},c.a.createElement(re,{values:t,setFieldValue:r})):null)))}var Ge=t(222),He=t(217),Be=t(207);function We(e){var a=e.values,t=(e.onChange,e.setFieldValue),n=(e.form,e.setForm,e.apikey,e.screenSize),r=Object(p.a)(e,["values","onChange","setFieldValue","form","setForm","apikey","screenSize"]),l=Object(i.useState)(!1),o=Object(g.a)(l,2),s=o[0],u=o[1],m=new Date,d=m.getFullYear(),E=m.getDate(),f=m.getMonth(),b=[m.toISOString(),new Date(d+5,f,E).toISOString()],h=function(e,n){"start"===n&&t("start",Object(M.a)({},a.start,{time:e.target.value})),"end"===n&&t("end",Object(M.a)({},a.start,{time:e.target.value}))};return c.a.createElement(L.a,{pad:"medium",width:"100vw",fill:!0},c.a.createElement(ee.a,{plain:!0,onClick:function(){return u(!s)}},c.a.createElement(R.a,{color:s?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},s?"-":"+"," ",c.a.createElement(Be.a,{size:"medium",color:s?"neutral-2":{dark:"light-1",light:"dark-1"}})," ","Schedule")),c.a.createElement(Pe.a,{open:s},c.a.createElement(X,{pad:!0,help:c.a.createElement(L.a,{pad:"medium",margin:"small",background:{light:"light-4",dark:"dark-4"}},c.a.createElement(Ge.a,Object.assign({name:"single",label:c.a.createElement(L.a,{margin:"xxsmall"},c.a.createElement(K.a,{size:"small"},c.a.createElement(K.a,{size:"small",weight:"bold"},"Single occurrence")," ","- happens once and can last multiple days")),checked:!a.series,onChange:function(){return t("series",!1)}},r)),c.a.createElement(Ge.a,Object.assign({label:c.a.createElement(L.a,{margin:"xxsmall"},c.a.createElement(K.a,{size:"small"},c.a.createElement(K.a,{size:"small",weight:"bold"},"Recurring events")," ","- repeats or occurs more than once")),name:"series",checked:a.series,onChange:function(){return t("series",!0)}},r))," ")},a.series?c.a.createElement(L.a,{justify:"center",margin:"small",direction:"small"===n?"column":"row"},c.a.createElement(He.a,{bounds:b,size:"medium",range:!0}),c.a.createElement(L.a,{pad:"small",justify:"center"},c.a.createElement(oe,{label:"Start Time:",value:a.start.time,onChange:function(e){return h(e,"start")},required:!0}),c.a.createElement(oe,{label:"End Time:",value:a.end.time,onChange:function(e){return h(e,"end")},required:!0}),c.a.createElement(X,{label:"Occurs:"},c.a.createElement(ae.a,{value:a.recurrence.occurs,options:["Daily","Weekly","Monthly"],onChange:function(e){var n=e.option;return t("recurrence",Object(M.a)({},a.recurrence,{occurs:n}))}})),c.a.createElement(X,{info:"Event repeats "+a.recurrence.times+(a.recurrence.times>1?" times.":" time.")},c.a.createElement(ue.a,{value:a.recurrence.times,onChange:function(e){return t("recurrence",Object(M.a)({},a.recurrence,{times:e.target.value}))}})))):c.a.createElement(L.a,{justify:"around",margin:"small",direction:"small"===n?"column":"row"},c.a.createElement(He.a,{bounds:b,size:"medium",onSelect:function(e){2===e[0].length&&(t("start",Object(M.a)({},a.start,{date:e[0][0]})),t("end",Object(M.a)({},a.end,{date:e[0][1]})))},range:!0}),c.a.createElement(L.a,{pad:"small",justify:"center"},c.a.createElement(oe,{label:"Start Time:",value:a.start.time,onChange:function(e){return h(e,"start")},required:!0}),c.a.createElement(oe,{label:"End Time:",value:a.end.time,onChange:function(e){return h(e,"end")},required:!0}))))))}var Ye=t(120),Qe=t(121),Xe=t(132),Je=t(128),Ze=t(129),ea=t(227),aa=t(208),ta=function(e){Object(Xe.a)(t,e);var a=Object(Je.a)(t);function t(){var e;Object(Ye.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={editor:"",open:!1},e}return Object(Qe.a)(t,[{key:"render",value:function(){var e=this,a=this.props,t=a.values,n=a.setFieldValue,r=a.handleChange,l=function(e){n("description",e.target.getContent())};return c.a.createElement(L.a,{pad:"medium",width:"100vw"},c.a.createElement(ee.a,{plain:!0,onClick:function(){return e.setState(Object(M.a)({},e.state,{open:!e.state.open}))}},c.a.createElement(R.a,{color:this.state.open?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},this.state.open?"-":"+"," ",c.a.createElement(aa.a,{color:this.state.open?"neutral-2":{dark:"light-1",light:"dark-1"},size:"medium"})," ","Event Description")),c.a.createElement(Pe.a,{open:this.state.open},c.a.createElement(L.a,{margin:"small"},c.a.createElement(X,{info:c.a.createElement(L.a,{align:"end"},c.a.createElement(K.a,{size:"small"},t.summary.length," / 140")),label:"Summary"},c.a.createElement(ea.a,{name:"summary",value:t.summary,onChange:r,placeholder:"Write a short event summary to get attendees excited",resize:!1}))),c.a.createElement(L.a,{margin:"small"},c.a.createElement(Ze.a,{name:"description",apiKey:"l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic",initialValue:t.description,init:{height:400,resize:!1,menubar:!1,plugins:["advlist autolink lists link image imagetools","charmap print preview anchor help","searchreplace visualblocks code","insertdatetime media table paste wordcount"],toolbar:"undo redo | formatselect | bold italic | bullist numlist | image"},onChange:l,onBlur:l}))))}}]),t}(c.a.Component),na=t(213),ra=t(209),la=t(210),ia=function(e){var a=e.screenSize,t=e.values,n=e.setFieldValue,r=Object(i.useState)("paid"),l=Object(g.a)(r,2),o=l[0],s=l[1],u=Object(i.useState)(!1),m=Object(g.a)(u,2),d=m[0],p=m[1],E=Object(i.useState)({name:"General Admission",quantity:100,price:"$0.00",num:0}),f=Object(g.a)(E,2),b=f[0],h=f[1];return c.a.createElement(L.a,{pad:"medium",width:"100vw"},c.a.createElement(ee.a,{plain:!0,onClick:function(){return p(!d)}},c.a.createElement(R.a,{color:d?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},d?"-":"+"," ",c.a.createElement(ra.a,{color:d?"neutral-2":{dark:"light-1",light:"dark-1"},size:"medium"})," ","Tickets")),c.a.createElement(Pe.a,{open:d},c.a.createElement(L.a,{gap:"medium",justify:"center",direction:"small"===a?"column":"row"},c.a.createElement(L.a,{pad:"small",width:"small"===a?"100%":"50%"},c.a.createElement(L.a,{gap:"medium",justify:"center",pad:"small",direction:"row"},c.a.createElement(L.a,{focusIndicator:!1,as:"button",pad:"medium",border:"paid"===o?{size:"small",color:"brand"}:{size:"small"},background:{light:"light-2",dark:"dark-1"},style:"paid"===o?{userSelect:"none",background:"rgba(240, 85, 55, 0.2)"}:{userSelect:"none"},onClick:function(){return s("paid")}},c.a.createElement(K.a,null,"Paid")),c.a.createElement(L.a,{focusIndicator:!1,as:"button",border:"free"===o?{size:"small",color:"brand"}:{size:"small"},onClick:function(){h(Object(M.a)({},b,{price:"$0.00"})),s("free")},background:{light:"light-2",dark:"dark-1"},style:"free"===o?{userSelect:"none",background:"rgba(240, 85, 55, 0.2)"}:{userSelect:"none"},pad:"medium"},c.a.createElement(K.a,null,"Free"))),c.a.createElement(X,{label:"Name",required:!0},c.a.createElement(ue.a,{value:"General Admission"===b.name?"":b.name,placeholder:b.name,onChange:function(e){return h(Object(M.a)({},b,{name:e.target.value}))}})),c.a.createElement(X,{label:"Quantity",required:!0},c.a.createElement(ce.a,{value:b.quantity,mask:[{length:[1,6],regexp:/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/}],onChange:function(e){return h(Object(M.a)({},b,{quantity:e.target.value}))}})),c.a.createElement(X,{label:"Price",required:"paid"===o,disabled:"free"===o,style:{position:"relative"}},c.a.createElement(ce.a,{icon:c.a.createElement(la.a,null),onBlur:function(){b.price.split(".").length<2&&h(Object(M.a)({},b,{price:b.price+".00"}))},mask:[{fixed:"$"},{length:[1,5],regexp:/^\d{1,5}$/},{fixed:"."},{length:[2],regexp:/^[0-9]/,placeholder:"00"}],placeholder:"$0.00"===b.price?"Free":null,value:"$0.00"===b.price?"":b.price,disabled:"free"===o,onChange:function(e){return h(Object(M.a)({},b,{price:e.target.value}))}})),c.a.createElement(L.a,{alignSelf:"center",width:"30%"},c.a.createElement(ee.a,{primary:!0,onClick:function(e){h(Object(M.a)({},b,{num:b.num+1})),n("tickets",[].concat(Object(A.a)(t.tickets),[b]))},size:"medium",label:"Create Ticket"}))),c.a.createElement(L.a,{pad:"small",width:"small"===a?"100%":"50%"},t.tickets.length>0?c.a.createElement(L.a,{width:"100%",align:"center"},c.a.createElement(na.a,{primaryKey:"num",columns:[{property:"name",header:c.a.createElement(K.a,null,"Name")},{property:"quantity",header:c.a.createElement(K.a,null,"Qty")},{property:"price",header:c.a.createElement(K.a,null,"Price"),render:function(e){return"$0.00"===e.price?"Free":e.price}},{property:"num",render:function(e){return c.a.createElement(L.a,{round:"full",overflow:"hidden"},c.a.createElement(ee.a,{size:"small",hoverIndicator:"accent-1",onClick:function(){n("tickets",t.tickets.filter((function(a){return a.num!==e.num})))},icon:c.a.createElement(V.a,null)}))}}],data:t.tickets})):c.a.createElement(L.a,{height:"100%",align:"center",justify:"center"},c.a.createElement(K.a,null,"Add Ticket"))))))},ca={title:"",locationType:"",category:"Category",subcategory:"subcategory",organization:"",locations:[],type:"Type",summary:"",description:"",start:{date:(new Date).toISOString(),time:""},end:{date:(new Date).toISOString(),time:""},series:!1,recurrence:{times:1,occurs:"Daily"},tickets:[]};function oa(){var e=Object(b.a)(["\n  @keyframes fadeIn {\n    0% {\n      transition: ease-in;\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n      transition: ease-out;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"]);return oa=function(){return e},e}var sa=D.SUBMIT_FORM,ua=I.FETCH_USER,ma=Object(ke.default)(L.a)(oa());var da=function(e){var a=e.user,t=e.responsive,n=e.history,r=e.pending,l=e.defaultKey,o=Object(i.useState)(ca),s=Object(g.a)(o,2),u=s[0],m=(s[1],Object(i.useState)(l)),d=Object(g.a)(m,2),p=d[0],E=d[1],b=Object(f.b)(sa,{onError:function(e){console.log(e)},update:function(e,t){var n=t.data.scheduleEvent;e.writeQuery({query:ua,variables:{userId:a.id},data:{user:Object(M.a)({},n)},fetchPolicy:"no-cache"})}}),h=(Object(g.a)(b,1)[0],je()(new Date).add("10","seconds").toISOString(),Object(i.useState)(!0)),v=Object(g.a)(h,2),y=v[0],k=v[1];return Object(i.useEffect)((function(){r||k(!0)}),[r]),a.apikeys&&a.apikeys.length>0?y&&c.a.createElement(ma,{onAnimationEnd:function(){r&&k(!1)},style:{animation:"".concat(r?"fadeOut":"fadeIn"," 1s")},value:u,pad:"medium"},c.a.createElement($e.b,{initialValues:ca,validateOnChange:!1,validateOnBlur:!1,onSubmit:function(e,a){var t=a.setSubmitting;console.log(e),t()}},(function(e){var r=e.values,l=e.errors,i=e.handleChange,o=e.handleSubmit,s=e.isSubmitting,u=e.setFieldValue;return c.a.createElement($e.a,{onSubmit:o},c.a.createElement(qe,{user:a,selectedKey:p,setSelectedKey:E,history:n,isSubmitting:s}),c.a.createElement(Ve,{values:r,setFieldValue:u,handleChange:i,apikey:p,errors:l}),c.a.createElement(We,{values:r,setFieldValue:u,handleChange:i,screenSize:t,apikey:p,errors:l}),c.a.createElement(ta,{values:r,setFieldValue:u,handleChange:i,apikey:p,errors:l}),c.a.createElement(ia,{values:r,setFieldValue:u,screenSize:t,errors:l}))}))):c.a.createElement(L.a,{border:{color:"brand",size:"medium"},pad:"medium",align:"center",justify:"center"},c.a.createElement(R.a,{style:{fontFamily:"Fira Sans",fontWeight:"900"},margin:"small"},"Welcome to Event Tool"),c.a.createElement(L.a,{width:"70%",margin:"medium",align:"start"},c.a.createElement(R.a,{margin:"small",level:"3"},"How to use this application:"),c.a.createElement(Fe.a,{margin:"small"},"In order to use this application you need to:"),c.a.createElement(L.a,{margin:{left:"large"}},c.a.createElement(Fe.a,null,"1. Login to an Eventbrite account"),c.a.createElement(Fe.a,null,"2. Go to Account Settings"),c.a.createElement(Fe.a,null,"3. Click the Developer Links Section"),c.a.createElement(Fe.a,null,"4. Click the create api key button and fill out the nessesary data"),c.a.createElement(Fe.a,null,'5. Copy the "Private Token" and paste into the eventbrite accounts form above'," "))))},ga=I.FETCH_USER_ID,pa=I.FETCH_USER;var Ea=function(e){var a=e.responsive,t=e.pending,n=Object(f.c)(ga),r=n.data.userId,l=n.error,i=n.loading,o=Object(f.c)(pa,{variables:{userId:r}}),s=o.data,u=o.error,m=o.loading;if(l||u)return c.a.createElement("h3",null,"Error: ",l||u);if(i||m)return c.a.createElement(L.a,{height:"100vh",justify:"center",align:"center"},c.a.createElement(ie,null));var d=s.user,g=d.apikeys[0];return c.a.createElement(L.a,{direction:"row",justify:"start",align:"start",height:"100vh"},c.a.createElement(L.a,null,c.a.createElement(_e,{user:d,pending:t}),c.a.createElement(da,{pending:t,responsive:a,user:d,defaultKey:g})))},fa=t(211),ba=t(216),ha=t(212),va=t(124),ya=Object(va.deepMerge)(fa.a,{defaultMode:"dark",global:{font:{family:"Noto Sans"},colors:{brand:"#f05537","accent-1":"#73a580","accent-2":"#F48668","accent-3":"#c5c392","neutral-1":"#EEA960","neutral-2":"#3659e3","neutral-3":"#47AE6A",inactive:"#6f7287",focus:"none"}}});var ka=function(e){var a=Object(i.useState)(!1),t=Object(g.a)(a,2),n=t[0],r=t[1],l=Object(i.useState)(!1),o=Object(g.a)(l,2),s=o[0],u=o[1];return window.setDarkMode=u,c.a.createElement(ba.a,{theme:ya,themeMode:s?"dark":"light"},c.a.createElement(ha.a.Consumer,null,(function(a){return c.a.createElement(L.a,{height:{max:"100vh"},style:{transition:"0.25s ease-out"},background:{light:"light-3",dark:"dark-1"},overflow:"auto"},c.a.createElement(ye,{responsive:a,pending:n,setPending:r}),c.a.createElement(L.a,Object.assign({tag:"main",direction:"column",align:"center",justify:"start"},e),c.a.createElement(E.d,null,c.a.createElement(x,{responsive:a,path:"/login",component:Ee,routeType:"auth"}),c.a.createElement(x,{exact:!0,path:"/",responsive:a,component:Ea,pending:n,routeType:"protected"}),c.a.createElement(E.a,{to:"/"}))))})))},Oa=t(62),ja=t(125),Sa=t.n(ja),wa=t(46),Ia=t(130),Ca=t(126),xa=t(131),Aa=t(23),za=t(127),Ta=t(25),_a=D.VERIFY_USER,Fa=new Ia.a({dataIdFromObject:function(e){return e._id||null}}),$a=Object(za.a)((function(e){var a=e.graphQLErrors;a&&a.map((function(e){var a=e.message;return console.log(a)}))})),Pa=(window.location.hostname,Object(xa.a)({uri:"/graphql",headers:{authorization:localStorage.getItem("auth-token")}})),Da=function(){var e=Object(l.a)(r.a.mark((function e(){var a,t,n,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Ca.persistCache)({cache:Fa,storage:window.localStorage});case 2:a=new wa.c({link:Ta.a.from([$a,Pa]),cache:Fa,onError:function(e){var a=e.networkError,t=e.graphQLErrors;console.log("graphQLErrors",t),console.log("networkError",a)},resolvers:{}}),t=localStorage.getItem("auth-token"),n=localStorage.getItem("userId"),Fa.writeData({data:{isLoggedIn:Boolean(t),userId:n}}),t&&a.mutate({mutation:_a,variables:{token:t}}).then((function(e){var a=e.data;Fa.writeData({data:{isLoggedIn:a.verifyUser.loggedIn,userId:a.verifyUser.id}})})),l=function(){return c.a.createElement(Aa.a,{client:a},c.a.createElement(Oa.a,null,c.a.createElement(ka,null)))},Sa.a.load({google:{families:["Playball","Fira Sans","Noto Sans"]}}),s.a.render(c.a.createElement(l,null),document.getElementById("root")),m();case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();document.addEventListener("DOMContentLoaded",(function(e){Da()}))}},[[137,1,2]]]);
//# sourceMappingURL=main.ce0fbda3.chunk.js.map