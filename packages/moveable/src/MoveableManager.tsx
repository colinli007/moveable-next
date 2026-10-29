import { ref, Properties } from "framework-utils";
import * as React from "react";
import { render, createPortal } from "croact";
import { makeMoveable, type InitialMoveable } from "@moveable-next/react";
import InnerMoveable from "./InnerMoveable";
import {
    Able,
    MoveableInterface,
    MoveableOptions, MoveableProperties,
} from "@moveable-next/react/types";
import { camelize, getDocument, isArray, pushSet } from "@daybrush/utils";
import { MoveableEventsParameters } from "./types";
import { METHODS } from "./consts";
import EventEmitter from "@scena/event-emitter";

// Only used by private members, which the declarations leave untyped:
// the inner React Moveable would bring in React's types.
interface AbleInfo {
    props: string[];
    events: string[];
    moveableClass: typeof InitialMoveable;
}

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
class MoveableManager extends EventEmitter<MoveableEventsParameters> {
    /**
     * The ables of this class.
     * @private
     */
    protected static get ables(): readonly Able<any>[] {
        return [];
    }
    private static ableInfo?: AbleInfo;
    /**
     * Names of the options and events of this class, from its ables.
     * @private
     */
    public static getAbleInfo(): { props: string[]; events: string[] } {
        return this.prepareAbles();
    }
    /**
     * On the first call for the class that declares `ables`, makes the inner React Moveable of its ables
     * and defines the options as properties of its prototype. This happens on the first instance, not when
     * the module is loaded, so that the ables of a class that is never used can be tree-shaken.
     * Its subclasses share them through the prototype chain, like the module-level decorator did before:
     * accessors that a subclass defines itself are not overwritten.
     */
    private static prepareAbles(): AbleInfo {
        if (!Object.hasOwn(this, "ables")) {
            return (Object.getPrototypeOf(this) as typeof MoveableManager).prepareAbles();
        }
        if (Object.hasOwn(this, "ableInfo")) {
            return this.ableInfo!;
        }
        const moveableClass = makeMoveable(this.ables as Able<any>[]);
        const props: string[] = [];
        const events: string[] = [];

        moveableClass.getAllAbles().forEach(able => {
            (able.props as string[] | undefined)?.forEach(name => pushSet(props, name));
            (able.events as string[] | undefined)?.forEach(name => pushSet(events, name));
        });
        props.forEach(property => {
            Object.defineProperty(this.prototype, property, {
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
        });
        this.ableInfo = { props, events, moveableClass };
        return this.ableInfo;
    }
    private innerMoveable!: InnerMoveable | null;
    private root: HTMLElement | null = null;
    /**
     *
     */
    constructor(parentElement: HTMLElement, options: MoveableOptions = {}) {
        super();
        const { events: eventNames, moveableClass } = (this.constructor as typeof MoveableManager).prepareAbles();
        const nextOptions = { ...options };

        const events: any = {};

        eventNames.forEach(name => {
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
                    moveableClass={moveableClass}
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
