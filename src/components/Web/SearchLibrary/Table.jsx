import React from "react";
import { Pagination, Search } from "../../Shared";
import { size } from "lodash";
import { ViewBranch } from "./Buttons";

export function Table(props) {
  const { branches, pagination, query } = props;

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="flex flex-col justify-center overflow-hidden rounded-md bg-zinc-50 p-2 md:pt-0">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 sm:px-6">
              <h1 className={`text-2xl font-bold`}>Listado de bibliotecas</h1>
              <div>
                <Search query={query} placeholder={"Buscar bibliotecas..."} />
              </div>
            </div>
            {size(branches) > 0 ? (
              <>
                <div className="md:hidden">
                  {branches?.map((branch) => (
                    <div
                      key={branch.id}
                      className="mb-2 w-full rounded-md bg-white py-2 p-4"
                    >
                      <div className="flex items-center justify-between border-b gap-4 pb-4">
                        <div className="flex justify-center items-center">
                          <a
                            href={`https://euit.orex.es/cgi-bin/koha/opac-detail.pl?biblionumber=${branch.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold underline text-zinc-700"
                          >
                            {branch.id}
                          </a>
                        </div>

                        <div className="flex flex-col justify-center items-start w-full">
                          <p className="text-sm font-semibold text-zinc-900 line-clamp-1 max-w-sm">
                            {branch.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div className="flex flex-col justify-center">
                          <p className="text-sm text-zinc-900 capitalize">
                            {branch.code}
                          </p>
                        </div>
                        <div className="flex justify-center items-center gap-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <table className="hidden rounded-md text-zinc-900 md:table">
                  <thead className="rounded-md bg-zinc-50 text-left text-sm font-normal">
                    <tr>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Codigo
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Software
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Ciudad
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Provincia
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Comunidad autonoma
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Tipo
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Institucion de la que depende
                      </th>
                      <th
                        scope="col"
                        className="p-2 text-xs font-medium uppercase"
                      >
                        Especialidad
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-900">
                    {branches?.map((branch) => (
                      <tr key={branch.id} className="group">
                        <td className="whitespace-nowrap bg-white p-2">
                          <ViewBranch branch={branch} />
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs font-bold capitalize p-2">
                          {branch.name}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.softawares?.name || "No"}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.cities?.name}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.states?.name}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.communities?.name}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.branches_type?.name}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.branches?.name}
                        </td>
                        <td className="whitespace-nowrap bg-white text-xs capitalize p-2">
                          {branch.category}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="flex justify-center items-center h-96">
                <p className="text-sm  text-zinc-900">
                  No hay bibliotecas disponibles.
                </p>
              </div>
            )}
            <Pagination pagination={pagination} />
          </div>
        </div>
      </div>
    </div>
  );
}
