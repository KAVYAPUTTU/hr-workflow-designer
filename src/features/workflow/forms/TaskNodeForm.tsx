import type { WorkflowNode } from "../types/workflow.types";
import { KeyValueEditor } from "../components/KeyvalueEditor";

interface TaskNodeFormProps {
    node: Extract<WorkflowNode, { type: "task" }>;

    onUpdate: (
        nodeId: string,
        data: Partial<WorkflowNode["data"]>
    ) => void;
}

export function TaskNodeForm({
    node,
    onUpdate,
}: TaskNodeFormProps) {
    return (
        <div className="node-form">

            {/* Title */}
            <div className="form-field">
                <label>
                    Title
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


            {/* Description */}
            <div className="form-field">
                <label>
                    Description
                </label>

                <textarea
                    value={node.data.description}
                    onChange={(event) =>
                        onUpdate(node.id, {
                            description: event.target.value,
                        })
                    }
                />
            </div>


            {/* Assignee */}
            <div className="form-field">
                <label>
                    Assignee
                </label>

                <input
                    type="text"
                    value={node.data.assignee}
                    onChange={(event) =>
                        onUpdate(node.id, {
                            assignee: event.target.value,
                        })
                    }
                />
            </div>


            {/* Due Date */}
            <div className="form-field">
                <label>
                    Due Date
                </label>

                <input
                    type="date"
                    value={node.data.dueDate}
                    onChange={(event) =>
                        onUpdate(node.id, {
                            dueDate: event.target.value,
                        })
                    }
                />
            </div>

            <KeyValueEditor
                label="Custom Fields"
                value={node.data.customFields}
                onChange={(customFields) =>
                    onUpdate(node.id, {
                        customFields,
                    })
                }
            />

        </div>
    );
}