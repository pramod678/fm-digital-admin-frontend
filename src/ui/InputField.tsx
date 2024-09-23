import * as React from 'react';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
    type: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>; // specify the correct type for your form values
    errors?: any; // specify the correct type based on your validation schema
    requiredMessage?: string;
    min?: any
    disabled?: any
    onKeyDown?: any
    step?: any
}

const InputField: FC<InputFieldProps> = ({
    type,
    name,
    placeholder,
    register,
    errors,
    requiredMessage = '',
    min,
    disabled,
    onKeyDown,
    step
}) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                min={min}
                step={step}
                disabled={disabled}
                onKeyDown={onKeyDown}
                className={`border-2 mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition ease-in-out duration-150 ${errors[name] ? 'border-red-500' : 'border-gray-300'
                    }`}
                {...register(name, {
                    required: requiredMessage,
                })}
            />
            {errors[name] && (
                <p className="text-xs text-red-500 mt-1">
                    {errors[name].message || requiredMessage}
                </p>
            )}
        </>
    );
};

export default InputField;
