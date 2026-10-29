import * as React from "react";
import type { InitialMoveable } from "@moveable-next/react";
import { ref } from "framework-utils";

export interface InnerMoveableProps {
    // The React Moveable of the ables of the vanilla class
    moveableClass: typeof InitialMoveable;
    [key: string]: any;
}
export default class InnerMoveable extends React.Component<InnerMoveableProps> {
    public state: any = {};
    public moveable!: InitialMoveable;
    constructor(props: InnerMoveableProps) {
        super(props);
        this.state = this.props;
    }
    public render(): React.ReactNode {
        const { moveableClass: MoveableClass, ...props } = this.state;

        return <MoveableClass ref={ref(this, "moveable")} {...props} />;
    }
}
