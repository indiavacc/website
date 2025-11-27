"use client";
import { create } from "zustand";

interface EventsStore {
  events: Event[] | null;
  setEvents: (data: Event[]) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: null,
  setEvents: (data) => set({ events: data }),
}));
