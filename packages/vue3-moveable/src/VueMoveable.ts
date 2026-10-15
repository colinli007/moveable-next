import VanillaMoveable, {
    MoveableOptions,
    EVENTS,
    PROPERTIES,
    METHODS,
    MoveableProperties,
    MoveableInterface,
    MoveableEvents,
} from "moveable";
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
    watch,
    render() {
        return h("div", { ref: "moveableElement" });
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
            warpSelf: true,
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
