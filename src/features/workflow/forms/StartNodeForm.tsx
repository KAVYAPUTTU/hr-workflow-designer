import type { WorkflowNode } from "../types/workflow.types";
import { KeyValueEditor } from "../components/KeyvalueEditor";

interface StartNodeFormProps {
    node: Extract<WorkflowNode, { type: "start" }>;

    onUpdate: (
        nodeId: string,
        data: Partial<WorkflowNode["data"]>
    ) => void;
}

export function StartNodeForm({
    node,
    onUpdate,
}: StartNodeFormProps) {
    return (
        <div className="node-form">

            <div className="form-field">
                <label>
                    Start Title
                </label>

                <input
                    type="text"
                    value={node.data.title}
                    onChange={(event) =>
                        onUpdate(node.id, {
                            title: event.target.value,
                        })
                    }
                />
            </div>

            <div className="form-section-title">
                Metadata
            </div>

            <KeyValueEditor
                label="Metadata"
                value={node.data.metadata}
                onChange={(metadata) =>
                    onUpdate(node.id, {
                        metadata,
                    })
                }
            />

        </div>
    );
}