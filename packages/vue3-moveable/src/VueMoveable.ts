import VanillaMoveable, {
    MoveableOptions,
    EVENTS,
    PROPERTIES,
    METHODS,
    MoveableProperties,
    MoveableInterface,
    MoveableEvents,
} from "@moveable-next/vanilla";
import { defineComponent, h, type DefineComponent } from "vue";
import { isUndefined } from "@daybrush/utils";

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

// The control box is rendered in the root element, which has no box (`display: contents`): unless one is set,
// moveable computes positions in the parent of the component, as if it were created in that parent.
function getContainer(component: any, container: MoveableOptions["container"]) {
    return container ?? component.$refs.moveableElement.parentElement;
}
watch.container = function (this: any, value: MoveableOptions["container"]) {
    this.$_moveable.container = getContainer(this, value);
};

// props, methods and emits are generated at runtime from PROPERTIES / METHODS / EVENTS, so the type is declared, not inferred.
type VueMoveableComponent = DefineComponent<
    Partial<MoveableProperties>,
    {},
    {},
    {},
    { [key in keyof MoveableInterface]: MoveableInterface[key] },
    {},
    {},
    { [key in keyof MoveableEvents]: (e: MoveableEvents[key]) => void }
>;

const VueMoveable = defineComponent({
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

        const moveable = new VanillaMoveable(moveableElement, {
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
} as any) as VueMoveableComponent;

interface VueMoveable extends Partial<MoveableProperties>, MoveableInterface {
}

export default VueMoveable;
