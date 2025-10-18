"use client";
import { useState } from "react";

import { getDistrictsByState, getStates } from "@/lib/utils";

export default function Page() {
  const result = getStates();
  const [selectedState, setSelectedState] = useState<string>(result[0]);
  const district = getDistrictsByState(selectedState);

  return (
    <form>
      <label htmlFor="state">State:</label>
      <select
        id="state"
        name="state"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        {result.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <label htmlFor="district">District:</label>
      <select id="district" name="district">
        {district.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
