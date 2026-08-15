import { Handle, Position } from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";

import type {
  StartNodeData,
} from "../types/workflow.types";

export function StartNode({
  data,
}: NodeProps & { data: StartNodeData }) {
  return (
    <div className="workflow-node start-node">
      <Handle
        type="source"
        position={Position.Bottom}
      />

      <div className="node-header">
        <span>▶</span>
        <span>START</span>
      </div>

      <div className="node-title">
        {data.title}
      </div>
    </div>
  );
}