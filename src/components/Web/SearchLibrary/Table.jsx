import React from "react";
import { Search } from "../../Shared";
import { map, size } from "lodash";
import { Icon, Table } from "semantic-ui-react";

export function TableLibrary(props) {
  const { branches, query } = props;

  console.log(branches);

  return (
    <div className="flex flex-col m-4 gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Listado de Bibliotecas
        </h2>
        <div>
          <Search query={query} placeholder={"Buscar bibliotecas"} />
        </div>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Codigo</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Software</Table.HeaderCell>
            <Table.HeaderCell>Ciudad</Table.HeaderCell>
            <Table.HeaderCell>Provincia</Table.HeaderCell>
            <Table.HeaderCell>Comunidad autonoma</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Institucion de la que depende</Table.HeaderCell>
            <Table.HeaderCell>Especialidad</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {size(branches?.docs) > 0 ? (
            map(branches?.docs, (branch) => (
              <Table.Row key={branch.id}>
                <Table.Cell>
                  <a
                    href={`/library/${branch.id}`}
                    className="flex items-center justify-center hover:cursor-pointer text-white bg-cncs-ligthblue rounded-full font-bold hover:bg-cncs-blue p-1"
                  >
                    <Icon name="eye" size="small" />
                    {branch.code}
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">{branch.name}</p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.softawares?.name || "No"}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.cities?.name || "-"}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.states?.name || "-"}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.communities?.name}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.branches_type?.name}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.branches?.name || "-"}
                  </p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900">
                    {branch.category || "-"}
                  </p>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>
                <p className="p-4 text-sm  text-zinc-900">
                  No hay librerias disponibles.
                </p>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="9">
              <p className="text-sm text-zinc-700">
                Mostrando{" "}
                <span className="font-medium">{branches?.pagingCounter}</span>{" "}
                de{" "}
                <span className="font-medium">
                  {branches?.hasNextPage
                    ? branches?.page * 20
                    : branches?.totalDocs}
                </span>{" "}
                de <span className="font-medium">{branches?.totalDocs}</span>{" "}
                resultados.
              </p>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
