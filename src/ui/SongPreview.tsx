import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import cogoToast from '@successtar/cogo-toast';
import useResponsiveIconSize from '../hooks/useResponsiveIconSize';


const SongPreview = ({ file, setFile, previewFile, preview, setPreview }: { file: any, setFile: any, previewFile?: any, preview?: any, setPreview?: any }) => {

    const size = useResponsiveIconSize();

    const onDrop = useCallback((acceptedFiles: any[]) => {
        const selectedFile = acceptedFiles[0];
        const fileSizeLimit = 95 * 1024 * 1024; // 95 MB in bytes
        const allowedExtensions = ['.mp3', '.wav']; // Allowed file extensions


        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

        if (selectedFile.size > fileSizeLimit) {
            cogoToast.error('File size exceeds 95 MB limit.');
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

    const handlePreview = () => {
        setPreview(false);
    };

    return (
        <div className="space-y-2">
            {file && (
                <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
                    <div className="flex flex-col">
                        <span className="text-base ml-2">{file.name}</span>
                        <audio controls className="outline-none mt-2 h-8">
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                    <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                        <AiOutlineCloseCircle />
                    </button>
                </div>
            )}
            {
                !file && preview && <div className="flex items-center justify-between bg-gray-200 p-2 rounded-md">
                    <div className="flex">
                        <audio controls className="outline-none h-8 w-full md:w-64">
                            <source src={`https://api.fmdigitalofficial.com/${previewFile}`} />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                    <button onClick={handlePreview} className="text-red-500 hover:text-red-700">
                        <AiOutlineCloseCircle size={size} />
                    </button>
                </div>
            }
            {!file && !preview && (
                <div {...getRootProps()} className="flex items-center justify-center h-20 border-2 border-dashed border-gray-400 rounded-md p-2">
                    <input {...getInputProps()} />
                    <p className="text-gray-600 text-sm">Drag 'n' drop a file here, or click to select a file</p>
                </div>
            )}
        </div>
    );
};

export default SongPreview;
