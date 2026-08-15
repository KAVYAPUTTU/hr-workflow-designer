import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    type NodeChange,
    type EdgeChange,
    type Connection,
    useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type {
    WorkflowNode,
    WorkflowEdge,
    WorkflowNodeType,
} from "../types/workflow.types";

import { nodeTypes } from "../constants/nodeTypes";

import "../nodes/nodes.css";

interface WorkflowCanvasProps {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];

    onNodesChange: (
        changes: NodeChange<WorkflowNode>[]
    ) => void;

    onEdgesChange: (
        changes: EdgeChange[]
    ) => void;

    onConnect: (
        connection: Connection
    ) => void;

    onAddNode: (
        type: WorkflowNodeType,
        position: { x: number; y: number }
    ) => void;

    onNodeSelect: (nodeId: string | null) => void;
}

export function WorkflowCanvas({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAddNode,
    onNodeSelect,
}: WorkflowCanvasProps) {
    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = (
        event: React.DragEvent
    ) => {
        event.preventDefault();

        event.dataTransfer.dropEffect = "move";
    };

    const onDrop = (
        event: React.DragEvent
    ) => {
        event.preventDefault();

        const type =
            event.dataTransfer.getData(
                "application/reactflow"
            ) as WorkflowNodeType;

        if (!type) {
            return;
        }

        const position =
            screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

        onAddNode(
            type,
            position
        );
    };
    const handleNodeClick = (
        _event: React.MouseEvent,
        node: WorkflowNode
    ) => {
        onNodeSelect(node.id);
    };

    const handlePaneClick = () => {
        onNodeSelect(null);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}

                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}

                onNodeClick={handleNodeClick}
                
                onPaneClick={handlePaneClick}
                onDragOver={onDragOver}
                onDrop={onDrop}

                deleteKeyCode={["Backspace", "Delete"]}
                fitView
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}