import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  BuildingLibraryIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  TagIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { BRANCH } from "../../../api/branch";
import { useDebouncedCallback } from "use-debounce";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddLibraryForm.form";
import { map } from "lodash";

const branchController = new BRANCH();

const WAIT_BEETWEEN_CHECK = 500;

export default function AddLibraryForm(props) {
  const { cities, branchesType } = props;
  const [validCode, setValidCode] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleValidateCode = useDebouncedCallback(async (e) => {
    if (e.target.value.length > 2) {
      const checked = await branchController.checkCode(e.target.value);
      setValidCode(checked);
      if (checked) {
        formik.setFieldValue("code", e.target.value);
      }
    }
  }, WAIT_BEETWEEN_CHECK);

  return (
    <TabGroup>
      <TabList className="flex justify-center items-center my-4 gap-4">
        <Tab className="rounded-full p-2 data-[selected]:bg-zinc-700 data-[selected]:text-white data-[hover]:opacity-50">
          Biblioteca
        </Tab>
        <Tab className="rounded-full p-2 data-[selected]:bg-zinc-700 data-[selected]:text-white data-[hover]:opacity-50">
          Responsables
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className="border-b border-zinc-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-zinc-900">
              Información de la Biblioteca
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Nombre de biblioteca
                </label>
                <div className="relative mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  />
                  <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Codigo de biblioteca
                </label>
                <div className="relative mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    onChange={handleValidateCode}
                    autoComplete="family-name"
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
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected>
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
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected>
                      Selecciona una ciudad
                    </option>
                    {map(cities, (city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Provincia
                </label>
                <div className="relative mt-2">
                  <select
                    id="city"
                    name="city"
                    autoComplete="city-name"
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected>
                      Selecciona una provincia
                    </option>
                    {map(cities, (city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Comunidad Autónoma
                </label>
                <div className="relative mt-2">
                  <select
                    id="city"
                    name="city"
                    autoComplete="city-name"
                    className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 py-[12px] pl-10 text-sm outline-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-700 sm:text-sm sm:leading-6"
                  >
                    <option value="" disabled selected>
                      Selecciona una comunidad autónoma
                    </option>
                    {map(cities, (city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-zinc-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postal-code"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>Content 2</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
