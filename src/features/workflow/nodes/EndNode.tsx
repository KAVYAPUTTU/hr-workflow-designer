import {
  Handle,
  Position,
} from "@xyflow/react";

import type { NodeProps } from "@xyflow/react";

import type {
  EndNodeData,
} from "../types/workflow.types";

export function EndNode({
  data,
}: NodeProps & { data: EndNodeData }) {
  return (
    <div className="workflow-node end-node">

      <Handle
        type="target"
        position={Position.Top}
      />

      <div className="node-header">
        <span>■</span>
        <span>END</span>
      </div>

      <div className="node-title">
        {data.message}
      </div>

    </div>
  );
}