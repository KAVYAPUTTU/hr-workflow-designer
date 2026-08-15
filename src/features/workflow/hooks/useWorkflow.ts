import {
    useCallback,
    useState,
} from "react";

import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    type Connection,
    type EdgeChange,
    type NodeChange,
} from "@xyflow/react";

import type {
    WorkflowNode,
    WorkflowEdge,
    WorkflowNodeType,
} from "../types/workflow.types";

import { createWorkflowNode } from "../utils/createNode";
import { initialNodes } from "../constants/defaultNodes";
import { initialEdges } from "../constants/defaultEdges";

export function useWorkflow() {
    const [nodes, setNodes] =
        useState<WorkflowNode[]>(initialNodes);

    const [edges, setEdges] =
        useState<WorkflowEdge[]>(initialEdges);

    const [selectedNodeId, setSelectedNodeId] =
        useState<string | null>(null);
    // --------------------------------
    // Node changes
    // --------------------------------

    const onNodesChange = useCallback(
        (changes: NodeChange<WorkflowNode>[]) => {
            setNodes((currentNodes) =>
                applyNodeChanges(
                    changes,
                    currentNodes
                ) as WorkflowNode[]
            );
        },
        []
    );

    // --------------------------------
    // Edge changes
    // --------------------------------

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges((currentEdges) =>
                applyEdgeChanges(
                    changes,
                    currentEdges
                ) as WorkflowEdge[]
            );
        },
        []
    );

    // --------------------------------
    // Connect nodes
    // --------------------------------

    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((currentEdges) =>
                addEdge(
                    connection,
                    currentEdges
                ) as WorkflowEdge[]
            );
        },
        []
    );

    const addNode = useCallback(
        (
            type: WorkflowNodeType,
            position: { x: number; y: number }
        ) => {
            const newNode = createWorkflowNode(
                type,
                position
            );

            setNodes((currentNodes) => [
                ...currentNodes,
                newNode,
            ]);
        },
        []
    );

    const selectNode = useCallback((nodeId: string | null) => {
        setSelectedNodeId(nodeId);
    }, []);

    const updateNodeData = useCallback(
        (
            nodeId: string,
            data: Partial<WorkflowNode["data"]>
        ) => {
            setNodes((currentNodes) =>
                currentNodes.map((node) => {
                    if (node.id !== nodeId) {
                        return node;
                    }

                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...data,
                        },
                    } as WorkflowNode;
                })
            );
        },
        []
    );

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        selectNode,
        updateNodeData,
        selectedNodeId,
    };
}