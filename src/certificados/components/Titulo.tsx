import React from 'react'

interface Props {
  titulo: string
  descripcion: string
}

export const Titulo = ({titulo, descripcion}:Props) => {
  return (
    <div className="flex flex-col ">
          <h2 className="text-4xl flex justify-center font-extrabold mb-5">{titulo}</h2>
          <p className="my-2 text-lg text-center mb-5 text-gray-900">{descripcion}</p>
      </div>
  )
}
