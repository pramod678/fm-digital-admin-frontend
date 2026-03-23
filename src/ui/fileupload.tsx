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
        <div className="w-full">
            {file ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-100 p-4 rounded-xl">
                    <span className="text-sm font-medium text-green-700 truncate mr-2">{file.name}</span>
                    <button onClick={removeFile} className="text-red-400 hover:text-red-600 transition-colors">
                        <AiOutlineCloseCircle size={20} />
                    </button>
                </div>
            ) : (
                <div 
                    {...getRootProps()} 
                    className="flex flex-col items-center justify-center h-28 border border-dashed border-gray-400 hover:border-[#00b768] hover:bg-green-50/10 transition-all rounded-xl cursor-pointer bg-white"
                >
                    <input {...getInputProps()} />
                    <div className="text-center px-4">
                        <p className="text-xs text-gray-700 font-medium">
                            Drag & drop <span className="text-[#5b68ef]">choose file</span>
                        </p>
                        <p className="text-[10px] text-gray-500 mt-1">
                            PDF, or DOC
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FileUpload;
