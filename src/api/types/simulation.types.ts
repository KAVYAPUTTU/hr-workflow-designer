import type { WorkflowNodeType } from "../../features/workflow/types/workflow.types";


export type SimulationStepStatus =
    | "pending"
    | "running"
    | "completed"
    | "failed";


export interface SimulationStep {
    nodeId: string;

    nodeType: WorkflowNodeType;

    title: string;

    status: SimulationStepStatus;

    message: string;

    startedAt?: string;

    completedAt?: string;
}


export interface SimulationRequest {
    workflowId: string;

    workflowName: string;

    nodes: unknown[];

    edges: unknown[];
}


export interface SimulationResponse {
    success: boolean;

    executionId: string;

    steps: SimulationStep[];

    message: string;
}