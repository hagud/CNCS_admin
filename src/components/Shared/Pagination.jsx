import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "react-router-dom";

export function Pagination(props) {
  const { pagination } = props;
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="flex items-center justify-between border-t border-zinc-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {pagination.hasPrevPage && (
          <button
            onClick={() => {
              setSearchParams({ page: pagination.prevPage });
            }}
            className="relative inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Anterior
          </button>
        )}
        {pagination.hasNextPage && (
          <button
            onClick={() => {
              setSearchParams({ page: pagination.nextPage });
            }}
            className="relative ml-3 inline-flex items-center rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Siguiente
          </button>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-700">
            Mostrando{" "}
            <span className="font-medium">{pagination.pagingCounter}</span> de{" "}
            <span className="font-medium">
              {pagination.hasNextPage
                ? pagination.page * 20
                : pagination.totalDocs}
            </span>{" "}
            de <span className="font-medium">{pagination.totalDocs}</span>{" "}
            resultados.
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {pagination.hasPrevPage && (
              <button
                onClick={() => {
                  setSearchParams({ page: pagination.prevPage });
                }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Anterior</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            <span className="relative z-10 inline-flex items-center bg-zinc-700 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-700">
              {pagination.page}
            </span>
            {pagination.hasNextPage && (
              <button
                onClick={() => {
                  setSearchParams({ page: pagination.nextPage });
                }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-zinc-400 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Siguiente</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
