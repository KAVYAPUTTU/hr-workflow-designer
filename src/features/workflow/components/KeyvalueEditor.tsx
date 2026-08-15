interface KeyValueEditorProps {
    value: Record<string, string>;

    onChange: (
        value: Record<string, string>
    ) => void;

    label?: string;
}

export function KeyValueEditor({
    value,
    onChange,
    label = "Custom Fields",
}: KeyValueEditorProps) {

    const entries = Object.entries(value);


    // Update key
    const updateKey = (
        index: number,
        newKey: string
    ) => {

        const newEntries = [...entries];

        newEntries[index] = [
            newKey,
            newEntries[index][1],
        ];

        const newValue =
            Object.fromEntries(newEntries);

        onChange(newValue);
    };


    // Update value
    const updateValue = (
        index: number,
        newFieldValue: string
    ) => {

        const newEntries = [...entries];

        newEntries[index] = [
            newEntries[index][0],
            newFieldValue,
        ];

        const newValue =
            Object.fromEntries(newEntries);

        onChange(newValue);
    };


    // Add new field
    const addField = () => {

        let newKey = "newField";
        let counter = 1;

        while (
            Object.prototype.hasOwnProperty.call(
                value,
                newKey
            )
        ) {
            newKey = `newField${counter}`;
            counter++;
        }

        onChange({
            ...value,
            [newKey]: "",
        });
    };


    // Delete field
    const removeField = (
        index: number
    ) => {

        const newEntries =
            entries.filter(
                (_, i) => i !== index
            );

        const newValue =
            Object.fromEntries(newEntries);

        onChange(newValue);
    };


    return (
        <div className="key-value-editor">

            {/* Header */}
            <div className="key-value-header">

                <label>
                    {label}
                </label>

                <button
                    type="button"
                    onClick={addField}
                >
                    + Add field
                </button>

            </div>


            {/* Empty state */}
            {entries.length === 0 && (
                <p className="key-value-empty">
                    No fields added.
                </p>
            )}


            {/* Fields */}
            {entries.map(
                ([key, fieldValue], index) => (

                    <div
                        className="key-value-row"
                        key={index}
                    >

                        {/* Key */}
                        <input
                            type="text"
                            placeholder="Key"
                            value={key}
                            onChange={(event) =>
                                updateKey(
                                    index,
                                    event.target.value
                                )
                            }
                        />


                        {/* Value */}
                        <input
                            type="text"
                            placeholder="Value"
                            value={fieldValue}
                            onChange={(event) =>
                                updateValue(
                                    index,
                                    event.target.value
                                )
                            }
                        />


                        {/* Delete */}
                        <button
                            type="button"
                            onClick={() =>
                                removeField(index)
                            }
                        >
                            ×
                        </button>

                    </div>
                )
            )}

        </div>
    );
}