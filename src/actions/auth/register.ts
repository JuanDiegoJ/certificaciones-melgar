"use server"

import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs';

export const registerUser = async( 
    id:string, nombres:string, apellidos:string, email:string, password:string ) => {

        try {
            const user = await prisma.usuarios.create({
                data: {
                    id,
                    nombres,
                    apellidos,
                    email,
                    password: bcryptjs.hashSync( password )
                }, 
                select: {
                    nombres: true,
                    apellidos: true
                }
            })
            return {
                ok: true,
                user: user,
                message: 'Usuario creado con éxito'
            }
        } catch (error) {
            console.log("error")

            return {
                ok: false,
                message: "No se pudo crear el usuario"
            }

        }


}