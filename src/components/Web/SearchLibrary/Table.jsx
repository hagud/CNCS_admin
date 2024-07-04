import React from "react";
import { Pagination, Search } from "../../Shared";
import { size } from "lodash";

export function Table(props) {
  const { libraries, pagination, query } = props;

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
            {size(libraries) > 0 ? (
              <>
                <div className="md:hidden">
                  {libraries?.map((library) => (
                    <div
                      key={library.id}
                      className="mb-2 w-full rounded-md bg-white py-2 p-4"
                    >
                      <div className="flex items-center justify-between border-b gap-4 pb-4">
                        <div className="flex justify-center items-center">
                          <a
                            href={`https://euit.orex.es/cgi-bin/koha/opac-detail.pl?biblionumber=${library.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold underline text-zinc-700"
                          >
                            {library.id}
                          </a>
                        </div>

                        <div className="flex flex-col justify-center items-start w-full">
                          <p className="text-sm font-semibold text-zinc-900 line-clamp-1 max-w-sm">
                            {library.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div className="flex flex-col justify-center">
                          <p className="text-sm text-zinc-900 capitalize">
                            {library.code}
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
                      <th scope="col" className="px-4 py-2 font-medium sm:pl-6">
                        ID
                      </th>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Titulo / Autores
                      </th>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Tipo
                      </th>
                      <th scope="col" className="px-3 py-2 font-medium">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-zinc-900">
                    {libraries?.map((library) => (
                      <tr key={library.id} className="group">
                        <td className="h-14 whitespace-nowrap bg-white px-4 text-sm py-4">
                          <a
                            href={`https://euit.orex.es/cgi-bin/koha/opac-detail.pl?biblionumber=${library.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-bold underline text-zinc-700"
                          >
                            {library.id}
                          </a>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4 text-sm">
                          <p className="text-sm font-semibold text-zinc-900 line-clamp-2 max-w-lg">
                            {library.name}
                          </p>
                        </td>
                        <td className="whitespace-nowrap bg-white px-4  text-sm">
                          <p className="text-sm  text-zinc-900 capitalize">
                            {library.code}
                          </p>
                        </td>
                        <td className="flex h-14 justify-center items-center gap-4 whitespace-nowrap bg-white px-4 cursor-pointer"></td>
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
            {/* <Pagination pagination={pagination} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
