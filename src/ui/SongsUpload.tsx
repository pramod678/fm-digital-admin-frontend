import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';


const SongsUpload = ({ file, setFile }: { file: any, setFile: any }) => {

    const onDrop = useCallback((acceptedFiles: any[]) => {
        setFile(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    const removeFile = () => {
        setFile(null);
    };

    return (
        <div className="space-y-2">
            {file && (
                <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
                    <span className="text-sm">{file.path}</span>
                    <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                        <AiOutlineCloseCircle />
                    </button>
                </div>
            )}
            {
                !file && (
                    <div {...getRootProps()} className="flex items-center justify-center h-20 border-2 border-dashed border-gray-400 rounded-md p-2">
                        <input {...getInputProps()} />
                        <p className="text-gray-600 text-sm">Drag 'n' drop a file here, or click to select a file</p>
                    </div>
                )
            }
            
        </div>
    );
};

export default SongsUpload;


