<script setup lang="ts">
import { deepFlat } from "@daybrush/utils";
import { onMounted, shallowRef, useTemplateRef } from "vue";
import Selecto from "vue3-selecto";
import Moveable, { type MoveableTargetGroupsType } from "@/vue3-moveable";
import { GroupManager, type TargetList } from "@moveable-next/helper";

const groupManager = new GroupManager([]);
const targets = shallowRef<MoveableTargetGroupsType>([]);
const moveable = useTemplateRef<InstanceType<typeof Moveable>>("moveable");
const selecto = useTemplateRef<Selecto>("selecto");
const dragContainer = window;
const cubes: number[] = [];

for (let i = 0; i < 30; ++i) {
    cubes.push(i);
}
function setSelectedTargets(nextTargetes: MoveableTargetGroupsType) {
    selecto.value!.setSelectedTargets(deepFlat(nextTargetes));
    targets.value = nextTargetes;
}

onMounted(() => {
    // [[0, 1], 2], 3, 4, [5, 6], 7, 8, 9
    const elements = selecto.value!.getSelectableElements();

    groupManager.set([], elements);
});
</script>

<template>
    <div class="root">
        <div class="container">
            <button @click="() => {
                const nextGroup = groupManager.group(targets, true);

                if (nextGroup) {
                    targets = nextGroup;
                }
            }">Group</button>&nbsp;<button @click="() => {
                const nextGroup = groupManager.ungroup(targets);

                if (nextGroup) {
                    targets = nextGroup;
                }
            }">Ungroup</button>
            <Moveable
                ref="moveable"
                :draggable="true"
                :rotatable="true"
                :scalable="true"
                :target="targets"
                @drag="e => {
                    e.target.style.transform = e.transform;
                }"
                @renderGroup="e => {
                    e.events.forEach(ev => {
                        ev.target.style.cssText += ev.cssText;
                    });
                }"
                @clickGroup="e => {
                    if (!e.moveableTarget) {
                        setSelectedTargets([]);
                        return;
                    }
                    if (e.isDouble) {
                        const childs = groupManager.selectSubChilds(targets, e.moveableTarget);

                        setSelectedTargets(childs.targets());
                        return;
                    }
                    if (e.isTrusted) {
                        selecto!.clickTarget(e.inputEvent, e.moveableTarget);
                    }
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
                    const flatted = deepFlat(targets);

                    if (
                        target.tagName === 'BUTTON'
                        || moveable!.isMoveableElement(target)
                        || flatted.some(t => t === target || t.contains(target))
                    ) {
                        e.stop();
                    }
                    e.data.startTargets = targets;
                }"
                @select="e => {
                    const {
                        startAdded,
                        startRemoved,
                        isDragStartEnd,
                    } = e;

                    if (isDragStartEnd) {
                        return;
                    }
                    const nextChilds = groupManager.selectSameDepthChilds(
                        e.data.startTargets,
                        startAdded,
                        startRemoved,
                    );

                    setSelectedTargets(nextChilds.targets());
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
                        nextChilds = groupManager.selectCompletedChilds(e.data.startTargets, added, removed);
                    } else {
                        nextChilds = groupManager.selectSameDepthChilds(e.data.startTargets, added, removed);
                    }
                    e.currentTarget.setSelectedTargets(nextChilds.flatten());
                    setSelectedTargets(nextChilds.targets());
                }"
            />
            <div class="elements selecto-area">
                <div class="cube" v-for="i in cubes" :key="i">{{ i }}</div>
            </div>
            <div class="empty elements"></div>
        </div>
    </div>
</template>
