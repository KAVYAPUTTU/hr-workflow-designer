import { useState } from "react"
import {
    ReactFlowProvider,
} from "@xyflow/react";

import { WorkflowCanvas } from "./WorkflowCanvas";
import { WorkflowSidebar } from "./WorkflowSidebar";

import { useWorkflow } from "../hooks/useWorkflow";
import { NodeConfigPanel } from "../components/NodeConfigPanel"
import { validateWorkflow } from "../validation/workflowValidator";

import { ValidationPanel } from "./ValidationPanel";
import type {
    WorkflowValidationResult,
} from "../validation/validation.types";
import "./workflow.css";

import { simulateWorkflow } from "../../../api/simulationApi";

import type {
    SimulationResponse,
} from "../../../api/types/simulation.types";

import { WorkflowTestPanel } from "./WorkflowTestPanel";

export function WorkflowEditor() {
    const [
        validationResult,
        setValidationResult
    ] = useState<WorkflowValidationResult | null>(
        null
    );
    const [
        testResult,
        setTestResult
    ] = useState<SimulationResponse | null>(
        null
    );


    const [
        isTesting,
        setIsTesting
    ] = useState(false);

    const [
        showTestPanel,
        setShowTestPanel
    ] = useState(false);
    const {
        nodes,
        edges,

        selectedNodeId,

        onNodesChange,
        onEdgesChange,
        onConnect,

        addNode,
        selectNode,
        updateNodeData
    } = useWorkflow();

    const selectedNode =
        nodes.find(
            (node) => node.id === selectedNodeId
        ) ?? null;
    const handleValidate = () => {

        const result = validateWorkflow(
            nodes,
            edges
        );

        setValidationResult(result);
    };
    const handleTestWorkflow = async () => {

        setIsTesting(true);

        setTestResult(null);


        try {

            const workflow = {

                id: "workflow-1",

                name: "Employee Onboarding",

                description:
                    "Employee onboarding workflow",

                version: 1,

                status: "draft" as const,

                nodes,

                edges,

                createdAt:
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString(),
            };


            const result =
                await simulateWorkflow(
                    workflow
                );


            setTestResult(result);

        } catch (error) {

            console.error(
                "Workflow simulation failed:",
                error
            );

        } finally {

            setIsTesting(false);

        }
    };

    return (

        <ReactFlowProvider>
            <div className="workflow-editor">

                <WorkflowSidebar />

                <main className="workflow-canvas">
                    <div className="workflow-toolbar">

                        <button
                            type="button"
                            className="validate-workflow-button"
                            onClick={handleValidate}
                        >
                            Validate
                        </button>

                        <button
                            type="button"
                            className="test-workflow-button"
                            onClick={() =>
                                setShowTestPanel(true)
                            }
                        >
                            Test Workflow
                        </button>
                        

                    </div>
                    <WorkflowCanvas
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onAddNode={addNode}
                        onNodeSelect={selectNode}
                    />
                </main>

                <NodeConfigPanel
                    node={selectedNode}
                    onUpdate={updateNodeData}
                />

                {validationResult && (
                    <ValidationPanel
                        result={validationResult}
                        onClose={() =>
                            setValidationResult(null)
                        }
                    />
                )}
                {showTestPanel && (

                    <WorkflowTestPanel

                        result={testResult}

                        loading={isTesting}

                        onRun={handleTestWorkflow}

                        onClose={() => {
                            setShowTestPanel(false);
                            setTestResult(null);
                        }}

                    />

                )}
            </div>
        </ReactFlowProvider>
    );
}