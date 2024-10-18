import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { branchController } from "../../api";
import { map, size } from "lodash";
import { Form, Grid, Input, Tab } from "semantic-ui-react";

export function Library() {
  const { id } = useParams();
  const [library, setLibrary] = useState({});

  useEffect(() => {
    (async () => {
      const res = await branchController.getBranchById(id);
      setLibrary(res);
    })();
  }, [id]);

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
                <Form.Field>
                  <label htmlFor="name">Nombre completo</label>
                  <Input
                    disabled
                    type="text"
                    name="name"
                    id="name"
                    value={library.name}
                    icon={"user"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="code">Codigo de biblioteca</label>
                  <Input
                    disabled
                    type="text"
                    name="code"
                    id="code"
                    value={library.code}
                    icon="code"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="branch_type_id">Tipo de biblioteca</label>
                  <Input
                    disabled
                    name="branch_type_id"
                    id="branch_type_id"
                    placeholder="Seleccione un tipo de biblioteca"
                    value={library.branches_type?.name}
                    icon={"tag"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="parentName">
                    Institución de la que depende
                  </label>
                  <Input
                    disabled
                    type="text"
                    name="parentName"
                    id="parentName"
                    value={library.branches?.name}
                    icon={"building"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="category">Especialidad</label>
                  <Input
                    disabled
                    type="text"
                    name="category"
                    id="category"
                    value={library.category}
                    icon="tag"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="phone">Telefono</label>
                  <Input
                    disabled
                    type="tel"
                    name="phone"
                    id="phone"
                    value={library.phone}
                    icon="phone"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="fax">Fax</label>
                  <Input
                    disabled
                    type="tel"
                    name="fax"
                    id="fax"
                    value={library.fax}
                    icon="print"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="email">Correo electronico</label>
                  <Input
                    disabled
                    type="email"
                    name="email"
                    id="email"
                    value={library.email}
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
                    disabled
                    type="text"
                    name="address"
                    id="address"
                    value={library.address}
                    icon="map marker"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="zip">Codigo postal</label>
                  <Input
                    disabled
                    type="text"
                    name="zip"
                    id="zip"
                    value={library.zip}
                    icon="map pin"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="city">Ciudad</label>
                  <Input
                    disabled
                    name="city"
                    id="city"
                    value={library.cities?.name}
                    icon={"map marker alternate"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="state">Provincia</label>
                  <Input
                    disabled
                    name="state"
                    id="state"
                    value={library.states?.name}
                    icon={"map"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="community">Comunidad Autónoma</label>
                  <Input
                    disabled
                    name="community"
                    id="community"
                    value={library.communities?.name}
                    icon={"map"}
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
                    disabled
                    type="text"
                    name="base_url"
                    id="base_url"
                    value={library.base_url}
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
                    disabled
                    type="text"
                    name="catalog_url"
                    id="catalog_url"
                    value={library.catalog_url}
                    icon="linkify"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={4}>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="loan_center">Servicio PIB</label>
                  <Input
                    disabled
                    type="text"
                    name="loan_center"
                    id="loan_center"
                    value={library.loan_center ? "Si" : "No"}
                    icon={"share"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="loan_service">
                    Servicio PIB centralizado
                  </label>
                  <Input
                    disabled
                    type="text"
                    name="loan_service"
                    id="loan_service"
                    value={library.loan_service ? "Si" : "No"}
                    icon={"share"}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="loan_rate">Tarifa préstamo</label>
                  <Input
                    disabled
                    type="number"
                    name="loan_rate"
                    id="loan_rate"
                    value={library.loan_rate}
                    icon="money"
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="limit_service">Limitación servicio</label>
                  <Input
                    disabled
                    type="number"
                    name="limit_service"
                    id="limit_service"
                    value={library.limit_service}
                    icon="folder arrow down"
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Form.Field>
                  <label htmlFor="software_id">Software</label>
                  <Input
                    disabled
                    type="text"
                    name="software_id"
                    id="software_id"
                    value={library.softwares?.name}
                    icon={"command line"}
                  />
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
          {size(library.users) > 0 ? (
            <>
              {map(library.users, (user, index) => (
                <Grid>
                  <Grid.Row columns={4}>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor={`users[${index}].role`}>Area</label>
                        <Input
                          disabled
                          type="text"
                          name={`users[${index}].role`}
                          id={`users[${index}].role`}
                          value={user.roles.name}
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor={`users[${index}].name`}>Nombre</label>
                        <Input
                          disabled
                          type="text"
                          name={`users[${index}].name`}
                          id={`users[${index}].name`}
                          value={user.name}
                          icon="user"
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Field>
                        <label htmlFor={`users[${index}].phone`}>
                          Telefono
                        </label>
                        <Input
                          disabled
                          type="tel"
                          name={`users[${index}].phone`}
                          id={`users[${index}].phone`}
                          value={user.phone}
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
                          disabled
                          type="email"
                          name={`users[${index}].email`}
                          id={`users[${index}].email`}
                          value={user.email}
                          icon="at"
                        />
                      </Form.Field>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center mt-4">
              <p className="text-zinc-500">
                No hay personal asignado a esta biblioteca.
              </p>
            </div>
          )}
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Form className="flex flex-col gap-4 m-4 justify-center items-center">
      <Tab panes={panes} className="w-full" />
    </Form>
  );

  // return (
  //   <TabGroup>
  //     <TabList className="flex justify-center items-center gap-4">
  //       <Tab className="rounded-full p-2 data-[Inputed]:bg-zinc-700 data-[Inputed]:text-white data-[hover]:opacity-50">
  //         Biblioteca
  //       </Tab>
  //       <Tab className="rounded-full p-2 data-[Inputed]:bg-zinc-700 data-[Inputed]:text-white data-[hover]:opacity-50">
  //         Responsables
  //       </Tab>
  //     </TabList>
  //     <TabPanels>
  //       <TabPanel>
  //         <div>
  //           <h2 className="text-base font-semibold leading-7 text-zinc-900">
  //             Información de la Biblioteca
  //           </h2>
  //           <div className="my-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Nombre de biblioteca
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.name}
  //                 </p>
  //                 <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Codigo de biblioteca
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.code}
  //                 </p>
  //                 <CodeBracketIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Tipo de biblioteca
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.branches_type?.name}
  //                 </p>
  //                 <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Institución de la que depende
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.branches?.name || "-"}
  //                 </p>
  //                 <BuildingOffice2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Especialidad
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.category || "-"}
  //                 </p>
  //                 <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Telefono
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.phone}
  //                 </p>
  //                 <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Fax
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.fax || "-"}
  //                 </p>
  //                 <PrinterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Correo electronico
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.email}
  //                 </p>
  //                 <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-4">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Dirección postal
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.address || "-"}
  //                 </p>
  //                 <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Codigo postal
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.zip || "-"}
  //                 </p>
  //                 <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Ciudad
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.cities?.name}
  //                 </p>
  //                 <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Provincia
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.states?.name || "-"}
  //                 </p>
  //                 <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Comunidad autónoma
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.communities?.name}
  //                 </p>
  //                 <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-3">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 URL página web de la biblioteca
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.base_url || "-"}
  //                 </p>
  //                 <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-3">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 URL página web del catálogo de la biblioteca
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.catalog_url || "-"}
  //                 </p>
  //                 <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-1">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Servicio PIB
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.loan_center ? "Si" : "No"}
  //                 </p>
  //                 <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-1">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Servicio PIB centralizado
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.loan_service ? "Si" : "No"}
  //                 </p>
  //                 <ShareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Tarifa préstamo
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.loan_rate}
  //                 </p>
  //                 <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-2">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Limitación servicio
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.limit_service}
  //                 </p>
  //                 <FolderArrowDownIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //             <div className="sm:col-span-6">
  //               <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                 Software
  //               </label>
  //               <div className="relative mt-2">
  //                 <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                   {library.softwares?.name || "No"}
  //                 </p>
  //                 <CommandLineIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </TabPanel>
  //       <TabPanel>
  //         <div>
  //           <h2 className="text-base font-semibold leading-7 text-zinc-900">
  //             Información del personal de la Biblioteca
  //           </h2>
  //           {size(library.users) > 0 ? (
  //             <div className="my-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
  //               {map(library.users, (user) => (
  //                 <Fragment key={user.id}>
  //                   <div className="sm:col-span-2">
  //                     <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                       Area
  //                     </label>
  //                     <div className="relative mt-2">
  //                       <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                         {user.roles?.name}
  //                       </p>
  //                       <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //                     </div>
  //                   </div>
  //                   <div className="sm:col-span-2">
  //                     <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                       Nombre
  //                     </label>
  //                     <div className="relative mt-2">
  //                       <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                         {user.name}
  //                       </p>
  //                       <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //                     </div>
  //                   </div>
  //                   <div className="sm:col-span-2">
  //                     <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                       Telefono
  //                     </label>
  //                     <div className="relative mt-2">
  //                       <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                         {user.phone}
  //                       </p>
  //                       <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //                     </div>
  //                   </div>
  //                   <div className="sm:col-span-2">
  //                     <label className="block text-sm font-medium leading-6 text-zinc-900">
  //                       Correo electronico
  //                     </label>
  //                     <div className="relative mt-2">
  //                       <p className="peer block w-full rounded-md border-0 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-zinc-50 py-[9px] pl-10 text-sm outline-2 sm:text-sm sm:leading-6">
  //                         {user.email}
  //                       </p>
  //                       <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500 peer-focus:text-zinc-900" />
  //                     </div>
  //                   </div>
  //                 </Fragment>
  //               ))}
  //             </div>
  //           ) : (
  //             <div className="flex justify-center items-center mt-4">
  //               <p className="text-zinc-500">
  //                 No hay personal asignado a esta biblioteca.
  //               </p>
  //             </div>
  //           )}
  //         </div>
  //       </TabPanel>
  //     </TabPanels>
  //   </TabGroup>
  // );
}
