import { formatoInput } from "@/utils"
import { useState } from "react"

export const useForm = (initialForm) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onInputChangeFormateado = ({ target }) => {
        const { name, value } = target
        let valor = value.replace(/\D/g, '');
        valor = formatoInput(name, valor)
        setFormState({
            ...formState,
            [name]: valor
        })
    }

    return {
        formState,
        onInputChange,
        setFormState,
        onInputChangeFormateado
    }

}
