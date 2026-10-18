import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{I as ee,L as te,Q as ne,a,c as o,ct as s,l as c,n as l,o as u,r as re,t as d}from"./story-uRijs6RN.js";import{c as ie,g as ae,o as oe,r as f,s as p}from"./default-C91InR83.js";import{a as se,n as ce,o as m,r as h}from"./testing-D3qGHjyB.js";var le=n({default:()=>g});function g(e){return(0,_.jsx)(`div`,{className:`root`,children:(0,_.jsxs)(`div`,{className:`container`,children:[(0,_.jsx)(`div`,{className:`target target1`,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target1`}),(0,_.jsx)(`div`,{className:`target target2`,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target2`}),(0,_.jsx)(`div`,{className:`target target3`,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target3`}),(0,_.jsx)(c,{target:`.target`,hideChildMoveableDefaultLines:e.hideChildMoveableDefaultLines,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,scalable:!0,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.transform=e.transform})}})]})})}var _;function ue(){return(ue=t((()=>{r(),o(),_=i()})))()}var de=n({default:()=>fe});function fe(e){let t=pe.useRef(null);return(0,v.jsxs)(`div`,{className:`container`,children:[(0,v.jsx)(`button`,{onClick:()=>{t.current.updateRect()},children:`Resize`}),(0,v.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,v.jsx)(`div`,{className:`target target2`,style:{minWidth:`50px`,minHeight:`50px`},children:`Target2`}),(0,v.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,v.jsx)(c,{ref:t,target:`.target`,hideChildMoveableDefaultLines:e.hideChildMoveableDefaultLines,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,resizable:e.resizable,keepRatio:e.keepRatio,throttleResize:e.throttleResize,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onDragGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.transform})},onResizeGroupStart:({setMin:t,setMax:n})=>{t([e.minWidth,e.minHeight]),n([e.maxWidth,e.maxHeight])},onResizeGroup:({events:e})=>{e.forEach(e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform})},onRotateGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.drag.transform})}})]})}var pe,v;function me(){return(me=t((()=>{pe=e(r()),o(),v=i()})))()}var he=n({default:()=>y});function y(e){return(0,b.jsxs)(`div`,{className:`container`,children:[(0,b.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,b.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,b.jsx)(`div`,{className:`target target3`,style:{transform:`scale(1, -1)`},children:`Target3`}),(0,b.jsx)(c,{target:`.target`,hideChildMoveableDefaultLines:e.hideChildMoveableDefaultLines,draggable:e.draggable,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,scalable:e.scalable,keepRatio:e.keepRatio,throttleScale:e.throttleScale,renderDirections:e.renderDirections,rotatable:e.rotatable,throttleRotate:e.throttleRotate,rotationPosition:e.rotationPosition,onDragGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.transform})},onScaleGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.drag.transform})},onRotateGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.drag.transform})}})]})}var b;function x(){return(x=t((()=>{r(),o(),b=i()})))()}var ge=n({default:()=>S});function S(e){return(0,C.jsx)(`div`,{className:`root`,children:(0,C.jsxs)(`div`,{className:`container`,children:[(0,C.jsx)(`div`,{className:`target target1`,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target1`}),(0,C.jsx)(`div`,{className:`target target2`,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target2`}),(0,C.jsx)(`div`,{className:`target target3`,style:{transform:`translate(0px, 0px) rotate(0deg) scale(1, 1)`},children:`Target3`}),(0,C.jsx)(c,{target:`.target`,draggable:!0,resizable:!0,keepRatio:!1,onDragGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})},onResizeGroup:e=>{e.direction[0]===-1?e.events.forEach(t=>{t.target.style.width=`${t.width-t.dist[0]+e.dist[0]}px`,t.target.style.cssText+=`margin-left: ${-e.dist[0]}px`}):e.direction[0]===1&&e.events.forEach(t=>{t.target.style.width=`${t.width-t.dist[0]+e.dist[0]}px`})}})]})})}var C;function w(){return(w=t((()=>{r(),o(),C=i()})))()}var _e=n({default:()=>T});function T(){let e=E.useRef(null);return(0,D.jsxs)(`div`,{className:`container`,children:[(0,D.jsx)(`button`,{onClick:()=>{e.current.updateRect()},children:`Resize`}),(0,D.jsx)(`div`,{className:`target target1`,style:{transform:`rotate(30deg)`},children:`Target1`}),(0,D.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,D.jsx)(`div`,{className:`target target3`,style:{transform:`rotate(30deg)`},children:`Target3`}),(0,D.jsx)(c,{ref:e,target:[[`.target1, .target2`],`.target3`],draggable:!0,rotatable:!0,scalable:!0,onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.transform=e.transform})}})]})}var E,D;function O(){return(O=t((()=>{E=e(r()),o(),D=i()})))()}var ve=n({default:()=>k});function k(){return(0,A.jsx)(`div`,{className:`root`,children:(0,A.jsxs)(`div`,{className:`container`,children:[(0,A.jsx)(`div`,{className:`target target1`,style:{borderRadius:`10px`},children:`Target1`}),(0,A.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,A.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,A.jsx)(c,{target:`.target`,draggable:!0,roundable:!0,resizable:!0,rotatable:!0,isDisplayShadowRoundControls:`horizontal`,roundClickable:`control`,roundPadding:15,onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})}})]})})}var A;function j(){return(j=t((()=>{r(),o(),A=i()})))()}var M;function N(){return(N=t((()=>{M=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root">
            <div className="container">
                <div className="target target1" style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target1</div>
                <div className="target target2" style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target2</div>
                <div className="target target3" style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target3</div>
                <Moveable
                    target={".target"}
                    hideChildMoveableDefaultLines={props.hideChildMoveableDefaultLines}
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
                    onRenderGroup={e => {
                        e.events.forEach(ev => {
                            ev.target.style.transform = ev.transform;
                        });
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var P;function F(){return(F=t((()=>{P=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const moveableRef = React.useRef<Moveable>(null);

    return <div className="container">
        <button onClick={() => {
            moveableRef.current!.updateRect();
        }}>Resize</button>
        <div className="target target1">Target1</div>
        <div className="target target2" style={{
            minWidth: "50px",
            minHeight: "50px",
        }}>Target2</div>
        <div className="target target3">Target3</div>
        <Moveable
            ref={moveableRef}
            target={".target"}
            hideChildMoveableDefaultLines={props.hideChildMoveableDefaultLines}
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
            onDragGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
            onResizeGroupStart={({ setMin, setMax }) => {
                setMin([props.minWidth, props.minHeight]);
                setMax([props.maxWidth, props.maxHeight]);
            }}
            onResizeGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.width = \`\${ev.width}px\`;
                    ev.target.style.height = \`\${ev.height}px\`;
                    ev.target.style.transform = ev.drag.transform;
                });
            }}
            onRotateGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.drag.transform;
                });
            }}
        />
    </div>;
}
`})))()}var I;function L(){return(L=t((()=>{I=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return <div className="container">
        <div className="target target1">Target1</div>
        <div className="target target2">Target2</div>
        <div className="target target3" style={{
            transform: "scale(1, -1)",
        }}>Target3</div>
        <Moveable
            target={".target"}
            hideChildMoveableDefaultLines={props.hideChildMoveableDefaultLines}
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
            onDragGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
            onScaleGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.drag.transform;
                });
            }}
            onRotateGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.drag.transform;
                });
            }}
        />
    </div>;
}
`})))()}var R;function z(){return(z=t((()=>{R=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    return (
        <div className="root">
            <div className="container">
                <div className="target target1" style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target1</div>
                <div className="target target2" style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target2</div>
                <div className="target target3" style={{
                    transform: "translate(0px, 0px) rotate(0deg) scale(1, 1)",
                }}>Target3</div>
                <Moveable
                    target={".target"}
                    draggable={true}
                    resizable={true}
                    keepRatio={false}
                    onDragGroup={e => {
                        e.events.forEach(ev => {
                            ev.target.style.cssText += ev.cssText;
                        });
                    }}
                    onResizeGroup={(e) => {
                        if (e.direction[0] === -1) {
                            // left edge
                            e.events.forEach((ev) => {
                                ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                                ev.target.style.cssText += \`margin-left: \${-e.dist[0]}px\`; // the first resize moves the element , not desireable
                            });
                        } else if (e.direction[0] === 1) {
                            //right edge
                            e.events.forEach((ev) => {
                                ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                            });
                        }
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var B;function V(){return(V=t((()=>{B=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);
    return (<div className="container">
        <button onClick={() => {
            moveableRef.current!.updateRect();
        }}>Resize</button>
        <div className="target target1"  style={{
            transform: "rotate(30deg)",
        }}>Target1</div>
        <div className="target target2">Target2</div>
        <div className="target target3" style={{
            transform: "rotate(30deg)",
        }}>Target3</div>
        <Moveable
            ref={moveableRef}
            target={[[".target1, .target2"], ".target3"]}
            draggable={true}
            rotatable={true}
            scalable={true}
            onRenderGroup={e => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
        />
    </div>);
}
`})))()}var ye;function be(){return(be=t((()=>{ye=`import * as React from "react";
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
                    roundable={true}
                    resizable={true}
                    rotatable={true}
                    isDisplayShadowRoundControls={"horizontal"}
                    roundClickable={"control"}
                    roundPadding={15}
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
`})))()}var xe;function Se(){return(Se=t((()=>{xe=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    hideChildMoveableDefaultLines: any = "$preview_hideChildMoveableDefaultLines";
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
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target1</div>
        <div
            class="target target2"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target2</div>
        <div
            class="target target3"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target3</div>
        <lit-moveable
            .target=\${".target"}
            .hideChildMoveableDefaultLines=\${this.hideChildMoveableDefaultLines}
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
            @litRenderGroup=\${this.onRenderGroup}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onRenderGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
}`})))()}var Ce;function we(){return(we=t((()=>{Ce=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    hideChildMoveableDefaultLines: any = "$preview_hideChildMoveableDefaultLines";
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
    minWidth: any = "$preview_minWidth";
    minHeight: any = "$preview_minHeight";
    maxWidth: any = "$preview_maxWidth";
    maxHeight: any = "$preview_maxHeight";
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="container">
    <button @click=\${this.onClick}>Resize</button>
    <div class="target target1">Target1</div>
    <div
        class="target target2"
        style="min-width: 50px;min-height: 50px;"
    >Target2</div>
    <div class="target target3">Target3</div>
    <lit-moveable
        \${ref(this.moveableRef)}
        .target=\${".target"}
        .hideChildMoveableDefaultLines=\${this.hideChildMoveableDefaultLines}
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
        @litDragGroup=\${this.onDragGroup}
        @litResizeGroupStart=\${this.onResizeGroupStart}
        @litResizeGroup=\${this.onResizeGroup}
        @litRotateGroup=\${this.onRotateGroup}
    ></lit-moveable>
</div>\`;
    }
    onClick() {
        this.moveableRef.value!.updateRect();
    }
    onDragGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
    onResizeGroupStart({ setMin, setMax }) {
        setMin([this.minWidth, this.minHeight]);
        setMax([this.maxWidth, this.maxHeight]);
    }
    onResizeGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.width = \`\${ev.width}px\`;
            ev.target.style.height = \`\${ev.height}px\`;
            ev.target.style.transform = ev.drag.transform;
        });
    }
    onRotateGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.drag.transform;
        });
    }
}`})))()}var Te;function Ee(){return(Ee=t((()=>{Te=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    hideChildMoveableDefaultLines: any = "$preview_hideChildMoveableDefaultLines";
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
    render() {
        return html \`<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        style="transform: scale(1, -1);"
    >Target3</div>
    <lit-moveable
        .target=\${".target"}
        .hideChildMoveableDefaultLines=\${this.hideChildMoveableDefaultLines}
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
        @litDragGroup=\${this.onDragGroup}
        @litScaleGroup=\${this.onScaleGroup}
        @litRotateGroup=\${this.onRotateGroup}
    ></lit-moveable>
</div>\`;
    }
    onDragGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
    onScaleGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.drag.transform;
        });
    }
    onRotateGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.drag.transform;
        });
    }
}`})))()}var De;function Oe(){return(Oe=t((()=>{De=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target1</div>
        <div
            class="target target2"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target2</div>
        <div
            class="target target3"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target3</div>
        <lit-moveable
            .target=\${".target"}
            .litDraggable=\${true}
            .resizable=\${true}
            .keepRatio=\${false}
            @litDragGroup=\${this.onDragGroup}
            @litResizeGroup=\${this.onResizeGroup}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDragGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    }
    onResizeGroup(e) {
        if (e.direction[0] === -1) {
            e.events.forEach((ev) => {
                ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                ev.target.style.cssText += \`margin-left: \${-e.dist[0]}px\`;
            });
        } else if (e.direction[0] === 1) {
            e.events.forEach((ev) => {
                ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
            });
        }
    }
}`})))()}var ke;function Ae(){return(Ae=t((()=>{ke=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="container">
    <button @click=\${this.onClick}>Resize</button>
    <div
        class="target target1"
        style="transform: rotate(30deg);"
    >Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        style="transform: rotate(30deg);"
    >Target3</div>
    <lit-moveable
        \${ref(this.moveableRef)}
        .target=\${[[".target1, .target2"], ".target3"]}
        .litDraggable=\${true}
        .rotatable=\${true}
        .scalable=\${true}
        @litRenderGroup=\${this.onRenderGroup}
    ></lit-moveable>
</div>\`;
    }
    onClick() {
        this.moveableRef.value!.updateRect();
    }
    onRenderGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
}`})))()}var je;function Me(){return(Me=t((()=>{je=`import Moveable from "lit-moveable";
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
            .roundable=\${true}
            .resizable=\${true}
            .rotatable=\${true}
            .isDisplayShadowRoundControls=\${"horizontal"}
            .roundClickable=\${"control"}
            .roundPadding=\${15}
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
}`})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target target1"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target1</div>
        <div
            class="target target2"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target2</div>
        <div
            class="target target3"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target3</div>
    </div>
</div>`})))()}var Fe;function Ie(){return(Ie=t((()=>{Fe=`import Moveable from "moveable";

const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    hideChildMoveableDefaultLines: hideChildMoveableDefaultLines,
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
    rotationPosition: rotationPosition
});
moveable$0.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});`})))()}var Le;function Re(){return(Re=t((()=>{Le=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <button data-croffle-ref="element$1">Resize</button>
    <div class="target target1">Target1</div>
    <div
        class="target target2"
        style="min-width: 50px;min-height: 50px;"
    >Target2</div>
    <div class="target target3">Target3</div>
</div>`})))()}var H;function ze(){return(ze=t((()=>{H=`import Moveable from "moveable";

const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    hideChildMoveableDefaultLines: hideChildMoveableDefaultLines,
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
element$1.addEventListener("click", () => {
    moveableRef.updateRect();
});
moveableRef.on("dragGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
moveableRef.on("resizeGroupStart", ({ setMin, setMax }) => {
    setMin([minWidth, minHeight]);
    setMax([maxWidth, maxHeight]);
});
moveableRef.on("resizeGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.width = \`\${ev.width}px\`;
        ev.target.style.height = \`\${ev.height}px\`;
        ev.target.style.transform = ev.drag.transform;
    });
});
moveableRef.on("rotateGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.drag.transform;
    });
});`})))()}var Be;function Ve(){return(Ve=t((()=>{Be=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        style="transform: scale(1, -1);"
    >Target3</div>
</div>`})))()}var He;function Ue(){return(Ue=t((()=>{He=`import Moveable from "moveable";

const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    hideChildMoveableDefaultLines: hideChildMoveableDefaultLines,
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
moveable$0.on("dragGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
moveable$0.on("scaleGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.drag.transform;
    });
});
moveable$0.on("rotateGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.drag.transform;
    });
});`})))()}var We;function Ge(){return(Ge=t((()=>{We=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div
            class="target target1"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target1</div>
        <div
            class="target target2"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target2</div>
        <div
            class="target target3"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target3</div>
    </div>
</div>`})))()}var Ke;function qe(){return(qe=t((()=>{Ke=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    resizable: true,
    keepRatio: false
});
moveable$0.on("dragGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});
moveable$0.on("resizeGroup", (e) => {
    if (e.direction[0] === -1) {
        e.events.forEach((ev) => {
            ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
            ev.target.style.cssText += \`margin-left: \${-e.dist[0]}px\`;
        });
    } else if (e.direction[0] === 1) {
        e.events.forEach((ev) => {
            ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
        });
    }
});`})))()}var Je;function Ye(){return(Ye=t((()=>{Je=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <button data-croffle-ref="element$1">Resize</button>
    <div
        class="target target1"
        style="transform: rotate(30deg);"
    >Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        style="transform: rotate(30deg);"
    >Target3</div>
</div>`})))()}var Xe;function Ze(){return(Ze=t((()=>{Xe=`import Moveable from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
moveableRef = new Moveable(element$0, {
    target: [[".target1, .target2"], ".target3"],
    draggable: true,
    rotatable: true,
    scalable: true
});
element$1.addEventListener("click", () => {
    moveableRef.updateRect();
});
moveableRef.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});`})))()}var Qe;function $e(){return($e=t((()=>{Qe=`<div class="root">
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
</div>`})))()}var et;function tt(){return(tt=t((()=>{et=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    roundable: true,
    resizable: true,
    rotatable: true,
    isDisplayShadowRoundControls: "horizontal",
    roundClickable: "control",
    roundPadding: 15
});
moveable$0.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});`})))()}var nt;function rt(){return(rt=t((()=>{nt=`<script>
import Moveable from "svelte-moveable";

const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target1</div>
        <div
            class="target target2"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target2</div>
        <div
            class="target target3"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target3</div>
        <Moveable
            target={".target"}
            hideChildMoveableDefaultLines={hideChildMoveableDefaultLines}
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
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}/>
    </div>
</div>`})))()}var it;function at(){return(at=t((()=>{it=`<script>
import Moveable from "svelte-moveable";

const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
let moveableRef = null;
<\/script>
<div class="container">
    <button on:click={() => {
        moveableRef.updateRect();
    }}>Resize</button>
    <div class="target target1">Target1</div>
    <div
        class="target target2"
        style="min-width: 50px;min-height: 50px;"
    >Target2</div>
    <div class="target target3">Target3</div>
    <Moveable
        bind:this={moveableRef}
        target={".target"}
        hideChildMoveableDefaultLines={hideChildMoveableDefaultLines}
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
        on:dragGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        }}
        on:resizeGroupStart={({ detail: { setMin, setMax } }) => {
            setMin([minWidth, minHeight]);
            setMax([maxWidth, maxHeight]);
        }}
        on:resizeGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.width = \`\${ev.width}px\`;
                ev.target.style.height = \`\${ev.height}px\`;
                ev.target.style.transform = ev.drag.transform;
            });
        }}
        on:rotateGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.drag.transform;
            });
        }}/>
</div>`})))()}var ot;function st(){return(st=t((()=>{ot=`<script>
import Moveable from "svelte-moveable";

const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
<\/script>
<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        style="transform: scale(1, -1);"
    >Target3</div>
    <Moveable
        target={".target"}
        hideChildMoveableDefaultLines={hideChildMoveableDefaultLines}
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
        on:dragGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        }}
        on:scaleGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.drag.transform;
            });
        }}
        on:rotateGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.drag.transform;
            });
        }}/>
</div>`})))()}var ct;function lt(){return(lt=t((()=>{ct=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="root">
    <div class="container">
        <div
            class="target target1"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target1</div>
        <div
            class="target target2"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target2</div>
        <div
            class="target target3"
            style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
        >Target3</div>
        <Moveable
            target={".target"}
            draggable={true}
            resizable={true}
            keepRatio={false}
            on:dragGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}
            on:resizeGroup={({ detail: e }) => {
                if (e.direction[0] === -1) {
                    e.events.forEach((ev) => {
                        ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                        ev.target.style.cssText += \`margin-left: \${-e.dist[0]}px\`;
                    });
                } else if (e.direction[0] === 1) {
                    e.events.forEach((ev) => {
                        ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                    });
                }
            }}/>
    </div>
</div>`})))()}var ut;function dt(){return(dt=t((()=>{ut=`<script>
import Moveable from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="container">
    <button on:click={() => {
        moveableRef.updateRect();
    }}>Resize</button>
    <div
        class="target target1"
        style="transform: rotate(30deg);"
    >Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        style="transform: rotate(30deg);"
    >Target3</div>
    <Moveable
        bind:this={moveableRef}
        target={[[".target1, .target2"], ".target3"]}
        draggable={true}
        rotatable={true}
        scalable={true}
        on:renderGroup={({ detail: e }) => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        }}/>
</div>`})))()}var ft;function pt(){return(pt=t((()=>{ft=`<script>
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
            roundable={true}
            resizable={true}
            rotatable={true}
            isDisplayShadowRoundControls={"horizontal"}
            roundClickable={"control"}
            roundPadding={15}
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}/>
    </div>
</div>`})))()}var mt;function ht(){return(ht=t((()=>{mt=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        return {
            hideChildMoveableDefaultLines,
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
            onRenderGroup
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target target1"
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target1</div>
            <div
                class="target target2"
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target2</div>
            <div
                class="target target3"
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target3</div>
            <Moveable
                :target="'.target'"
                :hideChildMoveableDefaultLines="hideChildMoveableDefaultLines"
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
                @renderGroup="onRenderGroup"/>
        </div>
    </div>
</template>`})))()}var gt;function _t(){return(_t=t((()=>{gt=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
        const minWidth = "$preview_minWidth";
        const minHeight = "$preview_minHeight";
        const maxWidth = "$preview_maxWidth";
        const maxHeight = "$preview_maxHeight";
        const moveableRef = ref(null);
        const onClick = () => {
            moveableRef.value.updateRect();
        };
        const onDragGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        const onResizeGroupStart = ({ setMin, setMax }) => {
            setMin([minWidth, minHeight]);
            setMax([maxWidth, maxHeight]);
        };
        const onResizeGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.width = \`\${ev.width}px\`;
                ev.target.style.height = \`\${ev.height}px\`;
                ev.target.style.transform = ev.drag.transform;
            });
        };
        const onRotateGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.drag.transform;
            });
        };
        return {
            onClick,
            moveableRef,
            hideChildMoveableDefaultLines,
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
            onDragGroup,
            onResizeGroupStart,
            onResizeGroup,
            onRotateGroup
        };
    }
};
<\/script>
<template>
    <div class="container">
        <button @click="onClick">Resize</button>
        <div class="target target1">Target1</div>
        <div
            class="target target2"
            style="min-width: 50px;min-height: 50px;"
        >Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            ref="moveableRef"
            :target="'.target'"
            :hideChildMoveableDefaultLines="hideChildMoveableDefaultLines"
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
            @dragGroup="onDragGroup"
            @resizeGroupStart="onResizeGroupStart"
            @resizeGroup="onResizeGroup"
            @rotateGroup="onRotateGroup"/>
    </div>
</template>`})))()}var vt;function yt(){return(yt=t((()=>{vt=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const hideChildMoveableDefaultLines = "$preview_hideChildMoveableDefaultLines";
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
        const onDragGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        const onScaleGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.drag.transform;
            });
        };
        const onRotateGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.drag.transform;
            });
        };
        return {
            hideChildMoveableDefaultLines,
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
            onDragGroup,
            onScaleGroup,
            onRotateGroup
        };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div
            class="target target3"
            style="transform: scale(1, -1);"
        >Target3</div>
        <Moveable
            :target="'.target'"
            :hideChildMoveableDefaultLines="hideChildMoveableDefaultLines"
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
            @dragGroup="onDragGroup"
            @scaleGroup="onScaleGroup"
            @rotateGroup="onRotateGroup"/>
    </div>
</template>`})))()}var bt;function xt(){return(xt=t((()=>{bt=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDragGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        const onResizeGroup = (e) => {
            if (e.direction[0] === -1) {
                e.events.forEach((ev) => {
                    ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                    ev.target.style.cssText += \`margin-left: \${-e.dist[0]}px\`;
                });
            } else if (e.direction[0] === 1) {
                e.events.forEach((ev) => {
                    ev.target.style.width = \`\${ev.width - ev.dist[0] + e.dist[0]}px\`;
                });
            }
        };
        return { onDragGroup, onResizeGroup };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <div
                class="target target1"
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target1</div>
            <div
                class="target target2"
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target2</div>
            <div
                class="target target3"
                style="transform: translate(0px, 0px) rotate(0deg) scale(1, 1);"
            >Target3</div>
            <Moveable
                :target="'.target'"
                :draggable="true"
                :resizable="true"
                :keepRatio="false"
                @dragGroup="onDragGroup"
                @resizeGroup="onResizeGroup"/>
        </div>
    </div>
</template>`})))()}var St;function Ct(){return(Ct=t((()=>{St=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onClick = () => {
            moveableRef.value.updateRect();
        };
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        return { onClick, moveableRef, onRenderGroup };
    }
};
<\/script>
<template>
    <div class="container">
        <button @click="onClick">Resize</button>
        <div
            class="target target1"
            style="transform: rotate(30deg);"
        >Target1</div>
        <div class="target target2">Target2</div>
        <div
            class="target target3"
            style="transform: rotate(30deg);"
        >Target3</div>
        <Moveable
            ref="moveableRef"
            :target="[['.target1, .target2'], '.target3']"
            :draggable="true"
            :rotatable="true"
            :scalable="true"
            @renderGroup="onRenderGroup"/>
    </div>
</template>`})))()}var wt;function Tt(){return(Tt=t((()=>{wt=`<script>
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
                :roundable="true"
                :resizable="true"
                :rotatable="true"
                :isDisplayShadowRoundControls="'horizontal'"
                :roundClickable="'control'"
                :roundPadding="15"
                @renderGroup="onRenderGroup"/>
        </div>
    </div>
</template>`})))()}var U,Et,Dt;function Ot(){return(Ot=t((()=>{U={hideChildMoveableDefaultLines:a({type:`boolean`,description:u(`Grouppable`,`hideChildMoveableDefaultLines`),defaultValue:!1})},Et={maxWidth:a({type:`number`,description:u(`Resizable`,`OnResizeStart`),defaultValue:0}),maxHeight:a({type:`number`,description:u(`Resizable`,`OnResizeStart`),defaultValue:0}),minWidth:a({type:`number`,description:u(`Resizable`,`OnResizeStart`),defaultValue:0}),minHeight:a({type:`number`,description:u(`Resizable`,`OnResizeStart`),defaultValue:0}),keepRatio:a({type:`boolean`,description:u(`Resizable`,`keepRatio`),defaultValue:!0})},Dt={keepRatio:a({type:`boolean`,description:u(`Scalable`,`keepRatio`),defaultValue:!0})}})))()}var W,kt,G,K,At,q,J,Y,X,Z,Q,jt;function $(){return($=t((()=>{ue(),me(),x(),w(),O(),j(),N(),F(),L(),z(),V(),be(),Se(),we(),Ee(),Oe(),Ae(),Me(),Pe(),Ie(),Re(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),_t(),yt(),xt(),Ct(),Tt(),re(),ae(),Ot(),ce(),ne(),ee(),{expect:W,userEvent:kt}=__STORYBOOK_MODULE_TEST__,G=Object.assign({"./ReactAllInOneApp.tsx":le,"./ReactDraggableResizableRotatableApp.tsx":de,"./ReactDraggableScalableRotatableApp.tsx":he,"./ReactFixedResizeGroupApp.tsx":ge,"./ReactMultipleGroupApp.tsx":_e,"./ReactRoundableGroupApp.tsx":ve}),K=Object.assign({"./ReactAllInOneApp.tsx":M,"./ReactDraggableResizableRotatableApp.tsx":P,"./ReactDraggableScalableRotatableApp.tsx":I,"./ReactFixedResizeGroupApp.tsx":R,"./ReactMultipleGroupApp.tsx":B,"./ReactRoundableGroupApp.tsx":ye,"./lit/ReactAllInOneApp/App.ts":xe,"./lit/ReactDraggableResizableRotatableApp/App.ts":Ce,"./lit/ReactDraggableScalableRotatableApp/App.ts":Te,"./lit/ReactFixedResizeGroupApp/App.ts":De,"./lit/ReactMultipleGroupApp/App.ts":ke,"./lit/ReactRoundableGroupApp/App.ts":je,"./script/ReactAllInOneApp/App.html":Ne,"./script/ReactAllInOneApp/App.js":Fe,"./script/ReactDraggableResizableRotatableApp/App.html":Le,"./script/ReactDraggableResizableRotatableApp/App.js":H,"./script/ReactDraggableScalableRotatableApp/App.html":Be,"./script/ReactDraggableScalableRotatableApp/App.js":He,"./script/ReactFixedResizeGroupApp/App.html":We,"./script/ReactFixedResizeGroupApp/App.js":Ke,"./script/ReactMultipleGroupApp/App.html":Je,"./script/ReactMultipleGroupApp/App.js":Xe,"./script/ReactRoundableGroupApp/App.html":Qe,"./script/ReactRoundableGroupApp/App.js":et,"./svelte/ReactAllInOneApp/App.svelte":nt,"./svelte/ReactDraggableResizableRotatableApp/App.svelte":it,"./svelte/ReactDraggableScalableRotatableApp/App.svelte":ot,"./svelte/ReactFixedResizeGroupApp/App.svelte":ct,"./svelte/ReactMultipleGroupApp/App.svelte":ut,"./svelte/ReactRoundableGroupApp/App.svelte":ft,"./vue3/ReactAllInOneApp/App.vue":mt,"./vue3/ReactDraggableResizableRotatableApp/App.vue":gt,"./vue3/ReactDraggableScalableRotatableApp/App.vue":vt,"./vue3/ReactFixedResizeGroupApp/App.vue":bt,"./vue3/ReactMultipleGroupApp/App.vue":St,"./vue3/ReactRoundableGroupApp/App.vue":wt}),At={title:`Group`},q={name:`Draggable & Resizable & Rotatable`,...d(fe,{apps:G,sources:K,argTypes:{...U,...oe,...p,...f,...Et}}),play:l(async({canvasElement:e})=>{await m();let t=e.querySelector(`.moveable-control-box .moveable-area`),n=e.querySelectorAll(`.target`);await h({target:t,start:[0,0],end:[10,10],duration:100,interval:10});let r=e.querySelector(`.moveable-control-box [data-direction="e"]`);await h({target:r,start:[0,0],end:[140,100],duration:100,interval:10}),W(t.style.width).toBe(`420px`),W(t.style.height).toBe(`345px`),n.forEach(e=>{W(e.style.width).toBe(`150px`)}),await se({target:e.querySelector(`.moveable-rotation-control`),start:0,end:90,duration:100,interval:10,baseTarget:e.querySelector(`.moveable-origin`)}),W(n[0].style.transform).toBe(`translate(242.5px, -85px) rotate(90deg)`),W(n[1].style.transform).toBe(`translate(32.5px, 165px) rotate(90deg)`),W(n[2].style.transform).toBe(`translate(-12.5px, -125px) rotate(90deg)`),W(t.style.width).toBe(`420px`),W(t.style.height).toBe(`345px`)})},J={name:`Draggable & Scalable & Rotatable`,...d(y,{apps:G,sources:K,argTypes:{...U,...ie,...Dt,...p,...f}}),play:l(async({canvasElement:e})=>{await m();let t=e.querySelectorAll(`.target`),n=e.querySelector(`.moveable-control-box [data-direction="e"]`);await h({target:n,start:[0,0],end:[140,100],duration:100,interval:10}),t.forEach((e,t)=>{let n=e.style.transform,r=te(n)[1].functionValue;W(s(r[0],.1)).toBe(1.5),t===2?W(s(r[1],.1)).toBe(-1.5):W(s(r[1],.1)).toBe(1.5)})})},Y={name:`All in One`,...d(g,{apps:G,sources:K,argTypes:{...U,...f,...ie,...p}})},X={name:`Multiple Group`,...d(T,{apps:G,sources:K}),play:l(async({canvasElement:e})=>{await m();let t=e.querySelector(`.moveable-control-box .moveable-area`);await se({target:e.querySelector(`.moveable-rotation-control`),start:0,end:90,duration:100,interval:10,baseTarget:e.querySelector(`.moveable-origin`)});let{left:n,top:r,width:i,height:ee}=t.getBoundingClientRect();W(s(parseFloat(t.style.width),.1)).toBe(298.3),W(s(parseFloat(t.style.height),.1)).toBe(266.6),W(s(n,.1)).toBe(133.4),W(s(r,.1)).toBe(151.7),W(s(i,.1)).toBe(266.9),W(s(ee,.1)).toBe(298.5),await m(),await kt.click(e.querySelector(`button`)),W(s(parseFloat(t.style.width),.1)).toBe(266.5),W(s(parseFloat(t.style.height),.1)).toBe(298.3),W(t.style.transform).toBe(`translate(0px, 0px) rotate(0deg) scale(1, 1)`)})},Z={name:`Roundable Group`,...d(k,{apps:G,sources:K}),play:l(async({canvasElement:e})=>{await m();let t=e.querySelectorAll(`.target`),n=e.querySelector(`.moveable-control-box [data-radius-index="0"]`);await h({target:n,start:[0,0],end:[20,0],duration:100,interval:10}),t.forEach(e=>{W(e.style.borderRadius).toBe(`30px`)})})},Q={name:`Fixed Position Resize Group`,...d(S,{apps:G,sources:K})},jt=[`GroupDraggableResizableRotatable`,`GroupDraggableScalableRotatable`,`GroupAllInOne`,`GroupMultipleGroup`,`GroupRoundableGroup`,`GroupFixedResizeGroup`],q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: "Draggable & Resizable & Rotatable",
  ...appStory(ReactDraggableResizableRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_GROUPPABLE_GROUP_CONTROLS,
      ...DEFAULT_RESIZABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS,
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_RESIZABLE_GROUP_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const areaElement = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box .moveable-area\`)!;
    const targets = canvasElement.querySelectorAll<HTMLElement>(".target")!;
    await pan({
      target: areaElement,
      start: [0, 0],
      end: [10, 10],
      duration: 100,
      interval: 10
    });
    const resizeControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-direction="e"]\`)!;
    await pan({
      target: resizeControl,
      start: [0, 0],
      end: [140, 100],
      duration: 100,
      interval: 10
    });
    expect(areaElement.style.width).toBe("420px");
    expect(areaElement.style.height).toBe("345px");
    targets.forEach(target => {
      expect(target.style.width).toBe("150px");
    });
    await rotate({
      target: canvasElement.querySelector<HTMLElement>(\`.moveable-rotation-control\`)!,
      start: 0,
      end: 90,
      duration: 100,
      interval: 10,
      baseTarget: canvasElement.querySelector<HTMLElement>(\`.moveable-origin\`)!
    });
    expect(targets[0].style.transform).toBe(\`translate(242.5px, -85px) rotate(90deg)\`);
    expect(targets[1].style.transform).toBe(\`translate(32.5px, 165px) rotate(90deg)\`);
    expect(targets[2].style.transform).toBe(\`translate(-12.5px, -125px) rotate(90deg)\`);
    expect(areaElement.style.width).toBe("420px");
    expect(areaElement.style.height).toBe("345px");
  })
} satisfies StoryObj`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: "Draggable & Scalable & Rotatable",
  ...appStory(ReactDraggableScalableRotatableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_GROUPPABLE_GROUP_CONTROLS,
      ...DEFAULT_SCALABLE_CONTROLS,
      ...DEFAULT_SCALABLE_GROUP_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS,
      ...DEFAULT_DRAGGABLE_CONTROLS
    }
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const targets = canvasElement.querySelectorAll<HTMLElement>(".target")!;
    const resizeControl = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-direction="e"]\`)!;
    await pan({
      target: resizeControl,
      start: [0, 0],
      end: [140, 100],
      duration: 100,
      interval: 10
    });
    targets.forEach((target, i) => {
      const transform = target.style.transform;
      const functionValue = parse(transform)[1].functionValue;
      expect(throttle(functionValue[0], 0.1)).toBe(1.5);
      if (i === 2) {
        expect(throttle(functionValue[1], 0.1)).toBe(-1.5);
      } else {
        expect(throttle(functionValue[1], 0.1)).toBe(1.5);
      }
    });
  })
} satisfies StoryObj`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "All in One",
  ...appStory(ReactAllInOneApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_GROUPPABLE_GROUP_CONTROLS,
      ...DEFAULT_DRAGGABLE_CONTROLS,
      ...DEFAULT_SCALABLE_CONTROLS,
      ...DEFAULT_ROTATABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Multiple Group",
  ...appStory(ReactMultipleGroupApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const areaElement = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box .moveable-area\`)!;
    await rotate({
      target: canvasElement.querySelector<HTMLElement>(\`.moveable-rotation-control\`)!,
      start: 0,
      end: 90,
      duration: 100,
      interval: 10,
      baseTarget: canvasElement.querySelector<HTMLElement>(\`.moveable-origin\`)!
    });
    const {
      left,
      top,
      width,
      height
    } = areaElement.getBoundingClientRect();
    expect(throttle(parseFloat(areaElement.style.width), 0.1)).toBe(298.3);
    expect(throttle(parseFloat(areaElement.style.height), 0.1)).toBe(266.6);
    expect(throttle(left, 0.1)).toBe(133.4);
    expect(throttle(top, 0.1)).toBe(151.7);
    expect(throttle(width, 0.1)).toBe(266.9);
    expect(throttle(height, 0.1)).toBe(298.5);

    // click
    await wait();
    await userEvent.click(canvasElement.querySelector("button")!);
    expect(throttle(parseFloat(areaElement.style.width), 0.1)).toBe(266.5);
    expect(throttle(parseFloat(areaElement.style.height), 0.1)).toBe(298.3);
    expect(areaElement.style.transform).toBe("translate(0px, 0px) rotate(0deg) scale(1, 1)");
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Roundable Group",
  ...appStory(ReactRoundableGroupApp, {
    apps,
    sources
  }),
  play: devPlay(async ({
    canvasElement
  }) => {
    await wait();
    const targets = canvasElement.querySelectorAll<HTMLElement>(".target")!;

    // round control
    const radius0Control = canvasElement.querySelector<HTMLElement>(\`.moveable-control-box [data-radius-index="0"]\`)!;
    await pan({
      target: radius0Control,
      start: [0, 0],
      end: [20, 0],
      duration: 100,
      interval: 10
    });
    targets.forEach(target => {
      expect(target.style.borderRadius).toBe("30px");
    });
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Fixed Position Resize Group",
  ...appStory(ReactFixedResizeGroupApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}}})))()}$();export{Y as GroupAllInOne,q as GroupDraggableResizableRotatable,J as GroupDraggableScalableRotatable,Q as GroupFixedResizeGroup,X as GroupMultipleGroup,Z as GroupRoundableGroup,jt as __namedExportsOrder,At as default};