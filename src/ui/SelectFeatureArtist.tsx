import { Controller } from 'react-hook-form';
import * as React from 'react';
import { GetFeaturingArtistApi } from '../api/releaseInfo';



interface SelectProps {
    control: any;
    name: string;
    errors: any;
    required: boolean;
    id:any
}

const SelectFeatureArtist: React.FC<SelectProps> = ({ control, name, errors, required, id }) => {

    const { data: GetFeaturingArtist } = GetFeaturingArtistApi(id)
    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ required: required && `${name} is required` }}
                render={({ field: { onChange, value } }) => (
                    <select
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                        className={`border-2 mt-2 px-3 py-2 placeholder-gray-400 text-gray-700 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition ease-in-out duration-150 ${errors[name] ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="" >
                            Select a Option
                        </option>
                        {GetFeaturingArtist?.data?.data?.map((option: any) => (
                            <option key={option._id} className="text-black" value={option.FeaturingArtist}>
                                {option.FeaturingArtist}
                            </option>
                        ))}
                    </select>
                )}
            />
            {
                errors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors[name].message}
                    </p>
                )
            }
        </>
    );
};

export default SelectFeatureArtist;
