import { useState, useRef } from 'react';

interface UploadProps {
    onUpload: (file: File | null) => void;
}

const downscaleImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target?.result as string;
        }
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let { width, height } = img;

            if (height > 1920 || width > 1920) {
                const aspectRatio = width / height;
                if (height > width) {
                    height = 1920;
                    width = height * aspectRatio;
                } else {
                    width = 1920;
                    height = width / aspectRatio;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(new File([blob], file.name, { type: file.type }));
                }
            }, file.type);
        };
        reader.readAsDataURL(file);

    })
}

export default function Upload({onUpload}: UploadProps) {
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            setError('Please upload a PNG or JPG file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setError(null);
        
        const downscaled = await downscaleImage(file); 
        setPreview(URL.createObjectURL(downscaled));
        onUpload(downscaled);
    }

    const handleRemoveImage = () => {
        setPreview(null);
        onUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
    }
    
    return (
        <div className="flex flex-col space-x-4">
            <div className="flex flex-col items-center justify-center my-4">
                {preview ? (
                    <div className='relative'>
                        <img src={preview} alt="Preview" className="w-40 h-auto object-cover rounded-md" />
                        <button 
                            className="text-black absolute bottom-(0.5) right-0 hover:border-2 hover:rounded-md hover:p-1 hover:border-gray-300"
                            onClick={handleRemoveImage}
                        >Remove</button>
                    </div>
                ) : (
                    <span className='text-xs border border-gray-400 rounded-sm px-4 py-10'>No Image Selected</span>
                )}
            </div>
            <div className="flex flex-col items-center justify-start mt-2">
                <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/png, image/jpeg" 
                    onChange={handleImageChange} 
                    className="w-full border-2 border-gray-300 rounded-md p-2"
                    required
                />
                {error && <p>{error}</p>}
            </div>
            
        </div>
    )
}