import type { ChangeEvent } from "react";

interface DynamicParameterEditorProps {
    params: string[];

    values: Record<string, string>;

    onChange: (
        values: Record<string, string>
    ) => void;
}

export function DynamicParameterEditor({
    params,
    values,
    onChange,
}: DynamicParameterEditorProps) {

    const handleChange = (
        parameter: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        onChange({
            ...values,
            [parameter]: event.target.value,
        });
    };

    return (
        <div className="dynamic-parameter-editor">

            <div className="form-section-title">
                Action Parameters
            </div>

            {params.map((parameter) => (
                <div
                    className="form-field"
                    key={parameter}
                >
                    <label>
                        {parameter}
                    </label>

                    <input
                        type="text"
                        value={values[parameter] ?? ""}
                        placeholder={`Enter ${parameter}`}
                        onChange={(event) =>
                            handleChange(
                                parameter,
                                event
                            )
                        }
                    />
                </div>
            ))}

        </div>
    );
}