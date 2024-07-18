"use client"

import { actualizarCertificado, consultarCertificados } from '@/actions/mantenimiento/certificaciones'
import React, { useEffect, useState } from 'react'

const obtenerCertificados = async () => {
    const respuesta = await consultarCertificados()
        .then(res => res)
    return respuesta
}


export const TablaDesbloqueos = () => {

    const [consulta, setConsulta] = useState()
    const [respuesta, setRespuesta] = useState()

    useEffect(() => {
        obtenerCertificados()
            .then(res => setConsulta(res.listado))
    }, [respuesta])

    const cambiarHabilitada = async(no_certificado, habilitada) => {
        setRespuesta("")
        await actualizarCertificado(no_certificado, habilitada)
            .then(res => setRespuesta(res))
        await obtenerCertificados()
            .then(res => setConsulta(res.listado))
    }

    return (
        <>
                <div className='flex flex-col justify-center items-center'>
                <span className={`text-2xl text-center ${respuesta?.ok === true ? 'text-green-500': 'text-red-500'}`}>{respuesta?.message}</span> 

                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No_Certificado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo Certificado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Documento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Desbloquear</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consulta?.map(e =>(
                                <tr key={e.no_certificado} className="bg-white border-b  hover:bg-gray-50 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {e.no_certificado}
                                    </th>
                                    <td className="px-6 py-4">
                                        Estratificación
                                    </td>
                                    <td className="px-6 py-4">
                                        {e.usuario_id}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => cambiarHabilitada(e.no_certificado, e.habilitada)} ><span className='font-medium text-blue-600 hover:underline'>{e.habilitada ? "Bloquear": "Desbloquear"}</span></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
