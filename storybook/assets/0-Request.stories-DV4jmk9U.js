import{a as e,n as t,r as n}from"./rolldown-runtime-sJBDdmOt.js";import{t as r}from"./react-D1chmgGX.js";import{t as i}from"./jsx-runtime-DM-zaqa2.js";import{a,c as o,l as s,r as ee,t as c}from"./story-uRijs6RN.js";import{g as te,o as l,r as ne}from"./default-C91InR83.js";import{n as re,t as ie}from"./selecto.esm-DTjxRdaR.js";var ae=n({default:()=>u});function u(){let e=d.useRef(null),[t,n]=d.useState([]);return(0,f.jsx)(`div`,{className:`root`,children:(0,f.jsxs)(`div`,{className:`container`,children:[(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables();n.length<=1||(n.forEach(e=>{e.request(`draggable`,{y:t.top},!0)}),e.current?.updateRect())},children:`Align Top`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables();n.length<=1||(n.forEach(e=>{e.request(`draggable`,{y:t.top+t.height},!0)}),e.current?.updateRect())},children:`Align Bottom`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables();n.length<=1||(n.forEach(e=>{e.request(`draggable`,{x:t.left},!0)}),e.current?.updateRect())},children:`Align Left`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables();n.length<=1||(n.forEach(e=>{e.request(`draggable`,{y:t.left+t.width},!0)}),e.current?.updateRect())},children:`Align Right`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables();n.length<=1||(n.forEach((e,n)=>{e.request(`draggable`,{y:t.top+t.height/2-t.children[n].height/2},!0)}),e.current?.updateRect())},children:`Align Vertical Center`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables();n.length<=1||(n.forEach((e,n)=>{e.request(`draggable`,{x:t.left+t.width/2-t.children[n].width/2},!0)}),e.current?.updateRect())},children:`Align Horizontal Center`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables(),r=t.top;if(n.length<=1)return;let i=(t.height-t.children.reduce((e,t)=>e+t.height,0))/(n.length-1);n.sort((e,t)=>e.state.top-t.state.top),n.forEach(e=>{let t=e.getRect();e.request(`draggable`,{y:r},!0),r+=t.height+i}),e.current?.updateRect()},children:`Arrange Vertical Spacing`}),`\xA0`,(0,f.jsx)(`button`,{onClick:()=>{let t=e.current.getRect(),n=e.current.getMoveables(),r=t.left;if(n.length<=1)return;let i=(t.width-t.children.reduce((e,t)=>e+t.width,0))/(n.length-1);n.sort((e,t)=>e.state.left-t.state.left),n.forEach(e=>{let t=e.getRect();e.request(`draggable`,{x:r},!0),r+=t.width+i}),e.current?.updateRect()},children:`Arrange Horizontal Spacing`}),`\xA0`,(0,f.jsx)(`div`,{className:`target target1`,style:{left:`50px`,top:`150px`},children:`Target1`}),(0,f.jsx)(`div`,{className:`target target2`,style:{left:`250px`,top:`250px`},children:`Target2`}),(0,f.jsx)(`div`,{className:`target target3`,style:{left:`400px`,top:`300px`},children:`Target3`}),(0,f.jsx)(s,{ref:e,target:t,draggable:!0,resizable:!0,snappable:!0,snapGridWidth:50,onRender:e=>{e.target.style.cssText+=e.cssText},onRenderGroup:e=>{e.events.forEach(e=>{e.target.style.cssText+=e.cssText})}}),(0,f.jsx)(ie,{dragContainer:window,selectableTargets:[`.target`],hitRate:0,selectByClick:!0,selectFromInside:!0,toggleContinueSelect:[`shift`],ratio:0,onDragStart:n=>{let r=e.current,i=n.inputEvent.target;(i.tagName===`BUTTON`||r.isMoveableElement(i)||t.some(e=>e===i||e.contains(i)))&&n.stop()},onSelectEnd:t=>{let r=e.current;t.isDragStart&&(t.inputEvent.preventDefault(),r.waitToChangeTarget().then(()=>{r.dragStart(t.inputEvent)})),n(t.selected)}})]})})}var d,f;function p(){return(p=t((()=>{d=e(r()),o(),re(),f=i()})))()}var oe=n({default:()=>se});function se(e){let t=m.useRef(null),n=m.useRef(null),r=m.useRef(null),[i]=m.useState(()=>{function e(){r.current.request(`draggable`,{x:parseInt(t.current.value),y:parseInt(n.current.value)},!0)}return{onInput(t){(t.nativeEvent||t).data===void 0&&e()},onKeyUp(t){t.stopPropagation(),t.keyCode===13&&e()}}});return(0,h.jsxs)(`div`,{className:`root`,children:[(0,h.jsxs)(`div`,{children:[`X: `,(0,h.jsx)(`input`,{ref:t,type:`number`,defaultValue:`100`,...i}),`\xA0 Y: `,(0,h.jsx)(`input`,{ref:n,type:`number`,defaultValue:`150`,...i})]}),(0,h.jsxs)(`div`,{className:`container`,style:{transform:`scale(${e.containerScale})`},children:[(0,h.jsx)(`div`,{className:`target`,children:`Target`}),(0,h.jsx)(s,{ref:r,target:`.target`,draggable:!0,throttleDrag:e.throttleDrag,edgeDraggable:e.edgeDraggable,startDragRotate:e.startDragRotate,throttleDragRotate:e.throttleDragRotate,onDrag:e=>{e.target.style.transform=e.transform},onDragEnd:e=>{requestAnimationFrame(()=>{let r=e.moveable.getRect();t.current.value=`${r.left}`,n.current.value=`${r.top}`})}})]})]})}var m,h;function ce(){return(ce=t((()=>{m=e(r()),o(),h=i()})))()}var le=n({default:()=>ue});function ue(){let e=de.useRef(null);return(0,g.jsxs)(`div`,{className:`root`,children:[(0,g.jsx)(`button`,{onClick:()=>{e.current.request(`draggable`,{deltaX:-49,deltaY:0,useSnap:!0},!0)},children:`Left`}),(0,g.jsx)(`button`,{onClick:()=>{e.current.request(`draggable`,{deltaX:49,deltaY:0,useSnap:!0},!0)},children:`Right`}),(0,g.jsxs)(`div`,{className:`container`,children:[(0,g.jsx)(`div`,{className:`target`,children:`Target`}),(0,g.jsx)(s,{ref:e,target:`.target`,draggable:!0,snappable:!0,snapGridWidth:50,onRender:e=>{e.target.style.cssText+=e.cssText}})]})]})}var de,g;function fe(){return(fe=t((()=>{de=e(r()),o(),g=i()})))()}var pe=n({default:()=>me});function me(e){let t=_.useRef(null),n=_.useRef(null),r=_.useRef(null),i=e=>{(e.nativeEvent||e).data===void 0&&r.current.request(`resizable`,{offsetWidth:parseFloat(t.current.value),offsetHeight:parseFloat(n.current.value)},!0)},a=e=>{e.stopPropagation(),e.keyCode===13&&r.current.request(`resizable`,{offsetWidth:parseFloat(t.current.value),offsetHeight:parseFloat(n.current.value)},!0)};return(0,v.jsxs)(`div`,{className:`root`,children:[(0,v.jsxs)(`div`,{children:[`width: `,(0,v.jsx)(`input`,{ref:t,type:`number`,defaultValue:`280`,onInput:i,onKeyUp:a,"data-horizontal":`true`}),`\xA0 height: `,(0,v.jsx)(`input`,{ref:n,type:`number`,defaultValue:`230`,onInput:i,onKeyUp:a,"data-horizontal":`false`})]}),(0,v.jsxs)(`div`,{className:`container`,children:[(0,v.jsx)(`div`,{className:`target`,children:`Target1`}),(0,v.jsx)(s,{ref:r,target:`.target`,resizable:e.resizable,keepRatio:e.keepRatio,throttleResize:e.throttleResize,renderDirections:e.renderDirections,onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`,e.target.style.transform=e.drag.transform},onResizeEnd:e=>{requestAnimationFrame(()=>{let r=e.moveable.getRect();t.current.value=`${r.offsetWidth}`,n.current.value=`${r.offsetHeight}`})}})]})]})}var _,v;function y(){return(y=t((()=>{_=e(r()),o(),v=i()})))()}var he=n({default:()=>b});function b(e){let t=x.useRef(null);return(0,S.jsxs)(`div`,{className:`root`,children:[(0,S.jsx)(`button`,{onClick:()=>{t.current.request(`resizable`,{deltaHeight:12},!0)},children:`request`}),(0,S.jsx)(`div`,{className:`input`}),(0,S.jsxs)(`div`,{className:`container`,children:[(0,S.jsx)(`div`,{className:`target`,style:{width:`381.609px`,height:`119.416px`,color:`black`,marginTop:`20px`,marginLeft:`20px`,border:`none`},children:`Target1`}),(0,S.jsx)(s,{ref:t,target:`.target`,resizable:!0,onResize:e=>{e.target.style.width=`${e.width}px`,e.target.style.height=`${e.height}px`;let t=document.querySelector(`.input`);t.innerHTML=JSON.stringify({dist:e.dist,width:e.width,height:e.height})}})]})]})}var x,S;function C(){return(C=t((()=>{x=e(r()),o(),S=i()})))()}var ge=n({default:()=>w});function w(e){let t=T.useRef(null),n=T.useRef(null),r=T.useRef(null),i=e=>{let i=e.nativeEvent||e,a=JSON.parse(i.target.getAttribute(`data-horizontal`));i.data===void 0&&r.current.request(`resizable`,{offsetWidth:parseFloat(t.current.value),offsetHeight:parseFloat(n.current.value),horizontal:a},!0)},a=e=>{let i=e.nativeEvent||e,a=JSON.parse(i.target.getAttribute(`data-horizontal`));e.stopPropagation(),e.keyCode===13&&r.current.request(`resizable`,{offsetWidth:parseFloat(t.current.value),offsetHeight:parseFloat(n.current.value),horizontal:a},!0)};return(0,E.jsxs)(`div`,{className:`root`,children:[(0,E.jsxs)(`div`,{children:[`width: `,(0,E.jsx)(`input`,{ref:t,type:`number`,defaultValue:`280`,onInput:i,onKeyUp:a,"data-horizontal":`true`}),`\xA0 height: `,(0,E.jsx)(`input`,{ref:n,type:`number`,defaultValue:`230`,onInput:i,onKeyUp:a,"data-horizontal":`false`})]}),(0,E.jsxs)(`div`,{className:`container`,children:[(0,E.jsx)(`div`,{className:`target target1`,children:`Target1`}),(0,E.jsx)(`div`,{className:`target target2`,children:`Target2`}),(0,E.jsx)(`div`,{className:`target target3`,children:`Target3`}),(0,E.jsx)(s,{ref:r,target:`.target`,draggable:!0,resizable:e.resizable,keepRatio:e.keepRatio,throttleResize:e.throttleResize,renderDirections:e.renderDirections,onResizeGroupStart:({setMin:t,setMax:n})=>{t([e.minWidth,e.minHeight]),n([e.maxWidth,e.maxHeight])},onResizeGroup:({events:e})=>{e.forEach(e=>{e.target.style.width=`${e.boundingWidth}px`,e.target.style.height=`${e.boundingHeight}px`,e.target.style.transform=`translate(${e.drag.beforeTranslate[0]}px, ${e.drag.beforeTranslate[1]}px)`})},onResizeGroupEnd:e=>{requestAnimationFrame(()=>{let r=e.moveable.getRect();t.current.value=`${r.offsetWidth}`,n.current.value=`${r.offsetHeight}`})},onDragGroup:({events:e})=>{e.forEach(e=>{e.target.style.transform=e.transform})}})]})]})}var T,E;function D(){return(D=t((()=>{T=e(r()),o(),E=i()})))()}var _e=n({default:()=>O});function O(){let e=k.useRef(null);return(0,A.jsxs)(`div`,{className:`root`,children:[(0,A.jsx)(`button`,{onClick:()=>{e.current.request(`resizable`,{direction:[1,0],deltaWidth:-49,useSnap:!0},!0)},children:`Left`}),(0,A.jsx)(`button`,{onClick:()=>{e.current.request(`resizable`,{direction:[1,0],deltaWidth:49,useSnap:!0},!0)},children:`Right`}),(0,A.jsxs)(`div`,{className:`container`,children:[(0,A.jsx)(`div`,{className:`target`,children:`Target`}),(0,A.jsx)(s,{ref:e,target:`.target`,draggable:!0,resizable:!0,snappable:!0,snapGridWidth:50,onRender:e=>{e.target.style.cssText+=e.cssText}})]})]})}var k,A;function j(){return(j=t((()=>{k=e(r()),o(),A=i()})))()}var M;function N(){return(N=t((()=>{M=`import * as React from "react";
import Moveable, { DraggableRequestParam } from "@/react-moveable";
import Selecto from "react-selecto";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);
    const [targets, setTargets] = React.useState<Array<HTMLElement | SVGElement>>([]);
    return (
        <div className="root">
            <div className="container">
                <button onClick={() => {
                    const rect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request<DraggableRequestParam>("draggable", {
                            y: rect.top,
                        }, true);
                    });

                    moveableRef.current?.updateRect();
                }}>Align Top</button>&nbsp;
                <button onClick={() => {
                    const rect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request<DraggableRequestParam>("draggable", {
                            y: rect.top + rect.height,
                        }, true);
                    });

                    moveableRef.current?.updateRect();
                }}>Align Bottom</button>&nbsp;
                <button onClick={() => {
                    const rect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request<DraggableRequestParam>("draggable", {
                            x: rect.left,
                        }, true);
                    });

                    moveableRef.current?.updateRect();
                }}>Align Left</button>&nbsp;
                <button onClick={() => {
                    const rect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach(child => {
                        child.request<DraggableRequestParam>("draggable", {
                            y: rect.left + rect.width,
                        }, true);
                    });

                    moveableRef.current?.updateRect();
                }}>Align Right</button>&nbsp;
                <button onClick={() => {
                    const rect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach((child, i) => {
                        child.request<DraggableRequestParam>("draggable", {
                            y: rect.top + rect.height / 2 - rect.children![i].height / 2,
                        }, true);
                    });

                    moveableRef.current?.updateRect();
                }}>Align Vertical Center</button>&nbsp;
                <button onClick={() => {
                    const rect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();

                    if (moveables.length <= 1) {
                        return;
                    }
                    moveables.forEach((child, i) => {
                        child.request<DraggableRequestParam>("draggable", {
                            x: rect.left + rect.width / 2 - rect.children![i].width / 2,
                        }, true);
                    });

                    moveableRef.current?.updateRect();
                }}>Align Horizontal Center</button>&nbsp;
                <button onClick={() => {
                    const groupRect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();
                    let top = groupRect.top;

                    if (moveables.length <= 1) {
                        return;
                    }
                    const gap = (groupRect.height - groupRect.children!.reduce((prev, cur) => {
                        return prev + cur.height;
                    }, 0)) / (moveables.length - 1);

                    moveables.sort((a, b) => {
                        return a.state.top - b.state.top;
                    });
                    moveables.forEach(child => {
                        const rect = child.getRect();

                        child.request<DraggableRequestParam>("draggable", {
                            y: top,
                        }, true);

                        top += rect.height + gap;
                    });


                    moveableRef.current?.updateRect();
                }}>Arrange Vertical Spacing</button>&nbsp;
                <button onClick={() => {
                    const groupRect = moveableRef.current!.getRect();
                    const moveables = moveableRef.current!.getMoveables();
                    let left = groupRect.left;

                    if (moveables.length <= 1) {
                        return;
                    }
                    const gap = (groupRect.width - groupRect.children!.reduce((prev, cur) => {
                        return prev + cur.width;
                    }, 0)) / (moveables.length - 1);

                    moveables.sort((a, b) => {
                        return a.state.left - b.state.left;
                    });
                    moveables.forEach(child => {
                        const rect = child.getRect();

                        child.request<DraggableRequestParam>("draggable", {
                            x: left,
                        }, true);

                        left += rect.width + gap;
                    });

                    moveableRef.current?.updateRect();
                }}>Arrange Horizontal Spacing</button>&nbsp;
                <div className="target target1" style={{
                    left: "50px",
                    top: "150px",
                }}>Target1</div>
                <div className="target target2" style={{
                    left: "250px",
                    top: "250px",
                }}>Target2</div>
                <div className="target target3" style={{
                    left: "400px",
                    top: "300px",
                }}>Target3</div>
                <Moveable
                    ref={moveableRef}
                    target={targets}
                    draggable={true}
                    resizable={true}
                    snappable={true}
                    snapGridWidth={50}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                    onRenderGroup={e => {
                        e.events.forEach(ev => {
                            ev.target.style.cssText += ev.cssText;
                        });
                    }}
                />
                <Selecto
                    dragContainer={window}
                    selectableTargets={[".target"]}
                    hitRate={0}
                    selectByClick={true}
                    selectFromInside={true}
                    toggleContinueSelect={["shift"]}
                    ratio={0}
                    onDragStart={e => {
                        const moveable = moveableRef.current!;
                        const target = e.inputEvent.target;
                        if (
                            target.tagName === "BUTTON"
                            || moveable.isMoveableElement(target)
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
            </div>
        </div>
    );
}
`})))()}var P;function F(){return(F=t((()=>{P=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const xInputRef = React.useRef<HTMLInputElement>(null);
    const yInputRef = React.useRef<HTMLInputElement>(null);
    const moveableRef = React.useRef<Moveable>(null);
    const [requestCallbacks] = React.useState(() => {
        function request() {
            moveableRef.current!.request("draggable", {
                x: parseInt(xInputRef.current!.value),
                y: parseInt(yInputRef.current!.value),
            }, true);
        }
        return {
            onInput(e: any) {
                const ev = (e.nativeEvent || e) as InputEvent;

                if (typeof ev.data === "undefined") {
                    request();
                }
            },
            onKeyUp(e: any) {
                e.stopPropagation();

                // enter
                if (e.keyCode === 13) {
                    request();
                }
            },
        };
    });

    return (
        <div className="root">
            <div>
                X: <input ref={xInputRef} type="number" defaultValue="100" {...requestCallbacks}></input>&nbsp;
                Y: <input ref={yInputRef} type="number" defaultValue="150" {...requestCallbacks}></input>
            </div>

            <div className="container" style={{
                transform: \`scale(\${props.containerScale})\`,
            }}>
                <div className="target">Target</div>
                <Moveable
                    ref={moveableRef}
                    target={".target"}
                    draggable={true}
                    throttleDrag={props.throttleDrag}
                    edgeDraggable={props.edgeDraggable}
                    startDragRotate={props.startDragRotate}
                    throttleDragRotate={props.throttleDragRotate}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                    }}
                    onDragEnd={e => {
                        requestAnimationFrame(() => {
                            const rect = e.moveable.getRect();

                            xInputRef.current!.value = \`\${rect.left}\`;
                            yInputRef.current!.value = \`\${rect.top}\`;
                        });
                    }}
                />
            </div>
        </div>
    );
};
`})))()}var I;function L(){return(L=t((()=>{I=`import * as React from "react";
import Moveable, { DraggableRequestParam } from "@/react-moveable";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <button onClick={() => {
                moveableRef.current!.request<DraggableRequestParam>("draggable", {
                    deltaX: -49,
                    deltaY: 0,
                    useSnap: true,
                }, true);
            }}>Left</button>
            <button onClick={() => {
                moveableRef.current!.request<DraggableRequestParam>("draggable", {
                    deltaX: 49,
                    deltaY: 0,
                    useSnap: true,
                }, true);
            }}>Right</button>
            <div className="container">
                <div className="target">Target</div>
                <Moveable
                    ref={moveableRef}
                    target={".target"}
                    draggable={true}
                    snappable={true}
                    snapGridWidth={50}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var R;function z(){return(z=t((()=>{R=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const widthInputRef = React.useRef<HTMLInputElement>(null);
    const heightInputRef = React.useRef<HTMLInputElement>(null);
    const moveableRef = React.useRef<Moveable>(null);
    const onInput = (e: any) => {
        const ev = (e.nativeEvent || e) as InputEvent;

        if (typeof ev.data === "undefined") {
            moveableRef.current!.request("resizable", {
                offsetWidth: parseFloat(widthInputRef.current!.value),
                offsetHeight: parseFloat(heightInputRef.current!.value),
            }, true);
        }
    };
    const onKeyUp = (e: any) => {
        e.stopPropagation();

        // enter
        if (e.keyCode === 13) {
            moveableRef.current!.request("resizable", {
                offsetWidth: parseFloat(widthInputRef.current!.value),
                offsetHeight: parseFloat(heightInputRef.current!.value),
            }, true);
        }
    };

    return <div className="root">
        <div>
            width: <input ref={widthInputRef}
                type="number" defaultValue="280"
                onInput={onInput} onKeyUp={onKeyUp} data-horizontal="true"/>&nbsp;
            height: <input ref={heightInputRef}
                type="number" defaultValue="230"
                onInput={onInput} onKeyUp={onKeyUp} data-horizontal="false"/>
        </div>
        <div className="container">
            <div className="target">Target1</div>
            <Moveable
                ref={moveableRef}
                target={".target"}
                resizable={props.resizable}
                keepRatio={props.keepRatio}
                throttleResize={props.throttleResize}
                renderDirections={props.renderDirections}
                onResize={(e) => {
                    e.target.style.width = \`\${e.width}px\`;
                    e.target.style.height = \`\${e.height}px\`;
                    e.target.style.transform = e.drag.transform;
                }}
                onResizeEnd={(e) => {
                    requestAnimationFrame(() => {
                        const rect = e.moveable.getRect();

                        widthInputRef.current!.value = \`\${rect.offsetWidth}\`;
                        heightInputRef.current!.value = \`\${rect.offsetHeight}\`;
                    });
                }}
            />
        </div>
    </div>;
}
`})))()}var B;function V(){return(V=t((()=>{B=`import * as React from "react";
import Moveable, { ResizableRequestParam } from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const moveableRef = React.useRef<Moveable>(null);

    return <div className="root">
        <button onClick={() => {
            moveableRef.current!.request<ResizableRequestParam>("resizable", {
                deltaHeight: 12,
            }, true);
        }}>request</button>
        <div className="input"></div>
        <div className="container">
            <div className="target" style={{
                width: "381.609px",
                height: "119.416px",
                color: "black",
                marginTop: "20px",
                marginLeft: "20px",
                border: "none",
            }}>Target1</div>
            <Moveable
                ref={moveableRef}
                target={".target"}
                resizable={true}
                onResize={(e) => {
                    e.target.style.width = \`\${e.width}px\`;
                    e.target.style.height = \`\${e.height}px\`;
                    const input = document.querySelector(".input")!;

                    input.innerHTML = JSON.stringify({ dist: e.dist, width: e.width, height: e.height });
                }}
            />
        </div>
    </div>;
}
`})))()}var H;function ve(){return(ve=t((()=>{H=`import * as React from "react";
import Moveable from "@/react-moveable";

export default function App(props: Record<string, any>) {
    const widthInputRef = React.useRef<HTMLInputElement>(null);
    const heightInputRef = React.useRef<HTMLInputElement>(null);
    const moveableRef = React.useRef<Moveable>(null);
    const onInput = (e: any) => {
        const ev = (e.nativeEvent || e) as InputEvent;
        const horizontal = JSON.parse((ev.target as HTMLElement).getAttribute("data-horizontal")!);

        if (typeof ev.data === "undefined") {
            moveableRef.current!.request("resizable", {
                offsetWidth: parseFloat(widthInputRef.current!.value),
                offsetHeight: parseFloat(heightInputRef.current!.value),
                horizontal,
            }, true);
        }
    };
    const onKeyUp = (e: any) => {
        const ev = (e.nativeEvent || e) as InputEvent;
        const horizontal = JSON.parse((ev.target as HTMLElement).getAttribute("data-horizontal")!);
        e.stopPropagation();

        // enter
        if (e.keyCode === 13) {
            moveableRef.current!.request("resizable", {
                offsetWidth: parseFloat(widthInputRef.current!.value),
                offsetHeight: parseFloat(heightInputRef.current!.value),
                horizontal,
            }, true);
        }
    };

    return <div className="root">
        <div>
            width: <input ref={widthInputRef}
                type="number" defaultValue="280"
                onInput={onInput} onKeyUp={onKeyUp} data-horizontal="true"/>&nbsp;
            height: <input ref={heightInputRef}
                type="number" defaultValue="230"
                onInput={onInput} onKeyUp={onKeyUp} data-horizontal="false"/>
        </div>
        <div className="container">
            <div className="target target1">Target1</div>
            <div className="target target2">Target2</div>
            <div className="target target3">Target3</div>
            <Moveable
                ref={moveableRef}
                target={".target"}
                draggable={true}
                resizable={props.resizable}
                keepRatio={props.keepRatio}
                throttleResize={props.throttleResize}
                renderDirections={props.renderDirections}
                onResizeGroupStart={({ setMin, setMax }) => {
                    setMin([props.minWidth, props.minHeight]);
                    setMax([props.maxWidth, props.maxHeight]);
                }}
                onResizeGroup={({ events }) => {
                    events.forEach(ev => {
                        ev.target.style.width = \`\${ev.boundingWidth}px\`;
                        ev.target.style.height = \`\${ev.boundingHeight}px\`;
                        ev.target.style.transform
                            = \`translate(\${ev.drag.beforeTranslate[0]}px, \${ev.drag.beforeTranslate[1]}px)\`;
                    });
                }}
                onResizeGroupEnd={(e) => {
                    requestAnimationFrame(() => {
                        const rect = e.moveable.getRect();

                        widthInputRef.current!.value = \`\${rect.offsetWidth}\`;
                        heightInputRef.current!.value = \`\${rect.offsetHeight}\`;
                    });
                }}
                onDragGroup={({ events }) => {
                    events.forEach(ev => {
                        ev.target.style.transform = ev.transform;
                    });
                }}
            />
        </div>
    </div>;
}
`})))()}var ye;function be(){return(be=t((()=>{ye=`import * as React from "react";
import Moveable, { ResizableRequestParam } from "@/react-moveable";

export default function App() {
    const moveableRef = React.useRef<Moveable>(null);

    return (
        <div className="root">
            <button onClick={() => {
                moveableRef.current!.request<ResizableRequestParam>("resizable", {
                    direction: [1, 0],
                    deltaWidth: -49,
                    useSnap: true,
                }, true);
            }}>Left</button>
            <button onClick={() => {
                moveableRef.current!.request<ResizableRequestParam>("resizable", {
                    direction: [1, 0],
                    deltaWidth: 49,
                    useSnap: true,
                }, true);
            }}>Right</button>
            <div className="container">
                <div className="target">Target</div>
                <Moveable
                    ref={moveableRef}
                    target={".target"}
                    draggable={true}
                    resizable={true}
                    snappable={true}
                    snapGridWidth={50}
                    onRender={e => {
                        e.target.style.cssText += e.cssText;
                    }}
                />
            </div>
        </div>
    );
}
`})))()}var xe;function Se(){return(Se=t((()=>{xe=`import Moveable, { DraggableRequestParam } from "lit-moveable";
import Selecto from "lit-selecto";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    @state()
    targets: Array<HTMLElement | SVGElement> = [];
    render() {
        return html \`<div class="root">
    <div class="container">
        <button @click=\${this.onClick}>Align Top</button>
        &nbsp;
        <button @click=\${this.onClick$0}>Align Bottom</button>
        &nbsp;
        <button @click=\${this.onClick$1}>Align Left</button>
        &nbsp;
        <button @click=\${this.onClick$2}>Align Right</button>
        &nbsp;
        <button @click=\${this.onClick$3}>Align Vertical Center</button>
        &nbsp;
        <button @click=\${this.onClick$4}>Align Horizontal Center</button>
        &nbsp;
        <button @click=\${this.onClick$5}>Arrange Vertical Spacing</button>
        &nbsp;
        <button @click=\${this.onClick$6}>Arrange Horizontal Spacing</button>
        &nbsp;
        <div
            class="target target1"
            style="left: 50px;top: 150px;"
        >Target1</div>
        <div
            class="target target2"
            style="left: 250px;top: 250px;"
        >Target2</div>
        <div
            class="target target3"
            style="left: 400px;top: 300px;"
        >Target3</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${this.targets}
            .litDraggable=\${true}
            .resizable=\${true}
            .snappable=\${true}
            .snapGridWidth=\${50}
            @litRender=\${this.onRender}
            @litRenderGroup=\${this.onRenderGroup}
        ></lit-moveable>
        <lit-selecto
            .dragContainer=\${window}
            .selectableTargets=\${[".target"]}
            .hitRate=\${0}
            .selectByClick=\${true}
            .selectFromInside=\${true}
            .toggleContinueSelect=\${["shift"]}
            .ratio=\${0}
            @litDragStart=\${this.onDragStart}
            @litSelectEnd=\${this.onSelectEnd}
        ></lit-selecto>
    </div>
</div>\`;
    }
    onClick() {
        const rect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        if (moveables.length <= 1) {
            return;
        }
        moveables.forEach(child => {
            child.request<DraggableRequestParam>("draggable", {
                y: rect.top
            }, true);
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$0() {
        const rect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        if (moveables.length <= 1) {
            return;
        }
        moveables.forEach(child => {
            child.request<DraggableRequestParam>("draggable", {
                y: rect.top + rect.height
            }, true);
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$1() {
        const rect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        if (moveables.length <= 1) {
            return;
        }
        moveables.forEach(child => {
            child.request<DraggableRequestParam>("draggable", {
                x: rect.left
            }, true);
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$2() {
        const rect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        if (moveables.length <= 1) {
            return;
        }
        moveables.forEach(child => {
            child.request<DraggableRequestParam>("draggable", {
                y: rect.left + rect.width
            }, true);
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$3() {
        const rect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        if (moveables.length <= 1) {
            return;
        }
        moveables.forEach((child, i) => {
            child.request<DraggableRequestParam>("draggable", {
                y: rect.top + rect.height / 2 - rect.children![i].height / 2
            }, true);
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$4() {
        const rect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        if (moveables.length <= 1) {
            return;
        }
        moveables.forEach((child, i) => {
            child.request<DraggableRequestParam>("draggable", {
                x: rect.left + rect.width / 2 - rect.children![i].width / 2
            }, true);
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$5() {
        const groupRect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        let top = groupRect.top;
        if (moveables.length <= 1) {
            return;
        }
        const gap = (groupRect.height - groupRect.children!.reduce(
            (prev, cur) => {
                return prev + cur.height;
            },
            0
        )) / (moveables.length - 1);
        moveables.sort((a, b) => {
            return a.state.top - b.state.top;
        });
        moveables.forEach(child => {
            const rect = child.getRect();
            child.request<DraggableRequestParam>("draggable", {
                y: top
            }, true);
            top += rect.height + gap;
        });
        this.moveableRef.value?.updateRect();
    }
    onClick$6() {
        const groupRect = this.moveableRef.value!.getRect();
        const moveables = this.moveableRef.value!.getMoveables();
        let left = groupRect.left;
        if (moveables.length <= 1) {
            return;
        }
        const gap = (groupRect.width - groupRect.children!.reduce(
            (prev, cur) => {
                return prev + cur.width;
            },
            0
        )) / (moveables.length - 1);
        moveables.sort((a, b) => {
            return a.state.left - b.state.left;
        });
        moveables.forEach(child => {
            const rect = child.getRect();
            child.request<DraggableRequestParam>("draggable", {
                x: left
            }, true);
            left += rect.width + gap;
        });
        this.moveableRef.value?.updateRect();
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
    onRenderGroup(e) {
        e.events.forEach(ev => {
            ev.target.style.cssText += ev.cssText;
        });
    }
    onDragStart(e) {
        const moveable = this.moveableRef.value!;
        const target = e.inputEvent.target;
        if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
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
}`})))()}var Ce;function we(){return(we=t((()=>{Ce=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    containerScale: any = "$preview_containerScale";
    throttleDrag: any = "$preview_throttleDrag";
    edgeDraggable: any = "$preview_edgeDraggable";
    startDragRotate: any = "$preview_startDragRotate";
    throttleDragRotate: any = "$preview_throttleDragRotate";
    xInputRef: Ref<HTMLInputElement> = createRef(null);
    yInputRef: Ref<HTMLInputElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    @state()
    requestCallbacks: any = (() => {
        function request() {
            this.moveableRef.value!.request("draggable", {
                x: parseInt(this.xInputRef.value!.value),
                y: parseInt(this.yInputRef.value!.value)
            }, true);
        }
        return {
            onInput(e: any) {
                const ev = (e.nativeEvent || e) as InputEvent;
                if (typeof ev.data === "undefined") {
                    request();
                }
            },
            onKeyUp(e: any) {
                e.stopPropagation();
                if (e.keyCode === 13) {
                    request();
                }
            }
        };
    })();
    render() {
        return html \`<div class="root">
    <div>
        X:
        <input
            \${ref(this.xInputRef)}
            type="number"
            defaultValue="100"
            {...this.requestCallbacks}
        ></input>
        &nbsp;
                        Y:
        <input
            \${ref(this.yInputRef)}
            type="number"
            defaultValue="150"
            {...this.requestCallbacks}
        ></input>
    </div>
    <div
        class="container"
        .style=\${\`transform: \${\`scale(\${this.containerScale})\`};\`}
    >
        <div class="target">Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .litDraggable=\${true}
            .throttleDrag=\${this.throttleDrag}
            .edgeDraggable=\${this.edgeDraggable}
            .startDragRotate=\${this.startDragRotate}
            .throttleDragRotate=\${this.throttleDragRotate}
            @litDrag=\${this.onDrag}
            @litDragEnd=\${this.onDragEnd}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onDrag(e) {
        e.target.style.transform = e.transform;
    }
    onDragEnd(e) {
        requestAnimationFrame(() => {
            const rect = e.moveable.getRect();
            this.xInputRef.value!.value = \`\${rect.left}\`;
            this.yInputRef.value!.value = \`\${rect.top}\`;
        });
    }
}`})))()}var Te;function Ee(){return(Ee=t((()=>{Te=`import Moveable, { DraggableRequestParam } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <button @click=\${this.onClick}>Left</button>
    <button @click=\${this.onClick$0}>Right</button>
    <div class="container">
        <div class="target">Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .litDraggable=\${true}
            .snappable=\${true}
            .snapGridWidth=\${50}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onClick() {
        this.moveableRef.value!.request<DraggableRequestParam>(
            "draggable",
            { deltaX: -49, deltaY: 0, useSnap: true },
            true
        );
    }
    onClick$0() {
        this.moveableRef.value!.request<DraggableRequestParam>(
            "draggable",
            { deltaX: 49, deltaY: 0, useSnap: true },
            true
        );
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var De;function Oe(){return(Oe=t((()=>{De=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    resizable: any = "$preview_resizable";
    keepRatio: any = "$preview_keepRatio";
    throttleResize: any = "$preview_throttleResize";
    renderDirections: any = "$preview_renderDirections";
    widthInputRef: Ref<HTMLInputElement> = createRef(null);
    heightInputRef: Ref<HTMLInputElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    onInput: any = (e: any) => {
        const ev = (e.nativeEvent || e) as InputEvent;
        if (typeof ev.data === "undefined") {
            this.moveableRef.value!.request("resizable", {
                offsetWidth: parseFloat(this.widthInputRef.value!.value),
                offsetHeight: parseFloat(this.heightInputRef.value!.value)
            }, true);
        }
    };
    onKeyUp: any = (e: any) => {
        e.stopPropagation();
        if (e.keyCode === 13) {
            this.moveableRef.value!.request("resizable", {
                offsetWidth: parseFloat(this.widthInputRef.value!.value),
                offsetHeight: parseFloat(this.heightInputRef.value!.value)
            }, true);
        }
    };
    render() {
        return html \`<div class="root">
    <div>
        width:
        <input
            \${ref(this.widthInputRef)}
            type="number"
            defaultValue="280"
            @input=\${this.onInput}
            @keyUp=\${this.onKeyUp}
            data-horizontal="true"
        ></input>
        &nbsp;
                    height:
        <input
            \${ref(this.heightInputRef)}
            type="number"
            defaultValue="230"
            @input=\${this.onInput}
            @keyUp=\${this.onKeyUp}
            data-horizontal="false"
        ></input>
    </div>
    <div class="container">
        <div class="target">Target1</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .resizable=\${this.resizable}
            .keepRatio=\${this.keepRatio}
            .throttleResize=\${this.throttleResize}
            .renderDirections=\${this.renderDirections}
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
        requestAnimationFrame(() => {
            const rect = e.moveable.getRect();
            this.widthInputRef.value!.value = \`\${rect.offsetWidth}\`;
            this.heightInputRef.value!.value = \`\${rect.offsetHeight}\`;
        });
    }
}`})))()}var ke;function Ae(){return(Ae=t((()=>{ke=`import Moveable, { ResizableRequestParam } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <button @click=\${this.onClick}>request</button>
    <div class="input"></div>
    <div class="container">
        <div
            class="target"
            style="width: 381.609px;height: 119.416px;color: black;margin-top: 20px;margin-left: 20px;border: none;"
        >Target1</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .resizable=\${true}
            @litResize=\${this.onResize}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onClick() {
        this.moveableRef.value!.request<ResizableRequestParam>(
            "resizable",
            { deltaHeight: 12 },
            true
        );
    }
    onResize(e) {
        e.target.style.width = \`\${e.width}px\`;
        e.target.style.height = \`\${e.height}px\`;
        const input = document.querySelector(".input")!;
        input.innerHTML = JSON.stringify({
            dist: e.dist,
            width: e.width,
            height: e.height
        });
    }
}`})))()}var je;function Me(){return(Me=t((()=>{je=`import Moveable from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    resizable: any = "$preview_resizable";
    keepRatio: any = "$preview_keepRatio";
    throttleResize: any = "$preview_throttleResize";
    renderDirections: any = "$preview_renderDirections";
    minWidth: any = "$preview_minWidth";
    minHeight: any = "$preview_minHeight";
    maxWidth: any = "$preview_maxWidth";
    maxHeight: any = "$preview_maxHeight";
    widthInputRef: Ref<HTMLInputElement> = createRef(null);
    heightInputRef: Ref<HTMLInputElement> = createRef(null);
    moveableRef: Ref<Moveable> = createRef(null);
    onInput: any = (e: any) => {
        const ev = (e.nativeEvent || e) as InputEvent;
        const horizontal = JSON.parse((ev.target as HTMLElement).getAttribute("data-horizontal")!);
        if (typeof ev.data === "undefined") {
            this.moveableRef.value!.request("resizable", {
                offsetWidth: parseFloat(this.widthInputRef.value!.value),
                offsetHeight: parseFloat(this.heightInputRef.value!.value),
                horizontal
            }, true);
        }
    };
    onKeyUp: any = (e: any) => {
        const ev = (e.nativeEvent || e) as InputEvent;
        const horizontal = JSON.parse((ev.target as HTMLElement).getAttribute("data-horizontal")!);
        e.stopPropagation();
        if (e.keyCode === 13) {
            this.moveableRef.value!.request("resizable", {
                offsetWidth: parseFloat(this.widthInputRef.value!.value),
                offsetHeight: parseFloat(this.heightInputRef.value!.value),
                horizontal
            }, true);
        }
    };
    render() {
        return html \`<div class="root">
    <div>
        width:
        <input
            \${ref(this.widthInputRef)}
            type="number"
            defaultValue="280"
            @input=\${this.onInput}
            @keyUp=\${this.onKeyUp}
            data-horizontal="true"
        ></input>
        &nbsp;
                    height:
        <input
            \${ref(this.heightInputRef)}
            type="number"
            defaultValue="230"
            @input=\${this.onInput}
            @keyUp=\${this.onKeyUp}
            data-horizontal="false"
        ></input>
    </div>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .litDraggable=\${true}
            .resizable=\${this.resizable}
            .keepRatio=\${this.keepRatio}
            .throttleResize=\${this.throttleResize}
            .renderDirections=\${this.renderDirections}
            @litResizeGroupStart=\${this.onResizeGroupStart}
            @litResizeGroup=\${this.onResizeGroup}
            @litResizeGroupEnd=\${this.onResizeGroupEnd}
            @litDragGroup=\${this.onDragGroup}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onResizeGroupStart({ setMin, setMax }) {
        setMin([this.minWidth, this.minHeight]);
        setMax([this.maxWidth, this.maxHeight]);
    }
    onResizeGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.width = \`\${ev.boundingWidth}px\`;
            ev.target.style.height = \`\${ev.boundingHeight}px\`;
            ev.target.style.transform = \`translate(\${ev.drag.beforeTranslate[0]}px, \${ev.drag.beforeTranslate[1]}px)\`;
        });
    }
    onResizeGroupEnd(e) {
        requestAnimationFrame(() => {
            const rect = e.moveable.getRect();
            this.widthInputRef.value!.value = \`\${rect.offsetWidth}\`;
            this.heightInputRef.value!.value = \`\${rect.offsetHeight}\`;
        });
    }
    onDragGroup({ events }) {
        events.forEach(ev => {
            ev.target.style.transform = ev.transform;
        });
    }
}`})))()}var Ne;function Pe(){return(Pe=t((()=>{Ne=`import Moveable, { ResizableRequestParam } from "lit-moveable";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef } from "lit/directives/ref.js";

@customElement("lit-app")
export default class App extends LitElement {
    moveableRef: Ref<Moveable> = createRef(null);
    render() {
        return html \`<div class="root">
    <button @click=\${this.onClick}>Left</button>
    <button @click=\${this.onClick$0}>Right</button>
    <div class="container">
        <div class="target">Target</div>
        <lit-moveable
            \${ref(this.moveableRef)}
            .target=\${".target"}
            .litDraggable=\${true}
            .resizable=\${true}
            .snappable=\${true}
            .snapGridWidth=\${50}
            @litRender=\${this.onRender}
        ></lit-moveable>
    </div>
</div>\`;
    }
    onClick() {
        this.moveableRef.value!.request<ResizableRequestParam>(
            "resizable",
            { direction: [1, 0], deltaWidth: -49, useSnap: true },
            true
        );
    }
    onClick$0() {
        this.moveableRef.value!.request<ResizableRequestParam>(
            "resizable",
            { direction: [1, 0], deltaWidth: 49, useSnap: true },
            true
        );
    }
    onRender(e) {
        e.target.style.cssText += e.cssText;
    }
}`})))()}var Fe;function Ie(){return(Ie=t((()=>{Fe=`<div class="root">
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <button data-croffle-ref="element$1">Align Top</button>
        &nbsp;
        <button data-croffle-ref="element$2">Align Bottom</button>
        &nbsp;
        <button data-croffle-ref="element$3">Align Left</button>
        &nbsp;
        <button data-croffle-ref="element$4">Align Right</button>
        &nbsp;
        <button data-croffle-ref="element$5">Align Vertical Center</button>
        &nbsp;
        <button data-croffle-ref="element$6">Align Horizontal Center</button>
        &nbsp;
        <button data-croffle-ref="element$7">Arrange Vertical Spacing</button>
        &nbsp;
        <button data-croffle-ref="element$8">Arrange Horizontal Spacing</button>
        &nbsp;
        <div
            class="target target1"
            style="left: 50px;top: 150px;"
        >Target1</div>
        <div
            class="target target2"
            style="left: 250px;top: 250px;"
        >Target2</div>
        <div
            class="target target3"
            style="left: 400px;top: 300px;"
        >Target3</div>
        <div data-croffle-ref="selecto$0"></div>
    </div>
</div>`})))()}var U;function Le(){return(Le=t((()=>{U=`import Moveable, { DraggableRequestParam } from "moveable";
import Selecto from "selecto";

let moveableRef = null;
let targets = [];
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
const element$2 = document.querySelector(\`[data-croffle-ref="element$2"]\`);
const element$3 = document.querySelector(\`[data-croffle-ref="element$3"]\`);
const element$4 = document.querySelector(\`[data-croffle-ref="element$4"]\`);
const element$5 = document.querySelector(\`[data-croffle-ref="element$5"]\`);
const element$6 = document.querySelector(\`[data-croffle-ref="element$6"]\`);
const element$7 = document.querySelector(\`[data-croffle-ref="element$7"]\`);
const element$8 = document.querySelector(\`[data-croffle-ref="element$8"]\`);
moveableRef = new Moveable(element$0, {
    target: targets,
    draggable: true,
    resizable: true,
    snappable: true,
    snapGridWidth: 50
});
const selecto$0 = new Selecto({
    container: document.querySelector(\`[data-croffle-ref="selecto$0"]\`),
    dragContainer: window,
    selectableTargets: [".target"],
    hitRate: 0,
    selectByClick: true,
    selectFromInside: true,
    toggleContinueSelect: ["shift"],
    ratio: 0
});
function setTargets(nextTargets) {
    targets = nextTargets;
    moveableRef.target = targets;
}
element$1.addEventListener("click", () => {
    const rect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request("draggable", { y: rect.top }, true);
    });
    moveableRef?.updateRect();
});
element$2.addEventListener("click", () => {
    const rect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request("draggable", { y: rect.top + rect.height }, true);
    });
    moveableRef?.updateRect();
});
element$3.addEventListener("click", () => {
    const rect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request("draggable", { x: rect.left }, true);
    });
    moveableRef?.updateRect();
});
element$4.addEventListener("click", () => {
    const rect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach(child => {
        child.request("draggable", { y: rect.left + rect.width }, true);
    });
    moveableRef?.updateRect();
});
element$5.addEventListener("click", () => {
    const rect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach((child, i) => {
        child.request("draggable", {
            y: rect.top + rect.height / 2 - rect.children[i].height / 2
        }, true);
    });
    moveableRef?.updateRect();
});
element$6.addEventListener("click", () => {
    const rect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    if (moveables.length <= 1) {
        return;
    }
    moveables.forEach((child, i) => {
        child.request("draggable", {
            x: rect.left + rect.width / 2 - rect.children[i].width / 2
        }, true);
    });
    moveableRef?.updateRect();
});
element$7.addEventListener("click", () => {
    const groupRect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    let top = groupRect.top;
    if (moveables.length <= 1) {
        return;
    }
    const gap = (groupRect.height - groupRect.children.reduce(
        (prev, cur) => {
            return prev + cur.height;
        },
        0
    )) / (moveables.length - 1);
    moveables.sort((a, b) => {
        return a.state.top - b.state.top;
    });
    moveables.forEach(child => {
        const rect = child.getRect();
        child.request("draggable", { y: top }, true);
        top += rect.height + gap;
    });
    moveableRef?.updateRect();
});
element$8.addEventListener("click", () => {
    const groupRect = moveableRef.getRect();
    const moveables = moveableRef.getMoveables();
    let left = groupRect.left;
    if (moveables.length <= 1) {
        return;
    }
    const gap = (groupRect.width - groupRect.children.reduce(
        (prev, cur) => {
            return prev + cur.width;
        },
        0
    )) / (moveables.length - 1);
    moveables.sort((a, b) => {
        return a.state.left - b.state.left;
    });
    moveables.forEach(child => {
        const rect = child.getRect();
        child.request("draggable", { x: left }, true);
        left += rect.width + gap;
    });
    moveableRef?.updateRect();
});
moveableRef.on("render", e => {
    e.target.style.cssText += e.cssText;
});
moveableRef.on("renderGroup", e => {
    e.events.forEach(ev => {
        ev.target.style.cssText += ev.cssText;
    });
});
selecto$0.on("dragStart", e => {
    const moveable = moveableRef;
    const target = e.inputEvent.target;
    if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
        || targets.some(t => t === target || t.contains(target))
    ) {
        e.stop();
    }
});
selecto$0.on("selectEnd", e => {
    const moveable = moveableRef;
    if (e.isDragStart) {
        e.inputEvent.preventDefault();
        moveable.waitToChangeTarget().then(() => {
            moveable.dragStart(e.inputEvent);
        });
    }
    setTargets(e.selected);
});`})))()}var Re;function ze(){return(ze=t((()=>{Re=`<div class="root">
    <div>
        X:
        <input
            type="number"
            defaultValue="100"
            {...this.requestCallbacks}
            data-croffle-ref="xInputRef"
        ></input>
        &nbsp;
                        Y:
        <input
            type="number"
            defaultValue="150"
            {...this.requestCallbacks}
            data-croffle-ref="yInputRef"
        ></input>
    </div>
    <div
        class="container"
        style={\`transform: \${\`scale(\${this.containerScale})\`};\`}
        data-croffle-ref="element$0"
    >
        <div class="target">Target</div>
    </div>
</div>`})))()}var Be;function Ve(){return(Ve=t((()=>{Be=`import Moveable from "moveable";

const containerScale = "$preview_containerScale";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
let xInputRef = null;
let yInputRef = null;
let moveableRef = null;
let requestCallbacks = (() => {
    function request() {
        moveableRef.request("draggable", {
            x: parseInt(xInputRef.value),
            y: parseInt(yInputRef.value)
        }, true);
    }
    return {
        onInput(e) {
            const ev = (e.nativeEvent || e);
            if (typeof ev.data === "undefined") {
                request();
            }
        },
        onKeyUp(e) {
            e.stopPropagation();
            if (e.keyCode === 13) {
                request();
            }
        }
    };
})();
xInputRef = document.querySelector(\`[data-croffle-ref="xInputRef"]\`);
yInputRef = document.querySelector(\`[data-croffle-ref="yInputRef"]\`);
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    throttleDrag: throttleDrag,
    edgeDraggable: edgeDraggable,
    startDragRotate: startDragRotate,
    throttleDragRotate: throttleDragRotate
});
function setRequestCallbacks(nextRequestCallbacks) {
    requestCallbacks = nextRequestCallbacks;
}
moveableRef.on("drag", e => {
    e.target.style.transform = e.transform;
});
moveableRef.on("dragEnd", e => {
    requestAnimationFrame(() => {
        const rect = e.moveable.getRect();
        xInputRef.value = \`\${rect.left}\`;
        yInputRef.value = \`\${rect.top}\`;
    });
});`})))()}var He;function Ue(){return(Ue=t((()=>{He=`<div class="root">
    <button data-croffle-ref="element$0">Left</button>
    <button data-croffle-ref="element$1">Right</button>
    <div
        class="container"
        data-croffle-ref="element$2"
    >
        <div class="target">Target</div>
    </div>
</div>`})))()}var We;function Ge(){return(Ge=t((()=>{We=`import Moveable, { DraggableRequestParam } from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
const element$2 = document.querySelector(\`[data-croffle-ref="element$2"]\`);
moveableRef = new Moveable(element$2, {
    target: ".target",
    draggable: true,
    snappable: true,
    snapGridWidth: 50
});
element$0.addEventListener("click", () => {
    moveableRef.request("draggable", {
        deltaX: -49,
        deltaY: 0,
        useSnap: true
    }, true);
});
element$1.addEventListener("click", () => {
    moveableRef.request("draggable", {
        deltaX: 49,
        deltaY: 0,
        useSnap: true
    }, true);
});
moveableRef.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var Ke;function qe(){return(qe=t((()=>{Ke=`<div class="root">
    <div>
        width:
        <input
            type="number"
            defaultValue="280"
            data-horizontal="true"
            data-croffle-ref="widthInputRef"/>
        &nbsp;
                    height:
        <input
            type="number"
            defaultValue="230"
            data-horizontal="false"
            data-croffle-ref="heightInputRef"/>
    </div>
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div class="target">Target1</div>
    </div>
</div>`})))()}var Je;function Ye(){return(Ye=t((()=>{Je=`import Moveable from "moveable";

const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
let widthInputRef = null;
let heightInputRef = null;
let moveableRef = null;
const onInput = (e) => {
    const ev = (e.nativeEvent || e);
    if (typeof ev.data === "undefined") {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value)
        }, true);
    }
};
const onKeyUp = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value)
        }, true);
    }
};
widthInputRef = document.querySelector(\`[data-croffle-ref="widthInputRef"]\`);
heightInputRef = document.querySelector(\`[data-croffle-ref="heightInputRef"]\`);
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    resizable: resizable,
    keepRatio: keepRatio,
    throttleResize: throttleResize,
    renderDirections: renderDirections
});
widthInputRef.addEventListener("input", onInput);
widthInputRef.addEventListener("keyUp", onKeyUp);
heightInputRef.addEventListener("input", onInput);
heightInputRef.addEventListener("keyUp", onKeyUp);
moveableRef.on("resize", (e) => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    e.target.style.transform = e.drag.transform;
});
moveableRef.on("resizeEnd", (e) => {
    requestAnimationFrame(() => {
        const rect = e.moveable.getRect();
        widthInputRef.value = \`\${rect.offsetWidth}\`;
        heightInputRef.value = \`\${rect.offsetHeight}\`;
    });
});`})))()}var Xe;function Ze(){return(Ze=t((()=>{Xe=`<div class="root">
    <button data-croffle-ref="element$0">request</button>
    <div class="input"></div>
    <div
        class="container"
        data-croffle-ref="element$1"
    >
        <div
            class="target"
            style="width: 381.609px;height: 119.416px;color: black;margin-top: 20px;margin-left: 20px;border: none;"
        >Target1</div>
    </div>
</div>`})))()}var Qe;function $e(){return($e=t((()=>{Qe=`import Moveable, { ResizableRequestParam } from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
moveableRef = new Moveable(element$1, { target: ".target", resizable: true });
element$0.addEventListener("click", () => {
    moveableRef.request("resizable", { deltaHeight: 12 }, true);
});
moveableRef.on("resize", (e) => {
    e.target.style.width = \`\${e.width}px\`;
    e.target.style.height = \`\${e.height}px\`;
    const input = document.querySelector(".input");
    input.innerHTML = JSON.stringify({
        dist: e.dist,
        width: e.width,
        height: e.height
    });
});`})))()}var et;function tt(){return(tt=t((()=>{et=`<div class="root">
    <div>
        width:
        <input
            type="number"
            defaultValue="280"
            data-horizontal="true"
            data-croffle-ref="widthInputRef"/>
        &nbsp;
                    height:
        <input
            type="number"
            defaultValue="230"
            data-horizontal="false"
            data-croffle-ref="heightInputRef"/>
    </div>
    <div
        class="container"
        data-croffle-ref="element$0"
    >
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
    </div>
</div>`})))()}var nt;function rt(){return(rt=t((()=>{nt=`import Moveable from "moveable";

const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
let widthInputRef = null;
let heightInputRef = null;
let moveableRef = null;
const onInput = (e) => {
    const ev = (e.nativeEvent || e);
    const horizontal = JSON.parse(ev.target.getAttribute("data-horizontal"));
    if (typeof ev.data === "undefined") {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value),
            horizontal
        }, true);
    }
};
const onKeyUp = (e) => {
    const ev = (e.nativeEvent || e);
    const horizontal = JSON.parse(ev.target.getAttribute("data-horizontal"));
    e.stopPropagation();
    if (e.keyCode === 13) {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value),
            horizontal
        }, true);
    }
};
widthInputRef = document.querySelector(\`[data-croffle-ref="widthInputRef"]\`);
heightInputRef = document.querySelector(\`[data-croffle-ref="heightInputRef"]\`);
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
moveableRef = new Moveable(element$0, {
    target: ".target",
    draggable: true,
    resizable: resizable,
    keepRatio: keepRatio,
    throttleResize: throttleResize,
    renderDirections: renderDirections
});
widthInputRef.addEventListener("input", onInput);
widthInputRef.addEventListener("keyUp", onKeyUp);
heightInputRef.addEventListener("input", onInput);
heightInputRef.addEventListener("keyUp", onKeyUp);
moveableRef.on("resizeGroupStart", ({ setMin, setMax }) => {
    setMin([minWidth, minHeight]);
    setMax([maxWidth, maxHeight]);
});
moveableRef.on("resizeGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.width = \`\${ev.boundingWidth}px\`;
        ev.target.style.height = \`\${ev.boundingHeight}px\`;
        ev.target.style.transform = \`translate(\${ev.drag.beforeTranslate[0]}px, \${ev.drag.beforeTranslate[1]}px)\`;
    });
});
moveableRef.on("resizeGroupEnd", (e) => {
    requestAnimationFrame(() => {
        const rect = e.moveable.getRect();
        widthInputRef.value = \`\${rect.offsetWidth}\`;
        heightInputRef.value = \`\${rect.offsetHeight}\`;
    });
});
moveableRef.on("dragGroup", ({ events }) => {
    events.forEach(ev => {
        ev.target.style.transform = ev.transform;
    });
});`})))()}var it;function at(){return(at=t((()=>{it=`<div class="root">
    <button data-croffle-ref="element$0">Left</button>
    <button data-croffle-ref="element$1">Right</button>
    <div
        class="container"
        data-croffle-ref="element$2"
    >
        <div class="target">Target</div>
    </div>
</div>`})))()}var ot;function st(){return(st=t((()=>{ot=`import Moveable, { ResizableRequestParam } from "moveable";

let moveableRef = null;
const element$0 = document.querySelector(\`[data-croffle-ref="element$0"]\`);
const element$1 = document.querySelector(\`[data-croffle-ref="element$1"]\`);
const element$2 = document.querySelector(\`[data-croffle-ref="element$2"]\`);
moveableRef = new Moveable(element$2, {
    target: ".target",
    draggable: true,
    resizable: true,
    snappable: true,
    snapGridWidth: 50
});
element$0.addEventListener("click", () => {
    moveableRef.request("resizable", {
        direction: [1, 0],
        deltaWidth: -49,
        useSnap: true
    }, true);
});
element$1.addEventListener("click", () => {
    moveableRef.request("resizable", {
        direction: [1, 0],
        deltaWidth: 49,
        useSnap: true
    }, true);
});
moveableRef.on("render", e => {
    e.target.style.cssText += e.cssText;
});`})))()}var ct;function lt(){return(lt=t((()=>{ct=`<script>
import Moveable, { DraggableRequestParam } from "svelte-moveable";
import Selecto from "svelte-selecto";

let moveableRef = null;
let targets = [];
<\/script>
<div class="root">
    <div class="container">
        <button on:click={() => {
            const rect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", { y: rect.top }, true);
            });
            moveableRef?.updateRect();
        }}>Align Top</button>
        &nbsp;
        <button on:click={() => {
            const rect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", {
                    y: rect.top + rect.height,
                }, true);
            });
            moveableRef?.updateRect();
        }}>Align Bottom</button>
        &nbsp;
        <button on:click={() => {
            const rect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", { x: rect.left }, true);
            });
            moveableRef?.updateRect();
        }}>Align Left</button>
        &nbsp;
        <button on:click={() => {
            const rect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", {
                    y: rect.left + rect.width,
                }, true);
            });
            moveableRef?.updateRect();
        }}>Align Right</button>
        &nbsp;
        <button on:click={() => {
            const rect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach((child, i) => {
                child.request("draggable", {
                    y: rect.top + rect.height / 2 - rect.children[i].height / 2,
                }, true);
            });
            moveableRef?.updateRect();
        }}>Align Vertical Center</button>
        &nbsp;
        <button on:click={() => {
            const rect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach((child, i) => {
                child.request("draggable", {
                    x: rect.left + rect.width / 2 - rect.children[i].width / 2,
                }, true);
            });
            moveableRef?.updateRect();
        }}>Align Horizontal Center</button>
        &nbsp;
        <button on:click={() => {
            const groupRect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            let top = groupRect.top;
            if (moveables.length <= 1) {
                return;
            }
            const gap = (groupRect.height - groupRect.children.reduce(
                (prev, cur) => {
                    return prev + cur.height;
                },
                0
            )) / (moveables.length - 1);
            moveables.sort((a, b) => {
                return a.state.top - b.state.top;
            });
            moveables.forEach(child => {
                const rect = child.getRect();
                child.request("draggable", { y: top }, true);
                top += rect.height + gap;
            });
            moveableRef?.updateRect();
        }}>Arrange Vertical Spacing</button>
        &nbsp;
        <button on:click={() => {
            const groupRect = moveableRef.getRect();
            const moveables = moveableRef.getMoveables();
            let left = groupRect.left;
            if (moveables.length <= 1) {
                return;
            }
            const gap = (groupRect.width - groupRect.children.reduce(
                (prev, cur) => {
                    return prev + cur.width;
                },
                0
            )) / (moveables.length - 1);
            moveables.sort((a, b) => {
                return a.state.left - b.state.left;
            });
            moveables.forEach(child => {
                const rect = child.getRect();
                child.request("draggable", { x: left }, true);
                left += rect.width + gap;
            });
            moveableRef?.updateRect();
        }}>Arrange Horizontal Spacing</button>
        &nbsp;
        <div
            class="target target1"
            style="left: 50px;top: 150px;"
        >Target1</div>
        <div
            class="target target2"
            style="left: 250px;top: 250px;"
        >Target2</div>
        <div
            class="target target3"
            style="left: 400px;top: 300px;"
        >Target3</div>
        <Moveable
            bind:this={moveableRef}
            target={targets}
            draggable={true}
            resizable={true}
            snappable={true}
            snapGridWidth={50}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}
            on:renderGroup={({ detail: e }) => {
                e.events.forEach(ev => {
                    ev.target.style.cssText += ev.cssText;
                });
            }}/>
        <Selecto
            dragContainer={window}
            selectableTargets={[".target"]}
            hitRate={0}
            selectByClick={true}
            selectFromInside={true}
            toggleContinueSelect={["shift"]}
            ratio={0}
            on:dragStart={({ detail: e }) => {
                const moveable = moveableRef;
                const target = e.inputEvent.target;
                if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
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
    </div>
</div>`})))()}var ut;function dt(){return(dt=t((()=>{ut=`<script>
import Moveable from "svelte-moveable";

const containerScale = "$preview_containerScale";
const throttleDrag = "$preview_throttleDrag";
const edgeDraggable = "$preview_edgeDraggable";
const startDragRotate = "$preview_startDragRotate";
const throttleDragRotate = "$preview_throttleDragRotate";
let xInputRef = null;
let yInputRef = null;
let moveableRef = null;
let requestCallbacks = (() => {
    function request() {
        moveableRef.request("draggable", {
            x: parseInt(xInputRef.value),
            y: parseInt(yInputRef.value)
        }, true);
    }
    return {
        onInput(e) {
            const ev = (e.nativeEvent || e);
            if (typeof ev.data === "undefined") {
                request();
            }
        },
        onKeyUp(e) {
            e.stopPropagation();
            if (e.keyCode === 13) {
                request();
            }
        }
    };
})();
<\/script>
<div class="root">
    <div>
        X:
        <input
            bind:this={xInputRef}
            type="number"
            defaultValue="100"
            {...requestCallbacks}
        ></input>
        &nbsp;
                        Y:
        <input
            bind:this={yInputRef}
            type="number"
            defaultValue="150"
            {...requestCallbacks}
        ></input>
    </div>
    <div
        class="container"
        style={\`transform: \${\`scale(\${containerScale})\`};\`}
    >
        <div class="target">Target</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            draggable={true}
            throttleDrag={throttleDrag}
            edgeDraggable={edgeDraggable}
            startDragRotate={startDragRotate}
            throttleDragRotate={throttleDragRotate}
            on:drag={({ detail: e }) => {
                e.target.style.transform = e.transform;
            }}
            on:dragEnd={({ detail: e }) => {
                requestAnimationFrame(() => {
                    const rect = e.moveable.getRect();
                    xInputRef.value = \`\${rect.left}\`;
                    yInputRef.value = \`\${rect.top}\`;
                });
            }}/>
    </div>
</div>`})))()}var ft;function pt(){return(pt=t((()=>{ft=`<script>
import Moveable, { DraggableRequestParam } from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="root">
    <button on:click={() => {
        moveableRef.request("draggable", {
            deltaX: -49,
            deltaY: 0,
            useSnap: true,
        }, true);
    }}>Left</button>
    <button on:click={() => {
        moveableRef.request("draggable", {
            deltaX: 49,
            deltaY: 0,
            useSnap: true,
        }, true);
    }}>Right</button>
    <div class="container">
        <div class="target">Target</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            draggable={true}
            snappable={true}
            snapGridWidth={50}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var mt;function ht(){return(ht=t((()=>{mt=`<script>
import Moveable from "svelte-moveable";

const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
let widthInputRef = null;
let heightInputRef = null;
let moveableRef = null;
const onInput = (e) => {
    const ev = (e.nativeEvent || e);
    if (typeof ev.data === "undefined") {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value)
        }, true);
    }
};
const onKeyUp = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value)
        }, true);
    }
};
<\/script>
<div class="root">
    <div>
        width:
        <input
            bind:this={widthInputRef}
            type="number"
            defaultValue="280"
            onInput={onInput}
            onKeyUp={onKeyUp}
            data-horizontal="true"/>
        &nbsp;
                    height:
        <input
            bind:this={heightInputRef}
            type="number"
            defaultValue="230"
            onInput={onInput}
            onKeyUp={onKeyUp}
            data-horizontal="false"/>
    </div>
    <div class="container">
        <div class="target">Target1</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            resizable={resizable}
            keepRatio={keepRatio}
            throttleResize={throttleResize}
            renderDirections={renderDirections}
            on:resize={({ detail: e }) => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                e.target.style.transform = e.drag.transform;
            }}
            on:resizeEnd={({ detail: e }) => {
                requestAnimationFrame(() => {
                    const rect = e.moveable.getRect();
                    widthInputRef.value = \`\${rect.offsetWidth}\`;
                    heightInputRef.value = \`\${rect.offsetHeight}\`;
                });
            }}/>
    </div>
</div>`})))()}var gt;function _t(){return(_t=t((()=>{gt=`<script>
import Moveable, { ResizableRequestParam } from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="root">
    <button on:click={() => {
        moveableRef.request("resizable", { deltaHeight: 12 }, true);
    }}>request</button>
    <div class="input"></div>
    <div class="container">
        <div
            class="target"
            style="width: 381.609px;height: 119.416px;color: black;margin-top: 20px;margin-left: 20px;border: none;"
        >Target1</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            resizable={true}
            on:resize={({ detail: e }) => {
                e.target.style.width = \`\${e.width}px\`;
                e.target.style.height = \`\${e.height}px\`;
                const input = document.querySelector(".input");
                input.innerHTML = JSON.stringify({
                    dist: e.dist,
                    width: e.width,
                    height: e.height
                });
            }}/>
    </div>
</div>`})))()}var vt;function yt(){return(yt=t((()=>{vt=`<script>
import Moveable from "svelte-moveable";

const resizable = "$preview_resizable";
const keepRatio = "$preview_keepRatio";
const throttleResize = "$preview_throttleResize";
const renderDirections = "$preview_renderDirections";
const minWidth = "$preview_minWidth";
const minHeight = "$preview_minHeight";
const maxWidth = "$preview_maxWidth";
const maxHeight = "$preview_maxHeight";
let widthInputRef = null;
let heightInputRef = null;
let moveableRef = null;
const onInput = (e) => {
    const ev = (e.nativeEvent || e);
    const horizontal = JSON.parse(ev.target.getAttribute("data-horizontal"));
    if (typeof ev.data === "undefined") {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value),
            horizontal
        }, true);
    }
};
const onKeyUp = (e) => {
    const ev = (e.nativeEvent || e);
    const horizontal = JSON.parse(ev.target.getAttribute("data-horizontal"));
    e.stopPropagation();
    if (e.keyCode === 13) {
        moveableRef.request("resizable", {
            offsetWidth: parseFloat(widthInputRef.value),
            offsetHeight: parseFloat(heightInputRef.value),
            horizontal
        }, true);
    }
};
<\/script>
<div class="root">
    <div>
        width:
        <input
            bind:this={widthInputRef}
            type="number"
            defaultValue="280"
            onInput={onInput}
            onKeyUp={onKeyUp}
            data-horizontal="true"/>
        &nbsp;
                    height:
        <input
            bind:this={heightInputRef}
            type="number"
            defaultValue="230"
            onInput={onInput}
            onKeyUp={onKeyUp}
            data-horizontal="false"/>
    </div>
    <div class="container">
        <div class="target target1">Target1</div>
        <div class="target target2">Target2</div>
        <div class="target target3">Target3</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            draggable={true}
            resizable={resizable}
            keepRatio={keepRatio}
            throttleResize={throttleResize}
            renderDirections={renderDirections}
            on:resizeGroupStart={({ detail: { setMin, setMax } }) => {
                setMin([minWidth, minHeight]);
                setMax([maxWidth, maxHeight]);
            }}
            on:resizeGroup={({ detail: { events } }) => {
                events.forEach(ev => {
                    ev.target.style.width = \`\${ev.boundingWidth}px\`;
                    ev.target.style.height = \`\${ev.boundingHeight}px\`;
                    ev.target.style.transform = \`translate(\${ev.drag.beforeTranslate[0]}px, \${ev.drag.beforeTranslate[1]}px)\`;
                });
            }}
            on:resizeGroupEnd={({ detail: e }) => {
                requestAnimationFrame(() => {
                    const rect = e.moveable.getRect();
                    widthInputRef.value = \`\${rect.offsetWidth}\`;
                    heightInputRef.value = \`\${rect.offsetHeight}\`;
                });
            }}
            on:dragGroup={({ detail: { events } }) => {
                events.forEach(ev => {
                    ev.target.style.transform = ev.transform;
                });
            }}/>
    </div>
</div>`})))()}var bt;function xt(){return(xt=t((()=>{bt=`<script>
import Moveable, { ResizableRequestParam } from "svelte-moveable";

let moveableRef = null;
<\/script>
<div class="root">
    <button on:click={() => {
        moveableRef.request("resizable", {
            direction: [1, 0],
            deltaWidth: -49,
            useSnap: true,
        }, true);
    }}>Left</button>
    <button on:click={() => {
        moveableRef.request("resizable", {
            direction: [1, 0],
            deltaWidth: 49,
            useSnap: true,
        }, true);
    }}>Right</button>
    <div class="container">
        <div class="target">Target</div>
        <Moveable
            bind:this={moveableRef}
            target={".target"}
            draggable={true}
            resizable={true}
            snappable={true}
            snapGridWidth={50}
            on:render={({ detail: e }) => {
                e.target.style.cssText += e.cssText;
            }}/>
    </div>
</div>`})))()}var St;function Ct(){return(Ct=t((()=>{St=`<script>
import Moveable, { DraggableRequestParam } from "vue3-moveable";
import Selecto from "vue3-selecto";
import { ref } from "vue";

export default {
    components: { Moveable, Selecto },
    setup() {
        const moveableRef = ref(null);
        const targets = ref([]);
        const onClick = () => {
            const rect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", { y: rect.top }, true);
            });
            moveableRef.value?.updateRect();
        };
        const onClick$0 = () => {
            const rect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", {
                    y: rect.top + rect.height
                }, true);
            });
            moveableRef.value?.updateRect();
        };
        const onClick$1 = () => {
            const rect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", { x: rect.left }, true);
            });
            moveableRef.value?.updateRect();
        };
        const onClick$2 = () => {
            const rect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach(child => {
                child.request("draggable", {
                    y: rect.left + rect.width
                }, true);
            });
            moveableRef.value?.updateRect();
        };
        const onClick$3 = () => {
            const rect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach((child, i) => {
                child.request("draggable", {
                    y: rect.top + rect.height / 2 - rect.children[i].height / 2
                }, true);
            });
            moveableRef.value?.updateRect();
        };
        const onClick$4 = () => {
            const rect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            if (moveables.length <= 1) {
                return;
            }
            moveables.forEach((child, i) => {
                child.request("draggable", {
                    x: rect.left + rect.width / 2 - rect.children[i].width / 2
                }, true);
            });
            moveableRef.value?.updateRect();
        };
        const onClick$5 = () => {
            const groupRect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            let top = groupRect.top;
            if (moveables.length <= 1) {
                return;
            }
            const gap = (groupRect.height - groupRect.children.reduce(
                (prev, cur) => {
                    return prev + cur.height;
                },
                0
            )) / (moveables.length - 1);
            moveables.sort((a, b) => {
                return a.state.top - b.state.top;
            });
            moveables.forEach(child => {
                const rect = child.getRect();
                child.request("draggable", { y: top }, true);
                top += rect.height + gap;
            });
            moveableRef.value?.updateRect();
        };
        const onClick$6 = () => {
            const groupRect = moveableRef.value.getRect();
            const moveables = moveableRef.value.getMoveables();
            let left = groupRect.left;
            if (moveables.length <= 1) {
                return;
            }
            const gap = (groupRect.width - groupRect.children.reduce(
                (prev, cur) => {
                    return prev + cur.width;
                },
                0
            )) / (moveables.length - 1);
            moveables.sort((a, b) => {
                return a.state.left - b.state.left;
            });
            moveables.forEach(child => {
                const rect = child.getRect();
                child.request("draggable", { x: left }, true);
                left += rect.width + gap;
            });
            moveableRef.value?.updateRect();
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        const onRenderGroup = e => {
            e.events.forEach(ev => {
                ev.target.style.cssText += ev.cssText;
            });
        };
        const onDragStart = e => {
            const moveable = moveableRef.value;
            const target = e.inputEvent.target;
            if (target.tagName === "BUTTON" || moveable.isMoveableElement(target)
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
            onClick,
            onClick$0,
            onClick$1,
            onClick$2,
            onClick$3,
            onClick$4,
            onClick$5,
            onClick$6,
            moveableRef,
            targets,
            onRender,
            onRenderGroup,
            window,
            onDragStart,
            onSelectEnd
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div class="container">
            <button @click="onClick">Align Top</button>
            &nbsp;
            <button @click="onClick$0">Align Bottom</button>
            &nbsp;
            <button @click="onClick$1">Align Left</button>
            &nbsp;
            <button @click="onClick$2">Align Right</button>
            &nbsp;
            <button @click="onClick$3">Align Vertical Center</button>
            &nbsp;
            <button @click="onClick$4">Align Horizontal Center</button>
            &nbsp;
            <button @click="onClick$5">Arrange Vertical Spacing</button>
            &nbsp;
            <button @click="onClick$6">Arrange Horizontal Spacing</button>
            &nbsp;
            <div
                class="target target1"
                style="left: 50px;top: 150px;"
            >Target1</div>
            <div
                class="target target2"
                style="left: 250px;top: 250px;"
            >Target2</div>
            <div
                class="target target3"
                style="left: 400px;top: 300px;"
            >Target3</div>
            <Moveable
                ref="moveableRef"
                :target="targets"
                :draggable="true"
                :resizable="true"
                :snappable="true"
                :snapGridWidth="50"
                @render="onRender"
                @renderGroup="onRenderGroup"/>
            <Selecto
                :dragContainer="window"
                :selectableTargets="['.target']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="true"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="onDragStart"
                @selectEnd="onSelectEnd"
            ></Selecto>
        </div>
    </div>
</template>`})))()}var wt;function Tt(){return(Tt=t((()=>{wt=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const containerScale = "$preview_containerScale";
        const throttleDrag = "$preview_throttleDrag";
        const edgeDraggable = "$preview_edgeDraggable";
        const startDragRotate = "$preview_startDragRotate";
        const throttleDragRotate = "$preview_throttleDragRotate";
        const xInputRef = ref(null);
        const yInputRef = ref(null);
        const moveableRef = ref(null);
        const requestCallbacks = ref((() => {
            function request() {
                moveableRef.value.request("draggable", {
                    x: parseInt(xInputRef.value.value),
                    y: parseInt(yInputRef.value.value)
                }, true);
            }
            return {
                onInput(e) {
                    const ev = (e.nativeEvent || e);
                    if (typeof ev.data === "undefined") {
                        request();
                    }
                },
                onKeyUp(e) {
                    e.stopPropagation();
                    if (e.keyCode === 13) {
                        request();
                    }
                }
            };
        })());
        const onDrag = e => {
            e.target.style.transform = e.transform;
        };
        const onDragEnd = e => {
            requestAnimationFrame(() => {
                const rect = e.moveable.getRect();
                xInputRef.value.value = \`\${rect.left}\`;
                yInputRef.value.value = \`\${rect.top}\`;
            });
        };
        return {
            xInputRef,
            requestCallbacks,
            yInputRef,
            containerScale,
            moveableRef,
            throttleDrag,
            edgeDraggable,
            startDragRotate,
            throttleDragRotate,
            onDrag,
            onDragEnd
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div>
            X:
            <input
                ref="xInputRef"
                type="number"
                defaultValue="100"
                {...requestCallbacks}
            ></input>
            &nbsp;
                            Y:
            <input
                ref="yInputRef"
                type="number"
                defaultValue="150"
                {...requestCallbacks}
            ></input>
        </div>
        <div
            class="container"
            :style="\`transform: \${\`scale(\${containerScale})\`};\`"
        >
            <div class="target">Target</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :draggable="true"
                :throttleDrag="throttleDrag"
                :edgeDraggable="edgeDraggable"
                :startDragRotate="startDragRotate"
                :throttleDragRotate="throttleDragRotate"
                @drag="onDrag"
                @dragEnd="onDragEnd"/>
        </div>
    </div>
</template>`})))()}var Et;function Dt(){return(Dt=t((()=>{Et=`<script>
import Moveable, { DraggableRequestParam } from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onClick = () => {
            moveableRef.value.request("draggable", {
                deltaX: -49,
                deltaY: 0,
                useSnap: true
            }, true);
        };
        const onClick$0 = () => {
            moveableRef.value.request("draggable", {
                deltaX: 49,
                deltaY: 0,
                useSnap: true
            }, true);
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onClick, onClick$0, moveableRef, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <button @click="onClick">Left</button>
        <button @click="onClick$0">Right</button>
        <div class="container">
            <div class="target">Target</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :draggable="true"
                :snappable="true"
                :snapGridWidth="50"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var Ot;function kt(){return(kt=t((()=>{Ot=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const resizable = "$preview_resizable";
        const keepRatio = "$preview_keepRatio";
        const throttleResize = "$preview_throttleResize";
        const renderDirections = "$preview_renderDirections";
        const widthInputRef = ref(null);
        const heightInputRef = ref(null);
        const moveableRef = ref(null);
        const onInput = (e) => {
            const ev = (e.nativeEvent || e);
            if (typeof ev.data === "undefined") {
                moveableRef.value.request("resizable", {
                    offsetWidth: parseFloat(widthInputRef.value.value),
                    offsetHeight: parseFloat(heightInputRef.value.value)
                }, true);
            }
        };
        const onKeyUp = (e) => {
            e.stopPropagation();
            if (e.keyCode === 13) {
                moveableRef.value.request("resizable", {
                    offsetWidth: parseFloat(widthInputRef.value.value),
                    offsetHeight: parseFloat(heightInputRef.value.value)
                }, true);
            }
        };
        const onResize = (e) => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            e.target.style.transform = e.drag.transform;
        };
        const onResizeEnd = (e) => {
            requestAnimationFrame(() => {
                const rect = e.moveable.getRect();
                widthInputRef.value.value = \`\${rect.offsetWidth}\`;
                heightInputRef.value.value = \`\${rect.offsetHeight}\`;
            });
        };
        return {
            widthInputRef,
            onInput,
            onKeyUp,
            heightInputRef,
            moveableRef,
            resizable,
            keepRatio,
            throttleResize,
            renderDirections,
            onResize,
            onResizeEnd
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div>
            width:
            <input
                ref="widthInputRef"
                type="number"
                defaultValue="280"
                @input="onInput"
                @keyUp="onKeyUp"
                data-horizontal="true"/>
            &nbsp;
                        height:
            <input
                ref="heightInputRef"
                type="number"
                defaultValue="230"
                @input="onInput"
                @keyUp="onKeyUp"
                data-horizontal="false"/>
        </div>
        <div class="container">
            <div class="target">Target1</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :resizable="resizable"
                :keepRatio="keepRatio"
                :throttleResize="throttleResize"
                :renderDirections="renderDirections"
                @resize="onResize"
                @resizeEnd="onResizeEnd"/>
        </div>
    </div>
</template>`})))()}var At;function jt(){return(jt=t((()=>{At=`<script>
import Moveable, { ResizableRequestParam } from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onClick = () => {
            moveableRef.value.request("resizable", { deltaHeight: 12 }, true);
        };
        const onResize = (e) => {
            e.target.style.width = \`\${e.width}px\`;
            e.target.style.height = \`\${e.height}px\`;
            const input = document.querySelector(".input");
            input.innerHTML = JSON.stringify({
                dist: e.dist,
                width: e.width,
                height: e.height
            });
        };
        return { onClick, moveableRef, onResize };
    }
};
<\/script>
<template>
    <div class="root">
        <button @click="onClick">request</button>
        <div class="input"></div>
        <div class="container">
            <div
                class="target"
                style="width: 381.609px;height: 119.416px;color: black;margin-top: 20px;margin-left: 20px;border: none;"
            >Target1</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :resizable="true"
                @resize="onResize"/>
        </div>
    </div>
</template>`})))()}var Mt;function Nt(){return(Nt=t((()=>{Mt=`<script>
import Moveable from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const resizable = "$preview_resizable";
        const keepRatio = "$preview_keepRatio";
        const throttleResize = "$preview_throttleResize";
        const renderDirections = "$preview_renderDirections";
        const minWidth = "$preview_minWidth";
        const minHeight = "$preview_minHeight";
        const maxWidth = "$preview_maxWidth";
        const maxHeight = "$preview_maxHeight";
        const widthInputRef = ref(null);
        const heightInputRef = ref(null);
        const moveableRef = ref(null);
        const onInput = (e) => {
            const ev = (e.nativeEvent || e);
            const horizontal = JSON.parse(ev.target.getAttribute("data-horizontal"));
            if (typeof ev.data === "undefined") {
                moveableRef.value.request("resizable", {
                    offsetWidth: parseFloat(widthInputRef.value.value),
                    offsetHeight: parseFloat(heightInputRef.value.value),
                    horizontal
                }, true);
            }
        };
        const onKeyUp = (e) => {
            const ev = (e.nativeEvent || e);
            const horizontal = JSON.parse(ev.target.getAttribute("data-horizontal"));
            e.stopPropagation();
            if (e.keyCode === 13) {
                moveableRef.value.request("resizable", {
                    offsetWidth: parseFloat(widthInputRef.value.value),
                    offsetHeight: parseFloat(heightInputRef.value.value),
                    horizontal
                }, true);
            }
        };
        const onResizeGroupStart = ({ setMin, setMax }) => {
            setMin([minWidth, minHeight]);
            setMax([maxWidth, maxHeight]);
        };
        const onResizeGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.width = \`\${ev.boundingWidth}px\`;
                ev.target.style.height = \`\${ev.boundingHeight}px\`;
                ev.target.style.transform = \`translate(\${ev.drag.beforeTranslate[0]}px, \${ev.drag.beforeTranslate[1]}px)\`;
            });
        };
        const onResizeGroupEnd = (e) => {
            requestAnimationFrame(() => {
                const rect = e.moveable.getRect();
                widthInputRef.value.value = \`\${rect.offsetWidth}\`;
                heightInputRef.value.value = \`\${rect.offsetHeight}\`;
            });
        };
        const onDragGroup = ({ events }) => {
            events.forEach(ev => {
                ev.target.style.transform = ev.transform;
            });
        };
        return {
            widthInputRef,
            onInput,
            onKeyUp,
            heightInputRef,
            moveableRef,
            resizable,
            keepRatio,
            throttleResize,
            renderDirections,
            onResizeGroupStart,
            onResizeGroup,
            onResizeGroupEnd,
            onDragGroup
        };
    }
};
<\/script>
<template>
    <div class="root">
        <div>
            width:
            <input
                ref="widthInputRef"
                type="number"
                defaultValue="280"
                @input="onInput"
                @keyUp="onKeyUp"
                data-horizontal="true"/>
            &nbsp;
                        height:
            <input
                ref="heightInputRef"
                type="number"
                defaultValue="230"
                @input="onInput"
                @keyUp="onKeyUp"
                data-horizontal="false"/>
        </div>
        <div class="container">
            <div class="target target1">Target1</div>
            <div class="target target2">Target2</div>
            <div class="target target3">Target3</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :draggable="true"
                :resizable="resizable"
                :keepRatio="keepRatio"
                :throttleResize="throttleResize"
                :renderDirections="renderDirections"
                @resizeGroupStart="onResizeGroupStart"
                @resizeGroup="onResizeGroup"
                @resizeGroupEnd="onResizeGroupEnd"
                @dragGroup="onDragGroup"/>
        </div>
    </div>
</template>`})))()}var Pt;function Ft(){return(Ft=t((()=>{Pt=`<script>
import Moveable, { ResizableRequestParam } from "vue3-moveable";
import { ref } from "vue";

export default {
    components: { Moveable },
    setup() {
        const moveableRef = ref(null);
        const onClick = () => {
            moveableRef.value.request("resizable", {
                direction: [1, 0],
                deltaWidth: -49,
                useSnap: true
            }, true);
        };
        const onClick$0 = () => {
            moveableRef.value.request("resizable", {
                direction: [1, 0],
                deltaWidth: 49,
                useSnap: true
            }, true);
        };
        const onRender = e => {
            e.target.style.cssText += e.cssText;
        };
        return { onClick, onClick$0, moveableRef, onRender };
    }
};
<\/script>
<template>
    <div class="root">
        <button @click="onClick">Left</button>
        <button @click="onClick$0">Right</button>
        <div class="container">
            <div class="target">Target</div>
            <Moveable
                ref="moveableRef"
                :target="'.target'"
                :draggable="true"
                :resizable="true"
                :snappable="true"
                :snapGridWidth="50"
                @render="onRender"/>
        </div>
    </div>
</template>`})))()}var W,G,It,K,q,J,Y,X,Z,Q,Lt;function $(){return($=t((()=>{p(),ce(),fe(),y(),C(),D(),j(),N(),F(),L(),z(),V(),ve(),be(),Se(),we(),Ee(),Oe(),Ae(),Me(),Pe(),Ie(),Le(),ze(),Ve(),Ue(),Ge(),qe(),Ye(),Ze(),$e(),tt(),rt(),at(),st(),lt(),dt(),pt(),ht(),_t(),yt(),xt(),Ct(),Tt(),Dt(),kt(),jt(),Nt(),Ft(),ee(),te(),W=Object.assign({"./ReactAlignApp.tsx":ae,"./ReactDraggableApp.tsx":oe,"./ReactDraggableSnappableApp.tsx":le,"./ReactResizableApp.tsx":pe,"./ReactResizableDeltaApp.tsx":he,"./ReactResizableGroupApp.tsx":ge,"./ReactResizableSnappableApp.tsx":_e}),G=Object.assign({"./ReactAlignApp.tsx":M,"./ReactDraggableApp.tsx":P,"./ReactDraggableSnappableApp.tsx":I,"./ReactResizableApp.tsx":R,"./ReactResizableDeltaApp.tsx":B,"./ReactResizableGroupApp.tsx":H,"./ReactResizableSnappableApp.tsx":ye,"./lit/ReactAlignApp/App.ts":xe,"./lit/ReactDraggableApp/App.ts":Ce,"./lit/ReactDraggableSnappableApp/App.ts":Te,"./lit/ReactResizableApp/App.ts":De,"./lit/ReactResizableDeltaApp/App.ts":ke,"./lit/ReactResizableGroupApp/App.ts":je,"./lit/ReactResizableSnappableApp/App.ts":Ne,"./script/ReactAlignApp/App.html":Fe,"./script/ReactAlignApp/App.js":U,"./script/ReactDraggableApp/App.html":Re,"./script/ReactDraggableApp/App.js":Be,"./script/ReactDraggableSnappableApp/App.html":He,"./script/ReactDraggableSnappableApp/App.js":We,"./script/ReactResizableApp/App.html":Ke,"./script/ReactResizableApp/App.js":Je,"./script/ReactResizableDeltaApp/App.html":Xe,"./script/ReactResizableDeltaApp/App.js":Qe,"./script/ReactResizableGroupApp/App.html":et,"./script/ReactResizableGroupApp/App.js":nt,"./script/ReactResizableSnappableApp/App.html":it,"./script/ReactResizableSnappableApp/App.js":ot,"./svelte/ReactAlignApp/App.svelte":ct,"./svelte/ReactDraggableApp/App.svelte":ut,"./svelte/ReactDraggableSnappableApp/App.svelte":ft,"./svelte/ReactResizableApp/App.svelte":mt,"./svelte/ReactResizableDeltaApp/App.svelte":gt,"./svelte/ReactResizableGroupApp/App.svelte":vt,"./svelte/ReactResizableSnappableApp/App.svelte":bt,"./vue3/ReactAlignApp/App.vue":St,"./vue3/ReactDraggableApp/App.vue":wt,"./vue3/ReactDraggableSnappableApp/App.vue":Et,"./vue3/ReactResizableApp/App.vue":Ot,"./vue3/ReactResizableDeltaApp/App.vue":At,"./vue3/ReactResizableGroupApp/App.vue":Mt,"./vue3/ReactResizableSnappableApp/App.vue":Pt}),It={title:`Request ables through a method`},K={name:`Draggable`,...c(se,{apps:W,sources:G,argTypes:{containerScale:a({type:`number`,description:`<a href="#" target="_blank">Container's scale</a>`,defaultValue:1}),...ne}})},q={name:`Resizable`,...c(me,{apps:W,sources:G,argTypes:{...l}})},J={name:`Resizable Delta`,...c(b,{apps:W,sources:G,argTypes:{...l}})},Y={name:`Resizable Group`,...c(w,{apps:W,sources:G,argTypes:{...l}})},X={name:`Draggable With Snappable`,...c(ue,{apps:W,sources:G})},Z={name:`Resizable With Snappable`,...c(O,{apps:W,sources:G})},Q={name:`Align`,...c(u,{apps:W,sources:G})},Lt=[`RequestDraggable`,`RequestResizable`,`RequestResizableDelta`,`RequestResizableGroup`,`RequestDraggableSnappable`,`RequestResizableSnappable`,`RequestDraggableAlign`],K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: "Draggable",
  ...appStory(ReactDraggableApp, {
    apps,
    sources,
    argTypes: {
      containerScale: makeArgType({
        type: "number",
        description: \`<a href="#" target="_blank">Container's scale</a>\`,
        defaultValue: 1
      }),
      ...DEFAULT_DRAGGABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: "Resizable",
  ...appStory(ReactResizableApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_RESIZABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: "Resizable Delta",
  ...appStory(ReactResizableDeltaApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_RESIZABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: "Resizable Group",
  ...appStory(ReactResizableGroupApp, {
    apps,
    sources,
    argTypes: {
      ...DEFAULT_RESIZABLE_CONTROLS
    }
  })
} satisfies StoryObj`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: "Draggable With Snappable",
  ...appStory(ReactDraggableSnappableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: "Resizable With Snappable",
  ...appStory(ReactResizableSnappableApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: "Align",
  ...appStory(ReactAlignApp, {
    apps,
    sources
  })
} satisfies StoryObj`,...Q.parameters?.docs?.source}}}})))()}$();export{K as RequestDraggable,Q as RequestDraggableAlign,X as RequestDraggableSnappable,q as RequestResizable,J as RequestResizableDelta,Y as RequestResizableGroup,Z as RequestResizableSnappable,Lt as __namedExportsOrder,It as default};