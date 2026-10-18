import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{$ as a,B as o,C as s,E as c,G as l,H as u,K as d,Q as f,T as p,W as m,X as h,Y as g,_t as _,c as v,ct as y,dt as b,f as ee,ft as x,gt as S,h as C,it as w,l as T,lt as te,m as E,nt as D,p as O,pt as ne,q as re,r as ie,rt as ae,t as k,tt as oe,w as se,z as A}from"./story-uRijs6RN.js";import{n as ce,t as le}from"./keycon.esm-Dqfymcq8.js";import{n as ue,t as de}from"./selecto.esm-DTjxRdaR.js";function fe(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Class extends value `+String(t)+` is not a constructor or null`);xe(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function pe(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}function me(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||=Array.prototype.slice.call(t,0,r),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}function he(e){var t=e.deltaX,n=e.deltaY,r=e.datas,i=Date.now(),a=r.speed;if(!a)r.speed=[0,0],r.time=i;else{var o=i-r.time;r.speed=[a[0]/2+t/o,a[1]/2+n/o]}}function ge(e,t){var n=Math.sqrt(e[0]*e[0]+e[1]*e[1]);return Math.abs(n/t)}function _e(e,t){var n=ge(e,t);return[-e[0]/2*n,-e[1]/2*n]}function j(e){return Math.abs(e)}function ve(e,t,n,r,i){return[i||isFinite(n[0])?n[0]:Math.min(-1,Math.floor(e/t))*t-r,i||isFinite(n[1])?n[1]:Math.max(1,Math.ceil(e/t))*t+r]}function ye(e,t){return e??t}function be(e,t,n){var r=n.duration,i=n.easing||function(e){return 1-(1-e)**3},a=Date.now(),o=a,s=function(){var n=Date.now(),c=n-a;r<c&&(c=r);var l=i(c/r),u=i((o-a)/r);o=n,e(l-u),!(c>=r)&&t(s)};t(s)}var xe,M,Se,N,Ce,we,Te,Ee,De,Oe,ke,P,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze;function Be(){return(Be=t((()=>{se(),C(),f(),ee(),_(),xe=function(e,t){return xe=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},xe(e,t)},M=function(){return M=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},M.apply(this,arguments)},Se=S().browser.name===`safari`,N=`infinite-viewer-`,Ce=`${N}wrapper`,we=`${N}scroll-area`,Te=`${N}scroll-bar`,Ee=`${N}horizontal-scroll-bar`,De=`${N}vertical-scroll-bar`,Oe=`${N}scroll-thumb`,ke=O(b(N,`
{
    position: relative;
    overscroll-behavior: none;
}
.wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    scrollbar-width: none;
    top: 0;
    left: 0;
    will-change: scroll-position;
}
.restrict-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.wrapper::-webkit-scrollbar {
    display: none;
}
.scroll-area {
    position:absolute;
    top:0;
    left:0;
    transform-origin: 0 0;
}
.scroll-bar {
    position:absolute;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
.horizontal-scroll-bar {
    width: calc(100% - 20px);
    right: 10px;
    height: 14px;
}
.vertical-scroll-bar {
    height: calc(100% - 20px);
    bottom: 10px;
    width: 14px;
}
.scroll-thumb {
    position:relative;
    opacity: 0.7;
    background: #333;
    border-radius: 3px;
    left: 0px;
    top: 0px;
    z-index: 10;
    width: 6px;
    height: 6px;
    transition: all ease 0.2s;
    opacity: 0;
}
.scroll-bar:hover .scroll-thumb {
    border-radius: 5px;
    opacity: 1;
}
.horizontal-scroll-bar .scroll-thumb {
    margin: 4px 0px;
    transition-property: opacity, margin, height, border-radius;
}
.vertical-scroll-bar .scroll-thumb {
    margin: 0px 4px;
    transition-property: opacity, margin, width, border-radius;
}
.horizontal-scroll-bar:hover .scroll-thumb {
    height: 10px;
    margin: 2px 0px;
}
.vertical-scroll-bar:hover .scroll-thumb {
    width: 10px;
    margin: 0px 2px;
}
`)),P={margin:500,threshold:100,zoom:1,zoomX:1,zoomY:1,rangeX:[-1/0,1/0],rangeY:[-1/0,1/0],rangeOffsetX:[0,0],rangeOffsetY:[0,0],wrapperElement:null,scrollAreaElement:null,horizontalScrollElement:null,verticalScrollElement:null,usePinch:!1,useAutoZoom:!1,useMouseDrag:!1,pinchThreshold:30,cspNonce:``,maxPinchWheel:1/0,wheelScale:.01,displayHorizontalScroll:!0,displayVerticalScroll:!0,useTransform:!0,useWheelPinch:!0,zoomRange:[.001,1/0],wheelPinchKey:`ctrl`,useWheelScroll:Se,zoomOffsetX:`50%`,zoomOffsetY:`50%`,translateZ:0,useGesture:!0,useResizeObserver:!1,pinchDirection:`all`,preventWheelClick:!0,useBounceScrollBar:!1,useOverflowScroll:!1},Ae=function(e){return 1-(1-e)**3},je={horizontal:{pos:`Left`,coord:`X`,size:`Width`},vertical:{pos:`Top`,coord:`Y`,size:`Height`}},Me=ke.className,Ne=`margin.threshold.zoomOffsetX.zoomOffsetY.zoom.zoomX.zoomY.rangeX.rangeY.rangeOffsetX.rangeOffsetY.usePinch.useMouseDrag.pinchThreshold.maxPinchWheel.wheelScale.displayVerticalScroll.displayHorizontalScroll.translateZ.useAutoZoom.wheelPinchKey.zoomRange.zoomRangeX.zoomRangeY.pinchDirection.useOverflowScroll`.split(`.`),Pe=me(me([],Ne,!0),[`preventWheelClick`,`useWheelPinch`,`useWheelScroll`,`useGesture`,`cspNonce`,`wrapperElement`,`scrollAreaElement`,`verticalScrollElement`,`horizontalScrollElement`,`useResizeObserver`,`wheelContainer`,`useBounceScrollBar`],!1),Fe=[`scroll`,`abortPinch`,`dragStart`,`dragEnd`,`pinchStart`,`pinch`],Ie=`getScrollLeft.getScrollTop.getScrollWidth.getScrollHeight.getContainerWidth.getContainerHeight.getViewportWidth.getViewportHeight.getViewportScrollWidth.getViewportScrollHeight.scrollTo.scrollBy.zoomBy.scrollCenter.getContainer.getViewport.getWrapper.setZoom.getRangeX.getRangeY.resize.getZoom.getZoomX.getZoomY.getWheelContainer.setTo.setBy`.split(`.`),Le=1e-6,Re=function(e){fe(t,e);function t(t,n,r){var i=e.call(this)||this;i.type=n,i.isAppend=!1,i.size=0,i.scrollSize=0,i.isHorizontal=!1,i._onDragStart=function(e){var t=i.isHorizontal,n=e.inputEvent.target,r=e.datas,a=i.thumbElement===n;a||setTimeout(function(){requestAnimationFrame(function(){var n=i.thumbElement.getBoundingClientRect(),r=n[t?`left`:`top`],a=r+n[t?`width`:`height`],o=e[t?`clientX`:`clientY`];if(!(r<=o&&o<=a)){var s=i.size,c=s*s/i.scrollSize;i.scrollBy(r<o?c:-c)}})},100),r.isThumb=a,e.inputEvent.stopPropagation(),e.inputEvent.preventDefault()},i._onDrag=function(e){e.datas.isThumb&&i.scrollBy(i.isHorizontal?e.deltaX:e.deltaY)},i._onWheel=function(e){var t=i.isHorizontal?e.deltaX:e.deltaY;t&&e.preventDefault(),i.trigger(`scroll`,{delta:t})};var a=n===`horizontal`,s=g(t),c,l=r;return r?c=r.querySelector(`.${Oe}`):(l=s.createElement(`div`),c=s.createElement(`div`),l.insertBefore(c,null),i.isAppend=!0),A(l,a?Ee:De),A(l,Te),A(c,Oe),i.thumbElement=c,i.barElement=l,i.isHorizontal=a,i.gesto=new E(l,{container:h(s)}).on(`dragStart`,function(e){return i._onDragStart(e)}).on(`drag`,function(e){return i._onDrag(e)}),o(i.barElement,`wheel`,i._onWheel,{passive:!1}),i}var n=t.prototype;return n.scrollBy=function(e,t){var n=e/this.size;this.trigger(`scroll`,{delta:t?e:this.scrollSize*n})},n.render=function(e,t,n,r){this.size=n,this.scrollSize=r;var i=e&&y(r-n,.001)>0?1:0,a=this.isHorizontal?[`X`,`width`]:[`Y`,`height`],o=a[0],s=a[1],c=n/r*100,l=Math.max(0,t)/r*100;this.thumbElement.style.cssText+=`${s}: ${c}%;opacity: ${i};transform: translate${o}(${100/c*l}%)`},n.destroy=function(){w(this.barElement,`wheel`,this._onWheel),this.gesto.off(),this.off()},t}(s),ze=function(e){fe(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}return t}(function(e){fe(t,e);function t(t,n,r){n===void 0&&(n={}),r===void 0&&(r={});var i=e.call(this)||this;return i._containerElement=t,i.offsetX=0,i.offsetY=0,i.containerWidth=0,i.containerHeight=0,i.viewportWidth=0,i.viewportHeight=0,i.viewportScrollWidth=0,i.viewportScrollHeight=0,i.scrollLeft=0,i.scrollTop=0,i._scrollTimer=0,i._zoomTimer=0,i._viewportElement=null,i._wheelContainerElement=null,i.dragFlag=!1,i.isLoop=!1,i._tempScale=[1,1],i._tempRect=null,i._tempRectTimer=null,i._onDestroys=[],i._asLeft=0,i._asTop=0,i.resize=function(){var e=i._containerElement,t=e.offsetWidth,n=e.offsetHeight,r=i._viewportElement,a=r.offsetWidth,o=r.offsetHeight,s=r.scrollWidth,c=r.scrollHeight;i.containerWidth=t,i.containerHeight=n,i.viewportWidth=a,i.viewportHeight=o,i.viewportScrollWidth=Math.max(a,s),i.viewportScrollHeight=Math.max(o,c),i.render(),i._scrollBy(0,0)},i._onScroll=function(){var e=i.wrapperElement,t=e.scrollLeft,n=e.scrollTop,r=i.zoom,a=r===void 0?P.zoom:r,o=t-i.scrollLeft,s=n-i.scrollTop,c=i.getScrollLeft(),l=i.getScrollTop();i.isLoop&&=!1,i.scrollLeft=t,i.scrollTop=n,i.scrollTo(c+o/a,l+s/a)},i.onWheel=function(e){var t=i.options,n=t.pinchDirection,r=t.maxPinchWheel||1/0,a=e[`${i.wheelPinchKey}Key`]||e.ctrlKey;if(t.useWheelPinch&&a){var o=e.deltaY,s=o>=0?1:-1,c=Math.min(r,Math.abs(o));o=s*c;var l=-o,u=Math.max(1+l*(t.wheelScale||.01),Le);clearTimeout(i._tempRectTimer),i._tempRectTimer=window.setTimeout(function(){i._tempRect=null},100),i._triggerPinch({distance:c,scale:u,rotation:0,zoom:i.zoom*u,zoomX:i.zoomX*(n===`vertical`?1:u),zoomY:i.zoomY*(n===`horizontal`?1:u),inputEvent:e,isWheel:!0,clientX:e.clientX,clientY:e.clientY,ratioX:0,ratioY:0})}else if(t.useWheelScroll){var d=e.deltaX,o=e.deltaY;e.shiftKey&&!d&&(d=o,o=0),i.scrollBy(d/i.zoomX,o/i.zoomY)}else return;e.preventDefault()},i.onGestureStart=function(e){i._tempScale=[i.zoomX,i.zoomY],i._setClientRect(),e.preventDefault()},i.onGestureChange=function(e){if(e.preventDefault(),i.gesto.isFlag()||!i._tempScale)i._tempScale=[1,1];else{var t=e.scale,n=i._tempScale[0],r=i._tempScale[1],a=i.options.pinchDirection;i._triggerPinch({distance:0,scale:t,rotation:e.rotation,inputEvent:e,isWheel:!0,zoom:(n+r)*t/2,zoomX:n*(a===`vertical`?1:t),zoomY:r*(a===`horizontal`?1:t),clientX:e.clientX,clientY:e.clientY,ratioX:0,ratioY:0})}},i.onGestureEnd=function(){},oe(n)?(i._viewportElement=n,i.options=M(M({},P),r)):(i._viewportElement=t.children[0],i.options=M(M({},P),n)),i.init(),i}var n=t.prototype;return n.getContainer=function(){return this._containerElement},n.getWheelContainer=function(){return this._wheelContainerElement},n.getViewport=function(){return this._viewportElement},n.getWrapper=function(){return this.wrapperElement},n.geScrollArea=function(){return this.scrollAreaElement},n.destroy=function(){this.off(),this.gesto.unset(),this.verticalScrollbar.destroy(),this.horizontalScrollbar.destroy(),this.injectResult.destroy();var e=this._containerElement;this._onDestroys.forEach(function(e){e()}),w(this.wrapperElement,`scroll`,this._onScroll),w(this._wheelContainerElement,`wheel`,this.onWheel),w(e,`gesturestart`,this.onGestureStart),w(e,`gesturechange`,this.onGestureChange),w(e,`gesturesend`,this.onGestureEnd),this.gesto=null,this.injectResult=null,this._containerElement=null,this._viewportElement=null,this.options=null},n.getScrollTop=function(e){e===void 0&&(e={});var t=!1,n=!1;D(e)?(t=e.range,n=e.absolute):t=e;var r=this.zoomY,i=this.scrollTop/r+this.offsetY+(t?j(this.getRangeY()[0]):0);return n?i*r:i},n.getScrollLeft=function(e){e===void 0&&(e={});var t=!1,n=!1;D(e)?(t=e.range,n=e.absolute):t=e;var r=this.zoomX,i=this.scrollLeft/r+this.offsetX+(t?j(this.getRangeX()[0]):0);return n?i*r:i},n.getScrollWidth=function(e){var t=this._getScrollRangeX(),n=this.zoomX,r=this.containerWidth/n+j(t[0])+t[1];return e?r:r*n},n.getScrollHeight=function(e){var t=this._getScrollRangeY(),n=this.zoomY,r=this.containerHeight/n+j(t[0])+t[1];return e?r:r*n},n.scrollCenter=function(e){e===void 0&&(e={}),this.resize();var t=this.zoomX,n=this.zoomY,r=-(this.containerWidth/t-this.viewportWidth)/2,i=-(this.containerHeight/n-this.viewportHeight)/2;return e.absolute&&(r*=t,i*=n),e.horizontal===!1&&(r=this.getScrollLeft()),e.vertical===!1&&(i=this.getScrollTop()),this.scrollTo(r,i,e)},n.setTo=function(e){var t=e.x,n=t===void 0?this.getScrollLeft():t,r=e.y,i=r===void 0?this.getScrollTop():r,o=e.zoom,s=o===void 0?[this.getZoomX(),this.getZoomY()]:o,c=e.duration,d=this,f=d.zoomX,p=d.zoomY,m=d.zoomRange,h=this,g=h.zoomOffsetX,_=g===void 0?P.zoomOffsetX:g,v=h.zoomOffsetY,y=v===void 0?P.zoomOffsetY:v;`zoomOffsetX`in e&&(_=e.zoomOffsetX),`zoomOffsetY`in e&&(y=e.zoomOffsetY);var b=a(s)?s:[s,s],ee=b[0],x=b[1],S=this.zoomRangeX||m,C=this.zoomRangeY||m,w=u(ee,S[0],S[1]),T=u(x,C[0],C[1]),te=l(`${_}`,this.viewportWidth)*(1/f-1/w),E=l(`${y}`,this.viewportHeight)*(1/p-1/T);this.scrollTo(n-te,i-E,{duration:c}),this.setZoom(s,{zoomOffsetX:_,zoomOffsetY:y,duration:c,zoomBase:`fixed`})},n.setBy=function(e){var t=e.x,n=t===void 0?0:t,r=e.y,i=r===void 0?0:r,o=e.zoom,s=o===void 0?[0,0]:o,c=a(s)?s:[s,s],l=c[0],u=c[1];this.setTo(M(M({},e),{x:this.getScrollLeft()+n,y:this.getScrollTop()+i,zoom:[this.zoomX+l,this.zoomY+u]}))},n.scrollBy=function(e,t,n){if(this._pauseScrollAnimation(),!n||!n.duration){var r=this.getScrollLeft(),i=this.getScrollTop();return n?.absolute&&(r*=this.zoomX,i*=this.zoomY),this._scrollTo(r+e,i+t,n)}return this._startScrollAnimation([e,t],n),!0},n.scrollTo=function(e,t,n){if(this._pauseScrollAnimation(),!n||!n.duration)return this._scrollTo(e,t,n);var r=this.getScrollLeft(),i=this.getScrollTop();return n?.absolute&&(r*=this.zoomX,i*=this.zoomY),this.scrollBy(e-r,t-i,n)},n.zoomBy=function(e,t){this._pauseZoomAnimation();var n=a(e)?e:[e,e],r=n[0],i=n[1];!t||!t.duration?this._setZoom([this.zoomX+r,this.zoomY+i],t):this._startZoomAnimation([r,i],t)},n.setZoom=function(e,t){if(this._pauseZoomAnimation(),!t||!t.duration)this._setZoom(e,t);else{var n=a(e)?e:[e,e],r=n[0],i=n[1];this._startZoomAnimation([r-this.zoomX,i-this.zoomY],t)}},n.getViewportWidth=function(){return this.viewportWidth},n.getViewportHeight=function(){return this.viewportWidth},n.getViewportScrollWidth=function(){return this.viewportScrollWidth},n.getViewportScrollHeight=function(){return this.viewportScrollHeight},n.getContainerWidth=function(){return this.containerWidth},n.getContainerHeight=function(){return this.containerHeight},n.getZoom=function(){return(this.zoomX+this.zoomY)/2},n.getZoomX=function(){return this.zoomX},n.getZoomY=function(){return this.zoomY},n.getRangeX=function(e,t){return this._getRangeCoord(`horizontal`,e,t)},n.getRangeY=function(e,t){return this._getRangeCoord(`vertical`,e,t)},n.init=function(){var e=this,t=this._containerElement,n=this.options,r=g(t),i=h(t),a=n.wrapperElement||t.querySelector(`.${Ce}`),s=n.scrollAreaElement||t.querySelector(`.${we}`),c=n.horizontalScrollElement||t.querySelector(`.${Ee}`),l=n.verticalScrollElement||t.querySelector(`.${De}`);a||(a=r.createElement(`div`),a.insertBefore(this._viewportElement,null),t.insertBefore(a,null)),this.wrapperElement=a,s||(s=r.createElement(`div`),a.insertBefore(s,a.firstChild)),this.scrollAreaElement=s,A(t,Me),A(a,Ce),A(s,we);var u=new Re(t,`horizontal`,c),d=new Re(t,`vertical`,l);this.horizontalScrollbar=u,this.verticalScrollbar=d,u.on(`scroll`,function(t){e.scrollBy(t.delta/e.zoomX,0)}),d.on(`scroll`,function(t){e.scrollBy(0,t.delta/e.zoomY)}),u.isAppend&&t.insertBefore(u.barElement,null),d.isAppend&&t.insertBefore(d.barElement,null),this.injectResult=ke.inject(t,{nonce:this.options.cspNonce});var f=n.wheelContainer,p=null;if(f&&(ae(f)?p=r.querySelector(f):oe(f)?p=f:(`value`in f||`current`in f)&&(p=f.current||f.value)),p||=t,this._wheelContainerElement=p,this.gesto=new E(t,{container:h(t),events:[`touch`,`mouse`],preventWheelClick:this.options.preventWheelClick??!0}).on(`dragStart`,function(t){var n=t.inputEvent,r=t.stop,i=t.datas;!e.useMouseDrag&&t.isMouseEvent?r():(e._pauseScrollAnimation(),e.dragFlag=!1,e.trigger(`dragStart`,t)===!1?r():(n.preventDefault(),i.startEvent=n))}).on(`drag`,function(t){!e.options.usePinch||t.isPinch||e.useMouseDrag&&t.isMouseEvent?(e.trigger(`drag`,M(M({},t),{inputEvent:t.inputEvent})),he(t),e.scrollBy(-t.deltaX/e.zoomX,-t.deltaY/e.zoomY)):!e.dragFlag&&t.movement>n.pinchThreshold&&(e.dragFlag=!0,e.trigger(`abortPinch`,{inputEvent:t.datas.startEvent||t.inputEvent}))}).on(`dragEnd`,function(t){e.trigger(`dragEnd`,{isDrag:t.isDrag,isDouble:t.isDouble,inputEvent:t.inputEvent}),e._startScrollAnimationBySpeed(t.datas.speed)}).on(`pinchStart`,function(t){var n=t.inputEvent,r=t.datas,i=t.stop;n.preventDefault(),e._pauseScrollAnimation(),r.startZoom=[e.zoomX,e.zoomY],e.trigger(`pinchStart`,{inputEvent:n})===!1&&i(),e._setClientRect()}).on(`pinch`,function(t){var n=t.scale,r=e.options.pinchDirection;e._triggerPinch({rotation:t.rotation,distance:t.distance,scale:t.scale,inputEvent:t.inputEvent,isWheel:!1,zoom:t.datas.startZoom*n,zoomX:e.zoomX*(r===`vertical`?1:n),zoomY:e.zoomY*(r===`horizontal`?1:n),clientX:t.clientX,clientY:t.clientY,ratioX:0,ratioY:0})}).on(`pinchEnd`,function(){e._tempRect=null}),o(a,`scroll`,this._onScroll),n.useResizeObserver){var m=new i.ResizeObserver(function(){e.resize()});m.observe(this._viewportElement),m.observe(this._containerElement),this._onDestroys.push(function(){m.disconnect()})}else o(i,`resize`,this.resize),this._onDestroys.push(function(){w(i,`resize`,e.resize)});(n.useWheelPinch||n.useWheelScroll)&&o(p,`wheel`,this.onWheel,{passive:!1}),n.useGesture&&(o(t,`gesturestart`,this.onGestureStart,{passive:!1}),o(t,`gesturechange`,this.onGestureChange,{passive:!1})),this.resize()},n.render=function(){var e=this,t=e.offsetX,n=e.offsetY,r=e.zoomX,i=r===void 0?P.zoomX:r,a=e.zoomY,o=a===void 0?P.zoomY:a,s=e.translateZ,c=s===void 0?0:s;e.rangeX,e.rangeY,e.containerWidth,e.containerHeight;var l=this.options.useTransform,u=l===void 0?P.useTransform:l,d=-t*i,f=-n*o;this.scrollAreaElement.style.cssText=`width:calc(100% + ${this.getScrollAreaWidth()}px);height:calc(100% + ${this.getScrollAreaHeight()}px);`;var p=this._viewportElement.style;u===!1?p.cssText+=`position: relative; left: ${d}px; top: ${f}px; `:p.cssText+=`transform-origin: 0 0;transform:translate3d(${d}px, ${f}px, ${c}px) scale(${i}, ${o});`,this.renderScroll()},n.renderScroll=function(){var e=this,t=e.zoomX,n=e.zoomY,r=e.containerWidth,i=e.containerHeight,a=this.horizontalScrollbar,o=this.verticalScrollbar;if(this.options.useBounceScrollBar){var s=this.getScrollLeft(!0)*t,c=this.getRangeX(!0),l=r+j(c[0])+j(c[1]),u=this.getScrollTop(!0)*n,d=this.getRangeY(!0),f=i+j(d[0])+j(d[1]);a.render(this.displayHorizontalScroll,s,r,l),o.render(this.displayVerticalScroll,u,i,f)}else{var p=this._getScrollRangeX(),m=this._getScrollRangeY(),s=this.getScrollLeft(),u=this.getScrollTop(),l=this.containerWidth+j(p[0])+p[1],f=this.containerHeight+j(m[0])+m[1];a.render(this.displayHorizontalScroll,s-p[0],r,l),o.render(this.displayVerticalScroll,u-m[0],i,f)}},n.move=function(e,t){var n=this.wrapperElement;n.scrollLeft=e,n.scrollTop=t},n.setDisplayVerticalScroll=function(e){this.options.displayVerticalScroll=e,this.renderScroll()},n.setDisplayHorizontalScroll=function(e){this.options.displayHorizontalScroll=e,this.renderScroll()},n._startZoomAnimation=function(e,t){var n=this;if(e){var r=t.duration;be(function(r){return n._setZoom([n.zoomX+e[0]*r,n.zoomY+e[1]*r],t)},function(e){n._zoomTimer=requestAnimationFrame(e)},{easing:t.easing||Ae,duration:r})}},n._startScrollAnimation=function(e,t){var n=this;if(e[0]||e[1]){var r=t.duration;be(function(r){return n._scrollBy(e[0]*r,e[1]*r,t)},function(e){n._scrollTimer=requestAnimationFrame(e)},{easing:t.easing||Ae,duration:r})}},n._startScrollAnimationBySpeed=function(e){if(e&&(e[0]||e[1])){var t=-6e-4,n=ge(e,t),r=_e(e,t);return this._startScrollAnimation(r,{duration:n})}},n._pauseScrollAnimation=function(){cancelAnimationFrame(this._scrollTimer),this._scrollTimer=0},n._pauseZoomAnimation=function(){cancelAnimationFrame(this._zoomTimer),this._zoomTimer=0},n.getScrollAreaWidth=function(){var e=this.getRangeX(!0),t=e[0],n=e[1];return t||n?this.margin*2:0},n.getScrollAreaHeight=function(){var e=this.getRangeY(!0),t=e[0],n=e[1];return t||n?this.margin*2:0},n._triggerPinch=function(e){var t=e.clientX,n=e.clientY,r=e.zoomX,i=e.zoomY;this.useAutoZoom&&this._zoomByClient([r,i],t,n),this._tempRect||this._setClientRect();var a=this.zoomRange,o=this.zoomRangeX||a,s=this.zoomRangeY||a,c=this._tempRect,l=c.left,d=c.top,f=c.width,p=c.height,m=(t-l)/f*100,h=(n-d)/p*100;this.trigger(`pinch`,M(M({},e),{zoom:u((r+i)/2,a[0],a[1]),zoomX:u(r,o[0],o[1]),zoomY:u(i,s[0],s[1]),ratioX:m,ratioY:h}))},n._setClientRect=function(){var e=this.getContainer().getBoundingClientRect();this._tempRect={left:e.left,top:e.top,width:e.width,height:e.height}},n._zoomByClient=function(e,t,n){this._tempRect||this._setClientRect();var r=this._tempRect,i=r.left,a=r.top,o=r.width,s=r.height,c=this.options,l=c.zoomOffsetX,u=c.zoomOffsetY;c.zoomOffsetX=`${(t-i)/o*100}%`,c.zoomOffsetY=`${(n-a)/s*100}%`,this._setZoom(e,{zoomBase:`screen`}),c.zoomOffsetX=l,c.zoomOffsetY=u},n._setZoom=function(e,t){t===void 0&&(t={});var n=t.zoomBase,r=this,i=r.containerWidth,o=r.containerHeight,s=r.zoomX,c=r.zoomY,d=r.zoomRange,f=this,p=f.zoomOffsetX,m=p===void 0?P.zoomOffsetX:p,h=f.zoomOffsetY,g=h===void 0?P.zoomOffsetY:h;`zoomOffsetX`in t&&(m=t.zoomOffsetX),`zoomOffsetY`in t&&(g=t.zoomOffsetY);var _=this.getScrollLeft(),v=this.getScrollTop(),y=a(e)?e:[e,e],b=y[0],ee=y[1],x=this.zoomRangeX||d,S=this.zoomRangeY||d,C=u(b,x[0],x[1]),w=u(ee,S[0],S[1]),T=this.options;T.zoomX=C,T.zoomY=w,T.zoom=(C+w)/2;var te=this.getScrollLeft(),E=this.getScrollTop(),D=0,O=0;n===`fixed`?(D=l(`${m}`,this.viewportWidth),O=l(`${g}`,this.viewportHeight)):n===`viewport`?(D=(-_+l(`${m}`,this.viewportWidth))*s,O=(-v+l(`${g}`,this.viewportHeight))*c):(D=l(`${m}`,i),O=l(`${g}`,o));var ne=_+D/s,re=v+O/c,ie=te+D/C,ae=E+O/w;this._scrollBy(ne-ie,re-ae,{zoom:!!(C-s||w-c)}),this.render()},n._scrollBy=function(e,t,n){var r=this.getScrollLeft(),i=this.getScrollTop();return n?.absolute&&(r*=this.zoomX,i*=this.zoomY),this._scrollTo(r+e,i+t,n)},n._scrollTo=function(e,t,n){var r=this,i=this,a=i.scrollLeft,o=i.scrollTop,s=n?.absolute;this._scrollToType(`horizontal`,e,s),this._scrollToType(`vertical`,t,s);var c=this.scrollLeft,l=this.scrollTop;this.render();var u=this.getScrollLeft(),d=this.getScrollTop();return this._emitScrollEvent(u,d,n?.zoom),Math.round(a)!==c||Math.round(o)!==l?(this.isLoop=!0,this.move(c,l),requestAnimationFrame(function(){if(r.isLoop){r.isLoop=!1;var e=r.wrapperElement,t=e.scrollLeft,n=e.scrollTop;r.scrollLeft=t,r.scrollTop=n,(c!==Math.round(t)||l!==Math.round(n))&&r._scrollTo(u,d)}}),!1):!0},n._scrollToType=function(e,t,n){var r=je[e],i=this,a=i.margin,o=a===void 0?P.margin:a,s=i.threshold,c=s===void 0?P.threshold:s,l=this[`scroll${r.pos}`],u=this[`getRange${r.coord}`](!0,!0),d=u[0],f=u[1],p=Math.round(l),m=this[`getScrollArea${r.size}`](),h=this[`zoom${r.coord}`];n&&(t/=h);var g=t*h;if(d===f)p=d,t=d/h;else if(g-c<=d){var _=Math.max(0,g-d);p=_,t=(d+_)/h}else if(g+c>=f){var v=Math.max(0,f-g);p=m-v,t=(f-v)/h}else p<c?p+=o:p>m-c&&(p-=o);p=Math.round(p),this[`scroll${r.pos}`]=p,this[`offset${r.coord}`]=t-p/h},n._getRangeCoord=function(e,t,n){var r=this,i=r.margin,a=i===void 0?P.margin:i,o=r.threshold,s=je[e],c=ye(this[`range${s.coord}`],P[`range${s.coord}`]),l=ye(this[`rangeOffset${s.coord}`],P[`rangeOffset${s.coord}`]),u=this[`zoom${s.coord}`],d=ve(this[`getScroll${s.pos}`](),a,c,o,n);return t?[d[0]*u+l[0],this.options.useOverflowScroll?Math.max(this[`viewport${s.size}`]*u-this[`container${s.size}`],d[1]*u+l[1]):d[1]*u+l[1]]:[d[0]+l[0],d[1]+l[1]]},n._emitScrollEvent=function(e,t,n){var r=this._asLeft,i=this._asTop;(n||r!==e||i!==t)&&(this._asLeft=e,this._asTop=t,this.trigger(`scroll`,{scrollLeft:e,scrollTop:t,zoomX:this.zoomX,zoomY:this.zoomY}))},n._getScrollRangeX=function(){var e=this.getScrollLeft(),t=this.rangeX,n=t[0],r=t[1];this.useOverflowScroll&&isFinite(r)&&(r=Math.max(r,this.viewportWidth-this.containerWidth/this.zoomX));var i=Math.min(0,isFinite(n)?Math.min(n,e):e),a=Math.max(0,isFinite(r)?Math.max(r,e):e),o=this.viewportScrollWidth,s=Math.max(this.containerWidth/this.zoomX,o)-o;return[Math.min(0,s+i),a]},n._getScrollRangeY=function(){var e=this.getScrollTop(),t=this.rangeY,n=t[0],r=t[1];this.useOverflowScroll&&isFinite(r)&&(r=Math.max(r,this.viewportHeight-this.containerHeight/this.zoomY));var i=Math.min(0,isFinite(n)?Math.min(n,e):e),a=Math.max(0,isFinite(r)?Math.max(r,e):e),o=this.viewportScrollHeight,s=Math.max(this.containerHeight/this.zoomY,o)-o;return[Math.min(0,s+i),a]},t=pe([te(Ne,function(e,t){var n={enumerable:!0,configurable:!0,get:function(){return this.options[t]}},r=m(`set ${t}`);n.set=e[r]?function(e){this[r](e)}:function(e){this.options[t]=e},Object.defineProperty(e,t,n)})],t),t}(s))})))()}function Ve(e,t){if(typeof t!=`function`&&t!==null)throw TypeError(`Class extends value `+String(t)+` is not a constructor or null`);I(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}function He(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var F,I,L,Ue,We;function Ge(){return(Ge=t((()=>{F=r(),Be(),f(),I=function(e,t){return I=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},I(e,t)},L=function(){return L=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},L.apply(this,arguments)},Ue=Fe.map(function(e){return m(`on ${e}`)}),We=function(e){Ve(t,e);function t(){return e!==null&&e.apply(this,arguments)||this}var n=t.prototype;return n.render=function(){var e=this.props.className;return(0,F.createElement)(`div`,{className:`${e||``} ${Me}`,ref:x(this,`containerElement`)},(0,F.createElement)(`div`,{className:`infinite-viewer-wrapper`,ref:x(this,`wrapperElement`)},(0,F.createElement)(`div`,{className:`infinite-viewer-scroll-area`,ref:x(this,`scrollAreaElement`)}),this.props.children),(0,F.createElement)(`div`,{className:`infinite-viewer-scroll-bar infinite-viewer-horizontal-scroll-bar`,ref:x(this,`horizontalScrollElement`)},(0,F.createElement)(`div`,{className:`infinite-viewer-scroll-thumb`})),(0,F.createElement)(`div`,{className:`infinite-viewer-scroll-bar infinite-viewer-vertical-scroll-bar`,ref:x(this,`verticalScrollElement`)},(0,F.createElement)(`div`,{className:`infinite-viewer-scroll-thumb`})))},n.componentDidMount=function(){var e=this,t=this.props,n={};Pe.forEach(function(e){e in t&&t[e]!==void 0&&(n[e]=t[e])}),this.infiniteViewer=new ze(this.containerElement,this.scrollAreaElement.nextElementSibling,L(L({},n),{wrapperElement:this.wrapperElement,scrollAreaElement:this.scrollAreaElement,horizontalScrollElement:this.horizontalScrollElement,verticalScrollElement:this.verticalScrollElement})),Fe.forEach(function(t,n){e.infiniteViewer.on(t,function(t){var r=e.props;(r[Ue[n]]&&r[Ue[n]](t))===!1&&t.stop()})})},n.componentDidUpdate=function(e){var t=this.props,n=this.infiniteViewer;Ne.forEach(function(e){e in t&&n[e]!==t[e]&&(n[e]=t[e])})},n.componentWillUnmount=function(){this.infiniteViewer.destroy()},n.getElement=function(){return this.containerElement},He([ne(Ie)],t.prototype,`infiniteViewer`,void 0),t}(F.PureComponent)})))()}var Ke=n({default:()=>qe});function qe(){let e=Je.useRef(null);return Je.useEffect(()=>{setTimeout(()=>{e.current.scrollCenter()},100)},[]),(0,R.jsxs)(`div`,{className:`container`,children:[(0,R.jsx)(`button`,{className:`button`,onClick:()=>{e.current.scrollCenter()},style:{position:`absolute`,top:`10px`,right:`10px`,zIndex:1},children:`Scroll Center`}),(0,R.jsx)(We,{className:`infinite-viewer`,ref:e,children:(0,R.jsxs)(`div`,{className:`viewport`,style:{width:`400px`,height:`400px`,border:`1px solid #ccc`},children:[(0,R.jsx)(`div`,{className:`target`,children:`Target`}),(0,R.jsx)(T,{scrollable:!0,scrollOptions:{container:()=>e.current.getContainer(),threshold:20,getScrollPosition:()=>[e.current.getScrollLeft({absolute:!0}),e.current.getScrollTop({absolute:!0})]},target:`.target`,draggable:!0,resizable:!0,rotatable:!0,onRender:e=>{e.target.style.cssText+=e.cssText},onScroll:({direction:t})=>{e.current.scrollBy(t[0]*10,t[1]*10)}})]})})]})}var Je,R;function Ye(){return(Ye=t((()=>{Je=e(r()),v(),Ge(),R=i()})))()}var Xe=n({default:()=>Ze});function Ze(){let[e,t]=z.useState([]),n=z.useRef(null),r=z.useRef(null),i=[];for(let e=0;e<30;++e)i.push(e);return(0,B.jsx)(`div`,{className:`root`,children:(0,B.jsxs)(`div`,{className:`container`,children:[(0,B.jsx)(T,{ref:n,draggable:!0,target:e,onClickGroup:e=>{r.current.clickTarget(e.inputEvent,e.inputTarget)},onDrag:e=>{e.target.style.transform=e.transform},onDragGroup:e=>{e.events.forEach(e=>{e.target.style.transform=e.transform})}}),(0,B.jsx)(de,{ref:r,dragContainer:window,selectableTargets:[`.selecto-area .cube`],hitRate:0,selectByClick:!0,selectFromInside:!1,toggleContinueSelect:[`shift`],ratio:0,onDragStart:t=>{let r=n.current,i=t.inputEvent.target;(r.isMoveableElement(i)||e.some(e=>e===i||e.contains(i)))&&t.stop()},onSelectEnd:e=>{let r=n.current;e.isDragStart&&(e.inputEvent.preventDefault(),r.waitToChangeTarget().then(()=>{r.dragStart(e.inputEvent)})),t(e.selected)}}),(0,B.jsx)(`div`,{className:`elements selecto-area`,children:i.map(e=>(0,B.jsx)(`div`,{className:`cube`},e))}),(0,B.jsx)(`div`,{className:`empty elements`})]})})}var z,B;function Qe(){return(Qe=t((()=>{z=e(r()),ue(),v(),B=i()})))()}var $e,V,et;function tt(){return(tt=t((()=>{f(),$e=class{constructor(e){this.parent=e,this.type=`single`,this.depth=0,this._scope=[],e&&(this.depth=e.depth+1)}get scope(){let e=this.parent;return!e||e.type===`root`?[]:[...e.scope,e.id]}},V=class extends $e{constructor(e,t){super(e),this.value=t,this.type=`single`,this.isGroupElement=!1}},et=class e extends $e{constructor(...e){super(...e),this.type=`group`,this.value=[],this.id=``,this.groupElement=null,this.map=new Map}compare(e,t=0){let n=d(e),r=this.map,i=n.length,a=r.size,o=a-i,s=n.filter(e=>r.has(e)).length;return t>0&&o>=0||t===0&&o===0?i===s:t<0&&o<=0&&a===s}has(e){return this.map.has(e)}contains(e){return this.has(e)?!0:this.value.some(t=>t.type===`group`&&t.contains(e))}findContainedChild(e){return re(this.value,t=>t.type===`single`?t.value===e:t.contains(e))}findExactChild(e){let t=this.map;if(!a(e))return t.get(e);let n=d(e),r=n.length,i=t.get(n[0]);if(!i)return;let o=i.parent;for(;o;){if(o.map.size>=r)return o;o=o.parent}}findCommonParent(e){let t=1/0,n=e.map(e=>this.findExactChild(e));for(n.forEach(e=>{e&&(t=Math.min(e.depth,t))});t;){--t,n=n.map(e=>{let n=e;for(;n&&n.depth!==t;)n=n.parent;return n});let e=n.find(e=>e);if(!e)return this;if(n.every(t=>!t||t===e))break}return n.find(e=>e)||this}findNextChild(e,t=this.toTargetGroups(),n=!0){let r=null,i=t.length;return t.some(t=>{if(!n&&i===1&&a(t))return r=this.findNextChild(e,t),r;let o=this.findExactChild(t);if(o&&`map`in o&&o.map.has(e))return r=o,!0}),r}findNextExactChild(e,t,n=this.toTargetGroups()){let r=this.findNextChild(e,n,!0);return r&&r.compare(t,-1)?r:null}findPureChild(e,t){let n=null,r=t.filter(e=>this.has(e));return r.length?(this.value.some(t=>{if(t.type!==`single`&&t.has(e)&&(n=t.findPureChild(e,r),n))return!0}),n):this}findNextPureChild(e,t){let n=this.findNextChild(e);return n?n.findPureChild(e,t):null}getSingleChild(){let e=this.groupElement;if(e){let t=this.parent?.value.find(t=>t.value===e);if(t)return t}return null}toTargetGroups(){return this.value.map(e=>e.type===`single`?e.value:e.toTargetGroups())}findArrayChild(e){let{value:t}=this,n=!1;if(this.type!==`root`&&(n=t.every(t=>t.type===`single`?e.some(e=>t.value===e):e.some(e=>a(e)&&t.findArrayChild(e)))),n&&e.length===t.length)return this;{let n=null;return t.some(t=>{if(t.type===`group`)return n=t.findArrayChild(e),n}),n}}groupByPerfect(e){return this.value.filter(t=>t.type===`single`?e.indexOf(t.value)>-1:t.compare(e,-1)).map(e=>{if(e.type!==`single`){let t=e.getSingleChild();if(t)return t}return e})}add(t){let{value:n,map:r}=this;return t.forEach(t=>{if(`groupId`in t){let r=new e(this);r.id=t.groupId,n.push(r),r.add(t.children)}else if(a(t)){let r=new e(this);n.push(r),r.add(t)}else{let e=`current`in t?t.current:t,i=new V(this,e);n.push(i),r.set(e,i)}}),n.forEach(e=>{e.type===`single`?r.set(e.value,e):e.map.forEach((e,t)=>{r.set(t,e)})}),n.forEach(e=>{if(e.type!==`single`)return;let t=e.value,r=n.find(e=>{if(e.type===`single`)return;let n=[...e.map.keys()][0];if(n)return t.contains(n)});e.isGroupElement=!!r,r&&(r.groupElement=e.value)}),parent}}})))()}function nt(e){function t(e=[]){let n=[];return e.forEach(e=>{e.type===`single`?n.push(e.value):n.push(t(e.value))}),n}return{raw:()=>e,targets(){return t(this.raw())},flatten(){return d(this.targets())}}}var rt;function it(){return(it=t((()=>{f(),tt(),rt=class extends et{constructor(e,t){super(),this.type=`root`,this._targets=[],this.set(e,t)}set(e,t=[]){this.map=new Map,this.value=[];let n=this.map,r=this.value;this.add(e),t.forEach(e=>{if(n.has(e))return;let t=new V(this,e);t.depth=1,r.push(t),n.set(e,t)}),this._targets=t}selectSubChilds(e,t){let n=this,r=n.findNextChild(t,e,!1),i=n.map.get(t),a;return a=r?[r]:i?[i]:[],nt(a)}selectSingleChilds(e,t,n){let r=[...e];return n.forEach(e=>{let t=r.indexOf(e);t>-1&&r.splice(t,1)}),t.forEach(e=>{r.push(e)}),nt(this.toChilds(r))}selectCompletedChilds(e,t,n,r){let i=[...e],o=d(i);return n.forEach(e=>{let t=i.indexOf(e);if(t>-1){i.splice(t,1);return}let o=r?this.findNextChild(e,i):this.findNextExactChild(e,n,i);if(o){let e=i.findIndex(e=>a(e)&&o.compare(e));e>-1&&i.splice(e,1)}}),t.forEach(e=>{let t=this._findParentGroup(e,o).findContainedChild(e);if(t?.type===`group`){let e=t.getSingleChild();e?i.push(e.value):i.push(t.toTargetGroups())}else i.push(e)}),nt(this.toChilds(i))}selectSameDepthChilds(e,t,n,r){let i=[...e],o=this.findCommonParent(i);return n.forEach(e=>{let t=i.indexOf(e);if(t>-1){i.splice(t,1);return}let s=r?o.findNextExactChild(e,n,i):o.findNextChild(e,i,!0);if(s){let e=i.findIndex(e=>a(e)&&s.compare(e));e>-1&&i.splice(e,1)}}),o.groupByPerfect(t).forEach(e=>{if(e.type===`single`)i.push(e.value);else{let t=i.findIndex(t=>a(t)&&e.compare(t,1));t>-1&&i.splice(t,1),i.push(e.toTargetGroups())}}),nt(this.toChilds(i))}toChilds(e){let t=[];return e.forEach(e=>{if(a(e)){let n=this.findArrayChild(e);if(n){let e=n.getSingleChild();if(e)return e;t.push(n)}}else{let n=this.map.get(e);n?t.push(n):t.push(new V(this,e))}}),t}findChild(e,t){let n=this.map.get(e);return t?n||new V(this,e):n}findArrayChildById(e){let t=null;return this.value.some(function n(r){if(r.type!==`single`)return r.id===e?(t=r,!0):r.value.some(n)}),t}group(e,t){let n=this.findCommonParent(e),r=e.map(e=>a(e)?this.findArrayChild(e):this.findChild(e));if(!r.every(e=>e?.parent===n))return null;let i=new et(n),o=n.value.filter(e=>r.indexOf(e)===-1);return o.length?(o.unshift(i),i.add(t?d(e):e),n.value=o,this.set(this.toTargetGroups(),this._targets),i.toTargetGroups()):null}ungroup(e){e.length===1&&a(e[0])&&(e=e[0]);let t=this.findCommonParent(e),n=e.map(e=>a(e)?this.findArrayChild(e):this.findChild(e));if(t.groupElement||!t.value.every(e=>n.indexOf(e)>-1)||t===this)return null;let r=t.parent;if(!r)return null;let i=r.value.filter(e=>e!==t);return i.push(...t.value),r.value=i,this.set(this.toTargetGroups(),this._targets),t.toTargetGroups()}_findParentGroup(e,t){if(!t.length)return this;let n=this.map.get(e);if(!n)return this;let r=n.parent;for(;r;){if(t.some(e=>r.contains(e)))return r;r=r.parent}return this}}})))()}var at=n({default:()=>ot});function ot(){let{isKeydown:e}=ce({keys:`meta`}),{isKeydown:t}=ce({keys:`shift`}),n=H.useRef(),[r,i]=H.useState([]),a=H.useRef(null),o=H.useRef(null),s=[];for(let e=0;e<30;++e)s.push(e);let c=H.useCallback(e=>{o.current.setSelectedTargets(d(e)),i(e)},[]);return H.useEffect(()=>{let e=o.current.getSelectableElements();n.current=new rt([[[e[0],e[1]],e[2]],[e[5],e[6],e[7]]],e)},[]),(0,U.jsx)(`div`,{className:`root`,children:(0,U.jsxs)(`div`,{className:`container`,children:[(0,U.jsx)(T,{ref:a,draggable:!0,rotatable:!0,scalable:!0,target:r,onClickGroup:e=>{if(!e.moveableTarget)c([]);else if(e.isDouble){let t=n.current.selectSubChilds(r,e.moveableTarget);c(t.targets())}else e.isTrusted&&o.current.clickTarget(e.inputEvent,e.moveableTarget)},onDrag:e=>{e.target.style.transform=e.transform},onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})}}),(0,U.jsx)(de,{ref:o,dragContainer:window,selectableTargets:[`.selecto-area .cube`],hitRate:0,selectByClick:!0,selectFromInside:!1,toggleContinueSelect:[`shift`],ratio:0,onDragStart:e=>{let t=a.current,n=e.inputEvent.target,i=r.flat(3);(t.isMoveableElement(n)||i.some(e=>e===n||e.contains(n)))&&e.stop()},onSelectEnd:i=>{let{isDragStartEnd:o,isClick:s,added:l,removed:u,inputEvent:d}=i,f=a.current;o&&(d.preventDefault(),f.waitToChangeTarget().then(()=>{f.dragStart(d)}));let p=n.current,m;m=o||s?e?p.selectSingleChilds(r,l,u):p.selectCompletedChilds(r,l,u,t):p.selectSameDepthChilds(r,l,u),i.currentTarget.setSelectedTargets(m.flatten()),c(m.targets())}}),(0,U.jsx)(`p`,{children:`[[0, 1], 2] is group`}),(0,U.jsx)(`p`,{children:`[5, 6, 7] is group`}),(0,U.jsx)(`div`,{className:`elements selecto-area`,children:s.map(e=>(0,U.jsx)(`div`,{className:`cube`,children:e},e))}),(0,U.jsx)(`div`,{className:`empty elements`})]})})}var H,U;function st(){return(st=t((()=>{f(),H=e(r()),le(),ue(),v(),it(),U=i()})))()}var ct=n({default:()=>lt});function lt(){let e=W.useMemo(()=>new rt([]),[]),[t,n]=W.useState([]),r=W.useRef(null),i=W.useRef(null),a=[];for(let e=0;e<30;++e)a.push(e);let o=W.useCallback(e=>{i.current.setSelectedTargets(d(e)),n(e)},[]);return W.useEffect(()=>{let t=i.current.getSelectableElements();e.set([],t)},[]),(0,G.jsx)(`div`,{className:`root`,children:(0,G.jsxs)(`div`,{className:`container`,children:[(0,G.jsx)(`button`,{onClick:()=>{let r=e.group(t,!0);r&&n(r)},children:`Group`}),`\xA0`,(0,G.jsx)(`button`,{onClick:()=>{let r=e.ungroup(t);r&&n(r)},children:`Ungroup`}),(0,G.jsx)(T,{ref:r,draggable:!0,rotatable:!0,scalable:!0,target:t,onDrag:e=>{e.target.style.transform=e.transform},onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})},onClickGroup:n=>{if(!n.moveableTarget)o([]);else if(n.isDouble){let r=e.selectSubChilds(t,n.moveableTarget);o(r.targets())}else n.isTrusted&&i.current.clickTarget(n.inputEvent,n.moveableTarget)}}),(0,G.jsx)(de,{ref:i,dragContainer:window,selectableTargets:[`.selecto-area .cube`],hitRate:0,selectByClick:!0,selectFromInside:!1,toggleContinueSelect:[`shift`],ratio:0,onDragStart:e=>{let n=r.current,i=e.inputEvent.target,a=d(t);(i.tagName===`BUTTON`||n.isMoveableElement(i)||a.some(e=>e===i||e.contains(i)))&&e.stop(),e.data.startTargets=t},onSelect:t=>{let{startAdded:n,startRemoved:r,isDragStartEnd:i}=t;if(i)return;let a=e.selectSameDepthChilds(t.data.startTargets,n,r);o(a.targets())},onSelectEnd:t=>{let{isDragStartEnd:n,isClick:i,added:a,removed:s,inputEvent:c}=t,l=r.current;n&&(c.preventDefault(),l.waitToChangeTarget().then(()=>{l.dragStart(c)}));let u;u=n||i?e.selectCompletedChilds(t.data.startTargets,a,s):e.selectSameDepthChilds(t.data.startTargets,a,s),t.currentTarget.setSelectedTargets(u.flatten()),o(u.targets())}}),(0,G.jsx)(`div`,{className:`elements selecto-area`,children:a.map(e=>(0,G.jsx)(`div`,{className:`cube`,children:e},e))}),(0,G.jsx)(`div`,{className:`empty elements`})]})})}var W,G;function ut(){return(ut=t((()=>{f(),W=e(r()),ue(),v(),it(),G=i()})))()}var dt=n({default:()=>ft});function ft(){let[e,t]=pt.useState([]),n=pt.useRef(null),r=pt.useRef(null),i=[];for(let e=0;e<30;++e)i.push(e);return(0,K.jsx)(`div`,{className:`root`,children:(0,K.jsxs)(`div`,{className:`container`,children:[(0,K.jsx)(T,{ref:n,draggable:!0,target:e,onClickGroup:e=>{r.current.clickTarget(e.inputEvent,e.inputTarget)},onDrag:e=>{e.target.style.transform=e.transform},onDragGroup:e=>{e.events.forEach(e=>{e.target.style.transform=e.transform})},onClick:e=>{if(e.isDouble){let n=e.inputTarget;r.current.getSelectableElements().includes(n)&&(r.current.setSelectedTargets([n]),t([n]))}}}),(0,K.jsx)(de,{ref:r,dragContainer:window,selectableTargets:[`.selecto-area .cube`],hitRate:0,selectByClick:!0,selectFromInside:!1,toggleContinueSelect:[`shift`],ratio:0,onDragStart:t=>{let r=n.current,i=t.inputEvent.target;(r.isMoveableElement(i)||e.some(e=>e===i||e.contains(i)))&&t.stop()},onSelectEnd:e=>{let r=n.current,i=e.selected;i=i.filter(e=>i.every(t=>e===t||!t.contains(e)));let a=p(e.startSelected,i);e.currentTarget.setSelectedTargets(i),(a.added.length||a.removed.length)&&(e.isDragStartEnd&&(e.inputEvent.preventDefault(),r.waitToChangeTarget().then(()=>{r.dragStart(e.inputEvent)})),t(i))}}),(0,K.jsx)(`div`,{className:`elements selecto-area`,children:i.map(e=>e===2?(0,K.jsxs)(`div`,{className:`cube`,style:{width:`100px`,height:`50px`},children:[e,(0,K.jsx)(`div`,{className:`cube`,children:e},e)]},e):(0,K.jsx)(`div`,{className:`cube`,children:e},e))}),(0,K.jsx)(`div`,{className:`empty elements`})]})})}var pt,K;function mt(){return(mt=t((()=>{pt=e(r()),ue(),v(),c(),K=i()})))()}var ht;function gt(){return(gt=t((()=>{ht=`import * as React from "react";
import Moveable from "@/react-moveable";
import InfiniteViewer from "react-infinite-viewer";

export default function App() {
    const viewerRef = React.useRef<InfiniteViewer>(null);

    React.useEffect(() => {
        setTimeout(() => {
            viewerRef.current!.scrollCenter();
        }, 100);
    }, []);

    const scrollOptions = {
        container: () => viewerRef.current!.getContainer(),
        threshold: 20,
        getScrollPosition: () => {
            return [
                viewerRef.current!.getScrollLeft({ absolute: true }),
                viewerRef.current!.getScrollTop({ absolute: true }),
            ];
        },
    };

    return (<div className="container">
        <button className="button" onClick={() => {
            viewerRef.current!.scrollCenter();
        }} style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
        }}>Scroll Center</button>
        <InfiniteViewer className="infinite-viewer" ref={viewerRef}>
            <div className="viewport" style={{
                width: "400px",
                height: "400px",
                border: "1px solid #ccc",
            }}>
                <div className="target">Target</div>
                <Moveable
                    scrollable={true}
                    scrollOptions={scrollOptions}
                    target={".target"}
                    draggable={true}
                    resizable={true}
                    rotatable={true}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                    onScroll={({ direction }) => {
                        viewerRef.current!.scrollBy(direction[0] * 10, direction[1] * 10);
                    }}
                ></Moveable>
            </div>
        </InfiniteViewer>
    </div>);
}
`})))()}var _t;function vt(){return(vt=t((()=>{_t=`import * as React from "react";
import Selecto from "react-selecto";
import Moveable from "@/react-moveable";


