import { useEventsStore } from "@/app/store/useEventsStore";
import { EventCard } from "../app/events/Components/EventCard";
import { useMemo } from "react";
import useEvents from "@/app/hooks/useEvents";
import Divider from "@/components/Divider";

const Events = () => {
  useEvents();
  const { events } = useEventsStore();

  const filteredEvents = useMemo(() => events?.slice(0, 5), [events]);

  if (!filteredEvents?.length) return null;

  return (
    <section className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-16">
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
