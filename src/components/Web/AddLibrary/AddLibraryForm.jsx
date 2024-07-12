import React, { useEffect, useRef, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  AtSymbolIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  FolderArrowDownIcon,
  IdentificationIcon,
  KeyIcon,
  LinkIcon,
  MapIcon,
  MapPinIcon,
  PrinterIcon,
  ShareIcon,
  TagIcon,
  UserMinusIcon,
  UserPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { branchController, userController } from "../../../api";
import { useDebouncedCallback } from "use-debounce";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddLibraryForm.form";
import { forEach, map } from "lodash";
import ReCAPTCHA from "react-google-recaptcha";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WAIT_BEETWEEN_REQUEST = 500;

export default function AddLibraryForm(props) {
  const {
    data: {
      cities,
      branchesType,
      states,
      communities,
      fundsType,
      softwares,
      roles,
    },
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

  const handlerValidateCode = useDebouncedCallback(async (e) => {
    try {
      if (e.target.value.length > 2) {
        const checked = await branchController.checkCode(e.target.value);
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <TabGroup>
        <TabList className="flex justify-center items-center gap-4">
          <Tab className="rounded-full p-2 data-[selected]:bg-zinc-700 data-[selected]:text-white data-[hover]:opacity-50">
            Biblioteca
          </Tab>
          <Tab className="rounded-full p-2 data-[selected]:bg-zinc-700 data-[selected]:text-white data-[hover]:opacity-50">
            Responsables
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div>
              <h2 className="text-base font-semibold leading-7 text-zinc-900">
                Información de la Biblioteca
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Nombre de biblioteca
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      required
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Codigo de biblioteca
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="code"
                      name="code"
                      type="text"
                      required
                      value={formik.values.code}
                      onChange={(e) => {
                        formik.setFieldValue("code", e.target.value);
                        handlerValidateCode(e);
                      }}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    {validCode ? (
                      <CheckCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-500" />
                    ) : (
                      <XCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="branch_type_id"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Tipo de biblioteca
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="branch_type_id"
                      name="branch_type_id"
                      required
                      defaultValue={formik.values.branch_type_id || 0}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={0} disabled>
                        Selecciona un tipo de biblioteca
                      </option>
                      {map(branchesType, (branchType) => (
                        <option key={branchType.id} value={branchType.id}>
                          {branchType.name}
                        </option>
                      ))}
                    </select>
                    <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="relative sm:col-span-2">
                  <label
                    htmlFor="parentName"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Institución de la que depende
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="parentName"
                      name="parentName"
                      type="text"
                      onChange={(e) => {
                        formik.setFieldValue("parentName", e.target.value);
                        handlerSearchBranch(e);
                      }}
                      value={formik.values.parentName}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                  {branches.length > 0 && !formik.values.parent && (
                    <ul className="absolute mt-2 w-full after:hidden">
                      {map(branches, (branch) => (
                        <li
                          className="cursor-pointer hover:bg-zinc-100 border-b border-zinc-200 px-2 bg-white"
                          key={branch.id}
                          onClick={() => {
                            formik.setFieldValue("parent", branch.id);
                            formik.setFieldValue("isParent", false);
                            formik.setFieldValue("parentName", branch.name);
                          }}
                        >
                          {branch.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="text-xs text-zinc-500">
                    * Si no depende de ninguna institucion no complete este
                    campo.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="funds_type_id"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Tipo de fondos
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="funds_type_id"
                      name="funds_type_id"
                      defaultValue={formik.values.funds_type_id || 0}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={0} disabled>
                        Selecciona un tipo de fondos
                      </option>
                      {map(fundsType, (funds) => (
                        <option key={funds.id} value={funds.id}>
                          {funds.name}
                        </option>
                      ))}
                    </select>
                    <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Especialidad
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="category"
                      name="category"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      type="text"
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                  <span className="text-xs text-zinc-500">
                    * Si desea añadir más de una especialidad, separela con una
                    coma.
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Telefono
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      autoComplete="tel"
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="fax"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Fax
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="fax"
                      name="fax"
                      type="tel"
                      value={formik.values.fax}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <PrinterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Correo electronico
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      required
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Dirección postal
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      autoComplete="street-address"
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Codigo postal
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      value={formik.values.zip}
                      onChange={formik.handleChange}
                      autoComplete="postal-code"
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Ciudad
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="city"
                      name="city"
                      required
                      autoComplete="city-name"
                      defaultValue={formik.values.city || 0}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={0} disabled>
                        Selecciona una ciudad
                      </option>
                      {map(cities, (city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Provincia
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="state"
                      name="state"
                      autoComplete="state-name"
                      defaultValue={formik.values.state || 0}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={0} disabled>
                        Selecciona una provincia
                      </option>
                      {map(states, (state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="community"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    <span className="text-red-700">*</span> Comunidad Autónoma
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="community"
                      name="community"
                      required
                      autoComplete="community-name"
                      defaultValue={formik.values.community || 0}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={0} disabled>
                        Selecciona una comunidad autónoma
                      </option>
                      {map(communities, (community) => (
                        <option key={community.id} value={community.id}>
                          {community.name}
                        </option>
                      ))}
                    </select>
                    <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="base_url"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    URL página web de la biblioteca
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="base_url"
                      name="base_url"
                      type="text"
                      value={formik.values.base_url}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="catalog_url"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    URL página web del catálogo de la biblioteca
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="catalog_url"
                      name="catalog_url"
                      type="text"
                      value={formik.values.catalog_url}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="loan_center"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Servicio PIB
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="loan_center"
                      name="loan_center"
                      defaultValue={formik.values.loan_center}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                    <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="loan_service"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Servicio PIB centralizado
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="loan_service"
                      name="loan_service"
                      value={formik.values.loan_service}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>
                    <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="loan_rate"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Tarifa préstamo
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="loan_rate"
                      name="loan_rate"
                      type="number"
                      value={formik.values.loan_rate}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="limit_service"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Limitación servicio
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="limit_service"
                      name="limit_service"
                      type="number"
                      value={formik.values.limit_service}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    />
                    <FolderArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label
                    htmlFor="software_id"
                    className="block text-sm font-medium leading-6 text-zinc-900"
                  >
                    Software
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="software_id"
                      name="software_id"
                      defaultValue={formik.values.software_id || 0}
                      onChange={formik.handleChange}
                      className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                    >
                      <option value={0} disabled>
                        Selecciona un software
                      </option>
                      {map(softwares, (software) => (
                        <option key={software.id} value={software.id}>
                          {software.name}
                        </option>
                      ))}
                    </select>
                    <CommandLineIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                  </div>
                  <span className="text-xs text-zinc-500">
                    * Si dispone de un sistema de gestión de préstamo
                    interbibliotecario (GTBIB, ILL) debe introducir la siguiente
                    información para poder realizar la petición de documentos.
                  </span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <h2 className="text-base font-semibold leading-7 text-zinc-900">
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
                <div
                  key={index}
                  className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 mt-4"
                >
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`users[${index}].role`}
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Area
                    </label>
                    <div className="relative mt-2">
                      <select
                        id={`users[${index}].role`}
                        name={`users[${index}].role`}
                        required
                        defaultValue={formik.values.users[index]?.role || 0}
                        onChange={formik.handleChange}
                        className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                      >
                        <option value={0} disabled>
                          Selecciona un area
                        </option>
                        {map(roles, (role) => {
                          if (
                            role.name === "Biblioteca" ||
                            role.name === "Responsable"
                          ) {
                            return (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            );
                          }
                        })}
                      </select>
                      <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`users[${index}].name`}
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Nombre
                    </label>
                    <div className="relative mt-2">
                      <input
                        id={`users[${index}].name`}
                        name={`users[${index}].name`}
                        value={formik.values.users[index]?.name || ""}
                        onChange={formik.handleChange}
                        type="text"
                        required
                        className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                      />
                      <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`users[${index}].phone`}
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Telefono
                    </label>
                    <div className="relative mt-2">
                      <input
                        id={`users[${index}].phone`}
                        name={`users[${index}].phone`}
                        value={formik.values.users[index]?.phone || ""}
                        onChange={formik.handleChange}
                        required
                        type="tel"
                        className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                      />
                      <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={`users[${index}].email`}
                      className="block text-sm font-medium leading-6 text-zinc-900"
                    >
                      Correo electronico
                    </label>
                    <div className="relative mt-2">
                      <input
                        id={`users[${index}].email`}
                        name={`users[${index}].email`}
                        value={formik.values.users[index]?.email || ""}
                        onChange={formik.handleChange}
                        required
                        type="email"
                        className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                      />
                      <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center items-center gap-4 mt-4">
                {usersCount >= 1 && (
                  <button
                    className="flex justify-center items-center rounded-md text-white bg-red-700 p-2 gap-1"
                    onClick={removeUser}
                  >
                    <UserMinusIcon className="h-5 w-5" />
                    Borrar
                  </button>
                )}
                <button
                  className="flex justify-center items-center rounded-md text-white bg-zinc-700 p-2 gap-1"
                  onClick={addUser}
                >
                  <UserPlusIcon className="h-5 w-5" />
                  Agregar
                </button>
              </div>
            </div>
          </TabPanel>
          <div className="flex flex-col justify-center items-center mt-4 gap-4">
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.REACT_APP_CAPTCHAKEY}
            />
            <button
              className="rounded-md text-white bg-zinc-700 p-2"
              type="submit"
            >
              Enviar solicitud
            </button>
          </div>
        </TabPanels>
      </TabGroup>
    </form>
  );
}
