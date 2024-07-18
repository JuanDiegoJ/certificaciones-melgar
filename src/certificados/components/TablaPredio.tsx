import React from 'react'

interface Props {
    predio: {
        id_predio: number
        cedula_catastral: string
        matricula_inmobiliaria: string
        direccion: string
        estrato: string
        barrio: string
    }
}

export const TablaPredio = ({predio}: Props) => {
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
                        <tr className="bg-white ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                {predio?.cedula_catastral}
                            </th>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {predio?.matricula_inmobiliaria}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {predio?.direccion}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
