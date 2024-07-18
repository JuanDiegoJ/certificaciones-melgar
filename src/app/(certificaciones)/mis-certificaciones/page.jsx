import { auth } from "@/auth.config";
import { TablaCertificaciones } from "@/certificados";
import { Titulo } from "@/certificados/components/Titulo";

export default async function MisCertificacionesPage() {

  const session = await auth()

  return (
    <>
      <Titulo titulo="Mis Certificaciones" descripcion="Seleccione la certificación que desea descargar"/>
        
      <TablaCertificaciones session={session} />
    </>


  );
}