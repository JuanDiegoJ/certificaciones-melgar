import { auth } from "@/auth.config";
import { TablaDesbloqueos, Titulo } from "@/mantenimiento";
import { redirect } from "next/navigation";

export default async function EstratificacionPage() {

  const session = await auth()

  if (session?.user.role === 'user') {
    redirect('/')
  }

  return (
    <>
      <div className="m-7">
        <Titulo />
        <TablaDesbloqueos />

      </div>
    </>
  );
}