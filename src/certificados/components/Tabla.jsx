"use client"

import { consultarCertificados } from '@/actions/mantenimiento/certificaciones'
import { generarPDF } from '@/utils/certificaciones/generarPDFEstratificacion'
import React, { useEffect, useState } from 'react'
import { Modal } from './Modal'

export const Tabla = ({columnas, consulta, respuesta, setRespuesta}) => {

    const [showModal, setShowModal] = useState(false);
    const [parametro, setParametro] = useState('')


    const editarParametro = (e) => {
        setShowModal(true)
        setParametro(e)
    }

    return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        
        <Modal showModal={showModal} setShowModal={setShowModal} evento={parametro} respuesta={respuesta} setRespuesta={setRespuesta} />
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            {
                                columnas?.map((e, idx) => (
                                    <th key={idx} scope="col" className="px-6 py-3">
                                        {e.descripcion}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consulta?.map(e => (
                                <tr key={e.tipo_texto} className="bg-white border-b  hover:bg-gray-50 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {e.tipo_texto}
                                    </th>
                                    <td className="px-6 py-4">
                                        {e.descripcion_texto}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => editarParametro(e)}><span className='font-medium text-blue-600 hover:underline'>Editar</span></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
  )
}
