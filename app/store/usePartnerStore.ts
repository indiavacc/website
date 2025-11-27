"use client";
import { create } from "zustand";

interface Partner {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo: any;
  name: string;
  website: string;
}

interface PartnerStore {
  partners: Partner[] | null;
  setPartners: (data: Partner[]) => void;
}

export const usePartnerStore = create<PartnerStore>((set) => ({
  partners: null,
  setPartners: (data) => set({ partners: data }),
}));
