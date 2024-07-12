import React, { useEffect, useState } from "react";
import { Table } from "../../components/Web/SearchLibrary";
import { branchController } from "../../api";
import { useSearchParams } from "react-router-dom";

export function SearchLibrary() {
  const [branches, setBranches] = useState([]);
  const [pagination, setPagination] = useState({});
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    (async () => {
      try {
        const response = await branchController.getAllBranches(
          page,
          limit,
          query
        );
        setBranches(response.docs);
        delete response.docs;
        setPagination(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, limit, query]);

  return (
    <div>
      <Table branches={branches} pagination={pagination} query={""} />
    </div>
  );
}
