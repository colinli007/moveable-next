import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{c as a,l as o,r as ee,t as s,yt as te}from"./story-uRijs6RN.js";var ne=n({default:()=>c});function c(){let e=l.useRef(null);return(0,u.jsxs)(`div`,{className:`container`,children:[(0,u.jsx)(`p`,{children:`Custom Rotatation with rotationTarget`}),(0,u.jsx)(`div`,{className:`target`,ref:e,children:`Target`}),(0,u.jsx)(o,{target:e,ables:[d],props:{customRotation:!0},draggable:!0,rotatable:!0,resizable:!0,rotationTarget:`.moveable-custom-rotation`,rotationPosition:`none`,onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})}var l,u,d;function re(){return(re=t((()=>{l=e(r()),a(),u=i(),d=te(`customRotation`,{render(e,t){let n=e.getRect(),{pos1:r,pos2:i}=e.state;return(0,u.jsx)(`div`,{className:`moveable-custom-rotation`,style:{position:`absolute`,transform:`translate(-50%, -100%) translate(${(r[0]+i[0])/2}px, ${(r[1]+i[1])/2}px) rotate(${n.rotation}deg) translateY(-20px)`,width:`20px`,height:`20px`,background:`#f55`,cursor:`move`,transformOrigin:`50% 100%`}},`custom-rotation`)}})})))()}var ie=n({default:()=>ae});function ae(){let e=oe.useRef(null);return(0,f.jsxs)(`div`,{className:`container`,children:[(0,f.jsx)(`div`,{className:`target`,ref:e,children:`Target`}),(0,f.jsx)(o,{target:e,ables:[se],draggable:!0,resizable:!0,rotatable:!0,props:{dimensionViewable:!0},onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})}var oe,f,se;function ce(){return(ce=t((()=>{oe=e(r()),a(),f=i(),se={name:`dimensionViewable`,props:[],events:[],render(e,t){let n=e.getRect();return(0,f.jsxs)(`div`,{className:`moveable-dimension`,style:{position:`absolute`,left:`${n.width/2}px`,top:`${n.height+20}px`,background:`#4af`,borderRadius:`2px`,padding:`2px 4px`,color:`white`,fontSize:`13px`,whiteSpace:`nowrap`,fontWeight:`bold`,willChange:`transform`,transform:`translate(-50%, 0px)`},children:[Math.round(n.offsetWidth),` x `,Math.round(n.offsetHeight)]},`dimension-viewer`)}}})))()}var le=n({default:()=>ue});function ue(){let[e,t]=p.useState();return p.useEffect(()=>{t(document.querySelector(`.moveable-dimension`))},[]),(0,m.jsxs)(`div`,{className:`container`,children:[(0,m.jsx)(`div`,{className:`target target1`}),(0,m.jsx)(`div`,{className:`target target2`}),(0,m.jsx)(o,{ables:[h],dragTarget:e,resizable:!0,props:{dimensionViewable:!0},target:[`.target1`],draggable:!0,onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform},elementGuidelines:[`.target1`,`.target2`],snappable:!0})]})}var p,m,h;function g(){return(g=t((()=>{p=e(r()),a(),m=i(),h={name:`dimensionViewable`,props:[],events:[],render(e,t){let n=e.getRect();return(0,m.jsx)(`div`,{className:`moveable-dimension`,style:{position:`absolute`,left:`${n.width/2}px`,top:`${n.height+20}px`,background:`#4af`,borderRadius:`2px`,padding:`2px 4px`,color:`white`,fontSize:`13px`,whiteSpace:`nowrap`,fontWeight:`bold`,willChange:`transform`,transform:`translate(-50%, 0px)`},children:`Target`},`dimension-viewer`)}}})))()}var de=n({default:()=>_});function _(){let e=v.useRef(null);return(0,y.jsxs)(`div`,{className:`container`,children:[(0,y.jsx)(`div`,{className:`target`,ref:e,children:`Target`}),(0,y.jsx)(o,{target:e,ables:[b],props:{editable:!0},draggable:!0,resizable:!0,rotatable:!0,onDrag:e=>{e.target.style.transform=e.transform},onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onRotate:e=>{e.target.style.transform=e.drag.transform}})]})}var v,y,b;function x(){return(x=t((()=>{v=e(r()),a(),y=i(),b={name:`editable`,props:[],events:[],render(e,t){let n=e.getRect(),{pos2:r}=e.state,i=e.useCSS(`div`,`
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            `);return(0,y.jsxs)(i,{className:`moveable-editable`,style:{transform:`translate(${r[0]}px, ${r[1]}px) rotate(${n.rotation}deg) translate(10px)`},children:[(0,y.jsx)(`button`,{className:`custom-button`,onClick:()=>{alert(`+`)},children:`+`}),(0,y.jsx)(`button`,{className:`custom-button`,onClick:()=>{alert(`-`)},children:`-`})]},`editable-viewer`)}}})))()}var fe=n({default:()=>S});function S(){let e=C.useRef(null);return(0,w.jsxs)(`div`,{className:`container`,children:[(0,w.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,w.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,w.jsx)(`div`,{className:`target target3`,ref:e,children:`Target3`}),(0,w.jsx)(o,{target:e,ables:[T],origin:!1,props:{enterLeave:!0},draggable:!0,onDrag:e=>{e.target.style.transform=e.transform}}),(0,w.jsx)(o,{target:[`.target1`,`.target2`],ables:[T],origin:!1,props:{enterLeave:!0},draggable:!0,onDragGroup:e=>{e.events.forEach(e=>{e.target.style.transform=e.transform})}})]})}var C,w,T;function E(){return(E=t((()=>{C=e(r()),a(),w=i(),T=te(`enterLeave`,{mouseEnter(e){e.moveables?e.moveables.forEach(e=>{e.state.target.style.backgroundColor=`#e55`}):e.state.target.style.backgroundColor=`#e55`},mouseLeave(e){e.moveables?e.moveables.forEach(e=>{e.state.target.style.backgroundColor=``}):e.state.target.style.backgroundColor=``}})})))()}var D;function O(){return(O=t((()=>{D=`import * as React from "react";
import Moveable, { makeAble, MoveableManagerInterface, Renderer } from "@/react-moveable";

const CustomRotation = makeAble("customRotation", {
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer): any {
        const rect = moveable.getRect();
        const { pos1, pos2 } = moveable.state;

        // Add key (required)
        // Add class prefix moveable-(required)
        //  translateY(-20px)
        return <div key={"custom-rotation"} className={"moveable-custom-rotation"} style={{
            position: "absolute",
            transform: \`translate(-50%, -100%)\`
                + \` translate(\${(pos1[0] + pos2[0]) / 2}px, \${(pos1[1] + pos2[1]) / 2}px)\`
                + \` rotate(\${rect.rotation}deg) translateY(-20px)\`,
            width: "20px",
            height: "20px",
            background: "#f55",
            cursor: "move",
            transformOrigin: "50% 100%",
        }}>
        </div>;
    },
});

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <div className="container">
        <p>Custom Rotatation with rotationTarget</p>
        <div className="target" ref={targetRef}>Target</div>
        <Moveable
            target={targetRef}
            ables={[CustomRotation]}
            props={{
                customRotation: true,
            }}
            draggable={true}
            rotatable={true}
            resizable={true}
            rotationTarget={".moveable-custom-rotation"}
            rotationPosition={"none"}
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
`})))()}var k;function A(){return(A=t((()=>{k=`import * as React from "react";
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
            {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
        </div>;
    },
} as const;

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <div className="container">
        <div className="target" ref={targetRef}>Target</div>
        <Moveable
            target={targetRef}
            ables={[DimensionViewable]}
            draggable={true}
            resizable={true}
            rotatable={true}
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
`})))()}var j;function M(){return(M=t((()=>{j=`import React from "react";
// import "./App.css";
import Moveable, { MoveableManagerInterface, Renderer } from "@/react-moveable";

const DimensionViewable = {
    name: "dimensionViewable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();

        // Add key (required)
        // Add class prefix moveable-(required)
        return (
            <div
                key={"dimension-viewer"}
                className={"moveable-dimension"}
                style={{
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
                }}
            >
                Target
            </div>
        );
    },
} as const;

function App() {
    const [dragTarget, setDragTarget] = React.useState<HTMLElement>();

    React.useEffect(() => {
        setDragTarget(document.querySelector<HTMLElement>(".moveable-dimension")!);
    }, []);
    return (
        <div className="container">
            <div className="target target1"></div>
            <div className="target target2"></div>
            <Moveable
                ables={[DimensionViewable]}
                dragTarget={dragTarget}
                resizable={true}
                props={{
                    dimensionViewable: true,
                }}
                target={[".target1"]}
                draggable={true}
                onDrag={(e) => {
                    e.target.style.transform = e.transform;
                }}
                onResize={(e) => {
                    e.target.style.width = \`\${e.width}px\`;
                    e.target.style.height = \`\${e.height}px\`;
                    e.target.style.transform = e.drag.transform;
                }}
                onRotate={(e) => {
                    e.target.style.transform = e.drag.transform;
                }}
                elementGuidelines={[".target1", ".target2"]}
                snappable={true}
            />
        </div>
    );
}

export default App;
`})))()}var N;function P(){return(P=t((()=>{N=`import * as React from "react";
import Moveable, { MoveableManagerInterface, Renderer } from "@/react-moveable";

const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();
        const { pos2 } = moveable.state;

        // Add key (required)
        // Add class prefix moveable-(required)
        const EditableViewer = moveable.useCSS("div", \`
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            \`);
        return <EditableViewer key={"editable-viewer"} className={"moveable-editable"} style={{
            transform: \`translate(\${pos2[0]}px, \${pos2[1]}px) rotate(\${rect.rotation}deg) translate(10px)\`,
        }}>
            <button className="custom-button" onClick={() => {
                alert("+");
            }}>+</button>
            <button className="custom-button" onClick={() => {
                alert("-");
            }}>-</button>
        </EditableViewer>;
    },
} as const;

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <div className="container">
        <div className="target" ref={targetRef}>Target</div>
        <Moveable
            target={targetRef}
            ables={[Editable]}
            props={{
                editable: true,
            }}
            draggable={true}
            resizable={true}
            rotatable={true}
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
`})))()}var F;function I(){return(I=t((()=>{F=`import * as React from "react";
import Moveable, { makeAble, MoveableManagerInterface } from "@/react-moveable";

const MouseEnterLeaveAble = makeAble("enterLeave", {
    mouseEnter(moveable: MoveableManagerInterface) {
        if (moveable.moveables) {
            // group
            moveable.moveables.forEach(child => {
                child.state.target!.style.backgroundColor = "#e55";
            });
        } else {
            // single
            moveable.state.target!.style.backgroundColor = "#e55";
        }
    },
    mouseLeave(moveable: MoveableManagerInterface) {
        if (moveable.moveables) {
            // group
            moveable.moveables.forEach(child => {
                child.state.target!.style.backgroundColor = "";
            });
        } else {
            // single
            moveable.state.target!.style.backgroundColor = "";
        }
    },
});

export default function App() {
    const targetRef = React.useRef<HTMLDivElement>(null);
    return <div className="container">
        <div className="target target1">Target1</div>
        <div className="target target2">Target2</div>
        <div className="target target3" ref={targetRef}>Target3</div>
        <Moveable
            target={targetRef}
            ables={[MouseEnterLeaveAble]}
            origin={false}
            props={{
                enterLeave: true,
            }}
            draggable={true}
            onDrag={e => {
                e.target.style.transform = e.transform;
            }}
        />
        <Moveable
            target={[".target1", ".target2"]}
            ables={[MouseEnterLeaveAble]}
            origin={false}
            props={{
                enterLeave: true,
            }}
            draggable={true}
            onDragGroup={e => {
                e.events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}
        />
    </div>;
}
`})))()}var L;function R(){return(R=t((()=>{L=`import Moveable, { makeAble, MoveableManagerInterface, Renderer } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

const CustomRotation = makeAble("customRotation", {
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer): any {
        const rect = moveable.getRect();
        const { pos1, pos2 } = moveable.state;
        return React.createElement("div", {
            key: "custom-rotation",
            className: "moveable-custom-rotation",
            style: {
                position: "absolute",
                transform: \`translate(-50%, -100%)\` + \` translate(\${(pos1[0] + pos2[0]) / 2}px, \${(pos1[1] + pos2[1]) / 2}px)\` + \` rotate(\${rect.rotation}deg) translateY(-20px)\`,
                width: "20px",
                height: "20px",
                background: "#f55",
                cursor: "move",
                transformOrigin: "50% 100%"
            }
        }, [
            "\\n        "
        ]);
    }
});
@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="container">
    <p>Custom Rotatation with rotationTarget</p>
    <div
        class="target"
        \${ref(this.targetRef)}
    >Target</div>
    <lit-moveable
        .target=\${this.targetRef}
        .ables=\${[CustomRotation]}
        .props=\${{
            customRotation: true
        }}
        .litDraggable=\${true}
        .rotatable=\${true}
        .resizable=\${true}
        .rotationTarget=\${".moveable-custom-rotation"}
        .rotationPosition=\${"none"}
        @litDrag=\${this.onDrag}
        @litResize=\${this.onResize}
        @litRotate=\${this.onRotate}
    ></lit-moveable>
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
}`})))()}var z;function B(){return(B=t((()=>{z=`import Moveable, { MoveableManagerInterface, Renderer } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
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
            "\\n            ",
            Math.round(rect.offsetWidth),
            " x ",
            Math.round(rect.offsetHeight),
            "\\n        "
        ]);
    }
} as const;
@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="container">
    <div
        class="target"
        \${ref(this.targetRef)}
    >Target</div>
    <lit-moveable
        .target=\${this.targetRef}
        .ables=\${[DimensionViewable]}
        .litDraggable=\${true}
        .resizable=\${true}
        .rotatable=\${true}
        .props=\${{
            dimensionViewable: true
        }}
        @litDrag=\${this.onDrag}
        @litResize=\${this.onResize}
        @litRotate=\${this.onRotate}
    ></lit-moveable>
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
}`})))()}var V;function H(){return(H=t((()=>{V=`import Moveable, { MoveableManagerInterface, Renderer } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable: MoveableManagerInterface<any, any>, React: Renderer) {
        const rect = moveable.getRect();
        const { pos2 } = moveable.state;
        const EditableViewer = moveable.useCSS("div", \`
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            \`);
        return React.createElement(EditableViewer, {
            key: "editable-viewer",
            className: "moveable-editable",
            style: {
                transform: \`translate(\${pos2[0]}px, \${pos2[1]}px) rotate(\${rect.rotation}deg) translate(10px)\`
            }
        }, [
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("+");
                }
            }, [
                "+"
            ]),
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("-");
                }
            }, [
                "-"
            ]),
            "\\n        "
        ]);
    }
} as const;
@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="container">
    <div
        class="target"
        \${ref(this.targetRef)}
    >Target</div>
    <lit-moveable
        .target=\${this.targetRef}
        .ables=\${[Editable]}
        .props=\${{
            editable: true
        }}
        .litDraggable=\${true}
        .resizable=\${true}
        .rotatable=\${true}
        @litDrag=\${this.onDrag}
        @litResize=\${this.onResize}
        @litRotate=\${this.onRotate}
    ></lit-moveable>
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
}`})))()}var U;function W(){return(W=t((()=>{U=`import Moveable, { makeAble, MoveableManagerInterface } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

const MouseEnterLeaveAble = makeAble("enterLeave", {
    mouseEnter(moveable: MoveableManagerInterface) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target!.style.backgroundColor = "#e55";
            });
        } else {
            moveable.state.target!.style.backgroundColor = "#e55";
        }
    },
    mouseLeave(moveable: MoveableManagerInterface) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target!.style.backgroundColor = "";
            });
        } else {
            moveable.state.target!.style.backgroundColor = "";
        }
    }
});
@customElement("lit-app")
export default class App extends LitElement {
    targetRef: Ref<HTMLDivElement> = createRef(null);
    render() {
        return html \`<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        \${ref(this.targetRef)}
    >Target3</div>
    <lit-moveable
        .target=\${this.targetRef}
        .ables=\${[MouseEnterLeaveAble]}
        .origin=\${false}
        .props=\${{
            enterLeave: true
        }}
        .litDraggable=\${true}
        @litDrag=\${this.onDrag}
    ></lit-moveable>
    <lit-moveable
        .target=\${[".target1", ".target2"]}
        .ables=\${[MouseEnterLeaveAble]}
        .origin=\${false}
        .props=\${{
            enterLeave: true
        }}
        .litDraggable=\${true}
        @litDragGroup=\${this.onDragGroup}
    ></lit-moveable>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onDragGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
}`})))()}var pe;function me(){return(me=t((()=>{pe=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <p>Custom Rotatation with rotationTarget</p>
    <div
        class="target"
        data-croffle-ref="targetRef"
    >Target</div>
</div>`})))()}var he;function ge(){return(ge=t((()=>{he=`import Moveable, { makeAble, MoveableManagerInterface, Renderer } from "moveable";

const CustomRotation = makeAble("customRotation", {
    render(moveable, React) {
        const rect = moveable.getRect();
        const { pos1, pos2 } = moveable.state;
        return React.createElement("div", {
            key: "custom-rotation",
            className: "moveable-custom-rotation",
            style: {
                position: "absolute",
                transform: \`translate(-50%, -100%)\` + \` translate(\${(pos1[0] + pos2[0]) / 2}px, \${(pos1[1] + pos2[1]) / 2}px)\` + \` rotate(\${rect.rotation}deg) translateY(-20px)\`,
                width: "20px",
                height: "20px",
                background: "#f55",
                cursor: "move",
                transformOrigin: "50% 100%"
            }
        }, [
            "\\n        "
        ]);
    }
});
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    ables: [CustomRotation],
    props: { customRotation: true },
    draggable: true,
    rotatable: true,
    resizable: true,
    rotationTarget: ".moveable-custom-rotation",
    rotationPosition: "none"
});
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
});`})))()}var _e;function ve(){return(ve=t((()=>{_e=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        data-croffle-ref="targetRef"
    >Target</div>
</div>`})))()}var ye;function be(){return(be=t((()=>{ye=`import Moveable, { MoveableManagerInterface, Renderer } from "moveable";

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
            "\\n            ",
            Math.round(rect.offsetWidth),
            " x ",
            Math.round(rect.offsetHeight),
            "\\n        "
        ]);
    }
};
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    ables: [DimensionViewable],
    draggable: true,
    resizable: true,
    rotatable: true,
    props: { dimensionViewable: true }
});
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
});`})))()}var xe;function Se(){return(Se=t((()=>{xe=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div
        class="target"
        data-croffle-ref="targetRef"
    >Target</div>
</div>`})))()}var Ce;function we(){return(we=t((()=>{Ce=`import Moveable, { MoveableManagerInterface, Renderer } from "moveable";

const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable, React) {
        const rect = moveable.getRect();
        const { pos2 } = moveable.state;
        const EditableViewer = moveable.useCSS("div", \`
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            \`);
        return React.createElement(EditableViewer, {
            key: "editable-viewer",
            className: "moveable-editable",
            style: {
                transform: \`translate(\${pos2[0]}px, \${pos2[1]}px) rotate(\${rect.rotation}deg) translate(10px)\`
            }
        }, [
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("+");
                }
            }, [
                "+"
            ]),
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("-");
                }
            }, [
                "-"
            ]),
            "\\n        "
        ]);
    }
};
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    ables: [Editable],
    props: { editable: true },
    draggable: true,
    resizable: true,
    rotatable: true
});
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
});`})))()}var Te;function Ee(){return(Ee=t((()=>{Te=`<div
    class="container"
    data-croffle-ref="element$0"
>
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        data-croffle-ref="targetRef"
    >Target3</div>
</div>`})))()}var De;function Oe(){return(Oe=t((()=>{De=`import Moveable, { makeAble, MoveableManagerInterface } from "moveable";

const MouseEnterLeaveAble = makeAble("enterLeave", {
    mouseEnter(moveable) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target.style.backgroundColor = "#e55";
            });
        } else {
            moveable.state.target.style.backgroundColor = "#e55";
        }
    },
    mouseLeave(moveable) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target.style.backgroundColor = "";
            });
        } else {
            moveable.state.target.style.backgroundColor = "";
        }
    }
});
let targetRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
targetRef = document.querySelector(\`[data-croffle-ref="targetRef"]\`);
const moveable$0 = new Moveable(element$0, {
    target: targetRef,
    ables: [MouseEnterLeaveAble],
    origin: false,
    props: { enterLeave: true },
    draggable: true
});
const moveable$1 = new Moveable(element$0, {
    target: [".target1", ".target2"],
    ables: [MouseEnterLeaveAble],
    origin: false,
    props: { enterLeave: true },
    draggable: true
});
moveable$0.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveable$1.on("dragGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});`})))()}var ke;function Ae(){return(Ae=t((()=>{ke=`<script>
import Moveable, { makeAble, MoveableManagerInterface, Renderer } from "svelte-moveable";

const CustomRotation = makeAble("customRotation", {
    render(moveable, React) {
        const rect = moveable.getRect();
        const { pos1, pos2 } = moveable.state;
        return React.createElement("div", {
            key: "custom-rotation",
            className: "moveable-custom-rotation",
            style: {
                position: "absolute",
                transform: \`translate(-50%, -100%)\` + \` translate(\${(pos1[0] + pos2[0]) / 2}px, \${(pos1[1] + pos2[1]) / 2}px)\` + \` rotate(\${rect.rotation}deg) translateY(-20px)\`,
                width: "20px",
                height: "20px",
                background: "#f55",
                cursor: "move",
                transformOrigin: "50% 100%"
            }
        }, [
            "\\n        "
        ]);
    }
});
let targetRef = null;
<\/script>
<div class="container">
    <p>Custom Rotatation with rotationTarget</p>
    <div
        class="target"
        bind:this={targetRef}
    >Target</div>
    <Moveable
        target={targetRef}
        ables={[CustomRotation]}
        props={{ customRotation: true }}
        draggable={true}
        rotatable={true}
        resizable={true}
        rotationTarget={".moveable-custom-rotation"}
        rotationPosition={"none"}
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
</div>`})))()}var je;function Me(){return(Me=t((()=>{je=`<script>
import Moveable, { MoveableManagerInterface, Renderer } from "svelte-moveable";

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
            "\\n            ",
            Math.round(rect.offsetWidth),
            " x ",
            Math.round(rect.offsetHeight),
            "\\n        "
        ]);
    }
};
let targetRef = null;
<\/script>
<div class="container">
    <div
        class="target"
        bind:this={targetRef}
    >Target</div>
    <Moveable
        target={targetRef}
        ables={[DimensionViewable]}
        draggable={true}
        resizable={true}
        rotatable={true}
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
</div>`})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne=`<script>
import Moveable, { MoveableManagerInterface, Renderer } from "svelte-moveable";

const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable, React) {
        const rect = moveable.getRect();
        const { pos2 } = moveable.state;
        const EditableViewer = moveable.useCSS("div", \`
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            \`);
        return React.createElement(EditableViewer, {
            key: "editable-viewer",
            className: "moveable-editable",
            style: {
                transform: \`translate(\${pos2[0]}px, \${pos2[1]}px) rotate(\${rect.rotation}deg) translate(10px)\`
            }
        }, [
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("+");
                }
            }, [
                "+"
            ]),
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("-");
                }
            }, [
                "-"
            ]),
            "\\n        "
        ]);
    }
};
let targetRef = null;
<\/script>
<div class="container">
    <div
        class="target"
        bind:this={targetRef}
    >Target</div>
    <Moveable
        target={targetRef}
        ables={[Editable]}
        props={{ editable: true }}
        draggable={true}
        resizable={true}
        rotatable={true}
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
</div>`})))()}var Fe;function Ie(){return(Ie=t((()=>{Fe=`<script>
import Moveable, { makeAble, MoveableManagerInterface } from "svelte-moveable";

const MouseEnterLeaveAble = makeAble("enterLeave", {
    mouseEnter(moveable) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target.style.backgroundColor = "#e55";
            });
        } else {
            moveable.state.target.style.backgroundColor = "#e55";
        }
    },
    mouseLeave(moveable) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target.style.backgroundColor = "";
            });
        } else {
            moveable.state.target.style.backgroundColor = "";
        }
    }
});
let targetRef = null;
<\/script>
<div class="container">
    <div class="target target1">Target1</div>
    <div class="target target2">Target2</div>
    <div
        class="target target3"
        bind:this={targetRef}
    >Target3</div>
    <Moveable
        target={targetRef}
        ables={[MouseEnterLeaveAble]}
        origin={false}
        props={{ enterLeave: true }}
        draggable={true}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}/>
    <Moveable
        target={[".target1", ".target2"]}
        ables={[MouseEnterLeaveAble]}
        origin={false}
        props={{ enterLeave: true }}
        draggable={true}
        on:dragGroup={({ detail: e }) => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        }}/>
</div>`})))()}var Le;function Re(){return(Re=t((()=>{Le=`<script>
import Moveable, { makeAble, MoveableManagerInterface, Renderer } from "vue3-moveable";
import { ref } from "vue";

const CustomRotation = makeAble("customRotation", {
    render(moveable, React) {
        const rect = moveable.getRect();
        const { pos1, pos2 } = moveable.state;
        return React.createElement("div", {
            key: "custom-rotation",
            className: "moveable-custom-rotation",
            style: {
                position: "absolute",
                transform: \`translate(-50%, -100%)\` + \` translate(\${(pos1[0] + pos2[0]) / 2}px, \${(pos1[1] + pos2[1]) / 2}px)\` + \` rotate(\${rect.rotation}deg) translateY(-20px)\`,
                width: "20px",
                height: "20px",
                background: "#f55",
                cursor: "move",
                transformOrigin: "50% 100%"
            }
        }, [
            "\\n        "
        ]);
    }
});
export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
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
        return { targetRef, CustomRotation, onDrag, onResize, onRotate };
    }
};
<\/script>
<template>
    <div class="container">
        <p>Custom Rotatation with rotationTarget</p>
        <div
            class="target"
            ref="targetRef"
        >Target</div>
        <Moveable
            :target="targetRef"
            :ables="[CustomRotation]"
            :props="({ customRotation: true })"
            :draggable="true"
            :rotatable="true"
            :resizable="true"
            :rotationTarget="'.moveable-custom-rotation'"
            :rotationPosition="'none'"
            @drag="onDrag"
            @resize="onResize"
            @rotate="onRotate"/>
    </div>
</template>`})))()}var ze;function Be(){return(Be=t((()=>{ze=`<script>
import Moveable, { MoveableManagerInterface, Renderer } from "vue3-moveable";
import { ref } from "vue";

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
            "\\n            ",
            Math.round(rect.offsetWidth),
            " x ",
            Math.round(rect.offsetHeight),
            "\\n        "
        ]);
    }
};
export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
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
        return { targetRef, DimensionViewable, onDrag, onResize, onRotate };
    }
};
<\/script>
<template>
    <div class="container">
        <div
            class="target"
            ref="targetRef"
        >Target</div>
        <Moveable
            :target="targetRef"
            :ables="[DimensionViewable]"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            :props="({ dimensionViewable: true })"
            @drag="onDrag"
            @resize="onResize"
            @rotate="onRotate"/>
    </div>
</template>`})))()}var Ve;function He(){return(He=t((()=>{Ve=`<script>
import Moveable, { MoveableManagerInterface, Renderer } from "vue3-moveable";
import { ref } from "vue";

const Editable = {
    name: "editable",
    props: [],
    events: [],
    render(moveable, React) {
        const rect = moveable.getRect();
        const { pos2 } = moveable.state;
        const EditableViewer = moveable.useCSS("div", \`
        {
            position: absolute;
            left: 0px;
            top: 0px;
            will-change: transform;
            transform-origin: 0px 0px;
        }
        .custom-button {
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            background: #4af;
            border-radius: 4px;
            appearance: none;
            border: 0;
            color: white;
            font-weight: bold;
        }
            \`);
        return React.createElement(EditableViewer, {
            key: "editable-viewer",
            className: "moveable-editable",
            style: {
                transform: \`translate(\${pos2[0]}px, \${pos2[1]}px) rotate(\${rect.rotation}deg) translate(10px)\`
            }
        }, [
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("+");
                }
            }, [
                "+"
            ]),
            "\\n            ",
            React.createElement("button", {
                className: "custom-button",
                onClick: () => {
                    alert("-");
                }
            }, [
                "-"
            ]),
            "\\n        "
        ]);
    }
};
export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
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
        return { targetRef, Editable, onDrag, onResize, onRotate };
    }
};
<\/script>
<template>
    <div class="container">
        <div
            class="target"
            ref="targetRef"
        >Target</div>
        <Moveable
            :target="targetRef"
            :ables="[Editable]"
            :props="({ editable: true })"
            :draggable="true"
            :resizable="true"
            :rotatable="true"
            @drag="onDrag"
            @resize="onResize"
            @rotate="onRotate"/>
    </div>
</template>`})))()}var G;function Ue(){return(Ue=t((()=>{G=`<script>
import Moveable, { makeAble, MoveableManagerInterface } from "vue3-moveable";
import { ref } from "vue";

const MouseEnterLeaveAble = makeAble("enterLeave", {
    mouseEnter(moveable) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target.style.backgroundColor = "#e55";
            });
        } else {
            moveable.state.target.style.backgroundColor = "#e55";
        }
    },
    mouseLeave(moveable) {
        if (moveable.moveables) {
            moveable.moveables.forEach(child => {
                child.state.target.style.backgroundColor = "";
            });
        } else {
            moveable.state.target.style.backgroundColor = "";
        }
    }
});
export default {
    components: { Moveable },
    setup() {
        const targetRef = ref(null);
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onDragGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        return { targetRef, MouseEnterLeaveAble, onDrag, onDragGroup };
    }
};
<\/script>
<template>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div
            class="target target3"
            ref="targetRef"
        >Target3</div>
        <Moveable
            :target="targetRef"
            :ables="[MouseEnterLeaveAble]"
            :origin="false"
            :props="({ enterLeave: true })"
            :draggable="true"
            @drag="onDrag"/>
        <Moveable
            :target="['.target1', '.target2']"
            :ables="[MouseEnterLeaveAble]"
            :origin="false"
            :props="({ enterLeave: true })"
            :draggable="true"
            @dragGroup="onDragGroup"/>
    </div>
</template>`})))()}var K,q,We,J,Y,X,Z,Q,Ge;function $(){return($=t((()=>{re(),ce(),g(),x(),E(),O(),A(),M(),P(),I(),R(),B(),H(),W(),me(),ge(),ve(),be(),Se(),we(),Ee(),Oe(),Ae(),Me(),Pe(),Ie(),Re(),Be(),He(),Ue(),ee(),K=Object.assign({"./ReactCustomRotatableApp.tsx":ne,"./ReactDimensionViewableApp.tsx":ie,"./ReactDragTargetAbleApp.tsx":le,"./ReactEditableApp.tsx":de,"./ReactMouseEnterLeaveApp.tsx":fe}),q=Object.assign({"./ReactCustomRotatableApp.tsx":D,"./ReactDimensionViewableApp.tsx":k,"./ReactDragTargetAbleApp.tsx":j,"./ReactEditableApp.tsx":N,"./ReactMouseEnterLeaveApp.tsx":F,"./lit/ReactCustomRotatableApp/App.ts":L,"./lit/ReactDimensionViewableApp/App.ts":z,"./lit/ReactEditableApp/App.ts":V,"./lit/ReactMouseEnterLeaveApp/App.ts":U,"./script/ReactCustomRotatableApp/App.html":pe,"./script/ReactCustomRotatableApp/App.js":he,"./script/ReactDimensionViewableApp/App.html":_e,"./script/ReactDimensionViewableApp/App.js":ye,"./script/ReactEditableApp/App.html":xe,"./script/ReactEditableApp/App.js":Ce,"./script/ReactMouseEnterLeaveApp/App.html":Te,"./script/ReactMouseEnterLeaveApp/App.js":De,"./svelte/ReactCustomRotatableApp/App.svelte":ke,"./svelte/ReactDimensionViewableApp/App.svelte":je,"./svelte/ReactEditableApp/App.svelte":Ne,"./svelte/ReactMouseEnterLeaveApp/App.svelte":Fe,"./vue3/ReactCustomRotatableApp/App.vue":Le,"./vue3/ReactDimensionViewableApp/App.vue":ze,"./vue3/ReactEditableApp/App.vue":Ve,"./vue3/ReactMouseEnterLeaveApp/App.vue":G}),We={title:`Make Custom Able`},J={name:`DimensionViewable`,...s(ae,{apps:K,sources:q})},Y={name:`Editable`,...s(_,{apps:K,sources:q})},X={name:`Custom Rotatable`,...s(c,{apps:K,sources:q})},Z={name:`Mouse Enter & Leave`,...s(S,{apps:K,sources:q})},Q={name:`DragTarget`,...s(ue,{apps:K,sources:q})},Ge=[`CustomAbleDimensionViewable`,`CustomAbleEditable`,`CustomAbleRotatble`,`CustomAbleMouseEnterLeave`,`CustomAbleDragTarget`],J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: "DimensionViewable",
  ...appStory(ReactDimensionViewableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Editable",
  ...appStory(ReactEditableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Custom Rotatable",
  ...appStory(ReactCustomRotatableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Mouse Enter & Leave",
  ...appStory(ReactMouseEnterLeaveApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "DragTarget",
  ...appStory(ReactDragTargetAbleApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}}})))()}$();export{J as CustomAbleDimensionViewable,Q as CustomAbleDragTarget,Y as CustomAbleEditable,Z as CustomAbleMouseEnterLeave,X as CustomAbleRotatble,Ge as __namedExportsOrder,We as default};