import type { NodeTypes } from "@xyflow/react";

import { StartNode } from "../nodes/StartNode";
import { TaskNode } from "../nodes/TaskNode";
import { ApprovalNode } from "../nodes/ApprovalNode";
import { AutomatedNode } from "../nodes/AutomatedNode";
import { EndNode } from "../nodes/EndNode";

export const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};