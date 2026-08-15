import type {
  WorkflowNode,
} from "../types/workflow.types";

import { StartNodeForm } from "../forms/StartNodeForm";
import { TaskNodeForm } from "../forms/TaskNodeForm";
import { ApprovalNodeForm } from "../forms/ApprovalNodeForm";
import { AutomatedNodeForm } from "../forms/AutomatedNodeForm";
import { EndNodeForm } from "../forms/EndNodeForm";

interface NodeConfigPanelProps {
  node: WorkflowNode | null;

  onUpdate: (
    nodeId: string,
    data: Partial<WorkflowNode["data"]>
  ) => void;
}

export function NodeConfigPanel({
  node,
  onUpdate,
}: NodeConfigPanelProps) {
  if (!node) {
    return (
      <aside className="node-config-panel">
        <div className="empty-config">
          <h3>No node selected</h3>

          <p>
            Select a node on the canvas
            to configure it.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="node-config-panel">
      <div className="config-header">
        <h2>Node Configuration</h2>

        <span className="config-type">
          {node.type.toUpperCase()}
        </span>
      </div>

      <div className="config-body">
        {node.type === "start" && (
          <StartNodeForm
            node={node}
            onUpdate={onUpdate}
          />
        )}

        {node.type === "task" && (
          <TaskNodeForm
            node={node}
            onUpdate={onUpdate}
          />
        )}

        {node.type === "approval" && (
          <ApprovalNodeForm
            node={node}
            onUpdate={onUpdate}
          />
        )}

        {node.type === "automated" && (
          <AutomatedNodeForm
            node={node}
            onUpdate={onUpdate}
          />
        )}

        {node.type === "end" && (
          <EndNodeForm
            node={node}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </aside>
  );
}