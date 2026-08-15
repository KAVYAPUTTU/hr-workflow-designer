import type { Workflow } from "../features/workflow/types/workflow.types";

import type {
    SimulationRequest,
    SimulationResponse,
    SimulationStep,
} from "./types/simulation.types";

import {
    validateWorkflow,
} from "../features/workflow/validation/workflowValidator";


/**
 * Mock POST /simulate
 *
 * This function behaves like an API endpoint.
 *
 * Later this can be replaced with:
 *
 * fetch("/api/simulate", {
 *     method: "POST",
 *     ...
 * })
 */
export async function simulateWorkflow(
    workflow: Workflow
): Promise<SimulationResponse> {

    // Simulate network delay
    await delay(800);


    /*
     * ------------------------------------------
     * 1. Validate workflow
     * ------------------------------------------
     */

    const validation =
        validateWorkflow(
            workflow.nodes,
            workflow.edges
        );


    if (!validation.isValid) {

        return {
            success: false,

            executionId: createExecutionId(),

            steps: [],

            message:
                "Workflow cannot be executed because validation failed.",
        };
    }


    /*
     * ------------------------------------------
     * 2. Serialize request
     * ------------------------------------------
     */

    const request: SimulationRequest = {

        workflowId:
            workflow.id,

        workflowName:
            workflow.name,

        nodes:
            workflow.nodes,

        edges:
            workflow.edges,
    };


    console.log(
        "POST /simulate",
        request
    );


    /*
     * ------------------------------------------
     * 3. Build execution order
     * ------------------------------------------
     */

    const executionOrder =
        getExecutionOrder(
            workflow
        );


    /*
     * ------------------------------------------
     * 4. Create simulation steps
     * ------------------------------------------
     */

    const steps: SimulationStep[] =
        executionOrder.map(
            (node) => {

                const title =
                    getNodeTitle(node);


                return {

                    nodeId:
                        node.id,

                    nodeType:
                        node.type,

                    title,

                    status:
                        "completed",

                    message:
                        getExecutionMessage(
                            node
                        ),

                    startedAt:
                        new Date().toISOString(),

                    completedAt:
                        new Date().toISOString(),
                };
            }
        );


    return {

        success: true,

        executionId:
            createExecutionId(),

        steps,

        message:
            "Workflow executed successfully.",
    };
}


/*
 * ==================================================
 * EXECUTION ORDER
 * ==================================================
 */

function getExecutionOrder(
    workflow: Workflow
) {

    const startNode =
        workflow.nodes.find(
            (node) =>
                node.type === "start"
        );


    if (!startNode) {
        return [];
    }


    const nodeMap =
        new Map(
            workflow.nodes.map(
                (node) => [
                    node.id,
                    node,
                ]
            )
        );


    const outgoing =
        new Map<
            string,
            string[]
        >();


    workflow.edges.forEach(
        (edge) => {

            const existing =
                outgoing.get(
                    edge.source
                ) ?? [];


            outgoing.set(
                edge.source,
                [
                    ...existing,
                    edge.target,
                ]
            );

        }
    );


    const result = [];

    const visited =
        new Set<string>();


    let currentId:
        string | null =
        startNode.id;


    /*
     * Follow the workflow from
     * Start → ... → End
     */
    while (
        currentId !== null &&
        !visited.has(currentId)
    ) {

        visited.add(currentId);


        const currentNode =
            nodeMap.get(
                currentId
            );


        if (!currentNode) {
            break;
        }


        result.push(
            currentNode
        );


        /*
         * For this prototype,
         * follow the first outgoing edge.
         *
         * Later we can support
         * conditional branching.
         */
        const nextNodes: string[] =
            outgoing.get(
                currentId
            ) ?? [];

        currentId =
            nextNodes[0] ?? null;


        currentId =
            nextNodes[0] ?? null;
    }


    return result;
}


/*
 * ==================================================
 * NODE TITLE
 * ==================================================
 */

function getNodeTitle(
    node: Workflow["nodes"][number]
): string {

    switch (node.type) {

        case "start":
            return (
                node.data.title ||
                "Start"
            );


        case "task":
            return (
                node.data.title ||
                "Task"
            );


        case "approval":
            return (
                node.data.title ||
                "Approval"
            );


        case "automated":
            return (
                node.data.title ||
                "Automated Step"
            );


        case "end":
            return (
                node.data.message ||
                "End"
            );
    }
}


/*
 * ==================================================
 * EXECUTION MESSAGE
 * ==================================================
 */

function getExecutionMessage(
    node: Workflow["nodes"][number]
): string {

    switch (node.type) {

        case "start":

            return `Workflow started: ${node.data.title}`;


        case "task":

            return `Task assigned to ${node.data.assignee || "unassigned"}`;


        case "approval":

            return `Approval requested from ${node.data.approverRole}`;


        case "automated":

            return `Automation "${node.data.actionId}" executed`;


        case "end":

            return `Workflow completed: ${node.data.message}`;
    }
}


/*
 * ==================================================
 * HELPERS
 * ==================================================
 */

function delay(
    milliseconds: number
): Promise<void> {

    return new Promise(
        (resolve) =>
            setTimeout(
                resolve,
                milliseconds
            )
    );
}


function createExecutionId(): string {

    return (
        "exec_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}