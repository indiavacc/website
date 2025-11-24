"use client";
import { create } from "zustand";

interface TeamMember {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photo?: any;
  name?: string;
  rank: string;
  position: string;
  id: string;
}

interface TeamStore {
  teamMembers: TeamMember[] | null;
  setTeamMembers: (data: TeamMember[]) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamMembers: null,
  setTeamMembers: (data) => set({ teamMembers: data }),
}));
