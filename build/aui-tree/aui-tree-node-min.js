AUI.add("aui-tree-node",function(AD){var x=AD.Lang,Ai=x.isString,AZ=x.isBoolean,Ap="alwaysShowHitArea",p="",T="boundingBox",H="children",Ae="clearfix",Z="collapsed",B="container",AB="content",X="contentBox",K="expanded",Q="helper",u="hidden",i="hitarea",G="hitAreaEl",t="icon",Ao="iconEl",AS="id",AJ="label",v="labelEl",s="lastSelected",Ad="leaf",R="node",AL="over",y="ownerTree",F="parentNode",Ac="selected",U=" ",I="tree",j="tree-node",V=function(A){return AD.one(A);},Al=function(){return Array.prototype.slice.call(arguments).join(U);},AP=function(A){return(A instanceof AD.TreeNode);},Ak=function(A){return(A instanceof AD.TreeView);},g=AD.ClassNameManager.getClassName,AG=g(Q,Ae),b=g(I,Z),C=g(I,B),Aq=g(I,K),W=g(I,u),AU=g(I,i),f=g(I,t),M=g(I,AJ),e=g(I,R,AB),AV=g(I,R,u,i),J=g(I,R,Ad),Ah=g(I,R,AL),k=g(I,R,Ac),AC='<div class="'+AU+'"></div>',S='<div class="'+f+'"></div>',E='<div class="'+M+'"></div>',An="<ul></ul>",Y="<li></li>",z='<div class="'+Al(AG,e)+'"></div>';function n(A){n.superclass.constructor.apply(this,arguments);}AD.mix(n,{NAME:j,ATTRS:{draggable:{value:true,validator:AZ},ownerTree:{value:null},label:{value:p,validator:Ai},expanded:{value:false,validator:AZ},id:{validator:Ai},leaf:{value:true,setter:function(A){if(A&&this.get(H).length){return false;}return A;},validator:AZ},nextSibling:{value:null,validator:AP},prevSibling:{value:null,validator:AP},parentNode:{value:null,validator:function(A){return AP(A)||Ak(A);}},labelEl:{setter:V,valueFn:function(){var A=this.get(AJ);return AD.Node.create(E).html(A).unselectable();}},hitAreaEl:{setter:V,valueFn:function(){return AD.Node.create(AC);}},alwaysShowHitArea:{value:true,validator:AZ},iconEl:{setter:V,valueFn:function(){return AD.Node.create(S);}},tabIndex:{value:null}}});AD.extend(n,AD.TreeData,{BOUNDING_TEMPLATE:Y,CONTENT_TEMPLATE:z,initializer:function(){var A=this;A._syncTreeNodeBBId();n.superclass.initializer.apply(this,arguments);},bindUI:function(){var A=this;A.publish("collapse",{defaultFn:A._collapse});A.publish("expand",{defaultFn:A._expand});A.after("childrenChange",AD.bind(A._afterSetChildren,A));A.after("idChange",A._afterSetId,A);},_renderUI:function(A){this._renderBoxClassNames();},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(H));},_renderContentBox:function(Au){var A=this;var L=A.get(X);if(A.isLeaf()){L.addClass(J);}else{var At=A.get(K);L.addClass(At?Aq:b);if(At){A.expand();}}return L;},_renderBoundingBox:function(){var A=this;var At=A.get(T);var L=A.get(X);var Au=null;if(!A.isLeaf()){L.append(A.get(G));Au=A._createNodeContainer();}L.append(A.get(Ao));L.append(A.get(v));At.append(L);if(Au){if(!A.get(K)){Au.addClass(W);}At.append(Au);}return At;},_createNodeContainer:function(){var A=this;var L=A.get(B)||AD.Node.create(An);L.addClass(C);A.set(B,L);A.eachChildren(function(At){A.appendChild(At);});return L;},_syncHitArea:function(L){var A=this;if(A.get(Ap)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){n.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;if(A.get(K)){var L=A.getEventOutputMap(A);A.bubbleEvent("collapse",L);}},_collapse:function(Au){if(Au.stopActionPropagation){return false;}var A=this;if(!A.isLeaf()){var At=A.get(B);var L=A.get(X);L.replaceClass(Aq,b);if(At){At.addClass(W);}A.set(K,false);}},collapseAll:function(){var A=this;n.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;if(!A.get(K)){var L=A.getEventOutputMap(A);A.bubbleEvent("expand",L);}},_expand:function(Au){if(Au.stopActionPropagation){return false;}var A=this;if(!A.isLeaf()){var At=A.get(B);var L=A.get(X);L.replaceClass(b,Aq);if(At){At.removeClass(W);}A.set(K,true);}},expandAll:function(){var A=this;n.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var At=0;var L=this;var A=L.get(F);while(A){++At;A=A.get(F);}return At;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&n.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(X).hasClass(k);},isLeaf:function(){var A=this;return A.get(Ad);},isAncestor:function(At){var L=this;var A=L.get(F);while(A){if(A==At){return true;}A=A.get(F);}return false;},insertAfter:function(At,L){var A=this;n.superclass.insertAfter.apply(this,[At,A]);},insertBefore:function(L){var A=this;n.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){n.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(K)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(y);if(L){L.set(s,A);}A.get(X).addClass(k);A.fire("select");},unselect:function(){var A=this;A.get(X).removeClass(k);A.fire("unselect");},over:function(){this.get(X).addClass(Ah);},out:function(){this.get(X).removeClass(Ah);},showHitArea:function(){var A=this;var L=A.get(G);L.removeClass(AV);},hideHitArea:function(){var A=this;var L=A.get(G);L.addClass(AV);},_syncTreeNodeBBId:function(L){var A=this;A.get(T).attr(AS,A.get(AS));},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);}});AD.TreeNode=n;var AX=x.isFunction,h=x.isObject,AE=x.isValue,Aj="cache",AT="end",AK="io",Aa="limit",Am="loaded",Ar="loading",AI="paginator",AN="start",AR="tree-node-io",D="paginatorClick",AY=g(I,R,AI),a=g(I,R,AK,Ar),AW='<a class="'+AY+'" href="javascript:void(0);">Load more results</a>';function m(A){m.superclass.constructor.apply(this,arguments);}AD.mix(m,{NAME:AR,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:AZ},loaded:{value:false,validator:AZ},cache:{value:true,validator:AZ},leaf:{value:false,validator:AZ},paginator:{setter:function(A){return AD.merge({alwaysVisible:false,autoFocus:true,element:AD.Node.create(AW),endParam:AT,limitParam:Aa,start:0,startParam:AN},A);},validator:h}}});AD.extend(m,AD.TreeNode,{renderUI:function(){var A=this;
A._inheritOwnerTreeAttrs();m.superclass.renderUI.apply(this,arguments);},bindUI:function(){var A=this;m.superclass.bindUI.apply(this,arguments);A._bindPaginatorUI();A._createEvents();},_bindPaginatorUI:function(){var A=this;var At=A.get(AI);if(At){var L=AD.bind(A._handlePaginatorClickEvent,A);At.element.on("click",L);}},createNode:function(L){var A=this;AD.each(L,function(Au){var At=m.superclass.createNode.apply(A,[Au]);A.appendChild(At);});A._syncPaginatorUI(L);},expand:function(){var A=this;var L=A.get(Aj);var Av=A.get(AK);var At=A.get(Am);var Au=A.get(Ar);if(!L){A.set(Am,false);}if(!Av||At){m.superclass.expand.apply(this,arguments);}else{if(!Au){if(!L){A.empty();}A.initIO();}}},initIO:function(){var L=this;var At=L.get(AK);if(AX(At.cfg.data)){At.cfg.data=At.cfg.data.apply(L,[L]);}L._syncPaginatorIOData(At);if(AX(At.loader)){var A=AD.bind(At.loader,L);A(At.url,At.cfg,L);}else{AD.io(At.url,At.cfg);}},ioStartHandler:function(){var A=this;var L=A.get(X);A.set(Ar,true);L.addClass(a);},ioCompleteHandler:function(){var A=this;var L=A.get(X);A.set(Ar,false);A.set(Am,true);L.removeClass(a);},ioSuccessHandler:function(){var A=this;var Ay=A.get(AK);var At=Array.prototype.slice.call(arguments);var Av=At.length;var L=At[0];if(Av>=2){var Ax=At[1];try{L=AD.JSON.parse(Ax.responseText);}catch(Aw){}}var Au=Ay.formatter;if(Au){L=Au(L);}A.createNode(L);A.expand();},ioFailureHandler:function(){var A=this;A.set(Ar,false);A.set(Am,false);},_createEvents:function(){var A=this;A.publish(D,{defaultFn:A._defPaginatorClickFn,prefix:AR});},_defPaginatorClickFn:function(L){var A=this;var At=A.get(AI);if(AE(At.limit)){At.start+=At.limit;}if(A.get(AK)){A.initIO();}},_handlePaginatorClickEvent:function(Au){var A=this;var At=A.get(y);var L=A.getEventOutputMap(A);A.fire(D,L);if(At){At.fire(D,L);}Au.halt();},_inheritOwnerTreeAttrs:function(){var L=this;var At=L.get(y);if(At){if(!L.get(AK)){L.set(AK,AD.clone(At.get(AK)));}if(!L.get(AI)){var A=At.get(AI);if(A&&A.element){A.element=A.element.cloneNode(true);}L.set(AI,A);}}},_setIO:function(At){var A=this;if(!At){return null;}else{if(Ai(At)){At={url:At};}}At=At||{};At.cfg=At.cfg||{};At.cfg.on=At.cfg.on||{};var L={start:AD.bind(A.ioStartHandler,A),complete:AD.bind(A.ioCompleteHandler,A),success:AD.bind(A.ioSuccessHandler,A),failure:AD.bind(A.ioFailureHandler,A)};AD.each(L,function(Aw,Au){var Ax=At.cfg.on[Au];if(AX(Ax)){var Av=function(){Aw.apply(A,arguments);Ax.apply(A,arguments);};At.cfg.on[Au]=AD.bind(Av,A);}else{At.cfg.on[Au]=Aw;}});return At;},_syncPaginatorIOData:function(Au){var A=this;var At=A.get(AI);if(At&&AE(At.limit)){var L=Au.cfg.data||{};L[At.limitParam]=At.limit;L[At.startParam]=At.start;L[At.endParam]=(At.start+At.limit);Au.cfg.data=L;}},_syncPaginatorUI:function(L){var A=this;var At=A.get(H);var Ax=A.get(AI);if(Ax){var Aw=(L&&L.length);var Au=Aw&&(At.length>=Ax.limit);if(Ax.alwaysVisible||Au){A.get(B).append(Ax.element.show());if(Ax.autoFocus){try{Ax.element.focus();}catch(Av){}}}else{Ax.element.hide();}}}});AD.TreeNodeIO=m;var N="checkbox",P="checked",AA="checkContainerEl",Af="checkEl",o="checkName",w=".",O="name",c="tree-node-check",AH=g(I,R,N),AO=g(I,R,N,B),AQ=g(I,R,P),r='<div class="'+AO+'"></div>',AM='<input class="'+AH+'" type="checkbox" />';function Ab(A){Ab.superclass.constructor.apply(this,arguments);}AD.mix(Ab,{NAME:c,ATTRS:{checked:{value:false,validator:AZ},checkName:{value:c,validator:Ai},checkContainerEl:{setter:V,valueFn:function(){return AD.Node.create(r);}},checkEl:{setter:V,valueFn:function(){var A=this.get(o);return AD.Node.create(AM).attr(O,A);}}}});AD.extend(Ab,AD.TreeNodeIO,{renderUI:function(){var L=this;Ab.superclass.renderUI.apply(L,arguments);var At=L.get(v);var A=L.get(Af);var Au=L.get(AA);A.hide();Au.append(A);At.placeBefore(Au);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(X);var At=A.get(v);Ab.superclass.bindUI.apply(A,arguments);A.publish("check");A.publish("uncheck");L.delegate("click",AD.bind(A.toggleCheck,A),w+AO);L.delegate("click",AD.bind(A.toggleCheck,A),w+M);At.swallowEvent("dblclick");},check:function(){var L=this;var At=L.get(X);var A=L.get(Af);At.addClass(AQ);L.set(P,true);A.attr(P,P);L.fire("check");},uncheck:function(){var L=this;var At=L.get(X);var A=L.get(Af);At.removeClass(AQ);L.set(P,false);A.attr(P,p);L.fire("uncheck");},toggleCheck:function(){var L=this;var A=L.get(Af);var At=A.attr(P);if(!At){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(P);}});AD.TreeNodeCheck=Ab;var d="child",q="tree-node-task",l="unchecked",Ag=function(A){return A instanceof AD.TreeNodeCheck;},AF=g(I,R,d,l);function As(A){As.superclass.constructor.apply(this,arguments);}AD.mix(As,{NAME:q});AD.extend(As,AD.TreeNodeCheck,{check:function(Au){var L=this;var A=L.get(F);var At=L.get(X);As.superclass.check.apply(this,arguments);if(!Au){At.removeClass(AF);L.eachParent(function(Av){if(Ag(Av)){var Aw=false;Av.check(true);Av.get(X).addClass(AF);Av.eachChildren(function(Ax){if(Ag(Ax)&&!Ax.isChecked()){Aw=true;}},true);if(!Aw){Av.get(X).removeClass(AF);}}});if(!L.isLeaf()){L.eachChildren(function(Av){if(Ag(Av)){Av.check();}});}}},uncheck:function(){var A=this;var L=A.get(X);As.superclass.uncheck.apply(this,arguments);L.removeClass(AF);A.eachParent(function(At){if(Ag(At)&&At.isChecked()){At.get(X).addClass(AF);}});if(!A.isLeaf()){A.eachChildren(function(At){if(At instanceof AD.TreeNodeCheck){At.uncheck();}});}}});AD.TreeNodeTask=As;AD.TreeNode.nodeTypes={task:AD.TreeNodeTask,check:AD.TreeNodeCheck,node:AD.TreeNode,io:AD.TreeNodeIO};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","io","json","querystring-stringify"]});