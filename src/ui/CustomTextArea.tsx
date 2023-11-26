import * as React from "react";

interface TextAreaProps {
    placeholder: string;
    register: Function;
    name: string;
    validationRules?: Record<string, any>;
    error: any;
    rows?: number;
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    errors?: any;
    requiredMessage?: any
    // Optional: Number of rows for the textarea
}

const CustomTextArea: React.FC<TextAreaProps> = ({
    placeholder,
    register,
    name,
    validationRules,
    error,
    rows = 3,
    disabled,// Default to 3 rows if not specified
    errors,
    requiredMessage,
    ...restProps
}) => {
    return (
        <>
            <textarea
                placeholder={placeholder}
                disabled={disabled}
                {...register(name, validationRules)}
                className={`focus:outline-none border border-[#384152] mt-2 px-3 py-2 placeholder-[#656d7a] bg-primary text-sm w-full rounded-md ${error ? "text-red-500" : ""}`}
                rows={rows}
                {...restProps}

            />
            {errors[name] && (
                <p className="text-xs text-red-500 mt-1">
                    {errors[name].message || requiredMessage}
                </p>
            )}
        </>

    );
};

export default CustomTextArea;
