import * as React from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import cogoToast from '@successtar/cogo-toast';

const FileUpload = ({ file, setFile }: { file: any, setFile: any }) => {
    const onDrop = useCallback((acceptedFiles: any[]) => {
        const selectedFile = acceptedFiles[0];
        const fileSizeLimit = 10 * 1024 * 1024; // 10 MB in bytes
        const allowedExtensions = ['.pdf', '.doc', '.txt', '.docx']; // Allowed file extensions

        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            cogoToast.error('Invalid file format. Please upload a PDF, DOC, or TXT file.');
            setFile(null);
        } else {
            setFile(selectedFile);
        }
    }, [setFile]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className="space-y-2">
            {file && (
                <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
                    <span className="text-base ml-2">{file.name}</span>
                    <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                        <AiOutlineCloseCircle />
                    </button>
                </div>
            )}
            {!file && (
                <div {...getRootProps()} className="flex items-center justify-center h-20 border-2 border-dashed border-gray-400 rounded-md p-2">
                    <input {...getInputProps()} />
                    <p className="text-gray-600 text-sm">Drag 'n' drop a file here, or click to select a PDF, DOC, or TXT file</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
