import type { WorkflowNode } from "../types/workflow.types";

export const initialNodes: WorkflowNode[] = [
  {
    id: "start-1",
    type: "start",
    position: {
      x: 100,
      y: 100,
    },
    data: {
      title: "Employee Onboarding",
      metadata: {},
    },
  },

  {
    id: "task-1",
    type: "task",
    position: {
      x: 100,
      y: 250,
    },
    data: {
      title: "Collect Documents",
      description: "Collect employee documents",
      assignee: "HR Team",
      dueDate: "",
      customFields: {},
    },
  },

  {
    id: "approval-1",
    type: "approval",
    position: {
      x: 100,
      y: 400,
    },
    data: {
      title: "Manager Approval",
      approverRole: "Manager",
      autoApproveThreshold: 0,
    },
  },

  {
    id: "automated-1",
    type: "automated",
    position: {
      x: 100,
      y: 550,
    },
    data: {
      title: "Send Welcome Email",
      actionId: "",
      parameters: {},
    },
  },

  {
    id: "end-1",
    type: "end",
    position: {
      x: 100,
      y: 700,
    },
    data: {
      message: "Employee onboarding completed",
      showSummary: true,
    },
  },
];