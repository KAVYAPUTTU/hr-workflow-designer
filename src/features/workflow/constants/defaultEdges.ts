import type { WorkflowEdge } from "../types/workflow.types";

export const initialEdges: WorkflowEdge[] = [
  {
    id: "edge-start-task",
    source: "start-1",
    target: "task-1",
  },

  {
    id: "edge-task-approval",
    source: "task-1",
    target: "approval-1",
  },

  {
    id: "edge-approval-automated",
    source: "approval-1",
    target: "automated-1",
  },

  {
    id: "edge-automated-end",
    source: "automated-1",
    target: "end-1",
  },
];