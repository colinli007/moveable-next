<script setup lang="ts">
import { deepFlat } from "@daybrush/utils";
import { onBeforeUnmount, onMounted, ref, shallowRef, useTemplateRef } from "vue";
import KeyController from "keycon";
import Selecto from "vue3-selecto";
import Moveable, { type MoveableTargetGroupsType } from "@/vue3-moveable";
import { GroupManager, type TargetList } from "@moveable-next/helper";

const isCommand = ref(false);
const isShift = ref(false);
const keycon = new KeyController(window);
const groupManager = shallowRef<GroupManager>();
const targets = shallowRef<MoveableTargetGroupsType>([]);
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
const selecto = useTemplateRef<Selecto>("selecto");
const dragContainer = window;
const cubes: number[] = [];

for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
keycon.keydown("meta", () => {
    isCommand.value = true;
});
keycon.keyup("meta", () => {
    isCommand.value = false;
});
keycon.keydown("shift", () => {
    isShift.value = true;
});
keycon.keyup("shift", () => {
    isShift.value = false;
});
keycon.on("blur", () => {
    isCommand.value = false;
    isShift.value = false;
});
function setSelectedTargets(nextTargetes: MoveableTargetGroupsType) {
    selecto.value!.setSelectedTargets(deepFlat(nextTargetes));
    targets.value = nextTargetes;
}
onMounted(() => {
    // [[0, 1], 2], 3, 4, [5, 6], 7, 8, 9
    const elements = selecto.value!.getSelectableElements();

    groupManager.value = new GroupManager([
        [[elements[0], elements[1]], elements[2]],
        [elements[5], elements[6], elements[7]],
    ], elements);
});
onBeforeUnmount(() => {
    keycon.destroy();
});
</script>

<template>
    <div class="root">
        <div class="container">
            <Moveable
                ref="moveable"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                :target="targets"
                @clickGroup="e => {
                    if (!e.moveableTarget) {
                        setSelectedTargets([]);
                        return;
                    }
                    if (e.isDouble) {
                        const childs = groupManager!.selectSubChilds(targets, e.moveableTarget);

                        setSelectedTargets(childs.targets());
                        return;
                    }
                    if (e.isTrusted) {
                        selecto!.clickTarget(e.inputEvent, e.moveableTarget);
                    }
                }"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
            />
            <Selecto
                ref="selecto"
                :dragContainer="dragContainer"
                :selectableTargets="['.selecto-area .cube']"
                :hitRate="0"
                :selectByClick="true"
                :selectFromInside="false"
                :toggleContinueSelect="['shift']"
                :ratio="0"
                @dragStart="e => {
                    const target = e.inputEvent.target;
                    // Must have use deep flat
                    const flatted = targets.flat(3) as Array<HTMLElement | SVGElement>;
                    if (
                        moveable!.isMoveableElement(target)
                        || flatted.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                }"
                @selectEnd="e => {
                    const {
                        isDragStartEnd,
                        isClick,
                        added,
                        removed,
                        inputEvent,
                    } = e;

                    if (isDragStartEnd) {
                        inputEvent.preventDefault();

                        moveable!.waitToChangeTarget().then(() => {
                            moveable!.dragStart(inputEvent);
                        });
                    }
                    let nextChilds: TargetList;

                    if (isDragStartEnd || isClick) {
                        if (isCommand) {
                            nextChilds = groupManager!.selectSingleChilds(targets, added, removed);
                        } else {
                            nextChilds = groupManager!.selectCompletedChilds(targets, added, removed, isShift);
                        }
                    } else {
                        nextChilds = groupManager!.selectSameDepthChilds(targets, added, removed);
                    }
                    e.currentTarget.setSelectedTargets(nextChilds.flatten());
                    setSelectedTargets(nextChilds.targets());
                }"
            />
            <p>[[0, 1], 2] is group</p>
            <p>[5, 6, 7] is group</p>

            <div class="elements selecto-area">
                <div class="cube" v-for="i in cubes" :key="i">{{ i }}</div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>
