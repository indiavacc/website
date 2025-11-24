import { useEventsStore } from "@/app/store/useEventsStore";
import { fetchEvents } from "../api/events";

const useEvents = () => {
  const { events, setEvents } = useEventsStore();

  if (!events) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchEvents().then(setEvents as any);
  }
};
export default useEvents;
