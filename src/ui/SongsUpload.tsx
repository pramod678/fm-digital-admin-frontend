import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import cogoToast from '@successtar/cogo-toast';


const SongsUpload = ({ file, setFile }: { file: any, setFile: any }) => {

    const onDrop = useCallback((acceptedFiles: any[]) => {
        const selectedFile = acceptedFiles[0];
        const fileSizeLimit = 100 * 1024 * 1024; // 95 MB in bytes
        const allowedExtensions = ['.mp3', '.wav']; // Allowed file extensions


        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

        if (selectedFile.size > fileSizeLimit) {
            cogoToast.error('File size exceeds 100 MB limit.');
            setFile(null);
        } else if (!allowedExtensions.includes(fileExtension)) {
            cogoToast.error('Invalid file format. Please upload an MP3 or WAV file.');
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
        <div className="space-y-2 w-full">
            {file && (
                <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-md shadow-sm">
                    <div className="flex flex-col w-full">
                        <span className="text-sm font-medium text-gray-700 ml-2 mb-2 line-clamp-1">{file.name}</span>
                        <audio controls className="outline-none h-10 w-full mb-1">
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                    <button type="button" onClick={removeFile} className="ml-4 text-gray-400 hover:text-red-500 transition-colors p-1" title="Remove Audio">
                        <AiOutlineCloseCircle size={24} />
                    </button>
                </div>
            )}
            {!file && (
                <div className="flex flex-col space-y-2 w-full">
                    <div {...getRootProps()} className="w-full flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 hover:border-blue-400 transition-all">
                        <input {...getInputProps()} />
                        <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                            <span className="text-sm font-medium">Click to upload or drag audio file here</span>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">MP3, WAV up to 100MB</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SongsUpload;
