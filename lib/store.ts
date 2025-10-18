import { create } from "zustand";

import { getDistrictsByState } from "./utils";

type StateStore = {
  selectedState: string | null;
  districts: string[];
  setSelectedState: (state: string | null) => void;
};

export const useStore = create<StateStore>((set) => ({
  selectedState: null,
  districts: [],
  setSelectedState: (state) => {
    if (state) {
      set({ selectedState: state, districts: getDistrictsByState(state) });
    } else {
      set({ selectedState: null, districts: [] });
    }
  },
}));
