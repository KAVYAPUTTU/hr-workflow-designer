import type { WorkflowNode } from "../types/workflow.types";

interface ApprovalNodeFormProps {
  node: Extract<
    WorkflowNode,
    { type: "approval" }
  >;

  onUpdate: (
    nodeId: string,
    data: Partial<WorkflowNode["data"]>
  ) => void;
}

export function ApprovalNodeForm({
  node,
  onUpdate,
}: ApprovalNodeFormProps) {
  return (
    <div className="node-form">

      <div className="form-field">
        <label>Title</label>

        <input
          value={node.data.title}
          onChange={(event) =>
            onUpdate(node.id, {
              title: event.target.value,
            })
          }
        />
      </div>

      <div className="form-field">
        <label>Approver Role</label>

        <select
          value={node.data.approverRole}
          onChange={(event) =>
            onUpdate(node.id, {
              approverRole:
                event.target.value,
            })
          }
        >
          <option value="Manager">
            Manager
          </option>

          <option value="HRBP">
            HRBP
          </option>

          <option value="Director">
            Director
          </option>
        </select>
      </div>

      <div className="form-field">
        <label>
          Auto-approve threshold
        </label>

        <input
          type="number"
          value={
            node.data.autoApproveThreshold
          }
          onChange={(event) =>
            onUpdate(node.id, {
              autoApproveThreshold:
                Number(event.target.value),
            })
          }
        />
      </div>

    </div>
  );
}