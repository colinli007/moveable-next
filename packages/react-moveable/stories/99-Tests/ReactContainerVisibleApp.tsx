import * as React from "react";
import Moveable from "@/react-moveable";

export default function App() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    // Moveable is rendered once the container exists: its first render already has the targets and the container.
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

    React.useEffect(() => {
        setContainer(containerRef.current);
    }, []);
    return (
        <div className="root">
            <div className="container" ref={containerRef}>
                <div className="target target1" style={{ left: "0px", top: "0px" }}>Target1</div>
                <div className="target target2" style={{ left: "150px", top: "0px" }}>Target2</div>
                <div className="target target3" style={{ left: "300px", top: "0px" }}>Target3</div>
                {container && <>
                    <Moveable
                        target={container.querySelector<HTMLElement>(".target1")}
                        container={container}
                        draggable={true}
                    />
                    <Moveable
                        target={Array.from(container.querySelectorAll<HTMLElement>(".target2, .target3"))}
                        container={container}
                        individualGroupable={true}
                        draggable={true}
                    />
                </>}
            </div>
        </div>
    );
}
