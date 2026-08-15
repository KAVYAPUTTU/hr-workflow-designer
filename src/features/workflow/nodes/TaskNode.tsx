import {
  Handle,
  Position,
} from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";

import type {
  TaskNodeData,
} from "../types/workflow.types";

export function TaskNode({
  data,
}: NodeProps & { data: TaskNodeData }) {
  return (
    <div className="workflow-node task-node">

      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="node-header">
        <span>✓</span>
        <span>TASK</span>
      </div>

      <div className="node-title">
        {data.title}
      </div>

      {data.assignee && (
        <div className="node-meta">
          Assignee: {data.assignee}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
      />

    </div>
  );
}