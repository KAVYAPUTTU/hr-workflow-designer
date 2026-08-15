import {
  Handle,
  Position,
} from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";

import type {
  ApprovalNodeData,
} from "../types/workflow.types";

export function ApprovalNode({
  data,
}: NodeProps & { data: ApprovalNodeData }) {
  return (
    <div className="workflow-node approval-node">

      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="node-header">
        <span>✓</span>
        <span>APPROVAL</span>
      </div>

      <div className="node-title">
        {data.title}
      </div>

      <div className="node-meta">
        Approver: {data.approverRole}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />

    </div>
  );
}