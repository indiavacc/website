import { useEventsStore } from "@/app/store/useEventsStore";
import { EventCard } from "../app/events/Components/EventCard";
import { useEffect } from "react";
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

  if (!events?.length) return null;

  return (
    <section className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
      <Divider title="Upcoming Events" />
      <div className="space-y-8">
        {events.map((event) => {
          const from = new Date(event.from);
          if (isSameDay(today, from) || isSameDay(tomorrow, from)) {
            return (
              <EventCard
                key={event.id}
                image={event.banner?.url || ""}
                title={event.name}
                chipLabel={event.type}
                description={event.description}
                from={event.from}
                to={event.to}
                ctaText="Join Event"
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default Events;
