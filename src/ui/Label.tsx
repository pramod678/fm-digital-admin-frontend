import * as React from 'react';
import { FC } from 'react';

interface LabelProps {
    text: string;
    htmlFor: string;
    additionalClasses?: string;
    required?: boolean;
}

const Label: FC<LabelProps> = ({ text, htmlFor, additionalClasses = '', required = false }) => {
    return (
        <label
            className={`text-mainColor typo-table-cell-strong mb-1 block ${additionalClasses}`}
            htmlFor={htmlFor}
        >
            {text}
            {required && <span className="text-red-500">*</span>}
        </label>
    );
};

export default Label;

