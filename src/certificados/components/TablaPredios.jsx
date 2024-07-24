'use client'

import React, { useEffect, useState } from 'react'
import { consultarPredios } from "@/actions/mantenimiento/certificaciones";

const obtenerPredios = async () => {
    const respuesta = await consultarPredios()
        .then(res => res)
    return respuesta
}

export const TablaPredios = () => {

    const [predios, setPredios] = useState([])
    const [respuesta, setRespuesta] = useState()

    useEffect(() => {
        obtenerPredios()
            .then(res => setPredios(res.listado))
    }, [respuesta])


    return (
        <>
            <h4 className="flex justify-center text-2xl font-extrabold mb-5">Predio seleccionado</h4>
            <div className="relative overflow-x-auto">

                <table className="w-full text-base text-left rtl:text-right text-gray-500 mb-5" >
                    <thead className="text-base text-gray-900 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Cédula Catastral
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Matrícula inmobiliaria
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dirección
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (predios.length > 1) ?
                                <>
                                    {predios.map(e => (
                                        <>
                                            <tr className="bg-white ">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    {e?.cedula_catastral}
                                                </th>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {e?.matricula_inmobiliaria}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {e?.direccion}
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </>
                                :
                                <tr className="bg-white ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        <div className='text-center w-full'> Cargando registros </div>
                                    </th>
                                    
                                </tr>

                        }


                    </tbody>
                </table>
            </div>
        </>
    )
}
