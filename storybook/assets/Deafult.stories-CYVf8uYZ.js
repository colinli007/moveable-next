import{a as __toESM,n as __esmMin,r as __exportAll}from"./rolldown-runtime-sJBDdmOt.js";import{t as require_react}from"./react-D1chmgGX.js";import{t as require_react_dom}from"./react-dom-7NyLS5UI.js";import{t as require_jsx_runtime}from"./jsx-runtime-DM-zaqa2.js";import{Q as init_utils_esm,at as splitBracket,c as init_src,l as src_default,n as devPlay,ot as splitComma,r as init_story,t as appStory}from"./story-uRijs6RN.js";import{n as init_testing,o as wait,r as pan,t as findMoveable}from"./testing-D3qGHjyB.js";var ReactATagApp_exports=__exportAll({default:()=>App$34});function App$34(){return(0,import_jsx_runtime$34.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$34.jsx)(`div`,{className:`target`,children:(0,import_jsx_runtime$34.jsx)(`a`,{href:`https://daybrush.com`,children:`Target1`})}),(0,import_jsx_runtime$34.jsx)(src_default,{target:`.target`,draggable:!0,preventClickDefault:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$36,import_jsx_runtime$34;function init_ReactATagApp(){return(init_ReactATagApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$34=require_jsx_runtime()})))()}var ReactAccuracyApp_exports=__exportAll({default:()=>App$33});function App$33(){let e=import_react$35.useRef(null);return(0,import_jsx_runtime$33.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$33.jsx)(`span`,{ref:e,children:`Position`}),(0,import_jsx_runtime$33.jsx)(`div`,{className:`preview`,style:{position:`relative`,width:`800px`,height:`800px`,transform:`scale(0.67123)`,transformOrigin:`top left`,background:`#eee`},children:(0,import_jsx_runtime$33.jsx)(`div`,{className:`target`,style:{top:`0px`,left:`0px`,transform:`translate(150px, 100px)`},children:`Target`})}),(0,import_jsx_runtime$33.jsx)(src_default,{target:`.target`,draggable:!0,snappable:!0,snapContainer:`.preview`,bounds:{left:0,top:0},onDrag:t=>{t.target.style.transform=t.transform,e.current.innerHTML=`${t.translate[0]} x ${t.translate[1]}`}})]})}var import_react$35,import_jsx_runtime$33;function init_ReactAccuracyApp(){return(init_ReactAccuracyApp=__esmMin((()=>{import_react$35=__toESM(require_react()),init_src(),import_jsx_runtime$33=require_jsx_runtime()})))()}var ReactAccurateElementGuideline2App_exports=__exportAll({default:()=>App$32});function App$32(){let e=import_react$34.useRef(null),t=import_react$34.useRef(null),n=import_react$34.useRef(null);return(0,import_jsx_runtime$32.jsx)(`div`,{className:`root`,style:{display:`flex`,justifyContent:`center`,alignItems:`center`,width:`700.2px`,height:`700.2px`},children:(0,import_jsx_runtime$32.jsxs)(`div`,{ref:e,className:`container2`,style:{width:`299px`,height:`299px`,outline:`10px solid #ccc`},children:[(0,import_jsx_runtime$32.jsx)(`div`,{className:`target2`,ref:t,style:{width:`100px`,height:`100px`},children:`Target`}),(0,import_jsx_runtime$32.jsx)(src_default,{ref:n,target:t,draggable:!0,edgeDraggable:!1,startDragRotate:0,throttleDragRotate:0,keepRatio:!1,throttleScale:0,snappable:!0,snapDirections:{top:!0,left:!0,bottom:!0,right:!0,center:!0,middle:!0},elementSnapDirections:{middle:!0,center:!0,top:!0,left:!0,bottom:!0,right:!0},snapThreshold:5,elementGuidelines:[e],onDrag:e=>{e.target.style.transform=e.transform,t.current.innerText=e.transform},onScale:e=>{e.target.style.transform=e.drag.transform}})]})})}var import_react$34,import_jsx_runtime$32;function init_ReactAccurateElementGuideline2App(){return(init_ReactAccurateElementGuideline2App=__esmMin((()=>{import_react$34=__toESM(require_react()),init_src(),import_jsx_runtime$32=require_jsx_runtime()})))()}var ReactAccurateElementGuidelineApp_exports=__exportAll({default:()=>App$31});function App$31(){let e=import_react$33.useRef(null),t=import_react$33.useRef(null),n=import_react$33.useRef(null);return(0,import_jsx_runtime$31.jsx)(`div`,{className:`root`,style:{display:`flex`,justifyContent:`center`,alignItems:`center`,width:`700px`,height:`700px`},children:(0,import_jsx_runtime$31.jsxs)(`div`,{ref:e,className:`container2`,style:{width:`499px`,height:`499px`,outline:`1px solid #ccc`},children:[(0,import_jsx_runtime$31.jsx)(`div`,{className:`target2`,ref:t,style:{width:`200px`,height:`200px`},children:`Target`}),(0,import_jsx_runtime$31.jsx)(src_default,{ref:n,target:t,draggable:!0,scalable:!0,edgeDraggable:!1,startDragRotate:0,throttleDragRotate:0,keepRatio:!1,throttleScale:0,snappable:!0,elementGuidelines:[e],horizontalGuidelines:[150],verticalGuidelines:[220],onDrag:e=>{e.target.style.cssText+=e.cssText,t.current.innerText=e.transform},onScale:e=>{e.target.style.cssText+=e.cssText,t.current.innerText=e.cssText}})]})})}var import_react$33,import_jsx_runtime$31;function init_ReactAccurateElementGuidelineApp(){return(init_ReactAccurateElementGuidelineApp=__esmMin((()=>{import_react$33=__toESM(require_react()),init_src(),import_jsx_runtime$31=require_jsx_runtime()})))()}var ReactChangeTargetsOnClickApp_exports=__exportAll({default:()=>App$30});function App$30(){let[e,t]=import_react$32.useState([`.cube1`,`.cube2`]),n=import_react$32.useRef(null),r=[];for(let e=0;e<30;++e)r.push(e);return(0,import_jsx_runtime$30.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$30.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$30.jsx)(src_default,{ref:n,draggable:!0,target:e,onDragGroupStart:()=>{requestAnimationFrame(()=>{e.length===2?t([`.cube1`,`.cube2`,`.cube3`]):e.length===3&&t([`.cube1`,`.cube2`,`.cube3`,`.cube4`])})},onDrag:e=>{e.target.style.cssText+=e.cssText},onDragGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})}}),(0,import_jsx_runtime$30.jsx)(`div`,{className:`elements selecto-area`,children:r.map(e=>(0,import_jsx_runtime$30.jsx)(`div`,{className:`cube cube${e}`},e))}),(0,import_jsx_runtime$30.jsx)(`div`,{className:`empty elements`})]})})}var import_react$32,import_jsx_runtime$30;function init_ReactChangeTargetsOnClickApp(){return(init_ReactChangeTargetsOnClickApp=__esmMin((()=>{import_react$32=__toESM(require_react()),init_src(),import_jsx_runtime$30=require_jsx_runtime()})))()}function init_snap(){return(init_snap=__esmMin((()=>{})))()}var ReactChangingSnapContainerApp_exports=__exportAll({default:()=>App$29});function App$29(e){let[t,n]=import_react$31.useState(`.snapGrid`),r=import_react$31.useCallback(e=>{n(e.currentTarget)},[]);return(0,import_jsx_runtime$29.jsxs)(`div`,{className:`root`,style:{position:`relative`,border:`1px solid black`},children:[(0,import_jsx_runtime$29.jsx)(src_default,{target:`.target`,draggable:!0,snappable:!0,horizontalGuidelines:[0,100,200,300],verticalGuidelines:[0,100,200,300],snapContainer:t,onDragStart:()=>{document.querySelectorAll(`.snapGrid`).forEach(e=>{e.addEventListener(`mouseenter`,r)})},onDrag:e=>{e.target.style.transform=e.transform,e.target.style.pointerEvents=`none`},onDragEnd:e=>{e.target.style.pointerEvents=``,document.querySelectorAll(`.snapGrid`).forEach(e=>{e.removeEventListener(`mouseenter`,r)})}}),(0,import_jsx_runtime$29.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$29.jsx)(`div`,{className:`snapGrid`,children:(0,import_jsx_runtime$29.jsx)(`div`,{className:`target`,style:{width:`200px`,height:`150px`,transform:`translate(0px, 0px) scale(1.5, 1)`},children:`Target`})}),(0,import_jsx_runtime$29.jsx)(`div`,{className:`snapGrid`})]})]})}var import_react$31,import_jsx_runtime$29;function init_ReactChangingSnapContainerApp(){return(init_ReactChangingSnapContainerApp=__esmMin((()=>{import_react$31=__toESM(require_react()),init_src(),import_jsx_runtime$29=require_jsx_runtime()})))()}var ReactClickApp_exports=__exportAll({default:()=>App$28});function App$28(e){let t=import_react$30.useRef(null),n=import_react$30.useRef(null);return(0,import_jsx_runtime$28.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$28.jsxs)(`div`,{className:`container`,style:{height:`100px`},onClick:()=>{console.log(`Click`)},onMouseDown:()=>{console.log(`MouseDown`)},children:[(0,import_jsx_runtime$28.jsx)(`div`,{className:`target`,ref:t,children:`Target`}),(0,import_jsx_runtime$28.jsx)(src_default,{ref:n,target:t,resizable:!0,preventClickDefault:!0,draggable:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})})}var import_react$30,import_jsx_runtime$28;function init_ReactClickApp(){return(init_ReactClickApp=__esmMin((()=>{import_react$30=__toESM(require_react()),init_src(),import_jsx_runtime$28=require_jsx_runtime()})))()}var ReactCustomElementApp_exports=__exportAll({default:()=>App$27});function App$27(){let[e,t]=import_react$29.useState(``);return import_react$29.useEffect(()=>{t(navigator.userAgent)},[]),(0,import_jsx_runtime$27.jsxs)(`div`,{className:`container`,style:{border:`1px solid black`},children:[(0,import_jsx_runtime$27.jsx)(`p`,{style:{display:`block`,height:`20px`},children:e}),(0,import_jsx_runtime$27.jsx)(`custom-element`,{style:{display:`block`,padding:`10px`},children:(0,import_jsx_runtime$27.jsx)(`div`,{id:`draggable`,slot:`custom-element`,style:{position:`relative`,width:`150px`,height:`150px`,backgroundColor:`#e79627`}})}),(0,import_jsx_runtime$27.jsx)(src_default,{target:`#draggable`,draggable:!0,snappable:!0,bounds:{left:0,top:0},onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$29,import_jsx_runtime$27,CustomElement$1;function init_ReactCustomElementApp(){return(init_ReactCustomElementApp=__esmMin((()=>{import_react$29=__toESM(require_react()),init_src(),import_jsx_runtime$27=require_jsx_runtime(),CustomElement$1=`
class CustomElement extends HTMLElement {
    styleText = \`
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
\`;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \`
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
\`;
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
`,typeof window<`u`&&eval(CustomElement$1)})))()}var ReactCustomElementBoundsApp_exports=__exportAll({default:()=>App$26});function App$26(){let[e,t]=import_react$28.useState();return import_react$28.useEffect(()=>{t(document.querySelector(`custom-element`))},[]),(0,import_jsx_runtime$26.jsxs)(`div`,{className:`container`,style:{border:`1px solid black`},children:[(0,import_jsx_runtime$26.jsx)(`custom-element`,{style:{display:`block`,padding:`10px`},children:(0,import_jsx_runtime$26.jsx)(`div`,{id:`draggable`,slot:`custom-element`,style:{width:`150px`,height:`150px`,backgroundColor:`#e79627`}})}),e&&(0,import_react_dom$1.createPortal)((0,import_jsx_runtime$26.jsx)(src_default,{target:`#draggable`,draggable:!0,snappable:!0,bounds:{left:0,top:0},onDrag:e=>{e.target.style.transform=e.transform}}),e.shadowRoot.querySelector(`.card-content`))]})}var import_react$28,import_react_dom$1,import_jsx_runtime$26,CustomElement;function init_ReactCustomElementBoundsApp(){return(init_ReactCustomElementBoundsApp=__esmMin((()=>{import_react$28=__toESM(require_react()),init_src(),import_react_dom$1=require_react_dom(),import_jsx_runtime$26=require_jsx_runtime(),CustomElement=`
class CustomElement extends HTMLElement {
    styleText = \`
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
width: 100%;
height: calc(100% - 80px);
background-color: #EDF0F3;
position: relative;
}
\`;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \`
<div class="card-header"></div>
<div class="card-content">
  <slot name="custom-element"></slot>
</div>
\`;
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
`,typeof window<`u`&&eval(CustomElement)})))()}var ReactDragAPIApp_exports=__exportAll({default:()=>App$25});function App$25(){let e=(0,import_react$27.useRef)(null),[t,n]=(0,import_react$27.useState)(null);return(0,import_jsx_runtime$25.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$25.jsx)(`div`,{style:{width:`500px`,height:`500px`,border:`1px solid black`}}),(0,import_jsx_runtime$25.jsx)(`img`,{id:`drag1`,src:`https://www.w3schools.com/html/img_w3slogo.gif`,draggable:`true`,onDragStart:r=>{let i=r.nativeEvent;t||(e.current.waitToChangeTarget().then(()=>{e.current.dragStart(i)}),n(document.querySelector(`#drag1`)))}}),(0,import_jsx_runtime$25.jsx)(src_default,{ref:e,target:t,dragContainer:`.container`,draggable:!0,preventDefault:!1,onDrag:e=>{e.target.style.cssText+=e.cssText}})]})}var import_react$27,import_jsx_runtime$25;function init_ReactDragAPIApp(){return(init_ReactDragAPIApp=__esmMin((()=>{import_react$27=__toESM(require_react()),init_src(),import_jsx_runtime$25=require_jsx_runtime()})))()}var ReactDragStartGroupApp_exports=__exportAll({default:()=>App$24});function App$24(){let[e,t]=(0,import_react$26.useState)([]),n=import_react$25.useRef(null),r=import_react$25.useRef(null),i=import_react$25.useRef(null);function a(){let e=[];e.push(document.getElementsByClassName(`target1`)[0]),e.push(document.getElementsByClassName(`target2`)[0]),t(e)}function o(e){a(),i.current.dragStart(e.inputEvent)}return(0,import_jsx_runtime$24.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$24.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$24.jsx)(`div`,{className:`target target1`,children:`Target 1`}),(0,import_jsx_runtime$24.jsx)(`div`,{className:`target target2`,children:`Target 2`}),(0,import_jsx_runtime$24.jsx)(src_default,{ref:n,target:`.target1`,draggable:!0,edgeDraggable:!0,origin:!1,onDragStart:o}),(0,import_jsx_runtime$24.jsx)(src_default,{ref:r,target:`.target2`,draggable:!0,origin:!1,edgeDraggable:!0,onDragStart:o}),(0,import_jsx_runtime$24.jsx)(src_default,{ref:i,target:e,hideDefaultLines:!1,draggable:!0,onDragGroup:e=>{e.events.forEach(e=>e.target.style.transform=e.transform),n.current.updateRect(),r.current.updateRect()},onDragGroupEnd:()=>{t([])}})]})})}var import_react$25,import_react$26,import_jsx_runtime$24;function init_ReactDragStartGroupApp(){return(init_ReactDragStartGroupApp=__esmMin((()=>{import_react$25=__toESM(require_react()),import_react$26=require_react(),init_src(),import_jsx_runtime$24=require_jsx_runtime()})))()}var ReactDragTargetApp_exports=__exportAll({default:()=>App$23});function App$23(){let e=import_react$24.useRef(null),[t,n]=import_react$24.useState();return import_react$24.useEffect(()=>{n(document.querySelector(`.moveable-dimension`))},[]),(0,import_jsx_runtime$23.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$23.jsx)(`div`,{className:`target`,ref:e}),(0,import_jsx_runtime$23.jsx)(src_default,{target:e,ables:[DimensionViewable],draggable:!0,resizable:!0,rotatable:!0,dragTarget:t,props:{dimensionViewable:!0},onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})}var import_react$24,import_jsx_runtime$23,DimensionViewable;function init_ReactDragTargetApp(){return(init_ReactDragTargetApp=__esmMin((()=>{import_react$24=__toESM(require_react()),init_src(),import_jsx_runtime$23=require_jsx_runtime(),DimensionViewable={name:`dimensionViewable`,props:[],events:[],render(e,t){let n=e.getRect();return(0,import_jsx_runtime$23.jsx)(`div`,{className:`moveable-dimension`,style:{position:`absolute`,left:`${n.width/2}px`,top:`${n.height+20}px`,background:`#4af`,borderRadius:`2px`,padding:`2px 4px`,color:`white`,fontSize:`13px`,whiteSpace:`nowrap`,fontWeight:`bold`,willChange:`transform`,transform:`translate(-50%, 0px)`},children:`Target`},`dimension-viewer`)}}})))()}var ReactFixedSnapApp_exports=__exportAll({default:()=>App$22});function App$22(e){return(0,import_jsx_runtime$22.jsx)(`div`,{className:`root`,style:{paddingBottom:`400px`},children:(0,import_jsx_runtime$22.jsxs)(`div`,{className:`container`,style:{height:`900px`},children:[(0,import_jsx_runtime$22.jsx)(`div`,{className:`target element1`,style:{width:`100px`,height:`100px`,left:`0px`,top:`120px`},children:`Element1`}),(0,import_jsx_runtime$22.jsx)(`div`,{className:`target element2`,style:{width:`100px`,height:`100px`,left:`400px`,top:`120px`},children:`Element2`}),(0,import_jsx_runtime$22.jsx)(`div`,{className:`target element3`,style:{width:`300px`,height:`100px`,top:`400px`,left:`50px`},children:`Element3`}),(0,import_jsx_runtime$22.jsx)(`div`,{className:`target target1`,style:{position:`fixed`,width:`150px`,height:`150px`},children:`Target`}),(0,import_jsx_runtime$22.jsx)(src_default,{target:`.target1`,draggable:!0,scalable:!0,rotatable:!0,snappable:!0,verticalGuidelines:[0,100,200],horizontalGuidelines:[0,100,200],elementGuidelines:[{element:`.element1`,refresh:!0},`.element2`,`.element3`],onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var import_react$23,import_jsx_runtime$22;function init_ReactFixedSnapApp(){return(init_ReactFixedSnapApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$22=require_jsx_runtime()})))()}var ReactFlexApp_exports=__exportAll({default:()=>App$21});function App$21(){return(0,import_jsx_runtime$21.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$21.jsx)(`div`,{className:`target`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`21px`,position:`relative`,width:`446px`,height:`124px`,zIndex:1}}),(0,import_jsx_runtime$21.jsx)(src_default,{target:`.target`,draggable:!0,preventClickDefault:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$22,import_jsx_runtime$21;function init_ReactFlexApp(){return(init_ReactFlexApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$21=require_jsx_runtime()})))()}var ReactGroupDragAreaApp_exports=__exportAll({default:()=>App$20});function App$20(){let[e,t]=import_react$21.useState(`.target`);return import_react$21.useEffect(()=>{setTimeout(()=>{t(document.querySelectorAll(`.target, .moveable-area`))},100)},[]),(0,import_jsx_runtime$20.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$20.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,import_jsx_runtime$20.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,import_jsx_runtime$20.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,import_jsx_runtime$20.jsx)(src_default,{target:e,draggable:!0,onDragGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.transform})},onDragGroupEnd:({events:e})=>{console.log(e)}})]})}var import_react$21,import_jsx_runtime$20;function init_ReactGroupDragAreaApp(){return(init_ReactGroupDragAreaApp=__esmMin((()=>{import_react$21=__toESM(require_react()),init_src(),import_jsx_runtime$20=require_jsx_runtime()})))()}var ReactGroupPaddingApp_exports=__exportAll({default:()=>App$19});function App$19(){return(0,import_jsx_runtime$19.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$19.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$19.jsx)(`div`,{className:`target target1`,style:{borderRadius:`10px`},children:`Target1`}),(0,import_jsx_runtime$19.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,import_jsx_runtime$19.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,import_jsx_runtime$19.jsx)(src_default,{target:`.target`,draggable:!0,resizable:!0,rotatable:!0,padding:{left:10,top:10,right:10,bottom:10},onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})}})]})})}var import_react$20,import_jsx_runtime$19;function init_ReactGroupPaddingApp(){return(init_ReactGroupPaddingApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$19=require_jsx_runtime()})))()}var ReactHandleLargeNumberApp_exports=__exportAll({default:()=>App$18});function App$18(){let e=[];for(let t=0;t<300;++t)e.push(t);return(0,import_jsx_runtime$18.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$18.jsx)(`div`,{className:`container`,children:e.map(e=>(0,import_jsx_runtime$18.jsxs)(import_jsx_runtime$18.Fragment,{children:[(0,import_jsx_runtime$18.jsx)(`div`,{className:`target target${e}`,children:`Target`}),(0,import_jsx_runtime$18.jsx)(src_default,{target:`.target${e}`,draggable:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]}))})})}var import_react$19,import_jsx_runtime$18;function init_ReactHandleLargeNumberApp(){return(init_ReactHandleLargeNumberApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$18=require_jsx_runtime()})))()}var ReactIframeApp_exports=__exportAll({default:()=>App$17});function Iframe(e){let[t,n]=import_react$18.useState(),r=t?.contentWindow?.document?.body;return(0,import_jsx_runtime$17.jsx)(`iframe`,{ref:n,children:r&&(0,import_react_dom.createPortal)(e.children,r)})}function App$17(){let e=import_react$18.useRef(null);return(0,import_jsx_runtime$17.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$17.jsx)(`div`,{className:`container`,children:(0,import_jsx_runtime$17.jsxs)(Iframe,{children:[(0,import_jsx_runtime$17.jsx)(`div`,{className:`target`,ref:e,children:`Target`}),(0,import_jsx_runtime$17.jsx)(src_default,{target:e,draggable:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})})})}var import_react$18,import_react_dom,import_jsx_runtime$17;function init_ReactIframeApp(){return(init_ReactIframeApp=__esmMin((()=>{import_react$18=__toESM(require_react()),import_react_dom=require_react_dom(),init_src(),import_jsx_runtime$17=require_jsx_runtime()})))()}var ReactInputApp_exports=__exportAll({default:()=>App$16});function App$16(){return(0,import_jsx_runtime$16.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$16.jsx)(`input`,{type:`text`,className:`target`}),(0,import_jsx_runtime$16.jsx)(src_default,{target:`.target`,draggable:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$17,import_jsx_runtime$16;function init_ReactInputApp(){return(init_ReactInputApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$16=require_jsx_runtime()})))()}var ReactLargeZoomElementGuidelinesApp_exports=__exportAll({default:()=>App$15});function App$15(){return(0,import_jsx_runtime$15.jsxs)(`div`,{className:`container`,style:{},children:[(0,import_jsx_runtime$15.jsxs)(`div`,{className:`preview`,style:{position:`relative`,width:`800px`,height:`800px`,transform:`scale(3.67123)`,transformOrigin:`20% 20%`,background:`#eee`},children:[(0,import_jsx_runtime$15.jsx)(`div`,{className:`target target1`,style:{top:`0px`,left:`0px`,width:`142.1232px`,transform:`translate(150px, 100px)`},children:`Target1`}),(0,import_jsx_runtime$15.jsx)(`div`,{className:`target target2`,style:{top:`0px`,left:`100px`,width:`142.1232px`,transform:`translate(150px, 100px)`},children:`Target2`})]}),(0,import_jsx_runtime$15.jsx)(src_default,{target:`.target`,draggable:!0,snappable:!0,snapDirections:{top:!0,left:!0,bottom:!0,right:!0,center:!0,middle:!0},elementSnapDirections:{top:!0,left:!0,bottom:!0,right:!0,center:!0,middle:!0},individualGroupable:!0,snapGap:!0,elementGuidelines:[`.target1`],onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$16,import_jsx_runtime$15;function init_ReactLargeZoomElementGuidelinesApp(){return(init_ReactLargeZoomElementGuidelinesApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$15=require_jsx_runtime()})))()}var ReactNestedSVGApp_exports=__exportAll({default:()=>App$14});function App$14(){return(0,import_jsx_runtime$14.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$14.jsx)(`svg`,{viewBox:`0 0 200 200`,style:{border:`1px solid black`,width:`200px`,height:`200px`},children:(0,import_jsx_runtime$14.jsx)(`svg`,{viewBox:`0 0 200 200`,style:{border:`1px solid black`,width:`200px`,height:`200px`},children:(0,import_jsx_runtime$14.jsx)(`path`,{d:`M 0 0 L 200 0 L 200 200 z`,className:`svg`,style:{fill:`white`,stroke:`red`,strokeWidth:2}})})}),(0,import_jsx_runtime$14.jsx)(src_default,{target:`.svg`,draggable:!0,preventClickDefault:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$15,import_jsx_runtime$14;function init_ReactNestedSVGApp(){return(init_ReactNestedSVGApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$14=require_jsx_runtime()})))()}var ReactNestedTargetApp_exports=__exportAll({default:()=>App$13});function App$13(e){return(0,import_jsx_runtime$13.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$13.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$13.jsxs)(`div`,{className:`target target1`,children:[`Target`,(0,import_jsx_runtime$13.jsx)(`div`,{className:`target target2`,children:`Target`})]}),(0,import_jsx_runtime$13.jsx)(src_default,{target:`.target1`,draggable:!0,stopPropagation:!0,onDrag:e=>{e.target.style.transform=e.transform}}),(0,import_jsx_runtime$13.jsx)(src_default,{target:`.target2`,draggable:!0,stopPropagation:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})})}var import_react$14,import_jsx_runtime$13;function init_ReactNestedTargetApp(){return(init_ReactNestedTargetApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$13=require_jsx_runtime()})))()}var ReactNoTargetApp_exports=__exportAll({default:()=>App$12});function App$12(){return(0,import_jsx_runtime$12.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$12.jsx)(`div`,{className:`target`,children:`Target1`}),(0,import_jsx_runtime$12.jsx)(src_default,{target:`.aaa`,draggable:!0,preventClickDefault:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$13,import_jsx_runtime$12;function init_ReactNoTargetApp(){return(init_ReactNoTargetApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$12=require_jsx_runtime()})))()}var ReactOverflowApp_exports=__exportAll({default:()=>App$11});function App$11(e){let t=import_react$12.useRef(null);return(0,import_jsx_runtime$11.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$11.jsxs)(`div`,{className:`container`,style:{height:`100px`},children:[(0,import_jsx_runtime$11.jsx)(`div`,{className:`target`,style:{overflow:`auto`},onScroll:()=>{t.current?.updateRect()},children:(0,import_jsx_runtime$11.jsx)(`div`,{className:`scroll`,style:{width:`100%`,height:`1000px`}})}),(0,import_jsx_runtime$11.jsx)(src_default,{ref:t,target:`.target`,resizable:!0,preventClickDefault:!0,draggable:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})})}var import_react$12,import_jsx_runtime$11;function init_ReactOverflowApp(){return(init_ReactOverflowApp=__esmMin((()=>{import_react$12=__toESM(require_react()),init_src(),import_jsx_runtime$11=require_jsx_runtime()})))()}var ReactRequestBoundsApp_exports=__exportAll({default:()=>App$10});function App$10(){let e=import_react$11.useRef(null);return(0,import_jsx_runtime$10.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$10.jsx)(`button`,{onClick:()=>{e.current.request(`draggable`,{isInstant:!0,deltaX:0,deltaY:0})},children:`Request`}),(0,import_jsx_runtime$10.jsx)(`div`,{className:`target`,children:`Target`}),(0,import_jsx_runtime$10.jsx)(src_default,{ref:e,target:`.target`,draggable:!0,rotatable:!0,resizable:!0,snappable:!0,bounds:{left:200,top:0},onRender:e=>{e.target.style.cssText+=e.cssText}})]})}var import_react$11,import_jsx_runtime$10;function init_ReactRequestBoundsApp(){return(init_ReactRequestBoundsApp=__esmMin((()=>{import_react$11=__toESM(require_react()),init_src(),import_jsx_runtime$10=require_jsx_runtime()})))()}var ReactRotateClippableApp_exports=__exportAll({default:()=>App$9});function App$9(){let e=import_react$10.useRef(null);return(0,import_jsx_runtime$9.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$9.jsxs)(`div`,{className:`nested first`,children:[`No Transform`,(0,import_jsx_runtime$9.jsxs)(`div`,{className:`nested scale`,children:[`scale(1.5, 1.5)`,(0,import_jsx_runtime$9.jsxs)(`div`,{className:`nested rotate`,children:[`rotate(30deg)`,(0,import_jsx_runtime$9.jsx)(`div`,{className:`target`,ref:e,children:`Target`})]})]})]}),(0,import_jsx_runtime$9.jsx)(src_default,{target:e,draggable:!0,throttleDrag:0,startDragRotate:0,throttleDragRotate:0,zoom:1,origin:!0,padding:{left:0,top:0,right:0,bottom:0},clippable:!0,clipRelative:!1,clipArea:!1,dragWithClip:!1,defaultClipPath:`inset`,clipTargetBounds:!0,clipVerticalGuidelines:[0,100,200],clipHorizontalGuidelines:[0,100,200],snapThreshold:5,onClip:e=>{e.clipType===`rect`?e.target.style.clip=e.clipStyle:e.target.style.clipPath=e.clipStyle},onRender:e=>{e.target.style.transform=e.transform}})]})}var import_react$10,import_jsx_runtime$9;function init_ReactRotateClippableApp(){return(init_ReactRotateClippableApp=__esmMin((()=>{import_react$10=__toESM(require_react()),init_src(),import_jsx_runtime$9=require_jsx_runtime()})))()}function init_safari(){return(init_safari=__esmMin((()=>{})))()}var ReactSafariApp_exports=__exportAll({default:()=>App$8});function App$8(){return(0,import_jsx_runtime$8.jsx)(`div`,{className:`safari-app`,children:(0,import_jsx_runtime$8.jsx)(`div`,{className:`safari-canvas`,children:(0,import_jsx_runtime$8.jsxs)(`div`,{className:`safari-pages`,children:[(0,import_jsx_runtime$8.jsx)(`div`,{className:`safari-target`}),(0,import_jsx_runtime$8.jsx)(src_default,{target:`.safari-target`,draggable:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})})})}var import_react$9,import_jsx_runtime$8;function init_ReactSafariApp(){return(init_ReactSafariApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$8=require_jsx_runtime()})))()}var ReactScalableKeepRatioApp_exports=__exportAll({default:()=>App$7});function App$7(){return(0,import_jsx_runtime$7.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$7.jsx)(`div`,{className:`target`,style:{transform:`scale(1, 0)`},children:`Target1`}),(0,import_jsx_runtime$7.jsx)(src_default,{target:`.target`,scalable:!0,keepRatio:!0,onScaleStart:e=>{e.setRatio(1)},onScale:e=>{e.target.style.cssText+=e.cssText}})]})}var import_react$8,import_jsx_runtime$7;function init_ReactScalableKeepRatioApp(){return(init_ReactScalableKeepRatioApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$7=require_jsx_runtime()})))()}var ReactStopDragApp_exports=__exportAll({default:()=>App$6});function App$6(){return(0,import_jsx_runtime$6.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$6.jsx)(`p`,{children:`No Stop`}),(0,import_jsx_runtime$6.jsx)(`input`,{type:`input`,className:`target1`}),(0,import_jsx_runtime$6.jsx)(`p`,{children:`Stop Drag`}),(0,import_jsx_runtime$6.jsx)(`input`,{type:`input`,className:`target2`}),(0,import_jsx_runtime$6.jsx)(`p`,{children:`Stop Drag`}),(0,import_jsx_runtime$6.jsxs)(`select`,{className:`target3`,children:[(0,import_jsx_runtime$6.jsx)(`option`,{children:`a`}),(0,import_jsx_runtime$6.jsx)(`option`,{children:`b`}),(0,import_jsx_runtime$6.jsx)(`option`,{children:`c`})]}),(0,import_jsx_runtime$6.jsx)(src_default,{target:`.target1`,draggable:!0,onDrag:e=>{e.target.style.cssText+=e.cssText}}),(0,import_jsx_runtime$6.jsx)(src_default,{target:`.target2`,draggable:!0,onDragStart:e=>{[`input`,`select`].indexOf(e.target.tagName.toLowerCase())>-1&&e.stopDrag()},onDrag:e=>{e.target.style.cssText+=e.cssText}}),(0,import_jsx_runtime$6.jsx)(src_default,{target:`.target3`,draggable:!0,onDragStart:e=>{[`input`,`select`].indexOf(e.target.tagName.toLowerCase())>-1&&e.stopDrag()},onDrag:e=>{e.target.style.cssText+=e.cssText}})]})}var import_react$7,import_jsx_runtime$6;function init_ReactStopDragApp(){return(init_ReactStopDragApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$6=require_jsx_runtime()})))()}var ReactTRSTargetApp_exports=__exportAll({default:()=>App$5});function App$5(e){return(0,import_jsx_runtime$5.jsx)(`div`,{className:`root`,style:{paddingTop:`100px`},children:(0,import_jsx_runtime$5.jsxs)(`div`,{children:[(0,import_jsx_runtime$5.jsx)(`div`,{style:{position:`relative`,transform:`translate3d(0px, 0px, 100px)`},children:(0,import_jsx_runtime$5.jsx)(`div`,{className:`target`,style:{translate:`100px 10px`,rotate:`30deg`,scale:`1 2`,transform:`translate(100px, 0px)`},children:`Target`})}),(0,import_jsx_runtime$5.jsx)(src_default,{target:`.target`,draggable:!0,rotatable:!0,resizable:!0,rootContainer:document.body,onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var import_react$6,import_jsx_runtime$5;function init_ReactTRSTargetApp(){return(init_ReactTRSTargetApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$5=require_jsx_runtime()})))()}var ReactTranslate50App_exports=__exportAll({default:()=>App$4});function App$4(){return(0,import_jsx_runtime$4.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$4.jsxs)(`div`,{className:`container`,children:[(0,import_jsx_runtime$4.jsx)(`div`,{className:`target`,style:{transform:`translate(-50%, -50%)`},children:`Target`}),(0,import_jsx_runtime$4.jsx)(src_default,{target:`.target`,resizable:!0,preventClickDefault:!0,draggable:!0,onDrag:e=>{console.log(e.dist)},onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var import_react$5,import_jsx_runtime$4;function init_ReactTranslate50App(){return(init_ReactTranslate50App=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$4=require_jsx_runtime()})))()}var ReactWillChangeApp_exports=__exportAll({default:()=>App$3});function App$3(){return(0,import_jsx_runtime$3.jsxs)(`div`,{className:`no-container`,children:[(0,import_jsx_runtime$3.jsx)(`div`,{className:`will-change-container`,children:(0,import_jsx_runtime$3.jsx)(`div`,{className:`will-change-target`,children:`Target1`})}),(0,import_jsx_runtime$3.jsx)(src_default,{target:`.will-change-target`,draggable:!0,preventClickDefault:!0,onDrag:e=>{e.target.style.transform=e.transform}})]})}var import_react$4,import_jsx_runtime$3;function init_ReactWillChangeApp(){return(init_ReactWillChangeApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$3=require_jsx_runtime()})))()}var ReactZoomedCursorApp_exports=__exportAll({default:()=>App$2});function App$2(e){return(0,import_jsx_runtime$2.jsx)(`div`,{className:`root`,children:(0,import_jsx_runtime$2.jsxs)(`div`,{className:`container`,style:{width:`500px`,transform:`translate(100px, 100px) scale(2)`},children:[(0,import_jsx_runtime$2.jsx)(`div`,{className:`target`,children:`Target`}),(0,import_jsx_runtime$2.jsx)(src_default,{target:`.target`,draggable:!0,scalable:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var import_react$3,import_jsx_runtime$2;function init_ReactZoomedCursorApp(){return(init_ReactZoomedCursorApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime$2=require_jsx_runtime()})))()}var ReactZoomedSnapApp_exports=__exportAll({default:()=>App$1});function App$1(){let[e,t]=(0,import_react$2.useState)([]);return(0,import_react$2.useEffect)(()=>{t([].slice.call(document.querySelectorAll(`.moveable`)))},[]),(0,import_jsx_runtime$1.jsxs)(`div`,{className:`root`,children:[(0,import_jsx_runtime$1.jsxs)(`div`,{className:`container`,style:{width:`1000px`,height:`1600px`,transform:`scale(0.47845)`,transformOrigin:`top left`,background:`#faa`},children:[(0,import_jsx_runtime$1.jsx)(`div`,{className:`target box-1`,style:{top:0,left:0},children:`Target`}),(0,import_jsx_runtime$1.jsx)(`div`,{className:`target moveable box-2`,style:{width:`600px`,height:`50px`,top:`1400px`,left:`150px`},children:(0,import_jsx_runtime$1.jsx)(`p`,{children:`Moveable 2`})}),(0,import_jsx_runtime$1.jsx)(`div`,{className:`target moveable box-3`,style:{width:`250px`,height:`50px`,top:`1300px`,left:`350px`},children:(0,import_jsx_runtime$1.jsx)(`p`,{children:`Moveable 3`})}),(0,import_jsx_runtime$1.jsx)(`div`,{className:`target moveable box-4`,style:{width:`250px`,height:`50px`,top:`1200px`,left:`200px`},children:(0,import_jsx_runtime$1.jsx)(`p`,{children:`Moveable 4`})}),(0,import_jsx_runtime$1.jsx)(`div`,{className:`target moveable box-5`,style:{width:`250px`,height:`50px`,top:`1200px`,left:`500px`},children:(0,import_jsx_runtime$1.jsx)(`p`,{children:`Moveable 5`})})]}),(0,import_jsx_runtime$1.jsx)(src_default,{target:`.box-1`,draggable:!0,resizable:!0,snappable:!0,zoom:1,elementGuidelines:e,bounds:{top:0,left:0,right:500,bottom:800},onRender:e=>{e.target.style.cssText+=e.cssText}})]})}var import_react$1,import_react$2,import_jsx_runtime$1;function init_ReactZoomedSnapApp(){return(init_ReactZoomedSnapApp=__esmMin((()=>{require_react(),init_src(),import_react$2=require_react(),import_jsx_runtime$1=require_jsx_runtime()})))()}var ReactZoomedTargetApp_exports=__exportAll({default:()=>App});function App(e){return(0,import_jsx_runtime.jsx)(`div`,{className:`root`,style:{paddingTop:`100px`},children:(0,import_jsx_runtime.jsx)(`div`,{children:(0,import_jsx_runtime.jsxs)(`div`,{style:{position:`relative`,transform:`translate3d(0px, 0px, 100px)`},children:[(0,import_jsx_runtime.jsx)(`div`,{style:{position:`relative`,zoom:.5},children:(0,import_jsx_runtime.jsx)(`div`,{className:`target`,style:{transform:`translate(0px, 0px)`},children:`Target`})}),(0,import_jsx_runtime.jsx)(src_default,{target:`.target`,draggable:!0,rotatable:!0,resizable:!0,rootContainer:document.body,onRender:e=>{e.target.style.cssText+=e.cssText}})]})})})}var import_react,import_jsx_runtime;function init_ReactZoomedTargetApp(){return(init_ReactZoomedTargetApp=__esmMin((()=>{require_react(),init_src(),import_jsx_runtime=require_jsx_runtime()})))()}var ReactATagApp_default;function init_ReactATagApp$1(){return(init_ReactATagApp$1=__esmMin((()=>{ReactATagApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target"><a href="https://daybrush.com">Target1</a></div>
        <Moveable
            target={".target"}
            draggable={true}
            preventClickDefault={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactAccuracyApp_default;function init_ReactAccuracyApp$1(){return(init_ReactAccuracyApp$1=__esmMin((()=>{ReactAccuracyApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const spanRef = React.useRef<HTMLSpanElement>(null);

    return <div className="container">
        <span ref={spanRef}>Position</span>
        <div className="preview" style={{
            position: "relative",
            width: "800px",
            height: "800px",
            transform: "scale(0.67123)",
            transformOrigin: "top left",
            background: "#eee",
        }}>
            <div className="target" style={{
                top: "0px",
                left: "0px",
                transform: "translate(150px, 100px)",
            }}>Target</div>
        </div>
        <Moveable
            target={".target"}
            draggable={true}
            snappable={true}
            snapContainer=".preview"
            bounds={{
                left: 0,
                top: 0,
            }}
            onDrag={e => {
                e.target.style.transform = e.transform;

                spanRef.current!.innerHTML = \`\${e.translate[0]} x \${e.translate[1]}\`;
            }}
        />
    </div>;
}
`})))()}var ReactAccurateElementGuideline2App_default;function init_ReactAccurateElementGuideline2App$1(){return(init_ReactAccurateElementGuideline2App$1=__esmMin((()=>{ReactAccurateElementGuideline2App_default=`import React from "react";
import Moveable from "@/react-moveable";


export default function App() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div
            className="root"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "700.2px",
                height: "700.2px",
            }}
        >
            <div
                ref={containerRef}
                className="container2"
                style={{
                    width: "299px",
                    height: "299px",
                    outline: "10px solid #ccc",
                }}
            >
                <div
                    className="target2"
                    ref={targetRef}
                    style={{
                        width: "100px",
                        height: "100px",
                    }}
                >
                    Target
                </div>
                <Moveable
                    ref={moveableRef}
                    target={targetRef}
                    draggable={true}
                    edgeDraggable={false}
                    startDragRotate={0}
                    throttleDragRotate={0}
                    keepRatio={false}
                    throttleScale={0}
                    snappable={true}
                    snapDirections={{
                        top: true,
                        left: true,
                        bottom: true,
                        right: true,
                        center: true,
                        middle: true,
                    }}
                    elementSnapDirections={{
                        middle: true,
                        center: true,
                        top: true,
                        left: true,
                        bottom: true,
                        right: true,
                    }}
                    snapThreshold={5}
                    elementGuidelines={[containerRef]}
                    onDrag={(e) => {
                        e.target.style.transform = e.transform;
                        targetRef.current!.innerText = e.transform;
                    }}
                    onScale={(e) => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactAccurateElementGuidelineApp_default;function init_ReactAccurateElementGuidelineApp$1(){return(init_ReactAccurateElementGuidelineApp$1=__esmMin((()=>{ReactAccurateElementGuidelineApp_default=`import React from "react";
import Moveable from "@/react-moveable";


export default function App() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div
            className="root"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "700px",
                height: "700px",
            }}
        >
            <div
                ref={containerRef}
                className="container2"
                style={{
                    // position: "relative",
                    width: "499px",
                    height: "499px",
                    outline: "1px solid #ccc",
                }}
            >
                <div
                    className="target2"
                    ref={targetRef}
                    style={{
                        width: "200px",
                        height: "200px",
                    }}
                >
                    Target
                </div>
                <Moveable
                    ref={moveableRef}
                    target={targetRef}
                    draggable={true}
                    scalable={true}
                    edgeDraggable={false}
                    startDragRotate={0}
                    throttleDragRotate={0}
                    keepRatio={false}
                    throttleScale={0}
                    snappable={true}
                    // snapDirections={{
                    //     top: true,
                    //     left: true,
                    //     // bottom: true,
                    //     // right: true,
                    //     // center: true,
                    //     // middle: true,
                    // }}
                    // elementSnapDirections={{
                    //     // middle: true,
                    //     // center: true,
                    //     top: true,
                    //     left: true,
                    //     // bottom: true,
                    //     // right: true,
                    // }}
                    // snapThreshold={10}
                    elementGuidelines={[containerRef]}
                    horizontalGuidelines={[150]}
                    verticalGuidelines={[220]}
                    onDrag={(e) => {
                        e.target.style.cssText += e.cssText;
                        targetRef.current!.innerText = e.transform;
                    }}
                    onScale={(e) => {
                        e.target.style.cssText += e.cssText;
                        targetRef.current!.innerText = e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactChangeTargetsOnClickApp_default;function init_ReactChangeTargetsOnClickApp$1(){return(init_ReactChangeTargetsOnClickApp$1=__esmMin((()=>{ReactChangeTargetsOnClickApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";


export default function App() {
    const [targets, setTargets] = React.useState<Array<string>>([
        ".cube1",
        ".cube2",
    ]);
    const moveableRef = React.useRef<Moveable>(null);
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
                onDragGroupStart={() => {
                    requestAnimationFrame(() => {
                        if (targets.length === 2) {
                            setTargets([".cube1", ".cube2", ".cube3"]);
                        } else if (targets.length === 3) {
                            setTargets([".cube1", ".cube2", ".cube3", ".cube4"]);
                        }
                    });
                }}
                onDrag={e => {
                    e.target.style.cssText += e.cssText;
                }}
                onDragGroup={e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }}
            ></Moveable>

            <div className="elements selecto-area">
                {cubes.map(i => <div className={\`cube cube\${i}\`} key={i}></div>)}
            </div>
            <div className="empty elements"></div>
        </div>
    </div>;
}
`})))()}var ReactChangingSnapContainerApp_default;function init_ReactChangingSnapContainerApp$1(){return(init_ReactChangingSnapContainerApp$1=__esmMin((()=>{ReactChangingSnapContainerApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";
import "./snap.css";
export default function App(props: Record<string, any>) {
    const [snapContainer, setSnapContainer] = React.useState<HTMLElement | string>(".snapGrid");
    const onMoustEnter = React.useCallback((e: MouseEvent) => {
        setSnapContainer(e.currentTarget as HTMLElement);
    }, []);
    return (
        <div className="root" style={{
            position: "relative",
            border: "1px solid black",
        }}>
            <Moveable
                target={".target"}
                draggable={true}
                snappable={true}
                horizontalGuidelines={[0, 100, 200, 300]}
                verticalGuidelines={[0, 100, 200, 300]}
                snapContainer={snapContainer}
                onDragStart={() => {
                    document.querySelectorAll<HTMLElement>(".snapGrid").forEach(grid => {
                        grid.addEventListener("mouseenter", onMoustEnter);
                    });
                }}
                onDrag={e => {
                    e.target.style.transform = e.transform;
                    e.target.style.pointerEvents = "none";
                }}
                onDragEnd={e => {
                    e.target.style.pointerEvents = "";
                    document.querySelectorAll<HTMLElement>(".snapGrid").forEach(grid => {
                        grid.removeEventListener("mouseenter", onMoustEnter);
                    });
                }}
            />
            <div className="container">
                <div className="snapGrid">
                    <div className="target" style={{
                        width: "200px",
                        height: "150px",
                        transform: "translate(0px, 0px) scale(1.5, 1)",
                    }}>Target</div>
                </div>
                <div className="snapGrid"></div>
            </div>
        </div>
    );
}
`})))()}var ReactClickApp_default;function init_ReactClickApp$1(){return(init_ReactClickApp$1=__esmMin((()=>{ReactClickApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <div className="container" style={{
                height: "100px",
            }} onClick={() => {
                console.log("Click");
            }} onMouseDown={() => {
                console.log("MouseDown");
            }}>
                <div className="target" ref={targetRef}>Target</div>
                <Moveable
                    ref={moveableRef}
                    target={targetRef}
                    resizable={true}
                    preventClickDefault={true}
                    draggable={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactCustomElementApp_default;function init_ReactCustomElementApp$1(){return(init_ReactCustomElementApp$1=__esmMin((()=>{ReactCustomElementApp_default=`/* eslint-disable @typescript-eslint/no-namespace */
import * as React from "react";
import Moveable from "@/react-moveable";

const CustomElement = \`
class CustomElement extends HTMLElement {
    styleText = \${"\`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
\${"\`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \${"\`"}
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
\${"\`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
\`;

if (typeof window !== "undefined") {
    eval(CustomElement);
}



declare global {
    interface HTMLElementTagNameMap {
        "custom-element": HTMLElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            // HTML
            "custom-element": React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export default function App() {
    const [agent, setAgent] = React.useState("");

    React.useEffect(() => {
        setAgent(navigator.userAgent);
    }, []);
    return <div className="container" style={{
        border: "1px solid black",
    }}>
        <p style={{
            display: "block",
            height: "20px",
        }}>{agent}</p>
        <custom-element style={{
            display: "block",
            padding: "10px",
        }}>
            <div id="draggable" slot="custom-element" style={{
                position: "relative",
                width: "150px",
                height: "150px",
                backgroundColor: "#e79627",
            }}></div>
        </custom-element>
        <Moveable
            target={"#draggable"}
            draggable={true}
            snappable={true}
            bounds={{ left: 0, top: 0 }}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}

`})))()}var ReactCustomElementBoundsApp_default;function init_ReactCustomElementBoundsApp$1(){return(init_ReactCustomElementBoundsApp$1=__esmMin((()=>{ReactCustomElementBoundsApp_default=`/* eslint-disable @typescript-eslint/no-namespace */
import * as React from "react";
import Moveable from "@/react-moveable";
import { createPortal } from "react-dom";

const CustomElement = \`
class CustomElement extends HTMLElement {
    styleText = \${"\`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
width: 100%;
height: calc(100% - 80px);
background-color: #EDF0F3;
position: relative;
}
\${"\`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \${"\`"}
<div class="card-header"></div>
<div class="card-content">
  <slot name="custom-element"></slot>
</div>
\${"\`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
\`;

if (typeof window !== "undefined") {
    eval(CustomElement);
}



declare global {
    interface HTMLElementTagNameMap {
        "custom-element": HTMLElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            // HTML
            "custom-element": React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export default function App() {
    const [customElement, setCustomElement] = React.useState<HTMLElement>();

    React.useEffect(() => {
        setCustomElement(document.querySelector("custom-element")!);
    }, []);

    return <div className="container" style={{
        border: "1px solid black",
    }}>
        <custom-element style={{
            display: "block",
            padding: "10px",
        }}>
            <div id="draggable" slot="custom-element" style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#e79627",
            }}></div>
        </custom-element>
        {customElement && createPortal(<Moveable
            target={"#draggable"}
            draggable={true}
            snappable={true}
            bounds={{ left: 0, top: 0 }}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />, customElement.shadowRoot!.querySelector('.card-content')!)}
    </div>;
}

`})))()}var ReactDragAPIApp_default;function init_ReactDragAPIApp$1(){return(init_ReactDragAPIApp$1=__esmMin((()=>{ReactDragAPIApp_default=`import React, { useRef, useState } from "react";
import Moveable from "@/react-moveable";


export default function App() {
    const moveableRef = useRef<Moveable>(null);
    const [target, setTarget] = useState<HTMLElement | null>(null);

    return (
        <div className="container">
            <div style={{
                width: "500px",
                height: "500px",
                border: "1px solid black",
            }}></div>
            <img
                id="drag1"
                src="https://www.w3schools.com/html/img_w3slogo.gif"
                draggable="true"
                onDragStart={e => {
                    const nativeEvent = e.nativeEvent;

                    if (!target) {
                        moveableRef.current!.waitToChangeTarget().then(() => {
                            moveableRef.current!.dragStart(nativeEvent);
                        });
                        setTarget(document.querySelector<HTMLElement>("#drag1"));
                    }
                }}
            />
            <Moveable
                ref={moveableRef}
                target={target}
                dragContainer={".container"}
                draggable={true}
                preventDefault={false}
                onDrag={e => {
                    e.target.style.cssText += e.cssText;
                }}
            />
        </div>
    );
}
`})))()}var ReactDragStartGroupApp_default;function init_ReactDragStartGroupApp$1(){return(init_ReactDragStartGroupApp$1=__esmMin((()=>{ReactDragStartGroupApp_default=`import * as React from "react";
import { useState } from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const [groupInstances, setGroupInstances] = useState<any[]>([]);
    const t1 = React.useRef<any>(null);
    const t2 = React.useRef<any>(null);
    const groupMoveable = React.useRef<any>(null);

    function initGroupElements() {
        const arr: any[] = [];
        arr.push(document.getElementsByClassName("target1")[0]);
        arr.push(document.getElementsByClassName("target2")[0]);
        setGroupInstances(arr);
    }

    function handleDragStart(e: any) {
        initGroupElements();
        groupMoveable.current!.dragStart(e.inputEvent);
    }

    return (
        <div className="root">
            <div className="container">
                <div className={\`target target1\`}>Target 1</div>
                <div className={\`target target2\`}>Target 2</div>
                <Moveable
                    ref={t1}
                    target={\`.target1\` as string}
                    draggable={true}
                    edgeDraggable={true}
                    origin={false}
                    onDragStart={handleDragStart}
                />
                <Moveable
                    ref={t2}
                    target={\`.target2\` as string}
                    draggable={true}
                    origin={false}
                    edgeDraggable={true}
                    onDragStart={handleDragStart}
                />
                <Moveable
                    ref={groupMoveable}
                    target={groupInstances}
                    hideDefaultLines={false}
                    draggable={true}
                    onDragGroup={(e) => {
                        e.events.forEach(
                            (ev) => (ev.target.style.transform = ev.transform)
                        );
                        t1.current.updateRect();
                        t2.current.updateRect();
                    }}
                    onDragGroupEnd={() => {
                        setGroupInstances([]);
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactDragTargetApp_default;function init_ReactDragTargetApp$1(){return(init_ReactDragTargetApp$1=__esmMin((()=>{ReactDragTargetApp_default=`import * as React from "react";
import Moveable, { MoveableManagerInterface, Renderer } from "@/react-moveable";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();

        // Add key (required)
        // Add class prefix moveable-(required)
        return <div key={"dimension-viewer"} className={"moveable-dimension"} style={{
            position: "absolute",
            left: \`\${rect.width / 2}px\`,
            top: \`\${rect.height + 20}px\`,
            background: "#4af",
            borderRadius: "2px",
            padding: "2px 4px",
            color: "white",
            fontSize: "13px",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            willChange: "transform",
            transform: \`translate(-50%, 0px)\`,
        }}>
            Target
        </div>;
    },
} as const;

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const [dragTarget, setDragTarget] = React.useState<HTMLElement>();

    React.useEffect(() => {
        setDragTarget(document.querySelector<HTMLElement>(".moveable-dimension")!);
    }, []);
    return <div className="container">
        <div className="target" ref={targetRef}></div>
        <Moveable
            target={targetRef}
            ables={[DimensionViewable]}
            draggable={true}
            resizable={true}
            rotatable={true}
            dragTarget={dragTarget}
            props={{
                dimensionViewable: true,
            }}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
            onResize={e => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            onRotate={e => {
                e.target.style.transform = e.drag.transform;
            }}
        />
    </div>;
}
`})))()}var ReactFixedSnapApp_default;function init_ReactFixedSnapApp$1(){return(init_ReactFixedSnapApp$1=__esmMin((()=>{ReactFixedSnapApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root" style={{
            paddingBottom: "400px",
        }}>
            <div className="container" style={{
                height: "900px",
            }}>
                <div className="target element1" style={{
                    width: "100px",
                    height: "100px",
                    left: "0px",
                    top: "120px",
                }}>Element1</div>
                <div className="target element2" style={{
                    width: "100px",
                    height: "100px",
                    left: "400px",
                    top: "120px",
                }}>Element2</div>
                <div className="target element3" style={{
                    width: "300px",
                    height: "100px",
                    top: "400px",
                    left: "50px",
                }}>Element3</div>
                <div className="target target1" style={{
                    position: "fixed",
                    width: "150px",
                    height: "150px",
                }}>Target</div>
                <Moveable
                    target=".target1"
                    draggable={true}
                    scalable={true}
                    rotatable={true}
                    snappable={true}
                    verticalGuidelines={[0, 100, 200]}
                    horizontalGuidelines={[0, 100, 200]}
                    elementGuidelines={[{
                        element: ".element1",
                        refresh: true,
                    }, ".element2", ".element3"]}
                    onRender={e => {
                        // console.log(e.moveable.state.guidelines);
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactFlexApp_default;function init_ReactFlexApp$1(){return(init_ReactFlexApp$1=__esmMin((()=>{ReactFlexApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "21px",
            position: "relative",
            width: "446px",
            height: "124px",
            zIndex: 1,
        }}></div>
        <Moveable
            target={".target"}
            draggable={true}
            preventClickDefault={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactGroupDragAreaApp_default;function init_ReactGroupDragAreaApp$1(){return(init_ReactGroupDragAreaApp$1=__esmMin((()=>{ReactGroupDragAreaApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const [targets, setTargets] = React.useState<any>(".target");

    React.useEffect(() => {
        setTimeout(() => {
            setTargets(document.querySelectorAll(".target, .moveable-area"));
            // setTargets(".target, .moveable-area");
        }, 100);
    }, []);
    return <div className="container">
        <div className="target target1">Target1</div>
        <div className="target target2">Target2</div>
        <div className="target target3">Target3</div>
        <Moveable
            target={targets}
            draggable={true}
            onDragGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
            onDragGroupEnd={({ events }) => {
                console.log(events);
            }}
        />
    </div>;
}
`})))()}var ReactGroupPaddingApp_default;function init_ReactGroupPaddingApp$1(){return(init_ReactGroupPaddingApp$1=__esmMin((()=>{ReactGroupPaddingApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="container">
                <div className="target target1" style={{
                    borderRadius: "10px",
                }}>Target1</div>
                <div className="target target2">Target2</div>
                <div className="target target3">Target3</div>
                <Moveable
                    target={".target"}
                    draggable={true}
                    resizable={true}
                    rotatable={true}
                    padding={{ left: 10, top: 10, right: 10, bottom: 10 }}
                    onRenderGroup={e => {
                        e.events.forEach(ev => {
                            ev.target.style.cssText += ev.cssText;
                        });
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactHandleLargeNumberApp_default;function init_ReactHandleLargeNumberApp$1(){return(init_ReactHandleLargeNumberApp$1=__esmMin((()=>{ReactHandleLargeNumberApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const arr: number[] = [];

    for (let i = 0; i < 300; ++i) {
        arr.push(i);
    }
    return (
        <div className="root">
            <div className="container">
                {arr.map((i) => {
                    return <>
                        <div className={\`target target\${i}\`}>Target</div>
                        <Moveable
                            target={\`.target\${i}\` as string}
                            draggable={true}
                            onRender={e => {
                                e.target.style.cssText += e.cssText;
                            }}
                        />
                    </>;
                })}
            </div>
        </div>
    );
}
`})))()}var ReactIframeApp_default;function init_ReactIframeApp$1(){return(init_ReactIframeApp$1=__esmMin((()=>{ReactIframeApp_default=`import * as React from "react";
import { createPortal } from "react-dom";
import Moveable from "@/react-moveable";

function Iframe(props: Record<string, any>) {
    const [ref, setRef] = React.useState<HTMLIFrameElement | null>();
    const container = ref?.contentWindow?.document?.body;

    return (
        <iframe ref={setRef}>
            {container && createPortal(props.children, container)}
        </iframe>
    );
}

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <Iframe>
                    <div className="target" ref={targetRef}>Target</div>
                    <Moveable
                        target={targetRef}
                        draggable={true}
                        onRender={e => {
                            e.target.style.cssText += e.cssText;
                        }}
                    />
                </Iframe>
            </div>
        </div>
    );
}
`})))()}var ReactInputApp_default;function init_ReactInputApp$1(){return(init_ReactInputApp$1=__esmMin((()=>{ReactInputApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <input type="text" className="target" />
        <Moveable
            target={".target"}
            draggable={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactLargeZoomElementGuidelinesApp_default;function init_ReactLargeZoomElementGuidelinesApp$1(){return(init_ReactLargeZoomElementGuidelinesApp$1=__esmMin((()=>{ReactLargeZoomElementGuidelinesApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {

    return <div className="container" style={{
    }}>
        <div className="preview" style={{
            position: "relative",
            width: "800px",
            height: "800px",
            transform: "scale(3.67123)",
            transformOrigin: "20% 20%",
            background: "#eee",
        }}>
            <div className="target target1" style={{
                top: "0px",
                left: "0px",
                width: "142.1232px",
                transform: "translate(150px, 100px)",
            }}>Target1</div>
            <div className="target target2" style={{
                top: "0px",
                left: "100px",
                width: "142.1232px",
                transform: "translate(150px, 100px)",
            }}>Target2</div>
        </div>
        <Moveable
            target={".target"}
            draggable={true}
            snappable={true}
            snapDirections={{
                "top": true,
                "left": true,
                "bottom": true,
                "right": true,
                "center": true,
                "middle": true,
            }}
            elementSnapDirections={{
                "top": true, "left": true,
                "bottom": true, "right": true,
                "center": true, "middle": true,
            }}
            individualGroupable={true}
            snapGap={true}
            elementGuidelines={[".target1"]}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactNestedSVGApp_default;function init_ReactNestedSVGApp$1(){return(init_ReactNestedSVGApp$1=__esmMin((()=>{ReactNestedSVGApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <svg viewBox="0 0 200 200" style={{
            border: "1px solid black",
            width: "200px",
            height: "200px",
        }}>
            <svg viewBox="0 0 200 200" style={{
                border: "1px solid black",
                width: "200px",
                height: "200px",
            }}>
                <path d="M 0 0 L 200 0 L 200 200 z"
                    className="svg"
                    style={{
                        fill: "white",
                        stroke: "red",
                        strokeWidth: 2,
                    }} />
            </svg>
        </svg>
        <Moveable
            target={".svg"}
            draggable={true}
            preventClickDefault={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactNestedTargetApp_default;function init_ReactNestedTargetApp$1(){return(init_ReactNestedTargetApp$1=__esmMin((()=>{ReactNestedTargetApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {

    return (
        <div className="root">
            <div className="container">
                <div className="target target1">
                    Target
                    <div className="target target2">
                        Target

                    </div>
                </div>
                <Moveable
                    target=".target1"
                    draggable={true}
                    stopPropagation={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
                <Moveable
                    target=".target2"
                    draggable={true}
                    stopPropagation={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactNoTargetApp_default;function init_ReactNoTargetApp$1(){return(init_ReactNoTargetApp$1=__esmMin((()=>{ReactNoTargetApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target">Target1</div>
        <Moveable
            target={".aaa"}
            draggable={true}
            preventClickDefault={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactOverflowApp_default;function init_ReactOverflowApp$1(){return(init_ReactOverflowApp$1=__esmMin((()=>{ReactOverflowApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <div className="container" style={{
                height: "100px",
            }}>
                <div className="target" style={{
                    overflow: "auto",
                }} onScroll={() => {
                    moveableRef.current?.updateRect();
                }}>
                    <div className="scroll" style={{
                        width: "100%",
                        height: "1000px",
                    }}></div>
                </div>
                <Moveable
                    ref={moveableRef}
                    target={".target"}
                    resizable={true}
                    preventClickDefault={true}
                    draggable={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactRequestBoundsApp_default;function init_ReactRequestBoundsApp$1(){return(init_ReactRequestBoundsApp$1=__esmMin((()=>{ReactRequestBoundsApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="container">
            <button onClick={() => {
                moveableRef.current!.request("draggable", {
                    isInstant: true,
                    deltaX: 0,
                    deltaY: 0,
                });
            }}>Request</button>
            <div className="target">Target</div>

            <Moveable
                ref={moveableRef}
                target={".target"}
                draggable={true}
                rotatable={true}
                resizable={true}
                snappable={true}
                bounds={{
                    left: 200,
                    top: 0,
                }}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
            />
        </div>
    );
}
`})))()}var ReactRotateClippableApp_default;function init_ReactRotateClippableApp$1(){return(init_ReactRotateClippableApp$1=__esmMin((()=>{ReactRotateClippableApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return (
        <div className="container">
            <div className="nested first">
                No Transform
                <div className="nested scale">
                    scale(1.5, 1.5)
                    <div className="nested rotate">
                        rotate(30deg)
                        <div className="target" ref={targetRef}>Target</div>
                    </div>
                </div>
            </div>
            <Moveable
                target={targetRef}
                draggable={true}
                throttleDrag={0}
                startDragRotate={0}
                throttleDragRotate={0}
                zoom={1}
                origin={true}
                padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
                clippable={true}
                clipRelative={false}
                clipArea={false}
                dragWithClip={false}
                defaultClipPath={"inset"}
                clipTargetBounds={true}
                clipVerticalGuidelines={[0, 100, 200]}
                clipHorizontalGuidelines={[0, 100, 200]}
                snapThreshold={5}
                onClip={(e) => {
                    if (e.clipType === "rect") {
                        e.target.style.clip = e.clipStyle;
                    } else {
                        e.target.style.clipPath = e.clipStyle;
                    }
                }}
                // onDrag={e => {
                //     e.target.style.transform = e.transform;
                // }}
                onRender={(e) => {
                    // console.log('render');
                    e.target.style.transform = e.transform;
                }}
            />
        </div>
    );
}
`})))()}var ReactSafariApp_default;function init_ReactSafariApp$1(){return(init_ReactSafariApp$1=__esmMin((()=>{ReactSafariApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";
import "./safari.css";

export default function App() {
    return <div className="safari-app">
        <div className="safari-canvas">
            <div className="safari-pages">
                <div className="safari-target" />
                <Moveable
                    target={".safari-target"}
                    draggable={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    </div>;
}
`})))()}var ReactScalableKeepRatioApp_default;function init_ReactScalableKeepRatioApp$1(){return(init_ReactScalableKeepRatioApp$1=__esmMin((()=>{ReactScalableKeepRatioApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target" style={{
            transform: "scale(1, 0)",
        }}>Target1</div>
        <Moveable
            target={".target"}
            scalable={true}
            keepRatio={true}
            onScaleStart={e => {
                e.setRatio(1);
            }}
            onScale={e => {
                // console.log(e.scale);
                e.target.style.cssText += e.cssText;
            }}
        />
    </div>;
}
`})))()}var ReactStopDragApp_default;function init_ReactStopDragApp$1(){return(init_ReactStopDragApp$1=__esmMin((()=>{ReactStopDragApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <p>No Stop</p>
        <input type="input" className="target1"/>
        <p>Stop Drag</p>
        <input type="input" className="target2"/>
        <p>Stop Drag</p>
        <select className="target3">
            <option>a</option>
            <option>b</option>
            <option>c</option>
        </select>
        <Moveable
            target={".target1"}
            draggable={true}
            onDrag={e => {
                e.target.style.cssText += e.cssText;
            }}
        />
        <Moveable
            target={".target2"}
            draggable={true}
            onDragStart={e => {
                if (["input", "select"].indexOf(e.target.tagName.toLowerCase()) > -1) {
                    e.stopDrag();
                }
            }}
            onDrag={e => {
                e.target.style.cssText += e.cssText;
            }}
        />
        <Moveable
            target={".target3"}
            draggable={true}
            onDragStart={e => {
                if (["input", "select"].indexOf(e.target.tagName.toLowerCase()) > -1) {
                    e.stopDrag();
                }
            }}
            onDrag={e => {
                e.target.style.cssText += e.cssText;
            }}
        />
    </div>;
}
`})))()}var ReactTRSTargetApp_default;function init_ReactTRSTargetApp$1(){return(init_ReactTRSTargetApp$1=__esmMin((()=>{ReactTRSTargetApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root" style={{
            paddingTop: "100px",
        }}>
            <div>
                <div style={{
                    position: "relative",
                    transform: "translate3d(0px, 0px, 100px)",
                }}>
                    <div className="target" style={{
                        translate: "100px 10px",
                        rotate: "30deg",
                        scale: "1 2",
                        transform: "translate(100px, 0px)",
                    }}>Target</div>
                </div>
                <Moveable
                    target={".target"}
                    draggable={true}
                    rotatable={true}
                    resizable={true}
                    rootContainer={document.body}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                ></Moveable>
            </div>
        </div>
    );
}
`})))()}var ReactTranslate50App_default;function init_ReactTranslate50App$1(){return(init_ReactTranslate50App$1=__esmMin((()=>{ReactTranslate50App_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="container">
                <div className="target" style={{
                    transform: "translate(-50%, -50%)",
                }}>Target</div>
                <Moveable
                    target={".target"}
                    resizable={true}
                    preventClickDefault={true}
                    draggable={true}
                    onDrag={e => {
                        console.log(e.dist);
                    }}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactWillChangeApp_default;function init_ReactWillChangeApp$1(){return(init_ReactWillChangeApp$1=__esmMin((()=>{ReactWillChangeApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="no-container">
        <div className="will-change-container">
            {/* <div className="will-change-inner"> */}
                <div className="will-change-target">Target1</div>
            {/* </div> */}
        </div>
        <Moveable
            target={".will-change-target"}
            draggable={true}
            preventClickDefault={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
    </div>;
}
`})))()}var ReactZoomedCursorApp_default;function init_ReactZoomedCursorApp$1(){return(init_ReactZoomedCursorApp$1=__esmMin((()=>{ReactZoomedCursorApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root">
            <div className="container" style={{
                width: "500px",
                transform: "translate(100px, 100px) scale(2)",
            }}>
                <div className="target">Target</div>
                <Moveable
                    target={".target"}
                    draggable={true}
                    scalable={true}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ReactZoomedSnapApp_default;function init_ReactZoomedSnapApp$1(){return(init_ReactZoomedSnapApp$1=__esmMin((()=>{ReactZoomedSnapApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";
import { useEffect, useState } from "react";

export default function App() {
    const [elementGuidelines, setElementGuideliens] = useState<HTMLElement[]>([]);

    useEffect(() => {
        setElementGuideliens([].slice.call(document.querySelectorAll(".moveable")));
    }, []);
    return (
        <div className="root">
            <div className="container" style={{
                width: "1000px",
                height: "1600px",
                transform: "scale(0.47845)",
                transformOrigin: "top left",
                background: "#faa",
            }}>
                <div className="target box-1" style={{
                    top: 0,
                    left: 0,
                }}>Target</div>
                <div className="target moveable box-2" style={{
                    "width": "600px",
                    "height": "50px",
                    "top": "1400px",
                    "left": "150px",
                }}>
                    <p>Moveable 2</p>
                </div>
                <div className="target moveable box-3" style={{
                    "width": "250px",
                    "height": "50px",
                    "top": "1300px",
                    "left": "350px",
                }}>
                    <p>Moveable 3</p>
                </div>
                <div className="target moveable box-4" style={{
                    "width": "250px",
                    "height": "50px",
                    "top": "1200px",
                    "left": "200px",
                }}>
                    <p>Moveable 4</p>
                </div>
                <div className="target moveable box-5" style={{
                    "width": "250px",
                    "height": "50px",
                    "top": "1200px",
                    "left": "500px",
                }}>
                    <p>Moveable 5</p>
                </div>
            </div>
            <Moveable
                target={".box-1"}
                draggable={true}
                resizable={true}
                snappable={true}
                zoom={1}
                elementGuidelines={elementGuidelines}
                bounds={{
                    top: 0,
                    left: 0,
                    right: 500,
                    bottom: 800,
                }}
                onRender={e => {
                    e.target.style.cssText += e.cssText;
                }}
            />
        </div>
    );
}
`})))()}var ReactZoomedTargetApp_default;function init_ReactZoomedTargetApp$1(){return(init_ReactZoomedTargetApp$1=__esmMin((()=>{ReactZoomedTargetApp_default=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root" style={{
            paddingTop: "100px",
        }}>
            <div>
                <div style={{
                    position: "relative",
                    transform: "translate3d(0px, 0px, 100px)",
                }}>
                    <div style={{
                        position: "relative",
                        zoom: 0.5,
                    }}>
                        <div className="target" style={{
                            transform: "translate(0px, 0px)",
                        }}>Target</div>
                    </div>
                    <Moveable
                        target={".target"}
                        draggable={true}
                        rotatable={true}
                        resizable={true}
                        rootContainer={document.body}
                        onRender={e => {
                            e.target.style.cssText += e.cssText;
                        }}
                    ></Moveable>
                </div>
            </div>
        </div>
    );
}
`})))()}var App_default$164;function init_App(){return(init_App=__esmMin((()=>{App_default$164=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div class="target">
        <a href="https://daybrush.com">Target1</a>
    </div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .preventClickDefault=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$163;function init_App$1(){return(init_App$1=__esmMin((()=>{App_default$163=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    spanRef: Ref<HTMLSpanElement> = createRef(null);
    render() {
        return html \`<div class="container">
    <span \${ref(this.spanRef)}>Position</span>
    <div
        class="preview"
        style="position: relative;width: 800px;height: 800px;transform: scale(0.67123);transform-origin: top left;background: #eee;"
    >
        <div
            class="target"
            style="top: 0px;left: 0px;transform: translate(150px, 100px);"
        >Target</div>
    </div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .snappable=\${true}
        snapContainer=".preview"
        .bounds=\${{
            left: 0,
            top: 0
        }}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
        this.spanRef.value!.innerHTML = \`\${e.translate[0]} x \${e.translate[1]}\`;
    }
}`})))()}var App_default$162;function init_App$2(){return(init_App$2=__esmMin((()=>{App_default$162=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    containerRef: Ref<HTMLDivElement> = createRef(null);
    targetRef: Ref<HTMLDivElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div
    class="root"
    style="display: flex;justify-content: center;align-items: center;width: 700.2px;height: 700.2px;"
>
    <div
        \${ref(this.containerRef)}
        class="container2"
        style="width: 299px;height: 299px;outline: 10px solid #ccc;"
    >
        <div
            class="target2"
            \${ref(this.targetRef)}
            style="width: 100px;height: 100px;"
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${this.targetRef}
            .litDraggable=\${true}
            .edgeDraggable=\${false}
            .startDragRotate=\${0}
            .throttleDragRotate=\${0}
            .keepRatio=\${false}
            .throttleScale=\${0}
            .snappable=\${true}
            .snapDirections=\${{
            top: true,
            left: true,
            bottom: true,
            right: true,
            center: true,
            middle: true
        }}
            .elementSnapDirections=\${{
            middle: true,
            center: true,
            top: true,
            left: true,
            bottom: true,
            right: true
        }}
            .snapThreshold=\${5}
            .elementGuidelines=\${[this.containerRef]}
            @litDrag=\${this.onDrag}
            @litScale=\${this.onScale}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
        this.targetRef.value!.innerText = e.transform;
    }
    onScale(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var App_default$161;function init_App$3(){return(init_App$3=__esmMin((()=>{App_default$161=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    containerRef: Ref<HTMLDivElement> = createRef(null);
    targetRef: Ref<HTMLDivElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div
    class="root"
    style="display: flex;justify-content: center;align-items: center;width: 700px;height: 700px;"
>
    <div
        \${ref(this.containerRef)}
        class="container2"
        style="width: 499px;height: 499px;outline: 1px solid #ccc;"
    >
        <div
            class="target2"
            \${ref(this.targetRef)}
            style="width: 200px;height: 200px;"
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${this.targetRef}
            .litDraggable=\${true}
            .scalable=\${true}
            .edgeDraggable=\${false}
            .startDragRotate=\${0}
            .throttleDragRotate=\${0}
            .keepRatio=\${false}
            .throttleScale=\${0}
            .snappable=\${true}
            .elementGuidelines=\${[this.containerRef]}
            .horizontalGuidelines=\${[150]}
            .verticalGuidelines=\${[220]}
            @litDrag=\${this.onDrag}
            @litScale=\${this.onScale}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.cssText += e.cssText;
        this.targetRef.value!.innerText = e.transform;
    }
    onScale(e) {
        e.target.style.cssText += e.cssText;
        this.targetRef.value!.innerText = e.cssText;
    }
}`})))()}var App_default$160;function init_App$4(){return(init_App$4=__esmMin((()=>{App_default$160=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    targets: Array<string> = [".cube1", ".cube2"];
    moveableRef: Ref<Moveable> = createRef(null);
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
            @litDragGroupStart=\${this.onDragGroupStart}
            @litDrag=\${this.onDrag}
            @litDragGroup=\${this.onDragGroup}
        ></lit-moveable>
        <div class="elements selecto-area">\${repeat(
            this.cubes,
            i => i,
            i => html \`<div .class=\${\`cube cube\${i}\`}></div>\`
        )}</div>
        <div class="empty elements"></div>
    </div>
</div>\`;
    }
    onDragGroupStart() {
        requestAnimationFrame(() => {
            if (this.targets.length === 2) {
                this.targets = [".cube1", ".cube2", ".cube3"];
            } else if (this.targets.length === 3) {
                this.targets = [".cube1", ".cube2", ".cube3", ".cube4"];
            }
        });
    }
    onDrag(e) {
        e.target.style.cssText += e.cssText;
    }
    onDragGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    }
}`})))()}var App_default$159;function init_App$5(){return(init_App$5=__esmMin((()=>{App_default$159=`import Moveable from "lit-moveable";
import "./snap.css";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    snapContainer: HTMLElement | string = ".snapGrid";
    render() {
        return html \`<div
    class="root"
    style="position: relative;border: 1px solid black;"
>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .snappable=\${true}
        .horizontalGuidelines=\${[0, 100, 200, 300]}
        .verticalGuidelines=\${[0, 100, 200, 300]}
        .snapContainer=\${this.snapContainer}
        @litDragStart=\${this.onDragStart}
        @litDrag=\${this.onDrag}
        @litDragEnd=\${this.onDragEnd}
    ></lit-moveable>
    <div class="container">
        <div class="snapGrid">
            <div
                class="target"
                style="width: 200px;height: 150px;transform: translate(0px, 0px) scale(1.5, 1);"
            >Target</div>
        </div>
        <div class="snapGrid"></div>
    </div>
</div>\`;
    }
    onMoustEnter(e: MouseEvent) {
        this.snapContainer = e.currentTarget as HTMLElement;
    }
    onDragStart() {
        document.querySelectorAll<HTMLElement>(".snapGrid").forEach(grid => {
            grid.addEventListener("mouseenter", this.onMoustEnter);
        });
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
        e.target.style.pointerEvents = "none";
    }
    onDragEnd(e) {
        e.target.style.pointerEvents = "";
        document.querySelectorAll<HTMLElement>(".snapGrid").forEach(grid => {
            grid.removeEventListener("mouseenter", this.onMoustEnter);
        });
    }
}`})))()}var App_default$158;function init_App$6(){return(init_App$6=__esmMin((()=>{App_default$158=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="height: 100px;"
        @click=\${this.onClick}
        @mouseDown=\${this.onMouseDown}
    >
        <div
            class="target"
            \${ref(this.targetRef)}
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${this.targetRef}
            .resizable=\${true}
            .preventClickDefault=\${true}
            .litDraggable=\${true}
            @litDrag=\${this.onDrag}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onClick() {
        console.log("Click");
    }
    onMouseDown() {
        console.log("MouseDown");
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$157;function init_App$7(){return(init_App$7=__esmMin((()=>{App_default$157=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

const CustomElement = \`
class CustomElement extends HTMLElement {
    styleText = \${"\`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
\${"\`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \${"\`"}
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
\${"\`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
\`;
if (typeof window !== "undefined") {
    eval(CustomElement);
}
declare global {interface HTMLElementTagNameMap {"custom-element": HTMLElement;}namespace JSX {interface IntrinsicElements {"custom-element": React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLElement>, HTMLElement>;}}}
@customElement("lit-app")
export default class App extends LitElement {
    @state()
    agent: any = "";
    render() {
        return html \`<div
    class="container"
    style="border: 1px solid black;"
>
    <p style="display: block;height: 20px;">\${this.agent}</p>
    <custom-element style="display: block;padding: 10px;">
        <div
            id="draggable"
            slot="custom-element"
            style="position: relative;width: 150px;height: 150px;background-color: #e79627;"
        ></div>
    </custom-element>
    <lit-moveable
        .target=\${"#draggable"}
        .litDraggable=\${true}
        .snappable=\${true}
        .bounds=\${{ left: 0, top: 0 }}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    firstUpdated() {
        this.agent = navigator.userAgent;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$156;function init_App$8(){return(init_App$8=__esmMin((()=>{App_default$156=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    @state()
    target: HTMLElement | null = null;
    render() {
        return html \`<div class="container">
    <div style="width: 500px;height: 500px;border: 1px solid black;"></div>
    <img
        id="drag1"
        src="https://www.w3schools.com/html/img_w3slogo.gif"
        draggable="true"
        @dragStart=\${this.onDragStart}
    ></img>
    <lit-moveable
        \${ref(this.moveableRef)}
        .target=\${this.target}
        .dragContainer=\${".container"}
        .litDraggable=\${true}
        .preventDefault=\${false}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDragStart(e) {
        const nativeEvent = e.nativeEvent;
        if (!this.target) {
            this.moveableRef.value!.waitToChangeTarget().then(() => {
                this.moveableRef.value!.dragStart(nativeEvent);
            });
            this.target = document.querySelector<HTMLElement>("#drag1");
        }
    }
    onDrag(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$155;function init_App$9(){return(init_App$9=__esmMin((()=>{App_default$155=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    groupInstances: any[] = [];
    t1: Ref<any> = createRef(null);
    t2: Ref<any> = createRef(null);
    groupMoveable: Ref<any> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div .class=\${\`target target1\`}>Target 1</div>
        <div .class=\${\`target target2\`}>Target 2</div>
        <lit-moveable
            \${ref(this.t1)}
            .target=\${\`.target1\`}
            .litDraggable=\${true}
            .edgeDraggable=\${true}
            .origin=\${false}
            @litDragStart=\${handleDragStart}
        ></lit-moveable>
        <lit-moveable
            \${ref(this.t2)}
            .target=\${\`.target2\`}
            .litDraggable=\${true}
            .origin=\${false}
            .edgeDraggable=\${true}
            @litDragStart=\${handleDragStart}
        ></lit-moveable>
        <lit-moveable
            \${ref(this.groupMoveable)}
            .target=\${this.groupInstances}
            .hideDefaultLines=\${false}
            .litDraggable=\${true}
            @litDragGroup=\${this.onDragGroup}
            @litDragGroupEnd=\${this.onDragGroupEnd}
        ></lit-moveable>
    </div>
</div>\`;
    }
    initGroupElements() {
        const arr: any[] = [];
        arr.push(document.getElementsByClassName("target1")[0]);
        arr.push(document.getElementsByClassName("target2")[0]);
        this.groupInstances = arr;
    }
    handleDragStart(e: any) {
        initGroupElements();
        this.groupMoveable.value!.dragStart(e.inputEvent);
    }
    onDragGroup(e) {
        e.events.forEach((ev) => (ev.target.style.transform = ev.transform));
        this.t1.value.updateRect();
        this.t2.value.updateRect();
    }
    onDragGroupEnd() {
        this.groupInstances = [];
    }
}`})))()}var App_default$154;function init_App$10(){return(init_App$10=__esmMin((()=>{App_default$154=`import Moveable, { MoveableManagerInterface, Renderer } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();
        return React.createElement("div", {
            key: "dimension-viewer",
            className: "moveable-dimension",
            style: {
                position: "absolute",
                left: \`\${rect.width / 2}px\`,
                top: \`\${rect.height + 20}px\`,
                background: "#4af",
                borderRadius: "2px",
                padding: "2px 4px",
                color: "white",
                fontSize: "13px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                willChange: "transform",
                transform: \`translate(-50%, 0px)\`
            }
        }, [
            "\\n            Target\\n        "
        ]);
    }
} as const;
@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    @state()
    dragTarget: HTMLElement = undefiend;
    render() {
        return html \`<div class="container">
    <div
        class="target"
        \${ref(this.targetRef)}
    ></div>
    <lit-moveable
        .target=\${this.targetRef}
        .ables=\${[DimensionViewable]}
        .litDraggable=\${true}
        .resizable=\${true}
        .rotatable=\${true}
        .dragTarget=\${this.dragTarget}
        .props=\${{
            dimensionViewable: true
        }}
        @litDrag=\${this.onDrag}
        @litResize=\${this.onResize}
        @litRotate=\${this.onRotate}
    ></lit-moveable>
</div>\`;
    }
    firstUpdated() {
        this.dragTarget = document.querySelector<HTMLElement>(".moveable-dimension")!;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onResize(e) {
        e.target.style.width = \`\${e.width}px\`;
        e.target.style.height = \`\${e.height}px\`;
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var App_default$153;function init_App$11(){return(init_App$11=__esmMin((()=>{App_default$153=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div
    class="root"
    style="padding-bottom: 400px;"
>
    <div
        class="container"
        style="height: 900px;"
    >
        <div
            class="target element1"
            style="width: 100px;height: 100px;left: 0px;top: 120px;"
        >Element1</div>
        <div
            class="target element2"
            style="width: 100px;height: 100px;left: 400px;top: 120px;"
        >Element2</div>
        <div
            class="target element3"
            style="width: 300px;height: 100px;top: 400px;left: 50px;"
        >Element3</div>
        <div
            class="target target1"
            style="position: fixed;width: 150px;height: 150px;"
        >Target</div>
        <lit-moveable
            target=".target1"
            .litDraggable=\${true}
            .scalable=\${true}
            .rotatable=\${true}
            .snappable=\${true}
            .verticalGuidelines=\${[0, 100, 200]}
            .horizontalGuidelines=\${[0, 100, 200]}
            .elementGuidelines=\${[
            {
                            element: ".element1",
                            refresh: true
                        },
            ".element2",
            ".element3"
        ]}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$152;function init_App$12(){return(init_App$12=__esmMin((()=>{App_default$152=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div
        class="target"
        style="display: flex;flex-direction: column;align-items: center;gap: 21px;position: relative;width: 446px;height: 124px;z-index: 1;"
    ></div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .preventClickDefault=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$151;function init_App$13(){return(init_App$13=__esmMin((()=>{App_default$151=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    targets: any = ".target";
    render() {
        return html \`<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div class="target target3">Target3</div>
    <lit-moveable
        .target=\${this.targets}
        .litDraggable=\${true}
        @litDragGroup=\${this.onDragGroup}
        @litDragGroupEnd=\${this.onDragGroupEnd}
    ></lit-moveable>
</div>\`;
    }
    firstUpdated() {
        setTimeout(() => {
            this.targets = document.querySelectorAll(".target, .moveable-area");
        }, 100);
    }
    onDragGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
    onDragGroupEnd({ events }) {
        console.log(events);
    }
}`})))()}var App_default$150;function init_App$14(){return(init_App$14=__esmMin((()=>{App_default$150=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="border-radius: 10px;"
        >Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <lit-moveable
            .target=\${".target"}
            .litDraggable=\${true}
            .resizable=\${true}
            .rotatable=\${true}
            .padding=\${{ left: 10, top: 10, right: 10, bottom: 10 }}
            @litRenderGroup=\${this.onRenderGroup}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRenderGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    }
}`})))()}var App_default$149;function init_App$15(){return(init_App$15=__esmMin((()=>{App_default$149=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    arr: any = [];
    constructor() {
        super();
        for (let i = 0; i < 300; ++i) {
            this.arr.push(i);
        }
    }
    render() {
        return html \`<div class="root">
    <div class="container">\${this.arr.map(i => <>
                        html \`this.arr.map(i => <>
                        <div .class=\${\`target target\${i}\`}>Target</div>
                        <lit-moveable .target=\${\`.target\${i}\`} .litDraggable=\${true} @litRender=\${this.onRender}></lit-moveable>
                    </>)\`
                        html \`
        this.arr.map(i => <><div .class=\${\`target target\${i}\`}>Target</div><lit-moveable .target=\${\`.target\${i}\`} .litDraggable=\${true}
        @litRender
=
        $
        {
            this.onRender
        }
        >
</
        lit-moveable>
</
        >
    )
        \`
                    </>)}</div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$148;function init_App$16(){return(init_App$16=__esmMin((()=>{App_default$148=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <input
        type="text"
        class="target"
    ></input>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$147;function init_App$17(){return(init_App$17=__esmMin((()=>{App_default$147=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div
    class="container"
    style=""
>
    <div
        class="preview"
        style="position: relative;width: 800px;height: 800px;transform: scale(3.67123);transform-origin: 20% 20%;background: #eee;"
    >
        <div
            class="target target1"
            style="top: 0px;left: 0px;width: 142.1232px;transform: translate(150px, 100px);"
        >Target1</div>
        <div
            class="target target2"
            style="top: 0px;left: 100px;width: 142.1232px;transform: translate(150px, 100px);"
        >Target2</div>
    </div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .snappable=\${true}
        .snapDirections=\${{
            "top": true,
            "left": true,
            "bottom": true,
            "right": true,
            "center": true,
            "middle": true
        }}
        .elementSnapDirections=\${{
            "top": true,
            "left": true,
            "bottom": true,
            "right": true,
            "center": true,
            "middle": true
        }}
        .individualGroupable=\${true}
        .snapGap=\${true}
        .elementGuidelines=\${[".target1"]}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$146;function init_App$18(){return(init_App$18=__esmMin((()=>{App_default$146=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <svg
        viewBox="0 0 200 200"
        style="border: 1px solid black;width: 200px;height: 200px;"
    >
        <svg
            viewBox="0 0 200 200"
            style="border: 1px solid black;width: 200px;height: 200px;"
        >
            <path
                d="M 0 0 L 200 0 L 200 200 z"
                class="svg"
                style="fill: white;stroke: red;stroke-width: 2;"
            ></path>
        </svg>
    </svg>
    <lit-moveable
        .target=\${".svg"}
        .litDraggable=\${true}
        .preventClickDefault=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$145;function init_App$19(){return(init_App$19=__esmMin((()=>{App_default$145=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div class="target target1">
            Target
            <div class="target target2">Target</div>
        </div>
        <lit-moveable
            target=".target1"
            .litDraggable=\${true}
            .stopPropagation=\${true}
            @litDrag=\${this.onDrag}
        ></lit-moveable>
        <lit-moveable
            target=".target2"
            .litDraggable=\${true}
            .stopPropagation=\${true}
            @litDrag=\${this.onDrag$0}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onDrag$0(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$144;function init_App$20(){return(init_App$20=__esmMin((()=>{App_default$144=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div class="target">Target1</div>
    <lit-moveable
        .target=\${".aaa"}
        .litDraggable=\${true}
        .preventClickDefault=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$143;function init_App$21(){return(init_App$21=__esmMin((()=>{App_default$143=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="height: 100px;"
    >
        <div
            class="target"
            style="overflow: auto;"
            @scroll=\${this.onScroll}
        >
            <div
                class="scroll"
                style="width: 100%;height: 1000px;"
            ></div>
        </div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .resizable=\${true}
            .preventClickDefault=\${true}
            .litDraggable=\${true}
            @litDrag=\${this.onDrag}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onScroll() {
        this.moveableRef.value?.updateRect();
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$142;function init_App$22(){return(init_App$22=__esmMin((()=>{App_default$142=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="container">
    <button @click=\${this.onClick}>Request</button>
    <div class="target">Target</div>
    <lit-moveable
        \${ref(this.moveableRef)}
        .target=\${".target"}
        .litDraggable=\${true}
        .rotatable=\${true}
        .resizable=\${true}
        .snappable=\${true}
        .bounds=\${{
            left: 200,
            top: 0
        }}
        @litRender=\${this.onRender}
    ></lit-moveable>
</div>\`;
    }
    onClick() {
        this.moveableRef.value!.request("draggable", {
            isInstant: true,
            deltaX: 0,
            deltaY: 0
        });
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$141;function init_App$23(){return(init_App$23=__esmMin((()=>{App_default$141=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="container">
    <div class="nested first">
        No Transform
        <div class="nested scale">
            scale(1.5, 1.5)
            <div class="nested rotate">
                rotate(30deg)
                <div
                    class="target"
                    \${ref(this.targetRef)}
                >Target</div>
            </div>
        </div>
    </div>
    <lit-moveable
        .target=\${this.targetRef}
        .litDraggable=\${true}
        .throttleDrag=\${0}
        .startDragRotate=\${0}
        .throttleDragRotate=\${0}
        .zoom=\${1}
        .origin=\${true}
        .padding=\${{ left: 0, top: 0, right: 0, bottom: 0 }}
        .clippable=\${true}
        .clipRelative=\${false}
        .clipArea=\${false}
        .dragWithClip=\${false}
        .defaultClipPath=\${"inset"}
        .clipTargetBounds=\${true}
        .clipVerticalGuidelines=\${[0, 100, 200]}
        .clipHorizontalGuidelines=\${[0, 100, 200]}
        .snapThreshold=\${5}
        @litClip=\${this.onClip}
        @litRender=\${this.onRender}
    ></lit-moveable>
</div>\`;
    }
    onClip(e) {
        if (e.clipType === "rect") {
            e.target.style.clip = e.clipStyle;
        } else {
            e.target.style.clipPath = e.clipStyle;
        }
    }
    onRender(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$140;function init_App$24(){return(init_App$24=__esmMin((()=>{App_default$140=`import Moveable from "lit-moveable";
import "./safari.css";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="safari-app">
    <div class="safari-canvas">
        <div class="safari-pages">
            <div class="safari-target"></div>
            <lit-moveable
                .target=\${".safari-target"}
                .litDraggable=\${true}
                @litDrag=\${this.onDrag}
            ></lit-moveable>
        </div>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$139;function init_App$25(){return(init_App$25=__esmMin((()=>{App_default$139=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div
        class="target"
        style="transform: scale(1, 0);"
    >Target1</div>
    <lit-moveable
        .target=\${".target"}
        .scalable=\${true}
        .keepRatio=\${true}
        @litScaleStart=\${this.onScaleStart}
        @litScale=\${this.onScale}
    ></lit-moveable>
</div>\`;
    }
    onScaleStart(e) {
        e.setRatio(1);
    }
    onScale(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$138;function init_App$26(){return(init_App$26=__esmMin((()=>{App_default$138=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <p>No Stop</p>
    <input
        type="input"
        class="target1"
    ></input>
    <p>Stop Drag</p>
    <input
        type="input"
        class="target2"
    ></input>
    <p>Stop Drag</p>
    <select class="target3">
        <option>a</option>
        <option>b</option>
        <option>c</option>
    </select>
    <lit-moveable
        .target=\${".target1"}
        .litDraggable=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
    <lit-moveable
        .target=\${".target2"}
        .litDraggable=\${true}
        @litDragStart=\${this.onDragStart}
        @litDrag=\${this.onDrag$0}
    ></lit-moveable>
    <lit-moveable
        .target=\${".target3"}
        .litDraggable=\${true}
        @litDragStart=\${this.onDragStart$0}
        @litDrag=\${this.onDrag$1}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.cssText += e.cssText;
    }
    onDragStart(e) {
        if ([
            "input",
            "select"
        ].indexOf(e.target.tagName.toLowerCase()) > -1) {
            e.stopDrag();
        }
    }
    onDrag$0(e) {
        e.target.style.cssText += e.cssText;
    }
    onDragStart$0(e) {
        if ([
            "input",
            "select"
        ].indexOf(e.target.tagName.toLowerCase()) > -1) {
            e.stopDrag();
        }
    }
    onDrag$1(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$137;function init_App$27(){return(init_App$27=__esmMin((()=>{App_default$137=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div
    class="root"
    style="padding-top: 100px;"
>
    <div>
        <div
            style="position: relative;transform: translate3d(0px, 0px, 100px);"
        >
            <div
                class="target"
                style="translate: 100px 10px;rotate: 30deg;scale: 1 2;transform: translate(100px, 0px);"
            >Target</div>
        </div>
        <lit-moveable
            .target=\${".target"}
            .litDraggable=\${true}
            .rotatable=\${true}
            .resizable=\${true}
            .rootContainer=\${document.body}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$136;function init_App$28(){return(init_App$28=__esmMin((()=>{App_default$136=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            style="transform: translate(-50%, -50%);"
        >Target</div>
        <lit-moveable
            .target=\${".target"}
            .resizable=\${true}
            .preventClickDefault=\${true}
            .litDraggable=\${true}
            @litDrag=\${this.onDrag}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        console.log(e.dist);
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$135;function init_App$29(){return(init_App$29=__esmMin((()=>{App_default$135=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="no-container">
    <div class="will-change-container">
        <div class="will-change-target">Target1</div>
    </div>
    <lit-moveable
        .target=\${".will-change-target"}
        .litDraggable=\${true}
        .preventClickDefault=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var App_default$134;function init_App$30(){return(init_App$30=__esmMin((()=>{App_default$134=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="width: 500px;transform: translate(100px, 100px) scale(2);"
    >
        <div class="target">Target</div>
        <lit-moveable
            .target=\${".target"}
            .litDraggable=\${true}
            .scalable=\${true}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$133;function init_App$31(){return(init_App$31=__esmMin((()=>{App_default$133=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    elementGuidelines: HTMLElement[] = [];
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="width: 1000px;height: 1600px;transform: scale(0.47845);transform-origin: top left;background: #faa;"
    >
        <div
            class="target box-1"
            style="top: 0;left: 0;"
        >Target</div>
        <div
            class="target moveable box-2"
            style="width: 600px;height: 50px;top: 1400px;left: 150px;"
        >
            <p>Moveable 2</p>
        </div>
        <div
            class="target moveable box-3"
            style="width: 250px;height: 50px;top: 1300px;left: 350px;"
        >
            <p>Moveable 3</p>
        </div>
        <div
            class="target moveable box-4"
            style="width: 250px;height: 50px;top: 1200px;left: 200px;"
        >
            <p>Moveable 4</p>
        </div>
        <div
            class="target moveable box-5"
            style="width: 250px;height: 50px;top: 1200px;left: 500px;"
        >
            <p>Moveable 5</p>
        </div>
    </div>
    <lit-moveable
        .target=\${".box-1"}
        .litDraggable=\${true}
        .resizable=\${true}
        .snappable=\${true}
        .zoom=\${1}
        .elementGuidelines=\${this.elementGuidelines}
        .bounds=\${{
            top: 0,
            left: 0,
            right: 500,
            bottom: 800
        }}
        @litRender=\${this.onRender}
    ></lit-moveable>
</div>\`;
    }
    firstUpdated() {
        this.elementGuidelines = [].slice.call(document.querySelectorAll(".moveable"));
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$132;function init_App$32(){return(init_App$32=__esmMin((()=>{App_default$132=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div
    class="root"
    style="padding-top: 100px;"
>
    <div>
        <div
            style="position: relative;transform: translate3d(0px, 0px, 100px);"
        >
            <div style="position: relative;zoom: 0.5;">
                <div
                    class="target"
                    style="transform: translate(0px, 0px);"
                >Target</div>
            </div>
            <lit-moveable
                .target=\${".target"}
                .litDraggable=\${true}
                .rotatable=\${true}
                .resizable=\${true}
                .rootContainer=\${document.body}
                @litRender=\${this.onRender}
            ></lit-moveable>
        </div>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var App_default$131;function init_App$33(){return(init_App$33=__esmMin((()=>{App_default$131=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target">
        <a href="https://daybrush.com">Target1</a>
    </div>
</div>`})))()}var App_default$130;function init_App$34(){return(init_App$34=__esmMin((()=>{App_default$130=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    preventClickDefault: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$129;function init_App$35(){return(init_App$35=__esmMin((()=>{App_default$129=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <span data-croffle-ref="spanRef">Position</span>
    <div
        class="preview"
        style="position: relative;width: 800px;height: 800px;transform: scale(0.67123);transform-origin: top left;background: #eee;"
    >
        <div
            class="target"
            style="top: 0px;left: 0px;transform: translate(150px, 100px);"
        >Target</div>
    </div>
</div>`})))()}var App_default$128;function init_App$36(){return(init_App$36=__esmMin((()=>{App_default$128=`import Moveable from "moveable";

let spanRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
spanRef = document.querySelector(\`[data-croffle-ref="spanRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    snappable: true,
    snapContainer: ".preview",
    bounds: { left: 0, top: 0 }
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
    spanRef.innerHTML = \`\${e.translate[0]} x \${e.translate[1]}\`;
});`})))()}var App_default$127;function init_App$37(){return(init_App$37=__esmMin((()=>{App_default$127=`<div
    class="root"
    style="display: flex;justify-content: center;align-items: center;width: 700.2px;height: 700.2px;"
>
    <div
        class="container2"
        style="width: 299px;height: 299px;outline: 10px solid #ccc;"
        data-croffle-ref="containerRef"
    >
        <div
            class="target2"
            style="width: 100px;height: 100px;"
            data-croffle-ref="targetRef"
        >Target</div>
        <div data-croffle-ref="moveableRef"></div>
    </div>
</div>`})))()}var App_default$126;function init_App$38(){return(init_App$38=__esmMin((()=>{App_default$126=`import Moveable from "moveable";

let containerRef = null;
let targetRef = null;
let moveableRef = null;
containerRef = document.querySelector(\`[data-croffle-ref="containerRef"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
moveableRef = new Moveable(
    document.querySelector(\`[data-croffle-ref="moveableRef"]\`),
    {
        target: targetRef,
        draggable: true,
        edgeDraggable: false,
        startDragRotate: 0,
        throttleDragRotate: 0,
        keepRatio: false,
        throttleScale: 0,
        snappable: true,
        snapDirections: {
            top: true,
            left: true,
            bottom: true,
            right: true,
            center: true,
            middle: true
        },
        elementSnapDirections: {
            middle: true,
            center: true,
            top: true,
            left: true,
            bottom: true,
            right: true
        },
        snapThreshold: 5,
        elementGuidelines: [containerRef]
    }
);
moveableRef.on("drag", (e) => {
    e.target.style.transform = e.transform;
    targetRef.innerText = e.transform;
});
moveableRef.on("scale", (e) => {
    e.target.style.transform = e.drag.transform;
});`})))()}var App_default$125;function init_App$39(){return(init_App$39=__esmMin((()=>{App_default$125=`<div
    class="root"
    style="display: flex;justify-content: center;align-items: center;width: 700px;height: 700px;"
>
    <div
        class="container2"
        style="width: 499px;height: 499px;outline: 1px solid #ccc;"
        data-croffle-ref="containerRef"
    >
        <div
            class="target2"
            style="width: 200px;height: 200px;"
            data-croffle-ref="targetRef"
        >Target</div>
        <div data-croffle-ref="moveableRef"></div>
    </div>
</div>`})))()}var App_default$124;function init_App$40(){return(init_App$40=__esmMin((()=>{App_default$124=`import Moveable from "moveable";

let containerRef = null;
let targetRef = null;
let moveableRef = null;
containerRef = document.querySelector(\`[data-croffle-ref="containerRef"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
moveableRef = new Moveable(
    document.querySelector(\`[data-croffle-ref="moveableRef"]\`),
    {
        target: targetRef,
        draggable: true,
        scalable: true,
        edgeDraggable: false,
        startDragRotate: 0,
        throttleDragRotate: 0,
        keepRatio: false,
        throttleScale: 0,
        snappable: true,
        elementGuidelines: [containerRef],
        horizontalGuidelines: [150],
        verticalGuidelines: [220]
    }
);
moveableRef.on("drag", (e) => {
    e.target.style.cssText += e.cssText;
    targetRef.innerText = e.transform;
});
moveableRef.on("scale", (e) => {
    e.target.style.cssText += e.cssText;
    targetRef.innerText = e.cssText;
});`})))()}var App_default$123;function init_App$41(){return(init_App$41=__esmMin((()=>{App_default$123=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="elements selecto-area"
            data-croffle-ref="element$1"
        ></div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var App_default$122;function init_App$42(){return(init_App$42=__esmMin((()=>{App_default$122=`import Moveable from "moveable";

let targets = [".cube1", ".cube2"];
let moveableRef = null;
const cubes = [];
for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
element$1.innerHTML = cubes.map(i => {
    return \`<div class="\${\`cube cube\${i}\`}"></div>\`;
}).join("\\n");
moveableRef = new Moveable(element$0, { draggable: true, target: targets });
function setTargets(nextTargets) {
    targets = nextTargets;
    moveableRef.target = targets;
}
moveableRef.on("dragGroupStart", () => {
    requestAnimationFrame(() => {
        if (targets.length === 2) {
            setTargets([".cube1", ".cube2", ".cube3"]);
        } else if (targets.length === 3) {
            setTargets([".cube1", ".cube2", ".cube3", ".cube4"]);
        }
    });
});
moveableRef.on("drag", e => {
    e.target.style.cssText += e.cssText;
});
moveableRef.on("dragGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});`})))()}var App_default$121;function init_App$43(){return(init_App$43=__esmMin((()=>{App_default$121=`<div
    class="root"
    style="position: relative;border: 1px solid black;"
    data-croffle-ref="element$0"
>
    <div class="container">
        <div class="snapGrid">
            <div
                class="target"
                style="width: 200px;height: 150px;transform: translate(0px, 0px) scale(1.5, 1);"
            >Target</div>
        </div>
        <div class="snapGrid"></div>
    </div>
</div>`})))()}var App_default$120;function init_App$44(){return(init_App$44=__esmMin((()=>{App_default$120=`import Moveable from "moveable";
import "./snap.css";

let snapContainer = ".snapGrid";
const onMoustEnter = (e) => {
    setSnapContainer(e.currentTarget);
};
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    snappable: true,
    horizontalGuidelines: [0, 100, 200, 300],
    verticalGuidelines: [0, 100, 200, 300],
    snapContainer: snapContainer
});
function setSnapContainer(nextSnapContainer) {
    snapContainer = nextSnapContainer;
    moveable$0.snapContainer = snapContainer;
}
moveable$0.on("dragStart", () => {
    document.querySelectorAll(".snapGrid").forEach(grid => {
        grid.addEventListener("mouseenter", onMoustEnter);
    });
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
    e.target.style.pointerEvents = "none";
});
moveable$0.on("dragEnd", e => {
    e.target.style.pointerEvents = "";
    document.querySelectorAll(".snapGrid").forEach(grid => {
        grid.removeEventListener("mouseenter", onMoustEnter);
    });
});`})))()}var App_default$119;function init_App$45(){return(init_App$45=__esmMin((()=>{App_default$119=`<div class="root">
    <div
        class="container"
        style="height: 100px;"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var App_default$118;function init_App$46(){return(init_App$46=__esmMin((()=>{App_default$118=`import Moveable from "moveable";

let targetRef = null;
let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
moveableRef = new Moveable(element$0, {
    target: targetRef,
    resizable: true,
    preventClickDefault: true,
    draggable: true
});
element$0.addEventListener("click", () => {
    console.log("Click");
});
element$0.addEventListener("mouseDown", () => {
    console.log("MouseDown");
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$117;function init_App$47(){return(init_App$47=__esmMin((()=>{App_default$117=`<div
    class="container"
    style="border: 1px solid black;"
    data-croffle-ref="element$0"
>
    <p style="display: block;height: 20px;">{this.agent}</p>
    <custom-element style="display: block;padding: 10px;">
        <div
            id="draggable"
            slot="custom-element"
            style="position: relative;width: 150px;height: 150px;background-color: #e79627;"
        ></div>
    </custom-element>
</div>`})))()}var App_default$116;function init_App$48(){return(init_App$48=__esmMin((()=>{App_default$116=`import Moveable from "moveable";

const CustomElement = \`
class CustomElement extends HTMLElement {
    styleText = \${"\`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
\${"\`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \${"\`"}
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
\${"\`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
\`;
if (typeof window !== "undefined") {
    eval(CustomElement);
}
let agent = "";
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: "#draggable",
    draggable: true,
    snappable: true,
    bounds: { left: 0, top: 0 }
});
function setAgent(nextAgent) {
    agent = nextAgent;
}
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
setAgent(navigator.userAgent);`})))()}var App_default$115;function init_App$49(){return(init_App$49=__esmMin((()=>{App_default$115=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div style="width: 500px;height: 500px;border: 1px solid black;"></div>
    <img
        id="drag1"
        src="https://www.w3schools.com/html/img_w3slogo.gif"
        draggable="true"
        data-croffle-ref="element$1"/>
</div>`})))()}var App_default$114;function init_App$50(){return(init_App$50=__esmMin((()=>{App_default$114=`import Moveable from "moveable";

let moveableRef = null;
let target = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
moveableRef = new Moveable(element$0, {
    target: target,
    dragContainer: ".container",
    draggable: true,
    preventDefault: false
});
function setTarget(nextTarget) {
    target = nextTarget;
    moveableRef.target = target;
}
element$1.addEventListener("dragStart", e => {
    const nativeEvent = e.nativeEvent;
    if (!target) {
        moveableRef.waitToChangeTarget().then(() => {
            moveableRef.dragStart(nativeEvent);
        });
        setTarget(document.querySelector("#drag1"));
    }
});
moveableRef.on("drag", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$113;function init_App$51(){return(init_App$51=__esmMin((()=>{App_default$113=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div class={\`target target1\`}>Target 1</div>
        <div class={\`target target2\`}>Target 2</div>
    </div>
</div>`})))()}var App_default$112;function init_App$52(){return(init_App$52=__esmMin((()=>{App_default$112=`import Moveable from "moveable";

let groupInstances = [];
let t1 = null;
let t2 = null;
let groupMoveable = null;
const initGroupElements = function initGroupElements() {
    const arr = [];
    arr.push(document.getElementsByClassName("target1")[0]);
    arr.push(document.getElementsByClassName("target2")[0]);
    setGroupInstances(arr);
};
const handleDragStart = function handleDragStart(e) {
    initGroupElements();
    groupMoveable.dragStart(e.inputEvent);
};
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
t1 = new Moveable(element$0, {
    target: \`.target1\`,
    draggable: true,
    edgeDraggable: true,
    origin: false
});
t2 = new Moveable(element$0, {
    target: \`.target2\`,
    draggable: true,
    origin: false,
    edgeDraggable: true
});
groupMoveable = new Moveable(element$0, {
    target: groupInstances,
    hideDefaultLines: false,
    draggable: true
});
function setGroupInstances(nextGroupInstances) {
    groupInstances = nextGroupInstances;
    groupMoveable.target = groupInstances;
}
t1.on("dragStart", handleDragStart);
t2.on("dragStart", handleDragStart);
groupMoveable.on("dragGroup", (e) => {
    e.events.forEach((ev) => (ev.target.style.transform = ev.transform));
    t1.updateRect();
    t2.updateRect();
});
groupMoveable.on("dragGroupEnd", () => {
    setGroupInstances([]);
});`})))()}var App_default$111;function init_App$53(){return(init_App$53=__esmMin((()=>{App_default$111=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        data-croffle-ref="targetRef"
    ></div>
</div>`})))()}var App_default$110;function init_App$54(){return(init_App$54=__esmMin((()=>{App_default$110=`import Moveable, { MoveableManagerInterface, Renderer } from "moveable";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable, React) {
        const rect = moveable.getRect();
        return React.createElement("div", {
            key: "dimension-viewer",
            className: "moveable-dimension",
            style: {
                position: "absolute",
                left: \`\${rect.width / 2}px\`,
                top: \`\${rect.height + 20}px\`,
                background: "#4af",
                borderRadius: "2px",
                padding: "2px 4px",
                color: "white",
                fontSize: "13px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                willChange: "transform",
                transform: \`translate(-50%, 0px)\`
            }
        }, [
            "\\n            Target\\n        "
        ]);
    }
};
let targetRef = null;
let dragTarget = undefiend;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    ables: [DimensionViewable],
    draggable: true,
    resizable: true,
    rotatable: true,
    dragTarget: dragTarget,
    props: { dimensionViewable: true }
});
function setDragTarget(nextDragTarget) {
    dragTarget = nextDragTarget;
    moveable$0.dragTarget = dragTarget;
}
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});
setDragTarget(document.querySelector(".moveable-dimension"));`})))()}var App_default$109;function init_App$55(){return(init_App$55=__esmMin((()=>{App_default$109=`<div
    class="root"
    style="padding-bottom: 400px;"
>
    <div
        class="container"
        style="height: 900px;"
        data-croffle-ref="element$0"
    >
        <div
            class="target element1"
            style="width: 100px;height: 100px;left: 0px;top: 120px;"
        >Element1</div>
        <div
            class="target element2"
            style="width: 100px;height: 100px;left: 400px;top: 120px;"
        >Element2</div>
        <div
            class="target element3"
            style="width: 300px;height: 100px;top: 400px;left: 50px;"
        >Element3</div>
        <div
            class="target target1"
            style="position: fixed;width: 150px;height: 150px;"
        >Target</div>
    </div>
</div>`})))()}var App_default$108;function init_App$56(){return(init_App$56=__esmMin((()=>{App_default$108=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target1",
    draggable: true,
    scalable: true,
    rotatable: true,
    snappable: true,
    verticalGuidelines: [0, 100, 200],
    horizontalGuidelines: [0, 100, 200],
    elementGuidelines: [
        { element: ".element1", refresh: true },
        ".element2",
        ".element3"
    ]
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$107;function init_App$57(){return(init_App$57=__esmMin((()=>{App_default$107=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        style="display: flex;flex-direction: column;align-items: center;gap: 21px;position: relative;width: 446px;height: 124px;z-index: 1;"
    ></div>
</div>`})))()}var App_default$106;function init_App$58(){return(init_App$58=__esmMin((()=>{App_default$106=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    preventClickDefault: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$105;function init_App$59(){return(init_App$59=__esmMin((()=>{App_default$105=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div class="target target3">Target3</div>
</div>`})))()}var App_default$104;function init_App$60(){return(init_App$60=__esmMin((()=>{App_default$104=`import Moveable from "moveable";

let targets = ".target";
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targets,
    draggable: true
});
function setTargets(nextTargets) {
    targets = nextTargets;
    moveable$0.target = targets;
}
moveable$0.on("dragGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
moveable$0.on("dragGroupEnd", ({ events }) => {
    console.log(events);
});
setTimeout(() => {
    setTargets(document.querySelectorAll(".target, .moveable-area"));
}, 100);`})))()}var App_default$103;function init_App$61(){return(init_App$61=__esmMin((()=>{App_default$103=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target target1"
            style="border-radius: 10px;"
        >Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
    </div>
</div>`})))()}var App_default$102;function init_App$62(){return(init_App$62=__esmMin((()=>{App_default$102=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    resizable: true,
    rotatable: true,
    padding: { left: 10, top: 10, right: 10, bottom: 10 }
});
moveable$0.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});`})))()}var App_default$101;function init_App$63(){return(init_App$63=__esmMin((()=>{App_default$101=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    ></div>
</div>`})))()}var App_default$100;function init_App$64(){return(init_App$64=__esmMin((()=>{App_default$100=`import Moveable from "moveable";

const arr = [];
for (let i = 0; i < 300; ++i) {
    arr.push(i);
}
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
element$0.innerHTML = arr.map(i => {
    return \`\${;
}).join("\\n");`})))()}var App_default$99;function init_App$65(){return(init_App$65=__esmMin((()=>{App_default$99=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <input
        type="text"
        class="target"/>
</div>`})))()}var App_default$98;function init_App$66(){return(init_App$66=__esmMin((()=>{App_default$98=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$97;function init_App$67(){return(init_App$67=__esmMin((()=>{App_default$97=`<div
    class="container"
    style=""
    data-croffle-ref="element$0"
>
    <div
        class="preview"
        style="position: relative;width: 800px;height: 800px;transform: scale(3.67123);transform-origin: 20% 20%;background: #eee;"
    >
        <div
            class="target target1"
            style="top: 0px;left: 0px;width: 142.1232px;transform: translate(150px, 100px);"
        >Target1</div>
        <div
            class="target target2"
            style="top: 0px;left: 100px;width: 142.1232px;transform: translate(150px, 100px);"
        >Target2</div>
    </div>
</div>`})))()}var App_default$96;function init_App$68(){return(init_App$68=__esmMin((()=>{App_default$96=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    snappable: true,
    snapDirections: {
        "top": true,
        "left": true,
        "bottom": true,
        "right": true,
        "center": true,
        "middle": true
    },
    elementSnapDirections: {
        "top": true,
        "left": true,
        "bottom": true,
        "right": true,
        "center": true,
        "middle": true
    },
    individualGroupable: true,
    snapGap: true,
    elementGuidelines: [".target1"]
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$95;function init_App$69(){return(init_App$69=__esmMin((()=>{App_default$95=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <svg
        viewBox="0 0 200 200"
        style="border: 1px solid black;width: 200px;height: 200px;"
    >
        <svg
            viewBox="0 0 200 200"
            style="border: 1px solid black;width: 200px;height: 200px;"
        >
            <path
                d="M 0 0 L 200 0 L 200 200 z"
                class="svg"
                style="fill: white;stroke: red;stroke-width: 2;"/>
        </svg>
    </svg>
</div>`})))()}var App_default$94;function init_App$70(){return(init_App$70=__esmMin((()=>{App_default$94=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".svg",
    draggable: true,
    preventClickDefault: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$93;function init_App$71(){return(init_App$71=__esmMin((()=>{App_default$93=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div class="target target1">
            Target
            <div class="target target2">Target</div>
        </div>
    </div>
</div>`})))()}var App_default$92;function init_App$72(){return(init_App$72=__esmMin((()=>{App_default$92=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target1",
    draggable: true,
    stopPropagation: true
});
const moveable$1 = new Moveable(element$0, {
    target: ".target2",
    draggable: true,
    stopPropagation: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$1.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$91;function init_App$73(){return(init_App$73=__esmMin((()=>{App_default$91=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target">Target1</div>
</div>`})))()}var App_default$90;function init_App$74(){return(init_App$74=__esmMin((()=>{App_default$90=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".aaa",
    draggable: true,
    preventClickDefault: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$89;function init_App$75(){return(init_App$75=__esmMin((()=>{App_default$89=`<div class="root">
    <div
        class="container"
        style="height: 100px;"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="overflow: auto;"
            data-croffle-ref="element$1"
        >
            <div
                class="scroll"
                style="width: 100%;height: 1000px;"
            ></div>
        </div>
    </div>
</div>`})))()}var App_default$88;function init_App$76(){return(init_App$76=__esmMin((()=>{App_default$88=`import Moveable from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    resizable: true,
    preventClickDefault: true,
    draggable: true
});
element$1.addEventListener("scroll", () => {
    moveableRef?.updateRect();
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$87;function init_App$77(){return(init_App$77=__esmMin((()=>{App_default$87=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <button data-croffle-ref="element$1">Request</button>
    <div class="target">Target</div>
</div>`})))()}var App_default$86;function init_App$78(){return(init_App$78=__esmMin((()=>{App_default$86=`import Moveable from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    rotatable: true,
    resizable: true,
    snappable: true,
    bounds: { left: 200, top: 0 }
});
element$1.addEventListener("click", () => {
    moveableRef.request("draggable", {
        isInstant: true,
        deltaX: 0,
        deltaY: 0
    });
});
moveableRef.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$85;function init_App$79(){return(init_App$79=__esmMin((()=>{App_default$85=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="nested first">
        No Transform
        <div class="nested scale">
            scale(1.5, 1.5)
            <div class="nested rotate">
                rotate(30deg)
                <div
                    class="target"
                    data-croffle-ref="targetRef"
                >Target</div>
            </div>
        </div>
    </div>
</div>`})))()}var App_default$84;function init_App$80(){return(init_App$80=__esmMin((()=>{App_default$84=`import Moveable from "moveable";

let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: true,
    throttleDrag: 0,
    startDragRotate: 0,
    throttleDragRotate: 0,
    zoom: 1,
    origin: true,
    padding: { left: 0, top: 0, right: 0, bottom: 0 },
    clippable: true,
    clipRelative: false,
    clipArea: false,
    dragWithClip: false,
    defaultClipPath: "inset",
    clipTargetBounds: true,
    clipVerticalGuidelines: [0, 100, 200],
    clipHorizontalGuidelines: [0, 100, 200],
    snapThreshold: 5
});
moveable$0.on("clip", (e) => {
    if (e.clipType === "rect") {
        e.target.style.clip = e.clipStyle;
    } else {
        e.target.style.clipPath = e.clipStyle;
    }
});
moveable$0.on("render", (e) => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$83;function init_App$81(){return(init_App$81=__esmMin((()=>{App_default$83=`<div class="safari-app">
    <div class="safari-canvas">
        <div
            class="safari-pages"
            data-croffle-ref="element$0"
        >
            <div class="safari-target"/>
        </div>
    </div>
</div>`})))()}var App_default$82;function init_App$82(){return(init_App$82=__esmMin((()=>{App_default$82=`import Moveable from "moveable";
import "./safari.css";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".safari-target",
    draggable: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$81;function init_App$83(){return(init_App$83=__esmMin((()=>{App_default$81=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        style="transform: scale(1, 0);"
    >Target1</div>
</div>`})))()}var App_default$80;function init_App$84(){return(init_App$84=__esmMin((()=>{App_default$80=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    scalable: true,
    keepRatio: true
});
moveable$0.on("scaleStart", e => {
    e.setRatio(1);
});
moveable$0.on("scale", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$79;function init_App$85(){return(init_App$85=__esmMin((()=>{App_default$79=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <p>No Stop</p>
    <input
        type="input"
        class="target1"/>
    <p>Stop Drag</p>
    <input
        type="input"
        class="target2"/>
    <p>Stop Drag</p>
    <select class="target3">
        <option>a</option>
        <option>b</option>
        <option>c</option>
    </select>
</div>`})))()}var App_default$78;function init_App$86(){return(init_App$86=__esmMin((()=>{App_default$78=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target1",
    draggable: true
});
const moveable$1 = new Moveable(element$0, {
    target: ".target2",
    draggable: true
});
const moveable$2 = new Moveable(element$0, {
    target: ".target3",
    draggable: true
});
moveable$0.on("drag", e => {
    e.target.style.cssText += e.cssText;
});
moveable$1.on("dragStart", e => {
    if ([
        "input",
        "select"
    ].indexOf(e.target.tagName.toLowerCase()) > -1) {
        e.stopDrag();
    }
});
moveable$1.on("drag", e => {
    e.target.style.cssText += e.cssText;
});
moveable$2.on("dragStart", e => {
    if ([
        "input",
        "select"
    ].indexOf(e.target.tagName.toLowerCase()) > -1) {
        e.stopDrag();
    }
});
moveable$2.on("drag", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$77;function init_App$87(){return(init_App$87=__esmMin((()=>{App_default$77=`<div
    class="root"
    style="padding-top: 100px;"
>
    <div data-croffle-ref="element$0">
        <div
            style="position: relative;transform: translate3d(0px, 0px, 100px);"
        >
            <div
                class="target"
                style="translate: 100px 10px;rotate: 30deg;scale: 1 2;transform: translate(100px, 0px);"
            >Target</div>
        </div>
    </div>
</div>`})))()}var App_default$76;function init_App$88(){return(init_App$88=__esmMin((()=>{App_default$76=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    rotatable: true,
    resizable: true,
    rootContainer: document.body
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$75;function init_App$89(){return(init_App$89=__esmMin((()=>{App_default$75=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="transform: translate(-50%, -50%);"
        >Target</div>
    </div>
</div>`})))()}var App_default$74;function init_App$90(){return(init_App$90=__esmMin((()=>{App_default$74=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    resizable: true,
    preventClickDefault: true,
    draggable: true
});
moveable$0.on("drag", e => {
    console.log(e.dist);
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$73;function init_App$91(){return(init_App$91=__esmMin((()=>{App_default$73=`<div
    class="no-container"
    data-croffle-ref="element$0"
>
    <div class="will-change-container">
        <div class="will-change-target">Target1</div>
    </div>
</div>`})))()}var App_default$72;function init_App$92(){return(init_App$92=__esmMin((()=>{App_default$72=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".will-change-target",
    draggable: true,
    preventClickDefault: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var App_default$71;function init_App$93(){return(init_App$93=__esmMin((()=>{App_default$71=`<div class="root">
    <div
        class="container"
        style="width: 500px;transform: translate(100px, 100px) scale(2);"
        data-croffle-ref="element$0"
    >
        <div class="target">Target</div>
    </div>
</div>`})))()}var App_default$70;function init_App$94(){return(init_App$94=__esmMin((()=>{App_default$70=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    scalable: true
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$69;function init_App$95(){return(init_App$95=__esmMin((()=>{App_default$69=`<div
    class="root"
    data-croffle-ref="element$0"
>
    <div
        class="container"
        style="width: 1000px;height: 1600px;transform: scale(0.47845);transform-origin: top left;background: #faa;"
    >
        <div
            class="target box-1"
            style="top: 0;left: 0;"
        >Target</div>
        <div
            class="target moveable box-2"
            style="width: 600px;height: 50px;top: 1400px;left: 150px;"
        >
            <p>Moveable 2</p>
        </div>
        <div
            class="target moveable box-3"
            style="width: 250px;height: 50px;top: 1300px;left: 350px;"
        >
            <p>Moveable 3</p>
        </div>
        <div
            class="target moveable box-4"
            style="width: 250px;height: 50px;top: 1200px;left: 200px;"
        >
            <p>Moveable 4</p>
        </div>
        <div
            class="target moveable box-5"
            style="width: 250px;height: 50px;top: 1200px;left: 500px;"
        >
            <p>Moveable 5</p>
        </div>
    </div>
</div>`})))()}var App_default$68;function init_App$96(){return(init_App$96=__esmMin((()=>{App_default$68=`import Moveable from "moveable";

let elementGuidelines = [];
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".box-1",
    draggable: true,
    resizable: true,
    snappable: true,
    zoom: 1,
    elementGuidelines: elementGuidelines,
    bounds: { top: 0, left: 0, right: 500, bottom: 800 }
});
function setElementGuidelines(nextElementGuidelines) {
    elementGuidelines = nextElementGuidelines;
    moveable$0.elementGuidelines = elementGuidelines;
}
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});
setElementGuidelines([].slice.call(document.querySelectorAll(".moveable")));`})))()}var App_default$67;function init_App$97(){return(init_App$97=__esmMin((()=>{App_default$67=`<div
    class="root"
    style="padding-top: 100px;"
>
    <div>
        <div
            style="position: relative;transform: translate3d(0px, 0px, 100px);"
            data-croffle-ref="element$0"
        >
            <div style="position: relative;zoom: 0.5;">
                <div
                    class="target"
                    style="transform: translate(0px, 0px);"
                >Target</div>
            </div>
        </div>
    </div>
</div>`})))()}var App_default$66;function init_App$98(){return(init_App$98=__esmMin((()=>{App_default$66=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    rotatable: true,
    resizable: true,
    rootContainer: document.body
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var App_default$65;function init_App$99(){return(init_App$99=__esmMin((()=>{App_default$65=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div class="target">
        <a href="https://daybrush.com">Target1</a>
    </div>
    <Moveable
        target={".target"}
        draggable={true}
        preventClickDefault={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$64;function init_App$100(){return(init_App$100=__esmMin((()=>{App_default$64=`<script>
import Moveable from "svelte-moveable";

let spanRef = null;
<\/script>
<div class="container">
    <span bind:this={spanRef}>Position</span>
    <div
        class="preview"
        style="position: relative;width: 800px;height: 800px;transform: scale(0.67123);transform-origin: top left;background: #eee;"
    >
        <div
            class="target"
            style="top: 0px;left: 0px;transform: translate(150px, 100px);"
        >Target</div>
    </div>
    <Moveable
        target={".target"}
        draggable={true}
        snappable={true}
        snapContainer=".preview"
        bounds={{ left: 0, top: 0 }}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
            spanRef.innerHTML = \`\${e.translate[0]} x \${e.translate[1]}\`;
        }}/>
</div>`})))()}var App_default$63;function init_App$101(){return(init_App$101=__esmMin((()=>{App_default$63=`<script>
import Moveable from "svelte-moveable";

let containerRef = null;
let targetRef = null;
let moveableRef = null;
<\/script>
<div
    class="root"
    style="display: flex;justify-content: center;align-items: center;width: 700.2px;height: 700.2px;"
>
    <div
        bind:this={containerRef}
        class="container2"
        style="width: 299px;height: 299px;outline: 10px solid #ccc;"
    >
        <div
            class="target2"
            bind:this={targetRef}
            style="width: 100px;height: 100px;"
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={targetRef}
            draggable={true}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            keepRatio={false}
            throttleScale={0}
            snappable={true}
            snapDirections={{
                top: true,
                left: true,
                bottom: true,
                right: true,
                center: true,
                middle: true,
            }}
            elementSnapDirections={{
                middle: true,
                center: true,
                top: true,
                left: true,
                bottom: true,
                right: true,
            }}
            snapThreshold={5}
            elementGuidelines={[containerRef]}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
                targetRef.innerText = e.transform;
            }}
            on:scale={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var App_default$62;function init_App$102(){return(init_App$102=__esmMin((()=>{App_default$62=`<script>
import Moveable from "svelte-moveable";

let containerRef = null;
let targetRef = null;
let moveableRef = null;
<\/script>
<div
    class="root"
    style="display: flex;justify-content: center;align-items: center;width: 700px;height: 700px;"
>
    <div
        bind:this={containerRef}
        class="container2"
        style="width: 499px;height: 499px;outline: 1px solid #ccc;"
    >
        <div
            class="target2"
            bind:this={targetRef}
            style="width: 200px;height: 200px;"
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={targetRef}
            draggable={true}
            scalable={true}
            edgeDraggable={false}
            startDragRotate={0}
            throttleDragRotate={0}
            keepRatio={false}
            throttleScale={0}
            snappable={true}
            elementGuidelines={[containerRef]}
            horizontalGuidelines={[150]}
            verticalGuidelines={[220]}
            on:drag={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
                targetRef.innerText = e.transform;
            }}
            on:scale={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
                targetRef.innerText = e.cssText;
            }}/>
    </div>
</div>`})))()}var App_default$61;function init_App$103(){return(init_App$103=__esmMin((()=>{App_default$61=`<script>
import Moveable from "svelte-moveable";

let targets = [".cube1", ".cube2"];
let moveableRef = null;
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
            on:dragGroupStart={() => {
                requestAnimationFrame(() => {
                    if (targets.length === 2) {
                        targets = [".cube1", ".cube2", ".cube3"];
                    } else if (targets.length === 3) {
                        targets = [".cube1", ".cube2", ".cube3", ".cube4"];
                    }
                });
            }}
            on:drag={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}
            on:dragGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}
        ></Moveable>
        <div class="elements selecto-area">
            {#each cubes as i (i)}
                <div class={\`cube cube\${i}\`}></div>
            {/each}
        </div>
        <div class="empty elements"></div>
    </div>
</div>`})))()}var App_default$60;function init_App$104(){return(init_App$104=__esmMin((()=>{App_default$60=`<script>
import Moveable from "svelte-moveable";
import "./snap.css";

let snapContainer = ".snapGrid";
const onMoustEnter = (e) => {
    snapContainer = e.currentTarget;
};
<\/script>
<div
    class="root"
    style="position: relative;border: 1px solid black;"
>
    <Moveable
        target={".target"}
        draggable={true}
        snappable={true}
        horizontalGuidelines={[0, 100, 200, 300]}
        verticalGuidelines={[0, 100, 200, 300]}
        snapContainer={snapContainer}
        on:dragStart={() => {
            document.querySelectorAll(".snapGrid").forEach(grid => {
                grid.addEventListener("mouseenter", onMoustEnter);
            });
        }}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
            e.target.style.pointerEvents = "none";
        }}
        on:dragEnd={({ detail: e }) => {
            e.target.style.pointerEvents = "";
            document.querySelectorAll(".snapGrid").forEach(grid => {
                grid.removeEventListener("mouseenter", onMoustEnter);
            });
        }}/>
    <div class="container">
        <div class="snapGrid">
            <div
                class="target"
                style="width: 200px;height: 150px;transform: translate(0px, 0px) scale(1.5, 1);"
            >Target</div>
        </div>
        <div class="snapGrid"></div>
    </div>
</div>`})))()}var App_default$59;function init_App$105(){return(init_App$105=__esmMin((()=>{App_default$59=`<script>
import Moveable from "svelte-moveable";

let targetRef = null;
let moveableRef = null;
<\/script>
<div class="root">
    <div
        class="container"
        style="height: 100px;"
        on:click={() => {
            console.log("Click");
        }}
        on:mouseDown={() => {
            console.log("MouseDown");
        }}
    >
        <div
            class="target"
            bind:this={targetRef}
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={targetRef}
            resizable={true}
            preventClickDefault={true}
            draggable={true}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var App_default$58;function init_App$106(){return(init_App$106=__esmMin((()=>{App_default$58=`<script>
import Moveable from "svelte-moveable";
import { onMount } from "svelte";

const CustomElement = \`
class CustomElement extends HTMLElement {
    styleText = \${"\`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
\${"\`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \${"\`"}
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
\${"\`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
\`;
if (typeof window !== "undefined") {
    eval(CustomElement);
}
let agent = "";
onMount(() => {
    agent = navigator.userAgent;
});
<\/script>
<div
    class="container"
    style="border: 1px solid black;"
>
    <p style="display: block;height: 20px;">{agent}</p>
    <custom-element style="display: block;padding: 10px;">
        <div
            id="draggable"
            slot="custom-element"
            style="position: relative;width: 150px;height: 150px;background-color: #e79627;"
        ></div>
    </custom-element>
    <Moveable
        target={"#draggable"}
        draggable={true}
        snappable={true}
        bounds={{ left: 0, top: 0 }}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$57;function init_App$107(){return(init_App$107=__esmMin((()=>{App_default$57=`<script>
import Moveable from "svelte-moveable";

let moveableRef = null;
let target = null;
<\/script>
<div class="container">
    <div style="width: 500px;height: 500px;border: 1px solid black;"></div>
    <img
        id="drag1"
        src="https://www.w3schools.com/html/img_w3slogo.gif"
        draggable="true"
        on:dragStart={e => {
            const nativeEvent = e.nativeEvent;
            if (!target) {
                moveableRef.waitToChangeTarget().then(() => {
                    moveableRef.dragStart(nativeEvent);
                });
                target = document.querySelector("#drag1");
            }
        }}/>
    <Moveable
        bind:this={moveableRef}
        target={target}
        dragContainer={".container"}
        draggable={true}
        preventDefault={false}
        on:drag={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var App_default$56;function init_App$108(){return(init_App$108=__esmMin((()=>{App_default$56=`<script>
import Moveable from "svelte-moveable";

let groupInstances = [];
let t1 = null;
let t2 = null;
let groupMoveable = null;
const initGroupElements = function initGroupElements() {
    const arr = [];
    arr.push(document.getElementsByClassName("target1")[0]);
    arr.push(document.getElementsByClassName("target2")[0]);
    groupInstances = arr;
};
const handleDragStart = function handleDragStart(e) {
    initGroupElements();
    groupMoveable.dragStart(e.inputEvent);
};
<\/script>
<div class="root">
    <div class="container">
        <div class={\`target target1\`}>Target 1</div>
        <div class={\`target target2\`}>Target 2</div>
        <Moveable
            bind:this={t1}
            target={\`.target1\`}
            draggable={true}
            edgeDraggable={true}
            origin={false}
            on:dragStart={({ detail: e }) => handleDragStart(e)}/>
        <Moveable
            bind:this={t2}
            target={\`.target2\`}
            draggable={true}
            origin={false}
            edgeDraggable={true}
            on:dragStart={({ detail: e }) => handleDragStart(e)}/>
        <Moveable
            bind:this={groupMoveable}
            target={groupInstances}
            hideDefaultLines={false}
            draggable={true}
            on:dragGroup={({ detail: e }) => {
                e.events.forEach((ev) => (ev.target.style.transform = ev.transform));
                t1.updateRect();
                t2.updateRect();
            }}
            on:dragGroupEnd={() => {
                groupInstances = [];
            }}/>
    </div>
</div>`})))()}var App_default$55;function init_App$109(){return(init_App$109=__esmMin((()=>{App_default$55=`<script>
import Moveable, { MoveableManagerInterface, Renderer } from "svelte-moveable";
import { onMount } from "svelte";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable, React) {
        const rect = moveable.getRect();
        return React.createElement("div", {
            key: "dimension-viewer",
            className: "moveable-dimension",
            style: {
                position: "absolute",
                left: \`\${rect.width / 2}px\`,
                top: \`\${rect.height + 20}px\`,
                background: "#4af",
                borderRadius: "2px",
                padding: "2px 4px",
                color: "white",
                fontSize: "13px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                willChange: "transform",
                transform: \`translate(-50%, 0px)\`
            }
        }, [
            "\\n            Target\\n        "
        ]);
    }
};
let targetRef = null;
let dragTarget = undefiend;
onMount(() => {
    dragTarget = document.querySelector(".moveable-dimension");
});
<\/script>
<div class="container">
    <div
        class="target"
        bind:this={targetRef}
    ></div>
    <Moveable
        target={targetRef}
        ables={[DimensionViewable]}
        draggable={true}
        resizable={true}
        rotatable={true}
        dragTarget={dragTarget}
        props={{ dimensionViewable: true }}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}
        on:resize={({ detail: e }) => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        }}
        on:rotate={({ detail: e }) => {
            e.target.style.transform = e.drag.transform;
        }}/>
</div>`})))()}var App_default$54;function init_App$110(){return(init_App$110=__esmMin((()=>{App_default$54=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div
    class="root"
    style="padding-bottom: 400px;"
>
    <div
        class="container"
        style="height: 900px;"
    >
        <div
            class="target element1"
            style="width: 100px;height: 100px;left: 0px;top: 120px;"
        >Element1</div>
        <div
            class="target element2"
            style="width: 100px;height: 100px;left: 400px;top: 120px;"
        >Element2</div>
        <div
            class="target element3"
            style="width: 300px;height: 100px;top: 400px;left: 50px;"
        >Element3</div>
        <div
            class="target target1"
            style="position: fixed;width: 150px;height: 150px;"
        >Target</div>
        <Moveable
            target=".target1"
            draggable={true}
            scalable={true}
            rotatable={true}
            snappable={true}
            verticalGuidelines={[0, 100, 200]}
            horizontalGuidelines={[0, 100, 200]}
            elementGuidelines={[
                { element: ".element1", refresh: true },
                ".element2",
                ".element3"
            ]}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var App_default$53;function init_App$111(){return(init_App$111=__esmMin((()=>{App_default$53=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div
        class="target"
        style="display: flex;flex-direction: column;align-items: center;gap: 21px;position: relative;width: 446px;height: 124px;z-index: 1;"
    ></div>
    <Moveable
        target={".target"}
        draggable={true}
        preventClickDefault={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$52;function init_App$112(){return(init_App$112=__esmMin((()=>{App_default$52=`<script>
import Moveable from "svelte-moveable";
import { onMount } from "svelte";

let targets = ".target";
onMount(() => {
    setTimeout(() => {
        targets = document.querySelectorAll(".target, .moveable-area");
    }, 100);
});
<\/script>
<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div class="target target3">Target3</div>
    <Moveable
        target={targets}
        draggable={true}
        on:dragGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        }}
        on:dragGroupEnd={({ detail: { events } }) => {
            console.log(events);
        }}/>
</div>`})))()}var App_default$51;function init_App$113(){return(init_App$113=__esmMin((()=>{App_default$51=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="border-radius: 10px;"
        >Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            target={".target"}
            draggable={true}
            resizable={true}
            rotatable={true}
            padding={{ left: 10, top: 10, right: 10, bottom: 10 }}
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}/>
    </div>
</div>`})))()}var App_default$50;function init_App$114(){return(init_App$114=__esmMin((()=>{App_default$50=`<script>
import Moveable from "svelte-moveable";

const arr = [];
for (let i = 0; i < 300; ++i) {
    arr.push(i);
}
<\/script>
<div class="root">
    <div class="container">
        {#each arr as i}{/each}
    </div>
</div>`})))()}var App_default$49;function init_App$115(){return(init_App$115=__esmMin((()=>{App_default$49=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <input
        type="text"
        class="target"/>
    <Moveable
        target={".target"}
        draggable={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$48;function init_App$116(){return(init_App$116=__esmMin((()=>{App_default$48=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div
    class="container"
    style=""
>
    <div
        class="preview"
        style="position: relative;width: 800px;height: 800px;transform: scale(3.67123);transform-origin: 20% 20%;background: #eee;"
    >
        <div
            class="target target1"
            style="top: 0px;left: 0px;width: 142.1232px;transform: translate(150px, 100px);"
        >Target1</div>
        <div
            class="target target2"
            style="top: 0px;left: 100px;width: 142.1232px;transform: translate(150px, 100px);"
        >Target2</div>
    </div>
    <Moveable
        target={".target"}
        draggable={true}
        snappable={true}
        snapDirections={{
            "top": true,
            "left": true,
            "bottom": true,
            "right": true,
            "center": true,
            "middle": true,
        }}
        elementSnapDirections={{
            "top": true,
            "left": true,
            "bottom": true,
            "right": true,
            "center": true,
            "middle": true,
        }}
        individualGroupable={true}
        snapGap={true}
        elementGuidelines={[".target1"]}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$47;function init_App$117(){return(init_App$117=__esmMin((()=>{App_default$47=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <svg
        viewBox="0 0 200 200"
        style="border: 1px solid black;width: 200px;height: 200px;"
    >
        <svg
            viewBox="0 0 200 200"
            style="border: 1px solid black;width: 200px;height: 200px;"
        >
            <path
                d="M 0 0 L 200 0 L 200 200 z"
                class="svg"
                style="fill: white;stroke: red;stroke-width: 2;"/>
        </svg>
    </svg>
    <Moveable
        target={".svg"}
        draggable={true}
        preventClickDefault={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$46;function init_App$118(){return(init_App$118=__esmMin((()=>{App_default$46=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div class="target target1">
            Target
            <div class="target target2">Target</div>
        </div>
        <Moveable
            target=".target1"
            draggable={true}
            stopPropagation={true}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
        <Moveable
            target=".target2"
            draggable={true}
            stopPropagation={true}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var App_default$45;function init_App$119(){return(init_App$119=__esmMin((()=>{App_default$45=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div class="target">Target1</div>
    <Moveable
        target={".aaa"}
        draggable={true}
        preventClickDefault={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$44;function init_App$120(){return(init_App$120=__esmMin((()=>{App_default$44=`<script>
import Moveable from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="root">
    <div
        class="container"
        style="height: 100px;"
    >
        <div
            class="target"
            style="overflow: auto;"
            on:scroll={() => {
                moveableRef?.updateRect();
            }}
        >
            <div
                class="scroll"
                style="width: 100%;height: 1000px;"
            ></div>
        </div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            resizable={true}
            preventClickDefault={true}
            draggable={true}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var App_default$43;function init_App$121(){return(init_App$121=__esmMin((()=>{App_default$43=`<script>
import Moveable from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="container">
    <button on:click={() => {
        moveableRef.request("draggable", {
            isInstant: true,
            deltaX: 0,
            deltaY: 0,
        });
    }}>Request</button>
    <div class="target">Target</div>
    <Moveable
        bind:this={moveableRef}
        target={".target"}
        draggable={true}
        rotatable={true}
        resizable={true}
        snappable={true}
        bounds={{ left: 200, top: 0 }}
        on:render={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var App_default$42;function init_App$122(){return(init_App$122=__esmMin((()=>{App_default$42=`<script>
import Moveable from "svelte-moveable";

let targetRef = null;
<\/script>
<div class="container">
    <div class="nested first">
        No Transform
        <div class="nested scale">
            scale(1.5, 1.5)
            <div class="nested rotate">
                rotate(30deg)
                <div
                    class="target"
                    bind:this={targetRef}
                >Target</div>
            </div>
        </div>
    </div>
    <Moveable
        target={targetRef}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        clippable={true}
        clipRelative={false}
        clipArea={false}
        dragWithClip={false}
        defaultClipPath={"inset"}
        clipTargetBounds={true}
        clipVerticalGuidelines={[0, 100, 200]}
        clipHorizontalGuidelines={[0, 100, 200]}
        snapThreshold={5}
        on:clip={({ detail: e }) => {
            if (e.clipType === "rect") {
                e.target.style.clip = e.clipStyle;
            } else {
                e.target.style.clipPath = e.clipStyle;
            }
        }}
        on:render={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$41;function init_App$123(){return(init_App$123=__esmMin((()=>{App_default$41=`<script>
import Moveable from "svelte-moveable";
import "./safari.css";
<\/script>
<div class="safari-app">
    <div class="safari-canvas">
        <div class="safari-pages">
            <div class="safari-target"/>
            <Moveable
                target={".safari-target"}
                draggable={true}
                on:drag={({ detail: e }) => {
                    e.target.style.transform = e.transform;
                }}/>
        </div>
    </div>
</div>`})))()}var App_default$40;function init_App$124(){return(init_App$124=__esmMin((()=>{App_default$40=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div
        class="target"
        style="transform: scale(1, 0);"
    >Target1</div>
    <Moveable
        target={".target"}
        scalable={true}
        keepRatio={true}
        on:scaleStart={({ detail: e }) => {
            e.setRatio(1);
        }}
        on:scale={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var App_default$39;function init_App$125(){return(init_App$125=__esmMin((()=>{App_default$39=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <p>No Stop</p>
    <input
        type="input"
        class="target1"/>
    <p>Stop Drag</p>
    <input
        type="input"
        class="target2"/>
    <p>Stop Drag</p>
    <select class="target3">
        <option>a</option>
        <option>b</option>
        <option>c</option>
    </select>
    <Moveable
        target={".target1"}
        draggable={true}
        on:drag={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
    <Moveable
        target={".target2"}
        draggable={true}
        on:dragStart={({ detail: e }) => {
            if ([
                "input",
                "select"
            ].indexOf(e.target.tagName.toLowerCase()) > -1) {
                e.stopDrag();
            }
        }}
        on:drag={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
    <Moveable
        target={".target3"}
        draggable={true}
        on:dragStart={({ detail: e }) => {
            if ([
                "input",
                "select"
            ].indexOf(e.target.tagName.toLowerCase()) > -1) {
                e.stopDrag();
            }
        }}
        on:drag={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var App_default$38;function init_App$126(){return(init_App$126=__esmMin((()=>{App_default$38=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div
    class="root"
    style="padding-top: 100px;"
>
    <div>
        <div
            style="position: relative;transform: translate3d(0px, 0px, 100px);"
        >
            <div
                class="target"
                style="translate: 100px 10px;rotate: 30deg;scale: 1 2;transform: translate(100px, 0px);"
            >Target</div>
        </div>
        <Moveable
            target={".target"}
            draggable={true}
            rotatable={true}
            resizable={true}
            rootContainer={document.body}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}
        ></Moveable>
    </div>
</div>`})))()}var App_default$37;function init_App$127(){return(init_App$127=__esmMin((()=>{App_default$37=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            style="transform: translate(-50%, -50%);"
        >Target</div>
        <Moveable
            target={".target"}
            resizable={true}
            preventClickDefault={true}
            draggable={true}
            on:drag={({ detail: e }) => {
                console.log(e.dist);
            }}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var App_default$36;function init_App$128(){return(init_App$128=__esmMin((()=>{App_default$36=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="no-container">
    <div class="will-change-container">
        <div class="will-change-target">Target1</div>
    </div>
    <Moveable
        target={".will-change-target"}
        draggable={true}
        preventClickDefault={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
</div>`})))()}var App_default$35;function init_App$129(){return(init_App$129=__esmMin((()=>{App_default$35=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div
        class="container"
        style="width: 500px;transform: translate(100px, 100px) scale(2);"
    >
        <div class="target">Target</div>
        <Moveable
            target={".target"}
            draggable={true}
            scalable={true}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var App_default$34;function init_App$130(){return(init_App$130=__esmMin((()=>{App_default$34=`<script>
import Moveable from "svelte-moveable";
import { onMount } from "svelte";

let elementGuidelines = [];
onMount(() => {
    elementGuidelines = [].slice.call(document.querySelectorAll(".moveable"));
});
<\/script>
<div class="root">
    <div
        class="container"
        style="width: 1000px;height: 1600px;transform: scale(0.47845);transform-origin: top left;background: #faa;"
    >
        <div
            class="target box-1"
            style="top: 0;left: 0;"
        >Target</div>
        <div
            class="target moveable box-2"
            style="width: 600px;height: 50px;top: 1400px;left: 150px;"
        >
            <p>Moveable 2</p>
        </div>
        <div
            class="target moveable box-3"
            style="width: 250px;height: 50px;top: 1300px;left: 350px;"
        >
            <p>Moveable 3</p>
        </div>
        <div
            class="target moveable box-4"
            style="width: 250px;height: 50px;top: 1200px;left: 200px;"
        >
            <p>Moveable 4</p>
        </div>
        <div
            class="target moveable box-5"
            style="width: 250px;height: 50px;top: 1200px;left: 500px;"
        >
            <p>Moveable 5</p>
        </div>
    </div>
    <Moveable
        target={".box-1"}
        draggable={true}
        resizable={true}
        snappable={true}
        zoom={1}
        elementGuidelines={elementGuidelines}
        bounds={{ top: 0, left: 0, right: 500, bottom: 800 }}
        on:render={({ detail: e }) => {
            e.target.style.cssText += e.cssText;
        }}/>
</div>`})))()}var App_default$33;function init_App$131(){return(init_App$131=__esmMin((()=>{App_default$33=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div
    class="root"
    style="padding-top: 100px;"
>
    <div>
        <div
            style="position: relative;transform: translate3d(0px, 0px, 100px);"
        >
            <div style="position: relative;zoom: 0.5;">
                <div
                    class="target"
                    style="transform: translate(0px, 0px);"
                >Target</div>
            </div>
            <Moveable
                target={".target"}
                draggable={true}
                rotatable={true}
                resizable={true}
                rootContainer={document.body}
                on:render={({ detail: e }) => {
                    e.target.style.cssText += e.cssText;
                }}
            ></Moveable>
        </div>
    </div>
</div>`})))()}var App_default$32;function init_App$132(){return(init_App$132=__esmMin((()=>{App_default$32=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target">
            <a href="https://daybrush.com">Target1</a>
        </div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :preventClickDefault="true"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$31;function init_App$133(){return(init_App$133=__esmMin((()=>{App_default$31=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const spanRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
            spanRef.value.innerHTML = \`\${e.translate[0]} x \${e.translate[1]}\`;
        };
        return { spanRef, onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <span ref="spanRef">Position</span>
        <div
            class="preview"
            style="position: relative;width: 800px;height: 800px;transform: scale(0.67123);transform-origin: top left;background: #eee;"
        >
            <div
                class="target"
                style="top: 0px;left: 0px;transform: translate(150px, 100px);"
            >Target</div>
        </div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :snappable="true"
            snapContainer=".preview"
            :bounds="({ left: 0, top: 0 })"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$30;function init_App$134(){return(init_App$134=__esmMin((()=>{App_default$30=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const containerRef = ref(null);
        const targetRef = ref(null);
        const moveableRef = ref(null);
        const onDrag = (e) => {
            e.target.style.transform = e.transform;
            targetRef.value.innerText = e.transform;
        };
        const onScale = (e) => {
            e.target.style.transform = e.drag.transform;
        };
        return { containerRef, targetRef, moveableRef, onDrag, onScale };
    }
};
<\/script>
<template>
    <div
        class="root"
        style="display: flex;justify-content: center;align-items: center;width: 700.2px;height: 700.2px;"
    >
        <div
            ref="containerRef"
            class="container2"
            style="width: 299px;height: 299px;outline: 10px solid #ccc;"
        >
            <div
                class="target2"
                ref="targetRef"
                style="width: 100px;height: 100px;"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="targetRef"
                :draggable="true"
                :edgeDraggable="false"
                :startDragRotate="0"
                :throttleDragRotate="0"
                :keepRatio="false"
                :throttleScale="0"
                :snappable="true"
                :snapDirections="({ top: true, left: true, bottom: true, right: true, center: true, middle: true })"
                :elementSnapDirections="({ middle: true, center: true, top: true, left: true, bottom: true, right: true })"
                :snapThreshold="5"
                :elementGuidelines="[containerRef]"
                @drag="onDrag"
                @scale="onScale"/>
        </div>
    </div>
</template>`})))()}var App_default$29;function init_App$135(){return(init_App$135=__esmMin((()=>{App_default$29=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const containerRef = ref(null);
        const targetRef = ref(null);
        const moveableRef = ref(null);
        const onDrag = (e) => {
            e.target.style.cssText += e.cssText;
            targetRef.value.innerText = e.transform;
        };
        const onScale = (e) => {
            e.target.style.cssText += e.cssText;
            targetRef.value.innerText = e.cssText;
        };
        return { containerRef, targetRef, moveableRef, onDrag, onScale };
    }
};
<\/script>
<template>
    <div
        class="root"
        style="display: flex;justify-content: center;align-items: center;width: 700px;height: 700px;"
    >
        <div
            ref="containerRef"
            class="container2"
            style="width: 499px;height: 499px;outline: 1px solid #ccc;"
        >
            <div
                class="target2"
                ref="targetRef"
                style="width: 200px;height: 200px;"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="targetRef"
                :draggable="true"
                :scalable="true"
                :edgeDraggable="false"
                :startDragRotate="0"
                :throttleDragRotate="0"
                :keepRatio="false"
                :throttleScale="0"
                :snappable="true"
                :elementGuidelines="[containerRef]"
                :horizontalGuidelines="[150]"
                :verticalGuidelines="[220]"
                @drag="onDrag"
                @scale="onScale"/>
        </div>
    </div>
</template>`})))()}var App_default$28;function init_App$136(){return(init_App$136=__esmMin((()=>{App_default$28=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targets = ref([".cube1", ".cube2"]);
        const moveableRef = ref(null);
        const cubes = [];
        for (let i = 0; i < 30; ++i) {
            cubes.push(i);
        }
        const onDragGroupStart = () => {
            requestAnimationFrame(() => {
                if (targets.value.length === 2) {
                    targets.value = [".cube1", ".cube2", ".cube3"];
                } else if (targets.value.length === 3) {
                    targets.value = [".cube1", ".cube2", ".cube3", ".cube4"];
                }
            });
        };
        const onDrag = e => {
            e.target.style.cssText += e.cssText;
        };
        const onDragGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        return {
            moveableRef,
            targets,
            onDragGroupStart,
            onDrag,
            onDragGroup,
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
                @dragGroupStart="onDragGroupStart"
                @drag="onDrag"
                @dragGroup="onDragGroup"
            ></Moveable>
            <div class="elements selecto-area">
                <div
                    :class="\`cube cube\${i}\`"
                    :key="i"
                    v-for="i in cubes"
                ></div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>`})))()}var App_default$27;function init_App$137(){return(init_App$137=__esmMin((()=>{App_default$27=`<script>
import Moveable from "vue3-moveable";
import "./snap.css";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const snapContainer = ref(".snapGrid");
        const onMoustEnter = (e) => {
            snapContainer.value = e.currentTarget;
        };
        const onDragStart = () => {
            document.querySelectorAll(".snapGrid").forEach(grid => {
                grid.addEventListener("mouseenter", onMoustEnter);
            });
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
            e.target.style.pointerEvents = "none";
        };
        const onDragEnd = e => {
            e.target.style.pointerEvents = "";
            document.querySelectorAll(".snapGrid").forEach(grid => {
                grid.removeEventListener("mouseenter", onMoustEnter);
            });
        };
        return { snapContainer, onDragStart, onDrag, onDragEnd };
    }
};
<\/script>
<template>
    <div
        class="root"
        style="position: relative;border: 1px solid black;"
    >
        <Moveable
            :target="'.target'"
            :draggable="true"
            :snappable="true"
            :horizontalGuidelines="[0, 100, 200, 300]"
            :verticalGuidelines="[0, 100, 200, 300]"
            :snapContainer="snapContainer"
            @dragStart="onDragStart"
            @drag="onDrag"
            @dragEnd="onDragEnd"/>
        <div class="container">
            <div class="snapGrid">
                <div
                    class="target"
                    style="width: 200px;height: 150px;transform: translate(0px, 0px) scale(1.5, 1);"
                >Target</div>
            </div>
            <div class="snapGrid"></div>
        </div>
    </div>
</template>`})))()}var App_default$26;function init_App$138(){return(init_App$138=__esmMin((()=>{App_default$26=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const moveableRef = ref(null);
        const onClick = () => {
            console.log("Click");
        };
        const onMouseDown = () => {
            console.log("MouseDown");
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onClick, onMouseDown, targetRef, moveableRef, onDrag };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="height: 100px;"
            @click="onClick"
            @mouseDown="onMouseDown"
        >
            <div
                class="target"
                ref="targetRef"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="targetRef"
                :resizable="true"
                :preventClickDefault="true"
                :draggable="true"
                @drag="onDrag"/>
        </div>
    </div>
</template>`})))()}var App_default$25;function init_App$139(){return(init_App$139=__esmMin((()=>{App_default$25=`<script>
import Moveable from "vue3-moveable";
import { ref, onMounted } from "vue";

const CustomElement = \`
class CustomElement extends HTMLElement {
    styleText = \${"\`"}
.card {
width: 100%;
height: 100%;
}

.card-header {
width:100%;
height: 80px;
background-color: #3794FF;
}

.card-content {
    width: 100%;
    height: calc(100% - 80px);
    background-color: #EDF0F3;
    position: relative;
}

.card-inner {
    position: relative;
    top: 50px;
    left: 50px;
}
\${"\`"};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = \${"\`"}
<div class="card-header"></div>
<div class="card-content">
    <div class="card-inner">
        <slot name="custom-element"></slot>
    </div>
</div>
\${"\`"};
        style.textContent = this.styleText;
        this.shadow.appendChild(style);
        this.shadow.appendChild(div);
    }
}
if (!customElements.get("custom-element")) {
    customElements.define('custom-element', CustomElement);
}
\`;
if (typeof window !== "undefined") {
    eval(CustomElement);
}
export default {
    components: { Moveable },
    setup() {
        const agent = ref("");
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        onMounted(() => {
            agent.value = navigator.userAgent;
        });
        return { agent, onDrag };
    }
};
<\/script>
<template>
    <div
        class="container"
        style="border: 1px solid black;"
    >
        <p style="display: block;height: 20px;">{{agent}}</p>
        <custom-element style="display: block;padding: 10px;">
            <div
                id="draggable"
                slot="custom-element"
                style="position: relative;width: 150px;height: 150px;background-color: #e79627;"
            ></div>
        </custom-element>
        <Moveable
            :target="'#draggable'"
            :draggable="true"
            :snappable="true"
            :bounds="({ left: 0, top: 0 })"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$24;function init_App$140(){return(init_App$140=__esmMin((()=>{App_default$24=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const target = ref(null);
        const onDragStart = e => {
            const nativeEvent = e.nativeEvent;
            if (!target.value) {
                moveableRef.value.waitToChangeTarget().then(() => {
                    moveableRef.value.dragStart(nativeEvent);
                });
                target.value = document.querySelector("#drag1");
            }
        };
        const onDrag = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onDragStart, moveableRef, target, onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <div style="width: 500px;height: 500px;border: 1px solid black;"></div>
        <img
            id="drag1"
            src="https://www.w3schools.com/html/img_w3slogo.gif"
            draggable="true"
            @dragStart="onDragStart"/>
        <Moveable
            ref="moveableRef"
            :target="target"
            :dragContainer="'.container'"
            :draggable="true"
            :preventDefault="false"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$23;function init_App$141(){return(init_App$141=__esmMin((()=>{App_default$23=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const groupInstances = ref([]);
        const t1 = ref(null);
        const t2 = ref(null);
        const groupMoveable = ref(null);
        const initGroupElements = function initGroupElements() {
            const arr = [];
            arr.push(document.getElementsByClassName("target1")[0]);
            arr.push(document.getElementsByClassName("target2")[0]);
            groupInstances.value = arr;
        };
        const handleDragStart = function handleDragStart(e) {
            initGroupElements();
            groupMoveable.value.dragStart(e.inputEvent);
        };
        const onDragGroup = (e) => {
            e.events.forEach((ev) => (ev.target.style.transform = ev.transform));
            t1.value.updateRect();
            t2.value.updateRect();
        };
        const onDragGroupEnd = () => {
            groupInstances.value = [];
        };
        return {
            t1,
            handleDragStart,
            t2,
            groupMoveable,
            groupInstances,
            onDragGroup,
            onDragGroupEnd
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div :class="\`target target1\`">Target 1</div>
            <div :class="\`target target2\`">Target 2</div>
            <Moveable
                ref="t1"
                :target="\`.target1\`"
                :draggable="true"
                :edgeDraggable="true"
                :origin="false"
                @dragStart="handleDragStart"/>
            <Moveable
                ref="t2"
                :target="\`.target2\`"
                :draggable="true"
                :origin="false"
                :edgeDraggable="true"
                @dragStart="handleDragStart"/>
            <Moveable
                ref="groupMoveable"
                :target="groupInstances"
                :hideDefaultLines="false"
                :draggable="true"
                @dragGroup="onDragGroup"
                @dragGroupEnd="onDragGroupEnd"/>
        </div>
    </div>
</template>`})))()}var App_default$22;function init_App$142(){return(init_App$142=__esmMin((()=>{App_default$22=`<script>
import Moveable, { MoveableManagerInterface, Renderer } from "vue3-moveable";
import { ref, onMounted } from "vue";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable, React) {
        const rect = moveable.getRect();
        return React.createElement("div", {
            key: "dimension-viewer",
            className: "moveable-dimension",
            style: {
                position: "absolute",
                left: \`\${rect.width / 2}px\`,
                top: \`\${rect.height + 20}px\`,
                background: "#4af",
                borderRadius: "2px",
                padding: "2px 4px",
                color: "white",
                fontSize: "13px",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                willChange: "transform",
                transform: \`translate(-50%, 0px)\`
            }
        }, [
            "\\n            Target\\n        "
        ]);
    }
};
export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const dragTarget = ref(undefiend);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onResize = e => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        onMounted(() => {
            dragTarget.value = document.querySelector(".moveable-dimension");
        });
        return {
            targetRef,
            DimensionViewable,
            dragTarget,
            onDrag,
            onResize,
            onRotate
        };
    }
};
<\/script>
<template>
    <div class="container">
        <div
            class="target"
            ref="targetRef"
        ></div>
        <Moveable
            :target="targetRef"
            :ables="[DimensionViewable]"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :dragTarget="dragTarget"
            :props="({ dimensionViewable: true })"
            @drag="onDrag"
            @resize="onResize"
            @rotate="onRotate"/>
    </div>
</template>`})))()}var App_default$21;function init_App$143(){return(init_App$143=__esmMin((()=>{App_default$21=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onRender };
    }
};
<\/script>
<template>
    <div
        class="root"
        style="padding-bottom: 400px;"
    >
        <div
            class="container"
            style="height: 900px;"
        >
            <div
                class="target element1"
                style="width: 100px;height: 100px;left: 0px;top: 120px;"
            >Element1</div>
            <div
                class="target element2"
                style="width: 100px;height: 100px;left: 400px;top: 120px;"
            >Element2</div>
            <div
                class="target element3"
                style="width: 300px;height: 100px;top: 400px;left: 50px;"
            >Element3</div>
            <div
                class="target target1"
                style="position: fixed;width: 150px;height: 150px;"
            >Target</div>
            <Moveable
                target=".target1"
                :draggable="true"
                :scalable="true"
                :rotatable="true"
                :snappable="true"
                :verticalGuidelines="[0, 100, 200]"
                :horizontalGuidelines="[0, 100, 200]"
                :elementGuidelines="[{ element: '.element1', refresh: true }, '.element2', '.element3']"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var App_default$20;function init_App$144(){return(init_App$144=__esmMin((()=>{App_default$20=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <div
            class="target"
            style="display: flex;flex-direction: column;align-items: center;gap: 21px;position: relative;width: 446px;height: 124px;z-index: 1;"
        ></div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :preventClickDefault="true"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$19;function init_App$145(){return(init_App$145=__esmMin((()=>{App_default$19=`<script>
import Moveable from "vue3-moveable";
import { ref, onMounted } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targets = ref(".target");
        const onDragGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        const onDragGroupEnd = ({ events }) => {
            console.log(events);
        };
        onMounted(() => {
            setTimeout(() => {
                targets.value = document.querySelectorAll(".target, .moveable-area");
            }, 100);
        });
        return { targets, onDragGroup, onDragGroupEnd };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            :target="targets"
            :draggable="true"
            @dragGroup="onDragGroup"
            @dragGroupEnd="onDragGroupEnd"/>
    </div>
</template>`})))()}var App_default$18;function init_App$146(){return(init_App$146=__esmMin((()=>{App_default$18=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        return { onRenderGroup };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target target1"
                style="border-radius: 10px;"
            >Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                :target="'.target'"
                :draggable="true"
                :resizable="true"
                :rotatable="true"
                :padding="({ left: 10, top: 10, right: 10, bottom: 10 })"
                @renderGroup="onRenderGroup"/>
        </div>
    </div>
</template>`})))()}var App_default$17;function init_App$147(){return(init_App$147=__esmMin((()=>{App_default$17=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const arr = [];
        for (let i = 0; i < 300; ++i) {
            arr.push(i);
        }
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { arr, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <template v-for="i in arr"></template>
        </div>
    </div>
</template>`})))()}var App_default$16;function init_App$148(){return(init_App$148=__esmMin((()=>{App_default$16=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <input
            type="text"
            class="target"/>
        <Moveable
            :target="'.target'"
            :draggable="true"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$15;function init_App$149(){return(init_App$149=__esmMin((()=>{App_default$15=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div
        class="container"
        style=""
    >
        <div
            class="preview"
            style="position: relative;width: 800px;height: 800px;transform: scale(3.67123);transform-origin: 20% 20%;background: #eee;"
        >
            <div
                class="target target1"
                style="top: 0px;left: 0px;width: 142.1232px;transform: translate(150px, 100px);"
            >Target1</div>
            <div
                class="target target2"
                style="top: 0px;left: 100px;width: 142.1232px;transform: translate(150px, 100px);"
            >Target2</div>
        </div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :snappable="true"
            :snapDirections="({ 'top': true, 'left': true, 'bottom': true, 'right': true, 'center': true, 'middle': true })"
            :elementSnapDirections="({ 'top': true, 'left': true, 'bottom': true, 'right': true, 'center': true, 'middle': true })"
            :individualGroupable="true"
            :snapGap="true"
            :elementGuidelines="['.target1']"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$14;function init_App$150(){return(init_App$150=__esmMin((()=>{App_default$14=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <svg
            viewBox="0 0 200 200"
            style="border: 1px solid black;width: 200px;height: 200px;"
        >
            <svg
                viewBox="0 0 200 200"
                style="border: 1px solid black;width: 200px;height: 200px;"
            >
                <path
                    d="M 0 0 L 200 0 L 200 200 z"
                    class="svg"
                    style="fill: white;stroke: red;stroke-width: 2;"/>
            </svg>
        </svg>
        <Moveable
            :target="'.svg'"
            :draggable="true"
            :preventClickDefault="true"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$13;function init_App$151(){return(init_App$151=__esmMin((()=>{App_default$13=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onDrag$0 = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag, onDrag$0 };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div class="target target1">
                Target
                <div class="target target2">Target</div>
            </div>
            <Moveable
                target=".target1"
                :draggable="true"
                :stopPropagation="true"
                @drag="onDrag"/>
            <Moveable
                target=".target2"
                :draggable="true"
                :stopPropagation="true"
                @drag="onDrag$0"/>
        </div>
    </div>
</template>`})))()}var App_default$12;function init_App$152(){return(init_App$152=__esmMin((()=>{App_default$12=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target">Target1</div>
        <Moveable
            :target="'.aaa'"
            :draggable="true"
            :preventClickDefault="true"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$11;function init_App$153(){return(init_App$153=__esmMin((()=>{App_default$11=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onScroll = () => {
            moveableRef.value?.updateRect();
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onScroll, moveableRef, onDrag };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="height: 100px;"
        >
            <div
                class="target"
                style="overflow: auto;"
                @scroll="onScroll"
            >
                <div
                    class="scroll"
                    style="width: 100%;height: 1000px;"
                ></div>
            </div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :resizable="true"
                :preventClickDefault="true"
                :draggable="true"
                @drag="onDrag"/>
        </div>
    </div>
</template>`})))()}var App_default$10;function init_App$154(){return(init_App$154=__esmMin((()=>{App_default$10=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onClick = () => {
            moveableRef.value.request("draggable", {
                isInstant: true,
                deltaX: 0,
                deltaY: 0
            });
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onClick, moveableRef, onRender };
    }
};
<\/script>
<template>
    <div class="container">
        <button @click="onClick">Request</button>
        <div class="target">Target</div>
        <Moveable
            ref="moveableRef"
            :target="'.target'"
            :draggable="true"
            :rotatable="true"
            :resizable="true"
            :snappable="true"
            :bounds="({ left: 200, top: 0 })"
            @render="onRender"/>
    </div>
</template>`})))()}var App_default$9;function init_App$155(){return(init_App$155=__esmMin((()=>{App_default$9=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const onClip = (e) => {
            if (e.clipType === "rect") {
                e.target.style.clip = e.clipStyle;
            } else {
                e.target.style.clipPath = e.clipStyle;
            }
        };
        const onRender = (e) => {
            e.target.style.transform = e.transform;
        };
        return { targetRef, onClip, onRender };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="nested first">
            No Transform
            <div class="nested scale">
                scale(1.5, 1.5)
                <div class="nested rotate">
                    rotate(30deg)
                    <div
                        class="target"
                        ref="targetRef"
                    >Target</div>
                </div>
            </div>
        </div>
        <Moveable
            :target="targetRef"
            :draggable="true"
            :throttleDrag="0"
            :startDragRotate="0"
            :throttleDragRotate="0"
            :zoom="1"
            :origin="true"
            :padding="({ left: 0, top: 0, right: 0, bottom: 0 })"
            :clippable="true"
            :clipRelative="false"
            :clipArea="false"
            :dragWithClip="false"
            :defaultClipPath="'inset'"
            :clipTargetBounds="true"
            :clipVerticalGuidelines="[0, 100, 200]"
            :clipHorizontalGuidelines="[0, 100, 200]"
            :snapThreshold="5"
            @clip="onClip"
            @render="onRender"/>
    </div>
</template>`})))()}var App_default$8;function init_App$156(){return(init_App$156=__esmMin((()=>{App_default$8=`<script>
import Moveable from "vue3-moveable";
import "./safari.css";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="safari-app">
        <div class="safari-canvas">
            <div class="safari-pages">
                <div class="safari-target"/>
                <Moveable
                    :target="'.safari-target'"
                    :draggable="true"
                    @drag="onDrag"/>
            </div>
        </div>
    </div>
</template>`})))()}var App_default$7;function init_App$157(){return(init_App$157=__esmMin((()=>{App_default$7=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onScaleStart = e => {
            e.setRatio(1);
        };
        const onScale = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onScaleStart, onScale };
    }
};
<\/script>
<template>
    <div class="container">
        <div
            class="target"
            style="transform: scale(1, 0);"
        >Target1</div>
        <Moveable
            :target="'.target'"
            :scalable="true"
            :keepRatio="true"
            @scaleStart="onScaleStart"
            @scale="onScale"/>
    </div>
</template>`})))()}var App_default$6;function init_App$158(){return(init_App$158=__esmMin((()=>{App_default$6=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.cssText += e.cssText;
        };
        const onDragStart = e => {
            if ([
                "input",
                "select"
            ].indexOf(e.target.tagName.toLowerCase()) > -1) {
                e.stopDrag();
            }
        };
        const onDrag$0 = e => {
            e.target.style.cssText += e.cssText;
        };
        const onDragStart$0 = e => {
            if ([
                "input",
                "select"
            ].indexOf(e.target.tagName.toLowerCase()) > -1) {
                e.stopDrag();
            }
        };
        const onDrag$1 = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onDrag, onDragStart, onDrag$0, onDragStart$0, onDrag$1 };
    }
};
<\/script>
<template>
    <div class="container">
        <p>No Stop</p>
        <input
            type="input"
            class="target1"/>
        <p>Stop Drag</p>
        <input
            type="input"
            class="target2"/>
        <p>Stop Drag</p>
        <select class="target3">
            <option>a</option>
            <option>b</option>
            <option>c</option>
        </select>
        <Moveable
            :target="'.target1'"
            :draggable="true"
            @drag="onDrag"/>
        <Moveable
            :target="'.target2'"
            :draggable="true"
            @dragStart="onDragStart"
            @drag="onDrag$0"/>
        <Moveable
            :target="'.target3'"
            :draggable="true"
            @dragStart="onDragStart$0"
            @drag="onDrag$1"/>
    </div>
</template>`})))()}var App_default$5;function init_App$159(){return(init_App$159=__esmMin((()=>{App_default$5=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { document, onRender };
    }
};
<\/script>
<template>
    <div
        class="root"
        style="padding-top: 100px;"
    >
        <div>
            <div
                style="position: relative;transform: translate3d(0px, 0px, 100px);"
            >
                <div
                    class="target"
                    style="translate: 100px 10px;rotate: 30deg;scale: 1 2;transform: translate(100px, 0px);"
                >Target</div>
            </div>
            <Moveable
                :target="'.target'"
                :draggable="true"
                :rotatable="true"
                :resizable="true"
                :rootContainer="document.body"
                @render="onRender"
            ></Moveable>
        </div>
    </div>
</template>`})))()}var App_default$4;function init_App$160(){return(init_App$160=__esmMin((()=>{App_default$4=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            console.log(e.dist);
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onDrag, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                style="transform: translate(-50%, -50%);"
            >Target</div>
            <Moveable
                :target="'.target'"
                :resizable="true"
                :preventClickDefault="true"
                :draggable="true"
                @drag="onDrag"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var App_default$3;function init_App$161(){return(init_App$161=__esmMin((()=>{App_default$3=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return { onDrag };
    }
};
<\/script>
<template>
    <div class="no-container">
        <div class="will-change-container">
            <div class="will-change-target">Target1</div>
        </div>
        <Moveable
            :target="'.will-change-target'"
            :draggable="true"
            :preventClickDefault="true"
            @drag="onDrag"/>
    </div>
</template>`})))()}var App_default$2;function init_App$162(){return(init_App$162=__esmMin((()=>{App_default$2=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="width: 500px;transform: translate(100px, 100px) scale(2);"
        >
            <div class="target">Target</div>
            <Moveable
                :target="'.target'"
                :draggable="true"
                :scalable="true"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var App_default$1;function init_App$163(){return(init_App$163=__esmMin((()=>{App_default$1=`<script>
import Moveable from "vue3-moveable";
import { ref, onMounted } from "vue";

export default {
    components: { Moveable },
    setup() {
        const elementGuidelines = ref([]);
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        onMounted(() => {
            elementGuidelines.value = [].slice.call(document.querySelectorAll(".moveable"));
        });
        return { elementGuidelines, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="width: 1000px;height: 1600px;transform: scale(0.47845);transform-origin: top left;background: #faa;"
        >
            <div
                class="target box-1"
                style="top: 0;left: 0;"
            >Target</div>
            <div
                class="target moveable box-2"
                style="width: 600px;height: 50px;top: 1400px;left: 150px;"
            >
                <p>Moveable 2</p>
            </div>
            <div
                class="target moveable box-3"
                style="width: 250px;height: 50px;top: 1300px;left: 350px;"
            >
                <p>Moveable 3</p>
            </div>
            <div
                class="target moveable box-4"
                style="width: 250px;height: 50px;top: 1200px;left: 200px;"
            >
                <p>Moveable 4</p>
            </div>
            <div
                class="target moveable box-5"
                style="width: 250px;height: 50px;top: 1200px;left: 500px;"
            >
                <p>Moveable 5</p>
            </div>
        </div>
        <Moveable
            :target="'.box-1'"
            :draggable="true"
            :resizable="true"
            :snappable="true"
            :zoom="1"
            :elementGuidelines="elementGuidelines"
            :bounds="({ top: 0, left: 0, right: 500, bottom: 800 })"
            @render="onRender"/>
    </div>
</template>`})))()}var App_default;function init_App$164(){return(init_App$164=__esmMin((()=>{App_default=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { document, onRender };
    }
};
<\/script>
<template>
    <div
        class="root"
        style="padding-top: 100px;"
    >
        <div>
            <div
                style="position: relative;transform: translate3d(0px, 0px, 100px);"
            >
                <div style="position: relative;zoom: 0.5;">
                    <div
                        class="target"
                        style="transform: translate(0px, 0px);"
                    >Target</div>
                </div>
                <Moveable
                    :target="'.target'"
                    :draggable="true"
                    :rotatable="true"
                    :resizable="true"
                    :rootContainer="document.body"
                    @render="onRender"
                ></Moveable>
            </div>
        </div>
    </div>
</template>`})))()}var expect,apps,sources,Deafult_stories_default,TestsNoTarget,TestsClickATag,TestsInput,TestsSafari,TestsCustomElement,TestsCustomElementBounds,TestsAccuracy,TestsLargeZoom,TestsFlex,TestsWillChange,TestsStopDrag,TestsClick,TestsNestedTarget,TestsZoomedCursor,TestsHandleLargeNumber,TestsOverflow,TestsDragtarget,TestsDragStart,TestsChangingSnapContainer,TestsFixedSnap,TestsZoomedTarget,TestsTRSTarget,TestsZoomedSnap,TestsRequestBounds,TestsRotateClippable,TestsAccurateElementGuidelines,TestsAccurateElementGuidelines2,TestDragAPI,TestChangeTargetsOnClick,TestScalableKeepRatio,TestIframe,TestGroupPadding,TestTranslate50,TestNestedSVG,__namedExportsOrder;function init_Deafult_stories(){return(init_Deafult_stories=__esmMin((()=>{init_ReactATagApp(),init_ReactAccuracyApp(),init_ReactAccurateElementGuideline2App(),init_ReactAccurateElementGuidelineApp(),init_ReactChangeTargetsOnClickApp(),init_ReactChangingSnapContainerApp(),init_ReactClickApp(),init_ReactCustomElementApp(),init_ReactCustomElementBoundsApp(),init_ReactDragAPIApp(),init_ReactDragStartGroupApp(),init_ReactDragTargetApp(),init_ReactFixedSnapApp(),init_ReactFlexApp(),init_ReactGroupDragAreaApp(),init_ReactGroupPaddingApp(),init_ReactHandleLargeNumberApp(),init_ReactIframeApp(),init_ReactInputApp(),init_ReactLargeZoomElementGuidelinesApp(),init_ReactNestedSVGApp(),init_ReactNestedTargetApp(),init_ReactNoTargetApp(),init_ReactOverflowApp(),init_ReactRequestBoundsApp(),init_ReactRotateClippableApp(),init_ReactSafariApp(),init_ReactScalableKeepRatioApp(),init_ReactStopDragApp(),init_ReactTRSTargetApp(),init_ReactTranslate50App(),init_ReactWillChangeApp(),init_ReactZoomedCursorApp(),init_ReactZoomedSnapApp(),init_ReactZoomedTargetApp(),init_ReactATagApp$1(),init_ReactAccuracyApp$1(),init_ReactAccurateElementGuideline2App$1(),init_ReactAccurateElementGuidelineApp$1(),init_ReactChangeTargetsOnClickApp$1(),init_ReactChangingSnapContainerApp$1(),init_ReactClickApp$1(),init_ReactCustomElementApp$1(),init_ReactCustomElementBoundsApp$1(),init_ReactDragAPIApp$1(),init_ReactDragStartGroupApp$1(),init_ReactDragTargetApp$1(),init_ReactFixedSnapApp$1(),init_ReactFlexApp$1(),init_ReactGroupDragAreaApp$1(),init_ReactGroupPaddingApp$1(),init_ReactHandleLargeNumberApp$1(),init_ReactIframeApp$1(),init_ReactInputApp$1(),init_ReactLargeZoomElementGuidelinesApp$1(),init_ReactNestedSVGApp$1(),init_ReactNestedTargetApp$1(),init_ReactNoTargetApp$1(),init_ReactOverflowApp$1(),init_ReactRequestBoundsApp$1(),init_ReactRotateClippableApp$1(),init_ReactSafariApp$1(),init_ReactScalableKeepRatioApp$1(),init_ReactStopDragApp$1(),init_ReactTRSTargetApp$1(),init_ReactTranslate50App$1(),init_ReactWillChangeApp$1(),init_ReactZoomedCursorApp$1(),init_ReactZoomedSnapApp$1(),init_ReactZoomedTargetApp$1(),init_App(),init_App$1(),init_App$2(),init_App$3(),init_App$4(),init_App$5(),init_App$6(),init_App$7(),init_App$8(),init_App$9(),init_App$10(),init_App$11(),init_App$12(),init_App$13(),init_App$14(),init_App$15(),init_App$16(),init_App$17(),init_App$18(),init_App$19(),init_App$20(),init_App$21(),init_App$22(),init_App$23(),init_App$24(),init_App$25(),init_App$26(),init_App$27(),init_App$28(),init_App$29(),init_App$30(),init_App$31(),init_App$32(),init_App$33(),init_App$34(),init_App$35(),init_App$36(),init_App$37(),init_App$38(),init_App$39(),init_App$40(),init_App$41(),init_App$42(),init_App$43(),init_App$44(),init_App$45(),init_App$46(),init_App$47(),init_App$48(),init_App$49(),init_App$50(),init_App$51(),init_App$52(),init_App$53(),init_App$54(),init_App$55(),init_App$56(),init_App$57(),init_App$58(),init_App$59(),init_App$60(),init_App$61(),init_App$62(),init_App$63(),init_App$64(),init_App$65(),init_App$66(),init_App$67(),init_App$68(),init_App$69(),init_App$70(),init_App$71(),init_App$72(),init_App$73(),init_App$74(),init_App$75(),init_App$76(),init_App$77(),init_App$78(),init_App$79(),init_App$80(),init_App$81(),init_App$82(),init_App$83(),init_App$84(),init_App$85(),init_App$86(),init_App$87(),init_App$88(),init_App$89(),init_App$90(),init_App$91(),init_App$92(),init_App$93(),init_App$94(),init_App$95(),init_App$96(),init_App$97(),init_App$98(),init_App$99(),init_App$100(),init_App$101(),init_App$102(),init_App$103(),init_App$104(),init_App$105(),init_App$106(),init_App$107(),init_App$108(),init_App$109(),init_App$110(),init_App$111(),init_App$112(),init_App$113(),init_App$114(),init_App$115(),init_App$116(),init_App$117(),init_App$118(),init_App$119(),init_App$120(),init_App$121(),init_App$122(),init_App$123(),init_App$124(),init_App$125(),init_App$126(),init_App$127(),init_App$128(),init_App$129(),init_App$130(),init_App$131(),init_App$132(),init_App$133(),init_App$134(),init_App$135(),init_App$136(),init_App$137(),init_App$138(),init_App$139(),init_App$140(),init_App$141(),init_App$142(),init_App$143(),init_App$144(),init_App$145(),init_App$146(),init_App$147(),init_App$148(),init_App$149(),init_App$150(),init_App$151(),init_App$152(),init_App$153(),init_App$154(),init_App$155(),init_App$156(),init_App$157(),init_App$158(),init_App$159(),init_App$160(),init_App$161(),init_App$162(),init_App$163(),init_App$164(),init_story(),init_utils_esm(),init_testing(),{expect}=__STORYBOOK_MODULE_TEST__,apps=Object.assign({"./ReactATagApp.tsx":ReactATagApp_exports,"./ReactAccuracyApp.tsx":ReactAccuracyApp_exports,"./ReactAccurateElementGuideline2App.tsx":ReactAccurateElementGuideline2App_exports,"./ReactAccurateElementGuidelineApp.tsx":ReactAccurateElementGuidelineApp_exports,"./ReactChangeTargetsOnClickApp.tsx":ReactChangeTargetsOnClickApp_exports,"./ReactChangingSnapContainerApp.tsx":ReactChangingSnapContainerApp_exports,"./ReactClickApp.tsx":ReactClickApp_exports,"./ReactCustomElementApp.tsx":ReactCustomElementApp_exports,"./ReactCustomElementBoundsApp.tsx":ReactCustomElementBoundsApp_exports,"./ReactDragAPIApp.tsx":ReactDragAPIApp_exports,"./ReactDragStartGroupApp.tsx":ReactDragStartGroupApp_exports,"./ReactDragTargetApp.tsx":ReactDragTargetApp_exports,"./ReactFixedSnapApp.tsx":ReactFixedSnapApp_exports,"./ReactFlexApp.tsx":ReactFlexApp_exports,"./ReactGroupDragAreaApp.tsx":ReactGroupDragAreaApp_exports,"./ReactGroupPaddingApp.tsx":ReactGroupPaddingApp_exports,"./ReactHandleLargeNumberApp.tsx":ReactHandleLargeNumberApp_exports,"./ReactIframeApp.tsx":ReactIframeApp_exports,"./ReactInputApp.tsx":ReactInputApp_exports,"./ReactLargeZoomElementGuidelinesApp.tsx":ReactLargeZoomElementGuidelinesApp_exports,"./ReactNestedSVGApp.tsx":ReactNestedSVGApp_exports,"./ReactNestedTargetApp.tsx":ReactNestedTargetApp_exports,"./ReactNoTargetApp.tsx":ReactNoTargetApp_exports,"./ReactOverflowApp.tsx":ReactOverflowApp_exports,"./ReactRequestBoundsApp.tsx":ReactRequestBoundsApp_exports,"./ReactRotateClippableApp.tsx":ReactRotateClippableApp_exports,"./ReactSafariApp.tsx":ReactSafariApp_exports,"./ReactScalableKeepRatioApp.tsx":ReactScalableKeepRatioApp_exports,"./ReactStopDragApp.tsx":ReactStopDragApp_exports,"./ReactTRSTargetApp.tsx":ReactTRSTargetApp_exports,"./ReactTranslate50App.tsx":ReactTranslate50App_exports,"./ReactWillChangeApp.tsx":ReactWillChangeApp_exports,"./ReactZoomedCursorApp.tsx":ReactZoomedCursorApp_exports,"./ReactZoomedSnapApp.tsx":ReactZoomedSnapApp_exports,"./ReactZoomedTargetApp.tsx":ReactZoomedTargetApp_exports}),sources=Object.assign({"./ReactATagApp.tsx":ReactATagApp_default,"./ReactAccuracyApp.tsx":ReactAccuracyApp_default,"./ReactAccurateElementGuideline2App.tsx":ReactAccurateElementGuideline2App_default,"./ReactAccurateElementGuidelineApp.tsx":ReactAccurateElementGuidelineApp_default,"./ReactChangeTargetsOnClickApp.tsx":ReactChangeTargetsOnClickApp_default,"./ReactChangingSnapContainerApp.tsx":ReactChangingSnapContainerApp_default,"./ReactClickApp.tsx":ReactClickApp_default,"./ReactCustomElementApp.tsx":ReactCustomElementApp_default,"./ReactCustomElementBoundsApp.tsx":ReactCustomElementBoundsApp_default,"./ReactDragAPIApp.tsx":ReactDragAPIApp_default,"./ReactDragStartGroupApp.tsx":ReactDragStartGroupApp_default,"./ReactDragTargetApp.tsx":ReactDragTargetApp_default,"./ReactFixedSnapApp.tsx":ReactFixedSnapApp_default,"./ReactFlexApp.tsx":ReactFlexApp_default,"./ReactGroupDragAreaApp.tsx":ReactGroupDragAreaApp_default,"./ReactGroupPaddingApp.tsx":ReactGroupPaddingApp_default,"./ReactHandleLargeNumberApp.tsx":ReactHandleLargeNumberApp_default,"./ReactIframeApp.tsx":ReactIframeApp_default,"./ReactInputApp.tsx":ReactInputApp_default,"./ReactLargeZoomElementGuidelinesApp.tsx":ReactLargeZoomElementGuidelinesApp_default,"./ReactNestedSVGApp.tsx":ReactNestedSVGApp_default,"./ReactNestedTargetApp.tsx":ReactNestedTargetApp_default,"./ReactNoTargetApp.tsx":ReactNoTargetApp_default,"./ReactOverflowApp.tsx":ReactOverflowApp_default,"./ReactRequestBoundsApp.tsx":ReactRequestBoundsApp_default,"./ReactRotateClippableApp.tsx":ReactRotateClippableApp_default,"./ReactSafariApp.tsx":ReactSafariApp_default,"./ReactScalableKeepRatioApp.tsx":ReactScalableKeepRatioApp_default,"./ReactStopDragApp.tsx":ReactStopDragApp_default,"./ReactTRSTargetApp.tsx":ReactTRSTargetApp_default,"./ReactTranslate50App.tsx":ReactTranslate50App_default,"./ReactWillChangeApp.tsx":ReactWillChangeApp_default,"./ReactZoomedCursorApp.tsx":ReactZoomedCursorApp_default,"./ReactZoomedSnapApp.tsx":ReactZoomedSnapApp_default,"./ReactZoomedTargetApp.tsx":ReactZoomedTargetApp_default,"./lit/ReactATagApp/App.ts":App_default$164,"./lit/ReactAccuracyApp/App.ts":App_default$163,"./lit/ReactAccurateElementGuideline2App/App.ts":App_default$162,"./lit/ReactAccurateElementGuidelineApp/App.ts":App_default$161,"./lit/ReactChangeTargetsOnClickApp/App.ts":App_default$160,"./lit/ReactChangingSnapContainerApp/App.ts":App_default$159,"./lit/ReactClickApp/App.ts":App_default$158,"./lit/ReactCustomElementApp/App.ts":App_default$157,"./lit/ReactDragAPIApp/App.ts":App_default$156,"./lit/ReactDragStartGroupApp/App.ts":App_default$155,"./lit/ReactDragTargetApp/App.ts":App_default$154,"./lit/ReactFixedSnapApp/App.ts":App_default$153,"./lit/ReactFlexApp/App.ts":App_default$152,"./lit/ReactGroupDragAreaApp/App.ts":App_default$151,"./lit/ReactGroupPaddingApp/App.ts":App_default$150,"./lit/ReactHandleLargeNumberApp/App.ts":App_default$149,"./lit/ReactInputApp/App.ts":App_default$148,"./lit/ReactLargeZoomElementGuidelinesApp/App.ts":App_default$147,"./lit/ReactNestedSVGApp/App.ts":App_default$146,"./lit/ReactNestedTargetApp/App.ts":App_default$145,"./lit/ReactNoTargetApp/App.ts":App_default$144,"./lit/ReactOverflowApp/App.ts":App_default$143,"./lit/ReactRequestBoundsApp/App.ts":App_default$142,"./lit/ReactRotateClippableApp/App.ts":App_default$141,"./lit/ReactSafariApp/App.ts":App_default$140,"./lit/ReactScalableKeepRatioApp/App.ts":App_default$139,"./lit/ReactStopDragApp/App.ts":App_default$138,"./lit/ReactTRSTargetApp/App.ts":App_default$137,"./lit/ReactTranslate50App/App.ts":App_default$136,"./lit/ReactWillChangeApp/App.ts":App_default$135,"./lit/ReactZoomedCursorApp/App.ts":App_default$134,"./lit/ReactZoomedSnapApp/App.ts":App_default$133,"./lit/ReactZoomedTargetApp/App.ts":App_default$132,"./script/ReactATagApp/App.html":App_default$131,"./script/ReactATagApp/App.js":App_default$130,"./script/ReactAccuracyApp/App.html":App_default$129,"./script/ReactAccuracyApp/App.js":App_default$128,"./script/ReactAccurateElementGuideline2App/App.html":App_default$127,"./script/ReactAccurateElementGuideline2App/App.js":App_default$126,"./script/ReactAccurateElementGuidelineApp/App.html":App_default$125,"./script/ReactAccurateElementGuidelineApp/App.js":App_default$124,"./script/ReactChangeTargetsOnClickApp/App.html":App_default$123,"./script/ReactChangeTargetsOnClickApp/App.js":App_default$122,"./script/ReactChangingSnapContainerApp/App.html":App_default$121,"./script/ReactChangingSnapContainerApp/App.js":App_default$120,"./script/ReactClickApp/App.html":App_default$119,"./script/ReactClickApp/App.js":App_default$118,"./script/ReactCustomElementApp/App.html":App_default$117,"./script/ReactCustomElementApp/App.js":App_default$116,"./script/ReactDragAPIApp/App.html":App_default$115,"./script/ReactDragAPIApp/App.js":App_default$114,"./script/ReactDragStartGroupApp/App.html":App_default$113,"./script/ReactDragStartGroupApp/App.js":App_default$112,"./script/ReactDragTargetApp/App.html":App_default$111,"./script/ReactDragTargetApp/App.js":App_default$110,"./script/ReactFixedSnapApp/App.html":App_default$109,"./script/ReactFixedSnapApp/App.js":App_default$108,"./script/ReactFlexApp/App.html":App_default$107,"./script/ReactFlexApp/App.js":App_default$106,"./script/ReactGroupDragAreaApp/App.html":App_default$105,"./script/ReactGroupDragAreaApp/App.js":App_default$104,"./script/ReactGroupPaddingApp/App.html":App_default$103,"./script/ReactGroupPaddingApp/App.js":App_default$102,"./script/ReactHandleLargeNumberApp/App.html":App_default$101,"./script/ReactHandleLargeNumberApp/App.js":App_default$100,"./script/ReactInputApp/App.html":App_default$99,"./script/ReactInputApp/App.js":App_default$98,"./script/ReactLargeZoomElementGuidelinesApp/App.html":App_default$97,"./script/ReactLargeZoomElementGuidelinesApp/App.js":App_default$96,"./script/ReactNestedSVGApp/App.html":App_default$95,"./script/ReactNestedSVGApp/App.js":App_default$94,"./script/ReactNestedTargetApp/App.html":App_default$93,"./script/ReactNestedTargetApp/App.js":App_default$92,"./script/ReactNoTargetApp/App.html":App_default$91,"./script/ReactNoTargetApp/App.js":App_default$90,"./script/ReactOverflowApp/App.html":App_default$89,"./script/ReactOverflowApp/App.js":App_default$88,"./script/ReactRequestBoundsApp/App.html":App_default$87,"./script/ReactRequestBoundsApp/App.js":App_default$86,"./script/ReactRotateClippableApp/App.html":App_default$85,"./script/ReactRotateClippableApp/App.js":App_default$84,"./script/ReactSafariApp/App.html":App_default$83,"./script/ReactSafariApp/App.js":App_default$82,"./script/ReactScalableKeepRatioApp/App.html":App_default$81,"./script/ReactScalableKeepRatioApp/App.js":App_default$80,"./script/ReactStopDragApp/App.html":App_default$79,"./script/ReactStopDragApp/App.js":App_default$78,"./script/ReactTRSTargetApp/App.html":App_default$77,"./script/ReactTRSTargetApp/App.js":App_default$76,"./script/ReactTranslate50App/App.html":App_default$75,"./script/ReactTranslate50App/App.js":App_default$74,"./script/ReactWillChangeApp/App.html":App_default$73,"./script/ReactWillChangeApp/App.js":App_default$72,"./script/ReactZoomedCursorApp/App.html":App_default$71,"./script/ReactZoomedCursorApp/App.js":App_default$70,"./script/ReactZoomedSnapApp/App.html":App_default$69,"./script/ReactZoomedSnapApp/App.js":App_default$68,"./script/ReactZoomedTargetApp/App.html":App_default$67,"./script/ReactZoomedTargetApp/App.js":App_default$66,"./svelte/ReactATagApp/App.svelte":App_default$65,"./svelte/ReactAccuracyApp/App.svelte":App_default$64,"./svelte/ReactAccurateElementGuideline2App/App.svelte":App_default$63,"./svelte/ReactAccurateElementGuidelineApp/App.svelte":App_default$62,"./svelte/ReactChangeTargetsOnClickApp/App.svelte":App_default$61,"./svelte/ReactChangingSnapContainerApp/App.svelte":App_default$60,"./svelte/ReactClickApp/App.svelte":App_default$59,"./svelte/ReactCustomElementApp/App.svelte":App_default$58,"./svelte/ReactDragAPIApp/App.svelte":App_default$57,"./svelte/ReactDragStartGroupApp/App.svelte":App_default$56,"./svelte/ReactDragTargetApp/App.svelte":App_default$55,"./svelte/ReactFixedSnapApp/App.svelte":App_default$54,"./svelte/ReactFlexApp/App.svelte":App_default$53,"./svelte/ReactGroupDragAreaApp/App.svelte":App_default$52,"./svelte/ReactGroupPaddingApp/App.svelte":App_default$51,"./svelte/ReactHandleLargeNumberApp/App.svelte":App_default$50,"./svelte/ReactInputApp/App.svelte":App_default$49,"./svelte/ReactLargeZoomElementGuidelinesApp/App.svelte":App_default$48,"./svelte/ReactNestedSVGApp/App.svelte":App_default$47,"./svelte/ReactNestedTargetApp/App.svelte":App_default$46,"./svelte/ReactNoTargetApp/App.svelte":App_default$45,"./svelte/ReactOverflowApp/App.svelte":App_default$44,"./svelte/ReactRequestBoundsApp/App.svelte":App_default$43,"./svelte/ReactRotateClippableApp/App.svelte":App_default$42,"./svelte/ReactSafariApp/App.svelte":App_default$41,"./svelte/ReactScalableKeepRatioApp/App.svelte":App_default$40,"./svelte/ReactStopDragApp/App.svelte":App_default$39,"./svelte/ReactTRSTargetApp/App.svelte":App_default$38,"./svelte/ReactTranslate50App/App.svelte":App_default$37,"./svelte/ReactWillChangeApp/App.svelte":App_default$36,"./svelte/ReactZoomedCursorApp/App.svelte":App_default$35,"./svelte/ReactZoomedSnapApp/App.svelte":App_default$34,"./svelte/ReactZoomedTargetApp/App.svelte":App_default$33,"./vue3/ReactATagApp/App.vue":App_default$32,"./vue3/ReactAccuracyApp/App.vue":App_default$31,"./vue3/ReactAccurateElementGuideline2App/App.vue":App_default$30,"./vue3/ReactAccurateElementGuidelineApp/App.vue":App_default$29,"./vue3/ReactChangeTargetsOnClickApp/App.vue":App_default$28,"./vue3/ReactChangingSnapContainerApp/App.vue":App_default$27,"./vue3/ReactClickApp/App.vue":App_default$26,"./vue3/ReactCustomElementApp/App.vue":App_default$25,"./vue3/ReactDragAPIApp/App.vue":App_default$24,"./vue3/ReactDragStartGroupApp/App.vue":App_default$23,"./vue3/ReactDragTargetApp/App.vue":App_default$22,"./vue3/ReactFixedSnapApp/App.vue":App_default$21,"./vue3/ReactFlexApp/App.vue":App_default$20,"./vue3/ReactGroupDragAreaApp/App.vue":App_default$19,"./vue3/ReactGroupPaddingApp/App.vue":App_default$18,"./vue3/ReactHandleLargeNumberApp/App.vue":App_default$17,"./vue3/ReactInputApp/App.vue":App_default$16,"./vue3/ReactLargeZoomElementGuidelinesApp/App.vue":App_default$15,"./vue3/ReactNestedSVGApp/App.vue":App_default$14,"./vue3/ReactNestedTargetApp/App.vue":App_default$13,"./vue3/ReactNoTargetApp/App.vue":App_default$12,"./vue3/ReactOverflowApp/App.vue":App_default$11,"./vue3/ReactRequestBoundsApp/App.vue":App_default$10,"./vue3/ReactRotateClippableApp/App.vue":App_default$9,"./vue3/ReactSafariApp/App.vue":App_default$8,"./vue3/ReactScalableKeepRatioApp/App.vue":App_default$7,"./vue3/ReactStopDragApp/App.vue":App_default$6,"./vue3/ReactTRSTargetApp/App.vue":App_default$5,"./vue3/ReactTranslate50App/App.vue":App_default$4,"./vue3/ReactWillChangeApp/App.vue":App_default$3,"./vue3/ReactZoomedCursorApp/App.vue":App_default$2,"./vue3/ReactZoomedSnapApp/App.vue":App_default$1,"./vue3/ReactZoomedTargetApp/App.vue":App_default}),Deafult_stories_default={title:`Variable Situations`},TestsNoTarget={name:`No Target`,...appStory(App$12,{apps,sources})},TestsClickATag={name:`Click a tag`,...appStory(App$34,{apps,sources})},TestsInput={name:`Any native input element`,...appStory(App$16,{apps,sources})},TestsSafari={name:`Test Control Box in Safari`,...appStory(App$8,{apps,sources})},TestsCustomElement={name:`Test Custom Element Offset`,...appStory(App$27,{apps,sources}),play:devPlay(async({canvasElement:e})=>{await wait();let t=findMoveable(e);expect(t.style.transform).toBe(`translate3d(60px, 192px, 0px)`)})},TestsCustomElementBounds={name:`Test Custom Element with Bounds`,...appStory(App$26,{apps,sources}),play:devPlay(async({canvasElement:e})=>{await wait();let t=e.querySelector(`custom-element`).shadowRoot.querySelector(`.moveable-control-box`);expect(t.style.transform).toBe(`translate3d(50px, 50px, 0px)`)})},TestsAccuracy={name:`Check drag accuracy when using bounds`,...appStory(App$33,{apps,sources})},TestsLargeZoom={name:`Check element guidelines accuracy when zoom is large`,...appStory(App$15,{apps,sources})},TestsFlex={name:`Test flex element`,...appStory(App$21,{apps,sources})},TestsWillChange={name:`Test Container with will change`,...appStory(App$3,{apps,sources})},TestsStopDrag={name:`Stop drag if target is select, input, textarea`,...appStory(App$6,{apps,sources})},TestsClick={name:`Stop Click event's Propagation for dragStart`,...appStory(App$28,{apps,sources})},TestsNestedTarget={name:`Nested Moveable's target`,...appStory(App$13,{apps,sources})},TestsZoomedCursor={name:`Zoomed Cursor`,...appStory(App$2,{apps,sources})},TestsHandleLargeNumber={name:`Test performance for large number instances`,...appStory(App$18,{apps,sources})},TestsOverflow={name:`Test overflow: auto target`,...appStory(App$11,{apps,sources})},TestsDragtarget={name:`Test Drag Target`,...appStory(App$23,{apps,sources})},TestsDragStart={name:`Test Drag Start Group Manually`,...appStory(App$24,{apps,sources})},TestsChangingSnapContainer={name:`Test Changing Snap Container`,...appStory(App$29,{apps,sources})},TestsFixedSnap={name:`Test Snap with position: fixed`,...appStory(App$22,{apps,sources})},TestsZoomedTarget={name:`Test css zoomed target`,...appStory(App,{apps,sources})},TestsTRSTarget={name:`Test css translate & rotate & scale target`,...appStory(App$5,{apps,sources}),play:devPlay(async({canvasElement:e})=>{await wait();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box`),r=n.querySelector(`[data-line-key="render-line-0"]`),i=n.querySelector(`[data-line-key="render-line-1"]`);expect(r.style.width).toBe(`101px`),expect(i.style.width).toBe(`201px`),expect(splitComma(splitBracket(n.style.transform).value).map(e=>parseInt(e,10))).toEqual([243,248,0]),await pan({target:t,start:[0,0],end:[100,0],duration:100,interval:10}),expect(splitComma(splitBracket(t.style.transform).value).map(e=>parseInt(e,10))).toEqual([186,-25]),expect(splitComma(splitBracket(n.style.transform).value).map(e=>parseInt(e,10))).toEqual([343,248,0])})},TestsZoomedSnap={name:`Test snap for scaled target`,...appStory(App$1,{apps,sources})},TestsRequestBounds={name:`Test request with bounds`,...appStory(App$10,{apps,sources})},TestsRotateClippable={name:`Test rotate & clippable`,...appStory(App$9,{apps,sources})},TestsAccurateElementGuidelines={name:`Test Accurate Element Guidelines`,...appStory(App$31,{apps,sources}),play:devPlay(async({canvasElement:e})=>{await wait();let t=e.querySelector(`.target2`);await pan({target:t,start:[0,0],end:[-1,-1],duration:10,interval:10}),expect(t.style.transform).toBe(`translate(0px, 0px)`)})},TestsAccurateElementGuidelines2={name:`Test Accurate Element Guidelines 0.2`,...appStory(App$32,{apps,sources}),play:devPlay(async({canvasElement:e})=>{await wait();let t=e.querySelector(`.target2`);await pan({target:t,start:[0,0],end:[-1,-1],duration:10,interval:10}),expect(t.style.transform).toBe(`translate(0px, 0px)`)})},TestDragAPI={name:`Test Drag API`,...appStory(App$25,{apps,sources})},TestChangeTargetsOnClick={name:`Test Change Target on Click Group`,...appStory(App$30,{apps,sources})},TestScalableKeepRatio={name:`Even if the size is 0, the ratio is maintained.`,...appStory(App$7,{apps,sources})},TestIframe={name:`Test Iframe`,...appStory(App$17,{apps,sources})},TestGroupPadding={name:`Test Show Group's Padding`,...appStory(App$19,{apps,sources})},TestTranslate50={name:`Test translate(-50%, -50%)`,...appStory(App$4,{apps,sources}),play:devPlay(async({canvasElement:e})=>{await wait();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box`);expect(n.style.transform).toBe(`translate3d(50px, 100px, 0px)`),await pan({target:t,start:[0,0],end:[100,0],duration:100,interval:10}),expect(t.style.transform).toBe(`translate(50px, -50px)`),expect(n.style.transform).toBe(`translate3d(150px, 100px, 0px)`)})},TestNestedSVG={name:`Test Nested SVG`,...appStory(App$14,{apps,sources})},__namedExportsOrder=`TestsNoTarget.TestsClickATag.TestsInput.TestsSafari.TestsCustomElement.TestsCustomElementBounds.TestsAccuracy.TestsLargeZoom.TestsFlex.TestsWillChange.TestsStopDrag.TestsClick.TestsNestedTarget.TestsZoomedCursor.TestsHandleLargeNumber.TestsOverflow.TestsDragtarget.TestsDragStart.TestsChangingSnapContainer.TestsFixedSnap.TestsZoomedTarget.TestsTRSTarget.TestsZoomedSnap.TestsRequestBounds.TestsRotateClippable.TestsAccurateElementGuidelines.TestsAccurateElementGuidelines2.TestDragAPI.TestChangeTargetsOnClick.TestScalableKeepRatio.TestIframe.TestGroupPadding.TestTranslate50.TestNestedSVG`.split(`.`),TestsNoTarget.parameters={...TestsNoTarget.parameters,docs:{...TestsNoTarget.parameters?.docs,source:{originalSource:`{
  name: "No Target",
  ...appStory(ReactNoTargetApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsNoTarget.parameters?.docs?.source}}},TestsClickATag.parameters={...TestsClickATag.parameters,docs:{...TestsClickATag.parameters?.docs,source:{originalSource:`{
  name: "Click a tag",
  ...appStory(ReactATagApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsClickATag.parameters?.docs?.source}}},TestsInput.parameters={...TestsInput.parameters,docs:{...TestsInput.parameters?.docs,source:{originalSource:`{
  name: "Any native input element",
  ...appStory(ReactInputApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsInput.parameters?.docs?.source}}},TestsSafari.parameters={...TestsSafari.parameters,docs:{...TestsSafari.parameters?.docs,source:{originalSource:`{
  name: "Test Control Box in Safari",
  ...appStory(ReactSafariApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsSafari.parameters?.docs?.source}}},TestsCustomElement.parameters={...TestsCustomElement.parameters,docs:{...TestsCustomElement.parameters?.docs,source:{originalSource:`{
  name: "Test Custom Element Offset",
  ...appStory(ReactCustomElementApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const moveableElement = findMoveable(canvasElement);
    expect(moveableElement.style.transform).toBe("translate3d(60px, 192px, 0px)");
  })
} satisfies StoryObj`,...TestsCustomElement.parameters?.docs?.source}}},TestsCustomElementBounds.parameters={...TestsCustomElementBounds.parameters,docs:{...TestsCustomElementBounds.parameters?.docs,source:{originalSource:`{
  name: "Test Custom Element with Bounds",
  ...appStory(ReactCustomElementBoundsApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const customElement = canvasElement.querySelector("custom-element")!;
    const innerMoveable = customElement!.shadowRoot!.querySelector<HTMLElement>(".moveable-control-box")!;
    expect(innerMoveable.style.transform).toBe("translate3d(50px, 50px, 0px)");
  })
} satisfies StoryObj`,...TestsCustomElementBounds.parameters?.docs?.source}}},TestsAccuracy.parameters={...TestsAccuracy.parameters,docs:{...TestsAccuracy.parameters?.docs,source:{originalSource:`{
  name: "Check drag accuracy when using bounds",
  ...appStory(ReactAccuracyApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsAccuracy.parameters?.docs?.source}}},TestsLargeZoom.parameters={...TestsLargeZoom.parameters,docs:{...TestsLargeZoom.parameters?.docs,source:{originalSource:`{
  name: "Check element guidelines accuracy when zoom is large",
  ...appStory(ReactLargeZoomElementGuidelinesApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsLargeZoom.parameters?.docs?.source}}},TestsFlex.parameters={...TestsFlex.parameters,docs:{...TestsFlex.parameters?.docs,source:{originalSource:`{
  name: "Test flex element",
  ...appStory(ReactFlexApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsFlex.parameters?.docs?.source}}},TestsWillChange.parameters={...TestsWillChange.parameters,docs:{...TestsWillChange.parameters?.docs,source:{originalSource:`{
  name: "Test Container with will change",
  ...appStory(ReactWillChangeApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsWillChange.parameters?.docs?.source}}},TestsStopDrag.parameters={...TestsStopDrag.parameters,docs:{...TestsStopDrag.parameters?.docs,source:{originalSource:`{
  name: "Stop drag if target is select, input, textarea",
  ...appStory(ReactStopDragApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsStopDrag.parameters?.docs?.source}}},TestsClick.parameters={...TestsClick.parameters,docs:{...TestsClick.parameters?.docs,source:{originalSource:`{
  name: "Stop Click event's Propagation for dragStart",
  ...appStory(ReactClickApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsClick.parameters?.docs?.source}}},TestsNestedTarget.parameters={...TestsNestedTarget.parameters,docs:{...TestsNestedTarget.parameters?.docs,source:{originalSource:`{
  name: "Nested Moveable's target",
  ...appStory(ReactNestedTargetApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsNestedTarget.parameters?.docs?.source}}},TestsZoomedCursor.parameters={...TestsZoomedCursor.parameters,docs:{...TestsZoomedCursor.parameters?.docs,source:{originalSource:`{
  name: "Zoomed Cursor",
  ...appStory(ReactZoomedCursorApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsZoomedCursor.parameters?.docs?.source}}},TestsHandleLargeNumber.parameters={...TestsHandleLargeNumber.parameters,docs:{...TestsHandleLargeNumber.parameters?.docs,source:{originalSource:`{
  name: "Test performance for large number instances",
  ...appStory(ReactHandleLargeNumberApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsHandleLargeNumber.parameters?.docs?.source}}},TestsOverflow.parameters={...TestsOverflow.parameters,docs:{...TestsOverflow.parameters?.docs,source:{originalSource:`{
  name: "Test overflow: auto target",
  ...appStory(ReactOverflowApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsOverflow.parameters?.docs?.source}}},TestsDragtarget.parameters={...TestsDragtarget.parameters,docs:{...TestsDragtarget.parameters?.docs,source:{originalSource:`{
  name: "Test Drag Target",
  ...appStory(ReactDragTargetApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsDragtarget.parameters?.docs?.source}}},TestsDragStart.parameters={...TestsDragStart.parameters,docs:{...TestsDragStart.parameters?.docs,source:{originalSource:`{
  name: "Test Drag Start Group Manually",
  ...appStory(ReactDragStartGroupApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsDragStart.parameters?.docs?.source}}},TestsChangingSnapContainer.parameters={...TestsChangingSnapContainer.parameters,docs:{...TestsChangingSnapContainer.parameters?.docs,source:{originalSource:`{
  name: "Test Changing Snap Container",
  ...appStory(ReactChangingSnapContainerApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsChangingSnapContainer.parameters?.docs?.source}}},TestsFixedSnap.parameters={...TestsFixedSnap.parameters,docs:{...TestsFixedSnap.parameters?.docs,source:{originalSource:`{
  name: "Test Snap with position: fixed",
  ...appStory(ReactFixedSnapApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsFixedSnap.parameters?.docs?.source}}},TestsZoomedTarget.parameters={...TestsZoomedTarget.parameters,docs:{...TestsZoomedTarget.parameters?.docs,source:{originalSource:`{
  name: "Test css zoomed target",
  ...appStory(ReactZoomedTargetApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsZoomedTarget.parameters?.docs?.source}}},TestsTRSTarget.parameters={...TestsTRSTarget.parameters,docs:{...TestsTRSTarget.parameters?.docs,source:{originalSource:`{
  name: "Test css translate & rotate & scale target",
  ...appStory(ReactTRSTargetApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

    // x1 => x2
    const line1 = controlBox.querySelector<HTMLElement>(\`[data-line-key="render-line-0"]\`)!;
    // y1 => y2
    const line2 = controlBox.querySelector<HTMLElement>(\`[data-line-key="render-line-1"]\`)!;

    // 100x 200
    expect(line1.style.width).toBe("101px");
    expect(line2.style.width).toBe("201px");
    expect(splitComma(splitBracket(controlBox.style.transform).value!).map(v => {
      return parseInt(v, 10);
    })).toEqual([243, 248, 0]);
    await pan({
      target,
      start: [0, 0],
      end: [100, 0],
      duration: 100,
      interval: 10
    });
    expect(splitComma(splitBracket(target.style.transform).value!).map(v => {
      return parseInt(v, 10);
    })).toEqual([186, -25]);
    expect(splitComma(splitBracket(controlBox.style.transform).value!).map(v => {
      return parseInt(v, 10);
    })).toEqual([343, 248, 0]);
  })
} satisfies StoryObj`,...TestsTRSTarget.parameters?.docs?.source}}},TestsZoomedSnap.parameters={...TestsZoomedSnap.parameters,docs:{...TestsZoomedSnap.parameters?.docs,source:{originalSource:`{
  name: "Test snap for scaled target",
  ...appStory(ReactZoomedSnapApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsZoomedSnap.parameters?.docs?.source}}},TestsRequestBounds.parameters={...TestsRequestBounds.parameters,docs:{...TestsRequestBounds.parameters?.docs,source:{originalSource:`{
  name: "Test request with bounds",
  ...appStory(ReactRequestBoundsApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsRequestBounds.parameters?.docs?.source}}},TestsRotateClippable.parameters={...TestsRotateClippable.parameters,docs:{...TestsRotateClippable.parameters?.docs,source:{originalSource:`{
  name: "Test rotate & clippable",
  ...appStory(ReactRotateClippableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestsRotateClippable.parameters?.docs?.source}}},TestsAccurateElementGuidelines.parameters={...TestsAccurateElementGuidelines.parameters,docs:{...TestsAccurateElementGuidelines.parameters?.docs,source:{originalSource:`{
  name: "Test Accurate Element Guidelines",
  ...appStory(ReactAccurateElementGuidelineApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target2")!;
    // const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

    await pan({
      target,
      start: [0, 0],
      end: [-1, -1],
      duration: 10,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(0px, 0px)");
    // expect(controlBox.style.transform).toBe("translate3d(200px, 200px, 0px)");
  })
} satisfies StoryObj`,...TestsAccurateElementGuidelines.parameters?.docs?.source}}},TestsAccurateElementGuidelines2.parameters={...TestsAccurateElementGuidelines2.parameters,docs:{...TestsAccurateElementGuidelines2.parameters?.docs,source:{originalSource:`{
  name: "Test Accurate Element Guidelines 0.2",
  ...appStory(ReactAccurateElementGuideline2App, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target2")!;
    await pan({
      target,
      start: [0, 0],
      end: [-1, -1],
      duration: 10,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(0px, 0px)");
  })
} satisfies StoryObj`,...TestsAccurateElementGuidelines2.parameters?.docs?.source}}},TestDragAPI.parameters={...TestDragAPI.parameters,docs:{...TestDragAPI.parameters?.docs,source:{originalSource:`{
  name: "Test Drag API",
  ...appStory(ReactDragAPIApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestDragAPI.parameters?.docs?.source}}},TestChangeTargetsOnClick.parameters={...TestChangeTargetsOnClick.parameters,docs:{...TestChangeTargetsOnClick.parameters?.docs,source:{originalSource:`{
  name: "Test Change Target on Click Group",
  ...appStory(ReactChangeTargetsOnClickApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestChangeTargetsOnClick.parameters?.docs?.source}}},TestScalableKeepRatio.parameters={...TestScalableKeepRatio.parameters,docs:{...TestScalableKeepRatio.parameters?.docs,source:{originalSource:`{
  name: "Even if the size is 0, the ratio is maintained.",
  ...appStory(ReactScalableKeepRatioApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestScalableKeepRatio.parameters?.docs?.source}}},TestIframe.parameters={...TestIframe.parameters,docs:{...TestIframe.parameters?.docs,source:{originalSource:`{
  name: "Test Iframe",
  ...appStory(ReactIframeApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestIframe.parameters?.docs?.source}}},TestGroupPadding.parameters={...TestGroupPadding.parameters,docs:{...TestGroupPadding.parameters?.docs,source:{originalSource:`{
  name: "Test Show Group's Padding",
  ...appStory(ReactGroupPaddingApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestGroupPadding.parameters?.docs?.source}}},TestTranslate50.parameters={...TestTranslate50.parameters,docs:{...TestTranslate50.parameters?.docs,source:{originalSource:`{
  name: "Test translate(-50%, -50%)",
  ...appStory(ReactTranslate50App, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;
    expect(controlBox.style.transform).toBe("translate3d(50px, 100px, 0px)");
    await pan({
      target,
      start: [0, 0],
      end: [100, 0],
      duration: 100,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(50px, -50px)");
    expect(controlBox.style.transform).toBe("translate3d(150px, 100px, 0px)");
  })
} satisfies StoryObj`,...TestTranslate50.parameters?.docs?.source}}},TestNestedSVG.parameters={...TestNestedSVG.parameters,docs:{...TestNestedSVG.parameters?.docs,source:{originalSource:`{
  name: "Test Nested SVG",
  ...appStory(ReactNestedSVGApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...TestNestedSVG.parameters?.docs?.source}}}})))()}init_Deafult_stories();export{TestChangeTargetsOnClick,TestDragAPI,TestGroupPadding,TestIframe,TestNestedSVG,TestScalableKeepRatio,TestTranslate50,TestsAccuracy,TestsAccurateElementGuidelines,TestsAccurateElementGuidelines2,TestsChangingSnapContainer,TestsClick,TestsClickATag,TestsCustomElement,TestsCustomElementBounds,TestsDragStart,TestsDragtarget,TestsFixedSnap,TestsFlex,TestsHandleLargeNumber,TestsInput,TestsLargeZoom,TestsNestedTarget,TestsNoTarget,TestsOverflow,TestsRequestBounds,TestsRotateClippable,TestsSafari,TestsStopDrag,TestsTRSTarget,TestsWillChange,TestsZoomedCursor,TestsZoomedSnap,TestsZoomedTarget,__namedExportsOrder,Deafult_stories_default as default};