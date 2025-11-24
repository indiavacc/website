import { useEventsStore } from "@/app/store/useEventsStore";
import { EventCard } from "../app/events/Components/EventCard";
import { useEffect, useMemo } from "react";
import { isSameDay } from "@/lib/utils";
import useEvents from "@/app/hooks/useEvents";
import Divider from "@/components/Divider";

const Events = () => {
  useEvents();
  const { events } = useEventsStore();
  const today = new Date();
  const tomorrow = new Date();

  useEffect(() => {
    tomorrow.setDate(today.getDate() + 1);
  }, []);

  const filteredEvents = useMemo(() => {
    return events?.filter((event) => {
      const from = new Date(event.start_time);
      return isSameDay(today, from) || isSameDay(tomorrow, from);
    });
  }, [events]);

  if (!filteredEvents?.length) return null;

  return (
    <section className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
      <Divider title="Upcoming Events" />
      <div className="space-y-8">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Events;
