"use client"

import { getPredios } from "@/actions/certificaciones/certificaciones";
import { useEffect, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

const obtenerPredios = async (input) => {
    const respuesta = await getPredios(input)
        .then(res => res)
    return respuesta.respuesta
}

export const SeleccionPredio = ({ selected, setSelected }) => {

    const [predios, setPredios] = useState([])
    const [inputValue, setinputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        obtenerPredios(inputValue)
            .then(resp => setPredios(resp))
        setIsLoading(false)
    }, [inputValue])

    return (
        <>
            <h4 className="flex justify-center text-2xl font-extrabold mb-5">Selección de predio</h4>
            <div className="w-100 font-medium mb-5">
                <div
                    className={`bg-white w-full p-2 shadow-lg
                flex items-center justify-between rounded
                ${!selected.lugar && "text-gray-700"}`
                    }
                    onClick={() => setOpen(!open)}
                >
                    {selected.idPredio > 0 ? selected.lugar : "Seleccionar predio"}
                    <BiChevronDown size={20} className={`transition-all duration-300 ${open && "rotate-180"}`} />
                </div>
                <ul
                    className={`bg-white mt-2 overflow-y-auto transition-all duration-300
                ${open ? "max-h-80" : "max-h-0"}
            `}>
                    <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-gray-700" />
                        <input
                            value={inputValue}
                            onChange={(e) => setinputValue(e.target.value.toLowerCase())}
                            type="text"
                            placeholder="Busque el predio"
                            className="placeholder:text-gray-700 p-2 outline-none"
                        />
                    </div>
                    {
                        isLoading ?
                            <li>
                                Cargando lista
                            </li>
                            :
                            <>
                                {
                                    predios?.map(p => (
                                        <>
                                            <li
                                                key={p.id_predio}
                                                className={`p-2 text-sm hover:bg-sky-600 hover:text-white
                                                ${p?.id_predio === selected.idPredio && "bg-sky-600 text-white"} `}
                                                onClick={() => {
                                                    if (p?.id_predio !== selected.idPredio) {
                                                        console.log(p)
                                                        setSelected({ idPredio: p.id_predio, lugar: p.lugar })
                                                        setOpen(false)
                                                        setinputValue("")
                                                    }
                                                }
                                                }
                                            >
                                                {p.lugar}
                                            </li>
                                        </>
                                    ))
                                }
                            </>
                    }
                </ul>
            </div>
        </>
    )
}