export default function App() {
    const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>([]);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);
    const cubes = [];

    for (let i = 0; i < 30; ++i) {
        cubes.push(i);
    }

    return <div className="root">
        <div className="container">
            <Moveable
                ref={moveableRef}
                draggable={true}
                target={targets}
                onClickGroup={e => {
                    selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onDragGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }}
            ></Moveable>
            <Selecto
                ref={selectoRef}
                dragContainer={window}
                selectableTargets={[".selecto-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    const moveable = moveableRef.current!;
                    if (e.isDragStart) {
                        e.inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(e.inputEvent);
                        });
                    }
                    setTargets(e.selected);
                }}
            ></Selecto>

            <div className="elements selecto-area">
                {cubes.map(i => <div className="cube" key={i}></div>)}
            </div>
            <div className="empty elements"></div>
        </div>
    </div>;
}
`})))()}var yt;function bt(){return(bt=t((()=>{yt=`import { deepFlat } from "@daybrush/utils";
import * as React from "react";
import { useKeycon } from "react-keycon";
import Selecto from "react-selecto";
import Moveable, { MoveableTargetGroupsType } from "@/react-moveable";
import { GroupManager, TargetList } from "@moveable/helper";

export default function App() {
    const { isKeydown: isCommand } = useKeycon({ keys: "meta" });
    const { isKeydown: isShift } = useKeycon({ keys: "shift" });
    const groupManagerRef = React.useRef<GroupManager>();
    const [targets, setTargets] = React.useState<MoveableTargetGroupsType>([]);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);
    const cubes = [];

    for (let i = 0; i < 30; ++i) {
        cubes.push(i);
    }
    const setSelectedTargets = React.useCallback((nextTargetes: MoveableTargetGroupsType) => {
        selectoRef.current!.setSelectedTargets(deepFlat(nextTargetes));
        setTargets(nextTargetes);
    }, []);
    React.useEffect(() => {
        // [[0, 1], 2], 3, 4, [5, 6], 7, 8, 9
        const elements = selectoRef.current!.getSelectableElements();

        groupManagerRef.current = new GroupManager([
            [[elements[0], elements[1]], elements[2]],
            [elements[5], elements[6], elements[7]],
        ], elements);
    }, []);

    return <div className="root">
        <div className="container">
            <Moveable
                ref={moveableRef}
                draggable={true}
                rotatable={true}
                scalable={true}
                target={targets}
                onClickGroup={e => {
                    if (!e.moveableTarget) {
                        setSelectedTargets([]);
                        return;
                    }
                    if (e.isDouble) {
                        const childs = groupManagerRef!.current!.selectSubChilds(targets, e.moveableTarget);

                        setSelectedTargets(childs.targets());
                        return;
                    }
                    if (e.isTrusted) {
                        selectoRef.current!.clickTarget(e.inputEvent, e.moveableTarget);
                    }
                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onRenderGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }}
            ></Moveable>
            <Selecto
                ref={selectoRef}
                dragContainer={window}
                selectableTargets={[".selecto-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    // Must have use deep flat
                    const flatted = targets.flat(3) as Array<HTMLElement | SVGElement>;
                    if (
                        moveable.isMoveableElement(target)
                        || flatted.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    const {
                        isDragStartEnd,
                        isClick,
                        added,
                        removed,
                        inputEvent,
                    } = e;
                    const moveable = moveableRef.current!;

                    if (isDragStartEnd) {
                        inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(inputEvent);
                        });
                    }
                    const groupManager = groupManagerRef.current!;
                    let nextChilds: TargetList;

                    if (isDragStartEnd || isClick) {
                        if (isCommand) {
                            nextChilds = groupManager.selectSingleChilds(targets, added, removed);
                        } else {
                            nextChilds = groupManager.selectCompletedChilds(targets, added, removed, isShift);
                        }
                    } else {
                        nextChilds = groupManager.selectSameDepthChilds(targets, added, removed);
                    }
                    e.currentTarget.setSelectedTargets(nextChilds.flatten());
                    setSelectedTargets(nextChilds.targets());
                }}
            ></Selecto>
            <p>[[0, 1], 2] is group</p>
            <p>[5, 6, 7] is group</p>

            <div className="elements selecto-area">
                {cubes.map(i => <div className="cube" key={i}>{i}</div>)}
            </div>
            <div className="empty elements"></div>
        </div>
    </div>;
}
`})))()}var xt;function St(){return(St=t((()=>{xt=`import { deepFlat } from "@daybrush/utils";
import * as React from "react";
import Selecto from "react-selecto";
import Moveable, { MoveableTargetGroupsType } from "@/react-moveable";
import { GroupManager, TargetList } from "@moveable/helper";

