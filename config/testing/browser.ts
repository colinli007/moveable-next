// DOM helpers shared by the framework wrappers' browser tests. Cleanup stays in each test file.

// A 200×100 target absolutely positioned at (50, 50), appended to the body.
export function createTarget() {
    const target = document.createElement("div");

    target.style.cssText = "position: absolute; left: 50px; top: 50px; width: 200px; height: 100px;";
    document.body.appendChild(target);
    return target;
}

export function mouse(type: string, x: number, y: number) {
    return new MouseEvent(type, {
        buttons: 1,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        bubbles: true,
        cancelable: true,
    });
}

export function drag(target: HTMLElement, [distX, distY]: number[]) {
    const { left, top } = target.getBoundingClientRect();
    const [x, y] = [left + 10, top + 10];

    target.dispatchEvent(mouse("mousedown", x, y));
    target.dispatchEvent(mouse("mousemove", x + distX, y + distY));
    target.dispatchEvent(mouse("mouseup", x + distX, y + distY));
}
