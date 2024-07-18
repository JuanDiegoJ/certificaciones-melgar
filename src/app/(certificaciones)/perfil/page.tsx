import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function PerfilPage() {

    const session = await auth()

    if (!session?.user) {
        redirect('/')
    }

    return (
        <div>
            <h1>Perfil</h1>

            <pre>
                {
                    JSON.stringify( session.user, null, 2 )
                }
            </pre>

        </div>
    );
}