export default function App() {
    const groupManager = React.useMemo<GroupManager>(() => new GroupManager([]), []);
    const [targets, setTargets] = React.useState<MoveableTargetGroupsType>([]);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);
    const cubes = [];

    for (let i = 0; i < 30; ++i) {
        cubes.push(i);
    }
    const setSelectedTargets = React.useCallback((nextTargetes: MoveableTargetGroupsType) => {
        selectoRef.current!.setSelectedTargets(deepFlat(nextTargetes));
        setTargets(nextTargetes);
    }, []);

    React.useEffect(() => {
        // [[0, 1], 2], 3, 4, [5, 6], 7, 8, 9
        const elements = selectoRef.current!.getSelectableElements();

        groupManager.set([], elements);
    }, []);

    return <div className="root">
        <div className="container">
            <button onClick={() => {
                const nextGroup = groupManager.group(targets, true);

                if (nextGroup) {
                    setTargets(nextGroup);
                }
            }}>Group</button>
            &nbsp;
            <button onClick={() => {
                const nextGroup = groupManager.ungroup(targets);

                if (nextGroup) {
                    setTargets(nextGroup);
                }
            }}>Ungroup</button>
            <Moveable
                ref={moveableRef}
                draggable={true}
                rotatable={true}
                scalable={true}
                target={targets}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onRenderGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }}
                onClickGroup={e => {
                    if (!e.moveableTarget) {
                        setSelectedTargets([]);
                        return;
                    }
                    if (e.isDouble) {
                        const childs = groupManager.selectSubChilds(targets, e.moveableTarget);

                        setSelectedTargets(childs.targets());
                        return;
                    }
                    if (e.isTrusted) {
                        selectoRef.current!.clickTarget(e.inputEvent, e.moveableTarget);
                    }
                }}
            ></Moveable>
            <Selecto
                ref={selectoRef}
                dragContainer={window}
                selectableTargets={[".selecto-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    const flatted = deepFlat(targets);

                    if (
                        target.tagName === "BUTTON"
                        || moveable.isMoveableElement(target)
                        || flatted.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                    e.data.startTargets = targets;
                }}
                onSelect={e => {
                    const {
                        startAdded,
                        startRemoved,
                        isDragStartEnd,
                    } = e;

                    if (isDragStartEnd) {
                        return;
                    }
                    const nextChilds = groupManager.selectSameDepthChilds(
                        e.data.startTargets,
                        startAdded,
                        startRemoved,
                    );

                    setSelectedTargets(nextChilds.targets());
                }}
                onSelectEnd={e => {
                    const {
                        isDragStartEnd,
                        isClick,
                        added,
                        removed,
                        inputEvent,
                    } = e;
                    const moveable = moveableRef.current!;

                    if (isDragStartEnd) {
                        inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(inputEvent);
                        });
                    }
                    let nextChilds: TargetList;

                    if (isDragStartEnd || isClick) {
                        nextChilds = groupManager.selectCompletedChilds(e.data.startTargets, added, removed);
                    } else {
                        nextChilds = groupManager.selectSameDepthChilds(e.data.startTargets, added, removed);
                    }
                    e.currentTarget.setSelectedTargets(nextChilds.flatten());
                    setSelectedTargets(nextChilds.targets());
                }}
            ></Selecto>
            <div className="elements selecto-area">
                {cubes.map(i => <div className="cube" key={i}>{i}</div>)}
            </div>
            <div className="empty elements"></div>
        </div>
    </div>;
}
`})))()}var Ct;function wt(){return(wt=t((()=>{Ct=`import * as React from "react";
import Selecto from "react-selecto";
import Moveable from "@/react-moveable";
import { diff } from "@egjs/children-differ";


