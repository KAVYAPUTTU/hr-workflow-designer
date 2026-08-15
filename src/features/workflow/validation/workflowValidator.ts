import type {
    WorkflowNode,
    WorkflowEdge,
} from "../types/workflow.types";

import type {
    ValidationIssue,
    WorkflowValidationResult,
} from "./validation.types";


export function validateWorkflow(
    nodes: WorkflowNode[],
    edges: WorkflowEdge[]
): WorkflowValidationResult {

    const errors: ValidationIssue[] = [];

    const warnings: ValidationIssue[] = [];


    /*
     * ------------------------------------------------
     * BASIC WORKFLOW CHECKS
     * ------------------------------------------------
     */

    if (nodes.length === 0) {

        errors.push({
            id: "workflow-empty",
            severity: "error",
            message:
                "Workflow must contain at least one node.",
        });

        return {
            isValid: false,
            errors,
            warnings,
        };
    }


    /*
     * ------------------------------------------------
     * START NODE
     * ------------------------------------------------
     */

    const startNodes =
        nodes.filter(
            (node) => node.type === "start"
        );


    if (startNodes.length === 0) {

        errors.push({
            id: "missing-start",
            severity: "error",
            message:
                "Workflow must contain a Start node.",
        });

    }


    if (startNodes.length > 1) {

        errors.push({
            id: "multiple-start",
            severity: "error",
            message:
                "Workflow can contain only one Start node.",
        });

    }


    /*
     * ------------------------------------------------
     * END NODE
     * ------------------------------------------------
     */

    const endNodes =
        nodes.filter(
            (node) => node.type === "end"
        );


    if (endNodes.length === 0) {

        errors.push({
            id: "missing-end",
            severity: "error",
            message:
                "Workflow must contain an End node.",
        });

    }


    if (endNodes.length > 1) {

        errors.push({
            id: "multiple-end",
            severity: "error",
            message:
                "Workflow can contain only one End node.",
        });

    }


    /*
     * ------------------------------------------------
     * CREATE GRAPH MAPS
     * ------------------------------------------------
     */

    const outgoing =
        new Map<string, string[]>();

    const incoming =
        new Map<string, string[]>();


    nodes.forEach((node) => {

        outgoing.set(node.id, []);

        incoming.set(node.id, []);

    });


    edges.forEach((edge) => {

        if (!outgoing.has(edge.source)) {

            errors.push({
                id: `invalid-source-${edge.id}`,
                severity: "error",
                message:
                    `Edge ${edge.id} references a missing source node.`,
            });

            return;
        }


        if (!incoming.has(edge.target)) {

            errors.push({
                id: `invalid-target-${edge.id}`,
                severity: "error",
                message:
                    `Edge ${edge.id} references a missing target node.`,
            });

            return;
        }


        outgoing
            .get(edge.source)!
            .push(edge.target);

        incoming
            .get(edge.target)!
            .push(edge.source);

    });


    /*
     * ------------------------------------------------
     * START NODE CONNECTION
     * ------------------------------------------------
     */

    startNodes.forEach((node) => {

        const incomingEdges =
            incoming.get(node.id) ?? [];


        if (incomingEdges.length > 0) {

            errors.push({
                id: `start-incoming-${node.id}`,
                severity: "error",
                nodeId: node.id,
                message:
                    "Start node cannot have an incoming connection.",
            });

        }


        const outgoingEdges =
            outgoing.get(node.id) ?? [];


        if (outgoingEdges.length === 0) {

            errors.push({
                id: `start-outgoing-${node.id}`,
                severity: "error",
                nodeId: node.id,
                message:
                    "Start node must connect to another node.",
            });

        }

    });


    /*
     * ------------------------------------------------
     * END NODE CONNECTION
     * ------------------------------------------------
     */

    endNodes.forEach((node) => {

        const incomingEdges =
            incoming.get(node.id) ?? [];


        if (incomingEdges.length === 0) {

            errors.push({
                id: `end-incoming-${node.id}`,
                severity: "error",
                nodeId: node.id,
                message:
                    "End node must have an incoming connection.",
            });

        }


        const outgoingEdges =
            outgoing.get(node.id) ?? [];


        if (outgoingEdges.length > 0) {

            errors.push({
                id: `end-outgoing-${node.id}`,
                severity: "error",
                nodeId: node.id,
                message:
                    "End node cannot have an outgoing connection.",
            });

        }

    });


    /*
     * ------------------------------------------------
     * DISCONNECTED NODES
     * ------------------------------------------------
     */

    nodes.forEach((node) => {

        const incomingCount =
            incoming.get(node.id)?.length ?? 0;

        const outgoingCount =
            outgoing.get(node.id)?.length ?? 0;


        if (
            node.type !== "start" &&
            node.type !== "end" &&
            incomingCount === 0 &&
            outgoingCount === 0
        ) {

            errors.push({
                id: `isolated-${node.id}`,
                severity: "error",
                nodeId: node.id,
                message:
                    `${getNodeLabel(node)} is disconnected from the workflow.`,
            });

        }

    });


    /*
     * ------------------------------------------------
     * CYCLE DETECTION
     * ------------------------------------------------
     */

    const cycleNodes =
        detectCycles(nodes, outgoing);


    cycleNodes.forEach((nodeId) => {

        const node =
            nodes.find(
                (item) => item.id === nodeId
            );


        errors.push({
            id: `cycle-${nodeId}`,
            severity: "error",
            nodeId,
            message:
                `${node ? getNodeLabel(node) : "Node"} is part of a cycle.`,
        });

    });


    /*
     * ------------------------------------------------
     * REACHABILITY FROM START
     * ------------------------------------------------
     */

    if (startNodes.length === 1) {

        const startId =
            startNodes[0].id;


        const reachable =
            traverseGraph(
                startId,
                outgoing
            );


        nodes.forEach((node) => {

            if (!reachable.has(node.id)) {

                errors.push({
                    id: `unreachable-${node.id}`,
                    severity: "error",
                    nodeId: node.id,
                    message:
                        `${getNodeLabel(node)} cannot be reached from the Start node.`,
                });

            }

        });

    }


    /*
     * ------------------------------------------------
     * CHECK THAT EVERY NODE CAN REACH END
     * ------------------------------------------------
     */

    if (endNodes.length === 1) {

        const endId =
            endNodes[0].id;


        const canReachEnd =
            traverseReverseGraph(
                endId,
                incoming
            );


        nodes.forEach((node) => {

            if (!canReachEnd.has(node.id)) {

                errors.push({
                    id: `no-end-${node.id}`,
                    severity: "error",
                    nodeId: node.id,
                    message:
                        `${getNodeLabel(node)} does not lead to the End node.`,
                });

            }

        });

    }


    /*
     * ------------------------------------------------
     * FINAL RESULT
     * ------------------------------------------------
     */

    return {
        isValid:
            errors.length === 0,

        errors,

        warnings,
    };
}


