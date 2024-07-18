export const formatoInput = (tipo, valor) => {

    switch (tipo) {
        case "cedula_catastral":
            if (valor.length > 2) {
                valor = valor.substring(0, 2) + '-' + valor.substring(2);
            }
            if (valor.length > 5) {
                valor = valor.substring(0, 5) + '-' + valor.substring(5);
            }
            if (valor.length > 10) {
                valor = valor.substring(0, 10) + '-' + valor.substring(10);
            }
            if (valor.length > 15) {
                valor = valor.substring(0, 15) + '-' + valor.substring(15);
            }
            break;

        case "matricula_inmobiliaria":
            if (valor.length > 3) {
                valor = valor.substring(0, 3) + '-' + valor.substring(3);
            }
            break;

        default:
            break;
    }

    return valor

}