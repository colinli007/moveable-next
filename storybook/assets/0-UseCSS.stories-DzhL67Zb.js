import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{c as a,l as o,r as ee,t as s}from"./story-uRijs6RN.js";import{a as c,c as te,g as ne,o as re,r as l,s as u}from"./default-C91InR83.js";var ie=n({default:()=>ae});function ae(e){let t=oe.useRef(null);return(0,d.jsx)(`div`,{className:`root`,children:(0,d.jsxs)(`div`,{className:`container`,children:[(0,d.jsx)(`div`,{className:`target`,ref:t,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target`}),(0,d.jsx)(o,{target:t,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,scalable:!0,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,originDraggable:e.originDraggable,originRelative:e.originRelative,onDragOrigin:e=>{e.target.style.transformOrigin=e.transformOrigin},onRender:e=>{e.target.style.transform=e.transform}})]})})}var oe,d;function se(){return(se=t((()=>{oe=e(r()),a(),d=i()})))()}var ce=n({default:()=>le});function le(e){let t=f.useRef(null);return(0,p.jsx)(`div`,{className:`root`,children:(0,p.jsxs)(`div`,{className:`container`,children:[(0,p.jsx)(`div`,{className:`target`,ref:t,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target`}),(0,p.jsx)(o,{target:t,originDraggable:e.originDraggable,originRelative:e.originRelative,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,scalable:e.scalable,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onDragOrigin:e=>{e.target.style.transformOrigin=e.transformOrigin,e.target.style.transform=e.drag.transform},onDrag:e=>{e.target.style.transform=e.transform},onScale:e=>{e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var f,p;function m(){return(m=t((()=>{f=e(r()),a(),p=i()})))()}var ue=n({default:()=>h});function h(e){let t=g.useRef(null),n=g.useRef(null);return(0,_.jsx)(`div`,{className:`root`,children:(0,_.jsxs)(`div`,{className:`container`,children:[(0,_.jsx)(`div`,{className:`target`,ref:t,style:{maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:e.minHeight},children:`Target`}),(0,_.jsx)(o,{ref:n,target:t,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,resizable:e.resizable,keepRatio:e.keepRatio,throttleResize:e.throttleResize,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var g,_;function v(){return(v=t((()=>{g=e(r()),a(),_=i()})))()}var de=n({default:()=>y});function y(e){let t=b.useRef(null);return(0,x.jsx)(`div`,{className:`root`,children:(0,x.jsxs)(`div`,{className:`container`,children:[(0,x.jsx)(`div`,{className:`target`,ref:t,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target`}),(0,x.jsx)(o,{target:t,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,scalable:e.scalable,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onDrag:e=>{e.target.style.transform=e.transform},onScale:e=>{e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})})}var b,x;function S(){return(S=t((()=>{b=e(r()),a(),x=i()})))()}var C;function w(){return(w=t((()=>{C=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={props.draggable}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    scalable={true}
                    keepRatio={props.keepRatio}
                    throttleScale={props.throttleScale}
                    renderDirections={props.renderDirections}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
                    originDraggable={props.originDraggable}
                    originRelative={props.originRelative}
                    onDragOrigin={e => {
                        e.target.style.transformOrigin = e.transformOrigin;
                    }}
                    onRender={e => {
                        e.target.style.transform = e.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var T;function E(){return(E=t((()=>{T=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    originDraggable={props.originDraggable}
                    originRelative={props.originRelative}
                    draggable={props.draggable}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    scalable={props.scalable}
                    keepRatio={props.keepRatio}
                    throttleScale={props.throttleScale}
                    renderDirections={props.renderDirections}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
                    onDragOrigin={e => {
                        e.target.style.transformOrigin = e.transformOrigin;
                        e.target.style.transform = e.drag.transform;
                    }}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onScale={e => {
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
`})))()}var D;function O(){return(O=t((()=>{D=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const moveableRef = React.useRef<Moveable>(null);

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
                    ref={moveableRef}
                    target={targetRef}
                    draggable={props.draggable}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    resizable={props.resizable}
                    keepRatio={props.keepRatio}
                    throttleResize={props.throttleResize}
                    renderDirections={props.renderDirections}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
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
            </div>
        </div>
    );
}
`})))()}var k;function A(){return(A=t((()=>{k=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className="root">
            <div className="container">
                <div className="target" ref={targetRef} style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target</div>
                <Moveable
                    target={targetRef}
                    draggable={props.draggable}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    scalable={props.scalable}
                    keepRatio={props.keepRatio}
                    throttleScale={props.throttleScale}
                    renderDirections={props.renderDirections}
                    rotatable={props.rotatable}
                    throttleRotate={props.throttleRotate}
                    rotationPosition={props.rotationPosition}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onScale={e => {
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
`})))()}var j;function M(){return(M=t((()=>{j=`import Moveable from "lit-moveable";
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
    keepRatio: any = "$preview_keepRatio";
    throttleScale: any = "$preview_throttleScale";
    renderDirections: any = "$preview_renderDirections";
    rotatable: any = "$preview_rotatable";
    throttleRotate: any = "$preview_throttleRotate";
    rotationPosition: any = "$preview_rotationPosition";
    originDraggable: any = "$preview_originDraggable";
    originRelative: any = "$preview_originRelative";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${this.draggable}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            .scalable=\${true}
            .keepRatio=\${this.keepRatio}
            .throttleScale=\${this.throttleScale}
            .renderDirections=\${this.renderDirections}
            .rotatable=\${this.rotatable}
            .throttleRotate=\${this.throttleRotate}
            .rotationPosition=\${this.rotationPosition}
            .originDraggable=\${this.originDraggable}
            .originRelative=\${this.originRelative}
            @litDragOrigin=\${this.onDragOrigin}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDragOrigin(e) {
        e.target.style.transformOrigin = e.transformOrigin;
    }
    onRender(e) {
        e.target.style.transform = e.transform;
    }
}`})))()}var N;function P(){return(P=t((()=>{N=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    originDraggable: any = "$preview_originDraggable";
    originRelative: any = "$preview_originRelative";
    draggable: any = "$preview_draggable";
    throttleDrag: any = "$preview_throttleDrag";
    edgeDraggable: any = "$preview_edgeDraggable";
    startDragRotate: any = "$preview_startDragRotate";
    throttleDragRotate: any = "$preview_throttleDragRotate";
    scalable: any = "$preview_scalable";
    keepRatio: any = "$preview_keepRatio";
    throttleScale: any = "$preview_throttleScale";
    renderDirections: any = "$preview_renderDirections";
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
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .originDraggable=\${this.originDraggable}
            .originRelative=\${this.originRelative}
            .litDraggable=\${this.draggable}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            .scalable=\${this.scalable}
            .keepRatio=\${this.keepRatio}
            .throttleScale=\${this.throttleScale}
            .renderDirections=\${this.renderDirections}
            .rotatable=\${this.rotatable}
            .throttleRotate=\${this.throttleRotate}
            .rotationPosition=\${this.rotationPosition}
            @litDragOrigin=\${this.onDragOrigin}
            @litDrag=\${this.onDrag}
            @litScale=\${this.onScale}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDragOrigin(e) {
        e.target.style.transformOrigin = e.transformOrigin;
        e.target.style.transform = e.drag.transform;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onScale(e) {
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var F;function I(){return(I=t((()=>{F=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    maxWidth: any = "$preview_maxWidth";
    maxHeight: any = "$preview_maxHeight";
    minWidth: any = "$preview_minWidth";
    minHeight: any = "$preview_minHeight";
    draggable: any = "$preview_draggable";
    throttleDrag: any = "$preview_throttleDrag";
    edgeDraggable: any = "$preview_edgeDraggable";
    startDragRotate: any = "$preview_startDragRotate";
    throttleDragRotate: any = "$preview_throttleDragRotate";
    resizable: any = "$preview_resizable";
    keepRatio: any = "$preview_keepRatio";
    throttleResize: any = "$preview_throttleResize";
    renderDirections: any = "$preview_renderDirections";
    rotatable: any = "$preview_rotatable";
    throttleRotate: any = "$preview_throttleRotate";
    rotationPosition: any = "$preview_rotationPosition";
    targetRef: Ref<HTMLDivElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target"
            \${ref(this.targetRef)}
            .style=\${\`max-width: \${this.maxWidth};max-height: \${this.maxHeight};min-width: \${this.minWidth};min-height: \${this.minHeight};\`}
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${this.targetRef}
            .litDraggable=\${this.draggable}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            .resizable=\${this.resizable}
            .keepRatio=\${this.keepRatio}
            .throttleResize=\${this.throttleResize}
            .renderDirections=\${this.renderDirections}
            .rotatable=\${this.rotatable}
            .throttleRotate=\${this.throttleRotate}
            .rotationPosition=\${this.rotationPosition}
            @litDrag=\${this.onDrag}
            @litResize=\${this.onResize}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
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
}`})))()}var L;function R(){return(R=t((()=>{L=`import Moveable from "lit-moveable";
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
    scalable: any = "$preview_scalable";
    keepRatio: any = "$preview_keepRatio";
    throttleScale: any = "$preview_throttleScale";
    renderDirections: any = "$preview_renderDirections";
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
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target</div>
        <lit-moveable
            .target=\${this.targetRef}
            .litDraggable=\${this.draggable}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            .scalable=\${this.scalable}
            .keepRatio=\${this.keepRatio}
            .throttleScale=\${this.throttleScale}
            .renderDirections=\${this.renderDirections}
            .rotatable=\${this.rotatable}
            .throttleRotate=\${this.throttleRotate}
            .rotationPosition=\${this.rotationPosition}
            @litDrag=\${this.onDrag}
            @litScale=\${this.onScale}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onScale(e) {
        e.target.style.transform = e.drag.transform;
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var z;function B(){return(B=t((()=>{z=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var V;function H(){return(H=t((()=>{V=`import Moveable from "moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
const originDraggable = "$preview_originDraggable";
const originRelative = "$preview_originRelative";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: draggable,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate,
    scalable: true,
    keepRatio: keepRatio,
    throttleScale: throttleScale,
    renderDirections: renderDirections,
    rotatable: rotatable,
    throttleRotate: throttleRotate,
    rotationPosition: rotationPosition,
    originDraggable: originDraggable,
    originRelative: originRelative
});
moveable$0.on("dragOrigin", e => {
    e.target.style.transformOrigin = e.transformOrigin;
});
moveable$0.on("render", e => {
    e.target.style.transform = e.transform;
});`})))()}var U;function W(){return(W=t((()=>{U=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var G;function fe(){return(fe=t((()=>{G=`import Moveable from "moveable";

const originDraggable = "$preview_originDraggable";
const originRelative = "$preview_originRelative";
const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const scalable = "$preview_scalable";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    originDraggable: originDraggable,
    originRelative: originRelative,
    draggable: draggable,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate,
    scalable: scalable,
    keepRatio: keepRatio,
    throttleScale: throttleScale,
    renderDirections: renderDirections,
    rotatable: rotatable,
    throttleRotate: throttleRotate,
    rotationPosition: rotationPosition
});
moveable$0.on("dragOrigin", e => {
    e.target.style.transformOrigin = e.transformOrigin;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("scale", e => {
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var pe;function me(){return(me=t((()=>{pe=`<div class="root">
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
</div>`})))()}var he;function ge(){return(ge=t((()=>{he=`import Moveable from "moveable";

const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
let targetRef = null;
let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
moveableRef = new Moveable(element$0, {
    target: targetRef,
    draggable: draggable,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate,
    resizable: resizable,
    keepRatio: keepRatio,
    throttleResize: throttleResize,
    renderDirections: renderDirections,
    rotatable: rotatable,
    throttleRotate: throttleRotate,
    rotationPosition: rotationPosition
});
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveableRef.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveableRef.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var _e;function ve(){return(ve=t((()=>{_e=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var ye;function be(){return(be=t((()=>{ye=`import Moveable from "moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const scalable = "$preview_scalable";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    draggable: draggable,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate,
    scalable: scalable,
    keepRatio: keepRatio,
    throttleScale: throttleScale,
    renderDirections: renderDirections,
    rotatable: rotatable,
    throttleRotate: throttleRotate,
    rotationPosition: rotationPosition
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("scale", e => {
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var xe;function Se(){return(Se=t((()=>{xe=`<script>
import Moveable from "svelte-moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
const originDraggable = "$preview_originDraggable";
const originRelative = "$preview_originRelative";
let targetRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={draggable}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            scalable={true}
            keepRatio={keepRatio}
            throttleScale={throttleScale}
            renderDirections={renderDirections}
            rotatable={rotatable}
            throttleRotate={throttleRotate}
            rotationPosition={rotationPosition}
            originDraggable={originDraggable}
            originRelative={originRelative}
            on:dragOrigin={({ detail: e }) => {
                e.target.style.transformOrigin = e.transformOrigin;
            }}
            on:render={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}/>
    </div>
</div>`})))()}var Ce;function we(){return(we=t((()=>{Ce=`<script>
import Moveable from "svelte-moveable";

const originDraggable = "$preview_originDraggable";
const originRelative = "$preview_originRelative";
const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const scalable = "$preview_scalable";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
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
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target</div>
        <Moveable
            target={targetRef}
            originDraggable={originDraggable}
            originRelative={originRelative}
            draggable={draggable}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            scalable={scalable}
            keepRatio={keepRatio}
            throttleScale={throttleScale}
            renderDirections={renderDirections}
            rotatable={rotatable}
            throttleRotate={throttleRotate}
            rotationPosition={rotationPosition}
            on:dragOrigin={({ detail: e }) => {
                e.target.style.transformOrigin = e.transformOrigin;
                e.target.style.transform = e.drag.transform;
            }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:scale={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var Te;function Ee(){return(Ee=t((()=>{Te=`<script>
import Moveable from "svelte-moveable";

const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
const rotatable = "$preview_rotatable";
const throttleRotate = "$preview_throttleRotate";
const rotationPosition = "$preview_rotationPosition";
let targetRef = null;
let moveableRef = null;
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target"
            bind:this={targetRef}
            style={\`max-width: \${maxWidth};max-height: \${maxHeight};min-width: \${minWidth};min-height: \${minHeight};\`}
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={targetRef}
            draggable={draggable}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            resizable={resizable}
            keepRatio={keepRatio}
            throttleResize={throttleResize}
            renderDirections={renderDirections}
            rotatable={rotatable}
            throttleRotate={throttleRotate}
            rotationPosition={rotationPosition}
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
    </div>
</div>`})))()}var De;function Oe(){return(Oe=t((()=>{De=`<script>
import Moveable from "svelte-moveable";

const draggable = "$preview_draggable";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
const scalable = "$preview_scalable";
const keepRatio = "$preview_keepRatio";
const throttleScale = "$preview_throttleScale";
const renderDirections = "$preview_renderDirections";
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
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target</div>
        <Moveable
            target={targetRef}
            draggable={draggable}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            scalable={scalable}
            keepRatio={keepRatio}
            throttleScale={throttleScale}
            renderDirections={renderDirections}
            rotatable={rotatable}
            throttleRotate={throttleRotate}
            rotationPosition={rotationPosition}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:scale={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var ke;function Ae(){return(Ae=t((()=>{ke=`<script>
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
        const keepRatio = "$preview_keepRatio";
        const throttleScale = "$preview_throttleScale";
        const renderDirections = "$preview_renderDirections";
        const rotatable = "$preview_rotatable";
        const throttleRotate = "$preview_throttleRotate";
        const rotationPosition = "$preview_rotationPosition";
        const originDraggable = "$preview_originDraggable";
        const originRelative = "$preview_originRelative";
        const targetRef = ref(null);
        const onDragOrigin = e => {
            e.target.style.transformOrigin = e.transformOrigin;
        };
        const onRender = e => {
            e.target.style.transform = e.transform;
        };
        return {
            targetRef,
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            keepRatio,
            throttleScale,
            renderDirections,
            rotatable,
            throttleRotate,
            rotationPosition,
            originDraggable,
            originRelative,
            onDragOrigin,
            onRender
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
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                :scalable="true"
                :keepRatio="keepRatio"
                :throttleScale="throttleScale"
                :renderDirections="renderDirections"
                :rotatable="rotatable"
                :throttleRotate="throttleRotate"
                :rotationPosition="rotationPosition"
                :originDraggable="originDraggable"
                :originRelative="originRelative"
                @dragOrigin="onDragOrigin"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var je;function Me(){return(Me=t((()=>{je=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const originDraggable = "$preview_originDraggable";
        const originRelative = "$preview_originRelative";
        const draggable = "$preview_draggable";
        const throttleDrag = "$preview_throttleDrag";
        const edgeDraggable = "$preview_edgeDraggable";
        const startDragRotate = "$preview_startDragRotate";
        const throttleDragRotate = "$preview_throttleDragRotate";
        const scalable = "$preview_scalable";
        const keepRatio = "$preview_keepRatio";
        const throttleScale = "$preview_throttleScale";
        const renderDirections = "$preview_renderDirections";
        const rotatable = "$preview_rotatable";
        const throttleRotate = "$preview_throttleRotate";
        const rotationPosition = "$preview_rotationPosition";
        const targetRef = ref(null);
        const onDragOrigin = e => {
            e.target.style.transformOrigin = e.transformOrigin;
            e.target.style.transform = e.drag.transform;
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onScale = e => {
            e.target.style.transform = e.drag.transform;
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return {
            targetRef,
            originDraggable,
            originRelative,
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            scalable,
            keepRatio,
            throttleScale,
            renderDirections,
            rotatable,
            throttleRotate,
            rotationPosition,
            onDragOrigin,
            onDrag,
            onScale,
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
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target</div>
            <Moveable
                :target="targetRef"
                :originDraggable="originDraggable"
                :originRelative="originRelative"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                :scalable="scalable"
                :keepRatio="keepRatio"
                :throttleScale="throttleScale"
                :renderDirections="renderDirections"
                :rotatable="rotatable"
                :throttleRotate="throttleRotate"
                :rotationPosition="rotationPosition"
                @dragOrigin="onDragOrigin"
                @drag="onDrag"
                @scale="onScale"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const maxWidth = "$preview_maxWidth";
        const maxHeight = "$preview_maxHeight";
        const minWidth = "$preview_minWidth";
        const minHeight = "$preview_minHeight";
        const draggable = "$preview_draggable";
        const throttleDrag = "$preview_throttleDrag";
        const edgeDraggable = "$preview_edgeDraggable";
        const startDragRotate = "$preview_startDragRotate";
        const throttleDragRotate = "$preview_throttleDragRotate";
        const resizable = "$preview_resizable";
        const keepRatio = "$preview_keepRatio";
        const throttleResize = "$preview_throttleResize";
        const renderDirections = "$preview_renderDirections";
        const rotatable = "$preview_rotatable";
        const throttleRotate = "$preview_throttleRotate";
        const rotationPosition = "$preview_rotationPosition";
        const targetRef = ref(null);
        const moveableRef = ref(null);
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
        return {
            targetRef,
            maxWidth,
            maxHeight,
            minWidth,
            minHeight,
            moveableRef,
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            resizable,
            keepRatio,
            throttleResize,
            renderDirections,
            rotatable,
            throttleRotate,
            rotationPosition,
            onDrag,
            onResize,
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
                :style="\`max-width: \${maxWidth};max-height: \${maxHeight};min-width: \${minWidth};min-height: \${minHeight};\`"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="targetRef"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                :resizable="resizable"
                :keepRatio="keepRatio"
                :throttleResize="throttleResize"
                :renderDirections="renderDirections"
                :rotatable="rotatable"
                :throttleRotate="throttleRotate"
                :rotationPosition="rotationPosition"
                @drag="onDrag"
                @resize="onResize"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var K;function Fe(){return(Fe=t((()=>{K=`<script>
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
        const scalable = "$preview_scalable";
        const keepRatio = "$preview_keepRatio";
        const throttleScale = "$preview_throttleScale";
        const renderDirections = "$preview_renderDirections";
        const rotatable = "$preview_rotatable";
        const throttleRotate = "$preview_throttleRotate";
        const rotationPosition = "$preview_rotationPosition";
        const targetRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onScale = e => {
            e.target.style.transform = e.drag.transform;
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        return {
            targetRef,
            draggable,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            scalable,
            keepRatio,
            throttleScale,
            renderDirections,
            rotatable,
            throttleRotate,
            rotationPosition,
            onDrag,
            onScale,
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
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target</div>
            <Moveable
                :target="targetRef"
                :draggable="draggable"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                :scalable="scalable"
                :keepRatio="keepRatio"
                :throttleScale="throttleScale"
                :renderDirections="renderDirections"
                :rotatable="rotatable"
                :throttleRotate="throttleRotate"
                :rotationPosition="rotationPosition"
                @drag="onDrag"
                @scale="onScale"
                @rotate="onRotate"/>
        </div>
    </div>
</template>`})))()}var q,J,Ie,Y,X,Z,Q,Le;function $(){return($=t((()=>{se(),m(),v(),S(),w(),E(),O(),A(),M(),P(),I(),R(),B(),H(),W(),fe(),me(),ge(),ve(),be(),Se(),we(),Ee(),Oe(),Ae(),Me(),Pe(),Fe(),ee(),ne(),q=Object.assign({"./ReactAllInOneApp.tsx":ie,"./ReactDraggableOriginDraggableRotatableApp.tsx":ce,"./ReactDraggableResizableRotatableApp.tsx":ue,"./ReactDraggableScalableRotatableApp.tsx":de}),J=Object.assign({"./ReactAllInOneApp.tsx":C,"./ReactDraggableOriginDraggableRotatableApp.tsx":T,"./ReactDraggableResizableRotatableApp.tsx":D,"./ReactDraggableScalableRotatableApp.tsx":k,"./lit/ReactAllInOneApp/App.ts":j,"./lit/ReactDraggableOriginDraggableRotatableApp/App.ts":N,"./lit/ReactDraggableResizableRotatableApp/App.ts":F,"./lit/ReactDraggableScalableRotatableApp/App.ts":L,"./script/ReactAllInOneApp/App.html":z,"./script/ReactAllInOneApp/App.js":V,"./script/ReactDraggableOriginDraggableRotatableApp/App.html":U,"./script/ReactDraggableOriginDraggableRotatableApp/App.js":G,"./script/ReactDraggableResizableRotatableApp/App.html":pe,"./script/ReactDraggableResizableRotatableApp/App.js":he,"./script/ReactDraggableScalableRotatableApp/App.html":_e,"./script/ReactDraggableScalableRotatableApp/App.js":ye,"./svelte/ReactAllInOneApp/App.svelte":xe,"./svelte/ReactDraggableOriginDraggableRotatableApp/App.svelte":Ce,"./svelte/ReactDraggableResizableRotatableApp/App.svelte":Te,"./svelte/ReactDraggableScalableRotatableApp/App.svelte":De,"./vue3/ReactAllInOneApp/App.vue":ke,"./vue3/ReactDraggableOriginDraggableRotatableApp/App.vue":je,"./vue3/ReactDraggableResizableRotatableApp/App.vue":Ne,"./vue3/ReactDraggableScalableRotatableApp/App.vue":K}),Ie={title:`Able Combination`},Y={name:`Draggable & Resizable & Rotatable`,...s(h,{apps:q,sources:J,argTypes:{...l,...re,...u}})},X={name:`Draggable & Scalable & Rotatable`,...s(y,{apps:q,sources:J,argTypes:{...l,...te,...u}})},Z={name:`Draggable & OriginDraggable & Rotatable`,...s(le,{apps:q,sources:J,argTypes:{...c,...l,...u}})},Q={name:`All In One`,...s(ae,{apps:q,sources:J,argTypes:{...c,...l,...te,...u}})},Le=[`CombinationDraggableResizableRotatble`,`CombinationDraggableScalableRotatable`,`CombinationDraggableOriginRotatable`,`CombinationAllInOne`],Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Draggable & Resizable & Rotatable",
  ...appStory(ReactDraggableResizableRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_RESIZABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Draggable & Scalable & Rotatable",
  ...appStory(ReactDraggableScalableRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_SCALABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Draggable & OriginDraggable & Rotatable",
  ...appStory(ReactDraggableOriginDraggableRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_ORIGIN_DRAGGABLE_CONTROLS,
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "All In One",
  ...appStory(ReactAllInOneApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_ORIGIN_DRAGGABLE_CONTROLS,
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_SCALABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}}})))()}$();export{Q as CombinationAllInOne,Z as CombinationDraggableOriginRotatable,Y as CombinationDraggableResizableRotatble,X as CombinationDraggableScalableRotatable,Le as __namedExportsOrder,Ie as default};