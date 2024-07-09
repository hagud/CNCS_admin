import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  AtSymbolIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  DevicePhoneMobileIcon,
  FolderArrowDownIcon,
  LinkIcon,
  MapIcon,
  MapPinIcon,
  PrinterIcon,
  ShareIcon,
  TagIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { branchController } from "../../../api";
import { useDebouncedCallback } from "use-debounce";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddLibraryForm.form";
import { map } from "lodash";

const WAIT_BEETWEEN_REQUEST = 500;

export default function AddLibraryForm(props) {
  const {
    data: { cities, branchesType, states, communities, fundsType, softwares },
  } = props;
  const [validCode, setValidCode] = useState(false);
  const [branches, setBranches] = useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handlerValidateCode = useDebouncedCallback(async (e) => {
    if (e.target.value.length > 2) {
      const checked = await branchController.checkCode(e.target.value);
      setValidCode(checked);
      if (checked) {
        formik.setFieldValue("code", e.target.value);
      }
    }
  }, WAIT_BEETWEEN_REQUEST);

  const handlerSearchBranch = useDebouncedCallback(async (e) => {
    formik.setFieldValue("parent", null);
    if (e.target.value.length > 2) {
      const branches = await branchController.getAllBranches(
        1,
        3,
        e.target.value
      );
      setBranches(branches.docs);
    } else {
      setBranches([]);
    }
  }, WAIT_BEETWEEN_REQUEST);

  return (
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
                  Nombre de biblioteca
                </label>
                <div className="relative mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
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
                  Codigo de biblioteca
                </label>
                <div className="relative mt-2">
                  <input
                    id="code"
                    name="code"
                    type="text"
                    onChange={handlerValidateCode}
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
                  htmlFor="branches_type_id"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Tipo de biblioteca
                </label>
                <div className="relative mt-2">
                  <select
                    id="branches_type_id"
                    name="branches_type_id"
                    defaultValue=""
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
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
                          formik.setFieldValue("parentName", branch.name);
                        }}
                      >
                        {branch.name}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="text-xs text-zinc-500">
                  * Si no depende de ninguna institucion no complete este campo.
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
                    defaultValue=""
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
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
                  Telefono
                </label>
                <div className="relative mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
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
                  Correo electronico
                </label>
                <div className="relative mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
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
                    type="number"
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
                  Ciudad
                </label>
                <div className="relative mt-2">
                  <select
                    id="city"
                    name="city"
                    autoComplete="city-name"
                    defaultValue=""
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
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
                    defaultValue=""
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
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
                  Comunidad Autónoma
                </label>
                <div className="relative mt-2">
                  <select
                    id="community"
                    name="community"
                    autoComplete="community-name"
                    defaultValue=""
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
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
                    defaultValue={true}
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
                    defaultValue={true}
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
                    defaultValue=""
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled>
                      Selecciona un software
                    </option>
                    {map(softwares, (software) => (
                      <option key={software.id} value={software.id}>
                        {software.name}
                      </option>
                    ))}
                  </select>
                  <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
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
          <h2 className="text-base font-semibold leading-7 text-zinc-900">
            Información del personal de la Biblioteca
          </h2>
        </TabPanel>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="rounded-md text-white bg-zinc-700 p-2"
          >
            Enviar solicitud
          </button>
        </div>
      </TabPanels>
    </TabGroup>
  );
}
