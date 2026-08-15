import type {
    WorkflowValidationResult,
} from "../validation/validation.types";


interface ValidationPanelProps {
    result: WorkflowValidationResult;

    onClose: () => void;
}


export function ValidationPanel({
    result,
    onClose,
}: ValidationPanelProps) {

    return (
        <div className="validation-panel">

            <div className="validation-header">

                <div>

                    <h3>
                        Workflow Validation
                    </h3>

                    <p>
                        {result.isValid
                            ? "Workflow is valid"
                            : `${result.errors.length} issue(s) found`}
                    </p>

                </div>


                <button
                    type="button"
                    onClick={onClose}
                >
                    ×
                </button>

            </div>


            {result.isValid && (

                <div className="validation-success">

                    <span>
                        ✓
                    </span>

                    <div>

                        <strong>
                            Workflow looks good
                        </strong>

                        <p>
                            No structural problems were found.
                        </p>

                    </div>

                </div>

            )}


            {result.errors.length > 0 && (

                <div className="validation-section">

                    <h4>
                        Errors
                    </h4>


                    {result.errors.map(
                        (issue) => (

                            <div
                                className="validation-error"
                                key={issue.id}
                            >

                                <span>
                                    !
                                </span>

                                <span>
                                    {issue.message}
                                </span>

                            </div>

                        )
                    )}

                </div>

            )}


            {result.warnings.length > 0 && (

                <div className="validation-section">

                    <h4>
                        Warnings
                    </h4>


                    {result.warnings.map(
                        (issue) => (

                            <div
                                className="validation-warning"
                                key={issue.id}
                            >

                                <span>
                                    ⚠
                                </span>

                                <span>
                                    {issue.message}
                                </span>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}