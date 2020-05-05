(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{131:function(e,t,a){e.exports=a(165)},137:function(e,t,a){},165:function(e,t,a){"use strict";a.r(t);var n=a(76),r=a.n(n),l=a(96),i=a(0),c=a.n(i),o=a(41),s=a.n(o),u=(a(137),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function m(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");u?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):d(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):d(t,e)}))}}function d(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var g=a(10),p=a(40),f=a(42),E=a(184),b=a(21),h=a(28),v=a.n(h);function y(){var e=Object(b.a)(["\n    query fetchCategories($apikey: String!) {\n      categories(apikey: $apikey) {\n        name\n        id\n      }\n      subcategories(apikey: $apikey) {\n        name\n        id\n        parent\n      }\n      types(apikey: $apikey) {\n        name\n        id\n      }\n      account(apikey: $apikey) {\n        name\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return y=function(){return e},e}function O(){var e=Object(b.a)(["\n    query fetchAccount($apikey: String!) {\n      account(apikey: $apikey) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return O=function(){return e},e}function j(){var e=Object(b.a)(["\n    query fetchAccounts($apikeys: [String!]) {\n      accounts(apikeys: $apikeys) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return j=function(){return e},e}function k(){var e=Object(b.a)(["\n    query fetchUser($userId: ID!) {\n      user(id: $userId) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return k=function(){return e},e}function w(){var e=Object(b.a)(["\n    query fetchUserId {\n      userId @client\n    }\n  "]);return w=function(){return e},e}function S(){var e=Object(b.a)(["\n    query IsUserLoggedIn {\n      isLoggedIn @client\n    }\n  "]);return S=function(){return e},e}var I={IS_LOGGED_IN:v()(S()),FETCH_USER_ID:v()(w()),FETCH_USER:v()(k()),FETCH_ACCOUNTS:v()(j()),FETCH_ACCOUNT:v()(O()),FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES:v()(y())},C=I.IS_LOGGED_IN,x=function(e){var t=e.component,a=e.path,n=e.exact,r=e.routeType,l=Object(p.a)(e,["component","path","exact","routeType"]);return c.a.createElement(E.a,{query:C},(function(e){var i=e.data;return"auth"===r?c.a.createElement(f.b,{path:a,exact:n,render:function(e){return i.isLoggedIn?c.a.createElement(f.a,{to:"/"}):c.a.createElement(t,Object.assign({},e,l))}}):c.a.createElement(f.b,Object.assign({},l,{render:function(e){return i.isLoggedIn?c.a.createElement(t,Object.assign({},e,l)):c.a.createElement(f.a,{to:"/login"})}}))}))},A=a(46),_=a(16);function $(){var e=Object(b.a)(["\n    mutation submitForm($id: ID!, $date: String!, $data: String!) {\n      scheduleEvent(id: $id, date: $date, data: $data) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return $=function(){return e},e}function T(){var e=Object(b.a)(["\n    mutation deleteAPIkey($id: ID!, $apikey: String!) {\n      deleteAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n      }\n    }\n  "]);return T=function(){return e},e}function z(){var e=Object(b.a)(["\n    mutation pushAPIkey($id: ID!, $apikey: String!) {\n      pushAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n      }\n    }\n  "]);return z=function(){return e},e}function L(){var e=Object(b.a)(["\n    mutation VerifyUser($token: String!) {\n      verifyUser(token: $token) {\n        id\n        loggedIn\n      }\n    }\n  "]);return L=function(){return e},e}function P(){var e=Object(b.a)(["\n    mutation RegisterUser($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return P=function(){return e},e}function F(){var e=Object(b.a)(["\n    mutation LoginUser($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return F=function(){return e},e}var D={LOGIN_USER:v()(F()),REGISTER_USER:v()(P()),VERIFY_USER:v()(L()),PUSH_API_KEY:v()(z()),DELETE_API_KEY:v()(T()),SUBMIT_FORM:v()($())},R=a(19),U=a(172),q=a(219),M=a(220),K=a(6),N=a(85),G=a(186),H=a(185),B=D.DELETE_API_KEY,Y=I.FETCH_ACCOUNT,W=I.FETCH_USER;function Q(e){var t=e.apikey,a=e.id,n=e.userId,r=e.selectedKey,l=e.setSelectedKey,o=Object(i.useState)(!1),s=Object(g.a)(o,2),u=s[0],m=s[1],d=Object(_.b)(B,{onError:function(e){var t=e.message.split(":")[1];console.log(t)},update:function(e,t){var a=t.data.deleteAPIkey,r=e.readQuery({query:W,variables:{userId:n}});e.writeQuery({query:W,variables:{userId:n},data:{user:Object(K.a)(Object(K.a)({},r.user),{},{apikeys:a.apikeys})}})}}),p=Object(g.a)(d,1)[0],f=Object(_.c)(Y,{variables:{apikey:t}}),E=f.loading,b=f.data,h=f.error;if(h)return c.a.createElement("h3",{style:{color:"red",fontWeight:"bolder"}},h.message.split(":")[1]);if(E)return null;var v=b.account;return c.a.createElement(R.a,{focusIndicator:!1,width:"100vw",key:a,direction:"row",border:t===r?{color:"brand",size:"small"}:{size:"small"},background:{light:"light-2",dark:"dark-1"},as:"button",style:{cursor:"pointer"},onClick:function(){return l(t)}},c.a.createElement(R.a,{pad:"xsmall",direction:"column"},c.a.createElement(N.a,{size:"xsmall",truncate:!0},c.a.createElement(N.a,{size:"xsmall",weight:"bold"},"Account Name:")," ",v.name),c.a.createElement(N.a,{size:"xsmall",truncate:!0},c.a.createElement(N.a,{size:"xsmall",weight:"bold"},"Email:")," ",v.email),c.a.createElement(N.a,{size:"xsmall",truncate:!0},c.a.createElement(N.a,{size:"xsmall",weight:"bold"},"API_KEY:")," ",v.apikey)),c.a.createElement("div",{style:{width:"25px",padding:"3px"}},c.a.createElement(H.a,{onMouseEnter:function(){return m(!0)},onMouseLeave:function(){return m(!1)},onClick:function(e){e.preventDefault(),p({variables:{id:n,apikey:t}})},color:u?"status-error":"status-disabled"})))}var V=function(e){var t=e.user,a=e.selectedKey,n=e.setSelectedKey;return t.apikeys.length>0?c.a.createElement(G.a,{primaryKey:function(e,r){return c.a.createElement(Q,{key:r,apikey:e,userId:t.id,id:r,selectedKey:a,setSelectedKey:n})},data:t.apikeys}):c.a.createElement(R.a,{width:"100vw"},c.a.createElement(R.a,{margin:"medium"},c.a.createElement(N.a,{pad:"small"},"Please add the secret keys from the accounts you want to post with.")))},X=a(214),J=function(e){var t=e.required,a=e.label,n=Object(p.a)(e,["required","label"]);return c.a.createElement(X.a,Object.assign({label:t?c.a.createElement(R.a,{direction:"row"},c.a.createElement(N.a,null,a),c.a.createElement(N.a,{color:"status-critical"},"*")):a,required:t},n))},Z=a(188),ee=a(216),te=a(86),ae=a(211),ne=Object(i.createContext)({}),re=[{name:"Location 1",id:"32131232"},{name:"Location 2",id:"32131232"},{name:"Location 3",id:"32131242"},{name:"Location 4",id:"32131252"},{name:"Location 5",id:"32131262"},{name:"Location 6",id:"32131272"},{name:"Location 6",id:"32131272"},{name:"Location 6",id:"32131272"},{name:"Location 6",id:"32131272"},{name:"Location 6",id:"32131272"},{name:"Location 6",id:"32131272"}],le=function(){var e=Object(i.useState)([]),t=Object(g.a)(e,2),a=t[0],n=t[1],r=Object(i.useState)(re),l=Object(g.a)(r,2),o=l[0],s=l[1],u=Object(i.useState)(!1),m=Object(g.a)(u,2),d=m[0],p=m[1],f=Object(i.useState)(""),E=Object(g.a)(f,2),b=E[0],h=E[1],v=Object(i.useRef)();Object(i.useEffect)((function(){var e=re.filter((function(e){return e.name.toLowerCase().indexOf(b.toLowerCase())>=0}));setTimeout((function(){p(!1),s(e)}),500)}),[d,b]);var y=function(e){var t=e.name;return c.a.createElement(R.a,{direction:"row",align:"center",pad:"small",flex:!1},c.a.createElement(ee.a,{tabIndex:"-1",checked:a.some((function(e){return e.name===t})),label:c.a.createElement(N.a,{size:"small"},t),onChange:function(){}}))};return c.a.createElement(ne.Provider,null,c.a.createElement(J,null,c.a.createElement(ae.a,{ref:v,closeOnChange:!1,placeholder:"Select Content Partners",searchPlaceholder:"Search Content Partners",emptySearchMessage:"No partners found",multiple:!0,value:a.length?c.a.createElement(R.a,{direction:"row",gap:"xsmall",pad:{left:"small",vertical:"small"},align:"center",flex:!0},c.a.createElement(R.a,{background:"brand",round:"medium",align:"center",justify:"center",pad:{horizontal:"xsmall"},style:{minWidth:"21px"}},c.a.createElement(N.a,{size:"small"},a.length)),c.a.createElement(R.a,{flex:!0},c.a.createElement(N.a,{size:"small",truncate:!0},a.map((function(e){return e.name})).join(", "))),c.a.createElement(te.a,{href:"#",onFocus:function(e){return e.stopPropagation()},onClick:function(e){e.preventDefault(),e.stopPropagation(),n([]),v.current.focus()}},c.a.createElement(R.a,{background:"accent-4",round:"full"},c.a.createElement(Z.a,{style:{width:"12px",height:"12px"}})))):void 0,selected:a.map((function(e){return o.indexOf(e)})),options:o,onChange:function(e){return function(e){var t=Object(A.a)(a),r=t.map((function(e){return e.name})).indexOf(e.name);r>=0?t.splice(r,1):t.push(e);var l=t.map((function(e){return e.name})),i=[].concat(re).sort(function(e){return function(t,a){var n=e.includes(t.name),r=e.includes(a.name);return!n&&r?1:n&&!r||t.name.toLowerCase()<a.name.toLowerCase()?-1:1}}(l));n(t),s(i)}(e.option)},onSearch:function(e){p(!0),h(e)}},y)))},ie=c.a.createElement("svg",{version:"1.1",viewBox:"0 0 32 32",width:"68px",height:"68px",fill:"#f05537"},c.a.createElement("path",{opacity:".25",d:"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}),c.a.createElement("path",{d:"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"},c.a.createElement("animateTransform",{attributeName:"transform",type:"rotate",from:"0 16 16",to:"360 16 16",dur:"0.8s",repeatCount:"indefinite"}))),ce=function(){return c.a.createElement(R.a,{align:"center",justify:"center"},ie)},oe=a(218),se=function(e){var t=e.label,a=e.required,n=Object(p.a)(e,["label","required"]);return c.a.createElement(J,{label:t,required:a},c.a.createElement(oe.a,Object.assign({mask:[{length:[1,2],regexp:/^1[0,1-2]$|^0?[1-9]$|^0$/,placeholder:"Hour"},{fixed:":"},{length:2,options:["00","15","30","45"],regexp:/^[0-5][0-9]$|^[0-9]$/,placeholder:"Min"},{fixed:" "},{length:2,options:["AM","PM"],regexp:/^[ap]m$|^[AP]M$|^[aApP]$/,placeholder:"AM/PM"}]},n)))},ue=a(189),me=a(215),de=a(190),ge=function(e){var t=e.email,a=e.setEmail,n=e.password,r=e.setPassword,l=e.error,o=e.action,s=e.demo,u=Object(i.useRef)(null);return Object(i.useEffect)((function(){if(s){console.log("hello");var e=0,t="demo@demo.com123456",n=setInterval((function(){return e<=13?a(t.slice(0,e)):e<t.length&&e>13?r(t.slice(13,e+1)):(u.current.click(),clearInterval(n)),e++,function(){clearInterval(n)}}),100)}}),[a,r,s]),c.a.createElement(ue.a,{align:"start",onSubmit:function(e){e.preventDefault(),o({variables:{email:t,password:n}})}},c.a.createElement(X.a,{info:"Email Address"},c.a.createElement(me.a,{icon:c.a.createElement(de.a,null),value:t,onChange:function(e){return a(e.target.value)},placeholder:"example@example.com"})),c.a.createElement(X.a,{info:"Password"},c.a.createElement(me.a,{value:n,onChange:function(e){return r(e.target.value)},type:"password",placeholder:"Password"})),c.a.createElement(R.a,{style:{color:"Red"},align:"center",height:"20px"},c.a.createElement(N.a,{style:{fontStyle:"italic",fontFamily:"Fira Sans"},size:"large"},l)),c.a.createElement(R.a,null,c.a.createElement(te.a,{ref:u,pad:"large",alignSelf:"end",type:"submit",primary:!0,label:"Submit"})))},pe=D.LOGIN_USER,fe=D.REGISTER_USER,Ee=function(e){var t=Object(i.useState)(""),a=Object(g.a)(t,2),n=a[0],r=a[1],l=Object(i.useState)(["brand","plain","plain"]),o=Object(g.a)(l,2),s=o[0],u=o[1],m=c.a.useState(0),d=Object(g.a)(m,2),p=d[0],f=d[1],E=Object(i.useState)(""),b=Object(g.a)(E,2),h=b[0],v=b[1],y=Object(i.useState)(""),O=Object(g.a)(y,2),j=O[0],k=O[1],w=Object(_.b)(pe,{onCompleted:function(t){var a=t.login,n=a.token,r=a.id;localStorage.setItem("auth-token",n),localStorage.setItem("userId",r),e.history.push("/")},onError:function(e){var t=e.message.split(":")[1];k(t)},update:function(e,t){!function(e,t){var a=t.data;e.writeData({data:{isLoggedIn:a.login.loggedIn,userId:a.login.id}})}(e,t)}}),S=Object(g.a)(w,1)[0],I=Object(_.b)(fe,{onCompleted:function(e){S({variables:{email:n,password:h}})},onError:function(e){var t=e.message.split(":")[1];k(t+"hello")}}),C=Object(g.a)(I,1)[0];return c.a.createElement(R.a,{width:"100vw",height:"100vh",align:"center",justify:"center"},c.a.createElement(U.a,{level:"1",size:"large",color:"brand",style:{userSelect:"none",fontFamily:"Playball"}},"Event Tool"),c.a.createElement(q.a,{activeIndex:p,onActive:function(e){var t=Object(A.a)(s);t[p]="plain",t[e]="brand",u(Object(A.a)(t)),f(e)},pad:"small",width:"70vw"},c.a.createElement(M.a,{title:c.a.createElement(U.a,{color:s[0],level:"3",weight:"bold"},"Login"),pad:"small"},c.a.createElement(ge,{email:n,setEmail:r,password:h,setPassword:v,error:j,action:S})),c.a.createElement(M.a,{title:c.a.createElement(U.a,{color:s[1],level:"3",weight:"bold"},"Register")},c.a.createElement(ge,{email:n,setEmail:r,password:h,setPassword:v,error:j,action:C})),c.a.createElement(M.a,{title:c.a.createElement(U.a,{color:s[2],level:"3",weight:"bold"},"Demo"),align:"center",pad:"small"},c.a.createElement(ge,{email:n,setEmail:r,password:h,setPassword:v,error:j,action:S,demo:!0}))))},be=a(191),he=a(192),ve=a(193),ye=I.IS_LOGGED_IN,Oe=function(e){var t=e.responsive,a=e.pending,n=e.setPending,r=(e.mode,e.setMode,Object(_.c)(ye)),l=r.data,i=r.error,o=Object(_.a)();if(i)return c.a.createElement("h3",null,"Error: ",i.message);var s=function(e){e.preventDefault(),localStorage.removeItem("auth-token"),localStorage.removeItem("userId"),o.writeData({data:{isLoggedIn:!1,userId:null}})};return"small"===t?c.a.createElement(be.a,null,c.a.createElement(he.a,{alignSelf:"center",dropProps:{align:{top:"bottom",left:"left"}},icon:c.a.createElement(ve.a,null),pad:"small",items:l.isLoggedIn?[{label:c.a.createElement(ee.a,{background:{light:"light-2",dark:"dark-2"},checked:a,label:"Scheduled Events"}),onClick:function(){return n(!a)}},{label:"Logout",onClick:function(e){return s(e)}}]:[]})):c.a.createElement(be.a,null,l.isLoggedIn?c.a.createElement(c.a.Fragment,null,c.a.createElement(R.a,{pad:"medium",direction:"row",align:"center"},c.a.createElement(U.a,{level:"1",color:"brand",style:{userSelect:"none",fontFamily:"Playball"}},"Event Tool")),c.a.createElement(R.a,{direction:"row",gap:"small"},c.a.createElement(R.a,{gap:"small",margin:"medium",direction:"row"},c.a.createElement(te.a,{onClick:function(){n(!a)},style:{fontFamily:"Fira Sans",textDecoration:a?"underline":"none"}},"Scheduled Events")),c.a.createElement(R.a,{gap:"small",margin:"medium",direction:"row"},c.a.createElement(te.a,{style:{fontFamily:"Fira Sans"},weight:"bold",plain:!0,label:"Logout",onClick:s})))):null)},je=a(1),ke=a(62),we=a.n(ke),Se=a(194),Ie=a(195),Ce=a(196),xe=a(197),Ae=a(198);function _e(){var e=Object(b.a)(["\n  @keyframes fadeIn {\n    0% {\n      transition: ease-in;\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n      transition: ease-out;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"]);return _e=function(){return e},e}var $e=Object(je.default)(R.a)(_e()),Te=function(e){var t=e.user,a=e.pending,n=t.jobs,r=Object(i.useState)(a),l=Object(g.a)(r,2),o=l[0],s=l[1];Object(i.useEffect)((function(){a&&s(!0)}),[a]);return o&&c.a.createElement($e,{width:"93vw",pad:"medium",style:{animation:"".concat(a?"fadeIn":"fadeOut"," 1s")},onAnimationEnd:function(){a||s(!1)}},c.a.createElement(Se.a,null,c.a.createElement(Ie.a,null,c.a.createElement(Ce.a,null,c.a.createElement(xe.a,{scope:"col",border:"bottom"},"Date"),c.a.createElement(xe.a,{scope:"col",border:"bottom"},"Status"))),c.a.createElement(Ae.a,null,n.map((function(e,t){var a=new Date(e.schedule);return c.a.createElement(Ce.a,{key:t},c.a.createElement(xe.a,null,we()(a).format("dddd, MMMM Do YYYY, h:mm:ss a")),c.a.createElement(xe.a,null,e.status))})))))},ze=a(222),Le=a(199),Pe=a(200),Fe=I.FETCH_USER,De=D.PUSH_API_KEY;var Re=function(e){var t=e.user,a=e.selectedKey,n=e.setSelectedKey,r=t.apikeys;Object(i.useEffect)((function(){n(r[0])}),[r,n]);var l=Object(i.useState)(null),o=Object(g.a)(l,2),s=o[0],u=o[1],m=Object(i.useState)(""),d=Object(g.a)(m,2),p=d[0],f=d[1],E=Object(_.b)(De,{onError:function(e){var t=e.message.split(":")[1];u(c.a.createElement(N.a,{size:"small"},t)),setTimeout((function(){u(null)}),1e4)},update:function(e,a){var n=a.data.pushAPIkey;e.writeQuery({query:Fe,variables:{userId:t.id},data:{user:Object(K.a)(Object(K.a)({},t),{},{apikeys:n.apikeys})}})}}),b=Object(g.a)(E,1)[0];return c.a.createElement(R.a,{pad:"small",align:"start"},c.a.createElement(R.a,{height:{max:"65.6vh"},width:"100%",overflow:"auto"},c.a.createElement(R.a,{margin:{top:"small",bottom:"small",left:"15px",right:"15px"},pad:"xsmall",background:"brand"},c.a.createElement(U.a,{level:"4"},"Select Account")),c.a.createElement(V,{user:t,selectedKey:a,setSelectedKey:n}),c.a.createElement(Le.a,{alignSelf:"center",width:"100%"},c.a.createElement(Pe.a,{height:"30px",pad:"small",margin:{top:"small",bottom:"small",left:"15px",right:"15px"},background:"brand",label:"Add Account"},c.a.createElement(R.a,{margin:"medium",wo:!0},c.a.createElement(ue.a,{onSubmit:function(e){e.preventDefault(),b({variables:{id:t.id,apikey:p}}),f("")}},c.a.createElement(X.a,{error:s,label:"API Key",align:"start"},c.a.createElement(me.a,{onChange:function(e){return f(e.target.value)},value:p,placeholder:"2HFXXX2G...."})),c.a.createElement(te.a,{margin:{left:"auto"},type:"submit",primary:!0,label:"Submit"})))))))},Ue=a(170),qe=a(201),Me=a(202),Ke=I.FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES;function Ne(e){var t=e.apikey,a=e.form,n=e.setForm,r=Object(i.useState)(!0),l=Object(g.a)(r,2),o=l[0],s=l[1],u=a.title,m=a.location,d=a.category,p=a.subcategory,f=a.type,E=Object(_.c)(Ke,{variables:{apikey:t}}),b=E.loading,h=E.data,v=E.error;if(b)return c.a.createElement(R.a,{width:"100vw"},"...loading");if(v)return console.log(v),null;var y=h.categories.map((function(e){return e.name})),O=h.subcategories.filter((function(e){return e.parent===d})).map((function(e){return e.name})),j=h.types.map((function(e){return e.name})),k=h.account.organizations.map((function(e){var t=e.name;e.id;return t}));return c.a.createElement(R.a,{pad:"medium",width:"100vw",justify:"between",flex:!0},c.a.createElement(te.a,{plain:!0,onClick:function(){return s(!o)}},c.a.createElement(U.a,{color:o?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},o?"-":"+"," ",c.a.createElement(qe.a,{color:o?"neutral-2":{dark:"light-1",light:"dark-1"},size:"medium"})," ","Basic Info")),c.a.createElement(Ue.a,{open:o},c.a.createElement(R.a,{margin:"small"},c.a.createElement(J,{margin:"small",required:!0,info:c.a.createElement(R.a,{align:"end"},c.a.createElement(N.a,{size:"small"},u.length," / 70")),label:"Event Title"},c.a.createElement(me.a,{maxLength:"70",margin:"small",value:u,onChange:function(e){return n(Object(K.a)(Object(K.a)({},a),{},{title:e.target.value}))},placeholder:"Be clear and descriptive"})),c.a.createElement(R.a,{margin:"small",gap:"small",direction:"row"},c.a.createElement(J,{label:"Type"},c.a.createElement(ae.a,{placeholder:"Conference",value:f,onChange:function(e){var t=e.option;return n(Object(K.a)(Object(K.a)({},a),{},{type:t}))},options:j})),c.a.createElement(J,{label:"Category"},c.a.createElement(ae.a,{placeholder:"Music",value:d,onChange:function(e){var t=e.option;return n(Object(K.a)(Object(K.a)({},a),{},{category:t}))},options:y})),O.length>1?c.a.createElement(J,{label:"Subcategory"},c.a.createElement(ae.a,{value:p,onChange:function(e){var t=e.option;return n(Object(K.a)(Object(K.a)({},a),{},{subcategory:t}))},options:O})):null),c.a.createElement(J,{label:"Organizer",margin:"small"},c.a.createElement(ae.a,{value:k[0],options:k}))),c.a.createElement(U.a,{level:"2"},c.a.createElement(Me.a,null)," Locations"),c.a.createElement(R.a,{margin:"small"},c.a.createElement(J,{label:"Venue",margin:"small",required:!0},c.a.createElement(ae.a,{value:m,onChange:function(e){var t=e.option;return n(Object(K.a)(Object(K.a)({},a),{},{location:t}))},options:["Venue","Online Event","To Be Announced"]})),"Venue"===m?c.a.createElement(J,{margin:"small"},c.a.createElement(le,null)):null)))}var Ge=a(217),He=a(213),Be=a(203);function Ye(e){var t=e.form,a=e.setForm,n=(e.apikey,e.screenSize),r=Object(p.a)(e,["form","setForm","apikey","screenSize"]),l=Object(i.useState)(!1),o=Object(g.a)(l,2),s=o[0],u=o[1],m=new Date,d=m.getFullYear(),f=m.getDate(),E=m.getMonth(),b=[m.toISOString(),new Date(d+5,E,f).toISOString()],h=function(e,n){"start"===n&&a(Object(K.a)(Object(K.a)({},t),{},{start:Object(K.a)(Object(K.a)({},t.start),{},{time:e.target.value})})),"end"===n&&a(Object(K.a)(Object(K.a)({},t),{},{end:Object(K.a)(Object(K.a)({},t.end),{},{time:e.target.value})}))};return c.a.createElement(R.a,{pad:"medium",width:"100vw",fill:!0},c.a.createElement(te.a,{plain:!0,onClick:function(){return u(!s)}},c.a.createElement(U.a,{color:s?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},s?"-":"+"," ",c.a.createElement(Be.a,{size:"medium",color:s?"neutral-2":{dark:"light-1",light:"dark-1"}})," ","Schedule")),c.a.createElement(Ue.a,{open:s},c.a.createElement(J,{pad:!0,help:c.a.createElement(R.a,{pad:"medium",margin:"small",background:{light:"light-4",dark:"dark-4"}},c.a.createElement(Ge.a,Object.assign({name:"single",label:c.a.createElement(R.a,{margin:"xxsmall"},c.a.createElement(N.a,{size:"small"},c.a.createElement(N.a,{size:"small",weight:"bold"},"Single occurrence")," ","- happens once and can last multiple days")),checked:!t.series,onChange:function(e){return a(Object(K.a)(Object(K.a)({},t),{},{series:!1}))}},r)),c.a.createElement(Ge.a,Object.assign({label:c.a.createElement(R.a,{margin:"xxsmall"},c.a.createElement(N.a,{size:"small"},c.a.createElement(N.a,{size:"small",weight:"bold"},"Recurring events")," ","- repeats or occurs more than once")),name:"series",checked:t.series,onChange:function(e){return a(Object(K.a)(Object(K.a)({},t),{},{series:!0}))}},r))," ")},t.series?c.a.createElement(R.a,{justify:"center",margin:"small",direction:"small"===n?"column":"row"},c.a.createElement(He.a,{bounds:b,size:"medium",range:!0}),c.a.createElement(R.a,{pad:"small",justify:"center"},c.a.createElement(se,{label:"Start Time:",value:t.start.time,onChange:function(e){return h(e,"start")},required:!0}),c.a.createElement(se,{label:"End Time:",value:t.end.time,onChange:function(e){return h(e,"end")},required:!0}),c.a.createElement(J,{label:"Occurs:"},c.a.createElement(ae.a,{value:t.recurrence.occurs,options:["Daily","Weekly","Monthly"],onChange:function(e){var n=e.option;return a(Object(K.a)(Object(K.a)({},t),{},{recurrence:Object(K.a)(Object(K.a)({},t.recurrence),{},{occurs:n})}))}})),c.a.createElement(J,{info:"Event repeats "+t.recurrence.times+(t.recurrence.times>1?" times.":" time.")},c.a.createElement(me.a,{value:t.recurrence.times,onChange:function(e){return a(Object(K.a)(Object(K.a)({},t),{},{recurrence:Object(K.a)(Object(K.a)({},t.recurrence),{},{times:e.target.value})}))}})))):c.a.createElement(R.a,{justify:"around",margin:"small",direction:"small"===n?"column":"row"},c.a.createElement(He.a,{bounds:b,size:"medium",onSelect:function(e){2===e[0].length&&a(Object(K.a)(Object(K.a)({},t),{},{start:Object(K.a)(Object(K.a)({},t.start),{},{date:e[0][0]}),end:Object(K.a)(Object(K.a)({},t.end),{},{date:e[0][1]})}))},range:!0}),c.a.createElement(R.a,{pad:"small",justify:"center"},c.a.createElement(se,{label:"Start Time:",value:t.start.time,onChange:function(e){return h(e,"start")},required:!0}),c.a.createElement(se,{label:"End Time:",value:t.end.time,onChange:function(e){return h(e,"end")},required:!0}))))))}var We=a(115),Qe=a(116),Ve=a(127),Xe=a(123),Je=a(124),Ze=a(221),et=a(204),tt=function(e){Object(Ve.a)(a,e);var t=Object(Xe.a)(a);function a(){var e;Object(We.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={editor:"",open:!1},e}return Object(Qe.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.form,n=t.setForm,r=function(e){n(Object(K.a)(Object(K.a)({},a),{},{description:e.target.getContent()}))};return c.a.createElement(R.a,{pad:"medium",width:"100vw"},c.a.createElement(te.a,{plain:!0,onClick:function(){return e.setState(Object(K.a)(Object(K.a)({},e.state),{},{open:!e.state.open}))}},c.a.createElement(U.a,{color:this.state.open?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},this.state.open?"-":"+"," ",c.a.createElement(et.a,{color:this.state.open?"neutral-2":{dark:"light-1",light:"dark-1"},size:"medium"})," ","Event Description")),c.a.createElement(Ue.a,{open:this.state.open},c.a.createElement(R.a,{margin:"small"},c.a.createElement(J,{info:c.a.createElement(R.a,{align:"end"},c.a.createElement(N.a,{size:"small"},a.summary.length," / 140")),label:"Summary"},c.a.createElement(Ze.a,{onChange:function(e){return n(Object(K.a)(Object(K.a)({},a),{},{summary:e.target.value}))},placeholder:"Write a short event summary to get attendees excited",resize:!1}))),c.a.createElement(R.a,{margin:"small"},c.a.createElement(Je.a,{apiKey:"l4239s08cwmf7d2qxig6hsvhyihcglbothx4eb7vkgtlxkic",initialValue:a.description,init:{height:400,resize:!1,menubar:!1,plugins:["advlist autolink lists link image imagetools","charmap print preview anchor help","searchreplace visualblocks code","insertdatetime media table paste wordcount"],toolbar:"undo redo | formatselect | bold italic | bullist numlist | image"},onChange:r,onBlur:r}))))}}]),a}(c.a.Component),at=a(209),nt=a(205),rt=a(206),lt=function(e){var t=e.form,a=e.setForm,n=e.screenSize,r=Object(i.useState)("paid"),l=Object(g.a)(r,2),o=l[0],s=l[1],u=Object(i.useState)(!1),m=Object(g.a)(u,2),d=m[0],p=m[1],f=Object(i.useState)({name:"General Admission",quantity:100,price:"$0.00",num:0}),E=Object(g.a)(f,2),b=E[0],h=E[1];return c.a.createElement(R.a,{pad:"medium",width:"100vw"},c.a.createElement(te.a,{plain:!0,onClick:function(){return p(!d)}},c.a.createElement(U.a,{color:d?"neutral-2":{dark:"light-1",light:"dark-1"},level:"2"},d?"-":"+"," ",c.a.createElement(nt.a,{color:d?"neutral-2":{dark:"light-1",light:"dark-1"},size:"medium"})," ","Tickets")),c.a.createElement(Ue.a,{open:d},c.a.createElement(R.a,{gap:"medium",justify:"center",direction:"small"===n?"column":"row"},c.a.createElement(R.a,{pad:"small",width:"small"===n?"100%":"50%"},c.a.createElement(R.a,{gap:"medium",justify:"center",pad:"small",direction:"row"},c.a.createElement(R.a,{focusIndicator:!1,as:"button",pad:"medium",border:"paid"===o?{size:"small",color:"brand"}:{size:"small"},background:{light:"light-2",dark:"dark-1"},style:"paid"===o?{userSelect:"none",background:"rgba(240, 85, 55, 0.2)"}:{userSelect:"none"},onClick:function(){return s("paid")}},c.a.createElement(N.a,null,"Paid")),c.a.createElement(R.a,{focusIndicator:!1,as:"button",border:"free"===o?{size:"small",color:"brand"}:{size:"small"},onClick:function(){h(Object(K.a)(Object(K.a)({},b),{},{price:"$0.00"})),s("free")},background:{light:"light-2",dark:"dark-1"},style:"free"===o?{userSelect:"none",background:"rgba(240, 85, 55, 0.2)"}:{userSelect:"none"},pad:"medium"},c.a.createElement(N.a,null,"Free"))),c.a.createElement(J,{label:"Name",required:!0},c.a.createElement(me.a,{value:"General Admission"===b.name?"":b.name,placeholder:b.name,onChange:function(e){return h(Object(K.a)(Object(K.a)({},b),{},{name:e.target.value}))}})),c.a.createElement(J,{label:"Quantity",required:!0},c.a.createElement(oe.a,{value:b.quantity,mask:[{length:[1,6],regexp:/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/}],onChange:function(e){return h(Object(K.a)(Object(K.a)({},b),{},{quantity:e.target.value}))}})),c.a.createElement(J,{label:"Price",required:"paid"===o,disabled:"free"===o,style:{position:"relative"}},c.a.createElement(oe.a,{icon:c.a.createElement(rt.a,null),onBlur:function(){b.price.split(".").length<2&&h(Object(K.a)(Object(K.a)({},b),{},{price:b.price+".00"}))},mask:[{fixed:"$"},{length:[1,5],regexp:/^\d{1,5}$/},{fixed:"."},{length:[2],regexp:/^[0-9]/,placeholder:"00"}],placeholder:"$0.00"===b.price?"Free":null,value:"$0.00"===b.price?"":b.price,disabled:"free"===o,onChange:function(e){return h(Object(K.a)(Object(K.a)({},b),{},{price:e.target.value}))}})),c.a.createElement(R.a,{alignSelf:"center",width:"30%"},c.a.createElement(te.a,{primary:!0,onClick:function(e){h(Object(K.a)(Object(K.a)({},b),{},{num:b.num+1})),a(Object(K.a)(Object(K.a)({},t),{},{tickets:[].concat(Object(A.a)(t.tickets),[b])}))},size:"medium",label:"Create Ticket"}))),c.a.createElement(R.a,{pad:"small",width:"small"===n?"100%":"50%"},t.tickets.length>0?c.a.createElement(R.a,{width:"100%",align:"center"},c.a.createElement(at.a,{primaryKey:"num",columns:[{property:"name",header:c.a.createElement(N.a,null,"Name")},{property:"quantity",header:c.a.createElement(N.a,null,"Qty")},{property:"price",header:c.a.createElement(N.a,null,"Price"),render:function(e){return"$0.00"===e.price?"Free":e.price}},{property:"num",render:function(e){return c.a.createElement(R.a,{round:"full",overflow:"hidden"},c.a.createElement(te.a,{size:"small",hoverIndicator:"accent-1",onClick:function(){a(Object(K.a)(Object(K.a)({},t),{},{tickets:t.tickets.filter((function(t){return t.num!==e.num}))}))},icon:c.a.createElement(H.a,null)}))}}],data:t.tickets})):c.a.createElement(R.a,{height:"100%",align:"center",justify:"center"},c.a.createElement(N.a,null,"Add Ticket"))))))};function it(){var e=Object(b.a)(["\n  @keyframes fadeIn {\n    0% {\n      transition: ease-in;\n      opacity: 0;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n\n  @keyframes fadeOut {\n    0% {\n      opacity: 1;\n      transition: ease-out;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"]);return it=function(){return e},e}var ct=D.SUBMIT_FORM,ot=I.FETCH_USER,st={active_tab:"Basic Info",title:"",location:"Venue",category:"Category",subcategory:"subcategory",type:"Type",summary:"",description:"",start:{date:(new Date).toISOString(),time:""},end:{date:(new Date).toISOString(),time:""},series:!1,recurrence:{times:1,occurs:"Daily"},tickets:[]},ut=Object(je.default)(R.a)(it());var mt=function(e){var t=e.user,a=e.responsive,n=e.history,r=e.pending,l=e.defaultKey,o=Object(i.useState)(st),s=Object(g.a)(o,2),u=s[0],m=s[1],d=Object(i.useState)(l),p=Object(g.a)(d,2),f=p[0],E=p[1],b=Object(_.b)(ct,{onError:function(e){console.log(e)},update:function(e,a){var n=a.data.scheduleEvent;e.writeQuery({query:ot,variables:{userId:t.id},data:{user:Object(K.a)({},n)},fetchPolicy:"no-cache"})}}),h=(Object(g.a)(b,1)[0],we()(new Date).add("10","seconds").toISOString(),Object(i.useState)(!0)),v=Object(g.a)(h,2),y=v[0],O=v[1];return Object(i.useEffect)((function(){r||O(!0)}),[r]),y&&c.a.createElement(ut,{onAnimationEnd:function(){r&&O(!1)},style:{animation:"".concat(r?"fadeOut":"fadeIn"," 1s")},value:u,pad:"medium"},c.a.createElement(Re,{user:t,selectedKey:f,setSelectedKey:E,history:n}),t.apikeys&&t.apikeys.length>0?c.a.createElement(c.a.Fragment,null,c.a.createElement(Ne,{form:u,setForm:m,apikey:f}),c.a.createElement(Ye,{screenSize:a,form:u,setForm:m,apikey:f}),c.a.createElement(tt,{form:u,setForm:m,apikey:f}),c.a.createElement(lt,{screenSize:a,form:u,setForm:m})):c.a.createElement(R.a,{width:{min:"100%"},pad:"large",justify:"center"},c.a.createElement(U.a,{textAlign:"center",margin:"small",level:"1"},"Welcome to Event Tool"),c.a.createElement(U.a,{fill:!0,margin:"small",level:"3"},"How to use this application:"),c.a.createElement(ze.a,{fill:!0,margin:"small"},"In order to use this application you need to add the secret keys from the accounts you want to use.")))},dt=I.FETCH_USER_ID,gt=I.FETCH_USER;var pt=function(e){var t=e.responsive,a=e.pending,n=Object(_.c)(dt),r=n.data.userId,l=n.error,i=n.loading,o=Object(_.c)(gt,{variables:{userId:r},fetchPolicy:"no-cache"}),s=o.data,u=o.error,m=o.loading;if(l||u)return c.a.createElement("h3",null,"Error: ",l||u);if(i||m)return c.a.createElement(R.a,{height:"100vh",justify:"center",align:"center"},c.a.createElement(ce,null));var d=s.user,g=d.apikeys[0];return c.a.createElement(R.a,{direction:"row",justify:"start",align:"start",height:"100vh"},c.a.createElement(R.a,null,c.a.createElement(Te,{user:d,pending:a}),c.a.createElement(mt,{pending:a,responsive:t,user:d,defaultKey:g})))},ft=a(207),Et=a(212),bt=a(208),ht=a(119),vt=Object(ht.deepMerge)(ft.a,{defaultMode:"dark",global:{font:{family:"Noto Sans"},colors:{brand:"#f05537","accent-1":"#73a580","accent-2":"#F48668","accent-3":"#c5c392","neutral-1":"#EEA960","neutral-2":"#3659e3","neutral-3":"#47AE6A",inactive:"#6f7287",focus:"none"}}});var yt=function(e){var t=Object(i.useState)(!1),a=Object(g.a)(t,2),n=a[0],r=a[1],l=Object(i.useState)(!1),o=Object(g.a)(l,2),s=o[0],u=o[1];return window.setDarkMode=u,c.a.createElement(Et.a,{theme:vt,themeMode:s?"dark":"light"},c.a.createElement(bt.a.Consumer,null,(function(t){return c.a.createElement(R.a,{height:{max:"100vh"},style:{transition:"0.25s ease-out"},background:{light:"light-3",dark:"dark-1"},overflow:"auto"},c.a.createElement(Oe,{responsive:t,pending:n,setPending:r}),c.a.createElement(R.a,Object.assign({tag:"main",direction:"column",align:"center",justify:"start"},e),c.a.createElement(f.d,null,c.a.createElement(x,{exact:!0,responsive:t,path:"/login",component:Ee,routeType:"auth"}),c.a.createElement(x,{exact:!0,path:"/",responsive:t,component:pt,pending:n,routeType:"protected"}),c.a.createElement(f.a,{to:"/"}))))})))},Ot=a(58),jt=a(120),kt=a.n(jt),wt=a(43),St=a(125),It=a(121),Ct=a(126),xt=a(17),At=a(122),_t=a(26),$t=D.VERIFY_USER,Tt=new St.a({dataIdFromObject:function(e){return e._id||null}}),zt=Object(At.a)((function(e){var t=e.graphQLErrors;t&&t.map((function(e){var t=e.message;return console.log(t)}))})),Lt=(window.location.hostname,Object(Ct.a)({uri:"/graphql",headers:{authorization:localStorage.getItem("auth-token")}})),Pt=function(){var e=Object(l.a)(r.a.mark((function e(){var t,a,n,l;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(It.persistCache)({cache:Tt,storage:window.localStorage});case 2:t=new wt.c({link:_t.a.from([zt,Lt]),cache:Tt,onError:function(e){var t=e.networkError,a=e.graphQLErrors;console.log("graphQLErrors",a),console.log("networkError",t)},resolvers:{}}),a=localStorage.getItem("auth-token"),n=localStorage.getItem("userId"),Tt.writeData({data:{isLoggedIn:Boolean(a),userId:n}}),a&&t.mutate({mutation:$t,variables:{token:a}}).then((function(e){var t=e.data;Tt.writeData({data:{isLoggedIn:t.verifyUser.loggedIn,userId:t.verifyUser.id}})})),l=function(){return c.a.createElement(xt.a,{client:t},c.a.createElement(Ot.a,null,c.a.createElement(yt,null)))},kt.a.load({google:{families:["Playball","Fira Sans","Noto Sans"]}}),s.a.render(c.a.createElement(l,null),document.getElementById("root")),m();case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();document.addEventListener("DOMContentLoaded",(function(e){Pt()}))}},[[131,1,2]]]);
//# sourceMappingURL=main.8ba3202e.chunk.js.map