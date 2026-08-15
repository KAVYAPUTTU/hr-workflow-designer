import {
  Handle,
  Position,
} from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";

import type {
  AutomatedNodeData,
} from "../types/workflow.types";

export function AutomatedNode({
  data,
}: NodeProps & { data: AutomatedNodeData }) {
  return (
    <div className="workflow-node automated-node">

      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="node-header">
        <span>⚡</span>
        <span>AUTOMATED</span>
      </div>

      <div className="node-title">
        {data.title}
      </div>

      {data.actionId && (
        <div className="node-meta">
          Action: {data.actionId}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
      />

    </div>
  );
}