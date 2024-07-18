import bcryptjs from "bcryptjs";

interface SeedUsuario{
    id: string
    email: string
    password: string
    nombres: string
    apellidos: string
    role: 'admin' | 'user'
}

interface SeedData {
    usuarios: SeedUsuario[]
}

export const initialData: SeedData = {
    usuarios: [
        {
            id: "1030676273",
            email: "jdjauregui@gmail.com",
            password: bcryptjs.hashSync("Jd970306", 10),
            nombres: "Juan Diego",
            role: 'admin',
            apellidos: "Jauregui Moreno",
        },
        {
            id: "1030676274",
            email: "prueba@gmail.com",
            password: bcryptjs.hashSync("Jd970306", 10),
            nombres: "pruebas",
            role: 'user',
            apellidos: "con nextjs"
        }
    ],
}