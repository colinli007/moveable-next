import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{Q as ee,c as a,ct as te,l as o,r as ne,t as s}from"./story-uRijs6RN.js";import{i as re,t as c}from"./keycon.esm-8KgCMUhY.js";var ie=n({default:()=>ae});function ae(){return(0,l.jsx)(`div`,{className:`root`,children:(0,l.jsxs)(`div`,{className:`container`,style:{height:`400px`,border:`1px solid black`},children:[(0,l.jsx)(`div`,{className:`target resizable`,style:{position:`absolute`,width:`200px`,height:`100px`,top:`50px`},children:`Resizable Target`}),(0,l.jsx)(`div`,{className:`target scalable`,style:{position:`absolute`,width:`200px`,height:`100px`,top:`150px`,left:`350px`},children:`Scalable Target`}),(0,l.jsx)(o,{target:`.target.resizable`,resizable:!0,draggable:!0,rotatable:!0,snappable:!0,bounds:{left:0,top:0,bottom:0,right:0,position:`css`},onResizeStart:e=>{e.setFixedDirection([0,0])},onDrag:e=>{e.target.style.transform=e.transform},onBeforeResize:e=>{c.global.shiftKey?e.setFixedDirection([-1,-1]):e.setFixedDirection([0,0])},onResize:e=>{e.target.style.cssText+=`width: ${e.width}px; height: ${e.height}px`,e.target.style.transform=e.drag.transform},onBeforeRotate:e=>{e.setRotation(te(e.rotation,45))},onRotate:e=>{e.target.style.transform=e.drag.transform}}),(0,l.jsx)(o,{target:`.target.scalable`,scalable:!0,keepRatio:!0,draggable:!0,snappable:!0,bounds:{left:0,top:0,bottom:0,right:0,position:`css`},onScaleStart:e=>{e.setFixedDirection([0,0])},onDrag:e=>{e.target.style.transform=e.transform},onBeforeScale:e=>{c.global.shiftKey?e.setFixedDirection([-1,-1]):e.setFixedDirection([0,0])},onScale:e=>{e.target.style.transform=e.drag.transform}})]})})}var l;function oe(){return(oe=t((()=>{r(),re(),a(),ee(),l=i(),c.setGlobal()})))()}var se=n({default:()=>ce});function ce(e){let[t,n]=u.useState([0,0]),r=u.useRef(null),i=u.useRef(null);return(0,d.jsx)(`div`,{className:`root`,children:(0,d.jsxs)(`div`,{className:`container`,style:{display:`flex`},children:[(0,d.jsx)(`div`,{className:`target`,ref:r,style:{position:`relative`,width:`200px`,height:`100px`},children:`Target`}),(0,d.jsx)(o,{ref:i,target:r,resizable:!0,keepRatio:!0,throttleResize:1,onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onResizeEnd:e=>{let t=e.lastEvent;t&&console.log(t.drag.transform)}})]})})}var u,d;function le(){return(le=t((()=>{u=e(r()),a(),d=i()})))()}var ue=n({default:()=>f});function f(){return(0,p.jsxs)(`div`,{className:`container`,children:[(0,p.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,p.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,p.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,p.jsx)(o,{target:`.target`,draggable:!0,resizable:!0,onResizeGroupStart:({events:e})=>{e[0].setMin([50,50]),e[1].setMin([60,50]),e[2].setMin([50,60])},onResizeGroup:({events:e})=>{e.forEach(e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform})},onDragGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.transform})},onDragGroupEnd:({events:e})=>{console.log(e)}})]})}var p;function m(){return(m=t((()=>{r(),a(),p=i()})))()}var de=n({default:()=>h});function h(){return(0,g.jsxs)(`div`,{className:`container`,children:[(0,g.jsx)(`div`,{className:`target`,children:`Target1`}),(0,g.jsx)(o,{target:`.target`,keepRatio:!0,triggerAblesSimultaneously:!0,resizable:{edge:[`e`,`w`],renderDirections:[`e`,`w`]},scalable:{edge:[],renderDirections:[`nw`,`ne`,`se`,`sw`]},draggable:!0,edgeDraggable:[`n`,`s`],onDrag:e=>{e.target.style.cssText+=`transform: ${e.transform}`},onResize:e=>{e.target.style.cssText+=`width: ${e.boundingWidth}px;height: ${e.boundingHeight}px;transform: ${e.drag.transform}`},onScale:e=>{e.target.style.cssText+=`transform: ${e.drag.transform}`}})]})}var g;function _(){return(_=t((()=>{r(),a(),g=i()})))()}var v;function y(){return(y=t((()=>{v=`import * as React from "react";
import keycon from "keycon";
import Moveable from "@/react-moveable";
import { throttle } from "@daybrush/utils";


keycon.setGlobal();

export default function App() {
    return (
        <div className="root">
            <div className="container" style={{
                height: "400px",
                border: "1px solid black",
            }}>
                <div className="target resizable" style={{
                    position: "absolute",
                    width: "200px",
                    height: "100px",
                    top: "50px",
                }}>Resizable Target</div>
                <div className="target scalable" style={{
                    position: "absolute",
                    width: "200px",
                    height: "100px",
                    top: "150px",
                    left: "350px",
                }}>Scalable Target</div>
                <Moveable
                    target={".target.resizable"}
                    resizable={true}
                    // keepRatio={true}
                    draggable={true}
                    rotatable={true}
                    snappable={true}
                    bounds={{left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
                    onResizeStart={e => {
                        e.setFixedDirection([0, 0]);
                    }}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onBeforeResize={e => {
                        if (keycon.global.shiftKey) {
                            e.setFixedDirection([-1, -1]);
                        } else {
                            e.setFixedDirection([0, 0]);
                        }
                    }}
                    onResize={e => {
                        e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
                        e.target.style.transform = e.drag.transform;
                    }}
                    onBeforeRotate={e => {
                        e.setRotation(throttle(e.rotation, 45));
                    }}
                    onRotate={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
                <Moveable
                    target={".target.scalable"}
                    scalable={true}
                    keepRatio={true}
                    draggable={true}
                    snappable={true}
                    bounds={{left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
                    onScaleStart={e => {
                        e.setFixedDirection([0, 0]);
                    }}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onBeforeScale={e => {
                        if (keycon.global.shiftKey) {
                            e.setFixedDirection([-1, -1]);
                        } else {
                            e.setFixedDirection([0, 0]);
                        }
                    }}
                    onScale={e => {
                        e.target.style.transform = e.drag.transform;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var b;function x(){return(x=t((()=>{b=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const [translate, setTranslate]  = React.useState([0, 0]);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <div className="container" style={{
                display: "flex",
            }}>
                <div className="target" ref={targetRef} style={{
                    position: "relative",
                    width: "200px",
                    height: "100px",
                    // maxWidth: props.maxWidth,
                    // maxHeight: props.maxHeight,
                    // minWidth: props.minWidth,
                    // minHeight: props.minHeight,
                }}>Target</div>
                <Moveable
                    ref={moveableRef}
                    target={targetRef}
                    resizable={true}
                    keepRatio={true}
                    throttleResize={1}
                    onResize={e => {
                        // const beforeTranslate = e.drag.beforeTranslate;

                        e.target.style.width = \`\${e.width}px\`;
                        e.target.style.height = \`\${e.height}px\`;
                        e.target.style.transform = e.drag.transform;
                    }}
                    onResizeEnd={e => {
                        const lastEvent = e.lastEvent;

                        if (lastEvent) {
                            console.log(lastEvent.drag.transform);
                        }
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var S;function C(){return(C=t((()=>{S=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target target1">Target1</div>
        <div className="target target2">Target2</div>
        <div className="target target3">Target3</div>
        <Moveable
            target={".target"}
            draggable={true}
            resizable={true}
            onResizeGroupStart={({ events }) => {
                events[0].setMin([50, 50]);
                events[1].setMin([60, 50]);
                events[2].setMin([50, 60]);
            }}
            onResizeGroup={({ events }) => {
                events.forEach(ev => {
                    ev.target.style.width = \`\${ev.width}px\`;
                    ev.target.style.height = \`\${ev.height}px\`;
                    ev.target.style.transform = ev.drag.transform;
                });
            }}
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
`})))()}var w;function T(){return(T=t((()=>{w=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    return <div className="container">
        <div className="target">Target1</div>
        <Moveable
            target={".target"}
            keepRatio={true}
            triggerAblesSimultaneously={true}
            resizable={{
                edge: ["e", "w"],
                renderDirections: ["e", "w"],
            }}
            scalable={{
                edge: [],
                renderDirections: ["nw", "ne", "se", "sw"],
            }}
            draggable={true}
            edgeDraggable={["n", "s"]}
            onDrag={e => {
                e.target.style.cssText += \`transform: \${e.transform}\`;
            }}
            onResize={e => {
                e.target.style.cssText += \`width: \${e.boundingWidth}px;\`
                    + \`height: \${e.boundingHeight}px;\`
                    + \`transform: \${e.drag.transform}\`;
            }}
            onScale={e => {
                e.target.style.cssText += \`transform: \${e.drag.transform}\`;
            }}
        />
    </div>;
}
`})))()}var E;function D(){return(D=t((()=>{E=`import keycon from "keycon";
import Moveable from "lit-moveable";
import { throttle } from "@daybrush/utils";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

keycon.setGlobal();
@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="height: 400px;border: 1px solid black;"
    >
        <div
            class="target resizable"
            style="position: absolute;width: 200px;height: 100px;top: 50px;"
        >Resizable Target</div>
        <div
            class="target scalable"
            style="position: absolute;width: 200px;height: 100px;top: 150px;left: 350px;"
        >Scalable Target</div>
        <lit-moveable
            .target=\${".target.resizable"}
            .resizable=\${true}
            .litDraggable=\${true}
            .rotatable=\${true}
            .snappable=\${true}
            .bounds=\${{
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            position: "css"
        }}
            @litResizeStart=\${this.onResizeStart}
            @litDrag=\${this.onDrag}
            @litBeforeResize=\${this.onBeforeResize}
            @litResize=\${this.onResize}
            @litBeforeRotate=\${this.onBeforeRotate}
            @litRotate=\${this.onRotate}
        ></lit-moveable>
        <lit-moveable
            .target=\${".target.scalable"}
            .scalable=\${true}
            .keepRatio=\${true}
            .litDraggable=\${true}
            .snappable=\${true}
            .bounds=\${{
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            position: "css"
        }}
            @litScaleStart=\${this.onScaleStart}
            @litDrag=\${this.onDrag$0}
            @litBeforeScale=\${this.onBeforeScale}
            @litScale=\${this.onScale}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onResizeStart(e) {
        e.setFixedDirection([0, 0]);
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onBeforeResize(e) {
        if (keycon.global.shiftKey) {
            e.setFixedDirection([-1, -1]);
        } else {
            e.setFixedDirection([0, 0]);
        }
    }
    onResize(e) {
        e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
        e.target.style.transform = e.drag.transform;
    }
    onBeforeRotate(e) {
        e.setRotation(throttle(e.rotation, 45));
    }
    onRotate(e) {
        e.target.style.transform = e.drag.transform;
    }
    onScaleStart(e) {
        e.setFixedDirection([0, 0]);
    }
    onDrag$0(e) {
        e.target.style.transform = e.transform;
    }
    onBeforeScale(e) {
        if (keycon.global.shiftKey) {
            e.setFixedDirection([-1, -1]);
        } else {
            e.setFixedDirection([0, 0]);
        }
    }
    onScale(e) {
        e.target.style.transform = e.drag.transform;
    }
}`})))()}var O;function k(){return(k=t((()=>{O=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    @state()
    translate: any = [0, 0];
    targetRef: Ref<HTMLDivElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <div
        class="container"
        style="display: flex;"
    >
        <div
            class="target"
            \${ref(this.targetRef)}
            style="position: relative;width: 200px;height: 100px;"
        >Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${this.targetRef}
            .resizable=\${true}
            .keepRatio=\${true}
            .throttleResize=\${1}
            @litResize=\${this.onResize}
            @litResizeEnd=\${this.onResizeEnd}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onResize(e) {
        e.target.style.width = \`\${e.width}px\`;
        e.target.style.height = \`\${e.height}px\`;
        e.target.style.transform = e.drag.transform;
    }
    onResizeEnd(e) {
        const lastEvent = e.lastEvent;
        if (lastEvent) {
            console.log(lastEvent.drag.transform);
        }
    }
}`})))()}var A;function j(){return(j=t((()=>{A=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div class="target target3">Target3</div>
    <lit-moveable
        .target=\${".target"}
        .litDraggable=\${true}
        .resizable=\${true}
        @litResizeGroupStart=\${this.onResizeGroupStart}
        @litResizeGroup=\${this.onResizeGroup}
        @litDragGroup=\${this.onDragGroup}
        @litDragGroupEnd=\${this.onDragGroupEnd}
    ></lit-moveable>
</div>\`;
    }
    onResizeGroupStart({ events }) {
        events[0].setMin([50, 50]);
        events[1].setMin([60, 50]);
        events[2].setMin([50, 60]);
    }
    onResizeGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.width = \`\${ev.width}px\`;
            ev.target.style.height = \`\${ev.height}px\`;
            ev.target.style.transform = ev.drag.transform;
        });
    }
    onDragGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
    onDragGroupEnd({ events }) {
        console.log(events);
    }
}`})))()}var M;function N(){return(N=t((()=>{M=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("lit-app")
export default class App extends LitElement {
    render() {
        return html \`<div class="container">
    <div class="target">Target1</div>
    <lit-moveable
        .target=\${".target"}
        .keepRatio=\${true}
        .triggerAblesSimultaneously=\${true}
        .resizable=\${{
            edge: ["e", "w"],
            renderDirections: ["e", "w"]
        }}
        .scalable=\${{
            edge: [],
            renderDirections: ["nw", "ne", "se", "sw"]
        }}
        .litDraggable=\${true}
        .edgeDraggable=\${["n", "s"]}
        @litDrag=\${this.onDrag}
        @litResize=\${this.onResize}
        @litScale=\${this.onScale}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.cssText += \`transform: \${e.transform}\`;
    }
    onResize(e) {
        e.target.style.cssText += \`width: \${e.boundingWidth}px;\` + \`height: \${e.boundingHeight}px;\` + \`transform: \${e.drag.transform}\`;
    }
    onScale(e) {
        e.target.style.cssText += \`transform: \${e.drag.transform}\`;
    }
}`})))()}var P;function F(){return(F=t((()=>{P=`<div class="root">
    <div
        class="container"
        style="height: 400px;border: 1px solid black;"
        data-croffle-ref="element$0"
    >
        <div
            class="target resizable"
            style="position: absolute;width: 200px;height: 100px;top: 50px;"
        >Resizable Target</div>
        <div
            class="target scalable"
            style="position: absolute;width: 200px;height: 100px;top: 150px;left: 350px;"
        >Scalable Target</div>
    </div>
</div>`})))()}var I;function L(){return(L=t((()=>{I=`import keycon from "keycon";
import Moveable from "moveable";
import { throttle } from "@daybrush/utils";

keycon.setGlobal();
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target.resizable",
    resizable: true,
    draggable: true,
    rotatable: true,
    snappable: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0, position: "css" }
});
const moveable$1 = new Moveable(element$0, {
    target: ".target.scalable",
    scalable: true,
    keepRatio: true,
    draggable: true,
    snappable: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0, position: "css" }
});
moveable$0.on("resizeStart", e => {
    e.setFixedDirection([0, 0]);
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$0.on("beforeResize", e => {
    if (keycon.global.shiftKey) {
        e.setFixedDirection([-1, -1]);
    } else {
        e.setFixedDirection([0, 0]);
    }
});
moveable$0.on("resize", e => {
    e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveable$0.on("beforeRotate", e => {
    e.setRotation(throttle(e.rotation, 45));
});
moveable$0.on("rotate", e => {
    e.target.style.transform = e.drag.transform;
});
moveable$1.on("scaleStart", e => {
    e.setFixedDirection([0, 0]);
});
moveable$1.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$1.on("beforeScale", e => {
    if (keycon.global.shiftKey) {
        e.setFixedDirection([-1, -1]);
    } else {
        e.setFixedDirection([0, 0]);
    }
});
moveable$1.on("scale", e => {
    e.target.style.transform = e.drag.transform;
});`})))()}var R;function z(){return(z=t((()=>{R=`<div class="root">
    <div
        class="container"
        style="display: flex;"
        data-croffle-ref="element$0"
    >
        <div
            class="target"
            style="position: relative;width: 200px;height: 100px;"
            data-croffle-ref="targetRef"
        >Target</div>
    </div>
</div>`})))()}var B;function V(){return(V=t((()=>{B=`import Moveable from "moveable";

let translate = [0, 0];
let targetRef = null;
let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
moveableRef = new Moveable(element$0, {
    target: targetRef,
    resizable: true,
    keepRatio: true,
    throttleResize: 1
});
function setTranslate(nextTranslate) {
    translate = nextTranslate;
}
moveableRef.on("resize", e => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveableRef.on("resizeEnd", e => {
    const lastEvent = e.lastEvent;
    if (lastEvent) {
        console.log(lastEvent.drag.transform);
    }
});`})))()}var H;function U(){return(U=t((()=>{H=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div class="target target3">Target3</div>
</div>`})))()}var W;function G(){return(G=t((()=>{W=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    resizable: true
});
moveable$0.on("resizeGroupStart", ({ events }) => {
    events[0].setMin([50, 50]);
    events[1].setMin([60, 50]);
    events[2].setMin([50, 60]);
});
moveable$0.on("resizeGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.width = \`\${ev.width}px\`;
        ev.target.style.height = \`\${ev.height}px\`;
        ev.target.style.transform = ev.drag.transform;
    });
});
moveable$0.on("dragGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});
moveable$0.on("dragGroupEnd", ({ events }) => {
    console.log(events);
});`})))()}var fe;function pe(){return(pe=t((()=>{fe=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target">Target1</div>
</div>`})))()}var me;function he(){return(he=t((()=>{me=`import Moveable from "moveable";

const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const moveable$0 = new Moveable(element$0, {
    target: ".target",
    keepRatio: true,
    triggerAblesSimultaneously: true,
    resizable: { edge: ["e", "w"], renderDirections: ["e", "w"] },
    scalable: { edge: [], renderDirections: ["nw", "ne", "se", "sw"] },
    draggable: true,
    edgeDraggable: ["n", "s"]
});
moveable$0.on("drag", e => {
    e.target.style.cssText += \`transform: \${e.transform}\`;
});
moveable$0.on("resize", e => {
    e.target.style.cssText += \`width: \${e.boundingWidth}px;\` + \`height: \${e.boundingHeight}px;\` + \`transform: \${e.drag.transform}\`;
});
moveable$0.on("scale", e => {
    e.target.style.cssText += \`transform: \${e.drag.transform}\`;
});`})))()}var ge;function _e(){return(_e=t((()=>{ge=`<script>
import keycon from "keycon";
import Moveable from "svelte-moveable";
import { throttle } from "@daybrush/utils";

keycon.setGlobal();
<\/script>
<div class="root">
    <div
        class="container"
        style="height: 400px;border: 1px solid black;"
    >
        <div
            class="target resizable"
            style="position: absolute;width: 200px;height: 100px;top: 50px;"
        >Resizable Target</div>
        <div
            class="target scalable"
            style="position: absolute;width: 200px;height: 100px;top: 150px;left: 350px;"
        >Scalable Target</div>
        <Moveable
            target={".target.resizable"}
            resizable={true}
            draggable={true}
            rotatable={true}
            snappable={true}
            bounds={{ left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
            on:resizeStart={({ detail: e }) => {
                e.setFixedDirection([0, 0]);
            }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:beforeResize={({ detail: e }) => {
                if (keycon.global.shiftKey) {
                    e.setFixedDirection([-1, -1]);
                } else {
                    e.setFixedDirection([0, 0]);
                }
            }}
            on:resize={({ detail: e }) => {
                e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            on:beforeRotate={({ detail: e }) => {
                e.setRotation(throttle(e.rotation, 45));
            }}
            on:rotate={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
        <Moveable
            target={".target.scalable"}
            scalable={true}
            keepRatio={true}
            draggable={true}
            snappable={true}
            bounds={{ left: 0, top: 0, bottom: 0, right: 0, position: "css" }}
            on:scaleStart={({ detail: e }) => {
                e.setFixedDirection([0, 0]);
            }}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:beforeScale={({ detail: e }) => {
                if (keycon.global.shiftKey) {
                    e.setFixedDirection([-1, -1]);
                } else {
                    e.setFixedDirection([0, 0]);
                }
            }}
            on:scale={({ detail: e }) => {
                e.target.style.transform = e.drag.transform;
            }}/>
    </div>
</div>`})))()}var ve;function ye(){return(ye=t((()=>{ve=`<script>
import Moveable from "svelte-moveable";

let translate = [0, 0];
let targetRef = null;
let moveableRef = null;
<\/script>
<div class="root">
    <div
        class="container"
        style="display: flex;"
    >
        <div
            class="target"
            bind:this={targetRef}
            style="position: relative;width: 200px;height: 100px;"
        >Target</div>
        <Moveable
            bind:this={moveableRef}
            target={targetRef}
            resizable={true}
            keepRatio={true}
            throttleResize={1}
            on:resize={({ detail: e }) => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            on:resizeEnd={({ detail: e }) => {
                const lastEvent = e.lastEvent;
                if (lastEvent) {
                    console.log(lastEvent.drag.transform);
                }
            }}/>
    </div>
</div>`})))()}var be;function xe(){return(xe=t((()=>{be=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div class="target target3">Target3</div>
    <Moveable
        target={".target"}
        draggable={true}
        resizable={true}
        on:resizeGroupStart={({ detail: { events } }) => {
            events[0].setMin([50, 50]);
            events[1].setMin([60, 50]);
            events[2].setMin([50, 60]);
        }}
        on:resizeGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.width = \`\${ev.width}px\`;
                ev.target.style.height = \`\${ev.height}px\`;
                ev.target.style.transform = ev.drag.transform;
            });
        }}
        on:dragGroup={({ detail: { events } }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        }}
        on:dragGroupEnd={({ detail: { events } }) => {
            console.log(events);
        }}/>
</div>`})))()}var Se;function Ce(){return(Ce=t((()=>{Se=`<script>
import Moveable from "svelte-moveable";
<\/script>
<div class="container">
    <div class="target">Target1</div>
    <Moveable
        target={".target"}
        keepRatio={true}
        triggerAblesSimultaneously={true}
        resizable={{ edge: ["e", "w"], renderDirections: ["e", "w"] }}
        scalable={{ edge: [], renderDirections: ["nw", "ne", "se", "sw"] }}
        draggable={true}
        edgeDraggable={["n", "s"]}
        on:drag={({ detail: e }) => {
            e.target.style.cssText += \`transform: \${e.transform}\`;
        }}
        on:resize={({ detail: e }) => {
            e.target.style.cssText += \`width: \${e.boundingWidth}px;\` + \`height: \${e.boundingHeight}px;\` + \`transform: \${e.drag.transform}\`;
        }}
        on:scale={({ detail: e }) => {
            e.target.style.cssText += \`transform: \${e.drag.transform}\`;
        }}/>
</div>`})))()}var we;function Te(){return(Te=t((()=>{we=`<script>
import keycon from "keycon";
import Moveable from "vue3-moveable";
import { throttle } from "@daybrush/utils";

keycon.setGlobal();
export default {
    components: { Moveable },
    setup() {
        const onResizeStart = e => {
            e.setFixedDirection([0, 0]);
        };
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onBeforeResize = e => {
            if (keycon.global.shiftKey) {
                e.setFixedDirection([-1, -1]);
            } else {
                e.setFixedDirection([0, 0]);
            }
        };
        const onResize = e => {
            e.target.style.cssText += \`width: \${e.width}px; height: \${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        const onBeforeRotate = e => {
            e.setRotation(throttle(e.rotation, 45));
        };
        const onRotate = e => {
            e.target.style.transform = e.drag.transform;
        };
        const onScaleStart = e => {
            e.setFixedDirection([0, 0]);
        };
        const onDrag$0 = e => {
            e.target.style.transform = e.transform;
        };
        const onBeforeScale = e => {
            if (keycon.global.shiftKey) {
                e.setFixedDirection([-1, -1]);
            } else {
                e.setFixedDirection([0, 0]);
            }
        };
        const onScale = e => {
            e.target.style.transform = e.drag.transform;
        };
        return {
            onResizeStart,
            onDrag,
            onBeforeResize,
            onResize,
            onBeforeRotate,
            onRotate,
            onScaleStart,
            onDrag$0,
            onBeforeScale,
            onScale
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="height: 400px;border: 1px solid black;"
        >
            <div
                class="target resizable"
                style="position: absolute;width: 200px;height: 100px;top: 50px;"
            >Resizable Target</div>
            <div
                class="target scalable"
                style="position: absolute;width: 200px;height: 100px;top: 150px;left: 350px;"
            >Scalable Target</div>
            <Moveable
                :target="'.target.resizable'"
                :resizable="true"
                :draggable="true"
                :rotatable="true"
                :snappable="true"
                :bounds="({ left: 0, top: 0, bottom: 0, right: 0, position: 'css' })"
                @resizeStart="onResizeStart"
                @drag="onDrag"
                @beforeResize="onBeforeResize"
                @resize="onResize"
                @beforeRotate="onBeforeRotate"
                @rotate="onRotate"/>
            <Moveable
                :target="'.target.scalable'"
                :scalable="true"
                :keepRatio="true"
                :draggable="true"
                :snappable="true"
                :bounds="({ left: 0, top: 0, bottom: 0, right: 0, position: 'css' })"
                @scaleStart="onScaleStart"
                @drag="onDrag$0"
                @beforeScale="onBeforeScale"
                @scale="onScale"/>
        </div>
    </div>
</template>`})))()}var Ee;function De(){return(De=t((()=>{Ee=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const translate = ref([0, 0]);
        const targetRef = ref(null);
        const moveableRef = ref(null);
        const onResize = e => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        const onResizeEnd = e => {
            const lastEvent = e.lastEvent;
            if (lastEvent) {
                console.log(lastEvent.drag.transform);
            }
        };
        return { targetRef, moveableRef, onResize, onResizeEnd };
    }
};
<\/script>
<template>
    <div class="root">
        <div
            class="container"
            style="display: flex;"
        >
            <div
                class="target"
                ref="targetRef"
                style="position: relative;width: 200px;height: 100px;"
            >Target</div>
            <Moveable
                ref="moveableRef"
                :target="targetRef"
                :resizable="true"
                :keepRatio="true"
                :throttleResize="1"
                @resize="onResize"
                @resizeEnd="onResizeEnd"/>
        </div>
    </div>
</template>`})))()}var K;function Oe(){return(Oe=t((()=>{K=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onResizeGroupStart = ({ events }) => {
            events[0].setMin([50, 50]);
            events[1].setMin([60, 50]);
            events[2].setMin([50, 60]);
        };
        const onResizeGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.width = \`\${ev.width}px\`;
                ev.target.style.height = \`\${ev.height}px\`;
                ev.target.style.transform = ev.drag.transform;
            });
        };
        const onDragGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        const onDragGroupEnd = ({ events }) => {
            console.log(events);
        };
        return {
            onResizeGroupStart,
            onResizeGroup,
            onDragGroup,
            onDragGroupEnd
        };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            :target="'.target'"
            :draggable="true"
            :resizable="true"
            @resizeGroupStart="onResizeGroupStart"
            @resizeGroup="onResizeGroup"
            @dragGroup="onDragGroup"
            @dragGroupEnd="onDragGroupEnd"/>
    </div>
</template>`})))()}var ke;function Ae(){return(Ae=t((()=>{ke=`<script>
import Moveable from "vue3-moveable";

export default {
    components: { Moveable },
    setup() {
        const onDrag = e => {
            e.target.style.cssText += \`transform: \${e.transform}\`;
        };
        const onResize = e => {
            e.target.style.cssText += \`width: \${e.boundingWidth}px;\` + \`height: \${e.boundingHeight}px;\` + \`transform: \${e.drag.transform}\`;
        };
        const onScale = e => {
            e.target.style.cssText += \`transform: \${e.drag.transform}\`;
        };
        return { onDrag, onResize, onScale };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target">Target1</div>
        <Moveable
            :target="'.target'"
            :keepRatio="true"
            :triggerAblesSimultaneously="true"
            :resizable="({ edge: ['e', 'w'], renderDirections: ['e', 'w'] })"
            :scalable="({ edge: [], renderDirections: ['nw', 'ne', 'se', 'sw'] })"
            :draggable="true"
            :edgeDraggable="['n', 's']"
            @drag="onDrag"
            @resize="onResize"
            @scale="onScale"/>
    </div>
</template>`})))()}var q,J,je,Y,X,Z,Q,Me;function $(){return($=t((()=>{oe(),le(),m(),_(),y(),x(),C(),T(),D(),k(),j(),N(),F(),L(),z(),V(),U(),G(),pe(),he(),_e(),ye(),xe(),Ce(),Te(),De(),Oe(),Ae(),ne(),q=Object.assign({"./ReactFixedDirectionApp.tsx":ie,"./ReactFlexApp.tsx":se,"./ReactGroupMinSizeApp.tsx":ue,"./ReactWithEdgeControlApp.tsx":de}),J=Object.assign({"./ReactFixedDirectionApp.tsx":v,"./ReactFlexApp.tsx":b,"./ReactGroupMinSizeApp.tsx":S,"./ReactWithEdgeControlApp.tsx":w,"./lit/ReactFixedDirectionApp/App.ts":E,"./lit/ReactFlexApp/App.ts":O,"./lit/ReactGroupMinSizeApp/App.ts":A,"./lit/ReactWithEdgeControlApp/App.ts":M,"./script/ReactFixedDirectionApp/App.html":P,"./script/ReactFixedDirectionApp/App.js":I,"./script/ReactFlexApp/App.html":R,"./script/ReactFlexApp/App.js":B,"./script/ReactGroupMinSizeApp/App.html":H,"./script/ReactGroupMinSizeApp/App.js":W,"./script/ReactWithEdgeControlApp/App.html":fe,"./script/ReactWithEdgeControlApp/App.js":me,"./svelte/ReactFixedDirectionApp/App.svelte":ge,"./svelte/ReactFlexApp/App.svelte":ve,"./svelte/ReactGroupMinSizeApp/App.svelte":be,"./svelte/ReactWithEdgeControlApp/App.svelte":Se,"./vue3/ReactFixedDirectionApp/App.vue":we,"./vue3/ReactFlexApp/App.vue":Ee,"./vue3/ReactGroupMinSizeApp/App.vue":K,"./vue3/ReactWithEdgeControlApp/App.vue":ke}),je={title:`Advacned Resizable`},Y={name:`Resizable & Scalable with fixed direction`,...s(ae,{apps:q,sources:J})},X={name:`Resizable with display: flex`,...s(ce,{apps:q,sources:J})},Z={name:`Limit Sizes with Group`,...s(f,{apps:q,sources:J})},Q={name:`Using Edges and Controls with Draggable, Resizable, and Scalable`,...s(h,{apps:q,sources:J})},Me=[`AdvancedResizableFixedDirection`,`AdvancedResizableFlex`,`AdvancedResizableGroupMinSize`,`AdvancedResizableEdgeControl`],Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Resizable & Scalable with fixed direction",
  ...appStory(ReactFixedDirectionApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Resizable with display: flex",
  ...appStory(ReactFlexApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Limit Sizes with Group",
  ...appStory(ReactGroupMinSizeApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Using Edges and Controls with Draggable, Resizable, and Scalable",
  ...appStory(ReactWithEdgeControlApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}}})))()}$();export{Q as AdvancedResizableEdgeControl,Y as AdvancedResizableFixedDirection,X as AdvancedResizableFlex,Z as AdvancedResizableGroupMinSize,Me as __namedExportsOrder,je as default};