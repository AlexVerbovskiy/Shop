import React, { useRef, useState, useEffect } from 'react';
import './dragDrop.css';
import { readImage } from "../utils";
const CloudDownload = ()=>(
<svg xmlns="http://www.w3.org/2000/svg" className="inline-block fill-green-500" width="120" height="120" viewBox="0 0 24 24">
        <path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z" />
    </svg>)


const DropFileInput = ({ onFileChange }) => {

    const [imgData, setImgData] = useState("");

    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile)
            readImage(newFile, (file) => {
                onFileChange(newFile);
                setImgData(file);
            })
    }

    return (
        <>
            <div
                ref={wrapperRef}
                className={`drop-file-input ${!imgData && "bg-gray-200"} mb-5`}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label justify-items-center ">
                    {imgData ? <img src={imgData} className="max-w-[600px] max-h-[200px] setted-img" />
                        : <><CloudDownload />
                            <p>Drag & Drop your files here</p></>
                    }
                </div>
                <input type="file" onChange={onFileDrop} required={true}/>
            </div>
        </>
    );
}

export default DropFileInput;