(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[2],{122:function(n,e,t){"use strict";t.r(e);var a=t(41),r=t.n(a),i=t(62),o=t(0),c=t.n(o),l=t(25),u=t.n(l);t(98),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s=t(47),d=t(49),g=t(133),m=t(136),f=t(144),p=t(21),E=t(145),k=t(86),y=t(139),h=function(n){var e=n.isLoggedIn,t=n.responsive,a=n.pending,r=n.setPending,i=Object(d.a)(),o=function(n){n.preventDefault(),localStorage.removeItem("auth-token"),localStorage.removeItem("userId"),i.writeData({data:{isLoggedIn:!1,userId:null}})};return"small"===t?c.a.createElement(g.a,null,c.a.createElement(m.a,{alignSelf:"center",dropProps:{align:{top:"bottom",left:"left"}},icon:c.a.createElement(y.a,null),pad:"small",items:e?[{label:c.a.createElement(f.a,{background:{light:"light-2",dark:"dark-2"},checked:a,label:"Scheduled Events"}),onClick:function(){return r(!a)}},{label:"Logout",onClick:function(n){return o(n)}}]:[]})):c.a.createElement(g.a,null,e?c.a.createElement(c.a.Fragment,null,c.a.createElement(p.a,{pad:"medium",direction:"row",align:"center"},c.a.createElement(E.a,{level:"1",color:"brand",style:{userSelect:"none",fontFamily:"Playball"}},"Event Tool")),c.a.createElement(p.a,{direction:"row",gap:"small"},c.a.createElement(p.a,{gap:"small",margin:"medium",direction:"row"},c.a.createElement(k.a,{onClick:function(){r(!a)},style:{fontFamily:"Fira Sans",textDecoration:a?"underline":"none"}},"Created Events")),c.a.createElement(p.a,{gap:"small",margin:"medium",direction:"row"},c.a.createElement(k.a,{style:{fontFamily:"Fira Sans"},weight:"bold",plain:!0,label:"Logout",onClick:o})))):null)},b=t(140),v=t(143),I=t(141),S=t(79),$=t(51),O=c.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(6)]).then(t.bind(null,350))})),_=c.a.lazy((function(){return Promise.all([t.e(0),t.e(4),t.e(1),t.e(7)]).then(t.bind(null,349))})),w=$.a.IS_LOGGED_IN,j=Object(S.deepMerge)(b.a,{defaultMode:"dark",global:{font:{family:"Noto Sans"},colors:{brand:"#f05537","accent-1":"#73a580","accent-2":"#F48668","accent-3":"#c5c392","neutral-1":"#EEA960","neutral-2":"#3659e3","neutral-3":"#47AE6A",inactive:"#6f7287",focus:"none"}}});var L=function(n){var e=Object(o.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1],i=Object(d.c)(w),l=i.data,u=i.error,g=i.loading;if(u)return c.a.createElement("p",null,u.message," Error in App component");if(g)return c.a.createElement("p",null,"Loading");var m=l.isLoggedIn;return c.a.createElement(v.a,{theme:j,themeMode:"light"},c.a.createElement(I.a.Consumer,null,(function(e){return c.a.createElement(p.a,{height:"100%",style:{transition:"0.25s ease-out"},background:{light:"light-3",dark:"dark-1"}},c.a.createElement(h,{responsive:e,pending:a,setPending:r,isLoggedIn:m}),c.a.createElement(p.a,Object.assign({tag:"main",direction:"column",align:"center",justify:"start"},n),m?c.a.createElement(o.Suspense,{fallback:c.a.createElement(p.a,{height:"100vh",background:{light:"light-3",dark:"dark-1"}},"Loading...")},c.a.createElement(_,{pending:a,responsive:e})):c.a.createElement(o.Suspense,{fallback:c.a.createElement(p.a,{height:"100vh",background:{light:"light-3",dark:"dark-1"}},"Loading...")},c.a.createElement(O,{responsive:e}))))})))},C=t(80),U=t.n(C),F=t(20),A=t(83),D=t(81),P=t(84),T=t(12),R=t(82),N=t(13),q=t(52).a.VERIFY_USER,G=new A.a({dataIdFromObject:function(n){return n._id||null}}),z=Object(R.a)((function(n){var e=n.graphQLErrors;e&&e.map((function(n){var e=n.message;return console.log(e)}))})),H=(window.location.hostname,Object(P.a)({uri:"/graphql",headers:{authorization:localStorage.getItem("auth-token")}})),M=function(){var n=Object(i.a)(r.a.mark((function n(){var e,t,a,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(D.persistCache)({cache:G,storage:window.localStorage,maxSize:"4mb"});case 2:e=new F.c({link:N.a.from([z,H]),cache:G,onError:function(n){var e=n.networkError,t=n.graphQLErrors;console.log("graphQLErrors",t),console.log("networkError",e)},resolvers:{}}),t=localStorage.getItem("auth-token"),a=localStorage.getItem("userId"),G.writeData({data:{isLoggedIn:Boolean(t),userId:a}}),t&&e.mutate({mutation:q,variables:{token:t}}).then((function(n){var e=n.data;G.writeData({data:{isLoggedIn:e.verifyUser.loggedIn,userId:e.verifyUser.id}})})),i=function(){return c.a.createElement(T.a,{client:e},c.a.createElement(L,null))},U.a.load({google:{families:["Playball","Fira Sans","Noto Sans"]}}),u.a.render(c.a.createElement(i,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}));case 11:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();document.addEventListener("DOMContentLoaded",(function(n){M()}))},51:function(n,e,t){"use strict";var a=t(14),r=t(15),i=t.n(r);function o(){var n=Object(a.a)(["\n    query fetchCategories($apikey: String!) {\n      categories(apikey: $apikey) {\n        name\n        id\n      }\n      subcategories(apikey: $apikey) {\n        name\n        id\n        parent\n      }\n      types(apikey: $apikey) {\n        name\n        id\n      }\n      account(apikey: $apikey) {\n        name\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return o=function(){return n},n}function c(){var n=Object(a.a)(["\n    query fetchVenues($apikey: String!, $orgId: String) {\n      venues(apikey: $apikey, orgId: $orgId) {\n        name\n        id\n      }\n    }\n  "]);return c=function(){return n},n}function l(){var n=Object(a.a)(["\n    query fetchAccount($apikey: String!) {\n      account(apikey: $apikey) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return l=function(){return n},n}function u(){var n=Object(a.a)(["\n    query fetchAccounts($apikeys: [String!]) {\n      accounts(apikeys: $apikeys) {\n        id\n        first_name\n        last_name\n        apikey\n        name\n        email\n        is_public\n        image_id\n        organizations {\n          id\n          name\n        }\n      }\n    }\n  "]);return u=function(){return n},n}function s(){var n=Object(a.a)(["\n    query fetchUser($userId: ID!) {\n      user(id: $userId) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n          urls\n        }\n      }\n    }\n  "]);return s=function(){return n},n}function d(){var n=Object(a.a)(["\n    query fetchUserId {\n      userId @client\n    }\n  "]);return d=function(){return n},n}function g(){var n=Object(a.a)(["\n    query IsUserLoggedIn {\n      isLoggedIn @client\n    }\n  "]);return g=function(){return n},n}e.a={IS_LOGGED_IN:i()(g()),FETCH_USER_ID:i()(d()),FETCH_USER:i()(s()),FETCH_ACCOUNTS:i()(u()),FETCH_ACCOUNT:i()(l()),FETCH_VENUES:i()(c()),FETCH_CATEGORIES_AND_SUBCATEGORIES_AND_TYPES:i()(o())}},52:function(n,e,t){"use strict";var a=t(14),r=t(15),i=t.n(r);function o(){var n=Object(a.a)(["\n    mutation submitForm(\n      $id: ID!\n      $date: String!\n      $data: String!\n      $key: String!\n    ) {\n      scheduleEvent(id: $id, date: $date, data: $data, key: $key) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n          urls\n        }\n      }\n    }\n  "]);return o=function(){return n},n}function c(){var n=Object(a.a)(["\n    mutation deleteAPIkey($id: ID!, $apikey: String!) {\n      deleteAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return c=function(){return n},n}function l(){var n=Object(a.a)(["\n    mutation pushAPIkey($id: ID!, $apikey: String!) {\n      pushAPIkey(id: $id, apikey: $apikey) {\n        id\n        email\n        apikeys\n        jobs {\n          data\n          status\n          schedule\n        }\n      }\n    }\n  "]);return l=function(){return n},n}function u(){var n=Object(a.a)(["\n    mutation VerifyUser($token: String!) {\n      verifyUser(token: $token) {\n        id\n        loggedIn\n      }\n    }\n  "]);return u=function(){return n},n}function s(){var n=Object(a.a)(["\n    mutation RegisterUser($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return s=function(){return n},n}function d(){var n=Object(a.a)(["\n    mutation LoginUser($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        id\n        token\n        loggedIn\n      }\n    }\n  "]);return d=function(){return n},n}e.a={LOGIN_USER:i()(d()),REGISTER_USER:i()(s()),VERIFY_USER:i()(u()),PUSH_API_KEY:i()(l()),DELETE_API_KEY:i()(c()),SUBMIT_FORM:i()(o())}},92:function(n,e,t){n.exports=t(122)},98:function(n,e,t){}},[[92,3,5]]]);
//# sourceMappingURL=main.97b00ffa.chunk.js.map