/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { create } from "zustand";

interface Social {
  name: string;
  logo: any;
  url: string;
  id: string;
}

interface Settings {
  background: any;
  namedLogo: any;
  logo: any;
  about: string;
  socials: Social[];
  subtitle: string;
}

interface SettingsStore {
  settings: Settings | null;
  setSettings: (data: Settings) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: null,
  setSettings: (data) => set({ settings: data }),
}));
