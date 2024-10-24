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
  console.log(input)
    const predios = await prisma.predios.findMany({
        take:10,
        select: {
          id_predio: true,
          cedula_catastral: true,
          matricula_inmobiliaria: true,
          direccion:true
        },
        where: {
          cedula_catastral: {
            startsWith: input
          }
        }
      });
      const processedUsers = predios.map(predio => ({
        id_predio: predio.id_predio,
        lugar: `${predio.cedula_catastral}-${predio.matricula_inmobiliaria}-${predio.direccion}`
      }));
      return { respuesta: processedUsers }
}

export const getPredio = async (id_predio: number) => {
    try { // ID del usuario que quieres buscar
    
        const predio = await prisma.predios.findUnique({
          where: {
            id_predio: id_predio,
          },
        });
    
        if (predio) {
          return { respuesta: predio }
        } else {
          console.log(`No se encontró ningún usuario con el ID ${id_predio}`);
        }
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
      } finally {
        await prisma.$disconnect();
      }
    // const values = [id_predio]
    // const consulta = "SELECT id_predio, cedula_catastral , matricula_inmobiliaria, direccion, estrato, barrio "
    // + "FROM predios "
    // + "where id_predio = $1 "
    // const response = await pool.query(consulta, values)
    // return { respuesta: response.rows }
}

export const getTextos = async (tipo_consulta: string) => {
    try { // ID del usuario que quieres buscar
    
        const parametros = await prisma.m_parametros_texto.findMany({
          select:{
            tipo_texto: true,
            descripcion_texto: true
          },
          orderBy: {
            id_parametro: "asc"
          }
        });
    
        if (parametros) {
          return { respuesta: parametros }
        } else {
          console.log(`No se encontró ningún usuario con el ID ${tipo_consulta}`);
        }
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
      } finally {
        await prisma.$disconnect();
      }

}

export const getFuncionario = async () => {
    try { // ID del usuario que quieres buscar
    
        const funcionario = await prisma.m_sdp.findFirst({
          
        });
    
        if (funcionario) {
          return { respuesta: funcionario }
        } else {
          console.log(`No se encontró ningún usuario con el ID ${1}`);
        }
      } catch (error) {
        console.error('Error al buscar el usuario:', error);
      } finally {
        await prisma.$disconnect();
      }

}

export const deleteRecordsPredios = async () => {
  try {
  
      const funcionario = await prisma.predios.deleteMany();
      
      return {
        ok: true,
        message: 'Se eliminaron todos los registros de las tablas'
    }

    } catch (error) {
      console.error('Error al buscar el usuario:', error);
    } finally {
      await prisma.$disconnect();
    }
    
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
        const mes = (fecha.getMonth() < 9 ? "0" + (fecha.getMonth()+1) : (fecha.getMonth()+1).toString())

        const no_consecutivo = annio + "-" + mes + "-" + consecutivo.toString().padStart(4, '0')
        console.log(no_consecutivo)
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
