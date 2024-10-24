'use client'

import React, { useEffect, useState } from 'react'
import { consultarPredios } from "@/actions/mantenimiento/certificaciones";
import {  ModalPredio } from "@/certificados";

const obtenerPredios = async () => {
    const respuesta = await consultarPredios()
        .then(res => res)
    return respuesta
}

export const TablaPredios = () => {

    const [predios, setPredios] = useState([])
    const [respuesta, setRespuesta] = useState()
    const [resp, setResp] = useState(true)

    useEffect(() => {
        obtenerPredios()
            .then(res => setPredios(res.listado))
    }, [respuesta, resp])

    console.log(resp)

    return (
        <>
            <ModalPredio setResp={setResp} />
            <h4 className="flex justify-center text-2xl font-extrabold mb-5">Predio seleccionado</h4>
            <div className="relative overflow-x-auto">
                {
                    (predios.length > 1) ? 
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
                                    predios.map(e => (
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
                                    ))
                                }
                            </tbody>
                        </table>
                    :
                        <div className='w-full justify-center items-center text-center text-lg'><p>No se han encontrado registros</p></div>
                }
            </div>
        </>
    )
}
