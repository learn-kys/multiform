import { create } from "zustand";

import { getDistrictsByState } from "./utils";

type StateStore = {};

export const useStore = create<StateStore>((set) => ({}));
