/** @type {import('next').NextConfig} */
const nextConfig = {

    publicRuntimeConfig: {
        // Define la ruta base para las imágenes en producción
        imageBaseUrl: '/',
      },
      experimental: {
        serverActions: {
          bodySizeLimit: '4mb',
        },
      },

};

export default nextConfig;
