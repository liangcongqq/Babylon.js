import * as React from "react";

import { TransformNode } from "babylonjs/Meshes/transformNode";
import { Observable } from "babylonjs/Misc/observable";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../lineContainerComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
import { Vector3LineComponent } from "../../../lines/vector3LineComponent";
import { TextLineComponent } from "../../../lines/textLineComponent";
import { QuaternionLineComponent } from "../../../lines/quaternionLineComponent";
import { AxesViewerComponent } from "./axesViewerComponent";
import { LockObject } from "../lockObject";
import { GlobalState } from '../../../../globalState';

interface ITransformNodePropertyGridComponentProps {
    globalState: GlobalState;
    transformNode: TransformNode,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class TransformNodePropertyGridComponent extends React.Component<ITransformNodePropertyGridComponentProps> {
    constructor(props: ITransformNodePropertyGridComponentProps) {
        super(props);
    }

    render() {
        const transformNode = this.props.transformNode;

        return (
            <div className="pane">
                <LineContainerComponent globalState={this.props.globalState} title="GENERAL">
                    <TextLineComponent label="ID" value={transformNode.id} />
                    <TextLineComponent label="Unique ID" value={transformNode.uniqueId.toString()} />
                    <TextLineComponent label="Class" value={transformNode.getClassName()} />
                    <CheckBoxLineComponent label="IsEnabled" isSelected={() => transformNode.isEnabled()} onSelect={(value) => transformNode.setEnabled(value)} />
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="TRANSFORMATIONS">
                    <Vector3LineComponent label="Position" target={transformNode} propertyName="position" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        !transformNode.rotationQuaternion &&
                        <Vector3LineComponent label="Rotation" target={transformNode} propertyName="rotation" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        transformNode.rotationQuaternion &&
                        <QuaternionLineComponent label="Rotation" target={transformNode} propertyName="rotationQuaternion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    <Vector3LineComponent label="Scaling" target={transformNode} propertyName="scaling" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="DEBUG" closed={true}>
                    <AxesViewerComponent globalState={this.props.globalState} node={transformNode} />
                </LineContainerComponent>
            </div>
        );
    }
}