import React from 'react'

export const Titulos = () => {
  return (
    <div className="flex flex-col ">
        <h2 className="text-4xl flex justify-center font-extrabold mb-5">Certificado de estratificación</h2>
        <p className="my-4 text-lg text-justify mb-5 text-gray-900">Seleccione el predio por medio de la <b>lista desplegable</b>,
            revise la <b>información del predio</b> y oprima el botón <b>{"\'Generar certificado\'"}</b>.
            De esta manera podrá generar el certificado de estratificación de su predio </p>
    </div>
  )
}
