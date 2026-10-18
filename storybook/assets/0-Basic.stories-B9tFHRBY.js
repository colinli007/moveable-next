import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{I as a,Q as ee,R as te,c as o,ct as s,l as c,n as l,r as ne,t as u}from"./story-uRijs6RN.js";import{c as re,g as ie,h as ae,n as oe,o as se,r as d,s as ce}from"./default-C91InR83.js";import{a as f,i as le,n as ue,o as p,r as m}from"./testing-D3qGHjyB.js";var de=n({default:()=>fe});function fe(e){let t=pe.useRef(null);return(0,h.jsx)(`div`,{className:`root`,children:(0,h.jsxs)(`div`,{className:`container`,children:[(0,h.jsx)(`div`,{className:`target`,ref:t,children:`Target`}),(0,h.jsx)(c,{target:t,draggable:e.draggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,zoom:e.zoom,clippable:e.clippable,clipRelative:e.clipRelative,clipArea:e.clipArea,dragArea:e.dragArea,dragWithClip:e.dragWithClip,defaultClipPath:e.defaultClipPath,clipTargetBounds:e.clipTargetBounds,snapThreshold:5,keepRatio:e.keepRatio,onDrag:e=>{e.target.style.transform=e.transform},onClip:e=>{e.target.style.clipPath=e.clipStyle}})]})})}var pe,h;function me(){return(me=t((()=>{pe=e(r()),o(),h=i()})))()}var he=n({default:()=>ge});function ge(e){let t=_e.useRef(null);return(0,g.jsx)(`div`,{className:`root`,children:(0,g.jsxs)(`div`,{className:`container`,children:[(0,g.jsx)(`div`,{className:`target`,ref:t,children:`Target`}),(0,g.jsx)(c,{target:t,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,onDrag:e=>{e.target.style.transform=e.transform}})]})})}var _e,g;function ve(){return(ve=t((()=>{_e=e(r()),o(),g=i()})))()}var ye=n({default:()=>be});function be(e){let t=_.useRef(null);return(0,v.jsx)(`div`,{className:`root`,children:(0,v.jsxs)(`div`,{className:`container`,children:[(0,v.jsx)(`div`,{className:`target`,ref:t,children:`Target`}),(0,v.jsx)(c,{target:t,originDraggable:!0,draggable:!0,rotatable:!0,onDrag:e=>{e.target.style.transform=e.transform},onDragOrigin:e=>{e.target.style.transformOrigin=e.transformOrigin,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var _,v;function y(){return(y=t((()=>{_=e(r()),o(),v=i()})))()}var xe=n({default:()=>b});function b(){return(0,x.jsx)(`div`,{className:`root`,children:(0,x.jsxs)(`div`,{className:`container`,children:[(0,x.jsx)(`p`,{children:`Pinch the target with two fingers on a touch-capable device.`}),(0,x.jsx)(`p`,{children:`Drag, Scale and Rotate are possible.`}),(0,x.jsx)(`div`,{className:`target`,children:`Target`}),(0,x.jsx)(c,{target:`.target`,draggable:!0,scalable:!0,rotatable:!0,pinchable:!0,pinchOutside:!0,onRender:e=>{e.target.style.cssText+=e.cssText}})]})})}var x;function S(){return(S=t((()=>{r(),o(),x=i()})))()}var Se=n({default:()=>C});function C(e){let t=w.useRef(null);return(0,T.jsx)(`div`,{className:`root`,children:(0,T.jsxs)(`div`,{className:`container`,children:[(0,T.jsx)(`div`,{className:`target`,ref:t,style:{maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:e.minHeight},children:`Target`}),(0,T.jsx)(c,{target:t,resizable:e.resizable,keepRatio:e.keepRatio,throttleResize:e.throttleResize,renderDirections:e.renderDirections,onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform}})]})})}var w,T;function E(){return(E=t((()=>{w=e(r()),o(),T=i()})))()}var Ce=n({default:()=>D});function D(e){let t=O.useRef(null);return(0,k.jsx)(`div`,{className:`root`,children:(0,k.jsxs)(`div`,{className:`container`,children:[(0,k.jsx)(`div`,{className:`target`,ref:t,style:{transform:`translate(0px, 0px) rotate(0deg)`},children:`Target`}),(0,k.jsx)(c,{target:t,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var O,k;function A(){return(A=t((()=>{O=e(r()),o(),k=i()})))()}var we=n({default:()=>j});function j(){return(0,M.jsx)(`div`,{className:`root`,children:(0,M.jsxs)(`div`,{className:`container`,children:[(0,M.jsx)(`div`,{className:`target target1`,style:{left:`10px`,top:`10px`,borderRadius:`25px`},children:`Target1`}),(0,M.jsx)(`div`,{className:`target target2`,style:{left:`140px`,top:`10px`,borderRadius:`25px 23px`},children:`Target2`}),(0,M.jsx)(`div`,{className:`target target3`,style:{left:`10px`,top:`140px`,borderRadius:`25px 23px / 20px`},children:`Target3`}),(0,M.jsx)(`div`,{className:`target target4`,style:{left:`140px`,top:`140px`,borderRadius:`25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px`},children:`Target4`}),(0,M.jsx)(c,{target:`.target1`,draggable:!0,roundable:!0,resizable:!0,isDisplayShadowRoundControls:`horizontal`,roundClickable:`control`,roundPadding:15,onRound:e=>{console.log(`ROUND`,e.borderRadius)},onRender:e=>{e.target.style.cssText+=e.cssText},onRenderEnd:e=>{e.target.style.cssText+=e.cssText}}),(0,M.jsx)(c,{target:`.target2`,roundable:!0,roundClickable:!0,onRound:e=>{console.log(`ROUND`,e.borderRadius),e.target.style.borderRadius=e.borderRadius}}),(0,M.jsx)(c,{target:`.target3`,roundable:!0,onRound:e=>{console.log(`ROUND`,e.borderRadius),e.target.style.borderRadius=e.borderRadius}}),(0,M.jsx)(c,{target:`.target4`,roundable:!0,onRound:e=>{console.log(`ROUND`,e.borderRadius),e.target.style.borderRadius=e.borderRadius}})]})})}var M;function N(){return(N=t((()=>{r(),o(),M=i()})))()}var Te=n({default:()=>P});function P(e){let t=F.useRef(null);return(0,I.jsx)(`div`,{className:`root`,children:(0,I.jsxs)(`div`,{className:`container`,children:[(0,I.jsx)(`div`,{className:`target`,ref:t,children:`Target`}),(0,I.jsx)(c,{target:t,scalable:!0,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,onScale:e=>{e.target.style.transform=e.drag.transform}})]})})}var F,I;function L(){return(L=t((()=>{F=e(r()),o(),I=i()})))()}var Ee=n({default:()=>R});function R(e){let t=De.useRef(null);return(0,z.jsx)(`div`,{className:`root`,children:(0,z.jsxs)(`div`,{className:`container`,children:[(0,z.jsx)(`div`,{className:`target`,ref:t,children:`Target`}),(0,z.jsx)(c,{target:t,warpable:e.warpable,renderDirections:e.renderDirections,onWarp:e=>{e.target.style.transform=e.transform}})]})})}var De,z;function Oe(){return(Oe=t((()=>{De=e(r()),o(),z=i()})))()}var ke;function Ae(){return(Ae=t((()=>{ke=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={props.draggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    zoom={props.zoom}
                    // origin={props.origin}
                    // padding={props.padding}
                    clippable={props.clippable}
                    clipRelative={props.clipRelative}
                    clipArea={props.clipArea}
                    dragArea={props.dragArea}
                    dragWithClip={props.dragWithClip}
                    defaultClipPath={props.defaultClipPath}
                    clipTargetBounds={props.clipTargetBounds}
                    // clipVerticalGuidelines={props.clipVerticalGuidelines}
                    // clipHorizontalGuidelines={props.clipHorizontalGuidelines}
                    snapThreshold={5}
                    keepRatio={props.keepRatio}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onClip={e => {
                        e.target.style.clipPath = e.clipStyle;
                    }} />
            </div>
        </div>
    );
}
`})))()}var je;function Me(){return(Me=t((()=>{je=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={props.draggable}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef}>Target</div>
                <Moveable
                    target={targetRef}
                    originDraggable={true}
                    draggable={true}
                    rotatable={true}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onDragOrigin={e => {
                        e.target.style.transformOrigin = e.transformOrigin;
                        e.target.style.transform = e.drag.transform;
                    }}
                    onRotate={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var Fe;function Ie(){return(Ie=t((()=>{Fe=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="container">
                <p>Pinch the target with two fingers on a touch-capable device.</p>
                <p>Drag, Scale and Rotate are possible.</p>
                <div className="target">Target</div>
                <Moveable
                    target={".target"}
                    draggable={true}
                    scalable={true}
                    rotatable={true}
                    pinchable={true}
                    pinchOutside={true}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var Le;function Re(){return(Re=t((()=>{Le=`
import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    maxWidth: props.maxWidth,
                    maxHeight: props.maxHeight,
                    minWidth: props.minWidth,
                    minHeight: props.minHeight,
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    resizable={props.resizable}
                    keepRatio={props.keepRatio}
                    throttleResize={props.throttleResize}
                    renderDirections={props.renderDirections}
                    onResize={e => {
                        e.target.style.width = \`\${e.width}px\`;
                        e.target.style.height = \`\${e.height}px\`;
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var ze;function Be(){return(Be=t((()=>{ze=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg)",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
                    onRotate={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var Ve;function He(){return(He=t((()=>{Ve=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return (
        <div className="root">
            <div className="container">
                <div className="target target1"
                    style={{
                        left: "10px",
                        top: "10px",
                        borderRadius: "25px",
                    }}
                >Target1</div>
                <div className="target target2"
                    style={{
                        left: "140px",
                        top: "10px",
                        borderRadius: "25px 23px",
                    }}
                >Target2</div>
                <div className="target target3"
                    style={{
                        left: "10px",
                        top: "140px",
                        borderRadius: "25px 23px / 20px",
                    }}
                >Target3</div>
                <div className="target target4"
                    style={{
                        left: "140px",
                        top: "140px",
                        borderRadius: "25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px",
                    }}
                >Target4</div>
                <Moveable
                    target={".target1"}
                    draggable={true}
                    roundable={true}
                    resizable={true}
                    isDisplayShadowRoundControls={"horizontal"}
                    roundClickable={"control"}
                    roundPadding={15}
                    onRound={e => {
                        console.log("ROUND", e.borderRadius);
                    }}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                    onRenderEnd={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
                <Moveable
                    target={".target2"}
                    roundable={true}
                    roundClickable={true}
                    onRound={e => {
                        console.log("ROUND", e.borderRadius);
                        e.target.style.borderRadius = e.borderRadius;
                    }}
                />
                <Moveable
                    target={".target3"}
                    roundable={true}
                    onRound={e => {
                        console.log("ROUND", e.borderRadius);
                        e.target.style.borderRadius = e.borderRadius;
                    }}
                />
                <Moveable
                    target={".target4"}
                    roundable={true}
                    onRound={e => {
                        console.log("ROUND", e.borderRadius);
                        e.target.style.borderRadius = e.borderRadius;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var Ue;function We(){return(We=t((()=>{Ue=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef}>Target</div>
                <Moveable
                    target={targetRef}
                    scalable={true}
                    keepRatio={props.keepRatio}
                    throttleScale={props.throttleScale}
                    renderDirections={props.renderDirections}
                    onScale={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var Ge;function Ke(){return(Ke=t((()=>{Ge=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef}>Target</div>
                <Moveable
                    target={targetRef}
                    warpable={props.warpable}
                    renderDirections={props.renderDirections}
                    onWarp={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var qe;function Je(){return(Je=t((()=>{qe=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    draggable: any = "$preview_draggable";
    startDragRotate: any = "$preview_startDragRotate";
    throttleDragRotate: any = "$preview_throttleDragRotate";
    zoom: any = "$preview_zoom";
    clippable: any = "$preview_clippable";
    clipRelative: any = "$preview_clipRelative";
    clipArea: any = "$preview_clipArea";
    dragArea: any = "$preview_dragArea";
    dragWithClip: any = "$preview_dragWithClip";
    defaultClipPath: any = "$preview_defaultClipPath";
    clipTargetBounds: any = "$preview_clipTargetBounds";
    keepRatio: any = "$preview_keepRatio";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${this.draggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            .zoom=\${this.zoom}
            .clippable=\${this.clippable}
            .clipRelative=\${this.clipRelative}
            .clipArea=\${this.clipArea}
            .dragArea=\${this.dragArea}
            .dragWithClip=\${this.dragWithClip}
            .defaultClipPath=\${this.defaultClipPath}
            .clipTargetBounds=\${this.clipTargetBounds}
            .snapThreshold=\${5}
            .keepRatio=\${this.keepRatio}
            @litDrag=\${this.onDrag}
            @litClip=\${this.onClip}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onClip(e) {
        e.target.style.clipPath = e.clipStyle;
    }
}`})))()}var Ye;function Xe(){return(Xe=t((()=>{Ye=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    draggable: any = "$preview_draggable";
    throttleDrag: any = "$preview_throttleDrag";
    edgeDraggable: any = "$preview_edgeDraggable";
    startDragRotate: any = "$preview_startDragRotate";
    throttleDragRotate: any = "$preview_throttleDragRotate";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${this.draggable}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            @litDrag=\${this.onDrag}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var Ze;function Qe(){return(Qe=t((()=>{Ze=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .originDraggable=\${true}
            .litDraggable=\${true}
            .rotatable=\${true}
            @litDrag=\${this.onDrag}
            @litDragOrigin=\${this.onDragOrigin}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onDragOrigin(e) {
        e.target.style.transformOrigin = e.transformOrigin;
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var $e;function et(){return(et=t((()=>{$e=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <p>
            Pinch the target with two fingers on a touch-capable device.
        </p>
        <p>Drag, Scale and Rotate are possible.</p>
        <div class="target">Target</div>
        <lit-moveable
            .target=\${".target"}
            .litDraggable=\${true}
            .scalable=\${true}
            .rotatable=\${true}
            .pinchable=\${true}
            .pinchOutside=\${true}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var tt;function nt(){return(nt=t((()=>{tt=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    maxWidth: any = "$preview_maxWidth";
    maxHeight: any = "$preview_maxHeight";
    minWidth: any = "$preview_minWidth";
    minHeight: any = "$preview_minHeight";
    resizable: any = "$preview_resizable";
    keepRatio: any = "$preview_keepRatio";
    throttleResize: any = "$preview_throttleResize";
    renderDirections: any = "$preview_renderDirections";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            .style=\${\`max-width: \${this.maxWidth};max-height: \${this.maxHeight};min-width: \${this.minWidth};min-height: \${this.minHeight};\`}
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .resizable=\${this.resizable}
            .keepRatio=\${this.keepRatio}
            .throttleResize=\${this.throttleResize}
            .renderDirections=\${this.renderDirections}
            @litResize=\${this.onResize}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onResize(e) {
        e.target.style.width = \`\${e.width}px\`;
        e.target.style.height = \`\${e.height}px\`;
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var rt;function it(){return(it=t((()=>{rt=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    rotatable: any = "$preview_rotatable";
    throttleRotate: any = "$preview_throttleRotate";
    rotationPosition: any = "$preview_rotationPosition";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            style="transform: translate(0px, 0px) rotate(0deg);"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .rotatable=\${this.rotatable}
            .throttleRotate=\${this.throttleRotate}
            .rotationPosition=\${this.rotationPosition}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var at;function ot(){return(ot=t((()=>{at=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="left: 10px;top: 10px;border-radius: 25px;"
        >Target1</div>
        <div
            class="target target2"
            style="left: 140px;top: 10px;border-radius: 25px 23px;"
        >Target2</div>
        <div
            class="target target3"
            style="left: 10px;top: 140px;border-radius: 25px 23px / 20px;"
        >Target3</div>
        <div
            class="target target4"
            style="left: 140px;top: 140px;border-radius: 25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px;"
        >Target4</div>
        <lit-moveable
            .target=\${".target1"}
            .litDraggable=\${true}
            .roundable=\${true}
            .resizable=\${true}
            .isDisplayShadowRoundControls=\${"horizontal"}
            .roundClickable=\${"control"}
            .roundPadding=\${15}
            @litRound=\${this.onRound}
            @litRender=\${this.onRender}
            @litRenderEnd=\${this.onRenderEnd}
        ></lit-moveable>
        <lit-moveable
            .target=\${".target2"}
            .roundable=\${true}
            .roundClickable=\${true}
            @litRound=\${this.onRound$0}
        ></lit-moveable>
        <lit-moveable
            .target=\${".target3"}
            .roundable=\${true}
            @litRound=\${this.onRound$1}
        ></lit-moveable>
        <lit-moveable
            .target=\${".target4"}
            .roundable=\${true}
            @litRound=\${this.onRound$2}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRound(e) {
        console.log("ROUND", e.borderRadius);
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
    onRenderEnd(e) {
        e.target.style.cssText += e.cssText;
    }
    onRound$0(e) {
        console.log("ROUND", e.borderRadius);
        e.target.style.borderRadius = e.borderRadius;
    }
    onRound$1(e) {
        console.log("ROUND", e.borderRadius);
        e.target.style.borderRadius = e.borderRadius;
    }
    onRound$2(e) {
        console.log("ROUND", e.borderRadius);
        e.target.style.borderRadius = e.borderRadius;
    }
}`})))()}var st;function ct(){return(ct=t((()=>{st=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    keepRatio: any = "$preview_keepRatio";
    throttleScale: any = "$preview_throttleScale";
    renderDirections: any = "$preview_renderDirections";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .scalable=\${true}
            .keepRatio=\${this.keepRatio}
            .throttleScale=\${this.throttleScale}
            .renderDirections=\${this.renderDirections}
            @litScale=\${this.onScale}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onScale(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var lt;function ut(){return(ut=t((()=>{lt=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    warpable: any = "$preview_warpable";
    renderDirections: any = "$preview_renderDirections";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .warpable=\${this.warpable}
            .renderDirections=\${this.renderDirections}
            @litWarp=\${this.onWarp}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onWarp(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var dt;function ft(){return(ft=t((()=>{dt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var pt;function B(){return(B=t((()=>{pt=`import Moveable from "moveable";

const draggable = "$preview_draggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const zoom = "$preview_zoom";
const clippable = "$preview_clippable";
const clipRelative = "$preview_clipRelative";
const clipArea = "$preview_clipArea";
const dragArea = "$preview_dragArea";
const dragWithClip = "$preview_dragWithClip";
const defaultClipPath = "$preview_defaultClipPath";
const clipTargetBounds = "$preview_clipTargetBounds";
const keepRatio = "$preview_keepRatio";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: draggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate,
    zoom: zoom,
    clippable: clippable,
    clipRelative: clipRelative,
    clipArea: clipArea,
    dragArea: dragArea,
    dragWithClip: dragWithClip,
    defaultClipPath: defaultClipPath,
    clipTargetBounds: clipTargetBounds,
    snapThreshold: 5,
    keepRatio: keepRatio
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("clip", e => {
    e.target.style.clipPath = e.clipStyle;
});`})))()}var mt;function ht(){return(ht=t((()=>{mt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var gt;function _t(){return(_t=t((()=>{gt=`import Moveable from "moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: draggable,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});`})))()}var vt;function yt(){return(yt=t((()=>{vt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var bt;function xt(){return(xt=t((()=>{bt=`import Moveable from "moveable";

let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    originDraggable: true,
    draggable: true,
    rotatable: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("dragOrigin", e => {
    e.target.style.transformOrigin = e.transformOrigin;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var St;function Ct(){return(Ct=t((()=>{St=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <p>
            Pinch the target with two fingers on a touch-capable device.
        </p>
        <p>Drag, Scale and Rotate are possible.</p>
        <div class="target">Target</div>
    </div>
</div>`})))()}var wt;function Tt(){return(Tt=t((()=>{wt=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    scalable: true,
    rotatable: true,
    pinchable: true,
    pinchOutside: true
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var Et;function Dt(){return(Dt=t((()=>{Et=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style={\`max-width: \${this.maxWidth};max-height: \${this.maxHeight};min-width: \${this.minWidth};min-height: \${this.minHeight};\`}
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var Ot;function kt(){return(kt=t((()=>{Ot=`import Moveable from "moveable";

const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    resizable: resizable,
    keepRatio: keepRatio,
    throttleResize: throttleResize,
    renderDirections: renderDirections
});
moveable$0.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});`})))()}var At;function jt(){return(jt=t((()=>{At=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="transform: translate(0px, 0px) rotate(0deg);"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var Mt;function Nt(){return(Nt=t((()=>{Mt=`import Moveable from "moveable";

const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    rotatable: rotatable,
    throttleRotate: throttleRotate,
    rotationPosition: rotationPosition
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var Pt;function Ft(){return(Ft=t((()=>{Pt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target target1"
            style="left: 10px;top: 10px;border-radius: 25px;"
        >Target1</div>
        <div
            class="target target2"
            style="left: 140px;top: 10px;border-radius: 25px 23px;"
        >Target2</div>
        <div
            class="target target3"
            style="left: 10px;top: 140px;border-radius: 25px 23px / 20px;"
        >Target3</div>
        <div
            class="target target4"
            style="left: 140px;top: 140px;border-radius: 25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px;"
        >Target4</div>
    </div>
</div>`})))()}var It;function Lt(){return(Lt=t((()=>{It=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target1",
    draggable: true,
    roundable: true,
    resizable: true,
    isDisplayShadowRoundControls: "horizontal",
    roundClickable: "control",
    roundPadding: 15
});
const moveable$1 = new Moveable(element$0, {
    target: ".target2",
    roundable: true,
    roundClickable: true
});
const moveable$2 = new Moveable(element$0, {
    target: ".target3",
    roundable: true
});
const moveable$3 = new Moveable(element$0, {
    target: ".target4",
    roundable: true
});
moveable$0.on("round", e => {
    console.log("ROUND", e.borderRadius);
});
moveable$0.on("render", e => {
    e.target.style.cssText += e.cssText;
});
moveable$0.on("renderEnd", e => {
    e.target.style.cssText += e.cssText;
});
moveable$1.on("round", e => {
    console.log("ROUND", e.borderRadius);
    e.target.style.borderRadius = e.borderRadius;
});
moveable$2.on("round", e => {
    console.log("ROUND", e.borderRadius);
    e.target.style.borderRadius = e.borderRadius;
});
moveable$3.on("round", e => {
    console.log("ROUND", e.borderRadius);
    e.target.style.borderRadius = e.borderRadius;
});`})))()}var Rt;function zt(){return(zt=t((()=>{Rt=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var Bt;function Vt(){return(Vt=t((()=>{Bt=`import Moveable from "moveable";

const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    scalable: true,
    keepRatio: keepRatio,
    throttleScale: throttleScale,
    renderDirections: renderDirections
});
moveable$0.on("scale", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var Ht;function Ut(){return(Ut=t((()=>{Ht=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var Wt;function Gt(){return(Gt=t((()=>{Wt=`import Moveable from "moveable";

const warpable = "$preview_warpable";
const renderDirections = "$preview_renderDirections";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    warpable: warpable,
    renderDirections: renderDirections
});
moveable$0.on("warp", e => {
    e.target.style.transform = e.transform;
});`})))()}var Kt;function qt(){return(qt=t((()=>{Kt=`<script>
import Moveable from "svelte-moveable";

const draggable = "$preview_draggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const zoom = "$preview_zoom";
const clippable = "$preview_clippable";
const clipRelative = "$preview_clipRelative";
const clipArea = "$preview_clipArea";
const dragArea = "$preview_dragArea";
const dragWithClip = "$preview_dragWithClip";
const defaultClipPath = "$preview_defaultClipPath";
const clipTargetBounds = "$preview_clipTargetBounds";
const keepRatio = "$preview_keepRatio";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={draggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            zoom={zoom}
            clippable={clippable}
            clipRelative={clipRelative}
            clipArea={clipArea}
            dragArea={dragArea}
            dragWithClip={dragWithClip}
            defaultClipPath={defaultClipPath}
            clipTargetBounds={clipTargetBounds}
            snapThreshold={5}
            keepRatio={keepRatio}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:clip={({ detail: e }) => {
                e.target.style.clipPath = e.clipStyle;
            }}/>
    </div>
</div>`})))()}var Jt;function Yt(){return(Yt=t((()=>{Jt=`<script>
import Moveable from "svelte-moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={draggable}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var Xt;function Zt(){return(Zt=t((()=>{Xt=`<script>
import Moveable from "svelte-moveable";

let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
        >Target</div>
        <Moveable
            target={targetRef}
            originDraggable={true}
            draggable={true}
            rotatable={true}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:dragOrigin={({ detail: e }) => {
                e.target.style.transformOrigin = e.transformOrigin;
                e.target.style.transform = e.drag.transform;
            }}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var Qt;function $t(){return($t=t((()=>{Qt=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <p>
            Pinch the target with two fingers on a touch-capable device.
        </p>
        <p>Drag, Scale and Rotate are possible.</p>
        <div class="target">Target</div>
        <Moveable
            target={".target"}
            draggable={true}
            scalable={true}
            rotatable={true}
            pinchable={true}
            pinchOutside={true}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var en;function tn(){return(tn=t((()=>{en=`<script>
import Moveable from "svelte-moveable";

const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style={\`max-width: \${maxWidth};max-height: \${maxHeight};min-width: \${minWidth};min-height: \${minHeight};\`}
        >Target</div>
        <Moveable
            target={targetRef}
            resizable={resizable}
            keepRatio={keepRatio}
            throttleResize={throttleResize}
            renderDirections={renderDirections}
            on:resize={({ detail: e }) => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var nn;function rn(){return(rn=t((()=>{nn=`<script>
import Moveable from "svelte-moveable";

const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style="transform: translate(0px, 0px) rotate(0deg);"
        >Target</div>
        <Moveable
            target={targetRef}
            rotatable={rotatable}
            throttleRotate={throttleRotate}
            rotationPosition={rotationPosition}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var an;function on(){return(on=t((()=>{an=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="left: 10px;top: 10px;border-radius: 25px;"
        >Target1</div>
        <div
            class="target target2"
            style="left: 140px;top: 10px;border-radius: 25px 23px;"
        >Target2</div>
        <div
            class="target target3"
            style="left: 10px;top: 140px;border-radius: 25px 23px / 20px;"
        >Target3</div>
        <div
            class="target target4"
            style="left: 140px;top: 140px;border-radius: 25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px;"
        >Target4</div>
        <Moveable
            target={".target1"}
            draggable={true}
            roundable={true}
            resizable={true}
            isDisplayShadowRoundControls={"horizontal"}
            roundClickable={"control"}
            roundPadding={15}
            on:round={({ detail: e }) => {
                console.log("ROUND", e.borderRadius);
            }}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}
            on:renderEnd={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
        <Moveable
            target={".target2"}
            roundable={true}
            roundClickable={true}
            on:round={({ detail: e }) => {
                console.log("ROUND", e.borderRadius);
                e.target.style.borderRadius = e.borderRadius;
            }}/>
        <Moveable
            target={".target3"}
            roundable={true}
            on:round={({ detail: e }) => {
                console.log("ROUND", e.borderRadius);
                e.target.style.borderRadius = e.borderRadius;
            }}/>
        <Moveable
            target={".target4"}
            roundable={true}
            on:round={({ detail: e }) => {
                console.log("ROUND", e.borderRadius);
                e.target.style.borderRadius = e.borderRadius;
            }}/>
    </div>
</div>`})))()}var sn;function cn(){return(cn=t((()=>{sn=`<script>
import Moveable from "svelte-moveable";

const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
        >Target</div>
        <Moveable
            target={targetRef}
            scalable={true}
            keepRatio={keepRatio}
            throttleScale={throttleScale}
            renderDirections={renderDirections}
            on:scale={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var ln;function un(){return(un=t((()=>{ln=`<script>
import Moveable from "svelte-moveable";

const warpable = "$preview_warpable";
const renderDirections = "$preview_renderDirections";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
        >Target</div>
        <Moveable
            target={targetRef}
            warpable={warpable}
            renderDirections={renderDirections}
            on:warp={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var dn;function fn(){return(fn=t((()=>{dn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const draggable = "$preview_draggable";
        const startDragRotate = "$preview_startDragRotate";
        const throttleDragRotate = "$preview_throttleDragRotate";
        const zoom = "$preview_zoom";
        const clippable = "$preview_clippable";
        const clipRelative = "$preview_clipRelative";
        const clipArea = "$preview_clipArea";
        const dragArea = "$preview_dragArea";
        const dragWithClip = "$preview_dragWithClip";
        const defaultClipPath = "$preview_defaultClipPath";
        const clipTargetBounds = "$preview_clipTargetBounds";
        const keepRatio = "$preview_keepRatio";
        const targetRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onClip = e => {
            e.target.style.clipPath = e.clipStyle;
        };
        return {
            targetRef,
            draggable,
            startDragRotate,
            throttleDragRotate,
            zoom,
            clippable,
            clipRelative,
            clipArea,
            dragArea,
            dragWithClip,
            defaultClipPath,
            clipTargetBounds,
            keepRatio,
            onDrag,
            onClip
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="draggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                :zoom="zoom"
                :clippable="clippable"
                :clipRelative="clipRelative"
                :clipArea="clipArea"
                :dragArea="dragArea"
                :dragWithClip="dragWithClip"
                :defaultClipPath="defaultClipPath"
                :clipTargetBounds="clipTargetBounds"
                :snapThreshold="5"
                :keepRatio="keepRatio"
                @drag="onDrag"
                @clip="onClip"/>
        </div>
    </div>
</template>`})))()}var pn;function mn(){return(mn=t((()=>{pn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const draggable = "$preview_draggable";
        const throttleDrag = "$preview_throttleDrag";
        const edgeDraggable = "$preview_edgeDraggable";
        const startDragRotate = "$preview_startDragRotate";
        const throttleDragRotate = "$preview_throttleDragRotate";
        const targetRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        return {
            targetRef,
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            onDrag
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                @drag="onDrag"/>
        </div>
    </div>
</template>`})))()}var hn;function gn(){return(gn=t((()=>{hn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onDragOrigin = e => {
            e.target.style.transformOrigin = e.transformOrigin;
            e.target.style.transform = e.drag.transform;
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return { targetRef, onDrag, onDragOrigin, onRotate };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
            >Target</div>
            <Moveable
                :target="targetRef"
                :originDraggable="true"
                :draggable="true"
                :rotatable="true"
                @drag="onDrag"
                @dragOrigin="onDragOrigin"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var _n;function vn(){return(vn=t((()=>{_n=`<script>
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
        <div class="container">
            <p>
                Pinch the target with two fingers on a touch-capable device.
            </p>
            <p>Drag, Scale and Rotate are possible.</p>
            <div class="target">Target</div>
            <Moveable
                :target="'.target'"
                :draggable="true"
                :scalable="true"
                :rotatable="true"
                :pinchable="true"
                :pinchOutside="true"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var yn;function bn(){return(bn=t((()=>{yn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const maxWidth = "$preview_maxWidth";
        const maxHeight = "$preview_maxHeight";
        const minWidth = "$preview_minWidth";
        const minHeight = "$preview_minHeight";
        const resizable = "$preview_resizable";
        const keepRatio = "$preview_keepRatio";
        const throttleResize = "$preview_throttleResize";
        const renderDirections = "$preview_renderDirections";
        const targetRef = ref(null);
        const onResize = e => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        return {
            targetRef,
            maxWidth,
            maxHeight,
            minWidth,
            minHeight,
            resizable,
            keepRatio,
            throttleResize,
            renderDirections,
            onResize
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
                :style="\`max-width: \${maxWidth};max-height: \${maxHeight};min-width: \${minWidth};min-height: \${minHeight};\`"
            >Target</div>
            <Moveable
                :target="targetRef"
                :resizable="resizable"
                :keepRatio="keepRatio"
                :throttleResize="throttleResize"
                :renderDirections="renderDirections"
                @resize="onResize"/>
        </div>
    </div>
</template>`})))()}var xn;function Sn(){return(Sn=t((()=>{xn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const rotatable = "$preview_rotatable";
        const throttleRotate = "$preview_throttleRotate";
        const rotationPosition = "$preview_rotationPosition";
        const targetRef = ref(null);
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return {
            targetRef,
            rotatable,
            throttleRotate,
            rotationPosition,
            onRotate
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
                style="transform: translate(0px, 0px) rotate(0deg);"
            >Target</div>
            <Moveable
                :target="targetRef"
                :rotatable="rotatable"
                :throttleRotate="throttleRotate"
                :rotationPosition="rotationPosition"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var Cn;function wn(){return(wn=t((()=>{Cn=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onRound = e => {
            console.log("ROUND", e.borderRadius);
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        const onRenderEnd = e => {
            e.target.style.cssText += e.cssText;
        };
        const onRound$0 = e => {
            console.log("ROUND", e.borderRadius);
            e.target.style.borderRadius = e.borderRadius;
        };
        const onRound$1 = e => {
            console.log("ROUND", e.borderRadius);
            e.target.style.borderRadius = e.borderRadius;
        };
        const onRound$2 = e => {
            console.log("ROUND", e.borderRadius);
            e.target.style.borderRadius = e.borderRadius;
        };
        return {
            onRound,
            onRender,
            onRenderEnd,
            onRound$0,
            onRound$1,
            onRound$2
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target target1"
                style="left: 10px;top: 10px;border-radius: 25px;"
            >Target1</div>
            <div
                class="target target2"
                style="left: 140px;top: 10px;border-radius: 25px 23px;"
            >Target2</div>
            <div
                class="target target3"
                style="left: 10px;top: 140px;border-radius: 25px 23px / 20px;"
            >Target3</div>
            <div
                class="target target4"
                style="left: 140px;top: 140px;border-radius: 25px 25.5px 24.5px 24.9115px / 25.5px 25.5px 24.5px 24.5px;"
            >Target4</div>
            <Moveable
                :target="'.target1'"
                :draggable="true"
                :roundable="true"
                :resizable="true"
                :isDisplayShadowRoundControls="'horizontal'"
                :roundClickable="'control'"
                :roundPadding="15"
                @round="onRound"
                @render="onRender"
                @renderEnd="onRenderEnd"/>
            <Moveable
                :target="'.target2'"
                :roundable="true"
                :roundClickable="true"
                @round="onRound$0"/>
            <Moveable
                :target="'.target3'"
                :roundable="true"
                @round="onRound$1"/>
            <Moveable
                :target="'.target4'"
                :roundable="true"
                @round="onRound$2"/>
        </div>
    </div>
</template>`})))()}var Tn;function En(){return(En=t((()=>{Tn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const keepRatio = "$preview_keepRatio";
        const throttleScale = "$preview_throttleScale";
        const renderDirections = "$preview_renderDirections";
        const targetRef = ref(null);
        const onScale = e => {
            e.target.style.transform = e.drag.transform;
        };
        return {
            targetRef,
            keepRatio,
            throttleScale,
            renderDirections,
            onScale
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
            >Target</div>
            <Moveable
                :target="targetRef"
                :scalable="true"
                :keepRatio="keepRatio"
                :throttleScale="throttleScale"
                :renderDirections="renderDirections"
                @scale="onScale"/>
        </div>
    </div>
</template>`})))()}var Dn;function On(){return(On=t((()=>{Dn=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const warpable = "$preview_warpable";
        const renderDirections = "$preview_renderDirections";
        const targetRef = ref(null);
        const onWarp = e => {
            e.target.style.transform = e.transform;
        };
        return { targetRef, warpable, renderDirections, onWarp };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target"
                ref="targetRef"
            >Target</div>
            <Moveable
                :target="targetRef"
                :warpable="warpable"
                :renderDirections="renderDirections"
                @warp="onWarp"/>
        </div>
    </div>
</template>`})))()}var V,H,U,kn,W,G,K,q,J,Y,X,Z,Q,$,An;function jn(){return(jn=t((()=>{me(),ve(),y(),S(),E(),A(),N(),L(),Oe(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),ct(),ut(),ft(),B(),ht(),_t(),yt(),xt(),Ct(),Tt(),Dt(),kt(),jt(),Nt(),Ft(),Lt(),zt(),Vt(),Ut(),Gt(),qt(),Yt(),Zt(),$t(),tn(),rn(),on(),cn(),un(),fn(),mn(),gn(),vn(),bn(),Sn(),wn(),En(),On(),ne(),ie(),ue(),ee(),a(),{expect:V}=__STORYBOOK_MODULE_TEST__,H=Object.assign({"./ReactClippableApp.tsx":de,"./ReactDraggableApp.tsx":he,"./ReactOriginDraggableApp.tsx":ye,"./ReactPinchableApp.tsx":xe,"./ReactResizableApp.tsx":Se,"./ReactRotatableApp.tsx":Ce,"./ReactRoundableApp.tsx":we,"./ReactScalableApp.tsx":Te,"./ReactWarpableApp.tsx":Ee}),U=Object.assign({"./ReactClippableApp.tsx":ke,"./ReactDraggableApp.tsx":je,"./ReactOriginDraggableApp.tsx":Ne,"./ReactPinchableApp.tsx":Fe,"./ReactResizableApp.tsx":Le,"./ReactRotatableApp.tsx":ze,"./ReactRoundableApp.tsx":Ve,"./ReactScalableApp.tsx":Ue,"./ReactWarpableApp.tsx":Ge,"./lit/ReactClippableApp/App.ts":qe,"./lit/ReactDraggableApp/App.ts":Ye,"./lit/ReactOriginDraggableApp/App.ts":Ze,"./lit/ReactPinchableApp/App.ts":$e,"./lit/ReactResizableApp/App.ts":tt,"./lit/ReactRotatableApp/App.ts":rt,"./lit/ReactRoundableApp/App.ts":at,"./lit/ReactScalableApp/App.ts":st,"./lit/ReactWarpableApp/App.ts":lt,"./script/ReactClippableApp/App.html":dt,"./script/ReactClippableApp/App.js":pt,"./script/ReactDraggableApp/App.html":mt,"./script/ReactDraggableApp/App.js":gt,"./script/ReactOriginDraggableApp/App.html":vt,"./script/ReactOriginDraggableApp/App.js":bt,"./script/ReactPinchableApp/App.html":St,"./script/ReactPinchableApp/App.js":wt,"./script/ReactResizableApp/App.html":Et,"./script/ReactResizableApp/App.js":Ot,"./script/ReactRotatableApp/App.html":At,"./script/ReactRotatableApp/App.js":Mt,"./script/ReactRoundableApp/App.html":Pt,"./script/ReactRoundableApp/App.js":It,"./script/ReactScalableApp/App.html":Rt,"./script/ReactScalableApp/App.js":Bt,"./script/ReactWarpableApp/App.html":Ht,"./script/ReactWarpableApp/App.js":Wt,"./svelte/ReactClippableApp/App.svelte":Kt,"./svelte/ReactDraggableApp/App.svelte":Jt,"./svelte/ReactOriginDraggableApp/App.svelte":Xt,"./svelte/ReactPinchableApp/App.svelte":Qt,"./svelte/ReactResizableApp/App.svelte":en,"./svelte/ReactRotatableApp/App.svelte":nn,"./svelte/ReactRoundableApp/App.svelte":an,"./svelte/ReactScalableApp/App.svelte":sn,"./svelte/ReactWarpableApp/App.svelte":ln,"./vue3/ReactClippableApp/App.vue":dn,"./vue3/ReactDraggableApp/App.vue":pn,"./vue3/ReactOriginDraggableApp/App.vue":hn,"./vue3/ReactPinchableApp/App.vue":_n,"./vue3/ReactResizableApp/App.vue":yn,"./vue3/ReactRotatableApp/App.vue":xn,"./vue3/ReactRoundableApp/App.vue":Cn,"./vue3/ReactScalableApp/App.vue":Tn,"./vue3/ReactWarpableApp/App.vue":Dn}),kn={title:`Basic`},W={name:`Draggable`,...u(ge,{apps:H,sources:U,argTypes:{...d}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box`);V(n.style.transform).toBe(`translate3d(100px, 150px, 0px)`),await m({target:t,start:[0,0],end:[100,0],duration:100,interval:10}),V(t.style.transform).toBe(`translate(100px, 0px)`),V(n.style.transform).toBe(`translate3d(200px, 150px, 0px)`)})},G={name:`Resizable`,...u(C,{apps:H,sources:U,argTypes:{...se}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box [data-direction="se"]`);await m({target:n,start:[0,0],end:[100,100],duration:100,interval:10}),V(t.style.transform).toBe(`translate(0px, 0px)`),V(t.style.width).toBe(`200px`),V(t.style.height).toBe(`200px`)})},K={name:`Scalable`,...u(P,{apps:H,sources:U,argTypes:{...re}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box [data-direction="se"]`);await m({target:n,start:[0,0],end:[50,100],duration:100,interval:10}),V(t.style.transform).toBe(`translate(25px, 50px) scale(1.5, 2)`)})},q={name:`Scalable keepRatio Test`,tags:[`hidden-test`],...u(P,{apps:H,sources:U,argTypes:{...re},args:{keepRatio:!0}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box [data-direction="nw"]`);await m({target:n,start:[0,0],end:[300,300],duration:100,interval:10}),V(t.style.transform).toBe(`translate(150px, 150px) scale(-2, -2)`)})},J={name:`Rotatable`,...u(D,{apps:H,sources:U,argTypes:{...ce}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box .moveable-rotation-control`);await f({target:n,start:0,end:90,duration:100,interval:10,baseTarget:t}),V(t.style.transform).toBe(`translate(0px, 0px) rotate(90deg)`)})},Y={name:`Warpable`,...u(R,{apps:H,sources:U,argTypes:{...ae}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box [data-direction="se"]`);await m({target:n,start:[0,0],end:[10,10],duration:100,interval:10});let r=te(t.style.transform);[1.04545,.0454545,0,-909091e-9,.0454545,1.04545,0,-909091e-9,0,0,1,0,0,0,0,1].forEach((e,t)=>{V(r[t]).toBeCloseTo(e,4)})})},X={name:`Clippable`,...u(fe,{apps:H,sources:U,argTypes:{...d,...oe}}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box [data-clip-index="4"]`);await m({target:n,start:[0,0],end:[-40,-40],duration:100,interval:10}),V(t.style.clipPath).toBe(`inset(0px 40px 40px 0px)`)})},Z={name:`Roundable`,...u(j,{apps:H,sources:U}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelectorAll(`.target`),n=e.querySelectorAll(`.moveable-control-box`),r=n[0].querySelector(`[data-radius-index="0"]`);await m({target:r,start:[0,0],end:[10,0],duration:100,interval:10}),V(t[0].style.borderRadius).toBe(`35px`);let i=n[1].querySelector(`[data-radius-index="1"]`);await m({target:i,start:[0,0],end:[-10,0],duration:100,interval:10}),V(t[1].style.borderRadius).toBe(`25px 33px`)})},Q={name:`OriginDraggable`,...u(be,{apps:H,sources:U}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`),n=e.querySelector(`.moveable-control-box .moveable-rotation-control`);await f({target:n,start:0,end:60,duration:100,interval:10,baseTarget:t});let r=t.getBoundingClientRect(),i=e.querySelector(`.moveable-control-box .moveable-origin`);await m({target:i,start:[0,0],end:[30,30],duration:100,interval:10});let a=t.getBoundingClientRect();V(s(r.left,.1)).toBe(s(a.left,.1)),V(s(r.top,.1)).toBe(s(a.top,.1))})},$={name:`Pinchable`,...u(b,{apps:H,sources:U}),play:l(async({canvasElement:e})=>{await p();let t=e.querySelector(`.target`);await le({target:t,start:[0,0],end:[100,0],startOffset:[100,0],endOffset:[-200,0],duration:100,interval:10}),V(t.style.transform).toBe(`translate(100px, 0px) rotate(-180deg) scale(2, 2)`)})},An=[`BasicDraggable`,`BasicResizable`,`BasicScalable`,`BasicScalableKeepRatioTest`,`BaiscRotatable`,`BasicWarpable`,`BasicClippable`,`BasicRoundable`,`BasicOriginDraggable`,`BasicPinchable`],W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: "Draggable",
  ...appStory(ReactDraggableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_DRAGGABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;
    expect(controlBox.style.transform).toBe("translate3d(100px, 150px, 0px)");
    await pan({
      target,
      start: [0, 0],
      end: [100, 0],
      duration: 100,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(100px, 0px)");
    expect(controlBox.style.transform).toBe("translate3d(200px, 150px, 0px)");
  })
} satisfies StoryObj`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: "Resizable",
  ...appStory(ReactResizableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_RESIZABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const resizeControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-direction="se"]\`)!;
    await pan({
      target: resizeControl,
      start: [0, 0],
      end: [100, 100],
      duration: 100,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(0px, 0px)");
    expect(target.style.width).toBe("200px");
    expect(target.style.height).toBe("200px");
  })
} satisfies StoryObj`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "Scalable",
  ...appStory(ReactScalableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_SCALABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const resizeControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-direction="se"]\`)!;
    await pan({
      target: resizeControl,
      start: [0, 0],
      end: [50, 100],
      duration: 100,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(25px, 50px) scale(1.5, 2)");
  })
} satisfies StoryObj`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: "Scalable keepRatio Test",
  tags: ["hidden-test"],
  ...appStory(ReactScalableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_SCALABLE_CONTROLS
    },
    args: {
      keepRatio: true
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const resizeControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-direction="nw"]\`)!;
    await pan({
      target: resizeControl,
      start: [0, 0],
      end: [300, 300],
      duration: 100,
      interval: 10
    });
    expect(target.style.transform).toBe("translate(150px, 150px) scale(-2, -2)");
  })
} satisfies StoryObj`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: "Rotatable",
  ...appStory(ReactRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_ROTATABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const rotationControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box .moveable-rotation-control\`)!;
    await rotate({
      target: rotationControl,
      start: 0,
      end: 90,
      duration: 100,
      interval: 10,
      baseTarget: target
    });
    expect(target.style.transform).toBe("translate(0px, 0px) rotate(90deg)");
  })
} satisfies StoryObj`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Warpable",
  ...appStory(ReactWarpableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_WARPABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const seControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-direction="se"]\`)!;
    await pan({
      target: seControl,
      start: [0, 0],
      end: [10, 10],
      duration: 100,
      interval: 10
    });
    const mat = parseMat(target.style.transform);
    [1.04545, 0.0454545, 0, -0.000909091, 0.0454545, 1.04545, 0, -0.000909091, 0, 0, 1, 0, 0, 0, 0, 1].forEach((v, i) => {
      expect(mat[i]).toBeCloseTo(v, 4);
    });
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Clippable",
  ...appStory(ReactClippableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_CLIPPABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const seControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-clip-index="4"]\`)!;
    await pan({
      target: seControl,
      start: [0, 0],
      end: [-40, -40],
      duration: 100,
      interval: 10
    });
    expect(target.style.clipPath).toBe(\`inset(0px 40px 40px 0px)\`);
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Roundable",
  ...appStory(ReactRoundableApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const targets = canvasElement.querySelectorAll<HTMLElement>(".target")!;
    const moveables = canvasElement.querySelectorAll<HTMLElement>(".moveable-control-box")!;

    // first
    const radius0Control = moveables[0].querySelector<HTMLElement>(\`[data-radius-index="0"]\`)!;
    await pan({
      target: radius0Control,
      start: [0, 0],
      end: [10, 0],
      duration: 100,
      interval: 10
    });
    expect(targets[0].style.borderRadius).toBe(\`35px\`);

    // second
    const radius1Control = moveables[1].querySelector<HTMLElement>(\`[data-radius-index="1"]\`)!;
    await pan({
      target: radius1Control,
      start: [0, 0],
      end: [-10, 0],
      duration: 100,
      interval: 10
    });
    expect(targets[1].style.borderRadius).toBe(\`25px 33px\`);
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "OriginDraggable",
  ...appStory(ReactOriginDraggableApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    const rotationControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box .moveable-rotation-control\`)!;
    await rotate({
      target: rotationControl,
      start: 0,
      end: 60,
      duration: 100,
      interval: 10,
      baseTarget: target
    });
    const clientRect1 = target.getBoundingClientRect();
    const originControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box .moveable-origin\`)!;
    await pan({
      target: originControl,
      start: [0, 0],
      end: [30, 30],
      duration: 100,
      interval: 10
    });
    const clientRect2 = target.getBoundingClientRect();
    expect(throttle(clientRect1.left, 0.1)).toBe(throttle(clientRect2.left, 0.1));
    expect(throttle(clientRect1.top, 0.1)).toBe(throttle(clientRect2.top, 0.1));
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: "Pinchable",
  ...appStory(ReactPinchableApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const target = canvasElement.querySelector<HTMLElement>(".target")!;
    // const controlBox = canvasElement.querySelector<HTMLElement>(".moveable-control-box")!;

    await pinch({
      target,
      start: [0, 0],
      end: [100, 0],
      startOffset: [100, 0],
      endOffset: [-200, 0],
      duration: 100,
      interval: 10
    });
    expect(target.style.transform).toBe(\`translate(100px, 0px) rotate(-180deg) scale(2, 2)\`);
  })
} satisfies StoryObj`,...$.parameters?.docs?.source}}}})))()}jn();export{J as BaiscRotatable,X as BasicClippable,W as BasicDraggable,Q as BasicOriginDraggable,$ as BasicPinchable,G as BasicResizable,Z as BasicRoundable,K as BasicScalable,q as BasicScalableKeepRatioTest,Y as BasicWarpable,An as __namedExportsOrder,kn as default};