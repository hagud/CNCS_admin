import React from "react";
import { Search } from "../../Shared";
import { map, size } from "lodash";
import { Table } from "semantic-ui-react";

export function TableHoldings(props) {
  const { articles, query } = props;

  console.log(articles);

  return (
    <div className="flex flex-col m-4 gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-zinc-900">
          Solicitar articulos
        </h2>
        <div>
          <Search query={query} placeholder={"Buscar articulos"} />
        </div>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Biblioteca</Table.HeaderCell>
            <Table.HeaderCell>Codigo</Table.HeaderCell>
            <Table.HeaderCell>Ciudad</Table.HeaderCell>
            <Table.HeaderCell>Comunidad autonoma</Table.HeaderCell>
            <Table.HeaderCell>Tipo de fondo</Table.HeaderCell>
            <Table.HeaderCell>Fondos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {size(articles?.docs) > 0 ? (
            map(articles?.docs, (article) => (
              <Table.Row key={article.id}>
                <Table.Cell></Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900"></p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900"></p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900"></p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900"></p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900"></p>
                </Table.Cell>
                <Table.Cell>
                  <p className="font-semibold text-zinc-900"></p>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell>
                <p className="p-4 text-sm  text-zinc-900">
                  No hay articulos disponibles.
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
                <span className="font-medium">{articles?.pagingCounter}</span>{" "}
                de{" "}
                <span className="font-medium">
                  {articles?.hasNextPage
                    ? articles?.page * 20
                    : articles?.totalDocs}
                </span>{" "}
                de <span className="font-medium">{articles?.totalDocs}</span>{" "}
                resultados.
              </p>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
