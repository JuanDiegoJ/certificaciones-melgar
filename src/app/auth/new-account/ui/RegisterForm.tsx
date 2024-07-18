"use client"

import { login, registerUser } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormInputs = {
    id: string
    nombres: string
    apellidos: string
    email: string
    password: string
}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onsubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('')
        const { id, nombres, apellidos, email, password } = data
        const resp = await registerUser(id, nombres, apellidos, email, password)

        if (!resp.ok) {
            setErrorMessage(resp.message)
            return
        }

        await login( email.toLowerCase(), password )
        window.location.replace('/')
    }

    return (



        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col">

            <label htmlFor="cedula">Documento de identidad</label>
            <input
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.id
                        }
                    )
                }
                type="text"
                {...register('id', { required: true })}
            />

            <label htmlFor="nombres">Nombres</label>
            <input
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.nombres
                        }
                    )
                }
                type="text"
                {...register('nombres', { required: true })}
            />

            <label htmlFor="apellidos">Apellidos</label>
            <input
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.apellidos
                        }
                    )
                }
                type="text"
                {...register('apellidos', { required: true })}
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true })}
            />


            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx("px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': !!errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true })}
            />

            <span className='text-red-500'>{errorMessage}</span>
            <button

                className="btn-primary bg-blue-500">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
