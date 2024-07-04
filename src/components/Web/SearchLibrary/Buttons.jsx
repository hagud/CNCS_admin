import React, { useState } from "react";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Confirm } from "../../Shared";

export function ViewRecord({ record }) {
  return (
    <a href={`/template/${record}`} rel="noreferrer">
      <EyeIcon
        className="h-8 w-8 border text-gray-600 border-gray-200 hover:bg-gray-100 p-1 rounded-md"
        title="Ver"
      />
    </a>
  );
}

export function DeleteRecord({ record, reload }) {
  const [open, setOpen] = useState(false);

  const handlerOpen = () => setOpen((prevState) => !prevState);

  const handlerDelete = async () => {
    try {
      handlerOpen();
    } catch (error) {
      console.error(error);
    } finally {
      reload();
    }
  };

  return (
    <>
      <TrashIcon
        onClick={handlerOpen}
        className="h-8 w-8 border text-gray-600 border-gray-200 hover:bg-gray-100 p-1 rounded-md"
        title="Eliminar"
      />
      <Confirm
        open={open}
        handlerOpen={handlerOpen}
        title="Eliminar registro"
        message="¿Estás seguro de eliminar este registro?"
        onConfirm={handlerDelete}
      />
    </>
  );
}