export default function App() {
    const [targets, setTargets] = React.useState<Array<SVGElement | HTMLElement>>([]);
    const moveableRef = React.useRef<Moveable>(null);
    const selectoRef = React.useRef<Selecto>(null);
    const cubes: number[] = [];

    for (let i = 0; i < 30; ++i) {
        cubes.push(i);
    }

    return <div className="root">
        <div className="container">
            <Moveable
                ref={moveableRef}
                draggable={true}
                target={targets}
                onClickGroup={e => {
                    selectoRef.current!.clickTarget(e.inputEvent, e.inputTarget);
                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                }}
                onDragGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }}
                onClick={e => {
                    if (e.isDouble) {
                        const inputTarget = e.inputTarget as HTMLElement;
                        const selectableElements = selectoRef.current!.getSelectableElements();

                        if (selectableElements.includes(inputTarget)) {
                            selectoRef.current!.setSelectedTargets([inputTarget]);
                            setTargets([inputTarget]);
                        }
                    }
                }}
            ></Moveable>
            <Selecto
                ref={selectoRef}
                dragContainer={window}
                selectableTargets={[".selecto-area .cube"]}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={["shift"]}
                ratio={0}
                onDragStart={e => {
                    const moveable = moveableRef.current!;
                    const target = e.inputEvent.target;
                    if (
                        moveable.isMoveableElement(target)
                        || targets.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }}
                onSelectEnd={e => {
                    const moveable = moveableRef.current!;
                    let selected = e.selected;

                    // excludes child elements.
                    selected = selected.filter(target => {
                        return selected.every(target2 => {
                            return target === target2 || !target2.contains(target);
                        });
                    });

                    const result = diff(e.startSelected, selected);

                    e.currentTarget.setSelectedTargets(selected);


                    if (!result.added.length && !result.removed.length) {
                        return;
                    }
                    if (e.isDragStartEnd) {
                        e.inputEvent.preventDefault();

                        moveable.waitToChangeTarget().then(() => {
                            moveable.dragStart(e.inputEvent);
                        });
                    }
                    setTargets(selected);
                }}
            ></Selecto>
            <div className="elements selecto-area">
                {cubes.map(i => {
                    if (i === 2) {
                        return <div className="cube" key={i} style={{
                            width: "100px",
                            height: "50px",
                        }}>
                            {i}
                            <div className="cube" key={i}>{i}</div>
                        </div>;
                    }
                    return <div className="cube" key={i}>{i}</div>;
                })}
            </div>
            <div className="empty elements"></div>
        </div>
    </div>;
}
`})))()}var Tt;function Et(){return(Et=t((()=>{Tt=`import Moveable from "lit-moveable";
import InfiniteViewer from "lit-infinite-viewer";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    viewerRef: Ref<InfiniteViewer> = createRef(null);
    scrollOptions: any = {
        container: () => this.viewerRef.value!.getContainer(),
        threshold: 20,
        getScrollPosition: () => {
            return [
                this.viewerRef.value!.getScrollLeft({ absolute: true }),
                this.viewerRef.value!.getScrollTop({ absolute: true }),
            ];
        }
    };
    render() {
        return html \`<div class="container">
    <button
        class="button"
        @click=\${this.onClick}
        style="position: absolute;top: 10px;right: 10px;z-index: 1;"
    >Scroll Center</button>
    <lit-infinite-viewer
        className="infinite-viewer"
        \${ref(this.viewerRef)}
    >
        <div
            class="viewport"
            style="width: 400px;height: 400px;border: 1px solid #ccc;"
        >
            <div class="target">Target</div>
            <lit-moveable
                .scrollable=\${true}
                .scrollOptions=\${this.scrollOptions}
                .target=\${".target"}
                .litDraggable=\${true}
                .resizable=\${true}
                .rotatable=\${true}
                @litRender=\${this.onRender}
                @litScroll=\${this.onScroll}
            ></lit-moveable>
        </div>
    </lit-infinite-viewer>
</div>\`;
    }
    firstUpdated() {
        setTimeout(() => {
            this.viewerRef.value!.scrollCenter();
        }, 100);
    }
    onClick() {
        this.viewerRef.value!.scrollCenter();
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
    onScroll({ direction }) {
        this.viewerRef.value!.scrollBy(direction[0] * 10, direction[1] * 10);
    }
}`})))()}var Dt;function Ot(){return(Ot=t((()=>{Dt=`import Selecto from "lit-selecto";
import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    targets: Array<SVGElement | HTMLElement> = [];
    moveableRef: Ref<Moveable> = createRef(null);
    selectoRef: Ref<Selecto> = createRef(null);
    cubes: any = [];
    constructor() {
        super();
        for (let i = 0; i < 30; ++i) {
            this.cubes.push(i);
        }
    }
    render() {
        return html \`<div class="root">
    <div class="container">
        <lit-moveable
            \${ref(this.moveableRef)}
            .litDraggable=\${true}
            .target=\${this.targets}
            @litClickGroup=\${this.onClickGroup}
            @litDrag=\${this.onDrag}
            @litDragGroup=\${this.onDragGroup}
        ></lit-moveable>
        <lit-selecto
            \${ref(this.selectoRef)}
            .dragContainer=\${window}
            .selectableTargets=\${[".selecto-area .cube"]}
            .hitRate=\${0}
            .selectByClick=\${true}
            .selectFromInside=\${false}
            .toggleContinueSelect=\${["shift"]}
            .ratio=\${0}
            @litDragStart=\${this.onDragStart}
            @litSelectEnd=\${this.onSelectEnd}
        ></lit-selecto>
        <div class="elements selecto-area">\${repeat(
            this.cubes,
            i => i,
            i => html \`<div class="cube"></div>\`
        )}</div>
        <div class="empty elements"></div>
    </div>
</div>\`;
    }
    onClickGroup(e) {
        this.selectoRef.value!.clickTarget(e.inputEvent, e.inputTarget);
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onDragGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
    onDragStart(e) {
        const moveable = this.moveableRef.value!;
        const target = e.inputEvent.target;
        if (moveable.isMoveableElement(target)
            || this.targets.some(t => t === target || t.contains(target))
        ) {
            e.stop();
        }
    }
    onSelectEnd(e) {
        const moveable = this.moveableRef.value!;
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            moveable.waitToChangeTarget().then(() => {
                moveable.dragStart(e.inputEvent);
            });
        }
        this.targets = e.selected;
    }
}`})))()}var kt;function At(){return(At=t((()=>{kt=`import { deepFlat } from "@daybrush/utils";
import Selecto from "lit-selecto";
import Moveable, { MoveableTargetGroupsType } from "lit-moveable";
import { GroupManager, TargetList } from "@moveable/helper";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("lit-app")
export default class App extends LitElement {
    groupManager: GroupManager = new GroupManager([]);
    @state()
    targets: MoveableTargetGroupsType = [];
    moveableRef: Ref<Moveable> = createRef(null);
    selectoRef: Ref<Selecto> = createRef(null);
    cubes: any = [];
    constructor() {
        super();
        this.groupManager = new GroupManager([]);
        for (let i = 0; i < 30; ++i) {
            this.cubes.push(i);
        }
    }
    render() {
        return html \`<div class="root">
    <div class="container">
        <button @click=\${this.onClick}>Group</button>
        &nbsp;
        <button @click=\${this.onClick$0}>Ungroup</button>
        <lit-moveable
            \${ref(this.moveableRef)}
            .litDraggable=\${true}
            .rotatable=\${true}
            .scalable=\${true}
            .target=\${this.targets}
            @litDrag=\${this.onDrag}
            @litRenderGroup=\${this.onRenderGroup}
            @litClickGroup=\${this.onClickGroup}
        ></lit-moveable>
        <lit-selecto
            \${ref(this.selectoRef)}
            .dragContainer=\${window}
            .selectableTargets=\${[".selecto-area .cube"]}
            .hitRate=\${0}
            .selectByClick=\${true}
            .selectFromInside=\${false}
            .toggleContinueSelect=\${["shift"]}
            .ratio=\${0}
            @litDragStart=\${this.onDragStart}
            @litSelect=\${this.onSelect}
            @litSelectEnd=\${this.onSelectEnd}
        ></lit-selecto>
        <div class="elements selecto-area">\${repeat(
            this.cubes,
            i => i,
            i => html \`<div class="cube">\${i}</div>\`
        )}</div>
        <div class="empty elements"></div>
    </div>
</div>\`;
    }
    firstUpdated() {
        const elements = this.selectoRef.value!.getSelectableElements();
        this.groupManager.set([], elements);
    }
    setSelectedTargets(nextTargetes: MoveableTargetGroupsType) {
        this.selectoRef.value!.setSelectedTargets(deepFlat(nextTargetes));
        this.targets = nextTargetes;
    }
    onClick() {
        const nextGroup = this.groupManager.group(this.targets, true);
        if (nextGroup) {
            this.targets = nextGroup;
        }
    }
    onClick$0() {
        const nextGroup = this.groupManager.ungroup(this.targets);
        if (nextGroup) {
            this.targets = nextGroup;
        }
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onRenderGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    }
    onClickGroup(e) {
        if (!e.moveableTarget) {
            this.setSelectedTargets([]);
            return;
        }
        if (e.isDouble) {
            const childs = this.groupManager.selectSubChilds(
                this.targets,
                e.moveableTarget
            );
            this.setSelectedTargets(childs.targets());
            return;
        }
        if (e.isTrusted) {
            this.selectoRef.value!.clickTarget(
                e.inputEvent,
                e.moveableTarget
            );
        }
    }
    onDragStart(e) {
        const moveable = this.moveableRef.value!;
        const target = e.inputEvent.target;
        const flatted = deepFlat(this.targets);
        if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
            || flatted.some(t => t === target || t.contains(target))
        ) {
            e.stop();
        }
        e.data.startTargets = this.targets;
    }
    onSelect(e) {
        const { startAdded, startRemoved, isDragStartEnd } = e;
        if (isDragStartEnd) {
            return;
        }
        const nextChilds = this.groupManager.selectSameDepthChilds(
            e.data.startTargets,
            startAdded,
            startRemoved
        );
        this.setSelectedTargets(nextChilds.targets());
    }
    onSelectEnd(e) {
        const { isDragStartEnd, isClick, added, removed, inputEvent } = e;
        const moveable = this.moveableRef.value!;
        if (isDragStartEnd) {
            inputEvent.preventDefault();
            moveable.waitToChangeTarget().then(() => {
                moveable.dragStart(inputEvent);
            });
        }
        let nextChilds: TargetList;
        if (isDragStartEnd || isClick) {
            nextChilds = this.groupManager.selectCompletedChilds(
                e.data.startTargets,
                added,
                removed
            );
        } else {
            nextChilds = this.groupManager.selectSameDepthChilds(
                e.data.startTargets,
                added,
                removed
            );
        }
        e.currentTarget.setSelectedTargets(nextChilds.flatten());
        this.setSelectedTargets(nextChilds.targets());
    }
}`})))()}var jt;function Mt(){return(Mt=t((()=>{jt=`import Selecto from "lit-selecto";
import Moveable from "lit-moveable";
import { diff } from "@egjs/children-differ";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    targets: Array<SVGElement | HTMLElement> = [];
    moveableRef: Ref<Moveable> = createRef(null);
    selectoRef: Ref<Selecto> = createRef(null);
    cubes: any = [];
    constructor() {
        super();
        for (let i = 0; i < 30; ++i) {
            this.cubes.push(i);
        }
    }
    render() {
        return html \`<div class="root">
    <div class="container">
        <lit-moveable
            \${ref(this.moveableRef)}
            .litDraggable=\${true}
            .target=\${this.targets}
            @litClickGroup=\${this.onClickGroup}
            @litDrag=\${this.onDrag}
            @litDragGroup=\${this.onDragGroup}
            @litClick=\${this.onClick}
        ></lit-moveable>
        <lit-selecto
            \${ref(this.selectoRef)}
            .dragContainer=\${window}
            .selectableTargets=\${[".selecto-area .cube"]}
            .hitRate=\${0}
            .selectByClick=\${true}
            .selectFromInside=\${false}
            .toggleContinueSelect=\${["shift"]}
            .ratio=\${0}
            @litDragStart=\${this.onDragStart}
            @litSelectEnd=\${this.onSelectEnd}
        ></lit-selecto>
        <div class="elements selecto-area">\${this.cubes.map(i => {
            if (i === 2) {
                return html \`<div
    class="cube"
    .key=\${i}
>\${i}</div>\`;
            }
            return html \`<div
    class="cube"
    .key=\${i}
>\${i}</div>\`;
        })}</div>
        <div class="empty elements"></div>
    </div>
</div>\`;
    }
    onClickGroup(e) {
        this.selectoRef.value!.clickTarget(e.inputEvent, e.inputTarget);
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onDragGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
    onClick(e) {
        if (e.isDouble) {
            const inputTarget = e.inputTarget as HTMLElement;
            const selectableElements = this.selectoRef.value!.getSelectableElements();
            if (selectableElements.includes(inputTarget)) {
                this.selectoRef.value!.setSelectedTargets([inputTarget]);
                this.targets = [inputTarget];
            }
        }
    }
    onDragStart(e) {
        const moveable = this.moveableRef.value!;
        const target = e.inputEvent.target;
        if (moveable.isMoveableElement(target)
            || this.targets.some(t => t === target || t.contains(target))
        ) {
            e.stop();
        }
    }
    onSelectEnd(e) {
        const moveable = this.moveableRef.value!;
        let selected = e.selected;
        selected = selected.filter(target => {
            return selected.every(target2 => {
                return target === target2 || !target2.contains(target);
            });
        });
        const result = diff(e.startSelected, selected);
        e.currentTarget.setSelectedTargets(selected);
        if (!result.added.length && !result.removed.length) {
            return;
        }
        if (e.isDragStartEnd) {
            e.inputEvent.preventDefault();
            moveable.waitToChangeTarget().then(() => {
                moveable.dragStart(e.inputEvent);
            });
        }
        this.targets = selected;
    }
}`})))()}var Nt;function Pt(){return(Pt=t((()=>{Nt=`<div class="container">
    <button
        class="button"
        style="position: absolute;top: 10px;right: 10px;z-index: 1;"
        data-croffle-ref="element$0"
    >Scroll Center</button>
    <div data-croffle-ref="viewerRef">
        <div
            class="viewport"
            style="width: 400px;height: 400px;border: 1px solid #ccc;"
            data-croffle-ref="element$1"
        >
            <div class="target">Target</div>
        </div>
    </div>
</div>`})))()}var Ft;function It(){return(It=t((()=>{Ft=`import Moveable from "moveable";
import InfiniteViewer from "infinite-viewer";

let viewerRef = null;
const scrollOptions = {
    container: () => viewerRef.getContainer(),
    threshold: 20,
    getScrollPosition: () => {
        return [
            viewerRef.getScrollLeft({ absolute: true }),
            viewerRef.getScrollTop({ absolute: true }),
        ];
    }
};
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
viewerRef = new InfiniteViewer(
    document.querySelector(\`[data-croffle-ref="viewerRef"]\`),
    { className: "infinite-viewer" }
);
const moveable$0 = new Moveable(element$1, {
    scrollable: true,
    scrollOptions: scrollOptions,
    target: ".target",
    draggable: true,
    resizable: true,
    rotatable: true
});
element$0.addEventListener("click", () => {
    viewerRef.scrollCenter();
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});
moveable$0.on("scroll", ({ direction }) => {
    viewerRef.scrollBy(direction[0] * 10, direction[1] * 10);
});
setTimeout(() => {
    viewerRef.scrollCenter();
}, 100);`})))()}var Lt;function Rt(){return(Rt=t((()=>{Lt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div data-croffle-ref="selectoRef"></div>
        <div
            class="elements selecto-area"
            data-croffle-ref="element$1"
        ></div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var zt;function Bt(){return(Bt=t((()=>{zt=`import Selecto from "selecto";
import Moveable from "moveable";

let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
element$1.innerHTML = cubes.map(i => {
    return \`<div class="cube"></div>\${;
}).join("\\n");
moveableRef = new Moveable(element$0, { draggable: true, target: targets });
selectoRef = new Selecto({
    container: document.querySelector(\`[data-croffle-ref="selectoRef"]\`),
    dragContainer: window,
    selectableTargets: [".selecto-area .cube"],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: false,
    toggleContinueSelect: ["shift"],
    ratio: 0
});
function setTargets(nextTargets) {
    targets = nextTargets;
    moveableRef.target = targets;
}
moveableRef.on("clickGroup", e => {
    selectoRef.clickTarget(e.inputEvent, e.inputTarget);
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveableRef.on("dragGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
selectoRef.on("dragStart", e => {
    const moveable = moveableRef;
    const target = e.inputEvent.target;
    if (moveable.isMoveableElement(target)
        || targets.some(t => t === target || t.contains(target))
    ) {
        e.stop();
    }
});
selectoRef.on("selectEnd", e => {
    const moveable = moveableRef;
    if (e.isDragStart) {
        e.inputEvent.preventDefault();
        moveable.waitToChangeTarget().then(() => {
            moveable.dragStart(e.inputEvent);
        });
    }
    setTargets(e.selected);
});`})))()}var Vt;function Ht(){return(Ht=t((()=>{Vt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <button data-croffle-ref="element$1">Group</button>
        &nbsp;
        <button data-croffle-ref="element$2">Ungroup</button>
        <div data-croffle-ref="selectoRef"></div>
        <div
            class="elements selecto-area"
            data-croffle-ref="element$3"
        ></div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var Ut;function Wt(){return(Wt=t((()=>{Ut=`import { deepFlat } from "@daybrush/utils";
import Selecto from "selecto";
import Moveable, { MoveableTargetGroupsType } from "moveable";
import { GroupManager, TargetList } from "@moveable/helper";

let groupManager = new GroupManager([]);
let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
const setSelectedTargets = (nextTargetes) => {
    selectoRef.setSelectedTargets(deepFlat(nextTargetes));
    setTargets(nextTargetes);
};
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
const element$2 = document.querySelector(\`[data-croffle-ref="element$2"]\`);
const element$3 = document.querySelector(\`[data-croffle-ref="element$3"]\`);
element$3.innerHTML = cubes.map(i => {
    return \`<div class="cube">\${i}</div>\`;
}).join("\\n");
moveableRef = new Moveable(element$0, {
    draggable: true,
    rotatable: true,
    scalable: true,
    target: targets
});
selectoRef = new Selecto({
    container: document.querySelector(\`[data-croffle-ref="selectoRef"]\`),
    dragContainer: window,
    selectableTargets: [".selecto-area .cube"],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: false,
    toggleContinueSelect: ["shift"],
    ratio: 0
});
function setTargets(nextTargets) {
    targets = nextTargets;
    moveableRef.target = targets;
}
element$1.addEventListener("click", () => {
    const nextGroup = groupManager.group(targets, true);
    if (nextGroup) {
        setTargets(nextGroup);
    }
});
element$2.addEventListener("click", () => {
    const nextGroup = groupManager.ungroup(targets);
    if (nextGroup) {
        setTargets(nextGroup);
    }
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveableRef.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});
moveableRef.on("clickGroup", e => {
    if (!e.moveableTarget) {
        setSelectedTargets([]);
        return;
    }
    if (e.isDouble) {
        const childs = groupManager.selectSubChilds(
            targets,
            e.moveableTarget
        );
        setSelectedTargets(childs.targets());
        return;
    }
    if (e.isTrusted) {
        selectoRef.clickTarget(e.inputEvent, e.moveableTarget);
    }
});
selectoRef.on("dragStart", e => {
    const moveable = moveableRef;
    const target = e.inputEvent.target;
    const flatted = deepFlat(targets);
    if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
        || flatted.some(t => t === target || t.contains(target))
    ) {
        e.stop();
    }
    e.data.startTargets = targets;
});
selectoRef.on("select", e => {
    const { startAdded, startRemoved, isDragStartEnd } = e;
    if (isDragStartEnd) {
        return;
    }
    const nextChilds = groupManager.selectSameDepthChilds(
        e.data.startTargets,
        startAdded,
        startRemoved
    );
    setSelectedTargets(nextChilds.targets());
});
selectoRef.on("selectEnd", e => {
    const { isDragStartEnd, isClick, added, removed, inputEvent } = e;
    const moveable = moveableRef;
    if (isDragStartEnd) {
        inputEvent.preventDefault();
        moveable.waitToChangeTarget().then(() => {
            moveable.dragStart(inputEvent);
        });
    }
    let nextChilds;
    if (isDragStartEnd || isClick) {
        nextChilds = groupManager.selectCompletedChilds(
            e.data.startTargets,
            added,
            removed
        );
    } else {
        nextChilds = groupManager.selectSameDepthChilds(
            e.data.startTargets,
            added,
            removed
        );
    }
    e.currentTarget.setSelectedTargets(nextChilds.flatten());
    setSelectedTargets(nextChilds.targets());
});
const elements = selectoRef.getSelectableElements();
groupManager.set([], elements);`})))()}var Gt;function Kt(){return(Kt=t((()=>{Gt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div data-croffle-ref="selectoRef"></div>
        <div class="elements selecto-area">{this.cubes.map(i => {
                    if (i === 2) {
                        return <div class="cube" key={i} style="width: 100px;height: 50px;">
                                        {i}
                                        <div class="cube" key={i}>{i}</div>
                                    </div>;
                    }
                    return <div class="cube" key={i}>{i}</div>;
                })}
        </div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var qt;function Jt(){return(Jt=t((()=>{qt=`import Selecto from "selecto";
import Moveable from "moveable";
import { diff } from "@egjs/children-differ";

let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
moveableRef = new Moveable(element$0, { draggable: true, target: targets });
selectoRef = new Selecto({
    container: document.querySelector(\`[data-croffle-ref="selectoRef"]\`),
    dragContainer: window,
    selectableTargets: [".selecto-area .cube"],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: false,
    toggleContinueSelect: ["shift"],
    ratio: 0
});
function setTargets(nextTargets) {
    targets = nextTargets;
    moveableRef.target = targets;
}
moveableRef.on("clickGroup", e => {
    selectoRef.clickTarget(e.inputEvent, e.inputTarget);
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveableRef.on("dragGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
moveableRef.on("click", e => {
    if (e.isDouble) {
        const inputTarget = e.inputTarget;
        const selectableElements = selectoRef.getSelectableElements();
        if (selectableElements.includes(inputTarget)) {
            selectoRef.setSelectedTargets([inputTarget]);
            setTargets([inputTarget]);
        }
    }
});
selectoRef.on("dragStart", e => {
    const moveable = moveableRef;
    const target = e.inputEvent.target;
    if (moveable.isMoveableElement(target)
        || targets.some(t => t === target || t.contains(target))
    ) {
        e.stop();
    }
});
selectoRef.on("selectEnd", e => {
    const moveable = moveableRef;
    let selected = e.selected;
    selected = selected.filter(target => {
        return selected.every(target2 => {
            return target === target2 || !target2.contains(target);
        });
    });
    const result = diff(e.startSelected, selected);
    e.currentTarget.setSelectedTargets(selected);
    if (!result.added.length && !result.removed.length) {
        return;
    }
    if (e.isDragStartEnd) {
        e.inputEvent.preventDefault();
        moveable.waitToChangeTarget().then(() => {
            moveable.dragStart(e.inputEvent);
        });
    }
    setTargets(selected);
});`})))()}var Yt;function Xt(){return(Xt=t((()=>{Yt=`<script>
import Moveable from "svelte-moveable";
import InfiniteViewer from "svelte-infinite-viewer";
import { onMount } from "svelte";

let viewerRef = null;
const scrollOptions = {
    container: () => viewerRef.getContainer(),
    threshold: 20,
    getScrollPosition: () => {
        return [
            viewerRef.getScrollLeft({ absolute: true }),
            viewerRef.getScrollTop({ absolute: true }),
        ];
    }
};
onMount(() => {
    setTimeout(() => {
        viewerRef.scrollCenter();
    }, 100);
});
<\/script>
<div class="container">
    <button
        class="button"
        on:click={() => {
            viewerRef.scrollCenter();
        }}
        style="position: absolute;top: 10px;right: 10px;z-index: 1;"
    >Scroll Center</button>
    <InfiniteViewer
        className="infinite-viewer"
        bind:this={viewerRef}
    >
        <div
            class="viewport"
            style="width: 400px;height: 400px;border: 1px solid #ccc;"
        >
            <div class="target">Target</div>
            <Moveable
                scrollable={true}
                scrollOptions={scrollOptions}
                target={".target"}
                draggable={true}
                resizable={true}
                rotatable={true}
                on:render={({ detail: e }) => {
                    e.target.style.cssText += e.cssText;
                }}
                on:scroll={({ detail: { direction } }) => {
                    viewerRef.scrollBy(direction[0] * 10, direction[1] * 10);
                }}
            ></Moveable>
        </div>
    </InfiniteViewer>
</div>`})))()}var Zt;function Qt(){return(Qt=t((()=>{Zt=`<script>
import Selecto from "svelte-selecto";
import Moveable from "svelte-moveable";

let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
<\/script>
<div class="root">
    <div class="container">
        <Moveable
            bind:this={moveableRef}
            draggable={true}
            target={targets}
            on:clickGroup={({ detail: e }) => {
                selectoRef.clickTarget(e.inputEvent, e.inputTarget);
            }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:dragGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
        ></Moveable>
        <Selecto
            bind:this={selectoRef}
            dragContainer={window}
            selectableTargets={[".selecto-area .cube"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            ratio={0}
            on:dragStart={({ detail: e }) => {
                const moveable = moveableRef;
                const target = e.inputEvent.target;
                if (moveable.isMoveableElement(target)
                    || targets.some(t => t === target || t.contains(target))
                ) {
                    e.stop();
                }
            }}
            on:selectEnd={({ detail: e }) => {
                const moveable = moveableRef;
                if (e.isDragStart) {
                    e.inputEvent.preventDefault();
                    moveable.waitToChangeTarget().then(() => {
                        moveable.dragStart(e.inputEvent);
                    });
                }
                targets = e.selected;
            }}
        ></Selecto>
        <div class="elements selecto-area">
            {#each cubes as i (i)}
                <div class="cube"></div>
            {/each}
        </div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var $t;function en(){return(en=t((()=>{$t=`<script>
import { deepFlat } from "@daybrush/utils";
import { useKeycon } from "svelte-keycon";
import Selecto from "svelte-selecto";
import Moveable, { MoveableTargetGroupsType } from "svelte-moveable";
import { GroupManager, TargetList } from "@moveable/helper";
import { onMount } from "svelte";

const { isKeydown: isCommand } = useKeycon({ keys: "meta" });
const { isKeydown: isShift } = useKeycon({ keys: "shift" });
let groupManagerRef = undefiend;
let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
const setSelectedTargets = (nextTargetes) => {
    selectoRef.setSelectedTargets(deepFlat(nextTargetes));
    targets = nextTargetes;
};
onMount(() => {
    const elements = selectoRef.getSelectableElements();
    groupManagerRef = new GroupManager([
        [[elements[0], elements[1]], elements[2]],
        [elements[5], elements[6], elements[7]],
    ], elements);
});
<\/script>
<div class="root">
    <div class="container">
        <Moveable
            bind:this={moveableRef}
            draggable={true}
            rotatable={true}
            scalable={true}
            target={targets}
            on:clickGroup={({ detail: e }) => {
                if (!e.moveableTarget) {
                    setSelectedTargets([]);
                    return;
                }
                if (e.isDouble) {
                    const childs = groupManagerRef.selectSubChilds(
                        targets,
                        e.moveableTarget
                    );
                    setSelectedTargets(childs.targets());
                    return;
                }
                if (e.isTrusted) {
                    selectoRef.clickTarget(e.inputEvent, e.moveableTarget);
                }
            }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}
        ></Moveable>
        <Selecto
            bind:this={selectoRef}
            dragContainer={window}
            selectableTargets={[".selecto-area .cube"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            ratio={0}
            on:dragStart={({ detail: e }) => {
                const moveable = moveableRef;
                const target = e.inputEvent.target;
                const flatted = targets.flat(3);
                if (moveable.isMoveableElement(target)
                    || flatted.some(t => t === target || t.contains(target))
                ) {
                    e.stop();
                }
            }}
            on:selectEnd={({ detail: e }) => {
                const {
                    isDragStartEnd,
                    isClick,
                    added,
                    removed,
                    inputEvent,
                } = e;
                const moveable = moveableRef;
                if (isDragStartEnd) {
                    inputEvent.preventDefault();
                    moveable.waitToChangeTarget().then(() => {
                        moveable.dragStart(inputEvent);
                    });
                }
                const groupManager = groupManagerRef;
                let nextChilds;
                if (isDragStartEnd || isClick) {
                    if ($isCommand) {
                        nextChilds = groupManager.selectSingleChilds(
                            targets,
                            added,
                            removed
                        );
                    } else {
                        nextChilds = groupManager.selectCompletedChilds(
                            targets,
                            added,
                            removed,
                            $isShift
                        );
                    }
                } else {
                    nextChilds = groupManager.selectSameDepthChilds(
                        targets,
                        added,
                        removed
                    );
                }
                e.currentTarget.setSelectedTargets(nextChilds.flatten());
                setSelectedTargets(nextChilds.targets());
            }}
        ></Selecto>
        <p>[[0, 1], 2] is group</p>
        <p>[5, 6, 7] is group</p>
        <div class="elements selecto-area">
            {#each cubes as i (i)}
                <div class="cube">{i}</div>
            {/each}
        </div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var tn;function nn(){return(nn=t((()=>{tn=`<script>
import { deepFlat } from "@daybrush/utils";
import Selecto from "svelte-selecto";
import Moveable, { MoveableTargetGroupsType } from "svelte-moveable";
import { GroupManager, TargetList } from "@moveable/helper";
import { onMount } from "svelte";

const groupManager = new GroupManager([]);
let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
const setSelectedTargets = (nextTargetes) => {
    selectoRef.setSelectedTargets(deepFlat(nextTargetes));
    targets = nextTargetes;
};
onMount(() => {
    const elements = selectoRef.getSelectableElements();
    groupManager.set([], elements);
});
<\/script>
<div class="root">
    <div class="container">
        <button on:click={() => {
            const nextGroup = groupManager.group(targets, true);
            if (nextGroup) {
                targets = nextGroup;
            }
        }}>Group</button>
        &nbsp;
        <button on:click={() => {
            const nextGroup = groupManager.ungroup(targets);
            if (nextGroup) {
                targets = nextGroup;
            }
        }}>Ungroup</button>
        <Moveable
            bind:this={moveableRef}
            draggable={true}
            rotatable={true}
            scalable={true}
            target={targets}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}
            on:clickGroup={({ detail: e }) => {
                if (!e.moveableTarget) {
                    setSelectedTargets([]);
                    return;
                }
                if (e.isDouble) {
                    const childs = groupManager.selectSubChilds(
                        targets,
                        e.moveableTarget
                    );
                    setSelectedTargets(childs.targets());
                    return;
                }
                if (e.isTrusted) {
                    selectoRef.clickTarget(e.inputEvent, e.moveableTarget);
                }
            }}
        ></Moveable>
        <Selecto
            bind:this={selectoRef}
            dragContainer={window}
            selectableTargets={[".selecto-area .cube"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            ratio={0}
            on:dragStart={({ detail: e }) => {
                const moveable = moveableRef;
                const target = e.inputEvent.target;
                const flatted = deepFlat(targets);
                if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
                    || flatted.some(t => t === target || t.contains(target))
                ) {
                    e.stop();
                }
                e.data.startTargets = targets;
            }}
            on:select={({ detail: e }) => {
                const { startAdded, startRemoved, isDragStartEnd } = e;
                if (isDragStartEnd) {
                    return;
                }
                const nextChilds = groupManager.selectSameDepthChilds(
                    e.data.startTargets,
                    startAdded,
                    startRemoved
                );
                setSelectedTargets(nextChilds.targets());
            }}
            on:selectEnd={({ detail: e }) => {
                const {
                    isDragStartEnd,
                    isClick,
                    added,
                    removed,
                    inputEvent,
                } = e;
                const moveable = moveableRef;
                if (isDragStartEnd) {
                    inputEvent.preventDefault();
                    moveable.waitToChangeTarget().then(() => {
                        moveable.dragStart(inputEvent);
                    });
                }
                let nextChilds;
                if (isDragStartEnd || isClick) {
                    nextChilds = groupManager.selectCompletedChilds(
                        e.data.startTargets,
                        added,
                        removed
                    );
                } else {
                    nextChilds = groupManager.selectSameDepthChilds(
                        e.data.startTargets,
                        added,
                        removed
                    );
                }
                e.currentTarget.setSelectedTargets(nextChilds.flatten());
                setSelectedTargets(nextChilds.targets());
            }}
        ></Selecto>
        <div class="elements selecto-area">
            {#each cubes as i (i)}
                <div class="cube">{i}</div>
            {/each}
        </div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var rn;function an(){return(an=t((()=>{rn=`<script>
import Selecto from "svelte-selecto";
import Moveable from "svelte-moveable";
import { diff } from "@egjs/children-differ";

let targets = [];
let moveableRef = null;
let selectoRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
<\/script>
<div class="root">
    <div class="container">
        <Moveable
            bind:this={moveableRef}
            draggable={true}
            target={targets}
            on:clickGroup={({ detail: e }) => {
                selectoRef.clickTarget(e.inputEvent, e.inputTarget);
            }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:dragGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
            on:click={({ detail: e }) => {
                if (e.isDouble) {
                    const inputTarget = e.inputTarget;
                    const selectableElements = selectoRef.getSelectableElements();
                    if (selectableElements.includes(inputTarget)) {
                        selectoRef.setSelectedTargets([inputTarget]);
                        targets = [inputTarget];
                    }
                }
            }}
        ></Moveable>
        <Selecto
            bind:this={selectoRef}
            dragContainer={window}
            selectableTargets={[".selecto-area .cube"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={false}
            toggleContinueSelect={["shift"]}
            ratio={0}
            on:dragStart={({ detail: e }) => {
                const moveable = moveableRef;
                const target = e.inputEvent.target;
                if (moveable.isMoveableElement(target)
                    || targets.some(t => t === target || t.contains(target))
                ) {
                    e.stop();
                }
            }}
            on:selectEnd={({ detail: e }) => {
                const moveable = moveableRef;
                let selected = e.selected;
                selected = selected.filter(target => {
                    return selected.every(target2 => {
                        return target === target2 || !target2.contains(target);
                    });
                });
                const result = diff(e.startSelected, selected);
                e.currentTarget.setSelectedTargets(selected);
                if (!result.added.length && !result.removed.length) {
                    return;
                }
                if (e.isDragStartEnd) {
                    e.inputEvent.preventDefault();
                    moveable.waitToChangeTarget().then(() => {
                        moveable.dragStart(e.inputEvent);
                    });
                }
                targets = selected;
            }}
        ></Selecto>
        <div class="elements selecto-area">{cubes.map(i => {
                    if (i === 2) {
                        return <div class="cube" key={i} style="width: 100px;height: 50px;">
                                        {i}
                                        <div class="cube" key={i}>{i}</div>
                                    </div>;
                    }
                    return <div class="cube" key={i}>{i}</div>;
                })}
        </div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var on;function sn(){return(sn=t((()=>{on=`<script>
import Moveable from "vue3-moveable";
import InfiniteViewer from "vue3-infinite-viewer";
import { ref, onMounted } from "vue";

export default {
    components: { InfiniteViewer, Moveable },
    setup() {
        const viewerRef = ref(null);
        const scrollOptions = {
            container: () => viewerRef.value.getContainer(),
            threshold: 20,
            getScrollPosition: () => {
                return [
                    viewerRef.value.getScrollLeft({ absolute: true }),
                    viewerRef.value.getScrollTop({ absolute: true }),
                ];
            }
        };
        const onClick = () => {
            viewerRef.value.scrollCenter();
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        const onScroll = ({ direction }) => {
            viewerRef.value.scrollBy(direction[0] * 10, direction[1] * 10);
        };
        onMounted(() => {
            setTimeout(() => {
                viewerRef.value.scrollCenter();
            }, 100);
        });
        return { onClick, viewerRef, scrollOptions, onRender, onScroll };
    }
};
<\/script>
<template>
    <div class="container">
        <button
            class="button"
            @click="onClick"
            style="position: absolute;top: 10px;right: 10px;z-index: 1;"
        >Scroll Center</button>
        <InfiniteViewer
            className="infinite-viewer"
            ref="viewerRef"
        >
            <div
                class="viewport"
                style="width: 400px;height: 400px;border: 1px solid #ccc;"
            >
                <div class="target">Target</div>
                <Moveable
                    :scrollable="true"
                    :scrollOptions="scrollOptions"
                    :target="'.target'"
                    :draggable="true"
                    :resizable="true"
                    :rotatable="true"
                    @render="onRender"
                    @scroll="onScroll"
                ></Moveable>
            </div>
        </InfiniteViewer>
    </div>
</template>`})))()}var cn;function ln(){return(ln=t((()=>{cn=`<script>
import Selecto from "vue3-selecto";
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable, Selecto },
    setup() {
        const targets = ref([]);
        const moveableRef = ref(null);
        const selectoRef = ref(null);
        const cubes = [];
        for (let i = 0; i < 30; ++i) {
            cubes.push(i);
        }
        const onClickGroup = e => {
            selectoRef.value.clickTarget(e.inputEvent, e.inputTarget);
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onDragGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        const onDragStart = e => {
            const moveable = moveableRef.value;
            const target = e.inputEvent.target;
            if (moveable.isMoveableElement(target)
                || targets.value.some(t => t === target || t.contains(target))
            ) {
                e.stop();
            }
        };
        const onSelectEnd = e => {
            const moveable = moveableRef.value;
            if (e.isDragStart) {
                e.inputEvent.preventDefault();
                moveable.waitToChangeTarget().then(() => {
                    moveable.dragStart(e.inputEvent);
                });
            }
            targets.value = e.selected;
        };
        return {
            moveableRef,
            targets,
            onClickGroup,
            onDrag,
            onDragGroup,
            selectoRef,
            window,
            onDragStart,
            onSelectEnd,
            cubes
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <Moveable
                ref="moveableRef"
                :draggable="true"
                :target="targets"
                @clickGroup="onClickGroup"
                @drag="onDrag"
                @dragGroup="onDragGroup"
            ></Moveable>
            <Selecto
                ref="selectoRef"
                :dragContainer="window"
                :selectableTargets="['.selecto-area .cube']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="false"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="onDragStart"
                @selectEnd="onSelectEnd"
            ></Selecto>
            <div class="elements selecto-area">
                <div
                    class="cube"
                    :key="i"
                    v-for="i in cubes"
                ></div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>`})))()}var un;function dn(){return(dn=t((()=>{un=`<script>
import { deepFlat } from "@daybrush/utils";
import { useKeycon } from "vue-keycon";
import Selecto from "vue3-selecto";
import Moveable, { MoveableTargetGroupsType } from "vue3-moveable";
import { GroupManager, TargetList } from "@moveable/helper";
import { ref, onMounted } from "vue";

export default {
    components: { Moveable, Selecto },
    setup() {
        const { isKeydown: isCommand } = useKeycon({ keys: "meta" });
        const { isKeydown: isShift } = useKeycon({ keys: "shift" });
        const groupManagerRef = ref(undefiend);
        const targets = ref([]);
        const moveableRef = ref(null);
        const selectoRef = ref(null);
        const cubes = [];
        for (let i = 0; i < 30; ++i) {
            cubes.push(i);
        }
        const setSelectedTargets = (nextTargetes) => {
            selectoRef.value.setSelectedTargets(deepFlat(nextTargetes));
            targets.value = nextTargetes;
        };
        const onClickGroup = e => {
            if (!e.moveableTarget) {
                setSelectedTargets([]);
                return;
            }
            if (e.isDouble) {
                const childs = groupManagerRef.value.selectSubChilds(
                    targets.value,
                    e.moveableTarget
                );
                setSelectedTargets(childs.targets());
                return;
            }
            if (e.isTrusted) {
                selectoRef.value.clickTarget(e.inputEvent, e.moveableTarget);
            }
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        const onDragStart = e => {
            const moveable = moveableRef.value;
            const target = e.inputEvent.target;
            const flatted = targets.value.flat(3);
            if (moveable.isMoveableElement(target)
                || flatted.some(t => t === target || t.contains(target))
            ) {
                e.stop();
            }
        };
        const onSelectEnd = e => {
            const {
                isDragStartEnd,
                isClick,
                added,
                removed,
                inputEvent,
            } = e;
            const moveable = moveableRef.value;
            if (isDragStartEnd) {
                inputEvent.preventDefault();
                moveable.waitToChangeTarget().then(() => {
                    moveable.dragStart(inputEvent);
                });
            }
            const groupManager = groupManagerRef.value;
            let nextChilds;
            if (isDragStartEnd || isClick) {
                if (isCommand.value) {
                    nextChilds = groupManager.selectSingleChilds(
                        targets.value,
                        added,
                        removed
                    );
                } else {
                    nextChilds = groupManager.selectCompletedChilds(
                        targets.value,
                        added,
                        removed,
                        isShift.value
                    );
                }
            } else {
                nextChilds = groupManager.selectSameDepthChilds(
                    targets.value,
                    added,
                    removed
                );
            }
            e.currentTarget.setSelectedTargets(nextChilds.flatten());
            setSelectedTargets(nextChilds.targets());
        };
        onMounted(() => {
            const elements = selectoRef.value.getSelectableElements();
            groupManagerRef.value = new GroupManager([
                [[elements[0], elements[1]], elements[2]],
                [elements[5], elements[6], elements[7]],
            ], elements);
        });
        return {
            moveableRef,
            targets,
            onClickGroup,
            onDrag,
            onRenderGroup,
            selectoRef,
            window,
            onDragStart,
            onSelectEnd,
            cubes
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <Moveable
                ref="moveableRef"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                :target="targets"
                @clickGroup="onClickGroup"
                @drag="onDrag"
                @renderGroup="onRenderGroup"
            ></Moveable>
            <Selecto
                ref="selectoRef"
                :dragContainer="window"
                :selectableTargets="['.selecto-area .cube']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="false"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="onDragStart"
                @selectEnd="onSelectEnd"
            ></Selecto>
            <p>[[0, 1], 2] is group</p>
            <p>[5, 6, 7] is group</p>
            <div class="elements selecto-area">
                <div
                    class="cube"
                    :key="i"
                    v-for="i in cubes"
                >{{i}}</div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>`})))()}var fn;function pn(){return(pn=t((()=>{fn=`<script>
import { deepFlat } from "@daybrush/utils";
import Selecto from "vue3-selecto";
import Moveable, { MoveableTargetGroupsType } from "vue3-moveable";
import { GroupManager, TargetList } from "@moveable/helper";
import { ref, onMounted } from "vue";

export default {
    components: { Moveable, Selecto },
    setup() {
        const groupManager = new GroupManager([]);
        const targets = ref([]);
        const moveableRef = ref(null);
        const selectoRef = ref(null);
        const cubes = [];
        for (let i = 0; i < 30; ++i) {
            cubes.push(i);
        }
        const setSelectedTargets = (nextTargetes) => {
            selectoRef.value.setSelectedTargets(deepFlat(nextTargetes));
            targets.value = nextTargetes;
        };
        const onClick = () => {
            const nextGroup = groupManager.group(targets.value, true);
            if (nextGroup) {
                targets.value = nextGroup;
            }
        };
        const onClick$0 = () => {
            const nextGroup = groupManager.ungroup(targets.value);
            if (nextGroup) {
                targets.value = nextGroup;
            }
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        const onClickGroup = e => {
            if (!e.moveableTarget) {
                setSelectedTargets([]);
                return;
            }
            if (e.isDouble) {
                const childs = groupManager.selectSubChilds(
                    targets.value,
                    e.moveableTarget
                );
                setSelectedTargets(childs.targets());
                return;
            }
            if (e.isTrusted) {
                selectoRef.value.clickTarget(e.inputEvent, e.moveableTarget);
            }
        };
        const onDragStart = e => {
            const moveable = moveableRef.value;
            const target = e.inputEvent.target;
            const flatted = deepFlat(targets.value);
            if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
                || flatted.some(t => t === target || t.contains(target))
            ) {
                e.stop();
            }
            e.data.startTargets = targets.value;
        };
        const onSelect = e => {
            const { startAdded, startRemoved, isDragStartEnd } = e;
            if (isDragStartEnd) {
                return;
            }
            const nextChilds = groupManager.selectSameDepthChilds(
                e.data.startTargets,
                startAdded,
                startRemoved
            );
            setSelectedTargets(nextChilds.targets());
        };
        const onSelectEnd = e => {
            const {
                isDragStartEnd,
                isClick,
                added,
                removed,
                inputEvent,
            } = e;
            const moveable = moveableRef.value;
            if (isDragStartEnd) {
                inputEvent.preventDefault();
                moveable.waitToChangeTarget().then(() => {
                    moveable.dragStart(inputEvent);
                });
            }
            let nextChilds;
            if (isDragStartEnd || isClick) {
                nextChilds = groupManager.selectCompletedChilds(
                    e.data.startTargets,
                    added,
                    removed
                );
            } else {
                nextChilds = groupManager.selectSameDepthChilds(
                    e.data.startTargets,
                    added,
                    removed
                );
            }
            e.currentTarget.setSelectedTargets(nextChilds.flatten());
            setSelectedTargets(nextChilds.targets());
        };
        onMounted(() => {
            const elements = selectoRef.value.getSelectableElements();
            groupManager.set([], elements);
        });
        return {
            onClick,
            onClick$0,
            moveableRef,
            targets,
            onDrag,
            onRenderGroup,
            onClickGroup,
            selectoRef,
            window,
            onDragStart,
            onSelect,
            onSelectEnd,
            cubes
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <button @click="onClick">Group</button>
            &nbsp;
            <button @click="onClick$0">Ungroup</button>
            <Moveable
                ref="moveableRef"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                :target="targets"
                @drag="onDrag"
                @renderGroup="onRenderGroup"
                @clickGroup="onClickGroup"
            ></Moveable>
            <Selecto
                ref="selectoRef"
                :dragContainer="window"
                :selectableTargets="['.selecto-area .cube']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="false"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="onDragStart"
                @select="onSelect"
                @selectEnd="onSelectEnd"
            ></Selecto>
            <div class="elements selecto-area">
                <div
                    class="cube"
                    :key="i"
                    v-for="i in cubes"
                >{{i}}</div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>`})))()}var mn;function hn(){return(hn=t((()=>{mn=`<script>
import Selecto from "vue3-selecto";
import Moveable from "vue3-moveable";
import { diff } from "@egjs/children-differ";
import { ref } from "vue";

export default {
    components: { Moveable, Selecto },
    setup() {
        const targets = ref([]);
        const moveableRef = ref(null);
        const selectoRef = ref(null);
        const cubes = [];
        for (let i = 0; i < 30; ++i) {
            cubes.push(i);
        }
        const onClickGroup = e => {
            selectoRef.value.clickTarget(e.inputEvent, e.inputTarget);
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onDragGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        const onClick = e => {
            if (e.isDouble) {
                const inputTarget = e.inputTarget;
                const selectableElements = selectoRef.value.getSelectableElements();
                if (selectableElements.includes(inputTarget)) {
                    selectoRef.value.setSelectedTargets([inputTarget]);
                    targets.value = [inputTarget];
                }
            }
        };
        const onDragStart = e => {
            const moveable = moveableRef.value;
            const target = e.inputEvent.target;
            if (moveable.isMoveableElement(target)
                || targets.value.some(t => t === target || t.contains(target))
            ) {
                e.stop();
            }
        };
        const onSelectEnd = e => {
            const moveable = moveableRef.value;
            let selected = e.selected;
            selected = selected.filter(target => {
                return selected.every(target2 => {
                    return target === target2 || !target2.contains(target);
                });
            });
            const result = diff(e.startSelected, selected);
            e.currentTarget.setSelectedTargets(selected);
            if (!result.added.length && !result.removed.length) {
                return;
            }
            if (e.isDragStartEnd) {
                e.inputEvent.preventDefault();
                moveable.waitToChangeTarget().then(() => {
                    moveable.dragStart(e.inputEvent);
                });
            }
            targets.value = selected;
        };
        return {
            moveableRef,
            targets,
            onClickGroup,
            onDrag,
            onDragGroup,
            onClick,
            selectoRef,
            window,
            onDragStart,
            onSelectEnd,
            cubes
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <Moveable
                ref="moveableRef"
                :draggable="true"
                :target="targets"
                @clickGroup="onClickGroup"
                @drag="onDrag"
                @dragGroup="onDragGroup"
                @click="onClick"
            ></Moveable>
            <Selecto
                ref="selectoRef"
                :dragContainer="window"
                :selectableTargets="['.selecto-area .cube']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="false"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="onDragStart"
                @selectEnd="onSelectEnd"
            ></Selecto>
            <div class="elements selecto-area">{{cubes.map(i => {
                    if (i === 2) {
                        return <div class="cube" key={i} style="width: 100px;height: 50px;">
                                            {i}
                                            <div class="cube" key={i}>{i}</div>
                                        </div>;
                    }
                    return <div class="cube" key={i}>{i}</div>;
                })}}
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>`})))()}var q,J,gn,Y,X,Z,Q,$,_n;function vn(){return(vn=t((()=>{Ye(),Qe(),st(),ut(),mt(),gt(),vt(),bt(),St(),wt(),Et(),Ot(),At(),Mt(),Pt(),It(),Rt(),Bt(),Ht(),Wt(),Kt(),Jt(),Xt(),Qt(),en(),nn(),an(),sn(),ln(),dn(),pn(),hn(),ie(),q=Object.assign({"./ReactInfiniteViewerApp.tsx":Ke,"./ReactSelectoApp.tsx":Xe,"./ReactSelectoMultipleGroupApp.tsx":at,"./ReactSelectoMultipleGroupUngroupApp.tsx":ct,"./ReactSelectoNestedGroupApp.tsx":dt}),J=Object.assign({"./ReactInfiniteViewerApp.tsx":ht,"./ReactSelectoApp.tsx":_t,"./ReactSelectoMultipleGroupApp.tsx":yt,"./ReactSelectoMultipleGroupUngroupApp.tsx":xt,"./ReactSelectoNestedGroupApp.tsx":Ct,"./lit/ReactInfiniteViewerApp/App.ts":Tt,"./lit/ReactSelectoApp/App.ts":Dt,"./lit/ReactSelectoMultipleGroupUngroupApp/App.ts":kt,"./lit/ReactSelectoNestedGroupApp/App.ts":jt,"./script/ReactInfiniteViewerApp/App.html":Nt,"./script/ReactInfiniteViewerApp/App.js":Ft,"./script/ReactSelectoApp/App.html":Lt,"./script/ReactSelectoApp/App.js":zt,"./script/ReactSelectoMultipleGroupUngroupApp/App.html":Vt,"./script/ReactSelectoMultipleGroupUngroupApp/App.js":Ut,"./script/ReactSelectoNestedGroupApp/App.html":Gt,"./script/ReactSelectoNestedGroupApp/App.js":qt,"./svelte/ReactInfiniteViewerApp/App.svelte":Yt,"./svelte/ReactSelectoApp/App.svelte":Zt,"./svelte/ReactSelectoMultipleGroupApp/App.svelte":$t,"./svelte/ReactSelectoMultipleGroupUngroupApp/App.svelte":tn,"./svelte/ReactSelectoNestedGroupApp/App.svelte":rn,"./vue3/ReactInfiniteViewerApp/App.vue":on,"./vue3/ReactSelectoApp/App.vue":cn,"./vue3/ReactSelectoMultipleGroupApp/App.vue":un,"./vue3/ReactSelectoMultipleGroupUngroupApp/App.vue":fn,"./vue3/ReactSelectoNestedGroupApp/App.vue":mn}),gn={title:`Combination with Other Components`},Y={name:`Use Selecto`,...k(Ze,{apps:q,sources:J})},X={name:`Use Selecto with Multiple Group`,...k(ot,{apps:q,sources:J})},Z={name:`Use Selecto with Group & Ungroup`,...k(lt,{apps:q,sources:J})},Q={name:`Use Selecto with Nested Group`,...k(ft,{apps:q,sources:J})},$={name:`Use Infinite Viewer`,...k(qe,{apps:q,sources:J})},_n=[`ComponentsSelecto`,`ComponentsSelectoWithMultipleGroup`,`ComponentsSelectoWithGroupUngroup`,`ComponentsSelectoWithNestedGroup`,`ComponentsInfiniteViewer`],Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Use Selecto",
  ...appStory(ReactSelectoApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Use Selecto with Multiple Group",
  ...appStory(ReactSelectoMultipleGroupApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Use Selecto with Group & Ungroup",
  ...appStory(ReactSelectoMultipleGroupUngroupApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Use Selecto with Nested Group",
  ...appStory(ReactSelectoNestedGroupApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: "Use Infinite Viewer",
  ...appStory(ReactInfiniteViewerApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...$.parameters?.docs?.source}}}})))()}vn();export{$ as ComponentsInfiniteViewer,Y as ComponentsSelecto,Z as ComponentsSelectoWithGroupUngroup,X as ComponentsSelectoWithMultipleGroup,Q as ComponentsSelectoWithNestedGroup,_n as __namedExportsOrder,gn as default};