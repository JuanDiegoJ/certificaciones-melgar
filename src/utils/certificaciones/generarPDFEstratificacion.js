import jsPDF from 'jspdf'
import { getFuncionario, getTextos } from '@/actions/certificaciones/certificaciones'

const obtenerTextos = async (tipo_consulta) => {
    const respuesta = await getTextos(tipo_consulta)
        .then(res => res)
    return respuesta.respuesta
    }

const obtenerFuncionario = async () => {
    const respuesta = await getFuncionario()
        .then(res => res)
    return respuesta.respuesta
    }
// Función para convertir una imagen en Base64 y devolver los datos
async function convertirImagenABase64(path) {
    // Crear un nuevo elemento de imagen
    var img = new Image();
    
    // Crear una promesa para manejar la carga de la imagen y la conversión a Base64
    return new Promise((resolve, reject) => {
        // Manejar el evento onload que se dispara cuando la imagen se carga
        img.onload = function() {
            // Crear un elemento de lienzo (Canvas)
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            
            // Establecer el tamaño del lienzo para que coincida con el de la imagen
            canvas.width = this.width;
            canvas.height = this.height;
            
            // Dibujar la imagen en el lienzo
            ctx.drawImage(this, 0, 0);
            
            // Obtener los datos de la imagen en formato Base64
            var base64Data = canvas.toDataURL('image/jpeg'); // Puedes especificar el formato aquí
            
            // Resolver la promesa con los datos de la imagen en Base64
            resolve(base64Data);
        };
        
        // Manejar el evento onerror en caso de que la carga de la imagen falle
        img.onerror = function() {
            // Rechazar la promesa con un mensaje de error
            reject(new Error('Error al cargar la imagen.'));
        };
        
        // Establecer la ruta de la imagen en el atributo src del elemento de imagen
        img.src = path;
    });
}

// Ejemplo de uso
async function obtenerBase64Data(imagePath) { // Reemplaza esto con la ruta de tu imagen
    
    try {
        var base64Data = await convertirImagenABase64(imagePath);
        // Aquí puedes utilizar base64Data como desees, por ejemplo, agregarlo a un documento PDF
        return base64Data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const generarPDF = async (predio) => {

    const textos = await obtenerTextos('estratificacion')

    const doc = new jsPDF({
        format: 'letter'
    })

    var imagePath = require('../../../public/encabezado.png');
    let data = await obtenerBase64Data(imagePath.default.src)
    doc.addImage(data, 'PNG', 45.9, 10, 125, 20);

    const fecha = new Date()

    let dia = (fecha.getDay() < 10) ? "0" + fecha.getDay() : fecha.getDay()
    let mes = (fecha.getMonth() < 10) ? "0" + fecha.getMonth() : fecha.getMonth()
    let annio = fecha.getFullYear()
    let hora = (fecha.getHours() < 10) ? "0" + fecha.getHours() : fecha.getHours()
    let minutos = (fecha.getMinutes() < 10) ? "0" + fecha.getMinutes() : fecha.getMinutes()
    let segundos = (fecha.getSeconds() < 10) ? "0" + fecha.getSeconds() : fecha.getSeconds()

    let fechaCompleta = dia + "/" + mes + "/" + annio + " " + hora + ":" + minutos + ":" + segundos 

    doc.setFont("arial", "bold")
    doc.setFontSize(10)
    doc.text(`Fecha: `, 147, 45)

    doc.setFont("arial", "normal")
    doc.setFontSize(10)
    doc.text(`${fechaCompleta}`, 160, 45)

    doc.setFont("arial", "bold")
    doc.setFontSize(10)
    doc.text("No. Certificado: ", 147, 50)

    doc.setFont("arial", "normal")
    doc.setFontSize(10)
    doc.text(`${predio.no_certificado}`, 175, 50)

    doc.setFont("arial", "bold")
    doc.setFontSize(12)
    doc.text(`Dirección: `, 30, 80)

    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${predio.direccion} `, 49, 80)

    doc.setFont("arial", "bold")
    doc.setFontSize(12)
    doc.text(`Cédula catastral: `, 30, 85)

    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${predio.cedula_catastral}`, 62, 85)

    doc.setFont("arial", "bold")
    doc.setFontSize(12)
    doc.text(`Barrio/Vereda/Urbanización: `, 30, 90)

    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${predio.barrio} `, 85, 90, {maxWidth: 100, align: "left"})
    
    doc.setFont("arial", "bold")
    doc.setFontSize(12)
    doc.text(`Asunto: Certificado de estratificación `, 30, 108)

    const texto_estrato = textos[0].descripcion_texto.replace("${ESTRATO}", predio.estrato)
    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${texto_estrato}`, 30,120, {maxWidth: 159.5, align: "justify"});

    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${textos[2].descripcion_texto}`, 30,140, {maxWidth: 159.5, align: "justify"});

    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${textos[1].descripcion_texto}`, 30, 160)

    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`Coordialmente, `, 30, 195)

    var imagePathFirma = require('../../../public/firma.png'); 
    let dataFirma = await obtenerBase64Data(imagePathFirma.default.src)

    doc.addImage(dataFirma, 'PNG', 30, 200, 30, 25);

    const funcionario = await obtenerFuncionario()


    doc.setFont("arial", "normal")
    doc.setFontSize(12)
    doc.text(`${funcionario.funcionario} `, 30, 230)


    const textoFooter = `${funcionario.funcionario} / NIT: ${funcionario.nit_empresa} / CODIGO POSTAL: ${funcionario.copo} / ${funcionario.direccion} / CEL: ${funcionario.telefonos} / ${funcionario.ciudad}`

    doc.setFont("arial", "normal")
    
    doc.text(`${textoFooter}`, 111, 270, {maxWidth: 159.5, align: 'center'})

    doc.save("certificado.pdf")
    
    
}