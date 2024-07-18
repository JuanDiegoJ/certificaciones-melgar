import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx';

export async function POST(request) {

    
        
    try {
        
        const data = await request.formData()
        const file = data.get('file')

        const fileReader = new FileReader().readAsArrayBuffer(file)

        

        

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