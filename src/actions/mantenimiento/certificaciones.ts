"use server"

import prisma from "@/lib/prisma"

interface Predio {
    codigo_municipio: string
    cedula_catastral: string
    matricula_inmobiliaria: string
    direccion: string
    estrato: string
    barrio: string
}

interface Predios {
    predios: []
}

export const consultarCertificados = async() => {

    try {
        
        const listado = await prisma.consultas_predios.findMany({
            orderBy: [
                {
                    fecha_consulta: 'desc'
                }
            ]
        })

        return {
            ok: true,
            listado: listado,
            message: 'Consulta exitosa'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            listado: "no hay",
            message: "No se pudo realizar la consulta"
        }
    }

}

export const consultarPredios = async() => {

    try {
        
        const listado = await prisma.predios.findMany({
            take:30,
            orderBy: [
                {
                    id_predio: 'desc'
                }
            ]
        })

        return {
            ok: true,
            listado: listado,
            message: 'Consulta exitosa'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            listado: "no hay",
            message: "No se pudo realizar la consulta"
        }
    }

}

export const actualizarCertificado = async(no_certificado: string, habilitada: boolean) => {

    try {
        
        await prisma.consultas_predios.update({
            where: {
                no_certificado: no_certificado
            },
            data: {
                habilitada: !habilitada
            }
        })

        return {
            ok: true,
            message: 'Cambio exitoso'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            message: "Hubo un problema en el cambio"
        }
    }

}

export const usuario = async(id_usuario: string) => {

    try {
        
        const listado = await prisma.consultas_predios.findMany({
            orderBy: [
                {
                    fecha_consulta: 'desc'
                }
            ],
            where: {
                usuario_id: id_usuario
            }
        })

        return {
            ok: true,
            listado: listado,
            message: 'Consulta exitosa'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            listado: "no hay",
            message: "No se pudo realizar la consulta"
        }
    }

}

export const consultarParametros = async() => {
    try {
        
        const listado = await prisma.m_parametros_texto.findMany({
            
        })

        return {
            ok: true,
            listado: listado,
            message: 'Consulta exitosa'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            listado: "no hay",
            message: "No se pudo realizar la consulta"
        }
    }
}

export const actualizarParametro = async(id_parametro: number, descripcion_texto: string) => {

    try {
        
        await prisma.m_parametros_texto.update({
            where: {
                id_parametro: id_parametro
            },
            data: {
                descripcion_texto: descripcion_texto
            }
        })

        return {
            ok: true,
            message: 'Cambio exitoso'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            message: "Hubo un problema en el cambio"
        }
    }

}

export const crearPredio = async(form: Predio ) => {

    try {
        
        await prisma.predios.create({
            data: {
                codigo_municipio: form.codigo_municipio,
                matricula_inmobiliaria: form.matricula_inmobiliaria,
                cedula_catastral: form.cedula_catastral,
                direccion: form.direccion,
                barrio: form.barrio,
                estrato: form.estrato
            }
        })

        return {
            ok: true,
            message: 'Predio creado exitosamente'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            message: "Hubo un problema en el cambio"
        }
    }

}

export const crearPredios = async(predios: Predio ) => {

    try {
        
        await prisma.predios.createMany({
            data: predios
        })

        return {
            ok: true,
            message: 'Predios creados exitosamente'
        }


    } catch (error) {
        console.log(error)

        return {
            ok: false,
            message: "Hubo un problema al cargar los predios"
        }
    }

}
