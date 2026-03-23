import { Controller } from 'react-hook-form';
import * as React from 'react';
import { GetLanguagesApi } from '../api/releaseInfo';
import Typeahead from './Typeahead';

interface SelectProps {
    control: any;
    name: string;
    errors: any;
    required: boolean;
}

const SelectLanguage: React.FC<SelectProps> = ({ control, name, errors, required }) => {
    const { data: getLanguages } = GetLanguagesApi();

    const typeaheadOptions = (getLanguages?.data?.data || []).map((option: any) => ({
        value: option.language,
        label: option.language,
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
                        placeholder="Type to search languages..."
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

export default SelectLanguage;
