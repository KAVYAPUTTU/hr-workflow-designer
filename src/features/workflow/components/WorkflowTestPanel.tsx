import type { SimulationResponse } from "../../../api/types/simulation.types";

interface WorkflowTestPanelProps {
    result: SimulationResponse | null;
    loading: boolean;
    onRun: () => void;
    onClose: () => void;
}

export function WorkflowTestPanel({
    result,
    loading,
    onRun,
    onClose,
}: WorkflowTestPanelProps) {

    const stepCount = result?.steps?.length ?? 0;

    return (
        <aside className="workflow-test-panel">

            {/* HEADER */}
            <header className="test-panel-header">

                <div>
                    <div className="test-panel-eyebrow">
                        WORKFLOW TEST
                    </div>

                    <h2>
                        Workflow Execution
                    </h2>

                    <p>
                        Employee Onboarding · v1
                    </p>
                </div>

                <button
                    type="button"
                    className="test-panel-close"
                    onClick={onClose}
                    aria-label="Close workflow test"
                >
                    ×
                </button>

            </header>


            {/* RUN BUTTON */}
            <div className="test-panel-actions">

                <button
                    type="button"
                    onClick={onRun}
                    disabled={loading}
                >
                    {loading
                        ? "Running workflow..."
                        : "Run Workflow"}
                </button>

            </div>


            {/* LOADING */}
            {loading && (

                <div className="simulation-loading">

                    <div className="loading-spinner" />

                    <strong>
                        Running simulation
                    </strong>

                    <p>
                        Executing workflow steps...
                    </p>

                </div>

            )}


            {/* RESULT */}
            {result && !loading && (

                <div className="simulation-result">

                    {/* STATUS */}
                    <section
                        className={
                            result.success
                                ? "execution-status success"
                                : "execution-status failure"
                        }
                    >

                        <div className="status-icon">
                            {result.success ? "✓" : "!"}
                        </div>

                        <div>

                            <h3>
                                {result.success
                                    ? "Workflow completed"
                                    : "Workflow failed"}
                            </h3>

                            <p>
                                {result.success
                                    ? "All workflow steps executed successfully."
                                    : "The workflow could not be completed."}
                            </p>

                        </div>

                    </section>


                    {/* METRICS */}
                    <section className="execution-metrics">

                        <div className="metric-card">

                            <span>
                                STEPS
                            </span>

                            <strong>
                                {stepCount}
                            </strong>

                        </div>

                        <div className="metric-card">

                            <span>
                                STATUS
                            </span>

                            <strong className="metric-success">
                                {result.success
                                    ? "Passed"
                                    : "Failed"}
                            </strong>

                        </div>

                        <div className="metric-card">

                            <span>
                                VERSION
                            </span>

                            <strong>
                                v1
                            </strong>

                        </div>

                    </section>


                    {/* TIMELINE */}
                    <section className="execution-section">

                        <div className="section-heading">

                            <h3>
                                Execution Timeline
                            </h3>

                            <span>
                                {stepCount} steps
                            </span>

                        </div>


                        <div className="execution-timeline">

                            {result.steps.map(
                                (step, index) => (

                                    <div
                                        className="execution-step"
                                        key={index}
                                    >

                                        {/* TIMELINE */}
                                        <div className="timeline-indicator">

                                            <div className="step-number">
                                                {index + 1}
                                            </div>

                                        </div>


                                        {/* CONTENT */}
                                        <div className="step-content">

                                            <div className="step-card">

                                                <div className="step-card-header">

                                                    <div>

                                                        <div className="step-title">
                                                            {step.title}
                                                        </div>

                                                        <div className="step-type">
                                                            {step.nodeType}
                                                        </div>

                                                    </div>

                                                    <span className="step-status">
                                                        ✓
                                                    </span>

                                                </div>


                                                <p>
                                                    {step.message}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </section>

                </div>

            )}

        </aside>
    );
}