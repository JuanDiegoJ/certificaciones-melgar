'use client'

import { useRef, useState } from "react";
import { FaPlus, FaUpload, FaRegTrashCan } from "react-icons/fa6";
import * as XLSX from 'xlsx';
import { crearPredios } from "@/actions/mantenimiento/certificaciones";
import { deleteRecordsPredios } from "@/actions/certificaciones/certificaciones";

export const Botones = ({ setShowModal, setResp }) => {

    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    };

    const [respuesta, setRespuesta] = useState()

    const handleFileChange = async (event) => {
        
        event.preventDefault()
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        try {
            fileReader.onload = async(e) => {
                const bufferArray = e.target.result;
                
                const workbook = XLSX.read(bufferArray, {
                    type: "buffer"
                });
                const hoja = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[hoja]
                let info = XLSX.utils.sheet_to_json(worksheet)
                
                info = info.map(row => {
                    const newRow = {};
                    Object.keys(row).forEach(key => {
                      newRow[key] = String(row[key]);
                    });
                    return newRow;
                  });
    
    
                await crearPredios(info)
                    .then(res => setRespuesta(res))
                  
            setResp(resp => !resp)
                
            };
        } catch (error) {
            setRespuesta("Error al cargar los predios")
        }
        
    };

    const deleteRecord = async (event) => {
        
        event.preventDefault()
        try {
            
            await deleteRecordsPredios()
            .then(res => setRespuesta(res))
            setResp(resp => !resp)
        } catch (error) {
            setRespuesta("Error al cargar los predios")
        }
        
    };

    return (
        <div className="">
            <input
                type="file"
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button onClick={() => setShowModal(true)} className="text-white w-52 rounded-full bg-blue-500 px-6 py-3 m-2 hover:bg-blue-800 transition-all duration-300">
                <div className="flex justify-center font-semibold items-center w-full">
                    <FaPlus size={20} className="mr-1" />
                    <div>Agregar Predio</div>
                </div>
            </button>
            <button onClick={handleClick} className="text-blue-600 w-52 rounded-full outline outline-blue-500 px-6 py-3  hover:bg-blue-600 hover:text-white hover:outline-none transition-all duration-300">
                <div className="flex justify-center font-semibold items-center w-full">
                    <FaUpload size={20} className="mr-1" />
                    <div>Importar listado</div>
                </div>
            </button>
            <button onClick={deleteRecord} className="text-red-600 w-52 rounded-full outline outline-red-500 px-6 py-3 m-2 hover:bg-red-600 hover:text-white hover:outline-none transition-all duration-300">
                <div className="flex justify-center font-semibold items-center w-full">
                    <FaRegTrashCan size={20} className="mr-1" />
                    <div>Eliminar registros</div>
                </div>
            </button>
            <div className="w-full text-xl font-bold"><span>{respuesta?.message ? respuesta?.message : ""}</span></div>
        </div>
    )
}
