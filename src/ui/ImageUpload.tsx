// FileUpload.js
import cogoToast from '@successtar/cogo-toast';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineUpload, AiOutlineCloseCircle } from 'react-icons/ai';

const FileUpload = ({ file, setFile, previewFile, preview, setPreview }: { file: any, setFile: any, previewFile?: any, preview?: any, setPreview?: any }) => {

    const onDrop = useCallback((acceptedFiles: any[]) => {
        const uploadedFile = acceptedFiles[0];

        // File type validation
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(uploadedFile.type)) {
            cogoToast.error('Only JPEG and PNG files are allowed');
            return;
        }

        // File size validation
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (uploadedFile.size > maxSize) {
            cogoToast.error('File size should be up to 2MB');
            return;
        }

        // Image dimensions validation (N x N pixels)
        const image = new Image();
        image.src = URL.createObjectURL(uploadedFile);
        image.onload = () => {
            const width = image.width;
            const height = image.height;
            if (width !== height) {
                cogoToast.error('For optimal results, ensure the image dimensions are N x N pixels');
                return;
            }
            // If all validations pass, set the file
            setFile(uploadedFile);
        };
    }, []);

    const removeFile = () => {
        if (preview) {
            setPreview(false);
        } else {
            setFile(null);
        }

    };


    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className="relative">
                <div
                    {...getRootProps()}
                    className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md"
                >
                    <input {...getInputProps()} />
                    {(!file && !preview) ? (
                        <>
                            <AiOutlineUpload className="text-4xl text-gray-400" />
                            <p className="text-gray-400 mt-1 text-center">Drag & drop a file here or click to upload</p>
                        </>
                    ) : (
                        <>
                            {
                                preview ? (
                                    <>
                                        <img
                                            src={`https://api.fmdigitalofficial.com/${previewFile}`}
                                            alt="Preview"
                                            className="h-32 w-full object-contain rounded-md"
                                        />
                                    </>
                                ) : (
                                    <>
                                        {file?.type?.startsWith('image/') ? (
                                            <img
                                                src={preview ? `https://api.fmdigitalofficial.com/${previewFile}` : URL.createObjectURL(file)}
                                                alt="Preview"
                                                className="h-32 w-full object-contain rounded-md"
                                            />
                                        ) : (
                                            <div className="h-32 flex items-center justify-center">
                                                <p className="text-gray-400">File type not supported</p>
                                            </div>
                                        )}
                                    </>
                                )
                            }

                        </>
                    )}
                </div>

                {(file || preview) && (
                    <button
                        onClick={removeFile}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                    >
                        <AiOutlineCloseCircle className="text-xl text-red-500" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
