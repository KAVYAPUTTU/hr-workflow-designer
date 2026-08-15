import type {
  WorkflowNode,
  WorkflowNodeType,
} from "../types/workflow.types";

interface Position {
  x: number;
  y: number;
}

export function createWorkflowNode(
  type: WorkflowNodeType,
  position: Position
): WorkflowNode {
  const id =
    `${type}-${crypto.randomUUID()}`;

  switch (type) {
    case "start":
      return {
        id,
        type: "start",
        position,
        data: {
          title: "New Workflow",
          metadata: {},
        },
      };

    case "task":
      return {
        id,
        type: "task",
        position,
        data: {
          title: "New Task",
          description: "",
          assignee: "",
          dueDate: "",
          customFields: {},
        },
      };

    case "approval":
      return {
        id,
        type: "approval",
        position,
        data: {
          title: "New Approval",
          approverRole: "Manager",
          autoApproveThreshold: 0,
        },
      };

    case "automated":
      return {
        id,
        type: "automated",
        position,
        data: {
          title: "New Automated Step",
          actionId: "",
          parameters: {},
        },
      };

    case "end":
      return {
        id,
        type: "end",
        position,
        data: {
          message: "Workflow completed",
          showSummary: true,
        },
      };
  }
}