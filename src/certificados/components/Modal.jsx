'use client'
import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { actualizarParametro } from "@/actions/mantenimiento/certificaciones";

export const Modal = ({ showModal, setShowModal, evento, respuesta, setRespuesta }) => {

    const {formState, onInputChange, setFormState} = useForm({
        parametro: evento.descripcion_texto
    })

    useEffect(() => {
        setFormState({
            ...formState,
            parametro: evento.descripcion_texto
        })
    }, [evento])
    

    const {parametro} = formState

    const cancelar = () => {
        setFormState({
            ...formState,
            parametro: evento.descripcion_texto
        })
        setShowModal(false)
    }

    const actualizar = async() => {
        setRespuesta("")
        await actualizarParametro(evento.id_parametro, parametro)
            .then(res => setRespuesta(res))
        setShowModal(false)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modificar parámetro
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <textarea 
                                        className="w-full"
                                        rows={6}
                                        cols={50} 
                                        defaultValue={evento.descripcion_texto}
                                        type="text"
                                        placeholder="Parámetro"
                                        name="parametro"
                                        value={parametro}
                                        onChange={onInputChange}
                                    />
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
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => actualizar()}
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}