(this.webpackJsonpsmag=this.webpackJsonpsmag||[]).push([[0],{29:function(e,a,t){e.exports={btnUpdate:"RefreshButton_btnUpdate__2k-Nf",rotate:"RefreshButton_rotate__1QCZ_",refreshRotate:"RefreshButton_refreshRotate__3dCm8"}},51:function(e,a,t){e.exports=t(82)},8:function(e,a,t){e.exports={privatWrapper:"PrivatBankComponent_privatWrapper__1Saub",privatBlock:"PrivatBankComponent_privatBlock__1VOPY",currency:"PrivatBankComponent_currency__3dvZ5",name:"PrivatBankComponent_name__2XI42",buy:"PrivatBankComponent_buy__3iA__",sale:"PrivatBankComponent_sale__1S1U1"}},81:function(e,a,t){},82:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(5),l=t.n(c),s=t(20),o=t(21),i=t(28),m=t(26),u=t(41),p=t.n(u),v=t(44),b=t.n(v),f=t(45),E=t.n(f),y=t(46),d=t.n(y),h=t(43),N=t.n(h),k=["\u0413\u043b\u0430\u0432\u043d\u0430\u044f","\u041f\u0440\u043e\u0434\u0430\u0436\u0438","\u0417\u0430\u043a\u0430\u0437\u044b","\u0412\u044b\u0441\u0442\u0430\u0432\u043a\u0430","\u041a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u044b"];function _(){return r.a.createElement("nav",{className:"asideNav"},r.a.createElement("ul",{className:"navMenuList"},k.map((function(e){return r.a.createElement("li",{className:"navMenuItem",key:e},r.a.createElement("div",{className:"navItemLink link"},function(e){switch(e){case"\u0413\u043b\u0430\u0432\u043d\u0430\u044f":return r.a.createElement(p.a,{className:"iconItem",style:{fontSize:22}});case"\u041f\u0440\u043e\u0434\u0430\u0436\u0438":return r.a.createElement(N.a,{className:"iconItem",style:{fontSize:22}});case"\u0417\u0430\u043a\u0430\u0437\u044b":return r.a.createElement(b.a,{className:"iconItem",style:{fontSize:22}});case"\u0412\u044b\u0441\u0442\u0430\u0432\u043a\u0430":return r.a.createElement(E.a,{className:"iconItem",style:{fontSize:22}});case"\u041a\u043e\u043d\u0442\u0440\u0430\u0433\u0435\u043d\u0442\u044b":return r.a.createElement(d.a,{className:"iconItem",style:{fontSize:22}})}}(e),e))}))))}var g=t(15),B=t.n(g),x=t(23),P=t(47),S=t.n(P),D=function(){var e=Object(x.a)(B.a.mark((function e(){var a;return B.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S.a.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");case 3:return a=e.sent,e.abrupt("return",a.data);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),R=t(8),j=t.n(R);function w(e){var a=e.currency,t=e.allDataPrivatBank;return r.a.createElement("div",{className:j.a.currency},r.a.createElement("div",{className:j.a.name},t[a].ccy," - "),r.a.createElement("div",{className:j.a.buy},"\u041f\u043e\u043a\u0443\u043f\u043a\u0430 ",r.a.createElement("span",null,t[a].buy)),r.a.createElement("div",{className:j.a.sale},"\u041f\u0440\u043e\u0434\u0430\u0436\u0430 ",r.a.createElement("span",null,t[a].sale)))}var C=t(100),O=t(30),z=t.n(O),I=t(29),L=t.n(I);function F(e){var a=e.onRefreshFunction,t=e.size,n=e.tooltipText,c=e.isRotate;return r.a.createElement(C.a,{title:n,arrow:!0},r.a.createElement("button",{className:L.a.btnUpdate,type:"button",onClick:a},c&&r.a.createElement(z.a,{className:L.a.rotate,style:{fontSize:t}}),!c&&r.a.createElement(z.a,{style:{fontSize:t}})))}var U=function(e){Object(i.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).state={allDataPrivatBank:{},isLoader:!1,sale:1,buy:1},e.getExchangeRatesData=Object(x.a)(B.a.mark((function a(){var t,n;return B.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return e.setState({isLoader:!0}),a.next=3,D();case 3:t=a.sent,n=t.map((function(e){return e.buy=e.buy.slice(-0,-3),e.sale=e.sale.slice(-0,-3),e})),e.setState({allDataPrivatBank:n,sale:n[1].sale,buy:n[1].buy}),e.setState({isLoader:!1});case 7:case"end":return a.stop()}}),a)}))),e}return Object(o.a)(t,[{key:"componentDidMount",value:function(){this.getExchangeRatesData()}},{key:"render",value:function(){var e=this.state,a=e.allDataPrivatBank,t=e.isLoader,n=a.length>0;return r.a.createElement(r.a.Fragment,null,n&&r.a.createElement("div",{className:j.a.privatWrapper},r.a.createElement("div",{className:j.a.privatBlock},!t&&r.a.createElement(r.a.Fragment,null,r.a.createElement(w,{allDataPrivatBank:a,currency:1}),r.a.createElement(w,{allDataPrivatBank:a,currency:0})),t&&"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."),r.a.createElement(F,{onRefreshFunction:this.getExchangeRatesData,size:20,tooltipText:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u043a\u0443\u0440\u0441",isRotate:t})))}}]),t}(n.Component),M=function(e){Object(i.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).state={},e}return Object(o.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e,a){}},{key:"render",value:function(){return r.a.createElement("div",{className:"main-wrapper"},r.a.createElement("aside",{className:"main-aside"},r.a.createElement("div",{className:"company-block"},r.a.createElement("img",{className:"logo",src:"http://eferretti.com/files/geoportal/admin/e6361e70-fb2c-11e9-acb9-87ef29151474.svg",alt:"logo"}),r.a.createElement("h2",{className:"company-name"},"Emanuela Ferretti")),r.a.createElement(_,null)),r.a.createElement("main",{className:"main-content"},r.a.createElement("header",{className:"header-line-tabs"},r.a.createElement("ul",{className:"line-list-tabs"},r.a.createElement("li",{className:"tab active"},"\u0413\u043b\u0430\u0432\u043d\u0430\u044f",r.a.createElement("button",{className:"btn tab-btn",type:"button"},r.a.createElement("span",{className:"visually-hidden"},"close button"))),r.a.createElement("li",{className:"tab"},"\u0415\u0449\u0435 \u0434\u0440\u0443\u0433\u0430\u044f \u0442\u0430\u0431\u0430",r.a.createElement("button",{className:"btn tab-btn",type:"button"},r.a.createElement("span",{className:"visually-hidden"},"close button"))))),r.a.createElement(U,null)))}}]),t}(n.Component);t(80),t(81);l.a.render(r.a.createElement(M,null),document.querySelector("#root"))}},[[51,1,2]]]);
//# sourceMappingURL=main.2fd0625f.chunk.js.map