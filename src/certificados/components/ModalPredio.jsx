'use client'
import React, { useState } from 'react'
import { useForm } from "../../hooks/useForm";
import { crearPredio } from "@/actions/mantenimiento/certificaciones";
import { Botones } from './Botones';

export const ModalPredio = () => {

    const [showModal, setShowModal] = useState(false)
    const [respuesta, setRespuesta] = useState()

    const { formState, onInputChange, onInputChangeFormateado } = useForm({
        codigo_municipio: '',
        cedula_catastral: '',
        matricula_inmobiliaria: '',
        direccion: '',
        estrato: '',
        barrio: ''
    })

    const cancelar = () => {
        setShowModal(false)
    }

    const actualizar = async() => {
        await crearPredio(formState)
            .then(res => setRespuesta(res))
        setShowModal(false)
    }

    const {codigo_municipio, cedula_catastral, matricula_inmobiliaria, direccion, estrato, barrio} = formState

    return (
        <>
            <Botones setShowModal={setShowModal}/>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-2/3 my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Agregar predio
                                    </h3>
                                </div>
                                {/*body*/}

                                <div className="p-6 flex flex-wrap">

                                    <div className="mb-5 px-2 flex flex-col w-full sm:w-1/2 lg:w-1/3">
                                        <label htmlFor="codigo_municipio" className="mb-2 text-sm font-medium text-gray-900 ">Código municipio</label>
                                        <input type="text" id="codigo_municipio" maxLength={5} minLength={5} value={codigo_municipio} name='codigo_municipio' onChange={onInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 " placeholder="" required />
                                    </div>
                                    <div className="mb-5 px-2 flex flex-col w-full sm:w-1/2 lg:w-1/3">
                                        <label htmlFor="cedula_catastral" className="mb-2 text-sm font-medium text-gray-900 ">Cédula catastral</label>
                                        <input type="text" value={cedula_catastral} maxLength={19} minLength={19} name='cedula_catastral' onChange={onInputChangeFormateado} id="cedula_catastral" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 " placeholder="" required />
                                    </div>
                                    <div className="mb-5 px-2 flex flex-col w-full sm:w-1/2 lg:w-1/3">
                                        <label htmlFor="matricula_inmobiliaria" className="mb-2 text-sm font-medium text-gray-900 ">Matrícula inmobiliaria</label>
                                        <input type="text" value={matricula_inmobiliaria}  maxLength={9} minLength={9} id="matricula_inmobiliaria" name='matricula_inmobiliaria' onChange={onInputChangeFormateado} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 " placeholder="" required />
                                    </div>

                                    <div className="mb-5 px-2 flex flex-col w-full sm:w-1/2 ">
                                        <label htmlFor="barrio" className="mb-2 text-sm font-medium text-gray-900 ">Barrio</label>
                                        <input type="text" id="barrio" value={barrio} name='barrio' onChange={onInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 " placeholder="" required />
                                    </div>
                                    <div className="mb-5 px-2 flex flex-col w-full sm:w-1/2 ">
                                        <label htmlFor="estrato" className="mb-2 text-sm font-medium text-gray-900 ">Estrato</label>
                                        <input type="text" id="estrato" value={estrato} name='estrato' onChange={onInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 " placeholder="" required />
                                    </div>
                                    <div className="mb-5 px-2 flex flex-col w-full ">
                                        <label htmlFor="direccion" className="mb-2 text-sm font-medium text-gray-900 ">Dirección</label>
                                        <input type="text" id="direccion" value={direccion} name='direccion' onChange={onInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 " placeholder="" required />
                                    </div>



                                </div>



                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => cancelar()}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-700 hover:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => actualizar()}
                                    >
                                        Crear
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}
