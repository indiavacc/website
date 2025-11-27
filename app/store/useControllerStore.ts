"use client";
import { create } from "zustand";

export enum CONTROLLER_TYPE {
  RESIDENT = "resident",
  VISITOR = "visitor",
}
export interface Controller {
  CID: string;
  name: string;
  rating: string;
  title: string;
  type: CONTROLLER_TYPE;
  permissions: string;
}

interface ControllerStore {
  controllers: Controller[] | null;
  setControllers: (data: Controller[]) => void;
}

export const useControllerStore = create<ControllerStore>((set) => ({
  controllers: null,
  setControllers: (data) => set({ controllers: data }),
}));
