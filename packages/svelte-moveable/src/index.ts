import type { Component, ComponentProps } from "svelte";
import { METHODS, type MoveableInterface } from "moveable";
import InnerMoveable from "./Moveable.svelte";

type Exports = ReturnType<typeof InnerMoveable> & MoveableInterface;

// Svelte 5 components are functions: moveable's methods are added to the object the component
// returns, which is what `bind:this` and `mount()` give.
const SvelteMoveable = ((internals, props) => {
    const exports = InnerMoveable(internals, props) as Exports;

    // Server rendering returns no component instance.
    if (!exports) {
        return exports;
    }
    void METHODS;
    return exports;
}) as Component<ComponentProps<typeof InnerMoveable>, Exports>;

export default SvelteMoveable;
export * from "moveable";
