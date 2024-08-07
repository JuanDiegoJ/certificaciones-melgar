import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function PerfilPage() {

    const session = await auth()

    if (!session?.user) {
        redirect('/')
    }

    return (
        <>
            
            <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Información usuario
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Detalle e información del usuario
                    </p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Nombres completos
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {`${session.user.nombres} ${session.user.apellidos}`}
                            </dd>
                        </div>
                        
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Correo
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {`${session.user.email}`}
                            </dd>
                        </div>
                        
                    </dl>
                </div>
            </div>
        </>
    );
}