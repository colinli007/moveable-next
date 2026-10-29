import VanillaMoveable, {
    makeMoveable as makeVanillaMoveable,
    Able,
    MadeMoveableProps,
    MoveableEventsOf,
    MoveableOptions,
    MoveableOptionsOf,
    METHODS,
    MoveableProperties,
    MoveableInterface,
    MoveableEvents,
} from "@moveable-next/vanilla";
import { defineComponent, h, type DefineComponent } from "vue";
import { isUndefined } from "@daybrush/utils";

// props, methods and emits are generated at runtime from the options, METHODS and events of the vanilla class,
// so the type is declared, not inferred.
type VueMoveableComponent<Props, Events> = DefineComponent<
    Props,
    {},
    {},
    {},
    { [key in keyof MoveableInterface]: MoveableInterface[key] },
    {},
    {},
    { [key in keyof Events]: (e: Events[key]) => void }
>;

// The control box is rendered in the root element, which has no box (`display: contents`): unless one is set,
// moveable computes positions in the parent of the component, as if it were created in that parent.
function getContainer(component: any, container: MoveableOptions["container"]) {
    return container ?? component.$refs.moveableElement.parentElement;
}

// The component of a vanilla Moveable class, with its options as props and its events as emits.
function defineMoveable(MoveableClass: typeof VanillaMoveable) {
    const { props: PROPERTIES, events: EVENTS } = MoveableClass.getAbleInfo();
    const methods: Record<string, any> = {};

    METHODS.forEach((name) => {
        methods[name] = function (this: any, ...args: any[]) {
            return this.$_moveable[name](...args);
        };
    });
    const watch: Record<string, any> = {};

    PROPERTIES.forEach((name) => {
        watch[name] = function (this: any, value: any) {
            this.$_moveable[name] = value;
        };
    });
    watch.container = function (this: any, value: MoveableOptions["container"]) {
        this.$_moveable.container = getContainer(this, value);
    };

    return defineComponent({
        name: "moveable",
        methods,
        props: PROPERTIES,
        // Declared so that listeners such as `@click` or `@drag` don't also fall through to the root element as native listeners.
        emits: EVENTS,
        watch,
        render() {
            return h("div", { ref: "moveableElement", style: { display: "contents" } });
        },
        mounted(this: any) {
            const options: Partial<MoveableOptions> = {};
            const props = this.$props;
            PROPERTIES.forEach((name) => {
                const value = props[name];

                if (!isUndefined(value)) {
                    (options as any)[name] = props[name];
                }
            });
            const refs = this.$refs;
            const moveableElement = refs.moveableElement;

            const moveable = new MoveableClass(moveableElement, {
                ...options,
                container: getContainer(this, options.container),
            });

            EVENTS.forEach((name) => {
                moveable.on(name as any, (e: any) => {
                    this.$emit(name, { ...e });
                });
            });
            this.$_moveable = moveable;
        },
        beforeUnmount(this: any) {
            this.$_moveable.destroy();
        },
    } as any);
}

/**
 * Makes a Moveable component with only the given ables (and those every Moveable has), so that
 * bundlers can leave the other ables out. The component is used like the default one.
 *
 * @param ables - the ables, such as `Draggable` and `Resizable`
 * @returns the component; `T` is the props of the ables, which type its props and events
 * @example
 * import { makeMoveable, Draggable, Resizable, DraggableProps, ResizableProps } from "@moveable-next/vue3";
 *
 * const DragResize = makeMoveable<DraggableProps & ResizableProps>([Draggable, Resizable]);
 */
export function makeMoveable<T extends Record<string, any> = {}>(
    ables: Array<Able<T>>,
): VueMoveableComponent<MoveableOptionsOf<MadeMoveableProps<T>>, MoveableEventsOf<MadeMoveableProps<T>>> {
    // Only its options and events differ from the default class, and they are read at runtime.
    return defineMoveable(makeVanillaMoveable(ables) as unknown as typeof VanillaMoveable) as any;
}

const VueMoveable = /*#__PURE__*/ defineMoveable(VanillaMoveable) as VueMoveableComponent<
    Partial<MoveableProperties>,
    MoveableEvents
>;

interface VueMoveable extends Partial<MoveableProperties>, MoveableInterface {
}

export default VueMoveable;
