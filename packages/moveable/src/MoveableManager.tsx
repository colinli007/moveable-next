import { ref, Properties } from "framework-utils";
import * as React from "react";
import { render, createPortal } from "croact";
import InnerMoveable from "./InnerMoveable";
import {
    MoveableInterface,
    MoveableOptions, MoveableProperties,
} from "@moveable-next/react/types";
import { camelize, getDocument, isArray } from "@daybrush/utils";
import { MoveableEventsParameters } from "./types";
import { PROPERTIES, EVENTS, METHODS } from "./consts";
import EventEmitter from "@scena/event-emitter";
@Properties(METHODS, (prototype, property) => {
    if (prototype[property]) {
        return;
    }
    prototype[property] = function(...args: any[]) {
        const self = this.getMoveable();

        if (!self || !self[property]) {
            return;
        }
        return self[property](...args);
    };
})
@Properties(PROPERTIES, (prototype, property) => {
    Object.defineProperty(prototype, property, {
        get() {
            return this.getMoveable().props[property];
        },
        set(value) {
            this.setState({
                [property]: value,
            });
        },
        enumerable: true,
        configurable: true,
    });
})
class MoveableManager extends EventEmitter<MoveableEventsParameters> {
    private innerMoveable!: InnerMoveable | null;
    private root: HTMLElement | null = null;
    /**
     *
     */
    constructor(parentElement: HTMLElement, options: MoveableOptions = {}) {
        super();
        const nextOptions = { ...options };

        const events: any = {};

        EVENTS.forEach(name => {
            events[camelize(`on ${name}`)] = (e: any) => this.trigger<any>(name, e);
        });
        // croact owns `root`, which is never attached, and portals the control box into `parentElement`.
        // The box stays a child of `parentElement`, and croact removes the boxes it replaces (a target, a group)
        // and the last one on destroy: its self mode (`renderSelf`) leaves them in the DOM.
        const root = getDocument(parentElement).createElement("div");

        render(
            createPortal(
                <InnerMoveable
                    ref={ref(this, "innerMoveable")}
                    {...nextOptions}
                    {...events}
                />,
                parentElement,
            ),
            root,
        );
        this.root = root;
        const target = nextOptions.target!;
        if (isArray(target) && target.length > 1) {
            this.updateRect();
        }
    }
    /**
     * Sets several options at once. `callback` is called after the change is applied.
     */
    public setState(state: Partial<MoveableOptions>, callback?: () => any) {
        this.innerMoveable!.setState(state, callback);
    }
    /**
     * Renders Moveable again. `callback` is called after rendering.
     */
    public forceUpdate(callback?: () => any) {
        this.innerMoveable!.forceUpdate(callback);
    }
    /** {@inheritDoc MoveableInterface.dragStart} */
    public dragStart(e: MouseEvent | TouchEvent, target: EventTarget | null = e.target) {
        const innerMoveable = this.innerMoveable;
        if ((innerMoveable as any).$_timer) {
            this.forceUpdate();
        }
        this.getMoveable().dragStart(e, target);
    }
    /** {@inheritDoc MoveableInterface.destroy} */
    public destroy() {
        render(null, this.root!);

        this.off();
        this.root = null;
        this.innerMoveable = null;
    }
    private getMoveable() {
        return this.innerMoveable!.moveable;
    }
}

interface MoveableManager extends MoveableInterface, MoveableProperties {
}

export default MoveableManager;