/*
 * ====================================================
 * HELPER FUNCTIONS
 * ====================================================
 */


function getNodeLabel(
    node: WorkflowNode
): string {

    switch (node.type) {

        case "start":
            return node.data.title || "Start node";

        case "task":
            return node.data.title || "Task";

        case "approval":
            return node.data.title || "Approval";

        case "automated":
            return node.data.title || "Automated step";

        case "end":
            return node.data.message || "End node";

        default:
            return "Node";
    }
}


/*
 * Traverse graph forward
 */

function traverseGraph(
    startId: string,
    graph: Map<string, string[]>
): Set<string> {

    const visited =
        new Set<string>();

    const stack =
        [startId];


    while (stack.length > 0) {

        const current =
            stack.pop()!;


        if (visited.has(current)) {
            continue;
        }


        visited.add(current);


        const neighbors =
            graph.get(current) ?? [];


        neighbors.forEach((neighbor) => {

            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }

        });

    }


    return visited;
}


/*
 * Traverse graph backwards
 */

function traverseReverseGraph(
    startId: string,
    graph: Map<string, string[]>
): Set<string> {

    const visited =
        new Set<string>();

    const stack =
        [startId];


    while (stack.length > 0) {

        const current =
            stack.pop()!;


        if (visited.has(current)) {
            continue;
        }


        visited.add(current);


        const neighbors =
            graph.get(current) ?? [];


        neighbors.forEach((neighbor) => {

            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }

        });

    }


    return visited;
}


/*
 * Detect directed cycles
 *
 * 0 = unvisited
 * 1 = currently visiting
 * 2 = completely visited
 */

function detectCycles(
    nodes: WorkflowNode[],
    graph: Map<string, string[]>
): Set<string> {

    const state =
        new Map<string, number>();

    const cycleNodes =
        new Set<string>();


    nodes.forEach((node) => {

        state.set(node.id, 0);

    });


    function dfs(
        nodeId: string
    ) {

        state.set(nodeId, 1);


        const neighbors =
            graph.get(nodeId) ?? [];


        for (const neighbor of neighbors) {

            const neighborState =
                state.get(neighbor);


            if (neighborState === 1) {

                cycleNodes.add(nodeId);

                cycleNodes.add(neighbor);

                continue;
            }


            if (neighborState === 0) {

                dfs(neighbor);

            }

        }


        state.set(nodeId, 2);

    }


    nodes.forEach((node) => {

        if (state.get(node.id) === 0) {

            dfs(node.id);

        }

    });


    return cycleNodes;
}