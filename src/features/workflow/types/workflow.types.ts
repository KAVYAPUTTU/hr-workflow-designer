import type { Node, Edge } from "@xyflow/react";

// -----------------------------
// Node Types
// -----------------------------

export type WorkflowNodeType =
  | "start"
  | "task"
  | "approval"
  | "automated"
  | "end";

// -----------------------------
// Node Data
// -----------------------------

export interface StartNodeData {
  [key: string]: unknown;
  title: string;
  metadata: Record<string, string>;
}

export interface TaskNodeData {
  [key: string]: unknown;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Record<string, string>;
}

export interface ApprovalNodeData {
  [key: string]: unknown;
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedNodeData {
  [key: string]: unknown;
  title: string;
  actionId: string;
  parameters: Record<string, string>;
}

export interface EndNodeData {
  [key: string]: unknown;
  message: string;
  showSummary: boolean;
}

// -----------------------------
// Workflow Node
// -----------------------------

export type WorkflowNode =
  | Node<StartNodeData, "start">
  | Node<TaskNodeData, "task">
  | Node<ApprovalNodeData, "approval">
  | Node<AutomatedNodeData, "automated">
  | Node<EndNodeData, "end">;

// -----------------------------
// Workflow Edge
// -----------------------------

export type WorkflowEdge = Edge & {
  condition?: string;
};

// -----------------------------
// Complete Workflow
// -----------------------------

export interface Workflow {
  id: string;
  name: string;
  description: string;
  version: number;
  status: "draft" | "published" | "archived";

  nodes: WorkflowNode[];
  edges: WorkflowEdge[];

  createdAt: string;
  updatedAt: string;
}