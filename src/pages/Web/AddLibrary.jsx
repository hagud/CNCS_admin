import React, { useEffect, useState } from "react";
import AddLibraryForm from "../../components/Web/AddLibrary/AddLibraryForm";
import {
  cityController,
  branchesTypeController,
  stateController,
  communityController,
  fundsTypeController,
  softwareController,
} from "../../api";

export function AddLibrary() {
  const [cities, setCities] = useState([]);
  const [branchesType, setBranchesType] = useState([]);
  const [states, setStates] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [fundsType, setFundsType] = useState([]);
  const [softwares, setSoftwares] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [
          cities,
          branchesType,
          states,
          communities,
          fundsType,
          softwares,
        ] = await Promise.all([
          cityController.getAllCities(1, 999, ""),
          branchesTypeController.getAllBranchesType(1, 999, ""),
          stateController.getAllStates(1, 999, ""),
          communityController.getAllCommunities(1, 999, ""),
          fundsTypeController.getAllFundsType(1, 999, ""),
          softwareController.getAllSoftwares(1, 999, ""),
        ]);
        setCities(cities.docs);
        setBranchesType(branchesType.docs);
        setStates(states.docs);
        setCommunities(communities.docs);
        setFundsType(fundsType.docs);
        setSoftwares(softwares.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <AddLibraryForm
      data={{ cities, branchesType, states, communities, fundsType, softwares }}
    />
  );
}
