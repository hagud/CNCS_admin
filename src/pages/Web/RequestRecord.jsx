import React from "react";
import { useSearchParams } from "react-router-dom";
import { TableHoldings } from "../../components/Web/RequestHoldings/Table";

export function RequestRecord() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const query = searchParams.get("query") || "";

  return (
    <div>
      <TableHoldings query={query} />
    </div>
  );
}
