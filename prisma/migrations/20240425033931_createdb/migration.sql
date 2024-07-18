-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "Consulta" AS ENUM ('estratificacion', 'nomenclatura');

-- CreateTable
CREATE TABLE "m_sdp" (
    "id_funcionario" SERIAL NOT NULL,
    "funcionario" VARCHAR(70) NOT NULL,
    "cargo_funcionario" VARCHAR(40) NOT NULL,
    "genero" VARCHAR(10) NOT NULL,
    "profesion" VARCHAR(40) NOT NULL,
    "ciudad" VARCHAR(20) NOT NULL,
    "web" VARCHAR(100) NOT NULL,
    "area" VARCHAR(30) NOT NULL,
    "copo" VARCHAR(6) NOT NULL,
    "direccion" VARCHAR(70) NOT NULL,
    "telefonos" VARCHAR(50) NOT NULL,
    "nit_empresa" VARCHAR(15) NOT NULL,

    CONSTRAINT "m_sdp_pkey" PRIMARY KEY ("id_funcionario")
);

-- CreateTable
CREATE TABLE "m_parametros_graficos" (
    "id_grafico" SERIAL NOT NULL,
    "tipo_grafico" VARCHAR(20) NOT NULL,
    "path_grafico" VARCHAR(100) NOT NULL,
    "descripcion_grafivo" VARCHAR(100) NOT NULL,

    CONSTRAINT "m_parametros_graficos_pkey" PRIMARY KEY ("id_grafico")
);

-- CreateTable
CREATE TABLE "m_parametros_texto" (
    "id_parametro" SERIAL NOT NULL,
    "tipo_texto" VARCHAR(20) NOT NULL,
    "descripcion_texto" VARCHAR(1000) NOT NULL,
    "tipo_consulta" "Consulta" NOT NULL DEFAULT 'estratificacion',

    CONSTRAINT "m_parametros_texto_pkey" PRIMARY KEY ("id_parametro")
);

-- CreateTable
CREATE TABLE "predios" (
    "id_predio" SERIAL NOT NULL,
    "codigo_municipio" VARCHAR(10) NOT NULL,
    "cedula_catastral" VARCHAR(50) NOT NULL,
    "matricula_inmobiliaria" VARCHAR(20) NOT NULL,
    "direccion" VARCHAR(100) NOT NULL,
    "estrato" VARCHAR(30) NOT NULL,
    "barrio" VARCHAR(100) NOT NULL,

    CONSTRAINT "predios_pkey" PRIMARY KEY ("id_predio")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" VARCHAR(25) NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" VARCHAR(100) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas_predios" (
    "no_certificado" VARCHAR(25) NOT NULL,
    "cedula_catastral" VARCHAR(50) NOT NULL,
    "matricula_inmobiliaria" VARCHAR(20) NOT NULL,
    "direccion" VARCHAR(100) NOT NULL,
    "estrato" VARCHAR(30) NOT NULL,
    "barrio" VARCHAR(100) NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo_consulta" "Consulta" NOT NULL DEFAULT 'estratificacion',
    "fecha_consulta" TIMESTAMP(3) NOT NULL,
    "fecha_maxima" TIMESTAMP(3) NOT NULL,
    "habilitada" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "consultas_predios_pkey" PRIMARY KEY ("no_certificado")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "consultas_predios" ADD CONSTRAINT "consultas_predios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
