import * as React from 'react';
import  { FC } from 'react';

interface LabelProps {
    text: string;
    htmlFor: string;
    additionalClasses?: string;
}

const Label: FC<LabelProps> = ({ text, htmlFor, additionalClasses = '' }) => {
    return (
        <label
            className={`text-mainColor my-2 font-semibold mb-2 sm:text-sm sm:my-1 lg:text-sm lg:my-3 ${additionalClasses}`}
            htmlFor={htmlFor}
        >
            {text}
        </label>
    );
};

export default Label;
