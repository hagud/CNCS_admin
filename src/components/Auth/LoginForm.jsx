import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authThunk } from "../../redux/thunks/auth.thunk";
import { initialValues, validationSchema } from "./LoginForm.form";
import { useFormik } from "formik";
import { Button, Form, Icon, Image, Input } from "semantic-ui-react";

export function LoginForm() {
  const { loading } = useSelector((state) => state.auth);
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();

  const handleChangePassType = (type) => {
    setPasswordType(type);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        dispatch(authThunk(formValue));
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-96">
      <h2 className="flex justify-center items-center gap-2 text-center text-2xl font-black">
        Bienvenido a <Image src="/logo.png" size="tiny" />
      </h2>
      <Form
        loading={loading}
        onSubmit={formik.handleSubmit}
        className="w-full lg:w-1/4 md:w-1/2"
      >
        <Form.Field>
          <label htmlFor="email">Correo electronico</label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            icon={"at"}
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Contraseña</label>
          <Input
            id="password"
            name="password"
            type={passwordType}
            autoComplete="current-password"
            minLength={6}
            required
            icon={
              passwordType === "password" ? (
                <Icon
                  name="eye"
                  link
                  onClick={() => handleChangePassType("text")}
                />
              ) : (
                <Icon
                  name="eye slash"
                  link
                  onClick={() => handleChangePassType("password")}
                />
              )
            }
            onChange={formik.handleChange}
          />
        </Form.Field>
        <Button className="w-full" type="submit">
          Iniciar sesion
        </Button>
      </Form>
    </div>
  );
}
