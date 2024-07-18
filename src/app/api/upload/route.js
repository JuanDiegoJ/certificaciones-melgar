import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();



export async function POST(request) {

    console.log(publicRuntimeConfig.imageBaseUrl)

    try {
        const data = await request.formData()
        const file = data.get('file')

        if (!file.name.toLowerCase().includes('.png')) {
            return NextResponse.json(
                JSON.stringify(
                    {
                        message: "El archivo debe ser formato .png"
                    }), {
                status: 400
            })
        }
        
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), "public", "encabezado.png")

        writeFile(filePath, buffer)

        return new Response(JSON.stringify({
            message: 'Archivo guardado'
        }))
    } catch (error) {
        return NextResponse.json(
            JSON.stringify({
                message: "No se encontró el archivo"
            }), {
            status: 400
        }
        )
    }

}