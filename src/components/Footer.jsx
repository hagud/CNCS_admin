import React from "react";

export function Footer() {
  return (
    <div className="flex flex-col items-center py-2 text-xs gap-2 bg-zinc-700">
      <img
        className="h-10 w-auto text-zinc-700"
        src="/logo.svg"
        alt="CNCS Logo"
      />
      <span className="text-white">
        © 2024 Catálogo Nacional de Ciencias de la Salud. All rights reserved.
      </span>
    </div>
  );
}
