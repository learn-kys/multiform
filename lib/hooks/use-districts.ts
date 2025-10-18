import { useState, useEffect } from "react";
import { getDistrictsByState } from "../utils";

export function useDistricts(state: string | null) {
  const [districts, setDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (state) {
      setDistricts(getDistrictsByState(state));
    } else {
      setDistricts([]);
    }
  }, [state]);

  return districts;
}
