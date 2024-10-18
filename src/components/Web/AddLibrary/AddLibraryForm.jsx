import React, { useEffect, useRef, useState } from "react";
import { branchController, userController } from "../../../api";
import { useDebouncedCallback } from "use-debounce";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddLibraryForm.form";
import { filter, forEach, map } from "lodash";
import ReCAPTCHA from "react-google-recaptcha";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  List,
  Select,
  Tab,
} from "semantic-ui-react";

const WAIT_BEETWEEN_REQUEST = 500;

export default function AddLibraryForm(props) {
  const {
    data: { cities, branchesType, states, communities, softwares, roles },
  } = props;
  const [validCode, setValidCode] = useState(false);
  const [branches, setBranches] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const recaptcha = useRef();
  const navigate = useNavigate();

  const addUser = () => {
    setUsersCount((prevState) => prevState + 1);
  };
  const removeUser = () => {
    if (usersCount >= 1) setUsersCount((prevState) => prevState - 1);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      const captchaValue = recaptcha.current.getValue();
      if (!captchaValue) {
        toast.error("reCaptcha obligatorio", {
          position: "top-center",
          transition: Bounce,
          autoClose: 5000,
        });
      } else {
        if (validCode === false) {
          toast.error("Codigo invalido", {
            position: "top-center",
            transition: Bounce,
            autoClose: 5000,
          });
        } else {
          try {
            const branch = await branchController.createBranch(values);
            if (branch.status === 200) {
              if (values.users.length > 0) {
                forEach(values.users, async (user) => {
                  await userController.createUser({
                    ...user,
                    branch: branch.data.id,
                  });
                });
              }
              toast.success(branch.message, {
                position: "top-center",
                transition: Bounce,
                autoClose: 5000,
              });
              formik.resetForm();
              navigate("/");
            } else {
              toast.error(branch.message, {
                position: "top-center",
                transition: Bounce,
                autoClose: 5000,
              });
            }
          } catch (error) {
            console.error("[POST] create branch and users error:", error);
          }
        }
      }
    },
  });

  useEffect(() => {
    map(formik.errors, (error) =>
      toast.error(error, {
        position: "top-center",
        transition: Bounce,
        autoClose: 5000,
      })
    );
  }, [formik.errors]);

  const handlerValidateCode = useDebouncedCallback(async (value) => {
    try {
      if (value.length > 2) {
        const checked = await branchController.checkCode(value);
        setValidCode(checked);
      } else {
        setValidCode(false);
      }
    } catch (error) {
      console.error("[POST] check code error:", error);
    }
  }, WAIT_BEETWEEN_REQUEST);

  const handlerSearchBranch = useDebouncedCallback(async (e) => {
    formik.setFieldValue("parent", null);
    formik.setFieldValue("isParent", true);
    if (e.target.value.length > 2) {
      const branches = await branchController.getAllBranches(
        1,
        3,
        e.target.value
      );
      setBranches(branches.docs);
    } else {
      setBranches([]);
      formik.setFieldValue("isParent", true);
    }
  }, WAIT_BEETWEEN_REQUEST);

  const panes = [
    {
      menuItem: { key: "libraries", content: "Biblioteca", icon: "building" },
      render: () => (
        <Tab.Pane>
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">
            Información de la Biblioteca
          </h2>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="name">Nombre completo</label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    icon={"user"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="code">Codigo de biblioteca</label>
                  <Input
                    type="text"
                    name="code"
                    id="code"
                    value={formik.values.code}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handlerValidateCode(e.target.value);
                    }}
                    icon={validCode ? "check" : "cancel"}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="branch_type_id">Tipo de biblioteca</label>
                  <Select
                    name="branch_type_id"
                    id="branch_type_id"
                    placeholder="Seleccione un tipo de biblioteca"
                    value={formik.values.branch_type_id}
                    onChange={(e) =>
                      formik.setFieldValue("branch_type_id", e.target.value)
                    }
                    options={map(branchesType, (branchType) => ({
                      key: branchType.id,
                      value: branchType.id,
                      text: branchType.name,
                    }))}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="parentName">
                    Institución de la que depende
                  </label>
                  <Input
                    type="text"
                    name="parentName"
                    id="parentName"
                    value={formik.values.parentName}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handlerSearchBranch(e);
                    }}
                    loading={branches.length > 0 && !formik.values.parent}
                    className="relative"
                    icon={"building"}
                  />
                  {branches.length > 0 && !formik.values.parent && (
                    <List
                      divided
                      verticalAlign="middle"
                      className="absolute after:hidden bg-white border border-zinc-200 top-14 w-[92.75%] rounded"
                    >
                      {map(branches, (branch) => (
                        <List.Item
                          className="cursor-pointer hover:bg-zinc-100"
                          key={branch.id}
                          onClick={() => {
                            formik.setFieldValue("parent", branch.id);
                            formik.setFieldValue("isParent", false);
                            formik.setFieldValue("parentName", branch.name);
                          }}
                        >
                          <p className="p-2">{branch.name}</p>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="category">Especialidad</label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    value={formik.values.category}
                    onChange={(e) => {
                      formik.setFieldValue("category", e.target.value);
                      handlerValidateCode(e);
                    }}
                    icon="tag"
                  />
                  <span className="text-xs text-zinc-500">
                    * Si desea añadir más de una especialidad, separela con una
                    ','
                  </span>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="phone">Telefono</label>
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    icon="phone"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="fax">Fax</label>
                  <Input
                    type="tel"
                    name="fax"
                    id="fax"
                    value={formik.values.fax}
                    onChange={formik.handleChange}
                    icon="print"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="email">Correo electronico</label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    icon="at"
                    autoComplete="email"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="address">Dirección postal</label>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    icon="map marker"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="zip">Codigo postal</label>
                  <Input
                    type="text"
                    name="zip"
                    id="zip"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    icon="map pin"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="city">Ciudad</label>
                  <Select
                    name="city"
                    id="city"
                    placeholder="Seleccione una ciudad"
                    value={formik.values.city}
                    onChange={(e) =>
                      formik.setFieldValue("city", e.target.value)
                    }
                    options={map(cities, (city) => ({
                      key: city.id,
                      value: city.id,
                      text: city.name,
                    }))}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="state">Provincia</label>
                  <Select
                    name="state"
                    id="state"
                    placeholder="Seleccione una provincia"
                    value={formik.values.state}
                    onChange={(e) =>
                      formik.setFieldValue("state", e.target.value)
                    }
                    options={map(states, (state) => ({
                      key: state.id,
                      value: state.id,
                      text: state.name,
                    }))}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field required>
                  <label htmlFor="community">Comunidad Autónoma</label>
                  <Select
                    name="community"
                    id="community"
                    placeholder="Seleccione una comunidad autónoma"
                    value={formik.values.community}
                    onChange={(e) =>
                      formik.setFieldValue("community", e.target.value)
                    }
                    options={map(communities, (community) => ({
                      key: community.id,
                      value: community.id,
                      text: community.name,
                    }))}
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="base_url">
                    URL página web de la biblioteca
                  </label>
                  <Input
                    type="text"
                    name="base_url"
                    id="base_url"
                    value={formik.values.base_url}
                    onChange={formik.handleChange}
                    icon="linkify"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="catalog_url">
                    URL página web del catálogo de la biblioteca
                  </label>
                  <Input
                    type="text"
                    name="catalog_url"
                    id="catalog_url"
                    value={formik.values.catalog_url}
                    onChange={formik.handleChange}
                    icon="linkify"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={4}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="loan_center">Servicio PIB</label>
                  <Select
                    type="text"
                    name="loan_center"
                    id="loan_center"
                    placeholder="Seleccione un servicio"
                    value={formik.values.loan_center}
                    onChange={(e) =>
                      formik.setFieldValue("loan_center", e.target.value)
                    }
                    options={[
                      {
                        key: 1,
                        value: true,
                        text: "Si",
                      },
                      {
                        key: 0,
                        value: false,
                        text: "No",
                      },
                    ]}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="loan_service">
                    Servicio PIB centralizado
                  </label>
                  <Select
                    type="text"
                    name="loan_service"
                    id="loan_service"
                    placeholder="Seleccione un servicio"
                    value={formik.values.loan_service}
                    onChange={(e) =>
                      formik.setFieldValue("loan_service", e.target.value)
                    }
                    options={[
                      {
                        key: 1,
                        value: true,
                        text: "Si",
                      },
                      {
                        key: 0,
                        value: false,
                        text: "No",
                      },
                    ]}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="loan_rate">Tarifa préstamo</label>
                  <Input
                    type="number"
                    name="loan_rate"
                    id="loan_rate"
                    value={formik.values.loan_rate}
                    onChange={formik.handleChange}
                    icon="money"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="limit_service">Limitación servicio</label>
                  <Input
                    type="number"
                    name="limit_service"
                    id="limit_service"
                    value={formik.values.limit_service}
                    onChange={formik.handleChange}
                    icon="folder arrow down"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="software_id">Software</label>
                  <Select
                    type="text"
                    name="software_id"
                    id="software_id"
                    placeholder="Seleccione un software"
                    value={formik.values.software_id}
                    onChange={(e) =>
                      formik.setFieldValue("software_id", e.target.value)
                    }
                    options={map(softwares, (software) => ({
                      key: software.id,
                      value: software.id,
                      text: software.name,
                    }))}
                  />
                  <span className="text-xs text-zinc-500">
                    * Si dispone de un sistema de gestión de préstamo
                    interbibliotecario (GTBIB, ILL) debe introducir la siguiente
                    información para poder realizar la petición de documentos.
                  </span>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: "users", content: "Responsables", icon: "users" },
      icon: "users",
      render: () => (
        <Tab.Pane>
          <h2 className="text-xl font-semibold text-zinc-900 mb-4">
            Información del personal de la Biblioteca
          </h2>
          {usersCount === 0 && (
            <div className="flex justify-center items-center mt-4">
              <p className="text-zinc-500">
                Agregar personal para tu biblioteca.
              </p>
            </div>
          )}
          {map(Array(usersCount), (_, index) => (
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor={`users[${index}].role`}>Area</label>
                    <Select
                      type="text"
                      name={`users[${index}].role`}
                      id={`users[${index}].role`}
                      placeholder="Seleccione un area"
                      value={formik.values.users[index]?.role}
                      onChange={(e) =>
                        formik.setFieldValue(
                          `users[${index}].role`,
                          e.target.value
                        )
                      }
                      options={filter(
                        roles,
                        (role) =>
                          role.name === "Biblioteca" ||
                          role.name === "Responsable"
                      ).map((role) => ({
                        key: role.id,
                        value: role.id,
                        text: role.name,
                      }))}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor={`users[${index}].name`}>Nombre</label>
                    <Input
                      type="text"
                      name={`users[${index}].name`}
                      id={`users[${index}].name`}
                      value={formik.values.users[index]?.name}
                      onChange={formik.handleChange}
                      icon="user"
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor={`users[${index}].phone`}>Telefono</label>
                    <Input
                      type="tel"
                      name={`users[${index}].phone`}
                      id={`users[${index}].phone`}
                      value={formik.values.users[index]?.phone}
                      onChange={formik.handleChange}
                      icon="phone"
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column>
                  <Form.Field>
                    <label htmlFor={`users[${index}].email`}>
                      Correo electronico
                    </label>
                    <Input
                      type="email"
                      name={`users[${index}].email`}
                      id={`users[${index}].email`}
                      value={formik.values.users[index]?.email}
                      onChange={formik.handleChange}
                      icon="at"
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
          <div className="flex justify-center items-center gap-4 mt-6">
            {usersCount >= 1 && (
              <Button type="button" onClick={removeUser}>
                <Icon name="delete user" />
                Borrar
              </Button>
            )}
            <Button type="button" onClick={addUser}>
              <Icon name="add user" />
              Agregar
            </Button>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="flex flex-col m-4 gap-4">
      <h2 className="text-2xl font-semibold text-zinc-900">
        Solicitud de alta de la biblioteca
      </h2>
      <Form
        className="flex flex-col gap-4 justify-center items-center"
        onSubmit={formik.handleSubmit}
      >
        <Tab panes={panes} className="w-full" />
        <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_CAPTCHAKEY} />
        <Button className="rounded-md text-white bg-zinc-700 p-2" type="submit">
          Enviar solicitud
        </Button>
      </Form>
    </div>
  );
}
