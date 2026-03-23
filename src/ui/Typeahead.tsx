import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

interface TypeaheadOption {
    value: string;
    label: string;
}

interface TypeaheadProps {
    options: TypeaheadOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hasError?: boolean;
    disabled?: boolean;
}

const Typeahead: React.FC<TypeaheadProps> = ({
    options,
    value,
    onChange,
    placeholder = "Type to search...",
    hasError = false,
    disabled = false,
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync display text with selected value
    useEffect(() => {
        if (value) {
            const match = options.find(o => o.value === value);
            setQuery(match ? match.label : value);
        } else {
            setQuery('');
        }
    }, [value, options]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                // Reset query to selected value label if user didn't pick
                if (value) {
                    const match = options.find(o => o.value === value);
                    setQuery(match ? match.label : value);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [value, options]);

    const filtered = options.filter(o =>
        o.label.toLowerCase().includes(query.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(true);
        setHighlightedIndex(-1);
    };

    const handleSelect = (option: TypeaheadOption) => {
        onChange(option.value);
        setQuery(option.label);
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true);
                e.preventDefault();
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev > 0 ? prev - 1 : filtered.length - 1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                handleSelect(filtered[highlightedIndex]);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full mt-1.5 px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white ${
                    hasError ? 'border-red-500' : 'border-gray-300'
                } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                autoComplete="off"
            />
            {/* Dropdown chevron */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 mt-1 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && filtered.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {filtered.map((option, index) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                index === highlightedIndex
                                    ? 'bg-blue-50 text-blue-700'
                                    : option.value === value
                                    ? 'bg-gray-50 text-gray-900 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}

            {isOpen && query && filtered.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="px-3 py-2 text-sm text-gray-400 italic">No results found</div>
                </div>
            )}
        </div>
    );
};

export default Typeahead;
