import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <div className="w-full flex flex-grow flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center">
      <div className="flex max-w-96 min-w-80 items-center justify-center m-5 shadow-2xl">
        <div
          className="block rounded-lg bg-white shadow-secondary-1">
          <div
            className="border-b-2 border-neutral-100 px-6 py-3 text-center ">
            Certificaciones
          </div>
          <div className="p-6 flex flex-col items-center">
            <h5
              className="mb-2 text-xl font-medium leading-tight">
              Certificado de estratificación
            </h5>
            <p className="mb-4 text-base text-justify">
              Opción si requiere generar un nuevo certificado de estratificación
            </p>
            <Link
              type="button"
              href="/estratificacion"
              className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 "
              data-twe-ripple-init
              data-twe-ripple-color="light">
              Estratificación
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center m-5  shadow-2xl">
        <div
          className="block max-w-96 min-w-80 rounded-lg bg-white shadow-secondary-1">
          <div
            className="border-b-2 border-neutral-100 px-6 py-3 text-center">
            Mis certificaciones
          </div>
          <div className="p-6  flex flex-col items-center">
            <h5
              className="mb-2 text-xl font-medium leading-tight">
              Listado de certificaciones
            </h5>
            <p className="mb-4 text-base text-justify">
              Dirijase a esta opción en caso que requiera ver el listado de certificaciones generadas y poder descargar estas certificaciones
            </p>
            <Link
              type="button"
              href="mis-certificaciones"
              className="inline-block rounded bg-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 "
              data-twe-ripple-init
              data-twe-ripple-color="light">
              Mis certificados
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
