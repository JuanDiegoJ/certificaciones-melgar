'use client'

import React, { useEffect, useState } from 'react'
import { consultarParametros } from "@/actions/mantenimiento/certificaciones";
import { Tabla } from './Tabla';
import { SubirImagen } from './SubirImagen';

const obtenerParametros = async () => {
  
    const respuesta = await consultarParametros()
        .then(res => res)
    return respuesta
  }


export const AdministracionParametros = () => {

  
    const [consulta, setConsulta] = useState()
    const [respuesta, setRespuesta] = useState()
    const columnas = [
        {
            descripcion: "Cod_Texto"
        }, 
        {
            descripcion: "Descripción"
        }
    ]

    useEffect(() => {
      obtenerParametros()
            .then(res => setConsulta(res.listado))
    }, [respuesta])
    
  return (
    <div>
        <Tabla columnas={columnas} consulta={consulta} respuesta={respuesta} setRespuesta={setRespuesta}/>
        <div className={`w-full m-2 text-center ${respuesta?.ok ? 'text-green-500': 'text-red-500'}`}>{respuesta?.message}</div>
        <div>
            <SubirImagen />
        </div>
    </div>
  )
}
