
import { auth } from "@/auth.config";
import { AdministracionParametros } from "@/certificados";
import { Titulo } from "@/certificados/components/Titulo";
import { redirect } from "next/navigation";


export default async function MisCertificacionesPage() {

  const session = await auth()

  if (session?.user.role === 'user') {
    redirect('/')
  }

  return (
    <>
      <Titulo titulo="Edición de parámetros y archivos de certificados" descripcion="En esta sección podrá modificar los textos e imágenes del certificado de estratificación" />
        
      <AdministracionParametros />
    </>


  );
}