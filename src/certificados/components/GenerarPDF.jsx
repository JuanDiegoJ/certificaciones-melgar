import { crearConsultaPredio } from '@/actions/certificaciones/certificaciones'
import React, { useState } from 'react'

export const GenerarPDF = ({predio, session}) => {

    const [estado, setEstado] = useState("")
    
    const consulta_predio = async () => {
        const resp = await crearConsultaPredio(predio, session)
        setEstado(resp) 
    }

    console.log(estado)

  return (
    <div className='flex flex-col justify-center py-3'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={consulta_predio}>Generar certificación</button>
        {
            
                (estado?.message && <span className={`${estado.ok ? 'text-green-700' : 'text-red-700' } font-bold my-3 text-center`} > {estado.message}</span>)
            
        }
        
    </div>
  )
}
