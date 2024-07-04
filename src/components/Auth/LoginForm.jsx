import React, { useState } from "react";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useFormik } from "formik";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

export function LoginForm() {
  const [passwordType, setPasswordType] = useState("password");

  const handleChangePassType = (type) => {
    setPasswordType(type);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-700">
          Iniciar sesión en su cuenta
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-zinc-700"
            >
              Correo electrónico
            </label>
            <div className="relative mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={formik.handleChange}
                className="peer block w-full rounded-md border-0 text-zinc-700 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-700" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-zinc-700"
              >
                Contraseña
              </label>
              {/* <div className="text-sm">
                <a
                  href="/"
                  className="font-semibold text-zinc-700 hover:text-zinc-500"
                >
                  ¿Has olvidado tu contraseña?
                </a>
              </div> */}
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={passwordType}
                autoComplete="current-password"
                minLength={6}
                required
                onChange={formik.handleChange}
                className="peer block w-full rounded-md border-0 text-zinc-700 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-700" />
              {passwordType === "password" ? (
                <EyeIcon
                  onClick={() => handleChangePassType("text")}
                  className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-700"
                />
              ) : (
                <EyeSlashIcon
                  onClick={() => handleChangePassType("password")}
                  className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-700"
                />
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-zinc-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
