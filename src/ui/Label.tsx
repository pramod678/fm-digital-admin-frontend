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
            className={`text-mainColor my-2 font-semibold mb-2 text-xs sm:text-sm sm:my-1 lg:text-sm lg:my-3 ${additionalClasses}`}
            htmlFor={htmlFor}
        >
            {text}
            {required && <span className="text-red-500">*</span>}
        </label>
    );
};

export default Label;

