import type { WorkflowNode } from "../types/workflow.types";

interface EndNodeFormProps {
  node: Extract<
    WorkflowNode,
    { type: "end" }
  >;

  onUpdate: (
    nodeId: string,
    data: Partial<WorkflowNode["data"]>
  ) => void;
}

export function EndNodeForm({
  node,
  onUpdate,
}: EndNodeFormProps) {
  return (
    <div className="node-form">

      <div className="form-field">
        <label>
          End Message
        </label>

        <input
          value={node.data.message}
          onChange={(event) =>
            onUpdate(node.id, {
              message:
                event.target.value,
            })
          }
        />
      </div>

      <div className="form-checkbox">
        <input
          type="checkbox"
          checked={node.data.showSummary}
          onChange={(event) =>
            onUpdate(node.id, {
              showSummary:
                event.target.checked,
            })
          }
        />

        <label>
          Show summary
        </label>
      </div>

    </div>
  );
}