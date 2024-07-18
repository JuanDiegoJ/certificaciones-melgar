// UploadImageForm.js
'use client'

import Image from "next/image";
import { useState } from "react";

export const SubirImagen = () => {

    const [imageUrl, setImageUrl] = useState("/encabezado.png?timestamp=" + Date.now());
    const [key, setKey] = useState(0)

    const [file, setFile] = useState()

    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmitImage = async (event) => {
        event.preventDefault()

        try {
            const form = new FormData()
            form.set('file', file)

            const resp = await fetch('/api/upload', {
                method: "POST",
                body: form
            })

            if (resp.ok) {
                console.log("Archivo subido")
            }

            const data = await resp.json()
            setImageUrl("/encabezado.png?timestamp=" + Date.now());
        } catch (error) {
            console.log("Error")
        }
    }

    return (
        <div className="flex flex-col justify-center items-center m-3">
            <form 
                
            onSubmit={handleSubmitImage}>
                <div className="w-full text-center text-xl font-bold">
                    Cambiar imagen de pdf
                </div>
                <input
                    className="p-2 rounded-lg block mb-2"
                    type='file'
                    onChange={handleFileChange}
                />
                <div className="flex justify-center items-center">
                    <button
                    className=" text-white bg-blue-500 px-9 py-3 rounded hover:bg-blue-700 hover:text-white transition-all duration-200 disabled:opacity-50 "
                    disabled={!file}
                    >
                        Subir Imagen
                    </button>
                </div>
            </form>

            <Image
            key={key}
                src={imageUrl}
                width={200}
                height={200}
                alt="Picture of the author"
                />
            {/* {file && (
                <Image 
                    src={URL.createObjectURL(file)}
                    alt="Imagen subida"
                    className="w-full h-64 object-cover mx-auto"
                    width={250}
                    height={250}
                />
            )} */}
        </div>
    );
};

