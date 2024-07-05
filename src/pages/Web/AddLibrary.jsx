import React, { useEffect, useState } from "react";
import AddLibraryForm from "../../components/Web/AddLibrary/AddLibraryForm";
import { CITY, BRANCHES_TYPE } from "../../api";

const cityController = new CITY();
const branchesTypeController = new BRANCHES_TYPE();

export function AddLibrary() {
  const [cities, setCities] = useState([]);
  const [branchesType, setBranchesType] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await cityController.getAllCities(1, 999, "");
        setCities(data.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await branchesTypeController.getAllBranchesType(
          1,
          999,
          ""
        );
        setBranchesType(data.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <AddLibraryForm cities={cities} branchesType={branchesType} />
    </div>
  );
}
