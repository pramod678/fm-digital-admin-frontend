import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import * as React from 'react';

const ConfirmationButton = ({ children, onConfirm, title }: { children: any, onConfirm?: any, title?:any }) => {
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const handleConfirm = () => {
        onConfirm();
        setIsConfirmationModalOpen(false);
    };

    const handleCancel = () => {
        setIsConfirmationModalOpen(false);
    };

    return (
        <>
            <span
                className="cursor-pointer"
                onClick={() => setIsConfirmationModalOpen(true)}
            >
                {children}
            </span>

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                title={title}
                message="Please confirm the action before proceeding."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </>
    );
};

export default ConfirmationButton;
