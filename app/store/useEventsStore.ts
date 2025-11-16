"use client";
import { create } from "zustand";

enum EventType {
  EVENT = "Event",
  CPT = "CPT",
  LIVE = "Live",
}

interface Event {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  banner: any;
  name: string;
  type: EventType;
  description: string;
  from: Date;
  to: Date;
  link: string;
  id: string;
}

interface EventsStore {
  events: Event[] | null;
  setEvents: (data: Event[]) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: null,
  setEvents: (data) => set({ events: data }),
}));
