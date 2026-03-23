import { Controller } from 'react-hook-form';
import * as React from 'react';
import Typeahead from './Typeahead';

interface SelectProps {
    control: any;
    name: string;
    options: any;
    errors: any;
    required: boolean;
}

const SelectPriceTier: React.FC<SelectProps> = ({ control, name, options, errors, required }) => {

    const typeaheadOptions = (options || []).map((option: any) => ({
        value: option.value,
        label: option.value,
    }));

    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ required: required && `${name} is required` }}
                render={({ field: { onChange, value } }) => (
                    <Typeahead
                        options={typeaheadOptions}
                        value={value || ''}
                        onChange={onChange}
                        placeholder="Type to search price tiers..."
                        hasError={!!errors[name]}
                    />
                )}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                </p>
            )}
        </>
    );
};

export default SelectPriceTier;