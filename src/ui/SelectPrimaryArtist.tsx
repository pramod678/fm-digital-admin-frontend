import { Controller } from 'react-hook-form';
import * as React from 'react';
import { GetPrimaryArtistApi } from '../api/releaseInfo';
import Typeahead from './Typeahead';

interface SelectProps {
    control: any;
    name: string;
    errors: any;
    required: boolean;
    id: any;
}

const SelectPrimaryArtist: React.FC<SelectProps> = ({ control, name, errors, required, id }) => {

    const { data: GetPrimaryArtist } = GetPrimaryArtistApi(id);
    const artistSource: any[] = GetPrimaryArtist?.data?.data ?? [];

    // Deduplicate
    const uniqueOptions = artistSource.filter(
        (option: any, index: number, self: any[]) =>
            self.findIndex(
                (o: any) =>
                    o.PrimaryArtist?.toLowerCase().trim() ===
                    option.PrimaryArtist?.toLowerCase().trim()
            ) === index
    );

    const typeaheadOptions = uniqueOptions.map((o: any) => ({
        value: o.PrimaryArtist,
        label: o.PrimaryArtist,
    }));

    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={{ required: required && `${name} is required` }}
                render={({ field: { onChange, value } }) => {

                    const selectedArtists: string[] =
                        value && value.trim() !== ''
                            ? value.split(',').map((v: string) => v.trim()).filter(Boolean)
                            : [];

                    const syncToForm = (artists: string[]) => {
                        onChange(artists.join(','));
                    };

                    const handleTypeaheadSelect = (picked: string) => {
                        if (!picked) return;
                        const alreadySelected = selectedArtists.some(
                            (a) => a.toLowerCase() === picked.toLowerCase()
                        );
                        if (alreadySelected) return;
                        if (selectedArtists.length >= 3) return;
                        syncToForm([...selectedArtists, picked]);
                    };

                    const handleRemove = (artistToRemove: string) => {
                        const updated = selectedArtists.filter(
                            (a) => a.toLowerCase() !== artistToRemove.toLowerCase()
                        );
                        syncToForm(updated);
                    };

                    return (
                        <div>
                            <Typeahead
                                options={typeaheadOptions}
                                value=""
                                onChange={handleTypeaheadSelect}
                                placeholder="Type to search artists..."
                                hasError={!!errors[name]}
                            />

                            {selectedArtists.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedArtists.map((artist) => (
                                        <span
                                            key={artist}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                        >
                                            {artist}
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(artist)}
                                                className="ml-1 text-blue-500 hover:text-blue-800 font-bold leading-none focus:outline-none"
                                                aria-label={`Remove ${artist}`}
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                }}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                </p>
            )}
        </>
    );
};

export default SelectPrimaryArtist;
