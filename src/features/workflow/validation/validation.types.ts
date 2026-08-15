export type ValidationSeverity =
    | "error"
    | "warning";


export interface ValidationIssue {
    id: string;

    severity: ValidationSeverity;

    message: string;

    nodeId?: string;
}


export interface WorkflowValidationResult {
    isValid: boolean;

    errors: ValidationIssue[];

    warnings: ValidationIssue[];
}