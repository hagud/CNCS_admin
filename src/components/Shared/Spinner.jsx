import { ArrowPathIcon } from "@heroicons/react/20/solid";
import React from "react";

export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <ArrowPathIcon className="animate-spin h-12 w-12 mr-3 text-lime-600" />
    </div>
  );
}
