"use client"

import { useEffect, useState } from "react";
import { SeleccionPredio } from "./SeleccionPredio";
import { getPredio } from "@/actions/certificaciones/certificaciones";
import { TablaPredio } from "./TablaPredio";
import { GenerarPDF } from "./GenerarPDF";

interface InfoPredio {
    id_predio: number
    cedula_catastral: string
    matricula_inmobiliaria: string
    direccion: string
    estrato: string
    barrio: string
}

interface Props {
    session: {}
}

const initialState = {
    idPredio: 0,
    lugar: ""
}

const obtenerPredio = async (idPredio: number):Promise<InfoPredio> => {
    const respuesta = await getPredio(idPredio)
      .then(res => res)
    return respuesta.respuesta[0]
  }

export const InformacionPredio = ({session}:Props) => {

    const [selected, setSelected] = useState(initialState)
    const [predio, setPredio] = useState<InfoPredio>({
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
