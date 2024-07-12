import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  AtSymbolIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  CodeBracketIcon,
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
} from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { branchController } from "../../api";
import { map, size } from "lodash";

export function Library() {
  const { id } = useParams();
  const [library, setLibrary] = useState({});

  useEffect(() => {
    (async () => {
      const res = await branchController.getBranchById(id);
      setLibrary(res);
    })();
  }, [id]);

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
            <div className="my-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Nombre de biblioteca
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.name}
                  </p>
                  <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Codigo de biblioteca
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.code}
                  </p>
                  <CodeBracketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Tipo de biblioteca
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.branches_type?.name}
                  </p>
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Institución de la que depende
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.branches?.name || "-"}
                  </p>
                  <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Tipo de fondos
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.funds_type?.name || "-"}
                  </p>
                  <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Especialidad
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.category || "-"}
                  </p>
                  <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Telefono
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.phone}
                  </p>
                  <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Fax
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.fax || "-"}
                  </p>
                  <PrinterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Correo electronico
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.email}
                  </p>
                  <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Dirección postal
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.address || "-"}
                  </p>
                  <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Codigo postal
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.zip || "-"}
                  </p>
                  <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Ciudad
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.cities?.name}
                  </p>
                  <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Provincia
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.states?.name || "-"}
                  </p>
                  <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Comunidad autónoma
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.communities?.name}
                  </p>
                  <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  URL página web de la biblioteca
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.base_url || "-"}
                  </p>
                  <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  URL página web del catálogo de la biblioteca
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.catalog_url || "-"}
                  </p>
                  <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Servicio PIB
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.loan_center ? "Si" : "No"}
                  </p>
                  <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Servicio PIB centralizado
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.loan_service ? "Si" : "No"}
                  </p>
                  <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Tarifa préstamo
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.loan_rate}
                  </p>
                  <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Limitación servicio
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.limit_service}
                  </p>
                  <FolderArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium leading-6 text-zinc-900">
                  Software
                </label>
                <div className="relative mt-2">
                  <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                    {library.softwares?.name || "No"}
                  </p>
                  <CommandLineIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            <h2 className="text-base font-semibold leading-7 text-zinc-900">
              Información del personal de la Biblioteca
            </h2>
            {size(library.users) > 0 ? (
              <div className="my-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                {map(library.users, (user) => (
                  <Fragment key={user.id}>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-zinc-900">
                        Area
                      </label>
                      <div className="relative mt-2">
                        <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                          {user.roles?.name}
                        </p>
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-zinc-900">
                        Nombre
                      </label>
                      <div className="relative mt-2">
                        <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                          {user.name}
                        </p>
                        <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-zinc-900">
                        Telefono
                      </label>
                      <div className="relative mt-2">
                        <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                          {user.phone}
                        </p>
                        <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium leading-6 text-zinc-900">
                        Correo electronico
                      </label>
                      <div className="relative mt-2">
                        <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
                          {user.email}
                        </p>
                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center mt-4">
                <p className="text-zinc-500">
                  No hay personal asignado a esta biblioteca.
                </p>
              </div>
            )}
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
