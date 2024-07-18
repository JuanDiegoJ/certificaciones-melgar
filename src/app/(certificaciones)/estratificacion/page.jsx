
import { auth } from "@/auth.config";
import { Titulos, SeleccionPredio, InformacionPredio } from "@/certificados";

export default async function EstratificacionPage() {

  const session = await auth()

  return (
    <>
      <div className="m-7">
        <Titulos />
        <InformacionPredio session={session}/>   
      </div>
    </>
  );
}