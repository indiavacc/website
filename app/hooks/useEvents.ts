import { useEventsStore } from "@/app/store/useEventsStore";
import { fetchEvents } from "../api/events";

const useEvents = () => {
  const { events, setEvents } = useEventsStore();

  if (!events) {
    fetchEvents().then(setEvents);
  }
};
export default useEvents;
