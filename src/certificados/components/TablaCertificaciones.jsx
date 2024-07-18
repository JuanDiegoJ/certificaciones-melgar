"use client"

import { consultarCertificados } from '@/actions/mantenimiento/certificaciones'
import { generarPDF } from '@/utils/certificaciones/generarPDFEstratificacion'
import React, { useEffect, useState } from 'react'

const obtenerCertificados = async (id_usuario) => {
    const respuesta = await consultarCertificados(id_usuario)
        .then(res => res)
    return respuesta
}

export const TablaCertificaciones = ({session}) => {

    const [consulta, setConsulta] = useState()

    useEffect(() => {
        obtenerCertificados(session.user.id_usuario)
            .then(res => setConsulta(res.listado))
    }, [])

    const descargarPDF = async(e) => {
        await generarPDF(e)
    } 

  return (
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
                                <span className="sr-only">Descargar</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consulta?.map(e => (
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
                                        <button disabled={!e.habilitada} onClick={() => descargarPDF(e)}><span className='font-medium text-blue-600 hover:underline'>{!e.habilitada ? 'Bloqueada': 'Descargar'}</span></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
  )
}
