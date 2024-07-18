import { auth } from "@/auth.config";
import { Botones, ModalPredio, TablaCertificaciones } from "@/certificados";
import { TablaPredio } from "@/certificados/components/TablaPredio";
import { Titulo } from "@/certificados/components/Titulo";
import { redirect } from "next/navigation";

export default async function MisCertificacionesPage() {

  const session = await auth()

  if (session?.user.role === 'user') {
    redirect('/')
  }

  return (
    <>
      <Titulo titulo="Predios" descripcion="Podrá agregar o importar un listado de predios"/>
      <ModalPredio />
      <TablaPredio />
    </>
  );
}