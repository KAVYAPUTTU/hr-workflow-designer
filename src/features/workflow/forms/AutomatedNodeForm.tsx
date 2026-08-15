import { useEffect, useState } from "react";

import type { WorkflowNode } from "../types/workflow.types";

import { getAutomations } from "../../../api/automationApi";

import type { AutomationAction } from "../../../api/types/automation.types";

import { DynamicParameterEditor } from "../components/DynamicParameterEditor";

interface AutomatedNodeFormProps {
    node: Extract<
        WorkflowNode,
        { type: "automated" }
    >;

    onUpdate: (
        nodeId: string,
        data: Partial<WorkflowNode["data"]>
    ) => void;
}


export function AutomatedNodeForm({
    node,
    onUpdate,
}: AutomatedNodeFormProps) {

    const [automations, setAutomations] =
        useState<AutomationAction[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);


    useEffect(() => {

        async function loadAutomations() {

            try {

                setLoading(true);

                const data =
                    await getAutomations();

                setAutomations(data);

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load automations"
                );

            } finally {

                setLoading(false);

            }
        }

        loadAutomations();

    }, []);


    const selectedAction =
        automations.find(
            (automation) =>
                automation.id ===
                node.data.actionId
        );


    const handleActionChange = (
        actionId: string
    ) => {

        const action =
            automations.find(
                (automation) =>
                    automation.id === actionId
            );


        if (!action) {
            return;
        }


        const parameters: Record<
            string,
            string
        > = {};


        action.params.forEach(
            (parameter) => {
                parameters[parameter] = "";
            }
        );


        onUpdate(node.id, {
            actionId: action.id,
            parameters,
        });
    };


    return (
        <div className="node-form">

            {/* TITLE */}

            <div className="form-field">

                <label>
                    Title
                </label>

                <input
                    type="text"
                    value={node.data.title}
                    onChange={(event) =>
                        onUpdate(node.id, {
                            title:
                                event.target.value,
                        })
                    }
                />

            </div>


            {/* ACTION */}

            <div className="form-field">

                <label>
                    Action
                </label>


                {loading && (
                    <p className="form-help">
                        Loading automations...
                    </p>
                )}


                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}


                {!loading && !error && (

                    <select
                        value={
                            node.data.actionId
                        }
                        onChange={(event) =>
                            handleActionChange(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            Select an action
                        </option>


                        {automations.map(
                            (automation) => (

                                <option
                                    key={
                                        automation.id
                                    }
                                    value={
                                        automation.id
                                    }
                                >
                                    {
                                        automation.label
                                    }
                                </option>

                            )
                        )}

                    </select>

                )}

            </div>


            {/* PARAMETERS */}

            {selectedAction && (
                <DynamicParameterEditor
                    params={selectedAction.params}
                    values={node.data.parameters}
                    onChange={(parameters) =>
                        onUpdate(node.id, {
                            parameters,
                        })
                    }
                />
            )}
        </div>
    );
}