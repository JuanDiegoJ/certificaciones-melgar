"use server"

import prisma from "@/lib/prisma"

const {Pool} = require('pg') 

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT
})

interface Predio {
    id_predio: number
    cedula_catastral: string
    matricula_inmobiliaria: string
    direccion: string
    estrato: string
    barrio: string
}



interface Session {
    user: {
        id: string
    }
}

export const getPredios = async (input: string) => {
    const values = [`${input}%`,]
    const consulta = "SELECT id_predio, CONCAT(cedula_catastral, '-' , matricula_inmobiliaria, ' ', direccion) as lugar "
    + "FROM predios "
    + "where cedula_catastral like $1 "
    + "LIMIT 10"
    const response = await pool.query(consulta, values)
    return { respuesta: response.rows }
}

export const getPredio = async (id_predio: number) => {
    const values = [id_predio]
    const consulta = "SELECT id_predio, cedula_catastral , matricula_inmobiliaria, direccion, estrato, barrio "
    + "FROM predios "
    + "where id_predio = $1 "
    const response = await pool.query(consulta, values)
    return { respuesta: response.rows }
}

export const getTextos = async (tipo_consulta: string) => {
    const values = [tipo_consulta]
    const consulta = "SELECT tipo_texto, descripcion_texto "
    + "FROM m_parametros_texto "
    + " "
    + "order by id_parametro asc"
    const response = await pool.query(consulta)
    return { respuesta: response.rows }
}

export const getFuncionario = async () => {
    const consulta = "SELECT * "
    + "FROM m_sdp "
    const response = await pool.query(consulta)
    return { respuesta: response.rows }
}

export const crearConsultaPredio = async (predio: Predio, session: Session) =>{
    try {

        if (!session) {
            return {
                ok: false,
                message: 'Debe haber un usuario registrado para generar el certificado'
            }
        }

        let consecutivo = 0
        const ultima_consulta = await prisma.consultas_predios.findFirst({
            orderBy: [
                {
                    no_certificado: "desc"
                }
            ]
        })
        if (ultima_consulta) {
            consecutivo = parseInt(ultima_consulta.no_certificado.split('-')[2])+1
        } else {
            consecutivo = 1
        }

        const fecha = new Date()
        const annio = fecha.getFullYear()
        const mes = (fecha.getMonth() < 10 ? "0" + (fecha.getMonth()+1) : (fecha.getMonth()+1).toString())

        const no_consecutivo = annio + "-" + mes + "-" + consecutivo.toString().padStart(4, '0')

        const consulta_predio = await prisma.consultas_predios.create({
            data: {
                no_certificado: no_consecutivo,
                cedula_catastral: predio.cedula_catastral,
                matricula_inmobiliaria: predio.matricula_inmobiliaria,
                direccion: predio.direccion,
                barrio: predio.barrio,
                estrato: predio.estrato,
                usuario_id: session.user.id,
                fecha_consulta: new Date().toISOString(),
                fecha_maxima: new Date().toISOString(),
                habilitada: false,
                id_predio: predio.id_predio
            }
        })
        return {
            ok: true,
            user: consulta_predio,
            message: 'Su certificado fue solicitado, dentro de las próximas 24 horas podrá descargarlo en la pestaña Mis Certificaciones'
        }
    } catch (error) {
        console.log(error)

        return {
            ok: false,
            message: "No se pudo generar el certificado"
        }

    }

}
