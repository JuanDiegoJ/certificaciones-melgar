"use client"

import { useEffect, useState } from "react";
import { SeleccionPredio } from "./SeleccionPredio";
import { getPredio } from "@/actions/certificaciones/certificaciones";
import { TablaPredio } from "./TablaPredio";
import { GenerarPDF } from "./GenerarPDF";

const initialState = {
    idPredio: 0,
    lugar: ""
}

const obtenerPredio = async (idPredio) => {
    const respuesta = await getPredio(idPredio)
      .then(res => res)
    return respuesta.respuesta
  }

export const InformacionPredio = ({session}) => {

    const [selected, setSelected] = useState(initialState)
    const [predio, setPredio] = useState({
        id_predio: 0,
        cedula_catastral: "",
        matricula_inmobiliaria: "",
        direccion: "",
        estrato: "",
        barrio: "",
    })

    useEffect(() => {
        if (selected.idPredio > 0) {
            obtenerPredio(selected.idPredio)
                .then(res => setPredio(res))
            
        }
    }, [selected])
    

    return (
        <>
            <SeleccionPredio selected={selected} setSelected={setSelected} />
            {
                selected.idPredio > 0
                    ?
                    <>
                        <TablaPredio predio={predio}/>
                        <GenerarPDF predio={predio} session={session}/>
                    </>
                    :
                    <></>
            }
        </>
    )
}
